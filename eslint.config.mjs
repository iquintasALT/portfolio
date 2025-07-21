/* eslint-disable import/no-anonymous-default-export */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import checkFilePlugin from "eslint-plugin-check-file";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("next", "next/core-web-vitals", "prettier"),
  {
    plugins: {
      prettier,
      // Add check-file plugin for naming conventions
      "check-file": checkFilePlugin,
    },
    rules: {
      "prettier/prettier": "error",
      camelcase: "off",
      "import/prefer-default-export": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-props-no-spreading": "off",
      "react/no-unused-prop-types": "off",
      "react/require-default-props": "off",
      "react/no-unescaped-entities": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],
      // Enforce kebab-case for file and folder names
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!(__tests__)": "KEBAB_CASE",
        },
      ],
      // Restrict cross-feature imports in src/features
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/features/projects",
              from: "./src/features",
              except: ["./projects"],
            },
            {
              target: "./src/features/skills",
              from: "./src/features",
              except: ["./skills"],
            },
            {
              target: "./src/features/mdx",
              from: "./src/features",
              except: ["./mdx"],
            },
            {
              target: "./src/features/cv",
              from: "./src/features",
              except: ["./cv"],
            },
            {
              target: "./src/features/media",
              from: "./src/features",
              except: ["./media"],
            },
            {
              target: "./src/features/navigation",
              from: "./src/features",
              except: ["./navigation"],
            },
            {
              target: "./src/features/about",
              from: "./src/features",
              except: ["./about"],
            },
            {
              target: "./src/features/i18n",
              from: "./src/features",
              except: ["./i18n"],
            },
            {
              target: "./src/features/theme",
              from: "./src/features",
              except: ["./theme"],
            },
            // Enforce unidirectional codebase: src/app can import from features, not the other way
            {
              target: "./src/features",
              from: "./src/app",
            },
            // Shared modules: features/app can import from shared, but not the other way
            {
              target: ["./src/components", "./src/hooks", "./src/lib", "./src/types", "./src/utils"],
              from: ["./src/features", "./src/app"],
            },
          ],
        },
      ],
      // Disallow any import path containing ./ or ../
      "no-restricted-imports": [
        "error",
        {
          patterns: ["*./*", "*../*"],
        },
      ],
    },
  },
  ...compat.extends("plugin:@typescript-eslint/recommended", "prettier").map((config) => ({
    ...config,
    files: ["**/*.+(ts|tsx)"],
  })),
  {
    files: ["**/*.+(ts|tsx)"],
    plugins: {
      "@typescript-eslint": typescriptEslintEslintPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-use-before-define": [0],
      "@typescript-eslint/no-use-before-define": [1],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
];
