# ChiMeiRA 2026 視覺素材

## AI 原創主題底圖

三張底圖由內建影像生成製作，不含文字、人像或Logo；HTML疊加可讀文字與CSS動態光帶。

- Clinical Value：青藍／海軍藍，神經網路與精準流線。
- Governance：靛藍／紫色，有序節點與互連路徑。
- Sustainability：翡翠／薄荷／暖金，持續學習網路與軌道。

## 講師漫畫參考照片

漫畫由內建影像生成依下列具姓名及職務的公開人物照片轉繪，保留相貌、髮型、眼鏡及服裝；非講師本人提供或審定的官方肖像。人物與banner標題由HTML組合，不將名字烘焙在圖片內。

- 湯宏仁：奇美醫院院長室介紹（副院長）。https://www.chimei.org.tw/newindex/about/cmh_superintendent.html
  參考圖：https://www.chimei.org.tw/newindex/assets/img/about/superintendent/cmh-02-Tang-Hung-Jen.jpg?v=20250803
- 廖家德：FUTEX未來科技館官方講者頁，本一科技技術長兼共同創辦人、奇美醫院教學部部長。https://www.futuretech.org.tw/futuretech/index.php?action=brands_detail&br_uid=421&web_lang=en-us
  參考圖：https://www.futuretech.org.tw/futuretech/uploads/uploads_brands/website_87/brands_492_3_688.png
- 陳世英：新竹臺大分院副院長簡介。https://www.hch.gov.tw/?aid=210&iid=6
  參考圖：https://www.hch.gov.tw/public/public_co_vice/210/17683691028418.jpg

所有原始生成底圖1536×1024；漫畫1024×1536且具透明alpha。網站僅使用WebP格式壓縮版；沒有更動生成圖的構圖或內容。

## 原始品牌與活動照片

`chimeira-original-logo.jpg`：既有ChiMeiRA盾徽，保持原圖。星系以原創Canvas/CSS製作；視覺方向參考使用者提供的本一產品星系。
`2025-*`：既有2025活動實景照，仅用於2025回顧及相簿，保留年份標示。

## 完整生成提示詞

### background-prompts.json

```json
[
  {
    "key": "clinical-value-teal-cyan",
    "prompt": "Use case: stylized-concept. Asset type: original premium raster background for a ChiMeiRA medical AI symposium website chapter header. Landscape 1536x1024. Refined science fiction editorial abstraction, sophisticated luminous gradients, realistic translucent glass filaments and exceptionally smooth atmospheric color. Composition: main graceful sculptural textures in the upper-right and right third; generous calm very dark negative space across the left two thirds and lower half, suitable for live HTML text and extreme wide 1150x180 header cropping. High quality with subtly dimensional light and fine delicate neural connections, restrained orbit rings. No people, no faces, no words, letters, numbers, logos, icons, labels, diagrams, UI panels, watermark, or busy gaming aesthetic. Primary request: abstract precision neural wave, like fine cyan and teal fiber-optic intelligence gathering into an elegant translucent flowing wave at upper right. Color palette: deep navy and midnight blue base; turquoise, teal, icy cyan highlights with subtle cool pale blue glow. Lighting: clean clinical precision, luminous but restrained. Design unified enough for a speaker card backdrop crop."
  },
  {
    "key": "governance-indigo-violet",
    "prompt": "Use case: stylized-concept. Asset type: original premium raster background for a ChiMeiRA medical AI symposium website chapter header. Landscape 1536x1024. Refined science fiction editorial abstraction, sophisticated luminous gradients, realistic translucent glass filaments and exceptionally smooth atmospheric color. Composition: main graceful sculptural textures in the upper-right and right third; generous calm very dark negative space across the left two thirds and lower half, suitable for live HTML text and extreme wide 1150x180 header cropping. High quality with subtly dimensional light and fine delicate neural connections, restrained orbit rings. No people, no faces, no words, letters, numbers, logos, icons, labels, diagrams, UI panels, watermark, or busy gaming aesthetic. Primary request: graceful orderly interconnected paths of luminous glass light, intelligently flowing in smooth disciplined arcs around a few elegant translucent orbital rings at upper right. Color palette: deep navy and dark indigo base with violet, periwinkle, lilac and pale ice blue light. Lighting: calm, trustworthy, deliberate, nuanced premium gradients. Design unified enough for a speaker card backdrop crop."
  },
  {
    "key": "sustainability-emerald-gold",
    "prompt": "Use case: stylized-concept. Asset type: original premium raster background for a ChiMeiRA medical AI symposium website chapter header. Landscape 1536x1024. Refined science fiction editorial abstraction, sophisticated luminous gradients, realistic translucent glass filaments and exceptionally smooth atmospheric color. Composition: main graceful sculptural textures in the upper-right and right third; generous calm very dark negative space across the left two thirds and lower half, suitable for live HTML text and extreme wide 1150x180 header cropping. High quality with subtly dimensional light and fine delicate neural connections, restrained orbit rings. No people, no faces, no words, letters, numbers, logos, icons, labels, diagrams, UI panels, watermark, or busy gaming aesthetic. Primary request: abstract organic learning-network, finely branching emerald and mint luminous filaments forming graceful evolving growth patterns and one gentle translucent orbital arc at upper right. Color palette: rich deep green and dark petrol base, emerald, mint and delicate warm gold light. Lighting: sustainable intelligence, organic calm, warm highlights in beautiful green gradients. Design unified enough for a speaker card backdrop crop."
  }
]

```

