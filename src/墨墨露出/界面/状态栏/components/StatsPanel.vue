<template>
  <div class="section">
    <div class="section-title">📊 状态面板</div>
    <div class="stat-grid">
      <div class="stat-item">
        <span class="stat-label">日期</span>
        <span class="stat-value">{{ data?.日程?.日期 || '—' }} {{ data?.日程?.星期 || '' }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">时间</span>
        <span class="stat-value">{{ time }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">地点</span>
        <span class="stat-value">{{ data?.世界?.当前地点 || '—' }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">金钱</span>
        <span class="stat-value money">{{ data?.主角?.金钱 || 0 }}元</span>
      </div>
    </div>
    <div class="bar-grid">
      <div v-for="bar in bars" :key="bar.key" class="bar-row">
        <span class="bar-label">{{ bar.label }}</span>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: bar.pct + '%', background: bar.color }"></div>
        </div>
        <span class="bar-pct">{{ bar.val }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ data: any }>();

const time = computed(() => {
  const t = props.data?.世界?.当前时间 || '';
  return t ? t.split(' ')[1]?.substring(0, 5) || t : '—';
});

const num = (v: any) => Number(v) || 0;

const bars = computed(() => [
  { key: 'sat', label: '饱食度', val: num(props.data?.数值?.饱食度), color: '#a2e3c4' },
  { key: 'spi', label: '精神值', val: num(props.data?.数值?.精神值), color: '#8ac4ff' },
  { key: 'hap', label: '心情值', val: num(props.data?.数值?.心情值), color: '#ffd54f' },
  { key: 'ero', label: '色情值', val: num(props.data?.数值?.整体色情值), color: '#ff6b9d' },
  { key: 'lust', label: '性欲值', val: num(props.data?.数值?.性欲值), color: '#ff8a80' },
  { key: 'plea', label: '快感值', val: num(props.data?.数值?.快感值), color: '#e8a0bf' },
]);
</script>

<style scoped>
.section-title { font-size: 13px; font-weight: 600; color: #b8b0d0; margin-bottom: 12px; letter-spacing: 0.5px; }
.stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
.stat-item { padding: 6px 10px; background: rgba(255,255,255,0.03); border-radius: 8px; }
.stat-label { display: block; font-size: 10px; color: #787890; margin-bottom: 2px; }
.stat-value { font-size: 13px; color: #e8e6e3; font-weight: 500; }
.stat-value.money { color: #a2e3c4; }
.bar-grid { display: flex; flex-direction: column; gap: 6px; }
.bar-row { display: flex; align-items: center; gap: 8px; }
.bar-label { font-size: 11px; color: #787890; min-width: 42px; }
.bar-track { flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 4px; transition: width 0.5s; }
.bar-pct { font-size: 11px; color: #9a9ab0; min-width: 30px; text-align: right; }
</style>
