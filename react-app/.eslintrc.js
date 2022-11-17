module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md#when-not-to-use-it
        "plugin:react/jsx-runtime",
    ],
    // https://github.com/eslint/eslint/issues/13008
    "overrides": [{
        "files": [
            ".eslintrc.js",
        ],
        "env": {
            "node": true,
            "browser": false,
        },
    }],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-extra-semi":"error"
    }
}
