from langchain_core.tools import tool
import logging
logger = logging.getLogger(__name__)


# VINFAST_CARS_DB: Dữ liệu các dòng xe và phiên bản

VINFAST_CARS_DB = {
    "VF 3": [
        {"version": "VF 3 Eco",  "engine": "Điện", "price": 302_000_000},
        {"version": "VF 3 Plus", "engine": "Điện", "price": 315_000_000},
    ],
    "VF 5": [
        {"version": "VF 5 Plus", "engine": "Điện", "price": 529_000_000},
    ],
    "VF 6": [
        {"version": "VF 6 Eco",  "engine": "Điện", "price": 689_000_000},
        {"version": "VF 6 Plus", "engine": "Điện", "price": 745_000_000},
    ],
    "VF 7": [
        {"version": "VF 7 Eco",  "engine": "Điện", "price": 789_000_000},
        {"version": "VF 7 Plus", "engine": "Điện", "price": 889_000_000},
        # Có thể bổ sung bản Plus AWD 939 triệu nếu cần chi tiết hơn
    ],
    "VF 8": [
        {"version": "VF 8 Eco",  "engine": "Điện", "price": 1_019_000_000},
        {"version": "VF 8 Plus", "engine": "Điện", "price": 1_199_000_000},
    ],
    "VF 9": [
        {"version": "VF 9 Eco",  "engine": "Điện", "price": 1_499_000_000},
        {"version": "VF 9 Plus", "engine": "Điện", "price": 1_699_000_000},
    ],
    "VF e34": [
        # Mẫu đã ngừng bán, giữ giá công bố ban đầu để chatbot tham chiếu
        {"version": "VF e34",    "engine": "Điện", "price": 690_000_000},
    ],
}


# =========================================
# VINFAST_EBIKES_DB – XE MÁY / XE ĐẠP ĐIỆN
# =========================================
# Giá tham khảo 2025–2026, ưu tiên nguồn VinFast chính thức

VINFAST_EBIKES_DB = {
    # Dòng mới Vero / Feliz / Evo / ZGoo / Flazz
    "Vero X": [
        {"version": "Vero X 1 pin", "engine": "Điện", "price": 34_900_000},
        {"version": "Vero X 2 pin", "engine": "Điện", "price": None},  # combo 2 pin tùy chương trình
    ],
    "Feliz 2025": [
        {"version": "Feliz 2025 2 pin", "engine": "Điện", "price": 26_900_000},
    ],
    "Evo Grand": [
        {"version": "Evo Grand", "engine": "Điện", "price": 22_800_000},
    ],
    "Evo Grand Lite": [
        {"version": "Evo Grand Lite", "engine": "Điện", "price": 17_388_000},
    ],
    "Evo Lite Neo": [
        {"version": "Evo Lite Neo", "engine": "Điện", "price": 18_000_000},
    ],
    "Zgoo": [
        {"version": "Zgoo", "engine": "Điện", "price": 14_900_000},
    ],
    "Flazz": [
        {"version": "Flazz", "engine": "Điện", "price": 16_000_000},
    ],

    # Xe đạp trợ lực & flagship
    "VF DrgnFly": [
        {"version": "VF DrgnFly", "engine": "Trợ lực điện", "price": 29_690_000},
    ],
    "Theon S": [
        {"version": "Theon S", "engine": "Điện", "price": 66_900_000},
    ],
}


# =========================================
# ACCESSORIES_DB – GỢI Ý PHỤ KIỆN THEO DÒNG XE
# =========================================

