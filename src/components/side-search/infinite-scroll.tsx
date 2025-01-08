import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect } from "react";

export default function InfiniteScroll({
  children,
  options,
  onEndReached,
  fallback,
}: {
  children: React.ReactNode;
  options: IntersectionObserverInit;
  onEndReached: () => void;
  fallback?: React.ReactNode;
}) {
  const { ref, inView } = useIntersectionObserver(options);  

  useEffect(() => {
    if (inView) {
      onEndReached();
    }
  }, [inView]);

  return (
    <>
      {children}
      <div className="min-h-8" ref={ref}>
        {fallback}
      </div>
    </>
  );
}
