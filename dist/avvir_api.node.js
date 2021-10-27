(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 320:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ auth_api)
});

;// CONCATENATED MODULE: external "jsonwebtoken"
const external_jsonwebtoken_namespaceObject = require("jsonwebtoken");;
var external_jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(external_jsonwebtoken_namespaceObject);
// EXTERNAL MODULE: ./source/utilities/get_authorization_headers.ts
var get_authorization_headers = __webpack_require__(5561);
// EXTERNAL MODULE: ./source/utilities/http.ts
var http = __webpack_require__(5562);
// EXTERNAL MODULE: ./source/models/response_error.ts + 1 modules
var response_error = __webpack_require__(8445);
// EXTERNAL MODULE: ./source/resources/response_statuses.json
var response_statuses = __webpack_require__(297);
// EXTERNAL MODULE: ./source/models/enums/user_auth_type.ts
var user_auth_type = __webpack_require__(6132);
// EXTERNAL MODULE: ./source/utilities/request_headers.ts
var request_headers = __webpack_require__(4446);
;// CONCATENATED MODULE: ./source/api/auth_api.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};







var AuthApi = /** @class */ (function () {
    function AuthApi() {
    }
    AuthApi.login = function (username, password) {
        var user = {
            authType: user_auth_type.default.BASIC,
            username: username,
            password: password
        };
        var headers = __assign(__assign({}, request_headers.httpGetHeaders), (0,get_authorization_headers.default)(user));
        var url = http.default.baseUrl() + "/login";
        return http.default.fetch(url, {
            headers: headers
        }).then(function (response) {
            return response.json()
                .then(function (body) {
                if (response.ok) {
                    var storageToken = body.storageToken; //TODO attach to user object and let users upload from this lib
                    var authHeader = response.headers.get("Authorization");
                    var jwt = authHeader.substr("Bearer ".length);
                    var decodedJwt = external_jsonwebtoken_default().decode(jwt, { complete: true });
                    var role = decodedJwt.payload.role;
                    return new get_authorization_headers.GatewayUser(user_auth_type.GATEWAY_JWT, jwt, role);
                }
                else {
                    var message = body.message;
                    var statusMessage = response_statuses[response.status];
                    var verboseMessage = response.status + " " + statusMessage + ": '" + message + "' at `/login`";
                    var error = new response_error.default(message, verboseMessage, response, body);
                    console.error(error);
                    throw error;
                }
            });
        });
    };
    return AuthApi;
}());
/* harmony default export */ const auth_api = (AuthApi);


/***/ }),

/***/ 7325:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5562);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6289);


var ElementApi = /** @class */ (function () {
    function ElementApi() {
    }
    ElementApi.getPlannedBuildingElements = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/planned-building-elements";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ElementApi.updateDeviationStatus = function (_a, deviationGlobalId, status, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/deviation-status";
        var deviation = {
            globalId: deviationGlobalId,
            status: status
        };
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, deviation);
    };
    ElementApi.getDetailedElement = function (_a, elementGlobalId, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/element/" + elementGlobalId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ElementApi.getDetailedElements = function (_a, user, viewerIds) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/building-elements";
        if (viewerIds) {
            url += "?viewerIds=" + viewerIds.join(",");
        }
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ElementApi.updateElement = function (_a, element, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId, globalId = _a.globalId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/elements/" + globalId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, element);
    };
    ElementApi.updateManyElements = function (_a, elements, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/detailed-elements";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, elements);
    };
    ElementApi.createElements = function (_a, elements, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/planned-building-elements";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, elements);
    };
    ElementApi.matchPlannedBuildingElements = function (_a, matches, newElements, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/planned-building-elements/match";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, { matches: matches, newElements: newElements });
    };
    ElementApi.updatePlannedBuildingElements = function (_a, elements, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/planned-building-elements", user, elements);
    };
    return ElementApi;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ElementApi);
(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(ElementApi);


/***/ }),

/***/ 9513:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _converters_purpose_type_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6154);
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5562);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6289);
/* harmony import */ var _models_api_api_pipeline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5621);
/* harmony import */ var _models_enums_pipeline_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5019);
/* harmony import */ var _avvir_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5489);
/* harmony import */ var _utilities_pollPipeline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(541);
/* harmony import */ var _pipeline_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4393);








var FileInformationApi = /** @class */ (function () {
    function FileInformationApi() {
    }
    FileInformationApi.createProjectFile = function (_a, apiFile, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/files";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, apiFile);
    };
    FileInformationApi.listProjectFiles = function (_a, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/files";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    ;
    FileInformationApi.zipProjectFolder = function (folderName, _a, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/zip-project-folder?folder-prefix=" + folderName;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, null);
    };
    FileInformationApi.listPhotoAreaFiles = function (_a, user) {
        var projectId = _a.projectId, photoAreaId = _a.photoAreaId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/photo-areas/" + photoAreaId + "/files";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    FileInformationApi.saveFloorFile = function (_a, apiFile, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/file";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, apiFile);
    };
    FileInformationApi.listFloorFiles = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/files";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    FileInformationApi.saveScanDatasetFile = function (_a, apiFile, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/file";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, apiFile);
    };
    FileInformationApi.getScanDatasetFiles = function (_a, purposeType, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var query;
        if (typeof purposeType === "string") {
            query = "?purposeType=" + _converters_purpose_type_converter__WEBPACK_IMPORTED_MODULE_0__.default.toApiPurposeType(purposeType);
        }
        else {
            query = "";
            user = purposeType;
        }
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/files" + query;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    FileInformationApi.saveAndIngestE57ProjectFile = function (_a, apiFile, user) {
        var projectId = _a.projectId;
        return FileInformationApi.createProjectFile({ projectId: projectId }, apiFile, user).then(function (cloudFile) {
            var pipeline = new _models_api_api_pipeline__WEBPACK_IMPORTED_MODULE_3__.default({
                name: _models_enums_pipeline_types__WEBPACK_IMPORTED_MODULE_4__.default.INGEST_PROJECT_FILE,
                firebaseProjectId: projectId,
                options: {
                    url: apiFile.url,
                    fileType: 'e57'
                }
            });
            return _pipeline_api__WEBPACK_IMPORTED_MODULE_7__.default.triggerPipeline(pipeline, user)
                .then(function (pipelineResponse) {
                return (0,_utilities_pollPipeline__WEBPACK_IMPORTED_MODULE_6__.pollPipeline)(pipelineResponse, user).then(function () {
                    //pipeline is finished, return cloudfile
                    return FileInformationApi.listProjectFiles({ projectId: projectId }, user).then(function (projectFiles) {
                        var file = projectFiles.slice(-1)[0];
                        return file;
                    });
                });
            });
        });
    };
    FileInformationApi.saveAndConvertE57ProjectFile = function (_a, apiFile, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        return FileInformationApi.saveAndIngestE57ProjectFile({ projectId: projectId }, apiFile, user).then(function (e57CloudFile) {
            var pipeline = new _models_api_api_pipeline__WEBPACK_IMPORTED_MODULE_3__.default({
                name: _models_enums_pipeline_types__WEBPACK_IMPORTED_MODULE_4__.default.CONVERT_E57_TO_LAS,
                firebaseProjectId: projectId,
                options: {
                    fileUri: e57CloudFile.url,
                    url: "acceptance/projects/" + projectId + "/photo-areas/None"
                }
            });
            return _avvir_api__WEBPACK_IMPORTED_MODULE_5__.default.pipelines.triggerPipeline(pipeline, user)
                .then(function (pipelineResponse) {
                return (0,_utilities_pollPipeline__WEBPACK_IMPORTED_MODULE_6__.pollPipeline)(pipelineResponse, user).then(function () {
                    //pipeline is finished, return cloudfile
                    return FileInformationApi.listProjectFiles({ projectId: projectId }, user).then(function (projectFiles) {
                        var file = projectFiles.slice(-1)[0];
                        return file;
                    });
                });
            });
        });
    };
    return FileInformationApi;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileInformationApi);
(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_2__.default)(FileInformationApi);


/***/ }),

/***/ 2010:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5562);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6289);


var FloorApi = /** @class */ (function () {
    function FloorApi() {
    }
    FloorApi.listFloorsForProject = function (projectId, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    FloorApi.createFloor = function (projectId, floorNumber, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, { text: floorNumber });
    };
    FloorApi.getFloor = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    FloorApi.updateFloor = function (_a, floor, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, floor);
    };
    FloorApi.updateFloorOrder = function (_a, ordinal, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/reorder/" + ordinal;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, null);
    };
    FloorApi.deleteFloor = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.delete(url, user);
    };
    return FloorApi;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FloorApi);
(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(FloorApi);


/***/ }),

/***/ 9940:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5562);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6289);


var OrganizationApi = /** @class */ (function () {
    function OrganizationApi() {
    }
    OrganizationApi.listOrganizations = function (user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/client-accounts";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    OrganizationApi.getOrganization = function (organizationId, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/client-accounts/" + organizationId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    OrganizationApi.getOrganizationName = function (organizationId, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/client-accounts/" + organizationId + "/name";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    OrganizationApi.createOrganization = function (organization, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/client-accounts";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, organization);
    };
    OrganizationApi.updateOrganization = function (accountId, organization, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/client-accounts/" + accountId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, organization);
    };
    return OrganizationApi;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(OrganizationApi));


/***/ }),

/***/ 5817:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6289);
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5562);


var PhotoAreaApi = /** @class */ (function () {
    function PhotoAreaApi() {
    }
    PhotoAreaApi.listPhotoAreasForProject = function (_a, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/photo-areas";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    PhotoAreaApi.listPhotoLocations = function (_a, user) {
        var projectId = _a.projectId, photoAreaId = _a.photoAreaId, photoSessionId = _a.photoSessionId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/photo-areas/" + photoAreaId + "/locations";
        if (photoSessionId) {
            url += "?photoSessionId=" + photoSessionId;
        }
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    PhotoAreaApi.listPhotoSessionsForPhotoArea = function (_a, user) {
        var projectId = _a.projectId, photoAreaId = _a.photoAreaId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/photo-areas/" + photoAreaId + "/sessions";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    return PhotoAreaApi;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhotoAreaApi);
(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_0__.default)(PhotoAreaApi);


/***/ }),

/***/ 4393:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5562);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6289);


var PipelineApi = /** @class */ (function () {
    function PipelineApi() {
    }
    PipelineApi.triggerJobStepsPipeline = function (associationIds, body, user) {
        if (body === void 0) { body = {}; }
        var accountId = associationIds.accountId, projectId = associationIds.projectId, floorId = associationIds.floorId, scanDatasetId = associationIds.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/pipeline/" + accountId + "/" + projectId + "/" + floorId + "/" + scanDatasetId + "/trigger";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, body);
    };
    PipelineApi.triggerPipeline = function (body, user) {
        if (body === void 0) { body = {}; }
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/pipelines";
        var response = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, body);
        return response;
    };
    PipelineApi.checkPipelinesApi = function (name) {
        //TODO: move from web_gateway_api
    };
    return PipelineApi;
}());
(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(PipelineApi);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PipelineApi);


