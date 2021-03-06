module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-async-promise-executor": "error",
    "no-await-in-loop": "warn",
    "no-template-curly-in-string": "error",
    "require-atomic-updates": "error",
    "array-callback-return": "error",
    "block-scoped-var": "warn",
    complexity: "warn",
    "consistent-return": "error",
    curly: "warn",
    "dot-notation": "warn",
    eqeqeq: "error",
    "no-alert": "error",
    "no-caller": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implied-eval": "error",
    "no-invalid-this": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-multi-spaces": "warn",
    "no-multi-str": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-return-assign": "error",
    "no-return-await": "warn",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-catch": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-with": "error",
    "prefer-promise-reject-errors": "error",
    radix: "error",
    "vars-on-top": "error",
    "wrap-iife": "error",
    yoda: "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-undef-init": "error",
    "no-undefined": "error",
    "no-undef": "error",
    "global-require": "error",
    "handle-callback-err": "error",
    "no-buffer-constructor": "error",
    "no-mixed-requires": "error",
    "no-new-require": "error",
    "no-path-concat": "error",
    "no-process-env": "error",
    "no-process-exit": "warn",
    "no-sync": "error",
    "arrow-body-style": ["error", "as-needed"],
    "arrow-spacing": "error",
    "no-confusing-arrow": ["error", { allowParens: true }],
    "generator-star-spacing": ["error", { before: true, after: false }],
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true, allowUnboundThis: true }],
    "prefer-const": "error",
    "prefer-destructuring": ["error", { array: true, object: true }, { enforceForRenamedProperties: true }],
    "prefer-numeric-literals": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "rest-spread-spacing": "error",
    "sort-imports": "error",
    "template-curly-spacing": "error",
    "require-await": "error",
    "yield-star-spacing": ["error", "after"],
    //Styling
    "array-bracket-newline": ["warn", "consistent"],
    "array-bracket-spacing": ["warn", "never"],
    "array-element-newline": ["warn", "consistent"],
    "block-spacing": "warn",
    "brace-style": "warn",
    "capitalized-comments": "warn",
    "no-console": "off"
  }
};
