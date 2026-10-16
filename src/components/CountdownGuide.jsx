import React, { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, ChevronDown, Clock3, ExternalLink, Gift, MapPin, Play, Sparkles } from 'lucide-react';
import { calculateTimeRemaining, padZero } from '../utils/countdown';
import eventData from '../data/event.json';

const START = eventData.countdown_target || '2026-10-31T10:00:00+08:00';
const END = '2026-10-31T18:00:00+08:00';

export const CountdownGuide = () => {
  const [expanded, setExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(START));
  const [now, setNow] = useState(() => Date.now());
  const isFinished = now >= new Date(END).getTime();
  const isLive = now >= new Date(START).getTime() && !isFinished;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeRemaining(START));
      setNow(Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="event" className="recent-event-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 scroll-mt-20">
      <div id="booth" className="sr-only" aria-hidden="true" />
      <div className="recent-event-label"><span className="section-eyebrow">RECENT EVENT / 近期活动</span><span>01 / CAMPUS CALENDAR</span></div>
      <div className="recent-event-card">
        <div className="recent-event-date" aria-label="2026 年 10 月 31 日"><strong>31</strong><span>OCT<br />2026</span></div>
        <div className="recent-event-copy">
          <span className="recent-event-state">{isFinished ? '活动已结束' : isLive ? '活动进行中' : '即将到来'}</span>
          <h2>10.31 广大校园活动</h2>
          <p>在红棉路遇见 WowLand：现场体验 AI 创作，认识一起行动的同学。</p>
          <div className="recent-event-meta"><span><Clock3 size={15} aria-hidden="true" />10:00—18:00</span><span><MapPin size={15} aria-hidden="true" />大学城校区红棉路</span></div>
        </div>
        <button type="button" className="recent-event-toggle" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} aria-controls="event-plan">
          {expanded ? '收起活动计划' : '查看完整活动计划'} <ChevronDown size={18} aria-hidden="true" />
        </button>
      </div>

      <div id="event-plan" className={`event-plan-wrap ${expanded ? 'is-open' : ''}`} aria-hidden={!expanded} inert={!expanded ? 'inert' : undefined}>
        <div className="event-plan-inner">
          <div className="event-plan-content">
            <div className="event-plan-heading">
              <div><span className="section-eyebrow">10.31 / EVENT GUIDE</span><h3>一天的 WowLand，怎么逛？</h3></div>
              {isFinished ? <span className="event-status">活动已结束</span> : isLive ? <span className="event-status">现场进行中</span> : <span className="event-status">距离开放 {padZero(timeLeft.days)} 天 {padZero(timeLeft.hours)} 时 {padZero(timeLeft.minutes)} 分</span>}
            </div>
            <div className="event-plan-grid">
              <article className="event-detail-card event-detail-location">
                <MapPin size={25} aria-hidden="true" />
                <span className="event-detail-kicker">01 / FIND US</span>
                <h4>找到我们的展位</h4>
                <p>广州大学大学城校区红棉路，生活区一食堂附近。活动时间为 2026 年 10 月 31 日 10:00—18:00。</p>
              </article>
              <article className="event-detail-card event-detail-lime">
                <Gift size={25} aria-hidden="true" />
                <span className="event-detail-kicker">02 / JOIN & TAKE</span>
                <h4>加入社群，领取随身礼包</h4>
                <p>在现场扫码加入 WowLand 抖音社群，可领取定制随身便签纸、高光镭射贴纸与 AI 生产力速查卡片；数量以现场为准。</p>
              </article>
              <article className="event-detail-card event-detail-pink">
                <Sparkles size={25} aria-hidden="true" />
                <span className="event-detail-kicker">03 / PLAY WITH AI</span>
                <h4>体验即梦 AI 创作</h4>
                <p>试着生成自己的动漫头像，完成现场互动后可参与限定周边抽取。现场准备 30 份周边，具体规则以展位说明为准。</p>
              </article>
            </div>
            <div className="event-video-card">
              <img src="/assets/official_kv_horizontal.jpg" alt="WowLand 官方主视觉" loading="lazy" />
              <div><span className="event-detail-kicker">WOWLAND / CAMPUS VIDEO</span><h4>先看看 WowLand 的故事</h4><p>把成长变成有趣、轻量、立刻能开始的小任务。</p></div>
              <a href={eventData.campus_video_url} target="_blank" rel="noopener noreferrer">在抖音观看 <Play size={15} aria-hidden="true" /><ExternalLink size={14} aria-hidden="true" /></a>
            </div>
            <p className="event-plan-note"><CalendarDays size={16} aria-hidden="true" />活动信息以现场及社群最新通知为准。<a href="#community">加入社群 <ArrowUpRight size={14} aria-hidden="true" /></a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownGuide;
