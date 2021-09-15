/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7323:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ AuthApi)
});

// EXTERNAL MODULE: ./source/utilities/get_authorization_headers.ts
var get_authorization_headers = __webpack_require__(9137);
// EXTERNAL MODULE: ./source/models/enums/user_auth_type.ts
var user_auth_type = __webpack_require__(2503);
// EXTERNAL MODULE: ./source/utilities/http.ts
var http = __webpack_require__(1127);
// EXTERNAL MODULE: ./source/utilities/request_headers.ts
var request_headers = __webpack_require__(104);
;// CONCATENATED MODULE: external "jsonwebtoken"
const external_jsonwebtoken_namespaceObject = require("jsonwebtoken");;
var external_jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(external_jsonwebtoken_namespaceObject);
// EXTERNAL MODULE: ./source/resources/response_statuses.json
var response_statuses = __webpack_require__(297);
// EXTERNAL MODULE: ./source/models/response_error.ts + 1 modules
var response_error = __webpack_require__(3972);
;// CONCATENATED MODULE: ./source/api/auth_api.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }









var AuthApi = /*#__PURE__*/function () {
  function AuthApi() {
    _classCallCheck(this, AuthApi);
  }

  _createClass(AuthApi, null, [{
    key: "login",
    value: function login(username, password) {
      var user = {
        authType: user_auth_type.default.BASIC,
        username: username,
        password: password
      };

      var headers = _objectSpread(_objectSpread({}, request_headers.httpGetHeaders), (0,get_authorization_headers.default)(user));

      var url = "".concat(http.default.baseUrl(), "/login");
      return http.default.fetch(url, {
        headers: headers
      }).then(function (response) {
        return response.json().then(function (body) {
          if (response.ok) {
            var storageToken = body.storageToken; //TODO attach to user object and let users upload from this lib

            var authHeader = response.headers.get("Authorization");
            var jwt = authHeader.substr("Bearer ".length);
            var decodedJwt = external_jsonwebtoken_default().decode(jwt, {
              complete: true
            });
            var role = decodedJwt.payload.role;
            return new get_authorization_headers.GatewayUser(user_auth_type.GATEWAY_JWT, jwt, role);
          } else {
            var message = body.message;
            var statusMessage = response_statuses[response.status];
            var verboseMessage = "".concat(response.status, " ").concat(statusMessage, ": '").concat(message, "' at `/login`");
            var error = new response_error.default(message, verboseMessage, response, body);
            console.error(error);
            throw error;
          }
        });
      });
    }
  }]);

  return AuthApi;
}();



/***/ }),

/***/ 54:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ElementApi)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1127);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2854);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var ElementApi = /*#__PURE__*/function () {
  function ElementApi() {
    _classCallCheck(this, ElementApi);
  }

  _createClass(ElementApi, null, [{
    key: "getPlannedBuildingElements",
    value: function getPlannedBuildingElements(_ref, user) {
      var projectId = _ref.projectId,
          floorId = _ref.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/planned-building-elements");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "updateDeviationStatus",
    value: function updateDeviationStatus(_ref2, deviationGlobalId, status, user) {
      var projectId = _ref2.projectId,
          floorId = _ref2.floorId,
          scanDatasetId = _ref2.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/deviation-status");
      var deviation = {
        globalId: deviationGlobalId,
        status: status
      };
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, deviation);
    }
  }, {
    key: "getDetailedElement",
    value: function getDetailedElement(_ref3, elementGlobalId, user) {
      var projectId = _ref3.projectId,
          floorId = _ref3.floorId,
          scanDatasetId = _ref3.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/element/").concat(elementGlobalId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "getDetailedElements",
    value: function getDetailedElements(_ref4, user, viewerIds) {
      var projectId = _ref4.projectId,
          floorId = _ref4.floorId,
          scanDatasetId = _ref4.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/building-elements");

      if (viewerIds) {
        url += "?viewerIds=".concat(viewerIds.join(","));
      }

      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "updateElement",
    value: function updateElement(_ref5, element, user) {
      var projectId = _ref5.projectId,
          floorId = _ref5.floorId,
          scanDatasetId = _ref5.scanDatasetId,
          globalId = _ref5.globalId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/elements/").concat(globalId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, element);
    }
  }, {
    key: "updateManyElements",
    value: function updateManyElements(_ref6, elements, user) {
      var projectId = _ref6.projectId,
          floorId = _ref6.floorId,
          scanDatasetId = _ref6.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/detailed-elements");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, elements);
    }
  }, {
    key: "createElements",
    value: function createElements(_ref7, elements, user) {
      var projectId = _ref7.projectId,
          floorId = _ref7.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/planned-building-elements");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, elements);
    }
  }, {
    key: "matchPlannedBuildingElements",
    value: function matchPlannedBuildingElements(_ref8, matches, newElements, user) {
      var projectId = _ref8.projectId,
          floorId = _ref8.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/planned-building-elements/match");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, {
        matches: matches,
        newElements: newElements
      });
    }
  }]);

  return ElementApi;
}();


(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(ElementApi);

/***/ }),

/***/ 8074:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FileInformationApi)
/* harmony export */ });
/* harmony import */ var _converters_purpose_type_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(256);
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1127);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2854);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck




var FileInformationApi = /*#__PURE__*/function () {
  function FileInformationApi() {
    _classCallCheck(this, FileInformationApi);
  }

  _createClass(FileInformationApi, null, [{
    key: "createProjectFile",
    value: function createProjectFile(_ref, apiFile, user) {
      var projectId = _ref.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/files");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, apiFile);
    }
  }, {
    key: "listProjectFiles",
    value: function listProjectFiles(_ref2, user) {
      var projectId = _ref2.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/files");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    }
  }, {
    key: "zipProjectFolder",
    value: function zipProjectFolder(folderName, _ref3, user) {
      var projectId = _ref3.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/zip-project-folder?folder-prefix=").concat(folderName);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, null);
    }
  }, {
    key: "listPhotoAreaFiles",
    value: function listPhotoAreaFiles(_ref4, user) {
      var projectId = _ref4.projectId,
          photoAreaId = _ref4.photoAreaId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/photo-areas/").concat(photoAreaId, "/files");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    }
  }, {
    key: "saveFloorFile",
    value: function saveFloorFile(_ref5, apiFile, user) {
      var projectId = _ref5.projectId,
          floorId = _ref5.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/file");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, apiFile);
    }
  }, {
    key: "listFloorFiles",
    value: function listFloorFiles(_ref6, user) {
      var projectId = _ref6.projectId,
          floorId = _ref6.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/files");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    }
  }, {
    key: "saveScanDatasetFile",
    value: function saveScanDatasetFile(_ref7, apiFile, user) {
      var projectId = _ref7.projectId,
          floorId = _ref7.floorId,
          scanDatasetId = _ref7.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/file");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, apiFile);
    }
  }, {
    key: "getScanDatasetFiles",
    value: function getScanDatasetFiles(_ref8, purposeType, user) {
      var projectId = _ref8.projectId,
          floorId = _ref8.floorId,
          scanDatasetId = _ref8.scanDatasetId;
      var query;

      if (typeof purposeType === "string") {
        query = "?purposeType=".concat(_converters_purpose_type_converter__WEBPACK_IMPORTED_MODULE_0__.default.toApiPurposeType(purposeType));
      } else {
        query = "";
        user = purposeType;
      }

      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/files").concat(query);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    }
  }]);

  return FileInformationApi;
}();


(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_2__.default)(FileInformationApi);

/***/ }),

/***/ 7755:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FloorApi)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1127);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2854);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var FloorApi = /*#__PURE__*/function () {
  function FloorApi() {
    _classCallCheck(this, FloorApi);
  }

  _createClass(FloorApi, null, [{
    key: "listFloorsForProject",
    value: function listFloorsForProject(projectId, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "createFloor",
    value: function createFloor(projectId, floorNumber, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, {
        text: floorNumber
      });
    }
  }, {
    key: "getFloor",
    value: function getFloor(_ref, user) {
      var projectId = _ref.projectId,
          floorId = _ref.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "updateFloor",
    value: function updateFloor(_ref2, floor, user) {
      var projectId = _ref2.projectId,
          floorId = _ref2.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, floor);
    }
  }, {
    key: "updateFloorOrder",
    value: function updateFloorOrder(_ref3, ordinal, user) {
      var projectId = _ref3.projectId,
          floorId = _ref3.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/reorder/").concat(ordinal);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, null);
    }
  }]);

  return FloorApi;
}();


(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(FloorApi);

/***/ }),

/***/ 8077:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1127);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2854);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var OrganizationApi = /*#__PURE__*/function () {
  function OrganizationApi() {
    _classCallCheck(this, OrganizationApi);
  }

  _createClass(OrganizationApi, null, [{
    key: "listOrganizations",
    value: function listOrganizations(user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/client-accounts");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "getOrganization",
    value: function getOrganization(organizationId, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/client-accounts/").concat(organizationId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "getOrganizationName",
    value: function getOrganizationName(organizationId, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/client-accounts/").concat(organizationId, "/name");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "createOrganization",
    value: function createOrganization(organization, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/client-accounts");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, organization);
    }
  }, {
    key: "updateOrganization",
    value: function updateOrganization(accountId, organization, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/client-accounts/").concat(accountId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, organization);
    }
  }]);

  return OrganizationApi;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(OrganizationApi));

/***/ }),

/***/ 686:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PhotoAreaApi)
/* harmony export */ });
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2854);
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1127);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var PhotoAreaApi = /*#__PURE__*/function () {
  function PhotoAreaApi() {
    _classCallCheck(this, PhotoAreaApi);
  }

  _createClass(PhotoAreaApi, null, [{
    key: "listPhotoAreasForProject",
    value: function listPhotoAreasForProject(_ref, user) {
      var projectId = _ref.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/photo-areas");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    }
  }, {
    key: "listPhotoLocations",
    value: function listPhotoLocations(_ref2, user) {
      var projectId = _ref2.projectId,
          photoAreaId = _ref2.photoAreaId,
          photoSessionId = _ref2.photoSessionId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/photo-areas/").concat(photoAreaId, "/locations");

      if (photoSessionId) {
        url += "?photoSessionId=".concat(photoSessionId);
      }

      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    }
  }, {
    key: "listPhotoSessionsForPhotoArea",
    value: function listPhotoSessionsForPhotoArea(_ref3, user) {
      var projectId = _ref3.projectId,
          photoAreaId = _ref3.photoAreaId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl(), "/projects/").concat(projectId, "/photo-areas/").concat(photoAreaId, "/sessions");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    }
  }]);

  return PhotoAreaApi;
}();


(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_0__.default)(PhotoAreaApi);

/***/ }),

/***/ 3529:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1127);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2854);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var PipelineApi = /*#__PURE__*/function () {
  function PipelineApi() {
    _classCallCheck(this, PipelineApi);
  }

  _createClass(PipelineApi, null, [{
    key: "triggerJobStepsPipeline",
    value: function triggerJobStepsPipeline(associationIds) {
      var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var user = arguments.length > 2 ? arguments[2] : undefined;
      var accountId = associationIds.accountId,
          projectId = associationIds.projectId,
          floorId = associationIds.floorId,
          scanDatasetId = associationIds.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/pipeline/").concat(accountId, "/").concat(projectId, "/").concat(floorId, "/").concat(scanDatasetId, "/trigger");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, body);
    }
  }, {
    key: "triggerPipeline",
    value: function triggerPipeline() {
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var user = arguments.length > 1 ? arguments[1] : undefined;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/pipelines");
      var response = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, body);
      return response;
    }
  }, {
    key: "checkPipelinesApi",
    value: function checkPipelinesApi(name) {//TODO: move from web_gateway_api
    }
  }]);

  return PipelineApi;
}();

(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(PipelineApi);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PipelineApi);

/***/ }),

/***/ 6734:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1127);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2854);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var ProjectApi = /*#__PURE__*/function () {
  function ProjectApi() {
    _classCallCheck(this, ProjectApi);
  }

  _createClass(ProjectApi, null, [{
    key: "listProjectsForOrganization",
    value: function listProjectsForOrganization(accountId, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/client-accounts/").concat(accountId, "/projects");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "listAllProjectsForUser",
    value: function listAllProjectsForUser(user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/list-user-projects");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    } // deprecated. Call getProject and listProjectsForOrganization instead

  }, {
    key: "listProjects",
    value: function listProjects(projectId, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/list");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "getProject",
    value: function getProject(projectId, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "createProject",
    value: function createProject(accountId, project, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/client-accounts/").concat(accountId, "/projects");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, project);
    }
  }, {
    key: "updateProject",
    value: function updateProject(projectId, project, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, project);
    }
  }, {
    key: "archiveProject",
    value: function archiveProject(accountId, projectId, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/archive");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, null);
    }
  }, {
    key: "saveProjectCostAnalysisProgress",
    value: function saveProjectCostAnalysisProgress(_ref, progress, user) {
      var projectId = _ref.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/cost-analysis-progress");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, progress);
    }
  }, {
    key: "saveScannedProjectMasterformatProgress",
    value: function saveScannedProjectMasterformatProgress(_ref2, progress, user) {
      var projectId = _ref2.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/masterformat-progress");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, progress);
    }
  }, {
    key: "saveScheduledProjectMasterformatProgress",
    value: function saveScheduledProjectMasterformatProgress(_ref3, progress, user) {
      var projectId = _ref3.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/scheduled-masterformat-progress");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, progress);
    }
  }, {
    key: "getProjectCostAnalysisProgress",
    value: function getProjectCostAnalysisProgress(_ref4, user) {
      var projectId = _ref4.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/cost-analysis-progress");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "getScannedProjectMasterformatProgress",
    value: function getScannedProjectMasterformatProgress(_ref5, user) {
      var projectId = _ref5.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/masterformat-progress");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "getScheduledProjectMasterformatProgress",
    value: function getScheduledProjectMasterformatProgress(_ref6, user) {
      var projectId = _ref6.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/scheduled-masterformat-progress");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "listProjectFloorFiles",
    value: function listProjectFloorFiles(_ref7, user) {
      var projectId = _ref7.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floor-files");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "getProjectDeviationsReportTsvUrl",
    value: function getProjectDeviationsReportTsvUrl(_ref8, fileName, user) {
      var projectId = _ref8.projectId;
      var baseUrl = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/").concat(fileName, "_deviation-report.tsv");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.addAuthToDownloadUrl(baseUrl, user);
    }
  }]);

  return ProjectApi;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(ProjectApi));

/***/ }),

/***/ 901:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1127);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2854);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck



var ScanDatasetApi = /*#__PURE__*/function () {
  function ScanDatasetApi() {
    _classCallCheck(this, ScanDatasetApi);
  }

  _createClass(ScanDatasetApi, null, [{
    key: "listScanDatasetsForFloor",
    value: function listScanDatasetsForFloor(_ref, user) {
      var projectId = _ref.projectId,
          floorId = _ref.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "updateScanDataset",
    value: function updateScanDataset(_ref2, scanDataset, user) {
      var projectId = _ref2.projectId,
          floorId = _ref2.floorId,
          scanDatasetId = _ref2.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, scanDataset);
    }
  }, {
    key: "createScanDataset",
    value: function createScanDataset(_ref3, user) {
      var projectId = _ref3.projectId,
          floorId = _ref3.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, null);
    }
  }, {
    key: "deleteScanDataset",
    value: function deleteScanDataset(_ref4, user) {
      var projectId = _ref4.projectId,
          floorId = _ref4.floorId,
          scanDatasetId = _ref4.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.delete(url, user);
    }
  }, {
    key: "saveScanAnalysis",
    value: function saveScanAnalysis(_ref5, analysis, user) {
      var projectId = _ref5.projectId,
          floorId = _ref5.floorId,
          scanDatasetId = _ref5.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/analysis?enforceBuiltPersistence=false");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, analysis);
    }
  }, {
    key: "getScanDataset",
    value: function getScanDataset(_ref6, user) {
      var projectId = _ref6.projectId,
          floorId = _ref6.floorId,
          scanDatasetId = _ref6.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "getViewerDetailedElementsForScanDataset",
    value: function getViewerDetailedElementsForScanDataset(_ref7, user) {
      var projectId = _ref7.projectId,
          floorId = _ref7.floorId,
          scanDatasetId = _ref7.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/detailed-elements/viewer");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }, {
    key: "getProgressReportForScanDataset",
    value: function getProgressReportForScanDataset(_ref8, user) {
      var projectId = _ref8.projectId,
          floorId = _ref8.floorId,
          scanDatasetId = _ref8.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/progress");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    }
  }]);

  return ScanDatasetApi;
}();

(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(ScanDatasetApi);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScanDatasetApi);

/***/ }),

/***/ 8080:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebGatewayApi)
/* harmony export */ });
/* harmony import */ var _utilities_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9137);
/* harmony import */ var _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2503);
/* harmony import */ var _utilities_request_headers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(104);
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1127);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2854);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// @ts-nocheck






