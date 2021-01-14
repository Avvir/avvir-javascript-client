/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./source/models/enums/user_auth_type.ts
var UserAuthType;

(function (UserAuthType) {
  UserAuthType["GATEWAY_JWT"] = "GATEWAY_JWT";
  UserAuthType["BASIC"] = "BASIC";
  UserAuthType["FIREBASE"] = "FIREBASE";
})(UserAuthType || (UserAuthType = {}));

var GATEWAY_JWT = UserAuthType.GATEWAY_JWT;
var BASIC = UserAuthType.BASIC;
var FIREBASE = UserAuthType.FIREBASE;
/* harmony default export */ const user_auth_type = (UserAuthType);
;// CONCATENATED MODULE: ./source/utilities/get_authorization_headers.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var GatewayUser = function GatewayUser(authType, idToken, role) {
  _classCallCheck(this, GatewayUser);

  this.authType = void 0;
  this.gatewayUser = void 0;
  this.authType = authType;
  this.gatewayUser = {
    idToken: idToken,
    role: role
  };
};

var getAuthorizationHeaders = function getAuthorizationHeaders(user) {
  if (!user) {
    return null;
  }

  switch (user === null || user === void 0 ? void 0 : user.authType) {
    case GATEWAY_JWT:
      {
        return {
          Authorization: "Bearer ".concat(user.gatewayUser.idToken)
        };
      }

    case BASIC:
      {
        return {
          Authorization: "Basic ".concat(Buffer.from("".concat(user.username, ":").concat(user.password)).toString("base64"))
        };
      }

    case FIREBASE:
      {
        return {
          firebaseIdToken: user.firebaseUser.idToken
        };
      }

    default:
      {
        console.warn("no authentication");
        return null;
      }
  }
};

/* harmony default export */ const get_authorization_headers = (getAuthorizationHeaders);
;// CONCATENATED MODULE: ./source/utilities/request_headers.ts
function makePostHeaders(contentType) {
  return {
    "Accept": contentType || "application/json",
    "Content-Type": contentType || "application/json"
  };
}

makePostHeaders.Accept = "application/json";
makePostHeaders["Content-Type"] = "application/json";
var httpPostHeaders = makePostHeaders;

function makeGetHeaders(contentType) {
  return {
    "Accept": "application/json"
  };
}

makeGetHeaders.Accept = "application/json";
var httpGetHeaders = makeGetHeaders;
;// CONCATENATED MODULE: ./source/utilities/reduce_user_session.ts
var isFirebaseUser = function isFirebaseUser(user) {
  return !!(user !== null && user !== void 0 && user.firebaseUser);
};
var isGatewayUser = function isGatewayUser(user) {
  return !!(user !== null && user !== void 0 && user.gatewayUser);
};
;// CONCATENATED MODULE: ./source/utilities/http.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function http_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Http = /*#__PURE__*/function () {
  function Http() {
    http_classCallCheck(this, Http);
  }

  _createClass(Http, null, [{
    key: "get",
    value: function get(url, user) {
      return fetch(url, {
        method: "GET",
        headers: _objectSpread(_objectSpread({}, httpPostHeaders), get_authorization_headers(user))
      });
    }
  }, {
    key: "delete",
    value: function _delete(url, user) {
      return fetch(url, {
        method: "DELETE",
        headers: _objectSpread(_objectSpread({}, httpPostHeaders), get_authorization_headers(user))
      });
    }
  }, {
    key: "post",
    value: function post(url, user, body) {
      return fetch(url, {
        method: "POST",
        headers: _objectSpread(_objectSpread({}, httpPostHeaders), get_authorization_headers(user)),
        body: JSON.stringify(body)
      });
    }
  }, {
    key: "patch",
    value: function patch(url, user, body) {
      return fetch(url, {
        method: "PATCH",
        headers: _objectSpread(_objectSpread({}, httpPostHeaders), get_authorization_headers(user)),
        body: JSON.stringify(body)
      });
    }
  }, {
    key: "addAuthToDownloadUrl",
    value: function addAuthToDownloadUrl(baseUrl, user) {
      if (user) {
        if (isGatewayUser(user)) {
          return "".concat(baseUrl, "?auth=").concat(user.gatewayUser.idToken);
        } else if (isFirebaseUser(user)) {
          return "".concat(baseUrl, "?firebaseAuth=").concat(user.firebaseUser.idToken);
        }
      } else {
        return baseUrl;
      }
    }
  }]);

  return Http;
}();

Http.baseUrl = process.env.AVVIR_GATEWAY_URL;

;// CONCATENATED MODULE: external "underscore"
const external_underscore_namespaceObject = require("underscore");;
var external_underscore_default = /*#__PURE__*/__webpack_require__.n(external_underscore_namespaceObject);
;// CONCATENATED MODULE: external "extendable-error-class"
const external_extendable_error_class_namespaceObject = require("extendable-error-class");;
var external_extendable_error_class_default = /*#__PURE__*/__webpack_require__.n(external_extendable_error_class_namespaceObject);
;// CONCATENATED MODULE: ./source/models/response_error.ts
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function response_error_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var ResponseError = /*#__PURE__*/function (_ExtendableError) {
  _inherits(ResponseError, _ExtendableError);

  var _super = _createSuper(ResponseError);

  function ResponseError(message, verboseMessage, response, responseBody) {
    var _this;

    response_error_classCallCheck(this, ResponseError);

    _this = _super.call(this, message);
    _this.name = void 0;
    _this.message = void 0;
    _this.verboseMessage = void 0;
    _this.status = void 0;
    _this.responseBody = void 0;
    _this.name = "ResponseError";
    _this.message = message;
    _this.verboseMessage = verboseMessage;
    _this.status = response.status;
    _this.responseBody = responseBody;
    return _this;
  }

  return ResponseError;
}((external_extendable_error_class_default()));

