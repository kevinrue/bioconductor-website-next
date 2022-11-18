// Source:
// <https://www.netlify.com/blog/2020/12/08/making-a-custom-404-page-in-next.js/>

import styles from "../styles/FourOhFour.module.css";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.h1}>404 - Page Not Found</h1>
        <Link className={styles.link} id="home" href="/">
          Go back home
        </Link>
      </main>
    </div>
  );
}
