import { SpotifySearchResultType, SpotifySearchParams, SpotifySearchResult, CardRenderProp } from "@/lib/definitions";
import { isEmpty } from "@/lib/utils";
import InfiniteScroll from "./infinite-scroll";
import SearchResultsBlock from "./search-results-block";
import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";
import LoadingSpinner from "@/components/loading-spinner";

const fetcher = (url: string): Promise<SpotifySearchResult> =>
  fetch(url).then((res) => res.json());

export default function SearchResultsList({
  spotifySearchParams,
  resultType,
  card,
}: {
  spotifySearchParams: SpotifySearchParams;
  resultType: SpotifySearchResultType;
  card: CardRenderProp;
}) {
  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    (pageIndex: number) => {
      if (isEmpty(spotifySearchParams)) return null;
  
      const searchParams = new URLSearchParams(spotifySearchParams);
      searchParams.append('type', resultType);
      searchParams.append('page', pageIndex.toString());

      /* Fetch data from the Spotify API's search endpoint 
      (via my app's API to run the fetch on the server) */
      return `/api/search?${searchParams.toString()}`;
    },
    fetcher,
    { revalidateFirstPage: false }
  );
  const isLoadingMore = Boolean(size > 0 && data && typeof data[size - 1] === "undefined");
  const hasMore = Boolean(data);

  // Reset the page size to 1 whenever the search parameters or type tab changes
  useEffect(() => {
    setSize(1);
  }, [spotifySearchParams, resultType]);

  const handleEndReached = () => {
    if (!isLoadingMore && hasMore) {
      setSize(size => size + 1);
    }
  };

  if (isLoading)
    return <ResultSkeleton />;

  if (error) {
    console.log(error.message);
    return (
      <div className="text-base-content/80 h-16 w-full flex items-center justify-center">
        {'Error has occurred! \u{1F62E}'}
      </div>
    )
  }

  return (
    <InfiniteScroll
      options={{ rootMargin: '0px 0px 100px 0px' }}   // (issue) a positive rootMargin doesn't work 
      onEndReached={handleEndReached}
      fallback={<LoadingSpinner />}
      hasMore={hasMore}
    >
      {data?.map((item, index) => (
        <SearchResultsBlock
          key={index}
          results={item}
          type={"track"}
          card={card} />
      ))}
    </InfiniteScroll>
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
    <div className="flex gap-3 py-2 px-2">
      <div className="skeleton w-[64px] h-[64px] rounded-md"></div>
      <div className="flex-auto min-w-0 h-[64px] flex flex-col py-1 gap-2">
        <div className="skeleton w-full h-4"></div>
        <div className="skeleton w-3/4 h-3"></div>
      </div>
    </div>
  );
}