/* harmony default export */ const response_error = (ResponseError);
;// CONCATENATED MODULE: ./source/resources/response_statuses.json
const response_statuses_namespaceObject = JSON.parse("{\"100\":\"Continue\",\"101\":\"Switching Protocol\",\"102\":\"Processing (WebDAV)\",\"103\":\"Early Hints\",\"200\":\"OK\",\"201\":\"Created\",\"202\":\"Accepted\",\"203\":\"Non-Authoritative Information\",\"204\":\"No Content\",\"205\":\"Reset Content\",\"206\":\"Partial Content\",\"207\":\"Multi-Status (WebDAV)\",\"208\":\"Multi-Status (WebDAV)\",\"226\":\"IM Used (HTTP Delta encoding)\",\"300\":\"Multiple Choice\",\"301\":\"Moved Permanently\",\"302\":\"Found\",\"303\":\"See Other\",\"304\":\"Not Modified\",\"305\":\"Use Proxy\",\"306\":\"unused\",\"307\":\"Temporary Redirect\",\"308\":\"Permanent Redirect\",\"400\":\"Bad Request\",\"401\":\"Unauthorized\",\"402\":\"Payment Required\",\"403\":\"Forbidden\",\"404\":\"Not Found\",\"405\":\"Method Not Allowed\",\"406\":\"Not Acceptable\",\"407\":\"Proxy Authentication Required\",\"408\":\"Request Timeout\",\"409\":\"Conflict\",\"410\":\"Gone\",\"411\":\"Length Required\",\"412\":\"Precondition Failed\",\"413\":\"Payload Too Large\",\"414\":\"URI Too Long\",\"415\":\"Unsupported Media Type\",\"416\":\"Requested Range Not Satisfiable\",\"417\":\"Expectation Failed\",\"418\":\"I'm a teapot\",\"421\":\"Misdirected Request\",\"422\":\"Unprocessable Entity (WebDAV)\",\"423\":\"Locked (WebDAV)\",\"424\":\"Failed Dependency (WebDAV)\",\"425\":\"Too Early\",\"426\":\"Upgrade Required\",\"428\":\"Precondition Required\",\"429\":\"Too Many Requests\",\"431\":\"Request Header Fields Too Large\",\"451\":\"Unavailable For Legal Reasons\",\"500\":\"Internal Server Error\",\"501\":\"Not Implemented\",\"502\":\"Bad Gateway\",\"503\":\"Service Unavailable\",\"504\":\"Gateway Timeout\",\"505\":\"HTTP Version Not Supported\",\"506\":\"Variant Also Negotiates\",\"507\":\"Insufficient Storage\",\"508\":\"Loop Detected (WebDAV)\",\"510\":\"Not Extended\",\"511\":\"Network Authentication Required\",\"100_detailed\":\"This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.\",\"101_detailed\":\"This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching to.\",\"102_detailed\":\"This code indicates that the server has received and is processing the request, but no response is available yet.\",\"103_detailed\":\"This status code is primarily intended to be used with the Link header to allow the user agent to start preloading resources while the server is still preparing a response.\",\"200_detailed\":\"The request has succeeded. The meaning of a success varies depending on the HTTP method:\\n  GET: The resource has been fetched and is transmitted in the message body.\\n  HEAD: The entity headers are in the message body.\\n  PUT or POST: The resource describing the result of the action is transmitted in the message body.\\n  TRACE: The message body contains the request message as received by the server\",\"201_detailed\":\"The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a POST request, or after some PUT requests.\",\"202_detailed\":\"The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.\",\"203_detailed\":\"This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.\",\"204_detailed\":\"There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.\",\"205_detailed\":\"This response code is sent after accomplishing request to tell user agent reset document view which sent this request.\",\"206_detailed\":\"This response code is used because of range header sent by the client to separate download into multiple streams.\",\"207_detailed\":\"A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.\",\"208_detailed\":\"Used inside a DAV: propstat response element to avoid enumerating the internal members of multiple bindings to the same collection repeatedly.\",\"226_detailed\":\"The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.\",\"300_detailed\":\"The request has more than one possible response. The user-agent or user should choose one of them. There is no standardized way of choosing one of the responses.\",\"301_detailed\":\"This response code means that the URI of the requested resource has been changed. Probably, the new URI would be given in the response.\",\"302_detailed\":\"This response code means that the URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.\",\"303_detailed\":\"The server sent this response to direct the client to get the requested resource at another URI with a GET request.\",\"304_detailed\":\"This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.\",\"305_detailed\":\"Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.\",\"306_detailed\":\"This response code is no longer used, it is just reserved currently. It was used in a previous version of the HTTP 1.1 specification.\",\"307_detailed\":\"The server sends this response to direct the client to get the requested resource at another URI with same method that was used in the prior request. This has the same semantics as the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: If a POST was used in the first request, a POST must be used in the second request.\",\"308_detailed\":\"This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: If a POST was used in the first request, a POST must be used in the second request.\",\"400_detailed\":\"This response means that server could not understand the request due to invalid syntax.\",\"401_detailed\":\"Although the HTTP standard specifies \\\"unauthorized\\\", semantically this response means \\\"unauthenticated\\\". That is, the client must authenticate itself to get the requested response.\",\"402_detailed\":\"This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.\",\"403_detailed\":\"The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.\",\"404_detailed\":\"The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.\",\"405_detailed\":\"The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.\",\"406_detailed\":\"This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.\",\"407_detailed\":\"This is similar to 401 but authentication is needed to be done by a proxy.\",\"408_detailed\":\"This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.\",\"409_detailed\":\"This response is sent when a request conflicts with the current state of the server.\",\"410_detailed\":\"This response would be sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for \\\"limited-time, promotional services\\\". APIs should not feel compelled to indicate resources that have been deleted with this status code.\",\"411_detailed\":\"Server rejected the request because the Content-Length header field is not defined and the server requires it.\",\"412_detailed\":\"The client has indicated preconditions in its headers which the server does not meet.\",\"413_detailed\":\"Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.\",\"414_detailed\":\"The URI requested by the client is longer than the server is willing to interpret.\",\"415_detailed\":\"The media format of the requested data is not supported by the server, so the server is rejecting the request.\",\"416_detailed\":\"The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is outside the size of the target URI's data.\",\"417_detailed\":\"This response code means the expectation indicated by the Expect request header field can't be met by the server.\",\"418_detailed\":\"The server refuses the attempt to brew coffee with a teapot.\",\"421_detailed\":\"The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.\",\"422_detailed\":\"The request was well-formed but was unable to be followed due to semantic errors.\",\"423_detailed\":\"The resource that is being accessed is locked.\",\"424_detailed\":\"The request failed due to failure of a previous request.\",\"425_detailed\":\"Indicates that the server is unwilling to risk processing a request that might be replayed.\",\"426_detailed\":\"The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol(s).\",\"428_detailed\":\"The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.\",\"429_detailed\":\"The user has sent too many requests in a given amount of time (\\\"rate limiting\\\").\",\"431_detailed\":\"The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.\",\"451_detailed\":\"The user requests an illegal resource, such as a web page censored by a government.\",\"500_detailed\":\"The server has encountered a situation it doesn't know how to handle.\",\"501_detailed\":\"The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.\",\"502_detailed\":\"This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.\",\"503_detailed\":\"The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.\",\"504_detailed\":\"This error response is given when the server is acting as a gateway and cannot get a response in time.\",\"505_detailed\":\"The HTTP version used in the request is not supported by the server.\",\"506_detailed\":\"The server has an internal configuration error: transparent content negotiation for the request results in a circular reference.\",\"507_detailed\":\"The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.\",\"508_detailed\":\"The server detected an infinite loop while processing the request.\",\"510_detailed\":\"Further extensions to the request are required for the server to fulfill it.\",\"511_detailed\":\"The 511 status code indicates that the client needs to authenticate to gain network access.\"}");
;// CONCATENATED MODULE: ./source/utilities/check_fetch_status.ts




