import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — Tax-Assist AI`;
    return () => {
      document.title = "Tax-Assist AI";
    };
  }, [title]);
}
