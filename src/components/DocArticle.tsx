import React, { useState } from 'react';
import {
  ChevronRight,
  Clock,
  Calendar,
  Copy,
  Check,
  Info,
  AlertTriangle,
  Flame,
  Lightbulb,
  CheckCircle2,
  Terminal,
  Cpu,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Download,
  Video,
} from 'lucide-react';
import { DocArticleData, CalloutBlock } from '../types/docs';
import { InteractiveCli } from './InteractiveCli';
import { NAVIGATION_DATA } from '../data/navigation';

interface Props {
  article: DocArticleData;
  onSelectArticle: (id: string) => void;
  onOpenJointInspector: () => void;
  onOpenBlueprint: () => void;
}

export const DocArticle: React.FC<Props> = ({
  article,
  onSelectArticle,
  onOpenJointInspector,
  onOpenBlueprint,
}) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  // Copy code snippet
  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Find previous and next articles in the navigation tree
  const allNavItems = NAVIGATION_DATA.flatMap((cat) => cat.items);
  const currentIndex = allNavItems.findIndex((item) => item.id === article.id);
  const prevItem = currentIndex > 0 ? allNavItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < allNavItems.length - 1 ? allNavItems[currentIndex + 1] : null;

  // Render Callout block with clean border-l-4 style
  const renderCallout = (callout: CalloutBlock) => {
    const config = {
      note: {
        bg: 'bg-blue-50/70',
        border: 'border-slate-200 border-l-4 border-l-[#3578e5]',
        text: 'text-slate-700',
        titleColor: 'text-[#3578e5]',
        icon: <Info className="w-5 h-5 text-[#3578e5] shrink-0" />,
        defaultTitle: '提示说明',
      },
      tip: {
        bg: 'bg-emerald-50/70',
        border: 'border-slate-200 border-l-4 border-l-emerald-500',
        text: 'text-slate-700',
        titleColor: 'text-emerald-700',
        icon: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0" />,
        defaultTitle: '建议与技巧',
      },
      info: {
        bg: 'bg-cyan-50/70',
        border: 'border-slate-200 border-l-4 border-l-cyan-500',
        text: 'text-slate-700',
        titleColor: 'text-cyan-700',
        icon: <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0" />,
        defaultTitle: '参考信息',
      },
      caution: {
        bg: 'bg-amber-50/70',
        border: 'border-slate-200 border-l-4 border-l-amber-500',
        text: 'text-slate-700',
        titleColor: 'text-amber-800',
        icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
        defaultTitle: '注意说明',
      },
      warning: {
        bg: 'bg-amber-50/70',
        border: 'border-slate-200 border-l-4 border-l-amber-500',
        text: 'text-slate-700',
        titleColor: 'text-amber-800',
        icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
        defaultTitle: '安全警告',
      },
      danger: {
        bg: 'bg-rose-50/70',
        border: 'border-slate-200 border-l-4 border-l-rose-500',
        text: 'text-slate-700',
        titleColor: 'text-rose-800',
        icon: <Flame className="w-5 h-5 text-rose-600 shrink-0" />,
        defaultTitle: '危险警示',
      },
    }[callout.type] || {
      bg: 'bg-slate-50',
      border: 'border-slate-200 border-l-4 border-l-[#3578e5]',
      text: 'text-slate-700',
      titleColor: 'text-[#3578e5]',
      icon: <Info className="w-5 h-5 text-[#3578e5]" />,
      defaultTitle: '说明',
    };

    return (
      <div
        className={`my-5 p-4 rounded-r-xl border ${config.border} ${config.bg} shadow-2xs flex items-start gap-3`}
      >
        {config.icon}
        <div className="flex-1 text-xs leading-relaxed">
          <div className={`font-bold ${config.titleColor} mb-1 text-sm`}>
            {callout.title || config.defaultTitle}
          </div>
          <p className={`${config.text} whitespace-pre-line leading-relaxed`}>{callout.content}</p>
        </div>
      </div>
    );
  };

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 sm:px-8 text-slate-800 font-sans leading-relaxed">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-slate-500 mb-6 font-medium">
        <span
          onClick={() => onSelectArticle('intro-overview')}
          className="hover:text-[#3578e5] cursor-pointer transition-colors"
        >
          Roboparty RP1
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-500">{article.category}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#3578e5] font-semibold truncate">{article.title}</span>
      </nav>

      {/* Header section */}
      <header className="pb-6 border-b border-slate-200 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#3578e5] border border-blue-200">
            {article.version}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            更新日期: {article.lastUpdated}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
          {article.title}
        </h1>

        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {article.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Lead paragraph */}
      {article.content.leadParagraph && (
        <div className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
          {article.content.leadParagraph}
        </div>
      )}

      {/* Dedicated Video Section: Clean empty state placeholder without fabrication */}
      {article.id === 'intro-video-gallery' && (
        <div className="my-6 p-6 rounded-2xl bg-slate-50/80 border border-dashed border-slate-300 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-100/70 text-[#3578e5] flex items-center justify-center mx-auto mb-3">
            <Video className="w-6 h-6" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-semibold mb-2">
            <span>官方视频制作中 • 待正式发布</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            实机运动演示与数采视频播放窗口
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
            为遵循实事求是原则，本站不填充任何第三方无关视频或虚构模拟。包括双足全向奔跑、航空箱自主出箱及空间计算双臂遥操作在内的实机视频正在后期剪辑中，敬请期待官方发布。
          </p>
        </div>
      )}

      {/* Article Level Callout */}
      {article.content.callout && renderCallout(article.content.callout)}

      {/* Specialized Hero Banner for Architecture & Roadmap */}
      {article.id === 'intro-overview' && (
        <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-slate-50 to-white border border-blue-200 shadow-2xs">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-[#3578e5] text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#3578e5]" />
                <span>全栈开源开放本体</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Roboparty RP1 人形机器人技术发布体系
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                已为您规划好从平台概述、规格参数、快速上手、开发者指南到强化学习与具身智能的全套体系。点击右侧按钮可直接获取项目代码与 GitHub Pages 部署脚本。
              </p>
            </div>
            <button
              onClick={onOpenBlueprint}
              className="shrink-0 px-4 py-2 bg-[#3578e5] hover:bg-[#2d66c3] text-white rounded-xl text-xs font-semibold shadow-2xs transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>获取部署配置</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive CLI simulator on specific operational guides */}
      {(article.id === 'intro-overview' ||
        article.id === 'quick-operation-guide' ||
        article.id === 'dev-rp1ctl') && (
        <div className="my-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#3578e5]" />
              <span>RP1 交互式终端仿真器</span>
            </h3>
            <span className="text-[11px] text-slate-500">点击运行预设指令</span>
          </div>
          <InteractiveCli />
        </div>
      )}

      {/* Interactive Joint Inspector banner on hardware specs */}
      {(article.id === 'spec-hardware' ||
        article.id === 'spec-models-compare' ||
        article.id === 'spec-actuators-romomo') && (
        <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-100/80 text-[#3578e5]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">关节与自研萝博动力模组速查器</h4>
              <p className="text-xs text-slate-600">
                支持查看标准版 24自由度 与 Pro版 30自由度模组扭矩（膝关节实测峰值 160+ 牛·米）、减速比与中空孔径。
              </p>
            </div>
          </div>
          <button
            onClick={onOpenJointInspector}
            className="px-3.5 py-1.5 bg-[#3578e5] hover:bg-[#2d66c3] text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs"
          >
            打开速查器
          </button>
        </div>
      )}

      {/* Sections rendering */}
      <div className="space-y-10 mt-8">
        {article.content.sections.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5 pb-2 border-b border-slate-200">
              <span className="w-1.5 h-5 rounded-full bg-[#3578e5]"></span>
              <span>{sec.title}</span>
            </h2>

            {sec.lead && (
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {sec.lead}
              </p>
            )}

            {/* Paragraphs with special styling for [待补充] */}
            {sec.paragraphs && (
              <div className="space-y-3">
                {sec.paragraphs.map((p, pIdx) => {
                  const isPending = p.includes('[待补充') || p.includes('[待补充:');
                  if (isPending) {
                    return (
                      <div
                        key={pIdx}
                        className="p-3.5 rounded-xl bg-amber-50/70 border border-dashed border-amber-300 text-amber-900 text-xs flex items-center gap-2 shadow-2xs"
                      >
                        <span className="px-2 py-0.5 rounded bg-amber-200/80 text-amber-900 font-bold text-[10px]">
                          待补充
                        </span>
                        <span className="leading-relaxed font-medium">
                          {p.replace(/\[待补充:?\s*/, '').replace(/\]$/, '')}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {p}
                    </p>
                  );
                })}
              </div>
            )}

            {/* Section callout */}
            {sec.callout && renderCallout(sec.callout)}

            {/* Feature Cards Grid */}
            {sec.featureCards && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                {sec.featureCards.map((card, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-2xs transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#3578e5] transition-colors">
                        {card.title}
                      </h4>
                      {card.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-blue-50 text-[#3578e5] border border-blue-200">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Bullet Points */}
            {sec.bulletPoints && (
              <ul className="space-y-2 my-3 text-xs sm:text-sm text-slate-700">
                {sec.bulletPoints.map((point, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3578e5] mt-2 shrink-0"></span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Table */}
            {sec.table && (
              <div className="my-5 rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
                      <tr>
                        {sec.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="px-4 py-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-slate-50/80 transition-colors odd:bg-white even:bg-slate-50/40"
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-4 py-3 ${
                                cIdx === 0 ? 'font-semibold text-slate-900' : ''
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {sec.table.caption && (
                  <div className="px-4 py-2 bg-slate-50 text-[11px] text-slate-500 italic border-t border-slate-200">
                    {sec.table.caption}
                  </div>
                )}
              </div>
            )}

            {/* Code Snippets - Clean, Friendly Light Style */}
            {sec.codeSnippets && (
              <div className="space-y-4 my-4">
                {sec.codeSnippets.map((snippet, snIdx) => {
                  const snippetId = `${sec.id}-${snIdx}`;
                  const isCopied = copiedCodeIndex === snippetId;

                  return (
                    <div
                      key={snIdx}
                      className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/70 shadow-2xs text-xs"
                    >
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
                        <div className="flex items-center gap-2 font-mono text-slate-700 font-medium">
                          <Terminal className="w-3.5 h-3.5 text-[#3578e5]" />
                          <span>{snippet.filename || snippet.language}</span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(snippet.code, snippetId)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-sans transition-colors border border-slate-200 shadow-2xs"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{isCopied ? '已复制' : '复制代码'}</span>
                        </button>
                      </div>

                      <pre className="p-4 overflow-x-auto text-slate-800 font-mono text-xs leading-relaxed select-all bg-white">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Pagination Footer: Prev & Next Articles */}
      <footer className="mt-16 pt-8 border-t border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevItem ? (
            <div
              onClick={() => onSelectArticle(prevItem.id)}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-2xs cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 group-hover:text-[#3578e5] transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>上一篇</span>
              </div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-[#3578e5] truncate">
                {prevItem.title}
              </div>
            </div>
          ) : (
            <div></div>
          )}

          {nextItem ? (
            <div
              onClick={() => onSelectArticle(nextItem.id)}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-2xs cursor-pointer transition-all group text-right"
            >
              <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500 mb-1 group-hover:text-[#3578e5] transition-colors">
                <span>下一篇</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-[#3578e5] truncate">
                {nextItem.title}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </footer>
    </article>
  );
};
