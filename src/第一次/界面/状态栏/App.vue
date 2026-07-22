<template>
  <div class="status-card">
    <div class="wave-bg"></div>
    <div class="card-content">
      <div class="tab-nav">
        <button v-for="t in tabs" :key="t.id" class="tab-btn" :class="{ active: activeTab === t.id }" @click="activeTab = t.id">{{ t.label }}</button>
      </div>

      <div class="tab-content" v-if="activeTab === 'basic'">
        <div class="stats-section">
          <div class="stat-row">
            <span class="stat-icon">📅</span>
            <span class="stat-name">日　期</span>
            <span class="stat-val">{{ datePart }}</span>
          </div>

          <div class="stat-row">
            <span class="stat-icon">🕐</span>
            <span class="stat-name">时　间</span>
            <span class="stat-val">{{ timePart }}</span>
          </div>

          <div class="stat-row">
            <span class="stat-icon">📍</span>
            <span class="stat-name">地　点</span>
            <span class="stat-val">{{ locationLabel }}</span>
          </div>

          <div class="stat-row">
            <span class="stat-icon">💰</span>
            <span class="stat-name">金　钱</span>
            <span class="stat-val">{{ store.data.主角.金钱 }}</span>
          </div>

          <div class="stat-row">
            <span class="stat-icon">🍞</span>
            <span class="stat-name">饱食度</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill food" :style="{ width: store.data.主角.饱食度 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.饱食度 }}</span>
            </div>
          </div>

          <div class="stat-row">
            <span class="stat-icon">🧠</span>
            <span class="stat-name">精神值</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill spirit" :style="{ width: store.data.主角.精神值 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.精神值 }}</span>
            </div>
          </div>

          <div class="stat-row">
            <span class="stat-icon">💕</span>
            <span class="stat-name">心情值</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill mood" :style="{ width: store.data.主角.心情值 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.心情值 }}</span>
            </div>
          </div>

          <div class="stat-row">
            <span class="stat-icon">🔞</span>
            <span class="stat-name">色情值</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill erotica" :style="{ width: store.data.主角.整体色情值 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.整体色情值 }}</span>
            </div>
          </div>

          <div class="stat-row">
            <span class="stat-icon">💋</span>
            <span class="stat-name">性欲值</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill libido" :style="{ width: store.data.主角.性欲值 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.性欲值 }}</span>
            </div>
          </div>

          <div class="stat-row">
            <span class="stat-icon">⚡</span>
            <span class="stat-name">快感值</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill pleasure" :style="{ width: store.data.主角.快感值 + '%' }"></div></div>
              <span class="bar-val">{{ store.data.主角.快感值 }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content" v-if="activeTab === 'app'">
        <div class="stats-section">
          <div class="stat-row">
            <span class="stat-icon">📱</span>
            <span class="stat-name">等　级</span>
            <span class="stat-val">{{ levelLabel }}</span>
          </div>

          <div class="stat-row">
            <span class="stat-icon">⭐</span>
            <span class="stat-name">经　验</span>
            <div class="stat-bar-wrap">
              <div class="stat-bar"><div class="fill exp" :style="{ width: expPercent + '%' }"></div></div>
            </div>
            <span class="stat-val exp-val">{{ expDisplay }}</span>
          </div>

          <div v-if="store.data.APP.待选任务 && store.data.APP.待选任务.length === 3 && !store.data.APP.当前任务">
            <div class="task-header">📋 可选任务（点击选择）</div>
            <div class="task-card" v-for="(t, i) in store.data.APP.待选任务" :key="i"
                 :class="{ selected: selectedTask === i }" @click="selectedTask = selectedTask === i ? -1 : i">
              <div class="task-title">{{ t.名称 || '任务' + (i + 1) }}</div>
              <div class="task-info">
                <div class="task-row"><span class="task-label">类型</span><span class="task-val">[{{ t.类型 }}] Lv.{{ t.等级 }}</span></div>
                <div class="task-row"><span class="task-label">色情</span><span class="task-val">{{ t.色情维度 }} 级</span></div>
                <div class="task-row"><span class="task-label">社会</span><span class="task-val">{{ t.社会维度 }} 级</span></div>
                <div class="task-row"><span class="task-label">内容</span><span class="task-val task-desc">{{ t.内容 }}</span></div>
                <div class="task-row"><span class="task-label">报酬</span><span class="task-val">{{ t.报酬 }} 元</span></div>
                <div class="task-row" v-if="t.可选挑战"><span class="task-label">挑战</span><span class="task-val task-desc">{{ t.可选挑战 }}</span></div>
              </div>
            </div>
            <button class="confirm-btn" :disabled="selectedTask === -1" @click="clickParentSend">确认接取</button>
          </div>

          <div class="task-card" v-else-if="store.data.APP.当前任务">
            <div class="task-header">📋 当前任务 · {{ store.data.APP.当前任务.名称 || '未命名' }}</div>
            <div class="task-info">
              <div class="task-row"><span class="task-label">类型</span><span class="task-val">{{ store.data.APP.当前任务.类型 }}</span></div>
              <div class="task-row"><span class="task-label">色情</span><span class="task-val">{{ store.data.APP.当前任务.色情维度 }} 级</span></div>
              <div class="task-row"><span class="task-label">社会</span><span class="task-val">{{ store.data.APP.当前任务.社会维度 }} 级</span></div>
              <div class="task-row"><span class="task-label">内容</span><span class="task-val task-desc">{{ store.data.APP.当前任务.内容 }}</span></div>
              <div class="task-row"><span class="task-label">报酬</span><span class="task-val">{{ store.data.APP.当前任务.报酬 }} 元</span></div>
              <div class="task-row" v-if="store.data.APP.当前任务.可选挑战">
                <span class="task-label">挑战</span><span class="task-val task-desc">{{ store.data.APP.当前任务.可选挑战 }}</span>
              </div>
            </div>
          </div>

          <div class="empty-state" v-else-if="!store.data.APP.当前任务">
            <span>{{ taskDayCountdown }}</span>
          </div>
        </div>
      </div>

      <div class="tab-content contacts-layout" v-if="activeTab === 'contacts'">
        <div class="contact-list">
          <div class="contact-item" v-for="(info, name) in store.data.联系人" :key="name" :class="{ active: selectedContact === name }" @click="selectedContact = name">
            <div class="contact-name">{{ name }}</div>
            <div class="contact-affection">❤️{{ info.好感度 }}</div>
          </div>
          <div class="empty-state" v-if="!store.data.联系人 || Object.keys(store.data.联系人).length === 0"><span>暂无联系人</span></div>
        </div>
        <div class="chat-window">
          <div class="chat-header" v-if="selectedContact">{{ selectedContact }}</div>
          <div class="chat-messages">
            <div class="chat-placeholder" v-if="!selectedContact">选择一个联系人以查看消息</div>
            <template v-else>
              <div class="msg-bubble" v-for="(m, i) in (store.data.联系人[selectedContact]?.消息 || [])" :key="i" :class="{ mine: m.发送方 === '主角' }"><div class="msg-text">{{ m.内容 }}</div></div>
              <div class="chat-placeholder" v-if="!(store.data.联系人[selectedContact]?.消息 || []).length">暂无消息记录</div>
            </template>
          </div>
          <div class="chat-input-bar">
            <textarea class="chat-textarea" v-model="contactMsg" placeholder="输入消息…" rows="1" :disabled="!selectedContact"></textarea>
            <button class="chat-send-btn" :disabled="!selectedContact" @click="clickParentSend">发送</button>
          </div>
        </div>
      </div>

      <div class="tab-content cloth-layout" v-if="activeTab === 'clothes'">
        <div class="cloth-filter-bar" v-if="allPosTags.length || allStyleTags.length">
          <div class="filter-group" v-if="allPosTags.length">
            <span class="filter-label">部位：</span>
            <span class="filter-tag tag-pos" :class="{ active: posFilters.has(t) }" v-for="t in allPosTags" :key="t" @click="togglePosFilter(t)">{{ t }}</span>
            <span class="filter-tag filter-all" v-if="posFilters.size || styleFilters.size" @click="clearAllFilters">✕ 清除筛选</span>
          </div>
          <div class="filter-group" v-if="allStyleTags.length">
            <span class="filter-label">风格：</span>
            <span class="filter-tag tag-style" :class="{ active: styleFilters.has(t) }" v-for="t in allStyleTags" :key="t" @click="toggleStyleFilter(t)">{{ t }}</span>
          </div>
        </div>
        <div class="cloth-panels">
          <div class="cloth-panel">
            <div class="cloth-panel-title">当前穿着</div>
            <div class="page-nav">
              <button class="page-btn" :disabled="wornPage === 0" @click="wornPage = Math.max(0, wornPage - 1)">◀ 上一页</button>
              <span class="page-info">{{ wornPage + 1 }} / {{ totalWornPages }}</span>
              <button class="page-btn" :disabled="wornPage >= totalWornPages - 1" @click="wornPage = Math.min(totalWornPages - 1, wornPage + 1)">下一页 ▶</button>
            </div>
            <div class="cloth-list">
            <div class="cloth-card" v-for="entry in paginatedWorn" :key="'w'+entry.origIdx" :class="{ 'pending-wear': pendingMap.get(entry.item.名称) === 'wear', 'pending-remove': pendingMap.get(entry.item.名称) === 'remove' }">
            <div class="cloth-name">{{ entry.item.名称 }}</div>
            <div class="cloth-tags">
              <span class="cloth-tag tag-pos" v-for="t in entry.item.部位标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-style" v-for="t in entry.item.风格标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-color" v-for="t in entry.item.颜色图案标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-erotica">色情值 {{ entry.item.色情值 || 0 }}</span>
            </div>
            <div class="cloth-desc" v-if="showDetail.has('w'+entry.origIdx)">{{ entry.item.描述 }}</div>
            <div class="cloth-actions">
              <button class="cloth-btn" @click="toggleDetail('w'+entry.origIdx)">详细</button>
              <button class="cloth-btn cloth-btn-remove" @click="removeCloth(entry.origIdx)">脱下</button>
            </div>
          </div>
          <div class="empty-state" v-if="!(store.data.服装?.穿着 || []).length">暂未穿着任何衣物</div>
          <div class="empty-state" v-else-if="filteredWorn.length === 0">没有符合筛选的服装</div>
          </div>
        </div>
        <div class="cloth-panel">
          <div class="cloth-panel-title">可更换</div>
            <div class="page-nav">
              <button class="page-btn" :disabled="wardrobePage === 0" @click="wardrobePage = Math.max(0, wardrobePage - 1)">◀ 上一页</button>
              <span class="page-info">{{ wardrobePage + 1 }} / {{ totalWardrobePages }}</span>
              <button class="page-btn" :disabled="wardrobePage >= totalWardrobePages - 1" @click="wardrobePage = Math.min(totalWardrobePages - 1, wardrobePage + 1)">下一页 ▶</button>
            </div>
            <div class="cloth-list">
          <div class="cloth-card" v-for="entry in paginatedWardrobe" :key="'c'+entry.origIdx" :class="{ 'pending-wear': pendingMap.get(entry.item.名称) === 'wear', 'pending-remove': pendingMap.get(entry.item.名称) === 'remove' }">
            <div class="cloth-name">{{ entry.item.名称 }}</div>
            <div class="cloth-tags">
              <span class="cloth-tag tag-pos" v-for="t in entry.item.部位标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-style" v-for="t in entry.item.风格标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-color" v-for="t in entry.item.颜色图案标签" :key="t">{{ t }}</span>
              <span class="cloth-tag tag-erotica">色情值 {{ entry.item.色情值 || 0 }}</span>
            </div>
            <div class="cloth-desc" v-if="showDetail.has('c'+entry.origIdx)">{{ entry.item.描述 }}</div>
            <div class="cloth-actions">
              <button class="cloth-btn" @click="toggleDetail('c'+entry.origIdx)">详细</button>
              <button class="cloth-btn cloth-btn-wear" @click="wearCloth(entry.origIdx)">穿上</button>
            </div>
          </div>
          <div class="empty-state" v-if="!(store.data.服装?.可更换 || []).length">衣柜为空</div>
          <div class="empty-state" v-else-if="filteredWardrobe.length === 0">没有符合筛选的服装</div>
          </div>
        </div>
        </div>
        <div class="nudity-warn" v-if="nudityWarnings.length">
          ⚠️ {{ nudityWarnings.join(' / ') }}
        </div>
        <div class="cloth-stats-row">
          <div class="cloth-erotica-display">
            当前色情值：{{ store.data.服装?.整体色情值 || 0 }}
          </div>
          <div class="style-tag-counts" v-if="styleTagEntries.length">
            <span class="cloth-tag tag-style" v-for="([k, v]) in styleTagEntries" :key="k">{{ k }}*{{ v }}</span>
          </div>
        </div>
        <div class="cloth-confirm">
          <button class="confirm-btn" :disabled="pendingMap.size === 0" @click="confirmOutfit">确认换装（{{ pendingMap.size }}件）</button>
        </div>
      </div>

      <div class="tab-content map-layout" v-else-if="activeTab === 'map'">
        <div class="map-viewport"
          @mousedown="onMapDragStart"
          @mousemove="onMapDragMove"
          @mouseup="onMapDragEnd"
          @mouseleave="onMapDragEnd">
          <div class="map-canvas" :style="{ left: mapPos.x + 'px', top: mapPos.y + 'px' }">
            <div class="map-circle-outer">
              <div class="map-diag map-diag-1"></div>
              <div class="map-diag map-diag-2"></div>
            </div>
            <div class="map-circle-inner"></div>
            <svg class="map-road-lines">
              <line v-for="(e, i) in mapEdges" :key="'r'+i"
                :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" />
            </svg>
            <svg class="map-bus-lines">
              <line v-for="(s, i) in busSegments" :key="'b'+i"
                :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2"
                :stroke="s.color" />
            </svg>
            <div class="map-dot" v-for="l in locations" :key="l.name"
              :style="{ left: l.x + 'px', top: l.y + 'px' }"
              :title="l.name">
              <span class="map-dot-label">{{ l.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content placeholder" v-else-if="activeTab !== 'basic' && activeTab !== 'app' && activeTab !== 'contacts' && activeTab !== 'clothes' && activeTab !== 'map'">
        <div class="placeholder-text">{{ activeTabName }} — 待开发</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';

const store = useDataStore();

const tabs = [
  { id: 'basic',   label: '基础' },
  { id: 'app',     label: '牝多多' },
  { id: 'contacts',label: '联系人' },
  { id: 'clothes', label: '衣柜' },
  { id: 'schedule',label: '日程' },
  { id: 'map',     label: '地图' },
];

const activeTab = ref('basic');
const selectedTask = ref(-1);
const selectedContact = ref('');
const contactMsg = ref('');

const mapPos = ref({ x: 0, y: 0 });
const mapDragging = ref(false);
const mapDragStart = ref({ x: 0, y: 0 });

const locations = [
  { name: '海平大学', x: 474, y: 101 },
  { name: '海平中学', x: 365, y: 165 },
  { name: '海平职业技术学院', x: 507, y: 226 },
  { name: '文轩书店', x: 231, y: 92 },
  { name: '夜色成人用品店', x: 580, y: 356 },
  { name: '海滨梦幻游乐园', x: 756, y: 477 },
  { name: '维纳斯情侣酒店', x: 634, y: 263 },
  { name: '星海综合购物中心', x: 673, y: 412 },
  { name: '水云间洗浴中心', x: 638, y: 549 },
  { name: '海平湾公共海滩', x: 760, y: 275 },
  { name: '极乐世界娱乐城', x: 694, y: 174 },
  { name: '工友平价大排档', x: 368, y: 708 },
  { name: '蓝领劳务大市场', x: 307, y: 597 },
  { name: '远洋环球物流仓储中心', x: 497, y: 603 },
  { name: '海平轻纺制造厂', x: 261, y: 685 },
  { name: '远大电子装配厂', x: 541, y: 709 },
  { name: '南区综合枢纽建设工地', x: 466, y: 739 },
  { name: '海平市大型体育中心', x: 88, y: 343 },
  { name: '绿洲景苑小区', x: 239, y: 288 },
  { name: '万家综合超市', x: 167, y: 405 },
  { name: '西山半山别墅区', x: 18, y: 456 },
  { name: '市政府大楼', x: 360, y: 356 },
  { name: '海平中心世纪公园', x: 424, y: 324 },
  { name: 'CBD跨国金融中心', x: 315, y: 414 },
  { name: '海平洲际大酒店', x: 352, y: 494 },
  { name: '海平人民医院', x: 488, y: 427 },
];

const roadAdjacency: Record<string, string[]> = {
  '海平大学': ['海平职业技术学院','海平中学','文轩书店','极乐世界娱乐城'],
  '海平职业技术学院': ['海平大学','海平中学','海平中心世纪公园','维纳斯情侣酒店'],
  '海平中学': ['海平职业技术学院','文轩书店','海平大学','绿洲景苑小区'],
  '文轩书店': ['海平中学','海平大学','绿洲景苑小区'],
  '星海综合购物中心': ['夜色成人用品店','海滨梦幻游乐园','水云间洗浴中心','海平湾公共海滩'],
  '夜色成人用品店': ['星海综合购物中心','维纳斯情侣酒店','海平人民医院'],
  '维纳斯情侣酒店': ['夜色成人用品店','极乐世界娱乐城','海平职业技术学院'],
  '水云间洗浴中心': ['远洋环球物流仓储中心','星海综合购物中心','海平人民医院','海滨梦幻游乐园'],
  '极乐世界娱乐城': ['维纳斯情侣酒店','海平大学','海平湾公共海滩'],
  '海滨梦幻游乐园': ['星海综合购物中心','水云间洗浴中心'],
  '海平湾公共海滩': ['星海综合购物中心','极乐世界娱乐城'],
  '远洋环球物流仓储中心': ['远大电子装配厂','工友平价大排档','水云间洗浴中心','南区综合枢纽建设工地','蓝领劳务大市场'],
  '远大电子装配厂': ['远洋环球物流仓储中心','南区综合枢纽建设工地'],
  '海平轻纺制造厂': ['蓝领劳务大市场','工友平价大排档'],
  '南区综合枢纽建设工地': ['远洋环球物流仓储中心','工友平价大排档','远大电子装配厂'],
  '蓝领劳务大市场': ['工友平价大排档','海平轻纺制造厂','海平洲际大酒店','远洋环球物流仓储中心','万家综合超市'],
  '工友平价大排档': ['蓝领劳务大市场','南区综合枢纽建设工地','海平轻纺制造厂','远洋环球物流仓储中心'],
  '万家综合超市': ['绿洲景苑小区','海平市大型体育中心','CBD跨国金融中心','西山半山别墅区','蓝领劳务大市场'],
  '海平市大型体育中心': ['万家综合超市','绿洲景苑小区','西山半山别墅区'],
  '绿洲景苑小区': ['海平市大型体育中心','万家综合超市','海平中学','文轩书店','市政府大楼'],
  '西山半山别墅区': ['万家综合超市','海平市大型体育中心'],
  '市政府大楼': ['海平中心世纪公园','海平洲际大酒店','海平人民医院','绿洲景苑小区','CBD跨国金融中心'],
  '海平中心世纪公园': ['市政府大楼','海平职业技术学院','海平人民医院'],
  'CBD跨国金融中心': ['市政府大楼','海平洲际大酒店','万家综合超市'],
  '海平洲际大酒店': ['蓝领劳务大市场','市政府大楼','CBD跨国金融中心','海平人民医院'],
  '海平人民医院': ['市政府大楼','夜色成人用品店','海平洲际大酒店','海平中心世纪公园','水云间洗浴中心'],
};

const locMap = computed(() => {
  const m: Record<string, { x: number; y: number }> = {};
  for (const l of locations) m[l.name] = l;
  return m;
});

const mapEdges = computed(() => {
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const seen = new Set<string>();
  for (const [a, neighbors] of Object.entries(roadAdjacency)) {
    const p = locMap.value[a];
    if (!p) continue;
    for (const b of neighbors) {
      const q = locMap.value[b];
      if (!q) continue;
      const key = [a, b].sort().join('|');
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ x1: p.x, y1: p.y, x2: q.x, y2: q.y });
    }
  }
  return edges;
});

const busRoutes: string[][] = [
  ['文轩书店','海平中学','海平职业技术学院','维纳斯情侣酒店','夜色成人用品店','星海综合购物中心','水云间洗浴中心','海滨梦幻游乐园','海平湾公共海滩','极乐世界娱乐城','海平大学','文轩书店'],
  ['极乐世界娱乐城','海平湾公共海滩','海滨梦幻游乐园','水云间洗浴中心','远大电子装配厂','南区综合枢纽建设工地','工友平价大排档','海平轻纺制造厂','蓝领劳务大市场','远洋环球物流仓储中心','星海综合购物中心','夜色成人用品店','维纳斯情侣酒店','极乐世界娱乐城'],
  ['远大电子装配厂','南区综合枢纽建设工地','工友平价大排档','海平轻纺制造厂','西山半山别墅区','海平市大型体育中心','绿洲景苑小区','万家综合超市','蓝领劳务大市场','远洋环球物流仓储中心','远大电子装配厂'],
  ['西山半山别墅区','海平市大型体育中心','文轩书店','海平大学','海平职业技术学院','海平中学','绿洲景苑小区','万家综合超市','西山半山别墅区'],
];

const roadEdgeSet = computed(() => {
  const s = new Set<string>();
  for (const [a, neighbors] of Object.entries(roadAdjacency)) {
    for (const b of neighbors) s.add([a, b].sort().join('|'));
  }
  return s;
});

const busSegments = computed(() => {
  const segs: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
  const seen = new Set<string>();
  for (const route of busRoutes) {
    for (let i = 0; i < route.length - 1; i++) {
      const a = route[i], b = route[i + 1];
      if (!locMap.value[a] || !locMap.value[b]) continue;
      const key = [a, b].sort().join('|');
      if (seen.has(key)) continue;
      seen.add(key);
      const x1 = locMap.value[a].x, y1 = locMap.value[a].y;
      const x2 = locMap.value[b].x, y2 = locMap.value[b].y;
      if (roadEdgeSet.value.has(key)) {
        const dx = (x2 - x1) / 4, dy = (y2 - y1) / 4;
        segs.push({ x1, y1, x2: x1+dx, y2: y1+dy, color: '#d44' });
        segs.push({ x1: x1+dx, y1: y1+dy, x2: x1+2*dx, y2: y1+2*dy, color: '#444' });
        segs.push({ x1: x1+2*dx, y1: y1+2*dy, x2: x1+3*dx, y2: y1+3*dy, color: '#d44' });
        segs.push({ x1: x1+3*dx, y1: y1+3*dy, x2, y2, color: '#444' });
      } else {
        segs.push({ x1, y1, x2, y2, color: '#d44' });
      }
    }
  }
  return segs;
});

function onMapDragStart(e: MouseEvent) {
  mapDragging.value = true;
  mapDragStart.value = { x: e.clientX - mapPos.value.x, y: e.clientY - mapPos.value.y };
}
function onMapDragMove(e: MouseEvent) {
  if (!mapDragging.value) return;
  const viewW = 800, canvasW = 800;
  const viewH = 600, canvasH = 800;
  const newX = e.clientX - mapDragStart.value.x;
  const newY = e.clientY - mapDragStart.value.y;
  mapPos.value = {
    x: Math.min(0, Math.max(viewW - canvasW, newX)),
    y: Math.min(0, Math.max(viewH - canvasH, newY))
  };
}
function onMapDragEnd() {
  mapDragging.value = false;
}

function composeAndSend() {
  const parts: string[] = [];
  const t = store.data.APP.待选任务?.[selectedTask.value];
  if (t) parts.push(`[APP]我选择接取任务「${t.名称}」`);
  const ta = (window.parent.document as Document).querySelector('#send_textarea') as HTMLTextAreaElement;
  if (ta && ta.value.trim()) parts.push(ta.value.trim());
  if (selectedContact.value && contactMsg.value.trim()) parts.push(`[向${selectedContact.value}发送消息]${contactMsg.value.trim()}`);
  if (parts.length === 0) return;
  if (ta) { ta.value = parts.join('\n\n'); ta.dispatchEvent(new Event('input', { bubbles: true })); }
  selectedTask.value = -1;
  contactMsg.value = '';
}

function clickParentSend() {
  const btn = window.parent.document.querySelector('#send_but') as HTMLElement;
  if (btn) btn.click();
}

onMounted(() => {
  const snap = sessionStorage.getItem('cloth_snapshot');
  if (snap) {
    const { worn: wNames, wardrobe: cNames } = JSON.parse(snap);
    const allWorn = store.data.服装.穿着 || [];
    const allWardrobe = store.data.服装.可更换 || [];
    for (const name of wNames) {
      const idx = allWardrobe.findIndex(c => c.名称 === name);
      if (idx >= 0) { const [item] = allWardrobe.splice(idx, 1); allWorn.push(item); }
    }
    for (const name of cNames) {
      const idx = allWorn.findIndex(c => c.名称 === name);
      if (idx >= 0) { const [item] = allWorn.splice(idx, 1); allWardrobe.push(item); }
    }
    store.data.服装.整体色情值 = calcOverall(allWorn);
    sessionStorage.removeItem('cloth_snapshot');
  }
  const sendBtn = window.parent.document.querySelector('#send_but') as HTMLElement | null;
  if (sendBtn) sendBtn.addEventListener('click', composeAndSend, true);
  const ta = window.parent.document.querySelector('#send_textarea') as HTMLTextAreaElement | null;
  if (ta) ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { composeAndSend(); } }, true);
});