var WebGatewayApi = /*#__PURE__*/function () {
  function WebGatewayApi() {
    _classCallCheck(this, WebGatewayApi);
  }

  _createClass(WebGatewayApi, null, [{
    key: "connectProjectToStructionSite",
    value: function connectProjectToStructionSite(_ref, structionSiteProjectUrl, token, user) {
      var projectId = _ref.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/connect-to-structionsite?structionsite-access-token=").concat(token, "&structionsite-project-url=").concat(structionSiteProjectUrl);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.post(url, user, null);
    }
  }, {
    key: "checkPipelineStatus",
    value: function checkPipelineStatus(_ref2, pipelineId, user) {
      var projectId = _ref2.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/pipelines/").concat(pipelineId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.get(url, user);
    }
  }, {
    key: "createInvitation",
    value: function createInvitation(inviteeEmail, role, organizationId, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/users/invitations");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.post(url, user, {
        userEmail: inviteeEmail,
        role: role,
        clientAccountId: organizationId
      });
    }
  }, {
    key: "getInvitation",
    value: function getInvitation(invitationToken, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/users/invitations/").concat(invitationToken);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.get(url, user);
    }
  }, {
    key: "getProgressReportPdfUrl",
    value: function getProgressReportPdfUrl(projectId, user) {
      var baseUrl = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/progress-report.pdf");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.addAuthToDownloadUrl(baseUrl, user);
    }
  }, {
    key: "getQualityControlReportPdfUrl",
    value: function getQualityControlReportPdfUrl(projectId) {
      return "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/report.pdf");
    }
  }, {
    key: "getPlannedElementsTsvUrl",
    value: function getPlannedElementsTsvUrl(_ref3, fileName, user) {
      var projectId = _ref3.projectId,
          floorId = _ref3.floorId;
      var baseUrl = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/").concat(fileName, "_planned-building-elements.tsv");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.addAuthToDownloadUrl(baseUrl, user);
    }
  }, {
    key: "getDeviationsReportTsvUrl",
    value: function getDeviationsReportTsvUrl(_ref4, fileName, user) {
      var projectId = _ref4.projectId,
          floorId = _ref4.floorId;
      var baseUrl = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/").concat(fileName, "_deviation-report.tsv");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.addAuthToDownloadUrl(baseUrl, user);
    }
  }, {
    key: "getScanAnalysisUrl",
    value: function getScanAnalysisUrl(_ref5, fileName, user) {
      var projectId = _ref5.projectId,
          floorId = _ref5.floorId,
          scanDatasetId = _ref5.scanDatasetId;
      var baseUrl = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/").concat(fileName, "_scan-analysis.tsv");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.addAuthToDownloadUrl(baseUrl, user);
    }
  }, {
    key: "checkProcoreAccessToken",
    value: function checkProcoreAccessToken(projectId, procoreAccessToken, user) {
      if (!projectId) {
        return Promise.reject(new Error("Project not loaded yet"));
      }

      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/procore?procore-access-token=").concat(procoreAccessToken);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.get(url, user);
    }
  }, {
    key: "pushPdfToProcore",
    value: function pushPdfToProcore(_ref6, procoreProjectId, procoreAccessToken, pdfType, user) {
      var projectId = _ref6.projectId,
          floorId = _ref6.floorId,
          scanDatasetId = _ref6.scanDatasetId;

      if (!projectId) {
        return Promise.reject(new Error("Project not loaded yet"));
      }

      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/push-report-to-procore/").concat(pdfType, "?procore-project-id=").concat(procoreProjectId, "&procore-access-token=").concat(procoreAccessToken);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.post(url, user, null);
    }
  }, {
    key: "getProcoreProjects",
    value: function getProcoreProjects(projectId, procoreAccessToken, user) {
      if (!projectId) {
        return Promise.reject(new Error("Project not loaded yet"));
      }

      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/procore-projects?procore-access-token=").concat(procoreAccessToken);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.get(url, user);
    } // TODO: rename / move

  }, {
    key: "getCustomFirebaseToken",
    value: function getCustomFirebaseToken(user) {
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.fetch("".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/login"), {
        headers: _objectSpread(_objectSpread({}, _utilities_request_headers__WEBPACK_IMPORTED_MODULE_2__.httpGetHeaders), (0,_utilities_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user))
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
        authType: _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_1__.default.BASIC,
        username: username,
        password: password
      };
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.fetch("".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/login"), {
        headers: _objectSpread(_objectSpread({}, _utilities_request_headers__WEBPACK_IMPORTED_MODULE_2__.httpGetHeaders), (0,_utilities_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user))
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
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/users/accept-invitation");
      var invitationForm = {
        invitationToken: token,
        password: password
      };
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.post(url, null, invitationForm);
    }
  }, {
    key: "exportIfc",
    value: function exportIfc(_ref7, type, user) {
      var projectId = _ref7.projectId,
          floorId = _ref7.floorId,
          scanDatasetId = _ref7.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/export-ifc?type=").concat(type);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.post(url, user, null);
    } // TODO unify with pipeline api

  }, {
    key: "checkExportedIfc",
    value: function checkExportedIfc(_ref8, workflowName, type, user) {
      var projectId = _ref8.projectId,
          floorId = _ref8.floorId,
          scanDatasetId = _ref8.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/export-ifc/").concat(workflowName, "?type=").concat(type);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.get(url, user);
    }
  }, {
    key: "downsampleScan",
    value: function downsampleScan(_ref9, user) {
      var projectId = _ref9.projectId,
          floorId = _ref9.floorId,
          scanDatasetId = _ref9.scanDatasetId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/scan-datasets/").concat(scanDatasetId, "/downsample-scan");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.post(url, user, null);
    } //TODO move to AuthApi

  }, {
    key: "getGcpBearerToken",
    value: function getGcpBearerToken(_ref10, user) {
      var projectId = _ref10.projectId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/gcpAccessToken");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.get(url, user);
    }
  }, {
    key: "getMasterformat",
    value: function getMasterformat(version) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/masterformats/").concat(version);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.get(url, null);
    }
  }, {
    key: "triggerArgoRunProgressAndDeviations",
    value: function triggerArgoRunProgressAndDeviations(_ref11, deviationsFlag, bimSourceFileExtension, user) {
      var projectId = _ref11.projectId,
          floorId = _ref11.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/run-progress-and-deviations?deviationsFlag=").concat(deviationsFlag, "&bimSourceFileExtension=").concat(bimSourceFileExtension);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.post(url, user, null);
    }
  }, {
    key: "triggerArgoRunNwdConvert",
    value: function triggerArgoRunNwdConvert(_ref12, user) {
      var projectId = _ref12.projectId,
          floorId = _ref12.floorId;
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/projects/").concat(projectId, "/floors/").concat(floorId, "/nwd-convert");
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.post(url, user, null);
    }
  }, {
    key: "recordUserActions",
    value: function recordUserActions(type, userActions, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/user-actions");
      var actionForm = {
        type: type,
        payload: userActions
      };
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.post(url, user, actionForm);
    }
  }, {
    key: "checkRunningProcess",
    value: function checkRunningProcess(processId, user) {
      var url = "".concat(_utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.baseUrl(), "/running-processes/").concat(processId);
      return _utilities_http__WEBPACK_IMPORTED_MODULE_3__.default.get(url, user);
    }
  }]);

  return WebGatewayApi;
}();


(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_4__.default)(WebGatewayApi, {
  exclude: ["getCustomFirebaseToken", "login"]
});

/***/ }),

/***/ 4406:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_auth_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7323);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5663);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_element_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);
/* harmony import */ var _api_file_information_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8074);
/* harmony import */ var _api_floor_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7755);
/* harmony import */ var _api_organization_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8077);
/* harmony import */ var _api_photo_area_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(686);
/* harmony import */ var _api_pipeline_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3529);
/* harmony import */ var _api_project_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6734);
/* harmony import */ var _api_scan_dataset_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(901);
/* harmony import */ var _api_web_gateway_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8080);











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  auth: _api_auth_api__WEBPACK_IMPORTED_MODULE_0__.default,
  config: (_config__WEBPACK_IMPORTED_MODULE_1___default()),
  elements: _api_element_api__WEBPACK_IMPORTED_MODULE_2__.default,
  files: _api_file_information_api__WEBPACK_IMPORTED_MODULE_3__.default,
  floors: _api_floor_api__WEBPACK_IMPORTED_MODULE_4__.default,
  organizations: _api_organization_api__WEBPACK_IMPORTED_MODULE_5__.default,
  photos: _api_photo_area_api__WEBPACK_IMPORTED_MODULE_6__.default,
  pipelines: _api_pipeline_api__WEBPACK_IMPORTED_MODULE_7__.default,
  projects: _api_project_api__WEBPACK_IMPORTED_MODULE_8__.default,
  scanDatasets: _api_scan_dataset_api__WEBPACK_IMPORTED_MODULE_9__.default,
  other: _api_web_gateway_api__WEBPACK_IMPORTED_MODULE_10__.default
});

/***/ }),

/***/ 2862:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DateConverter)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2470);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DateFormatter = /*#__PURE__*/function () {
  function DateFormatter(format) {
    _classCallCheck(this, DateFormatter);

    this.formatString = void 0;
    this.formatString = format;
  }

  _createClass(DateFormatter, [{
    key: "format",
    value: function format(date) {
      if (date) {
        return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(this.formatString);
      } else {
        return "";
      }
    }
  }]);

  return DateFormatter;
}();

var DateConverter = /*#__PURE__*/function () {
  function DateConverter() {
    _classCallCheck(this, DateConverter);
  }

  _createClass(DateConverter, null, [{
    key: "getDateFormatter",
    value: function getDateFormatter(format) {
      return new DateFormatter(format);
    }
  }, {
    key: "dateToText",
    value: function dateToText(date, format) {
      if (date instanceof Date) {
        if (format) {
          return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(format);
        } else {
          return "last scanned: ".concat(moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format("MMM D, YYYY"));
        }
      } else if (moment__WEBPACK_IMPORTED_MODULE_0___default().isMoment(date)) {
        if (format) {
          return date.format(format);
        } else {
          return "last scanned: ".concat(date.format("MMM D, YYYY"));
        }
      } else {
        return "";
      }
    }
  }, {
    key: "instantToDate",
    value: function instantToDate(instant) {
      if (typeof instant === "number") {
        var epochMillis = instant * 1000;
        return moment__WEBPACK_IMPORTED_MODULE_0___default()(epochMillis).toDate();
      } else {
        return null;
      }
    }
  }, {
    key: "dateToInstant",
    value: function dateToInstant(date) {
      if (date instanceof Date) {
        var epochMillis = moment__WEBPACK_IMPORTED_MODULE_0___default()(date).utc(false).toDate().valueOf();
        return epochMillis / 1000;
      } else if (moment__WEBPACK_IMPORTED_MODULE_0___default().isMoment(date)) {
        var _epochMillis = date.utc(false).toDate().valueOf();

        return _epochMillis / 1000;
      } else {
        return null;
      }
    }
  }, {
    key: "millisecondsToDate",
    value: function millisecondsToDate(epochMillis) {
      if (epochMillis || epochMillis === 0) {
        return moment__WEBPACK_IMPORTED_MODULE_0___default()(epochMillis).toDate();
      } else {
        return null;
      }
    }
  }, {
    key: "isValidDate",
    value: function isValidDate(value) {
      return value instanceof Date && !isNaN(value.valueOf()) || value === null;
    }
  }, {
    key: "tsvStringToDate",
    value: function tsvStringToDate(dateString) {
      if (dateString) {
        return moment__WEBPACK_IMPORTED_MODULE_0___default()(dateString, "MM/DD/YYYY").toDate();
      } else {
        return null;
      }
    }
  }]);

  return DateConverter;
}();



/***/ }),

/***/ 2360:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Matrix3Converter)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_api_api_matrix_3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5692);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** IMPORTANT!!
 *  Threejs Matrix3 stores matrices in column-major ordering.
 *  This means that using the `Matrix3#toArray` or looking at `Matrix3.elements`
 *  will return what appears to be a transposed version of the matrix.
 *
 *  However, the `Matrix3#set` method takes in elements in row-major order, so calling
 *  that method should look the same as in our other repositories.
 */



