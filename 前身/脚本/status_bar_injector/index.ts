/* ============================
   墨墨露出 · 状态栏自动注入脚本 v3
   与 <StatusPlaceHolderImpl/> 绑定，通过  提供持久化容器
   ============================ */

$(() => {

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap');

#momo-status-bar {
  all: initial;
  display: block;
  width: 100%;
  max-width: 680px;
  box-sizing: border-box;
  margin: 12px auto;
  font-family: 'Noto Sans SC', -apple-system, 'Microsoft YaHei', sans-serif;
  color: #e8e6e3;
  overflow: hidden;
  user-select: none;
}

#momo-status-bar .msb-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 14px 18px;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(232, 160, 191, 0.15);
}

#momo-status-bar .msb-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

#momo-status-bar .msb-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b9d, #c084fc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  flex-shrink: 0;
}

#momo-status-bar .msb-title {
  font-size: 15px;
  font-weight: 600;
  color: #f0eef0;
  letter-spacing: 0.5px;
}

#momo-status-bar .msb-subtitle {
  font-size: 11px;
  color: #a8a8b8;
  margin-top: 1px;
}

#momo-status-bar .msb-level-badge {
  background: rgba(255, 107, 157, 0.15);
  border: 1px solid rgba(255, 107, 157, 0.3);
  border-radius: 20px;
  padding: 3px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #ff6b9d;
  white-space: nowrap;
}

#momo-status-bar .msb-tabs {
  display: flex;
  background: #1a1a2e;
  border-bottom: 1px solid rgba(232, 160, 191, 0.08);
}

#momo-status-bar .msb-tab {
  flex: 1;
  text-align: center;
  padding: 10px 0 8px;
  font-size: 12px;
  font-weight: 500;
  color: #787890;
  cursor: pointer;
  letter-spacing: 0.5px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  position: relative;
}

#momo-status-bar .msb-tab:hover { color: #b0b0c8; }

#momo-status-bar .msb-tab.active {
  color: #ff6b9d;
  border-bottom-color: #ff6b9d;
}

#momo-status-bar .msb-tab .msb-tab-icon {
  display: block;
  font-size: 16px;
  margin-bottom: 2px;
}

#momo-status-bar .msb-panel {
  display: none;
  background: linear-gradient(180deg, #1e1e32 0%, #1a1a2e 100%);
  padding: 14px 16px;
}

#momo-status-bar .msb-panel.active { display: block; }

#momo-status-bar .msb-row {
  display: flex;
  align-items: center;
  padding: 4px 0;
  font-size: 13px;
  line-height: 1.6;
}

#momo-status-bar .msb-label {
  color: #9a9ab0;
  min-width: 60px;
  flex-shrink: 0;
  font-weight: 500;
}

#momo-status-bar .msb-value { color: #e8e6e3; flex: 1; }
#momo-status-bar .msb-value.money { color: #a2e3c4; font-weight: 600; }
#momo-status-bar .msb-value.debt { color: #ff6b6b; font-weight: 600; }
#momo-status-bar .msb-value.location { color: #7ec8e3; }

#momo-status-bar .msb-stat { padding: 3px 0; }
#momo-status-bar .msb-stat-erotic { cursor: pointer; }
#momo-status-bar .msb-stat-erotic:hover .msb-stat-name { color: #ff6b9d; }

#momo-status-bar .msb-stat-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 2px;
}

#momo-status-bar .msb-stat-name { color: #b8b8d0; }
#momo-status-bar .msb-stat-val { color: #e8e6e3; font-weight: 500; }

#momo-status-bar .msb-stat-track {
  height: 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 4px;
  overflow: hidden;
}

#momo-status-bar .msb-stat-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

#momo-status-bar .msb-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}

#momo-status-bar .msb-app-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,107,157,0.08);
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 8px;
}

#momo-status-bar .msb-app-card-title {
  font-size: 11px;
  font-weight: 600;
  color: #ff6b9d;
  letter-spacing: 1px;
  margin-bottom: 6px;
  text-transform: uppercase;
}

#momo-status-bar .msb-exp-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
}

#momo-status-bar .msb-exp-track {
  flex: 1;
  height: 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 4px;
  overflow: hidden;
}

#momo-status-bar .msb-exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6b9d, #c084fc);
  border-radius: 4px;
  transition: width 0.4s ease;
}

#momo-status-bar .msb-exp-text {
  font-size: 11px;
  color: #a8a8b8;
  white-space: nowrap;
}

#momo-status-bar .msb-task-card {
  background: rgba(255,107,157,0.04);
  border: 1px solid rgba(255,107,157,0.12);
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 6px;
}

#momo-status-bar .msb-task-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

#momo-status-bar .msb-task-option {
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

#momo-status-bar .msb-task-option:hover {
  border-color: rgba(255,107,157,0.3);
  background: rgba(255,107,157,0.06);
}

#momo-status-bar .msb-task-option.msb-task-selected {
  border-color: #ff6b9d;
  background: rgba(255,107,157,0.1);
  box-shadow: 0 0 8px rgba(255,107,157,0.2);
}

#momo-status-bar .msb-task-option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

#momo-status-bar .msb-task-option-name {
  font-size: 13px;
  font-weight: 600;
  color: #e8e6e3;
}

#momo-status-bar .msb-task-option-grade {
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 8px;
  background: rgba(255,107,157,0.1);
}

#momo-status-bar .msb-task-confirm-btn {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 8px 0;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #ff6b9d, #e05580);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s;
}

#momo-status-bar .msb-task-confirm-btn:hover {
  opacity: 0.85;
}

#momo-status-bar .msb-task-confirm-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

#momo-status-bar .msb-task-row {
  display: flex;
  padding: 2px 0;
  font-size: 12px;
}

#momo-status-bar .msb-task-label {
  color: #9a9ab0;
  min-width: 56px;
  flex-shrink: 0;
}

#momo-status-bar .msb-task-value { color: #e8e6e3; flex: 1; }
#momo-status-bar .msb-task-na { color: #5a5a70; font-style: italic; }

#momo-status-bar .msb-contacts-panel {
  display: flex;
  flex-direction: row;
  height: 340px;
  max-height: 55vh;
}

#momo-status-bar .msb-contact-list {
  width: 160px;
  min-width: 160px;
  overflow-y: auto;
  border-right: 1px solid rgba(255,107,157,0.08);
  flex-shrink: 0;
  padding: 4px 0;
}

#momo-status-bar .msb-contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 8px;
  cursor: pointer;
  border-radius: 6px;
  margin: 1px 4px;
  transition: background 0.15s;
}

#momo-status-bar .msb-contact-item:hover { background: rgba(255,107,157,0.06); }
#momo-status-bar .msb-contact-item.selected { background: rgba(255,107,157,0.12); }

#momo-status-bar .msb-ci-avatar {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 11px;
  color: #fff;
}

#momo-status-bar .msb-ci-name {
  font-size: 11px;
  color: #d0d0e0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

#momo-status-bar .msb-ci-fav {
  font-size: 10px;
  flex-shrink: 0;
}

#momo-status-bar .msb-ci-fav.high { color: #ff6b9d; }
#momo-status-bar .msb-ci-fav.mid { color: #a2d2ff; }
#momo-status-bar .msb-ci-fav.low { color: #5a5a70; }

#momo-status-bar .msb-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

#momo-status-bar .msb-chat-header {
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #ff6b9d;
  border-bottom: 1px solid rgba(255,107,157,0.08);
  text-align: center;
  flex-shrink: 0;
}

#momo-status-bar .msb-chat-msgs {
  flex: 1;
  overflow-y: auto;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

#momo-status-bar .msb-msg {
  max-width: 88%;
  padding: 7px 11px;
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.45;
  word-break: break-word;
}

#momo-status-bar .msb-msg.sent {
  align-self: flex-end;
  background: linear-gradient(135deg, rgba(255,107,157,0.2), rgba(192,132,252,0.15));
  color: #e8e6e3;
  border-bottom-right-radius: 4px;
}

#momo-status-bar .msb-msg.received {
  align-self: flex-start;
  background: rgba(162,210,255,0.08);
  color: #d0d0d8;
  border-bottom-left-radius: 4px;
}

#momo-status-bar .msb-msg-time {
  font-size: 9px;
  color: #6a6a80;
  text-align: right;
  margin-top: 3px;
}

#momo-status-bar .msb-chat-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5a5a70;
  font-size: 12px;
}

#momo-status-bar .msb-chat-input {
  display: flex;
  border-top: 1px solid rgba(255,107,157,0.08);
  padding: 6px 8px;
  gap: 6px;
  flex-shrink: 0;
}

#momo-status-bar .msb-chat-input input {
  flex: 1;
  min-width: 0;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,107,157,0.7);
  border-radius: 8px;
  color: #e8e6e3;
  font-size: 12px;
  padding: 6px 10px;
  outline: none;
  font-family: inherit;
}

#momo-status-bar .msb-chat-input input:focus { border-color: rgba(255,107,157,0.4); }
#momo-status-bar .msb-chat-input input::placeholder { color: #4a4a60; }

#momo-status-bar .msb-chat-input button {
  flex-shrink: 0;
  background: linear-gradient(135deg, #ff6b9d, #e05580);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
}

#momo-status-bar .msb-chat-input button:hover { opacity: 0.85; }
#momo-status-bar .msb-chat-input button:disabled { opacity: 0.3; cursor: not-allowed; }

#momo-status-bar .msb-footer {
  background: #1a1a2e;
  padding: 10px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(232, 160, 191, 0.08);
  border-radius: 0 0 16px 16px;
  font-size: 12px;
}

#momo-status-bar .msb-footer-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

#momo-status-bar .msb-footer-label { color: #787890; }
#momo-status-bar .msb-footer-val.money { color: #a2e3c4; font-weight: 600; }
#momo-status-bar .msb-footer-val.debt { color: #ff6b6b; font-weight: 600; }

#momo-status-bar .msb-map-container {
  background: #fff;
  border-radius: 8px;
  height: 320px;
  max-height: 55vh;
  overflow: hidden;
  position: relative;
}

#momo-status-bar .msb-map-canvas {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

#momo-status-bar .msb-loc-dot.msb-loc-current {
  fill: #ff6b9d;
  animation: msb-breathe 1.5s ease-in-out infinite;
}

#momo-status-bar .msb-loc-pulse {
  fill: none;
  stroke: #ff6b9d;
  stroke-width: 2.5;
  opacity: 0.6;
  animation: msb-pulse 1.5s ease-out infinite;
}

@keyframes msb-breathe {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes msb-pulse {
  0% { opacity: 0.6; r: 11; }
  100% { opacity: 0; r: 18; }
}

#momo-status-bar .msb-closet-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

#momo-status-bar .msb-closet-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

#momo-status-bar .msb-closet-col-title {
  font-size: 11px;
  font-weight: 600;
  color: #ff6b9d;
  letter-spacing: 1px;
  padding: 0 2px;
  margin-bottom: 2px;
}

#momo-status-bar .msb-closet-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(232,160,191,0.12);
  border-radius: 10px;
  padding: 10px 12px;
  transition: background 0.15s;
}

#momo-status-bar .msb-closet-card-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}

#momo-status-bar .msb-closet-card-name {
  flex: 1;
  cursor: default;
  font-size: 13px;
  font-weight: 600;
  color: #e8e6e3;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#momo-status-bar .msb-closet-card-row button {
  flex-shrink: 0;
  padding: 2px 8px;
  border: 1px solid rgba(232,160,191,0.2);
  border-radius: 4px;
  background: rgba(255,255,255,0.04);
  color: #b8b8d0;
  font-size: 10px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.15s;
  line-height: 1.6;
}

#momo-status-bar .msb-closet-card-row button:hover {
  background: rgba(255,107,157,0.12);
  border-color: rgba(255,107,157,0.3);
  color: #e8e6e3;
}

#momo-status-bar .msb-closet-card-row .msb-closet-toggle {
  color: #ff6b9d;
  border-color: rgba(255,107,157,0.3);
  font-weight: 600;
}

#momo-status-bar .msb-closet-card-detail {
  margin: 4px 0 0;
}

#momo-status-bar .msb-closet-extra-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 4px;
}

#momo-status-bar .msb-closet-detail-desc {
  font-size: 11px;
  color: #9a9ab0;
  line-height: 1.5;
  padding: 6px 8px;
  background: rgba(255,255,255,0.02);
  border-radius: 6px;
}

#momo-status-bar .msb-closet-erotic-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(255,107,107,0.06);
  border: 1px solid rgba(255,107,107,0.12);
}

#momo-status-bar .msb-closet-erotic-label {
  font-size: 12px;
  color: #a8a8b8;
  font-weight: 500;
}

