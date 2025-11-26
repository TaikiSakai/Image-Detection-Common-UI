import { Sidebar } from '@/components/layout';

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
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 auto-rows-max">
          <div className="grid grid-rows-[auto] gap-2 col-span-7 bg-white shadow-elevation rounded-lg p-4">
            <div className="bg-black-0 p-4">
              test
            </div>
            <div className="bg-black-0 p-4">
              test
            </div>
            <div className="bg-black-0 p-4">
              test
            </div>
            <div className="bg-black-0 p-4">
              test
            </div>
            <div className="bg-black-0 p-4">
              test
            </div>
            <div className="bg-black-0 p-4">
              test
            </div>
          </div>
          <div className="col-span-3 bg-white shadow-elevation rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Column 2</h2>
            <div>
              {/* Column 2 content */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
