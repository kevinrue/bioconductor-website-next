import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { getReleasesData } from "../../lib/bioc_releases";
import Layout from "../../components/layout";
import styles from "../../styles/Releases.module.css";

const grid_item_xs = 12;
const grid_item_md = 9;

export default function Releases({
  releasesData,
}: {
  releasesData: { directories: string[] };
}) {
  const router = useRouter();
  return (
    <Layout>
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
            <h2>Releases</h2>
            <p>Use the links below to navigate to individual releases.</p>
            <ul>
              {releasesData.directories
                .sort()
                .reverse()
                .map((release: string) => (
                  <li key={release}>
                    {" "}
                    <Link
                      className={styles.link}
                      href={`${router.asPath}/${release}`}
                    >
                      {release}
                    </Link>
                  </li>
                ))}
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
  // const releasesData = ["3.15", "3.16"];

  return {
    props: {
      releasesData,
    },
  };
}
