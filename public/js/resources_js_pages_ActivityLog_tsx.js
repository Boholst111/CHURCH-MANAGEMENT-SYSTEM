"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_ActivityLog_tsx"],{

/***/ "./resources/js/lib/activityApi.ts"
/*!*****************************************!*\
  !*** ./resources/js/lib/activityApi.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activityApi: () => (/* binding */ activityApi)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/lib/api.ts");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var activityApi = {
  /**
   * Get paginated activities with optional filters
   */
  getActivities: function () {
    var _getActivities = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(filters) {
      var params, queryString, url, response;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            params = new URLSearchParams();
            if (filters !== null && filters !== void 0 && filters.user_id) {
              params.append('user_id', filters.user_id.toString());
            }
            if (filters !== null && filters !== void 0 && filters.start_date) {
              params.append('start_date', filters.start_date);
            }
            if (filters !== null && filters !== void 0 && filters.end_date) {
              params.append('end_date', filters.end_date);
            }
            if (filters !== null && filters !== void 0 && filters.action) {
              params.append('action', filters.action);
            }
            if (filters !== null && filters !== void 0 && filters.entity_type) {
              params.append('entity_type', filters.entity_type);
            }
            if (filters !== null && filters !== void 0 && filters.per_page) {
              params.append('per_page', filters.per_page.toString());
            }
            if (filters !== null && filters !== void 0 && filters.page) {
              params.append('page', filters.page.toString());
            }
            queryString = params.toString();
            url = queryString ? "/activities?".concat(queryString) : '/activities';
            _context.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get(url);
          case 1:
            response = _context.v;
            return _context.a(2, response.data);
        }
      }, _callee);
    }));
    function getActivities(_x) {
      return _getActivities.apply(this, arguments);
    }
    return getActivities;
  }(),
  /**
   * Get list of users for filter dropdown
   */
  getUsers: function () {
    var _getUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get('/activities/users');
          case 1:
            response = _context2.v;
            return _context2.a(2, response.data.data);
        }
      }, _callee2);
    }));
    function getUsers() {
      return _getUsers.apply(this, arguments);
    }
    return getUsers;
  }()
};

/***/ },

/***/ "./resources/js/pages/ActivityLog.tsx"
/*!********************************************!*\
  !*** ./resources/js/pages/ActivityLog.tsx ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/funnel.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/activity.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-left.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-right.js");
/* harmony import */ var _lib_activityApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/activityApi */ "./resources/js/lib/activityApi.ts");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
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





