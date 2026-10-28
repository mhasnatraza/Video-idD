export type UpscaleModelId =
  | "proteus-v4"
  | "realesrgan-x4"
  | "video2x-rife"
  | "chainner-rcas"
  | "anime4k-sobel"
  | "iris-v2"
  | "swinir-pro"
  | "artemis-hq";

export interface UpscaleModelSpec {
  id: UpscaleModelId;
  name: string;
  architecture: string;
  repoSource: string;
  redditCommunityRating: string;
  scaleFactor: 2 | 4;
  specialty: string;
  pipelineNodes: string[];
  defaultParams: UpscaleParameters;
}

export interface UpscaleParameters {
  modelId: UpscaleModelId;
  scaleFactor: 2 | 4;
  targetResolution: "1080p FHD" | "4K UHD" | "8K Master";
  targetFps: 24 | 30 | 60 | 120;
  revertCompression: number; // 0 - 100
  recoverDetail: number;     // 0 - 100
  sharpen: number;           // 0 - 100 (Drives AMD FSR RCAS pass)
  reduceNoise: number;       // 0 - 100 (Drives Bilateral Chroma/Luma Denoise)
  dehalo: number;            // 0 - 100 (Drives Local Min/Max Luma Clamping)
  antiAliasDeblur: number;   // 0 - 100 (Drives Anime4K Sobel Gradient Push)
  motionInterpolation: boolean;
  simulateSourceBlur: number; // 0 - 100
}

export type VisualThemeId =
  | "cyber-broadcast"
  | "cinema-editorial"
  | "creator-kinetic"
  | "minimal-swiss"
  | "neon-glasstint";

export type TitleCardRole =
  | "hero-title"
  | "lower-third"
  | "data-stat"
  | "location-map"
  | "institutional-lockup"
  | "scene-loader"
  | "outro-endcard";

export type IntroAnimationPreset =
  | "spring-slide-up"
  | "tracking-expand"
  | "glitch-cipher"
  | "whip-pan-left"
  | "mask-wipe-reveal"
  | "scale-pop"
  | "typewriter-cursor"
  | "blur-deconvolve";

export type OutroAnimationPreset =
  | "fade-dissolve"
  | "slide-down-mask"
  | "glitch-collapse"
  | "whip-pan-right"
  | "tracking-shrink";

export type LoaderBarStyle =
  | "ribbon-sweep"
  | "segmented-hud"
  | "timecode-ring"
  | "minimal-line"
  | "none";

export type SubtitleAnimationPreset =
  | "karaoke-highlight"
  | "pop-up-spring"
  | "typewriter-hud"
  | "smooth-fade"
  | "boxed-broadcast";

export type InfographicAnimationStyle =
  | "radial-gauge-bars"
  | "odometer-isotype"
  | "liquid-beaker-wave"
  | "radar-heatmap-pins"
  | "ekg-clinical-pulse"
  | "kinetic-equation-slam";

export interface ChannelBrandConfig {
  channelName: string;
  channelHandle: string;
  partnerLockup?: string; // e.g., "BISP × KfW"
  themeId: VisualThemeId;
  primaryColor: string;
  accentColor: string;
  loaderStyle: LoaderBarStyle;
  showChannelOnSubtitles: boolean;
  /** Dual Top-Left & Top-Right Frame Logos in Equal AI Art-Directed Ratio */
  showTopLogos?: boolean;
  leftLogoText?: string;
  leftLogoSubtext?: string;
  leftLogoImageUrl?: string;
  leftLogoAccent?: string;
  rightLogoText?: string;
  rightLogoSubtext?: string;
  rightLogoImageUrl?: string;
  rightLogoAccent?: string;
  /** Equal width:height ratio locked by AI Art Director (e.g. 3.2 for 3.2:1 pill or 1.0 for 1:1 badge) */
  logoLockedAspectRatio?: number;
  /** Equal height as percentage of video frame height (e.g. 5.2%) */
  logoHeightPct?: number;
  /** Equal safe-area margin percentage from top and left/right edges (e.g. 3.5%) */
  logoSafeMarginPct?: number;
  aiArtDirectorLogoNote?: string;
  /** Logo opacity (0.2 to 1.0) */
  logoOpacity?: number;
  /** Background container style for logos */
  logoBackgroundStyle?: "translucent-pill" | "transparent" | "solid-white" | "solid-dark";
  leftLogoFileName?: string;
  rightLogoFileName?: string;
}

