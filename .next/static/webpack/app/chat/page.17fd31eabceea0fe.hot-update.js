"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/chat/page",{

/***/ "(app-pages-browser)/./src/components/chat/ChatInterface.tsx":
/*!***********************************************!*\
  !*** ./src/components/chat/ChatInterface.tsx ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChatInterface: function() { return /* binding */ ChatInterface; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _FileUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FileUpload */ \"(app-pages-browser)/./src/components/chat/FileUpload.tsx\");\n/* harmony import */ var _ChatMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChatMessage */ \"(app-pages-browser)/./src/components/chat/ChatMessage.tsx\");\n/* harmony import */ var _ChatInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChatInput */ \"(app-pages-browser)/./src/components/chat/ChatInput.tsx\");\n/* __next_internal_client_entry_do_not_use__ ChatInterface auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction ChatInterface() {\n    _s();\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [isAnalyzing, setIsAnalyzing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleSendMessage = async (message)=>{\n        try {\n            setIsLoading(true);\n            // Add user message immediately\n            setMessages((prev)=>[\n                    ...prev,\n                    {\n                        role: \"user\",\n                        content: message\n                    }\n                ]);\n            // Send message to API\n            const response = await fetch(\"/api/chat\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    message\n                })\n            });\n            if (!response.ok) {\n                throw new Error(\"Failed to send message\");\n            }\n            const data = await response.json();\n            // Add assistant's response\n            setMessages((prev)=>[\n                    ...prev,\n                    {\n                        role: \"assistant\",\n                        content: data.response\n                    }\n                ]);\n        } catch (error) {\n            console.error(\"Failed to send message:\", error);\n            // Add error message\n            setMessages((prev)=>[\n                    ...prev,\n                    {\n                        role: \"assistant\",\n                        content: \"Sorry, I encountered an error processing your message.\"\n                    }\n                ]);\n        } finally{\n            setIsLoading(false);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex h-full flex-col\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex-1 overflow-y-auto p-4 space-y-4\",\n                children: messages.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_FileUpload__WEBPACK_IMPORTED_MODULE_2__.FileUpload, {\n                    onAnalyzing: setIsAnalyzing\n                }, void 0, false, {\n                    fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                    lineNumber: 49,\n                    columnNumber: 11\n                }, this) : messages.map((message, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ChatMessage__WEBPACK_IMPORTED_MODULE_3__.ChatMessage, {\n                        role: message.role,\n                        content: message.content\n                    }, index, false, {\n                        fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                        lineNumber: 52,\n                        columnNumber: 13\n                    }, this))\n            }, void 0, false, {\n                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"border-t p-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ChatInput__WEBPACK_IMPORTED_MODULE_4__.ChatInput, {\n                    onSend: handleSendMessage,\n                    disabled: isAnalyzing || isLoading\n                }, void 0, false, {\n                    fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                    lineNumber: 57,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                lineNumber: 56,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n        lineNumber: 46,\n        columnNumber: 5\n    }, this);\n}\n_s(ChatInterface, \"RxtcoxMeTb76ZqrgE888xqjbIrc=\");\n_c = ChatInterface;\nvar _c;\n$RefreshReg$(_c, \"ChatInterface\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2NoYXQvQ2hhdEludGVyZmFjZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRWlDO0FBQ1M7QUFDRTtBQUNKO0FBRWpDLFNBQVNJOztJQUNkLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHTiwrQ0FBUUEsQ0FBeUQsRUFBRTtJQUNuRyxNQUFNLENBQUNPLGFBQWFDLGVBQWUsR0FBR1IsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDUyxXQUFXQyxhQUFhLEdBQUdWLCtDQUFRQSxDQUFDO0lBRTNDLE1BQU1XLG9CQUFvQixPQUFPQztRQUMvQixJQUFJO1lBQ0ZGLGFBQWE7WUFDYiwrQkFBK0I7WUFDL0JKLFlBQVlPLENBQUFBLE9BQVE7dUJBQUlBO29CQUFNO3dCQUFFQyxNQUFNO3dCQUFRQyxTQUFTSDtvQkFBUTtpQkFBRTtZQUVqRSxzQkFBc0I7WUFDdEIsTUFBTUksV0FBVyxNQUFNQyxNQUFNLGFBQWE7Z0JBQ3hDQyxRQUFRO2dCQUNSQyxTQUFTO29CQUNQLGdCQUFnQjtnQkFDbEI7Z0JBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztvQkFBRVY7Z0JBQVE7WUFDakM7WUFFQSxJQUFJLENBQUNJLFNBQVNPLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxJQUFJQyxNQUFNO1lBQ2xCO1lBRUEsTUFBTUMsT0FBTyxNQUFNVCxTQUFTVSxJQUFJO1lBRWhDLDJCQUEyQjtZQUMzQnBCLFlBQVlPLENBQUFBLE9BQVE7dUJBQUlBO29CQUFNO3dCQUFFQyxNQUFNO3dCQUFhQyxTQUFTVSxLQUFLVCxRQUFRO29CQUFDO2lCQUFFO1FBQzlFLEVBQUUsT0FBT1csT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUMsMkJBQTJCQTtZQUN6QyxvQkFBb0I7WUFDcEJyQixZQUFZTyxDQUFBQSxPQUFRO3VCQUFJQTtvQkFBTTt3QkFBRUMsTUFBTTt3QkFBYUMsU0FBUztvQkFBeUQ7aUJBQUU7UUFDekgsU0FBVTtZQUNSTCxhQUFhO1FBQ2Y7SUFDRjtJQUVBLHFCQUNFLDhEQUFDbUI7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNEO2dCQUFJQyxXQUFVOzBCQUNaekIsU0FBUzBCLE1BQU0sS0FBSyxrQkFDbkIsOERBQUM5QixtREFBVUE7b0JBQUMrQixhQUFheEI7Ozs7OzJCQUV6QkgsU0FBUzRCLEdBQUcsQ0FBQyxDQUFDckIsU0FBU3NCLHNCQUNyQiw4REFBQ2hDLHFEQUFXQTt3QkFBYVksTUFBTUYsUUFBUUUsSUFBSTt3QkFBRUMsU0FBU0gsUUFBUUcsT0FBTzt1QkFBbkRtQjs7Ozs7Ozs7OzswQkFJeEIsOERBQUNMO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDM0IsaURBQVNBO29CQUNSZ0MsUUFBUXhCO29CQUNSeUIsVUFBVTdCLGVBQWVFOzs7Ozs7Ozs7Ozs7Ozs7OztBQUtuQztHQXhEZ0JMO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL2NoYXQvQ2hhdEludGVyZmFjZS50c3g/YWFjNSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRmlsZVVwbG9hZCB9IGZyb20gJy4vRmlsZVVwbG9hZCc7XG5pbXBvcnQgeyBDaGF0TWVzc2FnZSB9IGZyb20gJy4vQ2hhdE1lc3NhZ2UnO1xuaW1wb3J0IHsgQ2hhdElucHV0IH0gZnJvbSAnLi9DaGF0SW5wdXQnO1xuXG5leHBvcnQgZnVuY3Rpb24gQ2hhdEludGVyZmFjZSgpIHtcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZTxBcnJheTx7IHJvbGU6ICd1c2VyJyB8ICdhc3Npc3RhbnQnOyBjb250ZW50OiBzdHJpbmcgfT4+KFtdKTtcbiAgY29uc3QgW2lzQW5hbHl6aW5nLCBzZXRJc0FuYWx5emluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlU2VuZE1lc3NhZ2UgPSBhc3luYyAobWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIC8vIEFkZCB1c2VyIG1lc3NhZ2UgaW1tZWRpYXRlbHlcbiAgICAgIHNldE1lc3NhZ2VzKHByZXYgPT4gWy4uLnByZXYsIHsgcm9sZTogJ3VzZXInLCBjb250ZW50OiBtZXNzYWdlIH1dKTtcblxuICAgICAgLy8gU2VuZCBtZXNzYWdlIHRvIEFQSVxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jaGF0Jywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZSB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHNlbmQgbWVzc2FnZScpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgXG4gICAgICAvLyBBZGQgYXNzaXN0YW50J3MgcmVzcG9uc2VcbiAgICAgIHNldE1lc3NhZ2VzKHByZXYgPT4gWy4uLnByZXYsIHsgcm9sZTogJ2Fzc2lzdGFudCcsIGNvbnRlbnQ6IGRhdGEucmVzcG9uc2UgfV0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2VuZCBtZXNzYWdlOicsIGVycm9yKTtcbiAgICAgIC8vIEFkZCBlcnJvciBtZXNzYWdlXG4gICAgICBzZXRNZXNzYWdlcyhwcmV2ID0+IFsuLi5wcmV2LCB7IHJvbGU6ICdhc3Npc3RhbnQnLCBjb250ZW50OiAnU29ycnksIEkgZW5jb3VudGVyZWQgYW4gZXJyb3IgcHJvY2Vzc2luZyB5b3VyIG1lc3NhZ2UuJyB9XSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtZnVsbCBmbGV4LWNvbFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtNCBzcGFjZS15LTRcIj5cbiAgICAgICAge21lc3NhZ2VzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8RmlsZVVwbG9hZCBvbkFuYWx5emluZz17c2V0SXNBbmFseXppbmd9IC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgbWVzc2FnZXMubWFwKChtZXNzYWdlLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPENoYXRNZXNzYWdlIGtleT17aW5kZXh9IHJvbGU9e21lc3NhZ2Uucm9sZX0gY29udGVudD17bWVzc2FnZS5jb250ZW50fSAvPlxuICAgICAgICAgICkpXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXQgcC00XCI+XG4gICAgICAgIDxDaGF0SW5wdXQgXG4gICAgICAgICAgb25TZW5kPXtoYW5kbGVTZW5kTWVzc2FnZX1cbiAgICAgICAgICBkaXNhYmxlZD17aXNBbmFseXppbmcgfHwgaXNMb2FkaW5nfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sIm5hbWVzIjpbInVzZVN0YXRlIiwiRmlsZVVwbG9hZCIsIkNoYXRNZXNzYWdlIiwiQ2hhdElucHV0IiwiQ2hhdEludGVyZmFjZSIsIm1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJpc0FuYWx5emluZyIsInNldElzQW5hbHl6aW5nIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwiaGFuZGxlU2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwicHJldiIsInJvbGUiLCJjb250ZW50IiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwiRXJyb3IiLCJkYXRhIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsImRpdiIsImNsYXNzTmFtZSIsImxlbmd0aCIsIm9uQW5hbHl6aW5nIiwibWFwIiwiaW5kZXgiLCJvblNlbmQiLCJkaXNhYmxlZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/chat/ChatInterface.tsx\n"));

/***/ })

});