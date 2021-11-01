const path = require("path"),
  webpack = require("webpack"),
  nodeExternals = require("webpack-node-externals");

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || "development",
      }
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

const env = getClientEnvironment();

const generalConfig = {
  entry: path.join(__dirname, "./avvir.ts"),
  mode: "production",
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        use: {
          loader: "ts-loader",
        },
        test: /\.ts$/,

        include: [
          // path.resolve(__dirname, 'tests'),
          path.resolve(__dirname, "source"),
          path.resolve(__dirname, "node_modules"),
        ]
      }
    ]
  }
};

const nodeConfig = {
  target: "node",
  output: {
    path: path.join(__dirname, "dist"),
    filename: `avvir_api.node.js`,
    libraryTarget: "umd",
    libraryExport: "default",
  },
  externals: [nodeExternals()],
  resolve: {
    // Add `.ts` and `.js` as a resolvable extension
    extensions: [".ts", ".js"],
    alias: {
      fetch: "node-fetch"
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: "node-fetch"
    })
  ]
};

const browserConfig = {
  target: "browserslist",
  output: {
    path: path.join(__dirname, "dist"),
    filename: `avvir_api.web.js`,
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this",
    umdNamedDefine: true,
    library: "AvvirApi"
  },
  resolve: {
    // Add `.ts` and `.js` as a resolvable extension
    extensions: [".ts", ".js"],
    alias: {
      buffer: "buffer",
      crypto: "crypto-browserify",
      process: "process/browser.js",
      stream: "stream-browserify",
      util: "util/util.js",
    }
  },
  plugins: [
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }.
    new webpack.DefinePlugin(env.stringified),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"]
    })
  ],
};

module.exports = (env, argv) => {
  Object.assign(nodeConfig, generalConfig);
  Object.assign(browserConfig, generalConfig);

  return [browserConfig, nodeConfig];
};
