import { useRef, useEffect, useState } from "react";

export function useIntersectionObserver(option?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);  

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log('inter!');
      
      setInView(entries[0].isIntersecting);
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
