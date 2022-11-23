// Sources:
// <https://vercel.com/guides/loading-static-file-nextjs-api-route>
// <https://fontawesome.com/v5/docs/web/use-with/react>
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Layout from "../components/layout";
import useDebounce from "../lib/useDebounce";
import Head from "next/head";
import Link from "next/link";
//useSWR allows the use of SWR inside function components
import useSWR from "swr";
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
// import * as React from 'react';
import React from 'react';
import { useState } from "react";
// <https://react-data-table-component.netlify.app/?path=/docs/getting-started-examples--page>
import DataTable from "react-data-table-component";
// Keep last to override other stylesheets
import styles from "../styles/Packages.module.css";

const grid_item_xs = 12;
const grid_item_md = 11;

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

const filterRowsByPackageType = (name: any, type: string, biocviews: string[]) => {
  if (type == 'All') {
    return true;
  } else {
    const package_biocviews = biocviews[name];
    if (package_biocviews === null) {
      return false;
    } else if (package_biocviews.includes(type)) {
      return true;
    } else {
      return false;
    }
  }
}

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
    id: "title",
    name: "Title",
    selector: (row: any) => row.Title,
    sortable: true,
    minWidth: "500px",
    wrap: true,
  },
  {
    id: "version",
    name: "Version",
    selector: (row: any) => row.Version,
    sortable: true,
    maxWidth: "100px",
  },
  {
    id: "git_last_commit_date",
    name: "Updated",
    selector: (row: any) => row.git_last_commit_date,
    sortable: true,
    maxWidth: "150px",
  },
];

const typeOptions = [
  { value: 'All', label: 'All' },
  { value: 'Software', label: 'Software' },
  { value: 'AnnotationData', label: 'AnnotationData' },
  { value: 'ExperimentData', label: 'ExperimentData' },
  { value: 'Workflow', label: 'Workflow' },
]

// 'All' should always be the first option
const typeDefaultValue = typeOptions[0].value;

export default function Packages() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const [packageSearchString, setPackageSearchString] = useState("");
  const [packageType, setPackageType] = React.useState(typeOptions[0].value);
  const debouncedPackageSearchString = useDebounce(packageSearchString, 500);
  const { data: data_packages, error: error_packages } = useSWR("/api/packages", fetcher);
  const { data: data_biocviews, error: error_biocviews } = useSWR("/api/biocviews", fetcher);
  const { data: data_snapshot_date, error: error_snapshot_date } = useSWR("/api/snapshot_date", fetcher);

  //Handle the error state
  if (error_packages || error_biocviews || error_snapshot_date) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data_packages || !data_biocviews || !data_snapshot_date) return <div>Loading...</div>;

  const snapshot_date = JSON.parse(data_snapshot_date).snapshot_date;

  const biocviews_data = JSON.parse(data_biocviews);

  const table_data = JSON.parse(data_packages)
    .filter((object: any) =>
      filterRowsByPackageColumn(object.Package, debouncedPackageSearchString)
    )
    .filter((object: any) => filterRowsByPackageType(object.Package, packageType, biocviews_data))
    .map((object: any) => {
      return {
        Package: (
          <Link className={styles.link} href={`/packages/${object.Package}`}>
            {object.Package}
          </Link>
        ),
        Title: object.Title,
        Version: object.Version,
        git_last_commit_date: object.git_last_commit_date,
      };
    });

  const handleChangePackageSearchString = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPackageSearchString(event.target.value);
  };

  const handleChangePackageType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPackageType(event.target.value);
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
        <Grid container className={styles.page} rowSpacing={{ xs: 1, sm: 1, md: 2 }}>
          <Grid item xs={grid_item_xs} md={grid_item_md}>
            <h1>Packages</h1>
            <p className={styles.snapshot}>
              Bioconductor release 3.16 (Snapshot date: {snapshot_date})
            </p>
          </Grid>
          <Grid item xs={grid_item_xs} md={grid_item_md}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}><FontAwesomeIcon icon={faFilter} size="xs" /> Filters</legend>
              <FormControl variant="standard" sx={{ m: 1, width: '120' }}>
                <TextField
                  id="package-search"
                  label="Name"
                  variant="outlined"
                  onChange={handleChangePackageSearchString}
                  value={packageSearchString}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, width: '20ch' }}>
                <TextField
                  id="select-type"
                  select
                  label="Type"
                  value={packageType}
                  onChange={handleChangePackageType}
                // helperText="Please select your currency"
                >
                  {typeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </fieldset>
          </Grid>
          <Grid item xs={grid_item_xs} md={grid_item_md}>
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
    </Layout >
  );
}
