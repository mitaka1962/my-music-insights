'use client';

import LoadingSpinner from "@/components/loading-spinner";
import dynamic from "next/dynamic";

export default function Page() {
  return (
    <main className="grid grid-rows-[auto_minmax(0,1fr)] px-8 py-10 max-w-2xl mx-auto min-h-full">
      <h1 className="text-2xl font-bold border-b border-base-content/15 px-2 pb-4 mb-8">設定</h1>
      <div className="px-2">
        <SettingsList />
      </div>      
    </main>
  );
}

// disable SSR to prevent Hydration Error (caused by ThemeDropdown component to render a browser's theme setting)
const SettingsList = dynamic(() => import('@/components/settings/settings-list'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);
