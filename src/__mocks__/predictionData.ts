import type { PredictionResponse } from "../types/prediction";

export const mockPredictionResponse: PredictionResponse = {
  predictions: [
    { className: "Class_1", probability: 0.95 },
    { className: "Class_2", probability: 0.03 },
    { className: "Class_3", probability: 0.01 },
    { className: "Class_4", probability: 0.005 },
    { className: "Class_5", probability: 0.003 },
  ],
};

export const mockPredictionResponseWith10Classes: PredictionResponse = {
  predictions: [
    { className: "Class_1", probability: 0.45 },
    { className: "Class_2", probability: 0.23 },
    { className: "Class_3", probability: 0.12 },
    { className: "Class_4", probability: 0.08 },
    { className: "Class_5", probability: 0.05 },
    { className: "Class_6", probability: 0.03 },
    { className: "Class_7", probability: 0.02 },
    { className: "Class_8", probability: 0.01 },
    { className: "Class_9", probability: 0.005 },
    { className: "Class_10", probability: 0.005 },
  ],
};
