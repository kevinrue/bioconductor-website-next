import styles from "../../styles/Package.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/layout";
import Grid from '@mui/material/Grid';

const Package = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Layout>
      <Head>
        <title>{name} - Package landing page</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Grid container className={styles.grid} rowSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={11}>
            <h1>{name}</h1>
            <p>Insert package information here.</p>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
};

export default Package;
