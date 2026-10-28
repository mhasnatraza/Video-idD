/**
 * High-detail procedural multi-scene cinema frame renderer.
 * Renders ultra-crisp micro-textures (fine architectural grids, rain streaks, neon Kanji/Latin signage,
 * precision watchmaking gears, and alpine topographic ridges) across 3 distinct scenes with sharp cuts
 * at t = 3.5s and t = 7.5s.
 *
 * Why this matters:
 * 1. The "Original (Blurred / Low-Res)" viewport degrades this source via downsampling + Gaussian/box blur
 *    and chroma subsampling artifacts.
 * 2. The "Upscaled (Neural Restored)" viewport runs our real-time super-resolution + unsharp deconvolution
 *    pass, letting users see genuine sub-pixel edge and texture restoration in real time at 60fps.
 * 3. The Optical Scene Cut Detector scans the video timeline and accurately discovers the exact scene
 *    cuts at 3.5s and 7.5s (as well as cuts in any user-uploaded video file).
 */
export function renderProceduralMasterFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  timeSec: number,
  forcedScene?: 0 | 1 | 2
) {
  const cycleTime = timeSec % 12.0;
  const sceneIndex: 0 | 1 | 2 =
    forcedScene !== undefined
      ? forcedScene
      : cycleTime < 3.5
      ? 0
      : cycleTime < 7.5
      ? 1
      : 2;

  ctx.save();
  const scaleX = width / 960;
  const scaleY = height / 540;

  if (sceneIndex === 0) {
    // SCENE 0 (0.0s - 3.5s): Clean Cinema Skyline with Fine Micro-Window Lattice & Water Reflections
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, "#050914");
    grad.addColorStop(0.6, "#0F1E36");
    grad.addColorStop(1, "#070C16");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Fine starlight pinpoint dots in upper sky (tests single-pixel acuity)
    ctx.fillStyle = "rgba(248, 250, 252, 0.85)";
    for (let s = 0; s < 48; s++) {
      const sx = ((s * 137 + 29) % 940) * scaleX;
      const sy = ((s * 53 + 11) % 160) * scaleY;
      ctx.fillRect(sx, sy, 1.4 * scaleX, 1.4 * scaleY);
    }

    const panX = (timeSec * 18) % 120;
    const horizonY = height * 0.72;

    const buildings = [
      { x: 30, w: 145, top: 60, cols: 14, rows: 28, hue: "#38BDF8" },
      { x: 195, w: 175, top: 32, cols: 18, rows: 34, hue: "#F59E0B" },
      { x: 390, w: 145, top: 75, cols: 12, rows: 24, hue: "#EC4899" },
      { x: 555, w: 195, top: 38, cols: 20, rows: 32, hue: "#22D3EE" },
      { x: 770, w: 165, top: 55, cols: 16, rows: 28, hue: "#A855F7" },
    ];

    buildings.forEach((b, bIdx) => {
      const bx = ((b.x - panX * 0.35 + 960) % 960) * scaleX;
      const bw = b.w * scaleX;
      const by = b.top * scaleY;
      const bh = horizonY - by;

      ctx.fillStyle = "#09101D";
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.45)";
      ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, bw, bh);

      // Fine vertical structural mullions
      ctx.strokeStyle = "rgba(71, 85, 105, 0.35)";
      for (let c = 1; c < b.cols; c++) {
        const mx = bx + c * (bw / b.cols);
        ctx.beginPath();
        ctx.moveTo(mx, by);
        ctx.lineTo(mx, by + bh);
        ctx.stroke();
      }

      // Crisp high-frequency illuminated window lattice
      const cellW = Math.max(1.8, bw / (b.cols * 1.7));
      const cellH = Math.max(1.8, bh / (b.rows * 1.8));
      for (let r = 1; r < b.rows; r++) {
        for (let c = 1; c < b.cols; c++) {
          const lit = ((r * 7 + c * 13 + bIdx * 5) % 11) > 3;
          if (lit) {
            ctx.fillStyle =
              (r + c) % 5 === 0 ? b.hue : "rgba(241, 245, 249, 0.88)";
            ctx.fillRect(
              bx + c * (bw / (b.cols + 1)) - cellW * 0.5,
              by + r * (bh / (b.rows + 1)) - cellH * 0.5,
              cellW,
              cellH
            );
          }
        }
      }
    });

    // Clean harbor water reflection ripples below horizon
    const groundGrad = ctx.createLinearGradient(0, horizonY, 0, height);
    groundGrad.addColorStop(0, "#050B14");
    groundGrad.addColorStop(1, "#0B1526");
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, horizonY, width, height - horizonY);

    ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(width, horizonY);
    ctx.stroke();

    for (let i = 0; i < 48; i++) {
      const ry = horizonY + 4 + ((i * 15 + timeSec * 24) % (height - horizonY - 6));
      const rx = ((i * 79) % width);
      const rw = (24 + (i % 5) * 20) * scaleX;
      ctx.fillStyle =
        i % 3 === 0
          ? "rgba(56, 189, 248, 0.35)"
          : i % 2 === 0
          ? "rgba(245, 158, 11, 0.3)"
          : "rgba(226, 232, 240, 0.25)";
      ctx.fillRect(rx, ry, rw, 1.5 * scaleY);
    }
  } else if (sceneIndex === 1) {
    // SCENE 1 (3.5s - 7.5s): Pure Macro Mechanical Watch Movement (Zero Floating Text Clutter)
    const localT = Math.max(0, timeSec - 3.5);
    const bg = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      20,
      width * 0.5,
      height * 0.5,
      width * 0.65
    );
    bg.addColorStop(0, "#1E1B18");
    bg.addColorStop(0.6, "#12100E");
    bg.addColorStop(1, "#070605");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;
    const minDim = Math.min(width, height);
    const s = minDim / 540;

    ctx.save();
    ctx.translate(cx, cy);

    // Fine concentric Côtes de Genève metallic guilloché rings
    ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
    ctx.lineWidth = 1;
    for (let r = 24 * s; r < minDim * 0.4; r += 6 * s) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Outer precision bezel with crisp 1-degree and 5-degree micro-ticks
    const outerR = minDim * 0.42;
    ctx.strokeStyle = "#F59E0B";
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.arc(0, 0, outerR, 0, Math.PI * 2);
    ctx.stroke();

    for (let deg = 0; deg < 360; deg += 2) {
      const rad = (deg * Math.PI) / 180;
      const isMajor = deg % 10 === 0;
      const r1 = outerR - (isMajor ? 14 : 6) * s;
      ctx.strokeStyle = isMajor ? "#FEF3C7" : "rgba(251, 191, 36, 0.55)";
      ctx.lineWidth = isMajor ? 1.8 * s : 1 * s;
      ctx.beginPath();
      ctx.moveTo(Math.cos(rad) * r1, Math.sin(rad) * r1);
      ctx.lineTo(Math.cos(rad) * outerR, Math.sin(rad) * outerR);
      ctx.stroke();
    }

    // Primary rotating escapement gear with 48 sharp teeth
    ctx.save();
    ctx.rotate(localT * 0.65);
    const gearR = minDim * 0.24;
    ctx.strokeStyle = "#F59E0B";
    ctx.lineWidth = 2.5 * s;
    ctx.beginPath();
    ctx.arc(0, 0, gearR, 0, Math.PI * 2);
    ctx.stroke();

    for (let tooth = 0; tooth < 48; tooth++) {
      const a = (tooth * Math.PI * 2) / 48;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * gearR, Math.sin(a) * gearR);
      ctx.lineTo(
        Math.cos(a) * (gearR + 9 * s),
        Math.sin(a) * (gearR + 9 * s)
      );
      ctx.stroke();
    }

    for (let spoke = 0; spoke < 6; spoke++) {
      const a = (spoke * Math.PI) / 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * gearR, Math.sin(a) * gearR);
      ctx.stroke();
    }
    ctx.restore();

    // Inner counter-rotating balance wheel
    ctx.save();
    ctx.rotate(-localT * 1.2);
    const innerR = minDim * 0.12;
    ctx.strokeStyle = "#38BDF8";
    ctx.lineWidth = 1.8 * s;
    ctx.beginPath();
    ctx.arc(0, 0, innerR, 0, Math.PI * 2);
    ctx.stroke();
    for (let t = 0; t < 24; t++) {
      const a = (t * Math.PI * 2) / 24;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * (innerR - 4 * s), Math.sin(a) * (innerR - 4 * s));
      ctx.lineTo(Math.cos(a) * (innerR + 5 * s), Math.sin(a) * (innerR + 5 * s));
      ctx.stroke();
    }
    ctx.restore();

    // Sweeping chronograph second hand
    const sweepAngle = localT * 1.5 - Math.PI / 2;
    ctx.strokeStyle = "#EF4444";
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.moveTo(-Math.cos(sweepAngle) * 22 * s, -Math.sin(sweepAngle) * 22 * s);
    ctx.lineTo(
      Math.cos(sweepAngle) * (outerR * 0.88),
      Math.sin(sweepAngle) * (outerR * 0.88)
    );
    ctx.stroke();

    ctx.fillStyle = "#FEF3C7";
    ctx.beginPath();
    ctx.arc(0, 0, 5 * s, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  } else {
    // SCENE 2 (7.5s - 12.0s): Clean Alpine Mountain Ridges & Crisp Strata (Zero Corner Box Clutter)
    const localT = Math.max(0, timeSec - 7.5);
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#0C192C");
    sky.addColorStop(0.48, "#1E3A5F");
    sky.addColorStop(0.76, "#D97706");
    sky.addColorStop(1, "#0F172A");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const sunX = width * 0.72 - localT * 10;
    const sunY = height * 0.3;
    ctx.fillStyle = "#FEF08A";
    ctx.beginPath();
    ctx.arc(sunX, sunY, height * 0.085, 0, Math.PI * 2);
    ctx.fill();

    const layers = [
      {
        yBase: 0.52,
        amp: 0.14,
        freq: 0.008,
        speed: 10,
        color: "#1E293B",
        ridgeStroke: "#94A3B8",
      },
      {
        yBase: 0.66,
        amp: 0.12,
        freq: 0.012,
        speed: 20,
        color: "#0F172A",
        ridgeStroke: "#E2E8F0",
      },
      {
        yBase: 0.81,
        amp: 0.09,
        freq: 0.018,
        speed: 34,
        color: "#090D16",
        ridgeStroke: "#38BDF8",
      },
    ];

    layers.forEach((layer) => {
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 3) {
        const worldX = x + localT * layer.speed;
        const n =
          Math.sin(worldX * layer.freq) * 0.6 +
          Math.cos(worldX * layer.freq * 2.3) * 0.28 +
          Math.sin(worldX * layer.freq * 5.7) * 0.12;
        const y = height * layer.yBase - n * height * layer.amp;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = layer.color;
      ctx.fill();

      ctx.strokeStyle = layer.ridgeStroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  ctx.restore();
}
