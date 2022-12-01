import { useEffect, useState, useRef } from "react";

export function useHeadsObserver() {
  const observer = useRef();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObsever = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      // Original values: https://blog.logrocket.com/create-table-contents-highlighting-react/
      // rootMargin: "-20% 0% -35% 0px",
      // Values updated for a small page
      rootMargin: "-10px 0% -50% 0px",
    });

    const elements = document.querySelectorAll("h2");
    elements.forEach((elem) => observer.current.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
}
