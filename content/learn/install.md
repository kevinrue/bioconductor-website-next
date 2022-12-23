---
title: "Install Bioconductor for the first time"
description: |
  Welcome to the Bioconductor community!

  This guide details how to install the latest release of Bioconductor on your
  computer for the first time.
edited: "2022-11-29"
compiled: "2022-12-23"
output:
  md_document:
    preserve_yaml: true
    variant: markdown_github
---

## Welcome

Welcome to the Bioconductor community!

This guide details how to install the latest release of Bioconductor on
your computer for the first time.

This process is different from updating your Bioconductor installation,
which will be described in a separate guide (coming soon).

## Install *R*

The current release of Bioconductor is version 3.16; it works with
<i class="fab fa-r-project"></i> version 4.2. Users of older
<i class="fab fa-r-project"></i> versions must update their installation
to take advantage of new features and to access packages that have been
added to Bioconductor since the last release.

### Windows

-   Navigate to the [CRAN](https://cran.r-project.org/) website.
-   Follow the links ‘Download R for Windows’ and ‘install R for the
    first time’.
-   Click the link ‘Download R-x.x.x for Windows’ (`x.x.x` being the
    latest version of <i class="fab fa-r-project"></i>).
-   Run the `.exe` file that was just downloaded.

### macOS

-   Navigate to the [CRAN](https://cran.r-project.org/) website.
-   Follow the link ‘Download R for macOS’.
-   Click on the `.pkg` file to download the latest
    <i class="fab fa-r-project"></i> version.
-   Double click on the downloaded file to install
    <i class="fab fa-r-project"></i>.

Additionally:

-   It is also a good idea to install
    [XQuartz](https://www.xquartz.org/) (needed by some packages).

### Linux

-   Navigate to the [CRAN](https://cran.r-project.org/) website.
-   Next to the link ‘Download R for Linux’, click on the name of your
    Linux distribution.
-   Follow the instructions on the web page.

The [CRAN](https://cran.r-project.org/) web pages provide information to
get the most recent version of <i class="fab fa-r-project"></i> for
common distributions. For most distributions, you could use your package
manager (e.g., for Debian/Ubuntu run `sudo apt-get install r-base`, and
for Fedora sudo `yum install R`), but we don’t recommend this approach
as the versions provided by this are usually out of date.

## Install the BiocManager package

The *[BiocManager](https://CRAN.R-project.org/package=BiocManager)*
package is a convenient tool distributed on the
[CRAN](https://cran.r-project.org/) repository to install and update
Bioconductor packages.

To install the package, type the following in an
<i class="fab fa-r-project"></i> console:

``` r
> install.packages("BiocManager")
```

## Install the current Bioconductor release

To install the latest version of Bioconductor core packages, type the
following in an <i class="fab fa-r-project"></i> console:

``` r
> BiocManager::install(version = "3.16")
```

## Check your installation

To check your installation, restart your
<i class="fab fa-r-project"></i> session, and type the following in the
<i class="fab fa-r-project"></i> console:

``` r
> BiocManager::version()
[1] '3.16'
```

## Final words

Congratulations! You are ready to install the latest version of more
Bioconductor packages!

<!-- Links -->
