# Prototype: VinFast Vivi Chatbot

**Nhóm:** Nhóm 27 — 403 Day05
**Track:** VinFast AI Product Hackathon

---

## 1. Giới thiệu Prototype
Vivi là hệ thống Chatbot AI tư vấn xe VinFast được xây dựng theo mô hình **Augmentation đa phương thức (Multimodal)**. Thay vì để người dùng tra cứu thủ công qua nhiều trang web, Vivi đóng vai trò như một trợ lý tư vấn tổng hợp trọn gói, bao gồm:

1. **Nhận diện bằng ảnh:** Gửi ảnh xe trên phố để AI phân tích và gọi tên mẫu xe.
2. **Tìm kiếm & Liệt kê:** Cung cấp các phiên bản và giá niêm yết chính xác.
3. **Tính chi phí lăn bánh:** Úp lệ phí / VAT / Bảo hiểm / Phụ kiện một cách trực quan.
4. **Phân tích đối thủ & Chính sách:** So sánh xe cùng phân khúc, tư vấn thuê pin và bảo hành.

Hệ thống được cấu trúc dựa trên **Multi-step Tool Pipeline (ReAct/LangGraph)**, đảm bảo AI chỉ trích xuất dữ liệu từ Database nội bộ, triệt tiêu tối đa rủi ro "ảo giác" (hallucination) về giá cả và thông số dẫn đến thiệt hại tài chính cho khách hàng.

---

## 2. Hướng dẫn Setup & Chạy Local

Để chạy dự án ở chế độ phát triển (local), bạn vui lòng thực hiện theo các bước sau:

**Bước 1: Cài đặt thư viện**
Bạn cần cài đặt các thư viện yêu cầu nằm trong `requirements.txt`:
```bash
pip install -r requirements.txt
```

**Bước 2: Cấu hình biến môi trường**
Tạo một file có tên `.env` ở thư mục gốc của project (cùng cấp với file backend) và bổ sung cấu hình cần thiết để Agent hoạt động:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Bước 3: Khởi chạy Server Backend**
Dự án sử dụng FastAPI để viết endpoint. Bạn có thể khởi động server bằng 1 trong 2 lệnh sau ở Terminal:
```bash
uvicorn vinfast_backend:app --reload
```
Hoặc:
```bash
python vinfast_backend.py
```

Sau khi chạy xong, Server sẽ mở tại địa chỉ `http://localhost:3000`.

- **Tài liệu SPEC chi tiết:** Tham khảo thêm file `SPEC-Nhom27-VinFast-Vivi.md` của nhóm để hiểu rõ thiết kế luồng hệ thống.

---

## 3. Phân công nhiệm vụ

Nhóm 27 đã phân chia công việc thực tế dựa trên thế mạnh từng người như sau:

| Thành viên | Phụ trách chính | Chi tiết công việc |
|:---|:---|:---|
| **Danh** | SPEC, Data & Canvas | Lập nội dung AI Product Canvas, khai thác Failure modes. Chuẩn bị toàn bộ dữ liệu hardcode (data giá, xe, phụ kiện). Thiết kế workflows tổng thể. |
| **Kiệt** | Agent Flow & Prompt | Thiết kế luồng gọi đa công cụ (multi-tool flow) để điều phối LLM và trực tiếp quản lý, kiểm thử prompt (prompt test). |
| **Nhị** | Prototype Code & UI | Trực tiếp code Prototype, tập trung hoàn thiện giao diện (UI) để người dùng có thể tải ảnh lên và chat tương tác trên frontend. |

---
*Từng phần công việc liên kết liền mạch: Bộ Data và SPEC của Danh định hướng tạo đầu vào cho Prompt của Kiệt, và kết quả AI được hiển thị lên qua giao diện do Nhị code.*
