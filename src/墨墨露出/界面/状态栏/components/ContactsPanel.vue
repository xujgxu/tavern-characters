<template>
  <div class="section">
    <div v-if="contacts.length === 0" class="empty">暂无联系人</div>
    <div v-for="(c, name) in contacts" :key="name" class="contact-item">
      <span class="contact-name">{{ name }}</span>
      <span class="contact-role">{{ c.身份 || '' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ data: any }>();
const contacts = computed(() => props.data?.社交?.联系人 || {});
</script>

<style scoped>
.contact-item { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 4px; }
.contact-name { font-size: 13px; color: #e8e6e3; font-weight: 500; }
.contact-role { font-size: 11px; color: #787890; }
.empty { text-align: center; padding: 20px; color: #787890; font-size: 12px; }
</style>
