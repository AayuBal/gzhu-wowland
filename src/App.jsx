import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CountdownGuide } from './components/CountdownGuide';
import { DouyinCommunity } from './components/DouyinCommunity';
import { QrModal } from './components/QrModal';
import { AiPortal } from './components/AiPortal/AiPortal';
import { GrowthPillars } from './components/GrowthPillars';
import { Footer } from './components/Footer';

export default function App() {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [isPromptsPage, setIsPromptsPage] = useState(() => window.location.hash === '#/prompts');

  useEffect(() => {
    const syncPromptRoute = () => setIsPromptsPage(window.location.hash === '#/prompts');
    window.addEventListener('hashchange', syncPromptRoute);
    return () => window.removeEventListener('hashchange', syncPromptRoute);
  }, []);

  useEffect(() => {
    if (isPromptsPage) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [isPromptsPage]);

  const handleOpenQrModal = () => setQrModalOpen(true);
  const handleCloseQrModal = () => setQrModalOpen(false);
  const handleNavigateHome = (target = 'hero') => {
    setIsPromptsPage(false);
    window.location.hash = target;
    window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <div className="site-shell min-h-screen flex flex-col relative selection:bg-[#b9ef24] selection:text-black">
      <div className="site-grain" aria-hidden="true" />

      <Navbar
        onOpenQrModal={handleOpenQrModal}
        isPromptsPage={isPromptsPage}
        onNavigateHome={handleNavigateHome}
      />

      <main className="flex-1 relative z-10 pt-16 md:pt-[72px] pb-12">
        {isPromptsPage ? (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7">
              <button type="button" className="prompt-page-back" onClick={() => handleNavigateHome('hero')}>
                <span aria-hidden="true">←</span>
                <span>返回首页</span>
              </button>
            </div>
            <AiPortal fullPage onOpenQrModal={handleOpenQrModal} />
          </>
        ) : (
          <>
            <Hero onOpenQrModal={handleOpenQrModal} />
            <CountdownGuide />
            <DouyinCommunity onOpenQrModal={handleOpenQrModal} />
            <AiPortal onOpenQrModal={handleOpenQrModal} />
            <GrowthPillars />
          </>
        )}
      </main>

      <Footer
        onOpenQrModal={handleOpenQrModal}
        isPromptsPage={isPromptsPage}
        onNavigateHome={handleNavigateHome}
      />
      <QrModal isOpen={qrModalOpen} onClose={handleCloseQrModal} />
    </div>
  );
}

