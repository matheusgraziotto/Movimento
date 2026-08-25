import React from 'react';
import { QuizLayer } from '../../types';

interface ChartLayerProps {
  layer: QuizLayer;
}

export const ChartLayer: React.FC<ChartLayerProps> = ({ layer }) => {
  return (
    <div className="w-full my-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col gap-4">
      <div className="text-center font-bold text-stone-800 text-sm tracking-wide uppercase border-b border-stone-100 pb-2">
        Nivel Hormonal y Metabolismo
      </div>

      <div className="flex flex-col gap-4">
        {/* Alta Hormonal (Ideal) */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Mínimo Ideal (Alta hormonal)
            </span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              72%
            </span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-4 overflow-hidden">
            <div
              className="bg-linear-to-r from-emerald-500 to-green-600 h-full rounded-full flex items-center justify-end pr-2 text-[10px] text-white font-bold transition-all duration-700"
              style={{ width: '72%' }}
            />
          </div>
        </div>

        {/* Baixa Hormonal (Você) */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs font-semibold text-stone-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              Tu Estado Actual (Baja hormonal)
            </span>
            <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
              32% (Tú)
            </span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-4 overflow-hidden">
            <div
              className="bg-linear-to-r from-amber-500 to-red-600 h-full rounded-full flex items-center justify-end pr-2 text-[10px] text-white font-bold transition-all duration-700"
              style={{ width: '32%' }}
            />
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200/80 text-center text-xs text-amber-900 font-medium">
        ⚠️ Déficit del <strong>40%</strong> en relación con el metabolismo funcional
      </div>
    </div>
  );
};
