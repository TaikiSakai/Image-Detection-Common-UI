import type { AnalysisResult, LoadedImage } from '@/types';

type AnalysisResultListProps = {
  results: AnalysisResult[];
  images: LoadedImage[];
  onResultClick: (result: AnalysisResult) => void;
};

export const AnalysisResultList = ({
  results,
  images,
  onResultClick,
}: AnalysisResultListProps) => {
  const getImageName = (sourceImageId: string): string => {
    const image = images.find((img) => img.id === sourceImageId);
    return image ? image.name : 'Unknown';
  };

  const getTopPrediction = (result: AnalysisResult) => {
    if (result.predictions.length === 0) {
      return { className: 'N/A', probability: 0 };
    }
    return result.predictions[0];
  };

  return (
    <div className="h-full w-full rounded-lg shadow-md bg-black-0">
      <div className="overflow-x-auto h-full p-4">
        <div className="flex gap-4 h-full min-w-min">
          {results.length === 0 ? (
            <div className="w-full text-center text-gray-400 py-8">
              No saved results yet. Crop an image and click "Save Result" to add
              results here.
            </div>
          ) : (
            results.map((result) => {
              const topPrediction = getTopPrediction(result);
              return (
                <div
                  key={result.id}
                  onClick={() => onResultClick(result)}
                  className="flex-shrink-0 w-48 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={result.croppedImageUrl}
                      alt={`Result for ${getImageName(result.sourceImageId)}`}
                      className="h-35 w-35 object-cover rounded-md mb-2 mx-auto"
                    />
                    <div className="space-y-1">
                      <p
                        className="text-xs text-gray-600 truncate"
                        title={getImageName(result.sourceImageId)}
                      >
                        {getImageName(result.sourceImageId)}
                      </p>
                      <p
                        className="text-sm font-semibold truncate"
                        title={topPrediction.className}
                      >
                        {topPrediction.className}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(topPrediction.probability * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
