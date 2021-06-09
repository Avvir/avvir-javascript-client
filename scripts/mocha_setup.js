"use strict";
require("babel-plugin-module-resolver");
const register = require("@babel/register").default;


// function noop() {
//   return null;
// }

// prevent mocha tests from breaking when trying to require a css file
// require.extensions[".css"] = noop;
// require.extensions[".png"] = noop;
// require.extensions[".jpg"] = noop;
// require.extensions[".jpeg"] = noop;
// require.extensions[".bmp"] = noop;
// require.extensions[".svg"] = noop;
// require.extensions[".obj"] = noop;
