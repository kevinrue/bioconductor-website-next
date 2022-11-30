---
title: "Get started"
edited: "2022-11-29"
compiled: "2022-11-30"
output:
  md_document:
    preserve_yaml: true
    variant: markdown_github
---

## Welcome

Welcome to the Bioconductor community!

This guide details how to install the latest release of Bioconductor on
your computer.

## Pre-requisites

### Install <i class="fab fa-r-project"></i>

The current release of Bioconductor is version 3.16; it works with
<i class="fab fa-r-project"></i> version 4.2. Users of older
<i class="fab fa-r-project"></i> versions must update their installation
to take advantage of new features and to access packages that have been
added to Bioconductor since the last release.

Follow the instructions for your operating system in [this
episode](https://carpentries-incubator.github.io/bioc-intro/setup.html)
of the Carpentries lesson “Introduction to data analysis with R and
Bioconductor”. The page also contains information to check which version
of <i class="fab fa-r-project"></i> you are using; if you already have
the correct version, you may not need to do anything!

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
