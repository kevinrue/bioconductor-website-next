import styles from "../styles/Home.module.css";
import Head from "next/head";
import { getAbout } from "../lib/about";

export default function Home({ aboutContents }) {
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

      <main className={styles.main}>
        <div className={styles["about"]}>
          {/* See https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/ */}
          <div dangerouslySetInnerHTML={{ __html: aboutContents.contentHtml }} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // Add the "await" keyword like this:
  const aboutContents = await getAbout();
  return {
    props: {
      aboutContents,
    },
  };
}