ACCESSORIES_DB = {
    # Ô tô điện
    "VF 3": [
        "Bộ sạc di động 2,2 kW",
        "Bộ sạc treo tường 7,4 kW",
        "Thảm lót sàn VF 3",
        "Gói dán film cách nhiệt toàn xe",
        "Mô hình xe VF 3",
    ],
    "VF 5": [
        "Gói Dán Film Cách Nhiệt VinFast VF 5",
        "VF 5 Tấm Che Pin Cao Áp",
        "Thảm lót sàn VF 5",
        "Bộ sạc treo tường 7,4 kW",
    ],
    "VF 6": [
        "Bộ sạc treo tường 7,4 kW",
        "Gói dán film cách nhiệt VF 6",
        "Thảm lót sàn VF 6",
    ],
    "VF 7": [
        "Bộ sạc treo tường 7,4 kW",
        "Gói dán film cách nhiệt VF 7",
        "Thảm lót sàn VF 7",
        "Merch áo/mũ VF 7",
    ],
    "VF 8": [
        "Bộ sạc treo tường 7,4 kW",
        "Gói dán film cách nhiệt VF 8",
        "Thảm lót sàn VF 8",
        "Camera 360",
    ],
    "VF 9": [
        "Bộ sạc treo tường 7,4 kW",
        "Gói dán film cách nhiệt VF 9",
        "Thảm lót sàn VF 9",
        "Camera 360",
    ],

    # Xe máy / xe đạp điện
    "Vero X": [
        "Thảm lót sàn Vero X",
        "Baga/bọc bảo vệ cốp",
        "Mũ bảo hiểm VinFast",
    ],
    "Feliz 2025": [
        "Thảm để chân",
        "Baga sau",
        "Mũ bảo hiểm VinFast",
    ],
    "Evo Grand": [
        "Baga sau",
        "Thùng để đồ",
        "Mũ bảo hiểm VinFast",
    ],
    "Evo Grand Lite": [
        "Baga sau",
        "Khóa chống trộm",
        "Mũ bảo hiểm VinFast",
    ],
    "Zgoo": [
        "Thảm để chân",
        "Rổ trước",
        "Mũ bảo hiểm VinFast",
    ],
    "Flazz": [
        "Ốp trang trí thân xe",
        "Thảm để chân",
        "Mũ bảo hiểm VinFast",
    ],
    "VF DrgnFly": [
        "Khóa dây chống trộm",
        "Đèn chiếu sáng phụ",
        "Giá chở đồ phía sau",
    ],
    "Theon S": [
        "Thùng sau",
        "Giá để điện thoại",
        "Mũ bảo hiểm VinFast cao cấp",
    ],
}


# =========================================
# BATTERY_RENTAL_DB – GÓI THUÊ PIN Ô TÔ ĐIỆN
# =========================================
# Từ chính sách Dịch vụ pin ô tô điện VinFast (giai đoạn từ 01/01/2025)

BATTERY_RENTAL_DB = {
    "VF 3": [
        {"policy_from": "2025-01-01", "km_min": 0,    "km_max": 1_500, "monthly_fee": 1_100_000},
        {"policy_from": "2025-01-01", "km_min": 1_500, "km_max": 2_500, "monthly_fee": 1_400_000},
        {"policy_from": "2025-01-01", "km_min": 2_500, "km_max": None,  "monthly_fee": 3_000_000},
    ],
    "VF 5": [
        {"policy_from": "2025-01-01", "km_min": 0,    "km_max": 1_500, "monthly_fee": 1_400_000},
        {"policy_from": "2025-01-01", "km_min": 1_500, "km_max": 3_000, "monthly_fee": 1_900_000},
        {"policy_from": "2025-01-01", "km_min": 3_000, "km_max": None,  "monthly_fee": 3_200_000},
    ],
    "VF 6": [
        {"policy_from": "2025-01-01", "km_min": 0,    "km_max": 1_500, "monthly_fee": 1_700_000},
        {"policy_from": "2025-01-01", "km_min": 1_500, "km_max": 3_000, "monthly_fee": 2_200_000},
        {"policy_from": "2025-01-01", "km_min": 3_000, "km_max": None,  "monthly_fee": 3_600_000},
    ],
    "VF 7": [
        {"policy_from": "2025-01-01", "km_min": 0,    "km_max": 1_500, "monthly_fee": 2_000_000},
        {"policy_from": "2025-01-01", "km_min": 1_500, "km_max": 3_000, "monthly_fee": 3_500_000},
        {"policy_from": "2025-01-01", "km_min": 3_000, "km_max": None,  "monthly_fee": 5_800_000},
    ],
    "VF 8": [
        {"policy_from": "2025-01-01", "km_min": 0,    "km_max": 1_500, "monthly_fee": 2_300_000},
        {"policy_from": "2025-01-01", "km_min": 1_500, "km_max": 3_000, "monthly_fee": 3_500_000},
        {"policy_from": "2025-01-01", "km_min": 3_000, "km_max": None,  "monthly_fee": 5_800_000},
    ],
    "VF 9": [
        {"policy_from": "2025-01-01", "km_min": 0,    "km_max": 1_500, "monthly_fee": 3_200_000},
        {"policy_from": "2025-01-01", "km_min": 1_500, "km_max": 3_500, "monthly_fee": 5_400_000},
        {"policy_from": "2025-01-01", "km_min": 3_500, "km_max": None,  "monthly_fee": 8_300_000},
    ],
}