export interface VOVisualSyncAuditItem {
  id: string;
  beatIndex: number;
  voClause: string;
  startTime: number;
  endTime: number;
  matchedTitleHeadline: string;
  matchedTitleId?: string;
  matchedVisualName: string;
  transitionBlend: "smooth-cross-dissolve" | "abrupt-cut" | "opening-lock";
  syncStatus: "SYNCED" | "NEEDS_BLEND";
  syncScore: number;
}

export interface ExtractedAudioEntity {
  id: string;
  category: "name" | "place" | "data" | "institution";
  extractedText: string;
  subContext: string;
  timestamp: number;
  duration: number;
  numericPercent?: number;
  targetRole: TitleCardRole;
}

export interface MotionOSSpecialistRole {
  code: string;
  name: string;
  upstreamRepo: string;
  capability: string;
  qualityGateStatus: "VERIFIED" | "ACTIVE";
}

// Legacy alias kept for compatibility
export type TitleAnimationPreset = IntroAnimationPreset;

export interface VideoTrackClip {
  id: string;
  name: string;
  sourceType: "procedural" | "uploaded";
  videoUrl?: string;
  sceneVariant?: 0 | 1 | 2;
  /** Position on timeline in seconds */
  startTime: number;
  /** Duration on timeline in seconds */
  duration: number;
  /** Source media in-point offset in seconds */
  trimIn: number;
  /** Transition style at clip start */
  transitionIn: "none" | "cross-dissolve" | "dip-to-black" | "flash-cut";
  upscaleParams: UpscaleParameters;
  playbackRate: number;
  relevanceScore?: number;
  isIrrelevantShot?: boolean;
  semanticTag?: string;
}

export interface TitleTrackClip {
  id: string;
  role: TitleCardRole;
  headline: string;
  subheadline: string;
  channelTag: string;
  language: string;
  startTime: number;
  duration: number;
  themeId: VisualThemeId;
  introPreset: IntroAnimationPreset;
  outroPreset: OutroAnimationPreset;
  loaderStyle: LoaderBarStyle;
  color: string;
  accentColor: string;
  positionY: "top" | "center" | "lower-third";
  fontSize: number;
  /** Optional proportional value (0-100) for Data Visualisation cards */
  dataStatValue?: number;
  /** Optional source verification qualifier for Data Visualisation / Map cards */
  dataQualifier?: string;
  /** Optional 1..12 BISP × KfW Bespoke Cinematic Title System ID */
  bispLayoutId?: number;
  /** Animated Infographic Style for title cards */
  infographicStyle?: InfographicAnimationStyle;
}

export interface SubtitleTrackClip {
  id: string;
  text: string;
  language: string;
  startTime: number;
  endTime: number;
  themeId: VisualThemeId;
  introPreset: SubtitleAnimationPreset;
  outroPreset: OutroAnimationPreset;
  channelTag?: string;
  accentColor?: string;
}

export interface VoiceOverTrackClip {
  id: string;
  label: string;
  spokenText: string;
  language: string;
  voiceName: "Kore" | "Puck" | "Charon" | "Fenrir" | "Zephyr";
  startTime: number;
  duration: number;
  audioUrl: string;
  audioBase64: string;
  waveform: number[];
  volume: number;
  /** True when backed by a real neural WAV, separated video audio, or mic recording */
  isRealAudioBuffer?: boolean;
  /** Human narrator persona description */
  humanPersonaLabel?: string;
}

export interface BispKfwTitleSystemSpec {
  id: number;
  code: string;
  title: string;
  primitiveTag: string;
  headline: string;
  subheadline: string;
  motionSpec: string;
  role: TitleCardRole;
  dataStatValue?: number;
  narrationLine: string;
}

