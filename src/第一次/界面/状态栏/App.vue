<template>
  <div class="status-card">
    <div class="wave-bg"></div>
    <div class="card-content">
      <div class="tab-nav">
        <button v-for="t in tabs" :key="t.id" class="tab-btn" :class="{ active: activeTab === t.id }" @click="activeTab = t.id">{{ t.label }}</button>
      </div>

      <div class="tab-content" v-if="activeTab === 'basic'">
        <div class="stats-section">
          <div class="stat-row">
            <span class="stat-icon">📅</span>
            <span class="stat-name">日　期</span>
            <span class="stat-val">{{ datePart }}</span>
          </div>

          <div class="stat-row">
            <span class="stat-icon">🕐</span>
            <span class="stat-name">时　间</span>
            <span class="stat-val">{{ timePart }}</span>
          </div>

          <div class="stat-row">
            <span class="stat-icon">📍</span>
            <span class="stat-name">地　点</span>
            <span class="stat-val">{{ locationLabel }}</span>
          </div>

          <div class="stat-row">
            <span class="stat-icon">💰</span>
            <span class="stat-name">金　钱</span>
            <span class="stat-val">{{ store.data.主角.金钱 }}</span>
          </div>

          <div class="stat-row">
            <span class="stat-icon">🍞</span>
            <span class="stat-name">饱食度</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill food" :style="{ width: store.data.主角.饱食度 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.饱食度 }}</span>
            </div>
          </div>

          <div class="stat-row">
            <span class="stat-icon">🧠</span>
            <span class="stat-name">精神值</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill spirit" :style="{ width: store.data.主角.精神值 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.精神值 }}</span>
            </div>
          </div>

          <div class="stat-row">
            <span class="stat-icon">💕</span>
            <span class="stat-name">心情值</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill mood" :style="{ width: store.data.主角.心情值 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.心情值 }}</span>
            </div>
          </div>

          <div class="stat-row">
            <span class="stat-icon">🔞</span>
            <span class="stat-name">色情值</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill erotica" :style="{ width: store.data.主角.整体色情值 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.整体色情值 }}</span>
            </div>
          </div>

          <div class="stat-row">
            <span class="stat-icon">💋</span>
            <span class="stat-name">性欲值</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill libido" :style="{ width: store.data.主角.性欲值 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.性欲值 }}</span>
            </div>
          </div>

          <div class="stat-row">
            <span class="stat-icon">⚡</span>
            <span class="stat-name">快感值</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill pleasure" :style="{ width: store.data.主角.快感值 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.快感值 }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content" v-if="activeTab === 'app'">
        <div class="stats-section">
          <div class="stat-row">
            <span class="stat-icon">📱</span>
            <span class="stat-name">等　级</span>
            <span class="stat-val">{{ levelLabel }}</span>
          </div>

          <div class="stat-row">
            <span class="stat-icon">⭐</span>
            <span class="stat-name">经　验</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill exp" :style="{ width: expPercent + '%' }"></div></div>
            </div>
            <span class="stat-val exp-val">{{ expDisplay }}</span>
          </div>

          <div v-if="store.data.APP.待选任务 && store.data.APP.待选任务.length === 3 && !store.data.APP.当前任务">
            <div class="task-header">📋 可选任务（点击选择）</div>
            <div class="task-card" v-for="(t, i) in store.data.APP.待选任务" :key="i"
                 :class="{ selected: selectedTask === i }" @click="selectedTask = selectedTask === i ? -1 : i">
              <div class="task-title">{{ t.名称 || '任务' + (i + 1) }}</div>
              <div class="task-info">
                <div class="task-row"><span class="task-label">类型</span><span class="task-val">[{{ t.类型 }}] Lv.{{ t.等级 }}</span></div>
                <div class="task-row"><span class="task-label">色情</span><span class="task-val">{{ t.色情维度 }} 级</span></div>
                <div class="task-row"><span class="task-label">社会</span><span class="task-val">{{ t.社会维度 }} 级</span></div>
                <div class="task-row"><span class="task-label">内容</span><span class="task-val task-desc">{{ t.内容 }}</span></div>
                <div class="task-row"><span class="task-label">报酬</span><span class="task-val">{{ t.报酬 }} 元</span></div>
                <div class="task-row" v-if="t.可选挑战"><span class="task-label">挑战</span><span class="task-val task-desc">{{ t.可选挑战 }}</span></div>
              </div>
            </div>
            <button class="confirm-btn" :disabled="selectedTask === -1" @click="clickParentSend">确认接取</button>
          </div>

          <div class="task-card" v-else-if="store.data.APP.当前任务">
            <div class="task-header">📋 当前任务 · {{ store.data.APP.当前任务.名称 || '未命名' }}</div>
            <div class="task-info">
              <div class="task-row"><span class="task-label">类型</span><span class="task-val">{{ store.data.APP.当前任务.类型 }}</span></div>
              <div class="task-row"><span class="task-label">色情</span><span class="task-val">{{ store.data.APP.当前任务.色情维度 }} 级</span></div>
              <div class="task-row"><span class="task-label">社会</span><span class="task-val">{{ store.data.APP.当前任务.社会维度 }} 级</span></div>
              <div class="task-row"><span class="task-label">内容</span><span class="task-val task-desc">{{ store.data.APP.当前任务.内容 }}</span></div>
              <div class="task-row"><span class="task-label">报酬</span><span class="task-val">{{ store.data.APP.当前任务.报酬 }} 元</span></div>
              <div class="task-row" v-if="store.data.APP.当前任务.可选挑战">
                <span class="task-label">挑战</span><span class="task-val task-desc">{{ store.data.APP.当前任务.可选挑战 }}</span>
              </div>
            </div>
          </div>

          <div class="empty-state" v-else-if="!store.data.APP.当前任务">
            <span>{{ taskDayCountdown }}</span>
          </div>
        </div>
      </div>

      <div class="tab-content contacts-layout" v-if="activeTab === 'contacts'">
        <div class="contact-list">
          <div class="contact-item" v-for="(info, name) in store.data.联系人" :key="name" :class="{ active: selectedContact === name }" @click="selectedContact = name">
            <div class="contact-name">{{ name }}</div>
            <div class="contact-affection">❤️{{ info.好感度 }}</div>
          </div>
          <div class="empty-state" v-if="!store.data.联系人 || Object.keys(store.data.联系人).length === 0"><span>暂无联系人</span></div>
        </div>
        <div class="chat-window">
          <div class="chat-header" v-if="selectedContact">{{ selectedContact }}</div>
          <div class="chat-messages">
            <div class="chat-placeholder" v-if="!selectedContact">选择一个联系人以查看消息</div>
            <template v-else>
              <div class="msg-bubble" v-for="(m, i) in (store.data.联系人[selectedContact]?.消息 || [])" :key="i" :class="{ mine: m.发送方 === '主角' }"><div class="msg-text">{{ m.内容 }}</div></div>
              <div class="chat-placeholder" v-if="!(store.data.联系人[selectedContact]?.消息 || []).length">暂无消息记录</div>
            </template>
          </div>
          <div class="chat-input-bar">
            <textarea class="chat-textarea" v-model="contactMsg" placeholder="输入消息…" rows="1" :disabled="!selectedContact"></textarea>
            <button class="chat-send-btn" :disabled="!selectedContact" @click="clickParentSend">发送</button>
          </div>
        </div>
      </div>

      <div class="tab-content cloth-layout" v-if="activeTab === 'clothes'">
        <div class="cloth-panel">
          <div class="cloth-panel-title">当前穿着</div>
          <div class="cloth-card" v-for="(c, i) in store.data.服装?.穿着 || []" :key="'w'+i">
            <div class="cloth-name">{{ c.名称 }}</div>
            <div class="cloth-tags">
              <span class="cloth-tag tag-pos" v-for="t in c.部位标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-style" v-for="t in c.风格标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-color" v-for="t in c.颜色图案标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-erotica">色情值 {{ c.色情值 || 0 }}</span>
            </div>
            <div class="cloth-desc" v-if="showDetail.has('w'+i)">{{ c.描述 }}</div>
            <div class="cloth-actions">
              <button class="cloth-btn" @click="toggleDetail('w'+i)">详细</button>
              <button class="cloth-btn cloth-btn-remove" @click="removeCloth(i)">脱下</button>
            </div>
          </div>
          <div class="empty-state" v-if="!(store.data.服装?.穿着 || []).length">暂未穿着任何衣物</div>
        </div>
        <div class="cloth-panel">
          <div class="cloth-panel-title">可更换</div>
          <div class="cloth-card" v-for="(c, i) in store.data.服装?.可更换 || []" :key="'c'+i">
            <div class="cloth-name">{{ c.名称 }}</div>
            <div class="cloth-tags">
              <span class="cloth-tag tag-pos" v-for="t in c.部位标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-style" v-for="t in c.风格标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-color" v-for="t in c.颜色图案标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-erotica">色情值 {{ c.色情值 || 0 }}</span>
            </div>
            <div class="cloth-desc" v-if="showDetail.has('c'+i)">{{ c.描述 }}</div>
            <div class="cloth-actions">
              <button class="cloth-btn" @click="toggleDetail('c'+i)">详细</button>
              <button class="cloth-btn cloth-btn-wear" @click="wearCloth(i)">穿上</button>
            </div>
          </div>
          <div class="empty-state" v-if="!(store.data.服装?.可更换 || []).length">衣柜为空</div>
        </div>
      </div>

      <div class="tab-content placeholder" v-else-if="activeTab !== 'basic' && activeTab !== 'app' && activeTab !== 'contacts' && activeTab !== 'clothes'">
        <div class="placeholder-text">{{ activeTabName }} — 待开发</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';

