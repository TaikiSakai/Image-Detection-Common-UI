import { useState } from 'react';
import { mockPredictionResponse } from '@/__mocks__/predictionData';
import { AnalysisResultList, ImageCropper } from '@/components/analysis';
import { Button } from '@/components/common/button';
import { Sidebar } from '@/components/layout';
import { PredictionResult } from '@/components/prediction/PredictionResult';
import { useAnalysisResults, useImageLoader } from '@/hooks';
import type { AnalysisResult, Prediction } from '@/types';
import { truncateText } from '@/utils';

export const AnalysisPage = () => {
  const { images, loadImages } = useImageLoader();
  const { results, addResult } = useAnalysisResults();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>('');
  const [currentPredictions, setCurrentPredictions] = useState<Prediction[]>(
    mockPredictionResponse.predictions,
  );
  const [displayMode, setDisplayMode] = useState<'edit' | 'view'>('edit');

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    setCroppedImageUrl('');
    setCurrentPredictions(mockPredictionResponse.predictions);
    setDisplayMode('edit');
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCroppedImageUrl(reader.result as string);

      // TODO: Send analysis request here
      console.log('Cropped image ready for analysis:', croppedBlob);
    };
    reader.readAsDataURL(croppedBlob);
  };

  const handleSaveResult = () => {
    if (selectedImageIndex === null || !croppedImageUrl) {
      return;
    }

    const sourceImageId = images[selectedImageIndex].id;
    addResult(sourceImageId, croppedImageUrl, currentPredictions);
  };

  const handleResultClick = (result: AnalysisResult) => {
    const imageIndex = images.findIndex(
      (img) => img.id === result.sourceImageId,
    );
    if (imageIndex === -1) {
      return;
    }

    setSelectedImageIndex(imageIndex);
    setCroppedImageUrl(result.croppedImageUrl);
    setCurrentPredictions(result.predictions);
    setDisplayMode('view');
  };

  return (
    <div className="flex h-full">
      <Sidebar>
        <div className="flex justify-center w-full">
          <Button
            className="hover:bg-black-2 shadow-elevation"
            onClick={loadImages}
          >
            Load Images
          </Button>
        </div>
        {images.map((image, index) => (
          <div
            key={index}
            className="my-2 flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageSelect(index)}
          >
            <img
              src={image.dataUrl}
              alt={image.name}
              className={`max-w-full h-auto ${selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''}`}
            />
            <p
              className="text-xs text-gray-600 mt-1 text-center"
              title={image.name}
            >
              {truncateText(image.name, 20)}
            </p>
          </div>
        ))}
      </Sidebar>
      <main className="flex-1 px-10 py-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
          <div className="grid grid-rows-6 gap-4 col-span-7 content-start">
            <div className="row-span-1">
              <PredictionResult predictions={currentPredictions} />
            </div>
            <div className="row-span-3">
              {selectedImageIndex !== null ? (
                <ImageCropper
                  sourceImage={images[selectedImageIndex].dataUrl}
                  onCropComplete={handleCropComplete}
                  onActionClick={handleSaveResult}
                  actionButtonLabel="Save Result"
                  cropSize={{ width: 255, height: 255 }}
                  displayMode={displayMode}
                  croppedImageUrl={croppedImageUrl}
                />
              ) : (
                <div className="flex h-full items-center justify-center rounded-lg bg-black-0 shadow-md ">
                  Select an image from the sidebar to start cropping
                </div>
              )}
            </div>
            <div className="row-span-2 overflow-hidden">
              <AnalysisResultList
                results={results}
                images={images}
                onResultClick={handleResultClick}
              />
            </div>
          </div>
          <div className="grid grid-rows-[auto] gap-4 col-span-3 content-start">
            <div className="row-span-35 bg-black-0 p-4">
              <h2 className="text-xl bg-black-0 font-semibold mb-4">div</h2>
            </div>
            <div className="row-span-13 bg-black-0 p-4">
              <h2 className="text-xl bg-black-0 font-semibold mb-4">div</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
