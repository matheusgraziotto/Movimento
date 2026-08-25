import React, { useEffect, useState } from 'react';
import { QuizLayer } from '../../types';
import { HtmlContent } from '../HtmlContent';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface LoadingLayerProps {
  layer: QuizLayer;
  onFinish: (destination?: string) => void;
  themeColor?: string;
}

export const LoadingLayer: React.FC<LoadingLayerProps> = ({
  layer,
  onFinish,
  themeColor = '#3b82f6',
}) => {
  const content = layer.content;
  const durationSeconds = content?.seconds || 4;
  const destination = content?.destination || 'next';

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalMs = durationSeconds * 1000;
    const intervalMs = 40;
    const increment = 100 / (totalMs / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextVal = prev + increment;
        if (nextVal >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onFinish(destination);
          }, 300);
          return 100;
        }
        return nextVal;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [durationSeconds, destination, onFinish]);

  return (
    <div className="w-full my-6 flex flex-col items-center justify-center text-center px-4">
      {content?.show_title && content?.title && (
        <h2 className="text-xl md:text-2xl font-bold text-stone-900 mb-2">{content.title}</h2>
      )}

      {content?.description && (
        <div className="text-sm md:text-base font-semibold mb-6">
          <HtmlContent html={content.description} />
        </div>
      )}

      {/* Circular Progress & Spinner */}
      <div className="relative flex items-center justify-center my-4">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="54"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="64"
            cy="64"
            r="54"
            stroke={themeColor}
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 54}
            strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-75 ease-linear"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin mb-1 text-blue-600" />
          <span className="text-xl font-extrabold text-stone-900">{Math.round(progress)}%</span>
        </div>
      </div>

      {content?.show_progress && (
        <div className="w-full max-w-xs bg-stone-200 rounded-full h-2 mt-4 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: themeColor, width: `${progress}%` }}
          />
        </div>
      )}

      <p className="text-xs text-stone-600 mt-4 animate-pulse">
        Procesando los datos de tu perfil...
      </p>
    </div>
  );
};
