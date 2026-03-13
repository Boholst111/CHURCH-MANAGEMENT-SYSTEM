"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_Finance_tsx"],{

/***/ "./resources/js/pages/Finance.tsx"
/*!****************************************!*\
  !*** ./resources/js/pages/Finance.tsx ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chart-pie.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/coins.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/layout-dashboard.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/receipt.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/settings.js");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_loading_fallback__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/ui/loading-fallback */ "./resources/js/components/ui/loading-fallback.tsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





// Lazy load tab components for code splitting
var FinanceOverview = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_pages_Finance_Overview_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./Finance/Overview */ "./resources/js/pages/Finance/Overview.tsx"));
});
var Offerings = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_pages_Finance_Offerings_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./Finance/Offerings */ "./resources/js/pages/Finance/Offerings.tsx"));
});
var Expenses = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_pages_Finance_Expenses_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./Finance/Expenses */ "./resources/js/pages/Finance/Expenses.tsx"));
});
var Budgets = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_pages_Finance_Budgets_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./Finance/Budgets */ "./resources/js/pages/Finance/Budgets.tsx"));
});
var Settings = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_pages_Finance_Settings_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./Finance/Settings */ "./resources/js/pages/Finance/Settings.tsx"));
});
var tabs = [{
  id: 'overview',
  label: 'Overview',
  icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "w-4 h-4"
  })
}, {
  id: 'offerings',
  label: 'Offerings',
  icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "w-4 h-4"
  })
}, {
  id: 'expenses',
  label: 'Expenses',
  icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "w-4 h-4"
  })
}, {
  id: 'budgets',
  label: 'Budgets',
  icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "w-4 h-4"
  })
}, {
  id: 'settings',
  label: 'Settings',
  icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
    className: "w-4 h-4"
  })
}];
var Finance = function Finance() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('overview'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showOfferingModal = _useState4[0],
    setShowOfferingModal = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showExpenseModal = _useState6[0],
    setShowExpenseModal = _useState6[1];
  var handleRecordOffering = function handleRecordOffering() {
    setShowOfferingModal(true);
  };
  var handleAddExpense = function handleAddExpense() {
    setShowExpenseModal(true);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "min-h-screen bg-neutral-50",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "bg-white border-b border-neutral-200",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "px-6 py-6",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
              className: "text-3xl font-bold text-neutral-900",
              children: "Finance"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-neutral-600",
              children: "Manage church finances, offerings, and expenses"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex gap-3",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
              variant: "secondary",
              size: "md",
              icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                className: "w-4 h-4"
              }),
              onClick: handleAddExpense,
              children: "Add Expense"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
              variant: "primary",
              size: "md",
              icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                className: "w-4 h-4"
              }),
              onClick: handleRecordOffering,
              children: "Record Offering"
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "mt-6 border-b border-neutral-200",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
            className: "-mb-px flex space-x-6 overflow-x-auto",
            children: tabs.map(function (tab) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: function onClick() {
                  return setActiveTab(tab.id);
                },
                className: "\n                    flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors\n                    ".concat(activeTab === tab.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300', "\n                  "),
                children: [tab.icon, tab.label]
              }, tab.id);
            })
          })
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "px-6 py-6",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
        fallback: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_loading_fallback__WEBPACK_IMPORTED_MODULE_9__.ContentLoadingFallback, {}),
        children: [activeTab === 'overview' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(FinanceOverview, {}), activeTab === 'offerings' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Offerings, {
          showModal: showOfferingModal,
          onCloseModal: function onCloseModal() {
            return setShowOfferingModal(false);
          }
        }), activeTab === 'expenses' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Expenses, {
          showModal: showExpenseModal,
          onCloseModal: function onCloseModal() {
            return setShowExpenseModal(false);
          }
        }), activeTab === 'budgets' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Budgets, {}), activeTab === 'settings' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Settings, {})]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Finance);

