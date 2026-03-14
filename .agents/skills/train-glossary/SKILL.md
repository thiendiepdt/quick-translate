---
name: train-glossary
description: Train glossary từ samples mới. Dùng khi thêm samples CN/VN mới và muốn cập nhật glossary.json + AGENTS.md.
---

# Train Glossary Skill

Skill này dùng khi thêm samples mới vào `samples/cn/` và `samples/vn/` và muốn cập nhật `glossary.json` + `AGENTS.md`.

## Quy trình

### Bước 1 — Chuẩn bị samples

Đặt file sample vào đúng thư mục:

- `samples/cn/{source}-{book_id}-{slug-ngắn}-{chapter}.txt`
- `samples/vn/{source}-{book_id}-{slug-ngắn}-{chapter}.txt`
- Ví dụ: `qidian-1044094788-tien-phu-1.txt`

### Bước 2 — Yêu cầu Agent train

Nói:

```
Train glossary từ tất cả samples mới trong samples/cn/ và samples/vn/
```

### Bước 3 — Agent tự động thực hiện

1. Đọc tất cả cặp file CN/VN trong `samples/`
2. So sánh từng cặp để trích xuất thuật ngữ, tên riêng, cách dịch
3. Merge thuật ngữ mới vào `glossary.json` (không ghi đè cái cũ)
4. Rebuild bảng thuật ngữ trong `AGENTS.md`
5. Đề xuất ví dụ mới hay cho `system-prompt.md`

### Bước 4 — Review kết quả và confirm

## Lưu ý

- File CN và VN phải khớp tên nhau (cùng source, book_id, slug, chapter)
- Agent chỉ thêm thuật ngữ MỚI, không sửa thuật ngữ đã có
- Nếu muốn sửa thuật ngữ đã có, edit trực tiếp `glossary.json`