/***/ }),

/***/ 555:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5562);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6289);


var ProjectApi = /** @class */ (function () {
    function ProjectApi() {
    }
    ProjectApi.listProjectsForOrganization = function (accountId, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/client-accounts/" + accountId + "/projects";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ProjectApi.listAllProjectsForUser = function (user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/list-user-projects";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    // deprecated. Call getProject and listProjectsForOrganization instead
    ProjectApi.listProjects = function (projectId, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/list";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ProjectApi.getProject = function (projectId, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ProjectApi.createProject = function (accountId, project, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/client-accounts/" + accountId + "/projects";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, project);
    };
    ProjectApi.updateProject = function (projectId, project, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, project);
    };
    ProjectApi.archiveProject = function (accountId, projectId, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/archive";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, null);
    };
    ProjectApi.saveProjectCostAnalysisProgress = function (_a, progress, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/cost-analysis-progress";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, progress);
    };
    ProjectApi.saveScannedProjectMasterformatProgress = function (_a, progress, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/masterformat-progress";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, progress);
    };
    ProjectApi.saveScheduledProjectMasterformatProgress = function (_a, progress, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/scheduled-masterformat-progress";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, progress);
    };
    ProjectApi.getProjectCostAnalysisProgress = function (_a, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/cost-analysis-progress";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ProjectApi.getScannedProjectMasterformatProgress = function (_a, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/masterformat-progress";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ProjectApi.getScheduledProjectMasterformatProgress = function (_a, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/scheduled-masterformat-progress";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ProjectApi.listProjectFloorFiles = function (_a, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floor-files";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ProjectApi.getProjectDeviationsReportTsvUrl = function (_a, fileName, user) {
        var projectId = _a.projectId;
        var baseUrl = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/" + fileName + "_deviation-report.tsv";
        return Promise.resolve(_utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.addAuthToDownloadUrl(baseUrl, user));
    };
    ProjectApi.getProjectDeviationsReportTsv = function (_a, user) {
        var projectId = _a.projectId;
        var baseUrl = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/project_deviation-report.tsv";
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.addAuthToDownloadUrl(baseUrl, user);
        console.log(url);
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user, "text/tab-separated-values; charset=utf-8");
    };
    return ProjectApi;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(ProjectApi));


/***/ }),

/***/ 4835:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5562);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6289);


var ScanDatasetApi = /** @class */ (function () {
    function ScanDatasetApi() {
    }
    ScanDatasetApi.listScanDatasetsForFloor = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ScanDatasetApi.updateScanDataset = function (_a, scanDataset, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.patch(url, user, scanDataset);
    };
    ScanDatasetApi.createScanDataset = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, null);
    };
    ScanDatasetApi.deleteScanDataset = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.delete(url, user);
    };
    ;
    ScanDatasetApi.saveScanAnalysis = function (_a, analysis, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/analysis?enforceBuiltPersistence=false";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.post(url, user, analysis);
    };
    ScanDatasetApi.getScanDataset = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ScanDatasetApi.getViewerDetailedElementsForScanDataset = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/detailed-elements/viewer";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    ScanDatasetApi.getProgressReportForScanDataset = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/progress";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_0__.default.get(url, user);
    };
    return ScanDatasetApi;
}());
(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_1__.default)(ScanDatasetApi);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScanDatasetApi);


/***/ }),

/***/ 7146:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utilities_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5561);
/* harmony import */ var _utilities_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5562);
/* harmony import */ var _utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6289);
/* harmony import */ var _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6132);
/* harmony import */ var _utilities_request_headers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4446);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};





var WebGatewayApi = /** @class */ (function () {
    function WebGatewayApi() {
    }
    WebGatewayApi.connectProjectToStructionSite = function (_a, structionSiteProjectUrl, token, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/connect-to-structionsite?structionsite-access-token=" + token + "&structionsite-project-url=" + structionSiteProjectUrl;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, null);
    };
    WebGatewayApi.checkPipelineStatus = function (_a, pipelineId, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/pipelines/" + pipelineId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    WebGatewayApi.createInvitation = function (inviteeEmail, role, organizationId, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/users/invitations";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, { userEmail: inviteeEmail, role: role, clientAccountId: organizationId });
    };
    WebGatewayApi.getInvitation = function (invitationToken, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/users/invitations/" + invitationToken;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    WebGatewayApi.getProgressReportPdfUrl = function (projectId, user) {
        var baseUrl = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/progress-report.pdf";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.addAuthToDownloadUrl(baseUrl, user);
    };
    WebGatewayApi.getQualityControlReportPdfUrl = function (projectId) {
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/report.pdf";
    };
    WebGatewayApi.getPlannedElementsTsvUrl = function (_a, fileName, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var baseUrl = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/" + fileName + "_planned-building-elements.tsv";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.addAuthToDownloadUrl(baseUrl, user);
    };
    WebGatewayApi.getDeviationsReportTsvUrl = function (_a, fileName, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var baseUrl = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/" + fileName + "_deviation-report.tsv";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.addAuthToDownloadUrl(baseUrl, user);
    };
    WebGatewayApi.getScanAnalysisUrl = function (_a, fileName, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var baseUrl = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/" + fileName + "_scan-analysis.tsv";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.addAuthToDownloadUrl(baseUrl, user);
    };
    WebGatewayApi.checkProcoreAccessToken = function (projectId, procoreAccessToken, user) {
        if (!projectId) {
            return Promise.reject(new Error("Project not loaded yet"));
        }
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/procore?procore-access-token=" + procoreAccessToken;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    WebGatewayApi.pushPdfToProcore = function (_a, procoreProjectId, procoreAccessToken, pdfType, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        if (!projectId) {
            return Promise.reject(new Error("Project not loaded yet"));
        }
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/push-report-to-procore/" + pdfType + "?procore-project-id=" + procoreProjectId + "&procore-access-token=" + procoreAccessToken;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, null);
    };
    WebGatewayApi.getProcoreProjects = function (projectId, procoreAccessToken, user) {
        if (!projectId) {
            return Promise.reject(new Error("Project not loaded yet"));
        }
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/procore-projects?procore-access-token=" + procoreAccessToken;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    // TODO: rename / move
    WebGatewayApi.getCustomFirebaseToken = function (user) {
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.fetch(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/login", {
            headers: __assign(__assign({}, _utilities_request_headers__WEBPACK_IMPORTED_MODULE_4__.httpGetHeaders), (0,_utilities_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user))
        }).then(function (response) {
            return response.json()
                .then(function (body) {
                var headers = response.headers;
                return { headers: headers, body: body };
            });
        });
    };
    // deprectated. use AuthApi.login instead
    WebGatewayApi.login = function (username, password) {
        var user = {
            authType: _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_3__.default.BASIC,
            username: username,
            password: password
        };
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.fetch(_utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/login", {
            headers: __assign(__assign({}, _utilities_request_headers__WEBPACK_IMPORTED_MODULE_4__.httpGetHeaders), (0,_utilities_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user))
        }).then(function (response) {
            return response.json()
                .then(function (body) {
                var headers = response.headers;
                return { headers: headers, body: body };
            });
        });
    };
    // TODO move to auth api
    WebGatewayApi.acceptInvitation = function (token, password) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/users/accept-invitation";
        var invitationForm = { invitationToken: token, password: password };
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, null, invitationForm);
    };
    WebGatewayApi.exportIfc = function (_a, type, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/export-ifc?type=" + type;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, null);
    };
    // TODO unify with pipeline api
    WebGatewayApi.checkExportedIfc = function (_a, workflowName, type, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/export-ifc/" + workflowName + "?type=" + type;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    WebGatewayApi.downsampleScan = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId, scanDatasetId = _a.scanDatasetId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/scan-datasets/" + scanDatasetId + "/downsample-scan";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, null);
    };
    //TODO move to AuthApi
    WebGatewayApi.getGcpBearerToken = function (_a, user) {
        var projectId = _a.projectId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/gcpAccessToken";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    WebGatewayApi.getMasterformat = function (version) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/masterformats/" + version;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, null);
    };
    WebGatewayApi.triggerArgoRunProgressAndDeviations = function (_a, deviationsFlag, bimSourceFileExtension, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/run-progress-and-deviations?deviationsFlag=" + deviationsFlag + "&bimSourceFileExtension=" + bimSourceFileExtension;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, null);
    };
    WebGatewayApi.triggerArgoRunNwdConvert = function (_a, user) {
        var projectId = _a.projectId, floorId = _a.floorId;
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/projects/" + projectId + "/floors/" + floorId + "/nwd-convert";
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, null);
    };
    WebGatewayApi.recordUserActions = function (type, userActions, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/user-actions";
        var actionForm = {
            type: type,
            payload: userActions
        };
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.post(url, user, actionForm);
    };
    WebGatewayApi.checkRunningProcess = function (processId, user) {
        var url = _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.baseUrl() + "/running-processes/" + processId;
        return _utilities_http__WEBPACK_IMPORTED_MODULE_1__.default.get(url, user);
    };
    return WebGatewayApi;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebGatewayApi);
(0,_utilities_make_errors_pretty__WEBPACK_IMPORTED_MODULE_2__.default)(WebGatewayApi, { exclude: ["getCustomFirebaseToken", "login"] });


/***/ }),

/***/ 5489:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_auth_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(320);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5508);
/* harmony import */ var _api_element_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7325);
/* harmony import */ var _api_file_information_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9513);
/* harmony import */ var _api_floor_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2010);
/* harmony import */ var _api_organization_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9940);
/* harmony import */ var _api_photo_area_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5817);
/* harmony import */ var _api_pipeline_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4393);
/* harmony import */ var _api_project_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(555);
/* harmony import */ var _api_scan_dataset_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4835);
/* harmony import */ var _api_web_gateway_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7146);











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    auth: _api_auth_api__WEBPACK_IMPORTED_MODULE_0__.default,
    config: _config__WEBPACK_IMPORTED_MODULE_1__.default,
    elements: _api_element_api__WEBPACK_IMPORTED_MODULE_2__.default,
    files: _api_file_information_api__WEBPACK_IMPORTED_MODULE_3__.default,
    floors: _api_floor_api__WEBPACK_IMPORTED_MODULE_4__.default,
    organizations: _api_organization_api__WEBPACK_IMPORTED_MODULE_5__.default,
    photos: _api_photo_area_api__WEBPACK_IMPORTED_MODULE_6__.default,
    pipelines: _api_pipeline_api__WEBPACK_IMPORTED_MODULE_7__.default,
    projects: _api_project_api__WEBPACK_IMPORTED_MODULE_8__.default,
    scanDatasets: _api_scan_dataset_api__WEBPACK_IMPORTED_MODULE_9__.default,
    other: _api_web_gateway_api__WEBPACK_IMPORTED_MODULE_10__.default,
});


/***/ }),

