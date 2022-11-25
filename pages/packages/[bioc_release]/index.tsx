// Sources:
// <https://vercel.com/guides/loading-static-file-nextjs-api-route>
// <https://fontawesome.com/v5/docs/web/use-with/react>
import path from "path";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
//useSWR allows the use of SWR inside function components
import useSWR from "swr";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
// React
import React, { useState } from "react";
// <https://react-data-table-component.netlify.app/?path=/docs/getting-started-examples--page>
import DataTable from "react-data-table-component";
// Keep last to override other stylesheets
import Layout from "../../../components/layout";
import useDebounce from "../../../lib/useDebounce";
import styles from "../../../styles/Packages.module.css";

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

const filterRowsByPackageType = (
  name: any,
  type: string,
  biocviews: string[]
) => {
  if (type == "All") {
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
};

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
  { value: "All", label: "All" },
  { value: "Software", label: "Software" },
  { value: "AnnotationData", label: "AnnotationData" },
  { value: "ExperimentData", label: "ExperimentData" },
  { value: "Workflow", label: "Workflow" },
];

const releaseOptions = ["3.15", "3.16"];

const FabTheme = createTheme({
  components: {
    // Name of the component
    MuiFab: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          position: "fixed",
          bottom: "25px",
          right: "25px",
        },
      },
    },
  },
});

export default function Packages() {
  const router = useRouter();
  const bioc_release = router.query.bioc_release;

  const [packageSearchString, setPackageSearchString] = useState("");
  const [packageType, setPackageType] = useState(typeOptions[0].value);
  const debouncedPackageSearchString = useDebounce(packageSearchString, 500);

  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
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

  //Handle the error state
  if (error_packages) return <div>Failed to load package information.</div>;
  if (error_biocviews) return <div>Failed to load BiocViews information.</div>;
  if (error_snapshot_date)
    return <div>Failed to load snapshot date information.</div>;

  //Handle the loading state
  if (!data_packages) return <div>Loading package information...</div>;
  if (!data_biocviews) return <div>Loading BiocViews information...</div>;
  if (!data_snapshot_date)
    return <div>Loading snapshot date information...</div>;

  const snapshot_date = JSON.parse(data_snapshot_date).snapshot_date;

  const biocviews_data = JSON.parse(data_biocviews);

  const table_data = JSON.parse(data_packages)
    .filter((object: any) =>
      filterRowsByPackageColumn(object.Package, debouncedPackageSearchString)
    )
    .filter((object: any) =>
      filterRowsByPackageType(object.Package, packageType, biocviews_data)
    )
    .map((object: any) => {
      return {
        Package: (
          <Link
            className={styles.link}
            href={`${router.asPath}/${object.Package}`}
          >
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

  const handleChangePackageType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPackageType(event.target.value);
  };

  const handleChangeBiocRelease = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const href = `${path.dirname(router.asPath)}/${event.target.value}`;
    router.push(href);
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
        <Grid
          container
          className={styles.page}
          rowSpacing={{ xs: 1, sm: 1, md: 2 }}
        >
          <Grid item xs={grid_item_xs} md={grid_item_md}>
            <h1>Packages</h1>
            <p className={styles.snapshot}>
              Bioconductor release {bioc_release} (Snapshot date:{" "}
              {snapshot_date})
            </p>
          </Grid>
          <Grid item xs={grid_item_xs} md={grid_item_md}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>
                <FontAwesomeIcon icon={faFilter} size="xs" />
                Filters
              </legend>
              <FormControl variant="standard" sx={{ m: 1, width: "120" }}>
                <TextField
                  id="package-search"
                  label="Name"
                  variant="outlined"
                  onChange={handleChangePackageSearchString}
                  value={packageSearchString}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, width: "20ch" }}>
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
          {bioc_release ? (
            <ThemeProvider theme={FabTheme}>
              <Fab className={styles.fab} color="primary" variant="extended">
                Release:{" "}
                <TextField
                  id="select-release"
                  select
                  defaultValue={bioc_release}
                  onChange={handleChangeBiocRelease}
                  // helperText="Please select your currency"
                >
                  {releaseOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Fab>
            </ThemeProvider>
          ) : (
            ""
          )}
        </Grid>
      </main>
    </Layout>
  );
}
