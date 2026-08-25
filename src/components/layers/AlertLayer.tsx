import React from 'react';
import { QuizLayer, QuizLayerDesign } from '../../types';
import { HtmlContent } from '../HtmlContent';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface AlertLayerProps {
  layer: QuizLayer;
}

export const AlertLayer: React.FC<AlertLayerProps> = ({ layer }) => {
  const text = layer.content?.text;
  if (!text) return null;

  const design = (Array.isArray(layer.design) ? {} : layer.design) as QuizLayerDesign;
  const style = design?.style || 'info';

  let bgBorderText = 'bg-blue-50/90 border-blue-200 text-blue-900';
  let IconComponent = Info;

  if (style === 'danger') {
    bgBorderText = 'bg-red-50/90 border-red-200 text-red-900';
    IconComponent = AlertCircle;
  } else if (style === 'warning') {
    bgBorderText = 'bg-amber-50/90 border-amber-200 text-amber-900';
    IconComponent = AlertTriangle;
  } else if (style === 'success') {
    bgBorderText = 'bg-emerald-50/90 border-emerald-200 text-emerald-900';
    IconComponent = CheckCircle2;
  }

  const basis = design?.basis;
  const widthStyle = basis && basis !== 100 ? { width: `${basis}%` } : undefined;

  let alignClass = 'mx-auto';
  if (design?.horizontalAlign === 'self-start') alignClass = 'mr-auto';
  if (design?.horizontalAlign === 'self-end') alignClass = 'ml-auto';

  return (
    <div
      className={`w-full max-w-full min-w-0 my-2 p-3.5 rounded-2xl border flex items-center justify-center gap-3 shadow-xs ${bgBorderText} ${alignClass}`}
      style={widthStyle}
    >
      <div className="shrink-0">
        <IconComponent className="w-5 h-5 opacity-80" />
      </div>
      <div className="flex-1 min-w-0 text-center text-xs sm:text-sm leading-snug">
        <HtmlContent html={text} />
      </div>
    </div>
  );
};
