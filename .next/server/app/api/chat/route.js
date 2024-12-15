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
exports.id = "app/api/chat/route";
exports.ids = ["app/api/chat/route"];
exports.modules = {

/***/ "@aws-sdk/client-s3":
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("node:stream/web");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Fjeremywilliams%2FDocuments%2FGitHub%2Fdata-saas%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjeremywilliams%2FDocuments%2FGitHub%2Fdata-saas&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Fjeremywilliams%2FDocuments%2FGitHub%2Fdata-saas%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjeremywilliams%2FDocuments%2FGitHub%2Fdata-saas&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_jeremywilliams_Documents_GitHub_data_saas_src_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/chat/route.ts */ \"(rsc)/./src/app/api/chat/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/route\",\n        pathname: \"/api/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/route\"\n    },\n    resolvedPagePath: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/app/api/chat/route.ts\",\n    nextConfigOutput,\n    userland: _Users_jeremywilliams_Documents_GitHub_data_saas_src_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/chat/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmplcmVteXdpbGxpYW1zJTJGRG9jdW1lbnRzJTJGR2l0SHViJTJGZGF0YS1zYWFzJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmplcmVteXdpbGxpYW1zJTJGRG9jdW1lbnRzJTJGR2l0SHViJTJGZGF0YS1zYWFzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQzBCO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDNko7O0FBRTdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGF0YS12aXotcGxhdGZvcm0vP2NjMjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2plcmVteXdpbGxpYW1zL0RvY3VtZW50cy9HaXRIdWIvZGF0YS1zYWFzL3NyYy9hcHAvYXBpL2NoYXQvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NoYXQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jaGF0XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jaGF0L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2plcmVteXdpbGxpYW1zL0RvY3VtZW50cy9HaXRIdWIvZGF0YS1zYWFzL3NyYy9hcHAvYXBpL2NoYXQvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvY2hhdC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Fjeremywilliams%2FDocuments%2FGitHub%2Fdata-saas%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjeremywilliams%2FDocuments%2FGitHub%2Fdata-saas&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/chat/route.ts":
/*!***********************************!*\
  !*** ./src/app/api/chat/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/jwt */ \"(rsc)/./node_modules/next-auth/jwt/index.js\");\n/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_jwt__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var _lib_s3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/s3 */ \"(rsc)/./src/lib/s3.ts\");\n/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nanoid */ \"(rsc)/./node_modules/nanoid/index.js\");\n/* harmony import */ var _lib_openai__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/openai */ \"(rsc)/./src/lib/openai.ts\");\n\n\n\n\n\n\nasync function POST(request) {\n    try {\n        const token = await (0,next_auth_jwt__WEBPACK_IMPORTED_MODULE_1__.getToken)({\n            req: request\n        });\n        if (!token) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const formData = await request.formData();\n        const message = formData.get(\"message\");\n        const files = formData.getAll(\"files\");\n        const model = formData.get(\"model\") || \"gpt-3.5-turbo\";\n        if (!message && files.length === 0) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"No message or files provided\"\n            }, {\n                status: 400\n            });\n        }\n        const userId = token.sub;\n        // Create or get existing chat\n        let chat = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].chat.findFirst({\n            where: {\n                userId,\n                active: true\n            },\n            include: {\n                messages: {\n                    orderBy: {\n                        createdAt: \"asc\"\n                    },\n                    take: 10\n                }\n            }\n        });\n        if (!chat) {\n            const title = await (0,_lib_openai__WEBPACK_IMPORTED_MODULE_4__.generateTitle)(message);\n            chat = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].chat.create({\n                data: {\n                    userId,\n                    active: true,\n                    title\n                },\n                include: {\n                    messages: true\n                }\n            });\n        }\n        // Handle file uploads\n        const fileUrls = [];\n        for (const file of files){\n            const fileKey = `${userId}/${chat.id}/${(0,nanoid__WEBPACK_IMPORTED_MODULE_5__.nanoid)()}-${file.name}`;\n            const fileUrl = await (0,_lib_s3__WEBPACK_IMPORTED_MODULE_3__.uploadToS3)(file, fileKey);\n            fileUrls.push(fileUrl);\n        }\n        // Create user message\n        const newMessage = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].message.create({\n            data: {\n                content: message,\n                chatId: chat.id,\n                role: \"user\",\n                files: fileUrls\n            }\n        });\n        // Prepare context for AI\n        const context = chat.messages.map((msg)=>({\n                role: msg.role,\n                content: msg.content\n            }));\n        context.push({\n            role: \"user\",\n            content: message\n        });\n        // Get AI response\n        const aiMessage = await (0,_lib_openai__WEBPACK_IMPORTED_MODULE_4__.getChatCompletion)(context, model);\n        // Save AI response\n        const aiResponse = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].message.create({\n            data: {\n                content: aiMessage.content || \"No response generated\",\n                chatId: chat.id,\n                role: \"assistant\"\n            }\n        });\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            message: newMessage,\n            response: aiResponse,\n            chatId: chat.id\n        });\n    } catch (error) {\n        console.error(\"Chat API error:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Failed to process chat message\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU83QyxrRkFBWUEsQ0FBQ1csSUFBSSxDQUFDO1lBQ3ZCSSxTQUFTMkI7WUFDVFMsVUFBVUQ7WUFDVk4sUUFBUXJCLEtBQUtlLEVBQUU7UUFDakI7SUFDRixFQUFFLE9BQU8xQixPQUFZO1FBQ25Cd0MsUUFBUXhDLEtBQUssQ0FBQyxtQkFBbUJBO1FBQ2pDLE9BQU9aLGtGQUFZQSxDQUFDVyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBaUMsR0FDMUM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXRhLXZpei1wbGF0Zm9ybS8uL3NyYy9hcHAvYXBpL2NoYXQvcm91dGUudHM/NDZiNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBnZXRUb2tlbiB9IGZyb20gJ25leHQtYXV0aC9qd3QnO1xuaW1wb3J0IHByaXNtYSBmcm9tICdAL2xpYi9wcmlzbWEnO1xuaW1wb3J0IHsgdXBsb2FkVG9TMyB9IGZyb20gJ0AvbGliL3MzJztcbmltcG9ydCB7IG5hbm9pZCB9IGZyb20gJ25hbm9pZCc7XG5pbXBvcnQgeyBnZXRDaGF0Q29tcGxldGlvbiwgZ2VuZXJhdGVUaXRsZSB9IGZyb20gJ0AvbGliL29wZW5haSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldFRva2VuKHsgcmVxOiByZXF1ZXN0IGFzIGFueSB9KTtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBmb3JtRGF0YSA9IGF3YWl0IHJlcXVlc3QuZm9ybURhdGEoKTtcbiAgICBjb25zdCBtZXNzYWdlID0gZm9ybURhdGEuZ2V0KCdtZXNzYWdlJykgYXMgc3RyaW5nO1xuICAgIGNvbnN0IGZpbGVzID0gZm9ybURhdGEuZ2V0QWxsKCdmaWxlcycpIGFzIEZpbGVbXTtcbiAgICBjb25zdCBtb2RlbCA9IGZvcm1EYXRhLmdldCgnbW9kZWwnKSBhcyAnZ3B0LTQnIHwgJ2dwdC0zLjUtdHVyYm8nIHx8ICdncHQtMy41LXR1cmJvJztcblxuICAgIGlmICghbWVzc2FnZSAmJiBmaWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm8gbWVzc2FnZSBvciBmaWxlcyBwcm92aWRlZCcgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VySWQgPSB0b2tlbi5zdWIgYXMgc3RyaW5nO1xuXG4gICAgLy8gQ3JlYXRlIG9yIGdldCBleGlzdGluZyBjaGF0XG4gICAgbGV0IGNoYXQgPSBhd2FpdCBwcmlzbWEuY2hhdC5maW5kRmlyc3Qoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICB9LFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICBtZXNzYWdlczoge1xuICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogJ2FzYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0YWtlOiAxMCwgLy8gR2V0IGxhc3QgMTAgbWVzc2FnZXMgZm9yIGNvbnRleHRcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIWNoYXQpIHtcbiAgICAgIGNvbnN0IHRpdGxlID0gYXdhaXQgZ2VuZXJhdGVUaXRsZShtZXNzYWdlKTtcbiAgICAgIGNoYXQgPSBhd2FpdCBwcmlzbWEuY2hhdC5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgfSxcbiAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgIG1lc3NhZ2VzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGZpbGUgdXBsb2Fkc1xuICAgIGNvbnN0IGZpbGVVcmxzID0gW107XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBjb25zdCBmaWxlS2V5ID0gYCR7dXNlcklkfS8ke2NoYXQuaWR9LyR7bmFub2lkKCl9LSR7ZmlsZS5uYW1lfWA7XG4gICAgICBjb25zdCBmaWxlVXJsID0gYXdhaXQgdXBsb2FkVG9TMyhmaWxlLCBmaWxlS2V5KTtcbiAgICAgIGZpbGVVcmxzLnB1c2goZmlsZVVybCk7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHVzZXIgbWVzc2FnZVxuICAgIGNvbnN0IG5ld01lc3NhZ2UgPSBhd2FpdCBwcmlzbWEubWVzc2FnZS5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBjb250ZW50OiBtZXNzYWdlLFxuICAgICAgICBjaGF0SWQ6IGNoYXQuaWQsXG4gICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgZmlsZXM6IGZpbGVVcmxzLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIFByZXBhcmUgY29udGV4dCBmb3IgQUlcbiAgICBjb25zdCBjb250ZXh0ID0gY2hhdC5tZXNzYWdlcy5tYXAobXNnID0+ICh7XG4gICAgICByb2xlOiBtc2cucm9sZSBhcyAndXNlcicgfCAnYXNzaXN0YW50JyxcbiAgICAgIGNvbnRlbnQ6IG1zZy5jb250ZW50LFxuICAgIH0pKTtcbiAgICBjb250ZXh0LnB1c2goeyByb2xlOiAndXNlcicsIGNvbnRlbnQ6IG1lc3NhZ2UgfSk7XG5cbiAgICAvLyBHZXQgQUkgcmVzcG9uc2VcbiAgICBjb25zdCBhaU1lc3NhZ2UgPSBhd2FpdCBnZXRDaGF0Q29tcGxldGlvbihjb250ZXh0LCBtb2RlbCk7XG5cbiAgICAvLyBTYXZlIEFJIHJlc3BvbnNlXG4gICAgY29uc3QgYWlSZXNwb25zZSA9IGF3YWl0IHByaXNtYS5tZXNzYWdlLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNvbnRlbnQ6IGFpTWVzc2FnZS5jb250ZW50IHx8ICdObyByZXNwb25zZSBnZW5lcmF0ZWQnLFxuICAgICAgICBjaGF0SWQ6IGNoYXQuaWQsXG4gICAgICAgIHJvbGU6ICdhc3Npc3RhbnQnLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IFxuICAgICAgbWVzc2FnZTogbmV3TWVzc2FnZSxcbiAgICAgIHJlc3BvbnNlOiBhaVJlc3BvbnNlLFxuICAgICAgY2hhdElkOiBjaGF0LmlkXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdDaGF0IEFQSSBlcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBwcm9jZXNzIGNoYXQgbWVzc2FnZScgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRUb2tlbiIsInByaXNtYSIsInVwbG9hZFRvUzMiLCJuYW5vaWQiLCJnZXRDaGF0Q29tcGxldGlvbiIsImdlbmVyYXRlVGl0bGUiLCJQT1NUIiwicmVxdWVzdCIsInRva2VuIiwicmVxIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZm9ybURhdGEiLCJtZXNzYWdlIiwiZ2V0IiwiZmlsZXMiLCJnZXRBbGwiLCJtb2RlbCIsImxlbmd0aCIsInVzZXJJZCIsInN1YiIsImNoYXQiLCJmaW5kRmlyc3QiLCJ3aGVyZSIsImFjdGl2ZSIsImluY2x1ZGUiLCJtZXNzYWdlcyIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJ0YWtlIiwidGl0bGUiLCJjcmVhdGUiLCJkYXRhIiwiZmlsZVVybHMiLCJmaWxlIiwiZmlsZUtleSIsImlkIiwibmFtZSIsImZpbGVVcmwiLCJwdXNoIiwibmV3TWVzc2FnZSIsImNvbnRlbnQiLCJjaGF0SWQiLCJyb2xlIiwiY29udGV4dCIsIm1hcCIsIm1zZyIsImFpTWVzc2FnZSIsImFpUmVzcG9uc2UiLCJyZXNwb25zZSIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/openai.ts":
/*!***************************!*\
  !*** ./src/lib/openai.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateTitle: () => (/* binding */ generateTitle),\n/* harmony export */   getChatCompletion: () => (/* binding */ getChatCompletion)\n/* harmony export */ });\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openai */ \"(rsc)/./node_modules/openai/index.mjs\");\n\nconst openai = new openai__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    apiKey: process.env.OPENAI_API_KEY\n});\nasync function getChatCompletion(messages, model = \"gpt-3.5-turbo\") {\n    const completion = await openai.chat.completions.create({\n        model,\n        messages,\n        temperature: 0.7,\n        max_tokens: 1000\n    });\n    return completion.choices[0].message;\n}\nasync function generateTitle(content) {\n    const completion = await openai.chat.completions.create({\n        model: \"gpt-3.5-turbo\",\n        messages: [\n            {\n                role: \"system\",\n                content: \"Generate a short, concise title (max 50 chars) for this chat message.\"\n            },\n            {\n                role: \"user\",\n                content\n            }\n        ],\n        temperature: 0.7,\n        max_tokens: 50\n    });\n    return completion.choices[0].message.content?.slice(0, 50) || \"New Chat\";\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL29wZW5haS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNEI7QUFHNUIsTUFBTUMsU0FBUyxJQUFJRCw4Q0FBTUEsQ0FBQztJQUN4QkUsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxjQUFjO0FBQ3BDO0FBRU8sZUFBZUMsa0JBQ3BCQyxRQUFzQyxFQUN0Q0MsUUFBbUMsZUFBZTtJQUVsRCxNQUFNQyxhQUFhLE1BQU1SLE9BQU9TLElBQUksQ0FBQ0MsV0FBVyxDQUFDQyxNQUFNLENBQUM7UUFDdERKO1FBQ0FEO1FBQ0FNLGFBQWE7UUFDYkMsWUFBWTtJQUNkO0lBRUEsT0FBT0wsV0FBV00sT0FBTyxDQUFDLEVBQUUsQ0FBQ0MsT0FBTztBQUN0QztBQUVPLGVBQWVDLGNBQWNDLE9BQWU7SUFDakQsTUFBTVQsYUFBYSxNQUFNUixPQUFPUyxJQUFJLENBQUNDLFdBQVcsQ0FBQ0MsTUFBTSxDQUFDO1FBQ3RESixPQUFPO1FBQ1BELFVBQVU7WUFDUjtnQkFDRVksTUFBTTtnQkFDTkQsU0FBUztZQUNYO1lBQ0E7Z0JBQ0VDLE1BQU07Z0JBQ05EO1lBQ0Y7U0FDRDtRQUNETCxhQUFhO1FBQ2JDLFlBQVk7SUFDZDtJQUVBLE9BQU9MLFdBQVdNLE9BQU8sQ0FBQyxFQUFFLENBQUNDLE9BQU8sQ0FBQ0UsT0FBTyxFQUFFRSxNQUFNLEdBQUcsT0FBTztBQUNoRSIsInNvdXJjZXMiOlsid2VicGFjazovL2RhdGEtdml6LXBsYXRmb3JtLy4vc3JjL2xpYi9vcGVuYWkudHM/YTVjNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT3BlbkFJIGZyb20gJ29wZW5haSc7XG5pbXBvcnQgeyBDaGF0Q29tcGxldGlvbk1lc3NhZ2VQYXJhbSB9IGZyb20gJ29wZW5haS9yZXNvdXJjZXMvY2hhdC9jb21wbGV0aW9ucyc7XG5cbmNvbnN0IG9wZW5haSA9IG5ldyBPcGVuQUkoe1xuICBhcGlLZXk6IHByb2Nlc3MuZW52Lk9QRU5BSV9BUElfS0VZLFxufSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDaGF0Q29tcGxldGlvbihcbiAgbWVzc2FnZXM6IENoYXRDb21wbGV0aW9uTWVzc2FnZVBhcmFtW10sXG4gIG1vZGVsOiAnZ3B0LTQnIHwgJ2dwdC0zLjUtdHVyYm8nID0gJ2dwdC0zLjUtdHVyYm8nXG4pIHtcbiAgY29uc3QgY29tcGxldGlvbiA9IGF3YWl0IG9wZW5haS5jaGF0LmNvbXBsZXRpb25zLmNyZWF0ZSh7XG4gICAgbW9kZWwsXG4gICAgbWVzc2FnZXMsXG4gICAgdGVtcGVyYXR1cmU6IDAuNyxcbiAgICBtYXhfdG9rZW5zOiAxMDAwLFxuICB9KTtcblxuICByZXR1cm4gY29tcGxldGlvbi5jaG9pY2VzWzBdLm1lc3NhZ2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVRpdGxlKGNvbnRlbnQ6IHN0cmluZykge1xuICBjb25zdCBjb21wbGV0aW9uID0gYXdhaXQgb3BlbmFpLmNoYXQuY29tcGxldGlvbnMuY3JlYXRlKHtcbiAgICBtb2RlbDogJ2dwdC0zLjUtdHVyYm8nLFxuICAgIG1lc3NhZ2VzOiBbXG4gICAgICB7XG4gICAgICAgIHJvbGU6ICdzeXN0ZW0nLFxuICAgICAgICBjb250ZW50OiAnR2VuZXJhdGUgYSBzaG9ydCwgY29uY2lzZSB0aXRsZSAobWF4IDUwIGNoYXJzKSBmb3IgdGhpcyBjaGF0IG1lc3NhZ2UuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvbGU6ICd1c2VyJyxcbiAgICAgICAgY29udGVudCxcbiAgICAgIH0sXG4gICAgXSxcbiAgICB0ZW1wZXJhdHVyZTogMC43LFxuICAgIG1heF90b2tlbnM6IDUwLFxuICB9KTtcblxuICByZXR1cm4gY29tcGxldGlvbi5jaG9pY2VzWzBdLm1lc3NhZ2UuY29udGVudD8uc2xpY2UoMCwgNTApIHx8ICdOZXcgQ2hhdCc7XG59XG4iXSwibmFtZXMiOlsiT3BlbkFJIiwib3BlbmFpIiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIk9QRU5BSV9BUElfS0VZIiwiZ2V0Q2hhdENvbXBsZXRpb24iLCJtZXNzYWdlcyIsIm1vZGVsIiwiY29tcGxldGlvbiIsImNoYXQiLCJjb21wbGV0aW9ucyIsImNyZWF0ZSIsInRlbXBlcmF0dXJlIiwibWF4X3Rva2VucyIsImNob2ljZXMiLCJtZXNzYWdlIiwiZ2VuZXJhdGVUaXRsZSIsImNvbnRlbnQiLCJyb2xlIiwic2xpY2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/openai.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUVqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsR0FBRztBQUVuRSxJQUFJSSxJQUF5QixFQUFjSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXRhLXZpei1wbGF0Zm9ybS8uL3NyYy9saWIvcHJpc21hLnRzPzAxZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWwgYXMgdW5rbm93biBhcyB7IHByaXNtYTogUHJpc21hQ2xpZW50IH07XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7Il0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbCIsInByaXNtYSIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/s3.ts":
