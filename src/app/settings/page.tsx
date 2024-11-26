import dynamic from "next/dynamic";

export default function Page() {
  return (
    <main className="grid grid-rows-[auto_minmax(0,1fr)] px-6 py-12 max-w-2xl mx-auto min-h-full">
      <h1 className="text-2xl font-bold border-b border-base-content/15 px-1 pb-4 mb-10">設定</h1>
      <div className="px-1 h-full">
        <SettingsList />
      </div>      
    </main>
  );
}

const SettingsList = dynamic(
  () => import('@/components/settings/settings-list'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

function LoadingSpinner() {
  return (
    <div className="grid place-items-center py-4">
      <span className="loading loading-spinner"></span>
    </div>
  );
}
