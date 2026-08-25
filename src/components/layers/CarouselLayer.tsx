import React, { useState } from 'react';
import { QuizLayer } from '../../types';
import { HtmlContent } from '../HtmlContent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CarouselLayerProps {
  layer: QuizLayer;
}

export const CarouselLayer: React.FC<CarouselLayerProps> = ({ layer }) => {
  const content = layer.content;
  const items = content?.items || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (items.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const currentItem = items[currentIndex];

  return (
    <div className="w-full my-4 flex flex-col items-center">
      <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-md">
        <div className="relative aspect-square w-full bg-stone-100 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full flex flex-col items-center justify-center p-2"
            >
              {currentItem.image?.src && (
                <img
                  src={currentItem.image.src}
                  alt={currentItem.text ? currentItem.text.replace(/<[^>]+>/g, '') : 'Resultado'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-xl"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md text-stone-800 flex items-center justify-center hover:bg-white cursor-pointer transition-transform active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md text-stone-800 flex items-center justify-center hover:bg-white cursor-pointer transition-transform active:scale-95"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {currentItem.text && (
          <div className="py-2.5 px-4 text-center bg-stone-50 border-t border-stone-100 font-semibold text-stone-800 text-sm">
            <HtmlContent html={currentItem.text} />
          </div>
        )}
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 mt-3">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? 'bg-blue-600 w-6' : 'bg-stone-300 hover:bg-stone-400'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
