import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ArrowRight, FileText } from 'lucide-react';
import { NAVIGATION_DATA } from '../data/navigation';
import { ARTICLES_DATA, getDocArticle } from '../data/docContent';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (id: string) => void;
}

export const SearchModal: React.FC<Props> = ({ isOpen, onClose, onSelectArticle }) => {
  const [query, setQuery] = useState('');

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Index articles
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQ = query.toLowerCase();
    const results: {
      id: string;
      title: string;
      category: string;
      matchedText: string;
      tags: string[];
    }[] = [];

    // Search through all navigation items
    for (const cat of NAVIGATION_DATA) {
      for (const item of cat.items) {
        const article = ARTICLES_DATA[item.id] || getDocArticle(item.id);
        const titleMatch = article.title.toLowerCase().includes(lowerQ);
        const descMatch = article.description.toLowerCase().includes(lowerQ);
        const tagMatch = article.tags.some(t => t.toLowerCase().includes(lowerQ));

        // Also search section titles
        const sectionMatch = article.content.sections.find(
          s => s.title.toLowerCase().includes(lowerQ) || (s.lead && s.lead.toLowerCase().includes(lowerQ))
        );

        if (titleMatch || descMatch || tagMatch || sectionMatch) {
          results.push({
            id: item.id,
            title: article.title,
            category: cat.title,
            matchedText: sectionMatch ? `匹配章节: ${sectionMatch.title}` : article.description,
            tags: article.tags,
          });
        }
      }
    }

    return results;
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/70">
          <Search className="w-5 h-5 text-[#3578e5] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="在 RP1 文档中搜索，如：动力模组、标准版对比、双电池、快充、自主出箱..."
            className="flex-1 bg-transparent border-0 text-slate-800 placeholder-slate-400 focus:outline-none text-sm font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-white text-slate-500 rounded border border-slate-300 shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="p-3 overflow-y-auto max-h-[55vh] divide-y divide-slate-100">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#3578e5]" />
              <p>输入关键词以快速检索 RP1 技术文档、参数表及操作指南</p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {['标准版与Pro对比', '动力模组', '双电池热插拔', '140瓦快充', '自主出箱', '随身急停', '内走线灵巧手'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-[#3578e5] text-[11px] transition-colors border border-slate-200"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              未找到与 "<span className="text-slate-900 font-medium">{query}</span>" 相关的文档。
            </div>
          ) : (
            searchResults.map((res) => (
              <div
                key={res.id}
                onClick={() => {
                  onSelectArticle(res.id);
                  onClose();
                }}
                className="p-3 hover:bg-blue-50/60 rounded-xl cursor-pointer transition-colors group flex items-start justify-between"
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#3578e5] font-medium">
                    <span>{res.category}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#3578e5] transition-colors mt-0.5">
                    {res.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {res.matchedText}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {res.tags.map((t) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium border border-slate-200">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#3578e5] group-hover:translate-x-1 transition-all mt-3" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
          <span>共找到 {searchResults.length} 条相关文档结果</span>
          <span>按 <kbd className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded text-slate-600">Enter</kbd> 跳转</span>
        </div>
      </div>
    </div>
  );
};
