const fs = require('fs');
let c = fs.readFileSync('E:/tavern_helper_template-main/dist/墨墨露出/脚本/status_bar_injector/index.js', 'utf8');
// Replace the end of the buildStatusBar template string
const search = '</div>\n  </svg>\n  </div>\n</div></div>\n`';
const replace = '</div>\n  </svg>\n  </div>\n</div>\n<div class="msb-footer">\n  <span class="msb-footer-item"><span class="msb-footer-label">💰</span><span class="msb-footer-val money">25000元</span></span>\n  <span>2024-09-01 07:30</span>\n</div></div>\n`';
c = c.replace(search, replace);
fs.writeFileSync('E:/tavern_helper_template-main/dist/墨墨露出/脚本/status_bar_injector/index.js', c, 'utf8');
console.log('done');
