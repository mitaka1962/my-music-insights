'use client';

import SearchResultCardForSearch from "@/components/side-search/search-result-card-for-search";
import SideSearch from "@/components/side-search/side-search";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex divide-x divide-base-content/15">
      <div className="w-3/4 overflow-y-auto px-6 py-8">
        {children}
      </div>
      <div className="w-1/4 overflow-y-auto">
        <SideSearch card={
          (result) => <SearchResultCardForSearch result={result} />
        } />
      </div>
    </div>
  );
}