/***/ 5508:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _ = __webpack_require__(2164);
var configuration = { logFetch: false };
var addEnvironmentVariablesToConfiguration = function () {
    _.forEach(configuration, function (value, varName) {
        if (process.env[varName] != null && process.env[varName] != '') {
            configuration[varName] = process.env[varName];
        }
    });
};
var useAcceptanceConfiguration = function () {
    configuration = {
        AVVIR_GATEWAY_URL: "https://acceptance-api.avvir.io",
        AVVIR_ENVIRONMENT: "acceptance"
    };
    addEnvironmentVariablesToConfiguration();
};
var useProductionConfiguration = function () {
    configuration = {
        AVVIR_GATEWAY_URL: "https://api.avvir.io",
        AVVIR_ENVIRONMENT: "production"
    };
    addEnvironmentVariablesToConfiguration();
};
var useLocalProductionConfiguration = function () {
    configuration = {
        AVVIR_GATEWAY_URL: "https://api.avvir.io",
        AVVIR_ENVIRONMENT: "local-production"
    };
    addEnvironmentVariablesToConfiguration();
};
var useLocalConfiguration = function () {
    addEnvironmentVariablesToConfiguration();
    configuration = {
        AVVIR_GATEWAY_URL: "http://localhost:8080",
        AVVIR_ENVIRONMENT: "local"
    };
};
var setConfigurationFromEnvironmentVariable = function () {
    if (process.env.AVVIR_ENVIRONMENT === 'acceptance') {
        useAcceptanceConfiguration();
    }
    else if (process.env.AVVIR_ENVIRONMENT === 'local-production') {
        useLocalProductionConfiguration();
    }
    else if (process.env.AVVIR_ENVIRONMENT === 'local') {
        useLocalConfiguration();
    }
    else {
        useProductionConfiguration();
    }
};
setConfigurationFromEnvironmentVariable();
var sharedErrorHandler = function (_a) {
    var error = _a.error;
    throw error;
};
var getConfiguration = function () {
    return configuration;
};
var Config = { useAcceptanceConfiguration: useAcceptanceConfiguration, useProductionConfiguration: useProductionConfiguration, useLocalProductionConfiguration: useLocalProductionConfiguration, useLocalConfiguration: useLocalConfiguration, getConfiguration: getConfiguration, sharedErrorHandler: sharedErrorHandler };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Config);


/***/ }),

/***/ 2024:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2470);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

var DateFormatter = /** @class */ (function () {
    function DateFormatter(format) {
        this.formatString = format;
    }
    DateFormatter.prototype.format = function (date) {
        if (date) {
            return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(this.formatString);
        }
        else {
            return "";
        }
    };
    return DateFormatter;
}());
var DateConverter = /** @class */ (function () {
    function DateConverter() {
    }
    DateConverter.getDateFormatter = function (format) {
        return new DateFormatter(format);
    };
    DateConverter.dateToText = function (date, format) {
        if (date instanceof Date) {
            if (format) {
                return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(format);
            }
            else {
                return "last scanned: " + moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format("MMM D, YYYY");
            }
        }
        else if (moment__WEBPACK_IMPORTED_MODULE_0___default().isMoment(date)) {
            if (format) {
                return date.format(format);
            }
            else {
                return "last scanned: " + date.format("MMM D, YYYY");
            }
        }
        else {
            return "";
        }
    };
    DateConverter.instantToDate = function (instant) {
        if (typeof instant === "number") {
            var epochMillis = instant * 1000;
            return moment__WEBPACK_IMPORTED_MODULE_0___default()(epochMillis).toDate();
        }
        else {
            return null;
        }
    };
    DateConverter.dateToInstant = function (date) {
        if (date instanceof Date) {
            var epochMillis = moment__WEBPACK_IMPORTED_MODULE_0___default()(date).utc(false).toDate().valueOf();
            return epochMillis / 1000;
        }
        else if (moment__WEBPACK_IMPORTED_MODULE_0___default().isMoment(date)) {
            var epochMillis = date.utc(false).toDate().valueOf();
            return epochMillis / 1000;
        }
        else {
            return null;
        }
    };
    DateConverter.millisecondsToDate = function (epochMillis) {
        if (epochMillis || epochMillis === 0) {
            return moment__WEBPACK_IMPORTED_MODULE_0___default()(epochMillis).toDate();
        }
        else {
            return null;
        }
    };
    DateConverter.isValidDate = function (value) {
        return (value instanceof Date && !isNaN(value.valueOf())) || value === null;
    };
    DateConverter.tsvStringToDate = function (dateString) {
        if (dateString) {
            return moment__WEBPACK_IMPORTED_MODULE_0___default()(dateString, "MM/DD/YYYY").toDate();
        }
        else {
            return null;
        }
    };
    return DateConverter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DateConverter);


/***/ }),

/***/ 28:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_api_api_matrix_3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7494);
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/** IMPORTANT!!
 *  Threejs Matrix3 stores matrices in column-major ordering.
 *  This means that using the `Matrix3#toArray` or looking at `Matrix3.elements`
 *  will return what appears to be a transposed version of the matrix.
 *
 *  However, the `Matrix3#set` method takes in elements in row-major order, so calling
 *  that method should look the same as in our other repositories.
 */


var Matrix3Converter = /** @class */ (function () {
    function Matrix3Converter() {
    }
    Matrix3Converter.convertMatrixStringToArray = function (matrixString) {
        return matrixString.split("\n").join(" ").split(" ");
    };
    Matrix3Converter.removeEmptyStrings = function (matrix) {
        return matrix.filter(function (string) { return string !== ""; });
    };
    Matrix3Converter.removeNonNumbers = function (matrix) {
        return matrix.filter(function (string) { return parseFloat(string).toString(10) === string; });
    };
    Matrix3Converter.cleanupStrings = function (matrix) {
        return this.removeNonNumbers(this.removeEmptyStrings(matrix));
    };
    Matrix3Converter.convertStringsToNumbers = function (stringValues) {
        return stringValues.map(function (stringValue) { return parseFloat(stringValue); });
    };
    /** See note at top of file... */
    Matrix3Converter.fromMatrix3ToString = function (matrix3) {
        if (matrix3 === null || matrix3 === void 0 ? void 0 : matrix3.elements) {
            var _a = __read(matrix3.elements, 9), x1 = _a[0], y1 = _a[1], z1 = _a[2], x2 = _a[3], y2 = _a[4], z2 = _a[5], x3 = _a[6], y3 = _a[7], z3 = _a[8];
            return x1 + " " + x2 + " " + x3 + "\n" + y1 + " " + y2 + " " + y3 + "\n" + z1 + " " + z2 + " " + z3;
        }
        else {
            return null;
        }
    };
    Matrix3Converter.fromStringToMatrix3 = function (matrixString) {
        var stringArray = this.convertMatrixStringToArray(matrixString);
        var matrix = this.convertStringsToNumbers(this.cleanupStrings(stringArray));
        if (matrix.length === 9) {
            var _a = __read(matrix, 9), x1 = _a[0], x2 = _a[1], x3 = _a[2], y1 = _a[3], y2 = _a[4], y3 = _a[5], z1 = _a[6], z2 = _a[7], z3 = _a[8];
            return new three__WEBPACK_IMPORTED_MODULE_0__.Matrix3().set(x1, x2, x3, y1, y2, y3, z1, z2, z3);
        }
        else {
            return null;
        }
    };
    Matrix3Converter.fromApiMatrix3ToMatrix3 = function (apiMatrix) {
        if (apiMatrix) {
            var x1 = apiMatrix.x1, y1 = apiMatrix.y1, z1 = apiMatrix.z1, x2 = apiMatrix.x2, y2 = apiMatrix.y2, z2 = apiMatrix.z2, x3 = apiMatrix.x3, y3 = apiMatrix.y3, z3 = apiMatrix.z3;
            return new three__WEBPACK_IMPORTED_MODULE_0__.Matrix3().set(x1, x2, x3, y1, y2, y3, z1, z2, z3);
        }
        else {
            return null;
        }
    };
    /** See note at top of file... */
    Matrix3Converter.fromMatrix3ToApiMatrix3 = function (matrix3) {
        if (matrix3) {
            var _a = __read(matrix3.toArray(), 9), x1 = _a[0], y1 = _a[1], z1 = _a[2], x2 = _a[3], y2 = _a[4], z2 = _a[5], x3 = _a[6], y3 = _a[7], z3 = _a[8];
            return new _models_api_api_matrix_3__WEBPACK_IMPORTED_MODULE_1__.default({
                x1: x1, x2: x2, x3: x3,
                y1: y1, y2: y2, y3: y3,
                z1: z1, z2: z2, z3: z3
            });
        }
        else {
            return null;
        }
    };
    return Matrix3Converter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Matrix3Converter);


/***/ }),

/***/ 2908:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_api_api_matrix_4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6645);
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/** IMPORTANT!!
 *  Threejs Matrix4 stores matrices in column-major ordering.
 *  This means that using the `Matrix4#toArray` or looking at `Matrix4.elements`
 *  will return what appears to be a transposed version of the matrix.
 *
 *  However, the `Matrix4#set` method takes in elements in row-major order, so calling
 *  that method should look the same as in our other repositories.
 */


