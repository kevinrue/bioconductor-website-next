// Sources:
// <https://nextjs.org/learn/basics/dynamic-routes/render-markdown>
// <https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
import Head from "next/head";
import Script from "next/script";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { getAllPageIds, getPageData } from "../../lib/learn";
import TableOfContent from "../../components/toc";
import Layout from "../../components/layout";
import styles from "../../styles/LearnPage.module.css";

export default function LearnPage({ pageData }) {
  return (
    <Layout>
      <Head>
        <title>{pageData.title} - Learn Bioconductor</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* TODO: src= below points to a FontAwesome Kit on Kevin's account.
      Change when to more stable solution when possible */}
      <Script
        src="https://kit.fontawesome.com/ffb34e6829.js"
        crossorigin="anonymous"
      ></Script>
      <main className="main">
        <Box sx={{ display: "inline-flex", justifyContent: "center" }}>
          <Box
            sx={{
              maxWidth: "850px",
              margin: "0 15px",
              width: "100%",
              padding: "0 15px",
            }}
          >
            <h1>{pageData.title}</h1>
            <hr />
            <ReactMarkdown
              className={styles.content}
              skipHtml={false}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter language={match[1]} {...props}>
                      {String(children)}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {pageData.content}
            </ReactMarkdown>
            <p className={styles.date}>
              Last updated: {pageData.edited} (Last compiled:{" "}
              {pageData.compiled})
            </p>
          </Box>

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
              maxWidth: "16%",
            }}
          >
            <TableOfContent />
          </Box>
        </Box>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPageIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const pageData = await getPageData(params.id);

  return {
    props: {
      pageData,
    },
  };
}
