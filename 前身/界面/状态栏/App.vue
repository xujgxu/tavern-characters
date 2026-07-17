<template>
  <div class="app-container">
    <div class="app-header">
      <h1 class="app-title">牝多多</h1>
      <div class="app-subtitle">超级AI"小爱"专属向导</div>
    </div>

    <div class="profile-section">
      <div class="profile-info">
        <span class="level-badge">Lv.{{ store.data.日程.牝多多等级 }} [{{ levelName }}]</span>
        <span class="exp">EXP: {{ store.data.日程.牝多多经验 }}/{{ nextLevelExp }}</span>
      </div>
      <div class="status-indicator">{{ store.data.世界.近期事务.牝多多账号 }}</div>
    </div>

    <div class="world-section">
      <span class="time">{{ store.data.世界.当前时间 }}</span>
      <span class="location">{{ store.data.世界.当前地点 }}</span>
    </div>

    <div class="stats-section">
      <div class="stats-grid">
        <StatBar :label="'心情值'" :value="store.data.数值.心情值" :color="'#ff6b9d'" />
        <StatBar :label="'精神值'" :value="store.data.数值.精神值" :color="'#a2d2ff'" />
        <StatBar :label="'性欲值'" :value="store.data.数值.性欲值" :color="'#ffb3c6'" />
        <StatBar :label="'体力'" :value="store.data.数值.体力" :color="'#7e8d85'" />
        <StatBar :label="'饱食度'" :value="store.data.数值.饱食度" :color="'#a2e3c4'" />
        <StatBar :label="'快感值'" :value="store.data.数值.快感值" :color="'#ff6b9d'" />
        <StatBar :label="'色情值'" :value="store.data.数值.整体色情值" :color="'#ff6b9d'" />
        <StatBar :label="'堕落度'" :value="store.data.数值.堕落度" :color="'#8a2be2'" />
      </div>
    </div>

    <div v-if="availableTasks.length > 0" class="task-section">
      <div class="task-title">可选任务（请选择一个）</div>
      <div class="task-option-list">
        <div
          v-for="(t, i) in availableTasks"
          :key="i"
          class="task-option-card"
          :class="{ 'task-option-selected': selectedOption === i }"
          @click="selectTask(i)"
        >
          <div class="task-option-header">
            <span class="task-option-name">{{ t.任务名 }}</span>
            <span class="task-option-grade" :style="{ color: gradeColor(t.阶级) }">{{ t.阶级 }}级</span>
          </div>
          <div class="task-prop">类型: {{ t.类型 }}</div>
          <div class="task-prop">报酬: <span class="money">{{ t.报酬 }}元</span></div>
          <div class="task-target">{{ t.目标 }}</div>
          <div v-if="t.额外要求 && t.额外要求 !== '无'" class="task-prop">额外: {{ t.额外要求 }}</div>
        </div>
      </div>
      <button class="task-confirm-btn" :disabled="selectedOption < 0" @click="confirmTask">确认接取任务</button>
    </div>

    <div v-else-if="store.data.日程.当前任务" class="task-section">
      <div class="task-title">今日任务</div>
      <div class="task-info">
        <span>{{ store.data.日程.当前任务.任务名 }}</span>
        <span class="task-status">{{ store.data.日程.当前任务.完成 ? '已完成' : '进行中' }}</span>
      </div>
      <div v-if="expandedSections.task || forceExpand" class="task-details">
        <div class="task-prop">类型: {{ store.data.日程.当前任务.类型 }}</div>
        <div class="task-prop">阶级: {{ store.data.日程.当前任务.阶级 }}</div>
        <div class="task-prop">截止: {{ store.data.日程.当前任务.截止 }}</div>
        <div class="task-target">{{ store.data.日程.当前任务.目标 }}</div>
      </div>
      <div class="expand-toggle" @click="toggleSection('task')">
        <i :class="expandedSections.task ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
      </div>
    </div>

    <div class="inventory-section">
      <div class="section-title" @click="toggleSection('inventory')">
        <span>持有物</span>
        <i :class="expandedSections.inventory ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
      </div>
      <div v-show="expandedSections.inventory || forceExpand" class="inventory-list">
        <div v-for="(item, name) in store.data.主角.持有物" :key="name" class="inventory-item">
          <span class="item-name">{{ name }}</span>
          <span class="item-count">×{{ item.数量 }}</span>
        </div>
      </div>
    </div>

    <div class="contacts-section">
      <div class="section-title" @click="toggleSection('contacts')">
        <span>联系人</span>
        <i :class="expandedSections.contacts ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
      </div>
      <div v-show="expandedSections.contacts || forceExpand" class="contacts-list">
        <div v-for="(contact, name) in store.data.社交.联系人" :key="name" class="contact-item">
          <span class="contact-name">{{ name }}</span>
          <span class="contact-status">{{ contact.状态 }}</span>
          <span class="contact-favor">好感: {{ contact.好感度 }}</span>
        </div>
      </div>
    </div>

    <div class="outfit-section">
      <div class="section-title" @click="toggleSection('outfit')">
        <span>当前服装</span>
        <i :class="expandedSections.outfit ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
      </div>
      <div v-show="expandedSections.outfit || forceExpand" class="outfit-list">
        <div v-for="(wear, part) in store.data.穿着" :key="part" class="outfit-item">
          <span class="wear-part">{{ part }}:</span>
          <span class="wear-name">{{ wear }}</span>
        </div>
      </div>
    </div>

    <div class="scene-section">
      <div class="scene-info">
        <span class="scene-label">区域:</span>
        <span class="scene-value">{{ store.data.场景.当前区域 }}</span>
      </div>
      <div class="scene-info">
        <span class="scene-label">风险:</span>
        <span class="scene-risk" :class="riskClass">{{ store.data.场景.风险等级 }}</span>
      </div>
    </div>

    <div class="footer-section">
      <span class="money">金钱: {{ store.data.主角.金钱 }}元</span>
      <span class="debt">债务: {{ store.data.主角.债务 }}元</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatBar from './components/StatBar.vue';
