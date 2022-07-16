const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const destinationDirectory = "public";

const copyWebpackPlugin = new CopyWebpackPlugin([
  "resources"
]);

const cleanWebpackPlugin = new CleanWebpackPlugin(
  destinationDirectory, {
    root: process.cwd(),
    verbose: true,
    dry: false
  }
);

module.exports = {
  entry: {
    "bundle":      "./client/index.js",
    "sw":          "./client/sw.js"
  },
  plugins: [
    cleanWebpackPlugin,
    copyWebpackPlugin
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: path.join(__dirname, destinationDirectory),
    publicPath: "/",
    filename: "[name].js",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "this"
  },
  devServer: {
    contentBase: destinationDirectory,
    port: 9000,
    proxy: {
      "/playlists": "http://localhost:3000"
    }
  }
};
