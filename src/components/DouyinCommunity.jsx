import React, { useState } from 'react';
import { ArrowRight, BookOpen, Download, Maximize2, Pencil, QrCode, Smartphone, Sparkles, Users } from 'lucide-react';

/**
 * DouyinCommunity - Guangzhou University WowLand community QR and official intro.
 * Public-facing copy follows the official WowLand recruitment guide and materials.
 */
export const DouyinCommunity = ({ onOpenQrModal }) => {
  const [imgSrc, setImgSrc] = useState('/qr_douyin.png');

  const handleImageError = () => {
    if (imgSrc === '/qr_douyin.png') {
      setImgSrc('/qr_douyin_community.png');
    }
  };

  const benefits = [
    {
      icon: Sparkles,
      title: 'AI 学习与创新实践',
      text: '通过 AI 创作共学、训练营、主题创作与行业交流，学习和应用 AI 工具。',
      iconClass: 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan',
    },
    {
      icon: Users,
      title: '成长探索与职业交流',
      text: '围绕职业选择、求职准备与工作经验开展分享，在交流中认识自我、拓展视野。',
      iconClass: 'bg-gzhu-kapok/10 border-gzhu-kapok/30 text-gzhu-kapok',
    },
    {
      icon: Pencil,
      title: '内容创作与校园共创',
      text: '记录真实经历，参与表情包、文创与视觉设计共创；优秀作品有机会获得展示及制作支持。',
      iconClass: 'bg-cyber-magenta/10 border-cyber-magenta/30 text-cyber-magenta',
    },
    {
      icon: BookOpen,
      title: '学习资源与日常交流',
      text: '社群持续分享学习资源与实用经验，包括「成长发展 Insights」「AI 成长 Insights」等内容。',
      iconClass: 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan',
    },
  ];

  return (
    <section id="community" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 scroll-mt-20">
      <div className="relative rounded-3xl bg-[#14161F]/85 backdrop-blur-xl border-2 border-cyber-cyan/40 shadow-[0_0_40px_rgba(0,242,254,0.15)] p-6 sm:p-10 md:p-12 overflow-hidden group hover:border-cyber-cyan/70 transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyber-magenta/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gzhu-kapok/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>广州大学 WowLand 校园社群</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
            <QrCode className="w-3.5 h-3.5 text-cyber-cyan" />
            抖音扫码加入
          </span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            从一次共学、创作、对话或实践开始，
            <br className="hidden sm:block" />
            找到伙伴，探索自己的更多可能。
            <span className="cyber-gradient-text text-xl sm:text-3xl md:text-4xl block mt-3 font-black">
              广州大学 WowLand 校园社群
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed mt-4">
            扫码加入 WowLand 抖音群聊，获取活动信息、学习资源与经验分享。具体活动主题、时间、参与条件和资源安排，以各项目正式通知为准。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <div
              onClick={onOpenQrModal}
              className="relative p-4 sm:p-5 rounded-2xl bg-white/5 border border-cyber-cyan/50 hover:border-cyber-cyan shadow-neon-cyan hover:shadow-[0_0_35px_rgba(0,242,254,0.4)] transition-all duration-300 cursor-pointer group/qr"
              title="点击查看高清二维码"
            >
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyber-cyan" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyber-cyan" />

              <div className="w-56 sm:w-64 aspect-[3/4] bg-white rounded-xl p-2.5 flex items-center justify-center relative overflow-hidden shadow-inner">
                <img
                  src={imgSrc}
                  alt="广州大学 WowLand 社群二维码"
                  className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover/qr:scale-[1.02]"
                  onError={handleImageError}
                />

                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/qr:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                  <div className="p-2.5 rounded-full bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    点击放大查看
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-slate-300 text-[11px] font-medium">
                <Smartphone className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>掌握本校 WowLand 社群最新活动动态</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 w-full max-w-xs">
              <button
                type="button"
                onClick={onOpenQrModal}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cyber-cyan/15 hover:bg-cyber-cyan/25 border border-cyber-cyan/40 text-cyber-cyan font-bold text-xs transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>放大二维码</span>
              </button>
              <a
                href={imgSrc}
                download="广州大学WowLand_社群二维码.png"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>保存二维码</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between space-y-3">
            {benefits.map(({ icon: Icon, title, text: description, iconClass }) => (
              <div key={title} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${iconClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1">{title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
              <p>通过 WowLand 抖音群聊获取活动信息、学习资源并参与日常交流。</p>
              <a href="#event" className="inline-flex shrink-0 items-center gap-1 text-cyber-cyan hover:underline font-semibold transition-colors">
                <span>查看活动安排</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