var Matrix3Converter = /*#__PURE__*/function () {
  function Matrix3Converter() {
    _classCallCheck(this, Matrix3Converter);
  }

  _createClass(Matrix3Converter, null, [{
    key: "convertMatrixStringToArray",
    value: function convertMatrixStringToArray(matrixString) {
      return matrixString.split("\n").join(" ").split(" ");
    }
  }, {
    key: "removeEmptyStrings",
    value: function removeEmptyStrings(matrix) {
      return matrix.filter(function (string) {
        return string !== "";
      });
    }
  }, {
    key: "removeNonNumbers",
    value: function removeNonNumbers(matrix) {
      return matrix.filter(function (string) {
        return parseFloat(string).toString(10) === string;
      });
    }
  }, {
    key: "cleanupStrings",
    value: function cleanupStrings(matrix) {
      return this.removeNonNumbers(this.removeEmptyStrings(matrix));
    }
  }, {
    key: "convertStringsToNumbers",
    value: function convertStringsToNumbers(stringValues) {
      return stringValues.map(function (stringValue) {
        return parseFloat(stringValue);
      });
    }
    /** See note at top of file... */

  }, {
    key: "fromMatrix3ToString",
    value: function fromMatrix3ToString(matrix3) {
      if (matrix3 !== null && matrix3 !== void 0 && matrix3.elements) {
        var _matrix3$elements = _slicedToArray(matrix3.elements, 9),
            x1 = _matrix3$elements[0],
            y1 = _matrix3$elements[1],
            z1 = _matrix3$elements[2],
            x2 = _matrix3$elements[3],
            y2 = _matrix3$elements[4],
            z2 = _matrix3$elements[5],
            x3 = _matrix3$elements[6],
            y3 = _matrix3$elements[7],
            z3 = _matrix3$elements[8];

        return "".concat(x1, " ").concat(x2, " ").concat(x3, "\n").concat(y1, " ").concat(y2, " ").concat(y3, "\n").concat(z1, " ").concat(z2, " ").concat(z3);
      } else {
        return null;
      }
    }
  }, {
    key: "fromStringToMatrix3",
    value: function fromStringToMatrix3(matrixString) {
      var stringArray = this.convertMatrixStringToArray(matrixString);
      var matrix = this.convertStringsToNumbers(this.cleanupStrings(stringArray));

      if (matrix.length === 9) {
        var _matrix = _slicedToArray(matrix, 9),
            x1 = _matrix[0],
            x2 = _matrix[1],
            x3 = _matrix[2],
            y1 = _matrix[3],
            y2 = _matrix[4],
            y3 = _matrix[5],
            z1 = _matrix[6],
            z2 = _matrix[7],
            z3 = _matrix[8];

        return new three__WEBPACK_IMPORTED_MODULE_0__.Matrix3().set(x1, x2, x3, y1, y2, y3, z1, z2, z3);
      } else {
        return null;
      }
    }
  }, {
    key: "fromApiMatrix3ToMatrix3",
    value: function fromApiMatrix3ToMatrix3(apiMatrix) {
      if (apiMatrix) {
        var x1 = apiMatrix.x1,
            y1 = apiMatrix.y1,
            z1 = apiMatrix.z1,
            x2 = apiMatrix.x2,
            y2 = apiMatrix.y2,
            z2 = apiMatrix.z2,
            x3 = apiMatrix.x3,
            y3 = apiMatrix.y3,
            z3 = apiMatrix.z3;
        return new three__WEBPACK_IMPORTED_MODULE_0__.Matrix3().set(x1, x2, x3, y1, y2, y3, z1, z2, z3);
      } else {
        return null;
      }
    }
    /** See note at top of file... */

  }, {
    key: "fromMatrix3ToApiMatrix3",
    value: function fromMatrix3ToApiMatrix3(matrix3) {
      if (matrix3) {
        var _matrix3$toArray = matrix3.toArray(),
            _matrix3$toArray2 = _slicedToArray(_matrix3$toArray, 9),
            x1 = _matrix3$toArray2[0],
            y1 = _matrix3$toArray2[1],
            z1 = _matrix3$toArray2[2],
            x2 = _matrix3$toArray2[3],
            y2 = _matrix3$toArray2[4],
            z2 = _matrix3$toArray2[5],
            x3 = _matrix3$toArray2[6],
            y3 = _matrix3$toArray2[7],
            z3 = _matrix3$toArray2[8];

        return new _models_api_api_matrix_3__WEBPACK_IMPORTED_MODULE_1__.default({
          x1: x1,
          x2: x2,
          x3: x3,
          y1: y1,
          y2: y2,
          y3: y3,
          z1: z1,
          z2: z2,
          z3: z3
        });
      } else {
        return null;
      }
    }
  }]);

  return Matrix3Converter;
}();



/***/ }),

/***/ 1700:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Matrix4Converter)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_api_api_matrix_4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9081);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** IMPORTANT!!
 *  Threejs Matrix4 stores matrices in column-major ordering.
 *  This means that using the `Matrix4#toArray` or looking at `Matrix4.elements`
 *  will return what appears to be a transposed version of the matrix.
 *
 *  However, the `Matrix4#set` method takes in elements in row-major order, so calling
 *  that method should look the same as in our other repositories.
 */



var Matrix4Converter = /*#__PURE__*/function () {
  function Matrix4Converter() {
    _classCallCheck(this, Matrix4Converter);
  }

  _createClass(Matrix4Converter, null, [{
    key: "convertMatrixStringToArray",
    value: function convertMatrixStringToArray(matrixString) {
      return matrixString.split("\n").join(" ").split(" ");
    }
  }, {
    key: "removeEmptyStrings",
    value: function removeEmptyStrings(matrix) {
      return matrix.filter(function (string) {
        return string !== "";
      });
    }
  }, {
    key: "removeNonNumbers",
    value: function removeNonNumbers(matrix) {
      return matrix.filter(function (string) {
        return parseFloat(string).toString(10) === string;
      });
    }
  }, {
    key: "cleanupStrings",
    value: function cleanupStrings(matrix) {
      return this.removeNonNumbers(this.removeEmptyStrings(matrix));
    }
  }, {
    key: "convertStringsToNumbers",
    value: function convertStringsToNumbers(stringValues) {
      return stringValues.map(function (stringValue) {
        return parseFloat(stringValue);
      });
    }
    /** See note at top of file... */

  }, {
    key: "fromMatrix4ToString",
    value: function fromMatrix4ToString(matrix4) {
      if (matrix4 !== null && matrix4 !== void 0 && matrix4.elements) {
        var _matrix4$elements = _slicedToArray(matrix4.elements, 16),
            x1 = _matrix4$elements[0],
            y1 = _matrix4$elements[1],
            z1 = _matrix4$elements[2],
            w1 = _matrix4$elements[3],
            x2 = _matrix4$elements[4],
            y2 = _matrix4$elements[5],
            z2 = _matrix4$elements[6],
            w2 = _matrix4$elements[7],
            x3 = _matrix4$elements[8],
            y3 = _matrix4$elements[9],
            z3 = _matrix4$elements[10],
            w3 = _matrix4$elements[11],
            x4 = _matrix4$elements[12],
            y4 = _matrix4$elements[13],
            z4 = _matrix4$elements[14],
            w4 = _matrix4$elements[15];

        return "".concat(x1, " ").concat(x2, " ").concat(x3, " ").concat(x4, "\n").concat(y1, " ").concat(y2, " ").concat(y3, " ").concat(y4, "\n").concat(z1, " ").concat(z2, " ").concat(z3, " ").concat(z4, "\n").concat(w1, " ").concat(w2, " ").concat(w3, " ").concat(w4);
      } else {
        return null;
      }
    }
  }, {
    key: "fromStringToMatrix4",
    value: function fromStringToMatrix4(matrixString) {
      var stringArray = this.convertMatrixStringToArray(matrixString);
      var matrix = this.convertStringsToNumbers(this.cleanupStrings(stringArray));

      if (matrix.length === 16) {
        var _matrix = _slicedToArray(matrix, 16),
            x1 = _matrix[0],
            x2 = _matrix[1],
            x3 = _matrix[2],
            x4 = _matrix[3],
            y1 = _matrix[4],
            y2 = _matrix[5],
            y3 = _matrix[6],
            y4 = _matrix[7],
            z1 = _matrix[8],
            z2 = _matrix[9],
            z3 = _matrix[10],
            z4 = _matrix[11],
            w1 = _matrix[12],
            w2 = _matrix[13],
            w3 = _matrix[14],
            w4 = _matrix[15];

        return new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4().set(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, w1, w2, w3, w4);
      } else {
        return null;
      }
    }
  }, {
    key: "fromApiMatrixToMatrix4",
    value: function fromApiMatrixToMatrix4(apiMatrix) {
      if (apiMatrix) {
        var x1 = apiMatrix.x1,
            y1 = apiMatrix.y1,
            z1 = apiMatrix.z1,
            w1 = apiMatrix.w1,
            x2 = apiMatrix.x2,
            y2 = apiMatrix.y2,
            z2 = apiMatrix.z2,
            w2 = apiMatrix.w2,
            x3 = apiMatrix.x3,
            y3 = apiMatrix.y3,
            z3 = apiMatrix.z3,
            w3 = apiMatrix.w3,
            x4 = apiMatrix.x4,
            y4 = apiMatrix.y4,
            z4 = apiMatrix.z4,
            w4 = apiMatrix.w4;
        return new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4().set(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, w1, w2, w3, w4);
      } else {
        return null;
      }
    }
    /** See note at top of file... */

  }, {
    key: "fromMatrix4ToApiMatrix",
    value: function fromMatrix4ToApiMatrix(matrix4) {
      if (matrix4) {
        var _matrix4$toArray = matrix4.toArray(),
            _matrix4$toArray2 = _slicedToArray(_matrix4$toArray, 16),
            x1 = _matrix4$toArray2[0],
            y1 = _matrix4$toArray2[1],
            z1 = _matrix4$toArray2[2],
            w1 = _matrix4$toArray2[3],
            x2 = _matrix4$toArray2[4],
            y2 = _matrix4$toArray2[5],
            z2 = _matrix4$toArray2[6],
            w2 = _matrix4$toArray2[7],
            x3 = _matrix4$toArray2[8],
            y3 = _matrix4$toArray2[9],
            z3 = _matrix4$toArray2[10],
            w3 = _matrix4$toArray2[11],
            x4 = _matrix4$toArray2[12],
            y4 = _matrix4$toArray2[13],
            z4 = _matrix4$toArray2[14],
            w4 = _matrix4$toArray2[15];

        return new _models_api_api_matrix_4__WEBPACK_IMPORTED_MODULE_1__.default({
          x1: x1,
          x2: x2,
          x3: x3,
          x4: x4,
          y1: y1,
          y2: y2,
          y3: y3,
          y4: y4,
          z1: z1,
          z2: z2,
          z3: z3,
          z4: z4,
          w1: w1,
          w2: w2,
          w3: w3,
          w4: w4
        });
      } else {
        return null;
      }
    }
  }]);

  return Matrix4Converter;
}();



/***/ }),

/***/ 256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PurposeTypeConverter)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_enums_purpose_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3011);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var apiPurposeTypeByPurposeType = underscore__WEBPACK_IMPORTED_MODULE_0___default().invert(_models_enums_purpose_type__WEBPACK_IMPORTED_MODULE_1__.default);

var purposeTypeByApiPurposeType = _models_enums_purpose_type__WEBPACK_IMPORTED_MODULE_1__.default;

var PurposeTypeConverter = /*#__PURE__*/function () {
  function PurposeTypeConverter() {
    _classCallCheck(this, PurposeTypeConverter);
  }

  _createClass(PurposeTypeConverter, null, [{
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



/***/ }),

/***/ 9036:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2470);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2862);



function addDateGetterAndSetterToDomainModel(target, propertyName) {
  var dateVal;
  Object.defineProperty(target, propertyName, {
    get: function get() {
      return dateVal;
    },
    set: function set(val) {
      if (typeof val === "string") {
        dateVal = moment__WEBPACK_IMPORTED_MODULE_0___default()(val, "MMM D, YYYY").toDate();
      } else if (val instanceof Date) {
        dateVal = val;
      } else if (moment__WEBPACK_IMPORTED_MODULE_0___default().isMoment(val)) {
        val.toDate();
      } else {
        dateVal = _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__.default.instantToDate(val) || _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__.default.millisecondsToDate(val) || null;
      }
    },
    enumerable: true
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addDateGetterAndSetterToDomainModel);

/***/ }),

/***/ 4474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2470);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2862);



var addInstantGetterAndSetterToApiModel = function addInstantGetterAndSetterToApiModel(modelInstance, propertyName) {
  var dateVal;
  Object.defineProperty(modelInstance, propertyName, {
    get: function get() {
      return dateVal;
    },
    set: function set(val) {
      if (typeof val === "string") {
        dateVal = _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__.default.dateToInstant(moment__WEBPACK_IMPORTED_MODULE_0___default()(val, "MMM D, YYYY").toDate());
      } else if (val instanceof Date || moment__WEBPACK_IMPORTED_MODULE_0___default().isMoment(val)) {
        dateVal = _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__.default.dateToInstant(val);
      } else {
        dateVal = val;
      }
    },
    enumerable: true
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addInstantGetterAndSetterToApiModel);

/***/ }),

/***/ 3522:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var addLoggingToInstanceMethods = function addLoggingToInstanceMethods(instance, instanceName, ignoredMethods) {
  var instanceMethods = underscore__WEBPACK_IMPORTED_MODULE_0___default().methods(instance);

  if (ignoredMethods) {
    var _ref;

    instanceMethods = (_ref = underscore__WEBPACK_IMPORTED_MODULE_0___default()(instanceMethods)).without.apply(_ref, _toConsumableArray(ignoredMethods));
  }

  instanceMethods.forEach(function (methodName) {
    if (!ignoredMethods.includes(methodName)) {
      var descriptor = Object.getOwnPropertyDescriptor(instance, methodName);

      if (!descriptor || descriptor.configurable) {
        var originalMethod = instance[methodName];
        Object.defineProperty(instance, methodName, {
          value: function value() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            console.log("calling ".concat(instanceName, ".").concat(methodName, "(").concat(args, ")"));
            return originalMethod.call.apply(originalMethod, [instance].concat(args));
          },
          enumerable: true,
          configurable: false
        });
      }
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addLoggingToInstanceMethods);

/***/ }),

/***/ 1257:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var addReadOnlyPropertiesToModel = function addReadOnlyPropertiesToModel(modelInstance, properties) {
  Object.getOwnPropertyNames(properties).forEach(function (propertyName) {
    Object.defineProperty(modelInstance, propertyName, {
      value: properties[propertyName],
      writable: false,
      enumerable: true,
      configurable: false
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addReadOnlyPropertiesToModel);

/***/ }),

/***/ 6305:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiArgoResponse)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiArgoResponse = function ApiArgoResponse() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      name = _ref.name,
      generateName = _ref.generateName,
      namespace = _ref.namespace,
      selfLink = _ref.selfLink,
      uid = _ref.uid,
      resourceVersion = _ref.resourceVersion,
      generation = _ref.generation,
      creationTimestamp = _ref.creationTimestamp;

  _classCallCheck(this, ApiArgoResponse);

  this.metadata = void 0;
  this.metadata = {
    name: name,
    generateName: generateName,
    namespace: namespace,
    selfLink: selfLink,
    uid: uid,
    resourceVersion: resourceVersion,
    generation: generation,
    creationTimestamp: creationTimestamp
  };
};



/***/ }),

/***/ 720:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiCloudFile)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4474);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1257);
/* harmony import */ var _api_purpose_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(941);
/* harmony import */ var _enums_purpose_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3011);
/* harmony import */ var _converters_purpose_type_converter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(256);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var ApiCloudFile = function ApiCloudFile(_ref) {
  var url = _ref.url,
      id = _ref.id,
      lastModified = _ref.lastModified,
      createdAt = _ref.createdAt,
      purposeType = _ref.purposeType,
      fileType = _ref.fileType;

  _classCallCheck(this, ApiCloudFile);

  this.url = void 0;
  this.id = void 0;
  this.lastModified = null;
  this.createdAt = null;
  this.purposeType = _api_purpose_type__WEBPACK_IMPORTED_MODULE_1__.default.OTHER;
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "lastModified");
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "createdAt");
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_4__.default)(this, {
    url: url,
    id: id,
    fileType: fileType
  });
  var purposeTypeVal = _api_purpose_type__WEBPACK_IMPORTED_MODULE_1__.default.OTHER;
  Object.defineProperties(this, {
    purposeType: {
      get: function get() {
        return purposeTypeVal;
      },
      set: function set(val) {
        if (typeof val === "string") {
          if ((0,_api_purpose_type__WEBPACK_IMPORTED_MODULE_1__.isApiPurposeType)(val)) {
            purposeTypeVal = val;
          } else if ((0,_enums_purpose_type__WEBPACK_IMPORTED_MODULE_2__.isPurposeType)(val)) {
            purposeTypeVal = _converters_purpose_type_converter__WEBPACK_IMPORTED_MODULE_3__.default.toApiPurposeType(val);
          }
        }
      },
      enumerable: true
    }
  }); // @ts-ignore

  this.lastModified = lastModified || null; // @ts-ignore

  this.createdAt = createdAt || null; // @ts-ignore

  this.purposeType = purposeType;
};



