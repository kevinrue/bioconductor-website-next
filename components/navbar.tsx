import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/NavigationBar.module.css";

// TODO: move website-wide constants to global settings (find out suitable method for this)
const coc_locales = [
  { locale: "en", label: "English" },
  { locale: "fr", label: "French" },
];

export default function NavigationBar() {
  const [latestBiocReleaseData, setLatestBiocReleaseData] = useState({
    version: undefined,
    status: undefined,
  });

  // Source: <https://stackoverflow.com/questions/72894206/how-to-create-dynamic-nav-items-using-next-js>
  // Trick to dynamically identify the latest BioC release and extract its version
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/bioc_releases");
      const releasesData = await res.json();
      const latestBiocReleaseData = JSON.parse(releasesData)
        .sort((a: { version: string }, b: { version: string }) =>
          a.version > b.version ? 1 : -1
        )
        .reverse()[0];
      setLatestBiocReleaseData(latestBiocReleaseData);
    }
    fetchData();
  }, []);

  return (
    <Navbar className={styles.navbar} expand="md">
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
            <Nav.Item className={styles.link}>
              <Nav.Link href="/learn">Learn</Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.link}>
              <Nav.Link href="/packages">Packages</Nav.Link>
            </Nav.Item>
            <NavDropdown
              className={styles.navlink}
              title="Blog"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                className={styles.link}
                href="https://bioconductor.github.io/biocblog/"
                target="_blank"
              >
                Community blog <FontAwesomeIcon icon={faExternalLink} />
              </NavDropdown.Item>
              <NavDropdown.Item className={styles.link} href="/posts">
                Developer&apos;s notes
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className={styles.navlink}
              title="Code of Conduct"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Header>Languages</NavDropdown.Header>
              {coc_locales.map(
                ({ locale, label }: { locale: string; label: string }) => (
                  <NavDropdown.Item
                    key={locale}
                    className={styles.link}
                    href={`/code-of-conduct/${locale}`}
                  >
                    {label}
                  </NavDropdown.Item>
                )
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
