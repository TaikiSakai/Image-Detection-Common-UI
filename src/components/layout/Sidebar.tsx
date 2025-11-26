import type { ReactNode } from 'react';
import { Button } from '@/components/common/button';
type SidebarProps = {
  children?: ReactNode;
};

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="w-64 h-full bg-white shadow-md overflow-y-auto bg-black-0">
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <Button className='hover:bg-black-2 shadow-elevation' onClick={() => console.log('clicked!')}>Load Images</Button>
        </div>
        <div className="flex flex-col gap-2 items-center">{children}</div>
      </div>
    </div>
  );
};
