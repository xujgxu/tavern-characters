const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, 'src/墨墨露出/世界书/事件节点');

const numbers = [
  '三', '四', '五', '六', '七', '八', '九', '十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十'
];

for (const num of numbers) {
  const filePath = path.join(dir, `游泳队第${num}次集训.txt`);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping (not found): ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const result = [];

  let skipUntilBracket = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('【前置事件】') || line.startsWith('【后续节点】') || line.startsWith('【铺垫时间】')) {
      continue;
    }

    if (line.startsWith('【铺垫方式】') || line.startsWith('【事件理想流程】')) {
      skipUntilBracket = true;
      continue;
    }

    if (skipUntilBracket) {
      if (line.startsWith('【')) {
        skipUntilBracket = false;
        result.push(line);
      }
      continue;
    }

    result.push(line);
  }

  const output = result.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  fs.writeFileSync(filePath, output + '\n', 'utf-8');
  console.log(`Processed: 游泳队第${num}次集训.txt`);
}

console.log('Done.');
