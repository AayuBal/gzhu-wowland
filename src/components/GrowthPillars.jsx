import React from 'react';
import { ArrowUpRight, Bot, Compass, Palette } from 'lucide-react';

const PROGRAMS = [
  {
    number: '01',
    title: '抖音 AI 创变者计划',
    eyebrow: 'MAKE WITH AI',
    description: '面向大学生的 AI 创新实践，围绕技能提升、产品与作品创作，连接真实产业与职业机会。',
    link: '#prompts',
    linkLabel: '从 AI 提示词开始',
    image: '/assets/official_coding_cone.png',
    imageAlt: 'WowLand 官方 Coding 像素路障',
    icon: Bot,
    className: 'program-card-lime',
  },
  {
    number: '02',
    title: 'WowLand 成长现场',
    eyebrow: 'GROW TOGETHER',
    description: '在真实经验、具体行动和同伴连接中，一起解决困惑、找到方向，让成长发生在日常里。',
    link: '#event',
    linkLabel: '看看校园活动',
    image: '/assets/official_token_cat.png',
    imageAlt: 'WowLand 官方 Token 猫咪与粮碗',
    icon: Compass,
    className: 'program-card-pink',
  },
  {
    number: '03',
    title: '野生创作 Camp',
    eyebrow: 'CREATE FROM LIFE',
    description: '从真实的大学生活出发，尝试内容表达与创作，让真诚、有趣、有价值的作品被更多人看见。',
    link: '#community',
    linkLabel: '加入共创社群',
    image: '/assets/official_runner.png',
    imageAlt: 'WowLand 官方粉色奔跑吉祥物',
    icon: Palette,
    className: 'program-card-blue',
  },
];

export const GrowthPillars = () => (
  <section id="pillars" className="programs-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-20">
    <div className="programs-heading">
      <div>
        <span className="section-eyebrow">WOWLAND / CAMPUS PROGRAMS</span>
        <h2>在广大，三种方式一起成长。</h2>
      </div>
      <p>从 AI 实践到同伴连接，再到作品创作。让每一种兴趣，都能找到下一步。</p>
    </div>

    <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
      {PROGRAMS.map((program) => {
        const Icon = program.icon;
        return (
          <article key={program.number} className={`program-card ${program.className}`}>
            <div className="program-card-top">
              <span className="program-number">{program.number}</span>
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="program-eyebrow">{program.eyebrow}</span>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <a href={program.link} className="program-link">
              <span>{program.linkLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <img src={program.image} alt={program.imageAlt} className="program-mascot" />
          </article>
        );
      })}
    </div>
  </section>
);

export default GrowthPillars;

