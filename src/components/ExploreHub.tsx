import React, { useState, useEffect } from 'react';
import { TECH_ARENAS, LIVE_HEADLINES, LEADERBOARD_USERS } from '../data/quizData';
import { playSound } from '../utils/sound';

interface ExploreHubProps {
  onStartQuiz: (arenaId?: string) => void;
  onOpenMatchmaking: () => void;
  onViewLeaderboard: () => void;
}

export const ExploreHub: React.FC<ExploreHubProps> = ({
  onStartQuiz,
  onOpenMatchmaking,
  onViewLeaderboard
}) => {
  const [sortMode, setSortMode] = useState<'active' | 'newest'>('active');
  const [secondsLeft, setSecondsLeft] = useState((8 * 3600) + (42 * 60) + 19);
  const [teamChallenged, setTeamChallenged] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
  };

  const handleChallengeTeam = () => {
    playSound('select');
    navigator.clipboard.writeText(window.location.href);
    setTeamChallenged(true);
    setTimeout(() => setTeamChallenged(false), 3000);
  };

  const sortedArenas = [...TECH_ARENAS].sort((a, b) => {
    if (sortMode === 'active') return b.activePlayers - a.activePlayers;
    return b.quizzesCount - a.quizzesCount;
  });

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Hero: Quantum Leap Daily Challenge */}
      <section className="relative rounded-2xl bg-surface-container-low p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden border border-outline-variant/20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Info */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-secondary font-label-caps text-label-caps uppercase tracking-wider">
                <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Today's Quantum Leap
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-code-inline text-code-inline">
                <span className="material-symbols-outlined text-sm text-primary-container">timer</span>
                <span>{formatTime(secondsLeft)}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-tertiary-container/15 text-tertiary font-label-caps text-label-caps font-bold">
                MEDIUM // TIER 2
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-display-hero text-headline-lg sm:text-display-hero text-primary tracking-tight leading-tight">
                The AI Hardware Race: 3nm Chips &amp; Photonic Computing
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Break down cutting-edge wafer fabrication, sub-nanometer interconnects, and optical matrix multipliers shaping frontier model inference.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 font-code-inline text-code-inline text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg shadow-sm border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary text-base">quiz</span>
                <span>15 Questions</span>
              </div>
              <div className="flex items-center gap-1.5 font-code-inline text-code-inline text-tertiary-fixed bg-surface-container px-3 py-1.5 rounded-lg shadow-sm border border-outline-variant/20">
                <span className="material-symbols-outlined text-tertiary text-base">bolt</span>
                <span>+300 XP Bonus</span>
              </div>
              <div className="flex items-center gap-1.5 font-code-inline text-code-inline text-secondary bg-surface-container px-3 py-1.5 rounded-lg shadow-sm border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary text-base">group</span>
                <span>1,842 Solved Today</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  playSound('lock');
                  onStartQuiz();
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary-container text-on-primary-fixed font-headline-sm text-headline-sm uppercase tracking-wide hover:brightness-110 active:translate-y-1 transition-all shadow-[0_5px_0_0_#006a70] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-on-primary-fixed group-hover:rotate-12 transition-transform">
                  rocket_launch
                </span>
                <span>Play Daily Challenge</span>
                <span className="text-xs px-2 py-0.5 rounded bg-on-primary-fixed/20 font-code-inline text-on-primary-fixed font-bold">
                  HOT
                </span>
              </button>

              <button
                onClick={handleChallengeTeam}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface hover:text-primary transition-colors font-label-md text-label-md border border-outline-variant/30 cursor-pointer shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-base">
                  {teamChallenged ? 'check' : 'share'}
                </span>
                <span>{teamChallenged ? 'Link Copied!' : 'Challenge Team'}</span>
              </button>
            </div>
          </div>

          {/* Right Gauge Widget */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-xs p-5 rounded-2xl bg-surface-container/90 shadow-2xl flex flex-col items-center gap-4 text-center border border-outline-variant/30">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-primary-container transition-all duration-1000"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="78, 100"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-telemetry-counter text-headline-md text-primary font-bold">
                    78%
                  </span>
                  <span className="font-label-caps text-[10px] text-outline uppercase">
                    Global Pass
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between text-xs font-label-caps text-on-surface-variant">
                  <span>Speed Cap: 45s/Q</span>
                  <span className="text-tertiary">3x Multiplier</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-container to-secondary" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="text-xs font-body-sm text-on-surface-variant italic">
                &ldquo;The most anticipated lithography showdown since EUV debuted.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Telemetry Velocity Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-xl bg-surface-container flex items-center justify-between shadow-md hover:bg-surface-container-high transition-colors border border-outline-variant/20">
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Current Velocity
            </span>
            <span className="font-telemetry-counter text-telemetry-counter text-secondary">
              5 Days
            </span>
            <span className="font-label-md text-[11px] text-tertiary flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> Personal best: 14 days
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-xl bg-surface-container flex items-center justify-between shadow-md hover:bg-surface-container-high transition-colors border border-outline-variant/20">
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Hit Accuracy
            </span>
            <span className="font-telemetry-counter text-telemetry-counter text-primary-container">
              84.2%
            </span>
            <span className="font-label-md text-[11px] text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">check_circle</span> Top 6% across platform
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              adjust
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-xl bg-surface-container flex items-center justify-between shadow-md hover:bg-surface-container-high transition-colors border border-outline-variant/20">
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Global Standing
            </span>
            <span className="font-telemetry-counter text-telemetry-counter text-tertiary">
              #142
            </span>
            <span className="font-label-md text-[11px] text-tertiary-fixed flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">arrow_upward</span> Jumped +18 spots
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              emoji_events
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-xl bg-surface-container flex items-center justify-between shadow-md hover:bg-surface-container-high transition-colors border border-outline-variant/20">
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              Primary Focus
            </span>
            <span className="font-headline-sm text-headline-sm text-primary truncate max-w-[150px]">
              Systems &amp; AI
            </span>
            <span className="font-label-md text-[11px] text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">psychology</span> Master Specialist Lvl 3
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              smart_toy
            </span>
          </div>
        </div>
      </section>

      {/* Live Multiplayer Duel Arena */}
      <section className="rounded-2xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-low p-6 sm:p-7 shadow-lg relative overflow-hidden border border-outline-variant/30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-error animate-ping"></span>
              <span className="font-label-caps text-label-caps text-error uppercase font-bold tracking-widest">
                LIVE MULTIPLAYER DUEL
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Quick-Fire 1v1 Arena
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Match with another verified tech architect for a rapid-fire 60-second trivia blitz. Real-time answer synchronization &amp; double XP stake.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-center gap-3">
            <button
              onClick={() => {
                playSound('lock');
                onOpenMatchmaking();
              }}
              className="w-full sm:w-auto md:w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-secondary text-on-secondary font-headline-sm text-headline-sm font-bold uppercase tracking-wider hover:brightness-105 active:translate-y-1 shadow-[0_4px_0_0_#6f00be] transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">swords</span>
              <span>Match Opponent</span>
            </button>
            <span className="font-code-inline text-xs text-on-surface-variant flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span> 184 engineers queued right now
            </span>
          </div>
        </div>
      </section>

      {/* Trending Tech Arenas */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                // SECTOR SELECTION
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary">Trending Tech Arenas</h2>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-label-caps text-label-caps">
            <span>SORT:</span>
            <button
              onClick={() => {
                playSound('click');
                setSortMode('active');
              }}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                sortMode === 'active'
                  ? 'bg-surface-container-high text-primary font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              MOST ACTIVE
            </button>
            <button
              onClick={() => {
                playSound('click');
                setSortMode('newest');
              }}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                sortMode === 'newest'
                  ? 'bg-surface-container-high text-primary font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              NEWEST
            </button>
          </div>
        </div>

        {/* 6 Tech Arenas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedArenas.map((arena) => {
            const isPrimary = arena.colorScheme === 'primary';
            const isSecondary = arena.colorScheme === 'secondary';
            const isTertiary = arena.colorScheme === 'tertiary';
            const isError = arena.colorScheme === 'error';

            return (
              <div
                key={arena.id}
                className="group rounded-2xl bg-surface-container p-6 flex flex-col justify-between shadow-md hover:shadow-2xl hover:bg-surface-container-high transition-all border border-outline-variant/20"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isPrimary
                          ? 'bg-primary-container/20 text-primary-container'
                          : isSecondary
                          ? 'bg-secondary-container/30 text-secondary'
                          : isTertiary
                          ? 'bg-tertiary-container/20 text-tertiary'
                          : 'bg-error-container/30 text-error'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">{arena.icon}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-caps text-label-caps">
                      {arena.quizzesCount} QUIZZES {arena.tagline ? `// ${arena.tagline}` : ''}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3
                      className={`font-headline-md text-headline-md text-primary transition-colors ${
                        isPrimary
                          ? 'group-hover:text-primary-container'
                          : isSecondary
                          ? 'group-hover:text-secondary'
                          : isTertiary
                          ? 'group-hover:text-tertiary'
                          : 'group-hover:text-error'
                      }`}
                    >
                      {arena.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {arena.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {arena.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-code-inline px-2 py-0.5 rounded bg-surface-container-lowest ${
                          isPrimary
                            ? 'text-primary'
                            : isSecondary
                            ? 'text-secondary'
                            : isTertiary
                            ? 'text-tertiary'
                            : 'text-error'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 flex items-center justify-between border-t border-outline-variant/15">
                  <div className="flex flex-col">
                    <span className="font-code-inline text-xs text-on-surface-variant flex items-center gap-1">
                      <span
                        className={`material-symbols-outlined text-xs ${
                          isPrimary
                            ? 'text-primary-container'
                            : isSecondary
                            ? 'text-secondary'
                            : isTertiary
                            ? 'text-tertiary'
                            : 'text-error'
                        }`}
                      >
                        bolt
                      </span>
                      {arena.activePlayers} playing
                    </span>
                    <span className="font-label-caps text-[10px] text-tertiary font-bold">
                      +{arena.maxXP} XP MAX
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      playSound('lock');
                      onStartQuiz(arena.id);
                    }}
                    className={`px-4 py-2 rounded-xl font-label-caps text-label-caps font-bold active:translate-y-0.5 transition-all cursor-pointer ${
                      isPrimary
                        ? 'bg-primary-container text-on-primary-fixed hover:brightness-110 shadow-[0_3px_0_0_#006a70]'
                        : isSecondary
                        ? 'bg-secondary text-on-secondary hover:brightness-105 shadow-[0_3px_0_0_#6f00be]'
                        : isTertiary
                        ? 'bg-tertiary-container text-on-tertiary-container hover:brightness-105 shadow-[0_3px_0_0_#005321]'
                        : 'bg-surface-container-highest text-primary hover:bg-primary hover:text-on-primary shadow-[0_3px_0_0_#171b26]'
                    }`}
                    type="button"
                  >
                    START QUIZ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Headlines & Hall of Fame Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Headlines */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container">newspaper</span>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                Live Headlines in Trivia
              </h3>
            </div>
            <span className="font-code-inline text-xs text-outline">UPDATED 14M AGO</span>
          </div>

          <div className="flex flex-col gap-3">
            {LIVE_HEADLINES.map((hl) => (
              <div
                key={hl.id}
                className="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-outline-variant/20 shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`px-2 py-1 rounded font-label-caps text-[10px] font-bold shrink-0 ${
                      hl.categoryColor === 'primary'
                        ? 'bg-primary-container/20 text-primary-container'
                        : hl.categoryColor === 'secondary'
                        ? 'bg-secondary-container/30 text-secondary'
                        : 'bg-tertiary-container/20 text-tertiary'
                    }`}
                  >
                    {hl.category}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-md text-body-md text-primary font-semibold truncate">
                      {hl.title}
                    </span>
                    <span className="font-body-sm text-xs text-on-surface-variant">
                      {hl.meta}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playSound('lock');
                    onStartQuiz(hl.arenaId);
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-lg font-code-inline text-xs font-bold transition-colors cursor-pointer bg-surface-container-highest ${
                    hl.categoryColor === 'primary'
                      ? 'hover:bg-primary-container hover:text-on-primary-fixed text-primary'
                      : hl.categoryColor === 'secondary'
                      ? 'hover:bg-secondary hover:text-on-secondary text-secondary'
                      : 'hover:bg-tertiary-container hover:text-on-tertiary-container text-tertiary'
                  }`}
                  type="button"
                >
                  PULL QUIZ &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hall of Fame */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">
              Daily Hall of Fame
            </h3>
            <span className="font-code-inline text-xs text-tertiary font-bold">TOP ENGINE</span>
          </div>

          <div className="rounded-2xl bg-surface-container p-4 flex flex-col gap-3 border border-outline-variant/20 shadow-lg">
            {LEADERBOARD_USERS.slice(0, 3).map((user) => {
              const rankColor =
                user.rank === 1
                  ? 'text-[#ffd700]'
                  : user.rank === 2
                  ? 'text-[#c0c0c0]'
                  : 'text-[#cd7f32]';

              const badgeColor =
                user.rank === 1
                  ? 'bg-primary-container/20 text-primary-container'
                  : user.rank === 2
                  ? 'bg-secondary-container/20 text-secondary'
                  : 'bg-tertiary-container/20 text-tertiary';

              return (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-2.5 rounded-xl ${
                    user.rank === 1 ? 'bg-surface-container-high' : 'bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-telemetry-counter text-sm font-bold ${rankColor}`}>
                      #{user.rank}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-md text-sm text-primary font-bold">
                        {user.name}
                      </span>
                      <span className="font-code-inline text-[10px] text-on-surface-variant">
                        {user.xp.toLocaleString()} XP &bull; {user.accuracy}% Acc
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-code-inline ${badgeColor}`}>
                    {user.tag}
                  </span>
                </div>
              );
            })}

            {/* Current user pinned item */}
            <div className="p-2.5 rounded-xl bg-primary-container/10 border border-primary-container/30 flex items-center justify-between mt-1">
              <div className="flex items-center gap-3">
                <span className="w-6 text-center font-telemetry-counter text-sm font-bold text-primary-container">
                  #142
                </span>
                <div className="flex flex-col">
                  <span className="font-label-md text-sm text-primary font-bold">
                    DevZero (You)
                  </span>
                  <span className="font-code-inline text-[10px] text-primary-container font-semibold">
                    3,450 XP &bull; 84.2% Acc
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  playSound('click');
                  onViewLeaderboard();
                }}
                className="font-label-caps text-[10px] text-primary underline cursor-pointer hover:text-primary-container"
              >
                VIEW FULL
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
