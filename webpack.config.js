var webpack = require('webpack');

module.exports = {
  entry: './src/anno.litcoffee',
  output: {
    filename: './dist/anno.js',
    libraryTarget: 'umd',
  },
  externals: {
    'cash-dom': 'cash-dom',
  },
  resolve: {
    modulesDirectories: ["./node_modules", "./bower_components"],
  },
  module: {
    loaders: [
      { test: /\.litcoffee$/, loaders: ['coffee-loader?literate'] }
    ]
  }
};
