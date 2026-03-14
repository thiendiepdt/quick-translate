# quick-translate

Bộ công cụ dịch truyện tu tiên Trung → Việt theo phong cách **Vietphrase convert + edit** — dùng AI (Antigravity/Gemini) làm engine dịch.

Bản dịch không phải dịch thuần Việt mà theo lối convert quen thuộc: giữ từ Hán-Việt, đại từ cổ phong (hắn/ta/ngươi), nhưng đọc mượt và hiểu ngay lần đầu.

## Yêu cầu

- [Antigravity](https://antigravity.dev) hoặc Gemini CLI với AGENTS.md
- Node.js (>= 18)

## Quick Start

```bash
# 1. Clone repo
git clone https://github.com/thiendiepdt/quick-translate.git
cd quick-translate
npm install

# 2. Tạo thư mục truyện mới
node scripts/new-book.js

# 3. Copy file CN vào cn/ (và .qt.txt nếu có)
cp /path/to/chuong-1.txt books/{source}/{slug}/cn/
cp /path/to/chuong-1.qt.txt books/{source}/{slug}/cn/  # tùy chọn
```

**Bước 4 — Nói với Agent:**

```
Dịch books/{source}/{slug}/cn/chuong-1.txt
```

## Cấu trúc project

```
quick-translate/
├── AGENTS.md              ← Rules dịch thuật (AI đọc tự động)
├── glossary.json          ← Thuật ngữ tu tiên chung (tất cả truyện)
├── package.json           ← Node.js dependencies (slugify)
│
├── books/                 ← Thư mục cho từng truyện, chia theo nguồn
│   └── {source}/          ← Nguồn truyện (fanqie, qidian, other...)
│       └── {slug}/
│           ├── metadata.json ← Thông tin truyện (novel, source, book_id)
│           ├── glossary.json ← Tên nhân vật / địa danh riêng
│           ├── style.json    ← Giọng văn / tone nhân vật chính
│           ├── cn/           ← File tiếng Trung gốc
│           │   ├── chuong-1.txt
│           │   └── chuong-1.qt.txt  ← QT output (nếu có, cùng thư mục)
│           └── vn/           ← File tiếng Việt đã dịch
│
├── _example/              ← Template để tạo truyện mới
├── scripts/
│   ├── new-book.js        ← Script khởi tạo truyện mới
│   └── check-vn.js        ← Script kiểm tra lỗi dịch
└── samples/               ← Mẫu dịch để train glossary
```

## Skills (AI tự động nhận diện)

| Skill                  | Mô tả                              |
| ---------------------- | ---------------------------------- |
| `new-book`             | Tạo thư mục + files cho truyện mới |
| `vietphrase-translate` | Dịch + review chương tiếng Trung   |
| `train-glossary`       | Cập nhật glossary từ samples       |

## Bắt đầu truyện mới — Chi tiết

### Bước 1: Khởi tạo

```bash
node scripts/new-book.js
```

Script hỏi tên truyện, nguồn (fanqie/qidian), book ID rồi tạo:

- `books/{source}/{slug}/metadata.json` — thông tin truyện
- `books/{source}/{slug}/glossary.json` — để thêm tên nhân vật
- `books/{source}/{slug}/style.json` — để định giọng văn
- `books/{source}/{slug}/cn/` + `vn/`

Hoặc tạo qua chat: yêu cầu Agent tạo truyện mới.

### Bước 2: Điền glossary (quan trọng)

Mở `books/{source}/{slug}/glossary.json`, thêm tên nhân vật các chương đầu:

```json
{
  "names": {
    "张三": "Trương Tam",
    "李四": "Lý Tứ"
  },
  "places": {
    "清霄门": "Thanh Tiêu Môn"
  }
}
```

### Bước 3: Dịch

Yêu cầu Agent:

```
Dịch books/{source}/{slug}/cn/chuong-1.txt
```

AI tự động:

1. Đọc rules từ `AGENTS.md`
2. Đọc tên nhân vật từ `glossary.json` của truyện
3. Đọc `chuong-1.qt.txt` (nếu tồn tại) song song với CN gốc
4. Dịch + lưu vào `vn/chuong-1.txt`
5. Chạy `check-vn.js` để kiểm tra lỗi
6. Sửa và báo cáo

## Kiểm tra lỗi dịch thủ công

```bash
node scripts/check-vn.js books/{source}/{slug}/vn/chuong-1.txt
```

Phát hiện: CJK còn sót, từ cấm (vợ/chồng), đại từ sai, dấu 3 chấm thay vì 6 chấm, v.v.

## Đóng góp

Xem [CONTRIBUTING.md](CONTRIBUTING.md)
