#!/usr/bin/env node
// new-book.js — Tạo thư mục + files template cho truyện mới
// Dùng: node scripts/new-book.js

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const slugify = require('slugify');

const GREEN = '\x1b[0;32m';
const CYAN = '\x1b[0;36m';
const YELLOW = '\x1b[1;33m';
const NC = '\x1b[0m';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log('');
  console.log(`${CYAN}=== Tạo truyện mới ===${NC}`);
  console.log('');

  // --- Thu thập thông tin ---
  const novelName = await ask('Tên truyện (tiếng Việt, VD: Tiên Phu): ');
  const source = await ask('Nguồn (fanqie/qidian/other): ');
  const bookId = await ask('Book ID (lấy từ URL truyện, có thể để trống): ');
  const protagonist = await ask('Tên nhân vật chính: ');

  // --- Tạo slug ---
  const slug = slugify(novelName, {
    lower: true,
    strict: true,
    locale: 'vi',
  });

  if (!slug) {
    console.log('Không thể tạo slug từ tên truyện. Hãy thử lại.');
    rl.close();
    process.exit(1);
  }

  const bookDir = path.join('books', source, slug);

  console.log('');
  console.log(`Thư mục sẽ được tạo: ${YELLOW}${bookDir}${NC}`);
  const confirm = await ask('Xác nhận? (y/n): ');

  if (confirm.toLowerCase() !== 'y') {
    console.log('Đã hủy.');
    rl.close();
    process.exit(0);
  }

  // --- Tạo thư mục ---
  fs.mkdirSync(path.join(bookDir, 'cn'), { recursive: true });
  fs.mkdirSync(path.join(bookDir, 'vn'), { recursive: true });
  fs.writeFileSync(path.join(bookDir, 'cn', '.gitkeep'), '');
  fs.writeFileSync(path.join(bookDir, 'vn', '.gitkeep'), '');

  // --- Tạo metadata.json ---
  const metadata = {
    novel: novelName,
    source: source,
    book_id: bookId || '',
    slug: slug,
    protagonist: protagonist,
    created_at: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(bookDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2) + '\n'
  );

  // --- Tạo glossary.json ---
  const glossary = {
    names: {},
    places: {},
    items: {},
    creatures: {},
    skills: {},
    common: {},
    signature_phrases: {},
  };
  fs.writeFileSync(
    path.join(bookDir, 'glossary.json'),
    JSON.stringify(glossary, null, 2) + '\n'
  );

  // --- Tạo style.json ---
  const style = {
    novel: novelName,
    protagonist: protagonist,
    voice: 'Mô tả cá tính nhân vật chính — chỉnh lại cho phù hợp',
    tone_rules: [
      'NGUYÊN TẮC CỐT LÕI: Style chỉ ảnh hưởng CÁCH DIỄN ĐẠT — TUYỆT ĐỐI KHÔNG thêm nội dung không có trong bản CN gốc',
      'Thêm quy tắc riêng của truyện này',
    ],
    signature_phrases: {},
    avoid: ['Liệt kê những lỗi dịch cần tránh đặc thù cho truyện này'],
  };
  fs.writeFileSync(
    path.join(bookDir, 'style.json'),
    JSON.stringify(style, null, 2) + '\n'
  );

  // --- Kết quả ---
  console.log('');
  console.log(`${GREEN}✓ Đã tạo thư mục truyện: ${bookDir}${NC}`);
  console.log('');
  console.log('Bước tiếp theo:');
  console.log(`  1. Thêm tên nhân vật vào ${YELLOW}${bookDir}/glossary.json${NC}`);
  console.log(`  2. Chỉnh giọng văn trong ${YELLOW}${bookDir}/style.json${NC}`);
  console.log(`  3. Copy file CN vào ${YELLOW}${bookDir}/cn/${NC}`);
  console.log(`  4. Dịch: mở Antigravity và yêu cầu dịch ${bookDir}/cn/chuong-1.txt`);
  console.log('');

  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
