<template>
  <div class="status-card">
    <div class="wave-bg"></div>
    <div class="card-content">
      <div class="time-section">
        <span class="time-value">{{ store.data.世界.时间 }}</span>
        <div class="compact-row">
          <span class="compact-item">💰{{ store.data.主角.金钱 }}</span>
          <span class="compact-item" :class="eroticaColor">🔞{{ store.data.主角.整体色情值 }}</span>
        </div>
      </div>

      <div class="stats-section">
        <div class="stat-item">
          <div class="stat-header">
            <span class="stat-icon">🍞</span>
            <span class="stat-name">饱食度</span>
            <span class="stat-num">{{ store.data.主角.饱食度 }}</span>
            <span class="stat-tag" :class="satietyStatus.color">{{ satietyStatus.label }}</span>
          </div>
          <div class="stat-bar">
            <div class="stat-bar-inner" :class="satietyStatus.color" :style="{ width: store.data.主角.饱食度 + '%' }"></div>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-header">
            <span class="stat-icon">🧠</span>
            <span class="stat-name">精神值</span>
            <span class="stat-num">{{ store.data.主角.精神值 }}</span>
            <span class="stat-tag" :class="mentalStatus.color">{{ mentalStatus.label }}</span>
          </div>
          <div class="stat-bar">
            <div class="stat-bar-inner" :class="mentalStatus.color" :style="{ width: store.data.主角.精神值 + '%' }"></div>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-header">
            <span class="stat-icon">💕</span>
            <span class="stat-name">心情值</span>
            <span class="stat-num">{{ store.data.主角.心情值 }}</span>
            <span class="stat-tag" :class="moodStatus.color">{{ moodStatus.label }}</span>
          </div>
          <div class="stat-bar">
            <div class="stat-bar-inner" :class="moodStatus.color" :style="{ width: store.data.主角.心情值 + '%' }"></div>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-header">
            <span class="stat-icon">💋</span>
            <span class="stat-name">性欲值</span>
            <span class="stat-num">{{ store.data.主角.性欲值 }}</span>
            <span class="stat-tag" :class="libidoStatus.color">{{ libidoStatus.label }}</span>
          </div>
          <div class="stat-bar">
            <div class="stat-bar-inner" :class="libidoStatus.color" :style="{ width: store.data.主角.性欲值 + '%' }"></div>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-header">
            <span class="stat-icon">⚡</span>
            <span class="stat-name">快感值</span>
            <span class="stat-num">{{ store.data.主角.快感值 }}</span>
          </div>
          <div class="stat-bar">
            <div class="stat-bar-inner pleasure" :style="{ width: store.data.主角.快感值 + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';

const store = useDataStore();

type StatusInfo = { label: string; color: string };

function foodStatus(val: number): StatusInfo {
  if (val <= 10) return { label: '空腹', color: 'low' };
  if (val <= 30) return { label: '饥饿', color: 'low' };
  if (val <= 60) return { label: '微饿', color: 'mid' };
  if (val <= 85) return { label: '正常', color: 'high' };
  return { label: '饱腹', color: 'high' };
}

function spiritStatus(val: number): StatusInfo {
  if (val <= 10) return { label: '崩溃', color: 'low' };
  if (val <= 30) return { label: '低迷', color: 'low' };
  if (val <= 60) return { label: '疲惫', color: 'mid' };
  if (val <= 85) return { label: '正常', color: 'high' };
  return { label: '充沛', color: 'high' };
}

function moodStatusFn(val: number): StatusInfo {
  if (val <= 10) return { label: '崩溃', color: 'low' };
  if (val <= 40) return { label: '烦躁', color: 'mid' };
  return { label: '健康', color: 'high' };
}

function libidoStatusFn(val: number): StatusInfo {
  if (val <= 49) return { label: '餍足', color: 'high' };
  if (val <= 79) return { label: '唤醒', color: 'mid' };
  if (val <= 99) return { label: '发情', color: 'low' };
  return { label: '失控', color: 'low' };
}

const satietyStatus = computed(() => foodStatus(store.data.主角.饱食度));
const mentalStatus = computed(() => spiritStatus(store.data.主角.精神值));
const moodStatus = computed(() => moodStatusFn(store.data.主角.心情值));
const libidoStatus = computed(() => libidoStatusFn(store.data.主角.性欲值));
const eroticaColor = computed(() => {
  const v = store.data.主角.整体色情值;
  if (v <= 20) return 'low';
  if (v <= 50) return 'mid';
  if (v <= 70) return 'mid';
  return 'low';
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

.time-section {
  padding: 12px 16px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.time-value {
  font-weight: bold;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.compact-row {
  display: flex;
  gap: 10px;
}

.compact-item {
  font-size: 0.7rem;
  font-weight: bold;
  color: var(--c-text-dim);

  &.low  { color: var(--c-food-low); }
  &.mid  { color: var(--c-food-mid); }
  &.high { color: var(--c-food-high); }
}

.stats-section {
  padding: 4px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-icon  { font-size: 0.8rem; width: 16px; text-align: center; }
.stat-name  { font-weight: bold; font-size: 0.7rem; min-width: 36px; color: var(--c-text-dim); }
.stat-num   { font-weight: bold; font-size: 0.7rem; min-width: 24px; text-align: right; }

.stat-tag {
  font-size: 0.6rem;
  font-weight: bold;
  padding: 1px 5px;
  border-radius: 3px;
  border: 1px solid;
  letter-spacing: 0.5px;

  &.high { color: var(--c-food-high); border-color: var(--c-food-high); background: rgba(78, 203, 113, 0.08); }
  &.mid  { color: var(--c-food-mid); border-color: var(--c-food-mid); background: rgba(212, 168, 67, 0.08); }
  &.low  { color: var(--c-food-low); border-color: var(--c-food-low); background: rgba(224, 85, 69, 0.08); }
}

.stat-bar {
  height: 3px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.stat-bar-inner {
  height: 100%;
  border-radius: 2px;
  transition: width 0.35s ease;

  &.high { background: var(--c-food-high); }
  &.mid  { background: var(--c-food-mid); }
  &.low  { background: var(--c-food-low); }
}

.stat-bar-inner.pleasure {
  background: linear-gradient(90deg, #d47a7a, #e05545);
}

@media (max-width: 400px) {
  .status-card { max-width: 100%; }
  .stat-header { flex-wrap: wrap; }
}
</style>
