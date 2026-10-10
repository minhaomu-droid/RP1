import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DocArticle } from './components/DocArticle';
import { TableOfContents } from './components/TableOfContents';
import { SearchModal } from './components/SearchModal';
import { JointInspectorModal } from './components/JointInspectorModal';
import { ArchitectureExportModal } from './components/ArchitectureExportModal';
import { getDocArticle } from './data/docContent';

export default function App() {
  const [currentArticleId, setCurrentArticleId] = useState<string>('intro-overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);
  const [isJointInspectorOpen, setIsJointInspectorOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  const currentArticle = getDocArticle(currentArticleId);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to section handler
  const handleScrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Article selection helper
  const handleSelectArticle = (id: string) => {
    setCurrentArticleId(id);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const article = getDocArticle(id);
    if (article.content.sections.length > 0) {
      setActiveSectionId(article.content.sections[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation Bar */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBlueprint={() => setIsBlueprintOpen(true)}
        onOpenJointInspector={() => setIsJointInspectorOpen(true)}
        onSelectArticle={handleSelectArticle}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Container */}
      <div className="flex-1 max-w-[1680px] w-full mx-auto flex">
        {/* Left Sidebar (Desktop) */}
        <div className="hidden lg:block w-72 shrink-0 border-r border-slate-200 sticky top-16 h-[calc(100vh-4rem)] bg-slate-50/80">
          <Sidebar
            currentArticleId={currentArticleId}
            onSelectArticle={handleSelectArticle}
          />
        </div>

        {/* Left Sidebar (Mobile Drawer) */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="relative w-80 max-w-[85vw] h-full bg-white border-r border-slate-200 shadow-2xl z-10 flex flex-col pt-4">
              <Sidebar
                currentArticleId={currentArticleId}
                onSelectArticle={handleSelectArticle}
              />
            </div>
          </div>
        )}

        {/* Center: Main Documentation Article */}
        <main className="flex-1 min-w-0 overflow-y-auto bg-white">
          <DocArticle
            article={currentArticle}
            onSelectArticle={handleSelectArticle}
            onOpenJointInspector={() => setIsJointInspectorOpen(true)}
            onOpenBlueprint={() => setIsBlueprintOpen(true)}
          />
        </main>

        {/* Right: Table of Contents & Quick Tools (Desktop) */}
        <div className="hidden xl:block w-64 shrink-0 px-4 py-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-white">
          <TableOfContents
            article={currentArticle}
            activeSectionId={activeSectionId}
            onScrollToSection={handleScrollToSection}
            onOpenJointInspector={() => setIsJointInspectorOpen(true)}
            onOpenBlueprint={() => setIsBlueprintOpen(true)}
          />
        </div>
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
      />

      <JointInspectorModal
        isOpen={isJointInspectorOpen}
        onClose={() => setIsJointInspectorOpen(false)}
      />

      <ArchitectureExportModal
        isOpen={isBlueprintOpen}
        onClose={() => setIsBlueprintOpen(false)}
      />
    </div>
  );
}
