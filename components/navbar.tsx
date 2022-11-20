import styles from "../styles/Navbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";

export default function Main() {
  return (
    <Navbar className={styles.navbar} bg="light" expand="lg">
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
          <Nav className="me-auto">
            <Nav.Link className={styles.link} href="/">
              Home
            </Nav.Link>
            <NavDropdown
              className={styles.link}
              title="Packages"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item className={styles.link} href="/packages">
                All packages
              </NavDropdown.Item>
              <div className="dropdown-divider"></div>
              <NavDropdown.Header>Example</NavDropdown.Header>
              <NavDropdown.Item className={styles.link} href="/package/Biobase">
                Biobase
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className={styles.link}
              title="Blog"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Header>How-to's</NavDropdown.Header>
              <NavDropdown.Item
                className={styles.link}
                href="/posts/add-a-post"
              >
                Add a Post
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles.link}
                href="/posts/add-a-search-bar"
              >
                Add a Search Bar
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
