import React from 'react';
import { ScreenTab } from '../types';
import { ASSETS } from '../data/quizData';
import { playSound } from '../utils/sound';

interface HeaderProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  xp: number;
  streak: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  xp,
  streak,
  isMuted,
  onToggleMute
}) => {
  const navItems: { id: ScreenTab; label: string }[] = [
    { id: 'explore-and-hub', label: 'Explore & Hub' },
    { id: 'daily-arena', label: 'Daily Arena' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'badges-and-quests', label: 'Badges & Quests' }
  ];

  const handleNavClick = (tab: ScreenTab) => {
    playSound('click');
    onTabChange(tab);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/30">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <button
          onClick={() => handleNavClick('explore-and-hub')}
          className="flex items-center gap-3 shrink-0 text-left cursor-pointer hover:opacity-95 transition-opacity"
        >
          <img
            alt="TechPulse Brand Logo"
            className="h-8 w-auto object-contain"
            src={ASSETS.logo}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary">
                TechPulse
              </span>
              <span className="font-label-caps text-label-caps text-outline font-semibold">
                // QUIZ
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-container"></span>
              </span>
              <span className="font-label-caps text-label-caps uppercase text-tertiary tracking-wider">
                LIVE TELEMETRY
              </span>
            </div>
          </div>
        </button>

        {/* Central Pill Nav */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-surface-container-low/90 border border-outline-variant/20 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                  isActive
                    ? 'bg-surface-container text-primary border border-primary-container/40 shadow-[0_0_12px_rgba(0,242,254,0.15)] font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/30'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Stats & Profile Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Streak Counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/40">
            <span className="material-symbols-outlined text-sm text-secondary">
              local_fire_department
            </span>
            <span className="font-label-caps text-label-caps font-bold text-secondary-fixed">
              {streak} DAY STREAK
            </span>
          </div>

          {/* XP Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/40 shadow-[0_0_16px_rgba(0,242,254,0.08)]">
            <span className="material-symbols-outlined text-sm text-primary-container">
              bolt
            </span>
            <span className="font-code-inline text-code-inline font-bold text-primary">
              {xp.toLocaleString()} XP
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            aria-label="Toggle Sound Effects"
            onClick={onToggleMute}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isMuted
                ? 'bg-surface-container text-outline hover:text-on-surface'
                : 'bg-surface-container-high/60 hover:bg-surface-container-high text-primary'
            }`}
            type="button"
            title={isMuted ? 'Sound Muted - Click to Unmute' : 'Sound Effects Active - Click to Mute'}
          >
            <span className="material-symbols-outlined text-lg leading-none">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-outline-variant/40">
            <div className="relative">
              <img
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-container/40 shadow-sm"
                src={ASSETS.userAvatar}
              />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-secondary text-[8px] font-bold text-on-secondary">
                14
              </span>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="font-label-md text-label-md text-on-surface leading-tight font-bold">
                DevZero
              </span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                Lvl 14 Engineer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Nav */}
      <div className="lg:hidden flex items-center justify-around px-2 py-2 bg-surface-container-low border-t border-outline-variant/20 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1 text-xs rounded-full font-label-md whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-primary-container text-on-primary-fixed font-bold'
                  : 'text-on-surface-variant'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
