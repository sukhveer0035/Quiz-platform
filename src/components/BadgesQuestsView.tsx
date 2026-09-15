import React from 'react';
import { BADGES, ACTIVE_QUESTS } from '../data/quizData';
import { playSound } from '../utils/sound';

interface BadgesQuestsViewProps {
  onBackToHub: () => void;
  onClaimQuest?: (questId: string) => void;
}

export const BadgesQuestsView: React.FC<BadgesQuestsViewProps> = ({ onBackToHub, onClaimQuest }) => {
  return (
    <div className="w-full flex flex-col gap-10">
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
              // TELEMETRY TROPHIES
            </span>
            <h1 className="font-headline-lg text-2xl text-primary font-bold">
              Badges &amp; Active Quests
            </h1>
          </div>
        </div>
      </div>

      {/* Active Quests Section */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-xl text-primary font-bold">Daily Engineering Quests</h2>
          <span className="font-code-inline text-xs text-tertiary">RESETS AT 00:00 UTC</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACTIVE_QUESTS.map((quest) => (
            <div
              key={quest.id}
              className={`p-6 rounded-2xl bg-surface-container border flex flex-col justify-between gap-4 shadow-md ${
                quest.completed ? 'border-tertiary-container/40 ring-1 ring-tertiary-container/20' : 'border-outline-variant/30'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined text-2xl">{quest.icon}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-primary-container/15 text-primary font-code-inline text-xs font-bold">
                    +{quest.rewardXp} XP
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-sm text-base text-primary font-bold">{quest.title}</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {quest.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/15">
                <div className="flex items-center justify-between text-xs font-code-inline">
                  <span className="text-on-surface-variant">Progress</span>
                  <span className={quest.completed ? 'text-tertiary font-bold' : 'text-primary'}>
                    {quest.progress} / {quest.maxProgress}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div
                    className={`h-full ${quest.completed ? 'bg-tertiary-container' : 'bg-primary-container'}`}
                    style={{ width: `${(quest.progress / quest.maxProgress) * 100}%` }}
                  ></div>
                </div>

                {quest.completed && (
                  <button
                    onClick={() => {
                      playSound('correct');
                      onClaimQuest?.(quest.id);
                    }}
                    className="mt-2 w-full py-2 rounded-xl bg-tertiary-container text-on-tertiary-container font-label-caps text-xs font-bold hover:brightness-105 transition-all shadow-[0_3px_0_0_#005321] cursor-pointer"
                  >
                    CLAIM REWARD (+{quest.rewardXp} XP)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Badges Collection Section */}
      <section className="flex flex-col gap-5">
        <h2 className="font-headline-md text-xl text-primary font-bold">Micro-Credentials &amp; Badges</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`p-6 rounded-2xl flex flex-col justify-between gap-4 border shadow-md transition-all ${
                badge.unlocked
                  ? 'bg-surface-container border-primary-container/30 hover:border-primary-container'
                  : 'bg-surface-container-lowest border-outline-variant/20 opacity-50 grayscale'
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">{badge.icon}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-label-caps font-bold ${
                      badge.tier === 'Legendary'
                        ? 'bg-[#ffd700]/20 text-[#ffd700]'
                        : badge.tier === 'Epic'
                        ? 'bg-secondary-container/30 text-secondary'
                        : badge.tier === 'Rare'
                        ? 'bg-primary-container/20 text-primary-container'
                        : 'bg-surface-container-high text-on-surface'
                    }`}
                  >
                    {badge.tier}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-sm text-base text-primary font-bold">{badge.title}</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/15 text-[11px] font-code-inline text-outline">
                <span>{badge.rarityPercent}% unlocked</span>
                <span className={badge.unlocked ? 'text-tertiary font-bold' : 'text-outline'}>
                  {badge.unlocked ? 'ACTIVE' : 'LOCKED'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