/*!***********************!*\
  !*** ./src/lib/s3.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   uploadToS3: () => (/* binding */ uploadToS3)\n/* harmony export */ });\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.AWS_REGION) throw new Error(\"AWS_REGION is required\");\nif (!process.env.AWS_ACCESS_KEY_ID) throw new Error(\"AWS_ACCESS_KEY_ID is required\");\nif (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error(\"AWS_SECRET_ACCESS_KEY is required\");\nif (!process.env.AWS_S3_BUCKET) throw new Error(\"AWS_S3_BUCKET is required\");\nconst s3Client = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__.S3Client({\n    region: process.env.AWS_REGION,\n    credentials: {\n        accessKeyId: process.env.AWS_ACCESS_KEY_ID,\n        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY\n    }\n});\nasync function uploadToS3(file, key) {\n    const buffer = Buffer.from(await file.arrayBuffer());\n    const bucketName = process.env.AWS_S3_BUCKET;\n    await s3Client.send(new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__.PutObjectCommand({\n        Bucket: bucketName,\n        Key: key,\n        Body: buffer,\n        ContentType: file.type\n    }));\n    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3MzLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnRTtBQUVoRSxJQUFJLENBQUNFLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVSxFQUFFLE1BQU0sSUFBSUMsTUFBTTtBQUM3QyxJQUFJLENBQUNILFFBQVFDLEdBQUcsQ0FBQ0csaUJBQWlCLEVBQUUsTUFBTSxJQUFJRCxNQUFNO0FBQ3BELElBQUksQ0FBQ0gsUUFBUUMsR0FBRyxDQUFDSSxxQkFBcUIsRUFBRSxNQUFNLElBQUlGLE1BQU07QUFDeEQsSUFBSSxDQUFDSCxRQUFRQyxHQUFHLENBQUNLLGFBQWEsRUFBRSxNQUFNLElBQUlILE1BQU07QUFFaEQsTUFBTUksV0FBVyxJQUFJVCx3REFBUUEsQ0FBQztJQUM1QlUsUUFBUVIsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO0lBQzlCTyxhQUFhO1FBQ1hDLGFBQWFWLFFBQVFDLEdBQUcsQ0FBQ0csaUJBQWlCO1FBQzFDTyxpQkFBaUJYLFFBQVFDLEdBQUcsQ0FBQ0kscUJBQXFCO0lBQ3BEO0FBQ0Y7QUFFTyxlQUFlTyxXQUFXQyxJQUFVLEVBQUVDLEdBQVc7SUFDdEQsTUFBTUMsU0FBU0MsT0FBT0MsSUFBSSxDQUFDLE1BQU1KLEtBQUtLLFdBQVc7SUFDakQsTUFBTUMsYUFBYW5CLFFBQVFDLEdBQUcsQ0FBQ0ssYUFBYTtJQUU1QyxNQUFNQyxTQUFTYSxJQUFJLENBQ2pCLElBQUlyQixnRUFBZ0JBLENBQUM7UUFDbkJzQixRQUFRRjtRQUNSRyxLQUFLUjtRQUNMUyxNQUFNUjtRQUNOUyxhQUFhWCxLQUFLWSxJQUFJO0lBQ3hCO0lBR0YsT0FBTyxDQUFDLFFBQVEsRUFBRU4sV0FBVyxJQUFJLEVBQUVuQixRQUFRQyxHQUFHLENBQUNDLFVBQVUsQ0FBQyxlQUFlLEVBQUVZLElBQUksQ0FBQztBQUNsRiIsInNvdXJjZXMiOlsid2VicGFjazovL2RhdGEtdml6LXBsYXRmb3JtLy4vc3JjL2xpYi9zMy50cz85YjNmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFMzQ2xpZW50LCBQdXRPYmplY3RDb21tYW5kIH0gZnJvbSAnQGF3cy1zZGsvY2xpZW50LXMzJztcblxuaWYgKCFwcm9jZXNzLmVudi5BV1NfUkVHSU9OKSB0aHJvdyBuZXcgRXJyb3IoJ0FXU19SRUdJT04gaXMgcmVxdWlyZWQnKTtcbmlmICghcHJvY2Vzcy5lbnYuQVdTX0FDQ0VTU19LRVlfSUQpIHRocm93IG5ldyBFcnJvcignQVdTX0FDQ0VTU19LRVlfSUQgaXMgcmVxdWlyZWQnKTtcbmlmICghcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZKSB0aHJvdyBuZXcgRXJyb3IoJ0FXU19TRUNSRVRfQUNDRVNTX0tFWSBpcyByZXF1aXJlZCcpO1xuaWYgKCFwcm9jZXNzLmVudi5BV1NfUzNfQlVDS0VUKSB0aHJvdyBuZXcgRXJyb3IoJ0FXU19TM19CVUNLRVQgaXMgcmVxdWlyZWQnKTtcblxuY29uc3QgczNDbGllbnQgPSBuZXcgUzNDbGllbnQoe1xuICByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04sXG4gIGNyZWRlbnRpYWxzOiB7XG4gICAgYWNjZXNzS2V5SWQ6IHByb2Nlc3MuZW52LkFXU19BQ0NFU1NfS0VZX0lELFxuICAgIHNlY3JldEFjY2Vzc0tleTogcHJvY2Vzcy5lbnYuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZLFxuICB9LFxufSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGxvYWRUb1MzKGZpbGU6IEZpbGUsIGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20oYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpKTtcbiAgY29uc3QgYnVja2V0TmFtZSA9IHByb2Nlc3MuZW52LkFXU19TM19CVUNLRVQ7XG5cbiAgYXdhaXQgczNDbGllbnQuc2VuZChcbiAgICBuZXcgUHV0T2JqZWN0Q29tbWFuZCh7XG4gICAgICBCdWNrZXQ6IGJ1Y2tldE5hbWUsXG4gICAgICBLZXk6IGtleSxcbiAgICAgIEJvZHk6IGJ1ZmZlcixcbiAgICAgIENvbnRlbnRUeXBlOiBmaWxlLnR5cGUsXG4gICAgfSlcbiAgKTtcblxuICByZXR1cm4gYGh0dHBzOi8vJHtidWNrZXROYW1lfS5zMy4ke3Byb2Nlc3MuZW52LkFXU19SRUdJT059LmFtYXpvbmF3cy5jb20vJHtrZXl9YDtcbn1cbiJdLCJuYW1lcyI6WyJTM0NsaWVudCIsIlB1dE9iamVjdENvbW1hbmQiLCJwcm9jZXNzIiwiZW52IiwiQVdTX1JFR0lPTiIsIkVycm9yIiwiQVdTX0FDQ0VTU19LRVlfSUQiLCJBV1NfU0VDUkVUX0FDQ0VTU19LRVkiLCJBV1NfUzNfQlVDS0VUIiwiczNDbGllbnQiLCJyZWdpb24iLCJjcmVkZW50aWFscyIsImFjY2Vzc0tleUlkIiwic2VjcmV0QWNjZXNzS2V5IiwidXBsb2FkVG9TMyIsImZpbGUiLCJrZXkiLCJidWZmZXIiLCJCdWZmZXIiLCJmcm9tIiwiYXJyYXlCdWZmZXIiLCJidWNrZXROYW1lIiwic2VuZCIsIkJ1Y2tldCIsIktleSIsIkJvZHkiLCJDb250ZW50VHlwZSIsInR5cGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/s3.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/formdata-node","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openai","vendor-chunks/uuid","vendor-chunks/form-data-encoder","vendor-chunks/whatwg-url","vendor-chunks/agentkeepalive","vendor-chunks/next-auth","vendor-chunks/@panva","vendor-chunks/nanoid","vendor-chunks/tr46","vendor-chunks/node-fetch","vendor-chunks/webidl-conversions","vendor-chunks/ms","vendor-chunks/humanize-ms","vendor-chunks/event-target-shim","vendor-chunks/abort-controller"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Fjeremywilliams%2FDocuments%2FGitHub%2Fdata-saas%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjeremywilliams%2FDocuments%2FGitHub%2Fdata-saas&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();