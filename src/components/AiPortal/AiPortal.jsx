import React, { useState, useMemo } from 'react';
import { Sparkles, SearchX, RotateCcw, MessageSquareCode, Layers, ArrowRight } from 'lucide-react';
import promptsData from '../../data/prompts.json';
import { CategoryTabs } from './CategoryTabs';
import { SearchBar } from './SearchBar';
import { PromptCard } from './PromptCard';
import { Toast } from './Toast';
import { filterPrompts } from '../../utils/filterPrompts';

/**
 * 广州大学 WowLand AI 生产力宝典核心门户组件
 * @param {Object} props
 * @param {Function} [props.onOpenQrModal] - 唤起社群活码弹窗
 */
export function AiPortal({ onOpenQrModal, fullPage = false }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({
    visible: false,
    message: '已复制到剪贴板！可直接粘贴至对应大模型使用',
    subtitle: '',
  });

  const categories = promptsData.categories || [
    { id: 'all', name: '全部宝典', icon: 'Sparkles' },
    { id: 'academic', name: '学业与论文', icon: 'GraduationCap' },
    { id: 'coding', name: '编程与开发', icon: 'Code2' },
    { id: 'multimodal', name: '生图与设计', icon: 'Palette' },
    { id: 'career', name: '求职与比赛', icon: 'Briefcase' },
    { id: 'campus', name: '广大学子定制', icon: 'School' },
  ];

  const totalCount = promptsData.prompts.length;

  // 动态统计各分类下的提示词数量
  const promptCounts = useMemo(() => {
    const counts = { all: totalCount };
    categories.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = 0;
      }
    });

    promptsData.prompts.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });

    return counts;
  }, [totalCount, categories]);

  // 响应式多维实时检索与过滤
  const filteredPrompts = useMemo(() => {
    return filterPrompts(promptsData.prompts, activeCategory, searchTerm);
  }, [activeCategory, searchTerm]);
  const previewPrompts = ['p-02', 'p-03', 'p-08']
    .map((id) => promptsData.prompts.find((prompt) => prompt.id === id))
    .filter(Boolean);
  const visiblePrompts = fullPage ? filteredPrompts : previewPrompts;

  const handleCopyTrigger = (text, title) => {
    setToast({
      visible: true,
      message: '已复制到剪贴板！可直接粘贴至对应大模型使用',
      subtitle: title || '',
    });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchTerm('');
  };

  return (
    <section id="prompts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20 relative">
      {/* Spec Anchor Compatibility */}
      <div id="ai-portal" className="sr-only" aria-hidden="true" />

      {/* Background Decor Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-cyber-cyan/5 blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-magenta/15 border border-cyber-magenta/30 text-cyber-magenta text-xs font-bold mb-3 shadow-[0_0_12px_rgba(254,44,85,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{fullPage ? 'WOWLAND · PROMPT LIBRARY' : 'WOWLAND · AI TOOLBOX'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {fullPage ? 'AI 生产力宝典' : '高频提示词精选'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            {fullPage
              ? `按学习、创作、开发与校园实践场景整理的 ${totalCount} 条提示词模板，可搜索、筛选并复制使用。`
              : `从学习、编程和校园场景中挑出三条常用模板。完整的 ${totalCount} 条提示词可在独立页面浏览。`}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl shrink-0">
          <Layers className="w-4 h-4 text-cyber-cyan" />
            <span>{totalCount} 条校园场景提示词</span>
        </div>
      </div>

      {/* Interactive Controls: Category Tabs & Search Bar */}
      {fullPage && (
        <div className="space-y-6 mb-8">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categories={categories}
            promptCounts={promptCounts}
          />
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            totalCount={totalCount}
            filteredCount={filteredPrompts.length}
          />
        </div>
      )}

      {/* Prompts Cards Grid / Empty State */}
      {visiblePrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePrompts.map((item) => (
            <PromptCard
              key={item.id}
              prompt={item}
              onCopy={handleCopyTrigger}
              compact={!fullPage}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-card rounded-2xl p-10 sm:p-14 border border-dashed border-white/15 text-center flex flex-col items-center justify-center my-6">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
            <SearchX className="w-7 h-7 text-cyber-magenta" />
          </div>

          <h3 className="text-lg font-bold text-white mb-2">未找到匹配的提示词</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
            没有匹配到包含 <span className="text-cyber-cyan font-mono font-semibold">“{searchTerm}”</span> 的提示词。建议尝试更简短的关键词或切换分类筛选。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyber-cyan/15 hover:bg-cyber-cyan/25 text-cyber-cyan border border-cyber-cyan/40 hover:border-cyber-cyan text-xs font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(0,242,254,0.25)]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重置所有筛选</span>
            </button>

            {onOpenQrModal ? (
              <button
                type="button"
                onClick={onOpenQrModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold transition-all cursor-pointer"
              >
                <MessageSquareCode className="w-3.5 h-3.5 text-cyber-magenta" />
                <span>进群提交定制需求</span>
              </button>
            ) : (
              <a
                href="#community"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold transition-all"
              >
                <MessageSquareCode className="w-3.5 h-3.5 text-cyber-magenta" />
                <span>进群提交定制需求</span>
              </a>
            )}
          </div>
        </div>
      )}

      {!fullPage && (
        <div className="prompt-library-cta">
          <div>
            <strong>想找更合适的模板？</strong>
            <span>打开完整提示词库，按分类检索全部 {totalCount} 条内容。</span>
          </div>
          <a href="#/prompts" className="prompt-library-link">
            <span>查看全部提示词</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Global Cyber-green Debounced Toast Notification */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        subtitle={toast.subtitle}
        onClose={handleCloseToast}
        duration={2500}
      />
    </section>
  );
}

export default AiPortal;
