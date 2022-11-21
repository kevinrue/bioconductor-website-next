library(BiocPkgTools)
library(magrittr)
library(dplyr)
library(RJSONIO)

# Fetch package information ----

# Get all package information (except books that cause an error)
# cat(deparse(names(BiocManager::repositories())))
pkgs <- BiocPkgTools::biocPkgList(repo = c("BioCsoft", "BioCann", "BioCexp", "BioCworkflows"))

# Export 1:1 package information ----

keep_columns <- lapply(pkgs, is.atomic)
# Coercion to data.frame is required to produce the right JSON format
pkgs_basic_info <- RJSONIO::toJSON(as.data.frame(pkgs[, names(which(unlist(keep_columns)))]), byrow = TRUE, colNames = TRUE)
write(pkgs_basic_info, file = "json/pkgs_basic_info.json")

# Export biocViews information ----

pkgs_biocviews <- pkgs %>% pull(biocViews, "Package")
pkgs_biocviews <- RJSONIO::toJSON(pkgs_biocviews, pretty = TRUE)
write(pkgs_biocviews_json, file = "json/pkgs_biocviews.json")
