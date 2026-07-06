/**
 * .auth-art — dark gradient decorative panel (right side of the auth screen).
 * Ported faithfully from the design prototype: a field of faint dots, two
 * floating ring pairs, two flowing dashed paths, a small grid glyph and a
 * scatter of "stars". Colors here are intentionally hardcoded hex (not
 * tokens): this panel is a fixed dark-cyan brand backdrop that does not
 * react to the light/dark theme, matching the precedent already set by the
 * `.auth-art` background gradient in auth.css.
 */

const DOTS: { x: number; y: number; op: number }[] = [];
for (let r = 0; r < 13; r++) {
  for (let c = 0; c < 10; c++) {
    DOTS.push({ x: c * 72 + 36, y: r * 72 + 36, op: 0.05 + ((r * c) % 6) * 0.012 });
  }
}

const STARS: Array<[number, number]> = [
  [130, 310],
  [350, 145],
  [580, 270],
  [670, 490],
  [155, 650],
  [410, 740],
  [500, 155],
  [240, 760],
  [650, 360],
];

const GRID_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((i) => ![1, 3, 5, 7].includes(i));

export function AuthArt() {
  return (
    <div className="auth-art">
      <svg width="100%" height="100%" viewBox="0 0 720 936" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="auth-ag1" cx="28%" cy="22%" r="55%">
            <stop offset="0%" stopColor="#00F1FF" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#00F1FF" stopOpacity={0} />
          </radialGradient>
          <radialGradient id="auth-ag2" cx="76%" cy="72%" r="50%">
            <stop offset="0%" stopColor="#0bb6cc" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#0bb6cc" stopOpacity={0} />
          </radialGradient>
          <radialGradient id="auth-ag3" cx="55%" cy="46%" r="38%">
            <stop offset="0%" stopColor="#00d3ea" stopOpacity={0.14} />
            <stop offset="100%" stopColor="#00d3ea" stopOpacity={0} />
          </radialGradient>
        </defs>

        <rect width={720} height={936} fill="url(#auth-ag1)" />
        <rect width={720} height={936} fill="url(#auth-ag2)" />
        <rect width={720} height={936} fill="url(#auth-ag3)" />

        {DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.3} fill="#00F1FF" opacity={d.op} />
        ))}

        <circle cx={215} cy={225} r={175} fill="none" stroke="#00F1FF" strokeWidth={0.8} opacity={0.13} style={{ animation: "ringFloat1 9s ease-in-out infinite" }} />
        <circle cx={215} cy={225} r={255} fill="none" stroke="#0bb6cc" strokeWidth={0.6} opacity={0.08} style={{ animation: "ringFloat1 13s ease-in-out infinite reverse" }} />
        <circle cx={560} cy={680} r={155} fill="none" stroke="#00d3ea" strokeWidth={0.8} opacity={0.13} style={{ animation: "ringFloat2 10s ease-in-out infinite" }} />
        <circle cx={560} cy={680} r={230} fill="none" stroke="#00F1FF" strokeWidth={0.5} opacity={0.07} style={{ animation: "ringFloat2 15s ease-in-out infinite reverse" }} />

        <path d="M 30 390 Q 260 210 510 360 T 720 290" fill="none" stroke="#00F1FF" strokeWidth={1} opacity={0.16} strokeDasharray="5 20" style={{ animation: "authDashFlow 6s linear infinite" }} />
        <path d="M 0 590 Q 190 440 460 540 T 720 470" fill="none" stroke="#0bb6cc" strokeWidth={0.8} opacity={0.12} strokeDasharray="4 16" style={{ animation: "authDashFlow 9s linear infinite" }} />

        <g transform="translate(324,424)" opacity={0.06}>
          {GRID_INDICES.map((i) => (
            <rect key={i} x={(i % 3) * 40 - 60} y={Math.floor(i / 3) * 40 - 60} width={36} height={36} rx={3} fill={i === 4 ? "#00F1FF" : "#ffffff"} />
          ))}
        </g>

        <circle cx={635} cy={104} r={5} fill="#00F1FF" opacity={0.55} style={{ animation: "authDotPulse 2.5s ease-in-out infinite" }} />
        <circle cx={635} cy={104} r={17} fill="none" stroke="#00F1FF" strokeWidth={1} opacity={0.22} style={{ animation: "authDotPulse 2.5s ease-in-out infinite" }} />
        <circle cx={78} cy={810} r={4} fill="#0bb6cc" opacity={0.44} style={{ animation: "authDotPulse 3.4s ease-in-out infinite" }} />

        {STARS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.5} fill="#00F1FF" opacity={0.18 + (i % 4) * 0.07} />
        ))}
      </svg>
    </div>
  );
}
