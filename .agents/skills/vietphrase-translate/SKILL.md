---
name: vietphrase-translate
description: Dịch truyện tu tiên tiếng Trung sang tiếng Việt theo phong cách Vietphrase convert + edit. Dùng khi dịch file CN sang VN, review bản dịch, sửa từ vựng vi phạm rules, hoặc cập nhật glossary cho truyện chữ Hán.
---

# Vietphrase Translate Skill

Skill này hướng dẫn agent dịch và review truyện tu tiên Trung → Việt theo phong cách **Quick Translator + Vietphrase convert + edit**.

## Tài liệu tham chiếu bắt buộc

Trước bất kỳ tác vụ nào liên quan đến dịch thuật, PHẢI đọc **đủ cả 5 file** sau:

1. **`AGENTS.md`** — toàn bộ rules dịch thuật
2. **`glossary.json`** *(ở ROOT project, không phải trong folder truyện)* — thuật ngữ tu tiên chung, áp dụng cho mọi truyện
3. **`books/<source>/<slug>/glossary.json`** *(trong folder truyện)* — tên nhân vật / địa danh riêng của truyện này. Ưu tiên cao hơn glossary root nếu có xung đột
4. **`books/<source>/<slug>/style.json`** *(nếu tồn tại)* — giọng văn / tone đặc thù của truyện. Override AGENTS.md
5. **`scripts/check-vn.js`** — script kiểm tra vi phạm rules (chạy sau khi dịch/sửa)

## Quy trình dịch

### Bước 1 — Chuẩn bị
- Đọc `AGENTS.md`
- Đọc **`glossary.json` ở ROOT** (thuật ngữ tu tiên chung)
- Đọc **`books/<source>/<slug>/glossary.json`** (tên nhân vật riêng của truyện)
- Kiểm tra `books/<source>/<slug>/style.json` — **PHẢI đọc nếu tồn tại**
  - `voice`: tính cách nhân vật chính → áp dụng cho toàn bộ bản dịch
  - `tone_rules`: quy tắc dịch nội tâm/thoại riêng cho truyện này
  - `signature_phrases`: cụm từ đặc trưng — ưu tiên dùng thay vì cách dịch thông thường
  - `avoid`: những từ/cách diễn đạt cần tránh riêng cho truyện này
- Xác định đường dẫn:
  - File CN gốc (bắt buộc): `cn/chuong-X.txt`
  - File QT (nếu tồn tại): `cn/chuong-X.qt.txt` — **PHẢI đọc nếu có**
  - Output: `vn/chuong-X.txt`

### Bước 2 — Dual-reference: đọc cả CN + QT
Nếu có file `.qt.txt` cùng tên chương:
- **Đọc song song cả 2 file**: CN gốc (nguồn chính xác) + QT (bản map từng chữ)
- Dùng CN để đảm bảo nghĩa đúng, dùng QT như "skeleton" từng chữ để không bỏ sót
- **KHÔNG bê nguyên văn QT** — phải edit toàn bộ theo rules AGENTS.md

> QT là bản dịch máy thô, cứng nhắc. Nhiệm vụ của agent là biến QT thành bản convert mượt theo AGENTS.md.

### Bước 3 — Hỏi người dùng trước khi dịch (BẮT BUỘC)
Sau khi đọc xong CN + QT, **DỪNG LẠI** và hỏi người dùng về:

1. **Từ/cụm từ mơ hồ**: Những chỗ có nhiều cách dịch hợp lý, không rõ mày muốn theo hướng nào
   - Ví dụ: tên kỹ năng/chiêu thức mới chưa có trong glossary → nên dịch sát hay giữ nguyên âm Hán-Việt?
   - Ví dụ: cảnh giới/thuật ngữ mới → cần confirm cách viết
2. **Tone của nhân vật**: Nhân vật mới xuất hiện → hỏi giới tính, vai vế để chọn đại từ đúng nếu không rõ
3. **Từ thô/lóng**: Những câu욕 chửi, tiếng lóng game/cultivation không có trong AGENTS.md → hỏi mày muốn dịch theo hướng nào

Format hỏi ngắn gọn, liệt kê từng điểm cụ thể. Sau khi mày trả lời xong mới bắt đầu dịch.

> **Ngoại lệ**: Nếu không có điểm nào mơ hồ, có thể dịch luôn mà không cần hỏi.

### Bước 4 — Dịch

> **❗ NGUYÊN TẮC SỐ MỘT: NGUYÊN TÁC HÀNG ĐẦU.** Tuyệt đối bám sát văn bản gốc (CN + QT). Không được phóng tác, không thêm câu, không thêm nội dung không có trong gốc. Style chỉ điều chỉnh **cách chọn từ và nhịp câu**, không được viết thêm bất kỳ ý gì không có trong CN.