const showDetail = ref(new Set<string>());
const pendingMap = ref(new Map<string, 'wear' | 'remove'>());

const PAGE_SIZE = 6;
const wornPage = ref(0);
const wardrobePage = ref(0);

const posFilters = ref(new Set<string>());
const styleFilters = ref(new Set<string>());

function togglePosFilter(tag: string) {
  if (posFilters.value.has(tag)) posFilters.value.delete(tag);
  else posFilters.value.add(tag);
  wornPage.value = 0; wardrobePage.value = 0;
}

function toggleStyleFilter(tag: string) {
  if (styleFilters.value.has(tag)) styleFilters.value.delete(tag);
  else styleFilters.value.add(tag);
  wornPage.value = 0; wardrobePage.value = 0;
}

function clearAllFilters() {
  posFilters.value.clear();
  styleFilters.value.clear();
  wornPage.value = 0; wardrobePage.value = 0;
}

function matchesFilters(item: any) {
  const pos = item.部位标签 || [];
  const style = item.风格标签 || [];
  if (posFilters.value.size > 0 && !pos.some((t: string) => posFilters.value.has(t))) return false;
  if (styleFilters.value.size > 0 && !style.some((t: string) => styleFilters.value.has(t))) return false;
  return true;
}

const allPosTags = computed(() => {
  const tags = new Set<string>();
  for (const c of [...(store.data.服装?.穿着 || []), ...(store.data.服装?.可更换 || [])]) {
    for (const t of (c.部位标签 || [])) tags.add(t);
  }
  return [...tags].sort();
});

