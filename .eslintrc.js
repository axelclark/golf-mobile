module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "settings": {
    "react": {
      "version": "16.5",
    }
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ],
    "react/no-did-mount-set-state": 2,
    "react/no-direct-mutation-state": 2,
    "react/jsx-uses-vars": 2,
    "no-undef": 2,
    "react/prop-types": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-no-duplicate-props": 2,
  }
};
