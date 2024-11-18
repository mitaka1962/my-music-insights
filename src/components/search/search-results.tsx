import { Album, SearchResult, SearchResultType, Track } from "@/lib/definitions";
import SearchResultCard from "./search-result-card";
import { getSpotifyImageUrl } from "@/lib/utils";

export default function SearchResults({
  results,
  isLoading,
  error,
  type,
}: {
  results: SearchResult | undefined;
  isLoading: boolean;
  error: any;
  type: SearchResultType;
}) {
  // loading
  if (isLoading) {
    return (
      <div className="animate-skeleton-fadein" >
        <ResultSkeleton />
        <ResultSkeleton />
        <ResultSkeleton />
      </div>
    );
  }

  // error
  if (error) {
    console.log(error.message);
    return <DisplayMessage>{'Error has occurred! \u{1F62E}'}</DisplayMessage>;
  }

  // success
  const items = (type === 'track') ? results?.tracks.items : results?.albums.items;

  return (items?.length === 0) ? (
    <DisplayMessage>{'No results found... \u{1F622}'}</DisplayMessage>
  ) : (
    <>
      {items?.map((item: Track | Album) => (
        <SearchResultCard 
          key={item.id}
          type={type}
          id={item.id}
          image_url={getSpotifyImageUrl(item)}
          name={item.name}
          artist_name={item.artists[0].name} />
      ))}
    </>
  );
}

function DisplayMessage({ children }: { children: string }) {
  return (
    <div className="text-base-content/80 h-16 w-full flex items-center justify-center">
      {children}
    </div>
  );  
}

function ResultSkeleton() {
  return (
    <div className="flex gap-3 py-2 px-2">
      <div className="skeleton w-[64px] h-[64px] rounded-md"></div>
      <div className="flex-auto min-w-0 h-[64px] flex flex-col py-1 gap-2">
        <div className="skeleton w-full h-4"></div>
        <div className="skeleton w-3/4 h-3"></div>
      </div>
    </div>
  );
}
