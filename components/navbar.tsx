import styles from "../styles/NavigationBar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";

// TODO: move website-wide constants to global settings (find out suitable method for this)
const bioc_releases = ["3.16", "3.15"];
const coc_locales = ["en", "fr"];

export default function NavigationBar() {
  return (
    <Navbar className={styles.navbar} bg="light" expand="md">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="/bioconductor_logo_rgb.svg"
            className={styles.logo}
            alt="Bioconductor Logo"
            width={260}
            height={75}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              className={styles.link}
              title="Packages"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Header>Releases</NavDropdown.Header>
              {bioc_releases.map((release: string) => (
                <NavDropdown.Item
                  key={release}
                  className={styles.link}
                  href={`/packages/${release}`}
                >
                  {release}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <NavDropdown
              className={styles.link}
              title="Blog"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Header>How-to&apos;s</NavDropdown.Header>
              <NavDropdown.Item
                className={styles.link}
                href="/posts/how-to-add-a-post"
              >
                Add a Post
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles.link}
                href="/posts/how-to-add-a-search-bar"
              >
                Add a Search Bar
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles.link}
                href="/posts/how-to-contribute"
              >
                Contribute
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles.link}
                href="/posts/how-to-promote-accessibility"
              >
                Promote Accessibility
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className={styles.link}
              title="Code of Conduct"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Header>Locales</NavDropdown.Header>
              {coc_locales.map((release: string) => (
                <NavDropdown.Item
                  key={release}
                  className={styles.link}
                  href={`/code-of-conduct/${release}`}
                >
                  {release}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
