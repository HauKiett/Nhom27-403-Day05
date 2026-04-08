import { useState, useCallback } from "react";

export interface Message {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
}

export function useTravelAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy URL API từ biến môi trường (mặc định là localhost:8000 nếu không có)
  const API_URL = import.meta.env.VITE_PYTHON_API_URL ?? "http://localhost:8000";

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể kết nối với Python Backend");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || "Xin lỗi, tôi không nhận được phản hồi từ server."
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Lỗi kết nối backend. Hãy đảm bảo bạn đã chạy lệnh: python vinfast_backend.py"
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, API_URL]);

  return { messages, sendMessage, isLoading };
}