export const BISP_KFW_12_TITLE_SYSTEMS: BispKfwTitleSystemSpec[] = [
  {
    id: 1,
    code: "01",
    title: "PAKISTAN 2022",
    primitiveTag: "Satellite slider",
    headline: "PAKISTAN 2022",
    subheadline: "Satellite-verified inundation. One-third of the country under water — Indus Basin archive.",
    motionSpec: "Before/After split wipe • #D4A12C 84px 2022 hero • live flood particle field",
    role: "hero-title",
    dataStatValue: 56,
    narrationLine: "Between August and October 2022, satellite imagery confirmed one-third of Pakistan lay under water across the Indus Basin.",
  },
  {
    id: 2,
    code: "02",
    title: "33M+",
    primitiveTag: "Isotype morph",
    headline: "33M+ AFFECTED",
    subheadline: "People directly affected. One in seven Pakistanis displaced, livelihoods washed.",
    motionSpec: "Odometer inertia 00→33M+ • 11×3 (33-unit) isotype grid live morph",
    role: "data-stat",
    dataStatValue: 96,
    narrationLine: "Over thirty-three million people were directly affected — one in seven citizens displaced overnight.",
  },
  {
    id: 3,
    code: "03",
    title: "€27M",
    primitiveTag: "Liquid beaker",
    headline: "€27M EMERGENCY RELIEF",
    subheadline: "Phase I in two tranches: €20M food, cash & medical (74%) + €7M top-up for women & children (26%).",
    motionSpec: "Dual glass beakers • gold liquid fill 74% & 26% • rising verification bubbles",
    role: "data-stat",
    dataStatValue: 74,
    narrationLine: "Phase One mobilized twenty-seven million euros in two tranches through BISP delivery rails within seventy-two hours.",
  },
  {
    id: 4,
    code: "04",
    title: "87 DISTRICTS",
    primitiveTag: "Heatmap pins",
    headline: "87 DISTRICTS REACHED",
    subheadline: "Heatmap of BISP penetration: 34 Sindh · 22 Balochistan · 19 Punjab · 12 KP + GB.",
    motionSpec: "Pakistan polygon map • 87 gold disbursement dots • shockwave pin ripples",
    role: "location-map",
    dataStatValue: 87,
    narrationLine: "Across eighty-seven flood-hit districts in Sindh, Balochistan, Punjab, and KP, biometric disbursement points went live.",
  },
  {
    id: 5,
    code: "05",
    title: "SIX DISTRICTS",
    primitiveTag: "Ticker spotlight",
    headline: "SIX FOCAL DISTRICTS",
    subheadline: "Faisalabad • Swat • Quetta • Shaheed Benazirabad • Kotli • Skardu — Resilience Labs.",
    motionSpec: "Dual counter-scrolling 84px Space Grotesk marquee • sweeping gold spotlight",
    role: "location-map",
    dataStatValue: 100,
    narrationLine: "Six focal districts — Faisalabad, Swat, Quetta, Shaheed Benazirabad, Kotli, and Skardu — anchored the resilience labs.",
  },
  {
    id: 6,
    code: "06",
    title: "5.82M",
    primitiveTag: "Pebble ripple",
    headline: "5.82M LIVES REACHED",
    subheadline: "3.926M Children · 1.535M Women · 361K Girls — targeted nutrition & maternal protection.",
    motionSpec: "3 overlapping circular droplets • concentric water ripple • secondary jiggle",
    role: "data-stat",
    dataStatValue: 92,
    narrationLine: "Five point eight two million lives were reached, prioritizing nearly four million children and one point five million women.",
  },
  {
    id: 7,
    code: "07",
    title: "20%",
    primitiveTag: "EKG draw",
    headline: "20% REDUCTION IN FOOD INSECURITY",
    subheadline: "Clinical verification — Aga Khan University Impact Assessment 2023.",
    motionSpec: "Lead II 25mm/s gold EKG waveform draw • heartbeat pulse • ink bleed stamp",
    role: "data-stat",
    dataStatValue: 80,
    narrationLine: "Clinical verification by Aga Khan University confirmed a twenty percent reduction in severe household food insecurity.",
  },
  {
    id: 8,
    code: "08",
    title: "€35M",
    primitiveTag: "Equation slam",
    headline: "€7M + €28M = €35M ENVELOPE",
    subheadline: "€7M Emergency Top-Up + €28M Long-Term Climate Resilience = €35M Total KfW Envelope.",
    motionSpec: "Neobrutalist card equation • 4×→1× gold slam • 18 gold explosion particles",
    role: "data-stat",
    dataStatValue: 100,
    narrationLine: "Combining seven million euros in top-up relief with twenty-eight million for climate resilience forged a thirty-five million euro envelope.",
  },
  {
    id: 9,
    code: "09",
    title: "PREPARE",
    primitiveTag: "Split parallax",
    headline: "PILLAR I — PREPARE",
    subheadline: "Live Warning Feed • NDMA: Indus water level +2.4m in 6h · Early warning SMS dispatched 3.2M.",
    motionSpec: "52/48 navy-to-cream split parallax • staggered reveal lines • floating Water/Shelter/Food icons",
    role: "lower-third",
    narrationLine: "Pillar One is Prepare: anticipatory cash triggered directly by Indus river gauges and early warning dispatches.",
  },
  {
    id: 10,
    code: "10",
    title: "COPE",
    primitiveTag: "Cash wave",
    headline: "PILLAR II — COPE (48H DIGITAL)",
    subheadline: "Lower-third takeover: BISP • RS 25,000 emergency cash hits accounts within 48h of trigger.",
    motionSpec: "Flying gold RS 25,000 disbursement wave • dynamic threshold line • #F5F1E8 lower-third takeover",
    role: "lower-third",
    dataStatValue: 100,
    narrationLine: "Pillar Two is Cope: emergency transfers of twenty-five thousand rupees reach digital accounts within forty-eight hours.",
  },
  {
    id: 11,
    code: "11",
    title: "ADAPT",
    primitiveTag: "3D quadrants",
    headline: "PILLAR III — ADAPT",
    subheadline: "4 Quadrants: Water filtration · Drought-resilient seeds · Flood mounds · Raised plinths & WASH.",
    motionSpec: "2×2 bento grid • 3D perspective tilt • community-built BISP resilience committees",
    role: "lower-third",
    narrationLine: "Pillar Three is Adapt: community-built water filtration, drought-resilient seeds, and raised flood plinths.",
  },
  {
    id: 12,
    code: "12",
    title: "RESILIENCE ENGINEERED",
    primitiveTag: "Gold particles",
    headline: "BISP × KFW — RESILIENCE ENGINEERED",
    subheadline: "Final Institutional Lockup • Untouched white card • Equal proportions • 4K Documentary Master.",
    motionSpec: "Gold particle convergence forming RESILIENCE • center scale overshoot back.out(1.7)",
    role: "institutional-lockup",
    narrationLine: "BISP and KfW: Resilience Engineered — turning emergency response into lasting climate protection.",
  },
];