const store = useDataStore();

const tabs = [
  { id: 'basic',   label: '基础' },
  { id: 'app',     label: '牝多多' },
  { id: 'contacts',label: '联系人' },
  { id: 'clothes', label: '衣柜' },
  { id: 'schedule',label: '日程' },
  { id: 'map',     label: '地图' },
];

const activeTab = ref('basic');
const selectedTask = ref(-1);
const selectedContact = ref('');
const contactMsg = ref('');

function composeAndSend() {
  const parts: string[] = [];
  const t = store.data.APP.待选任务?.[selectedTask.value];
  if (t) parts.push(`[APP]我选择接取任务「${t.名称}」`);
  const ta = (window.parent.document as Document).querySelector('#send_textarea') as HTMLTextAreaElement;
  if (ta && ta.value.trim()) parts.push(ta.value.trim());
  if (selectedContact.value && contactMsg.value.trim()) parts.push(`[向${selectedContact.value}发送消息]${contactMsg.value.trim()}`);
  if (parts.length === 0) return;
  if (ta) { ta.value = parts.join('\n\n'); ta.dispatchEvent(new Event('input', { bubbles: true })); }
  selectedTask.value = -1;
  contactMsg.value = '';
}

function clickParentSend() {
  const btn = window.parent.document.querySelector('#send_but') as HTMLElement;
  if (btn) btn.click();
}

