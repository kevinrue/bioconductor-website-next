import { useRouter } from "next/router";
import Head from "next/head";
import Grid from '@mui/material/Grid';
//useSWR allows the use of SWR inside function components
import useSWR from "swr";
import Layout from "../../components/layout";
import styles from "../../styles/Package.module.css";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: URL) => fetch(url).then((res) => res.json());

const Package = () => {
  const router = useRouter();
  const { name } = router.query;
  console.log(name);

  const { data: data_packages, error: error_packages } = useSWR("/api/packages", fetcher);
  const { data: data_biocviews, error: error_biocviews } = useSWR("/api/biocviews", fetcher);
  const { data: data_snapshot_date, error: error_snapshot_date } = useSWR("/api/snapshot_date", fetcher);

  //Handle the error state
  if (error_packages || error_biocviews || error_snapshot_date) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data_packages || !data_biocviews || !data_snapshot_date) return <div>Loading...</div>;

  const snapshot_date = JSON.parse(data_snapshot_date).snapshot_date;

  const biocviews_data = JSON.parse(data_biocviews);

  const package_data = JSON.parse(data_packages).filter((object: any) => {
    return (object.Package == name)
  })[0];

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
            <p>Insert status badges here.</p>
            <h2>{package_data.Title}</h2>
            <hr />
            <p className={styles.snapshot}>
              Bioconductor release 3.16 (Snapshot date: {snapshot_date})
            </p>
            <p className={styles.description}>{package_data.Description}</p>
            <h3>Installation</h3>
            To install this package, start R (version `TODO`) and enter:
            <pre>
              <code className={styles.codeblock}>
                if (!require(&quot;BiocManager&quot;, quietly = TRUE))<br/>
                install.packages(&quot;BiocManager&quot;)<br/>
                <br/>
                BiocManager::install(&quot;{name}&quot;)
              </code>
            </pre>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
};

export default Package;
