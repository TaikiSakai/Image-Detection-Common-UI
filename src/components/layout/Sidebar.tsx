import type { ReactNode } from 'react';

type SidebarProps = {
  children?: ReactNode;
};

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="w-64 h-full bg-white shadow-elevation overflow-y-auto bg-black-0">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">読み込んだ画像</h2>
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
};
