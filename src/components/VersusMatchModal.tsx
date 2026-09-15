import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/quizData';
import { playSound } from '../utils/sound';

interface VersusMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartDuel: () => void;
  targetUsername?: string;
}

export const VersusMatchModal: React.FC<VersusMatchModalProps> = ({
  isOpen,
  onClose,
  onStartDuel,
  targetUsername = '@dev_sarah'
}) => {
  const [matchState, setMatchState] = useState<'searching' | 'matched' | 'launching'>('searching');
  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    if (!isOpen) {
      setMatchState('searching');
      setCountdown(3);
      return;
    }

    // Step 1: Searching for opponent
    const timer1 = setTimeout(() => {
      playSound('select');
      setMatchState('matched');
    }, 1500);

    // Step 2: Matched, countdown
    const timer2 = setTimeout(() => {
      playSound('lock');
      setMatchState('launching');
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  useEffect(() => {
    if (matchState === 'launching') {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            playSound('victory');
            onStartDuel();
            return 0;
          }
          playSound('click');
          return prev - 1;
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [matchState, onStartDuel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-surface-container border border-outline-variant/40 shadow-2xl flex flex-col items-center text-center gap-6">
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-error animate-ping"></span>
          <span className="font-label-caps text-xs text-error font-bold uppercase tracking-widest">
            QUICK-FIRE 1v1 TELEMETRY ARENA
          </span>
        </div>

        {/* VS Avatars Banner */}
        <div className="w-full flex items-center justify-around py-4">
          {/* User */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src={ASSETS.userAvatar}
                alt="Your Avatar"
                className="w-16 h-16 rounded-full object-cover ring-4 ring-primary-container/60 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-primary-container text-[10px] font-bold text-on-primary-fixed">
                L14
              </span>
            </div>
            <span className="font-headline-sm text-sm text-primary font-bold">DevZero (You)</span>
            <span className="font-code-inline text-[11px] text-tertiary">3,450 XP</span>
          </div>

          {/* VS Badge */}
          <div className="flex flex-col items-center gap-1">
            <span className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary font-headline-lg text-lg font-bold shadow-lg border border-secondary/40 animate-pulse">
              VS
            </span>
            <span className="font-code-inline text-[10px] text-outline">60s SPRINT</span>
          </div>

          {/* Opponent */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              {matchState === 'searching' ? (
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center border-2 border-dashed border-secondary/50 animate-spin">
                  <span className="material-symbols-outlined text-2xl text-secondary">sync</span>
                </div>
              ) : (
                <>
                  <img
                    src={ASSETS.opponentAvatar}
                    alt="Opponent Avatar"
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-secondary/60 shadow-lg"
                  />
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-secondary text-[10px] font-bold text-on-secondary">
                    L16
                  </span>
                </>
              )}
            </div>
            <span className="font-headline-sm text-sm text-primary font-bold">
              {matchState === 'searching' ? 'Matching...' : targetUsername}
            </span>
            <span className="font-code-inline text-[11px] text-secondary">
              {matchState === 'searching' ? 'Searching queue' : '4,120 XP'}
            </span>
          </div>
        </div>

        {/* Status text */}
        <div className="flex flex-col gap-1 w-full bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20">
          {matchState === 'searching' && (
            <span className="font-code-inline text-xs text-primary animate-pulse">
              Scanning 184 active engineers in us-east-pod-4...
            </span>
          )}
          {matchState === 'matched' && (
            <span className="font-code-inline text-xs text-tertiary font-bold">
              MATCH CONFIRMED! Initializing sync buffer...
            </span>
          )}
          {matchState === 'launching' && (
            <div className="flex flex-col items-center gap-1">
              <span className="font-label-caps text-xs text-secondary font-bold">
                ENGAGING TELEMETRY DRAFT IN
              </span>
              <span className="font-telemetry-counter text-3xl text-primary-container font-bold">
                {countdown}
              </span>
            </div>
          )}
        </div>

        {matchState === 'searching' && (
          <button
            onClick={onClose}
            className="text-xs font-code-inline text-outline hover:text-on-surface underline cursor-pointer"
          >
            Cancel matchmaking
          </button>
        )}
      </div>
    </div>
  );
};
