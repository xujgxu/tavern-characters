const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '前身/脚本/status_bar_injector/index.ts');
const destDir = path.resolve(__dirname, 'src/墨墨露出/脚本/status_bar_injector');
const renderDir = path.resolve(destDir, 'render');

const src = fs.readFileSync(srcPath, 'utf8');
const lines = src.split('\n');

// Extract line ranges (1-indexed)
function getRange(startInc, endInc) {
  return lines.slice(startInc - 1, endInc).join('\n');
}

// ===== 1. constant.ts =====
// Constants & defaults (extracted from getData, DEFAULTS, LEVEL_*, STAT_*, TAG_ORDER, ALL_DOTS)
// Lines 6-8: IIFE wrapper start
// Lines 1-4: comment header
// Const definitions are scattered. Let me extract the main blocks.

// Replace the IIFE-wrapped script with module imports
// The original structure: $(() => { STYLE const; util fns; panel fns; core fns; start(); });

// I'll regenerate the main index.ts as import-based
// and create each module by extracting the relevant code.

// Step 1: Identify exact line ranges for each section
const sections = {
  // STYLE: lines 8-963 (the multiline template literal)
  style: { start: 8, end: 963 },
  // util functions
  esc: { start: 966, end: 970 },
  num: { start: 976, end: 979 },
  parseTime: { start: 981, end: 985 },
  getWeekDay: { start: 987, end: 993 },
  scanPatchTime: { start: 995, end: 1008 },
  getData: { start: 1010, end: 1051 },
  riskClass: { start: 1053, end: 1056 },
  statColor: { start: 1058, end: 1065 },
  label: { start: 1067, end: 1067 },
  tagClass: { start: 1069, end: 1077 },
  getClothingTags: { start: 1079, end: 1089 },
  sortEntries: { start: 1092, end: 1099 },
  // map data + rendering
  nearLines: { start: 1102, end: 1403 },
  renderMapPanel: { start: 1405, end: 1451 },
  // injectStyles, renderHeader, renderStatsPanel
  injectStyles: { start: 1454, end: 1459 },
  renderHeader: { start: 1462, end: 1474 },
  renderStatsPanel: { start: 1476, end: 1540 },
  renderAppPanel: { start: 1542, end: 1639 },
  renderContactsPanel: { start: 1641, end: 1667 },
  isAI: { start: 1669, end: 1686 },
  renderContactArea: { start: 1688, end: 1703 },
  rebuildWearChanged: { start: 1705, end: 1713 },
  resetClosetState: { start: 1715, end: 1720 },
  renderClosetPanel: { start: 1722, end: 1814 },
  // Core builder + event handlers
  buildStatusBar: { start: 1816, end: 1834 },
  attachTabHandlers: { start: 1836, end: 1841 },
  handleTabClick: { start: 1843, end: 1860 },
  foldVariableUpdates: { start: 1862, end: 1875 },
  injectStatusBar: { start: 1877, end: 1916 },
  reInjectAll: { start: 1918, end: 1923 },
  scanExistingTasks: { start: 1925, end: 1958 },
  parseTaskBlocks: { start: 1960, end: 2037 },
  parseRawJSONPatchTasks: { start: 2039, end: 2069 },
  refreshAllBars: { start: 2071, end: 2106 },
  // DEFAULTS constant (inline in getData): can't extract, keep in index
};

// ===== Write modules =====

// 1. style.ts - the CSS constant
let styleContent = `/* 墨墨露出 · 状态栏样式 */
const STYLE = \`\n`;
styleContent += lines.slice(7, 963).join('\n');
styleContent += `\n\`;\nexport default STYLE;\n`;
// Clean up the prefix line (the original `const STYLE = \``)
styleContent = styleContent.replace("`\n@import", "@import");
fs.writeFileSync(path.resolve(renderDir, 'style.ts'), styleContent);
console.log('style.ts');

// 2. util.ts - utility functions
let utilContent = `/* 墨墨露出 · 状态栏工具函数 */\n`;
utilContent += getRange(966, 993) + '\n';
utilContent += getRange(995, 1051) + '\n';
utilContent += getRange(1053, 1099) + '\n';
// Convert to exports
utilContent = utilContent
  .replace(/^function esc/g, 'export function esc')
  .replace(/^function num/g, 'export function num')
  .replace(/^function parseTime/g, 'export function parseTime')
  .replace(/^function getWeekDay/g, 'export function getWeekDay')
  .replace(/^function scanPatchTime/g, 'export function scanPatchTime')
  .replace(/^function getData/g, 'export function getData')
  .replace(/^function riskClass/g, 'export function riskClass')
  .replace(/^function statColor/g, 'export function statColor')
  .replace(/^function label/g, 'export function label')
  .replace(/^function tagClass/g, 'export function tagClass')
  .replace(/^function getClothingTags/g, 'export function getClothingTags')
  .replace(/^function sortEntries/g, 'export function sortEntries');
