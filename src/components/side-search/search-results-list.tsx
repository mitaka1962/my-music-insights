import { SpotifySearchResultType, SpotifySearchParams, SpotifySearchResult, CardRenderProp, SpotifyTrackSearchResult, SpotifyAlbumSearchResult } from "@/lib/definitions";
import { isEmpty } from "@/lib/utils";
import InfiniteScroll from "./infinite-scroll";
import SearchResultsBlock from "./search-results-block";
import { useEffect } from "react";
import { useCustomSWRInfinite } from "@/hooks/use-custom-swr-infinite";

const fetcher = async (url: string): Promise<SpotifySearchResult> =>{
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  };

  const result = await response.json();
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

  const checkNext = (data: SpotifySearchResult) => {
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
    checkNext,
    { revalidateFirstPage: false },
  );
  
  // Reset the page size to 1 whenever the search parameters or type tab changes
  useEffect(() => {
    setSize(1);
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
    })
  };

  // Initial loading
  if (isLoading) return <ResultSkeleton />;

  return (
    <>
      <InfiniteScroll
        options={{ rootMargin: '0px 0px 100px 0px' }}   // (issue) a positive rootMargin doesn't work
        error={error}
        hasMore={hasMore}
        onEndReached={handleEndReached}
        onClickError={handleClickError}
      >
        {data?.map((item, index) => (
          <SearchResultsBlock
            key={index}
            results={item}
            resultType={resultType}
            card={card} />
        ))}
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
