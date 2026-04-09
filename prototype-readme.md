# Prototype: VinFast Vivi Chatbot

**Nhóm:** Nhóm 27 — 403 Day05
**Track:** VinFast AI Product Hackathon

---

**Mô tả prototype:**
Vivi là hệ thống Chatbot AI tư vấn xe VinFast được xây dựng theo mô hình Augmentation đa phương thức (Multimodal), cho phép nhận diện xe qua ảnh và chat tương tác trực tiếp. Hệ thống tự động phân tích nhu cầu và sử dụng Multi-step Tool Pipeline để tư vấn trọn gói từ phiên bản, giá cả, chi phí lăn bánh đến phụ kiện và đối thủ, với dữ liệu được trích xuất từ database nội bộ nhằm đảm bảo tính chính xác tuyệt đối.

**Level:** ~~Sketch~~ / ~~Mock~~ / **Working** ✅

**Link prototype:** *(chạy local — xem hướng dẫn bên dưới)*

**Hướng dẫn chạy local:**

**Bước 1 — Cài đặt thư viện**
```bash
pip install -r requirements.txt
```

**Bước 2 — Cấu hình API Key**

Tạo file `.env` ở thư mục gốc của project:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Bước 3 — Khởi chạy server backend**
```bash
uvicorn vinfast_backend:app --reload
```
Hoặc:
```bash
python vinfast_backend.py
```

Sau khi khởi chạy, truy cập giao diện tại: **http://localhost:3000**

**Tools và API đã dùng:**
* **LLM & API:** OpenAI API (Text model GPT-4o-mini & Vision model để phân tích ảnh).
* **AI Framework:** LangGraph / ReAct (sử dụng Multi-step Tool Pipeline).
* **Backend:** FastAPI, Uvicorn, Python.
* **Frontend:** Web UI tích hợp tính năng tải ảnh lên và chat.
* **Database:** Hardcoded Database tĩnh chứa thông tin xe VinFast, đối thủ, phụ kiện, và chính sách.

**Phân công:**

| Thành viên | Phụ trách chính | Chi tiết công việc |
|:---|:---|:---|
| **Danh** | SPEC, Data & Canvas | Lập nội dung AI Product Canvas, khai thác Failure modes. Chuẩn bị toàn bộ dữ liệu hardcode (data giá, xe, phụ kiện). Thiết kế workflows tổng thể. |
| **Kiệt** | Agent Flow & Prompt | Thiết kế luồng gọi đa công cụ (multi-tool flow) để điều phối LLM và trực tiếp quản lý, kiểm thử prompt (prompt test). |
| **Nhị** | Prototype Code & UI | Trực tiếp code Prototype, tập trung hoàn thiện giao diện (UI) để người dùng có thể tải ảnh lên và chat tương tác trên frontend. |
