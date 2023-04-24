"use strict";
require("babel-plugin-module-resolver");
const register = require("@babel/register").default;

register({
  extends: "./.babelrc",
  ignore: [/node_modules\/(?!three).*/, /node_modules\/three\/build\/(?!three\.module\.js)/],
  extensions: [".ts", ".tsx", ".js"]
});
