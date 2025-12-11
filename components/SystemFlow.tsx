import React, { useState, useEffect } from 'react';
import { Cpu, Database, Activity, Zap, ArrowRight, ArrowDown } from 'lucide-react';

export const SystemFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const startProcess = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setActiveStep(0);
  };

  useEffect(() => {
    if (!isProcessing) return;

    // Sequence animation
    const timeouts = [
      setTimeout(() => setActiveStep(1), 1000), // Step 1: Input to Computing
      setTimeout(() => setActiveStep(2), 2500), // Step 2: Computing to AI
      setTimeout(() => setActiveStep(3), 4000), // Step 3: Feedback
      setTimeout(() => {
        setIsProcessing(false);
        setActiveStep(0);
      }, 5500)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [isProcessing]);

  // Helper to render connection lines
  const Connector = ({ vertical = false, active = false }) => (
    <div className={`flex items-center justify-center transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-20'}`}>
      {vertical ? (
        <ArrowDown className={`w-6 h-6 text-blue-500 ${active ? 'animate-bounce' : ''}`} />
      ) : (
        <ArrowRight className={`w-6 h-6 text-blue-500 ${active ? 'animate-pulse' : ''}`} />
      )}
    </div>
  );

  return (
    <div className="h-full p-6 flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800">生活能力輔助系統架構</h2>
        <p className="text-slate-500 mt-2">
          從數據採集到主動干預的閉環控制系統 (Closed-Loop Control)
        </p>
        <button
          onClick={startProcess}
          disabled={isProcessing}
          className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-full font-semibold shadow-lg transition-all transform active:scale-95"
        >
          {isProcessing ? '系統運行中...' : '啟動模擬流程'}
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center relative">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
          
          {/* STEP 1: SENSORS */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className={`w-full p-6 rounded-xl border-2 transition-all duration-500 ${activeStep >= 0 && isProcessing ? 'border-blue-500 bg-blue-50 shadow-blue-200 shadow-lg scale-105' : 'border-slate-200 bg-white'}`}>
              <div className="flex justify-center mb-3">
                <Activity className={`w-10 h-10 ${activeStep >= 0 && isProcessing ? 'text-blue-600' : 'text-slate-400'}`} />
              </div>
              <h3 className="font-bold text-center text-slate-700">數據採集層</h3>
              <ul className="text-xs text-slate-500 mt-2 list-disc list-inside">
                <li>IMU (慣性測量單元)</li>
                <li>EMG (肌電訊號)</li>
                <li>GPS 定位</li>
              </ul>
            </div>
            <div className="h-8 flex items-center">
                 <div className={`text-xs font-mono text-blue-600 transition-opacity ${activeStep === 0 && isProcessing ? 'opacity-100' : 'opacity-0'}`}>Sending Raw Data...</div>
            </div>
          </div>

          {/* ARROW 1 */}
          <div className="flex justify-center md:col-span-1">
             <Connector active={activeStep >= 1 && isProcessing} />
          </div>

          {/* STEP 2: PROCESSING & AI */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className={`w-full p-6 rounded-xl border-2 transition-all duration-500 ${activeStep >= 1 && isProcessing ? 'border-purple-500 bg-purple-50 shadow-purple-200 shadow-lg scale-105' : 'border-slate-200 bg-white'}`}>
              <div className="flex justify-center mb-3">
                 <div className="relative">
                    <Cpu className={`w-10 h-10 ${activeStep >= 1 && isProcessing ? 'text-purple-600' : 'text-slate-400'}`} />
                    {activeStep === 1 && isProcessing && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                      </span>
                    )}
                 </div>
              </div>
              <h3 className="font-bold text-center text-slate-700">核心計算層</h3>
              <div className="mt-2 space-y-1">
                 <div className={`text-xs p-1 rounded text-center transition-colors ${activeStep >= 1 && isProcessing ? 'bg-purple-200 text-purple-800' : 'bg-slate-100 text-slate-400'}`}>數據預處理</div>
                 <div className={`text-xs p-1 rounded text-center transition-colors ${activeStep >= 2 && isProcessing ? 'bg-purple-200 text-purple-800 font-bold' : 'bg-slate-100 text-slate-400'}`}>AI/神經網絡 (預測)</div>
                 <div className={`text-xs p-1 rounded text-center transition-colors ${activeStep >= 2 && isProcessing ? 'bg-purple-200 text-purple-800' : 'bg-slate-100 text-slate-400'}`}>決策生成</div>
              </div>
            </div>
            <div className="h-8 flex items-center">
                 <div className={`text-xs font-mono text-purple-600 transition-opacity ${activeStep === 2 && isProcessing ? 'opacity-100' : 'opacity-0'}`}>Generating Strategy...</div>
            </div>
          </div>

          {/* ARROW 2 */}
          <div className="flex justify-center md:col-span-1">
             <Connector active={activeStep >= 3 && isProcessing} />
          </div>

          {/* STEP 3: FEEDBACK */}
          <div className="md:col-span-1 flex flex-col items-center">
            <div className={`w-full p-6 rounded-xl border-2 transition-all duration-500 ${activeStep >= 3 && isProcessing ? 'border-emerald-500 bg-emerald-50 shadow-emerald-200 shadow-lg scale-105' : 'border-slate-200 bg-white'}`}>
              <div className="flex justify-center mb-3">
                <Zap className={`w-10 h-10 ${activeStep >= 3 && isProcessing ? 'text-emerald-600 fill-current' : 'text-slate-400'}`} />
              </div>
              <h3 className="font-bold text-center text-slate-700">反饋與干預</h3>
              <ul className="text-xs text-slate-500 mt-2 list-disc list-inside">
                <li>微電機震動</li>
                <li>語音提示</li>
                <li>警報發送</li>
              </ul>
            </div>
            <div className="h-8 flex items-center">
                 <div className={`text-xs font-mono text-emerald-600 transition-opacity ${activeStep === 3 && isProcessing ? 'opacity-100' : 'opacity-0'}`}>Action Executed</div>
            </div>
          </div>

        </div>

        {/* FEEDBACK LOOP VISUALIZATION */}
        {isProcessing && activeStep === 3 && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-3/4 border-b-2 border-dashed border-slate-300 h-10 rounded-b-3xl border-l-2 border-r-2 flex justify-center items-end pb-2 opacity-50">
               <span className="text-xs text-slate-400 bg-slate-50 px-2">生活能力反饋 (Loop)</span>
            </div>
        )}

      </div>
    </div>
  );
};
