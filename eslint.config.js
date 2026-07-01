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
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
    },
  },
  {
    files: ["src/functional/**/*.ts"],
    plugins: {
      functional,
    },
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      ...functional.configs.lite.rules,
      "functional/no-return-void": ["error", { "allowNull": false, "allowUndefined": false }],
      "functional/no-expression-statements": "error",
      "no-restricted-syntax": [
        "error",
        {
          "selector": "TSInterfaceDeclaration",
          "message": "Use 'type' instead of 'interface' to maintain a functional-first codebase."
        },
        {
          "selector": "ClassDeclaration",
          "message": "Prefer pure functions over classes."
        }
      ],
    },
  },
  {
    files: ["src/**/*.ts"],
    rules: {
      "complexity": ["warn", 5], 
    },
  },
]);
