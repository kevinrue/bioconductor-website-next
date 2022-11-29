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

  const releases_data = JSON.parse(releasesData.content);

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
            <h1>Releases</h1>
            <hr />
            <h2>The Bioconductor release cycle</h2>
            <p>
              The Bioconductor projects features a 6-month release cycle
              (typically around April and October), which sees a snapshot of the
              current version of all packages in the Bioconductor repository
              earmarked for a specific version of R.
            </p>
            <h2>Release types</h2>
            <p>
              The current stable release is marked as <i>release</i>. Only
              critical bug fixes are allowed in that area of the repository.
            </p>
            <p>
              The next stable release is marked as <i>devel</i>. Active
              development takes place in that area of the repository. New
              packages versions may be released daily.
            </p>
            <p>
              Earlier releases are marked as <i>archived</i>. No more changes
              are allowed in that area of the repository.
            </p>
            <h2>Links</h2>
            <p>Use the links below to navigate to individual releases.</p>
            <ul>
              {releases_data.map(
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
