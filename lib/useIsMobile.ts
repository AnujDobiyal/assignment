import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    checkSize(); // run on mount

    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isMobile;
}