onMounted(() => {
  const sendBtn = window.parent.document.querySelector('#send_but') as HTMLElement | null;
  if (sendBtn) sendBtn.addEventListener('click', composeAndSend, true);
  const ta = window.parent.document.querySelector('#send_textarea') as HTMLTextAreaElement | null;
  if (ta) ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { composeAndSend(); } }, true);
});

const showDetail = ref(new Set<string>());

function toggleDetail(key: string) {
  if (showDetail.value.has(key)) showDetail.value.delete(key);
  else showDetail.value.add(key);
}

function calcOverall(clothes: any[]) {
  if (!clothes.length) return 0;
  const sum = clothes.reduce((s: number, c: any) => s + (c.色情值 || 0), 0);
  return Math.round(sum / clothes.length);
}

function wearCloth(idx: number) {
  const wardrobe = store.data.服装.可更换 || [];
  const worn = store.data.服装.穿着 || [];
  if (idx < 0 || idx >= wardrobe.length) return;
  const [item] = wardrobe.splice(idx, 1);
  worn.push(item);
  store.data.服装.整体色情值 = calcOverall(worn);
}

function removeCloth(idx: number) {
  const wardrobe = store.data.服装.可更换 || [];
  const worn = store.data.服装.穿着 || [];
  if (idx < 0 || idx >= worn.length) return;
  const [item] = worn.splice(idx, 1);
  wardrobe.push(item);
  store.data.服装.整体色情值 = calcOverall(worn);
}

