<template>
  <div class="stat-bar">
    <span class="stat-label">{{ label }}</span>
    <div class="stat-track">
      <div class="stat-fill" :style="{ width: value + '%', backgroundColor: color }"></div>
    </div>
    <span class="stat-value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: number;
  color?: string;
}>();
</script>

<style lang="scss" scoped>
.stat-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  font-weight: bold;
  min-width: 50px;
  font-size: 0.75rem;
  color: #ff6b9d;
}

.stat-track {
  flex: 1;
  height: 6px;
  border: 1px solid #ff6b9d;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}

.stat-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  transition: width 0.3s ease;
  box-shadow: 0 0 4px rgba(255, 107, 157, 0.5);
}

.stat-value {
  font-size: 0.7rem;
  min-width: 30px;
  color: #e0e0e0;
}
</style>
