import React from 'react';
import { QuizLayer, QuizLayerDesign } from '../../types';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ButtonLayerProps {
  layer: QuizLayer;
  onClick: (destination?: string) => void;
  themeColor?: string;
}

export const ButtonLayer: React.FC<ButtonLayerProps> = ({ layer, onClick, themeColor = '#3b82f6' }) => {
  const content = layer.content;
  if (!content) return null;

  const design = (Array.isArray(layer.design) ? {} : layer.design) as QuizLayerDesign;
  const label = content.label || 'CONTINUAR';
  const destination = content.destination || 'next';
  const isPulse = Boolean(design?.pulse || content.pulse);
  const isRedirect = content.type === 'redirect' || destination.startsWith('http');

  const handleClick = () => {
    if (isRedirect && destination.startsWith('http')) {
      window.location.href = destination;
    } else {
      onClick(destination);
    }
  };

  const basis = design?.basis;
  const widthStyle = basis && basis !== 100 ? { width: `${basis}%` } : undefined;

  return (
    <div className="w-full my-3 flex justify-center" style={widthStyle}>
      <motion.button
        id={`button-${layer.id}`}
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={
          isPulse
            ? {
                scale: [1, 1.03, 1],
                boxShadow: [
                  '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
                  '0 10px 15px -3px rgba(59, 130, 246, 0.5)',
                  '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
                ],
              }
            : undefined
        }
        transition={
          isPulse
            ? {
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
        className="w-full py-4 px-6 rounded-2xl font-black tracking-wide text-white text-base md:text-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg active:shadow-sm uppercase transition-colors"
        style={{
          backgroundColor: themeColor,
        }}
      >
        <span>{label}</span>
        {!label.includes('CLIQUE') && <ArrowRight className="w-5 h-5" />}
      </motion.button>
    </div>
  );
};
