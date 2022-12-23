import Image from "next/image";
import Head from "next/head";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Layout from "./layout";

export default function Loading() {
  return (
    <Layout>
      <Head>
        <title>Bioconductor - Packages</title>
        <meta
          name="description"
          content="Use this interactive table to browse the complete set of packages in the Bioconductor repository."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <Box
          sx={{
            width: "100%",
            maxWidth: "850px",
            margin: "0 15px",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <Box component={Grid} display="block">
            <h1>Loading</h1>
            <hr />
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: 'center',
              minHeight: "300px",
            }}>
              <div
              >
                <Image
                  src="/bioconductor-serial.gif"
                  alt="Loading ..."
                  width={200}
                  height={220}
                />
              </div>
            </Box>
          </Box>
        </Box>
      </main>
    </Layout >
  );
}
