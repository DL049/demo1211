import React, { useState } from 'react';
import { Eye, EyeOff, AlertOctagon, Heart, Mic, MapPin, Bell } from 'lucide-react';
import { PatientStatus } from '../types';

export const CareDashboard: React.FC = () => {
  const [privacyMode, setPrivacyMode] = useState(false);
  const [showFallAlert, setShowFallAlert] = useState(false);
  const [patientStatus] = useState<PatientStatus>({
    heartRate: 78,
    location: "台北市大安區基隆路四段43號",
    status: 'Normal',
    battery: 82
  });

  // Simulated AI Memory Summary
  const memorySummary = "今日摘要：早上9:00在公園散步20分鐘。11:30服用血壓藥。下午與孫子進行了視訊通話，情緒穩定。";

  return (
    <div className="h-full bg-slate-100 flex flex-col md:flex-row relative">
      
      {/* Fall Alert Modal Overlay */}
      {showFallAlert && (
        <div className="absolute inset-0 z-50 bg-red-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-l-8 border-red-600">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertOctagon className="w-8 h-8 text-red-600 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-red-600">偵測到跌倒事件！</h2>
            </div>
            <p className="text-slate-700 mb-6 font-medium">
              系統偵測到劇烈衝擊且隨後無活動跡象。
              已自動觸發緊急聯絡程序。
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowFallAlert(false)}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                立即聯絡救護車
              </button>
              <button 
                onClick={() => setShowFallAlert(false)}
                className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-bold hover:bg-slate-300 transition-colors"
              >
                誤報 (解除)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar / Controls */}
      <div className="w-full md:w-80 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 z-10">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">照護者儀表板</h2>
          <p className="text-xs text-slate-400">Caregiver Dashboard</p>
        </div>

        {/* Feature 1: Fall Detection Trigger */}
        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
          <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-3">
            <AlertOctagon size={18} />
            安全警示測試
          </h3>
          <button
            onClick={() => setShowFallAlert(true)}
            className="w-full py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm font-medium text-sm"
          >
            模擬「跌倒發生」
          </button>
        </div>

        {/* Feature 2: Privacy Toggle */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
            <EyeOff size={18} />
            隱私保護設置
          </h3>
          <p className="text-xs text-slate-500 mb-3 leading-relaxed">
            利用邊緣計算技術，數據在傳輸前進行加密與模糊化處理。
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">隱私模式</span>
            <button
              onClick={() => setPrivacyMode(!privacyMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                privacyMode ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`${
                  privacyMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Status Area */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        
        {/* Vitals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 text-slate-500">
                 <Heart className="text-rose-500" />
                 <span className="text-sm font-medium">心率監測</span>
               </div>
               <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Live</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {privacyMode ? '***' : patientStatus.heartRate} 
              <span className="text-base font-normal text-slate-400 ml-1">bpm</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 text-slate-500">
                 <MapPin className="text-blue-500" />
                 <span className="text-sm font-medium">即時位置</span>
               </div>
               <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">GPS</span>
            </div>
            <div className="text-lg font-medium text-slate-800 truncate">
              {privacyMode ? '位置已隱藏 (Privacy Protected)' : patientStatus.location}
            </div>
          </div>
        </div>

        {/* Feature 3: Memory Aid */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white flex items-center gap-3">
             <div className="p-2 bg-indigo-100 rounded-lg">
                <Mic className="text-indigo-600 w-5 h-5" />
             </div>
             <div>
               <h3 className="font-bold text-slate-800">AI 記憶輔助助手</h3>
               <p className="text-xs text-slate-500">基於對話與環境聲音的自動摘要 (類 PLAUD NotePIN 技術)</p>
             </div>
          </div>
          <div className="p-6">
             <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                   <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">AI Summary Generated</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                   {memorySummary}
                </p>
             </div>
             <div className="mt-4 flex gap-2">
               <button className="text-xs flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
                  <Bell size={12} /> 設定服藥提醒
               </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
