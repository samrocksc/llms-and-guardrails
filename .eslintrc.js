import js from "@eslint/js";
import globals from "globals";
import functional from "eslint-plugin-functional";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      functional.configs.lite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-module-boundary-types": "off",

      "no-restricted-syntax": [
        "error",
        {
          "selector": "TSInterfaceDeclaration",
          "message": "Use 'type' instead of 'interface' to maintain a functional-first codebase."
        },
        {
          "selector": "ClassDeclaration",
          "message": "Prefer functional components and pure functions over classes."
        }
      ],
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      "functional/no-return-void": [
        "error",
        {
          "allowNull": false,
          "allowUndefined": false,
          "ignoreInferredTypes": false
        }
      ],
      "functional/no-expression-statements": "error",
    }
  },
]);
