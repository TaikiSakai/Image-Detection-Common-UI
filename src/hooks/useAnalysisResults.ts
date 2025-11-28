import { useState, useCallback } from 'react';
import type { AnalysisResult, Prediction } from '@/types';

export type UseAnalysisResultsReturn = {
  results: AnalysisResult[];
  addResult: (
    sourceImageId: string,
    croppedImageUrl: string,
    predictions: Prediction[],
  ) => void;
  removeResult: (id: string) => void;
  clearResults: () => void;
};

export const useAnalysisResults = (): UseAnalysisResultsReturn => {
  const [results, setResults] = useState<AnalysisResult[]>([]);

  const addResult = useCallback(
    (
      sourceImageId: string,
      croppedImageUrl: string,
      predictions: Prediction[],
    ) => {
      const newResult: AnalysisResult = {
        id: crypto.randomUUID(),
        sourceImageId,
        croppedImageUrl,
        predictions,
      };

      setResults((prev) => [...prev, newResult]);
    },
    [],
  );

  const removeResult = useCallback((id: string) => {
    setResults((prev) => prev.filter((result) => result.id !== id));
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  return {
    results,
    addResult,
    removeResult,
    clearResults,
  };
};