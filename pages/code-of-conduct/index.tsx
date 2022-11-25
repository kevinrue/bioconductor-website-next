import Layout from "../../components/layout";
import Head from "next/head";
import Grid from '@mui/material/Grid';
import ReactMarkdown from "react-markdown";
import { getCocData } from "../../lib/coc";
import styles from "../../styles/CodeOfConduct.module.css";

const grid_item_xs = 12;
const grid_item_md = 9;

export default function CodeOfConduct({ cocData }: any) {
  return (
    <Layout>
      <Head>
        <title>Bioconductor - Code of Conduct</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Grid container className={styles.grid}>
          <Grid item xs={grid_item_xs} md={grid_item_md}>
            <h1>Code of Conduct</h1>
            <ReactMarkdown
              className={styles.content}
              skipHtml={true}
            >
              {cocData.content}
            </ReactMarkdown>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  // Add the "await" keyword like this:
  const cocData = await getCocData();
  return {
    props: {
      cocData,
    },
  };
}