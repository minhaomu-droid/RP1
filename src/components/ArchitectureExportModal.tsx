import React, { useState } from 'react';
import { X, Copy, Check, Download, FolderTree, Code2, BookOpen, Github, Terminal } from 'lucide-react';
import { NAVIGATION_DATA } from '../data/navigation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'github-guide' | 'github-action' | 'tree' | 'docusaurus' | 'readme'>('github-guide');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate GitHub README.md
  const readmeContent = `# RP1 人形机器人技术文档中心 - Roboparty

> **Roboparty RP1 人形机器人官方技术文档**  
> 基于《RP1 人形机器人技术报告》编纂整理。

[![GitHub Pages Deployment](https://github.com/Roboparty/roboto_origin/actions/workflows/deploy.yml/badge.svg)](https://github.com/Roboparty/roboto_origin)
[![开源协议](https://img.shields.io/badge/开源协议-Apache%202.0-blue.svg)](LICENSE)
[![机器人本体](https://img.shields.io/badge/机器人本体-RP1%20双足人形机器人-orange.svg)](#)

---

## 技术文档目录结构与指南

- **1. 平台概述**
  - \`docs/01-intro/overview.md\` - 开放本体概览与开源动机
  - \`docs/01-intro/philosophy.md\` - 构建理念与极速迭代准则
  - \`docs/01-intro/video-gallery.md\` - 运动与数采视频库，待官方统一上传
- **2. 规格参数**
  - \`docs/02-specs/models-compare.md\` - RP1 标准版与 RP1 Pro 参数横向对比
  - \`docs/02-specs/actuators-romomo.md\` - 自研萝博动力关节模组规格表，实测 160 牛·米以上
  - \`docs/02-specs/heads-and-hands.md\` - 四款模块化头部与 24伏 内走线灵巧手
  - \`docs/02-specs/hardware.md\` - 六大硬件层级与机械结构设计
  - \`docs/02-specs/electrical.md\` - 双电池热插拔与 140瓦 快充供电方案
  - \`docs/02-specs/software.md\` - 单板异构计算中枢与算力矩阵
- **3. 快速上手指南**
  - \`docs/03-quick-start/safety.md\` - 自主出箱与三路随身急停防护，安全必读
  - \`docs/03-quick-start/operation-guide.md\` - 开机运行与现场维保作业规程
  - \`docs/03-quick-start/remote-controller.md\` - 遥控器与多模态控制操作说明
- **4. 开发者指南**
  - \`docs/04-dev/networking.md\` - 外部调试接口与网络网段规划
  - \`docs/04-dev/ssh.md\` - 远程连接与系统插件化设计
  - \`docs/04-dev/debug-system.md\` - 七维时钟对齐调试日志体系
  - \`docs/04-dev/canfd-multitt.md\` - 五路独立通信总线与物理时延推导
  - \`docs/04-dev/control-stack.md\` - 四层系统控制栈架构解析
  - \`docs/04-dev/sim2real.md\` - 仿真到真实环境域随机化与标定
  - \`docs/04-dev/sim2sim.md\` - 跨物理仿真引擎比对与验证
- **5. 强化学习**
  - \`docs/05-rl/roboparty-train.md\` - 大规模并行强化学习训练框架
  - \`docs/05-rl/locomotion.md\` - 双足全向动态奔跑与越障步态
  - \`docs/05-rl/mimic.md\` - 全身动作模仿与轨迹跟踪框架
  - \`docs/05-rl/mujoco-lab.md\` - 轻量化快速验证仿真环境
- **6. 动作生成与重定向**
  - \`docs/06-motion/intact-jepa.md\` - 空间世界模型与长程因果推理
  - \`docs/06-motion/hhtools.md\` - 人体动捕动作快速重定向工具箱
  - \`docs/06-motion/xr-teleop.md\` - 空间计算闭环遥操作与力反馈
- **7. 模仿学习与具身智能**
  - \`docs/07-imitation/partyos-overview.md\` - 具身智能能力演进全景介绍
  - \`docs/07-imitation/bfm-matrix.md\` - 层次化行为基础模型矩阵
  - \`docs/07-imitation/factory-pipeline.md\` - 真实世界具身数采管线与数据资产
  - \`docs/07-imitation/wbi-benchmark.md\` - 全身智能基准测试与全身协同操作
- **8. 资源与持续改进**
  - \`docs/08-resources/open-source.md\` - 全栈开源代码与硬件工程资产
  - \`docs/08-resources/industry-benchmark.md\` - 行业做法横向对标收敛总表
  - \`docs/08-resources/release-notes.md\` - 技术发布报告版本演进记录
  - \`docs/08-resources/support.md\` - 后续规划与技术社区支持

---

## 本地运行指南

\`\`\`bash
# 1. 克隆文档仓库
git clone https://github.com/Roboparty/roboto_origin.git
cd roboto_origin

# 2. 安装依赖并启动
npm install
npm run dev
\`\`\`

---
版权所有 © 2026 Roboparty。遵循 Apache 2.0 开源协议。
`;

  // Generate GitHub Actions Workflow file (.github/workflows/deploy.yml)
  const githubActionContent = `# 自动部署 Roboparty RP1 机器人技术文档到 GitHub Pages
name: Deploy RP1 Documentation to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install Project Dependencies
        run: npm ci

      - name: Build Static Production Site
        run: npm run build

      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  // Markdown Folder Tree
  const markdownTree = `# Roboparty RP1 机器人完整技术文档结构树
# 目录规划基于现代开源机器人文档标准