const levelNames: Record<number, string> = {
  1: '青涩新人', 2: '初级外围', 3: '资深玩物', 4: '知名母狗', 5: '公共便器'
};
const levelExpMin: Record<number, number> = { 1: 0, 2: 150, 3: 1000, 4: 4000, 5: 15000 };
const levelExpNext: Record<number, number> = { 1: 150, 2: 1000, 3: 4000, 4: 15000, 5: 15000 };

const levelLabel = computed(() => {
  const lv = store.data.APP.等级 || 1;
  return `Lv.${lv} ${levelNames[lv] || ''}`;
});

const expPercent = computed(() => {
  const lv = store.data.APP.等级 || 1;
  const cur = store.data.APP.经验值 || 0;
  const min = levelExpMin[lv] || 0;
  const next = levelExpNext[lv] || 15000;
  if (lv >= 5) return 100;
  return Math.round(((cur - min) / (next - min)) * 100);
});

const taskDayCountdown = computed(() => {
  const timeStr = store.data.世界.时间 || '';
  const d = new Date(timeStr);
  if (isNaN(d.getTime())) return '';
  const today = d.getDay();
  const done = store.data.APP?.本周已完成;
  if ((today === 4 || today === 0) && done) return '本周期任务已完成，等待下个任务日';
  if (today === 4 || today === 0) return '任务日已到，打开APP接取任务';
  const now = d.getTime();
  const getNext = (day: number) => { const n = new Date(now); n.setDate(n.getDate() + ((day - n.getDay() + 7) % 7 || 7)); n.setHours(0, 0, 0, 0); return n.getTime(); };
  const next = Math.min(getNext(4), getNext(0));
  const diff = next - now;
  const dd = Math.floor(diff / 86400000);
  const hh = Math.floor((diff % 86400000) / 3600000);
  const mm = Math.floor((diff % 3600000) / 60000);
  return `距离下个任务日还有 ${dd} 天 ${hh} 小时 ${mm} 分钟`;
});

const activeTabName = computed(() => {
  const t = tabs.find(t => t.id === activeTab.value);
  return t ? t.label : '';
});

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
const datePart = computed(() => {
  const raw = (store.data.世界.时间 || '').split(' ')[0] || '';
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return raw + ' 周' + weekDays[d.getDay()];
});
const timePart = computed(() => (store.data.世界.时间 || '').split(' ').slice(1).join(' ') || '');
const locationLabel = computed(() => {
  const loc = store.data.世界.地点 || '';
  const parts = loc.split('_');
  const detail = parts.length > 1 ? parts.slice(1).join('_') : parts[0];
  return detail.replace(/_/g, ' ');
});
</script>

<style lang="scss" scoped>
.status-card {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  font-family: var(--font-mono);
  color: var(--c-text);
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid var(--c-border);
  border-radius: 10px;
  overflow: hidden;
}

.wave-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse at 20% 80%, rgba(180, 40, 40, 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(200, 60, 60, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(140, 20, 20, 0.3) 0%, transparent 70%),
    linear-gradient(180deg, var(--c-bg-deep) 0%, var(--c-bg-mid) 50%, var(--c-bg-deep) 100%);
  background-size: 200% 200%;
  animation: waveFlow 8s ease-in-out infinite;
}

@keyframes waveFlow {
  0%, 100% { background-position: 0% 0%; }
  25% { background-position: 100% 30%; }
  50% { background-position: 50% 100%; }
  75% { background-position: 0% 70%; }
}