#momo-status-bar .msb-closet-erotic-val {
  font-size: 16px;
  font-weight: 700;
  color: #ff6b6b;
}

#momo-status-bar .msb-closet-info-row {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  align-items: stretch;
}

#momo-status-bar .msb-closet-info-row .msb-closet-erotic-bar {
  flex: 1;
  min-width: 0;
  margin-top: 0;
  padding: 6px 12px;
  gap: 8px;
}

#momo-status-bar .msb-closet-style-bar {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(162,210,255,0.06);
  border: 1px solid rgba(162,210,255,0.12);
  overflow: hidden;
}

#momo-status-bar .msb-style-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

#momo-status-bar .msb-style-tag {
  font-size: 10px;
  color: #b8b8d0;
  font-weight: 500;
  white-space: nowrap;
}

#momo-status-bar .msb-style-count {
  font-size: 9px;
  color: #8ac4ff;
  font-weight: 600;
  margin-left: 2px;
}

#momo-status-bar .msb-closet-warning {
  margin-top: 8px;
  display: flex;
  justify-content: center;
}

#momo-status-bar .msb-warning-item {
  font-size: 11px;
  color: #ff6b6b;
  font-weight: 500;
  padding: 4px 14px;
  border-radius: 6px;
  background: rgba(255,107,107,0.08);
  border: 1px solid rgba(255,107,107,0.15);
  display: inline-block;
}



#momo-status-bar .msb-closet-empty {
  font-size: 12px;
  color: #5a5a70;
  text-align: center;
  padding: 20px 0;
}

#momo-status-bar .msb-closet-card.msb-closet-on {
  border-color: rgba(162,227,196,0.8);
  border-width: 2px;
  box-shadow: 0 0 8px rgba(162,227,196,0.25);
}

#momo-status-bar .msb-closet-card.msb-closet-off {
  border-color: rgba(255,107,107,0.7);
  border-width: 2px;
  opacity: 0.7;
}

#momo-status-bar .msb-closet-send {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255,107,107,0.06);
  border: 1px solid rgba(255,107,107,0.12);
  color: #ff6b9d;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 1px;
}

#momo-status-bar .msb-closet-send:hover {
  background: rgba(255,107,107,0.12);
  border-color: rgba(255,107,107,0.3);
  color: #ff6b9d;
  box-shadow: 0 0 8px rgba(255,107,107,0.15);
}

#momo-status-bar .msb-closet-send:active {
  transform: scale(0.98);
}

#momo-status-bar .msb-closet-send:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: rgba(120,120,144,0.3);
  color: #787890;
  background: rgba(120,120,144,0.04);
  box-shadow: none;
  transform: none;
}

#momo-status-bar .msb-closet-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

#momo-status-bar .msb-closet-card-tags-row {
  margin-top: 4px;
}

#momo-status-bar .msb-closet-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

#momo-status-bar .msb-npc-section {
  margin-top: 10px;
}

#momo-status-bar .msb-npc-header {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(162,210,255,0.04);
  border: 1px solid rgba(162,210,255,0.08);
  transition: background 0.15s;
}

#momo-status-bar .msb-npc-header:hover {
  background: rgba(162,210,255,0.08);
}

#momo-status-bar .msb-npc-detail {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

#momo-status-bar .msb-npc-card {
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,107,157,0.06);
}

#momo-status-bar .msb-npc-card-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}

#momo-status-bar .msb-npc-name {
  font-size: 12px;
  font-weight: 600;
  color: #e8e6e3;
}

#momo-status-bar .msb-npc-personality {
  font-size: 10px;
  padding: 1px 8px;
  border-radius: 10px;
  background: rgba(255,107,157,0.08);
  color: #ff6b9d;
  font-weight: 500;
}

#momo-status-bar .msb-npc-status {
  font-size: 11px;
  color: #9a9ab0;
  line-height: 1.4;
}

#momo-status-bar .msb-npc-empty {
  text-align: center;
  padding: 12px 0;
  color: #5a5a70;
  font-size: 12px;
}

#momo-status-bar .msb-tag-part { background: rgba(162,210,255,0.15); color: #8ac4ff; }
#momo-status-bar .msb-tag-style { background: rgba(255,193,7,0.12); color: #ffd54f; }
#momo-status-bar .msb-tag-color { background: rgba(232,160,191,0.15); color: #e8a0bf; }
#momo-status-bar .msb-tag-erotic { background: rgba(255,107,107,0.15); color: #ff6b6b; font-weight: 700; }
#momo-status-bar .msb-tag-material { background: rgba(162,227,196,0.12); color: #a2e3c4; }
#momo-status-bar .msb-tag-trait { background: rgba(255,193,7,0.08); color: #ffc107; }
#momo-status-bar .msb-tag-price { background: rgba(162,227,196,0.1); color: #a2e3c4; }

#momo-status-bar .msb-tag {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}

#momo-status-bar .msb-tag.low { background: rgba(162,227,196,0.12); color: #a2e3c4; }
#momo-status-bar .msb-tag.mid { background: rgba(255,193,7,0.12); color: #ffc107; }
#momo-status-bar .msb-tag.high { background: rgba(255,107,107,0.12); color: #ff6b6b; }

#momo-status-bar { animation: msb-fadein 0.3s ease; }