var checkFetchStatus = function checkFetchStatus(response) {
  var requestPath = response.url.split(Http.baseUrl).join("..."); // split and join to replace text

  if (response.headers.has("Warning")) {
    console.warn("Warning present in response: ".concat(response.headers.get("Warning"), "\nfrom: `").concat(requestPath, "`"));
  }

  if (response.ok) {
    var contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return response.json().then(function (body) {
        return body;
      });
    } else {
      return response.text().then(function (text) {
        if (text) {
          console.warn("API returned non-json body from: `".concat(requestPath, "`"));
        }

        return text;
      });
    }
  } else {
    return response.json().then(function (errorBody) {
      var message = errorBody.message;
      var statusMessage = response_statuses_namespaceObject[response.status];
      var verboseMessage = "".concat(response.status, " ").concat(statusMessage, ": '").concat(message, "' at `").concat(requestPath, "`");
      var error = new response_error(message, verboseMessage, response, errorBody);
      console.error(error);
      throw error;
    });
  }
};

/* harmony default export */ const check_fetch_status = (checkFetchStatus);
;// CONCATENATED MODULE: ./source/utilities/config.ts
function config_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function Config() {
  config_classCallCheck(this, Config);
};

Config.sharedErrorHandler = function (_ref) {
  var error = _ref.error;
  throw error;
};


;// CONCATENATED MODULE: ./source/utilities/make_errors_pretty.ts




var makeErrorsPrettyForFunction = function makeErrorsPrettyForFunction(actionName, action) {
  return function () {
    for (var _len = arguments.length, argumentList = new Array(_len), _key = 0; _key < _len; _key++) {
      argumentList[_key] = arguments[_key];
    }

    return action.apply(void 0, argumentList).then(check_fetch_status)["catch"](function (error) {
      return Config.sharedErrorHandler({
        error: error,
        action: actionName,
        arguments: argumentList
      });
    });
  };
};

var getFunctionNames = function getFunctionNames(clazz) {
  var builtinProperties = ["length", "constructor", "name", "prototype"]; // TODO it might make sense to check the type of each property

  return external_underscore_default().without.apply((external_underscore_default()), [Object.getOwnPropertyNames(clazz)].concat(builtinProperties));
};

var makeErrorsPretty = function makeErrorsPretty(apiClass) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    exclude: []
  };
  console.log(apiClass);
  var functionNames = getFunctionNames(apiClass);

  external_underscore_default().forEach(functionNames, function (functionName) {
    var isExcluded = options.exclude && options.exclude.includes(functionName);

    if (!isExcluded) {
      apiClass[functionName] = makeErrorsPrettyForFunction(functionName, apiClass[functionName]);
    }
  });

  return apiClass;
};

/* harmony default export */ const make_errors_pretty = (makeErrorsPretty);
;// CONCATENATED MODULE: ./source/api/pipeline_api.ts
function pipeline_api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function pipeline_api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function pipeline_api_createClass(Constructor, protoProps, staticProps) { if (protoProps) pipeline_api_defineProperties(Constructor.prototype, protoProps); if (staticProps) pipeline_api_defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var PipelineApi = /*#__PURE__*/function () {
  function PipelineApi() {
    pipeline_api_classCallCheck(this, PipelineApi);
  }

  pipeline_api_createClass(PipelineApi, null, [{
    key: "triggerPipeline",
    value: function triggerPipeline(associationIds) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var user = arguments.length > 2 ? arguments[2] : undefined;
      var accountId = associationIds.accountId,
          projectId = associationIds.projectId,
          floorId = associationIds.floorId,
          scanDatasetId = associationIds.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/pipeline/").concat(accountId, "/").concat(projectId, "/").concat(floorId, "/").concat(scanDatasetId, "/trigger");
      return Http.post(url, user, body);
    }
  }]);

  return PipelineApi;
}();

make_errors_pretty(PipelineApi);
/* harmony default export */ const pipeline_api = (PipelineApi);
;// CONCATENATED MODULE: ./source/api/project_api.ts
function project_api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function project_api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function project_api_createClass(Constructor, protoProps, staticProps) { if (protoProps) project_api_defineProperties(Constructor.prototype, protoProps); if (staticProps) project_api_defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var ProjectApi = /*#__PURE__*/function () {
  function ProjectApi() {
    project_api_classCallCheck(this, ProjectApi);
  }

  project_api_createClass(ProjectApi, null, [{
    key: "listProjectsForOrganization",
    value: function listProjectsForOrganization(accountId, user) {
      var url = "".concat(Http.baseUrl, "/client-accounts/").concat(accountId, "/projects");
      return Http.get(url, user);
    }
  }, {
    key: "listAllProjectsForUser",
    value: function listAllProjectsForUser(user) {
      var url = "".concat(Http.baseUrl, "/projects/list-user-projects");
      return Http.get(url, user);
    } // deprecated. Call getProject and listProjectsForOrganization instead

  }, {
    key: "listProjects",
    value: function listProjects(projectId, user) {
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/list");
      return Http.get(url, user);
    }
  }, {
    key: "getProject",
    value: function getProject(projectId, user) {
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId);
      return Http.get(url, user);
    }
  }, {
    key: "createProject",
    value: function createProject(accountId, project, user) {
      var url = "".concat(Http.baseUrl, "/client-accounts/").concat(accountId, "/projects");
      return Http.post(url, user, project);
    }
  }, {
    key: "updateProject",
    value: function updateProject(projectId, project, user) {
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId);
      return Http.patch(url, user, project);
    }
  }, {
    key: "archiveProject",
    value: function archiveProject(accountId, projectId, user) {
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/archive");
      return Http.post(url, user, null);
    }
  }, {
    key: "saveProjectCostAnalysisProgress",
    value: function saveProjectCostAnalysisProgress(_ref, progress, user) {
      var projectId = _ref.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/cost-analysis-progress");
      return Http.post(url, user, progress);
    }
  }, {
    key: "saveScannedProjectMasterformatProgress",
    value: function saveScannedProjectMasterformatProgress(_ref2, progress, user) {
      var projectId = _ref2.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/masterformat-progress");
      return Http.post(url, user, progress);
    }
  }, {
    key: "saveScheduledProjectMasterformatProgress",
    value: function saveScheduledProjectMasterformatProgress(_ref3, progress, user) {
      var projectId = _ref3.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/scheduled-masterformat-progress");
      return Http.post(url, user, progress);
    }
  }, {
    key: "getProjectCostAnalysisProgress",
    value: function getProjectCostAnalysisProgress(_ref4, user) {
      var projectId = _ref4.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/cost-analysis-progress");
      return Http.get(url, user);
    }
  }, {
    key: "getScannedProjectMasterformatProgress",
    value: function getScannedProjectMasterformatProgress(_ref5, user) {
      var projectId = _ref5.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/masterformat-progress");
      return Http.get(url, user);
    }
  }, {
    key: "getScheduledProjectMasterformatProgress",
    value: function getScheduledProjectMasterformatProgress(_ref6, user) {
      var projectId = _ref6.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/scheduled-masterformat-progress");
      return Http.get(url, user);
    }
  }, {
    key: "listProjectFloorFiles",
    value: function listProjectFloorFiles(_ref7, user) {
      var projectId = _ref7.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floor-files");
      return Http.get(url, user);
    }
  }, {
    key: "getProjectDeviationsReportTsvUrl",
    value: function getProjectDeviationsReportTsvUrl(_ref8, fileName, user) {
      var projectId = _ref8.projectId;
      var baseUrl = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/").concat(fileName, "_deviation-report.tsv");
      return Http.addAuthToDownloadUrl(baseUrl, user);
    }
  }]);

  return ProjectApi;
}();

