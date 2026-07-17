<template>
  <div class="status-card">
    <div class="time-section">
      <span class="time-label">现在时间</span>
      <span class="time-value">{{ store.data.世界.时间 }}</span>
    </div>

    <div class="divider"></div>

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
        <div class="stat-hint">{{ satietyStatus.hint }}</div>
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
        <div class="stat-hint">{{ mentalStatus.hint }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';

const store = useDataStore();

type StatusInfo = { label: string; color: string; hint: string };

function foodStatus(val: number): StatusInfo {
  if (val <= 10) return { label: '空腹', color: 'low', hint: '再不吃东西就要晕倒了…' };
  if (val <= 30) return { label: '饥饿', color: 'low', hint: '肚子在叫，该吃饭了' };
  if (val <= 60) return { label: '微饿', color: 'mid', hint: '还能撑一阵子' };
  if (val <= 85) return { label: '正常', color: 'high', hint: '刚刚好，不饿也不撑' };
  return { label: '饱腹', color: 'high', hint: '吃得很满足～' };
}

function spiritStatus(val: number): StatusInfo {
  if (val <= 10) return { label: '崩溃', color: 'low', hint: '什么都不想做了…' };
  if (val <= 30) return { label: '低迷', color: 'low', hint: '提不起劲，能翘课就翘了' };
  if (val <= 60) return { label: '疲惫', color: 'mid', hint: '有点累，但还能应付' };
  if (val <= 85) return { label: '正常', color: 'high', hint: '状态不错，可以专注做事' };
  return { label: '充沛', color: 'high', hint: '元气满满，干劲十足！' };
}

const satietyStatus = computed(() => foodStatus(store.data.主角.饱食度));
const mentalStatus = computed(() => spiritStatus(store.data.主角.精神值));
</script>

<style lang="scss" scoped>
.status-card {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  font-family: var(--font-mono);
  color: var(--c-ink);
  font-size: 11px;
  line-height: 1.45;
  border: 2px solid var(--c-border);
  background: linear-gradient(180deg, #fffef9 0%, var(--c-paper) 100%);
}

.time-section {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 10px 14px 8px;
}

.time-label {
  font-weight: bold;
  color: var(--c-border);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.7rem;
}

.time-value {
  font-weight: bold;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.divider {
  height: 1px;
  margin: 0 14px;
  background: repeating-linear-gradient(
    90deg,
    var(--c-border) 0,
    var(--c-border) 4px,
    transparent 4px,
    transparent 8px
  );
}

.stats-section {
  padding: 10px 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-icon {
  font-size: 0.9rem;
  width: 18px;
  text-align: center;
}

.stat-name {
  font-weight: bold;
  font-size: 0.75rem;
  min-width: 36px;
}

.stat-num {
  font-weight: bold;
  font-size: 0.75rem;
  min-width: 24px;
  text-align: right;
}

.stat-tag {
  font-size: 0.65rem;
  font-weight: bold;
  padding: 1px 5px;
  border-radius: 2px;
  border: 1px solid;
  letter-spacing: 0.5px;

  &.high {
    color: var(--c-food-high);
    border-color: var(--c-food-high);
    background: rgba(91, 154, 104, 0.06);
  }

  &.mid {
    color: var(--c-food-mid);
    border-color: var(--c-food-mid);
    background: rgba(212, 168, 67, 0.06);
  }

  &.low {
    color: var(--c-food-low);
    border-color: var(--c-food-low);
    background: rgba(196, 92, 74, 0.06);
  }
}

.stat-bar {
  height: 6px;
  border: 1px solid var(--c-border);
  background: rgba(200, 192, 176, 0.15);
  overflow: hidden;
}

.stat-bar-inner {
  height: 100%;
  transition: width 0.35s ease;

  &.high { background: var(--c-food-high); }
  &.mid  { background: var(--c-food-mid); }
  &.low  { background: var(--c-food-low); }
}

.stat-hint {
  font-size: 0.65rem;
  color: #a09888;
  font-style: italic;
  padding-left: 24px;
}

@media (max-width: 400px) {
  .status-card {
    max-width: 100%;
  }

  .stat-header {
    flex-wrap: wrap;
  }
}
</style>
