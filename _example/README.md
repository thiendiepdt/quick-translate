# Thư mục truyện — Hướng dẫn

Đây là template thư mục cho một truyện. Copy thư mục `_example/` ra và đặt vào `books/{source}/{slug}/`.

## Cấu trúc

```
books/{source}/{slug}/
├── metadata.json   ← Thông tin truyện (tên, nguồn, book_id, nhân vật chính)
├── glossary.json   ← Tên nhân vật, địa danh, thuật ngữ riêng của truyện này
├── style.json      ← Giọng văn, tone, signature phrases (tùy chọn nhưng khuyến khích)
├── cn/             ← File tiếng Trung gốc
│   ├── chuong-1.txt
│   ├── chuong-1.qt.txt  ← Quick Translator output (nếu có, đặt cùng thư mục)
│   └── ...
└── vn/             ← File tiếng Việt đã dịch
    └── chuong-1.txt
```

## Đặt tên thư mục

Cấu trúc: `books/{source}/{slug}/`

- `source`: `fanqie`, `qidian`, `other`
- `slug`: tên truyện tiếng Việt không dấu, dùng `-`

Ví dụ:
- `books/fanqie/nguoi-tai-huyen-huyen-cho-ta-vo-han-dan-duoc-cai-quy-gi/`
- `books/qidian/tien-phu-1044094788/`

## Các file

### `metadata.json`
Chứa các thông tin chung về truyện như tên gốc, tên tiếng Việt, tác giả, nguồn, ID gốc của truyện trên trang nguồn, thể loại, v.v.

### `glossary.json`
Chứa tên nhân vật, địa danh, và thuật ngữ **riêng của truyện này**.  
Thuật ngữ tu tiên chung (linh thạch, đan dược, Kim Đan...) đã có trong `glossary.json` ở root — không cần thêm lại.

### `style.json`
Định nghĩa giọng văn và tone cho truyện. AI sẽ dùng file này để điều chỉnh cách dịch cho phù hợp với tính cách nhân vật.

### `cn/`
Đặt file tiếng Trung gốc vào đây. Đặt tên: `chuong-1.txt`, `chuong-2.txt`...

File `.qt.txt` (Quick Translator output) nếu có, đặt **cùng thư mục** `cn/`, cùng tên chương: `chuong-1.qt.txt`. Agent sẽ tự đọc song song khi dịch.

### `vn/`
Agent sẽ tự động lưu file dịch vào đây với tên tương ứng.

## Quick start

```bash
# 1. Tạo thư mục truyện mới (interactive)
node scripts/new-book.js

# 2. Copy file CN vào cn/ (và .qt.txt nếu có)
# books/{source}/{slug}/cn/chuong-1.txt
# books/{source}/{slug}/cn/chuong-1.qt.txt
```

**Bước 3 — Nói với Agent:**
```
Dịch books/{source}/{slug}/cn/chuong-1.txt
```
