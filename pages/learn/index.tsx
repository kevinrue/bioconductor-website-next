import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Layout from "../../components/layout";
import styles from "../../styles/Learn.module.css";

const grid_item_xs = 12;
const grid_item_md = 9;

// To understand "Typing Destructured Object Parameters in TypeScript", see section
// "Typing Immediately Destructured Parameters"
// at <https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript>
export default function Learn() {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Learn - Bioconductor</title>
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
            <hr />
            <p>
              Below is a curated collection of educational resources, both for
              self-learning and teaching others, developed by Bioconductor
              contributors and vetted by the community.
            </p>
            <h2>Beginners</h2>
            <p>
              If you are just starting, we strongly recommend the following
              resouces:
            </p>
            <h3>Tutorials</h3>
            <ul>
              <li>
                <Link
                  className={styles.link}
                  href={`${router.asPath}/get-started`}
                >
                  Get started
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
}
