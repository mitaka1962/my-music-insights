import { useRef, useEffect, useState } from "react";

export function useIntersectionObserver(
  option?: IntersectionObserverInit,
  onChange?: (entry: IntersectionObserverEntry) => void,
) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const callbackRef = useRef(onChange);

  // Store the callback in a `ref` to access the latest instance
  // inside the `useEffect` without triggering a rerender.
  callbackRef.current = onChange;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setInView(entries[0].isIntersecting);
      if (callbackRef.current) callbackRef.current(entries[0]);
    }, option);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, inView };
}
