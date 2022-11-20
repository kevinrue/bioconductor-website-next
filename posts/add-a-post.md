---
title: "How to - Add a Post"
author: "Kevin Rue-Albrecht"
created: "2022-11-18"
edited: "2022-11-20"
---

## Introduction

This website is a proof of concept demonstrating the transition of the existing [bioconductor.org][bioconductor-org] website to a [Node.js][node-js] application using the [Next.js][next-js] full-stack framework.

The source code for this application is hosted on this [GitHub repository][github-repo].

The contents of the post itself are written in Markdown in this [file][github-post-file].

## How Posts Work In This Application

When accessing the URI `/posts/[id]`, the application attempts to parse the file `/posts/[id].md`.
The application expects the Markdown file to contain a YAML header with the fields `title`, `author`, `added` and `edited`,
followed by the contents of the post in Markdown.

Title, author, date of first creation, and date of last editing metadata in the YAML header are displayed in dedicated components of the page,
while the body of the post is converted from Markdown to HTML and displayed _as-is_.

## How _You_ Can Add A Post

As a result, adding a new post is achieved by adding a new Markdown file in the `/posts/[id].md`, following the requirements described above.

The post will then be accessible at the URI `/posts/[id]`.

<!-- Links -->

[bioconductor-org]: http://bioconductor.org/
[node-js]: https://nodejs.org
[next-js]: https://nextjs.org/
[github-repo]: https://github.com/kevinrue/bioconductor-website-react
[github-post-file]: https://github.com/kevinrue/bioconductor-website-next/blob/main/posts/example.md
