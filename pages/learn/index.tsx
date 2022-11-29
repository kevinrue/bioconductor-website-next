import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRProject } from "@fortawesome/free-brands-svg-icons";
import Layout from "../../components/layout";
import styles from "../../styles/GetStarted.module.css";

const grid_item_xs = 12;
const grid_item_md = 9;

const fa_r_project = (
  <FontAwesomeIcon icon={faRProject} size="1x"></FontAwesomeIcon>
);

// To understand "Typing Destructured Object Parameters in TypeScript", see section
// "Typing Immediately Destructured Parameters"
// at <https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript>
export default function Releases() {
  const [latestBiocReleaseData, setLatestBiocReleaseData] = useState({
    version: undefined,
    r_version: undefined,
    status: undefined,
  });

  // Source: <https://stackoverflow.com/questions/72894206/how-to-create-dynamic-nav-items-using-next-js>
  // Trick to dynamically identify the latest BioC release and extract its version
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/bioc_releases");
      const releasesData = await res.json();
      const latestBiocReleaseData = JSON.parse(releasesData)
        .sort((a: { version: string }, b: { version: string }) =>
          a.version > b.version ? 1 : -1
        )
        .reverse()[0];
      setLatestBiocReleaseData(latestBiocReleaseData);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Get started - Bioconductor</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Grid container className={styles.grid}>
          <Grid item xs={grid_item_xs} md={grid_item_md}>

            <p>

            </p>
            <p>

            </p>
            <h2></h2>
            <p>

            </p>
            <p>

            </p>
            <SyntaxHighlighter className={styles.codeblock} language="r">
              {''}
            </SyntaxHighlighter>
            <h2></h2>
            <p>

            </p>
            <SyntaxHighlighter className={styles.codeblock} language="r">
              {``}
            </SyntaxHighlighter>
            <h2></h2>
            <p>

            </p>
            <SyntaxHighlighter className={styles.codeblock} language="r">
              {""}
            </SyntaxHighlighter>
            <p>

            </p>
            <p>
              Congratulations! You are ready to install the latest version of
              more Bioconductor packages!
            </p>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
}