### portrait-prompts.json

```json
[
  {
    "key": "tang",
    "reference": "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/references/tang.jpg",
    "prompt": "Use case: identity-preserve / style-transfer. Asset type: transparent professional comic portrait for a medical AI symposium website banner. Input image 1 is the verified photo of this individual and is the identity source. Transform this actual person into a polished professional editorial graphic-novel illustration with clean elegant ink lines, refined cel shading, restrained realistic texture, actual realistic facial proportions and strong recognizable likeness. Preserve face shape, distinctive smile/expression, facial features, actual glasses, hairstyle, hair color, age and skin tone. Friendly warm approachable professional bearing. Compose chest-up, centered, complete head and all hair uncut with comfortable space above and beside the head, portrait canvas 1024x1536. Truly transparent alpha background, clean cutout edges, no backdrop whatsoever. No text, captions, names, watermark, logos, badge emblems, invented insignia or lettering. Clothing may have plain pockets but no writing. Not caricature, not chibi, not cartoon exaggeration; refined stylized portrait of the real individual. Individual details to retain from reference: middle-aged East Asian man with neat side-parted black hair and thin gold rim glasses, rounded face, smiling gently with teeth visible. White physician coat over pale blue collared shirt, retain the coat and shirt but remove badge print and embroidered lettering. Relaxed upright frontal chest-up pose close to the reference. Very subtle cyan rim lighting on outer shoulder contour, natural skin shading."
  },
  {
    "key": "liao",
    "reference": "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/references/liao.png",
    "prompt": "Use case: identity-preserve / style-transfer. Asset type: transparent professional comic portrait for a medical AI symposium website banner. Input image 1 is the verified photo of this individual and is the identity source. Transform this actual person into a polished professional editorial graphic-novel illustration with clean elegant ink lines, refined cel shading, restrained realistic texture, actual realistic facial proportions and strong recognizable likeness. Preserve face shape, distinctive smile/expression, facial features, actual glasses, hairstyle, hair color, age and skin tone. Friendly warm approachable professional bearing. Compose chest-up, centered, complete head and all hair uncut with comfortable space above and beside the head, portrait canvas 1024x1536. Truly transparent alpha background, clean cutout edges, no backdrop whatsoever. No text, captions, names, watermark, logos, badge emblems, invented insignia or lettering. Clothing may have plain pockets but no writing. Not caricature, not chibi, not cartoon exaggeration; refined stylized portrait of the real individual. Individual details to retain from reference: East Asian man with short neatly styled dark hair, dark rectangular eyeglasses, light mustache and faint chin stubble, broad friendly smile with teeth visible. White physician coat over a plain white crew-neck shirt. Preserve recognizable confident smile and his right-hand thumbs-up gesture if it fits naturally within chest-up frame; remove printed coat writing and any logos. Very subtle violet rim lighting on outer shoulder contour, natural skin shading."
  },
  {
    "key": "chen",
    "reference": "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/references/chen.jpg",
    "prompt": "Use case: identity-preserve / style-transfer. Asset type: transparent professional comic portrait for a medical AI symposium website banner. Input image 1 is the verified photo of this individual and is the identity source. Transform this actual person into a polished professional editorial graphic-novel illustration with clean elegant ink lines, refined cel shading, restrained realistic texture, actual realistic facial proportions and strong recognizable likeness. Preserve face shape, distinctive smile/expression, facial features, actual glasses, hairstyle, hair color, age and skin tone. Friendly warm approachable professional bearing. Compose chest-up, centered, complete head and all hair uncut with comfortable space above and beside the head, portrait canvas 1024x1536. Truly transparent alpha background, clean cutout edges, no backdrop whatsoever. No text, captions, names, watermark, logos, badge emblems, invented insignia or lettering. Clothing may have plain pockets but no writing. Not caricature, not chibi, not cartoon exaggeration; refined stylized portrait of the real individual. Individual details to retain from reference: older East Asian man with short silver-gray hair, black rectangular eyeglasses, gentle composed closed-mouth smile, full face and distinctive ears. Plain white collared shirt and black tie matching the reference, no coat. Frontal chest-up pose close to reference. Very subtle emerald and warm gold edge light on outer shoulder contour, natural skin shading."
  }
]

```


