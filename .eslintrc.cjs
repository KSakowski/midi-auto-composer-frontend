/* eslint-env node */
module.exports = {
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier"
  ],
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "parser": {
      "ts": "@typescript-eslint/parser"
    }
  },
  "plugins": ["@typescript-eslint", "simple-import-sort", "unused-imports"],
  "overrides": [
    {
      "files": [
        "*.ts",
        "*.vue"
      ],
      "rules": {
        "no-console": "warn",
        "no-debugger": "error",
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/no-empty-interface": 0,
        "@typescript-eslint/ban-ts-comment": 0,
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/no-empty-function": ["error", { "allow": ["arrowFunctions"] }],
        "vue/multi-word-component-names": 0,
        "vue/no-v-text-v-html-on-component": ["warn"],
        "vue/no-v-html": ["warn"],
        "vue/no-dupe-keys": ["warn"],
        "no-restricted-syntax": ["error", "DebuggerStatement", "LabeledStatement", "WithStatement"],
        "no-implicit-coercion": "error",
        "simple-import-sort/imports": ["warn", {
          "groups": [
            ["^node:"],
            ["^@?\\w"],
            ["^"],
            ["^\\."],
            ["^\\u0000"]
          ]
        }],
        "simple-import-sort/exports": "warn",
        "unused-imports/no-unused-imports": "warn",
      }
    }
  ]
}
