import { Album, SpotifySearchResult, CardRenderProp, SpotifySearchResultType, Track, SpotifyAlbumSearchResult, SpotifyTrackSearchResult } from "@/lib/definitions";
import { Fragment } from "react";

export default function SearchResultsBlock({
  results,
  resultType,
  card,
}: {
  results: SpotifySearchResult;
  resultType: SpotifySearchResultType;
  card: CardRenderProp;
}) {
  let items;
  if (resultType === 'track') {
    items = (results as SpotifyTrackSearchResult).tracks.items;
  } else {
    items = (results as SpotifyAlbumSearchResult).albums.items;
  }

  return (items?.length === 0) ? (
    <div className="flex flex-col items-center text-base-content/80 p-2 gap-2">
      <p className="text-sm">{'検索結果が見つかりませんでした… \u{1F622}'}</p>
    </div>
  ) : (
    <>
      {items?.map((item: Track | Album | null) => (
        item && (
          <Fragment key={item.id}>{card(item)}</Fragment>
        )
      ))}
    </>
  );
}
