import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function InfiniteScroll({
  children,
  options,
  onEndReached,
  fallback,
  hasMore,
}: {
  children: React.ReactNode;
  options: IntersectionObserverInit;
  onEndReached: () => void;
  fallback?: React.ReactNode;
  hasMore: boolean;
}) {
  const { ref } = useIntersectionObserver(
    options,
    (entry) => {
      if (entry.isIntersecting) onEndReached();
    }
  );

  return (
    <>
      {children}
      <div className="min-h-8" ref={ref}>
        {hasMore && fallback}
      </div>
    </>
  );
}
