import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CountdownGuide } from './components/CountdownGuide';
import { DouyinCommunity } from './components/DouyinCommunity';
import { QrModal } from './components/QrModal';
import { AiPortal } from './components/AiPortal/AiPortal';
import { GrowthPillars } from './components/GrowthPillars';
import { Activities } from './components/Activities';
import { ArchiveSection, ArchivePage } from './components/ArchiveSection';
import { Footer } from './components/Footer';

export default function App() {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [route, setRoute] = useState(() => window.location.hash === '#/prompts' ? 'prompts' : window.location.hash === '#/archive' ? 'archive' : 'home');
  const isSubPage = route !== 'home';

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.hash === '#/prompts' ? 'prompts' : window.location.hash === '#/archive' ? 'archive' : 'home');
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    if (isSubPage) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [isSubPage, route]);

  const handleOpenQrModal = () => setQrModalOpen(true);
  const handleCloseQrModal = () => setQrModalOpen(false);
  const handleNavigateHome = (target = 'hero') => {
    setRoute('home');
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
        isSubPage={isSubPage}
        onNavigateHome={handleNavigateHome}
      />

      <main className="flex-1 relative z-10 pt-16 md:pt-[72px] pb-12">
        {route === 'prompts' ? (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7">
              <button type="button" className="prompt-page-back" onClick={() => handleNavigateHome('hero')}>
                <span aria-hidden="true">←</span>
                <span>返回首页</span>
              </button>
            </div>
            <AiPortal fullPage onOpenQrModal={handleOpenQrModal} />
          </>
        ) : route === 'archive' ? (
          <ArchivePage onNavigateHome={handleNavigateHome} />
        ) : (
          <>
            <Hero onOpenQrModal={handleOpenQrModal} />
            <GrowthPillars />
            <Activities />
            <CountdownGuide />
            <DouyinCommunity onOpenQrModal={handleOpenQrModal} />
            <ArchiveSection />
            <AiPortal onOpenQrModal={handleOpenQrModal} />
          </>
        )}
      </main>

      <Footer
        onOpenQrModal={handleOpenQrModal}
        isSubPage={isSubPage}
        onNavigateHome={handleNavigateHome}
      />
      <QrModal isOpen={qrModalOpen} onClose={handleCloseQrModal} />
    </div>
  );
}

