import React, { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, ExternalLink } from 'lucide-react';
import { REPORTS, REPORT_CATEGORIES } from '../data/reports';

const ReportCard = ({ report, index }) => (
  <a className="report-card" href={report.url} target="_blank" rel="noopener noreferrer" aria-label={`${report.title}，前往${report.source}原文` }>
    <div className="report-card-meta"><span>{report.date}</span><span>{report.category}</span></div>
    <div className="report-card-index">{String(index + 1).padStart(2, '0')}<span> / WOW MOMENT</span></div>
    <h3>{report.title}</h3>
    <p>{report.summary}</p>
    <div className="report-card-foot"><span>来源：{report.source}</span><ExternalLink size={16} aria-hidden="true" /></div>
  </a>
);

export const ArchiveSection = () => {
  const featured = REPORTS.slice(0, 3);
  return (
    <section id="archive" className="archive-section scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="archive-heading">
          <div>
            <span className="section-eyebrow">PAST WOW MOMENTS / 往期回顾</span>
            <h2>每一次开始，都有回响。</h2>
          </div>
          <p>从 Wow 行动到 AI 创变者计划，看看全国同学已经创造的真实故事。以下为抖音校园及公开媒体报道，并非广州大学已举办活动的记录。</p>
        </div>
        <div className="archive-stats" aria-label="公开报道中的活动数据">
          <div><strong>125 <small>天</small></strong><span>2026 黑客松联赛历程</span></div>
          <div><strong>46 <small>场</small></strong><span>2026 线下交流赛</span></div>
          <div><strong>77 <small>所</small></strong><span>参与 4 月 Wow 行动的高校</span></div>
          <div><strong>2000<small>+</small></strong><span>参与 4 月 Wow 行动的同学</span></div>
        </div>
        <div className="report-grid">{featured.map((report, index) => <ReportCard key={report.url} report={report} index={index} />)}</div>
        <div className="archive-bottom"><span>17 篇公开报道 · 持续收录中</span><a className="pixel-button pixel-button-secondary" href="#/archive">查看全部 17 篇报道 <ArrowUpRight size={17} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
};

export const ArchivePage = ({ onNavigateHome }) => {
  const [category, setCategory] = useState('全部');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => REPORTS.filter((report) => {
    const matchesCategory = category === '全部' || report.category === category;
    const matchesQuery = `${report.title} ${report.source} ${report.summary}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  return (
    <div className="archive-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button type="button" className="prompt-page-back" onClick={() => onNavigateHome('archive')}><span aria-hidden="true">←</span> 返回首页</button>
      <div className="archive-page-hero">
        <span className="section-eyebrow">WOWLAND / PUBLIC STORIES</span>
        <h1>往期的 WOW 时刻</h1>
        <p>收录抖音校园 WowLand 的全国活动回顾与公开媒体报道。这里展示的是全国项目的故事，不代表这些活动已经在广州大学举办。</p>
        <div className="archive-page-count"><BookOpen size={18} aria-hidden="true" /> <strong>{REPORTS.length}</strong> 篇报道 <span>2025.10—2026.09</span></div>
      </div>
      <div className="archive-controls">
        <div className="archive-filters" role="group" aria-label="报道分类">
          {REPORT_CATEGORIES.map((item) => <button key={item} type="button" className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}<span>{item === '全部' ? REPORTS.length : REPORTS.filter((r) => r.category === item).length}</span></button>)}
        </div>
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索标题或来源" aria-label="搜索报道" />
      </div>
      <div className="archive-results">显示 {filtered.length} 篇报道</div>
      {filtered.length ? <div className="report-grid archive-page-grid">{filtered.map((report) => <ReportCard key={report.url} report={report} index={REPORTS.indexOf(report)} />)}</div> : <p className="archive-empty">没有找到匹配的报道，试试其他关键词。</p>}
      <p className="archive-source-note">文章标题、发布日期与来源来自公开报道；摘要为本站整理。点击卡片将前往原发布页面，内容版权归原发布者所有。</p>
    </div>
  );
};

export default ArchiveSection;
