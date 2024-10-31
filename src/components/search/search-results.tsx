import { Album, SearchResult, SearchResultType, Track } from "@/lib/definitions";
import SearchResultCard from "./search-result-card";

export default function SearchResults({
  results,
  isLoading,
  error,
  type,
  params,
}: {
  results: SearchResult;
  isLoading: boolean;
  error: any;
  type: SearchResultType;
  params: URLSearchParams;
}) {
  const displayMessage = (msg: string) => (
    <div className="text-gray-600 h-16 w-full flex items-center justify-center">
      {msg}
    </div>
  );
  const resultSkeleton = (
    <div className="flex gap-3 py-2 px-2">
      <div className="skeleton w-[64px] h-[64px] rounded-md"></div>
      <div className="flex-auto min-w-0 h-[64px] flex flex-col py-1 gap-2">
        <div className="skeleton w-full h-4"></div>
        <div className="skeleton w-3/4 h-3"></div>
      </div>
    </div>
  );

  if (isLoading) return (
    <div className="animate-skeleton-fadein" >
      {resultSkeleton}
      {resultSkeleton}
      {resultSkeleton}
    </div>
  );

  if (error) {
    console.log(error.message);
    return displayMessage('Error has occurred! \u{1F62E}');
  }

  if (type === 'track') {
    return (results?.tracks.items.length === 0) ? (
      displayMessage('No results found... \u{1F622}')
    ) : (
      <>
        {results?.tracks.items.map(
          (item: Track) => (
            <SearchResultCard 
              key={item.id}
              type={type}
              id={item.id}
              params={params}
              image_url={item.album.images[item.album.images.length - 1].url}
              name={item.name}
              artist_name={item.artists[0].name} />
          )
        )}
      </>
    );
  }

  if (type === 'album') {
    return (results?.albums.items.length === 0) ? (
      displayMessage('No results found... \u{1F622}')
    ) : (
      <>
        {results?.albums.items.map(
          (item: Album) => (
            <SearchResultCard
              key={item.id}
              type={type}
              id={item.id}
              params={params}
              image_url={item.images[item.images.length - 1].url}
              name={item.name}
              artist_name={item.artists[0].name} />
          )
        )}
      </>
    );
  }
}
