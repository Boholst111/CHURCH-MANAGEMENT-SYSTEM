"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_GroupDetail_tsx"],{

/***/ "./resources/js/components/ui/badge.tsx"
/*!**********************************************!*\
  !*** ./resources/js/components/ui/badge.tsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Badge: () => (/* binding */ Badge),
/* harmony export */   badgeVariants: () => (/* binding */ badgeVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-variance-authority */ "./node_modules/class-variance-authority/dist/index.mjs");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/utils */ "./resources/js/lib/utils.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className", "variant", "size", "shape", "icon", "children"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }




var badgeVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__.cva)("inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2", {
  variants: {
    variant: {
      primary: "bg-primary-100 text-primary-700 border-primary-200 focus:ring-primary-500",
      success: "bg-success-light text-success-dark border-success-DEFAULT focus:ring-success-DEFAULT",
      warning: "bg-warning-light text-warning-dark border-warning-DEFAULT focus:ring-warning-DEFAULT",
      error: "bg-error-light text-error-dark border-error-DEFAULT focus:ring-error-DEFAULT",
      danger: "bg-error-light text-error-dark border-error-DEFAULT focus:ring-error-DEFAULT",
      neutral: "bg-neutral-100 text-neutral-700 border-neutral-300 focus:ring-neutral-500",
      outline: "bg-transparent text-neutral-700 border border-neutral-300 focus:ring-neutral-500"
    },
    size: {
      sm: "h-5 px-2 text-xs gap-1",
      md: "h-6 px-2.5 text-sm gap-1.5",
      lg: "h-7 px-3 text-base gap-2"
    },
    shape: {
      rounded: "rounded-md",
      pill: "rounded-full"
    }
  },
  defaultVariants: {
    variant: "neutral",
    size: "md",
    shape: "rounded"
  }
});
var Badge = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    variant = _ref.variant,
    size = _ref.size,
    shape = _ref.shape,
    icon = _ref.icon,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", _objectSpread(_objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(badgeVariants({
      variant: variant,
      size: size,
      shape: shape
    }), className)
  }, props), {}, {
    children: [icon && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "inline-flex items-center",
      "aria-hidden": "true",
      children: icon
    }), children]
  }));
});
Badge.displayName = "Badge";


/***/ },

/***/ "./resources/js/lib/smallGroupApi.ts"
/*!*******************************************!*\
  !*** ./resources/js/lib/smallGroupApi.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   smallGroupApi: () => (/* binding */ smallGroupApi)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/lib/api.ts");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

/**
 * Small Group API client
 *
 * Provides methods for interacting with the small groups API endpoints.
 */
var smallGroupApi = {
  /**
   * Get all small groups
   */
  getSmallGroups: function getSmallGroups() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get('/small-groups');
          case 1:
            response = _context.v;
            return _context.a(2, response.data.data || []);
        }
      }, _callee);
    }))();
  },
  /**
   * Get a single small group by ID
   */
  getSmallGroup: function getSmallGroup(id) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get("/small-groups/".concat(id));
          case 1:
            response = _context2.v;
            return _context2.a(2, response.data.data);
        }
      }, _callee2);
    }))();
  },
  /**
   * Create a new small group
   */
  createSmallGroup: function createSmallGroup(data) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var response;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].post('/small-groups', data);
          case 1:
            response = _context3.v;
            return _context3.a(2, response.data.data);
        }
      }, _callee3);
    }))();
  },
  /**
   * Update an existing small group
   */
  updateSmallGroup: function updateSmallGroup(id, data) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var response;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].put("/small-groups/".concat(id), data);
          case 1:
            response = _context4.v;
            return _context4.a(2, response.data.data);
        }
      }, _callee4);
    }))();
  },
  /**
   * Delete a small group
   */
  deleteSmallGroup: function deleteSmallGroup(id) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"]("/small-groups/".concat(id));
          case 1:
            return _context5.a(2);
        }
      }, _callee5);
    }))();
  }
};

/***/ },

/***/ "./resources/js/pages/GroupDetail.tsx"
/*!********************************************!*\
  !*** ./resources/js/pages/GroupDetail.tsx ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/activity.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/arrow-left.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/calendar.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/clock.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/info.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/map-pin.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user-plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/users.js");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/ui/badge */ "./resources/js/components/ui/badge.tsx");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../lib/smallGroupApi */ "./resources/js/lib/smallGroupApi.ts");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../lib/utils */ "./resources/js/lib/utils.ts");
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











/**
 * Tab configuration
 */
var tabs = [{
  id: 'overview',
  label: 'Overview',
  icon: lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"]
}, {
  id: 'members',
  label: 'Members',
  icon: lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"]
}, {
  id: 'schedule',
  label: 'Schedule',
  icon: lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"]
}, {
  id: 'resources',
  label: 'Resources',
  icon: lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"]
}, {
  id: 'activity',
  label: 'Activity',
  icon: lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"]
}];
/**
 * GroupDetail Page Component
 *
 * Displays detailed information about a small group with multiple tabs.
 *
 * Features:
 * - Hero section with gradient background
 * - Tab navigation (Overview, Members, Schedule, Resources, Activity)
 * - Overview tab with description and meeting details
 * - Members tab with member list and "Add Member" button
 * - Schedule tab with upcoming and past meetings
 * - Responsive design
 *
 * Validates Requirements: 8.4, 8.5
 * Design Reference: Group Detail View section
 */
var GroupDetail = function GroupDetail() {
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useParams)(),
    id = _useParams.id;
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_12__.useAuth)(),
    user = _useAuth.user;
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_13__.useToast)(),
    showToast = _useToast.showToast;
  var isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'admin';
  // State management
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    group = _useState2[0],
    setGroup = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('overview'),
    _useState6 = _slicedToArray(_useState5, 2),
    activeTab = _useState6[0],
    setActiveTab = _useState6[1];
  /**
   * Load group details on mount
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (id) {
      loadGroupDetails(parseInt(id));
    }
  }, [id]);
  /**
   * Fetch group details from API
   */
  var loadGroupDetails = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(groupId) {
      var data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setIsLoading(true);
            _context.n = 1;
            return _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_17__.smallGroupApi.getSmallGroup(groupId);
          case 1:
            data = _context.v;
            setGroup(data);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            showToast('error', 'Failed to load group details');
            console.error('Error loading group details:', _t);
            navigate('/small-groups');
          case 3:
            _context.p = 3;
            setIsLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function loadGroupDetails(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Handle back button click
   */
  var handleBack = function handleBack() {
    navigate('/small-groups');
  };
  /**
   * Get initials from name for avatar placeholder
   */
  var getInitials = function getInitials(name) {
    if (!name) return '';
    return name.split(' ').map(function (word) {
      return word[0];
    }).join('').toUpperCase().slice(0, 2);
  };
  /**
   * Format meeting day and time for display
   */
  var formatMeetingTime = function formatMeetingTime(day, time) {
    return "".concat(day, "s at ").concat(time);
  };
  // Loading state
  if (isLoading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "text-center py-16",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-600",
        children: "Loading group details..."
      })]
    });
  }
  // Not found state
  if (!group) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "text-center py-16",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-2xl font-bold text-neutral-900 mb-4",
        children: "Group Not Found"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-600 mb-6",
        children: "The group you're looking for doesn't exist."
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__.Button, {
        onClick: handleBack,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: "h-4 w-4 mr-2"
        }), "Back to Small Groups"]
      })]
    });
  }
  var isActive = group.status !== 'inactive';
  var memberCount = group.member_count || 0;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "mb-6",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__.Button, {
        variant: "ghost",
        onClick: handleBack,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: "h-4 w-4 mr-2"
        }), "Back to Small Groups"]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl overflow-hidden mb-8",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "px-8 py-12",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex flex-col md:flex-row md:items-center md:justify-between gap-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex-1",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center gap-3 mb-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                className: "text-3xl font-bold text-white",
                children: group.name
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_15__.Badge, {
                variant: isActive ? 'success' : 'neutral',
                children: isActive ? 'Active' : 'Inactive'
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center gap-3 mb-4",
              children: [group.leader_photo ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                src: group.leader_photo,
                alt: group.leader_name,
                className: "w-12 h-12 rounded-full object-cover border-2 border-white/30"
              }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-sm font-medium text-white",
                  children: getInitials(group.leader_name)
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                  className: "text-sm text-white/80",
                  children: "Led by"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                  className: "text-lg font-medium text-white",
                  children: group.leader_name
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex flex-wrap gap-6 text-white/90",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
                  className: "h-5 w-5"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                  className: "text-sm",
                  children: [memberCount, " ", memberCount === 1 ? 'member' : 'members']
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                  className: "h-5 w-5"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-sm",
                  children: formatMeetingTime(group.meeting_day, group.meeting_time)
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
                  className: "h-5 w-5"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-sm",
                  children: group.location
                })]
              })]
            })]
          }), group.image && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "w-full md:w-48 h-48 rounded-lg overflow-hidden border-4 border-white/20",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
              src: group.image,
              alt: group.name,
              className: "w-full h-full object-cover"
            })
          })]
        })
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "border-b border-neutral-200 mb-8",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "flex gap-1 overflow-x-auto",
        children: tabs.map(function (tab) {
          var Icon = tab.icon;
          var isActiveTab = activeTab === tab.id;
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
            onClick: function onClick() {
              return setActiveTab(tab.id);
            },
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_18__.cn)('flex items-center gap-2 px-6 py-3 border-b-2 transition-all duration-200 whitespace-nowrap', isActiveTab ? 'border-primary-600 text-primary-600 font-medium' : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'),
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
              className: "h-5 w-5"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: tab.label
            })]
          }, tab.id);
        })
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "pb-8",
      children: [activeTab === 'overview' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OverviewTab, {
        group: group
      }), activeTab === 'members' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MembersTab, {
        group: group,
        isAdmin: isAdmin
      }), activeTab === 'schedule' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ScheduleTab, {
        group: group
      }), activeTab === 'resources' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ResourcesTab, {
        group: group
      }), activeTab === 'activity' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ActivityTab, {
        group: group
      })]
    })]
  });
};
/**
 * Overview Tab Component
 */
