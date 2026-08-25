import React from 'react';
import { QuizLayer, QuizLayerDesign } from '../../types';

interface ImageLayerProps {
  layer: QuizLayer;
}

export const ImageLayer: React.FC<ImageLayerProps> = ({ layer }) => {
  const imageSrc = layer.content?.image?.src;
  if (!imageSrc) return null;

  const design = (Array.isArray(layer.design) ? {} : layer.design) as QuizLayerDesign;
  const basis = design?.basis;
  const widthStyle = basis && basis !== 100 ? { width: `${basis}%` } : undefined;

  let alignClass = 'mx-auto';
  if (design?.horizontalAlign === 'self-start') alignClass = 'mr-auto';
  if (design?.horizontalAlign === 'self-end') alignClass = 'ml-auto';

  return (
    <div className={`flex justify-center w-full my-2 ${alignClass}`} style={widthStyle}>
      <img
        src={imageSrc}
        alt={layer.title || 'Imagem do Desafio Pilates'}
        referrerPolicy="no-referrer"
        loading="eager"
        className="rounded-2xl max-w-full h-auto object-contain shadow-xs"
        style={{
          maxHeight: '460px',
        }}
      />
    </div>
  );
};
