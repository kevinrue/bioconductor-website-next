import Head from "next/head";
import Grid from "@mui/material/Grid";
import Layout from "../../components/layout";
import styles from "../../styles/Releases.module.css";

const grid_item_xs = 12;
const grid_item_md = 9;

// To understand "Typing Destructured Object Parameters in TypeScript", see section
// "Typing Immediately Destructured Parameters"
// at <https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript>
export default function Releases() {
  return (
    <Layout>
      <Head>
        <title>Learn Bioconductor</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Grid container className={styles.grid}>
          <Grid item xs={grid_item_xs} md={grid_item_md}>
            <h1>Learn Bioconductor</h1>
            <p>Insert text and links here.</p>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
}
