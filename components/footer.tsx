import styles from "../styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <footer className={styles.footer}>
      <Link
        className={styles.link}
        href="https://nextjs.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developed using{" "}
        <span>
          <Image
            src="/next-black.svg"
            alt="Next Logo"
            width={100}
            height={50}
          />
        </span>
      </Link>
    </footer>
  );
}
