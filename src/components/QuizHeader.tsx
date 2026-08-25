import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface QuizHeaderProps {
  currentStepIndex: number;
  totalSteps: number;
  onBack: () => void;
  canGoBack: boolean;
  showProgress: boolean;
  themeColor?: string;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentStepIndex,
  totalSteps,
  onBack,
  canGoBack,
  showProgress,
  themeColor = '#3b82f6',
}) => {
  if (!showProgress && !canGoBack) {
    return null;
  }

  // Calculate percentage based on current step
  const progressPercent = Math.min(100, Math.max(5, Math.round(((currentStepIndex + 1) / totalSteps) * 100)));

  return (
    <header className="sticky top-0 z-30 w-full bg-[#f5f5f4]/95 backdrop-blur-sm px-4 py-3 border-b border-stone-200/60 shadow-xs">
      <div className="max-w-[34rem] mx-auto flex items-center gap-3">
        {canGoBack ? (
          <button
            id="quiz-back-button"
            onClick={onBack}
            className="p-1.5 -ml-1 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Volver"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-2" />
        )}

        {showProgress && (
          <div className="flex-1">
            <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{ backgroundColor: themeColor }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