/* harmony default export */ const project_api = (make_errors_pretty(ProjectApi));
;// CONCATENATED MODULE: ./source/api/organization_api.ts
function organization_api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function organization_api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function organization_api_createClass(Constructor, protoProps, staticProps) { if (protoProps) organization_api_defineProperties(Constructor.prototype, protoProps); if (staticProps) organization_api_defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var OrganizationApi = /*#__PURE__*/function () {
  function OrganizationApi() {
    organization_api_classCallCheck(this, OrganizationApi);
  }

  organization_api_createClass(OrganizationApi, null, [{
    key: "listOrganizations",
    value: function listOrganizations(user) {
      var url = "".concat(Http.baseUrl, "/client-accounts");
      return Http.get(url, user);
    }
  }, {
    key: "getOrganization",
    value: function getOrganization(organizationId, user) {
      var url = "".concat(Http.baseUrl, "/client-accounts/").concat(organizationId);
      return Http.get(url, user);
    }
  }, {
    key: "getOrganizationName",
    value: function getOrganizationName(organizationId, user) {
      var url = "".concat(Http.baseUrl, "/client-accounts/").concat(organizationId, "/name");
      return Http.get(url, user);
    }
  }, {
    key: "createOrganization",
    value: function createOrganization(organization, user) {
      var url = "".concat(Http.baseUrl, "/client-accounts");
      return Http.post(url, user, organization);
    }
  }, {
    key: "updateOrganization",
    value: function updateOrganization(accountId, organization, user) {
      var url = "".concat(Http.baseUrl, "/client-accounts/").concat(accountId);
      return Http.patch(url, user, organization);
    }
  }]);

  return OrganizationApi;
}();

/* harmony default export */ const organization_api = (make_errors_pretty(OrganizationApi));
;// CONCATENATED MODULE: ./source/api/floor_api.ts
function floor_api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function floor_api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function floor_api_createClass(Constructor, protoProps, staticProps) { if (protoProps) floor_api_defineProperties(Constructor.prototype, protoProps); if (staticProps) floor_api_defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var FloorApi = /*#__PURE__*/function () {
  function FloorApi() {
    floor_api_classCallCheck(this, FloorApi);
  }

  floor_api_createClass(FloorApi, null, [{
    key: "listFloorsForProject",
    value: function listFloorsForProject(projectId, user) {
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors");
      return Http.get(url, user);
    }
  }, {
    key: "createFloor",
    value: function createFloor(projectId, floorNumber, user) {
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors");
      return Http.post(url, user, {
        text: floorNumber
      });
    }
  }, {
    key: "getFloor",
    value: function getFloor(_ref, user) {
      var projectId = _ref.projectId,
          floorId = _ref.floorId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId);
      return Http.get(url, user);
    }
  }, {
    key: "updateFloor",
    value: function updateFloor(_ref2, floor, user) {
      var projectId = _ref2.projectId,
          floorId = _ref2.floorId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId);
      return Http.patch(url, user, floor);
    }
  }, {
    key: "updateFloorOrder",
    value: function updateFloorOrder(_ref3, ordinal, user) {
      var projectId = _ref3.projectId,
          floorId = _ref3.floorId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/reorder/").concat(ordinal);
      return Http.patch(url, user, null);
    }
  }]);

  return FloorApi;
}();


