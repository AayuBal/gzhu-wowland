import React from 'react';
import { ArrowUpRight, Bot, Compass, Palette, BookOpen } from 'lucide-react';

const TRACKS = [
  {
    number: '01',
    title: 'AI 实践与创变',
    english: 'MAKE WITH AI',
    description: '从认识工具到动手创作，把一个想法做成能展示、能体验的作品。没有基础，也能从一次小尝试开始。',
    tags: ['AI 工具共学', '作品实践', '创变挑战'],
    icon: Bot,
    className: 'program-card-lime',
  },
  {
    number: '02',
    title: '职业发展与连接',
    english: 'GROW TOGETHER',
    description: '和不同专业、不同年级的同学交流经验，在真实的行动与分享里，找到更适合自己的下一步。',
    tags: ['同伴交流', '经验分享', 'Wow 行动'],
    icon: Compass,
    className: 'program-card-pink',
  },
  {
    number: '03',
    title: '野生创作 Camp',
    english: 'CREATE FROM LIFE',
    description: '从校园生活出发，用文字、影像与设计记录问题和灵感，让表达从“想做”变成“做出来”。',
    tags: ['内容共创', '成长记录', '创意表达'],
    icon: Palette,
    className: 'program-card-blue',
  },
  {
    number: '04',
    title: '学习资源共建',
    english: 'LEARN AND SHARE',
    description: '把实用的 AI 技巧、创作方法和成长经验整理成大家都能用的资源，也欢迎你分享自己的发现。',
    tags: ['AI 资讯', '实用工具', '经验互助'],
    icon: BookOpen,
    className: 'program-card-yellow',
  },
];

export const GrowthPillars = () => (
  <section id="pillars" className="programs-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-20">
    <div className="programs-heading">
      <div>
        <span className="section-eyebrow">WHAT IS WOWLAND / 四条成长线</span>
        <h2>在广大，把成长变成一件能参与的事。</h2>
      </div>
      <p>WowLand 是持续开放的校园共学与共创社群。我们围绕四条成长线，发起可以动手、可以交流、可以留下作品的日常行动。</p>
    </div>

    <div className="growth-intro-bar">
      <span className="growth-intro-mark">✳</span>
      <p>你可以从感兴趣的一条线进入，也可以跨线尝试。每一次学习、连接与创作，都是下一次行动的起点。</p>
      <a href="#activities">看看我们会做什么 <ArrowUpRight size={16} aria-hidden="true" /></a>
    </div>

    <div className="growth-grid">
      {TRACKS.map((track) => {
        const Icon = track.icon;
        return (
          <article key={track.number} className={`program-card growth-card ${track.className}`}>
            <div className="program-card-top">
              <span className="program-number">{track.number} / 04</span>
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="program-eyebrow">{track.english}</span>
            <h3>{track.title}</h3>
            <p>{track.description}</p>
            <div className="growth-card-tags">{track.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        );
      })}
    </div>
  </section>
);

export default GrowthPillars;
