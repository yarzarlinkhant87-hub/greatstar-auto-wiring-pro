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
import { BoltTorqueExplainer } from './components/BoltTorqueExplainer';
import { CumminsTimingGuide } from './components/CumminsTimingGuide';
import { ScaniaInjectorTiming } from './components/ScaniaInjectorTiming';
import { FloatingZoomWidget } from './components/FloatingZoomWidget';
import { PhoneInstallModal } from './components/PhoneInstallModal';
import { SystemCategory } from './types/wiring';
import { Smartphone, ShieldCheck, Heart, Sparkles, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { playChime } from './utils/audio';

export default function App() {
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
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 py-1.5 px-3 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md">
        <Smartphone className="w-4 h-4 text-stone-950 shrink-0" />
        <span>★ GREATSTAR.Z.N.W ★ — ကားတစ်စီးလုံး ဝါယာရိန်း၊ ဆန်ဆာ & ECU ထိန်းချုပ်မှု မာစတာလက်စွဲ</span>
        <button
          onClick={() => {
            if (soundEnabled) playChime(700, 0.3);
            setShowInstallModal(true);
          }}
          className="underline hover:text-stone-900 ml-1 cursor-pointer font-black"
        >
          (Install App)
        </button>
      </div>

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

      {/* Main Content Areas */}
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

        {/* 6. EXPANDABLE MECHANICAL WORKSHOP TOOLS (Bolt Torque, Cummins, Scania) */}
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