BATTERY_RENTAL_META = {
    "service_status": (
        "Từ 01/03/2025 VinFast dừng dịch vụ cho thuê pin ô tô/xe máy điện "
        "đối với khách hàng mới; khách đang thuê có thể tiếp tục hoặc chuyển sang mua pin."
    ),
    "deposit": {
        "VF 3": 7_000_000,
        "VF 5": 15_000_000,
        "VF 6": 25_000_000,
        "VF 7": 41_000_000,
        "VF 8": 41_000_000,
        "VF 9": 60_000_000,
    },
    "billing_cycle": {
        "period": "26_thang_truoc_25_thang_hien_tai",
        "odo_cutoff_time": "22:00_ngay_25",
        "late_payment_interest_rate_per_year": 0.10,
    },
    "public_charging": {
        "price_per_kWh": 3_858,
        "currency": "VND",
        "overstay_penalty_per_min": 1_000,
        "overstay_grace_minutes": 10,
        "note": (
            "Không phạt quá giờ cho xe máy điện và trụ AC 11 kW; "
            "thanh toán trước ngày 15 tháng sau."
        ),
    },
}


# =========================================
# WARRANTY_DB – BẢO HÀNH & PIN
# =========================================

WARRANTY_DB = {
    "VF 3": {
        "warranty": (
            "Áp dụng chính sách bảo hành ô tô điện VinFast; chi tiết riêng VF 3 "
            "sẽ cập nhật theo thông báo chính thức."
        ),
        "battery": (
            "Trước 01/03/2025: có gói thuê pin; sau 01/03/2025 dừng thuê pin cho khách mới, "
            "khách đang thuê tiếp tục hoặc mua pin."
        ),
    },
    "VF 5": {
        "warranty": "7 năm hoặc 160.000 km đối với xe và hệ truyền động.",
        "battery": "Pin cao áp bảo hành 8 năm hoặc 160.000 km.",
    },
    "VF e34": {
        "warranty": "10 năm hoặc 200.000 km đối với xe và hệ truyền động.",
        "battery": (
            "Trước đây áp dụng thuê pin với nhiều gói km/tháng; hiện đã ngừng nhận hợp đồng thuê mới."
        ),
    },
    "VF 6": {
        "warranty": "7 năm hoặc 160.000 km.",
        "battery": "Pin LFP bảo hành theo chính sách pin cao áp VinFast.",
    },
    "VF 7": {
        "warranty": "8–10 năm hoặc 160.000–200.000 km (tùy phiên bản, cập nhật theo thông báo mới).",
        "battery": "Pin LFP bảo hành theo chính sách pin cao áp VinFast.",
    },
    "VF 8": {
        "warranty": "10 năm hoặc 200.000 km.",
        "battery": "Pin mua kèm xe, bảo hành theo chính sách pin cao áp ô tô điện VinFast.",
    },
    "VF 9": {
        "warranty": "10 năm hoặc 200.000 km.",
        "battery": "Pin mua kèm xe, bảo hành theo chính sách pin cao áp ô tô điện VinFast.",
    },
}


# =========================================
# AFTERSALES_DB – HẬU MÃI & HỖ TRỢ
# =========================================