const allStyleTags = computed(() => {
  const tags = new Set<string>();
  for (const c of [...(store.data.服装?.穿着 || []), ...(store.data.服装?.可更换 || [])]) {
    for (const t of (c.风格标签 || [])) tags.add(t);
  }
  return [...tags].sort();
});

const filteredWorn = computed(() => {
  return (store.data.服装?.穿着 || []).map((item, i) => ({ item, origIdx: i })).filter(e => matchesFilters(e.item));
});

const filteredWardrobe = computed(() => {
  return (store.data.服装?.可更换 || []).map((item, i) => ({ item, origIdx: i })).filter(e => matchesFilters(e.item));
});

const paginatedWorn = computed(() => {
  const start = wornPage.value * PAGE_SIZE;
  return filteredWorn.value.slice(start, start + PAGE_SIZE);
});

const paginatedWardrobe = computed(() => {
  const start = wardrobePage.value * PAGE_SIZE;
  return filteredWardrobe.value.slice(start, start + PAGE_SIZE);
});

const totalWornPages = computed(() => Math.max(1, Math.ceil(filteredWorn.value.length / PAGE_SIZE)));
const totalWardrobePages = computed(() => Math.max(1, Math.ceil(filteredWardrobe.value.length / PAGE_SIZE)));

watch(totalWornPages, (pages) => { if (wornPage.value >= pages) wornPage.value = Math.max(0, pages - 1); });
watch(totalWardrobePages, (pages) => { if (wardrobePage.value >= pages) wardrobePage.value = Math.max(0, pages - 1); });

