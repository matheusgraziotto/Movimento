import React from 'react';
import { QuizLayer } from '../../types';
import { HtmlContent } from '../HtmlContent';

interface ArgumentsLayerProps {
  layer: QuizLayer;
}

export const ArgumentsLayer: React.FC<ArgumentsLayerProps> = ({ layer }) => {
  const content = layer.content;
  const args = content?.arguments || [];

  if (args.length === 0) return null;

  return (
    <div className="w-full max-w-full min-w-0 my-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {args.map((item) => (
        <div
          key={item.id}
          className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col items-center text-center justify-center gap-2 hover:border-blue-300 transition-colors min-w-0 w-full overflow-hidden"
        >
          <HtmlContent html={item.text} className="w-full min-w-0 text-sm" />
        </div>
      ))}
    </div>
  );
};
