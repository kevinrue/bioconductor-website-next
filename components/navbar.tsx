import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import styles from "../styles/NavigationBar.module.css";

// TODO: move website-wide constants to global settings (find out suitable method for this)
const coc_locales = [
  { locale: "en", label: "English" },
  { locale: "fr", label: "French" },
];

export default function NavigationBar() {
  const [latestBiocReleaseData, setLatestBiocReleaseData] = useState({
    version: undefined,
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
      // const latestBiocRelease = { version: "3.16", status: "release" };
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
            <NavDropdown
              className={styles.link}
              title="Packages"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item className={styles.link} href={`/packages/`}>
                All Releases
              </NavDropdown.Item>
              <NavDropdown.Header>Latest</NavDropdown.Header>
              {/* TODO: dynamically identify the most recent release */}
              {latestBiocReleaseData ? (
                <NavDropdown.Item
                  className={styles.link}
                  href={`/packages/${latestBiocReleaseData.version}`}
                >
                  {latestBiocReleaseData.version}
                </NavDropdown.Item>
              ) : (
                ""
              )}
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
