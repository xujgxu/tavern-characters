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
            <button class="confirm-btn" :disabled="selectedTask === -1" @click="acceptTask">确认接取</button>
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

      <div class="tab-content placeholder" v-else-if="activeTab !== 'basic' && activeTab !== 'app'">
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

function acceptTask() {
  const t = store.data.APP.待选任务?.[selectedTask.value];
  if (!t) return;
  const msg = `我选择接取任务「${t.名称}」`;
  const ta = (window.parent.document as Document).querySelector('#send_textarea') as HTMLTextAreaElement;
  if (ta) {
    ta.value = msg;
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    const btn = window.parent.document.querySelector('#send_but') as HTMLElement;
    if (btn) btn.click();
  }
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

@media (max-width: 400px) {
  .status-card { max-width: 100%; }
  .stat-row { flex-wrap: wrap; }
}
</style>