## 2026-10-02 姿勢修訂

湯宏仁原圖保留，廖家德與陳世英改為同樣自然、雙臂放鬆的半身姿勢，不含手勢；使用 `liao-comic-v2.webp` 與 `chen-comic-v2.webp`。參照既有漫畫、湯宏仁姿勢與上述公開人物照片，透明背景保持不變。Logo區改用透明星系Canvas融入整體淺色底，不含獨立深色面板、文字標籤或暫停按鈕。

```json
[
  {
    "key": "liao",
    "paths": [
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/liao-comic.png",
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/tang-comic.png",
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/references/liao.png"
    ],
    "prompt": "Use case: identity-preserve. Asset type: transparent editorial comic portrait pose correction. Input image 1 is the edit target portrait; image 2 (Tang portrait) is exclusively the STYLE, POSTURE, HEAD SIZE and FRAMING reference; image 3 is the actual individual's verified identity photo. Edit only the pose and framing of image 1. Keep the actual person from image 1 and image 3, never Tang's identity. Preserve the recognizable face, exact facial features, glasses, hairstyle, hair color, age, skin tone, friendly expression, clothing and existing fine editorial graphic novel ink lines and refined natural cel shading. Change to image 2's natural relaxed chest-up/half-body posture: centered upright torso, gently turned relaxed shoulders, face toward viewer, both arms hanging naturally relaxed beside the torso and low/outside frame, absolutely no visible hands. Match image 2's complete uncut head, relative head size, shoulder width and half-body chest framing within a 1024x1536 portrait canvas, comfortable top margin. Create a smooth natural garment silhouette down to the canvas bottom, with normal relaxed shoulders and sleeves; no stiff angular arms, no asymmetrical rectangular cut-outs, no crossed arms, no gestures, no thumbs-up. True transparent alpha background, no scene, no backdrop, no text, no labels, no logo, no watermark. Do not alter or reproduce Tang's face or outfit details; use only his relaxed pose, style and framing as reference. Identity invariants: Liao's short neatly styled dark hair, black rectangular glasses, light moustache and stubble, wide approachable toothy smile. Keep his plain white doctor coat and plain white crew-neck T-shirt. Remove the existing raised thumbs-up arm completely, replace with naturally lowered arm at his side out of view, no visible hand anywhere. Keep subtle violet edge light."
  },
  {
    "key": "chen",
    "paths": [
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/chen-comic.png",
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/tang-comic.png",
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/references/chen.jpg"
    ],
    "prompt": "Use case: identity-preserve. Asset type: transparent editorial comic portrait pose correction. Input image 1 is the edit target portrait; image 2 (Tang portrait) is exclusively the STYLE, POSTURE, HEAD SIZE and FRAMING reference; image 3 is the actual individual's verified identity photo. Edit only the pose and framing of image 1. Keep the actual person from image 1 and image 3, never Tang's identity. Preserve the recognizable face, exact facial features, glasses, hairstyle, hair color, age, skin tone, friendly expression, clothing and existing fine editorial graphic novel ink lines and refined natural cel shading. Change to image 2's natural relaxed chest-up/half-body posture: centered upright torso, gently turned relaxed shoulders, face toward viewer, both arms hanging naturally relaxed beside the torso and low/outside frame, absolutely no visible hands. Match image 2's complete uncut head, relative head size, shoulder width and half-body chest framing within a 1024x1536 portrait canvas, comfortable top margin. Create a smooth natural garment silhouette down to the canvas bottom, with normal relaxed shoulders and sleeves; no stiff angular arms, no asymmetrical rectangular cut-outs, no crossed arms, no gestures, no thumbs-up. True transparent alpha background, no scene, no backdrop, no text, no labels, no logo, no watermark. Do not alter or reproduce Tang's face or outfit details; use only his relaxed pose, style and framing as reference. Identity invariants: Chen's short silver-gray hair, black rectangular glasses, full face, distinctive ears and composed gentle closed-mouth smile. Keep his plain white collared shirt and black tie, no doctor coat. Make shoulders and torso mildly turned and relaxed like Tang's reference rather than a stiff squared frontal posture, face toward viewer. No visible hands, arms relaxed at his sides low/outside frame. Keep subtle emerald/gold edge light."
  }
]

```

