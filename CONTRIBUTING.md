# Đóng góp cho quick-translate

Cảm ơn vì quan tâm đến project! Dưới đây là các cách bạn có thể đóng góp.

## Đóng góp glossary chung

File `glossary.json` ở root chứa thuật ngữ tu tiên dùng cho **mọi truyện**. Nếu bạn thấy thiếu thuật ngữ phổ biến:

1. Fork repo
2. Thêm vào đúng section trong `glossary.json`:
   - `cultivation` — cảnh giới, công pháp, kỹ năng chung
   - `items` — pháp bảo, đồ vật chung
   - `creatures` — yêu thú, sinh vật chung
   - `relations` — danh xưng quan hệ (sư phụ, sư huynh...)
   - `slang` — tiếng lóng gamer/internet
3. Tạo Pull Request

**Lưu ý**: Tên nhân vật hoặc địa danh riêng của một truyện thì **không** thêm vào đây — để vào `books/{source}/{slug}/glossary.json`.

## Báo lỗi dịch / đề xuất rule mới

Mở Issue với:
- Câu tiếng Trung gốc
- Bản dịch hiện tại (sai)
- Bản dịch đề xuất (đúng)
- Lý do (theo rule nào trong `AGENTS.md`)

## Đóng góp rules dịch

`AGENTS.md` là bộ rules cốt lõi. Nếu muốn đề xuất thêm/sửa rule:

1. Mở Issue để thảo luận trước
2. Nếu được đồng ý, tạo PR sửa `AGENTS.md` và cập nhật `scripts/check-vn.js` nếu rule có thể tự động kiểm tra

## Đóng góp samples

File mẫu trong `samples/` giúp train glossary. Nếu bạn có cặp CN/VN chất lượng tốt:

1. Đặt file vào:
   - `samples/cn/{source}-{book_id}-{slug-ngắn}-{chapter}.txt`
   - `samples/vn/{source}-{book_id}-{slug-ngắn}-{chapter}.txt`
2. Tạo PR

## Quy ước cấu trúc thư mục sách

```
books/
└── {source}/          ← fanqie, qidian, other
    └── {slug}/        ← tên truyện slug (chữ thường, không dấu, dùng -)
        ├── metadata.json  ← lưu book_id, tên truyện, nhân vật chính
        ├── glossary.json
        ├── style.json
        ├── cn/
        └── vn/
```

Ví dụ:
- `books/fanqie/nguoi-tai-huyen-huyen-cho-ta-vo-han-dan-duoc-cai-quy-gi/`
- `books/qidian/tien-phu-1044094788/`

## Code of Conduct

- Đóng góp bằng tiếng Việt hoặc tiếng Anh đều được
- Tôn trọng nhau, tập trung vào nội dung
- Ưu tiên chất lượng hơn số lượng
