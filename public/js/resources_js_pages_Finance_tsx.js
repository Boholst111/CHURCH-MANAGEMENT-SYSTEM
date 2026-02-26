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
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/api */ "./resources/js/lib/api.ts");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _Finance_Offerings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Finance/Offerings */ "./resources/js/pages/Finance/Offerings.tsx");
/* harmony import */ var _Finance_Expenses__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Finance/Expenses */ "./resources/js/pages/Finance/Expenses.tsx");
/* harmony import */ var _Finance_Budgets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Finance/Budgets */ "./resources/js/pages/Finance/Budgets.tsx");
/* harmony import */ var _Finance_Reports__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Finance/Reports */ "./resources/js/pages/Finance/Reports.tsx");
/* harmony import */ var _Finance_Settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Finance/Settings */ "./resources/js/pages/Finance/Settings.tsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }









var Finance = function Finance() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('overview'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    summary = _useState4[0],
    setSummary = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0]
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    dateRange = _useState8[0],
    setDateRange = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchSummary();
  }, [dateRange]);
  var fetchSummary = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/finance/summary', {
              params: dateRange
            });
          case 1:
            response = _context.v;
            setSummary(response.data.data);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Error fetching financial summary:', _t);
          case 3:
            _context.p = 3;
            setLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function fetchSummary() {
      return _ref.apply(this, arguments);
    };
  }();
  var formatCurrency = function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex justify-between items-center mb-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
        className: "text-2xl font-bold text-gray-900",
        children: "Finance Management"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
          type: "date",
          value: dateRange.start_date,
          onChange: function onChange(e) {
            return setDateRange(_objectSpread(_objectSpread({}, dateRange), {}, {
              start_date: e.target.value
            }));
          },
          className: "px-3 py-2 border border-gray-300 rounded-md"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "self-center",
          children: "to"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
          type: "date",
          value: dateRange.end_date,
          onChange: function onChange(e) {
            return setDateRange(_objectSpread(_objectSpread({}, dateRange), {}, {
              end_date: e.target.value
            }));
          },
          className: "px-3 py-2 border border-gray-300 rounded-md"
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "border-b border-gray-200 mb-6",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
        className: "-mb-px flex space-x-8",
        children: ['overview', 'offerings', 'expenses', 'budgets', 'reports', 'settings'].map(function (tab) {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
            onClick: function onClick() {
              return setActiveTab(tab);
            },
            className: "".concat(activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', " whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize"),
            children: tab
          }, tab);
        })
      })
    }), activeTab === 'overview' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "text-center py-12",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "mt-2 text-gray-600",
          children: "Loading financial data..."
        })]
      }) : summary ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-medium text-gray-500 mb-2",
            children: "Total Giving"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-3xl font-bold text-green-600",
            children: formatCurrency(summary.total_giving)
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
            className: "text-sm text-gray-500 mt-2",
            children: [summary.total_transactions, " transactions"]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-medium text-gray-500 mb-2",
            children: "Average Transaction"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-3xl font-bold text-blue-600",
            children: formatCurrency(summary.average_transaction)
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-medium text-gray-500 mb-2",
            children: "Unique Givers"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-3xl font-bold text-purple-600",
            children: summary.unique_givers
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-medium text-gray-500 mb-2",
            children: "Total Transactions"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-3xl font-bold text-indigo-600",
            children: summary.total_transactions
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6 md:col-span-2 lg:col-span-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-lg font-semibold mb-4",
            children: "Payment Method Breakdown"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
            children: Object.entries(summary.by_payment_method || {}).map(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                method = _ref3[0],
                data = _ref3[1];
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "border border-gray-200 rounded-lg p-4",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                  className: "text-sm font-medium text-gray-500 capitalize mb-2",
                  children: method
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                  className: "text-2xl font-bold text-gray-900",
                  children: formatCurrency(data.total)
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                  className: "text-sm text-gray-500 mt-1",
                  children: [data.count, " transactions"]
                })]
              }, method);
            })
          })]
        })]
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "text-center py-12 text-gray-500",
        children: "No financial data available for the selected period."
      })
    }), activeTab === 'offerings' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Finance_Offerings__WEBPACK_IMPORTED_MODULE_4__["default"], {}), activeTab === 'expenses' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Finance_Expenses__WEBPACK_IMPORTED_MODULE_5__["default"], {}), activeTab === 'budgets' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Finance_Budgets__WEBPACK_IMPORTED_MODULE_6__["default"], {}), activeTab === 'reports' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Finance_Reports__WEBPACK_IMPORTED_MODULE_7__["default"], {}), activeTab === 'settings' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Finance_Settings__WEBPACK_IMPORTED_MODULE_8__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Finance);

/***/ },

/***/ "./resources/js/pages/Finance/Budgets.tsx"
/*!************************************************!*\
  !*** ./resources/js/pages/Finance/Budgets.tsx ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trending-down.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trending-up.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var Budgets = function Budgets() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    budgets = _useState2[0],
    setBudgets = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedBudget = _useState4[0],
    setSelectedBudget = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    budgetItems = _useState6[0],
    setBudgetItems = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    categories = _useState8[0],
    setCategories = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState0 = _slicedToArray(_useState9, 2),
    loading = _useState0[0],
    setLoading = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState10 = _slicedToArray(_useState1, 2),
    showAddModal = _useState10[0],
    setShowAddModal = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    submitting = _useState12[0],
    setSubmitting = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      name: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
      items: []
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    formData = _useState14[0],
    setFormData = _useState14[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchBudgets();
    fetchCategories();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (selectedBudget) {
      fetchBudgetItems(selectedBudget.id);
    }
  }, [selectedBudget]);
  var fetchBudgets = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, budgetList, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/budgets');
          case 1:
            response = _context.v;
            budgetList = response.data.data || [];
            setBudgets(budgetList);
            if (budgetList.length > 0 && !selectedBudget) {
              setSelectedBudget(budgetList[0]);
            }
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Error fetching budgets:', _t);
          case 3:
            _context.p = 3;
            setLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function fetchBudgets() {
      return _ref.apply(this, arguments);
    };
  }();
  var fetchBudgetItems = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(budgetId) {
      var response, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get("/budgets/".concat(budgetId, "/items"));
          case 1:
            response = _context2.v;
            setBudgetItems(response.data.data || []);
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Error fetching budget items:', _t2);
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function fetchBudgetItems(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var fetchCategories = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var response, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/expense-categories');
          case 1:
            response = _context3.v;
            setCategories(response.data.data || []);
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t3 = _context3.v;
            console.error('Error fetching categories:', _t3);
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    }));
    return function fetchCategories() {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(e) {
      var _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            e.preventDefault();
            _context4.p = 1;
            setSubmitting(true);
            _context4.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].post('/budgets', {
              name: formData.name,
              start_date: formData.start_date,
              end_date: formData.end_date,
              items: formData.items.map(function (item) {
                return {
                  expense_category_id: parseInt(item.expense_category_id),
                  budgeted_amount: parseFloat(item.budgeted_amount)
                };
              })
            });
          case 2:
            setShowAddModal(false);
            setFormData({
              name: '',
              start_date: new Date().toISOString().split('T')[0],
              end_date: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
              items: []
            });
            fetchBudgets();
            alert('Budget created successfully!');
            _context4.n = 4;
            break;
          case 3:
            _context4.p = 3;
            _t4 = _context4.v;
            console.error('Error creating budget:', _t4);
            alert('Failed to create budget. Please try again.');
          case 4:
            _context4.p = 4;
            setSubmitting(false);
            return _context4.f(4);
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 3, 4, 5]]);
    }));
    return function handleSubmit(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  var addBudgetItem = function addBudgetItem() {
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      items: [].concat(_toConsumableArray(formData.items), [{
        expense_category_id: '',
        budgeted_amount: ''
      }])
    }));
  };
  var removeBudgetItem = function removeBudgetItem(index) {
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      items: formData.items.filter(function (_, i) {
        return i !== index;
      })
    }));
  };
  var updateBudgetItem = function updateBudgetItem(index, field, value) {
    var newItems = _toConsumableArray(formData.items);
    newItems[index] = _objectSpread(_objectSpread({}, newItems[index]), {}, _defineProperty({}, field, value));
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      items: newItems
    }));
  };
  var formatCurrency = function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };
  var getVarianceColor = function getVarianceColor(variance) {
    if (variance > 0) return 'text-green-600';
    if (variance < 0) return 'text-red-600';
    return 'text-gray-600';
  };
  var getVarianceIcon = function getVarianceIcon(variance) {
    if (variance > 0) return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
      size: 16,
      className: "inline"
    });
    if (variance < 0) return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
      size: 16,
      className: "inline"
    });
    return null;
  };
  var totalBudgeted = budgetItems.reduce(function (sum, item) {
    return sum + item.budgeted_amount;
  }, 0);
  var totalActual = budgetItems.reduce(function (sum, item) {
    return sum + item.actual_amount;
  }, 0);
  var totalVariance = totalBudgeted - totalActual;
  var utilizationPercentage = totalBudgeted > 0 ? totalActual / totalBudgeted * 100 : 0;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex justify-between items-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-2xl font-bold text-gray-900",
        children: "Budgets"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: function onClick() {
          return setShowAddModal(true);
        },
        className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
          size: 20
        }), "Create Budget"]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-4",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
          className: "text-sm font-medium text-gray-700",
          children: "Select Budget:"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("select", {
          value: (selectedBudget === null || selectedBudget === void 0 ? void 0 : selectedBudget.id) || '',
          onChange: function onChange(e) {
            var budget = budgets.find(function (b) {
              return b.id === parseInt(e.target.value);
            });
            setSelectedBudget(budget || null);
          },
          className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          children: budgets.map(function (budget) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
              value: budget.id,
              children: [budget.name, " (", budget.period_type, ") - ", budget.is_active ? 'Active' : 'Inactive']
            }, budget.id);
          })
        })]
      })
    }), loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "p-12 text-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "mt-2 text-gray-600",
        children: "Loading budget data..."
      })]
    }) : selectedBudget ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-4 gap-6",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-medium text-gray-500 mb-2",
            children: "Total Budgeted"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-3xl font-bold text-blue-600",
            children: formatCurrency(totalBudgeted)
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-medium text-gray-500 mb-2",
            children: "Total Actual"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-3xl font-bold text-purple-600",
            children: formatCurrency(totalActual)
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-medium text-gray-500 mb-2",
            children: "Variance"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
            className: "text-3xl font-bold ".concat(getVarianceColor(totalVariance)),
            children: [formatCurrency(Math.abs(totalVariance)), getVarianceIcon(totalVariance)]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-medium text-gray-500 mb-2",
            children: "Utilization"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
            className: "text-3xl font-bold text-indigo-600",
            children: [utilizationPercentage.toFixed(1), "%"]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "mt-2 w-full bg-gray-200 rounded-full h-2",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "h-2 rounded-full ".concat(utilizationPercentage > 100 ? 'bg-red-600' : 'bg-green-600'),
              style: {
                width: "".concat(Math.min(utilizationPercentage, 100), "%")
              }
            })
          })]
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "p-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-lg font-semibold mb-4",
            children: "Budget Items"
          }), budgetItems.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-center text-gray-500 py-8",
            children: "No budget items found."
          }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "overflow-x-auto",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
              className: "w-full",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
                className: "bg-gray-50 border-b border-gray-200",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                    children: "Category"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                    className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                    children: "Budgeted"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                    className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                    children: "Actual"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                    className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                    children: "Variance"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                    className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                    children: "%"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                    className: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider",
                    children: "Status"
                  })]
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
                className: "bg-white divide-y divide-gray-200",
                children: budgetItems.map(function (item) {
                  var isOverBudget = item.actual_amount > item.budgeted_amount;
                  var utilizationPct = item.budgeted_amount > 0 ? item.actual_amount / item.budgeted_amount * 100 : 0;
                  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                    className: "hover:bg-gray-50",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                      className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                      children: item.category_name
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                      className: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900",
                      children: formatCurrency(item.budgeted_amount)
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                      className: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900",
                      children: formatCurrency(item.actual_amount)
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                      className: "px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ".concat(getVarianceColor(item.variance)),
                      children: [formatCurrency(Math.abs(item.variance)), getVarianceIcon(item.variance)]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                      className: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900",
                      children: [utilizationPct.toFixed(1), "%"]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                      className: "px-6 py-4 whitespace-nowrap text-center",
                      children: [isOverBudget && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "inline-flex items-center gap-1 text-red-600",
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                          size: 16
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                          className: "text-xs",
                          children: "Over Budget"
                        })]
                      }), !isOverBudget && utilizationPct > 90 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        className: "inline-flex items-center gap-1 text-yellow-600",
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                          size: 16
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                          className: "text-xs",
                          children: "Near Limit"
                        })]
                      }), !isOverBudget && utilizationPct <= 90 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-green-600 text-xs",
                        children: "On Track"
                      })]
                    })]
                  }, item.id);
                })
              })]
            })
          })]
        })
      })]
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-12 text-center text-gray-500",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: "No budgets available. Create your first budget to get started."
      })
    }), showAddModal && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
          className: "text-xl font-bold mb-4",
          children: "Create Budget"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
          onSubmit: handleSubmit,
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Budget Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "text",
                value: formData.name,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    name: e.target.value
                  }));
                },
                required: true,
                placeholder: "e.g., Annual Budget 2025",
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                  className: "block text-sm font-medium text-gray-700 mb-1",
                  children: ["Start Date ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-red-500",
                    children: "*"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "date",
                  value: formData.start_date,
                  onChange: function onChange(e) {
                    return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                      start_date: e.target.value
                    }));
                  },
                  required: true,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                  className: "block text-sm font-medium text-gray-700 mb-1",
                  children: ["End Date ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-red-500",
                    children: "*"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "date",
                  value: formData.end_date,
                  onChange: function onChange(e) {
                    return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                      end_date: e.target.value
                    }));
                  },
                  required: true,
                  className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex justify-between items-center mb-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                  className: "block text-sm font-medium text-gray-700",
                  children: ["Budget Items ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-red-500",
                    children: "*"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                  type: "button",
                  onClick: addBudgetItem,
                  className: "text-sm text-blue-600 hover:text-blue-700",
                  children: "+ Add Item"
                })]
              }), formData.items.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-sm text-gray-500 text-center py-4 border border-dashed border-gray-300 rounded-lg",
                children: "No budget items added. Click \"Add Item\" to start."
              }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "space-y-2",
                children: formData.items.map(function (item, index) {
                  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex gap-2 items-start",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                      value: item.expense_category_id,
                      onChange: function onChange(e) {
                        return updateBudgetItem(index, 'expense_category_id', e.target.value);
                      },
                      required: true,
                      className: "flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                        value: "",
                        children: "Select Category"
                      }), categories.map(function (cat) {
                        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                          value: cat.id,
                          children: cat.name
                        }, cat.id);
                      })]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      type: "number",
                      step: "0.01",
                      min: "0.01",
                      value: item.budgeted_amount,
                      onChange: function onChange(e) {
                        return updateBudgetItem(index, 'budgeted_amount', e.target.value);
                      },
                      required: true,
                      placeholder: "Amount",
                      className: "w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                      type: "button",
                      onClick: function onClick() {
                        return removeBudgetItem(index);
                      },
                      className: "px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg",
                      children: "Remove"
                    })]
                  }, index);
                })
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "bg-blue-50 p-4 rounded-lg",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: "text-sm font-medium text-blue-900",
                children: ["Total Budget: ", formatCurrency(formData.items.reduce(function (sum, item) {
                  return sum + (parseFloat(item.budgeted_amount) || 0);
                }, 0))]
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex justify-end gap-3 mt-6",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "button",
              onClick: function onClick() {
                return setShowAddModal(false);
              },
              className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50",
              disabled: submitting,
              children: "Cancel"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "submit",
              disabled: submitting || formData.items.length === 0,
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50",
              children: submitting ? 'Creating...' : 'Create Budget'
            })]
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Budgets);

/***/ },

/***/ "./resources/js/pages/Finance/Expenses.tsx"
/*!*************************************************!*\
  !*** ./resources/js/pages/Finance/Expenses.tsx ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check-big.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/archive.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/clock.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/search.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var Expenses = function Expenses() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    expenses = _useState2[0],
    setExpenses = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    categories = _useState4[0],
    setCategories = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    vendors = _useState6[0],
    setVendors = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    funds = _useState8[0],
    setFunds = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState0 = _slicedToArray(_useState9, 2),
    loading = _useState0[0],
    setLoading = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState10 = _slicedToArray(_useState1, 2),
    showAddModal = _useState10[0],
    setShowAddModal = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    submitting = _useState12[0],
    setSubmitting = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      search: '',
      category_id: '',
      status: '',
      start_date: '',
      end_date: ''
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    filters = _useState14[0],
    setFilters = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      expense_category_id: '',
      vendor_id: '',
      fund_id: '',
      amount: '',
      expense_date: new Date().toISOString().split('T')[0],
      description: '',
      payment_method: 'cash',
      reference_number: ''
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    formData = _useState16[0],
    setFormData = _useState16[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchExpenses();
    fetchCategories();
    fetchVendors();
    fetchFunds();
  }, [filters]);
  var fetchExpenses = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/expenses', {
              params: filters
            });
          case 1:
            response = _context.v;
            setExpenses(response.data.data || []);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Error fetching expenses:', _t);
          case 3:
            _context.p = 3;
            setLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function fetchExpenses() {
      return _ref.apply(this, arguments);
    };
  }();
  var fetchCategories = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/expense-categories');
          case 1:
            response = _context2.v;
            setCategories(response.data.data || []);
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Error fetching categories:', _t2);
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function fetchCategories() {
      return _ref2.apply(this, arguments);
    };
  }();
  var fetchVendors = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var response, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/vendors');
          case 1:
            response = _context3.v;
            setVendors(response.data.data || []);
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t3 = _context3.v;
            console.error('Error fetching vendors:', _t3);
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    }));
    return function fetchVendors() {
      return _ref3.apply(this, arguments);
    };
  }();
  var fetchFunds = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var response, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            _context4.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/funds');
          case 1:
            response = _context4.v;
            setFunds(response.data.data || []);
            _context4.n = 3;
            break;
          case 2:
            _context4.p = 2;
            _t4 = _context4.v;
            console.error('Error fetching funds:', _t4);
          case 3:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 2]]);
    }));
    return function fetchFunds() {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(e) {
      var _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            e.preventDefault();
            _context5.p = 1;
            setSubmitting(true);
            _context5.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].post('/expenses', _objectSpread(_objectSpread({}, formData), {}, {
              amount: parseFloat(formData.amount)
            }));
          case 2:
            setShowAddModal(false);
            setFormData({
              expense_category_id: '',
              vendor_id: '',
              fund_id: '',
              amount: '',
              expense_date: new Date().toISOString().split('T')[0],
              description: '',
              payment_method: 'cash',
              reference_number: ''
            });
            fetchExpenses();
            alert('Expense recorded successfully!');
            _context5.n = 4;
            break;
          case 3:
            _context5.p = 3;
            _t5 = _context5.v;
            console.error('Error recording expense:', _t5);
            alert('Failed to record expense. Please try again.');
          case 4:
            _context5.p = 4;
            setSubmitting(false);
            return _context5.f(4);
          case 5:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 3, 4, 5]]);
    }));
    return function handleSubmit(_x) {
      return _ref5.apply(this, arguments);
    };
  }();
  var formatCurrency = function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };
  var formatDate = function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  var getStatusBadge = function getStatusBadge(status) {
    var styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    var icons = {
      pending: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
        size: 14
      }),
      approved: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
        size: 14
      }),
      rejected: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
        size: 14
      })
    };
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
      className: "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ".concat(styles[status]),
      children: [icons[status], status.charAt(0).toUpperCase() + status.slice(1)]
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex justify-between items-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-2xl font-bold text-gray-900",
        children: "Expenses"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: function onClick() {
          return setShowAddModal(true);
        },
        className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
          size: 20
        }), "Record Expense"]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-4",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-5 gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "relative",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
            className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
            size: 20
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "text",
            placeholder: "Search expenses...",
            value: filters.search,
            onChange: function onChange(e) {
              return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
                search: e.target.value
              }));
            },
            className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
          value: filters.category_id,
          onChange: function onChange(e) {
            return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
              category_id: e.target.value
            }));
          },
          className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "",
            children: "All Categories"
          }), categories.map(function (cat) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: cat.id,
              children: cat.name
            }, cat.id);
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
          value: filters.status,
          onChange: function onChange(e) {
            return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
              status: e.target.value
            }));
          },
          className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "",
            children: "All Status"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "pending",
            children: "Pending"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "approved",
            children: "Approved"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "rejected",
            children: "Rejected"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
          type: "date",
          value: filters.start_date,
          onChange: function onChange(e) {
            return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
              start_date: e.target.value
            }));
          },
          className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
          type: "date",
          value: filters.end_date,
          onChange: function onChange(e) {
            return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
              end_date: e.target.value
            }));
          },
          className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      children: loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-12 text-center",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "mt-2 text-gray-600",
          children: "Loading expenses..."
        })]
      }) : expenses.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "p-12 text-center text-gray-500",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: "No expenses found for the selected filters."
        })
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "overflow-x-auto",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
          className: "w-full",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
            className: "bg-gray-50 border-b border-gray-200",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Date"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Category"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Vendor"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Description"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Amount"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Status"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Actions"
              })]
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
            className: "bg-white divide-y divide-gray-200",
            children: expenses.map(function (expense) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                className: "hover:bg-gray-50",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: formatDate(expense.expense_date)
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: expense.category_name
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: expense.vendor_name || '-'
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 text-sm text-gray-900 max-w-xs truncate",
                  children: expense.description
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600",
                  children: formatCurrency(expense.amount)
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm",
                  children: getStatusBadge(expense.status)
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    className: "text-blue-600 hover:text-blue-900 mr-3",
                    children: "View"
                  }), expense.status === 'pending' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                      className: "text-green-600 hover:text-green-900 mr-3",
                      children: "Approve"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                      className: "text-red-600 hover:text-red-900 mr-3",
                      children: "Reject"
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    className: "text-amber-600 hover:text-amber-900",
                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                      size: 16,
                      className: "inline"
                    })
                  })]
                })]
              }, expense.id);
            })
          })]
        })
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
        className: "text-lg font-semibold mb-4",
        children: "Summary"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-4 gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-gray-500",
            children: "Total Expenses"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold text-red-600",
            children: formatCurrency(expenses.reduce(function (sum, e) {
              return sum + e.amount;
            }, 0))
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-gray-500",
            children: "Approved"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold text-green-600",
            children: formatCurrency(expenses.filter(function (e) {
              return e.status === 'approved';
            }).reduce(function (sum, e) {
              return sum + e.amount;
            }, 0))
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-gray-500",
            children: "Pending"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold text-yellow-600",
            children: formatCurrency(expenses.filter(function (e) {
              return e.status === 'pending';
            }).reduce(function (sum, e) {
              return sum + e.amount;
            }, 0))
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-gray-500",
            children: "Number of Transactions"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold text-blue-600",
            children: expenses.length
          })]
        })]
      })]
    }), showAddModal && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
          className: "text-xl font-bold mb-4",
          children: "Record Expense"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
          onSubmit: handleSubmit,
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Category ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                value: formData.expense_category_id,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    expense_category_id: e.target.value
                  }));
                },
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "",
                  children: "Select Category"
                }), categories.map(function (cat) {
                  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                    value: cat.id,
                    children: cat.name
                  }, cat.id);
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Vendor"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                value: formData.vendor_id,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    vendor_id: e.target.value
                  }));
                },
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "",
                  children: "Select Vendor (Optional)"
                }), vendors.map(function (vendor) {
                  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                    value: vendor.id,
                    children: vendor.name
                  }, vendor.id);
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Fund"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                value: formData.fund_id,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    fund_id: e.target.value
                  }));
                },
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "",
                  children: "Select Fund (Optional)"
                }), funds.map(function (fund) {
                  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                    value: fund.id,
                    children: fund.name
                  }, fund.id);
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Amount ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "number",
                step: "0.01",
                min: "0.01",
                value: formData.amount,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    amount: e.target.value
                  }));
                },
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Date ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "date",
                value: formData.expense_date,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    expense_date: e.target.value
                  }));
                },
                required: true,
                max: new Date().toISOString().split('T')[0],
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Description ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                value: formData.description,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    description: e.target.value
                  }));
                },
                required: true,
                rows: 3,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Payment Method ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                value: formData.payment_method,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    payment_method: e.target.value
                  }));
                },
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "cash",
                  children: "Cash"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "check",
                  children: "Check"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "bank_transfer",
                  children: "Bank Transfer"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "online",
                  children: "Online"
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Reference Number"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "text",
                value: formData.reference_number,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    reference_number: e.target.value
                  }));
                },
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex justify-end gap-3 mt-6",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "button",
              onClick: function onClick() {
                return setShowAddModal(false);
              },
              className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50",
              disabled: submitting,
              children: "Cancel"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "submit",
              disabled: submitting,
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50",
              children: submitting ? 'Recording...' : 'Record Expense'
            })]
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Expenses);

/***/ },

