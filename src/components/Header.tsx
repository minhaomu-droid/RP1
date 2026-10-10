import React from 'react';
import {
  Search,
  BookOpen,
  Cpu,
  Layers,
  Sparkles,
  Github,
  Menu,
  X,
  TableProperties,
} from 'lucide-react';

interface Props {
  onOpenSearch: () => void;
  onOpenBlueprint: () => void;
  onOpenJointInspector: () => void;
  onSelectArticle: (id: string) => void;
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Header: React.FC<Props> = ({
  onOpenSearch,
  onOpenBlueprint,
  onOpenJointInspector,
  onSelectArticle,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Mobile Toggle + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => onSelectArticle('intro-overview')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#3578e5] flex items-center justify-center shadow-xs group-hover:bg-[#2d66c3] transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base tracking-tight font-sans">
                  Roboparty <span className="text-[#3578e5]">RP1</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-[#3578e5] border border-blue-200">
                  技术文档
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                Roboparty • 官方技术发布版
              </p>
            </div>
          </div>
        </div>

        {/* Center: Navigation shortcuts focused purely on RP1 */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectArticle('intro-overview')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-[#3578e5] hover:bg-slate-50 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#3578e5]" />
            <span>平台概述</span>
          </button>

          <button
            onClick={() => onSelectArticle('spec-models-compare')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-[#3578e5] hover:bg-slate-50 transition-colors"
          >
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span>版本规格对比</span>
          </button>

          <button
            onClick={() => onSelectArticle('spec-actuators-romomo')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-[#3578e5] hover:bg-slate-50 transition-colors"
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span>自研动力模组</span>
          </button>

          <button
            onClick={() => onSelectArticle('res-benchmark-table')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-[#3578e5] hover:bg-slate-50 transition-colors"
          >
            <TableProperties className="w-4 h-4 text-purple-600" />
            <span>行业对标总表</span>
          </button>

          <button
            onClick={onOpenBlueprint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50/80 border border-blue-200 text-[#3578e5] hover:bg-blue-100/80 transition-colors font-semibold"
          >
            <Github className="w-4 h-4 text-[#3578e5]" />
            <span>项目发布与配置导出</span>
          </button>
        </nav>

        {/* Right Actions: Search + GitHub */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all"
          >
            <Search className="w-3.5 h-3.5 text-[#3578e5]" />
            <span className="hidden md:inline">搜索技术文档，如模组、双电池、快充...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded text-slate-500 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/Roboparty/roboto_origin"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            title="查看官方 GitHub 开源仓库 roboto_origin"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
