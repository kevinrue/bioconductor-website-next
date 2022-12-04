import Head from "next/head";
import Layout from "../components/layout";
import styles from "./index.module.css";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Bioconductor - Home</title>
        <meta
          name="description"
          content="The mission of the Bioconductor project is to develop, support, and disseminate free open source software that facilitates rigorous and reproducible analysis of data from current and emerging biological assays. We are dedicated to building a diverse, collaborative, and welcoming community of developers and data scientists.
          <br />
          Bioconductor uses the R statistical programming language, and is open source and open development. It has two releases each year, and an active user community. Bioconductor is also available as Docker images."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.about}>
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
    </Layout>
  );
}
