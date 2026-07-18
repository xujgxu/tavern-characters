<template>
  <div class="status-card">
    <div class="wave-bg"></div>
    <div class="card-content">
      <div class="info-section">
        <div class="info-row">日期：{{ datePart }}</div>
        <div class="info-row">时间：{{ timePart }}</div>
        <div class="info-row">地点：{{ locationLabel }}</div>
      </div>

      <div class="stats-section">
        <div class="stat-row">
          <span class="stat-icon">💰</span>
          <span class="stat-name">金钱</span>
          <span class="stat-val">{{ store.data.主角.金钱 }}</span>
        </div>

        <div class="stat-row">
          <span class="stat-icon">🍞</span>
          <span class="stat-name">饱食度</span>
          <div class="stat-bar"><div class="fill food" :style="{ width: store.data.主角.饱食度 + '%' }"></div></div>
          <span class="stat-val">{{ store.data.主角.饱食度 }}</span>
        </div>

        <div class="stat-row">
          <span class="stat-icon">🧠</span>
          <span class="stat-name">精神值</span>
          <div class="stat-bar"><div class="fill spirit" :style="{ width: store.data.主角.精神值 + '%' }"></div></div>
          <span class="stat-val">{{ store.data.主角.精神值 }}</span>
        </div>

        <div class="stat-row">
          <span class="stat-icon">💕</span>
          <span class="stat-name">心情值</span>
          <div class="stat-bar"><div class="fill mood" :style="{ width: store.data.主角.心情值 + '%' }"></div></div>
          <span class="stat-val">{{ store.data.主角.心情值 }}</span>
        </div>

        <div class="stat-row">
          <span class="stat-icon">🔞</span>
          <span class="stat-name">色情值</span>
          <div class="stat-bar"><div class="fill erotica" :style="{ width: store.data.主角.整体色情值 + '%' }"></div></div>
          <span class="stat-val">{{ store.data.主角.整体色情值 }}</span>
        </div>

        <div class="stat-row">
          <span class="stat-icon">💋</span>
          <span class="stat-name">性欲值</span>
          <div class="stat-bar"><div class="fill libido" :style="{ width: store.data.主角.性欲值 + '%' }"></div></div>
          <span class="stat-val">{{ store.data.主角.性欲值 }}</span>
        </div>

        <div class="stat-row">
          <span class="stat-icon">⚡</span>
          <span class="stat-name">快感值</span>
          <div class="stat-bar"><div class="fill pleasure" :style="{ width: store.data.主角.快感值 + '%' }"></div></div>
          <span class="stat-val">{{ store.data.主角.快感值 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';

const store = useDataStore();

const datePart = computed(() => (store.data.世界.时间 || '').split(' ')[0] || '');
const timePart = computed(() => (store.data.世界.时间 || '').split(' ').slice(1).join(' ') || '');
const locationLabel = computed(() => {
  const loc = store.data.世界.地点 || '';
  const parts = loc.split('_');
  return parts.length > 1 ? parts.slice(1).join(' ') : parts[0].replace(/_/g, ' ');
});
</script>

<style lang="scss" scoped>
.status-card {
  position: relative;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  font-family: var(--font-mono);
  color: var(--c-text);
  font-size: 11px;
  line-height: 1.45;
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

.info-section {
  padding: 14px 16px 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-row {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--c-text);
}

.stats-section {
  padding: 10px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-icon {
  font-size: 0.85rem;
  width: 18px;
  text-align: center;
}

.stat-name {
  font-weight: bold;
  font-size: 0.7rem;
  min-width: 40px;
  color: var(--c-text-dim);
}

.stat-val {
  font-weight: bold;
  font-size: 0.75rem;
  min-width: 48px;
  text-align: right;
}

.stat-bar {
  flex: 1;
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
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

@media (max-width: 400px) {
  .status-card { max-width: 100%; }
  .stat-row { flex-wrap: wrap; }
}
</style>
