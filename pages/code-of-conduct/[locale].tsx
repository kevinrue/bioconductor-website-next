import Head from "next/head";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import {
  getAllCodeOfConductIds,
  getCodeOfConductData,
} from "../../lib/code-of-conduct";
import Layout from "../../components/layout";
import styles from "./code-of-conduct.module.css";

export default function CodeOfConduct({ cocData }: any) {
  return (
    <Layout>
      <Head>
        <title>Bioconductor - Code of Conduct</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Box sx={{ display: "inline-flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "850px",
              margin: "0 15px",
            }}
          >
            <h1>Code of Conduct</h1>
            <hr />
            <h2>{cocData.title}</h2>
            <ReactMarkdown className={styles.content} skipHtml={true}>
              {cocData.content}
            </ReactMarkdown>
          </Box>
        </Box>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllCodeOfConductIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // Add the "await" keyword like this:
  const cocData = await getCodeOfConductData(params.locale);

  return {
    props: {
      cocData,
    },
  };
}