/***/ }),

/***/ 5471:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiConstructionGrid)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1257);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ApiConstructionGrid = function ApiConstructionGrid(_ref) {
  var id = _ref.id,
      globalId = _ref.globalId,
      axisULines = _ref.axisULines,
      axisVLines = _ref.axisVLines,
      firebaseFloorId = _ref.firebaseFloorId;

  _classCallCheck(this, ApiConstructionGrid);

  this.id = null;
  this.globalId = null;
  this.axisULines = [];
  this.axisVLines = [];
  this.firebaseFloorId = null;
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, {
    id: id,
    firebaseFloorId: firebaseFloorId,
    globalId: globalId
  });
  this.axisULines = axisULines;
  this.axisVLines = axisVLines;
};



/***/ }),

/***/ 9951:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiFloor)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4474);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1257);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _converters_matrix_3_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2360);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var ApiFloor = function ApiFloor() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      id = _ref.id,
      firebaseId = _ref.firebaseId,
      ordinal = _ref.ordinal,
      floorNumber = _ref.floorNumber,
      defaultFirebaseScanDatasetId = _ref.defaultFirebaseScanDatasetId,
      firebaseProjectId = _ref.firebaseProjectId,
      firebaseScanDatasetIds = _ref.firebaseScanDatasetIds,
      constructionGrid = _ref.constructionGrid,
      plannedElementCount = _ref.plannedElementCount,
      scanDate = _ref.scanDate,
      photoAreaId = _ref.photoAreaId,
      offset = _ref.offset,
      photoAreaMinimapPixelToBimMinimapPixel = _ref.photoAreaMinimapPixelToBimMinimapPixel,
      bimMinimapToWorld = _ref.bimMinimapToWorld,
      floorElevation = _ref.floorElevation;

  _classCallCheck(this, ApiFloor);

  this.id = void 0;
  this.firebaseId = void 0;
  this.firebaseProjectId = void 0;
  this.ordinal = void 0;
  this.floorNumber = void 0;
  this.defaultFirebaseScanDatasetId = void 0;
  this.firebaseScanDatasetIds = [];
  this.constructionGrid = null;
  this.plannedElementCount = null;
  this.scanDate = null;
  this.offset = null;
  this.photoAreaId = null;
  this.photoAreaMinimapPixelToBimMinimapPixel = null;
  this.bimMinimapToWorld = null;
  this.floorElevation = void 0;
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "scanDate");
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__.default)(this, {
    id: id,
    firebaseId: firebaseId,
    firebaseProjectId: firebaseProjectId
  });
  var offsetVal, photoMinimapToBimMinimapTransformVal, bimMinimapToWorldTransformVal;
  Object.defineProperties(this, {
    offset: {
      get: function get() {
        return offsetVal;
      },
      set: function set(val) {
        if (val) {
          offsetVal = {
            x: val.x,
            y: val.y
          };
        } else {
          offsetVal = null;
        }
      },
      enumerable: true
    },
    photoAreaMinimapPixelToBimMinimapPixel: {
      get: function get() {
        return photoMinimapToBimMinimapTransformVal;
      },
      set: function set(val) {
        if (val instanceof three__WEBPACK_IMPORTED_MODULE_1__.Matrix3) {
          photoMinimapToBimMinimapTransformVal = _converters_matrix_3_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix3ToApiMatrix3(val);
        } else if (val) {
          photoMinimapToBimMinimapTransformVal = val;
        } else {
          photoMinimapToBimMinimapTransformVal = null;
        }
      },
      enumerable: true
    },
    bimMinimapToWorld: {
      get: function get() {
        return bimMinimapToWorldTransformVal;
      },
      set: function set(val) {
        if (val instanceof three__WEBPACK_IMPORTED_MODULE_1__.Matrix3) {
          bimMinimapToWorldTransformVal = _converters_matrix_3_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix3ToApiMatrix3(val);
        } else if (val) {
          bimMinimapToWorldTransformVal = val;
        } else {
          bimMinimapToWorldTransformVal = null;
        }
      },
      enumerable: true
    }
  });
  this.ordinal = ordinal;
  this.floorNumber = floorNumber;
  this.defaultFirebaseScanDatasetId = defaultFirebaseScanDatasetId;
  this.firebaseScanDatasetIds = firebaseScanDatasetIds || [];
  this.constructionGrid = constructionGrid || null;
  this.plannedElementCount = plannedElementCount || 0; // @ts-ignore

  this.scanDate = scanDate || null;
  this.photoAreaId = photoAreaId;
  this.offset = offset || null; // @ts-ignore

  this.photoAreaMinimapPixelToBimMinimapPixel = photoAreaMinimapPixelToBimMinimapPixel || null; // @ts-ignore

  this.bimMinimapToWorld = bimMinimapToWorld || null;
  this.floorElevation = floorElevation || null;
};



/***/ }),

/***/ 5440:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiGridLine)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ApiGridLine = function ApiGridLine(_ref) {
  var name = _ref.name,
      point1 = _ref.point1,
      point2 = _ref.point2;

  _classCallCheck(this, ApiGridLine);

  this.name = null;
  this.point1 = null;
  this.point2 = null;
  this.name = name || null;

  if (point1) {
    this.point1 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(point1.x, point1.y);
  } else {
    this.point1 = null;
  }

  if (point2) {
    this.point2 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(point2.x, point2.y);
  } else {
    this.point2 = null;
  }
};



/***/ }),

/***/ 5941:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiInvitation)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiInvitation = function ApiInvitation() {
  _classCallCheck(this, ApiInvitation);

  this.userEmail = void 0;
  this.resourceName = void 0;
  this.expiry = void 0;
};



/***/ }),

/***/ 5648:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiMasterformat)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiMasterformat = function ApiMasterformat(version, code, description) {
  _classCallCheck(this, ApiMasterformat);

  this.version = void 0;
  this.code = void 0;
  this.description = void 0;
  this.version = version;
  this.code = code;
  this.description = description;
};



/***/ }),

/***/ 5692:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiMatrix3)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiMatrix3 = function ApiMatrix3(_ref) {
  var _ref$x = _ref.x1,
      x1 = _ref$x === void 0 ? 1 : _ref$x,
      _ref$x2 = _ref.x2,
      x2 = _ref$x2 === void 0 ? 0 : _ref$x2,
      _ref$x3 = _ref.x3,
      x3 = _ref$x3 === void 0 ? 0 : _ref$x3,
      _ref$y = _ref.y1,
      y1 = _ref$y === void 0 ? 0 : _ref$y,
      _ref$y2 = _ref.y2,
      y2 = _ref$y2 === void 0 ? 1 : _ref$y2,
      _ref$y3 = _ref.y3,
      y3 = _ref$y3 === void 0 ? 0 : _ref$y3,
      _ref$z = _ref.z1,
      z1 = _ref$z === void 0 ? 0 : _ref$z,
      _ref$z2 = _ref.z2,
      z2 = _ref$z2 === void 0 ? 0 : _ref$z2,
      _ref$z3 = _ref.z3,
      z3 = _ref$z3 === void 0 ? 1 : _ref$z3;

  _classCallCheck(this, ApiMatrix3);

  this.x1 = 1;
  this.x2 = 0;
  this.x3 = 0;
  this.y1 = 0;
  this.y2 = 1;
  this.y3 = 0;
  this.z1 = 0;
  this.z2 = 0;
  this.z3 = 1;
  this.x1 = x1;
  this.x2 = x2;
  this.x3 = x3;
  this.y1 = y1;
  this.y2 = y2;
  this.y3 = y3;
  this.z1 = z1;
  this.z2 = z2;
  this.z3 = z3;
};



/***/ }),

/***/ 9081:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiMatrix4)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiMatrix4 = function ApiMatrix4() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$x = _ref.x1,
      x1 = _ref$x === void 0 ? 1 : _ref$x,
      _ref$x2 = _ref.x2,
      x2 = _ref$x2 === void 0 ? 0 : _ref$x2,
      _ref$x3 = _ref.x3,
      x3 = _ref$x3 === void 0 ? 0 : _ref$x3,
      _ref$x4 = _ref.x4,
      x4 = _ref$x4 === void 0 ? 0 : _ref$x4,
      _ref$y = _ref.y1,
      y1 = _ref$y === void 0 ? 0 : _ref$y,
      _ref$y2 = _ref.y2,
      y2 = _ref$y2 === void 0 ? 1 : _ref$y2,
      _ref$y3 = _ref.y3,
      y3 = _ref$y3 === void 0 ? 0 : _ref$y3,
      _ref$y4 = _ref.y4,
      y4 = _ref$y4 === void 0 ? 0 : _ref$y4,
      _ref$z = _ref.z1,
      z1 = _ref$z === void 0 ? 0 : _ref$z,
      _ref$z2 = _ref.z2,
      z2 = _ref$z2 === void 0 ? 0 : _ref$z2,
      _ref$z3 = _ref.z3,
      z3 = _ref$z3 === void 0 ? 1 : _ref$z3,
      _ref$z4 = _ref.z4,
      z4 = _ref$z4 === void 0 ? 0 : _ref$z4,
      _ref$w = _ref.w1,
      w1 = _ref$w === void 0 ? 0 : _ref$w,
      _ref$w2 = _ref.w2,
      w2 = _ref$w2 === void 0 ? 0 : _ref$w2,
      _ref$w3 = _ref.w3,
      w3 = _ref$w3 === void 0 ? 0 : _ref$w3,
      _ref$w4 = _ref.w4,
      w4 = _ref$w4 === void 0 ? 1 : _ref$w4;

  _classCallCheck(this, ApiMatrix4);

  this.x1 = 1;
  this.x2 = 0;
  this.x3 = 0;
  this.x4 = 0;
  this.y1 = 0;
  this.y2 = 1;
  this.y3 = 0;
  this.y4 = 0;
  this.z1 = 0;
  this.z2 = 0;
  this.z3 = 1;
  this.z4 = 0;
  this.w1 = 0;
  this.w2 = 0;
  this.w3 = 0;
  this.w4 = 1;
  this.x1 = x1;
  this.x2 = x2;
  this.x3 = x3;
  this.x4 = x4;
  this.y1 = y1;
  this.y2 = y2;
  this.y3 = y3;
  this.y4 = y4;
  this.z1 = z1;
  this.z2 = z2;
  this.z3 = z3;
  this.z4 = z4;
  this.w1 = w1;
  this.w2 = w2;
  this.w3 = w3;
  this.w4 = w4;
};



/***/ }),

/***/ 9887:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiOrganization)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1257);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ApiOrganization = function ApiOrganization(_ref) {
  var id = _ref.id,
      firebaseId = _ref.firebaseId,
      city = _ref.city,
      country = _ref.country,
      addressLine1 = _ref.addressLine1,
      addressLine2 = _ref.addressLine2,
      state = _ref.state,
      zip = _ref.zip,
      contactEmail = _ref.contactEmail,
      contactFirstName = _ref.contactFirstName,
      contactLastName = _ref.contactLastName,
      contactPhoneNumber = _ref.contactPhoneNumber,
      name = _ref.name,
      notes = _ref.notes,
      firebaseProjectIds = _ref.firebaseProjectIds;

  _classCallCheck(this, ApiOrganization);

  this.id = void 0;
  this.firebaseId = void 0;
  this.city = null;
  this.country = null;
  this.addressLine1 = null;
  this.addressLine2 = null;
  this.state = null;
  this.zip = null;
  this.contactEmail = null;
  this.contactFirstName = null;
  this.contactLastName = null;
  this.contactPhoneNumber = null;
  this.name = null;
  this.notes = null;
  this.firebaseProjectIds = [];
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, {
    id: id,
    firebaseId: firebaseId
  });
  this.city = city;
  this.country = country;
  this.addressLine1 = addressLine1;
  this.addressLine2 = addressLine2;
  this.state = state;
  this.zip = zip;
  this.contactEmail = contactEmail;
  this.contactFirstName = contactFirstName;
  this.contactLastName = contactLastName;
  this.contactPhoneNumber = contactPhoneNumber;
  this.name = name;
  this.notes = notes;
  this.firebaseProjectIds = firebaseProjectIds || [];
};



/***/ }),

/***/ 9657:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiPhotoArea)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1257);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ApiPhotoArea = function ApiPhotoArea(_ref) {
  var name = _ref.name,
      id = _ref.id,
      firebaseProjectId = _ref.firebaseProjectId,
      structionsiteProjectUrl = _ref.structionsiteProjectUrl;

  _classCallCheck(this, ApiPhotoArea);

  this.id = void 0;
  this.firebaseProjectId = void 0;
  this.name = void 0;
  this.structionsiteProjectUrl = void 0;
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, {
    id: id,
    firebaseProjectId: firebaseProjectId
  });
  this.name = name;
  this.structionsiteProjectUrl = structionsiteProjectUrl;
};



/***/ }),

/***/ 7842:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiPhotoLocation)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiPhotoLocation = function ApiPhotoLocation() {
  _classCallCheck(this, ApiPhotoLocation);

  this.id = void 0;
  this.photoAreaId = void 0;
  this.photoSessionId = void 0;
  this.file = void 0;
  this.minimapX = void 0;
  this.minimapY = void 0;
  this.minimapBearing = void 0;
  this.projectionType = void 0;
  this.cameraWorldMatrix = void 0;
};



/***/ }),

/***/ 4713:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiPhotoSession)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1257);
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4474);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var ApiPhotoSession = function ApiPhotoSession() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      id = _ref.id,
      photoAreaId = _ref.photoAreaId,
      sessionDate = _ref.sessionDate;

  _classCallCheck(this, ApiPhotoSession);

  this.id = void 0;
  this.photoAreaId = void 0;
  this.sessionDate = void 0;
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__.default)(this, {
    id: id,
    photoAreaId: photoAreaId
  });
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "sessionDate"); // @ts-ignore

  this.sessionDate = sessionDate;
};



/***/ }),

