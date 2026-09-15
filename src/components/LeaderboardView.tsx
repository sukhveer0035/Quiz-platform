import React, { useState } from 'react';
import { LEADERBOARD_USERS } from '../data/quizData';
import { playSound } from '../utils/sound';

interface LeaderboardViewProps {
  onBackToHub: () => void;
  onChallengeUser: (username: string) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onBackToHub, onChallengeUser }) => {
  const [filter, setFilter] = useState<'global' | 'weekly' | 'silicon'>('global');

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-outline-variant/20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click');
              onBackToHub();
            }}
            className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg leading-none">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-bold">
              // TELEMETRY STANDINGS
            </span>
            <h1 className="font-headline-lg text-2xl text-primary font-bold">
              Global Engineering Leaderboard
            </h1>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low border border-outline-variant/30">
          {(['global', 'weekly', 'silicon'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                playSound('click');
                setFilter(mode);
              }}
              className={`px-3 py-1.5 rounded-lg font-label-caps text-xs capitalize transition-colors cursor-pointer ${
                filter === mode
                  ? 'bg-primary-container text-on-primary-fixed font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {mode === 'global' ? 'All-Time Global' : mode === 'weekly' ? 'Weekly Sprint' : 'Silicon Arch'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Rank 2 */}
        <div className="order-2 md:order-1 p-6 rounded-2xl bg-surface-container flex flex-col items-center text-center gap-3 border border-outline-variant/30 shadow-lg relative">
          <span className="w-10 h-10 rounded-full bg-[#c0c0c0]/20 text-[#c0c0c0] font-telemetry-counter text-lg font-bold flex items-center justify-center border border-[#c0c0c0]/40">
            #2
          </span>
          <span className="font-headline-sm text-lg text-primary font-bold">
            {LEADERBOARD_USERS[1].name}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-code-inline text-xs">
            {LEADERBOARD_USERS[1].tag}
          </span>
          <div className="flex flex-col text-xs font-code-inline text-on-surface-variant pt-2 border-t border-outline-variant/20 w-full">
            <span className="text-primary font-bold">{LEADERBOARD_USERS[1].xp.toLocaleString()} XP</span>
            <span>{LEADERBOARD_USERS[1].accuracy}% Accuracy</span>
          </div>
          <button
            onClick={() => onChallengeUser(LEADERBOARD_USERS[1].name)}
            className="mt-2 w-full py-2 rounded-xl bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-secondary font-code-inline text-xs font-bold transition-colors cursor-pointer"
          >
            DUEL 1v1
          </button>
        </div>

        {/* Rank 1 */}
        <div className="order-1 md:order-2 p-6 rounded-2xl bg-surface-container-high flex flex-col items-center text-center gap-3 border border-primary-container/40 shadow-2xl relative -translate-y-2 ring-1 ring-primary-container/20">
          <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-[#ffd700] text-black font-label-caps text-[10px] font-bold">
            ARCHITECT EMPEROR
          </div>
          <span className="w-12 h-12 rounded-full bg-[#ffd700]/20 text-[#ffd700] font-telemetry-counter text-2xl font-bold flex items-center justify-center border border-[#ffd700]/50 mt-1">
            #1
          </span>
          <span className="font-headline-sm text-xl text-primary font-bold">
            {LEADERBOARD_USERS[0].name}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary-container font-code-inline text-xs">
            {LEADERBOARD_USERS[0].tag}
          </span>
          <div className="flex flex-col text-xs font-code-inline text-on-surface-variant pt-2 border-t border-outline-variant/20 w-full">
            <span className="text-primary font-bold">{LEADERBOARD_USERS[0].xp.toLocaleString()} XP</span>
            <span className="text-tertiary">{LEADERBOARD_USERS[0].accuracy}% Flawless Acc</span>
          </div>
          <button
            onClick={() => onChallengeUser(LEADERBOARD_USERS[0].name)}
            className="mt-2 w-full py-2 rounded-xl bg-primary-container text-on-primary-fixed font-code-inline text-xs font-bold hover:brightness-110 shadow-[0_3px_0_0_#006a70] transition-all cursor-pointer"
          >
            CHALLENGE CHAMPION
          </button>
        </div>

        {/* Rank 3 */}
        <div className="order-3 p-6 rounded-2xl bg-surface-container flex flex-col items-center text-center gap-3 border border-outline-variant/30 shadow-lg relative">
          <span className="w-10 h-10 rounded-full bg-[#cd7f32]/20 text-[#cd7f32] font-telemetry-counter text-lg font-bold flex items-center justify-center border border-[#cd7f32]/40">
            #3
          </span>
          <span className="font-headline-sm text-lg text-primary font-bold">
            {LEADERBOARD_USERS[2].name}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-code-inline text-xs">
            {LEADERBOARD_USERS[2].tag}
          </span>
          <div className="flex flex-col text-xs font-code-inline text-on-surface-variant pt-2 border-t border-outline-variant/20 w-full">
            <span className="text-primary font-bold">{LEADERBOARD_USERS[2].xp.toLocaleString()} XP</span>
            <span>{LEADERBOARD_USERS[2].accuracy}% Accuracy</span>
          </div>
          <button
            onClick={() => onChallengeUser(LEADERBOARD_USERS[2].name)}
            className="mt-2 w-full py-2 rounded-xl bg-surface-container-high hover:bg-tertiary-container hover:text-on-tertiary-container text-tertiary font-code-inline text-xs font-bold transition-colors cursor-pointer"
          >
            DUEL 1v1
          </button>
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="rounded-2xl bg-surface-container border border-outline-variant/30 overflow-hidden shadow-lg">
        <div className="p-4 bg-surface-container-low border-b border-outline-variant/20 grid grid-cols-12 text-xs font-label-caps text-on-surface-variant font-bold">
          <span className="col-span-1 text-center">RANK</span>
          <span className="col-span-4">ENGINEER</span>
          <span className="col-span-3">TAG / SPECIALTY</span>
          <span className="col-span-2 text-right">XP</span>
          <span className="col-span-2 text-right">ACCURACY</span>
        </div>

        <div className="divide-y divide-outline-variant/15">
          {LEADERBOARD_USERS.map((user) => {
            const isMe = user.isCurrentUser;
            return (
              <div
                key={user.rank}
                className={`p-4 grid grid-cols-12 items-center text-xs font-code-inline transition-colors ${
                  isMe
                    ? 'bg-primary-container/10 text-primary-container font-bold border-l-4 border-l-primary-container'
                    : 'hover:bg-surface-container-high/50 text-on-surface'
                }`}
              >
                <span className="col-span-1 text-center font-telemetry-counter text-sm font-bold">
                  #{user.rank}
                </span>
                <div className="col-span-4 flex items-center gap-2">
                  <span className="font-bold text-primary">{user.name}</span>
                  {isMe && (
                    <span className="px-1.5 py-0.5 rounded bg-primary-container text-on-primary-fixed text-[9px] font-bold">
                      YOU
                    </span>
                  )}
                </div>
                <span className="col-span-3 text-on-surface-variant">{user.tag}</span>
                <span className="col-span-2 text-right font-bold text-primary">
                  {user.xp.toLocaleString()} XP
                </span>
                <span className="col-span-2 text-right text-tertiary">{user.accuracy}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
