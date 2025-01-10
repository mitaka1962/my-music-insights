'use client';

import { useState } from "react";
import clsx from "clsx";
import { SpotifySearchResultType, SpotifySearchParams, CardRenderProp } from "@/lib/definitions";
import SearchInput from "./search-input";
import SearchResultsList from "./search-results-list";

export default function SideSearch({
  card,
  disabledButtons = [],
}: {
  card: CardRenderProp;
  disabledButtons?: SpotifySearchResultType[];
}) {
  const [spotifySearchParams, setSpotifySearchParams] = useState<SpotifySearchParams>({});
  const [resultType, setResultType] = useState<SpotifySearchResultType>('track');

  const TypeButton = ({ type, label }: { type: SpotifySearchResultType, label: string }) => {
    return (
      <button
        className={clsx("btn btn-sm rounded-full", {
          "btn-neutral" : type === resultType,
        })}
        onClick={() => setResultType(type)}
        disabled={disabledButtons.includes(type)}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="h-full min-h-full overflow-y-scroll">
      <div className="flex flex-col divide-y divide-base-content/15 px-1.5 py-4">
        <SearchInput
          spotifySearchParams={spotifySearchParams}
          onClickSearch={(params) => setSpotifySearchParams(params)} />
        <div className="flex flex-col">
          <div className="flex gap-2 mx-2 my-4">
            <TypeButton type="track" label="トラック" />
            <TypeButton type="album" label="アルバム" />
          </div>
          <SearchResultsList
            spotifySearchParams={spotifySearchParams}
            resultType={resultType}
            card={card} />   
        </div>
      </div>
    </div>
  );
}
