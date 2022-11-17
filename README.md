# Bioconductor website using React

In development.

## Initial set up

Following tutorial at <https://code.visualstudio.com/docs/nodejs/reactjs-tutorial>

- Install Node.js from <https://nodejs.org/en/>.
- Open Visual Studio Code.
- (Terminal) `npx create-react-app my-app`: create template files.
- (Terminal) `cd my-app`: .
- (Terminal) `npm start`.
- Visual Studio Extensions:
  - `ESlint`

## Configuration

ESlint may report a problem stating `'React' must be in scope when using JSX`.

To fix this message, open the file `.eslintrc.js` and add the line `"plugin:react/jsx-runtime",` in the `extends` section.

```yaml
    "extends": [
        "plugin:react/jsx-runtime",
    ],
```

Source:
<https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md#when-not-to-use-it>.

ESlint may report a problem stating `'module' is not defined`.

To fix this issue, open the file `.eslintrc.js` and add the following lines in the `"files"` and `"env"` fields in the `"overrides"` section.

```yaml
    "overrides": [{
        "files": [
            ".eslintrc.js",
        ],
        "env": {
            "node": true,
            "browser": false,
        },
    }],
```

Source: <https://github.com/eslint/eslint/issues/13008>

## Set up for contributors

- Clone repository from GitHub.
- Open workspace in Visual Studio Code.

## Preview & Testing

Markdown Documents:

- `Ctrl` + `Shift` + `V`: Preview Markdown documents (applies to the document currently open).

Application:

- Terminal: `npm start` (start the web server and open a new browser instance).

## Linting

Initial configuration:

- (Terminal) `npm install -g eslint`:

In Visual Studio Code, the 'Problems' panel lists syntax erors detected by active linting extensions.

- `Ctrl` + `Shift` + `M`: Open 'Problems' panel in Visual Studio Code.

## Formatting

- `Alt` + `Shift` + `F`: Format Document (applies to the document currently open).

## Debugging

Initial configuration:

- `Ctrl` + `Shift` + `D`: Open the 'Run and Debug' panel.
- Click on 'select the create a launch.json file link'.
- Change the port of the url from `8080` to `3000`.

Usage:

- `F5`: Run and Debug (opens a new browser instance using the configuration in `.vscode.json`).
- `F10`: Step through the code (only applies if breakpoints are hit).
