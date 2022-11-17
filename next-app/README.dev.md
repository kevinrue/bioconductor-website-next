# README for developers

## Initial set up

- Install Node.js from <https://nodejs.org/en/>.
- Open Visual Studio Code.
- (Terminal) `npx create-next-app@latest next-app`: create template files.

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
