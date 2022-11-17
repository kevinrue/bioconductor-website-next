import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bioconductor - Home</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Image
          src="/bioconductor_logo_rgb.svg"
          className={styles["header-logo"]}
          alt="Bioconductor Logo"
          width={300}
          height={100}
        />
      </header>
      <main className={styles.main}>
        <div className={styles["about"]}>
          <h1>About Bioconductor</h1>
          <p>
            The mission of the Bioconductor project is to develop, support, and
            disseminate free open source software that facilitates rigorous and
            reproducible analysis of data from current and emerging biological
            assays. We are dedicated to building a diverse, collaborative, and
            welcoming community of developers and data scientists.
          </p>
          <p>
            Bioconductor uses the R statistical programming language, and is
            open source and open development. It has two releases each year, and
            an active user community. Bioconductor is also available as Docker
            images.
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Developed using{" "}
          <span className={styles["footer-logo"]}>
            <Image
              src="/next-black.svg"
              alt="Next Logo"
              width={100}
              height={50}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