/***/ 179:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiPipeline)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4474);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1257);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var ApiPipeline = function ApiPipeline() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      id = _ref.id,
      name = _ref.name,
      externalId = _ref.externalId,
      externalUrl = _ref.externalUrl,
      startTime = _ref.startTime,
      endTime = _ref.endTime,
      firebaseProjectId = _ref.firebaseProjectId,
      firebaseFloorId = _ref.firebaseFloorId,
      firebaseScanDatasetId = _ref.firebaseScanDatasetId,
      options = _ref.options,
      status = _ref.status;

  _classCallCheck(this, ApiPipeline);

  this.id = void 0;
  this.name = void 0;
  this.externalId = void 0;
  this.externalUrl = void 0;
  this.startTime = void 0;
  this.endTime = void 0;
  this.firebaseProjectId = void 0;
  this.firebaseFloorId = void 0;
  this.firebaseScanDatasetId = void 0;
  this.options = void 0;
  this.status = void 0;
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__.default)(this, {
    id: id
  });
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "startTime");
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "endTime");
  this.name = name || null;
  this.externalId = externalId || null;
  this.externalUrl = externalUrl || null; // @ts-ignore

  this.startTime = startTime; // @ts-ignore

  this.endTime = endTime;
  this.firebaseProjectId = firebaseProjectId || null;
  this.firebaseFloorId = firebaseFloorId || null;
  this.firebaseScanDatasetId = firebaseScanDatasetId || null;
  this.options = options || null;
  this.status = status || null;
};



/***/ }),

/***/ 7304:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiPlannedElement)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1257);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ApiPlannedElement = function ApiPlannedElement() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      globalId = _ref.globalId,
      name = _ref.name,
      ifcType = _ref.ifcType,
      uniformat = _ref.uniformat,
      itemId = _ref.itemId,
      discipline = _ref.discipline,
      primaryUnitOfMeasurement = _ref.primaryUnitOfMeasurement,
      primaryMeasurement = _ref.primaryMeasurement;

  _classCallCheck(this, ApiPlannedElement);

  this.globalId = void 0;
  this.name = void 0;
  this.ifcType = void 0;
  this.uniformat = void 0;
  this.itemId = void 0;
  this.discipline = void 0;
  this.primaryUnitOfMeasurement = void 0;
  this.primaryMeasurement = void 0;
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, {
    globalId: globalId
  });
  this.name = name;
  this.ifcType = ifcType;
  this.uniformat = uniformat;
  this.itemId = itemId;
  this.discipline = discipline;
  this.primaryUnitOfMeasurement = primaryUnitOfMeasurement;
  this.primaryMeasurement = primaryMeasurement;
};



/***/ }),

/***/ 7141:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4474);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1257);
/* harmony import */ var _enums_system_of_measurement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(370);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var ApiProject = function ApiProject() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      city = _ref.city,
      country = _ref.country,
      addressLine1 = _ref.addressLine1,
      addressLine2 = _ref.addressLine2,
      state = _ref.state,
      zip = _ref.zip,
      defaultFirebaseFloorId = _ref.defaultFirebaseFloorId,
      archivedAt = _ref.archivedAt,
      progressNotes = _ref.progressNotes,
      avvirAnalysisNotes = _ref.avvirAnalysisNotes,
      endDate = _ref.endDate,
      firebaseId = _ref.firebaseId,
      name = _ref.name,
      notes = _ref.notes,
      pricing = _ref.pricing,
      sourceAnalysisNotes = _ref.sourceAnalysisNotes,
      startDate = _ref.startDate,
      systemOfMeasurement = _ref.systemOfMeasurement,
      id = _ref.id,
      clientAccountId = _ref.clientAccountId,
      scannedProjectMasterformatProgresses = _ref.scannedProjectMasterformatProgresses,
      scheduledProjectMasterformatProgresses = _ref.scheduledProjectMasterformatProgresses,
      costAnalysisProgresses = _ref.costAnalysisProgresses,
      firebaseFloorIds = _ref.firebaseFloorIds;

  _classCallCheck(this, ApiProject);

  this.id = void 0;
  this.firebaseId = void 0;
  this.clientAccountId = void 0;
  this.name = void 0;
  this.scannedProjectMasterformatProgresses = [];
  this.scheduledProjectMasterformatProgresses = [];
  this.costAnalysisProgresses = [];
  this.defaultFirebaseFloorId = null;
  this.firebaseFloorIds = [];
  this.addressLine1 = null;
  this.addressLine2 = null;
  this.city = null;
  this.state = null;
  this.country = null;
  this.zip = null;
  this.pricing = null;
  this.notes = null;
  this.startDate = null;
  this.endDate = null;
  this.archivedAt = null;
  this.systemOfMeasurement = _enums_system_of_measurement__WEBPACK_IMPORTED_MODULE_1__.IMPERIAL;
  this.progressNotes = null;
  this.avvirAnalysisNotes = null;
  this.sourceAnalysisNotes = null;
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "startDate");
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "endDate");
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "archivedAt");
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_2__.default)(this, {
    firebaseId: firebaseId,
    clientAccountId: clientAccountId,
    id: id
  });
  this.firebaseFloorIds = firebaseFloorIds || [];
  this.defaultFirebaseFloorId = defaultFirebaseFloorId || null;
  this.city = city || null;
  this.country = country || null;
  this.addressLine1 = addressLine1 || null;
  this.addressLine2 = addressLine2 || null;
  this.state = state || null;
  this.zip = zip || null;
  this.name = name || null;
  this.notes = notes || null;
  this.pricing = pricing || null;
  this.progressNotes = progressNotes || null;
  this.avvirAnalysisNotes = avvirAnalysisNotes || null;
  this.sourceAnalysisNotes = sourceAnalysisNotes || null;
  this.scannedProjectMasterformatProgresses = scannedProjectMasterformatProgresses || [];
  this.scheduledProjectMasterformatProgresses = scheduledProjectMasterformatProgresses || [];
  this.costAnalysisProgresses = costAnalysisProgresses || [];
  this.systemOfMeasurement = systemOfMeasurement || _enums_system_of_measurement__WEBPACK_IMPORTED_MODULE_1__.IMPERIAL; // @ts-ignore

  this.endDate = endDate || null; // @ts-ignore

  this.startDate = startDate || null; // @ts-ignore

  this.archivedAt = archivedAt || null;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiProject);

/***/ }),

/***/ 4636:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiProjectCostAnalysisProgress)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4474);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ApiProjectCostAnalysisProgress = function ApiProjectCostAnalysisProgress(_ref) {
  var masterformatCode = _ref.masterformatCode,
      sequence = _ref.sequence,
      name = _ref.name,
      description = _ref.description,
      unitOfMeasure = _ref.unitOfMeasure,
      unitCost = _ref.unitCost,
      quantity = _ref.quantity,
      totalCost = _ref.totalCost,
      bimQuantity = _ref.bimQuantity,
      reportedInstalled = _ref.reportedInstalled,
      installedQuantity = _ref.installedQuantity,
      installedCost = _ref.installedCost,
      analysisDate = _ref.analysisDate;

  _classCallCheck(this, ApiProjectCostAnalysisProgress);

  this.masterformatCode = null;
  this.sequence = null;
  this.name = null;
  this.description = null;
  this.unitOfMeasure = null;
  this.unitCost = null;
  this.quantity = null;
  this.totalCost = null;
  this.bimQuantity = null;
  this.reportedInstalled = null;
  this.installedQuantity = null;
  this.installedCost = null;
  this.analysisDate = null;
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "analysisDate");
  this.masterformatCode = masterformatCode;
  this.sequence = sequence;
  this.name = name;
  this.description = description;
  this.unitOfMeasure = unitOfMeasure;
  this.unitCost = unitCost;
  this.quantity = quantity;
  this.totalCost = totalCost;
  this.bimQuantity = bimQuantity;
  this.reportedInstalled = reportedInstalled;
  this.installedQuantity = installedQuantity;
  this.installedCost = installedCost; // @ts-ignore

  this.analysisDate = analysisDate;
};



/***/ }),

/***/ 6041:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiProjectMasterformatProgress)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4474);
/* harmony import */ var _api_masterformat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5648);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var ApiProjectMasterformatProgress = function ApiProjectMasterformatProgress(masterformat, percentComplete, scanDate) {
  _classCallCheck(this, ApiProjectMasterformatProgress);

  this.masterformat = null;
  this.percentComplete = null;
  this.scanDate = null;
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "scanDate");

  if (masterformat) {
    this.masterformat = new _api_masterformat__WEBPACK_IMPORTED_MODULE_1__.default(masterformat.version, masterformat.code);
  } else {
    this.masterformat = null;
  }

  if (percentComplete === 0) {
    this.percentComplete = percentComplete;
  } else {
    this.percentComplete = percentComplete || null;
  } // @ts-ignore


  this.scanDate = scanDate;
};



/***/ }),

/***/ 941:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiProjectPurposeType": () => (/* binding */ ApiProjectPurposeType),
/* harmony export */   "ApiFloorPurposeType": () => (/* binding */ ApiFloorPurposeType),
/* harmony export */   "ApiScanDatasetPurposeType": () => (/* binding */ ApiScanDatasetPurposeType),
/* harmony export */   "ApiPhotoAreaPurposeType": () => (/* binding */ ApiPhotoAreaPurposeType),
/* harmony export */   "isApiPurposeType": () => (/* binding */ isApiPurposeType),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ApiProjectPurposeType;

(function (ApiProjectPurposeType) {
  ApiProjectPurposeType["OTHER"] = "OTHER";
  ApiProjectPurposeType["RAW_PROJECT_BIM"] = "RAW_PROJECT_BIM";
  ApiProjectPurposeType["PROJECT_FOLDER_ZIP"] = "PROJECT_FOLDER_ZIP";
})(ApiProjectPurposeType || (ApiProjectPurposeType = {}));

var ApiFloorPurposeType;

(function (ApiFloorPurposeType) {
  ApiFloorPurposeType["BIM_IFC"] = "BIM_IFC";
  ApiFloorPurposeType["BIM_NWD"] = "BIM_NWD";
  ApiFloorPurposeType["GRID_IFC"] = "GRID_IFC";
  ApiFloorPurposeType["BIM_MESH_GLB"] = "BIM_MESH_GLB";
  ApiFloorPurposeType["BIM_MESH_OBJ"] = "BIM_MESH_OBJ";
  ApiFloorPurposeType["BIM_TEXTURE_MTL"] = "BIM_TEXTURE_MTL";
  ApiFloorPurposeType["VIEWER_BIM_MESH_OBJ"] = "VIEWER_BIM_MESH_OBJ";
  ApiFloorPurposeType["BIM_MINIMAP"] = "BIM_MINIMAP";
  ApiFloorPurposeType["PLANNED_CLOUD_ZIP"] = "PLANNED_CLOUD_ZIP";
  ApiFloorPurposeType["SVF"] = "SVF";
})(ApiFloorPurposeType || (ApiFloorPurposeType = {}));

var ApiScanDatasetPurposeType;

(function (ApiScanDatasetPurposeType) {
  ApiScanDatasetPurposeType["RAW_SCAN"] = "RAW_SCAN";
  ApiScanDatasetPurposeType["SCANNER_PATH"] = "SCANNER_PATH";
  ApiScanDatasetPurposeType["FLOOR_FLATNESS_TOPO_MAP"] = "FLOOR_FLATNESS_TOPO_MAP";
  ApiScanDatasetPurposeType["BUILT_NOT_BUILT_BIM_IFC"] = "BUILT_NOT_BUILT_BIM_IFC";
  ApiScanDatasetPurposeType["NEEDS_FURTHER_ANALYSIS"] = "NEEDS_FURTHER_ANALYSIS";
  ApiScanDatasetPurposeType["PREPROCESSED_SCAN"] = "PREPROCESSED_SCAN";
  ApiScanDatasetPurposeType["INCLUDED_BIM_IFC"] = "INCLUDED_BIM_IFC";
  ApiScanDatasetPurposeType["POTREE"] = "POTREE";
  ApiScanDatasetPurposeType["DOWNSAMPLED_SCAN"] = "DOWNSAMPLED_SCAN";
  ApiScanDatasetPurposeType["ELEMENT_SNAPSHOT"] = "ELEMENT_SNAPSHOT";
  ApiScanDatasetPurposeType["SITE_CUBE_PHOTO"] = "SITE_CUBE_PHOTO";
})(ApiScanDatasetPurposeType || (ApiScanDatasetPurposeType = {}));

var ApiPhotoAreaPurposeType;

(function (ApiPhotoAreaPurposeType) {
  ApiPhotoAreaPurposeType["MINIMAP"] = "MINIMAP";
  ApiPhotoAreaPurposeType["THREE_SIXTY_PHOTO"] = "THREE_SIXTY_PHOTO";
})(ApiPhotoAreaPurposeType || (ApiPhotoAreaPurposeType = {}));

var ApiPurposeType = {
  RAW_SCAN: ApiScanDatasetPurposeType.RAW_SCAN,
  SCANNER_PATH: ApiScanDatasetPurposeType.SCANNER_PATH,
  FLOOR_FLATNESS_TOPO_MAP: ApiScanDatasetPurposeType.FLOOR_FLATNESS_TOPO_MAP,
  BUILT_NOT_BUILT_BIM_IFC: ApiScanDatasetPurposeType.BUILT_NOT_BUILT_BIM_IFC,
  NEEDS_FURTHER_ANALYSIS: ApiScanDatasetPurposeType.NEEDS_FURTHER_ANALYSIS,
  PREPROCESSED_SCAN: ApiScanDatasetPurposeType.PREPROCESSED_SCAN,
  INCLUDED_BIM_IFC: ApiScanDatasetPurposeType.INCLUDED_BIM_IFC,
  POTREE: ApiScanDatasetPurposeType.POTREE,
  DOWNSAMPLED_SCAN: ApiScanDatasetPurposeType.DOWNSAMPLED_SCAN,
  ELEMENT_SNAPSHOT: ApiScanDatasetPurposeType.ELEMENT_SNAPSHOT,
  SITE_CUBE_PHOTO: ApiScanDatasetPurposeType.SITE_CUBE_PHOTO,
  BIM_IFC: ApiFloorPurposeType.BIM_IFC,
  BIM_NWD: ApiFloorPurposeType.BIM_NWD,
  GRID_IFC: ApiFloorPurposeType.GRID_IFC,
  BIM_MESH_GLB: ApiFloorPurposeType.BIM_MESH_GLB,
  BIM_MESH_OBJ: ApiFloorPurposeType.BIM_MESH_OBJ,
  BIM_TEXTURE_MTL: ApiFloorPurposeType.BIM_TEXTURE_MTL,
  VIEWER_BIM_MESH_OBJ: ApiFloorPurposeType.VIEWER_BIM_MESH_OBJ,
  PLANNED_CLOUD_ZIP: ApiFloorPurposeType.PLANNED_CLOUD_ZIP,
  SVF: ApiFloorPurposeType.SVF,
  OTHER: ApiProjectPurposeType.OTHER,
  RAW_PROJECT_BIM: ApiProjectPurposeType.RAW_PROJECT_BIM,
  PROJECT_FOLDER_ZIP: ApiProjectPurposeType.PROJECT_FOLDER_ZIP,
  MINIMAP: ApiPhotoAreaPurposeType.MINIMAP,
  THREE_SIXTY_PHOTO: ApiPhotoAreaPurposeType.THREE_SIXTY_PHOTO
};
var isApiPurposeType = function isApiPurposeType(type) {
  return Object.values(ApiPurposeType).includes(type);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiPurposeType);

/***/ }),