/***/ "./resources/js/pages/Finance/Offerings.tsx"
/*!**************************************************!*\
  !*** ./resources/js/pages/Finance/Offerings.tsx ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/archive.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/search.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var Offerings = function Offerings() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    offerings = _useState2[0],
    setOfferings = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    offeringTypes = _useState4[0],
    setOfferingTypes = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    members = _useState6[0],
    setMembers = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState8 = _slicedToArray(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    showAddModal = _useState0[0],
    setShowAddModal = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState10 = _slicedToArray(_useState1, 2),
    submitting = _useState10[0],
    setSubmitting = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      search: '',
      offering_type_id: '',
      payment_method: '',
      start_date: '',
      end_date: ''
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    filters = _useState12[0],
    setFilters = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      member_id: '',
      offering_type_id: '',
      amount: '',
      payment_method: 'cash',
      reference_number: '',
      offering_date: new Date().toISOString().split('T')[0],
      notes: '',
      is_anonymous: false
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    formData = _useState14[0],
    setFormData = _useState14[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchOfferings();
    fetchOfferingTypes();
    fetchMembers();
  }, [filters]);
  var fetchOfferings = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/offerings', {
              params: filters
            });
          case 1:
            response = _context.v;
            setOfferings(response.data.data || []);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Error fetching offerings:', _t);
          case 3:
            _context.p = 3;
            setLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function fetchOfferings() {
      return _ref.apply(this, arguments);
    };
  }();
  var fetchOfferingTypes = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/offering-types');
          case 1:
            response = _context2.v;
            setOfferingTypes(response.data.data || []);
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Error fetching offering types:', _t2);
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function fetchOfferingTypes() {
      return _ref2.apply(this, arguments);
    };
  }();
  var fetchMembers = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var response, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/members');
          case 1:
            response = _context3.v;
            setMembers(response.data.data || []);
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t3 = _context3.v;
            console.error('Error fetching members:', _t3);
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    }));
    return function fetchMembers() {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(e) {
      var _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            e.preventDefault();
            _context4.p = 1;
            setSubmitting(true);
            _context4.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].post('/offerings', _objectSpread(_objectSpread({}, formData), {}, {
              member_id: formData.is_anonymous ? null : formData.member_id,
              amount: parseFloat(formData.amount)
            }));
          case 2:
            setShowAddModal(false);
            setFormData({
              member_id: '',
              offering_type_id: '',
              amount: '',
              payment_method: 'cash',
              reference_number: '',
              offering_date: new Date().toISOString().split('T')[0],
              notes: '',
              is_anonymous: false
            });
            fetchOfferings();
            alert('Offering recorded successfully!');
            _context4.n = 4;
            break;
          case 3:
            _context4.p = 3;
            _t4 = _context4.v;
            console.error('Error recording offering:', _t4);
            alert('Failed to record offering. Please try again.');
          case 4:
            _context4.p = 4;
            setSubmitting(false);
            return _context4.f(4);
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 3, 4, 5]]);
    }));
    return function handleSubmit(_x) {
      return _ref4.apply(this, arguments);
    };
  }();
  var formatCurrency = function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };
  var formatDate = function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex justify-between items-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-2xl font-bold text-gray-900",
        children: "Offerings"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: function onClick() {
          return setShowAddModal(true);
        },
        className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
          size: 20
        }), "Record Offering"]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-4",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-5 gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "relative",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
            className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
            size: 20
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "text",
            placeholder: "Search by member...",
            value: filters.search,
            onChange: function onChange(e) {
              return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
                search: e.target.value
              }));
            },
            className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
          value: filters.offering_type_id,
          onChange: function onChange(e) {
            return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
              offering_type_id: e.target.value
            }));
          },
          className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "",
            children: "All Types"
          }), offeringTypes.map(function (type) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: type.id,
              children: type.name
            }, type.id);
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
          value: filters.payment_method,
          onChange: function onChange(e) {
            return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
              payment_method: e.target.value
            }));
          },
          className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "",
            children: "All Methods"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "cash",
            children: "Cash"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "check",
            children: "Check"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "bank_transfer",
            children: "Bank Transfer"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
            value: "online",
            children: "Online"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
          type: "date",
          value: filters.start_date,
          onChange: function onChange(e) {
            return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
              start_date: e.target.value
            }));
          },
          className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          placeholder: "Start Date"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
          type: "date",
          value: filters.end_date,
          onChange: function onChange(e) {
            return setFilters(_objectSpread(_objectSpread({}, filters), {}, {
              end_date: e.target.value
            }));
          },
          className: "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          placeholder: "End Date"
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      children: loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-12 text-center",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "mt-2 text-gray-600",
          children: "Loading offerings..."
        })]
      }) : offerings.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "p-12 text-center text-gray-500",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: "No offerings found for the selected filters."
        })
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "overflow-x-auto",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
          className: "w-full",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
            className: "bg-gray-50 border-b border-gray-200",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Date"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Member"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Type"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Amount"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Method"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Reference"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Actions"
              })]
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
            className: "bg-white divide-y divide-gray-200",
            children: offerings.map(function (offering) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                className: "hover:bg-gray-50",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: formatDate(offering.offering_date)
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: offering.is_anonymous ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-gray-500 italic",
                    children: "Anonymous"
                  }) : offering.member_name || 'N/A'
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: offering.offering_type_name
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600",
                  children: formatCurrency(offering.amount)
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize",
                  children: offering.payment_method.replace('_', ' ')
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                  children: offering.reference_number || '-'
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    className: "text-blue-600 hover:text-blue-900 mr-3",
                    onClick: function onClick() {},
                    children: "View"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    className: "text-amber-600 hover:text-amber-900",
                    onClick: function onClick() {},
                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                      size: 16,
                      className: "inline"
                    })
                  })]
                })]
              }, offering.id);
            })
          })]
        })
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
        className: "text-lg font-semibold mb-4",
        children: "Summary"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-gray-500",
            children: "Total Offerings"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold text-green-600",
            children: formatCurrency(offerings.reduce(function (sum, o) {
              return sum + (Number(o.amount) || 0);
            }, 0))
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-gray-500",
            children: "Number of Transactions"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold text-blue-600",
            children: offerings.length
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-gray-500",
            children: "Average Offering"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold text-purple-600",
            children: offerings.length > 0 ? formatCurrency(offerings.reduce(function (sum, o) {
              return sum + (Number(o.amount) || 0);
            }, 0) / offerings.length) : formatCurrency(0)
          })]
        })]
      })]
    }), showAddModal && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
          className: "text-xl font-bold mb-4",
          children: "Record Offering"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
          onSubmit: handleSubmit,
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Anonymous Offering"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "checkbox",
                checked: formData.is_anonymous,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    is_anonymous: e.target.checked,
                    member_id: ''
                  }));
                },
                className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              })]
            }), !formData.is_anonymous && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Member ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                value: formData.member_id,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    member_id: e.target.value
                  }));
                },
                required: !formData.is_anonymous,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "",
                  children: "Select Member"
                }), members.map(function (member) {
                  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("option", {
                    value: member.id,
                    children: [member.first_name, " ", member.last_name]
                  }, member.id);
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Offering Type ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                value: formData.offering_type_id,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    offering_type_id: e.target.value
                  }));
                },
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "",
                  children: "Select Type"
                }), offeringTypes.map(function (type) {
                  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                    value: type.id,
                    children: type.name
                  }, type.id);
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Amount ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "number",
                step: "0.01",
                min: "0.01",
                value: formData.amount,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    amount: e.target.value
                  }));
                },
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Payment Method ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                value: formData.payment_method,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    payment_method: e.target.value
                  }));
                },
                required: true,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "cash",
                  children: "Cash"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "check",
                  children: "Check"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "bank_transfer",
                  children: "Bank Transfer"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: "online",
                  children: "Online"
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: ["Date ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "date",
                value: formData.offering_date,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    offering_date: e.target.value
                  }));
                },
                required: true,
                max: new Date().toISOString().split('T')[0],
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Reference Number"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "text",
                value: formData.reference_number,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    reference_number: e.target.value
                  }));
                },
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                className: "block text-sm font-medium text-gray-700 mb-1",
                children: "Notes"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
                value: formData.notes,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    notes: e.target.value
                  }));
                },
                rows: 3,
                className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex justify-end gap-3 mt-6",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "button",
              onClick: function onClick() {
                return setShowAddModal(false);
              },
              className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50",
              disabled: submitting,
              children: "Cancel"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "submit",
              disabled: submitting,
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50",
              children: submitting ? 'Recording...' : 'Record Offering'
            })]
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Offerings);

/***/ },

/***/ "./resources/js/pages/Finance/Reports.tsx"
/*!************************************************!*\
  !*** ./resources/js/pages/Finance/Reports.tsx ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chart-column.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chart-pie.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/calendar.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/download.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trending-up.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var Reports = function Reports() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    generating = _useState2[0],
    setGenerating = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      total_income: 0,
      total_expenses: 0,
      net_position: 0,
      fund_balance: 0
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    statistics = _useState4[0],
    setStatistics = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      start_date: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0]
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    dateRange = _useState6[0],
    setDateRange = _useState6[1];
  // Fetch statistics when date range changes
  react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(function () {
    fetchStatistics();
  }, [dateRange]);
  var fetchStatistics = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/reports/quick-statistics', {
              params: dateRange
            });
          case 1:
            response = _context.v;
            if (response.data.success) {
              setStatistics(response.data.data);
            }
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Error fetching statistics:', _t);
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function fetchStatistics() {
      return _ref.apply(this, arguments);
    };
  }();
  var formatCurrency = function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };
  var generateReport = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(reportType) {
      var response, url, link, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            setGenerating(true);
            _context2.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get("/reports/".concat(reportType), {
              params: dateRange,
              responseType: 'blob'
            });
          case 1:
            response = _context2.v;
            // Create download link
            url = window.URL.createObjectURL(new Blob([response.data]));
            link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "".concat(reportType, "-report-").concat(Date.now(), ".pdf"));
            document.body.appendChild(link);
            link.click();
            link.remove();
            alert('Report generated successfully!');
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Error generating report:', _t2);
            alert('Failed to generate report. Please try again.');
          case 3:
            _context2.p = 3;
            setGenerating(false);
            return _context2.f(3);
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2, 3, 4]]);
    }));
    return function generateReport(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var reports = [{
    id: 'financial-summary',
    title: 'Financial Summary Report',
    description: 'Comprehensive overview of all financial activities including income, expenses, and net position.',
    icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
      size: 24,
      className: "text-blue-600"
    }),
    color: 'bg-blue-50 border-blue-200'
  }, {
    id: 'income-statement',
    title: 'Income Statement',
    description: 'Detailed breakdown of all income sources including offerings, tithes, and other revenue.',
    icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
      size: 24,
      className: "text-green-600"
    }),
    color: 'bg-green-50 border-green-200'
  }, {
    id: 'expense-report',
    title: 'Expense Report',
    description: 'Complete listing of all expenses categorized by type, vendor, and fund allocation.',
    icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
      size: 24,
      className: "text-red-600"
    }),
    color: 'bg-red-50 border-red-200'
  }, {
    id: 'budget-variance',
    title: 'Budget Variance Report',
    description: 'Analysis of budgeted vs actual spending across all categories with variance calculations.',
    icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
      size: 24,
      className: "text-purple-600"
    }),
    color: 'bg-purple-50 border-purple-200'
  }, {
    id: 'donor-giving',
    title: 'Donor Giving Report',
    description: 'Individual donor contribution history for tax purposes and donor management.',
    icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
      size: 24,
      className: "text-indigo-600"
    }),
    color: 'bg-indigo-50 border-indigo-200'
  }, {
    id: 'fund-balance',
    title: 'Fund Balance Report',
    description: 'Current balances and transaction history for all restricted and unrestricted funds.',
    icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
      size: 24,
      className: "text-amber-600"
    }),
    color: 'bg-amber-50 border-amber-200'
  }];
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-2xl font-bold text-gray-900 mb-2",
        children: "Financial Reports"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-gray-600",
        children: "Generate comprehensive financial reports for analysis and compliance."
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
        className: "text-lg font-semibold mb-4",
        children: "Report Period"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex-1",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            className: "block text-sm font-medium text-gray-700 mb-2",
            children: "Start Date"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "date",
            value: dateRange.start_date,
            onChange: function onChange(e) {
              return setDateRange(_objectSpread(_objectSpread({}, dateRange), {}, {
                start_date: e.target.value
              }));
            },
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex-1",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            className: "block text-sm font-medium text-gray-700 mb-2",
            children: "End Date"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "date",
            value: dateRange.end_date,
            onChange: function onChange(e) {
              return setDateRange(_objectSpread(_objectSpread({}, dateRange), {}, {
                end_date: e.target.value
              }));
            },
            className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex gap-2 self-end",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
            onClick: function onClick() {
              var now = new Date();
              setDateRange({
                start_date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0],
                end_date: now.toISOString().split('T')[0]
              });
            },
            className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50",
            children: "This Month"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
            onClick: function onClick() {
              var now = new Date();
              setDateRange({
                start_date: new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0],
                end_date: now.toISOString().split('T')[0]
              });
            },
            className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50",
            children: "This Year"
          })]
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      children: reports.map(function (report) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6 border-2 ".concat(report.color, " hover:shadow-lg transition-shadow"),
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex items-start justify-between mb-4",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "p-3 rounded-lg bg-white",
              children: report.icon
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-lg font-semibold text-gray-900 mb-2",
            children: report.title
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-gray-600 mb-4",
            children: report.description
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
            onClick: function onClick() {
              return generateReport(report.id);
            },
            disabled: generating,
            className: "w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
              size: 16
            }), generating ? 'Generating...' : 'Generate Report']
          })]
        }, report.id);
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
        className: "text-lg font-semibold mb-4",
        children: "Quick Statistics"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-4 gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "p-4 bg-blue-50 rounded-lg",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-blue-600 font-medium mb-1",
            children: "Total Income"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold text-blue-900",
            children: formatCurrency(statistics.total_income)
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-xs text-blue-600 mt-1",
            children: "For selected period"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "p-4 bg-red-50 rounded-lg",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 font-medium mb-1",
            children: "Total Expenses"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold text-red-900",
            children: formatCurrency(statistics.total_expenses)
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-xs text-red-600 mt-1",
            children: "For selected period"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "p-4 bg-green-50 rounded-lg",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-green-600 font-medium mb-1",
            children: "Net Position"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold ".concat(statistics.net_position >= 0 ? 'text-green-900' : 'text-red-900'),
            children: formatCurrency(statistics.net_position)
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-xs text-green-600 mt-1",
            children: "Income - Expenses"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "p-4 bg-purple-50 rounded-lg",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-purple-600 font-medium mb-1",
            children: "Fund Balance"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-2xl font-bold text-purple-900",
            children: formatCurrency(statistics.fund_balance)
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-xs text-purple-600 mt-1",
            children: "All funds combined"
          })]
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-6 bg-blue-50 border-blue-200",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
        className: "text-lg font-semibold text-blue-900 mb-2",
        children: "Report Information"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
        className: "space-y-2 text-sm text-blue-800",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
          className: "flex items-start gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-blue-600",
            children: "\u2022"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: "All reports are generated in PDF format for easy sharing and printing."
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
          className: "flex items-start gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-blue-600",
            children: "\u2022"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: "Reports include detailed transaction listings and summary statistics."
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
          className: "flex items-start gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-blue-600",
            children: "\u2022"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: "Donor giving reports are suitable for tax documentation purposes."
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
          className: "flex items-start gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-blue-600",
            children: "\u2022"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: "All financial data is accurate as of the report generation time."
          })]
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Reports);

/***/ },

