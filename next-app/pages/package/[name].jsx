import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/Package.module.css";

const Package = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <p>Insert package information here.</p>
    </div>
  );
};

export default Package;
