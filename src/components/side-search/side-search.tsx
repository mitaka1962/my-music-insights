'use client'

import { useState } from "react";
import clsx from "clsx";
import { SearchResultType, SpotifySearchParams, CardRenderProp } from "@/lib/definitions";
import SearchInput from "./search-input";
import SearchResults from "./search-results";
import { isEmpty } from "@/lib/utils";
import useSWRImmutable from "swr/immutable";

const fetcher = async (params: SpotifySearchParams) => {
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

export default function SideSearch({
  card,
  disableAlbum = false,
}: {
  card: CardRenderProp;
  disableAlbum?: boolean;
}) {
  const [spotifySearchParams, setSpotifySearchParams] = useState<SpotifySearchParams>({});

  // Type of displayed search results: track or album
  const [type, setType] = useState<SearchResultType>('track');

  // Fetch data from the Spotify API's search endpoint (via my own API to run the fetch in a server side)
  const {data, error, isLoading} = useSWRImmutable(
    isEmpty(spotifySearchParams) ? null : spotifySearchParams,
    fetcher
  );  

  return (
    <div className="flex flex-col min-h-full divide-y divide-base-content/15 px-1.5 py-4">
      <div className="flex-none">
        <SearchInput spotifySearchParams={spotifySearchParams} setSpotifySearchParams={setSpotifySearchParams} />
      </div>
      <div className="grow flex flex-col">
        <div className="flex-none flex gap-2 mx-2 my-4">
          <button
            className={clsx("btn btn-sm rounded-full", {
              "btn-neutral" : type === 'track',
            })}
            onClick={() => setType('track')}>トラック</button>
          <button 
            className={clsx("btn btn-sm rounded-full", {
              "btn-neutral" : type === 'album',
            })}
            disabled={disableAlbum}
            onClick={() => setType('album')}>アルバム</button>
        </div>
        <div className="grow flex flex-col">
          <SearchResults
            results={data}
            isLoading={isLoading}
            error={error}
            type={type}
            card={card} />
        </div>
      </div>      
    </div>
  );
}