/***/ "./resources/js/pages/Finance/Settings.tsx"
/*!*************************************************!*\
  !*** ./resources/js/pages/Finance/Settings.tsx ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/square-pen.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trash-2.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var Settings = function Settings() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('offering_types'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    offeringTypes = _useState4[0],
    setOfferingTypes = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    expenseCategories = _useState6[0],
    setExpenseCategories = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    vendors = _useState8[0],
    setVendors = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState0 = _slicedToArray(_useState9, 2),
    funds = _useState0[0],
    setFunds = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState10 = _slicedToArray(_useState1, 2),
    loading = _useState10[0],
    setLoading = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showModal = _useState12[0],
    setShowModal = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    editingItem = _useState14[0],
    setEditingItem = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState16 = _slicedToArray(_useState15, 2),
    formData = _useState16[0],
    setFormData = _useState16[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchData();
  }, [activeTab]);
  var fetchData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var offeringTypesRes, categoriesRes, vendorsRes, fundsRes, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _t = activeTab;
            _context.n = _t === 'offering_types' ? 1 : _t === 'expense_categories' ? 3 : _t === 'vendors' ? 5 : _t === 'funds' ? 7 : 9;
            break;
          case 1:
            _context.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/offering-types');
          case 2:
            offeringTypesRes = _context.v;
            setOfferingTypes(offeringTypesRes.data.data || []);
            return _context.a(3, 9);
          case 3:
            _context.n = 4;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/expense-categories');
          case 4:
            categoriesRes = _context.v;
            setExpenseCategories(categoriesRes.data.data || []);
            return _context.a(3, 9);
          case 5:
            _context.n = 6;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/vendors');
          case 6:
            vendorsRes = _context.v;
            setVendors(vendorsRes.data.data || []);
            return _context.a(3, 9);
          case 7:
            _context.n = 8;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/funds');
          case 8:
            fundsRes = _context.v;
            setFunds(fundsRes.data.data || []);
            return _context.a(3, 9);
          case 9:
            _context.n = 11;
            break;
          case 10:
            _context.p = 10;
            _t2 = _context.v;
            console.error('Error fetching data:', _t2);
          case 11:
            _context.p = 11;
            setLoading(false);
            return _context.f(11);
          case 12:
            return _context.a(2);
        }
      }, _callee, null, [[0, 10, 11, 12]]);
    }));
    return function fetchData() {
      return _ref.apply(this, arguments);
    };
  }();
  var handleAdd = function handleAdd() {
    setEditingItem(null);
    setFormData(getEmptyFormData());
    setShowModal(true);
  };
  var handleEdit = function handleEdit(item) {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };
  var handleDelete = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
      var endpoint, _t3;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (confirm('Are you sure you want to delete this item?')) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            _context2.p = 1;
            endpoint = getEndpoint();
            _context2.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"]["delete"]("".concat(endpoint, "/").concat(id));
          case 2:
            fetchData();
            alert('Item deleted successfully!');
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t3 = _context2.v;
            console.error('Error deleting item:', _t3);
            alert('Failed to delete item. It may be in use.');
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    }));
    return function handleDelete(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(e) {
      var endpoint, _t4;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            e.preventDefault();
            _context3.p = 1;
            endpoint = getEndpoint();
            if (!editingItem) {
              _context3.n = 3;
              break;
            }
            _context3.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].put("".concat(endpoint, "/").concat(editingItem.id), formData);
          case 2:
            alert('Item updated successfully!');
            _context3.n = 5;
            break;
          case 3:
            _context3.n = 4;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].post(endpoint, formData);
          case 4:
            alert('Item created successfully!');
          case 5:
            setShowModal(false);
            fetchData();
            _context3.n = 7;
            break;
          case 6:
            _context3.p = 6;
            _t4 = _context3.v;
            console.error('Error saving item:', _t4);
            alert('Failed to save item. Please try again.');
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 6]]);
    }));
    return function handleSubmit(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var getEndpoint = function getEndpoint() {
    switch (activeTab) {
      case 'offering_types':
        return '/offering-types';
      case 'expense_categories':
        return '/expense-categories';
      case 'vendors':
        return '/vendors';
      case 'funds':
        return '/funds';
    }
  };
  var getEmptyFormData = function getEmptyFormData() {
    switch (activeTab) {
      case 'offering_types':
      case 'expense_categories':
        return {
          name: '',
          description: '',
          is_active: true
        };
      case 'vendors':
        return {
          name: '',
          contact_name: '',
          email: '',
          phone: '',
          is_active: true
        };
      case 'funds':
        return {
          name: '',
          type: 'unrestricted',
          description: '',
          is_active: true
        };
    }
  };
  var renderTable = function renderTable() {
    if (loading) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-12 text-center",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "mt-2 text-gray-600",
          children: "Loading..."
        })]
      });
    }
    var data = activeTab === 'offering_types' ? offeringTypes : activeTab === 'expense_categories' ? expenseCategories : activeTab === 'vendors' ? vendors : funds;
    if (data.length === 0) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "p-12 text-center text-gray-500",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: "No items found. Click \"Add New\" to create one."
        })
      });
    }
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "overflow-x-auto",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
        className: "w-full",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
          className: "bg-gray-50 border-b border-gray-200",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Name"
            }), activeTab === 'vendors' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Contact"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Email"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Phone"
              })]
            }), activeTab === 'funds' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Type"
            }), (activeTab === 'offering_types' || activeTab === 'expense_categories' || activeTab === 'funds') && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Description"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Status"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Actions"
            })]
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
          className: "bg-white divide-y divide-gray-200",
          children: data.map(function (item) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
              className: "hover:bg-gray-50",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                children: item.name
              }), activeTab === 'vendors' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: item.contact_name || '-'
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: item.email || '-'
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: item.phone || '-'
                })]
              }), activeTab === 'funds' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize",
                children: item.type
              }), (activeTab === 'offering_types' || activeTab === 'expense_categories' || activeTab === 'funds') && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                className: "px-6 py-4 text-sm text-gray-900 max-w-xs truncate",
                children: item.description || '-'
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                className: "px-6 py-4 whitespace-nowrap text-sm",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "px-2 py-1 rounded-full text-xs font-medium ".concat(item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'),
                  children: item.is_active ? 'Active' : 'Inactive'
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                  onClick: function onClick() {
                    return handleEdit(item);
                  },
                  className: "text-blue-600 hover:text-blue-900 mr-3",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                    size: 16,
                    className: "inline"
                  })
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                  onClick: function onClick() {
                    return handleDelete(item.id);
                  },
                  className: "text-red-600 hover:text-red-900",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                    size: 16,
                    className: "inline"
                  })
                })]
              })]
            }, item.id);
          })
        })]
      })
    });
  };
  var renderForm = function renderForm() {
    switch (activeTab) {
      case 'offering_types':
      case 'expense_categories':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "text",
              value: formData.name || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  name: e.target.value
                }));
              },
              required: true,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Description"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
              value: formData.description || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  description: e.target.value
                }));
              },
              rows: 3,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "checkbox",
                checked: formData.is_active || false,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    is_active: e.target.checked
                  }));
                },
                className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "ml-2 text-sm text-gray-700",
                children: "Active"
              })]
            })
          })]
        });
      case 'vendors':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Vendor Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "text",
              value: formData.name || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  name: e.target.value
                }));
              },
              required: true,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Contact Name"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "text",
              value: formData.contact_name || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  contact_name: e.target.value
                }));
              },
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Email"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "email",
              value: formData.email || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  email: e.target.value
                }));
              },
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Phone"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "tel",
              value: formData.phone || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  phone: e.target.value
                }));
              },
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "checkbox",
                checked: formData.is_active || false,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    is_active: e.target.checked
                  }));
                },
                className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "ml-2 text-sm text-gray-700",
                children: "Active"
              })]
            })
          })]
        });
      case 'funds':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Fund Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "text",
              value: formData.name || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  name: e.target.value
                }));
              },
              required: true,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Type ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
              value: formData.type || 'unrestricted',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  type: e.target.value
                }));
              },
              required: true,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                value: "unrestricted",
                children: "Unrestricted"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                value: "restricted",
                children: "Restricted"
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Description"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
              value: formData.description || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  description: e.target.value
                }));
              },
              rows: 3,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "checkbox",
                checked: formData.is_active || false,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    is_active: e.target.checked
                  }));
                },
                className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "ml-2 text-sm text-gray-700",
                children: "Active"
              })]
            })
          })]
        });
    }
  };
  var getTabTitle = function getTabTitle() {
    switch (activeTab) {
      case 'offering_types':
        return 'Offering Types';
      case 'expense_categories':
        return 'Expense Categories';
      case 'vendors':
        return 'Vendors';
      case 'funds':
        return 'Funds';
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex justify-between items-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-2xl font-bold text-gray-900",
        children: "Finance Settings"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: handleAdd,
        className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
          size: 20
        }), "Add New"]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-4",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex gap-2 overflow-x-auto",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
          onClick: function onClick() {
            return setActiveTab('offering_types');
          },
          className: "px-4 py-2 rounded-lg whitespace-nowrap ".concat(activeTab === 'offering_types' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'),
          children: "Offering Types"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
          onClick: function onClick() {
            return setActiveTab('expense_categories');
          },
          className: "px-4 py-2 rounded-lg whitespace-nowrap ".concat(activeTab === 'expense_categories' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'),
          children: "Expense Categories"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
          onClick: function onClick() {
            return setActiveTab('vendors');
          },
          className: "px-4 py-2 rounded-lg whitespace-nowrap ".concat(activeTab === 'vendors' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'),
          children: "Vendors"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
          onClick: function onClick() {
            return setActiveTab('funds');
          },
          className: "px-4 py-2 rounded-lg whitespace-nowrap ".concat(activeTab === 'funds' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'),
          children: "Funds"
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      children: renderTable()
    }), showModal && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
          className: "text-xl font-bold mb-4",
          children: editingItem ? "Edit ".concat(getTabTitle()) : "Add ".concat(getTabTitle())
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
          onSubmit: handleSubmit,
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "space-y-4",
            children: renderForm()
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex justify-end gap-3 mt-6",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "button",
              onClick: function onClick() {
                return setShowModal(false);
              },
              className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50",
              children: "Cancel"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "submit",
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
              children: editingItem ? 'Update' : 'Create'
            })]
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);

/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/archive.js"
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/archive.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Archive)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
];
const Archive = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("archive", __iconNode);


//# sourceMappingURL=archive.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/chart-column.js"
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chart-column.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChartColumn)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chart-column", __iconNode);


//# sourceMappingURL=chart-column.js.map


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

/***/ "./node_modules/lucide-react/dist/esm/icons/circle-x.js"
/*!**************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/circle-x.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ CircleX)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("circle-x", __iconNode);


//# sourceMappingURL=circle-x.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/clock.js"
/*!***********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/clock.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Clock)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Clock = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("clock", __iconNode);


//# sourceMappingURL=clock.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/download.js"
/*!**************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/download.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Download)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("download", __iconNode);


//# sourceMappingURL=download.js.map


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

/***/ "./node_modules/lucide-react/dist/esm/icons/search.js"
/*!************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/search.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Search)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("search", __iconNode);


//# sourceMappingURL=search.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/square-pen.js"
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/square-pen.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ SquarePen)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("square-pen", __iconNode);


//# sourceMappingURL=square-pen.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/trash-2.js"
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/trash-2.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Trash2)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("trash-2", __iconNode);


//# sourceMappingURL=trash-2.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/trending-down.js"
/*!*******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/trending-down.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ TrendingDown)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("trending-down", __iconNode);


//# sourceMappingURL=trending-down.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/trending-up.js"
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/trending-up.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ TrendingUp)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("trending-up", __iconNode);


//# sourceMappingURL=trending-up.js.map


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0ZpbmFuY2VfdHN4LmpzP2lkPWU1MWMwY2IwYTAzODNlNWUiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBQ0EsdUtBQUFBLENBQUEsRUFBQUMsQ0FBQSxFQUFBQyxDQUFBLHdCQUFBQyxNQUFBLEdBQUFBLE1BQUEsT0FBQUMsQ0FBQSxHQUFBRixDQUFBLENBQUFHLFFBQUEsa0JBQUFDLENBQUEsR0FBQUosQ0FBQSxDQUFBSyxXQUFBLDhCQUFBQyxFQUFBTixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLFFBQUFDLENBQUEsR0FBQUwsQ0FBQSxJQUFBQSxDQUFBLENBQUFNLFNBQUEsWUFBQUMsU0FBQSxHQUFBUCxDQUFBLEdBQUFPLFNBQUEsRUFBQUMsQ0FBQSxHQUFBQyxNQUFBLENBQUFDLE1BQUEsQ0FBQUwsQ0FBQSxDQUFBQyxTQUFBLFVBQUFLLG1CQUFBLENBQUFILENBQUEsdUJBQUFWLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLFFBQUFFLENBQUEsRUFBQUMsQ0FBQSxFQUFBRyxDQUFBLEVBQUFJLENBQUEsTUFBQUMsQ0FBQSxHQUFBWCxDQUFBLFFBQUFZLENBQUEsT0FBQUMsQ0FBQSxLQUFBRixDQUFBLEtBQUFiLENBQUEsS0FBQWdCLENBQUEsRUFBQXBCLENBQUEsRUFBQXFCLENBQUEsRUFBQUMsQ0FBQSxFQUFBTixDQUFBLEVBQUFNLENBQUEsQ0FBQUMsSUFBQSxDQUFBdkIsQ0FBQSxNQUFBc0IsQ0FBQSxXQUFBQSxFQUFBckIsQ0FBQSxFQUFBQyxDQUFBLFdBQUFNLENBQUEsR0FBQVAsQ0FBQSxFQUFBUSxDQUFBLE1BQUFHLENBQUEsR0FBQVosQ0FBQSxFQUFBbUIsQ0FBQSxDQUFBZixDQUFBLEdBQUFGLENBQUEsRUFBQW1CLENBQUEsZ0JBQUFDLEVBQUFwQixDQUFBLEVBQUFFLENBQUEsU0FBQUssQ0FBQSxHQUFBUCxDQUFBLEVBQUFVLENBQUEsR0FB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Q0FBQztRQUFFLENBQUMsQ0FBQztNQUFFLENBQUMsQ0FBQztJQUFFLENBQUMsQ0FBQyxFQUFFcEQsdURBQUssQ0FBQ0kscURBQUksRUFBRTtNQUFFaUQsU0FBUyxFQUFFLGdDQUFnQztNQUFFRCxRQUFRLEVBQUUsQ0FBQ3RELHNEQUFJLENBQUMsSUFBSSxFQUFFO1FBQUV1RCxTQUFTLEVBQUUsMENBQTBDO1FBQUVELFFBQVEsRUFBRTtNQUFxQixDQUFDLENBQUMsRUFBRXBELHVEQUFLLENBQUMsSUFBSSxFQUFFO1FBQUVxRCxTQUFTLEVBQUUsaUNBQWlDO1FBQUVELFFBQVEsRUFBRSxDQUFDcEQsdURBQUssQ0FBQyxJQUFJLEVBQUU7VUFBRXFELFNBQVMsRUFBRSx3QkFBd0I7VUFBRUQsUUFBUSxFQUFFLENBQUN0RCxzREFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFdUQsU0FBUyxFQUFFLGVBQWU7WUFBRUQsUUFBUSxFQUFFO1VBQVMsQ0FBQyxDQUFDLEVBQUV0RCxzREFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFc0QsUUFBUSxFQUFFO1VBQXlFLENBQUMsQ0FBQztRQUFFLENBQUMsQ0FBQyxFQUFFcEQsdURBQUssQ0FBQyxJQUFJLEVBQUU7VUFBRXFELFNBQVMsRUFBRSx3QkFBd0I7VUFBRUQsUUFBUSxFQUFFLENBQUN0RCxzREFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFdUQsU0FBUyxFQUFFLGVBQWU7WUFBRUQsUUFBUSxFQUFFO1VBQVMsQ0FBQyxDQUFDLEVBQUV0RCxzREFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFc0QsUUFBUSxFQUFFO1VBQXdFLENBQUMsQ0FBQztRQUFFLENBQUMsQ0FBQyxFQUFFcEQsdURBQUssQ0FBQyxJQUFJLEVBQUU7VUFBRXFELFNBQVMsRUFBRSx3QkFBd0I7VUFBRUQsUUFBUSxFQUFFLENBQUN0RCxzREFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFdUQsU0FBUyxFQUFFLGVBQWU7WUFBRUQsUUFBUSxFQUFFO1VBQVMsQ0FBQyxDQUFDLEVBQUV0RCxzREFBSSxDQUFDLE1BQU0sRUFBRTtZ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ZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL3BhZ2VzL0ZpbmFuY2UudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9wYWdlcy9GaW5hbmNlL0J1ZGdldHMudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9wYWdlcy9GaW5hbmNlL0V4cGVuc2VzLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvcGFnZXMvRmluYW5jZS9PZmZlcmluZ3MudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9wYWdlcy9GaW5hbmNlL1JlcG9ydHMudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9wYWdlcy9GaW5hbmNlL1NldHRpbmdzLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2FyY2hpdmUuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9jaGFydC1jb2x1bW4uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9jaGFydC1waWUuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9jaXJjbGUteC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2Nsb2NrLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvZG93bmxvYWQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9wbHVzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvc2VhcmNoLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvc3F1YXJlLXBlbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3RyYXNoLTIuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy90cmVuZGluZy1kb3duLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvdHJlbmRpbmctdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXBpIGZyb20gJy4uL2xpYi9hcGknO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvY2FyZCc7XG5pbXBvcnQgT2ZmZXJpbmdzIGZyb20gJy4vRmluYW5jZS9PZmZlcmluZ3MnO1xuaW1wb3J0IEV4cGVuc2VzIGZyb20gJy4vRmluYW5jZS9FeHBlbnNlcyc7XG5pbXBvcnQgQnVkZ2V0cyBmcm9tICcuL0ZpbmFuY2UvQnVkZ2V0cyc7XG5pbXBvcnQgUmVwb3J0cyBmcm9tICcuL0ZpbmFuY2UvUmVwb3J0cyc7XG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9GaW5hbmNlL1NldHRpbmdzJztcbmNvbnN0IEZpbmFuY2UgPSAoKSA9PiB7XG4gICAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCdvdmVydmlldycpO1xuICAgIGNvbnN0IFtzdW1tYXJ5LCBzZXRTdW1tYXJ5XSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtkYXRlUmFuZ2UsIHNldERhdGVSYW5nZV0gPSB1c2VTdGF0ZSh7XG4gICAgICAgIHN0YXJ0X2RhdGU6IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSwgbmV3IERhdGUoKS5nZXRNb250aCgpLCAxKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0sXG4gICAgICAgIGVuZF9kYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXVxuICAgIH0pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZldGNoU3VtbWFyeSgpO1xuICAgIH0sIFtkYXRlUmFuZ2VdKTtcbiAgICBjb25zdCBmZXRjaFN1bW1hcnkgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvZmluYW5jZS9zdW1tYXJ5Jywge1xuICAgICAgICAgICAgICAgIHBhcmFtczogZGF0ZVJhbmdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldFN1bW1hcnkocmVzcG9uc2UuZGF0YS5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGZpbmFuY2lhbCBzdW1tYXJ5OicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBmb3JtYXRDdXJyZW5jeSA9IChhbW91bnQpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tUEgnLCB7XG4gICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgICAgIGN1cnJlbmN5OiAnUEhQJ1xuICAgICAgICB9KS5mb3JtYXQoYW1vdW50KTtcbiAgICB9O1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYi02XCIsIGNoaWxkcmVuOiBbX2pzeChcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBcIkZpbmFuY2UgTWFuYWdlbWVudFwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJkYXRlXCIsIHZhbHVlOiBkYXRlUmFuZ2Uuc3RhcnRfZGF0ZSwgb25DaGFuZ2U6IChlKSA9PiBzZXREYXRlUmFuZ2UoeyAuLi5kYXRlUmFuZ2UsIHN0YXJ0X2RhdGU6IGUudGFyZ2V0LnZhbHVlIH0pLCBjbGFzc05hbWU6IFwicHgtMyBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1tZFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJzZWxmLWNlbnRlclwiLCBjaGlsZHJlbjogXCJ0b1wiIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImRhdGVcIiwgdmFsdWU6IGRhdGVSYW5nZS5lbmRfZGF0ZSwgb25DaGFuZ2U6IChlKSA9PiBzZXREYXRlUmFuZ2UoeyAuLi5kYXRlUmFuZ2UsIGVuZF9kYXRlOiBlLnRhcmdldC52YWx1ZSB9KSwgY2xhc3NOYW1lOiBcInB4LTMgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbWRcIiB9KV0gfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJvcmRlci1iIGJvcmRlci1ncmF5LTIwMCBtYi02XCIsIGNoaWxkcmVuOiBfanN4KFwibmF2XCIsIHsgY2xhc3NOYW1lOiBcIi1tYi1weCBmbGV4IHNwYWNlLXgtOFwiLCBjaGlsZHJlbjogWydvdmVydmlldycsICdvZmZlcmluZ3MnLCAnZXhwZW5zZXMnLCAnYnVkZ2V0cycsICdyZXBvcnRzJywgJ3NldHRpbmdzJ10ubWFwKCh0YWIpID0+IChfanN4KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0QWN0aXZlVGFiKHRhYiksIGNsYXNzTmFtZTogYCR7YWN0aXZlVGFiID09PSB0YWJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItYmx1ZS01MDAgdGV4dC1ibHVlLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1ncmF5LTUwMCBob3Zlcjp0ZXh0LWdyYXktNzAwIGhvdmVyOmJvcmRlci1ncmF5LTMwMCd9IHdoaXRlc3BhY2Utbm93cmFwIHB5LTQgcHgtMSBib3JkZXItYi0yIGZvbnQtbWVkaXVtIHRleHQtc20gY2FwaXRhbGl6ZWAsIGNoaWxkcmVuOiB0YWIgfSwgdGFiKSkpIH0pIH0pLCBhY3RpdmVUYWIgPT09ICdvdmVydmlldycgJiYgKF9qc3goXCJkaXZcIiwgeyBjaGlsZHJlbjogbG9hZGluZyA/IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xMlwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW5saW5lLWJsb2NrIGFuaW1hdGUtc3BpbiByb3VuZGVkLWZ1bGwgaC04IHctOCBib3JkZXItYi0yIGJvcmRlci1ibHVlLTYwMFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJtdC0yIHRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFwiTG9hZGluZyBmaW5hbmNpYWwgZGF0YS4uLlwiIH0pXSB9KSkgOiBzdW1tYXJ5ID8gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTZcIiwgY2hpbGRyZW46IFtfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIG1iLTJcIiwgY2hpbGRyZW46IFwiVG90YWwgR2l2aW5nXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWdyZWVuLTYwMFwiLCBjaGlsZHJlbjogZm9ybWF0Q3VycmVuY3koc3VtbWFyeS50b3RhbF9naXZpbmcpIH0pLCBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNTAwIG10LTJcIiwgY2hpbGRyZW46IFtzdW1tYXJ5LnRvdGFsX3RyYW5zYWN0aW9ucywgXCIgdHJhbnNhY3Rpb25zXCJdIH0pXSB9KSwgX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCBtYi0yXCIsIGNoaWxkcmVuOiBcIkF2ZXJhZ2UgVHJhbnNhY3Rpb25cIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtYmx1ZS02MDBcIiwgY2hpbGRyZW46IGZvcm1hdEN1cnJlbmN5KHN1bW1hcnkuYXZlcmFnZV90cmFuc2FjdGlvbikgfSldIH0pLCBfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIG1iLTJcIiwgY2hpbGRyZW46IFwiVW5pcXVlIEdpdmVyc1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1wdXJwbGUtNjAwXCIsIGNoaWxkcmVuOiBzdW1tYXJ5LnVuaXF1ZV9naXZlcnMgfSldIH0pLCBfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIG1iLTJcIiwgY2hpbGRyZW46IFwiVG90YWwgVHJhbnNhY3Rpb25zXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWluZGlnby02MDBcIiwgY2hpbGRyZW46IHN1bW1hcnkudG90YWxfdHJhbnNhY3Rpb25zIH0pXSB9KSwgX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02IG1kOmNvbC1zcGFuLTIgbGc6Y29sLXNwYW4tNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgbWItNFwiLCBjaGlsZHJlbjogXCJQYXltZW50IE1ldGhvZCBCcmVha2Rvd25cIiB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC00XCIsIGNoaWxkcmVuOiBPYmplY3QuZW50cmllcyhzdW1tYXJ5LmJ5X3BheW1lbnRfbWV0aG9kIHx8IHt9KS5tYXAoKFttZXRob2QsIGRhdGFdKSA9PiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYm9yZGVyIGJvcmRlci1ncmF5LTIwMCByb3VuZGVkLWxnIHAtNFwiLCBjaGlsZHJlbjogW19qc3goXCJoNFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgY2FwaXRhbGl6ZSBtYi0yXCIsIGNoaWxkcmVuOiBtZXRob2QgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBmb3JtYXRDdXJyZW5jeShkYXRhLnRvdGFsKSB9KSwgX2pzeHMoXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTUwMCBtdC0xXCIsIGNoaWxkcmVuOiBbZGF0YS5jb3VudCwgXCIgdHJhbnNhY3Rpb25zXCJdIH0pXSB9LCBtZXRob2QpKSkgfSldIH0pXSB9KSkgOiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xMiB0ZXh0LWdyYXktNTAwXCIsIGNoaWxkcmVuOiBcIk5vIGZpbmFuY2lhbCBkYXRhIGF2YWlsYWJsZSBmb3IgdGhlIHNlbGVjdGVkIHBlcmlvZC5cIiB9KSkgfSkpLCBhY3RpdmVUYWIgPT09ICdvZmZlcmluZ3MnICYmIF9qc3goT2ZmZXJpbmdzLCB7fSksIGFjdGl2ZVRhYiA9PT0gJ2V4cGVuc2VzJyAmJiBfanN4KEV4cGVuc2VzLCB7fSksIGFjdGl2ZVRhYiA9PT0gJ2J1ZGdldHMnICYmIF9qc3goQnVkZ2V0cywge30pLCBhY3RpdmVUYWIgPT09ICdyZXBvcnRzJyAmJiBfanN4KFJlcG9ydHMsIHt9KSwgYWN0aXZlVGFiID09PSAnc2V0dGluZ3MnICYmIF9qc3goU2V0dGluZ3MsIHt9KV0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZpbmFuY2U7XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cywgRnJhZ21lbnQgYXMgX0ZyYWdtZW50IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9saWIvYXBpJztcbmltcG9ydCB7IENhcmQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3VpL2NhcmQnO1xuaW1wb3J0IHsgUGx1cywgVHJlbmRpbmdVcCwgVHJlbmRpbmdEb3duLCBBbGVydENpcmNsZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5jb25zdCBCdWRnZXRzID0gKCkgPT4ge1xuICAgIGNvbnN0IFtidWRnZXRzLCBzZXRCdWRnZXRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbc2VsZWN0ZWRCdWRnZXQsIHNldFNlbGVjdGVkQnVkZ2V0XSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtidWRnZXRJdGVtcywgc2V0QnVkZ2V0SXRlbXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtjYXRlZ29yaWVzLCBzZXRDYXRlZ29yaWVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbc2hvd0FkZE1vZGFsLCBzZXRTaG93QWRkTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtzdWJtaXR0aW5nLCBzZXRTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIHN0YXJ0X2RhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgICAgICBlbmRfZGF0ZTogbmV3IERhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCAxMSwgMzEpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSxcbiAgICAgICAgaXRlbXM6IFtdXG4gICAgfSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hCdWRnZXRzKCk7XG4gICAgICAgIGZldGNoQ2F0ZWdvcmllcygpO1xuICAgIH0sIFtdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoc2VsZWN0ZWRCdWRnZXQpIHtcbiAgICAgICAgICAgIGZldGNoQnVkZ2V0SXRlbXMoc2VsZWN0ZWRCdWRnZXQuaWQpO1xuICAgICAgICB9XG4gICAgfSwgW3NlbGVjdGVkQnVkZ2V0XSk7XG4gICAgY29uc3QgZmV0Y2hCdWRnZXRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL2J1ZGdldHMnKTtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZGdldExpc3QgPSByZXNwb25zZS5kYXRhLmRhdGEgfHwgW107XG4gICAgICAgICAgICBzZXRCdWRnZXRzKGJ1ZGdldExpc3QpO1xuICAgICAgICAgICAgaWYgKGJ1ZGdldExpc3QubGVuZ3RoID4gMCAmJiAhc2VsZWN0ZWRCdWRnZXQpIHtcbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEJ1ZGdldChidWRnZXRMaXN0WzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGJ1ZGdldHM6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGZldGNoQnVkZ2V0SXRlbXMgPSBhc3luYyAoYnVkZ2V0SWQpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL2J1ZGdldHMvJHtidWRnZXRJZH0vaXRlbXNgKTtcbiAgICAgICAgICAgIHNldEJ1ZGdldEl0ZW1zKHJlc3BvbnNlLmRhdGEuZGF0YSB8fCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBidWRnZXQgaXRlbXM6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBmZXRjaENhdGVnb3JpZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9leHBlbnNlLWNhdGVnb3JpZXMnKTtcbiAgICAgICAgICAgIHNldENhdGVnb3JpZXMocmVzcG9uc2UuZGF0YS5kYXRhIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNhdGVnb3JpZXM6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRTdWJtaXR0aW5nKHRydWUpO1xuICAgICAgICAgICAgYXdhaXQgYXBpLnBvc3QoJy9idWRnZXRzJywge1xuICAgICAgICAgICAgICAgIG5hbWU6IGZvcm1EYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgc3RhcnRfZGF0ZTogZm9ybURhdGEuc3RhcnRfZGF0ZSxcbiAgICAgICAgICAgICAgICBlbmRfZGF0ZTogZm9ybURhdGEuZW5kX2RhdGUsXG4gICAgICAgICAgICAgICAgaXRlbXM6IGZvcm1EYXRhLml0ZW1zLm1hcChpdGVtID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVuc2VfY2F0ZWdvcnlfaWQ6IHBhcnNlSW50KGl0ZW0uZXhwZW5zZV9jYXRlZ29yeV9pZCksXG4gICAgICAgICAgICAgICAgICAgIGJ1ZGdldGVkX2Ftb3VudDogcGFyc2VGbG9hdChpdGVtLmJ1ZGdldGVkX2Ftb3VudClcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0U2hvd0FkZE1vZGFsKGZhbHNlKTtcbiAgICAgICAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBzdGFydF9kYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSxcbiAgICAgICAgICAgICAgICBlbmRfZGF0ZTogbmV3IERhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCAxMSwgMzEpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSxcbiAgICAgICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmV0Y2hCdWRnZXRzKCk7XG4gICAgICAgICAgICBhbGVydCgnQnVkZ2V0IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgYnVkZ2V0OicsIGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gY3JlYXRlIGJ1ZGdldC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldFN1Ym1pdHRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBhZGRCdWRnZXRJdGVtID0gKCkgPT4ge1xuICAgICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgICAgICAuLi5mb3JtRGF0YSxcbiAgICAgICAgICAgIGl0ZW1zOiBbLi4uZm9ybURhdGEuaXRlbXMsIHsgZXhwZW5zZV9jYXRlZ29yeV9pZDogJycsIGJ1ZGdldGVkX2Ftb3VudDogJycgfV1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCByZW1vdmVCdWRnZXRJdGVtID0gKGluZGV4KSA9PiB7XG4gICAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgICAgIC4uLmZvcm1EYXRhLFxuICAgICAgICAgICAgaXRlbXM6IGZvcm1EYXRhLml0ZW1zLmZpbHRlcigoXywgaSkgPT4gaSAhPT0gaW5kZXgpXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgdXBkYXRlQnVkZ2V0SXRlbSA9IChpbmRleCwgZmllbGQsIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW1zID0gWy4uLmZvcm1EYXRhLml0ZW1zXTtcbiAgICAgICAgbmV3SXRlbXNbaW5kZXhdID0geyAuLi5uZXdJdGVtc1tpbmRleF0sIFtmaWVsZF06IHZhbHVlIH07XG4gICAgICAgIHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIGl0ZW1zOiBuZXdJdGVtcyB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKGFtb3VudCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1QSCcsIHtcbiAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgICAgICAgICAgY3VycmVuY3k6ICdQSFAnXG4gICAgICAgIH0pLmZvcm1hdChhbW91bnQpO1xuICAgIH07XG4gICAgY29uc3QgZ2V0VmFyaWFuY2VDb2xvciA9ICh2YXJpYW5jZSkgPT4ge1xuICAgICAgICBpZiAodmFyaWFuY2UgPiAwKVxuICAgICAgICAgICAgcmV0dXJuICd0ZXh0LWdyZWVuLTYwMCc7XG4gICAgICAgIGlmICh2YXJpYW5jZSA8IDApXG4gICAgICAgICAgICByZXR1cm4gJ3RleHQtcmVkLTYwMCc7XG4gICAgICAgIHJldHVybiAndGV4dC1ncmF5LTYwMCc7XG4gICAgfTtcbiAgICBjb25zdCBnZXRWYXJpYW5jZUljb24gPSAodmFyaWFuY2UpID0+IHtcbiAgICAgICAgaWYgKHZhcmlhbmNlID4gMClcbiAgICAgICAgICAgIHJldHVybiBfanN4KFRyZW5kaW5nVXAsIHsgc2l6ZTogMTYsIGNsYXNzTmFtZTogXCJpbmxpbmVcIiB9KTtcbiAgICAgICAgaWYgKHZhcmlhbmNlIDwgMClcbiAgICAgICAgICAgIHJldHVybiBfanN4KFRyZW5kaW5nRG93biwgeyBzaXplOiAxNiwgY2xhc3NOYW1lOiBcImlubGluZVwiIH0pO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIGNvbnN0IHRvdGFsQnVkZ2V0ZWQgPSBidWRnZXRJdGVtcy5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgaXRlbS5idWRnZXRlZF9hbW91bnQsIDApO1xuICAgIGNvbnN0IHRvdGFsQWN0dWFsID0gYnVkZ2V0SXRlbXMucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0uYWN0dWFsX2Ftb3VudCwgMCk7XG4gICAgY29uc3QgdG90YWxWYXJpYW5jZSA9IHRvdGFsQnVkZ2V0ZWQgLSB0b3RhbEFjdHVhbDtcbiAgICBjb25zdCB1dGlsaXphdGlvblBlcmNlbnRhZ2UgPSB0b3RhbEJ1ZGdldGVkID4gMCA/ICh0b3RhbEFjdHVhbCAvIHRvdGFsQnVkZ2V0ZWQpICogMTAwIDogMDtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogXCJCdWRnZXRzXCIgfSksIF9qc3hzKFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0U2hvd0FkZE1vZGFsKHRydWUpLCBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIGJnLWJsdWUtNjAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBob3ZlcjpiZy1ibHVlLTcwMFwiLCBjaGlsZHJlbjogW19qc3goUGx1cywgeyBzaXplOiAyMCB9KSwgXCJDcmVhdGUgQnVkZ2V0XCJdIH0pXSB9KSwgX2pzeChDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTRcIiwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMFwiLCBjaGlsZHJlbjogXCJTZWxlY3QgQnVkZ2V0OlwiIH0pLCBfanN4KFwic2VsZWN0XCIsIHsgdmFsdWU6IHNlbGVjdGVkQnVkZ2V0Py5pZCB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ1ZGdldCA9IGJ1ZGdldHMuZmluZChiID0+IGIuaWQgPT09IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkQnVkZ2V0KGJ1ZGdldCB8fCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBjbGFzc05hbWU6IFwiZmxleC0xIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIsIGNoaWxkcmVuOiBidWRnZXRzLm1hcChidWRnZXQgPT4gKF9qc3hzKFwib3B0aW9uXCIsIHsgdmFsdWU6IGJ1ZGdldC5pZCwgY2hpbGRyZW46IFtidWRnZXQubmFtZSwgXCIgKFwiLCBidWRnZXQucGVyaW9kX3R5cGUsIFwiKSAtIFwiLCBidWRnZXQuaXNfYWN0aXZlID8gJ0FjdGl2ZScgOiAnSW5hY3RpdmUnXSB9LCBidWRnZXQuaWQpKSkgfSldIH0pIH0pLCBsb2FkaW5nID8gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtMTIgdGV4dC1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImlubGluZS1ibG9jayBhbmltYXRlLXNwaW4gcm91bmRlZC1mdWxsIGgtOCB3LTggYm9yZGVyLWItMiBib3JkZXItYmx1ZS02MDBcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMiB0ZXh0LWdyYXktNjAwXCIsIGNoaWxkcmVuOiBcIkxvYWRpbmcgYnVkZ2V0IGRhdGEuLi5cIiB9KV0gfSkpIDogc2VsZWN0ZWRCdWRnZXQgPyAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtNCBnYXAtNlwiLCBjaGlsZHJlbjogW19qc3hzKENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgbWItMlwiLCBjaGlsZHJlbjogXCJUb3RhbCBCdWRnZXRlZFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1ibHVlLTYwMFwiLCBjaGlsZHJlbjogZm9ybWF0Q3VycmVuY3kodG90YWxCdWRnZXRlZCkgfSldIH0pLCBfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIG1iLTJcIiwgY2hpbGRyZW46IFwiVG90YWwgQWN0dWFsXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LXB1cnBsZS02MDBcIiwgY2hpbGRyZW46IGZvcm1hdEN1cnJlbmN5KHRvdGFsQWN0dWFsKSB9KV0gfSksIF9qc3hzKENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgbWItMlwiLCBjaGlsZHJlbjogXCJWYXJpYW5jZVwiIH0pLCBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IGB0ZXh0LTN4bCBmb250LWJvbGQgJHtnZXRWYXJpYW5jZUNvbG9yKHRvdGFsVmFyaWFuY2UpfWAsIGNoaWxkcmVuOiBbZm9ybWF0Q3VycmVuY3koTWF0aC5hYnModG90YWxWYXJpYW5jZSkpLCBnZXRWYXJpYW5jZUljb24odG90YWxWYXJpYW5jZSldIH0pXSB9KSwgX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCBtYi0yXCIsIGNoaWxkcmVuOiBcIlV0aWxpemF0aW9uXCIgfSksIF9qc3hzKFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1pbmRpZ28tNjAwXCIsIGNoaWxkcmVuOiBbdXRpbGl6YXRpb25QZXJjZW50YWdlLnRvRml4ZWQoMSksIFwiJVwiXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtdC0yIHctZnVsbCBiZy1ncmF5LTIwMCByb3VuZGVkLWZ1bGwgaC0yXCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBgaC0yIHJvdW5kZWQtZnVsbCAke3V0aWxpemF0aW9uUGVyY2VudGFnZSA+IDEwMCA/ICdiZy1yZWQtNjAwJyA6ICdiZy1ncmVlbi02MDAnfWAsIHN0eWxlOiB7IHdpZHRoOiBgJHtNYXRoLm1pbih1dGlsaXphdGlvblBlcmNlbnRhZ2UsIDEwMCl9JWAgfSB9KSB9KV0gfSldIH0pLCBfanN4KENhcmQsIHsgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgbWItNFwiLCBjaGlsZHJlbjogXCJCdWRnZXQgSXRlbXNcIiB9KSwgYnVkZ2V0SXRlbXMubGVuZ3RoID09PSAwID8gKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtY2VudGVyIHRleHQtZ3JheS01MDAgcHktOFwiLCBjaGlsZHJlbjogXCJObyBidWRnZXQgaXRlbXMgZm91bmQuXCIgfSkpIDogKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwib3ZlcmZsb3cteC1hdXRvXCIsIGNoaWxkcmVuOiBfanN4cyhcInRhYmxlXCIsIHsgY2xhc3NOYW1lOiBcInctZnVsbFwiLCBjaGlsZHJlbjogW19qc3goXCJ0aGVhZFwiLCB7IGNsYXNzTmFtZTogXCJiZy1ncmF5LTUwIGJvcmRlci1iIGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogX2pzeHMoXCJ0clwiLCB7IGNoaWxkcmVuOiBbX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJDYXRlZ29yeVwiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtcmlnaHQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJCdWRnZXRlZFwiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtcmlnaHQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJBY3R1YWxcIiB9KSwgX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LXJpZ2h0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiVmFyaWFuY2VcIiB9KSwgX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LXJpZ2h0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiJVwiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtY2VudGVyIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiU3RhdHVzXCIgfSldIH0pIH0pLCBfanN4KFwidGJvZHlcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgZGl2aWRlLXkgZGl2aWRlLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBidWRnZXRJdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc092ZXJCdWRnZXQgPSBpdGVtLmFjdHVhbF9hbW91bnQgPiBpdGVtLmJ1ZGdldGVkX2Ftb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1dGlsaXphdGlvblBjdCA9IGl0ZW0uYnVkZ2V0ZWRfYW1vdW50ID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChpdGVtLmFjdHVhbF9hbW91bnQgLyBpdGVtLmJ1ZGdldGVkX2Ftb3VudCkgKiAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeHMoXCJ0clwiLCB7IGNsYXNzTmFtZTogXCJob3ZlcjpiZy1ncmF5LTUwXCIsIGNoaWxkcmVuOiBbX2pzeChcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNCB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IGl0ZW0uY2F0ZWdvcnlfbmFtZSB9KSwgX2pzeChcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNCB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXNtIHRleHQtcmlnaHQgdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogZm9ybWF0Q3VycmVuY3koaXRlbS5idWRnZXRlZF9hbW91bnQpIH0pLCBfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1yaWdodCB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBmb3JtYXRDdXJyZW5jeShpdGVtLmFjdHVhbF9hbW91bnQpIH0pLCBfanN4cyhcInRkXCIsIHsgY2xhc3NOYW1lOiBgcHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1yaWdodCBmb250LXNlbWlib2xkICR7Z2V0VmFyaWFuY2VDb2xvcihpdGVtLnZhcmlhbmNlKX1gLCBjaGlsZHJlbjogW2Zvcm1hdEN1cnJlbmN5KE1hdGguYWJzKGl0ZW0udmFyaWFuY2UpKSwgZ2V0VmFyaWFuY2VJY29uKGl0ZW0udmFyaWFuY2UpXSB9KSwgX2pzeHMoXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSB0ZXh0LXJpZ2h0IHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFt1dGlsaXphdGlvblBjdC50b0ZpeGVkKDEpLCBcIiVcIl0gfSksIF9qc3hzKFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtY2VudGVyXCIsIGNoaWxkcmVuOiBbaXNPdmVyQnVkZ2V0ICYmIChfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtcmVkLTYwMFwiLCBjaGlsZHJlbjogW19qc3goQWxlcnRDaXJjbGUsIHsgc2l6ZTogMTYgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteHNcIiwgY2hpbGRyZW46IFwiT3ZlciBCdWRnZXRcIiB9KV0gfSkpLCAhaXNPdmVyQnVkZ2V0ICYmIHV0aWxpemF0aW9uUGN0ID4gOTAgJiYgKF9qc3hzKFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC15ZWxsb3ctNjAwXCIsIGNoaWxkcmVuOiBbX2pzeChBbGVydENpcmNsZSwgeyBzaXplOiAxNiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC14c1wiLCBjaGlsZHJlbjogXCJOZWFyIExpbWl0XCIgfSldIH0pKSwgIWlzT3ZlckJ1ZGdldCAmJiB1dGlsaXphdGlvblBjdCA8PSA5MCAmJiAoX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmVlbi02MDAgdGV4dC14c1wiLCBjaGlsZHJlbjogXCJPbiBUcmFja1wiIH0pKV0gfSldIH0sIGl0ZW0uaWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIH0pXSB9KSB9KSldIH0pIH0pXSB9KSkgOiAoX2pzeChDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTEyIHRleHQtY2VudGVyIHRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IF9qc3goXCJwXCIsIHsgY2hpbGRyZW46IFwiTm8gYnVkZ2V0cyBhdmFpbGFibGUuIENyZWF0ZSB5b3VyIGZpcnN0IGJ1ZGdldCB0byBnZXQgc3RhcnRlZC5cIiB9KSB9KSksIHNob3dBZGRNb2RhbCAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrIGJnLW9wYWNpdHktNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgei01MFwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgcm91bmRlZC1sZyBwLTYgdy1mdWxsIG1heC13LTR4bCBtYXgtaC1bOTB2aF0gb3ZlcmZsb3cteS1hdXRvXCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgZm9udC1ib2xkIG1iLTRcIiwgY2hpbGRyZW46IFwiQ3JlYXRlIEJ1ZGdldFwiIH0pLCBfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJCdWRnZXQgTmFtZSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogZm9ybURhdGEubmFtZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KSwgcmVxdWlyZWQ6IHRydWUsIHBsYWNlaG9sZGVyOiBcImUuZy4sIEFubnVhbCBCdWRnZXQgMjAyNVwiLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIlN0YXJ0IERhdGUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImRhdGVcIiwgdmFsdWU6IGZvcm1EYXRhLnN0YXJ0X2RhdGUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgc3RhcnRfZGF0ZTogZS50YXJnZXQudmFsdWUgfSksIHJlcXVpcmVkOiB0cnVlLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiRW5kIERhdGUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImRhdGVcIiwgdmFsdWU6IGZvcm1EYXRhLmVuZF9kYXRlLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIGVuZF9kYXRlOiBlLnRhcmdldC52YWx1ZSB9KSwgcmVxdWlyZWQ6IHRydWUsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiB9KV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIG1iLTJcIiwgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMFwiLCBjaGlsZHJlbjogW1wiQnVkZ2V0IEl0ZW1zIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChcImJ1dHRvblwiLCB7IHR5cGU6IFwiYnV0dG9uXCIsIG9uQ2xpY2s6IGFkZEJ1ZGdldEl0ZW0sIGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtYmx1ZS02MDAgaG92ZXI6dGV4dC1ibHVlLTcwMFwiLCBjaGlsZHJlbjogXCIrIEFkZCBJdGVtXCIgfSldIH0pLCBmb3JtRGF0YS5pdGVtcy5sZW5ndGggPT09IDAgPyAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNTAwIHRleHQtY2VudGVyIHB5LTQgYm9yZGVyIGJvcmRlci1kYXNoZWQgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGdcIiwgY2hpbGRyZW46IFwiTm8gYnVkZ2V0IGl0ZW1zIGFkZGVkLiBDbGljayBcXFwiQWRkIEl0ZW1cXFwiIHRvIHN0YXJ0LlwiIH0pKSA6IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktMlwiLCBjaGlsZHJlbjogZm9ybURhdGEuaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZ2FwLTIgaXRlbXMtc3RhcnRcIiwgY2hpbGRyZW46IFtfanN4cyhcInNlbGVjdFwiLCB7IHZhbHVlOiBpdGVtLmV4cGVuc2VfY2F0ZWdvcnlfaWQsIG9uQ2hhbmdlOiAoZSkgPT4gdXBkYXRlQnVkZ2V0SXRlbShpbmRleCwgJ2V4cGVuc2VfY2F0ZWdvcnlfaWQnLCBlLnRhcmdldC52YWx1ZSksIHJlcXVpcmVkOiB0cnVlLCBjbGFzc05hbWU6IFwiZmxleC0xIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIsIGNoaWxkcmVuOiBbX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiLCBjaGlsZHJlbjogXCJTZWxlY3QgQ2F0ZWdvcnlcIiB9KSwgY2F0ZWdvcmllcy5tYXAoY2F0ID0+IChfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IGNhdC5pZCwgY2hpbGRyZW46IGNhdC5uYW1lIH0sIGNhdC5pZCkpKV0gfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwibnVtYmVyXCIsIHN0ZXA6IFwiMC4wMVwiLCBtaW46IFwiMC4wMVwiLCB2YWx1ZTogaXRlbS5idWRnZXRlZF9hbW91bnQsIG9uQ2hhbmdlOiAoZSkgPT4gdXBkYXRlQnVkZ2V0SXRlbShpbmRleCwgJ2J1ZGdldGVkX2Ftb3VudCcsIGUudGFyZ2V0LnZhbHVlKSwgcmVxdWlyZWQ6IHRydWUsIHBsYWNlaG9sZGVyOiBcIkFtb3VudFwiLCBjbGFzc05hbWU6IFwidy00MCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogKCkgPT4gcmVtb3ZlQnVkZ2V0SXRlbShpbmRleCksIGNsYXNzTmFtZTogXCJweC0zIHB5LTIgdGV4dC1yZWQtNjAwIGhvdmVyOmJnLXJlZC01MCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBcIlJlbW92ZVwiIH0pXSB9LCBpbmRleCkpKSB9KSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLWJsdWUtNTAgcC00IHJvdW5kZWQtbGdcIiwgY2hpbGRyZW46IF9qc3hzKFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtYmx1ZS05MDBcIiwgY2hpbGRyZW46IFtcIlRvdGFsIEJ1ZGdldDogXCIsIGZvcm1hdEN1cnJlbmN5KGZvcm1EYXRhLml0ZW1zLnJlZHVjZSgoc3VtLCBpdGVtKSA9PiBzdW0gKyAocGFyc2VGbG9hdChpdGVtLmJ1ZGdldGVkX2Ftb3VudCkgfHwgMCksIDApKV0gfSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktZW5kIGdhcC0zIG10LTZcIiwgY2hpbGRyZW46IFtfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogKCkgPT4gc2V0U2hvd0FkZE1vZGFsKGZhbHNlKSwgY2xhc3NOYW1lOiBcInB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgaG92ZXI6YmctZ3JheS01MFwiLCBkaXNhYmxlZDogc3VibWl0dGluZywgY2hpbGRyZW46IFwiQ2FuY2VsXCIgfSksIF9qc3goXCJidXR0b25cIiwgeyB0eXBlOiBcInN1Ym1pdFwiLCBkaXNhYmxlZDogc3VibWl0dGluZyB8fCBmb3JtRGF0YS5pdGVtcy5sZW5ndGggPT09IDAsIGNsYXNzTmFtZTogXCJweC00IHB5LTIgYmctYmx1ZS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGhvdmVyOmJnLWJsdWUtNzAwIGRpc2FibGVkOm9wYWNpdHktNTBcIiwgY2hpbGRyZW46IHN1Ym1pdHRpbmcgPyAnQ3JlYXRpbmcuLi4nIDogJ0NyZWF0ZSBCdWRnZXQnIH0pXSB9KV0gfSldIH0pIH0pKV0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEJ1ZGdldHM7XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cywgRnJhZ21lbnQgYXMgX0ZyYWdtZW50IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9saWIvYXBpJztcbmltcG9ydCB7IENhcmQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3VpL2NhcmQnO1xuaW1wb3J0IHsgQXJjaGl2ZSwgUGx1cywgU2VhcmNoLCBDaGVja0NpcmNsZSwgWENpcmNsZSwgQ2xvY2sgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuY29uc3QgRXhwZW5zZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgW2V4cGVuc2VzLCBzZXRFeHBlbnNlc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2NhdGVnb3JpZXMsIHNldENhdGVnb3JpZXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFt2ZW5kb3JzLCBzZXRWZW5kb3JzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbZnVuZHMsIHNldEZ1bmRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbc2hvd0FkZE1vZGFsLCBzZXRTaG93QWRkTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtzdWJtaXR0aW5nLCBzZXRTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbZmlsdGVycywgc2V0RmlsdGVyc10gPSB1c2VTdGF0ZSh7XG4gICAgICAgIHNlYXJjaDogJycsXG4gICAgICAgIGNhdGVnb3J5X2lkOiAnJyxcbiAgICAgICAgc3RhdHVzOiAnJyxcbiAgICAgICAgc3RhcnRfZGF0ZTogJycsXG4gICAgICAgIGVuZF9kYXRlOiAnJ1xuICAgIH0pO1xuICAgIGNvbnN0IFtmb3JtRGF0YSwgc2V0Rm9ybURhdGFdID0gdXNlU3RhdGUoe1xuICAgICAgICBleHBlbnNlX2NhdGVnb3J5X2lkOiAnJyxcbiAgICAgICAgdmVuZG9yX2lkOiAnJyxcbiAgICAgICAgZnVuZF9pZDogJycsXG4gICAgICAgIGFtb3VudDogJycsXG4gICAgICAgIGV4cGVuc2VfZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgcGF5bWVudF9tZXRob2Q6ICdjYXNoJyxcbiAgICAgICAgcmVmZXJlbmNlX251bWJlcjogJydcbiAgICB9KTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmZXRjaEV4cGVuc2VzKCk7XG4gICAgICAgIGZldGNoQ2F0ZWdvcmllcygpO1xuICAgICAgICBmZXRjaFZlbmRvcnMoKTtcbiAgICAgICAgZmV0Y2hGdW5kcygpO1xuICAgIH0sIFtmaWx0ZXJzXSk7XG4gICAgY29uc3QgZmV0Y2hFeHBlbnNlcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9leHBlbnNlcycsIHsgcGFyYW1zOiBmaWx0ZXJzIH0pO1xuICAgICAgICAgICAgc2V0RXhwZW5zZXMocmVzcG9uc2UuZGF0YS5kYXRhIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGV4cGVuc2VzOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBmZXRjaENhdGVnb3JpZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9leHBlbnNlLWNhdGVnb3JpZXMnKTtcbiAgICAgICAgICAgIHNldENhdGVnb3JpZXMocmVzcG9uc2UuZGF0YS5kYXRhIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNhdGVnb3JpZXM6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBmZXRjaFZlbmRvcnMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy92ZW5kb3JzJyk7XG4gICAgICAgICAgICBzZXRWZW5kb3JzKHJlc3BvbnNlLmRhdGEuZGF0YSB8fCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB2ZW5kb3JzOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZmV0Y2hGdW5kcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL2Z1bmRzJyk7XG4gICAgICAgICAgICBzZXRGdW5kcyhyZXNwb25zZS5kYXRhLmRhdGEgfHwgW10pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZnVuZHM6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRTdWJtaXR0aW5nKHRydWUpO1xuICAgICAgICAgICAgYXdhaXQgYXBpLnBvc3QoJy9leHBlbnNlcycsIHtcbiAgICAgICAgICAgICAgICAuLi5mb3JtRGF0YSxcbiAgICAgICAgICAgICAgICBhbW91bnQ6IHBhcnNlRmxvYXQoZm9ybURhdGEuYW1vdW50KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRTaG93QWRkTW9kYWwoZmFsc2UpO1xuICAgICAgICAgICAgc2V0Rm9ybURhdGEoe1xuICAgICAgICAgICAgICAgIGV4cGVuc2VfY2F0ZWdvcnlfaWQ6ICcnLFxuICAgICAgICAgICAgICAgIHZlbmRvcl9pZDogJycsXG4gICAgICAgICAgICAgICAgZnVuZF9pZDogJycsXG4gICAgICAgICAgICAgICAgYW1vdW50OiAnJyxcbiAgICAgICAgICAgICAgICBleHBlbnNlX2RhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBwYXltZW50X21ldGhvZDogJ2Nhc2gnLFxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZV9udW1iZXI6ICcnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZldGNoRXhwZW5zZXMoKTtcbiAgICAgICAgICAgIGFsZXJ0KCdFeHBlbnNlIHJlY29yZGVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJlY29yZGluZyBleHBlbnNlOicsIGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gcmVjb3JkIGV4cGVuc2UuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAoYW1vdW50KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVBIJywge1xuICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgICAgICAgICBjdXJyZW5jeTogJ1BIUCdcbiAgICAgICAgfSkuZm9ybWF0KGFtb3VudCk7XG4gICAgfTtcbiAgICBjb25zdCBmb3JtYXREYXRlID0gKGRhdGVTdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGVTdHJpbmcpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICBtb250aDogJ3Nob3J0JyxcbiAgICAgICAgICAgIGRheTogJ251bWVyaWMnXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgZ2V0U3RhdHVzQmFkZ2UgPSAoc3RhdHVzKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgICAgICAgIHBlbmRpbmc6ICdiZy15ZWxsb3ctMTAwIHRleHQteWVsbG93LTgwMCcsXG4gICAgICAgICAgICBhcHByb3ZlZDogJ2JnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTgwMCcsXG4gICAgICAgICAgICByZWplY3RlZDogJ2JnLXJlZC0xMDAgdGV4dC1yZWQtODAwJ1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBpY29ucyA9IHtcbiAgICAgICAgICAgIHBlbmRpbmc6IF9qc3goQ2xvY2ssIHsgc2l6ZTogMTQgfSksXG4gICAgICAgICAgICBhcHByb3ZlZDogX2pzeChDaGVja0NpcmNsZSwgeyBzaXplOiAxNCB9KSxcbiAgICAgICAgICAgIHJlamVjdGVkOiBfanN4KFhDaXJjbGUsIHsgc2l6ZTogMTQgfSlcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IGBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMiBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LXhzIGZvbnQtbWVkaXVtICR7c3R5bGVzW3N0YXR1c119YCwgY2hpbGRyZW46IFtpY29uc1tzdGF0dXNdLCBzdGF0dXMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdGF0dXMuc2xpY2UoMSldIH0pKTtcbiAgICB9O1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBcIkV4cGVuc2VzXCIgfSksIF9qc3hzKFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0U2hvd0FkZE1vZGFsKHRydWUpLCBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIGJnLWJsdWUtNjAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBob3ZlcjpiZy1ibHVlLTcwMFwiLCBjaGlsZHJlbjogW19qc3goUGx1cywgeyBzaXplOiAyMCB9KSwgXCJSZWNvcmQgRXhwZW5zZVwiXSB9KV0gfSksIF9qc3goQ2FyZCwgeyBjbGFzc05hbWU6IFwicC00XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy01IGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmVcIiwgY2hpbGRyZW46IFtfanN4KFNlYXJjaCwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgbGVmdC0zIHRvcC0xLzIgdHJhbnNmb3JtIC10cmFuc2xhdGUteS0xLzIgdGV4dC1ncmF5LTQwMFwiLCBzaXplOiAyMCB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiBcIlNlYXJjaCBleHBlbnNlcy4uLlwiLCB2YWx1ZTogZmlsdGVycy5zZWFyY2gsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RmlsdGVycyh7IC4uLmZpbHRlcnMsIHNlYXJjaDogZS50YXJnZXQudmFsdWUgfSksIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcGwtMTAgcHItNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiB9KV0gfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgdmFsdWU6IGZpbHRlcnMuY2F0ZWdvcnlfaWQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RmlsdGVycyh7IC4uLmZpbHRlcnMsIGNhdGVnb3J5X2lkOiBlLnRhcmdldC52YWx1ZSB9KSwgY2xhc3NOYW1lOiBcInB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIsIGNoaWxkcmVuOiBbX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiLCBjaGlsZHJlbjogXCJBbGwgQ2F0ZWdvcmllc1wiIH0pLCBjYXRlZ29yaWVzLm1hcChjYXQgPT4gKF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogY2F0LmlkLCBjaGlsZHJlbjogY2F0Lm5hbWUgfSwgY2F0LmlkKSkpXSB9KSwgX2pzeHMoXCJzZWxlY3RcIiwgeyB2YWx1ZTogZmlsdGVycy5zdGF0dXMsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RmlsdGVycyh7IC4uLmZpbHRlcnMsIHN0YXR1czogZS50YXJnZXQudmFsdWUgfSksIGNsYXNzTmFtZTogXCJweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiLCBjaGlsZHJlbjogW19qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJcIiwgY2hpbGRyZW46IFwiQWxsIFN0YXR1c1wiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwicGVuZGluZ1wiLCBjaGlsZHJlbjogXCJQZW5kaW5nXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJhcHByb3ZlZFwiLCBjaGlsZHJlbjogXCJBcHByb3ZlZFwiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwicmVqZWN0ZWRcIiwgY2hpbGRyZW46IFwiUmVqZWN0ZWRcIiB9KV0gfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogZmlsdGVycy5zdGFydF9kYXRlLCBvbkNoYW5nZTogKGUpID0+IHNldEZpbHRlcnMoeyAuLi5maWx0ZXJzLCBzdGFydF9kYXRlOiBlLnRhcmdldC52YWx1ZSB9KSwgY2xhc3NOYW1lOiBcInB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogZmlsdGVycy5lbmRfZGF0ZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRGaWx0ZXJzKHsgLi4uZmlsdGVycywgZW5kX2RhdGU6IGUudGFyZ2V0LnZhbHVlIH0pLCBjbGFzc05hbWU6IFwicHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiB9KV0gfSkgfSksIF9qc3goQ2FyZCwgeyBjaGlsZHJlbjogbG9hZGluZyA/IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTEyIHRleHQtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtYmxvY2sgYW5pbWF0ZS1zcGluIHJvdW5kZWQtZnVsbCBoLTggdy04IGJvcmRlci1iLTIgYm9yZGVyLWJsdWUtNjAwXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTIgdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nIGV4cGVuc2VzLi4uXCIgfSldIH0pKSA6IGV4cGVuc2VzLmxlbmd0aCA9PT0gMCA/IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtMTIgdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTUwMFwiLCBjaGlsZHJlbjogX2pzeChcInBcIiwgeyBjaGlsZHJlbjogXCJObyBleHBlbnNlcyBmb3VuZCBmb3IgdGhlIHNlbGVjdGVkIGZpbHRlcnMuXCIgfSkgfSkpIDogKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwib3ZlcmZsb3cteC1hdXRvXCIsIGNoaWxkcmVuOiBfanN4cyhcInRhYmxlXCIsIHsgY2xhc3NOYW1lOiBcInctZnVsbFwiLCBjaGlsZHJlbjogW19qc3goXCJ0aGVhZFwiLCB7IGNsYXNzTmFtZTogXCJiZy1ncmF5LTUwIGJvcmRlci1iIGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogX2pzeHMoXCJ0clwiLCB7IGNoaWxkcmVuOiBbX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJEYXRlXCIgfSksIF9qc3goXCJ0aFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTMgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiQ2F0ZWdvcnlcIiB9KSwgX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJWZW5kb3JcIiB9KSwgX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJEZXNjcmlwdGlvblwiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCIsIGNoaWxkcmVuOiBcIkFtb3VudFwiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCIsIGNoaWxkcmVuOiBcIlN0YXR1c1wiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtcmlnaHQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJBY3Rpb25zXCIgfSldIH0pIH0pLCBfanN4KFwidGJvZHlcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgZGl2aWRlLXkgZGl2aWRlLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBleHBlbnNlcy5tYXAoKGV4cGVuc2UpID0+IChfanN4cyhcInRyXCIsIHsgY2xhc3NOYW1lOiBcImhvdmVyOmJnLWdyYXktNTBcIiwgY2hpbGRyZW46IFtfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogZm9ybWF0RGF0ZShleHBlbnNlLmV4cGVuc2VfZGF0ZSkgfSksIF9qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBleHBlbnNlLmNhdGVnb3J5X25hbWUgfSksIF9qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBleHBlbnNlLnZlbmRvcl9uYW1lIHx8ICctJyB9KSwgX2pzeChcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNCB0ZXh0LXNtIHRleHQtZ3JheS05MDAgbWF4LXcteHMgdHJ1bmNhdGVcIiwgY2hpbGRyZW46IGV4cGVuc2UuZGVzY3JpcHRpb24gfSksIF9qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtcmVkLTYwMFwiLCBjaGlsZHJlbjogZm9ybWF0Q3VycmVuY3koZXhwZW5zZS5hbW91bnQpIH0pLCBfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc21cIiwgY2hpbGRyZW46IGdldFN0YXR1c0JhZGdlKGV4cGVuc2Uuc3RhdHVzKSB9KSwgX2pzeHMoXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1yaWdodCB0ZXh0LXNtIGZvbnQtbWVkaXVtXCIsIGNoaWxkcmVuOiBbX2pzeChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWJsdWUtNjAwIGhvdmVyOnRleHQtYmx1ZS05MDAgbXItM1wiLCBjaGlsZHJlbjogXCJWaWV3XCIgfSksIGV4cGVuc2Uuc3RhdHVzID09PSAncGVuZGluZycgJiYgKF9qc3hzKF9GcmFnbWVudCwgeyBjaGlsZHJlbjogW19qc3goXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmVlbi02MDAgaG92ZXI6dGV4dC1ncmVlbi05MDAgbXItM1wiLCBjaGlsZHJlbjogXCJBcHByb3ZlXCIgfSksIF9qc3goXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNjAwIGhvdmVyOnRleHQtcmVkLTkwMCBtci0zXCIsIGNoaWxkcmVuOiBcIlJlamVjdFwiIH0pXSB9KSksIF9qc3goXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1hbWJlci02MDAgaG92ZXI6dGV4dC1hbWJlci05MDBcIiwgY2hpbGRyZW46IF9qc3goQXJjaGl2ZSwgeyBzaXplOiAxNiwgY2xhc3NOYW1lOiBcImlubGluZVwiIH0pIH0pXSB9KV0gfSwgZXhwZW5zZS5pZCkpKSB9KV0gfSkgfSkpIH0pLCBfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIG1iLTRcIiwgY2hpbGRyZW46IFwiU3VtbWFyeVwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy00IGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTUwMFwiLCBjaGlsZHJlbjogXCJUb3RhbCBFeHBlbnNlc1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1yZWQtNjAwXCIsIGNoaWxkcmVuOiBmb3JtYXRDdXJyZW5jeShleHBlbnNlcy5yZWR1Y2UoKHN1bSwgZSkgPT4gc3VtICsgZS5hbW91bnQsIDApKSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IFwiQXBwcm92ZWRcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JlZW4tNjAwXCIsIGNoaWxkcmVuOiBmb3JtYXRDdXJyZW5jeShleHBlbnNlcy5maWx0ZXIoZSA9PiBlLnN0YXR1cyA9PT0gJ2FwcHJvdmVkJykucmVkdWNlKChzdW0sIGUpID0+IHN1bSArIGUuYW1vdW50LCAwKSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNTAwXCIsIGNoaWxkcmVuOiBcIlBlbmRpbmdcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQteWVsbG93LTYwMFwiLCBjaGlsZHJlbjogZm9ybWF0Q3VycmVuY3koZXhwZW5zZXMuZmlsdGVyKGUgPT4gZS5zdGF0dXMgPT09ICdwZW5kaW5nJykucmVkdWNlKChzdW0sIGUpID0+IHN1bSArIGUuYW1vdW50LCAwKSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNTAwXCIsIGNoaWxkcmVuOiBcIk51bWJlciBvZiBUcmFuc2FjdGlvbnNcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtYmx1ZS02MDBcIiwgY2hpbGRyZW46IGV4cGVuc2VzLmxlbmd0aCB9KV0gfSldIH0pXSB9KSwgc2hvd0FkZE1vZGFsICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZpeGVkIGluc2V0LTAgYmctYmxhY2sgYmctb3BhY2l0eS01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB6LTUwXCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSByb3VuZGVkLWxnIHAtNiB3LWZ1bGwgbWF4LXctMnhsIG1heC1oLVs5MHZoXSBvdmVyZmxvdy15LWF1dG9cIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14bCBmb250LWJvbGQgbWItNFwiLCBjaGlsZHJlbjogXCJSZWNvcmQgRXhwZW5zZVwiIH0pLCBfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJDYXRlZ29yeSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgdmFsdWU6IGZvcm1EYXRhLmV4cGVuc2VfY2F0ZWdvcnlfaWQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgZXhwZW5zZV9jYXRlZ29yeV9pZDogZS50YXJnZXQudmFsdWUgfSksIHJlcXVpcmVkOiB0cnVlLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIsIGNoaWxkcmVuOiBbX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiLCBjaGlsZHJlbjogXCJTZWxlY3QgQ2F0ZWdvcnlcIiB9KSwgY2F0ZWdvcmllcy5tYXAoY2F0ID0+IChfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IGNhdC5pZCwgY2hpbGRyZW46IGNhdC5uYW1lIH0sIGNhdC5pZCkpKV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIlZlbmRvclwiIH0pLCBfanN4cyhcInNlbGVjdFwiLCB7IHZhbHVlOiBmb3JtRGF0YS52ZW5kb3JfaWQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgdmVuZG9yX2lkOiBlLnRhcmdldC52YWx1ZSB9KSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiLCBjaGlsZHJlbjogW19qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJcIiwgY2hpbGRyZW46IFwiU2VsZWN0IFZlbmRvciAoT3B0aW9uYWwpXCIgfSksIHZlbmRvcnMubWFwKHZlbmRvciA9PiAoX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiB2ZW5kb3IuaWQsIGNoaWxkcmVuOiB2ZW5kb3IubmFtZSB9LCB2ZW5kb3IuaWQpKSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJGdW5kXCIgfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgdmFsdWU6IGZvcm1EYXRhLmZ1bmRfaWQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgZnVuZF9pZDogZS50YXJnZXQudmFsdWUgfSksIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiwgY2hpbGRyZW46IFtfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiXCIsIGNoaWxkcmVuOiBcIlNlbGVjdCBGdW5kIChPcHRpb25hbClcIiB9KSwgZnVuZHMubWFwKGZ1bmQgPT4gKF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogZnVuZC5pZCwgY2hpbGRyZW46IGZ1bmQubmFtZSB9LCBmdW5kLmlkKSkpXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJBbW91bnQgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcIm51bWJlclwiLCBzdGVwOiBcIjAuMDFcIiwgbWluOiBcIjAuMDFcIiwgdmFsdWU6IGZvcm1EYXRhLmFtb3VudCwgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBhbW91bnQ6IGUudGFyZ2V0LnZhbHVlIH0pLCByZXF1aXJlZDogdHJ1ZSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkRhdGUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImRhdGVcIiwgdmFsdWU6IGZvcm1EYXRhLmV4cGVuc2VfZGF0ZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBleHBlbnNlX2RhdGU6IGUudGFyZ2V0LnZhbHVlIH0pLCByZXF1aXJlZDogdHJ1ZSwgbWF4OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkRlc2NyaXB0aW9uIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChcInRleHRhcmVhXCIsIHsgdmFsdWU6IGZvcm1EYXRhLmRlc2NyaXB0aW9uLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIGRlc2NyaXB0aW9uOiBlLnRhcmdldC52YWx1ZSB9KSwgcmVxdWlyZWQ6IHRydWUsIHJvd3M6IDMsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJQYXltZW50IE1ldGhvZCBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgdmFsdWU6IGZvcm1EYXRhLnBheW1lbnRfbWV0aG9kLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIHBheW1lbnRfbWV0aG9kOiBlLnRhcmdldC52YWx1ZSB9KSwgcmVxdWlyZWQ6IHRydWUsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiwgY2hpbGRyZW46IFtfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiY2FzaFwiLCBjaGlsZHJlbjogXCJDYXNoXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJjaGVja1wiLCBjaGlsZHJlbjogXCJDaGVja1wiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiYmFua190cmFuc2ZlclwiLCBjaGlsZHJlbjogXCJCYW5rIFRyYW5zZmVyXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJvbmxpbmVcIiwgY2hpbGRyZW46IFwiT25saW5lXCIgfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJSZWZlcmVuY2UgTnVtYmVyXCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogZm9ybURhdGEucmVmZXJlbmNlX251bWJlciwgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCByZWZlcmVuY2VfbnVtYmVyOiBlLnRhcmdldC52YWx1ZSB9KSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1lbmQgZ2FwLTMgbXQtNlwiLCBjaGlsZHJlbjogW19qc3goXCJidXR0b25cIiwgeyB0eXBlOiBcImJ1dHRvblwiLCBvbkNsaWNrOiAoKSA9PiBzZXRTaG93QWRkTW9kYWwoZmFsc2UpLCBjbGFzc05hbWU6IFwicHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1ncmF5LTUwXCIsIGRpc2FibGVkOiBzdWJtaXR0aW5nLCBjaGlsZHJlbjogXCJDYW5jZWxcIiB9KSwgX2pzeChcImJ1dHRvblwiLCB7IHR5cGU6IFwic3VibWl0XCIsIGRpc2FibGVkOiBzdWJtaXR0aW5nLCBjbGFzc05hbWU6IFwicHgtNCBweS0yIGJnLWJsdWUtNjAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyBob3ZlcjpiZy1ibHVlLTcwMCBkaXNhYmxlZDpvcGFjaXR5LTUwXCIsIGNoaWxkcmVuOiBzdWJtaXR0aW5nID8gJ1JlY29yZGluZy4uLicgOiAnUmVjb3JkIEV4cGVuc2UnIH0pXSB9KV0gfSldIH0pIH0pKV0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VzO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2xpYi9hcGknO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWkvY2FyZCc7XG5pbXBvcnQgeyBBcmNoaXZlLCBQbHVzLCBTZWFyY2ggfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuY29uc3QgT2ZmZXJpbmdzID0gKCkgPT4ge1xuICAgIGNvbnN0IFtvZmZlcmluZ3MsIHNldE9mZmVyaW5nc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW29mZmVyaW5nVHlwZXMsIHNldE9mZmVyaW5nVHlwZXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFttZW1iZXJzLCBzZXRNZW1iZXJzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbc2hvd0FkZE1vZGFsLCBzZXRTaG93QWRkTW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtzdWJtaXR0aW5nLCBzZXRTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbZmlsdGVycywgc2V0RmlsdGVyc10gPSB1c2VTdGF0ZSh7XG4gICAgICAgIHNlYXJjaDogJycsXG4gICAgICAgIG9mZmVyaW5nX3R5cGVfaWQ6ICcnLFxuICAgICAgICBwYXltZW50X21ldGhvZDogJycsXG4gICAgICAgIHN0YXJ0X2RhdGU6ICcnLFxuICAgICAgICBlbmRfZGF0ZTogJydcbiAgICB9KTtcbiAgICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgbWVtYmVyX2lkOiAnJyxcbiAgICAgICAgb2ZmZXJpbmdfdHlwZV9pZDogJycsXG4gICAgICAgIGFtb3VudDogJycsXG4gICAgICAgIHBheW1lbnRfbWV0aG9kOiAnY2FzaCcsXG4gICAgICAgIHJlZmVyZW5jZV9udW1iZXI6ICcnLFxuICAgICAgICBvZmZlcmluZ19kYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSxcbiAgICAgICAgbm90ZXM6ICcnLFxuICAgICAgICBpc19hbm9ueW1vdXM6IGZhbHNlXG4gICAgfSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hPZmZlcmluZ3MoKTtcbiAgICAgICAgZmV0Y2hPZmZlcmluZ1R5cGVzKCk7XG4gICAgICAgIGZldGNoTWVtYmVycygpO1xuICAgIH0sIFtmaWx0ZXJzXSk7XG4gICAgY29uc3QgZmV0Y2hPZmZlcmluZ3MgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvb2ZmZXJpbmdzJywgeyBwYXJhbXM6IGZpbHRlcnMgfSk7XG4gICAgICAgICAgICBzZXRPZmZlcmluZ3MocmVzcG9uc2UuZGF0YS5kYXRhIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIG9mZmVyaW5nczonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZmV0Y2hPZmZlcmluZ1R5cGVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvb2ZmZXJpbmctdHlwZXMnKTtcbiAgICAgICAgICAgIHNldE9mZmVyaW5nVHlwZXMocmVzcG9uc2UuZGF0YS5kYXRhIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIG9mZmVyaW5nIHR5cGVzOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZmV0Y2hNZW1iZXJzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvbWVtYmVycycpO1xuICAgICAgICAgICAgc2V0TWVtYmVycyhyZXNwb25zZS5kYXRhLmRhdGEgfHwgW10pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbWVtYmVyczonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldFN1Ym1pdHRpbmcodHJ1ZSk7XG4gICAgICAgICAgICBhd2FpdCBhcGkucG9zdCgnL29mZmVyaW5ncycsIHtcbiAgICAgICAgICAgICAgICAuLi5mb3JtRGF0YSxcbiAgICAgICAgICAgICAgICBtZW1iZXJfaWQ6IGZvcm1EYXRhLmlzX2Fub255bW91cyA/IG51bGwgOiBmb3JtRGF0YS5tZW1iZXJfaWQsXG4gICAgICAgICAgICAgICAgYW1vdW50OiBwYXJzZUZsb2F0KGZvcm1EYXRhLmFtb3VudClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0U2hvd0FkZE1vZGFsKGZhbHNlKTtcbiAgICAgICAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgICAgICAgICBtZW1iZXJfaWQ6ICcnLFxuICAgICAgICAgICAgICAgIG9mZmVyaW5nX3R5cGVfaWQ6ICcnLFxuICAgICAgICAgICAgICAgIGFtb3VudDogJycsXG4gICAgICAgICAgICAgICAgcGF5bWVudF9tZXRob2Q6ICdjYXNoJyxcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VfbnVtYmVyOiAnJyxcbiAgICAgICAgICAgICAgICBvZmZlcmluZ19kYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSxcbiAgICAgICAgICAgICAgICBub3RlczogJycsXG4gICAgICAgICAgICAgICAgaXNfYW5vbnltb3VzOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmZXRjaE9mZmVyaW5ncygpO1xuICAgICAgICAgICAgYWxlcnQoJ09mZmVyaW5nIHJlY29yZGVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJlY29yZGluZyBvZmZlcmluZzonLCBlcnJvcik7XG4gICAgICAgICAgICBhbGVydCgnRmFpbGVkIHRvIHJlY29yZCBvZmZlcmluZy4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldFN1Ym1pdHRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBmb3JtYXRDdXJyZW5jeSA9IChhbW91bnQpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tUEgnLCB7XG4gICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgICAgIGN1cnJlbmN5OiAnUEhQJ1xuICAgICAgICB9KS5mb3JtYXQoYW1vdW50KTtcbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZVN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZVN0cmluZykudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgIG1vbnRoOiAnc2hvcnQnLFxuICAgICAgICAgICAgZGF5OiAnbnVtZXJpYydcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogXCJPZmZlcmluZ3NcIiB9KSwgX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRTaG93QWRkTW9kYWwodHJ1ZSksIGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgYmctYmx1ZS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGhvdmVyOmJnLWJsdWUtNzAwXCIsIGNoaWxkcmVuOiBbX2pzeChQbHVzLCB7IHNpemU6IDIwIH0pLCBcIlJlY29yZCBPZmZlcmluZ1wiXSB9KV0gfSksIF9qc3goQ2FyZCwgeyBjbGFzc05hbWU6IFwicC00XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy01IGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmVcIiwgY2hpbGRyZW46IFtfanN4KFNlYXJjaCwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgbGVmdC0zIHRvcC0xLzIgdHJhbnNmb3JtIC10cmFuc2xhdGUteS0xLzIgdGV4dC1ncmF5LTQwMFwiLCBzaXplOiAyMCB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiBcIlNlYXJjaCBieSBtZW1iZXIuLi5cIiwgdmFsdWU6IGZpbHRlcnMuc2VhcmNoLCBvbkNoYW5nZTogKGUpID0+IHNldEZpbHRlcnMoeyAuLi5maWx0ZXJzLCBzZWFyY2g6IGUudGFyZ2V0LnZhbHVlIH0pLCBjbGFzc05hbWU6IFwidy1mdWxsIHBsLTEwIHByLTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4cyhcInNlbGVjdFwiLCB7IHZhbHVlOiBmaWx0ZXJzLm9mZmVyaW5nX3R5cGVfaWQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RmlsdGVycyh7IC4uLmZpbHRlcnMsIG9mZmVyaW5nX3R5cGVfaWQ6IGUudGFyZ2V0LnZhbHVlIH0pLCBjbGFzc05hbWU6IFwicHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiwgY2hpbGRyZW46IFtfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiXCIsIGNoaWxkcmVuOiBcIkFsbCBUeXBlc1wiIH0pLCBvZmZlcmluZ1R5cGVzLm1hcCh0eXBlID0+IChfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IHR5cGUuaWQsIGNoaWxkcmVuOiB0eXBlLm5hbWUgfSwgdHlwZS5pZCkpKV0gfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgdmFsdWU6IGZpbHRlcnMucGF5bWVudF9tZXRob2QsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RmlsdGVycyh7IC4uLmZpbHRlcnMsIHBheW1lbnRfbWV0aG9kOiBlLnRhcmdldC52YWx1ZSB9KSwgY2xhc3NOYW1lOiBcInB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIsIGNoaWxkcmVuOiBbX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiLCBjaGlsZHJlbjogXCJBbGwgTWV0aG9kc1wiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiY2FzaFwiLCBjaGlsZHJlbjogXCJDYXNoXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJjaGVja1wiLCBjaGlsZHJlbjogXCJDaGVja1wiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiYmFua190cmFuc2ZlclwiLCBjaGlsZHJlbjogXCJCYW5rIFRyYW5zZmVyXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJvbmxpbmVcIiwgY2hpbGRyZW46IFwiT25saW5lXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImRhdGVcIiwgdmFsdWU6IGZpbHRlcnMuc3RhcnRfZGF0ZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRGaWx0ZXJzKHsgLi4uZmlsdGVycywgc3RhcnRfZGF0ZTogZS50YXJnZXQudmFsdWUgfSksIGNsYXNzTmFtZTogXCJweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiLCBwbGFjZWhvbGRlcjogXCJTdGFydCBEYXRlXCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogZmlsdGVycy5lbmRfZGF0ZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRGaWx0ZXJzKHsgLi4uZmlsdGVycywgZW5kX2RhdGU6IGUudGFyZ2V0LnZhbHVlIH0pLCBjbGFzc05hbWU6IFwicHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiwgcGxhY2Vob2xkZXI6IFwiRW5kIERhdGVcIiB9KV0gfSkgfSksIF9qc3goQ2FyZCwgeyBjaGlsZHJlbjogbG9hZGluZyA/IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTEyIHRleHQtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtYmxvY2sgYW5pbWF0ZS1zcGluIHJvdW5kZWQtZnVsbCBoLTggdy04IGJvcmRlci1iLTIgYm9yZGVyLWJsdWUtNjAwXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTIgdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nIG9mZmVyaW5ncy4uLlwiIH0pXSB9KSkgOiBvZmZlcmluZ3MubGVuZ3RoID09PSAwID8gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicC0xMiB0ZXh0LWNlbnRlciB0ZXh0LWdyYXktNTAwXCIsIGNoaWxkcmVuOiBfanN4KFwicFwiLCB7IGNoaWxkcmVuOiBcIk5vIG9mZmVyaW5ncyBmb3VuZCBmb3IgdGhlIHNlbGVjdGVkIGZpbHRlcnMuXCIgfSkgfSkpIDogKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwib3ZlcmZsb3cteC1hdXRvXCIsIGNoaWxkcmVuOiBfanN4cyhcInRhYmxlXCIsIHsgY2xhc3NOYW1lOiBcInctZnVsbFwiLCBjaGlsZHJlbjogW19qc3goXCJ0aGVhZFwiLCB7IGNsYXNzTmFtZTogXCJiZy1ncmF5LTUwIGJvcmRlci1iIGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogX2pzeHMoXCJ0clwiLCB7IGNoaWxkcmVuOiBbX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJEYXRlXCIgfSksIF9qc3goXCJ0aFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTMgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiTWVtYmVyXCIgfSksIF9qc3goXCJ0aFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTMgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiVHlwZVwiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCIsIGNoaWxkcmVuOiBcIkFtb3VudFwiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCIsIGNoaWxkcmVuOiBcIk1ldGhvZFwiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCIsIGNoaWxkcmVuOiBcIlJlZmVyZW5jZVwiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtcmlnaHQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJBY3Rpb25zXCIgfSldIH0pIH0pLCBfanN4KFwidGJvZHlcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgZGl2aWRlLXkgZGl2aWRlLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBvZmZlcmluZ3MubWFwKChvZmZlcmluZykgPT4gKF9qc3hzKFwidHJcIiwgeyBjbGFzc05hbWU6IFwiaG92ZXI6YmctZ3JheS01MFwiLCBjaGlsZHJlbjogW19qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBmb3JtYXREYXRlKG9mZmVyaW5nLm9mZmVyaW5nX2RhdGUpIH0pLCBfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogb2ZmZXJpbmcuaXNfYW5vbnltb3VzID8gKF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS01MDAgaXRhbGljXCIsIGNoaWxkcmVuOiBcIkFub255bW91c1wiIH0pKSA6IChvZmZlcmluZy5tZW1iZXJfbmFtZSB8fCAnTi9BJykgfSksIF9qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBvZmZlcmluZy5vZmZlcmluZ190eXBlX25hbWUgfSksIF9qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtZ3JlZW4tNjAwXCIsIGNoaWxkcmVuOiBmb3JtYXRDdXJyZW5jeShvZmZlcmluZy5hbW91bnQpIH0pLCBfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1ncmF5LTkwMCBjYXBpdGFsaXplXCIsIGNoaWxkcmVuOiBvZmZlcmluZy5wYXltZW50X21ldGhvZC5yZXBsYWNlKCdfJywgJyAnKSB9KSwgX2pzeChcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNCB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXNtIHRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IG9mZmVyaW5nLnJlZmVyZW5jZV9udW1iZXIgfHwgJy0nIH0pLCBfanN4cyhcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNCB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXJpZ2h0IHRleHQtc20gZm9udC1tZWRpdW1cIiwgY2hpbGRyZW46IFtfanN4KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtYmx1ZS02MDAgaG92ZXI6dGV4dC1ibHVlLTkwMCBtci0zXCIsIG9uQ2xpY2s6ICgpID0+IHsgfSwgY2hpbGRyZW46IFwiVmlld1wiIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtYW1iZXItNjAwIGhvdmVyOnRleHQtYW1iZXItOTAwXCIsIG9uQ2xpY2s6ICgpID0+IHsgfSwgY2hpbGRyZW46IF9qc3goQXJjaGl2ZSwgeyBzaXplOiAxNiwgY2xhc3NOYW1lOiBcImlubGluZVwiIH0pIH0pXSB9KV0gfSwgb2ZmZXJpbmcuaWQpKSkgfSldIH0pIH0pKSB9KSwgX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1zZW1pYm9sZCBtYi00XCIsIGNoaWxkcmVuOiBcIlN1bW1hcnlcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IFwiVG90YWwgT2ZmZXJpbmdzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyZWVuLTYwMFwiLCBjaGlsZHJlbjogZm9ybWF0Q3VycmVuY3kob2ZmZXJpbmdzLnJlZHVjZSgoc3VtLCBvKSA9PiBzdW0gKyAoTnVtYmVyKG8uYW1vdW50KSB8fCAwKSwgMCkpIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTUwMFwiLCBjaGlsZHJlbjogXCJOdW1iZXIgb2YgVHJhbnNhY3Rpb25zXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWJsdWUtNjAwXCIsIGNoaWxkcmVuOiBvZmZlcmluZ3MubGVuZ3RoIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTUwMFwiLCBjaGlsZHJlbjogXCJBdmVyYWdlIE9mZmVyaW5nXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXB1cnBsZS02MDBcIiwgY2hpbGRyZW46IG9mZmVyaW5ncy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZm9ybWF0Q3VycmVuY3kob2ZmZXJpbmdzLnJlZHVjZSgoc3VtLCBvKSA9PiBzdW0gKyAoTnVtYmVyKG8uYW1vdW50KSB8fCAwKSwgMCkgLyBvZmZlcmluZ3MubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZvcm1hdEN1cnJlbmN5KDApIH0pXSB9KV0gfSldIH0pLCBzaG93QWRkTW9kYWwgJiYgKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZml4ZWQgaW5zZXQtMCBiZy1ibGFjayBiZy1vcGFjaXR5LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHotNTBcIiwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLXdoaXRlIHJvdW5kZWQtbGcgcC02IHctZnVsbCBtYXgtdy0yeGwgbWF4LWgtWzkwdmhdIG92ZXJmbG93LXktYXV0b1wiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhsIGZvbnQtYm9sZCBtYi00XCIsIGNoaWxkcmVuOiBcIlJlY29yZCBPZmZlcmluZ1wiIH0pLCBfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiQW5vbnltb3VzIE9mZmVyaW5nXCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgY2hlY2tlZDogZm9ybURhdGEuaXNfYW5vbnltb3VzLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIGlzX2Fub255bW91czogZS50YXJnZXQuY2hlY2tlZCwgbWVtYmVyX2lkOiAnJyB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1ibHVlLTYwMCBmb2N1czpyaW5nLWJsdWUtNTAwIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkXCIgfSldIH0pLCAhZm9ybURhdGEuaXNfYW5vbnltb3VzICYmIChfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiTWVtYmVyIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeHMoXCJzZWxlY3RcIiwgeyB2YWx1ZTogZm9ybURhdGEubWVtYmVyX2lkLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIG1lbWJlcl9pZDogZS50YXJnZXQudmFsdWUgfSksIHJlcXVpcmVkOiAhZm9ybURhdGEuaXNfYW5vbnltb3VzLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIsIGNoaWxkcmVuOiBbX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiLCBjaGlsZHJlbjogXCJTZWxlY3QgTWVtYmVyXCIgfSksIG1lbWJlcnMubWFwKG1lbWJlciA9PiAoX2pzeHMoXCJvcHRpb25cIiwgeyB2YWx1ZTogbWVtYmVyLmlkLCBjaGlsZHJlbjogW21lbWJlci5maXJzdF9uYW1lLCBcIiBcIiwgbWVtYmVyLmxhc3RfbmFtZV0gfSwgbWVtYmVyLmlkKSkpXSB9KV0gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiT2ZmZXJpbmcgVHlwZSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgdmFsdWU6IGZvcm1EYXRhLm9mZmVyaW5nX3R5cGVfaWQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgb2ZmZXJpbmdfdHlwZV9pZDogZS50YXJnZXQudmFsdWUgfSksIHJlcXVpcmVkOiB0cnVlLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIsIGNoaWxkcmVuOiBbX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiLCBjaGlsZHJlbjogXCJTZWxlY3QgVHlwZVwiIH0pLCBvZmZlcmluZ1R5cGVzLm1hcCh0eXBlID0+IChfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IHR5cGUuaWQsIGNoaWxkcmVuOiB0eXBlLm5hbWUgfSwgdHlwZS5pZCkpKV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiQW1vdW50IFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJudW1iZXJcIiwgc3RlcDogXCIwLjAxXCIsIG1pbjogXCIwLjAxXCIsIHZhbHVlOiBmb3JtRGF0YS5hbW91bnQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgYW1vdW50OiBlLnRhcmdldC52YWx1ZSB9KSwgcmVxdWlyZWQ6IHRydWUsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJQYXltZW50IE1ldGhvZCBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgdmFsdWU6IGZvcm1EYXRhLnBheW1lbnRfbWV0aG9kLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIHBheW1lbnRfbWV0aG9kOiBlLnRhcmdldC52YWx1ZSB9KSwgcmVxdWlyZWQ6IHRydWUsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiwgY2hpbGRyZW46IFtfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiY2FzaFwiLCBjaGlsZHJlbjogXCJDYXNoXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJjaGVja1wiLCBjaGlsZHJlbjogXCJDaGVja1wiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiYmFua190cmFuc2ZlclwiLCBjaGlsZHJlbjogXCJCYW5rIFRyYW5zZmVyXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJvbmxpbmVcIiwgY2hpbGRyZW46IFwiT25saW5lXCIgfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkRhdGUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImRhdGVcIiwgdmFsdWU6IGZvcm1EYXRhLm9mZmVyaW5nX2RhdGUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgb2ZmZXJpbmdfZGF0ZTogZS50YXJnZXQudmFsdWUgfSksIHJlcXVpcmVkOiB0cnVlLCBtYXg6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIlJlZmVyZW5jZSBOdW1iZXJcIiB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5yZWZlcmVuY2VfbnVtYmVyLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIHJlZmVyZW5jZV9udW1iZXI6IGUudGFyZ2V0LnZhbHVlIH0pLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIk5vdGVzXCIgfSksIF9qc3goXCJ0ZXh0YXJlYVwiLCB7IHZhbHVlOiBmb3JtRGF0YS5ub3Rlcywgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBub3RlczogZS50YXJnZXQudmFsdWUgfSksIHJvd3M6IDMsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiB9KV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktZW5kIGdhcC0zIG10LTZcIiwgY2hpbGRyZW46IFtfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogKCkgPT4gc2V0U2hvd0FkZE1vZGFsKGZhbHNlKSwgY2xhc3NOYW1lOiBcInB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgaG92ZXI6YmctZ3JheS01MFwiLCBkaXNhYmxlZDogc3VibWl0dGluZywgY2hpbGRyZW46IFwiQ2FuY2VsXCIgfSksIF9qc3goXCJidXR0b25cIiwgeyB0eXBlOiBcInN1Ym1pdFwiLCBkaXNhYmxlZDogc3VibWl0dGluZywgY2xhc3NOYW1lOiBcInB4LTQgcHktMiBiZy1ibHVlLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgaG92ZXI6YmctYmx1ZS03MDAgZGlzYWJsZWQ6b3BhY2l0eS01MFwiLCBjaGlsZHJlbjogc3VibWl0dGluZyA/ICdSZWNvcmRpbmcuLi4nIDogJ1JlY29yZCBPZmZlcmluZycgfSldIH0pXSB9KV0gfSkgfSkpXSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgT2ZmZXJpbmdzO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vbGliL2FwaSc7XG5pbXBvcnQgeyBDYXJkIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aS9jYXJkJztcbmltcG9ydCB7IERvd25sb2FkLCBGaWxlVGV4dCwgVHJlbmRpbmdVcCwgUGllQ2hhcnQsIEJhckNoYXJ0MywgQ2FsZW5kYXIgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuY29uc3QgUmVwb3J0cyA9ICgpID0+IHtcbiAgICBjb25zdCBbZ2VuZXJhdGluZywgc2V0R2VuZXJhdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3N0YXRpc3RpY3MsIHNldFN0YXRpc3RpY3NdID0gdXNlU3RhdGUoe1xuICAgICAgICB0b3RhbF9pbmNvbWU6IDAsXG4gICAgICAgIHRvdGFsX2V4cGVuc2VzOiAwLFxuICAgICAgICBuZXRfcG9zaXRpb246IDAsXG4gICAgICAgIGZ1bmRfYmFsYW5jZTogMFxuICAgIH0pO1xuICAgIGNvbnN0IFtkYXRlUmFuZ2UsIHNldERhdGVSYW5nZV0gPSB1c2VTdGF0ZSh7XG4gICAgICAgIHN0YXJ0X2RhdGU6IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSwgMCwgMSkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgICAgICBlbmRfZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF1cbiAgICB9KTtcbiAgICAvLyBGZXRjaCBzdGF0aXN0aWNzIHdoZW4gZGF0ZSByYW5nZSBjaGFuZ2VzXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hTdGF0aXN0aWNzKCk7XG4gICAgfSwgW2RhdGVSYW5nZV0pO1xuICAgIGNvbnN0IGZldGNoU3RhdGlzdGljcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL3JlcG9ydHMvcXVpY2stc3RhdGlzdGljcycsIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGVSYW5nZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2V0U3RhdGlzdGljcyhyZXNwb25zZS5kYXRhLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc3RhdGlzdGljczonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKGFtb3VudCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1QSCcsIHtcbiAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgICAgICAgICAgY3VycmVuY3k6ICdQSFAnXG4gICAgICAgIH0pLmZvcm1hdChhbW91bnQpO1xuICAgIH07XG4gICAgY29uc3QgZ2VuZXJhdGVSZXBvcnQgPSBhc3luYyAocmVwb3J0VHlwZSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0R2VuZXJhdGluZyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL3JlcG9ydHMvJHtyZXBvcnRUeXBlfWAsIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGVSYW5nZSxcbiAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU6ICdibG9iJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBDcmVhdGUgZG93bmxvYWQgbGlua1xuICAgICAgICAgICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW3Jlc3BvbnNlLmRhdGFdKSk7XG4gICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgYCR7cmVwb3J0VHlwZX0tcmVwb3J0LSR7RGF0ZS5ub3coKX0ucGRmYCk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICAgICAgbGluay5jbGljaygpO1xuICAgICAgICAgICAgbGluay5yZW1vdmUoKTtcbiAgICAgICAgICAgIGFsZXJ0KCdSZXBvcnQgZ2VuZXJhdGVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGdlbmVyYXRpbmcgcmVwb3J0OicsIGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gZ2VuZXJhdGUgcmVwb3J0LiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0R2VuZXJhdGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHJlcG9ydHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnZmluYW5jaWFsLXN1bW1hcnknLFxuICAgICAgICAgICAgdGl0bGU6ICdGaW5hbmNpYWwgU3VtbWFyeSBSZXBvcnQnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdDb21wcmVoZW5zaXZlIG92ZXJ2aWV3IG9mIGFsbCBmaW5hbmNpYWwgYWN0aXZpdGllcyBpbmNsdWRpbmcgaW5jb21lLCBleHBlbnNlcywgYW5kIG5ldCBwb3NpdGlvbi4nLFxuICAgICAgICAgICAgaWNvbjogX2pzeChGaWxlVGV4dCwgeyBzaXplOiAyNCwgY2xhc3NOYW1lOiBcInRleHQtYmx1ZS02MDBcIiB9KSxcbiAgICAgICAgICAgIGNvbG9yOiAnYmctYmx1ZS01MCBib3JkZXItYmx1ZS0yMDAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnaW5jb21lLXN0YXRlbWVudCcsXG4gICAgICAgICAgICB0aXRsZTogJ0luY29tZSBTdGF0ZW1lbnQnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdEZXRhaWxlZCBicmVha2Rvd24gb2YgYWxsIGluY29tZSBzb3VyY2VzIGluY2x1ZGluZyBvZmZlcmluZ3MsIHRpdGhlcywgYW5kIG90aGVyIHJldmVudWUuJyxcbiAgICAgICAgICAgIGljb246IF9qc3goVHJlbmRpbmdVcCwgeyBzaXplOiAyNCwgY2xhc3NOYW1lOiBcInRleHQtZ3JlZW4tNjAwXCIgfSksXG4gICAgICAgICAgICBjb2xvcjogJ2JnLWdyZWVuLTUwIGJvcmRlci1ncmVlbi0yMDAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnZXhwZW5zZS1yZXBvcnQnLFxuICAgICAgICAgICAgdGl0bGU6ICdFeHBlbnNlIFJlcG9ydCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0NvbXBsZXRlIGxpc3Rpbmcgb2YgYWxsIGV4cGVuc2VzIGNhdGVnb3JpemVkIGJ5IHR5cGUsIHZlbmRvciwgYW5kIGZ1bmQgYWxsb2NhdGlvbi4nLFxuICAgICAgICAgICAgaWNvbjogX2pzeChCYXJDaGFydDMsIHsgc2l6ZTogMjQsIGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC02MDBcIiB9KSxcbiAgICAgICAgICAgIGNvbG9yOiAnYmctcmVkLTUwIGJvcmRlci1yZWQtMjAwJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ2J1ZGdldC12YXJpYW5jZScsXG4gICAgICAgICAgICB0aXRsZTogJ0J1ZGdldCBWYXJpYW5jZSBSZXBvcnQnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBbmFseXNpcyBvZiBidWRnZXRlZCB2cyBhY3R1YWwgc3BlbmRpbmcgYWNyb3NzIGFsbCBjYXRlZ29yaWVzIHdpdGggdmFyaWFuY2UgY2FsY3VsYXRpb25zLicsXG4gICAgICAgICAgICBpY29uOiBfanN4KFBpZUNoYXJ0LCB7IHNpemU6IDI0LCBjbGFzc05hbWU6IFwidGV4dC1wdXJwbGUtNjAwXCIgfSksXG4gICAgICAgICAgICBjb2xvcjogJ2JnLXB1cnBsZS01MCBib3JkZXItcHVycGxlLTIwMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICdkb25vci1naXZpbmcnLFxuICAgICAgICAgICAgdGl0bGU6ICdEb25vciBHaXZpbmcgUmVwb3J0JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSW5kaXZpZHVhbCBkb25vciBjb250cmlidXRpb24gaGlzdG9yeSBmb3IgdGF4IHB1cnBvc2VzIGFuZCBkb25vciBtYW5hZ2VtZW50LicsXG4gICAgICAgICAgICBpY29uOiBfanN4KENhbGVuZGFyLCB7IHNpemU6IDI0LCBjbGFzc05hbWU6IFwidGV4dC1pbmRpZ28tNjAwXCIgfSksXG4gICAgICAgICAgICBjb2xvcjogJ2JnLWluZGlnby01MCBib3JkZXItaW5kaWdvLTIwMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICdmdW5kLWJhbGFuY2UnLFxuICAgICAgICAgICAgdGl0bGU6ICdGdW5kIEJhbGFuY2UgUmVwb3J0JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ3VycmVudCBiYWxhbmNlcyBhbmQgdHJhbnNhY3Rpb24gaGlzdG9yeSBmb3IgYWxsIHJlc3RyaWN0ZWQgYW5kIHVucmVzdHJpY3RlZCBmdW5kcy4nLFxuICAgICAgICAgICAgaWNvbjogX2pzeChGaWxlVGV4dCwgeyBzaXplOiAyNCwgY2xhc3NOYW1lOiBcInRleHQtYW1iZXItNjAwXCIgfSksXG4gICAgICAgICAgICBjb2xvcjogJ2JnLWFtYmVyLTUwIGJvcmRlci1hbWJlci0yMDAnXG4gICAgICAgIH1cbiAgICBdO1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0yXCIsIGNoaWxkcmVuOiBcIkZpbmFuY2lhbCBSZXBvcnRzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFwiR2VuZXJhdGUgY29tcHJlaGVuc2l2ZSBmaW5hbmNpYWwgcmVwb3J0cyBmb3IgYW5hbHlzaXMgYW5kIGNvbXBsaWFuY2UuXCIgfSldIH0pLCBfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIG1iLTRcIiwgY2hpbGRyZW46IFwiUmVwb3J0IFBlcmlvZFwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMVwiLCBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMlwiLCBjaGlsZHJlbjogXCJTdGFydCBEYXRlXCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogZGF0ZVJhbmdlLnN0YXJ0X2RhdGUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RGF0ZVJhbmdlKHsgLi4uZGF0ZVJhbmdlLCBzdGFydF9kYXRlOiBlLnRhcmdldC52YWx1ZSB9KSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xXCIsIGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0yXCIsIGNoaWxkcmVuOiBcIkVuZCBEYXRlXCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogZGF0ZVJhbmdlLmVuZF9kYXRlLCBvbkNoYW5nZTogKGUpID0+IHNldERhdGVSYW5nZSh7IC4uLmRhdGVSYW5nZSwgZW5kX2RhdGU6IGUudGFyZ2V0LnZhbHVlIH0pLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGdhcC0yIHNlbGYtZW5kXCIsIGNoaWxkcmVuOiBbX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RGF0ZVJhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0X2RhdGU6IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSwgMSkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kX2RhdGU6IG5vdy50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgY2xhc3NOYW1lOiBcInB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgaG92ZXI6YmctZ3JheS01MFwiLCBjaGlsZHJlbjogXCJUaGlzIE1vbnRoXCIgfSksIF9qc3goXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldERhdGVSYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydF9kYXRlOiBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSwgMCwgMSkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kX2RhdGU6IG5vdy50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgY2xhc3NOYW1lOiBcInB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgaG92ZXI6YmctZ3JheS01MFwiLCBjaGlsZHJlbjogXCJUaGlzIFllYXJcIiB9KV0gfSldIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02XCIsIGNoaWxkcmVuOiByZXBvcnRzLm1hcCgocmVwb3J0KSA9PiAoX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IGBwLTYgYm9yZGVyLTIgJHtyZXBvcnQuY29sb3J9IGhvdmVyOnNoYWRvdy1sZyB0cmFuc2l0aW9uLXNoYWRvd2AsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBtYi00XCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtMyByb3VuZGVkLWxnIGJnLXdoaXRlXCIsIGNoaWxkcmVuOiByZXBvcnQuaWNvbiB9KSB9KSwgX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTJcIiwgY2hpbGRyZW46IHJlcG9ydC50aXRsZSB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNjAwIG1iLTRcIiwgY2hpbGRyZW46IHJlcG9ydC5kZXNjcmlwdGlvbiB9KSwgX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBnZW5lcmF0ZVJlcG9ydChyZXBvcnQuaWQpLCBkaXNhYmxlZDogZ2VuZXJhdGluZywgY2xhc3NOYW1lOiBcInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBweC00IHB5LTIgYmctd2hpdGUgYm9yZGVyLTIgYm9yZGVyLWdyYXktMzAwIHRleHQtZ3JheS03MDAgcm91bmRlZC1sZyBob3ZlcjpiZy1ncmF5LTUwIGRpc2FibGVkOm9wYWNpdHktNTAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCIsIGNoaWxkcmVuOiBbX2pzeChEb3dubG9hZCwgeyBzaXplOiAxNiB9KSwgZ2VuZXJhdGluZyA/ICdHZW5lcmF0aW5nLi4uJyA6ICdHZW5lcmF0ZSBSZXBvcnQnXSB9KV0gfSwgcmVwb3J0LmlkKSkpIH0pLCBfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIG1iLTRcIiwgY2hpbGRyZW46IFwiUXVpY2sgU3RhdGlzdGljc1wiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy00IGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicC00IGJnLWJsdWUtNTAgcm91bmRlZC1sZ1wiLCBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ibHVlLTYwMCBmb250LW1lZGl1bSBtYi0xXCIsIGNoaWxkcmVuOiBcIlRvdGFsIEluY29tZVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ibHVlLTkwMFwiLCBjaGlsZHJlbjogZm9ybWF0Q3VycmVuY3koc3RhdGlzdGljcy50b3RhbF9pbmNvbWUpIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtYmx1ZS02MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJGb3Igc2VsZWN0ZWQgcGVyaW9kXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTQgYmctcmVkLTUwIHJvdW5kZWQtbGdcIiwgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBmb250LW1lZGl1bSBtYi0xXCIsIGNoaWxkcmVuOiBcIlRvdGFsIEV4cGVuc2VzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXJlZC05MDBcIiwgY2hpbGRyZW46IGZvcm1hdEN1cnJlbmN5KHN0YXRpc3RpY3MudG90YWxfZXhwZW5zZXMpIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBcIkZvciBzZWxlY3RlZCBwZXJpb2RcIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtNCBiZy1ncmVlbi01MCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBbX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyZWVuLTYwMCBmb250LW1lZGl1bSBtYi0xXCIsIGNoaWxkcmVuOiBcIk5ldCBQb3NpdGlvblwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogYHRleHQtMnhsIGZvbnQtYm9sZCAke3N0YXRpc3RpY3MubmV0X3Bvc2l0aW9uID49IDAgPyAndGV4dC1ncmVlbi05MDAnIDogJ3RleHQtcmVkLTkwMCd9YCwgY2hpbGRyZW46IGZvcm1hdEN1cnJlbmN5KHN0YXRpc3RpY3MubmV0X3Bvc2l0aW9uKSB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyB0ZXh0LWdyZWVuLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBcIkluY29tZSAtIEV4cGVuc2VzXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTQgYmctcHVycGxlLTUwIHJvdW5kZWQtbGdcIiwgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcHVycGxlLTYwMCBmb250LW1lZGl1bSBtYi0xXCIsIGNoaWxkcmVuOiBcIkZ1bmQgQmFsYW5jZVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1wdXJwbGUtOTAwXCIsIGNoaWxkcmVuOiBmb3JtYXRDdXJyZW5jeShzdGF0aXN0aWNzLmZ1bmRfYmFsYW5jZSkgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteHMgdGV4dC1wdXJwbGUtNjAwIG10LTFcIiwgY2hpbGRyZW46IFwiQWxsIGZ1bmRzIGNvbWJpbmVkXCIgfSldIH0pXSB9KV0gfSksIF9qc3hzKENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNiBiZy1ibHVlLTUwIGJvcmRlci1ibHVlLTIwMFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1ibHVlLTkwMCBtYi0yXCIsIGNoaWxkcmVuOiBcIlJlcG9ydCBJbmZvcm1hdGlvblwiIH0pLCBfanN4cyhcInVsXCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktMiB0ZXh0LXNtIHRleHQtYmx1ZS04MDBcIiwgY2hpbGRyZW46IFtfanN4cyhcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWJsdWUtNjAwXCIsIGNoaWxkcmVuOiBcIlxcdTIwMjJcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogXCJBbGwgcmVwb3J0cyBhcmUgZ2VuZXJhdGVkIGluIFBERiBmb3JtYXQgZm9yIGVhc3kgc2hhcmluZyBhbmQgcHJpbnRpbmcuXCIgfSldIH0pLCBfanN4cyhcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWJsdWUtNjAwXCIsIGNoaWxkcmVuOiBcIlxcdTIwMjJcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogXCJSZXBvcnRzIGluY2x1ZGUgZGV0YWlsZWQgdHJhbnNhY3Rpb24gbGlzdGluZ3MgYW5kIHN1bW1hcnkgc3RhdGlzdGljcy5cIiB9KV0gfSksIF9qc3hzKFwibGlcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtYmx1ZS02MDBcIiwgY2hpbGRyZW46IFwiXFx1MjAyMlwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBcIkRvbm9yIGdpdmluZyByZXBvcnRzIGFyZSBzdWl0YWJsZSBmb3IgdGF4IGRvY3VtZW50YXRpb24gcHVycG9zZXMuXCIgfSldIH0pLCBfanN4cyhcImxpXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWJsdWUtNjAwXCIsIGNoaWxkcmVuOiBcIlxcdTIwMjJcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogXCJBbGwgZmluYW5jaWFsIGRhdGEgaXMgYWNjdXJhdGUgYXMgb2YgdGhlIHJlcG9ydCBnZW5lcmF0aW9uIHRpbWUuXCIgfSldIH0pXSB9KV0gfSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBSZXBvcnRzO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMsIEZyYWdtZW50IGFzIF9GcmFnbWVudCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vbGliL2FwaSc7XG5pbXBvcnQgeyBDYXJkIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aS9jYXJkJztcbmltcG9ydCB7IFBsdXMsIEVkaXQsIFRyYXNoMiB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5jb25zdCBTZXR0aW5ncyA9ICgpID0+IHtcbiAgICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ29mZmVyaW5nX3R5cGVzJyk7XG4gICAgY29uc3QgW29mZmVyaW5nVHlwZXMsIHNldE9mZmVyaW5nVHlwZXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtleHBlbnNlQ2F0ZWdvcmllcywgc2V0RXhwZW5zZUNhdGVnb3JpZXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFt2ZW5kb3JzLCBzZXRWZW5kb3JzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbZnVuZHMsIHNldEZ1bmRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbc2hvd01vZGFsLCBzZXRTaG93TW9kYWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtlZGl0aW5nSXRlbSwgc2V0RWRpdGluZ0l0ZW1dID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7fSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hEYXRhKCk7XG4gICAgfSwgW2FjdGl2ZVRhYl0pO1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICBzd2l0Y2ggKGFjdGl2ZVRhYikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ29mZmVyaW5nX3R5cGVzJzpcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2ZmZXJpbmdUeXBlc1JlcyA9IGF3YWl0IGFwaS5nZXQoJy9vZmZlcmluZy10eXBlcycpO1xuICAgICAgICAgICAgICAgICAgICBzZXRPZmZlcmluZ1R5cGVzKG9mZmVyaW5nVHlwZXNSZXMuZGF0YS5kYXRhIHx8IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhwZW5zZV9jYXRlZ29yaWVzJzpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2F0ZWdvcmllc1JlcyA9IGF3YWl0IGFwaS5nZXQoJy9leHBlbnNlLWNhdGVnb3JpZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXhwZW5zZUNhdGVnb3JpZXMoY2F0ZWdvcmllc1Jlcy5kYXRhLmRhdGEgfHwgW10pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2ZW5kb3JzJzpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVuZG9yc1JlcyA9IGF3YWl0IGFwaS5nZXQoJy92ZW5kb3JzJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFZlbmRvcnModmVuZG9yc1Jlcy5kYXRhLmRhdGEgfHwgW10pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5kcyc6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZ1bmRzUmVzID0gYXdhaXQgYXBpLmdldCgnL2Z1bmRzJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldEZ1bmRzKGZ1bmRzUmVzLmRhdGEuZGF0YSB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZGF0YTonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQWRkID0gKCkgPT4ge1xuICAgICAgICBzZXRFZGl0aW5nSXRlbShudWxsKTtcbiAgICAgICAgc2V0Rm9ybURhdGEoZ2V0RW1wdHlGb3JtRGF0YSgpKTtcbiAgICAgICAgc2V0U2hvd01vZGFsKHRydWUpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlRWRpdCA9IChpdGVtKSA9PiB7XG4gICAgICAgIHNldEVkaXRpbmdJdGVtKGl0ZW0pO1xuICAgICAgICBzZXRGb3JtRGF0YShpdGVtKTtcbiAgICAgICAgc2V0U2hvd01vZGFsKHRydWUpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlRGVsZXRlID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgICAgIGlmICghY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/JykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBlbmRwb2ludCA9IGdldEVuZHBvaW50KCk7XG4gICAgICAgICAgICBhd2FpdCBhcGkuZGVsZXRlKGAke2VuZHBvaW50fS8ke2lkfWApO1xuICAgICAgICAgICAgZmV0Y2hEYXRhKCk7XG4gICAgICAgICAgICBhbGVydCgnSXRlbSBkZWxldGVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRlbGV0aW5nIGl0ZW06JywgZXJyb3IpO1xuICAgICAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBkZWxldGUgaXRlbS4gSXQgbWF5IGJlIGluIHVzZS4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZW5kcG9pbnQgPSBnZXRFbmRwb2ludCgpO1xuICAgICAgICAgICAgaWYgKGVkaXRpbmdJdGVtKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgYXBpLnB1dChgJHtlbmRwb2ludH0vJHtlZGl0aW5nSXRlbS5pZH1gLCBmb3JtRGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0l0ZW0gdXBkYXRlZCBzdWNjZXNzZnVsbHkhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBhcGkucG9zdChlbmRwb2ludCwgZm9ybURhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdJdGVtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0U2hvd01vZGFsKGZhbHNlKTtcbiAgICAgICAgICAgIGZldGNoRGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIGl0ZW06JywgZXJyb3IpO1xuICAgICAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byBzYXZlIGl0ZW0uIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdldEVuZHBvaW50ID0gKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGFjdGl2ZVRhYikge1xuICAgICAgICAgICAgY2FzZSAnb2ZmZXJpbmdfdHlwZXMnOiByZXR1cm4gJy9vZmZlcmluZy10eXBlcyc7XG4gICAgICAgICAgICBjYXNlICdleHBlbnNlX2NhdGVnb3JpZXMnOiByZXR1cm4gJy9leHBlbnNlLWNhdGVnb3JpZXMnO1xuICAgICAgICAgICAgY2FzZSAndmVuZG9ycyc6IHJldHVybiAnL3ZlbmRvcnMnO1xuICAgICAgICAgICAgY2FzZSAnZnVuZHMnOiByZXR1cm4gJy9mdW5kcyc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdldEVtcHR5Rm9ybURhdGEgPSAoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoYWN0aXZlVGFiKSB7XG4gICAgICAgICAgICBjYXNlICdvZmZlcmluZ190eXBlcyc6XG4gICAgICAgICAgICBjYXNlICdleHBlbnNlX2NhdGVnb3JpZXMnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6ICcnLCBkZXNjcmlwdGlvbjogJycsIGlzX2FjdGl2ZTogdHJ1ZSB9O1xuICAgICAgICAgICAgY2FzZSAndmVuZG9ycyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogJycsIGNvbnRhY3RfbmFtZTogJycsIGVtYWlsOiAnJywgcGhvbmU6ICcnLCBpc19hY3RpdmU6IHRydWUgfTtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmRzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4geyBuYW1lOiAnJywgdHlwZTogJ3VucmVzdHJpY3RlZCcsIGRlc2NyaXB0aW9uOiAnJywgaXNfYWN0aXZlOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHJlbmRlclRhYmxlID0gKCkgPT4ge1xuICAgICAgICBpZiAobG9hZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTEyIHRleHQtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtYmxvY2sgYW5pbWF0ZS1zcGluIHJvdW5kZWQtZnVsbCBoLTggdy04IGJvcmRlci1iLTIgYm9yZGVyLWJsdWUtNjAwXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTIgdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nLi4uXCIgfSldIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gYWN0aXZlVGFiID09PSAnb2ZmZXJpbmdfdHlwZXMnID8gb2ZmZXJpbmdUeXBlcyA6XG4gICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdleHBlbnNlX2NhdGVnb3JpZXMnID8gZXhwZW5zZUNhdGVnb3JpZXMgOlxuICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3ZlbmRvcnMnID8gdmVuZG9ycyA6IGZ1bmRzO1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTEyIHRleHQtY2VudGVyIHRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IF9qc3goXCJwXCIsIHsgY2hpbGRyZW46IFwiTm8gaXRlbXMgZm91bmQuIENsaWNrIFxcXCJBZGQgTmV3XFxcIiB0byBjcmVhdGUgb25lLlwiIH0pIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwib3ZlcmZsb3cteC1hdXRvXCIsIGNoaWxkcmVuOiBfanN4cyhcInRhYmxlXCIsIHsgY2xhc3NOYW1lOiBcInctZnVsbFwiLCBjaGlsZHJlbjogW19qc3goXCJ0aGVhZFwiLCB7IGNsYXNzTmFtZTogXCJiZy1ncmF5LTUwIGJvcmRlci1iIGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogX2pzeHMoXCJ0clwiLCB7IGNoaWxkcmVuOiBbX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJOYW1lXCIgfSksIGFjdGl2ZVRhYiA9PT0gJ3ZlbmRvcnMnICYmIChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCIsIGNoaWxkcmVuOiBcIkNvbnRhY3RcIiB9KSwgX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJFbWFpbFwiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCIsIGNoaWxkcmVuOiBcIlBob25lXCIgfSldIH0pKSwgYWN0aXZlVGFiID09PSAnZnVuZHMnICYmIChfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCIsIGNoaWxkcmVuOiBcIlR5cGVcIiB9KSksIChhY3RpdmVUYWIgPT09ICdvZmZlcmluZ190eXBlcycgfHwgYWN0aXZlVGFiID09PSAnZXhwZW5zZV9jYXRlZ29yaWVzJyB8fCBhY3RpdmVUYWIgPT09ICdmdW5kcycpICYmIChfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCIsIGNoaWxkcmVuOiBcIkRlc2NyaXB0aW9uXCIgfSkpLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCIsIGNoaWxkcmVuOiBcIlN0YXR1c1wiIH0pLCBfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zIHRleHQtcmlnaHQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJBY3Rpb25zXCIgfSldIH0pIH0pLCBfanN4KFwidGJvZHlcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgZGl2aWRlLXkgZGl2aWRlLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBkYXRhLm1hcCgoaXRlbSkgPT4gKF9qc3hzKFwidHJcIiwgeyBjbGFzc05hbWU6IFwiaG92ZXI6YmctZ3JheS01MFwiLCBjaGlsZHJlbjogW19qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBpdGVtLm5hbWUgfSksIGFjdGl2ZVRhYiA9PT0gJ3ZlbmRvcnMnICYmIChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogaXRlbS5jb250YWN0X25hbWUgfHwgJy0nIH0pLCBfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogaXRlbS5lbWFpbCB8fCAnLScgfSksIF9qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBpdGVtLnBob25lIHx8ICctJyB9KV0gfSkpLCBhY3RpdmVUYWIgPT09ICdmdW5kcycgJiYgKF9qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSB0ZXh0LWdyYXktOTAwIGNhcGl0YWxpemVcIiwgY2hpbGRyZW46IGl0ZW0udHlwZSB9KSksIChhY3RpdmVUYWIgPT09ICdvZmZlcmluZ190eXBlcycgfHwgYWN0aXZlVGFiID09PSAnZXhwZW5zZV9jYXRlZ29yaWVzJyB8fCBhY3RpdmVUYWIgPT09ICdmdW5kcycpICYmIChfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHRleHQtc20gdGV4dC1ncmF5LTkwMCBtYXgtdy14cyB0cnVuY2F0ZVwiLCBjaGlsZHJlbjogaXRlbS5kZXNjcmlwdGlvbiB8fCAnLScgfSkpLCBfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc21cIiwgY2hpbGRyZW46IF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBgcHgtMiBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LXhzIGZvbnQtbWVkaXVtICR7aXRlbS5pc19hY3RpdmUgPyAnYmctZ3JlZW4tMTAwIHRleHQtZ3JlZW4tODAwJyA6ICdiZy1ncmF5LTEwMCB0ZXh0LWdyYXktODAwJ31gLCBjaGlsZHJlbjogaXRlbS5pc19hY3RpdmUgPyAnQWN0aXZlJyA6ICdJbmFjdGl2ZScgfSkgfSksIF9qc3hzKFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtcmlnaHQgdGV4dC1zbSBmb250LW1lZGl1bVwiLCBjaGlsZHJlbjogW19qc3goXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBoYW5kbGVFZGl0KGl0ZW0pLCBjbGFzc05hbWU6IFwidGV4dC1ibHVlLTYwMCBob3Zlcjp0ZXh0LWJsdWUtOTAwIG1yLTNcIiwgY2hpbGRyZW46IF9qc3goRWRpdCwgeyBzaXplOiAxNiwgY2xhc3NOYW1lOiBcImlubGluZVwiIH0pIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gaGFuZGxlRGVsZXRlKGl0ZW0uaWQpLCBjbGFzc05hbWU6IFwidGV4dC1yZWQtNjAwIGhvdmVyOnRleHQtcmVkLTkwMFwiLCBjaGlsZHJlbjogX2pzeChUcmFzaDIsIHsgc2l6ZTogMTYsIGNsYXNzTmFtZTogXCJpbmxpbmVcIiB9KSB9KV0gfSldIH0sIGl0ZW0uaWQpKSkgfSldIH0pIH0pKTtcbiAgICB9O1xuICAgIGNvbnN0IHJlbmRlckZvcm0gPSAoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoYWN0aXZlVGFiKSB7XG4gICAgICAgICAgICBjYXNlICdvZmZlcmluZ190eXBlcyc6XG4gICAgICAgICAgICBjYXNlICdleHBlbnNlX2NhdGVnb3JpZXMnOlxuICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIk5hbWUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGZvcm1EYXRhLm5hbWUgfHwgJycsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgbmFtZTogZS50YXJnZXQudmFsdWUgfSksIHJlcXVpcmVkOiB0cnVlLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIkRlc2NyaXB0aW9uXCIgfSksIF9qc3goXCJ0ZXh0YXJlYVwiLCB7IHZhbHVlOiBmb3JtRGF0YS5kZXNjcmlwdGlvbiB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBkZXNjcmlwdGlvbjogZS50YXJnZXQudmFsdWUgfSksIHJvd3M6IDMsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjaGlsZHJlbjogX2pzeHMoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgY2hlY2tlZDogZm9ybURhdGEuaXNfYWN0aXZlIHx8IGZhbHNlLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIGlzX2FjdGl2ZTogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1ibHVlLTYwMCBmb2N1czpyaW5nLWJsdWUtNTAwIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkXCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcIm1sLTIgdGV4dC1zbSB0ZXh0LWdyYXktNzAwXCIsIGNoaWxkcmVuOiBcIkFjdGl2ZVwiIH0pXSB9KSB9KV0gfSkpO1xuICAgICAgICAgICAgY2FzZSAndmVuZG9ycyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiVmVuZG9yIE5hbWUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGZvcm1EYXRhLm5hbWUgfHwgJycsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgbmFtZTogZS50YXJnZXQudmFsdWUgfSksIHJlcXVpcmVkOiB0cnVlLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIkNvbnRhY3QgTmFtZVwiIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGZvcm1EYXRhLmNvbnRhY3RfbmFtZSB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBjb250YWN0X25hbWU6IGUudGFyZ2V0LnZhbHVlIH0pLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIkVtYWlsXCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiZW1haWxcIiwgdmFsdWU6IGZvcm1EYXRhLmVtYWlsIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIGVtYWlsOiBlLnRhcmdldC52YWx1ZSB9KSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJQaG9uZVwiIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcInRlbFwiLCB2YWx1ZTogZm9ybURhdGEucGhvbmUgfHwgJycsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgcGhvbmU6IGUudGFyZ2V0LnZhbHVlIH0pLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2hpbGRyZW46IF9qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNoZWNrZWQ6IGZvcm1EYXRhLmlzX2FjdGl2ZSB8fCBmYWxzZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBpc19hY3RpdmU6IGUudGFyZ2V0LmNoZWNrZWQgfSksIGNsYXNzTmFtZTogXCJoLTQgdy00IHRleHQtYmx1ZS02MDAgZm9jdXM6cmluZy1ibHVlLTUwMCBib3JkZXItZ3JheS0zMDAgcm91bmRlZFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJtbC0yIHRleHQtc20gdGV4dC1ncmF5LTcwMFwiLCBjaGlsZHJlbjogXCJBY3RpdmVcIiB9KV0gfSkgfSldIH0pKTtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmRzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3hzKF9GcmFnbWVudCwgeyBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJGdW5kIE5hbWUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGZvcm1EYXRhLm5hbWUgfHwgJycsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgbmFtZTogZS50YXJnZXQudmFsdWUgfSksIHJlcXVpcmVkOiB0cnVlLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiVHlwZSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgdmFsdWU6IGZvcm1EYXRhLnR5cGUgfHwgJ3VucmVzdHJpY3RlZCcsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgdHlwZTogZS50YXJnZXQudmFsdWUgfSksIHJlcXVpcmVkOiB0cnVlLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIsIGNoaWxkcmVuOiBbX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcInVucmVzdHJpY3RlZFwiLCBjaGlsZHJlbjogXCJVbnJlc3RyaWN0ZWRcIiB9KSwgX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcInJlc3RyaWN0ZWRcIiwgY2hpbGRyZW46IFwiUmVzdHJpY3RlZFwiIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiRGVzY3JpcHRpb25cIiB9KSwgX2pzeChcInRleHRhcmVhXCIsIHsgdmFsdWU6IGZvcm1EYXRhLmRlc2NyaXB0aW9uIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIGRlc2NyaXB0aW9uOiBlLnRhcmdldC52YWx1ZSB9KSwgcm93czogMywgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNoaWxkcmVuOiBfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBjaGVja2VkOiBmb3JtRGF0YS5pc19hY3RpdmUgfHwgZmFsc2UsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgaXNfYWN0aXZlOiBlLnRhcmdldC5jaGVja2VkIH0pLCBjbGFzc05hbWU6IFwiaC00IHctNCB0ZXh0LWJsdWUtNjAwIGZvY3VzOnJpbmctYmx1ZS01MDAgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwibWwtMiB0ZXh0LXNtIHRleHQtZ3JheS03MDBcIiwgY2hpbGRyZW46IFwiQWN0aXZlXCIgfSldIH0pIH0pXSB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdldFRhYlRpdGxlID0gKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGFjdGl2ZVRhYikge1xuICAgICAgICAgICAgY2FzZSAnb2ZmZXJpbmdfdHlwZXMnOiByZXR1cm4gJ09mZmVyaW5nIFR5cGVzJztcbiAgICAgICAgICAgIGNhc2UgJ2V4cGVuc2VfY2F0ZWdvcmllcyc6IHJldHVybiAnRXhwZW5zZSBDYXRlZ29yaWVzJztcbiAgICAgICAgICAgIGNhc2UgJ3ZlbmRvcnMnOiByZXR1cm4gJ1ZlbmRvcnMnO1xuICAgICAgICAgICAgY2FzZSAnZnVuZHMnOiByZXR1cm4gJ0Z1bmRzJztcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiRmluYW5jZSBTZXR0aW5nc1wiIH0pLCBfanN4cyhcImJ1dHRvblwiLCB7IG9uQ2xpY2s6IGhhbmRsZUFkZCwgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMiBiZy1ibHVlLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgaG92ZXI6YmctYmx1ZS03MDBcIiwgY2hpbGRyZW46IFtfanN4KFBsdXMsIHsgc2l6ZTogMjAgfSksIFwiQWRkIE5ld1wiXSB9KV0gfSksIF9qc3goQ2FyZCwgeyBjbGFzc05hbWU6IFwicC00XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGdhcC0yIG92ZXJmbG93LXgtYXV0b1wiLCBjaGlsZHJlbjogW19qc3goXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRBY3RpdmVUYWIoJ29mZmVyaW5nX3R5cGVzJyksIGNsYXNzTmFtZTogYHB4LTQgcHktMiByb3VuZGVkLWxnIHdoaXRlc3BhY2Utbm93cmFwICR7YWN0aXZlVGFiID09PSAnb2ZmZXJpbmdfdHlwZXMnID8gJ2JnLWJsdWUtNjAwIHRleHQtd2hpdGUnIDogJ2JnLWdyYXktMTAwIHRleHQtZ3JheS03MDAgaG92ZXI6YmctZ3JheS0yMDAnfWAsIGNoaWxkcmVuOiBcIk9mZmVyaW5nIFR5cGVzXCIgfSksIF9qc3goXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRBY3RpdmVUYWIoJ2V4cGVuc2VfY2F0ZWdvcmllcycpLCBjbGFzc05hbWU6IGBweC00IHB5LTIgcm91bmRlZC1sZyB3aGl0ZXNwYWNlLW5vd3JhcCAke2FjdGl2ZVRhYiA9PT0gJ2V4cGVuc2VfY2F0ZWdvcmllcycgPyAnYmctYmx1ZS02MDAgdGV4dC13aGl0ZScgOiAnYmctZ3JheS0xMDAgdGV4dC1ncmF5LTcwMCBob3ZlcjpiZy1ncmF5LTIwMCd9YCwgY2hpbGRyZW46IFwiRXhwZW5zZSBDYXRlZ29yaWVzXCIgfSksIF9qc3goXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRBY3RpdmVUYWIoJ3ZlbmRvcnMnKSwgY2xhc3NOYW1lOiBgcHgtNCBweS0yIHJvdW5kZWQtbGcgd2hpdGVzcGFjZS1ub3dyYXAgJHthY3RpdmVUYWIgPT09ICd2ZW5kb3JzJyA/ICdiZy1ibHVlLTYwMCB0ZXh0LXdoaXRlJyA6ICdiZy1ncmF5LTEwMCB0ZXh0LWdyYXktNzAwIGhvdmVyOmJnLWdyYXktMjAwJ31gLCBjaGlsZHJlbjogXCJWZW5kb3JzXCIgfSksIF9qc3goXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRBY3RpdmVUYWIoJ2Z1bmRzJyksIGNsYXNzTmFtZTogYHB4LTQgcHktMiByb3VuZGVkLWxnIHdoaXRlc3BhY2Utbm93cmFwICR7YWN0aXZlVGFiID09PSAnZnVuZHMnID8gJ2JnLWJsdWUtNjAwIHRleHQtd2hpdGUnIDogJ2JnLWdyYXktMTAwIHRleHQtZ3JheS03MDAgaG92ZXI6YmctZ3JheS0yMDAnfWAsIGNoaWxkcmVuOiBcIkZ1bmRzXCIgfSldIH0pIH0pLCBfanN4KENhcmQsIHsgY2hpbGRyZW46IHJlbmRlclRhYmxlKCkgfSksIHNob3dNb2RhbCAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrIGJnLW9wYWNpdHktNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgei01MFwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgcm91bmRlZC1sZyBwLTYgdy1mdWxsIG1heC13LTJ4bCBtYXgtaC1bOTB2aF0gb3ZlcmZsb3cteS1hdXRvXCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgZm9udC1ib2xkIG1iLTRcIiwgY2hpbGRyZW46IGVkaXRpbmdJdGVtID8gYEVkaXQgJHtnZXRUYWJUaXRsZSgpfWAgOiBgQWRkICR7Z2V0VGFiVGl0bGUoKX1gIH0pLCBfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiByZW5kZXJGb3JtKCkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1lbmQgZ2FwLTMgbXQtNlwiLCBjaGlsZHJlbjogW19qc3goXCJidXR0b25cIiwgeyB0eXBlOiBcImJ1dHRvblwiLCBvbkNsaWNrOiAoKSA9PiBzZXRTaG93TW9kYWwoZmFsc2UpLCBjbGFzc05hbWU6IFwicHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1ncmF5LTUwXCIsIGNoaWxkcmVuOiBcIkNhbmNlbFwiIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJzdWJtaXRcIiwgY2xhc3NOYW1lOiBcInB4LTQgcHktMiBiZy1ibHVlLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgaG92ZXI6YmctYmx1ZS03MDBcIiwgY2hpbGRyZW46IGVkaXRpbmdJdGVtID8gJ1VwZGF0ZScgOiAnQ3JlYXRlJyB9KV0gfSldIH0pXSB9KSB9KSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTZXR0aW5ncztcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicmVjdFwiLCB7IHdpZHRoOiBcIjIwXCIsIGhlaWdodDogXCI1XCIsIHg6IFwiMlwiLCB5OiBcIjNcIiwgcng6IFwiMVwiLCBrZXk6IFwiMXdwMXUxXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk00IDh2MTFhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjhcIiwga2V5OiBcIjFzODBqcFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTAgMTJoNFwiLCBrZXk6IFwiYTU2YjBwXCIgfV1cbl07XG5jb25zdCBBcmNoaXZlID0gY3JlYXRlTHVjaWRlSWNvbihcImFyY2hpdmVcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIEFyY2hpdmUgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJjaGl2ZS5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTMgM3YxNmEyIDIgMCAwIDAgMiAyaDE2XCIsIGtleTogXCJjMjRpNDhcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE4IDE3VjlcIiwga2V5OiBcIjJiejYwblwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTMgMTdWNVwiLCBrZXk6IFwiMWZyZHQ4XCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk04IDE3di0zXCIsIGtleTogXCIxN3NrYTBcIiB9XVxuXTtcbmNvbnN0IENoYXJ0Q29sdW1uID0gY3JlYXRlTHVjaWRlSWNvbihcImNoYXJ0LWNvbHVtblwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQ2hhcnRDb2x1bW4gYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2hhcnQtY29sdW1uLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMjEgMTJjLjU1MiAwIDEuMDA1LS40NDkuOTUtLjk5OGExMCAxMCAwIDAgMC04Ljk1My04Ljk1MWMtLjU1LS4wNTUtLjk5OC4zOTgtLjk5OC45NXY4YTEgMSAwIDAgMCAxIDF6XCIsXG4gICAgICBrZXk6IFwicHptam51XCJcbiAgICB9XG4gIF0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0yMS4yMSAxNS44OUExMCAxMCAwIDEgMSA4IDIuODNcIiwga2V5OiBcImsyZnBha1wiIH1dXG5dO1xuY29uc3QgQ2hhcnRQaWUgPSBjcmVhdGVMdWNpZGVJY29uKFwiY2hhcnQtcGllXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBDaGFydFBpZSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jaGFydC1waWUuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEyXCIsIHI6IFwiMTBcIiwga2V5OiBcIjFtZ2xheVwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJtMTUgOS02IDZcIiwga2V5OiBcIjF1emh2clwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJtOSA5IDYgNlwiLCBrZXk6IFwiejBiaXFmXCIgfV1cbl07XG5jb25zdCBDaXJjbGVYID0gY3JlYXRlTHVjaWRlSWNvbihcImNpcmNsZS14XCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBDaXJjbGVYIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNpcmNsZS14LmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgNnY2bDQgMlwiLCBrZXk6IFwibW1rN3lnXCIgfV0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEyXCIsIHI6IFwiMTBcIiwga2V5OiBcIjFtZ2xheVwiIH1dXG5dO1xuY29uc3QgQ2xvY2sgPSBjcmVhdGVMdWNpZGVJY29uKFwiY2xvY2tcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIENsb2NrIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsb2NrLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgMTVWM1wiLCBrZXk6IFwibTlnMXgxXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00XCIsIGtleTogXCJpaDduM2hcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTcgMTAgNSA1IDUtNVwiLCBrZXk6IFwiYnJzbjcwXCIgfV1cbl07XG5jb25zdCBEb3dubG9hZCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJkb3dubG9hZFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgRG93bmxvYWQgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG93bmxvYWQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk01IDEyaDE0XCIsIGtleTogXCIxYXlzMGhcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDV2MTRcIiwga2V5OiBcInM2OTlsZVwiIH1dXG5dO1xuY29uc3QgUGx1cyA9IGNyZWF0ZUx1Y2lkZUljb24oXCJwbHVzXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBQbHVzIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsdXMuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIm0yMSAyMS00LjM0LTQuMzRcIiwga2V5OiBcIjE0ajdyalwiIH1dLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMVwiLCBjeTogXCIxMVwiLCByOiBcIjhcIiwga2V5OiBcIjRlajk3dVwiIH1dXG5dO1xuY29uc3QgU2VhcmNoID0gY3JlYXRlTHVjaWRlSWNvbihcInNlYXJjaFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgU2VhcmNoIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlYXJjaC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDNINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTRhMiAyIDAgMCAwIDItMnYtN1wiLCBrZXk6IFwiMW0wdjZnXCIgfV0sXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xOC4zNzUgMi42MjVhMSAxIDAgMCAxIDMgM2wtOS4wMTMgOS4wMTRhMiAyIDAgMCAxLS44NTMuNTA1bC0yLjg3My44NGEuNS41IDAgMCAxLS42Mi0uNjJsLjg0LTIuODczYTIgMiAwIDAgMSAuNTA2LS44NTJ6XCIsXG4gICAgICBrZXk6IFwib2hyYmcyXCJcbiAgICB9XG4gIF1cbl07XG5jb25zdCBTcXVhcmVQZW4gPSBjcmVhdGVMdWNpZGVJY29uKFwic3F1YXJlLXBlblwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgU3F1YXJlUGVuIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNxdWFyZS1wZW4uanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMCAxMXY2XCIsIGtleTogXCJuY28wb21cIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE0IDExdjZcIiwga2V5OiBcIm91dHYxdVwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2XCIsIGtleTogXCJtaXl0cmNcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTMgNmgxOFwiLCBrZXk6IFwiZDB3bTBqXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk04IDZWNGEyIDIgMCAwIDEgMi0yaDRhMiAyIDAgMCAxIDIgMnYyXCIsIGtleTogXCJlNzkxamlcIiB9XVxuXTtcbmNvbnN0IFRyYXNoMiA9IGNyZWF0ZUx1Y2lkZUljb24oXCJ0cmFzaC0yXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBUcmFzaDIgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJhc2gtMi5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE2IDE3aDZ2LTZcIiwga2V5OiBcInQ2bjJpdFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJtMjIgMTctOC41LTguNS01IDVMMiA3XCIsIGtleTogXCJ4NDczcFwiIH1dXG5dO1xuY29uc3QgVHJlbmRpbmdEb3duID0gY3JlYXRlTHVjaWRlSWNvbihcInRyZW5kaW5nLWRvd25cIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFRyZW5kaW5nRG93biBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmVuZGluZy1kb3duLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTYgN2g2djZcIiwga2V5OiBcImJveDU1bFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJtMjIgNy04LjUgOC41LTUtNUwyIDE3XCIsIGtleTogXCIxdDFtNzlcIiB9XVxuXTtcbmNvbnN0IFRyZW5kaW5nVXAgPSBjcmVhdGVMdWNpZGVJY29uKFwidHJlbmRpbmctdXBcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFRyZW5kaW5nVXAgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJlbmRpbmctdXAuanMubWFwXG4iXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibmV4dCIsInB1c2giLCJpc0FycmF5IiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiYXBpIiwiQ2FyZCIsIk9mZmVyaW5ncyIsIkV4cGVuc2VzIiwiQnVkZ2V0cyIsIlJlcG9ydHMiLCJTZXR0aW5ncyIsIkZpbmFuY2UiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiYWN0aXZlVGFiIiwic2V0QWN0aXZlVGFiIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJzdW1tYXJ5Iiwic2V0U3VtbWFyeSIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2IiwibG9hZGluZyIsInNldExvYWRpbmciLCJfdXNlU3RhdGU3Iiwic3RhcnRfZGF0ZSIsIkRhdGUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwidG9JU09TdHJpbmciLCJzcGxpdCIsImVuZF9kYXRlIiwiX3VzZVN0YXRlOCIsImRhdGVSYW5nZSIsInNldERhdGVSYW5nZSIsImZldGNoU3VtbWFyeSIsIl9yZWYiLCJfY2FsbGVlIiwicmVzcG9uc2UiLCJfdCIsIl9jb250ZXh0IiwiZ2V0IiwicGFyYW1zIiwiZGF0YSIsImNvbnNvbGUiLCJlcnJvciIsImZvcm1hdEN1cnJlbmN5IiwiYW1vdW50IiwiSW50bCIsIk51bWJlckZvcm1hdCIsInN0eWxlIiwiY3VycmVuY3kiLCJmb3JtYXQiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsInR5cGUiLCJvbkNoYW5nZSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJtYXAiLCJ0YWIiLCJvbkNsaWNrIiwiY29uY2F0IiwidG90YWxfZ2l2aW5nIiwidG90YWxfdHJhbnNhY3Rpb25zIiwiYXZlcmFnZV90cmFuc2FjdGlvbiIsInVuaXF1ZV9naXZlcnMiLCJlbnRyaWVzIiwiYnlfcGF5bWVudF9tZXRob2QiLCJfcmVmMiIsIl9yZWYzIiwibWV0aG9kIiwidG90YWwiLCJjb3VudCIsIkZyYWdtZW50IiwiX0ZyYWdtZW50IiwiUGx1cyIsIlRyZW5kaW5nVXAiLCJUcmVuZGluZ0Rvd24iLCJBbGVydENpcmNsZSIsImJ1ZGdldHMiLCJzZXRCdWRnZXRzIiwic2VsZWN0ZWRCdWRnZXQiLCJzZXRTZWxlY3RlZEJ1ZGdldCIsImJ1ZGdldEl0ZW1zIiwic2V0QnVkZ2V0SXRlbXMiLCJjYXRlZ29yaWVzIiwic2V0Q2F0ZWdvcmllcyIsIl91c2VTdGF0ZTkiLCJfdXNlU3RhdGUwIiwiX3VzZVN0YXRlMSIsIl91c2VTdGF0ZTEwIiwic2hvd0FkZE1vZGFsIiwic2V0U2hvd0FkZE1vZGFsIiwiX3VzZVN0YXRlMTEiLCJfdXNlU3RhdGUxMiIsInN1Ym1pdHRpbmciLCJzZXRTdWJtaXR0aW5nIiwiX3VzZVN0YXRlMTMiLCJpdGVtcyIsIl91c2VTdGF0ZTE0IiwiZm9ybURhdGEiLCJzZXRGb3JtRGF0YSIsImZldGNoQnVkZ2V0cyIsImZldGNoQ2F0ZWdvcmllcyIsImZldGNoQnVkZ2V0SXRlbXMiLCJpZCIsImJ1ZGdldExpc3QiLCJfY2FsbGVlMiIsImJ1ZGdldElkIiwiX3QyIiwiX2NvbnRleHQyIiwiX3giLCJfY2FsbGVlMyIsIl90MyIsIl9jb250ZXh0MyIsImhhbmRsZVN1Ym1pdCIsIl9yZWY0IiwiX2NhbGxlZTQiLCJfdDQiLCJfY29udGV4dDQiLCJwcmV2ZW50RGVmYXVsdCIsInBvc3QiLCJpdGVtIiwiZXhwZW5zZV9jYXRlZ29yeV9pZCIsInBhcnNlSW50IiwiYnVkZ2V0ZWRfYW1vdW50IiwicGFyc2VGbG9hdCIsImFsZXJ0IiwiX3gyIiwiYWRkQnVkZ2V0SXRlbSIsIl90b0NvbnN1bWFibGVBcnJheSIsInJlbW92ZUJ1ZGdldEl0ZW0iLCJpbmRleCIsImZpbHRlciIsIl8iLCJ1cGRhdGVCdWRnZXRJdGVtIiwiZmllbGQiLCJuZXdJdGVtcyIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldFZhcmlhbmNlQ29sb3IiLCJ2YXJpYW5jZSIsImdldFZhcmlhbmNlSWNvbiIsInNpemUiLCJ0b3RhbEJ1ZGdldGVkIiwicmVkdWNlIiwic3VtIiwidG90YWxBY3R1YWwiLCJhY3R1YWxfYW1vdW50IiwidG90YWxWYXJpYW5jZSIsInV0aWxpemF0aW9uUGVyY2VudGFnZSIsImJ1ZGdldCIsImZpbmQiLCJiIiwicGVyaW9kX3R5cGUiLCJpc19hY3RpdmUiLCJNYXRoIiwiYWJzIiwidG9GaXhlZCIsIndpZHRoIiwibWluIiwiaXNPdmVyQnVkZ2V0IiwidXRpbGl6YXRpb25QY3QiLCJjYXRlZ29yeV9uYW1lIiwib25TdWJtaXQiLCJyZXF1aXJlZCIsInBsYWNlaG9sZGVyIiwiY2F0Iiwic3RlcCIsImRpc2FibGVkIiwiQXJjaGl2ZSIsIlNlYXJjaCIsIkNoZWNrQ2lyY2xlIiwiWENpcmNsZSIsIkNsb2NrIiwiZXhwZW5zZXMiLCJzZXRFeHBlbnNlcyIsInZlbmRvcnMiLCJzZXRWZW5kb3JzIiwiZnVuZHMiLCJzZXRGdW5kcyIsInNlYXJjaCIsImNhdGVnb3J5X2lkIiwic3RhdHVzIiwiZmlsdGVycyIsInNldEZpbHRlcnMiLCJfdXNlU3RhdGUxNSIsInZlbmRvcl9pZCIsImZ1bmRfaWQiLCJleHBlbnNlX2RhdGUiLCJkZXNjcmlwdGlvbiIsInBheW1lbnRfbWV0aG9kIiwicmVmZXJlbmNlX251bWJlciIsIl91c2VTdGF0ZTE2IiwiZmV0Y2hFeHBlbnNlcyIsImZldGNoVmVuZG9ycyIsImZldGNoRnVuZHMiLCJfcmVmNSIsIl9jYWxsZWU1IiwiX3Q1IiwiX2NvbnRleHQ1IiwiZm9ybWF0RGF0ZSIsImRhdGVTdHJpbmciLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJnZXRTdGF0dXNCYWRnZSIsInN0eWxlcyIsInBlbmRpbmciLCJhcHByb3ZlZCIsInJlamVjdGVkIiwiaWNvbnMiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsImV4cGVuc2UiLCJ2ZW5kb3JfbmFtZSIsInZlbmRvciIsImZ1bmQiLCJtYXgiLCJyb3dzIiwib2ZmZXJpbmdzIiwic2V0T2ZmZXJpbmdzIiwib2ZmZXJpbmdUeXBlcyIsInNldE9mZmVyaW5nVHlwZXMiLCJtZW1iZXJzIiwic2V0TWVtYmVycyIsIm9mZmVyaW5nX3R5cGVfaWQiLCJtZW1iZXJfaWQiLCJvZmZlcmluZ19kYXRlIiwibm90ZXMiLCJpc19hbm9ueW1vdXMiLCJmZXRjaE9mZmVyaW5ncyIsImZldGNoT2ZmZXJpbmdUeXBlcyIsImZldGNoTWVtYmVycyIsIm9mZmVyaW5nIiwibWVtYmVyX25hbWUiLCJvZmZlcmluZ190eXBlX25hbWUiLCJyZXBsYWNlIiwiTnVtYmVyIiwiY2hlY2tlZCIsIm1lbWJlciIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJSZWFjdCIsIkRvd25sb2FkIiwiRmlsZVRleHQiLCJQaWVDaGFydCIsIkJhckNoYXJ0MyIsIkNhbGVuZGFyIiwiZ2VuZXJhdGluZyIsInNldEdlbmVyYXRpbmciLCJ0b3RhbF9pbmNvbWUiLCJ0b3RhbF9leHBlbnNlcyIsIm5ldF9wb3NpdGlvbiIsImZ1bmRfYmFsYW5jZSIsInN0YXRpc3RpY3MiLCJzZXRTdGF0aXN0aWNzIiwiZmV0Y2hTdGF0aXN0aWNzIiwic3VjY2VzcyIsImdlbmVyYXRlUmVwb3J0IiwicmVwb3J0VHlwZSIsInVybCIsImxpbmsiLCJyZXNwb25zZVR5cGUiLCJ3aW5kb3ciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsIm5vdyIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicmVtb3ZlIiwicmVwb3J0cyIsInRpdGxlIiwiaWNvbiIsImNvbG9yIiwicmVwb3J0IiwiRWRpdCIsIlRyYXNoMiIsImV4cGVuc2VDYXRlZ29yaWVzIiwic2V0RXhwZW5zZUNhdGVnb3JpZXMiLCJzaG93TW9kYWwiLCJzZXRTaG93TW9kYWwiLCJlZGl0aW5nSXRlbSIsInNldEVkaXRpbmdJdGVtIiwiZmV0Y2hEYXRhIiwib2ZmZXJpbmdUeXBlc1JlcyIsImNhdGVnb3JpZXNSZXMiLCJ2ZW5kb3JzUmVzIiwiZnVuZHNSZXMiLCJoYW5kbGVBZGQiLCJnZXRFbXB0eUZvcm1EYXRhIiwiaGFuZGxlRWRpdCIsImhhbmRsZURlbGV0ZSIsImVuZHBvaW50IiwiY29uZmlybSIsImdldEVuZHBvaW50IiwicHV0IiwiY29udGFjdF9uYW1lIiwiZW1haWwiLCJwaG9uZSIsInJlbmRlclRhYmxlIiwicmVuZGVyRm9ybSIsImdldFRhYlRpdGxlIl0sInNvdXJjZVJvb3QiOiIifQ==