make_errors_pretty(FloorApi);
;// CONCATENATED MODULE: ./source/api/web_gateway_api.ts
function web_gateway_api_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function web_gateway_api_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { web_gateway_api_ownKeys(Object(source), true).forEach(function (key) { web_gateway_api_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { web_gateway_api_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function web_gateway_api_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function web_gateway_api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function web_gateway_api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function web_gateway_api_createClass(Constructor, protoProps, staticProps) { if (protoProps) web_gateway_api_defineProperties(Constructor.prototype, protoProps); if (staticProps) web_gateway_api_defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck






var WebGatewayApi = /*#__PURE__*/function () {
  function WebGatewayApi() {
    web_gateway_api_classCallCheck(this, WebGatewayApi);
  }

  web_gateway_api_createClass(WebGatewayApi, null, [{
    key: "getPlannedBuildingElements",
    value: function getPlannedBuildingElements(_ref, user) {
      var projectId = _ref.projectId,
          floorId = _ref.floorId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/planned-building-elements");
      return Http.get(url, user);
    }
  }, {
    key: "connectProjectToStructionSite",
    value: function connectProjectToStructionSite(_ref2, structionSiteProjectUrl, token, user) {
      var projectId = _ref2.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/connect-to-structionsite?structionsite-access-token=").concat(token, "&structionsite-project-url=").concat(structionSiteProjectUrl);
      return Http.post(url, user, null);
    }
  }, {
    key: "checkPipelineStatus",
    value: function checkPipelineStatus(_ref3, pipelineId, user) {
      var projectId = _ref3.projectId;
      var url = "".concat(Http.baseUrl, "/pipelines/").concat(pipelineId);
      return Http.get(url, user);
    }
  }, {
    key: "createInvitation",
    value: function createInvitation(inviteeEmail, role, organizationId, user) {
      var url = "".concat(Http.baseUrl, "/users/invitations");
      return Http.post(url, user, {
        userEmail: inviteeEmail,
        role: role,
        clientAccountId: organizationId
      });
    }
  }, {
    key: "getInvitation",
    value: function getInvitation(invitationToken, user) {
      var url = "".concat(Http.baseUrl, "/users/invitations/").concat(invitationToken);
      return Http.get(url, user);
    }
  }, {
    key: "getProgressReportPdfUrl",
    value: function getProgressReportPdfUrl(projectId, user) {
      var baseUrl = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/progress-report.pdf");
      return Http.addAuthToDownloadUrl(baseUrl, user);
    }
  }, {
    key: "getQualityControlReportPdfUrl",
    value: function getQualityControlReportPdfUrl(projectId) {
      return "".concat(Http.baseUrl, "/projects/").concat(projectId, "/report.pdf");
    }
  }, {
    key: "getPlannedElementsTsvUrl",
    value: function getPlannedElementsTsvUrl(_ref4, fileName, user) {
      var projectId = _ref4.projectId,
          floorId = _ref4.floorId;
      var baseUrl = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/").concat(fileName, "_planned-building-elements.tsv");
      return Http.addAuthToDownloadUrl(baseUrl, user);
    }
  }, {
    key: "getDeviationsReportTsvUrl",
    value: function getDeviationsReportTsvUrl(_ref5, fileName, user) {
      var projectId = _ref5.projectId,
          floorId = _ref5.floorId;
      var baseUrl = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/").concat(fileName, "_deviation-report.tsv");
      return Http.addAuthToDownloadUrl(baseUrl, user);
    }
  }, {
    key: "getScanAnalysisUrl",
    value: function getScanAnalysisUrl(_ref6, fileName, user) {
      var projectId = _ref6.projectId,
          floorId = _ref6.floorId,
          scanDatasetId = _ref6.scanDatasetId;
      var baseUrl = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/").concat(fileName, "_scan-analysis.tsv");
      return Http.addAuthToDownloadUrl(baseUrl, user);
    }
  }, {
    key: "checkProcoreAccessToken",
    value: function checkProcoreAccessToken(projectId, procoreAccessToken, user) {
      if (!projectId) {
        return Promise.reject(new Error("Project not loaded yet"));
      }

      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/procore?procore-access-token=").concat(procoreAccessToken);
      return Http.get(url, user);
    }
  }, {
    key: "pushPdfToProcore",
    value: function pushPdfToProcore(_ref7, procoreProjectId, procoreAccessToken, pdfType, user) {
      var projectId = _ref7.projectId,
          floorId = _ref7.floorId,
          scanDatasetId = _ref7.scanDatasetId;

      if (!projectId) {
        return Promise.reject(new Error("Project not loaded yet"));
      }

      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/push-report-to-procore/").concat(pdfType, "?procore-project-id=").concat(procoreProjectId, "&procore-access-token=").concat(procoreAccessToken);
      return Http.post(url, user, null);
    }
  }, {
    key: "getProcoreProjects",
    value: function getProcoreProjects(projectId, procoreAccessToken, user) {
      if (!projectId) {
        return Promise.reject(new Error("Project not loaded yet"));
      }

      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/procore-projects?procore-access-token=").concat(procoreAccessToken);
      return Http.get(url, user);
    }
  }, {
    key: "updateDeviationStatus",
    value: function updateDeviationStatus(_ref8, deviationGlobalId, status, user) {
      var projectId = _ref8.projectId,
          floorId = _ref8.floorId,
          scanDatasetId = _ref8.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/deviation-status");
      var deviation = {
        globalId: deviationGlobalId,
        status: status
      };
      return Http.patch(url, user, deviation);
    } // TODO: rename / move

  }, {
    key: "getCustomFirebaseToken",
    value: function getCustomFirebaseToken(user) {
      return fetch("".concat(Http.baseUrl, "/login"), {
        headers: web_gateway_api_objectSpread(web_gateway_api_objectSpread({}, httpGetHeaders), get_authorization_headers(user))
      }).then(function (response) {
        return response.json().then(function (body) {
          var headers = response.headers;
          return {
            headers: headers,
            body: body
          };
        });
      });
    } // deprectated. use AuthApi.login instead

  }, {
    key: "login",
    value: function login(username, password) {
      var user = {
        authType: user_auth_type.BASIC,
        username: username,
        password: password
      };
      return fetch("".concat(Http.baseUrl, "/login"), {
        headers: web_gateway_api_objectSpread(web_gateway_api_objectSpread({}, httpGetHeaders), get_authorization_headers(user))
      }).then(function (response) {
        return response.json().then(function (body) {
          var headers = response.headers;
          return {
            headers: headers,
            body: body
          };
        });
      });
    } // TODO move to auth api

  }, {
    key: "acceptInvitation",
    value: function acceptInvitation(token, password) {
      var url = "".concat(Http.baseUrl, "/users/accept-invitation");
      var invitationForm = {
        invitationToken: token,
        password: password
      };
      return Http.post(url, null, invitationForm);
    }
  }, {
    key: "getElementDetails",
    value: function getElementDetails(_ref9, elementGlobalId, user) {
      var projectId = _ref9.projectId,
          floorId = _ref9.floorId,
          scanDatasetId = _ref9.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/element/").concat(elementGlobalId);
      return Http.get(url, user);
    }
  }, {
    key: "exportIfc",
    value: function exportIfc(_ref10, type, user) {
      var projectId = _ref10.projectId,
          floorId = _ref10.floorId,
          scanDatasetId = _ref10.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/export-ifc?type=").concat(type);
      return Http.post(url, user, null);
    } // TODO unify with pipeline api

  }, {
    key: "checkExportedIfc",
    value: function checkExportedIfc(_ref11, workflowName, type, user) {
      var projectId = _ref11.projectId,
          floorId = _ref11.floorId,
          scanDatasetId = _ref11.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/export-ifc/").concat(workflowName, "?type=").concat(type);
      return Http.get(url, user);
    }
  }, {
    key: "downsampleScan",
    value: function downsampleScan(_ref12, user) {
      var projectId = _ref12.projectId,
          floorId = _ref12.floorId,
          scanDatasetId = _ref12.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/downsample-scan");
      return Http.post(url, user, null);
    } //TODO move to AuthApi

  }, {
    key: "getGcpBearerToken",
    value: function getGcpBearerToken(_ref13, user) {
      var projectId = _ref13.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/gcpAccessToken");
      return Http.get(url, user);
    }
  }, {
    key: "getMasterformat",
    value: function getMasterformat(version) {
      var url = "".concat(Http.baseUrl, "/masterformats/").concat(version);
      return Http.get(url, null);
    }
  }, {
    key: "updateElement",
    value: function updateElement(_ref14, element, user) {
      var projectId = _ref14.projectId,
          floorId = _ref14.floorId,
          scanDatasetId = _ref14.scanDatasetId,
          globalId = _ref14.globalId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/elements/").concat(globalId);
      return Http.patch(url, user, element);
    }
  }, {
    key: "updateManyElements",
    value: function updateManyElements(_ref15, elements, user) {
      var projectId = _ref15.projectId,
          floorId = _ref15.floorId,
          scanDatasetId = _ref15.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/detailed-elements");
      return Http.patch(url, user, elements);
    }
  }, {
    key: "triggerArgoRunProgressAndDeviations",
    value: function triggerArgoRunProgressAndDeviations(_ref16, deviationsFlag, bimSourceFileExtension, user) {
      var projectId = _ref16.projectId,
          floorId = _ref16.floorId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/run-progress-and-deviations?deviationsFlag=").concat(deviationsFlag, "&bimSourceFileExtension=").concat(bimSourceFileExtension);
      return Http.post(url, user, null);
    }
  }, {
    key: "triggerArgoRunNwdConvert",
    value: function triggerArgoRunNwdConvert(_ref17, user) {
      var projectId = _ref17.projectId,
          floorId = _ref17.floorId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/nwd-convert");
      return Http.post(url, user, null);
    }
  }, {
    key: "recordUserActions",
    value: function recordUserActions(type, userActions, user) {
      var url = "".concat(Http.baseUrl, "/user-actions");
      var actionForm = {
        type: type,
        payload: userActions
      };
      return Http.post(url, user, actionForm);
    }
  }]);

  return WebGatewayApi;
}();


make_errors_pretty(WebGatewayApi, {
  exclude: ["getCustomFirebaseToken", "login"]
});
;// CONCATENATED MODULE: ./source/models/enums/purpose_type.ts
var ProjectPurposeType;

(function (ProjectPurposeType) {
  ProjectPurposeType["OTHER"] = "other";
  ProjectPurposeType["RAW_PROJECT_BIM"] = "rawProjectBim";
  ProjectPurposeType["PROJECT_FOLDER_ZIP"] = "projectFolderZip";
})(ProjectPurposeType || (ProjectPurposeType = {}));

var FloorPurposeType;

(function (FloorPurposeType) {
  FloorPurposeType["OTHER"] = "other";
  FloorPurposeType["BIM_IFC"] = "bimIfc";
  FloorPurposeType["BIM_NWD"] = "bimNwd";
  FloorPurposeType["GRID_IFC"] = "gridIfc";
  FloorPurposeType["BIM_MESH_GLB"] = "bimMeshGlb";
  FloorPurposeType["BIM_MESH_OBJ"] = "bimMeshObj";
  FloorPurposeType["BIM_TEXTURE_MTL"] = "bimTextureMtl";
  FloorPurposeType["VIEWER_BIM_MESH_OBJ"] = "viewerBimMeshObj";
  FloorPurposeType["BIM_MINIMAP"] = "bimMinimap";
  FloorPurposeType["PLANNED_CLOUD_ZIP"] = "plannedCloudZip";
  FloorPurposeType["SVF"] = "svf";
})(FloorPurposeType || (FloorPurposeType = {}));

var ScanDatasetPurposeType;

(function (ScanDatasetPurposeType) {
  ScanDatasetPurposeType["OTHER"] = "other";
  ScanDatasetPurposeType["RAW_SCAN"] = "rawScan";
  ScanDatasetPurposeType["SCANNER_PATH"] = "scannerPath";
  ScanDatasetPurposeType["FLOOR_FLATNESS_TOPO_MAP"] = "floorFlatnessTopoMap";
  ScanDatasetPurposeType["BUILT_NOT_BUILT_BIM_IFC"] = "builtNotBuiltBimIfc";
  ScanDatasetPurposeType["NEEDS_FURTHER_ANALYSIS"] = "needsFurtherAnalysis";
  ScanDatasetPurposeType["PREPROCESSED_SCAN"] = "preprocessedScan";
  ScanDatasetPurposeType["INCLUDED_BIM_IFC"] = "includedBimIfc";
  ScanDatasetPurposeType["POTREE"] = "potree";
  ScanDatasetPurposeType["DOWNSAMPLED_SCAN"] = "downsampledScan";
  ScanDatasetPurposeType["ELEMENT_SNAPSHOT"] = "elementSnapshot";
  ScanDatasetPurposeType["SITE_CUBE_PHOTO"] = "siteCubePhoto";
})(ScanDatasetPurposeType || (ScanDatasetPurposeType = {}));

var PhotoAreaPurposeType;

(function (PhotoAreaPurposeType) {
  PhotoAreaPurposeType["OTHER"] = "other";
  PhotoAreaPurposeType["MINIMAP"] = "minimap";
  PhotoAreaPurposeType["THREE_SIXTY_PHOTO"] = "threeSixtyPhoto";
})(PhotoAreaPurposeType || (PhotoAreaPurposeType = {}));

var PurposeTypeMap = {
  MINIMAP: PhotoAreaPurposeType.MINIMAP,
  THREE_SIXTY_PHOTO: PhotoAreaPurposeType.THREE_SIXTY_PHOTO,
  RAW_SCAN: ScanDatasetPurposeType.RAW_SCAN,
  SCANNER_PATH: ScanDatasetPurposeType.SCANNER_PATH,
  FLOOR_FLATNESS_TOPO_MAP: ScanDatasetPurposeType.FLOOR_FLATNESS_TOPO_MAP,
  BUILT_NOT_BUILT_BIM_IFC: ScanDatasetPurposeType.BUILT_NOT_BUILT_BIM_IFC,
  NEEDS_FURTHER_ANALYSIS: ScanDatasetPurposeType.NEEDS_FURTHER_ANALYSIS,
  PREPROCESSED_SCAN: ScanDatasetPurposeType.PREPROCESSED_SCAN,
  INCLUDED_BIM_IFC: ScanDatasetPurposeType.INCLUDED_BIM_IFC,
  POTREE: ScanDatasetPurposeType.POTREE,
  DOWNSAMPLED_SCAN: ScanDatasetPurposeType.DOWNSAMPLED_SCAN,
  ELEMENT_SNAPSHOT: ScanDatasetPurposeType.ELEMENT_SNAPSHOT,
  SITE_CUBE_PHOTO: ScanDatasetPurposeType.SITE_CUBE_PHOTO,
  BIM_IFC: FloorPurposeType.BIM_IFC,
  BIM_NWD: FloorPurposeType.BIM_NWD,
  GRID_IFC: FloorPurposeType.GRID_IFC,
  BIM_MESH_GLB: FloorPurposeType.BIM_MESH_GLB,
  BIM_MESH_OBJ: FloorPurposeType.BIM_MESH_OBJ,
  BIM_TEXTURE_MTL: FloorPurposeType.BIM_TEXTURE_MTL,
  VIEWER_BIM_MESH_OBJ: FloorPurposeType.VIEWER_BIM_MESH_OBJ,
  BIM_MINIMAP: FloorPurposeType.BIM_MINIMAP,
  PLANNED_CLOUD_ZIP: FloorPurposeType.PLANNED_CLOUD_ZIP,
  SVF: FloorPurposeType.SVF,
  OTHER: ProjectPurposeType.OTHER,
  RAW_PROJECT_BIM: ProjectPurposeType.RAW_PROJECT_BIM,
  PROJECT_FOLDER_ZIP: ProjectPurposeType.PROJECT_FOLDER_ZIP
};
var isPurposeType = function isPurposeType(type) {
  return Object.values(PurposeTypeMap).some(function (purposeType) {
    return type === purposeType;
  });
};
var OTHER = ProjectPurposeType.OTHER;
var RAW_PROJECT_BIM = ProjectPurposeType.RAW_PROJECT_BIM;
var PROJECT_FOLDER_ZIP = ProjectPurposeType.PROJECT_FOLDER_ZIP;
var RAW_SCAN = ScanDatasetPurposeType.RAW_SCAN;
var SCANNER_PATH = ScanDatasetPurposeType.SCANNER_PATH;
var FLOOR_FLATNESS_TOPO_MAP = ScanDatasetPurposeType.FLOOR_FLATNESS_TOPO_MAP;
var BUILT_NOT_BUILT_BIM_IFC = ScanDatasetPurposeType.BUILT_NOT_BUILT_BIM_IFC;
var NEEDS_FURTHER_ANALYSIS = ScanDatasetPurposeType.NEEDS_FURTHER_ANALYSIS;
var PREPROCESSED_SCAN = ScanDatasetPurposeType.PREPROCESSED_SCAN;
var INCLUDED_BIM_IFC = ScanDatasetPurposeType.INCLUDED_BIM_IFC;
var POTREE = ScanDatasetPurposeType.POTREE;
var BIM_IFC = FloorPurposeType.BIM_IFC;
var BIM_NWD = FloorPurposeType.BIM_NWD;
var GRID_IFC = FloorPurposeType.GRID_IFC;
var BIM_MESH_GLB = FloorPurposeType.BIM_MESH_GLB;
var BIM_MESH_OBJ = FloorPurposeType.BIM_MESH_OBJ;
var BIM_TEXTURE_MTL = FloorPurposeType.BIM_TEXTURE_MTL;
var VIEWER_BIM_MESH_OBJ = FloorPurposeType.VIEWER_BIM_MESH_OBJ;
var PLANNED_CLOUD_ZIP = FloorPurposeType.PLANNED_CLOUD_ZIP;
var SVF = FloorPurposeType.SVF;
var MINIMAP = PhotoAreaPurposeType.MINIMAP;
var THREE_SIXTY_PHOTO = PhotoAreaPurposeType.THREE_SIXTY_PHOTO;
var uploadHistoryPurposeTypes = [RAW_SCAN, OTHER];
var floorPurposeTypes = [BIM_IFC, BIM_NWD, GRID_IFC, BIM_MESH_GLB, BIM_MESH_OBJ, BIM_TEXTURE_MTL, VIEWER_BIM_MESH_OBJ, PLANNED_CLOUD_ZIP, SVF];
/* harmony default export */ const purpose_type = (PurposeTypeMap);
;// CONCATENATED MODULE: ./source/converters/purpose_type_converter.ts
function purpose_type_converter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function purpose_type_converter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function purpose_type_converter_createClass(Constructor, protoProps, staticProps) { if (protoProps) purpose_type_converter_defineProperties(Constructor.prototype, protoProps); if (staticProps) purpose_type_converter_defineProperties(Constructor, staticProps); return Constructor; }




var apiPurposeTypeByPurposeType = external_underscore_default().invert(purpose_type);

var purposeTypeByApiPurposeType = purpose_type;

var PurposeTypeConverter = /*#__PURE__*/function () {
  function PurposeTypeConverter() {
    purpose_type_converter_classCallCheck(this, PurposeTypeConverter);
  }

  purpose_type_converter_createClass(PurposeTypeConverter, null, [{
    key: "toApiPurposeType",
    value: function toApiPurposeType(fileKey) {
      return apiPurposeTypeByPurposeType[fileKey];
    }
  }, {
    key: "toPurposeType",
    value: function toPurposeType(apiPurposeType) {
      return purposeTypeByApiPurposeType[apiPurposeType];
    }
  }]);

  return PurposeTypeConverter;
}();


;// CONCATENATED MODULE: ./source/api/file_information_api.ts
function file_information_api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function file_information_api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function file_information_api_createClass(Constructor, protoProps, staticProps) { if (protoProps) file_information_api_defineProperties(Constructor.prototype, protoProps); if (staticProps) file_information_api_defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck




var FileInformationApi = /*#__PURE__*/function () {
  function FileInformationApi() {
    file_information_api_classCallCheck(this, FileInformationApi);
  }

  file_information_api_createClass(FileInformationApi, null, [{
    key: "createProjectFile",
    value: function createProjectFile(_ref, apiFile, user) {
      var projectId = _ref.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/files");
      return Http.post(url, user, apiFile);
    }
  }, {
    key: "listProjectFiles",
    value: function listProjectFiles(_ref2, user) {
      var projectId = _ref2.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/files");
      return Http.get(url, user);
    }
  }, {
    key: "zipProjectFolder",
    value: function zipProjectFolder(folderName, _ref3, user) {
      var projectId = _ref3.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/zip-project-folder?folder-prefix=").concat(folderName);
      return Http.post(url, user, null);
    }
  }, {
    key: "listPhotoAreaFiles",
    value: function listPhotoAreaFiles(_ref4, user) {
      var projectId = _ref4.projectId,
          photoAreaId = _ref4.photoAreaId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/photo-areas/").concat(photoAreaId, "/files");
      return Http.get(url, user);
    }
  }, {
    key: "saveFloorFile",
    value: function saveFloorFile(_ref5, apiFile, user) {
      var projectId = _ref5.projectId,
          floorId = _ref5.floorId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/file");
      return Http.post(url, user, apiFile);
    }
  }, {
    key: "listFloorFiles",
    value: function listFloorFiles(_ref6, user) {
      var projectId = _ref6.projectId,
          floorId = _ref6.floorId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/files");
      return Http.get(url, user);
    }
  }, {
    key: "saveScanDatasetFile",
    value: function saveScanDatasetFile(_ref7, apiFile, user) {
      var projectId = _ref7.projectId,
          floorId = _ref7.floorId,
          scanDatasetId = _ref7.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/file");
      return Http.post(url, user, apiFile);
    }
  }, {
    key: "getScanDatasetFiles",
    value: function getScanDatasetFiles(_ref8, purposeType, user) {
      var projectId = _ref8.projectId,
          floorId = _ref8.floorId,
          scanDatasetId = _ref8.scanDatasetId;
      var query;

      if (typeof purposeType === "string") {
        query = "?purposeType=".concat(PurposeTypeConverter.toApiPurposeType(purposeType));
      } else {
        query = "";
        user = purposeType;
      }

      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/files").concat(query);
      return Http.get(url, user);
    }
  }]);

  return FileInformationApi;
}();


make_errors_pretty(FileInformationApi);
;// CONCATENATED MODULE: ./source/api/photo_area_api.ts
function photo_area_api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function photo_area_api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function photo_area_api_createClass(Constructor, protoProps, staticProps) { if (protoProps) photo_area_api_defineProperties(Constructor.prototype, protoProps); if (staticProps) photo_area_api_defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var PhotoAreaApi = /*#__PURE__*/function () {
  function PhotoAreaApi() {
    photo_area_api_classCallCheck(this, PhotoAreaApi);
  }

  photo_area_api_createClass(PhotoAreaApi, null, [{
    key: "listPhotoAreasForProject",
    value: function listPhotoAreasForProject(_ref, user) {
      var projectId = _ref.projectId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/photo-areas");
      return Http.get(url, user);
    }
  }, {
    key: "listPhotoLocations",
    value: function listPhotoLocations(_ref2, user) {
      var projectId = _ref2.projectId,
          photoAreaId = _ref2.photoAreaId,
          photoSessionId = _ref2.photoSessionId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/photo-areas/").concat(photoAreaId, "/locations");

      if (photoSessionId) {
        url += "?photoSessionId=".concat(photoSessionId);
      }

      return Http.get(url, user);
    }
  }, {
    key: "listPhotoSessionsForPhotoArea",
    value: function listPhotoSessionsForPhotoArea(_ref3, user) {
      var projectId = _ref3.projectId,
          photoAreaId = _ref3.photoAreaId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/photo-areas/").concat(photoAreaId, "/sessions");
      return Http.get(url, user);
    }
  }]);

  return PhotoAreaApi;
}();


make_errors_pretty(PhotoAreaApi);
;// CONCATENATED MODULE: ./source/api/scan_dataset_api.ts
function scan_dataset_api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function scan_dataset_api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function scan_dataset_api_createClass(Constructor, protoProps, staticProps) { if (protoProps) scan_dataset_api_defineProperties(Constructor.prototype, protoProps); if (staticProps) scan_dataset_api_defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var ScanDatasetApi = /*#__PURE__*/function () {
  function ScanDatasetApi() {
    scan_dataset_api_classCallCheck(this, ScanDatasetApi);
  }

  scan_dataset_api_createClass(ScanDatasetApi, null, [{
    key: "listScanDatasetsForFloor",
    value: function listScanDatasetsForFloor(_ref, user) {
      var projectId = _ref.projectId,
          floorId = _ref.floorId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets");
      return Http.get(url, user);
    }
  }, {
    key: "updateScanDataset",
    value: function updateScanDataset(_ref2, scanDataset, user) {
      var projectId = _ref2.projectId,
          floorId = _ref2.floorId,
          scanDatasetId = _ref2.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId);
      return Http.patch(url, user, scanDataset);
    }
  }, {
    key: "createScanDataset",
    value: function createScanDataset(_ref3, user) {
      var projectId = _ref3.projectId,
          floorId = _ref3.floorId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets");
      return Http.post(url, user, null);
    }
  }, {
    key: "deleteScanDataset",
    value: function deleteScanDataset(_ref4, user) {
      var projectId = _ref4.projectId,
          floorId = _ref4.floorId,
          scanDatasetId = _ref4.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId);
      return Http.delete(url, user);
    }
  }, {
    key: "saveScanAnalysis",
    value: function saveScanAnalysis(_ref5, analysis, user) {
      var projectId = _ref5.projectId,
          floorId = _ref5.floorId,
          scanDatasetId = _ref5.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/analysis?enforceBuiltPersistence=false");
      return Http.post(url, user, analysis);
    }
  }, {
    key: "getScanDataset",
    value: function getScanDataset(_ref6, user) {
      var projectId = _ref6.projectId,
          floorId = _ref6.floorId,
          scanDatasetId = _ref6.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId);
      return Http.get(url, user);
    }
  }, {
    key: "getViewerDetailedElementsForScanDataset",
    value: function getViewerDetailedElementsForScanDataset(_ref7, user) {
      var projectId = _ref7.projectId,
          floorId = _ref7.floorId,
          scanDatasetId = _ref7.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/detailed-elements/viewer");
      return Http.get(url, user);
    }
  }, {
    key: "getProgressReportForScanDataset",
    value: function getProgressReportForScanDataset(_ref8, user) {
      var projectId = _ref8.projectId,
          floorId = _ref8.floorId,
          scanDatasetId = _ref8.scanDatasetId;
      var url = "".concat(Http.baseUrl, "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/progress");
      return Http.get(url, user);
    }
  }]);

  return ScanDatasetApi;
}();

make_errors_pretty(ScanDatasetApi);
/* harmony default export */ const scan_dataset_api = (ScanDatasetApi);
;// CONCATENATED MODULE: external "jsonwebtoken"
const external_jsonwebtoken_namespaceObject = require("jsonwebtoken");;
var external_jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(external_jsonwebtoken_namespaceObject);
;// CONCATENATED MODULE: ./source/api/auth_api.ts
function auth_api_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function auth_api_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { auth_api_ownKeys(Object(source), true).forEach(function (key) { auth_api_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { auth_api_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function auth_api_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function auth_api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function auth_api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function auth_api_createClass(Constructor, protoProps, staticProps) { if (protoProps) auth_api_defineProperties(Constructor.prototype, protoProps); if (staticProps) auth_api_defineProperties(Constructor, staticProps); return Constructor; }







var AuthApi = /*#__PURE__*/function () {
  function AuthApi() {
    auth_api_classCallCheck(this, AuthApi);
  }

  auth_api_createClass(AuthApi, null, [{
    key: "login",
    value: function login(username, password) {
      var user = {
        authType: user_auth_type.BASIC,
        username: username,
        password: password
      };
      return fetch("".concat(Http.baseUrl, "/login"), {
        headers: auth_api_objectSpread(auth_api_objectSpread({}, httpGetHeaders), get_authorization_headers(user))
      }).then(function (response) {
        return response.json().then(function (body) {
          var token = body.storageToken;
          var authHeader = response.headers.get("Authorization");
          var jwt = authHeader.substr("Bearer ".length);
          var decodedJwt = external_jsonwebtoken_default().decode(jwt, {
            complete: true
          });
          var role = decodedJwt.payload.role;
          return new GatewayUser(GATEWAY_JWT, token, role);
        });
      });
    }
  }]);

  return AuthApi;
}();


;// CONCATENATED MODULE: ./source/avvir_api.ts
function avvir_api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }












var AvvirApi = function AvvirApi() {
  avvir_api_classCallCheck(this, AvvirApi);
};

AvvirApi.config = Config;
AvvirApi.pipelines = pipeline_api;
AvvirApi.projects = project_api;
AvvirApi.organizations = organization_api;
AvvirApi.photos = PhotoAreaApi;
AvvirApi.files = FileInformationApi;
AvvirApi.scanDatasets = scan_dataset_api;
AvvirApi.floors = FloorApi;
AvvirApi.auth = AuthApi;
AvvirApi.other = WebGatewayApi;

/******/ })()
;