## 2026-10-02 · 完整肩臂與微笑肖像 v3

使用內建 image_gen，保留漫畫辨識特徵與服裝；三位皆完整肩臂及雙手、自然微笑。廖家德依本次使用者提供的照片更新相貌與白袍、襯衫、領帶。網站以 contain 呈現，人物位於卡片內並留白。

```json
[
  {
    "key": "tang",
    "paths": [
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/tang-comic.png"
    ],
    "prompt": "Use case: identity-preserve. Asset type: transparent lecturer figure for medical AI symposium banner. Edit the existing comic portrait into a complete natural standing upper-body figure from the full head through the upper thighs. Preserve actual individual's recognizable identity, face structure, age, hairstyle, glasses and fine refined editorial comic rendering: elegant graphic novel ink contours, refined realistic cel shading and natural facial proportions, matching the Tang style reference. All lecturers must have a warm natural smiling expression. Pose: relaxed standing upright with slightly turned shoulders and face looking at viewer, BOTH arms naturally hanging along the sides, BOTH complete arms including hands and all fingertips fully visible inside canvas. Natural correct human anatomy and hand proportions, soft relaxed fingers, no gestures or props. Composition: 1024x1536 portrait canvas, figure scaled down enough to leave 10–15% fully transparent blank margin at BOTH sides beyond the widest arm, 5% fully transparent margin above head and 5% below the upper-thigh termination. All hair, BOTH shoulders, BOTH upper arms, BOTH elbows, BOTH forearms, BOTH wrists and BOTH hands fully within the frame. Absolutely no horizontal edge cropping, no arm or shoulder touching side edges. No crossed arms, no hands in pockets, no thumbs-up, no objects, no exaggerated poses, no rectangular cut-outs. The garment/upper thighs end cleanly above the bottom edge with transparent margin below. Genuinely transparent alpha background with clean isolated figure; no scene, backdrop, text, letters, logo, watermark, badges or emblems. Input image 1 is Tang's existing comic portrait, the authoritative identity, outfit and rendering reference. Keep his neat side-parted black hair, thin gold-rim glasses, rounded face, friendly visible-teeth smile. Keep plain white physician coat over pale blue collared shirt and subtle cyan edge light. Extend the natural figure and fully visible relaxed arms/hands without altering his identity."
  },
  {
    "key": "liao",
    "paths": [
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/liao-comic-v2.png",
      "/workspace/scratch/7d90c8f5ae53/upload/image(20261002-073555).png",
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/tang-comic.png"
    ],
    "prompt": "Use case: identity-preserve. Asset type: transparent lecturer figure for medical AI symposium banner. Edit the existing comic portrait into a complete natural standing upper-body figure from the full head through the upper thighs. Preserve actual individual's recognizable identity, face structure, age, hairstyle, glasses and fine refined editorial comic rendering: elegant graphic novel ink contours, refined realistic cel shading and natural facial proportions, matching the Tang style reference. All lecturers must have a warm natural smiling expression. Pose: relaxed standing upright with slightly turned shoulders and face looking at viewer, BOTH arms naturally hanging along the sides, BOTH complete arms including hands and all fingertips fully visible inside canvas. Natural correct human anatomy and hand proportions, soft relaxed fingers, no gestures or props. Composition: 1024x1536 portrait canvas, figure scaled down enough to leave 10–15% fully transparent blank margin at BOTH sides beyond the widest arm, 5% fully transparent margin above head and 5% below the upper-thigh termination. All hair, BOTH shoulders, BOTH upper arms, BOTH elbows, BOTH forearms, BOTH wrists and BOTH hands fully within the frame. Absolutely no horizontal edge cropping, no arm or shoulder touching side edges. No crossed arms, no hands in pockets, no thumbs-up, no objects, no exaggerated poses, no rectangular cut-outs. The garment/upper thighs end cleanly above the bottom edge with transparent margin below. Genuinely transparent alpha background with clean isolated figure; no scene, backdrop, text, letters, logo, watermark, badges or emblems. Input image 1 is Liao's current comic edit target. Input image 2 is the NEW AUTHORITATIVE user photo for Liao's identity, smiling expression and outfit; prioritize it over image 1 wherever they differ. Input image 3 is Tang, exclusively the shared editorial comic rendering reference, never transfer Tang's face. Match Liao in the new photo: short black hair with natural side sweep, dark rectangular glasses, neat mustache and full short beard, broad natural visible-teeth smile. White doctor coat over pale blue collared shirt and dark brown/black patterned tie matching the NEW photo, with plain unlettered coat and no ID badge. Do NOT retain old crew-neck T-shirt. Do NOT copy the photo's crossed-arm pose; show both arms fully lowered relaxed beside body and both hands fully visible. Subtle violet edge light."
  },
  {
    "key": "chen",
    "paths": [
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/chen-comic-v2.png",
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/tang-comic.png"
    ],
    "prompt": "Use case: identity-preserve. Asset type: transparent lecturer figure for medical AI symposium banner. Edit the existing comic portrait into a complete natural standing upper-body figure from the full head through the upper thighs. Preserve actual individual's recognizable identity, face structure, age, hairstyle, glasses and fine refined editorial comic rendering: elegant graphic novel ink contours, refined realistic cel shading and natural facial proportions, matching the Tang style reference. All lecturers must have a warm natural smiling expression. Pose: relaxed standing upright with slightly turned shoulders and face looking at viewer, BOTH arms naturally hanging along the sides, BOTH complete arms including hands and all fingertips fully visible inside canvas. Natural correct human anatomy and hand proportions, soft relaxed fingers, no gestures or props. Composition: 1024x1536 portrait canvas, figure scaled down enough to leave 10–15% fully transparent blank margin at BOTH sides beyond the widest arm, 5% fully transparent margin above head and 5% below the upper-thigh termination. All hair, BOTH shoulders, BOTH upper arms, BOTH elbows, BOTH forearms, BOTH wrists and BOTH hands fully within the frame. Absolutely no horizontal edge cropping, no arm or shoulder touching side edges. No crossed arms, no hands in pockets, no thumbs-up, no objects, no exaggerated poses, no rectangular cut-outs. The garment/upper thighs end cleanly above the bottom edge with transparent margin below. Genuinely transparent alpha background with clean isolated figure; no scene, backdrop, text, letters, logo, watermark, badges or emblems. Input image 1 is Chen's current comic target, authoritative for actual identity and clothing. Input image 2 Tang is exclusively shared editorial rendering reference, never transfer Tang's identity. Keep Chen's short silver-gray hair, black rectangular glasses, full face, distinctive ears, older age and natural proportions. Give him a warm natural smile, slightly upturned mouth and gently smiling eyes, avoiding exaggerated grin. Keep plain white collared shirt and black tie, no coat. Subtle emerald/gold edge light. Extend body and relaxed arms/hands naturally."
  }
]

```

