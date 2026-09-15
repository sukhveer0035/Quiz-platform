import { QuizQuestion, QuizArena, LeaderboardUser, Quest, Badge } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC33uHr8iFKDDevn5_movyFWamMLxJsW5kJbx-4E-BVH87CoOJ8FGBHUS0C6hYpG9Zxot4NQSGdzLlzrdBaDh4djJavsvzlBZ61Dl03lQ1LDzRVJkNqat3qVG_n1876_bFQlNHckzF4iQ3NTDrek8tL4bB0tOnGipmS5x9qky8kg-zlr6LLUtv3uT3jXMIOTKST0yiSWU82Rql27hJwv017Zq81ZtxQtnqmHjhAawr-Ji_1x92qRpAdXQ',
  userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9o61z0k9c-AUYPPSeCFupYxQ94rLCkthImVF76BFQyE6XrtE7_mxCbwn6pjCbYAg6pb3K1-T1_z5hZb1EiRQpem344K77Y4rTWaK45lX5kL_vHhgX79AxQLwyZBgfcUfK6SUf00UPOsYv7WQIGQEaBURqUIA77Qne3pzejhBtiGnxSxM6n36QSt4UGSsDO57zYhdEKIUnoGZDSNIw9rmflNEAYloeaFFgJvAdor8OjHp7EO7NpX2ygg',
  opponentAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUaGjhaPhK01MnIHQDtLlv1L6mXi7GX7Btw_aKdzdqpTFDV3DdMC7A5FqZxOqUCjwZQvOtjQuZJX4ZL4TF_EIHOkS53hfyvzc67b0PIC3aQYQOc5TZ-X4najoQAwC9oh92j7GdeoLarQ6WI0ZlgjEp65E1Wk50DUJIOfrrk7IYC2pl-TXb9IEf59iSzAlqIoTeh2gDfMyFZCnB2Oc2EtpgZR0O8sUzCCe_sBKfCViRf5J0nEAn7BCa2A',
  coWoSInterposer: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGV3lqz1irNNvRMh-Qny2dZ00UBmyaAoyJOxmEoWygrRNF8m3zNthGGOctslAA8NbQXVjWKp7ad93q8xo4tgef10Dg735h3MxOboXdyWnRMFrsjPLzZZN7_nnGLOYgofaUqze1b2_fvI0ayoboUC4m0VXOB8OsQWseoruTiAHZRVzas8cOpOt3OIc8_KZp31YyfdeFDEW5YCZWhZzrEX9rTh3FU7oonBqQqhg_W-bPgyovvY8h_gyT1w',
  plasmaTestTile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc13mjuOeZfJO_8R-Oifw61N3EGYSw1bpC5ZOl2BiXZ74B25WYazDqNPtCsVkKkpYxAzoFxxwbk-0qS63G0klw0u5ItyIyWrhv0b9CI_tY3EZPSYh3YEiLKg8TmwSoBPnCIUZWyGr4DX2zU4Zf3c4yq35C4u6mwYhtcIXxhd7vyA0YNST73HZDIMVu_vjaMRJtNqYe_CMbD1YR_7UruI4h7KCbyQMKWDtwsBxQvCH-GdQdWssJtjYJcw'
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    codeId: '0x1A2F4',
    category: 'SEMICONDUCTOR PACKAGING',
    phase: 1,
    totalPhases: 10,
    tier: 'SILICON // TIER 1',
    baseXp: 50,
    question: 'Which physical interconnect paradigm enables HBM3e 36GB memory dies to reach peak transfer rates of 9.6 Gbps per pin in current-generation Blackwell AI accelerators?',
    options: [
      { id: 'A', label: 'Vertical Through-Silicon Vias (TSV) with Microbumps', description: 'Etched copper columns through silicon dies on passive interposers.' },
      { id: 'B', label: 'Peripheral Gold Wire-Bonding Over Mold Compound', description: 'Traditional perimeter stitch-wire links across substrate boundaries.' },
      { id: 'C', label: 'Optical Waveguide Edge Connectors', description: 'Integrated photonic ribbon cables direct to substrate traces.' },
      { id: 'D', label: 'Inductive RF Near-Field Proximity Coupling', description: 'Wireless capacitive/magnetic resonance between die surfaces.' }
    ],
    correctOptionId: 'A',
    correctChoiceTitle: 'Vertical Through-Silicon Vias (TSV) with Microbump Substrates',
    explanation: 'TSVs eliminate wire-bond capacitance by etching conductive vertical copper columns directly through silicon dies, enabling 12-high stacked memory structures with minimal RC delay and 1.2 TB/s aggregate bandwidth.',
    isCorrect: true,
    userSubmission: 'Vertical Through-Silicon Vias (TSV) with Microbumps',
    solveTimeSeconds: 5.2,
    specimenImage: ASSETS.coWoSInterposer,
    specimenFig: 'FIG 1.1: CoWoS INTERPOSER STACK',
    specimenBadge: 'MICROBUMP ARRAY',
    primarySource: {
      name: 'TSMC 2024 Tech Symposium / CoWoS-L Whitepaper',
      url: '#'
    }
  },
  {
    id: 'q2',
    codeId: '0x3B9D1',
    category: 'ADVANCED LITHOGRAPHY',
    phase: 2,
    totalPhases: 10,
    tier: 'NANO FABRICATION',
    baseXp: 50,
    question: 'In High-NA EUV lithography (0.55 NA), what anamorphic magnification ratio was adopted to avoid wafer throughput collapse from smaller reticle exposure fields?',
    options: [
      { id: 'A', label: '4x in X-axis and 8x in Y-axis', description: 'Asymmetric 4x / 8x optics preserving standard 6-inch mask masks.' },
      { id: 'B', label: 'Isotropic 6x in all dimensions', description: 'Uniform 6x demagnification with custom square reticle formats.' },
      { id: 'C', label: 'Direct 2x reflective pellicle scan', description: 'Symmetric dual-beam projection without anamorphic shaping.' },
      { id: 'D', label: '10x ultra-telecentric reduction', description: 'Extreme reduction requiring quarter-size reticle step-and-repeat.' }
    ],
    correctOptionId: 'A',
    correctChoiceTitle: '4x in X-axis and 8x in Y-axis Anamorphic Magnification',
    explanation: 'High-NA EUV uses anamorphic mirrors providing 4x reduction horizontally and 8x reduction vertically. This mitigates mask 3D effects while maintaining standard 6-inch reticle dimensions without halving throughput.',
    isCorrect: true,
    userSubmission: '4x in X-axis and 8x in Y-axis',
    solveTimeSeconds: 4.6
  },
  {
    id: 'q3',
    codeId: '0x5C8E2',
    category: 'PROCESSOR ARCHITECTURE',
    phase: 3,
    totalPhases: 10,
    tier: 'COMPUTE ENGINE',
    baseXp: 50,
    question: 'How does RISC-V Vector Extension (RVV 1.0) handle variable vector length agnostic (VLA) programming compared to fixed AVX-512 SIMD?',
    options: [
      { id: 'A', label: 'Dynamic vector length configured via vsetvli instruction', description: 'Hardware-adaptive strip-mining determined at runtime without recompilation.' },
      { id: 'B', label: 'Static compiler loop unrolling with strict 512-bit register packing', description: 'Compile-time fixed masks with hardware register spill.' },
      { id: 'C', label: 'Microcode emulation using scalar arithmetic pipelines', description: 'Trap-and-emulate fallback for unknown vector widths.' },
      { id: 'D', label: 'Branch prediction speculative loop bundling', description: 'Software pipelining dependent on memory boundary alignment.' }
    ],
    correctOptionId: 'A',
    correctChoiceTitle: 'Dynamic vector length configured via vsetvli instruction',
    explanation: 'RVV decouples software loops from hardware vector length (VLEN). The vsetvli instruction dynamically configures execution length, allowing identical binaries to execute on 128-bit microcontrollers or 2048-bit supercomputer vector units.',
    isCorrect: true,
    userSubmission: 'Dynamic vector length configured via vsetvli instruction',
    solveTimeSeconds: 6.1
  },
  {
    id: 'q4',
    codeId: '0x7E4C0',
    category: 'AEROSPACE & THERMODYNAMICS',
    phase: 4,
    totalPhases: 10,
    tier: 'EXTREME FLIGHT',
    baseXp: 50,
    question: 'During orbital re-entry on Starship Flight 4, what specific material backstop prevented structural breach after hexagonal tile plasma burn-through at the forward hinge junction?',
    options: [
      { id: 'A', label: 'Tungsten-Reinforced Carbon Carbon (RCC)', description: 'Dense high-inertia refractory carbon weave across hinge ribs.' },
      { id: 'B', label: 'Secondary Refractory Ceramic Wool Blanket (Saffil/Alumina)', description: 'High-temperature flexible alumina-silica fiber batting under tiles.' },
      { id: 'C', label: 'Active Transpiration Methane Liquid Film Cooling', description: 'Cryogenic liquid boundary layer injected through micro-pores.' },
      { id: 'D', label: 'Beryllium-Copper Sacrificial Ablative Paste', description: 'Endothermic decomposing paste lined over actuator knuckles.' }
    ],
    correctOptionId: 'B',
    correctChoiceTitle: 'Secondary Refractory Ceramic Wool Blanket (Saffil/Alumina)',
    explanation: 'While Flight 4 experienced significant burn-through on the forward starboard flap hinge, the high-alumina ceramic fiber blanket underlying the hexagonal silica tiles protected the 304L stainless steel actuating skeleton, allowing active steering through terminal descent.',
    isCorrect: false,
    userSubmission: 'Tungsten-Reinforced Carbon Carbon (RCC)',
    solveTimeSeconds: 12.4,
    specimenImage: ASSETS.plasmaTestTile,
    specimenFig: 'SPEC: HEX SILICA TILE ARRAY',
    specimenBadge: 'PLASMA RE-ENTRY',
    primarySource: {
      name: 'Aviation Week: SpaceX Starship Flight 4 Aerothermal Telemetry Analysis',
      url: '#'
    },
    lesson: 'Tungsten RCC is too heavy for orbital hinge articulation. The secondary alumina/saffil ceramic wool blanket provided emergency thermal protection against 1,600°C re-entry plasma wash.'
  },
  {
    id: 'q5',
    codeId: '0x9D2A7',
    category: 'POST-QUANTUM CRYPTO',
    phase: 5,
    totalPhases: 10,
    tier: 'LATTICE SECURITY',
    baseXp: 50,
    question: 'NIST ratified ML-KEM (FIPS 203, based on CRYSTALS-Kyber) as standard PQC. What underlying mathematical hardness assumption protects it against Shor’s quantum algorithm?',
    options: [
      { id: 'A', label: 'Module Learning With Errors (M-LWE) over polynomial rings', description: 'Finding vector coordinates in high-dimensional algebraic lattices with noise.' },
      { id: 'B', label: 'Elliptic curve isogeny random walks (SIKE)', description: 'Graph navigations between supersingular elliptic curve invariants.' },
      { id: 'C', label: 'Univariate discrete logarithms over Galois fields GF(2^n)', description: 'Modular exponentiation inversion in finite fields.' },
      { id: 'D', label: 'Multivariate quadratic polynomial system equation inversion', description: 'Solving large systems of degree-2 polynomial equations over GF(256).' }
    ],
    correctOptionId: 'A',
    correctChoiceTitle: 'Module Learning With Errors (M-LWE) over polynomial rings',
    explanation: 'ML-KEM relies on the Module Learning With Errors (M-LWE) problem over polynomial rings. No polynomial-time quantum algorithm is known for shortest vector lattice problems, contrasting with discrete logs and RSA which Shor’s algorithm shatters.',
    isCorrect: true,
    userSubmission: 'Module Learning With Errors (M-LWE) over polynomial rings',
    solveTimeSeconds: 7.3
  },
  {
    id: 'q6',
    codeId: '0x4F1B8',
    category: 'CLEANTECH & BATTERY CHEMISTRY',
    phase: 6,
    totalPhases: 10,
    tier: 'SOLID STATE',
    baseXp: 50,
    question: 'What mechanism in garnet-type LLZO (Li7La3Zr2O12) solid-state electrolytes suppresses lithium dendrite penetration during fast charging?',
    options: [
      { id: 'A', label: 'High mechanical shear modulus (>60 GPa) with dense grain boundaries', description: 'Exceeding Monroe-Newman criterion to physically block lithium whisker nucleation.' },
      { id: 'B', label: 'Liquid gel interface phase transition at 45°C', description: 'Thermal melting of sacrificial gel additives.' },
      { id: 'C', label: 'Polymer swelling under electrochemical polarization', description: 'Spongiform expansion blocking lithium ion migration.' },
      { id: 'D', label: 'Capacitive dielectric breakdown of the cathode current collector', description: 'Deliberate localized short-circuit dissipation.' }
    ],
    correctOptionId: 'A',
    correctChoiceTitle: 'High mechanical shear modulus (>60 GPa) with dense grain boundaries',
    explanation: 'According to the Monroe-Newman stability model, an electrolyte with a shear modulus roughly double that of metallic lithium (~3.4 GPa) can physically resist dendrite growth, provided grain boundary defects and interfacial voids are eliminated.',
    isCorrect: true,
    userSubmission: 'High mechanical shear modulus (>60 GPa) with dense grain boundaries',
    solveTimeSeconds: 6.8
  },
  {
    id: 'q7',
    codeId: '0x8F3C9',
    category: 'SILICON & AI ARCHITECTURE',
    phase: 7,
    totalPhases: 10,
    tier: 'HARDWARE ACCELERATOR',
    baseXp: 300,
    question: 'Which packaging technology enables High-Bandwidth Memory (HBM3e) to achieve over 1.2 TB/s per stack by stacking DRAM dies vertically over a base logic die?',
    schematicTitle: 'SCHEMATIC // 2.5D/3D DIE STACKING BUS',
    schematicFile: 'INTERPOSER_V3.svg',
    hasSchematicSvg: true,
    options: [
      {
        id: 'A',
        label: 'Through-Silicon Vias (TSV) & CoWoS',
        description: 'Vertical copper interconnects piercing silicon DRAM layers seated directly on a micro-bumped interposer.'
      },
      {
        id: 'B',
        label: 'Wire Bonding with Gold Interconnects',
        description: 'Planar peripheral stitching via micro-diameter metal alloy filaments across substrate margins.'
      },
      {
        id: 'C',
        label: 'Monolithic Single-Die Slicing',
        description: 'Single monolithic substrate etched dynamically with zero heterogeneous packaging boundaries.'
      },
      {
        id: 'D',
        label: 'Optocoupler Photonic Bridge',
        description: 'Near-infrared fiber laser transceivers embedded directly into organic mold compound.'
      }
    ],
    correctOptionId: 'A',
    correctChoiceTitle: 'Through-Silicon Vias (TSV) & CoWoS',
    explanation: 'TSMC CoWoS (Chip-on-Wafer-on-Substrate) or Intel EMIB/Foveros uses Through-Silicon Vias (TSVs) to route thousands of parallel signal lines through stacked DRAM layers to a base logic die, delivering ultra-wide 1024-bit interfaces with >1.2 TB/s throughput.',
    isCorrect: true,
    userSubmission: 'Through-Silicon Vias (TSV) & CoWoS',
    solveTimeSeconds: 5.8
  },
  {
    id: 'q8',
    codeId: '0x2D7E9',
    category: 'AI COMPILER KERNELS',
    phase: 8,
    totalPhases: 10,
    tier: 'SRAM OPTIMIZATION',
    baseXp: 50,
    question: 'How does OpenAI Triton avoid the manual shared-memory bank conflict optimization required in bare CUDA C++?',
    options: [
      { id: 'A', label: 'Automatic compiler-level swizzling and SRAM allocation', description: 'Tile abstraction layer delegating coalescence and shared-memory layout schedules to LLVM.' },
      { id: 'B', label: 'Running all tensor multiplications in L2 cache only', description: 'Bypassing on-chip shared memory completely in favor of L2 read buffers.' },
      { id: 'C', label: 'Dynamic register spilling to Host DDR5 system memory', description: 'Offloading uncoalesced strides over PCIe Gen5.' },
      { id: 'D', label: 'Hardware warp serialization through asynchronous copy barrier instructions', description: 'Enforcing single-threaded execution during memory bank collisions.' }
    ],
    correctOptionId: 'A',
    correctChoiceTitle: 'Automatic compiler-level swizzling and SRAM allocation',
    explanation: 'Triton operates at the tile abstraction level rather than thread-level SIMT, delegating coalescence and shared-memory layout schedules to its LLVM-based compiler backend.',
    isCorrect: true,
    userSubmission: 'Automatic compiler-level swizzling and SRAM allocation',
    solveTimeSeconds: 4.8
  },
  {
    id: 'q9',
    codeId: '0x6A3B5',
    category: 'FRONTIER LLM ARCHITECTURE',
    phase: 9,
    totalPhases: 10,
    tier: 'ATTENTION MECHANISMS',
    baseXp: 50,
    question: 'What is the primary inference speedup mechanism of DeepSeek-V3 Multi-head Latent Attention (MLA) over conventional MHA or GQA?',
    options: [
      { id: 'A', label: 'Low-rank joint compression of Key and Value vectors into a compact latent vector', description: 'Drastically compressing KV-cache memory bandwidth requirement by up to 93% during autoregressive decoding.' },
      { id: 'B', label: 'Pruning 80% of attention heads during the prefill phase', description: 'Static structural head elimination based on perplexity thresholding.' },
      { id: 'C', label: 'Quantizing weights to 1-bit binary representation in attention matrices', description: 'Binarized matrix operations using BitNet convolution kernels.' },
      { id: 'D', label: 'Replacing softmax normalization with linear causal convolutions', description: 'Recurrent state space model conversion akin to Mamba SSM.' }
    ],
    correctOptionId: 'A',
    correctChoiceTitle: 'Low-rank joint compression of Key and Value vectors into a compact latent vector',
    explanation: 'MLA compresses both Key and Value vectors into a unified low-dimensional latent space before storing in KV-cache. During inference, this cuts memory footprint and bus transfer by ~93%, enabling massive context lengths with uncompromised reasoning capability.',
    isCorrect: true,
    userSubmission: 'Low-rank joint compression of Key and Value vectors into a compact latent vector',
    solveTimeSeconds: 5.4
  },
  {
    id: 'q10',
    codeId: '0x99FF1',
    category: 'SCALE-OUT INFRASTRUCTURE',
    phase: 10,
    totalPhases: 10,
    tier: 'BOSS // BLACKWELL CLUSTER',
    baseXp: 100,
    question: 'How does NVIDIA NVLink 5.0 achieve 1.8 TB/s bidirectional bandwidth per GPU in the NVL72 liquid-cooled rack scale architecture?',
    options: [
      { id: 'A', label: '18 NVLink-5 links running 200 Gb/s PAM4 SerDes through a passive copper cartridge backplane', description: '9 Switch trays interconnecting 72 GPUs over twinaxial micro-copper harnesses with zero optical transceiver latency.' },
      { id: 'B', label: 'Active optical HDMI cables routed through Top-of-Rack InfiniBand switches', description: 'Standard QSFP-DD fiber cables with DSP retimers.' },
      { id: 'C', label: 'Direct PCIe Gen6 x32 bifurcated copper riser cables', description: 'Standard root complex bifurcation without crossbar switching.' },
      { id: 'D', label: 'Wireless 60GHz millimeter-wave phased array chassis transceivers', description: 'Over-the-air packet beamforming inside the rack enclosure.' }
    ],
    correctOptionId: 'A',
    correctChoiceTitle: '18 NVLink-5 links running 200 Gb/s PAM4 SerDes through a passive copper cartridge backplane',
    explanation: 'NVL72 uses 18 physical NVLink ports running at 200 Gb/s PAM4 per differential pair. By using passive cartridge copper cables within the 2-meter rack radius, power consumption is reduced by 20 kW compared to optical modules while delivering 130 TB/s bisection bandwidth across 72 GPUs.',
    isCorrect: true,
    userSubmission: '18 NVLink-5 links running 200 Gb/s PAM4 SerDes through a passive copper cartridge backplane',
    solveTimeSeconds: 6.2
  }
];