var Matrix4Converter = /** @class */ (function () {
    function Matrix4Converter() {
    }
    Matrix4Converter.convertMatrixStringToArray = function (matrixString) {
        return matrixString.split("\n").join(" ").split(" ");
    };
    Matrix4Converter.removeEmptyStrings = function (matrix) {
        return matrix.filter(function (string) { return string !== ""; });
    };
    Matrix4Converter.removeNonNumbers = function (matrix) {
        return matrix.filter(function (string) { return parseFloat(string).toString(10) === string; });
    };
    Matrix4Converter.cleanupStrings = function (matrix) {
        return this.removeNonNumbers(this.removeEmptyStrings(matrix));
    };
    Matrix4Converter.convertStringsToNumbers = function (stringValues) {
        return stringValues.map(function (stringValue) { return parseFloat(stringValue); });
    };
    /** See note at top of file... */
    Matrix4Converter.fromMatrix4ToString = function (matrix4) {
        if (matrix4 === null || matrix4 === void 0 ? void 0 : matrix4.elements) {
            var _a = __read(matrix4.elements, 16), x1 = _a[0], y1 = _a[1], z1 = _a[2], w1 = _a[3], x2 = _a[4], y2 = _a[5], z2 = _a[6], w2 = _a[7], x3 = _a[8], y3 = _a[9], z3 = _a[10], w3 = _a[11], x4 = _a[12], y4 = _a[13], z4 = _a[14], w4 = _a[15];
            return x1 + " " + x2 + " " + x3 + " " + x4 + "\n" + y1 + " " + y2 + " " + y3 + " " + y4 + "\n" + z1 + " " + z2 + " " + z3 + " " + z4 + "\n" + w1 + " " + w2 + " " + w3 + " " + w4;
        }
        else {
            return null;
        }
    };
    Matrix4Converter.fromStringToMatrix4 = function (matrixString) {
        var stringArray = this.convertMatrixStringToArray(matrixString);
        var matrix = this.convertStringsToNumbers(this.cleanupStrings(stringArray));
        if (matrix.length === 16) {
            var _a = __read(matrix, 16), x1 = _a[0], x2 = _a[1], x3 = _a[2], x4 = _a[3], y1 = _a[4], y2 = _a[5], y3 = _a[6], y4 = _a[7], z1 = _a[8], z2 = _a[9], z3 = _a[10], z4 = _a[11], w1 = _a[12], w2 = _a[13], w3 = _a[14], w4 = _a[15];
            return new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4().set(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, w1, w2, w3, w4);
        }
        else {
            return null;
        }
    };
    Matrix4Converter.fromApiMatrixToMatrix4 = function (apiMatrix) {
        if (apiMatrix) {
            var x1 = apiMatrix.x1, y1 = apiMatrix.y1, z1 = apiMatrix.z1, w1 = apiMatrix.w1, x2 = apiMatrix.x2, y2 = apiMatrix.y2, z2 = apiMatrix.z2, w2 = apiMatrix.w2, x3 = apiMatrix.x3, y3 = apiMatrix.y3, z3 = apiMatrix.z3, w3 = apiMatrix.w3, x4 = apiMatrix.x4, y4 = apiMatrix.y4, z4 = apiMatrix.z4, w4 = apiMatrix.w4;
            return new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4().set(x1, x2, x3, x4, y1, y2, y3, y4, z1, z2, z3, z4, w1, w2, w3, w4);
        }
        else {
            return null;
        }
    };
    /** See note at top of file... */
    Matrix4Converter.fromMatrix4ToApiMatrix = function (matrix4) {
        if (matrix4) {
            var _a = __read(matrix4.toArray(), 16), x1 = _a[0], y1 = _a[1], z1 = _a[2], w1 = _a[3], x2 = _a[4], y2 = _a[5], z2 = _a[6], w2 = _a[7], x3 = _a[8], y3 = _a[9], z3 = _a[10], w3 = _a[11], x4 = _a[12], y4 = _a[13], z4 = _a[14], w4 = _a[15];
            return new _models_api_api_matrix_4__WEBPACK_IMPORTED_MODULE_1__.default({
                x1: x1, x2: x2, x3: x3, x4: x4,
                y1: y1, y2: y2, y3: y3, y4: y4,
                z1: z1, z2: z2, z3: z3, z4: z4,
                w1: w1, w2: w2, w3: w3, w4: w4
            });
        }
        else {
            return null;
        }
    };
    return Matrix4Converter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Matrix4Converter);


/***/ }),

/***/ 6154:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_enums_purpose_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5295);


var apiPurposeTypeByPurposeType = underscore__WEBPACK_IMPORTED_MODULE_0___default().invert(_models_enums_purpose_type__WEBPACK_IMPORTED_MODULE_1__.default);
var purposeTypeByApiPurposeType = _models_enums_purpose_type__WEBPACK_IMPORTED_MODULE_1__.default;
var PurposeTypeConverter = /** @class */ (function () {
    function PurposeTypeConverter() {
    }
    PurposeTypeConverter.toApiPurposeType = function (fileKey) {
        return apiPurposeTypeByPurposeType[fileKey];
    };
    PurposeTypeConverter.toPurposeType = function (apiPurposeType) {
        return purposeTypeByApiPurposeType[apiPurposeType];
    };
    return PurposeTypeConverter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PurposeTypeConverter);


/***/ }),

/***/ 6553:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2470);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2024);


function addDateGetterAndSetterToDomainModel(target, propertyName) {
    var dateVal;
    Object.defineProperty(target, propertyName, {
        get: function () {
            return dateVal;
        },
        set: function (val) {
            if (typeof val === "string") {
                dateVal = moment__WEBPACK_IMPORTED_MODULE_0___default()(val, "MMM D, YYYY").toDate();
            }
            else if (val instanceof Date) {
                dateVal = val;
            }
            else if (moment__WEBPACK_IMPORTED_MODULE_0___default().isMoment(val)) {
                val.toDate();
            }
            else {
                dateVal = _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__.default.instantToDate(val) || _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__.default.millisecondsToDate(val) || null;
            }
        },
        enumerable: true
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addDateGetterAndSetterToDomainModel);


/***/ }),

/***/ 1142:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2470);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2024);


var addInstantGetterAndSetterToApiModel = function (modelInstance, propertyName) {
    var dateVal;
    Object.defineProperty(modelInstance, propertyName, {
        get: function () {
            return dateVal;
        },
        set: function (val) {
            if (typeof val === "string") {
                dateVal = _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__.default.dateToInstant(moment__WEBPACK_IMPORTED_MODULE_0___default()(val, "MMM D, YYYY").toDate());
            }
            else if (val instanceof Date || moment__WEBPACK_IMPORTED_MODULE_0___default().isMoment(val)) {
                dateVal = _converters_date_converter__WEBPACK_IMPORTED_MODULE_1__.default.dateToInstant(val);
            }
            else {
                dateVal = val;
            }
        },
        enumerable: true
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addInstantGetterAndSetterToApiModel);


/***/ }),

/***/ 5953:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};

var addLoggingToInstanceMethods = function (instance, instanceName, ignoredMethods) {
    var _a;
    var instanceMethods = underscore__WEBPACK_IMPORTED_MODULE_0___default().methods(instance);
    if (ignoredMethods) {
        instanceMethods = (_a = underscore__WEBPACK_IMPORTED_MODULE_0___default()(instanceMethods)).without.apply(_a, __spreadArray([], __read(ignoredMethods)));
    }
    instanceMethods.forEach(function (methodName) {
        if (!ignoredMethods.includes(methodName)) {
            var descriptor = Object.getOwnPropertyDescriptor(instance, methodName);
            if (!descriptor || descriptor.configurable) {
                var originalMethod_1 = instance[methodName];
                Object.defineProperty(instance, methodName, {
                    value: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        console.log("calling " + instanceName + "." + methodName + "(" + args + ")");
                        return originalMethod_1.call.apply(originalMethod_1, __spreadArray([instance], __read(args)));
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

/***/ 5025:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var addReadOnlyPropertiesToModel = function (modelInstance, properties) {
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

/***/ 8450:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ApiArgoResponse = /** @class */ (function () {
    function ApiArgoResponse(_a) {
        var _b = _a === void 0 ? {} : _a, name = _b.name, generateName = _b.generateName, namespace = _b.namespace, selfLink = _b.selfLink, uid = _b.uid, resourceVersion = _b.resourceVersion, generation = _b.generation, creationTimestamp = _b.creationTimestamp;
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
    }
    return ApiArgoResponse;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiArgoResponse);


/***/ }),

/***/ 277:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1142);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5025);
/* harmony import */ var _api_purpose_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3979);
/* harmony import */ var _enums_purpose_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5295);
/* harmony import */ var _converters_purpose_type_converter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6154);





var ApiCloudFile = /** @class */ (function () {
    function ApiCloudFile(_a) {
        var url = _a.url, id = _a.id, lastModified = _a.lastModified, createdAt = _a.createdAt, purposeType = _a.purposeType, fileType = _a.fileType;
        this.lastModified = null;
        this.createdAt = null;
        this.purposeType = _api_purpose_type__WEBPACK_IMPORTED_MODULE_1__.default.OTHER;
        (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "lastModified");
        (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "createdAt");
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_4__.default)(this, { url: url, id: id, fileType: fileType });
        var purposeTypeVal = _api_purpose_type__WEBPACK_IMPORTED_MODULE_1__.default.OTHER;
        Object.defineProperties(this, {
            purposeType: {
                get: function () {
                    return purposeTypeVal;
                },
                set: function (val) {
                    if (typeof val === "string") {
                        if ((0,_api_purpose_type__WEBPACK_IMPORTED_MODULE_1__.isApiPurposeType)(val)) {
                            purposeTypeVal = val;
                        }
                        else if ((0,_enums_purpose_type__WEBPACK_IMPORTED_MODULE_2__.isPurposeType)(val)) {
                            purposeTypeVal = _converters_purpose_type_converter__WEBPACK_IMPORTED_MODULE_3__.default.toApiPurposeType(val);
                        }
                    }
                },
                enumerable: true
            }
        });
        // @ts-ignore
        this.lastModified = lastModified || null;
        // @ts-ignore
        this.createdAt = createdAt || null;
        // @ts-ignore
        this.purposeType = purposeType;
    }
    return ApiCloudFile;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiCloudFile);


/***/ }),

/***/ 7117:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5025);

var ApiConstructionGrid = /** @class */ (function () {
    function ApiConstructionGrid(_a) {
        var id = _a.id, globalId = _a.globalId, axisULines = _a.axisULines, axisVLines = _a.axisVLines, firebaseFloorId = _a.firebaseFloorId;
        this.id = null;
        this.globalId = null;
        this.axisULines = [];
        this.axisVLines = [];
        this.firebaseFloorId = null;
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, { id: id, firebaseFloorId: firebaseFloorId, globalId: globalId });
        this.axisULines = axisULines;
        this.axisVLines = axisVLines;
    }
    return ApiConstructionGrid;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiConstructionGrid);


/***/ }),

/***/ 1596:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1142);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5025);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _converters_matrix_3_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);




