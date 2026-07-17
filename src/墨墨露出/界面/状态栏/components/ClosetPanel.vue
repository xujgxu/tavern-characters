<template>
  <div class="section">
    <div class="section-title">👗 穿着中</div>
    <div v-if="wearing.length === 0" class="empty">未穿着任何服装</div>
    <div v-for="name in wearing" :key="name" class="closet-card">
      <span class="closet-name">{{ name }}</span>
    </div>
    <div class="section-title" style="margin-top: 12px">🧺 衣柜</div>
    <div v-if="available.length === 0" class="empty">衣柜为空</div>
    <div v-for="name in pagedItems" :key="name" class="closet-card" @click="wear(name)">
      <span class="closet-name">{{ name }}</span>
    </div>
    <div v-if="totalPages > 1" class="pages">
      <button class="page-btn" @click="page = Math.max(0, page - 1)">◀</button>
      <span class="page-info">{{ page + 1 }}/{{ totalPages }}</span>
      <button class="page-btn" @click="page = Math.min(totalPages - 1, page + 1)">▶</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps<{ data: any }>();
const PER_PAGE = 6;
const page = ref(0);

const allClothing = computed(() => props.data?.衣柜?.可选服装 || {});
const currentWear = computed(() => props.data?.衣柜?.当前穿着 || []);
const sorted = computed(() => Object.keys(allClothing.value).sort());
const wearing = computed(() => sorted.value.filter(n => currentWear.value.includes(n)));
const available = computed(() => sorted.value.filter(n => !currentWear.value.includes(n)));
const totalPages = computed(() => Math.max(1, Math.ceil(available.value.length / PER_PAGE)));
const pagedItems = computed(() => available.value.slice(page.value * PER_PAGE, (page.value + 1) * PER_PAGE));

function wear(name: string) {
  const ta = (window.parent as any).TavernHelper;
  if (ta) {
    ta.insertVariables?.({ type: 'message' }, { '衣柜/当前穿着': [...currentWear.value, name] });
  }
}
</script>

<style scoped>
.section-title { font-size: 12px; font-weight: 600; color: #b8b0d0; margin-bottom: 8px; }
.closet-card { padding: 8px 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(232,160,191,0.10); border-radius: 10px; margin-bottom: 6px; cursor: pointer; transition: all 0.15s; }
.closet-card:hover { border-color: rgba(255,107,157,0.3); background: rgba(255,107,157,0.05); }
.closet-name { font-size: 13px; color: #e8e6e3; }
.pages { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 8px 0; }
.page-btn { background: rgba(255,255,255,0.06); border: 1px solid rgba(232,160,191,0.12); border-radius: 8px; color: #b0b0c8; font-size: 13px; padding: 4px 14px; cursor: pointer; }
.page-btn:hover { background: rgba(255,107,157,0.12); border-color: rgba(255,107,157,0.3); color: #ff6b9d; }
.page-info { font-size: 11px; color: #787890; }
.empty { text-align: center; padding: 12px; color: #787890; font-size: 12px; }
</style>
