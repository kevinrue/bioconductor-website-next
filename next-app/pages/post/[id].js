// Sources:
// <https://nextjs.org/learn/basics/dynamic-routes/render-markdown>
import styles from "../../styles/Post.module.css";
import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import { getAllPostIds, getPostData } from "../../lib/post";

export default function Post({ postData }) {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>{postData.title} - Post</title>
          <meta
            name="description"
            content="Work in progress by Kevin Rue-Albrecht"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1>{postData.title}</h1>
          <br />
          <h4>{postData.date}</h4>
          <br />
          <p>
            By{" "}
            <Link
              className={styles.link}
              href={`https://github.com/${postData.author}`}
            >
              @{postData.author}
            </Link>
          </p>
          <br />
          <div
            className={styles.post}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </main>
      </div>
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