import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion } from '../types';
import { ASSETS, QUIZ_QUESTIONS } from '../data/quizData';
import { SchematicDiagram } from './SchematicDiagram';
import { playSound } from '../utils/sound';

interface DailyArenaProps {
  onFinishQuiz: (scoreData: {
    score: number;
    total: number;
    earnedXp: number;
    streak: number;
    answers: Record<string, { selected: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean; time: number }>;
  }) => void;
  onExitToHub: () => void;
}

export const DailyArena: React.FC<DailyArenaProps> = ({ onFinishQuiz, onExitToHub }) => {
  // We can start at question index 6 (Phase 7 - matching screenshot) or let the user play full 10 questions!
  // To allow playing the exact screen shown in the screenshot, we initialize with Phase 7 (index 6).
  const [currentIdx, setCurrentIdx] = useState<number>(6);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>('A');
  const [timeLeft, setTimeLeft] = useState<number>(18);
  const [combo, setCombo] = useState<number>(3);
  const [totalXpEarned, setTotalXpEarned] = useState<number>(300);

  // Lifelines
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [timeWarpUsed, setTimeWarpUsed] = useState<boolean>(false);
  const [showHiveTelemetry, setShowHiveTelemetry] = useState<boolean>(false);

  // Opponent simulation pace
  const [opponentSolved, setOpponentSolved] = useState<number>(6);
  const [flagged, setFlagged] = useState<boolean>(false);

  // Answer tracking
  const [answersMap, setAnswersMap] = useState<
    Record<string, { selected: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean; time: number }>
  >({
    q1: { selected: 'A', isCorrect: true, time: 5.2 },
    q2: { selected: 'A', isCorrect: true, time: 4.6 },
    q3: { selected: 'A', isCorrect: true, time: 6.1 },
    q4: { selected: 'A', isCorrect: false, time: 12.4 }, // Missed on purpose as shown in screen 3
    q5: { selected: 'A', isCorrect: true, time: 7.3 },
    q6: { selected: 'A', isCorrect: true, time: 6.8 }
  });

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx] || QUIZ_QUESTIONS[0];

  // Timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time expired for this question, auto lock in
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIdx]);

  // Handle lock in answer
  const handleLockIn = useCallback(() => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentQ.correctOptionId;
    const timeSpent = Math.max(1, 25 - timeLeft);

    if (isCorrect) {
      playSound('correct');
      setCombo((prev) => prev + 1);
      setTotalXpEarned((prev) => prev + currentQ.baseXp + combo * 50);
    } else {
      playSound('wrong');
      setCombo(0);
    }

    const updatedAnswers = {
      ...answersMap,
      [currentQ.id]: {
        selected: selectedOption,
        isCorrect,
        time: timeSpent
      }
    };
    setAnswersMap(updatedAnswers);

    // If opponent was lagging, increment opponent occasionally
    if (Math.random() > 0.4 && opponentSolved < 10) {
      setOpponentSolved((prev) => prev + 1);
    }

    // Advance or Finish
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setEliminatedOptions([]);
      setShowHiveTelemetry(false);
      setTimeLeft(25);
    } else {
      // Finished all 10 questions!
      playSound('victory');
      const correctCount = (Object.values(updatedAnswers) as { isCorrect: boolean }[]).filter(
        (a) => a.isCorrect
      ).length;
      onFinishQuiz({
        score: correctCount,
        total: QUIZ_QUESTIONS.length,
        earnedXp: totalXpEarned + 150,
        streak: 6,
        answers: updatedAnswers
      });
    }
  }, [selectedOption, currentQ, timeLeft, combo, totalXpEarned, answersMap, opponentSolved, currentIdx, onFinishQuiz]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        if (!eliminatedOptions.includes(key)) {
          playSound('select');
          setSelectedOption(key as 'A' | 'B' | 'C' | 'D');
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleLockIn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [eliminatedOptions, handleLockIn]);

  // 50/50 Lifeline handler
  const handleFiftyFifty = () => {
    if (fiftyFiftyUsed) return;
    playSound('lifeline');
    setFiftyFiftyUsed(true);
    // Eliminate 2 wrong choices
    const wrongOptions = currentQ.options
      .filter((opt) => opt.id !== currentQ.correctOptionId)
      .map((opt) => opt.id);
    const toEliminate = wrongOptions.slice(0, 2);
    setEliminatedOptions(toEliminate);
    if (selectedOption && toEliminate.includes(selectedOption)) {
      setSelectedOption(currentQ.correctOptionId);
    }
  };

  // Time Warp Lifeline handler (+15s)
  const handleTimeWarp = () => {
    if (timeWarpUsed) return;
    playSound('lifeline');
    setTimeWarpUsed(true);
    setTimeLeft((prev) => prev + 15);
  };

  // Hive Telemetry Lifeline handler
  const handleHiveTelemetry = () => {
    playSound('select');
    setShowHiveTelemetry((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Question HUD */}
      <section className="rounded-2xl bg-surface-container-low p-5 sm:p-6 shadow-xl border border-outline-variant/30 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onExitToHub}
              className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Return to Hub"
            >
              <span className="material-symbols-outlined text-lg leading-none">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold tracking-widest">
                CATEGORY: {currentQ.category}
              </span>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-md text-headline-md text-primary font-bold">
                  PHASE 0{currentQ.phase} // {currentQ.totalPhases}
                </h2>
                <span className="px-2 py-0.5 rounded bg-tertiary-container/20 text-tertiary font-label-caps text-[11px] font-bold">
                  {currentQ.tier}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Combo Streak Pill */}
            {combo > 0 && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/40 border border-secondary/40 shadow-[0_0_15px_rgba(221,183,255,0.2)]">
                <span className="material-symbols-outlined text-sm text-secondary animate-pulse">
                  local_fire_department
                </span>
                <span className="font-label-caps text-xs font-bold text-secondary-fixed">
                  {combo}x COMBO! +{combo * 50} XP
                </span>
              </div>
            )}

            {/* Circular Timer */}
            <div className="flex items-center gap-2.5 bg-surface-container px-3.5 py-1.5 rounded-xl border border-outline-variant/30">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container-highest"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className={`${
                      timeLeft <= 5 ? 'text-error animate-pulse' : 'text-primary-container'
                    } transition-all duration-300`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${Math.max(0, (timeLeft / 25) * 100)}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute font-telemetry-counter text-xs font-bold text-primary">
                  {timeLeft}
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-code-inline text-[10px] text-outline uppercase font-semibold">
                  TEMPO
                </span>
                <span className="font-telemetry-counter text-xs text-primary-container font-bold">
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 10-Segment Progress Rail */}
        <div className="flex items-center gap-1.5 w-full">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isCompleted = idx < currentIdx;
            const isCurrent = idx === currentIdx;
            const wasCorrect = answersMap[q.id]?.isCorrect;

            return (
              <div
                key={q.id}
                className={`h-2 flex-1 rounded-sm transition-all ${
                  isCompleted
                    ? wasCorrect
                      ? 'bg-tertiary-container shadow-[0_0_8px_rgba(99,247,137,0.4)]'
                      : 'bg-error shadow-[0_0_8px_rgba(255,180,171,0.4)]'
                    : isCurrent
                    ? 'bg-primary-container animate-pulse shadow-[0_0_12px_rgba(0,242,254,0.6)]'
                    : 'bg-surface-container-highest'
                }`}
                title={`Phase 0${idx + 1}`}
              ></div>
            );
          })}
        </div>
      </section>

      {/* Lifeline Action Bar */}
      <section className="flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          <span className="font-label-caps text-xs text-outline uppercase">LIFELINES:</span>
          {/* 50/50 Purge */}
          <button
            onClick={handleFiftyFifty}
            disabled={fiftyFiftyUsed}
            className={`px-3 py-1.5 rounded-lg font-code-inline text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              fiftyFiftyUsed
                ? 'bg-surface-container-high/40 text-outline border border-outline-variant/20 cursor-not-allowed opacity-50'
                : 'bg-surface-container hover:bg-surface-container-high text-secondary border border-secondary/30 shadow-[0_0_10px_rgba(221,183,255,0.15)]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-sm">content_cut</span>
            <span>50/50 Purge</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-surface-container-highest">
              {fiftyFiftyUsed ? '0' : '1'} LEFT
            </span>
          </button>

          {/* Time Warp */}
          <button
            onClick={handleTimeWarp}
            disabled={timeWarpUsed}
            className={`px-3 py-1.5 rounded-lg font-code-inline text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              timeWarpUsed
                ? 'bg-surface-container-high/40 text-outline border border-outline-variant/20 cursor-not-allowed opacity-50'
                : 'bg-surface-container hover:bg-surface-container-high text-primary-container border border-primary-container/30 shadow-[0_0_10px_rgba(0,242,254,0.15)]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-sm">hourglass_top</span>
            <span>Time Warp</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-surface-container-highest">
              {timeWarpUsed ? 'USED' : '+15s'}
            </span>
          </button>

          {/* Hive Telemetry */}
          <button
            onClick={handleHiveTelemetry}
            className={`px-3 py-1.5 rounded-lg font-code-inline text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              showHiveTelemetry
                ? 'bg-tertiary-container/30 text-tertiary border border-tertiary-container'
                : 'bg-surface-container hover:bg-surface-container-high text-tertiary border border-tertiary-container/30'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-sm">hub</span>
            <span>Hive Telemetry</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-surface-container-highest">
              68% on [A]
            </span>
          </button>
        </div>

        <div className="font-code-inline text-xs text-on-surface-variant flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-container"></span>
          <span>STAKE: DOUBLE XP (1v1 ACTIVE)</span>
        </div>
      </section>

      {/* Main Duel Screen (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question, Schematic, Answers, Action Dock */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Question Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-surface-container flex flex-col gap-5 shadow-lg border border-outline-variant/30 relative">
            <div className="flex items-center justify-between">
              <span className="font-code-inline text-xs text-outline">
                QUESTION ID: {currentQ.codeId}
              </span>
              <span className="px-2.5 py-1 rounded bg-primary-container/15 text-primary-container font-code-inline text-xs font-bold">
                +{currentQ.baseXp} BASE XP
              </span>
            </div>

            <h1 className="font-headline-lg text-xl sm:text-headline-lg text-primary font-bold leading-snug">
              {currentQ.question}
            </h1>

            {/* Architecture Schematic Component */}
            {currentQ.hasSchematicSvg ? (
              <SchematicDiagram />
            ) : currentQ.specimenImage ? (
              <div className="w-full rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container-lowest p-2">
                <img
                  src={currentQ.specimenImage}
                  alt="Architecture Specimen"
                  className="w-full max-h-56 object-cover rounded-lg"
                />
                <div className="flex items-center justify-between px-2 pt-2 font-code-inline text-xs text-on-surface-variant">
                  <span>{currentQ.specimenFig}</span>
                  <span className="text-tertiary font-bold">{currentQ.specimenBadge}</span>
                </div>
              </div>
            ) : null}

            {/* Hive Telemetry Live Community Bar (when toggled) */}
            {showHiveTelemetry && (
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-tertiary-container/30 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-code-inline text-tertiary">
                  <span>COMMUNITY CONSENSUS VOTE:</span>
                  <span>A: 68% | B: 14% | C: 6% | D: 12%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest flex overflow-hidden">
                  <div className="bg-primary-container" style={{ width: '68%' }} title="A: 68%"></div>
                  <div className="bg-secondary" style={{ width: '14%' }} title="B: 14%"></div>
                  <div className="bg-outline" style={{ width: '6%' }} title="C: 6%"></div>
                  <div className="bg-error" style={{ width: '12%' }} title="D: 12%"></div>
                </div>
              </div>
            )}
          </div>

          {/* 4 Tactile Option Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQ.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isEliminated = eliminatedOptions.includes(option.id);

              return (
                <button
                  key={option.id}
                  disabled={isEliminated}
                  onClick={() => {
                    if (!isEliminated) {
                      playSound('select');
                      setSelectedOption(option.id);
                    }
                  }}
                  className={`p-5 rounded-xl text-left flex flex-col justify-between gap-3 border transition-all cursor-pointer relative ${
                    isEliminated
                      ? 'opacity-30 bg-surface-container-lowest border-outline-variant/20 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-surface-container-high border-primary-container ring-2 ring-primary-container/40 shadow-[0_0_20px_rgba(0,242,254,0.18)] translate-y-[-2px]'
                      : 'bg-surface-container hover:bg-surface-container-high/80 border-outline-variant/30 shadow-md'
                  }`}
                  type="button"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-code-inline text-sm font-bold transition-colors ${
                        isSelected
                          ? 'bg-primary-container text-on-primary-fixed'
                          : 'bg-surface-container-highest text-on-surface'
                      }`}
                    >
                      {option.id}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-primary-container bg-primary-container'
                          : 'border-outline-variant'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-on-primary-fixed"></span>}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-headline-sm text-base text-primary font-bold">
                      {option.label}
                    </span>
                    <span className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      {option.description}
                    </span>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[10px] font-code-inline text-outline">
                    <span>KEY: [{option.id}]</span>
                    {isSelected && <span className="text-primary-container font-bold">LOCKED CANDIDATE</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Action Dock */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playSound('click');
                  // skip advances question
                  if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
                    setCurrentIdx((prev) => prev + 1);
                    setSelectedOption(null);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant hover:text-primary font-label-caps text-xs border border-outline-variant/30 transition-colors cursor-pointer"
                type="button"
              >
                SKIP (USES 1 TOKEN)
              </button>
              <button
                onClick={() => {
                  playSound('click');
                  setFlagged((prev) => !prev);
                }}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  flagged
                    ? 'bg-error-container/30 text-error border-error'
                    : 'bg-surface-container text-outline border-outline-variant/30 hover:text-on-surface'
                }`}
                type="button"
                title="Flag for telemetric review"
              >
                <span className="material-symbols-outlined text-lg leading-none">flag</span>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="hidden md:inline-block font-code-inline text-xs text-outline">
                Press [ENTER] to lock
              </span>
              <button
                disabled={!selectedOption}
                onClick={handleLockIn}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-headline-sm text-headline-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedOption
                    ? 'bg-primary-container text-on-primary-fixed hover:brightness-110 active:translate-y-0.5 shadow-[0_4px_0_0_#006a70]'
                    : 'bg-surface-container-highest text-outline cursor-not-allowed opacity-60'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-base">bolt</span>
                <span>Lock In Answer</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry Drawer, Opponent Draft, Loadout */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Head-to-Head Live Draft */}
          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">swords</span>
                <span className="font-headline-sm text-sm text-primary font-bold uppercase tracking-wider">
                  Head-to-Head Duel
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-error-container/20 text-error font-code-inline text-[10px] font-bold animate-pulse">
                LIVE
              </span>
            </div>

            {/* Opponent Info */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={ASSETS.opponentAvatar}
                    alt="Opponent Avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-secondary/50"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-tertiary-container rounded-full border-2 border-surface-container"></span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-sm text-primary font-bold">@dev_sarah</span>
                  <span className="font-code-inline text-[11px] text-secondary">L16 Micro-Architect</span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="font-telemetry-counter text-xs text-primary font-bold">
                  {opponentSolved} / 10 SOLVED
                </span>
                <span className="font-code-inline text-[10px] text-tertiary">4,120 XP</span>
              </div>
            </div>

            {/* Pace Comparison Bar */}
            <div className="flex flex-col gap-1.5 text-xs font-code-inline">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Your Pace: 14.2s</span>
                <span className="text-secondary">Sarah: 12.8s</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-highest flex overflow-hidden">
                <div className="h-full bg-primary-container" style={{ width: '52%' }}></div>
                <div className="h-full bg-secondary" style={{ width: '48%' }}></div>
              </div>
            </div>
          </div>

          {/* Session Matrix */}
          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">
                Session Matrix
              </span>
              <span className="font-code-inline text-[10px] text-tertiary font-semibold">
                6 / 6 VALIDATED
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = idx < currentIdx;
                const wasCorrect = answersMap[q.id]?.isCorrect;

                return (
                  <div
                    key={q.id}
                    className={`p-2 rounded-lg flex flex-col items-center justify-center gap-0.5 border ${
                      isCurrent
                        ? 'bg-primary-container/20 border-primary-container text-primary font-bold shadow-[0_0_8px_rgba(0,242,254,0.3)]'
                        : isAnswered
                        ? wasCorrect
                          ? 'bg-tertiary-container/15 border-tertiary-container/40 text-tertiary'
                          : 'bg-error-container/20 border-error/40 text-error'
                        : 'bg-surface-container-low border-outline-variant/20 text-outline'
                    }`}
                  >
                    <span className="font-telemetry-counter text-xs">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="font-code-inline text-[8px] uppercase">
                      {isCurrent
                        ? 'LIVE'
                        : isAnswered
                        ? wasCorrect
                          ? 'PASS'
                          : 'FAIL'
                        : idx === 9
                        ? 'BOSS'
                        : 'LOCK'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Loadout Perks */}
          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-3 shadow-lg">
            <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">
              Active Loadout
            </span>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div className="w-8 h-8 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-base">shield</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs text-primary font-bold">First Blood Armor</span>
                <span className="font-body-sm text-[11px] text-on-surface-variant">
                  Protects streak on 1 failure
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div className="w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-base">memory</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-xs text-primary font-bold">Silicon Specialist</span>
                <span className="font-body-sm text-[11px] text-on-surface-variant">
                  +25% XP on architecture queries
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Micro-Trophy / Sprint Goal */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-primary-container/30 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-container text-2xl">
              military_tech
            </span>
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] text-primary-container uppercase font-bold">
                Next Milestone: Silicon Guru
              </span>
              <span className="font-body-sm text-xs text-on-surface-variant">
                1 more correct architecture question to unlock.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
