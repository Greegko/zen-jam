module.exports = {
  entry: ["./src/main.ts"],

  output: {
    filename: "bundle.js",
    path: __dirname + "/public"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".ts", ".tsx"]
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ["ts-loader"]
    }]
  }
};