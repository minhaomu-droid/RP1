export interface DocSection {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface ParameterRow {
  parameter: string;
  spec: string;
  unit?: string;
  notes?: string;
}

export interface CodeSnippet {
  language: string;
  filename?: string;
  code: string;
  description?: string;
}

export interface CalloutBlock {
  type: 'note' | 'tip' | 'info' | 'caution' | 'warning' | 'danger';
  title?: string;
  content: string;
}

export interface DocArticleData {
  id: string;
  category: string;
  title: string;
  titleEn: string;
  description: string;
  lastUpdated: string;
  version: string;
  readTime: string;
  tags: string[];
  content: {
    leadParagraph: string;
    callout?: CalloutBlock;
    sections: {
      id: string;
      title: string;
      lead?: string;
      paragraphs?: string[];
      callout?: CalloutBlock;
      table?: {
        headers: string[];
        rows: string[][];
        caption?: string;
      };
      codeSnippets?: CodeSnippet[];
      bulletPoints?: string[];
      featureCards?: {
        icon: string;
        title: string;
        description: string;
        badge?: string;
      }[];
    }[];
  };
}

export interface SidebarSubItem {
  id: string;
  title: string;
  titleEn: string;
  path: string;
  badge?: string;
  isNew?: boolean;
}

export interface SidebarCategory {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  items: SidebarSubItem[];
}
