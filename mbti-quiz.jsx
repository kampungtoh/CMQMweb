import { useState, useEffect } from "react";

// ══════════════════════════════════════════════════════════════════════
// ★ 請把你的 Google Apps Script 網頁應用程式網址貼在這裡 ★
// ══════════════════════════════════════════════════════════════════════
const SHEET_URL = "https://script.google.com/macros/s/你的部署ID/exec";

// ─── 問題資料 ─────────────────────────────────────────────────────────
const QUESTIONS = [
  { id:1,  text:"面對跨部門的協作需求時，你通常會：", a:"敲定時間開個簡短會議，透過口頭溝通與討論來對齊目標。", b:"先打好完整的企畫或訊息，再傳送給對方確認。" },
  { id:2,  text:"在團隊討論中，如果你的意見跟大眾不同，你通常會：", a:"堅持立場，直到有人能提出更有力的邏輯或證據說服我。", b:"評估現場氣氛，如果堅持會傷感情，可能會先保留意見。" },
  { id:3,  text:"如果今天的工作計畫臨時取消，多出了1小時的空檔，你會：", a:"立刻尋找下一件待辦事項，確保時間被有效地組織與利用。", b:"隨性處理一些感興趣的小事，享受這種自由感。" },
  { id:4,  text:"學習一個新工作或新技能，你比較喜歡：", a:"跟著步驟一步步操作，從實作中學習。", b:"先了解整體邏輯架構，並嘗試發掘不同的用法。" },
  { id:5,  text:"臨時被主管拉進一個完全沒準備的討論，你表現最自然的方式是：", a:"邊聽邊發言，透過對話來激發自己的觀點。", b:"先記錄大家的重點，等腦袋消化完後再簡短表達。" },
  { id:6,  text:"當老闆交辦一個從未做過的新專案時，你首先會關注：", a:"過去是否有類似案例或相關SOP可以參考。", b:"這個專案背後的長期意義，以及它能帶來的各種可能性。" },
  { id:7,  text:"面對週末突如其來的加班通知，你覺得最困擾的地方是：", a:"已經規劃好的私人行程被硬生生打亂，整體的掌控感消失了。", b:"雖然可以配合，但覺得毫無預警的變動讓工作變得很沉重。" },
  { id:8,  text:"面對一整天連續、密集的會議，你的體感通常是：", a:"覺得大腦轉動得很快，甚至會因此感到更有精神。", b:"即使會議內容順利，結束後仍會感到疲憊。" },
  { id:9,  text:"當團隊中有同事因為價值觀不同而產生僵局時，你通常會：", a:"站在中立角度，根據公司的目標與邏輯分析誰的方案更有效率。", b:"關注雙方的互動情緒，試著尋找能讓大家在和諧氣氛下共事的折衷點。" },
  { id:10, text:"對於辦公室的「潛規則」，你的態度是：", a:"這是職場現實的一部分，我會觀察現狀並務實應對。", b:"我更在乎這背後的權力架構與各種可能造成的長期影響。" },
  { id:11, text:"剛換到一個新的環境工作，你通常會如何認識新同事？", a:"趁午餐或茶水間碰面時，主動開話題自我介紹。", b:"先觀察大家的互動與職責，等待適合的公事契機再交談。" },
  { id:12, text:"你傾向如何管理你的待辦清單？", a:"看到清單被劃掉才安心。", b:"保持清單的開放性，隨時調整優先順序。" },
  { id:13, text:"看到同事在工作上出了明顯的低級錯誤，你的第一直覺反應是：", a:"思考這個錯誤會對專案造成什麼後果，以及如何修正。", b:"擔心同事現在的心情，以及他是否正承受著巨大的壓力。" },
  { id:14, text:"當主管對你的表現給予負面回饋時，你內心最先產生的念頭是：", a:"「他說的內容合乎邏輯嗎？具體的事實依據是什麼？」", b:"「他對我的印象變差了嗎？這會影響我們之後的合作關係嗎？」" },
  { id:15, text:"在一個忙碌的下午，主管突然走過來問：「大家現在有空聊一下新想法嗎？」你的內心反應是：", a:"覺得正好可以換個節奏工作，很樂意參與討論並拋出想法。", b:"感到被打斷，希望能趕快結束討論、回到原本的工作。" },
  { id:16, text:"在會議中討論問題時，你最不能忍受的是：", a:"討論太過空泛、沒有重點，卻不知道具體如何解決問題。", b:"太糾結於細節，卻忽略了整件事的大方向。" },
  { id:17, text:"當你正在進行一項工作，主管突然衝進來說有另一件急事，你的反應是：", a:"感到被打斷的焦躁，會想趕快把手邊的事做完再換。", b:"覺得沒關係，隨時切換工作節奏對我來說並不困難。" },
  { id:18, text:"同事通常會用哪種形容詞形容你？", a:"「你做事非常穩重，細節都注意到了。」", b:"「你很有遠見和創意，常有令人驚喜的想法。」" },
  { id:19, text:"當你必須拒絕一個合作夥伴的不合理要求時，你傾向：", a:"清楚列出合約條款與邏輯理由，專業且客觀地說明原因。", b:"委婉地表達困難，並強調雙方關係的重要性，尋求諒解。" },
  { id:20, text:"如果可以選擇自己的工作任務，你會比較喜歡哪種性質的工作任務？", a:"目標明確、流程清晰，可以按計畫有條理地推進到結果。", b:"充滿變數與新鮮感，可以隨時根據新狀況調整做法。" },
];

const DIM_GROUPS = { EI:[1,5,8,11,15], SN:[4,6,10,16,18], TF:[2,9,13,14,19], JP:[3,7,12,17,20] };

function calcMBTI(ans) {
  const r = {};
  for (const [dim, qs] of Object.entries(DIM_GROUPS)) {
    r[dim] = qs.filter(q=>ans[q]==='a').length >= qs.filter(q=>ans[q]==='b').length ? dim[0] : dim[1];
  }
  return `${r.EI}${r.SN}${r.TF}${r.JP}`;
}

