module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "plugin:react-hooks/recommended",
    "plugin:import/typescript",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      alias: {
        map: [
          ["~", "./src"], // Configuramos o alias '~' para apontar para 'src'
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // Extensões que o resolver suporta
      },
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-named-as-default": 0,
    "import/no-unresolved": ["error", { ignore: ["^@/"] }],
    "react/display-name": "off",
    "@typescript-eslint/ban-types": "off",
    "import/named": "off",
    "react-hooks/exhaustive-deps": "warn",
  },
};
