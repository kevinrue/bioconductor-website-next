import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Layout from "../../components/layout";
import styles from "../../styles/Learn.module.css";
import { flexbox } from "@mui/system";

const grid_item_body_xs = 12;
const grid_item_body_md = 8;

const grid_item_navleft_xs = 0;
const grid_item_navleft_md = 2;

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
            display={{ xs: "none", md: "block" }}
            sx={{
              position: "sticky",
              alignSelf: "flex-start",
              textAlign: "left",
              top: "6rem",
              width: "100%",
              margin: "65px 15px",
              maxWidth: "150px",
            }}
          >
            <h5 className={styles.navtitle}>On this page</h5>
            <ul>
              <li>
                <Link className={styles.navlink} href="#beginners">
                  Beginners
                </Link>
              </li>
            </ul>
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
          </Box>
        </Box>
      </main>
    </Layout>
  );
}
