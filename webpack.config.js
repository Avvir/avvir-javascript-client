var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './tests/test_utils/webpack_test_root.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'test_bundle.js'
  },
  externals: [nodeExternals({
    // this WILL include these in the bundle:
    allowlist: []
  })],
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
        },
        test: /\.ts$/,

        include: [
          path.resolve(__dirname, 'tests'),
          path.resolve(__dirname, 'source'),
          path.resolve(__dirname, 'node_modules'),
        ]
      },
      {
        use: {
          loader: './unit_tests/test_helpers/webpack_helpers/zero_loader',
        },
        test: /\.(png|jpg)$/,
      }
    ]
  }
};
