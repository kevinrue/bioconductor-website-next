import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TableOfContent from "../../components/toc";
import Layout from "../../components/layout";
import styles from "../../styles/Learn.module.css";

// To understand "Typing Destructured Object Parameters in TypeScript", see section
// "Typing Immediately Destructured Parameters"
// at <https://mariusschulz.com/blog/typing-destructured-object-parameters-in-typescript>
export default function Learn() {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Learn - Bioconductor</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Box sx={{ display: "inline-flex", justifyContent: "center" }}>
          <Box
            component={Grid}
            className={styles.navleft}
            display={{ xs: "none", lg: "block" }}
            sx={{
              position: "sticky",
              alignSelf: "flex-start",
              textAlign: "left",
              top: "6rem",
              width: "100%",
              margin: "65px 15px",
              maxWidth: "200px",
            }}
          >
            <TableOfContent />
          </Box>
          <Box
            sx={{
              maxWidth: "850px",
              margin: "0 30px",
            }}
          >
            <h1>Learn Bioconductor</h1>
            <hr />
            <p>
              Below is a curated collection of educational resources, both for
              self-learning and teaching others, developed by Bioconductor
              contributors and vetted by the community.
            </p>
            <section id="beginners"></section>
            <h2>Beginners</h2>
            <p>
              If you are just starting, we strongly recommend the following
              resouces:
            </p>
            <h3>Tutorials</h3>
            <ul>
              <li>
                <Link
                  className={styles.link}
                  href={`${router.asPath}/get-started`}
                >
                  Get started
                </Link>
              </li>
            </ul>
            <h3>Videos</h3>
            <ul>
              <li>
                <Link
                  className={styles.link}
                  href="https://youtu.be/dg6NvmMVQ3I"
                  target="_blank"
                >
                  Introduction To Bioconductor
                </Link>{" "}
                by Martin Morgan (2015).
              </li>
              <li>
                <Link
                  className={styles.link}
                  href="https://youtu.be/NMv27jgHRb4"
                  target="_blank"
                >
                  What is Bioconductor?
                </Link>{" "}
                by Lori Ann Shepherd (2021).
              </li>
            </ul>
            <hr />
            <section id="advanced"></section>
            <h2>Advanced</h2>
            <p>
              Try these advanced resources for a better understanding of
              Bioconductor concepts like S4, package development, specific
              technologies, and more.
            </p>
            <h3>Tutorials</h3>
            <ul>
              <li>
                <i>Coming soon.</i>
              </li>
            </ul>
            <h3>Books</h3>
            <ul>
              <li>
                <Link
                  className={styles.link}
                  href="http://bioconductor.org/books/release/csawBook"
                  target="_blank"
                >
                  csaw User&apos;s Guide
                </Link>
              </li>
              <li>
                <Link
                  className={styles.link}
                  href="http://bioconductor.org/books/release/OSCA"
                  target="_blank"
                >
                  Orchestrating Single-Cell Analysis with Bioconductor
                </Link>
              </li>
              <li>
                <Link
                  className={styles.link}
                  href="http://bioconductor.org/books/release/SingleRBook"
                  target="_blank"
                >
                  Assigning cell types with SingleR
                </Link>
              </li>
            </ul>
            <hr />
            <section id="bioconductor-talks"></section>
            <h2>Bioconductor Talks</h2>
            <ul>
              <li>
                <Link
                  className={styles.link}
                  href="https://www.youtube.com/@bioconductor"
                  target="_blank"
                >
                  Bioconductor YouTube channel
                </Link>
              </li>
            </ul>
          </Box>
        </Box>
      </main>
    </Layout>
  );
}