export const TECH_ARENAS: QuizArena[] = [
  {
    id: 'silicon-semi',
    title: 'Silicon & Semi',
    description: 'TSMC 2nm N2 updates, RISC-V compute revolution, and HBM3e ultra-wide memory interconnect design.',
    icon: 'memory',
    colorScheme: 'primary',
    quizzesCount: 12,
    tagline: '120Q',
    tags: ['#TSMC', '#RISCV', '#HBM3E'],
    activePlayers: 340,
    maxXP: 220
  },
  {
    id: 'genai-frontier',
    title: 'GenAI & Frontier Models',
    description: 'Complex reasoning benchmarks, Mixture of Experts routing, and multimodal agent task planning.',
    icon: 'neurology',
    colorScheme: 'secondary',
    quizzesCount: 24,
    tagline: 'TRENDING',
    tags: ['#LLM', '#MoE', '#AGENTS'],
    activePlayers: 712,
    maxXP: 350
  },
  {
    id: 'aerospace-robotics',
    title: 'Aerospace & Robotics',
    description: 'Starship Orbital stage flight kinematics, bipedal humanoid balance actuators, and lunar avionics.',
    icon: 'rocket',
    colorScheme: 'tertiary',
    quizzesCount: 9,
    tagline: 'HARD',
    tags: ['#AVIONICS', '#STARSHIP', '#KINEMATICS'],
    activePlayers: 190,
    maxXP: 280
  },
  {
    id: 'cleantech-energy',
    title: 'CleanTech & Energy',
    description: 'Solid-state electrolyte chemistry, tokamak magnetic containment milestones, and virtual smart grids.',
    icon: 'bolt',
    colorScheme: 'primary',
    quizzesCount: 14,
    tags: ['#FUSION', '#SOLID_STATE', '#GRID_SCALE'],
    activePlayers: 248,
    maxXP: 200
  },
  {
    id: 'cyber-quantum',
    title: 'Cyber & Quantum',
    description: 'Post-quantum lattice cryptography standards, zero-trust enclave execution, and qubit decoherence mitigation.',
    icon: 'lock',
    colorScheme: 'error',
    quizzesCount: 8,
    tagline: 'EXPERT',
    tags: ['#NIST_PQC', '#SGX', '#QUBIT'],
    activePlayers: 410,
    maxXP: 320
  },
  {
    id: 'devtools-oss',
    title: 'DevTools & Open Source',
    description: 'Linux kernel Rust integrations, WebAssembly Garbage Collection (WasmGC), and high-throughput vLLM serving.',
    icon: 'terminal',
    colorScheme: 'secondary',
    quizzesCount: 18,
    tags: ['#RUST', '#WASM', '#VLLM'],
    activePlayers: 530,
    maxXP: 240
  }
];

