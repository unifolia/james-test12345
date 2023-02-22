module.exports = {
  extends: ["eslint:recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      classes: true
    },
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    jquery: true,
    commonjs: true,
    es6: true
  },
  rules: {
    "no-console": "off",
    "no-async-promise-executor": "error",
    "no-extra-parens": "error",
    "no-template-curly-in-string": "error",
    "array-callback-return": "error",
    "block-scoped-var": "error",
    curly: "error",
    "consistent-return": "error",
    "default-case": "error",
    "dot-notation": "error",
    eqeqeq: "error",
    "no-alert": "error",
    "no-eq-null": "error",
    "no-extra-label": "error",
    "no-implicit-coercion": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-multi-spaces": ["error", { ignoreEOLComments: false }],
    "no-multi-str": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-param-reassign": "error",
    "no-return-assign": "error",
    "no-self-compare": "error",
    "no-unmodified-loop-condition": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "require-await": "error",
    "wrap-iife": "error",
    "no-undef-init": "error",
    "no-use-before-define": "error",
    "array-bracket-newline": ["error", { multiline: true }],
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": "error",
    "brace-style": "error",
    camelcase: ["error", { ignoreDestructuring: true }],
    "comma-dangle": ["error", "always-multiline", { functions: "ignore" }],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true
      }
    ],
    "computed-property-spacing": "error",
    "func-call-spacing": "error",
    "function-paren-newline": 0,
    "key-spacing": "error",
    "no-bitwise": "error",
    "no-lonely-if": "error",
    "no-mixed-operators": "error",
    "no-multi-assign": "error",
    "no-multiple-empty-lines": ["error", { max: 5 }],
    "no-nested-ternary": "error",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "object-curly-spacing": ["error", "always"],
    semi: "error",
    "semi-spacing": "error",
    "space-before-function-paren": ["error", "never"],
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "arrow-parens": [
      "error",
      "always",
      {
        requireForBlockBody: true
      }
    ],
    "no-duplicate-imports": "error",
    "object-shorthand": ["error", "always", { avoidQuotes: true }],
    "prefer-const": "error",
    "prefer-spread": "error",
    "rest-spread-spacing": "error",
    "no-unused-vars": [0],
    "no-empty-functions": [ 0, { "allow": ["arrowFunctions"] }]
  },
  globals: {
    Hubs: false,
    production: false
  }
};
