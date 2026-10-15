import React, { useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, QrCode, Sparkles } from 'lucide-react';
import promptsData from '../data/prompts.json';

const CAMPUS_SLIDES = [
  {
    title: '一塔湖图',
    caption: '校训塔与湖岸相映的大学城日常',
    image: '/assets/gzhu-campus-lake-pixel.webp',
    imageAlt: '广州大学校训塔与湖岸校园像素插画',
  },
  {
    title: '教学区全景',
    caption: '林荫与教学楼之间的校园一角',
    image: '/assets/gzhu-campus-teaching-pixel.webp',
    imageAlt: '广州大学教学楼群与湖畔校园像素插画',
  },
  {
    title: '校园正门',
    caption: '从熟悉的台阶走进大学生活',
    image: '/assets/gzhu-campus-gate-pixel.webp',
    imageAlt: '广州大学校园正门与台阶像素插画',
  },
];

export const Hero = ({ onOpenQrModal }) => {
  const promptCount = promptsData?.prompts?.length || 22;
  const [activeCampusIndex, setActiveCampusIndex] = useState(null);

  return (
    <section id="hero" className="hero-section relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden">
      <div className="hero-dot-field" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.93fr_1.07fr] gap-10 lg:gap-12 items-center">
          <div className="hero-copy">
            <div className="partner-label">
              <span className="partner-label-dot" />
              <span>广州大学</span>
              <span className="partner-cross">×</span>
              <span>抖音校园 WowLand</span>
            </div>

            <img
              src="/assets/official_pixel_title.png"
              alt="WowLand 社群招新正式启动"
              className="hero-pixel-title"
            />

            <h1 className="hero-title">
              在广大，
              <br />
              <span>把想法做成作品。</span>
            </h1>
            <p className="hero-description">
              从 AI 实践、技术共学到内容创作，和抖音校园 WowLand 一起，把校园里的灵感变成真实行动。
            </p>

            <div className="hero-actions">
              <button type="button" onClick={onOpenQrModal} className="pixel-button pixel-button-primary">
                <QrCode className="w-4 h-4" />
                <span>加入官方社群</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#prompts" className="pixel-button pixel-button-secondary">
                <Sparkles className="w-4 h-4" />
                <span>逛逛 AI 宝典</span>
              </a>
              <a href="#event" className="hero-text-link">
                <CalendarDays className="w-4 h-4" />
                <span>10.24 校园活动</span>
              </a>
            </div>

            <div className="hero-proof-row">
              <span><b>{promptCount}</b> 条即用提示词</span>
              <span className="hero-proof-divider" />
              <span>广州大学大学城校区</span>
              <span className="hero-proof-divider hidden sm:block" />
              <span className="hidden sm:inline">字节跳动生态支持</span>
            </div>
          </div>

          <div className="hero-art-wrap">
            <div className="hero-art-shadow" aria-hidden="true" />
            <div className="hero-artboard campus-gallery" role="region" aria-label="广州大学校园图鉴">
              <div className="hero-artboard-top">
                <span className="pixel-chip">校园图鉴 / 插画集</span>
                <span className="hero-artboard-coordinate">大学城 · 广州</span>
              </div>
              <div
                className="campus-gallery-grid"
                onMouseLeave={() => setActiveCampusIndex(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setActiveCampusIndex(null);
                }}
              >
                {CAMPUS_SLIDES.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    className={`campus-gallery-card ${activeCampusIndex === index ? 'is-active' : ''} ${activeCampusIndex !== null && activeCampusIndex !== index ? 'is-muted' : ''}`}
                    onMouseEnter={() => setActiveCampusIndex(index)}
                    onFocus={() => setActiveCampusIndex(index)}
                    onClick={() => setActiveCampusIndex(index)}
                    aria-label={`${slide.title}：${slide.caption}`}
                  >
                    <span className="campus-gallery-index">0{index + 1}</span>
                    <img src={slide.image} alt={slide.imageAlt} loading="eager" />
                    <span className="campus-gallery-copy">
                      <strong>{slide.title}</strong>
                      <span>{slide.caption}</span>
                    </span>
                    <MapPin className="campus-gallery-pin" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
            <div className="hero-art-caption">
              <span className="caption-square" />
              <span>三张校园明信片 · 悬停或轻触，拾起一张</span>
            </div>
          </div>
        </div>

        <div className="hero-bottom-strip">
          <span className="strip-label">WOWLAND / CAMPUS COLLAB</span>
          <span>把 AI 用起来</span>
          <span className="strip-star">✳</span>
          <span>把作品做出来</span>
          <span className="strip-star">✳</span>
          <span>把校园连接起来</span>
          <span className="strip-end">2026 招新季</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