/***/ 3063:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiScanDataset)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4474);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1257);
/* harmony import */ var _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1700);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var ApiScanDataset = function ApiScanDataset(_ref) {
  var id = _ref.id,
      firebaseId = _ref.firebaseId,
      firebaseFloorId = _ref.firebaseFloorId,
      scanNumber = _ref.scanNumber,
      dataPresences = _ref.dataPresences,
      notes = _ref.notes,
      name = _ref.name,
      coarseAlignmentMatrix = _ref.coarseAlignmentMatrix,
      fineAlignmentMatrix = _ref.fineAlignmentMatrix,
      scanDate = _ref.scanDate;

  _classCallCheck(this, ApiScanDataset);

  this.id = void 0;
  this.firebaseId = void 0;
  this.firebaseFloorId = void 0;
  this.scanNumber = void 0;
  this.coarseAlignmentMatrix = null;
  this.fineAlignmentMatrix = null;
  this.dataPresences = void 0;
  this.notes = null;
  this.name = null;
  this.scanDate = null;
  (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_1__.default)(this, "scanDate");
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__.default)(this, {
    id: id,
    firebaseId: firebaseId,
    firebaseFloorId: firebaseFloorId,
    scanNumber: scanNumber
  });
  var coarseAlignmentMatrixVal, fineAlignmentMatrixVal;
  Object.defineProperties(this, {
    coarseAlignmentMatrix: {
      get: function get() {
        return coarseAlignmentMatrixVal;
      },
      set: function set(val) {
        if (typeof val === "string") {
          coarseAlignmentMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix4ToApiMatrix(_converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromStringToMatrix4(val));
        } else if (val instanceof three__WEBPACK_IMPORTED_MODULE_0__.Matrix4) {
          coarseAlignmentMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix4ToApiMatrix(val);
        } else {
          coarseAlignmentMatrixVal = val;
        }
      },
      enumerable: true
    },
    fineAlignmentMatrix: {
      get: function get() {
        return fineAlignmentMatrixVal;
      },
      set: function set(val) {
        if (typeof val === "string") {
          fineAlignmentMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix4ToApiMatrix(_converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromStringToMatrix4(val));
        } else if (val instanceof three__WEBPACK_IMPORTED_MODULE_0__.Matrix4) {
          fineAlignmentMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix4ToApiMatrix(val);
        } else {
          fineAlignmentMatrixVal = val;
        }
      },
      enumerable: true
    }
  }); // @ts-ignore

  this.coarseAlignmentMatrix = coarseAlignmentMatrix || null; // @ts-ignore

  this.fineAlignmentMatrix = fineAlignmentMatrix || null;

  if (dataPresences) {
    this.dataPresences = dataPresences;
  }

  this.notes = notes || null;
  this.name = name || null; // @ts-ignore

  this.scanDate = scanDate;
};



/***/ }),

/***/ 6513:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeprecatedApiPipeline)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeprecatedApiPipeline = function DeprecatedApiPipeline() {
  _classCallCheck(this, DeprecatedApiPipeline);

  this.workflowName = void 0;
  this.startTime = void 0;
  this.status = void 0;
};



/***/ }),

/***/ 8649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Deviation": () => (/* binding */ Deviation),
/* harmony export */   "isDeviationScanResult": () => (/* binding */ isDeviationScanResult),
/* harmony export */   "default": () => (/* binding */ DetailedElement)
/* harmony export */ });
/* harmony import */ var _enums_deviation_status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8369);
/* harmony import */ var _enums_scan_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5632);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Deviation = function Deviation() {
  _classCallCheck(this, Deviation);

  this.deviationVectorMeters = void 0;
  this.deviationMeters = void 0;
  this.status = void 0;
  this.deviationVectorMeters = {
    x: 0.0,
    y: 0.0,
    z: 0.0
  };
  this.deviationMeters = 0;
  this.status = _enums_deviation_status__WEBPACK_IMPORTED_MODULE_0__.default.DETECTED;
};
var isDeviationScanResult = function isDeviationScanResult(scanResult) {
  return (scanResult === null || scanResult === void 0 ? void 0 : scanResult.scanLabel) === _enums_scan_label__WEBPACK_IMPORTED_MODULE_1__.DEVIATED;
};

var DetailedElement = function DetailedElement(ifcType, globalId, scanResult) {
  _classCallCheck(this, DetailedElement);

  this.ifcType = void 0;
  this.globalId = void 0;
  this.scanResult = void 0;
  this.name = void 0;
  this.itemId = void 0;
  this.discipline = void 0;
  this.uniformat = void 0;
  this.primaryUnitOfMeasurement = void 0;
  this.primaryMeasurement = void 0;
  this.loaded = void 0;
  this.ifcType = ifcType;
  this.globalId = globalId;
  this.scanResult = scanResult;
};



/***/ }),

/***/ 3910:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PhotoArea)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1257);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var PhotoArea = function PhotoArea() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      name = _ref.name,
      id = _ref.id,
      files = _ref.files,
      firebaseProjectId = _ref.firebaseProjectId,
      structionsiteProjectUrl = _ref.structionsiteProjectUrl;

  _classCallCheck(this, PhotoArea);

  this.id = void 0;
  this.firebaseProjectId = void 0;
  this.name = void 0;
  this.structionsiteProjectUrl = void 0;
  this.files = void 0;
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, {
    id: id,
    firebaseProjectId: firebaseProjectId
  });
  this.name = name;
  this.structionsiteProjectUrl = structionsiteProjectUrl; // @ts-ignore

  this.files = files || {};
};



/***/ }),

/***/ 1442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PhotoLocation)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1257);
/* harmony import */ var _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1700);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var PhotoLocation = function PhotoLocation() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      id = _ref.id,
      photoAreaId = _ref.photoAreaId,
      photoSessionId = _ref.photoSessionId,
      fileId = _ref.fileId,
      minimapCoordinates = _ref.minimapCoordinates,
      minimapBearing = _ref.minimapBearing,
      projectionType = _ref.projectionType,
      cameraWorldMatrix = _ref.cameraWorldMatrix,
      yawOffset = _ref.yawOffset;

  _classCallCheck(this, PhotoLocation);

  this.id = void 0;
  this.photoAreaId = void 0;
  this.photoSessionId = void 0;
  this.fileId = void 0;
  this.minimapCoordinates = void 0;
  this.minimapBearing = void 0;
  this.projectionType = void 0;
  this.cameraWorldMatrix = void 0;
  this.yawOffset = 0;
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__.default)(this, {
    id: id,
    photoAreaId: photoAreaId,
    photoSessionId: photoSessionId,
    fileId: fileId
  });

  if (minimapCoordinates) {
    this.minimapCoordinates = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(minimapCoordinates.x, minimapCoordinates.y);
  }

  this.minimapBearing = minimapBearing;
  var cameraWorldMatrixVal;
  Object.defineProperties(this, {
    cameraWorldMatrix: {
      get: function get() {
        return cameraWorldMatrixVal;
      },
      set: function set(val) {
        if (typeof val === "string") {
          cameraWorldMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromStringToMatrix4(val);
        } else if (val instanceof three__WEBPACK_IMPORTED_MODULE_0__.Matrix4) {
          cameraWorldMatrixVal = val;
        } else {
          cameraWorldMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromApiMatrixToMatrix4(val);
        }
      },
      enumerable: true
    }
  }); // @ts-ignore

  this.cameraWorldMatrix = cameraWorldMatrix;
  this.projectionType = projectionType;
  this.yawOffset = yawOffset;
};

PhotoLocation.fromApi = function (apiPhotoLocation) {
  return new PhotoLocation(_objectSpread(_objectSpread({}, underscore__WEBPACK_IMPORTED_MODULE_1___default().omit(apiPhotoLocation, "minimapX", "minimapY", "file")), {}, {
    fileId: apiPhotoLocation.file.id,
    minimapCoordinates: {
      x: apiPhotoLocation.minimapX,
      y: apiPhotoLocation.minimapY
    }
  }));
};



/***/ }),

/***/ 1542:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PhotoSession)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1257);
/* harmony import */ var _mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9036);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var PhotoSession = function PhotoSession() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      id = _ref.id,
      photoAreaId = _ref.photoAreaId,
      sessionDate = _ref.sessionDate;

  _classCallCheck(this, PhotoSession);

  this.id = void 0;
  this.photoAreaId = void 0;
  this.sessionDate = void 0;
  (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__.default)(this, {
    id: id,
    photoAreaId: photoAreaId
  });
  (0,_mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "sessionDate"); // @ts-ignore

  this.sessionDate = sessionDate;
};



/***/ }),

/***/ 7961:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProgressCategory)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressCategory = function ProgressCategory() {
  _classCallCheck(this, ProgressCategory);

  this.uniformatId = void 0;
  this.total = void 0;
  this.built = void 0;
  this.label = void 0;
  this.subCategories = void 0;
};



/***/ }),

/***/ 872:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProgressReportForScanDataset)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressReportForScanDataset = function ProgressReportForScanDataset() {
  _classCallCheck(this, ProgressReportForScanDataset);

  this.id = void 0;
  this.firebaseId = void 0;
  this.scanNumber = void 0;
  this.progressCategories = void 0;
};



/***/ }),

/***/ 4532:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectCostAnalysisProgress)
/* harmony export */ });
/* harmony import */ var _mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9036);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ProjectCostAnalysisProgress = function ProjectCostAnalysisProgress() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      masterformatCode = _ref.masterformatCode,
      sequence = _ref.sequence,
      name = _ref.name,
      description = _ref.description,
      unitOfMeasure = _ref.unitOfMeasure,
      unitCost = _ref.unitCost,
      quantity = _ref.quantity,
      totalCost = _ref.totalCost,
      bimQuantity = _ref.bimQuantity,
      reportedInstalled = _ref.reportedInstalled,
      installedQuantity = _ref.installedQuantity,
      installedCost = _ref.installedCost,
      analysisDate = _ref.analysisDate;

  _classCallCheck(this, ProjectCostAnalysisProgress);

  this.masterformatCode = null;
  this.sequence = null;
  this.name = null;
  this.description = null;
  this.unitOfMeasure = null;
  this.unitCost = null;
  this.quantity = null;
  this.totalCost = null;
  this.bimQuantity = null;
  this.reportedInstalled = null;
  this.installedQuantity = null;
  this.installedCost = null;
  this.analysisDate = null;
  (0,_mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "analysisDate");
  this.masterformatCode = masterformatCode;
  this.sequence = sequence;
  this.name = name;
  this.description = description;
  this.unitOfMeasure = unitOfMeasure;
  this.unitCost = unitCost;
  this.quantity = quantity;
  this.totalCost = totalCost;
  this.bimQuantity = bimQuantity;
  this.reportedInstalled = reportedInstalled;
  this.installedQuantity = installedQuantity;
  this.installedCost = installedCost; // @ts-ignore

  this.analysisDate = analysisDate;
};



/***/ }),

/***/ 1725:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectMasterformatProgress)
/* harmony export */ });
/* harmony import */ var _mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9036);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ProjectMasterformatProgress = function ProjectMasterformatProgress(masterformat, percentComplete, scanDate) {
  _classCallCheck(this, ProjectMasterformatProgress);

  this.masterformat = null;
  this.percentComplete = null;
  this.scanDate = null;
  (0,_mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "scanDate");
  this.masterformat = masterformat || null;
  this.percentComplete = percentComplete || null;
  this.scanDate = scanDate;
};



/***/ }),

/***/ 2496:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeSeriesTsvAnalysisTypes": () => (/* binding */ TimeSeriesTsvAnalysisTypes)
/* harmony export */ });
var TimeSeriesTsvAnalysisTypes = {
  ANALYSIS_4D: {
    uploadButtonContent: "Upload 4d Analysis.tsv",
    uploadButtonId: "scanned-project-masterformat-progress-uploader"
  },
  SCHEDULE_4D: {
    uploadButtonContent: "Upload 4d Schedule.tsv",
    uploadButtonId: "scheduled-project-masterformat-progress-uploader"
  },
  ANALYSIS_5D: {
    uploadButtonContent: "Upload 5d Analysis.tsv",
    uploadButtonId: "analysis-for-5d"
  }
};

/***/ }),

/***/ 8072:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ 8369:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DETECTED": () => (/* binding */ DETECTED),
/* harmony export */   "DISMISSED": () => (/* binding */ DISMISSED),
/* harmony export */   "INCLUDED": () => (/* binding */ INCLUDED),
/* harmony export */   "FIXED": () => (/* binding */ FIXED),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var DeviationStatus;

(function (DeviationStatus) {
  DeviationStatus["DETECTED"] = "DETECTED";
  DeviationStatus["DISMISSED"] = "DISMISSED";
  DeviationStatus["INCLUDED"] = "INCLUDED";
  DeviationStatus["FIXED"] = "FIXED";
})(DeviationStatus || (DeviationStatus = {}));

var DETECTED = DeviationStatus.DETECTED;
var DISMISSED = DeviationStatus.DISMISSED;
var INCLUDED = DeviationStatus.INCLUDED;
var FIXED = DeviationStatus.FIXED;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeviationStatus);

/***/ }),

/***/ 3164:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ELEMENTS_STATUSES_UPDATED": () => (/* binding */ ELEMENTS_STATUSES_UPDATED),
/* harmony export */   "API_FAILURE": () => (/* binding */ API_FAILURE),
/* harmony export */   "UPLOAD_FAILED": () => (/* binding */ UPLOAD_FAILED)
/* harmony export */ });
var ELEMENTS_STATUSES_UPDATED = "elements_statuses_updated";
var API_FAILURE = "api_failure";
var UPLOAD_FAILED = "upload_failed";

/***/ }),

/***/ 6402:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "failure": () => (/* binding */ failure),
/* harmony export */   "success": () => (/* binding */ success),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var NotificationLevel;

(function (NotificationLevel) {
  NotificationLevel["failure"] = "failure";
  NotificationLevel["success"] = "success";
})(NotificationLevel || (NotificationLevel = {}));

var failure = NotificationLevel.failure;
var success = NotificationLevel.success;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificationLevel);

/***/ }),