function toggleDetail(key: string) {
  if (showDetail.value.has(key)) showDetail.value.delete(key);
  else showDetail.value.add(key);
}

function calcOverall(worn: any[], wardrobe: any[], isFull: boolean = false) {
  const items = [...worn];
  const tags = (c: any) => c.部位标签 || [];
  const hasTop = items.some(c => tags(c).some(t => ['内衬','内衣','外套'].includes(t)));
  const hasBottom = items.some(c => tags(c).some(t => ['内裤','下装'].includes(t)));
  if (!hasTop) items.push({ 色情值: 90, 风格标签: [] });
  if (!hasBottom) items.push({ 色情值: 90, 风格标签: [] });
  if (items.length === 0) return 0;
  const avg = items.reduce((s: number, c: any) => s + (c.色情值 || 0), 0) / items.length;

  if (isFull && worn.length >= 2) {
    let same = 0, diff = 0;
    const realItems = worn.slice();
    const styleSets = realItems.map(c => new Set(c.风格标签 || []));
    for (let i = 0; i < styleSets.length; i++) {
      for (let j = i + 1; j < styleSets.length; j++) {
        let hasCommon = false;
        for (const t of styleSets[i]) { if (styleSets[j].has(t)) { hasCommon = true; break; } }
        if (hasCommon) same++; else diff++;
      }
    }
    if (same >= 10) return Math.round(avg * 1.30);
    if (same >= 6) return Math.round(avg * 1.20);
    if (same >= 3) return Math.round(avg * 1.20);
    if (diff >= 10) return Math.round(avg * 0.70);
    if (diff >= 6) return Math.round(avg * 0.80);
    if (diff >= 3) return Math.round(avg * 0.80);
  }
  return Math.round(avg);
}

