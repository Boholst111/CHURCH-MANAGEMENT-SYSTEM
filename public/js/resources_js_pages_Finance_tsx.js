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
        children: ['overview', 'offerings', 'expenses', 'budgets', 'reports'].map(function (tab) {
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
    }), activeTab !== 'overview' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-xl font-semibold mb-4 capitalize",
        children: activeTab
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
          className: "text-gray-600",
          children: [activeTab === 'offerings' && 'Detailed offerings management interface. Track tithes, special offerings, missions, building fund, and other contributions.', activeTab === 'expenses' && 'Comprehensive expense tracking system. Record and categorize all church expenses including utilities, salaries, maintenance, and missions.', activeTab === 'budgets' && 'Budget planning and monitoring tools. Create budgets for different categories and track spending against allocations.', activeTab === 'reports' && 'Financial reporting and analytics. Generate detailed financial statements, donor reports, and tax documents.']
        }), activeTab === 'offerings' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "bg-blue-50 border border-blue-200 rounded-lg p-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "font-semibold text-blue-900 mb-2",
            children: "Available Features:"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
            className: "list-disc list-inside text-blue-800 space-y-1",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
              children: "Record tithes and offerings"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
              children: "Track different offering types"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
              children: "Filter by date, member, and payment method"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
              children: "View giving history"
            })]
          })]
        }), activeTab === 'expenses' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "bg-amber-50 border border-amber-200 rounded-lg p-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "font-semibold text-amber-900 mb-2",
            children: "Coming Soon:"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
            className: "list-disc list-inside text-amber-800 space-y-1",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
              children: "Expense recording and categorization"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
              children: "Vendor management"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
              children: "Receipt attachment"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
              children: "Expense approval workflow"
            })]
          })]
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Finance);

