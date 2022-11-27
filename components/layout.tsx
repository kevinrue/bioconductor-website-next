// Sources:
// <https://nextjs.org/docs/basic-features/layouts>

import Navbar from "./navbar";
import Footer from "./footer";
import styles from "../styles/Layout.module.css";

// TODO: check if syntax { children, ...pageProps } is good practice
export default function Layout({ children }: any) {
  return (
    <>
      {/* TODO: check if latest_bioc_release can be passed more elegantly */}
      <Navbar />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
}
