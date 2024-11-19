'use client';

import SearchResultCardForSearch from "@/components/side-search/search-result-card-for-search";
import SideSearch from "@/components/side-search/side-search";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex">
      <div className="w-3/4 overflow-y-auto min-h-full px-6 py-8">
        {children}
      </div>
      <div className="w-1/4 border-l border-base-content/15 overflow-y-scroll min-h-full">
        <SideSearch card={
          (result) => <SearchResultCardForSearch result={result} />
        } />
      </div>
    </div>
  );
}
