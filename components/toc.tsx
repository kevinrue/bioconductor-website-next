// Source: <https://blog.logrocket.com/create-table-contents-highlighting-react/>
import { useEffect, useState } from "react";
import { useHeadsObserver } from "./hooks";
import styles from "./toc.module.css";

const getClassName = (level: number) => {
  switch (level) {
    case 2:
      return styles.head2;
    case 3:
      return styles.head3;
    default:
      return styles.headDefault;
  }
};

export default function TableOfContent() {
  const [headings, setHeadings] = useState([{ id: "", text: "", level: 0 }]);
  const { activeId } = useHeadsObserver();

  useEffect(() => {
    const html_elements = Array.from(
      document.querySelectorAll("h2, h3")
    ) as HTMLElement[];
    const elements = html_elements.map((elem) => ({
      id: elem.id,
      text: elem.innerText,
      level: Number(elem.nodeName.charAt(1)),
    }));
    setHeadings(elements);
  }, []);

  return (
    <nav>
      <h5 className={styles.navtitle}>On this page</h5>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} className={getClassName(heading.level)}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                // <https://bobbyhadz.com/blog/typescript-document-getelementbyid-object-possibly-null>
                const target = document.querySelector(`#${heading.id}`);
                if (target !== null) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              style={{
                fontWeight: activeId === heading.id ? "bold" : "normal",
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
