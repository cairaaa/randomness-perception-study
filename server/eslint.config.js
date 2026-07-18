import eslint from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["dist"] },
  {
    files: ["**/*.ts", "**/*.js", "**/*.mjs"],
    plugins: {
      "@stylistic": stylistic
    },
    {
      "languageOptions": {
        "parserOptions": {
          "project": "./tsconfig.json"
        }
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@stylistic/comma-dangle": ["error", "never"],
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-empty": ["off"]
    }
  }
]);