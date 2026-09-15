import React, { useState } from 'react';
import { ASSETS, QUIZ_QUESTIONS } from '../data/quizData';
import { playSound } from '../utils/sound';

interface ResultsDebriefProps {
  score?: number;
  total?: number;
  earnedXp?: number;
  streak?: number;
  onPlayAgain: () => void;
  onBackToHub: () => void;
}

export const ResultsDebrief: React.FC<ResultsDebriefProps> = ({
  score = 9,
  total = 10,
  earnedXp = 450,
  streak = 6,
  onPlayAgain,
  onBackToHub
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'missed' | 'correct'>('all');
  const [copied, setCopied] = useState<boolean>(false);

  const percentage = Math.round((score / total) * 100);

  const handleCopyScorecard = () => {
    playSound('select');
    const scorecard = `⚡ TechPulse // QUIZ DEBRIEF #142\n🏆 Score: ${score}/${total} (${percentage}%) - S-TIER\n🔥 Streak: ${streak} Days\n⚡ XP Gained: +${earnedXp} XP\n⏱️ Avg Latency: 8.4s\nVerify telemetry: ${window.location.href}`;
    navigator.clipboard.writeText(scorecard);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadAuditLog = () => {
    playSound('correct');
    const auditData = {
      session_id: 'TP-2025-0x8F3C9-90',
      timestamp: new Date().toISOString(),
      cluster_node: 'US-WEST-VLLM-77',
      score: `${score}/${total}`,
      accuracy: `${percentage}%`,
      tier: 'S-TIER',
      avg_latency_ms: 8400,
      p99_ms: 184,
      token_cost_usd: 0.0042,
      answers_verified: QUIZ_QUESTIONS.map((q) => ({
        code: q.codeId,
        category: q.category,
        is_correct: q.isCorrect ?? true,
        user_choice: q.userSubmission ?? q.correctChoiceTitle,
        validated_choice: q.correctChoiceTitle,
        solve_time_sec: q.solveTimeSeconds ?? 6.2
      }))
    };

    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TechPulse-Audit-Session-142.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    const isCorr = q.isCorrect ?? true;
    if (filterMode === 'missed') return !isCorr;
    if (filterMode === 'correct') return isCorr;
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Breadcrumb & Session Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click');
              onBackToHub();
            }}
            className="flex items-center gap-1.5 font-label-caps text-xs text-primary hover:text-primary-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>&lt; DAILY ARENA #142</span>
          </button>
          <span className="text-outline">|</span>
          <span className="font-code-inline text-xs text-on-surface-variant">SESSION // 08m:24s</span>
          <span className="text-outline">|</span>
          <span className="font-code-inline text-xs text-tertiary">COMPUTED AT 06:14 UTC</span>
        </div>

        <button
          onClick={handleCopyScorecard}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-code-inline text-xs border border-outline-variant/30 transition-colors cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-sm">
            {copied ? 'check' : 'content_copy'}
          </span>
          <span>{copied ? 'SCORECARD COPIED!' : 'COPY SCORECARD'}</span>
        </button>
      </div>

      {/* Celebration Hero Banner */}
      <section className="relative rounded-2xl bg-surface-container-low p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden border border-outline-variant/30">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Content */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-primary-container/15 text-primary-container font-label-caps text-label-caps uppercase font-bold tracking-wider">
                ARCHITECTURAL CONCLAVE
              </span>
              <span className="px-2.5 py-1 rounded-full bg-tertiary-container/15 text-tertiary font-code-inline text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                <span>CIRCUIT COMPLETE</span>
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-display-hero text-headline-lg sm:text-display-hero text-primary tracking-tight leading-tight">
                Circuit Overload! Fluid Architect
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                You dissected high-concurrency memory pipelines, orbital thermal physics, and edge AI compilation with sub-second intuition. System telemetry elevated to elite grade.
              </p>
            </div>

            {/* Gained Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-container/15 text-primary-container font-code-inline text-sm font-bold border border-primary-container/30">
                <span className="material-symbols-outlined text-base">bolt</span>
                <span>+{earnedXp} XP</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary-container/30 text-secondary font-code-inline text-sm font-bold border border-secondary/30">
                <span className="material-symbols-outlined text-base">toll</span>
                <span>+75 TechCoins</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-tertiary-container/15 text-tertiary font-code-inline text-sm font-bold border border-tertiary-container/30">
                <span className="material-symbols-outlined text-base">local_fire_department</span>
                <span>{streak}-Day Streak (1.25x Multiplier)</span>
              </div>
            </div>
          </div>

          {/* Right Dial Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-xs p-6 rounded-2xl bg-surface-container shadow-2xl flex flex-col items-center gap-4 text-center border border-outline-variant/30">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-tertiary-container"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${percentage}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-telemetry-counter text-3xl text-primary font-bold">
                    {percentage}%
                  </span>
                  <span className="font-label-caps text-[10px] text-tertiary uppercase font-bold">
                    {score} OF {total} PASS
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-fixed font-label-caps text-xs font-bold uppercase shadow-sm">
                  S-TIER ACCURACY
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant pt-1">
                  Top 4% Today &bull; Beat 96% of 14,280 participating engineers.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Telemetry (3 Cards) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bento 1: Velocity Pulse */}
        <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between gap-4 border border-outline-variant/30 shadow-md">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">
                Velocity Pulse
              </span>
              <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-container font-code-inline text-[10px] font-bold">
                +50 XP BONUS
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-telemetry-counter text-3xl text-primary font-bold">8.4s</span>
              <span className="font-body-sm text-xs text-on-surface-variant">avg latency / question</span>
            </div>
            <span className="font-label-md text-xs text-tertiary flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">speed</span> Speed Demon threshold was 11.0s
            </span>
          </div>

          {/* SVG Latency Profile Mini Chart */}
          <div className="w-full h-20 bg-surface-container-low rounded-lg p-2 flex flex-col justify-end overflow-hidden border border-outline-variant/20">
            <div className="flex items-center justify-between text-[9px] font-code-inline text-outline pb-1">
              <span>Q1 (5.2s)</span>
              <span>Q4 (12.4s)</span>
              <span>Q10 (6.2s)</span>
            </div>
            <svg className="w-full h-10 overflow-visible" viewBox="0 0 200 40">
              <polyline
                fill="none"
                stroke="#00f2fe"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                points="10,25 30,28 50,22 70,8 90,20 110,21 130,24 150,27 170,23 190,21"
              />
              {/* Data dots */}
              <circle cx="10" cy="25" fill="#63f789" r="2.5" />
              <circle cx="30" cy="28" fill="#63f789" r="2.5" />
              <circle cx="50" cy="22" fill="#63f789" r="2.5" />
              <circle cx="70" cy="8" fill="#ffb4ab" r="3.5" />
              <circle cx="90" cy="20" fill="#63f789" r="2.5" />
              <circle cx="110" cy="21" fill="#63f789" r="2.5" />
              <circle cx="130" cy="24" fill="#63f789" r="2.5" />
              <circle cx="150" cy="27" fill="#63f789" r="2.5" />
              <circle cx="170" cy="23" fill="#63f789" r="2.5" />
              <circle cx="190" cy="21" fill="#63f789" r="2.5" />
            </svg>
          </div>
        </div>

        {/* Bento 2: Subsystem Matrix */}
        <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between gap-4 border border-outline-variant/30 shadow-md">
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">
              Subsystem Matrix
            </span>

            <div className="flex flex-col gap-2.5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-code-inline">
                  <span className="text-on-surface">Semiconductor &amp; Packaging</span>
                  <span className="text-tertiary">100%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-tertiary-container" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-code-inline">
                  <span className="text-on-surface">Aerospace Materials</span>
                  <span className="text-secondary">75%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-code-inline">
                  <span className="text-on-surface">Autonomous Compute Kernels</span>
                  <span className="text-primary-container">100%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-primary-container" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-tertiary-container/10 border border-tertiary-container/30 text-xs font-code-inline text-tertiary flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>Earned micro-credential: Silicon Packaging Level 2</span>
          </div>
        </div>

        {/* Bento 3: Live Hardware Telemetry Pod */}
        <div className="p-6 rounded-2xl bg-surface-container flex flex-col justify-between gap-4 border border-outline-variant/30 shadow-md">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">
                Hardware Node Telemetry
              </span>
              <span className="flex items-center gap-1 text-[10px] font-code-inline text-tertiary">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> ONLINE
              </span>
            </div>

            <div className="flex flex-col gap-1 text-xs font-code-inline text-on-surface-variant bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
              <div className="flex justify-between">
                <span>POD:</span>
                <span className="text-primary font-bold">US-WEST-VLLM-77</span>
              </div>
              <div className="flex justify-between">
                <span>TOKEN COST:</span>
                <span className="text-primary font-bold">$0.0042</span>
              </div>
              <div className="flex justify-between">
                <span>P99 QUERY TIME:</span>
                <span className="text-primary font-bold">184ms</span>
              </div>
              <div className="flex justify-between">
                <span>SEED HASH:</span>
                <span className="text-primary truncate max-w-[130px]">0x9F4C2A18D</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownloadAuditLog}
            className="w-full py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-primary font-label-caps text-xs font-bold border border-outline-variant/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>DOWNLOAD AUDIT LOG (.JSON)</span>
          </button>
        </div>
      </section>

      {/* Curated Architecture Debrief (Intel Deep Dive) */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
              // TELEMETRY POST-MORTEM
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
              Curated Architecture Debrief
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 font-label-caps text-xs">
            <button
              onClick={() => {
                playSound('click');
                setFilterMode('all');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-primary-container text-on-primary-fixed font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              ALL ({total})
            </button>
            <button
              onClick={() => {
                playSound('click');
                setFilterMode('missed');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterMode === 'missed'
                  ? 'bg-error text-on-error font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              MISSED ({total - score})
            </button>
            <button
              onClick={() => {
                playSound('click');
                setFilterMode('correct');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                filterMode === 'correct'
                  ? 'bg-tertiary-container text-on-tertiary-container font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              CORRECT ({score})
            </button>
          </div>
        </div>

        {/* Question Review Cards */}
        <div className="flex flex-col gap-6">
          {filteredQuestions.map((q) => {
            const isCorr = q.isCorrect ?? true;

            return (
              <div
                key={q.id}
                className={`rounded-2xl p-6 flex flex-col gap-5 border shadow-md transition-all ${
                  isCorr
                    ? 'bg-surface-container border-outline-variant/30'
                    : 'bg-surface-container border-error/50 ring-1 ring-error/30'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-code-inline text-xs font-bold ${
                        isCorr
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : 'bg-error text-on-error'
                      }`}
                    >
                      {isCorr ? '✓' : '✗'}
                    </span>
                    <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">
                      PHASE 0{q.phase} // {q.category}
                    </span>
                  </div>

                  <span className="font-code-inline text-xs text-outline">
                    SOLVE TIME: {q.solveTimeSeconds ?? 6.2}s
                  </span>
                </div>

                <h3 className="font-headline-sm text-lg text-primary font-bold leading-snug">
                  {q.question}
                </h3>

                {/* Submissions & Validated Architecture comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-code-inline">
                  <div
                    className={`p-3.5 rounded-xl border flex flex-col gap-1 ${
                      isCorr
                        ? 'bg-tertiary-container/10 border-tertiary-container/40 text-tertiary'
                        : 'bg-error-container/20 border-error/40 text-error'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider">
                      {isCorr ? 'YOUR SUBMISSION (VALIDATED):' : 'YOUR SUBMISSION (REJECTED):'}
                    </span>
                    <span className="font-bold text-sm text-on-surface">
                      {q.userSubmission ?? q.correctChoiceTitle}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-container-high border border-primary-container/30 flex flex-col gap-1 text-primary">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-primary-container">
                      VALIDATED ARCHITECTURE:
                    </span>
                    <span className="font-bold text-sm text-on-surface">
                      {q.correctChoiceTitle}
                    </span>
                  </div>
                </div>

                {/* Detailed Technical Debrief */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-2">
                  <span className="font-label-caps text-[11px] text-primary uppercase font-bold">
                    SYSTEM ARCHITECTURE BREAKDOWN:
                  </span>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {q.explanation}
                  </p>
                  {q.lesson && (
                    <div className="mt-1 pt-2 border-t border-outline-variant/20 flex items-start gap-2 text-xs text-secondary font-body-sm">
                      <span className="material-symbols-outlined text-sm shrink-0">school</span>
                      <span>
                        <strong>Engineering Lesson:</strong> {q.lesson}
                      </span>
                    </div>
                  )}
                </div>

                {/* Specimen Card (if available) */}
                {q.specimenImage && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                    <img
                      src={q.specimenImage}
                      alt={q.specimenFig ?? 'Specimen'}
                      className="w-full sm:w-36 h-24 object-cover rounded-lg border border-outline-variant/20"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-code-inline text-xs text-primary font-bold">
                        {q.specimenFig}
                      </span>
                      <span className="font-label-caps text-[10px] text-tertiary">
                        {q.specimenBadge} &bull; PRIMARY SPECIMEN
                      </span>
                      {q.primarySource && (
                        <a
                          href={q.primarySource.url}
                          onClick={(e) => e.preventDefault()}
                          className="font-code-inline text-[11px] text-outline hover:text-primary underline pt-1"
                        >
                          Source: {q.primarySource.name}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Arcade Action CTAs */}
      <section className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
        <button
          onClick={() => {
            playSound('click');
            onBackToHub();
          }}
          className="px-6 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-sm font-bold border border-outline-variant/30 transition-colors cursor-pointer"
          type="button"
        >
          &larr; BACK TO HUB
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyScorecard}
            className="px-5 py-3 rounded-xl bg-surface-container-high hover:bg-surface-bright text-primary font-code-inline text-xs font-bold border border-outline-variant/40 transition-colors cursor-pointer"
            type="button"
          >
            SHARE SCORECARD [COPY BADGE]
          </button>
          <button
            onClick={() => {
              playSound('lock');
              onPlayAgain();
            }}
            className="px-8 py-3 rounded-xl bg-primary-container text-on-primary-fixed font-headline-sm text-sm uppercase tracking-wider font-bold hover:brightness-110 active:translate-y-0.5 shadow-[0_4px_0_0_#006a70] transition-all cursor-pointer"
            type="button"
          >
            PLAY NEXT CHALLENGE &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
