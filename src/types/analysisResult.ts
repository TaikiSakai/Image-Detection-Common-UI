import type { Prediction } from './prediction';

export type AnalysisResult = {
  id: string;
  sourceImageId: string;
  croppedImageUrl: string;
  predictions: Prediction[];
};