AFTERSALES_DB = {
    "hotline": {
        "phone": "1900 23 23 89",
        "note": "Tư vấn bán hàng, hậu mãi, cứu hộ 24/7.",
    },
    "service_booking": {
        "online_url": "https://shop.vinfastauto.com/vn_vi/dat-lich-dich-vu-bao-duong.html",
        "description": "Đặt lịch bảo dưỡng, sửa chữa, bảo hành tại xưởng dịch vụ VinFast.",
    },
    "roadside_assistance": {
        "phone": "1900 23 23 89",
        "availability": "24/7",
        "scope": "Toàn quốc cho ô tô và xe máy điện VinFast.",
    },
    "faq_url": "https://vinfastauto.com/vn_vi/cau-hoi-thuong-gap-ve-chinh-sach-hau-mai-vinfast",
}
# ==========================================
# CÁC CÔNG CỤ (TOOLS)
# ==========================================

@tool
def search_car_versions(model: str) -> str:
    """
    Liệt kê các phiên bản của một dòng xe VinFast.
    Tham số:
    - model: tên dòng xe (VD: 'Fadil', 'Lux A2.0', 'VF e34', 'VF 9')
    """
    cars = VINFAST_CARS_DB.get(model)
    if not cars:
        return f"Không tìm thấy dòng xe '{model}'. Vui lòng thử tên khác."

    result = f"Các phiên bản {model}:\n"
    for c in cars:
        price = f"{c['price']:,}".replace(",", ".")
        result += f"- {c['version']} | Động cơ: {c['engine']} | Giá: {price}đ\n"
    return result

@tool
def calculate_total_cost(base_price: int, taxes: int = 0, registration_fee: int = 0, insurance: int = 0, accessories: int = 0) -> str:
    """
    Tính toán tổng chi phí lăn bánh của xe VinFast.
    Tham số:
    - base_price: giá niêm yết xe (VND)
    - taxes: thuế VAT (VND)
    - registration_fee: phí đăng ký (VND)
    - insurance: bảo hiểm (VND)
    - accessories: phụ kiện, option (VND)
    """
    try:
        total = base_price + taxes + registration_fee + insurance + accessories
        result = (
            f"Bảng chi phí lăn bánh:\n"
            f"- Giá niêm yết: {base_price:,}đ\n"
            f"- Thuế VAT: {taxes:,}đ\n"
            f"- Phí đăng ký: {registration_fee:,}đ\n"
            f"- Bảo hiểm: {insurance:,}đ\n"
            f"- Phụ kiện: {accessories:,}đ\n"
            f"---\n"
            f"Tổng chi phí: {total:,}đ"
        ).replace(",", ".")
        return result
    except Exception as e:
        logger.warning(f"calculate_total_cost error: {e}")
        return "Lỗi khi tính tổng chi phí lăn bánh. Kiểm tra lại các tham số."

@tool
def suggest_accessories(model: str) -> str:
    """
    Gợi ý phụ kiện cho dòng xe VinFast.
    Tham số:
    - model: tên dòng xe
    """
    accessories = ACCESSORIES_DB.get(model)
    if not accessories:
        return f"Không có dữ liệu phụ kiện cho dòng xe '{model}'."
    result = f"Gợi ý phụ kiện cho {model}:\n"
    for a in accessories:
        result += f"- {a}\n"
    return result


@tool
def analyze_competitor(model: str) -> str:
    """
    Phân tích đối thủ cạnh tranh của dòng xe VinFast.
    """
    competitors = COMPETITORS_DB.get(model)
    if not competitors:
        return f"Không tìm thấy thông tin đối thủ cho dòng xe '{model}'."

    result = f"Phân tích đối thủ cho {model}:\n"
    for name, data in competitors.items():
        result += f"- {name}: Giá {data.get('price','?'):,}đ, "
        if "range" in data: result += f"Range: {data['range']} km, "
        result += f"Features: {', '.join(data['features'])}\n"
    return result

@tool
def show_policies(model: str) -> str:
    """
    Trả thông tin bảo hành và chính sách thuê pin (nếu có) cho xe VinFast.
    """
    policy = WARRANTY_DB.get(model)
    if not policy:
        return f"Không tìm thấy thông tin chính sách cho dòng xe '{model}'."

    result = f"Chính sách cho {model}:\n"
    result += f"- Bảo hành: {policy['warranty']}\n"
    if policy["battery"]:
        result += f"- {policy['battery']}\n"
    return result