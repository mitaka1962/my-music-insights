'use client';

import SearchResultCardForSearch from "@/components/side-search/search-result-card-for-search";
import SideSearch from "@/components/side-search/side-search";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
      <div className="overflow-y-auto min-h-full px-6 py-8">
        {children}
      </div>
      <div className="border-l border-base-content/15 overflow-y-scroll min-h-full">
        <SideSearch card={
          (result) => <SearchResultCardForSearch result={result} />
        } />
      </div>
    </div>
  );
}
