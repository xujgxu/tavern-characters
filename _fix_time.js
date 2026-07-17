const fs = require('fs');
let c = fs.readFileSync('E:/tavern_helper_template-main/src/墨墨露出/脚本/status_bar_injector/index.ts', 'utf8');
// Change the trigger from '### 额外请求' to '[额外请求]'
c = c.replace("'### 额外请求'", "'[额外请求]'");
fs.writeFileSync('E:/tavern_helper_template-main/src/墨墨露出/脚本/status_bar_injector/index.ts', c, 'utf8');
console.log('done');