fs.writeFileSync(path.resolve(renderDir, 'util.ts'), utilContent);
console.log('util.ts');

// 3. render/map.txt + renderMapPanel
let mapContent = `/* 墨墨露出 · 地图渲染 */\n`;
mapContent += getRange(1102, 1403) + '\n';
mapContent += getRange(1405, 1451) + '\n';
mapContent = mapContent
  .replace(/^function nearLines/g, 'export function nearLines')
  .replace(/^function renderMapPanel/g, 'export function renderMapPanel');
fs.writeFileSync(path.resolve(renderDir, 'map.ts'), mapContent);
console.log('map.ts');

// 4. render/header.ts
let headerContent = `/* 墨墨露出 · 头部渲染 */\n`;
headerContent += getRange(1462, 1474) + '\n';
headerContent = headerContent.replace(/^function renderHeader/g, 'export function renderHeader');
fs.writeFileSync(path.resolve(renderDir, 'header.ts'), headerContent);
console.log('header.ts');

// 5. render/stats.ts
let statsContent = `/* 墨墨露出 · 状态面板渲染 */\n`;
statsContent += getRange(1476, 1540) + '\n';
statsContent = statsContent.replace(/^function renderStatsPanel/g, 'export function renderStatsPanel');
fs.writeFileSync(path.resolve(renderDir, 'stats.ts'), statsContent);
console.log('stats.ts');

// 6. render/apps.ts
let appsContent = `/* 墨墨露出 · 牝多多面板渲染 */\n`;
appsContent += getRange(1542, 1639) + '\n';
appsContent = appsContent.replace(/^function renderAppPanel/g, 'export function renderAppPanel');
fs.writeFileSync(path.resolve(renderDir, 'apps.ts'), appsContent);
console.log('apps.ts');

// 7. render/contacts.ts
let contactsContent = `/* 墨墨露出 · 联系人面板渲染 */\n`;
contactsContent += getRange(1641, 1703) + '\n';
contactsContent = contactsContent
  .replace(/^function renderContactsPanel/g, 'export function renderContactsPanel')
  .replace(/^function renderContactArea/g, 'export function renderContactArea');
fs.writeFileSync(path.resolve(renderDir, 'contacts.ts'), contactsContent);
console.log('contacts.ts');

// 8. render/closet.ts
let closetContent = `/* 墨墨露出 · 服装面板渲染 */\n`;
closetContent += getRange(1705, 1814) + '\n';
closetContent = closetContent
  .replace(/^function rebuildWearChanged/g, 'export function rebuildWearChanged')
  .replace(/^function resetClosetState/g, 'export function resetClosetState')
  .replace(/^function renderClosetPanel/g, 'export function renderClosetPanel');
fs.writeFileSync(path.resolve(renderDir, 'closet.ts'), closetContent);
console.log('closet.ts');

// 9. events.ts - event handlers and task parsing
let eventsContent = `/* 墨墨露出 · 事件处理 + 任务解析 */\n`;
eventsContent += getRange(1925, 2069) + '\n';
eventsContent = eventsContent
  .replace(/^function scanExistingTasks/g, 'export function scanExistingTasks')
  .replace(/^function parseTaskBlocks/g, 'export function parseTaskBlocks')
  .replace(/^function parseRawJSONPatchTasks/g, 'export function parseRawJSONPatchTasks')
  .replace(/^function refreshAllBars/g, 'export function refreshAllBars');
fs.writeFileSync(path.resolve(renderDir, 'events.ts'), eventsContent);
console.log('events.ts');

