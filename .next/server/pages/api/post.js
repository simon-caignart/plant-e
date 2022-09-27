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
exports.id = "pages/api/post";
exports.ids = ["pages/api/post"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// Docs about instantiating `PrismaClient` with Next.js:\n// https://pris.ly/d/help/next-js-best-practices\nlet prisma;\nif (false) {} else {\n    if (!global.prisma) {\n        global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n    }\n    prisma = global.prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxFQUF3RDtBQUN4RCxFQUFnRDtBQUVoRCxHQUFHLENBQUNDLE1BQU07QUFFVixFQUFFLEVBUEYsS0FPeUMsRUFBRSxFQUUxQyxNQUFNLENBQUM7SUFDTixFQUFFLEdBQUdDLE1BQU0sQ0FBQ0QsTUFBTSxFQUFFLENBQUM7UUFDbkJDLE1BQU0sQ0FBQ0QsTUFBTSxHQUFHLEdBQUcsQ0FBQ0Qsd0RBQVk7SUFDbEMsQ0FBQztJQUNEQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ0QsTUFBTTtBQUN4QixDQUFDO0FBRUQsaUVBQWVBLE1BQU0sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Fycm9zZXVyMjAwMC8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuLy8gRG9jcyBhYm91dCBpbnN0YW50aWF0aW5nIGBQcmlzbWFDbGllbnRgIHdpdGggTmV4dC5qczpcbi8vIGh0dHBzOi8vcHJpcy5seS9kL2hlbHAvbmV4dC1qcy1iZXN0LXByYWN0aWNlc1xuXG5sZXQgcHJpc21hOiBQcmlzbWFDbGllbnQ7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xufSBlbHNlIHtcbiAgaWYgKCFnbG9iYWwucHJpc21hKSB7XG4gICAgZ2xvYmFsLnByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcbiAgfVxuICBwcmlzbWEgPSBnbG9iYWwucHJpc21hO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWE7XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2xvYmFsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./pages/api/post/index.ts":
/*!*********************************!*\
  !*** ./pages/api/post/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n\n\n// POST /api/post\n// Required fields in body: title\n// Optional fields in body: content\nasync function handle(req, res) {\n    const { title , content  } = req.body;\n    const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({\n        req\n    });\n    const result = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post.create({\n        data: {\n            title: title,\n            content: content,\n            author: {\n                connect: {\n                    email: session?.user?.email\n                }\n            }\n        }\n    });\n    res.json(result);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcG9zdC9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTRDO0FBQ0o7QUFFeEMsRUFBaUI7QUFDakIsRUFBaUM7QUFDakMsRUFBbUM7QUFDcEIsZUFBZUUsTUFBTSxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRSxDQUFDO0lBQzlDLEtBQUssQ0FBQyxDQUFDLENBQUNDLEtBQUssR0FBRUMsT0FBTyxFQUFDLENBQUMsR0FBR0gsR0FBRyxDQUFDSSxJQUFJO0lBRW5DLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLEtBQUssQ0FBQ1IsMkRBQVUsQ0FBQyxDQUFDO1FBQUNHLEdBQUc7SUFBQyxDQUFDO0lBQ3hDLEtBQUssQ0FBQ00sTUFBTSxHQUFHLEtBQUssQ0FBQ1IsK0RBQWtCLENBQUMsQ0FBQztRQUN2Q1csSUFBSSxFQUFFLENBQUM7WUFDTFAsS0FBSyxFQUFFQSxLQUFLO1lBQ1pDLE9BQU8sRUFBRUEsT0FBTztZQUNoQk8sTUFBTSxFQUFFLENBQUM7Z0JBQUNDLE9BQU8sRUFBRSxDQUFDO29CQUFDQyxLQUFLLEVBQUVQLE9BQU8sRUFBRVEsSUFBSSxFQUFFRCxLQUFLO2dCQUFDLENBQUM7WUFBQyxDQUFDO1FBQ3RELENBQUM7SUFDSCxDQUFDO0lBQ0RYLEdBQUcsQ0FBQ2EsSUFBSSxDQUFDUixNQUFNO0FBQ2pCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcnJvc2V1cjIwMDAvLi9wYWdlcy9hcGkvcG9zdC9pbmRleC50cz84M2Y1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoL3JlYWN0XCI7XG5pbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi8uLi9saWIvcHJpc21hXCI7XG5cbi8vIFBPU1QgL2FwaS9wb3N0XG4vLyBSZXF1aXJlZCBmaWVsZHMgaW4gYm9keTogdGl0bGVcbi8vIE9wdGlvbmFsIGZpZWxkcyBpbiBib2R5OiBjb250ZW50XG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGUocmVxLCByZXMpIHtcbiAgY29uc3QgeyB0aXRsZSwgY29udGVudCB9ID0gcmVxLmJvZHk7XG5cbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oeyByZXEgfSk7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHByaXNtYS5wb3N0LmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgIGF1dGhvcjogeyBjb25uZWN0OiB7IGVtYWlsOiBzZXNzaW9uPy51c2VyPy5lbWFpbCB9IH0sXG4gICAgfSxcbiAgfSk7XG4gIHJlcy5qc29uKHJlc3VsdCk7XG59Il0sIm5hbWVzIjpbImdldFNlc3Npb24iLCJwcmlzbWEiLCJoYW5kbGUiLCJyZXEiLCJyZXMiLCJ0aXRsZSIsImNvbnRlbnQiLCJib2R5Iiwic2Vzc2lvbiIsInJlc3VsdCIsInBvc3QiLCJjcmVhdGUiLCJkYXRhIiwiYXV0aG9yIiwiY29ubmVjdCIsImVtYWlsIiwidXNlciIsImpzb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/post/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/post/index.ts"));
module.exports = __webpack_exports__;

})();