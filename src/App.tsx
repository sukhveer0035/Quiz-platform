import React, { useState, useEffect, useCallback } from 'react';
import { ScreenTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExploreHub } from './components/ExploreHub';
import { DailyArena } from './components/DailyArena';
import { ResultsDebrief } from './components/ResultsDebrief';
import { LeaderboardView } from './components/LeaderboardView';
import { BadgesQuestsView } from './components/BadgesQuestsView';
import { VersusMatchModal } from './components/VersusMatchModal';
import { toggleMuteSound, getMuteState, playSound } from './utils/sound';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('explore-and-hub');
  const [xp, setXp] = useState<number>(3450);
  const [streak, setStreak] = useState<number>(5);
  const [isMuted, setIsMuted] = useState<boolean>(getMuteState());

  // Matchmaking modal
  const [isMatchModalOpen, setIsMatchModalOpen] = useState<boolean>(false);
  const [matchTargetUser, setMatchTargetUser] = useState<string>('@dev_sarah');

  // Last Quiz Performance
  const [quizScore, setQuizScore] = useState<{
    score: number;
    total: number;
    earnedXp: number;
    streak: number;
  }>({
    score: 9,
    total: 10,
    earnedXp: 450,
    streak: 6
  });

  const handleToggleMute = () => {
    const muted = toggleMuteSound();
    setIsMuted(muted);
    if (!muted) {
      playSound('select');
    }
  };

  const handleStartQuiz = (_arenaId?: string) => {
    setCurrentTab('daily-arena');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishQuiz = useCallback((scoreData: {
    score: number;
    total: number;
    earnedXp: number;
    streak: number;
  }) => {
    setQuizScore(scoreData);
    setXp((prev) => prev + scoreData.earnedXp);
    setStreak(scoreData.streak);
    setCurrentTab('results-debrief');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClaimQuest = (questId: string) => {
    setXp((prev) => prev + 250);
  };

  const handleOpenMatchmaking = (targetUser: string = '@dev_sarah') => {
    setMatchTargetUser(targetUser);
    setIsMatchModalOpen(true);
  };

  // Keyboard shortcut for Quickplay (Space on Explore screen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === 'Space' &&
        currentTab === 'explore-and-hub' &&
        !isMatchModalOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        playSound('lock');
        handleStartQuiz();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTab, isMatchModalOpen]);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md arcade-grid-bg selection:bg-primary-container selection:text-on-primary-fixed">
      {/* Top Fixed Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        xp={xp}
        streak={streak}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12">
        {currentTab === 'explore-and-hub' && (
          <ExploreHub
            onStartQuiz={handleStartQuiz}
            onOpenMatchmaking={() => handleOpenMatchmaking('@dev_sarah')}
            onViewLeaderboard={() => {
              setCurrentTab('leaderboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'daily-arena' && (
          <DailyArena
            onFinishQuiz={handleFinishQuiz}
            onExitToHub={() => {
              setCurrentTab('explore-and-hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'results-debrief' && (
          <ResultsDebrief
            score={quizScore.score}
            total={quizScore.total}
            earnedXp={quizScore.earnedXp}
            streak={quizScore.streak}
            onPlayAgain={() => {
              setCurrentTab('daily-arena');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToHub={() => {
              setCurrentTab('explore-and-hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView
            onBackToHub={() => {
              setCurrentTab('explore-and-hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onChallengeUser={(username) => handleOpenMatchmaking(username)}
          />
        )}

        {currentTab === 'badges-and-quests' && (
          <BadgesQuestsView
            onBackToHub={() => {
              setCurrentTab('explore-and-hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClaimQuest={handleClaimQuest}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onQuickPlay={() => handleStartQuiz()} />

      {/* 1v1 Versus Matchmaking Modal */}
      <VersusMatchModal
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        onStartDuel={() => {
          setIsMatchModalOpen(false);
          handleStartQuiz();
        }}
        targetUsername={matchTargetUser}
      />
    </div>
  );
};

export default App;