// 10. rebuild index.ts - import all modules
let indexContent = `/* ============================
   墨墨露出 · 状态栏入口（模块化版）
   ============================ */
import STYLE from './render/style';
import {
  esc, num, parseTime, getWeekDay, scanPatchTime, getData, riskClass,
  statColor, label, tagClass, getClothingTags, sortEntries
} from './render/util';
import { nearLines, renderMapPanel } from './render/map';
import { renderHeader } from './render/header';
import { renderStatsPanel } from './render/stats';
import { renderAppPanel } from './render/apps';
import { renderContactsPanel, renderContactArea } from './render/contacts';
import { renderClosetPanel, rebuildWearChanged, resetClosetState } from './render/closet';
import { scanExistingTasks, parseTaskBlocks, parseRawJSONPatchTasks, refreshAllBars } from './render/events';

$(() => {
const pDoc = window.parent.document;
const CONT_CLASS = 'momo-status-bar-container';

const DEFAULTS = {
  数值: { 饱食度: 70, 精神值: 85, 心情值: 75, 整体色情值: 22, 快感值: 0, 性欲值: 10 },
  主角: { 金钱: 25000 },
  世界: { 当前时间: '2024-09-01 07:45', 当前地点: '西部住宅区_绿洲景苑小区_卧室' },
  日程: { 日期: '2024-09-01', 星期: '日', 牝多多等级: 1, 牝多多经验: 0 },
};
const LEVEL_NAMES = Object.freeze({ 1: '青涩新人', 2: '初级外围', 3: '资深玩物', 4: '知名母狗', 5: '公共便器' });
const LEVEL_EXP   = Object.freeze({ 1: 150, 2: 1000, 3: 4000, 4: 15000, 5: Infinity });
const TAG_ORDER   = Object.freeze(['外套','内衬','内衣','下装','内裤','腿部','鞋','包','其它']);
const AVATAR_COLORS = Object.freeze(['#ff6b9d','#a2d2ff','#a2e3c4','#ffb3c6','#c084fc','#e8a0bf','#7ec8e3','#ffc107']);
export { LEVEL_NAMES, LEVEL_EXP, TAG_ORDER, AVATAR_COLORS, DEFAULTS };

// State
var momoWearList = ['白色蕾丝睡裙'];
var momoWearPutOn = new Set();
var momoWearTakenOff = new Set();
var momoWearInitial = new Set(momoWearList);
var momoWearChanged = [];
var currentContact = null;
var contactChats = {};
var contactInputs = {};
var selectedTaskIdx = -1;
var currentAvailableTasks = null;

// ---- injectStyles ----
${getRange(1454, 1459)}

// ---- buildStatusBar ----
${getRange(1816, 1834)}

// ---- attachTabHandlers ----
${getRange(1836, 1841)}

// ---- injectStatusBar ----
${getRange(1877, 1916)}

// ---- reInjectAll ----
${getRange(1918, 1923)}

// ---- start ----
${getRange(2114, 2564)}
`;

// Fix the start function to use imported helpers instead of local scope
// The original uses `getData()`, `num()`, `esc()` etc from the IIFE closure
// Since we import them, they're already in scope
// The DEFAULTS, LEVEL_NAMES etc need to be accessible - they're defined above

// Also need to make getData, num, esc, parseTime, getWeekDay available as they were before
// Wrap the utility functions so they can reference the pDoc variable

// Fix getData to use DEFAULTS from the module scope
indexContent = indexContent.replace(
  'function getData()',
  '// getData is now imported from util.ts - uses a pDoc reference\nfunction getData()'
);

// The original getData uses pDoc internally. We need to fix the export.
// Actually, getData doesn't use pDoc - it uses getVariables() from the outer scope.
// But the imported getData references `pDoc` which is module-scoped here. That's fine since
// getData() from util.ts doesn't use pDoc either.

// The issue: imported getData uses inline DEFAULTS. We need to use the module-level DEFAULTS.
// Let me fix by having index.ts define DEFAULTS on window for util.ts to use

// Actually the simplest approach: override the exported getData with one that uses our DEFAULTS
indexContent += `
// Override imported getData with module-scoped DEFAULTS
window.__momoGetData = function() {
  try {
    const v = getVariables({ type: 'message' });
    const sd = v?.stat_data || v?.display_data;
    if (sd && typeof sd === 'object' && Object.keys(sd).length > 0) return sd;
  } catch (e) {}
  try {
    const cv = getVariables({ type: 'character' });
    if (cv && (cv['数值'] || cv['日程'])) return cv;
  } catch (e) {}
  return { ...DEFAULTS };
};
window.__momoGetData();
`;

fs.writeFileSync(path.resolve(destDir, 'index.ts'), indexContent);
console.log('index.ts');

// Remove temp file
fs.unlinkSync(path.resolve(__dirname, '_analyze.js'));
console.log('Done - all modules generated from 前身 without modifying it');