/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0ZpbmFuY2VfdHN4LmpzP2lkPWQwZjc1YTMwZTViYjFlN2IiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNBLHVLQUFBQSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBRSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBSSxDQUFBLE1BQUFDLENBQUEsR0FBQVgsQ0FBQSxRQUFBWSxDQUFBLE9BQUFDLENBQUEsS0FBQUYsQ0FBQSxLQUFBYixDQUFBLEtBQUFnQixDQUFBLEVBQUFwQixDQUFBLEVBQUFxQixDQUFBLEVBQUFDLENBQUEsRUFBQU4sQ0FBQSxFQUFBTSxDQUFBLENBQUFDLElBQUEsQ0FBQXZCLENBQUEsTUFBQXNCLENBQUEsV0FBQUEsRUFBQXJCLENBQUEsRUFBQUMsQ0FBQSxXQUFBTSxDQUFBLEdBQUFQLENBQUEsRUFBQVEsQ0FBQSxNQUFBRyxDQUFBLEdBQUFaLENBQUEsRUFBQW1CLENBQUEsQ0FBQWYsQ0FBQSxHQUFBRixDQUFBLEVBQUFtQixDQUFBLGdCQUFBQyxFQUFBcEIsQ0FBQSxFQUFBRSxDQUFBLFNBQUFLLENBQUEsR0FBQVAsQ0FBQSxFQUFBVSxDQUFBLEdBQUFSLENB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QUFFaUQsUUFBUSxFQUFFO1lBQXVDLENBQUMsQ0FBQyxFQUFFakQsc0RBQUksQ0FBQyxJQUFJLEVBQUU7Y0FBRWlELFFBQVEsRUFBRTtZQUFvQixDQUFDLENBQUMsRUFBRWpELHNEQUFJLENBQUMsSUFBSSxFQUFFO2NBQUVpRCxRQUFRLEVBQUU7WUFBcUIsQ0FBQyxDQUFDLEVBQUVqRCxzREFBSSxDQUFDLElBQUksRUFBRTtjQUFFaUQsUUFBUSxFQUFFO1lBQTRCLENBQUMsQ0FBQztVQUFFLENBQUMsQ0FBQztRQUFFLENBQUMsQ0FBRTtNQUFFLENBQUMsQ0FBQztJQUFFLENBQUMsQ0FBRTtFQUFFLENBQUMsQ0FBQztBQUN2K0ksQ0FBQztBQUNELGlFQUFlMUMsT0FBTyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL3BhZ2VzL0ZpbmFuY2UudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9saWIvYXBpJztcbmltcG9ydCB7IENhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2NhcmQnO1xuY29uc3QgRmluYW5jZSA9ICgpID0+IHtcbiAgICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ292ZXJ2aWV3Jyk7XG4gICAgY29uc3QgW3N1bW1hcnksIHNldFN1bW1hcnldID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2RhdGVSYW5nZSwgc2V0RGF0ZVJhbmdlXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgc3RhcnRfZGF0ZTogbmV3IERhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBuZXcgRGF0ZSgpLmdldE1vbnRoKCksIDEpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSxcbiAgICAgICAgZW5kX2RhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdXG4gICAgfSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hTdW1tYXJ5KCk7XG4gICAgfSwgW2RhdGVSYW5nZV0pO1xuICAgIGNvbnN0IGZldGNoU3VtbWFyeSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9maW5hbmNlL3N1bW1hcnknLCB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRlUmFuZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0U3VtbWFyeShyZXNwb25zZS5kYXRhLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZmluYW5jaWFsIHN1bW1hcnk6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdEN1cnJlbmN5ID0gKGFtb3VudCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1QSCcsIHtcbiAgICAgICAgICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgICAgICAgICAgY3VycmVuY3k6ICdQSFAnXG4gICAgICAgIH0pLmZvcm1hdChhbW91bnQpO1xuICAgIH07XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIG1iLTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiRmluYW5jZSBNYW5hZ2VtZW50XCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImRhdGVcIiwgdmFsdWU6IGRhdGVSYW5nZS5zdGFydF9kYXRlLCBvbkNoYW5nZTogKGUpID0+IHNldERhdGVSYW5nZSh7IC4uLmRhdGVSYW5nZSwgc3RhcnRfZGF0ZTogZS50YXJnZXQudmFsdWUgfSksIGNsYXNzTmFtZTogXCJweC0zIHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLW1kXCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInNlbGYtY2VudGVyXCIsIGNoaWxkcmVuOiBcInRvXCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogZGF0ZVJhbmdlLmVuZF9kYXRlLCBvbkNoYW5nZTogKGUpID0+IHNldERhdGVSYW5nZSh7IC4uLmRhdGVSYW5nZSwgZW5kX2RhdGU6IGUudGFyZ2V0LnZhbHVlIH0pLCBjbGFzc05hbWU6IFwicHgtMyBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1tZFwiIH0pXSB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYm9yZGVyLWIgYm9yZGVyLWdyYXktMjAwIG1iLTZcIiwgY2hpbGRyZW46IF9qc3goXCJuYXZcIiwgeyBjbGFzc05hbWU6IFwiLW1iLXB4IGZsZXggc3BhY2UteC04XCIsIGNoaWxkcmVuOiBbJ292ZXJ2aWV3JywgJ29mZmVyaW5ncycsICdleHBlbnNlcycsICdidWRnZXRzJywgJ3JlcG9ydHMnXS5tYXAoKHRhYikgPT4gKF9qc3goXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRBY3RpdmVUYWIodGFiKSwgY2xhc3NOYW1lOiBgJHthY3RpdmVUYWIgPT09IHRhYlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1ibHVlLTUwMCB0ZXh0LWJsdWUtNjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci10cmFuc3BhcmVudCB0ZXh0LWdyYXktNTAwIGhvdmVyOnRleHQtZ3JheS03MDAgaG92ZXI6Ym9yZGVyLWdyYXktMzAwJ30gd2hpdGVzcGFjZS1ub3dyYXAgcHktNCBweC0xIGJvcmRlci1iLTIgZm9udC1tZWRpdW0gdGV4dC1zbSBjYXBpdGFsaXplYCwgY2hpbGRyZW46IHRhYiB9LCB0YWIpKSkgfSkgfSksIGFjdGl2ZVRhYiA9PT0gJ292ZXJ2aWV3JyAmJiAoX2pzeChcImRpdlwiLCB7IGNoaWxkcmVuOiBsb2FkaW5nID8gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtY2VudGVyIHB5LTEyXCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtYmxvY2sgYW5pbWF0ZS1zcGluIHJvdW5kZWQtZnVsbCBoLTggdy04IGJvcmRlci1iLTIgYm9yZGVyLWJsdWUtNjAwXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTIgdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nIGZpbmFuY2lhbCBkYXRhLi4uXCIgfSldIH0pKSA6IHN1bW1hcnkgPyAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtNlwiLCBjaGlsZHJlbjogW19qc3hzKENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgbWItMlwiLCBjaGlsZHJlbjogXCJUb3RhbCBHaXZpbmdcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtZ3JlZW4tNjAwXCIsIGNoaWxkcmVuOiBmb3JtYXRDdXJyZW5jeShzdW1tYXJ5LnRvdGFsX2dpdmluZykgfSksIF9qc3hzKFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS01MDAgbXQtMlwiLCBjaGlsZHJlbjogW3N1bW1hcnkudG90YWxfdHJhbnNhY3Rpb25zLCBcIiB0cmFuc2FjdGlvbnNcIl0gfSldIH0pLCBfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIG1iLTJcIiwgY2hpbGRyZW46IFwiQXZlcmFnZSBUcmFuc2FjdGlvblwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1ibHVlLTYwMFwiLCBjaGlsZHJlbjogZm9ybWF0Q3VycmVuY3koc3VtbWFyeS5hdmVyYWdlX3RyYW5zYWN0aW9uKSB9KV0gfSksIF9qc3hzKENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgbWItMlwiLCBjaGlsZHJlbjogXCJVbmlxdWUgR2l2ZXJzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LXB1cnBsZS02MDBcIiwgY2hpbGRyZW46IHN1bW1hcnkudW5pcXVlX2dpdmVycyB9KV0gfSksIF9qc3hzKENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS01MDAgbWItMlwiLCBjaGlsZHJlbjogXCJUb3RhbCBUcmFuc2FjdGlvbnNcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtaW5kaWdvLTYwMFwiLCBjaGlsZHJlbjogc3VtbWFyeS50b3RhbF90cmFuc2FjdGlvbnMgfSldIH0pLCBfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTYgbWQ6Y29sLXNwYW4tMiBsZzpjb2wtc3Bhbi00XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1zZW1pYm9sZCBtYi00XCIsIGNoaWxkcmVuOiBcIlBheW1lbnQgTWV0aG9kIEJyZWFrZG93blwiIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTRcIiwgY2hpbGRyZW46IE9iamVjdC5lbnRyaWVzKHN1bW1hcnkuYnlfcGF5bWVudF9tZXRob2QgfHwge30pLm1hcCgoW21ldGhvZCwgZGF0YV0pID0+IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJib3JkZXIgYm9yZGVyLWdyYXktMjAwIHJvdW5kZWQtbGcgcC00XCIsIGNoaWxkcmVuOiBbX2pzeChcImg0XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCBjYXBpdGFsaXplIG1iLTJcIiwgY2hpbGRyZW46IG1ldGhvZCB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IGZvcm1hdEN1cnJlbmN5KGRhdGEudG90YWwpIH0pLCBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNTAwIG10LTFcIiwgY2hpbGRyZW46IFtkYXRhLmNvdW50LCBcIiB0cmFuc2FjdGlvbnNcIl0gfSldIH0sIG1ldGhvZCkpKSB9KV0gfSldIH0pKSA6IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtY2VudGVyIHB5LTEyIHRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IFwiTm8gZmluYW5jaWFsIGRhdGEgYXZhaWxhYmxlIGZvciB0aGUgc2VsZWN0ZWQgcGVyaW9kLlwiIH0pKSB9KSksIGFjdGl2ZVRhYiAhPT0gJ292ZXJ2aWV3JyAmJiAoX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBbX2pzeChcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgZm9udC1zZW1pYm9sZCBtYi00IGNhcGl0YWxpemVcIiwgY2hpbGRyZW46IGFjdGl2ZVRhYiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFthY3RpdmVUYWIgPT09ICdvZmZlcmluZ3MnICYmICdEZXRhaWxlZCBvZmZlcmluZ3MgbWFuYWdlbWVudCBpbnRlcmZhY2UuIFRyYWNrIHRpdGhlcywgc3BlY2lhbCBvZmZlcmluZ3MsIG1pc3Npb25zLCBidWlsZGluZyBmdW5kLCBhbmQgb3RoZXIgY29udHJpYnV0aW9ucy4nLCBhY3RpdmVUYWIgPT09ICdleHBlbnNlcycgJiYgJ0NvbXByZWhlbnNpdmUgZXhwZW5zZSB0cmFja2luZyBzeXN0ZW0uIFJlY29yZCBhbmQgY2F0ZWdvcml6ZSBhbGwgY2h1cmNoIGV4cGVuc2VzIGluY2x1ZGluZyB1dGlsaXRpZXMsIHNhbGFyaWVzLCBtYWludGVuYW5jZSwgYW5kIG1pc3Npb25zLicsIGFjdGl2ZVRhYiA9PT0gJ2J1ZGdldHMnICYmICdCdWRnZXQgcGxhbm5pbmcgYW5kIG1vbml0b3JpbmcgdG9vbHMuIENyZWF0ZSBidWRnZXRzIGZvciBkaWZmZXJlbnQgY2F0ZWdvcmllcyBhbmQgdHJhY2sgc3BlbmRpbmcgYWdhaW5zdCBhbGxvY2F0aW9ucy4nLCBhY3RpdmVUYWIgPT09ICdyZXBvcnRzJyAmJiAnRmluYW5jaWFsIHJlcG9ydGluZyBhbmQgYW5hbHl0aWNzLiBHZW5lcmF0ZSBkZXRhaWxlZCBmaW5hbmNpYWwgc3RhdGVtZW50cywgZG9ub3IgcmVwb3J0cywgYW5kIHRheCBkb2N1bWVudHMuJ10gfSksIGFjdGl2ZVRhYiA9PT0gJ29mZmVyaW5ncycgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLWJsdWUtNTAgYm9yZGVyIGJvcmRlci1ibHVlLTIwMCByb3VuZGVkLWxnIHAtNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJmb250LXNlbWlib2xkIHRleHQtYmx1ZS05MDAgbWItMlwiLCBjaGlsZHJlbjogXCJBdmFpbGFibGUgRmVhdHVyZXM6XCIgfSksIF9qc3hzKFwidWxcIiwgeyBjbGFzc05hbWU6IFwibGlzdC1kaXNjIGxpc3QtaW5zaWRlIHRleHQtYmx1ZS04MDAgc3BhY2UteS0xXCIsIGNoaWxkcmVuOiBbX2pzeChcImxpXCIsIHsgY2hpbGRyZW46IFwiUmVjb3JkIHRpdGhlcyBhbmQgb2ZmZXJpbmdzXCIgfSksIF9qc3goXCJsaVwiLCB7IGNoaWxkcmVuOiBcIlRyYWNrIGRpZmZlcmVudCBvZmZlcmluZyB0eXBlc1wiIH0pLCBfanN4KFwibGlcIiwgeyBjaGlsZHJlbjogXCJGaWx0ZXIgYnkgZGF0ZSwgbWVtYmVyLCBhbmQgcGF5bWVudCBtZXRob2RcIiB9KSwgX2pzeChcImxpXCIsIHsgY2hpbGRyZW46IFwiVmlldyBnaXZpbmcgaGlzdG9yeVwiIH0pXSB9KV0gfSkpLCBhY3RpdmVUYWIgPT09ICdleHBlbnNlcycgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLWFtYmVyLTUwIGJvcmRlciBib3JkZXItYW1iZXItMjAwIHJvdW5kZWQtbGcgcC00XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtc2VtaWJvbGQgdGV4dC1hbWJlci05MDAgbWItMlwiLCBjaGlsZHJlbjogXCJDb21pbmcgU29vbjpcIiB9KSwgX2pzeHMoXCJ1bFwiLCB7IGNsYXNzTmFtZTogXCJsaXN0LWRpc2MgbGlzdC1pbnNpZGUgdGV4dC1hbWJlci04MDAgc3BhY2UteS0xXCIsIGNoaWxkcmVuOiBbX2pzeChcImxpXCIsIHsgY2hpbGRyZW46IFwiRXhwZW5zZSByZWNvcmRpbmcgYW5kIGNhdGVnb3JpemF0aW9uXCIgfSksIF9qc3goXCJsaVwiLCB7IGNoaWxkcmVuOiBcIlZlbmRvciBtYW5hZ2VtZW50XCIgfSksIF9qc3goXCJsaVwiLCB7IGNoaWxkcmVuOiBcIlJlY2VpcHQgYXR0YWNobWVudFwiIH0pLCBfanN4KFwibGlcIiwgeyBjaGlsZHJlbjogXCJFeHBlbnNlIGFwcHJvdmFsIHdvcmtmbG93XCIgfSldIH0pXSB9KSldIH0pXSB9KSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBGaW5hbmNlO1xuIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsIm5leHQiLCJwdXNoIiwiaXNBcnJheSIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImFwaSIsIkNhcmQiLCJGaW5hbmNlIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsImFjdGl2ZVRhYiIsInNldEFjdGl2ZVRhYiIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0Iiwic3VtbWFyeSIsInNldFN1bW1hcnkiLCJfdXNlU3RhdGU1IiwiX3VzZVN0YXRlNiIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiX3VzZVN0YXRlNyIsInN0YXJ0X2RhdGUiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsInRvSVNPU3RyaW5nIiwic3BsaXQiLCJlbmRfZGF0ZSIsIl91c2VTdGF0ZTgiLCJkYXRlUmFuZ2UiLCJzZXREYXRlUmFuZ2UiLCJmZXRjaFN1bW1hcnkiLCJfcmVmIiwiX2NhbGxlZSIsInJlc3BvbnNlIiwiX3QiLCJfY29udGV4dCIsImdldCIsInBhcmFtcyIsImRhdGEiLCJjb25zb2xlIiwiZXJyb3IiLCJmb3JtYXRDdXJyZW5jeSIsImFtb3VudCIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJzdHlsZSIsImN1cnJlbmN5IiwiZm9ybWF0IiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJ0eXBlIiwib25DaGFuZ2UiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwibWFwIiwidGFiIiwib25DbGljayIsImNvbmNhdCIsInRvdGFsX2dpdmluZyIsInRvdGFsX3RyYW5zYWN0aW9ucyIsImF2ZXJhZ2VfdHJhbnNhY3Rpb24iLCJ1bmlxdWVfZ2l2ZXJzIiwiZW50cmllcyIsImJ5X3BheW1lbnRfbWV0aG9kIiwiX3JlZjIiLCJfcmVmMyIsIm1ldGhvZCIsInRvdGFsIiwiY291bnQiXSwic291cmNlUm9vdCI6IiJ9