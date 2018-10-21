var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/index.jsx'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      }
    ]
  },
  externals: {
    'react/addons': true, // important!!
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  }
};
