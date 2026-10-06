import { useState } from 'react';
import { WiringMasterHeader } from './components/WiringMasterHeader';
import { PowerGroundSection } from './components/PowerGroundSection';
import { PinoutMatrixSection } from './components/PinoutMatrixSection';
import { SensorsDirectorySection } from './components/SensorsDirectorySection';
import { AssembliesSection } from './components/AssembliesSection';
import { FuseBoxSection } from './components/FuseBoxSection';
import { InteriorSymbolsSection } from './components/InteriorSymbolsSection';
import { DashboardLightsSection } from './components/DashboardLightsSection';
import { ManualResetSection } from './components/ManualResetSection';
import { JdmScreenTranslatorSection } from './components/JdmScreenTranslatorSection';
import { DtcMasterSection } from './components/DtcMasterSection';
import { SensorTesterWorkbench } from './components/SensorTesterWorkbench';
import { CarAcMasterSection } from './components/CarAcMasterSection';
import { BoltTorqueExplainer } from './components/BoltTorqueExplainer';
import { CumminsTimingGuide } from './components/CumminsTimingGuide';
import { ScaniaInjectorTiming } from './components/ScaniaInjectorTiming';
import { FloatingZoomWidget } from './components/FloatingZoomWidget';
import { PhoneInstallModal } from './components/PhoneInstallModal';
import { SystemCategory } from './types/wiring';
import { Smartphone, ShieldCheck, Heart, Sparkles, Wrench, ChevronDown, ChevronUp, Zap, Snowflake } from 'lucide-react';
import { playChime } from './utils/audio';

