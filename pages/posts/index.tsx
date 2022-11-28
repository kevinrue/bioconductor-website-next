import Head from "next/head";
import Link from "next/link";
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
        <title>Developer&apos;s notes</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Grid container className={styles.grid}>
          <Grid item xs={grid_item_xs} md={grid_item_md}>
            <h1>Developer&apos;s notes</h1>
            <p>
              The posts listed below were written during the development of this
              website. They describe some of the efforts made so far, while
              keeping notes and links to resources that might facilitate future
              contributions.
            </p>
            <ul>
              <li>
                <Link href="/posts/how-to-add-a-post">How to: Add a Post</Link>
              </li>
              <li>
                <Link href="/posts/how-to-add-user-inputs">
                  How to: Add User Inputs
                </Link>
              </li>
              <li>
                <Link href="/posts/how-to-contribute">How to: Contribute</Link>
              </li>
              <li>
                <Link href="/posts/how-to-promote-accessibility">
                  How to: Promote Accessibility
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
}