/***/ 3100:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ACCEPT_INVITATION": () => (/* binding */ ACCEPT_INVITATION),
/* harmony export */   "ORGANIZATION": () => (/* binding */ ORGANIZATION),
/* harmony export */   "ORGANIZATION_LIST": () => (/* binding */ ORGANIZATION_LIST),
/* harmony export */   "LOGIN": () => (/* binding */ LOGIN),
/* harmony export */   "NOT_FOUND": () => (/* binding */ NOT_FOUND),
/* harmony export */   "PROCORE_AUTHENTICATED": () => (/* binding */ PROCORE_AUTHENTICATED),
/* harmony export */   "PROGRESS_REPORT": () => (/* binding */ PROGRESS_REPORT),
/* harmony export */   "PROJECT": () => (/* binding */ PROJECT),
/* harmony export */   "PROJECT_REPORTS": () => (/* binding */ PROJECT_REPORTS),
/* harmony export */   "PROJECT_UPLOADS": () => (/* binding */ PROJECT_UPLOADS),
/* harmony export */   "PROJECT_VIEWER": () => (/* binding */ PROJECT_VIEWER),
/* harmony export */   "QUALITY_CONTROL_REPORT": () => (/* binding */ QUALITY_CONTROL_REPORT),
/* harmony export */   "PHOTOS": () => (/* binding */ PHOTOS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var PageNames;

(function (PageNames) {
  PageNames["INTEGRATION_TEST_LOGIN"] = "INTEGRATION_TEST_LOGIN";
  PageNames["ACCEPT_INVITATION"] = "ACCEPT_INVITATION";
  PageNames["ORGANIZATION"] = "ORGANIZATION";
  PageNames["ORGANIZATION_LIST"] = "ORGANIZATION_LIST";
  PageNames["LOGIN"] = "LOGIN";
  PageNames["NOT_FOUND"] = "NOT_FOUND";
  PageNames["PROCORE_AUTHENTICATED"] = "PROCORE_AUTHENTICATED";
  PageNames["PROGRESS_REPORT"] = "PROGRESS_REPORT";
  PageNames["PROJECT"] = "PROJECT";
  PageNames["PROJECT_REPORTS"] = "PROJECT_REPORTS";
  PageNames["PROJECT_UPLOADS"] = "PROJECT_UPLOADS";
  PageNames["PROJECT_VIEWER"] = "PROJECT_VIEWER";
  PageNames["QUALITY_CONTROL_REPORT"] = "QUALITY_CONTROL_REPORT";
  PageNames["PHOTOS"] = "PHOTOS";
})(PageNames || (PageNames = {}));

var ACCEPT_INVITATION = PageNames.ACCEPT_INVITATION;
var ORGANIZATION = PageNames.ORGANIZATION;
var ORGANIZATION_LIST = PageNames.ORGANIZATION_LIST;
var LOGIN = PageNames.LOGIN;
var NOT_FOUND = PageNames.NOT_FOUND;
var PROCORE_AUTHENTICATED = PageNames.PROCORE_AUTHENTICATED;
var PROGRESS_REPORT = PageNames.PROGRESS_REPORT;
var PROJECT = PageNames.PROJECT;
var PROJECT_REPORTS = PageNames.PROJECT_REPORTS;
var PROJECT_UPLOADS = PageNames.PROJECT_UPLOADS;
var PROJECT_VIEWER = PageNames.PROJECT_VIEWER;
var QUALITY_CONTROL_REPORT = PageNames.QUALITY_CONTROL_REPORT;
var PHOTOS = PageNames.PHOTOS;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageNames);

/***/ }),

/***/ 7932:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var PhotoProjectionType;

(function (PhotoProjectionType) {
  PhotoProjectionType["CUBE"] = "CUBE";
  PhotoProjectionType["EQUIRECTANGULAR"] = "EQUIRECTANGULAR";
  PhotoProjectionType["PIN_HOLE"] = "PIN_HOLE";
})(PhotoProjectionType || (PhotoProjectionType = {}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhotoProjectionType);

/***/ }),

/***/ 8768:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pipelines": () => (/* binding */ Pipelines),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Pipelines;

(function (Pipelines) {
  Pipelines["INGEST_PROJECT_FILE"] = "ingest-project-file";
})(Pipelines || (Pipelines = {}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pipelines);

/***/ }),

/***/ 3011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectPurposeType": () => (/* binding */ ProjectPurposeType),
/* harmony export */   "FloorPurposeType": () => (/* binding */ FloorPurposeType),
/* harmony export */   "ScanDatasetPurposeType": () => (/* binding */ ScanDatasetPurposeType),
/* harmony export */   "PhotoAreaPurposeType": () => (/* binding */ PhotoAreaPurposeType),
/* harmony export */   "isPurposeType": () => (/* binding */ isPurposeType),
/* harmony export */   "OTHER": () => (/* binding */ OTHER),
/* harmony export */   "RAW_PROJECT_BIM": () => (/* binding */ RAW_PROJECT_BIM),
/* harmony export */   "PROJECT_FOLDER_ZIP": () => (/* binding */ PROJECT_FOLDER_ZIP),
/* harmony export */   "RAW_SCAN": () => (/* binding */ RAW_SCAN),
/* harmony export */   "SCANNER_PATH": () => (/* binding */ SCANNER_PATH),
/* harmony export */   "FLOOR_FLATNESS_TOPO_MAP": () => (/* binding */ FLOOR_FLATNESS_TOPO_MAP),
/* harmony export */   "BUILT_NOT_BUILT_BIM_IFC": () => (/* binding */ BUILT_NOT_BUILT_BIM_IFC),
/* harmony export */   "NEEDS_FURTHER_ANALYSIS": () => (/* binding */ NEEDS_FURTHER_ANALYSIS),
/* harmony export */   "PREPROCESSED_SCAN": () => (/* binding */ PREPROCESSED_SCAN),
/* harmony export */   "INCLUDED_BIM_IFC": () => (/* binding */ INCLUDED_BIM_IFC),
/* harmony export */   "POTREE": () => (/* binding */ POTREE),
/* harmony export */   "BIM_IFC": () => (/* binding */ BIM_IFC),
/* harmony export */   "BIM_NWD": () => (/* binding */ BIM_NWD),
/* harmony export */   "GRID_IFC": () => (/* binding */ GRID_IFC),
/* harmony export */   "BIM_MESH_GLB": () => (/* binding */ BIM_MESH_GLB),
/* harmony export */   "BIM_MESH_OBJ": () => (/* binding */ BIM_MESH_OBJ),
/* harmony export */   "BIM_TEXTURE_MTL": () => (/* binding */ BIM_TEXTURE_MTL),
/* harmony export */   "VIEWER_BIM_MESH_OBJ": () => (/* binding */ VIEWER_BIM_MESH_OBJ),
/* harmony export */   "PLANNED_CLOUD_ZIP": () => (/* binding */ PLANNED_CLOUD_ZIP),
/* harmony export */   "SVF": () => (/* binding */ SVF),
/* harmony export */   "MINIMAP": () => (/* binding */ MINIMAP),
/* harmony export */   "THREE_SIXTY_PHOTO": () => (/* binding */ THREE_SIXTY_PHOTO),
/* harmony export */   "uploadHistoryPurposeTypes": () => (/* binding */ uploadHistoryPurposeTypes),
/* harmony export */   "floorPurposeTypes": () => (/* binding */ floorPurposeTypes),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PurposeTypeMap);

/***/ }),

/***/ 3714:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var RunningProcessStatus;

(function (RunningProcessStatus) {
  RunningProcessStatus["RUNNING"] = "RUNNING";
  RunningProcessStatus["COMPLETED"] = "COMPLETED";
})(RunningProcessStatus || (RunningProcessStatus = {}));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RunningProcessStatus);

/***/ }),

/***/ 5632:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IN_PLACE": () => (/* binding */ IN_PLACE),
/* harmony export */   "NOT_BUILT": () => (/* binding */ NOT_BUILT),
/* harmony export */   "INSUFFICIENT_DATA": () => (/* binding */ INSUFFICIENT_DATA),
/* harmony export */   "DEVIATED": () => (/* binding */ DEVIATED),
/* harmony export */   "DEVIATED_WITHIN_TOLERANCE": () => (/* binding */ DEVIATED_WITHIN_TOLERANCE),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var IN_PLACE = "IN_PLACE";
var NOT_BUILT = "NOT_BUILT";
var INSUFFICIENT_DATA = "INSUFFICIENT_DATA";
var DEVIATED = "DEVIATED";
var DEVIATED_WITHIN_TOLERANCE = "DEVIATED_WITHIN_TOLERANCE";
var ScanLabel = {
  DEVIATED: DEVIATED,
  DEVIATED_WITHIN_TOLERANCE: DEVIATED_WITHIN_TOLERANCE,
  IN_PLACE: IN_PLACE,
  INSUFFICIENT_DATA: INSUFFICIENT_DATA,
  NOT_BUILT: NOT_BUILT
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScanLabel);

/***/ }),

/***/ 370:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IMPERIAL": () => (/* binding */ IMPERIAL),
/* harmony export */   "METRIC": () => (/* binding */ METRIC),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var SystemOfMeasurement;

(function (SystemOfMeasurement) {
  SystemOfMeasurement["IMPERIAL"] = "IMPERIAL";
  SystemOfMeasurement["METRIC"] = "METRIC";
})(SystemOfMeasurement || (SystemOfMeasurement = {}));

var IMPERIAL = SystemOfMeasurement.IMPERIAL;
var METRIC = SystemOfMeasurement.METRIC;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SystemOfMeasurement);

/***/ }),

/***/ 6500:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NONE": () => (/* binding */ NONE),
/* harmony export */   "LOADING": () => (/* binding */ LOADING),
/* harmony export */   "ERROR": () => (/* binding */ ERROR),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var UploaderStatus;

(function (UploaderStatus) {
  UploaderStatus["NONE"] = "none";
  UploaderStatus["LOADING"] = "loading";
  UploaderStatus["ERROR"] = "error";
})(UploaderStatus || (UploaderStatus = {}));

var NONE = UploaderStatus.NONE;
var LOADING = UploaderStatus.LOADING;
var ERROR = UploaderStatus.ERROR;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UploaderStatus);

/***/ }),

/***/ 2503:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GATEWAY_JWT": () => (/* binding */ GATEWAY_JWT),
/* harmony export */   "BASIC": () => (/* binding */ BASIC),
/* harmony export */   "FIREBASE": () => (/* binding */ FIREBASE),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var UserAuthType;

(function (UserAuthType) {
  UserAuthType["GATEWAY_JWT"] = "GATEWAY_JWT";
  UserAuthType["BASIC"] = "BASIC";
  UserAuthType["FIREBASE"] = "FIREBASE";
})(UserAuthType || (UserAuthType = {}));

var GATEWAY_JWT = UserAuthType.GATEWAY_JWT;
var BASIC = UserAuthType.BASIC;
var FIREBASE = UserAuthType.FIREBASE;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserAuthType);

/***/ }),

/***/ 3501:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SUPERADMIN": () => (/* binding */ SUPERADMIN),
/* harmony export */   "USER": () => (/* binding */ USER),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var UserRole;

(function (UserRole) {
  UserRole["SUPERADMIN"] = "SUPERADMIN";
  UserRole["USER"] = "USER";
})(UserRole || (UserRole = {}));

var SUPERADMIN = UserRole.SUPERADMIN;
var USER = UserRole.USER;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserRole);

/***/ }),

/***/ 3972:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ response_error)
});

;// CONCATENATED MODULE: external "extendable-error-class"
const external_extendable_error_class_namespaceObject = require("extendable-error-class");;
var external_extendable_error_class_default = /*#__PURE__*/__webpack_require__.n(external_extendable_error_class_namespaceObject);
;// CONCATENATED MODULE: ./source/models/response_error.ts
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var ResponseError = /*#__PURE__*/function (_ExtendableError) {
  _inherits(ResponseError, _ExtendableError);

  var _super = _createSuper(ResponseError);

  function ResponseError(message, verboseMessage, response, responseBody) {
    var _this;

    _classCallCheck(this, ResponseError);

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

/***/ }),

/***/ 7866:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_response_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3972);
/* harmony import */ var _resources_response_statuses_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(297);
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1127);




var checkFetchStatus = function checkFetchStatus(response) {
  var requestPath = response.url.split(_http__WEBPACK_IMPORTED_MODULE_2__.default.baseUrl()).join("..."); // split and join to replace text

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
      var statusMessage = _resources_response_statuses_json__WEBPACK_IMPORTED_MODULE_1__[response.status];
      var verboseMessage = "".concat(response.status, " ").concat(statusMessage, ": '").concat(message, "' at `").concat(requestPath, "`");
      var error = new _models_response_error__WEBPACK_IMPORTED_MODULE_0__.default(message, verboseMessage, response, errorBody);
      console.error(error);
      throw error;
    });
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkFetchStatus);

/***/ }),

/***/ 9137:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GatewayUser": () => (/* binding */ GatewayUser),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2503);
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
    case _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_0__.GATEWAY_JWT:
      {
        return {
          Authorization: "Bearer ".concat(user.gatewayUser.idToken)
        };
      }

    case _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_0__.BASIC:
      {
        return {
          Authorization: "Basic ".concat(Buffer.from("".concat(user.username, ":").concat(user.password)).toString("base64"))
        };
      }

    case _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_0__.FIREBASE:
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAuthorizationHeaders);

/***/ }),

/***/ 1127:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Http)
/* harmony export */ });
/* harmony import */ var _get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9137);
/* harmony import */ var _request_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(104);
/* harmony import */ var _reduce_user_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3226);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5663);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






// const fetch = fetch || node_fetch;
var Http = /*#__PURE__*/function () {
  function Http() {
    _classCallCheck(this, Http);
  }

  _createClass(Http, null, [{
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (url, data) {
      if (_config__WEBPACK_IMPORTED_MODULE_2___default().getConfiguration().logFetch) {
        console.log("Calling fetch with:", url, data);
      }

      return fetch(url, data);
    })
  }, {
    key: "get",
    value: function get(url, user) {
      return Http.fetch(url, {
        method: "GET",
        headers: _objectSpread(_objectSpread({}, _request_headers__WEBPACK_IMPORTED_MODULE_1__.httpPostHeaders), (0,_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user))
      });
    }
  }, {
    key: "delete",
    value: function _delete(url, user) {
      return Http.fetch(url, {
        method: "DELETE",
        headers: _objectSpread(_objectSpread({}, _request_headers__WEBPACK_IMPORTED_MODULE_1__.httpPostHeaders), (0,_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user))
      });
    }
  }, {
    key: "post",
    value: function post(url, user, body) {
      return Http.fetch(url, {
        method: "POST",
        headers: _objectSpread(_objectSpread({}, _request_headers__WEBPACK_IMPORTED_MODULE_1__.httpPostHeaders), (0,_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user)),
        body: JSON.stringify(body)
      });
    }
  }, {
    key: "patch",
    value: function patch(url, user, body) {
      return Http.fetch(url, {
        method: "PATCH",
        headers: _objectSpread(_objectSpread({}, _request_headers__WEBPACK_IMPORTED_MODULE_1__.httpPostHeaders), (0,_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user)),
        body: JSON.stringify(body)
      });
    }
  }, {
    key: "addAuthToDownloadUrl",
    value: function addAuthToDownloadUrl(baseUrl, user) {
      if (user) {
        if ((0,_reduce_user_session__WEBPACK_IMPORTED_MODULE_3__.isGatewayUser)(user)) {
          return "".concat(baseUrl, "?auth=").concat(user.gatewayUser.idToken);
        } else if ((0,_reduce_user_session__WEBPACK_IMPORTED_MODULE_3__.isFirebaseUser)(user)) {
          return "".concat(baseUrl, "?firebaseAuth=").concat(user.firebaseUser.idToken);
        }
      } else {
        return baseUrl;
      }
    }
  }]);

  return Http;
}();

Http.baseUrl = function () {
  return _config__WEBPACK_IMPORTED_MODULE_2___default().getConfiguration().AVVIR_GATEWAY_URL;
};



/***/ }),

/***/ 2854:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _check_fetch_status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7866);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5663);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_2__);




var makeErrorsPrettyForFunction = function makeErrorsPrettyForFunction(actionName, action) {
  return function () {
    for (var _len = arguments.length, argumentList = new Array(_len), _key = 0; _key < _len; _key++) {
      argumentList[_key] = arguments[_key];
    }

    return action.apply(void 0, argumentList).then(_check_fetch_status__WEBPACK_IMPORTED_MODULE_1__.default)["catch"](function (error) {
      return _config__WEBPACK_IMPORTED_MODULE_2___default().sharedErrorHandler({
        error: error,
        action: actionName,
        arguments: argumentList
      });
    });
  };
};

