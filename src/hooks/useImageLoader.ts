import { useState, useCallback } from 'react';
import type { LoadedImage, UseImageLoaderReturn } from '@/types/image';

const ALLOWED_EXTENSIONS = ['.bmp', '.jpg', '.jpeg', '.png'];
const ALLOWED_MIME_TYPES = ['image/bmp', 'image/jpeg', 'image/png'];

export const useImageLoader = (): UseImageLoaderReturn => {
  const [images, setImages] = useState<LoadedImage[]>([]);

  const loadImages = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ALLOWED_EXTENSIONS.join(',');
    input.multiple = true;

    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;

      if (!files || files.length === 0) {
        return;
      }

      const validFiles = Array.from(files).filter((file) => {
        const extension = file.name
          .toLowerCase()
          .substring(file.name.lastIndexOf('.'));
        return (
          ALLOWED_EXTENSIONS.includes(extension) &&
          ALLOWED_MIME_TYPES.includes(file.type)
        );
      });

      const loadedImages = await Promise.all(
        validFiles.map(
          (file) =>
            new Promise<LoadedImage>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve({
                  id: crypto.randomUUID(),
                  file,
                  dataUrl: reader.result as string,
                  name: file.name,
                });
              };
              reader.onerror = () => reject(reader.error);
              reader.readAsDataURL(file);
            }),
        ),
      );

      setImages((prev) => [...prev, ...loadedImages]);
    };

    input.click();
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return {
    images,
    loadImages,
    clearImages,
    removeImage,
  };
};
