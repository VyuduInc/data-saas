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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChatInterface: function() { return /* binding */ ChatInterface; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _FileUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FileUpload */ \"(app-pages-browser)/./src/components/chat/FileUpload.tsx\");\n/* harmony import */ var _ChatMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChatMessage */ \"(app-pages-browser)/./src/components/chat/ChatMessage.tsx\");\n/* harmony import */ var _ChatInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChatInput */ \"(app-pages-browser)/./src/components/chat/ChatInput.tsx\");\n/* harmony import */ var _barrel_optimize_names_Cog6ToothIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Cog6ToothIcon!=!@heroicons/react/24/outline */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/outline/esm/Cog6ToothIcon.js\");\n/* __next_internal_client_entry_do_not_use__ ChatInterface auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction ChatInterface() {\n    _s();\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [isAnalyzing, setIsAnalyzing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [showFileUpload, setShowFileUpload] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const handleSendMessage = async (message)=>{\n        try {\n            setIsLoading(true);\n            // Add user message immediately\n            setMessages((prev)=>[\n                    ...prev,\n                    {\n                        role: \"user\",\n                        content: message\n                    }\n                ]);\n            setShowFileUpload(false);\n            // Send message to API\n            const response = await fetch(\"/api/chat\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    message\n                })\n            });\n            if (!response.ok) {\n                throw new Error(\"Failed to send message\");\n            }\n            const data = await response.json();\n            // Add assistant's response\n            setMessages((prev)=>[\n                    ...prev,\n                    {\n                        role: \"assistant\",\n                        content: data.response\n                    }\n                ]);\n            // If the response includes a plot, add it as a separate message\n            if (data.plot) {\n                setMessages((prev)=>[\n                        ...prev,\n                        {\n                            role: \"assistant\",\n                            type: \"plot\",\n                            content: \"\",\n                            plotData: data.plot\n                        }\n                    ]);\n            }\n        } catch (error) {\n            console.error(\"Failed to send message:\", error);\n            setMessages((prev)=>[\n                    ...prev,\n                    {\n                        role: \"assistant\",\n                        content: \"Sorry, I encountered an error processing your message.\"\n                    }\n                ]);\n        } finally{\n            setIsLoading(false);\n        }\n    };\n    const handleFileAnalysis = async (analysisResult)=>{\n        setMessages([\n            {\n                role: \"assistant\",\n                content: \"I've analyzed your file. What would you like to know about it?\"\n            }\n        ]);\n        setShowFileUpload(false);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex h-full flex-col bg-white\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-center justify-between p-4 border-b\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-xl font-semibold\",\n                        children: \"Vaydr\"\n                    }, void 0, false, {\n                        fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                        lineNumber: 76,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex items-center gap-4\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex items-center gap-2\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: \"flex items-center gap-1\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                className: \"w-2 h-2 bg-green-500 rounded-full\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                                lineNumber: 80,\n                                                columnNumber: 15\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                className: \"text-sm text-gray-600\",\n                                                children: \"Connected\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                                lineNumber: 81,\n                                                columnNumber: 15\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                        lineNumber: 79,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                                        className: \"bg-white border rounded px-2 py-1 text-sm\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                            children: \"GPT-4o\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                            lineNumber: 84,\n                                            columnNumber: 15\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                        lineNumber: 83,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                                        className: \"bg-white border rounded px-2 py-1 text-sm\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                            children: \"Python\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                            lineNumber: 87,\n                                            columnNumber: 15\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                        lineNumber: 86,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                lineNumber: 78,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: \"p-2 hover:bg-gray-100 rounded-md\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Cog6ToothIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                    className: \"h-5 w-5 text-gray-500\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                    lineNumber: 91,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                lineNumber: 90,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                        lineNumber: 77,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                lineNumber: 75,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex-1 overflow-y-auto p-4 space-y-4\",\n                children: showFileUpload && messages.length === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex justify-center space-x-4 mb-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"px-4 py-2 text-sm font-medium text-gray-700 bg-white border-b-2 border-purple-600\",\n                                    children: \"Getting started\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                    lineNumber: 101,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700\",\n                                    children: \"Examples\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                    lineNumber: 104,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                            lineNumber: 100,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: \"text-2xl font-semibold text-center mb-4\",\n                            children: \"What would you like to analyze?\"\n                        }, void 0, false, {\n                            fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                            lineNumber: 108,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_FileUpload__WEBPACK_IMPORTED_MODULE_2__.FileUpload, {\n                            onAnalyzing: setIsAnalyzing,\n                            onAnalysisComplete: handleFileAnalysis\n                        }, void 0, false, {\n                            fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                            lineNumber: 111,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        messages.map((message, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ChatMessage__WEBPACK_IMPORTED_MODULE_3__.ChatMessage, {\n                                ...message\n                            }, index, false, {\n                                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                lineNumber: 116,\n                                columnNumber: 15\n                            }, this)),\n                        isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex justify-center\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"animate-pulse text-gray-500\",\n                                children: \"Processing...\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                                lineNumber: 120,\n                                columnNumber: 17\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                            lineNumber: 119,\n                            columnNumber: 15\n                        }, this)\n                    ]\n                }, void 0, true)\n            }, void 0, false, {\n                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                lineNumber: 97,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"border-t p-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ChatInput__WEBPACK_IMPORTED_MODULE_4__.ChatInput, {\n                        onSend: handleSendMessage,\n                        disabled: isAnalyzing || isLoading,\n                        placeholder: messages.length === 0 ? \"I would like to...\" : \"Ask a question about your data...\"\n                    }, void 0, false, {\n                        fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                        lineNumber: 129,\n                        columnNumber: 9\n                    }, this),\n                    !showFileUpload && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mt-2 flex justify-center\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: ()=>setShowFileUpload(true),\n                            className: \"text-sm text-purple-600 hover:underline\",\n                            children: \"Upload another file\"\n                        }, void 0, false, {\n                            fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                            lineNumber: 140,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                        lineNumber: 139,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n                lineNumber: 128,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jeremywilliams/Documents/GitHub/data-saas/src/components/chat/ChatInterface.tsx\",\n        lineNumber: 73,\n        columnNumber: 5\n    }, this);\n}\n_s(ChatInterface, \"M26S22Ar53RX9Um1Z1OCUGK16lw=\");\n_c = ChatInterface;\nvar _c;\n$RefreshReg$(_c, \"ChatInterface\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2NoYXQvQ2hhdEludGVyZmFjZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVpQztBQUNTO0FBQ0U7QUFDSjtBQUNvQjtBQVNyRCxTQUFTSzs7SUFDZCxNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR1AsK0NBQVFBLENBQVksRUFBRTtJQUN0RCxNQUFNLENBQUNRLGFBQWFDLGVBQWUsR0FBR1QsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDVSxXQUFXQyxhQUFhLEdBQUdYLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ1ksZ0JBQWdCQyxrQkFBa0IsR0FBR2IsK0NBQVFBLENBQUM7SUFFckQsTUFBTWMsb0JBQW9CLE9BQU9DO1FBQy9CLElBQUk7WUFDRkosYUFBYTtZQUNiLCtCQUErQjtZQUMvQkosWUFBWVMsQ0FBQUEsT0FBUTt1QkFBSUE7b0JBQU07d0JBQUVDLE1BQU07d0JBQVFDLFNBQVNIO29CQUFRO2lCQUFFO1lBQ2pFRixrQkFBa0I7WUFFbEIsc0JBQXNCO1lBQ3RCLE1BQU1NLFdBQVcsTUFBTUMsTUFBTSxhQUFhO2dCQUN4Q0MsUUFBUTtnQkFDUkMsU0FBUztvQkFDUCxnQkFBZ0I7Z0JBQ2xCO2dCQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7b0JBQUVWO2dCQUFRO1lBQ2pDO1lBRUEsSUFBSSxDQUFDSSxTQUFTTyxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSUMsTUFBTTtZQUNsQjtZQUVBLE1BQU1DLE9BQU8sTUFBTVQsU0FBU1UsSUFBSTtZQUVoQywyQkFBMkI7WUFDM0J0QixZQUFZUyxDQUFBQSxPQUFRO3VCQUFJQTtvQkFBTTt3QkFBRUMsTUFBTTt3QkFBYUMsU0FBU1UsS0FBS1QsUUFBUTtvQkFBQztpQkFBRTtZQUU1RSxnRUFBZ0U7WUFDaEUsSUFBSVMsS0FBS0UsSUFBSSxFQUFFO2dCQUNidkIsWUFBWVMsQ0FBQUEsT0FBUTsyQkFBSUE7d0JBQU07NEJBQUVDLE1BQU07NEJBQWFjLE1BQU07NEJBQVFiLFNBQVM7NEJBQUljLFVBQVVKLEtBQUtFLElBQUk7d0JBQUM7cUJBQUU7WUFDdEc7UUFDRixFQUFFLE9BQU9HLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLDJCQUEyQkE7WUFDekMxQixZQUFZUyxDQUFBQSxPQUFRO3VCQUFJQTtvQkFBTTt3QkFDNUJDLE1BQU07d0JBQ05DLFNBQVM7b0JBQ1g7aUJBQUU7UUFDSixTQUFVO1lBQ1JQLGFBQWE7UUFDZjtJQUNGO0lBRUEsTUFBTXdCLHFCQUFxQixPQUFPQztRQUNoQzdCLFlBQVk7WUFDVjtnQkFDRVUsTUFBTTtnQkFDTkMsU0FBUztZQUNYO1NBQ0Q7UUFDREwsa0JBQWtCO0lBQ3BCO0lBRUEscUJBQ0UsOERBQUN3QjtRQUFJQyxXQUFVOzswQkFFYiw4REFBQ0Q7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDQzt3QkFBR0QsV0FBVTtrQ0FBd0I7Ozs7OztrQ0FDdEMsOERBQUNEO3dCQUFJQyxXQUFVOzswQ0FDYiw4REFBQ0Q7Z0NBQUlDLFdBQVU7O2tEQUNiLDhEQUFDRTt3Q0FBS0YsV0FBVTs7MERBQ2QsOERBQUNFO2dEQUFLRixXQUFVOzs7Ozs7MERBQ2hCLDhEQUFDRTtnREFBS0YsV0FBVTswREFBd0I7Ozs7Ozs7Ozs7OztrREFFMUMsOERBQUNHO3dDQUFPSCxXQUFVO2tEQUNoQiw0RUFBQ0k7c0RBQU87Ozs7Ozs7Ozs7O2tEQUVWLDhEQUFDRDt3Q0FBT0gsV0FBVTtrREFDaEIsNEVBQUNJO3NEQUFPOzs7Ozs7Ozs7Ozs7Ozs7OzswQ0FHWiw4REFBQ0M7Z0NBQU9MLFdBQVU7MENBQ2hCLDRFQUFDbEMsdUdBQWFBO29DQUFDa0MsV0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBTS9CLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFDWjFCLGtCQUFrQk4sU0FBU3NDLE1BQU0sS0FBSyxrQkFDckM7O3NDQUNFLDhEQUFDUDs0QkFBSUMsV0FBVTs7OENBQ2IsOERBQUNLO29DQUFPTCxXQUFVOzhDQUFvRjs7Ozs7OzhDQUd0Ryw4REFBQ0s7b0NBQU9MLFdBQVU7OENBQWtFOzs7Ozs7Ozs7Ozs7c0NBSXRGLDhEQUFDTzs0QkFBR1AsV0FBVTtzQ0FBMEM7Ozs7OztzQ0FHeEQsOERBQUNyQyxtREFBVUE7NEJBQUM2QyxhQUFhckM7NEJBQWdCc0Msb0JBQW9CWjs7Ozs7OztpREFHL0Q7O3dCQUNHN0IsU0FBUzBDLEdBQUcsQ0FBQyxDQUFDakMsU0FBU2tDLHNCQUN0Qiw4REFBQy9DLHFEQUFXQTtnQ0FBYyxHQUFHYSxPQUFPOytCQUFsQmtDOzs7Ozt3QkFFbkJ2QywyQkFDQyw4REFBQzJCOzRCQUFJQyxXQUFVO3NDQUNiLDRFQUFDRDtnQ0FBSUMsV0FBVTswQ0FBOEI7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFRdkQsOERBQUNEO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ25DLGlEQUFTQTt3QkFDUitDLFFBQVFwQzt3QkFDUnFDLFVBQVUzQyxlQUFlRTt3QkFDekIwQyxhQUNFOUMsU0FBU3NDLE1BQU0sS0FBSyxJQUNoQix1QkFDQTs7Ozs7O29CQUdQLENBQUNoQyxnQ0FDQSw4REFBQ3lCO3dCQUFJQyxXQUFVO2tDQUNiLDRFQUFDSzs0QkFDQ1UsU0FBUyxJQUFNeEMsa0JBQWtCOzRCQUNqQ3lCLFdBQVU7c0NBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUWI7R0F2SWdCakM7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvY2hhdC9DaGF0SW50ZXJmYWNlLnRzeD9hYWM1Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBGaWxlVXBsb2FkIH0gZnJvbSAnLi9GaWxlVXBsb2FkJztcbmltcG9ydCB7IENoYXRNZXNzYWdlIH0gZnJvbSAnLi9DaGF0TWVzc2FnZSc7XG5pbXBvcnQgeyBDaGF0SW5wdXQgfSBmcm9tICcuL0NoYXRJbnB1dCc7XG5pbXBvcnQgeyBDb2c2VG9vdGhJY29uIH0gZnJvbSAnQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lJztcblxuaW50ZXJmYWNlIE1lc3NhZ2Uge1xuICByb2xlOiAndXNlcicgfCAnYXNzaXN0YW50JztcbiAgY29udGVudDogc3RyaW5nO1xuICB0eXBlPzogJ3RleHQnIHwgJ3Bsb3QnO1xuICBwbG90RGF0YT86IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENoYXRJbnRlcmZhY2UoKSB7XG4gIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gdXNlU3RhdGU8TWVzc2FnZVtdPihbXSk7XG4gIGNvbnN0IFtpc0FuYWx5emluZywgc2V0SXNBbmFseXppbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0ZpbGVVcGxvYWQsIHNldFNob3dGaWxlVXBsb2FkXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGhhbmRsZVNlbmRNZXNzYWdlID0gYXN5bmMgKG1lc3NhZ2U6IHN0cmluZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAvLyBBZGQgdXNlciBtZXNzYWdlIGltbWVkaWF0ZWx5XG4gICAgICBzZXRNZXNzYWdlcyhwcmV2ID0+IFsuLi5wcmV2LCB7IHJvbGU6ICd1c2VyJywgY29udGVudDogbWVzc2FnZSB9XSk7XG4gICAgICBzZXRTaG93RmlsZVVwbG9hZChmYWxzZSk7XG5cbiAgICAgIC8vIFNlbmQgbWVzc2FnZSB0byBBUElcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvY2hhdCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2UgfSksXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBzZW5kIG1lc3NhZ2UnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIFxuICAgICAgLy8gQWRkIGFzc2lzdGFudCdzIHJlc3BvbnNlXG4gICAgICBzZXRNZXNzYWdlcyhwcmV2ID0+IFsuLi5wcmV2LCB7IHJvbGU6ICdhc3Npc3RhbnQnLCBjb250ZW50OiBkYXRhLnJlc3BvbnNlIH1dKTtcblxuICAgICAgLy8gSWYgdGhlIHJlc3BvbnNlIGluY2x1ZGVzIGEgcGxvdCwgYWRkIGl0IGFzIGEgc2VwYXJhdGUgbWVzc2FnZVxuICAgICAgaWYgKGRhdGEucGxvdCkge1xuICAgICAgICBzZXRNZXNzYWdlcyhwcmV2ID0+IFsuLi5wcmV2LCB7IHJvbGU6ICdhc3Npc3RhbnQnLCB0eXBlOiAncGxvdCcsIGNvbnRlbnQ6ICcnLCBwbG90RGF0YTogZGF0YS5wbG90IH1dKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNlbmQgbWVzc2FnZTonLCBlcnJvcik7XG4gICAgICBzZXRNZXNzYWdlcyhwcmV2ID0+IFsuLi5wcmV2LCB7IFxuICAgICAgICByb2xlOiAnYXNzaXN0YW50JywgXG4gICAgICAgIGNvbnRlbnQ6ICdTb3JyeSwgSSBlbmNvdW50ZXJlZCBhbiBlcnJvciBwcm9jZXNzaW5nIHlvdXIgbWVzc2FnZS4nIFxuICAgICAgfV0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVGaWxlQW5hbHlzaXMgPSBhc3luYyAoYW5hbHlzaXNSZXN1bHQ6IGFueSkgPT4ge1xuICAgIHNldE1lc3NhZ2VzKFtcbiAgICAgIHsgXG4gICAgICAgIHJvbGU6ICdhc3Npc3RhbnQnLCBcbiAgICAgICAgY29udGVudDogJ0lcXCd2ZSBhbmFseXplZCB5b3VyIGZpbGUuIFdoYXQgd291bGQgeW91IGxpa2UgdG8ga25vdyBhYm91dCBpdD8nIFxuICAgICAgfVxuICAgIF0pO1xuICAgIHNldFNob3dGaWxlVXBsb2FkKGZhbHNlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBoLWZ1bGwgZmxleC1jb2wgYmctd2hpdGVcIj5cbiAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTQgYm9yZGVyLWJcIj5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZW1pYm9sZFwiPlZheWRyPC9oMT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgYmctZ3JlZW4tNTAwIHJvdW5kZWQtZnVsbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LWdyYXktNjAwXCI+Q29ubmVjdGVkPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJiZy13aGl0ZSBib3JkZXIgcm91bmRlZCBweC0yIHB5LTEgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICA8b3B0aW9uPkdQVC00bzwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImJnLXdoaXRlIGJvcmRlciByb3VuZGVkIHB4LTIgcHktMSB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24+UHl0aG9uPC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInAtMiBob3ZlcjpiZy1ncmF5LTEwMCByb3VuZGVkLW1kXCI+XG4gICAgICAgICAgICA8Q29nNlRvb3RoSWNvbiBjbGFzc05hbWU9XCJoLTUgdy01IHRleHQtZ3JheS01MDBcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQ2hhdCBBcmVhICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtNCBzcGFjZS15LTRcIj5cbiAgICAgICAge3Nob3dGaWxlVXBsb2FkICYmIG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIHNwYWNlLXgtNCBtYi00XCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBiZy13aGl0ZSBib3JkZXItYi0yIGJvcmRlci1wdXJwbGUtNjAwXCI+XG4gICAgICAgICAgICAgICAgR2V0dGluZyBzdGFydGVkXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgaG92ZXI6dGV4dC1ncmF5LTcwMFwiPlxuICAgICAgICAgICAgICAgIEV4YW1wbGVzXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LWNlbnRlciBtYi00XCI+XG4gICAgICAgICAgICAgIFdoYXQgd291bGQgeW91IGxpa2UgdG8gYW5hbHl6ZT9cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8RmlsZVVwbG9hZCBvbkFuYWx5emluZz17c2V0SXNBbmFseXppbmd9IG9uQW5hbHlzaXNDb21wbGV0ZT17aGFuZGxlRmlsZUFuYWx5c2lzfSAvPlxuICAgICAgICAgIDwvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7bWVzc2FnZXMubWFwKChtZXNzYWdlLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8Q2hhdE1lc3NhZ2Uga2V5PXtpbmRleH0gey4uLm1lc3NhZ2V9IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICAgIHtpc0xvYWRpbmcgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuaW1hdGUtcHVsc2UgdGV4dC1ncmF5LTUwMFwiPlByb2Nlc3NpbmcuLi48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBJbnB1dCBBcmVhICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXItdCBwLTRcIj5cbiAgICAgICAgPENoYXRJbnB1dCBcbiAgICAgICAgICBvblNlbmQ9e2hhbmRsZVNlbmRNZXNzYWdlfVxuICAgICAgICAgIGRpc2FibGVkPXtpc0FuYWx5emluZyB8fCBpc0xvYWRpbmd9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e1xuICAgICAgICAgICAgbWVzc2FnZXMubGVuZ3RoID09PSAwIFxuICAgICAgICAgICAgICA/IFwiSSB3b3VsZCBsaWtlIHRvLi4uXCIgXG4gICAgICAgICAgICAgIDogXCJBc2sgYSBxdWVzdGlvbiBhYm91dCB5b3VyIGRhdGEuLi5cIlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICAgeyFzaG93RmlsZVVwbG9hZCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIGZsZXgganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0ZpbGVVcGxvYWQodHJ1ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1wdXJwbGUtNjAwIGhvdmVyOnVuZGVybGluZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFVwbG9hZCBhbm90aGVyIGZpbGVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sIm5hbWVzIjpbInVzZVN0YXRlIiwiRmlsZVVwbG9hZCIsIkNoYXRNZXNzYWdlIiwiQ2hhdElucHV0IiwiQ29nNlRvb3RoSWNvbiIsIkNoYXRJbnRlcmZhY2UiLCJtZXNzYWdlcyIsInNldE1lc3NhZ2VzIiwiaXNBbmFseXppbmciLCJzZXRJc0FuYWx5emluZyIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsInNob3dGaWxlVXBsb2FkIiwic2V0U2hvd0ZpbGVVcGxvYWQiLCJoYW5kbGVTZW5kTWVzc2FnZSIsIm1lc3NhZ2UiLCJwcmV2Iiwicm9sZSIsImNvbnRlbnQiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJFcnJvciIsImRhdGEiLCJqc29uIiwicGxvdCIsInR5cGUiLCJwbG90RGF0YSIsImVycm9yIiwiY29uc29sZSIsImhhbmRsZUZpbGVBbmFseXNpcyIsImFuYWx5c2lzUmVzdWx0IiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJzcGFuIiwic2VsZWN0Iiwib3B0aW9uIiwiYnV0dG9uIiwibGVuZ3RoIiwiaDIiLCJvbkFuYWx5emluZyIsIm9uQW5hbHlzaXNDb21wbGV0ZSIsIm1hcCIsImluZGV4Iiwib25TZW5kIiwiZGlzYWJsZWQiLCJwbGFjZWhvbGRlciIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/chat/ChatInterface.tsx\n"));

/***/ })

});