## 2026-10-02 微笑半身肖像 v4

三張1254×1254透明半身圖：湯宏仁雙手自然交握；廖家德依使用者提供照片抱臂，穿襯衫領帶；陳世英穿深藍西裝，一手扶領、一手於腰前。完整保留肩膀、手肘及可見手指，HTML採contain完整顯示。廖家德v4改以使用者提供照片為權威參考。

```json
[
  {
    "key": "tang",
    "paths": [
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/tang-comic-v3.png"
    ],
    "prompt": "Use case: identity-preserve. Asset type: transparent HALF-BODY lecturer portrait for website banner. Edit input target to a centered SQUARE 1024x1024 composition of the upper body from full head to waist. IMPORTANT: this is a close professional half-body portrait, NOT full body, NOT thigh length. Head must be prominent, around one quarter of canvas height, with torso and all posed hands fitting comfortably. Preserve actual individual's recognizable facial structure, hairstyle, glasses, age, skin tone and fine refined editorial comic rendering; elegant graphic novel ink lines, realistic cel shading, natural facial proportions, warm approachable smiling expression. BOTH shoulders, BOTH elbows, ALL visible hands, forearms and fingers must remain completely inside the canvas. Keep at least 12–15% transparent space on both sides beyond the widest elbow, 5% transparent space above head, and 5% below bottom of hands/waist figure. Natural professional upright anatomy, no props, no dangling arms below frame, no hand/shoulder/elbow cropped by canvas. Genuine transparent alpha background; isolated person with clean edges, no scene, backdrop, text, captions, logos, badges, insignia or watermark. Garment at waist terminates cleanly above bottom transparent margin. Use the specific pose below exactly. Input image 1 is authoritative Tang identity, style and attire target. Keep thin gold-rim glasses, side-parted black hair, rounded face, friendly visible-teeth smile, white physician coat over pale blue collared shirt, subtle cyan edge light. Distinct pose: relaxed slight three-quarter torso angle toward viewer's left while face turns toward viewer; BOTH hands loosely clasped together at lower abdomen just above waist, relaxed natural fingers and both entire elbows fully visible, no stiff arm position. Both hands fully included with margin beneath."
  },
  {
    "key": "liao",
    "paths": [
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/liao-comic-v3.png",
      "/workspace/scratch/7d90c8f5ae53/upload/image(20261002-073555).png",
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/tang-comic.png"
    ],
    "prompt": "Use case: identity-preserve. Asset type: transparent HALF-BODY lecturer portrait for website banner. Edit input target to a centered SQUARE 1024x1024 composition of the upper body from full head to waist. IMPORTANT: this is a close professional half-body portrait, NOT full body, NOT thigh length. Head must be prominent, around one quarter of canvas height, with torso and all posed hands fitting comfortably. Preserve actual individual's recognizable facial structure, hairstyle, glasses, age, skin tone and fine refined editorial comic rendering; elegant graphic novel ink lines, realistic cel shading, natural facial proportions, warm approachable smiling expression. BOTH shoulders, BOTH elbows, ALL visible hands, forearms and fingers must remain completely inside the canvas. Keep at least 12–15% transparent space on both sides beyond the widest elbow, 5% transparent space above head, and 5% below bottom of hands/waist figure. Natural professional upright anatomy, no props, no dangling arms below frame, no hand/shoulder/elbow cropped by canvas. Genuine transparent alpha background; isolated person with clean edges, no scene, backdrop, text, captions, logos, badges, insignia or watermark. Garment at waist terminates cleanly above bottom transparent margin. Use the specific pose below exactly. Input image 1 is comic rendering edit target. Input image 2 is the NEW authoritative identity AND pose photo of Liao. Input image 3 Tang is only shared comic style reference, do not copy Tang's identity. Preserve Liao's actual short black hair, dark rectangular glasses, mustache and short beard, friendly tooth-visible smiling face, from photo 2. Distinct pose: EXACT same confident naturally crossed-arms pose and slight three-quarter torso angle as photo 2, with BOTH elbows entirely within square frame and 12–15% side margin, naturally tucked hand and all visible fingers intact, wrists and forearms complete; natural overlapping anatomy. Change outfit: REMOVE THE PHYSICIAN COAT COMPLETELY, no white overcoat/lapels, wear only pale blue long-sleeve business shirt and dark brown/black patterned tie matching photo 2, tidy cuffs. Keep the blue-black wristwatch visible as in pose reference. Subtle violet edge light."
  },
  {
    "key": "chen",
    "paths": [
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/chen-comic-v3.png",
      "/workspace/scratch/7d90c8f5ae53/chimeira-new-assets/tang-comic.png"
    ],
    "prompt": "Use case: identity-preserve. Asset type: transparent HALF-BODY lecturer portrait for website banner. Edit input target to a centered SQUARE 1024x1024 composition of the upper body from full head to waist. IMPORTANT: this is a close professional half-body portrait, NOT full body, NOT thigh length. Head must be prominent, around one quarter of canvas height, with torso and all posed hands fitting comfortably. Preserve actual individual's recognizable facial structure, hairstyle, glasses, age, skin tone and fine refined editorial comic rendering; elegant graphic novel ink lines, realistic cel shading, natural facial proportions, warm approachable smiling expression. BOTH shoulders, BOTH elbows, ALL visible hands, forearms and fingers must remain completely inside the canvas. Keep at least 12–15% transparent space on both sides beyond the widest elbow, 5% transparent space above head, and 5% below bottom of hands/waist figure. Natural professional upright anatomy, no props, no dangling arms below frame, no hand/shoulder/elbow cropped by canvas. Genuine transparent alpha background; isolated person with clean edges, no scene, backdrop, text, captions, logos, badges, insignia or watermark. Garment at waist terminates cleanly above bottom transparent margin. Use the specific pose below exactly. Input image 1 Chen is authoritative actual identity target. Input image 2 Tang is only shared editorial comic rendering reference, never transfer Tang's identity. Keep short silver-gray hair, black rectangular glasses, older age, full face, distinctive ears. Warm natural smiling mouth and smiling eyes, approachable, no exaggerated grin. Change attire to tailored NAVY BUSINESS SUIT JACKET over white collared shirt and dark tie, no physician coat. Distinct pose: upright professionally relaxed torso facing viewer, one hand resting lightly at jacket lapel near upper chest with natural gently curved fingers, other arm bent naturally and other hand relaxed visibly across lower waist, BOTH elbows fully inside with side margins and BOTH hands entirely visible with bottom margin, neither arm dangling. Subtle emerald/gold edge light."
  }
]

```

