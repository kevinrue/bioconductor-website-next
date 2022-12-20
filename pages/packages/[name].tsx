import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Box from "@mui/material/Box";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { getReleasesData } from "../../lib/bioc_releases";
import {
  mapBiocReleaseToString,
  mapStringToBiocRelease,
  getBiocReleaseLatestVersion,
  getBiocReleaseVersion,
  releaseSort,
} from "../../components/bioc-releases";
import Layout from "../../components/layout";
import BiocReleaseButton from "../../components/bioc-release-button";
import styles from "./package.module.css";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: URL) => fetch(url).then((res) => res.json());

const fillUrlTemplate = function (templateUrl: string, release: string) {
  return templateUrl.replaceAll("${release}", release);
};

export default function Package({
  package_name,
  bioc_release,
  bioc_release_version_latest,
  bioc_release_version_options,
}: {
  package_name: string,
  bioc_release: string,
  bioc_release_version_latest: string,
  bioc_release_version_options: string[]
}) {
  const router = useRouter();

  const [biocRelease, setBiocRelease] = useState(bioc_release);
  useEffect(() => setBiocRelease(bioc_release), [bioc_release])

  const { data: data_packages, error: error_packages } = useSWR(
    bioc_release ? `/api/${bioc_release}/packages` : null,
    fetcher
  );
  const { data: data_biocviews, error: error_biocviews } = useSWR(
    bioc_release ? `/api/${bioc_release}/biocviews` : null,
    fetcher
  );
  const { data: data_snapshot_date, error: error_snapshot_date } = useSWR(
    bioc_release ? `/api/${bioc_release}/snapshot_date` : null,
    fetcher
  );
  const { data: data_r_version, error: error_r_version } = useSWR(
    bioc_release ? `/api/${bioc_release}/r_version` : null,
    fetcher
  );

  //Handle the error state
  if (error_packages) return <div>Failed to load package information.</div>;
  if (error_biocviews) return <div>Failed to load BiocViews information.</div>;
  if (error_snapshot_date)
    return <div>Failed to load snapshot date information.</div>;
  if (error_r_version) return <div>Failed to load R version information.</div>;

  //Handle the loading state
  if (!data_packages) return <div>Loading package information...</div>;
  if (!data_biocviews) return <div>Loading BiocViews information...</div>;
  if (!data_snapshot_date)
    return <div>Loading snapshot date information...</div>;
  if (!data_r_version) return <div>Loading R version information...</div>;

  const snapshot_date = JSON.parse(data_snapshot_date).snapshot_date;
  const r_version = JSON.parse(data_r_version).r_version;

  const biocviews_data = JSON.parse(data_biocviews);

  const package_data = JSON.parse(data_packages).filter((object: any) => {
    return object.Package == package_name;
  })[0];

  const code_install = [
    'if (!require("BiocManager", quietly = TRUE))',
    '    install.packages("BiocManager")',
    "",
    `BiocManager::install("${package_name}", version = ${bioc_release})`,
  ].join("\n");

  const code_vignettes = `browseVignettes("${package_name}")`;

  const bug_report_details = (data: any) => {
    if (data.BugReports === null) {
      return (
        <span>
          <b>Bug reports:</b> Link not available.
        </span>
      );
    } else {
      return (
        <span>
          <b>Bug reports:</b>{" "}
          <Link className={styles.link} href={data.BugReports}>
            {data.BugReports}
          </Link>
        </span>
      );
    }
  };

  const handleChangeBiocRelease = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBiocRelease(event.target.value)
    const release = mapBiocReleaseToString(event.target.value, bioc_release_version_latest);
    const href = fillUrlTemplate(`/packages/${package_name}?release=\${release}`, release);
    router.push(href);
  };

  const bioc_release_banner =
    bioc_release == bioc_release_version_latest ? (
      <p className={styles.BannerCurrentRelease}>
        This is the latest stable release of Bioconductor!
      </p>
    ) : (
      <p className={styles.BannerOldRelease}>
        This is <i>not</i> the latest stable release of Bioconductor. We
        recommend keeping your installation of Bioconductor up-to-date.<br />
        Click <Link className={styles.link} href="/packages">here</Link> to
        see the latest stable release.
      </p>
    )

  return (
    <Layout>
      <Head>
        <title>{package_name} - Package landing page</title>
        <meta name="description" content={package_data.Description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {bioc_release_banner}
      <main className="main">
        <Box sx={{ display: "inline-flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "850px",
              margin: "0 15px",
            }}
          >
            <h1>{package_name}</h1>
            <hr />
            <p>Insert status badges here.</p>
            <h2>{package_data.Title}</h2>
            <hr />
            <p className={styles.snapshot}>
              Bioconductor release {bioc_release} | R version {r_version}{" "}
              (Snapshot date: {snapshot_date})
            </p>
            <p className={styles.description}>{package_data.Description}</p>
            <h3>Installation</h3>
            To install this package, start R (version &quot;{r_version}&quot;)
            and enter:
            <SyntaxHighlighter className={styles.codeblock} language="r">
              {code_install}
            </SyntaxHighlighter>
            <h3>Documentation</h3>
            <p>
              To view documentation for the version of this package installed in
              your system, start R and enter:
            </p>
            <SyntaxHighlighter className={styles.codeblock} language="r">
              {code_vignettes}
            </SyntaxHighlighter>
            <h3>Details</h3>
            <p className={styles.details}>
              <b>Version:</b> {package_data.Version}
              <br />
              <b>License:</b> {package_data.License}
              <br />
              {bug_report_details(package_data)}
            </p>
          </Box>
          <BiocReleaseButton
            value={String(biocRelease)}
            options={bioc_release_version_options}
            handleChange={handleChangeBiocRelease}
          />
        </Box>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: { query: { release: string, name: string }, }) {
  const query = context.query;

  const releasesData = await getReleasesData();

  const releases_data = JSON.parse(releasesData.content);

  const bioc_release_version_options = getBiocReleaseVersion(
    releases_data.sort(releaseSort)
  );
  const bioc_release_version_latest =
    getBiocReleaseLatestVersion(releases_data);

  const bioc_release =
    query.release === undefined
      ? bioc_release_version_latest
      : mapStringToBiocRelease(
        String(query.release),
        bioc_release_version_options,
        bioc_release_version_latest
      );

  return {
    props: {
      package_name: query.name,
      bioc_release: bioc_release,
      bioc_release_version_latest:
        bioc_release_version_latest,
      bioc_release_version_options: bioc_release_version_options
    },
  }
}