/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/chart-pie.js"
/*!***************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chart-pie.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChartPie)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      key: "pzmjnu"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
];
const ChartPie = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chart-pie", __iconNode);


//# sourceMappingURL=chart-pie.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/coins.js"
/*!***********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/coins.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Coins)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }],
  ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }],
  ["path", { d: "M7 6h1v4", key: "1obek4" }],
  ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]
];
const Coins = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("coins", __iconNode);


//# sourceMappingURL=coins.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/plus.js"
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/plus.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Plus)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("plus", __iconNode);


//# sourceMappingURL=plus.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/receipt.js"
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/receipt.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Receipt)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("receipt", __iconNode);


//# sourceMappingURL=receipt.js.map


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0ZpbmFuY2VfdHN4LmpzP2lkPWQxNTYwYjczMGY4YzZkZGQiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStEO0FBQ2Q7QUFDd0Q7QUFDeEQ7QUFDMEI7QUFDM0U7QUFDQSxJQUFNZ0IsZUFBZSxnQkFBR1YsMkNBQUksQ0FBQztFQUFBLE9BQU0sMk1BQTRCO0FBQUEsRUFBQztBQUNoRSxJQUFNVyxTQUFTLGdCQUFHWCwyQ0FBSSxDQUFDO0VBQUEsT0FBTSw4TUFBNkI7QUFBQSxFQUFDO0FBQzNELElBQU1ZLFFBQVEsZ0JBQUdaLDJDQUFJLENBQUM7RUFBQSxPQUFNLDJNQUE0QjtBQUFBLEVBQUM7QUFDekQsSUFBTWEsT0FBTyxnQkFBR2IsMkNBQUksQ0FBQztFQUFBLE9BQU0sd01BQTJCO0FBQUEsRUFBQztBQUN2RCxJQUFNSyxRQUFRLGdCQUFHTCwyQ0FBSSxDQUFDO0VBQUEsT0FBTSwyTUFBNEI7QUFBQSxFQUFDO0FBQ3pELElBQU1jLElBQUksR0FBRyxDQUNUO0VBQUVDLEVBQUUsRUFBRSxVQUFVO0VBQUVDLEtBQUssRUFBRSxVQUFVO0VBQUVDLElBQUksRUFBRXRCLHNEQUFJLENBQUNNLG9EQUFlLEVBQUU7SUFBRWlCLFNBQVMsRUFBRTtFQUFVLENBQUM7QUFBRSxDQUFDLEVBQzVGO0VBQUVILEVBQUUsRUFBRSxXQUFXO0VBQUVDLEtBQUssRUFBRSxXQUFXO0VBQUVDLElBQUksRUFBRXRCLHNEQUFJLENBQUNPLG9EQUFLLEVBQUU7SUFBRWdCLFNBQVMsRUFBRTtFQUFVLENBQUM7QUFBRSxDQUFDLEVBQ3BGO0VBQUVILEVBQUUsRUFBRSxVQUFVO0VBQUVDLEtBQUssRUFBRSxVQUFVO0VBQUVDLElBQUksRUFBRXRCLHNEQUFJLENBQUNRLG9EQUFPLEVBQUU7SUFBRWUsU0FBUyxFQUFFO0VBQVUsQ0FBQztBQUFFLENBQUMsRUFDcEY7RUFBRUgsRUFBRSxFQUFFLFNBQVM7RUFBRUMsS0FB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OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxhQUFhLDhEQUE4RDtBQUMzRSxhQUFhLGtDQUFrQztBQUMvQztBQUNBLGdCQUFnQixnRUFBZ0I7O0FBRVU7QUFDMUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvcGFnZXMvRmluYW5jZS50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9jaGFydC1waWUuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9jb2lucy5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3BsdXMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9yZWNlaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgU3VzcGVuc2UsIGxhenkgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMYXlvdXREYXNoYm9hcmQsIENvaW5zLCBSZWNlaXB0LCBQaWVDaGFydCwgU2V0dGluZ3MgYXMgU2V0dGluZ3NJY29uLCBQbHVzIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvYnV0dG9uJztcbmltcG9ydCB7IENvbnRlbnRMb2FkaW5nRmFsbGJhY2sgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2xvYWRpbmctZmFsbGJhY2snO1xuLy8gTGF6eSBsb2FkIHRhYiBjb21wb25lbnRzIGZvciBjb2RlIHNwbGl0dGluZ1xuY29uc3QgRmluYW5jZU92ZXJ2aWV3ID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vRmluYW5jZS9PdmVydmlldycpKTtcbmNvbnN0IE9mZmVyaW5ncyA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL0ZpbmFuY2UvT2ZmZXJpbmdzJykpO1xuY29uc3QgRXhwZW5zZXMgPSBsYXp5KCgpID0+IGltcG9ydCgnLi9GaW5hbmNlL0V4cGVuc2VzJykpO1xuY29uc3QgQnVkZ2V0cyA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL0ZpbmFuY2UvQnVkZ2V0cycpKTtcbmNvbnN0IFNldHRpbmdzID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vRmluYW5jZS9TZXR0aW5ncycpKTtcbmNvbnN0IHRhYnMgPSBbXG4gICAgeyBpZDogJ292ZXJ2aWV3JywgbGFiZWw6ICdPdmVydmlldycsIGljb246IF9qc3goTGF5b3V0RGFzaGJvYXJkLCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSkgfSxcbiAgICB7IGlkOiAnb2ZmZXJpbmdzJywgbGFiZWw6ICdPZmZlcmluZ3MnLCBpY29uOiBfanN4KENvaW5zLCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSkgfSxcbiAgICB7IGlkOiAnZXhwZW5zZXMnLCBsYWJlbDogJ0V4cGVuc2VzJywgaWNvbjogX2pzeChSZWNlaXB0LCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSkgfSxcbiAgICB7IGlkOiAnYnVkZ2V0cycsIGxhYmVsOiAnQnVkZ2V0cycsIGljb246IF9qc3goUGllQ2hhcnQsIHsgY2xhc3NOYW1lOiBcInctNCBoLTRcIiB9KSB9LFxuICAgIHsgaWQ6ICdzZXR0aW5ncycsIGxhYmVsOiAnU2V0dGluZ3MnLCBpY29uOiBfanN4KFNldHRpbmdzSWNvbiwgeyBjbGFzc05hbWU6IFwidy00IGgtNFwiIH0pIH0sXG5dO1xuY29uc3QgRmluYW5jZSA9ICgpID0+IHtcbiAgICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ292ZXJ2aWV3Jyk7XG4gICAgY29uc3QgW3Nob3dPZmZlcmluZ01vZGFsLCBzZXRTaG93T2ZmZXJpbmdNb2RhbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3Nob3dFeHBlbnNlTW9kYWwsIHNldFNob3dFeHBlbnNlTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IGhhbmRsZVJlY29yZE9mZmVyaW5nID0gKCkgPT4ge1xuICAgICAgICBzZXRTaG93T2ZmZXJpbmdNb2RhbCh0cnVlKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUFkZEV4cGVuc2UgPSAoKSA9PiB7XG4gICAgICAgIHNldFNob3dFeHBlbnNlTW9kYWwodHJ1ZSk7XG4gICAgfTtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1pbi1oLXNjcmVlbiBiZy1uZXV0cmFsLTUwXCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSBib3JkZXItYiBib3JkZXItbmV1dHJhbC0yMDBcIiwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIHNtOmp1c3RpZnktYmV0d2VlbiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFwiRmluYW5jZVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJtdC0xIHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJNYW5hZ2UgY2h1cmNoIGZpbmFuY2VzLCBvZmZlcmluZ3MsIGFuZCBleHBlbnNlc1wiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwic2Vjb25kYXJ5XCIsIHNpemU6IFwibWRcIiwgaWNvbjogX2pzeChQbHVzLCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSksIG9uQ2xpY2s6IGhhbmRsZUFkZEV4cGVuc2UsIGNoaWxkcmVuOiBcIkFkZCBFeHBlbnNlXCIgfSksIF9qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBzaXplOiBcIm1kXCIsIGljb246IF9qc3goUGx1cywgeyBjbGFzc05hbWU6IFwidy00IGgtNFwiIH0pLCBvbkNsaWNrOiBoYW5kbGVSZWNvcmRPZmZlcmluZywgY2hpbGRyZW46IFwiUmVjb3JkIE9mZmVyaW5nXCIgfSldIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtdC02IGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTIwMFwiLCBjaGlsZHJlbjogX2pzeChcIm5hdlwiLCB7IGNsYXNzTmFtZTogXCItbWItcHggZmxleCBzcGFjZS14LTYgb3ZlcmZsb3cteC1hdXRvXCIsIGNoaWxkcmVuOiB0YWJzLm1hcCgodGFiKSA9PiAoX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRBY3RpdmVUYWIodGFiLmlkKSwgY2xhc3NOYW1lOiBgXHJcbiAgICAgICAgICAgICAgICAgICAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgd2hpdGVzcGFjZS1ub3dyYXAgcHktMyBweC0xIGJvcmRlci1iLTIgZm9udC1tZWRpdW0gdGV4dC1zbSB0cmFuc2l0aW9uLWNvbG9yc1xyXG4gICAgICAgICAgICAgICAgICAgICR7YWN0aXZlVGFiID09PSB0YWIuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItcHJpbWFyeS02MDAgdGV4dC1wcmltYXJ5LTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1uZXV0cmFsLTYwMCBob3Zlcjp0ZXh0LW5ldXRyYWwtOTAwIGhvdmVyOmJvcmRlci1uZXV0cmFsLTMwMCd9XHJcbiAgICAgICAgICAgICAgICAgIGAsIGNoaWxkcmVuOiBbdGFiLmljb24sIHRhYi5sYWJlbF0gfSwgdGFiLmlkKSkpIH0pIH0pXSB9KSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTZcIiwgY2hpbGRyZW46IF9qc3hzKFN1c3BlbnNlLCB7IGZhbGxiYWNrOiBfanN4KENvbnRlbnRMb2FkaW5nRmFsbGJhY2ssIHt9KSwgY2hpbGRyZW46IFthY3RpdmVUYWIgPT09ICdvdmVydmlldycgJiYgX2pzeChGaW5hbmNlT3ZlcnZpZXcsIHt9KSwgYWN0aXZlVGFiID09PSAnb2ZmZXJpbmdzJyAmJiAoX2pzeChPZmZlcmluZ3MsIHsgc2hvd01vZGFsOiBzaG93T2ZmZXJpbmdNb2RhbCwgb25DbG9zZU1vZGFsOiAoKSA9PiBzZXRTaG93T2ZmZXJpbmdNb2RhbChmYWxzZSkgfSkpLCBhY3RpdmVUYWIgPT09ICdleHBlbnNlcycgJiYgKF9qc3goRXhwZW5zZXMsIHsgc2hvd01vZGFsOiBzaG93RXhwZW5zZU1vZGFsLCBvbkNsb3NlTW9kYWw6ICgpID0+IHNldFNob3dFeHBlbnNlTW9kYWwoZmFsc2UpIH0pKSwgYWN0aXZlVGFiID09PSAnYnVkZ2V0cycgJiYgX2pzeChCdWRnZXRzLCB7fSksIGFjdGl2ZVRhYiA9PT0gJ3NldHRpbmdzJyAmJiBfanN4KFNldHRpbmdzLCB7fSldIH0pIH0pXSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRmluYW5jZTtcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTIxIDEyYy41NTIgMCAxLjAwNS0uNDQ5Ljk1LS45OThhMTAgMTAgMCAwIDAtOC45NTMtOC45NTFjLS41NS0uMDU1LS45OTguMzk4LS45OTguOTV2OGExIDEgMCAwIDAgMSAxelwiLFxuICAgICAga2V5OiBcInB6bWpudVwiXG4gICAgfVxuICBdLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMjEuMjEgMTUuODlBMTAgMTAgMCAxIDEgOCAyLjgzXCIsIGtleTogXCJrMmZwYWtcIiB9XVxuXTtcbmNvbnN0IENoYXJ0UGllID0gY3JlYXRlTHVjaWRlSWNvbihcImNoYXJ0LXBpZVwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQ2hhcnRQaWUgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2hhcnQtcGllLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJjaXJjbGVcIiwgeyBjeDogXCI4XCIsIGN5OiBcIjhcIiwgcjogXCI2XCIsIGtleTogXCIzeWdsd2tcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE4LjA5IDEwLjM3QTYgNiAwIDEgMSAxMC4zNCAxOFwiLCBrZXk6IFwidDVzNnJtXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk03IDZoMXY0XCIsIGtleTogXCIxb2JlazRcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTE2LjcxIDEzLjg4LjcuNzEtMi44MiAyLjgyXCIsIGtleTogXCIxcmJ1eWhcIiB9XVxuXTtcbmNvbnN0IENvaW5zID0gY3JlYXRlTHVjaWRlSWNvbihcImNvaW5zXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBDb2lucyBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb2lucy5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTUgMTJoMTRcIiwga2V5OiBcIjFheXMwaFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgNXYxNFwiLCBrZXk6IFwiczY5OWxlXCIgfV1cbl07XG5jb25zdCBQbHVzID0gY3JlYXRlTHVjaWRlSWNvbihcInBsdXNcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFBsdXMgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGx1cy5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHsgZDogXCJNNCAydjIwbDItMSAyIDEgMi0xIDIgMSAyLTEgMiAxIDItMSAyIDFWMmwtMiAxLTItMS0yIDEtMi0xLTIgMS0yLTEtMiAxWlwiLCBrZXk6IFwicTNhejZnXCIgfVxuICBdLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTYgOGgtNmEyIDIgMCAxIDAgMCA0aDRhMiAyIDAgMSAxIDAgNEg4XCIsIGtleTogXCIxaDRwZXRcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDE3LjV2LTExXCIsIGtleTogXCIxamMxbnlcIiB9XVxuXTtcbmNvbnN0IFJlY2VpcHQgPSBjcmVhdGVMdWNpZGVJY29uKFwicmVjZWlwdFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgUmVjZWlwdCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWNlaXB0LmpzLm1hcFxuIl0sIm5hbWVzIjpbImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJ1c2VTdGF0ZSIsIlN1c3BlbnNlIiwibGF6eSIsIkxheW91dERhc2hib2FyZCIsIkNvaW5zIiwiUmVjZWlwdCIsIlBpZUNoYXJ0IiwiU2V0dGluZ3MiLCJTZXR0aW5nc0ljb24iLCJQbHVzIiwiQnV0dG9uIiwiQ29udGVudExvYWRpbmdGYWxsYmFjayIsIkZpbmFuY2VPdmVydmlldyIsIk9mZmVyaW5ncyIsIkV4cGVuc2VzIiwiQnVkZ2V0cyIsInRhYnMiLCJpZCIsImxhYmVsIiwiaWNvbiIsImNsYXNzTmFtZSIsIkZpbmFuY2UiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJhY3RpdmVUYWIiLCJzZXRBY3RpdmVUYWIiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsInNob3dPZmZlcmluZ01vZGFsIiwic2V0U2hvd09mZmVyaW5nTW9kYWwiLCJfdXNlU3RhdGU1IiwiX3VzZVN0YXRlNiIsInNob3dFeHBlbnNlTW9kYWwiLCJzZXRTaG93RXhwZW5zZU1vZGFsIiwiaGFuZGxlUmVjb3JkT2ZmZXJpbmciLCJoYW5kbGVBZGRFeHBlbnNlIiwiY2hpbGRyZW4iLCJ2YXJpYW50Iiwic2l6ZSIsIm9uQ2xpY2siLCJtYXAiLCJ0YWIiLCJjb25jYXQiLCJmYWxsYmFjayIsInNob3dNb2RhbCIsIm9uQ2xvc2VNb2RhbCJdLCJzb3VyY2VSb290IjoiIn0=