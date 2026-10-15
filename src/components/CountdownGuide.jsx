import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Gift,
  Play,
  ExternalLink,
  Sparkles,
  Tv
} from 'lucide-react';
import { calculateTimeRemaining, padZero } from '../utils/countdown';
import eventData from '../data/event.json';

const TARGET_TIME = eventData.countdown_target || '2026-10-24T10:00:00+08:00';

/**
 * CountdownGuide - 10.24 Campus Booth Countdown, Map Guide & Video Showcase
 * 
 * Features:
 * - Live dynamic countdown (Days, Hours, Mins, Secs) updated every second
 * - 10.24 Hongmian Road Booth Map & Route Guide
 * - External online video link with a local lightweight cover
 * - Dual perks guide (Swag bag + JiMeng AI 30 lucky draws)
 */
export const CountdownGuide = () => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(TARGET_TIME));
  const videoUrl = eventData.campus_video_url || '';
  const [selectedPoster, setSelectedPoster] = useState(null);

  // Dynamic countdown interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(TARGET_TIME));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="event" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 scroll-mt-20">
      {/* Spec Anchor Compatibility */}
      <div id="booth" className="sr-only" aria-hidden="true" />
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gzhu-kapok/15 text-gzhu-kapok border border-gzhu-kapok/30 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>广大百团大战现场 · 官方科技展位</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            10.24 广大校园活动指南
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            广州大学“数智青年·创见未来”科技展台 · 沉浸式 AI 体验与专属福利发放
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
          <span className={`w-2 h-2 rounded-full ${timeLeft.isOver ? 'bg-emerald-400' : 'bg-cyber-cyan animate-ping'}`} />
          <span className="text-slate-300">
            {timeLeft.isOver ? '🎉 10.24 现场火热进行中' : '🔥 百团大战倒计时开启'}
          </span>
        </div>
      </div>

      {/* Main Countdown Display Grid */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden mb-12 shadow-2xl">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyber-cyan/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
          <span className="text-xs font-bold text-cyber-cyan uppercase tracking-widest block mb-1">
            COUNTDOWN TO GZHU WOWLAND BOOTH
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-white">
            {timeLeft.isOver ? '校园活动正在进行中，期待你的光临！' : '距离 10.24 校园活动开放还剩'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            活动开放时间：2026 年 10 月 24 日 10:00 | 开放至 18:00
          </p>
        </div>

        {/* 4 Card Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto relative z-10">
          {/* Days */}
          <div className="glass-card-hover rounded-2xl p-4 sm:p-6 text-center border-cyber-cyan/30 flex flex-col justify-center items-center">
            <div className="text-3xl sm:text-5xl md:text-6xl font-black text-cyber-cyan font-mono tracking-tight text-glow-cyan">
              {padZero(timeLeft.days)}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
              天 / Days
            </div>
          </div>

          {/* Hours */}
          <div className="glass-card-hover rounded-2xl p-4 sm:p-6 text-center border-cyber-magenta/30 flex flex-col justify-center items-center">
            <div className="text-3xl sm:text-5xl md:text-6xl font-black text-cyber-magenta font-mono tracking-tight text-glow-magenta">
              {padZero(timeLeft.hours)}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
              时 / Hours
            </div>
          </div>

          {/* Minutes */}
          <div className="glass-card-hover rounded-2xl p-4 sm:p-6 text-center border-white/20 flex flex-col justify-center items-center">
            <div className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-100 font-mono tracking-tight">
              {padZero(timeLeft.minutes)}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
              分 / Mins
            </div>
          </div>

          {/* Seconds */}
          <div className="glass-card-hover rounded-2xl p-4 sm:p-6 text-center border-gzhu-kapok/30 flex flex-col justify-center items-center">
            <div className="text-3xl sm:text-5xl md:text-6xl font-black text-gzhu-kapok font-mono tracking-tight text-glow-kapok">
              {padZero(timeLeft.seconds)}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">
              秒 / Secs
            </div>
          </div>
        </div>

        {/* Visitor-facing event hours */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-400 relative z-10">
          <Clock className="w-4 h-4 text-cyber-cyan" />
          <span>活动开放时间：<strong className="text-white">10:00 - 18:00</strong></span>
        </div>
      </div>

      {/* Bento Grid: Booth Guide & Video Player Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 10.24 Booth Guide & Dual Perks (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Location & Booth Specs Card */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gzhu-kapok/20 border border-gzhu-kapok/40 flex items-center justify-center text-gzhu-kapok shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base sm:text-lg font-bold text-white">活动地点</h4>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-gzhu-kapok/20 text-gzhu-kapok border border-gzhu-kapok/30 font-semibold">
                    地标红棉路
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 leading-relaxed">
                  广州大学大学城校区红棉路，生活区一食堂附近。
                </p>
              </div>
            </div>
          </div>

          {/* Dual Perks Guide: Swag + JiMeng AI Lucky Draw */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Perk 1: Swag note package */}
            <div className="glass-card rounded-2xl p-5 border border-cyber-cyan/30 relative overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-cyber-cyan/20 text-cyber-cyan flex items-center justify-center font-bold text-sm mb-3">
                <Gift className="w-4 h-4" />
              </div>
              <div className="inline-block px-2 py-0.5 rounded bg-cyber-cyan/20 text-cyber-cyan text-[10px] font-bold mb-2">
                进群即享 · 100% 免费领
              </div>
              <h5 className="font-bold text-white text-sm mb-1.5">
                进群领随身便签礼包
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                扫码加入 WowLand 官方抖音社群，即可在红棉路现场直接领取官方定制随身便签纸、高光镭射贴纸与 AI 生产力速查卡片。
              </p>
            </div>

            {/* Perk 2: JiMeng AI Draw */}
            <div className="glass-card rounded-2xl p-5 border border-cyber-magenta/30 relative overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-cyber-magenta/20 text-cyber-magenta flex items-center justify-center font-bold text-sm mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="inline-block px-2 py-0.5 rounded bg-cyber-magenta/20 text-cyber-magenta text-[10px] font-bold mb-2">
                现场抽奖 · 限量 30 份
              </div>
              <h5 className="font-bold text-white text-sm mb-1.5">
                现场即梦 AI 生图抽 30 份限定周边
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                现场体验即梦 AI 生成专属动漫头像，完成互动即可参与抽取 30 份限定周边与奶茶免单特权！
              </p>
            </div>

          </div>

        </div>

        {/* Right Column: Video Player / Showcase Slot with Controls (5 cols) */}
        <div className="lg:col-span-5">
          <div className="glass-card rounded-3xl p-5 border border-white/10 shadow-xl relative overflow-hidden">
            
            {/* Player Header */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-cyber-cyan" />
                <span className="text-xs font-bold text-white">WowLand 校园影像</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300">广州大学 × 抖音校园</span>
            </div>

            <div className="campus-video-link">
              <img src="/assets/official_kv_horizontal.jpg" alt="WowLand 校园影像宣传海报" loading="lazy" />
              <div className="campus-video-link-copy">
                <h3>在 WowLand，迈出成长的第一步</h3>
                <p>抖音校园 · 把成长变成有趣、轻量、立刻能开始的小任务。</p>
                {videoUrl ? (
                  <a className="pixel-button pixel-button-primary" href={videoUrl} target="_blank" rel="noopener noreferrer">
                    <Play className="w-4 h-4" /><span>在抖音观看</span><ExternalLink className="w-4 h-4" />
                  </a>
                ) : <span className="campus-video-pending">校园影像即将上线</span>}
              </div>
            </div>

            {/* Official Material Fast Access Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400">活动视觉物料</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPoster({
                    title: '官方易拉宝全景排版（定稿）',
                    src: '/assets/official_banner_full.jpg',
                    desc: '五联易拉宝全景排版：社群定位、品牌活动、成长架构与加入方式'
                  })}
                  className="px-2.5 py-1 rounded-lg bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/30 text-cyber-cyan text-[11px] font-semibold transition-colors"
                >
                  易拉宝全景
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPoster({
                    title: '官方竖版 4K 主视觉海报',
                    src: '/assets/official_kv_vertical.jpg',
                    desc: '字节跳动官方主视觉（1080x1920 高清无损版）'
                  })}
                  className="px-2.5 py-1 rounded-lg bg-cyber-magenta/10 hover:bg-cyber-magenta/20 border border-cyber-magenta/30 text-cyber-magenta text-[11px] font-semibold transition-colors"
                >
                  主视觉海报
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Official Poster Lightbox Modal */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedPoster(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#14161F] border border-white/20 rounded-2xl p-4 flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div>
                <h4 className="text-base font-bold text-white">{selectedPoster.title}</h4>
                <p className="text-xs text-slate-400">{selectedPoster.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPoster(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto max-h-[70vh] flex items-center justify-center bg-black/60 rounded-xl p-2">
              <img
                src={selectedPoster.src}
                alt={selectedPoster.title}
                className="max-w-full max-h-[68vh] object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="pt-3 flex items-center justify-end text-xs text-slate-400">
              <a
                href={selectedPoster.src}
                download
                className="px-3 py-1 rounded-lg bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 hover:bg-cyber-cyan/30"
              >
                下载高清原图
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
