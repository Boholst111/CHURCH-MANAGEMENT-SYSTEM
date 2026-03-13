"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_EventDetail_tsx"],{

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

/***/ "./resources/js/lib/eventApi.ts"
/*!**************************************!*\
  !*** ./resources/js/lib/eventApi.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventApi: () => (/* binding */ eventApi)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/lib/api.ts");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

/**
 * Event API client
 *
 * Provides methods for interacting with the events API endpoints.
 */
var eventApi = {
  /**
   * Get all events
   */
  getEvents: function getEvents() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get('/events');
          case 1:
            response = _context.v;
            return _context.a(2, response.data.data || []);
        }
      }, _callee);
    }))();
  },
  /**
   * Get a single event by ID
   */
  getEvent: function getEvent(id) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get("/events/".concat(id));
          case 1:
            response = _context2.v;
            return _context2.a(2, response.data.data);
        }
      }, _callee2);
    }))();
  },
  /**
   * Create a new event
   */
  createEvent: function createEvent(data) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var response;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            console.log('eventApi.createEvent called with:', data);
            _context3.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].post('/events', data);
          case 1:
            response = _context3.v;
            console.log('eventApi.createEvent response:', response.data);
            return _context3.a(2, response.data.data);
        }
      }, _callee3);
    }))();
  },
  /**
   * Update an existing event
   */
  updateEvent: function updateEvent(id, data) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var response;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].put("/events/".concat(id), data);
          case 1:
            response = _context4.v;
            return _context4.a(2, response.data.data);
        }
      }, _callee4);
    }))();
  },
  /**
   * Delete an event
   */
  deleteEvent: function deleteEvent(id) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"]("/events/".concat(id));
          case 1:
            return _context5.a(2);
        }
      }, _callee5);
    }))();
  },
  /**
   * Mark an event as completed
   */
  completeEvent: function completeEvent(id, attendanceCount) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var response;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].put("/events/".concat(id, "/complete"), {
              attendance_count: attendanceCount
            });
          case 1:
            response = _context6.v;
            return _context6.a(2, response.data.data);
        }
      }, _callee6);
    }))();
  }
};

/***/ },

/***/ "./resources/js/pages/EventDetail.tsx"
/*!********************************************!*\
  !*** ./resources/js/pages/EventDetail.tsx ***!
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
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check-big.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/square-pen.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/arrow-left.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/calendar.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/clock.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/info.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/map-pin.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user-plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/users.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/ui/badge */ "./resources/js/components/ui/badge.tsx");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _lib_eventApi__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../lib/eventApi */ "./resources/js/lib/eventApi.ts");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../lib/utils */ "./resources/js/lib/utils.ts");
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
 * Status badge configuration
 */
var statusConfig = {
  upcoming: {
    variant: 'primary',
    label: 'Upcoming'
  },
  ongoing: {
    variant: 'success',
    label: 'Ongoing'
  },
  completed: {
    variant: 'neutral',
    label: 'Completed'
  },
  cancelled: {
    variant: 'error',
    label: 'Cancelled'
  }
};
/**
 * Category badge colors
 */
var categoryColors = {
  worship: 'bg-primary-500',
  outreach: 'bg-success-500',
  fellowship: 'bg-warning-500',
  training: 'bg-info-500',
  "default": 'bg-neutral-500'
};
/**
 * EventDetail Page Component
 *
 * Displays detailed information about a specific event.
 *
 * Features:
 * - Hero section with event image (or gradient background if no image)
 * - Event title, date, time, location prominently displayed
 * - Category badge and status badge
 * - Event description
 * - Attendee count and capacity with progress bar
 * - List of registered attendees (if user has permission)
 * - "Register" or "Unregister" button for users
 * - Location information
 * - Action buttons for admins (Edit, Manage Attendees, Cancel)
 *
 * Design Reference: Events Page Design section
 * Validates Requirements: 12.5
 * Task: 12.5 Implement event detail view
 */
