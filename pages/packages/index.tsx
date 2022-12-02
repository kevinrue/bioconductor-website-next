import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import useSWR from "swr";
// React
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
// <https://react-data-table-component.netlify.app/?path=/docs/getting-started-examples--page>
import DataTable from "react-data-table-component";
import { getReleasesData } from "../../lib/bioc_releases";
import {
  mapStringToBiocRelease,
  getBiocReleaseLatestVersion,
  getBiocReleaseVersion,
} from "../../components/bioc-releases";
import useDebounce from "../../lib/useDebounce";
import BiocReleaseButton from "../../components/bioc-release-button";
import Layout from "../../components/layout";
import styles from "../../styles/Packages.module.css";

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

const buildPackageUrl = (name: string, query: ParsedUrlQuery) => {
  let new_query = `?name=${name}`;
  new_query =
    query.release === undefined
      ? new_query
      : `${new_query}&release=${query.release}`;
  const href = ["/package", new_query].join("/");
  return href;
};

// To understand "Typing Destructured Object Parameters in TypeScript", see section
// "Typing Immediately Destructured Parameters"
// at <https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript>
export default function Releases({
  releasesData,
}: {
  releasesData: { content: string };
}) {
  const router = useRouter();

  const query = router.query;

  const releases_data = JSON.parse(releasesData.content);

  const bioc_release_version_options = getBiocReleaseVersion(releases_data);
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

  const [packageSearchString, setPackageSearchString] = useState("");

  // Debounce the string input on package names by 500ms
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
            href={buildPackageUrl(object.Package, query)}
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
        <Box
          sx={{
            display: "block",
            alignSelf: "center",
            width: "80%",
          }}
        >
          <Box component={Grid} display="block">
            <h1>Packages</h1>
            <hr />
            <p className={styles.snapshot}>
              Bioconductor release {bioc_release} | R version {r_version}{" "}
              (Snapshot date: {snapshot_date})
            </p>
            {bioc_release == bioc_release_version_latest ? (
              <p className={styles.highlight}>
                This is the latest stable release of Bioconductor.
              </p>
            ) : (
              <p className={styles.highlight}>
                This is <i>not</i> the latest stable release of Bioconductor. We
                recommend keeping your installation of Bioconductor up-to-date.
              </p>
            )}
          </Box>
          <Box>
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
                >
                  {typeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </fieldset>
          </Box>
          <Box>
            <DataTable
              columns={table_columns}
              data={table_data}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              // <https://stackoverflow.com/questions/66980280/how-to-sort-react-data-table-component-by-column-number>
              defaultSortFieldId="package_name"
            />
          </Box>
          <BiocReleaseButton
            defaultValue={String(bioc_release)}
            options={bioc_release_version_options}
            latest={bioc_release_version_latest}
            templateUrl="/packages?release=${release}"
          />
        </Box>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  // Add the "await" keyword like this:
  const releasesData = await getReleasesData();

  return {
    props: {
      releasesData,
    },
  };
}
