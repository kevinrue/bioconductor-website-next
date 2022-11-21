# Code adapted from:
# <https://github.com/grimbough/code.bioconductor.org/blob/master/mirror-updater/utils.R#L9>
repo_dir <- tempdir()
gert::git_clone("https://git.bioconductor.org/admin/manifest",
    path = file.path(repo_dir, "manifest"),
    verbose = FALSE)
manifest <- scan(file.path(repo_dir, "manifest", "software.txt"), 
                     what = character(), quiet = TRUE,
                     blank.lines.skip=TRUE, sep = "\n", skip = 1)
manifest <- gsub("Package: ", "", x = manifest, fixed = TRUE)
json_packages <- RJSONIO::toJSON(data.frame(name=manifest), pretty = TRUE)
write(json_packages, file = "json/packages.json")
