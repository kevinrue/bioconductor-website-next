---
title: "How to: Add User Inputs"
description: |
  This post uses the example of the text input component on the page
  `/packages/[bioc_release]/`, used to filter packages by name, to provide a guide
  for adding user inputs to this website.
author: "Kevin Rue-Albrecht"
created: "2022-11-20"
edited: "2022-11-28"
---

## Introduction

This post uses the example of the text input component on the page
`/packages/[bioc_release]/`, used to filter packages by name, to provide a guide
for adding user inputs to this website.

## Updates

This post has been updated several times, following rearrangement of the website
directory structure and routing.

Information may occasionally be temporarily out of date. In that case, please
open an [issue][repository-issues] on the GitHub repository.

## General advice

Adding interactive elements to a reactive website should be approached as an
iterative process, following agile principles.

As a general workflow:

- Add a static version of the component.
- Capture user inputs in the component.
- Update other components in the page.
- Add logic to manage invalid input values.

## Import the component

For each Bioconductor release, the page `/packages/[bioc_release]/` is defined
as a template in the file `/pages/packages/[bioc_release]/index.tsx`

Add the following line towards the top of the file
`/pages/packages/[bioc_release]/index.tsx` to import the `TextField` component
exported in the module `@mui/material/TextField`.

```jsx
import TextField from "@mui/material/TextField";
```

## Add a static component

In the HTML tag list returned by the default function exported in the file
`/pages/packages/[bioc_release]/index.tsx`, add the following lines to insert
the component at the desired place in the web page.

Replace the values in `id` and `label` with suitable values, and the value of
`variant` by a valid choice (refer to the [Material UI
documentation][variant-choices]).

```jsx
<TextField id="package-search" label="Name" variant="outlined" />
```

## Handle user input

In the default function exported in the file
`/pages/packages/[bioc_release]/index.tsx`, preferably towards the start of the
function body, add the following line to define a React Hook that tracks the
state of the function component, initialising it to the empty string `""`:

```jsx
const [packageSearchString, setPackageSearchString] = useState("");
```

Then, later in the function body, add the following lines to define a function
that updates the state of the component in response to an event:

```jsx
const handleChangePackageSearchString = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  setPackageSearchString(event.target.value);
};
```

Finally, update the `<TextField>` tag as follows, to invoke the function above
whenever the component changes, and to update the value of the component with
the current user input.

```jsx
<TextField
  id="package-search"
  label="Name"
  variant="outlined"
  onChange={handleChangePackageSearchString}
  value={packageSearchString}
/>
```

## Update other components in the page

Aside from the text input, the page `/packages/[bioc_release]/` displays a table
that contains information for all the packages available in the release version
`[bioc_release]` of the Bioconductor repository.

The purpose of the text input is to filter the table to display only packages
whose name matches the user-defined pattern typed in that text input.

In the file `/pages/packages/[bioc_release]/index.tsx`, outside the default
exported function, add the following lines to define a function that takes the
name of a package and the user-defined pattern, and returns `true` if the name
matches the pattern, and `false` otherwise.

```jsx
const filterPackageNamePattern = (name: string, pattern: string) => {
  var matcher = new RegExp(pattern);
  if (matcher.test(name)) {
    return true;
  } else {
    return false;
  }
};
```

Then, update the (pre-existing) code that parses the JSON-formatted data into
data that are passed to the `DataTable` component of the page as follows, to
filter the list of package names, retain only those that match the pattern, and
return a list of `Link` components that will be used to populate the table.

```jsx
const table_data = JSON.parse(data_packages)
  .filter((object: any) =>
    filterRowsByPackageColumn(object.Package, debouncedPackageSearchString)
  )
  .map((object: any) => {
    return {
      Package: (
        <Link
          className={styles.link}
          href={`${router.asPath}/${object.Package}`}
        >
          {object.Package}
        </Link>
      ),
    };
  });
```

Note: This code produces data to fill a single-column datatable. This code was
subsequently extended to produce data for additional columns (e.g., package
title, package version, date of latest update).

## Manage invalid input values

While the text input theoretically supports regular expression, the extreme
reactivity of the page causes it to crash when the user input represents an
invalid or incomplete regular expression (e.g., when the value is `^[` while
attempting to type `^[Aa]`).

Update the body of the `filterPackageNamePattern` function as follows, to
display the full table while an invalid regular expression is detected.
Specifically, the function returns `true` for all package names when the regular
expression is invalid.

```jsx
const filterPackageNamePattern = (name: string, pattern: string) => {
  try {
    var matcher = new RegExp(pattern);
  } catch (err) {
    return true;
  }
  if (matcher.test(name)) {
    return true;
  } else {
    return false;
  }
};
```

## Final words

Following this [blog post][blog-post-debounce], I also decided to add the file
`/lib/useDebounce.js` as well as some additional logic in the file
`/pages/packages/[bioc_release]/index.tsx` to debounce the invalidation of the
text input. Specifically, the page only attempts to filter the table of packages
500ms after the last detected change in the text input component.

<!-- Links -->

[variant-choices]: https://mui.com/material-ui/api/text-field/
[blog-post-debounce]: https://hackernoon.com/how-to-use-debounce-in-nextjs
[repository-issues]:
  https://github.com/kevinrue/bioconductor-website-next/issues
