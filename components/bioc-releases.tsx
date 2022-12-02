export const releaseSort = (
  releaseA: { version: string },
  releaseB: { version: string }
) => {
  const a = releaseA.version;
  const b = releaseB.version;
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
};

export const mapStringToBiocRelease = (
  query: string,
  releases: string[],
  latest: string
) => {
  if (query == "latest") {
    return latest;
  } else if (releases.includes(query)) {
    return query;
  } else {
    return null;
  }
};

export const mapBiocReleaseToString = (query: string, latest: string) => {
  if (query == latest) {
    return "latest";
  } else {
    return query;
  }
};

export const getBiocReleaseLatestVersion = (
  releases_data: { version: string; r_version: string; status: string }[]
) => {
  return releases_data
    .filter(
      (object: { version: string; r_version: string; status: string }) =>
        object.status == "release"
    )
    .sort(releaseSort)[0].version;
};

export const getBiocReleaseVersion = (
  releases_data: { version: string; r_version: string; status: string }[]
) => {
  return releases_data.map(
    (object: { version: string; r_version: string; status: string }) =>
      object.version
  );
};