## 透明盾徽

以原始盾徽作背景去除編輯，白色外底及內部留白皆為真正alpha透明，保留獅、羊、雙蛇、紅杖及金盾配置；細部線條由影像模型重繪，並非逐像素相同。以無損WebP呈現，取消multiply及圓形裁切。

```json
{
  "input": "/workspace/scratch/7d90c8f5ae53/cmqmweb/chimeira-2026/assets/chimeira-original-logo.jpg",
  "prompt": "Use case: background-extraction. Input image is the original ChiMeiRA logo and is the exact edit target. Remove ONLY every white background area to genuine transparent alpha, including exterior background AND all interior white negative-space: inside the gold shield, between wing feathers, within lion mane linework, goat hair/horn linework, animal eyes, between serpent coils and the medical staff. Preserve the exact ORIGINAL colored logo without redesign: navy blue lion and left wings/serpent, green goat and right wings/serpent, red vertical medical staff with circular top and pointed base, original gold outlined shield. Keep all original shapes, detailed linework, colors, orientation, relative scale, proportions and placement. NO new drawing or features, no stylization, no smoothing away detail, no text, no glow, no shadows, no border, no white fill, no white rectangle, no scene. Transparent PNG cutout of the ORIGINAL logo only; keep all colored elements fully visible and uncut. Genuine transparency throughout every formerly white area, clean antialiased edges.",
  "mode": "built-in imagegen edit",
  "transparent_background": true
}

```
