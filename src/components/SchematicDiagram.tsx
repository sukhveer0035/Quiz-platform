import React from 'react';

export const SchematicDiagram: React.FC = () => {
  return (
    <div className="w-full bg-surface-container-lowest rounded-xl p-4 sm:p-5 flex flex-col gap-3 relative border border-outline-variant/30 shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/40">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-primary-container">memory</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant font-bold">
            SCHEMATIC // 2.5D/3D DIE STACKING BUS
          </span>
        </div>
        <span className="font-code-inline text-xs text-outline">INTERPOSER_V3.svg</span>
      </div>

      {/* Stylized Architecture SVG Diagram */}
      <div className="w-full h-44 sm:h-52 bg-surface-container-low/50 rounded-lg flex items-center justify-center p-2 overflow-hidden border border-outline-variant/15">
        <svg
          className="w-full h-full max-w-xl text-primary"
          fill="none"
          viewBox="0 0 680 180"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Silicon Substrate Layer */}
          <rect fill="#1c1f2a" height="22" rx="3" width="600" x="40" y="145" stroke="#3a494b" strokeWidth="1" />
          <text fill="#849495" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" x="50" y="160">
            PACKAGE SUBSTRATE (PCB BGA)
          </text>

          {/* Silicon Interposer */}
          <rect fill="#262a35" height="18" rx="2" width="500" x="90" y="112" stroke="#00dce6" strokeOpacity="0.4" strokeWidth="1" />
          <text fill="#00f2fe" fontFamily="JetBrains Mono" fontSize="10" fontWeight="700" x="100" y="125">
            PASSIVE SILICON INTERPOSER (CoWoS / TSV BUS)
          </text>

          {/* Microbumps array */}
          <g fill="#63f789" opacity="0.9">
            <circle cx="120" cy="138" r="2.5" />
            <circle cx="150" cy="138" r="2.5" />
            <circle cx="180" cy="138" r="2.5" />
            <circle cx="210" cy="138" r="2.5" />
            <circle cx="340" cy="138" r="2.5" />
            <circle cx="370" cy="138" r="2.5" />
            <circle cx="490" cy="138" r="2.5" />
            <circle cx="520" cy="138" r="2.5" />
            <circle cx="550" cy="138" r="2.5" />
          </g>

          {/* Host Compute Die */}
          <rect fill="#00373a" height="22" rx="3" width="190" x="110" y="80" stroke="#00f2fe" strokeWidth="1" />
          <text fill="#e0fdff" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" x="125" y="95">
            HOST COMPUTE DIE (ASIC / GPU)
          </text>

          {/* DRAM Stack 1 & Base Logic */}
          <rect fill="#353944" height="20" rx="2" width="210" x="360" y="80" stroke="#6f00be" strokeWidth="1" />
          <text fill="#ddb7ff" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" x="375" y="94">
            HBM BASE BUFFER DIE (LOGIC)
          </text>

          {/* DRAM Die Layer 1 */}
          <rect fill="#262a35" height="18" rx="2" width="210" x="360" y="54" stroke="#3a494b" strokeWidth="1" />
          <text fill="#dfe2f1" fontFamily="JetBrains Mono" fontSize="9" x="375" y="67">
            DRAM DIE #1 (16Gb 1β nm)
          </text>

          {/* DRAM Die Layer 2 */}
          <rect fill="#262a35" height="18" rx="2" width="210" x="360" y="28" stroke="#3a494b" strokeWidth="1" />
          <text fill="#dfe2f1" fontFamily="JetBrains Mono" fontSize="9" x="375" y="41">
            DRAM DIE #2 (16Gb 1β nm)
          </text>

          {/* DRAM Die Top Layer */}
          <rect fill="#313540" height="18" rx="2" width="210" x="360" y="2" stroke="#00dce6" strokeWidth="1" />
          <text fill="#6ff6ff" fontFamily="JetBrains Mono" fontSize="9" x="375" y="15">
            DRAM DIE #8 (TOP CAPACITOR)
          </text>

          {/* Vertical TSVs Piercing DRAM layers */}
          <g stroke="#00f2fe" strokeDasharray="2 3" strokeLinecap="round" strokeWidth="2.5">
            <line x1="410" x2="410" y1="10" y2="108" />
            <line x1="470" x2="470" y1="10" y2="108" />
            <line x1="530" x2="530" y1="10" y2="108" />
          </g>

          {/* High Speed Ultra-Dense Bus arrow */}
          <path d="M 300 90 L 360 90" stroke="#63f789" strokeDasharray="3 3" strokeWidth="3" />
          <text fill="#63f789" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" x="290" y="70">
            &gt;1.2 TB/s BANDWIDTH
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between text-[11px] font-code-inline text-on-surface-variant gap-2 pt-1">
        <span>PHYSICAL COUPLING: DIE-TO-DIE SILICON BRIDGING</span>
        <span className="text-tertiary">SIGNAL PIN COUNT: 1024-BIT PHY</span>
      </div>
    </div>
  );
};