var ApiFloor = /** @class */ (function () {
    function ApiFloor(_a) {
        var _b = _a === void 0 ? {} : _a, id = _b.id, firebaseId = _b.firebaseId, ordinal = _b.ordinal, floorNumber = _b.floorNumber, defaultFirebaseScanDatasetId = _b.defaultFirebaseScanDatasetId, firebaseProjectId = _b.firebaseProjectId, firebaseScanDatasetIds = _b.firebaseScanDatasetIds, constructionGrid = _b.constructionGrid, plannedElementCount = _b.plannedElementCount, scanDate = _b.scanDate, photoAreaId = _b.photoAreaId, offset = _b.offset, photoAreaMinimapPixelToBimMinimapPixel = _b.photoAreaMinimapPixelToBimMinimapPixel, bimMinimapToWorld = _b.bimMinimapToWorld, floorElevation = _b.floorElevation;
        /**
         * An array of external identifiers of the capture datasets associated with this area.
         */
        this.firebaseScanDatasetIds = [];
        this.constructionGrid = null;
        this.plannedElementCount = null;
        this.scanDate = null;
        this.offset = null;
        this.photoAreaId = null;
        this.photoAreaMinimapPixelToBimMinimapPixel = null;
        this.bimMinimapToWorld = null;
        (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "scanDate");
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__.default)(this, { id: id, firebaseId: firebaseId, firebaseProjectId: firebaseProjectId });
        var offsetVal, photoMinimapToBimMinimapTransformVal, bimMinimapToWorldTransformVal;
        Object.defineProperties(this, {
            offset: {
                get: function () {
                    return offsetVal;
                },
                set: function (val) {
                    if (val) {
                        offsetVal = { x: val.x, y: val.y };
                    }
                    else {
                        offsetVal = null;
                    }
                },
                enumerable: true
            },
            photoAreaMinimapPixelToBimMinimapPixel: {
                get: function () {
                    return photoMinimapToBimMinimapTransformVal;
                },
                set: function (val) {
                    if (val instanceof three__WEBPACK_IMPORTED_MODULE_1__.Matrix3) {
                        photoMinimapToBimMinimapTransformVal = _converters_matrix_3_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix3ToApiMatrix3(val);
                    }
                    else if (val) {
                        photoMinimapToBimMinimapTransformVal = val;
                    }
                    else {
                        photoMinimapToBimMinimapTransformVal = null;
                    }
                },
                enumerable: true
            },
            bimMinimapToWorld: {
                get: function () {
                    return bimMinimapToWorldTransformVal;
                },
                set: function (val) {
                    if (val instanceof three__WEBPACK_IMPORTED_MODULE_1__.Matrix3) {
                        bimMinimapToWorldTransformVal = _converters_matrix_3_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix3ToApiMatrix3(val);
                    }
                    else if (val) {
                        bimMinimapToWorldTransformVal = val;
                    }
                    else {
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
        this.plannedElementCount = plannedElementCount || 0;
        // @ts-ignore
        this.scanDate = scanDate || null;
        this.photoAreaId = photoAreaId;
        this.offset = offset || null;
        // @ts-ignore
        this.photoAreaMinimapPixelToBimMinimapPixel = photoAreaMinimapPixelToBimMinimapPixel || null;
        // @ts-ignore
        this.bimMinimapToWorld = bimMinimapToWorld || null;
        this.floorElevation = floorElevation || null;
    }
    return ApiFloor;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiFloor);


/***/ }),

/***/ 2179:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);

var ApiGridLine = /** @class */ (function () {
    function ApiGridLine(_a) {
        var name = _a.name, point1 = _a.point1, point2 = _a.point2;
        this.name = null;
        this.point1 = null;
        this.point2 = null;
        this.name = name || null;
        if (point1) {
            this.point1 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(point1.x, point1.y);
        }
        else {
            this.point1 = null;
        }
        if (point2) {
            this.point2 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(point2.x, point2.y);
        }
        else {
            this.point2 = null;
        }
    }
    return ApiGridLine;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiGridLine);


/***/ }),

/***/ 5515:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ApiInvitation = /** @class */ (function () {
    function ApiInvitation() {
    }
    return ApiInvitation;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiInvitation);


/***/ }),

/***/ 8069:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ApiMasterformat = /** @class */ (function () {
    function ApiMasterformat(version, code, description) {
        this.version = version;
        this.code = code;
        this.description = description;
    }
    return ApiMasterformat;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiMasterformat);


/***/ }),

/***/ 7494:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ApiMatrix3 = /** @class */ (function () {
    function ApiMatrix3(_a) {
        var _b = _a.x1, x1 = _b === void 0 ? 1 : _b, _c = _a.x2, x2 = _c === void 0 ? 0 : _c, _d = _a.x3, x3 = _d === void 0 ? 0 : _d, _e = _a.y1, y1 = _e === void 0 ? 0 : _e, _f = _a.y2, y2 = _f === void 0 ? 1 : _f, _g = _a.y3, y3 = _g === void 0 ? 0 : _g, _h = _a.z1, z1 = _h === void 0 ? 0 : _h, _j = _a.z2, z2 = _j === void 0 ? 0 : _j, _k = _a.z3, z3 = _k === void 0 ? 1 : _k;
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
    }
    return ApiMatrix3;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiMatrix3);


/***/ }),

/***/ 6645:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ApiMatrix4 = /** @class */ (function () {
    function ApiMatrix4(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.x1, x1 = _c === void 0 ? 1 : _c, _d = _b.x2, x2 = _d === void 0 ? 0 : _d, _e = _b.x3, x3 = _e === void 0 ? 0 : _e, _f = _b.x4, x4 = _f === void 0 ? 0 : _f, _g = _b.y1, y1 = _g === void 0 ? 0 : _g, _h = _b.y2, y2 = _h === void 0 ? 1 : _h, _j = _b.y3, y3 = _j === void 0 ? 0 : _j, _k = _b.y4, y4 = _k === void 0 ? 0 : _k, _l = _b.z1, z1 = _l === void 0 ? 0 : _l, _m = _b.z2, z2 = _m === void 0 ? 0 : _m, _o = _b.z3, z3 = _o === void 0 ? 1 : _o, _p = _b.z4, z4 = _p === void 0 ? 0 : _p, _q = _b.w1, w1 = _q === void 0 ? 0 : _q, _r = _b.w2, w2 = _r === void 0 ? 0 : _r, _s = _b.w3, w3 = _s === void 0 ? 0 : _s, _t = _b.w4, w4 = _t === void 0 ? 1 : _t;
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
    }
    return ApiMatrix4;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiMatrix4);


/***/ }),

/***/ 6835:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5025);

var ApiOrganization = /** @class */ (function () {
    function ApiOrganization(_a) {
        var id = _a.id, firebaseId = _a.firebaseId, city = _a.city, country = _a.country, addressLine1 = _a.addressLine1, addressLine2 = _a.addressLine2, state = _a.state, zip = _a.zip, contactEmail = _a.contactEmail, contactFirstName = _a.contactFirstName, contactLastName = _a.contactLastName, contactPhoneNumber = _a.contactPhoneNumber, name = _a.name, notes = _a.notes, firebaseProjectIds = _a.firebaseProjectIds;
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
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, { id: id, firebaseId: firebaseId });
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
    }
    return ApiOrganization;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiOrganization);


/***/ }),

/***/ 9297:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5025);

var ApiPhotoArea = /** @class */ (function () {
    function ApiPhotoArea(_a) {
        var name = _a.name, id = _a.id, firebaseProjectId = _a.firebaseProjectId, structionsiteProjectUrl = _a.structionsiteProjectUrl;
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, { id: id, firebaseProjectId: firebaseProjectId });
        this.name = name;
        this.structionsiteProjectUrl = structionsiteProjectUrl;
    }
    return ApiPhotoArea;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiPhotoArea);


/***/ }),

/***/ 1390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ApiPhotoLocation = /** @class */ (function () {
    function ApiPhotoLocation() {
    }
    return ApiPhotoLocation;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiPhotoLocation);


/***/ }),

/***/ 3379:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5025);
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1142);


var ApiPhotoSession = /** @class */ (function () {
    function ApiPhotoSession(_a) {
        var _b = _a === void 0 ? {} : _a, id = _b.id, photoAreaId = _b.photoAreaId, sessionDate = _b.sessionDate;
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__.default)(this, { id: id, photoAreaId: photoAreaId });
        (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "sessionDate");
        // @ts-ignore
        this.sessionDate = sessionDate;
    }
    return ApiPhotoSession;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiPhotoSession);


/***/ }),

/***/ 5621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1142);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5025);


var ApiPipeline = /** @class */ (function () {
    function ApiPipeline(_a) {
        var _b = _a === void 0 ? {} : _a, id = _b.id, name = _b.name, externalId = _b.externalId, externalUrl = _b.externalUrl, startTime = _b.startTime, endTime = _b.endTime, firebaseProjectId = _b.firebaseProjectId, firebaseFloorId = _b.firebaseFloorId, firebaseScanDatasetId = _b.firebaseScanDatasetId, options = _b.options, status = _b.status;
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__.default)(this, { id: id });
        (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "startTime");
        (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "endTime");
        this.name = name || null;
        this.externalId = externalId || null;
        this.externalUrl = externalUrl || null;
        // @ts-ignore
        this.startTime = startTime;
        // @ts-ignore
        this.endTime = endTime;
        this.firebaseProjectId = firebaseProjectId || null;
        this.firebaseFloorId = firebaseFloorId || null;
        this.firebaseScanDatasetId = firebaseScanDatasetId || null;
        this.options = options || null;
        this.status = status || null;
    }
    return ApiPipeline;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiPipeline);


/***/ }),

/***/ 6099:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5025);

var ApiPlannedElement = /** @class */ (function () {
    function ApiPlannedElement(_a) {
        var _b = _a === void 0 ? {} : _a, globalId = _b.globalId, name = _b.name, ifcType = _b.ifcType, uniformat = _b.uniformat, itemId = _b.itemId, discipline = _b.discipline, primaryUnitOfMeasurement = _b.primaryUnitOfMeasurement, primaryMeasurement = _b.primaryMeasurement;
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, { globalId: globalId });
        this.name = name;
        this.ifcType = ifcType;
        this.uniformat = uniformat;
        this.itemId = itemId;
        this.discipline = discipline;
        this.primaryUnitOfMeasurement = primaryUnitOfMeasurement;
        this.primaryMeasurement = primaryMeasurement;
    }
    return ApiPlannedElement;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiPlannedElement);


/***/ }),

/***/ 933:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1142);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5025);
/* harmony import */ var _enums_system_of_measurement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9875);



var ApiProject = /** @class */ (function () {
    function ApiProject(_a) {
        var _b = _a === void 0 ? {} : _a, city = _b.city, country = _b.country, addressLine1 = _b.addressLine1, addressLine2 = _b.addressLine2, state = _b.state, zip = _b.zip, defaultFirebaseFloorId = _b.defaultFirebaseFloorId, archivedAt = _b.archivedAt, progressNotes = _b.progressNotes, avvirAnalysisNotes = _b.avvirAnalysisNotes, endDate = _b.endDate, firebaseId = _b.firebaseId, name = _b.name, notes = _b.notes, pricing = _b.pricing, sourceAnalysisNotes = _b.sourceAnalysisNotes, startDate = _b.startDate, systemOfMeasurement = _b.systemOfMeasurement, id = _b.id, clientAccountId = _b.clientAccountId, scannedProjectMasterformatProgresses = _b.scannedProjectMasterformatProgresses, scheduledProjectMasterformatProgresses = _b.scheduledProjectMasterformatProgresses, costAnalysisProgresses = _b.costAnalysisProgresses, firebaseFloorIds = _b.firebaseFloorIds;
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
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_2__.default)(this, { firebaseId: firebaseId, clientAccountId: clientAccountId, id: id });
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
        this.systemOfMeasurement = systemOfMeasurement || _enums_system_of_measurement__WEBPACK_IMPORTED_MODULE_1__.IMPERIAL;
        // @ts-ignore
        this.endDate = endDate || null;
        // @ts-ignore
        this.startDate = startDate || null;
        // @ts-ignore
        this.archivedAt = archivedAt || null;
    }
    return ApiProject;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiProject);


/***/ }),

/***/ 4819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1142);

