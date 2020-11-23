module.exports = {
    "roots": [
      "<rootDir>/__tests__"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest",
      ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "jest-transform-stub"
    },
  }