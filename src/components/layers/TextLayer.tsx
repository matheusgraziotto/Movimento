import React from 'react';
import { QuizLayer, QuizLayerDesign } from '../../types';
import { HtmlContent } from '../HtmlContent';

interface TextLayerProps {
  layer: QuizLayer;
}

export const TextLayer: React.FC<TextLayerProps> = ({ layer }) => {
  const text = layer.content?.text;
  if (!text) return null;

  const design = (Array.isArray(layer.design) ? {} : layer.design) as QuizLayerDesign;
  const basis = design?.basis;
  const widthStyle = basis && basis !== 100 ? { width: `${basis}%` } : undefined;

  let alignClass = 'mx-auto';
  if (design?.horizontalAlign === 'self-start') alignClass = 'mr-auto';
  if (design?.horizontalAlign === 'self-end') alignClass = 'ml-auto';

  return (
    <div className={`w-full max-w-full min-w-0 ${alignClass}`} style={widthStyle}>
      <HtmlContent html={text} className="text-stone-900 font-medium" />
    </div>
  );
};
