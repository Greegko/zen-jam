const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: ["./src/main.ts"],
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/../dist"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".ts", ".tsx"]
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: './' },
      ],
    })
  ],

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ["ts-loader"]
    },
  ]
  }
};