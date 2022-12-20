import Link from "next/link";
import styles from "./BiocReleaseBanner.module.css";

export default function BiocReleaseBanner({
  bioc_release,
  bioc_release_version_latest
}: {
  bioc_release: string;
  bioc_release_version_latest: string
}) {


  return (bioc_release == bioc_release_version_latest ? (
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
  ))
}
