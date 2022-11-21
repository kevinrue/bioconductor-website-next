// Sources:
// <https://nextjs.org/learn/basics/dynamic-routes/render-markdown>
// <https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
import styles from "../../styles/Post.module.css";
import Layout from "../../components/layout";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Grid from '@mui/material/Grid';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title} - Post</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Grid container className={styles.post}>
          <Grid item xs={12} md={9}>
            <h1>{postData.title}</h1>
            <p className={styles.author}>By {postData.author}</p>
            <ReactMarkdown
              className={styles.content}
              skipHtml={true}
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
          </Grid>
        </Grid>
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