export const HUMAN_VOICE_PERSONAS: {
  voiceName: "Kore" | "Puck" | "Charon" | "Fenrir" | "Zephyr";
  title: string;
  subtitle: string;
  stylePrompt: string;
  pitchContour: number;
  rateContour: number;
}[] = [
  {
    voiceName: "Kore",
    title: "Kore · Warm Documentary Storyteller",
    subtitle: "Natural breath, warm chest resonance, Netflix / BBC documentary cadence",
    stylePrompt:
      "Warm, empathetic human documentary narrator with natural breathing, organic micro-pauses, and intimate storytelling inflection",
    pitchContour: 0.96,
    rateContour: 0.95,
  },
  {
    voiceName: "Charon",
    title: "Charon · Deep Cinema Baritone",
    subtitle: "70mm feature documentary gravitas, slow deliberate phrasing",
    stylePrompt:
      "Deep, resonant human baritone narrator with cinematic authority, calm breathing, and unhurried documentary pacing",
    pitchContour: 0.88,
    rateContour: 0.92,
  },
  {
    voiceName: "Zephyr",
    title: "Zephyr · Field Reportage Journalist",
    subtitle: "On-location human authenticity, conversational inflection",
    stylePrompt:
      "Authentic on-location human field journalist with natural conversational rhythm, subtle breath, and clear human warmth",
    pitchContour: 1.0,
    rateContour: 0.98,
  },
  {
    voiceName: "Fenrir",
    title: "Fenrir · Investigative Data Narrator",
    subtitle: "Crisp articulation for numbers, districts, and policy impact",
    stylePrompt:
      "Articulate, composed human investigative narrator with natural emphasis on statistics, places, and human impact",
    pitchContour: 0.93,
    rateContour: 0.96,
  },
  {
    voiceName: "Puck",
    title: "Puck · Kinetic Visual Essayist",
    subtitle: "Fast-cut 0:27 documentary rhythm, dynamic human energy",
    stylePrompt:
      "Engaging, expressive human visual essayist with lively natural prosody and crisp pacing for fast-cut motion graphics",
    pitchContour: 1.02,
    rateContour: 1.01,
  },
];

export interface SceneCutMarker {
  id: string;
  timestamp: number;
  confidence: number; // 0 - 100
  deltaScore: number;
  label: string;
}

