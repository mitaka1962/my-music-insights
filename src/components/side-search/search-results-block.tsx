import { Album, SpotifySearchResult, CardRenderProp, SpotifySearchResultType, Track } from "@/lib/definitions";
import { Fragment } from "react";

export default function SearchResultsBlock({
  results,
  type,
  card,
}: {
  results: SpotifySearchResult | undefined;
  type: SpotifySearchResultType;
  card: CardRenderProp;
}) {
  const items = (type === 'track') ? results?.tracks.items : results?.albums.items;

  return (items?.length === 0) ? (
    <DisplayMessage msg={'No results found... \u{1F622}'} />
  ) : (
    <>
      {items?.map((item: Track | Album | null) => (
        item && <Fragment key={item.id}>{card(item)}</Fragment>
      ))}
    </>
  );
}

function DisplayMessage({ msg }: { msg: string }) {
  return (
    <div className="text-base-content/80 h-16 w-full flex items-center justify-center">
      {msg}
    </div>
  );  
}