@keyframes msb-fadein {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

#momo-status-bar .msb-panel.map.active { height: 700px; max-height: 75vh; }
#momo-status-bar .msb-panel.map.active .msb-map-container { height: 100%; }

g.route-system:has(.route-g1:hover) .overlay-strip .route-g1 line.overlay,
g.route-system:has(.route-g2:hover) .overlay-strip .route-g2 line.overlay,
g.route-system:has(.route-g3:hover) .overlay-strip .route-g3 line.overlay {
  opacity: 1 !important;
}
g.route-system:has(.route-r1:hover) .overlay-strip .route-r1 line.overlay,
g.route-system:has(.route-r2:hover) .overlay-strip .route-r2 line.overlay,
g.route-system:has(.route-r3:hover) .overlay-strip .route-r3 line.overlay,
g.route-system:has(.route-r4:hover) .overlay-strip .route-r4 line.overlay {
  opacity: 1 !important;
}

`;

const DEFAULTS = {
  '数值': { '饱食度': 78, '精神值': 82, '心情值': 45, '整体色情值': 22, '快感值': 0, '性欲值': 20 },
  '主角': {
    '金钱': 1800,
    '持有物': {
      '手机': { '描述': '装有牝多多 App 的智能手机，电量充足', '数量': 1 },
      '学生证': { '描述': '海平大学学生证，可用于校内身份核验', '数量': 1 },
      '通勤卡': { '描述': '海平市公共交通卡，余额 68 元', '数量': 1 },
      '银行卡': { '描述': '父母遗留银行卡，余额不稳定', '数量': 1 },
      '备用钥匙': { '描述': '绿洲景苑小区出租屋钥匙', '数量': 1 },
      '防晒霜': { '描述': '通勤包内的小瓶防晒霜', '数量': 1 },
    },
  },
  '世界': { '当前时间': '2024-09-01 07:30', '当前地点': '北区-绿洲景苑小区', '近期事务': { '牝多多账号': '墨墨' } },
  '日程': { '日期': '2024-09-01', '星期': '周日', '当前任务': { '任务名': '无', '类型': '—', '阶级': '—', '目标': '—', '额外要求': '—', '报酬': 0 } },
  '社交': {
    '联系人': {
      '林澈': { '状态': '已保存', '身份': '学生会主席', '好感度': 55 },
      '周砚': { '状态': '已保存', '身份': '校游泳队副领队', '好感度': 50 },
      '陈屿': { '状态': '已保存', '身份': '校游泳队领队', '好感度': 45 },
    },
  },
  '衣柜': {
    '可选服装': {
      '当前穿着': { '来源': '身上正在穿', '部位标签': ['内衬', '下装'], '说明': '白色蕾丝睡裙' },
      '白色蕾丝睡裙': { '来源': '衣柜', '部位标签': ['内衬', '下装'], '风格标签': ['居家', '睡眠'], '材质标签': ['蕾丝', '氨纶'], '颜色标签': ['白色'], '特质标签': ['遇水透视'], '色情值': 55, '价格': 0, '说明': '薄质半透，长度到大腿中段，触水后湿身贴身' },
      '黑色长款风衣': { '来源': '衣柜', '部位标签': ['外套'], '风格标签': ['日常', '通勤'], '材质标签': ['聚酯纤维'], '颜色标签': ['黑色'], '特质标签': ['防风', '可遮挡'], '色情值': 20, '价格': 480, '说明': '长度及膝，版型偏直筒，可遮挡上半身与腿部轮廓' },
      '棉白T恤': { '来源': '衣柜', '部位标签': ['内衬'], '风格标签': ['日常', '运动'], '材质标签': ['纯棉'], '颜色标签': ['白色'], '特质标签': ['宽松', '透气'], '色情值': 25, '价格': 80, '说明': '圆领短袖 T 恤，版型宽松' },
      '黑色包臀半身裙': { '来源': '衣柜', '部位标签': ['下装'], '风格标签': ['日常', '工作'], '材质标签': ['西装面料'], '颜色标签': ['黑色'], '特质标签': ['修身', '轻微走光风险'], '色情值': 58, '价格': 260, '说明': '高腰包臀裙，裙摆位于膝盖上方约 12 厘米' },
      '黑色蕾丝内衣套装': { '来源': '衣柜', '部位标签': ['内衣'], '风格标签': ['日常', '情趣'], '材质标签': ['蕾丝'], '颜色标签': ['黑色'], '特质标签': ['半透明', '性感'], '色情值': 75, '价格': 180, '说明': '黑色蕾丝内衣套装，可作为内层穿着' },
      '黑色蕾丝内裤': { '来源': '衣柜', '部位标签': ['内裤'], '风格标签': ['日常', '情趣'], '材质标签': ['蕾丝'], '颜色标签': ['黑色'], '特质标签': ['半透明'], '色情值': 70, '价格': 60, '说明': '黑色蕾丝内裤，可作为内层穿着' },
      '运动内衣': { '来源': '衣柜', '部位标签': ['内衣'], '风格标签': ['运动'], '材质标签': ['涤纶'], '颜色标签': ['灰色'], '特质标签': ['透气', '高弹性'], '色情值': 30, '价格': 120, '说明': '运动内衣，适合运动或游泳场景' },
      '裸色高跟凉鞋': { '来源': '衣柜', '部位标签': ['鞋'], '风格标签': ['通勤', '日常'], '材质标签': ['皮革'], '颜色标签': ['裸色'], '特质标签': ['高跟'], '色情值': 35, '价格': 320, '说明': '裸色高跟凉鞋，适合通勤或外出' },
      '白色短袜': { '来源': '衣柜', '部位标签': ['鞋'], '风格标签': ['日常', '运动'], '材质标签': ['纯棉'], '颜色标签': ['白色'], '特质标签': ['透气'], '色情值': 5, '价格': 15, '说明': '白色短袜，适合搭配运动鞋或拖鞋' },
      '黑色通勤包': { '来源': '衣柜', '部位标签': ['包'], '风格标签': ['通勤', '日常'], '材质标签': ['皮革'], '颜色标签': ['黑色'], '特质标签': ['大容量'], '色情值': 5, '价格': 350, '说明': '通勤包，可携带手机、证件和少量随身衣物' },
    },
  },
};

const pDoc = window.parent.document;
let injected = false;
let momoWearList = ['白色蕾丝睡裙'];
let momoWearChanged = [];
let momoWearPutOn = new Set();
let momoWearTakenOff = new Set();
let momoWearInitial = new Set(momoWearList);
let currentContact = null;
let contactChats = {};
let contactInputs = {};
let selectedTaskIndex = -1;
let currentAvailableTasks = null; // 内存中保存的可用任务，不依赖 MVU 变量系统

const LEVEL_NAMES = { 1: '青涩新人', 2: '初级外围', 3: '资深玩物', 4: '知名母狗', 5: '公共便器' };
const LEVEL_EXP = { 1: 150, 2: 1000, 3: 4000, 4: 15000, 5: Infinity };
const COLORS = ['#ff6b9d', '#a2d2ff', '#a2e3c4', '#ffb3c6', '#c084fc', '#e8a0bf', '#7ec8e3', '#ffc107'];
const TAG_ORDER = ['外套', '内衬', '内衣', '下装', '内裤', '腿部', '鞋', '包', '其它'];

function esc(s) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(String(s ?? '')));
  return d.innerHTML;
}

function esc(s) {
  return String(s ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function num(v) {
  const n = v ?? 0;
  return n === Math.floor(n) ? String(n) : n.toFixed(1);
}

function parseTime(data) {
  const t = String(data?.['世界']?.['当前时间'] || '');
  const parts = t.split(' ');
  return { date: parts[0] || '', time: parts[1] || '' };
}

function getWeekDay(dateStr) {
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  if (!dateStr) return '';
  const d = new Date(dateStr.replace(/-/g, '/'));
  return isNaN(d.getTime()) ? '' : weekDays[d.getDay()];
}

let _patchTime = '';
function scanPatchTime() {
  try {
    const st = window.parent.SillyTavern || window.SillyTavern;
    const ctx = st?.getContext?.();
    if (!ctx?.chat) return;
    for (let i = ctx.chat.length - 1; i >= 0; i--) {
      const msg = ctx.chat[i];
      if (msg?.is_user) continue;
      const text = msg?.mes || '';
      const m = text.match(/"path":\s*"\/世界\/当前时间"\s*,\s*"value":\s*"([^"]+)"/);
      if (m) { _patchTime = m[1]; return; }
    }
  } catch (e) {}
}

function getData() {
  scanPatchTime();
  try {
    const v = getVariables({ type: 'message' });
    const sd = v?.stat_data || v?.display_data;
      if (sd && typeof sd === 'object' && Object.keys(sd).length > 0) {
        const r = { ...sd };
        for (const k of Object.keys(DEFAULTS)) {
          if (!(k in r) || r[k] === undefined || r[k] === null) {
            r[k] = typeof DEFAULTS[k] === 'object' && !Array.isArray(DEFAULTS[k]) ? { ...DEFAULTS[k] } : DEFAULTS[k];
          }
        }
        if (_patchTime && r['世界']) r['世界']['当前时间'] = _patchTime;
        return r;
      }
      const cv = getVariables({ type: 'character' });
      if (cv && (cv['数值'] || cv['日程'])) {
        const r = { ...cv };
        for (const k of Object.keys(DEFAULTS)) {
          if (!(k in r) || r[k] === undefined || r[k] === null) {
            r[k] = typeof DEFAULTS[k] === 'object' && !Array.isArray(DEFAULTS[k]) ? { ...DEFAULTS[k] } : DEFAULTS[k];
          }
        }
        if (_patchTime && r['世界']) r['世界']['当前时间'] = _patchTime;
        return r;
      }
    } catch (e) {}
    try {
      const r = {};
      for (const k of Object.keys(DEFAULTS)) {
        if (typeof DEFAULTS[k] === 'object' && !Array.isArray(DEFAULTS[k])) {
          r[k] = { ...DEFAULTS[k] };
        } else {
          r[k] = DEFAULTS[k];
        }
      }
      if (_patchTime && r['世界']) r['世界']['当前时间'] = _patchTime;
      return r;
  } catch (e) {
    return { ...DEFAULTS };
  }
}

function riskClass(level) {
  const m = { '低': 'low', '中': 'mid', '高': 'high' };
  return m[level] || 'low';
}

function statColor(name) {
  const map = {
    '饱食度': '#a2e3c4', '精神值': '#a2d2ff', '心情值': '#ff6b9d',
    '快感值': '#ff6b9d', '色情值': '#c084fc', '性欲值': '#ffb3c6',
    '整体色情值': '#c084fc',
  };
  return map[name] || '#a2d2ff';
}

function label(s) { return s.length === 2 ? s[0] + '  ' + s[1] : s; }

function tagClass(slot) {
  const partTags = ['外套', '内衬', '内衣', '下装', '内裤', '腿部', '鞋', '包', '其它'];
  if (partTags.includes(slot)) return 'msb-tag-part';
  if (['日常', '居家', '睡眠', '运动', '通勤', '工作', '情趣'].includes(slot)) return 'msb-tag-style';
  if (['白色', '黑色', '灰色', '裸色'].includes(slot)) return 'msb-tag-color';
  if (['蕾丝', '氨纶', '聚酯纤维', '纯棉', '西装面料', '涤纶', '皮革'].includes(slot)) return 'msb-tag-material';
  if (['透气', '高弹性', '高跟', '大容量', '遇水透视', '半透明', '性感', '防风', '可遮挡', '修身', '轻微走光风险'].includes(slot)) return 'msb-tag-trait';
  return 'msb-tag-part';
}

function getClothingTags(name) {
  const data = getData();
  const item = data?.['衣柜']?.['可选服装']?.[name];
  if (!item) return [];
  return [
    ...(item['部位标签'] || []),
    ...(item['风格标签'] || []),
    ...(item['材质标签'] || []),
    ...(item['颜色标签'] || []),
    ...(item['特质标签'] || []),
  ];
}

function sortEntries(entries) {
  const items = entries.map(([n]) => {
    const tags = getClothingTags(n);
    const pri = tags.map(t => { const i = TAG_ORDER.indexOf(t); return i >= 0 ? i : 99; });
    return [n, Math.min(...pri), Math.max(...pri)];
  });
  items.sort((a, b) => a[1] - b[1] || a[2] - b[2]);
  return items.map(([n]) => n);
}

function nearLines(currentLocation) {
  const allDots = [
    { name: '海平大学', x: 474, y: 101 },
    { name: '海平中学', x: 365, y: 165 },
    { name: '海平职业技术学院', x: 507, y: 226 },
    { name: '海平小学', x: 231, y: 92 },
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
  const dotMap = {};
  allDots.forEach(d => { dotMap[d.name] = d; });

  const labeledTexts = {
    '海平大学': 'middle,(474,91)',
    '海平中学': 'end,(356,173)',
    '海平职业技术学院': 'start,(520,228)',
    '海平小学': 'start,(195,87)',
    '夜色成人用品店': 'start,(594,356)',
    '海滨梦幻游乐园': 'end,(745,483)',
    '维纳斯情侣酒店': 'end,(622,280)',
    '星海综合购物中心': 'end,(654,425)',
    '水云间洗浴中心': 'start,(651,562)',
    '海平湾公共海滩': 'end,(745,283)',
    '极乐世界娱乐城': 'end,(682,186)',
    '工友平价大排档': 'start,(328,727)',
    '蓝领劳务大市场': 'end,(294,606)',
    '远洋环球物流仓储中心': 'end,(497,591)',
    '海平轻纺制造厂': 'end,(253,701)',
    '远大电子装配厂': 'start,(556,708)',
    '南区综合枢纽建设工地': 'middle,(466,762)',
    '海平市大型体育中心': 'start,(90,353)',
    '绿洲景苑小区': 'end,(227,288)',
    '万家综合超市': 'end,(242,397)',
    '西山半山别墅区': 'end,(109,469)',
    '市政府大楼': 'end,(348,364)',
    '海平中心世纪公园': 'start,(439,329)',
    'CBD跨国金融中心': 'end,(313,433)',
    '海平洲际大酒店': 'start,(359,512)',
    '海平人民医院': 'middle,(488,454)',
  };

  function textPos(name) {
    const raw = labeledTexts[name];
    if (!raw) {
      const d = dotMap[name];
      if (d) return `text-anchor="middle" x="${d.x}" y="${d.y - 12}"`;
      return '';
    }
    const [anchor, coordStr] = raw.split(',(');
    const [tx, ty] = coordStr ? coordStr.replace(')', '').split(',').map(Number) : [0, 0];
    return `text-anchor="${anchor}" x="${tx}" y="${ty}"`;
  }

  function isCurrent(name) {
    return currentLocation && name && currentLocation.includes(name);
  }

  function dotSvg(name) {
    const d = dotMap[name];
    if (!d) return '';
    const cur = isCurrent(name);
    const pulse = cur ? `<circle cx="${d.x}" cy="${d.y}" r="11" class="msb-loc-pulse"/>` : '';
    return `<g class="msb-loc-group" data-loc="${esc(name)}">
    <circle cx="${d.x}" cy="${d.y}" r="5" fill="#666" class="msb-loc-dot${cur ? ' msb-loc-current' : ''}"/>
    ${pulse}
    <text font-size="11" fill="#666" font-weight="500" pointer-events="none" ${textPos(name)}>${esc(name)}</text>
  </g>`;
  }

  const blackPairs = [
    // 北部学区
    ['海平大学', '海平职业技术学院'], ['海平大学', '海平中学'],
    ['海平大学', '海平小学'], ['海平大学', '极乐世界娱乐城'],
    ['海平职业技术学院', '海平中学'], ['海平职业技术学院', '海平中心世纪公园'],
    ['海平职业技术学院', '维纳斯情侣酒店'],
    ['海平中学', '海平小学'], ['海平中学', '绿洲景苑小区'],
    // 东部商业区
    ['星海综合购物中心', '夜色成人用品店'], ['星海综合购物中心', '海滨梦幻游乐园'],
    ['星海综合购物中心', '水云间洗浴中心'], ['星海综合购物中心', '海平湾公共海滩'],
    ['夜色成人用品店', '维纳斯情侣酒店'], ['夜色成人用品店', '海平人民医院'],
    ['维纳斯情侣酒店', '极乐世界娱乐城'],
    ['水云间洗浴中心', '远洋环球物流仓储中心'], ['水云间洗浴中心', '海平人民医院'],
    ['水云间洗浴中心', '海滨梦幻游乐园'],
    ['极乐世界娱乐城', '海平湾公共海滩'],
    // 南部工业区
    ['远洋环球物流仓储中心', '远大电子装配厂'], ['远洋环球物流仓储中心', '工友平价大排档'],
    ['远洋环球物流仓储中心', '南区综合枢纽建设工地'],
    ['远大电子装配厂', '南区综合枢纽建设工地'],
    ['海平轻纺制造厂', '蓝领劳务大市场'], ['海平轻纺制造厂', '工友平价大排档'],
    ['蓝领劳务大市场', '远洋环球物流仓储中心'],
    ['南区综合枢纽建设工地', '工友平价大排档'],
    ['蓝领劳务大市场', '工友平价大排档'], ['蓝领劳务大市场', '海平洲际大酒店'],
    ['工友平价大排档', '海平轻纺制造厂'],
    // 西部住宅区
    ['万家综合超市', '绿洲景苑小区'], ['万家综合超市', '海平市大型体育中心'],
    ['万家综合超市', 'CBD跨国金融中心'], ['万家综合超市', '西山半山别墅区'],
    ['海平市大型体育中心', '绿洲景苑小区'],
    ['海平市大型体育中心', '西山半山别墅区'],
    ['绿洲景苑小区', '海平小学'], ['绿洲景苑小区', '市政府大楼'],
    // 市中心
    ['市政府大楼', '海平中心世纪公园'], ['市政府大楼', '海平洲际大酒店'],
    ['市政府大楼', '海平人民医院'], ['市政府大楼', 'CBD跨国金融中心'],
    ['海平中心世纪公园', '海平人民医院'],
    ['CBD跨国金融中心', '海平洲际大酒店'],
    ['海平洲际大酒店', '海平人民医院'],
  ];

  function line(a, b, extra) {
    const da = dotMap[a], db = dotMap[b];
    if (!da || !db) return '';
    return `<line x1="${da.x}" y1="${da.y}" x2="${db.x}" y2="${db.y}" stroke="rgba(0,0,0,0.001)" stroke-width="4"/><line x1="${da.x}" y1="${da.y}" x2="${db.x}" y2="${db.y}" ${extra}/>`;
  }

  function altLine(x1, y1, x2, y2, colors, cls) {
    const dx = x2 - x1, dy = y2 - y1;
    const n = 2 * colors.length;
    let out = '';
    for (let i = 0; i < n; i++) {
      const t0 = i / n, t1 = (i + 1) / n;
      const c = colors[i % colors.length];
      out += `<line x1="${x1 + dx * t0}" y1="${y1 + dy * t0}" x2="${x1 + dx * t1}" y2="${y1 + dy * t1}" stroke="${c}" stroke-width="2"${cls ? ` class="${cls}"` : ''}/>`;
    }
    return out;
  }

  const blackSet = new Set();
  blackPairs.forEach(([a, b]) => blackSet.add([a, b].sort().join('↔')));

  const G1 = ['海平大学', '极乐世界娱乐城', '海平湾公共海滩', '海滨梦幻游乐园', '水云间洗浴中心', '远大电子装配厂', '工友平价大排档', '海平轻纺制造厂', '西山半山别墅区', '海平市大型体育中心', '海平小学', '海平大学'];
  const G2 = ['海平大学', '海平中心世纪公园', '海平洲际大酒店', '蓝领劳务大市场', '南区综合枢纽建设工地'];
  const G3 = ['西山半山别墅区', '万家综合超市', 'CBD跨国金融中心', '海平人民医院', '星海综合购物中心', '海平湾公共海滩'];

  const R1 = ['海平小学', '海平中学', '海平职业技术学院', '维纳斯情侣酒店', '夜色成人用品店', '星海综合购物中心', '水云间洗浴中心', '海滨梦幻游乐园', '海平湾公共海滩', '极乐世界娱乐城', '海平大学', '海平小学'];
  const R2 = ['极乐世界娱乐城', '海平湾公共海滩', '海滨梦幻游乐园', '水云间洗浴中心', '远大电子装配厂', '南区综合枢纽建设工地', '工友平价大排档', '海平轻纺制造厂', '蓝领劳务大市场', '远洋环球物流仓储中心', '星海综合购物中心', '夜色成人用品店', '维纳斯情侣酒店', '极乐世界娱乐城'];
  const R3 = ['远大电子装配厂', '南区综合枢纽建设工地', '工友平价大排档', '海平轻纺制造厂', '西山半山别墅区', '海平市大型体育中心', '绿洲景苑小区', '万家综合超市', '蓝领劳务大市场', '远洋环球物流仓储中心', '远大电子装配厂'];
  const R4 = ['西山半山别墅区', '海平市大型体育中心', '海平小学', '海平大学', '海平职业技术学院', '海平中学', '绿洲景苑小区', '万家综合超市', '西山半山别墅区'];

  const greenSegs = {};
  [G1, G2, G3].forEach((verts, gi) => {
    for (let i = 0; i < verts.length - 1; i++) {
      const a = verts[i], b = verts[i + 1];
      const key = [a, b].sort().join('↔');
      if (!greenSegs[key]) greenSegs[key] = [];
      greenSegs[key].push('g' + (gi + 1));
    }
  });

  const redSegs = {};
  [R1, R2, R3, R4].forEach((verts, ri) => {
    for (let i = 0; i < verts.length - 1; i++) {
      const a = verts[i], b = verts[i + 1];
      const key = [a, b].sort().join('↔');
      if (!redSegs[key]) redSegs[key] = [];
      redSegs[key].push('r' + (ri + 1));
    }
  });

  const segKey = (a, b) => [a, b].sort().join('↔');

  function routeCenter(verts, axis) {
    let sum = 0, cnt = 0;
    verts.forEach(v => { const d = dotMap[v]; if (d) { sum += axis === 'x' ? d.x : d.y; cnt++; } });
    return sum / cnt;
  }

  const centerX = {}, centerY = {};
  [['g1', G1], ['g2', G2], ['g3', G3], ['r1', R1], ['r2', R2], ['r3', R3], ['r4', R4]].forEach(([id, verts]) => {
    centerX[id] = routeCenter(verts, 'x');
    centerY[id] = routeCenter(verts, 'y');
  });

  function routeSegmentColors(key) {
    const onBlack = blackSet.has(key);
    const onGreen = !!greenSegs[key];
    const onRed = !!redSegs[key];
    if (onBlack && onGreen && onRed) return ['rgba(0,0,0,0.7)', '#00FF33', '#FF3333'];
    if (onBlack && onGreen) return ['rgba(0,0,0,0.7)', '#00FF33'];
    if (onBlack && onRed) return ['rgba(0,0,0,0.7)', '#FF3333'];
    if (onGreen && onRed) return ['#00FF33', '#FF3333'];
    return null;
  }

  const routeGroups = { g1: '', g2: '', g3: '', r1: '', r2: '', r3: '', r4: '' };
  const overlayGroups = { g1: '', g2: '', g3: '', r1: '', r2: '', r3: '', r4: '' };
  let blackHtml = '';

  function overlayLine(r, a, b) {
    const da = dotMap[a], db = dotMap[b];
    if (!da || !db) return;
    overlayGroups[r] += `<line x1="${da.x}" y1="${da.y}" x2="${db.x}" y2="${db.y}" stroke="${r.startsWith('g') ? '#00FF33' : '#FF3333'}" stroke-width="4" opacity="0" class="overlay" pointer-events="none"/>`;
  }

  function addSplit(key, a, b, colors) {
    const da = dotMap[a], db = dotMap[b];
    if (!da || !db) return;
    const dx = db.x - da.x, dy = db.y - da.y;
    const n = 2 * colors.length;
    const useX = Math.abs(dx) >= Math.abs(dy);
    let greenRoutes = [...(greenSegs[key] || [])];
    let redRoutes = [...(redSegs[key] || [])];
    const center = useX ? centerX : centerY;
    const axisVal = useX ? da.x : da.y;
    const axisValB = useX ? db.x : db.y;
    greenRoutes.sort((x, y) => center[x] - center[y]);
    redRoutes.sort((x, y) => center[x] - center[y]);
    if (axisVal > axisValB) {
      redRoutes.reverse();
      greenRoutes.reverse();
    }

    const blackSubs = [], greenSubs = [], redSubs = [];
    for (let i = 0; i < n; i++) {
      const t0 = i / n, t1 = (i + 1) / n;
      const c = colors[i % colors.length];
      const l = `<line x1="${da.x + dx * t0}" y1="${da.y + dy * t0}" x2="${da.x + dx * t1}" y2="${da.y + dy * t1}" stroke="rgba(0,0,0,0.001)" stroke-width="4"/><line x1="${da.x + dx * t0}" y1="${da.y + dy * t0}" x2="${da.x + dx * t1}" y2="${da.y + dy * t1}" stroke="${c}" stroke-width="2"/>`;
      if (c === 'rgba(0,0,0,0.7)') blackSubs.push(l);
      else if (c === '#00FF33') greenSubs.push(l);
      else if (c === '#FF3333') redSubs.push(l);
    }
    blackSubs.forEach(l => blackHtml += l);
    greenSubs.forEach((l, i) => routeGroups[greenRoutes[i % greenRoutes.length]] += l);
    redSubs.forEach((l, i) => routeGroups[redRoutes[i % redRoutes.length]] += l);
    greenRoutes.forEach(r => overlayLine(r, a, b));
    redRoutes.forEach(r => overlayLine(r, a, b));
  }

  Object.keys(greenSegs).forEach(key => {
    const [a, b] = key.split('↔');
    const colors = routeSegmentColors(key);
    if (colors) {
      addSplit(key, a, b, colors);
    } else if (greenSegs[key].length > 1) {
      addSplit(key, a, b, ['#00FF33']);
    } else {
      greenSegs[key].forEach(r => {
        routeGroups[r] += line(a, b, 'stroke="#00FF33" stroke-width="2"');
        overlayLine(r, a, b);
      });
    }
  });

  Object.keys(redSegs).forEach(key => {
    const [a, b] = key.split('↔');
    const colors = routeSegmentColors(key);
    if (colors && colors.length >= 2 && colors.some(c => c === '#FF3333')) {
      if (!greenSegs[key]) addSplit(key, a, b, colors);
    } else if (redSegs[key].length > 1) {
      addSplit(key, a, b, ['#FF3333']);
    } else {
      redSegs[key].forEach(r => {
        routeGroups[r] += line(a, b, 'stroke="#FF3333" stroke-width="2"');
        overlayLine(r, a, b);
      });
    }
  });

  blackPairs.forEach(([a, b]) => {
    const key = segKey(a, b);
    if (!greenSegs[key] && !redSegs[key]) {
      blackHtml += line(a, b, 'stroke="rgba(0,0,0,0.7)" stroke-width="2"');
    }
  });

  let gHtml = `<g class="sub-segments">${['g1','g2','g3'].map(r => `<g class="route-${r}">${routeGroups[r]}</g>`).join('')}</g>`;
  let rHtml = `<g class="sub-segments">${['r1','r2','r3','r4'].map(r => `<g class="route-${r}">${routeGroups[r]}</g>`).join('')}</g>`;
  let overlayHtml = `<g class="overlay-strip">${['g1','g2','g3','r1','r2','r3','r4'].map(r => `<g class="route-${r}">${overlayGroups[r]}</g>`).join('')}</g>`;

  const outerPoints = allDots.slice(0, 21);
  const centerPoints = allDots.slice(21);
  let dotsHtml = '';
  outerPoints.forEach(d => { dotsHtml += dotSvg(d.name) + '\n    '; });
  centerPoints.forEach(d => { dotsHtml += dotSvg(d.name) + '\n    '; });

  return `
    ${blackHtml}
    <g class="route-system">
      ${gHtml}
      ${rHtml}
      ${overlayHtml}
    </g>
    ${dotsHtml}`;
}

function renderMapPanel(data) {
  const loc = data?.['世界']?.['当前地点'] || '';
  const currentName = ['绿洲景苑小区', '海平大学', '海平中学', '海平职业技术学院', '海平小学',
    '夜色成人用品店', '海滨梦幻游乐园', '维纳斯情侣酒店', '星海综合购物中心', '水云间洗浴中心',
    '海平湾公共海滩', '极乐世界娱乐城', '工友平价大排档', '蓝领劳务大市场', '远洋环球物流仓储中心',
    '海平轻纺制造厂', '远大电子装配厂', '南区综合枢纽建设工地', '海平市大型体育中心',
    '万家综合超市', '西山半山别墅区', '市政府大楼', '海平中心世纪公园', 'CBD跨国金融中心',
    '海平洲际大酒店', '海平人民医院'].find(n => loc.includes(n)) || '';

  return `
<div class="msb-map-container">
  <div class="msb-map-canvas">
    <svg viewBox="0 0 800 800" style="width:800px;height:800px">
      <defs>
        <clipPath id="sector-clip"><circle cx="400" cy="400" r="400"/></clipPath>
        <clipPath id="ring-clip">
          <circle cx="400" cy="400" r="400"/>
          <circle cx="400" cy="400" r="150" fill="white"/>
        </clipPath>
      </defs>
      <rect x="0" y="0" width="800" height="800" fill="#f8f8f8"/>
      <g clip-path="url(#sector-clip)">
        <path d="M400,400 L117.2,117.2 A400,400 0 0,1 682.8,117.2 Z" fill="#FF1744" fill-opacity="0.08"/>
        <path d="M400,400 L682.8,117.2 A400,400 0 0,1 682.8,682.8 Z" fill="#FF9100" fill-opacity="0.08"/>
        <path d="M400,400 L682.8,682.8 A400,400 0 0,1 117.2,682.8 Z" fill="#00C853" fill-opacity="0.08"/>
        <path d="M400,400 L117.2,682.8 A400,400 0 0,1 117.2,117.2 Z" fill="#304FFE" fill-opacity="0.08"/>
        <line x1="0" y1="0" x2="800" y2="800" stroke="#ddd" stroke-width="0.5"/>
        <line x1="0" y1="800" x2="800" y2="0" stroke="#ddd" stroke-width="0.5"/>
      </g>
      <circle cx="400" cy="400" r="400" fill="none" stroke="#ccc" stroke-width="1"/>
      <circle cx="400" cy="400" r="150" fill="white" stroke="#E0E0E0" stroke-width="1"/>
      <circle cx="400" cy="400" r="150" fill="#F5C518" fill-opacity="0.12"/>
      <g clip-path="url(#sector-clip)">
        ${nearLines(currentName)}
      </g>
      <g transform="translate(16,16)">
        <rect x="0" y="0" width="92" height="68" rx="6" fill="white" fill-opacity="0.9" stroke="#ccc" stroke-width="0.5"/>
        <line x1="8" y1="16" x2="28" y2="16" stroke="rgba(0,0,0,0.7)" stroke-width="2"/>
        <text x="34" y="19" font-size="9" fill="#666">道路</text>
        <line x1="8" y1="34" x2="28" y2="34" stroke="#00FF33" stroke-width="2"/>
        <text x="34" y="37" font-size="9" fill="#666">地铁</text>
        <line x1="8" y1="52" x2="28" y2="52" stroke="#FF3333" stroke-width="2"/>
        <text x="34" y="55" font-size="9" fill="#666">公交</text>
      </g>
    </svg>
  </div>
</div>`;
}

function injectStyles() {
  if (pDoc.querySelector('#momo-status-bar-style')) return;
  const style = pDoc.createElement('style');
  style.id = 'momo-status-bar-style';
  style.textContent = STYLE;
  pDoc.head.appendChild(style);
}

function renderHeader(data) {
  const { date, time } = parseTime(data);
  return `
<div class="msb-header">
  <div class="msb-header-left">
    <div class="msb-avatar">墨</div>
    <div>
      <div class="msb-title">墨墨露出 · 牝多多</div>
      <div class="msb-subtitle">${esc(data?.['世界']?.['当前地点'] || '')} · ${esc(time)}</div>
    </div>
  </div>
</div>`;
}

function renderStatsPanel(data) {
  const { date, time } = parseTime(data);
  const wd = data?.['日程']?.['星期'] || getWeekDay(data?.['日程']?.['日期']);
  const bars = [
    ['饱食度', num(data?.['数值']?.['饱食度'])],
    ['精神值', num(data?.['数值']?.['精神值'])],
    ['心情值', num(data?.['数值']?.['心情值'])],
    ['色情值', num(data?.['数值']?.['整体色情值'])],
    ['性欲值', num(data?.['数值']?.['性欲值'])],
    ['快感值', num(data?.['数值']?.['快感值'])],
  ];
  return `
<div class="msb-row">
  <span class="msb-label">${label('日期')}</span>
  <span class="msb-value">${esc(date)} ${esc(wd)}</span>
</div>
<div class="msb-row">
  <span class="msb-label">${label('时间')}</span>
  <span class="msb-value">${esc(time)}</span>
</div>
<div class="msb-row">
  <span class="msb-label">${label('地点')}</span>
  <span class="msb-value">${esc(data?.['世界']?.['当前地点'] || '')}</span>
</div>
<div class="msb-row">
  <span class="msb-label">${label('金钱')}</span>
  <span class="msb-value money">${num(data?.['主角']?.['金钱'])}元</span>
</div>
<div>
  ${bars.map(([name, val]) => `
    <div class="msb-stat${name === '色情值' ? ' msb-stat-erotic' : ''}"${name === '色情值' ? ' data-stat="erotic"' : ''}>
      <div class="msb-stat-header">
        <span class="msb-stat-name">${esc(name)}</span>
        <span class="msb-stat-val">${val}%</span>
      </div>
      <div class="msb-stat-track">
        <div class="msb-stat-fill" style="width:${val}%;background:${statColor(name)}"></div>
      </div>
    </div>`).join('')}
</div>
<div class="msb-npc-section">
  <div class="msb-npc-header" onclick="const d=this.nextElementSibling;d.style.display=d.style.display==='none'?'block':'none'">
    <span class="msb-label">👥 周围NPC</span>
    <span class="msb-value">${(() => { const n = data?.['场景']?.['近期NPC']; return n && n.length ? n.length + '人' : '0人'; })()}</span>
    <span class="msb-npc-toggle" style="margin-left:auto;font-size:10px;color:#787890">展开</span>
  </div>
  <div class="msb-npc-detail" style="display:none">
    ${(() => {
      const npcs = data?.['NPC'] || {};
      const recent = data?.['场景']?.['近期NPC'] || [];
      if (recent.length === 0) return '<div class="msb-npc-empty">附近没有其他NPC</div>';
      return recent.map(name => {
        const info = npcs[name];
        if (!info) return '';
        const personality = info['性格'] || '';
        const status = info['备注'] || info['关系'] || '';
        return `<div class="msb-npc-card">
          <div class="msb-npc-card-row"><span class="msb-npc-name">${esc(name)}</span><span class="msb-npc-personality">${esc(personality)}</span></div>
          <div class="msb-npc-status">${esc(status)}</div>
        </div>`;
      }).join('');
    })()}
  </div>
</div>`;
}

function renderAppPanel(data) {
  // 渲染时自动检测未捕获的任务
  const curTaskName = data?.['日程']?.['当前任务']?.['任务名'];
  if (!currentAvailableTasks && (!curTaskName || curTaskName === '无')) {
    try {
      const st = window.parent.SillyTavern || window.SillyTavern;
      const ctx = st?.getContext?.();
      if (ctx?.chat) {
        for (let i = ctx.chat.length - 1; i >= 0; i--) {
          const msg = ctx.chat[i];
          if (!msg || msg.is_user) continue;
          const txt = msg.mes || '';
          if (txt.includes('【任务类型】') || txt.includes('【牝多多｜任务】')) {
            const parsed = parseTaskBlocks(txt);
            if (parsed.length > 0) {
              currentAvailableTasks = parsed;
              selectedTaskIndex = -1;
              break;
            }
          }
        }
      }
    } catch (e) {}
  }
  const lv = num(data?.['日程']?.['牝多多等级']);
  const exp = num(data?.['日程']?.['牝多多经验']);
  const expMax = LEVEL_EXP[lv] || 150;
  const expPct = Math.min(100, Math.round((exp / expMax) * 100));
  const lvName = LEVEL_NAMES[lv] || '';
  // 优先使用内存中的可用任务（由 MESSAGE_RECEIVED 解析设置）
  const availableTasks = currentAvailableTasks || data?.['日程']?.['可用任务'];
  const hasAvailable = Array.isArray(availableTasks) && availableTasks.length > 0;
  const task = data?.['日程']?.['当前任务'];
  const hasTask = !hasAvailable && task?.['任务名'] && task['任务名'] !== '无';

  let taskHtml = '';

  if (hasAvailable) {
    taskHtml = `
  <div class="msb-app-card-title" style="margin-top:8px;color:#ffb3c6">📋 可选任务（请选择一个）</div>
  <div class="msb-task-list">
    ${availableTasks.map((t, i) => {
      const gradeText = t['阶级'] || '';
      const gradeColor = '#ffb3c6';
      const baseReward = num(t['报酬']);
      // Parse extra reward from 额外要求 text like "+50元" or "额外+15元"
      const extraMatch = (t['额外要求'] || '').match(/[+＋](\d+)/);
      const extraReward = extraMatch ? Number(extraMatch[1]) : 0;
      const hasExtra = t['额外要求'] && t['额外要求'] !== '无';
      // If no explicit extra amount, estimate from rule (30%-50% of base)
      const estimatedExtra = extraReward > 0 ? extraReward : Math.round(baseReward * 0.3);
      const estimatedTotal = baseReward + estimatedExtra;
      return `
    <div class="msb-task-card msb-task-option${i === selectedTaskIndex ? ' msb-task-selected' : ''}" data-task-idx="${i}">
      <div class="msb-task-option-header">
        <span class="msb-task-option-name">${esc(t['任务名'] || '')}</span>
      </div>
      <div class="msb-task-row"><span class="msb-task-label">等级</span><span class="msb-task-value" style="color:${gradeColor}">${esc(gradeText)}</span></div>
      <div class="msb-task-row"><span class="msb-task-label">类型</span><span class="msb-task-value">${esc(t['类型'] || '')}</span></div>
      <div class="msb-task-row"><span class="msb-task-label">要求</span><span class="msb-task-value">${esc(t['目标'] || '')}</span></div>
      ${t['额外要求'] && t['额外要求'] !== '无' ? `<div class="msb-task-row"><span class="msb-task-label">额外要求</span><span class="msb-task-value">${esc(t['额外要求'])}</span></div>` : '<div class="msb-task-row"><span class="msb-task-label">额外要求</span><span class="msb-task-value" style="color:#787890">无</span></div>'}
      <div class="msb-task-row"><span class="msb-task-label">报酬</span><span class="msb-task-value" style="color:#a2e3c4;font-weight:600">${baseReward}元${hasExtra ? `<span style="color:#9a9ab0;font-weight:400;font-size:11px">（完成额外+${estimatedExtra}元≈${estimatedTotal}元）</span>` : ''}</span></div>
    </div>`;
    }).join('')}
  </div>
  <button class="msb-task-confirm-btn"${selectedTaskIndex < 0 ? ' disabled' : ''}>确认接取任务</button>`;
  } else if (hasTask) {
    taskHtml = `
  <div class="msb-app-card-title" style="margin-top:8px;color:#a2d2ff">📋 当前任务</div>
  <div class="msb-task-card">
    <div class="msb-task-row"><span class="msb-task-label">任务类型</span><span class="msb-task-value">${esc(task['类型'] || '')}</span></div>
    <div class="msb-task-row"><span class="msb-task-label">任务阶级</span><span class="msb-task-value">${esc(task['阶级'] || '')}</span></div>
    <div class="msb-task-row"><span class="msb-task-label">任务要求</span><span class="msb-task-value">${esc(task['目标'] || '')}</span></div>
    <div class="msb-task-row"><span class="msb-task-label">额外要求</span><span class="msb-task-value">${esc(task['额外要求'] || '')}</span></div>
    <div class="msb-task-row"><span class="msb-task-label">任务报酬</span><span class="msb-task-value" style="color:#a2e3c4;font-weight:600">${num(task['报酬'])}元</span></div>
    ${task['完成'] ? '<div class="msb-task-row"><span class="msb-task-label">状态</span><span class="msb-task-value" style="color:#a2e3c4">✅ 已完成</span></div>' : ''}
  </div>`;
  } else {
    taskHtml = `
  <div style="text-align:center;padding:12px 0;color:#5a5a70;font-size:13px">
    <div style="font-size:24px;margin-bottom:4px">📥</div>
    暂无任务
  </div>`;
  }

  return `
<div class="msb-app-card">
  <div class="msb-app-card-title">✦ 牝多多</div>
  <div class="msb-row"><span class="msb-label">用户名</span><span class="msb-value">墨墨</span></div>
  <div class="msb-row"><span class="msb-label">等级</span><span class="msb-value">Lv.${lv} ${esc(lvName)}</span></div>
  <div class="msb-exp-bar">
    <span style="font-size:11px;color:#9a9ab0;min-width:32px">EXP</span>
    <div class="msb-exp-track"><div class="msb-exp-fill" style="width:${expPct}%"></div></div>
    <span class="msb-exp-text">${exp}/${expMax}</span>
  </div>
  ${taskHtml}
</div>`;
}

function renderContactsPanel(data) {
  const contacts = data?.['社交']?.['联系人'] || {};
  const entries = Object.entries(contacts);
  const listHtml = entries.map(([name, info], i) => {
    const color = COLORS[i % COLORS.length];
    return `<div class="msb-contact-item" data-contact="${esc(name)}" data-likes="${num(info?.['好感度'])}">
      <div class="msb-ci-avatar" style="background:${color}">${esc(name.charAt(0))}</div>
      <span class="msb-ci-name">${esc(name)}</span>
      <span class="msb-ci-fav">❤${num(info?.['好感度'])}</span>
    </div>`;
  }).join('');

  const hasContact = currentContact && entries.some(([k]) => k === currentContact);
  const savedVal = hasContact ? (contactInputs[currentContact] || '') : '';
  const inputDisabled = hasContact ? '' : ' disabled';
  const sendDisabled = hasContact ? '' : ' disabled';

  return `
<div class="msb-contacts-panel">
  <div class="msb-contact-list">${listHtml}</div>
  <div class="msb-chat-area">
    <div class="msb-chat-header">${hasContact ? ('💫 ' + esc(currentContact)) : '💫 选择一个联系人'}</div>
    ${hasContact ? '<div class="msb-chat-msgs">' + renderContactArea(currentContact) + '</div>' : '<div class="msb-chat-placeholder">点击左侧联系人开始聊天</div>'}
    <div class="msb-chat-input"><input type="text" placeholder="输入消息..."${inputDisabled} value="${esc(savedVal)}"><button${sendDisabled}>发送</button></div>
  </div>
</div>`;
}

function isAI(el) {
  const mes = el.closest('.mes, [mesid]');
  if (!mes) return false;
  try {
    const st = (window.parent.SillyTavern || window.SillyTavern);
    const ctx = st?.getContext?.();
    const id = mes.getAttribute('mesid');
    if (id) {
      const msg = ctx?.chat?.[parseInt(id)];
      if (msg) return !msg.is_user;
    }
    const nameEl = mes.querySelector('.ch_name, .ch_name_text, .name_text');
    const name = nameEl?.textContent?.trim() || '';
    const charName = ctx?.characterQuery?.name || ctx?.character?.name || '';
    if (name && charName && name.includes(charName)) return true;
    return false;
  } catch (e) { return true; }
}

function renderContactArea(contactName) {
  const data = getData();
  const ts = parseTime(data).time || '00:00';
  const chat = contactChats[contactName] || { sent: [], received: [] };
  const allMsgs = [];
  const maxLen = Math.max(chat.sent.length, chat.received.length);
  for (let i = 0; i < maxLen; i++) {
    if (chat.received[i]) {
      allMsgs.push(`<div class="msb-msg received"><div>${esc(chat.received[i])}</div><div class="msb-msg-time">${ts}</div></div>`);
    }
    if (chat.sent[i]) {
      allMsgs.push(`<div class="msb-msg sent"><div>${esc(chat.sent[i])}</div><div class="msb-msg-time">${ts}</div></div>`);
    }
  }
  return allMsgs.join('\n');
}

function rebuildWearChanged() {
  momoWearChanged = [];
  for (const name of momoWearTakenOff) {
    momoWearChanged.push('脱掉' + name);
  }
  for (const name of momoWearPutOn) {
    momoWearChanged.push('穿上' + name);
  }
}

function resetClosetState() {
  momoWearChanged = [];
  momoWearPutOn = new Set();
  momoWearTakenOff = new Set();
  momoWearInitial = new Set(momoWearList);
}

function renderClosetPanel(data) {
  const allClothing = data?.['衣柜']?.['可选服装'] || {};
  const entries = Object.entries(allClothing).filter(([n]) => n !== '当前穿着');
  const sorted = sortEntries(entries);

  function renderCard(name, item, isOn) {
    const posTags = (item['部位标签'] || []).map(t => `<span class="msb-closet-tag ${tagClass(t)}">${esc(t)}</span>`).join('');
    const styleTags = (item['风格标签'] || []).map(t => `<span class="msb-closet-tag ${tagClass(t)}">${esc(t)}</span>`).join('');
    const colorTags = (item['颜色标签'] || []).map(t => `<span class="msb-closet-tag ${tagClass(t)}">${esc(t)}</span>`).join('');
    const materialTags = (item['材质标签'] || []).map(t => `<span class="msb-closet-tag ${tagClass(t)}">${esc(t)}</span>`).join('');
    const traitTags = (item['特质标签'] || []).map(t => `<span class="msb-closet-tag ${tagClass(t)}">${esc(t)}</span>`).join('');
    const eroticVal = item['色情值'] || 0;
    const price = item['价格'] || 0;
    const desc = item['说明'] || '';

    const cardClass = momoWearPutOn.has(name) ? 'msb-closet-card msb-closet-on' : (momoWearTakenOff.has(name) && momoWearInitial.has(name) ? 'msb-closet-card msb-closet-off' : 'msb-closet-card');
    const btnAction = isOn ? 'remove' : 'wear';
    const btnText = isOn ? '脱下' : '穿上';

    return `<div class="${cardClass}" data-closet-name="${esc(name)}">
      <div class="msb-closet-card-row">
        <span class="msb-closet-card-name">${esc(name)}</span>
        <button class="msb-closet-toggle" data-action="${btnAction}">${btnText}</button>
        <button class="msb-closet-detail-btn" data-expanded="false">展开详细</button>
      </div>
      <div class="msb-closet-card-tags">${posTags}${styleTags}${colorTags}<span class="msb-closet-tag msb-tag-erotic">色情:${eroticVal}</span></div>
      <div class="msb-closet-card-detail" style="display:none">
        <div class="msb-closet-extra-tags">${materialTags}${traitTags}<span class="msb-closet-tag msb-tag-price">${price}元</span></div>
        <div class="msb-closet-detail-desc">${esc(desc)}</div>
      </div>
    </div>`;
  }

  const wearing = sorted.filter(n => momoWearList.includes(n));
  const available = sorted.filter(n => !momoWearList.includes(n));
  const hasChanges = momoWearChanged.length > 0;

  const wearingHtml = wearing.map(n => renderCard(n, allClothing[n], true)).join('');
  const availableHtml = available.filter(n => allClothing[n]).map(n => renderCard(n, allClothing[n], false)).join('');

  const allEroticVals = wearing.map(n => allClothing[n]?.['色情值'] || 0);
  const avgErotic = allEroticVals.length > 0 ? Math.round(allEroticVals.reduce((a, b) => a + b, 0) / allEroticVals.length) : 0;

  const styleCount = {};
  wearing.forEach(n => {
    const item = allClothing[n];
    if (!item) return;
    (item['风格标签'] || []).forEach(t => { styleCount[t] = (styleCount[t] || 0) + 1; });
  });
  const styleTagsHtml = Object.entries(styleCount)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => `<span class="msb-style-tag">${esc(tag)}<span class="msb-style-count">x${count}</span></span>`)
    .join('');

  const coveredSlots = new Set();
  wearing.forEach(n => {
    const item = allClothing[n];
    if (!item) return;
    (item['部位标签'] || []).forEach(t => coveredSlots.add(t));
  });
  const upperBody = ['外套', '内衬', '内衣'];
  const lowerBody = ['下装', '内裤', '腿部'];
  const upperExposed = !upperBody.some(s => coveredSlots.has(s));
  const lowerExposed = !lowerBody.some(s => coveredSlots.has(s));

  return `
<div class="msb-closet-columns">
  <div class="msb-closet-col">
    <div class="msb-closet-col-title">👗 穿着中</div>
    ${wearingHtml || '<div class="msb-closet-empty">未穿着任何衣服</div>'}
  </div>
  <div class="msb-closet-col">
    <div class="msb-closet-col-title">🧺 衣柜</div>
    ${availableHtml || '<div class="msb-closet-empty">衣柜为空</div>'}
  </div>
</div>
<div class="msb-closet-info-row">
  <div class="msb-closet-erotic-bar">
    <span class="msb-closet-erotic-label">👙 色情值</span>
    <span class="msb-closet-erotic-val">${avgErotic}</span>
  </div>
  <div class="msb-closet-style-bar">
    <span class="msb-style-tags">${styleTagsHtml}</span>
  </div>
</div>
<div class="msb-closet-warning"${upperExposed || lowerExposed ? '' : ' style="display:none"'}">
  ${upperExposed ? '<div class="msb-warning-item">⚠️ 上半身关键部位无遮挡</div>' : ''}
  ${lowerExposed ? '<div class="msb-warning-item">⚠️ 下半身关键部位无遮挡</div>' : ''}
</div>
<button class="msb-closet-send"${!hasChanges ? ' disabled' : ''}>确认换装</button>`;
}



function buildStatusBar(data) {
  if (!data) data = getData();
  return `
<div id="momo-status-bar">
  ${renderHeader(data)}
  <div class="msb-tabs">
    <div class="msb-tab active" data-tab="stats"><span class="msb-tab-icon">📊</span>状态</div>
    <div class="msb-tab" data-tab="app"><span class="msb-tab-icon">❤️</span>牝多多</div>
    <div class="msb-tab" data-tab="contacts"><span class="msb-tab-icon">💬</span>联系人</div>
    <div class="msb-tab" data-tab="closet"><span class="msb-tab-icon">👗</span>服装</div>
    <div class="msb-tab" data-tab="map"><span class="msb-tab-icon">🗺️</span>地图</div>
  </div>
  <div class="msb-panel stats active">${renderStatsPanel(data)}</div>
  <div class="msb-panel app">${renderAppPanel(data)}</div>
  <div class="msb-panel contacts">${renderContactsPanel(data)}</div>
  <div class="msb-panel closet">${renderClosetPanel(data)}</div>
  <div class="msb-panel map">${renderMapPanel(data)}</div>
</div>`;
}

function attachTabHandlers(container) {
  container.querySelectorAll('.msb-tab').forEach(tab => {
    tab.removeEventListener('click', handleTabClick);
    tab.addEventListener('click', handleTabClick);
  });
}

function handleTabClick(e) {
  const tab = e.currentTarget;
  const bar = tab.closest('#momo-status-bar');
  if (!bar) return;
  const target = tab.dataset.tab;
  bar.querySelectorAll('.msb-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  bar.querySelectorAll('.msb-panel').forEach(p => p.classList.remove('active'));
  const panel = bar.querySelector(`.msb-panel.${target}`);
  if (panel) panel.classList.add('active');
  if (target === 'contacts') {
    const selected = bar.querySelector('.msb-contact-item.selected');
    if (!selected) {
      const first = bar.querySelector('.msb-contact-item');
      if (first) first.click();
    }
  }
}

function foldVariableUpdates() {
  // Bypass tavern regex bug: fold <UpdateVariable> content directly in the DOM
  pDoc.querySelectorAll('.mes_text').forEach(el => {
    if (el.querySelector('.momo-var-folded')) return;
    const html = el.innerHTML;
    const match = html.match(/<update(?:variable)?>([\s\S]*?)<\/update(?:variable)?>/i);
    if (!match) return;
    const folded = `<details class="momo-var-folded" style="margin:4px 0;cursor:pointer">
      <summary style="color:#9a9ab0;font-size:12px;font-weight:500">📋 变量更新情况</summary>
      <div style="padding:6px 8px;font-size:12px;color:#c8c6d0;background:rgba(0,0,0,0.15);border-radius:6px;margin-top:4px;line-height:1.6;white-space:pre-wrap">${match[1].trim()}</div>
    </details>`;
    el.innerHTML = html.replace(/<update(?:variable)?>[\s\S]*?<\/update(?:variable)?>/i, folded);
  });
}

function injectStatusBar() {
  const mesTexts = pDoc.querySelectorAll('.mes_text');
  let targetParent = null;
  if (mesTexts.length > 0) {
    targetParent = mesTexts[mesTexts.length - 1].parentElement;
    // 清理不在 targetParent 中的旧状态栏
    pDoc.querySelectorAll('#momo-status-bar').forEach(bar => {
      if (!targetParent?.contains(bar)) {
        bar.closest('.momo-status-bar-container')?.remove();
      }
    });
  }

  // 在 targetParent 中查找或创建容器
  let container = targetParent?.querySelector('.momo-status-bar-container');
  if (!container) {
    container = pDoc.createElement('div');
    container.className = 'momo-status-bar-container';
    if (targetParent) {
      targetParent.appendChild(container);
    } else {
      const lastMesBlock = pDoc.querySelector('.mes_block:last-child');
      if (!lastMesBlock) return;
      lastMesBlock.appendChild(container);
    }
  }

  if (container.querySelector('#momo-status-bar')) return;

  const data = getData();
  try {
    container.innerHTML = buildStatusBar(data);
  } catch (e) {
    window.parent.__momoError = { msg: e.message, stack: e.stack?.substring(0, 1000) };
    try {
      container.innerHTML = `<div id="momo-status-bar"><div class="msb-header"><div class="msb-header-left"><div class="msb-avatar">墨</div><div><div class="msb-title">墨墨露出 · 牝多多</div></div></div></div></div>`;
    } catch(e2) {}
  }
  attachTabHandlers(container);
}

function reInjectAll() {
  pDoc.querySelectorAll('.momo-status-bar-container').forEach(c => {
    if (!c.querySelector('#momo-status-bar')) c.remove();
  });
  injectStatusBar();
}

function scanExistingTasks() {
  // 扫描已有消息中的任务块（适用于重新打开聊天时）
  const st = window.parent.SillyTavern || window.SillyTavern;
  const ctx = st?.getContext?.();
  if (!ctx?.chat) return;
  for (let i = ctx.chat.length - 1; i >= 0; i--) {
    const msg = ctx.chat[i];
    if (!msg || msg.is_user) continue;
    const text = msg.mes || '';
    const parsed = parseTaskBlocks(text);
    if (parsed.length > 0) {
      currentAvailableTasks = parsed;
      selectedTaskIndex = -1;
      console.info('[MomoStatusBar] scanExistingTasks found', parsed.length, 'tasks in msg', i);
      // 不在这里调用 refreshAllBars，避免递归
      return;
    }
    // Fallback: bare JSONPatch
    const fromPatch = parseRawJSONPatchTasks(text);
    if (fromPatch.length > 0) {
      currentAvailableTasks = fromPatch;
      selectedTaskIndex = -1;
      console.info('[MomoStatusBar] scanExistingTasks found', fromPatch.length, 'tasks from raw JSONPatch in msg', i);
      return;
    }
    // 也检查当前任务变量
    const data = getData();
    const hasCurr = data?.['日程']?.['当前任务']?.['任务名'] && data['日程']['当前任务']['任务名'] !== '无';
    if (hasCurr) {
      refreshAllBars();
      return;
    }
  }
}

function parseTaskBlocks(text) {
  const tasks = [];
  // 标准格式：【牝多多｜任务】...【/牝多多】，内部用 [任务]...[/任务] 分隔
  const outerRegex = /【牝多多｜任务】([\s\S]*?)【\/牝多多】/g;
  let m;
  while ((m = outerRegex.exec(text)) !== null) {
    const block = m[1].trim();
    // 提取 [任务]...[/任务] 内的内容，或 [任务N] 开头到下一个标记之前的内容
    const taskRegex = /\[任务(?:[一二三四五六七八九十]+)?\]([\s\S]*?)(?=\[任务(?:[一二三四五六七八九十]+)?\]|【\/牝多多】|$)/g;
    let tm;
    while ((tm = taskRegex.exec(block)) !== null) {
      const body = tm[1].trim();
      const lines = body.split('\n').map(l => l.trim()).filter(Boolean);
      const task = { '任务名': '', '类型': '露出类', '阶级': 'D', '截止': '', '目标': '', '报酬': 0, '额外要求': '无' };
      lines.forEach(line => {
        if (line.startsWith('任务名：')) task['任务名'] = line.replace('任务名：', '').trim();
        else if (line.startsWith('类型：')) task['类型'] = line.replace('类型：', '').trim().replace('类任务', '类');
        else if (line.startsWith('阶级：')) task['阶级'] = line.replace('阶级：', '').trim();
        else if (line.startsWith('截止：')) task['截止'] = line.replace('截止：', '').trim();
        else if (line.startsWith('目标：')) task['目标'] = line.replace('目标：', '').trim();
        else if (line.startsWith('报酬：')) task['报酬'] = Number(line.replace('报酬：', '').trim().match(/\d+/)?.[0]) || 0;
        else if (line.startsWith('额外要求：')) task['额外要求'] = line.replace('额外要求：', '').trim();
      });
      if (task['任务名']) tasks.push(task);
    }
  }
  if (tasks.length > 0) return tasks;

  // 备用格式1：【任务类型】...【任务报酬】（AI常用旧格式）
  const fallbackBlocks = text.split(/(?=【任务类型】)/g).filter(b => b.startsWith('【任务类型】'));
  fallbackBlocks.forEach(block => {
    const typeMatch = block.match(/【任务类型】[：:]\s*(\S+)/);
    const gradeMatch = block.match(/【任务阶级】[：:]\s*.*?最终评定[：:]\s*\[?(\w+)\]?/);
    const goalMatch = block.match(/【任务要求】[：:]\s*([\s\S]*?)(?=【额外要求】|【任务报酬】|$)/);
    const extraMatch = block.match(/【额外要求】[：:]\s*([\s\S]*?)(?=【任务报酬】|$)/);
    const rewardMatch = block.match(/【任务报酬】[：:]\s*[\s\S]*?(\d+)\s*元/);
    const task = {
      '任务名': '',
      '类型': typeMatch ? typeMatch[1].trim() : '露出类',
      '阶级': gradeMatch ? gradeMatch[1].trim() : 'D',
      '截止': '',
      '目标': goalMatch ? goalMatch[1].trim().replace(/\n/g, ' ') : '',
      '报酬': rewardMatch ? parseInt(rewardMatch[1]) : 0,
      '额外要求': extraMatch ? extraMatch[1].trim().replace(/\n/g, ' ') : '无',
    };
    if (!task['目标']) return;
    const shortGoal = task['目标'].replace(/^前往[^。]*[。，]?/, '').substring(0, 12);
    task['任务名'] = task['类型'].replace('类', '') + '—' + (shortGoal || '未知任务');
    tasks.push(task);
  });
  if (tasks.length > 0) return tasks;

  // 备用格式2：【任务选项 N】...（极少用）
  const optionRegex = /【任务选项\s*\d+】([\s\S]*?)(?=【任务选项|\n*$)/g;
  while ((m = optionRegex.exec(text)) !== null) {
    const block = m[1].trim();
    if (!block) continue;
    const typeMatch = block.match(/【任务类型】[：:]\s*(\S+)/);
    const gradeMatch = block.match(/【任务阶级】[：:]\s*.*?最终评定[：:]\s*\[?(\w+)\]?/);
    const goalMatch = block.match(/【任务要求】[：:]\s*([\s\S]*?)(?=【额外要求】|【任务报酬】|$)/);
    const extraMatch = block.match(/【额外要求】[：:]\s*([\s\S]*?)(?=【任务报酬】|$)/);
    const rewardMatch = block.match(/【任务报酬】[：:]\s*[\s\S]*?(\d+)\s*元/);
    const task = {
      '任务名': '',
      '类型': typeMatch ? typeMatch[1].trim() : '露出类',
      '阶级': gradeMatch ? gradeMatch[1].trim() : 'D',
      '截止': '',
      '目标': goalMatch ? goalMatch[1].trim().replace(/\n/g, ' ') : '',
      '报酬': rewardMatch ? parseInt(rewardMatch[1]) : 0,
      '额外要求': extraMatch ? extraMatch[1].trim().replace(/\n/g, ' ') : '无',
    };
    if (!task['目标']) continue;
    const shortGoal = task['目标'].replace(/^前往[^。]*[。，]?/, '').substring(0, 12);
    task['任务名'] = task['类型'].replace('类', '') + '—' + (shortGoal || '未知任务');
    tasks.push(task);
  }
  return tasks;
}

function parseRawJSONPatchTasks(text) {
  // Extract tasks from bare JSONPatch when AI drops <UpdateVariable> tags
  // Matches: "path": "/日程/可用任务", "value": [{"任务名": "...", ...}]
  try {
    const taskMatch = text.match(/"path":\s*"\/日程\/可用任务"[^}]*"value":\s*(\[[\s\S]*?\])/);
    if (!taskMatch) return [];
    const raw = taskMatch[1];
    // Try to extract individual task objects
    const tasks = [];
    const objRegex = /\{(?:[^{}]|\n)*?"任务名"\s*:\s*"([^"]+)"(?:[^{}]|\n)*?\}/g;
    let m;
    while ((m = objRegex.exec(raw)) !== null) {
      try {
        const taskObj = JSON.parse(m[0]);
        if (taskObj['任务名']) tasks.push(taskObj);
      } catch(e2) {
        // Manual parse as fallback
        const name = m[1];
        const type = m[0].match(/"类型"\s*:\s*"([^"]+)"/)?.[1] || '露出类';
        const grade = m[0].match(/"阶级"\s*:\s*"([^"]+)"/)?.[1] || '1级色情/1级社会';
        const goal = m[0].match(/"目标"\s*:\s*"([^"]+)"/)?.[1] || '';
        const reward = Number(m[0].match(/"报酬"\s*:\s*(\d+)/)?.[1]) || 0;
        const extra = m[0].match(/"额外要求"\s*:\s*"([^"]+)"/)?.[1] || '无';
        tasks.push({ '任务名': name, '类型': type, '阶级': grade, '目标': goal, '报酬': reward, '额外要求': extra });
      }
    }
    return tasks;
  } catch (e) {
    return [];
  }
}

function refreshAllBars() {
  try { scanExistingTasks(); } catch (e) {}
  const data = getData();
  pDoc.querySelectorAll('#momo-status-bar').forEach(bar => {
    const header = bar.querySelector('.msb-header');
    if (header) header.outerHTML = renderHeader(data);
    const statsPanel = bar.querySelector('.msb-panel.stats');
    if (statsPanel) statsPanel.innerHTML = renderStatsPanel(data);
    const appPanel = bar.querySelector('.msb-panel.app');
    if (appPanel) appPanel.innerHTML = renderAppPanel(data);
    const closetPanel = bar.querySelector('.msb-panel.closet');
    if (closetPanel) closetPanel.innerHTML = renderClosetPanel(data);
    const mapCanvas = bar.querySelector('.msb-panel.map .msb-map-canvas');
    const mapScroll = mapCanvas ? { left: mapCanvas.scrollLeft, top: mapCanvas.scrollTop } : null;
    const mapPanel = bar.querySelector('.msb-panel.map');
    if (mapPanel) mapPanel.innerHTML = renderMapPanel(data);
    if (mapCanvas && mapScroll) {
      requestAnimationFrame(() => {
        const newCanvas = bar.querySelector('.msb-panel.map .msb-map-canvas');
        if (newCanvas) { newCanvas.scrollLeft = mapScroll.left; newCanvas.scrollTop = mapScroll.top; }
      });
    }
    const contactsPanel = bar.querySelector('.msb-panel.contacts');
    if (contactsPanel) {
      const selected = bar.querySelector('.msb-contact-item.selected');
      const chatMsgs = bar.querySelector('.msb-panel.contacts .msb-chat-msgs');
      const chatScroll = chatMsgs ? chatMsgs.scrollTop : null;
      contactsPanel.innerHTML = renderContactsPanel(data);
      if (selected) {
        const name = selected.dataset.contact;
        const newItem = bar.querySelector(`.msb-contact-item[data-contact="${esc(name)}"]`);
        if (newItem) newItem.classList.add('selected');
      }
      if (chatMsgs && chatScroll !== null) {
        requestAnimationFrame(() => {
          const newMsgs = bar.querySelector('.msb-panel.contacts .msb-chat-msgs');
          if (newMsgs) newMsgs.scrollTop = chatScroll;
        });
      }
    }
  });
}

function start() {
  injected = false;
  injectStyles();
  resetClosetState();

  try { injectStatusBar(); } catch (e) {
    console.warn('[MomoStatusBar] first insert failed', e);
  }

  (async () => {
    try { await waitGlobalInitialized('Mvu'); } catch (e) {}
    injectStatusBar();
    refreshAllBars();
  })();

  // Startup fallback: 每隔 3s 尝试注入，最多 6 次
  let startupRetries = 0;
  const startupTimer = setInterval(() => {
    try {
      const bar = pDoc.querySelector('#momo-status-bar');
      if (!bar) injectStatusBar();
      refreshAllBars();
    } catch (e) {}
    if (++startupRetries >= 6) clearInterval(startupTimer);
  }, 3000);

  // 立即扫描任务
  try { scanExistingTasks(); } catch (e) {}

  let sendLock = false;

  pDoc.addEventListener('click', function (e) {
    const target = e.target;
    const isSendBut = target.closest('#send_but');
    const isContactBtn = target.closest('#momo-status-bar .msb-chat-input button');
    const isClosetBtn = target.closest('.msb-closet-send');

    if (!isSendBut && !isContactBtn && !isClosetBtn) return;

    const hasClothing = momoWearChanged.length > 0;
    const hasContact = Object.values(contactInputs).some(v => v && v.trim());

    if (!hasClothing && !hasContact && !isContactBtn) return;

    // Build combined message and set it before tavern's handler fires
    const mainInput = pDoc.querySelector('textarea#send_textarea');
    const mainMsg = mainInput?.value?.trim() || '';
    const parts = [];

    if (hasClothing) {
      parts.push('[服装变更：' + momoWearChanged.join('；') + ']');
    }

    const contactMsgs = Object.entries(contactInputs).filter(([, v]) => v && v.trim());
    contactMsgs.forEach(([name, msg]) => {
      if (!contactChats[name]) contactChats[name] = { sent: [], received: [] };
      contactChats[name].sent.push(msg.trim());
      parts.push('[发送给联系人' + name + ']：' + msg.trim());
      contactInputs[name] = '';
    });

    if (mainInput) {
      mainInput.value = parts.length > 0 ? (mainMsg ? parts.join('\n') + '\n' + mainMsg : parts.join('\n')) : mainMsg;
    }

    momoWearChanged = [];
    momoWearPutOn = new Set();
    momoWearTakenOff = new Set();

    if (contactMsgs.length > 0) {
      const area = pDoc.querySelector('#momo-status-bar .msb-panel.contacts');
      const msgsEl = area?.querySelector('.msb-chat-msgs');
      if (msgsEl) {
        msgsEl.innerHTML = renderContactArea(currentContact || contactMsgs[0][0]);
        msgsEl.scrollTop = msgsEl.scrollHeight;
      }
    }

    if (isClosetBtn) {
      const panel = target.closest('#momo-status-bar')?.querySelector('.msb-panel.closet');
      if (panel) panel.innerHTML = renderClosetPanel(getData());
      const sendBtn = pDoc.querySelector('.msb-closet-send');
      if (sendBtn) sendBtn.disabled = true;
    }

    // For closet/contact clicks: stop original event, set message, trigger send once.
    if (!isSendBut && mainInput && mainInput.value.trim()) {
      e.stopImmediatePropagation();
      e.preventDefault();
      if (!sendLock) {
        sendLock = true;
        setTimeout(() => {
          sendLock = false;
          const sb = pDoc.querySelector('#send_but');
          if (sb) sb.click();
        }, 10);
      }
    }
  }, true);

  function buildCombinedMessage() {
    const parts = [];
    if (momoWearChanged.length > 0) {
      parts.push('[服装变更：' + momoWearChanged.join('；') + ']');
    }
    const contactMsgs = Object.entries(contactInputs).filter(([, v]) => v && v.trim());
    contactMsgs.forEach(([name, msg]) => {
      if (!contactChats[name]) contactChats[name] = { sent: [], received: [] };
      contactChats[name].sent.push(msg.trim());
      parts.push('[发送给联系人' + name + ']：' + msg.trim());
      contactInputs[name] = '';
    });
    return { parts, contactMsgs };
  }

  function flushCombinedSend() {
    const mainInput = pDoc.querySelector('textarea#send_textarea');
    const mainMsg = mainInput?.value?.trim() || '';
    const { parts, contactMsgs } = buildCombinedMessage();
    if (parts.length === 0 && !mainMsg) return;
    if (mainInput) {
      const fullMsg = parts.length > 0 ? (mainMsg ? parts.join('\n') + '\n' + mainMsg : parts.join('\n')) : mainMsg;
      mainInput.value = fullMsg;
    }
    momoWearChanged = [];
    momoWearPutOn = new Set();
    momoWearTakenOff = new Set();
    if (contactMsgs.length > 0) {
      const area = pDoc.querySelector('#momo-status-bar .msb-panel.contacts');
      const msgsEl = area?.querySelector('.msb-chat-msgs');
      if (msgsEl) {
        msgsEl.innerHTML = renderContactArea(currentContact || contactMsgs[0][0]);
        msgsEl.scrollTop = msgsEl.scrollHeight;
      }
    }
    const sendBtn = pDoc.querySelector('#send_but');
    if (mainInput && mainInput.value.trim() && sendBtn) {
      sendBtn.click();
    }
  }

  pDoc.addEventListener('click', function (e) {
    const btn = e.target.closest('#momo-status-bar .msb-chat-input button');
    if (btn) {
      return;
    }

    const mainBtn = e.target.closest('#send_but');
    if (mainBtn) {
      return;
    }

    const item = e.target.closest('#momo-status-bar .msb-contact-item');
    if (item) {
      const currentInput = item.closest('.msb-panel.contacts')?.querySelector('.msb-chat-input input');
      if (currentInput && currentContact) {
        contactInputs[currentContact] = currentInput.value;
      }
      const list = item.closest('.msb-contact-list');
      list.querySelectorAll('.msb-contact-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      const name = item.dataset.contact;
      currentContact = name;
      const panel = item.closest('.msb-panel.contacts');
      const area = panel.querySelector('.msb-chat-area');
      const header = area.querySelector('.msb-chat-header');
      const placeholder = area.querySelector('.msb-chat-placeholder');
      const inputRow = area.querySelector('.msb-chat-input');
      const inputField = inputRow?.querySelector('input');
      const sendBtn = inputRow?.querySelector('button');
      header.textContent = '💫 ' + name;
      if (placeholder) {
        const msgsDiv = pDoc.createElement('div');
        msgsDiv.className = 'msb-chat-msgs';
        msgsDiv.innerHTML = renderContactArea(name);
        placeholder.replaceWith(msgsDiv);
      } else {
        const msgsDiv = area.querySelector('.msb-chat-msgs');
        if (msgsDiv) msgsDiv.innerHTML = renderContactArea(name);
      }
      if (inputField) {
        inputField.disabled = false;
        inputField.value = contactInputs[name] || '';
      }
      if (sendBtn) sendBtn.disabled = false;
      inputField?.focus();
      return;
    }

    const tab = e.target.closest('#momo-status-bar .msb-tab');
    if (tab) return;

    const taskOption = e.target.closest('.msb-task-option');
    if (taskOption) {
      const idx = parseInt(taskOption.dataset.taskIdx);
      if (!isNaN(idx)) {
        selectedTaskIndex = idx;
        const bar = taskOption.closest('#momo-status-bar');
        bar.querySelectorAll('.msb-task-option').forEach(el => el.classList.remove('msb-task-selected'));
        taskOption.classList.add('msb-task-selected');
        const confirmBtn = bar.querySelector('.msb-task-confirm-btn');
        if (confirmBtn) confirmBtn.disabled = false;
      }
      return;
    }

    const taskConfirmBtn = e.target.closest('.msb-task-confirm-btn');
    if (taskConfirmBtn && !taskConfirmBtn.disabled) {
      const tasks = currentAvailableTasks;
      if (Array.isArray(tasks) && selectedTaskIndex >= 0 && selectedTaskIndex < tasks.length) {
        const chosen = tasks[selectedTaskIndex];
        const mainInput = pDoc.querySelector('textarea#send_textarea');
        if (mainInput) {
          const existing = mainInput.value.trim();
          const msg = '我选择接取牝多多任务：' + chosen['任务名'];
          mainInput.value = existing ? existing + '\n' + msg : msg;
        }
        setTimeout(() => {
          const sb = pDoc.querySelector('#send_but');
          if (sb) sb.click();
        }, 50);
        currentAvailableTasks = null;
        selectedTaskIndex = -1;
        refreshAllBars();
      }
      return;
    }

    const closetToggle = e.target.closest('.msb-closet-toggle');
    if (closetToggle) {
      const card = closetToggle.closest('.msb-closet-card');
      if (!card) return;
      const name = card.dataset.closetName;
      const action = closetToggle.dataset.action;
      if (action === 'wear') {
        if (momoWearInitial.has(name) && momoWearTakenOff.has(name)) {
          momoWearTakenOff.delete(name);
          momoWearList.push(name);
        } else if (!momoWearPutOn.has(name)) {
          const data = getData();
          const newTags = data?.['衣柜']?.['可选服装']?.[name]?.['部位标签'] || [];
          const conflict = momoWearList.some(wName => {
            if (wName === name) return false;
            const wTags = data?.['衣柜']?.['可选服装']?.[wName]?.['部位标签'] || [];
            return wTags.some(t => newTags.includes(t));
          });
          if (conflict) {
            const conflictNames = momoWearList.filter(wName => {
              if (wName === name) return false;
              const wTags = data?.['衣柜']?.['可选服装']?.[wName]?.['部位标签'] || [];
              return wTags.some(t => newTags.includes(t));
            });
            if (typeof toastr !== 'undefined' && toastr.warning) {
              toastr.warning('你已经穿了一件' + conflictNames.join('、') + '啦～先脱掉再换新的吧！', '诶嘿~');
            }
            return;
          }
          momoWearPutOn.add(name);
          momoWearTakenOff.delete(name);
          momoWearList.push(name);
        }
        rebuildWearChanged();
      } else if (action === 'remove') {
        if (!momoWearTakenOff.has(name)) {
          momoWearTakenOff.add(name);
          momoWearPutOn.delete(name);
          momoWearList = momoWearList.filter(n => n !== name);
          rebuildWearChanged();
        }
      }
      const bar = card.closest('#momo-status-bar');
      const panel = bar?.querySelector('.msb-panel.closet');
      if (panel) panel.innerHTML = renderClosetPanel(getData());
      const sendBtn = bar?.querySelector('.msb-closet-send');
      if (sendBtn) sendBtn.disabled = momoWearChanged.length === 0;
      return;
    }

    const closetDetailBtn = e.target.closest('.msb-closet-detail-btn');
    if (closetDetailBtn) {
      const card = closetDetailBtn.closest('.msb-closet-card');
      if (!card) return;
      const detail = card.querySelector('.msb-closet-card-detail');
      if (detail) {
        const isExpanded = closetDetailBtn.dataset.expanded === 'true';
        detail.style.display = isExpanded ? 'none' : 'block';
        closetDetailBtn.dataset.expanded = isExpanded ? 'false' : 'true';
        closetDetailBtn.textContent = isExpanded ? '展开详细' : '收起详细';
      }
      return;
    }

    const eroticStat = e.target.closest('.msb-stat-erotic');
    if (eroticStat) {
      const bar = eroticStat.closest('#momo-status-bar');
      if (bar) {
        const closetTab = bar.querySelector('.msb-tab[data-tab="closet"]');
        if (closetTab) closetTab.click();
      }
    }
  });

  pDoc.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const input = e.target.closest('#momo-status-bar .msb-chat-input input');
      if (input && input.value.trim()) {
        const btn = input.nextElementSibling;
        if (btn && btn.tagName === 'BUTTON') btn.click();
      }
    }
  });

  pDoc.addEventListener('input', function (e) {
    const input = e.target.closest('#momo-status-bar .msb-chat-input input');
    if (input && currentContact) {
      contactInputs[currentContact] = input.value;
    }
  });

  let lastMsgCount = 0;
  let t2 = null;
  const chatContainer = pDoc.querySelector('#chat') || pDoc.querySelector('.chat-container') || pDoc.body;
  new MutationObserver(() => {
    clearTimeout(t2);
    t2 = setTimeout(() => {
    foldVariableUpdates();
    const currentCount = pDoc.querySelectorAll('.mes_text').length;
    if (currentCount !== lastMsgCount) {
      lastMsgCount = currentCount;
      reInjectAll();
      refreshAllBars();
    }
  }, 1500);
}).observe(chatContainer, { childList: true, subtree: true });

  const st = window.parent.SillyTavern || window.SillyTavern;

  eventOn(tavern_events.MESSAGE_RECEIVED, message_id => {
    try {
      const ctx = st?.getContext?.();
      const msg = ctx?.chat?.[message_id];
      if (!msg || msg.is_user) return;
      const text = msg.mes || '';

      const inbox = /【微信｜收件箱】([\s\S]*?)【\/微信】/g;
      let m;
      while ((m = inbox.exec(text)) !== null) {
        const content = m[1].trim();
        if (!content) continue;
        const colonIdx = content.indexOf('：');
        const sender = colonIdx > 0 ? content.substring(0, colonIdx).trim() : '';
        const reply = colonIdx > 0 ? content.substring(colonIdx + 1).trim() : content;
        if (!sender || !reply) continue;
        if (!contactChats[sender]) contactChats[sender] = { sent: [], received: [] };
        contactChats[sender].received.push(reply);

        const msgsEl = pDoc.querySelector('#momo-status-bar .msb-contact-item.selected')?.closest('.msb-panel.contacts')?.querySelector('.msb-chat-msgs');
        if (msgsEl && currentContact === sender) {
          msgsEl.innerHTML = renderContactArea(sender);
          msgsEl.scrollTop = msgsEl.scrollHeight;
        }
      }

      const contact = /\[([\u4e00-\u9fa5\w]+)成为了联系人\]/g;
      while ((m = contact.exec(text)) !== null) {
        const name = m[1].trim();
        if (!name) continue;
        const data = (() => { try { return getVariables({ type: 'message' }); } catch(e) { return {}; } })();
        const contacts = data?.['社交']?.['联系人'] || {};
        if (contacts[name]) continue;

        try {
          const patch = {};
          patch['社交'] = { '联系人': { [name]: { '状态': '已保存', '身份': '', '好感度': 50 } } };
          insertOrAssignVariables({ type: 'character' }, patch);
        } catch(e) {
          try {
            const patch2 = {};
            patch2['社交'] = { '联系人': { [name]: { '状态': '已保存', '身份': '', '好感度': 50 } } };
            insertOrAssignVariables({ type: 'message' }, patch2);
          } catch(e2) {}
        }

        pDoc.querySelectorAll('#momo-status-bar .msb-panel.contacts').forEach(panel => {
          panel.innerHTML = renderContactsPanel(getData());
        });
      }

      let parsedTasks = parseTaskBlocks(text);

      // Fallback: extract tasks from bare JSONPatch (when AI drops <UpdateVariable> tags)
      if (parsedTasks.length === 0) {
        const fromPatch = parseRawJSONPatchTasks(text);
        if (fromPatch.length > 0) {
          parsedTasks = fromPatch;
          console.info('[MomoStatusBar] extracted', fromPatch.length, 'tasks from raw JSONPatch');
        }
      }

      if (parsedTasks.length > 0) {
        console.info('[MomoStatusBar] parsed tasks:', JSON.stringify(parsedTasks));
        selectedTaskIndex = -1;
        if (parsedTasks.length > 1) {
          currentAvailableTasks = parsedTasks;
        } else {
          currentAvailableTasks = null;
          try { insertOrAssignVariables({ type: 'character' }, { '日程': { '当前任务': { ...parsedTasks[0], '完成': false } } }); } catch(e) {}
          try { insertOrAssignVariables({ type: 'message' }, { '日程': { '当前任务': { ...parsedTasks[0], '完成': false } } }); } catch(e) {}
        }

        pDoc.querySelectorAll('#momo-status-bar .msb-panel.app').forEach(panel => {
          panel.innerHTML = renderAppPanel(getData());
        });
      } else {
        const data = getData();
        const hasAvail = currentAvailableTasks || (Array.isArray(data?.['日程']?.['可用任务']) && data['日程']['可用任务'].length > 0);
        const hasCurr = data?.['日程']?.['当前任务']?.['任务名'] && data['日程']['当前任务']['任务名'] !== '无';
        if (hasAvail || hasCurr) {
          console.info('[MomoStatusBar] task already in memory or variables');
          pDoc.querySelectorAll('#momo-status-bar .msb-panel.app').forEach(panel => {
            panel.innerHTML = renderAppPanel(data);
          });
        }
      }
    } catch (e) {
      console.warn('[MomoStatusBar] failed to extract markers', e);
    }
  });

  eventOn(tavern_events.CHAT_CHANGED, initWearList);

  function initWearList() {
    momoWearList = ['白色蕾丝睡裙'];
    resetClosetState();
    contactChats = {};
    contactInputs = {};
    currentContact = null;
    selectedTaskIndex = -1;
    lastMsgCount = 0;
    reInjectAll();
    refreshAllBars();
  }
}

if (pDoc.readyState !== 'loading') {
  start();
} else {
  pDoc.addEventListener('DOMContentLoaded', start);
}

});
