import eslint from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["dist"] },
  {
    files: ["**/*.ts", "**/*.js", "**/*.mjs"],
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@stylistic/comma-dangle": ["error", "never"],
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-empty": ["off"]
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"]
      },
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
      vue,
      "@typescript-eslint": tseslint.plugin,
      "@stylistic": stylistic
    },
    rules: {
      ...vue.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@stylistic/comma-dangle": ["error", "never"],
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-empty": ["off"],

      "vue/html-quotes": ["error", "double"],
      "vue/html-indent": ["error", 2],
      "vue/no-v-html": "off",
      "vue/html-self-closing": ["error", {
        "html": {
          "void": "never",
          "normal": "never",
          "component": "always"
        },
        "svg": "never",
        "math": "never"
      }]
    }
  }
]);