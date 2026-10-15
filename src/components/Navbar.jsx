import React, { useEffect, useState } from 'react';
import { ArrowRight, Menu, QrCode, X } from 'lucide-react';

const NAV_LINKS = [
  { name: '四条成长线', href: '#pillars' },
  { name: '活动形式', href: '#activities' },
  { name: '近期活动', href: '#event' },
  { name: '往期回顾', href: '#archive' },
  { name: '加入社群', href: '#community' },
  { name: 'AI 宝典', href: '#prompts' },
];

export const Navbar = ({ onOpenQrModal, isSubPage = false, onNavigateHome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMobileMenuOpen(false);

  const handlePageLink = (event, href) => {
    handleLinkClick();
    if (isSubPage && onNavigateHome) {
      event.preventDefault();
      onNavigateHome(href.slice(1));
    }
  };

  const handleQrClick = (event) => {
    if (!onOpenQrModal) return;
    event.preventDefault();
    onOpenQrModal();
  };

  return (
    <header className={`site-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px] gap-3">
          <a href="#hero" onClick={(event) => handlePageLink(event, '#hero')} className="brand-lockup flex items-center gap-2 sm:gap-3 min-w-0" aria-label="广州大学与 WowLand">
            <span className="gzhu-brand-lockup" aria-label="广州大学">
              <img src="/assets/gzhu-official-logo.png" alt="" aria-hidden="true" className="gzhu-seal" />
              <img src="/assets/gzhu-official-logo.png" alt="广州大学" className="gzhu-wordmark" />
            </span>
            <span className="brand-times" aria-hidden="true">×</span>
            <img
              src="/assets/official_wowland_logo.png"
              alt="WowLand"
              className="w-[88px] sm:w-[112px] h-auto object-contain"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-1.5" aria-label="主导航">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={(event) => handlePageLink(event, link.href)} className="nav-link">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#community" onClick={handleQrClick} className="nav-cta hidden sm:inline-flex">
              <QrCode className="w-4 h-4" />
              <span>加入社群</span>
              <span className="nav-cta-tag">一起创造</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="mobile-menu-button lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-label="切换导航菜单"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer lg:hidden animate-fadeIn">
          <nav className="grid grid-cols-2 gap-2 mb-3" aria-label="移动端导航">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={(event) => handlePageLink(event, link.href)} className="mobile-nav-link">
                <span>{link.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </nav>
          <a
            href="#community"
            onClick={(event) => {
              handleLinkClick();
              handleQrClick(event);
            }}
            className="mobile-join-button"
          >
            <QrCode className="w-4 h-4" />
            <span>扫码加入抖音校园社群</span>
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;

