import React from 'react';
import {
  Sparkles,
  GraduationCap,
  Code2,
  Palette,
  Briefcase,
  School,
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  GraduationCap,
  Code2,
  Palette,
  Briefcase,
  School,
};

/**
 * 6 大分类 Tabs 导航组件
 * @param {Object} props
 * @param {string} props.activeCategory - 当前选中的分类 id
 * @param {Function} props.onSelectCategory - 选中分类的回调函数
 * @param {Array} props.categories - 分类定义列表
 * @param {Object} [props.promptCounts] - 分类对应的提示词数量映射 { [categoryId]: number }
 */
export function CategoryTabs({
  activeCategory = 'all',
  onSelectCategory,
  categories = [],
  promptCounts = {},
}) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const IconComponent = ICON_MAP[cat.icon] || Sparkles;
          const count = promptCounts[cat.id] ?? cat.count ?? 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isActive}
              className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 select-none whitespace-nowrap min-h-[44px] cursor-pointer ${
                isActive
                  ? 'bg-[#b9ef24] text-[#171714] border-[1.5px] border-[#171714] shadow-[2px_2px_0_#171714]'
                  : 'bg-white text-[#66665e] hover:text-[#171714] border border-[#171714]/20 hover:border-[#171714]/45 hover:bg-[#f1f0e8]'
              }`}
            >
              {/* Icon */}
              <IconComponent
                className={`w-4 h-4 transition-transform duration-200 ${
                  isActive
                    ? 'text-[#171714]'
                    : 'text-[#77776e] group-hover:text-[#171714]'
                }`}
              />

              {/* Category Name */}
              <span>{cat.name}</span>

              {/* Count Badge */}
              <span
                className={`inline-flex items-center justify-center text-[11px] font-mono font-bold px-2 py-0.5 rounded-full min-w-[20px] transition-colors ${
                  isActive
                    ? 'bg-[#171714] text-[#fff] border border-[#171714]'
                    : 'bg-[#f1f0e8] text-[#66665e] group-hover:bg-white group-hover:text-[#171714] border border-[#171714]/10'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryTabs;
