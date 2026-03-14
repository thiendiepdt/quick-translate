#!/usr/bin/env node
// check-vn.js — Kiểm tra nhanh các từ vi phạm rules trong file VN
// Dùng: node scripts/check-vn.js path/to/vn/chuong-X.txt

const fs = require('fs');
const path = require('path');

const RED = '\x1b[0;31m';
const GREEN = '\x1b[0;32m';
const NC = '\x1b[0m';

const file = process.argv[2];

if (!file) {
  console.log('Dùng: node ' + path.basename(process.argv[1]) + ' <file_vn.txt>');
  process.exit(1);
}

if (!fs.existsSync(file)) {
  console.log('File không tồn tại: ' + file);
  process.exit(1);
}

const content = fs.readFileSync(file, 'utf-8');
const lines = content.split(/\r?\n/);

let found = 0;

function check(regex, msg) {
  const matches = [];
  lines.forEach((line, idx) => {
    regex.lastIndex = 0;
    if (regex.test(line)) {
      matches.push('  ' + (idx + 1) + ': ' + line.trim());
    }
  });
  if (matches.length > 0) {
    console.log(RED + '[VI PHẠM]' + NC + ' ' + msg);
    matches.forEach((m) => console.log(m));
    console.log('');
    found++;
  }
}

console.log('=== Kiểm tra: ' + file + ' ===');
console.log('');

// Ký tự CJK còn sót
check(/[\u4E00-\u9FFF]/gu, 'CJK còn sót (chưa dịch hết!)');

// Đại từ sai
check(/\bvợ\b|\bchồng\b|\bngười vợ\b|\bngười chồng\b/giu, "Dùng 'vợ/chồng' thay vì 'thê tử/phu quân'");
check(/\banh ấy\b|\banh ta\b|\bcô ấy\b|\bchị ấy\b/giu, 'Đại từ sai (dùng hắn/nàng)');
check(/\btôi\b/giu, "Dùng 'tôi' thay vì 'ta'");

// Từ thuần Việt cần tránh
check(/não hải/giu, 'não hải → đầu / đầu óc');
check(/\bHừm\b|\bỪm\b/gu, 'Hừm/Ừm → Ân');
check(/nhận dạng/giu, 'nhận dạng → kiểm trắc');
check(/kho tàng|kho báu/giu, 'kho tàng/báu → bảo khố');
check(/xao động/giu, 'xao động → rung động');
check(/loạn xạ/giu, 'loạn xạ → không mạch lạc');
check(/phát xạ/giu, 'phát xạ → phóng ra');
check(/thích dụng/giu, 'thích dụng → áp dụng');
check(/thúc động/giu, 'thúc động → thôi động');
check(/tiền xa/giu, 'tiền xa → vết xe đổ');
check(/lãnh tình/giu, 'lãnh tình → cảm kích');
check(/đợi lát nữa/giu, 'đợi lát nữa → chờ một hồi');
check(/đại động can qua/giu, 'đại động can qua → làm to chuyện');
check(/nước thu\b/giu, 'nước thu → thu thủy');
check(/là tính là/giu, 'là tính là → xem như');
check(/\bthê tử danh nghĩa/giu, 'sai vị trí → trên danh nghĩa thê tử');
check(/\bđặc ý\b/giu, 'đặc ý → cố ý');
check(/\bvô ý trung\b/giu, 'vô ý trung → trong lúc vô tình');
check(/\bbi thê\b/giu, 'bi thê → bi thương');
check(/\bu thê\b/giu, 'u thê → u sầu (chú ý: không phải phu thê)');
check(/\bnhức óc\b/giu, 'nhức óc → đau đầu');
check(/\bthôi thì\b/giu, 'thôi thì → vậy thì / đã vậy');
check(/\bvô ngữ\b/giu, 'vô ngữ → bó tay');
check(/\bđịch phương\b/giu, 'địch phương → quân địch');
check(/\bhữu phương\b|\bhữu quân\b/giu, 'hữu phương/quân → phe bạn');

// Cuối câu cảm thán
check(/thôi[!"]|thôi$/gium, "Cuối câu: 'thôi' → 'a' (kiểm tra ngữ cảnh)");
check(/rồi[!"]$|rồi$/gium, "Cuối câu: 'rồi' → 'a' hoặc bỏ (kiểm tra ngữ cảnh)");
check(/đi[!"]$|đi$/gium, "Cuối câu: 'đi' (cảm thán) → 'a' (kiểm tra ngữ cảnh)");

// Dấu câu — 3 chấm thay vì 6 chấm
check(/(?<!\.)\.\.\.(?!\.)/gu, 'Dùng ... (3 chấm) thay vì ...... (6 chấm)');

// System text — thiếu khoảng trắng
check(/【[^ \n]/gu, 'System text thiếu khoảng trắng sau 【');
check(/[^ \n]】/gu, 'System text thiếu khoảng trắng trước 】');

console.log('---');
if (found === 0) {
  console.log(GREEN + '✓ Không phát hiện vi phạm rõ ràng. Vẫn nên đọc lại thủ công.' + NC);
} else {
  console.log(RED + '✗ Phát hiện ' + found + ' loại vi phạm. Cần sửa trước khi xuất bản.' + NC);
}