var OverviewTab = function OverviewTab(_ref2) {
  var group = _ref2.group;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
      className: "lg:col-span-2",
      padding: "lg",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-xl font-semibold text-neutral-900 mb-4",
        children: "About This Group"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-700 leading-relaxed",
        children: group.description || 'No description available.'
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
      padding: "lg",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-xl font-semibold text-neutral-900 mb-6",
        children: "Meeting Details"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-start gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
            className: "h-5 w-5 text-primary-600 mt-0.5"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm font-medium text-neutral-900",
              children: "Schedule"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
              className: "text-sm text-neutral-600",
              children: [group.meeting_day, "s at ", group.meeting_time]
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-start gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
            className: "h-5 w-5 text-primary-600 mt-0.5"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm font-medium text-neutral-900",
              children: "Location"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-600",
              children: group.location
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-start gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
            className: "h-5 w-5 text-primary-600 mt-0.5"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm font-medium text-neutral-900",
              children: "Leader"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-600",
              children: group.leader_name
            })]
          })]
        })]
      })]
    })]
  });
};
/**
 * Members Tab Component
 */
var MembersTab = function MembersTab(_ref3) {
  var group = _ref3.group,
    isAdmin = _ref3.isAdmin;
  var members = group.members || [];
  /**
   * Get initials from name for avatar placeholder
   */
  var getInitials = function getInitials(name) {
    if (!name) return '';
    return name.split(' ').map(function (word) {
      return word[0];
    }).join('').toUpperCase().slice(0, 2);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex items-center justify-between mb-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
        className: "text-xl font-semibold text-neutral-900",
        children: ["Members (", members.length, ")"]
      }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_14__.Button, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
          className: "h-4 w-4 mr-2"
        }), "Add Member"]
      })]
    }), members.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
      className: "text-center py-12",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "h-12 w-12 text-neutral-400 mx-auto mb-4"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-600",
        children: "No members in this group yet."
      })]
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
      children: members.map(function (member) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
          padding: "md",
          hoverable: true,
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [member.photo ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
              src: member.photo,
              alt: member.name,
              className: "w-12 h-12 rounded-full object-cover"
            }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-medium text-primary-700",
                children: getInitials(member.name)
              })
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex-1 min-w-0",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "font-medium text-neutral-900 truncate",
                children: member.name
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-sm text-neutral-600",
                children: "Member"
              })]
            })]
          })
        }, member.id);
      })
    })]
  });
};
/**
 * Schedule Tab Component
 */
var ScheduleTab = function ScheduleTab(_ref4) {
  var group = _ref4.group;
  // Mock data for upcoming and past meetings
  var upcomingMeetings = [{
    id: 1,
    date: '2024-01-15',
    time: group.meeting_time,
    topic: 'Bible Study: Romans Chapter 8',
    location: group.location
  }, {
    id: 2,
    date: '2024-01-22',
    time: group.meeting_time,
    topic: 'Prayer and Fellowship',
    location: group.location
  }];
  var pastMeetings = [{
    id: 3,
    date: '2024-01-08',
    time: group.meeting_time,
    topic: 'Bible Study: Romans Chapter 7',
    attendance: 12
  }, {
    id: 4,
    date: '2024-01-01',
    time: group.meeting_time,
    topic: 'New Year Fellowship',
    attendance: 15
  }];
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-8",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-xl font-semibold text-neutral-900 mb-4",
        children: "Upcoming Meetings"
      }), upcomingMeetings.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
        className: "text-center py-12",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
          className: "h-12 w-12 text-neutral-400 mx-auto mb-4"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-neutral-600",
          children: "No upcoming meetings scheduled."
        })]
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "space-y-4",
        children: upcomingMeetings.map(function (meeting) {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
            padding: "md",
            hoverable: true,
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-start gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-shrink-0 w-16 text-center",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "bg-primary-100 rounded-lg p-2",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs font-medium text-primary-600 uppercase",
                    children: new Date(meeting.date).toLocaleDateString('en-US', {
                      month: 'short'
                    })
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-2xl font-bold text-primary-700",
                    children: new Date(meeting.date).getDate()
                  })]
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-1",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                  className: "font-semibold text-neutral-900 mb-2",
                  children: meeting.topic
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex flex-wrap gap-4 text-sm text-neutral-600",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                      className: "h-4 w-4"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      children: meeting.time
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
                      className: "h-4 w-4"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      children: meeting.location
                    })]
                  })]
                })]
              })]
            })
          }, meeting.id);
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-xl font-semibold text-neutral-900 mb-4",
        children: "Past Meetings"
      }), pastMeetings.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
        className: "text-center py-12",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
          className: "h-12 w-12 text-neutral-400 mx-auto mb-4"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-neutral-600",
          children: "No past meetings recorded."
        })]
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "space-y-4",
        children: pastMeetings.map(function (meeting) {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
            padding: "md",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-start gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-shrink-0 w-16 text-center",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "bg-neutral-100 rounded-lg p-2",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs font-medium text-neutral-600 uppercase",
                    children: new Date(meeting.date).toLocaleDateString('en-US', {
                      month: 'short'
                    })
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-2xl font-bold text-neutral-700",
                    children: new Date(meeting.date).getDate()
                  })]
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-1",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                  className: "font-semibold text-neutral-900 mb-2",
                  children: meeting.topic
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex flex-wrap gap-4 text-sm text-neutral-600",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                      className: "h-4 w-4"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      children: meeting.time
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
                      className: "h-4 w-4"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                      children: [meeting.attendance, " attended"]
                    })]
                  })]
                })]
              })]
            })
          }, meeting.id);
        })
      })]
    })]
  });
};
/**
 * Resources Tab Component
 */