var ApiProjectCostAnalysisProgress = /** @class */ (function () {
    function ApiProjectCostAnalysisProgress(_a) {
        var masterformatCode = _a.masterformatCode, sequence = _a.sequence, name = _a.name, description = _a.description, unitOfMeasure = _a.unitOfMeasure, unitCost = _a.unitCost, quantity = _a.quantity, totalCost = _a.totalCost, bimQuantity = _a.bimQuantity, reportedInstalled = _a.reportedInstalled, installedQuantity = _a.installedQuantity, installedCost = _a.installedCost, analysisDate = _a.analysisDate;
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
        this.installedCost = installedCost;
        // @ts-ignore
        this.analysisDate = analysisDate;
    }
    return ApiProjectCostAnalysisProgress;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiProjectCostAnalysisProgress);


/***/ }),

/***/ 6061:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1142);
/* harmony import */ var _api_masterformat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8069);


var ApiProjectMasterformatProgress = /** @class */ (function () {
    function ApiProjectMasterformatProgress(masterformat, percentComplete, scanDate) {
        this.masterformat = null;
        this.percentComplete = null;
        this.scanDate = null;
        (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "scanDate");
        if (masterformat) {
            this.masterformat = new _api_masterformat__WEBPACK_IMPORTED_MODULE_1__.default(masterformat.version, masterformat.code);
        }
        else {
            this.masterformat = null;
        }
        if (percentComplete === 0) {
            this.percentComplete = percentComplete;
        }
        else {
            this.percentComplete = percentComplete || null;
        }
        // @ts-ignore
        this.scanDate = scanDate;
    }
    return ApiProjectMasterformatProgress;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiProjectMasterformatProgress);


/***/ }),

/***/ 3979:
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
var isApiPurposeType = function (type) { return Object.values(ApiPurposeType).includes(type); };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiPurposeType);


/***/ }),

/***/ 1866:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1142);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5025);
/* harmony import */ var _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2908);




var ApiScanDataset = /** @class */ (function () {
    function ApiScanDataset(_a) {
        var id = _a.id, firebaseId = _a.firebaseId, firebaseFloorId = _a.firebaseFloorId, scanNumber = _a.scanNumber, dataPresences = _a.dataPresences, notes = _a.notes, name = _a.name, coarseAlignmentMatrix = _a.coarseAlignmentMatrix, fineAlignmentMatrix = _a.fineAlignmentMatrix, scanDate = _a.scanDate;
        /**
         * Date that the dataset was captured.
         */
        this.scanDate = null;
        this.coarseAlignmentMatrix = null;
        this.fineAlignmentMatrix = null;
        this.notes = null;
        this.name = null;
        (0,_mixins_add_instant_getter_and_setter_to_api_model__WEBPACK_IMPORTED_MODULE_1__.default)(this, "scanDate");
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__.default)(this, { id: id, firebaseId: firebaseId, firebaseFloorId: firebaseFloorId, scanNumber: scanNumber });
        var coarseAlignmentMatrixVal, fineAlignmentMatrixVal;
        Object.defineProperties(this, {
            coarseAlignmentMatrix: {
                get: function () {
                    return coarseAlignmentMatrixVal;
                },
                set: function (val) {
                    if (typeof val === "string") {
                        coarseAlignmentMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix4ToApiMatrix(_converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromStringToMatrix4(val));
                    }
                    else if (val instanceof three__WEBPACK_IMPORTED_MODULE_0__.Matrix4) {
                        coarseAlignmentMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix4ToApiMatrix(val);
                    }
                    else {
                        coarseAlignmentMatrixVal = val;
                    }
                },
                enumerable: true
            },
            fineAlignmentMatrix: {
                get: function () {
                    return fineAlignmentMatrixVal;
                },
                set: function (val) {
                    if (typeof val === "string") {
                        fineAlignmentMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix4ToApiMatrix(_converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromStringToMatrix4(val));
                    }
                    else if (val instanceof three__WEBPACK_IMPORTED_MODULE_0__.Matrix4) {
                        fineAlignmentMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromMatrix4ToApiMatrix(val);
                    }
                    else {
                        fineAlignmentMatrixVal = val;
                    }
                },
                enumerable: true
            }
        });
        // @ts-ignore
        this.coarseAlignmentMatrix = coarseAlignmentMatrix || null;
        // @ts-ignore
        this.fineAlignmentMatrix = fineAlignmentMatrix || null;
        if (dataPresences) {
            this.dataPresences = dataPresences;
        }
        this.notes = notes || null;
        this.name = name || null;
        // @ts-ignore
        this.scanDate = scanDate;
    }
    return ApiScanDataset;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApiScanDataset);


/***/ }),

/***/ 6732:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var DeprecatedApiPipeline = /** @class */ (function () {
    function DeprecatedApiPipeline() {
    }
    return DeprecatedApiPipeline;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeprecatedApiPipeline);


/***/ }),

/***/ 7073:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Deviation": () => (/* binding */ Deviation),
/* harmony export */   "isDeviationScanResult": () => (/* binding */ isDeviationScanResult),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_deviation_status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9142);
/* harmony import */ var _enums_scan_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2252);


var Deviation = /** @class */ (function () {
    function Deviation() {
        this.deviationVectorMeters = { x: 0.0, y: 0.0, z: 0.0 };
        this.deviationMeters = 0;
        this.status = _enums_deviation_status__WEBPACK_IMPORTED_MODULE_0__.default.DETECTED;
    }
    return Deviation;
}());

var isDeviationScanResult = function (scanResult) {
    return (scanResult === null || scanResult === void 0 ? void 0 : scanResult.scanLabel) === _enums_scan_label__WEBPACK_IMPORTED_MODULE_1__.DEVIATED;
};
var DetailedElement = /** @class */ (function () {
    function DetailedElement(ifcType, globalId, scanResult) {
        this.ifcType = ifcType;
        this.globalId = globalId;
        this.scanResult = scanResult;
    }
    return DetailedElement;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailedElement);


/***/ }),

/***/ 8643:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Masterformat = /** @class */ (function () {
    function Masterformat(version, code, description) {
        this.version = version || null;
        this.code = code || null;
        this.description = description;
    }
    return Masterformat;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Masterformat);


/***/ }),

/***/ 3946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5025);

var PhotoArea = /** @class */ (function () {
    function PhotoArea(_a) {
        var _b = _a === void 0 ? {} : _a, name = _b.name, id = _b.id, files = _b.files, firebaseProjectId = _b.firebaseProjectId, structionsiteProjectUrl = _b.structionsiteProjectUrl;
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, { id: id, firebaseProjectId: firebaseProjectId });
        this.name = name;
        this.structionsiteProjectUrl = structionsiteProjectUrl;
        // @ts-ignore
        this.files = files || {};
    }
    return PhotoArea;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhotoArea);


/***/ }),

/***/ 5445:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2293);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5025);
/* harmony import */ var _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2908);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var PhotoLocation = /** @class */ (function () {
    function PhotoLocation(_a) {
        var _b = _a === void 0 ? {} : _a, id = _b.id, photoAreaId = _b.photoAreaId, photoSessionId = _b.photoSessionId, fileId = _b.fileId, minimapCoordinates = _b.minimapCoordinates, minimapBearing = _b.minimapBearing, projectionType = _b.projectionType, cameraWorldMatrix = _b.cameraWorldMatrix, yawOffset = _b.yawOffset;
        this.yawOffset = 0;
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_3__.default)(this, { id: id, photoAreaId: photoAreaId, photoSessionId: photoSessionId, fileId: fileId });
        if (minimapCoordinates) {
            this.minimapCoordinates = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(minimapCoordinates.x, minimapCoordinates.y);
        }
        this.minimapBearing = minimapBearing;
        var cameraWorldMatrixVal;
        Object.defineProperties(this, {
            cameraWorldMatrix: {
                get: function () {
                    return cameraWorldMatrixVal;
                },
                set: function (val) {
                    if (typeof val === "string") {
                        cameraWorldMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromStringToMatrix4(val);
                    }
                    else if (val instanceof three__WEBPACK_IMPORTED_MODULE_0__.Matrix4) {
                        cameraWorldMatrixVal = val;
                    }
                    else {
                        cameraWorldMatrixVal = _converters_matrix_4_converter__WEBPACK_IMPORTED_MODULE_2__.default.fromApiMatrixToMatrix4(val);
                    }
                },
                enumerable: true
            }
        });
        // @ts-ignore
        this.cameraWorldMatrix = cameraWorldMatrix;
        this.projectionType = projectionType;
        this.yawOffset = yawOffset;
    }
    PhotoLocation.fromApi = function (apiPhotoLocation) {
        return new PhotoLocation(__assign(__assign({}, underscore__WEBPACK_IMPORTED_MODULE_1___default().omit(apiPhotoLocation, "minimapX", "minimapY", "file")), { fileId: apiPhotoLocation.file.id, minimapCoordinates: {
                x: apiPhotoLocation.minimapX,
                y: apiPhotoLocation.minimapY
            } }));
    };
    return PhotoLocation;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhotoLocation);


/***/ }),

/***/ 4519:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5025);
/* harmony import */ var _mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6553);


var PhotoSession = /** @class */ (function () {
    function PhotoSession(_a) {
        var _b = _a === void 0 ? {} : _a, id = _b.id, photoAreaId = _b.photoAreaId, sessionDate = _b.sessionDate;
        (0,_mixins_add_read_only_properties_to_model__WEBPACK_IMPORTED_MODULE_1__.default)(this, { id: id, photoAreaId: photoAreaId });
        (0,_mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "sessionDate");
        // @ts-ignore
        this.sessionDate = sessionDate;
    }
    return PhotoSession;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhotoSession);


/***/ }),

/***/ 6418:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ProgressCategory = /** @class */ (function () {
    function ProgressCategory() {
    }
    return ProgressCategory;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressCategory);


/***/ }),

/***/ 8817:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ProgressReportForScanDataset = /** @class */ (function () {
    function ProgressReportForScanDataset() {
    }
    return ProgressReportForScanDataset;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProgressReportForScanDataset);


/***/ }),

/***/ 5605:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6553);

var ProjectCostAnalysisProgress = /** @class */ (function () {
    function ProjectCostAnalysisProgress(_a) {
        var _b = _a === void 0 ? {} : _a, masterformatCode = _b.masterformatCode, sequence = _b.sequence, name = _b.name, description = _b.description, unitOfMeasure = _b.unitOfMeasure, unitCost = _b.unitCost, quantity = _b.quantity, totalCost = _b.totalCost, bimQuantity = _b.bimQuantity, reportedInstalled = _b.reportedInstalled, installedQuantity = _b.installedQuantity, installedCost = _b.installedCost, analysisDate = _b.analysisDate;
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
        this.installedCost = installedCost;
        // @ts-ignore
        this.analysisDate = analysisDate;
    }
    return ProjectCostAnalysisProgress;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectCostAnalysisProgress);


/***/ }),

/***/ 9459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6553);

var ProjectMasterformatProgress = /** @class */ (function () {
    function ProjectMasterformatProgress(masterformat, percentComplete, scanDate) {
        this.masterformat = null;
        this.percentComplete = null;
        this.scanDate = null;
        (0,_mixins_add_date_getter_and_setter_to_domain_model__WEBPACK_IMPORTED_MODULE_0__.default)(this, "scanDate");
        this.masterformat = masterformat || null;
        this.percentComplete = percentComplete || null;
        this.scanDate = scanDate;
    }
    return ProjectMasterformatProgress;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProjectMasterformatProgress);


/***/ }),

