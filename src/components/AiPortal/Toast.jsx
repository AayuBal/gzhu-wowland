import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

const DEFAULT_MESSAGE = '已复制到剪贴板！可直接粘贴至对应大模型使用';

/**
 * 赛博绿光胶囊 Toast 提示组件 (支持高频点击防抖与平滑延展)
 * @param {Object} props
 * @param {boolean} props.visible - 是否显示 Toast
 * @param {string} [props.message] - 主提示文本
 * @param {string} [props.subtitle] - 副标题/提示词名称
 * @param {Function} props.onClose - 关闭回调
 * @param {number} [props.duration=2500] - 自动关闭延时 (毫秒)
 */
export function Toast({
  visible = false,
  message = DEFAULT_MESSAGE,
  subtitle = '',
  type = 'success',
  onClose,
  duration = 2500,
}) {
  const timerRef = useRef(null);

  // 高频防抖：每次 visible 变为 true，或者消息内容更新时，重置并刷新定时器
  useEffect(() => {
    if (visible) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, message, subtitle, type, duration, onClose]);

  if (!visible) return null;

  const isError = type === 'error';
  const isInfo = type === 'info';

  const containerBorder = isError
    ? 'border-2 border-red-500/70 shadow-[0_0_30px_rgba(239,68,68,0.45)]'
    : isInfo
    ? 'border-2 border-cyber-cyan/70 shadow-[0_0_30px_rgba(0,242,254,0.45)]'
    : 'border-2 border-emerald-500/70 shadow-[0_0_30px_rgba(16,185,129,0.45)]';

  const badgeBg = isError
    ? 'bg-red-500/20 border border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
    : isInfo
    ? 'bg-cyber-cyan/20 border border-cyber-cyan/50 shadow-[0_0_12px_rgba(0,242,254,0.5)]'
    : 'bg-emerald-500/20 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.5)]';

  const textStyle = isError
    ? 'text-red-400'
    : isInfo
    ? 'text-cyber-cyan'
    : 'text-emerald-400';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] sm:max-w-md animate-scaleUp pointer-events-auto"
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-full bg-[#0B0C10]/95 backdrop-blur-xl text-slate-100 ${containerBorder}`}>
        {/* Glowing Green/Cyan/Red Icon Badge */}
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${badgeBg}`}>
          <CheckCircle2 className={`w-4 h-4 ${textStyle}`} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col min-w-0 pr-1">
          <div className={`text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5 truncate ${textStyle}`}>
            <span>{message}</span>
          </div>
          {subtitle && (
            <div className="text-[11px] text-slate-400 truncate flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyber-cyan shrink-0" />
              <span className="truncate">「{subtitle}」</span>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="ml-auto text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          title="关闭提示"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