Dịch theo thứ tự ưu tiên:
1. Nguyên tác hàng đầu — **bám sát CN gốc**, không phóng tác
2. Câu phải **hiểu được ngay** khi đọc lần đầu
3. Giữ chất **Hán-Việt / convert** (không Việt hóa thuần)
4. Sát gốc từng chữ (chỉ khi câu vẫn tự nhiên)

Lưu kết quả ra file VN — KHÔNG show ra chat.

### Bước 5 — Auto review (BẮT BUỘC sau khi lưu file)

```bash
node scripts/check-vn.js <đường_dẫn_file_vn>
```

- Đọc output, kiểm tra ngữ cảnh từng vi phạm
- Sửa trực tiếp vào file VN
- Chạy lại script để xác nhận sạch

### Bước 5b — AI đọc lại toàn bộ bản dịch (BẮT BUỘC)

Sau khi script sạch, **đọc lại file VN từ đầu đến cuối** như một người đọc truyện bình thường. Tìm và sửa những chỗ:

- Câu đọc **nghe không tự nhiên / awkward** dù không vi phạm rule nào
- Cụm từ **lặp từ** liên tiếp trong cùng đoạn (VD: "quả nhiên" 2-3 lần liền)
- Câu **quá dài, khó hiểu** — tách hoặc đổi trật tự từ cho mượt hơn
- Đảo ngữ cổ phong **chưa áp dụng** cho các cụm `[danh từ] của [tông/pháp bảo]`
- Tiếng lóng / cảm thán **quá thuần Việt** lọt qua script

> Tiêu chí: đọc một lần, hiểu ngay, cảm giác đang đọc bản convert đã được editor chỉnh — không phải bản dịch máy.

Sửa trực tiếp vào file VN. **Không cần hỏi người dùng** với những sửa nhỏ hiển nhiên.

### Bước 6 — Báo cáo
Tóm tắt ngắn: đã dịch xong + những gì sửa trong review + những quyết định từ bước hỏi.

## Checklist nhanh trước khi submit

- [ ] Đã đọc `style.json` (nếu tồn tại) — voice + tone_rules đã áp dụng
- [ ] Đã đọc cả CN gốc + QT (nếu có)
- [ ] Đã hỏi người dùng về từ mơ hồ (nếu cần) và nhận được câu trả lời
- [ ] Không sót ký tự CJK (U+4E00–U+9FFF)
- [ ] Đại từ đúng: hắn / nàng / ta / ngươi
- [ ] Không dùng: vợ, chồng, não hải, xao động, kho tàng, phát xạ, **thiên sắc** (dùng "sắc trời"), **một lũ** (dùng "một đám"), **e rằng** (dùng "chỉ sợ"), **một lát** (dùng "một hồi"), **Bành** (âm thanh va đập, dùng "Phanh")...
- [ ] Cuối câu cảm thán: **"thôi / rồi / đi"** → **"a"** hoặc lược bỏ; **"đã" cuối câu thoại (爐)** → "sảng khoái" (không dùng "đã" như thán từ cuối câu)
- [ ] Thành ngữ không phiên âm thô (大动干戈 → làm to chuyện, 眸若秋水 → thu thủy...)
- [ ] **Đảo ngữ cổ phong**: cụm "X của [tông/pháp bảo]" → "[tông/pháp bảo] X" (VD: "Thái Âm Kiếm Tông truyền thừa", "Thái Âm Kiếm Tông hậu sơn") — địa điểm thuần Việt không Hán-Việt mới giữ nguyên
- [ ] System text: `【 nội dung 】` có khoảng trắng
- [ ] Dấu: `......` (6 chấm), không phải `...` (3 chấm)
- [ ] Nội tâm nhân vật chính khớp với `voice` trong style.json

## Lưu ý quan trọng

- **NGUYÊN TÁC HÀNG ĐẦU**: Không phóng tác, không thêm câu, không thêm ý không có trong CN gốc. Kiểm đếm số câu/ý trong CN và VN phải khớp nhau.
- `scripts/check-vn.sh` có thể có **false positive**: `rồi` giữa câu, `mà thôi` giải thích nhẹ, `phu thê` (không phải `u thê`), `chồng lên` (động từ, không phải danh từ) — phải xem ngữ cảnh trước khi sửa
- `phần` → `thành` chỉ khi là đơn vị tỉ lệ (八成/一成), không áp dụng cho 份 (phần chia)
- **Đảo ngữ cổ phong**: cụm `[danh từ] của [tông/pháp bảo]` → `[tông/pháp bảo] [danh từ]`. Địa điểm có Hán-Việt: áp dụng bình thường (`núi sau của X` → `X hậu sơn`). Địa điểm thuần Việt: giữ nguyên
- Tên nhân vật mới chưa có trong glossary → tự phiên âm Hán-Việt, dùng nhất quán, đề xuất thêm vào glossary
- QT file có thể sai nghĩa một số chỗ — CN gốc luôn là nguồn sự thật cuối cùng
