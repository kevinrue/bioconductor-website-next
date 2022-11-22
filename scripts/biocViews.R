library(BiocPkgTools)
library(magrittr)
library(dplyr)
library(RJSONIO)

# Fetch installation information ----

bioc_version <- BiocManager::version()
snapshot_date <- Sys.Date()

# Set up release directory ----

release_json_dir <- file.path("json", bioc_version)
dir.create(release_json_dir, showWarnings = FALSE, recursive = TRUE)

# Export snapshot date ----

write(as.character(snapshot_date), file = file.path(release_json_dir, "snapshot_date.json"))

# Fetch package information ----

# Get all package information (except books that cause an error)
# cat(deparse(names(BiocManager::repositories())))
pkgs <- BiocPkgTools::biocPkgList(repo = c("BioCsoft", "BioCann", "BioCexp", "BioCworkflows"))

# Export 1:1 package information ----

keep_columns <- lapply(pkgs, is.atomic)
# Coercion to data.frame is required to produce the right JSON format
pkgs_basic_info <- RJSONIO::toJSON(as.data.frame(pkgs[, names(which(unlist(keep_columns)))]), byrow = TRUE, colNames = TRUE)
write(pkgs_basic_info, file = file.path(release_json_dir, "pkgs_basic_info.json"))

# Export biocViews information ----

pkgs_biocviews <- pkgs %>% pull(biocViews, "Package")
pkgs_biocviews <- RJSONIO::toJSON(pkgs_biocviews, pretty = TRUE)
write(pkgs_biocviews, file = file.path(release_json_dir, "pkgs_biocviews.json"))
