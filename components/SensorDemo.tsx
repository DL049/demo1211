import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, Pause, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { GaitDataPoint } from '../types';

export const SensorDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mode, setMode] = useState<'HEALTHY' | 'RISK'>('HEALTHY');
  const [data, setData] = useState<GaitDataPoint[]>([]);
  const intervalRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  // Generate mock data based on mode
  const generateData = () => {
    timeRef.current += 1;
    const t = timeRef.current;
    
    let acc, gyro;

    if (mode === 'HEALTHY') {
      // Regular, rhythmic pattern
      acc = Math.sin(t * 0.2) * 5 + (Math.random() - 0.5);
      gyro = Math.cos(t * 0.2) * 3 + (Math.random() - 0.5);
    } else {
      // Irregular, slower pattern (At Risk)
      // Lower frequency, more noise, occasional spikes (stumbling)
      const stumble = Math.random() > 0.9 ? 5 : 0;
      acc = Math.sin(t * 0.1) * 3 + (Math.random() * 2 - 1) + stumble;
      gyro = Math.cos(t * 0.15) * 2 + (Math.random() * 2 - 1);
    }

    return {
      time: t,
      acceleration: parseFloat(acc.toFixed(2)),
      gyroscope: parseFloat(gyro.toFixed(2)),
    };
  };

  useEffect(() => {
    // Fill initial buffer
    const initialData: GaitDataPoint[] = [];
    for(let i=0; i<50; i++) {
        timeRef.current = i;
        initialData.push({ time: i, acceleration: 0, gyroscope: 0 });
    }
    setData(initialData);

    return () => stopSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setData(prev => {
          const newData = [...prev.slice(1), generateData()];
          return newData;
        });
      }, 50);
    } else {
      stopSimulation();
    }
    return () => stopSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, mode]);

  const stopSimulation = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Activity className="text-blue-600" />
            可穿戴傳感器與步態分析
          </h2>
          <p className="text-slate-500 mt-2 max-w-2xl">
            實時監測加速度計與陀螺儀數據。阿茲海默症(AD)早期患者常表現出步頻變慢、步長不均等特徵。
            機械系利用這些微小變化建立早期預警模型。
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('HEALTHY')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              mode === 'HEALTHY' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            健康步態
          </button>
          <button
            onClick={() => setMode('RISK')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              mode === 'RISK' ? 'bg-orange-100 text-orange-700 border border-orange-300' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            異常步態 (AD風險)
          </button>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        
        {/* Chart */}
        <div className="lg:col-span-2 bg-slate-50 rounded-xl border border-slate-200 p-4 shadow-inner relative flex flex-col">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-white rounded-full shadow border hover:bg-slate-50 text-slate-700"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">傳感器原始數據流 (Raw Data)</h3>
          <div className="flex-grow min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" hide />
                <YAxis domain={[-10, 10]} hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  labelStyle={{ display: 'none' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="acceleration" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={false} 
                  name="加速度 (Accel)"
                />
                <Line 
                  type="monotone" 
                  dataKey="gyroscope" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={false}
                  name="角速度 (Gyro)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex gap-4 justify-center text-xs text-slate-500">
            <span className="flex items-center gap-1"><div className="w-3 h-1 bg-blue-500 rounded-full"></div> 加速度 (垂直)</span>
            <span className="flex items-center gap-1"><div className="w-3 h-1 bg-purple-500 rounded-full"></div> 角速度 (旋轉)</span>
          </div>
        </div>

        {/* Real-time Analysis Panel */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
           <div>
             <h3 className="font-bold text-slate-800 mb-6 pb-2 border-b">智能算法分析結果</h3>
             
             <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">步態規律性 (Regularity)</span>
                    <span className={`font-mono font-bold ${mode === 'HEALTHY' ? 'text-emerald-600' : 'text-orange-600'}`}>
                      {mode === 'HEALTHY' ? '98%' : '64%'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${mode === 'HEALTHY' ? 'bg-emerald-500 w-[98%]' : 'bg-orange-500 w-[64%]'}`}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">平均步速 (Stride Speed)</span>
                    <span className={`font-mono font-bold ${mode === 'HEALTHY' ? 'text-emerald-600' : 'text-orange-600'}`}>
                      {mode === 'HEALTHY' ? '1.2 m/s' : '0.8 m/s'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${mode === 'HEALTHY' ? 'bg-blue-500 w-[80%]' : 'bg-orange-400 w-[40%]'}`}
                    ></div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg mt-8 flex items-start gap-3 ${
                  mode === 'HEALTHY' 
                    ? 'bg-emerald-50 border border-emerald-100' 
                    : 'bg-red-50 border border-red-100'
                }`}>
                  {mode === 'HEALTHY' ? (
                    <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={`font-bold text-sm ${mode === 'HEALTHY' ? 'text-emerald-800' : 'text-red-800'}`}>
                      {mode === 'HEALTHY' ? '風險評估：低' : '風險評估：高 (檢測到異常)'}
                    </h4>
                    <p className={`text-xs mt-1 ${mode === 'HEALTHY' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {mode === 'HEALTHY' 
                        ? '步態動力學參數在正常範圍內。' 
                        : '檢測到步幅變異性增加。建議進行進一步臨床認知篩查。'}
                    </p>
                  </div>
                </div>
             </div>
           </div>
           
           <div className="mt-4 pt-4 border-t border-slate-100">
             <div className="text-xs text-slate-400 font-mono">
               MODEL: AD-GaitNet-v2.4<br/>
               LATENCY: 45ms
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};
