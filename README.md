# ChiMeiRA 雙管奇下品牌官網

正式網址：https://kampungtoh.github.io/CMQMweb/

純 HTML、CSS、JavaScript；不需安裝套件或編譯。GitHub Pages 沿用既有設定。

## 檔案與修改方式
- `index.html`：固定品牌首頁、品牌精神、歷年入口、2027 預告。
- `brand/styles.css`：首頁視覺與手機版。
- `brand/app.js`：手機選單與照片燈箱。
- `chimeira-2025/index.html`：原首頁完整 2025 回顧；圖片與議程 PDF 保留根目錄路徑。
- `chimeira-2026/index.html`：2026 議程、講者與工作坊；報名表已移除。
- `chimeira-2026/app.js`：議程篩選、照片燈箱、盾徽動畫。
- `chimeira-2026/archive.css`：活動結束提示。

在 GitHub 的 `after` 分支打開對應檔案，點編輯即可直接修改。
下一屆確認後，新增 `chimeira-2027/index.html`，更新首頁 `#years` 年度入口與 `#next` 區塊。未確認前不放確切日期、場地、報名或倒數。

長期精神：Compassion、Multi-disciplinary、Resilience、Agility。
Clinical Value、Governance、Sustainability 僅為 2026 年主軸。
首頁及 2026 頁目前的現場照片均為 2025 年紀錄，新增照片請核對年份。
原報名平台與後台獨立運作，本 repository 不含參加者個人資料。

## 本機預覽
在 repository 根目錄執行 `python -m http.server 8000`，開啟 `http://localhost:8000/`。

## 既有連結
2025 的根目錄圖片與 `Schedule.pdf` 未搬移，直接連結仍有效。
原根目錄 `#program` 由首頁 JavaScript 導向 `chimeira-2025/#program`。