// ─── 16型人格資料（來源：《經理人》2026年4月號「MBTI工作術」）────────────
const TYPES = {
  ISTJ:{
    title:"秩序的守護者", subtitle:"內建品管系統、嚴守規則，練習擁抱未知，提升應變能力",
    emoji:"📋", color:"#4A6FA5", tags:["紀律、效率、自律","冷靜務實、有事先扛","先讀制度再執行"],
    desc:`在所有MBTI人格類型中，ISTJ大概是職場上最容易被「視為理所當然」的一型。他們不會把功勞掛在嘴邊，默默扛起最多責任。ISTJ會把每一次處理過的問題、走過的流程、踩過的坑，精確歸檔，作為日後行動參考，因為他們的認知系統天生以「驗證過的」作為可信任的基準。

由於主要功能是內向實感（Si）——蒐集、儲存、比對——輔助功能則是外向思考（Te）。ISTJ會把內在積累的經驗，轉化成一套系統、標準與行動計畫。這2個功能疊加的結果，就是傾向做決定時先找過去類似經驗、再依現況調整套用的工作者：有根據、有結構、有始有終。

跟同樣是按照經驗行事的ISFJ相比，ISTJ記住的是事情怎麼做才對，ISFJ記住的是這個人需要什麼。從溝通風格來說，ISTJ只說自己確定的事，不必要的話不說，因為不確定的話說出去，對他們來說是一種失誤。但一旦他們開口，往往是最值得聽的那句話。在職場上，他們是強大的執行者與守門人：遵守規則，也期望他人如此；重視截止日期；傾向在分工清晰、目標明確的環境中工作，而非花時間在反覆界定框架的討論裡。作為領導者，他們不喜歡天馬行空或三分熟度的提案，要的是能落地的計畫與負責到底的態度。`,
    strengths:`與ISTJ合作，最重要的原則是：給他們明確的目標、具體的截止日期、清晰的角色分工，使他們發揮最大效能。反過來說，最讓他們耗能的，是突然的變動與模糊的指令。如果改變無法避免，最好的做法是給出具體的事實依據。

在職場上，ISTJ是強大的執行者與守門人，遵守規則，也期望他人如此，重視截止日期。他們的認知系統天生以「驗證過的」作為可信任的基準，因此在有明確規範與流程的環境中，能展現最高效能。`,
    growth:`對於ISTJ而言，要留意過去有效的方法，在不同情境下是否還管用；規則是工具，不是目的本身。適時開心，學習擁抱不確定性，練習傾聽那些「聽起來沒有根據」的聲音，也許那正是你的資料庫還沒收錄的新變數。

在面對突如其來的變動時，可以先問自己：「這個改變的目的是什麼？」把新情況當作一個新的「資料點」納入系統，而非視為威脅。`,
    collab:`與ISTJ合作，給他們明確的目標、具體的截止日期、清晰的角色分工。若要給ISTJ回饋或引導，最好透過有能力的導師，以符合邏輯的方式呈現，說清楚「為什麼要變、變成什麼」，而非單純要求改變做法。最讓ISTJ耗能的，是突然的變動與模糊的指令，因此與ISTJ共事請避免在最後一刻推翻既有規畫。`,
  },
  ISFJ:{
    title:"行走的百科全書", subtitle:"以服務他人為使命，了解壓力臨界，別再當爛好人",
    emoji:"🌿", color:"#5A8A6E", tags:["組織裡的定海神針","細節資料庫","忠誠可靠的夥伴"],
    desc:`一場熱鬧的部門聚會散場後，總有那樣一個人，默默地留到最後幫忙收拾殘局；或有一種人，不一定會大聲嚷嚷買了什麼給你，但可能記得你上次隨口提過不吃香菜，在點餐時貼心地為你備註。這種如同「守護者」般溫暖且可靠的存在，極有可能是ISFJ。

ISFJ的大腦如同一座「細節資料庫」，精確地歸檔每一次的工作經驗、每個人的習慣偏好與情緒變化。主導功能是「內向實感」（Si），他們會自然地記住所有需要被照顧的角落，對穩定秩序的渴望，使ISFJ成為組織變動頻繁時最不容易陷入慌亂的錨點。他們習慣依照既有的流程與標準運作，從過往經驗中找到應對的方式，是團隊中持續執行力與高度可靠性的信賴夥伴。

ISFJ對細節的耐心與積極應用讓他們在組織中成為穩定支柱，能把例行公事做到最好，這讓他們在需要持續執行力、高度可靠性的職位上，是最值得信賴的夥伴。然而，這種對穩定的依賴，也讓ISFJ在職場中最忌諱突然的改變。Si功能需要時間將新訊息與舊經驗對照整合，才能產生安全感。臨時更動任務範疇、在最後一刻推翻既有規畫，對他們而言非常疲憊。`,
    strengths:`此外，ISFJ的輔助功能「外向情感」（Fe），使他們對人際氣圍高度敏感，容易將他人的需求視為自己的責任，渴望付出被看見。一句具體真誠的「謝謝你把這件事處理得這麼周全」，對他們的意義遠超過想像。

長期不被感謝、承諾不斷被改動、或需求長期被壓抑，是讓ISFJ悄悄耗盡的慢性毒藥。當壓力到達臨界點，原本溫和的他們可能會突然爆發，陷入災難化思考，預設最壞的結果，讓身邊的人感覺他「突然變了一個人」。`,
    growth:`慧培國際管理顧問MBTI認證顧問王怡文建議，ISFJ要學會適度宣傳自己的成果，培養更果斷的處事風格。在照亮他人的同時，ISFJ更需要了解自己的壓力觸發點，為自己留一段安靜的時光。

學習說「不」，了解自己的壓力臨界，別把承擔一切當成理所當然。練習在給出承諾前，先問自己：「這件事如果加進來，我現有的事情還撐得住嗎？」`,
    collab:`給予真誠的感謝，並尊重他們的節奏，是與ISFJ共事最重要的事。與ISFJ合作，避免在最後一刻推翻既有規畫，如有變動請提早告知並說明原因。長期不被感謝、承諾不斷被改動，是讓ISFJ悄悄耗盡的慢性毒藥，請留意這一點。`,
  },
  INFJ:{
    title:"沉默的先知", subtitle:"擁有豐富的感知能力，設情感界線替自己保留能量",
    emoji:"🔮", color:"#7B68B5", tags:["超強直覺","共情能力強","團隊的精神支柱"],
    desc:`你或許遇過這樣特質的人：說話不多但每次說話總是一針見血，對每件事都有獨到見解，但在人際相處上，似乎都保持一段不冷不熱的距離。這通常也是MBTI中INFJ最容易給人的感受。

INFJ的心理運作結構，主導功能是內向直覺（Ni），也就是說他們會不斷在背景中整合訊息、感知趨勢，最終以「洞見」的形式浮現，而非線性分析推導出來，所以會給人直覺準確的印象。而輔助功能外向情感（Fe）則讓他天生對人的狀態高度敏感：走進一個空間就能讀到整體氣氛、共情能力強，聽人說話時感知到的往往比對方說出口的更多。

INFJ最厲害的天賦來自直覺，包括靈光一現、洞察力、聰明才智與判斷歷程。但這個能力有一個代價：它幾乎無法被外化解釋，讓INFJ在需要「說明你的依據」的職場環境中，不容易被看見。就像《冰雪奇緣》裡的主角艾莎，從小知道自己的力量不尋常，能預見它可能造成的傷害，寧可選擇封閉自己。這也可能是INFJ行為的縮影：行動的核心概念是某個強烈的理念或保護動機，而不是即時的情緒反應。`,
    strengths:`對於沒有提供靈感發揮空間的例行工作，INFJ會深感不滿。與同樣重視意義感的INFP不同的是，INFP問的是「這件事符合我的價值觀嗎」，INFJ問的是「這是否真正幫助他人」，前者向內，後者向外。

跟INFJ互動時，也要注意他們的沉默。顧及外界情感，INFJ傾向以沉默代替衝突。當他開始變安靜、逐漸退出，說明他已經在內心做了決定，而一旦決定要離開某個人、事、物，都是長期積累爆發的結果，也很難有轉圜空間。`,
    growth:`對於INFJ，因為輔助功能Fe讓他們善於照顧他人，但同時也讓INFJ的邊界變得模糊。職場裡，你很容易成為所有人傾訴的對象，卻沒有人問你的感受。INFJ要主動為自己保留能量，學習如何在不壓抑自己的情況下與外界合作。

設定「情感界線」不是冷漠，而是讓你能長期維持高品質的付出。`,
    collab:`與INFJ共事，給予他們能發揮直覺與創意的空間，避免過度要求說明「依據」。當INFJ開始沉默，要主動、溫和地詢問，而非等待。讓INFJ感覺自己的洞見貢獻被看見，是維持長期合作關係最重要的基礎。`,
  },
  INTJ:{
    title:"高產出、重邏輯的思想家", subtitle:"說話直白常被貼冷漠標籤？試著把關心練成職場技能",
    emoji:"♟️", color:"#2E5470", tags:["需大量獨處時間","完美主義","情感內斂"],
    desc:`很多人看完好萊塢知名導演克里斯多夫・諾蘭（Christopher Nolan）的作品都覺得很「燒腦」，因為他打造的科幻電影《全面啟動》（Inception）、《星際效應》（Interstellar）建構出複雜且邏輯嚴密的世界觀。這種對複雜性的痴迷和完美主義，是INTJ最鮮明的寫照。對他們來說，太簡單的東西往往然無味。

INTJ的強項是有系統地建立體制並完成工作，且能脫有框架來做事，在面臨高度挑戰時，能真正激發出熱情，並進入「心流狀態」。由於INTJ需要大量的獨處時間來消化訊息和思考，在辦公室中，容易表現出比較冷漠的態度。例如專心處理一件事時，同事突然跑來閒聊幾句，聊的內容跟工作無關，這種突然的對話，常讓他們感到困擾。也因為他們總是專注在邏輯思考，並以完成任務為目標，面對意見不同時，即使對方是主管，也會直言不諱地指出謬誤，像是：「你提出的數據其實有問題，導致結論是錯的。」在溝通上，時常忽略他人的感受。`,
    strengths:`INTJ最容易被貼上「自以為是」、「冷漠」、「愛批評」的負面標籤。其實，他們不是冷淡，而是用自己的方式為組織和團隊付出，例如透過趨勢分析，幫大家做好準備，避免走冤枉路。

和INTJ合作，不應該要求他們變得熱情、提供情緒價值，而是學著接受彼此此「頻率」。比方說當你提出新計畫時，不要期望他們會立即給予正面回饋，先提供充足的思考時間，讓他們充分消化後再給出回應。`,
    growth:`另一方面，INTJ在溝通時可以試著理解對方的價值觀，展現關心，例如用提問的方式和別人建立連結。雖然你可能會覺得麻煩，不過維持良好人際關係也是重要的技能。

試著把關心「練成」一種技能：就像學任何技能一樣，先確立目標（讓對方感覺被理解），再找到最有效率的方法執行。`,
    collab:`和INTJ合作，不應要求他們變得熱情，而是學著接受彼此的「頻率」。當INTJ是你的主管時，在討論前先提供書面資訊，報告時最好先講結論，再講核心邏輯，最後才是細節討論。給予充足的思考時間，讓他們充分準備後再給出回饋。`,
  },
  ISTP:{
    title:"冷靜的行動者", subtitle:"習慣少說多做的你，要學習適時回應他人",
    emoji:"🔧", color:"#5E7A58", tags:["重視效率","危機處理高手","做得比說得多"],
    desc:`你身邊有沒有這樣的同事？工作卡關的時候，大家第一個想到的就是他，因為不管遇到什麼樣的問題，他總能找到最簡單、最快的方法解決。然而，把事情處理好之後，他就回頭做自己的事情，不會跟其他人有更多互動。MBTI人格特質裡的ISTP型人格，相處起來看似有距離感，卻擅長處理危急狀況、難題。

ISTP型人關注事實與細節，善於釐清事情背後的原因。這樣的特質，讓他們能夠結合手邊資源與分析能力，以理性客觀的方式處理問題。在緊急狀況下，他們的表現尤為出色，因為習慣尋找捷徑、又能保持冷靜，往往可以迅速讓問題迎刃而解。

然而，ISTP型人重視效率，以工作結果為優先的性格，會讓旁人覺得他們難以親近。開會時，當同事想寒暄幾句、討論午餐吃了什麼，希望在輕鬆的氣氛中討論方案，卻被ISTP型人打斷。因為他們認為開會就應該專心、有效討論，不應該閒聊。加上他們本來就覺得人際關係與工作沒有太大關聯，在察覺他人情緒上又比較遲鈍，久而久之，便容易給人冷漠、難以親近的印象。`,
    strengths:`至於該如何與ISTP型人相處，可以用他們所關心的事物當成話題，藉此拉近彼此的距離。在工作上，需要給予他們自由度。對ISTP型人下達詳細的指令，會讓他們綁手綁腳。畢竟對ISTP型人來說，透過反覆嘗試，自行找出解決問題的方法，並順利完成任務，才是最理想的工作狀態。`,
    growth:`對於ISTP型人來說，除非你的生活、工作都不需要社交，如果想要讓工作推進得更順利，嘗試突破自我、學習看見他人的情緒，是值得重視的課題。建議他們對同事說話以及對方的反應，慢慢摸索出與不同人溝通的分寸。`,
    collab:`需要給予ISTP型人自由度，對ISTP型人下達詳細的指令，會讓他們綁手綁腳。透過反覆嘗試，自行找出解決問題的方法，並順利完成任務，才是最理想的工作狀態。與ISTP合作時，可以用他們所關心的事物當成話題，藉此建立關係，在工作上給予明確目標但保留執行彈性。`,
  },
  ISFP:{
    title:"溫柔的職場心靈導師", subtitle:"擁有細膩的感受力，也要練習從他人的情緒中抽身",
    emoji:"🎨", color:"#A06050", tags:["溫和體貼","強調價值觀與身心穩定","容易內耗"],
    desc:`小謙從科技公司辭職、改當插畫家，讓同事訝異不已。但也並不後悔，雖然收入變少、不確定性變高，但這是他第一次覺得，自己做的事情是有意義的。

小謙的想法，可能讓ISFP型人特別有感。ISFP型人屬於內向情感型，重視身心穩定與價值感，盡可能讓外在世界和內在理想相符合。當ISFP型人做的事情與內心的價值觀相連，便能進入狀態。但當工作與他們認為正確的事相互衝突，ISFP型人會選擇離開。

除了受價值觀驅動，由於ISFP型人的輔助功能是外向實感（Se），比起抽象的理論，更關注現實生活。所以他們能夠敏銳地捕捉他人當前的需求、情緒變化，並默默尋找實際有用的方式，幫助他人。因此和ISFP型人共事，通常讓人感到舒適，他們親和力強、體貼，會關懷同事，也會認真傾聽周遭人的煩惱，被大家視為心靈導師。`,
    strengths:`ISFP型人希望自己的工作背後有目標，對自己喜愛的事物有完美主義傾向，通常在獨立作業時發揮最好。但這種細膩的待人處事方式，有時候反而讓ISFP型人委屈了自己。例如，茶水間備品用完，卻沒有及時補貨，其他人可能先把狀況通報給主管，但ISFP型人會先把事情攬到自己身上道歉，只為避免衝突發生。然而這樣的行為，卻可能讓他們反覆承擔不屬於自己的責任。`,
    growth:`太在意他人感受，也讓他們在需要拒絕的時刻猶豫不決，影響工作進度。對此，ISFP型人可以學習管理工作衝突，培養更果斷的處事風格。建議他們將各種選項可能帶來的優缺點寫在紙上，幫助整理想法並做出明智的決定。`,
    collab:`旁人給予ISFP型人回饋，也需要留意表達方式，如果不留情面，ISFP型人容易因此受傷。懂得談事情又說理，會是比較好的方式，例如「我可以感覺到你為了得到好結果而付出了心血，但是為了避免後續事情泡湯，希望你以後能夠以遵守期限為優先。」`,
  },
  INFP:{
    title:"高敏感的藝術家", subtitle:"外表文靜內心熱情，多方探索可挖掘更多潛能",
    emoji:"🌱", color:"#6A8C5E", tags:["理想主義者","靈感比計畫更早到","意義感決定效率"],
    desc:`寫出《變形記》的捷克作家卡夫卡（Franz Kafka）在保險公司上班，白天處理理賠案件，晚上才是他真正活著的時間，用寫作探索內在困惑。許多INFP類型的人，和卡夫卡很像：對外看似默默配合，私底下有一個完全不同的世界。

INFP的核心認知結構，是主導功能「內向情感」（Fi）加上輔助功能「外向直覺」（Ne）。Fi讓他們擁有一套幾乎不受外部影響的內在價值羅盤。判斷一件事好不好，第一個問的不是「別人怎麼看」，而是「這符不符合我對自己的理解」。Ne則賦予他們跨域聯想的能力，能在別人還在看眼前問題的時候，已經看到還不存在的可能性。兩者疊加，使INFP特別擅長原創性與情感穿透力的工作：深度採訪、品牌故事、創意寫作、諮商輔導。

INFP希望自己的工作背後有目標，對自己喜愛的事物有完美主義傾向，通常在獨立作業時發揮最好。而這個組合也製造了職場上最常被誤讀的特徵：情緒與表現的起伏很大。因為INFP只有在「內心認同這件事的意義」時才能真正運轉，一旦工作缺乏意義，Ne的發散便失去方向，Fi的驅動力也無從啟動。外人眼中的「狀態不穩定」，原因來自意義感，而非能力或態度問題。`,
    strengths:`與INFP合作，最重要的是告訴他們這件事「為什麼重要」，而不只是「要做什麼」。給予充分的自主空間，他們往往以高品質的產出作為回報；若被微觀管理或嚴格按流程執行，創意與投入則會消失。

INFP對批評的感受比多數人深刻，一次當眾否定可能造成長期疏離，但他們不會說出口。若需給回饋，私下、具體、對事不對人，才是真正有效的方式。`,
    growth:`INFP最好練習在表達中加入更多清晰的結構，並嘗試多探索，透過與外界的互動，逐漸找到對自己最重要的事，不要因為外界的批評而止步不前。

建議多嘗試、多探索，透過與外界的互動，逐漸找到對自己最重要的事，不要因為外界的批評而止步不前。`,
    collab:`與INFP合作，最重要的是告訴他們這件事「為什麼重要」，而不只是「要做什麼」。給予充分的自主空間，他們往往以高品質的產出作為回報；若被微觀管理或嚴格按流程執行，創意與投入則會消失。若需給回饋，私下、具體、對事不對人，才是真正有效的方式。`,
  },
  INTP:{
    title:"活在自己世界的天才", subtitle:"邏輯滿分卻容易得罪團隊，練習用正面詞彙點出問題",
    emoji:"🧩", color:"#3A6080", tags:["說話不留情面","擅長處理抽象問題","敢據理力爭"],
    desc:`某科技公司有一位工程師，每次發言都能精準抓出漏洞，堪稱團隊的「除錯大腦」。但也因為說話總是不留情面，讓團隊氣氛降到冰點。公司評估後，將他調去單獨作業的研究單位。許多INTP在職場上面臨這種處境：明明大家都認可你的能力，卻不愛跟你一起做事，常被稱為「白目的天才」。

INTP因具有高度懷疑精神，不輕易接受大眾普遍認定的事實，且敢據理力爭。INTP的思維方式，本質上是一套驗證系統，任何結論的第一反應是拆解：這合乎邏輯嗎？往這個方向走會碰到什麼邊？

同樣給人冷漠感、重視邏輯的還有INTJ，只差一個字母，INTP和INTJ兩者最大的差異是「目的」。INTP的動機是追求邏輯正確和精準，認為有義務講出事實，不一定是想快速完成任務；INTJ提出回饋則是效率和目標導向，給人感覺計畫性更強。`,
    strengths:`癥結點在於，INTP即使給的回饋很精準，但對方不知道該怎麼接收，因為那些話聽起來像是在否定別人的能力。久了，大家學會不問他們，因為「他說的也許都對，但我每次聽完都很沮喪」。

INTP最好練習在表達中加入正面詞彙，並且換位思考，發展這些功能後，就能調整互動模式，提高與團隊共事的效率和價值。`,
    growth:`對INTP來說，弱勢功能是「外向情感」，不想在社交場合感到手足無措，可運用分析能力，建立不同場合（例如職場開會、朋友聚聚）的行為準則，例如在職場上同事抱怨時，先給予1分鐘的「情緒確認」，像是點頭、眼神接觸，再進入最擅長的「問題解決」模式。`,
    collab:`跟INTP共事應掌握2大原則。第一，不用職位壓制，溝通時最好就事論事、提出數據。第二，給予彈性空間，由於INTP獨立性強，與其他人跟著SOP走，不如給予他們具有挑戰性的工作和最少的干預，才能找到屬於自己的靈活邊界，達到最佳成果。`,
  },
  ESTP:{
    title:"活在當下的行動派", subtitle:"想到就衝、擅長靈活應戰，補齊規畫和收尾工作更完美",
    emoji:"⚡", color:"#B84A38", tags:["觀察力敏銳","務實主義","人際交往能力強"],
    desc:`周會上，主管宣布公司將開拓新通路，接下來幾天，有些同事開始在網路上查找資料、整理市場概況。但小威直接聯繫相關領域的熟人，以第一線情報思考如何開拓銷路。在平現場狀況、不喜歡紙上談兵，是ESTP型人的鮮明寫照。

ESTP的主導功能是外向實感（Se），面對問題時傾向於發現實再評估情勢。比起「坐而言」，ESTP型人更偏好「起而行」。工作時，他們充滿熱情、活力，不會被死板的計畫困住，而是隨時準備好根據情勢採取行動。他們能夠迅速掌握要點，觀察力強，哪些人負責主要業務、哪些地方暗藏矛盾，全都逃不過他們的法眼。

同時，他們的決策方式理性，ESTP型人能快速運用邏輯思考，縝密評估接收到的訊息並迅速決策，藉此平衡自身主重觀察、即時行動的風格。`,
    strengths:`由於ESTP型人專注於解決眼前的問題，可能因此忽略了行動對後續、對組織更廣泛的影響。他們也可能因為急著切換到下一個挑戰，而未能做好收尾工作。所以當責任心強、重視結果的人與ESTP共事時，容易出現摩擦。由於ESTP型人不善於事前規畫，對於需要預見結果才能安心推進工作的人來說，ESTP型人「發現問題就立刻行動」的節奏會讓他們感到不適。`,
    growth:`ESTP型人工作前，需要分享推進時間表，營造彼此都覺得穩定的工作環境。對其他人來說，不做計畫可能成為壓力來源，ESTP型人需要多考慮他人感受，分辨哪些事情需要提前準備、哪些適合即興發揮，才能找到屬於自己的靈活邊界，展現實力。`,
    collab:`與ESTP共事，建議事前與他分享時間表和期望的進度節點，讓彼此都覺得穩定。要解決虎頭蛇尾的問題，可以將大目標拆解成具體小步驟，累積他們的成功經驗並確保進度，並提醒他們注意落實情況，確保點子能落地。`,
  },
  ESFP:{
    title:"熱情的社交達人", subtitle:"炒熱氣氛一流卻總被嫌散漫，戒掉瞎承諾、按進度交出成果",
    emoji:"🌟", color:"#C87E28", tags:["辦公室開心果","樂於合作","天生的表演者"],
    desc:`每次開會，只要有小新在場，氣氛總是很愉快。會議開始前，他時常分享有趣的故事、用玩笑活絡氣氛。旁人只要聽到會議室裡傳來豪爽的笑聲，就知道他來上班了。營造快樂的工作氛圍，對ESFP型人來說似乎毫不費力。

ESFP型人對「人」充滿強烈的興趣，而且具備敏銳的觀察能力，能夠意識到旁人的即時需求，並幫助、娛樂或安慰對方。熱衷於建立關係、社交活動的ESFP型人，也喜歡與他人共享，他們在團隊裡是樂於合作、富有生命力的成員，而且從不吝於給予他人正面反饋和表揚。

幽默又體貼的他們，看到身邊的人不開心，就會主動陪伴，帶對方去吃大餐或是到郊外散心。ESFP型人看到坐在辦公室角落、埋頭於工作的人，可能就想要過去搭話，只因為擔心那位同事會感到孤獨。`,
    strengths:`然而，這份對人的熱情，有時也會影響ESFP型人的工作。對ESFP型人來說，他們關心的是「和誰工作會多有趣」，所以有時會忘了考慮「什麼時候開始工作」、「如果與自己正在執行的工作並行，會不會超出負荷」等問題，衝動答應新任務，導致自己日後陷入窘迫局面。

此外，ESFP型人可能因為攬下很多任務，又積極社交，使得旁人覺得他們沒有專注在主要的任務上。`,
    growth:`ESFP型人需要學習制定長期計畫、主動與同事回報進度，讓對方安心。應先思考自己想當什麼樣的人，避免為了討好別人而承諾太多事情。面對無預警的要求，要懂得說「不」，不要因為害怕尷尬而輕易給出承諾，寧可當下拒絕，也好過勉強答應後，感到痛苦、後悔。`,
    collab:`與ESFP合作，請明確說明截止時間與優先順序，給予正面認可，並建立定期回報的習慣。ESFP型人應先思考自己想當什麼樣的人，避免為了討好別人而承諾太多事情。面對無預警的要求，要懂得說「不」，不要因為害怕尷尬而輕易給出承諾。`,
  },
  ENFP:{
    title:"擁有自由靈魂的夢想家", subtitle:"善於用正能量感染全場，執行力是圓夢關鍵",
    emoji:"🔥", color:"#C06030", tags:["充滿好奇心","高情緒價值","三分鐘熱度"],
    desc:`在70多年前，華特・迪士尼（Walt Disney）懷抱著一個大膽的夢想：打造一座大人小孩都能共同創造美好回憶的樂園。儘管當時外界嘲笑他不切實際，甚至質疑護成本會拖垮獲利，他仍努力實踐夢想。1955年，迪士尼樂園誕生。他曾說：「別忘了這一切都是由一個夢想和一隻老鼠開始的。」這句話體現ENFP人格中不畏艱難、熱情追夢且充滿好奇心的特質，他們往往是創新和變革推動者。

對ENFP來說，這個世界就像一張待探索的地圖，工作意義是解開未知的謎團，他們最看重自由、價值感和情感連結。當工作和信念連結時，他們最能進入心流狀態。在職場上，ENFP是人氣王，會主動關心同事，並給予滿滿的情緒價值，用正能量感染團隊，特別適合跨部門溝通協調、擔任業務性質等與人接觸的工作。`,
    strengths:`不過，也因為擅長探索外在環境，容易被新事物吸引，導致ENFP喜歡發起新專案，時常充滿熱情的開始，卻不擅長「完成」它。一旦新鮮感消失，注意力便會迅速轉向下一個更具吸引力的事物。他們的弱點是對細節的不在意和過度在意別人的感受，當任務進入到需要精確執行、數據核索或重複勞動的階段時，ENFP就會感到無聊，產生逃避拖延的念頭。加上他們往往無法拒絕別人，即便已超出負荷，仍硬撐答應，耽誤自己的工作。`,
    growth:`和ENFP共事，需要建立明確的優先順序，協定彈性的最後期限。要注意的是，太過直接的批評會讓他們感到受傷、變得消極，不要試著用邏輯說服，要讓ENFP感覺被理解，一句「我知道你很努力」，往往比任何分析都有用。雖然熱愛與人群相處，也應該花時間獨處反思，避免為了他人的事情忙，忘了把時間留給自己。`,
    collab:`和ENFP共事，需要建立明確的優先順序，協定彈性的最後期限。太過直接的批評會讓他們感到受傷、變得消極，不要試著用邏輯說服，要讓ENFP感覺被理解，一句「我知道你很努力」，往往比任何分析都有用。雖然熱愛與人群相處，也應該花時間獨處反思，避免為了他人的事情忙，忘了把時間留給自己。`,
  },
  ENTP:{
    title:"大膽的冒險家", subtitle:"提供舞台、設定步驟，讓衝勁變戰績",
    emoji:"💡", color:"#3A6E8A", tags:["點子王","表達力強","不服輸的辯論家"],
    desc:`你是否羨慕過有些人，在職場上總是能量強大，重要場合善於表達，也重視自己的能見度，容易被別人記住和認識，這類型的人很有可能是ENTP。ENTP是「探索者和發明家」，聰明且勇於挑戰、有創業精神，天生不服輸、喜歡挑戰、喜歡挖掘各種選項、新奇且刺激的點子，如果說有誰在危機時反而愈活愈能幫助，那十之八九是ENTP。

由於表達能力和說服力強、勇於挑戰新事物，像在大眾面前報告、擔任公司發言人或開拓新業務等，都是他們的主場。即使是做同樣的專案，也想用不同以往的方式進行。然而，性格積極主動是好事，卻常被人批評：「聰明有餘，努力不足，做事容易虎頭蛇尾。」做事傾向看大局，也讓ENTP對小細節容易不耐煩，常被主管或同事說：「講是很會講，但做事很容易犯錯，還不肯認錯。」其實也並非他們不知道自己犯錯，只是好強的性格容易把認錯視為認輸，這比犯錯本身更難受。`,
    strengths:`因此，分配工作時，最好給ENTP較有挑戰性、能向外表達的任務，例如負責向外報告或對外協商。要解決虎頭蛇尾的問題，建議將大目標拆解成具體小步驟，累積他們的成功經驗並確保進度，並提醒要注意落實情況，確保點子能落地，必要時搭配夥伴協助檢查數據和實行細節。`,
    growth:`跟ENFP需要成員提供情緒價值不同，ENTP則要你告訴他「這樣做是對的」，認同他的思路正確，比情感安慰更有說服力。對ENTP來說，弱點是缺乏對過去去經驗和細節的關注，建議執行任務前先想好具體步驟，討論時不要急著想接下來可以怎麼做，先回顧：「剛才提到的關鍵3個數字是什麼？」訓練大腦去儲存「原始數據」，而不是只儲存「抽象概念」。`,
    collab:`ENTP需要你告訴他「這樣做是對的」，認同他的思路正確，比情感安慰更有說服力。在團隊協作時，最好與他人精準對齊進度，達到最佳成果。給ENTP較有挑戰性、能向外表達的任務，搭配能幫助收尾的夥伴，是最佳的合作模式。`,
  },
  ESTJ:{
    title:"專案管理大師", subtitle:"眼裡只有任務和效率？放下你的規則讓他人有參與感",
    emoji:"🏗️", color:"#2A6078", tags:["講究效率的霸道總裁","完成任務為優先","清空to-do list的計畫控"],
    desc:`在遊樂園裡，一家人拿著早就研究好的地圖準備開始作戰計畫，傑米吩咐大家分頭行動：有人去排最熱門的雲霄飛車、有人去卡位剛開放入場的表演。每個人手上都有明確任務，像是在執行一場效率至上的專案管理。傑米一邊看著時間，一邊盤算著接下來的動線，「如果這樣排，3小時內我們可以玩到6個設施！」就在大家準備各自出發，另一半卻提醒他：「我們是來玩的，不是來打仗的。今天最重要的，應該是一起度過一天吧。」傑米愣了一下，才意識到自己差點把一趟家庭旅遊變成專案任務。

這個情境正好反映了ESTJ人格的典型特質。常被稱為「霸道總裁」的ESTJ重視秩序、效率與結果，習慣把事情規劃得井井有條，並確保每個人都知道自己該做什麼。因此，ESTJ在團體中往往自然而然成為領導者。他們擅長制定計畫、分配任務，也能在混亂中迅速建立規則與流程。`,
    strengths:`ESTJ的外向思考主導心智功能，他們高度相信客觀邏輯與結構，善於從外部尋求與整合資源，希望達成明確的產出。遇到問題時，他們會優先尋找最有效率的解決方法，而不是陷入過多情緒或想像。聚焦於責任和目標的特質，讓ESTJ在組織管理或需要決斷力的環境中特別突出，常被視為可靠的人。`,
    growth:`但強烈的效率導向也可能成為ESTJ的盲點。當過度專注於事情要怎麼做好，有時會忽略人的感受，可能不自覺地把人際關係也當成任務管理，習慣用指示或建議來解決問題。長期下來，容易讓身邊的人感到被要求、被管理，而不是被理解。ESTJ在做決定前，可以試著放下效率掛帥、多考慮「人」的因素，對他人的付出表示欣賞。`,
    collab:`ESTJ可能常常納悶：「為什麼我已經給出最好的方案了，你們還不照著做？」難免給人不近人情的印象。對此，ESTJ應練習多傾聽他人意見，才能讓團隊更有參與感、更願意付出。與ESTJ合作，最有效的方式是以邏輯、數據和成果說話，並清楚告知自己的職責範圍和時間節點。`,
  },
  ESFJ:{
    title:"大小事全攬下的里長伯", subtitle:"照顧了全世界卻忘了自己？學習面對衝突是你的人生課題",
    emoji:"🤝", color:"#4A7E5A", tags:["氛圍和諧最重要","每個人在意的事我都知道","照顧他人感受的小太陽"],
    desc:`員工旅遊當天，大家正準備在車站集合。當其他人還睡眼惺忪時，小倩已經提著2個大袋子熱情地招呼大家，量車藥、防蚊液和備用的行動電源都幫大家準備好了。一上車，她就穿梭在走道張羅：「這邊冷氣會太冷嗎？」、「早餐吃什麼口味的飯糰？」誰不吃牛、誰對海鮮過敏，她都知道。直到下午，同事驚覺小倩整天都在照顧大家，當同事勸她休息一下，她卻笑著說：「沒關係，大家開心最重要！」

這種「里長伯」性格正好刻畫了ESFJ人格的典型樣貌。他們能敏銳地體察他人需求，善於將日常瑣事打理得井井有條。在團體中，只要有ESFJ在，就能有滿滿的溫暖和安全感。ESFJ的核心驅動力是外向情感（Fe）主導，他們追求外界的和諧，對他人需求感同身受，並渴望建立深刻連結。決策時，優先考量的是「人」的價值與人際和諧，比起純粹的邏輯對錯，更在乎圍的價值觀認同與共好。`,
    strengths:`而內向實感（Si）的輔助功能帶來的務實與細心，讓他們能將對人的關懷轉化為高效完成任務的實際行動。然而，這種以他人為中心的特質若過度發展，常成為ESFJ最大的壓力來源。為取悅他人或維持表面和平，有時會過度犧牲個人需求、習慣迴避衝突，陷入不敢表達反對意見的困境。例如，當同事下班前臨時拿來一份急件，ESFJ即使原本已排進計畫，先想到的是拒絕後對方的失望、怕關係變尬尬，因此還是為了顧全大局而習慣妥協。`,
    growth:`ESFJ需要學習管理衝突，評估自身需求並設下界線，試著問自己「我不好意思說不的理由是什麼？」停止無底線地討好。對於嚮往和諧環境的ESFJ而言，只要能感覺到大家感情融洽、互相關心，就會發揮出極高的熱情與效率。`,
    collab:`和ESFJ同事共事時，宜多給予情感上的回饋，如先肯定對方的出發點和價值觀，再提出疑慮和建議。對於嚮往和諧環境的ESFJ而言，只要能感覺到大家感情融洽、互相關心，就會發揮出極高的熱情與效率。與ESFJ合作，請直接但溫和地表達期望，避免讓對話落入模糊地帶。`,
  },
  ENFJ:{
    title:"激勵高手", subtitle:"天生領袖魅力讓人願意跟隨，停止過度迎合，適時照顧自己",
    emoji:"🌍", color:"#6E4E8C", tags:["超強親和力、影響力","內建情緒偵測雷達","做事認真負責"],
    desc:`如果要在電影裡找一個對應的形象，ENFJ比較像那種在隊伍快要潰散的時候，不靠命令、而是靠一句話就讓所有人重新站起來的那個角色。他們的魅力是讓人相信「這件事值得做，而且我們做得到」，而不是以權威，或是強制性的規則逼他人遵守。

ENFJ在MBTI中被稱為「主角型」，最發達的心智功能是「外向情感」（Fe），對情緒超強的感知偵測能力；誰需要被安慰、現在的氛圍適合推進還是緩一緩，ENFJ幾乎總是有辦法提供適當的情緒價值，最後透過普遍意贏得合作。ENFJ的輔助功能「內向直覺」（Ni）讓他們往往能比當事人更早看見一個人的潛力，對「事情最終會走向哪裡」有清晰的預感。兩者疊加讓ENFJ可以同時感受你現在的狀態，以及想像你可以成為的樣子。這使他們在人才培育、組織變革、危機調解等情境中特別能發揮所長。`,
    strengths:`ENFJ對外部事物的判斷力強，渴望做出決定與解決問題，做事認真負責，即使是小事也傾向有條不紊。他們可能會對身旁每個人倡導自己認為適合當下情況的情緒價值，並以此作為達到關心的方式之一。同樣目標明確、做事有條理，但只差一個字母的ENTJ是靠邏輯和系統推動事情，ENFJ則是靠人心和共識推動事情。`,
    growth:`ENFJ也是傾向長期把他人的需求放在第一位，但這也可能讓他們有時忽略自己的價值，把自我評價建立在外部回應上，而非穩定的內在根據。作為ENFJ，也要適時記得照顧自己的感受。`,
    collab:`和ENFJ共事，可以留意他們通常對「先談事、後談人」的溝通方式感到疏離，若能在給出建議前先確認彼此的理解與感受，能讓對話更順暢。他人真誠認可對ENFJ來說有相當的重量，不只是情感上的滿足，更直接影響他們投入的深度。給他們空間主導流程、影響人心，他們往往會以加倍的付出回應這份信任。`,
  },
  ENTJ:{
    title:"效率狂人", subtitle:"有遠見有魄力的強勢領導者，學會顧及隊友才能帶人帶心",
    emoji:"👑", color:"#6A3020", tags:["建立系統、驅動結果","在混亂中建立秩序","殺伐決斷、好勝心強"],
    desc:`若說有哪種特質，是大眾認為大企業的CEO該有的樣子，很可能是ENTJ。他們是那個站在高處、手執地圖，開口第一句就是「問題在哪、怎麼解決、誰負責」的人。這群被稱為「指揮官型」的人格，大腦裡沒有「試試看」，只有「怎麼做」。

ENTJ面對混亂的系統時如魚得水，能立刻拆解問題、梳理流程、果斷拍板，並在短時間內建立行動方案。同時，他們對理論的接受度高、對長期可能性與結果有強烈關注，擅長洞察趨勢、提出遠見型的戰略方向。這樣的組合，讓ENTJ像是一具裝了雷達的破冰船：一邊看著遠方的地平線，一邊拆解眼前的阻礙，具有達到目標的執行力和想像力，又能化解半路上的各種危機。這個組合在管理職或創業情境中尤其強大，他們討厭模糊、半途而廢，以及任何看不出目的的事情，在他們眼中，效率只是基本要求。

聽來是工作的神隊友，但與ENTJ共事，也因為重視清楚、有效率、不繞彎，容易被認為是言談冷漠或強硬，實際上，那是因為他們完全專注於目標，認為任何多餘的感性都是干擾。`,
    strengths:`對於ENTJ而言，劣勢功能是內向情感（Fi），ENTJ容易在極端壓力下暴怒，或犯下情緒性的決策錯誤。此外，一位優秀的ENTJ領導者，身邊最好有一位實感型（S）的夥伴，幫忙把好細節的螺絲，防止宏大的計畫因忽視微小事實而崩場。對於ENTJ而言，最大的挑戰不是「如何贏」，而是「如何停」。練習在決策前停一秒，問自己：「這個決定對身邊的人意味著什麼？」接受不同步調的人存在，讓團隊合作順暢，讓計畫落地更紮實。`,
    growth:`身為ENTJ，你總是忙著為眾人導航、為世界解決麻煩。請記得，你的價值不只存在於你的戰功與績效堂。當夜深人靜、導航系統暫時關閉時，也請聆聽內心的聲音。在成就偉大事業的同時，別忘了照顧那個撐著鋼鐵外殼、不肯示弱的自己。`,
    collab:`如果你需要更多細節或尋求安慰與支持，可以直接表達你的需求，ENTJ通常比你想像的更願意調整。與ENTJ合作，最有效的方式是以邏輯、具體數據和目標成果來溝通，說清楚「這個決策能帶來什麼效益」。避免過多情緒性的表達，改以事實為主，就能和ENTJ建立高效的合作關係。`,
  },
};

