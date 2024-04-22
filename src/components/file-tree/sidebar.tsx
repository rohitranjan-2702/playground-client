import React, { ReactNode } from "react";

export const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen border-solid border-2 border-gray-800 pt-0.5 bg-zinc-950">
      {children}
    </div>
  );
};

export default Sidebar;
