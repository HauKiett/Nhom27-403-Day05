# SPEC draft — Nhom27 -

## Track: VinFast Agent

## Problem statement
Người dùng muốn mua xe VinFast nhưng không biết nên chọn phiên bản nào, lăn bánh ra sao, phụ kiện nào phù hợp, hoặc muốn so sánh với đối thủ. Hiện tại phải tra thông tin thủ công trên website, hỏi đại lý hoặc gọi tổng đài, mất nhiều thời gian. AI có thể hỏi model, nhu cầu, ngân sách, và trả về gợi ý **full-package**: phiên bản, lăn bánh, phụ kiện, phân tích đối thủ, chính sách bảo hành và thuê pin.

## Canvas draft

| | Value | Trust | Feasibility |
|---|-------|-------|-------------|
| Trả lời | Người dùng nhận **tư vấn xe VinFast đầy đủ**, so sánh đối thủ, biết chi phí, bảo hành và pin. | Nếu thông tin sai → người dùng mất tiền, chọn sai phiên bản hoặc lỡ ưu đãi. Phải chỉ rõ nguồn dữ liệu (DB/ước tính) và từ chối bịa thông tin. | Tool internal, latency <2s mỗi tool. Risk: DB thiếu dữ liệu, input model mơ hồ → trả lời không chính xác. |

**Auto hay aug?** Augmentation — AI gợi ý, người dùng quyết định cuối cùng.  

**Learning signal:** model/version người dùng chọn, chi phí thực tế, feedback về phụ kiện/đối thủ → cập nhật DB/heuristic tool.

## Hướng đi chính

### **Prototype Workflow (Multi-step flow)**

**1️⃣ Thu thập thông tin user (intent + model + nhu cầu)**  
- Trường hợp A: User chưa biết model → hỏi preference (EV/xe xăng, ngân sách, số lượng ghế).  
- Trường hợp B: User đã biết model → đi thẳng tool.

**2️⃣ Tool sequence (nếu đủ info)**  

| Step | Tool | Input | Output |
|------|------|-------|--------|
| 1 | `search_car_versions` | model | Phiên bản, giá base, động cơ, màu |
| 2 | `calculate_total_cost` | base_price + fees + accessories | Bảng chi phí lăn bánh chi tiết |
| 3 | `suggest_accessories` | model | Gợi ý phụ kiện 2-3 món chính |
| 4 | `analyze_competitor` | model | So sánh với đối thủ: giá, range, tính năng |
| 5 | `show_policies` | model | Bảo hành, thuê pin (nếu EV) |

⚠️ Tuần tự, không bỏ bước, tối đa 6 tool call mỗi lượt.

**3️⃣ Trường hợp thiếu thông tin (ví dụ: chỉ nói “tư vấn xe”)**  
- Hỏi gộp: `"Bạn muốn xe loại nào, ngân sách khoảng bao nhiêu, EV hay xăng?"`  
- Sau khi có đủ input → chạy multi-step flow.

**4️⃣ Trường hợp lỗi / dữ liệu thiếu**  
- Model không tồn tại → `"Không tìm thấy dòng xe '<model>'."`  
- Tool thất bại → báo rõ, không bịa thông tin.  
- Phụ kiện hoặc đối thủ thiếu → `"Không có dữ liệu..."`

## **User stories / 4 paths**

| Path | Input example | Output expectation |
|------|---------------|------------------|
| Happy path | `"Tư vấn VF e34 full"` | Full-package: phiên bản, lăn bánh, phụ kiện, đối thủ, bảo hành/pin |
| Edge case | `"Tư vấn Lux B2.0"` | Thông báo model không tồn tại |
| Multi-step | `"Tôi muốn Fadil, tính lăn bánh và phụ kiện"` | Gọi các tool tuần tự → trả kết quả đầy đủ |
| Session / context | `"Tư vấn VF e34"` → `"Chỉ phiên bản cao cấp nhất"` | Hiểu context, chỉ show VF e34 Premium, không hỏi lại toàn bộ |

## **Eval metrics + ROI**

- **Precision / accuracy**:  
  - Phiên bản + giá + phụ kiện đúng ≥ 95%  
  - Đối thủ chính xác ≥ 90%  
  - Chính sách bảo hành/pin ≥ 100% (dữ liệu DB)  
- **Latency**: mỗi tool ≤ 2s, toàn bộ flow ≤ 6s  
- **ROI**: giảm thời gian tra cứu cho người dùng từ 10-15 phút → <1 phút

## **Main failure modes**

- Input model mơ hồ → agent không biết gọi tool nào  
- DB thiếu dữ liệu phiên bản/đối thủ/pin  
- Người dùng hỏi quá chung chung → trả gợi ý rộng, không cá nhân hóa

## **Phân công**

- Danh: Canvas + failure modes User stories 4 paths + workflows  
- Kiệt: multi-tool flow + prompt test
- Nhị: Prototype code

