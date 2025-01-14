import { SpotifySearchResultType, SpotifySearchParams, SpotifySearchResult, CardRenderProp, SpotifyTrackSearchResult, SpotifyAlbumSearchResult } from "@/lib/definitions";
import { isEmpty } from "@/lib/utils";
import InfiniteScroll from "./infinite-scroll";
import SearchResultsBlock from "./search-results-block";
import { useEffect } from "react";
import { useCustomSWRInfinite } from "@/hooks/use-custom-swr-infinite";

const fetcher = async (url: string): Promise<SpotifySearchResult> =>{
  const response = await fetch(url);
  const result = await response.json();

  if (!response.ok) {
    console.error('Failed to fetch the search result:', result.message);
    throw new Error('Failed to fetch the search result');
  };

  return result;
}

export default function SearchResultsList({
  spotifySearchParams,
  resultType,
  card,
}: {
  spotifySearchParams: SpotifySearchParams;
  resultType: SpotifySearchResultType;
  card: CardRenderProp;
}) {
  // this function returns an argument(url) for the fetcher  
  const getKey = (pageIndex: number) => {
    if (isEmpty(spotifySearchParams)) return null;

    const searchParams = new URLSearchParams(spotifySearchParams);
    searchParams.append('type', resultType);
    searchParams.append('page', pageIndex.toString());

    // Use my app's API endopoint to fetch data from Spotify's search API
    // so that you can use the environment variables on the server
    return `/api/search?${searchParams.toString()}`;
  };

  const checkHasNext = (data: SpotifySearchResult) => {
    if (resultType === 'track') {
      return Boolean((data as SpotifyTrackSearchResult).tracks.next);
    } else {
      return Boolean((data as SpotifyAlbumSearchResult).albums.next);
    }
  };

  const {
    data,
    error,
    isLoading,
    mutate,
    size,
    setSize,
    isLoadingMore,
    hasMore
  } = useCustomSWRInfinite<SpotifySearchResult, Error>(
    getKey,
    fetcher,
    checkHasNext,
    { revalidateFirstPage: false },
  );
  
  // Reset the page size to 1 whenever the search button clicked or type tab changes,
  // but only if there is cached data (which may have a length greater than 1)
  useEffect(() => {
    if (!isLoading) {
      setSize(1);
    }    
  }, [spotifySearchParams, resultType]);

  const handleEndReached = () => {
    if (!isLoadingMore && hasMore) {      
      setSize(size => size + 1);
    }
  };

  const handleClickError = () => {
    // only revalidate the last page
    // (the first argument is required for bound mutation)
    mutate(data, {
      revalidate: (_, key) => key === getKey(size - 1)
    });
  };

  return (
    <>
      <InfiniteScroll
        options={{ rootMargin: '0px 0px 100px 0px' }}   // (issue) a positive rootMargin doesn't work
        error={error}
        hasMore={hasMore}
        onEndReached={handleEndReached}
        onClickError={handleClickError}
      >
        {isLoading && <ResultSkeleton />}
        {data?.map((batch) => {
          const results = (resultType === 'track') ?
            (batch as SpotifyTrackSearchResult).tracks :
            (batch as SpotifyAlbumSearchResult).albums;

          return (
            <SearchResultsBlock
              key={results.href}
              results={results.items}
              card={card} />
          );
        })}
      </InfiniteScroll>
    </>    
  );
}

function ResultSkeleton() {  
  return (
    <div className="animate-fadein-up-20" >
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="flex gap-3 p-2">
      <div className="skeleton w-[64px] h-[64px] rounded-md"></div>
      <div className="flex-auto min-w-0 h-[64px] flex flex-col py-1 gap-2">
        <div className="skeleton w-full h-4"></div>
        <div className="skeleton w-3/4 h-3"></div>
      </div>
    </div>
  );
}
