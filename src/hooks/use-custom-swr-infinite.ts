import { BareFetcher } from "swr";
import useSWRInfinite, { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from "swr/infinite";

export function useCustomSWRInfinite<T, E>(
  getKey: SWRInfiniteKeyLoader,
  fetcher: BareFetcher<T> | null,
  checkHasNext: (lastData: T) => boolean,
  config?: SWRInfiniteConfiguration,
) {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize
  } = useSWRInfinite<T, E>(getKey, fetcher, config);

  const isLoadingMore = Boolean(
    !error &&
    data &&
    size > 1 && 
    typeof data[size - 1] === 'undefined'
  );
  const hasMore = Boolean(
    !error &&
    data &&
    data.length > 0 &&
    checkHasNext(data[data.length - 1])
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
    isLoadingMore,
    hasMore,
  }
}
