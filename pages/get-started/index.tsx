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
            <h1>Get started</h1>
            <h2>Welcome</h2>
            <p>Welcome to the Bioconductor community!</p>
            <p>
              This guide details how to install the latest release of
              Bioconductor on your computer.
            </p>
            <h2>Pre-requisites</h2>
            <h3>Install {fa_r_project}</h3>
            <p>
              The current release of Bioconductor is version{" "}
              {latestBiocReleaseData.version}; it works with {fa_r_project}{" "}
              version {latestBiocReleaseData.r_version}. Users of older{" "}
              {fa_r_project} versions must update their installation to take
              advantage of new features and to access packages that have been
              added to Bioconductor since the last release.
            </p>
            <p>
              Follow the instructions for your operating system in{" "}
              <Link href="https://carpentries-incubator.github.io/bioc-intro/setup.html">
                this episode
              </Link>{" "}
              of the Carpentries lesson &quot;Introduction to data analysis with
              R and Bioconductor&quot;. The page also contains information to
              check which version of {fa_r_project} you are using; if you
              already have the correct version, you may not need to do anything!
            </p>
            <h2>Install the BiocManager package</h2>
            <p>
              The <code>BiocManager</code> package is a convenient tool
              distributed on the{" "}
              <Link href="https://cran.r-project.org/">CRAN</Link> repository to
              install and update Bioconductor packages.
            </p>
            <p>
              To install the package, type the following in an {fa_r_project}{" "}
              console:
            </p>
            <SyntaxHighlighter className={styles.codeblock} language="r">
              {'install.packages("BiocManager")'}
            </SyntaxHighlighter>
            <h2>Install the current Bioconductor release</h2>
            <p>
              To install the latest version of Bioconductor core packages, type
              the following in an R console:
            </p>
            <SyntaxHighlighter className={styles.codeblock} language="r">
              {`BiocManager::install(version = "${latestBiocReleaseData.version}")`}
            </SyntaxHighlighter>
            <h2>Check your installation</h2>
            <p>
              To check your installation, restart your {fa_r_project} session,
              and type the following in an R console:
            </p>
            <SyntaxHighlighter className={styles.codeblock} language="r">
              {"BiocManager::version()"}
            </SyntaxHighlighter>
            <p>
              The answer should be &lsquo;{latestBiocReleaseData.version}&rsquo;
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
