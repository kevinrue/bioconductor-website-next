import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { getReleasesData } from "../../lib/bioc_releases";
import Layout from "../../components/layout";
import styles from "../../styles/Releases.module.css";

const grid_item_xs = 12;
const grid_item_md = 9;

// To understand "Typing Destructured Object Parameters in TypeScript", see section
// "Typing Immediately Destructured Parameters"
// at <https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript>
export default function Releases({
  releasesData,
}: {
  releasesData: { content: string };
}) {
  const router = useRouter();
  // TODO: sort().reverse() before taking first one
  const latest_bioc_release = JSON.parse(releasesData.content)[0];

  return (
    <Layout latest_bioc_release={latest_bioc_release}>
      <Head>
        <title>Bioconductor - Releases</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Grid container className={styles.grid}>
          <Grid item xs={grid_item_xs} md={grid_item_md}>
            <h1>Releases</h1>
            <p>Use the links below to navigate to individual releases.</p>
            <ul>
              {JSON.parse(releasesData.content).map(
                (object: { version: string; status: string }) => (
                  <li key={object.version}>
                    {" "}
                    <Link
                      className={styles.link}
                      href={`${router.asPath}/${object.version}`}
                    >
                      {object.version} ({object.status})
                    </Link>
                  </li>
                )
              )}
            </ul>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  // Add the "await" keyword like this:
  const releasesData = await getReleasesData();

  return {
    props: {
      releasesData,
    },
  };
}
