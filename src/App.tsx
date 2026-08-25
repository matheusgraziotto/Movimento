/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { quizData } from './data/quizData';
import { QuizOption } from './types';
import { QuizHeader } from './components/QuizHeader';
import { LayerRenderer } from './components/LayerRenderer';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const steps = quizData.steps;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});

  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;

  // Scroll to top and track step change in Meta Pixel
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    try {
      if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('trackCustom', 'QuizStep', {
          step_number: currentStepIndex + 1,
          step_id: currentStep?.id,
          total_steps: totalSteps,
        });
      }
    } catch {
      // ignore
    }
  }, [currentStepIndex, currentStep?.id, totalSteps]);

  // Determine next step index based on destination or option
  const resolveNextStepIndex = (destination?: string, optionId?: string | number): number => {
    // 1. Check navigation map for the specific option
    if (optionId && quizData.navigation) {
      const optKey = String(optionId);
      if (quizData.navigation[optKey]) {
        const target = quizData.navigation[optKey];
        if (target !== 'next') {
          const foundIdx = steps.findIndex((s) => String(s.id) === String(target));
          if (foundIdx !== -1) return foundIdx;
        }
      }
    }

    // 2. Check destination string
    if (destination && destination !== 'next') {
      const foundIdx = steps.findIndex((s) => String(s.id) === String(destination));
      if (foundIdx !== -1) return foundIdx;
    }

    // 3. Default to next step
    return Math.min(steps.length - 1, currentStepIndex + 1);
  };

  const goToStep = (nextIdx: number) => {
    if (nextIdx >= 0 && nextIdx < steps.length && nextIdx !== currentStepIndex) {
      setHistory((prev) => [...prev, nextIdx]);
      setCurrentStepIndex(nextIdx);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current
      const prevStepIdx = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentStepIndex(prevStepIdx);
    }
  };

  const handleSelectOption = (option: QuizOption) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep.id]: option.value || option.label,
    }));

    const nextIdx = resolveNextStepIndex(option.destination, option.id);
    goToStep(nextIdx);
  };

  const handleContinueMultiple = (selectedOptions: QuizOption[]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStep.id]: selectedOptions.map((o) => o.value || o.label),
    }));

    const nextIdx = resolveNextStepIndex('next');
    goToStep(nextIdx);
  };

  const handleButtonClick = (destination?: string) => {
    const nextIdx = resolveNextStepIndex(destination);
    goToStep(nextIdx);
  };

  const handleLoadingFinish = (destination?: string) => {
    const nextIdx = resolveNextStepIndex(destination);
    goToStep(nextIdx);
  };

  const showProgress = currentStep.options?.show_progress !== false;
  const showBack = currentStep.options?.show_back !== false && history.length > 1;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f5f5f4] text-[#030712] flex flex-col items-center selection:bg-blue-500 selection:text-white">
      {/* Quiz Header & Progress Bar */}
      <QuizHeader
        currentStepIndex={currentStepIndex}
        totalSteps={totalSteps}
        onBack={handleBack}
        canGoBack={showBack}
        showProgress={showProgress}
        themeColor={quizData.design.themeColor || '#3b82f6'}
      />

      {/* Main Step Content Container */}
      <main className="w-full max-w-[34rem] px-3 sm:px-4 py-4 md:py-6 flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="flex flex-col gap-2 w-full max-w-full min-w-0 flex-1"
          >
            {currentStep.layers?.map((layer) => (
              <LayerRenderer
                key={layer.id}
                layer={layer}
                onSelectOption={handleSelectOption}
                onContinueMultiple={handleContinueMultiple}
                onButtonClick={handleButtonClick}
                onLoadingFinish={handleLoadingFinish}
                themeColor={quizData.design.themeColor || '#3b82f6'}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Subtle branding footer on initial step */}
      {currentStepIndex === 0 && (
        <footer className="w-full text-center py-4 text-xs text-stone-500 font-medium">
          Pilates en Casa &bull; Desafío 50+ &bull; Lays Trancoso
        </footer>
      )}
    </div>
  );
}
