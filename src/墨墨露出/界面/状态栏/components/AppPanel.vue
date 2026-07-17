<template>
  <div class="section">
    <div class="app-header">
      <div class="app-user">
        <span class="app-label">用户名</span>
        <span class="app-value">墨墨</span>
      </div>
      <div class="app-level">
        <span class="app-label">等级</span>
        <span class="app-value">Lv.{{ lv }}</span>
      </div>
      <div class="app-exp">
        <span class="app-label">EXP</span>
        <span class="app-value">{{ exp }}/{{ expMax }}</span>
      </div>
    </div>
    <div v-if="currentTask?.任务名" class="task-card-current">
      <div class="task-card-title">{{ currentTask.任务名 }}</div>
      <div class="task-row"><span class="task-label">类型</span><span>{{ currentTask.类型 }}</span></div>
      <div class="task-row"><span class="task-label">要求</span><span>{{ currentTask.目标 }}</span></div>
      <div class="task-row"><span class="task-label">报酬</span><span class="money">{{ currentTask.报酬 }}元</span></div>
    </div>
    <div v-else-if="availableTasks?.length" class="task-list">
      <div class="section-subtitle">可选任务</div>
      <div v-for="(t, i) in availableTasks" :key="i" class="task-card" :class="{ selected: selectedTask === i }" @click="selectedTask = i">
        <div class="task-card-title">{{ t.任务名 }}</div>
        <div class="task-row"><span class="task-label">类型</span><span>{{ t.类型 }}</span></div>
        <div class="task-row"><span class="task-label">报酬</span><span class="money">{{ t.报酬 }}元</span></div>
      </div>
    </div>
    <div v-else class="empty">暂无可用任务</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps<{ data: any }>();
const num = (v: any) => Number(v) || 0;
const lv = computed(() => num(props.data?.日程?.牝多多等级));
const exp = computed(() => num(props.data?.日程?.牝多多经验));
const expMax = computed(() => [0, 150, 500, 1500, 5000][lv.value] || 150);
const currentTask = computed(() => props.data?.日程?.当前任务);
const availableTasks = computed(() => props.data?.日程?.可用任务);
const selectedTask = ref(-1);
</script>

<style scoped>
.app-header { display: flex; gap: 12px; margin-bottom: 12px; padding: 10px; background: rgba(255,107,157,0.06); border-radius: 10px; }
.app-user, .app-level, .app-exp { flex: 1; }
.app-label { display: block; font-size: 10px; color: #787890; }
.app-value { font-size: 13px; font-weight: 600; color: #ff6b9d; }
.section-subtitle { font-size: 12px; font-weight: 600; color: #ffb3c6; margin: 10px 0 6px; }
.task-card, .task-card-current { padding: 10px 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(232,160,191,0.12); border-radius: 10px; margin-bottom: 8px; cursor: pointer; transition: all 0.2s; }
.task-card:hover, .task-card.selected { border-color: rgba(255,107,157,0.3); background: rgba(255,107,157,0.06); }
.task-card-title { font-size: 13px; font-weight: 600; color: #e8e6e3; margin-bottom: 6px; }
.task-row { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #9a9ab0; margin-bottom: 3px; }
.task-label { min-width: 36px; color: #787890; }
.money { color: #a2e3c4; font-weight: 600; }
.empty { text-align: center; padding: 20px; color: #787890; font-size: 12px; }
</style>
