import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Package.module.css";

const Package = () => {
  const router = useRouter();
  const { name } = router.query;

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
        <h1>{name}</h1>
        <p>Insert package information here.</p>
      </main>
    </div>
  );
};

export default Package;
