import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/Package.module.css";

const Package = () => {
  const router = useRouter();
  const { name } = router.query;
  const badge_availability_url = `http://bioconductor.org/shields/availability/release/${name}.svg`;
  const badge_build_url = `http://bioconductor.org/shields/build/release/bioc/${name}.svg`;

  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <h2>Current release status</h2>
      <Image
        src={badge_availability_url}
        className={styles["image-shields"]}
        alt="Availability badge"
        width={90}
        height={20}
      />
      <Image
        src={badge_build_url}
        className={styles["image-shields"]}
        alt="Build badge"
        width={60}
        height={20}
      />
    </div>
  );
};

export default Package;