var ActivityLog = function ActivityLog() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    activities = _useState2[0],
    setActivities = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    users = _useState4[0],
    setUsers = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      page: 1,
      per_page: 50
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    filters = _useState8[0],
    setFilters = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      current_page: 1,
      per_page: 50,
      total: 0,
      last_page: 1,
      from: null,
      to: null
    }),
    _useState0 = _slicedToArray(_useState9, 2),
    pagination = _useState0[0],
    setPagination = _useState0[1];
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_7__.useToast)(),
    showToast = _useToast.showToast;
  // Fetch users for filter dropdown
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var fetchUsers = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var usersData, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _lib_activityApi__WEBPACK_IMPORTED_MODULE_6__.activityApi.getUsers();
            case 1:
              usersData = _context.v;
              setUsers(usersData);
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error('Failed to fetch users:', _t);
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      return function fetchUsers() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchUsers();
  }, []);
  // Fetch activities when filters change
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var fetchActivities = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var response, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              setLoading(true);
              _context2.p = 1;
              _context2.n = 2;
              return _lib_activityApi__WEBPACK_IMPORTED_MODULE_6__.activityApi.getActivities(filters);
            case 2:
              response = _context2.v;
              setActivities(response.data);
              setPagination(response.pagination);
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              console.error('Failed to fetch activities:', _t2);
              showToast('error', 'Failed to load activity log');
            case 4:
              _context2.p = 4;
              setLoading(false);
              return _context2.f(4);
            case 5:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 3, 4, 5]]);
      }));
      return function fetchActivities() {
        return _ref2.apply(this, arguments);
      };
    }();
    fetchActivities();
  }, [filters, showToast]);
  var handleFilterChange = function handleFilterChange(key, value) {
    setFilters(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty(_defineProperty({}, key, value || undefined), "page", 1));
    });
  };
  var handlePageChange = function handlePageChange(newPage) {
    setFilters(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        page: newPage
      });
    });
  };
  var clearFilters = function clearFilters() {
    setFilters({
      page: 1,
      per_page: 50
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "p-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "mb-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
        className: "text-3xl font-bold text-gray-900 flex items-center gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: "w-8 h-8 text-blue-600"
        }), "Activity Log"]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-gray-600 mt-2",
        children: "View and filter system activities and audit trail"
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "bg-white rounded-lg shadow-sm p-6 mb-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2 mb-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "w-5 h-5 text-gray-600"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
          className: "text-lg font-semibold text-gray-900",
          children: "Filters"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            htmlFor: "user-filter",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "User"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
            id: "user-filter",
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            value: filters.user_id || '',
            onChange: function onChange(e) {
              return handleFilterChange('user_id', e.target.value ? parseInt(e.target.value) : '');
            },
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "",
              children: "All Users"
            }), users.map(function (user) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                value: user.id,
                children: user.name
              }, user.id);
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            htmlFor: "start-date",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "Start Date"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "date",
            id: "start-date",
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            value: filters.start_date || '',
            onChange: function onChange(e) {
              return handleFilterChange('start_date', e.target.value);
            }
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            htmlFor: "end-date",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "End Date"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "date",
            id: "end-date",
            className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            value: filters.end_date || '',
            onChange: function onChange(e) {
              return handleFilterChange('end_date', e.target.value);
            }
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "flex items-end",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
            onClick: clearFilters,
            className: "w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors",
            children: "Clear Filters"
          })
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "bg-white rounded-lg shadow-sm overflow-hidden",
      children: loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-8 text-center",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "mt-2 text-gray-600",
          children: "Loading activities..."
        })]
      }) : activities.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-8 text-center text-gray-500",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: "w-12 h-12 mx-auto mb-2 text-gray-400"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: "No activities found"
        })]
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "overflow-x-auto",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
            className: "w-full",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
              className: "bg-gray-50 border-b border-gray-200",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                  className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  children: "Date & Time"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                  className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  children: "User"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                  className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  children: "Action"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                  className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  children: "Entity"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                  className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  children: "Description"
                })]
              })
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
              className: "bg-white divide-y divide-gray-200",
              children: activities.map(function (activity) {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                  className: "hover:bg-gray-50",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                    className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      children: new Date(activity.created_at).toLocaleDateString()
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      className: "text-gray-500 text-xs",
                      children: new Date(activity.created_at).toLocaleTimeString()
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                    className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                    children: activity.user_name
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                    className: "px-6 py-4 whitespace-nowrap",
                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      className: "px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800",
                      children: activity.action
                    })
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                    className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                    children: [activity.entity_type, activity.entity_id && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                      className: "text-gray-500 ml-1",
                      children: ["#", activity.entity_id]
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                    className: "px-6 py-4 text-sm text-gray-900",
                    children: activity.description
                  })]
                }, activity.id);
              })
            })]
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "text-sm text-gray-700",
            children: ["Showing ", pagination.from || 0, " to ", pagination.to || 0, " of ", pagination.total, " activities"]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
              onClick: function onClick() {
                return handlePageChange(pagination.current_page - 1);
              },
              disabled: pagination.current_page === 1,
              className: "px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                className: "w-4 h-4"
              }), "Previous"]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
              className: "text-sm text-gray-700",
              children: ["Page ", pagination.current_page, " of ", pagination.last_page]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
              onClick: function onClick() {
                return handlePageChange(pagination.current_page + 1);
              },
              disabled: pagination.current_page === pagination.last_page,
              className: "px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1",
              children: ["Next", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                className: "w-4 h-4"
              })]
            })]
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActivityLog);