import { useDataStore } from './store';
import { computed, ref } from 'vue';
import { LEVEL_NAMES, LEVEL_EXP } from '../../shared_constants';

const store = useDataStore();
const forceExpand = ref(false);
const selectedOption = ref(-1);

const expandedSections = ref({
  task: false,
  inventory: false,
  contacts: false,
  outfit: false,
});

const availableTasks = computed(() => {
  const tasks = store.data.日程.可用任务;
  return Array.isArray(tasks) ? tasks : [];
});

const levelName = computed(() => {
  return LEVEL_NAMES[store.data.日程.牝多多等级] || '未知';
});

const nextLevelExp = computed(() => {
  return LEVEL_EXP[store.data.日程.牝多多等级] || 0;
});

const riskClass = computed(() => {
  const risk = store.data.场景.风险等级;
  return {
    'risk-low': risk === '低',
    'risk-medium': risk === '中',
    'risk-high': risk === '高',
  };
});

function gradeColor(grade: string): string {
  const map: Record<string, string> = { 'D': '#a2e3c4', 'C': '#ffb3c6', 'B': '#ff6b9d', 'A': '#ff4444', 'S': '#ff0000' };
  return map[grade] || '#e0e0e0';
}

function selectTask(i: number) {
  selectedOption.value = i;
}

function confirmTask() {
  if (selectedOption.value < 0 || selectedOption.value >= availableTasks.value.length) return;
  const chosen = availableTasks.value[selectedOption.value];
  const pDoc = window.parent.document;
  const mainInput = pDoc.querySelector('textarea#send_textarea') as HTMLTextAreaElement | null;
  if (mainInput) {
    const existing = mainInput.value.trim();
    mainInput.value = existing ? existing + '\n我选择接取牝多多任务：' + chosen.任务名 : '我选择接取牝多多任务：' + chosen.任务名;
  }
  const sb = pDoc.querySelector('#send_but') as HTMLElement | null;
  if (sb) setTimeout(() => sb.click(), 50);
  selectedOption.value = -1;
}