/***/ 2224:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimeSeriesTsvAnalysisTypes": () => (/* binding */ TimeSeriesTsvAnalysisTypes)
/* harmony export */ });
var TimeSeriesTsvAnalysisTypes = {
    ANALYSIS_4D: {
        uploadButtonContent: "Upload 4d Analysis.tsv",
        uploadButtonId: "scanned-project-masterformat-progress-uploader",
    },
    SCHEDULE_4D: {
        uploadButtonContent: "Upload 4d Schedule.tsv",
        uploadButtonId: "scheduled-project-masterformat-progress-uploader",
    },
    ANALYSIS_5D: {
        uploadButtonContent: "Upload 5d Analysis.tsv",
        uploadButtonId: "analysis-for-5d",
    }
};


/***/ }),

/***/ 2933:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 9142:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeviationStatus": () => (/* binding */ DeviationStatus),
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

/***/ 8367:
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

/***/ 2453:
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

/***/ 8322:
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

/***/ 6975:
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

/***/ 5019:
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
    Pipelines["PIPELINE_STEPS"] = "pipeline-steps";
    Pipelines["DOWNSAMPLE_SCAN"] = "downsample-scan";
    Pipelines["CONVERT_IFC_AND_PROCESS_SCANS"] = "convert-ifc-and-process-scans";
    Pipelines["DOWNLOAD_AND_ZIP_PROJECT_FILES_FOLDER"] = "download-and-zip-project-files-folder";
    Pipelines["INGEST_EXTERNAL_PHOTO_PROJECT_DATA"] = "ingest-external-photo-project-data";
    Pipelines["GENERATE_IFC"] = "generate-ifc";
    Pipelines["CREATE_AND_PROCESS_SVF"] = "create-and-process-svf";
    Pipelines["CONVERT_E57_TO_LAS"] = "convert-e57-to-las";
})(Pipelines || (Pipelines = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pipelines);


/***/ }),

/***/ 5295:
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
    PROJECT_FOLDER_ZIP: ProjectPurposeType.PROJECT_FOLDER_ZIP,
};
var isPurposeType = function (type) { return Object.values(PurposeTypeMap)
    .some(function (purposeType) { return type === purposeType; }); };
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
var uploadHistoryPurposeTypes = [
    RAW_SCAN,
    OTHER
];
var floorPurposeTypes = [
    BIM_IFC,
    BIM_NWD,
    GRID_IFC,
    BIM_MESH_GLB,
    BIM_MESH_OBJ,
    BIM_TEXTURE_MTL,
    VIEWER_BIM_MESH_OBJ,
    PLANNED_CLOUD_ZIP,
    SVF
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PurposeTypeMap);


/***/ }),

/***/ 2990:
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

/***/ 2252:
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

/***/ 9875:
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

/***/ 9884:
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

/***/ 6132:
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

/***/ 1922:
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

/***/ 8445:
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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ResponseError = /** @class */ (function (_super) {
    __extends(ResponseError, _super);
    function ResponseError(message, verboseMessage, response, responseBody) {
        var _this = _super.call(this, message) || this;
        _this.name = "ResponseError";
        _this.message = message;
        _this.verboseMessage = verboseMessage;
        _this.status = response.status;
        _this.responseBody = responseBody;
        return _this;
    }
    return ResponseError;
}((external_extendable_error_class_default())));
/* harmony default export */ const response_error = (ResponseError);


/***/ }),

/***/ 7583:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_response_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8445);
/* harmony import */ var _resources_response_statuses_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(297);
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5562);



var checkFetchStatus = function (response) {
    //@ts-ignore
    if (typeof response == "string" || !response.headers)
        return Promise.resolve(response);
    var requestPath = response.url.split(_http__WEBPACK_IMPORTED_MODULE_2__.default.baseUrl()).join("..."); // split and join to replace text
    if (response.headers.has("Warning")) {
        console.warn("Warning present in response: " + response.headers.get("Warning") + "\nfrom: `" + requestPath + "`");
    }
    if (response.ok) {
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json().then(function (body) {
                return body;
            });
        }
        else {
            return response.text().then(function (text) {
                return text;
            });
        }
    }
    else {
        return response.json().then(function (errorBody) {
            var message = errorBody.message;
            var statusMessage = _resources_response_statuses_json__WEBPACK_IMPORTED_MODULE_1__[response.status];
            var verboseMessage = response.status + " " + statusMessage + ": '" + message + "' at `" + requestPath + "`";
            var error = new _models_response_error__WEBPACK_IMPORTED_MODULE_0__.default(message, verboseMessage, response, errorBody);
            console.error(error);
            throw error;
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkFetchStatus);


/***/ }),

/***/ 5561:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GatewayUser": () => (/* binding */ GatewayUser),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6132);

var GatewayUser = /** @class */ (function () {
    function GatewayUser(authType, idToken, role) {
        this.authType = authType;
        this.gatewayUser = {
            idToken: idToken,
            role: role
        };
    }
    return GatewayUser;
}());

var getAuthorizationHeaders = function (user) {
    if (!user) {
        return null;
    }
    switch (user === null || user === void 0 ? void 0 : user.authType) {
        case _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_0__.GATEWAY_JWT: {
            return {
                Authorization: "Bearer " + user.gatewayUser.idToken
            };
        }
        case _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_0__.BASIC: {
            return {
                Authorization: "Basic " + Buffer.from(user.username + ":" + user.password).toString("base64")
            };
        }
        case _models_enums_user_auth_type__WEBPACK_IMPORTED_MODULE_0__.FIREBASE: {
            return {
                firebaseIdToken: user.firebaseUser.idToken
            };
        }
        default: {
            console.warn("no authentication");
            return null;
        }
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getAuthorizationHeaders);


/***/ }),

/***/ 5562:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5561);
/* harmony import */ var _request_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4446);
/* harmony import */ var _reduce_user_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5397);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5508);
/* provided dependency */ var fetch = __webpack_require__(6786);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var Http = /** @class */ (function () {
    function Http() {
    }
    Http.fetch = function (url, data) {
        if (_config__WEBPACK_IMPORTED_MODULE_2__.default.getConfiguration().logFetch) {
            console.log("Calling fetch with:", url, data);
        }
        return fetch(url, data);
    };
    Http.get = function (url, user, contentType) {
        if (contentType === void 0) { contentType = "application/json"; }
        return Http.fetch(url, {
            method: "GET",
            headers: __assign(__assign({}, (0,_request_headers__WEBPACK_IMPORTED_MODULE_1__.httpGetHeaders)(contentType)), (0,_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user))
        });
    };
    Http.delete = function (url, user) {
        return Http.fetch(url, {
            method: "DELETE",
            headers: __assign(__assign({}, _request_headers__WEBPACK_IMPORTED_MODULE_1__.httpPostHeaders), (0,_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user))
        });
    };
    Http.post = function (url, user, body) {
        return Http.fetch(url, {
            method: "POST",
            headers: __assign(__assign({}, _request_headers__WEBPACK_IMPORTED_MODULE_1__.httpPostHeaders), (0,_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user)),
            body: JSON.stringify(body)
        });
    };
    Http.patch = function (url, user, body) {
        return Http.fetch(url, {
            method: "PATCH",
            headers: __assign(__assign({}, _request_headers__WEBPACK_IMPORTED_MODULE_1__.httpPostHeaders), (0,_get_authorization_headers__WEBPACK_IMPORTED_MODULE_0__.default)(user)),
            body: JSON.stringify(body)
        });
    };
    Http.addAuthToDownloadUrl = function (baseUrl, user) {
        if (user) {
            if ((0,_reduce_user_session__WEBPACK_IMPORTED_MODULE_3__.isGatewayUser)(user)) {
                return baseUrl + "?auth=" + user.gatewayUser.idToken;
            }
            else if ((0,_reduce_user_session__WEBPACK_IMPORTED_MODULE_3__.isFirebaseUser)(user)) {
                return baseUrl + "?firebaseAuth=" + user.firebaseUser.idToken;
            }
        }
        else {
            return baseUrl;
        }
    };
    Http.baseUrl = function () { return _config__WEBPACK_IMPORTED_MODULE_2__.default.getConfiguration().AVVIR_GATEWAY_URL; };
    return Http;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Http);


/***/ }),

/***/ 6289:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _check_fetch_status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7583);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5508);
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};



var makeErrorsPrettyForFunction = function (actionName, action) {
    return function () {
        var argumentList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argumentList[_i] = arguments[_i];
        }
        return action.apply(void 0, __spreadArray([], __read(argumentList))).then(_check_fetch_status__WEBPACK_IMPORTED_MODULE_1__.default)
            .catch(function (error) {
            return _config__WEBPACK_IMPORTED_MODULE_2__.default.sharedErrorHandler({
                error: error,
                action: actionName,
                arguments: argumentList
            });
        });
    };
};
var getFunctionNames = function (clazz) {
    var builtinProperties = ["length", "constructor", "name", "prototype"];
    // TODO it might make sense to check the type of each property
    return underscore__WEBPACK_IMPORTED_MODULE_0___default().without.apply((underscore__WEBPACK_IMPORTED_MODULE_0___default()), __spreadArray([Object.getOwnPropertyNames(clazz)], __read(builtinProperties)));
};
var makeErrorsPretty = function (apiClass, options) {
    if (options === void 0) { options = { exclude: [] }; }
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

/***/ 541:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pollPipeline": () => (/* binding */ pollPipeline)
/* harmony export */ });
/* harmony import */ var _avvir_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5489);
/* harmony import */ var _models_enums_running_process_status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2990);


var pollPipeline = function (pipelineResponse, user, maxIterations, pollTimeout, index) {
    if (maxIterations === void 0) { maxIterations = 200; }
    if (pollTimeout === void 0) { pollTimeout = 1000; }
    if (index === void 0) { index = 0; }
    console.log("Checking Pipeline:", index + " of " + maxIterations + " iterations");
    var projectId = pipelineResponse.firebaseProjectId;
    return new Promise(function (resolve, reject) {
        _avvir_api__WEBPACK_IMPORTED_MODULE_0__.default.other.checkPipelineStatus({ projectId: projectId }, pipelineResponse.id, user)
            .then(function (response) {
            // console.log(index, response);
            if (index > maxIterations) {
                reject("Too Many Calls: Check endpoint to make sure the implementation isn't flawed.");
            }
            else if (response.status !== _models_enums_running_process_status__WEBPACK_IMPORTED_MODULE_1__.default.COMPLETED) {
                setTimeout(function () { return resolve(pollPipeline(response, user, maxIterations, pollTimeout, ++index)); }, pollTimeout);
            }
            else {
                resolve(response);
            }
        });
    });
};


/***/ }),

