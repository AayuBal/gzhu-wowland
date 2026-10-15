import React from 'react';
import { ArrowUp, QrCode, ShieldCheck } from 'lucide-react';

const FOOTER_LINKS = [
  { label: '四条成长线', href: '#pillars' },
  { label: '活动形式', href: '#activities' },
  { label: '近期活动', href: '#event' },
  { label: '往期回顾', href: '#archive' },
  { label: 'AI 宝典', href: '#prompts' },
];

export const Footer = ({ onOpenQrModal, isSubPage = false, onNavigateHome }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleJoin = (event) => {
    if (!onOpenQrModal) return;
    event.preventDefault();
    onOpenQrModal();
  };

  const handlePageLink = (event, href) => {
    if (isSubPage && onNavigateHome) {
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
              由广州大学在校学生自主发起与维护的 WowLand 校园共创页面，记录同学们的 AI 实践、内容创作与成长行动。
            </p>
            <div className="footer-ecosystem-tags">
              <span>学生自主创作</span>
              <span>校园兴趣交流</span>
              <span>WowLand 项目灵感</span>
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
          <div>
            <strong>学生自主创作声明</strong>
            <p>本站及相关校园内容由在校学生自主策划、设计与维护，用于学生交流和作品展示，不代表广州大学官方立场，也不构成学校对活动安排或权益的承诺。抖音校园 WowLand 项目信息请以其正式发布为准。</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 WowLand 广大学生共创站</p>
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

