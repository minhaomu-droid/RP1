import React from 'react';
import {
  AlignLeft,
  Share2,
  Check,
  ChevronRight,
  Cpu,
  FileCode,
} from 'lucide-react';
import { DocArticleData } from '../types/docs';

interface Props {
  article: DocArticleData;
  activeSectionId?: string;
  onScrollToSection: (sectionId: string) => void;
  onOpenJointInspector: () => void;
  onOpenBlueprint: () => void;
}

export const TableOfContents: React.FC<Props> = ({
  article,
  activeSectionId,
  onScrollToSection,
  onOpenJointInspector,
  onOpenBlueprint,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full text-xs text-slate-600 space-y-6 select-none">
      <div>
        <div className="flex items-center gap-1.5 text-slate-800 font-semibold mb-3 uppercase tracking-wider text-[11px]">
          <AlignLeft className="w-3.5 h-3.5 text-[#3578e5]" />
          <span>本页目录</span>
        </div>

        <nav className="space-y-1 border-l border-slate-200 pl-3">
          {article.content.sections.map((section) => {
            const isActive = activeSectionId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onScrollToSection(section.id)}
                className={`w-full text-left py-1 text-[11.5px] transition-colors block truncate ${
                  isActive
                    ? 'text-[#3578e5] font-semibold -ml-[13px] pl-3 border-l-2 border-[#3578e5]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {section.title}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Tools Box */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
        <span className="text-[10px] font-bold tracking-wider text-slate-500">
          快捷工程辅助工具
        </span>

        <button
          onClick={onOpenJointInspector}
          className="w-full flex items-center justify-between p-2 rounded-lg bg-white hover:bg-blue-50/60 border border-slate-200 text-slate-700 hover:text-[#3578e5] transition-colors text-[11px] shadow-2xs"
        >
          <span className="flex items-center gap-2 font-medium">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            关节与模组速查器
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={onOpenBlueprint}
          className="w-full flex items-center justify-between p-2 rounded-lg bg-white hover:bg-blue-50/60 border border-slate-200 text-slate-700 hover:text-[#3578e5] transition-colors text-[11px] shadow-2xs"
        >
          <span className="flex items-center gap-2 font-medium">
            <FileCode className="w-3.5 h-3.5 text-[#3578e5]" />
            项目发布与配置导出
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={handleCopyLink}
          className="w-full flex items-center justify-between p-2 rounded-lg bg-white hover:bg-blue-50/60 border border-slate-200 text-slate-700 hover:text-[#3578e5] transition-colors text-[11px] shadow-2xs"
        >
          <span className="flex items-center gap-2 font-medium">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#3578e5]" />}
            {copied ? '链接已复制' : '分享此文档页面'}
          </span>
        </button>
      </div>

      {/* Documentation Meta */}
      <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-200">
        <p>研发团队: Roboparty</p>
        <p>本体平台: RP1 人形机器人</p>
        <p>文档版本: v1.1 技术发布版</p>
      </div>
    </div>
  );
};