function wearCloth(idx: number) {
  const wardrobe = store.data.服装.可更换 || [];
  const worn = store.data.服装.穿着 || [];
  if (idx < 0 || idx >= wardrobe.length) return;
  const name = wardrobe[idx].名称;
  const tags = wardrobe[idx].部位标签 || [];
  const conflict = worn.find(c => (c.部位标签 || []).some(t => tags.includes(t)));
  if (conflict && !pendingMap.value.has(name)) {
    (window.parent as any).toastr?.warning(`相同部位已经有一件「${conflict.名称}」啦，先脱下再穿吧～`);
    return;
  }
  if (pendingMap.value.has(name)) {
    pendingMap.value.delete(name);
    sessionRemove(name);
    const [item] = wardrobe.splice(idx, 1);
    worn.push(item);
    store.data.服装.整体色情值 = calcOverall(worn);
    return;
  }
  sessionBackup();
  const [item] = wardrobe.splice(idx, 1);
  worn.push(item);
  store.data.服装.整体色情值 = calcOverall(worn);
  pendingMap.value.set(name, 'wear');
}

function removeCloth(idx: number) {
  const wardrobe = store.data.服装.可更换 || [];
  const worn = store.data.服装.穿着 || [];
  if (idx < 0 || idx >= worn.length) return;
  const name = worn[idx].名称;
  if (pendingMap.value.has(name)) {
    pendingMap.value.delete(name);
    sessionRemove(name);
    const [item] = worn.splice(idx, 1);
    wardrobe.push(item);
    store.data.服装.整体色情值 = calcOverall(worn);
    return;
  }
  sessionBackup();
  const [item] = worn.splice(idx, 1);
  wardrobe.push(item);
  store.data.服装.整体色情值 = calcOverall(worn);
  pendingMap.value.set(name, 'remove');
}

