import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useImageLoader } from '@/hooks/useImageLoader';

describe('useImageLoader', () => {
  let mockFileInput: HTMLInputElement;
  let createElementSpy: ReturnType<typeof vi.spyOn>;

  const setupFileReader = (mockDataUrl: string) => {
    globalThis.FileReader = vi.fn(function (this: FileReader) {
      this.readAsDataURL = vi.fn(() => {
        queueMicrotask(() => {
          Object.defineProperty(this, 'result', { value: mockDataUrl });
          const event = new ProgressEvent('load') as ProgressEvent<FileReader>;
          Object.defineProperty(event, 'target', { value: this });
          if (this.onload) {
            this.onload.call(this, event);
          }
        });
      });
      return this;
    }) as unknown as typeof FileReader;
  };

  const setMockFiles = (files: File[] | null) => {
    Object.defineProperty(mockFileInput, 'files', {
      value: files,
      writable: false,
    });
  };

  const loadFiles = (
    result: ReturnType<
      typeof renderHook<ReturnType<typeof useImageLoader>, []>
    >['result'],
    files: File[] | null,
  ) => {
    act(() => {
      result.current.loadImages();
    });

    setMockFiles(files);

    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      value: mockFileInput,
      writable: false,
    });

    act(() => {
      mockFileInput.onchange?.(event);
    });
  };

  beforeEach(() => {
    mockFileInput = document.createElement('input');
    createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(mockFileInput);
  });

  afterEach(() => {
    createElementSpy.mockRestore();
  });

  it('空の画像配列で初期化される', () => {
    const { result } = renderHook(() => useImageLoader());

    expect(result.current.images).toEqual([]);
  });

  it('loadImages呼び出し時にファイル入力が正しく設定される', () => {
    const { result } = renderHook(() => useImageLoader());

    act(() => {
      result.current.loadImages();
    });

    expect(document.createElement).toHaveBeenCalledWith('input');
    expect(mockFileInput.type).toBe('file');
    expect(mockFileInput.accept).toBe('.bmp,.jpg,.jpeg,.png');
    expect(mockFileInput.multiple).toBe(true);
  });

  it('有効な画像ファイルが読み込まれる', async () => {
    const { result } = renderHook(() => useImageLoader());

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockDataUrl = 'data:image/jpeg;base64,test';

    setupFileReader(mockDataUrl);
    loadFiles(result, [mockFile]);

    await waitFor(() => {
      expect(result.current.images).toHaveLength(1);
    });

    expect(result.current.images[0]).toMatchObject({
      file: mockFile,
      dataUrl: mockDataUrl,
      name: 'test.jpg',
    });
    expect(result.current.images[0].id).toBeDefined();
  });

  it('無効なファイルタイプがフィルタリングされる', async () => {
    const { result } = renderHook(() => useImageLoader());

    const validFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const invalidFile = new File(['test'], 'test.gif', { type: 'image/gif' });
    const mockDataUrl = 'data:image/jpeg;base64,test';

    setupFileReader(mockDataUrl);
    loadFiles(result, [validFile, invalidFile]);

    await waitFor(() => {
      expect(result.current.images).toHaveLength(1);
    });

    expect(result.current.images[0].name).toBe('test.jpg');
  });

  it('clearImages呼び出し時にすべての画像がクリアされる', async () => {
    const { result } = renderHook(() => useImageLoader());

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockDataUrl = 'data:image/jpeg;base64,test';

    setupFileReader(mockDataUrl);
    loadFiles(result, [mockFile]);

    await waitFor(() => {
      expect(result.current.images).toHaveLength(1);
    });

    act(() => {
      result.current.clearImages();
    });

    expect(result.current.images).toEqual([]);
  });

  it('removeImage呼び出し時にインデックス指定で特定の画像が削除される', async () => {
    const { result } = renderHook(() => useImageLoader());

    const mockFile1 = new File(['test1'], 'test1.jpg', { type: 'image/jpeg' });
    const mockFile2 = new File(['test2'], 'test2.jpg', { type: 'image/jpeg' });
    const mockDataUrl = 'data:image/jpeg;base64,test';

    setupFileReader(mockDataUrl);
    loadFiles(result, [mockFile1, mockFile2]);

    await waitFor(() => {
      expect(result.current.images).toHaveLength(2);
    });

    act(() => {
      result.current.removeImage(0);
    });

    expect(result.current.images).toHaveLength(1);
    expect(result.current.images[0].name).toBe('test2.jpg');
  });

  it('空のファイル選択が処理される', () => {
    const { result } = renderHook(() => useImageLoader());

    loadFiles(result, null);

    expect(result.current.images).toEqual([]);
  });

  describe('対応ファイル形式', () => {
    it.each([
      { extension: 'bmp', mimeType: 'image/bmp' },
      { extension: 'jpg', mimeType: 'image/jpeg' },
      { extension: 'png', mimeType: 'image/png' },
    ])(
      '$extension ファイルが受け入れられる',
      async ({ extension, mimeType }) => {
        const { result } = renderHook(() => useImageLoader());

        const mockFile = new File(['test'], `test.${extension}`, {
          type: mimeType,
        });
        const mockDataUrl = `data:${mimeType};base64,test`;

        setupFileReader(mockDataUrl);
        loadFiles(result, [mockFile]);

        await waitFor(() => {
          expect(result.current.images).toHaveLength(1);
        });

        expect(result.current.images[0].name).toBe(`test.${extension}`);
      },
    );
  });
});
