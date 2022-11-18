// Sources:
// <https://vercel.com/guides/loading-static-file-nextjs-api-route>
import styles from "../styles/Packages.module.css";
import Head from "next/head";
//useSWR allows the use of SWR inside function components
import useSWR from "swr";
import { Key, ReactElement, JSXElementConstructor, ReactFragment } from "react";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: URL) => fetch(url).then((res) => res.json());

export default function Packages() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  //   const { data, error } = useSWR("/api/packages", fetcher);
  const { data, error } = useSWR("/api/packages", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  const listItems = JSON.parse(data).name.map((name: string) => (
    <li key={name}><a href={`/package/${name}`}>{name}</a></li>
  ));
  return (
    <div className={styles.container}>
      <Head>
        <title>Bioconductor - Packages</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Overview</h1>
        {listItems}
      </main>
    </div>
  );
}