var ResourcesTab = function ResourcesTab(_ref5) {
  var group = _ref5.group;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
    className: "text-center py-16",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: "h-16 w-16 text-neutral-400 mx-auto mb-4"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
      className: "text-lg font-semibold text-neutral-900 mb-2",
      children: "No Resources Yet"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      className: "text-neutral-600",
      children: "Study materials and shared documents will appear here."
    })]
  });
};
/**
 * Activity Tab Component
 */
var ActivityTab = function ActivityTab(_ref6) {
  var group = _ref6.group;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
    className: "text-center py-16",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: "h-16 w-16 text-neutral-400 mx-auto mb-4"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
      className: "text-lg font-semibold text-neutral-900 mb-2",
      children: "No Activity Yet"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      className: "text-neutral-600",
      children: "Recent activities and attendance history will appear here."
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupDetail);

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

/***/ "./node_modules/lucide-react/dist/esm/icons/map-pin.js"
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/map-pin.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ MapPin)
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
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("map-pin", __iconNode);


//# sourceMappingURL=map-pin.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/user-plus.js"
/*!***************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/user-plus.js ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ UserPlus)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("user-plus", __iconNode);


//# sourceMappingURL=user-plus.js.map


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0dyb3VwRGV0YWlsX3RzeC5qcz9pZD05MTE2YjcyZjU4YjQ0ODA0IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0Q7QUFDaEM7QUFDZ0I7QUFDVjtBQUNyQyxJQUFNTyxhQUFhLEdBQUdGLDZEQUFHLENBQUMsMkhBQTJILEVBQUU7RUFDbkpHLFFBQVEsRUFBRTtJQUNOQyxPQUFPLEVBQUU7TUFDTEMsT0FBTyxFQUFFLDJFQUEyRTtNQUNwRkMsT0FBTyxFQUFFLHNGQUFzRjtNQUMvRkMsT0FBTyxFQUFFLHNGQUFzRjtNQUMvRkMsS0FBSyxFQUFFLDhFQUE4RTtNQUNyRkMsTUFBTSxFQUFFLDhFQUE4RTtNQUN0RkMsT0FBTyxFQUFFLDJFQUEyRTtNQUNwRkMsT0FBTyxFQUFFO0lBQ2IsQ0FBQztJQUNEQyxJQUFJLEVBQUU7TUFDRkMsRUFBRSxFQUFFLHdCQUF3QjtNQUM1QkMsRUFBRSxFQUFFLDRCQUE0QjtNQUNoQ0MsRUFBRSxFQUFFO0lBQ1IsQ0FBQztJQUNEQyxLQUFLLEVBQUU7TUFDSEMsT0FBTyxFQUFFLFlBQVk7TUFDckJDLElBQUksRUFBRTtJQUNWO0VBQ0osQ0FBQztFQUNEQyxlQUFlLEVBQUU7SUFDYmYsT0FBTyxFQUFFLFNBQVM7SUFDbEJRLElBQUksRUFBRSxJQUFJO0lBQ1ZJLEtBQUssRUFBRTtFQUNYO0FBQ0osQ0FBQyxDQUFDO0FBQ0YsSUFBTUksS0FBSyxnQkFBR3JCLDZDQUFnQixDQUFDLFVBQUF1QixJQUFBLEVBQWdFQyxHQUFHLEVBQUs7RUFBQSxJQUFyRUMsU0FBUyxHQUFBRixJQUFBLENBQVRFLFNBQVM7SUFBRXBCLE9BQU8sR0FBQWtCLElBQUEsQ0FBUGxCLE9BQU87SUFBRVEsSUFBSSxHQUFBVSxJQUFBLENBQUpWLElBQUk7SUFBRUksS0FBSyxHQUFBTSxJQUFBLENBQUxOLEtBQUs7SUFBRVMsSUFBSSxHQUFBSCxJQUFBLENBQUpHLElBQUk7SUFBRUMsUUFBUSxH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QWEsc0RBQXNEO0FBQ25FLGFBQWEsdURBQXVEO0FBQ3BFO0FBQ0EsaUJBQWlCLGdFQUFnQjs7QUFFVTtBQUMzQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3VpL2JhZGdlLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvbGliL3NtYWxsR3JvdXBBcGkudHMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL3BhZ2VzL0dyb3VwRGV0YWlsLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2Nsb2NrLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvbWFwLXBpbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3VzZXItcGx1cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjdmEgfSBmcm9tIFwiY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCIuLi8uLi9saWIvdXRpbHNcIjtcbmNvbnN0IGJhZGdlVmFyaWFudHMgPSBjdmEoXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLW9mZnNldC0yXCIsIHtcbiAgICB2YXJpYW50czoge1xuICAgICAgICB2YXJpYW50OiB7XG4gICAgICAgICAgICBwcmltYXJ5OiBcImJnLXByaW1hcnktMTAwIHRleHQtcHJpbWFyeS03MDAgYm9yZGVyLXByaW1hcnktMjAwIGZvY3VzOnJpbmctcHJpbWFyeS01MDBcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IFwiYmctc3VjY2Vzcy1saWdodCB0ZXh0LXN1Y2Nlc3MtZGFyayBib3JkZXItc3VjY2Vzcy1ERUZBVUxUIGZvY3VzOnJpbmctc3VjY2Vzcy1ERUZBVUxUXCIsXG4gICAgICAgICAgICB3YXJuaW5nOiBcImJnLXdhcm5pbmctbGlnaHQgdGV4dC13YXJuaW5nLWRhcmsgYm9yZGVyLXdhcm5pbmctREVGQVVMVCBmb2N1czpyaW5nLXdhcm5pbmctREVGQVVMVFwiLFxuICAgICAgICAgICAgZXJyb3I6IFwiYmctZXJyb3ItbGlnaHQgdGV4dC1lcnJvci1kYXJrIGJvcmRlci1lcnJvci1ERUZBVUxUIGZvY3VzOnJpbmctZXJyb3ItREVGQVVMVFwiLFxuICAgICAgICAgICAgZGFuZ2VyOiBcImJnLWVycm9yLWxpZ2h0IHRleHQtZXJyb3ItZGFyayBib3JkZXItZXJyb3ItREVGQVVMVCBmb2N1czpyaW5nLWVycm9yLURFRkFVTFRcIixcbiAgICAgICAgICAgIG5ldXRyYWw6IFwiYmctbmV1dHJhbC0xMDAgdGV4dC1uZXV0cmFsLTcwMCBib3JkZXItbmV1dHJhbC0zMDAgZm9jdXM6cmluZy1uZXV0cmFsLTUwMFwiLFxuICAgICAgICAgICAgb3V0bGluZTogXCJiZy10cmFuc3BhcmVudCB0ZXh0LW5ldXRyYWwtNzAwIGJvcmRlciBib3JkZXItbmV1dHJhbC0zMDAgZm9jdXM6cmluZy1uZXV0cmFsLTUwMFwiLFxuICAgICAgICB9LFxuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICBzbTogXCJoLTUgcHgtMiB0ZXh0LXhzIGdhcC0xXCIsXG4gICAgICAgICAgICBtZDogXCJoLTYgcHgtMi41IHRleHQtc20gZ2FwLTEuNVwiLFxuICAgICAgICAgICAgbGc6IFwiaC03IHB4LTMgdGV4dC1iYXNlIGdhcC0yXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICByb3VuZGVkOiBcInJvdW5kZWQtbWRcIixcbiAgICAgICAgICAgIHBpbGw6IFwicm91bmRlZC1mdWxsXCIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBkZWZhdWx0VmFyaWFudHM6IHtcbiAgICAgICAgdmFyaWFudDogXCJuZXV0cmFsXCIsXG4gICAgICAgIHNpemU6IFwibWRcIixcbiAgICAgICAgc2hhcGU6IFwicm91bmRlZFwiLFxuICAgIH0sXG59KTtcbmNvbnN0IEJhZGdlID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIHZhcmlhbnQsIHNpemUsIHNoYXBlLCBpY29uLCBjaGlsZHJlbiwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgcmV0dXJuIChfanN4cyhcInNwYW5cIiwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihiYWRnZVZhcmlhbnRzKHsgdmFyaWFudCwgc2l6ZSwgc2hhcGUgfSksIGNsYXNzTmFtZSksIC4uLnByb3BzLCBjaGlsZHJlbjogW2ljb24gJiYgKF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlclwiLCBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLCBjaGlsZHJlbjogaWNvbiB9KSksIGNoaWxkcmVuXSB9KSk7XG59KTtcbkJhZGdlLmRpc3BsYXlOYW1lID0gXCJCYWRnZVwiO1xuZXhwb3J0IHsgQmFkZ2UsIGJhZGdlVmFyaWFudHMgfTtcbiIsImltcG9ydCBhcGkgZnJvbSAnLi9hcGknO1xuLyoqXG4gKiBTbWFsbCBHcm91cCBBUEkgY2xpZW50XG4gKlxuICogUHJvdmlkZXMgbWV0aG9kcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgc21hbGwgZ3JvdXBzIEFQSSBlbmRwb2ludHMuXG4gKi9cbmV4cG9ydCBjb25zdCBzbWFsbEdyb3VwQXBpID0ge1xuICAgIC8qKlxuICAgICAqIEdldCBhbGwgc21hbGwgZ3JvdXBzXG4gICAgICovXG4gICAgYXN5bmMgZ2V0U21hbGxHcm91cHMoKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL3NtYWxsLWdyb3VwcycpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhIHx8IFtdO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogR2V0IGEgc2luZ2xlIHNtYWxsIGdyb3VwIGJ5IElEXG4gICAgICovXG4gICAgYXN5bmMgZ2V0U21hbGxHcm91cChpZCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9zbWFsbC1ncm91cHMvJHtpZH1gKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBzbWFsbCBncm91cFxuICAgICAqL1xuICAgIGFzeW5jIGNyZWF0ZVNtYWxsR3JvdXAoZGF0YSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KCcvc21hbGwtZ3JvdXBzJywgZGF0YSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW4gZXhpc3Rpbmcgc21hbGwgZ3JvdXBcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVTbWFsbEdyb3VwKGlkLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChgL3NtYWxsLWdyb3Vwcy8ke2lkfWAsIGRhdGEpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgc21hbGwgZ3JvdXBcbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVTbWFsbEdyb3VwKGlkKSB7XG4gICAgICAgIGF3YWl0IGFwaS5kZWxldGUoYC9zbWFsbC1ncm91cHMvJHtpZH1gKTtcbiAgICB9LFxufTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUGFyYW1zLCB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgSW5mbywgVXNlcnMsIENhbGVuZGFyLCBGaWxlVGV4dCwgQWN0aXZpdHksIEFycm93TGVmdCwgTWFwUGluLCBDbG9jaywgVXNlclBsdXMgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gJy4uL2NvbnRleHRzL0F1dGhDb250ZXh0JztcbmltcG9ydCB7IHVzZVRvYXN0IH0gZnJvbSAnLi4vY29udGV4dHMvVG9hc3RDb250ZXh0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvYnV0dG9uJztcbmltcG9ydCB7IEJhZGdlIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9iYWRnZSc7XG5pbXBvcnQgeyBDYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9jYXJkJztcbmltcG9ydCB7IHNtYWxsR3JvdXBBcGkgfSBmcm9tICcuLi9saWIvc21hbGxHcm91cEFwaSc7XG5pbXBvcnQgeyBjbiB9IGZyb20gJy4uL2xpYi91dGlscyc7XG4vKipcbiAqIFRhYiBjb25maWd1cmF0aW9uXG4gKi9cbmNvbnN0IHRhYnMgPSBbXG4gICAgeyBpZDogJ292ZXJ2aWV3JywgbGFiZWw6ICdPdmVydmlldycsIGljb246IEluZm8gfSxcbiAgICB7IGlkOiAnbWVtYmVycycsIGxhYmVsOiAnTWVtYmVycycsIGljb246IFVzZXJzIH0sXG4gICAgeyBpZDogJ3NjaGVkdWxlJywgbGFiZWw6ICdTY2hlZHVsZScsIGljb246IENhbGVuZGFyIH0sXG4gICAgeyBpZDogJ3Jlc291cmNlcycsIGxhYmVsOiAnUmVzb3VyY2VzJywgaWNvbjogRmlsZVRleHQgfSxcbiAgICB7IGlkOiAnYWN0aXZpdHknLCBsYWJlbDogJ0FjdGl2aXR5JywgaWNvbjogQWN0aXZpdHkgfSxcbl07XG4vKipcbiAqIEdyb3VwRGV0YWlsIFBhZ2UgQ29tcG9uZW50XG4gKlxuICogRGlzcGxheXMgZGV0YWlsZWQgaW5mb3JtYXRpb24gYWJvdXQgYSBzbWFsbCBncm91cCB3aXRoIG11bHRpcGxlIHRhYnMuXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIEhlcm8gc2VjdGlvbiB3aXRoIGdyYWRpZW50IGJhY2tncm91bmRcbiAqIC0gVGFiIG5hdmlnYXRpb24gKE92ZXJ2aWV3LCBNZW1iZXJzLCBTY2hlZHVsZSwgUmVzb3VyY2VzLCBBY3Rpdml0eSlcbiAqIC0gT3ZlcnZpZXcgdGFiIHdpdGggZGVzY3JpcHRpb24gYW5kIG1lZXRpbmcgZGV0YWlsc1xuICogLSBNZW1iZXJzIHRhYiB3aXRoIG1lbWJlciBsaXN0IGFuZCBcIkFkZCBNZW1iZXJcIiBidXR0b25cbiAqIC0gU2NoZWR1bGUgdGFiIHdpdGggdXBjb21pbmcgYW5kIHBhc3QgbWVldGluZ3NcbiAqIC0gUmVzcG9uc2l2ZSBkZXNpZ25cbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiA4LjQsIDguNVxuICogRGVzaWduIFJlZmVyZW5jZTogR3JvdXAgRGV0YWlsIFZpZXcgc2VjdGlvblxuICovXG5jb25zdCBHcm91cERldGFpbCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGlkIH0gPSB1c2VQYXJhbXMoKTtcbiAgICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG4gICAgY29uc3QgeyB1c2VyIH0gPSB1c2VBdXRoKCk7XG4gICAgY29uc3QgeyBzaG93VG9hc3QgfSA9IHVzZVRvYXN0KCk7XG4gICAgY29uc3QgaXNBZG1pbiA9IHVzZXI/LnJvbGUgPT09ICdhZG1pbic7XG4gICAgLy8gU3RhdGUgbWFuYWdlbWVudFxuICAgIGNvbnN0IFtncm91cCwgc2V0R3JvdXBdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZSgnb3ZlcnZpZXcnKTtcbiAgICAvKipcbiAgICAgKiBMb2FkIGdyb3VwIGRldGFpbHMgb24gbW91bnRcbiAgICAgKi9cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIGxvYWRHcm91cERldGFpbHMocGFyc2VJbnQoaWQpKTtcbiAgICAgICAgfVxuICAgIH0sIFtpZF0pO1xuICAgIC8qKlxuICAgICAqIEZldGNoIGdyb3VwIGRldGFpbHMgZnJvbSBBUElcbiAgICAgKi9cbiAgICBjb25zdCBsb2FkR3JvdXBEZXRhaWxzID0gYXN5bmMgKGdyb3VwSWQpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBzbWFsbEdyb3VwQXBpLmdldFNtYWxsR3JvdXAoZ3JvdXBJZCk7XG4gICAgICAgICAgICBzZXRHcm91cChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIGxvYWQgZ3JvdXAgZGV0YWlscycpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBncm91cCBkZXRhaWxzOicsIGVycm9yKTtcbiAgICAgICAgICAgIG5hdmlnYXRlKCcvc21hbGwtZ3JvdXBzJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYmFjayBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgICAgICBuYXZpZ2F0ZSgnL3NtYWxsLWdyb3VwcycpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGluaXRpYWxzIGZyb20gbmFtZSBmb3IgYXZhdGFyIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgY29uc3QgZ2V0SW5pdGlhbHMgPSAobmFtZSkgPT4ge1xuICAgICAgICBpZiAoIW5hbWUpXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIHJldHVybiBuYW1lXG4gICAgICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAgICAgLm1hcCh3b3JkID0+IHdvcmRbMF0pXG4gICAgICAgICAgICAuam9pbignJylcbiAgICAgICAgICAgIC50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAuc2xpY2UoMCwgMik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGb3JtYXQgbWVldGluZyBkYXkgYW5kIHRpbWUgZm9yIGRpc3BsYXlcbiAgICAgKi9cbiAgICBjb25zdCBmb3JtYXRNZWV0aW5nVGltZSA9IChkYXksIHRpbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIGAke2RheX1zIGF0ICR7dGltZX1gO1xuICAgIH07XG4gICAgLy8gTG9hZGluZyBzdGF0ZVxuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xNlwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW5saW5lLWJsb2NrIGFuaW1hdGUtc3BpbiByb3VuZGVkLWZ1bGwgaC0xMiB3LTEyIGJvcmRlci1iLTIgYm9yZGVyLXByaW1hcnktNjAwIG1iLTRcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nIGdyb3VwIGRldGFpbHMuLi5cIiB9KV0gfSkpO1xuICAgIH1cbiAgICAvLyBOb3QgZm91bmQgc3RhdGVcbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1jZW50ZXIgcHktMTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtbmV1dHJhbC05MDAgbWItNFwiLCBjaGlsZHJlbjogXCJHcm91cCBOb3QgRm91bmRcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1uZXV0cmFsLTYwMCBtYi02XCIsIGNoaWxkcmVuOiBcIlRoZSBncm91cCB5b3UncmUgbG9va2luZyBmb3IgZG9lc24ndCBleGlzdC5cIiB9KSwgX2pzeHMoQnV0dG9uLCB7IG9uQ2xpY2s6IGhhbmRsZUJhY2ssIGNoaWxkcmVuOiBbX2pzeChBcnJvd0xlZnQsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMlwiIH0pLCBcIkJhY2sgdG8gU21hbGwgR3JvdXBzXCJdIH0pXSB9KSk7XG4gICAgfVxuICAgIGNvbnN0IGlzQWN0aXZlID0gZ3JvdXAuc3RhdHVzICE9PSAnaW5hY3RpdmUnO1xuICAgIGNvbnN0IG1lbWJlckNvdW50ID0gZ3JvdXAubWVtYmVyX2NvdW50IHx8IDA7XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtYi02XCIsIGNoaWxkcmVuOiBfanN4cyhCdXR0b24sIHsgdmFyaWFudDogXCJnaG9zdFwiLCBvbkNsaWNrOiBoYW5kbGVCYWNrLCBjaGlsZHJlbjogW19qc3goQXJyb3dMZWZ0LCB7IGNsYXNzTmFtZTogXCJoLTQgdy00IG1yLTJcIiB9KSwgXCJCYWNrIHRvIFNtYWxsIEdyb3Vwc1wiXSB9KSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy1ncmFkaWVudC10by1yIGZyb20tcHJpbWFyeS02MDAgdG8tcHJpbWFyeS04MDAgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gbWItOFwiLCBjaGlsZHJlbjogX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweC04IHB5LTEyXCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IG1kOml0ZW1zLWNlbnRlciBtZDpqdXN0aWZ5LWJldHdlZW4gZ2FwLTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTFcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBtYi00XCIsIGNoaWxkcmVuOiBbX2pzeChcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCIsIGNoaWxkcmVuOiBncm91cC5uYW1lIH0pLCBfanN4KEJhZGdlLCB7IHZhcmlhbnQ6IGlzQWN0aXZlID8gJ3N1Y2Nlc3MnIDogJ25ldXRyYWwnLCBjaGlsZHJlbjogaXNBY3RpdmUgPyAnQWN0aXZlJyA6ICdJbmFjdGl2ZScgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBtYi00XCIsIGNoaWxkcmVuOiBbZ3JvdXAubGVhZGVyX3Bob3RvID8gKF9qc3goXCJpbWdcIiwgeyBzcmM6IGdyb3VwLmxlYWRlcl9waG90bywgYWx0OiBncm91cC5sZWFkZXJfbmFtZSwgY2xhc3NOYW1lOiBcInctMTIgaC0xMiByb3VuZGVkLWZ1bGwgb2JqZWN0LWNvdmVyIGJvcmRlci0yIGJvcmRlci13aGl0ZS8zMFwiIH0pKSA6IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctMTIgaC0xMiByb3VuZGVkLWZ1bGwgYmctd2hpdGUvMjAgYm9yZGVyLTIgYm9yZGVyLXdoaXRlLzMwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIGNoaWxkcmVuOiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtd2hpdGVcIiwgY2hpbGRyZW46IGdldEluaXRpYWxzKGdyb3VwLmxlYWRlcl9uYW1lKSB9KSB9KSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtd2hpdGUvODBcIiwgY2hpbGRyZW46IFwiTGVkIGJ5XCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW0gdGV4dC13aGl0ZVwiLCBjaGlsZHJlbjogZ3JvdXAubGVhZGVyX25hbWUgfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LXdyYXAgZ2FwLTYgdGV4dC13aGl0ZS85MFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChVc2VycywgeyBjbGFzc05hbWU6IFwiaC01IHctNVwiIH0pLCBfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbVwiLCBjaGlsZHJlbjogW21lbWJlckNvdW50LCBcIiBcIiwgbWVtYmVyQ291bnQgPT09IDEgPyAnbWVtYmVyJyA6ICdtZW1iZXJzJ10gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goQ2FsZW5kYXIsIHsgY2xhc3NOYW1lOiBcImgtNSB3LTVcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbVwiLCBjaGlsZHJlbjogZm9ybWF0TWVldGluZ1RpbWUoZ3JvdXAubWVldGluZ19kYXksIGdyb3VwLm1lZXRpbmdfdGltZSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goTWFwUGluLCB7IGNsYXNzTmFtZTogXCJoLTUgdy01XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc21cIiwgY2hpbGRyZW46IGdyb3VwLmxvY2F0aW9uIH0pXSB9KV0gfSldIH0pLCBncm91cC5pbWFnZSAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ3LWZ1bGwgbWQ6dy00OCBoLTQ4IHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlci00IGJvcmRlci13aGl0ZS8yMFwiLCBjaGlsZHJlbjogX2pzeChcImltZ1wiLCB7IHNyYzogZ3JvdXAuaW1hZ2UsIGFsdDogZ3JvdXAubmFtZSwgY2xhc3NOYW1lOiBcInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyXCIgfSkgfSkpXSB9KSB9KSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJib3JkZXItYiBib3JkZXItbmV1dHJhbC0yMDAgbWItOFwiLCBjaGlsZHJlbjogX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGdhcC0xIG92ZXJmbG93LXgtYXV0b1wiLCBjaGlsZHJlbjogdGFicy5tYXAoKHRhYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IHRhYi5pY29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmVUYWIgPSBhY3RpdmVUYWIgPT09IHRhYi5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRBY3RpdmVUYWIodGFiLmlkKSwgY2xhc3NOYW1lOiBjbignZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNiBweS0zIGJvcmRlci1iLTIgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwIHdoaXRlc3BhY2Utbm93cmFwJywgaXNBY3RpdmVUYWJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLXByaW1hcnktNjAwIHRleHQtcHJpbWFyeS02MDAgZm9udC1tZWRpdW0nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci10cmFuc3BhcmVudCB0ZXh0LW5ldXRyYWwtNjAwIGhvdmVyOnRleHQtbmV1dHJhbC05MDAgaG92ZXI6Ym9yZGVyLW5ldXRyYWwtMzAwJyksIGNoaWxkcmVuOiBbX2pzeChJY29uLCB7IGNsYXNzTmFtZTogXCJoLTUgdy01XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2hpbGRyZW46IHRhYi5sYWJlbCB9KV0gfSwgdGFiLmlkKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwYi04XCIsIGNoaWxkcmVuOiBbYWN0aXZlVGFiID09PSAnb3ZlcnZpZXcnICYmIF9qc3goT3ZlcnZpZXdUYWIsIHsgZ3JvdXA6IGdyb3VwIH0pLCBhY3RpdmVUYWIgPT09ICdtZW1iZXJzJyAmJiBfanN4KE1lbWJlcnNUYWIsIHsgZ3JvdXA6IGdyb3VwLCBpc0FkbWluOiBpc0FkbWluIH0pLCBhY3RpdmVUYWIgPT09ICdzY2hlZHVsZScgJiYgX2pzeChTY2hlZHVsZVRhYiwgeyBncm91cDogZ3JvdXAgfSksIGFjdGl2ZVRhYiA9PT0gJ3Jlc291cmNlcycgJiYgX2pzeChSZXNvdXJjZXNUYWIsIHsgZ3JvdXA6IGdyb3VwIH0pLCBhY3RpdmVUYWIgPT09ICdhY3Rpdml0eScgJiYgX2pzeChBY3Rpdml0eVRhYiwgeyBncm91cDogZ3JvdXAgfSldIH0pXSB9KSk7XG59O1xuLyoqXG4gKiBPdmVydmlldyBUYWIgQ29tcG9uZW50XG4gKi9cbmNvbnN0IE92ZXJ2aWV3VGFiID0gKHsgZ3JvdXAgfSkgPT4ge1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMyBnYXAtNlwiLCBjaGlsZHJlbjogW19qc3hzKENhcmQsIHsgY2xhc3NOYW1lOiBcImxnOmNvbC1zcGFuLTJcIiwgcGFkZGluZzogXCJsZ1wiLCBjaGlsZHJlbjogW19qc3goXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMCBtYi00XCIsIGNoaWxkcmVuOiBcIkFib3V0IFRoaXMgR3JvdXBcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1uZXV0cmFsLTcwMCBsZWFkaW5nLXJlbGF4ZWRcIiwgY2hpbGRyZW46IGdyb3VwLmRlc2NyaXB0aW9uIHx8ICdObyBkZXNjcmlwdGlvbiBhdmFpbGFibGUuJyB9KV0gfSksIF9qc3hzKENhcmQsIHsgcGFkZGluZzogXCJsZ1wiLCBjaGlsZHJlbjogW19qc3goXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMCBtYi02XCIsIGNoaWxkcmVuOiBcIk1lZXRpbmcgRGV0YWlsc1wiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0zXCIsIGNoaWxkcmVuOiBbX2pzeChDYWxlbmRhciwgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LXByaW1hcnktNjAwIG10LTAuNVwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIlNjaGVkdWxlXCIgfSksIF9qc3hzKFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFtncm91cC5tZWV0aW5nX2RheSwgXCJzIGF0IFwiLCBncm91cC5tZWV0aW5nX3RpbWVdIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQgZ2FwLTNcIiwgY2hpbGRyZW46IFtfanN4KE1hcFBpbiwgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LXByaW1hcnktNjAwIG10LTAuNVwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkxvY2F0aW9uXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogZ3JvdXAubG9jYXRpb24gfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1zdGFydCBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goVXNlcnMsIHsgY2xhc3NOYW1lOiBcImgtNSB3LTUgdGV4dC1wcmltYXJ5LTYwMCBtdC0wLjVcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJMZWFkZXJcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBncm91cC5sZWFkZXJfbmFtZSB9KV0gfSldIH0pXSB9KV0gfSldIH0pKTtcbn07XG4vKipcbiAqIE1lbWJlcnMgVGFiIENvbXBvbmVudFxuICovXG5jb25zdCBNZW1iZXJzVGFiID0gKHsgZ3JvdXAsIGlzQWRtaW4gfSkgPT4ge1xuICAgIGNvbnN0IG1lbWJlcnMgPSBncm91cC5tZW1iZXJzIHx8IFtdO1xuICAgIC8qKlxuICAgICAqIEdldCBpbml0aWFscyBmcm9tIG5hbWUgZm9yIGF2YXRhciBwbGFjZWhvbGRlclxuICAgICAqL1xuICAgIGNvbnN0IGdldEluaXRpYWxzID0gKG5hbWUpID0+IHtcbiAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICByZXR1cm4gbmFtZVxuICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgIC5tYXAod29yZCA9PiB3b3JkWzBdKVxuICAgICAgICAgICAgLmpvaW4oJycpXG4gICAgICAgICAgICAudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgLnNsaWNlKDAsIDIpO1xuICAgIH07XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBbXCJNZW1iZXJzIChcIiwgbWVtYmVycy5sZW5ndGgsIFwiKVwiXSB9KSwgaXNBZG1pbiAmJiAoX2pzeHMoQnV0dG9uLCB7IGNoaWxkcmVuOiBbX2pzeChVc2VyUGx1cywgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yXCIgfSksIFwiQWRkIE1lbWJlclwiXSB9KSldIH0pLCBtZW1iZXJzLmxlbmd0aCA9PT0gMCA/IChfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xMlwiLCBjaGlsZHJlbjogW19qc3goVXNlcnMsIHsgY2xhc3NOYW1lOiBcImgtMTIgdy0xMiB0ZXh0LW5ldXRyYWwtNDAwIG14LWF1dG8gbWItNFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIk5vIG1lbWJlcnMgaW4gdGhpcyBncm91cCB5ZXQuXCIgfSldIH0pKSA6IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgZ2FwLTRcIiwgY2hpbGRyZW46IG1lbWJlcnMubWFwKChtZW1iZXIpID0+IChfanN4KENhcmQsIHsgcGFkZGluZzogXCJtZFwiLCBob3ZlcmFibGU6IHRydWUsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW21lbWJlci5waG90byA/IChfanN4KFwiaW1nXCIsIHsgc3JjOiBtZW1iZXIucGhvdG8sIGFsdDogbWVtYmVyLm5hbWUsIGNsYXNzTmFtZTogXCJ3LTEyIGgtMTIgcm91bmRlZC1mdWxsIG9iamVjdC1jb3ZlclwiIH0pKSA6IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctMTIgaC0xMiByb3VuZGVkLWZ1bGwgYmctcHJpbWFyeS0xMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgY2hpbGRyZW46IF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1wcmltYXJ5LTcwMFwiLCBjaGlsZHJlbjogZ2V0SW5pdGlhbHMobWVtYmVyLm5hbWUpIH0pIH0pKSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xIG1pbi13LTBcIiwgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwIHRydW5jYXRlXCIsIGNoaWxkcmVuOiBtZW1iZXIubmFtZSB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIk1lbWJlclwiIH0pXSB9KV0gfSkgfSwgbWVtYmVyLmlkKSkpIH0pKV0gfSkpO1xufTtcbi8qKlxuICogU2NoZWR1bGUgVGFiIENvbXBvbmVudFxuICovXG5jb25zdCBTY2hlZHVsZVRhYiA9ICh7IGdyb3VwIH0pID0+IHtcbiAgICAvLyBNb2NrIGRhdGEgZm9yIHVwY29taW5nIGFuZCBwYXN0IG1lZXRpbmdzXG4gICAgY29uc3QgdXBjb21pbmdNZWV0aW5ncyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBkYXRlOiAnMjAyNC0wMS0xNScsXG4gICAgICAgICAgICB0aW1lOiBncm91cC5tZWV0aW5nX3RpbWUsXG4gICAgICAgICAgICB0b3BpYzogJ0JpYmxlIFN0dWR5OiBSb21hbnMgQ2hhcHRlciA4JyxcbiAgICAgICAgICAgIGxvY2F0aW9uOiBncm91cC5sb2NhdGlvbixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICBkYXRlOiAnMjAyNC0wMS0yMicsXG4gICAgICAgICAgICB0aW1lOiBncm91cC5tZWV0aW5nX3RpbWUsXG4gICAgICAgICAgICB0b3BpYzogJ1ByYXllciBhbmQgRmVsbG93c2hpcCcsXG4gICAgICAgICAgICBsb2NhdGlvbjogZ3JvdXAubG9jYXRpb24sXG4gICAgICAgIH0sXG4gICAgXTtcbiAgICBjb25zdCBwYXN0TWVldGluZ3MgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgZGF0ZTogJzIwMjQtMDEtMDgnLFxuICAgICAgICAgICAgdGltZTogZ3JvdXAubWVldGluZ190aW1lLFxuICAgICAgICAgICAgdG9waWM6ICdCaWJsZSBTdHVkeTogUm9tYW5zIENoYXB0ZXIgNycsXG4gICAgICAgICAgICBhdHRlbmRhbmNlOiAxMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDQsXG4gICAgICAgICAgICBkYXRlOiAnMjAyNC0wMS0wMScsXG4gICAgICAgICAgICB0aW1lOiBncm91cC5tZWV0aW5nX3RpbWUsXG4gICAgICAgICAgICB0b3BpYzogJ05ldyBZZWFyIEZlbGxvd3NoaXAnLFxuICAgICAgICAgICAgYXR0ZW5kYW5jZTogMTUsXG4gICAgICAgIH0sXG4gICAgXTtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktOFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDAgbWItNFwiLCBjaGlsZHJlbjogXCJVcGNvbWluZyBNZWV0aW5nc1wiIH0pLCB1cGNvbWluZ01lZXRpbmdzLmxlbmd0aCA9PT0gMCA/IChfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xMlwiLCBjaGlsZHJlbjogW19qc3goQ2FsZW5kYXIsIHsgY2xhc3NOYW1lOiBcImgtMTIgdy0xMiB0ZXh0LW5ldXRyYWwtNDAwIG14LWF1dG8gbWItNFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIk5vIHVwY29taW5nIG1lZXRpbmdzIHNjaGVkdWxlZC5cIiB9KV0gfSkpIDogKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiB1cGNvbWluZ01lZXRpbmdzLm1hcCgobWVldGluZykgPT4gKF9qc3goQ2FyZCwgeyBwYWRkaW5nOiBcIm1kXCIsIGhvdmVyYWJsZTogdHJ1ZSwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy0xNiB0ZXh0LWNlbnRlclwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctcHJpbWFyeS0xMDAgcm91bmRlZC1sZyBwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtcHJpbWFyeS02MDAgdXBwZXJjYXNlXCIsIGNoaWxkcmVuOiBuZXcgRGF0ZShtZWV0aW5nLmRhdGUpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7IG1vbnRoOiAnc2hvcnQnIH0pIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1wcmltYXJ5LTcwMFwiLCBjaGlsZHJlbjogbmV3IERhdGUobWVldGluZy5kYXRlKS5nZXREYXRlKCkgfSldIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTFcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwiZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwIG1iLTJcIiwgY2hpbGRyZW46IG1lZXRpbmcudG9waWMgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC13cmFwIGdhcC00IHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCIsIGNoaWxkcmVuOiBbX2pzeChDbG9jaywgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBtZWV0aW5nLnRpbWUgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiLCBjaGlsZHJlbjogW19qc3goTWFwUGluLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2hpbGRyZW46IG1lZXRpbmcubG9jYXRpb24gfSldIH0pXSB9KV0gfSldIH0pIH0sIG1lZXRpbmcuaWQpKSkgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMCBtYi00XCIsIGNoaWxkcmVuOiBcIlBhc3QgTWVldGluZ3NcIiB9KSwgcGFzdE1lZXRpbmdzLmxlbmd0aCA9PT0gMCA/IChfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xMlwiLCBjaGlsZHJlbjogW19qc3goQ2FsZW5kYXIsIHsgY2xhc3NOYW1lOiBcImgtMTIgdy0xMiB0ZXh0LW5ldXRyYWwtNDAwIG14LWF1dG8gbWItNFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIk5vIHBhc3QgbWVldGluZ3MgcmVjb3JkZWQuXCIgfSldIH0pKSA6IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogcGFzdE1lZXRpbmdzLm1hcCgobWVldGluZykgPT4gKF9qc3goQ2FyZCwgeyBwYWRkaW5nOiBcIm1kXCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wIHctMTYgdGV4dC1jZW50ZXJcIiwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLW5ldXRyYWwtMTAwIHJvdW5kZWQtbGcgcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNjAwIHVwcGVyY2FzZVwiLCBjaGlsZHJlbjogbmV3IERhdGUobWVldGluZy5kYXRlKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywgeyBtb250aDogJ3Nob3J0JyB9KSB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IG5ldyBEYXRlKG1lZXRpbmcuZGF0ZSkuZ2V0RGF0ZSgpIH0pXSB9KSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xXCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMCBtYi0yXCIsIGNoaWxkcmVuOiBtZWV0aW5nLnRvcGljIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtd3JhcCBnYXAtNCB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiLCBjaGlsZHJlbjogW19qc3goQ2xvY2ssIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogbWVldGluZy50aW1lIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIiwgY2hpbGRyZW46IFtfanN4KFVzZXJzLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIF9qc3hzKFwic3BhblwiLCB7IGNoaWxkcmVuOiBbbWVldGluZy5hdHRlbmRhbmNlLCBcIiBhdHRlbmRlZFwiXSB9KV0gfSldIH0pXSB9KV0gfSkgfSwgbWVldGluZy5pZCkpKSB9KSldIH0pXSB9KSk7XG59O1xuLyoqXG4gKiBSZXNvdXJjZXMgVGFiIENvbXBvbmVudFxuICovXG5jb25zdCBSZXNvdXJjZXNUYWIgPSAoeyBncm91cCB9KSA9PiB7XG4gICAgcmV0dXJuIChfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xNlwiLCBjaGlsZHJlbjogW19qc3goRmlsZVRleHQsIHsgY2xhc3NOYW1lOiBcImgtMTYgdy0xNiB0ZXh0LW5ldXRyYWwtNDAwIG14LWF1dG8gbWItNFwiIH0pLCBfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDAgbWItMlwiLCBjaGlsZHJlbjogXCJObyBSZXNvdXJjZXMgWWV0XCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiU3R1ZHkgbWF0ZXJpYWxzIGFuZCBzaGFyZWQgZG9jdW1lbnRzIHdpbGwgYXBwZWFyIGhlcmUuXCIgfSldIH0pKTtcbn07XG4vKipcbiAqIEFjdGl2aXR5IFRhYiBDb21wb25lbnRcbiAqL1xuY29uc3QgQWN0aXZpdHlUYWIgPSAoeyBncm91cCB9KSA9PiB7XG4gICAgcmV0dXJuIChfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xNlwiLCBjaGlsZHJlbjogW19qc3goQWN0aXZpdHksIHsgY2xhc3NOYW1lOiBcImgtMTYgdy0xNiB0ZXh0LW5ldXRyYWwtNDAwIG14LWF1dG8gbWItNFwiIH0pLCBfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDAgbWItMlwiLCBjaGlsZHJlbjogXCJObyBBY3Rpdml0eSBZZXRcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJSZWNlbnQgYWN0aXZpdGllcyBhbmQgYXR0ZW5kYW5jZSBoaXN0b3J5IHdpbGwgYXBwZWFyIGhlcmUuXCIgfSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBHcm91cERldGFpbDtcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDZ2Nmw0IDJcIiwga2V5OiBcIm1tazd5Z1wiIH1dLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMlwiLCBjeTogXCIxMlwiLCByOiBcIjEwXCIsIGtleTogXCIxbWdsYXlcIiB9XVxuXTtcbmNvbnN0IENsb2NrID0gY3JlYXRlTHVjaWRlSWNvbihcImNsb2NrXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBDbG9jayBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbG9jay5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTIwIDEwYzAgNC45OTMtNS41MzkgMTAuMTkzLTcuMzk5IDExLjc5OWExIDEgMCAwIDEtMS4yMDIgMEM5LjUzOSAyMC4xOTMgNCAxNC45OTMgNCAxMGE4IDggMCAwIDEgMTYgMFwiLFxuICAgICAga2V5OiBcIjFyMGYwelwiXG4gICAgfVxuICBdLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMlwiLCBjeTogXCIxMFwiLCByOiBcIjNcIiwga2V5OiBcImlscWhyN1wiIH1dXG5dO1xuY29uc3QgTWFwUGluID0gY3JlYXRlTHVjaWRlSWNvbihcIm1hcC1waW5cIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIE1hcFBpbiBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXAtcGluLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MlwiLCBrZXk6IFwiMXl5aXRxXCIgfV0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjlcIiwgY3k6IFwiN1wiLCByOiBcIjRcIiwga2V5OiBcIm51Zms4XCIgfV0sXG4gIFtcImxpbmVcIiwgeyB4MTogXCIxOVwiLCB4MjogXCIxOVwiLCB5MTogXCI4XCIsIHkyOiBcIjE0XCIsIGtleTogXCIxYnZ5eG5cIiB9XSxcbiAgW1wibGluZVwiLCB7IHgxOiBcIjIyXCIsIHgyOiBcIjE2XCIsIHkxOiBcIjExXCIsIHkyOiBcIjExXCIsIGtleTogXCIxc2hqZ2xcIiB9XVxuXTtcbmNvbnN0IFVzZXJQbHVzID0gY3JlYXRlTHVjaWRlSWNvbihcInVzZXItcGx1c1wiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVXNlclBsdXMgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlci1wbHVzLmpzLm1hcFxuIl0sIm5hbWVzIjpbImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJSZWFjdCIsImN2YSIsImNuIiwiYmFkZ2VWYXJpYW50cyIsInZhcmlhbnRzIiwidmFyaWFudCIsInByaW1hcnkiLCJzdWNjZXNzIiwid2FybmluZyIsImVycm9yIiwiZGFuZ2VyIiwibmV1dHJhbCIsIm91dGxpbmUiLCJzaXplIiwic20iLCJtZCIsImxnIiwic2hhcGUiLCJyb3VuZGVkIiwicGlsbCIsImRlZmF1bHRWYXJpYW50cyIsIkJhZGdlIiwiZm9yd2FyZFJlZiIsIl9yZWYiLCJyZWYiLCJjbGFzc05hbWUiLCJpY29uIiwiY2hpbGRyZW4iLCJwcm9wcyIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsIl9leGNsdWRlZCIsIl9vYmplY3RTcHJlYWQiLCJkaXNwbGF5TmFtZSIsImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsImFwaSIsInNtYWxsR3JvdXBBcGkiLCJnZXRTbWFsbEdyb3VwcyIsIl9jYWxsZWUiLCJyZXNwb25zZSIsIl9jb250ZXh0IiwiZ2V0IiwiZGF0YSIsImdldFNtYWxsR3JvdXAiLCJpZCIsIl9jYWxsZWUyIiwiX2NvbnRleHQyIiwiY29uY2F0IiwiY3JlYXRlU21hbGxHcm91cCIsIl9jYWxsZWUzIiwiX2NvbnRleHQzIiwicG9zdCIsInVwZGF0ZVNtYWxsR3JvdXAiLCJfY2FsbGVlNCIsIl9jb250ZXh0NCIsInB1dCIsImRlbGV0ZVNtYWxsR3JvdXAiLCJfY2FsbGVlNSIsIl9jb250ZXh0NSIsIl9zbGljZWRUb0FycmF5IiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkFycmF5IiwiZnJvbSIsInRlc3QiLCJuZXh0IiwicHVzaCIsImlzQXJyYXkiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVBhcmFtcyIsInVzZU5hdmlnYXRlIiwiSW5mbyIsIlVzZXJzIiwiQ2FsZW5kYXIiLCJGaWxlVGV4dCIsIkFjdGl2aXR5IiwiQXJyb3dMZWZ0IiwiTWFwUGluIiwiQ2xvY2siLCJVc2VyUGx1cyIsInVzZUF1dGgiLCJ1c2VUb2FzdCIsIkJ1dHRvbiIsIkNhcmQiLCJ0YWJzIiwibGFiZWwiLCJHcm91cERldGFpbCIsIl91c2VQYXJhbXMiLCJuYXZpZ2F0ZSIsIl91c2VBdXRoIiwidXNlciIsIl91c2VUb2FzdCIsInNob3dUb2FzdCIsImlzQWRtaW4iLCJyb2xlIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsImdyb3VwIiwic2V0R3JvdXAiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2IiwiYWN0aXZlVGFiIiwic2V0QWN0aXZlVGFiIiwibG9hZEdyb3VwRGV0YWlscyIsInBhcnNlSW50IiwiZ3JvdXBJZCIsIl90IiwiY29uc29sZSIsIl94IiwiaGFuZGxlQmFjayIsImdldEluaXRpYWxzIiwic3BsaXQiLCJtYXAiLCJ3b3JkIiwiam9pbiIsInRvVXBwZXJDYXNlIiwiZm9ybWF0TWVldGluZ1RpbWUiLCJkYXkiLCJ0aW1lIiwib25DbGljayIsImlzQWN0aXZlIiwic3RhdHVzIiwibWVtYmVyQ291bnQiLCJtZW1iZXJfY291bnQiLCJsZWFkZXJfcGhvdG8iLCJzcmMiLCJhbHQiLCJsZWFkZXJfbmFtZSIsIm1lZXRpbmdfZGF5IiwibWVldGluZ190aW1lIiwibG9jYXRpb24iLCJpbWFnZSIsInRhYiIsIkljb24iLCJpc0FjdGl2ZVRhYiIsIk92ZXJ2aWV3VGFiIiwiTWVtYmVyc1RhYiIsIlNjaGVkdWxlVGFiIiwiUmVzb3VyY2VzVGFiIiwiQWN0aXZpdHlUYWIiLCJfcmVmMiIsInBhZGRpbmciLCJkZXNjcmlwdGlvbiIsIl9yZWYzIiwibWVtYmVycyIsIm1lbWJlciIsImhvdmVyYWJsZSIsInBob3RvIiwiX3JlZjQiLCJ1cGNvbWluZ01lZXRpbmdzIiwiZGF0ZSIsInRvcGljIiwicGFzdE1lZXRpbmdzIiwiYXR0ZW5kYW5jZSIsIm1lZXRpbmciLCJEYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwibW9udGgiLCJnZXREYXRlIiwiX3JlZjUiLCJfcmVmNiJdLCJzb3VyY2VSb290IjoiIn0=