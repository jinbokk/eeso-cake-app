import { useEffect } from "react";

export default function useHighlight() {
  useEffect(() => {
    console.log(window.location.pathname);
  }, [window.location.pathname]);

  return;
}
