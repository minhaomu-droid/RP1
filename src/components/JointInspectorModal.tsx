import React, { useState } from 'react';
import { X, Cpu, Layers, Activity, ShieldCheck, Zap } from 'lucide-react';

interface JointData {
  id: string;
  name: string;
  category: 'Legs' | 'Arms' | 'Waist' | 'Head';
  actuator: string;
  nominalTorque: number;
  peakTorque: number;
  reduction: string;
  hollowShaft: string;
  range: string;
  bus: string;
  isProOnly?: boolean;
}

const JOINTS_LIST: JointData[] = [
  // 双腿 (12自由度)
  { id: 'hip_yaw_l', name: '左髋偏航关节', category: 'Legs', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-45° 至 +45°', bus: '双腿第一总线' },
  { id: 'hip_roll_l', name: '左髋侧滚关节', category: 'Legs', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-30° 至 +45°', bus: '双腿第一总线' },
  { id: 'hip_pitch_l', name: '左髋俯仰关节', category: 'Legs', actuator: '萝博动力 10062', nominalTorque: 44, peakTorque: 160, reduction: '22:1 双级行星', hollowShaft: '7.5 毫米', range: '-90° 至 +90°', bus: '双腿第一总线' },
  { id: 'knee_pitch_l', name: '左膝俯仰关节', category: 'Legs', actuator: '萝博动力 10062', nominalTorque: 44, peakTorque: 160, reduction: '22:1 双级行星', hollowShaft: '7.5 毫米', range: '0° 至 +135°', bus: '双腿第一总线' },
  { id: 'ankle_pitch_l', name: '左踝俯仰并联', category: 'Legs', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-45° 至 +45°', bus: '双腿第一总线' },
  { id: 'ankle_roll_l', name: '左踝侧滚并联', category: 'Legs', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-30° 至 +30°', bus: '双腿第一总线' },

  { id: 'hip_yaw_r', name: '右髋偏航关节', category: 'Legs', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-45° 至 +45°', bus: '双腿第一总线' },
  { id: 'hip_roll_r', name: '右髋侧滚关节', category: 'Legs', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-30° 至 +45°', bus: '双腿第一总线' },
  { id: 'hip_pitch_r', name: '右髋俯仰关节', category: 'Legs', actuator: '萝博动力 10062', nominalTorque: 44, peakTorque: 160, reduction: '22:1 双级行星', hollowShaft: '7.5 毫米', range: '-90° 至 +90°', bus: '双腿第一总线' },
  { id: 'knee_pitch_r', name: '右膝俯仰关节', category: 'Legs', actuator: '萝博动力 10062', nominalTorque: 44, peakTorque: 160, reduction: '22:1 双级行星', hollowShaft: '7.5 毫米', range: '0° 至 +135°', bus: '双腿第一总线' },
  { id: 'ankle_pitch_r', name: '右踝俯仰并联', category: 'Legs', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-45° 至 +45°', bus: '双腿第一总线' },
  { id: 'ankle_roll_r', name: '右踝侧滚并联', category: 'Legs', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-30° 至 +30°', bus: '双腿第一总线' },

  // 双臂 (标准版单臂5，Pro版单臂7)
  { id: 'shoulder_pitch_l', name: '左肩俯仰关节', category: 'Arms', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-180° 至 +60°', bus: '双臂第二总线' },
  { id: 'shoulder_roll_l', name: '左肩侧展关节', category: 'Arms', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-90° 至 +90°', bus: '双臂第二总线' },
  { id: 'shoulder_yaw_l', name: '左肩旋前关节', category: 'Arms', actuator: '萝博动力 6562', nominalTorque: 10, peakTorque: 34, reduction: '19.5:1 双级行星', hollowShaft: '4.5 毫米', range: '-90° 至 +90°', bus: '双臂第二总线' },
  { id: 'elbow_pitch_l', name: '左肘弯曲关节', category: 'Arms', actuator: '萝博动力 6562', nominalTorque: 10, peakTorque: 34, reduction: '19.5:1 双级行星', hollowShaft: '4.5 毫米', range: '-10° 至 +135°', bus: '双臂第二总线' },
  { id: 'wrist_yaw_l', name: '左腕偏航关节', category: 'Arms', actuator: '萝博动力 5553', nominalTorque: 10, peakTorque: 25, reduction: '36:1 行星', hollowShaft: '内走线', range: '-90° 至 +90°', bus: '双臂第二总线' },
  { id: 'wrist_pitch_l', name: '左腕俯仰关节', category: 'Arms', actuator: '萝博动力 5553', nominalTorque: 10, peakTorque: 25, reduction: '36:1 行星', hollowShaft: '内走线', range: '-90° 至 +90°', bus: '双臂第二总线', isProOnly: true },
  { id: 'wrist_roll_l', name: '左腕横滚关节', category: 'Arms', actuator: '萝博动力 5553', nominalTorque: 10, peakTorque: 25, reduction: '36:1 行星', hollowShaft: '内走线', range: '-90° 至 +90°', bus: '双臂第二总线', isProOnly: true },

  { id: 'shoulder_pitch_r', name: '右肩俯仰关节', category: 'Arms', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-180° 至 +60°', bus: '双臂第二总线' },
  { id: 'shoulder_roll_r', name: '右肩侧展关节', category: 'Arms', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-90° 至 +90°', bus: '双臂第二总线' },
  { id: 'shoulder_yaw_r', name: '右肩旋前关节', category: 'Arms', actuator: '萝博动力 6562', nominalTorque: 10, peakTorque: 34, reduction: '19.5:1 双级行星', hollowShaft: '4.5 毫米', range: '-90° 至 +90°', bus: '双臂第二总线' },
  { id: 'elbow_pitch_r', name: '右肘弯曲关节', category: 'Arms', actuator: '萝博动力 6562', nominalTorque: 10, peakTorque: 34, reduction: '19.5:1 双级行星', hollowShaft: '4.5 毫米', range: '-10° 至 +135°', bus: '双臂第二总线' },
  { id: 'wrist_yaw_r', name: '右腕偏航关节', category: 'Arms', actuator: '萝博动力 5553', nominalTorque: 10, peakTorque: 25, reduction: '36:1 行星', hollowShaft: '内走线', range: '-90° 至 +90°', bus: '双臂第二总线' },
  { id: 'wrist_pitch_r', name: '右腕俯仰关节', category: 'Arms', actuator: '萝博动力 5553', nominalTorque: 10, peakTorque: 25, reduction: '36:1 行星', hollowShaft: '内走线', range: '-90° 至 +90°', bus: '双臂第二总线', isProOnly: true },
  { id: 'wrist_roll_r', name: '右腕横滚关节', category: 'Arms', actuator: '萝博动力 5553', nominalTorque: 10, peakTorque: 25, reduction: '36:1 行星', hollowShaft: '内走线', range: '-90° 至 +90°', bus: '双臂第二总线', isProOnly: true },

  // 腰部与头部
  { id: 'waist_yaw', name: '腰部偏航关节', category: 'Waist', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-90° 至 +90°', bus: '腰颈第三总线' },
  { id: 'waist_pitch', name: '腰部俯仰关节', category: 'Waist', actuator: '萝博动力 8462', nominalTorque: 20, peakTorque: 60, reduction: '20:1 双级行星', hollowShaft: '4.5 毫米', range: '-30° 至 +45°', bus: '腰颈第三总线' },
  { id: 'head_yaw', name: '头部偏航关节', category: 'Head', actuator: '萝博动力 5553', nominalTorque: 10, peakTorque: 25, reduction: '36:1 行星', hollowShaft: '走线孔', range: '-60° 至 +60°', bus: '腰颈第三总线', isProOnly: true },
  { id: 'head_pitch', name: '头部俯仰关节', category: 'Head', actuator: '萝博动力 5553', nominalTorque: 10, peakTorque: 25, reduction: '36:1 行星', hollowShaft: '走线孔', range: '-30° 至 +45°', bus: '腰颈第三总线', isProOnly: true },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const JointInspectorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [modelType, setModelType] = useState<'Pro' | 'Standard'>('Pro');
  const [filter, setFilter] = useState<'All' | 'Legs' | 'Arms' | 'Waist' | 'Head'>('All');
  const [selectedJoint, setSelectedJoint] = useState<JointData>(JOINTS_LIST[3]);

  if (!isOpen) return null;

  const visibleJoints = JOINTS_LIST.filter((j) => {
    if (modelType === 'Standard' && j.isProOnly) return false;
    if (filter === 'All') return true;
    return j.category === filter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100/80 rounded-lg text-[#3578e5]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">RP1 关节与自研萝博动力模组速查表</h2>
                <div className="flex items-center bg-slate-200/70 rounded-lg p-0.5 text-[11px] border border-slate-300">
                  <button
                    onClick={() => setModelType('Pro')}
                    className={`px-2.5 py-0.5 rounded-md font-semibold transition-colors ${
                      modelType === 'Pro' ? 'bg-white text-[#3578e5] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    RP1 Pro 30自由度
                  </button>
                  <button
                    onClick={() => setModelType('Standard')}
                    className={`px-2.5 py-0.5 rounded-md font-semibold transition-colors ${
                      modelType === 'Standard' ? 'bg-white text-[#3578e5] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    标准版 24自由度
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                自研萝博动力模组，膝关节实测峰值扭矩 160 牛·米以上
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

        {/* Content split */}
        <div className="flex flex-1 overflow-hidden divide-x divide-slate-200">
          {/* Left: Joint List with category filters */}
          <div className="w-1/2 p-4 flex flex-col overflow-y-auto bg-slate-50/50">
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 mb-3 bg-white p-1 rounded-lg border border-slate-200 text-xs shadow-2xs">
              {(['All', 'Legs', 'Arms', 'Waist', 'Head'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                    filter === cat
                      ? 'bg-[#3578e5] text-white shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'All' ? `全部 (${visibleJoints.length})` : cat === 'Legs' ? '双腿 (12)' : cat === 'Arms' ? `双臂 (${modelType === 'Pro' ? 14 : 10})` : cat === 'Waist' ? '腰部 (2)' : `头部 (${modelType === 'Pro' ? 2 : 0})`}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-1.5 flex-1 pr-1 overflow-y-auto">
              {visibleJoints.map((joint) => (
                <div
                  key={joint.id}
                  onClick={() => setSelectedJoint(joint)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    selectedJoint.id === joint.id
                      ? 'bg-blue-50 border-blue-400 text-blue-950 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-slate-900 flex items-center gap-2">
                      <span>{joint.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-[#3578e5] font-medium">
                        {joint.actuator}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      关节编号: {joint.id} • 峰值力矩: {joint.peakTorque} 牛·米
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {joint.bus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detailed Joint Spec Card */}
          <div className="w-1/2 p-6 bg-white flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-bold text-[#3578e5] tracking-wider">
                    萝博动力模组详细技术参数
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedJoint.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    运动学模型编号: <span className="text-[#3578e5] font-mono font-medium">{selectedJoint.id}</span>
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-center">
                  <div className="text-2xl font-black text-[#3578e5]">
                    {selectedJoint.peakTorque}
                    <span className="text-xs font-normal text-slate-600 ml-1">牛·米</span>
                  </div>
                  <div className="text-[10px] text-slate-500">峰值实测扭矩</div>
                </div>
              </div>

              {/* Param Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 flex items-center gap-1.5 mb-1">
                    <Activity className="w-3.5 h-3.5 text-[#3578e5]" />
                    动力模组型号
                  </div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {selectedJoint.actuator}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">自研高扭矩密度模组</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 flex items-center gap-1.5 mb-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    额定连续力矩
                  </div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {selectedJoint.nominalTorque} 牛·米
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">48伏 额定电压持续工况</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 flex items-center gap-1.5 mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    减速机构与中空轴孔
                  </div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {selectedJoint.reduction}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">中空孔径: {selectedJoint.hollowShaft}</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-slate-500 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    机械活动行程极限
                  </div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {selectedJoint.range}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">法兰一体化机械硬限位</div>
                </div>
              </div>

              {/* URDF snippet - Friendly Light Code Box */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 shadow-2xs">
                <div className="text-[11px] text-slate-600 font-mono mb-2 flex justify-between border-b border-slate-200 pb-1.5">
                  <span>模型定义描述</span>
                  <span className="text-[#3578e5] font-medium">roboto_origin</span>
                </div>
                <pre className="text-[11px] font-mono text-slate-800 overflow-x-auto leading-relaxed select-all">
{`<joint name="${selectedJoint.id}" type="revolute">
  <parent link="..."/>
  <child link="..."/>
  <limit effort="${selectedJoint.peakTorque}" velocity="15.0"/>
  <safety_controller k_position="100.0" k_velocity="2.0"/>
</joint>`}
                </pre>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
              <span>总线配置: 5 路独立控制总线，500赫兹闭环</span>
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 bg-[#3578e5] hover:bg-[#2d66c3] text-white font-medium rounded-lg text-xs transition-colors shadow-2xs"
              >
                完成浏览
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
