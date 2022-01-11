module.exports = {
  rootDir: "src",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs",
    "@xerris/utility-app": "./src/__mocks__/@xerris/utility-app.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  resetMocks: false,
};