function toggleSection(section: keyof typeof expandedSections.value) {
  expandedSections.value[section] = !expandedSections.value[section];
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  max-width: 360px;
  background: linear-gradient(135deg, #1a001a 0%, #2d0033 50%, #000000 100%);
  border: 2px solid #ff6b9d;
  border-radius: 12px;
  font-family: 'Courier New', 'Microsoft YaHei', monospace;
  color: #e0e0e0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 107, 157, 0.3);
}

.app-header {
  background: rgba(255, 107, 157, 0.2);
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ff6b9d;
}

.app-title {
  font-size: 1.4rem;
  color: #ff6b9d;
  margin: 0;
  font-weight: bold;
  letter-spacing: 2px;
}

.app-subtitle {
  font-size: 0.7rem;
  color: #a2d2ff;
  margin-top: 4px;
}

.profile-section {
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255, 107, 157, 0.3);
}

.profile-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.level-badge {
  background: #ff6b9d;
  color: #fff;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
}

.exp {
  font-size: 0.75rem;
  color: #a2d2ff;
}

.status-indicator {
  font-size: 0.7rem;
  color: #7e8d85;
  text-align: center;
}

.world-section {
  padding: 8px 12px;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 107, 157, 0.2);
}

.time {
  font-weight: bold;
  color: #a2d2ff;
}

.location {
  color: #7e8d85;
}

.stats-section {
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.3);
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-section,
.inventory-section,
.contacts-section,
.outfit-section {
  padding: 10px 12px;
  border-top: 1px solid rgba(255, 107, 157, 0.3);
  border-bottom: 1px solid rgba(255, 107, 157, 0.3);
}

.section-title {
  font-size: 0.8rem;
  color: #ff6b9d;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 4px 0;
}

.section-title i {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.task-option-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 6px;
}

.task-option-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 107, 157, 0.12);
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.task-option-card:hover {
  border-color: rgba(255, 107, 157, 0.3);
  background: rgba(255, 107, 157, 0.06);
}

.task-option-card.task-option-selected {
  border-color: #ff6b9d;
  background: rgba(255, 107, 157, 0.1);
  box-shadow: 0 0 8px rgba(255, 107, 157, 0.2);
}

.task-option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.task-option-name {
  font-size: 0.8rem;
  font-weight: bold;
  color: #e0e0e0;
}

.task-option-grade {
  font-size: 0.75rem;
  font-weight: bold;
  padding: 1px 6px;
  border-radius: 8px;
  background: rgba(255, 107, 157, 0.1);
}

.task-confirm-btn {
  display: block;
  width: 100%;
  margin-top: 8px;
  padding: 8px 0;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #ff6b9d, #e05580);
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.2s;
}

.task-confirm-btn:hover {
  opacity: 0.85;
}

.task-confirm-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.task-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #e0e0e0;
  margin-top: 6px;
}

.task-status {
  color: #a2e3c4;
}

.task-details {
  margin-top: 6px;
  font-size: 0.7rem;
}

.task-prop {
  color: #7e8d85;
  margin: 2px 0;
}

.task-target {
  color: #ffb3c6;
  margin-top: 4px;
}

.expand-toggle {
  text-align: center;
  padding: 4px 0;
  cursor: pointer;
}

.expand-toggle i {
  font-size: 0.8rem;
  color: #7e8d85;
}

.inventory-list,
.contacts-list,
.outfit-list {
  margin-top: 6px;
  font-size: 0.75rem;
}

.inventory-item,
.contact-item,
.outfit-item {
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
}

.item-name,
.contact-name,
.wear-part {
  color: #e0e0e0;
}

.item-count,
.contact-status,
.wear-name {
  color: #a2d2ff;
}

.contact-favor {
  color: #7e8d85;
  margin-left: 8px;
}

.scene-section {
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.scene-label {
  color: #7e8d85;
}

.scene-value {
  color: #a2d2ff;
}

.scene-risk {
  font-weight: bold;
}

.risk-low {
  color: #a2e3c4;
}

.risk-medium {
  color: #ffb3c6;
}

.risk-high {
  color: #ff6b9d;
}

.footer-section {
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: bold;
}

.money {
  color: #a2e3c4;
}

.debt {
  color: #ff6b9d;
}
</style>
