# README for developers

## Initial set up

- Install Node.js from <https://nodejs.org/en/>.
- Open Visual Studio Code.
- (Terminal) `npx create-next-app@latest next-app`: create template files.

The contents of the `next-app` directory were subsequently moved to the root of the workspace, and the empty `next-app` directory was removed.

## Configuration

When the app is not directly at the root of the VScode workspace,
open the file `settings.json` and add the path to the app directory
in the `"eslint.workingDirectories"` field.

```json
{
    "eslint.workingDirectories": [
        "next-app"
    ]
}
```

This was subsequently removed after the contents of the `next-app` were moved
to the root of the workspace.
