---
name: new-book
description: Tạo thư mục và template files cho truyện mới. Dùng khi bắt đầu dịch một truyện chưa có trong books/.
---

# New Book Skill

Skill này hướng dẫn tạo thư mục + files template cho một truyện mới chưa có trong `books/`.

## Cách 1: Dùng script (nhanh nhất)

```bash
node scripts/new-book.js
```

Script sẽ hỏi tên truyện, nguồn, book ID, tên nhân vật chính rồi tự tạo:
- `books/{source}/{slug}/metadata.json` — thông tin truyện (novel, source, book_id, slug, protagonist)
- `books/{source}/{slug}/glossary.json` — template glossary trống
- `books/{source}/{slug}/style.json` — template voice/tone
- `books/{source}/{slug}/cn/` + `vn/`

## Cách 2: Tạo qua chat

Nói với Agent:

```
Tạo truyện mới: "[Tên truyện]", nguồn [fanqie/qidian], book ID [ID]
Nhân vật chính: [Tên]
```

Agent sẽ:
1. Dùng `slugify` tạo slug từ tên truyện (lowercase, strict, locale vi)
2. Tạo thư mục `books/{source}/{slug}/`
3. Tạo `metadata.json` với thông tin truyện
4. Tạo `glossary.json` (trống) và `style.json` với metadata đã điền
5. Hỏi thêm thông tin về voice/tone nhân vật chính nếu có

## Cấu trúc folder

```
books/{source}/{slug}/
├── metadata.json   ← Thông tin truyện (novel, source, book_id, slug, protagonist)
├── glossary.json   ← Tên nhân vật / địa danh / thuật ngữ riêng
├── style.json      ← Giọng văn / tone đặc thù
├── cn/             ← File tiếng Trung gốc
└── vn/             ← File tiếng Việt đã dịch
```

## Sau khi tạo xong

1. **Chỉnh `glossary.json`**: Thêm tên nhân vật xuất hiện sớm (nếu biết trước)
2. **Chỉnh `style.json`**: Điền `voice` và `tone_rules` cho phù hợp tính cách nhân vật chính
3. **Copy file CN** vào `books/{source}/{slug}/cn/`
4. **Dịch**: yêu cầu Agent dịch `books/{source}/{slug}/cn/chuong-1.txt`

## Lưu ý

- Thuật ngữ tu tiên chung đã có trong `glossary.json` gốc ở root — **không cần thêm lại**
- Chỉ thêm vào `books/{source}/{slug}/glossary.json` những thứ **riêng** của truyện đó: tên nhân vật, địa danh, công pháp đặc thù
- `style.json` là tùy chọn nhưng giúp bản dịch có cá tính hơn
- `metadata.json` lưu book ID — dùng để liên kết với nguồn gốc
