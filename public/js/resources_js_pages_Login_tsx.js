"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_Login_tsx"],{

/***/ "./resources/js/components/ui/input.tsx"
/*!**********************************************!*\
  !*** ./resources/js/components/ui/input.tsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/utils */ "./resources/js/lib/utils.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className", "type"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }



var Input = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    type = _ref.type,
    props = _objectWithoutProperties(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", _objectSpread({
    type: type,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
    ref: ref
  }, props));
});
Input.displayName = "Input";


/***/ },

/***/ "./resources/js/pages/Login.tsx"
/*!**************************************!*\
  !*** ./resources/js/pages/Login.tsx ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ui/input */ "./resources/js/components/ui/input.tsx");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/church.js");
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








var Login = function Login() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    email = _useState2[0],
    setEmail = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    password = _useState4[0],
    setPassword = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_3__.useAuth)(),
    login = _useAuth.login;
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            setError('');
            setLoading(true);
            _context.p = 1;
            _context.n = 2;
            return login(email, password);
          case 2:
            // Redirect to dashboard on successful login
            navigate('/');
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            setError(_t.message || 'Invalid email or password');
          case 4:
            _context.p = 4;
            setLoading(false);
            return _context.f(4);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3, 4, 5]]);
    }));
    return function handleSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "max-w-md w-full space-y-8",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "text-center",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "flex justify-center",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
            className: "h-12 w-12 text-primary-500"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
          className: "mt-6 text-3xl font-bold text-neutral-900",
          children: "Mahayahay Free Methodist Church"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "mt-2 text-sm text-neutral-600",
          children: "Sign in to your account"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_6__.Card, {
        className: "shadow-lg",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_6__.CardHeader, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_6__.CardTitle, {
            children: "Login"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_6__.CardDescription, {
            children: "Enter your credentials to access the system"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_6__.CardContent, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
            onSubmit: handleSubmit,
            className: "space-y-4",
            children: [error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
                className: "h-4 w-4 flex-shrink-0"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm",
                children: error
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                htmlFor: "email",
                className: "block text-sm font-medium text-neutral-700 mb-1",
                children: "Email"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                id: "email",
                type: "email",
                value: email,
                onChange: function onChange(e) {
                  return setEmail(e.target.value);
                },
                placeholder: "Enter your email",
                required: true,
                className: "rounded-lg"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                htmlFor: "password",
                className: "block text-sm font-medium text-neutral-700 mb-1",
                children: "Password"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_5__.Input, {
                id: "password",
                type: "password",
                value: password,
                onChange: function onChange(e) {
                  return setPassword(e.target.value);
                },
                placeholder: "Enter your password",
                required: true,
                className: "rounded-lg"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
              type: "submit",
              className: "w-full rounded-lg bg-primary-500 hover:bg-primary-600",
              disabled: loading,
              children: loading ? 'Signing in...' : 'Sign in'
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
              className: "text-sm font-medium text-primary-900 mb-2",
              children: "Demo Credentials:"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
              className: "text-sm text-primary-700",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                children: "Email:"
              }), " admin@example.com", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
                children: "Password:"
              }), " password"]
            })]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Login);