export const VISUAL_THEMES: {
  id: VisualThemeId;
  name: string;
  bgRgba: string;
  borderHex: string;
  textHex: string;
  accentHex: string;
  badgeLabel: string;
}[] = [
  {
    id: "cyber-broadcast",
    name: "Cyber Broadcast HUD",
    bgRgba: "rgba(9, 15, 26, 0.88)",
    borderHex: "#38BDF8",
    textHex: "#F8FAFC",
    accentHex: "#38BDF8",
    badgeLabel: "HUD // 4K",
  },
  {
    id: "cinema-editorial",
    name: "Cinema Editorial Gold",
    bgRgba: "rgba(18, 15, 12, 0.88)",
    borderHex: "#F59E0B",
    textHex: "#FEF3C7",
    accentHex: "#F59E0B",
    badgeLabel: "MASTER // 70MM",
  },
  {
    id: "creator-kinetic",
    name: "Creator Kinetic Pop",
    bgRgba: "rgba(15, 23, 42, 0.92)",
    borderHex: "#10B981",
    textHex: "#FFFFFF",
    accentHex: "#10B981",
    badgeLabel: "LIVE // PRO",
  },
  {
    id: "minimal-swiss",
    name: "Minimal Swiss Studio",
    bgRgba: "rgba(10, 10, 12, 0.90)",
    borderHex: "#E2E8F0",
    textHex: "#F8FAFC",
    accentHex: "#F43F5E",
    badgeLabel: "STUDIO // CH",
  },
  {
    id: "neon-glasstint",
    name: "Retrowave Frosted Glass",
    bgRgba: "rgba(19, 11, 36, 0.86)",
    borderHex: "#E879F9",
    textHex: "#FAE8FF",
    accentHex: "#22D3EE",
    badgeLabel: "SYNTH // HDR",
  },
];

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "zh", name: "Mandarin", nativeName: "中文" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
] as const;

