import styles from "../styles/Navbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.css";

export default function Main() {
  return (
    <Navbar className={styles.navbar} bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="/bioconductor_logo_rgb.svg"
            className={styles["navbar-logo"]}
            alt="Bioconductor Logo"
            width={260}
            height={75}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Packages" id="basic-nav-dropdown">
              <NavDropdown.Item href="/packages">All packages</NavDropdown.Item>
              <div className="dropdown-divider"></div>
              <NavDropdown.Header>Example</NavDropdown.Header>
              <NavDropdown.Item href="/package/Biobase">Biobase</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Blog" id="basic-nav-dropdown">
              <NavDropdown.Item href="/post/example">Example</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
