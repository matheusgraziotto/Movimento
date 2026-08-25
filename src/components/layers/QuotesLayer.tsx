import React, { useState } from 'react';
import { QuizLayer } from '../../types';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuotesLayerProps {
  layer: QuizLayer;
}

export const QuotesLayer: React.FC<QuotesLayerProps> = ({ layer }) => {
  const content = layer.content;
  const quotes = content?.quotes || [];
  const layout = content?.layout || 'list';
  const [currentIndex, setCurrentIndex] = useState(0);

  if (quotes.length === 0) return null;

  if (layout === 'slide') {
    const handlePrev = () => {
      setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
    };

    const handleNext = () => {
      setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
    };

    const currentQuote = quotes[currentIndex];

    return (
      <div className="w-full my-4 flex flex-col items-center">
        <div className="relative w-full rounded-2xl bg-white border border-stone-200 p-5 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                {currentQuote.image?.src && (
                  <img
                    src={currentQuote.image.src}
                    alt={currentQuote.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/20 shrink-0"
                  />
                )}
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{currentQuote.name}</h4>
                  {currentQuote.activity && (
                    <p className="text-xs text-stone-600">{currentQuote.activity}</p>
                  )}
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: currentQuote.rate || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-stone-700 text-sm italic leading-relaxed break-words">
                "{currentQuote.text.replace(/&nbsp;/gi, ' ')}"
              </p>
            </motion.div>
          </AnimatePresence>

          {quotes.length > 1 && (
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1.5">
                {quotes.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentIndex ? 'bg-blue-600' : 'bg-stone-300'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                aria-label="Próximo testimonio"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // List layout
  return (
    <div className="w-full my-4 flex flex-col gap-3">
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="rounded-2xl bg-white border border-stone-200 p-4 shadow-xs flex flex-col gap-2.5"
        >
          <div className="flex items-center gap-3">
            {quote.image?.src && (
              <img
                src={quote.image.src}
                alt={quote.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover border border-stone-200 shrink-0"
              />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-stone-900 text-sm">{quote.name}</h4>
                {quote.activity && (
                  <span className="text-[11px] text-stone-600">{quote.activity}</span>
                )}
              </div>
              <div className="flex gap-0.5 mt-0.5">
                {Array.from({ length: quote.rate || 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-stone-700 text-sm leading-relaxed break-words">
            "{quote.text.replace(/&nbsp;/gi, ' ')}"
          </p>
        </div>
      ))}
    </div>
  );
};
