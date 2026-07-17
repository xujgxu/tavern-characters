<template>
  <div id="momo-status-bar">
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab.key" :class="['tab-button', { active: activeTab === tab.key }]" @click="activeTab = tab.key">
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>
    <div class="tab-container">
      <div v-if="activeTab === 'stats'" class="tab-content">
        <StatsPanel :data="data" />
      </div>
      <div v-if="activeTab === 'app'" class="tab-content">
        <AppPanel :data="data" />
      </div>
      <div v-if="activeTab === 'schedule'" class="tab-content">
        <SchedulePanel :data="data" />
      </div>
      <div v-if="activeTab === 'contacts'" class="tab-content">
        <ContactsPanel :data="data" />
      </div>
      <div v-if="activeTab === 'closet'" class="tab-content">
        <ClosetPanel :data="data" />
      </div>
      <div v-if="activeTab === 'map'" class="tab-content">
        <MapPanel :data="data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDataStore } from './store';
import StatsPanel from './components/StatsPanel.vue';
import AppPanel from './components/AppPanel.vue';
import SchedulePanel from './components/SchedulePanel.vue';
import ContactsPanel from './components/ContactsPanel.vue';
import ClosetPanel from './components/ClosetPanel.vue';
import MapPanel from './components/MapPanel.vue';

const store = useDataStore();
const data = computed(() => store.data);

const activeTab = ref('stats');

const tabs = [
  { key: 'stats', icon: '📊', label: '状态' },
  { key: 'app', icon: '❤️', label: '牝多多' },
  { key: 'schedule', icon: '📅', label: '日程' },
  { key: 'contacts', icon: '💬', label: '联系人' },
  { key: 'closet', icon: '👗', label: '服装' },
  { key: 'map', icon: '🗺️', label: '地图' },
];
</script>

<style>
#momo-status-bar {
  width: 100%;
  max-width: 680px;
  margin: 12px auto;
  background: linear-gradient(180deg, #1a1a2e, #16213e);
  border-radius: 16px;
  overflow: hidden;
  font-family: 'Noto Sans SC', -apple-system, 'Microsoft YaHei', sans-serif;
  color: #e8e6e3;
  font-size: 14px;
}
.tabs {
  display: flex;
  background: rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(232,160,191,0.15);
  overflow-x: auto;
}
.tab-button {
  flex: 1;
  padding: 10px 6px 8px;
  text-align: center;
  font-size: 12px;
  color: #6a6a80;
  cursor: pointer;
  border: none;
  background: transparent;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
}
.tab-button:hover { color: #9a9ab0; background: rgba(255,255,255,0.03); }
.tab-button.active { color: #ff6b9d; border-bottom-color: #ff6b9d; background: rgba(255,107,157,0.08); }
.tab-icon { display: block; font-size: 16px; margin-bottom: 2px; }
.tab-container { padding: 14px 16px; min-height: 200px; }
.tab-content { animation: fadeIn 0.3s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
