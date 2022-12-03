// Source:
// <https://www.netlify.com/blog/2020/12/08/making-a-custom-404-page-in-next.js/>

import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "./404.module.css";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Bioconductor - Home</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>404 - Page Not Found</h1>
        <Link className={styles.link} id="home" href="/">
          Go back home
        </Link>
      </main>
    </Layout>
  );
}