const TYPE_ORDER = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];

async function sendToSheet(name, mbti, title) {
  if (!SHEET_URL || SHEET_URL.includes('你的部署ID')) return;
  try {
    await fetch(SHEET_URL, { method:'POST', body: JSON.stringify({ name, mbti, title }) });
  } catch(e) {
    console.warn('Google Sheets 寫入失敗（不影響使用）：', e.message);
  }
}

// ─── STYLES ──────────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700;900&family=Noto+Sans+TC:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:#FAF5EE;}
  .fi{animation:fi 0.45s ease forwards;} @keyframes fi{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  .su{animation:su 0.38s cubic-bezier(0.16,1,0.3,1) forwards;} @keyframes su{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  .ch{background:#fff;border:2px solid #E8DDD0;border-radius:14px;padding:17px 20px;cursor:pointer;transition:all 0.18s;display:flex;gap:14px;align-items:flex-start;text-align:left;width:100%;font-family:'Noto Sans TC',sans-serif;font-size:14px;line-height:1.7;color:#2C2C2E;}
  .ch:hover{border-color:#C4614A;background:#FFF8F5;transform:translateY(-1px);box-shadow:0 4px 16px rgba(196,97,74,0.1);}
  .ch.sa{border-color:#C4614A;background:#FFF0EC;} .ch.sb{border-color:#4E6B8C;background:#EEF3F8;}
  .ch.fa{animation:flA 0.32s ease;} .ch.fb{animation:flB 0.32s ease;}
  @keyframes flA{50%{background:#FFE0D8;border-color:#C4614A;}} @keyframes flB{50%{background:#D8E4F0;border-color:#4E6B8C;}}
  .bd{min-width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;margin-top:2px;}
  .ba{background:#FDE8E2;color:#C4614A;} .bb{background:#E2EBF4;color:#4E6B8C;}
  .pb{height:4px;background:#E8DDD0;border-radius:99px;overflow:hidden;}
  .pf{height:100%;border-radius:99px;background:linear-gradient(90deg,#C4614A,#E8A54B);transition:width 0.4s;}
  .bp{background:#1C1C1E;color:#FAF5EE;border:none;border-radius:10px;padding:13px 26px;font-family:'Noto Sans TC',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:all 0.18s;} .bp:hover{background:#3A3A3C;transform:translateY(-1px);}
  .bg{background:transparent;color:#6E6E73;border:1.5px solid #D8CFC6;border-radius:10px;padding:11px 22px;font-family:'Noto Sans TC',sans-serif;font-weight:500;font-size:14px;cursor:pointer;transition:all 0.18s;} .bg:hover{border-color:#8E8E93;color:#1C1C1E;}
  .ba2{background:#C4614A;color:#fff;border:none;border-radius:10px;padding:13px 26px;font-family:'Noto Sans TC',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:all 0.18s;} .ba2:hover{background:#A84E3A;transform:translateY(-1px);}
  .ni{width:100%;padding:13px 17px;border:2px solid #E8DDD0;border-radius:12px;font-family:'Noto Sans TC',sans-serif;font-size:16px;color:#1C1C1E;background:#fff;outline:none;transition:border-color 0.18s;} .ni:focus{border-color:#C4614A;} .ni::placeholder{color:#AEAEB2;}
  .cp{background:#F4EDE4;color:#5C4033;border-radius:8px;padding:5px 10px;font-size:12px;font-family:'Noto Sans TC',sans-serif;display:inline-block;}
  .cd{background:#fff;border:1px solid #EDE4D8;border-radius:16px;padding:22px;margin-bottom:12px;}
  .tp{background:#F4EDE4;border-radius:10px;padding:9px 15px;display:flex;align-items:center;justify-content:space-between;font-family:'Noto Sans TC',sans-serif;}
  .tb{background:#fff;border:1.5px solid #E8DDD0;border-radius:12px;padding:14px 10px;cursor:pointer;transition:all 0.18s;text-align:center;font-family:'Noto Sans TC',sans-serif;} .tb:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(0,0,0,0.08);}
  .tt{flex-shrink:0;border-radius:8px;padding:7px 14px;font-family:'Noto Sans TC',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.18s;border:1.5px solid #D8CFC6;}
  .ft{background:#1C1C1E;color:#8E8E93;text-align:center;padding:18px 20px;font-family:'Noto Sans TC',sans-serif;font-size:12px;letter-spacing:0.5px;line-height:1.9;}
  @media(max-width:600px){.ch{font-size:13px;padding:13px 14px;}}
`;

// ─── APP ─────────────────────────────────────────────────────────────
export default function App() {
  const [phase,setPhase]=useState('intro');
  const [name,setName]=useState('');
  const [ans,setAns]=useState({});
  const [qIdx,setQIdx]=useState(0);
  const [mbti,setMbti]=useState(null);
  const [team,setTeam]=useState([]);
  const [flash,setFlash]=useState(null);
  const [aKey,setAKey]=useState(0);
  const [browse,setBrowse]=useState(null);

  useEffect(()=>{
    (async()=>{try{const r=await window.storage.get('mbti-v7');if(r?.value)setTeam(JSON.parse(r.value));}catch{}})();
  },[]);
  const save=async arr=>{try{await window.storage.set('mbti-v7',JSON.stringify(arr));}catch{}};
  const answered=Object.keys(ans).length;
  const allDone=answered===QUESTIONS.length;

  const pick=opt=>{
    if(flash!==null)return;
    setAns(p=>({...p,[QUESTIONS[qIdx].id]:opt}));
    setFlash(opt);
    setTimeout(()=>{setFlash(null);if(qIdx<QUESTIONS.length-1){setQIdx(i=>i+1);setAKey(k=>k+1);}},350);
  };
  const submit=async()=>{
    const type=calcMBTI(ans);setMbti(type);
    const entry={name,mbti:type,ts:Date.now()};
    const nt=[...team,entry];setTeam(nt);await save(nt);
    await sendToSheet(name,type,TYPES[type]?.title||'');
    setPhase('result');
  };
  const retake=()=>{setAns({});setQIdx(0);setMbti(null);setFlash(null);setAKey(k=>k+1);setBrowse(null);setPhase('intro');};

  return(
    <div style={{minHeight:'100vh',background:'#FAF5EE',fontFamily:"'Noto Serif TC',Georgia,serif",display:'flex',flexDirection:'column'}}>
      <style>{G}</style>
      <div style={{flex:1}}>
        {phase==='intro'&&!browse&&<Intro name={name} setName={setName} team={team} onStart={()=>{if(name.trim())setPhase('quiz');}} onTeam={()=>setPhase('team')} onBrowse={()=>setPhase('browse')}/>}
        {phase==='quiz'&&<Quiz q={QUESTIONS[qIdx]} qIdx={qIdx} total={QUESTIONS.length} answered={answered} allDone={allDone} flash={flash} ans={ans} aKey={aKey} onPick={pick} onBack={()=>setPhase('intro')} onJump={i=>{setQIdx(i);setAKey(k=>k+1);}} onSubmit={submit}/>}
        {phase==='result'&&!browse&&<Result name={name} mbti={mbti} data={TYPES[mbti]} onRetake={retake} onTeam={()=>setPhase('team')} onBrowse={()=>setPhase('browse')}/>}
        {phase==='browse'&&!browse&&<Browse onSelect={t=>setBrowse(t)} onBack={()=>setPhase(mbti?'result':'intro')}/>}
        {browse&&<Detail type={browse} data={TYPES[browse]} onSelect={t=>setBrowse(t)} onBack={()=>setBrowse(null)}/>}
        {phase==='team'&&<Team team={team} onBack={()=>setPhase(mbti?'result':'intro')} onClear={async()=>{setTeam([]);await save([]);}}/>}
      </div>
      <footer className="ft">奇美醫療財團法人奇美醫院品質管理部內部訓練專用<br/>資料來源：《經理人》2026年4月號「MBTI工作術」</footer>
    </div>
  );
}

// ─── INTRO ───────────────────────────────────────────────────────────
function Intro({name,setName,team,onStart,onTeam,onBrowse}){
  return(
    <div className="fi" style={{maxWidth:480,margin:'0 auto',padding:'44px 22px'}}>
      <div style={{marginBottom:36}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
          <div style={{width:3,height:34,background:'#C4614A',borderRadius:2}}/>
          <div>
            <div style={{fontFamily:"'Noto Sans TC'",fontSize:11,letterSpacing:'2px',color:'#8E8E93',textTransform:'uppercase',marginBottom:2}}>MBTI 工作測驗</div>
            <div style={{fontFamily:"'Noto Sans TC'",fontSize:11,color:'#AEAEB2'}}>奇美醫院品質管理部內部訓練</div>
          </div>
        </div>
        <h1 style={{fontSize:30,fontWeight:900,lineHeight:1.25,color:'#1C1C1E',marginBottom:10}}>20道題，<br/>測出你的工作 MBTI</h1>
        <p style={{fontFamily:"'Noto Sans TC'",fontSize:14,color:'#6E6E73',lineHeight:1.8}}>填答時請憑直覺作答，不要過度思考。16型人格沒有標準答案，只有最真實的你。</p>
      </div>
      <div className="cd" style={{marginBottom:22}}>
        <div style={{fontFamily:"'Noto Sans TC'",fontSize:13,color:'#5C4033',lineHeight:1.9}}>
          <div style={{marginBottom:5}}>📌 每題只選 a 或 b，選完自動進入下一題</div>
          <div style={{marginBottom:5}}>⏱️ 全程約 3–5 分鐘，請憑直覺快速填答</div>
          <div>🎯 完成後可查看完整 16 型人格解析與職場建議</div>
        </div>
      </div>
      <div style={{marginBottom:22}}>
        <label style={{display:'block',fontFamily:"'Noto Sans TC'",fontSize:13,color:'#6E6E73',marginBottom:7,fontWeight:500}}>輸入你的姓名（供團隊統計使用）</label>
        <input className="ni" placeholder="例：王小明" value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')onStart();}} maxLength={20}/>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        <button className="bp" onClick={onStart} style={{opacity:name.trim()?1:0.45}}>開始測驗 →</button>
        <button className="bg" onClick={onBrowse}>📖 瀏覽 16 型人格說明</button>
        {team.length>0&&<button className="bg" onClick={onTeam}>📊 查看團隊分佈（{team.length} 人已完成）</button>}
      </div>
      <div style={{marginTop:36,borderTop:'1px solid #EDE4D8',paddingTop:22}}>
        <div style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#AEAEB2',marginBottom:12,letterSpacing:'1px',textTransform:'uppercase'}}>計分維度說明</div>
        {[['1・5・8・11・15','E 外向型','I 內向型'],['4・6・10・16・18','S 實感型','N 直覺型'],['2・9・13・14・19','T 思考型','F 情感型'],['3・7・12・17・20','J 判斷型','P 認知型']].map(([qs,a,b])=>(
          <div key={qs} style={{display:'flex',gap:8,alignItems:'center',marginBottom:7}}>
            <div style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#AEAEB2',width:128,flexShrink:0}}>題 {qs}</div>
            <div style={{display:'flex',gap:5}}>
              <span style={{background:'#FDE8E2',color:'#C4614A',borderRadius:6,padding:'2px 7px',fontSize:11,fontWeight:600,fontFamily:"'Noto Sans TC'"}}>a→{a}</span>
              <span style={{background:'#E2EBF4',color:'#4E6B8C',borderRadius:6,padding:'2px 7px',fontSize:11,fontWeight:600,fontFamily:"'Noto Sans TC'"}}>b→{b}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BROWSE ──────────────────────────────────────────────────────────
function Browse({onSelect,onBack}){
  const groups=[
    {label:'分析家 NT',types:['INTJ','INTP','ENTJ','ENTP']},
    {label:'外交家 NF',types:['INFJ','INFP','ENFJ','ENFP']},
    {label:'守衛者 SJ',types:['ISTJ','ISFJ','ESTJ','ESFJ']},
    {label:'探索家 SP',types:['ISTP','ISFP','ESTP','ESFP']},
  ];
  return(
    <div className="fi" style={{maxWidth:520,margin:'0 auto',padding:'36px 20px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,color:'#1C1C1E'}}>16 型人格說明</h1>
          <div style={{fontFamily:"'Noto Sans TC'",fontSize:13,color:'#8E8E93',marginTop:3}}>點選任一類型查看完整解析與職場建議</div>
        </div>
        <button className="bg" onClick={onBack} style={{fontSize:13,padding:'8px 16px'}}>← 返回</button>
      </div>
      {groups.map(g=>(
        <div key={g.label} style={{marginBottom:22}}>
          <div style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#AEAEB2',letterSpacing:'1px',textTransform:'uppercase',marginBottom:10}}>{g.label}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {g.types.map(type=>{
              const d=TYPES[type];
              return(
                <button key={type} className="tb" onClick={()=>onSelect(type)} style={{borderColor:d.color+'40'}}>
                  <div style={{fontSize:26,marginBottom:6}}>{d.emoji}</div>
                  <div style={{fontWeight:900,fontSize:20,color:d.color,letterSpacing:'2px',marginBottom:3}}>{type}</div>
                  <div style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#3C3C3E',fontWeight:600,marginBottom:5}}>{d.title}</div>
                  <div style={{fontFamily:"'Noto Sans TC'",fontSize:11,color:'#8E8E93',lineHeight:1.5}}>{d.tags[0]}</div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── DETAIL ──────────────────────────────────────────────────────────
function Detail({type,data,onSelect,onBack}){
  const [tab,setTab]=useState('desc');
  const tabs=[['desc','人格特質'],['strengths','職場優勢'],['growth','成長建議'],['collab','合作須知']];
  const idx=TYPE_ORDER.indexOf(type);
  const prev=TYPE_ORDER[idx-1],next=TYPE_ORDER[idx+1];
  return(
    <div className="fi" style={{maxWidth:520,margin:'0 auto',padding:'36px 20px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <button className="bg" onClick={onBack} style={{fontSize:13,padding:'8px 16px'}}>← 返回清單</button>
        <div style={{display:'flex',gap:6}}>
          {prev&&<button className="bg" onClick={()=>onSelect(prev)} style={{fontSize:12,padding:'6px 12px'}}>← {prev}</button>}
          {next&&<button className="bg" onClick={()=>onSelect(next)} style={{fontSize:12,padding:'6px 12px'}}>{next} →</button>}
        </div>
      </div>
      <div style={{background:'#fff',borderRadius:20,padding:'26px',marginBottom:14,border:'1px solid #EDE4D8'}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:14}}>
          <div style={{width:64,height:64,borderRadius:16,background:data.color+'18',border:`2px solid ${data.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,flexShrink:0}}>{data.emoji}</div>
          <div>
            <div style={{fontSize:38,fontWeight:900,color:data.color,letterSpacing:'3px',lineHeight:1}}>{type}</div>
            <div style={{fontSize:16,fontWeight:700,color:'#1C1C1E',marginTop:3}}>{data.title}</div>
          </div>
        </div>
        <div style={{background:'#FAF5EE',borderRadius:10,padding:'9px 13px',marginBottom:12}}>
          <div style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#5C4033',fontWeight:500,lineHeight:1.6}}>{data.subtitle}</div>
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{data.tags.map((t,i)=><span key={i} className="cp"># {t}</span>)}</div>
      </div>
      <div style={{display:'flex',gap:6,marginBottom:12,overflowX:'auto',paddingBottom:2}}>
        {tabs.map(([key,label])=>(
          <button key={key} className="tt" onClick={()=>setTab(key)}
            style={{background:tab===key?data.color:'#fff',color:tab===key?'#fff':'#6E6E73',borderColor:tab===key?data.color:'#D8CFC6'}}>
            {label}
          </button>
        ))}
      </div>
      <div className="cd" key={tab} style={{minHeight:220}}>
        <p style={{fontFamily:"'Noto Sans TC'",fontSize:14,color:'#3C3C3E',lineHeight:2.1,whiteSpace:'pre-line'}}>{data[tab]}</p>
      </div>
    </div>
  );
}

// ─── QUIZ ────────────────────────────────────────────────────────────
function Quiz({q,qIdx,total,answered,allDone,flash,ans,aKey,onPick,onBack,onJump,onSubmit}){
  return(
    <div style={{maxWidth:520,margin:'0 auto',padding:'30px 20px 56px'}}>
      <div style={{marginBottom:28}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:9}}>
          <button className="bg" onClick={onBack} style={{padding:'6px 13px',fontSize:13}}>← 返回</button>
          <div style={{fontFamily:"'Noto Sans TC'",fontSize:13,color:'#8E8E93',fontWeight:500}}>{answered} / {total} 已完成</div>
        </div>
        <div className="pb"><div className="pf" style={{width:`${(answered/total)*100}%`}}/></div>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:22}}>
        {Array.from({length:total}).map((_,i)=>{
          const id=QUESTIONS[i].id,a=ans[id],cur=i===qIdx;
          return <div key={i} onClick={()=>onJump(i)} style={{width:22,height:22,borderRadius:'50%',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,fontFamily:"'Noto Sans TC'",border:cur?'2px solid #C4614A':'2px solid transparent',background:a==='a'?'#FDE8E2':a==='b'?'#E2EBF4':'#EDE4D8',color:a==='a'?'#C4614A':a==='b'?'#4E6B8C':'#AEAEB2',transition:'all 0.18s',transform:cur?'scale(1.12)':'scale(1)'}}>{i+1}</div>;
        })}
      </div>
      {!allDone?(
        <div key={aKey} className="su">
          <div style={{marginBottom:18}}>
            <div style={{fontFamily:"'Noto Sans TC'",fontSize:11,letterSpacing:'2px',color:'#AEAEB2',textTransform:'uppercase',marginBottom:9}}>QUESTION {qIdx+1}</div>
            <h2 style={{fontSize:17,fontWeight:700,lineHeight:1.6,color:'#1C1C1E'}}>{q.text}</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:11}}>
            {['a','b'].map(opt=>(
              <button key={opt} className={`ch${flash===opt?` f${opt}`:ans[q.id]===opt?` s${opt}`:''}`} onClick={()=>onPick(opt)}>
                <span className={`bd b${opt}`}>{opt}</span>
                <span>{opt==='a'?q.a:q.b}</span>
              </button>
            ))}
          </div>
          <div style={{marginTop:22}}>
            <button className="bg" onClick={()=>qIdx>0&&onJump(qIdx-1)} style={{opacity:qIdx>0?1:0.3,fontSize:13,padding:'7px 14px'}}>← 上一題</button>
          </div>
        </div>
      ):(
        <div className="su" style={{textAlign:'center',padding:'18px 0'}}>
          <div style={{fontSize:48,marginBottom:14}}>✅</div>
          <h2 style={{fontSize:21,fontWeight:700,color:'#1C1C1E',marginBottom:7}}>20 題全部完成！</h2>
          <p style={{fontFamily:"'Noto Sans TC'",fontSize:14,color:'#6E6E73',marginBottom:26}}>點擊下方按鈕查看你的 MBTI 類型與職場分析</p>
          <button className="ba2" onClick={onSubmit} style={{fontSize:16,padding:'15px 34px'}}>查看我的 MBTI 結果 →</button>
        </div>
      )}
    </div>
  );
}

// ─── RESULT ──────────────────────────────────────────────────────────
function Result({name,mbti,data,onRetake,onTeam,onBrowse}){
  const [tab,setTab]=useState('desc');
  const tabs=[['desc','人格特質'],['strengths','職場優勢'],['growth','成長建議'],['collab','合作須知']];
  if(!data)return null;
  return(
    <div className="fi" style={{maxWidth:520,margin:'0 auto',padding:'36px 20px'}}>
      <div style={{background:'#fff',borderRadius:20,padding:'26px',marginBottom:12,boxShadow:'0 2px 22px rgba(0,0,0,0.06)',border:'1px solid #EDE4D8'}}>
        <div style={{fontFamily:"'Noto Sans TC'",fontSize:11,letterSpacing:'2px',color:'#AEAEB2',textTransform:'uppercase',marginBottom:14}}>{name} 的測驗結果</div>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:14}}>
          <div style={{width:64,height:64,borderRadius:16,background:data.color+'18',border:`2px solid ${data.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,flexShrink:0}}>{data.emoji}</div>
          <div>
            <div style={{fontSize:38,fontWeight:900,color:data.color,letterSpacing:'3px',lineHeight:1}}>{mbti}</div>
            <div style={{fontSize:17,fontWeight:700,color:'#1C1C1E',marginTop:3}}>{data.title}</div>
          </div>
        </div>
        <div style={{background:'#FAF5EE',borderRadius:10,padding:'9px 13px',marginBottom:12}}>
          <div style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#5C4033',fontWeight:500,lineHeight:1.6}}>{data.subtitle}</div>
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{data.tags.map((t,i)=><span key={i} className="cp"># {t}</span>)}</div>
      </div>
      <div style={{display:'flex',gap:6,marginBottom:12,overflowX:'auto',paddingBottom:2}}>
        {tabs.map(([key,label])=>(
          <button key={key} className="tt" onClick={()=>setTab(key)}
            style={{background:tab===key?data.color:'#fff',color:tab===key?'#fff':'#6E6E73',borderColor:tab===key?data.color:'#D8CFC6'}}>
            {label}
          </button>
        ))}
      </div>
      <div className="cd" key={tab} style={{minHeight:160}}>
        <p style={{fontFamily:"'Noto Sans TC'",fontSize:14,color:'#3C3C3E',lineHeight:2.1,whiteSpace:'pre-line'}}>{data[tab]}</p>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:9,marginTop:4}}>
        <button className="bg" onClick={onBrowse}>📖 瀏覽其他人格類型</button>
        <button className="bg" onClick={onTeam}>📊 查看團隊分佈</button>
        <button className="bg" onClick={onRetake} style={{fontSize:13}}>重新作答</button>
      </div>
    </div>
  );
}

// ─── TEAM ────────────────────────────────────────────────────────────
function Team({team,onBack,onClear}){
  const counts={};
  team.forEach(e=>{counts[e.mbti]=(counts[e.mbti]||0)+1;});
  const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  const mx=sorted[0]?.[1]||1;
  const db={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
  team.forEach(e=>e.mbti.split('').forEach(c=>db[c]++));
  return(
    <div className="fi" style={{maxWidth:520,margin:'0 auto',padding:'36px 20px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:26}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,color:'#1C1C1E'}}>團隊 MBTI 分佈</h1>
          <div style={{fontFamily:"'Noto Sans TC'",fontSize:13,color:'#8E8E93',marginTop:3}}>共 {team.length} 人完成測驗</div>
        </div>
        <button className="bg" onClick={onBack}>← 返回</button>
      </div>
      {team.length===0?(
        <div style={{textAlign:'center',padding:'56px 20px',color:'#AEAEB2',fontFamily:"'Noto Sans TC'",fontSize:14}}>尚無人完成測驗</div>
      ):(
        <>
          <div className="cd">
            <div style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#AEAEB2',letterSpacing:'1px',textTransform:'uppercase',marginBottom:14}}>類型分佈</div>
            {sorted.map(([type,cnt])=>{
              const d=TYPES[type];
              return(
                <div key={type} style={{marginBottom:11}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                    <div style={{display:'flex',alignItems:'center',gap:7}}>
                      <span style={{fontSize:15}}>{d?.emoji||'?'}</span>
                      <span style={{fontFamily:"'Noto Sans TC'",fontSize:13,fontWeight:700,color:d?.color||'#555'}}>{type}</span>
                      <span style={{fontFamily:"'Noto Sans TC'",fontSize:11,color:'#8E8E93'}}>{d?.title}</span>
                    </div>
                    <span style={{fontFamily:"'Noto Sans TC'",fontSize:13,fontWeight:600,color:'#1C1C1E'}}>{cnt}人</span>
                  </div>
                  <div className="pb" style={{height:6}}><div className="pf" style={{width:`${(cnt/mx)*100}%`,background:d?.color||'#C4614A'}}/></div>
                </div>
              );
            })}
          </div>
          <div className="cd">
            <div style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#AEAEB2',letterSpacing:'1px',textTransform:'uppercase',marginBottom:14}}>維度分析</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px 22px'}}>
              {[['外向 E','E','#C4614A'],['內向 I','I','#4E6B8C'],['實感 S','S','#5A8A6E'],['直覺 N','N','#6E5A9E'],['思考 T','T','#2E5470'],['情感 F','F','#A06050'],['判斷 J','J','#3A6080'],['認知 P','P','#C87E28']].map(([lbl,k,c])=>(
                <div key={k}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                    <span style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#3C3C3E',fontWeight:500}}>{lbl}</span>
                    <span style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#8E8E93'}}>{db[k]}人</span>
                  </div>
                  <div className="pb" style={{height:6}}><div className="pf" style={{width:team.length>0?`${(db[k]/team.length)*100}%`:'0%',background:c}}/></div>
                </div>
              ))}
            </div>
          </div>
          <div className="cd" style={{marginBottom:18}}>
            <div style={{fontFamily:"'Noto Sans TC'",fontSize:12,color:'#AEAEB2',letterSpacing:'1px',textTransform:'uppercase',marginBottom:14}}>成員名單</div>
            <div style={{display:'flex',flexDirection:'column',gap:7}}>
              {[...team].reverse().map((e,i)=>{
                const d=TYPES[e.mbti];
                return(
                  <div key={i} className="tp">
                    <div style={{display:'flex',alignItems:'center',gap:9}}>
                      <span style={{fontSize:15}}>{d?.emoji||'?'}</span>
                      <span style={{fontFamily:"'Noto Sans TC'",fontSize:14,color:'#1C1C1E',fontWeight:500}}>{e.name}</span>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:7}}>
                      <span style={{fontFamily:"'Noto Sans TC'",fontSize:13,fontWeight:700,color:d?.color||'#555'}}>{e.mbti}</span>
                      <span style={{fontFamily:"'Noto Sans TC'",fontSize:11,color:'#AEAEB2'}}>{new Date(e.ts).toLocaleDateString('zh-TW',{month:'short',day:'numeric'})}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="bg" onClick={onClear} style={{fontSize:13,color:'#FF3B30',borderColor:'#FFCCC8',width:'100%'}}>清除所有紀錄</button>
        </>
      )}
    </div>
  );
}
