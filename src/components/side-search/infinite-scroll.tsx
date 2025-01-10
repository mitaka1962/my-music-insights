import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";
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
  const { ref } = useIntersectionObserver(
    options,
    (entry) => {
      if (entry.isIntersecting) onEndReached?.();
    }
  );

  return (
    <>
      {children}
      <div ref={ref}></div>
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