.card-content {
  position: relative;
  z-index: 1;
}

.tab-nav {
  display: flex;
  padding: 0;
  gap: 0;
}

.tab-btn {
  flex: 1;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--c-text-dim);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: bold;
  padding: 10px 0;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;

  &:hover { color: var(--c-text); }
  &.active {
    color: var(--c-accent);
    border-bottom-color: var(--c-accent);
  }
}

.tab-content {
  min-height: 400px;
}

.stats-section {
  padding: 12px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon { font-size: 1.1rem; width: 24px; text-align: center; }
.stat-name { font-weight: bold; font-size: 0.9rem; min-width: 60px; color: var(--c-text-dim); }
.stat-val  { font-weight: bold; font-size: 0.9rem; color: var(--c-text); }

.exp-val { font-size: 0.7rem; min-width: 56px; text-align: right; }

.stat-bar-wrap {
  flex: 1;
  position: relative;
  height: 22px;
  display: flex;
  align-items: center;
}

.stat-bar {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.bar-val {
  position: absolute;
  right: 0;
  top: -1px;
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--c-text-dim);
}

.fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.35s ease;
}

.fill.food     { background: #e8a850; }
.fill.spirit   { background: #5badd4; }
.fill.mood     { background: #c47ab4; }
.fill.erotica  { background: #c44a6a; }
.fill.libido   { background: #e05555; }
.fill.pleasure { background: linear-gradient(90deg, #e8a850, #e05555); }

.placeholder {
  padding: 30px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-size: 0.7rem;
  color: var(--c-text-dim);
}

.task-card {
  margin-top: 8px;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;

  &:hover { border-color: var(--c-accent); }
  &.selected { border-color: var(--c-accent); background: rgba(196, 74, 74, 0.08); }
}

.task-title {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--c-text);
  margin-bottom: 8px;
}

.confirm-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  background: var(--c-accent);
  border: none;
  border-radius: 6px;
  color: #fff;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.15s;

  &:disabled { opacity: 0.35; cursor: default; }
  &:not(:disabled):hover { opacity: 0.85; }
}

.task-header {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--c-accent);
  margin-bottom: 10px;
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.task-row {
  display: flex;
  gap: 10px;
  font-size: 0.75rem;
}

.task-label {
  color: var(--c-text-dim);
  min-width: 36px;
}

.task-val {
  color: var(--c-text);
  flex: 1;
}

.task-desc {
  font-size: 0.7rem;
  line-height: 1.5;
}

.empty-state {
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--c-text-dim);
}

.fill.exp { background: linear-gradient(90deg, #c44a6a, #e8a850); }

.contacts-layout { display: flex; height: 400px; }
.contact-list { width: 25%; border-right: 1px solid var(--c-border); overflow-y: auto; display: flex; flex-direction: column; padding: 4px 0; }
.contact-item { padding: 10px 10px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; &:hover { background: rgba(255,255,255,0.03); } &.active { background: rgba(196,74,74,0.1); } }
.contact-name { font-size: 0.75rem; font-weight: bold; color: var(--c-text); margin-bottom: 2px; }
.contact-affection { font-size: 0.6rem; color: var(--c-text-dim); }
.chat-window { flex: 1; display: flex; flex-direction: column; background: rgba(0,0,0,0.15); }
.chat-header { padding: 12px 16px; font-size: 0.8rem; font-weight: bold; color: var(--c-text); border-bottom: 1px solid var(--c-border); text-align: center; }
.chat-messages { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; }
.chat-placeholder { font-size: 0.7rem; color: var(--c-text-dim); text-align: center; padding-top: 60px; }
.chat-input-bar { padding: 10px 14px; border-top: 1px solid var(--c-border); display: flex; gap: 8px; align-items: flex-end; }
.chat-textarea { flex: 1; background: var(--c-bg); border: 1px solid var(--c-border); border-radius: 6px; color: var(--c-text); font-family: var(--font-mono); font-size: 0.7rem; padding: 8px 10px; resize: none; outline: none; &:focus { border-color: var(--c-accent); } &:disabled { opacity: 0.4; } }
.chat-send-btn { padding: 8px 16px; background: var(--c-accent); border: none; border-radius: 6px; color: #fff; font-family: var(--font-mono); font-size: 0.7rem; font-weight: bold; cursor: pointer; white-space: nowrap; &:disabled { opacity: 0.35; cursor: default; } &:not(:disabled):hover { opacity: 0.85; } }
.msg-bubble { max-width: 75%; margin-bottom: 8px; padding: 6px 10px; border-radius: 8px; font-size: 0.7rem; line-height: 1.4; background: rgba(255,255,255,0.06); color: var(--c-text); align-self: flex-start; &.mine { background: rgba(196,74,74,0.2); align-self: flex-end; text-align: right; } }

.cloth-layout { display: flex; min-height: 400px; }
.cloth-panel { flex: 1; padding: 12px 14px; display: flex; flex-direction: column; gap: 10px; &:first-child { border-right: 1px solid var(--c-border); } }
.cloth-panel-title { font-size: 0.85rem; font-weight: bold; color: var(--c-accent); margin-bottom: 4px; }
.cloth-card { background: rgba(255,255,255,0.03); border: 1px solid var(--c-border); border-radius: 6px; padding: 10px 12px; }
.cloth-name { font-size: 0.9rem; font-weight: bold; color: var(--c-text); margin-bottom: 6px; }
.cloth-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px; }
.cloth-tag { display: inline-block; font-size: 0.7rem; font-weight: bold; padding: 3px 8px; border-radius: 4px;
  &.tag-pos   { color: #5badd4; background: rgba(91,173,212,0.15); }
  &.tag-style { color: #c47ab4; background: rgba(196,122,180,0.15); }
  &.tag-color { color: #e8a850; background: rgba(232,168,80,0.15); }
  &.tag-erotica { color: #e05555; background: rgba(224,85,85,0.15); }
}
.cloth-desc { font-size: 0.75rem; color: var(--c-text-dim); line-height: 1.5; margin-top: 6px; }
.cloth-actions { display: flex; gap: 6px; margin-top: 8px; }
.cloth-btn { padding: 4px 10px; border: 1px solid var(--c-border); border-radius: 4px; background: rgba(255,255,255,0.04); color: var(--c-text-dim); font-family: var(--font-mono); font-size: 0.65rem; cursor: pointer; transition: all 0.15s; &:hover { background: rgba(255,255,255,0.08); color: var(--c-text); } }
.cloth-btn-wear { border-color: var(--c-food-high); color: var(--c-food-high); &:hover { background: rgba(78,203,113,0.1); } }
.cloth-btn-remove { border-color: var(--c-food-low); color: var(--c-food-low); &:hover { background: rgba(224,85,69,0.1); } }

.contacts-theme { background: rgb(255,204,191); border-color: rgba(0,0,0,0.1); color: #4a2020; .wave-bg { display: none; } .tab-btn { color: rgba(74,32,32,0.5); &:hover { color: rgba(74,32,32,0.8); } &.active { color: var(--c-accent); background: rgba(0,0,0,0.04); } } .chat-header { color: #4a2020; border-color: rgba(0,0,0,0.08); } .contact-name { color: #fff; } .contact-affection { color: rgba(255,255,255,0.7); } .chat-textarea { background: rgba(255,255,255,0.6); color: #4a2020; border-color: rgba(0,0,0,0.08); } .chat-messages { background: rgba(0,0,0,0.02); } .chat-input-bar { border-color: rgba(0,0,0,0.08); } .msg-bubble { background: rgba(255,255,255,0.5); color: #4a2020; &.mine { background: rgba(255,255,255,0.75); } } .contact-item { border-color: rgba(255,255,255,0.15); &:hover { background: rgba(255,255,255,0.1); } &.active { background: rgba(255,255,255,0.18); } } .contact-list { background: rgb(240,128,128); border-color: rgba(255,255,255,0.2); } }

@media (max-width: 400px) {
  .status-card { max-width: 100%; }
  .stat-row { flex-wrap: wrap; }
}
</style>