var EventDetail = function EventDetail() {
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useParams)(),
    id = _useParams.id;
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_13__.useAuth)(),
    user = _useAuth.user;
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_14__.useToast)(),
    showToast = _useToast.showToast;
  var isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'admin';
  // State management
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    event = _useState2[0],
    setEvent = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    attendees = _useState4[0],
    setAttendees = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    isLoading = _useState6[0],
    setIsLoading = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isRegistered = _useState8[0],
    setIsRegistered = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    isRegistering = _useState0[0],
    setIsRegistering = _useState0[1];
  /**
   * Load event details on mount
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (id) {
      loadEventDetails(parseInt(id));
    }
  }, [id]);
  /**
   * Fetch event details from API
   */
  var loadEventDetails = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(eventId) {
      var data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setIsLoading(true);
            _context.n = 1;
            return _lib_eventApi__WEBPACK_IMPORTED_MODULE_18__.eventApi.getEvent(eventId);
          case 1:
            data = _context.v;
            setEvent(data);
            // Load attendees (mock data for now)
            loadAttendees(eventId);
            // Check if current user is registered (mock for now)
            setIsRegistered(false);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            showToast('error', 'Failed to load event details');
            console.error('Error loading event details:', _t);
            navigate('/events');
          case 3:
            _context.p = 3;
            setIsLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function loadEventDetails(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Load attendees list (mock implementation)
   */
  var loadAttendees = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(eventId) {
      var mockAttendees;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            // Mock attendees data
            mockAttendees = [{
              id: 1,
              name: 'John Doe',
              email: 'john@example.com',
              photo: null,
              registration_status: 'registered',
              registered_at: '2024-01-10T10:00:00Z'
            }, {
              id: 2,
              name: 'Jane Smith',
              email: 'jane@example.com',
              photo: null,
              registration_status: 'registered',
              registered_at: '2024-01-11T14:30:00Z'
            }];
            setAttendees(mockAttendees);
          case 1:
            return _context2.a(2);
        }
      }, _callee2);
    }));
    return function loadAttendees(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Handle back button click
   */
  var handleBack = function handleBack() {
    navigate('/events');
  };
  /**
   * Handle edit button click
   */
  var handleEdit = function handleEdit() {
    // Navigate back to events page with edit modal open
    navigate('/events', {
      state: {
        editEventId: event === null || event === void 0 ? void 0 : event.id
      }
    });
  };
  /**
   * Handle register/unregister button click
   */
  var handleRegistration = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _t2;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (event) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            _context3.p = 1;
            setIsRegistering(true);
            if (!isRegistered) {
              _context3.n = 3;
              break;
            }
            _context3.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 500);
            });
          case 2:
            setIsRegistered(false);
            showToast('success', 'Successfully unregistered from event');
            _context3.n = 5;
            break;
          case 3:
            _context3.n = 4;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 500);
            });
          case 4:
            setIsRegistered(true);
            showToast('success', 'Successfully registered for event');
          case 5:
            _context3.n = 6;
            return loadEventDetails(event.id);
          case 6:
            _context3.n = 8;
            break;
          case 7:
            _context3.p = 7;
            _t2 = _context3.v;
            showToast('error', 'Failed to update registration');
            console.error('Error updating registration:', _t2);
          case 8:
            _context3.p = 8;
            setIsRegistering(false);
            return _context3.f(8);
          case 9:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 7, 8, 9]]);
    }));
    return function handleRegistration() {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Handle cancel event button click
   */
  var handleCancelEvent = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (event) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            if (confirm('Are you sure you want to cancel this event?')) {
              _context4.n = 2;
              break;
            }
            return _context4.a(2);
          case 2:
            _context4.p = 2;
            _context4.n = 3;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 500);
            });
          case 3:
            showToast('success', 'Event cancelled successfully');
            navigate('/events');
            _context4.n = 5;
            break;
          case 4:
            _context4.p = 4;
            _t3 = _context4.v;
            showToast('error', 'Failed to cancel event');
            console.error('Error cancelling event:', _t3);
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 4]]);
    }));
    return function handleCancelEvent() {
      return _ref4.apply(this, arguments);
    };
  }();
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
   * Format date for display
   */
  var formatDate = function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  /**
   * Format time for display
   */
  var formatTime = function formatTime(timeString) {
    // Handle both HH:mm:ss and HH:mm formats
    var _timeString$split = timeString.split(':'),
      _timeString$split2 = _slicedToArray(_timeString$split, 2),
      hours = _timeString$split2[0],
      minutes = _timeString$split2[1];
    var hour = parseInt(hours, 10);
    var ampm = hour >= 12 ? 'PM' : 'AM';
    var displayHour = hour % 12 || 12;
    return "".concat(displayHour, ":").concat(minutes, " ").concat(ampm);
  };
  /**
   * Get category badge color
   */
  var getCategoryColor = function getCategoryColor(category) {
    var normalizedCategory = category.toLowerCase();
    return categoryColors[normalizedCategory] || categoryColors["default"];
  };
  /**
   * Get progress bar color based on capacity
   */
  var getProgressColor = function getProgressColor(percentage) {
    if (percentage < 70) return 'bg-success-600';
    if (percentage < 90) return 'bg-warning-600';
    return 'bg-error-600';
  };
  // Loading state
  if (isLoading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "text-center py-16",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-600",
        children: "Loading event details..."
      })]
    });
  }
  // Not found state
  if (!event) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "text-center py-16",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-2xl font-bold text-neutral-900 mb-4",
        children: "Event Not Found"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-600 mb-6",
        children: "The event you're looking for doesn't exist."
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
        onClick: handleBack,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
          className: "h-4 w-4 mr-2"
        }), "Back to Events"]
      })]
    });
  }
  var statusInfo = statusConfig[event.status];
  // Mock attendee data since it's not in the API yet
  var mockAttendees = {
    registered: 15,
    capacity: 50
  };
  var attendancePercentage = mockAttendees.capacity > 0 ? Math.round(mockAttendees.registered / mockAttendees.capacity * 100) : 0;
  var spotsLeft = mockAttendees.capacity - mockAttendees.registered;
  var isFull = mockAttendees.registered >= mockAttendees.capacity;
  var canRegister = event.status === 'upcoming' && !isFull;
  // Mock category since it's not in the API yet
  var mockCategory = 'worship';
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "mb-6",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
        variant: "ghost",
        onClick: handleBack,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
          className: "h-4 w-4 mr-2"
        }), "Back to Events"]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "relative rounded-xl overflow-hidden mb-8",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative h-80 bg-gradient-to-br from-primary-100 to-primary-200",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "w-full h-full flex items-center justify-center",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
            className: "h-24 w-24 text-primary-400"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "absolute top-6 left-6 flex gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_19__.cn)('inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium shadow-lg', getCategoryColor(mockCategory)),
            children: mockCategory
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_16__.Badge, {
            variant: statusInfo.variant,
            className: "shadow-lg",
            children: statusInfo.label
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "absolute bottom-0 left-0 right-0 p-8",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
            className: "text-4xl font-bold text-white mb-4",
            children: event.title
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-wrap gap-6 text-white",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                className: "h-5 w-5"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-lg font-medium",
                children: formatDate(event.event_date)
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
                className: "h-5 w-5"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-lg font-medium",
                children: formatTime(event.event_time)
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
                className: "h-5 w-5"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-lg font-medium",
                children: event.location
              })]
            })]
          })]
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "lg:col-span-2 space-y-6",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
          padding: "lg",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
            className: "text-2xl font-semibold text-neutral-900 mb-4",
            children: "About This Event"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-neutral-700 leading-relaxed whitespace-pre-wrap",
            children: event.description || 'No description available.'
          })]
        }), isAdmin && attendees.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
          padding: "lg",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center justify-between mb-6",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
              className: "text-2xl font-semibold text-neutral-900",
              children: ["Registered Attendees (", attendees.length, ")"]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
              variant: "outline",
              size: "sm",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
                className: "h-4 w-4 mr-2"
              }), "Manage Attendees"]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "space-y-3",
            children: attendees.map(function (attendee) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [attendee.photo ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                    src: attendee.photo,
                    alt: attendee.name,
                    className: "w-10 h-10 rounded-full object-cover"
                  }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center",
                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      className: "text-sm font-medium text-primary-700",
                      children: getInitials(attendee.name)
                    })
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                      className: "font-medium text-neutral-900",
                      children: attendee.name
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                      className: "text-sm text-neutral-600",
                      children: attendee.email
                    })]
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_16__.Badge, {
                  variant: "success",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    className: "h-3 w-3 mr-1"
                  }), "Registered"]
                })]
              }, attendee.id);
            })
          })]
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
          padding: "lg",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-lg font-semibold text-neutral-900 mb-4",
            children: "Attendance"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2 text-neutral-600",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
                  className: "h-5 w-5"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  children: "Registered"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "text-2xl font-bold text-neutral-900",
                children: [mockAttendees.registered, " / ", mockAttendees.capacity]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "w-full bg-neutral-200 rounded-full h-3 overflow-hidden",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_19__.cn)('h-full rounded-full transition-all duration-500', getProgressColor(attendancePercentage)),
                  style: {
                    width: "".concat(Math.min(attendancePercentage, 100), "%")
                  }
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between text-sm mt-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                  className: "text-neutral-600",
                  children: [attendancePercentage, "% capacity"]
                }), !isFull && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                  className: "text-success-600 font-medium",
                  children: [spotsLeft, " ", spotsLeft === 1 ? 'spot' : 'spots', " left"]
                }), isFull && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-error-600 font-medium",
                  children: "Full"
                })]
              })]
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
          padding: "lg",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-lg font-semibold text-neutral-900 mb-4",
            children: "Location"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-start gap-3",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
              className: "h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-neutral-900 font-medium mb-1",
                children: event.location
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-sm text-neutral-600",
                children: "Click for directions"
              })]
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
          padding: "lg",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-3",
            children: [canRegister && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
              variant: isRegistered ? 'outline' : 'primary',
              fullWidth: true,
              onClick: handleRegistration,
              disabled: isRegistering,
              loading: isRegistering,
              children: isRegistered ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], {
                  className: "h-4 w-4 mr-2"
                }), "Unregister"]
              }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                  className: "h-4 w-4 mr-2"
                }), "Register for Event"]
              })
            }), isFull && !isRegistered && event.status === 'upcoming' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-start gap-2 p-3 bg-warning-50 border border-warning-200 rounded-lg",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
                className: "h-5 w-5 text-warning-600 mt-0.5 flex-shrink-0"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-sm text-warning-800",
                children: "This event is currently full. Check back later for availability."
              })]
            }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              children: [event.status !== 'completed' && event.status !== 'cancelled' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
                  variant: "outline",
                  fullWidth: true,
                  onClick: handleEdit,
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                    className: "h-4 w-4 mr-2"
                  }), "Edit Event"]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
                  variant: "outline",
                  fullWidth: true,
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
                    className: "h-4 w-4 mr-2"
                  }), "Manage Attendees"]
                })]
              }), event.status === 'upcoming' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
                variant: "danger",
                fullWidth: true,
                onClick: handleCancelEvent,
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], {
                  className: "h-4 w-4 mr-2"
                }), "Cancel Event"]
              })]
            })]
          })
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventDetail);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0V2ZW50RGV0YWlsX3RzeC5qcz9pZD1lNGJmMzFiODE2Y2I0NWJlIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0Q7QUFDaEM7QUFDZ0I7QUFDVjtBQUNyQyxJQUFNTyxhQUFhLEdBQUdGLDZEQUFHLENBQUMsMkhBQTJILEVBQUU7RUFDbkpHLFFBQVEsRUFBRTtJQUNOQyxPQUFPLEVBQUU7TUFDTEMsT0FBTyxFQUFFLDJFQUEyRTtNQUNwRkMsT0FBTyxFQUFFLHNGQUFzRjtNQUMvRkMsT0FBTyxFQUFFLHNGQUFzRjtNQUMvRkMsS0FBSyxFQUFFLDhFQUE4RTtNQUNyRkMsTUFBTSxFQUFFLDhFQUE4RTtNQUN0RkMsT0FBTyxFQUFFLDJFQUEyRTtNQUNwRkMsT0FBTyxFQUFFO0lBQ2IsQ0FBQztJQUNEQyxJQUFJLEVBQUU7TUFDRkMsRUFBRSxFQUFFLHdCQUF3QjtNQUM1QkMsRUFBRSxFQUFFLDRCQUE0QjtNQUNoQ0MsRUFBRSxFQUFFO0lBQ1IsQ0FBQztJQUNEQyxLQUFLLEVBQUU7TUFDSEMsT0FBTyxFQUFFLFlBQVk7TUFDckJDLElBQUksRUFBRTtJQUNWO0VBQ0osQ0FBQztFQUNEQyxlQUFlLEVBQUU7SUFDYmYsT0FBTyxFQUFFLFNBQVM7SUFDbEJRLElBQUksRUFBRSxJQUFJO0lBQ1ZJLEtBQUssRUFBRTtFQUNYO0FBQ0osQ0FBQyxDQUFDO0FBQ0YsSUFBTUksS0FBSyxnQkFBR3JCLDZDQUFnQixDQUFDLFVBQUF1QixJQUFBLEVBQWdFQyxHQUFHLEVBQUs7RUFBQSxJQUFyRUMsU0FBUyxHQUFBRixJQUFBLENBQVRFLFNBQVM7SUFBRXBCLE9BQU8sR0FBQWtCLElBQUEsQ0FBUGxCLE9BQU87SUFBRVEsSUFBSSxHQUFBVSxJQUFBLENBQUpWLElBQUk7SUFBRUksS0FBSyxHQUFBTSxJQUFBLENBQUxOLEtBQUs7SUFBRVMsSUFBSSxHQUFBSCxJQUFBLENBQUpHLElBQUk7SUFBRUMsUUFBUSxH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IndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9iYWRnZS50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2xpYi9ldmVudEFwaS50cyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvcGFnZXMvRXZlbnREZXRhaWwudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvY2xvY2suanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9tYXAtcGluLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvc3F1YXJlLXBlbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3VzZXItcGx1cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjdmEgfSBmcm9tIFwiY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCIuLi8uLi9saWIvdXRpbHNcIjtcbmNvbnN0IGJhZGdlVmFyaWFudHMgPSBjdmEoXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLW9mZnNldC0yXCIsIHtcbiAgICB2YXJpYW50czoge1xuICAgICAgICB2YXJpYW50OiB7XG4gICAgICAgICAgICBwcmltYXJ5OiBcImJnLXByaW1hcnktMTAwIHRleHQtcHJpbWFyeS03MDAgYm9yZGVyLXByaW1hcnktMjAwIGZvY3VzOnJpbmctcHJpbWFyeS01MDBcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IFwiYmctc3VjY2Vzcy1saWdodCB0ZXh0LXN1Y2Nlc3MtZGFyayBib3JkZXItc3VjY2Vzcy1ERUZBVUxUIGZvY3VzOnJpbmctc3VjY2Vzcy1ERUZBVUxUXCIsXG4gICAgICAgICAgICB3YXJuaW5nOiBcImJnLXdhcm5pbmctbGlnaHQgdGV4dC13YXJuaW5nLWRhcmsgYm9yZGVyLXdhcm5pbmctREVGQVVMVCBmb2N1czpyaW5nLXdhcm5pbmctREVGQVVMVFwiLFxuICAgICAgICAgICAgZXJyb3I6IFwiYmctZXJyb3ItbGlnaHQgdGV4dC1lcnJvci1kYXJrIGJvcmRlci1lcnJvci1ERUZBVUxUIGZvY3VzOnJpbmctZXJyb3ItREVGQVVMVFwiLFxuICAgICAgICAgICAgZGFuZ2VyOiBcImJnLWVycm9yLWxpZ2h0IHRleHQtZXJyb3ItZGFyayBib3JkZXItZXJyb3ItREVGQVVMVCBmb2N1czpyaW5nLWVycm9yLURFRkFVTFRcIixcbiAgICAgICAgICAgIG5ldXRyYWw6IFwiYmctbmV1dHJhbC0xMDAgdGV4dC1uZXV0cmFsLTcwMCBib3JkZXItbmV1dHJhbC0zMDAgZm9jdXM6cmluZy1uZXV0cmFsLTUwMFwiLFxuICAgICAgICAgICAgb3V0bGluZTogXCJiZy10cmFuc3BhcmVudCB0ZXh0LW5ldXRyYWwtNzAwIGJvcmRlciBib3JkZXItbmV1dHJhbC0zMDAgZm9jdXM6cmluZy1uZXV0cmFsLTUwMFwiLFxuICAgICAgICB9LFxuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICBzbTogXCJoLTUgcHgtMiB0ZXh0LXhzIGdhcC0xXCIsXG4gICAgICAgICAgICBtZDogXCJoLTYgcHgtMi41IHRleHQtc20gZ2FwLTEuNVwiLFxuICAgICAgICAgICAgbGc6IFwiaC03IHB4LTMgdGV4dC1iYXNlIGdhcC0yXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICByb3VuZGVkOiBcInJvdW5kZWQtbWRcIixcbiAgICAgICAgICAgIHBpbGw6IFwicm91bmRlZC1mdWxsXCIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBkZWZhdWx0VmFyaWFudHM6IHtcbiAgICAgICAgdmFyaWFudDogXCJuZXV0cmFsXCIsXG4gICAgICAgIHNpemU6IFwibWRcIixcbiAgICAgICAgc2hhcGU6IFwicm91bmRlZFwiLFxuICAgIH0sXG59KTtcbmNvbnN0IEJhZGdlID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIHZhcmlhbnQsIHNpemUsIHNoYXBlLCBpY29uLCBjaGlsZHJlbiwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgcmV0dXJuIChfanN4cyhcInNwYW5cIiwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihiYWRnZVZhcmlhbnRzKHsgdmFyaWFudCwgc2l6ZSwgc2hhcGUgfSksIGNsYXNzTmFtZSksIC4uLnByb3BzLCBjaGlsZHJlbjogW2ljb24gJiYgKF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlclwiLCBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLCBjaGlsZHJlbjogaWNvbiB9KSksIGNoaWxkcmVuXSB9KSk7XG59KTtcbkJhZGdlLmRpc3BsYXlOYW1lID0gXCJCYWRnZVwiO1xuZXhwb3J0IHsgQmFkZ2UsIGJhZGdlVmFyaWFudHMgfTtcbiIsImltcG9ydCBhcGkgZnJvbSAnLi9hcGknO1xuLyoqXG4gKiBFdmVudCBBUEkgY2xpZW50XG4gKlxuICogUHJvdmlkZXMgbWV0aG9kcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgZXZlbnRzIEFQSSBlbmRwb2ludHMuXG4gKi9cbmV4cG9ydCBjb25zdCBldmVudEFwaSA9IHtcbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGV2ZW50c1xuICAgICAqL1xuICAgIGFzeW5jIGdldEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvZXZlbnRzJyk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGEgfHwgW107XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBHZXQgYSBzaW5nbGUgZXZlbnQgYnkgSURcbiAgICAgKi9cbiAgICBhc3luYyBnZXRFdmVudChpZCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9ldmVudHMvJHtpZH1gKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBldmVudFxuICAgICAqL1xuICAgIGFzeW5jIGNyZWF0ZUV2ZW50KGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50QXBpLmNyZWF0ZUV2ZW50IGNhbGxlZCB3aXRoOicsIGRhdGEpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KCcvZXZlbnRzJywgZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdldmVudEFwaS5jcmVhdGVFdmVudCByZXNwb25zZTonLCByZXNwb25zZS5kYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbiBleGlzdGluZyBldmVudFxuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZUV2ZW50KGlkLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChgL2V2ZW50cy8ke2lkfWAsIGRhdGEpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGFuIGV2ZW50XG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlRXZlbnQoaWQpIHtcbiAgICAgICAgYXdhaXQgYXBpLmRlbGV0ZShgL2V2ZW50cy8ke2lkfWApO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogTWFyayBhbiBldmVudCBhcyBjb21wbGV0ZWRcbiAgICAgKi9cbiAgICBhc3luYyBjb21wbGV0ZUV2ZW50KGlkLCBhdHRlbmRhbmNlQ291bnQpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KGAvZXZlbnRzLyR7aWR9L2NvbXBsZXRlYCwge1xuICAgICAgICAgICAgYXR0ZW5kYW5jZV9jb3VudDogYXR0ZW5kYW5jZUNvdW50LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgICB9LFxufTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzLCBGcmFnbWVudCBhcyBfRnJhZ21lbnQgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VQYXJhbXMsIHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBDYWxlbmRhciwgTWFwUGluLCBVc2VycywgQ2xvY2ssIEFycm93TGVmdCwgRWRpdCwgVXNlclBsdXMsIFgsIENoZWNrQ2lyY2xlLCBJbmZvIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tICcuLi9jb250ZXh0cy9BdXRoQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VUb2FzdCB9IGZyb20gJy4uL2NvbnRleHRzL1RvYXN0Q29udGV4dCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2J1dHRvbic7XG5pbXBvcnQgeyBCYWRnZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvYmFkZ2UnO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvY2FyZCc7XG5pbXBvcnQgeyBldmVudEFwaSB9IGZyb20gJy4uL2xpYi9ldmVudEFwaSc7XG5pbXBvcnQgeyBjbiB9IGZyb20gJy4uL2xpYi91dGlscyc7XG4vKipcbiAqIFN0YXR1cyBiYWRnZSBjb25maWd1cmF0aW9uXG4gKi9cbmNvbnN0IHN0YXR1c0NvbmZpZyA9IHtcbiAgICB1cGNvbWluZzoge1xuICAgICAgICB2YXJpYW50OiAncHJpbWFyeScsXG4gICAgICAgIGxhYmVsOiAnVXBjb21pbmcnLFxuICAgIH0sXG4gICAgb25nb2luZzoge1xuICAgICAgICB2YXJpYW50OiAnc3VjY2VzcycsXG4gICAgICAgIGxhYmVsOiAnT25nb2luZycsXG4gICAgfSxcbiAgICBjb21wbGV0ZWQ6IHtcbiAgICAgICAgdmFyaWFudDogJ25ldXRyYWwnLFxuICAgICAgICBsYWJlbDogJ0NvbXBsZXRlZCcsXG4gICAgfSxcbiAgICBjYW5jZWxsZWQ6IHtcbiAgICAgICAgdmFyaWFudDogJ2Vycm9yJyxcbiAgICAgICAgbGFiZWw6ICdDYW5jZWxsZWQnLFxuICAgIH0sXG59O1xuLyoqXG4gKiBDYXRlZ29yeSBiYWRnZSBjb2xvcnNcbiAqL1xuY29uc3QgY2F0ZWdvcnlDb2xvcnMgPSB7XG4gICAgd29yc2hpcDogJ2JnLXByaW1hcnktNTAwJyxcbiAgICBvdXRyZWFjaDogJ2JnLXN1Y2Nlc3MtNTAwJyxcbiAgICBmZWxsb3dzaGlwOiAnYmctd2FybmluZy01MDAnLFxuICAgIHRyYWluaW5nOiAnYmctaW5mby01MDAnLFxuICAgIGRlZmF1bHQ6ICdiZy1uZXV0cmFsLTUwMCcsXG59O1xuLyoqXG4gKiBFdmVudERldGFpbCBQYWdlIENvbXBvbmVudFxuICpcbiAqIERpc3BsYXlzIGRldGFpbGVkIGluZm9ybWF0aW9uIGFib3V0IGEgc3BlY2lmaWMgZXZlbnQuXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIEhlcm8gc2VjdGlvbiB3aXRoIGV2ZW50IGltYWdlIChvciBncmFkaWVudCBiYWNrZ3JvdW5kIGlmIG5vIGltYWdlKVxuICogLSBFdmVudCB0aXRsZSwgZGF0ZSwgdGltZSwgbG9jYXRpb24gcHJvbWluZW50bHkgZGlzcGxheWVkXG4gKiAtIENhdGVnb3J5IGJhZGdlIGFuZCBzdGF0dXMgYmFkZ2VcbiAqIC0gRXZlbnQgZGVzY3JpcHRpb25cbiAqIC0gQXR0ZW5kZWUgY291bnQgYW5kIGNhcGFjaXR5IHdpdGggcHJvZ3Jlc3MgYmFyXG4gKiAtIExpc3Qgb2YgcmVnaXN0ZXJlZCBhdHRlbmRlZXMgKGlmIHVzZXIgaGFzIHBlcm1pc3Npb24pXG4gKiAtIFwiUmVnaXN0ZXJcIiBvciBcIlVucmVnaXN0ZXJcIiBidXR0b24gZm9yIHVzZXJzXG4gKiAtIExvY2F0aW9uIGluZm9ybWF0aW9uXG4gKiAtIEFjdGlvbiBidXR0b25zIGZvciBhZG1pbnMgKEVkaXQsIE1hbmFnZSBBdHRlbmRlZXMsIENhbmNlbClcbiAqXG4gKiBEZXNpZ24gUmVmZXJlbmNlOiBFdmVudHMgUGFnZSBEZXNpZ24gc2VjdGlvblxuICogVmFsaWRhdGVzIFJlcXVpcmVtZW50czogMTIuNVxuICogVGFzazogMTIuNSBJbXBsZW1lbnQgZXZlbnQgZGV0YWlsIHZpZXdcbiAqL1xuY29uc3QgRXZlbnREZXRhaWwgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpZCB9ID0gdXNlUGFyYW1zKCk7XG4gICAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICAgIGNvbnN0IHsgdXNlciB9ID0gdXNlQXV0aCgpO1xuICAgIGNvbnN0IHsgc2hvd1RvYXN0IH0gPSB1c2VUb2FzdCgpO1xuICAgIGNvbnN0IGlzQWRtaW4gPSB1c2VyPy5yb2xlID09PSAnYWRtaW4nO1xuICAgIC8vIFN0YXRlIG1hbmFnZW1lbnRcbiAgICBjb25zdCBbZXZlbnQsIHNldEV2ZW50XSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFthdHRlbmRlZXMsIHNldEF0dGVuZGVlc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtpc1JlZ2lzdGVyZWQsIHNldElzUmVnaXN0ZXJlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2lzUmVnaXN0ZXJpbmcsIHNldElzUmVnaXN0ZXJpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIC8qKlxuICAgICAqIExvYWQgZXZlbnQgZGV0YWlscyBvbiBtb3VudFxuICAgICAqL1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgbG9hZEV2ZW50RGV0YWlscyhwYXJzZUludChpZCkpO1xuICAgICAgICB9XG4gICAgfSwgW2lkXSk7XG4gICAgLyoqXG4gICAgICogRmV0Y2ggZXZlbnQgZGV0YWlscyBmcm9tIEFQSVxuICAgICAqL1xuICAgIGNvbnN0IGxvYWRFdmVudERldGFpbHMgPSBhc3luYyAoZXZlbnRJZCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGV2ZW50QXBpLmdldEV2ZW50KGV2ZW50SWQpO1xuICAgICAgICAgICAgc2V0RXZlbnQoZGF0YSk7XG4gICAgICAgICAgICAvLyBMb2FkIGF0dGVuZGVlcyAobW9jayBkYXRhIGZvciBub3cpXG4gICAgICAgICAgICBsb2FkQXR0ZW5kZWVzKGV2ZW50SWQpO1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgY3VycmVudCB1c2VyIGlzIHJlZ2lzdGVyZWQgKG1vY2sgZm9yIG5vdylcbiAgICAgICAgICAgIHNldElzUmVnaXN0ZXJlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBsb2FkIGV2ZW50IGRldGFpbHMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgZXZlbnQgZGV0YWlsczonLCBlcnJvcik7XG4gICAgICAgICAgICBuYXZpZ2F0ZSgnL2V2ZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogTG9hZCBhdHRlbmRlZXMgbGlzdCAobW9jayBpbXBsZW1lbnRhdGlvbilcbiAgICAgKi9cbiAgICBjb25zdCBsb2FkQXR0ZW5kZWVzID0gYXN5bmMgKGV2ZW50SWQpID0+IHtcbiAgICAgICAgLy8gTW9jayBhdHRlbmRlZXMgZGF0YVxuICAgICAgICBjb25zdCBtb2NrQXR0ZW5kZWVzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdKb2huIERvZScsXG4gICAgICAgICAgICAgICAgZW1haWw6ICdqb2huQGV4YW1wbGUuY29tJyxcbiAgICAgICAgICAgICAgICBwaG90bzogbnVsbCxcbiAgICAgICAgICAgICAgICByZWdpc3RyYXRpb25fc3RhdHVzOiAncmVnaXN0ZXJlZCcsXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJlZF9hdDogJzIwMjQtMDEtMTBUMTA6MDA6MDBaJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICAgICAgbmFtZTogJ0phbmUgU21pdGgnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiAnamFuZUBleGFtcGxlLmNvbScsXG4gICAgICAgICAgICAgICAgcGhvdG86IG51bGwsXG4gICAgICAgICAgICAgICAgcmVnaXN0cmF0aW9uX3N0YXR1czogJ3JlZ2lzdGVyZWQnLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWRfYXQ6ICcyMDI0LTAxLTExVDE0OjMwOjAwWicsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgICAgICBzZXRBdHRlbmRlZXMobW9ja0F0dGVuZGVlcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYmFjayBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgICAgICBuYXZpZ2F0ZSgnL2V2ZW50cycpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGVkaXQgYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlRWRpdCA9ICgpID0+IHtcbiAgICAgICAgLy8gTmF2aWdhdGUgYmFjayB0byBldmVudHMgcGFnZSB3aXRoIGVkaXQgbW9kYWwgb3BlblxuICAgICAgICBuYXZpZ2F0ZSgnL2V2ZW50cycsIHsgc3RhdGU6IHsgZWRpdEV2ZW50SWQ6IGV2ZW50Py5pZCB9IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHJlZ2lzdGVyL3VucmVnaXN0ZXIgYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlUmVnaXN0cmF0aW9uID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIWV2ZW50KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0SXNSZWdpc3RlcmluZyh0cnVlKTtcbiAgICAgICAgICAgIGlmIChpc1JlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBVbnJlZ2lzdGVyIGxvZ2ljIChtb2NrKVxuICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCA1MDApKTtcbiAgICAgICAgICAgICAgICBzZXRJc1JlZ2lzdGVyZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdTdWNjZXNzZnVsbHkgdW5yZWdpc3RlcmVkIGZyb20gZXZlbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJlZ2lzdGVyIGxvZ2ljIChtb2NrKVxuICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCA1MDApKTtcbiAgICAgICAgICAgICAgICBzZXRJc1JlZ2lzdGVyZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ1N1Y2Nlc3NmdWxseSByZWdpc3RlcmVkIGZvciBldmVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUmVsb2FkIGV2ZW50IGRldGFpbHMgdG8gdXBkYXRlIGF0dGVuZGVlIGNvdW50XG4gICAgICAgICAgICBhd2FpdCBsb2FkRXZlbnREZXRhaWxzKGV2ZW50LmlkKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIHVwZGF0ZSByZWdpc3RyYXRpb24nKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHJlZ2lzdHJhdGlvbjonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc1JlZ2lzdGVyaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNhbmNlbCBldmVudCBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVDYW5jZWxFdmVudCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFldmVudClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCFjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2FuY2VsIHRoaXMgZXZlbnQ/JykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQ2FuY2VsIGV2ZW50IGxvZ2ljIChtb2NrKVxuICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDUwMCkpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ0V2ZW50IGNhbmNlbGxlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIG5hdmlnYXRlKCcvZXZlbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBjYW5jZWwgZXZlbnQnKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNhbmNlbGxpbmcgZXZlbnQ6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgaW5pdGlhbHMgZnJvbSBuYW1lIGZvciBhdmF0YXIgcGxhY2Vob2xkZXJcbiAgICAgKi9cbiAgICBjb25zdCBnZXRJbml0aWFscyA9IChuYW1lKSA9PiB7XG4gICAgICAgIGlmICghbmFtZSlcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgcmV0dXJuIG5hbWVcbiAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAubWFwKHdvcmQgPT4gd29yZFswXSlcbiAgICAgICAgICAgIC5qb2luKCcnKVxuICAgICAgICAgICAgLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgIC5zbGljZSgwLCAyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZvcm1hdCBkYXRlIGZvciBkaXNwbGF5XG4gICAgICovXG4gICAgY29uc3QgZm9ybWF0RGF0ZSA9IChkYXRlU3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcbiAgICAgICAgcmV0dXJuIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcbiAgICAgICAgICAgIHdlZWtkYXk6ICdsb25nJyxcbiAgICAgICAgICAgIHllYXI6ICdudW1lcmljJyxcbiAgICAgICAgICAgIG1vbnRoOiAnbG9uZycsXG4gICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGb3JtYXQgdGltZSBmb3IgZGlzcGxheVxuICAgICAqL1xuICAgIGNvbnN0IGZvcm1hdFRpbWUgPSAodGltZVN0cmluZykgPT4ge1xuICAgICAgICAvLyBIYW5kbGUgYm90aCBISDptbTpzcyBhbmQgSEg6bW0gZm9ybWF0c1xuICAgICAgICBjb25zdCBbaG91cnMsIG1pbnV0ZXNdID0gdGltZVN0cmluZy5zcGxpdCgnOicpO1xuICAgICAgICBjb25zdCBob3VyID0gcGFyc2VJbnQoaG91cnMsIDEwKTtcbiAgICAgICAgY29uc3QgYW1wbSA9IGhvdXIgPj0gMTIgPyAnUE0nIDogJ0FNJztcbiAgICAgICAgY29uc3QgZGlzcGxheUhvdXIgPSBob3VyICUgMTIgfHwgMTI7XG4gICAgICAgIHJldHVybiBgJHtkaXNwbGF5SG91cn06JHttaW51dGVzfSAke2FtcG19YDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBjYXRlZ29yeSBiYWRnZSBjb2xvclxuICAgICAqL1xuICAgIGNvbnN0IGdldENhdGVnb3J5Q29sb3IgPSAoY2F0ZWdvcnkpID0+IHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZENhdGVnb3J5ID0gY2F0ZWdvcnkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGNhdGVnb3J5Q29sb3JzW25vcm1hbGl6ZWRDYXRlZ29yeV0gfHwgY2F0ZWdvcnlDb2xvcnMuZGVmYXVsdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBwcm9ncmVzcyBiYXIgY29sb3IgYmFzZWQgb24gY2FwYWNpdHlcbiAgICAgKi9cbiAgICBjb25zdCBnZXRQcm9ncmVzc0NvbG9yID0gKHBlcmNlbnRhZ2UpID0+IHtcbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPCA3MClcbiAgICAgICAgICAgIHJldHVybiAnYmctc3VjY2Vzcy02MDAnO1xuICAgICAgICBpZiAocGVyY2VudGFnZSA8IDkwKVxuICAgICAgICAgICAgcmV0dXJuICdiZy13YXJuaW5nLTYwMCc7XG4gICAgICAgIHJldHVybiAnYmctZXJyb3ItNjAwJztcbiAgICB9O1xuICAgIC8vIExvYWRpbmcgc3RhdGVcbiAgICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1jZW50ZXIgcHktMTZcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImlubGluZS1ibG9jayBhbmltYXRlLXNwaW4gcm91bmRlZC1mdWxsIGgtMTIgdy0xMiBib3JkZXItYi0yIGJvcmRlci1wcmltYXJ5LTYwMCBtYi00XCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiTG9hZGluZyBldmVudCBkZXRhaWxzLi4uXCIgfSldIH0pKTtcbiAgICB9XG4gICAgLy8gTm90IGZvdW5kIHN0YXRlXG4gICAgaWYgKCFldmVudCkge1xuICAgICAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtY2VudGVyIHB5LTE2XCIsIGNoaWxkcmVuOiBbX2pzeChcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LW5ldXRyYWwtOTAwIG1iLTRcIiwgY2hpbGRyZW46IFwiRXZlbnQgTm90IEZvdW5kXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbmV1dHJhbC02MDAgbWItNlwiLCBjaGlsZHJlbjogXCJUaGUgZXZlbnQgeW91J3JlIGxvb2tpbmcgZm9yIGRvZXNuJ3QgZXhpc3QuXCIgfSksIF9qc3hzKEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVCYWNrLCBjaGlsZHJlbjogW19qc3goQXJyb3dMZWZ0LCB7IGNsYXNzTmFtZTogXCJoLTQgdy00IG1yLTJcIiB9KSwgXCJCYWNrIHRvIEV2ZW50c1wiXSB9KV0gfSkpO1xuICAgIH1cbiAgICBjb25zdCBzdGF0dXNJbmZvID0gc3RhdHVzQ29uZmlnW2V2ZW50LnN0YXR1c107XG4gICAgLy8gTW9jayBhdHRlbmRlZSBkYXRhIHNpbmNlIGl0J3Mgbm90IGluIHRoZSBBUEkgeWV0XG4gICAgY29uc3QgbW9ja0F0dGVuZGVlcyA9IHtcbiAgICAgICAgcmVnaXN0ZXJlZDogMTUsXG4gICAgICAgIGNhcGFjaXR5OiA1MCxcbiAgICB9O1xuICAgIGNvbnN0IGF0dGVuZGFuY2VQZXJjZW50YWdlID0gbW9ja0F0dGVuZGVlcy5jYXBhY2l0eSA+IDBcbiAgICAgICAgPyBNYXRoLnJvdW5kKChtb2NrQXR0ZW5kZWVzLnJlZ2lzdGVyZWQgLyBtb2NrQXR0ZW5kZWVzLmNhcGFjaXR5KSAqIDEwMClcbiAgICAgICAgOiAwO1xuICAgIGNvbnN0IHNwb3RzTGVmdCA9IG1vY2tBdHRlbmRlZXMuY2FwYWNpdHkgLSBtb2NrQXR0ZW5kZWVzLnJlZ2lzdGVyZWQ7XG4gICAgY29uc3QgaXNGdWxsID0gbW9ja0F0dGVuZGVlcy5yZWdpc3RlcmVkID49IG1vY2tBdHRlbmRlZXMuY2FwYWNpdHk7XG4gICAgY29uc3QgY2FuUmVnaXN0ZXIgPSBldmVudC5zdGF0dXMgPT09ICd1cGNvbWluZycgJiYgIWlzRnVsbDtcbiAgICAvLyBNb2NrIGNhdGVnb3J5IHNpbmNlIGl0J3Mgbm90IGluIHRoZSBBUEkgeWV0XG4gICAgY29uc3QgbW9ja0NhdGVnb3J5ID0gJ3dvcnNoaXAnO1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibWItNlwiLCBjaGlsZHJlbjogX2pzeHMoQnV0dG9uLCB7IHZhcmlhbnQ6IFwiZ2hvc3RcIiwgb25DbGljazogaGFuZGxlQmFjaywgY2hpbGRyZW46IFtfanN4KEFycm93TGVmdCwgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yXCIgfSksIFwiQmFjayB0byBFdmVudHNcIl0gfSkgfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmUgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gbWItOFwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmUgaC04MCBiZy1ncmFkaWVudC10by1iciBmcm9tLXByaW1hcnktMTAwIHRvLXByaW1hcnktMjAwXCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ3LWZ1bGwgaC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIGNoaWxkcmVuOiBfanN4KENhbGVuZGFyLCB7IGNsYXNzTmFtZTogXCJoLTI0IHctMjQgdGV4dC1wcmltYXJ5LTQwMFwiIH0pIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tdCBmcm9tLWJsYWNrLzYwIHZpYS1ibGFjay8yMCB0by10cmFuc3BhcmVudFwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJhYnNvbHV0ZSB0b3AtNiBsZWZ0LTYgZmxleCBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBjbignaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHB4LTQgcHktMiByb3VuZGVkLWZ1bGwgdGV4dC13aGl0ZSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHNoYWRvdy1sZycsIGdldENhdGVnb3J5Q29sb3IobW9ja0NhdGVnb3J5KSksIGNoaWxkcmVuOiBtb2NrQ2F0ZWdvcnkgfSksIF9qc3goQmFkZ2UsIHsgdmFyaWFudDogc3RhdHVzSW5mby52YXJpYW50LCBjbGFzc05hbWU6IFwic2hhZG93LWxnXCIsIGNoaWxkcmVuOiBzdGF0dXNJbmZvLmxhYmVsIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgYm90dG9tLTAgbGVmdC0wIHJpZ2h0LTAgcC04XCIsIGNoaWxkcmVuOiBbX2pzeChcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtNHhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG1iLTRcIiwgY2hpbGRyZW46IGV2ZW50LnRpdGxlIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtd3JhcCBnYXAtNiB0ZXh0LXdoaXRlXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KENhbGVuZGFyLCB7IGNsYXNzTmFtZTogXCJoLTUgdy01XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW1cIiwgY2hpbGRyZW46IGZvcm1hdERhdGUoZXZlbnQuZXZlbnRfZGF0ZSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goQ2xvY2ssIHsgY2xhc3NOYW1lOiBcImgtNSB3LTVcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bVwiLCBjaGlsZHJlbjogZm9ybWF0VGltZShldmVudC5ldmVudF90aW1lKSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChNYXBQaW4sIHsgY2xhc3NOYW1lOiBcImgtNSB3LTVcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bVwiLCBjaGlsZHJlbjogZXZlbnQubG9jYXRpb24gfSldIH0pXSB9KV0gfSldIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0zIGdhcC04XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibGc6Y29sLXNwYW4tMiBzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhDYXJkLCB7IHBhZGRpbmc6IFwibGdcIiwgY2hpbGRyZW46IFtfanN4KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwIG1iLTRcIiwgY2hpbGRyZW46IFwiQWJvdXQgVGhpcyBFdmVudFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LW5ldXRyYWwtNzAwIGxlYWRpbmctcmVsYXhlZCB3aGl0ZXNwYWNlLXByZS13cmFwXCIsIGNoaWxkcmVuOiBldmVudC5kZXNjcmlwdGlvbiB8fCAnTm8gZGVzY3JpcHRpb24gYXZhaWxhYmxlLicgfSldIH0pLCBpc0FkbWluICYmIGF0dGVuZGVlcy5sZW5ndGggPiAwICYmIChfanN4cyhDYXJkLCB7IHBhZGRpbmc6IFwibGdcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBbXCJSZWdpc3RlcmVkIEF0dGVuZGVlcyAoXCIsIGF0dGVuZGVlcy5sZW5ndGgsIFwiKVwiXSB9KSwgX2pzeHMoQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIGNoaWxkcmVuOiBbX2pzeChVc2VyUGx1cywgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yXCIgfSksIFwiTWFuYWdlIEF0dGVuZGVlc1wiXSB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS0zXCIsIGNoaWxkcmVuOiBhdHRlbmRlZXMubWFwKChhdHRlbmRlZSkgPT4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTQgYmctbmV1dHJhbC01MCByb3VuZGVkLWxnIGhvdmVyOmJnLW5ldXRyYWwtMTAwIHRyYW5zaXRpb24tY29sb3JzXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIiwgY2hpbGRyZW46IFthdHRlbmRlZS5waG90byA/IChfanN4KFwiaW1nXCIsIHsgc3JjOiBhdHRlbmRlZS5waG90bywgYWx0OiBhdHRlbmRlZS5uYW1lLCBjbGFzc05hbWU6IFwidy0xMCBoLTEwIHJvdW5kZWQtZnVsbCBvYmplY3QtY292ZXJcIiB9KSkgOiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ3LTEwIGgtMTAgcm91bmRlZC1mdWxsIGJnLXByaW1hcnktMTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIGNoaWxkcmVuOiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtcHJpbWFyeS03MDBcIiwgY2hpbGRyZW46IGdldEluaXRpYWxzKGF0dGVuZGVlLm5hbWUpIH0pIH0pKSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IGF0dGVuZGVlLm5hbWUgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogYXR0ZW5kZWUuZW1haWwgfSldIH0pXSB9KSwgX2pzeHMoQmFkZ2UsIHsgdmFyaWFudDogXCJzdWNjZXNzXCIsIGNoaWxkcmVuOiBbX2pzeChDaGVja0NpcmNsZSwgeyBjbGFzc05hbWU6IFwiaC0zIHctMyBtci0xXCIgfSksIFwiUmVnaXN0ZXJlZFwiXSB9KV0gfSwgYXR0ZW5kZWUuaWQpKSkgfSldIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKENhcmQsIHsgcGFkZGluZzogXCJsZ1wiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMCBtYi00XCIsIGNoaWxkcmVuOiBcIkF0dGVuZGFuY2VcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogW19qc3goVXNlcnMsIHsgY2xhc3NOYW1lOiBcImgtNSB3LTVcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogXCJSZWdpc3RlcmVkXCIgfSldIH0pLCBfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFttb2NrQXR0ZW5kZWVzLnJlZ2lzdGVyZWQsIFwiIC8gXCIsIG1vY2tBdHRlbmRlZXMuY2FwYWNpdHldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidy1mdWxsIGJnLW5ldXRyYWwtMjAwIHJvdW5kZWQtZnVsbCBoLTMgb3ZlcmZsb3ctaGlkZGVuXCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbignaC1mdWxsIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAnLCBnZXRQcm9ncmVzc0NvbG9yKGF0dGVuZGFuY2VQZXJjZW50YWdlKSksIHN0eWxlOiB7IHdpZHRoOiBgJHtNYXRoLm1pbihhdHRlbmRhbmNlUGVyY2VudGFnZSwgMTAwKX0lYCB9IH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbSBtdC0yXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFthdHRlbmRhbmNlUGVyY2VudGFnZSwgXCIlIGNhcGFjaXR5XCJdIH0pLCAhaXNGdWxsICYmIChfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zdWNjZXNzLTYwMCBmb250LW1lZGl1bVwiLCBjaGlsZHJlbjogW3Nwb3RzTGVmdCwgXCIgXCIsIHNwb3RzTGVmdCA9PT0gMSA/ICdzcG90JyA6ICdzcG90cycsIFwiIGxlZnRcIl0gfSkpLCBpc0Z1bGwgJiYgKF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZXJyb3ItNjAwIGZvbnQtbWVkaXVtXCIsIGNoaWxkcmVuOiBcIkZ1bGxcIiB9KSldIH0pXSB9KV0gfSldIH0pLCBfanN4cyhDYXJkLCB7IHBhZGRpbmc6IFwibGdcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDAgbWItNFwiLCBjaGlsZHJlbjogXCJMb2NhdGlvblwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0zXCIsIGNoaWxkcmVuOiBbX2pzeChNYXBQaW4sIHsgY2xhc3NOYW1lOiBcImgtNSB3LTUgdGV4dC1wcmltYXJ5LTYwMCBtdC0wLjUgZmxleC1zaHJpbmstMFwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1uZXV0cmFsLTkwMCBmb250LW1lZGl1bSBtYi0xXCIsIGNoaWxkcmVuOiBldmVudC5sb2NhdGlvbiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIkNsaWNrIGZvciBkaXJlY3Rpb25zXCIgfSldIH0pXSB9KV0gfSksIF9qc3goQ2FyZCwgeyBwYWRkaW5nOiBcImxnXCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTNcIiwgY2hpbGRyZW46IFtjYW5SZWdpc3RlciAmJiAoX2pzeChCdXR0b24sIHsgdmFyaWFudDogaXNSZWdpc3RlcmVkID8gJ291dGxpbmUnIDogJ3ByaW1hcnknLCBmdWxsV2lkdGg6IHRydWUsIG9uQ2xpY2s6IGhhbmRsZVJlZ2lzdHJhdGlvbiwgZGlzYWJsZWQ6IGlzUmVnaXN0ZXJpbmcsIGxvYWRpbmc6IGlzUmVnaXN0ZXJpbmcsIGNoaWxkcmVuOiBpc1JlZ2lzdGVyZWQgPyAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbX2pzeChYLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00IG1yLTJcIiB9KSwgXCJVbnJlZ2lzdGVyXCJdIH0pKSA6IChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4KENoZWNrQ2lyY2xlLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00IG1yLTJcIiB9KSwgXCJSZWdpc3RlciBmb3IgRXZlbnRcIl0gfSkpIH0pKSwgaXNGdWxsICYmICFpc1JlZ2lzdGVyZWQgJiYgZXZlbnQuc3RhdHVzID09PSAndXBjb21pbmcnICYmIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yIHAtMyBiZy13YXJuaW5nLTUwIGJvcmRlciBib3JkZXItd2FybmluZy0yMDAgcm91bmRlZC1sZ1wiLCBjaGlsZHJlbjogW19qc3goSW5mbywgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LXdhcm5pbmctNjAwIG10LTAuNSBmbGV4LXNocmluay0wXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC13YXJuaW5nLTgwMFwiLCBjaGlsZHJlbjogXCJUaGlzIGV2ZW50IGlzIGN1cnJlbnRseSBmdWxsLiBDaGVjayBiYWNrIGxhdGVyIGZvciBhdmFpbGFiaWxpdHkuXCIgfSldIH0pKSwgaXNBZG1pbiAmJiAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbZXZlbnQuc3RhdHVzICE9PSAnY29tcGxldGVkJyAmJiBldmVudC5zdGF0dXMgIT09ICdjYW5jZWxsZWQnICYmIChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4cyhCdXR0b24sIHsgdmFyaWFudDogXCJvdXRsaW5lXCIsIGZ1bGxXaWR0aDogdHJ1ZSwgb25DbGljazogaGFuZGxlRWRpdCwgY2hpbGRyZW46IFtfanN4KEVkaXQsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMlwiIH0pLCBcIkVkaXQgRXZlbnRcIl0gfSksIF9qc3hzKEJ1dHRvbiwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgZnVsbFdpZHRoOiB0cnVlLCBjaGlsZHJlbjogW19qc3goVXNlclBsdXMsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMlwiIH0pLCBcIk1hbmFnZSBBdHRlbmRlZXNcIl0gfSldIH0pKSwgZXZlbnQuc3RhdHVzID09PSAndXBjb21pbmcnICYmIChfanN4cyhCdXR0b24sIHsgdmFyaWFudDogXCJkYW5nZXJcIiwgZnVsbFdpZHRoOiB0cnVlLCBvbkNsaWNrOiBoYW5kbGVDYW5jZWxFdmVudCwgY2hpbGRyZW46IFtfanN4KFgsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMlwiIH0pLCBcIkNhbmNlbCBFdmVudFwiXSB9KSldIH0pKV0gfSkgfSldIH0pXSB9KV0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEV2ZW50RGV0YWlsO1xuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgNnY2bDQgMlwiLCBrZXk6IFwibW1rN3lnXCIgfV0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEyXCIsIHI6IFwiMTBcIiwga2V5OiBcIjFtZ2xheVwiIH1dXG5dO1xuY29uc3QgQ2xvY2sgPSBjcmVhdGVMdWNpZGVJY29uKFwiY2xvY2tcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIENsb2NrIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsb2NrLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMjAgMTBjMCA0Ljk5My01LjUzOSAxMC4xOTMtNy4zOTkgMTEuNzk5YTEgMSAwIDAgMS0xLjIwMiAwQzkuNTM5IDIwLjE5MyA0IDE0Ljk5MyA0IDEwYTggOCAwIDAgMSAxNiAwXCIsXG4gICAgICBrZXk6IFwiMXIwZjB6XCJcbiAgICB9XG4gIF0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEwXCIsIHI6IFwiM1wiLCBrZXk6IFwiaWxxaHI3XCIgfV1cbl07XG5jb25zdCBNYXBQaW4gPSBjcmVhdGVMdWNpZGVJY29uKFwibWFwLXBpblwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgTWFwUGluIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC1waW4uanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMiAzSDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJ2LTdcIiwga2V5OiBcIjFtMHY2Z1wiIH1dLFxuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMTguMzc1IDIuNjI1YTEgMSAwIDAgMSAzIDNsLTkuMDEzIDkuMDE0YTIgMiAwIDAgMS0uODUzLjUwNWwtMi44NzMuODRhLjUuNSAwIDAgMS0uNjItLjYybC44NC0yLjg3M2EyIDIgMCAwIDEgLjUwNi0uODUyelwiLFxuICAgICAga2V5OiBcIm9ocmJnMlwiXG4gICAgfVxuICBdXG5dO1xuY29uc3QgU3F1YXJlUGVuID0gY3JlYXRlTHVjaWRlSWNvbihcInNxdWFyZS1wZW5cIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFNxdWFyZVBlbiBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zcXVhcmUtcGVuLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MlwiLCBrZXk6IFwiMXl5aXRxXCIgfV0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjlcIiwgY3k6IFwiN1wiLCByOiBcIjRcIiwga2V5OiBcIm51Zms4XCIgfV0sXG4gIFtcImxpbmVcIiwgeyB4MTogXCIxOVwiLCB4MjogXCIxOVwiLCB5MTogXCI4XCIsIHkyOiBcIjE0XCIsIGtleTogXCIxYnZ5eG5cIiB9XSxcbiAgW1wibGluZVwiLCB7IHgxOiBcIjIyXCIsIHgyOiBcIjE2XCIsIHkxOiBcIjExXCIsIHkyOiBcIjExXCIsIGtleTogXCIxc2hqZ2xcIiB9XVxuXTtcbmNvbnN0IFVzZXJQbHVzID0gY3JlYXRlTHVjaWRlSWNvbihcInVzZXItcGx1c1wiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVXNlclBsdXMgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlci1wbHVzLmpzLm1hcFxuIl0sIm5hbWVzIjpbImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJSZWFjdCIsImN2YSIsImNuIiwiYmFkZ2VWYXJpYW50cyIsInZhcmlhbnRzIiwidmFyaWFudCIsInByaW1hcnkiLCJzdWNjZXNzIiwid2FybmluZyIsImVycm9yIiwiZGFuZ2VyIiwibmV1dHJhbCIsIm91dGxpbmUiLCJzaXplIiwic20iLCJtZCIsImxnIiwic2hhcGUiLCJyb3VuZGVkIiwicGlsbCIsImRlZmF1bHRWYXJpYW50cyIsIkJhZGdlIiwiZm9yd2FyZFJlZiIsIl9yZWYiLCJyZWYiLCJjbGFzc05hbWUiLCJpY29uIiwiY2hpbGRyZW4iLCJwcm9wcyIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsIl9leGNsdWRlZCIsIl9vYmplY3RTcHJlYWQiLCJkaXNwbGF5TmFtZSIsImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsImFwaSIsImV2ZW50QXBpIiwiZ2V0RXZlbnRzIiwiX2NhbGxlZSIsInJlc3BvbnNlIiwiX2NvbnRleHQiLCJnZXQiLCJkYXRhIiwiZ2V0RXZlbnQiLCJpZCIsIl9jYWxsZWUyIiwiX2NvbnRleHQyIiwiY29uY2F0IiwiY3JlYXRlRXZlbnQiLCJfY2FsbGVlMyIsIl9jb250ZXh0MyIsImNvbnNvbGUiLCJsb2ciLCJwb3N0IiwidXBkYXRlRXZlbnQiLCJfY2FsbGVlNCIsIl9jb250ZXh0NCIsInB1dCIsImRlbGV0ZUV2ZW50IiwiX2NhbGxlZTUiLCJfY29udGV4dDUiLCJjb21wbGV0ZUV2ZW50IiwiYXR0ZW5kYW5jZUNvdW50IiwiX2NhbGxlZTYiLCJfY29udGV4dDYiLCJhdHRlbmRhbmNlX2NvdW50IiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsIm5leHQiLCJwdXNoIiwiaXNBcnJheSIsIkZyYWdtZW50IiwiX0ZyYWdtZW50IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VQYXJhbXMiLCJ1c2VOYXZpZ2F0ZSIsIkNhbGVuZGFyIiwiTWFwUGluIiwiVXNlcnMiLCJDbG9jayIsIkFycm93TGVmdCIsIkVkaXQiLCJVc2VyUGx1cyIsIlgiLCJDaGVja0NpcmNsZSIsIkluZm8iLCJ1c2VBdXRoIiwidXNlVG9hc3QiLCJCdXR0b24iLCJDYXJkIiwic3RhdHVzQ29uZmlnIiwidXBjb21pbmciLCJsYWJlbCIsIm9uZ29pbmciLCJjb21wbGV0ZWQiLCJjYW5jZWxsZWQiLCJjYXRlZ29yeUNvbG9ycyIsIndvcnNoaXAiLCJvdXRyZWFjaCIsImZlbGxvd3NoaXAiLCJ0cmFpbmluZyIsIkV2ZW50RGV0YWlsIiwiX3VzZVBhcmFtcyIsIm5hdmlnYXRlIiwiX3VzZUF1dGgiLCJ1c2VyIiwiX3VzZVRvYXN0Iiwic2hvd1RvYXN0IiwiaXNBZG1pbiIsInJvbGUiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiZXZlbnQiLCJzZXRFdmVudCIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwiYXR0ZW5kZWVzIiwic2V0QXR0ZW5kZWVzIiwiX3VzZVN0YXRlNSIsIl91c2VTdGF0ZTYiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJfdXNlU3RhdGU3IiwiX3VzZVN0YXRlOCIsImlzUmVnaXN0ZXJlZCIsInNldElzUmVnaXN0ZXJlZCIsIl91c2VTdGF0ZTkiLCJfdXNlU3RhdGUwIiwiaXNSZWdpc3RlcmluZyIsInNldElzUmVnaXN0ZXJpbmciLCJsb2FkRXZlbnREZXRhaWxzIiwicGFyc2VJbnQiLCJldmVudElkIiwiX3QiLCJsb2FkQXR0ZW5kZWVzIiwiX3giLCJfcmVmMiIsIm1vY2tBdHRlbmRlZXMiLCJlbWFpbCIsInBob3RvIiwicmVnaXN0cmF0aW9uX3N0YXR1cyIsInJlZ2lzdGVyZWRfYXQiLCJfeDIiLCJoYW5kbGVCYWNrIiwiaGFuZGxlRWRpdCIsInN0YXRlIiwiZWRpdEV2ZW50SWQiLCJoYW5kbGVSZWdpc3RyYXRpb24iLCJfcmVmMyIsIl90MiIsInNldFRpbWVvdXQiLCJoYW5kbGVDYW5jZWxFdmVudCIsIl9yZWY0IiwiX3QzIiwiY29uZmlybSIsImdldEluaXRpYWxzIiwic3BsaXQiLCJtYXAiLCJ3b3JkIiwiam9pbiIsInRvVXBwZXJDYXNlIiwiZm9ybWF0RGF0ZSIsImRhdGVTdHJpbmciLCJkYXRlIiwiRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsIndlZWtkYXkiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJmb3JtYXRUaW1lIiwidGltZVN0cmluZyIsIl90aW1lU3RyaW5nJHNwbGl0IiwiX3RpbWVTdHJpbmckc3BsaXQyIiwiaG91cnMiLCJtaW51dGVzIiwiaG91ciIsImFtcG0iLCJkaXNwbGF5SG91ciIsImdldENhdGVnb3J5Q29sb3IiLCJjYXRlZ29yeSIsIm5vcm1hbGl6ZWRDYXRlZ29yeSIsInRvTG93ZXJDYXNlIiwiZ2V0UHJvZ3Jlc3NDb2xvciIsInBlcmNlbnRhZ2UiLCJvbkNsaWNrIiwic3RhdHVzSW5mbyIsInN0YXR1cyIsInJlZ2lzdGVyZWQiLCJjYXBhY2l0eSIsImF0dGVuZGFuY2VQZXJjZW50YWdlIiwiTWF0aCIsInJvdW5kIiwic3BvdHNMZWZ0IiwiaXNGdWxsIiwiY2FuUmVnaXN0ZXIiLCJtb2NrQ2F0ZWdvcnkiLCJ0aXRsZSIsImV2ZW50X2RhdGUiLCJldmVudF90aW1lIiwibG9jYXRpb24iLCJwYWRkaW5nIiwiZGVzY3JpcHRpb24iLCJhdHRlbmRlZSIsInNyYyIsImFsdCIsInN0eWxlIiwid2lkdGgiLCJtaW4iLCJmdWxsV2lkdGgiLCJkaXNhYmxlZCIsImxvYWRpbmciXSwic291cmNlUm9vdCI6IiJ9