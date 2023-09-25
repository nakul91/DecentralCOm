const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src", "index.js"),
    widget: path.resolve(__dirname, "widget", "index.js"),
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
  },
  devServer: {
    hot: false,
    liveReload: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