export const UPSCALE_MODELS: UpscaleModelSpec[] = [
  {
    id: "proteus-v4",
    name: "Proteus v4 + AMD FSR RCAS",
    architecture: "6-Axis Deconvolution + Robust Contrast-Adaptive Sharpening",
    repoSource: "GPUOpen-Effects/FidelityFX-FSR · topaz-proteus",
    redditCommunityRating: "r/vfx Choice for Live-Action",
    scaleFactor: 4,
    specialty: "Combines 6-axis spatial deconvolution with AMD FSR RCAS local contrast clamping for zero-halo 4K edges",
    pipelineNodes: ["Bilateral Denoise", "EASU 4× Scale", "Proteus 6-Axis", "AMD RCAS Clamp"],
    defaultParams: {
      modelId: "proteus-v4",
      scaleFactor: 4,
      targetResolution: "4K UHD",
      targetFps: 60,
      revertCompression: 68,
      recoverDetail: 82,
      sharpen: 76,
      reduceNoise: 42,
      dehalo: 45,
      antiAliasDeblur: 74,
      motionInterpolation: true,
      simulateSourceBlur: 55,
    },
  },
  {
    id: "video2x-rife",
    name: "Video2X v6 + RIFE 4.6",
    architecture: "Unified Real-ESRGAN + Real-CUGAN + RIFE Optical Flow",
    repoSource: "github.com/k4yt3x/video2x · hzwer/Practical-RIFE",
    redditCommunityRating: "r/DataHoarder #1 All-in-One Framework",
    scaleFactor: 4,
    specialty: "Full Video2X restoration chain pairing ncnn-vulkan super-resolution with RIFE motion interpolation",
    pipelineNodes: ["NCNN Decode", "Real-CUGAN Denoise", "ESRGAN 4×", "RIFE 60fps Flow"],
    defaultParams: {
      modelId: "video2x-rife",
      scaleFactor: 4,
      targetResolution: "4K UHD",
      targetFps: 60,
      revertCompression: 76,
      recoverDetail: 86,
      sharpen: 80,
      reduceNoise: 52,
      dehalo: 48,
      antiAliasDeblur: 80,
      motionInterpolation: true,
      simulateSourceBlur: 55,
    },
  },
  {
    id: "chainner-rcas",
    name: "ChaiNNer Node-Graph Master",
    architecture: "Multi-Pass Node Chain (Color Fix → ONNX SR → RCAS)",
    repoSource: "github.com/chaiNNer-org/chaiNNer · sb2702/websr",
    redditCommunityRating: "r/LocalLLaMA #1 Node Compositor",
    scaleFactor: 4,
    specialty: "ChaiNNer-style multi-stage node pipeline with temporal anti-flicker, WebSR CNN weights & RCAS micro-contrast",
    pipelineNodes: ["Chroma Fix Node", "WebSR CNN 4×", "Sobel Push Node", "RCAS Final Pass"],
    defaultParams: {
      modelId: "chainner-rcas",
      scaleFactor: 4,
      targetResolution: "4K UHD",
      targetFps: 60,
      revertCompression: 82,
      recoverDetail: 88,
      sharpen: 84,
      reduceNoise: 48,
      dehalo: 58,
      antiAliasDeblur: 85,
      motionInterpolation: true,
      simulateSourceBlur: 55,
    },
  },
  {
    id: "anime4k-sobel",
    name: "Anime4K v4 WebGPU Sobel Push",
    architecture: "Real-Time Sobel Gradient Push + Line Thinning Shader",
    repoSource: "github.com/bloc97/Anime4K · 100cott/anime4k-webgpu",
    redditCommunityRating: "Best Real-Time Line & Edge Reconstructor",
    scaleFactor: 4,
    specialty: "Pushes blurred raster pixels outward along Sobel luminance gradients to rebuild razor-sharp geometric lines & text",
    pipelineNodes: ["Luma Gradient Map", "Sobel Line Thin", "Anime4K PushGrad", "Dehalo Clamp"],
    defaultParams: {
      modelId: "anime4k-sobel",
      scaleFactor: 4,
      targetResolution: "4K UHD",
      targetFps: 60,
      revertCompression: 70,
      recoverDetail: 90,
      sharpen: 88,
      reduceNoise: 60,
      dehalo: 65,
      antiAliasDeblur: 94,
      motionInterpolation: true,
      simulateSourceBlur: 55,
    },
  },
  {
    id: "realesrgan-x4",
    name: "Real-ESRGAN x4plus",
    architecture: "RRDBNet GAN Super-Resolution (xinntao/Real-ESRGAN)",
    repoSource: "github.com/xinntao/Real-ESRGAN",
    redditCommunityRating: "Gold Standard Texture GAN",
    scaleFactor: 4,
    specialty: "Aggressive high-frequency synthesis for heavily blurred web, archival & compressed footage",
    pipelineNodes: ["Deblock Filter", "RRDBNet 23-Block", "GAN Texture Synth", "Unsharp Mask"],
    defaultParams: {
      modelId: "realesrgan-x4",
      scaleFactor: 4,
      targetResolution: "4K UHD",
      targetFps: 60,
      revertCompression: 80,
      recoverDetail: 90,
      sharpen: 85,
      reduceNoise: 55,
      dehalo: 45,
      antiAliasDeblur: 82,
      motionInterpolation: true,
      simulateSourceBlur: 55,
    },
  },
  {
    id: "iris-v2",
    name: "Iris v2 + CodeFormer Face",
    architecture: "CodeFormer + Temporal Retinex Restoration",
    repoSource: "github.com/sczhou/CodeFormer",
    redditCommunityRating: "Top Portrait & Low-Light Recovery",
    scaleFactor: 2,
    specialty: "Skin texture fidelity, facial feature reconstruction & shadow noise suppression",
    pipelineNodes: ["Retinex Shadow Lift", "CodeFormer Codebook", "Chroma Denoise", "Soft RCAS"],
    defaultParams: {
      modelId: "iris-v2",
      scaleFactor: 2,
      targetResolution: "4K UHD",
      targetFps: 60,
      revertCompression: 60,
      recoverDetail: 74,
      sharpen: 64,
      reduceNoise: 72,
      dehalo: 50,
      antiAliasDeblur: 68,
      motionInterpolation: true,
      simulateSourceBlur: 55,
    },
  },
  {
    id: "swinir-pro",
    name: "SwinIR Shifted-Window Transformer",
    architecture: "Vision Transformer Image Restoration (JingyunLiang/SwinIR)",
    repoSource: "github.com/JingyunLiang/SwinIR",
    redditCommunityRating: "Best for Architecture & Typography",
    scaleFactor: 4,
    specialty: "Architectural straight lines, typography, signage & geometric edge accuracy",
    pipelineNodes: ["Shallow Feature Ext", "RSTB Shifted Window", "Deep Feature Recon", "Edge Lock"],
    defaultParams: {
      modelId: "swinir-pro",
      scaleFactor: 4,
      targetResolution: "4K UHD",
      targetFps: 60,
      revertCompression: 75,
      recoverDetail: 84,
      sharpen: 80,
      reduceNoise: 35,
      dehalo: 60,
      antiAliasDeblur: 86,
      motionInterpolation: true,
      simulateSourceBlur: 55,
    },
  },
  {
    id: "artemis-hq",
    name: "Artemis HQ + BasicVSR++",
    architecture: "Bi-Directional Optical Flow Alignment (BasicVSR++)",
    repoSource: "github.com/ckkelvinchan/BasicVSR_PlusPlus",
    redditCommunityRating: "Best Handheld Motion Deblur",
    scaleFactor: 2,
    specialty: "Eliminates camera shake, handheld motion smear & interlaced combing",
    pipelineNodes: ["2nd-Order Grid Prop", "Flow Guided Deform", "Temporal Aggregate", "RCAS Pass"],
    defaultParams: {
      modelId: "artemis-hq",
      scaleFactor: 2,
      targetResolution: "1080p FHD",
      targetFps: 60,
      revertCompression: 55,
      recoverDetail: 70,
      sharpen: 78,
      reduceNoise: 60,
      dehalo: 40,
      antiAliasDeblur: 92,
      motionInterpolation: true,
      simulateSourceBlur: 55,
    },
  },
];

