---
title: "How to - Contribute"
author: "Kevin Rue-Albrecht"
created: "2022-11-21"
edited: "2022-11-21"
---

## Introduction

This website is mainly written in [JavaScript][javascript-website], using a
number of packages from [npm][npm-website], the Node Package Manager.

The learning curve for JavaScript and each package on the npm can be quite steep
at times.

Moreover, a variety of full-stack JavaScript frameworks are available to develop
both the front-end and back-end of web-applications, creating further confusion
and an intimidatig paradox of choice.

This website uses the [Next.js][nextjs-website] open-source web development
framework based on [React][react-website].

The initial template of the project was initialised using the following command:

```bash
npx create-next-app@latest next-app
```

## Fork the repository

The main repository is hosted on GitHub, [here][github-repository].

To get started, fork the repository on your own Github account.

## Clone the repository

Once you have forked the repository, clone it to your own computer.

```bash
git clone git@github.com:<username>/bioconductor-website-next.git
```

Note: Be sure to replace `<username>` by your own GitHub username.

## Use Visual Studio Code

So far, the project has been developed using Visual Studio Code, and a number of
Visual Studio Code Extensions to facilitate development and consistent code
formatting.

Install the following Visual Studio Code Extensions:

- [ESLint][eslint-website]
- [Prettier - Code formatter][prettier-website]

In particular, the configuration file `.vscode/settings.json` is set to
automatically format various file formats (JavaScript, TypeScript, JSON,
Markdown) on save using the [Prettier][prettier-website] Visual Studio Code
Extension.

Furthermore:

- Formatting can be triggered manually using a keyboard shortcut that depends on
  the operating system.
  - (macOS) `Option` + `Shift` + `F`
  - (Windows) `Ctrl` + `Shift` + `F`

## Install dependencies

First, install [Node.js][nodejs-website].

Set your working directory to the root of the project.

```bash
cd /path/to/project
```

Note: Be sure to replace `/path/to/project` by the path to your own working
directory.

Run the following command to install package dependencies from npm:

```bash
npm install
```

Note: You may occasionally need to run `npm install` again, when new
dependencies are added by other contributors.

## Run the application locally

Run the following command to run the application locally.

```bash
npm run dev
```

Open your browser at <http://localhost:3000/> to see the live application.

Note: Keep the terminal open to keep the application alive. Keep the application
alive while you edit the source code; the application will automatically refresh
when source files are saved. Press `Ctrl` + `C` to interrupt the process and
terminate the application.

## Open pull requests

When you are ready to share your contributions to the source code, commit your
changes and open a pull request on the main GitHub repository.

Your pull request will be reviewed at the earliest opportunity, and it will be
merged as soon as it is approved.

## Final words

This is a project for the Bioconductor community, as such:

- All contributions are welcome, including but not limited to: code, issues, bug
  reports, feature requests, and constructive discussions.
- The project adopts the [Bioconductor Code of Conduct][bioc-coc].

<!-- Links -->

[javascript-website]: https://www.javascript.com
[npm-website]: https://www.npmjs.com
[nextjs-website]: https://nextjs.org
[github-repository]: https://github.com/kevinrue/bioconductor-website-next
[eslint-website]: https://eslint.org
[prettier-website]: https://prettier.io/
[nodejs-website]: https://nodejs.org/
[bioc-coc]: https://bioconductor.github.io/bioc_coc_multilingual/
[react-website]: https://reactjs.org/