/***/ 5397:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFirebaseUser": () => (/* binding */ isFirebaseUser),
/* harmony export */   "isGatewayUser": () => (/* binding */ isGatewayUser)
/* harmony export */ });
var isFirebaseUser = function (user) { var _a; return !!((_a = user) === null || _a === void 0 ? void 0 : _a.firebaseUser); };
var isGatewayUser = function (user) { var _a; return !!((_a = user) === null || _a === void 0 ? void 0 : _a.gatewayUser); };


/***/ }),

/***/ 4446:
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
        "Accept": contentType || "application/json",
    };
}
makeGetHeaders.Accept = "application/json";
var httpGetHeaders = makeGetHeaders;


/***/ }),

/***/ 1848:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);

var serializeForm = function (form) {
    return underscore__WEBPACK_IMPORTED_MODULE_0___default()(form).reduce(function (piecesSoFar, value, field) {
        piecesSoFar.push(encodeURIComponent(field) + "=" + encodeURIComponent(value));
        return piecesSoFar;
    }, []).join("&");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (serializeForm);


/***/ }),

/***/ 297:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"100":"Continue","101":"Switching Protocol","102":"Processing (WebDAV)","103":"Early Hints","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status (WebDAV)","208":"Multi-Status (WebDAV)","226":"IM Used (HTTP Delta encoding)","300":"Multiple Choice","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","306":"unused","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Requested Range Not Satisfiable","417":"Expectation Failed","418":"I\'m a teapot","421":"Misdirected Request","422":"Unprocessable Entity (WebDAV)","423":"Locked (WebDAV)","424":"Failed Dependency (WebDAV)","425":"Too Early","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected (WebDAV)","510":"Not Extended","511":"Network Authentication Required","100_detailed":"This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.","101_detailed":"This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching to.","102_detailed":"This code indicates that the server has received and is processing the request, but no response is available yet.","103_detailed":"This status code is primarily intended to be used with the Link header to allow the user agent to start preloading resources while the server is still preparing a response.","200_detailed":"The request has succeeded. The meaning of a success varies depending on the HTTP method:\\n  GET: The resource has been fetched and is transmitted in the message body.\\n  HEAD: The entity headers are in the message body.\\n  PUT or POST: The resource describing the result of the action is transmitted in the message body.\\n  TRACE: The message body contains the request message as received by the server","201_detailed":"The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a POST request, or after some PUT requests.","202_detailed":"The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.","203_detailed":"This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.","204_detailed":"There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.","205_detailed":"This response code is sent after accomplishing request to tell user agent reset document view which sent this request.","206_detailed":"This response code is used because of range header sent by the client to separate download into multiple streams.","207_detailed":"A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.","208_detailed":"Used inside a DAV: propstat response element to avoid enumerating the internal members of multiple bindings to the same collection repeatedly.","226_detailed":"The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.","300_detailed":"The request has more than one possible response. The user-agent or user should choose one of them. There is no standardized way of choosing one of the responses.","301_detailed":"This response code means that the URI of the requested resource has been changed. Probably, the new URI would be given in the response.","302_detailed":"This response code means that the URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.","303_detailed":"The server sent this response to direct the client to get the requested resource at another URI with a GET request.","304_detailed":"This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.","305_detailed":"Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.","306_detailed":"This response code is no longer used, it is just reserved currently. It was used in a previous version of the HTTP 1.1 specification.","307_detailed":"The server sends this response to direct the client to get the requested resource at another URI with same method that was used in the prior request. This has the same semantics as the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: If a POST was used in the first request, a POST must be used in the second request.","308_detailed":"This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: If a POST was used in the first request, a POST must be used in the second request.","400_detailed":"This response means that server could not understand the request due to invalid syntax.","401_detailed":"Although the HTTP standard specifies \\"unauthorized\\", semantically this response means \\"unauthenticated\\". That is, the client must authenticate itself to get the requested response.","402_detailed":"This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.","403_detailed":"The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client\'s identity is known to the server.","404_detailed":"The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.","405_detailed":"The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.","406_detailed":"This response is sent when the web server, after performing server-driven content negotiation, doesn\'t find any content following the criteria given by the user agent.","407_detailed":"This is similar to 401 but authentication is needed to be done by a proxy.","408_detailed":"This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.","409_detailed":"This response is sent when a request conflicts with the current state of the server.","410_detailed":"This response would be sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for \\"limited-time, promotional services\\". APIs should not feel compelled to indicate resources that have been deleted with this status code.","411_detailed":"Server rejected the request because the Content-Length header field is not defined and the server requires it.","412_detailed":"The client has indicated preconditions in its headers which the server does not meet.","413_detailed":"Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.","414_detailed":"The URI requested by the client is longer than the server is willing to interpret.","415_detailed":"The media format of the requested data is not supported by the server, so the server is rejecting the request.","416_detailed":"The range specified by the Range header field in the request can\'t be fulfilled; it\'s possible that the range is outside the size of the target URI\'s data.","417_detailed":"This response code means the expectation indicated by the Expect request header field can\'t be met by the server.","418_detailed":"The server refuses the attempt to brew coffee with a teapot.","421_detailed":"The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.","422_detailed":"The request was well-formed but was unable to be followed due to semantic errors.","423_detailed":"The resource that is being accessed is locked.","424_detailed":"The request failed due to failure of a previous request.","425_detailed":"Indicates that the server is unwilling to risk processing a request that might be replayed.","426_detailed":"The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol(s).","428_detailed":"The origin server requires the request to be conditional. Intended to prevent the \'lost update\' problem, where a client GETs a resource\'s state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.","429_detailed":"The user has sent too many requests in a given amount of time (\\"rate limiting\\").","431_detailed":"The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.","451_detailed":"The user requests an illegal resource, such as a web page censored by a government.","500_detailed":"The server has encountered a situation it doesn\'t know how to handle.","501_detailed":"The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.","502_detailed":"This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.","503_detailed":"The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.","504_detailed":"This error response is given when the server is acting as a gateway and cannot get a response in time.","505_detailed":"The HTTP version used in the request is not supported by the server.","506_detailed":"The server has an internal configuration error: transparent content negotiation for the request results in a circular reference.","507_detailed":"The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.","508_detailed":"The server detected an infinite loop while processing the request.","510_detailed":"Further extensions to the request are required for the server to fulfill it.","511_detailed":"The 511 status code indicates that the client needs to authenticate to gain network access."}');

/***/ }),

/***/ 5422:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./api/auth_api.ts": 320,
	"./api/element_api.ts": 7325,
	"./api/file_information_api.ts": 9513,
	"./api/floor_api.ts": 2010,
	"./api/organization_api.ts": 9940,
	"./api/photo_area_api.ts": 5817,
	"./api/pipeline_api.ts": 4393,
	"./api/project_api.ts": 555,
	"./api/scan_dataset_api.ts": 4835,
	"./api/web_gateway_api.ts": 7146,
	"./avvir_api.ts": 5489,
	"./config.ts": 5508,
	"./converters/date_converter.ts": 2024,
	"./converters/matrix_3_converter.ts": 28,
	"./converters/matrix_4_converter.ts": 2908,
	"./converters/purpose_type_converter.ts": 6154,
	"./mixins/add_date_getter_and_setter_to_domain_model.ts": 6553,
	"./mixins/add_instant_getter_and_setter_to_api_model.ts": 1142,
	"./mixins/add_logging_to_instance_methods.ts": 5953,
	"./mixins/add_read_only_properties_to_model.ts": 5025,
	"./models/api/api_argo_response.ts": 8450,
	"./models/api/api_cloud_file.ts": 277,
	"./models/api/api_construction_grid.ts": 7117,
	"./models/api/api_floor.ts": 1596,
	"./models/api/api_grid_line.ts": 2179,
	"./models/api/api_invitation.ts": 5515,
	"./models/api/api_masterformat.ts": 8069,
	"./models/api/api_matrix_3.ts": 7494,
	"./models/api/api_matrix_4.ts": 6645,
	"./models/api/api_organization.ts": 6835,
	"./models/api/api_photo_area.ts": 9297,
	"./models/api/api_photo_location.ts": 1390,
	"./models/api/api_photo_session.ts": 3379,
	"./models/api/api_pipeline.ts": 5621,
	"./models/api/api_planned_element.ts": 6099,
	"./models/api/api_project.ts": 933,
	"./models/api/api_project_cost_analysis_progress.ts": 4819,
	"./models/api/api_project_masterformat_progress.ts": 6061,
	"./models/api/api_purpose_type.ts": 3979,
	"./models/api/api_scan_dataset.ts": 1866,
	"./models/api/deprecated_api_pipeline.ts": 6732,
	"./models/domain/detailed_element.ts": 7073,
	"./models/domain/masterformat.ts": 8643,
	"./models/domain/photos/photo_area.ts": 3946,
	"./models/domain/photos/photo_location.ts": 5445,
	"./models/domain/photos/photo_session.ts": 4519,
	"./models/domain/progress/progress_category.ts": 6418,
	"./models/domain/progress/progress_report_for_scan_dataset.ts": 8817,
	"./models/domain/progress/project_cost_analysis_progress.ts": 5605,
	"./models/domain/progress/project_masterformat_progress.ts": 9459,
	"./models/domain/progress/time_series_tsv_analysis_types.ts": 2224,
	"./models/domain/running_process.ts": 2933,
	"./models/enums/deviation_status.ts": 9142,
	"./models/enums/event_types.ts": 8367,
	"./models/enums/notification_level.ts": 2453,
	"./models/enums/page_names.ts": 8322,
	"./models/enums/photo_projection_type.ts": 6975,
	"./models/enums/pipeline_types.ts": 5019,
	"./models/enums/purpose_type.ts": 5295,
	"./models/enums/running_process_status.ts": 2990,
	"./models/enums/scan_label.ts": 2252,
	"./models/enums/system_of_measurement.ts": 9875,
	"./models/enums/uploader_status.ts": 9884,
	"./models/enums/user_auth_type.ts": 6132,
	"./models/enums/user_role.ts": 1922,
	"./models/response_error.ts": 8445,
	"./utilities/check_fetch_status.ts": 7583,
	"./utilities/get_authorization_headers.ts": 5561,
	"./utilities/http.ts": 5562,
	"./utilities/make_errors_pretty.ts": 6289,
	"./utilities/pollPipeline.ts": 541,
	"./utilities/reduce_user_session.ts": 5397,
	"./utilities/request_headers.ts": 4446,
	"./utilities/serialize_form.ts": 1848
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

/***/ 6786:
/***/ ((module) => {

"use strict";
module.exports = require("node-fetch");;

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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _source_avvir_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5489);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2164);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_1__);



const Avvir = {
  api: _source_avvir_api__WEBPACK_IMPORTED_MODULE_0__.default
};

function importAll(directoryContext, target) {
  directoryContext.keys().forEach(filePath => {

    let moduleExports = directoryContext(filePath);
    underscore__WEBPACK_IMPORTED_MODULE_1___default().forEach(moduleExports, (moduleExport, exportName) => {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Avvir);

})();

__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});