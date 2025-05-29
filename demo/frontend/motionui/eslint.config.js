import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import path from "node:path";

export default [
    js.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        ignores: ["vite.config.ts", "node_modules/**", "dist/**"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: path.resolve(__dirname, "./tsconfig.app.json"),
                tsconfigRootDir: __dirname,
            },
        },
        plugins: {
            "@typescript-eslint": ts,
            react,
            "react-hooks": reactHooks,
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/no-floating-promises": "warn",
        }

    },
    prettier
];
