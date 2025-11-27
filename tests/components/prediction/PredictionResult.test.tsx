import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  mockPredictionResponse,
  mockPredictionResponseWith10Classes,
} from '@/__mocks__/predictionData';
import { PredictionResult } from '@/components/prediction/PredictionResult';

describe('PredictionResult', () => {
  it('予測結果が正しく表示される', () => {
    render(
      <PredictionResult predictions={mockPredictionResponse.predictions} />,
    );

    expect(screen.getByText('Class_1')).toBeInTheDocument();
    expect(screen.getByText('95.00%')).toBeInTheDocument();
    expect(screen.getByText('Class_2')).toBeInTheDocument();
    expect(screen.getByText('3.00%')).toBeInTheDocument();
  });

  it('5個以下の予測結果では5列グリッドレイアウトになる', () => {
    const { container } = render(
      <PredictionResult predictions={mockPredictionResponse.predictions} />,
    );

    const layoutDiv = container.querySelector('.grid.grid-cols-5');
    expect(layoutDiv).toBeInTheDocument();
  });

  it('6個以上の予測結果では2行グリッドレイアウトになる', () => {
    const { container } = render(
      <PredictionResult
        predictions={mockPredictionResponseWith10Classes.predictions}
      />,
    );

    const layoutDiv = container.querySelector('.grid.grid-rows-2');
    expect(layoutDiv).toBeInTheDocument();
  });

  it('最大10個の予測結果のみ表示される', () => {
    const predictions = [
      ...mockPredictionResponseWith10Classes.predictions,
      { className: 'Class_11', probability: 0.001 },
      { className: 'Class_12', probability: 0.001 },
    ];

    render(<PredictionResult predictions={predictions} />);

    expect(screen.getByText('Class_1')).toBeInTheDocument();
    expect(screen.getByText('Class_10')).toBeInTheDocument();
    expect(screen.queryByText('Class_11')).not.toBeInTheDocument();
    expect(screen.queryByText('Class_12')).not.toBeInTheDocument();
  });

  it('確率がパーセント表示で小数点2桁まで表示される', () => {
    render(
      <PredictionResult predictions={mockPredictionResponse.predictions} />,
    );

    expect(screen.getByText('95.00%')).toBeInTheDocument();
    expect(screen.getByText('3.00%')).toBeInTheDocument();
    expect(screen.getByText('1.00%')).toBeInTheDocument();
    expect(screen.getByText('0.50%')).toBeInTheDocument();
  });

  it('dividerクラスが適用されている', () => {
    const { container } = render(
      <PredictionResult predictions={mockPredictionResponse.predictions} />,
    );

    const layoutDiv = container.querySelector('.divide-x.divide-black-2');
    expect(layoutDiv).toBeInTheDocument();
  });

  it('10個の予測結果すべてが表示される', () => {
    render(
      <PredictionResult
        predictions={mockPredictionResponseWith10Classes.predictions}
      />,
    );

    expect(screen.getByText('Class_1')).toBeInTheDocument();
    expect(screen.getByText('Class_2')).toBeInTheDocument();
    expect(screen.getByText('Class_3')).toBeInTheDocument();
    expect(screen.getByText('Class_4')).toBeInTheDocument();
    expect(screen.getByText('Class_5')).toBeInTheDocument();
    expect(screen.getByText('Class_6')).toBeInTheDocument();
    expect(screen.getByText('Class_7')).toBeInTheDocument();
    expect(screen.getByText('Class_8')).toBeInTheDocument();
    expect(screen.getByText('Class_9')).toBeInTheDocument();
    expect(screen.getByText('Class_10')).toBeInTheDocument();
  });

  it('クラス名が左寄せで表示される', () => {
    const { container } = render(
      <PredictionResult predictions={mockPredictionResponse.predictions} />,
    );

    const classNameElement = container.querySelector('.text-left');
    expect(classNameElement).toBeInTheDocument();
    expect(classNameElement).toHaveTextContent('Class_1');
  });

  it('確率が右寄せで表示される', () => {
    const { container } = render(
      <PredictionResult predictions={mockPredictionResponse.predictions} />,
    );

    const probabilityElement = container.querySelector('.text-right');
    expect(probabilityElement).toBeInTheDocument();
    expect(probabilityElement).toHaveTextContent('95.00%');
  });
});