export const LIVE_HEADLINES = [
  {
    id: 'hl-1',
    category: 'SILICON',
    categoryColor: 'primary',
    title: 'NVIDIA unveils Blackwell NVLink ultra-interconnect: Test your knowledge',
    meta: '5 Questions • 1.8 TB/s bidirectional bandwidth dynamics • 80 XP',
    arenaId: 'silicon-semi'
  },
  {
    id: 'hl-2',
    category: 'RESEARCH',
    categoryColor: 'secondary',
    title: 'DeepSeek-V3 architecture paper: Multi-head Latent Attention examined',
    meta: '8 Questions • MLA compression & DualPipe algorithm • 120 XP',
    arenaId: 'genai-frontier'
  },
  {
    id: 'hl-3',
    category: 'DEV OPS',
    categoryColor: 'tertiary',
    title: 'OpenSSL releases critical memory sanitization patch for TLS handshakes',
    meta: '4 Questions • Buffer boundaries & zeroization • 60 XP',
    arenaId: 'cyber-quantum'
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  { rank: 1, name: 'ByteMaster99', xp: 4920, accuracy: 100, tag: 'TSMC_ARCH' },
  { rank: 2, name: 'HyperThreader', xp: 4710, accuracy: 98, tag: 'RUST_L2' },
  { rank: 3, name: 'KubeWhiz', xp: 4450, accuracy: 95, tag: 'CLOUD_NATIVE' },
  { rank: 4, name: 'SiliconScribe', xp: 4320, accuracy: 94.5, tag: 'RISCV_DEV' },
  { rank: 5, name: 'QuantumQuBit', xp: 4190, accuracy: 93, tag: 'PQC_NIST' },
  { rank: 6, name: 'VectorValkyrie', xp: 4120, accuracy: 92.8, tag: 'CUDA_CORE' },
  { rank: 142, name: 'DevZero (You)', xp: 3450, accuracy: 84.2, tag: 'SYSTEMS_AI', isCurrentUser: true }
];

export const ACTIVE_QUESTS: Quest[] = [
  {
    id: 'q-1',
    title: 'Silicon Sub-Nanometer Sprint',
    description: 'Answer 5 semiconductor architecture questions with >90% speed accuracy.',
    progress: 4,
    maxProgress: 5,
    rewardXp: 250,
    icon: 'memory',
    completed: false
  },
  {
    id: 'q-2',
    title: 'Kernel Speed Demon',
    description: 'Maintain sub-10 second latency across 10 consecutive phases in Daily Arena.',
    progress: 9,
    maxProgress: 10,
    rewardXp: 300,
    icon: 'bolt',
    completed: false
  },
  {
    id: 'q-3',
    title: 'PQC Lattice Cipher Sentry',
    description: 'Solve all cryptography puzzles without triggering the 50/50 lifeline.',
    progress: 3,
    maxProgress: 3,
    rewardXp: 400,
    icon: 'lock',
    completed: true
  }
];

export const BADGES: Badge[] = [
  {
    id: 'b-1',
    title: 'Fluid Architect',
    description: 'Reach S-Tier ranking on a Tier-2 or higher hardware conclave sprint.',
    icon: 'rocket_launch',
    unlocked: true,
    tier: 'Epic',
    rarityPercent: 4.2
  },
  {
    id: 'b-2',
    title: 'Silicon Guru',
    description: 'Achieve 100% accuracy on HBM3e, CoWoS, and GAA packaging questions.',
    icon: 'memory',
    unlocked: true,
    tier: 'Rare',
    rarityPercent: 8.7
  },
  {
    id: 'b-3',
    title: 'First Blood Armor',
    description: 'Survive a missed boss-level question with active streak shield preserved.',
    icon: 'shield',
    unlocked: true,
    tier: 'Common',
    rarityPercent: 28.5
  },
  {
    id: 'b-4',
    title: 'Quantum Entangled',
    description: 'Complete 5 head-to-head multiplayer duels with zero incorrect answers.',
    icon: 'all_inclusive',
    unlocked: false,
    tier: 'Legendary',
    rarityPercent: 1.1
  }
];
