import { waitUntil } from 'async-wait-until';
import App from './App.vue';
import './global.css';

function loadMvuBundle() {
  return new Promise<void>((resolve, reject) => {
    if (typeof waitGlobalInitialized !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://testingcf.jsdelivr.net/gh/MagicalAstrogy/MagVarUpdate/artifact/bundle.js';
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

$(async () => {
  const rootEl = document.querySelector('#app');
  if (!rootEl) {
    console.warn('[StatusBar] No #app element found');
    return;
  }

  try {
    await loadMvuBundle();
  } catch (e) {
    console.warn('[StatusBar] MVU load failed, mounting anyway', e);
  }

  try {
    await waitUntil(() => {
      try {
        const vars = getVariables({ type: 'message' });
        return !!(vars && typeof vars === 'object' && ('stat_data' in vars || '数值' in vars || '日程' in vars));
      } catch (e) {
        return false;
      }
    }, { timeout: 5000 });
  } catch (e) {
    console.warn('[StatusBar] Variables not ready, mounting anyway', e);
  }

  try {
    createApp(App).use(createPinia()).mount(rootEl);
  } catch (e) {
    console.error('[StatusBar] mount failed', e);
  }
});