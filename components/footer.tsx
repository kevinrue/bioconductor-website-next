import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
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
