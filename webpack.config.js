var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(__dirname, './avvir.ts'),
  target: 'node',
  mode: "production",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'avvir_api.js',
    libraryTarget : 'commonjs2'
  },
  optimization: {
    minimize: false
  },
  externals: [nodeExternals({
    // this WILL include these in the bundle:
    allowlist: []
  })],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {

    rules: [
      {
        use: {
          loader: 'ts-loader',
        },
        test: /\.ts$/,

        include: [
          // path.resolve(__dirname, 'tests'),
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
