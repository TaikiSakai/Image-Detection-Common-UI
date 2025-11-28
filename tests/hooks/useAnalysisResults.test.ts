import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAnalysisResults } from '@/hooks/useAnalysisResults';
import type { Prediction } from '@/types';

describe('useAnalysisResults', () => {
  it('空の結果配列で初期化される', () => {
    const { result } = renderHook(() => useAnalysisResults());

    expect(result.current.results).toEqual([]);
  });

  it('新しい結果を追加できる', () => {
    const { result } = renderHook(() => useAnalysisResults());

    const mockPredictions: Prediction[] = [
      { className: 'Cat', probability: 0.95 },
      { className: 'Dog', probability: 0.05 },
    ];

    act(() => {
      result.current.addResult(
        'source-image-id',
        'data:image/png;base64,mock',
        mockPredictions,
      );
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0]).toMatchObject({
      sourceImageId: 'source-image-id',
      croppedImageUrl: 'data:image/png;base64,mock',
      predictions: mockPredictions,
    });
    expect(result.current.results[0].id).toBeDefined();
  });

  it('複数の結果を追加できる', () => {
    const { result } = renderHook(() => useAnalysisResults());

    const mockPredictions1: Prediction[] = [
      { className: 'Cat', probability: 0.95 },
    ];
    const mockPredictions2: Prediction[] = [
      { className: 'Dog', probability: 0.85 },
    ];

    act(() => {
      result.current.addResult(
        'source-1',
        'data:image/png;base64,mock1',
        mockPredictions1,
      );
      result.current.addResult(
        'source-2',
        'data:image/png;base64,mock2',
        mockPredictions2,
      );
    });

    expect(result.current.results).toHaveLength(2);
    expect(result.current.results[0].sourceImageId).toBe('source-1');
    expect(result.current.results[1].sourceImageId).toBe('source-2');
  });

  it('IDを指定して結果を削除できる', () => {
    const { result } = renderHook(() => useAnalysisResults());

    const mockPredictions: Prediction[] = [
      { className: 'Cat', probability: 0.95 },
    ];

    act(() => {
      result.current.addResult(
        'source-1',
        'data:image/png;base64,mock1',
        mockPredictions,
      );
      result.current.addResult(
        'source-2',
        'data:image/png;base64,mock2',
        mockPredictions,
      );
    });

    const resultId = result.current.results[0].id;

    expect(result.current.results).toHaveLength(2);

    act(() => {
      result.current.removeResult(resultId);
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].sourceImageId).toBe('source-2');
  });

  it('存在しないIDを削除しても結果に影響しない', () => {
    const { result } = renderHook(() => useAnalysisResults());

    const mockPredictions: Prediction[] = [
      { className: 'Cat', probability: 0.95 },
    ];

    act(() => {
      result.current.addResult(
        'source-1',
        'data:image/png;base64,mock1',
        mockPredictions,
      );
    });

    expect(result.current.results).toHaveLength(1);

    act(() => {
      result.current.removeResult('non-existent-id');
    });

    expect(result.current.results).toHaveLength(1);
  });

  it('すべての結果をクリアできる', () => {
    const { result } = renderHook(() => useAnalysisResults());

    const mockPredictions: Prediction[] = [
      { className: 'Cat', probability: 0.95 },
    ];

    act(() => {
      result.current.addResult(
        'source-1',
        'data:image/png;base64,mock1',
        mockPredictions,
      );
      result.current.addResult(
        'source-2',
        'data:image/png;base64,mock2',
        mockPredictions,
      );
    });

    expect(result.current.results).toHaveLength(2);

    act(() => {
      result.current.clearResults();
    });

    expect(result.current.results).toEqual([]);
  });

  it('各結果に一意のIDが生成される', () => {
    const { result } = renderHook(() => useAnalysisResults());

    const mockPredictions: Prediction[] = [
      { className: 'Cat', probability: 0.95 },
    ];

    act(() => {
      result.current.addResult(
        'source-1',
        'data:image/png;base64,mock1',
        mockPredictions,
      );
      result.current.addResult(
        'source-1',
        'data:image/png;base64,mock1',
        mockPredictions,
      );
    });

    expect(result.current.results).toHaveLength(2);
    expect(result.current.results[0].id).not.toBe(result.current.results[1].id);
  });
});