export const MOTION_OS_SPECIALIST_ROLES: MotionOSSpecialistRole[] = [
  {
    code: "01",
    name: "Motion Art Direction",
    upstreamRepo: "claudemotion.design · Motion Briefs",
    capability: "Visual concept, stylistic consistency & documentary storytelling",
    qualityGateStatus: "VERIFIED",
  },
  {
    code: "02",
    name: "Editorial Intelligence",
    upstreamRepo: "Motion B-roll · Transcript Planner",
    capability: "Audio entity extraction (Names, Places, Data) & shot timecode mapping",
    qualityGateStatus: "VERIFIED",
  },
  {
    code: "03",
    name: "Typographic Design",
    upstreamRepo: "Remotion Skills · Swiss Grid",
    capability: "Optical alignment, deliberate line breaks & responsive lower thirds",
    qualityGateStatus: "VERIFIED",
  },
  {
    code: "04",
    name: "Motion Choreography",
    upstreamRepo: "LottieFiles Motion Design Rulebook",
    capability: "4-stage Enter → Settle → Hold → Exit spring & easing curves",
    qualityGateStatus: "VERIFIED",
  },
  {
    code: "05",
    name: "Data Visualisation",
    upstreamRepo: "Remotion Charts & Proportional Bars",
    capability: "Source-checked values, proportional bars & clear qualifiers",
    qualityGateStatus: "VERIFIED",
  },
  {
    code: "06",
    name: "Brand & Asset Integrity",
    upstreamRepo: "Motion Graphics Skill Pack · Lockups",
    capability: "Verified institutional lockups (BISP × KfW / Vetra) & consistent spacing",
    qualityGateStatus: "VERIFIED",
  },
  {
    code: "07",
    name: "Colour & Image Finishing",
    upstreamRepo: "ChaiNNer + AMD FSR RCAS + Anime4K",
    capability: "Individual shot matching, shadow protection & native-res sharpening",
    qualityGateStatus: "VERIFIED",
  },
  {
    code: "08",
    name: "Audio & Editorial Rhythm",
    upstreamRepo: "WebAudio Envelope & Formant Engine",
    capability: "Dialogue clarity, voice-over cue alignment & transition pacing",
    qualityGateStatus: "VERIFIED",
  },
  {
    code: "09",
    name: "Rendering Engineering",
    upstreamRepo: "Remotion + HyperFrames Deterministic",
    capability: "Frame-accurate f(frame, fps) compositing & MP4/WebM encoding",
    qualityGateStatus: "VERIFIED",
  },
  {
    code: "10",
    name: "Quality Assurance Gate",
    upstreamRepo: "FFmpeg Contact Sheet & Saliency Auditor",
    capability: "Contact sheet extraction, saliency collision & fact verification",
    qualityGateStatus: "VERIFIED",
  },
];

