import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import React from 'react';
import Grid from '@mui/material/Grid';
//useSWR allows the use of SWR inside function components
import useSWR from "swr";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Layout from "../../../components/layout";
import styles from "../../../styles/Package.module.css";

const grid_item_xs = 12;
const grid_item_md = 9;

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: URL) => fetch(url).then((res) => res.json());

const Package = () => {
  const router = useRouter();
  const package_name = router.query.name;
  const bioc_release = router.query.bioc_release;

  const { data: data_packages, error: error_packages } = useSWR(bioc_release ? `/api/${bioc_release}/packages` : null, fetcher);
  const { data: data_biocviews, error: error_biocviews } = useSWR(bioc_release ? `/api/${bioc_release}/biocviews` : null, fetcher);
  const { data: data_snapshot_date, error: error_snapshot_date } = useSWR(bioc_release ? `/api/${bioc_release}/snapshot_date` : null, fetcher);
  const { data: data_r_version, error: error_r_version } = useSWR(bioc_release ? `/api/${bioc_release}/r_version` : null, fetcher);

  //Handle the error state
  if (error_packages) return <div>Failed to load package information.</div>;
  if (error_biocviews) return <div>Failed to load BiocViews information.</div>;
  if (error_snapshot_date) return <div>Failed to load snapshot date information.</div>;
  if (error_r_version) return <div>Failed to load R version information.</div>;

  //Handle the loading state
  if (!data_packages) return <div>Loading package information...</div>;
  if (!data_biocviews) return <div>Loading BiocViews information...</div>;
  if (!data_snapshot_date) return <div>Loading snapshot date information...</div>;
  if (!data_r_version) return <div>Loading R version information...</div>;

  const snapshot_date = JSON.parse(data_snapshot_date).snapshot_date;
  const r_version = JSON.parse(data_r_version).r_version;

  const biocviews_data = JSON.parse(data_biocviews);

  const package_data = JSON.parse(data_packages).filter((object: any) => {
    return (object.Package == package_name)
  })[0];

  const code_install = [
    'if (!require("BiocManager", quietly = TRUE))',
    '    install.packages("BiocManager")',
    '',
    `BiocManager::install("${package_name}", version = ${bioc_release})`
  ].join("\n");

  const code_vignettes = `browseVignettes("${package_name}")`;

  const bug_report_details = (data: any) => {
    if (data.BugReports === null) {
      return (
        <span>
          <b>Bug reports:</b>
          {' '}
          Link not available.
        </span>);
    } else {
      return (
        <span>
          <b>Bug reports:</b>
          {' '}
          <Link className={styles.link} href={data.BugReports}>
            {data.BugReports}
          </Link>
        </span>
      )
    }
  }

  return (
    <Layout>
      <Head>
        <title>{package_name} - Package landing page</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Grid container className={styles.grid} rowSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={grid_item_xs} md={grid_item_md}>
            <h1>{package_name}</h1>
            <p>Insert status badges here.</p>
            <h2>{package_data.Title}</h2>
            <hr />
            <p className={styles.snapshot}>
              Bioconductor release {r_version} (Snapshot date: {snapshot_date})
            </p>
            <p className={styles.description}>{package_data.Description}</p>
            <h3>Installation</h3>
            To install this package, start R (version "{r_version}") and enter:
            <SyntaxHighlighter className={styles.codeblock} language='r'>
              {code_install}
            </SyntaxHighlighter>
            <h3>Documentation</h3>
            <p>To view documentation for the version of this package installed in your system, start R and enter:</p>
            <SyntaxHighlighter className={styles.codeblock} language='r'>
              {code_vignettes}
            </SyntaxHighlighter>
            <h3>Details</h3>
            <p className={styles.details}>
              <b>Version:</b>
              {' '}
              {package_data.Version}
              <br />
              <b>License:</b>
              {' '}
              {package_data.License}
              <br />
              {bug_report_details(package_data)}
            </p>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
};

export default Package;
