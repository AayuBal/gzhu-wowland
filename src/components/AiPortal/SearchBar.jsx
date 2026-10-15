import React from 'react';
import { Search, X, Tag, Sparkles } from 'lucide-react';

const DEFAULT_SUGGESTED_KEYWORDS = [
  '降重',
  'Python',
  '二课分',
  '即梦AI',
  'STAR法则',
  '开题报告',
  '爬虫',
  'LeetCode',
];

/**
 * 实时关键字搜索与快捷标签过滤栏
 * @param {Object} props
 * @param {string} props.searchTerm - 当前搜索词
 * @param {Function} props.onSearchChange - 搜索词变更回调
 * @param {number} props.totalCount - 总提示词数
 * @param {number} props.filteredCount - 当前筛选后提示词数
 * @param {string[]} [props.suggestedKeywords] - 推荐热门搜索词
 */
export function SearchBar({
  searchTerm = '',
  onSearchChange,
  totalCount = 0,
  filteredCount = 0,
  suggestedKeywords = DEFAULT_SUGGESTED_KEYWORDS,
}) {
  const handleClear = () => {
    onSearchChange('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  const handleKeywordClick = (keyword) => {
    if (searchTerm === keyword) {
      onSearchChange('');
    } else {
      onSearchChange(keyword);
    }
  };

  return (
    <div className="w-full space-y-3.5">
      {/* Main Search Input & Counter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input Container */}
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyber-cyan transition-colors">
            <Search className="w-4 h-4" />
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索提示词名称、标签、模型 (DeepSeek/豆包) 或核心内容..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#14161F]/90 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan shadow-inner transition-all duration-200"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="清空搜索内容 (ESC)"
            >
              <div className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <X className="w-3 h-3" />
              </div>
            </button>
          )}
        </div>

        {/* Counter Badge */}
        <div className="flex items-center justify-between sm:justify-end gap-2 px-3.5 py-2.5 rounded-xl bg-[#14161F]/80 border border-white/10 text-xs font-mono select-none">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
            <span className="hidden lg:inline text-slate-400">已显示</span>
            <span className="font-bold text-cyber-cyan">{filteredCount}</span>
            <span className="text-slate-500">/</span>
            <span className="font-bold text-white">{totalCount}</span>
            <span className="text-slate-400">条提示词</span>
          </div>
          {filteredCount !== totalCount && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyber-magenta/15 text-cyber-magenta border border-cyber-magenta/30 font-semibold">
              已过滤
            </span>
          )}
        </div>
      </div>

      {/* Suggested Keywords / Quick Tag Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 text-xs text-slate-400">
        <div className="inline-flex items-center gap-1 text-slate-400 shrink-0 text-[11px] font-medium">
          <Tag className="w-3 h-3 text-cyber-cyan" />
          <span>推荐热词:</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {suggestedKeywords.map((keyword) => {
            const isSelected = searchTerm.toLowerCase() === keyword.toLowerCase();

            return (
              <button
                key={keyword}
                type="button"
                onClick={() => handleKeywordClick(keyword)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all duration-150 select-none cursor-pointer ${
                  isSelected
                    ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/50 font-bold shadow-[0_0_10px_rgba(0,242,254,0.3)]'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10 border border-white/5'
                }`}
              >
                #{keyword}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
