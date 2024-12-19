import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
    { ignores: ["dist"] },
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: "latest",
                ecmaFeatures: { jsx: true },
                sourceType: "module",
            },
        },
        settings: { react: { version: "18.3" } },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            // Base JavaScript rules
            ...js.configs.recommended.rules,

            // React-specific rules
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,

            // React Hooks-specific rules
            ...reactHooks.configs.recommended.rules,

            // Disable specific rules or apply custom rules
            "react/jsx-no-target-blank": "off",
            "react/prop-types": "off",
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],

            // Additional recommended rules to enforce code quality
            "react/jsx-uses-react": "error",
            "react/jsx-uses-vars": "error",
            "react-hooks/rules-of-hooks": 0, // do not checks rules of Hooks
            "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
            "react/no-unescaped-entities": "warn", // Warns against unescaped entities
            "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }], // Allow .js and .jsx files

            // Enable auto-fix for common issues
            "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
            "semi": ["error", "always"], // Enforce semicolons
            "quotes": ["error", "double", { avoidEscape: true }], // Enforce double quotes
            "indent": ["error", 4, { SwitchCase: 2 }], // Enforce 4 spaces indentation
            "comma-dangle": ["error", "always-multiline"], // Enforce consistent comma-dangle
        },
    },
];