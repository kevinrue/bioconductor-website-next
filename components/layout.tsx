// Sources:
// <https://nextjs.org/docs/basic-features/layouts>

import Navbar from "./navbar";
import Footer from "./footer";
import styles from "../styles/Layout.module.css";

// TODO: check if syntax { children, ...pageProps } is good practice
export default function Layout({ children, ...pageProps }: any) {
  return (
    <>
      {/* TODO: check if latest_bioc_release can be passed more elegantly */}
      <Navbar latest_bioc_release={pageProps.latest_bioc_release} />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
}
