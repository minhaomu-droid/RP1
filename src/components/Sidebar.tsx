import React, { useState } from 'react';
import {
  ChevronRight,
  Sparkles,
  Cpu,
  Rocket,
  Terminal,
  Activity,
  GitFork,
  Bot,
  FileCode2,
  FolderTree,
  ChevronsUpDown,
} from 'lucide-react';
import { NAVIGATION_DATA } from '../data/navigation';

interface Props {
  currentArticleId: string;
  onSelectArticle: (id: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4 text-[#3578e5]" />,
  Cpu: <Cpu className="w-4 h-4 text-emerald-600" />,
  Rocket: <Rocket className="w-4 h-4 text-rose-500" />,
  Terminal: <Terminal className="w-4 h-4 text-amber-600" />,
  Activity: <Activity className="w-4 h-4 text-purple-600" />,
  GitFork: <GitFork className="w-4 h-4 text-cyan-600" />,
  Bot: <Bot className="w-4 h-4 text-teal-600" />,
  FileCode2: <FileCode2 className="w-4 h-4 text-indigo-600" />,
};

export const Sidebar: React.FC<Props> = ({
  currentArticleId,
  onSelectArticle,
}) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAVIGATION_DATA.forEach((cat) => {
      initial[cat.id] = true;
    });
    return initial;
  });

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    NAVIGATION_DATA.forEach((cat) => {
      allOpen[cat.id] = true;
    });
    setOpenCategories(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenCategories({});
  };

  return (
    <aside className="w-full h-full overflow-y-auto px-3 py-4 text-slate-700 font-sans text-xs select-none">
      {/* Sidebar Top Quick Action */}
      <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-slate-200">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          技术文档目录
        </span>
        <button
          onClick={() => {
            const anyOpen = Object.values(openCategories).some((v) => v);
            if (anyOpen) handleCollapseAll();
            else handleExpandAll();
          }}
          className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800 px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
        >
          <ChevronsUpDown className="w-3 h-3" />
          <span>折叠/展开</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-1.5">
        {NAVIGATION_DATA.map((cat) => {
          const isOpen = openCategories[cat.id] ?? true;
          const hasActiveItem = cat.items.some((i) => i.id === currentArticleId);

          return (
            <div key={cat.id} className="space-y-0.5">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left font-semibold transition-colors group ${
                  hasActiveItem
                    ? 'text-[#3578e5] bg-blue-50/70 font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="shrink-0">{ICON_MAP[cat.icon]}</span>
                  <span className="text-xs truncate font-medium">
                    {cat.title}
                  </span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-90 text-[#3578e5]' : ''
                  }`}
                />
              </button>

              {/* Sub items */}
              {isOpen && (
                <div className="pl-3 pr-1 py-0.5 space-y-0.5 border-l border-slate-200 ml-4 mt-0.5">
                  {cat.items.map((item) => {
                    const isActive = currentArticleId === item.id;

                    return (
                      <div
                        key={item.id}
                        onClick={() => onSelectArticle(item.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11.5px] cursor-pointer transition-all flex items-center justify-between group ${
                          isActive
                            ? 'bg-[#3578e5] text-white font-medium shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate pr-1">
                          {item.title}
                        </span>

                        {item.badge && (
                          <span
                            className={`text-[9.5px] font-semibold px-1.5 py-0.2 rounded shrink-0 ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Documentation Card */}
      <div className="mt-8 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs">
        <div className="flex items-center gap-1.5 text-[#3578e5] font-semibold text-xs mb-1">
          <FolderTree className="w-3.5 h-3.5" />
          <span>开源技术报告发布</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5">
          Roboparty 坚信：把对的工程做扎实，把封闭的底层向行业全面开放。
        </p>
        <button
          onClick={() => onSelectArticle('intro-overview')}
          className="w-full py-1.5 px-2 bg-[#3578e5] hover:bg-[#2d66c3] text-white rounded-lg text-center font-medium text-[11px] transition-colors shadow-2xs"
        >
          查看技术报告全景 →
        </button>
      </div>
    </aside>
  );
};
