const visuals = {
  "moonlit-petal": {
    background: ["#0F1833", "#F6D9E5"],
    gown: ["#FFF2F8", "#D4DBFF"],
    aura: "#FFFFFF",
    accent: "#F4BCD1",
    sparkles: [
      [100, 120, 11],
      [500, 180, 14],
      [170, 520, 10],
    ],
  },
  "starlace-aurora": {
    background: ["#14294F", "#DDEFFF"],
    gown: ["#EDF9FF", "#A9CCFF"],
    aura: "#D9F6FF",
    accent: "#B3D7FF",
    sparkles: [
      [92, 145, 12],
      [510, 200, 13],
      [205, 548, 9],
    ],
  },
  "rosefire-waltz": {
    background: ["#2E1322", "#F9C7B8"],
    gown: ["#FFE3E7", "#F39E8C"],
    aura: "#FFE6DD",
    accent: "#FFBE9D",
    sparkles: [
      [120, 130, 13],
      [490, 220, 11],
      [240, 490, 9],
    ],
  },
  "sapphire-bloom": {
    background: ["#081A48", "#375AE2"],
    gown: ["#C8E1FF", "#1F3E95"],
    aura: "#7FB9FF",
    accent: "#C9E0FF",
    sparkles: [
      [110, 150, 11],
      [530, 175, 15],
      [170, 560, 10],
    ],
  },
  "ember-starfall": {
    background: ["#2D1409", "#F7C66D"],
    gown: ["#F9E3B6", "#BE6A2F"],
    aura: "#FFD99B",
    accent: "#FFE7B3",
    sparkles: [
      [125, 170, 10],
      [525, 205, 14],
      [198, 542, 11],
    ],
  },
  "lilac-whisper": {
    background: ["#2C1746", "#E3CFFC"],
    gown: ["#F9F0FF", "#B28CEB"],
    aura: "#F2E5FF",
    accent: "#DCC0FF",
    sparkles: [
      [95, 120, 12],
      [505, 185, 13],
      [188, 525, 10],
    ],
  },
  "pearl-mist": {
    background: ["#5C647B", "#F7F5F3"],
    gown: ["#FFFFFF", "#D9DEE6"],
    aura: "#FFFFFF",
    accent: "#EEF1F5",
    sparkles: [
      [110, 135, 10],
      [525, 195, 13],
      [215, 545, 10],
    ],
  },
  "winter-sonata": {
    background: ["#29303E", "#E6EEF9"],
    gown: ["#FAFDFF", "#BFCBDE"],
    aura: "#F2F8FF",
    accent: "#DEEAF9",
    sparkles: [
      [95, 148, 12],
      [520, 180, 14],
      [175, 540, 10],
    ],
  },
  "golden-lantern": {
    background: ["#3F2310", "#F7D9A5"],
    gown: ["#FFF0C8", "#D9A44F"],
    aura: "#FFEDC1",
    accent: "#FFE4AB",
    sparkles: [
      [88, 135, 11],
      [518, 200, 13],
      [205, 548, 10],
    ],
  },
  "enchanted-moss": {
    background: ["#12231D", "#4A896E"],
    gown: ["#D8F1E1", "#2D6E51"],
    aura: "#C7F1D4",
    accent: "#A9E4BA",
    sparkles: [
      [98, 150, 11],
      [520, 200, 12],
      [188, 555, 10],
    ],
  },
};

function createSparkle(cx, cy, size, fill) {
  return `
    <path d="M ${cx} ${cy - size} L ${cx + size * 0.28} ${cy - size * 0.28} L ${cx + size} ${cy} L ${cx + size * 0.28} ${cy + size * 0.28} L ${cx} ${cy + size} L ${cx - size * 0.28} ${cy + size * 0.28} L ${cx - size} ${cy} L ${cx - size * 0.28} ${cy - size * 0.28} Z" fill="${fill}" fill-opacity="0.9" />
  `;
}

export function getProductArtwork(artworkId, label) {
  const visual = visuals[artworkId] ?? visuals["moonlit-petal"];
  const sparkleMarkup = visual.sparkles
    .map(([cx, cy, size]) => createSparkle(cx, cy, size, visual.aura))
    .join("");

  const svg = `
    <svg width="640" height="760" viewBox="0 0 640 760" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="72" y1="58" x2="580" y2="698" gradientUnits="userSpaceOnUse">
          <stop stop-color="${visual.background[0]}" />
          <stop offset="1" stop-color="${visual.background[1]}" />
        </linearGradient>
        <linearGradient id="gown" x1="320" y1="188" x2="320" y2="675" gradientUnits="userSpaceOnUse">
          <stop stop-color="${visual.gown[0]}" />
          <stop offset="1" stop-color="${visual.gown[1]}" />
        </linearGradient>
        <radialGradient id="halo" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(320 248) rotate(90) scale(210 180)">
          <stop stop-color="${visual.aura}" stop-opacity="0.45" />
          <stop offset="1" stop-color="${visual.aura}" stop-opacity="0" />
        </radialGradient>
        <filter id="blur" x="0" y="0" width="640" height="760" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      <rect width="640" height="760" rx="38" fill="url(#bg)" />
      <ellipse cx="505" cy="124" rx="118" ry="104" fill="${visual.accent}" fill-opacity="0.34" filter="url(#blur)" />
      <ellipse cx="138" cy="640" rx="144" ry="118" fill="${visual.aura}" fill-opacity="0.18" filter="url(#blur)" />
      <ellipse cx="320" cy="248" rx="210" ry="180" fill="url(#halo)" />

      ${sparkleMarkup}

      <path d="M300 164C300 145.222 315.222 130 334 130H338C356.778 130 372 145.222 372 164V214H300V164Z" fill="url(#gown)" />
      <path d="M258 208C274 186 297 172 321 172C345 172 366 186 382 208L398 320C409 401 442 473 478 548L508 612C447 643 387 660 319 660C251 660 190 643 132 612L162 548C198 472 231 401 242 320L258 208Z" fill="url(#gown)" />
      <path d="M225 305C255 327 279 336 320 336C361 336 387 327 415 305L438 348C404 378 368 392 320 392C272 392 235 378 202 348L225 305Z" fill="${visual.aura}" fill-opacity="0.28" />
      <path d="M205 272C241 293 273 300 320 300C367 300 399 293 435 272" stroke="${visual.aura}" stroke-opacity="0.75" stroke-width="10" stroke-linecap="round" />
      <path d="M182 520C228 551 272 564 320 564C368 564 412 551 458 520" stroke="${visual.aura}" stroke-opacity="0.35" stroke-width="9" stroke-linecap="round" />
      <path d="M168 563C219 600 271 614 320 614C369 614 421 600 472 563" stroke="${visual.aura}" stroke-opacity="0.28" stroke-width="7" stroke-linecap="round" />
      <path d="M294 168C274 185 261 194 232 205" stroke="${visual.aura}" stroke-opacity="0.6" stroke-width="8" stroke-linecap="round" />
      <path d="M378 168C398 185 411 194 440 205" stroke="${visual.aura}" stroke-opacity="0.6" stroke-width="8" stroke-linecap="round" />
      <path d="M320 134C305 151 298 170 298 206H372C372 170 365 151 350 134H320Z" fill="${visual.accent}" fill-opacity="0.32" />
      <text x="320" y="710" text-anchor="middle" fill="white" fill-opacity="0.92" font-family="Georgia, serif" font-size="31" letter-spacing="1.5">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