export default function App() {
  const [mainAppMode, setMainAppMode] = useState<'wiring' | 'car_ac'>('wiring');
  const [currentCategory, setCurrentCategory] = useState<SystemCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [showMechanicalTools, setShowMechanicalTools] = useState<boolean>(false);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  return (
    <div
      className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950 font-['Noto_Sans_Myanmar','Plus_Jakarta_Sans',sans-serif] pb-20 transition-all duration-150"
      style={{
        fontSize: zoomLevel === 100 ? undefined : `${zoomLevel}%`,
      }}
    >
      {/* Top Banner for Mobile Installation / APK notification */}
      <div className="bg-gradient-to-r from-cyan-600 via-amber-500 to-cyan-600 text-stone-950 py-1.5 px-3 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md flex-wrap">
        <span className="text-sm">❄️</span>
        <span className="font-extrabold tracking-wide">
          ★ GREATSTAR.Z.N.W ★ — ❄️ အဲကွန်း (A/C) + ဝါယာရိန်း & ဆန်ဆာ မဟာလက်စွဲ
        </span>
        <span className="bg-cyan-950 text-cyan-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-cyan-400/60 shadow-sm">
          ❄️ A/C Edition
        </span>
        <button
          onClick={() => {
            if (soundEnabled) playChime(700, 0.3);
            setShowInstallModal(true);
          }}
          className="underline hover:text-stone-900 ml-1 cursor-pointer font-black bg-stone-950/20 px-2 py-0.5 rounded"
        >
          (Install App)
        </button>
      </div>

      {/* DUAL MASTER MODE SWITCHER (Wiring System vs Car A/C Master) */}
      <div className="bg-stone-900/95 backdrop-blur-md border-b-2 border-cyan-500/30 sticky top-0 z-40 px-2 sm:px-4 py-2 shadow-2xl">
        <div className="max-w-3xl mx-auto flex items-center gap-1.5 sm:gap-2 bg-stone-950 p-1 sm:p-1.5 rounded-2xl border border-stone-800">
          <button
            onClick={() => {
              if (soundEnabled) playChime(500, 0.1);
              setMainAppMode('wiring');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              mainAppMode === 'wiring'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-500/40 ring-2 ring-amber-400'
                : 'text-stone-400 hover:text-white hover:bg-stone-900'
            }`}
          >
            <Zap className={`w-4 h-4 ${mainAppMode === 'wiring' ? 'text-stone-950 fill-stone-950' : 'text-amber-400'}`} />
            <span>⚡ ၁။ ဝါယာရိန်း & မီးပိုင်း</span>
          </button>

          <button
            onClick={() => {
              if (soundEnabled) playChime(650, 0.12);
              setMainAppMode('car_ac');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
              mainAppMode === 'car_ac'
                ? 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-stone-950 shadow-lg shadow-cyan-500/40 ring-2 ring-cyan-300'
                : 'text-cyan-300 hover:text-white hover:bg-stone-900 bg-cyan-950/40 border border-cyan-800/60'
            }`}
          >
            <Snowflake className={`w-4 h-4 ${mainAppMode === 'car_ac' ? 'text-stone-950 animate-spin' : 'text-cyan-400'}`} />
            <span className="flex items-center gap-1">
              <span>❄️ ၂။ ကားအဲကွန်း (CAR A/C)</span>
              <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded-full">
                NEW
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* MODE 1: AUTOMOTIVE WIRING & ELECTRONICS MASTER */}
      {mainAppMode === 'wiring' && (
        <>
          {/* Official Master Header with Brand Logo, Global Search & Zoom Controls */}
          <WiringMasterHeader
            currentCategory={currentCategory}
            onSelectCategory={setCurrentCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
          />

          {/* Main Content Areas for Wiring */}
          <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 space-y-5">
            {/* Search Results Filter Banner if searching */}
            {searchQuery && (
              <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl p-3 flex items-center justify-between text-xs text-amber-200">
                <span>
                  🔍 &quot;<strong>{searchQuery}</strong>&quot; ရှာဖွေမှု ရလဒ်များအား အောက်ပါ ကဏ္ဍအားလုံးတွင် တစ်ပြိုင်နက် ပြသနေပါသည်:
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-amber-400 hover:text-amber-200 underline font-bold ml-2 cursor-pointer"
                >
                  ရှာဖွေမှု ဖျက်မည်
                </button>
              </div>
            )}

            {/* 1. POWER & GROUND ARCHITECTURE SECTION */}
            {(currentCategory === 'all' || currentCategory === 'power_ground') && (
              <PowerGroundSection soundEnabled={soundEnabled} />
            )}

            {/* 2. MULTI-BRAND PINOUT MATRIX SECTION */}
            {(currentCategory === 'all' || currentCategory === 'pinouts') && (
              <PinoutMatrixSection
                soundEnabled={soundEnabled}
                searchQuery={searchQuery}
              />
            )}

            {/* 3. 38 SENSORS MASTER DIRECTORY SECTION */}
            {(currentCategory === 'all' || currentCategory === 'sensors') && (
              <SensorsDirectorySection
                soundEnabled={soundEnabled}
                searchQuery={searchQuery}
              />
            )}

            {/* 4. MAJOR COMPONENT ASSEMBLIES (Actuators, Throttle, VVT-i, EGR, A/C) */}
            {(currentCategory === 'all' || currentCategory === 'assemblies') && (
              <AssembliesSection
                soundEnabled={soundEnabled}
                searchQuery={searchQuery}
              />
            )}

            {/* 5. FUSE BOX & COLOR STANDARDS (Amperage colors & Abbreviations Dictionary) */}
            {(currentCategory === 'all' || currentCategory === 'fuse_box') && (
              <FuseBoxSection
                soundEnabled={soundEnabled}
                searchQuery={searchQuery}
              />
            )}

            {/* 6. INTERIOR BUTTONS & DASHBOARD SYMBOLS DIRECTORY */}
            {(currentCategory === 'all' || currentCategory === 'interior_symbols') && (
              <InteriorSymbolsSection
                soundEnabled={soundEnabled}
                searchQuery={searchQuery}
              />
            )}

            {/* 7. DASHBOARD WARNING & INDICATOR LIGHTS ENCYCLOPEDIA */}
            {(currentCategory === 'all' || currentCategory === 'dashboard_lights') && (
              <DashboardLightsSection
                soundEnabled={soundEnabled}
                searchQuery={searchQuery}
              />
            )}

            {/* 8. SECRET MANUAL RESETS & RELEARN PROCEDURES */}
            {(currentCategory === 'all' || currentCategory === 'manual_reset') && (
              <ManualResetSection
                soundEnabled={soundEnabled}
                searchQuery={searchQuery}
              />
            )}

            {/* 9. JDM DASHBOARD & TV SCREEN JAPANESE TRANSLATOR */}
            {(currentCategory === 'all' || currentCategory === 'jdm_translator') && (
              <JdmScreenTranslatorSection
                soundEnabled={soundEnabled}
                searchQuery={searchQuery}
              />
            )}

            {/* 10. OBD-II DTC TROUBLE CODE MASTER ENCYCLOPEDIA */}
            {(currentCategory === 'all' || currentCategory === 'dtc_codes') && (
              <DtcMasterSection
                soundEnabled={soundEnabled}
                searchQuery={searchQuery}
              />
            )}

            {/* 11. DIY SENSOR BENCH TESTER WORKBENCH */}
            {(currentCategory === 'all' || currentCategory === 'bench_tester') && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-2 pt-2">
                  <h2 className="text-base sm:text-lg font-bold text-purple-300 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-purple-400" />
                    ၁၁။ စားပွဲတင် ဆန်ဆာစမ်းသပ်ဘုတ်ပြား (DIY Sensor Tester Workbench)
                  </h2>
                  <span className="text-xs text-stone-400">
                    L7805 + 5V Regulator + BC547 မီးသီးစနစ်
                  </span>
                </div>
                <SensorTesterWorkbench soundEnabled={soundEnabled} />
              </div>
            )}

            {/* EXPANDABLE MECHANICAL WORKSHOP TOOLS (Bolt Torque, Cummins, Scania) */}
            <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-4 transition-all">
              <div
                onClick={() => {
                  if (soundEnabled) playChime(500, 0.1);
                  setShowMechanicalTools((prev) => !prev);
                }}
                className="flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-200">
                      စက်ပိုင်းဆိုင်ရာ လက်စွဲများ (Mechanical Torque & Engine Specs)
                    </h3>
                    <p className="text-xs text-stone-400">
                      မူလီဆွဲပေါင် ဇယားများ၊ Cummins & Scania အင်ဂျင်ချိန်နည်းများ
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <span>{showMechanicalTools ? 'ပိတ်မည်' : 'ဖွင့်ကြည့်မည်'}</span>
                  {showMechanicalTools ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>

              {showMechanicalTools && (
                <div className="mt-4 pt-4 border-t border-stone-800 space-y-4 animate-in fade-in duration-200">
                  <BoltTorqueExplainer soundEnabled={soundEnabled} />
                  <CumminsTimingGuide soundEnabled={soundEnabled} />
                  <ScaniaInjectorTiming soundEnabled={soundEnabled} />
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* MODE 2: STANDALONE DEDICATED CAR A/C MASTER */}
      {mainAppMode === 'car_ac' && (
        <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 space-y-5 animate-in fade-in duration-200">
          <CarAcMasterSection
            soundEnabled={soundEnabled}
            searchQuery={searchQuery}
          />
        </main>
      )}

      {/* Floating Zoom Widget for Mobile Workbench Use */}
      <FloatingZoomWidget
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        soundEnabled={soundEnabled}
      />

      {/* Direct Phone Install Modal */}
      <PhoneInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        soundEnabled={soundEnabled}
      />

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950 py-8 px-4 text-center text-xs text-stone-400 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 font-black flex items-center justify-center text-xs shadow-md">
              ★
            </span>
            <span className="font-bold text-amber-200">GREATSTAR.Z.N.W</span>
            <span className="text-stone-500">— Engineered & Created by Zaw Naing Win</span>
          </div>

          <div className="flex items-center gap-3 text-stone-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Offline Ready
            </span>
            <span className="text-stone-600">•</span>
            <span className="flex items-center gap-1">
              Crafted with Metta <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
