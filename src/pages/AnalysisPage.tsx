import { Sidebar } from '@/components/layout';
import { PredictionResult } from '@/components/prediction/PredictionResult';
import { mockPredictionResponse } from '@/__mocks__/predictionData';

export const AnalysisPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <div className='my-10'>image</div>
        <div className='my-10'>image</div>
        <div className='my-10'>image</div>
        <div className='my-10'>image</div>
        <div className='my-10'>image</div>
        <div className='my-10'>image</div>
        <div className='my-10'>image</div>
        <div className='my-10'>image</div>
        <div className='my-10'>image</div>
      </Sidebar>
      <main className="flex-1 px-10 py-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
          <div className="grid grid-rows-[auto] gap-4 col-span-7 content-start">
            <div className="row-span-5">
              <PredictionResult predictions={mockPredictionResponse.predictions} />
            </div>
            <div className="row-span-25 bg-black-0 p-4">
              test
            </div>
            <div className="row-span-15 bg-black-0 p-4">
              test
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
