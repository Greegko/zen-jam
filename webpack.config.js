const CopyWebpackPlugin = require('copy-webpack-plugin')

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

  plugins: [
    new CopyWebpackPlugin({
       patterns: [
        { from: 'build/assets', to: 'assets' },
      ],
    })
  ],

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: ["ts-loader"]
    },
    
    // {
    //   test: /\.(png|svg|jpg|gif)$/,
    //   use: [
    //     'file-loader'
    //   ]
    // }, 
  ]
  }
};