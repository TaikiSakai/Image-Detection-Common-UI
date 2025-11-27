import { useState, useRef } from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type ImageCropperProps = {
  sourceImage: string;
  onCropComplete: (croppedBlob: Blob) => void;
  cropSize: {
    width: number;
    height: number;
  };
};

export const ImageCropper = ({
  sourceImage,
  onCropComplete,
  cropSize,
}: ImageCropperProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedPreview, setCroppedPreview] = useState<string>('');

  const handleImageLoad = () => {
    const image = imgRef.current;
    if (!image) {
      return;
    }

    // Calculate the display size based on the scale
    const scaleX = image.width / image.naturalWidth;
    const scaleY = image.height / image.naturalHeight;

    // Set crop size in display pixels to get exactly cropSize pixels from the original image
    setCrop({
      unit: 'px',
      width: cropSize.width * scaleX,
      height: cropSize.height * scaleY,
      x: 0,
      y: 0,
    });
  };

  const handleCropComplete = (crop: PixelCrop) => {
    generateCroppedImage(crop);
  };

  const generateCroppedImage = (crop: PixelCrop) => {
    const image = imgRef.current;
    if (!image || !crop.width || !crop.height) {
      return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas size to the original cropSize (not the display size)
    canvas.width = cropSize.width;
    canvas.height = cropSize.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      cropSize.width,
      cropSize.height,
      0,
      0,
      cropSize.width,
      cropSize.height,
    );

    const previewUrl = canvas.toDataURL();
    setCroppedPreview(previewUrl);

    canvas.toBlob((blob: Blob | null) => {
      if (blob) {
        onCropComplete(blob);
      }
    });
  };

  return (
    <div className="flex h-full w-full rounded-lg bg-black-0 shadow-md p-6">
      <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => handleCropComplete(c)}
          aspect={1}
          locked
          ruleOfThirds
        >
          <img
            ref={imgRef}
            src={sourceImage}
            alt="Source"
            className="max-w-full"
            style={{ maxHeight: '360px' }}
            onLoad={handleImageLoad}
          />
        </ReactCrop>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
        {croppedPreview ? (
          <img
            src={croppedPreview}
            alt="Cropped preview"
            className="w-full h-full object-contain"
            style={{ width: cropSize.width, height: cropSize.height }}
          />
        ) : (
          <div className="text-gray-400">Crop preview will appear here</div>
        )}
      </div>
    </div>
  );
};
