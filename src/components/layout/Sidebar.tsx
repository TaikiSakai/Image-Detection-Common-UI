import type { ReactNode } from 'react';

type SidebarProps = {
  children?: ReactNode;
};

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="w-64 h-full bg-white shadow-md overflow-y-auto bg-black-0">
      <div className="p-4">
        <div className="flex flex-col gap-2 items-center">{children}</div>
      </div>
    </div>
  );
};
