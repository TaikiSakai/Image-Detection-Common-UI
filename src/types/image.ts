export type LoadedImage = {
  file: File;
  dataUrl: string;
  name: string;
};

export type UseImageLoaderReturn = {
  images: LoadedImage[];
  loadImages: () => void;
  clearImages: () => void;
  removeImage: (index: number) => void;
};
