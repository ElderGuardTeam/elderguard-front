'use client'

import Sidebar from "@/components/Sidebar";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row relative">
      <Sidebar/>
      {children}
    </div>
  );
}