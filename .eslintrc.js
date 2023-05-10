module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        'plugin:cypress/recommended',
        "plugin:react/recommended",
        "prettier"
    ],
    rules: {
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "cypress/no-assigning-return-values": "error",
        "cypress/no-unnecessary-waiting": "warn",
        "cypress/assertion-before-screenshot": "warn",
        "cypress/no-force": "warn",
        "cypress/no-async-tests": "error",
        "cypress/no-pause": "error",
        "no-duplicate-case": "error",
        "no-dupe-else-if": "error",
        "no-dupe-args": "error"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "cypress",
        "@cypress/json",
        "chai-friendly",
        "cucumber"
    ]
}
