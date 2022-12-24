library(biocViews)
library(graph)
# library(BiocPkgTools)
# library(magrittr)
# library(dplyr)
library(RJSONIO)

# Fetch installation information ----

bioc_version <- BiocManager::version()

# Set up release directory ----

release_json_dir <- file.path("json", "releases", bioc_version)
dir.create(release_json_dir, showWarnings = FALSE, recursive = TRUE)

# Fetch biocViews information ----

# Get biocViews graphNEL
data("biocViewsVocab")

# Export biocViews edges ----

biocviews_edges <- edges(biocViewsVocab)
# biocviews_edges[["BiocViews"]] <- NULL
biocviews_edges <- RJSONIO::toJSON(biocviews_edges, pretty = TRUE)
write(biocviews_edges, file = file.path(release_json_dir, "biocviews_edges.json"))
