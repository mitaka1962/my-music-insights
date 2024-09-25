import SideSearch from "@/components/search/side-search";
import { Suspense } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadingSpinner = (
    <div className="flex w-full h-full justify-center items-center">
      <span className="loading loading-spinner loading-lg text-gray-500"></span>
    </div>
  );

  return (
    <div className="h-full w-full flex">
      <main className="w-3/4 overflow-y-auto min-h-full">
        {children}
      </main>
      <div className="w-1/4 border-l overflow-y-scroll min-h-full">
        <Suspense fallback={loadingSpinner}>
          <SideSearch />
        </Suspense>        
      </div>
    </div>
  );
}