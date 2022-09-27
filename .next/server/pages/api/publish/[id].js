"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/publish/[id]";
exports.ids = ["pages/api/publish/[id]"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// Docs about instantiating `PrismaClient` with Next.js:\n// https://pris.ly/d/help/next-js-best-practices\nlet prisma;\nif (false) {} else {\n    if (!global.prisma) {\n        global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n    }\n    prisma = global.prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxFQUF3RDtBQUN4RCxFQUFnRDtBQUVoRCxHQUFHLENBQUNDLE1BQU07QUFFVixFQUFFLEVBUEYsS0FPeUMsRUFBRSxFQUUxQyxNQUFNLENBQUM7SUFDTixFQUFFLEdBQUdDLE1BQU0sQ0FBQ0QsTUFBTSxFQUFFLENBQUM7UUFDbkJDLE1BQU0sQ0FBQ0QsTUFBTSxHQUFHLEdBQUcsQ0FBQ0Qsd0RBQVk7SUFDbEMsQ0FBQztJQUNEQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0QsTUFBTTtBQUN4QixDQUFDO0FBRUQsaUVBQWVBLE1BQU0sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Fycm9zZXVyMjAwMC8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuLy8gRG9jcyBhYm91dCBpbnN0YW50aWF0aW5nIGBQcmlzbWFDbGllbnRgIHdpdGggTmV4dC5qczpcbi8vIGh0dHBzOi8vcHJpcy5seS9kL2hlbHAvbmV4dC1qcy1iZXN0LXByYWN0aWNlc1xuXG5sZXQgcHJpc21hOiBQcmlzbWFDbGllbnQ7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xufSBlbHNlIHtcbiAgaWYgKCFnbG9iYWwucHJpc21hKSB7XG4gICAgZ2xvYmFsLnByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcbiAgfVxuICBwcmlzbWEgPSBnbG9iYWwucHJpc21hO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2xvYmFsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./pages/api/publish/[id].ts":
/*!***********************************!*\
  !*** ./pages/api/publish/[id].ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n\n// PUT /api/publish/:id\nasync function handle(req, res) {\n    const postId = req.query.id;\n    const post = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post.update({\n        where: {\n            id: postId\n        },\n        data: {\n            published: true\n        }\n    });\n    res.json(post);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcHVibGlzaC9baWRdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXdDO0FBRXhDLEVBQXVCO0FBQ1IsZUFBZUMsTUFBTSxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRSxDQUFDO0lBQzlDLEtBQUssQ0FBQ0MsTUFBTSxHQUFHRixHQUFHLENBQUNHLEtBQUssQ0FBQ0MsRUFBRTtJQUMzQixLQUFLLENBQUNDLElBQUksR0FBRyxLQUFLLENBQUNQLCtEQUFrQixDQUFDLENBQUM7UUFDckNTLEtBQUssRUFBRSxDQUFDO1lBQUNILEVBQUUsRUFBRUYsTUFBTTtRQUFDLENBQUM7UUFDckJNLElBQUksRUFBRSxDQUFDO1lBQUNDLFNBQVMsRUFBRSxJQUFJO1FBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0RSLEdBQUcsQ0FBQ1MsSUFBSSxDQUFDTCxJQUFJO0FBQ2YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Fycm9zZXVyMjAwMC8uL3BhZ2VzL2FwaS9wdWJsaXNoL1tpZF0udHM/ZWRhNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi8uLi9saWIvcHJpc21hXCI7XG5cbi8vIFBVVCAvYXBpL3B1Ymxpc2gvOmlkXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGUocmVxLCByZXMpIHtcbiAgY29uc3QgcG9zdElkID0gcmVxLnF1ZXJ5LmlkO1xuICBjb25zdCBwb3N0ID0gYXdhaXQgcHJpc21hLnBvc3QudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZDogcG9zdElkIH0sXG4gICAgZGF0YTogeyBwdWJsaXNoZWQ6IHRydWUgfSxcbiAgfSk7XG4gIHJlcy5qc29uKHBvc3QpO1xufSJdLCJuYW1lcyI6WyJwcmlzbWEiLCJoYW5kbGUiLCJyZXEiLCJyZXMiLCJwb3N0SWQiLCJxdWVyeSIsImlkIiwicG9zdCIsInVwZGF0ZSIsIndoZXJlIiwiZGF0YSIsInB1Ymxpc2hlZCIsImpzb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/publish/[id].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/publish/[id].ts"));
module.exports = __webpack_exports__;

})();