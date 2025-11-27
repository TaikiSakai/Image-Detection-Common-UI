import { useState } from 'react';
import { mockPredictionResponse } from '@/__mocks__/predictionData';
import { ImageCropper } from '@/components/analysis/ImageCropper';
import { Button } from '@/components/common/button';
import { Sidebar } from '@/components/layout';
import { PredictionResult } from '@/components/prediction/PredictionResult';
import { useImageLoader } from '@/hooks';
import { truncateText } from '@/utils';

export const AnalysisPage = () => {
  const { images, loadImages } = useImageLoader();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [, setCroppedImageUrl] = useState<string>('');

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
    setCroppedImageUrl('');
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
              <PredictionResult
                predictions={mockPredictionResponse.predictions}
              />
            </div>
            <div className="row-span-3">
              {selectedImageIndex !== null ? (
                <ImageCropper
                  sourceImage={images[selectedImageIndex].dataUrl}
                  onCropComplete={handleCropComplete}
                  cropSize={{ width: 255, height: 255 }}
                />
              ) : (
                <div className="flex h-full items-center justify-center rounded-lg bg-black-0 shadow-md ">
                  Select an image from the sidebar to start cropping
                </div>
              )}
            </div>
            <div className="row-span-2 flex h-full items-center justify-center rounded-lg bg-black-0 shadow-md ">
              div
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
