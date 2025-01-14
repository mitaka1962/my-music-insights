'use client';

import MylistCard from "@/components/home/mylist-card";
import { MylistCardData } from "@/lib/definitions";
import { useCustomSWRInfinite } from "@/hooks/use-custom-swr-infinite";
import InfiniteScroll from "../side-search/infinite-scroll";

interface ResponseType {
  mylists: MylistCardData[],
  cursor: string
};

const LIMIT = 12;

const getKey = (index: number, previousData: ResponseType | null) => {
  if (index === 0) {
    return `/api/latest-mylists?limit=${LIMIT}`;
  }
  if (!previousData?.cursor) {
    return null;
  }
  return `/api/latest-mylists?limit=${LIMIT}&cursor=${previousData.cursor}`;
};

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const info =  await response.json();
    console.error('Failed to fetch latest mylists:', info.message);
    throw new Error('Failed to fetch latest mylists');
  }
  
  // parse the response as JSON,
  // and convert the createdAt field (string) to a Date object
  const jsonStr = await response.text();
  const result = JSON.parse(jsonStr, (key, value) => {
    if (key === 'createdAt') {
      return new Date(value);
    }
    return value;
  })

  return result;
}

export default function SharedMylists() {
  // const mylists = await getBatchMylists();
  // const trackIdsList = getTrackIdsList(mylists);  
  // const imageUrls = await getSeveralTracksImageUrls(trackIdsList.join());

  const {
    data,
    error,
    mutate,
    isLoading,
    isLoadingMore,
    isValidating,
    hasMore,
    size,
    setSize,
  } = useCustomSWRInfinite<ResponseType, Error>(
    getKey,
    fetcher,
    (data) => {
      return Boolean(data.cursor);
    },
  );
  
  const handleEndReached = () => {
    if (hasMore && !isLoadingMore) {
      setSize(size + 1);
    }    
  };

  const handleClickError = () => {
    // only revalidate the last page
    // (the first argument is required for bound mutation)
    mutate(data, {
      revalidate: (_, key) => {
        return key === getKey(size - 1, data ? data[size - 2] : null);
      }
    });
  };

  return (
    <InfiniteScroll
      hasMore={hasMore}
      error={error}
      onEndReached={handleEndReached}
      onClickError={handleClickError}
    >
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && <SkeletonMylists />}
        {data?.map((batch) => (
          batch.mylists.map((mylist) => (
            <MylistCard
              key={mylist.id}
              id={mylist.id}
              title={mylist.name}
              date={mylist.createdAt}
              userName={mylist.user.name}
              userColor={mylist.user.imageColor}
              imageUrls={mylist.imageUrls} />
          ))
        ))}
      </div>
    </InfiniteScroll>    
  );
}

function SkeletonMylists() { 
  return (
    <>
      <MylistCardSkeleton />
      <MylistCardSkeleton />
      <MylistCardSkeleton />
      <MylistCardSkeleton />
      <MylistCardSkeleton />
      <MylistCardSkeleton />
    </>
  );
}

function MylistCardSkeleton() {
  return (
    <div className="card card-bordered border-base-content/10">
      <div className="card-body p-6 pb-4">
        <h3 className="card-title">
          <div className="skeleton w-60 max-w-full h-8"></div> 
        </h3>
        <div className="skeleton w-20 max-w-full h-4"></div>
        <div className="skeleton w-28 max-w-full h-4 self-end"></div>
      </div>
      <figure>
        <div className="w-full grid grid-cols-3 gap-x-1">
          <div className="skeleton aspect-square w-full rounded-none"></div>
          <div className="skeleton aspect-square w-full rounded-none"></div>
          <div className="skeleton aspect-square w-full rounded-none"></div>
        </div>        
      </figure>
    </div>
  );
}
