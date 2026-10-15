import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, Bot, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';

const CATEGORY_NAMES = {
  academic: '学业与论文',
  coding: '编程与开发',
  multimodal: '生图与设计',
  career: '求职与比赛',
  campus: '广大学子定制',
};

/**
 * 根据大模型名称返回对应科技配色的徽章类名
 * @param {string} modelName
 * @returns {string} Tailwind CSS class names
 */
function getModelBadgeStyle(modelName = '') {
  const lower = modelName.toLowerCase();
  if (lower.includes('deepseek')) {
    return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.2)]';
  }
  if (lower.includes('豆包')) {
    return 'bg-[#FE2C55]/15 text-[#FE2C55] border-[#FE2C55]/40 shadow-[0_0_8px_rgba(254,44,85,0.2)]';
  }
  if (lower.includes('gpt') || lower.includes('dall-e')) {
    return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]';
  }
  if (lower.includes('claude')) {
    return 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.2)]';
  }
  if (lower.includes('即梦') || lower.includes('midjourney')) {
    return 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.2)]';
  }
  return 'bg-blue-500/15 text-blue-300 border-blue-500/40';
}

/**
 * AI 生产力提示词卡片组件
 * @param {Object} props
 * @param {Object} props.prompt - 提示词对象
 * @param {Function} [props.onCopy] - 复制成功回调函数 (promptText, promptTitle)
 */
export function PromptCard({ prompt, onCopy, compact = false }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryLabel = CATEGORY_NAMES[prompt.category] || prompt.category;

  const handleCopy = async (e) => {
    e.stopPropagation();
    const success = await copyToClipboard(prompt.prompt);
    if (success) {
      setCopied(true);
      if (onCopy) {
        onCopy(prompt.prompt, prompt.title);
      }
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  if (compact) {
    return (
      <article className="prompt-card prompt-card-compact">
        <div className="prompt-card-compact-top">
          <span className="prompt-category-label">{categoryLabel}</span>
          <span className="prompt-card-id">#{prompt.id}</span>
        </div>
        <h3>{prompt.title}</h3>
        <p>{prompt.description}</p>
        <div className="prompt-card-compact-footer">
          <div className="prompt-card-models" aria-label="适配模型">
            {(prompt.targetModels || prompt.models || []).slice(0, 2).map((model, index) => (
              <span key={`${model}-${index}`}>{model}</span>
            ))}
          </div>
          <button type="button" onClick={handleCopy} className="prompt-copy-button" aria-label={`复制${prompt.title}`}>
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '已复制' : '复制模板'}</span>
          </button>
        </div>
      </article>
    );
  }

  return (
    <div className="prompt-card glass-card-hover rounded-2xl p-5 border border-white/10 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden bg-[#14161F]/80">
      {/* Top Accent Gradient Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan/0 to-transparent group-hover:via-cyber-cyan/70 transition-all duration-300" />

      {/* Main Content Area */}
      <div>
        {/* Category & ID Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
            <Sparkles className="w-3 h-3 text-cyber-cyan" />
            {categoryLabel}
          </span>
          <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-300 transition-colors">
            #{prompt.id}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-cyber-cyan transition-colors">
          {prompt.title}
        </h3>

        {/* Target Model Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <div className="inline-flex items-center gap-1 text-[10px] text-slate-400 mr-1">
            <Bot className="w-3 h-3" />
            <span>适配:</span>
          </div>
          {(prompt.targetModels || prompt.models || []).map((model, idx) => (
            <span
              key={idx}
              className={`text-[10px] px-2 py-0.5 rounded-md border font-medium transition-all ${getModelBadgeStyle(
                model
              )}`}
            >
              {model}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mb-3.5">
          {prompt.description}
        </p>

        {/* Tags */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {prompt.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Prompt Content Box (Expandable) */}
        <div className="relative rounded-xl bg-black/40 border border-white/5 p-3 mb-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5 pb-1 border-b border-white/5">
            <span>提示词模板</span>
            <span className="text-[10px] text-slate-400 font-sans">一键复制完整内容</span>
          </div>

          <div
            className={`text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed select-text transition-all duration-200 ${
              isExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {prompt.prompt}
          </div>

          {/* Expand/Collapse Toggle Button */}
          <button
            type="button"
            onClick={toggleExpand}
            className="w-full mt-2 pt-1.5 border-t border-white/5 flex items-center justify-center gap-1 text-[11px] text-slate-400 hover:text-cyber-cyan transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>收起完整提示词</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>展开查看完整提示词 ({prompt.prompt.length} 字)</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400">
          已适配主流大模型
        </span>

        {/* 1-Click Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none active:scale-95 ${
            copied
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
              : 'bg-cyber-cyan/15 hover:bg-cyber-cyan/25 text-cyber-cyan border border-cyber-cyan/40 hover:border-cyber-cyan shadow-[0_0_12px_rgba(0,242,254,0.2)]'
          }`}
          title="点击将完整提示词复制到剪贴板 (<100ms)"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400 animate-scaleUp" />
              <span>已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>一键复制</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PromptCard;
