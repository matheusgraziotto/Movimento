import React, { useState } from 'react';
import { QuizLayer, QuizLayerDesign, QuizOption } from '../../types';
import { HtmlContent } from '../HtmlContent';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

interface OptionsLayerProps {
  layer: QuizLayer;
  onSelectOption: (option: QuizOption) => void;
  onContinueMultiple?: (selectedOptions: QuizOption[]) => void;
  themeColor?: string;
}

export const OptionsLayer: React.FC<OptionsLayerProps> = ({
  layer,
  onSelectOption,
  onContinueMultiple,
  themeColor = '#3b82f6',
}) => {
  const content = layer.content;
  if (!content || !content.options) return null;

  const design = (Array.isArray(layer.design) ? {} : layer.design) as QuizLayerDesign;
  const isMultiple = Boolean(content.multiple);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const gridClass = design?.grid === 'grid-cols-2' ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-2.5';
  const isFeaturedBg = design?.background === 'fetured';

  const handleOptionClick = (option: QuizOption) => {
    const optId = String(option.id);
    if (isMultiple) {
      setSelectedIds((prev) =>
        prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
      );
    } else {
      onSelectOption(option);
    }
  };

  const handleContinue = () => {
    if (onContinueMultiple && selectedIds.length > 0) {
      const chosen = content.options?.filter((opt) => selectedIds.includes(String(opt.id))) || [];
      onContinueMultiple(chosen);
    }
  };

  return (
    <div className="w-full my-3 flex flex-col gap-3">
      {content.introduction && (
        <div className="text-center mb-1">
          <HtmlContent html={content.introduction} className="text-stone-900 font-semibold" />
        </div>
      )}

      <div className={gridClass}>
        {content.options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const hasImage = option.image && option.image.src;
          const isEmoji =
            option.image?.type === 'emoji' ||
            (hasImage && option.image?.src && option.image.src.length <= 4);

          // Card styles
          let buttonBg = isFeaturedBg
            ? 'bg-[#3b82f6] text-white hover:bg-blue-600 border-transparent shadow-md'
            : isSelected
            ? 'bg-blue-50/80 border-blue-500 text-stone-900 shadow-sm ring-2 ring-blue-500/20'
            : 'bg-white text-stone-800 border-stone-200/90 hover:border-blue-400 hover:bg-stone-50/80 shadow-xs';

          return (
            <motion.button
              key={option.id}
              id={`option-${option.id}`}
              type="button"
              onClick={() => handleOptionClick(option)}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className={`w-full min-h-[58px] p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${buttonBg}`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {hasImage && isEmoji && (
                  <span className="text-2xl select-none shrink-0">{option.image?.src}</span>
                )}
                {hasImage && !isEmoji && option.image?.src && (
                  <img
                    src={option.image.src}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="flex-1 min-w-0 text-sm md:text-base font-medium">
                  <HtmlContent html={option.label} />
                </div>
              </div>

              {isMultiple && (
                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-stone-300 bg-stone-50'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {isMultiple && (
        <div className="mt-4">
          <button
            id="options-continue-button"
            type="button"
            disabled={selectedIds.length === 0}
            onClick={handleContinue}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-white text-center transition-all cursor-pointer shadow-md ${
              selectedIds.length > 0
                ? 'bg-[#3b82f6] hover:bg-blue-600 active:scale-[0.99]'
                : 'bg-stone-300 text-stone-500 cursor-not-allowed'
            }`}
          >
            CONTINUAR
          </button>
        </div>
      )}
    </div>
  );
};
