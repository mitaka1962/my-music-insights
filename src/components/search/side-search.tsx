'use client'

import { useState } from "react";
import clsx from "clsx";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { SearchResultType } from "@/lib/definitions";
import SearchInput from "./search-input";
import SearchResults from "./search-results";

const searchParamsToObjct = (params: URLSearchParams) => {
  if (params.has('q') || params.has('artist') || params.has('album'))
    return Object.fromEntries(params.entries());
  return null;
};

const fetcher = async (params: { q?: string; artist?: string; album?: string; }) => { 
  const queryArray = [
    params.q,
    params.artist && `artist:${params.artist}`,
    params.album && `album:${params.album}`,
  ];
  const query = queryArray.filter(Boolean).join(' ');
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);  
  const results = await response.json();
  return results;
};

export default function SideSearch() {
  const searchParams = useSearchParams();

  // Type of displayed search results: track or album
  const [type, setType] = useState<SearchResultType>('track');

  // Fetch data from the Spotify API's search endpoint
  const {data, error, isLoading} = useSWR(searchParamsToObjct(searchParams), fetcher);

  return (
    <div className="flex flex-col px-1.5 h-full divide-y">
      <div className="flex-none">
        <SearchInput searchParams={searchParams} />
      </div>
      <div className="grow flex flex-col">
        <div className="flex-none flex gap-2 px-2 pt-4">
          <button
            className={clsx("btn btn-sm rounded-full", {"btn-neutral" : type === 'track'})}
            onClick={() => setType('track')}>トラック</button>
          <button 
            className={clsx("btn btn-sm rounded-full", {"btn-neutral" : type === 'album'})}
            onClick={() => setType('album')}>アルバム</button>
        </div>
        <div className="grow flex flex-col py-4">
          <SearchResults
            results={data}
            isLoading={isLoading}
            error={error}
            type={type}
            params={searchParams} />
        </div>
      </div>      
    </div>
  );
}