/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/church.js"
/*!************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/church.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Church)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M10 9h4", key: "u4k05v" }],
  ["path", { d: "M12 7v5", key: "ma6bk" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9",
      key: "flvdwo"
    }
  ],
  [
    "path",
    {
      d: "M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14",
      key: "a5i0n2"
    }
  ]
];
const Church = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("church", __iconNode);


//# sourceMappingURL=church.js.map


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0xvZ2luX3RzeC5qcz9pZD0xNmJkOTI3NTBiOGFhMjZhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWdEO0FBQ2pCO0FBQ007QUFDckMsSUFBTUksS0FBSyxnQkFBR0YsNkNBQWdCLENBQUMsVUFBQUksSUFBQSxFQUFnQ0MsR0FBRyxFQUFLO0VBQUEsSUFBckNDLFNBQVMsR0FBQUYsSUFBQSxDQUFURSxTQUFTO0lBQUVDLElBQUksR0FBQUgsSUFBQSxDQUFKRyxJQUFJO0lBQUtDLEtBQUssR0FBQUMsd0JBQUEsQ0FBQUwsSUFBQSxFQUFBTSxTQUFBO0VBQ3ZELE9BQVFYLHNEQUFJLENBQUMsT0FBTyxFQUFBWSxhQUFBO0lBQUlKLElBQUksRUFBRUEsSUFBSTtJQUFFRCxTQUFTLEVBQUVMLDhDQUFFLENBQUMsOFZBQThWLEVBQUVLLFNBQVMsQ0FBQztJQUFFRCxHQUFHLEVBQUVBO0VBQUcsR0FBS0csS0FBSyxDQUFFLENBQUM7QUFDdmIsQ0FBQyxDQUFDO0FBQ0ZOLEtBQUssQ0FBQ1UsV0FBVyxHQUFHLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJDTDNCLHVLQUFBQyxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEs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QkFBb0IsRUFBRTNILHNEQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUVBLHNEQUFJLENBQUMsUUFBUSxFQUFFO2dCQUFFMkgsUUFBUSxFQUFFO2NBQVksQ0FBQyxDQUFDLEVBQUUsV0FBVztZQUFFLENBQUMsQ0FBQztVQUFFLENBQUMsQ0FBQztRQUFFLENBQUMsQ0FBQztNQUFFLENBQUMsQ0FBQztJQUFFLENBQUM7RUFBRSxDQUFDLENBQUM7QUFDNzNFLENBQUM7QUFDRCxpRUFBZTNCLEtBQUssRTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVzRDs7QUFFdEQ7QUFDQSxhQUFhLDZCQUE2QjtBQUMxQyxhQUFhLDRCQUE0QjtBQUN6QyxhQUFhLCtDQUErQztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFnQjs7QUFFVTtBQUN6QyIsInNvdXJjZXMiOlsid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3VpL2lucHV0LnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvcGFnZXMvTG9naW4udHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvY2h1cmNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNuIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlsc1wiO1xuY29uc3QgSW5wdXQgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgdHlwZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgcmV0dXJuIChfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiB0eXBlLCBjbGFzc05hbWU6IGNuKFwiZmxleCBoLTEwIHctZnVsbCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItaW5wdXQgYmctYmFja2dyb3VuZCBweC0zIHB5LTIgdGV4dC1zbSByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIGZpbGU6Ym9yZGVyLTAgZmlsZTpiZy10cmFuc3BhcmVudCBmaWxlOnRleHQtc20gZmlsZTpmb250LW1lZGl1bSBwbGFjZWhvbGRlcjp0ZXh0LW11dGVkLWZvcmVncm91bmQgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXJpbmcgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC0yIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXCIsIGNsYXNzTmFtZSksIHJlZjogcmVmLCAuLi5wcm9wcyB9KSk7XG59KTtcbklucHV0LmRpc3BsYXlOYW1lID0gXCJJbnB1dFwiO1xuZXhwb3J0IHsgSW5wdXQgfTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyB1c2VBdXRoIH0gZnJvbSAnLi4vY29udGV4dHMvQXV0aENvbnRleHQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9idXR0b24nO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2lucHV0JztcbmltcG9ydCB7IENhcmQsIENhcmRDb250ZW50LCBDYXJkRGVzY3JpcHRpb24sIENhcmRIZWFkZXIsIENhcmRUaXRsZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvY2FyZCc7XG5pbXBvcnQgeyBDaHVyY2gsIEFsZXJ0Q2lyY2xlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmNvbnN0IExvZ2luID0gKCkgPT4ge1xuICAgIGNvbnN0IFtlbWFpbCwgc2V0RW1haWxdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCB7IGxvZ2luIH0gPSB1c2VBdXRoKCk7XG4gICAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2V0RXJyb3IoJycpO1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgbG9naW4oZW1haWwsIHBhc3N3b3JkKTtcbiAgICAgICAgICAgIC8vIFJlZGlyZWN0IHRvIGRhc2hib2FyZCBvbiBzdWNjZXNzZnVsIGxvZ2luXG4gICAgICAgICAgICBuYXZpZ2F0ZSgnLycpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHNldEVycm9yKGVyci5tZXNzYWdlIHx8ICdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1pbi1oLXNjcmVlbiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1uZXV0cmFsLTUwIHB5LTEyIHB4LTQgc206cHgtNiBsZzpweC04XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtYXgtdy1tZCB3LWZ1bGwgc3BhY2UteS04XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1jZW50ZXJcIiwgY2hpbGRyZW46IF9qc3goQ2h1cmNoLCB7IGNsYXNzTmFtZTogXCJoLTEyIHctMTIgdGV4dC1wcmltYXJ5LTUwMFwiIH0pIH0pLCBfanN4KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwibXQtNiB0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogXCJNYWhheWFoYXkgRnJlZSBNZXRob2Rpc3QgQ2h1cmNoXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTIgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIlNpZ24gaW4gdG8geW91ciBhY2NvdW50XCIgfSldIH0pLCBfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJzaGFkb3ctbGdcIiwgY2hpbGRyZW46IFtfanN4cyhDYXJkSGVhZGVyLCB7IGNoaWxkcmVuOiBbX2pzeChDYXJkVGl0bGUsIHsgY2hpbGRyZW46IFwiTG9naW5cIiB9KSwgX2pzeChDYXJkRGVzY3JpcHRpb24sIHsgY2hpbGRyZW46IFwiRW50ZXIgeW91ciBjcmVkZW50aWFscyB0byBhY2Nlc3MgdGhlIHN5c3RlbVwiIH0pXSB9KSwgX2pzeHMoQ2FyZENvbnRlbnQsIHsgY2hpbGRyZW46IFtfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbZXJyb3IgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXJlZC02MDAgYmctcmVkLTUwIHAtMyByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcmVkLTIwMFwiLCBjaGlsZHJlbjogW19qc3goQWxlcnRDaXJjbGUsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgZmxleC1zaHJpbmstMFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtXCIsIGNoaWxkcmVuOiBlcnJvciB9KV0gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJlbWFpbFwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiRW1haWxcIiB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJlbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIsIHZhbHVlOiBlbWFpbCwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiBcIkVudGVyIHlvdXIgZW1haWxcIiwgcmVxdWlyZWQ6IHRydWUsIGNsYXNzTmFtZTogXCJyb3VuZGVkLWxnXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJwYXNzd29yZFwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiUGFzc3dvcmRcIiB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJwYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIsIHZhbHVlOiBwYXNzd29yZCwgb25DaGFuZ2U6IChlKSA9PiBzZXRQYXNzd29yZChlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiBcIkVudGVyIHlvdXIgcGFzc3dvcmRcIiwgcmVxdWlyZWQ6IHRydWUsIGNsYXNzTmFtZTogXCJyb3VuZGVkLWxnXCIgfSldIH0pLCBfanN4KEJ1dHRvbiwgeyB0eXBlOiBcInN1Ym1pdFwiLCBjbGFzc05hbWU6IFwidy1mdWxsIHJvdW5kZWQtbGcgYmctcHJpbWFyeS01MDAgaG92ZXI6YmctcHJpbWFyeS02MDBcIiwgZGlzYWJsZWQ6IGxvYWRpbmcsIGNoaWxkcmVuOiBsb2FkaW5nID8gJ1NpZ25pbmcgaW4uLi4nIDogJ1NpZ24gaW4nIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibXQtNiBwLTQgYmctcHJpbWFyeS01MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcHJpbWFyeS0yMDBcIiwgY2hpbGRyZW46IFtfanN4KFwiaDRcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXByaW1hcnktOTAwIG1iLTJcIiwgY2hpbGRyZW46IFwiRGVtbyBDcmVkZW50aWFsczpcIiB9KSwgX2pzeHMoXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1wcmltYXJ5LTcwMFwiLCBjaGlsZHJlbjogW19qc3goXCJzdHJvbmdcIiwgeyBjaGlsZHJlbjogXCJFbWFpbDpcIiB9KSwgXCIgYWRtaW5AZXhhbXBsZS5jb21cIiwgX2pzeChcImJyXCIsIHt9KSwgX2pzeChcInN0cm9uZ1wiLCB7IGNoaWxkcmVuOiBcIlBhc3N3b3JkOlwiIH0pLCBcIiBwYXNzd29yZFwiXSB9KV0gfSldIH0pXSB9KV0gfSkgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IExvZ2luO1xuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTAgOWg0XCIsIGtleTogXCJ1NGswNXZcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDd2NVwiLCBrZXk6IFwibWE2YmtcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE0IDIxdi0zYTIgMiAwIDAgMC00IDB2M1wiLCBrZXk6IFwiMXJnaWVpXCIgfV0sXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIm0xOCA5IDMuNTIgMi4xNDdhMSAxIDAgMCAxIC40OC44NTRWMTlhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJ2LTYuOTk5YTEgMSAwIDAgMSAuNDgtLjg1NEw2IDlcIixcbiAgICAgIGtleTogXCJmbHZkd29cIlxuICAgIH1cbiAgXSxcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTYgMjFWN2ExIDEgMCAwIDEgLjM3Ni0uNzgybDUtMy45OTlhMSAxIDAgMCAxIDEuMjQ5LjAwMWw1IDRBMSAxIDAgMCAxIDE4IDd2MTRcIixcbiAgICAgIGtleTogXCJhNWkwbjJcIlxuICAgIH1cbiAgXVxuXTtcbmNvbnN0IENodXJjaCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJjaHVyY2hcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIENodXJjaCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jaHVyY2guanMubWFwXG4iXSwibmFtZXMiOlsianN4IiwiX2pzeCIsIlJlYWN0IiwiY24iLCJJbnB1dCIsImZvcndhcmRSZWYiLCJfcmVmIiwicmVmIiwiY2xhc3NOYW1lIiwidHlwZSIsInByb3BzIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiX2V4Y2x1ZGVkIiwiX29iamVjdFNwcmVhZCIsImRpc3BsYXlOYW1lIiwiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsIm5leHQiLCJwdXNoIiwiaXNBcnJheSIsImpzeHMiLCJfanN4cyIsInVzZVN0YXRlIiwidXNlTmF2aWdhdGUiLCJ1c2VBdXRoIiwiQnV0dG9uIiwiQ2FyZCIsIkNhcmRDb250ZW50IiwiQ2FyZERlc2NyaXB0aW9uIiwiQ2FyZEhlYWRlciIsIkNhcmRUaXRsZSIsIkNodXJjaCIsIkFsZXJ0Q2lyY2xlIiwiTG9naW4iLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiZW1haWwiLCJzZXRFbWFpbCIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2IiwiZXJyb3IiLCJzZXRFcnJvciIsIl91c2VTdGF0ZTciLCJfdXNlU3RhdGU4IiwibG9hZGluZyIsInNldExvYWRpbmciLCJfdXNlQXV0aCIsImxvZ2luIiwibmF2aWdhdGUiLCJoYW5kbGVTdWJtaXQiLCJfY2FsbGVlIiwiX3QiLCJfY29udGV4dCIsInByZXZlbnREZWZhdWx0IiwibWVzc2FnZSIsIl94IiwiY2hpbGRyZW4iLCJvblN1Ym1pdCIsImh0bWxGb3IiLCJpZCIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJyZXF1aXJlZCIsImRpc2FibGVkIl0sInNvdXJjZVJvb3QiOiIifQ==