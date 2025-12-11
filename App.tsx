import React, { useState } from 'react';
import { SlideState } from './types';
import { Activity, Cpu, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { SensorDemo } from './components/SensorDemo';
import { SystemFlow } from './components/SystemFlow';
import { CareDashboard } from './components/CareDashboard';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<SlideState>(SlideState.SENSORS);

  const renderSlide = () => {
    switch (currentSlide) {
      case SlideState.SENSORS:
        return <SensorDemo />;
      case SlideState.SYSTEM:
        return <SystemFlow />;
      case SlideState.ASSISTIVE:
        return <CareDashboard />;
      default:
        return <SensorDemo />;
    }
  };

  const navItems = [
    { id: SlideState.SENSORS, label: '1. 可穿戴傳感器', icon: Activity },
    { id: SlideState.SYSTEM, label: '2. 系統架構', icon: Cpu },
    { id: SlideState.ASSISTIVE, label: '3. 輔助與隱私', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Cpu className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">NeuroMech Assist <span className="text-slate-400 font-normal text-sm ml-2">AD Prevention & Treatment</span></h1>
          </div>
          
          <nav className="hidden md:flex space-x-1 bg-slate-100 p-1 rounded-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSlide(item.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-2 ${
                  currentSlide === item.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          {/* Mobile Nav Controls */}
          <div className="md:hidden flex justify-between mb-4">
            <button 
              onClick={() => setCurrentSlide(SlideState.SENSORS)}
              disabled={currentSlide === SlideState.SENSORS}
              className="p-2 bg-white border rounded shadow-sm disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <span className="font-semibold text-slate-700 py-2">
              {navItems.find(n => n.id === currentSlide)?.label}
            </span>
            <button 
               onClick={() => setCurrentSlide(SlideState.ASSISTIVE)}
               disabled={currentSlide === SlideState.ASSISTIVE}
               className="p-2 bg-white border rounded shadow-sm disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="flex-grow bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative min-h-[600px]">
            {renderSlide()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 Mechanical Engineering Department - AD Research Group</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