function confirmOutfit() {
  if (pendingMap.value.size === 0) return;
  const msg = '[换装]' + [...pendingMap.value.keys()].join('、');
  pendingMap.value.clear();
  sessionStorage.removeItem('cloth_snapshot');
  const ta = (window.parent.document as Document).querySelector('#send_textarea') as HTMLTextAreaElement;
  if (ta) { ta.value = msg; ta.dispatchEvent(new Event('input', { bubbles: true })); }
}

function sessionBackup() {
  if (sessionStorage.getItem('cloth_snapshot')) return;
  const w = store.data.服装.穿着 || [];
  const c = store.data.服装.可更换 || [];
  sessionStorage.setItem('cloth_snapshot', JSON.stringify({ worn: w.map(x => x.名称), wardrobe: c.map(x => x.名称) }));
}

function sessionRemove(name: string) {
  const s = sessionStorage.getItem('cloth_snapshot');
  if (!s) return;
  const snap = JSON.parse(s);
  snap.worn = snap.worn.filter((n: string) => n !== name);
  snap.wardrobe = snap.wardrobe.filter((n: string) => n !== name);
  if (snap.worn.length === 0 && snap.wardrobe.length === 0) { sessionStorage.removeItem('cloth_snapshot'); return; }
  sessionStorage.setItem('cloth_snapshot', JSON.stringify(snap));
}

const nudityWarnings = computed(() => {
  const worn: any[] = store.data.服装?.穿着 || [];
  const tags = (c: any) => c.部位标签 || [];
  const hasTop = worn.some(c => tags(c).some(t => ['内衬','内衣','外套'].includes(t)));
  const hasBottom = worn.some(c => tags(c).some(t => ['内裤','下装'].includes(t)));
  const w: string[] = [];
  if (!hasTop) w.push('上身裸露');
  if (!hasBottom) w.push('下身裸露');
  return w;
});

