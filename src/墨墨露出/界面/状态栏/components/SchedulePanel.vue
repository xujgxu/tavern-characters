<template>
  <div class="section">
    <div v-if="items.length === 0" class="empty">暂无日程安排</div>
    <template v-for="(group, gkey) in grouped" :key="gkey">
      <div class="date-head">{{ group.date }}</div>
      <div class="divider"></div>
      <div v-for="(item, idx) in group.items" :key="idx" class="sched-row" :class="{ done: item.done }">
        <span class="cell-time">{{ item.time || '' }}</span>
        <span class="cell-title">{{ item.title }}</span>
        <span class="cell-loc">{{ item.location || '' }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ data: any }>();

function parseDate(str: string) {
  if (!str) return 0;
  const m = str.match(/(\d+)年(\d+)月(\d+)日/);
  if (m) return Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3]);
  const m2 = str.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m2) return Number(m2[1]) * 10000 + Number(m2[2]) * 100 + Number(m2[3]);
  return 0;
}

const items = computed(() => {
  const user = props.data?.日程?.用户日程 || [];
  return user.filter((i: any) => !i.完成).sort((a: any, b: any) => {
    const da = parseDate(a.日期 || '');
    const db = parseDate(b.日期 || '');
    return da - db || (a.时间 || '').localeCompare(b.时间 || '');
  });
});

const grouped = computed(() => {
  const groups: Record<string, { date: string; items: any[] }> = {};
  items.value.forEach((item: any) => {
    const key = item.日期 || 'default';
    if (!groups[key]) groups[key] = { date: key, items: [] };
    groups[key].items.push(item);
  });
  return Object.entries(groups)
    .sort(([a], [b]) => parseDate(a) - parseDate(b))
    .map(([_, g]) => g);
});
</script>

<style scoped>
.date-head { padding: 10px 0 4px; font-size: 12px; font-weight: 600; color: #b8b0d0; }
.divider { height: 1px; background: rgba(232,160,191,0.08); margin: 0 0 4px; }
.sched-row { display: grid; grid-template-columns: 70px 1fr 1fr; gap: 8px; padding: 4px 0; font-size: 13px; align-items: baseline; }
.sched-row.done { opacity: 0.35; }
.cell-time { font-size: 12px; color: #787890; }
.cell-title { color: #e8e6e3; }
.cell-loc { font-size: 12px; color: #6a6a80; text-align: right; }
.empty { text-align: center; padding: 20px; color: #787890; font-size: 12px; }
</style>
