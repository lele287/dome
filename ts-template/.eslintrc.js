module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "space-before-function-paren": 0,
    indent: "off",
    "no-undef": "off",
    // "prettier/prettier": "on",
    "@typescript-eslint/no-inferrable-types": "off", // 关闭类型推断
    "@typescript-eslint/ban-ts-comment": "off",
  },
};
