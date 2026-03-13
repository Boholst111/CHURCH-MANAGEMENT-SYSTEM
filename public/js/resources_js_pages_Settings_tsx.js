"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_Settings_tsx"],{

/***/ "./resources/js/components/admin/FeatureFlagAdminPanel.tsx"
/*!*****************************************************************!*\
  !*** ./resources/js/components/admin/FeatureFlagAdminPanel.tsx ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FeatureFlagAdminPanel: () => (/* binding */ FeatureFlagAdminPanel)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check-big.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye-off.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/info.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/percent.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/refresh-cw.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/save.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/settings.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/shield.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/toggle-left.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/toggle-right.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trending-up.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/users.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/zap.js");
/* harmony import */ var _ui_card__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _ui_input__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../ui/input */ "./resources/js/components/ui/input.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _ui_badge__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../ui/badge */ "./resources/js/components/ui/badge.tsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
 * Feature Flag Admin Panel Component
 *
 * Comprehensive admin interface for managing feature flags.
 *
 * Features:
 * - Enable/disable master switch
 * - Manage beta user list
 * - Control rollout percentage
 * - Toggle per-page flags
 * - View statistics dashboard
 * - User-level overrides for testing
 *
 * Design Reference: Migration Strategy section
 */
function FeatureFlagAdminPanel() {
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_20__.useToast)(),
    showToast = _useToast.showToast;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    saving = _useState4[0],
    setSaving = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    config = _useState6[0],
    setConfig = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    users = _useState8[0],
    setUsers = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState0 = _slicedToArray(_useState9, 2),
    selectedBetaUsers = _useState0[0],
    setSelectedBetaUsers = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState10 = _slicedToArray(_useState1, 2),
    rolloutPercentage = _useState10[0],
    setRolloutPercentage = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    masterEnabled = _useState12[0],
    setMasterEnabled = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState14 = _slicedToArray(_useState13, 2),
    pageFlags = _useState14[0],
    setPageFlags = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    showUserSelector = _useState16[0],
    setShowUserSelector = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState18 = _slicedToArray(_useState17, 2),
    searchQuery = _useState18[0],
    setSearchQuery = _useState18[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    loadConfig();
    loadUsers();
  }, []);
  var loadConfig = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, result, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return fetch('/api/feature-flags/admin', {
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                'Accept': 'application/json'
              }
            });
          case 1:
            response = _context.v;
            if (response.ok) {
              _context.n = 2;
              break;
            }
            throw new Error('Failed to load feature flag configuration');
          case 2:
            _context.n = 3;
            return response.json();
          case 3:
            result = _context.v;
            if (result.success) {
              setConfig(result.data);
              setMasterEnabled(result.data.enabled);
              setSelectedBetaUsers(result.data.beta_users);
              setRolloutPercentage(result.data.rollout_percentage);
              setPageFlags(result.data.pages);
            }
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            showToast('error', 'Failed to load feature flag configuration');
            console.error('Error loading config:', _t);
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[0, 4, 5, 6]]);
    }));
    return function loadConfig() {
      return _ref.apply(this, arguments);
    };
  }();
  var loadUsers = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response, result, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return fetch('/api/feature-flags/admin/users', {
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                'Accept': 'application/json'
              }
            });
          case 1:
            response = _context2.v;
            if (response.ok) {
              _context2.n = 2;
              break;
            }
            throw new Error('Failed to load users');
          case 2:
            _context2.n = 3;
            return response.json();
          case 3:
            result = _context2.v;
            if (result.success) {
              setUsers(result.data);
            }
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            console.error('Error loading users:', _t2);
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 4]]);
    }));
    return function loadUsers() {
      return _ref2.apply(this, arguments);
    };
  }();
  var saveConfig = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var response, result, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            setSaving(true);
            _context3.p = 1;
            _context3.n = 2;
            return fetch('/api/feature-flags/admin', {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                enabled: masterEnabled,
                beta_users: selectedBetaUsers,
                rollout_percentage: rolloutPercentage,
                pages: pageFlags
              })
            });
          case 2:
            response = _context3.v;
            if (response.ok) {
              _context3.n = 3;
              break;
            }
            throw new Error('Failed to save feature flag configuration');
          case 3:
            _context3.n = 4;
            return response.json();
          case 4:
            result = _context3.v;
            if (!result.success) {
              _context3.n = 6;
              break;
            }
            showToast('success', 'Feature flags updated successfully');
            _context3.n = 5;
            return loadConfig();
          case 5:
            _context3.n = 7;
            break;
          case 6:
            throw new Error(result.message || 'Failed to save configuration');
          case 7:
            _context3.n = 9;
            break;
          case 8:
            _context3.p = 8;
            _t3 = _context3.v;
            showToast('error', _t3 instanceof Error ? _t3.message : 'Failed to save feature flags');
            console.error('Error saving config:', _t3);
          case 9:
            _context3.p = 9;
            setSaving(false);
            return _context3.f(9);
          case 10:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 8, 9, 10]]);
    }));
    return function saveConfig() {
      return _ref3.apply(this, arguments);
    };
  }();
  var toggleBetaUser = function toggleBetaUser(userId) {
    setSelectedBetaUsers(function (prev) {
      return prev.includes(userId) ? prev.filter(function (id) {
        return id !== userId;
      }) : [].concat(_toConsumableArray(prev), [userId]);
    });
  };
  var togglePageFlag = function togglePageFlag(page) {
    setPageFlags(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, page, !prev[page]));
    });
  };
  var filteredUsers = users.filter(function (user) {
    return user.name.toLowerCase().includes(String(searchQuery).toLowerCase()) || user.email.toLowerCase().includes(String(searchQuery).toLowerCase());
  });
  if (loading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
      className: "p-6",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "flex items-center justify-center py-12",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
          className: "w-8 h-8 text-primary-600 animate-spin"
        })
      })
    });
  }
  if (!config) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
      className: "p-6",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-3 text-error-600",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "w-6 h-6"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: "Failed to load feature flag configuration"
        })]
      })
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex items-center justify-between",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
          className: "text-2xl font-bold text-neutral-900",
          children: "Feature Flag Management"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-neutral-600 mt-1",
          children: "Control the rollout of the Modern UI/UX redesign"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_18__.Button, {
        onClick: saveConfig,
        disabled: saving,
        icon: saving ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
          className: "animate-spin"
        }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {}),
        children: saving ? 'Saving...' : 'Save Changes'
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
        className: "p-4",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "p-2 bg-primary-100 rounded-lg",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], {
              className: "w-5 h-5 text-primary-600"
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-600",
              children: "Total Users"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-2xl font-bold text-neutral-900",
              children: config.stats.total_users
            })]
          })]
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
        className: "p-4",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "p-2 bg-success-100 rounded-lg",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
              className: "w-5 h-5 text-success-600"
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-600",
              children: "Beta Users"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-2xl font-bold text-neutral-900",
              children: config.stats.beta_users_count
            })]
          })]
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
        className: "p-4",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "p-2 bg-info-100 rounded-lg",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_14__["default"], {
              className: "w-5 h-5 text-info-600"
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-600",
              children: "Rollout Users"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-2xl font-bold text-neutral-900",
              children: config.stats.rollout_users_count
            })]
          })]
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
        className: "p-4",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "p-2 bg-warning-100 rounded-lg",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_16__["default"], {
              className: "w-5 h-5 text-warning-600"
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-600",
              children: "Total Enabled"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
              className: "text-2xl font-bold text-neutral-900",
              children: [config.stats.total_enabled_users, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "text-sm text-neutral-600 ml-1",
                children: ["(", config.stats.percentage_enabled, "%)"]
              })]
            })]
          })]
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
      className: "p-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "p-2 bg-primary-100 rounded-lg",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
              className: "w-5 h-5 text-primary-600"
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-semibold text-neutral-900",
              children: "Master Switch"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-600",
              children: "Enable or disable Modern UI globally"
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
          onClick: function onClick() {
            return setMasterEnabled(!masterEnabled);
          },
          className: "flex items-center gap-2 transition-colors",
          children: masterEnabled ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"], {
              className: "w-10 h-10 text-success-600"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-sm font-medium text-success-600",
              children: "Enabled"
            })]
          }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], {
              className: "w-10 h-10 text-neutral-400"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-sm font-medium text-neutral-600",
              children: "Disabled"
            })]
          })
        })]
      }), !masterEnabled && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-start gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "w-4 h-4 text-warning-600 mt-0.5 flex-shrink-0"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-warning-900",
            children: "Modern UI is currently disabled for all users. Enable the master switch to start the rollout."
          })]
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
      className: "p-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-between mb-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "p-2 bg-success-100 rounded-lg",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], {
              className: "w-5 h-5 text-success-600"
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-semibold text-neutral-900",
              children: "Beta Users"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-600",
              children: "Select specific users for beta testing"
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_button__WEBPACK_IMPORTED_MODULE_18__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return setShowUserSelector(!showUserSelector);
          },
          icon: showUserSelector ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {}) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {}),
          children: [showUserSelector ? 'Hide' : 'Show', " Users"]
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2 mb-3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_badge__WEBPACK_IMPORTED_MODULE_21__.Badge, {
          variant: "primary",
          children: [selectedBetaUsers.length, " user", selectedBetaUsers.length !== 1 ? 's' : '', " selected"]
        }), selectedBetaUsers.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_18__.Button, {
          variant: "ghost",
          size: "sm",
          onClick: function onClick() {
            return setSelectedBetaUsers([]);
          },
          children: "Clear All"
        })]
      }), showUserSelector && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_19__.Input, {
          type: "text",
          placeholder: "Search users by name or email...",
          value: searchQuery,
          onChange: function onChange(value) {
            return setSearchQuery(String(value));
          }
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "max-h-64 overflow-y-auto border border-neutral-200 rounded-lg",
          children: filteredUsers.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "p-4 text-center text-neutral-600",
            children: "No users found"
          }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "divide-y divide-neutral-200",
            children: filteredUsers.map(function (user) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "flex items-center gap-3 p-3 hover:bg-neutral-50 cursor-pointer transition-colors",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  checked: selectedBetaUsers.includes(user.id),
                  onChange: function onChange() {
                    return toggleBetaUser(user.id);
                  },
                  className: "w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex-1",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm font-medium text-neutral-900",
                    children: user.name
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs text-neutral-600",
                    children: user.email
                  })]
                }), selectedBetaUsers.includes(user.id) && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                  className: "w-4 h-4 text-success-600"
                })]
              }, user.id);
            })
          })
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "mt-4 p-3 bg-info-50 border border-info-200 rounded-lg",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-start gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
            className: "w-4 h-4 text-info-600 mt-0.5 flex-shrink-0"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-info-900",
            children: "Beta users will always see the Modern UI when the master switch is enabled, regardless of the rollout percentage."
          })]
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
      className: "p-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-3 mb-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "p-2 bg-info-100 rounded-lg",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
            className: "w-5 h-5 text-info-600"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-lg font-semibold text-neutral-900",
            children: "Rollout Percentage"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-neutral-600",
            children: "Gradually roll out to a percentage of users"
          })]
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center justify-between mb-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "text-sm font-medium text-neutral-700",
              children: ["Percentage: ", rolloutPercentage, "%"]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_badge__WEBPACK_IMPORTED_MODULE_21__.Badge, {
              variant: rolloutPercentage === 0 ? 'neutral' : 'primary',
              children: rolloutPercentage === 0 ? 'No rollout' : rolloutPercentage === 100 ? 'Full rollout' : "".concat(rolloutPercentage, "% rollout")
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "range",
            min: "0",
            max: "100",
            step: "5",
            value: rolloutPercentage,
            onChange: function onChange(e) {
              return setRolloutPercentage(Number(e.target.value));
            },
            className: "w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex justify-between text-xs text-neutral-600 mt-1",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: "0%"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: "25%"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: "50%"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: "75%"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: "100%"
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "p-3 bg-warning-50 border border-warning-200 rounded-lg",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-start gap-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
              className: "w-4 h-4 text-warning-600 mt-0.5 flex-shrink-0"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "text-sm text-warning-900",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "font-medium mb-1",
                children: "Rollout Strategy"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                children: "Users are selected deterministically based on their user ID. The same users will always see the Modern UI at a given percentage. Beta users are excluded from this calculation."
              })]
            })]
          })
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_card__WEBPACK_IMPORTED_MODULE_17__.Card, {
      className: "p-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-3 mb-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "p-2 bg-warning-100 rounded-lg",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
            className: "w-5 h-5 text-warning-600"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-lg font-semibold text-neutral-900",
            children: "Page-Specific Flags"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-neutral-600",
            children: "Control Modern UI for individual pages"
          })]
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-3",
        children: Object.entries(pageFlags).map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
            page = _ref5[0],
            enabled = _ref5[1];
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-sm font-medium text-neutral-900 capitalize",
              children: page.replace(/_/g, ' ')
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              onClick: function onClick() {
                return togglePageFlag(page);
              },
              className: "flex items-center gap-2",
              disabled: !masterEnabled,
              children: enabled ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"], {
                  className: "w-8 h-8 text-success-600"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-xs font-medium text-success-600",
                  children: "On"
                })]
              }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], {
                  className: "w-8 h-8 text-neutral-400"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-xs font-medium text-neutral-600",
                  children: "Off"
                })]
              })
            })]
          }, page);
        })
      }), !masterEnabled && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "mt-4 p-3 bg-neutral-100 border border-neutral-300 rounded-lg",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-neutral-600",
          children: "Page-specific flags are only active when the master switch is enabled."
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex justify-end",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_18__.Button, {
        onClick: saveConfig,
        disabled: saving,
        size: "lg",
        icon: saving ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
          className: "animate-spin"
        }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {}),
        children: saving ? 'Saving Changes...' : 'Save All Changes'
      })
    })]
  });
}

/***/ },

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

/***/ "./resources/js/components/ui/input.tsx"
/*!**********************************************!*\
  !*** ./resources/js/components/ui/input.tsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input),
/* harmony export */   inputVariants: () => (/* binding */ inputVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-variance-authority */ "./node_modules/class-variance-authority/dist/index.mjs");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/utils */ "./resources/js/lib/utils.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className", "type", "label", "error", "helperText", "icon", "iconPosition", "fullWidth", "disabled", "required", "id", "variant", "size", "inputMode"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }




var inputVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__.cva)("block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0", {
  variants: {
    variant: {
      "default": "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:ring-primary-500",
      error: "border-error-500 bg-error-50 text-error-900 placeholder-error-400 focus:border-error-500 focus:ring-error-500"
    },
    size: {
      sm: "px-3 py-1.5 text-sm h-8",
      md: "px-4 py-2 text-base h-10 min-h-[44px]",
      // Minimum 44px for touch targets on mobile
      lg: "px-4 py-3 text-lg h-12"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
/**
 * Get appropriate inputMode for mobile keyboards based on input type
 */
var getInputMode = function getInputMode(type) {
  switch (type) {
    case 'email':
      return 'email';
    case 'tel':
      return 'tel';
    case 'number':
      return 'numeric';
    case 'url':
      return 'url';
    case 'search':
      return 'search';
    default:
      return 'text';
  }
};
var Input = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    label = _ref.label,
    error = _ref.error,
    helperText = _ref.helperText,
    icon = _ref.icon,
    _ref$iconPosition = _ref.iconPosition,
    iconPosition = _ref$iconPosition === void 0 ? 'left' : _ref$iconPosition,
    _ref$fullWidth = _ref.fullWidth,
    fullWidth = _ref$fullWidth === void 0 ? true : _ref$fullWidth,
    disabled = _ref.disabled,
    required = _ref.required,
    id = _ref.id,
    variant = _ref.variant,
    size = _ref.size,
    inputMode = _ref.inputMode,
    props = _objectWithoutProperties(_ref, _excluded);
  var inputId = id || "input-".concat(react__WEBPACK_IMPORTED_MODULE_1__.useId());
  var errorId = error ? "".concat(inputId, "-error") : undefined;
  var helperTextId = helperText ? "".concat(inputId, "-helper") : undefined;
  var hasError = !!error;
  var currentVariant = hasError ? 'error' : variant;
  // Use provided inputMode or determine from type for mobile keyboard optimization
  var mobileInputMode = inputMode || getInputMode(type);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("space-y-1", fullWidth && "w-full"),
    children: [label && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
      htmlFor: inputId,
      className: "block text-sm font-medium text-neutral-700",
      children: [label, required && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "text-error-500 ml-1",
        "aria-label": "required",
        children: "*"
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "relative",
      children: [icon && iconPosition === 'left' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none",
        "aria-hidden": "true",
        children: icon
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", _objectSpread({
        ref: ref,
        type: type,
        id: inputId,
        disabled: disabled,
        required: required,
        inputMode: mobileInputMode,
        "aria-invalid": hasError,
        "aria-describedby": (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(errorId && errorId, helperTextId && helperTextId) || undefined,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(inputVariants({
          variant: currentVariant,
          size: size
        }), icon && iconPosition === 'left' && "pl-10", icon && iconPosition === 'right' && "pr-10", disabled && "bg-neutral-100 text-neutral-500 cursor-not-allowed", className)
      }, props)), icon && iconPosition === 'right' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none",
        "aria-hidden": "true",
        children: icon
      })]
    }), error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      id: errorId,
      className: "text-sm text-error-600",
      role: "alert",
      children: error
    }), helperText && !error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      id: helperTextId,
      className: "text-sm text-neutral-500",
      children: helperText
    })]
  });
});
Input.displayName = "Input";


/***/ },

/***/ "./resources/js/components/ui/select.tsx"
/*!***********************************************!*\
  !*** ./resources/js/components/ui/select.tsx ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Select: () => (/* binding */ Select),
/* harmony export */   selectTriggerVariants: () => (/* binding */ selectTriggerVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-variance-authority */ "./node_modules/class-variance-authority/dist/index.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/check.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-down.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/search.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/utils */ "./resources/js/lib/utils.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className", "label", "error", "helperText", "options", "value", "onChange", "placeholder", "disabled", "required", "multiple", "searchable", "fullWidth", "variant", "size", "id"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }





var selectTriggerVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__.cva)("flex items-center justify-between w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 cursor-pointer", {
  variants: {
    variant: {
      "default": "border-neutral-300 bg-white text-neutral-900 focus:border-primary-500 focus:ring-primary-500",
      error: "border-error-500 bg-error-50 text-error-900 focus:border-error-500 focus:ring-error-500"
    },
    size: {
      sm: "px-3 py-1.5 text-sm h-8",
      md: "px-4 py-2 text-base h-10 min-h-[44px]",
      // Minimum 44px for touch targets on mobile
      lg: "px-4 py-3 text-lg h-12"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
var Select = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    label = _ref.label,
    error = _ref.error,
    helperText = _ref.helperText,
    options = _ref.options,
    value = _ref.value,
    onChange = _ref.onChange,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "Select an option" : _ref$placeholder,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$required = _ref.required,
    required = _ref$required === void 0 ? false : _ref$required,
    _ref$multiple = _ref.multiple,
    multiple = _ref$multiple === void 0 ? false : _ref$multiple,
    _ref$searchable = _ref.searchable,
    searchable = _ref$searchable === void 0 ? false : _ref$searchable,
    _ref$fullWidth = _ref.fullWidth,
    fullWidth = _ref$fullWidth === void 0 ? true : _ref$fullWidth,
    variant = _ref.variant,
    size = _ref.size,
    id = _ref.id,
    props = _objectWithoutProperties(_ref, _excluded);
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isOpen = _React$useState2[0],
    setIsOpen = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1__.useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    searchQuery = _React$useState4[0],
    setSearchQuery = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_1__.useState(-1),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    focusedIndex = _React$useState6[0],
    setFocusedIndex = _React$useState6[1];
  var containerRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null);
  var searchInputRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null);
  var dropdownRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null);
  var selectId = id || "select-".concat(react__WEBPACK_IMPORTED_MODULE_1__.useId());
  var errorId = error ? "".concat(selectId, "-error") : undefined;
  var helperTextId = helperText ? "".concat(selectId, "-helper") : undefined;
  var hasError = !!error;
  var currentVariant = hasError ? 'error' : variant;
  // Normalize value to array for easier handling
  var selectedValues = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(function () {
    if (value === undefined || value === null) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);
  // Filter options based on search query
  var filteredOptions = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(function () {
    if (!searchQuery) return options;
    return options.filter(function (option) {
      return option.label.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [options, searchQuery]);
  // Get display text for selected values
  var displayText = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(function () {
    if (selectedValues.length === 0) return placeholder;
    if (multiple) {
      if (selectedValues.length === 1) {
        var _option = options.find(function (opt) {
          return opt.value === selectedValues[0];
        });
        return (_option === null || _option === void 0 ? void 0 : _option.label) || placeholder;
      }
      return "".concat(selectedValues.length, " selected");
    }
    var option = options.find(function (opt) {
      return opt.value === selectedValues[0];
    });
    return (option === null || option === void 0 ? void 0 : option.label) || placeholder;
  }, [selectedValues, options, placeholder, multiple]);
  // Handle option selection
  var handleSelect = function handleSelect(optionValue) {
    if (disabled) return;
    var newValue;
    if (multiple) {
      if (selectedValues.includes(optionValue)) {
        newValue = selectedValues.filter(function (v) {
          return v !== optionValue;
        });
      } else {
        newValue = [].concat(_toConsumableArray(selectedValues), [optionValue]);
      }
    } else {
      newValue = optionValue;
      setIsOpen(false);
    }
    onChange === null || onChange === void 0 || onChange(newValue);
    setSearchQuery("");
  };
  // Handle removing a selected value (for multiple select)
  var handleRemove = function handleRemove(optionValue, e) {
    e.stopPropagation();
    if (disabled) return;
    var newValue = selectedValues.filter(function (v) {
      return v !== optionValue;
    });
    onChange === null || onChange === void 0 || onChange(newValue);
  };
  // Handle keyboard navigation
  var handleKeyDown = function handleKeyDown(e) {
    if (disabled) return;
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[focusedIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery("");
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(function (prev) {
            return prev < filteredOptions.length - 1 ? prev + 1 : prev;
          });
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(function (prev) {
            return prev > 0 ? prev - 1 : 0;
          });
        }
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
          setSearchQuery("");
        }
        break;
    }
  };
  // Close dropdown when clicking outside
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery("");
        setFocusedIndex(-1);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return function () {
        return document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);
  // Focus search input when dropdown opens
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(function () {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);
  // Scroll focused option into view
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(function () {
    if (focusedIndex >= 0 && dropdownRef.current) {
      var focusedElement = dropdownRef.current.children[focusedIndex];
      if (focusedElement && focusedElement.scrollIntoView) {
        focusedElement.scrollIntoView({
          block: 'nearest'
        });
      }
    }
  }, [focusedIndex]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", _objectSpread(_objectSpread({
    ref: containerRef,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__.cn)("space-y-1", fullWidth && "w-full", className)
  }, props), {}, {
    children: [label && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
      htmlFor: selectId,
      className: "block text-sm font-medium text-neutral-700",
      children: [label, required && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "text-error-500 ml-1",
        "aria-label": "required",
        children: "*"
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "relative",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: ref,
        id: selectId,
        role: "combobox",
        "aria-expanded": isOpen,
        "aria-haspopup": "listbox",
        "aria-controls": "".concat(selectId, "-listbox"),
        "aria-invalid": hasError,
        "aria-describedby": (0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__.cn)(errorId && errorId, helperTextId && helperTextId) || undefined,
        "aria-required": required,
        "aria-disabled": disabled,
        tabIndex: disabled ? -1 : 0,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__.cn)(selectTriggerVariants({
          variant: currentVariant,
          size: size
        }), disabled && "bg-neutral-100 text-neutral-500 cursor-not-allowed opacity-60", className),
        onClick: function onClick() {
          return !disabled && setIsOpen(!isOpen);
        },
        onKeyDown: handleKeyDown,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "flex-1 flex items-center gap-1 flex-wrap min-h-0",
          children: multiple && selectedValues.length > 0 ? selectedValues.map(function (val) {
            var option = options.find(function (opt) {
              return opt.value === val;
            });
            return option ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
              className: "inline-flex items-center gap-1 px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-sm",
              children: [option.label, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onClick: function onClick(e) {
                  return handleRemove(val, e);
                },
                className: "hover:bg-primary-200 rounded-full p-0.5 transition-colors",
                "aria-label": "Remove ".concat(option.label),
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  className: "h-3 w-3"
                })
              })]
            }, val) : null;
          }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__.cn)("truncate", selectedValues.length === 0 && "text-neutral-400"),
            children: displayText
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__.cn)("h-4 w-4 text-neutral-500 transition-transform duration-200 flex-shrink-0 ml-2", isOpen && "transform rotate-180"),
          "aria-hidden": "true"
        })]
      }), isOpen && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        id: "".concat(selectId, "-listbox"),
        role: "listbox",
        "aria-multiselectable": multiple,
        className: "absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-auto animate-in fade-in-0 zoom-in-95",
        children: [searchable && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "sticky top-0 bg-white border-b border-neutral-200 p-2",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "relative",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
              className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400",
              "aria-hidden": "true"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              ref: searchInputRef,
              type: "text",
              value: searchQuery,
              onChange: function onChange(e) {
                setSearchQuery(e.target.value);
                setFocusedIndex(0);
              },
              placeholder: "Search...",
              className: "w-full pl-9 pr-3 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
              onClick: function onClick(e) {
                return e.stopPropagation();
              },
              "aria-label": "Search options"
            })]
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          ref: dropdownRef,
          children: filteredOptions.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "px-4 py-3 text-sm text-neutral-500 text-center",
            children: "No options found"
          }) : filteredOptions.map(function (option, index) {
            var isSelected = selectedValues.includes(option.value);
            var isFocused = index === focusedIndex;
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              role: "option",
              "aria-selected": isSelected,
              "aria-disabled": option.disabled,
              className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_7__.cn)("flex items-center justify-between px-4 py-2 cursor-pointer transition-colors", isSelected && "bg-primary-50 text-primary-700", !isSelected && !option.disabled && "hover:bg-neutral-50", isFocused && "bg-neutral-100", option.disabled && "opacity-50 cursor-not-allowed"),
              onClick: function onClick() {
                return !option.disabled && handleSelect(option.value);
              },
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm",
                children: option.label
              }), isSelected && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                className: "h-4 w-4 text-primary-600",
                "aria-hidden": "true"
              })]
            }, option.value);
          })
        })]
      })]
    }), error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      id: errorId,
      className: "text-sm text-error-600",
      role: "alert",
      children: error
    }), helperText && !error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      id: helperTextId,
      className: "text-sm text-neutral-500",
      children: helperText
    })]
  }));
});
Select.displayName = "Select";


/***/ },

/***/ "./resources/js/pages/Settings.tsx"
/*!*****************************************!*\
  !*** ./resources/js/pages/Settings.tsx ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check-big.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/pen.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/archive.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/building-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/calendar.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/check.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/clock.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/credit-card.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/database.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/dollar-sign.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/download.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye-off.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/hard-drive.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/key.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/mail.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/message-square.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plug.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/rotate-ccw.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/send.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/settings.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/shield.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trash-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/upload.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/video.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/zap.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../lib/utils */ "./resources/js/lib/utils.ts");
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../components/ui/input */ "./resources/js/components/ui/input.tsx");
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../components/ui/select */ "./resources/js/components/ui/select.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../components/ui/badge */ "./resources/js/components/ui/badge.tsx");
/* harmony import */ var _components_admin_FeatureFlagAdminPanel__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ../components/admin/FeatureFlagAdminPanel */ "./resources/js/components/admin/FeatureFlagAdminPanel.tsx");
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










var Settings = function Settings() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('general'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_36__.useToast)(),
    showToast = _useToast.showToast;
  // General Settings state
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      appName: 'MFMC System',
      timezone: 'Asia/Manila',
      dateFormat: 'MM/DD/YYYY',
      currency: 'PHP',
      theme: 'Light',
      language: 'English',
      itemsPerPage: 25
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    generalSettings = _useState4[0],
    setGeneralSettings = _useState4[1];
  // Church Information state
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      // Basic Information
      churchName: 'My First Miracle Church',
      denomination: 'Non-denominational',
      foundedYear: '2010',
      // Contact Information
      address: '123 Church Street, Manila, Philippines',
      phone: '+63 912 345 6789',
      email: 'info@mfmc.church',
      website: 'https://www.mfmc.church',
      // Social Media
      facebook: 'https://facebook.com/mfmc',
      twitter: 'https://twitter.com/mfmc',
      instagram: 'https://instagram.com/mfmc',
      youtube: 'https://youtube.com/@mfmc',
      // Branding
      logo: null,
      primaryColor: '#0ea5e9'
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    churchInfo = _useState6[0],
    setChurchInfo = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    logoPreview = _useState8[0],
    setLogoPreview = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    isSaving = _useState0[0],
    setIsSaving = _useState0[1];
  // Finance Settings state
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      fiscalYearStart: '1',
      // January
      requireApproval: true,
      approvalThreshold: 5000,
      defaultOfferingType: '',
      defaultExpenseCategory: '',
      defaultFund: ''
    }),
    _useState10 = _slicedToArray(_useState1, 2),
    financeSettings = _useState10[0],
    setFinanceSettings = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    offeringTypes = _useState12[0],
    setOfferingTypes = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState14 = _slicedToArray(_useState13, 2),
    expenseCategories = _useState14[0],
    setExpenseCategories = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState16 = _slicedToArray(_useState15, 2),
    funds = _useState16[0],
    setFunds = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState18 = _slicedToArray(_useState17, 2),
    editingOfferingType = _useState18[0],
    setEditingOfferingType = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    editingExpenseCategory = _useState20[0],
    setEditingExpenseCategory = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState22 = _slicedToArray(_useState21, 2),
    editingFund = _useState22[0],
    setEditingFund = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      name: '',
      description: ''
    }),
    _useState24 = _slicedToArray(_useState23, 2),
    newOfferingType = _useState24[0],
    setNewOfferingType = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      name: '',
      description: ''
    }),
    _useState26 = _slicedToArray(_useState25, 2),
    newExpenseCategory = _useState26[0],
    setNewExpenseCategory = _useState26[1];
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      name: '',
      type: 'unrestricted',
      description: ''
    }),
    _useState28 = _slicedToArray(_useState27, 2),
    newFund = _useState28[0],
    setNewFund = _useState28[1];
  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState30 = _slicedToArray(_useState29, 2),
    showAddOfferingType = _useState30[0],
    setShowAddOfferingType = _useState30[1];
  var _useState31 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState32 = _slicedToArray(_useState31, 2),
    showAddExpenseCategory = _useState32[0],
    setShowAddExpenseCategory = _useState32[1];
  var _useState33 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState34 = _slicedToArray(_useState33, 2),
    showAddFund = _useState34[0],
    setShowAddFund = _useState34[1];
  // Email & Notifications state
  var _useState35 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      // SMTP Configuration
      smtpHost: '',
      smtpPort: '587',
      smtpUsername: '',
      smtpPassword: '',
      smtpEncryption: 'tls',
      smtpFromEmail: '',
      smtpFromName: 'MFMC System',
      // Notification Preferences
      enableEmailNotifications: true,
      enableInAppNotifications: true,
      // Notification Types
      notifyNewMember: true,
      notifyEventReminder: true,
      notifyFinanceApproval: true,
      notifyExpenseSubmitted: true,
      notifyOfferingRecorded: false,
      notifyBudgetThreshold: true,
      notifyUserInvite: true,
      notifySystemUpdate: true
    }),
    _useState36 = _slicedToArray(_useState35, 2),
    emailNotificationSettings = _useState36[0],
    setEmailNotificationSettings = _useState36[1];
  var _useState37 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState38 = _slicedToArray(_useState37, 2),
    isSendingTestEmail = _useState38[0],
    setIsSendingTestEmail = _useState38[1];
  var _useState39 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState40 = _slicedToArray(_useState39, 2),
    showSmtpPassword = _useState40[0],
    setShowSmtpPassword = _useState40[1];
  // Security Settings state
  var _useState41 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      // Password Policy
      minPasswordLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      passwordExpiryDays: 90,
      // Session Settings
      sessionTimeout: 30,
      // 30 minutes
      // Two-Factor Authentication
      enable2FA: false,
      // Login Security
      maxLoginAttempts: 5,
      lockoutDuration: 15 // 15 minutes
    }),
    _useState42 = _slicedToArray(_useState41, 2),
    securitySettings = _useState42[0],
    setSecuritySettings = _useState42[1];
  var _useState43 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState44 = _slicedToArray(_useState43, 2),
    auditLogs = _useState44[0],
    setAuditLogs = _useState44[1];
  var _useState45 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState46 = _slicedToArray(_useState45, 2),
    isLoadingAuditLogs = _useState46[0],
    setIsLoadingAuditLogs = _useState46[1];
  // Backup & Restore state
  var _useState47 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState48 = _slicedToArray(_useState47, 2),
    backups = _useState48[0],
    setBackups = _useState48[1];
  var _useState49 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState50 = _slicedToArray(_useState49, 2),
    isLoadingBackups = _useState50[0],
    setIsLoadingBackups = _useState50[1];
  var _useState51 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState52 = _slicedToArray(_useState51, 2),
    isCreatingBackup = _useState52[0],
    setIsCreatingBackup = _useState52[1];
  var _useState53 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      enableAutoBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      retentionDays: 30,
      includeUploads: true
    }),
    _useState54 = _slicedToArray(_useState53, 2),
    backupSettings = _useState54[0],
    setBackupSettings = _useState54[1];
  var _useState55 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState56 = _slicedToArray(_useState55, 2),
    lastBackup = _useState56[0],
    setLastBackup = _useState56[1];
  var _useState57 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState58 = _slicedToArray(_useState57, 2),
    restoreConfirmation = _useState58[0],
    setRestoreConfirmation = _useState58[1];
  // Integrations state
  var _useState59 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState60 = _slicedToArray(_useState59, 2),
    integrations = _useState60[0],
    setIntegrations = _useState60[1];
  var _useState61 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState62 = _slicedToArray(_useState61, 2),
    configuringIntegration = _useState62[0],
    setConfiguringIntegration = _useState62[1];
  var _useState63 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      apiKey: '',
      apiSecret: '',
      webhookUrl: '',
      additionalSettings: {}
    }),
    _useState64 = _slicedToArray(_useState63, 2),
    integrationConfig = _useState64[0],
    setIntegrationConfig = _useState64[1];
  var _useState65 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState66 = _slicedToArray(_useState65, 2),
    showApiKey = _useState66[0],
    setShowApiKey = _useState66[1];
  var _useState67 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState68 = _slicedToArray(_useState67, 2),
    isSavingIntegration = _useState68[0],
    setIsSavingIntegration = _useState68[1];
  var _useState69 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      autoArchiveEnabled: false,
      autoArchiveDays: 365,
      retentionPeriod: 90,
      allowRestore: true,
      requireConfirmation: true,
      notifyOnArchive: true
    }),
    _useState70 = _slicedToArray(_useState69, 2),
    archiveSettings = _useState70[0],
    setArchiveSettings = _useState70[1];
  // Load finance data on mount
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (activeTab === 'finance') {
      loadFinanceData();
    } else if (activeTab === 'security') {
      loadAuditLogs();
    } else if (activeTab === 'backup') {
      loadBackups();
    } else if (activeTab === 'integrations') {
      loadIntegrations();
    }
  }, [activeTab]);
  var loadFinanceData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var offeringTypesResponse, offeringTypesData, categoriesResponse, categoriesData, fundsResponse, fundsData, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return fetch('/api/offering-types');
          case 1:
            offeringTypesResponse = _context.v;
            _context.n = 2;
            return offeringTypesResponse.json();
          case 2:
            offeringTypesData = _context.v;
            if (offeringTypesData.success) {
              setOfferingTypes(offeringTypesData.data);
            }
            // Load expense categories
            _context.n = 3;
            return fetch('/api/expense-categories');
          case 3:
            categoriesResponse = _context.v;
            _context.n = 4;
            return categoriesResponse.json();
          case 4:
            categoriesData = _context.v;
            if (categoriesData.success) {
              setExpenseCategories(categoriesData.data);
            }
            // Load funds
            _context.n = 5;
            return fetch('/api/funds');
          case 5:
            fundsResponse = _context.v;
            _context.n = 6;
            return fundsResponse.json();
          case 6:
            fundsData = _context.v;
            if (fundsData.success) {
              setFunds(fundsData.data);
            }
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t = _context.v;
            console.error('Failed to load finance data:', _t);
            showToast('error', 'Failed to load finance data');
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function loadFinanceData() {
      return _ref.apply(this, arguments);
    };
  }();
  // Timezone options (common timezones)
  var timezoneOptions = [{
    value: 'Asia/Manila',
    label: 'Asia/Manila (PHT)'
  }, {
    value: 'UTC',
    label: 'UTC'
  }, {
    value: 'America/New_York',
    label: 'America/New York (EST)'
  }, {
    value: 'America/Chicago',
    label: 'America/Chicago (CST)'
  }, {
    value: 'America/Denver',
    label: 'America/Denver (MST)'
  }, {
    value: 'America/Los_Angeles',
    label: 'America/Los Angeles (PST)'
  }, {
    value: 'Europe/London',
    label: 'Europe/London (GMT)'
  }, {
    value: 'Europe/Paris',
    label: 'Europe/Paris (CET)'
  }, {
    value: 'Asia/Tokyo',
    label: 'Asia/Tokyo (JST)'
  }, {
    value: 'Asia/Shanghai',
    label: 'Asia/Shanghai (CST)'
  }, {
    value: 'Australia/Sydney',
    label: 'Australia/Sydney (AEDT)'
  }];
  var dateFormatOptions = [{
    value: 'MM/DD/YYYY',
    label: 'MM/DD/YYYY (12/31/2024)'
  }, {
    value: 'DD/MM/YYYY',
    label: 'DD/MM/YYYY (31/12/2024)'
  }, {
    value: 'YYYY-MM-DD',
    label: 'YYYY-MM-DD (2024-12-31)'
  }];
  var currencyOptions = [{
    value: 'PHP',
    label: 'PHP (₱) - Philippine Peso'
  }, {
    value: 'USD',
    label: 'USD ($) - US Dollar'
  }, {
    value: 'EUR',
    label: 'EUR (€) - Euro'
  }, {
    value: 'GBP',
    label: 'GBP (£) - British Pound'
  }, {
    value: 'JPY',
    label: 'JPY (¥) - Japanese Yen'
  }];
  var themeOptions = [{
    value: 'Light',
    label: 'Light'
  }, {
    value: 'Dark',
    label: 'Dark'
  }];
  var languageOptions = [{
    value: 'English',
    label: 'English'
  }, {
    value: 'Filipino',
    label: 'Filipino'
  }, {
    value: 'Spanish',
    label: 'Spanish'
  }];
  // Handle general settings save
  var handleSaveGeneralSettings = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            setIsSaving(true);
            _context2.p = 1;
            _context2.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });
          case 2:
            showToast('success', 'Settings saved successfully');
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            showToast('error', 'Failed to save settings. Please try again.');
          case 4:
            _context2.p = 4;
            setIsSaving(false);
            return _context2.f(4);
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3, 4, 5]]);
    }));
    return function handleSaveGeneralSettings() {
      return _ref2.apply(this, arguments);
    };
  }();
  // Handle church info save
  var handleSaveChurchInfo = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            setIsSaving(true);
            _context3.p = 1;
            _context3.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });
          case 2:
            showToast('success', 'Church information saved successfully');
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t3 = _context3.v;
            showToast('error', 'Failed to save church information. Please try again.');
          case 4:
            _context3.p = 4;
            setIsSaving(false);
            return _context3.f(4);
          case 5:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 3, 4, 5]]);
    }));
    return function handleSaveChurchInfo() {
      return _ref3.apply(this, arguments);
    };
  }();
  // Handle logo upload
  var handleLogoUpload = function handleLogoUpload(event) {
    var _event$target$files;
    var file = (_event$target$files = event.target.files) === null || _event$target$files === void 0 ? void 0 : _event$target$files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showToast('error', 'Please upload an image file');
        return;
      }
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', 'Image size must be less than 2MB');
        return;
      }
      // Create preview
      var reader = new FileReader();
      reader.onloadend = function () {
        setLogoPreview(reader.result);
        setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  // Handle logo removal
  var handleRemoveLogo = function handleRemoveLogo() {
    setLogoPreview(null);
    setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
      logo: null
    }));
  };
  // Finance Settings handlers
  var handleSaveFinanceSettings = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            setIsSaving(true);
            _context4.p = 1;
            _context4.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });
          case 2:
            showToast('success', 'Finance settings saved successfully');
            _context4.n = 4;
            break;
          case 3:
            _context4.p = 3;
            _t4 = _context4.v;
            showToast('error', 'Failed to save finance settings. Please try again.');
          case 4:
            _context4.p = 4;
            setIsSaving(false);
            return _context4.f(4);
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 3, 4, 5]]);
    }));
    return function handleSaveFinanceSettings() {
      return _ref4.apply(this, arguments);
    };
  }();
  // Offering Type handlers
  var handleAddOfferingType = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var response, data, _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (newOfferingType.name.trim()) {
              _context5.n = 1;
              break;
            }
            showToast('error', 'Please enter an offering type name');
            return _context5.a(2);
          case 1:
            _context5.p = 1;
            _context5.n = 2;
            return fetch('/api/offering-types', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: newOfferingType.name,
                description: newOfferingType.description,
                is_active: true
              })
            });
          case 2:
            response = _context5.v;
            _context5.n = 3;
            return response.json();
          case 3:
            data = _context5.v;
            if (data.success) {
              setOfferingTypes([].concat(_toConsumableArray(offeringTypes), [data.data]));
              setNewOfferingType({
                name: '',
                description: ''
              });
              setShowAddOfferingType(false);
              showToast('success', 'Offering type added successfully');
            } else {
              showToast('error', data.message || 'Failed to add offering type');
            }
            _context5.n = 5;
            break;
          case 4:
            _context5.p = 4;
            _t5 = _context5.v;
            showToast('error', 'Failed to add offering type');
          case 5:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 4]]);
    }));
    return function handleAddOfferingType() {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleUpdateOfferingType = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(id, updates) {
      var response, data, _t6;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            _context6.p = 0;
            _context6.n = 1;
            return fetch("/api/offering-types/".concat(id), {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updates)
            });
          case 1:
            response = _context6.v;
            _context6.n = 2;
            return response.json();
          case 2:
            data = _context6.v;
            if (data.success) {
              setOfferingTypes(offeringTypes.map(function (ot) {
                return ot.id === id ? data.data : ot;
              }));
              setEditingOfferingType(null);
              showToast('success', 'Offering type updated successfully');
            } else {
              showToast('error', data.message || 'Failed to update offering type');
            }
            _context6.n = 4;
            break;
          case 3:
            _context6.p = 3;
            _t6 = _context6.v;
            showToast('error', 'Failed to update offering type');
          case 4:
            return _context6.a(2);
        }
      }, _callee6, null, [[0, 3]]);
    }));
    return function handleUpdateOfferingType(_x, _x2) {
      return _ref6.apply(this, arguments);
    };
  }();
  var handleDeleteOfferingType = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id) {
      var response, data, _t7;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            if (confirm('Are you sure you want to delete this offering type?')) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2);
          case 1:
            _context7.p = 1;
            _context7.n = 2;
            return fetch("/api/offering-types/".concat(id), {
              method: 'DELETE'
            });
          case 2:
            response = _context7.v;
            _context7.n = 3;
            return response.json();
          case 3:
            data = _context7.v;
            if (data.success) {
              setOfferingTypes(offeringTypes.filter(function (ot) {
                return ot.id !== id;
              }));
              showToast('success', 'Offering type deleted successfully');
            } else {
              showToast('error', data.message || 'Failed to delete offering type');
            }
            _context7.n = 5;
            break;
          case 4:
            _context7.p = 4;
            _t7 = _context7.v;
            showToast('error', 'Failed to delete offering type');
          case 5:
            return _context7.a(2);
        }
      }, _callee7, null, [[1, 4]]);
    }));
    return function handleDeleteOfferingType(_x3) {
      return _ref7.apply(this, arguments);
    };
  }();
  // Expense Category handlers
  var handleAddExpenseCategory = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var response, data, _t8;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            if (newExpenseCategory.name.trim()) {
              _context8.n = 1;
              break;
            }
            showToast('error', 'Please enter a category name');
            return _context8.a(2);
          case 1:
            _context8.p = 1;
            _context8.n = 2;
            return fetch('/api/expense-categories', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: newExpenseCategory.name,
                description: newExpenseCategory.description,
                is_active: true
              })
            });
          case 2:
            response = _context8.v;
            _context8.n = 3;
            return response.json();
          case 3:
            data = _context8.v;
            if (data.success) {
              setExpenseCategories([].concat(_toConsumableArray(expenseCategories), [data.data]));
              setNewExpenseCategory({
                name: '',
                description: ''
              });
              setShowAddExpenseCategory(false);
              showToast('success', 'Expense category added successfully');
            } else {
              showToast('error', data.message || 'Failed to add expense category');
            }
            _context8.n = 5;
            break;
          case 4:
            _context8.p = 4;
            _t8 = _context8.v;
            showToast('error', 'Failed to add expense category');
          case 5:
            return _context8.a(2);
        }
      }, _callee8, null, [[1, 4]]);
    }));
    return function handleAddExpenseCategory() {
      return _ref8.apply(this, arguments);
    };
  }();
  var handleUpdateExpenseCategory = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(id, updates) {
      var response, data, _t9;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            _context9.p = 0;
            _context9.n = 1;
            return fetch("/api/expense-categories/".concat(id), {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updates)
            });
          case 1:
            response = _context9.v;
            _context9.n = 2;
            return response.json();
          case 2:
            data = _context9.v;
            if (data.success) {
              setExpenseCategories(expenseCategories.map(function (ec) {
                return ec.id === id ? data.data : ec;
              }));
              setEditingExpenseCategory(null);
              showToast('success', 'Expense category updated successfully');
            } else {
              showToast('error', data.message || 'Failed to update expense category');
            }
            _context9.n = 4;
            break;
          case 3:
            _context9.p = 3;
            _t9 = _context9.v;
            showToast('error', 'Failed to update expense category');
          case 4:
            return _context9.a(2);
        }
      }, _callee9, null, [[0, 3]]);
    }));
    return function handleUpdateExpenseCategory(_x4, _x5) {
      return _ref9.apply(this, arguments);
    };
  }();
  var handleDeleteExpenseCategory = /*#__PURE__*/function () {
    var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(id) {
      var response, data, _t0;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.p = _context0.n) {
          case 0:
            if (confirm('Are you sure you want to delete this expense category?')) {
              _context0.n = 1;
              break;
            }
            return _context0.a(2);
          case 1:
            _context0.p = 1;
            _context0.n = 2;
            return fetch("/api/expense-categories/".concat(id), {
              method: 'DELETE'
            });
          case 2:
            response = _context0.v;
            _context0.n = 3;
            return response.json();
          case 3:
            data = _context0.v;
            if (data.success) {
              setExpenseCategories(expenseCategories.filter(function (ec) {
                return ec.id !== id;
              }));
              showToast('success', 'Expense category deleted successfully');
            } else {
              showToast('error', data.message || 'Failed to delete expense category');
            }
            _context0.n = 5;
            break;
          case 4:
            _context0.p = 4;
            _t0 = _context0.v;
            showToast('error', 'Failed to delete expense category');
          case 5:
            return _context0.a(2);
        }
      }, _callee0, null, [[1, 4]]);
    }));
    return function handleDeleteExpenseCategory(_x6) {
      return _ref0.apply(this, arguments);
    };
  }();
  // Fund handlers
  var handleAddFund = /*#__PURE__*/function () {
    var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var response, data, _t1;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.p = _context1.n) {
          case 0:
            if (newFund.name.trim()) {
              _context1.n = 1;
              break;
            }
            showToast('error', 'Please enter a fund name');
            return _context1.a(2);
          case 1:
            _context1.p = 1;
            _context1.n = 2;
            return fetch('/api/funds', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: newFund.name,
                type: newFund.type,
                description: newFund.description,
                is_active: true
              })
            });
          case 2:
            response = _context1.v;
            _context1.n = 3;
            return response.json();
          case 3:
            data = _context1.v;
            if (data.success) {
              setFunds([].concat(_toConsumableArray(funds), [data.data]));
              setNewFund({
                name: '',
                type: 'unrestricted',
                description: ''
              });
              setShowAddFund(false);
              showToast('success', 'Fund added successfully');
            } else {
              showToast('error', data.message || 'Failed to add fund');
            }
            _context1.n = 5;
            break;
          case 4:
            _context1.p = 4;
            _t1 = _context1.v;
            showToast('error', 'Failed to add fund');
          case 5:
            return _context1.a(2);
        }
      }, _callee1, null, [[1, 4]]);
    }));
    return function handleAddFund() {
      return _ref1.apply(this, arguments);
    };
  }();
  var handleUpdateFund = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(id, updates) {
      var response, data, _t10;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.p = _context10.n) {
          case 0:
            _context10.p = 0;
            _context10.n = 1;
            return fetch("/api/funds/".concat(id), {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updates)
            });
          case 1:
            response = _context10.v;
            _context10.n = 2;
            return response.json();
          case 2:
            data = _context10.v;
            if (data.success) {
              setFunds(funds.map(function (f) {
                return f.id === id ? data.data : f;
              }));
              setEditingFund(null);
              showToast('success', 'Fund updated successfully');
            } else {
              showToast('error', data.message || 'Failed to update fund');
            }
            _context10.n = 4;
            break;
          case 3:
            _context10.p = 3;
            _t10 = _context10.v;
            showToast('error', 'Failed to update fund');
          case 4:
            return _context10.a(2);
        }
      }, _callee10, null, [[0, 3]]);
    }));
    return function handleUpdateFund(_x7, _x8) {
      return _ref10.apply(this, arguments);
    };
  }();
  var handleDeleteFund = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(id) {
      var response, data, _t11;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            if (confirm('Are you sure you want to delete this fund?')) {
              _context11.n = 1;
              break;
            }
            return _context11.a(2);
          case 1:
            _context11.p = 1;
            _context11.n = 2;
            return fetch("/api/funds/".concat(id), {
              method: 'DELETE'
            });
          case 2:
            response = _context11.v;
            _context11.n = 3;
            return response.json();
          case 3:
            data = _context11.v;
            if (data.success) {
              setFunds(funds.filter(function (f) {
                return f.id !== id;
              }));
              showToast('success', 'Fund deleted successfully');
            } else {
              showToast('error', data.message || 'Failed to delete fund');
            }
            _context11.n = 5;
            break;
          case 4:
            _context11.p = 4;
            _t11 = _context11.v;
            showToast('error', 'Failed to delete fund');
          case 5:
            return _context11.a(2);
        }
      }, _callee11, null, [[1, 4]]);
    }));
    return function handleDeleteFund(_x9) {
      return _ref11.apply(this, arguments);
    };
  }();
  // Email & Notifications handlers
  var handleSaveEmailNotificationSettings = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
      var _t12;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.p = _context12.n) {
          case 0:
            setIsSaving(true);
            _context12.p = 1;
            _context12.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });
          case 2:
            showToast('success', 'Email and notification settings saved successfully');
            _context12.n = 4;
            break;
          case 3:
            _context12.p = 3;
            _t12 = _context12.v;
            showToast('error', 'Failed to save email and notification settings. Please try again.');
          case 4:
            _context12.p = 4;
            setIsSaving(false);
            return _context12.f(4);
          case 5:
            return _context12.a(2);
        }
      }, _callee12, null, [[1, 3, 4, 5]]);
    }));
    return function handleSaveEmailNotificationSettings() {
      return _ref12.apply(this, arguments);
    };
  }();
  var handleSendTestEmail = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      var _t13;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.p = _context13.n) {
          case 0:
            if (!(!emailNotificationSettings.smtpHost || !emailNotificationSettings.smtpFromEmail)) {
              _context13.n = 1;
              break;
            }
            showToast('error', 'Please configure SMTP settings before sending a test email');
            return _context13.a(2);
          case 1:
            setIsSendingTestEmail(true);
            _context13.p = 2;
            _context13.n = 3;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 2000);
            });
          case 3:
            showToast('success', 'Test email sent successfully! Please check your inbox.');
            _context13.n = 5;
            break;
          case 4:
            _context13.p = 4;
            _t13 = _context13.v;
            showToast('error', 'Failed to send test email. Please check your SMTP configuration.');
          case 5:
            _context13.p = 5;
            setIsSendingTestEmail(false);
            return _context13.f(5);
          case 6:
            return _context13.a(2);
        }
      }, _callee13, null, [[2, 4, 5, 6]]);
    }));
    return function handleSendTestEmail() {
      return _ref13.apply(this, arguments);
    };
  }();
  // Security Settings handlers
  var handleSaveSecuritySettings = /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
      var _t14;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.p = _context14.n) {
          case 0:
            setIsSaving(true);
            _context14.p = 1;
            _context14.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });
          case 2:
            showToast('success', 'Security settings saved successfully');
            _context14.n = 4;
            break;
          case 3:
            _context14.p = 3;
            _t14 = _context14.v;
            showToast('error', 'Failed to save security settings. Please try again.');
          case 4:
            _context14.p = 4;
            setIsSaving(false);
            return _context14.f(4);
          case 5:
            return _context14.a(2);
        }
      }, _callee14, null, [[1, 3, 4, 5]]);
    }));
    return function handleSaveSecuritySettings() {
      return _ref14.apply(this, arguments);
    };
  }();
  var loadAuditLogs = /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
      var mockLogs, _t15;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.p = _context15.n) {
          case 0:
            setIsLoadingAuditLogs(true);
            _context15.p = 1;
            _context15.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 500);
            });
          case 2:
            mockLogs = [{
              id: 1,
              user: 'Admin User',
              action: 'Login',
              timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
              ipAddress: '192.168.1.100',
              details: 'Successful login'
            }, {
              id: 2,
              user: 'John Doe',
              action: 'Password Changed',
              timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
              ipAddress: '192.168.1.101',
              details: 'User changed their password'
            }, {
              id: 3,
              user: 'Jane Smith',
              action: 'Failed Login',
              timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
              ipAddress: '192.168.1.102',
              details: 'Invalid password attempt'
            }, {
              id: 4,
              user: 'Admin User',
              action: 'Settings Changed',
              timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
              ipAddress: '192.168.1.100',
              details: 'Updated security settings'
            }, {
              id: 5,
              user: 'System',
              action: 'Account Locked',
              timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
              ipAddress: '192.168.1.103',
              details: 'Account locked due to multiple failed login attempts'
            }];
            setAuditLogs(mockLogs);
            _context15.n = 4;
            break;
          case 3:
            _context15.p = 3;
            _t15 = _context15.v;
            console.error('Failed to load audit logs:', _t15);
            showToast('error', 'Failed to load audit logs');
          case 4:
            _context15.p = 4;
            setIsLoadingAuditLogs(false);
            return _context15.f(4);
          case 5:
            return _context15.a(2);
        }
      }, _callee15, null, [[1, 3, 4, 5]]);
    }));
    return function loadAuditLogs() {
      return _ref15.apply(this, arguments);
    };
  }();
  var formatRelativeTime = function formatRelativeTime(timestamp) {
    var now = new Date();
    var then = new Date(timestamp);
    var diffMs = now.getTime() - then.getTime();
    var diffMins = Math.floor(diffMs / 60000);
    var diffHours = Math.floor(diffMins / 60);
    var diffDays = Math.floor(diffHours / 24);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return "".concat(diffMins, " minute").concat(diffMins > 1 ? 's' : '', " ago");
    if (diffHours < 24) return "".concat(diffHours, " hour").concat(diffHours > 1 ? 's' : '', " ago");
    if (diffDays < 7) return "".concat(diffDays, " day").concat(diffDays > 1 ? 's' : '', " ago");
    return then.toLocaleDateString();
  };
  // Backup & Restore handlers
  var loadBackups = /*#__PURE__*/function () {
    var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
      var mockBackups, _t16;
      return _regenerator().w(function (_context16) {
        while (1) switch (_context16.p = _context16.n) {
          case 0:
            setIsLoadingBackups(true);
            _context16.p = 1;
            _context16.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 500);
            });
          case 2:
            mockBackups = [{
              id: 1,
              filename: 'backup_2024_01_15_020000.sql',
              size: '45.2 MB',
              created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
              created_by: 'System (Automatic)',
              status: 'completed',
              type: 'automatic'
            }, {
              id: 2,
              filename: 'backup_2024_01_14_020000.sql',
              size: '44.8 MB',
              created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
              created_by: 'System (Automatic)',
              status: 'completed',
              type: 'automatic'
            }, {
              id: 3,
              filename: 'backup_2024_01_13_153000.sql',
              size: '44.5 MB',
              created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
              created_by: 'Admin User',
              status: 'completed',
              type: 'manual'
            }, {
              id: 4,
              filename: 'backup_2024_01_13_020000.sql',
              size: '44.3 MB',
              created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
              created_by: 'System (Automatic)',
              status: 'completed',
              type: 'automatic'
            }, {
              id: 5,
              filename: 'backup_2024_01_12_020000.sql',
              size: '43.9 MB',
              created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
              created_by: 'System (Automatic)',
              status: 'completed',
              type: 'automatic'
            }];
            setBackups(mockBackups);
            setLastBackup(mockBackups[0]);
            _context16.n = 4;
            break;
          case 3:
            _context16.p = 3;
            _t16 = _context16.v;
            console.error('Failed to load backups:', _t16);
            showToast('error', 'Failed to load backups');
          case 4:
            _context16.p = 4;
            setIsLoadingBackups(false);
            return _context16.f(4);
          case 5:
            return _context16.a(2);
        }
      }, _callee16, null, [[1, 3, 4, 5]]);
    }));
    return function loadBackups() {
      return _ref16.apply(this, arguments);
    };
  }();
  var handleCreateBackup = /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
      var _t17;
      return _regenerator().w(function (_context17) {
        while (1) switch (_context17.p = _context17.n) {
          case 0:
            setIsCreatingBackup(true);
            _context17.p = 1;
            _context17.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 3000);
            });
          case 2:
            showToast('success', 'Backup created successfully');
            loadBackups(); // Reload backup list
            _context17.n = 4;
            break;
          case 3:
            _context17.p = 3;
            _t17 = _context17.v;
            showToast('error', 'Failed to create backup. Please try again.');
          case 4:
            _context17.p = 4;
            setIsCreatingBackup(false);
            return _context17.f(4);
          case 5:
            return _context17.a(2);
        }
      }, _callee17, null, [[1, 3, 4, 5]]);
    }));
    return function handleCreateBackup() {
      return _ref17.apply(this, arguments);
    };
  }();
  var handleDownloadBackup = /*#__PURE__*/function () {
    var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(backup) {
      return _regenerator().w(function (_context18) {
        while (1) switch (_context18.n) {
          case 0:
            try {
              // TODO: Replace with actual API call
              // window.location.href = `/api/settings/backups/${backup.id}/download`;
              showToast('success', "Downloading ".concat(backup.filename, "..."));
            } catch (error) {
              showToast('error', 'Failed to download backup');
            }
          case 1:
            return _context18.a(2);
        }
      }, _callee18);
    }));
    return function handleDownloadBackup(_x0) {
      return _ref18.apply(this, arguments);
    };
  }();
  var handleRestoreBackup = /*#__PURE__*/function () {
    var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(backup) {
      return _regenerator().w(function (_context19) {
        while (1) switch (_context19.n) {
          case 0:
            setRestoreConfirmation(backup);
          case 1:
            return _context19.a(2);
        }
      }, _callee19);
    }));
    return function handleRestoreBackup(_x1) {
      return _ref19.apply(this, arguments);
    };
  }();
  var confirmRestore = /*#__PURE__*/function () {
    var _ref20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
      var _t18;
      return _regenerator().w(function (_context20) {
        while (1) switch (_context20.p = _context20.n) {
          case 0:
            if (restoreConfirmation) {
              _context20.n = 1;
              break;
            }
            return _context20.a(2);
          case 1:
            _context20.p = 1;
            _context20.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 2000);
            });
          case 2:
            showToast('success', 'Database restored successfully. Please refresh the page.');
            setRestoreConfirmation(null);
            _context20.n = 4;
            break;
          case 3:
            _context20.p = 3;
            _t18 = _context20.v;
            showToast('error', 'Failed to restore backup. Please try again.');
          case 4:
            return _context20.a(2);
        }
      }, _callee20, null, [[1, 3]]);
    }));
    return function confirmRestore() {
      return _ref20.apply(this, arguments);
    };
  }();
  var handleDeleteBackup = /*#__PURE__*/function () {
    var _ref21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(backup) {
      return _regenerator().w(function (_context21) {
        while (1) switch (_context21.n) {
          case 0:
            if (confirm("Are you sure you want to delete backup \"".concat(backup.filename, "\"?"))) {
              _context21.n = 1;
              break;
            }
            return _context21.a(2);
          case 1:
            try {
              // TODO: Replace with actual API call
              // await api.delete(`/settings/backups/${backup.id}`);
              setBackups(backups.filter(function (b) {
                return b.id !== backup.id;
              }));
              showToast('success', 'Backup deleted successfully');
            } catch (error) {
              showToast('error', 'Failed to delete backup');
            }
          case 2:
            return _context21.a(2);
        }
      }, _callee21);
    }));
    return function handleDeleteBackup(_x10) {
      return _ref21.apply(this, arguments);
    };
  }();
  var handleSaveBackupSettings = /*#__PURE__*/function () {
    var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
      var _t19;
      return _regenerator().w(function (_context22) {
        while (1) switch (_context22.p = _context22.n) {
          case 0:
            setIsSaving(true);
            _context22.p = 1;
            _context22.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });
          case 2:
            showToast('success', 'Backup settings saved successfully');
            _context22.n = 4;
            break;
          case 3:
            _context22.p = 3;
            _t19 = _context22.v;
            showToast('error', 'Failed to save backup settings. Please try again.');
          case 4:
            _context22.p = 4;
            setIsSaving(false);
            return _context22.f(4);
          case 5:
            return _context22.a(2);
        }
      }, _callee22, null, [[1, 3, 4, 5]]);
    }));
    return function handleSaveBackupSettings() {
      return _ref22.apply(this, arguments);
    };
  }();
  // Integrations handlers
  var loadIntegrations = /*#__PURE__*/function () {
    var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
      var mockIntegrations, _t20;
      return _regenerator().w(function (_context23) {
        while (1) switch (_context23.p = _context23.n) {
          case 0:
            _context23.p = 0;
            _context23.n = 1;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 500);
            });
          case 1:
            mockIntegrations = [{
              id: 'stripe',
              name: 'Stripe',
              description: 'Accept online payments and donations',
              category: 'payment',
              icon: lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"],
              status: 'disconnected',
              isConfigured: false
            }, {
              id: 'paypal',
              name: 'PayPal',
              description: 'Process payments through PayPal',
              category: 'payment',
              icon: lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"],
              status: 'disconnected',
              isConfigured: false
            }, {
              id: 'mailchimp',
              name: 'Mailchimp',
              description: 'Email marketing and newsletters',
              category: 'email',
              icon: lucide_react__WEBPACK_IMPORTED_MODULE_19__["default"],
              status: 'connected',
              isConfigured: true,
              apiKey: '••••••••••••••••••••1234',
              lastSync: new Date(Date.now() - 1000 * 60 * 30).toISOString()
            }, {
              id: 'sendgrid',
              name: 'SendGrid',
              description: 'Transactional email service',
              category: 'email',
              icon: lucide_react__WEBPACK_IMPORTED_MODULE_24__["default"],
              status: 'disconnected',
              isConfigured: false
            }, {
              id: 'google-calendar',
              name: 'Google Calendar',
              description: 'Sync events with Google Calendar',
              category: 'calendar',
              icon: lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"],
              status: 'connected',
              isConfigured: true,
              lastSync: new Date(Date.now() - 1000 * 60 * 15).toISOString()
            }, {
              id: 'zoom',
              name: 'Zoom',
              description: 'Video conferencing for online services',
              category: 'communication',
              icon: lucide_react__WEBPACK_IMPORTED_MODULE_29__["default"],
              status: 'disconnected',
              isConfigured: false
            }, {
              id: 'slack',
              name: 'Slack',
              description: 'Team communication and notifications',
              category: 'communication',
              icon: lucide_react__WEBPACK_IMPORTED_MODULE_20__["default"],
              status: 'error',
              isConfigured: true,
              apiKey: '••••••••••••••••••••5678'
            }, {
              id: 'twilio',
              name: 'Twilio',
              description: 'SMS notifications and reminders',
              category: 'communication',
              icon: lucide_react__WEBPACK_IMPORTED_MODULE_20__["default"],
              status: 'disconnected',
              isConfigured: false
            }];
            setIntegrations(mockIntegrations);
            _context23.n = 3;
            break;
          case 2:
            _context23.p = 2;
            _t20 = _context23.v;
            console.error('Failed to load integrations:', _t20);
            showToast('error', 'Failed to load integrations');
          case 3:
            return _context23.a(2);
        }
      }, _callee23, null, [[0, 2]]);
    }));
    return function loadIntegrations() {
      return _ref23.apply(this, arguments);
    };
  }();
  var handleConfigureIntegration = function handleConfigureIntegration(integration) {
    var _integration$apiKey;
    setConfiguringIntegration(integration);
    setIntegrationConfig({
      apiKey: ((_integration$apiKey = integration.apiKey) === null || _integration$apiKey === void 0 ? void 0 : _integration$apiKey.replace(/•/g, '')) || '',
      apiSecret: '',
      webhookUrl: '',
      additionalSettings: integration.config || {}
    });
    setShowApiKey(false);
  };
  var handleSaveIntegrationConfig = /*#__PURE__*/function () {
    var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24() {
      var _t21;
      return _regenerator().w(function (_context24) {
        while (1) switch (_context24.p = _context24.n) {
          case 0:
            if (configuringIntegration) {
              _context24.n = 1;
              break;
            }
            return _context24.a(2);
          case 1:
            if (integrationConfig.apiKey.trim()) {
              _context24.n = 2;
              break;
            }
            showToast('error', 'Please enter an API key');
            return _context24.a(2);
          case 2:
            setIsSavingIntegration(true);
            _context24.p = 3;
            _context24.n = 4;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });
          case 4:
            // Update integration status
            setIntegrations(integrations.map(function (_int) {
              return _int.id === configuringIntegration.id ? _objectSpread(_objectSpread({}, _int), {}, {
                status: 'connected',
                isConfigured: true,
                apiKey: '••••••••••••••••••••' + integrationConfig.apiKey.slice(-4),
                lastSync: new Date().toISOString()
              }) : _int;
            }));
            setConfiguringIntegration(null);
            showToast('success', "".concat(configuringIntegration.name, " configured successfully"));
            _context24.n = 6;
            break;
          case 5:
            _context24.p = 5;
            _t21 = _context24.v;
            showToast('error', 'Failed to save integration configuration');
          case 6:
            _context24.p = 6;
            setIsSavingIntegration(false);
            return _context24.f(6);
          case 7:
            return _context24.a(2);
        }
      }, _callee24, null, [[3, 5, 6, 7]]);
    }));
    return function handleSaveIntegrationConfig() {
      return _ref24.apply(this, arguments);
    };
  }();
  var handleDisconnectIntegration = /*#__PURE__*/function () {
    var _ref25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(integration) {
      var _t22;
      return _regenerator().w(function (_context25) {
        while (1) switch (_context25.p = _context25.n) {
          case 0:
            if (confirm("Are you sure you want to disconnect ".concat(integration.name, "?"))) {
              _context25.n = 1;
              break;
            }
            return _context25.a(2);
          case 1:
            _context25.p = 1;
            _context25.n = 2;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 500);
            });
          case 2:
            setIntegrations(integrations.map(function (_int2) {
              return _int2.id === integration.id ? _objectSpread(_objectSpread({}, _int2), {}, {
                status: 'disconnected',
                isConfigured: false,
                apiKey: undefined,
                lastSync: undefined
              }) : _int2;
            }));
            showToast('success', "".concat(integration.name, " disconnected successfully"));
            _context25.n = 4;
            break;
          case 3:
            _context25.p = 3;
            _t22 = _context25.v;
            showToast('error', 'Failed to disconnect integration');
          case 4:
            return _context25.a(2);
        }
      }, _callee25, null, [[1, 3]]);
    }));
    return function handleDisconnectIntegration(_x11) {
      return _ref25.apply(this, arguments);
    };
  }();
  var handleTestIntegration = /*#__PURE__*/function () {
    var _ref26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(integration) {
      var _t23;
      return _regenerator().w(function (_context26) {
        while (1) switch (_context26.p = _context26.n) {
          case 0:
            _context26.p = 0;
            _context26.n = 1;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1500);
            });
          case 1:
            showToast('success', "".concat(integration.name, " connection test successful"));
            _context26.n = 3;
            break;
          case 2:
            _context26.p = 2;
            _t23 = _context26.v;
            showToast('error', 'Connection test failed. Please check your configuration.');
          case 3:
            return _context26.a(2);
        }
      }, _callee26, null, [[0, 2]]);
    }));
    return function handleTestIntegration(_x12) {
      return _ref26.apply(this, arguments);
    };
  }();
  var getStatusIcon = function getStatusIcon(status) {
    switch (status) {
      case 'connected':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: "h-5 w-5 text-success-600"
        });
      case 'error':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: "h-5 w-5 text-error-600"
        });
      case 'disconnected':
      default:
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "h-5 w-5 text-neutral-400"
        });
    }
  };
  var getStatusBadge = function getStatusBadge(status) {
    switch (status) {
      case 'connected':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
          variant: "success",
          children: "Connected"
        });
      case 'error':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
          variant: "error",
          children: "Error"
        });
      case 'disconnected':
      default:
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
          variant: "neutral",
          children: "Disconnected"
        });
    }
  };
  var getCategoryLabel = function getCategoryLabel(category) {
    switch (category) {
      case 'payment':
        return 'Payment Gateways';
      case 'email':
        return 'Email Services';
      case 'calendar':
        return 'Calendar Sync';
      case 'communication':
        return 'Communication';
      case 'storage':
        return 'Storage';
      default:
        return 'Other';
    }
  };
  var tabs = [{
    id: 'general',
    label: 'General',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_25__["default"]
  }, {
    id: 'church-info',
    label: 'Church Information',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"]
  }, {
    id: 'finance',
    label: 'Finance Settings',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"]
  }, {
    id: 'email-notifications',
    label: 'Email & Notifications',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_19__["default"]
  }, {
    id: 'security',
    label: 'Security',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_26__["default"]
  }, {
    id: 'backup',
    label: 'Backup & Restore',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"]
  }, {
    id: 'integrations',
    label: 'Integrations',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_21__["default"]
  }, {
    id: 'archive',
    label: 'Archive Settings',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"]
  }];
  var renderTabContent = function renderTabContent() {
    switch (activeTab) {
      case 'general':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
              className: "text-xl font-semibold text-neutral-900",
              children: "General Settings"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-neutral-600",
              children: "Configure application preferences and display settings."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Application Settings"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "Application Name",
                placeholder: "MFMC System",
                value: generalSettings.appName,
                onChange: function onChange(e) {
                  return setGeneralSettings(_objectSpread(_objectSpread({}, generalSettings), {}, {
                    appName: e.target.value
                  }));
                },
                helperText: "The name displayed in the application header"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Timezone",
                options: timezoneOptions,
                value: generalSettings.timezone,
                onChange: function onChange(value) {
                  return setGeneralSettings(_objectSpread(_objectSpread({}, generalSettings), {}, {
                    timezone: value
                  }));
                },
                searchable: true,
                helperText: "Select your local timezone"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Date Format",
                options: dateFormatOptions,
                value: generalSettings.dateFormat,
                onChange: function onChange(value) {
                  return setGeneralSettings(_objectSpread(_objectSpread({}, generalSettings), {}, {
                    dateFormat: value
                  }));
                },
                helperText: "How dates are displayed throughout the system"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Currency",
                options: currencyOptions,
                value: generalSettings.currency,
                onChange: function onChange(value) {
                  return setGeneralSettings(_objectSpread(_objectSpread({}, generalSettings), {}, {
                    currency: value
                  }));
                },
                searchable: true,
                helperText: "Default currency for financial transactions"
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Display Settings"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Theme",
                options: themeOptions,
                value: generalSettings.theme,
                onChange: function onChange(value) {
                  return setGeneralSettings(_objectSpread(_objectSpread({}, generalSettings), {}, {
                    theme: value
                  }));
                },
                helperText: "Choose your preferred color theme"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Language",
                options: languageOptions,
                value: generalSettings.language,
                onChange: function onChange(value) {
                  return setGeneralSettings(_objectSpread(_objectSpread({}, generalSettings), {}, {
                    language: value
                  }));
                },
                helperText: "Select your preferred language"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "number",
                label: "Items Per Page",
                value: generalSettings.itemsPerPage.toString(),
                onChange: function onChange(e) {
                  return setGeneralSettings(_objectSpread(_objectSpread({}, generalSettings), {}, {
                    itemsPerPage: parseInt(e.target.value) || 25
                  }));
                },
                helperText: "Number of items to display in tables (10-100)",
                min: 10,
                max: 100
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "space-y-4",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_admin_FeatureFlagAdminPanel__WEBPACK_IMPORTED_MODULE_38__.FeatureFlagAdminPanel, {})
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex justify-end pt-4 border-t border-neutral-200",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
              onClick: handleSaveGeneralSettings,
              loading: isSaving,
              disabled: isSaving,
              children: "Save Changes"
            })
          })]
        });
      case 'church-info':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
              className: "text-xl font-semibold text-neutral-900",
              children: "Church Information"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-neutral-600",
              children: "Manage your church's basic information and contact details."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Basic Information"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "Church Name",
                placeholder: "My First Miracle Church",
                value: churchInfo.churchName,
                onChange: function onChange(e) {
                  return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                    churchName: e.target.value
                  }));
                },
                required: true,
                helperText: "Official name of your church"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "Denomination",
                placeholder: "Non-denominational",
                value: churchInfo.denomination,
                onChange: function onChange(e) {
                  return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                    denomination: e.target.value
                  }));
                },
                helperText: "Church denomination or affiliation"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "number",
                label: "Founded Year",
                placeholder: "2010",
                value: churchInfo.foundedYear,
                onChange: function onChange(e) {
                  return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                    foundedYear: e.target.value
                  }));
                },
                min: 1900,
                max: new Date().getFullYear(),
                helperText: "Year the church was established"
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Contact Information"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "md:col-span-2",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                  label: "Address",
                  placeholder: "123 Church Street, Manila, Philippines",
                  value: churchInfo.address,
                  onChange: function onChange(e) {
                    return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                      address: e.target.value
                    }));
                  },
                  helperText: "Physical address of the church"
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "tel",
                label: "Phone",
                placeholder: "+63 912 345 6789",
                value: churchInfo.phone,
                onChange: function onChange(e) {
                  return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                    phone: e.target.value
                  }));
                },
                helperText: "Primary contact phone number"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "email",
                label: "Email",
                placeholder: "info@mfmc.church",
                value: churchInfo.email,
                onChange: function onChange(e) {
                  return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                    email: e.target.value
                  }));
                },
                helperText: "Primary contact email address"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "md:col-span-2",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                  type: "url",
                  label: "Website",
                  placeholder: "https://www.mfmc.church",
                  value: churchInfo.website,
                  onChange: function onChange(e) {
                    return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                      website: e.target.value
                    }));
                  },
                  helperText: "Church website URL"
                })
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Social Media"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "url",
                label: "Facebook",
                placeholder: "https://facebook.com/mfmc",
                value: churchInfo.facebook,
                onChange: function onChange(e) {
                  return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                    facebook: e.target.value
                  }));
                },
                helperText: "Facebook page URL"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "url",
                label: "Twitter",
                placeholder: "https://twitter.com/mfmc",
                value: churchInfo.twitter,
                onChange: function onChange(e) {
                  return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                    twitter: e.target.value
                  }));
                },
                helperText: "Twitter profile URL"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "url",
                label: "Instagram",
                placeholder: "https://instagram.com/mfmc",
                value: churchInfo.instagram,
                onChange: function onChange(e) {
                  return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                    instagram: e.target.value
                  }));
                },
                helperText: "Instagram profile URL"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "url",
                label: "YouTube",
                placeholder: "https://youtube.com/@mfmc",
                value: churchInfo.youtube,
                onChange: function onChange(e) {
                  return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                    youtube: e.target.value
                  }));
                },
                helperText: "YouTube channel URL"
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Branding"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  className: "block text-sm font-medium text-neutral-700",
                  children: "Church Logo"
                }), logoPreview || churchInfo.logo ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "relative inline-block",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                    src: logoPreview || churchInfo.logo || '',
                    alt: "Church logo preview",
                    className: "w-32 h-32 object-contain border-2 border-neutral-200 rounded-lg bg-neutral-50"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                    type: "button",
                    onClick: handleRemoveLogo,
                    className: "absolute -top-2 -right-2 bg-error-600 text-white rounded-full p-1 hover:bg-error-700 transition-colors",
                    "aria-label": "Remove logo",
                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_30__["default"], {
                      className: "h-4 w-4"
                    })
                  })]
                }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "flex items-center justify-center w-32 h-32 border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "text-center",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_28__["default"], {
                      className: "mx-auto h-8 w-8 text-neutral-400"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                      className: "mt-1 text-xs text-neutral-500",
                      children: "No logo"
                    })]
                  })
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "flex items-center gap-2",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                    className: "cursor-pointer",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      type: "file",
                      accept: "image/*",
                      onChange: handleLogoUpload,
                      className: "hidden"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                      className: "inline-flex items-center px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_28__["default"], {
                        className: "mr-2 h-4 w-4"
                      }), "Upload Logo"]
                    })]
                  })
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                  className: "text-xs text-neutral-500",
                  children: "Recommended: Square image, max 2MB"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  htmlFor: "primaryColor",
                  className: "block text-sm font-medium text-neutral-700",
                  children: "Primary Color"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center gap-4",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "color",
                    id: "primaryColor",
                    value: churchInfo.primaryColor,
                    onChange: function onChange(e) {
                      return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                        primaryColor: e.target.value
                      }));
                    },
                    className: "h-12 w-20 rounded-lg border-2 border-neutral-300 cursor-pointer"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "flex-1",
                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                      type: "text",
                      value: churchInfo.primaryColor,
                      onChange: function onChange(e) {
                        return setChurchInfo(_objectSpread(_objectSpread({}, churchInfo), {}, {
                          primaryColor: e.target.value
                        }));
                      },
                      placeholder: "#0ea5e9",
                      pattern: "^#[0-9A-Fa-f]{6}$"
                    })
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                  className: "text-xs text-neutral-500",
                  children: "Primary brand color used throughout the system"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "mt-4 p-4 rounded-lg border border-neutral-200 bg-neutral-50",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs font-medium text-neutral-700 mb-2",
                    children: "Preview:"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex gap-2",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      className: "w-12 h-12 rounded-lg shadow-sm",
                      style: {
                        backgroundColor: churchInfo.primaryColor
                      }
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      className: "w-12 h-12 rounded-lg shadow-sm opacity-75",
                      style: {
                        backgroundColor: churchInfo.primaryColor
                      }
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      className: "w-12 h-12 rounded-lg shadow-sm opacity-50",
                      style: {
                        backgroundColor: churchInfo.primaryColor
                      }
                    })]
                  })]
                })]
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex justify-end pt-4 border-t border-neutral-200",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
              onClick: handleSaveChurchInfo,
              loading: isSaving,
              disabled: isSaving,
              children: "Save Changes"
            })
          })]
        });
      case 'finance':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
              className: "text-xl font-semibold text-neutral-900",
              children: "Finance Settings"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-neutral-600",
              children: "Configure finance-related settings, categories, and approval workflows."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Default Settings"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Default Offering Type",
                options: offeringTypes.filter(function (ot) {
                  return ot.is_active;
                }).map(function (ot) {
                  return {
                    value: ot.id.toString(),
                    label: ot.name
                  };
                }),
                value: financeSettings.defaultOfferingType,
                onChange: function onChange(value) {
                  return setFinanceSettings(_objectSpread(_objectSpread({}, financeSettings), {}, {
                    defaultOfferingType: value
                  }));
                },
                helperText: "Default offering type for new offerings"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Default Expense Category",
                options: expenseCategories.filter(function (ec) {
                  return ec.is_active;
                }).map(function (ec) {
                  return {
                    value: ec.id.toString(),
                    label: ec.name
                  };
                }),
                value: financeSettings.defaultExpenseCategory,
                onChange: function onChange(value) {
                  return setFinanceSettings(_objectSpread(_objectSpread({}, financeSettings), {}, {
                    defaultExpenseCategory: value
                  }));
                },
                helperText: "Default category for new expenses"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Default Fund",
                options: funds.filter(function (f) {
                  return f.is_active;
                }).map(function (f) {
                  return {
                    value: f.id.toString(),
                    label: f.name
                  };
                }),
                value: financeSettings.defaultFund,
                onChange: function onChange(value) {
                  return setFinanceSettings(_objectSpread(_objectSpread({}, financeSettings), {}, {
                    defaultFund: value
                  }));
                },
                helperText: "Default fund for transactions"
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Budget Period Settings"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Fiscal Year Start Month",
                options: [{
                  value: '1',
                  label: 'January'
                }, {
                  value: '2',
                  label: 'February'
                }, {
                  value: '3',
                  label: 'March'
                }, {
                  value: '4',
                  label: 'April'
                }, {
                  value: '5',
                  label: 'May'
                }, {
                  value: '6',
                  label: 'June'
                }, {
                  value: '7',
                  label: 'July'
                }, {
                  value: '8',
                  label: 'August'
                }, {
                  value: '9',
                  label: 'September'
                }, {
                  value: '10',
                  label: 'October'
                }, {
                  value: '11',
                  label: 'November'
                }, {
                  value: '12',
                  label: 'December'
                }],
                value: financeSettings.fiscalYearStart,
                onChange: function onChange(value) {
                  return setFinanceSettings(_objectSpread(_objectSpread({}, financeSettings), {}, {
                    fiscalYearStart: value
                  }));
                },
                helperText: "Month when your fiscal year begins"
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Approval Workflow Settings"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "requireApproval",
                  checked: financeSettings.requireApproval,
                  onChange: function onChange(e) {
                    return setFinanceSettings(_objectSpread(_objectSpread({}, financeSettings), {}, {
                      requireApproval: e.target.checked
                    }));
                  },
                  className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  htmlFor: "requireApproval",
                  className: "ml-2 block text-sm text-neutral-700",
                  children: "Require approval for expenses"
                })]
              }), financeSettings.requireApproval && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "ml-6",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                  type: "number",
                  label: "Approval Threshold",
                  value: financeSettings.approvalThreshold.toString(),
                  onChange: function onChange(e) {
                    return setFinanceSettings(_objectSpread(_objectSpread({}, financeSettings), {}, {
                      approvalThreshold: parseFloat(e.target.value) || 0
                    }));
                  },
                  helperText: "Expenses above this amount require approval",
                  min: 0,
                  step: 100
                })
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center justify-between border-b border-neutral-200 pb-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                className: "text-lg font-medium text-neutral-900",
                children: "Offering Types"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                size: "sm",
                onClick: function onClick() {
                  return setShowAddOfferingType(!showAddOfferingType);
                },
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_22__["default"], {
                  className: "h-4 w-4"
                }),
                children: "Add Offering Type"
              })]
            }), showAddOfferingType && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-3",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "Name",
                placeholder: "e.g., Tithes, Special Offering",
                value: newOfferingType.name,
                onChange: function onChange(e) {
                  return setNewOfferingType(_objectSpread(_objectSpread({}, newOfferingType), {}, {
                    name: e.target.value
                  }));
                }
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "Description (Optional)",
                placeholder: "Brief description",
                value: newOfferingType.description,
                onChange: function onChange(e) {
                  return setNewOfferingType(_objectSpread(_objectSpread({}, newOfferingType), {}, {
                    description: e.target.value
                  }));
                }
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex gap-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                  size: "sm",
                  onClick: handleAddOfferingType,
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
                    className: "h-4 w-4 mr-1"
                  }), "Save"]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                  size: "sm",
                  variant: "outline",
                  onClick: function onClick() {
                    setShowAddOfferingType(false);
                    setNewOfferingType({
                      name: '',
                      description: ''
                    });
                  },
                  children: "Cancel"
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-2",
              children: [offeringTypes.map(function (offeringType) {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow",
                  children: (editingOfferingType === null || editingOfferingType === void 0 ? void 0 : editingOfferingType.id) === offeringType.id ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex-1 space-y-2",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                      value: editingOfferingType.name,
                      onChange: function onChange(e) {
                        return setEditingOfferingType(_objectSpread(_objectSpread({}, editingOfferingType), {}, {
                          name: e.target.value
                        }));
                      }
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                      value: editingOfferingType.description || '',
                      onChange: function onChange(e) {
                        return setEditingOfferingType(_objectSpread(_objectSpread({}, editingOfferingType), {}, {
                          description: e.target.value
                        }));
                      },
                      placeholder: "Description"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex gap-2",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                        size: "sm",
                        onClick: function onClick() {
                          return handleUpdateOfferingType(offeringType.id, editingOfferingType);
                        },
                        children: "Save"
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                        size: "sm",
                        variant: "outline",
                        onClick: function onClick() {
                          return setEditingOfferingType(null);
                        },
                        children: "Cancel"
                      })]
                    })]
                  }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex-1",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                          className: "font-medium text-neutral-900",
                          children: offeringType.name
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
                          variant: offeringType.is_active ? 'success' : 'neutral',
                          children: offeringType.is_active ? 'Active' : 'Inactive'
                        })]
                      }), offeringType.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-neutral-600 mt-1",
                        children: offeringType.description
                      })]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: function onClick() {
                          return handleUpdateOfferingType(offeringType.id, {
                            is_active: !offeringType.is_active
                          });
                        },
                        className: "text-sm text-primary-600 hover:text-primary-700",
                        children: offeringType.is_active ? 'Deactivate' : 'Activate'
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: function onClick() {
                          return setEditingOfferingType(offeringType);
                        },
                        className: "p-2 text-neutral-600 hover:text-primary-600 transition-colors",
                        "aria-label": "Edit",
                        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                          className: "h-4 w-4"
                        })
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: function onClick() {
                          return handleDeleteOfferingType(offeringType.id);
                        },
                        className: "p-2 text-neutral-600 hover:text-error-600 transition-colors",
                        "aria-label": "Delete",
                        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_27__["default"], {
                          className: "h-4 w-4"
                        })
                      })]
                    })]
                  })
                }, offeringType.id);
              }), offeringTypes.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-sm text-neutral-500 text-center py-4",
                children: "No offering types configured. Add one to get started."
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center justify-between border-b border-neutral-200 pb-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                className: "text-lg font-medium text-neutral-900",
                children: "Expense Categories"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                size: "sm",
                onClick: function onClick() {
                  return setShowAddExpenseCategory(!showAddExpenseCategory);
                },
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_22__["default"], {
                  className: "h-4 w-4"
                }),
                children: "Add Category"
              })]
            }), showAddExpenseCategory && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-3",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "Name",
                placeholder: "e.g., Utilities, Salaries",
                value: newExpenseCategory.name,
                onChange: function onChange(e) {
                  return setNewExpenseCategory(_objectSpread(_objectSpread({}, newExpenseCategory), {}, {
                    name: e.target.value
                  }));
                }
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "Description (Optional)",
                placeholder: "Brief description",
                value: newExpenseCategory.description,
                onChange: function onChange(e) {
                  return setNewExpenseCategory(_objectSpread(_objectSpread({}, newExpenseCategory), {}, {
                    description: e.target.value
                  }));
                }
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex gap-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                  size: "sm",
                  onClick: handleAddExpenseCategory,
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
                    className: "h-4 w-4 mr-1"
                  }), "Save"]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                  size: "sm",
                  variant: "outline",
                  onClick: function onClick() {
                    setShowAddExpenseCategory(false);
                    setNewExpenseCategory({
                      name: '',
                      description: ''
                    });
                  },
                  children: "Cancel"
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-2",
              children: [expenseCategories.map(function (category) {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow",
                  children: (editingExpenseCategory === null || editingExpenseCategory === void 0 ? void 0 : editingExpenseCategory.id) === category.id ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex-1 space-y-2",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                      value: editingExpenseCategory.name,
                      onChange: function onChange(e) {
                        return setEditingExpenseCategory(_objectSpread(_objectSpread({}, editingExpenseCategory), {}, {
                          name: e.target.value
                        }));
                      }
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                      value: editingExpenseCategory.description || '',
                      onChange: function onChange(e) {
                        return setEditingExpenseCategory(_objectSpread(_objectSpread({}, editingExpenseCategory), {}, {
                          description: e.target.value
                        }));
                      },
                      placeholder: "Description"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex gap-2",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                        size: "sm",
                        onClick: function onClick() {
                          return handleUpdateExpenseCategory(category.id, editingExpenseCategory);
                        },
                        children: "Save"
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                        size: "sm",
                        variant: "outline",
                        onClick: function onClick() {
                          return setEditingExpenseCategory(null);
                        },
                        children: "Cancel"
                      })]
                    })]
                  }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex-1",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                          className: "font-medium text-neutral-900",
                          children: category.name
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
                          variant: category.is_active ? 'success' : 'neutral',
                          children: category.is_active ? 'Active' : 'Inactive'
                        })]
                      }), category.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-neutral-600 mt-1",
                        children: category.description
                      })]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: function onClick() {
                          return handleUpdateExpenseCategory(category.id, {
                            is_active: !category.is_active
                          });
                        },
                        className: "text-sm text-primary-600 hover:text-primary-700",
                        children: category.is_active ? 'Deactivate' : 'Activate'
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: function onClick() {
                          return setEditingExpenseCategory(category);
                        },
                        className: "p-2 text-neutral-600 hover:text-primary-600 transition-colors",
                        "aria-label": "Edit",
                        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                          className: "h-4 w-4"
                        })
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: function onClick() {
                          return handleDeleteExpenseCategory(category.id);
                        },
                        className: "p-2 text-neutral-600 hover:text-error-600 transition-colors",
                        "aria-label": "Delete",
                        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_27__["default"], {
                          className: "h-4 w-4"
                        })
                      })]
                    })]
                  })
                }, category.id);
              }), expenseCategories.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-sm text-neutral-500 text-center py-4",
                children: "No expense categories configured. Add one to get started."
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center justify-between border-b border-neutral-200 pb-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                className: "text-lg font-medium text-neutral-900",
                children: "Funds"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                size: "sm",
                onClick: function onClick() {
                  return setShowAddFund(!showAddFund);
                },
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_22__["default"], {
                  className: "h-4 w-4"
                }),
                children: "Add Fund"
              })]
            }), showAddFund && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-3",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "Name",
                placeholder: "e.g., General Fund, Building Fund",
                value: newFund.name,
                onChange: function onChange(e) {
                  return setNewFund(_objectSpread(_objectSpread({}, newFund), {}, {
                    name: e.target.value
                  }));
                }
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Type",
                options: [{
                  value: 'unrestricted',
                  label: 'Unrestricted'
                }, {
                  value: 'restricted',
                  label: 'Restricted'
                }],
                value: newFund.type,
                onChange: function onChange(value) {
                  return setNewFund(_objectSpread(_objectSpread({}, newFund), {}, {
                    type: value
                  }));
                }
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "Description (Optional)",
                placeholder: "Brief description",
                value: newFund.description,
                onChange: function onChange(e) {
                  return setNewFund(_objectSpread(_objectSpread({}, newFund), {}, {
                    description: e.target.value
                  }));
                }
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex gap-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                  size: "sm",
                  onClick: handleAddFund,
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
                    className: "h-4 w-4 mr-1"
                  }), "Save"]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                  size: "sm",
                  variant: "outline",
                  onClick: function onClick() {
                    setShowAddFund(false);
                    setNewFund({
                      name: '',
                      type: 'unrestricted',
                      description: ''
                    });
                  },
                  children: "Cancel"
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-2",
              children: [funds.map(function (fund) {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow",
                  children: (editingFund === null || editingFund === void 0 ? void 0 : editingFund.id) === fund.id ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex-1 space-y-2",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                      value: editingFund.name,
                      onChange: function onChange(e) {
                        return setEditingFund(_objectSpread(_objectSpread({}, editingFund), {}, {
                          name: e.target.value
                        }));
                      }
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                      label: "Type",
                      options: [{
                        value: 'unrestricted',
                        label: 'Unrestricted'
                      }, {
                        value: 'restricted',
                        label: 'Restricted'
                      }],
                      value: editingFund.type,
                      onChange: function onChange(value) {
                        return setEditingFund(_objectSpread(_objectSpread({}, editingFund), {}, {
                          type: value
                        }));
                      }
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                      value: editingFund.description || '',
                      onChange: function onChange(e) {
                        return setEditingFund(_objectSpread(_objectSpread({}, editingFund), {}, {
                          description: e.target.value
                        }));
                      },
                      placeholder: "Description"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex gap-2",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                        size: "sm",
                        onClick: function onClick() {
                          return handleUpdateFund(fund.id, editingFund);
                        },
                        children: "Save"
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                        size: "sm",
                        variant: "outline",
                        onClick: function onClick() {
                          return setEditingFund(null);
                        },
                        children: "Cancel"
                      })]
                    })]
                  }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex-1",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                          className: "font-medium text-neutral-900",
                          children: fund.name
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
                          variant: fund.type === 'restricted' ? 'warning' : 'primary',
                          children: fund.type
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
                          variant: fund.is_active ? 'success' : 'neutral',
                          children: fund.is_active ? 'Active' : 'Inactive'
                        })]
                      }), fund.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "text-sm text-neutral-600 mt-1",
                        children: fund.description
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-sm text-neutral-500 mt-1",
                        children: ["Balance: \u20B1", parseFloat(fund.current_balance).toLocaleString('en-PH', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })]
                      })]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: function onClick() {
                          return handleUpdateFund(fund.id, {
                            is_active: !fund.is_active
                          });
                        },
                        className: "text-sm text-primary-600 hover:text-primary-700",
                        children: fund.is_active ? 'Deactivate' : 'Activate'
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: function onClick() {
                          return setEditingFund(fund);
                        },
                        className: "p-2 text-neutral-600 hover:text-primary-600 transition-colors",
                        "aria-label": "Edit",
                        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                          className: "h-4 w-4"
                        })
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        onClick: function onClick() {
                          return handleDeleteFund(fund.id);
                        },
                        className: "p-2 text-neutral-600 hover:text-error-600 transition-colors",
                        "aria-label": "Delete",
                        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_27__["default"], {
                          className: "h-4 w-4"
                        })
                      })]
                    })]
                  })
                }, fund.id);
              }), funds.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-sm text-neutral-500 text-center py-4",
                children: "No funds configured. Add one to get started."
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex justify-end pt-4 border-t border-neutral-200",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
              onClick: handleSaveFinanceSettings,
              loading: isSaving,
              disabled: isSaving,
              children: "Save Changes"
            })
          })]
        });
      case 'email-notifications':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
              className: "text-xl font-semibold text-neutral-900",
              children: "Email & Notifications"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-neutral-600",
              children: "Configure email settings and notification preferences."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "SMTP Configuration"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "SMTP Host",
                placeholder: "smtp.gmail.com",
                value: emailNotificationSettings.smtpHost,
                onChange: function onChange(e) {
                  return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                    smtpHost: e.target.value
                  }));
                },
                helperText: "Your email server hostname",
                required: true
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "number",
                label: "SMTP Port",
                placeholder: "587",
                value: emailNotificationSettings.smtpPort,
                onChange: function onChange(e) {
                  return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                    smtpPort: e.target.value
                  }));
                },
                helperText: "Common ports: 587 (TLS), 465 (SSL), 25 (None)",
                required: true
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "SMTP Username",
                placeholder: "your-email@example.com",
                value: emailNotificationSettings.smtpUsername,
                onChange: function onChange(e) {
                  return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                    smtpUsername: e.target.value
                  }));
                },
                helperText: "Your email account username"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                  type: showSmtpPassword ? 'text' : 'password',
                  label: "SMTP Password",
                  placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                  value: emailNotificationSettings.smtpPassword,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      smtpPassword: e.target.value
                    }));
                  },
                  helperText: "Your email account password or app password"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                  type: "button",
                  onClick: function onClick() {
                    return setShowSmtpPassword(!showSmtpPassword);
                  },
                  className: "absolute right-3 top-8 text-neutral-500 hover:text-neutral-700",
                  "aria-label": showSmtpPassword ? 'Hide password' : 'Show password',
                  children: showSmtpPassword ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], {
                    className: "h-5 w-5"
                  }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_16__["default"], {
                    className: "h-5 w-5"
                  })
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                label: "Encryption",
                options: [{
                  value: 'none',
                  label: 'None'
                }, {
                  value: 'tls',
                  label: 'TLS'
                }, {
                  value: 'ssl',
                  label: 'SSL'
                }],
                value: emailNotificationSettings.smtpEncryption,
                onChange: function onChange(value) {
                  return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                    smtpEncryption: value
                  }));
                },
                helperText: "Encryption method for secure connection"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "email",
                label: "From Email",
                placeholder: "noreply@mfmc.church",
                value: emailNotificationSettings.smtpFromEmail,
                onChange: function onChange(e) {
                  return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                    smtpFromEmail: e.target.value
                  }));
                },
                helperText: "Email address shown as sender",
                required: true
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                label: "From Name",
                placeholder: "MFMC System",
                value: emailNotificationSettings.smtpFromName,
                onChange: function onChange(e) {
                  return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                    smtpFromName: e.target.value
                  }));
                },
                helperText: "Name shown as sender"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center gap-3 pt-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                variant: "outline",
                onClick: handleSendTestEmail,
                loading: isSendingTestEmail,
                disabled: isSendingTestEmail || !emailNotificationSettings.smtpHost || !emailNotificationSettings.smtpFromEmail,
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_24__["default"], {
                  className: "h-4 w-4"
                }),
                children: "Send Test Email"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-sm text-neutral-500",
                children: "Send a test email to verify your SMTP configuration"
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Notification Preferences"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-3",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "enableEmailNotifications",
                    className: "block text-sm font-medium text-neutral-900",
                    children: "Email Notifications"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-neutral-600",
                    children: "Receive notifications via email"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "enableEmailNotifications",
                  checked: emailNotificationSettings.enableEmailNotifications,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      enableEmailNotifications: e.target.checked
                    }));
                  },
                  className: "h-5 w-5 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "enableInAppNotifications",
                    className: "block text-sm font-medium text-neutral-900",
                    children: "In-App Notifications"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-neutral-600",
                    children: "Receive notifications within the application"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "enableInAppNotifications",
                  checked: emailNotificationSettings.enableInAppNotifications,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      enableInAppNotifications: e.target.checked
                    }));
                  },
                  className: "h-5 w-5 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                })]
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Notification Types"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-600",
              children: "Choose which events trigger notifications"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "notifyNewMember",
                    className: "block text-sm font-medium text-neutral-900",
                    children: "New Member"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs text-neutral-600",
                    children: "Notify when a new member is added to the system"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "notifyNewMember",
                  checked: emailNotificationSettings.notifyNewMember,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      notifyNewMember: e.target.checked
                    }));
                  },
                  className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "notifyEventReminder",
                    className: "block text-sm font-medium text-neutral-900",
                    children: "Event Reminder"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs text-neutral-600",
                    children: "Send reminders for upcoming events"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "notifyEventReminder",
                  checked: emailNotificationSettings.notifyEventReminder,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      notifyEventReminder: e.target.checked
                    }));
                  },
                  className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "notifyFinanceApproval",
                    className: "block text-sm font-medium text-neutral-900",
                    children: "Finance Approval"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs text-neutral-600",
                    children: "Notify when expenses require approval"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "notifyFinanceApproval",
                  checked: emailNotificationSettings.notifyFinanceApproval,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      notifyFinanceApproval: e.target.checked
                    }));
                  },
                  className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "notifyExpenseSubmitted",
                    className: "block text-sm font-medium text-neutral-900",
                    children: "Expense Submitted"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs text-neutral-600",
                    children: "Notify when a new expense is submitted"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "notifyExpenseSubmitted",
                  checked: emailNotificationSettings.notifyExpenseSubmitted,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      notifyExpenseSubmitted: e.target.checked
                    }));
                  },
                  className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "notifyOfferingRecorded",
                    className: "block text-sm font-medium text-neutral-900",
                    children: "Offering Recorded"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs text-neutral-600",
                    children: "Notify when offerings are recorded"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "notifyOfferingRecorded",
                  checked: emailNotificationSettings.notifyOfferingRecorded,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      notifyOfferingRecorded: e.target.checked
                    }));
                  },
                  className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "notifyBudgetThreshold",
                    className: "block text-sm font-medium text-neutral-900",
                    children: "Budget Threshold"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs text-neutral-600",
                    children: "Notify when budget reaches threshold (80%, 90%, 100%)"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "notifyBudgetThreshold",
                  checked: emailNotificationSettings.notifyBudgetThreshold,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      notifyBudgetThreshold: e.target.checked
                    }));
                  },
                  className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "notifyUserInvite",
                    className: "block text-sm font-medium text-neutral-900",
                    children: "User Invite"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs text-neutral-600",
                    children: "Notify when a new user is invited to the system"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "notifyUserInvite",
                  checked: emailNotificationSettings.notifyUserInvite,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      notifyUserInvite: e.target.checked
                    }));
                  },
                  className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center justify-between p-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "notifySystemUpdate",
                    className: "block text-sm font-medium text-neutral-900",
                    children: "System Update"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-xs text-neutral-600",
                    children: "Notify about system updates and maintenance"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "notifySystemUpdate",
                  checked: emailNotificationSettings.notifySystemUpdate,
                  onChange: function onChange(e) {
                    return setEmailNotificationSettings(_objectSpread(_objectSpread({}, emailNotificationSettings), {}, {
                      notifySystemUpdate: e.target.checked
                    }));
                  },
                  className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                })]
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex justify-end pt-4 border-t border-neutral-200",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
              onClick: handleSaveEmailNotificationSettings,
              loading: isSaving,
              disabled: isSaving,
              children: "Save Changes"
            })
          })]
        });
      case 'security':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
              className: "text-xl font-semibold text-neutral-900",
              children: "Security"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-neutral-600",
              children: "Manage security settings, password policies, and authentication options."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Password Policy"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "number",
                label: "Minimum Password Length",
                value: securitySettings.minPasswordLength.toString(),
                onChange: function onChange(e) {
                  return setSecuritySettings(_objectSpread(_objectSpread({}, securitySettings), {}, {
                    minPasswordLength: parseInt(e.target.value) || 8
                  }));
                },
                helperText: "Minimum number of characters required (8-32)",
                min: 8,
                max: 32
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "number",
                label: "Password Expiry (Days)",
                value: securitySettings.passwordExpiryDays.toString(),
                onChange: function onChange(e) {
                  return setSecuritySettings(_objectSpread(_objectSpread({}, securitySettings), {}, {
                    passwordExpiryDays: parseInt(e.target.value) || 90
                  }));
                },
                helperText: "Days before password must be changed (0 = never)",
                min: 0,
                max: 365
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-3",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-sm font-medium text-neutral-700",
                children: "Complexity Requirements"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "space-y-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "checkbox",
                    id: "requireUppercase",
                    checked: securitySettings.requireUppercase,
                    onChange: function onChange(e) {
                      return setSecuritySettings(_objectSpread(_objectSpread({}, securitySettings), {}, {
                        requireUppercase: e.target.checked
                      }));
                    },
                    className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "requireUppercase",
                    className: "ml-2 block text-sm text-neutral-700",
                    children: "Require at least one uppercase letter (A-Z)"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "checkbox",
                    id: "requireLowercase",
                    checked: securitySettings.requireLowercase,
                    onChange: function onChange(e) {
                      return setSecuritySettings(_objectSpread(_objectSpread({}, securitySettings), {}, {
                        requireLowercase: e.target.checked
                      }));
                    },
                    className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "requireLowercase",
                    className: "ml-2 block text-sm text-neutral-700",
                    children: "Require at least one lowercase letter (a-z)"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "checkbox",
                    id: "requireNumbers",
                    checked: securitySettings.requireNumbers,
                    onChange: function onChange(e) {
                      return setSecuritySettings(_objectSpread(_objectSpread({}, securitySettings), {}, {
                        requireNumbers: e.target.checked
                      }));
                    },
                    className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "requireNumbers",
                    className: "ml-2 block text-sm text-neutral-700",
                    children: "Require at least one number (0-9)"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "checkbox",
                    id: "requireSpecialChars",
                    checked: securitySettings.requireSpecialChars,
                    onChange: function onChange(e) {
                      return setSecuritySettings(_objectSpread(_objectSpread({}, securitySettings), {}, {
                        requireSpecialChars: e.target.checked
                      }));
                    },
                    className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "requireSpecialChars",
                    className: "ml-2 block text-sm text-neutral-700",
                    children: "Require at least one special character (!@#$%^&*)"
                  })]
                })]
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Session Settings"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "number",
                label: "Session Timeout (Minutes)",
                value: securitySettings.sessionTimeout.toString(),
                onChange: function onChange(e) {
                  return setSecuritySettings(_objectSpread(_objectSpread({}, securitySettings), {}, {
                    sessionTimeout: parseInt(e.target.value) || 30
                  }));
                },
                helperText: "Automatically log out inactive users after this time",
                min: 5,
                max: 1440
              })
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "bg-info-50 border border-info-200 rounded-lg p-4",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "flex-shrink-0",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_26__["default"], {
                    className: "h-5 w-5 text-info-600"
                  })
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "ml-3",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    className: "text-sm text-info-800",
                    children: ["Users will be automatically logged out after ", securitySettings.sessionTimeout, " minutes of inactivity. They will receive a warning 2 minutes before timeout."]
                  })
                })]
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Two-Factor Authentication"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  htmlFor: "enable2FA",
                  className: "block text-sm font-medium text-neutral-900",
                  children: "Enable Two-Factor Authentication"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                  className: "text-sm text-neutral-600 mt-1",
                  children: "Require users to verify their identity with a second factor (email or authenticator app)"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "checkbox",
                id: "enable2FA",
                checked: securitySettings.enable2FA,
                onChange: function onChange(e) {
                  return setSecuritySettings(_objectSpread(_objectSpread({}, securitySettings), {}, {
                    enable2FA: e.target.checked
                  }));
                },
                className: "h-5 w-5 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              })]
            }), securitySettings.enable2FA && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "bg-success-50 border border-success-200 rounded-lg p-4",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "flex-shrink-0",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
                    className: "h-5 w-5 text-success-600"
                  })
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "ml-3",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-success-800",
                    children: "Two-factor authentication is enabled. Users will be prompted to set up 2FA on their next login."
                  })
                })]
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Login Security"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "number",
                label: "Maximum Login Attempts",
                value: securitySettings.maxLoginAttempts.toString(),
                onChange: function onChange(e) {
                  return setSecuritySettings(_objectSpread(_objectSpread({}, securitySettings), {}, {
                    maxLoginAttempts: parseInt(e.target.value) || 5
                  }));
                },
                helperText: "Lock account after this many failed login attempts",
                min: 3,
                max: 10
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                type: "number",
                label: "Lockout Duration (Minutes)",
                value: securitySettings.lockoutDuration.toString(),
                onChange: function onChange(e) {
                  return setSecuritySettings(_objectSpread(_objectSpread({}, securitySettings), {}, {
                    lockoutDuration: parseInt(e.target.value) || 15
                  }));
                },
                helperText: "How long to lock the account after max attempts",
                min: 5,
                max: 1440
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "bg-warning-50 border border-warning-200 rounded-lg p-4",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "flex-shrink-0",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_26__["default"], {
                    className: "h-5 w-5 text-warning-600"
                  })
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "ml-3",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                    className: "text-sm text-warning-800",
                    children: ["After ", securitySettings.maxLoginAttempts, " failed login attempts, the account will be locked for ", securitySettings.lockoutDuration, " minutes. Administrators can manually unlock accounts from the Users page."]
                  })
                })]
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center justify-between border-b border-neutral-200 pb-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                className: "text-lg font-medium text-neutral-900",
                children: "Security Audit Log"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                size: "sm",
                variant: "outline",
                onClick: loadAuditLogs,
                loading: isLoadingAuditLogs,
                disabled: isLoadingAuditLogs,
                children: "Refresh"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-600",
              children: "Recent security-related events (last 10 entries)"
            }), isLoadingAuditLogs ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "text-center py-8",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "mt-2 text-sm text-neutral-600",
                children: "Loading audit logs..."
              })]
            }) : auditLogs.length > 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "space-y-2",
              children: auditLogs.map(function (log) {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "flex items-start justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex-1",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "font-medium text-neutral-900",
                        children: log.user
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
                        variant: log.action.includes('Failed') || log.action.includes('Locked') ? 'error' : log.action.includes('Login') ? 'success' : 'neutral',
                        children: log.action
                      })]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                      className: "text-sm text-neutral-600 mt-1",
                      children: log.details
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex items-center gap-4 mt-2 text-xs text-neutral-500",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        children: formatRelativeTime(log.timestamp)
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                        children: ["IP: ", log.ipAddress]
                      })]
                    })]
                  })
                }, log.id);
              })
            }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "text-center py-8 bg-neutral-50 rounded-lg border border-neutral-200",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_26__["default"], {
                className: "mx-auto h-12 w-12 text-neutral-400"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "mt-2 text-sm text-neutral-600",
                children: "No audit logs available"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "flex justify-center",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                variant: "outline",
                size: "sm",
                onClick: function onClick() {
                  // TODO: Navigate to full Activity Log page
                  showToast('info', 'View full activity log in the Activity Log page');
                },
                children: "View Full Activity Log"
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex justify-end pt-4 border-t border-neutral-200",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
              onClick: handleSaveSecuritySettings,
              loading: isSaving,
              disabled: isSaving,
              children: "Save Changes"
            })
          })]
        });
      case 'backup':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
              className: "text-xl font-semibold text-neutral-900",
              children: "Backup & Restore"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-neutral-600",
              children: "Manage database backups and restoration."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 border border-primary-200",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-start justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-4",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "p-3 bg-primary-600 rounded-lg",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], {
                    className: "h-6 w-6 text-white"
                  })
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                    className: "text-lg font-semibold text-neutral-900",
                    children: "Last Backup"
                  }), lastBackup ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                      className: "text-sm text-neutral-600 mt-1",
                      children: new Date(lastBackup.created_at).toLocaleString()
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex items-center gap-4 mt-2",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-1 text-sm text-neutral-700",
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_17__["default"], {
                          className: "h-4 w-4"
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                          children: lastBackup.size
                        })]
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-1 text-sm text-neutral-700",
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
                          className: "h-4 w-4"
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                          children: formatRelativeTime(lastBackup.created_at)
                        })]
                      })]
                    })]
                  }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-neutral-600 mt-1",
                    children: "No backups available"
                  })]
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                onClick: handleCreateBackup,
                loading: isCreatingBackup,
                disabled: isCreatingBackup,
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_14__["default"], {
                  className: "h-4 w-4"
                }),
                children: "Create Backup Now"
              })]
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Automatic Backup Schedule"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                  type: "checkbox",
                  id: "enableAutoBackup",
                  checked: backupSettings.enableAutoBackup,
                  onChange: function onChange(e) {
                    return setBackupSettings(_objectSpread(_objectSpread({}, backupSettings), {}, {
                      enableAutoBackup: e.target.checked
                    }));
                  },
                  className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  htmlFor: "enableAutoBackup",
                  className: "ml-2 block text-sm text-neutral-700",
                  children: "Enable automatic backups"
                })]
              }), backupSettings.enableAutoBackup && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ml-6 space-y-4",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_34__.Select, {
                    label: "Backup Frequency",
                    options: [{
                      value: 'daily',
                      label: 'Daily'
                    }, {
                      value: 'weekly',
                      label: 'Weekly'
                    }, {
                      value: 'monthly',
                      label: 'Monthly'
                    }],
                    value: backupSettings.backupFrequency,
                    onChange: function onChange(value) {
                      return setBackupSettings(_objectSpread(_objectSpread({}, backupSettings), {}, {
                        backupFrequency: value
                      }));
                    },
                    helperText: "How often to create automatic backups"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                    type: "time",
                    label: "Backup Time",
                    value: backupSettings.backupTime,
                    onChange: function onChange(e) {
                      return setBackupSettings(_objectSpread(_objectSpread({}, backupSettings), {}, {
                        backupTime: e.target.value
                      }));
                    },
                    helperText: "Time of day to run backups (server time)"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                    type: "number",
                    label: "Retention Period (Days)",
                    value: backupSettings.retentionDays.toString(),
                    onChange: function onChange(e) {
                      return setBackupSettings(_objectSpread(_objectSpread({}, backupSettings), {}, {
                        retentionDays: parseInt(e.target.value) || 30
                      }));
                    },
                    min: 1,
                    max: 365,
                    helperText: "How long to keep old backups"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "checkbox",
                    id: "includeUploads",
                    checked: backupSettings.includeUploads,
                    onChange: function onChange(e) {
                      return setBackupSettings(_objectSpread(_objectSpread({}, backupSettings), {}, {
                        includeUploads: e.target.checked
                      }));
                    },
                    className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    htmlFor: "includeUploads",
                    className: "ml-2 block text-sm text-neutral-700",
                    children: "Include uploaded files in backup"
                  })]
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "flex justify-end pt-4 border-t border-neutral-200",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                onClick: handleSaveBackupSettings,
                loading: isSaving,
                disabled: isSaving,
                children: "Save Settings"
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Backup History"
            }), isLoadingBackups ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "text-center py-8",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "mt-2 text-sm text-neutral-600",
                children: "Loading backups..."
              })]
            }) : backups.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "text-center py-8 bg-neutral-50 rounded-lg border border-neutral-200",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], {
                className: "mx-auto h-12 w-12 text-neutral-400"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "mt-2 text-sm text-neutral-600",
                children: "No backups available"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs text-neutral-500 mt-1",
                children: "Create your first backup to get started"
              })]
            }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "space-y-2",
              children: backups.map(function (backup) {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition-shadow",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-start gap-4 flex-1",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_32__.cn)('p-2 rounded-lg', backup.type === 'automatic' ? 'bg-primary-100' : 'bg-success-100'),
                      children: backup.type === 'automatic' ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_32__.cn)('h-5 w-5', backup.type === 'automatic' ? 'text-primary-600' : 'text-success-600')
                      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_14__["default"], {
                        className: "h-5 w-5 text-success-600"
                      })
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex-1 min-w-0",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                          className: "font-medium text-neutral-900 truncate",
                          children: backup.filename
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
                          variant: backup.type === 'automatic' ? 'primary' : 'success',
                          children: backup.type === 'automatic' ? 'Auto' : 'Manual'
                        }), backup.status === 'completed' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
                          variant: "success",
                          children: "Completed"
                        }), backup.status === 'in_progress' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
                          variant: "warning",
                          children: "In Progress"
                        }), backup.status === 'failed' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_37__.Badge, {
                          variant: "error",
                          children: "Failed"
                        })]
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-center gap-4 mt-1 text-sm text-neutral-600",
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                          className: "flex items-center gap-1",
                          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_17__["default"], {
                            className: "h-4 w-4"
                          }), backup.size]
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                          className: "flex items-center gap-1",
                          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
                            className: "h-4 w-4"
                          }), new Date(backup.created_at).toLocaleString()]
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                          children: ["by ", backup.created_by]
                        })]
                      })]
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-2 ml-4",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                      size: "sm",
                      variant: "outline",
                      onClick: function onClick() {
                        return handleDownloadBackup(backup);
                      },
                      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_14__["default"], {
                        className: "h-4 w-4"
                      }),
                      disabled: backup.status !== 'completed',
                      children: "Download"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                      size: "sm",
                      variant: "outline",
                      onClick: function onClick() {
                        return handleRestoreBackup(backup);
                      },
                      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_23__["default"], {
                        className: "h-4 w-4"
                      }),
                      disabled: backup.status !== 'completed',
                      children: "Restore"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                      onClick: function onClick() {
                        return handleDeleteBackup(backup);
                      },
                      className: "p-2 text-neutral-600 hover:text-error-600 transition-colors",
                      "aria-label": "Delete backup",
                      disabled: backup.status === 'in_progress',
                      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_27__["default"], {
                        className: "h-4 w-4"
                      })
                    })]
                  })]
                }, backup.id);
              })
            })]
          }), restoreConfirmation && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "bg-white rounded-xl shadow-2xl max-w-md w-full p-6",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start gap-4",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "p-3 bg-warning-100 rounded-lg",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    className: "h-6 w-6 text-warning-600"
                  })
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex-1",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                    className: "text-lg font-semibold text-neutral-900",
                    children: "Confirm Restore"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "mt-2 text-sm text-neutral-600",
                    children: "Are you sure you want to restore from this backup? This will replace all current data with the backup data."
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mt-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                      className: "text-sm font-medium text-neutral-900",
                      children: restoreConfirmation.filename
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                      className: "text-xs text-neutral-600 mt-1",
                      children: ["Created: ", new Date(restoreConfirmation.created_at).toLocaleString()]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                      className: "text-xs text-neutral-600",
                      children: ["Size: ", restoreConfirmation.size]
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mt-4 p-3 bg-warning-50 rounded-lg border border-warning-200",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                      className: "text-xs text-warning-800 font-medium",
                      children: "\u26A0\uFE0F Warning"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                      className: "text-xs text-warning-700 mt-1",
                      children: "This action cannot be undone. All current data will be replaced. It's recommended to create a backup before restoring."
                    })]
                  })]
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex gap-3 mt-6",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                  variant: "outline",
                  onClick: function onClick() {
                    return setRestoreConfirmation(null);
                  },
                  fullWidth: true,
                  children: "Cancel"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                  variant: "danger",
                  onClick: confirmRestore,
                  fullWidth: true,
                  icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_23__["default"], {
                    className: "h-4 w-4"
                  }),
                  children: "Restore Backup"
                })]
              })]
            })
          })]
        });
      case 'integrations':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
              className: "text-xl font-semibold text-neutral-900",
              children: "Integrations"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-neutral-600",
              children: "Connect and configure third-party integrations to extend functionality."
            })]
          }), ['payment', 'email', 'calendar', 'communication'].map(function (category) {
            var categoryIntegrations = integrations.filter(function (_int3) {
              return _int3.category === category;
            });
            if (categoryIntegrations.length === 0) return null;
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
                children: getCategoryLabel(category)
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: categoryIntegrations.map(function (integration) {
                  var Icon = integration.icon;
                  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      className: "flex items-start justify-between",
                      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "flex items-start space-x-3 flex-1",
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                          className: "flex-shrink-0",
                          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center",
                            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                              className: "h-6 w-6 text-primary-600"
                            })
                          })
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                          className: "flex-1 min-w-0",
                          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                              className: "text-base font-semibold text-neutral-900",
                              children: integration.name
                            }), getStatusIcon(integration.status)]
                          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "mt-1 text-sm text-neutral-600",
                            children: integration.description
                          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mt-3 flex items-center gap-3",
                            children: [getStatusBadge(integration.status), integration.lastSync && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                              className: "text-xs text-neutral-500",
                              children: ["Last synced: ", formatRelativeTime(integration.lastSync)]
                            })]
                          }), integration.apiKey && integration.status === 'connected' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mt-3 flex items-center gap-2 text-xs text-neutral-600",
                            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_18__["default"], {
                              className: "h-3 w-3"
                            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                              className: "font-mono",
                              children: integration.apiKey
                            })]
                          })]
                        })]
                      })
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                      className: "mt-4 flex items-center gap-2",
                      children: integration.status === 'connected' ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                          size: "sm",
                          variant: "outline",
                          onClick: function onClick() {
                            return handleConfigureIntegration(integration);
                          },
                          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_25__["default"], {
                            className: "h-4 w-4"
                          }),
                          children: "Configure"
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                          size: "sm",
                          variant: "outline",
                          onClick: function onClick() {
                            return handleTestIntegration(integration);
                          },
                          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_31__["default"], {
                            className: "h-4 w-4"
                          }),
                          children: "Test"
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                          size: "sm",
                          variant: "outline",
                          onClick: function onClick() {
                            return handleDisconnectIntegration(integration);
                          },
                          children: "Disconnect"
                        })]
                      }) : integration.status === 'error' ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                          size: "sm",
                          variant: "primary",
                          onClick: function onClick() {
                            return handleConfigureIntegration(integration);
                          },
                          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_25__["default"], {
                            className: "h-4 w-4"
                          }),
                          children: "Reconfigure"
                        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                          size: "sm",
                          variant: "outline",
                          onClick: function onClick() {
                            return handleDisconnectIntegration(integration);
                          },
                          children: "Disconnect"
                        })]
                      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                        size: "sm",
                        variant: "primary",
                        onClick: function onClick() {
                          return handleConfigureIntegration(integration);
                        },
                        icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_21__["default"], {
                          className: "h-4 w-4"
                        }),
                        children: "Connect"
                      })
                    })]
                  }, integration.id);
                })
              })]
            }, category);
          }), configuringIntegration && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-6 py-4 border-b border-neutral-200 flex items-center justify-between",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(configuringIntegration.icon, {
                    className: 'h-6 w-6 text-primary-600'
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                    className: "text-lg font-semibold text-neutral-900",
                    children: ["Configure ", configuringIntegration.name]
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                  onClick: function onClick() {
                    return setConfiguringIntegration(null);
                  },
                  className: "text-neutral-400 hover:text-neutral-600 transition-colors",
                  "aria-label": "Close",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_30__["default"], {
                    className: "h-5 w-5"
                  })
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "px-6 py-4 overflow-y-auto flex-1",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "space-y-4",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-neutral-600",
                    children: configuringIntegration.description
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-2",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                      className: "block text-sm font-medium text-neutral-700",
                      children: ["API Key ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "text-error-600",
                        children: "*"
                      })]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "relative",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        type: showApiKey ? 'text' : 'password',
                        value: integrationConfig.apiKey,
                        onChange: function onChange(e) {
                          return setIntegrationConfig(_objectSpread(_objectSpread({}, integrationConfig), {}, {
                            apiKey: e.target.value
                          }));
                        },
                        placeholder: "Enter your API key",
                        className: "block w-full pr-10 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 px-4 py-2 text-base h-10"
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                        type: "button",
                        onClick: function onClick() {
                          return setShowApiKey(!showApiKey);
                        },
                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600",
                        children: showApiKey ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"], {
                          className: "h-4 w-4"
                        }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_16__["default"], {
                          className: "h-4 w-4"
                        })
                      })]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                      className: "text-xs text-neutral-500",
                      children: ["Get your API key from the ", configuringIntegration.name, " dashboard"]
                    })]
                  }), ['stripe', 'paypal', 'twilio'].includes(configuringIntegration.id) && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-2",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                      className: "block text-sm font-medium text-neutral-700",
                      children: "API Secret"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      type: "password",
                      value: integrationConfig.apiSecret,
                      onChange: function onChange(e) {
                        return setIntegrationConfig(_objectSpread(_objectSpread({}, integrationConfig), {}, {
                          apiSecret: e.target.value
                        }));
                      },
                      placeholder: "Enter your API secret (optional)",
                      className: "block w-full rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 px-4 py-2 text-base h-10"
                    })]
                  }), ['stripe', 'paypal'].includes(configuringIntegration.id) && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "space-y-2",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                      className: "block text-sm font-medium text-neutral-700",
                      children: "Webhook URL"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                        type: "text",
                        value: "".concat(window.location.origin, "/api/webhooks/").concat(configuringIntegration.id),
                        readOnly: true,
                        className: "block w-full rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-700 px-4 py-2 text-sm h-10"
                      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                        size: "sm",
                        variant: "outline",
                        onClick: function onClick() {
                          navigator.clipboard.writeText("".concat(window.location.origin, "/api/webhooks/").concat(configuringIntegration.id));
                          showToast('success', 'Webhook URL copied to clipboard');
                        },
                        children: "Copy"
                      })]
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                      className: "text-xs text-neutral-500",
                      children: ["Add this webhook URL to your ", configuringIntegration.name, " account"]
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "bg-primary-50 border border-primary-200 rounded-lg p-3",
                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                      className: "text-sm text-primary-800",
                      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                        children: "Need help?"
                      }), " Visit the", ' ', (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                        href: "https://docs.example.com/integrations/".concat(configuringIntegration.id),
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "underline hover:text-primary-900",
                        children: [configuringIntegration.name, " integration guide"]
                      }), ' ', "for detailed setup instructions."]
                    })
                  })]
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-end gap-3",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                  variant: "outline",
                  onClick: function onClick() {
                    return setConfiguringIntegration(null);
                  },
                  disabled: isSavingIntegration,
                  children: "Cancel"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                  variant: "primary",
                  onClick: handleSaveIntegrationConfig,
                  loading: isSavingIntegration,
                  disabled: isSavingIntegration || !integrationConfig.apiKey.trim(),
                  children: "Save Configuration"
                })]
              })]
            })
          })]
        });
      case 'archive':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
              className: "text-xl font-semibold text-neutral-900",
              children: "Archive Settings"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-neutral-600",
              children: "Configure archive behavior and retention policies for deleted items."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Archive Policies"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start justify-between p-4 bg-neutral-50 rounded-lg",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex-1",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    className: "text-sm font-medium text-neutral-900",
                    children: "Enable Auto-Archive"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-neutral-600 mt-1",
                    children: "Automatically archive inactive items after a specified period"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                  className: "relative inline-flex items-center cursor-pointer",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "checkbox",
                    checked: archiveSettings.autoArchiveEnabled,
                    onChange: function onChange(e) {
                      return setArchiveSettings(_objectSpread(_objectSpread({}, archiveSettings), {}, {
                        autoArchiveEnabled: e.target.checked
                      }));
                    },
                    className: "sr-only peer"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"
                  })]
                })]
              }), archiveSettings.autoArchiveEnabled && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  className: "block text-sm font-medium text-neutral-700 mb-2",
                  children: "Auto-Archive After (Days)"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                  type: "number",
                  min: "30",
                  max: "3650",
                  value: archiveSettings.autoArchiveDays,
                  onChange: function onChange(e) {
                    return setArchiveSettings(_objectSpread(_objectSpread({}, archiveSettings), {}, {
                      autoArchiveDays: parseInt(e.target.value) || 365
                    }));
                  },
                  helperText: "Items inactive for this many days will be automatically archived"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  className: "block text-sm font-medium text-neutral-700 mb-2",
                  children: "Archive Retention Period (Days)"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_33__.Input, {
                  type: "number",
                  min: "30",
                  max: "3650",
                  value: archiveSettings.retentionPeriod,
                  onChange: function onChange(e) {
                    return setArchiveSettings(_objectSpread(_objectSpread({}, archiveSettings), {}, {
                      retentionPeriod: parseInt(e.target.value) || 90
                    }));
                  },
                  helperText: "Archived items will be kept for this many days before permanent deletion"
                })]
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Archive Permissions"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "space-y-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start justify-between p-4 bg-neutral-50 rounded-lg",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex-1",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    className: "text-sm font-medium text-neutral-900",
                    children: "Allow Item Restoration"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-neutral-600 mt-1",
                    children: "Users with appropriate permissions can restore archived items"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                  className: "relative inline-flex items-center cursor-pointer",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "checkbox",
                    checked: archiveSettings.allowRestore,
                    onChange: function onChange(e) {
                      return setArchiveSettings(_objectSpread(_objectSpread({}, archiveSettings), {}, {
                        allowRestore: e.target.checked
                      }));
                    },
                    className: "sr-only peer"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"
                  })]
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start justify-between p-4 bg-neutral-50 rounded-lg",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex-1",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    className: "text-sm font-medium text-neutral-900",
                    children: "Require Archive Confirmation"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-neutral-600 mt-1",
                    children: "Show confirmation dialog before archiving items"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                  className: "relative inline-flex items-center cursor-pointer",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "checkbox",
                    checked: archiveSettings.requireConfirmation,
                    onChange: function onChange(e) {
                      return setArchiveSettings(_objectSpread(_objectSpread({}, archiveSettings), {}, {
                        requireConfirmation: e.target.checked
                      }));
                    },
                    className: "sr-only peer"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"
                  })]
                })]
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Notifications"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "space-y-4",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-start justify-between p-4 bg-neutral-50 rounded-lg",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex-1",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    className: "text-sm font-medium text-neutral-900",
                    children: "Notify on Archive"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-sm text-neutral-600 mt-1",
                    children: "Send notifications when items are archived"
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                  className: "relative inline-flex items-center cursor-pointer",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "checkbox",
                    checked: archiveSettings.notifyOnArchive,
                    onChange: function onChange(e) {
                      return setArchiveSettings(_objectSpread(_objectSpread({}, archiveSettings), {}, {
                        notifyOnArchive: e.target.checked
                      }));
                    },
                    className: "sr-only peer"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"
                  })]
                })]
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2",
              children: "Quick Actions"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex flex-wrap gap-3",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                variant: "outline",
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  className: "h-4 w-4"
                }),
                onClick: function onClick() {
                  return window.location.href = '/archive-management';
                },
                children: "View Archive"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
                variant: "outline",
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_14__["default"], {
                  className: "h-4 w-4"
                }),
                onClick: function () {
                  var _onClick = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27() {
                    var _t24;
                    return _regenerator().w(function (_context27) {
                      while (1) switch (_context27.p = _context27.n) {
                        case 0:
                          _context27.p = 0;
                          // TODO: Implement actual archive export API endpoint
                          // For now, show a proper message
                          showToast('info', 'Preparing archive export. This may take a few moments...');
                          // Simulate export preparation
                          _context27.n = 1;
                          return new Promise(function (resolve) {
                            return setTimeout(resolve, 1500);
                          });
                        case 1:
                          showToast('success', 'Archive export will be available in your downloads shortly');
                          _context27.n = 3;
                          break;
                        case 2:
                          _context27.p = 2;
                          _t24 = _context27.v;
                          showToast('error', 'Failed to export archive');
                        case 3:
                          return _context27.a(2);
                      }
                    }, _callee27, null, [[0, 2]]);
                  }));
                  function onClick() {
                    return _onClick.apply(this, arguments);
                  }
                  return onClick;
                }(),
                children: "Export Archive"
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex justify-end pt-4 border-t border-neutral-200",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_35__.Button, {
              variant: "primary",
              onClick: function () {
                var _onClick2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28() {
                  var _t25;
                  return _regenerator().w(function (_context28) {
                    while (1) switch (_context28.p = _context28.n) {
                      case 0:
                        setIsSaving(true);
                        _context28.p = 1;
                        _context28.n = 2;
                        return new Promise(function (resolve) {
                          return setTimeout(resolve, 1000);
                        });
                      case 2:
                        showToast('success', 'Archive settings saved successfully');
                        _context28.n = 4;
                        break;
                      case 3:
                        _context28.p = 3;
                        _t25 = _context28.v;
                        showToast('error', 'Failed to save archive settings');
                      case 4:
                        _context28.p = 4;
                        setIsSaving(false);
                        return _context28.f(4);
                      case 5:
                        return _context28.a(2);
                    }
                  }, _callee28, null, [[1, 3, 4, 5]]);
                }));
                function onClick() {
                  return _onClick2.apply(this, arguments);
                }
                return onClick;
              }(),
              loading: isSaving,
              disabled: isSaving,
              children: "Save Archive Settings"
            })
          })]
        });
      default:
        return null;
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
        className: "text-3xl font-bold text-neutral-900",
        children: "Settings"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "mt-2 text-neutral-600",
        children: "Configure system preferences and options"
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex flex-col lg:flex-row gap-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
        className: "hidden lg:block w-64 flex-shrink-0",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "bg-white rounded-lg border border-neutral-200 overflow-hidden",
          children: tabs.map(function (tab) {
            var Icon = tab.icon;
            var isActive = activeTab === tab.id;
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
              onClick: function onClick() {
                return setActiveTab(tab.id);
              },
              className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_32__.cn)('w-full flex items-center px-4 py-3 text-sm font-medium transition-colors', 'border-l-4 hover:bg-neutral-50', isActive ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-transparent text-neutral-700'),
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_32__.cn)('mr-3 h-5 w-5', isActive ? 'text-primary-600' : 'text-neutral-400')
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                children: tab.label
              })]
            }, tab.id);
          })
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "lg:hidden",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "bg-white rounded-lg border border-neutral-200 p-2",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex overflow-x-auto space-x-2 scrollbar-hide",
            children: tabs.map(function (tab) {
              var Icon = tab.icon;
              var isActive = activeTab === tab.id;
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                onClick: function onClick() {
                  return setActiveTab(tab.id);
                },
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_32__.cn)('flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap', isActive ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'),
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
                  className: "mr-2 h-4 w-4"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  children: tab.label
                })]
              }, tab.id);
            })
          })
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "flex-1 min-w-0",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "bg-white rounded-lg border border-neutral-200 p-6",
          children: renderTabContent()
        })
      })]
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

/***/ "./node_modules/lucide-react/dist/esm/icons/building-2.js"
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/building-2.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Building2)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
];
const Building2 = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("building-2", __iconNode);


//# sourceMappingURL=building-2.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/check.js"
/*!***********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/check.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Check)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("check", __iconNode);


//# sourceMappingURL=check.js.map


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

/***/ "./node_modules/lucide-react/dist/esm/icons/credit-card.js"
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/credit-card.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ CreditCard)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("credit-card", __iconNode);


//# sourceMappingURL=credit-card.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/database.js"
/*!**************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/database.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Database)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("database", __iconNode);


//# sourceMappingURL=database.js.map


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

/***/ "./node_modules/lucide-react/dist/esm/icons/eye-off.js"
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/eye-off.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ EyeOff)
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
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("eye-off", __iconNode);


//# sourceMappingURL=eye-off.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/eye.js"
/*!*********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/eye.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Eye)
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
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("eye", __iconNode);


//# sourceMappingURL=eye.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/hard-drive.js"
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/hard-drive.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ HardDrive)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
];
const HardDrive = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("hard-drive", __iconNode);


//# sourceMappingURL=hard-drive.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/key.js"
/*!*********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/key.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Key)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("key", __iconNode);


//# sourceMappingURL=key.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/mail.js"
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/mail.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Mail)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("mail", __iconNode);


//# sourceMappingURL=mail.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/message-square.js"
/*!********************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/message-square.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ MessageSquare)
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
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
];
const MessageSquare = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("message-square", __iconNode);


//# sourceMappingURL=message-square.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/pen.js"
/*!*********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/pen.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Pen)
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("pen", __iconNode);


//# sourceMappingURL=pen.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/percent.js"
/*!*************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/percent.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Percent)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
const Percent = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("percent", __iconNode);


//# sourceMappingURL=percent.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/plug.js"
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/plug.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Plug)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M12 22v-5", key: "1ega77" }],
  ["path", { d: "M9 8V2", key: "14iosj" }],
  ["path", { d: "M15 8V2", key: "18g5xt" }],
  ["path", { d: "M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z", key: "osxo6l" }]
];
const Plug = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("plug", __iconNode);


//# sourceMappingURL=plug.js.map


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

/***/ "./node_modules/lucide-react/dist/esm/icons/rotate-ccw.js"
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/rotate-ccw.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ RotateCcw)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("rotate-ccw", __iconNode);


//# sourceMappingURL=rotate-ccw.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/save.js"
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/save.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Save)
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("save", __iconNode);


//# sourceMappingURL=save.js.map


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

/***/ "./node_modules/lucide-react/dist/esm/icons/send.js"
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/send.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Send)
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("send", __iconNode);


//# sourceMappingURL=send.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/toggle-left.js"
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/toggle-left.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ToggleLeft)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleLeft = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("toggle-left", __iconNode);


//# sourceMappingURL=toggle-left.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/toggle-right.js"
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/toggle-right.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ToggleRight)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["circle", { cx: "15", cy: "12", r: "3", key: "1afu0r" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleRight = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("toggle-right", __iconNode);


//# sourceMappingURL=toggle-right.js.map


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


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/upload.js"
/*!************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/upload.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Upload)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("upload", __iconNode);


//# sourceMappingURL=upload.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/video.js"
/*!***********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/video.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Video)
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
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("video", __iconNode);


//# sourceMappingURL=video.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/zap.js"
/*!*********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/zap.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Zap)
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("zap", __iconNode);


//# sourceMappingURL=zap.js.map


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX1NldHRpbmdzX3RzeC5qcz9pZD0yY2I0Yzg4NDI2Y2U0ZTdhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBQ0EsdUtBQUFBLENBQUEsRUFBQUMsQ0FBQSxFQUFBQyxDQUFBLHdCQUFBQyxNQUFBLEdBQUFBLE1BQUEsT0FBQUMsQ0FBQSxHQUFBRixDQUFBLENBQUFHLFFBQUEsa0JBQUFDLENBQUEsR0FBQUosQ0FBQSxDQUFBSyxXQUFBLDhCQUFBQyxFQUFBTixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLFFBQUFDLENBQUEsR0FBQUwsQ0FBQSxJQUFBQSxDQUFBLENBQUFNLFNBQUEsWUFBQUMsU0FBQSxHQUFBUCxDQUFBLEdBQUFPLFNBQUEsRUFBQUMsQ0FBQSxHQUFBQyxNQUFBLENBQUFDLE1BQUEsQ0FBQUwsQ0FBQSxDQUFBQyxTQUFBLFVBQUFLLG1CQUFBLENBQUFILENBQUEsdUJBQUFWLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLFFBQUFFLENBQUEsRUFBQUMsQ0FBQSxFQUFBRyxDQUFBLEVBQUFJLENBQUEsTUFBQUMsQ0FBQSxHQUFBWCxDQUFBLFFBQUFZLENBQUEsT0FBQUMsQ0FBQSxLQUFBRixDQUFBLEtBQUFiLENBQUEsS0FBQWdCLENBQUEsRUFBQXBCLENBQUEsRUFBQXFCLENBQUEsRUFBQUMsQ0FBQSxFQUFBTixDQUFBLEVBQUFNLENBQUEsQ0FBQUMsSUFBQSxDQUFBdkIsQ0FBQSxNQUFBc0IsQ0FBQSxXQUFBQSxFQUFBckIsQ0FBQSxFQUFBQyxDQUFBLFdBQUFNLENBQUEsR0FBQVAsQ0FBQSxFQUFBUSxDQUFBLE1BQUFHLENBQUEsR0FBQVosQ0FBQSxFQUFBbUIsQ0FBQSxDQUFBZixDQUFBLEdBQUFGLENBQUEsRUFBQW1CLENBQUEsZ0JBQUFDLEVBQUFwQixDQUFBLEVBQUFFLENBQUEsU0FBQUssQ0FBQSxHQUFBUCxD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Q0E7O0FBRXNEOztBQUV0RDtBQUNBLGFBQWEsOEJBQThCO0FBQzNDLGFBQWEsOEJBQThCO0FBQzNDLGFBQWEsOERBQThEO0FBQzNFLGFBQWEsNkJBQTZCO0FBQzFDLGFBQWEsNERBQTREO0FBQ3pFO0FBQ0EsZUFBZSxnRUFBZ0I7O0FBRVU7QUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFc0Q7O0FBRXREO0FBQ0EsYUFBYSwrQkFBK0I7QUFDNUMsYUFBYSw0Q0FBNEM7QUFDekQ7QUFDQSxtQkFBbUIsZ0VBQWdCOztBQUVVO0FBQzdDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXNEOztBQUV0RDtBQUNBLGFBQWEsOEJBQThCO0FBQzNDLGFBQWEsbUNBQW1DO0FBQ2hELGFBQWEsK0RBQStEO0FBQzVFO0FBQ0EsZUFBZSxnRUFBZ0I7O0FBRVU7QUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLG1FQUFtRTtBQUNoRjtBQUNBLGNBQWMsZ0VBQWdCOztBQUVVO0FBQ3hDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGdFQUFnQjs7QUFFVTtBQUN0QyIsInNvdXJjZXMiOlsid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2FkbWluL0ZlYXR1cmVGbGFnQWRtaW5QYW5lbC50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdWkvYmFkZ2UudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3VpL2lucHV0LnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9zZWxlY3QudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9wYWdlcy9TZXR0aW5ncy50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9hcmNoaXZlLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvYnVpbGRpbmctMi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2NoZWNrLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvY2lyY2xlLXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9jbG9jay5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2NyZWRpdC1jYXJkLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvZGF0YWJhc2UuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9kb3dubG9hZC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2V5ZS1vZmYuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9leWUuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9oYXJkLWRyaXZlLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMva2V5LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvbWFpbC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL21lc3NhZ2Utc3F1YXJlLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvcGVuLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvcGVyY2VudC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3BsdWcuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9wbHVzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvcm90YXRlLWNjdy5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3NhdmUuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9zZW5kLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvdG9nZ2xlLWxlZnQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy90b2dnbGUtcmlnaHQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy90cmFzaC0yLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvdHJlbmRpbmctdXAuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy91cGxvYWQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy92aWRlby5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3phcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cywgRnJhZ21lbnQgYXMgX0ZyYWdtZW50IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2V0dGluZ3MsIFRvZ2dsZUxlZnQsIFRvZ2dsZVJpZ2h0LCBVc2VycywgUGVyY2VudCwgRXllLCBFeWVPZmYsIFNhdmUsIFJlZnJlc2hDdywgQWxlcnRDaXJjbGUsIENoZWNrQ2lyY2xlLCBJbmZvLCBUcmVuZGluZ1VwLCBTaGllbGQsIFphcCwgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uL3VpL2NhcmQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vdWkvYnV0dG9uJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi4vdWkvaW5wdXQnO1xuaW1wb3J0IHsgdXNlVG9hc3QgfSBmcm9tICcuLi8uLi9jb250ZXh0cy9Ub2FzdENvbnRleHQnO1xuaW1wb3J0IHsgQmFkZ2UgfSBmcm9tICcuLi91aS9iYWRnZSc7XG4vKipcbiAqIEZlYXR1cmUgRmxhZyBBZG1pbiBQYW5lbCBDb21wb25lbnRcbiAqXG4gKiBDb21wcmVoZW5zaXZlIGFkbWluIGludGVyZmFjZSBmb3IgbWFuYWdpbmcgZmVhdHVyZSBmbGFncy5cbiAqXG4gKiBGZWF0dXJlczpcbiAqIC0gRW5hYmxlL2Rpc2FibGUgbWFzdGVyIHN3aXRjaFxuICogLSBNYW5hZ2UgYmV0YSB1c2VyIGxpc3RcbiAqIC0gQ29udHJvbCByb2xsb3V0IHBlcmNlbnRhZ2VcbiAqIC0gVG9nZ2xlIHBlci1wYWdlIGZsYWdzXG4gKiAtIFZpZXcgc3RhdGlzdGljcyBkYXNoYm9hcmRcbiAqIC0gVXNlci1sZXZlbCBvdmVycmlkZXMgZm9yIHRlc3RpbmdcbiAqXG4gKiBEZXNpZ24gUmVmZXJlbmNlOiBNaWdyYXRpb24gU3RyYXRlZ3kgc2VjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gRmVhdHVyZUZsYWdBZG1pblBhbmVsKCkge1xuICAgIGNvbnN0IHsgc2hvd1RvYXN0IH0gPSB1c2VUb2FzdCgpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2NvbmZpZywgc2V0Q29uZmlnXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFt1c2Vycywgc2V0VXNlcnNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtzZWxlY3RlZEJldGFVc2Vycywgc2V0U2VsZWN0ZWRCZXRhVXNlcnNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtyb2xsb3V0UGVyY2VudGFnZSwgc2V0Um9sbG91dFBlcmNlbnRhZ2VdID0gdXNlU3RhdGUoMCk7XG4gICAgY29uc3QgW21hc3RlckVuYWJsZWQsIHNldE1hc3RlckVuYWJsZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtwYWdlRmxhZ3MsIHNldFBhZ2VGbGFnc10gPSB1c2VTdGF0ZSh7fSk7XG4gICAgY29uc3QgW3Nob3dVc2VyU2VsZWN0b3IsIHNldFNob3dVc2VyU2VsZWN0b3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGxvYWRDb25maWcoKTtcbiAgICAgICAgbG9hZFVzZXJzKCk7XG4gICAgfSwgW10pO1xuICAgIGNvbnN0IGxvYWRDb25maWcgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2ZlYXR1cmUtZmxhZ3MvYWRtaW4nLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKX1gLFxuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGZlYXR1cmUgZmxhZyBjb25maWd1cmF0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBzZXRDb25maWcocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldE1hc3RlckVuYWJsZWQocmVzdWx0LmRhdGEuZW5hYmxlZCk7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRCZXRhVXNlcnMocmVzdWx0LmRhdGEuYmV0YV91c2Vycyk7XG4gICAgICAgICAgICAgICAgc2V0Um9sbG91dFBlcmNlbnRhZ2UocmVzdWx0LmRhdGEucm9sbG91dF9wZXJjZW50YWdlKTtcbiAgICAgICAgICAgICAgICBzZXRQYWdlRmxhZ3MocmVzdWx0LmRhdGEucGFnZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gbG9hZCBmZWF0dXJlIGZsYWcgY29uZmlndXJhdGlvbicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBjb25maWc6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGxvYWRVc2VycyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvZmVhdHVyZS1mbGFncy9hZG1pbi91c2VycycsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpfWAsXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgdXNlcnMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHNldFVzZXJzKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgdXNlcnM6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBzYXZlQ29uZmlnID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRTYXZpbmcodHJ1ZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2ZlYXR1cmUtZmxhZ3MvYWRtaW4nLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpfWAsXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IG1hc3RlckVuYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgIGJldGFfdXNlcnM6IHNlbGVjdGVkQmV0YVVzZXJzLFxuICAgICAgICAgICAgICAgICAgICByb2xsb3V0X3BlcmNlbnRhZ2U6IHJvbGxvdXRQZXJjZW50YWdlLFxuICAgICAgICAgICAgICAgICAgICBwYWdlczogcGFnZUZsYWdzLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gc2F2ZSBmZWF0dXJlIGZsYWcgY29uZmlndXJhdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ0ZlYXR1cmUgZmxhZ3MgdXBkYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBsb2FkQ29uZmlnKCk7IC8vIFJlbG9hZCB0byBnZXQgdXBkYXRlZCBzdGF0c1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSBjb25maWd1cmF0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIHNhdmUgZmVhdHVyZSBmbGFncycpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIGNvbmZpZzonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRTYXZpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCB0b2dnbGVCZXRhVXNlciA9ICh1c2VySWQpID0+IHtcbiAgICAgICAgc2V0U2VsZWN0ZWRCZXRhVXNlcnMoKHByZXYpID0+IHByZXYuaW5jbHVkZXModXNlcklkKVxuICAgICAgICAgICAgPyBwcmV2LmZpbHRlcigoaWQpID0+IGlkICE9PSB1c2VySWQpXG4gICAgICAgICAgICA6IFsuLi5wcmV2LCB1c2VySWRdKTtcbiAgICB9O1xuICAgIGNvbnN0IHRvZ2dsZVBhZ2VGbGFnID0gKHBhZ2UpID0+IHtcbiAgICAgICAgc2V0UGFnZUZsYWdzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIFtwYWdlXTogIXByZXZbcGFnZV0sXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIGNvbnN0IGZpbHRlcmVkVXNlcnMgPSB1c2Vycy5maWx0ZXIoKHVzZXIpID0+IHVzZXIubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFN0cmluZyhzZWFyY2hRdWVyeSkudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgdXNlci5lbWFpbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFN0cmluZyhzZWFyY2hRdWVyeSkudG9Mb3dlckNhc2UoKSkpO1xuICAgIGlmIChsb2FkaW5nKSB7XG4gICAgICAgIHJldHVybiAoX2pzeChDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHktMTJcIiwgY2hpbGRyZW46IF9qc3goUmVmcmVzaEN3LCB7IGNsYXNzTmFtZTogXCJ3LTggaC04IHRleHQtcHJpbWFyeS02MDAgYW5pbWF0ZS1zcGluXCIgfSkgfSkgfSkpO1xuICAgIH1cbiAgICBpZiAoIWNvbmZpZykge1xuICAgICAgICByZXR1cm4gKF9qc3goQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LWVycm9yLTYwMFwiLCBjaGlsZHJlbjogW19qc3goQWxlcnRDaXJjbGUsIHsgY2xhc3NOYW1lOiBcInctNiBoLTZcIiB9KSwgX2pzeChcInBcIiwgeyBjaGlsZHJlbjogXCJGYWlsZWQgdG8gbG9hZCBmZWF0dXJlIGZsYWcgY29uZmlndXJhdGlvblwiIH0pXSB9KSB9KSk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJGZWF0dXJlIEZsYWcgTWFuYWdlbWVudFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJDb250cm9sIHRoZSByb2xsb3V0IG9mIHRoZSBNb2Rlcm4gVUkvVVggcmVkZXNpZ25cIiB9KV0gfSksIF9qc3goQnV0dG9uLCB7IG9uQ2xpY2s6IHNhdmVDb25maWcsIGRpc2FibGVkOiBzYXZpbmcsIGljb246IHNhdmluZyA/IF9qc3goUmVmcmVzaEN3LCB7IGNsYXNzTmFtZTogXCJhbmltYXRlLXNwaW5cIiB9KSA6IF9qc3goU2F2ZSwge30pLCBjaGlsZHJlbjogc2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSBDaGFuZ2VzJyB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4KENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNFwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtMiBiZy1wcmltYXJ5LTEwMCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBfanN4KFVzZXJzLCB7IGNsYXNzTmFtZTogXCJ3LTUgaC01IHRleHQtcHJpbWFyeS02MDBcIiB9KSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJUb3RhbCBVc2Vyc1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogY29uZmlnLnN0YXRzLnRvdGFsX3VzZXJzIH0pXSB9KV0gfSkgfSksIF9qc3goQ2FyZCwgeyBjbGFzc05hbWU6IFwicC00XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicC0yIGJnLXN1Y2Nlc3MtMTAwIHJvdW5kZWQtbGdcIiwgY2hpbGRyZW46IF9qc3goU2hpZWxkLCB7IGNsYXNzTmFtZTogXCJ3LTUgaC01IHRleHQtc3VjY2Vzcy02MDBcIiB9KSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJCZXRhIFVzZXJzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBjb25maWcuc3RhdHMuYmV0YV91c2Vyc19jb3VudCB9KV0gfSldIH0pIH0pLCBfanN4KENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNFwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtMiBiZy1pbmZvLTEwMCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBfanN4KFRyZW5kaW5nVXAsIHsgY2xhc3NOYW1lOiBcInctNSBoLTUgdGV4dC1pbmZvLTYwMFwiIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIlJvbGxvdXQgVXNlcnNcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IGNvbmZpZy5zdGF0cy5yb2xsb3V0X3VzZXJzX2NvdW50IH0pXSB9KV0gfSkgfSksIF9qc3goQ2FyZCwgeyBjbGFzc05hbWU6IFwicC00XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicC0yIGJnLXdhcm5pbmctMTAwIHJvdW5kZWQtbGdcIiwgY2hpbGRyZW46IF9qc3goWmFwLCB7IGNsYXNzTmFtZTogXCJ3LTUgaC01IHRleHQtd2FybmluZy02MDBcIiB9KSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJUb3RhbCBFbmFibGVkXCIgfSksIF9qc3hzKFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogW2NvbmZpZy5zdGF0cy50b3RhbF9lbmFibGVkX3VzZXJzLCBfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwIG1sLTFcIiwgY2hpbGRyZW46IFtcIihcIiwgY29uZmlnLnN0YXRzLnBlcmNlbnRhZ2VfZW5hYmxlZCwgXCIlKVwiXSB9KV0gfSldIH0pXSB9KSB9KV0gfSksIF9qc3hzKENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTIgYmctcHJpbWFyeS0xMDAgcm91bmRlZC1sZ1wiLCBjaGlsZHJlbjogX2pzeChTZXR0aW5ncywgeyBjbGFzc05hbWU6IFwidy01IGgtNSB0ZXh0LXByaW1hcnktNjAwXCIgfSkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFwiTWFzdGVyIFN3aXRjaFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiRW5hYmxlIG9yIGRpc2FibGUgTW9kZXJuIFVJIGdsb2JhbGx5XCIgfSldIH0pXSB9KSwgX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHNldE1hc3RlckVuYWJsZWQoIW1hc3RlckVuYWJsZWQpLCBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1jb2xvcnNcIiwgY2hpbGRyZW46IG1hc3RlckVuYWJsZWQgPyAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbX2pzeChUb2dnbGVSaWdodCwgeyBjbGFzc05hbWU6IFwidy0xMCBoLTEwIHRleHQtc3VjY2Vzcy02MDBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXN1Y2Nlc3MtNjAwXCIsIGNoaWxkcmVuOiBcIkVuYWJsZWRcIiB9KV0gfSkpIDogKF9qc3hzKF9GcmFnbWVudCwgeyBjaGlsZHJlbjogW19qc3goVG9nZ2xlTGVmdCwgeyBjbGFzc05hbWU6IFwidy0xMCBoLTEwIHRleHQtbmV1dHJhbC00MDBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIkRpc2FibGVkXCIgfSldIH0pKSB9KV0gfSksICFtYXN0ZXJFbmFibGVkICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm10LTQgcC0zIGJnLXdhcm5pbmctNTAgYm9yZGVyIGJvcmRlci13YXJuaW5nLTIwMCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChBbGVydENpcmNsZSwgeyBjbGFzc05hbWU6IFwidy00IGgtNCB0ZXh0LXdhcm5pbmctNjAwIG10LTAuNSBmbGV4LXNocmluay0wXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC13YXJuaW5nLTkwMFwiLCBjaGlsZHJlbjogXCJNb2Rlcm4gVUkgaXMgY3VycmVudGx5IGRpc2FibGVkIGZvciBhbGwgdXNlcnMuIEVuYWJsZSB0aGUgbWFzdGVyIHN3aXRjaCB0byBzdGFydCB0aGUgcm9sbG91dC5cIiB9KV0gfSkgfSkpXSB9KSwgX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicC0yIGJnLXN1Y2Nlc3MtMTAwIHJvdW5kZWQtbGdcIiwgY2hpbGRyZW46IF9qc3goVXNlcnMsIHsgY2xhc3NOYW1lOiBcInctNSBoLTUgdGV4dC1zdWNjZXNzLTYwMFwiIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkJldGEgVXNlcnNcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIlNlbGVjdCBzcGVjaWZpYyB1c2VycyBmb3IgYmV0YSB0ZXN0aW5nXCIgfSldIH0pXSB9KSwgX2pzeHMoQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IHNldFNob3dVc2VyU2VsZWN0b3IoIXNob3dVc2VyU2VsZWN0b3IpLCBpY29uOiBzaG93VXNlclNlbGVjdG9yID8gX2pzeChFeWVPZmYsIHt9KSA6IF9qc3goRXllLCB7fSksIGNoaWxkcmVuOiBbc2hvd1VzZXJTZWxlY3RvciA/ICdIaWRlJyA6ICdTaG93JywgXCIgVXNlcnNcIl0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi0zXCIsIGNoaWxkcmVuOiBbX2pzeHMoQmFkZ2UsIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIGNoaWxkcmVuOiBbc2VsZWN0ZWRCZXRhVXNlcnMubGVuZ3RoLCBcIiB1c2VyXCIsIHNlbGVjdGVkQmV0YVVzZXJzLmxlbmd0aCAhPT0gMSA/ICdzJyA6ICcnLCBcIiBzZWxlY3RlZFwiXSB9KSwgc2VsZWN0ZWRCZXRhVXNlcnMubGVuZ3RoID4gMCAmJiAoX2pzeChCdXR0b24sIHsgdmFyaWFudDogXCJnaG9zdFwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IHNldFNlbGVjdGVkQmV0YVVzZXJzKFtdKSwgY2hpbGRyZW46IFwiQ2xlYXIgQWxsXCIgfSkpXSB9KSwgc2hvd1VzZXJTZWxlY3RvciAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS0zXCIsIGNoaWxkcmVuOiBbX2pzeChJbnB1dCwgeyB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiU2VhcmNoIHVzZXJzIGJ5IG5hbWUgb3IgZW1haWwuLi5cIiwgdmFsdWU6IHNlYXJjaFF1ZXJ5LCBvbkNoYW5nZTogKHZhbHVlKSA9PiBzZXRTZWFyY2hRdWVyeShTdHJpbmcodmFsdWUpKSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtYXgtaC02NCBvdmVyZmxvdy15LWF1dG8gYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBmaWx0ZXJlZFVzZXJzLmxlbmd0aCA9PT0gMCA/IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtNCB0ZXh0LWNlbnRlciB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIk5vIHVzZXJzIGZvdW5kXCIgfSkpIDogKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZGl2aWRlLXkgZGl2aWRlLW5ldXRyYWwtMjAwXCIsIGNoaWxkcmVuOiBmaWx0ZXJlZFVzZXJzLm1hcCgodXNlcikgPT4gKF9qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcC0zIGhvdmVyOmJnLW5ldXRyYWwtNTAgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNoZWNrZWQ6IHNlbGVjdGVkQmV0YVVzZXJzLmluY2x1ZGVzKHVzZXIuaWQpLCBvbkNoYW5nZTogKCkgPT4gdG9nZ2xlQmV0YVVzZXIodXNlci5pZCksIGNsYXNzTmFtZTogXCJ3LTQgaC00IHRleHQtcHJpbWFyeS02MDAgYm9yZGVyLW5ldXRyYWwtMzAwIHJvdW5kZWQgZm9jdXM6cmluZy1wcmltYXJ5LTUwMFwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTFcIiwgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IHVzZXIubmFtZSB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiB1c2VyLmVtYWlsIH0pXSB9KSwgc2VsZWN0ZWRCZXRhVXNlcnMuaW5jbHVkZXModXNlci5pZCkgJiYgKF9qc3goQ2hlY2tDaXJjbGUsIHsgY2xhc3NOYW1lOiBcInctNCBoLTQgdGV4dC1zdWNjZXNzLTYwMFwiIH0pKV0gfSwgdXNlci5pZCkpKSB9KSkgfSldIH0pKSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtdC00IHAtMyBiZy1pbmZvLTUwIGJvcmRlciBib3JkZXItaW5mby0yMDAgcm91bmRlZC1sZ1wiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goSW5mbywgeyBjbGFzc05hbWU6IFwidy00IGgtNCB0ZXh0LWluZm8tNjAwIG10LTAuNSBmbGV4LXNocmluay0wXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1pbmZvLTkwMFwiLCBjaGlsZHJlbjogXCJCZXRhIHVzZXJzIHdpbGwgYWx3YXlzIHNlZSB0aGUgTW9kZXJuIFVJIHdoZW4gdGhlIG1hc3RlciBzd2l0Y2ggaXMgZW5hYmxlZCwgcmVnYXJkbGVzcyBvZiB0aGUgcm9sbG91dCBwZXJjZW50YWdlLlwiIH0pXSB9KSB9KV0gfSksIF9qc3hzKENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIG1iLTRcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtMiBiZy1pbmZvLTEwMCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBfanN4KFBlcmNlbnQsIHsgY2xhc3NOYW1lOiBcInctNSBoLTUgdGV4dC1pbmZvLTYwMFwiIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIlJvbGxvdXQgUGVyY2VudGFnZVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiR3JhZHVhbGx5IHJvbGwgb3V0IHRvIGEgcGVyY2VudGFnZSBvZiB1c2Vyc1wiIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMlwiLCBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwXCIsIGNoaWxkcmVuOiBbXCJQZXJjZW50YWdlOiBcIiwgcm9sbG91dFBlcmNlbnRhZ2UsIFwiJVwiXSB9KSwgX2pzeChCYWRnZSwgeyB2YXJpYW50OiByb2xsb3V0UGVyY2VudGFnZSA9PT0gMCA/ICduZXV0cmFsJyA6ICdwcmltYXJ5JywgY2hpbGRyZW46IHJvbGxvdXRQZXJjZW50YWdlID09PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnTm8gcm9sbG91dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHJvbGxvdXRQZXJjZW50YWdlID09PSAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnRnVsbCByb2xsb3V0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGAke3JvbGxvdXRQZXJjZW50YWdlfSUgcm9sbG91dGAgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcInJhbmdlXCIsIG1pbjogXCIwXCIsIG1heDogXCIxMDBcIiwgc3RlcDogXCI1XCIsIHZhbHVlOiByb2xsb3V0UGVyY2VudGFnZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRSb2xsb3V0UGVyY2VudGFnZShOdW1iZXIoZS50YXJnZXQudmFsdWUpKSwgY2xhc3NOYW1lOiBcInctZnVsbCBoLTIgYmctbmV1dHJhbC0yMDAgcm91bmRlZC1sZyBhcHBlYXJhbmNlLW5vbmUgY3Vyc29yLXBvaW50ZXIgYWNjZW50LXByaW1hcnktNjAwXCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1uZXV0cmFsLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogXCIwJVwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBcIjI1JVwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBcIjUwJVwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBcIjc1JVwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBcIjEwMCVcIiB9KV0gfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtMyBiZy13YXJuaW5nLTUwIGJvcmRlciBib3JkZXItd2FybmluZy0yMDAgcm91bmRlZC1sZ1wiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goQWxlcnRDaXJjbGUsIHsgY2xhc3NOYW1lOiBcInctNCBoLTQgdGV4dC13YXJuaW5nLTYwMCBtdC0wLjUgZmxleC1zaHJpbmstMFwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtd2FybmluZy05MDBcIiwgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJmb250LW1lZGl1bSBtYi0xXCIsIGNoaWxkcmVuOiBcIlJvbGxvdXQgU3RyYXRlZ3lcIiB9KSwgX2pzeChcInBcIiwgeyBjaGlsZHJlbjogXCJVc2VycyBhcmUgc2VsZWN0ZWQgZGV0ZXJtaW5pc3RpY2FsbHkgYmFzZWQgb24gdGhlaXIgdXNlciBJRC4gVGhlIHNhbWUgdXNlcnMgd2lsbCBhbHdheXMgc2VlIHRoZSBNb2Rlcm4gVUkgYXQgYSBnaXZlbiBwZXJjZW50YWdlLiBCZXRhIHVzZXJzIGFyZSBleGNsdWRlZCBmcm9tIHRoaXMgY2FsY3VsYXRpb24uXCIgfSldIH0pXSB9KSB9KV0gfSldIH0pLCBfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBtYi00XCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTIgYmctd2FybmluZy0xMDAgcm91bmRlZC1sZ1wiLCBjaGlsZHJlbjogX2pzeChTZXR0aW5ncywgeyBjbGFzc05hbWU6IFwidy01IGgtNSB0ZXh0LXdhcm5pbmctNjAwXCIgfSkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFwiUGFnZS1TcGVjaWZpYyBGbGFnc1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiQ29udHJvbCBNb2Rlcm4gVUkgZm9yIGluZGl2aWR1YWwgcGFnZXNcIiB9KV0gfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTNcIiwgY2hpbGRyZW46IE9iamVjdC5lbnRyaWVzKHBhZ2VGbGFncykubWFwKChbcGFnZSwgZW5hYmxlZF0pID0+IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLW5ldXRyYWwtNTAgcm91bmRlZC1sZyBob3ZlcjpiZy1uZXV0cmFsLTEwMCB0cmFuc2l0aW9uLWNvbG9yc1wiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMCBjYXBpdGFsaXplXCIsIGNoaWxkcmVuOiBwYWdlLnJlcGxhY2UoL18vZywgJyAnKSB9KSwgX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHRvZ2dsZVBhZ2VGbGFnKHBhZ2UpLCBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgZGlzYWJsZWQ6ICFtYXN0ZXJFbmFibGVkLCBjaGlsZHJlbjogZW5hYmxlZCA/IChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4KFRvZ2dsZVJpZ2h0LCB7IGNsYXNzTmFtZTogXCJ3LTggaC04IHRleHQtc3VjY2Vzcy02MDBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXN1Y2Nlc3MtNjAwXCIsIGNoaWxkcmVuOiBcIk9uXCIgfSldIH0pKSA6IChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4KFRvZ2dsZUxlZnQsIHsgY2xhc3NOYW1lOiBcInctOCBoLTggdGV4dC1uZXV0cmFsLTQwMFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiT2ZmXCIgfSldIH0pKSB9KV0gfSwgcGFnZSkpKSB9KSwgIW1hc3RlckVuYWJsZWQgJiYgKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibXQtNCBwLTMgYmctbmV1dHJhbC0xMDAgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiUGFnZS1zcGVjaWZpYyBmbGFncyBhcmUgb25seSBhY3RpdmUgd2hlbiB0aGUgbWFzdGVyIHN3aXRjaCBpcyBlbmFibGVkLlwiIH0pIH0pKV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWVuZFwiLCBjaGlsZHJlbjogX2pzeChCdXR0b24sIHsgb25DbGljazogc2F2ZUNvbmZpZywgZGlzYWJsZWQ6IHNhdmluZywgc2l6ZTogXCJsZ1wiLCBpY29uOiBzYXZpbmcgPyBfanN4KFJlZnJlc2hDdywgeyBjbGFzc05hbWU6IFwiYW5pbWF0ZS1zcGluXCIgfSkgOiBfanN4KFNhdmUsIHt9KSwgY2hpbGRyZW46IHNhdmluZyA/ICdTYXZpbmcgQ2hhbmdlcy4uLicgOiAnU2F2ZSBBbGwgQ2hhbmdlcycgfSkgfSldIH0pKTtcbn1cbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGN2YSB9IGZyb20gXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIjtcbmltcG9ydCB7IGNuIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlsc1wiO1xuY29uc3QgYmFkZ2VWYXJpYW50cyA9IGN2YShcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctb2Zmc2V0LTJcIiwge1xuICAgIHZhcmlhbnRzOiB7XG4gICAgICAgIHZhcmlhbnQ6IHtcbiAgICAgICAgICAgIHByaW1hcnk6IFwiYmctcHJpbWFyeS0xMDAgdGV4dC1wcmltYXJ5LTcwMCBib3JkZXItcHJpbWFyeS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5LTUwMFwiLFxuICAgICAgICAgICAgc3VjY2VzczogXCJiZy1zdWNjZXNzLWxpZ2h0IHRleHQtc3VjY2Vzcy1kYXJrIGJvcmRlci1zdWNjZXNzLURFRkFVTFQgZm9jdXM6cmluZy1zdWNjZXNzLURFRkFVTFRcIixcbiAgICAgICAgICAgIHdhcm5pbmc6IFwiYmctd2FybmluZy1saWdodCB0ZXh0LXdhcm5pbmctZGFyayBib3JkZXItd2FybmluZy1ERUZBVUxUIGZvY3VzOnJpbmctd2FybmluZy1ERUZBVUxUXCIsXG4gICAgICAgICAgICBlcnJvcjogXCJiZy1lcnJvci1saWdodCB0ZXh0LWVycm9yLWRhcmsgYm9yZGVyLWVycm9yLURFRkFVTFQgZm9jdXM6cmluZy1lcnJvci1ERUZBVUxUXCIsXG4gICAgICAgICAgICBkYW5nZXI6IFwiYmctZXJyb3ItbGlnaHQgdGV4dC1lcnJvci1kYXJrIGJvcmRlci1lcnJvci1ERUZBVUxUIGZvY3VzOnJpbmctZXJyb3ItREVGQVVMVFwiLFxuICAgICAgICAgICAgbmV1dHJhbDogXCJiZy1uZXV0cmFsLTEwMCB0ZXh0LW5ldXRyYWwtNzAwIGJvcmRlci1uZXV0cmFsLTMwMCBmb2N1czpyaW5nLW5ldXRyYWwtNTAwXCIsXG4gICAgICAgICAgICBvdXRsaW5lOiBcImJnLXRyYW5zcGFyZW50IHRleHQtbmV1dHJhbC03MDAgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTMwMCBmb2N1czpyaW5nLW5ldXRyYWwtNTAwXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIHNtOiBcImgtNSBweC0yIHRleHQteHMgZ2FwLTFcIixcbiAgICAgICAgICAgIG1kOiBcImgtNiBweC0yLjUgdGV4dC1zbSBnYXAtMS41XCIsXG4gICAgICAgICAgICBsZzogXCJoLTcgcHgtMyB0ZXh0LWJhc2UgZ2FwLTJcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHJvdW5kZWQ6IFwicm91bmRlZC1tZFwiLFxuICAgICAgICAgICAgcGlsbDogXCJyb3VuZGVkLWZ1bGxcIixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGRlZmF1bHRWYXJpYW50czoge1xuICAgICAgICB2YXJpYW50OiBcIm5ldXRyYWxcIixcbiAgICAgICAgc2l6ZTogXCJtZFwiLFxuICAgICAgICBzaGFwZTogXCJyb3VuZGVkXCIsXG4gICAgfSxcbn0pO1xuY29uc3QgQmFkZ2UgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgdmFyaWFudCwgc2l6ZSwgc2hhcGUsIGljb24sIGNoaWxkcmVuLCAuLi5wcm9wcyB9LCByZWYpID0+IHtcbiAgICByZXR1cm4gKF9qc3hzKFwic3BhblwiLCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKGJhZGdlVmFyaWFudHMoeyB2YXJpYW50LCBzaXplLCBzaGFwZSB9KSwgY2xhc3NOYW1lKSwgLi4ucHJvcHMsIGNoaWxkcmVuOiBbaWNvbiAmJiAoX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyXCIsIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsIGNoaWxkcmVuOiBpY29uIH0pKSwgY2hpbGRyZW5dIH0pKTtcbn0pO1xuQmFkZ2UuZGlzcGxheU5hbWUgPSBcIkJhZGdlXCI7XG5leHBvcnQgeyBCYWRnZSwgYmFkZ2VWYXJpYW50cyB9O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3ZhIH0gZnJvbSBcImNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eVwiO1xuaW1wb3J0IHsgY24gfSBmcm9tIFwiLi4vLi4vbGliL3V0aWxzXCI7XG5jb25zdCBpbnB1dFZhcmlhbnRzID0gY3ZhKFwiYmxvY2sgdy1mdWxsIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctb2Zmc2V0LTBcIiwge1xuICAgIHZhcmlhbnRzOiB7XG4gICAgICAgIHZhcmlhbnQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiYm9yZGVyLW5ldXRyYWwtMzAwIGJnLXdoaXRlIHRleHQtbmV1dHJhbC05MDAgcGxhY2Vob2xkZXItbmV1dHJhbC00MDAgZm9jdXM6Ym9yZGVyLXByaW1hcnktNTAwIGZvY3VzOnJpbmctcHJpbWFyeS01MDBcIixcbiAgICAgICAgICAgIGVycm9yOiBcImJvcmRlci1lcnJvci01MDAgYmctZXJyb3ItNTAgdGV4dC1lcnJvci05MDAgcGxhY2Vob2xkZXItZXJyb3ItNDAwIGZvY3VzOmJvcmRlci1lcnJvci01MDAgZm9jdXM6cmluZy1lcnJvci01MDBcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgICAgc206IFwicHgtMyBweS0xLjUgdGV4dC1zbSBoLThcIixcbiAgICAgICAgICAgIG1kOiBcInB4LTQgcHktMiB0ZXh0LWJhc2UgaC0xMCBtaW4taC1bNDRweF1cIiwgLy8gTWluaW11bSA0NHB4IGZvciB0b3VjaCB0YXJnZXRzIG9uIG1vYmlsZVxuICAgICAgICAgICAgbGc6IFwicHgtNCBweS0zIHRleHQtbGcgaC0xMlwiLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgZGVmYXVsdFZhcmlhbnRzOiB7XG4gICAgICAgIHZhcmlhbnQ6IFwiZGVmYXVsdFwiLFxuICAgICAgICBzaXplOiBcIm1kXCIsXG4gICAgfSxcbn0pO1xuLyoqXG4gKiBHZXQgYXBwcm9wcmlhdGUgaW5wdXRNb2RlIGZvciBtb2JpbGUga2V5Ym9hcmRzIGJhc2VkIG9uIGlucHV0IHR5cGVcbiAqL1xuY29uc3QgZ2V0SW5wdXRNb2RlID0gKHR5cGUpID0+IHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICAgICAgcmV0dXJuICdlbWFpbCc7XG4gICAgICAgIGNhc2UgJ3RlbCc6XG4gICAgICAgICAgICByZXR1cm4gJ3RlbCc7XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICByZXR1cm4gJ251bWVyaWMnO1xuICAgICAgICBjYXNlICd1cmwnOlxuICAgICAgICAgICAgcmV0dXJuICd1cmwnO1xuICAgICAgICBjYXNlICdzZWFyY2gnOlxuICAgICAgICAgICAgcmV0dXJuICdzZWFyY2gnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICd0ZXh0JztcbiAgICB9XG59O1xuY29uc3QgSW5wdXQgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgdHlwZSA9ICd0ZXh0JywgbGFiZWwsIGVycm9yLCBoZWxwZXJUZXh0LCBpY29uLCBpY29uUG9zaXRpb24gPSAnbGVmdCcsIGZ1bGxXaWR0aCA9IHRydWUsIGRpc2FibGVkLCByZXF1aXJlZCwgaWQsIHZhcmlhbnQsIHNpemUsIGlucHV0TW9kZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgaW5wdXRJZCA9IGlkIHx8IGBpbnB1dC0ke1JlYWN0LnVzZUlkKCl9YDtcbiAgICBjb25zdCBlcnJvcklkID0gZXJyb3IgPyBgJHtpbnB1dElkfS1lcnJvcmAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaGVscGVyVGV4dElkID0gaGVscGVyVGV4dCA/IGAke2lucHV0SWR9LWhlbHBlcmAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaGFzRXJyb3IgPSAhIWVycm9yO1xuICAgIGNvbnN0IGN1cnJlbnRWYXJpYW50ID0gaGFzRXJyb3IgPyAnZXJyb3InIDogdmFyaWFudDtcbiAgICAvLyBVc2UgcHJvdmlkZWQgaW5wdXRNb2RlIG9yIGRldGVybWluZSBmcm9tIHR5cGUgZm9yIG1vYmlsZSBrZXlib2FyZCBvcHRpbWl6YXRpb25cbiAgICBjb25zdCBtb2JpbGVJbnB1dE1vZGUgPSBpbnB1dE1vZGUgfHwgZ2V0SW5wdXRNb2RlKHR5cGUpO1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNuKFwic3BhY2UteS0xXCIsIGZ1bGxXaWR0aCAmJiBcInctZnVsbFwiKSwgY2hpbGRyZW46IFtsYWJlbCAmJiAoX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IGlucHV0SWQsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IFtsYWJlbCwgcmVxdWlyZWQgJiYgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1lcnJvci01MDAgbWwtMVwiLCBcImFyaWEtbGFiZWxcIjogXCJyZXF1aXJlZFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pKSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmVcIiwgY2hpbGRyZW46IFtpY29uICYmIGljb25Qb3NpdGlvbiA9PT0gJ2xlZnQnICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImFic29sdXRlIGxlZnQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdGV4dC1uZXV0cmFsLTQwMCBwb2ludGVyLWV2ZW50cy1ub25lXCIsIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsIGNoaWxkcmVuOiBpY29uIH0pKSwgX2pzeChcImlucHV0XCIsIHsgcmVmOiByZWYsIHR5cGU6IHR5cGUsIGlkOiBpbnB1dElkLCBkaXNhYmxlZDogZGlzYWJsZWQsIHJlcXVpcmVkOiByZXF1aXJlZCwgaW5wdXRNb2RlOiBtb2JpbGVJbnB1dE1vZGUsIFwiYXJpYS1pbnZhbGlkXCI6IGhhc0Vycm9yLCBcImFyaWEtZGVzY3JpYmVkYnlcIjogY24oZXJyb3JJZCAmJiBlcnJvcklkLCBoZWxwZXJUZXh0SWQgJiYgaGVscGVyVGV4dElkKSB8fCB1bmRlZmluZWQsIGNsYXNzTmFtZTogY24oaW5wdXRWYXJpYW50cyh7IHZhcmlhbnQ6IGN1cnJlbnRWYXJpYW50LCBzaXplIH0pLCBpY29uICYmIGljb25Qb3NpdGlvbiA9PT0gJ2xlZnQnICYmIFwicGwtMTBcIiwgaWNvbiAmJiBpY29uUG9zaXRpb24gPT09ICdyaWdodCcgJiYgXCJwci0xMFwiLCBkaXNhYmxlZCAmJiBcImJnLW5ldXRyYWwtMTAwIHRleHQtbmV1dHJhbC01MDAgY3Vyc29yLW5vdC1hbGxvd2VkXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pLCBpY29uICYmIGljb25Qb3NpdGlvbiA9PT0gJ3JpZ2h0JyAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJhYnNvbHV0ZSByaWdodC0zIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB0ZXh0LW5ldXRyYWwtNDAwIHBvaW50ZXItZXZlbnRzLW5vbmVcIiwgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIiwgY2hpbGRyZW46IGljb24gfSkpXSB9KSwgZXJyb3IgJiYgKF9qc3goXCJwXCIsIHsgaWQ6IGVycm9ySWQsIGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZXJyb3ItNjAwXCIsIHJvbGU6IFwiYWxlcnRcIiwgY2hpbGRyZW46IGVycm9yIH0pKSwgaGVscGVyVGV4dCAmJiAhZXJyb3IgJiYgKF9qc3goXCJwXCIsIHsgaWQ6IGhlbHBlclRleHRJZCwgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTUwMFwiLCBjaGlsZHJlbjogaGVscGVyVGV4dCB9KSldIH0pKTtcbn0pO1xuSW5wdXQuZGlzcGxheU5hbWUgPSBcIklucHV0XCI7XG5leHBvcnQgeyBJbnB1dCwgaW5wdXRWYXJpYW50cyB9O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3ZhIH0gZnJvbSBcImNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eVwiO1xuaW1wb3J0IHsgQ2hlY2ssIENoZXZyb25Eb3duLCBYLCBTZWFyY2ggfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCIuLi8uLi9saWIvdXRpbHNcIjtcbmNvbnN0IHNlbGVjdFRyaWdnZXJWYXJpYW50cyA9IGN2YShcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB3LWZ1bGwgcm91bmRlZC1sZyBib3JkZXIgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1vZmZzZXQtMCBjdXJzb3ItcG9pbnRlclwiLCB7XG4gICAgdmFyaWFudHM6IHtcbiAgICAgICAgdmFyaWFudDoge1xuICAgICAgICAgICAgZGVmYXVsdDogXCJib3JkZXItbmV1dHJhbC0zMDAgYmctd2hpdGUgdGV4dC1uZXV0cmFsLTkwMCBmb2N1czpib3JkZXItcHJpbWFyeS01MDAgZm9jdXM6cmluZy1wcmltYXJ5LTUwMFwiLFxuICAgICAgICAgICAgZXJyb3I6IFwiYm9yZGVyLWVycm9yLTUwMCBiZy1lcnJvci01MCB0ZXh0LWVycm9yLTkwMCBmb2N1czpib3JkZXItZXJyb3ItNTAwIGZvY3VzOnJpbmctZXJyb3ItNTAwXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIHNtOiBcInB4LTMgcHktMS41IHRleHQtc20gaC04XCIsXG4gICAgICAgICAgICBtZDogXCJweC00IHB5LTIgdGV4dC1iYXNlIGgtMTAgbWluLWgtWzQ0cHhdXCIsIC8vIE1pbmltdW0gNDRweCBmb3IgdG91Y2ggdGFyZ2V0cyBvbiBtb2JpbGVcbiAgICAgICAgICAgIGxnOiBcInB4LTQgcHktMyB0ZXh0LWxnIGgtMTJcIixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGRlZmF1bHRWYXJpYW50czoge1xuICAgICAgICB2YXJpYW50OiBcImRlZmF1bHRcIixcbiAgICAgICAgc2l6ZTogXCJtZFwiLFxuICAgIH0sXG59KTtcbmNvbnN0IFNlbGVjdCA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCBsYWJlbCwgZXJyb3IsIGhlbHBlclRleHQsIG9wdGlvbnMsIHZhbHVlLCBvbkNoYW5nZSwgcGxhY2Vob2xkZXIgPSBcIlNlbGVjdCBhbiBvcHRpb25cIiwgZGlzYWJsZWQgPSBmYWxzZSwgcmVxdWlyZWQgPSBmYWxzZSwgbXVsdGlwbGUgPSBmYWxzZSwgc2VhcmNoYWJsZSA9IGZhbHNlLCBmdWxsV2lkdGggPSB0cnVlLCB2YXJpYW50LCBzaXplLCBpZCwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbc2VhcmNoUXVlcnksIHNldFNlYXJjaFF1ZXJ5XSA9IFJlYWN0LnVzZVN0YXRlKFwiXCIpO1xuICAgIGNvbnN0IFtmb2N1c2VkSW5kZXgsIHNldEZvY3VzZWRJbmRleF0gPSBSZWFjdC51c2VTdGF0ZSgtMSk7XG4gICAgY29uc3QgY29udGFpbmVyUmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IHNlYXJjaElucHV0UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IGRyb3Bkb3duUmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IHNlbGVjdElkID0gaWQgfHwgYHNlbGVjdC0ke1JlYWN0LnVzZUlkKCl9YDtcbiAgICBjb25zdCBlcnJvcklkID0gZXJyb3IgPyBgJHtzZWxlY3RJZH0tZXJyb3JgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGhlbHBlclRleHRJZCA9IGhlbHBlclRleHQgPyBgJHtzZWxlY3RJZH0taGVscGVyYCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBoYXNFcnJvciA9ICEhZXJyb3I7XG4gICAgY29uc3QgY3VycmVudFZhcmlhbnQgPSBoYXNFcnJvciA/ICdlcnJvcicgOiB2YXJpYW50O1xuICAgIC8vIE5vcm1hbGl6ZSB2YWx1ZSB0byBhcnJheSBmb3IgZWFzaWVyIGhhbmRsaW5nXG4gICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSBSZWFjdC51c2VNZW1vKCgpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcbiAgICB9LCBbdmFsdWVdKTtcbiAgICAvLyBGaWx0ZXIgb3B0aW9ucyBiYXNlZCBvbiBzZWFyY2ggcXVlcnlcbiAgICBjb25zdCBmaWx0ZXJlZE9wdGlvbnMgPSBSZWFjdC51c2VNZW1vKCgpID0+IHtcbiAgICAgICAgaWYgKCFzZWFyY2hRdWVyeSlcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi5sYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpKTtcbiAgICB9LCBbb3B0aW9ucywgc2VhcmNoUXVlcnldKTtcbiAgICAvLyBHZXQgZGlzcGxheSB0ZXh0IGZvciBzZWxlY3RlZCB2YWx1ZXNcbiAgICBjb25zdCBkaXNwbGF5VGV4dCA9IFJlYWN0LnVzZU1lbW8oKCkgPT4ge1xuICAgICAgICBpZiAoc2VsZWN0ZWRWYWx1ZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFZhbHVlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gc2VsZWN0ZWRWYWx1ZXNbMF0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb24/LmxhYmVsIHx8IHBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGAke3NlbGVjdGVkVmFsdWVzLmxlbmd0aH0gc2VsZWN0ZWRgO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSBzZWxlY3RlZFZhbHVlc1swXSk7XG4gICAgICAgIHJldHVybiBvcHRpb24/LmxhYmVsIHx8IHBsYWNlaG9sZGVyO1xuICAgIH0sIFtzZWxlY3RlZFZhbHVlcywgb3B0aW9ucywgcGxhY2Vob2xkZXIsIG11bHRpcGxlXSk7XG4gICAgLy8gSGFuZGxlIG9wdGlvbiBzZWxlY3Rpb25cbiAgICBjb25zdCBoYW5kbGVTZWxlY3QgPSAob3B0aW9uVmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgbmV3VmFsdWU7XG4gICAgICAgIGlmIChtdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVmFsdWVzLmluY2x1ZGVzKG9wdGlvblZhbHVlKSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gc2VsZWN0ZWRWYWx1ZXMuZmlsdGVyKHYgPT4gdiAhPT0gb3B0aW9uVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBbLi4uc2VsZWN0ZWRWYWx1ZXMsIG9wdGlvblZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gb3B0aW9uVmFsdWU7XG4gICAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIG9uQ2hhbmdlPy4obmV3VmFsdWUpO1xuICAgICAgICBzZXRTZWFyY2hRdWVyeShcIlwiKTtcbiAgICB9O1xuICAgIC8vIEhhbmRsZSByZW1vdmluZyBhIHNlbGVjdGVkIHZhbHVlIChmb3IgbXVsdGlwbGUgc2VsZWN0KVxuICAgIGNvbnN0IGhhbmRsZVJlbW92ZSA9IChvcHRpb25WYWx1ZSwgZSkgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gc2VsZWN0ZWRWYWx1ZXMuZmlsdGVyKHYgPT4gdiAhPT0gb3B0aW9uVmFsdWUpO1xuICAgICAgICBvbkNoYW5nZT8uKG5ld1ZhbHVlKTtcbiAgICB9O1xuICAgIC8vIEhhbmRsZSBrZXlib2FyZCBuYXZpZ2F0aW9uXG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChlKSA9PiB7XG4gICAgICAgIGlmIChkaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc3dpdGNoIChlLmtleSkge1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmICghaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZm9jdXNlZEluZGV4ID49IDAgJiYgZm9jdXNlZEluZGV4IDwgZmlsdGVyZWRPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3QoZmlsdGVyZWRPcHRpb25zW2ZvY3VzZWRJbmRleF0udmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2V0U2VhcmNoUXVlcnkoXCJcIik7XG4gICAgICAgICAgICAgICAgc2V0Rm9jdXNlZEluZGV4KC0xKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmICghaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEZvY3VzZWRJbmRleChwcmV2ID0+IHByZXYgPCBmaWx0ZXJlZE9wdGlvbnMubGVuZ3RoIC0gMSA/IHByZXYgKyAxIDogcHJldik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Rm9jdXNlZEluZGV4KHByZXYgPT4gcHJldiA+IDAgPyBwcmV2IC0gMSA6IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgaWYgKGlzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2hRdWVyeShcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIENsb3NlIGRyb3Bkb3duIHdoZW4gY2xpY2tpbmcgb3V0c2lkZVxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZUNsaWNrT3V0c2lkZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbnRhaW5lclJlZi5jdXJyZW50ICYmICFjb250YWluZXJSZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZXRTZWFyY2hRdWVyeShcIlwiKTtcbiAgICAgICAgICAgICAgICBzZXRGb2N1c2VkSW5kZXgoLTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZUNsaWNrT3V0c2lkZSk7XG4gICAgICAgIH1cbiAgICB9LCBbaXNPcGVuXSk7XG4gICAgLy8gRm9jdXMgc2VhcmNoIGlucHV0IHdoZW4gZHJvcGRvd24gb3BlbnNcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoaXNPcGVuICYmIHNlYXJjaGFibGUgJiYgc2VhcmNoSW5wdXRSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgc2VhcmNoSW5wdXRSZWYuY3VycmVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfSwgW2lzT3Blbiwgc2VhcmNoYWJsZV0pO1xuICAgIC8vIFNjcm9sbCBmb2N1c2VkIG9wdGlvbiBpbnRvIHZpZXdcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID49IDAgJiYgZHJvcGRvd25SZWYuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgZm9jdXNlZEVsZW1lbnQgPSBkcm9wZG93blJlZi5jdXJyZW50LmNoaWxkcmVuW2ZvY3VzZWRJbmRleF07XG4gICAgICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgJiYgZm9jdXNlZEVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcpIHtcbiAgICAgICAgICAgICAgICBmb2N1c2VkRWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBbZm9jdXNlZEluZGV4XSk7XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IHJlZjogY29udGFpbmVyUmVmLCBjbGFzc05hbWU6IGNuKFwic3BhY2UteS0xXCIsIGZ1bGxXaWR0aCAmJiBcInctZnVsbFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcywgY2hpbGRyZW46IFtsYWJlbCAmJiAoX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IHNlbGVjdElkLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwXCIsIGNoaWxkcmVuOiBbbGFiZWwsIHJlcXVpcmVkICYmIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZXJyb3ItNTAwIG1sLTFcIiwgXCJhcmlhLWxhYmVsXCI6IFwicmVxdWlyZWRcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJlbGF0aXZlXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyByZWY6IHJlZiwgaWQ6IHNlbGVjdElkLCByb2xlOiBcImNvbWJvYm94XCIsIFwiYXJpYS1leHBhbmRlZFwiOiBpc09wZW4sIFwiYXJpYS1oYXNwb3B1cFwiOiBcImxpc3Rib3hcIiwgXCJhcmlhLWNvbnRyb2xzXCI6IGAke3NlbGVjdElkfS1saXN0Ym94YCwgXCJhcmlhLWludmFsaWRcIjogaGFzRXJyb3IsIFwiYXJpYS1kZXNjcmliZWRieVwiOiBjbihlcnJvcklkICYmIGVycm9ySWQsIGhlbHBlclRleHRJZCAmJiBoZWxwZXJUZXh0SWQpIHx8IHVuZGVmaW5lZCwgXCJhcmlhLXJlcXVpcmVkXCI6IHJlcXVpcmVkLCBcImFyaWEtZGlzYWJsZWRcIjogZGlzYWJsZWQsIHRhYkluZGV4OiBkaXNhYmxlZCA/IC0xIDogMCwgY2xhc3NOYW1lOiBjbihzZWxlY3RUcmlnZ2VyVmFyaWFudHMoeyB2YXJpYW50OiBjdXJyZW50VmFyaWFudCwgc2l6ZSB9KSwgZGlzYWJsZWQgJiYgXCJiZy1uZXV0cmFsLTEwMCB0ZXh0LW5ldXRyYWwtNTAwIGN1cnNvci1ub3QtYWxsb3dlZCBvcGFjaXR5LTYwXCIsIGNsYXNzTmFtZSksIG9uQ2xpY2s6ICgpID0+ICFkaXNhYmxlZCAmJiBzZXRJc09wZW4oIWlzT3BlbiksIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmbGV4LXdyYXAgbWluLWgtMFwiLCBjaGlsZHJlbjogbXVsdGlwbGUgJiYgc2VsZWN0ZWRWYWx1ZXMubGVuZ3RoID4gMCA/IChzZWxlY3RlZFZhbHVlcy5tYXAodmFsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnMuZmluZChvcHQgPT4gb3B0LnZhbHVlID09PSB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbiA/IChfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTIgcHktMC41IGJnLXByaW1hcnktMTAwIHRleHQtcHJpbWFyeS03MDAgcm91bmRlZCB0ZXh0LXNtXCIsIGNoaWxkcmVuOiBbb3B0aW9uLmxhYmVsLCBfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogKGUpID0+IGhhbmRsZVJlbW92ZSh2YWwsIGUpLCBjbGFzc05hbWU6IFwiaG92ZXI6YmctcHJpbWFyeS0yMDAgcm91bmRlZC1mdWxsIHAtMC41IHRyYW5zaXRpb24tY29sb3JzXCIsIFwiYXJpYS1sYWJlbFwiOiBgUmVtb3ZlICR7b3B0aW9uLmxhYmVsfWAsIGNoaWxkcmVuOiBfanN4KFgsIHsgY2xhc3NOYW1lOiBcImgtMyB3LTNcIiB9KSB9KV0gfSwgdmFsKSkgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkgOiAoX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IGNuKFwidHJ1bmNhdGVcIiwgc2VsZWN0ZWRWYWx1ZXMubGVuZ3RoID09PSAwICYmIFwidGV4dC1uZXV0cmFsLTQwMFwiKSwgY2hpbGRyZW46IGRpc3BsYXlUZXh0IH0pKSB9KSwgX2pzeChDaGV2cm9uRG93biwgeyBjbGFzc05hbWU6IGNuKFwiaC00IHctNCB0ZXh0LW5ldXRyYWwtNTAwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTIwMCBmbGV4LXNocmluay0wIG1sLTJcIiwgaXNPcGVuICYmIFwidHJhbnNmb3JtIHJvdGF0ZS0xODBcIiksIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIgfSldIH0pLCBpc09wZW4gJiYgKF9qc3hzKFwiZGl2XCIsIHsgaWQ6IGAke3NlbGVjdElkfS1saXN0Ym94YCwgcm9sZTogXCJsaXN0Ym94XCIsIFwiYXJpYS1tdWx0aXNlbGVjdGFibGVcIjogbXVsdGlwbGUsIGNsYXNzTmFtZTogXCJhYnNvbHV0ZSB6LTUwIHctZnVsbCBtdC0xIGJnLXdoaXRlIGJvcmRlciBib3JkZXItbmV1dHJhbC0zMDAgcm91bmRlZC1sZyBzaGFkb3ctbGcgbWF4LWgtNjAgb3ZlcmZsb3ctYXV0byBhbmltYXRlLWluIGZhZGUtaW4tMCB6b29tLWluLTk1XCIsIGNoaWxkcmVuOiBbc2VhcmNoYWJsZSAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzdGlja3kgdG9wLTAgYmctd2hpdGUgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHAtMlwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmVcIiwgY2hpbGRyZW46IFtfanN4KFNlYXJjaCwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgbGVmdC0zIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiBoLTQgdy00IHRleHQtbmV1dHJhbC00MDBcIiwgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIiB9KSwgX2pzeChcImlucHV0XCIsIHsgcmVmOiBzZWFyY2hJbnB1dFJlZiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBzZWFyY2hRdWVyeSwgb25DaGFuZ2U6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2hRdWVyeShlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb2N1c2VkSW5kZXgoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHBsYWNlaG9sZGVyOiBcIlNlYXJjaC4uLlwiLCBjbGFzc05hbWU6IFwidy1mdWxsIHBsLTkgcHItMyBweS0xLjUgdGV4dC1zbSBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMzAwIHJvdW5kZWQgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnktNTAwIGZvY3VzOmJvcmRlci1wcmltYXJ5LTUwMFwiLCBvbkNsaWNrOiAoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSwgXCJhcmlhLWxhYmVsXCI6IFwiU2VhcmNoIG9wdGlvbnNcIiB9KV0gfSkgfSkpLCBfanN4KFwiZGl2XCIsIHsgcmVmOiBkcm9wZG93blJlZiwgY2hpbGRyZW46IGZpbHRlcmVkT3B0aW9ucy5sZW5ndGggPT09IDAgPyAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweC00IHB5LTMgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNTAwIHRleHQtY2VudGVyXCIsIGNoaWxkcmVuOiBcIk5vIG9wdGlvbnMgZm91bmRcIiB9KSkgOiAoZmlsdGVyZWRPcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkVmFsdWVzLmluY2x1ZGVzKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0ZvY3VzZWQgPSBpbmRleCA9PT0gZm9jdXNlZEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IHJvbGU6IFwib3B0aW9uXCIsIFwiYXJpYS1zZWxlY3RlZFwiOiBpc1NlbGVjdGVkLCBcImFyaWEtZGlzYWJsZWRcIjogb3B0aW9uLmRpc2FibGVkLCBjbGFzc05hbWU6IGNuKFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTQgcHktMiBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWNvbG9yc1wiLCBpc1NlbGVjdGVkICYmIFwiYmctcHJpbWFyeS01MCB0ZXh0LXByaW1hcnktNzAwXCIsICFpc1NlbGVjdGVkICYmICFvcHRpb24uZGlzYWJsZWQgJiYgXCJob3ZlcjpiZy1uZXV0cmFsLTUwXCIsIGlzRm9jdXNlZCAmJiBcImJnLW5ldXRyYWwtMTAwXCIsIG9wdGlvbi5kaXNhYmxlZCAmJiBcIm9wYWNpdHktNTAgY3Vyc29yLW5vdC1hbGxvd2VkXCIpLCBvbkNsaWNrOiAoKSA9PiAhb3B0aW9uLmRpc2FibGVkICYmIGhhbmRsZVNlbGVjdChvcHRpb24udmFsdWUpLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc21cIiwgY2hpbGRyZW46IG9wdGlvbi5sYWJlbCB9KSwgaXNTZWxlY3RlZCAmJiAoX2pzeChDaGVjaywgeyBjbGFzc05hbWU6IFwiaC00IHctNCB0ZXh0LXByaW1hcnktNjAwXCIsIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIgfSkpXSB9LCBvcHRpb24udmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIH0pXSB9KSldIH0pLCBlcnJvciAmJiAoX2pzeChcInBcIiwgeyBpZDogZXJyb3JJZCwgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1lcnJvci02MDBcIiwgcm9sZTogXCJhbGVydFwiLCBjaGlsZHJlbjogZXJyb3IgfSkpLCBoZWxwZXJUZXh0ICYmICFlcnJvciAmJiAoX2pzeChcInBcIiwgeyBpZDogaGVscGVyVGV4dElkLCBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNTAwXCIsIGNoaWxkcmVuOiBoZWxwZXJUZXh0IH0pKV0gfSkpO1xufSk7XG5TZWxlY3QuZGlzcGxheU5hbWUgPSBcIlNlbGVjdFwiO1xuZXhwb3J0IHsgU2VsZWN0LCBzZWxlY3RUcmlnZ2VyVmFyaWFudHMgfTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzLCBGcmFnbWVudCBhcyBfRnJhZ21lbnQgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2V0dGluZ3MgYXMgU2V0dGluZ3NJY29uLCBCdWlsZGluZzIsIERvbGxhclNpZ24sIE1haWwsIFNoaWVsZCwgRGF0YWJhc2UsIFBsdWcsIFVwbG9hZCwgWCwgUGx1cywgRWRpdDIsIFRyYXNoMiwgQ2hlY2ssIEV5ZSwgRXllT2ZmLCBTZW5kLCBEb3dubG9hZCwgUm90YXRlQ2N3LCBDbG9jaywgSGFyZERyaXZlLCBDYWxlbmRhciwgQ3JlZGl0Q2FyZCwgWmFwLCBWaWRlbywgTWVzc2FnZVNxdWFyZSwgQ2hlY2tDaXJjbGUsIFhDaXJjbGUsIEFsZXJ0Q2lyY2xlLCBLZXksIEFyY2hpdmUgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgY24gfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2lucHV0JztcbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvc2VsZWN0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvYnV0dG9uJztcbmltcG9ydCB7IHVzZVRvYXN0IH0gZnJvbSAnLi4vY29udGV4dHMvVG9hc3RDb250ZXh0JztcbmltcG9ydCB7IEJhZGdlIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9iYWRnZSc7XG5pbXBvcnQgeyBGZWF0dXJlRmxhZ0FkbWluUGFuZWwgfSBmcm9tICcuLi9jb21wb25lbnRzL2FkbWluL0ZlYXR1cmVGbGFnQWRtaW5QYW5lbCc7XG5jb25zdCBTZXR0aW5ncyA9ICgpID0+IHtcbiAgICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2dlbmVyYWwnKTtcbiAgICBjb25zdCB7IHNob3dUb2FzdCB9ID0gdXNlVG9hc3QoKTtcbiAgICAvLyBHZW5lcmFsIFNldHRpbmdzIHN0YXRlXG4gICAgY29uc3QgW2dlbmVyYWxTZXR0aW5ncywgc2V0R2VuZXJhbFNldHRpbmdzXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgYXBwTmFtZTogJ01GTUMgU3lzdGVtJyxcbiAgICAgICAgdGltZXpvbmU6ICdBc2lhL01hbmlsYScsXG4gICAgICAgIGRhdGVGb3JtYXQ6ICdNTS9ERC9ZWVlZJyxcbiAgICAgICAgY3VycmVuY3k6ICdQSFAnLFxuICAgICAgICB0aGVtZTogJ0xpZ2h0JyxcbiAgICAgICAgbGFuZ3VhZ2U6ICdFbmdsaXNoJyxcbiAgICAgICAgaXRlbXNQZXJQYWdlOiAyNSxcbiAgICB9KTtcbiAgICAvLyBDaHVyY2ggSW5mb3JtYXRpb24gc3RhdGVcbiAgICBjb25zdCBbY2h1cmNoSW5mbywgc2V0Q2h1cmNoSW5mb10gPSB1c2VTdGF0ZSh7XG4gICAgICAgIC8vIEJhc2ljIEluZm9ybWF0aW9uXG4gICAgICAgIGNodXJjaE5hbWU6ICdNeSBGaXJzdCBNaXJhY2xlIENodXJjaCcsXG4gICAgICAgIGRlbm9taW5hdGlvbjogJ05vbi1kZW5vbWluYXRpb25hbCcsXG4gICAgICAgIGZvdW5kZWRZZWFyOiAnMjAxMCcsXG4gICAgICAgIC8vIENvbnRhY3QgSW5mb3JtYXRpb25cbiAgICAgICAgYWRkcmVzczogJzEyMyBDaHVyY2ggU3RyZWV0LCBNYW5pbGEsIFBoaWxpcHBpbmVzJyxcbiAgICAgICAgcGhvbmU6ICcrNjMgOTEyIDM0NSA2Nzg5JyxcbiAgICAgICAgZW1haWw6ICdpbmZvQG1mbWMuY2h1cmNoJyxcbiAgICAgICAgd2Vic2l0ZTogJ2h0dHBzOi8vd3d3Lm1mbWMuY2h1cmNoJyxcbiAgICAgICAgLy8gU29jaWFsIE1lZGlhXG4gICAgICAgIGZhY2Vib29rOiAnaHR0cHM6Ly9mYWNlYm9vay5jb20vbWZtYycsXG4gICAgICAgIHR3aXR0ZXI6ICdodHRwczovL3R3aXR0ZXIuY29tL21mbWMnLFxuICAgICAgICBpbnN0YWdyYW06ICdodHRwczovL2luc3RhZ3JhbS5jb20vbWZtYycsXG4gICAgICAgIHlvdXR1YmU6ICdodHRwczovL3lvdXR1YmUuY29tL0BtZm1jJyxcbiAgICAgICAgLy8gQnJhbmRpbmdcbiAgICAgICAgbG9nbzogbnVsbCxcbiAgICAgICAgcHJpbWFyeUNvbG9yOiAnIzBlYTVlOScsXG4gICAgfSk7XG4gICAgY29uc3QgW2xvZ29QcmV2aWV3LCBzZXRMb2dvUHJldmlld10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbaXNTYXZpbmcsIHNldElzU2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICAvLyBGaW5hbmNlIFNldHRpbmdzIHN0YXRlXG4gICAgY29uc3QgW2ZpbmFuY2VTZXR0aW5ncywgc2V0RmluYW5jZVNldHRpbmdzXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgZmlzY2FsWWVhclN0YXJ0OiAnMScsIC8vIEphbnVhcnlcbiAgICAgICAgcmVxdWlyZUFwcHJvdmFsOiB0cnVlLFxuICAgICAgICBhcHByb3ZhbFRocmVzaG9sZDogNTAwMCxcbiAgICAgICAgZGVmYXVsdE9mZmVyaW5nVHlwZTogJycsXG4gICAgICAgIGRlZmF1bHRFeHBlbnNlQ2F0ZWdvcnk6ICcnLFxuICAgICAgICBkZWZhdWx0RnVuZDogJycsXG4gICAgfSk7XG4gICAgY29uc3QgW29mZmVyaW5nVHlwZXMsIHNldE9mZmVyaW5nVHlwZXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtleHBlbnNlQ2F0ZWdvcmllcywgc2V0RXhwZW5zZUNhdGVnb3JpZXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtmdW5kcywgc2V0RnVuZHNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtlZGl0aW5nT2ZmZXJpbmdUeXBlLCBzZXRFZGl0aW5nT2ZmZXJpbmdUeXBlXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtlZGl0aW5nRXhwZW5zZUNhdGVnb3J5LCBzZXRFZGl0aW5nRXhwZW5zZUNhdGVnb3J5XSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtlZGl0aW5nRnVuZCwgc2V0RWRpdGluZ0Z1bmRdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW25ld09mZmVyaW5nVHlwZSwgc2V0TmV3T2ZmZXJpbmdUeXBlXSA9IHVzZVN0YXRlKHsgbmFtZTogJycsIGRlc2NyaXB0aW9uOiAnJyB9KTtcbiAgICBjb25zdCBbbmV3RXhwZW5zZUNhdGVnb3J5LCBzZXROZXdFeHBlbnNlQ2F0ZWdvcnldID0gdXNlU3RhdGUoeyBuYW1lOiAnJywgZGVzY3JpcHRpb246ICcnIH0pO1xuICAgIGNvbnN0IFtuZXdGdW5kLCBzZXROZXdGdW5kXSA9IHVzZVN0YXRlKHsgbmFtZTogJycsIHR5cGU6ICd1bnJlc3RyaWN0ZWQnLCBkZXNjcmlwdGlvbjogJycgfSk7XG4gICAgY29uc3QgW3Nob3dBZGRPZmZlcmluZ1R5cGUsIHNldFNob3dBZGRPZmZlcmluZ1R5cGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtzaG93QWRkRXhwZW5zZUNhdGVnb3J5LCBzZXRTaG93QWRkRXhwZW5zZUNhdGVnb3J5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbc2hvd0FkZEZ1bmQsIHNldFNob3dBZGRGdW5kXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICAvLyBFbWFpbCAmIE5vdGlmaWNhdGlvbnMgc3RhdGVcbiAgICBjb25zdCBbZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncywgc2V0RW1haWxOb3RpZmljYXRpb25TZXR0aW5nc10gPSB1c2VTdGF0ZSh7XG4gICAgICAgIC8vIFNNVFAgQ29uZmlndXJhdGlvblxuICAgICAgICBzbXRwSG9zdDogJycsXG4gICAgICAgIHNtdHBQb3J0OiAnNTg3JyxcbiAgICAgICAgc210cFVzZXJuYW1lOiAnJyxcbiAgICAgICAgc210cFBhc3N3b3JkOiAnJyxcbiAgICAgICAgc210cEVuY3J5cHRpb246ICd0bHMnLFxuICAgICAgICBzbXRwRnJvbUVtYWlsOiAnJyxcbiAgICAgICAgc210cEZyb21OYW1lOiAnTUZNQyBTeXN0ZW0nLFxuICAgICAgICAvLyBOb3RpZmljYXRpb24gUHJlZmVyZW5jZXNcbiAgICAgICAgZW5hYmxlRW1haWxOb3RpZmljYXRpb25zOiB0cnVlLFxuICAgICAgICBlbmFibGVJbkFwcE5vdGlmaWNhdGlvbnM6IHRydWUsXG4gICAgICAgIC8vIE5vdGlmaWNhdGlvbiBUeXBlc1xuICAgICAgICBub3RpZnlOZXdNZW1iZXI6IHRydWUsXG4gICAgICAgIG5vdGlmeUV2ZW50UmVtaW5kZXI6IHRydWUsXG4gICAgICAgIG5vdGlmeUZpbmFuY2VBcHByb3ZhbDogdHJ1ZSxcbiAgICAgICAgbm90aWZ5RXhwZW5zZVN1Ym1pdHRlZDogdHJ1ZSxcbiAgICAgICAgbm90aWZ5T2ZmZXJpbmdSZWNvcmRlZDogZmFsc2UsXG4gICAgICAgIG5vdGlmeUJ1ZGdldFRocmVzaG9sZDogdHJ1ZSxcbiAgICAgICAgbm90aWZ5VXNlckludml0ZTogdHJ1ZSxcbiAgICAgICAgbm90aWZ5U3lzdGVtVXBkYXRlOiB0cnVlLFxuICAgIH0pO1xuICAgIGNvbnN0IFtpc1NlbmRpbmdUZXN0RW1haWwsIHNldElzU2VuZGluZ1Rlc3RFbWFpbF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3Nob3dTbXRwUGFzc3dvcmQsIHNldFNob3dTbXRwUGFzc3dvcmRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIC8vIFNlY3VyaXR5IFNldHRpbmdzIHN0YXRlXG4gICAgY29uc3QgW3NlY3VyaXR5U2V0dGluZ3MsIHNldFNlY3VyaXR5U2V0dGluZ3NdID0gdXNlU3RhdGUoe1xuICAgICAgICAvLyBQYXNzd29yZCBQb2xpY3lcbiAgICAgICAgbWluUGFzc3dvcmRMZW5ndGg6IDgsXG4gICAgICAgIHJlcXVpcmVVcHBlcmNhc2U6IHRydWUsXG4gICAgICAgIHJlcXVpcmVMb3dlcmNhc2U6IHRydWUsXG4gICAgICAgIHJlcXVpcmVOdW1iZXJzOiB0cnVlLFxuICAgICAgICByZXF1aXJlU3BlY2lhbENoYXJzOiB0cnVlLFxuICAgICAgICBwYXNzd29yZEV4cGlyeURheXM6IDkwLFxuICAgICAgICAvLyBTZXNzaW9uIFNldHRpbmdzXG4gICAgICAgIHNlc3Npb25UaW1lb3V0OiAzMCwgLy8gMzAgbWludXRlc1xuICAgICAgICAvLyBUd28tRmFjdG9yIEF1dGhlbnRpY2F0aW9uXG4gICAgICAgIGVuYWJsZTJGQTogZmFsc2UsXG4gICAgICAgIC8vIExvZ2luIFNlY3VyaXR5XG4gICAgICAgIG1heExvZ2luQXR0ZW1wdHM6IDUsXG4gICAgICAgIGxvY2tvdXREdXJhdGlvbjogMTUsIC8vIDE1IG1pbnV0ZXNcbiAgICB9KTtcbiAgICBjb25zdCBbYXVkaXRMb2dzLCBzZXRBdWRpdExvZ3NdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtpc0xvYWRpbmdBdWRpdExvZ3MsIHNldElzTG9hZGluZ0F1ZGl0TG9nc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgLy8gQmFja3VwICYgUmVzdG9yZSBzdGF0ZVxuICAgIGNvbnN0IFtiYWNrdXBzLCBzZXRCYWNrdXBzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbaXNMb2FkaW5nQmFja3Vwcywgc2V0SXNMb2FkaW5nQmFja3Vwc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2lzQ3JlYXRpbmdCYWNrdXAsIHNldElzQ3JlYXRpbmdCYWNrdXBdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtiYWNrdXBTZXR0aW5ncywgc2V0QmFja3VwU2V0dGluZ3NdID0gdXNlU3RhdGUoe1xuICAgICAgICBlbmFibGVBdXRvQmFja3VwOiB0cnVlLFxuICAgICAgICBiYWNrdXBGcmVxdWVuY3k6ICdkYWlseScsXG4gICAgICAgIGJhY2t1cFRpbWU6ICcwMjowMCcsXG4gICAgICAgIHJldGVudGlvbkRheXM6IDMwLFxuICAgICAgICBpbmNsdWRlVXBsb2FkczogdHJ1ZSxcbiAgICB9KTtcbiAgICBjb25zdCBbbGFzdEJhY2t1cCwgc2V0TGFzdEJhY2t1cF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbcmVzdG9yZUNvbmZpcm1hdGlvbiwgc2V0UmVzdG9yZUNvbmZpcm1hdGlvbl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICAvLyBJbnRlZ3JhdGlvbnMgc3RhdGVcbiAgICBjb25zdCBbaW50ZWdyYXRpb25zLCBzZXRJbnRlZ3JhdGlvbnNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtjb25maWd1cmluZ0ludGVncmF0aW9uLCBzZXRDb25maWd1cmluZ0ludGVncmF0aW9uXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtpbnRlZ3JhdGlvbkNvbmZpZywgc2V0SW50ZWdyYXRpb25Db25maWddID0gdXNlU3RhdGUoe1xuICAgICAgICBhcGlLZXk6ICcnLFxuICAgICAgICBhcGlTZWNyZXQ6ICcnLFxuICAgICAgICB3ZWJob29rVXJsOiAnJyxcbiAgICAgICAgYWRkaXRpb25hbFNldHRpbmdzOiB7fSxcbiAgICB9KTtcbiAgICBjb25zdCBbc2hvd0FwaUtleSwgc2V0U2hvd0FwaUtleV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2lzU2F2aW5nSW50ZWdyYXRpb24sIHNldElzU2F2aW5nSW50ZWdyYXRpb25dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFthcmNoaXZlU2V0dGluZ3MsIHNldEFyY2hpdmVTZXR0aW5nc10gPSB1c2VTdGF0ZSh7XG4gICAgICAgIGF1dG9BcmNoaXZlRW5hYmxlZDogZmFsc2UsXG4gICAgICAgIGF1dG9BcmNoaXZlRGF5czogMzY1LFxuICAgICAgICByZXRlbnRpb25QZXJpb2Q6IDkwLFxuICAgICAgICBhbGxvd1Jlc3RvcmU6IHRydWUsXG4gICAgICAgIHJlcXVpcmVDb25maXJtYXRpb246IHRydWUsXG4gICAgICAgIG5vdGlmeU9uQXJjaGl2ZTogdHJ1ZSxcbiAgICB9KTtcbiAgICAvLyBMb2FkIGZpbmFuY2UgZGF0YSBvbiBtb3VudFxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmVUYWIgPT09ICdmaW5hbmNlJykge1xuICAgICAgICAgICAgbG9hZEZpbmFuY2VEYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aXZlVGFiID09PSAnc2VjdXJpdHknKSB7XG4gICAgICAgICAgICBsb2FkQXVkaXRMb2dzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aXZlVGFiID09PSAnYmFja3VwJykge1xuICAgICAgICAgICAgbG9hZEJhY2t1cHMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3RpdmVUYWIgPT09ICdpbnRlZ3JhdGlvbnMnKSB7XG4gICAgICAgICAgICBsb2FkSW50ZWdyYXRpb25zKCk7XG4gICAgICAgIH1cbiAgICB9LCBbYWN0aXZlVGFiXSk7XG4gICAgY29uc3QgbG9hZEZpbmFuY2VEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gTG9hZCBvZmZlcmluZyB0eXBlc1xuICAgICAgICAgICAgY29uc3Qgb2ZmZXJpbmdUeXBlc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvb2ZmZXJpbmctdHlwZXMnKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZmVyaW5nVHlwZXNEYXRhID0gYXdhaXQgb2ZmZXJpbmdUeXBlc1Jlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGlmIChvZmZlcmluZ1R5cGVzRGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2V0T2ZmZXJpbmdUeXBlcyhvZmZlcmluZ1R5cGVzRGF0YS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIExvYWQgZXhwZW5zZSBjYXRlZ29yaWVzXG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yaWVzUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9leHBlbnNlLWNhdGVnb3JpZXMnKTtcbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3JpZXNEYXRhID0gYXdhaXQgY2F0ZWdvcmllc1Jlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGlmIChjYXRlZ29yaWVzRGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2V0RXhwZW5zZUNhdGVnb3JpZXMoY2F0ZWdvcmllc0RhdGEuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBMb2FkIGZ1bmRzXG4gICAgICAgICAgICBjb25zdCBmdW5kc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvZnVuZHMnKTtcbiAgICAgICAgICAgIGNvbnN0IGZ1bmRzRGF0YSA9IGF3YWl0IGZ1bmRzUmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgaWYgKGZ1bmRzRGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2V0RnVuZHMoZnVuZHNEYXRhLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgZmluYW5jZSBkYXRhOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIGxvYWQgZmluYW5jZSBkYXRhJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIFRpbWV6b25lIG9wdGlvbnMgKGNvbW1vbiB0aW1lem9uZXMpXG4gICAgY29uc3QgdGltZXpvbmVPcHRpb25zID0gW1xuICAgICAgICB7IHZhbHVlOiAnQXNpYS9NYW5pbGEnLCBsYWJlbDogJ0FzaWEvTWFuaWxhIChQSFQpJyB9LFxuICAgICAgICB7IHZhbHVlOiAnVVRDJywgbGFiZWw6ICdVVEMnIH0sXG4gICAgICAgIHsgdmFsdWU6ICdBbWVyaWNhL05ld19Zb3JrJywgbGFiZWw6ICdBbWVyaWNhL05ldyBZb3JrIChFU1QpJyB9LFxuICAgICAgICB7IHZhbHVlOiAnQW1lcmljYS9DaGljYWdvJywgbGFiZWw6ICdBbWVyaWNhL0NoaWNhZ28gKENTVCknIH0sXG4gICAgICAgIHsgdmFsdWU6ICdBbWVyaWNhL0RlbnZlcicsIGxhYmVsOiAnQW1lcmljYS9EZW52ZXIgKE1TVCknIH0sXG4gICAgICAgIHsgdmFsdWU6ICdBbWVyaWNhL0xvc19BbmdlbGVzJywgbGFiZWw6ICdBbWVyaWNhL0xvcyBBbmdlbGVzIChQU1QpJyB9LFxuICAgICAgICB7IHZhbHVlOiAnRXVyb3BlL0xvbmRvbicsIGxhYmVsOiAnRXVyb3BlL0xvbmRvbiAoR01UKScgfSxcbiAgICAgICAgeyB2YWx1ZTogJ0V1cm9wZS9QYXJpcycsIGxhYmVsOiAnRXVyb3BlL1BhcmlzIChDRVQpJyB9LFxuICAgICAgICB7IHZhbHVlOiAnQXNpYS9Ub2t5bycsIGxhYmVsOiAnQXNpYS9Ub2t5byAoSlNUKScgfSxcbiAgICAgICAgeyB2YWx1ZTogJ0FzaWEvU2hhbmdoYWknLCBsYWJlbDogJ0FzaWEvU2hhbmdoYWkgKENTVCknIH0sXG4gICAgICAgIHsgdmFsdWU6ICdBdXN0cmFsaWEvU3lkbmV5JywgbGFiZWw6ICdBdXN0cmFsaWEvU3lkbmV5IChBRURUKScgfSxcbiAgICBdO1xuICAgIGNvbnN0IGRhdGVGb3JtYXRPcHRpb25zID0gW1xuICAgICAgICB7IHZhbHVlOiAnTU0vREQvWVlZWScsIGxhYmVsOiAnTU0vREQvWVlZWSAoMTIvMzEvMjAyNCknIH0sXG4gICAgICAgIHsgdmFsdWU6ICdERC9NTS9ZWVlZJywgbGFiZWw6ICdERC9NTS9ZWVlZICgzMS8xMi8yMDI0KScgfSxcbiAgICAgICAgeyB2YWx1ZTogJ1lZWVktTU0tREQnLCBsYWJlbDogJ1lZWVktTU0tREQgKDIwMjQtMTItMzEpJyB9LFxuICAgIF07XG4gICAgY29uc3QgY3VycmVuY3lPcHRpb25zID0gW1xuICAgICAgICB7IHZhbHVlOiAnUEhQJywgbGFiZWw6ICdQSFAgKOKCsSkgLSBQaGlsaXBwaW5lIFBlc28nIH0sXG4gICAgICAgIHsgdmFsdWU6ICdVU0QnLCBsYWJlbDogJ1VTRCAoJCkgLSBVUyBEb2xsYXInIH0sXG4gICAgICAgIHsgdmFsdWU6ICdFVVInLCBsYWJlbDogJ0VVUiAo4oKsKSAtIEV1cm8nIH0sXG4gICAgICAgIHsgdmFsdWU6ICdHQlAnLCBsYWJlbDogJ0dCUCAowqMpIC0gQnJpdGlzaCBQb3VuZCcgfSxcbiAgICAgICAgeyB2YWx1ZTogJ0pQWScsIGxhYmVsOiAnSlBZICjCpSkgLSBKYXBhbmVzZSBZZW4nIH0sXG4gICAgXTtcbiAgICBjb25zdCB0aGVtZU9wdGlvbnMgPSBbXG4gICAgICAgIHsgdmFsdWU6ICdMaWdodCcsIGxhYmVsOiAnTGlnaHQnIH0sXG4gICAgICAgIHsgdmFsdWU6ICdEYXJrJywgbGFiZWw6ICdEYXJrJyB9LFxuICAgIF07XG4gICAgY29uc3QgbGFuZ3VhZ2VPcHRpb25zID0gW1xuICAgICAgICB7IHZhbHVlOiAnRW5nbGlzaCcsIGxhYmVsOiAnRW5nbGlzaCcgfSxcbiAgICAgICAgeyB2YWx1ZTogJ0ZpbGlwaW5vJywgbGFiZWw6ICdGaWxpcGlubycgfSxcbiAgICAgICAgeyB2YWx1ZTogJ1NwYW5pc2gnLCBsYWJlbDogJ1NwYW5pc2gnIH0sXG4gICAgXTtcbiAgICAvLyBIYW5kbGUgZ2VuZXJhbCBzZXR0aW5ncyBzYXZlXG4gICAgY29uc3QgaGFuZGxlU2F2ZUdlbmVyYWxTZXR0aW5ncyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0SXNTYXZpbmcodHJ1ZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBSZXBsYWNlIHdpdGggYWN0dWFsIEFQSSBjYWxsXG4gICAgICAgICAgICAvLyBhd2FpdCBhcGkucG9zdCgnL3NldHRpbmdzL2dlbmVyYWwnLCBnZW5lcmFsU2V0dGluZ3MpO1xuICAgICAgICAgICAgLy8gU2ltdWxhdGUgQVBJIGNhbGxcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnU2V0dGluZ3Mgc2F2ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBzYXZlIHNldHRpbmdzLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNTYXZpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBIYW5kbGUgY2h1cmNoIGluZm8gc2F2ZVxuICAgIGNvbnN0IGhhbmRsZVNhdmVDaHVyY2hJbmZvID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRJc1NhdmluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlcGxhY2Ugd2l0aCBhY3R1YWwgQVBJIGNhbGxcbiAgICAgICAgICAgIC8vIGF3YWl0IGFwaS5wb3N0KCcvc2V0dGluZ3MvY2h1cmNoLWluZm8nLCBjaHVyY2hJbmZvKTtcbiAgICAgICAgICAgIC8vIFNpbXVsYXRlIEFQSSBjYWxsXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ0NodXJjaCBpbmZvcm1hdGlvbiBzYXZlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIHNhdmUgY2h1cmNoIGluZm9ybWF0aW9uLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNTYXZpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBIYW5kbGUgbG9nbyB1cGxvYWRcbiAgICBjb25zdCBoYW5kbGVMb2dvVXBsb2FkID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXM/LlswXTtcbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGZpbGUgdHlwZVxuICAgICAgICAgICAgaWYgKCFmaWxlLnR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UvJykpIHtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ1BsZWFzZSB1cGxvYWQgYW4gaW1hZ2UgZmlsZScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIGZpbGUgc2l6ZSAobWF4IDJNQilcbiAgICAgICAgICAgIGlmIChmaWxlLnNpemUgPiAyICogMTAyNCAqIDEwMjQpIHtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ltYWdlIHNpemUgbXVzdCBiZSBsZXNzIHRoYW4gMk1CJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ3JlYXRlIHByZXZpZXdcbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldExvZ29QcmV2aWV3KHJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIHNldENodXJjaEluZm8oeyAuLi5jaHVyY2hJbmZvLCBsb2dvOiByZWFkZXIucmVzdWx0IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBIYW5kbGUgbG9nbyByZW1vdmFsXG4gICAgY29uc3QgaGFuZGxlUmVtb3ZlTG9nbyA9ICgpID0+IHtcbiAgICAgICAgc2V0TG9nb1ByZXZpZXcobnVsbCk7XG4gICAgICAgIHNldENodXJjaEluZm8oeyAuLi5jaHVyY2hJbmZvLCBsb2dvOiBudWxsIH0pO1xuICAgIH07XG4gICAgLy8gRmluYW5jZSBTZXR0aW5ncyBoYW5kbGVyc1xuICAgIGNvbnN0IGhhbmRsZVNhdmVGaW5hbmNlU2V0dGluZ3MgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHNldElzU2F2aW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gYXdhaXQgYXBpLnBvc3QoJy9zZXR0aW5ncy9maW5hbmNlJywgZmluYW5jZVNldHRpbmdzKTtcbiAgICAgICAgICAgIC8vIFNpbXVsYXRlIEFQSSBjYWxsXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ0ZpbmFuY2Ugc2V0dGluZ3Mgc2F2ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBzYXZlIGZpbmFuY2Ugc2V0dGluZ3MuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc1NhdmluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIE9mZmVyaW5nIFR5cGUgaGFuZGxlcnNcbiAgICBjb25zdCBoYW5kbGVBZGRPZmZlcmluZ1R5cGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghbmV3T2ZmZXJpbmdUeXBlLm5hbWUudHJpbSgpKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ1BsZWFzZSBlbnRlciBhbiBvZmZlcmluZyB0eXBlIG5hbWUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9vZmZlcmluZy10eXBlcycsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5ld09mZmVyaW5nVHlwZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogbmV3T2ZmZXJpbmdUeXBlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpc19hY3RpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2V0T2ZmZXJpbmdUeXBlcyhbLi4ub2ZmZXJpbmdUeXBlcywgZGF0YS5kYXRhXSk7XG4gICAgICAgICAgICAgICAgc2V0TmV3T2ZmZXJpbmdUeXBlKHsgbmFtZTogJycsIGRlc2NyaXB0aW9uOiAnJyB9KTtcbiAgICAgICAgICAgICAgICBzZXRTaG93QWRkT2ZmZXJpbmdUeXBlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnT2ZmZXJpbmcgdHlwZSBhZGRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCBkYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBhZGQgb2ZmZXJpbmcgdHlwZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gYWRkIG9mZmVyaW5nIHR5cGUnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlVXBkYXRlT2ZmZXJpbmdUeXBlID0gYXN5bmMgKGlkLCB1cGRhdGVzKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL29mZmVyaW5nLXR5cGVzLyR7aWR9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXBkYXRlcyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2V0T2ZmZXJpbmdUeXBlcyhvZmZlcmluZ1R5cGVzLm1hcChvdCA9PiBvdC5pZCA9PT0gaWQgPyBkYXRhLmRhdGEgOiBvdCkpO1xuICAgICAgICAgICAgICAgIHNldEVkaXRpbmdPZmZlcmluZ1R5cGUobnVsbCk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ09mZmVyaW5nIHR5cGUgdXBkYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCBkYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGRhdGUgb2ZmZXJpbmcgdHlwZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gdXBkYXRlIG9mZmVyaW5nIHR5cGUnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlRGVsZXRlT2ZmZXJpbmdUeXBlID0gYXN5bmMgKGlkKSA9PiB7XG4gICAgICAgIGlmICghY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIG9mZmVyaW5nIHR5cGU/JykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9vZmZlcmluZy10eXBlcy8ke2lkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHNldE9mZmVyaW5nVHlwZXMob2ZmZXJpbmdUeXBlcy5maWx0ZXIob3QgPT4gb3QuaWQgIT09IGlkKSk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ09mZmVyaW5nIHR5cGUgZGVsZXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCBkYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBkZWxldGUgb2ZmZXJpbmcgdHlwZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gZGVsZXRlIG9mZmVyaW5nIHR5cGUnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gRXhwZW5zZSBDYXRlZ29yeSBoYW5kbGVyc1xuICAgIGNvbnN0IGhhbmRsZUFkZEV4cGVuc2VDYXRlZ29yeSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFuZXdFeHBlbnNlQ2F0ZWdvcnkubmFtZS50cmltKCkpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnUGxlYXNlIGVudGVyIGEgY2F0ZWdvcnkgbmFtZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2V4cGVuc2UtY2F0ZWdvcmllcycsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5ld0V4cGVuc2VDYXRlZ29yeS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogbmV3RXhwZW5zZUNhdGVnb3J5LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpc19hY3RpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2V0RXhwZW5zZUNhdGVnb3JpZXMoWy4uLmV4cGVuc2VDYXRlZ29yaWVzLCBkYXRhLmRhdGFdKTtcbiAgICAgICAgICAgICAgICBzZXROZXdFeHBlbnNlQ2F0ZWdvcnkoeyBuYW1lOiAnJywgZGVzY3JpcHRpb246ICcnIH0pO1xuICAgICAgICAgICAgICAgIHNldFNob3dBZGRFeHBlbnNlQ2F0ZWdvcnkoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdFeHBlbnNlIGNhdGVnb3J5IGFkZGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsIGRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGFkZCBleHBlbnNlIGNhdGVnb3J5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBhZGQgZXhwZW5zZSBjYXRlZ29yeScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVVcGRhdGVFeHBlbnNlQ2F0ZWdvcnkgPSBhc3luYyAoaWQsIHVwZGF0ZXMpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hcGkvZXhwZW5zZS1jYXRlZ29yaWVzLyR7aWR9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXBkYXRlcyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2V0RXhwZW5zZUNhdGVnb3JpZXMoZXhwZW5zZUNhdGVnb3JpZXMubWFwKGVjID0+IGVjLmlkID09PSBpZCA/IGRhdGEuZGF0YSA6IGVjKSk7XG4gICAgICAgICAgICAgICAgc2V0RWRpdGluZ0V4cGVuc2VDYXRlZ29yeShudWxsKTtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnRXhwZW5zZSBjYXRlZ29yeSB1cGRhdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsIGRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHVwZGF0ZSBleHBlbnNlIGNhdGVnb3J5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byB1cGRhdGUgZXhwZW5zZSBjYXRlZ29yeScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVEZWxldGVFeHBlbnNlQ2F0ZWdvcnkgPSBhc3luYyAoaWQpID0+IHtcbiAgICAgICAgaWYgKCFjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZXhwZW5zZSBjYXRlZ29yeT8nKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL2V4cGVuc2UtY2F0ZWdvcmllcy8ke2lkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHNldEV4cGVuc2VDYXRlZ29yaWVzKGV4cGVuc2VDYXRlZ29yaWVzLmZpbHRlcihlYyA9PiBlYy5pZCAhPT0gaWQpKTtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnRXhwZW5zZSBjYXRlZ29yeSBkZWxldGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsIGRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGRlbGV0ZSBleHBlbnNlIGNhdGVnb3J5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBkZWxldGUgZXhwZW5zZSBjYXRlZ29yeScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBGdW5kIGhhbmRsZXJzXG4gICAgY29uc3QgaGFuZGxlQWRkRnVuZCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFuZXdGdW5kLm5hbWUudHJpbSgpKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ1BsZWFzZSBlbnRlciBhIGZ1bmQgbmFtZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2Z1bmRzJywge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmV3RnVuZC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBuZXdGdW5kLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBuZXdGdW5kLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpc19hY3RpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2V0RnVuZHMoWy4uLmZ1bmRzLCBkYXRhLmRhdGFdKTtcbiAgICAgICAgICAgICAgICBzZXROZXdGdW5kKHsgbmFtZTogJycsIHR5cGU6ICd1bnJlc3RyaWN0ZWQnLCBkZXNjcmlwdGlvbjogJycgfSk7XG4gICAgICAgICAgICAgICAgc2V0U2hvd0FkZEZ1bmQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdGdW5kIGFkZGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsIGRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGFkZCBmdW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBhZGQgZnVuZCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVVcGRhdGVGdW5kID0gYXN5bmMgKGlkLCB1cGRhdGVzKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL2Z1bmRzLyR7aWR9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXBkYXRlcyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2V0RnVuZHMoZnVuZHMubWFwKGYgPT4gZi5pZCA9PT0gaWQgPyBkYXRhLmRhdGEgOiBmKSk7XG4gICAgICAgICAgICAgICAgc2V0RWRpdGluZ0Z1bmQobnVsbCk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ0Z1bmQgdXBkYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCBkYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGRhdGUgZnVuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gdXBkYXRlIGZ1bmQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlRGVsZXRlRnVuZCA9IGFzeW5jIChpZCkgPT4ge1xuICAgICAgICBpZiAoIWNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBmdW5kPycpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hcGkvZnVuZHMvJHtpZH1gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBzZXRGdW5kcyhmdW5kcy5maWx0ZXIoZiA9PiBmLmlkICE9PSBpZCkpO1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdGdW5kIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgZGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gZGVsZXRlIGZ1bmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIGRlbGV0ZSBmdW5kJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIEVtYWlsICYgTm90aWZpY2F0aW9ucyBoYW5kbGVyc1xuICAgIGNvbnN0IGhhbmRsZVNhdmVFbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRJc1NhdmluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlcGxhY2Ugd2l0aCBhY3R1YWwgQVBJIGNhbGxcbiAgICAgICAgICAgIC8vIGF3YWl0IGFwaS5wb3N0KCcvc2V0dGluZ3MvZW1haWwtbm90aWZpY2F0aW9ucycsIGVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MpO1xuICAgICAgICAgICAgLy8gU2ltdWxhdGUgQVBJIGNhbGxcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnRW1haWwgYW5kIG5vdGlmaWNhdGlvbiBzZXR0aW5ncyBzYXZlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIHNhdmUgZW1haWwgYW5kIG5vdGlmaWNhdGlvbiBzZXR0aW5ncy4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzU2F2aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU2VuZFRlc3RFbWFpbCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgLy8gVmFsaWRhdGUgU01UUCBzZXR0aW5nc1xuICAgICAgICBpZiAoIWVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Muc210cEhvc3QgfHwgIWVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Muc210cEZyb21FbWFpbCkge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdQbGVhc2UgY29uZmlndXJlIFNNVFAgc2V0dGluZ3MgYmVmb3JlIHNlbmRpbmcgYSB0ZXN0IGVtYWlsJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNTZW5kaW5nVGVzdEVtYWlsKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gYXdhaXQgYXBpLnBvc3QoJy9zZXR0aW5ncy90ZXN0LWVtYWlsJywge1xuICAgICAgICAgICAgLy8gICBzbXRwSG9zdDogZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncy5zbXRwSG9zdCxcbiAgICAgICAgICAgIC8vICAgc210cFBvcnQ6IGVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Muc210cFBvcnQsXG4gICAgICAgICAgICAvLyAgIHNtdHBVc2VybmFtZTogZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncy5zbXRwVXNlcm5hbWUsXG4gICAgICAgICAgICAvLyAgIHNtdHBQYXNzd29yZDogZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncy5zbXRwUGFzc3dvcmQsXG4gICAgICAgICAgICAvLyAgIHNtdHBFbmNyeXB0aW9uOiBlbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzLnNtdHBFbmNyeXB0aW9uLFxuICAgICAgICAgICAgLy8gICBzbXRwRnJvbUVtYWlsOiBlbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzLnNtdHBGcm9tRW1haWwsXG4gICAgICAgICAgICAvLyAgIHNtdHBGcm9tTmFtZTogZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncy5zbXRwRnJvbU5hbWUsXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIC8vIFNpbXVsYXRlIEFQSSBjYWxsXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwMCkpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ1Rlc3QgZW1haWwgc2VudCBzdWNjZXNzZnVsbHkhIFBsZWFzZSBjaGVjayB5b3VyIGluYm94LicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gc2VuZCB0ZXN0IGVtYWlsLiBQbGVhc2UgY2hlY2sgeW91ciBTTVRQIGNvbmZpZ3VyYXRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc1NlbmRpbmdUZXN0RW1haWwoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBTZWN1cml0eSBTZXR0aW5ncyBoYW5kbGVyc1xuICAgIGNvbnN0IGhhbmRsZVNhdmVTZWN1cml0eVNldHRpbmdzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRJc1NhdmluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlcGxhY2Ugd2l0aCBhY3R1YWwgQVBJIGNhbGxcbiAgICAgICAgICAgIC8vIGF3YWl0IGFwaS5wb3N0KCcvc2V0dGluZ3Mvc2VjdXJpdHknLCBzZWN1cml0eVNldHRpbmdzKTtcbiAgICAgICAgICAgIC8vIFNpbXVsYXRlIEFQSSBjYWxsXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ1NlY3VyaXR5IHNldHRpbmdzIHNhdmVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gc2F2ZSBzZWN1cml0eSBzZXR0aW5ncy4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzU2F2aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgbG9hZEF1ZGl0TG9ncyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nQXVkaXRMb2dzKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvc2V0dGluZ3Mvc2VjdXJpdHkvYXVkaXQtbG9ncz9saW1pdD0xMCcpO1xuICAgICAgICAgICAgLy8gc2V0QXVkaXRMb2dzKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgLy8gU2ltdWxhdGUgQVBJIGNhbGwgd2l0aCBtb2NrIGRhdGFcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCA1MDApKTtcbiAgICAgICAgICAgIGNvbnN0IG1vY2tMb2dzID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6ICdBZG1pbiBVc2VyJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnTG9naW4nLFxuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxMDAwICogNjAgKiA1KS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBpcEFkZHJlc3M6ICcxOTIuMTY4LjEuMTAwJyxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogJ1N1Y2Nlc3NmdWwgbG9naW4nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogJ0pvaG4gRG9lJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnUGFzc3dvcmQgQ2hhbmdlZCcsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDEwMDAgKiA2MCAqIDMwKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBpcEFkZHJlc3M6ICcxOTIuMTY4LjEuMTAxJyxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogJ1VzZXIgY2hhbmdlZCB0aGVpciBwYXNzd29yZCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiAnSmFuZSBTbWl0aCcsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ0ZhaWxlZCBMb2dpbicsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDEwMDAgKiA2MCAqIDYwKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBpcEFkZHJlc3M6ICcxOTIuMTY4LjEuMTAyJyxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogJ0ludmFsaWQgcGFzc3dvcmQgYXR0ZW1wdCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiA0LFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiAnQWRtaW4gVXNlcicsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ1NldHRpbmdzIENoYW5nZWQnLFxuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxMDAwICogNjAgKiAxMjApLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGlwQWRkcmVzczogJzE5Mi4xNjguMS4xMDAnLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiAnVXBkYXRlZCBzZWN1cml0eSBzZXR0aW5ncycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiA1LFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiAnU3lzdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAnQWNjb3VudCBMb2NrZWQnLFxuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxMDAwICogNjAgKiAxODApLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGlwQWRkcmVzczogJzE5Mi4xNjguMS4xMDMnLFxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiAnQWNjb3VudCBsb2NrZWQgZHVlIHRvIG11bHRpcGxlIGZhaWxlZCBsb2dpbiBhdHRlbXB0cycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBzZXRBdWRpdExvZ3MobW9ja0xvZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgYXVkaXQgbG9nczonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBsb2FkIGF1ZGl0IGxvZ3MnKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzTG9hZGluZ0F1ZGl0TG9ncyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdFJlbGF0aXZlVGltZSA9ICh0aW1lc3RhbXApID0+IHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdGhlbiA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG4gICAgICAgIGNvbnN0IGRpZmZNcyA9IG5vdy5nZXRUaW1lKCkgLSB0aGVuLmdldFRpbWUoKTtcbiAgICAgICAgY29uc3QgZGlmZk1pbnMgPSBNYXRoLmZsb29yKGRpZmZNcyAvIDYwMDAwKTtcbiAgICAgICAgY29uc3QgZGlmZkhvdXJzID0gTWF0aC5mbG9vcihkaWZmTWlucyAvIDYwKTtcbiAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmZsb29yKGRpZmZIb3VycyAvIDI0KTtcbiAgICAgICAgaWYgKGRpZmZNaW5zIDwgMSlcbiAgICAgICAgICAgIHJldHVybiAnSnVzdCBub3cnO1xuICAgICAgICBpZiAoZGlmZk1pbnMgPCA2MClcbiAgICAgICAgICAgIHJldHVybiBgJHtkaWZmTWluc30gbWludXRlJHtkaWZmTWlucyA+IDEgPyAncycgOiAnJ30gYWdvYDtcbiAgICAgICAgaWYgKGRpZmZIb3VycyA8IDI0KVxuICAgICAgICAgICAgcmV0dXJuIGAke2RpZmZIb3Vyc30gaG91ciR7ZGlmZkhvdXJzID4gMSA/ICdzJyA6ICcnfSBhZ29gO1xuICAgICAgICBpZiAoZGlmZkRheXMgPCA3KVxuICAgICAgICAgICAgcmV0dXJuIGAke2RpZmZEYXlzfSBkYXkke2RpZmZEYXlzID4gMSA/ICdzJyA6ICcnfSBhZ29gO1xuICAgICAgICByZXR1cm4gdGhlbi50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICB9O1xuICAgIC8vIEJhY2t1cCAmIFJlc3RvcmUgaGFuZGxlcnNcbiAgICBjb25zdCBsb2FkQmFja3VwcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nQmFja3Vwcyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlcGxhY2Ugd2l0aCBhY3R1YWwgQVBJIGNhbGxcbiAgICAgICAgICAgIC8vIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL3NldHRpbmdzL2JhY2t1cHMnKTtcbiAgICAgICAgICAgIC8vIHNldEJhY2t1cHMocmVzcG9uc2UuZGF0YS5iYWNrdXBzKTtcbiAgICAgICAgICAgIC8vIHNldExhc3RCYWNrdXAocmVzcG9uc2UuZGF0YS5sYXN0QmFja3VwKTtcbiAgICAgICAgICAgIC8vIFNpbXVsYXRlIEFQSSBjYWxsIHdpdGggbW9jayBkYXRhXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNTAwKSk7XG4gICAgICAgICAgICBjb25zdCBtb2NrQmFja3VwcyA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogJ2JhY2t1cF8yMDI0XzAxXzE1XzAyMDAwMC5zcWwnLFxuICAgICAgICAgICAgICAgICAgICBzaXplOiAnNDUuMiBNQicsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxMDAwICogNjAgKiA2MCAqIDI0KS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkX2J5OiAnU3lzdGVtIChBdXRvbWF0aWMpJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY29tcGxldGVkJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2F1dG9tYXRpYycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogJ2JhY2t1cF8yMDI0XzAxXzE0XzAyMDAwMC5zcWwnLFxuICAgICAgICAgICAgICAgICAgICBzaXplOiAnNDQuOCBNQicsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxMDAwICogNjAgKiA2MCAqIDQ4KS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkX2J5OiAnU3lzdGVtIChBdXRvbWF0aWMpJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnY29tcGxldGVkJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2F1dG9tYXRpYycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogJ2JhY2t1cF8yMDI0XzAxXzEzXzE1MzAwMC5zcWwnLFxuICAgICAgICAgICAgICAgICAgICBzaXplOiAnNDQuNSBNQicsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxMDAwICogNjAgKiA2MCAqIDcyKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkX2J5OiAnQWRtaW4gVXNlcicsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NvbXBsZXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdtYW51YWwnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogNCxcbiAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6ICdiYWNrdXBfMjAyNF8wMV8xM18wMjAwMDAuc3FsJyxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogJzQ0LjMgTUInLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTAwMCAqIDYwICogNjAgKiA3MikudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZF9ieTogJ1N5c3RlbSAoQXV0b21hdGljKScsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NvbXBsZXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdhdXRvbWF0aWMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogNSxcbiAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6ICdiYWNrdXBfMjAyNF8wMV8xMl8wMjAwMDAuc3FsJyxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogJzQzLjkgTUInLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTAwMCAqIDYwICogNjAgKiA5NikudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZF9ieTogJ1N5c3RlbSAoQXV0b21hdGljKScsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2NvbXBsZXRlZCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdhdXRvbWF0aWMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgc2V0QmFja3Vwcyhtb2NrQmFja3Vwcyk7XG4gICAgICAgICAgICBzZXRMYXN0QmFja3VwKG1vY2tCYWNrdXBzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGJhY2t1cHM6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gbG9hZCBiYWNrdXBzJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc0xvYWRpbmdCYWNrdXBzKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ3JlYXRlQmFja3VwID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRJc0NyZWF0aW5nQmFja3VwKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gYXdhaXQgYXBpLnBvc3QoJy9zZXR0aW5ncy9iYWNrdXBzL2NyZWF0ZScpO1xuICAgICAgICAgICAgLy8gU2ltdWxhdGUgQVBJIGNhbGxcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAzMDAwKSk7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnQmFja3VwIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICBsb2FkQmFja3VwcygpOyAvLyBSZWxvYWQgYmFja3VwIGxpc3RcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIGNyZWF0ZSBiYWNrdXAuIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc0NyZWF0aW5nQmFja3VwKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlRG93bmxvYWRCYWNrdXAgPSBhc3luYyAoYmFja3VwKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBSZXBsYWNlIHdpdGggYWN0dWFsIEFQSSBjYWxsXG4gICAgICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvYXBpL3NldHRpbmdzL2JhY2t1cHMvJHtiYWNrdXAuaWR9L2Rvd25sb2FkYDtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsIGBEb3dubG9hZGluZyAke2JhY2t1cC5maWxlbmFtZX0uLi5gKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIGRvd25sb2FkIGJhY2t1cCcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVSZXN0b3JlQmFja3VwID0gYXN5bmMgKGJhY2t1cCkgPT4ge1xuICAgICAgICBzZXRSZXN0b3JlQ29uZmlybWF0aW9uKGJhY2t1cCk7XG4gICAgfTtcbiAgICBjb25zdCBjb25maXJtUmVzdG9yZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFyZXN0b3JlQ29uZmlybWF0aW9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gYXdhaXQgYXBpLnBvc3QoYC9zZXR0aW5ncy9iYWNrdXBzLyR7cmVzdG9yZUNvbmZpcm1hdGlvbi5pZH0vcmVzdG9yZWApO1xuICAgICAgICAgICAgLy8gU2ltdWxhdGUgQVBJIGNhbGxcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDAwKSk7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnRGF0YWJhc2UgcmVzdG9yZWQgc3VjY2Vzc2Z1bGx5LiBQbGVhc2UgcmVmcmVzaCB0aGUgcGFnZS4nKTtcbiAgICAgICAgICAgIHNldFJlc3RvcmVDb25maXJtYXRpb24obnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byByZXN0b3JlIGJhY2t1cC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlRGVsZXRlQmFja3VwID0gYXN5bmMgKGJhY2t1cCkgPT4ge1xuICAgICAgICBpZiAoIWNvbmZpcm0oYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgYmFja3VwIFwiJHtiYWNrdXAuZmlsZW5hbWV9XCI/YCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gYXdhaXQgYXBpLmRlbGV0ZShgL3NldHRpbmdzL2JhY2t1cHMvJHtiYWNrdXAuaWR9YCk7XG4gICAgICAgICAgICBzZXRCYWNrdXBzKGJhY2t1cHMuZmlsdGVyKGIgPT4gYi5pZCAhPT0gYmFja3VwLmlkKSk7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnQmFja3VwIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBkZWxldGUgYmFja3VwJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVNhdmVCYWNrdXBTZXR0aW5ncyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0SXNTYXZpbmcodHJ1ZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBSZXBsYWNlIHdpdGggYWN0dWFsIEFQSSBjYWxsXG4gICAgICAgICAgICAvLyBhd2FpdCBhcGkucG9zdCgnL3NldHRpbmdzL2JhY2t1cC1zZXR0aW5ncycsIGJhY2t1cFNldHRpbmdzKTtcbiAgICAgICAgICAgIC8vIFNpbXVsYXRlIEFQSSBjYWxsXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ0JhY2t1cCBzZXR0aW5ncyBzYXZlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIHNhdmUgYmFja3VwIHNldHRpbmdzLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNTYXZpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBJbnRlZ3JhdGlvbnMgaGFuZGxlcnNcbiAgICBjb25zdCBsb2FkSW50ZWdyYXRpb25zID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvc2V0dGluZ3MvaW50ZWdyYXRpb25zJyk7XG4gICAgICAgICAgICAvLyBzZXRJbnRlZ3JhdGlvbnMocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAvLyBTaW11bGF0ZSBBUEkgY2FsbCB3aXRoIG1vY2sgZGF0YVxuICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDUwMCkpO1xuICAgICAgICAgICAgY29uc3QgbW9ja0ludGVncmF0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnc3RyaXBlJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1N0cmlwZScsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQWNjZXB0IG9ubGluZSBwYXltZW50cyBhbmQgZG9uYXRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdwYXltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogQ3JlZGl0Q2FyZCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnZGlzY29ubmVjdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgaXNDb25maWd1cmVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwYXlwYWwnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnUGF5UGFsJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdQcm9jZXNzIHBheW1lbnRzIHRocm91Z2ggUGF5UGFsJyxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdwYXltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogRG9sbGFyU2lnbixcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnZGlzY29ubmVjdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgaXNDb25maWd1cmVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdtYWlsY2hpbXAnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnTWFpbGNoaW1wJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdFbWFpbCBtYXJrZXRpbmcgYW5kIG5ld3NsZXR0ZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdlbWFpbCcsXG4gICAgICAgICAgICAgICAgICAgIGljb246IE1haWwsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2Nvbm5lY3RlZCcsXG4gICAgICAgICAgICAgICAgICAgIGlzQ29uZmlndXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXBpS2V5OiAn4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCiMTIzNCcsXG4gICAgICAgICAgICAgICAgICAgIGxhc3RTeW5jOiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTAwMCAqIDYwICogMzApLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnc2VuZGdyaWQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnU2VuZEdyaWQnLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RyYW5zYWN0aW9uYWwgZW1haWwgc2VydmljZScsXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZW1haWwnLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBTZW5kLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdkaXNjb25uZWN0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBpc0NvbmZpZ3VyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2dvb2dsZS1jYWxlbmRhcicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdHb29nbGUgQ2FsZW5kYXInLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1N5bmMgZXZlbnRzIHdpdGggR29vZ2xlIENhbGVuZGFyJyxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdjYWxlbmRhcicsXG4gICAgICAgICAgICAgICAgICAgIGljb246IENhbGVuZGFyLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjb25uZWN0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBpc0NvbmZpZ3VyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3RTeW5jOiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTAwMCAqIDYwICogMTUpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnem9vbScsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdab29tJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdWaWRlbyBjb25mZXJlbmNpbmcgZm9yIG9ubGluZSBzZXJ2aWNlcycsXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnY29tbXVuaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGljb246IFZpZGVvLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdkaXNjb25uZWN0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBpc0NvbmZpZ3VyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3NsYWNrJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1NsYWNrJyxcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUZWFtIGNvbW11bmljYXRpb24gYW5kIG5vdGlmaWNhdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2NvbW11bmljYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBNZXNzYWdlU3F1YXJlLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIGlzQ29uZmlndXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgYXBpS2V5OiAn4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCiNTY3OCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAndHdpbGlvJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1R3aWxpbycsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU01TIG5vdGlmaWNhdGlvbnMgYW5kIHJlbWluZGVycycsXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnY29tbXVuaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGljb246IE1lc3NhZ2VTcXVhcmUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ2Rpc2Nvbm5lY3RlZCcsXG4gICAgICAgICAgICAgICAgICAgIGlzQ29uZmlndXJlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBzZXRJbnRlZ3JhdGlvbnMobW9ja0ludGVncmF0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gbG9hZCBpbnRlZ3JhdGlvbnM6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gbG9hZCBpbnRlZ3JhdGlvbnMnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ29uZmlndXJlSW50ZWdyYXRpb24gPSAoaW50ZWdyYXRpb24pID0+IHtcbiAgICAgICAgc2V0Q29uZmlndXJpbmdJbnRlZ3JhdGlvbihpbnRlZ3JhdGlvbik7XG4gICAgICAgIHNldEludGVncmF0aW9uQ29uZmlnKHtcbiAgICAgICAgICAgIGFwaUtleTogaW50ZWdyYXRpb24uYXBpS2V5Py5yZXBsYWNlKC/igKIvZywgJycpIHx8ICcnLFxuICAgICAgICAgICAgYXBpU2VjcmV0OiAnJyxcbiAgICAgICAgICAgIHdlYmhvb2tVcmw6ICcnLFxuICAgICAgICAgICAgYWRkaXRpb25hbFNldHRpbmdzOiBpbnRlZ3JhdGlvbi5jb25maWcgfHwge30sXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRTaG93QXBpS2V5KGZhbHNlKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVNhdmVJbnRlZ3JhdGlvbkNvbmZpZyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFjb25maWd1cmluZ0ludGVncmF0aW9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoIWludGVncmF0aW9uQ29uZmlnLmFwaUtleS50cmltKCkpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnUGxlYXNlIGVudGVyIGFuIEFQSSBrZXknKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRJc1NhdmluZ0ludGVncmF0aW9uKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gYXdhaXQgYXBpLnBvc3QoYC9zZXR0aW5ncy9pbnRlZ3JhdGlvbnMvJHtjb25maWd1cmluZ0ludGVncmF0aW9uLmlkfS9jb25maWd1cmVgLCBpbnRlZ3JhdGlvbkNvbmZpZyk7XG4gICAgICAgICAgICAvLyBTaW11bGF0ZSBBUEkgY2FsbFxuICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBpbnRlZ3JhdGlvbiBzdGF0dXNcbiAgICAgICAgICAgIHNldEludGVncmF0aW9ucyhpbnRlZ3JhdGlvbnMubWFwKGludCA9PiBpbnQuaWQgPT09IGNvbmZpZ3VyaW5nSW50ZWdyYXRpb24uaWRcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uaW50LFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdjb25uZWN0ZWQnLFxuICAgICAgICAgICAgICAgICAgICBpc0NvbmZpZ3VyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGFwaUtleTogJ+KAouKAouKAouKAouKAouKAouKAouKAouKAouKAouKAouKAouKAouKAouKAouKAouKAouKAouKAouKAoicgKyBpbnRlZ3JhdGlvbkNvbmZpZy5hcGlLZXkuc2xpY2UoLTQpLFxuICAgICAgICAgICAgICAgICAgICBsYXN0U3luYzogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IGludCkpO1xuICAgICAgICAgICAgc2V0Q29uZmlndXJpbmdJbnRlZ3JhdGlvbihudWxsKTtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsIGAke2NvbmZpZ3VyaW5nSW50ZWdyYXRpb24ubmFtZX0gY29uZmlndXJlZCBzdWNjZXNzZnVsbHlgKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIHNhdmUgaW50ZWdyYXRpb24gY29uZmlndXJhdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNTYXZpbmdJbnRlZ3JhdGlvbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZURpc2Nvbm5lY3RJbnRlZ3JhdGlvbiA9IGFzeW5jIChpbnRlZ3JhdGlvbikgPT4ge1xuICAgICAgICBpZiAoIWNvbmZpcm0oYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkaXNjb25uZWN0ICR7aW50ZWdyYXRpb24ubmFtZX0/YCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gYXdhaXQgYXBpLnBvc3QoYC9zZXR0aW5ncy9pbnRlZ3JhdGlvbnMvJHtpbnRlZ3JhdGlvbi5pZH0vZGlzY29ubmVjdGApO1xuICAgICAgICAgICAgLy8gU2ltdWxhdGUgQVBJIGNhbGxcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCA1MDApKTtcbiAgICAgICAgICAgIHNldEludGVncmF0aW9ucyhpbnRlZ3JhdGlvbnMubWFwKGludCA9PiBpbnQuaWQgPT09IGludGVncmF0aW9uLmlkXG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmludCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnZGlzY29ubmVjdGVkJyxcbiAgICAgICAgICAgICAgICAgICAgaXNDb25maWd1cmVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYXBpS2V5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIGxhc3RTeW5jOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogaW50KSk7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCBgJHtpbnRlZ3JhdGlvbi5uYW1lfSBkaXNjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5YCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBkaXNjb25uZWN0IGludGVncmF0aW9uJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVRlc3RJbnRlZ3JhdGlvbiA9IGFzeW5jIChpbnRlZ3JhdGlvbikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgLy8gYXdhaXQgYXBpLnBvc3QoYC9zZXR0aW5ncy9pbnRlZ3JhdGlvbnMvJHtpbnRlZ3JhdGlvbi5pZH0vdGVzdGApO1xuICAgICAgICAgICAgLy8gU2ltdWxhdGUgQVBJIGNhbGxcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxNTAwKSk7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCBgJHtpbnRlZ3JhdGlvbi5uYW1lfSBjb25uZWN0aW9uIHRlc3Qgc3VjY2Vzc2Z1bGApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdDb25uZWN0aW9uIHRlc3QgZmFpbGVkLiBQbGVhc2UgY2hlY2sgeW91ciBjb25maWd1cmF0aW9uLicpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRTdGF0dXNJY29uID0gKHN0YXR1cykgPT4ge1xuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSAnY29ubmVjdGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2pzeChDaGVja0NpcmNsZSwgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LXN1Y2Nlc3MtNjAwXCIgfSk7XG4gICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9qc3goWENpcmNsZSwgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LWVycm9yLTYwMFwiIH0pO1xuICAgICAgICAgICAgY2FzZSAnZGlzY29ubmVjdGVkJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9qc3goQWxlcnRDaXJjbGUsIHsgY2xhc3NOYW1lOiBcImgtNSB3LTUgdGV4dC1uZXV0cmFsLTQwMFwiIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRTdGF0dXNCYWRnZSA9IChzdGF0dXMpID0+IHtcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Nvbm5lY3RlZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9qc3goQmFkZ2UsIHsgdmFyaWFudDogXCJzdWNjZXNzXCIsIGNoaWxkcmVuOiBcIkNvbm5lY3RlZFwiIH0pO1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgIHJldHVybiBfanN4KEJhZGdlLCB7IHZhcmlhbnQ6IFwiZXJyb3JcIiwgY2hpbGRyZW46IFwiRXJyb3JcIiB9KTtcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2Nvbm5lY3RlZCc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBfanN4KEJhZGdlLCB7IHZhcmlhbnQ6IFwibmV1dHJhbFwiLCBjaGlsZHJlbjogXCJEaXNjb25uZWN0ZWRcIiB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZ2V0Q2F0ZWdvcnlMYWJlbCA9IChjYXRlZ29yeSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGNhdGVnb3J5KSB7XG4gICAgICAgICAgICBjYXNlICdwYXltZW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1BheW1lbnQgR2F0ZXdheXMnO1xuICAgICAgICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnRW1haWwgU2VydmljZXMnO1xuICAgICAgICAgICAgY2FzZSAnY2FsZW5kYXInOlxuICAgICAgICAgICAgICAgIHJldHVybiAnQ2FsZW5kYXIgU3luYyc7XG4gICAgICAgICAgICBjYXNlICdjb21tdW5pY2F0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0NvbW11bmljYXRpb24nO1xuICAgICAgICAgICAgY2FzZSAnc3RvcmFnZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdTdG9yYWdlJztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdPdGhlcic7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHRhYnMgPSBbXG4gICAgICAgIHsgaWQ6ICdnZW5lcmFsJywgbGFiZWw6ICdHZW5lcmFsJywgaWNvbjogU2V0dGluZ3NJY29uIH0sXG4gICAgICAgIHsgaWQ6ICdjaHVyY2gtaW5mbycsIGxhYmVsOiAnQ2h1cmNoIEluZm9ybWF0aW9uJywgaWNvbjogQnVpbGRpbmcyIH0sXG4gICAgICAgIHsgaWQ6ICdmaW5hbmNlJywgbGFiZWw6ICdGaW5hbmNlIFNldHRpbmdzJywgaWNvbjogRG9sbGFyU2lnbiB9LFxuICAgICAgICB7IGlkOiAnZW1haWwtbm90aWZpY2F0aW9ucycsIGxhYmVsOiAnRW1haWwgJiBOb3RpZmljYXRpb25zJywgaWNvbjogTWFpbCB9LFxuICAgICAgICB7IGlkOiAnc2VjdXJpdHknLCBsYWJlbDogJ1NlY3VyaXR5JywgaWNvbjogU2hpZWxkIH0sXG4gICAgICAgIHsgaWQ6ICdiYWNrdXAnLCBsYWJlbDogJ0JhY2t1cCAmIFJlc3RvcmUnLCBpY29uOiBEYXRhYmFzZSB9LFxuICAgICAgICB7IGlkOiAnaW50ZWdyYXRpb25zJywgbGFiZWw6ICdJbnRlZ3JhdGlvbnMnLCBpY29uOiBQbHVnIH0sXG4gICAgICAgIHsgaWQ6ICdhcmNoaXZlJywgbGFiZWw6ICdBcmNoaXZlIFNldHRpbmdzJywgaWNvbjogQXJjaGl2ZSB9LFxuICAgIF07XG4gICAgY29uc3QgcmVuZGVyVGFiQ29udGVudCA9ICgpID0+IHtcbiAgICAgICAgc3dpdGNoIChhY3RpdmVUYWIpIHtcbiAgICAgICAgICAgIGNhc2UgJ2dlbmVyYWwnOlxuICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJHZW5lcmFsIFNldHRpbmdzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTEgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIkNvbmZpZ3VyZSBhcHBsaWNhdGlvbiBwcmVmZXJlbmNlcyBhbmQgZGlzcGxheSBzZXR0aW5ncy5cIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFwiQXBwbGljYXRpb24gU2V0dGluZ3NcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3goSW5wdXQsIHsgbGFiZWw6IFwiQXBwbGljYXRpb24gTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJNRk1DIFN5c3RlbVwiLCB2YWx1ZTogZ2VuZXJhbFNldHRpbmdzLmFwcE5hbWUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0R2VuZXJhbFNldHRpbmdzKHsgLi4uZ2VuZXJhbFNldHRpbmdzLCBhcHBOYW1lOiBlLnRhcmdldC52YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJUaGUgbmFtZSBkaXNwbGF5ZWQgaW4gdGhlIGFwcGxpY2F0aW9uIGhlYWRlclwiIH0pLCBfanN4KFNlbGVjdCwgeyBsYWJlbDogXCJUaW1lem9uZVwiLCBvcHRpb25zOiB0aW1lem9uZU9wdGlvbnMsIHZhbHVlOiBnZW5lcmFsU2V0dGluZ3MudGltZXpvbmUsIG9uQ2hhbmdlOiAodmFsdWUpID0+IHNldEdlbmVyYWxTZXR0aW5ncyh7IC4uLmdlbmVyYWxTZXR0aW5ncywgdGltZXpvbmU6IHZhbHVlIH0pLCBzZWFyY2hhYmxlOiB0cnVlLCBoZWxwZXJUZXh0OiBcIlNlbGVjdCB5b3VyIGxvY2FsIHRpbWV6b25lXCIgfSksIF9qc3goU2VsZWN0LCB7IGxhYmVsOiBcIkRhdGUgRm9ybWF0XCIsIG9wdGlvbnM6IGRhdGVGb3JtYXRPcHRpb25zLCB2YWx1ZTogZ2VuZXJhbFNldHRpbmdzLmRhdGVGb3JtYXQsIG9uQ2hhbmdlOiAodmFsdWUpID0+IHNldEdlbmVyYWxTZXR0aW5ncyh7IC4uLmdlbmVyYWxTZXR0aW5ncywgZGF0ZUZvcm1hdDogdmFsdWUgfSksIGhlbHBlclRleHQ6IFwiSG93IGRhdGVzIGFyZSBkaXNwbGF5ZWQgdGhyb3VnaG91dCB0aGUgc3lzdGVtXCIgfSksIF9qc3goU2VsZWN0LCB7IGxhYmVsOiBcIkN1cnJlbmN5XCIsIG9wdGlvbnM6IGN1cnJlbmN5T3B0aW9ucywgdmFsdWU6IGdlbmVyYWxTZXR0aW5ncy5jdXJyZW5jeSwgb25DaGFuZ2U6ICh2YWx1ZSkgPT4gc2V0R2VuZXJhbFNldHRpbmdzKHsgLi4uZ2VuZXJhbFNldHRpbmdzLCBjdXJyZW5jeTogdmFsdWUgfSksIHNlYXJjaGFibGU6IHRydWUsIGhlbHBlclRleHQ6IFwiRGVmYXVsdCBjdXJyZW5jeSBmb3IgZmluYW5jaWFsIHRyYW5zYWN0aW9uc1wiIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFwiRGlzcGxheSBTZXR0aW5nc1wiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeChTZWxlY3QsIHsgbGFiZWw6IFwiVGhlbWVcIiwgb3B0aW9uczogdGhlbWVPcHRpb25zLCB2YWx1ZTogZ2VuZXJhbFNldHRpbmdzLnRoZW1lLCBvbkNoYW5nZTogKHZhbHVlKSA9PiBzZXRHZW5lcmFsU2V0dGluZ3MoeyAuLi5nZW5lcmFsU2V0dGluZ3MsIHRoZW1lOiB2YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJDaG9vc2UgeW91ciBwcmVmZXJyZWQgY29sb3IgdGhlbWVcIiB9KSwgX2pzeChTZWxlY3QsIHsgbGFiZWw6IFwiTGFuZ3VhZ2VcIiwgb3B0aW9uczogbGFuZ3VhZ2VPcHRpb25zLCB2YWx1ZTogZ2VuZXJhbFNldHRpbmdzLmxhbmd1YWdlLCBvbkNoYW5nZTogKHZhbHVlKSA9PiBzZXRHZW5lcmFsU2V0dGluZ3MoeyAuLi5nZW5lcmFsU2V0dGluZ3MsIGxhbmd1YWdlOiB2YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJTZWxlY3QgeW91ciBwcmVmZXJyZWQgbGFuZ3VhZ2VcIiB9KSwgX2pzeChJbnB1dCwgeyB0eXBlOiBcIm51bWJlclwiLCBsYWJlbDogXCJJdGVtcyBQZXIgUGFnZVwiLCB2YWx1ZTogZ2VuZXJhbFNldHRpbmdzLml0ZW1zUGVyUGFnZS50b1N0cmluZygpLCBvbkNoYW5nZTogKGUpID0+IHNldEdlbmVyYWxTZXR0aW5ncyh7IC4uLmdlbmVyYWxTZXR0aW5ncywgaXRlbXNQZXJQYWdlOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSkgfHwgMjUgfSksIGhlbHBlclRleHQ6IFwiTnVtYmVyIG9mIGl0ZW1zIHRvIGRpc3BsYXkgaW4gdGFibGVzICgxMC0xMDApXCIsIG1pbjogMTAsIG1heDogMTAwIH0pXSB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBfanN4KEZlYXR1cmVGbGFnQWRtaW5QYW5lbCwge30pIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1lbmQgcHQtNCBib3JkZXItdCBib3JkZXItbmV1dHJhbC0yMDBcIiwgY2hpbGRyZW46IF9qc3goQnV0dG9uLCB7IG9uQ2xpY2s6IGhhbmRsZVNhdmVHZW5lcmFsU2V0dGluZ3MsIGxvYWRpbmc6IGlzU2F2aW5nLCBkaXNhYmxlZDogaXNTYXZpbmcsIGNoaWxkcmVuOiBcIlNhdmUgQ2hhbmdlc1wiIH0pIH0pXSB9KSk7XG4gICAgICAgICAgICBjYXNlICdjaHVyY2gtaW5mbyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkNodXJjaCBJbmZvcm1hdGlvblwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJtdC0xIHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJNYW5hZ2UgeW91ciBjaHVyY2gncyBiYXNpYyBpbmZvcm1hdGlvbiBhbmQgY29udGFjdCBkZXRhaWxzLlwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMCBib3JkZXItYiBib3JkZXItbmV1dHJhbC0yMDAgcGItMlwiLCBjaGlsZHJlbjogXCJCYXNpYyBJbmZvcm1hdGlvblwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeChJbnB1dCwgeyBsYWJlbDogXCJDaHVyY2ggTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJNeSBGaXJzdCBNaXJhY2xlIENodXJjaFwiLCB2YWx1ZTogY2h1cmNoSW5mby5jaHVyY2hOYW1lLCBvbkNoYW5nZTogKGUpID0+IHNldENodXJjaEluZm8oeyAuLi5jaHVyY2hJbmZvLCBjaHVyY2hOYW1lOiBlLnRhcmdldC52YWx1ZSB9KSwgcmVxdWlyZWQ6IHRydWUsIGhlbHBlclRleHQ6IFwiT2ZmaWNpYWwgbmFtZSBvZiB5b3VyIGNodXJjaFwiIH0pLCBfanN4KElucHV0LCB7IGxhYmVsOiBcIkRlbm9taW5hdGlvblwiLCBwbGFjZWhvbGRlcjogXCJOb24tZGVub21pbmF0aW9uYWxcIiwgdmFsdWU6IGNodXJjaEluZm8uZGVub21pbmF0aW9uLCBvbkNoYW5nZTogKGUpID0+IHNldENodXJjaEluZm8oeyAuLi5jaHVyY2hJbmZvLCBkZW5vbWluYXRpb246IGUudGFyZ2V0LnZhbHVlIH0pLCBoZWxwZXJUZXh0OiBcIkNodXJjaCBkZW5vbWluYXRpb24gb3IgYWZmaWxpYXRpb25cIiB9KSwgX2pzeChJbnB1dCwgeyB0eXBlOiBcIm51bWJlclwiLCBsYWJlbDogXCJGb3VuZGVkIFllYXJcIiwgcGxhY2Vob2xkZXI6IFwiMjAxMFwiLCB2YWx1ZTogY2h1cmNoSW5mby5mb3VuZGVkWWVhciwgb25DaGFuZ2U6IChlKSA9PiBzZXRDaHVyY2hJbmZvKHsgLi4uY2h1cmNoSW5mbywgZm91bmRlZFllYXI6IGUudGFyZ2V0LnZhbHVlIH0pLCBtaW46IDE5MDAsIG1heDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBoZWxwZXJUZXh0OiBcIlllYXIgdGhlIGNodXJjaCB3YXMgZXN0YWJsaXNoZWRcIiB9KV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTIwMCBwYi0yXCIsIGNoaWxkcmVuOiBcIkNvbnRhY3QgSW5mb3JtYXRpb25cIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibWQ6Y29sLXNwYW4tMlwiLCBjaGlsZHJlbjogX2pzeChJbnB1dCwgeyBsYWJlbDogXCJBZGRyZXNzXCIsIHBsYWNlaG9sZGVyOiBcIjEyMyBDaHVyY2ggU3RyZWV0LCBNYW5pbGEsIFBoaWxpcHBpbmVzXCIsIHZhbHVlOiBjaHVyY2hJbmZvLmFkZHJlc3MsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Q2h1cmNoSW5mbyh7IC4uLmNodXJjaEluZm8sIGFkZHJlc3M6IGUudGFyZ2V0LnZhbHVlIH0pLCBoZWxwZXJUZXh0OiBcIlBoeXNpY2FsIGFkZHJlc3Mgb2YgdGhlIGNodXJjaFwiIH0pIH0pLCBfanN4KElucHV0LCB7IHR5cGU6IFwidGVsXCIsIGxhYmVsOiBcIlBob25lXCIsIHBsYWNlaG9sZGVyOiBcIis2MyA5MTIgMzQ1IDY3ODlcIiwgdmFsdWU6IGNodXJjaEluZm8ucGhvbmUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Q2h1cmNoSW5mbyh7IC4uLmNodXJjaEluZm8sIHBob25lOiBlLnRhcmdldC52YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJQcmltYXJ5IGNvbnRhY3QgcGhvbmUgbnVtYmVyXCIgfSksIF9qc3goSW5wdXQsIHsgdHlwZTogXCJlbWFpbFwiLCBsYWJlbDogXCJFbWFpbFwiLCBwbGFjZWhvbGRlcjogXCJpbmZvQG1mbWMuY2h1cmNoXCIsIHZhbHVlOiBjaHVyY2hJbmZvLmVtYWlsLCBvbkNoYW5nZTogKGUpID0+IHNldENodXJjaEluZm8oeyAuLi5jaHVyY2hJbmZvLCBlbWFpbDogZS50YXJnZXQudmFsdWUgfSksIGhlbHBlclRleHQ6IFwiUHJpbWFyeSBjb250YWN0IGVtYWlsIGFkZHJlc3NcIiB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtZDpjb2wtc3Bhbi0yXCIsIGNoaWxkcmVuOiBfanN4KElucHV0LCB7IHR5cGU6IFwidXJsXCIsIGxhYmVsOiBcIldlYnNpdGVcIiwgcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly93d3cubWZtYy5jaHVyY2hcIiwgdmFsdWU6IGNodXJjaEluZm8ud2Vic2l0ZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRDaHVyY2hJbmZvKHsgLi4uY2h1cmNoSW5mbywgd2Vic2l0ZTogZS50YXJnZXQudmFsdWUgfSksIGhlbHBlclRleHQ6IFwiQ2h1cmNoIHdlYnNpdGUgVVJMXCIgfSkgfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMCBib3JkZXItYiBib3JkZXItbmV1dHJhbC0yMDAgcGItMlwiLCBjaGlsZHJlbjogXCJTb2NpYWwgTWVkaWFcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3goSW5wdXQsIHsgdHlwZTogXCJ1cmxcIiwgbGFiZWw6IFwiRmFjZWJvb2tcIiwgcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly9mYWNlYm9vay5jb20vbWZtY1wiLCB2YWx1ZTogY2h1cmNoSW5mby5mYWNlYm9vaywgb25DaGFuZ2U6IChlKSA9PiBzZXRDaHVyY2hJbmZvKHsgLi4uY2h1cmNoSW5mbywgZmFjZWJvb2s6IGUudGFyZ2V0LnZhbHVlIH0pLCBoZWxwZXJUZXh0OiBcIkZhY2Vib29rIHBhZ2UgVVJMXCIgfSksIF9qc3goSW5wdXQsIHsgdHlwZTogXCJ1cmxcIiwgbGFiZWw6IFwiVHdpdHRlclwiLCBwbGFjZWhvbGRlcjogXCJodHRwczovL3R3aXR0ZXIuY29tL21mbWNcIiwgdmFsdWU6IGNodXJjaEluZm8udHdpdHRlciwgb25DaGFuZ2U6IChlKSA9PiBzZXRDaHVyY2hJbmZvKHsgLi4uY2h1cmNoSW5mbywgdHdpdHRlcjogZS50YXJnZXQudmFsdWUgfSksIGhlbHBlclRleHQ6IFwiVHdpdHRlciBwcm9maWxlIFVSTFwiIH0pLCBfanN4KElucHV0LCB7IHR5cGU6IFwidXJsXCIsIGxhYmVsOiBcIkluc3RhZ3JhbVwiLCBwbGFjZWhvbGRlcjogXCJodHRwczovL2luc3RhZ3JhbS5jb20vbWZtY1wiLCB2YWx1ZTogY2h1cmNoSW5mby5pbnN0YWdyYW0sIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Q2h1cmNoSW5mbyh7IC4uLmNodXJjaEluZm8sIGluc3RhZ3JhbTogZS50YXJnZXQudmFsdWUgfSksIGhlbHBlclRleHQ6IFwiSW5zdGFncmFtIHByb2ZpbGUgVVJMXCIgfSksIF9qc3goSW5wdXQsIHsgdHlwZTogXCJ1cmxcIiwgbGFiZWw6IFwiWW91VHViZVwiLCBwbGFjZWhvbGRlcjogXCJodHRwczovL3lvdXR1YmUuY29tL0BtZm1jXCIsIHZhbHVlOiBjaHVyY2hJbmZvLnlvdXR1YmUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Q2h1cmNoSW5mbyh7IC4uLmNodXJjaEluZm8sIHlvdXR1YmU6IGUudGFyZ2V0LnZhbHVlIH0pLCBoZWxwZXJUZXh0OiBcIllvdVR1YmUgY2hhbm5lbCBVUkxcIiB9KV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTIwMCBwYi0yXCIsIGNoaWxkcmVuOiBcIkJyYW5kaW5nXCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTJcIiwgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwXCIsIGNoaWxkcmVuOiBcIkNodXJjaCBMb2dvXCIgfSksIGxvZ29QcmV2aWV3IHx8IGNodXJjaEluZm8ubG9nbyA/IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyZWxhdGl2ZSBpbmxpbmUtYmxvY2tcIiwgY2hpbGRyZW46IFtfanN4KFwiaW1nXCIsIHsgc3JjOiBsb2dvUHJldmlldyB8fCBjaHVyY2hJbmZvLmxvZ28gfHwgJycsIGFsdDogXCJDaHVyY2ggbG9nbyBwcmV2aWV3XCIsIGNsYXNzTmFtZTogXCJ3LTMyIGgtMzIgb2JqZWN0LWNvbnRhaW4gYm9yZGVyLTIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtbGcgYmctbmV1dHJhbC01MFwiIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogaGFuZGxlUmVtb3ZlTG9nbywgY2xhc3NOYW1lOiBcImFic29sdXRlIC10b3AtMiAtcmlnaHQtMiBiZy1lcnJvci02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWZ1bGwgcC0xIGhvdmVyOmJnLWVycm9yLTcwMCB0cmFuc2l0aW9uLWNvbG9yc1wiLCBcImFyaWEtbGFiZWxcIjogXCJSZW1vdmUgbG9nb1wiLCBjaGlsZHJlbjogX2pzeChYLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSkgfSldIH0pKSA6IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHctMzIgaC0zMiBib3JkZXItMiBib3JkZXItZGFzaGVkIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkLWxnIGJnLW5ldXRyYWwtNTBcIiwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChVcGxvYWQsIHsgY2xhc3NOYW1lOiBcIm14LWF1dG8gaC04IHctOCB0ZXh0LW5ldXRyYWwtNDAwXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTEgdGV4dC14cyB0ZXh0LW5ldXRyYWwtNTAwXCIsIGNoaWxkcmVuOiBcIk5vIGxvZ29cIiB9KV0gfSkgfSkpLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImN1cnNvci1wb2ludGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJmaWxlXCIsIGFjY2VwdDogXCJpbWFnZS8qXCIsIG9uQ2hhbmdlOiBoYW5kbGVMb2dvVXBsb2FkLCBjbGFzc05hbWU6IFwiaGlkZGVuXCIgfSksIF9qc3hzKFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcHgtNCBweS0yIGJvcmRlciBib3JkZXItbmV1dHJhbC0zMDAgcm91bmRlZC1sZyB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC03MDAgYmctd2hpdGUgaG92ZXI6YmctbmV1dHJhbC01MCB0cmFuc2l0aW9uLWNvbG9yc1wiLCBjaGlsZHJlbjogW19qc3goVXBsb2FkLCB7IGNsYXNzTmFtZTogXCJtci0yIGgtNCB3LTRcIiB9KSwgXCJVcGxvYWQgTG9nb1wiXSB9KV0gfSkgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteHMgdGV4dC1uZXV0cmFsLTUwMFwiLCBjaGlsZHJlbjogXCJSZWNvbW1lbmRlZDogU3F1YXJlIGltYWdlLCBtYXggMk1CXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTJcIiwgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcInByaW1hcnlDb2xvclwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwXCIsIGNoaWxkcmVuOiBcIlByaW1hcnkgQ29sb3JcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNvbG9yXCIsIGlkOiBcInByaW1hcnlDb2xvclwiLCB2YWx1ZTogY2h1cmNoSW5mby5wcmltYXJ5Q29sb3IsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Q2h1cmNoSW5mbyh7IC4uLmNodXJjaEluZm8sIHByaW1hcnlDb2xvcjogZS50YXJnZXQudmFsdWUgfSksIGNsYXNzTmFtZTogXCJoLTEyIHctMjAgcm91bmRlZC1sZyBib3JkZXItMiBib3JkZXItbmV1dHJhbC0zMDAgY3Vyc29yLXBvaW50ZXJcIiB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTFcIiwgY2hpbGRyZW46IF9qc3goSW5wdXQsIHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBjaHVyY2hJbmZvLnByaW1hcnlDb2xvciwgb25DaGFuZ2U6IChlKSA9PiBzZXRDaHVyY2hJbmZvKHsgLi4uY2h1cmNoSW5mbywgcHJpbWFyeUNvbG9yOiBlLnRhcmdldC52YWx1ZSB9KSwgcGxhY2Vob2xkZXI6IFwiIzBlYTVlOVwiLCBwYXR0ZXJuOiBcIl4jWzAtOUEtRmEtZl17Nn0kXCIgfSkgfSldIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtbmV1dHJhbC01MDBcIiwgY2hpbGRyZW46IFwiUHJpbWFyeSBicmFuZCBjb2xvciB1c2VkIHRocm91Z2hvdXQgdGhlIHN5c3RlbVwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtdC00IHAtNCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgYmctbmV1dHJhbC01MFwiLCBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTcwMCBtYi0yXCIsIGNoaWxkcmVuOiBcIlByZXZpZXc6XCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctMTIgaC0xMiByb3VuZGVkLWxnIHNoYWRvdy1zbVwiLCBzdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6IGNodXJjaEluZm8ucHJpbWFyeUNvbG9yIH0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidy0xMiBoLTEyIHJvdW5kZWQtbGcgc2hhZG93LXNtIG9wYWNpdHktNzVcIiwgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiBjaHVyY2hJbmZvLnByaW1hcnlDb2xvciB9IH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctMTIgaC0xMiByb3VuZGVkLWxnIHNoYWRvdy1zbSBvcGFjaXR5LTUwXCIsIHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogY2h1cmNoSW5mby5wcmltYXJ5Q29sb3IgfSB9KV0gfSldIH0pXSB9KV0gfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1lbmQgcHQtNCBib3JkZXItdCBib3JkZXItbmV1dHJhbC0yMDBcIiwgY2hpbGRyZW46IF9qc3goQnV0dG9uLCB7IG9uQ2xpY2s6IGhhbmRsZVNhdmVDaHVyY2hJbmZvLCBsb2FkaW5nOiBpc1NhdmluZywgZGlzYWJsZWQ6IGlzU2F2aW5nLCBjaGlsZHJlbjogXCJTYXZlIENoYW5nZXNcIiB9KSB9KV0gfSkpO1xuICAgICAgICAgICAgY2FzZSAnZmluYW5jZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkZpbmFuY2UgU2V0dGluZ3NcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMSB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiQ29uZmlndXJlIGZpbmFuY2UtcmVsYXRlZCBzZXR0aW5ncywgY2F0ZWdvcmllcywgYW5kIGFwcHJvdmFsIHdvcmtmbG93cy5cIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFwiRGVmYXVsdCBTZXR0aW5nc1wiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeChTZWxlY3QsIHsgbGFiZWw6IFwiRGVmYXVsdCBPZmZlcmluZyBUeXBlXCIsIG9wdGlvbnM6IG9mZmVyaW5nVHlwZXMuZmlsdGVyKG90ID0+IG90LmlzX2FjdGl2ZSkubWFwKG90ID0+ICh7IHZhbHVlOiBvdC5pZC50b1N0cmluZygpLCBsYWJlbDogb3QubmFtZSB9KSksIHZhbHVlOiBmaW5hbmNlU2V0dGluZ3MuZGVmYXVsdE9mZmVyaW5nVHlwZSwgb25DaGFuZ2U6ICh2YWx1ZSkgPT4gc2V0RmluYW5jZVNldHRpbmdzKHsgLi4uZmluYW5jZVNldHRpbmdzLCBkZWZhdWx0T2ZmZXJpbmdUeXBlOiB2YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJEZWZhdWx0IG9mZmVyaW5nIHR5cGUgZm9yIG5ldyBvZmZlcmluZ3NcIiB9KSwgX2pzeChTZWxlY3QsIHsgbGFiZWw6IFwiRGVmYXVsdCBFeHBlbnNlIENhdGVnb3J5XCIsIG9wdGlvbnM6IGV4cGVuc2VDYXRlZ29yaWVzLmZpbHRlcihlYyA9PiBlYy5pc19hY3RpdmUpLm1hcChlYyA9PiAoeyB2YWx1ZTogZWMuaWQudG9TdHJpbmcoKSwgbGFiZWw6IGVjLm5hbWUgfSkpLCB2YWx1ZTogZmluYW5jZVNldHRpbmdzLmRlZmF1bHRFeHBlbnNlQ2F0ZWdvcnksIG9uQ2hhbmdlOiAodmFsdWUpID0+IHNldEZpbmFuY2VTZXR0aW5ncyh7IC4uLmZpbmFuY2VTZXR0aW5ncywgZGVmYXVsdEV4cGVuc2VDYXRlZ29yeTogdmFsdWUgfSksIGhlbHBlclRleHQ6IFwiRGVmYXVsdCBjYXRlZ29yeSBmb3IgbmV3IGV4cGVuc2VzXCIgfSksIF9qc3goU2VsZWN0LCB7IGxhYmVsOiBcIkRlZmF1bHQgRnVuZFwiLCBvcHRpb25zOiBmdW5kcy5maWx0ZXIoZiA9PiBmLmlzX2FjdGl2ZSkubWFwKGYgPT4gKHsgdmFsdWU6IGYuaWQudG9TdHJpbmcoKSwgbGFiZWw6IGYubmFtZSB9KSksIHZhbHVlOiBmaW5hbmNlU2V0dGluZ3MuZGVmYXVsdEZ1bmQsIG9uQ2hhbmdlOiAodmFsdWUpID0+IHNldEZpbmFuY2VTZXR0aW5ncyh7IC4uLmZpbmFuY2VTZXR0aW5ncywgZGVmYXVsdEZ1bmQ6IHZhbHVlIH0pLCBoZWxwZXJUZXh0OiBcIkRlZmF1bHQgZnVuZCBmb3IgdHJhbnNhY3Rpb25zXCIgfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMCBib3JkZXItYiBib3JkZXItbmV1dHJhbC0yMDAgcGItMlwiLCBjaGlsZHJlbjogXCJCdWRnZXQgUGVyaW9kIFNldHRpbmdzXCIgfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogX2pzeChTZWxlY3QsIHsgbGFiZWw6IFwiRmlzY2FsIFllYXIgU3RhcnQgTW9udGhcIiwgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnMScsIGxhYmVsOiAnSmFudWFyeScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzInLCBsYWJlbDogJ0ZlYnJ1YXJ5JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnMycsIGxhYmVsOiAnTWFyY2gnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICc0JywgbGFiZWw6ICdBcHJpbCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzUnLCBsYWJlbDogJ01heScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJzYnLCBsYWJlbDogJ0p1bmUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICc3JywgbGFiZWw6ICdKdWx5JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnOCcsIGxhYmVsOiAnQXVndXN0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnOScsIGxhYmVsOiAnU2VwdGVtYmVyJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnMTAnLCBsYWJlbDogJ09jdG9iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICcxMScsIGxhYmVsOiAnTm92ZW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICcxMicsIGxhYmVsOiAnRGVjZW1iZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSwgdmFsdWU6IGZpbmFuY2VTZXR0aW5ncy5maXNjYWxZZWFyU3RhcnQsIG9uQ2hhbmdlOiAodmFsdWUpID0+IHNldEZpbmFuY2VTZXR0aW5ncyh7IC4uLmZpbmFuY2VTZXR0aW5ncywgZmlzY2FsWWVhclN0YXJ0OiB2YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJNb250aCB3aGVuIHlvdXIgZmlzY2FsIHllYXIgYmVnaW5zXCIgfSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTIwMCBwYi0yXCIsIGNoaWxkcmVuOiBcIkFwcHJvdmFsIFdvcmtmbG93IFNldHRpbmdzXCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDogXCJyZXF1aXJlQXBwcm92YWxcIiwgY2hlY2tlZDogZmluYW5jZVNldHRpbmdzLnJlcXVpcmVBcHByb3ZhbCwgb25DaGFuZ2U6IChlKSA9PiBzZXRGaW5hbmNlU2V0dGluZ3MoeyAuLi5maW5hbmNlU2V0dGluZ3MsIHJlcXVpcmVBcHByb3ZhbDogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1wcmltYXJ5LTYwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkXCIgfSksIF9qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwicmVxdWlyZUFwcHJvdmFsXCIsIGNsYXNzTmFtZTogXCJtbC0yIGJsb2NrIHRleHQtc20gdGV4dC1uZXV0cmFsLTcwMFwiLCBjaGlsZHJlbjogXCJSZXF1aXJlIGFwcHJvdmFsIGZvciBleHBlbnNlc1wiIH0pXSB9KSwgZmluYW5jZVNldHRpbmdzLnJlcXVpcmVBcHByb3ZhbCAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtbC02XCIsIGNoaWxkcmVuOiBfanN4KElucHV0LCB7IHR5cGU6IFwibnVtYmVyXCIsIGxhYmVsOiBcIkFwcHJvdmFsIFRocmVzaG9sZFwiLCB2YWx1ZTogZmluYW5jZVNldHRpbmdzLmFwcHJvdmFsVGhyZXNob2xkLnRvU3RyaW5nKCksIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RmluYW5jZVNldHRpbmdzKHsgLi4uZmluYW5jZVNldHRpbmdzLCBhcHByb3ZhbFRocmVzaG9sZDogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgfHwgMCB9KSwgaGVscGVyVGV4dDogXCJFeHBlbnNlcyBhYm92ZSB0aGlzIGFtb3VudCByZXF1aXJlIGFwcHJvdmFsXCIsIG1pbjogMCwgc3RlcDogMTAwIH0pIH0pKV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIk9mZmVyaW5nIFR5cGVzXCIgfSksIF9qc3goQnV0dG9uLCB7IHNpemU6IFwic21cIiwgb25DbGljazogKCkgPT4gc2V0U2hvd0FkZE9mZmVyaW5nVHlwZSghc2hvd0FkZE9mZmVyaW5nVHlwZSksIGljb246IF9qc3goUGx1cywgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBjaGlsZHJlbjogXCJBZGQgT2ZmZXJpbmcgVHlwZVwiIH0pXSB9KSwgc2hvd0FkZE9mZmVyaW5nVHlwZSAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctbmV1dHJhbC01MCBwLTQgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHNwYWNlLXktM1wiLCBjaGlsZHJlbjogW19qc3goSW5wdXQsIHsgbGFiZWw6IFwiTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJlLmcuLCBUaXRoZXMsIFNwZWNpYWwgT2ZmZXJpbmdcIiwgdmFsdWU6IG5ld09mZmVyaW5nVHlwZS5uYW1lLCBvbkNoYW5nZTogKGUpID0+IHNldE5ld09mZmVyaW5nVHlwZSh7IC4uLm5ld09mZmVyaW5nVHlwZSwgbmFtZTogZS50YXJnZXQudmFsdWUgfSkgfSksIF9qc3goSW5wdXQsIHsgbGFiZWw6IFwiRGVzY3JpcHRpb24gKE9wdGlvbmFsKVwiLCBwbGFjZWhvbGRlcjogXCJCcmllZiBkZXNjcmlwdGlvblwiLCB2YWx1ZTogbmV3T2ZmZXJpbmdUeXBlLmRlc2NyaXB0aW9uLCBvbkNoYW5nZTogKGUpID0+IHNldE5ld09mZmVyaW5nVHlwZSh7IC4uLm5ld09mZmVyaW5nVHlwZSwgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeHMoQnV0dG9uLCB7IHNpemU6IFwic21cIiwgb25DbGljazogaGFuZGxlQWRkT2ZmZXJpbmdUeXBlLCBjaGlsZHJlbjogW19qc3goQ2hlY2ssIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMVwiIH0pLCBcIlNhdmVcIl0gfSksIF9qc3goQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJvdXRsaW5lXCIsIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0FkZE9mZmVyaW5nVHlwZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld09mZmVyaW5nVHlwZSh7IG5hbWU6ICcnLCBkZXNjcmlwdGlvbjogJycgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgY2hpbGRyZW46IFwiQ2FuY2VsXCIgfSldIH0pXSB9KSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktMlwiLCBjaGlsZHJlbjogW29mZmVyaW5nVHlwZXMubWFwKChvZmZlcmluZ1R5cGUpID0+IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTMgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCByb3VuZGVkLWxnIGhvdmVyOnNoYWRvdy1zbSB0cmFuc2l0aW9uLXNoYWRvd1wiLCBjaGlsZHJlbjogZWRpdGluZ09mZmVyaW5nVHlwZT8uaWQgPT09IG9mZmVyaW5nVHlwZS5pZCA/IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTEgc3BhY2UteS0yXCIsIGNoaWxkcmVuOiBbX2pzeChJbnB1dCwgeyB2YWx1ZTogZWRpdGluZ09mZmVyaW5nVHlwZS5uYW1lLCBvbkNoYW5nZTogKGUpID0+IHNldEVkaXRpbmdPZmZlcmluZ1R5cGUoeyAuLi5lZGl0aW5nT2ZmZXJpbmdUeXBlLCBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KSB9KSwgX2pzeChJbnB1dCwgeyB2YWx1ZTogZWRpdGluZ09mZmVyaW5nVHlwZS5kZXNjcmlwdGlvbiB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiBzZXRFZGl0aW5nT2ZmZXJpbmdUeXBlKHsgLi4uZWRpdGluZ09mZmVyaW5nVHlwZSwgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlIH0pLCBwbGFjZWhvbGRlcjogXCJEZXNjcmlwdGlvblwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChCdXR0b24sIHsgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVVcGRhdGVPZmZlcmluZ1R5cGUob2ZmZXJpbmdUeXBlLmlkLCBlZGl0aW5nT2ZmZXJpbmdUeXBlKSwgY2hpbGRyZW46IFwiU2F2ZVwiIH0pLCBfanN4KEJ1dHRvbiwgeyBzaXplOiBcInNtXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiBzZXRFZGl0aW5nT2ZmZXJpbmdUeXBlKG51bGwpLCBjaGlsZHJlbjogXCJDYW5jZWxcIiB9KV0gfSldIH0pKSA6IChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTFcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IG9mZmVyaW5nVHlwZS5uYW1lIH0pLCBfanN4KEJhZGdlLCB7IHZhcmlhbnQ6IG9mZmVyaW5nVHlwZS5pc19hY3RpdmUgPyAnc3VjY2VzcycgOiAnbmV1dHJhbCcsIGNoaWxkcmVuOiBvZmZlcmluZ1R5cGUuaXNfYWN0aXZlID8gJ0FjdGl2ZScgOiAnSW5hY3RpdmUnIH0pXSB9KSwgb2ZmZXJpbmdUeXBlLmRlc2NyaXB0aW9uICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDAgbXQtMVwiLCBjaGlsZHJlbjogb2ZmZXJpbmdUeXBlLmRlc2NyaXB0aW9uIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IGhhbmRsZVVwZGF0ZU9mZmVyaW5nVHlwZShvZmZlcmluZ1R5cGUuaWQsIHsgaXNfYWN0aXZlOiAhb2ZmZXJpbmdUeXBlLmlzX2FjdGl2ZSB9KSwgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1wcmltYXJ5LTYwMCBob3Zlcjp0ZXh0LXByaW1hcnktNzAwXCIsIGNoaWxkcmVuOiBvZmZlcmluZ1R5cGUuaXNfYWN0aXZlID8gJ0RlYWN0aXZhdGUnIDogJ0FjdGl2YXRlJyB9KSwgX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHNldEVkaXRpbmdPZmZlcmluZ1R5cGUob2ZmZXJpbmdUeXBlKSwgY2xhc3NOYW1lOiBcInAtMiB0ZXh0LW5ldXRyYWwtNjAwIGhvdmVyOnRleHQtcHJpbWFyeS02MDAgdHJhbnNpdGlvbi1jb2xvcnNcIiwgXCJhcmlhLWxhYmVsXCI6IFwiRWRpdFwiLCBjaGlsZHJlbjogX2pzeChFZGl0MiwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gaGFuZGxlRGVsZXRlT2ZmZXJpbmdUeXBlKG9mZmVyaW5nVHlwZS5pZCksIGNsYXNzTmFtZTogXCJwLTIgdGV4dC1uZXV0cmFsLTYwMCBob3Zlcjp0ZXh0LWVycm9yLTYwMCB0cmFuc2l0aW9uLWNvbG9yc1wiLCBcImFyaWEtbGFiZWxcIjogXCJEZWxldGVcIiwgY2hpbGRyZW46IF9qc3goVHJhc2gyLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSkgfSldIH0pXSB9KSkgfSwgb2ZmZXJpbmdUeXBlLmlkKSkpLCBvZmZlcmluZ1R5cGVzLmxlbmd0aCA9PT0gMCAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNTAwIHRleHQtY2VudGVyIHB5LTRcIiwgY2hpbGRyZW46IFwiTm8gb2ZmZXJpbmcgdHlwZXMgY29uZmlndXJlZC4gQWRkIG9uZSB0byBnZXQgc3RhcnRlZC5cIiB9KSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTIwMCBwYi0yXCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJFeHBlbnNlIENhdGVnb3JpZXNcIiB9KSwgX2pzeChCdXR0b24sIHsgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiAoKSA9PiBzZXRTaG93QWRkRXhwZW5zZUNhdGVnb3J5KCFzaG93QWRkRXhwZW5zZUNhdGVnb3J5KSwgaWNvbjogX2pzeChQbHVzLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIGNoaWxkcmVuOiBcIkFkZCBDYXRlZ29yeVwiIH0pXSB9KSwgc2hvd0FkZEV4cGVuc2VDYXRlZ29yeSAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctbmV1dHJhbC01MCBwLTQgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHNwYWNlLXktM1wiLCBjaGlsZHJlbjogW19qc3goSW5wdXQsIHsgbGFiZWw6IFwiTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJlLmcuLCBVdGlsaXRpZXMsIFNhbGFyaWVzXCIsIHZhbHVlOiBuZXdFeHBlbnNlQ2F0ZWdvcnkubmFtZSwgb25DaGFuZ2U6IChlKSA9PiBzZXROZXdFeHBlbnNlQ2F0ZWdvcnkoeyAuLi5uZXdFeHBlbnNlQ2F0ZWdvcnksIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pIH0pLCBfanN4KElucHV0LCB7IGxhYmVsOiBcIkRlc2NyaXB0aW9uIChPcHRpb25hbClcIiwgcGxhY2Vob2xkZXI6IFwiQnJpZWYgZGVzY3JpcHRpb25cIiwgdmFsdWU6IG5ld0V4cGVuc2VDYXRlZ29yeS5kZXNjcmlwdGlvbiwgb25DaGFuZ2U6IChlKSA9PiBzZXROZXdFeHBlbnNlQ2F0ZWdvcnkoeyAuLi5uZXdFeHBlbnNlQ2F0ZWdvcnksIGRlc2NyaXB0aW9uOiBlLnRhcmdldC52YWx1ZSB9KSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3hzKEJ1dHRvbiwgeyBzaXplOiBcInNtXCIsIG9uQ2xpY2s6IGhhbmRsZUFkZEV4cGVuc2VDYXRlZ29yeSwgY2hpbGRyZW46IFtfanN4KENoZWNrLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00IG1yLTFcIiB9KSwgXCJTYXZlXCJdIH0pLCBfanN4KEJ1dHRvbiwgeyBzaXplOiBcInNtXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dBZGRFeHBlbnNlQ2F0ZWdvcnkoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdFeHBlbnNlQ2F0ZWdvcnkoeyBuYW1lOiAnJywgZGVzY3JpcHRpb246ICcnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGNoaWxkcmVuOiBcIkNhbmNlbFwiIH0pXSB9KV0gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTJcIiwgY2hpbGRyZW46IFtleHBlbnNlQ2F0ZWdvcmllcy5tYXAoKGNhdGVnb3J5KSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLXdoaXRlIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcm91bmRlZC1sZyBob3ZlcjpzaGFkb3ctc20gdHJhbnNpdGlvbi1zaGFkb3dcIiwgY2hpbGRyZW46IGVkaXRpbmdFeHBlbnNlQ2F0ZWdvcnk/LmlkID09PSBjYXRlZ29yeS5pZCA/IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTEgc3BhY2UteS0yXCIsIGNoaWxkcmVuOiBbX2pzeChJbnB1dCwgeyB2YWx1ZTogZWRpdGluZ0V4cGVuc2VDYXRlZ29yeS5uYW1lLCBvbkNoYW5nZTogKGUpID0+IHNldEVkaXRpbmdFeHBlbnNlQ2F0ZWdvcnkoeyAuLi5lZGl0aW5nRXhwZW5zZUNhdGVnb3J5LCBuYW1lOiBlLnRhcmdldC52YWx1ZSB9KSB9KSwgX2pzeChJbnB1dCwgeyB2YWx1ZTogZWRpdGluZ0V4cGVuc2VDYXRlZ29yeS5kZXNjcmlwdGlvbiB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiBzZXRFZGl0aW5nRXhwZW5zZUNhdGVnb3J5KHsgLi4uZWRpdGluZ0V4cGVuc2VDYXRlZ29yeSwgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlIH0pLCBwbGFjZWhvbGRlcjogXCJEZXNjcmlwdGlvblwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChCdXR0b24sIHsgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVVcGRhdGVFeHBlbnNlQ2F0ZWdvcnkoY2F0ZWdvcnkuaWQsIGVkaXRpbmdFeHBlbnNlQ2F0ZWdvcnkpLCBjaGlsZHJlbjogXCJTYXZlXCIgfSksIF9qc3goQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJvdXRsaW5lXCIsIG9uQ2xpY2s6ICgpID0+IHNldEVkaXRpbmdFeHBlbnNlQ2F0ZWdvcnkobnVsbCksIGNoaWxkcmVuOiBcIkNhbmNlbFwiIH0pXSB9KV0gfSkpIDogKF9qc3hzKF9GcmFnbWVudCwgeyBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMVwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogY2F0ZWdvcnkubmFtZSB9KSwgX2pzeChCYWRnZSwgeyB2YXJpYW50OiBjYXRlZ29yeS5pc19hY3RpdmUgPyAnc3VjY2VzcycgOiAnbmV1dHJhbCcsIGNoaWxkcmVuOiBjYXRlZ29yeS5pc19hY3RpdmUgPyAnQWN0aXZlJyA6ICdJbmFjdGl2ZScgfSldIH0pLCBjYXRlZ29yeS5kZXNjcmlwdGlvbiAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwIG10LTFcIiwgY2hpbGRyZW46IGNhdGVnb3J5LmRlc2NyaXB0aW9uIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IGhhbmRsZVVwZGF0ZUV4cGVuc2VDYXRlZ29yeShjYXRlZ29yeS5pZCwgeyBpc19hY3RpdmU6ICFjYXRlZ29yeS5pc19hY3RpdmUgfSksIGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcHJpbWFyeS02MDAgaG92ZXI6dGV4dC1wcmltYXJ5LTcwMFwiLCBjaGlsZHJlbjogY2F0ZWdvcnkuaXNfYWN0aXZlID8gJ0RlYWN0aXZhdGUnIDogJ0FjdGl2YXRlJyB9KSwgX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHNldEVkaXRpbmdFeHBlbnNlQ2F0ZWdvcnkoY2F0ZWdvcnkpLCBjbGFzc05hbWU6IFwicC0yIHRleHQtbmV1dHJhbC02MDAgaG92ZXI6dGV4dC1wcmltYXJ5LTYwMCB0cmFuc2l0aW9uLWNvbG9yc1wiLCBcImFyaWEtbGFiZWxcIjogXCJFZGl0XCIsIGNoaWxkcmVuOiBfanN4KEVkaXQyLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSkgfSksIF9qc3goXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBoYW5kbGVEZWxldGVFeHBlbnNlQ2F0ZWdvcnkoY2F0ZWdvcnkuaWQpLCBjbGFzc05hbWU6IFwicC0yIHRleHQtbmV1dHJhbC02MDAgaG92ZXI6dGV4dC1lcnJvci02MDAgdHJhbnNpdGlvbi1jb2xvcnNcIiwgXCJhcmlhLWxhYmVsXCI6IFwiRGVsZXRlXCIsIGNoaWxkcmVuOiBfanN4KFRyYXNoMiwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pIH0pXSB9KV0gfSkpIH0sIGNhdGVnb3J5LmlkKSkpLCBleHBlbnNlQ2F0ZWdvcmllcy5sZW5ndGggPT09IDAgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTUwMCB0ZXh0LWNlbnRlciBweS00XCIsIGNoaWxkcmVuOiBcIk5vIGV4cGVuc2UgY2F0ZWdvcmllcyBjb25maWd1cmVkLiBBZGQgb25lIHRvIGdldCBzdGFydGVkLlwiIH0pKV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkZ1bmRzXCIgfSksIF9qc3goQnV0dG9uLCB7IHNpemU6IFwic21cIiwgb25DbGljazogKCkgPT4gc2V0U2hvd0FkZEZ1bmQoIXNob3dBZGRGdW5kKSwgaWNvbjogX2pzeChQbHVzLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIGNoaWxkcmVuOiBcIkFkZCBGdW5kXCIgfSldIH0pLCBzaG93QWRkRnVuZCAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctbmV1dHJhbC01MCBwLTQgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHNwYWNlLXktM1wiLCBjaGlsZHJlbjogW19qc3goSW5wdXQsIHsgbGFiZWw6IFwiTmFtZVwiLCBwbGFjZWhvbGRlcjogXCJlLmcuLCBHZW5lcmFsIEZ1bmQsIEJ1aWxkaW5nIEZ1bmRcIiwgdmFsdWU6IG5ld0Z1bmQubmFtZSwgb25DaGFuZ2U6IChlKSA9PiBzZXROZXdGdW5kKHsgLi4ubmV3RnVuZCwgbmFtZTogZS50YXJnZXQudmFsdWUgfSkgfSksIF9qc3goU2VsZWN0LCB7IGxhYmVsOiBcIlR5cGVcIiwgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ3VucmVzdHJpY3RlZCcsIGxhYmVsOiAnVW5yZXN0cmljdGVkJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ3Jlc3RyaWN0ZWQnLCBsYWJlbDogJ1Jlc3RyaWN0ZWQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sIHZhbHVlOiBuZXdGdW5kLnR5cGUsIG9uQ2hhbmdlOiAodmFsdWUpID0+IHNldE5ld0Z1bmQoeyAuLi5uZXdGdW5kLCB0eXBlOiB2YWx1ZSB9KSB9KSwgX2pzeChJbnB1dCwgeyBsYWJlbDogXCJEZXNjcmlwdGlvbiAoT3B0aW9uYWwpXCIsIHBsYWNlaG9sZGVyOiBcIkJyaWVmIGRlc2NyaXB0aW9uXCIsIHZhbHVlOiBuZXdGdW5kLmRlc2NyaXB0aW9uLCBvbkNoYW5nZTogKGUpID0+IHNldE5ld0Z1bmQoeyAuLi5uZXdGdW5kLCBkZXNjcmlwdGlvbjogZS50YXJnZXQudmFsdWUgfSkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4cyhCdXR0b24sIHsgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiBoYW5kbGVBZGRGdW5kLCBjaGlsZHJlbjogW19qc3goQ2hlY2ssIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMVwiIH0pLCBcIlNhdmVcIl0gfSksIF9qc3goQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJvdXRsaW5lXCIsIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0FkZEZ1bmQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdGdW5kKHsgbmFtZTogJycsIHR5cGU6ICd1bnJlc3RyaWN0ZWQnLCBkZXNjcmlwdGlvbjogJycgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgY2hpbGRyZW46IFwiQ2FuY2VsXCIgfSldIH0pXSB9KSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktMlwiLCBjaGlsZHJlbjogW2Z1bmRzLm1hcCgoZnVuZCkgPT4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMyBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtbGcgaG92ZXI6c2hhZG93LXNtIHRyYW5zaXRpb24tc2hhZG93XCIsIGNoaWxkcmVuOiBlZGl0aW5nRnVuZD8uaWQgPT09IGZ1bmQuaWQgPyAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xIHNwYWNlLXktMlwiLCBjaGlsZHJlbjogW19qc3goSW5wdXQsIHsgdmFsdWU6IGVkaXRpbmdGdW5kLm5hbWUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RWRpdGluZ0Z1bmQoeyAuLi5lZGl0aW5nRnVuZCwgbmFtZTogZS50YXJnZXQudmFsdWUgfSkgfSksIF9qc3goU2VsZWN0LCB7IGxhYmVsOiBcIlR5cGVcIiwgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ3VucmVzdHJpY3RlZCcsIGxhYmVsOiAnVW5yZXN0cmljdGVkJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ3Jlc3RyaWN0ZWQnLCBsYWJlbDogJ1Jlc3RyaWN0ZWQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sIHZhbHVlOiBlZGl0aW5nRnVuZC50eXBlLCBvbkNoYW5nZTogKHZhbHVlKSA9PiBzZXRFZGl0aW5nRnVuZCh7IC4uLmVkaXRpbmdGdW5kLCB0eXBlOiB2YWx1ZSB9KSB9KSwgX2pzeChJbnB1dCwgeyB2YWx1ZTogZWRpdGluZ0Z1bmQuZGVzY3JpcHRpb24gfHwgJycsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RWRpdGluZ0Z1bmQoeyAuLi5lZGl0aW5nRnVuZCwgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlIH0pLCBwbGFjZWhvbGRlcjogXCJEZXNjcmlwdGlvblwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChCdXR0b24sIHsgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVVcGRhdGVGdW5kKGZ1bmQuaWQsIGVkaXRpbmdGdW5kKSwgY2hpbGRyZW46IFwiU2F2ZVwiIH0pLCBfanN4KEJ1dHRvbiwgeyBzaXplOiBcInNtXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiBzZXRFZGl0aW5nRnVuZChudWxsKSwgY2hpbGRyZW46IFwiQ2FuY2VsXCIgfSldIH0pXSB9KSkgOiAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBmdW5kLm5hbWUgfSksIF9qc3goQmFkZ2UsIHsgdmFyaWFudDogZnVuZC50eXBlID09PSAncmVzdHJpY3RlZCcgPyAnd2FybmluZycgOiAncHJpbWFyeScsIGNoaWxkcmVuOiBmdW5kLnR5cGUgfSksIF9qc3goQmFkZ2UsIHsgdmFyaWFudDogZnVuZC5pc19hY3RpdmUgPyAnc3VjY2VzcycgOiAnbmV1dHJhbCcsIGNoaWxkcmVuOiBmdW5kLmlzX2FjdGl2ZSA/ICdBY3RpdmUnIDogJ0luYWN0aXZlJyB9KV0gfSksIGZ1bmQuZGVzY3JpcHRpb24gJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBmdW5kLmRlc2NyaXB0aW9uIH0pKSwgX2pzeHMoXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTUwMCBtdC0xXCIsIGNoaWxkcmVuOiBbXCJCYWxhbmNlOiBcXHUyMEIxXCIsIHBhcnNlRmxvYXQoZnVuZC5jdXJyZW50X2JhbGFuY2UpLnRvTG9jYWxlU3RyaW5nKCdlbi1QSCcsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLCBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIgfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gaGFuZGxlVXBkYXRlRnVuZChmdW5kLmlkLCB7IGlzX2FjdGl2ZTogIWZ1bmQuaXNfYWN0aXZlIH0pLCBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXByaW1hcnktNjAwIGhvdmVyOnRleHQtcHJpbWFyeS03MDBcIiwgY2hpbGRyZW46IGZ1bmQuaXNfYWN0aXZlID8gJ0RlYWN0aXZhdGUnIDogJ0FjdGl2YXRlJyB9KSwgX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHNldEVkaXRpbmdGdW5kKGZ1bmQpLCBjbGFzc05hbWU6IFwicC0yIHRleHQtbmV1dHJhbC02MDAgaG92ZXI6dGV4dC1wcmltYXJ5LTYwMCB0cmFuc2l0aW9uLWNvbG9yc1wiLCBcImFyaWEtbGFiZWxcIjogXCJFZGl0XCIsIGNoaWxkcmVuOiBfanN4KEVkaXQyLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSkgfSksIF9qc3goXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBoYW5kbGVEZWxldGVGdW5kKGZ1bmQuaWQpLCBjbGFzc05hbWU6IFwicC0yIHRleHQtbmV1dHJhbC02MDAgaG92ZXI6dGV4dC1lcnJvci02MDAgdHJhbnNpdGlvbi1jb2xvcnNcIiwgXCJhcmlhLWxhYmVsXCI6IFwiRGVsZXRlXCIsIGNoaWxkcmVuOiBfanN4KFRyYXNoMiwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pIH0pXSB9KV0gfSkpIH0sIGZ1bmQuaWQpKSksIGZ1bmRzLmxlbmd0aCA9PT0gMCAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNTAwIHRleHQtY2VudGVyIHB5LTRcIiwgY2hpbGRyZW46IFwiTm8gZnVuZHMgY29uZmlndXJlZC4gQWRkIG9uZSB0byBnZXQgc3RhcnRlZC5cIiB9KSldIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktZW5kIHB0LTQgYm9yZGVyLXQgYm9yZGVyLW5ldXRyYWwtMjAwXCIsIGNoaWxkcmVuOiBfanN4KEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVTYXZlRmluYW5jZVNldHRpbmdzLCBsb2FkaW5nOiBpc1NhdmluZywgZGlzYWJsZWQ6IGlzU2F2aW5nLCBjaGlsZHJlbjogXCJTYXZlIENoYW5nZXNcIiB9KSB9KV0gfSkpO1xuICAgICAgICAgICAgY2FzZSAnZW1haWwtbm90aWZpY2F0aW9ucyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkVtYWlsICYgTm90aWZpY2F0aW9uc1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJtdC0xIHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJDb25maWd1cmUgZW1haWwgc2V0dGluZ3MgYW5kIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcy5cIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFwiU01UUCBDb25maWd1cmF0aW9uXCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4KElucHV0LCB7IGxhYmVsOiBcIlNNVFAgSG9zdFwiLCBwbGFjZWhvbGRlcjogXCJzbXRwLmdtYWlsLmNvbVwiLCB2YWx1ZTogZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncy5zbXRwSG9zdCwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzKHsgLi4uZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncywgc210cEhvc3Q6IGUudGFyZ2V0LnZhbHVlIH0pLCBoZWxwZXJUZXh0OiBcIllvdXIgZW1haWwgc2VydmVyIGhvc3RuYW1lXCIsIHJlcXVpcmVkOiB0cnVlIH0pLCBfanN4KElucHV0LCB7IHR5cGU6IFwibnVtYmVyXCIsIGxhYmVsOiBcIlNNVFAgUG9ydFwiLCBwbGFjZWhvbGRlcjogXCI1ODdcIiwgdmFsdWU6IGVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Muc210cFBvcnQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RW1haWxOb3RpZmljYXRpb25TZXR0aW5ncyh7IC4uLmVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MsIHNtdHBQb3J0OiBlLnRhcmdldC52YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJDb21tb24gcG9ydHM6IDU4NyAoVExTKSwgNDY1IChTU0wpLCAyNSAoTm9uZSlcIiwgcmVxdWlyZWQ6IHRydWUgfSksIF9qc3goSW5wdXQsIHsgbGFiZWw6IFwiU01UUCBVc2VybmFtZVwiLCBwbGFjZWhvbGRlcjogXCJ5b3VyLWVtYWlsQGV4YW1wbGUuY29tXCIsIHZhbHVlOiBlbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzLnNtdHBVc2VybmFtZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzKHsgLi4uZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncywgc210cFVzZXJuYW1lOiBlLnRhcmdldC52YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJZb3VyIGVtYWlsIGFjY291bnQgdXNlcm5hbWVcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmVcIiwgY2hpbGRyZW46IFtfanN4KElucHV0LCB7IHR5cGU6IHNob3dTbXRwUGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnLCBsYWJlbDogXCJTTVRQIFBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIlxcdTIwMjJcXHUyMDIyXFx1MjAyMlxcdTIwMjJcXHUyMDIyXFx1MjAyMlxcdTIwMjJcXHUyMDIyXCIsIHZhbHVlOiBlbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzLnNtdHBQYXNzd29yZCwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzKHsgLi4uZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncywgc210cFBhc3N3b3JkOiBlLnRhcmdldC52YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJZb3VyIGVtYWlsIGFjY291bnQgcGFzc3dvcmQgb3IgYXBwIHBhc3N3b3JkXCIgfSksIF9qc3goXCJidXR0b25cIiwgeyB0eXBlOiBcImJ1dHRvblwiLCBvbkNsaWNrOiAoKSA9PiBzZXRTaG93U210cFBhc3N3b3JkKCFzaG93U210cFBhc3N3b3JkKSwgY2xhc3NOYW1lOiBcImFic29sdXRlIHJpZ2h0LTMgdG9wLTggdGV4dC1uZXV0cmFsLTUwMCBob3Zlcjp0ZXh0LW5ldXRyYWwtNzAwXCIsIFwiYXJpYS1sYWJlbFwiOiBzaG93U210cFBhc3N3b3JkID8gJ0hpZGUgcGFzc3dvcmQnIDogJ1Nob3cgcGFzc3dvcmQnLCBjaGlsZHJlbjogc2hvd1NtdHBQYXNzd29yZCA/IF9qc3goRXllT2ZmLCB7IGNsYXNzTmFtZTogXCJoLTUgdy01XCIgfSkgOiBfanN4KEV5ZSwgeyBjbGFzc05hbWU6IFwiaC01IHctNVwiIH0pIH0pXSB9KSwgX2pzeChTZWxlY3QsIHsgbGFiZWw6IFwiRW5jcnlwdGlvblwiLCBvcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnbm9uZScsIGxhYmVsOiAnTm9uZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICd0bHMnLCBsYWJlbDogJ1RMUycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdzc2wnLCBsYWJlbDogJ1NTTCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSwgdmFsdWU6IGVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Muc210cEVuY3J5cHRpb24sIG9uQ2hhbmdlOiAodmFsdWUpID0+IHNldEVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MoeyAuLi5lbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzLCBzbXRwRW5jcnlwdGlvbjogdmFsdWUgfSksIGhlbHBlclRleHQ6IFwiRW5jcnlwdGlvbiBtZXRob2QgZm9yIHNlY3VyZSBjb25uZWN0aW9uXCIgfSksIF9qc3goSW5wdXQsIHsgdHlwZTogXCJlbWFpbFwiLCBsYWJlbDogXCJGcm9tIEVtYWlsXCIsIHBsYWNlaG9sZGVyOiBcIm5vcmVwbHlAbWZtYy5jaHVyY2hcIiwgdmFsdWU6IGVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Muc210cEZyb21FbWFpbCwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzKHsgLi4uZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncywgc210cEZyb21FbWFpbDogZS50YXJnZXQudmFsdWUgfSksIGhlbHBlclRleHQ6IFwiRW1haWwgYWRkcmVzcyBzaG93biBhcyBzZW5kZXJcIiwgcmVxdWlyZWQ6IHRydWUgfSksIF9qc3goSW5wdXQsIHsgbGFiZWw6IFwiRnJvbSBOYW1lXCIsIHBsYWNlaG9sZGVyOiBcIk1GTUMgU3lzdGVtXCIsIHZhbHVlOiBlbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzLnNtdHBGcm9tTmFtZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzKHsgLi4uZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncywgc210cEZyb21OYW1lOiBlLnRhcmdldC52YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJOYW1lIHNob3duIGFzIHNlbmRlclwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcHQtMlwiLCBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiBoYW5kbGVTZW5kVGVzdEVtYWlsLCBsb2FkaW5nOiBpc1NlbmRpbmdUZXN0RW1haWwsIGRpc2FibGVkOiBpc1NlbmRpbmdUZXN0RW1haWwgfHwgIWVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Muc210cEhvc3QgfHwgIWVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Muc210cEZyb21FbWFpbCwgaWNvbjogX2pzeChTZW5kLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIGNoaWxkcmVuOiBcIlNlbmQgVGVzdCBFbWFpbFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC01MDBcIiwgY2hpbGRyZW46IFwiU2VuZCBhIHRlc3QgZW1haWwgdG8gdmVyaWZ5IHlvdXIgU01UUCBjb25maWd1cmF0aW9uXCIgfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMCBib3JkZXItYiBib3JkZXItbmV1dHJhbC0yMDAgcGItMlwiLCBjaGlsZHJlbjogXCJOb3RpZmljYXRpb24gUHJlZmVyZW5jZXNcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS0zXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtNCBiZy1uZXV0cmFsLTUwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImVuYWJsZUVtYWlsTm90aWZpY2F0aW9uc1wiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkVtYWlsIE5vdGlmaWNhdGlvbnNcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIlJlY2VpdmUgbm90aWZpY2F0aW9ucyB2aWEgZW1haWxcIiB9KV0gfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgaWQ6IFwiZW5hYmxlRW1haWxOb3RpZmljYXRpb25zXCIsIGNoZWNrZWQ6IGVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MuZW5hYmxlRW1haWxOb3RpZmljYXRpb25zLCBvbkNoYW5nZTogKGUpID0+IHNldEVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MoeyAuLi5lbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzLCBlbmFibGVFbWFpbE5vdGlmaWNhdGlvbnM6IGUudGFyZ2V0LmNoZWNrZWQgfSksIGNsYXNzTmFtZTogXCJoLTUgdy01IHRleHQtcHJpbWFyeS02MDAgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBib3JkZXItbmV1dHJhbC0zMDAgcm91bmRlZFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtNCBiZy1uZXV0cmFsLTUwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImVuYWJsZUluQXBwTm90aWZpY2F0aW9uc1wiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkluLUFwcCBOb3RpZmljYXRpb25zXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJSZWNlaXZlIG5vdGlmaWNhdGlvbnMgd2l0aGluIHRoZSBhcHBsaWNhdGlvblwiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDogXCJlbmFibGVJbkFwcE5vdGlmaWNhdGlvbnNcIiwgY2hlY2tlZDogZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncy5lbmFibGVJbkFwcE5vdGlmaWNhdGlvbnMsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RW1haWxOb3RpZmljYXRpb25TZXR0aW5ncyh7IC4uLmVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MsIGVuYWJsZUluQXBwTm90aWZpY2F0aW9uczogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNSB3LTUgdGV4dC1wcmltYXJ5LTYwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkXCIgfSldIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFwiTm90aWZpY2F0aW9uIFR5cGVzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJDaG9vc2Ugd2hpY2ggZXZlbnRzIHRyaWdnZXIgbm90aWZpY2F0aW9uc1wiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTJcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLXdoaXRlIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1uZXV0cmFsLTUwIHRyYW5zaXRpb24tY29sb3JzXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibm90aWZ5TmV3TWVtYmVyXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFwiTmV3IE1lbWJlclwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiTm90aWZ5IHdoZW4gYSBuZXcgbWVtYmVyIGlzIGFkZGVkIHRvIHRoZSBzeXN0ZW1cIiB9KV0gfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgaWQ6IFwibm90aWZ5TmV3TWVtYmVyXCIsIGNoZWNrZWQ6IGVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Mubm90aWZ5TmV3TWVtYmVyLCBvbkNoYW5nZTogKGUpID0+IHNldEVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MoeyAuLi5lbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzLCBub3RpZnlOZXdNZW1iZXI6IGUudGFyZ2V0LmNoZWNrZWQgfSksIGNsYXNzTmFtZTogXCJoLTQgdy00IHRleHQtcHJpbWFyeS02MDAgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBib3JkZXItbmV1dHJhbC0zMDAgcm91bmRlZFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMyBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtbGcgaG92ZXI6YmctbmV1dHJhbC01MCB0cmFuc2l0aW9uLWNvbG9yc1wiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcIm5vdGlmeUV2ZW50UmVtaW5kZXJcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJFdmVudCBSZW1pbmRlclwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiU2VuZCByZW1pbmRlcnMgZm9yIHVwY29taW5nIGV2ZW50c1wiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDogXCJub3RpZnlFdmVudFJlbWluZGVyXCIsIGNoZWNrZWQ6IGVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Mubm90aWZ5RXZlbnRSZW1pbmRlciwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzKHsgLi4uZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncywgbm90aWZ5RXZlbnRSZW1pbmRlcjogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1wcmltYXJ5LTYwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLXdoaXRlIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1uZXV0cmFsLTUwIHRyYW5zaXRpb24tY29sb3JzXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibm90aWZ5RmluYW5jZUFwcHJvdmFsXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFwiRmluYW5jZSBBcHByb3ZhbFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiTm90aWZ5IHdoZW4gZXhwZW5zZXMgcmVxdWlyZSBhcHByb3ZhbFwiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDogXCJub3RpZnlGaW5hbmNlQXBwcm92YWxcIiwgY2hlY2tlZDogZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncy5ub3RpZnlGaW5hbmNlQXBwcm92YWwsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RW1haWxOb3RpZmljYXRpb25TZXR0aW5ncyh7IC4uLmVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MsIG5vdGlmeUZpbmFuY2VBcHByb3ZhbDogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1wcmltYXJ5LTYwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLXdoaXRlIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1uZXV0cmFsLTUwIHRyYW5zaXRpb24tY29sb3JzXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibm90aWZ5RXhwZW5zZVN1Ym1pdHRlZFwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkV4cGVuc2UgU3VibWl0dGVkXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteHMgdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJOb3RpZnkgd2hlbiBhIG5ldyBleHBlbnNlIGlzIHN1Ym1pdHRlZFwiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDogXCJub3RpZnlFeHBlbnNlU3VibWl0dGVkXCIsIGNoZWNrZWQ6IGVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Mubm90aWZ5RXhwZW5zZVN1Ym1pdHRlZCwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzKHsgLi4uZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncywgbm90aWZ5RXhwZW5zZVN1Ym1pdHRlZDogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1wcmltYXJ5LTYwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLXdoaXRlIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1uZXV0cmFsLTUwIHRyYW5zaXRpb24tY29sb3JzXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibm90aWZ5T2ZmZXJpbmdSZWNvcmRlZFwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIk9mZmVyaW5nIFJlY29yZGVkXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteHMgdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJOb3RpZnkgd2hlbiBvZmZlcmluZ3MgYXJlIHJlY29yZGVkXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGlkOiBcIm5vdGlmeU9mZmVyaW5nUmVjb3JkZWRcIiwgY2hlY2tlZDogZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncy5ub3RpZnlPZmZlcmluZ1JlY29yZGVkLCBvbkNoYW5nZTogKGUpID0+IHNldEVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MoeyAuLi5lbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzLCBub3RpZnlPZmZlcmluZ1JlY29yZGVkOiBlLnRhcmdldC5jaGVja2VkIH0pLCBjbGFzc05hbWU6IFwiaC00IHctNCB0ZXh0LXByaW1hcnktNjAwIGZvY3VzOnJpbmctcHJpbWFyeS01MDAgYm9yZGVyLW5ldXRyYWwtMzAwIHJvdW5kZWRcIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTMgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCByb3VuZGVkLWxnIGhvdmVyOmJnLW5ldXRyYWwtNTAgdHJhbnNpdGlvbi1jb2xvcnNcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJub3RpZnlCdWRnZXRUaHJlc2hvbGRcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJCdWRnZXQgVGhyZXNob2xkXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteHMgdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJOb3RpZnkgd2hlbiBidWRnZXQgcmVhY2hlcyB0aHJlc2hvbGQgKDgwJSwgOTAlLCAxMDAlKVwiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDogXCJub3RpZnlCdWRnZXRUaHJlc2hvbGRcIiwgY2hlY2tlZDogZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncy5ub3RpZnlCdWRnZXRUaHJlc2hvbGQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RW1haWxOb3RpZmljYXRpb25TZXR0aW5ncyh7IC4uLmVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MsIG5vdGlmeUJ1ZGdldFRocmVzaG9sZDogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1wcmltYXJ5LTYwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLXdoaXRlIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1uZXV0cmFsLTUwIHRyYW5zaXRpb24tY29sb3JzXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibm90aWZ5VXNlckludml0ZVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIlVzZXIgSW52aXRlXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteHMgdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJOb3RpZnkgd2hlbiBhIG5ldyB1c2VyIGlzIGludml0ZWQgdG8gdGhlIHN5c3RlbVwiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDogXCJub3RpZnlVc2VySW52aXRlXCIsIGNoZWNrZWQ6IGVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3Mubm90aWZ5VXNlckludml0ZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzKHsgLi4uZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncywgbm90aWZ5VXNlckludml0ZTogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1wcmltYXJ5LTYwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIGJnLXdoaXRlIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcm91bmRlZC1sZyBob3ZlcjpiZy1uZXV0cmFsLTUwIHRyYW5zaXRpb24tY29sb3JzXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibm90aWZ5U3lzdGVtVXBkYXRlXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFwiU3lzdGVtIFVwZGF0ZVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiTm90aWZ5IGFib3V0IHN5c3RlbSB1cGRhdGVzIGFuZCBtYWludGVuYW5jZVwiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDogXCJub3RpZnlTeXN0ZW1VcGRhdGVcIiwgY2hlY2tlZDogZW1haWxOb3RpZmljYXRpb25TZXR0aW5ncy5ub3RpZnlTeXN0ZW1VcGRhdGUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RW1haWxOb3RpZmljYXRpb25TZXR0aW5ncyh7IC4uLmVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MsIG5vdGlmeVN5c3RlbVVwZGF0ZTogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1wcmltYXJ5LTYwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkXCIgfSldIH0pXSB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWVuZCBwdC00IGJvcmRlci10IGJvcmRlci1uZXV0cmFsLTIwMFwiLCBjaGlsZHJlbjogX2pzeChCdXR0b24sIHsgb25DbGljazogaGFuZGxlU2F2ZUVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MsIGxvYWRpbmc6IGlzU2F2aW5nLCBkaXNhYmxlZDogaXNTYXZpbmcsIGNoaWxkcmVuOiBcIlNhdmUgQ2hhbmdlc1wiIH0pIH0pXSB9KSk7XG4gICAgICAgICAgICBjYXNlICdzZWN1cml0eSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIlNlY3VyaXR5XCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTEgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIk1hbmFnZSBzZWN1cml0eSBzZXR0aW5ncywgcGFzc3dvcmQgcG9saWNpZXMsIGFuZCBhdXRoZW50aWNhdGlvbiBvcHRpb25zLlwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMCBib3JkZXItYiBib3JkZXItbmV1dHJhbC0yMDAgcGItMlwiLCBjaGlsZHJlbjogXCJQYXNzd29yZCBQb2xpY3lcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3goSW5wdXQsIHsgdHlwZTogXCJudW1iZXJcIiwgbGFiZWw6IFwiTWluaW11bSBQYXNzd29yZCBMZW5ndGhcIiwgdmFsdWU6IHNlY3VyaXR5U2V0dGluZ3MubWluUGFzc3dvcmRMZW5ndGgudG9TdHJpbmcoKSwgb25DaGFuZ2U6IChlKSA9PiBzZXRTZWN1cml0eVNldHRpbmdzKHsgLi4uc2VjdXJpdHlTZXR0aW5ncywgbWluUGFzc3dvcmRMZW5ndGg6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSB8fCA4IH0pLCBoZWxwZXJUZXh0OiBcIk1pbmltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgcmVxdWlyZWQgKDgtMzIpXCIsIG1pbjogOCwgbWF4OiAzMiB9KSwgX2pzeChJbnB1dCwgeyB0eXBlOiBcIm51bWJlclwiLCBsYWJlbDogXCJQYXNzd29yZCBFeHBpcnkgKERheXMpXCIsIHZhbHVlOiBzZWN1cml0eVNldHRpbmdzLnBhc3N3b3JkRXhwaXJ5RGF5cy50b1N0cmluZygpLCBvbkNoYW5nZTogKGUpID0+IHNldFNlY3VyaXR5U2V0dGluZ3MoeyAuLi5zZWN1cml0eVNldHRpbmdzLCBwYXNzd29yZEV4cGlyeURheXM6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSB8fCA5MCB9KSwgaGVscGVyVGV4dDogXCJEYXlzIGJlZm9yZSBwYXNzd29yZCBtdXN0IGJlIGNoYW5nZWQgKDAgPSBuZXZlcilcIiwgbWluOiAwLCBtYXg6IDM2NSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktM1wiLCBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTcwMFwiLCBjaGlsZHJlbjogXCJDb21wbGV4aXR5IFJlcXVpcmVtZW50c1wiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTJcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgaWQ6IFwicmVxdWlyZVVwcGVyY2FzZVwiLCBjaGVja2VkOiBzZWN1cml0eVNldHRpbmdzLnJlcXVpcmVVcHBlcmNhc2UsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0U2VjdXJpdHlTZXR0aW5ncyh7IC4uLnNlY3VyaXR5U2V0dGluZ3MsIHJlcXVpcmVVcHBlcmNhc2U6IGUudGFyZ2V0LmNoZWNrZWQgfSksIGNsYXNzTmFtZTogXCJoLTQgdy00IHRleHQtcHJpbWFyeS02MDAgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBib3JkZXItbmV1dHJhbC0zMDAgcm91bmRlZFwiIH0pLCBfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcInJlcXVpcmVVcHBlcmNhc2VcIiwgY2xhc3NOYW1lOiBcIm1sLTIgYmxvY2sgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNzAwXCIsIGNoaWxkcmVuOiBcIlJlcXVpcmUgYXQgbGVhc3Qgb25lIHVwcGVyY2FzZSBsZXR0ZXIgKEEtWilcIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDogXCJyZXF1aXJlTG93ZXJjYXNlXCIsIGNoZWNrZWQ6IHNlY3VyaXR5U2V0dGluZ3MucmVxdWlyZUxvd2VyY2FzZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRTZWN1cml0eVNldHRpbmdzKHsgLi4uc2VjdXJpdHlTZXR0aW5ncywgcmVxdWlyZUxvd2VyY2FzZTogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1wcmltYXJ5LTYwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkXCIgfSksIF9qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwicmVxdWlyZUxvd2VyY2FzZVwiLCBjbGFzc05hbWU6IFwibWwtMiBibG9jayB0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IFwiUmVxdWlyZSBhdCBsZWFzdCBvbmUgbG93ZXJjYXNlIGxldHRlciAoYS16KVwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGlkOiBcInJlcXVpcmVOdW1iZXJzXCIsIGNoZWNrZWQ6IHNlY3VyaXR5U2V0dGluZ3MucmVxdWlyZU51bWJlcnMsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0U2VjdXJpdHlTZXR0aW5ncyh7IC4uLnNlY3VyaXR5U2V0dGluZ3MsIHJlcXVpcmVOdW1iZXJzOiBlLnRhcmdldC5jaGVja2VkIH0pLCBjbGFzc05hbWU6IFwiaC00IHctNCB0ZXh0LXByaW1hcnktNjAwIGZvY3VzOnJpbmctcHJpbWFyeS01MDAgYm9yZGVyLW5ldXRyYWwtMzAwIHJvdW5kZWRcIiB9KSwgX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJyZXF1aXJlTnVtYmVyc1wiLCBjbGFzc05hbWU6IFwibWwtMiBibG9jayB0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IFwiUmVxdWlyZSBhdCBsZWFzdCBvbmUgbnVtYmVyICgwLTkpXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgaWQ6IFwicmVxdWlyZVNwZWNpYWxDaGFyc1wiLCBjaGVja2VkOiBzZWN1cml0eVNldHRpbmdzLnJlcXVpcmVTcGVjaWFsQ2hhcnMsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0U2VjdXJpdHlTZXR0aW5ncyh7IC4uLnNlY3VyaXR5U2V0dGluZ3MsIHJlcXVpcmVTcGVjaWFsQ2hhcnM6IGUudGFyZ2V0LmNoZWNrZWQgfSksIGNsYXNzTmFtZTogXCJoLTQgdy00IHRleHQtcHJpbWFyeS02MDAgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBib3JkZXItbmV1dHJhbC0zMDAgcm91bmRlZFwiIH0pLCBfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcInJlcXVpcmVTcGVjaWFsQ2hhcnNcIiwgY2xhc3NOYW1lOiBcIm1sLTIgYmxvY2sgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNzAwXCIsIGNoaWxkcmVuOiBcIlJlcXVpcmUgYXQgbGVhc3Qgb25lIHNwZWNpYWwgY2hhcmFjdGVyICghQCMkJV4mKilcIiB9KV0gfSldIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFwiU2Vzc2lvbiBTZXR0aW5nc1wiIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIiwgY2hpbGRyZW46IF9qc3goSW5wdXQsIHsgdHlwZTogXCJudW1iZXJcIiwgbGFiZWw6IFwiU2Vzc2lvbiBUaW1lb3V0IChNaW51dGVzKVwiLCB2YWx1ZTogc2VjdXJpdHlTZXR0aW5ncy5zZXNzaW9uVGltZW91dC50b1N0cmluZygpLCBvbkNoYW5nZTogKGUpID0+IHNldFNlY3VyaXR5U2V0dGluZ3MoeyAuLi5zZWN1cml0eVNldHRpbmdzLCBzZXNzaW9uVGltZW91dDogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIHx8IDMwIH0pLCBoZWxwZXJUZXh0OiBcIkF1dG9tYXRpY2FsbHkgbG9nIG91dCBpbmFjdGl2ZSB1c2VycyBhZnRlciB0aGlzIHRpbWVcIiwgbWluOiA1LCBtYXg6IDE0NDAgfSkgfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctaW5mby01MCBib3JkZXIgYm9yZGVyLWluZm8tMjAwIHJvdW5kZWQtbGcgcC00XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4XCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wXCIsIGNoaWxkcmVuOiBfanN4KFNoaWVsZCwgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LWluZm8tNjAwXCIgfSkgfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibWwtM1wiLCBjaGlsZHJlbjogX2pzeHMoXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1pbmZvLTgwMFwiLCBjaGlsZHJlbjogW1wiVXNlcnMgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGxvZ2dlZCBvdXQgYWZ0ZXIgXCIsIHNlY3VyaXR5U2V0dGluZ3Muc2Vzc2lvblRpbWVvdXQsIFwiIG1pbnV0ZXMgb2YgaW5hY3Rpdml0eS4gVGhleSB3aWxsIHJlY2VpdmUgYSB3YXJuaW5nIDIgbWludXRlcyBiZWZvcmUgdGltZW91dC5cIl0gfSkgfSldIH0pIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMCBib3JkZXItYiBib3JkZXItbmV1dHJhbC0yMDAgcGItMlwiLCBjaGlsZHJlbjogXCJUd28tRmFjdG9yIEF1dGhlbnRpY2F0aW9uXCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTQgYmctbmV1dHJhbC01MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDBcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJlbmFibGUyRkFcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJFbmFibGUgVHdvLUZhY3RvciBBdXRoZW50aWNhdGlvblwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJSZXF1aXJlIHVzZXJzIHRvIHZlcmlmeSB0aGVpciBpZGVudGl0eSB3aXRoIGEgc2Vjb25kIGZhY3RvciAoZW1haWwgb3IgYXV0aGVudGljYXRvciBhcHApXCIgfSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGlkOiBcImVuYWJsZTJGQVwiLCBjaGVja2VkOiBzZWN1cml0eVNldHRpbmdzLmVuYWJsZTJGQSwgb25DaGFuZ2U6IChlKSA9PiBzZXRTZWN1cml0eVNldHRpbmdzKHsgLi4uc2VjdXJpdHlTZXR0aW5ncywgZW5hYmxlMkZBOiBlLnRhcmdldC5jaGVja2VkIH0pLCBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LXByaW1hcnktNjAwIGZvY3VzOnJpbmctcHJpbWFyeS01MDAgYm9yZGVyLW5ldXRyYWwtMzAwIHJvdW5kZWRcIiB9KV0gfSksIHNlY3VyaXR5U2V0dGluZ3MuZW5hYmxlMkZBICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLXN1Y2Nlc3MtNTAgYm9yZGVyIGJvcmRlci1zdWNjZXNzLTIwMCByb3VuZGVkLWxnIHAtNFwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleFwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMFwiLCBjaGlsZHJlbjogX2pzeChDaGVjaywgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LXN1Y2Nlc3MtNjAwXCIgfSkgfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibWwtM1wiLCBjaGlsZHJlbjogX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXN1Y2Nlc3MtODAwXCIsIGNoaWxkcmVuOiBcIlR3by1mYWN0b3IgYXV0aGVudGljYXRpb24gaXMgZW5hYmxlZC4gVXNlcnMgd2lsbCBiZSBwcm9tcHRlZCB0byBzZXQgdXAgMkZBIG9uIHRoZWlyIG5leHQgbG9naW4uXCIgfSkgfSldIH0pIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFwiTG9naW4gU2VjdXJpdHlcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3goSW5wdXQsIHsgdHlwZTogXCJudW1iZXJcIiwgbGFiZWw6IFwiTWF4aW11bSBMb2dpbiBBdHRlbXB0c1wiLCB2YWx1ZTogc2VjdXJpdHlTZXR0aW5ncy5tYXhMb2dpbkF0dGVtcHRzLnRvU3RyaW5nKCksIG9uQ2hhbmdlOiAoZSkgPT4gc2V0U2VjdXJpdHlTZXR0aW5ncyh7IC4uLnNlY3VyaXR5U2V0dGluZ3MsIG1heExvZ2luQXR0ZW1wdHM6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSB8fCA1IH0pLCBoZWxwZXJUZXh0OiBcIkxvY2sgYWNjb3VudCBhZnRlciB0aGlzIG1hbnkgZmFpbGVkIGxvZ2luIGF0dGVtcHRzXCIsIG1pbjogMywgbWF4OiAxMCB9KSwgX2pzeChJbnB1dCwgeyB0eXBlOiBcIm51bWJlclwiLCBsYWJlbDogXCJMb2Nrb3V0IER1cmF0aW9uIChNaW51dGVzKVwiLCB2YWx1ZTogc2VjdXJpdHlTZXR0aW5ncy5sb2Nrb3V0RHVyYXRpb24udG9TdHJpbmcoKSwgb25DaGFuZ2U6IChlKSA9PiBzZXRTZWN1cml0eVNldHRpbmdzKHsgLi4uc2VjdXJpdHlTZXR0aW5ncywgbG9ja291dER1cmF0aW9uOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSkgfHwgMTUgfSksIGhlbHBlclRleHQ6IFwiSG93IGxvbmcgdG8gbG9jayB0aGUgYWNjb3VudCBhZnRlciBtYXggYXR0ZW1wdHNcIiwgbWluOiA1LCBtYXg6IDE0NDAgfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLXdhcm5pbmctNTAgYm9yZGVyIGJvcmRlci13YXJuaW5nLTIwMCByb3VuZGVkLWxnIHAtNFwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleFwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMFwiLCBjaGlsZHJlbjogX2pzeChTaGllbGQsIHsgY2xhc3NOYW1lOiBcImgtNSB3LTUgdGV4dC13YXJuaW5nLTYwMFwiIH0pIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1sLTNcIiwgY2hpbGRyZW46IF9qc3hzKFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtd2FybmluZy04MDBcIiwgY2hpbGRyZW46IFtcIkFmdGVyIFwiLCBzZWN1cml0eVNldHRpbmdzLm1heExvZ2luQXR0ZW1wdHMsIFwiIGZhaWxlZCBsb2dpbiBhdHRlbXB0cywgdGhlIGFjY291bnQgd2lsbCBiZSBsb2NrZWQgZm9yIFwiLCBzZWN1cml0eVNldHRpbmdzLmxvY2tvdXREdXJhdGlvbiwgXCIgbWludXRlcy4gQWRtaW5pc3RyYXRvcnMgY2FuIG1hbnVhbGx5IHVubG9jayBhY2NvdW50cyBmcm9tIHRoZSBVc2VycyBwYWdlLlwiXSB9KSB9KV0gfSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIlNlY3VyaXR5IEF1ZGl0IExvZ1wiIH0pLCBfanN4KEJ1dHRvbiwgeyBzaXplOiBcInNtXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiBsb2FkQXVkaXRMb2dzLCBsb2FkaW5nOiBpc0xvYWRpbmdBdWRpdExvZ3MsIGRpc2FibGVkOiBpc0xvYWRpbmdBdWRpdExvZ3MsIGNoaWxkcmVuOiBcIlJlZnJlc2hcIiB9KV0gfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJSZWNlbnQgc2VjdXJpdHktcmVsYXRlZCBldmVudHMgKGxhc3QgMTAgZW50cmllcylcIiB9KSwgaXNMb2FkaW5nQXVkaXRMb2dzID8gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtY2VudGVyIHB5LThcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImlubGluZS1ibG9jayBhbmltYXRlLXNwaW4gcm91bmRlZC1mdWxsIGgtOCB3LTggYm9yZGVyLWItMiBib3JkZXItcHJpbWFyeS02MDBcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMiB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiTG9hZGluZyBhdWRpdCBsb2dzLi4uXCIgfSldIH0pKSA6IGF1ZGl0TG9ncy5sZW5ndGggPiAwID8gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS0yXCIsIGNoaWxkcmVuOiBhdWRpdExvZ3MubWFwKChsb2cpID0+IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIHAtNCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtbGcgaG92ZXI6c2hhZG93LXNtIHRyYW5zaXRpb24tc2hhZG93XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTFcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IGxvZy51c2VyIH0pLCBfanN4KEJhZGdlLCB7IHZhcmlhbnQ6IGxvZy5hY3Rpb24uaW5jbHVkZXMoJ0ZhaWxlZCcpIHx8IGxvZy5hY3Rpb24uaW5jbHVkZXMoJ0xvY2tlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnZXJyb3InXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsb2cuYWN0aW9uLmluY2x1ZGVzKCdMb2dpbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3N1Y2Nlc3MnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ25ldXRyYWwnLCBjaGlsZHJlbjogbG9nLmFjdGlvbiB9KV0gfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBsb2cuZGV0YWlscyB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgbXQtMiB0ZXh0LXhzIHRleHQtbmV1dHJhbC01MDBcIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBmb3JtYXRSZWxhdGl2ZVRpbWUobG9nLnRpbWVzdGFtcCkgfSksIF9qc3hzKFwic3BhblwiLCB7IGNoaWxkcmVuOiBbXCJJUDogXCIsIGxvZy5pcEFkZHJlc3NdIH0pXSB9KV0gfSkgfSwgbG9nLmlkKSkpIH0pKSA6IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS04IGJnLW5ldXRyYWwtNTAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwXCIsIGNoaWxkcmVuOiBbX2pzeChTaGllbGQsIHsgY2xhc3NOYW1lOiBcIm14LWF1dG8gaC0xMiB3LTEyIHRleHQtbmV1dHJhbC00MDBcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMiB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiTm8gYXVkaXQgbG9ncyBhdmFpbGFibGVcIiB9KV0gfSkpLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1jZW50ZXJcIiwgY2hpbGRyZW46IF9qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogTmF2aWdhdGUgdG8gZnVsbCBBY3Rpdml0eSBMb2cgcGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ2luZm8nLCAnVmlldyBmdWxsIGFjdGl2aXR5IGxvZyBpbiB0aGUgQWN0aXZpdHkgTG9nIHBhZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBjaGlsZHJlbjogXCJWaWV3IEZ1bGwgQWN0aXZpdHkgTG9nXCIgfSkgfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1lbmQgcHQtNCBib3JkZXItdCBib3JkZXItbmV1dHJhbC0yMDBcIiwgY2hpbGRyZW46IF9qc3goQnV0dG9uLCB7IG9uQ2xpY2s6IGhhbmRsZVNhdmVTZWN1cml0eVNldHRpbmdzLCBsb2FkaW5nOiBpc1NhdmluZywgZGlzYWJsZWQ6IGlzU2F2aW5nLCBjaGlsZHJlbjogXCJTYXZlIENoYW5nZXNcIiB9KSB9KV0gfSkpO1xuICAgICAgICAgICAgY2FzZSAnYmFja3VwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFwiQmFja3VwICYgUmVzdG9yZVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJtdC0xIHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJNYW5hZ2UgZGF0YWJhc2UgYmFja3VwcyBhbmQgcmVzdG9yYXRpb24uXCIgfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLWdyYWRpZW50LXRvLWJyIGZyb20tcHJpbWFyeS01MCB0by1wcmltYXJ5LTEwMCByb3VuZGVkLWxnIHAtNiBib3JkZXIgYm9yZGVyLXByaW1hcnktMjAwXCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlblwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtMyBiZy1wcmltYXJ5LTYwMCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBfanN4KERhdGFiYXNlLCB7IGNsYXNzTmFtZTogXCJoLTYgdy02IHRleHQtd2hpdGVcIiB9KSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJMYXN0IEJhY2t1cFwiIH0pLCBsYXN0QmFja3VwID8gKF9qc3hzKF9GcmFnbWVudCwgeyBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBuZXcgRGF0ZShsYXN0QmFja3VwLmNyZWF0ZWRfYXQpLnRvTG9jYWxlU3RyaW5nKCkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC00IG10LTJcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IFtfanN4KEhhcmREcml2ZSwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBsYXN0QmFja3VwLnNpemUgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IFtfanN4KENsb2NrLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2hpbGRyZW46IGZvcm1hdFJlbGF0aXZlVGltZShsYXN0QmFja3VwLmNyZWF0ZWRfYXQpIH0pXSB9KV0gfSldIH0pKSA6IChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJObyBiYWNrdXBzIGF2YWlsYWJsZVwiIH0pKV0gfSldIH0pLCBfanN4KEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVDcmVhdGVCYWNrdXAsIGxvYWRpbmc6IGlzQ3JlYXRpbmdCYWNrdXAsIGRpc2FibGVkOiBpc0NyZWF0aW5nQmFja3VwLCBpY29uOiBfanN4KERvd25sb2FkLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIGNoaWxkcmVuOiBcIkNyZWF0ZSBCYWNrdXAgTm93XCIgfSldIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTIwMCBwYi0yXCIsIGNoaWxkcmVuOiBcIkF1dG9tYXRpYyBCYWNrdXAgU2NoZWR1bGVcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGlkOiBcImVuYWJsZUF1dG9CYWNrdXBcIiwgY2hlY2tlZDogYmFja3VwU2V0dGluZ3MuZW5hYmxlQXV0b0JhY2t1cCwgb25DaGFuZ2U6IChlKSA9PiBzZXRCYWNrdXBTZXR0aW5ncyh7IC4uLmJhY2t1cFNldHRpbmdzLCBlbmFibGVBdXRvQmFja3VwOiBlLnRhcmdldC5jaGVja2VkIH0pLCBjbGFzc05hbWU6IFwiaC00IHctNCB0ZXh0LXByaW1hcnktNjAwIGZvY3VzOnJpbmctcHJpbWFyeS01MDAgYm9yZGVyLW5ldXRyYWwtMzAwIHJvdW5kZWRcIiB9KSwgX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJlbmFibGVBdXRvQmFja3VwXCIsIGNsYXNzTmFtZTogXCJtbC0yIGJsb2NrIHRleHQtc20gdGV4dC1uZXV0cmFsLTcwMFwiLCBjaGlsZHJlbjogXCJFbmFibGUgYXV0b21hdGljIGJhY2t1cHNcIiB9KV0gfSksIGJhY2t1cFNldHRpbmdzLmVuYWJsZUF1dG9CYWNrdXAgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1sLTYgc3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3goU2VsZWN0LCB7IGxhYmVsOiBcIkJhY2t1cCBGcmVxdWVuY3lcIiwgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdkYWlseScsIGxhYmVsOiAnRGFpbHknIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ3dlZWtseScsIGxhYmVsOiAnV2Vla2x5JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdtb250aGx5JywgbGFiZWw6ICdNb250aGx5JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSwgdmFsdWU6IGJhY2t1cFNldHRpbmdzLmJhY2t1cEZyZXF1ZW5jeSwgb25DaGFuZ2U6ICh2YWx1ZSkgPT4gc2V0QmFja3VwU2V0dGluZ3MoeyAuLi5iYWNrdXBTZXR0aW5ncywgYmFja3VwRnJlcXVlbmN5OiB2YWx1ZSB9KSwgaGVscGVyVGV4dDogXCJIb3cgb2Z0ZW4gdG8gY3JlYXRlIGF1dG9tYXRpYyBiYWNrdXBzXCIgfSksIF9qc3goSW5wdXQsIHsgdHlwZTogXCJ0aW1lXCIsIGxhYmVsOiBcIkJhY2t1cCBUaW1lXCIsIHZhbHVlOiBiYWNrdXBTZXR0aW5ncy5iYWNrdXBUaW1lLCBvbkNoYW5nZTogKGUpID0+IHNldEJhY2t1cFNldHRpbmdzKHsgLi4uYmFja3VwU2V0dGluZ3MsIGJhY2t1cFRpbWU6IGUudGFyZ2V0LnZhbHVlIH0pLCBoZWxwZXJUZXh0OiBcIlRpbWUgb2YgZGF5IHRvIHJ1biBiYWNrdXBzIChzZXJ2ZXIgdGltZSlcIiB9KSwgX2pzeChJbnB1dCwgeyB0eXBlOiBcIm51bWJlclwiLCBsYWJlbDogXCJSZXRlbnRpb24gUGVyaW9kIChEYXlzKVwiLCB2YWx1ZTogYmFja3VwU2V0dGluZ3MucmV0ZW50aW9uRGF5cy50b1N0cmluZygpLCBvbkNoYW5nZTogKGUpID0+IHNldEJhY2t1cFNldHRpbmdzKHsgLi4uYmFja3VwU2V0dGluZ3MsIHJldGVudGlvbkRheXM6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSB8fCAzMCB9KSwgbWluOiAxLCBtYXg6IDM2NSwgaGVscGVyVGV4dDogXCJIb3cgbG9uZyB0byBrZWVwIG9sZCBiYWNrdXBzXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgaWQ6IFwiaW5jbHVkZVVwbG9hZHNcIiwgY2hlY2tlZDogYmFja3VwU2V0dGluZ3MuaW5jbHVkZVVwbG9hZHMsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0QmFja3VwU2V0dGluZ3MoeyAuLi5iYWNrdXBTZXR0aW5ncywgaW5jbHVkZVVwbG9hZHM6IGUudGFyZ2V0LmNoZWNrZWQgfSksIGNsYXNzTmFtZTogXCJoLTQgdy00IHRleHQtcHJpbWFyeS02MDAgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBib3JkZXItbmV1dHJhbC0zMDAgcm91bmRlZFwiIH0pLCBfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImluY2x1ZGVVcGxvYWRzXCIsIGNsYXNzTmFtZTogXCJtbC0yIGJsb2NrIHRleHQtc20gdGV4dC1uZXV0cmFsLTcwMFwiLCBjaGlsZHJlbjogXCJJbmNsdWRlIHVwbG9hZGVkIGZpbGVzIGluIGJhY2t1cFwiIH0pXSB9KV0gfSkpXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktZW5kIHB0LTQgYm9yZGVyLXQgYm9yZGVyLW5ldXRyYWwtMjAwXCIsIGNoaWxkcmVuOiBfanN4KEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVTYXZlQmFja3VwU2V0dGluZ3MsIGxvYWRpbmc6IGlzU2F2aW5nLCBkaXNhYmxlZDogaXNTYXZpbmcsIGNoaWxkcmVuOiBcIlNhdmUgU2V0dGluZ3NcIiB9KSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFwiQmFja3VwIEhpc3RvcnlcIiB9KSwgaXNMb2FkaW5nQmFja3VwcyA/IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS04XCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtYmxvY2sgYW5pbWF0ZS1zcGluIHJvdW5kZWQtZnVsbCBoLTggdy04IGJvcmRlci1iLTIgYm9yZGVyLXByaW1hcnktNjAwXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTIgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIkxvYWRpbmcgYmFja3Vwcy4uLlwiIH0pXSB9KSkgOiBiYWNrdXBzLmxlbmd0aCA9PT0gMCA/IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS04IGJnLW5ldXRyYWwtNTAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwXCIsIGNoaWxkcmVuOiBbX2pzeChEYXRhYmFzZSwgeyBjbGFzc05hbWU6IFwibXgtYXV0byBoLTEyIHctMTIgdGV4dC1uZXV0cmFsLTQwMFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJtdC0yIHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJObyBiYWNrdXBzIGF2YWlsYWJsZVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtbmV1dHJhbC01MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJDcmVhdGUgeW91ciBmaXJzdCBiYWNrdXAgdG8gZ2V0IHN0YXJ0ZWRcIiB9KV0gfSkpIDogKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS0yXCIsIGNoaWxkcmVuOiBiYWNrdXBzLm1hcCgoYmFja3VwKSA9PiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtNCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtbGcgaG92ZXI6c2hhZG93LXNtIHRyYW5zaXRpb24tc2hhZG93XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1zdGFydCBnYXAtNCBmbGV4LTFcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbigncC0yIHJvdW5kZWQtbGcnLCBiYWNrdXAudHlwZSA9PT0gJ2F1dG9tYXRpYycgPyAnYmctcHJpbWFyeS0xMDAnIDogJ2JnLXN1Y2Nlc3MtMTAwJyksIGNoaWxkcmVuOiBiYWNrdXAudHlwZSA9PT0gJ2F1dG9tYXRpYycgPyAoX2pzeChDYWxlbmRhciwgeyBjbGFzc05hbWU6IGNuKCdoLTUgdy01JywgYmFja3VwLnR5cGUgPT09ICdhdXRvbWF0aWMnID8gJ3RleHQtcHJpbWFyeS02MDAnIDogJ3RleHQtc3VjY2Vzcy02MDAnKSB9KSkgOiAoX2pzeChEb3dubG9hZCwgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LXN1Y2Nlc3MtNjAwXCIgfSkpIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTEgbWluLXctMFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChcImg0XCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgdHJ1bmNhdGVcIiwgY2hpbGRyZW46IGJhY2t1cC5maWxlbmFtZSB9KSwgX2pzeChCYWRnZSwgeyB2YXJpYW50OiBiYWNrdXAudHlwZSA9PT0gJ2F1dG9tYXRpYycgPyAncHJpbWFyeScgOiAnc3VjY2VzcycsIGNoaWxkcmVuOiBiYWNrdXAudHlwZSA9PT0gJ2F1dG9tYXRpYycgPyAnQXV0bycgOiAnTWFudWFsJyB9KSwgYmFja3VwLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgJiYgKF9qc3goQmFkZ2UsIHsgdmFyaWFudDogXCJzdWNjZXNzXCIsIGNoaWxkcmVuOiBcIkNvbXBsZXRlZFwiIH0pKSwgYmFja3VwLnN0YXR1cyA9PT0gJ2luX3Byb2dyZXNzJyAmJiAoX2pzeChCYWRnZSwgeyB2YXJpYW50OiBcIndhcm5pbmdcIiwgY2hpbGRyZW46IFwiSW4gUHJvZ3Jlc3NcIiB9KSksIGJhY2t1cC5zdGF0dXMgPT09ICdmYWlsZWQnICYmIChfanN4KEJhZGdlLCB7IHZhcmlhbnQ6IFwiZXJyb3JcIiwgY2hpbGRyZW46IFwiRmFpbGVkXCIgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgbXQtMSB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFtfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIiwgY2hpbGRyZW46IFtfanN4KEhhcmREcml2ZSwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBiYWNrdXAuc2l6ZV0gfSksIF9qc3hzKFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiLCBjaGlsZHJlbjogW19qc3goQ2xvY2ssIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgbmV3IERhdGUoYmFja3VwLmNyZWF0ZWRfYXQpLnRvTG9jYWxlU3RyaW5nKCldIH0pLCBfanN4cyhcInNwYW5cIiwgeyBjaGlsZHJlbjogW1wiYnkgXCIsIGJhY2t1cC5jcmVhdGVkX2J5XSB9KV0gfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWwtNFwiLCBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJvdXRsaW5lXCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZURvd25sb2FkQmFja3VwKGJhY2t1cCksIGljb246IF9qc3goRG93bmxvYWQsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgZGlzYWJsZWQ6IGJhY2t1cC5zdGF0dXMgIT09ICdjb21wbGV0ZWQnLCBjaGlsZHJlbjogXCJEb3dubG9hZFwiIH0pLCBfanN4KEJ1dHRvbiwgeyBzaXplOiBcInNtXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVSZXN0b3JlQmFja3VwKGJhY2t1cCksIGljb246IF9qc3goUm90YXRlQ2N3LCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIGRpc2FibGVkOiBiYWNrdXAuc3RhdHVzICE9PSAnY29tcGxldGVkJywgY2hpbGRyZW46IFwiUmVzdG9yZVwiIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gaGFuZGxlRGVsZXRlQmFja3VwKGJhY2t1cCksIGNsYXNzTmFtZTogXCJwLTIgdGV4dC1uZXV0cmFsLTYwMCBob3Zlcjp0ZXh0LWVycm9yLTYwMCB0cmFuc2l0aW9uLWNvbG9yc1wiLCBcImFyaWEtbGFiZWxcIjogXCJEZWxldGUgYmFja3VwXCIsIGRpc2FibGVkOiBiYWNrdXAuc3RhdHVzID09PSAnaW5fcHJvZ3Jlc3MnLCBjaGlsZHJlbjogX2pzeChUcmFzaDIsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSB9KV0gfSldIH0sIGJhY2t1cC5pZCkpKSB9KSldIH0pLCByZXN0b3JlQ29uZmlybWF0aW9uICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZpeGVkIGluc2V0LTAgYmctYmxhY2sgYmctb3BhY2l0eS01MCBiYWNrZHJvcC1ibHVyLXNtIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy0yeGwgbWF4LXctbWQgdy1mdWxsIHAtNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtMyBiZy13YXJuaW5nLTEwMCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBfanN4KFJvdGF0ZUNjdywgeyBjbGFzc05hbWU6IFwiaC02IHctNiB0ZXh0LXdhcm5pbmctNjAwXCIgfSkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMVwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJDb25maXJtIFJlc3RvcmVcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMiB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlc3RvcmUgZnJvbSB0aGlzIGJhY2t1cD8gVGhpcyB3aWxsIHJlcGxhY2UgYWxsIGN1cnJlbnQgZGF0YSB3aXRoIHRoZSBiYWNrdXAgZGF0YS5cIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibXQtNCBwLTMgYmctbmV1dHJhbC01MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDBcIiwgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IHJlc3RvcmVDb25maXJtYXRpb24uZmlsZW5hbWUgfSksIF9qc3hzKFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtbmV1dHJhbC02MDAgbXQtMVwiLCBjaGlsZHJlbjogW1wiQ3JlYXRlZDogXCIsIG5ldyBEYXRlKHJlc3RvcmVDb25maXJtYXRpb24uY3JlYXRlZF9hdCkudG9Mb2NhbGVTdHJpbmcoKV0gfSksIF9qc3hzKFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFtcIlNpemU6IFwiLCByZXN0b3JlQ29uZmlybWF0aW9uLnNpemVdIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibXQtNCBwLTMgYmctd2FybmluZy01MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItd2FybmluZy0yMDBcIiwgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtd2FybmluZy04MDAgZm9udC1tZWRpdW1cIiwgY2hpbGRyZW46IFwiXFx1MjZBMFxcdUZFMEYgV2FybmluZ1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtd2FybmluZy03MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lLiBBbGwgY3VycmVudCBkYXRhIHdpbGwgYmUgcmVwbGFjZWQuIEl0J3MgcmVjb21tZW5kZWQgdG8gY3JlYXRlIGEgYmFja3VwIGJlZm9yZSByZXN0b3JpbmcuXCIgfSldIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZ2FwLTMgbXQtNlwiLCBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiBzZXRSZXN0b3JlQ29uZmlybWF0aW9uKG51bGwpLCBmdWxsV2lkdGg6IHRydWUsIGNoaWxkcmVuOiBcIkNhbmNlbFwiIH0pLCBfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBcImRhbmdlclwiLCBvbkNsaWNrOiBjb25maXJtUmVzdG9yZSwgZnVsbFdpZHRoOiB0cnVlLCBpY29uOiBfanN4KFJvdGF0ZUNjdywgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBjaGlsZHJlbjogXCJSZXN0b3JlIEJhY2t1cFwiIH0pXSB9KV0gfSkgfSkpXSB9KSk7XG4gICAgICAgICAgICBjYXNlICdpbnRlZ3JhdGlvbnMnOlxuICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJJbnRlZ3JhdGlvbnNcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMSB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiQ29ubmVjdCBhbmQgY29uZmlndXJlIHRoaXJkLXBhcnR5IGludGVncmF0aW9ucyB0byBleHRlbmQgZnVuY3Rpb25hbGl0eS5cIiB9KV0gfSksIFsncGF5bWVudCcsICdlbWFpbCcsICdjYWxlbmRhcicsICdjb21tdW5pY2F0aW9uJ10ubWFwKChjYXRlZ29yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5SW50ZWdyYXRpb25zID0gaW50ZWdyYXRpb25zLmZpbHRlcihpbnQgPT4gaW50LmNhdGVnb3J5ID09PSBjYXRlZ29yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhdGVnb3J5SW50ZWdyYXRpb25zLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTIwMCBwYi0yXCIsIGNoaWxkcmVuOiBnZXRDYXRlZ29yeUxhYmVsKGNhdGVnb3J5KSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCIsIGNoaWxkcmVuOiBjYXRlZ29yeUludGVncmF0aW9ucy5tYXAoKGludGVncmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IEljb24gPSBpbnRlZ3JhdGlvbi5pY29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLXdoaXRlIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcm91bmRlZC1sZyBwLTQgaG92ZXI6c2hhZG93LW1kIHRyYW5zaXRpb24tc2hhZG93XCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlblwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1zdGFydCBzcGFjZS14LTMgZmxleC0xXCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LXNocmluay0wXCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctMTIgaC0xMiBiZy1wcmltYXJ5LTUwIHJvdW5kZWQtbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgY2hpbGRyZW46IF9qc3goSWNvbiwgeyBjbGFzc05hbWU6IFwiaC02IHctNiB0ZXh0LXByaW1hcnktNjAwXCIgfSkgfSkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMSBtaW4tdy0wXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwiaDRcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogaW50ZWdyYXRpb24ubmFtZSB9KSwgZ2V0U3RhdHVzSWNvbihpbnRlZ3JhdGlvbi5zdGF0dXMpXSB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMSB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IGludGVncmF0aW9uLmRlc2NyaXB0aW9uIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtdC0zIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCIsIGNoaWxkcmVuOiBbZ2V0U3RhdHVzQmFkZ2UoaW50ZWdyYXRpb24uc3RhdHVzKSwgaW50ZWdyYXRpb24ubGFzdFN5bmMgJiYgKF9qc3hzKFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtbmV1dHJhbC01MDBcIiwgY2hpbGRyZW46IFtcIkxhc3Qgc3luY2VkOiBcIiwgZm9ybWF0UmVsYXRpdmVUaW1lKGludGVncmF0aW9uLmxhc3RTeW5jKV0gfSkpXSB9KSwgaW50ZWdyYXRpb24uYXBpS2V5ICYmIGludGVncmF0aW9uLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm10LTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBbX2pzeChLZXksIHsgY2xhc3NOYW1lOiBcImgtMyB3LTNcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiZm9udC1tb25vXCIsIGNoaWxkcmVuOiBpbnRlZ3JhdGlvbi5hcGlLZXkgfSldIH0pKV0gfSldIH0pIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm10LTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IGludGVncmF0aW9uLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcgPyAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbX2pzeChCdXR0b24sIHsgc2l6ZTogXCJzbVwiLCB2YXJpYW50OiBcIm91dGxpbmVcIiwgb25DbGljazogKCkgPT4gaGFuZGxlQ29uZmlndXJlSW50ZWdyYXRpb24oaW50ZWdyYXRpb24pLCBpY29uOiBfanN4KFNldHRpbmdzSWNvbiwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBjaGlsZHJlbjogXCJDb25maWd1cmVcIiB9KSwgX2pzeChCdXR0b24sIHsgc2l6ZTogXCJzbVwiLCB2YXJpYW50OiBcIm91dGxpbmVcIiwgb25DbGljazogKCkgPT4gaGFuZGxlVGVzdEludGVncmF0aW9uKGludGVncmF0aW9uKSwgaWNvbjogX2pzeChaYXAsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgY2hpbGRyZW46IFwiVGVzdFwiIH0pLCBfanN4KEJ1dHRvbiwgeyBzaXplOiBcInNtXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVEaXNjb25uZWN0SW50ZWdyYXRpb24oaW50ZWdyYXRpb24pLCBjaGlsZHJlbjogXCJEaXNjb25uZWN0XCIgfSldIH0pKSA6IGludGVncmF0aW9uLnN0YXR1cyA9PT0gJ2Vycm9yJyA/IChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4KEJ1dHRvbiwgeyBzaXplOiBcInNtXCIsIHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDb25maWd1cmVJbnRlZ3JhdGlvbihpbnRlZ3JhdGlvbiksIGljb246IF9qc3goU2V0dGluZ3NJY29uLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIGNoaWxkcmVuOiBcIlJlY29uZmlndXJlXCIgfSksIF9qc3goQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJvdXRsaW5lXCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZURpc2Nvbm5lY3RJbnRlZ3JhdGlvbihpbnRlZ3JhdGlvbiksIGNoaWxkcmVuOiBcIkRpc2Nvbm5lY3RcIiB9KV0gfSkpIDogKF9qc3goQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJwcmltYXJ5XCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNvbmZpZ3VyZUludGVncmF0aW9uKGludGVncmF0aW9uKSwgaWNvbjogX2pzeChQbHVnLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIGNoaWxkcmVuOiBcIkNvbm5lY3RcIiB9KSkgfSldIH0sIGludGVncmF0aW9uLmlkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgfSldIH0sIGNhdGVnb3J5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwgY29uZmlndXJpbmdJbnRlZ3JhdGlvbiAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrIGJnLW9wYWNpdHktNTAgYmFja2Ryb3AtYmx1ci1zbSB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNFwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctMnhsIG1heC13LWxnIHctZnVsbCBtYXgtaC1bOTB2aF0gb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2xcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCIsIGNoaWxkcmVuOiBbUmVhY3QuY3JlYXRlRWxlbWVudChjb25maWd1cmluZ0ludGVncmF0aW9uLmljb24sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnaC02IHctNiB0ZXh0LXByaW1hcnktNjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgX2pzeHMoXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogW1wiQ29uZmlndXJlIFwiLCBjb25maWd1cmluZ0ludGVncmF0aW9uLm5hbWVdIH0pXSB9KSwgX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHNldENvbmZpZ3VyaW5nSW50ZWdyYXRpb24obnVsbCksIGNsYXNzTmFtZTogXCJ0ZXh0LW5ldXRyYWwtNDAwIGhvdmVyOnRleHQtbmV1dHJhbC02MDAgdHJhbnNpdGlvbi1jb2xvcnNcIiwgXCJhcmlhLWxhYmVsXCI6IFwiQ2xvc2VcIiwgY2hpbGRyZW46IF9qc3goWCwgeyBjbGFzc05hbWU6IFwiaC01IHctNVwiIH0pIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgb3ZlcmZsb3cteS1hdXRvIGZsZXgtMVwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBjb25maWd1cmluZ0ludGVncmF0aW9uLmRlc2NyaXB0aW9uIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTJcIiwgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTcwMFwiLCBjaGlsZHJlbjogW1wiQVBJIEtleSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1lcnJvci02MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmVcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBzaG93QXBpS2V5ID8gJ3RleHQnIDogJ3Bhc3N3b3JkJywgdmFsdWU6IGludGVncmF0aW9uQ29uZmlnLmFwaUtleSwgb25DaGFuZ2U6IChlKSA9PiBzZXRJbnRlZ3JhdGlvbkNvbmZpZyh7IC4uLmludGVncmF0aW9uQ29uZmlnLCBhcGlLZXk6IGUudGFyZ2V0LnZhbHVlIH0pLCBwbGFjZWhvbGRlcjogXCJFbnRlciB5b3VyIEFQSSBrZXlcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHctZnVsbCBwci0xMCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItbmV1dHJhbC0zMDAgYmctd2hpdGUgdGV4dC1uZXV0cmFsLTkwMCBwbGFjZWhvbGRlci1uZXV0cmFsLTQwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS01MDAgZm9jdXM6Ym9yZGVyLXByaW1hcnktNTAwIHB4LTQgcHktMiB0ZXh0LWJhc2UgaC0xMFwiIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogKCkgPT4gc2V0U2hvd0FwaUtleSghc2hvd0FwaUtleSksIGNsYXNzTmFtZTogXCJhYnNvbHV0ZSByaWdodC0zIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB0ZXh0LW5ldXRyYWwtNDAwIGhvdmVyOnRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IHNob3dBcGlLZXkgPyAoX2pzeChFeWVPZmYsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSkgOiAoX2pzeChFeWUsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSkgfSldIH0pLCBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyB0ZXh0LW5ldXRyYWwtNTAwXCIsIGNoaWxkcmVuOiBbXCJHZXQgeW91ciBBUEkga2V5IGZyb20gdGhlIFwiLCBjb25maWd1cmluZ0ludGVncmF0aW9uLm5hbWUsIFwiIGRhc2hib2FyZFwiXSB9KV0gfSksIFsnc3RyaXBlJywgJ3BheXBhbCcsICd0d2lsaW8nXS5pbmNsdWRlcyhjb25maWd1cmluZ0ludGVncmF0aW9uLmlkKSAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS0yXCIsIGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTcwMFwiLCBjaGlsZHJlbjogXCJBUEkgU2VjcmV0XCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwicGFzc3dvcmRcIiwgdmFsdWU6IGludGVncmF0aW9uQ29uZmlnLmFwaVNlY3JldCwgb25DaGFuZ2U6IChlKSA9PiBzZXRJbnRlZ3JhdGlvbkNvbmZpZyh7IC4uLmludGVncmF0aW9uQ29uZmlnLCBhcGlTZWNyZXQ6IGUudGFyZ2V0LnZhbHVlIH0pLCBwbGFjZWhvbGRlcjogXCJFbnRlciB5b3VyIEFQSSBzZWNyZXQgKG9wdGlvbmFsKVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdy1mdWxsIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTMwMCBiZy13aGl0ZSB0ZXh0LW5ldXRyYWwtOTAwIHBsYWNlaG9sZGVyLW5ldXRyYWwtNDAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBmb2N1czpib3JkZXItcHJpbWFyeS01MDAgcHgtNCBweS0yIHRleHQtYmFzZSBoLTEwXCIgfSldIH0pKSwgWydzdHJpcGUnLCAncGF5cGFsJ10uaW5jbHVkZXMoY29uZmlndXJpbmdJbnRlZ3JhdGlvbi5pZCkgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktMlwiLCBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IFwiV2ViaG9vayBVUkxcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS93ZWJob29rcy8ke2NvbmZpZ3VyaW5nSW50ZWdyYXRpb24uaWR9YCwgcmVhZE9ubHk6IHRydWUsIGNsYXNzTmFtZTogXCJibG9jayB3LWZ1bGwgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMzAwIGJnLW5ldXRyYWwtNTAgdGV4dC1uZXV0cmFsLTcwMCBweC00IHB5LTIgdGV4dC1zbSBoLTEwXCIgfSksIF9qc3goQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJvdXRsaW5lXCIsIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS93ZWJob29rcy8ke2NvbmZpZ3VyaW5nSW50ZWdyYXRpb24uaWR9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnV2ViaG9vayBVUkwgY29waWVkIHRvIGNsaXBib2FyZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBjaGlsZHJlbjogXCJDb3B5XCIgfSldIH0pLCBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyB0ZXh0LW5ldXRyYWwtNTAwXCIsIGNoaWxkcmVuOiBbXCJBZGQgdGhpcyB3ZWJob29rIFVSTCB0byB5b3VyIFwiLCBjb25maWd1cmluZ0ludGVncmF0aW9uLm5hbWUsIFwiIGFjY291bnRcIl0gfSldIH0pKSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy1wcmltYXJ5LTUwIGJvcmRlciBib3JkZXItcHJpbWFyeS0yMDAgcm91bmRlZC1sZyBwLTNcIiwgY2hpbGRyZW46IF9qc3hzKFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcHJpbWFyeS04MDBcIiwgY2hpbGRyZW46IFtfanN4KFwic3Ryb25nXCIsIHsgY2hpbGRyZW46IFwiTmVlZCBoZWxwP1wiIH0pLCBcIiBWaXNpdCB0aGVcIiwgJyAnLCBfanN4cyhcImFcIiwgeyBocmVmOiBgaHR0cHM6Ly9kb2NzLmV4YW1wbGUuY29tL2ludGVncmF0aW9ucy8ke2NvbmZpZ3VyaW5nSW50ZWdyYXRpb24uaWR9YCwgdGFyZ2V0OiBcIl9ibGFua1wiLCByZWw6IFwibm9vcGVuZXIgbm9yZWZlcnJlclwiLCBjbGFzc05hbWU6IFwidW5kZXJsaW5lIGhvdmVyOnRleHQtcHJpbWFyeS05MDBcIiwgY2hpbGRyZW46IFtjb25maWd1cmluZ0ludGVncmF0aW9uLm5hbWUsIFwiIGludGVncmF0aW9uIGd1aWRlXCJdIH0pLCAnICcsIFwiZm9yIGRldGFpbGVkIHNldHVwIGluc3RydWN0aW9ucy5cIl0gfSkgfSldIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTQgYm9yZGVyLXQgYm9yZGVyLW5ldXRyYWwtMjAwIGJnLW5ldXRyYWwtNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgZ2FwLTNcIiwgY2hpbGRyZW46IFtfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgb25DbGljazogKCkgPT4gc2V0Q29uZmlndXJpbmdJbnRlZ3JhdGlvbihudWxsKSwgZGlzYWJsZWQ6IGlzU2F2aW5nSW50ZWdyYXRpb24sIGNoaWxkcmVuOiBcIkNhbmNlbFwiIH0pLCBfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBcInByaW1hcnlcIiwgb25DbGljazogaGFuZGxlU2F2ZUludGVncmF0aW9uQ29uZmlnLCBsb2FkaW5nOiBpc1NhdmluZ0ludGVncmF0aW9uLCBkaXNhYmxlZDogaXNTYXZpbmdJbnRlZ3JhdGlvbiB8fCAhaW50ZWdyYXRpb25Db25maWcuYXBpS2V5LnRyaW0oKSwgY2hpbGRyZW46IFwiU2F2ZSBDb25maWd1cmF0aW9uXCIgfSldIH0pXSB9KSB9KSldIH0pKTtcbiAgICAgICAgICAgIGNhc2UgJ2FyY2hpdmUnOlxuICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJBcmNoaXZlIFNldHRpbmdzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTEgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIkNvbmZpZ3VyZSBhcmNoaXZlIGJlaGF2aW9yIGFuZCByZXRlbnRpb24gcG9saWNpZXMgZm9yIGRlbGV0ZWQgaXRlbXMuXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTIwMCBwYi0yXCIsIGNoaWxkcmVuOiBcIkFyY2hpdmUgUG9saWNpZXNcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gcC00IGJnLW5ldXRyYWwtNTAgcm91bmRlZC1sZ1wiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMVwiLCBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFwiRW5hYmxlIEF1dG8tQXJjaGl2ZVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJBdXRvbWF0aWNhbGx5IGFyY2hpdmUgaW5hY3RpdmUgaXRlbXMgYWZ0ZXIgYSBzcGVjaWZpZWQgcGVyaW9kXCIgfSldIH0pLCBfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcInJlbGF0aXZlIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBjdXJzb3ItcG9pbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgY2hlY2tlZDogYXJjaGl2ZVNldHRpbmdzLmF1dG9BcmNoaXZlRW5hYmxlZCwgb25DaGFuZ2U6IChlKSA9PiBzZXRBcmNoaXZlU2V0dGluZ3MoeyAuLi5hcmNoaXZlU2V0dGluZ3MsIGF1dG9BcmNoaXZlRW5hYmxlZDogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcInNyLW9ubHkgcGVlclwiIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctMTEgaC02IGJnLW5ldXRyYWwtMjAwIHBlZXItZm9jdXM6b3V0bGluZS1ub25lIHBlZXItZm9jdXM6cmluZy00IHBlZXItZm9jdXM6cmluZy1wcmltYXJ5LTMwMCByb3VuZGVkLWZ1bGwgcGVlciBwZWVyLWNoZWNrZWQ6YWZ0ZXI6dHJhbnNsYXRlLXgtZnVsbCBwZWVyLWNoZWNrZWQ6YWZ0ZXI6Ym9yZGVyLXdoaXRlIGFmdGVyOmNvbnRlbnQtWycnXSBhZnRlcjphYnNvbHV0ZSBhZnRlcjp0b3AtWzJweF0gYWZ0ZXI6bGVmdC1bMnB4XSBhZnRlcjpiZy13aGl0ZSBhZnRlcjpib3JkZXItbmV1dHJhbC0zMDAgYWZ0ZXI6Ym9yZGVyIGFmdGVyOnJvdW5kZWQtZnVsbCBhZnRlcjpoLTUgYWZ0ZXI6dy01IGFmdGVyOnRyYW5zaXRpb24tYWxsIHBlZXItY2hlY2tlZDpiZy1wcmltYXJ5LTYwMFwiIH0pXSB9KV0gfSksIGFyY2hpdmVTZXR0aW5ncy5hdXRvQXJjaGl2ZUVuYWJsZWQgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwIG1iLTJcIiwgY2hpbGRyZW46IFwiQXV0by1BcmNoaXZlIEFmdGVyIChEYXlzKVwiIH0pLCBfanN4KElucHV0LCB7IHR5cGU6IFwibnVtYmVyXCIsIG1pbjogXCIzMFwiLCBtYXg6IFwiMzY1MFwiLCB2YWx1ZTogYXJjaGl2ZVNldHRpbmdzLmF1dG9BcmNoaXZlRGF5cywgb25DaGFuZ2U6IChlKSA9PiBzZXRBcmNoaXZlU2V0dGluZ3MoeyAuLi5hcmNoaXZlU2V0dGluZ3MsIGF1dG9BcmNoaXZlRGF5czogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIHx8IDM2NSB9KSwgaGVscGVyVGV4dDogXCJJdGVtcyBpbmFjdGl2ZSBmb3IgdGhpcyBtYW55IGRheXMgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGFyY2hpdmVkXCIgfSldIH0pKSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC03MDAgbWItMlwiLCBjaGlsZHJlbjogXCJBcmNoaXZlIFJldGVudGlvbiBQZXJpb2QgKERheXMpXCIgfSksIF9qc3goSW5wdXQsIHsgdHlwZTogXCJudW1iZXJcIiwgbWluOiBcIjMwXCIsIG1heDogXCIzNjUwXCIsIHZhbHVlOiBhcmNoaXZlU2V0dGluZ3MucmV0ZW50aW9uUGVyaW9kLCBvbkNoYW5nZTogKGUpID0+IHNldEFyY2hpdmVTZXR0aW5ncyh7IC4uLmFyY2hpdmVTZXR0aW5ncywgcmV0ZW50aW9uUGVyaW9kOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSkgfHwgOTAgfSksIGhlbHBlclRleHQ6IFwiQXJjaGl2ZWQgaXRlbXMgd2lsbCBiZSBrZXB0IGZvciB0aGlzIG1hbnkgZGF5cyBiZWZvcmUgcGVybWFuZW50IGRlbGV0aW9uXCIgfSldIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFwiQXJjaGl2ZSBQZXJtaXNzaW9uc1wiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBwLTQgYmctbmV1dHJhbC01MCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xXCIsIGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJBbGxvdyBJdGVtIFJlc3RvcmF0aW9uXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBcIlVzZXJzIHdpdGggYXBwcm9wcmlhdGUgcGVybWlzc2lvbnMgY2FuIHJlc3RvcmUgYXJjaGl2ZWQgaXRlbXNcIiB9KV0gfSksIF9qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGN1cnNvci1wb2ludGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBjaGVja2VkOiBhcmNoaXZlU2V0dGluZ3MuYWxsb3dSZXN0b3JlLCBvbkNoYW5nZTogKGUpID0+IHNldEFyY2hpdmVTZXR0aW5ncyh7IC4uLmFyY2hpdmVTZXR0aW5ncywgYWxsb3dSZXN0b3JlOiBlLnRhcmdldC5jaGVja2VkIH0pLCBjbGFzc05hbWU6IFwic3Itb25seSBwZWVyXCIgfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidy0xMSBoLTYgYmctbmV1dHJhbC0yMDAgcGVlci1mb2N1czpvdXRsaW5lLW5vbmUgcGVlci1mb2N1czpyaW5nLTQgcGVlci1mb2N1czpyaW5nLXByaW1hcnktMzAwIHJvdW5kZWQtZnVsbCBwZWVyIHBlZXItY2hlY2tlZDphZnRlcjp0cmFuc2xhdGUteC1mdWxsIHBlZXItY2hlY2tlZDphZnRlcjpib3JkZXItd2hpdGUgYWZ0ZXI6Y29udGVudC1bJyddIGFmdGVyOmFic29sdXRlIGFmdGVyOnRvcC1bMnB4XSBhZnRlcjpsZWZ0LVsycHhdIGFmdGVyOmJnLXdoaXRlIGFmdGVyOmJvcmRlci1uZXV0cmFsLTMwMCBhZnRlcjpib3JkZXIgYWZ0ZXI6cm91bmRlZC1mdWxsIGFmdGVyOmgtNSBhZnRlcjp3LTUgYWZ0ZXI6dHJhbnNpdGlvbi1hbGwgcGVlci1jaGVja2VkOmJnLXByaW1hcnktNjAwXCIgfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gcC00IGJnLW5ldXRyYWwtNTAgcm91bmRlZC1sZ1wiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMVwiLCBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFwiUmVxdWlyZSBBcmNoaXZlIENvbmZpcm1hdGlvblwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJTaG93IGNvbmZpcm1hdGlvbiBkaWFsb2cgYmVmb3JlIGFyY2hpdmluZyBpdGVtc1wiIH0pXSB9KSwgX2pzeHMoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJyZWxhdGl2ZSBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgY3Vyc29yLXBvaW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNoZWNrZWQ6IGFyY2hpdmVTZXR0aW5ncy5yZXF1aXJlQ29uZmlybWF0aW9uLCBvbkNoYW5nZTogKGUpID0+IHNldEFyY2hpdmVTZXR0aW5ncyh7IC4uLmFyY2hpdmVTZXR0aW5ncywgcmVxdWlyZUNvbmZpcm1hdGlvbjogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcInNyLW9ubHkgcGVlclwiIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctMTEgaC02IGJnLW5ldXRyYWwtMjAwIHBlZXItZm9jdXM6b3V0bGluZS1ub25lIHBlZXItZm9jdXM6cmluZy00IHBlZXItZm9jdXM6cmluZy1wcmltYXJ5LTMwMCByb3VuZGVkLWZ1bGwgcGVlciBwZWVyLWNoZWNrZWQ6YWZ0ZXI6dHJhbnNsYXRlLXgtZnVsbCBwZWVyLWNoZWNrZWQ6YWZ0ZXI6Ym9yZGVyLXdoaXRlIGFmdGVyOmNvbnRlbnQtWycnXSBhZnRlcjphYnNvbHV0ZSBhZnRlcjp0b3AtWzJweF0gYWZ0ZXI6bGVmdC1bMnB4XSBhZnRlcjpiZy13aGl0ZSBhZnRlcjpib3JkZXItbmV1dHJhbC0zMDAgYWZ0ZXI6Ym9yZGVyIGFmdGVyOnJvdW5kZWQtZnVsbCBhZnRlcjpoLTUgYWZ0ZXI6dy01IGFmdGVyOnRyYW5zaXRpb24tYWxsIHBlZXItY2hlY2tlZDpiZy1wcmltYXJ5LTYwMFwiIH0pXSB9KV0gfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMCBib3JkZXItYiBib3JkZXItbmV1dHJhbC0yMDAgcGItMlwiLCBjaGlsZHJlbjogXCJOb3RpZmljYXRpb25zXCIgfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBwLTQgYmctbmV1dHJhbC01MCByb3VuZGVkLWxnXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xXCIsIGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJOb3RpZnkgb24gQXJjaGl2ZVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJTZW5kIG5vdGlmaWNhdGlvbnMgd2hlbiBpdGVtcyBhcmUgYXJjaGl2ZWRcIiB9KV0gfSksIF9qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGN1cnNvci1wb2ludGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBjaGVja2VkOiBhcmNoaXZlU2V0dGluZ3Mubm90aWZ5T25BcmNoaXZlLCBvbkNoYW5nZTogKGUpID0+IHNldEFyY2hpdmVTZXR0aW5ncyh7IC4uLmFyY2hpdmVTZXR0aW5ncywgbm90aWZ5T25BcmNoaXZlOiBlLnRhcmdldC5jaGVja2VkIH0pLCBjbGFzc05hbWU6IFwic3Itb25seSBwZWVyXCIgfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidy0xMSBoLTYgYmctbmV1dHJhbC0yMDAgcGVlci1mb2N1czpvdXRsaW5lLW5vbmUgcGVlci1mb2N1czpyaW5nLTQgcGVlci1mb2N1czpyaW5nLXByaW1hcnktMzAwIHJvdW5kZWQtZnVsbCBwZWVyIHBlZXItY2hlY2tlZDphZnRlcjp0cmFuc2xhdGUteC1mdWxsIHBlZXItY2hlY2tlZDphZnRlcjpib3JkZXItd2hpdGUgYWZ0ZXI6Y29udGVudC1bJyddIGFmdGVyOmFic29sdXRlIGFmdGVyOnRvcC1bMnB4XSBhZnRlcjpsZWZ0LVsycHhdIGFmdGVyOmJnLXdoaXRlIGFmdGVyOmJvcmRlci1uZXV0cmFsLTMwMCBhZnRlcjpib3JkZXIgYWZ0ZXI6cm91bmRlZC1mdWxsIGFmdGVyOmgtNSBhZnRlcjp3LTUgYWZ0ZXI6dHJhbnNpdGlvbi1hbGwgcGVlci1jaGVja2VkOmJnLXByaW1hcnktNjAwXCIgfSldIH0pXSB9KSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIHBiLTJcIiwgY2hpbGRyZW46IFwiUXVpY2sgQWN0aW9uc1wiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtd3JhcCBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBpY29uOiBfanN4KEFyY2hpdmUsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgb25DbGljazogKCkgPT4gd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2FyY2hpdmUtbWFuYWdlbWVudCcsIGNoaWxkcmVuOiBcIlZpZXcgQXJjaGl2ZVwiIH0pLCBfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgaWNvbjogX2pzeChEb3dubG9hZCwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBvbkNsaWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IEltcGxlbWVudCBhY3R1YWwgYXJjaGl2ZSBleHBvcnQgQVBJIGVuZHBvaW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9yIG5vdywgc2hvdyBhIHByb3BlciBtZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdpbmZvJywgJ1ByZXBhcmluZyBhcmNoaXZlIGV4cG9ydC4gVGhpcyBtYXkgdGFrZSBhIGZldyBtb21lbnRzLi4uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2ltdWxhdGUgZXhwb3J0IHByZXBhcmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDE1MDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnQXJjaGl2ZSBleHBvcnQgd2lsbCBiZSBhdmFpbGFibGUgaW4geW91ciBkb3dubG9hZHMgc2hvcnRseScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gZXhwb3J0IGFyY2hpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgY2hpbGRyZW46IFwiRXhwb3J0IEFyY2hpdmVcIiB9KV0gfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1lbmQgcHQtNCBib3JkZXItdCBib3JkZXItbmV1dHJhbC0yMDBcIiwgY2hpbGRyZW46IF9qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBvbkNsaWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJc1NhdmluZyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGFjdHVhbCBBUEkgY2FsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF3YWl0IGFwaS5wb3N0KCcvc2V0dGluZ3MvYXJjaGl2ZScsIGFyY2hpdmVTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnQXJjaGl2ZSBzZXR0aW5ncyBzYXZlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIHNhdmUgYXJjaGl2ZSBzZXR0aW5ncycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNTYXZpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBsb2FkaW5nOiBpc1NhdmluZywgZGlzYWJsZWQ6IGlzU2F2aW5nLCBjaGlsZHJlbjogXCJTYXZlIEFyY2hpdmUgU2V0dGluZ3NcIiB9KSB9KV0gfSkpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIlNldHRpbmdzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTIgdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJDb25maWd1cmUgc3lzdGVtIHByZWZlcmVuY2VzIGFuZCBvcHRpb25zXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGdhcC02XCIsIGNoaWxkcmVuOiBbX2pzeChcIm5hdlwiLCB7IGNsYXNzTmFtZTogXCJoaWRkZW4gbGc6YmxvY2sgdy02NCBmbGV4LXNocmluay0wXCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCBvdmVyZmxvdy1oaWRkZW5cIiwgY2hpbGRyZW46IHRhYnMubWFwKCh0YWIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IHRhYi5pY29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZVRhYiA9PT0gdGFiLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3hzKFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0QWN0aXZlVGFiKHRhYi5pZCksIGNsYXNzTmFtZTogY24oJ3ctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBweC00IHB5LTMgdGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycycsICdib3JkZXItbC00IGhvdmVyOmJnLW5ldXRyYWwtNTAnLCBpc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1wcmltYXJ5LTYwMCBiZy1wcmltYXJ5LTUwIHRleHQtcHJpbWFyeS03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtbmV1dHJhbC03MDAnKSwgY2hpbGRyZW46IFtfanN4KEljb24sIHsgY2xhc3NOYW1lOiBjbignbXItMyBoLTUgdy01JywgaXNBY3RpdmUgPyAndGV4dC1wcmltYXJ5LTYwMCcgOiAndGV4dC1uZXV0cmFsLTQwMCcpIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiB0YWIubGFiZWwgfSldIH0sIHRhYi5pZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIH0pIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImxnOmhpZGRlblwiLCBjaGlsZHJlbjogX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcC0yXCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggb3ZlcmZsb3cteC1hdXRvIHNwYWNlLXgtMiBzY3JvbGxiYXItaGlkZVwiLCBjaGlsZHJlbjogdGFicy5tYXAoKHRhYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IHRhYi5pY29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVUYWIgPT09IHRhYi5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRBY3RpdmVUYWIodGFiLmlkKSwgY2xhc3NOYW1lOiBjbignZmxleCBpdGVtcy1jZW50ZXIgcHgtNCBweS0yIHRleHQtc20gZm9udC1tZWRpdW0gcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCcsIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXByaW1hcnktNjAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLW5ldXRyYWwtMTAwIHRleHQtbmV1dHJhbC03MDAgaG92ZXI6YmctbmV1dHJhbC0yMDAnKSwgY2hpbGRyZW46IFtfanN4KEljb24sIHsgY2xhc3NOYW1lOiBcIm1yLTIgaC00IHctNFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiB0YWIubGFiZWwgfSldIH0sIHRhYi5pZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSB9KSB9KSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTEgbWluLXctMFwiLCBjaGlsZHJlbjogX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcC02XCIsIGNoaWxkcmVuOiByZW5kZXJUYWJDb250ZW50KCkgfSkgfSldIH0pXSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3M7XG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInJlY3RcIiwgeyB3aWR0aDogXCIyMFwiLCBoZWlnaHQ6IFwiNVwiLCB4OiBcIjJcIiwgeTogXCIzXCIsIHJ4OiBcIjFcIiwga2V5OiBcIjF3cDF1MVwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNNCA4djExYTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4XCIsIGtleTogXCIxczgwanBcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEwIDEyaDRcIiwga2V5OiBcImE1NmIwcFwiIH1dXG5dO1xuY29uc3QgQXJjaGl2ZSA9IGNyZWF0ZUx1Y2lkZUljb24oXCJhcmNoaXZlXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBBcmNoaXZlIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFyY2hpdmUuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMCAxMmg0XCIsIGtleTogXCJhNTZiMHBcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEwIDhoNFwiLCBrZXk6IFwiMXNyMmFmXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNCAyMXYtM2EyIDIgMCAwIDAtNCAwdjNcIiwga2V5OiBcIjFyZ2llaVwiIH1dLFxuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNNiAxMEg0YTIgMiAwIDAgMC0yIDJ2N2EyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJWOWEyIDIgMCAwIDAtMi0yaC0yXCIsXG4gICAgICBrZXk6IFwic2VjbWkyXCJcbiAgICB9XG4gIF0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk02IDIxVjVhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJ2MTZcIiwga2V5OiBcIjE2cmEwdFwiIH1dXG5dO1xuY29uc3QgQnVpbGRpbmcyID0gY3JlYXRlTHVjaWRlSWNvbihcImJ1aWxkaW5nLTJcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIEJ1aWxkaW5nMiBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWlsZGluZy0yLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1tcInBhdGhcIiwgeyBkOiBcIk0yMCA2IDkgMTdsLTUtNVwiLCBrZXk6IFwiMWdtZjJjXCIgfV1dO1xuY29uc3QgQ2hlY2sgPSBjcmVhdGVMdWNpZGVJY29uKFwiY2hlY2tcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIENoZWNrIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNoZWNrLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMlwiLCBjeTogXCIxMlwiLCByOiBcIjEwXCIsIGtleTogXCIxbWdsYXlcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTE1IDktNiA2XCIsIGtleTogXCIxdXpodnJcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTkgOSA2IDZcIiwga2V5OiBcInowYmlxZlwiIH1dXG5dO1xuY29uc3QgQ2lyY2xlWCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJjaXJjbGUteFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQ2lyY2xlWCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jaXJjbGUteC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDZ2Nmw0IDJcIiwga2V5OiBcIm1tazd5Z1wiIH1dLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMlwiLCBjeTogXCIxMlwiLCByOiBcIjEwXCIsIGtleTogXCIxbWdsYXlcIiB9XVxuXTtcbmNvbnN0IENsb2NrID0gY3JlYXRlTHVjaWRlSWNvbihcImNsb2NrXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBDbG9jayBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbG9jay5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicmVjdFwiLCB7IHdpZHRoOiBcIjIwXCIsIGhlaWdodDogXCIxNFwiLCB4OiBcIjJcIiwgeTogXCI1XCIsIHJ4OiBcIjJcIiwga2V5OiBcInlueXA4elwiIH1dLFxuICBbXCJsaW5lXCIsIHsgeDE6IFwiMlwiLCB4MjogXCIyMlwiLCB5MTogXCIxMFwiLCB5MjogXCIxMFwiLCBrZXk6IFwiMWIzdm1vXCIgfV1cbl07XG5jb25zdCBDcmVkaXRDYXJkID0gY3JlYXRlTHVjaWRlSWNvbihcImNyZWRpdC1jYXJkXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBDcmVkaXRDYXJkIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNyZWRpdC1jYXJkLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJlbGxpcHNlXCIsIHsgY3g6IFwiMTJcIiwgY3k6IFwiNVwiLCByeDogXCI5XCIsIHJ5OiBcIjNcIiwga2V5OiBcIm1zc2x3elwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMyA1VjE5QTkgMyAwIDAgMCAyMSAxOVY1XCIsIGtleTogXCIxd2xlbDdcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTMgMTJBOSAzIDAgMCAwIDIxIDEyXCIsIGtleTogXCJtdjdrZTRcIiB9XVxuXTtcbmNvbnN0IERhdGFiYXNlID0gY3JlYXRlTHVjaWRlSWNvbihcImRhdGFiYXNlXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBEYXRhYmFzZSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhYmFzZS5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDE1VjNcIiwga2V5OiBcIm05ZzF4MVwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNFwiLCBrZXk6IFwiaWg3bjNoXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIm03IDEwIDUgNSA1LTVcIiwga2V5OiBcImJyc243MFwiIH1dXG5dO1xuY29uc3QgRG93bmxvYWQgPSBjcmVhdGVMdWNpZGVJY29uKFwiZG93bmxvYWRcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIERvd25sb2FkIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvd25sb2FkLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMTAuNzMzIDUuMDc2YTEwLjc0NCAxMC43NDQgMCAwIDEgMTEuMjA1IDYuNTc1IDEgMSAwIDAgMSAwIC42OTYgMTAuNzQ3IDEwLjc0NyAwIDAgMS0xLjQ0NCAyLjQ5XCIsXG4gICAgICBrZXk6IFwiY3Q4ZTFmXCJcbiAgICB9XG4gIF0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNC4wODQgMTQuMTU4YTMgMyAwIDAgMS00LjI0Mi00LjI0MlwiLCBrZXk6IFwiMTUxcnhoXCIgfV0sXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xNy40NzkgMTcuNDk5YTEwLjc1IDEwLjc1IDAgMCAxLTE1LjQxNy01LjE1MSAxIDEgMCAwIDEgMC0uNjk2IDEwLjc1IDEwLjc1IDAgMCAxIDQuNDQ2LTUuMTQzXCIsXG4gICAgICBrZXk6IFwiMTNiajlhXCJcbiAgICB9XG4gIF0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIm0yIDIgMjAgMjBcIiwga2V5OiBcIjFvb2V3eVwiIH1dXG5dO1xuY29uc3QgRXllT2ZmID0gY3JlYXRlTHVjaWRlSWNvbihcImV5ZS1vZmZcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIEV5ZU9mZiBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leWUtb2ZmLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMi4wNjIgMTIuMzQ4YTEgMSAwIDAgMSAwLS42OTYgMTAuNzUgMTAuNzUgMCAwIDEgMTkuODc2IDAgMSAxIDAgMCAxIDAgLjY5NiAxMC43NSAxMC43NSAwIDAgMS0xOS44NzYgMFwiLFxuICAgICAga2V5OiBcIjFuY2xjMFwiXG4gICAgfVxuICBdLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMlwiLCBjeTogXCIxMlwiLCByOiBcIjNcIiwga2V5OiBcIjF2N3pyZFwiIH1dXG5dO1xuY29uc3QgRXllID0gY3JlYXRlTHVjaWRlSWNvbihcImV5ZVwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgRXllIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV5ZS5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wibGluZVwiLCB7IHgxOiBcIjIyXCIsIHgyOiBcIjJcIiwgeTE6IFwiMTJcIiwgeTI6IFwiMTJcIiwga2V5OiBcIjF5NThpb1wiIH1dLFxuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNNS40NSA1LjExIDIgMTJ2NmEyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJ2LTZsLTMuNDUtNi44OUEyIDIgMCAwIDAgMTYuNzYgNEg3LjI0YTIgMiAwIDAgMC0xLjc5IDEuMTF6XCIsXG4gICAgICBrZXk6IFwib290Nm1yXCJcbiAgICB9XG4gIF0sXG4gIFtcImxpbmVcIiwgeyB4MTogXCI2XCIsIHgyOiBcIjYuMDFcIiwgeTE6IFwiMTZcIiwgeTI6IFwiMTZcIiwga2V5OiBcInNnZjI3OFwiIH1dLFxuICBbXCJsaW5lXCIsIHsgeDE6IFwiMTBcIiwgeDI6IFwiMTAuMDFcIiwgeTE6IFwiMTZcIiwgeTI6IFwiMTZcIiwga2V5OiBcIjFsNGFjeVwiIH1dXG5dO1xuY29uc3QgSGFyZERyaXZlID0gY3JlYXRlTHVjaWRlSWNvbihcImhhcmQtZHJpdmVcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIEhhcmREcml2ZSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oYXJkLWRyaXZlLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJtMTUuNSA3LjUgMi4zIDIuM2ExIDEgMCAwIDAgMS40IDBsMi4xLTIuMWExIDEgMCAwIDAgMC0xLjRMMTkgNFwiLCBrZXk6IFwiZzBmbGRrXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIm0yMSAyLTkuNiA5LjZcIiwga2V5OiBcIjFqMGhvOFwiIH1dLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCI3LjVcIiwgY3k6IFwiMTUuNVwiLCByOiBcIjUuNVwiLCBrZXk6IFwieXFiM2hyXCIgfV1cbl07XG5jb25zdCBLZXkgPSBjcmVhdGVMdWNpZGVJY29uKFwia2V5XCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBLZXkgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2V5LmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJtMjIgNy04Ljk5MSA1LjcyN2EyIDIgMCAwIDEtMi4wMDkgMEwyIDdcIiwga2V5OiBcIjEzMnE3cVwiIH1dLFxuICBbXCJyZWN0XCIsIHsgeDogXCIyXCIsIHk6IFwiNFwiLCB3aWR0aDogXCIyMFwiLCBoZWlnaHQ6IFwiMTZcIiwgcng6IFwiMlwiLCBrZXk6IFwiaXp4bGFvXCIgfV1cbl07XG5jb25zdCBNYWlsID0gY3JlYXRlTHVjaWRlSWNvbihcIm1haWxcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIE1haWwgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTIyIDE3YTIgMiAwIDAgMS0yIDJINi44MjhhMiAyIDAgMCAwLTEuNDE0LjU4NmwtMi4yMDIgMi4yMDJBLjcxLjcxIDAgMCAxIDIgMjEuMjg2VjVhMiAyIDAgMCAxIDItMmgxNmEyIDIgMCAwIDEgMiAyelwiLFxuICAgICAga2V5OiBcIjE4ODg3cFwiXG4gICAgfVxuICBdXG5dO1xuY29uc3QgTWVzc2FnZVNxdWFyZSA9IGNyZWF0ZUx1Y2lkZUljb24oXCJtZXNzYWdlLXNxdWFyZVwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgTWVzc2FnZVNxdWFyZSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXNzYWdlLXNxdWFyZS5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTIxLjE3NCA2LjgxMmExIDEgMCAwIDAtMy45ODYtMy45ODdMMy44NDIgMTYuMTc0YTIgMiAwIDAgMC0uNS44M2wtMS4zMjEgNC4zNTJhLjUuNSAwIDAgMCAuNjIzLjYyMmw0LjM1My0xLjMyYTIgMiAwIDAgMCAuODMtLjQ5N3pcIixcbiAgICAgIGtleTogXCIxYTh1c3VcIlxuICAgIH1cbiAgXVxuXTtcbmNvbnN0IFBlbiA9IGNyZWF0ZUx1Y2lkZUljb24oXCJwZW5cIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFBlbiBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wZW4uanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcImxpbmVcIiwgeyB4MTogXCIxOVwiLCB4MjogXCI1XCIsIHkxOiBcIjVcIiwgeTI6IFwiMTlcIiwga2V5OiBcIjF4OXZsbVwiIH1dLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCI2LjVcIiwgY3k6IFwiNi41XCIsIHI6IFwiMi41XCIsIGtleTogXCI0bWgzaDdcIiB9XSxcbiAgW1wiY2lyY2xlXCIsIHsgY3g6IFwiMTcuNVwiLCBjeTogXCIxNy41XCIsIHI6IFwiMi41XCIsIGtleTogXCIxbWRyenFcIiB9XVxuXTtcbmNvbnN0IFBlcmNlbnQgPSBjcmVhdGVMdWNpZGVJY29uKFwicGVyY2VudFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgUGVyY2VudCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wZXJjZW50LmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgMjJ2LTVcIiwga2V5OiBcIjFlZ2E3N1wiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNOSA4VjJcIiwga2V5OiBcIjE0aW9zalwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTUgOFYyXCIsIGtleTogXCIxOGc1eHRcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE4IDh2NWE0IDQgMCAwIDEtNCA0aC00YTQgNCAwIDAgMS00LTRWOFpcIiwga2V5OiBcIm9zeG82bFwiIH1dXG5dO1xuY29uc3QgUGx1ZyA9IGNyZWF0ZUx1Y2lkZUljb24oXCJwbHVnXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBQbHVnIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsdWcuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk01IDEyaDE0XCIsIGtleTogXCIxYXlzMGhcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDV2MTRcIiwga2V5OiBcInM2OTlsZVwiIH1dXG5dO1xuY29uc3QgUGx1cyA9IGNyZWF0ZUx1Y2lkZUljb24oXCJwbHVzXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBQbHVzIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsdXMuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0zIDEyYTkgOSAwIDEgMCA5LTkgOS43NSA5Ljc1IDAgMCAwLTYuNzQgMi43NEwzIDhcIiwga2V5OiBcIjEzNTdlM1wiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMyAzdjVoNVwiLCBrZXk6IFwiMXhocThhXCIgfV1cbl07XG5jb25zdCBSb3RhdGVDY3cgPSBjcmVhdGVMdWNpZGVJY29uKFwicm90YXRlLWNjd1wiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgUm90YXRlQ2N3IGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJvdGF0ZS1jY3cuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xNS4yIDNhMiAyIDAgMCAxIDEuNC42bDMuOCAzLjhhMiAyIDAgMCAxIC42IDEuNFYxOWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJ6XCIsXG4gICAgICBrZXk6IFwiMWM4NDc2XCJcbiAgICB9XG4gIF0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNyAyMXYtN2ExIDEgMCAwIDAtMS0xSDhhMSAxIDAgMCAwLTEgMXY3XCIsIGtleTogXCIxeWR0b3NcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTcgM3Y0YTEgMSAwIDAgMCAxIDFoN1wiLCBrZXk6IFwidDUxdTczXCIgfV1cbl07XG5jb25zdCBTYXZlID0gY3JlYXRlTHVjaWRlSWNvbihcInNhdmVcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFNhdmUgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2F2ZS5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTIxIDIxLTQuMzQtNC4zNFwiLCBrZXk6IFwiMTRqN3JqXCIgfV0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjExXCIsIGN5OiBcIjExXCIsIHI6IFwiOFwiLCBrZXk6IFwiNGVqOTd1XCIgfV1cbl07XG5jb25zdCBTZWFyY2ggPSBjcmVhdGVMdWNpZGVJY29uKFwic2VhcmNoXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBTZWFyY2ggYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VhcmNoLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMTQuNTM2IDIxLjY4NmEuNS41IDAgMCAwIC45MzctLjAyNGw2LjUtMTlhLjQ5Ni40OTYgMCAwIDAtLjYzNS0uNjM1bC0xOSA2LjVhLjUuNSAwIDAgMC0uMDI0LjkzN2w3LjkzIDMuMThhMiAyIDAgMCAxIDEuMTEyIDEuMTF6XCIsXG4gICAgICBrZXk6IFwiMWZmeHkzXCJcbiAgICB9XG4gIF0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIm0yMS44NTQgMi4xNDctMTAuOTQgMTAuOTM5XCIsIGtleTogXCIxMmNqcGFcIiB9XVxuXTtcbmNvbnN0IFNlbmQgPSBjcmVhdGVMdWNpZGVJY29uKFwic2VuZFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgU2VuZCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZW5kLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJjaXJjbGVcIiwgeyBjeDogXCI5XCIsIGN5OiBcIjEyXCIsIHI6IFwiM1wiLCBrZXk6IFwidTNqd29yXCIgfV0sXG4gIFtcInJlY3RcIiwgeyB3aWR0aDogXCIyMFwiLCBoZWlnaHQ6IFwiMTRcIiwgeDogXCIyXCIsIHk6IFwiNVwiLCByeDogXCI3XCIsIGtleTogXCJnN2thbDJcIiB9XVxuXTtcbmNvbnN0IFRvZ2dsZUxlZnQgPSBjcmVhdGVMdWNpZGVJY29uKFwidG9nZ2xlLWxlZnRcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFRvZ2dsZUxlZnQgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9nZ2xlLWxlZnQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjE1XCIsIGN5OiBcIjEyXCIsIHI6IFwiM1wiLCBrZXk6IFwiMWFmdTByXCIgfV0sXG4gIFtcInJlY3RcIiwgeyB3aWR0aDogXCIyMFwiLCBoZWlnaHQ6IFwiMTRcIiwgeDogXCIyXCIsIHk6IFwiNVwiLCByeDogXCI3XCIsIGtleTogXCJnN2thbDJcIiB9XVxuXTtcbmNvbnN0IFRvZ2dsZVJpZ2h0ID0gY3JlYXRlTHVjaWRlSWNvbihcInRvZ2dsZS1yaWdodFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVG9nZ2xlUmlnaHQgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9nZ2xlLXJpZ2h0LmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTAgMTF2NlwiLCBrZXk6IFwibmNvMG9tXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNCAxMXY2XCIsIGtleTogXCJvdXR2MXVcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE5IDZ2MTRhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJWNlwiLCBrZXk6IFwibWl5dHJjXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0zIDZoMThcIiwga2V5OiBcImQwd20walwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNOCA2VjRhMiAyIDAgMCAxIDItMmg0YTIgMiAwIDAgMSAyIDJ2MlwiLCBrZXk6IFwiZTc5MWppXCIgfV1cbl07XG5jb25zdCBUcmFzaDIgPSBjcmVhdGVMdWNpZGVJY29uKFwidHJhc2gtMlwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVHJhc2gyIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyYXNoLTIuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNiA3aDZ2NlwiLCBrZXk6IFwiYm94NTVsXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIm0yMiA3LTguNSA4LjUtNS01TDIgMTdcIiwga2V5OiBcIjF0MW03OVwiIH1dXG5dO1xuY29uc3QgVHJlbmRpbmdVcCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJ0cmVuZGluZy11cFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVHJlbmRpbmdVcCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmVuZGluZy11cC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDN2MTJcIiwga2V5OiBcIjF4MGo1c1wiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJtMTcgOC01LTUtNSA1XCIsIGtleTogXCI3cTk3cjhcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTIxIDE1djRhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ2LTRcIiwga2V5OiBcImloN24zaFwiIH1dXG5dO1xuY29uc3QgVXBsb2FkID0gY3JlYXRlTHVjaWRlSWNvbihcInVwbG9hZFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVXBsb2FkIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVwbG9hZC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwibTE2IDEzIDUuMjIzIDMuNDgyYS41LjUgMCAwIDAgLjc3Ny0uNDE2VjcuODdhLjUuNSAwIDAgMC0uNzUyLS40MzJMMTYgMTAuNVwiLFxuICAgICAga2V5OiBcImZ0eW1lY1wiXG4gICAgfVxuICBdLFxuICBbXCJyZWN0XCIsIHsgeDogXCIyXCIsIHk6IFwiNlwiLCB3aWR0aDogXCIxNFwiLCBoZWlnaHQ6IFwiMTJcIiwgcng6IFwiMlwiLCBrZXk6IFwiMTU4eDAxXCIgfV1cbl07XG5jb25zdCBWaWRlbyA9IGNyZWF0ZUx1Y2lkZUljb24oXCJ2aWRlb1wiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVmlkZW8gYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmlkZW8uanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk00IDE0YTEgMSAwIDAgMS0uNzgtMS42M2w5LjktMTAuMmEuNS41IDAgMCAxIC44Ni40NmwtMS45MiA2LjAyQTEgMSAwIDAgMCAxMyAxMGg3YTEgMSAwIDAgMSAuNzggMS42M2wtOS45IDEwLjJhLjUuNSAwIDAgMS0uODYtLjQ2bDEuOTItNi4wMkExIDEgMCAwIDAgMTEgMTR6XCIsXG4gICAgICBrZXk6IFwiMXhxMmRiXCJcbiAgICB9XG4gIF1cbl07XG5jb25zdCBaYXAgPSBjcmVhdGVMdWNpZGVJY29uKFwiemFwXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBaYXAgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9emFwLmpzLm1hcFxuIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsIm5leHQiLCJwdXNoIiwiaXNBcnJheSIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJGcmFnbWVudCIsIl9GcmFnbWVudCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiU2V0dGluZ3MiLCJUb2dnbGVMZWZ0IiwiVG9nZ2xlUmlnaHQiLCJVc2VycyIsIlBlcmNlbnQiLCJFeWUiLCJFeWVPZmYiLCJTYXZlIiwiUmVmcmVzaEN3IiwiQWxlcnRDaXJjbGUiLCJDaGVja0NpcmNsZSIsIkluZm8iLCJUcmVuZGluZ1VwIiwiU2hpZWxkIiwiWmFwIiwiQ2FyZCIsIkJ1dHRvbiIsIklucHV0IiwidXNlVG9hc3QiLCJCYWRnZSIsIkZlYXR1cmVGbGFnQWRtaW5QYW5lbCIsIl91c2VUb2FzdCIsInNob3dUb2FzdCIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0Iiwic2F2aW5nIiwic2V0U2F2aW5nIiwiX3VzZVN0YXRlNSIsIl91c2VTdGF0ZTYiLCJjb25maWciLCJzZXRDb25maWciLCJfdXNlU3RhdGU3IiwiX3VzZVN0YXRlOCIsInVzZXJzIiwic2V0VXNlcnMiLCJfdXNlU3RhdGU5IiwiX3VzZVN0YXRlMCIsInNlbGVjdGVkQmV0YVVzZXJzIiwic2V0U2VsZWN0ZWRCZXRhVXNlcnMiLCJfdXNlU3RhdGUxIiwiX3VzZVN0YXRlMTAiLCJyb2xsb3V0UGVyY2VudGFnZSIsInNldFJvbGxvdXRQZXJjZW50YWdlIiwiX3VzZVN0YXRlMTEiLCJfdXNlU3RhdGUxMiIsIm1hc3RlckVuYWJsZWQiLCJzZXRNYXN0ZXJFbmFibGVkIiwiX3VzZVN0YXRlMTMiLCJfdXNlU3RhdGUxNCIsInBhZ2VGbGFncyIsInNldFBhZ2VGbGFncyIsIl91c2VTdGF0ZTE1IiwiX3VzZVN0YXRlMTYiLCJzaG93VXNlclNlbGVjdG9yIiwic2V0U2hvd1VzZXJTZWxlY3RvciIsIl91c2VTdGF0ZTE3IiwiX3VzZVN0YXRlMTgiLCJzZWFyY2hRdWVyeSIsInNldFNlYXJjaFF1ZXJ5IiwibG9hZENvbmZpZyIsImxvYWRVc2VycyIsIl9yZWYiLCJfY2FsbGVlIiwicmVzcG9uc2UiLCJyZXN1bHQiLCJfdCIsIl9jb250ZXh0IiwiZmV0Y2giLCJoZWFkZXJzIiwiY29uY2F0IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIm9rIiwiRXJyb3IiLCJqc29uIiwic3VjY2VzcyIsImRhdGEiLCJlbmFibGVkIiwiYmV0YV91c2VycyIsInJvbGxvdXRfcGVyY2VudGFnZSIsInBhZ2VzIiwiY29uc29sZSIsImVycm9yIiwiX3JlZjIiLCJfY2FsbGVlMiIsIl90MiIsIl9jb250ZXh0MiIsInNhdmVDb25maWciLCJfcmVmMyIsIl9jYWxsZWUzIiwiX3QzIiwiX2NvbnRleHQzIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJtZXNzYWdlIiwidG9nZ2xlQmV0YVVzZXIiLCJ1c2VySWQiLCJwcmV2IiwiaW5jbHVkZXMiLCJmaWx0ZXIiLCJpZCIsIl90b0NvbnN1bWFibGVBcnJheSIsInRvZ2dsZVBhZ2VGbGFnIiwicGFnZSIsIl9vYmplY3RTcHJlYWQiLCJfZGVmaW5lUHJvcGVydHkiLCJmaWx0ZXJlZFVzZXJzIiwidXNlciIsInRvTG93ZXJDYXNlIiwiU3RyaW5nIiwiZW1haWwiLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsIm9uQ2xpY2siLCJkaXNhYmxlZCIsImljb24iLCJzdGF0cyIsInRvdGFsX3VzZXJzIiwiYmV0YV91c2Vyc19jb3VudCIsInJvbGxvdXRfdXNlcnNfY291bnQiLCJ0b3RhbF9lbmFibGVkX3VzZXJzIiwicGVyY2VudGFnZV9lbmFibGVkIiwidmFyaWFudCIsInNpemUiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJvbkNoYW5nZSIsIm1hcCIsImNoZWNrZWQiLCJtaW4iLCJtYXgiLCJzdGVwIiwiTnVtYmVyIiwidGFyZ2V0IiwiZW50cmllcyIsIl9yZWY0IiwiX3JlZjUiLCJyZXBsYWNlIiwiUmVhY3QiLCJjdmEiLCJjbiIsImJhZGdlVmFyaWFudHMiLCJ2YXJpYW50cyIsInByaW1hcnkiLCJ3YXJuaW5nIiwiZGFuZ2VyIiwibmV1dHJhbCIsIm91dGxpbmUiLCJzbSIsIm1kIiwibGciLCJzaGFwZSIsInJvdW5kZWQiLCJwaWxsIiwiZGVmYXVsdFZhcmlhbnRzIiwiZm9yd2FyZFJlZiIsInJlZiIsInByb3BzIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiX2V4Y2x1ZGVkIiwiaW5wdXRWYXJpYW50cyIsImdldElucHV0TW9kZSIsIl9yZWYkdHlwZSIsImxhYmVsIiwiaGVscGVyVGV4dCIsIl9yZWYkaWNvblBvc2l0aW9uIiwiaWNvblBvc2l0aW9uIiwiX3JlZiRmdWxsV2lkdGgiLCJmdWxsV2lkdGgiLCJyZXF1aXJlZCIsImlucHV0TW9kZSIsImlucHV0SWQiLCJ1c2VJZCIsImVycm9ySWQiLCJ1bmRlZmluZWQiLCJoZWxwZXJUZXh0SWQiLCJoYXNFcnJvciIsImN1cnJlbnRWYXJpYW50IiwibW9iaWxlSW5wdXRNb2RlIiwiaHRtbEZvciIsInJvbGUiLCJDaGVjayIsIkNoZXZyb25Eb3duIiwiWCIsIlNlYXJjaCIsInNlbGVjdFRyaWdnZXJWYXJpYW50cyIsIlNlbGVjdCIsIm9wdGlvbnMiLCJfcmVmJHBsYWNlaG9sZGVyIiwiX3JlZiRkaXNhYmxlZCIsIl9yZWYkcmVxdWlyZWQiLCJfcmVmJG11bHRpcGxlIiwibXVsdGlwbGUiLCJfcmVmJHNlYXJjaGFibGUiLCJzZWFyY2hhYmxlIiwiX1JlYWN0JHVzZVN0YXRlIiwiX1JlYWN0JHVzZVN0YXRlMiIsImlzT3BlbiIsInNldElzT3BlbiIsIl9SZWFjdCR1c2VTdGF0ZTMiLCJfUmVhY3QkdXNlU3RhdGU0IiwiX1JlYWN0JHVzZVN0YXRlNSIsIl9SZWFjdCR1c2VTdGF0ZTYiLCJmb2N1c2VkSW5kZXgiLCJzZXRGb2N1c2VkSW5kZXgiLCJjb250YWluZXJSZWYiLCJ1c2VSZWYiLCJzZWFyY2hJbnB1dFJlZiIsImRyb3Bkb3duUmVmIiwic2VsZWN0SWQiLCJzZWxlY3RlZFZhbHVlcyIsInVzZU1lbW8iLCJmaWx0ZXJlZE9wdGlvbnMiLCJvcHRpb24iLCJkaXNwbGF5VGV4dCIsImZpbmQiLCJvcHQiLCJoYW5kbGVTZWxlY3QiLCJvcHRpb25WYWx1ZSIsIm5ld1ZhbHVlIiwiaGFuZGxlUmVtb3ZlIiwic3RvcFByb3BhZ2F0aW9uIiwiaGFuZGxlS2V5RG93biIsImtleSIsInByZXZlbnREZWZhdWx0IiwiaGFuZGxlQ2xpY2tPdXRzaWRlIiwiZXZlbnQiLCJjdXJyZW50IiwiY29udGFpbnMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZm9jdXMiLCJmb2N1c2VkRWxlbWVudCIsInNjcm9sbEludG9WaWV3IiwiYmxvY2siLCJ0YWJJbmRleCIsIm9uS2V5RG93biIsInZhbCIsImluZGV4IiwiaXNTZWxlY3RlZCIsImlzRm9jdXNlZCIsIlNldHRpbmdzSWNvbiIsIkJ1aWxkaW5nMiIsIkRvbGxhclNpZ24iLCJNYWlsIiwiRGF0YWJhc2UiLCJQbHVnIiwiVXBsb2FkIiwiUGx1cyIsIkVkaXQyIiwiVHJhc2gyIiwiU2VuZCIsIkRvd25sb2FkIiwiUm90YXRlQ2N3IiwiQ2xvY2siLCJIYXJkRHJpdmUiLCJDYWxlbmRhciIsIkNyZWRpdENhcmQiLCJWaWRlbyIsIk1lc3NhZ2VTcXVhcmUiLCJYQ2lyY2xlIiwiS2V5IiwiQXJjaGl2ZSIsImFjdGl2ZVRhYiIsInNldEFjdGl2ZVRhYiIsImFwcE5hbWUiLCJ0aW1lem9uZSIsImRhdGVGb3JtYXQiLCJjdXJyZW5jeSIsInRoZW1lIiwibGFuZ3VhZ2UiLCJpdGVtc1BlclBhZ2UiLCJnZW5lcmFsU2V0dGluZ3MiLCJzZXRHZW5lcmFsU2V0dGluZ3MiLCJjaHVyY2hOYW1lIiwiZGVub21pbmF0aW9uIiwiZm91bmRlZFllYXIiLCJhZGRyZXNzIiwicGhvbmUiLCJ3ZWJzaXRlIiwiZmFjZWJvb2siLCJ0d2l0dGVyIiwiaW5zdGFncmFtIiwieW91dHViZSIsImxvZ28iLCJwcmltYXJ5Q29sb3IiLCJjaHVyY2hJbmZvIiwic2V0Q2h1cmNoSW5mbyIsImxvZ29QcmV2aWV3Iiwic2V0TG9nb1ByZXZpZXciLCJpc1NhdmluZyIsInNldElzU2F2aW5nIiwiZmlzY2FsWWVhclN0YXJ0IiwicmVxdWlyZUFwcHJvdmFsIiwiYXBwcm92YWxUaHJlc2hvbGQiLCJkZWZhdWx0T2ZmZXJpbmdUeXBlIiwiZGVmYXVsdEV4cGVuc2VDYXRlZ29yeSIsImRlZmF1bHRGdW5kIiwiZmluYW5jZVNldHRpbmdzIiwic2V0RmluYW5jZVNldHRpbmdzIiwib2ZmZXJpbmdUeXBlcyIsInNldE9mZmVyaW5nVHlwZXMiLCJleHBlbnNlQ2F0ZWdvcmllcyIsInNldEV4cGVuc2VDYXRlZ29yaWVzIiwiZnVuZHMiLCJzZXRGdW5kcyIsImVkaXRpbmdPZmZlcmluZ1R5cGUiLCJzZXRFZGl0aW5nT2ZmZXJpbmdUeXBlIiwiX3VzZVN0YXRlMTkiLCJfdXNlU3RhdGUyMCIsImVkaXRpbmdFeHBlbnNlQ2F0ZWdvcnkiLCJzZXRFZGl0aW5nRXhwZW5zZUNhdGVnb3J5IiwiX3VzZVN0YXRlMjEiLCJfdXNlU3RhdGUyMiIsImVkaXRpbmdGdW5kIiwic2V0RWRpdGluZ0Z1bmQiLCJfdXNlU3RhdGUyMyIsImRlc2NyaXB0aW9uIiwiX3VzZVN0YXRlMjQiLCJuZXdPZmZlcmluZ1R5cGUiLCJzZXROZXdPZmZlcmluZ1R5cGUiLCJfdXNlU3RhdGUyNSIsIl91c2VTdGF0ZTI2IiwibmV3RXhwZW5zZUNhdGVnb3J5Iiwic2V0TmV3RXhwZW5zZUNhdGVnb3J5IiwiX3VzZVN0YXRlMjciLCJfdXNlU3RhdGUyOCIsIm5ld0Z1bmQiLCJzZXROZXdGdW5kIiwiX3VzZVN0YXRlMjkiLCJfdXNlU3RhdGUzMCIsInNob3dBZGRPZmZlcmluZ1R5cGUiLCJzZXRTaG93QWRkT2ZmZXJpbmdUeXBlIiwiX3VzZVN0YXRlMzEiLCJfdXNlU3RhdGUzMiIsInNob3dBZGRFeHBlbnNlQ2F0ZWdvcnkiLCJzZXRTaG93QWRkRXhwZW5zZUNhdGVnb3J5IiwiX3VzZVN0YXRlMzMiLCJfdXNlU3RhdGUzNCIsInNob3dBZGRGdW5kIiwic2V0U2hvd0FkZEZ1bmQiLCJfdXNlU3RhdGUzNSIsInNtdHBIb3N0Iiwic210cFBvcnQiLCJzbXRwVXNlcm5hbWUiLCJzbXRwUGFzc3dvcmQiLCJzbXRwRW5jcnlwdGlvbiIsInNtdHBGcm9tRW1haWwiLCJzbXRwRnJvbU5hbWUiLCJlbmFibGVFbWFpbE5vdGlmaWNhdGlvbnMiLCJlbmFibGVJbkFwcE5vdGlmaWNhdGlvbnMiLCJub3RpZnlOZXdNZW1iZXIiLCJub3RpZnlFdmVudFJlbWluZGVyIiwibm90aWZ5RmluYW5jZUFwcHJvdmFsIiwibm90aWZ5RXhwZW5zZVN1Ym1pdHRlZCIsIm5vdGlmeU9mZmVyaW5nUmVjb3JkZWQiLCJub3RpZnlCdWRnZXRUaHJlc2hvbGQiLCJub3RpZnlVc2VySW52aXRlIiwibm90aWZ5U3lzdGVtVXBkYXRlIiwiX3VzZVN0YXRlMzYiLCJlbWFpbE5vdGlmaWNhdGlvblNldHRpbmdzIiwic2V0RW1haWxOb3RpZmljYXRpb25TZXR0aW5ncyIsIl91c2VTdGF0ZTM3IiwiX3VzZVN0YXRlMzgiLCJpc1NlbmRpbmdUZXN0RW1haWwiLCJzZXRJc1NlbmRpbmdUZXN0RW1haWwiLCJfdXNlU3RhdGUzOSIsIl91c2VTdGF0ZTQwIiwic2hvd1NtdHBQYXNzd29yZCIsInNldFNob3dTbXRwUGFzc3dvcmQiLCJfdXNlU3RhdGU0MSIsIm1pblBhc3N3b3JkTGVuZ3RoIiwicmVxdWlyZVVwcGVyY2FzZSIsInJlcXVpcmVMb3dlcmNhc2UiLCJyZXF1aXJlTnVtYmVycyIsInJlcXVpcmVTcGVjaWFsQ2hhcnMiLCJwYXNzd29yZEV4cGlyeURheXMiLCJzZXNzaW9uVGltZW91dCIsImVuYWJsZTJGQSIsIm1heExvZ2luQXR0ZW1wdHMiLCJsb2Nrb3V0RHVyYXRpb24iLCJfdXNlU3RhdGU0MiIsInNlY3VyaXR5U2V0dGluZ3MiLCJzZXRTZWN1cml0eVNldHRpbmdzIiwiX3VzZVN0YXRlNDMiLCJfdXNlU3RhdGU0NCIsImF1ZGl0TG9ncyIsInNldEF1ZGl0TG9ncyIsIl91c2VTdGF0ZTQ1IiwiX3VzZVN0YXRlNDYiLCJpc0xvYWRpbmdBdWRpdExvZ3MiLCJzZXRJc0xvYWRpbmdBdWRpdExvZ3MiLCJfdXNlU3RhdGU0NyIsIl91c2VTdGF0ZTQ4IiwiYmFja3VwcyIsInNldEJhY2t1cHMiLCJfdXNlU3RhdGU0OSIsIl91c2VTdGF0ZTUwIiwiaXNMb2FkaW5nQmFja3VwcyIsInNldElzTG9hZGluZ0JhY2t1cHMiLCJfdXNlU3RhdGU1MSIsIl91c2VTdGF0ZTUyIiwiaXNDcmVhdGluZ0JhY2t1cCIsInNldElzQ3JlYXRpbmdCYWNrdXAiLCJfdXNlU3RhdGU1MyIsImVuYWJsZUF1dG9CYWNrdXAiLCJiYWNrdXBGcmVxdWVuY3kiLCJiYWNrdXBUaW1lIiwicmV0ZW50aW9uRGF5cyIsImluY2x1ZGVVcGxvYWRzIiwiX3VzZVN0YXRlNTQiLCJiYWNrdXBTZXR0aW5ncyIsInNldEJhY2t1cFNldHRpbmdzIiwiX3VzZVN0YXRlNTUiLCJfdXNlU3RhdGU1NiIsImxhc3RCYWNrdXAiLCJzZXRMYXN0QmFja3VwIiwiX3VzZVN0YXRlNTciLCJfdXNlU3RhdGU1OCIsInJlc3RvcmVDb25maXJtYXRpb24iLCJzZXRSZXN0b3JlQ29uZmlybWF0aW9uIiwiX3VzZVN0YXRlNTkiLCJfdXNlU3RhdGU2MCIsImludGVncmF0aW9ucyIsInNldEludGVncmF0aW9ucyIsIl91c2VTdGF0ZTYxIiwiX3VzZVN0YXRlNjIiLCJjb25maWd1cmluZ0ludGVncmF0aW9uIiwic2V0Q29uZmlndXJpbmdJbnRlZ3JhdGlvbiIsIl91c2VTdGF0ZTYzIiwiYXBpS2V5IiwiYXBpU2VjcmV0Iiwid2ViaG9va1VybCIsImFkZGl0aW9uYWxTZXR0aW5ncyIsIl91c2VTdGF0ZTY0IiwiaW50ZWdyYXRpb25Db25maWciLCJzZXRJbnRlZ3JhdGlvbkNvbmZpZyIsIl91c2VTdGF0ZTY1IiwiX3VzZVN0YXRlNjYiLCJzaG93QXBpS2V5Iiwic2V0U2hvd0FwaUtleSIsIl91c2VTdGF0ZTY3IiwiX3VzZVN0YXRlNjgiLCJpc1NhdmluZ0ludGVncmF0aW9uIiwic2V0SXNTYXZpbmdJbnRlZ3JhdGlvbiIsIl91c2VTdGF0ZTY5IiwiYXV0b0FyY2hpdmVFbmFibGVkIiwiYXV0b0FyY2hpdmVEYXlzIiwicmV0ZW50aW9uUGVyaW9kIiwiYWxsb3dSZXN0b3JlIiwicmVxdWlyZUNvbmZpcm1hdGlvbiIsIm5vdGlmeU9uQXJjaGl2ZSIsIl91c2VTdGF0ZTcwIiwiYXJjaGl2ZVNldHRpbmdzIiwic2V0QXJjaGl2ZVNldHRpbmdzIiwibG9hZEZpbmFuY2VEYXRhIiwibG9hZEF1ZGl0TG9ncyIsImxvYWRCYWNrdXBzIiwibG9hZEludGVncmF0aW9ucyIsIm9mZmVyaW5nVHlwZXNSZXNwb25zZSIsIm9mZmVyaW5nVHlwZXNEYXRhIiwiY2F0ZWdvcmllc1Jlc3BvbnNlIiwiY2F0ZWdvcmllc0RhdGEiLCJmdW5kc1Jlc3BvbnNlIiwiZnVuZHNEYXRhIiwidGltZXpvbmVPcHRpb25zIiwiZGF0ZUZvcm1hdE9wdGlvbnMiLCJjdXJyZW5jeU9wdGlvbnMiLCJ0aGVtZU9wdGlvbnMiLCJsYW5ndWFnZU9wdGlvbnMiLCJoYW5kbGVTYXZlR2VuZXJhbFNldHRpbmdzIiwic2V0VGltZW91dCIsImhhbmRsZVNhdmVDaHVyY2hJbmZvIiwiaGFuZGxlTG9nb1VwbG9hZCIsIl9ldmVudCR0YXJnZXQkZmlsZXMiLCJmaWxlIiwiZmlsZXMiLCJzdGFydHNXaXRoIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsInJlYWRBc0RhdGFVUkwiLCJoYW5kbGVSZW1vdmVMb2dvIiwiaGFuZGxlU2F2ZUZpbmFuY2VTZXR0aW5ncyIsIl9jYWxsZWU0IiwiX3Q0IiwiX2NvbnRleHQ0IiwiaGFuZGxlQWRkT2ZmZXJpbmdUeXBlIiwiX2NhbGxlZTUiLCJfdDUiLCJfY29udGV4dDUiLCJ0cmltIiwiaXNfYWN0aXZlIiwiaGFuZGxlVXBkYXRlT2ZmZXJpbmdUeXBlIiwiX3JlZjYiLCJfY2FsbGVlNiIsInVwZGF0ZXMiLCJfdDYiLCJfY29udGV4dDYiLCJvdCIsIl94IiwiX3gyIiwiaGFuZGxlRGVsZXRlT2ZmZXJpbmdUeXBlIiwiX3JlZjciLCJfY2FsbGVlNyIsIl90NyIsIl9jb250ZXh0NyIsImNvbmZpcm0iLCJfeDMiLCJoYW5kbGVBZGRFeHBlbnNlQ2F0ZWdvcnkiLCJfcmVmOCIsIl9jYWxsZWU4IiwiX3Q4IiwiX2NvbnRleHQ4IiwiaGFuZGxlVXBkYXRlRXhwZW5zZUNhdGVnb3J5IiwiX3JlZjkiLCJfY2FsbGVlOSIsIl90OSIsIl9jb250ZXh0OSIsImVjIiwiX3g0IiwiX3g1IiwiaGFuZGxlRGVsZXRlRXhwZW5zZUNhdGVnb3J5IiwiX3JlZjAiLCJfY2FsbGVlMCIsIl90MCIsIl9jb250ZXh0MCIsIl94NiIsImhhbmRsZUFkZEZ1bmQiLCJfcmVmMSIsIl9jYWxsZWUxIiwiX3QxIiwiX2NvbnRleHQxIiwiaGFuZGxlVXBkYXRlRnVuZCIsIl9yZWYxMCIsIl9jYWxsZWUxMCIsIl90MTAiLCJfY29udGV4dDEwIiwiX3g3IiwiX3g4IiwiaGFuZGxlRGVsZXRlRnVuZCIsIl9yZWYxMSIsIl9jYWxsZWUxMSIsIl90MTEiLCJfY29udGV4dDExIiwiX3g5IiwiaGFuZGxlU2F2ZUVtYWlsTm90aWZpY2F0aW9uU2V0dGluZ3MiLCJfcmVmMTIiLCJfY2FsbGVlMTIiLCJfdDEyIiwiX2NvbnRleHQxMiIsImhhbmRsZVNlbmRUZXN0RW1haWwiLCJfcmVmMTMiLCJfY2FsbGVlMTMiLCJfdDEzIiwiX2NvbnRleHQxMyIsImhhbmRsZVNhdmVTZWN1cml0eVNldHRpbmdzIiwiX3JlZjE0IiwiX2NhbGxlZTE0IiwiX3QxNCIsIl9jb250ZXh0MTQiLCJfcmVmMTUiLCJfY2FsbGVlMTUiLCJtb2NrTG9ncyIsIl90MTUiLCJfY29udGV4dDE1IiwiYWN0aW9uIiwidGltZXN0YW1wIiwiRGF0ZSIsIm5vdyIsInRvSVNPU3RyaW5nIiwiaXBBZGRyZXNzIiwiZGV0YWlscyIsImZvcm1hdFJlbGF0aXZlVGltZSIsImRpZmZNcyIsImdldFRpbWUiLCJkaWZmTWlucyIsIk1hdGgiLCJmbG9vciIsImRpZmZIb3VycyIsImRpZmZEYXlzIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiX3JlZjE2IiwiX2NhbGxlZTE2IiwibW9ja0JhY2t1cHMiLCJfdDE2IiwiX2NvbnRleHQxNiIsImZpbGVuYW1lIiwiY3JlYXRlZF9hdCIsImNyZWF0ZWRfYnkiLCJzdGF0dXMiLCJoYW5kbGVDcmVhdGVCYWNrdXAiLCJfcmVmMTciLCJfY2FsbGVlMTciLCJfdDE3IiwiX2NvbnRleHQxNyIsImhhbmRsZURvd25sb2FkQmFja3VwIiwiX3JlZjE4IiwiX2NhbGxlZTE4IiwiYmFja3VwIiwiX2NvbnRleHQxOCIsIl94MCIsImhhbmRsZVJlc3RvcmVCYWNrdXAiLCJfcmVmMTkiLCJfY2FsbGVlMTkiLCJfY29udGV4dDE5IiwiX3gxIiwiY29uZmlybVJlc3RvcmUiLCJfcmVmMjAiLCJfY2FsbGVlMjAiLCJfdDE4IiwiX2NvbnRleHQyMCIsImhhbmRsZURlbGV0ZUJhY2t1cCIsIl9yZWYyMSIsIl9jYWxsZWUyMSIsIl9jb250ZXh0MjEiLCJiIiwiX3gxMCIsImhhbmRsZVNhdmVCYWNrdXBTZXR0aW5ncyIsIl9yZWYyMiIsIl9jYWxsZWUyMiIsIl90MTkiLCJfY29udGV4dDIyIiwiX3JlZjIzIiwiX2NhbGxlZTIzIiwibW9ja0ludGVncmF0aW9ucyIsIl90MjAiLCJfY29udGV4dDIzIiwiY2F0ZWdvcnkiLCJpc0NvbmZpZ3VyZWQiLCJsYXN0U3luYyIsImhhbmRsZUNvbmZpZ3VyZUludGVncmF0aW9uIiwiaW50ZWdyYXRpb24iLCJfaW50ZWdyYXRpb24kYXBpS2V5IiwiaGFuZGxlU2F2ZUludGVncmF0aW9uQ29uZmlnIiwiX3JlZjI0IiwiX2NhbGxlZTI0IiwiX3QyMSIsIl9jb250ZXh0MjQiLCJpbnQiLCJoYW5kbGVEaXNjb25uZWN0SW50ZWdyYXRpb24iLCJfcmVmMjUiLCJfY2FsbGVlMjUiLCJfdDIyIiwiX2NvbnRleHQyNSIsIl94MTEiLCJoYW5kbGVUZXN0SW50ZWdyYXRpb24iLCJfcmVmMjYiLCJfY2FsbGVlMjYiLCJfdDIzIiwiX2NvbnRleHQyNiIsIl94MTIiLCJnZXRTdGF0dXNJY29uIiwiZ2V0U3RhdHVzQmFkZ2UiLCJnZXRDYXRlZ29yeUxhYmVsIiwidGFicyIsInJlbmRlclRhYkNvbnRlbnQiLCJwYXJzZUludCIsImdldEZ1bGxZZWFyIiwic3JjIiwiYWx0IiwiYWNjZXB0IiwicGF0dGVybiIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwicGFyc2VGbG9hdCIsIm9mZmVyaW5nVHlwZSIsImZ1bmQiLCJjdXJyZW50X2JhbGFuY2UiLCJ0b0xvY2FsZVN0cmluZyIsIm1pbmltdW1GcmFjdGlvbkRpZ2l0cyIsIm1heGltdW1GcmFjdGlvbkRpZ2l0cyIsImxvZyIsImNhdGVnb3J5SW50ZWdyYXRpb25zIiwiSWNvbiIsImNyZWF0ZUVsZW1lbnQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsInJlYWRPbmx5IiwibmF2aWdhdG9yIiwiY2xpcGJvYXJkIiwid3JpdGVUZXh0IiwiaHJlZiIsInJlbCIsIl9vbkNsaWNrIiwiX2NhbGxlZTI3IiwiX3QyNCIsIl9jb250ZXh0MjciLCJfb25DbGljazIiLCJfY2FsbGVlMjgiLCJfdDI1IiwiX2NvbnRleHQyOCIsInRhYiIsImlzQWN0aXZlIl0sInNvdXJjZVJvb3QiOiIifQ==