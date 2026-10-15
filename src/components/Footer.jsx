import React from 'react';
import { ArrowUp, QrCode, ShieldCheck } from 'lucide-react';

const FOOTER_LINKS = [
  { label: '活动指南', href: '#event' },
  { label: 'AI 宝典', href: '#prompts' },
  { label: '成长项目', href: '#pillars' },
];

export const Footer = ({ onOpenQrModal, isPromptsPage = false, onNavigateHome }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleJoin = (event) => {
    if (!onOpenQrModal) return;
    event.preventDefault();
    onOpenQrModal();
  };

  const handlePageLink = (event, href) => {
    if (isPromptsPage && href !== '#prompts' && onNavigateHome) {
      event.preventDefault();
      onNavigateHome(href.slice(1));
    }
  };

  return (
    <footer className="site-footer relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-[1.3fr_0.7fr] gap-10 md:gap-16 items-start">
          <div>
            <div className="footer-brand-lockup">
              <span className="gzhu-brand-lockup footer-gzhu-brand" aria-label="广州大学">
                <img src="/assets/gzhu-official-logo.png" alt="" aria-hidden="true" className="gzhu-seal" />
                <img src="/assets/gzhu-official-logo.png" alt="广州大学" className="gzhu-wordmark" />
              </span>
              <span aria-hidden="true" className="brand-times">×</span>
              <img src="/assets/official_wowland_logo.png" alt="WowLand" className="w-[116px] h-auto" />
            </div>
            <p className="footer-mission">
              广州大学 WowLand 青年科技社群，和抖音校园一起把 AI 实践、技术共学与内容创作带进校园生活。
            </p>
            <div className="footer-ecosystem-tags">
              <span>广州大学</span>
              <span>抖音校园 WowLand</span>
              <span>字节跳动生态支持</span>
            </div>
          </div>

          <div className="footer-links-panel">
            <div>
              <span className="section-eyebrow">EXPLORE</span>
              <nav className="footer-nav" aria-label="页脚导航">
                {FOOTER_LINKS.map((link) => (
                  <a key={link.href} href={link.href} onClick={(event) => handlePageLink(event, link.href)}>{link.label}</a>
                ))}
              </nav>
            </div>
            <a href="#community" onClick={handleJoin} className="pixel-button pixel-button-primary footer-join">
              <QrCode className="w-4 h-4" />
              <span>扫码加入社群</span>
            </a>
          </div>
        </div>

        <div className="footer-note">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <p>
            本页面用于广州大学 WowLand 校园交流与 AI 实践展示。社群由在校学生自主建设，字节跳动与抖音校园生态支持信息以官方活动物料为准。
          </p>
        </div>

        <div className="footer-bottom">
          <p>© 2026 广州大学 WowLand 青年科技社群</p>
          <button type="button" onClick={scrollToTop} className="back-to-top" aria-label="返回页面顶部">
            <span>回到顶部</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

