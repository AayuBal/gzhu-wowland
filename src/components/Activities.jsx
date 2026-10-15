import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ACTIVITIES = [
  {
    title: 'AI 创变者计划',
    detail: '从「你的第一个 AI 产品」创作共学出发，探索 AIGC 创作、主题黑客松等动手实践。',
    tags: '产品共学 · 百校造百岛 · 黑客松',
    art: '/assets/official_coding_cone.png',
    artAlt: 'WowLand 官方像素风 coding 路锥',
    tone: 'lime',
  },
  {
    title: 'Wow 行动',
    detail: '把成长拆成轻量有趣的小任务，跳出日常，在行动、记录和分享中认识新的自己。',
    tags: '成长挑战 · 同伴参与',
    art: '/assets/official_runner.png',
    artAlt: 'WowLand 官方奔跑角色',
    tone: 'pink',
  },
  {
    title: '野生创作 Camp',
    detail: '用采访、影像、文字与设计记录真实生活，让「人生可能性」「Wow 时刻」变成可分享的作品。',
    tags: '成长记录 · Wow Design',
    art: '/assets/official_token_cat.png',
    artAlt: 'WowLand 官方像素风猫咪与 token',
    tone: 'blue',
  },
  {
    title: 'Wow 前辈 / Wow Link',
    detail: '听真实的职业经验，也在线下遇见不同专业的伙伴，一起聊选择、困惑与新的可能。',
    tags: '职业分享 · 线下连接',
    art: '/assets/official_cloud_join.png',
    artAlt: 'WowLand 官方像素风 Join 云朵',
    tone: 'yellow',
  },
];

export const Activities = () => (
  <section id="activities" className="activities-section scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="activities-heading">
        <div>
          <span className="section-eyebrow">WHAT WE DO / 活动形式</span>
          <h2>不只参加一次活动，<br />还可以一直做点什么。</h2>
        </div>
        <p>参考 WowLand 官方项目形式，探索适合广大同学的共学、挑战、创作与连接。具体落地、时间和参与方式，以社群通知为准。</p>
      </div>
      <div className="activities-grid">
        {ACTIVITIES.map((activity, index) => {
          return (
            <article className={`activity-card activity-${activity.tone}`} key={activity.title}>
              <div className="activity-card-top"><span>0{index + 1} / OPEN TASK</span><span aria-hidden="true">↗</span></div>
              <div className="activity-art"><img src={activity.art} alt={activity.artAlt} loading="lazy" /></div>
              <h3>{activity.title}</h3>
              <p>{activity.detail}</p>
              <span className="activity-tag">{activity.tags}</span>
            </article>
          );
        })}
      </div>
      <a className="activities-link" href="#event">看看近期活动 <ArrowUpRight size={17} aria-hidden="true" /></a>
    </div>
  </section>
);

export default Activities;
