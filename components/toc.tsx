// Source: <https://blog.logrocket.com/create-table-contents-highlighting-react/>
import { useEffect, useState } from "react";
import styles from "../styles/TableOfContent.module.css";

export default function TableOfContent() {
  const [headings, setHeadings] = useState([{ text: "" }]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2")).map(
      (elem) => ({
        text: elem.innerText,
      })
    );
    setHeadings(elements);
  }, []);

  return (
    <nav>
      <h5 className={styles.navtitle}>On this page</h5>
      <ul>
        {headings.map((heading) => (
          <li key={heading.text}>
            <a href="#">{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
