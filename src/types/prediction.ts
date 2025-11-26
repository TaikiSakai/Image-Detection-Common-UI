export type Prediction = {
  className: string;
  probability: number;
};

export type PredictionResponse = {
  predictions: Prediction[];
};
