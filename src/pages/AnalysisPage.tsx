import { Sidebar } from '@/components/layout';

export const AnalysisPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar>
        {/* 画像コンポーネントは後で追加されます */}
      </Sidebar>
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">画像分析</h1>
        <p className="text-gray-600">
          画像をアップロードして分析を開始してください。
        </p>
      </div>
    </div>
  );
};