const styleTagEntries = computed(() => {
  const worn: any[] = store.data.服装?.穿着 || [];
  const counts: Record<string, number> = {};
  for (const c of worn) {
    for (const t of (c.风格标签 || [])) {
      counts[t] = (counts[t] || 0) + 1;
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
});

const levelNames: Record<number, string> = {
  1: '青涩新人', 2: '初级外围', 3: '资深玩物', 4: '知名母狗', 5: '公共便器'
};
const levelExpMin: Record<number, number> = { 1: 0, 2: 150, 3: 1000, 4: 4000, 5: 15000 };
const levelExpNext: Record<number, number> = { 1: 150, 2: 1000, 3: 4000, 4: 15000, 5: 15000 };

const levelLabel = computed(() => {
  const lv = store.data.APP.等级 || 1;
  return `Lv.${lv} ${levelNames[lv] || ''}`;
});

const expPercent = computed(() => {
  const lv = store.data.APP.等级 || 1;
  const cur = store.data.APP.经验值 || 0;
  const min = levelExpMin[lv] || 0;
  const next = levelExpNext[lv] || 15000;
  if (lv >= 5) return 100;
  return Math.round(((cur - min) / (next - min)) * 100);
});

const taskDayCountdown = computed(() => {
  const timeStr = store.data.世界.时间 || '';
  const d = new Date(timeStr);
  if (isNaN(d.getTime())) return '';
  const today = d.getDay();
  const done = store.data.APP?.本周已完成;
  if ((today === 4 || today === 0) && done) return '本周期任务已完成，等待下个任务日';
  if (today === 4 || today === 0) return '任务日已到，打开APP接取任务';
  const now = d.getTime();
  const getNext = (day: number) => { const n = new Date(now); n.setDate(n.getDate() + ((day - n.getDay() + 7) % 7 || 7)); n.setHours(0, 0, 0, 0); return n.getTime(); };
  const next = Math.min(getNext(4), getNext(0));
  const diff = next - now;
  const dd = Math.floor(diff / 86400000);
  const hh = Math.floor((diff % 86400000) / 3600000);
  const mm = Math.floor((diff % 3600000) / 60000);
  return `距离下个任务日还有 ${dd} 天 ${hh} 小时 ${mm} 分钟`;
});

const activeTabName = computed(() => {
  const t = tabs.find(t => t.id === activeTab.value);
  return t ? t.label : '';
});

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
const datePart = computed(() => {
  const raw = (store.data.世界.时间 || '').split(' ')[0] || '';
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return raw + ' 周' + weekDays[d.getDay()];
});
const timePart = computed(() => (store.data.世界.时间 || '').split(' ').slice(1).join(' ') || '');
const locationLabel = computed(() => {
  const loc = store.data.世界.地点 || '';
  const parts = loc.split('_');
  const detail = parts.length > 1 ? parts.slice(1).join('_') : parts[0];
  return detail.replace(/_/g, ' ');
});
</script>

<style lang="scss" scoped>
.status-card {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  font-family: var(--font-mono);
  color: var(--c-text);
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid var(--c-border);
  border-radius: 10px;
  overflow: hidden;
}

.wave-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse at 20% 80%, rgba(30, 60, 140, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(40, 80, 160, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(15, 40, 100, 0.25) 0%, transparent 70%),
    linear-gradient(180deg, var(--c-bg-deep) 0%, var(--c-bg-mid) 50%, var(--c-bg-deep) 100%);
}

.card-content {
  position: relative;
  z-index: 1;
}

.tab-nav {
  display: flex;
  padding: 0;
  gap: 0;
}

.tab-btn {
  flex: 1;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--c-text-dim);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: bold;
  padding: 10px 0;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;

  &:hover { color: var(--c-text); }
  &.active {
    color: var(--c-accent);
    border-bottom-color: var(--c-accent);
  }
}

.tab-content {
  min-height: 400px;
}

.stats-section {
  padding: 12px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-icon { font-size: 1.1rem; width: 24px; text-align: center; }
.stat-name { font-weight: bold; font-size: 0.9rem; min-width: 60px; color: var(--c-text-dim); }
.stat-val  { font-weight: bold; font-size: 0.9rem; color: var(--c-text); }

.exp-val { font-size: 0.7rem; min-width: 56px; text-align: right; }

.stat-bar-wrap {
  flex: 1;
  position: relative;
  height: 22px;
  display: flex;
  align-items: center;
}

.stat-bar {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.bar-val {
  position: absolute;
  right: 0;
  top: -1px;
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--c-text-dim);
}

.fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.35s ease;
}

.fill.food     { background: #e8a850; }
.fill.spirit   { background: #5badd4; }
.fill.mood     { background: #c47ab4; }
.fill.erotica  { background: #c44a6a; }
.fill.libido   { background: #e05555; }
.fill.pleasure { background: linear-gradient(90deg, #e8a850, #e05555); }

.map-layout { min-height: 600px; background: #fff; border-radius: 0 0 10px 10px; overflow: hidden; }
.map-viewport { width: 100%; height: 600px; overflow: hidden; position: relative; cursor: grab; user-select: none; }
.map-viewport:active { cursor: grabbing; }
.map-canvas { width: 800px; height: 800px; position: absolute; top: 0; left: 0; background: #fff; }
.map-circle-outer {
  width: 800px; height: 800px; position: absolute; left: 0; top: 0;
  border-radius: 50%; border: 2px solid #aaa; overflow: hidden;
  background: conic-gradient(
    #e8d5f0 0deg   45deg,
    #d5e6f0 45deg  135deg,
    #d5f0e4 135deg 225deg,
    #f0ead5 225deg 315deg,
    #e8d5f0 315deg 360deg
  );
}
.map-circle-inner {
  width: 300px; height: 300px; position: absolute; left: 250px; top: 250px;
  border-radius: 50%; border: 2px solid #aaa; background: #fce8e8; z-index: 1;
}
.map-diag { position: absolute; left: 50%; top: 50%; width: 1132px; height: 2px; background: #aaa; transform-origin: center; z-index: 1; }
.map-diag-1 { transform: translate(-50%, -50%) rotate(45deg); }
.map-diag-2 { transform: translate(-50%, -50%) rotate(-45deg); }
.map-dot { position: absolute; width: 8px; height: 8px; margin-left: -4px; margin-top: -4px; border-radius: 50%; background: #444; border: 1px solid #222; z-index: 3; cursor: pointer; }
.map-dot:hover { background: #000; transform: scale(1.5); }
.map-dot-label { position: absolute; left: 10px; top: -6px; font-size: 0.6rem; white-space: nowrap; color: #444; pointer-events: none; }
.map-road-lines, .map-bus-lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.map-road-lines { z-index: 2; }
.map-road-lines line { stroke: #444; stroke-width: 2; }
.map-bus-lines { z-index: 3; }
.map-bus-lines line { stroke-width: 3; }
.map-wrapper { padding: 12px; color: #333; font-size: 0.8rem; }
.placeholder {
  padding: 30px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-size: 0.7rem;
  color: var(--c-text-dim);
}

.task-card {
  margin-top: 8px;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 14px 16px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;

  &:hover { border-color: var(--c-accent); }
  &.selected { border-color: var(--c-accent); background: rgba(196, 74, 74, 0.08); }
}

.task-title {
  font-size: 0.85rem;
  font-weight: bold;
  color: var(--c-text);
  margin-bottom: 8px;
}

.confirm-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  background: var(--c-accent);
  border: none;
  border-radius: 6px;
  color: #fff;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.15s;

  &:disabled { opacity: 0.35; cursor: default; }
  &:not(:disabled):hover { opacity: 0.85; }
}

.task-header {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--c-accent);
  margin-bottom: 10px;
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.task-row {
  display: flex;
  gap: 10px;
  font-size: 0.75rem;
}

.task-label {
  color: var(--c-text-dim);
  min-width: 36px;
}

.task-val {
  color: var(--c-text);
  flex: 1;
}

.task-desc {
  font-size: 0.7rem;
  line-height: 1.5;
}

.empty-state {
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--c-text-dim);
}

.fill.exp { background: linear-gradient(90deg, #c44a6a, #e8a850); }

.contacts-layout { display: flex; height: 400px; }
.contact-list { width: 25%; border-right: 1px solid var(--c-border); overflow-y: auto; display: flex; flex-direction: column; padding: 4px 0; }
.contact-item { padding: 10px 10px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; &:hover { background: rgba(255,255,255,0.03); } &.active { background: rgba(196,74,74,0.1); } }
.contact-name { font-size: 0.75rem; font-weight: bold; color: var(--c-text); margin-bottom: 2px; }
.contact-affection { font-size: 0.6rem; color: var(--c-text-dim); }
.chat-window { flex: 1; display: flex; flex-direction: column; background: rgba(0,0,0,0.15); }
.chat-header { padding: 12px 16px; font-size: 0.8rem; font-weight: bold; color: var(--c-text); border-bottom: 1px solid var(--c-border); text-align: center; }
.chat-messages { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; }
.chat-placeholder { font-size: 0.7rem; color: var(--c-text-dim); text-align: center; padding-top: 60px; }
.chat-input-bar { padding: 10px 14px; border-top: 1px solid var(--c-border); display: flex; gap: 8px; align-items: flex-end; }
.chat-textarea { flex: 1; background: var(--c-bg); border: 1px solid var(--c-border); border-radius: 6px; color: var(--c-text); font-family: var(--font-mono); font-size: 0.7rem; padding: 8px 10px; resize: none; outline: none; &:focus { border-color: var(--c-accent); } &:disabled { opacity: 0.4; } }
.chat-send-btn { padding: 8px 16px; background: var(--c-accent); border: none; border-radius: 6px; color: #fff; font-family: var(--font-mono); font-size: 0.7rem; font-weight: bold; cursor: pointer; white-space: nowrap; &:disabled { opacity: 0.35; cursor: default; } &:not(:disabled):hover { opacity: 0.85; } }
.msg-bubble { max-width: 75%; margin-bottom: 8px; padding: 6px 10px; border-radius: 8px; font-size: 0.7rem; line-height: 1.4; background: rgba(255,255,255,0.06); color: var(--c-text); align-self: flex-start; &.mine { background: rgba(196,74,74,0.2); align-self: flex-end; text-align: right; } }

.cloth-layout { display: flex; flex-direction: column; min-height: 460px; }
.cloth-filter-bar { display: flex; flex-direction: column; gap: 4px; padding: 8px 14px 4px; border-bottom: 1px solid var(--c-border); }
.filter-group { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.filter-label { font-size: 0.65rem; color: var(--c-text-dim); font-weight: bold; margin-right: 2px; white-space: nowrap; }
.filter-tag { font-size: 0.62rem; font-weight: bold; padding: 2px 7px; border-radius: 4px; cursor: pointer; transition: all 0.15s; opacity: 0.45; border: 1px solid transparent; white-space: nowrap; &:hover { opacity: 0.8; } &.active { opacity: 1; border-color: currentColor; } }
.filter-tag.tag-pos { color: #5badd4; background: rgba(91,173,212,0.12); }
.filter-tag.tag-style { color: #6bc480; background: rgba(107,196,128,0.12); }
.filter-all { color: var(--c-text-dim); opacity: 0.6; background: rgba(255,255,255,0.05); &:hover { opacity: 1; color: #e87373; } }
.cloth-panels { display: flex; flex: 1; }
.cloth-panel { flex: 1; padding: 10px 12px; display: flex; flex-direction: column; height: 630px; &:first-child { border-right: 1px solid var(--c-border); } }
.cloth-list { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 8px; overflow: hidden; }
.cloth-panel-title { font-size: 0.85rem; font-weight: bold; color: var(--c-accent); margin-bottom: 4px; }
.page-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.page-btn { font-size: 0.65rem; font-weight: bold; padding: 2px 8px; border-radius: 4px; border: 1px solid var(--c-border); background: rgba(255,255,255,0.05); color: var(--c-text-dim); cursor: pointer; transition: all 0.15s; &:hover:not(:disabled) { background: rgba(255,255,255,0.12); color: #fff; } &:disabled { opacity: 0.3; cursor: default; } }
.page-info { font-size: 0.65rem; color: var(--c-text-dim); }
.cloth-card { background: rgba(255,255,255,0.03); border: 1px solid var(--c-border); border-radius: 6px; padding: 8px 10px; transition: border-color 0.2s, background 0.2s;
  &.pending-wear { border-color: #73c873; background: rgba(115,200,115,0.08); }
  &.pending-remove { border-color: #e87373; background: rgba(232,115,115,0.08); }
}
.cloth-name { font-size: 0.8rem; font-weight: bold; color: var(--c-text); margin-bottom: 4px; }
.cloth-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 5px; }
.cloth-tag { display: inline-block; font-size: 0.65rem; font-weight: bold; padding: 2px 6px; border-radius: 4px;
  &.tag-pos   { color: #5badd4; background: rgba(91,173,212,0.15); }
  &.tag-style { color: #6bc480; background: rgba(107,196,128,0.15); }
  &.tag-color { color: #e8a850; background: rgba(232,168,80,0.15); }
  &.tag-erotica { color: #e88090; background: rgba(232,128,144,0.15); }
}
.cloth-desc { font-size: 0.7rem; color: var(--c-text-dim); line-height: 1.4; margin-top: 4px; }
.cloth-actions { display: flex; gap: 4px; margin-top: 5px; }
.cloth-btn { font-size: 0.65rem; font-weight: bold; padding: 2px 7px; border-radius: 4px; border: none; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); cursor: pointer; transition: all 0.15s; &:hover { background: rgba(255,255,255,0.2); color: #fff; } }
.cloth-btn-wear { background: rgba(115,200,115,0.15); color: #73c873; &:hover { background: rgba(115,200,115,0.25); } }
.cloth-btn-remove { background: rgba(232,115,115,0.15); color: #e87373; &:hover { background: rgba(232,115,115,0.25); } }
.cloth-confirm { padding: 0 14px 14px 14px; }
.nudity-warn { margin: 8px 14px 0; padding: 8px 10px; font-size: 0.75rem; border-radius: 6px; background: rgba(232,168,80,0.12); color: #e8a850; text-align: center; }
.cloth-stats-row { display: flex; gap: 6px; margin: 6px 14px 0; }
.cloth-erotica-display { flex: 1; padding: 8px 10px; font-size: 0.85rem; font-weight: bold; border-radius: 6px; background: rgba(224,85,85,0.1); color: #e05555; }
.style-tag-counts { flex: 1; padding: 8px 10px; border-radius: 6px; background: rgba(107,196,128,0.08); display: flex; flex-wrap: wrap; gap: 4px; align-content: flex-start; }

.contacts-theme { background: rgb(255,204,191); border-color: rgba(0,0,0,0.1); color: #4a2020; .wave-bg { display: none; } .tab-btn { color: rgba(74,32,32,0.5); &:hover { color: rgba(74,32,32,0.8); } &.active { color: var(--c-accent); background: rgba(0,0,0,0.04); } } .chat-header { color: #4a2020; border-color: rgba(0,0,0,0.08); } .contact-name { color: #fff; } .contact-affection { color: rgba(255,255,255,0.7); } .chat-textarea { background: rgba(255,255,255,0.6); color: #4a2020; border-color: rgba(0,0,0,0.08); } .chat-messages { background: rgba(0,0,0,0.02); } .chat-input-bar { border-color: rgba(0,0,0,0.08); } .msg-bubble { background: rgba(255,255,255,0.5); color: #4a2020; &.mine { background: rgba(255,255,255,0.75); } } .contact-item { border-color: rgba(255,255,255,0.15); &:hover { background: rgba(255,255,255,0.1); } &.active { background: rgba(255,255,255,0.18); } } .contact-list { background: rgb(240,128,128); border-color: rgba(255,255,255,0.2); } }

@media (max-width: 400px) {
  .status-card { max-width: 100%; }
  .stat-row { flex-wrap: wrap; }
}
</style>
