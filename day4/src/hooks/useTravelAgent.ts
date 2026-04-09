import { useState, useCallback, useEffect } from "react";

export interface Message {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  timestamp?: number;
  imagePreview?: string;      // data URL để hiển thị ảnh trong bubble
  recognitionLabel?: string;  // "VF 8 Plus" — backend trả về khi nhận dạng ảnh
}

export interface ImageInput {
  base64: string;
  mimeType: string;
  preview: string; // data URL
}

const STORAGE_KEY = "vivi_chat_messages";
const SESSION_KEY = "vivi_session_id";

function getOrCreateSessionId(): string {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) return stored;
    const newId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, newId);
    return newId;
  } catch {
    return crypto.randomUUID();
  }
}

function loadStoredMessages(): Message[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed: Message[] = JSON.parse(stored);
    // Không lưu imagePreview vào storage (có thể rất lớn) — chỉ lưu text
    return parsed.map(m => ({ ...m, imagePreview: undefined }));
  } catch {
    return [];
  }
}

export function useTravelAgent() {
  const [messages, setMessages] = useState<Message[]>(loadStoredMessages);
  const [sessionId] = useState<string>(getOrCreateSessionId);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false); // true khi đang gọi vision API

  const API_URL = import.meta.env.VITE_PYTHON_API_URL ?? "http://localhost:8000";

  // Persist messages (bỏ imagePreview để tránh lưu data URL lớn)
  useEffect(() => {
    try {
      const toStore = messages.map(m => ({ ...m, imagePreview: undefined }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      // localStorage đầy — bỏ qua
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string, image?: ImageInput) => {
      const hasContent = text.trim() || image;
      if (!hasContent) return;

      const userContent = text.trim() || "Phân tích xe trong ảnh này.";

      const newUserMessage: Message = {
        role: "user",
        content: userContent,
        timestamp: Date.now(),
        imagePreview: image?.preview,
      };

      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      if (image) setIsRecognizing(true);

      try {
        const body: Record<string, unknown> = {
          message: userContent,
          history: messages.map(m => ({ role: m.role, content: m.content })),
          session_id: sessionId,
        };
        if (image) {
          body.image_base64 = image.base64;
          body.image_mime_type = image.mimeType;
        }

        const response = await fetch(`${API_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error("Không thể kết nối với Python Backend");

        const data = await response.json();

        // Nếu backend nhận dạng được xe từ ảnh → thêm recognitionLabel vào message
        const recognitionLabel: string | undefined =
          image && data.detected_model ? data.detected_model : undefined;

        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: data.response || "Xin lỗi, tôi không nhận được phản hồi từ server.",
            timestamp: Date.now(),
            recognitionLabel,
          },
        ]);
      } catch (error) {
        console.error("Chat Error:", error);
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "Lỗi kết nối backend. Hãy đảm bảo bạn đã chạy lệnh: python vinfast_backend.py",
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setIsLoading(false);
        setIsRecognizing(false);
      }
    },
    [messages, API_URL, sessionId]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { messages, sendMessage, isLoading, isRecognizing, clearMessages, sessionId };
}
