import styles from "../styles/Footer.module.css";
import Image from "next/image";

export default function Main() {
  return (
    <footer className={styles.footer}>
      <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
        Developed using{" "}
        <span className={styles["footer-logo"]}>
          <Image
            src="/next-black.svg"
            alt="Next Logo"
            width={100}
            height={50}
          />
        </span>
      </a>
    </footer>
  );
}
