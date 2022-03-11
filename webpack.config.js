const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "xerris",
    projectName: "calendar-app",
    webpackConfigEnv,
    argv,
  });

  defaultConfig.externals = ["single-spa", "react", "react-dom"];

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: ["@xerris/utility-app"],
  });
};