rp1-docs/
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Actions 自动化部署流水线
├── docs/
${NAVIGATION_DATA.map((cat, idx) => {
  const catFolder = `0${idx + 1}-${cat.id}`;
  const files = cat.items
    .map((item) => `│   ├── ${item.id.replace(/^[a-z]+-/, '')}.md  # ${item.title}`)
    .join('\n');
  return `├── ${catFolder}/                     # ${cat.title}\n${files}`;
}).join('\n')}
├── static/
│   ├── img/
│   │   ├── rp1_hardware_layers.png  # 六层硬件架构图
│   │   ├── romomo_actuators.png     # 萝博动力关节模组爆炸图
│   │   └── battery_system.png       # 48V+30V 双电池拓扑图
│   └── models/
│       └── rp1.urdf                 # 官方标准 URDF 模型文件
├── docusaurus.config.js             # Docusaurus 站点配置文件
├── sidebars.js                      # 侧边栏完整拓扑
├── package.json
└── README.md
`;

  // Docusaurus Sidebar Configuration
  const docusaurusConfig = `// sidebars.js
// Roboparty RP1 机器人文档配置

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
${NAVIGATION_DATA.map((cat) => {
  return `    {
      type: 'category',
      label: '${cat.title}',
      collapsible: true,
      collapsed: false,
      items: [
${cat.items.map((item) => `        '${cat.id}/${item.id.replace(/^[a-z]+-/, '')}',`).join('\n')}
      ],
    },`;
}).join('\n')}
  ],
};

module.exports = sidebars;
`;

  // Step-by-Step GitHub Setup Guide
  const githubSetupGuide = `# 在您的 GitHub 上极速搭建 RP1 机器人技术文档页面

按照以下 3 步操作，即可将本套 RP1 技术文档完整部署到您的 GitHub 仓库并启用 GitHub Pages：

## 第一步：在 GitHub 上新建代码仓库

1. 打开浏览器登录 GitHub，点击右上角加号按钮，选择新建仓库。
2. 仓库名称可填写：\`rp1-docs\`。
3. 仓库可见性选择公开，点击创建仓库按钮。

## 第二步：将项目文件推送到您的 GitHub 仓库

在您的本地终端中执行以下命令：

\`\`\`bash
# 1. 初始化本地仓库
git init

# 2. 将此项目的全部源代码添加到暂存区
git add .

# 3. 提交初始版本
git commit -m "feat: initial commit for Roboparty RP1 docs"

# 4. 关联到您的 GitHub 远程仓库，请将用户名替换为您自己的账号
git remote add origin https://github.com/MinhaoMu/rp1-docs.git

# 5. 推送到主分支
git branch -M main
git push -u origin main
\`\`\`

## 第三步：在 GitHub 仓库中开启 GitHub Pages 自动化发布

1. 进入您的 GitHub 仓库页面，点击顶部的仓库设置选项卡。
2. 在左侧菜单栏中找到并点击 Pages 页面设置。
3. 在构建与部署的来源下拉菜单中，选择 GitHub Actions 部署。
4. 本项目已内置 \`.github/workflows/deploy.yml\` 配置文件。
5. 推送代码后，GitHub Actions 将自动执行打包构建，约 1 分钟后即可在线访问与分享与本站完全一致的 RP1 官方技术文档！
`;

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'github-guide':
        return githubSetupGuide;
      case 'github-action':
        return githubActionContent;
      case 'readme':
        return readmeContent;
      case 'tree':
        return markdownTree;
      case 'docusaurus':
        return docusaurusConfig;
      default:
        return readmeContent;
    }
  };

  const getCurrentFilename = () => {
    switch (activeTab) {
      case 'github-guide':
        return 'GITHUB_DEPLOY_GUIDE.md';
      case 'github-action':
        return 'deploy.yml';
      case 'readme':
        return 'README.md';
      case 'tree':
        return 'DOCUMENTATION_TREE.md';
      case 'docusaurus':
        return 'sidebars.js';
      default:
        return 'README.md';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([getCurrentContent()], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = getCurrentFilename();
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100/80 rounded-lg text-[#3578e5]">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">RP1 机器人 GitHub 发布与架构导出</h2>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-[#3578e5] font-semibold border border-blue-200">
                  Roboparty 官方标准
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                包含 GitHub Pages 极速建站指南、自动部署工作流、文档目录树及配置文件
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls Bar */}
        <div className="px-6 py-2.5 bg-slate-100/60 border-b border-slate-200 flex items-center justify-between overflow-x-auto text-xs">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('github-guide')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                activeTab === 'github-guide'
                  ? 'bg-[#3578e5] text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              GitHub 建站操作指南
            </button>
            <button
              onClick={() => setActiveTab('github-action')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                activeTab === 'github-action'
                  ? 'bg-[#3578e5] text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              GitHub Actions 工作流
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                activeTab === 'readme'
                  ? 'bg-[#3578e5] text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              仓库项目说明文档
            </button>
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                activeTab === 'tree'
                  ? 'bg-[#3578e5] text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              完整文档目录树
            </button>
            <button
              onClick={() => setActiveTab('docusaurus')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                activeTab === 'docusaurus'
                  ? 'bg-[#3578e5] text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              侧边栏配置文件
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制' : '复制内容'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3578e5] hover:bg-[#2d66c3] text-white text-xs font-medium transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下载文件</span>
            </button>
          </div>
        </div>

        {/* Code View Body - Friendly Light Background */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50 border-t border-slate-200">
          <pre className="font-mono text-xs text-slate-800 leading-relaxed whitespace-pre-wrap select-all">
            {getCurrentContent()}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>技术发布团队: Roboparty</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
