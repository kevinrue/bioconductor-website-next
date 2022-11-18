import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bioconductor - Home</title>
        <meta
          name="description"
          content="Work in progress by Kevin Rue-Albrecht"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar className={styles.navbar} bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              src="/bioconductor_logo_rgb.svg"
              className={styles["navbar-logo"]}
              alt="Bioconductor Logo"
              width={300}
              height={100}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Packages" id="basic-nav-dropdown">
                <NavDropdown.Item href="/package/iSEE">iSEE</NavDropdown.Item>
                <NavDropdown.Item href="/package/iSEEu">iSEEu</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className={styles.main}>
        <div className={styles["about"]}>
          <h1>About Bioconductor</h1>
          <p>
            The mission of the Bioconductor project is to develop, support, and
            disseminate free open source software that facilitates rigorous and
            reproducible analysis of data from current and emerging biological
            assays. We are dedicated to building a diverse, collaborative, and
            welcoming community of developers and data scientists.
          </p>
          <p>
            Bioconductor uses the R statistical programming language, and is
            open source and open development. It has two releases each year, and
            an active user community. Bioconductor is also available as Docker
            images.
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Developed using{" "}
          <span className={styles["footer-logo"]}>
            <Image
              src="/next-black.svg"
              alt="Next Logo"
              width={100}
              height={50}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
