import type { Prediction } from '../../types/prediction';

type PredictionResultProps = {
  predictions: Prediction[];
};

export const PredictionResult = ({ predictions }: PredictionResultProps) => {
  const displayPredictions = predictions.slice(0, 10);
  const shouldUseGrid = displayPredictions.length > 5;

  return (
    <div className="w-full h-full rounded-lg bg-black-0 p-7 shadow-md">
      <div
        className={
          shouldUseGrid
            ? 'grid grid-rows-2 auto-cols-fr grid-flow-col gap-y-4 divide-x divide-black-2'
            : 'grid grid-cols-5 divide-x divide-black-2'
        }
      >
        {displayPredictions.map((prediction, index) => (
          <div
            key={`${prediction.className}-${index}`}
            className="flex flex-col gap-4 px-4 justify-center"
          >
            <div className="text-md font-medium text-gray-700 text-left">
              {prediction.className}
            </div>
            <div className="text-2xl font-bold text-gray-900 text-right">
              {(prediction.probability * 100).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
