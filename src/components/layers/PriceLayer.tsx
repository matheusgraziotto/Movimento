import React from 'react';
import { QuizLayer } from '../../types';
import { HtmlContent } from '../HtmlContent';
import { Sparkles } from 'lucide-react';

interface PriceLayerProps {
  layer: QuizLayer;
  themeColor?: string;
}

export const PriceLayer: React.FC<PriceLayerProps> = ({ layer, themeColor = '#3b82f6' }) => {
  const content = layer.content;
  if (!content) return null;

  const checkoutUrl = 'https://pay.onprofit.com.br/hjgVEN8l?off=JGh4Y4';

  const handleClick = () => {
    window.location.href = checkoutUrl;
  };

  return (
    <div
      onClick={handleClick}
      className="w-full my-4 rounded-2xl bg-white border-2 border-blue-500 p-5 shadow-lg flex flex-col items-center text-center relative overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform"
    >
      {/* Top ribbon banner */}
      {content.featured && (
        <div
          className="absolute top-0 inset-x-0 py-1 text-white text-[11px] font-black tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-xs"
          style={{ backgroundColor: themeColor }}
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>{content.featured}</span>
        </div>
      )}

      <div className="pt-3 flex flex-col items-center">
        {content.title && (
          <div className="text-sm font-medium text-stone-500 mb-1">
            <HtmlContent html={content.title} />
          </div>
        )}

        <div className="flex items-center justify-center gap-2 my-1">
          {content.before && (
            <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2 py-0.5 rounded-full uppercase">
              {content.before}
            </span>
          )}
          <span className="text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
            {content.value || 'R$29,90'}
          </span>
        </div>

        {content.after && (
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            {content.after}
          </span>
        )}
      </div>
    </div>
  );
};
