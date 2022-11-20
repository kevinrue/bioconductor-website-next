// Sources:
// <https://vercel.com/guides/loading-static-file-nextjs-api-route>
import styles from "../styles/Packages.module.css";
import Head from "next/head";
import Link from "next/link";
// <https://react-data-table-component.netlify.app/?path=/docs/getting-started-examples--page>
import DataTable from "react-data-table-component";
import { useState } from "react";
//useSWR allows the use of SWR inside function components
import useSWR from "swr";
import Layout from "../components/layout";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: URL) => fetch(url).then((res) => res.json());

// <https://react-data-table-component.netlify.app/?path=/docs/sorting-custom-column-sort--custom-column-sort>
const linkSort = (rowA: any, rowB: any) => {
  const a = rowA.name.props.children.toLowerCase();
  const b = rowB.name.props.children.toLowerCase();

  if (a > b) {
    return 1;
  }

  if (b > a) {
    return -1;
  }

  return 0;
};

//Handle the ready state and display the result contained in the data object mapped to the structure of the json file
const table_columns = [
  {
    id: "package_name",
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true,
    sortFunction: linkSort,
  },
];

const paginationComponentOptions = {
  noRowsPerPage: true,
};

const filterPackageNamePattern = (name: string, pattern: string) => {
  var matcher = new RegExp(pattern);
  if (matcher.test(name)) {
    return true;
  } else {
    return false;
  }
};
// console.log(["A", "A1", "B"].filter(name => filterPackageNamePattern(name, "A")));

export default function Packages() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const [packageSearchString, setPackageSearchString] = useState("");
  const { data, error } = useSWR("/api/packages", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  const table_data = JSON.parse(data)
    .name.filter((name: string) => filterPackageNamePattern(name, packageSearchString))
    .map((name: string) => ({
      name: (
        <Link className={styles.link} href={`/package/${name}`}>
          {name}
        </Link>
      ),
    }));

  const handleChangePackageSearchString = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPackageSearchString(event.target.value);
  };

  return (
    <Layout>
      <Head>
        <title>Bioconductor - Packages</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Packages</h1>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <h4>Filters</h4>
            <hr />
            <TextField
              id="package-search"
              label="Name"
              variant="outlined"
              onChange={handleChangePackageSearchString}
              value={packageSearchString}
            />
          </Grid>
          <Grid item xs={10}>
            <DataTable
              columns={table_columns}
              data={table_data}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              // <https://stackoverflow.com/questions/66980280/how-to-sort-react-data-table-component-by-column-number>
              defaultSortFieldId="package_name"
            />
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
}
