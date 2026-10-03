import React, { useState } from 'react';
import { BRAND_PINOUT_MATRIX } from '../data/pinoutsData';
import { Search, Compass, Globe, Filter, Check, ArrowUpDown } from 'lucide-react';
import { playChime } from '../utils/audio';

interface PinoutMatrixSectionProps {
  soundEnabled: boolean;
  searchQuery?: string;
}

export const PinoutMatrixSection: React.FC<PinoutMatrixSectionProps> = ({
  soundEnabled,
  searchQuery = '',
}) => {
  const [internalSearch, setInternalSearch] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<'all' | 'toyota' | 'honda' | 'nissan' | 'hyundaiKia' | 'ford' | 'benzBosch'>('all');

  const effectiveSearch = (searchQuery || internalSearch).toLowerCase().trim();

  const filteredData = BRAND_PINOUT_MATRIX.filter((item) => {
    if (!effectiveSearch) return true;
    return (
      item.functionNameMy.toLowerCase().includes(effectiveSearch) ||
      item.functionNameEn.toLowerCase().includes(effectiveSearch) ||
      item.descriptionMy.toLowerCase().includes(effectiveSearch) ||
      item.toyota.toLowerCase().includes(effectiveSearch) ||
      item.honda.toLowerCase().includes(effectiveSearch) ||
      item.nissan.toLowerCase().includes(effectiveSearch) ||
      item.hyundaiKia.toLowerCase().includes(effectiveSearch) ||
      item.ford.toLowerCase().includes(effectiveSearch) ||
      item.benzBosch.toLowerCase().includes(effectiveSearch)
    );
  });

  const handleBrandSelect = (brand: 'all' | 'toyota' | 'honda' | 'nissan' | 'hyundaiKia' | 'ford' | 'benzBosch') => {
    if (soundEnabled) playChime(550, 0.1);
    setSelectedBrand(brand);
  };

  return (
    <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-cyan-500/20 shrink-0">
            <Compass className="w-5 h-5 text-stone-950 fill-stone-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-cyan-300 flex items-center gap-2">
              ၂။ ကားကုမ္ပဏီအလိုက် Pin Out ဘာသာပြန်ဇယားကြီး
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                Multi-Brand Cross Reference
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              Toyota, Honda, Nissan, Hyundai/Kia, Ford, Benz/Bosch ဝါယာလိုက်ရာတွင် မျက်စိမလည်စေရန် တိုက်ဆိုင်စစ်ဆေးဇယား
            </p>
          </div>
        </div>

        {/* Quick Brand Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
          <button
            onClick={() => handleBrandSelect('all')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedBrand === 'all'
                ? 'bg-cyan-500 text-stone-950'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            အားလုံး (All)
          </button>
          <button
            onClick={() => handleBrandSelect('toyota')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedBrand === 'toyota'
                ? 'bg-cyan-500 text-stone-950'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Toyota
          </button>
          <button
            onClick={() => handleBrandSelect('honda')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedBrand === 'honda'
                ? 'bg-cyan-500 text-stone-950'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Honda
          </button>
          <button
            onClick={() => handleBrandSelect('nissan')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedBrand === 'nissan'
                ? 'bg-cyan-500 text-stone-950'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Nissan
          </button>
          <button
            onClick={() => handleBrandSelect('hyundaiKia')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedBrand === 'hyundaiKia'
                ? 'bg-cyan-500 text-stone-950'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Kia/Hyundai
          </button>
          <button
            onClick={() => handleBrandSelect('ford')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedBrand === 'ford'
                ? 'bg-cyan-500 text-stone-950'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Ford
          </button>
          <button
            onClick={() => handleBrandSelect('benzBosch')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              selectedBrand === 'benzBosch'
                ? 'bg-cyan-500 text-stone-950'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Benz/Bosch
          </button>
        </div>
      </div>

      {/* Local Filter Search Input if no global search */}
      {!searchQuery && (
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={internalSearch}
            onChange={(e) => setInternalSearch(e.target.value)}
            placeholder="Pin နာမည် ရိုက်ရှာပါ (ဥပမာ: VC, 5V, THW, VTA, E2, NE, Crank, မီးကွိုင်, ရေအပူချိန်)..."
            className="w-full bg-stone-950 border border-stone-800 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      )}

      {/* Pinout Table Display */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-stone-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-950 text-stone-300 border-b border-stone-800 uppercase tracking-wider font-mono text-[11px]">
            <tr>
              <th className="py-3 px-3 min-w-[160px]">လုပ်ဆောင်ချက် (Function)</th>
              <th className="py-3 px-3 min-w-[140px]">ဗို့အား/အချက်ပြ</th>
              {(selectedBrand === 'all' || selectedBrand === 'toyota') && (
                <th className="py-3 px-3 text-amber-400 min-w-[110px]">Toyota / Denso</th>
              )}
              {(selectedBrand === 'all' || selectedBrand === 'honda') && (
                <th className="py-3 px-3 text-cyan-400 min-w-[110px]">Honda / Keihin</th>
              )}
              {(selectedBrand === 'all' || selectedBrand === 'nissan') && (
                <th className="py-3 px-3 text-red-400 min-w-[110px]">Nissan</th>
              )}
              {(selectedBrand === 'all' || selectedBrand === 'hyundaiKia') && (
                <th className="py-3 px-3 text-blue-400 min-w-[110px]">Hyundai / Kia</th>
              )}
              {(selectedBrand === 'all' || selectedBrand === 'ford') && (
                <th className="py-3 px-3 text-emerald-400 min-w-[110px]">Ford</th>
              )}
              {(selectedBrand === 'all' || selectedBrand === 'benzBosch') && (
                <th className="py-3 px-3 text-purple-400 min-w-[120px]">Benz / Bosch</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-850 bg-stone-900/60 font-sans">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-stone-500 text-xs">
                  ရှာဖွေမှုနှင့် ကိုက်ညီသော Pinout မတွေ့ရှိပါ
                </td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-stone-200">{row.functionNameMy}</div>
                    <div className="text-[11px] font-mono text-stone-400">{row.functionNameEn}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">{row.descriptionMy}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-950 text-cyan-300 border border-stone-800 whitespace-nowrap">
                      {row.voltageSignal}
                    </span>
                  </td>
                  {(selectedBrand === 'all' || selectedBrand === 'toyota') && (
                    <td className="py-3 px-3 font-mono font-bold text-amber-300 bg-amber-500/5">
                      {row.toyota}
                    </td>
                  )}
                  {(selectedBrand === 'all' || selectedBrand === 'honda') && (
                    <td className="py-3 px-3 font-mono font-bold text-cyan-300 bg-cyan-500/5">
                      {row.honda}
                    </td>
                  )}
                  {(selectedBrand === 'all' || selectedBrand === 'nissan') && (
                    <td className="py-3 px-3 font-mono font-bold text-red-300 bg-red-500/5">
                      {row.nissan}
                    </td>
                  )}
                  {(selectedBrand === 'all' || selectedBrand === 'hyundaiKia') && (
                    <td className="py-3 px-3 font-mono font-bold text-blue-300 bg-blue-500/5">
                      {row.hyundaiKia}
                    </td>
                  )}
                  {(selectedBrand === 'all' || selectedBrand === 'ford') && (
                    <td className="py-3 px-3 font-mono font-bold text-emerald-300 bg-emerald-500/5">
                      {row.ford}
                    </td>
                  )}
                  {(selectedBrand === 'all' || selectedBrand === 'benzBosch') && (
                    <td className="py-3 px-3 font-mono font-bold text-purple-300 bg-purple-500/5">
                      {row.benzBosch}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
