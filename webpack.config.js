const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV;

function getPlugins() {
  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: "./src/index.html"})
  ];

  return plugins;
}

module.exports = {
  mode: mode,
  devtool: mode === "development" ? "inline-source-map" : "(none)",
  entry: {
    main: "./src/index.js"
  },
  plugins: getPlugins(mode),
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "build")
  }
};