var getFunctionNames = function getFunctionNames(clazz) {
  var builtinProperties = ["length", "constructor", "name", "prototype"]; // TODO it might make sense to check the type of each property

  return underscore__WEBPACK_IMPORTED_MODULE_0___default().without.apply((underscore__WEBPACK_IMPORTED_MODULE_0___default()), [Object.getOwnPropertyNames(clazz)].concat(builtinProperties));
};

var makeErrorsPretty = function makeErrorsPretty(apiClass) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    exclude: []
  };
  var functionNames = getFunctionNames(apiClass);

  underscore__WEBPACK_IMPORTED_MODULE_0___default().forEach(functionNames, function (functionName) {
    var isExcluded = options.exclude && options.exclude.includes(functionName);

    if (!isExcluded) {
      apiClass[functionName] = makeErrorsPrettyForFunction(functionName, apiClass[functionName]);
    }
  });

  return apiClass;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (makeErrorsPretty);

/***/ }),

/***/ 3226:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFirebaseUser": () => (/* binding */ isFirebaseUser),
/* harmony export */   "isGatewayUser": () => (/* binding */ isGatewayUser)
/* harmony export */ });
var isFirebaseUser = function isFirebaseUser(user) {
  return !!(user !== null && user !== void 0 && user.firebaseUser);
};
var isGatewayUser = function isGatewayUser(user) {
  return !!(user !== null && user !== void 0 && user.gatewayUser);
};

/***/ }),

/***/ 104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "httpPostHeaders": () => (/* binding */ httpPostHeaders),
/* harmony export */   "httpGetHeaders": () => (/* binding */ httpGetHeaders)
/* harmony export */ });
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

/***/ }),

/***/ 5899:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);


var serializeForm = function serializeForm(form) {
  return underscore__WEBPACK_IMPORTED_MODULE_0___default()(form).reduce(function (piecesSoFar, value, field) {
    piecesSoFar.push("".concat(encodeURIComponent(field), "=").concat(encodeURIComponent(value)));
    return piecesSoFar;
  }, []).join("&");
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (serializeForm);

/***/ }),

/***/ 5663:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const _ = __webpack_require__(2164);

let configuration = {logFetch: false};

const addEnvironmentVariablesToConfiguration = () => {
  _.forEach(configuration, (value, varName) => {
    if (process.env[varName] != null && process.env[varName] != '') {
      configuration[varName] = process.env[varName];
    }
  });
}

const useAcceptanceConfiguration = () => {
  configuration = {
    AVVIR_GATEWAY_URL: "https://acceptance-api.avvir.io",
    AVVIR_ENVIRONMENT: "acceptance"
  }
  addEnvironmentVariablesToConfiguration()
}

const useProductionConfiguration = () => {
  configuration = {
    AVVIR_GATEWAY_URL: "https://api.avvir.io",
    AVVIR_ENVIRONMENT: "production"
  }
  addEnvironmentVariablesToConfiguration()
}

const useLocalProductionConfiguration = () => {
  configuration = {
    AVVIR_GATEWAY_URL: "https://api.avvir.io",
    AVVIR_ENVIRONMENT: "local-production"
  }
  addEnvironmentVariablesToConfiguration()
}

const useLocalConfiguration = () => {
  addEnvironmentVariablesToConfiguration()
  configuration = {
    AVVIR_GATEWAY_URL: "http://localhost:8080",
    AVVIR_ENVIRONMENT: "local"
  }
}

const setConfigurationFromEnvironmentVariable = () => {
  if(process.env.AVVIR_ENVIRONMENT === 'acceptance'){
    useAcceptanceConfiguration()
  } else if(process.env.AVVIR_ENVIRONMENT === 'local-production'){
    useLocalProductionConfiguration()
  } else if(process.env.AVVIR_ENVIRONMENT === 'local'){
    useLocalConfiguration()
  } else {
    useProductionConfiguration()
  }
}


setConfigurationFromEnvironmentVariable()

const sharedErrorHandler = ({error}) => {
  throw error;
}

const getConfiguration = () => {
  return configuration
}

const Config = {useAcceptanceConfiguration, useProductionConfiguration, useLocalProductionConfiguration, useLocalConfiguration, getConfiguration, sharedErrorHandler}

module.exports = Config

/***/ }),

/***/ 297:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"100":"Continue","101":"Switching Protocol","102":"Processing (WebDAV)","103":"Early Hints","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status (WebDAV)","208":"Multi-Status (WebDAV)","226":"IM Used (HTTP Delta encoding)","300":"Multiple Choice","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","306":"unused","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Requested Range Not Satisfiable","417":"Expectation Failed","418":"I\'m a teapot","421":"Misdirected Request","422":"Unprocessable Entity (WebDAV)","423":"Locked (WebDAV)","424":"Failed Dependency (WebDAV)","425":"Too Early","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected (WebDAV)","510":"Not Extended","511":"Network Authentication Required","100_detailed":"This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.","101_detailed":"This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching to.","102_detailed":"This code indicates that the server has received and is processing the request, but no response is available yet.","103_detailed":"This status code is primarily intended to be used with the Link header to allow the user agent to start preloading resources while the server is still preparing a response.","200_detailed":"The request has succeeded. The meaning of a success varies depending on the HTTP method:\\n  GET: The resource has been fetched and is transmitted in the message body.\\n  HEAD: The entity headers are in the message body.\\n  PUT or POST: The resource describing the result of the action is transmitted in the message body.\\n  TRACE: The message body contains the request message as received by the server","201_detailed":"The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a POST request, or after some PUT requests.","202_detailed":"The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.","203_detailed":"This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.","204_detailed":"There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.","205_detailed":"This response code is sent after accomplishing request to tell user agent reset document view which sent this request.","206_detailed":"This response code is used because of range header sent by the client to separate download into multiple streams.","207_detailed":"A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.","208_detailed":"Used inside a DAV: propstat response element to avoid enumerating the internal members of multiple bindings to the same collection repeatedly.","226_detailed":"The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.","300_detailed":"The request has more than one possible response. The user-agent or user should choose one of them. There is no standardized way of choosing one of the responses.","301_detailed":"This response code means that the URI of the requested resource has been changed. Probably, the new URI would be given in the response.","302_detailed":"This response code means that the URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.","303_detailed":"The server sent this response to direct the client to get the requested resource at another URI with a GET request.","304_detailed":"This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.","305_detailed":"Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.","306_detailed":"This response code is no longer used, it is just reserved currently. It was used in a previous version of the HTTP 1.1 specification.","307_detailed":"The server sends this response to direct the client to get the requested resource at another URI with same method that was used in the prior request. This has the same semantics as the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: If a POST was used in the first request, a POST must be used in the second request.","308_detailed":"This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: If a POST was used in the first request, a POST must be used in the second request.","400_detailed":"This response means that server could not understand the request due to invalid syntax.","401_detailed":"Although the HTTP standard specifies \\"unauthorized\\", semantically this response means \\"unauthenticated\\". That is, the client must authenticate itself to get the requested response.","402_detailed":"This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.","403_detailed":"The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client\'s identity is known to the server.","404_detailed":"The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.","405_detailed":"The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.","406_detailed":"This response is sent when the web server, after performing server-driven content negotiation, doesn\'t find any content following the criteria given by the user agent.","407_detailed":"This is similar to 401 but authentication is needed to be done by a proxy.","408_detailed":"This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.","409_detailed":"This response is sent when a request conflicts with the current state of the server.","410_detailed":"This response would be sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for \\"limited-time, promotional services\\". APIs should not feel compelled to indicate resources that have been deleted with this status code.","411_detailed":"Server rejected the request because the Content-Length header field is not defined and the server requires it.","412_detailed":"The client has indicated preconditions in its headers which the server does not meet.","413_detailed":"Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.","414_detailed":"The URI requested by the client is longer than the server is willing to interpret.","415_detailed":"The media format of the requested data is not supported by the server, so the server is rejecting the request.","416_detailed":"The range specified by the Range header field in the request can\'t be fulfilled; it\'s possible that the range is outside the size of the target URI\'s data.","417_detailed":"This response code means the expectation indicated by the Expect request header field can\'t be met by the server.","418_detailed":"The server refuses the attempt to brew coffee with a teapot.","421_detailed":"The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.","422_detailed":"The request was well-formed but was unable to be followed due to semantic errors.","423_detailed":"The resource that is being accessed is locked.","424_detailed":"The request failed due to failure of a previous request.","425_detailed":"Indicates that the server is unwilling to risk processing a request that might be replayed.","426_detailed":"The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol(s).","428_detailed":"The origin server requires the request to be conditional. Intended to prevent the \'lost update\' problem, where a client GETs a resource\'s state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.","429_detailed":"The user has sent too many requests in a given amount of time (\\"rate limiting\\").","431_detailed":"The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.","451_detailed":"The user requests an illegal resource, such as a web page censored by a government.","500_detailed":"The server has encountered a situation it doesn\'t know how to handle.","501_detailed":"The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.","502_detailed":"This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.","503_detailed":"The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.","504_detailed":"This error response is given when the server is acting as a gateway and cannot get a response in time.","505_detailed":"The HTTP version used in the request is not supported by the server.","506_detailed":"The server has an internal configuration error: transparent content negotiation for the request results in a circular reference.","507_detailed":"The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.","508_detailed":"The server detected an infinite loop while processing the request.","510_detailed":"Further extensions to the request are required for the server to fulfill it.","511_detailed":"The 511 status code indicates that the client needs to authenticate to gain network access."}');

/***/ }),

/***/ 5422:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./api/auth_api.ts": 7323,
	"./api/element_api.ts": 54,
	"./api/file_information_api.ts": 8074,
	"./api/floor_api.ts": 7755,
	"./api/organization_api.ts": 8077,
	"./api/photo_area_api.ts": 686,
	"./api/pipeline_api.ts": 3529,
	"./api/project_api.ts": 6734,
	"./api/scan_dataset_api.ts": 901,
	"./api/web_gateway_api.ts": 8080,
	"./avvir_api.ts": 4406,
	"./converters/date_converter.ts": 2862,
	"./converters/matrix_3_converter.ts": 2360,
	"./converters/matrix_4_converter.ts": 1700,
	"./converters/purpose_type_converter.ts": 256,
	"./mixins/add_date_getter_and_setter_to_domain_model.ts": 9036,
	"./mixins/add_instant_getter_and_setter_to_api_model.ts": 4474,
	"./mixins/add_logging_to_instance_methods.ts": 3522,
	"./mixins/add_read_only_properties_to_model.ts": 1257,
	"./models/api/api_argo_response.ts": 6305,
	"./models/api/api_cloud_file.ts": 720,
	"./models/api/api_construction_grid.ts": 5471,
	"./models/api/api_floor.ts": 9951,
	"./models/api/api_grid_line.ts": 5440,
	"./models/api/api_invitation.ts": 5941,
	"./models/api/api_masterformat.ts": 5648,
	"./models/api/api_matrix_3.ts": 5692,
	"./models/api/api_matrix_4.ts": 9081,
	"./models/api/api_organization.ts": 9887,
	"./models/api/api_photo_area.ts": 9657,
	"./models/api/api_photo_location.ts": 7842,
	"./models/api/api_photo_session.ts": 4713,
	"./models/api/api_pipeline.ts": 179,
	"./models/api/api_planned_element.ts": 7304,
	"./models/api/api_project.ts": 7141,
	"./models/api/api_project_cost_analysis_progress.ts": 4636,
	"./models/api/api_project_masterformat_progress.ts": 6041,
	"./models/api/api_purpose_type.ts": 941,
	"./models/api/api_scan_dataset.ts": 3063,
	"./models/api/deprecated_api_pipeline.ts": 6513,
	"./models/domain/detailed_element.ts": 8649,
	"./models/domain/photos/photo_area.ts": 3910,
	"./models/domain/photos/photo_location.ts": 1442,
	"./models/domain/photos/photo_session.ts": 1542,
	"./models/domain/progress/progress_category.ts": 7961,
	"./models/domain/progress/progress_report_for_scan_dataset.ts": 872,
	"./models/domain/progress/project_cost_analysis_progress.ts": 4532,
	"./models/domain/progress/project_masterformat_progress.ts": 1725,
	"./models/domain/progress/time_series_tsv_analysis_types.ts": 2496,
	"./models/domain/running_process.ts": 8072,
	"./models/enums/deviation_status.ts": 8369,
	"./models/enums/event_types.ts": 3164,
	"./models/enums/notification_level.ts": 6402,
	"./models/enums/page_names.ts": 3100,
	"./models/enums/photo_projection_type.ts": 7932,
	"./models/enums/pipeline_types.ts": 8768,
	"./models/enums/purpose_type.ts": 3011,
	"./models/enums/running_process_status.ts": 3714,
	"./models/enums/scan_label.ts": 5632,
	"./models/enums/system_of_measurement.ts": 370,
	"./models/enums/uploader_status.ts": 6500,
	"./models/enums/user_auth_type.ts": 2503,
	"./models/enums/user_role.ts": 3501,
	"./models/response_error.ts": 3972,
	"./utilities/check_fetch_status.ts": 7866,
	"./utilities/get_authorization_headers.ts": 9137,
	"./utilities/http.ts": 1127,
	"./utilities/make_errors_pretty.ts": 2854,
	"./utilities/reduce_user_session.ts": 3226,
	"./utilities/request_headers.ts": 104,
	"./utilities/serialize_form.ts": 5899
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 5422;

/***/ }),

/***/ 2470:
/***/ ((module) => {

"use strict";
module.exports = require("moment");;

/***/ }),

/***/ 2293:
/***/ ((module) => {

"use strict";
module.exports = require("three");;

/***/ }),

/***/ 2164:
/***/ ((module) => {

"use strict";
module.exports = require("underscore");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ avvir)
});

// EXTERNAL MODULE: ./source/avvir_api.ts
var avvir_api = __webpack_require__(4406);
;// CONCATENATED MODULE: external "node-fetch"
const external_node_fetch_namespaceObject = require("node-fetch");;
var external_node_fetch_default = /*#__PURE__*/__webpack_require__.n(external_node_fetch_namespaceObject);
// EXTERNAL MODULE: external "underscore"
var external_underscore_ = __webpack_require__(2164);
var external_underscore_default = /*#__PURE__*/__webpack_require__.n(external_underscore_);
;// CONCATENATED MODULE: ./avvir.ts




global.fetch = (external_node_fetch_default());

const Avvir = {
  api: avvir_api.default
};

function importAll(directoryContext, target) {
  directoryContext.keys().forEach(filePath => {

    let moduleExports = directoryContext(filePath);
    external_underscore_default().forEach(moduleExports, (moduleExport, exportName) => {
      // if (exportName !== 'default') {
        target[exportName] = moduleExport;
      // }
    })
    if (moduleExports.default && moduleExports.default.name) {
      target[moduleExports.default.name] = moduleExports.default;
    }
  });
}


// skip .d.ts files because some use syntax our webpack settings don't support
importAll(__webpack_require__(5422), Avvir);

/* harmony default export */ const avvir = (Avvir);

})();

module.exports = __webpack_exports__;
/******/ })()
;