import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const useBreakpoint = () => {
  const isTablet = useMediaQuery("(width>=768px) and (width<=1023px)");
  const isDesktop = useMediaQuery("(width>=1024px)");

  return { isTablet, isDesktop };
};

export default useBreakpoint;
