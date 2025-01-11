import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useRef, useCallback } from "react";
import LoadingSpinner from "@/components/loading-spinner";

export default function InfiniteScroll({
  children,
  hasMore,
  error,
  onEndReached,
  onClickError,
  options,
  fallback,
}: {
  children: React.ReactNode;
  hasMore: boolean;
  error: Error | undefined;
  onEndReached: () => void;
  onClickError: () => void;
  options?: IntersectionObserverInit;
  fallback?: React.ReactNode;
}) {
  // Store the callback in a `ref` to access the latest instance
  // inside the `useCallback` without triggering a rerender
  const onEndReachedRef = useRef(onEndReached);
  onEndReachedRef.current = onEndReached;

  // read primitive values from options to prevent unnecessary rerenders
  const { root, rootMargin, threshold } = options ?? {};

  // ref callback
  const initIntersectionObserver = useCallback((node: HTMLDivElement | null) => {    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onEndReachedRef.current()
      };
    }, { root, rootMargin, threshold });

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [root, rootMargin, threshold]);

  return (
    <>
      {children}
      <div ref={initIntersectionObserver}></div>
      {error && (
        <ReloadComponent onClickError={onClickError} />
      )}
      {hasMore &&
        (fallback ?? <LoadingSpinner />)
      }
    </>
  );
}

function ReloadComponent({
  onClickError
}: {
  onClickError: () => void
}) {
  return (
    <div className="flex flex-col items-center text-base-content/80 p-2 gap-2">
      <p className="text-sm">{'エラーが発生しました。 \u{1F62E}'}</p>
      <button
        className="btn btn-sm text-xs btn-neutral gap-1"
        onClick={onClickError}
      >
        再読み込み
        <ArrowPathIcon className="w-4" />
      </button>
    </div>
  );
}
