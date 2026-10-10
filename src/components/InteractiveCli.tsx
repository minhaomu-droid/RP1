import React, { useState } from 'react';
import { Terminal, Play, Copy, Check } from 'lucide-react';

interface CommandPreset {
  cmd: string;
  output: string;
  desc: string;
}

const PRESET_COMMANDS: CommandPreset[] = [
  {
    cmd: 'rp1ctl scan',
    desc: '扫描全机自研萝博动力关节模组通信状态与固件',
    output: `[RP1 SCAN] 扫描第一总线（双腿）与第二总线（双臂及腰颈）...
  编号 01: [左髋偏航]     萝博动力 8462  (固件版本 v1.4.2) [正常]  温度: 34.2℃  母线: 48.2伏  时延: 0.21毫秒
  编号 02: [左髋侧滚]     萝博动力 8462  (固件版本 v1.4.2) [正常]  温度: 33.8℃  母线: 48.2伏  时延: 0.19毫秒
  编号 03: [左髋俯仰]     萝博动力 10062 (固件版本 v1.4.2) [正常]  温度: 35.1℃  母线: 48.1伏  时延: 0.22毫秒
  编号 04: [左膝俯仰]     萝博动力 10062 (固件版本 v1.4.2) [正常]  温度: 36.4℃  母线: 48.1伏  时延: 0.20毫秒
  编号 05: [左踝俯仰并联] 萝博动力 8462  (固件版本 v1.4.2) [正常]  温度: 32.7℃  母线: 48.2伏  时延: 0.24毫秒
  编号 06: [左踝侧滚并联] 萝博动力 8462  (固件版本 v1.4.2) [正常]  温度: 31.9℃  母线: 48.2伏  时延: 0.18毫秒
  ...
  编号 24: [头部俯仰]     萝博动力 5553  (固件版本 v1.4.2) [正常]  温度: 30.5℃  母线: 48.3伏  时延: 0.15毫秒
=============================================================================
[自检成功] 所有关节执行器在线。双向数据帧率正常，零丢包。`,
  },
  {
    cmd: 'rp1ctl doctor',
    desc: '执行整机软硬件综合健康诊断（电源、微控制器、急停回路）',
    output: `[RP1 DOCTOR] 正在执行系统底层综合健康检查...
  [+] 单板异构计算核心      : 状态正常（8核心在线，实时补丁生效）
  [+] 480兆赫兹 实时微控制器 : 状态正常（硬实时纳秒级急停回路就绪）
  [+] 大小双电池供电管理    : 状态正常（主电 51.2伏，备用电池在线支持热插拔）
  [+] 三路随身急停系统      : 状态正常（随身挂绳式控制器已配对在线）
  [+] 躯干高精度姿态测量    : 状态正常（滤波刷新率 500赫兹）
  [+] 模组温升与热沉保护    : 状态正常（最高模组温度 36.4℃，远低于安全阈值）
=============================================================================
诊断结果：整机系统健康，随时可执行出箱与站立指令。`,
  },
  {
    cmd: 'rp1ctl motor mode --all --mode damping',
    desc: '将全机关节切入安全阻尼模式（便于手动扳动调试）',
    output: `[RP1 ACTUATOR] 正在向全机关节广播模式切换指令：阻尼安全模式
  -> 刚度系数设为 0，阻尼系数设为 2.5...
  [指令生效] 全机关节已切换至安全阻尼模式。
  [系统提示] 机器人各肢体目前可徒手轻柔扳动，关节实时位置反馈保持高频更新。`,
  },
];

export const InteractiveCli: React.FC = () => {
  const [activePreset, setActivePreset] = useState<CommandPreset>(PRESET_COMMANDS[0]);
  const [copied, setCopied] = useState(false);

  const handleRun = (preset: CommandPreset) => {
    setActivePreset(preset);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activePreset.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs text-slate-800">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          <span className="ml-2 text-xs font-medium text-slate-700 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#3578e5]" />
            RP1 交互式终端仿真器
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs"
            title="复制代码"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '已复制' : '复制命令'}</span>
          </button>
        </div>
      </div>

      {/* Preset Command Buttons */}
      <div className="p-3 bg-slate-50/70 border-b border-slate-200 flex flex-wrap gap-2 text-xs">
        <span className="text-slate-500 py-1 font-medium">快捷运行预设指令:</span>
        {PRESET_COMMANDS.map((preset) => (
          <button
            key={preset.cmd}
            onClick={() => handleRun(preset)}
            className={`px-2.5 py-1 rounded-md font-mono transition-all flex items-center gap-1 text-xs ${
              activePreset.cmd === preset.cmd
                ? 'bg-[#3578e5] text-white font-semibold shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Play className="w-3 h-3" />
            {preset.cmd}
          </button>
        ))}
      </div>

      {/* Terminal View - Friendly Soft Modern Slate */}
      <div className="p-4 font-mono text-xs overflow-x-auto bg-[#1e293b] text-slate-100 leading-relaxed border-t border-slate-800">
        <div className="text-slate-400 mb-2">
          # 说明: {activePreset.desc}
        </div>
        <div className="flex items-center text-emerald-400 font-semibold mb-3">
          <span className="text-sky-400 mr-2">rp1@roboparty:~$</span>
          <span>{activePreset.cmd}</span>
        </div>
        <pre className="text-slate-200 whitespace-pre-wrap font-mono select-all">
          {activePreset.output}
        </pre>
      </div>

      <div className="px-4 py-2.5 bg-slate-50 text-slate-500 text-[11px] flex justify-between items-center border-t border-slate-200">
        <span>仿真环境：Roboparty RP1 实时控制内核，500赫兹闭环控制</span>
        <span>提示：点击上方按钮即可切换输出结果</span>
      </div>
    </div>
  );
};
