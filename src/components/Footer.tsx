import React, { useState } from 'react';
import { playSound } from '../utils/sound';

interface FooterProps {
  onQuickPlay?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onQuickPlay }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    playSound('correct');
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Brand info & tags */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
                TechPulse // Terminal
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-label-caps bg-primary-container/15 text-primary-container border border-primary-container/30">
                v2.4
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md leading-relaxed">
              Engineering &amp; technical current affairs quiz engine. Test knowledge, maintain velocity, and compete in daily high-stakes coding sprints.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">
                #SYSTEMS_DESIGN
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">
                #AI_RESEARCH
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">
                #CYBERSECURITY
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-caps text-label-caps">
                #DEV_OPS
              </span>
            </div>
          </div>

          {/* Newsletter Box: The Morning Pull Request */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 bg-surface-container-low/70 p-6 rounded-xl border border-outline-variant/20 shadow-md">
            <div className="flex flex-col gap-2 max-w-sm">
              <div className="flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
                <span className="material-symbols-outlined text-primary">terminal</span>
                <span>The Morning Pull Request</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Receive five curated tech architecture challenges every morning at 06:00 UTC.
              </p>
            </div>

            {subscribed ? (
              <div className="px-4 py-2.5 rounded-lg bg-tertiary-container/20 border border-tertiary-container/40 text-tertiary font-code-inline text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">mark_email_read</span>
                <span>SUBBED: You're in the 06:00 UTC dispatch!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto items-center gap-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-lg bg-surface-container-high border border-outline-variant/50 text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary-container min-w-[220px]"
                  placeholder="engineer@domain.com"
                  type="email"
                  required
                />
                <button
                  className="px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-fixed font-label-caps text-label-caps font-bold hover:brightness-110 active:translate-y-0.5 transition-all shadow-[0_3px_0_0_#006a70] cursor-pointer shrink-0"
                  type="submit"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-outline-variant/20">
          <div className="flex items-center gap-3 font-label-caps text-label-caps text-on-surface-variant flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-tertiary-container"></span>
              All systems operational
            </span>
            <span className="text-outline">|</span>
            <span>99.98% uptime</span>
            <span className="text-outline">|</span>
            <span>Cluster: us-east-pod-4</span>
          </div>

          <div className="flex items-center gap-4">
            {onQuickPlay && (
              <button
                type="button"
                onClick={() => {
                  playSound('lock');
                  onQuickPlay();
                }}
                className="hidden sm:flex items-center gap-1.5 font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-3 py-1 rounded border border-outline-variant/30 hover:border-primary-container/40 cursor-pointer transition-colors"
              >
                <span className="text-outline">QUICKPLAY:</span>
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 bg-surface-container-highest rounded text-primary text-[10px] font-bold">
                  Space
                </kbd>
                <span>to quick-start</span>
              </button>
            )}
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              &copy; 2025 TechPulse Labs.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