/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/chevron-left.js"
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevron-left.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChevronLeft)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chevron-left", __iconNode);


//# sourceMappingURL=chevron-left.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/chevron-right.js"
/*!*******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevron-right.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChevronRight)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chevron-right", __iconNode);


//# sourceMappingURL=chevron-right.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/funnel.js"
/*!************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/funnel.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Funnel)
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("funnel", __iconNode);


//# sourceMappingURL=funnel.js.map


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0FjdGl2aXR5TG9nX3RzeC5qcz9pZD1mNzljNGU2MzQ5MmNmZGRmIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzBCQUNBLHVLQUFBQSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBRSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBSSxDQUFBLE1BQUFDLENBQUEsR0FBQVgsQ0FBQSxRQUFBWSxDQUFBLE9BQUFDLENBQUEsS0FBQUYsQ0FBQSxLQUFBYixDQUFBLEtBQUFnQixDQUFBLEVBQUFwQixDQUFBLEVBQUFxQixDQUFBLEVBQUFDLENBQUEsRUFBQU4sQ0FBQSxFQUFBTSxDQUFBLENBQUFDLElBQUEsQ0FBQXZCLENBQUEsTUFBQXNCLENBQUEsV0FBQUEsRUFBQXJCLENBQUEsRUFBQUMsQ0FBQSxXQUFBTSxDQUFBLEdBQUFQLENBQUEsRUFBQVEsQ0FBQSxNQUFBRyxDQUFBLEdBQUFaLENBQUEsRUFBQW1CLENBQUEsQ0FBQWYsQ0FBQSxHQUFBRixDQUFBLEVBQUFtQixDQUFBLGdCQUFBQyxFQUFBcEIsQ0FBQSxFQUFBRSxDQUFBLFNBQUFLLENBQUEsR0FBQVAsQ0FBQSxFQUFBVSxDQUFBLEdBQUFSLENBQUEsRUFB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QVMsRUFBRTtjQUFVLENBQUMsQ0FBQztZQUFFLENBQUMsQ0FBQztVQUFFLENBQUMsQ0FBQztRQUFFLENBQUMsQ0FBQztNQUFFLENBQUM7SUFBRyxDQUFDLENBQUM7RUFBRSxDQUFDLENBQUM7QUFDcGxNLENBQUM7QUFDRCxpRUFBZTVDLFdBQVcsRTs7Ozs7Ozs7Ozs7Ozs7OztBQzNFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVzRDs7QUFFdEQsK0JBQStCLG9DQUFvQztBQUNuRSxvQkFBb0IsZ0VBQWdCOztBQUVVO0FBQzlDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFc0Q7O0FBRXRELCtCQUErQixtQ0FBbUM7QUFDbEUscUJBQXFCLGdFQUFnQjs7QUFFVTtBQUMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFnQjs7QUFFVTtBQUN6QyIsInNvdXJjZXMiOlsid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9saWIvYWN0aXZpdHlBcGkudHMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL3BhZ2VzL0FjdGl2aXR5TG9nLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2NoZXZyb24tbGVmdC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2NoZXZyb24tcmlnaHQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9mdW5uZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwaSBmcm9tICcuL2FwaSc7XG5leHBvcnQgY29uc3QgYWN0aXZpdHlBcGkgPSB7XG4gICAgLyoqXG4gICAgICogR2V0IHBhZ2luYXRlZCBhY3Rpdml0aWVzIHdpdGggb3B0aW9uYWwgZmlsdGVyc1xuICAgICAqL1xuICAgIGdldEFjdGl2aXRpZXM6IGFzeW5jIChmaWx0ZXJzKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICAgICAgaWYgKGZpbHRlcnM/LnVzZXJfaWQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5hcHBlbmQoJ3VzZXJfaWQnLCBmaWx0ZXJzLnVzZXJfaWQudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbHRlcnM/LnN0YXJ0X2RhdGUpIHtcbiAgICAgICAgICAgIHBhcmFtcy5hcHBlbmQoJ3N0YXJ0X2RhdGUnLCBmaWx0ZXJzLnN0YXJ0X2RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWx0ZXJzPy5lbmRfZGF0ZSkge1xuICAgICAgICAgICAgcGFyYW1zLmFwcGVuZCgnZW5kX2RhdGUnLCBmaWx0ZXJzLmVuZF9kYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsdGVycz8uYWN0aW9uKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXBwZW5kKCdhY3Rpb24nLCBmaWx0ZXJzLmFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbHRlcnM/LmVudGl0eV90eXBlKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXBwZW5kKCdlbnRpdHlfdHlwZScsIGZpbHRlcnMuZW50aXR5X3R5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWx0ZXJzPy5wZXJfcGFnZSkge1xuICAgICAgICAgICAgcGFyYW1zLmFwcGVuZCgncGVyX3BhZ2UnLCBmaWx0ZXJzLnBlcl9wYWdlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWx0ZXJzPy5wYWdlKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXBwZW5kKCdwYWdlJywgZmlsdGVycy5wYWdlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IHF1ZXJ5U3RyaW5nID8gYC9hY3Rpdml0aWVzPyR7cXVlcnlTdHJpbmd9YCA6ICcvYWN0aXZpdGllcyc7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCh1cmwpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEdldCBsaXN0IG9mIHVzZXJzIGZvciBmaWx0ZXIgZHJvcGRvd25cbiAgICAgKi9cbiAgICBnZXRVc2VyczogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9hY3Rpdml0aWVzL3VzZXJzJyk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgfSxcbn07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cywgRnJhZ21lbnQgYXMgX0ZyYWdtZW50IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQWN0aXZpdHkgYXMgQWN0aXZpdHlJY29uLCBGaWx0ZXIsIENoZXZyb25MZWZ0LCBDaGV2cm9uUmlnaHQgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgYWN0aXZpdHlBcGkgfSBmcm9tICcuLi9saWIvYWN0aXZpdHlBcGknO1xuaW1wb3J0IHsgdXNlVG9hc3QgfSBmcm9tICcuLi9jb250ZXh0cy9Ub2FzdENvbnRleHQnO1xuY29uc3QgQWN0aXZpdHlMb2cgPSAoKSA9PiB7XG4gICAgY29uc3QgW2FjdGl2aXRpZXMsIHNldEFjdGl2aXRpZXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFt1c2Vycywgc2V0VXNlcnNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtmaWx0ZXJzLCBzZXRGaWx0ZXJzXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgcGVyX3BhZ2U6IDUwLFxuICAgIH0pO1xuICAgIGNvbnN0IFtwYWdpbmF0aW9uLCBzZXRQYWdpbmF0aW9uXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgY3VycmVudF9wYWdlOiAxLFxuICAgICAgICBwZXJfcGFnZTogNTAsXG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgICBsYXN0X3BhZ2U6IDEsXG4gICAgICAgIGZyb206IG51bGwsXG4gICAgICAgIHRvOiBudWxsLFxuICAgIH0pO1xuICAgIGNvbnN0IHsgc2hvd1RvYXN0IH0gPSB1c2VUb2FzdCgpO1xuICAgIC8vIEZldGNoIHVzZXJzIGZvciBmaWx0ZXIgZHJvcGRvd25cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaFVzZXJzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB1c2Vyc0RhdGEgPSBhd2FpdCBhY3Rpdml0eUFwaS5nZXRVc2VycygpO1xuICAgICAgICAgICAgICAgIHNldFVzZXJzKHVzZXJzRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggdXNlcnM6JywgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmZXRjaFVzZXJzKCk7XG4gICAgfSwgW10pO1xuICAgIC8vIEZldGNoIGFjdGl2aXRpZXMgd2hlbiBmaWx0ZXJzIGNoYW5nZVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZldGNoQWN0aXZpdGllcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYWN0aXZpdHlBcGkuZ2V0QWN0aXZpdGllcyhmaWx0ZXJzKTtcbiAgICAgICAgICAgICAgICBzZXRBY3Rpdml0aWVzKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldFBhZ2luYXRpb24ocmVzcG9uc2UucGFnaW5hdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggYWN0aXZpdGllczonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gbG9hZCBhY3Rpdml0eSBsb2cnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmZXRjaEFjdGl2aXRpZXMoKTtcbiAgICB9LCBbZmlsdGVycywgc2hvd1RvYXN0XSk7XG4gICAgY29uc3QgaGFuZGxlRmlsdGVyQ2hhbmdlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgc2V0RmlsdGVycygocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBba2V5XTogdmFsdWUgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgcGFnZTogMSwgLy8gUmVzZXQgdG8gZmlyc3QgcGFnZSB3aGVuIGZpbHRlcnMgY2hhbmdlXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVBhZ2VDaGFuZ2UgPSAobmV3UGFnZSkgPT4ge1xuICAgICAgICBzZXRGaWx0ZXJzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIHBhZ2U6IG5ld1BhZ2UsXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIGNvbnN0IGNsZWFyRmlsdGVycyA9ICgpID0+IHtcbiAgICAgICAgc2V0RmlsdGVycyh7XG4gICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICAgICAgcGVyX3BhZ2U6IDUwLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibWItNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KEFjdGl2aXR5SWNvbiwgeyBjbGFzc05hbWU6IFwidy04IGgtOCB0ZXh0LWJsdWUtNjAwXCIgfSksIFwiQWN0aXZpdHkgTG9nXCJdIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWdyYXktNjAwIG10LTJcIiwgY2hpbGRyZW46IFwiVmlldyBhbmQgZmlsdGVyIHN5c3RlbSBhY3Rpdml0aWVzIGFuZCBhdWRpdCB0cmFpbFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgcm91bmRlZC1sZyBzaGFkb3ctc20gcC02IG1iLTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi00XCIsIGNoaWxkcmVuOiBbX2pzeChGaWx0ZXIsIHsgY2xhc3NOYW1lOiBcInctNSBoLTUgdGV4dC1ncmF5LTYwMFwiIH0pLCBfanN4KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiRmlsdGVyc1wiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcInVzZXItZmlsdGVyXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJVc2VyXCIgfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgaWQ6IFwidXNlci1maWx0ZXJcIiwgY2xhc3NOYW1lOiBcInctZnVsbCBweC0zIHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiLCB2YWx1ZTogZmlsdGVycy51c2VyX2lkIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZUZpbHRlckNoYW5nZSgndXNlcl9pZCcsIGUudGFyZ2V0LnZhbHVlID8gcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIDogJycpLCBjaGlsZHJlbjogW19qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJcIiwgY2hpbGRyZW46IFwiQWxsIFVzZXJzXCIgfSksIHVzZXJzLm1hcCgodXNlcikgPT4gKF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogdXNlci5pZCwgY2hpbGRyZW46IHVzZXIubmFtZSB9LCB1c2VyLmlkKSkpXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcInN0YXJ0LWRhdGVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIlN0YXJ0IERhdGVcIiB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJkYXRlXCIsIGlkOiBcInN0YXJ0LWRhdGVcIiwgY2xhc3NOYW1lOiBcInctZnVsbCBweC0zIHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiLCB2YWx1ZTogZmlsdGVycy5zdGFydF9kYXRlIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZUZpbHRlckNoYW5nZSgnc3RhcnRfZGF0ZScsIGUudGFyZ2V0LnZhbHVlKSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImVuZC1kYXRlXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJFbmQgRGF0ZVwiIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImRhdGVcIiwgaWQ6IFwiZW5kLWRhdGVcIiwgY2xhc3NOYW1lOiBcInctZnVsbCBweC0zIHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiLCB2YWx1ZTogZmlsdGVycy5lbmRfZGF0ZSB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiBoYW5kbGVGaWx0ZXJDaGFuZ2UoJ2VuZF9kYXRlJywgZS50YXJnZXQudmFsdWUpIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWVuZFwiLCBjaGlsZHJlbjogX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6IGNsZWFyRmlsdGVycywgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYmctZ3JheS0xMDAgdGV4dC1ncmF5LTcwMCByb3VuZGVkLWxnIGhvdmVyOmJnLWdyYXktMjAwIHRyYW5zaXRpb24tY29sb3JzXCIsIGNoaWxkcmVuOiBcIkNsZWFyIEZpbHRlcnNcIiB9KSB9KV0gfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLXdoaXRlIHJvdW5kZWQtbGcgc2hhZG93LXNtIG92ZXJmbG93LWhpZGRlblwiLCBjaGlsZHJlbjogbG9hZGluZyA/IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTggdGV4dC1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImlubGluZS1ibG9jayBhbmltYXRlLXNwaW4gcm91bmRlZC1mdWxsIGgtOCB3LTggYm9yZGVyLWItMiBib3JkZXItYmx1ZS02MDBcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMiB0ZXh0LWdyYXktNjAwXCIsIGNoaWxkcmVuOiBcIkxvYWRpbmcgYWN0aXZpdGllcy4uLlwiIH0pXSB9KSkgOiBhY3Rpdml0aWVzLmxlbmd0aCA9PT0gMCA/IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTggdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTUwMFwiLCBjaGlsZHJlbjogW19qc3goQWN0aXZpdHlJY29uLCB7IGNsYXNzTmFtZTogXCJ3LTEyIGgtMTIgbXgtYXV0byBtYi0yIHRleHQtZ3JheS00MDBcIiB9KSwgX2pzeChcInBcIiwgeyBjaGlsZHJlbjogXCJObyBhY3Rpdml0aWVzIGZvdW5kXCIgfSldIH0pKSA6IChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm92ZXJmbG93LXgtYXV0b1wiLCBjaGlsZHJlbjogX2pzeHMoXCJ0YWJsZVwiLCB7IGNsYXNzTmFtZTogXCJ3LWZ1bGxcIiwgY2hpbGRyZW46IFtfanN4KFwidGhlYWRcIiwgeyBjbGFzc05hbWU6IFwiYmctZ3JheS01MCBib3JkZXItYiBib3JkZXItZ3JheS0yMDBcIiwgY2hpbGRyZW46IF9qc3hzKFwidHJcIiwgeyBjaGlsZHJlbjogW19qc3goXCJ0aFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTMgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiRGF0ZSAmIFRpbWVcIiB9KSwgX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJVc2VyXCIgfSksIF9qc3goXCJ0aFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTMgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiQWN0aW9uXCIgfSksIF9qc3goXCJ0aFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTMgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiRW50aXR5XCIgfSksIF9qc3goXCJ0aFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTMgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiRGVzY3JpcHRpb25cIiB9KV0gfSkgfSksIF9qc3goXCJ0Ym9keVwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSBkaXZpZGUteSBkaXZpZGUtZ3JheS0yMDBcIiwgY2hpbGRyZW46IGFjdGl2aXRpZXMubWFwKChhY3Rpdml0eSkgPT4gKF9qc3hzKFwidHJcIiwgeyBjbGFzc05hbWU6IFwiaG92ZXI6YmctZ3JheS01MFwiLCBjaGlsZHJlbjogW19qc3hzKFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjaGlsZHJlbjogbmV3IERhdGUoYWN0aXZpdHkuY3JlYXRlZF9hdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCkgfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTUwMCB0ZXh0LXhzXCIsIGNoaWxkcmVuOiBuZXcgRGF0ZShhY3Rpdml0eS5jcmVhdGVkX2F0KS50b0xvY2FsZVRpbWVTdHJpbmcoKSB9KV0gfSksIF9qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBhY3Rpdml0eS51c2VyX25hbWUgfSksIF9qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXBcIiwgY2hpbGRyZW46IF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInB4LTIgcHktMSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtZnVsbCBiZy1ibHVlLTEwMCB0ZXh0LWJsdWUtODAwXCIsIGNoaWxkcmVuOiBhY3Rpdml0eS5hY3Rpb24gfSkgfSksIF9qc3hzKFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogW2FjdGl2aXR5LmVudGl0eV90eXBlLCBhY3Rpdml0eS5lbnRpdHlfaWQgJiYgKF9qc3hzKFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWdyYXktNTAwIG1sLTFcIiwgY2hpbGRyZW46IFtcIiNcIiwgYWN0aXZpdHkuZW50aXR5X2lkXSB9KSldIH0pLCBfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHRleHQtc20gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogYWN0aXZpdHkuZGVzY3JpcHRpb24gfSldIH0sIGFjdGl2aXR5LmlkKSkpIH0pXSB9KSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctZ3JheS01MCBweC02IHB5LTQgYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTcwMFwiLCBjaGlsZHJlbjogW1wiU2hvd2luZyBcIiwgcGFnaW5hdGlvbi5mcm9tIHx8IDAsIFwiIHRvIFwiLCBwYWdpbmF0aW9uLnRvIHx8IDAsIFwiIG9mIFwiLCBwYWdpbmF0aW9uLnRvdGFsLCBcIiBhY3Rpdml0aWVzXCJdIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3hzKFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gaGFuZGxlUGFnZUNoYW5nZShwYWdpbmF0aW9uLmN1cnJlbnRfcGFnZSAtIDEpLCBkaXNhYmxlZDogcGFnaW5hdGlvbi5jdXJyZW50X3BhZ2UgPT09IDEsIGNsYXNzTmFtZTogXCJweC0zIHB5LTEgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGhvdmVyOmJnLWdyYXktMTAwIGRpc2FibGVkOm9wYWNpdHktNTAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCIsIGNoaWxkcmVuOiBbX2pzeChDaGV2cm9uTGVmdCwgeyBjbGFzc05hbWU6IFwidy00IGgtNFwiIH0pLCBcIlByZXZpb3VzXCJdIH0pLCBfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNzAwXCIsIGNoaWxkcmVuOiBbXCJQYWdlIFwiLCBwYWdpbmF0aW9uLmN1cnJlbnRfcGFnZSwgXCIgb2YgXCIsIHBhZ2luYXRpb24ubGFzdF9wYWdlXSB9KSwgX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBoYW5kbGVQYWdlQ2hhbmdlKHBhZ2luYXRpb24uY3VycmVudF9wYWdlICsgMSksIGRpc2FibGVkOiBwYWdpbmF0aW9uLmN1cnJlbnRfcGFnZSA9PT0gcGFnaW5hdGlvbi5sYXN0X3BhZ2UsIGNsYXNzTmFtZTogXCJweC0zIHB5LTEgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGhvdmVyOmJnLWdyYXktMTAwIGRpc2FibGVkOm9wYWNpdHktNTAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCIsIGNoaWxkcmVuOiBbXCJOZXh0XCIsIF9qc3goQ2hldnJvblJpZ2h0LCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSldIH0pXSB9KV0gfSldIH0pKSB9KV0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEFjdGl2aXR5TG9nO1xuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1tcInBhdGhcIiwgeyBkOiBcIm0xNSAxOC02LTYgNi02XCIsIGtleTogXCIxd25mZzNcIiB9XV07XG5jb25zdCBDaGV2cm9uTGVmdCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJjaGV2cm9uLWxlZnRcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIENoZXZyb25MZWZ0IGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNoZXZyb24tbGVmdC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtbXCJwYXRoXCIsIHsgZDogXCJtOSAxOCA2LTYtNi02XCIsIGtleTogXCJtdGhod3FcIiB9XV07XG5jb25zdCBDaGV2cm9uUmlnaHQgPSBjcmVhdGVMdWNpZGVJY29uKFwiY2hldnJvbi1yaWdodFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQ2hldnJvblJpZ2h0IGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNoZXZyb24tcmlnaHQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xMCAyMGExIDEgMCAwIDAgLjU1My44OTVsMiAxQTEgMSAwIDAgMCAxNCAyMXYtN2EyIDIgMCAwIDEgLjUxNy0xLjM0MUwyMS43NCA0LjY3QTEgMSAwIDAgMCAyMSAzSDNhMSAxIDAgMCAwLS43NDIgMS42N2w3LjIyNSA3Ljk4OUEyIDIgMCAwIDEgMTAgMTR6XCIsXG4gICAgICBrZXk6IFwic2M3cTdpXCJcbiAgICB9XG4gIF1cbl07XG5jb25zdCBGdW5uZWwgPSBjcmVhdGVMdWNpZGVJY29uKFwiZnVubmVsXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBGdW5uZWwgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnVubmVsLmpzLm1hcFxuIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiYXBpIiwiYWN0aXZpdHlBcGkiLCJnZXRBY3Rpdml0aWVzIiwiX2dldEFjdGl2aXRpZXMiLCJfY2FsbGVlIiwiZmlsdGVycyIsInBhcmFtcyIsInF1ZXJ5U3RyaW5nIiwidXJsIiwicmVzcG9uc2UiLCJfY29udGV4dCIsIlVSTFNlYXJjaFBhcmFtcyIsInVzZXJfaWQiLCJhcHBlbmQiLCJ0b1N0cmluZyIsInN0YXJ0X2RhdGUiLCJlbmRfZGF0ZSIsImFjdGlvbiIsImVudGl0eV90eXBlIiwicGVyX3BhZ2UiLCJwYWdlIiwiY29uY2F0IiwiZ2V0IiwiZGF0YSIsIl94IiwiZ2V0VXNlcnMiLCJfZ2V0VXNlcnMiLCJfY2FsbGVlMiIsIl9jb250ZXh0MiIsIl9zbGljZWRUb0FycmF5IiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIl9hcnJheUxpa2VUb0FycmF5Iiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibmV4dCIsInB1c2giLCJpc0FycmF5IiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsIkZyYWdtZW50IiwiX0ZyYWdtZW50IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJBY3Rpdml0eSIsIkFjdGl2aXR5SWNvbiIsIkZpbHRlciIsIkNoZXZyb25MZWZ0IiwiQ2hldnJvblJpZ2h0IiwidXNlVG9hc3QiLCJBY3Rpdml0eUxvZyIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJhY3Rpdml0aWVzIiwic2V0QWN0aXZpdGllcyIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwidXNlcnMiLCJzZXRVc2VycyIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2IiwibG9hZGluZyIsInNldExvYWRpbmciLCJfdXNlU3RhdGU3IiwiX3VzZVN0YXRlOCIsInNldEZpbHRlcnMiLCJfdXNlU3RhdGU5IiwiY3VycmVudF9wYWdlIiwidG90YWwiLCJsYXN0X3BhZ2UiLCJ0byIsIl91c2VTdGF0ZTAiLCJwYWdpbmF0aW9uIiwic2V0UGFnaW5hdGlvbiIsIl91c2VUb2FzdCIsInNob3dUb2FzdCIsImZldGNoVXNlcnMiLCJfcmVmIiwidXNlcnNEYXRhIiwiX3QiLCJjb25zb2xlIiwiZXJyb3IiLCJmZXRjaEFjdGl2aXRpZXMiLCJfcmVmMiIsIl90MiIsImhhbmRsZUZpbHRlckNoYW5nZSIsImtleSIsInByZXYiLCJfb2JqZWN0U3ByZWFkIiwiX2RlZmluZVByb3BlcnR5IiwidW5kZWZpbmVkIiwiaGFuZGxlUGFnZUNoYW5nZSIsIm5ld1BhZ2UiLCJjbGVhckZpbHRlcnMiLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsImh0bWxGb3IiLCJpZCIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwicGFyc2VJbnQiLCJtYXAiLCJ1c2VyIiwidHlwZSIsIm9uQ2xpY2siLCJhY3Rpdml0eSIsIkRhdGUiLCJjcmVhdGVkX2F0IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwidXNlcl9uYW1lIiwiZW50aXR5X2lkIiwiZGVzY3JpcHRpb24iLCJkaXNhYmxlZCJdLCJzb3VyY2VSb290IjoiIn0=