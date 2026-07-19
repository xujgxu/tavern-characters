import { waitUntil } from 'async-wait-until';
import App from './App.vue';
import './global.css';

function loadPinia(): Promise<void> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://testingcf.jsdelivr.net/npm/pinia@2.3.1/dist/pinia.iife.js';
    script.onload = () => resolve();
    script.onerror = () => { console.warn('pinia IIFE load failed'); resolve(); };
    document.head.appendChild(script);
  });
}

$(async () => {
  await waitGlobalInitialized('Mvu');
  await loadPinia();
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
  createApp(App).use(createPinia()).mount('#app');
});
