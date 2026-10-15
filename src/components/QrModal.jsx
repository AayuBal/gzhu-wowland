import React, { useEffect, useRef } from 'react';
import { X, Download, QrCode, Sparkles, Smartphone } from 'lucide-react';

/**
 * QrModal - High-definition Guangzhou University WowLand community QR modal
 * Features:
 * - Backdrop blur & full-screen overlay
 * - ESC key dismissal & Click-outside dismissal
 * - High-resolution QR display with error fallback
 * - 1-click download / mobile long-press tip
 */
export const QrModal = ({ isOpen, onClose, qrSrc = '/qr_douyin.png' }) => {
  const modalRef = useRef(null);

  // Close on ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle click outside modal content
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-sm sm:max-w-md bg-[#14161F]/95 rounded-3xl border border-cyber-cyan/40 shadow-[0_0_50px_rgba(0,242,254,0.25)] p-6 sm:p-8 text-center overflow-hidden transform transition-all duration-300 scale-100 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Cyber Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyber-cyan/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyber-magenta/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-cyan"
          aria-label="关闭二维码弹窗"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold mb-4">
          <QrCode className="w-3.5 h-3.5" />
          <span>广州大学 WowLand 校园社群</span>
        </div>

        {/* Modal Title */}
        <h3 id="qr-modal-title" className="text-xl sm:text-2xl font-black text-white mb-2 tracking-tight">
          加入 <span className="cyber-gradient-text">广州大学 WowLand 社群</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
          扫码加入 WowLand 抖音群聊，获取活动信息、学习资源与经验分享。具体活动安排以各项目正式通知为准。
        </p>

        {/* High-definition QR Card */}
        <div className="relative mx-auto w-56 sm:w-64 aspect-[3/4] p-2 bg-white rounded-2xl shadow-2xl border-2 border-cyber-cyan/60 flex items-center justify-center group mb-3 overflow-hidden">
          <img
            src={qrSrc}
            alt="广州大学 WowLand 社群二维码"
            className="w-full h-full object-contain rounded-xl select-none"
            onError={(e) => {
              // Fallback to secondary image or vector placeholder
              e.currentTarget.src = '/qr_douyin_community.png';
            }}
          />
        </div>

        {/* Mobile Long Press & Desktop Action Tips */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-cyber-cyan mb-5 bg-cyber-cyan/5 py-2 px-3 rounded-xl border border-cyber-cyan/15">
          <Smartphone className="w-4 h-4 shrink-0" />
          <span>掌握本校 WowLand 社群最新活动动态</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={qrSrc}
            download="广州大学WowLand_社群二维码.png"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyber-cyan via-white to-cyber-magenta text-black font-extrabold text-sm shadow-neon-cyan hover:opacity-95 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>保存二维码至相册</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium text-sm transition-colors"
          >
            已扫码关闭
          </button>
        </div>

        {/* Official community information note */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyber-magenta" />
          <span>从共学、创作、对话或实践开始，找到伙伴，探索更多可能。</span>
        </div>
      </div>
    </div>
  );
};
