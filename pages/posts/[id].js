// Sources:
// <https://nextjs.org/learn/basics/dynamic-routes/render-markdown>
// <https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
import Head from "next/head";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Layout from "../../components/layout";
import styles from "./posts.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title} - Post</title>
        <meta name="description" content={postData.description} />
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
            <h1>{postData.title}</h1>
            <hr />
            <p className={styles.author}>By {postData.author}</p>
            <ReactMarkdown
              className={styles.content}
              skipHtml={true}
              rehypePlugins={[rehypeRaw]}
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
              {postData.content}
            </ReactMarkdown>
            <p className={styles.date}>
              Created on {postData.created} (Last updated: {postData.edited})
            </p>
          </Box>
        </Box>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
