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
import useDebounce from "../lib/useDebounce";
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: URL) => fetch(url).then((res) => res.json());

// <https://react-data-table-component.netlify.app/?path=/docs/sorting-custom-column-sort--custom-column-sort>
const linkSort = (rowA: any, rowB: any) => {
  const a = rowA.Package.props.children.toLowerCase();
  const b = rowB.Package.props.children.toLowerCase();
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
};

const paginationComponentOptions = {
  noRowsPerPage: true,
};

const filterRowsByPackageColumn = (name: string, pattern: string) => {
  try {
    var matcher = new RegExp(pattern);
  } catch (err) {
    return true;
  }
  if (matcher.test(name)) {
    return true;
  } else {
    return false;
  }
};

export default function Packages() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const [packageSearchString, setPackageSearchString] = useState("");
  const debouncedPackageSearchString = useDebounce(packageSearchString, 500);
  const { data: data_packages, error: error_packages } = useSWR("/api/packages", fetcher);
  const { data: data_snapshot_date, error: error_snapshot_date } = useSWR("/api/snapshot_date", fetcher);

  //Handle the error state
  if (error_packages || error_snapshot_date) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data_packages || !data_snapshot_date) return <div>Loading...</div>;

  const table_columns = [
    {
      id: "package",
      name: "Package",
      selector: (row: any) => row.Package,
      sortable: true,
      sortFunction: linkSort,
      maxWidth: "150px",
    },
    {
      id: "version",
      name: "Version",
      selector: (row: any) => row.Version,
      sortable: true,
      maxWidth: "100px",
    },
    {
      id: "title",
      name: "Title",
      selector: (row: any) => row.Title,
      sortable: true,
      minWidth: "500px",
      wrap: true,
    },
    {
      id: "git_last_commit_date",
      name: "Updated",
      selector: (row: any) => row.git_last_commit_date,
      sortable: true,
      maxWidth: "150px",
    },
  ];

  const table_data = JSON.parse(data_packages)
    .filter((object: any) =>
      filterRowsByPackageColumn(object.Package, debouncedPackageSearchString)
    )
    .map((object: any) => {
      return {
        Package: (
          <Link className={styles.link} href={`/packages/${object.Package}`}>
            {object.Package}
          </Link>
        ),
        Version: object.Version,
        Title: object.Title,
        git_last_commit_date: object.git_last_commit_date,
      };
    });

  const snapshot_date = JSON.parse(data_snapshot_date).snapshot_date;

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
        <Grid container className={styles.grid} rowSpacing={{ xs: 1, sm: 1, md: 2 }}>
          <Grid item xs={12} md={11}>
            <h1>Packages</h1>
            <p className={styles.snapshot}>
              {/* TODO: replace version and date by dynamic values */}
              Bioconductor release 3.16 (Snapshot date: {snapshot_date})
            </p>
          </Grid>
          <Grid item xs={12} md={11}>
            <fieldset>
              <legend>Filters:</legend>
              <TextField
                id="package-search"
                label="Name"
                variant="outlined"
                onChange={handleChangePackageSearchString}
                value={packageSearchString}
              />
            </fieldset>
          </Grid>
          <Grid item xs={12} md={11}>
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
