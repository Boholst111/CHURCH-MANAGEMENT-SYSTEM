"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_Settings_tsx"],{

/***/ "./resources/js/components/settings/ChurchDetailsForm.tsx"
/*!****************************************************************!*\
  !*** ./resources/js/components/settings/ChurchDetailsForm.tsx ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/input */ "./resources/js/components/ui/input.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
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






/**
 * ChurchDetailsForm Component
 *
 * Form for managing church information including name, address, contact details, and service times.
 *
 * Features:
 * - Input fields for all church details
 * - Form validation with inline error messages
 * - Loads existing church settings on mount
 * - Displays success/error messages via toast notifications
 *
 * Validates Requirements: 6.1, 6.4
 */
var ChurchDetailsForm = function ChurchDetailsForm() {
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_4__.useToast)(),
    showToast = _useToast.showToast;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      church_name: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      phone: '',
      email: '',
      website: '',
      service_times: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    errors = _useState4[0],
    setErrors = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    isLoading = _useState6[0],
    setIsLoading = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isSubmitting = _useState8[0],
    setIsSubmitting = _useState8[1];
  /**
   * Load church settings on component mount
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    loadChurchSettings();
  }, []);
  /**
   * Fetch church settings from API
   */
  var loadChurchSettings = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, settings, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setIsLoading(true);
            _context.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_5__["default"].get('/settings/church');
          case 1:
            response = _context.v;
            if (response.data.success && response.data.data) {
              settings = response.data.data;
              setFormData({
                church_name: settings.church_name || '',
                address: settings.address || '',
                city: settings.city || '',
                state: settings.state || '',
                zip_code: settings.zip_code || '',
                phone: settings.phone || '',
                email: settings.email || '',
                website: settings.website || '',
                service_times: settings.service_times || ''
              });
            }
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Failed to load church settings:', _t);
            showToast('error', 'Failed to load church settings');
          case 3:
            _context.p = 3;
            setIsLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function loadChurchSettings() {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Validate form data
   */
  var validateForm = function validateForm() {
    var newErrors = {};
    // Required fields
    if (!formData.church_name.trim()) {
      newErrors.church_name = 'Church name is required';
    } else if (formData.church_name.length > 200) {
      newErrors.church_name = 'Church name must be 200 characters or less';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length > 200) {
      newErrors.address = 'Address must be 200 characters or less';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.zip_code.trim()) {
      newErrors.zip_code = 'Zip code is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    // Optional website validation
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL (e.g., https://example.com)';
    }
    if (!formData.service_times.trim()) {
      newErrors.service_times = 'Service times are required';
    } else if (formData.service_times.length > 500) {
      newErrors.service_times = 'Service times must be 500 characters or less';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  /**
   * Handle input change
   */
  var handleChange = function handleChange(e) {
    var _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value;
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, value));
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, undefined));
      });
    }
  };
  /**
   * Handle form submission
   */
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
      var response, _error$response, _error$response2, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            e.preventDefault();
            if (validateForm()) {
              _context2.n = 1;
              break;
            }
            showToast('error', 'Please correct the errors in the form');
            return _context2.a(2);
          case 1:
            setIsSubmitting(true);
            _context2.p = 2;
            _context2.n = 3;
            return _lib_api__WEBPACK_IMPORTED_MODULE_5__["default"].put('/settings/church', formData);
          case 3:
            response = _context2.v;
            if (response.data.success) {
              showToast('success', 'Church settings saved successfully');
            }
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            console.error('Failed to save church settings:', _t2);
            // Handle server-side validation errors
            if ((_error$response = _t2.response) !== null && _error$response !== void 0 && (_error$response = _error$response.data) !== null && _error$response !== void 0 && _error$response.errors) {
              setErrors(_t2.response.data.errors);
              showToast('error', 'Please correct the errors in the form');
            } else {
              showToast('error', ((_error$response2 = _t2.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || 'Failed to save church settings');
            }
          case 5:
            _context2.p = 5;
            setIsSubmitting(false);
            return _context2.f(5);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 4, 5, 6]]);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  if (isLoading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex items-center justify-center py-12",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "text-gray-500",
        children: "Loading church settings..."
      })
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
    onSubmit: handleSubmit,
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        htmlFor: "church_name",
        className: "block text-sm font-medium text-gray-700 mb-1",
        children: ["Church Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-red-500",
          children: "*"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
        id: "church_name",
        name: "church_name",
        type: "text",
        value: formData.church_name,
        onChange: handleChange,
        className: errors.church_name ? 'border-red-500' : '',
        disabled: isSubmitting,
        placeholder: "Mahayahay Free Methodist Church"
      }), errors.church_name && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-sm text-red-600 mt-1",
        children: errors.church_name
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        htmlFor: "address",
        className: "block text-sm font-medium text-gray-700 mb-1",
        children: ["Address ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-red-500",
          children: "*"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
        id: "address",
        name: "address",
        type: "text",
        value: formData.address,
        onChange: handleChange,
        className: errors.address ? 'border-red-500' : '',
        disabled: isSubmitting,
        placeholder: "123 Main Street"
      }), errors.address && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-sm text-red-600 mt-1",
        children: errors.address
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "grid grid-cols-1 md:grid-cols-3 gap-4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
          htmlFor: "city",
          className: "block text-sm font-medium text-gray-700 mb-1",
          children: ["City ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-red-500",
            children: "*"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
          id: "city",
          name: "city",
          type: "text",
          value: formData.city,
          onChange: handleChange,
          className: errors.city ? 'border-red-500' : '',
          disabled: isSubmitting,
          placeholder: "Mahayahay"
        }), errors.city && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-red-600 mt-1",
          children: errors.city
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
          htmlFor: "state",
          className: "block text-sm font-medium text-gray-700 mb-1",
          children: ["State/Province ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-red-500",
            children: "*"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
          id: "state",
          name: "state",
          type: "text",
          value: formData.state,
          onChange: handleChange,
          className: errors.state ? 'border-red-500' : '',
          disabled: isSubmitting,
          placeholder: "Surigao del Sur"
        }), errors.state && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-red-600 mt-1",
          children: errors.state
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
          htmlFor: "zip_code",
          className: "block text-sm font-medium text-gray-700 mb-1",
          children: ["Zip Code ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-red-500",
            children: "*"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
          id: "zip_code",
          name: "zip_code",
          type: "text",
          value: formData.zip_code,
          onChange: handleChange,
          className: errors.zip_code ? 'border-red-500' : '',
          disabled: isSubmitting,
          placeholder: "8305"
        }), errors.zip_code && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-red-600 mt-1",
          children: errors.zip_code
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 gap-4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
          htmlFor: "phone",
          className: "block text-sm font-medium text-gray-700 mb-1",
          children: ["Phone Number ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-red-500",
            children: "*"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
          id: "phone",
          name: "phone",
          type: "tel",
          value: formData.phone,
          onChange: handleChange,
          className: errors.phone ? 'border-red-500' : '',
          disabled: isSubmitting,
          placeholder: "+63 123 456 7890"
        }), errors.phone && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-red-600 mt-1",
          children: errors.phone
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
          htmlFor: "email",
          className: "block text-sm font-medium text-gray-700 mb-1",
          children: ["Email ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-red-500",
            children: "*"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
          id: "email",
          name: "email",
          type: "email",
          value: formData.email,
          onChange: handleChange,
          className: errors.email ? 'border-red-500' : '',
          disabled: isSubmitting,
          placeholder: "info@mahayahayfreemethodist.org"
        }), errors.email && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-red-600 mt-1",
          children: errors.email
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
        htmlFor: "website",
        className: "block text-sm font-medium text-gray-700 mb-1",
        children: "Website"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
        id: "website",
        name: "website",
        type: "url",
        value: formData.website,
        onChange: handleChange,
        className: errors.website ? 'border-red-500' : '',
        disabled: isSubmitting,
        placeholder: "https://www.mahayahayfreemethodist.org"
      }), errors.website && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-sm text-red-600 mt-1",
        children: errors.website
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        htmlFor: "service_times",
        className: "block text-sm font-medium text-gray-700 mb-1",
        children: ["Service Times ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-red-500",
          children: "*"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
        id: "service_times",
        name: "service_times",
        value: formData.service_times,
        onChange: handleChange,
        className: "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ".concat(errors.service_times ? 'border-red-500' : ''),
        disabled: isSubmitting,
        placeholder: "Sunday Worship: 9:00 AM\nSunday School: 10:30 AM\nWednesday Prayer: 7:00 PM",
        rows: 4
      }), errors.service_times && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-sm text-red-600 mt-1",
        children: errors.service_times
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-xs text-gray-500 mt-1",
        children: "Enter service times, one per line"
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex justify-end pt-4 border-t border-gray-200",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        type: "submit",
        disabled: isSubmitting,
        children: isSubmitting ? 'Saving...' : 'Save Changes'
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChurchDetailsForm);

/***/ },

/***/ "./resources/js/components/settings/NotificationToggles.tsx"
/*!******************************************************************!*\
  !*** ./resources/js/components/settings/NotificationToggles.tsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
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





/**
 * NotificationToggles Component
 *
 * Provides toggle switches for managing notification preferences including
 * email notifications, SMS alerts, and system announcements.
 *
 * Features:
 * - Toggle switches for each notification type
 * - Loads existing preferences on mount
 * - Saves changes to API
 * - Displays success/error messages via toast notifications
 *
 * Validates Requirements: 6.2
 */
var NotificationToggles = function NotificationToggles() {
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_3__.useToast)(),
    showToast = _useToast.showToast;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      email_notifications: true,
      sms_notifications: false,
      system_notifications: true
    }),
    _useState2 = _slicedToArray(_useState, 2),
    preferences = _useState2[0],
    setPreferences = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isSubmitting = _useState6[0],
    setIsSubmitting = _useState6[1];
  /**
   * Load notification preferences on component mount
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    loadNotificationPreferences();
  }, []);
  /**
   * Fetch notification preferences from API
   */
  var loadNotificationPreferences = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setIsLoading(true);
            _context.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_4__["default"].get('/settings/notifications');
          case 1:
            response = _context.v;
            if (response.data.success && response.data.data) {
              setPreferences(response.data.data);
            }
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Failed to load notification preferences:', _t);
            showToast('error', 'Failed to load notification preferences');
          case 3:
            _context.p = 3;
            setIsLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function loadNotificationPreferences() {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Handle toggle change
   */
  var handleToggle = function handleToggle(key) {
    setPreferences(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, key, !prev[key]));
    });
  };
  /**
   * Handle form submission
   */
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
      var response, _error$response, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            e.preventDefault();
            setIsSubmitting(true);
            _context2.p = 1;
            _context2.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_4__["default"].put('/settings/notifications', preferences);
          case 2:
            response = _context2.v;
            if (response.data.success) {
              showToast('success', 'Notification preferences saved successfully');
            }
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            console.error('Failed to save notification preferences:', _t2);
            showToast('error', ((_error$response = _t2.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Failed to save notification preferences');
          case 4:
            _context2.p = 4;
            setIsSubmitting(false);
            return _context2.f(4);
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3, 4, 5]]);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  if (isLoading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex items-center justify-center py-12",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "text-gray-500",
        children: "Loading notification preferences..."
      })
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
    onSubmit: handleSubmit,
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex items-center justify-between py-4 border-b border-gray-200",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex-1",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
          className: "text-sm font-medium text-gray-900",
          children: "Email Notifications"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-gray-500 mt-1",
          children: "Receive email notifications for important updates and announcements"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        type: "button",
        onClick: function onClick() {
          return handleToggle('email_notifications');
        },
        disabled: isSubmitting,
        className: "\n            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent \n            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2\n            disabled:cursor-not-allowed disabled:opacity-50\n            ".concat(preferences.email_notifications ? 'bg-primary-600' : 'bg-gray-200', "\n          "),
        role: "switch",
        "aria-checked": preferences.email_notifications,
        "aria-label": "Toggle email notifications",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "\n              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 \n              transition duration-200 ease-in-out\n              ".concat(preferences.email_notifications ? 'translate-x-5' : 'translate-x-0', "\n            ")
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex items-center justify-between py-4 border-b border-gray-200",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex-1",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
          className: "text-sm font-medium text-gray-900",
          children: "SMS Alerts"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-gray-500 mt-1",
          children: "Receive text message alerts for urgent notifications"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        type: "button",
        onClick: function onClick() {
          return handleToggle('sms_notifications');
        },
        disabled: isSubmitting,
        className: "\n            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent \n            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2\n            disabled:cursor-not-allowed disabled:opacity-50\n            ".concat(preferences.sms_notifications ? 'bg-primary-600' : 'bg-gray-200', "\n          "),
        role: "switch",
        "aria-checked": preferences.sms_notifications,
        "aria-label": "Toggle SMS notifications",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "\n              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 \n              transition duration-200 ease-in-out\n              ".concat(preferences.sms_notifications ? 'translate-x-5' : 'translate-x-0', "\n            ")
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex items-center justify-between py-4 border-b border-gray-200",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex-1",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
          className: "text-sm font-medium text-gray-900",
          children: "System Announcements"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-gray-500 mt-1",
          children: "Receive in-app notifications for system updates and announcements"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
        type: "button",
        onClick: function onClick() {
          return handleToggle('system_notifications');
        },
        disabled: isSubmitting,
        className: "\n            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent \n            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2\n            disabled:cursor-not-allowed disabled:opacity-50\n            ".concat(preferences.system_notifications ? 'bg-primary-600' : 'bg-gray-200', "\n          "),
        role: "switch",
        "aria-checked": preferences.system_notifications,
        "aria-label": "Toggle system notifications",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "\n              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 \n              transition duration-200 ease-in-out\n              ".concat(preferences.system_notifications ? 'translate-x-5' : 'translate-x-0', "\n            ")
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex justify-end pt-4 border-t border-gray-200",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        type: "submit",
        disabled: isSubmitting,
        children: isSubmitting ? 'Saving...' : 'Save Preferences'
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificationToggles);

/***/ },

/***/ "./resources/js/components/settings/ProfileForm.tsx"
/*!**********************************************************!*\
  !*** ./resources/js/components/settings/ProfileForm.tsx ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/input */ "./resources/js/components/ui/input.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







/**
 * ProfileForm Component
 *
 * Form for editing user profile including name, email, and password.
 *
 * Features:
 * - Input fields for name, email, and password
 * - Password complexity validation (min 8 chars, uppercase, lowercase, number)
 * - Loads existing user profile on mount
 * - Displays success/error messages via toast notifications
 * - Password fields are optional (only update if provided)
 *
 * Validates Requirements: 6.3, 10.5
 */
var ProfileForm = function ProfileForm() {
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_4__.useToast)(),
    showToast = _useToast.showToast;
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_5__.useAuth)(),
    user = _useAuth.user;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    errors = _useState4[0],
    setErrors = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    isLoading = _useState6[0],
    setIsLoading = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isSubmitting = _useState8[0],
    setIsSubmitting = _useState8[1];
  /**
   * Load user profile on component mount
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: ''
      });
      setIsLoading(false);
    }
  }, [user]);
  /**
   * Validate password complexity
   * Requirements: min 8 characters, uppercase, lowercase, and number
   */
  var validatePassword = function validatePassword(password) {
    if (password.length === 0) {
      return null; // Password is optional
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };
  /**
   * Validate form data
   */
  var validateForm = function validateForm() {
    var newErrors = {};
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 255) {
      newErrors.name = 'Name must be 255 characters or less';
    }
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    // Password validation (only if provided)
    if (formData.password) {
      var passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
      // Password confirmation validation
      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = 'Passwords do not match';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  /**
   * Handle input change
   */
  var handleChange = function handleChange(e) {
    var _e$target = e.target,
      name = _e$target.name,
      value = _e$target.value;
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, value));
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, name, undefined));
      });
    }
  };
  /**
   * Handle form submission
   */
  var handleSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var dataToSend, response, updatedUser, _error$response, _error$response2, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            if (validateForm()) {
              _context.n = 1;
              break;
            }
            showToast('error', 'Please correct the errors in the form');
            return _context.a(2);
          case 1:
            setIsSubmitting(true);
            _context.p = 2;
            // Prepare data to send (only include password if provided)
            dataToSend = {
              name: formData.name,
              email: formData.email
            };
            if (formData.password) {
              dataToSend.password = formData.password;
            }
            _context.n = 3;
            return _lib_api__WEBPACK_IMPORTED_MODULE_6__["default"].put('/profile', dataToSend);
          case 3:
            response = _context.v;
            if (response.data.success) {
              showToast('success', 'Profile updated successfully');
              // Update local storage with new user data
              updatedUser = response.data.user;
              localStorage.setItem('user', JSON.stringify(updatedUser));
              // Clear password fields after successful update
              setFormData(function (prev) {
                return _objectSpread(_objectSpread({}, prev), {}, {
                  password: '',
                  password_confirmation: ''
                });
              });
            }
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Failed to update profile:', _t);
            // Handle server-side validation errors
            if ((_error$response = _t.response) !== null && _error$response !== void 0 && (_error$response = _error$response.data) !== null && _error$response !== void 0 && _error$response.errors) {
              setErrors(_t.response.data.errors);
              showToast('error', 'Please correct the errors in the form');
            } else {
              showToast('error', ((_error$response2 = _t.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || 'Failed to update profile');
            }
          case 5:
            _context.p = 5;
            setIsSubmitting(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4, 5, 6]]);
    }));
    return function handleSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  if (isLoading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex items-center justify-center py-12",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "text-gray-500",
        children: "Loading profile..."
      })
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
    onSubmit: handleSubmit,
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        htmlFor: "name",
        className: "block text-sm font-medium text-gray-700 mb-1",
        children: ["Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-red-500",
          children: "*"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
        id: "name",
        name: "name",
        type: "text",
        value: formData.name,
        onChange: handleChange,
        className: errors.name ? 'border-red-500' : '',
        disabled: isSubmitting,
        placeholder: "John Doe"
      }), errors.name && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-sm text-red-600 mt-1",
        children: errors.name
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        htmlFor: "email",
        className: "block text-sm font-medium text-gray-700 mb-1",
        children: ["Email ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-red-500",
          children: "*"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
        id: "email",
        name: "email",
        type: "email",
        value: formData.email,
        onChange: handleChange,
        className: errors.email ? 'border-red-500' : '',
        disabled: isSubmitting,
        placeholder: "john.doe@example.com"
      }), errors.email && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-sm text-red-600 mt-1",
        children: errors.email
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "pt-4 border-t border-gray-200",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
        className: "text-sm font-medium text-gray-900 mb-4",
        children: "Change Password"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-sm text-gray-500 mb-4",
        children: "Leave blank to keep your current password"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            htmlFor: "password",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "New Password"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
            id: "password",
            name: "password",
            type: "password",
            value: formData.password,
            onChange: handleChange,
            className: errors.password ? 'border-red-500' : '',
            disabled: isSubmitting,
            placeholder: "Enter new password"
          }), errors.password && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.password
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-xs text-gray-500 mt-1",
            children: "Must be at least 8 characters with uppercase, lowercase, and number"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            htmlFor: "password_confirmation",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "Confirm New Password"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
            id: "password_confirmation",
            name: "password_confirmation",
            type: "password",
            value: formData.password_confirmation,
            onChange: handleChange,
            className: errors.password_confirmation ? 'border-red-500' : '',
            disabled: isSubmitting,
            placeholder: "Confirm new password"
          }), errors.password_confirmation && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.password_confirmation
          })]
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex justify-end pt-4 border-t border-gray-200",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
        type: "submit",
        disabled: isSubmitting,
        children: isSubmitting ? 'Saving...' : 'Save Changes'
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileForm);

/***/ },

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
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/archive.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/bell.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/building-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_settings_ChurchDetailsForm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/settings/ChurchDetailsForm */ "./resources/js/components/settings/ChurchDetailsForm.tsx");
/* harmony import */ var _components_settings_NotificationToggles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/settings/NotificationToggles */ "./resources/js/components/settings/NotificationToggles.tsx");
/* harmony import */ var _components_settings_ProfileForm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/settings/ProfileForm */ "./resources/js/components/settings/ProfileForm.tsx");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }










/**
 * Settings Page Component
 *
 * Provides configuration interface for church settings, notifications, and user profile.
 *
 * Features:
 * - Tabbed interface for Church Details, Notifications, and Profile sections
 * - Church Details: Configure church name, address, contact info, and service times
 * - Notifications: Toggle email notifications, SMS alerts, and system announcements
 * - Profile: Edit user profile including name, email, and password
 * - Archive Management: Link to archive management page (admin only)
 *
 * Validates Requirements: 6.1, 6.2, 6.3
 */
var Settings = function Settings() {
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_12__.useAuth)(),
    user = _useAuth.user;
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('church'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'admin';
  var tabs = [{
    id: 'church',
    name: 'Church Details',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"],
    description: 'Configure church information and service times'
  }, {
    id: 'notifications',
    name: 'Notifications',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"],
    description: 'Manage notification preferences'
  }, {
    id: 'profile',
    name: 'Profile',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"],
    description: 'Update your personal information'
  }];
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "mb-8",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
        className: "text-3xl font-bold text-gray-900",
        children: "Settings"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "mt-2 text-gray-600",
        children: "Manage church settings, notification preferences, and your profile."
      })]
    }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_7__.Card, {
      className: "p-4 bg-orange-50 border-orange-200",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
              className: "h-5 w-5 text-orange-600"
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "ml-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-sm font-semibold text-gray-900",
              children: "Archive Management"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-gray-600",
              children: "View and manage archived items"
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return navigate('/archive-management');
          },
          className: "border-orange-300 hover:bg-orange-100",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "h-4 w-4 mr-2"
          }), "Open Archive"]
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "border-b border-gray-200",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
        className: "-mb-px flex space-x-8",
        children: tabs.map(function (tab) {
          var Icon = tab.icon;
          var isActive = activeTab === tab.id;
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
            onClick: function onClick() {
              return setActiveTab(tab.id);
            },
            className: "\n                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm\n                  transition-colors duration-150 ease-in-out\n                  ".concat(isActive ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', "\n                "),
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
              className: "\n                    mr-2 h-5 w-5\n                    ".concat(isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500', "\n                  ")
            }), tab.name]
          }, tab.id);
        })
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "mt-6",
      children: [activeTab === 'church' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_7__.Card, {
        className: "p-6",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
              className: "text-xl font-semibold text-gray-900 flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                className: "mr-2 h-5 w-5 text-primary-600"
              }), "Church Details"]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-gray-600",
              children: "Configure your church's basic information and service times."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "border-t border-gray-200 pt-6",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_settings_ChurchDetailsForm__WEBPACK_IMPORTED_MODULE_9__["default"], {})
          })]
        })
      }), activeTab === 'notifications' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_7__.Card, {
        className: "p-6",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
              className: "text-xl font-semibold text-gray-900 flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                className: "mr-2 h-5 w-5 text-primary-600"
              }), "Notification Preferences"]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-gray-600",
              children: "Manage how you receive notifications and alerts."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "border-t border-gray-200 pt-6",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_settings_NotificationToggles__WEBPACK_IMPORTED_MODULE_10__["default"], {})
          })]
        })
      }), activeTab === 'profile' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_7__.Card, {
        className: "p-6",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
              className: "text-xl font-semibold text-gray-900 flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                className: "mr-2 h-5 w-5 text-primary-600"
              }), "User Profile"]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-gray-600",
              children: "Update your personal information and account settings."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "border-t border-gray-200 pt-6",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_settings_ProfileForm__WEBPACK_IMPORTED_MODULE_11__["default"], {})
          })]
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

/***/ "./node_modules/lucide-react/dist/esm/icons/bell.js"
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/bell.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Bell)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("bell", __iconNode);


//# sourceMappingURL=bell.js.map


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


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX1NldHRpbmdzX3RzeC5qcz9pZD0yNGY3OTYxYTZkZmVhYTJhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNBLHVLQUFBQSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBRSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBSSxDQUFBLE1BQUFDLENBQUEsR0FBQVgsQ0FBQSxRQUFBWSxDQUFBLE9BQUFDLENBQUEsS0FBQUYsQ0FBQSxLQUFBYixDQUFBLEtBQUFnQixDQUFBLEVBQUFwQixDQUFBLEVBQUFxQixDQUFBLEVBQUFDLENBQUEsRUFBQU4sQ0FBQSxFQUFBTSxDQUFBLENBQUFDLElBQUEsQ0FBQXZCLENBQUEsTUFBQXNCLENBQUEsV0FBQUEsRUFBQXJCLENBQUEsRUFBQUMsQ0FBQSxXQUFBTSxDQUFBLEdBQUFQLENBQUEsRUFBQVEsQ0FBQSxNQUFBRyxDQUFBLEdBQUFaLENBQUEsRUFBQW1CLENBQUEsQ0FBQWYsQ0FBQSxHQUFBRixDQUFBLEVBQUFtQixDQUFBLGdCQUFBQyxFQUFBcEIsQ0FBQSxFQUFBRSxDQUFBLFNBQUFLLENBQUEsR0FBQVAsQ0FBQSxFQUFBVSxDQUFBLEdBQUFSLENBQUEsRUFBQUgsQ0FBQSxPQUFBaUIsQ0FBQSxJQUFBRixDQUFBLEtBQUFWLENBQUEsSUFBQUwsQ0FBQSxHQUFBZ0IsQ0FBQSxDQUFBTyxNQUFBLEVBQUF2QixDQUFBLFVBQUFLLENBQUEsRUFBQUUsQ0FBQSxHQUFBUyxDQUFBLENBQUFoQixDQUFBLEdBQUFxQixDQUFBLEdBQUFILENBQUEsQ0FBQUYsQ0FBQSxFQUFBUSxDQUFBLEdBQUFqQixDQUFBLEtBQUFOLENBQUEsUUFBQUksQ0FBQSxHQUFBbUIsQ0FBQSxLQUFBckIsQ0FBQSxNQUFBUSxDQUFBLEdBQUFKLENBQUEsRUFBQUMsQ0FBQSxHQUFBRCxDQUFBLFlBQUFDLENBQUEsV0FBQUQsQ0FBQSxNQUFBQSxDQUFBLE1BQUFSLENBQUEsSUFBQVEsQ0FBQSxPQUFBYyxDQUFBLE1BQUFoQixDQUFBLEdBQUFKLENBQUEsUUFBQW9CLENBQUEsR0FBQWQsQ0FBQSxRQUFBQyxDQUFBLE1BQUFVLENBQUEsQ0FBQUMsQ0FBQSxHQUFBaEIsQ0FBQSxFQUFBZSxDQUFBLENBQUFmLENBQUEsR0FBQUksQ0FBQSxPQUFBYyxDQUFBLEdBQUFHLENBQUEsS0FBQW5CLENBQUEsR0FBQUosQ0FBQSxRQUFBTSxDQUFBLE1BQUFKLENBQUEsSUFBQUEsQ0FBQSxHQUFBcUIsQ0FBQSxNQUFBakIsQ0FBQSxNQUFBTixDQUFBLEVBQUFNLENBQUEsTUFBQUosQ0FBQSxFQUFBZSxDQUFBLENBQUFmLENBQUEsR0FBQXFCLENBQUEsRUFBQWhCLENBQUEsY0FBQUgsQ0FBQSxJQUFBSixDQUFBLGFBQUFtQixDQUFBLFFBQUFILENBQUEsT0FBQWQsQ0FBQSxxQkFBQUUsQ0FBQSxFQUFBVyxDQUFBLEVBQUFRLENBQUEsUUFBQVQsQ0FBQSxZQUFBVSxTQUFBLHVDQUFBUixDQUFBLFVBQUFELENBQUEsSUFBQUssQ0FBQSxDQUFBTCxDQUFBLEVBQUFRLENBQUEsR0FBQWhCLENBQUEsR0FBQVEsQ0FBQSxFQUFBTCxDQUFBLEdBQUFhLENBQUEsR0FBQXhCLENBQUEsR0FBQVEsQ0FBQSxPQUFBVCxDQUFBLEdBQUFZLENBQUEsTUFBQU0sQ0FBQSxLQUFBVixDQUFBLEtBQUFDLENBQUEsR0FBQUEsQ0FBQSxRQUFBQSxDQUFBLFNBQUFVLENBQUEsQ0FBQWYsQ0FBQSxRQUFBa0IsQ0FBQSxDQUFBYixDQUFBLEVBQUFHLENBQUEsS0FBQU8sQ0FBQSxDQUFBZixDQUFBLEdBQUFRLENBQUEsR0FBQU8sQ0FBQSxDQUFBQyxDQUFBLEdBQUFSLENBQUEsYUFBQUksQ0FBQSxNQUFBUixDQUFBLFFBQUFDLENBQUEsS0FBQUgsQ0FBQSxZQUFBTCxDQUFBLEdBQUFPLENBQUEsQ0FBQUYsQ0FBQSxXQUFBTCxDQUFBLEdBQUFBLENBQUEsQ0FBQTBCLElBQUEsQ0FBQW5CLENBQUEsRUFBQUksQ0FBQSxVQUFBYyxTQUFBLDJDQUFBekIsQ0FBQSxDQUFBMkIsSUFBQSxTQUFBM0IsQ0FBQSxFQUFBVyxDQUFBLEdBQUFYLENBQUEsQ0FBQTRCLEtBQUEsRUFBQXBCLENBQUEsU0FBQUEsQ0FBQSxvQkFBQUEsQ0FBQSxLQUFBUixDQUFBLEdBQUFPLENBQUEsZUFBQVAsQ0FBQSxDQUFBMEIsSUFBQSxDQUFBbkIsQ0FBQSxHQUFBQyxDQUFBLFNBQUFHLENBQUEsR0FBQWMsU0FBQSx1Q0FBQXBCLENBQUEsZ0JBQUFHLENBQUEsT0FBQUQsQ0FBQSxHQUFBUixDQUFBLGNBQUFDLENBQUEsSUFBQWlCLENBQUEsR0FBQUMsQ0FBQSxDQUFBZixDQUFBLFFBQUFRLENBQUEsR0FBQVYsQ0FBQSxDQUFBeUIsSUFBQSxDQUFBdkIsQ0FBQSxFQUFBZSxDQUFBLE9BQUFFLENBQUEsa0JBQUFwQixDQUFBLElBQUFPLENBQUEsR0FBQVIsQ0FBQSxFQUFBUyxDQUFBLE1BQUFHLENBQUEsR0FBQVgsQ0FBQSxjQUFBZSxDQUFBLG1CQUFBYSxLQUFBLEVBQUE1QixDQUFBLEVBQUEyQixJQUFBLEVBQUFWLENBQUEsU0FBQWhCLENBQUEsRUFBQUksQ0FBQSxFQUFBRSxDQUFBLFFBQUFJLENBQUEsUUFBQVMsQ0FBQSxnQkFBQVYsVUFBQSxjQUFBbUIsa0JBQUEsY0FBQUMsMkJBQUEsS0FBQTlCLENBQUEsR0FBQVksTUFBQSxDQUFBbUIsY0FBQSxNQUFBdkIsQ0FBQSxNQUFBTCxDQUFBLElBQUFILENBQUEsQ0FBQUEsQ0FBQSxJQUFBRyxDQUFBLFNBQUFXLG1CQUFBLENBQUFkLENBQUEsT0FBQUcsQ0FBQSxpQ0FBQUgsQ0FBQSxHQUFBVyxDQUFBLEdBQUFtQiwwQkFBQSxDQUFBckIsU0FBQSxHQUFBQyxTQUFBLENBQUFELFNBQUEsR0FBQUcsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsWUFBQU8sRUFBQWhCLENBQUEsV0FBQWEsTUFBQSxDQUFBb0IsY0FBQSxHQUFBcEIsTUFBQSxDQUFBb0IsY0FBQSxDQUFBakMsQ0FBQSxFQUFBK0IsMEJBQUEsS0FBQS9CLENBQUEsQ0FBQWtDLFNBQUEsR0FBQUgsMEJBQUEsRUFBQWhCLG1CQUFBLENBQUFmLENBQUEsRUFBQU0sQ0FBQSx5QkFBQU4sQ0FBQSxDQUFBVSxTQUFBLEdBQUFHLE1BQUEsQ0FBQUMsTUFBQSxDQUFBRixDQUFBLEdBQUFaLENBQUEsV0FBQThCLGlCQUFBLENBQUFwQixTQUFBLEdBQUFxQiwwQkFBQSxFQUFBaEIsbUJBQUEsQ0FBQUgsQ0FBQSxpQkFBQW1CLDBCQUFBLEdBQUFoQixtQkFBQSxDQUFBZ0IsMEJBQUEsaUJBQUFELGlCQUFBLEdBQUFBLGlCQUFBLENBQUFLLFdBQUEsd0JBQUFwQixtQkFBQSxDQUFBZ0IsMEJBQUEsRUFBQXpCLENBQUEsd0JBQUFTLG1CQUFBLENBQUFILENBQUEsR0FBQUcsbUJBQUEsQ0FBQUgsQ0FBQSxFQUFBTixDQUFBLGdCQUFBUyxtQkFBQSxDQUFBSCxDQUFBLEVBQUFSLENBQUEsaUNBQUFXLG1CQUFBLENBQUFILENBQUEsOERBQUF3QixZQUFBLFlBQUFBLGFBQUEsYUFBQUMsQ0FBQSxFQUFBN0IsQ0FBQSxFQUFBOEIsQ0FBQSxFQUFBdEIsQ0FBQTtBQUFBLFNBQUFELG9CQUFBZixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxFQUFBSCxDQUFBLFFBQUFPLENBQUEsR0FBQUssTUFBQSxDQUFBMEIsY0FBQSxRQUFBL0IsQ0FBQSx1QkFBQVIsQ0FBQSxJQUFBUSxDQUFBLFFBQUFPLG1CQUFBLFlBQUF5QixtQkFBQXhDLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFILENBQUEsYUFBQUssRUFBQUosQ0FBQSxFQUFBRSxDQUFBLElBQUFXLG1CQUFBLENBQUFmLENBQUEsRUFBQUUsQ0FBQSxZQUFBRixDQUFBLGdCQUFBeUMsT0FBQSxDQUFBdkMsQ0FBQSxFQUFBRSxDQUFBLEVBQUFKLENBQUEsU0FBQUUsQ0FBQSxHQUFBTSxDQUFBLEdBQUFBLENBQUEsQ0FBQVIsQ0FBQSxFQUFBRSxDQUFBLElBQUEyQixLQUFBLEVBQUF6QixDQUFBLEVBQUFzQyxVQUFBLEdBQUF6QyxDQUFBLEVBQUEwQyxZQUFBLEdBQUExQyxDQUFBLEVBQUEyQyxRQUFBLEdBQUEzQyxDQUFBLE1BQUFELENBQUEsQ0FBQUUsQ0FBQSxJQUFBRSxDQUFBLElBQUFFLENBQUEsYUFBQUEsQ0FBQSxjQUFBQSxDQUFBLG1CQUFBUyxtQkFBQSxDQUFBZixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxFQUFBSCxDQUFBO0FBQUEsU0FBQTRDLG1CQUFBekMsQ0FBQSxFQUFBSCxDQUFBLEVBQUFELENBQUEsRUFBQUUsQ0FBQSxFQUFBSSxDQUFBLEVBQUFlLENBQUEsRUFBQVosQ0FBQSxjQUFBRCxDQUFBLEdBQUFKLENBQUEsQ0FBQWlCLENBQUEsRUFBQVosQ0FBQSxHQUFBRyxDQUFBLEdBQUFKLENBQUEsQ0FBQXFCLEtBQUEsV0FBQXpCLENBQUEsZ0JBQUFKLENBQUEsQ0FBQUksQ0FBQSxLQUFBSSxDQUFBLENBQUFvQixJQUFBLEdBQUEzQixDQUFBLENBQUFXLENBQUEsSUFBQWtDLE9BQUEsQ0FBQUMsT0FBQSxDQUFBbkMsQ0FBQSxFQUFBb0MsSUFBQSxDQUFBOUMsQ0FBQSxFQUFBSSxDQUFBO0FBQUEsU0FBQTJDLGtCQUFBN0MsQ0FBQSw2QkFBQUgsQ0FBQSxTQUFBRCxDQUFBLEdBQUFrRCxTQUFBLGFBQUFKLE9BQUEsV0FBQTVDLENBQUEsRUFBQUksQ0FBQSxRQUFBZSxDQUFBLEdBQUFqQixDQUFBLENBQUErQyxLQUFBLENBQUFsRCxDQUFBLEVBQUFELENBQUEsWUFBQW9ELE1BQUFoRCxDQUFBLElBQUF5QyxrQkFBQSxDQUFBeEIsQ0FBQSxFQUFBbkIsQ0FBQSxFQUFBSSxDQUFBLEVBQUE4QyxLQUFBLEVBQUFDLE1BQUEsVUFBQWpELENBQUEsY0FBQWlELE9BQUFqRCxDQUFBLElBQUF5QyxrQkFBQSxDQUFBeEIsQ0FBQSxFQUFBbkIsQ0FBQSxFQUFBSSxDQUFBLEVBQUE4QyxLQUFBLEVBQUFDLE1BQUEsV0FBQWpELENBQUEsS0FBQWdELEtBQUE7QUFBQSxTQUFBRSxlQUFBcEQsQ0FBQSxFQUFBRixDQUFBLFdBQUF1RCxlQUFBLENBQUFyRCxDQUFBLEtBQUFzRCxxQkFBQSxDQUFBdEQsQ0FBQSxFQUFBRixDQUFBLEtBQUF5RCwyQkFBQSxDQUFBdkQsQ0FBQSxFQUFBRixDQUFBLEtBQUEwRCxnQkFBQTtBQUFBLFNBQUFBLGlCQUFBLGNBQUFoQyxTQUFBO0FBQUEsU0FBQStCLDRCQUFBdkQsQ0FBQSxFQUFBbUIsQ0FBQSxRQUFBbkIsQ0FBQSwyQkFBQUEsQ0FBQSxTQUFBeUQsaUJBQUEsQ0FBQXpELENBQUEsRUFBQW1CLENBQUEsT0FBQXBCLENBQUEsTUFBQTJELFFBQUEsQ0FBQWpDLElBQUEsQ0FBQXpCLENBQUEsRUFBQTJELEtBQUEsNkJBQUE1RCxDQUFBLElBQUFDLENBQUEsQ0FBQTRELFdBQUEsS0FBQTdELENBQUEsR0FBQUMsQ0FBQSxDQUFBNEQsV0FBQSxDQUFBQyxJQUFBLGFBQUE5RCxDQUFBLGNBQUFBLENBQUEsR0FBQStELEtBQUEsQ0FBQUMsSUFBQSxDQUFBL0QsQ0FBQSxvQkFBQUQsQ0FBQSwrQ0FBQWlFLElBQUEsQ0FBQWpFLENBQUEsSUFBQTBELGlCQUFBLENBQUF6RCxDQUFBLEVBQUFtQixDQUFBO0FBQUEsU0FBQXNDLGtCQUFBekQsQ0FBQSxFQUFBbUIsQ0FBQSxhQUFBQSxDQUFBLElBQUFBLENBQUEsR0FBQW5CLENBQUEsQ0FBQXNCLE1BQUEsTUFBQUgsQ0FBQSxHQUFBbkIsQ0FBQSxDQUFBc0IsTUFBQSxZQUFBeEIsQ0FBQSxNQUFBSSxDQUFBLEdBQUE0RCxLQUFBLENBQUEzQyxDQUFBLEdBQUFyQixDQUFBLEdBQUFxQixDQUFBLEVBQUFyQixDQUFBLElBQUFJLENBQUEsQ0FBQUosQ0FBQSxJQUFBRSxDQUFBLENBQUFGLENBQUEsVUFBQUksQ0FBQTtBQUFBLFNBQUFvRCxzQkFBQXRELENBQUEsRUFBQXVCLENBQUEsUUFBQXhCLENBQUEsV0FBQUMsQ0FBQSxnQ0FBQUMsTUFBQSxJQUFBRCxDQUFBLENBQUFDLE1BQUEsQ0FBQUUsUUFBQSxLQUFBSCxDQUFBLDRCQUFBRCxDQUFBLFFBQUFELENBQUEsRUFBQUksQ0FBQSxFQUFBSSxDQUFBLEVBQUFJLENBQUEsRUFBQVMsQ0FBQSxPQUFBTCxDQUFBLE9BQUFWLENBQUEsaUJBQUFFLENBQUEsSUFBQVAsQ0FBQSxHQUFBQSxDQUFBLENBQUEwQixJQUFBLENBQUF6QixDQUFBLEdBQUFpRSxJQUFBLFFBQUExQyxDQUFBLFFBQUFaLE1BQUEsQ0FBQVosQ0FBQSxNQUFBQSxDQUFBLFVBQUFlLENBQUEsdUJBQUFBLENBQUEsSUFBQWhCLENBQUEsR0FBQVEsQ0FBQSxDQUFBbUIsSUFBQSxDQUFBMUIsQ0FBQSxHQUFBMkIsSUFBQSxNQUFBUCxDQUFBLENBQUErQyxJQUFBLENBQUFwRSxDQUFBLENBQUE2QixLQUFBLEdBQUFSLENBQUEsQ0FBQUcsTUFBQSxLQUFBQyxDQUFBLEdBQUFULENBQUEsaUJBQUFkLENBQUEsSUFBQUksQ0FBQSxPQUFBRixDQUFBLEdBQUFGLENBQUEseUJBQUFjLENBQUEsWUFBQWYsQ0FBQSxlQUFBVyxDQUFBLEdBQUFYLENBQUEsY0FBQVksTUFBQSxDQUFBRCxDQUFBLE1BQUFBLENBQUEsMkJBQUFOLENBQUEsUUFBQUYsQ0FBQSxhQUFBaUIsQ0FBQTtBQUFBLFNBQUFrQyxnQkFBQXJELENBQUEsUUFBQThELEtBQUEsQ0FBQUssT0FBQSxDQUFBbkUsQ0FBQSxVQUFBQSxDQUFBO0FBRCtEO0FBQ25CO0FBQ047QUFDRjtBQUNtQjtBQUN2QjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU04RSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQWlCQSxDQUFBLEVBQVM7RUFDNUIsSUFBQUMsU0FBQSxHQUFzQkgsZ0VBQVEsQ0FBQyxDQUFDO0lBQXhCSSxTQUFTLEdBQUFELFNBQUEsQ0FBVEMsU0FBUztFQUNqQixJQUFBQyxTQUFBLEdBQWdDVCwrQ0FBUSxDQUFDO01BQ3JDVSxXQUFXLEVBQUUsRUFBRTtNQUNmQyxPQUFPLEVBQUUsRUFBRTtNQUNYQyxJQUFJLEVBQUUsRUFBRTtNQUNSQyxLQUFLLEVBQUUsRUFBRTtNQUNUQyxRQUFRLEVBQUUsRUFBRTtNQUNaQyxLQUFLLEVBQUUsRUFBRTtNQUNUQyxLQUFLLEVBQUUsRUFBRTtNQUNUQyxPQUFPLEVBQUUsRUFBRTtNQUNYQyxhQUFhLEVBQUU7SUFDbkIsQ0FBQyxDQUFDO0lBQUFDLFVBQUEsR0FBQXZDLGNBQUEsQ0FBQTZCLFNBQUE7SUFWS1csUUFBUSxHQUFBRCxVQUFBO0lBQUVFLFdBQVcsR0FBQUYsVUFBQTtFQVc1QixJQUFBRyxVQUFBLEdBQTRCdEIsK0NBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFBdUIsVUFBQSxHQUFBM0MsY0FBQSxDQUFBMEMsVUFBQTtJQUFqQ0UsTUFBTSxHQUFBRCxVQUFBO0lBQUVFLFNBQVMsR0FBQUYsVUFBQTtFQUN4QixJQUFBRyxVQUFBLEdBQWtDMUIsK0NBQVEsQ0FBQyxJQUFJLENBQUM7SUFBQTJCLFVBQUEsR0FBQS9DLGNBQUEsQ0FBQThDLFVBQUE7SUFBekNFLFNBQVMsR0FBQUQsVUFBQTtJQUFFRSxZQUFZLEdBQUFGLFVBQUE7RUFDOUIsSUFBQUcsVUFBQSxHQUF3QzlCLCtDQUFRLENBQUMsS0FBSyxDQUFDO0lBQUErQixVQUFBLEdBQUFuRCxjQUFBLENBQUFrRCxVQUFBO0lBQWhERSxZQUFZLEdBQUFELFVBQUE7SUFBRUUsZUFBZSxHQUFBRixVQUFBO0VBQ3BDO0FBQ0o7QUFDQTtFQUNJOUIsZ0RBQVMsQ0FBQyxZQUFNO0lBQ1ppQyxrQkFBa0IsQ0FBQyxDQUFDO0VBQ3hCLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDTjtBQUNKO0FBQ0E7RUFDSSxJQUFNQSxrQkFBa0I7SUFBQSxJQUFBQyxJQUFBLEdBQUE1RCxpQkFBQSxjQUFBYixZQUFBLEdBQUFFLENBQUEsQ0FBRyxTQUFBd0UsUUFBQTtNQUFBLElBQUFDLFFBQUEsRUFBQUMsUUFBQSxFQUFBQyxFQUFBO01BQUEsT0FBQTdFLFlBQUEsR0FBQUMsQ0FBQSxXQUFBNkUsUUFBQTtRQUFBLGtCQUFBQSxRQUFBLENBQUFqRyxDQUFBLEdBQUFpRyxRQUFBLENBQUE5RyxDQUFBO1VBQUE7WUFBQThHLFFBQUEsQ0FBQWpHLENBQUE7WUFFbkJzRixZQUFZLENBQUMsSUFBSSxDQUFDO1lBQUNXLFFBQUEsQ0FBQTlHLENBQUE7WUFBQSxPQUNJMkUsZ0RBQUcsQ0FBQ29DLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztVQUFBO1lBQTVDSixRQUFRLEdBQUFHLFFBQUEsQ0FBQTlGLENBQUE7WUFDZCxJQUFJMkYsUUFBUSxDQUFDSyxJQUFJLENBQUNDLE9BQU8sSUFBSU4sUUFBUSxDQUFDSyxJQUFJLENBQUNBLElBQUksRUFBRTtjQUN2Q0osUUFBUSxHQUFHRCxRQUFRLENBQUNLLElBQUksQ0FBQ0EsSUFBSTtjQUNuQ3JCLFdBQVcsQ0FBQztnQkFDUlgsV0FBVyxFQUFFNEIsUUFBUSxDQUFDNUIsV0FBVyxJQUFJLEVBQUU7Z0JBQ3ZDQyxPQUFPLEVBQUUyQixRQUFRLENBQUMzQixPQUFPLElBQUksRUFBRTtnQkFDL0JDLElBQUksRUFBRTBCLFFBQVEsQ0FBQzFCLElBQUksSUFBSSxFQUFFO2dCQUN6QkMsS0FBSyxFQUFFeUIsUUFBUSxDQUFDekIsS0FBSyxJQUFJLEVBQUU7Z0JBQzNCQyxRQUFRLEVBQUV3QixRQUFRLENBQUN4QixRQUFRLElBQUksRUFBRTtnQkFDakNDLEtBQUssRUFBRXVCLFFBQVEsQ0FBQ3ZCLEtBQUssSUFBSSxFQUFFO2dCQUMzQkMsS0FBSyxFQUFFc0IsUUFBUSxDQUFDdEIsS0FBSyxJQUFJLEVBQUU7Z0JBQzNCQyxPQUFPLEVBQUVxQixRQUFRLENBQUNyQixPQUFPLElBQUksRUFBRTtnQkFDL0JDLGFBQWEsRUFBRW9CLFFBQVEsQ0FBQ3BCLGFBQWEsSUFBSTtjQUM3QyxDQUFDLENBQUM7WUFDTjtZQUFDc0IsUUFBQSxDQUFBOUcsQ0FBQTtZQUFBO1VBQUE7WUFBQThHLFFBQUEsQ0FBQWpHLENBQUE7WUFBQWdHLEVBQUEsR0FBQUMsUUFBQSxDQUFBOUYsQ0FBQTtZQUdEa0csT0FBTyxDQUFDQyxLQUFLLENBQUMsaUNBQWlDLEVBQUFOLEVBQU8sQ0FBQztZQUN2RC9CLFNBQVMsQ0FBQyxPQUFPLEVBQUUsZ0NBQWdDLENBQUM7VUFBQztZQUFBZ0MsUUFBQSxDQUFBakcsQ0FBQTtZQUdyRHNGLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFBQyxPQUFBVyxRQUFBLENBQUFsRyxDQUFBO1VBQUE7WUFBQSxPQUFBa0csUUFBQSxDQUFBN0YsQ0FBQTtRQUFBO01BQUEsR0FBQXlGLE9BQUE7SUFBQSxDQUUzQjtJQUFBLGdCQTFCS0Ysa0JBQWtCQSxDQUFBO01BQUEsT0FBQUMsSUFBQSxDQUFBMUQsS0FBQSxPQUFBRCxTQUFBO0lBQUE7RUFBQSxHQTBCdkI7RUFDRDtBQUNKO0FBQ0E7RUFDSSxJQUFNc0UsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUEsRUFBUztJQUN2QixJQUFNQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCO0lBQ0EsSUFBSSxDQUFDM0IsUUFBUSxDQUFDVixXQUFXLENBQUNzQyxJQUFJLENBQUMsQ0FBQyxFQUFFO01BQzlCRCxTQUFTLENBQUNyQyxXQUFXLEdBQUcseUJBQXlCO0lBQ3JELENBQUMsTUFDSSxJQUFJVSxRQUFRLENBQUNWLFdBQVcsQ0FBQzVELE1BQU0sR0FBRyxHQUFHLEVBQUU7TUFDeENpRyxTQUFTLENBQUNyQyxXQUFXLEdBQUcsNENBQTRDO0lBQ3hFO0lBQ0EsSUFBSSxDQUFDVSxRQUFRLENBQUNULE9BQU8sQ0FBQ3FDLElBQUksQ0FBQyxDQUFDLEVBQUU7TUFDMUJELFNBQVMsQ0FBQ3BDLE9BQU8sR0FBRyxxQkFBcUI7SUFDN0MsQ0FBQyxNQUNJLElBQUlTLFFBQVEsQ0FBQ1QsT0FBTyxDQUFDN0QsTUFBTSxHQUFHLEdBQUcsRUFBRTtNQUNwQ2lHLFNBQVMsQ0FBQ3BDLE9BQU8sR0FBRyx3Q0FBd0M7SUFDaEU7SUFDQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ1IsSUFBSSxDQUFDb0MsSUFBSSxDQUFDLENBQUMsRUFBRTtNQUN2QkQsU0FBUyxDQUFDbkMsSUFBSSxHQUFHLGtCQUFrQjtJQUN2QztJQUNBLElBQUksQ0FBQ1EsUUFBUSxDQUFDUCxLQUFLLENBQUNtQyxJQUFJLENBQUMsQ0FBQyxFQUFFO01BQ3hCRCxTQUFTLENBQUNsQyxLQUFLLEdBQUcsbUJBQW1CO0lBQ3pDO0lBQ0EsSUFBSSxDQUFDTyxRQUFRLENBQUNOLFFBQVEsQ0FBQ2tDLElBQUksQ0FBQyxDQUFDLEVBQUU7TUFDM0JELFNBQVMsQ0FBQ2pDLFFBQVEsR0FBRyxzQkFBc0I7SUFDL0M7SUFDQSxJQUFJLENBQUNNLFFBQVEsQ0FBQ0wsS0FBSyxDQUFDaUMsSUFBSSxDQUFDLENBQUMsRUFBRTtNQUN4QkQsU0FBUyxDQUFDaEMsS0FBSyxHQUFHLDBCQUEwQjtJQUNoRCxDQUFDLE1BQ0ksSUFBSSxDQUFDLG1CQUFtQixDQUFDdkIsSUFBSSxDQUFDNEIsUUFBUSxDQUFDTCxLQUFLLENBQUMsRUFBRTtNQUNoRGdDLFNBQVMsQ0FBQ2hDLEtBQUssR0FBRyxtQ0FBbUM7SUFDekQ7SUFDQSxJQUFJLENBQUNLLFFBQVEsQ0FBQ0osS0FBSyxDQUFDZ0MsSUFBSSxDQUFDLENBQUMsRUFBRTtNQUN4QkQsU0FBUyxDQUFDL0IsS0FBSyxHQUFHLG1CQUFtQjtJQUN6QyxDQUFDLE1BQ0ksSUFBSSxDQUFDLDRCQUE0QixDQUFDeEIsSUFBSSxDQUFDNEIsUUFBUSxDQUFDSixLQUFLLENBQUMsRUFBRTtNQUN6RCtCLFNBQVMsQ0FBQy9CLEtBQUssR0FBRyxvQ0FBb0M7SUFDMUQ7SUFDQTtJQUNBLElBQUlJLFFBQVEsQ0FBQ0gsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUN6QixJQUFJLENBQUM0QixRQUFRLENBQUNILE9BQU8sQ0FBQyxFQUFFO01BQzlEOEIsU0FBUyxDQUFDOUIsT0FBTyxHQUFHLHNEQUFzRDtJQUM5RTtJQUNBLElBQUksQ0FBQ0csUUFBUSxDQUFDRixhQUFhLENBQUM4QixJQUFJLENBQUMsQ0FBQyxFQUFFO01BQ2hDRCxTQUFTLENBQUM3QixhQUFhLEdBQUcsNEJBQTRCO0lBQzFELENBQUMsTUFDSSxJQUFJRSxRQUFRLENBQUNGLGFBQWEsQ0FBQ3BFLE1BQU0sR0FBRyxHQUFHLEVBQUU7TUFDMUNpRyxTQUFTLENBQUM3QixhQUFhLEdBQUcsOENBQThDO0lBQzVFO0lBQ0FPLFNBQVMsQ0FBQ3NCLFNBQVMsQ0FBQztJQUNwQixPQUFPNUcsTUFBTSxDQUFDOEcsSUFBSSxDQUFDRixTQUFTLENBQUMsQ0FBQ2pHLE1BQU0sS0FBSyxDQUFDO0VBQzlDLENBQUM7RUFDRDtBQUNKO0FBQ0E7RUFDSSxJQUFNb0csWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUk1SCxDQUFDLEVBQUs7SUFDeEIsSUFBQTZILFNBQUEsR0FBd0I3SCxDQUFDLENBQUM4SCxNQUFNO01BQXhCL0QsSUFBSSxHQUFBOEQsU0FBQSxDQUFKOUQsSUFBSTtNQUFFbEMsS0FBSyxHQUFBZ0csU0FBQSxDQUFMaEcsS0FBSztJQUNuQmtFLFdBQVcsQ0FBQyxVQUFDZ0MsSUFBSTtNQUFBLE9BQUFDLGFBQUEsQ0FBQUEsYUFBQSxLQUNWRCxJQUFJLE9BQUFFLGVBQUEsS0FDTmxFLElBQUksRUFBR2xDLEtBQUs7SUFBQSxDQUNmLENBQUM7SUFDSDtJQUNBLElBQUlxRSxNQUFNLENBQUNuQyxJQUFJLENBQUMsRUFBRTtNQUNkb0MsU0FBUyxDQUFDLFVBQUM0QixJQUFJO1FBQUEsT0FBQUMsYUFBQSxDQUFBQSxhQUFBLEtBQ1JELElBQUksT0FBQUUsZUFBQSxLQUNObEUsSUFBSSxFQUFHbUUsU0FBUztNQUFBLENBQ25CLENBQUM7SUFDUDtFQUNKLENBQUM7RUFDRDtBQUNKO0FBQ0E7RUFDSSxJQUFNQyxZQUFZO0lBQUEsSUFBQUMsS0FBQSxHQUFBbkYsaUJBQUEsY0FBQWIsWUFBQSxHQUFBRSxDQUFBLENBQUcsU0FBQStGLFNBQU9ySSxDQUFDO01BQUEsSUFBQStHLFFBQUEsRUFBQXVCLGVBQUEsRUFBQUMsZ0JBQUEsRUFBQUMsR0FBQTtNQUFBLE9BQUFwRyxZQUFBLEdBQUFDLENBQUEsV0FBQW9HLFNBQUE7UUFBQSxrQkFBQUEsU0FBQSxDQUFBeEgsQ0FBQSxHQUFBd0gsU0FBQSxDQUFBckksQ0FBQTtVQUFBO1lBQ3pCSixDQUFDLENBQUMwSSxjQUFjLENBQUMsQ0FBQztZQUFDLElBQ2RsQixZQUFZLENBQUMsQ0FBQztjQUFBaUIsU0FBQSxDQUFBckksQ0FBQTtjQUFBO1lBQUE7WUFDZjhFLFNBQVMsQ0FBQyxPQUFPLEVBQUUsdUNBQXVDLENBQUM7WUFBQyxPQUFBdUQsU0FBQSxDQUFBcEgsQ0FBQTtVQUFBO1lBR2hFc0YsZUFBZSxDQUFDLElBQUksQ0FBQztZQUFDOEIsU0FBQSxDQUFBeEgsQ0FBQTtZQUFBd0gsU0FBQSxDQUFBckksQ0FBQTtZQUFBLE9BRUsyRSxnREFBRyxDQUFDNEQsR0FBRyxDQUFDLGtCQUFrQixFQUFFN0MsUUFBUSxDQUFDO1VBQUE7WUFBdERpQixRQUFRLEdBQUEwQixTQUFBLENBQUFySCxDQUFBO1lBQ2QsSUFBSTJGLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDQyxPQUFPLEVBQUU7Y0FDdkJuQyxTQUFTLENBQUMsU0FBUyxFQUFFLG9DQUFvQyxDQUFDO1lBQzlEO1lBQUN1RCxTQUFBLENBQUFySSxDQUFBO1lBQUE7VUFBQTtZQUFBcUksU0FBQSxDQUFBeEgsQ0FBQTtZQUFBdUgsR0FBQSxHQUFBQyxTQUFBLENBQUFySCxDQUFBO1lBR0RrRyxPQUFPLENBQUNDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBQWlCLEdBQU8sQ0FBQztZQUN2RDtZQUNBLEtBQUFGLGVBQUEsR0FBSUUsR0FBQSxDQUFNekIsUUFBUSxjQUFBdUIsZUFBQSxnQkFBQUEsZUFBQSxHQUFkQSxlQUFBLENBQWdCbEIsSUFBSSxjQUFBa0IsZUFBQSxlQUFwQkEsZUFBQSxDQUFzQnBDLE1BQU0sRUFBRTtjQUM5QkMsU0FBUyxDQUFDcUMsR0FBQSxDQUFNekIsUUFBUSxDQUFDSyxJQUFJLENBQUNsQixNQUFNLENBQUM7Y0FDckNoQixTQUFTLENBQUMsT0FBTyxFQUFFLHVDQUF1QyxDQUFDO1lBQy9ELENBQUMsTUFDSTtjQUNEQSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUFxRCxnQkFBQSxHQUFBQyxHQUFBLENBQU16QixRQUFRLGNBQUF3QixnQkFBQSxnQkFBQUEsZ0JBQUEsR0FBZEEsZ0JBQUEsQ0FBZ0JuQixJQUFJLGNBQUFtQixnQkFBQSx1QkFBcEJBLGdCQUFBLENBQXNCSyxPQUFPLEtBQUksZ0NBQWdDLENBQUM7WUFDekY7VUFBQztZQUFBSCxTQUFBLENBQUF4SCxDQUFBO1lBR0QwRixlQUFlLENBQUMsS0FBSyxDQUFDO1lBQUMsT0FBQThCLFNBQUEsQ0FBQXpILENBQUE7VUFBQTtZQUFBLE9BQUF5SCxTQUFBLENBQUFwSCxDQUFBO1FBQUE7TUFBQSxHQUFBZ0gsUUFBQTtJQUFBLENBRTlCO0lBQUEsZ0JBM0JLRixZQUFZQSxDQUFBVSxFQUFBO01BQUEsT0FBQVQsS0FBQSxDQUFBakYsS0FBQSxPQUFBRCxTQUFBO0lBQUE7RUFBQSxHQTJCakI7RUFDRCxJQUFJb0QsU0FBUyxFQUFFO0lBQ1gsT0FBUS9CLHNEQUFJLENBQUMsS0FBSyxFQUFFO01BQUV1RSxTQUFTLEVBQUUsd0NBQXdDO01BQUVDLFFBQVEsRUFBRXhFLHNEQUFJLENBQUMsS0FBSyxFQUFFO1FBQUV1RSxTQUFTLEVBQUUsZUFBZTtRQUFFQyxRQUFRLEVBQUU7TUFBNkIsQ0FBQztJQUFFLENBQUMsQ0FBQztFQUMvSztFQUNBLE9BQVF0RSx1REFBSyxDQUFDLE1BQU0sRUFBRTtJQUFFdUUsUUFBUSxFQUFFYixZQUFZO0lBQUVXLFNBQVMsRUFBRSxXQUFXO0lBQUVDLFFBQVEsRUFBRSxDQUFDdEUsdURBQUssQ0FBQyxLQUFLLEVBQUU7TUFBRXNFLFFBQVEsRUFBRSxDQUFDdEUsdURBQUssQ0FBQyxPQUFPLEVBQUU7UUFBRXdFLE9BQU8sRUFBRSxhQUFhO1FBQUVILFNBQVMsRUFBRSw4Q0FBOEM7UUFBRUMsUUFBUSxFQUFFLENBQUMsY0FBYyxFQUFFeEUsc0RBQUksQ0FBQyxNQUFNLEVBQUU7VUFBRXVFLFNBQVMsRUFBRSxjQUFjO1VBQUVDLFFBQVEsRUFBRTtRQUFJLENBQUMsQ0FBQztNQUFFLENBQUMsQ0FBQyxFQUFFeEUsc0RBQUksQ0FBQ00sNENBQUssRUFBRTtRQUFFcUUsRUFBRSxFQUFFLGFBQWE7UUFBRW5GLElBQUksRUFBRSxhQUFhO1FBQUVvRixJQUFJLEVBQUUsTUFBTTtRQUFFdEgsS0FBSyxFQUFFaUUsUUFBUSxDQUFDVixXQUFXO1FBQUVnRSxRQUFRLEVBQUV4QixZQUFZO1FBQUVrQixTQUFTLEVBQUU1QyxNQUFNLENBQUNkLFdBQVcsR0FBRyxnQkFBZ0IsR0FBRyxFQUFFO1FBQUVpRSxRQUFRLEVBQUUzQyxZQUFZO1FBQUU0QyxXQUFXLEVBQUU7TUFBa0MsQ0FBQyxDQUFDLEVBQUVwRCxNQUFNLENBQUNkLFdBQVcsSUFBS2Isc0RBQUksQ0FBQyxHQUFHLEVBQUU7UUFBRXVFLFNBQVMsRUFBRSwyQkFBMkI7UUFBRUMsUUFBUSxFQUFFN0MsTUFBTSxDQUFDZDtNQUFZLENBQUMsQ0FBRTtJQUFFLENBQUMsQ0FBQyxFQUFFWCx1REFBSyxDQUFDLEtBQUssRUFBRTtNQUFFc0UsUUFBUSxFQUFFLENBQUN0RSx1REFBSyxDQUFDLE9BQU8sRUFBRTtRQUFFd0UsT0FBTyxFQUFFLFNBQVM7UUFBRUgsU0FBUyxFQUFFLDhDQUE4QztRQUFFQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUV4RSxzREFBSSxDQUFDLE1BQU0sRUFBRTtVQUFFdUUsU0FBUyxFQUFFLGNBQWM7VUFBRUMsUUFBUSxFQUFFO1FBQUksQ0FBQyxDQUFDO01BQUUsQ0FBQyxDQUFDLEVBQUV4RSxzREFBSSxDQUFDTSw0Q0FBSyxFQUFFO1FBQUVxRSxFQUFFLEVBQUUsU0FBUztRQUFFbkYsSUFBSSxFQUFFLFNBQVM7UUFBRW9GLElBQUksRUFBRSxNQUFNO1FBQUV0SCxLQUFLLEVBQUVpRSxRQUFRLENBQUNULE9BQU87UUFBRStELFFBQVEsRUFBRXhCLFlBQVk7UUFBRWtCLFNBQVMsRUFBRTVDLE1BQU0sQ0FBQ2IsT0FBTyxHQUFHLGdCQUFnQixHQUFHLEVBQUU7UUFBRWdFLFFBQVEsRUFBRTNDLFlBQVk7UUFBRTRDLFdBQVcsRUFBRTtNQUFrQixDQUFDLENBQUMsRUFBRXBELE1BQU0sQ0FBQ2IsT0FBTyxJQUFLZCxzREFBSSxDQUFDLEdBQUcsRUFBRTtRQUFFdUUsU0FBUyxFQUFFLDJCQUEyQjtRQUFFQyxRQUFRLEVBQUU3QyxNQUFNLENBQUNiO01BQVEsQ0FBQyxDQUFFO0lBQUUsQ0FBQyxDQUFDLEVBQUVaLHVEQUFLLENBQUMsS0FBSyxFQUFFO01BQUVxRSxTQUFTLEVBQUUsdUNBQXVDO01BQUVDLFFBQVEsRUFBRSxDQUFDdEUsdURBQUssQ0FBQyxLQUFLLEVBQUU7UUFBRXNFLFFBQVEsRUFBRSxDQUFDdEUsdURBQUssQ0FBQyxPQUFPLEVBQUU7VUFBRXdFLE9BQU8sRUFBRSxNQUFNO1VBQUVILFNBQVMsRUFBRSw4Q0FBOEM7VUFBRUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFeEUsc0RBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRXVFLFNBQVMsRUFBRSxjQUFjO1lBQUVDLFFBQVEsRUFBRTtVQUFJLENBQUMsQ0FBQztRQUFFLENBQUMsQ0FBQyxFQUFFeEUsc0RBQUksQ0FBQ00sNENBQUssRUFBRTtVQUFFcUUsRUFBRSxFQUFFLE1BQU07VUFBRW5GLElBQUksRUFBRSxNQUFNO1VBQUVvRixJQUFJLEVBQUUsTUFBTTtVQUFFdEgsS0FBSyxFQUFFaUUsUUFBUSxDQUFDUixJQUFJO1VBQUU4RCxRQUFRLEVBQUV4QixZQUFZO1VBQUVrQixTQUFTLEVBQUU1QyxNQUFNLENBQUNaLElBQUksR0FBRyxnQkFBZ0IsR0FBRyxFQUFFO1VBQUUrRCxRQUFRLEVBQUUzQyxZQUFZO1VBQUU0QyxXQUFXLEVBQUU7UUFBWSxDQUFDLENBQUMsRUFBRXBELE1BQU0sQ0FBQ1osSUFBSSxJQUFLZixzREFBSSxDQUFDLEdBQUcsRUFBRTtVQUFFdUUsU0FBUyxFQUFFLDJCQUEyQjtVQUFFQyxRQUFRLEVBQUU3QyxNQUFNLENBQUNaO1FBQUssQ0FBQyxDQUFFO01BQUUsQ0FBQyxDQUFDLEVBQUViLHVEQUFLLENBQUMsS0FBSyxFQUFFO1FBQUVzRSxRQUFRLEVBQUUsQ0FBQ3RFLHVEQUFLLENBQUMsT0FBTyxFQUFFO1VBQUV3RSxPQUFPLEVBQUUsT0FBTztVQUFFSCxTQUFTLEVBQUUsOENBQThDO1VBQUVDLFFBQVEsRUFBRSxDQUFDLGlCQUFpQixFQUFFeEUsc0RBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRXVFLFNBQVMsRUFBRSxjQUFjO1lBQUVDLFFBQVEsRUFBRTtVQUFJLENBQUMsQ0FBQztRQUFFLENBQUMsQ0FBQyxFQUFFeEUsc0RBQUksQ0FBQ00sNENBQUssRUFBRTtVQUFFcUUsRUFBRSxFQUFFLE9BQU87VUFBRW5GLElBQUksRUFBRSxPQUFPO1VBQUVvRixJQUFJLEVBQUUsTUFBTTtVQUFFdEgsS0FBSyxFQUFFaUUsUUFBUSxDQUFDUCxLQUFLO1VBQUU2RCxRQUFRLEVBQUV4QixZQUFZO1VBQUVrQixTQUFTLEVBQUU1QyxNQUFNLENBQUNYLEtBQUssR0FBRyxnQkFBZ0IsR0FBRyxFQUFFO1VBQUU4RCxRQUFRLEVBQUUzQyxZQUFZO1VBQUU0QyxXQUFXLEVBQUU7UUFBa0IsQ0FBQyxDQUFDLEVBQUVwRCxNQUFNLENBQUNYLEtBQUssSUFBS2hCLHNEQUFJLENBQUMsR0FBRyxFQUFFO1VBQUV1RSxTQUFTLEVBQUUsMkJBQTJCO1VBQUVDLFFBQVEsRUFBRTdDLE1BQU0sQ0FBQ1g7UUFBTSxDQUFDLENBQUU7TUFBRSxDQUFDLENBQUMsRUFBRWQsdURBQUssQ0FBQyxLQUFLLEVBQUU7UUFBRXNFLFFBQVEsRUFBRSxDQUFDdEUsdURBQUssQ0FBQyxPQUFPLEVBQUU7VUFBRXdFLE9BQU8sRUFBRSxVQUFVO1VBQUVILFNBQVMsRUFBRSw4Q0FBOEM7VUFBRUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFeEUsc0RBQUksQ0FBQyxNQUFNLEVBQUU7WUFBRXVFLFNBQVMsRUFBRSxjQUFjO1lBQUVDLFFBQVEsRUFBRTtVQUFJLENBQUMsQ0FBQztRQUFFLENBQUMsQ0FBQyxFQUFFeEUsc0RBQUksQ0FBQ00sNENBQUssRUFBRTtVQUFFcUUsRUFBRSxFQUFFLFVBQVU7VUFBRW5GLElBQUksRUFBRSxVQUFVO1VBQUVvRixJQUFJLEVBQUUsTUFBTTtVQUFFdEgsS0FBSyxFQUFFaUUsUUFBUSxDQUFDTixRQUFRO1VBQUU0RCxRQUFRLEVBQUV4QixZQUFZO1VBQUVrQixTQUFTLEVBQUU1QyxNQUFNLENBQUNWLFFBQVEsR0FBRyxnQkFBZ0IsR0FBRyxFQUFFO1VBQUU2RCxRQUFRLEVBQUUzQyxZQUFZO1VBQUU0QyxXQUFXLEVBQUU7UUFBTyxDQUFDLENBQUMsRUFBRXBELE1BQU0sQ0FBQ1YsUUFBUSxJQUFLakIsc0RBQUksQ0FBQyxHQUFHLEVBQUU7VUFBRXVFLFNBQVMsRUFBRSwyQkFBMkI7VUFBRUMsUUFBUSxFQUFFN0MsTUFBTSxDQUFDVjtRQUFTLENBQUMsQ0FBRTtNQUFFLENBQUMsQ0FBQztJQUFFLENBQUMsQ0FBQyxFQUFFZix1REFBSyxDQUFDLEtBQUssRUFBRTtNQUFFcUUsU0FBUyxFQUFFLHVDQUF1QztNQUFFQyxRQUFRLEVBQUUsQ0FBQ3RFLHVEQUFLLENBQUMsS0FBSyxFQUFFO1FBQUVzRSxRQUFRLEVBQUUsQ0FBQ3RFLHVEQUFLLENBQUMsT0FBTyxFQUFFO1VBQUV3RSxPQUFPLEVBQUUsT0FBTztVQUFFSCxTQUFTLEVBQUUsOENBQThDO1VBQUVDLFFBQVEsRUFBRSxDQUFDLGVBQWUsRUFBRXhFLHNEQUFJLENBQUMsTUFBTSxFQUFFO1lBQUV1RSxTQUFTLEVBQUUsY0FBYztZQUFFQyxRQUFRLEVBQUU7VUFBSSxDQUFDLENBQUM7UUFBRSxDQUFDLENBQUMsRUFBRXhFLHNEQUFJLENBQUNNLDRDQUFLLEVBQUU7VUFBRXFFLEVBQUUsRUFBRSxPQUFPO1VBQUVuRixJQUFJLEVBQUUsT0FBTztVQUFFb0YsSUFBSSxFQUFFLEtBQUs7VUFBRXRILEtBQUssRUFBRWlFLFFBQVEsQ0FBQ0wsS0FBSztVQUFFMkQsUUFBUSxFQUFFeEIsWUFBWTtVQUFFa0IsU0FBUyxFQUFFNUMsTUFBTSxDQUFDVCxLQUFLLEdBQUcsZ0JBQWdCLEdBQUcsRUFBRTtVQUFFNEQsUUFBUSxFQUFFM0MsWUFBWTtVQUFFNEMsV0FBVyxFQUFFO1FBQW1CLENBQUMsQ0FBQyxFQUFFcEQsTUFBTSxDQUFDVCxLQUFLLElBQUtsQixzREFBSSxDQUFDLEdBQUcsRUFBRTtVQUFFdUUsU0FBUyxFQUFFLDJCQUEyQjtVQUFFQyxRQUFRLEVBQUU3QyxNQUFNLENBQUNUO1FBQU0sQ0FBQyxDQUFFO01BQUUsQ0FBQyxDQUFDLEVBQUVoQix1REFBSyxDQUFDLEtBQUssRUFBRTtRQUFFc0UsUUFBUSxFQUFFLENBQUN0RSx1REFBSyxDQUFDLE9BQU8sRUFBRTtVQUFFd0UsT0FBTyxFQUFFLE9BQU87VUFBRUgsU0FBUyxFQUFFLDhDQUE4QztVQUFFQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUV4RSxzREFBSSxDQUFDLE1BQU0sRUFBRTtZQUFFdUUsU0FBUyxFQUFFLGNBQWM7WUFBRUMsUUFBUSxFQUFFO1VBQUksQ0FBQyxDQUFDO1FBQUUsQ0FBQyxDQUFDLEVBQUV4RSxzREFBSSxDQUFDTSw0Q0FBSyxFQUFFO1VBQUVxRSxFQUFFLEVBQUUsT0FBTztVQUFFbkYsSUFBSSxFQUFFLE9BQU87VUFBRW9GLElBQUksRUFBRSxPQUFPO1VBQUV0SCxLQUFLLEVBQUVpRSxRQUFRLENBQUNKLEtBQUs7VUFBRTBELFFBQVEsRUFBRXhCLFlBQVk7VUFBRWtCLFNBQVMsRUFBRTVDLE1BQU0sQ0FBQ1IsS0FBSyxHQUFHLGdCQUFnQixHQUFHLEVBQUU7VUFBRTJELFFBQVEsRUFBRTNDLFlBQVk7VUFBRTRDLFdBQVcsRUFBRTtRQUFrQyxDQUFDLENBQUMsRUFBRXBELE1BQU0sQ0FBQ1IsS0FBSyxJQUFLbkIsc0RBQUksQ0FBQyxHQUFHLEVBQUU7VUFBRXVFLFNBQVMsRUFBRSwyQkFBMkI7VUFBRUMsUUFBUSxFQUFFN0MsTUFBTSxDQUFDUjtRQUFNLENBQUMsQ0FBRTtNQUFFLENBQUMsQ0FBQztJQUFFLENBQUMsQ0FBQyxFQUFFakIsdURBQUssQ0FBQyxLQUFLLEVBQUU7TUFBRXNFLFFBQVEsRUFBRSxDQUFDeEUsc0RBQUksQ0FBQyxPQUFPLEVBQUU7UUFBRTBFLE9BQU8sRUFBRSxTQUFTO1FBQUVILFNBQVMsRUFBRSw4Q0FBOEM7UUFBRUMsUUFBUSxFQUFFO01BQVUsQ0FBQyxDQUFDLEVBQUV4RSxzREFBSSxDQUFDTSw0Q0FBSyxFQUFFO1FBQUVxRSxFQUFFLEVBQUUsU0FBUztRQUFFbkYsSUFBSSxFQUFFLFNBQVM7UUFBRW9GLElBQUksRUFBRSxLQUFLO1FBQUV0SCxLQUFLLEVBQUVpRSxRQUFRLENBQUNILE9BQU87UUFBRXlELFFBQVEsRUFBRXhCLFlBQVk7UUFBRWtCLFNBQVMsRUFBRTVDLE1BQU0sQ0FBQ1AsT0FBTyxHQUFHLGdCQUFnQixHQUFHLEVBQUU7UUFBRTBELFFBQVEsRUFBRTNDLFlBQVk7UUFBRTRDLFdBQVcsRUFBRTtNQUF5QyxDQUFDLENBQUMsRUFBRXBELE1BQU0sQ0FBQ1AsT0FBTyxJQUFLcEIsc0RBQUksQ0FBQyxHQUFHLEVBQUU7UUFBRXVFLFNBQVMsRUFBRSwyQkFBMkI7UUFBRUMsUUFBUSxFQUFFN0MsTUFBTSxDQUFDUDtNQUFRLENBQUMsQ0FBRTtJQUFFLENBQUMsQ0FBQyxFQUFFbEIsdURBQUssQ0FBQyxLQUFLLEVBQUU7TUFBRXNFLFFBQVEsRUFBRSxDQUFDdEUsdURBQUssQ0FBQyxPQUFPLEVBQUU7UUFBRXdFLE9BQU8sRUFBRSxlQUFlO1FBQUVILFNBQVMsRUFBRSw4Q0FBOEM7UUFBRUMsUUFBUSxFQUFFLENBQUMsZ0JBQWdCLEVBQUV4RSxzREFBSSxDQUFDLE1BQU0sRUFBRTtVQUFFdUUsU0FBUyxFQUFFLGNBQWM7VUFBRUMsUUFBUSxFQUFFO1FBQUksQ0FBQyxDQUFDO01BQUUsQ0FBQyxDQUFDLEVBQUV4RSxzREFBSSxDQUFDLFVBQVUsRUFBRTtRQUFFMkUsRUFBRSxFQUFFLGVBQWU7UUFBRW5GLElBQUksRUFBRSxlQUFlO1FBQUVsQyxLQUFLLEVBQUVpRSxRQUFRLENBQUNGLGFBQWE7UUFBRXdELFFBQVEsRUFBRXhCLFlBQVk7UUFBRWtCLFNBQVMsMlNBQUFTLE1BQUEsQ0FBMlNyRCxNQUFNLENBQUNOLGFBQWEsR0FBRyxnQkFBZ0IsR0FBRyxFQUFFLENBQUU7UUFBRXlELFFBQVEsRUFBRTNDLFlBQVk7UUFBRTRDLFdBQVcsRUFBRSw2RUFBNkU7UUFBRUUsSUFBSSxFQUFFO01BQUUsQ0FBQyxDQUFDLEVBQUV0RCxNQUFNLENBQUNOLGFBQWEsSUFBS3JCLHNEQUFJLENBQUMsR0FBRyxFQUFFO1FBQUV1RSxTQUFTLEVBQUUsMkJBQTJCO1FBQUVDLFFBQVEsRUFBRTdDLE1BQU0sQ0FBQ047TUFBYyxDQUFDLENBQUUsRUFBRXJCLHNEQUFJLENBQUMsR0FBRyxFQUFFO1FBQUV1RSxTQUFTLEVBQUUsNEJBQTRCO1FBQUVDLFFBQVEsRUFBRTtNQUFvQyxDQUFDLENBQUM7SUFBRSxDQUFDLENBQUMsRUFBRXhFLHNEQUFJLENBQUMsS0FBSyxFQUFFO01BQUV1RSxTQUFTLEVBQUUsZ0RBQWdEO01BQUVDLFFBQVEsRUFBRXhFLHNEQUFJLENBQUNLLDhDQUFNLEVBQUU7UUFBRXVFLElBQUksRUFBRSxRQUFRO1FBQUVFLFFBQVEsRUFBRTNDLFlBQVk7UUFBRXFDLFFBQVEsRUFBRXJDLFlBQVksR0FBRyxXQUFXLEdBQUc7TUFBZSxDQUFDO0lBQUUsQ0FBQyxDQUFDO0VBQUUsQ0FBQyxDQUFDO0FBQ3ZsTCxDQUFDO0FBQ0QsaUVBQWUxQixpQkFBaUIsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJDL0toQyx1S0FBQWhGLENBQUEsRUFBQUMsQ0FBQSxFQUFBQyxDQUFBLHdCQUFBQyxNQUFBLEdBQUFBLE1BQUEsT0FBQUMsQ0FBQSxHQUFBRixDQUFBLENBQUFHLFFBQUEsa0JBQUFDLENBQUEsR0FBQUosQ0FBQSxDQUFBSyxXQUFBLDhCQUFBQyxFQUFBTixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLFFBQUFDLENBQUEsR0FBQUwsQ0FBQSxJQUFBQSxDQUFBLENBQUFNLFNBQUEsWUFBQUMsU0FBQSxHQUFBUCxDQUFBLEdBQUFPLFNBQUEsRUFBQUMsQ0FBQSxHQUFBQyxNQUFBLENBQUFDLE1BQUEsQ0FBQUwsQ0FBQSxDQUFBQyxTQUFBLFVBQUFLLG1CQUFBLENBQUFILENBQUEsdUJBQUFWLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLFFBQUFFLENBQUEsRUFBQUMsQ0FBQSxFQUFBRyxDQUFBLEVBQUFJLENBQUEsTUFBQUMsQ0FBQSxHQUFBWCxDQUFBLFFBQUFZLENBQUEsT0FBQUMsQ0FBQSxLQUFBRixDQUFBLEtBQUFiLENBQUEsS0FBQWdCLENBQUEsRUFBQXBCLENBQUEsRUFBQXFCLENBQUEsRUFBQUMsQ0FBQSxFQUFBTixDQUFBLEVBQUFNLENBQUEsQ0FBQUMsSUFBQSxDQUFBdkIsQ0FBQSxNQUFBc0IsQ0FBQSxXQUFBQSxFQUFBckIsQ0FBQSxFQUFBQyxDQUFBLFdBQUFNLENBQUEsR0FBQVAsQ0FBQSxFQUFBUSxDQUFBLE1BQUFHLENBQUEsR0FBQVosQ0FBQSxFQUFBbUIsQ0FBQSxDQUFBZixDQUFBLEdBQUFGLENBQUEsRUFBQW1CLENBQUEsZ0JBQUFDLEVBQUFwQixDQUFBLEVBQUFFLENBQUEsU0FBQUssQ0FBQSxHQUFBUCxDQUFBLEVBQUFVLENBQUEsR0FBQVIsQ0FBQSxFQUFBSCxDQUFBLE9BQUFpQixDQUFBLElBQUFGLENBQUEsS0FBQVYsQ0FBQSxJQUFBTCxDQUFBLEdBQUFnQixDQUFBLENBQUFPLE1BQUEsRUFBQXZCLENBQUEsVUFBQUssQ0FBQSxFQUFBRSxDQUFBLEdBQUFTLENBQUEsQ0FBQWhCLENBQUEsR0FBQXFCLENBQUEsR0FBQUgsQ0FBQSxDQUFBRixDQUFBLEVBQUFRLENBQUEsR0FBQWpCLENBQUEsS0FBQU4sQ0FBQSxRQUFBSSxDQUFBLEdBQUFtQixDQUFBLEtBQUFyQixDQUFBLE1BQUFRLENBQUEsR0FBQUosQ0FBQSxFQUFBQyxDQUFBLEdBQUFELENBQUEsWUFBQUMsQ0FBQSxXQUFBRCxDQUFBLE1BQUFBLENBQUEsTUFBQVIsQ0FBQSxJQUFBUSxDQUFBLE9BQUFjLENBQUEsTUFBQWhCLENBQUEsR0FBQUosQ0FBQSxRQUFBb0IsQ0FBQSxHQUFBZCxDQUFBLFFBQUFDLENBQUEsTUFBQVUsQ0FBQSxDQUFBQyxDQUFBLEdBQUFoQixDQUFBLEVBQUFlLENBQUEsQ0FBQWYsQ0FBQSxHQUFBSSxDQUFBLE9BQUFjLENBQUEsR0FBQUcsQ0FBQSxLQUFBbkIsQ0FBQSxHQUFBSixDQUFBLFFBQUFNLENBQUEsTUFBQUosQ0FBQSxJQUFBQSxDQUFBLEdBQUFxQixDQUFBLE1BQUFqQixDQUFBLE1BQUFOLENBQUEsRUFBQU0sQ0FBQSxNQUFBSixDQUFBLEVBQUFlLENBQUEsQ0FBQWYsQ0FBQSxHQUFBcUIsQ0FBQSxFQUFBaEIsQ0FBQSxjQUFBSCxDQUFBLElBQUFKLENBQUEsYUFBQW1CLENBQUEsUUFBQUgsQ0FBQSxPQUFBZCxDQUFBLHFCQUFBRSxDQUFBLEVBQUFXLENBQUEsRUFBQVEsQ0FBQSxRQUFBVCxDQUFBLFlBQUFVLFNBQUEsdUNBQUFSLENBQUEsVUFBQUQsQ0FBQSxJQUFBSyxDQUFBLENBQUFMLENBQUEsRUFBQVEsQ0FBQSxHQUFBaEIsQ0FBQSxHQUFBUSxDQUFBLEVBQUFMLENBQUEsR0FBQWEsQ0FBQSxHQUFBeEIsQ0FBQSxHQUFBUSxDQUFBLE9BQUFULENBQUEsR0FBQVksQ0FBQSxNQUFBTSxDQUFBLEtBQUFWLENBQUEsS0FBQUMsQ0FBQSxHQUFBQSxDQUFBLFFBQUFBLENBQUEsU0FBQVUsQ0FBQSxDQUFBZixDQUFBLFFBQUFrQixDQUFBLENBQUFiLENBQUEsRUFBQUcsQ0FBQSxLQUFBTyxDQUFBLENBQUFmLENBQUEsR0FBQVEsQ0FBQSxHQUFBTyxDQUFBLENBQUFDLENBQUEsR0FBQVIsQ0FBQSxhQUFBSSxDQUFBLE1BQUFSLENBQUEsUUFBQUMsQ0FBQSxLQUFBSCxDQUFBLFlBQUFMLENBQUEsR0FBQU8sQ0FBQSxDQUFBRixDQUFBLFdBQUFMLENBQUEsR0FBQUEsQ0FBQSxDQUFBMEIsSUFBQSxDQUFBbkIsQ0FBQSxFQUFBSSxDQUFBLFVBQUFjLFNBQUEsMkNBQUF6QixDQUFBLENBQUEyQixJQUFBLFNBQUEzQixDQUFBLEVBQUFXLENBQUEsR0FBQVgsQ0FBQSxDQUFBNEIsS0FBQSxFQUFBcEIsQ0FBQSxTQUFBQSxDQUFBLG9CQUFBQSxDQUFBLEtBQUFSLENBQUEsR0FBQU8sQ0FBQSxlQUFBUCxDQUFBLENBQUEwQixJQUFBLENBQUFuQixDQUFBLEdBQUFDLENBQUEsU0FBQUcsQ0FBQSxHQUFBYyxTQUFBLHVDQUFBcEIsQ0FBQSxnQkFBQUcsQ0FBQSxPQUFBRCxDQUFBLEdBQUFSLENBQUEsY0FBQUMsQ0FBQSxJQUFBaUIsQ0FBQSxHQUFBQyxDQUFBLENBQUFmLENBQUEsUUFBQVEsQ0FBQSxHQUFBVixDQUFBLENBQUF5QixJQUFBLENBQUF2QixDQUFBLEVBQUFlLENBQUEsT0FBQUUsQ0FBQSxrQkFBQXBCLENBQUEsSUFBQU8sQ0FBQSxHQUFBUixDQUFBLEVBQUFTLENBQUEsTUFBQUcsQ0FBQSxHQUFBWCxDQUFBLGNBQUFlLENBQUEsbUJBQUFhLEtBQUEsRUFBQTVCLENBQUEsRUFBQTJCLElBQUEsRUFBQVYsQ0FBQSxTQUFBaEIsQ0FBQSxFQUFBSSxDQUFBLEVBQUFFLENBQUEsUUFBQUksQ0FBQSxRQUFBUyxDQUFBLGdCQUFBVixVQUFBLGNBQUFtQixrQkFBQSxjQUFBQywyQkFBQSxLQUFBOUIsQ0FBQSxHQUFBWSxNQUFBLENBQUFtQixjQUFBLE1BQUF2QixDQUFBLE1BQUFMLENBQUEsSUFBQUgsQ0FBQSxDQUFBQSxDQUFBLElBQUFHLENBQUEsU0FBQVcsbUJBQUEsQ0FBQWQsQ0FBQSxPQUFBRyxDQUFBLGlDQUFBSCxDQUFBLEdBQUFXLENBQUEsR0FBQW1CLDBCQUFBLENBQUFyQixTQUFBLEdBQUFDLFNBQUEsQ0FBQUQsU0FBQSxHQUFBRyxNQUFBLENBQUFDLE1BQUEsQ0FBQUwsQ0FBQSxZQUFBTyxFQUFBaEIsQ0FBQSxXQUFBYSxNQUFBLENBQUFvQixjQUFBLEdBQUFwQixNQUFBLENBQUFvQixjQUFBLENBQUFqQyxDQUFBLEVBQUErQiwwQkFBQSxLQUFBL0IsQ0FBQSxDQUFBa0MsU0FBQSxHQUFBSCwwQkFBQSxFQUFBaEIsbUJBQUEsQ0FBQWYsQ0FBQSxFQUFBTSxDQUFBLHlCQUFBTixDQUFBLENBQUFVLFNBQUEsR0FBQUcsTUFBQSxDQUFBQyxNQUFBLENBQUFGLENBQUEsR0FBQVosQ0FBQSxXQUFBOEIsaUJBQUEsQ0FBQXBCLFNBQUEsR0FBQXFCLDBCQUFBLEVBQUFoQixtQkFBQSxDQUFBSCxDQUFBLGlCQUFBbUIsMEJBQUEsR0FBQWhCLG1CQUFBLENBQUFnQiwwQkFBQSxpQkFBQUQsaUJBQUEsR0FBQUEsaUJBQUEsQ0FBQUssV0FBQSx3QkFBQXBCLG1CQUFBLENBQUFnQiwwQkFBQSxFQUFBekIsQ0FBQSx3QkFBQVMsbUJBQUEsQ0FBQUgsQ0FBQSxHQUFBRyxtQkFBQSxDQUFBSCxDQUFBLEVBQUFOLENBQUEsZ0JBQUFTLG1CQUFBLENBQUFILENBQUEsRUFBQVIsQ0FBQSxpQ0FBQVcsbUJBQUEsQ0FBQUgsQ0FBQSw4REFBQXdCLFlBQUEsWUFBQUEsYUFBQSxhQUFBQyxDQUFBLEVBQUE3QixDQUFBLEVBQUE4QixDQUFBLEVBQUF0QixDQUFBO0FBQUEsU0FBQUQsb0JBQUFmLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFILENBQUEsUUFBQU8sQ0FBQSxHQUFBSyxNQUFBLENBQUEwQixjQUFBLFFBQUEvQixDQUFBLHVCQUFBUixDQUFBLElBQUFRLENBQUEsUUFBQU8sbUJBQUEsWUFBQXlCLG1CQUFBeEMsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUgsQ0FBQSxhQUFBSyxFQUFBSixDQUFBLEVBQUFFLENBQUEsSUFBQVcsbUJBQUEsQ0FBQWYsQ0FBQSxFQUFBRSxDQUFBLFlBQUFGLENBQUEsZ0JBQUF5QyxPQUFBLENBQUF2QyxDQUFBLEVBQUFFLENBQUEsRUFBQUosQ0FBQSxTQUFBRSxDQUFBLEdBQUFNLENBQUEsR0FBQUEsQ0FBQSxDQUFBUixDQUFBLEVBQUFFLENBQUEsSUFBQTJCLEtBQUEsRUFBQXpCLENBQUEsRUFBQXNDLFVBQUEsR0FBQXpDLENBQUEsRUFBQTBDLFlBQUEsR0FBQTFDLENBQUEsRUFBQTJDLFFBQUEsR0FBQTNDLENBQUEsTUFBQUQsQ0FBQSxDQUFBRSxDQUFBLElBQUFFLENBQUEsSUFBQUUsQ0FBQSxhQUFBQSxDQUFBLGNBQUFBLENBQUEsbUJBQUFTLG1CQUFBLENBQUFmLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFILENBQUE7QUFBQSxTQUFBNEMsbUJBQUF6QyxDQUFBLEVBQUFILENBQUEsRUFBQUQsQ0FBQSxFQUFBRSxDQUFBLEVBQUFJLENBQUEsRUFBQWUsQ0FBQSxFQUFBWixDQUFBLGNBQUFELENBQUEsR0FBQUosQ0FBQSxDQUFBaUIsQ0FBQSxFQUFBWixDQUFBLEdBQUFHLENBQUEsR0FBQUosQ0FBQSxDQUFBcUIsS0FBQSxXQUFBekIsQ0FBQSxnQkFBQUosQ0FBQSxDQUFBSSxDQUFBLEtBQUFJLENBQUEsQ0FBQW9CLElBQUEsR0FBQTNCLENBQUEsQ0FBQVcsQ0FBQSxJQUFBa0MsT0FBQSxDQUFBQyxPQUFBLENBQUFuQyxDQUFBLEVBQUFvQyxJQUFBLENBQUE5QyxDQUFBLEVBQUFJLENBQUE7QUFBQSxTQUFBMkMsa0JBQUE3QyxDQUFBLDZCQUFBSCxDQUFBLFNBQUFELENBQUEsR0FBQWtELFNBQUEsYUFBQUosT0FBQSxXQUFBNUMsQ0FBQSxFQUFBSSxDQUFBLFFBQUFlLENBQUEsR0FBQWpCLENBQUEsQ0FBQStDLEtBQUEsQ0FBQWxELENBQUEsRUFBQUQsQ0FBQSxZQUFBb0QsTUFBQWhELENBQUEsSUFBQXlDLGtCQUFBLENBQUF4QixDQUFBLEVBQUFuQixDQUFBLEVBQUFJLENBQUEsRUFBQThDLEtBQUEsRUFBQUMsTUFBQSxVQUFBakQsQ0FBQSxjQUFBaUQsT0FBQWpELENBQUEsSUFBQXlDLGtCQUFBLENBQUF4QixDQUFBLEVBQUFuQixDQUFBLEVBQUFJLENBQUEsRUFBQThDLEtBQUEsRUFBQUMsTUFBQSxXQUFBakQsQ0FBQSxLQUFBZ0QsS0FBQTtBQUFBLFNBQUFFLGVBQUFwRCxDQUFBLEVBQUFGLENBQUEsV0FBQXVELGVBQUEsQ0FBQXJELENBQUEsS0FBQXNELHFCQUFBLENBQUF0RCxDQUFBLEVBQUFGLENBQUEsS0FBQXlELDJCQUFBLENBQUF2RCxDQUFBLEVBQUFGLENBQUEsS0FBQTBELGdCQUFBO0FBQUEsU0FBQUEsaUJBQUEsY0FBQWhDLFNBQUE7QUFBQSxTQUFBK0IsNEJBQUF2RCxDQUFBLEVBQUFtQixDQUFBLFFBQUFuQixDQUFBLDJCQUFBQSxDQUFBLFNBQUF5RCxpQkFBQSxDQUFBekQsQ0FBQSxFQUFBbUIsQ0FBQSxPQUFBcEIsQ0FBQSxNQUFBMkQsUUFBQSxDQUFBakMsSUFBQSxDQUFBekIsQ0FBQSxFQUFBMkQsS0FBQSw2QkFBQTVELENBQUEsSUFBQUMsQ0FBQSxDQUFBNEQsV0FBQSxLQUFBN0QsQ0FBQSxHQUFBQyxDQUFBLENBQUE0RCxXQUFBLENBQUFDLElBQUEsYUFBQTlELENBQUEsY0FBQUEsQ0FBQSxHQUFBK0QsS0FBQSxDQUFBQyxJQUFBLENBQUEvRCxDQUFBLG9CQUFBRCxDQUFBLCtDQUFBaUUsSUFBQSxDQUFBakUsQ0FBQSxJQUFBMEQsaUJBQUEsQ0FBQXpELENBQUEsRUFBQW1CLENBQUE7QUFBQSxTQUFBc0Msa0JBQUF6RCxDQUFBLEVBQUFtQixDQUFBLGFBQUFBLENBQUEsSUFBQUEsQ0FBQSxHQUFBbkIsQ0FBQSxDQUFBc0IsTUFBQSxNQUFBSCxDQUFBLEdBQUFuQixDQUFBLENBQUFzQixNQUFBLFlBQUF4QixDQUFBLE1BQUFJLENBQUEsR0FBQTRELEtBQUEsQ0FBQTNDLENBQUEsR0FBQXJCLENBQUEsR0FBQXFCLENBQUEsRUFBQXJCLENBQUEsSUFBQUksQ0FBQSxDQUFBSixDQUFBLElBQUFFLENBQUEsQ0FBQUYsQ0FBQSxVQUFBSSxDQUFBO0FBQUEsU0FBQW9ELHNCQUFBdEQsQ0FBQSxFQUFBdUIsQ0FBQSxRQUFBeEIsQ0FBQSxXQUFBQyxDQUFBLGdDQUFBQyxNQUFBLElBQUFELENBQUEsQ0FBQUMsTUFBQSxDQUFBRSxRQUFBLEtBQUFILENBQUEsNEJBQUFELENBQUEsUUFBQUQsQ0FBQSxFQUFBSSxDQUFBLEVBQUFJLENBQUEsRUFBQUksQ0FBQSxFQUFBUyxDQUFBLE9BQUFMLENBQUEsT0FBQVYsQ0FBQSxpQkFBQUUsQ0FBQSxJQUFBUCxDQUFBLEdBQUFBLENBQUEsQ0FBQTBCLElBQUEsQ0FBQXpCLENBQUEsR0FBQWlFLElBQUEsUUFBQTFDLENBQUEsUUFBQVosTUFBQSxDQUFBWixDQUFBLE1BQUFBLENBQUEsVUFBQWUsQ0FBQSx1QkFBQUEsQ0FBQSxJQUFBaEIsQ0FBQSxHQUFBUSxDQUFBLENBQUFtQixJQUFBLENBQUExQixDQUFBLEdBQUEyQixJQUFBLE1BQUFQLENBQUEsQ0FBQStDLElBQUEsQ0FBQXBFLENBQUEsQ0FBQTZCLEtBQUEsR0FBQVIsQ0FBQSxDQUFBRyxNQUFBLEtBQUFDLENBQUEsR0FBQVQsQ0FBQSxpQkFBQWQsQ0FBQSxJQUFBSSxDQUFBLE9BQUFGLENBQUEsR0FBQUYsQ0FBQSx5QkFBQWMsQ0FBQSxZQUFBZixDQUFBLGVBQUFXLENBQUEsR0FBQVgsQ0FBQSxjQUFBWSxNQUFBLENBQUFELENBQUEsTUFBQUEsQ0FBQSwyQkFBQU4sQ0FBQSxRQUFBRixDQUFBLGFBQUFpQixDQUFBO0FBQUEsU0FBQWtDLGdCQUFBckQsQ0FBQSxRQUFBOEQsS0FBQSxDQUFBSyxPQUFBLENBQUFuRSxDQUFBLFVBQUFBLENBQUE7QUFEK0Q7QUFDbkI7QUFDTjtBQUNpQjtBQUN2QjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTXVKLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBbUJBLENBQUEsRUFBUztFQUM5QixJQUFBeEUsU0FBQSxHQUFzQkgsZ0VBQVEsQ0FBQyxDQUFDO0lBQXhCSSxTQUFTLEdBQUFELFNBQUEsQ0FBVEMsU0FBUztFQUNqQixJQUFBQyxTQUFBLEdBQXNDVCwrQ0FBUSxDQUFDO01BQzNDZ0YsbUJBQW1CLEVBQUUsSUFBSTtNQUN6QkMsaUJBQWlCLEVBQUUsS0FBSztNQUN4QkMsb0JBQW9CLEVBQUU7SUFDMUIsQ0FBQyxDQUFDO0lBQUEvRCxVQUFBLEdBQUF2QyxjQUFBLENBQUE2QixTQUFBO0lBSkswRSxXQUFXLEdBQUFoRSxVQUFBO0lBQUVpRSxjQUFjLEdBQUFqRSxVQUFBO0VBS2xDLElBQUFHLFVBQUEsR0FBa0N0QiwrQ0FBUSxDQUFDLElBQUksQ0FBQztJQUFBdUIsVUFBQSxHQUFBM0MsY0FBQSxDQUFBMEMsVUFBQTtJQUF6Q00sU0FBUyxHQUFBTCxVQUFBO0lBQUVNLFlBQVksR0FBQU4sVUFBQTtFQUM5QixJQUFBRyxVQUFBLEdBQXdDMUIsK0NBQVEsQ0FBQyxLQUFLLENBQUM7SUFBQTJCLFVBQUEsR0FBQS9DLGNBQUEsQ0FBQThDLFVBQUE7SUFBaERNLFlBQVksR0FBQUwsVUFBQTtJQUFFTSxlQUFlLEdBQUFOLFVBQUE7RUFDcEM7QUFDSjtBQUNBO0VBQ0kxQixnREFBUyxDQUFDLFlBQU07SUFDWm9GLDJCQUEyQixDQUFDLENBQUM7RUFDakMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztFQUNOO0FBQ0o7QUFDQTtFQUNJLElBQU1BLDJCQUEyQjtJQUFBLElBQUFsRCxJQUFBLEdBQUE1RCxpQkFBQSxjQUFBYixZQUFBLEdBQUFFLENBQUEsQ0FBRyxTQUFBd0UsUUFBQTtNQUFBLElBQUFDLFFBQUEsRUFBQUUsRUFBQTtNQUFBLE9BQUE3RSxZQUFBLEdBQUFDLENBQUEsV0FBQTZFLFFBQUE7UUFBQSxrQkFBQUEsUUFBQSxDQUFBakcsQ0FBQSxHQUFBaUcsUUFBQSxDQUFBOUcsQ0FBQTtVQUFBO1lBQUE4RyxRQUFBLENBQUFqRyxDQUFBO1lBRTVCc0YsWUFBWSxDQUFDLElBQUksQ0FBQztZQUFDVyxRQUFBLENBQUE5RyxDQUFBO1lBQUEsT0FDSTJFLGdEQUFHLENBQUNvQyxHQUFHLENBQUMseUJBQXlCLENBQUM7VUFBQTtZQUFuREosUUFBUSxHQUFBRyxRQUFBLENBQUE5RixDQUFBO1lBQ2QsSUFBSTJGLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDQyxPQUFPLElBQUlOLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDQSxJQUFJLEVBQUU7Y0FDN0MwQyxjQUFjLENBQUMvQyxRQUFRLENBQUNLLElBQUksQ0FBQ0EsSUFBSSxDQUFDO1lBQ3RDO1lBQUNGLFFBQUEsQ0FBQTlHLENBQUE7WUFBQTtVQUFBO1lBQUE4RyxRQUFBLENBQUFqRyxDQUFBO1lBQUFnRyxFQUFBLEdBQUFDLFFBQUEsQ0FBQTlGLENBQUE7WUFHRGtHLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLDBDQUEwQyxFQUFBTixFQUFPLENBQUM7WUFDaEUvQixTQUFTLENBQUMsT0FBTyxFQUFFLHlDQUF5QyxDQUFDO1VBQUM7WUFBQWdDLFFBQUEsQ0FBQWpHLENBQUE7WUFHOURzRixZQUFZLENBQUMsS0FBSyxDQUFDO1lBQUMsT0FBQVcsUUFBQSxDQUFBbEcsQ0FBQTtVQUFBO1lBQUEsT0FBQWtHLFFBQUEsQ0FBQTdGLENBQUE7UUFBQTtNQUFBLEdBQUF5RixPQUFBO0lBQUEsQ0FFM0I7SUFBQSxnQkFmS2lELDJCQUEyQkEsQ0FBQTtNQUFBLE9BQUFsRCxJQUFBLENBQUExRCxLQUFBLE9BQUFELFNBQUE7SUFBQTtFQUFBLEdBZWhDO0VBQ0Q7QUFDSjtBQUNBO0VBQ0ksSUFBTThHLFlBQVksR0FBRyxTQUFmQSxZQUFZQSxDQUFJQyxHQUFHLEVBQUs7SUFDMUJILGNBQWMsQ0FBQyxVQUFDL0IsSUFBSTtNQUFBLE9BQUFDLGFBQUEsQ0FBQUEsYUFBQSxLQUNiRCxJQUFJLE9BQUFFLGVBQUEsS0FDTmdDLEdBQUcsRUFBRyxDQUFDbEMsSUFBSSxDQUFDa0MsR0FBRyxDQUFDO0lBQUEsQ0FDbkIsQ0FBQztFQUNQLENBQUM7RUFDRDtBQUNKO0FBQ0E7RUFDSSxJQUFNOUIsWUFBWTtJQUFBLElBQUFDLEtBQUEsR0FBQW5GLGlCQUFBLGNBQUFiLFlBQUEsR0FBQUUsQ0FBQSxDQUFHLFNBQUErRixTQUFPckksQ0FBQztNQUFBLElBQUErRyxRQUFBLEVBQUF1QixlQUFBLEVBQUFFLEdBQUE7TUFBQSxPQUFBcEcsWUFBQSxHQUFBQyxDQUFBLFdBQUFvRyxTQUFBO1FBQUEsa0JBQUFBLFNBQUEsQ0FBQXhILENBQUEsR0FBQXdILFNBQUEsQ0FBQXJJLENBQUE7VUFBQTtZQUN6QkosQ0FBQyxDQUFDMEksY0FBYyxDQUFDLENBQUM7WUFDbEIvQixlQUFlLENBQUMsSUFBSSxDQUFDO1lBQUM4QixTQUFBLENBQUF4SCxDQUFBO1lBQUF3SCxTQUFBLENBQUFySSxDQUFBO1lBQUEsT0FFSzJFLGdEQUFHLENBQUM0RCxHQUFHLENBQUMseUJBQXlCLEVBQUVrQixXQUFXLENBQUM7VUFBQTtZQUFoRTlDLFFBQVEsR0FBQTBCLFNBQUEsQ0FBQXJILENBQUE7WUFDZCxJQUFJMkYsUUFBUSxDQUFDSyxJQUFJLENBQUNDLE9BQU8sRUFBRTtjQUN2Qm5DLFNBQVMsQ0FBQyxTQUFTLEVBQUUsNkNBQTZDLENBQUM7WUFDdkU7WUFBQ3VELFNBQUEsQ0FBQXJJLENBQUE7WUFBQTtVQUFBO1lBQUFxSSxTQUFBLENBQUF4SCxDQUFBO1lBQUF1SCxHQUFBLEdBQUFDLFNBQUEsQ0FBQXJILENBQUE7WUFHRGtHLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLDBDQUEwQyxFQUFBaUIsR0FBTyxDQUFDO1lBQ2hFdEQsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFBb0QsZUFBQSxHQUFBRSxHQUFBLENBQU16QixRQUFRLGNBQUF1QixlQUFBLGdCQUFBQSxlQUFBLEdBQWRBLGVBQUEsQ0FBZ0JsQixJQUFJLGNBQUFrQixlQUFBLHVCQUFwQkEsZUFBQSxDQUFzQk0sT0FBTyxLQUFJLHlDQUF5QyxDQUFDO1VBQUM7WUFBQUgsU0FBQSxDQUFBeEgsQ0FBQTtZQUcvRjBGLGVBQWUsQ0FBQyxLQUFLLENBQUM7WUFBQyxPQUFBOEIsU0FBQSxDQUFBekgsQ0FBQTtVQUFBO1lBQUEsT0FBQXlILFNBQUEsQ0FBQXBILENBQUE7UUFBQTtNQUFBLEdBQUFnSCxRQUFBO0lBQUEsQ0FFOUI7SUFBQSxnQkFoQktGLFlBQVlBLENBQUFVLEVBQUE7TUFBQSxPQUFBVCxLQUFBLENBQUFqRixLQUFBLE9BQUFELFNBQUE7SUFBQTtFQUFBLEdBZ0JqQjtFQUNELElBQUlvRCxTQUFTLEVBQUU7SUFDWCxPQUFRL0Isc0RBQUksQ0FBQyxLQUFLLEVBQUU7TUFBRXVFLFNBQVMsRUFBRSx3Q0FBd0M7TUFBRUMsUUFBUSxFQUFFeEUsc0RBQUksQ0FBQyxLQUFLLEVBQUU7UUFBRXVFLFNBQVMsRUFBRSxlQUFlO1FBQUVDLFFBQVEsRUFBRTtNQUFzQyxDQUFDO0lBQUUsQ0FBQyxDQUFDO0VBQ3hMO0VBQ0EsT0FBUXRFLHVEQUFLLENBQUMsTUFBTSxFQUFFO0lBQUV1RSxRQUFRLEVBQUViLFlBQVk7SUFBRVcsU0FBUyxFQUFFLFdBQVc7SUFBRUMsUUFBUSxFQUFFLENBQUN0RSx1REFBSyxDQUFDLEtBQUssRUFBRTtNQUFFcUUsU0FBUyxFQUFFLGlFQUFpRTtNQUFFQyxRQUFRLEVBQUUsQ0FBQ3RFLHVEQUFLLENBQUMsS0FBSyxFQUFFO1FBQUVxRSxTQUFTLEVBQUUsUUFBUTtRQUFFQyxRQUFRLEVBQUUsQ0FBQ3hFLHNEQUFJLENBQUMsSUFBSSxFQUFFO1VBQUV1RSxTQUFTLEVBQUUsbUNBQW1DO1VBQUVDLFFBQVEsRUFBRTtRQUFzQixDQUFDLENBQUMsRUFBRXhFLHNEQUFJLENBQUMsR0FBRyxFQUFFO1VBQUV1RSxTQUFTLEVBQUUsNEJBQTRCO1VBQUVDLFFBQVEsRUFBRTtRQUFzRSxDQUFDLENBQUM7TUFBRSxDQUFDLENBQUMsRUFBRXhFLHNEQUFJLENBQUMsUUFBUSxFQUFFO1FBQUU0RSxJQUFJLEVBQUUsUUFBUTtRQUFFZSxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtVQUFBLE9BQVFGLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQztRQUFBO1FBQUVYLFFBQVEsRUFBRTNDLFlBQVk7UUFBRW9DLFNBQVMscVVBQUFTLE1BQUEsQ0FJcGtCTSxXQUFXLENBQUNILG1CQUFtQixHQUFHLGdCQUFnQixHQUFHLGFBQWEsaUJBQ3JFO1FBQUVTLElBQUksRUFBRSxRQUFRO1FBQUUsY0FBYyxFQUFFTixXQUFXLENBQUNILG1CQUFtQjtRQUFFLFlBQVksRUFBRSw0QkFBNEI7UUFBRVgsUUFBUSxFQUFFeEUsc0RBQUksQ0FBQyxNQUFNLEVBQUU7VUFBRXVFLFNBQVMsK0tBQUFTLE1BQUEsQ0FHNUlNLFdBQVcsQ0FBQ0gsbUJBQW1CLEdBQUcsZUFBZSxHQUFHLGVBQWU7UUFDckUsQ0FBQztNQUFFLENBQUMsQ0FBQztJQUFFLENBQUMsQ0FBQyxFQUFFakYsdURBQUssQ0FBQyxLQUFLLEVBQUU7TUFBRXFFLFNBQVMsRUFBRSxpRUFBaUU7TUFBRUMsUUFBUSxFQUFFLENBQUN0RSx1REFBSyxDQUFDLEtBQUssRUFBRTtRQUFFcUUsU0FBUyxFQUFFLFFBQVE7UUFBRUMsUUFBUSxFQUFFLENBQUN4RSxzREFBSSxDQUFDLElBQUksRUFBRTtVQUFFdUUsU0FBUyxFQUFFLG1DQUFtQztVQUFFQyxRQUFRLEVBQUU7UUFBYSxDQUFDLENBQUMsRUFBRXhFLHNEQUFJLENBQUMsR0FBRyxFQUFFO1VBQUV1RSxTQUFTLEVBQUUsNEJBQTRCO1VBQUVDLFFBQVEsRUFBRTtRQUF1RCxDQUFDLENBQUM7TUFBRSxDQUFDLENBQUMsRUFBRXhFLHNEQUFJLENBQUMsUUFBUSxFQUFFO1FBQUU0RSxJQUFJLEVBQUUsUUFBUTtRQUFFZSxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtVQUFBLE9BQVFGLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztRQUFBO1FBQUVYLFFBQVEsRUFBRTNDLFlBQVk7UUFBRW9DLFNBQVMscVVBQUFTLE1BQUEsQ0FJNWVNLFdBQVcsQ0FBQ0YsaUJBQWlCLEdBQUcsZ0JBQWdCLEdBQUcsYUFBYSxpQkFDbkU7UUFBRVEsSUFBSSxFQUFFLFFBQVE7UUFBRSxjQUFjLEVBQUVOLFdBQVcsQ0FBQ0YsaUJBQWlCO1FBQUUsWUFBWSxFQUFFLDBCQUEwQjtRQUFFWixRQUFRLEVBQUV4RSxzREFBSSxDQUFDLE1BQU0sRUFBRTtVQUFFdUUsU0FBUywrS0FBQVMsTUFBQSxDQUd4SU0sV0FBVyxDQUFDRixpQkFBaUIsR0FBRyxlQUFlLEdBQUcsZUFBZTtRQUNuRSxDQUFDO01BQUUsQ0FBQyxDQUFDO0lBQUUsQ0FBQyxDQUFDLEVBQUVsRix1REFBSyxDQUFDLEtBQUssRUFBRTtNQUFFcUUsU0FBUyxFQUFFLGlFQUFpRTtNQUFFQyxRQUFRLEVBQUUsQ0FBQ3RFLHVEQUFLLENBQUMsS0FBSyxFQUFFO1FBQUVxRSxTQUFTLEVBQUUsUUFBUTtRQUFFQyxRQUFRLEVBQUUsQ0FBQ3hFLHNEQUFJLENBQUMsSUFBSSxFQUFFO1VBQUV1RSxTQUFTLEVBQUUsbUNBQW1DO1VBQUVDLFFBQVEsRUFBRTtRQUF1QixDQUFDLENBQUMsRUFBRXhFLHNEQUFJLENBQUMsR0FBRyxFQUFFO1VBQUV1RSxTQUFTLEVBQUUsNEJBQTRCO1VBQUVDLFFBQVEsRUFBRTtRQUFvRSxDQUFDLENBQUM7TUFBRSxDQUFDLENBQUMsRUFBRXhFLHNEQUFJLENBQUMsUUFBUSxFQUFFO1FBQUU0RSxJQUFJLEVBQUUsUUFBUTtRQUFFZSxPQUFPLEVBQUUsU0FBVEEsT0FBT0EsQ0FBQTtVQUFBLE9BQVFGLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztRQUFBO1FBQUVYLFFBQVEsRUFBRTNDLFlBQVk7UUFBRW9DLFNBQVMscVVBQUFTLE1BQUEsQ0FJdGdCTSxXQUFXLENBQUNELG9CQUFvQixHQUFHLGdCQUFnQixHQUFHLGFBQWEsaUJBQ3RFO1FBQUVPLElBQUksRUFBRSxRQUFRO1FBQUUsY0FBYyxFQUFFTixXQUFXLENBQUNELG9CQUFvQjtRQUFFLFlBQVksRUFBRSw2QkFBNkI7UUFBRWIsUUFBUSxFQUFFeEUsc0RBQUksQ0FBQyxNQUFNLEVBQUU7VUFBRXVFLFNBQVMsK0tBQUFTLE1BQUEsQ0FHOUlNLFdBQVcsQ0FBQ0Qsb0JBQW9CLEdBQUcsZUFBZSxHQUFHLGVBQWU7UUFDdEUsQ0FBQztNQUFFLENBQUMsQ0FBQztJQUFFLENBQUMsQ0FBQyxFQUFFckYsc0RBQUksQ0FBQyxLQUFLLEVBQUU7TUFBRXVFLFNBQVMsRUFBRSxnREFBZ0Q7TUFBRUMsUUFBUSxFQUFFeEUsc0RBQUksQ0FBQ0ssOENBQU0sRUFBRTtRQUFFdUUsSUFBSSxFQUFFLFFBQVE7UUFBRUUsUUFBUSxFQUFFM0MsWUFBWTtRQUFFcUMsUUFBUSxFQUFFckMsWUFBWSxHQUFHLFdBQVcsR0FBRztNQUFtQixDQUFDO0lBQUUsQ0FBQyxDQUFDO0VBQUUsQ0FBQyxDQUFDO0FBQ3hPLENBQUM7QUFDRCxpRUFBZStDLG1CQUFtQixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkNqSGxDLHVLQUFBekosQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLENBQUEsd0JBQUFDLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxDQUFBLEdBQUFGLENBQUEsQ0FBQUcsUUFBQSxrQkFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLFdBQUEsOEJBQUFDLEVBQUFOLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUMsQ0FBQSxHQUFBTCxDQUFBLElBQUFBLENBQUEsQ0FBQU0sU0FBQSxZQUFBQyxTQUFBLEdBQUFQLENBQUEsR0FBQU8sU0FBQSxFQUFBQyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLENBQUFDLFNBQUEsVUFBQUssbUJBQUEsQ0FBQUgsQ0FBQSx1QkFBQVYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUUsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUksQ0FBQSxNQUFBQyxDQUFBLEdBQUFYLENBQUEsUUFBQVksQ0FBQSxPQUFBQyxDQUFBLEtBQUFGLENBQUEsS0FBQWIsQ0FBQSxLQUFBZ0IsQ0FBQSxFQUFBcEIsQ0FBQSxFQUFBcUIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFOLENBQUEsRUFBQU0sQ0FBQSxDQUFBQyxJQUFBLENBQUF2QixDQUFBLE1BQUFzQixDQUFBLFdBQUFBLEVBQUFyQixDQUFBLEVBQUFDLENBQUEsV0FBQU0sQ0FBQSxHQUFBUCxDQUFBLEVBQUFRLENBQUEsTUFBQUcsQ0FBQSxHQUFBWixDQUFBLEVBQUFtQixDQUFBLENBQUFmLENBQUEsR0FBQUYsQ0FBQSxFQUFBbUIsQ0FBQSxnQkFBQUMsRUFBQXBCLENBQUEsRUFBQUUsQ0FBQSxTQUFBSyxDQUFBLEdBQUFQLENBQUEsRUFBQVUsQ0FBQSxHQUFBUixDQUFBLEVBQUFILENBQUEsT0FBQWlCLENBQUEsSUFBQUYsQ0FBQSxLQUFBVixDQUFBLElBQUFMLENBQUEsR0FBQWdCLENBQUEsQ0FBQU8sTUFBQSxFQUFBdkIsQ0FBQSxVQUFBSyxDQUFBLEVBQUFFLENBQUEsR0FBQVMsQ0FBQSxDQUFBaEIsQ0FBQSxHQUFBcUIsQ0FBQSxHQUFBSCxDQUFBLENBQUFGLENBQUEsRUFBQVEsQ0FBQSxHQUFBakIsQ0FBQSxLQUFBTixDQUFBLFFBQUFJLENBQUEsR0FBQW1CLENBQUEsS0FBQXJCLENBQUEsTUFBQVEsQ0FBQSxHQUFBSixDQUFBLEVBQUFDLENBQUEsR0FBQUQsQ0FBQSxZQUFBQyxDQUFBLFdBQUFELENBQUEsTUFBQUEsQ0FBQSxNQUFBUixDQUFBLElBQUFRLENBQUEsT0FBQWMsQ0FBQSxNQUFBaEIsQ0FBQSxHQUFBSixDQUFBLFFBQUFvQixDQUFBLEdBQUFkLENBQUEsUUFBQUMsQ0FBQSxNQUFBVSxDQUFBLENBQUFDLENBQUEsR0FBQWhCLENBQUEsRUFBQWUsQ0FBQSxDQUFBZixDQUFBLEdBQUFJLENBQUEsT0FBQWMsQ0FBQSxHQUFBRyxDQUFBLEtBQUFuQixDQUFBLEdBQUFKLENBQUEsUUFBQU0sQ0FBQSxNQUFBSixDQUFBLElBQUFBLENBQUEsR0FBQXFCLENBQUEsTUFBQWpCLENBQUEsTUFBQU4sQ0FBQSxFQUFBTSxDQUFBLE1BQUFKLENBQUEsRUFBQWUsQ0FBQSxDQUFBZixDQUFBLEdBQUFxQixDQUFBLEVBQUFoQixDQUFBLGNBQUFILENBQUEsSUFBQUosQ0FBQSxhQUFBbUIsQ0FBQSxRQUFBSCxDQUFBLE9BQUFkLENBQUEscUJBQUFFLENBQUEsRUFBQVcsQ0FBQSxFQUFBUSxDQUFBLFFBQUFULENBQUEsWUFBQVUsU0FBQSx1Q0FBQVIsQ0FBQSxVQUFBRCxDQUFBLElBQUFLLENBQUEsQ0FBQUwsQ0FBQSxFQUFBUSxDQUFBLEdBQUFoQixDQUFBLEdBQUFRLENBQUEsRUFBQUwsQ0FBQSxHQUFBYSxDQUFBLEdBQUF4QixDQUFBLEdBQUFRLENBQUEsT0FBQVQsQ0FBQSxHQUFBWSxDQUFBLE1BQUFNLENBQUEsS0FBQVYsQ0FBQSxLQUFBQyxDQUFBLEdBQUFBLENBQUEsUUFBQUEsQ0FBQSxTQUFBVSxDQUFBLENBQUFmLENBQUEsUUFBQWtCLENBQUEsQ0FBQWIsQ0FBQSxFQUFBRyxDQUFBLEtBQUFPLENBQUEsQ0FBQWYsQ0FBQSxHQUFBUSxDQUFBLEdBQUFPLENBQUEsQ0FBQUMsQ0FBQSxHQUFBUixDQUFBLGFBQUFJLENBQUEsTUFBQVIsQ0FBQSxRQUFBQyxDQUFBLEtBQUFILENBQUEsWUFBQUwsQ0FBQSxHQUFBTyxDQUFBLENBQUFGLENBQUEsV0FBQUwsQ0FBQSxHQUFBQSxDQUFBLENBQUEwQixJQUFBLENBQUFuQixDQUFBLEVBQUFJLENBQUEsVUFBQWMsU0FBQSwyQ0FBQXpCLENBQUEsQ0FBQTJCLElBQUEsU0FBQTNCLENBQUEsRUFBQVcsQ0FBQSxHQUFBWCxDQUFBLENBQUE0QixLQUFBLEVBQUFwQixDQUFBLFNBQUFBLENBQUEsb0JBQUFBLENBQUEsS0FBQVIsQ0FBQSxHQUFBTyxDQUFBLGVBQUFQLENBQUEsQ0FBQTBCLElBQUEsQ0FBQW5CLENBQUEsR0FBQUMsQ0FBQSxTQUFBRyxDQUFBLEdBQUFjLFNBQUEsdUNBQUFwQixDQUFBLGdCQUFBRyxDQUFBLE9BQUFELENBQUEsR0FBQVIsQ0FBQSxjQUFBQyxDQUFBLElBQUFpQixDQUFBLEdBQUFDLENBQUEsQ0FBQWYsQ0FBQSxRQUFBUSxDQUFBLEdBQUFWLENBQUEsQ0FBQXlCLElBQUEsQ0FBQXZCLENBQUEsRUFBQWUsQ0FBQSxPQUFBRSxDQUFBLGtCQUFBcEIsQ0FBQSxJQUFBTyxDQUFBLEdBQUFSLENBQUEsRUFBQVMsQ0FBQSxNQUFBRyxDQUFBLEdBQUFYLENBQUEsY0FBQWUsQ0FBQSxtQkFBQWEsS0FBQSxFQUFBNUIsQ0FBQSxFQUFBMkIsSUFBQSxFQUFBVixDQUFBLFNBQUFoQixDQUFBLEVBQUFJLENBQUEsRUFBQUUsQ0FBQSxRQUFBSSxDQUFBLFFBQUFTLENBQUEsZ0JBQUFWLFVBQUEsY0FBQW1CLGtCQUFBLGNBQUFDLDJCQUFBLEtBQUE5QixDQUFBLEdBQUFZLE1BQUEsQ0FBQW1CLGNBQUEsTUFBQXZCLENBQUEsTUFBQUwsQ0FBQSxJQUFBSCxDQUFBLENBQUFBLENBQUEsSUFBQUcsQ0FBQSxTQUFBVyxtQkFBQSxDQUFBZCxDQUFBLE9BQUFHLENBQUEsaUNBQUFILENBQUEsR0FBQVcsQ0FBQSxHQUFBbUIsMEJBQUEsQ0FBQXJCLFNBQUEsR0FBQUMsU0FBQSxDQUFBRCxTQUFBLEdBQUFHLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLFlBQUFPLEVBQUFoQixDQUFBLFdBQUFhLE1BQUEsQ0FBQW9CLGNBQUEsR0FBQXBCLE1BQUEsQ0FBQW9CLGNBQUEsQ0FBQWpDLENBQUEsRUFBQStCLDBCQUFBLEtBQUEvQixDQUFBLENBQUFrQyxTQUFBLEdBQUFILDBCQUFBLEVBQUFoQixtQkFBQSxDQUFBZixDQUFBLEVBQUFNLENBQUEseUJBQUFOLENBQUEsQ0FBQVUsU0FBQSxHQUFBRyxNQUFBLENBQUFDLE1BQUEsQ0FBQUYsQ0FBQSxHQUFBWixDQUFBLFdBQUE4QixpQkFBQSxDQUFBcEIsU0FBQSxHQUFBcUIsMEJBQUEsRUFBQWhCLG1CQUFBLENBQUFILENBQUEsaUJBQUFtQiwwQkFBQSxHQUFBaEIsbUJBQUEsQ0FBQWdCLDBCQUFBLGlCQUFBRCxpQkFBQSxHQUFBQSxpQkFBQSxDQUFBSyxXQUFBLHdCQUFBcEIsbUJBQUEsQ0FBQWdCLDBCQUFBLEVBQUF6QixDQUFBLHdCQUFBUyxtQkFBQSxDQUFBSCxDQUFBLEdBQUFHLG1CQUFBLENBQUFILENBQUEsRUFBQU4sQ0FBQSxnQkFBQVMsbUJBQUEsQ0FBQUgsQ0FBQSxFQUFBUixDQUFBLGlDQUFBVyxtQkFBQSxDQUFBSCxDQUFBLDhEQUFBd0IsWUFBQSxZQUFBQSxhQUFBLGFBQUFDLENBQUEsRUFBQTdCLENBQUEsRUFBQThCLENBQUEsRUFBQXRCLENBQUE7QUFBQSxTQUFBRCxvQkFBQWYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUgsQ0FBQSxRQUFBTyxDQUFBLEdBQUFLLE1BQUEsQ0FBQTBCLGNBQUEsUUFBQS9CLENBQUEsdUJBQUFSLENBQUEsSUFBQVEsQ0FBQSxRQUFBTyxtQkFBQSxZQUFBeUIsbUJBQUF4QyxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxFQUFBSCxDQUFBLGFBQUFLLEVBQUFKLENBQUEsRUFBQUUsQ0FBQSxJQUFBVyxtQkFBQSxDQUFBZixDQUFBLEVBQUFFLENBQUEsWUFBQUYsQ0FBQSxnQkFBQXlDLE9BQUEsQ0FBQXZDLENBQUEsRUFBQUUsQ0FBQSxFQUFBSixDQUFBLFNBQUFFLENBQUEsR0FBQU0sQ0FBQSxHQUFBQSxDQUFBLENBQUFSLENBQUEsRUFBQUUsQ0FBQSxJQUFBMkIsS0FBQSxFQUFBekIsQ0FBQSxFQUFBc0MsVUFBQSxHQUFBekMsQ0FBQSxFQUFBMEMsWUFBQSxHQUFBMUMsQ0FBQSxFQUFBMkMsUUFBQSxHQUFBM0MsQ0FBQSxNQUFBRCxDQUFBLENBQUFFLENBQUEsSUFBQUUsQ0FBQSxJQUFBRSxDQUFBLGFBQUFBLENBQUEsY0FBQUEsQ0FBQSxtQkFBQVMsbUJBQUEsQ0FBQWYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUgsQ0FBQTtBQUFBLFNBQUE0QyxtQkFBQXpDLENBQUEsRUFBQUgsQ0FBQSxFQUFBRCxDQUFBLEVBQUFFLENBQUEsRUFBQUksQ0FBQSxFQUFBZSxDQUFBLEVBQUFaLENBQUEsY0FBQUQsQ0FBQSxHQUFBSixDQUFBLENBQUFpQixDQUFBLEVBQUFaLENBQUEsR0FBQUcsQ0FBQSxHQUFBSixDQUFBLENBQUFxQixLQUFBLFdBQUF6QixDQUFBLGdCQUFBSixDQUFBLENBQUFJLENBQUEsS0FBQUksQ0FBQSxDQUFBb0IsSUFBQSxHQUFBM0IsQ0FBQSxDQUFBVyxDQUFBLElBQUFrQyxPQUFBLENBQUFDLE9BQUEsQ0FBQW5DLENBQUEsRUFBQW9DLElBQUEsQ0FBQTlDLENBQUEsRUFBQUksQ0FBQTtBQUFBLFNBQUEyQyxrQkFBQTdDLENBQUEsNkJBQUFILENBQUEsU0FBQUQsQ0FBQSxHQUFBa0QsU0FBQSxhQUFBSixPQUFBLFdBQUE1QyxDQUFBLEVBQUFJLENBQUEsUUFBQWUsQ0FBQSxHQUFBakIsQ0FBQSxDQUFBK0MsS0FBQSxDQUFBbEQsQ0FBQSxFQUFBRCxDQUFBLFlBQUFvRCxNQUFBaEQsQ0FBQSxJQUFBeUMsa0JBQUEsQ0FBQXhCLENBQUEsRUFBQW5CLENBQUEsRUFBQUksQ0FBQSxFQUFBOEMsS0FBQSxFQUFBQyxNQUFBLFVBQUFqRCxDQUFBLGNBQUFpRCxPQUFBakQsQ0FBQSxJQUFBeUMsa0JBQUEsQ0FBQXhCLENBQUEsRUFBQW5CLENBQUEsRUFBQUksQ0FBQSxFQUFBOEMsS0FBQSxFQUFBQyxNQUFBLFdBQUFqRCxDQUFBLEtBQUFnRCxLQUFBO0FBQUEsU0FBQWdILFFBQUFwSyxDQUFBLEVBQUFFLENBQUEsUUFBQUQsQ0FBQSxHQUFBWSxNQUFBLENBQUE4RyxJQUFBLENBQUEzSCxDQUFBLE9BQUFhLE1BQUEsQ0FBQXdKLHFCQUFBLFFBQUEvSixDQUFBLEdBQUFPLE1BQUEsQ0FBQXdKLHFCQUFBLENBQUFySyxDQUFBLEdBQUFFLENBQUEsS0FBQUksQ0FBQSxHQUFBQSxDQUFBLENBQUFnSyxNQUFBLFdBQUFwSyxDQUFBLFdBQUFXLE1BQUEsQ0FBQTBKLHdCQUFBLENBQUF2SyxDQUFBLEVBQUFFLENBQUEsRUFBQXdDLFVBQUEsT0FBQXpDLENBQUEsQ0FBQW1FLElBQUEsQ0FBQWpCLEtBQUEsQ0FBQWxELENBQUEsRUFBQUssQ0FBQSxZQUFBTCxDQUFBO0FBQUEsU0FBQStILGNBQUFoSSxDQUFBLGFBQUFFLENBQUEsTUFBQUEsQ0FBQSxHQUFBZ0QsU0FBQSxDQUFBMUIsTUFBQSxFQUFBdEIsQ0FBQSxVQUFBRCxDQUFBLFdBQUFpRCxTQUFBLENBQUFoRCxDQUFBLElBQUFnRCxTQUFBLENBQUFoRCxDQUFBLFFBQUFBLENBQUEsT0FBQWtLLE9BQUEsQ0FBQXZKLE1BQUEsQ0FBQVosQ0FBQSxPQUFBdUssT0FBQSxXQUFBdEssQ0FBQSxJQUFBK0gsZUFBQSxDQUFBakksQ0FBQSxFQUFBRSxDQUFBLEVBQUFELENBQUEsQ0FBQUMsQ0FBQSxTQUFBVyxNQUFBLENBQUE0Six5QkFBQSxHQUFBNUosTUFBQSxDQUFBNkosZ0JBQUEsQ0FBQTFLLENBQUEsRUFBQWEsTUFBQSxDQUFBNEoseUJBQUEsQ0FBQXhLLENBQUEsS0FBQW1LLE9BQUEsQ0FBQXZKLE1BQUEsQ0FBQVosQ0FBQSxHQUFBdUssT0FBQSxXQUFBdEssQ0FBQSxJQUFBVyxNQUFBLENBQUEwQixjQUFBLENBQUF2QyxDQUFBLEVBQUFFLENBQUEsRUFBQVcsTUFBQSxDQUFBMEosd0JBQUEsQ0FBQXRLLENBQUEsRUFBQUMsQ0FBQSxpQkFBQUYsQ0FBQTtBQUFBLFNBQUFpSSxnQkFBQWpJLENBQUEsRUFBQUUsQ0FBQSxFQUFBRCxDQUFBLFlBQUFDLENBQUEsR0FBQXlLLGNBQUEsQ0FBQXpLLENBQUEsTUFBQUYsQ0FBQSxHQUFBYSxNQUFBLENBQUEwQixjQUFBLENBQUF2QyxDQUFBLEVBQUFFLENBQUEsSUFBQTJCLEtBQUEsRUFBQTVCLENBQUEsRUFBQXlDLFVBQUEsTUFBQUMsWUFBQSxNQUFBQyxRQUFBLFVBQUE1QyxDQUFBLENBQUFFLENBQUEsSUFBQUQsQ0FBQSxFQUFBRCxDQUFBO0FBQUEsU0FBQTJLLGVBQUExSyxDQUFBLFFBQUFPLENBQUEsR0FBQW9LLFlBQUEsQ0FBQTNLLENBQUEsZ0NBQUE0SyxPQUFBLENBQUFySyxDQUFBLElBQUFBLENBQUEsR0FBQUEsQ0FBQTtBQUFBLFNBQUFvSyxhQUFBM0ssQ0FBQSxFQUFBQyxDQUFBLG9CQUFBMkssT0FBQSxDQUFBNUssQ0FBQSxNQUFBQSxDQUFBLFNBQUFBLENBQUEsTUFBQUQsQ0FBQSxHQUFBQyxDQUFBLENBQUFFLE1BQUEsQ0FBQTJLLFdBQUEsa0JBQUE5SyxDQUFBLFFBQUFRLENBQUEsR0FBQVIsQ0FBQSxDQUFBMkIsSUFBQSxDQUFBMUIsQ0FBQSxFQUFBQyxDQUFBLGdDQUFBMkssT0FBQSxDQUFBckssQ0FBQSxVQUFBQSxDQUFBLFlBQUFrQixTQUFBLHlFQUFBeEIsQ0FBQSxHQUFBNkssTUFBQSxHQUFBQyxNQUFBLEVBQUEvSyxDQUFBO0FBQUEsU0FBQXFELGVBQUFwRCxDQUFBLEVBQUFGLENBQUEsV0FBQXVELGVBQUEsQ0FBQXJELENBQUEsS0FBQXNELHFCQUFBLENBQUF0RCxDQUFBLEVBQUFGLENBQUEsS0FBQXlELDJCQUFBLENBQUF2RCxDQUFBLEVBQUFGLENBQUEsS0FBQTBELGdCQUFBO0FBQUEsU0FBQUEsaUJBQUEsY0FBQWhDLFNBQUE7QUFBQSxTQUFBK0IsNEJBQUF2RCxDQUFBLEVBQUFtQixDQUFBLFFBQUFuQixDQUFBLDJCQUFBQSxDQUFBLFNBQUF5RCxpQkFBQSxDQUFBekQsQ0FBQSxFQUFBbUIsQ0FBQSxPQUFBcEIsQ0FBQSxNQUFBMkQsUUFBQSxDQUFBakMsSUFBQSxDQUFBekIsQ0FBQSxFQUFBMkQsS0FBQSw2QkFBQTVELENBQUEsSUFBQUMsQ0FBQSxDQUFBNEQsV0FBQSxLQUFBN0QsQ0FBQSxHQUFBQyxDQUFBLENBQUE0RCxXQUFBLENBQUFDLElBQUEsYUFBQTlELENBQUEsY0FBQUEsQ0FBQSxHQUFBK0QsS0FBQSxDQUFBQyxJQUFBLENBQUEvRCxDQUFBLG9CQUFBRCxDQUFBLCtDQUFBaUUsSUFBQSxDQUFBakUsQ0FBQSxJQUFBMEQsaUJBQUEsQ0FBQXpELENBQUEsRUFBQW1CLENBQUE7QUFBQSxTQUFBc0Msa0JBQUF6RCxDQUFBLEVBQUFtQixDQUFBLGFBQUFBLENBQUEsSUFBQUEsQ0FBQSxHQUFBbkIsQ0FBQSxDQUFBc0IsTUFBQSxNQUFBSCxDQUFBLEdBQUFuQixDQUFBLENBQUFzQixNQUFBLFlBQUF4QixDQUFBLE1BQUFJLENBQUEsR0FBQTRELEtBQUEsQ0FBQTNDLENBQUEsR0FBQXJCLENBQUEsR0FBQXFCLENBQUEsRUFBQXJCLENBQUEsSUFBQUksQ0FBQSxDQUFBSixDQUFBLElBQUFFLENBQUEsQ0FBQUYsQ0FBQSxVQUFBSSxDQUFBO0FBQUEsU0FBQW9ELHNCQUFBdEQsQ0FBQSxFQUFBdUIsQ0FBQSxRQUFBeEIsQ0FBQSxXQUFBQyxDQUFBLGdDQUFBQyxNQUFBLElBQUFELENBQUEsQ0FBQUMsTUFBQSxDQUFBRSxRQUFBLEtBQUFILENBQUEsNEJBQUFELENBQUEsUUFBQUQsQ0FBQSxFQUFBSSxDQUFBLEVBQUFJLENBQUEsRUFBQUksQ0FBQSxFQUFBUyxDQUFBLE9BQUFMLENBQUEsT0FBQVYsQ0FBQSxpQkFBQUUsQ0FBQSxJQUFBUCxDQUFBLEdBQUFBLENBQUEsQ0FBQTBCLElBQUEsQ0FBQXpCLENBQUEsR0FBQWlFLElBQUEsUUFBQTFDLENBQUEsUUFBQVosTUFBQSxDQUFBWixDQUFBLE1BQUFBLENBQUEsVUFBQWUsQ0FBQSx1QkFBQUEsQ0FBQSxJQUFBaEIsQ0FBQSxHQUFBUSxDQUFBLENBQUFtQixJQUFBLENBQUExQixDQUFBLEdBQUEyQixJQUFBLE1BQUFQLENBQUEsQ0FBQStDLElBQUEsQ0FBQXBFLENBQUEsQ0FBQTZCLEtBQUEsR0FBQVIsQ0FBQSxDQUFBRyxNQUFBLEtBQUFDLENBQUEsR0FBQVQsQ0FBQSxpQkFBQWQsQ0FBQSxJQUFBSSxDQUFBLE9BQUFGLENBQUEsR0FBQUYsQ0FBQSx5QkFBQWMsQ0FBQSxZQUFBZixDQUFBLGVBQUFXLENBQUEsR0FBQVgsQ0FBQSxjQUFBWSxNQUFBLENBQUFELENBQUEsTUFBQUEsQ0FBQSwyQkFBQU4sQ0FBQSxRQUFBRixDQUFBLGFBQUFpQixDQUFBO0FBQUEsU0FBQWtDLGdCQUFBckQsQ0FBQSxRQUFBOEQsS0FBQSxDQUFBSyxPQUFBLENBQUFuRSxDQUFBLFVBQUFBLENBQUE7QUFEK0Q7QUFDbkI7QUFDTjtBQUNGO0FBQ21CO0FBQ0Y7QUFDckI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1nTCxXQUFXLEdBQUcsU0FBZEEsV0FBV0EsQ0FBQSxFQUFTO0VBQ3RCLElBQUFqRyxTQUFBLEdBQXNCSCxnRUFBUSxDQUFDLENBQUM7SUFBeEJJLFNBQVMsR0FBQUQsU0FBQSxDQUFUQyxTQUFTO0VBQ2pCLElBQUFpRyxRQUFBLEdBQWlCRiw4REFBTyxDQUFDLENBQUM7SUFBbEJHLElBQUksR0FBQUQsUUFBQSxDQUFKQyxJQUFJO0VBQ1osSUFBQWpHLFNBQUEsR0FBZ0NULCtDQUFRLENBQUM7TUFDckNYLElBQUksRUFBRSxFQUFFO01BQ1IyQixLQUFLLEVBQUUsRUFBRTtNQUNUMkYsUUFBUSxFQUFFLEVBQUU7TUFDWkMscUJBQXFCLEVBQUU7SUFDM0IsQ0FBQyxDQUFDO0lBQUF6RixVQUFBLEdBQUF2QyxjQUFBLENBQUE2QixTQUFBO0lBTEtXLFFBQVEsR0FBQUQsVUFBQTtJQUFFRSxXQUFXLEdBQUFGLFVBQUE7RUFNNUIsSUFBQUcsVUFBQSxHQUE0QnRCLCtDQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFBQXVCLFVBQUEsR0FBQTNDLGNBQUEsQ0FBQTBDLFVBQUE7SUFBakNFLE1BQU0sR0FBQUQsVUFBQTtJQUFFRSxTQUFTLEdBQUFGLFVBQUE7RUFDeEIsSUFBQUcsVUFBQSxHQUFrQzFCLCtDQUFRLENBQUMsSUFBSSxDQUFDO0lBQUEyQixVQUFBLEdBQUEvQyxjQUFBLENBQUE4QyxVQUFBO0lBQXpDRSxTQUFTLEdBQUFELFVBQUE7SUFBRUUsWUFBWSxHQUFBRixVQUFBO0VBQzlCLElBQUFHLFVBQUEsR0FBd0M5QiwrQ0FBUSxDQUFDLEtBQUssQ0FBQztJQUFBK0IsVUFBQSxHQUFBbkQsY0FBQSxDQUFBa0QsVUFBQTtJQUFoREUsWUFBWSxHQUFBRCxVQUFBO0lBQUVFLGVBQWUsR0FBQUYsVUFBQTtFQUNwQztBQUNKO0FBQ0E7RUFDSTlCLGdEQUFTLENBQUMsWUFBTTtJQUNaLElBQUl5RyxJQUFJLEVBQUU7TUFDTnJGLFdBQVcsQ0FBQztRQUNSaEMsSUFBSSxFQUFFcUgsSUFBSSxDQUFDckgsSUFBSSxJQUFJLEVBQUU7UUFDckIyQixLQUFLLEVBQUUwRixJQUFJLENBQUMxRixLQUFLLElBQUksRUFBRTtRQUN2QjJGLFFBQVEsRUFBRSxFQUFFO1FBQ1pDLHFCQUFxQixFQUFFO01BQzNCLENBQUMsQ0FBQztNQUNGL0UsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUN2QjtFQUNKLENBQUMsRUFBRSxDQUFDNkUsSUFBSSxDQUFDLENBQUM7RUFDVjtBQUNKO0FBQ0E7QUFDQTtFQUNJLElBQU1HLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQUlGLFFBQVEsRUFBSztJQUNuQyxJQUFJQSxRQUFRLENBQUM3SixNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ3ZCLE9BQU8sSUFBSSxDQUFDLENBQUM7SUFDakI7SUFDQSxJQUFJNkosUUFBUSxDQUFDN0osTUFBTSxHQUFHLENBQUMsRUFBRTtNQUNyQixPQUFPLDZDQUE2QztJQUN4RDtJQUNBLElBQUksQ0FBQyxPQUFPLENBQUMwQyxJQUFJLENBQUNtSCxRQUFRLENBQUMsRUFBRTtNQUN6QixPQUFPLHFEQUFxRDtJQUNoRTtJQUNBLElBQUksQ0FBQyxPQUFPLENBQUNuSCxJQUFJLENBQUNtSCxRQUFRLENBQUMsRUFBRTtNQUN6QixPQUFPLHFEQUFxRDtJQUNoRTtJQUNBLElBQUksQ0FBQyxJQUFJLENBQUNuSCxJQUFJLENBQUNtSCxRQUFRLENBQUMsRUFBRTtNQUN0QixPQUFPLDJDQUEyQztJQUN0RDtJQUNBLE9BQU8sSUFBSTtFQUNmLENBQUM7RUFDRDtBQUNKO0FBQ0E7RUFDSSxJQUFNN0QsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUEsRUFBUztJQUN2QixJQUFNQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCO0lBQ0EsSUFBSSxDQUFDM0IsUUFBUSxDQUFDL0IsSUFBSSxDQUFDMkQsSUFBSSxDQUFDLENBQUMsRUFBRTtNQUN2QkQsU0FBUyxDQUFDMUQsSUFBSSxHQUFHLGtCQUFrQjtJQUN2QyxDQUFDLE1BQ0ksSUFBSStCLFFBQVEsQ0FBQy9CLElBQUksQ0FBQ3ZDLE1BQU0sR0FBRyxHQUFHLEVBQUU7TUFDakNpRyxTQUFTLENBQUMxRCxJQUFJLEdBQUcscUNBQXFDO0lBQzFEO0lBQ0E7SUFDQSxJQUFJLENBQUMrQixRQUFRLENBQUNKLEtBQUssQ0FBQ2dDLElBQUksQ0FBQyxDQUFDLEVBQUU7TUFDeEJELFNBQVMsQ0FBQy9CLEtBQUssR0FBRyxtQkFBbUI7SUFDekMsQ0FBQyxNQUNJLElBQUksQ0FBQyw0QkFBNEIsQ0FBQ3hCLElBQUksQ0FBQzRCLFFBQVEsQ0FBQ0osS0FBSyxDQUFDLEVBQUU7TUFDekQrQixTQUFTLENBQUMvQixLQUFLLEdBQUcsb0NBQW9DO0lBQzFEO0lBQ0E7SUFDQSxJQUFJSSxRQUFRLENBQUN1RixRQUFRLEVBQUU7TUFDbkIsSUFBTUcsYUFBYSxHQUFHRCxnQkFBZ0IsQ0FBQ3pGLFFBQVEsQ0FBQ3VGLFFBQVEsQ0FBQztNQUN6RCxJQUFJRyxhQUFhLEVBQUU7UUFDZi9ELFNBQVMsQ0FBQzRELFFBQVEsR0FBR0csYUFBYTtNQUN0QztNQUNBO01BQ0EsSUFBSTFGLFFBQVEsQ0FBQ3VGLFFBQVEsS0FBS3ZGLFFBQVEsQ0FBQ3dGLHFCQUFxQixFQUFFO1FBQ3REN0QsU0FBUyxDQUFDNkQscUJBQXFCLEdBQUcsd0JBQXdCO01BQzlEO0lBQ0o7SUFDQW5GLFNBQVMsQ0FBQ3NCLFNBQVMsQ0FBQztJQUNwQixPQUFPNUcsTUFBTSxDQUFDOEcsSUFBSSxDQUFDRixTQUFTLENBQUMsQ0FBQ2pHLE1BQU0sS0FBSyxDQUFDO0VBQzlDLENBQUM7RUFDRDtBQUNKO0FBQ0E7RUFDSSxJQUFNb0csWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUk1SCxDQUFDLEVBQUs7SUFDeEIsSUFBQTZILFNBQUEsR0FBd0I3SCxDQUFDLENBQUM4SCxNQUFNO01BQXhCL0QsSUFBSSxHQUFBOEQsU0FBQSxDQUFKOUQsSUFBSTtNQUFFbEMsS0FBSyxHQUFBZ0csU0FBQSxDQUFMaEcsS0FBSztJQUNuQmtFLFdBQVcsQ0FBQyxVQUFDZ0MsSUFBSTtNQUFBLE9BQUFDLGFBQUEsQ0FBQUEsYUFBQSxLQUNWRCxJQUFJLE9BQUFFLGVBQUEsS0FDTmxFLElBQUksRUFBR2xDLEtBQUs7SUFBQSxDQUNmLENBQUM7SUFDSDtJQUNBLElBQUlxRSxNQUFNLENBQUNuQyxJQUFJLENBQUMsRUFBRTtNQUNkb0MsU0FBUyxDQUFDLFVBQUM0QixJQUFJO1FBQUEsT0FBQUMsYUFBQSxDQUFBQSxhQUFBLEtBQ1JELElBQUksT0FBQUUsZUFBQSxLQUNObEUsSUFBSSxFQUFHbUUsU0FBUztNQUFBLENBQ25CLENBQUM7SUFDUDtFQUNKLENBQUM7RUFDRDtBQUNKO0FBQ0E7RUFDSSxJQUFNQyxZQUFZO0lBQUEsSUFBQXRCLElBQUEsR0FBQTVELGlCQUFBLGNBQUFiLFlBQUEsR0FBQUUsQ0FBQSxDQUFHLFNBQUF3RSxRQUFPOUcsQ0FBQztNQUFBLElBQUF5TCxVQUFBLEVBQUExRSxRQUFBLEVBQUEyRSxXQUFBLEVBQUFwRCxlQUFBLEVBQUFDLGdCQUFBLEVBQUF0QixFQUFBO01BQUEsT0FBQTdFLFlBQUEsR0FBQUMsQ0FBQSxXQUFBNkUsUUFBQTtRQUFBLGtCQUFBQSxRQUFBLENBQUFqRyxDQUFBLEdBQUFpRyxRQUFBLENBQUE5RyxDQUFBO1VBQUE7WUFDekJKLENBQUMsQ0FBQzBJLGNBQWMsQ0FBQyxDQUFDO1lBQUMsSUFDZGxCLFlBQVksQ0FBQyxDQUFDO2NBQUFOLFFBQUEsQ0FBQTlHLENBQUE7Y0FBQTtZQUFBO1lBQ2Y4RSxTQUFTLENBQUMsT0FBTyxFQUFFLHVDQUF1QyxDQUFDO1lBQUMsT0FBQWdDLFFBQUEsQ0FBQTdGLENBQUE7VUFBQTtZQUdoRXNGLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFBQ08sUUFBQSxDQUFBakcsQ0FBQTtZQUVsQjtZQUNNd0ssVUFBVSxHQUFHO2NBQ2YxSCxJQUFJLEVBQUUrQixRQUFRLENBQUMvQixJQUFJO2NBQ25CMkIsS0FBSyxFQUFFSSxRQUFRLENBQUNKO1lBQ3BCLENBQUM7WUFDRCxJQUFJSSxRQUFRLENBQUN1RixRQUFRLEVBQUU7Y0FDbkJJLFVBQVUsQ0FBQ0osUUFBUSxHQUFHdkYsUUFBUSxDQUFDdUYsUUFBUTtZQUMzQztZQUFDbkUsUUFBQSxDQUFBOUcsQ0FBQTtZQUFBLE9BQ3NCMkUsZ0RBQUcsQ0FBQzRELEdBQUcsQ0FBQyxVQUFVLEVBQUU4QyxVQUFVLENBQUM7VUFBQTtZQUFoRDFFLFFBQVEsR0FBQUcsUUFBQSxDQUFBOUYsQ0FBQTtZQUNkLElBQUkyRixRQUFRLENBQUNLLElBQUksQ0FBQ0MsT0FBTyxFQUFFO2NBQ3ZCbkMsU0FBUyxDQUFDLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQztjQUNwRDtjQUNNd0csV0FBVyxHQUFHM0UsUUFBUSxDQUFDSyxJQUFJLENBQUNnRSxJQUFJO2NBQ3RDTyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxNQUFNLEVBQUVDLElBQUksQ0FBQ0MsU0FBUyxDQUFDSixXQUFXLENBQUMsQ0FBQztjQUN6RDtjQUNBM0YsV0FBVyxDQUFDLFVBQUNnQyxJQUFJO2dCQUFBLE9BQUFDLGFBQUEsQ0FBQUEsYUFBQSxLQUNWRCxJQUFJO2tCQUNQc0QsUUFBUSxFQUFFLEVBQUU7a0JBQ1pDLHFCQUFxQixFQUFFO2dCQUFFO2NBQUEsQ0FDM0IsQ0FBQztZQUNQO1lBQUNwRSxRQUFBLENBQUE5RyxDQUFBO1lBQUE7VUFBQTtZQUFBOEcsUUFBQSxDQUFBakcsQ0FBQTtZQUFBZ0csRUFBQSxHQUFBQyxRQUFBLENBQUE5RixDQUFBO1lBR0RrRyxPQUFPLENBQUNDLEtBQUssQ0FBQywyQkFBMkIsRUFBQU4sRUFBTyxDQUFDO1lBQ2pEO1lBQ0EsS0FBQXFCLGVBQUEsR0FBSXJCLEVBQUEsQ0FBTUYsUUFBUSxjQUFBdUIsZUFBQSxnQkFBQUEsZUFBQSxHQUFkQSxlQUFBLENBQWdCbEIsSUFBSSxjQUFBa0IsZUFBQSxlQUFwQkEsZUFBQSxDQUFzQnBDLE1BQU0sRUFBRTtjQUM5QkMsU0FBUyxDQUFDYyxFQUFBLENBQU1GLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDbEIsTUFBTSxDQUFDO2NBQ3JDaEIsU0FBUyxDQUFDLE9BQU8sRUFBRSx1Q0FBdUMsQ0FBQztZQUMvRCxDQUFDLE1BQ0k7Y0FDREEsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFBcUQsZ0JBQUEsR0FBQXRCLEVBQUEsQ0FBTUYsUUFBUSxjQUFBd0IsZ0JBQUEsZ0JBQUFBLGdCQUFBLEdBQWRBLGdCQUFBLENBQWdCbkIsSUFBSSxjQUFBbUIsZ0JBQUEsdUJBQXBCQSxnQkFBQSxDQUFzQkssT0FBTyxLQUFJLDBCQUEwQixDQUFDO1lBQ25GO1VBQUM7WUFBQTFCLFFBQUEsQ0FBQWpHLENBQUE7WUFHRDBGLGVBQWUsQ0FBQyxLQUFLLENBQUM7WUFBQyxPQUFBTyxRQUFBLENBQUFsRyxDQUFBO1VBQUE7WUFBQSxPQUFBa0csUUFBQSxDQUFBN0YsQ0FBQTtRQUFBO01BQUEsR0FBQXlGLE9BQUE7SUFBQSxDQUU5QjtJQUFBLGdCQTVDS3FCLFlBQVlBLENBQUFVLEVBQUE7TUFBQSxPQUFBaEMsSUFBQSxDQUFBMUQsS0FBQSxPQUFBRCxTQUFBO0lBQUE7RUFBQSxHQTRDakI7RUFDRCxJQUFJb0QsU0FBUyxFQUFFO0lBQ1gsT0FBUS9CLHNEQUFJLENBQUMsS0FBSyxFQUFFO01BQUV1RSxTQUFTLEVBQUUsd0NBQXdDO01BQUVDLFFBQVEsRUFBRXhFLHNEQUFJLENBQUMsS0FBSyxFQUFFO1FBQUV1RSxTQUFTLEVBQUUsZUFBZTtRQUFFQyxRQUFRLEVBQUU7TUFBcUIsQ0FBQztJQUFFLENBQUMsQ0FBQztFQUN2SztFQUNBLE9BQVF0RSx1REFBSyxDQUFDLE1BQU0sRUFBRTtJQUFFdUUsUUFBUSxFQUFFYixZQUFZO0lBQUVXLFNBQVMsRUFBRSxXQUFXO0lBQUVDLFFBQVEsRUFBRSxDQUFDdEUsdURBQUssQ0FBQyxLQUFLLEVBQUU7TUFBRXNFLFFBQVEsRUFBRSxDQUFDdEUsdURBQUssQ0FBQyxPQUFPLEVBQUU7UUFBRXdFLE9BQU8sRUFBRSxNQUFNO1FBQUVILFNBQVMsRUFBRSw4Q0FBOEM7UUFBRUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFeEUsc0RBQUksQ0FBQyxNQUFNLEVBQUU7VUFBRXVFLFNBQVMsRUFBRSxjQUFjO1VBQUVDLFFBQVEsRUFBRTtRQUFJLENBQUMsQ0FBQztNQUFFLENBQUMsQ0FBQyxFQUFFeEUsc0RBQUksQ0FBQ00sNENBQUssRUFBRTtRQUFFcUUsRUFBRSxFQUFFLE1BQU07UUFBRW5GLElBQUksRUFBRSxNQUFNO1FBQUVvRixJQUFJLEVBQUUsTUFBTTtRQUFFdEgsS0FBSyxFQUFFaUUsUUFBUSxDQUFDL0IsSUFBSTtRQUFFcUYsUUFBUSxFQUFFeEIsWUFBWTtRQUFFa0IsU0FBUyxFQUFFNUMsTUFBTSxDQUFDbkMsSUFBSSxHQUFHLGdCQUFnQixHQUFHLEVBQUU7UUFBRXNGLFFBQVEsRUFBRTNDLFlBQVk7UUFBRTRDLFdBQVcsRUFBRTtNQUFXLENBQUMsQ0FBQyxFQUFFcEQsTUFBTSxDQUFDbkMsSUFBSSxJQUFLUSxzREFBSSxDQUFDLEdBQUcsRUFBRTtRQUFFdUUsU0FBUyxFQUFFLDJCQUEyQjtRQUFFQyxRQUFRLEVBQUU3QyxNQUFNLENBQUNuQztNQUFLLENBQUMsQ0FBRTtJQUFFLENBQUMsQ0FBQyxFQUFFVSx1REFBSyxDQUFDLEtBQUssRUFBRTtNQUFFc0UsUUFBUSxFQUFFLENBQUN0RSx1REFBSyxDQUFDLE9BQU8sRUFBRTtRQUFFd0UsT0FBTyxFQUFFLE9BQU87UUFBRUgsU0FBUyxFQUFFLDhDQUE4QztRQUFFQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUV4RSxzREFBSSxDQUFDLE1BQU0sRUFBRTtVQUFFdUUsU0FBUyxFQUFFLGNBQWM7VUFBRUMsUUFBUSxFQUFFO1FBQUksQ0FBQyxDQUFDO01BQUUsQ0FBQyxDQUFDLEVBQUV4RSxzREFBSSxDQUFDTSw0Q0FBSyxFQUFFO1FBQUVxRSxFQUFFLEVBQUUsT0FBTztRQUFFbkYsSUFBSSxFQUFFLE9BQU87UUFBRW9GLElBQUksRUFBRSxPQUFPO1FBQUV0SCxLQUFLLEVBQUVpRSxRQUFRLENBQUNKLEtBQUs7UUFBRTBELFFBQVEsRUFBRXhCLFlBQVk7UUFBRWtCLFNBQVMsRUFBRTVDLE1BQU0sQ0FBQ1IsS0FBSyxHQUFHLGdCQUFnQixHQUFHLEVBQUU7UUFBRTJELFFBQVEsRUFBRTNDLFlBQVk7UUFBRTRDLFdBQVcsRUFBRTtNQUF1QixDQUFDLENBQUMsRUFBRXBELE1BQU0sQ0FBQ1IsS0FBSyxJQUFLbkIsc0RBQUksQ0FBQyxHQUFHLEVBQUU7UUFBRXVFLFNBQVMsRUFBRSwyQkFBMkI7UUFBRUMsUUFBUSxFQUFFN0MsTUFBTSxDQUFDUjtNQUFNLENBQUMsQ0FBRTtJQUFFLENBQUMsQ0FBQyxFQUFFakIsdURBQUssQ0FBQyxLQUFLLEVBQUU7TUFBRXFFLFNBQVMsRUFBRSwrQkFBK0I7TUFBRUMsUUFBUSxFQUFFLENBQUN4RSxzREFBSSxDQUFDLElBQUksRUFBRTtRQUFFdUUsU0FBUyxFQUFFLHdDQUF3QztRQUFFQyxRQUFRLEVBQUU7TUFBa0IsQ0FBQyxDQUFDLEVBQUV4RSxzREFBSSxDQUFDLEdBQUcsRUFBRTtRQUFFdUUsU0FBUyxFQUFFLDRCQUE0QjtRQUFFQyxRQUFRLEVBQUU7TUFBNEMsQ0FBQyxDQUFDLEVBQUV0RSx1REFBSyxDQUFDLEtBQUssRUFBRTtRQUFFcUUsU0FBUyxFQUFFLFdBQVc7UUFBRUMsUUFBUSxFQUFFLENBQUN0RSx1REFBSyxDQUFDLEtBQUssRUFBRTtVQUFFc0UsUUFBUSxFQUFFLENBQUN4RSxzREFBSSxDQUFDLE9BQU8sRUFBRTtZQUFFMEUsT0FBTyxFQUFFLFVBQVU7WUFBRUgsU0FBUyxFQUFFLDhDQUE4QztZQUFFQyxRQUFRLEVBQUU7VUFBZSxDQUFDLENBQUMsRUFBRXhFLHNEQUFJLENBQUNNLDRDQUFLLEVBQUU7WUFBRXFFLEVBQUUsRUFBRSxVQUFVO1lBQUVuRixJQUFJLEVBQUUsVUFBVTtZQUFFb0YsSUFBSSxFQUFFLFVBQVU7WUFBRXRILEtBQUssRUFBRWlFLFFBQVEsQ0FBQ3VGLFFBQVE7WUFBRWpDLFFBQVEsRUFBRXhCLFlBQVk7WUFBRWtCLFNBQVMsRUFBRTVDLE1BQU0sQ0FBQ21GLFFBQVEsR0FBRyxnQkFBZ0IsR0FBRyxFQUFFO1lBQUVoQyxRQUFRLEVBQUUzQyxZQUFZO1lBQUU0QyxXQUFXLEVBQUU7VUFBcUIsQ0FBQyxDQUFDLEVBQUVwRCxNQUFNLENBQUNtRixRQUFRLElBQUs5RyxzREFBSSxDQUFDLEdBQUcsRUFBRTtZQUFFdUUsU0FBUyxFQUFFLDJCQUEyQjtZQUFFQyxRQUFRLEVBQUU3QyxNQUFNLENBQUNtRjtVQUFTLENBQUMsQ0FBRSxFQUFFOUcsc0RBQUksQ0FBQyxHQUFHLEVBQUU7WUFBRXVFLFNBQVMsRUFBRSw0QkFBNEI7WUFBRUMsUUFBUSxFQUFFO1VBQXNFLENBQUMsQ0FBQztRQUFFLENBQUMsQ0FBQyxFQUFFdEUsdURBQUssQ0FBQyxLQUFLLEVBQUU7VUFBRXNFLFFBQVEsRUFBRSxDQUFDeEUsc0RBQUksQ0FBQyxPQUFPLEVBQUU7WUFBRTBFLE9BQU8sRUFBRSx1QkFBdUI7WUFBRUgsU0FBUyxFQUFFLDhDQUE4QztZQUFFQyxRQUFRLEVBQUU7VUFBdUIsQ0FBQyxDQUFDLEVBQUV4RSxzREFBSSxDQUFDTSw0Q0FBSyxFQUFFO1lBQUVxRSxFQUFFLEVBQUUsdUJBQXVCO1lBQUVuRixJQUFJLEVBQUUsdUJBQXVCO1lBQUVvRixJQUFJLEVBQUUsVUFBVTtZQUFFdEgsS0FBSyxFQUFFaUUsUUFBUSxDQUFDd0YscUJBQXFCO1lBQUVsQyxRQUFRLEVBQUV4QixZQUFZO1lBQUVrQixTQUFTLEVBQUU1QyxNQUFNLENBQUNvRixxQkFBcUIsR0FBRyxnQkFBZ0IsR0FBRyxFQUFFO1lBQUVqQyxRQUFRLEVBQUUzQyxZQUFZO1lBQUU0QyxXQUFXLEVBQUU7VUFBdUIsQ0FBQyxDQUFDLEVBQUVwRCxNQUFNLENBQUNvRixxQkFBcUIsSUFBSy9HLHNEQUFJLENBQUMsR0FBRyxFQUFFO1lBQUV1RSxTQUFTLEVBQUUsMkJBQTJCO1lBQUVDLFFBQVEsRUFBRTdDLE1BQU0sQ0FBQ29GO1VBQXNCLENBQUMsQ0FBRTtRQUFFLENBQUMsQ0FBQztNQUFFLENBQUMsQ0FBQztJQUFFLENBQUMsQ0FBQyxFQUFFL0csc0RBQUksQ0FBQyxLQUFLLEVBQUU7TUFBRXVFLFNBQVMsRUFBRSxnREFBZ0Q7TUFBRUMsUUFBUSxFQUFFeEUsc0RBQUksQ0FBQ0ssOENBQU0sRUFBRTtRQUFFdUUsSUFBSSxFQUFFLFFBQVE7UUFBRUUsUUFBUSxFQUFFM0MsWUFBWTtRQUFFcUMsUUFBUSxFQUFFckMsWUFBWSxHQUFHLFdBQVcsR0FBRztNQUFlLENBQUM7SUFBRSxDQUFDLENBQUM7RUFBRSxDQUFDLENBQUM7QUFDbHpGLENBQUM7QUFDRCxpRUFBZXdFLFdBQVcsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUtzQjtBQUNqQjtBQUNNO0FBQ3JDLElBQU1yRyxLQUFLLGdCQUFHa0gsNkNBQWdCLENBQUMsVUFBQWxGLElBQUEsRUFBZ0NxRixHQUFHLEVBQUs7RUFBQSxJQUFyQ3BELFNBQVMsR0FBQWpDLElBQUEsQ0FBVGlDLFNBQVM7SUFBRUssSUFBSSxHQUFBdEMsSUFBQSxDQUFKc0MsSUFBSTtJQUFLZ0QsS0FBSyxHQUFBQyx3QkFBQSxDQUFBdkYsSUFBQSxFQUFBd0YsU0FBQTtFQUN2RCxPQUFROUgsc0RBQUksQ0FBQyxPQUFPLEVBQUF5RCxhQUFBO0lBQUltQixJQUFJLEVBQUVBLElBQUk7SUFBRUwsU0FBUyxFQUFFa0QsOENBQUUsQ0FBQyw4VkFBOFYsRUFBRWxELFNBQVMsQ0FBQztJQUFFb0QsR0FBRyxFQUFFQTtFQUFHLEdBQUtDLEtBQUssQ0FBRSxDQUFDO0FBQ3ZiLENBQUMsQ0FBQztBQUNGdEgsS0FBSyxDQUFDMUMsV0FBVyxHQUFHLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQzlCO0FBQzZCO0FBQ2Y7QUFDRjtBQUNJO0FBQ3dCO0FBQ0k7QUFDaEI7QUFDWDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTXlLLFFBQVEsR0FBRyxTQUFYQSxRQUFRQSxDQUFBLEVBQVM7RUFDbkIsSUFBQXpCLFFBQUEsR0FBaUJGLCtEQUFPLENBQUMsQ0FBQztJQUFsQkcsSUFBSSxHQUFBRCxRQUFBLENBQUpDLElBQUk7RUFDWixJQUFNeUIsUUFBUSxHQUFHSCw2REFBVyxDQUFDLENBQUM7RUFDOUIsSUFBQXZILFNBQUEsR0FBa0NULCtDQUFRLENBQUMsUUFBUSxDQUFDO0lBQUFtQixVQUFBLEdBQUF2QyxjQUFBLENBQUE2QixTQUFBO0lBQTdDMkgsU0FBUyxHQUFBakgsVUFBQTtJQUFFa0gsWUFBWSxHQUFBbEgsVUFBQTtFQUM5QixJQUFNbUgsT0FBTyxHQUFHLENBQUE1QixJQUFJLGFBQUpBLElBQUksdUJBQUpBLElBQUksQ0FBRWpCLElBQUksTUFBSyxPQUFPO0VBQ3RDLElBQU04QyxJQUFJLEdBQUcsQ0FDVDtJQUNJL0QsRUFBRSxFQUFFLFFBQVE7SUFDWm5GLElBQUksRUFBRSxnQkFBZ0I7SUFDdEJtSixJQUFJLEVBQUVaLG9EQUFTO0lBQ2ZhLFdBQVcsRUFBRTtFQUNqQixDQUFDLEVBQ0Q7SUFDSWpFLEVBQUUsRUFBRSxlQUFlO0lBQ25CbkYsSUFBSSxFQUFFLGVBQWU7SUFDckJtSixJQUFJLEVBQUVYLG9EQUFJO0lBQ1ZZLFdBQVcsRUFBRTtFQUNqQixDQUFDLEVBQ0Q7SUFDSWpFLEVBQUUsRUFBRSxTQUFTO0lBQ2JuRixJQUFJLEVBQUUsU0FBUztJQUNmbUosSUFBSSxFQUFFVixvREFBSTtJQUNWVyxXQUFXLEVBQUU7RUFDakIsQ0FBQyxDQUNKO0VBQ0QsT0FBUTFJLHVEQUFLLENBQUMsS0FBSyxFQUFFO0lBQUVxRSxTQUFTLEVBQUUsV0FBVztJQUFFQyxRQUFRLEVBQUUsQ0FBQ3RFLHVEQUFLLENBQUMsS0FBSyxFQUFFO01BQUVxRSxTQUFTLEVBQUUsTUFBTTtNQUFFQyxRQUFRLEVBQUUsQ0FBQ3hFLHNEQUFJLENBQUMsSUFBSSxFQUFFO1FBQUV1RSxTQUFTLEVBQUUsa0NBQWtDO1FBQUVDLFFBQVEsRUFBRTtNQUFXLENBQUMsQ0FBQyxFQUFFeEUsc0RBQUksQ0FBQyxHQUFHLEVBQUU7UUFBRXVFLFNBQVMsRUFBRSxvQkFBb0I7UUFBRUMsUUFBUSxFQUFFO01BQXNFLENBQUMsQ0FBQztJQUFFLENBQUMsQ0FBQyxFQUFFaUUsT0FBTyxJQUFLekksc0RBQUksQ0FBQ29JLHFEQUFJLEVBQUU7TUFBRTdELFNBQVMsRUFBRSxvQ0FBb0M7TUFBRUMsUUFBUSxFQUFFdEUsdURBQUssQ0FBQyxLQUFLLEVBQUU7UUFBRXFFLFNBQVMsRUFBRSxtQ0FBbUM7UUFBRUMsUUFBUSxFQUFFLENBQUN0RSx1REFBSyxDQUFDLEtBQUssRUFBRTtVQUFFcUUsU0FBUyxFQUFFLG1CQUFtQjtVQUFFQyxRQUFRLEVBQUUsQ0FBQ3hFLHNEQUFJLENBQUMsS0FBSyxFQUFFO1lBQUV1RSxTQUFTLEVBQUUscUZBQXFGO1lBQUVDLFFBQVEsRUFBRXhFLHNEQUFJLENBQUNrSSxvREFBTyxFQUFFO2NBQUUzRCxTQUFTLEVBQUU7WUFBMEIsQ0FBQztVQUFFLENBQUMsQ0FBQyxFQUFFckUsdURBQUssQ0FBQyxLQUFLLEVBQUU7WUFBRXFFLFNBQVMsRUFBRSxNQUFNO1lBQUVDLFFBQVEsRUFBRSxDQUFDeEUsc0RBQUksQ0FBQyxJQUFJLEVBQUU7Y0FBRXVFLFNBQVMsRUFBRSxxQ0FBcUM7Y0FBRUMsUUFBUSxFQUFFO1lBQXFCLENBQUMsQ0FBQyxFQUFFeEUsc0RBQUksQ0FBQyxHQUFHLEVBQUU7Y0FBRXVFLFNBQVMsRUFBRSx1QkFBdUI7Y0FBRUMsUUFBUSxFQUFFO1lBQWlDLENBQUMsQ0FBQztVQUFFLENBQUMsQ0FBQztRQUFFLENBQUMsQ0FBQyxFQUFFdEUsdURBQUssQ0FBQ0cseURBQU0sRUFBRTtVQUFFd0ksT0FBTyxFQUFFLFNBQVM7VUFBRUMsSUFBSSxFQUFFLElBQUk7VUFBRW5ELE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFBO1lBQUEsT0FBUTJDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQztVQUFBO1VBQUUvRCxTQUFTLEVBQUUsdUNBQXVDO1VBQUVDLFFBQVEsRUFBRSxDQUFDeEUsc0RBQUksQ0FBQ2tJLG9EQUFPLEVBQUU7WUFBRTNELFNBQVMsRUFBRTtVQUFlLENBQUMsQ0FBQyxFQUFFLGNBQWM7UUFBRSxDQUFDLENBQUM7TUFBRSxDQUFDO0lBQUUsQ0FBQyxDQUFFLEVBQUV2RSxzREFBSSxDQUFDLEtBQUssRUFBRTtNQUFFdUUsU0FBUyxFQUFFLDBCQUEwQjtNQUFFQyxRQUFRLEVBQUV4RSxzREFBSSxDQUFDLEtBQUssRUFBRTtRQUFFdUUsU0FBUyxFQUFFLHVCQUF1QjtRQUFFQyxRQUFRLEVBQUVrRSxJQUFJLENBQUNLLEdBQUcsQ0FBQyxVQUFDQyxHQUFHLEVBQUs7VUFDdnlDLElBQU1DLElBQUksR0FBR0QsR0FBRyxDQUFDTCxJQUFJO1VBQ3JCLElBQU1PLFFBQVEsR0FBR1gsU0FBUyxLQUFLUyxHQUFHLENBQUNyRSxFQUFFO1VBQ3JDLE9BQVF6RSx1REFBSyxDQUFDLFFBQVEsRUFBRTtZQUFFeUYsT0FBTyxFQUFFLFNBQVRBLE9BQU9BLENBQUE7Y0FBQSxPQUFRNkMsWUFBWSxDQUFDUSxHQUFHLENBQUNyRSxFQUFFLENBQUM7WUFBQTtZQUFFSixTQUFTLGtMQUFBUyxNQUFBLENBRzVFa0UsUUFBUSxHQUNNLHFDQUFxQyxHQUNyQyw0RUFBNEUsdUJBQzdGO1lBQUUxRSxRQUFRLEVBQUUsQ0FBQ3hFLHNEQUFJLENBQUNpSixJQUFJLEVBQUU7Y0FBRTFFLFNBQVMsNkRBQUFTLE1BQUEsQ0FFOUJrRSxRQUFRLEdBQUcsa0JBQWtCLEdBQUcseUNBQXlDO1lBQzNFLENBQUMsQ0FBQyxFQUFFRixHQUFHLENBQUN4SixJQUFJO1VBQUUsQ0FBQyxFQUFFd0osR0FBRyxDQUFDckUsRUFBRSxDQUFDO1FBQ3hCLENBQUM7TUFBRSxDQUFDO0lBQUUsQ0FBQyxDQUFDLEVBQUV6RSx1REFBSyxDQUFDLEtBQUssRUFBRTtNQUFFcUUsU0FBUyxFQUFFLE1BQU07TUFBRUMsUUFBUSxFQUFFLENBQUMrRCxTQUFTLEtBQUssUUFBUSxJQUFLdkksc0RBQUksQ0FBQ29JLHFEQUFJLEVBQUU7UUFBRTdELFNBQVMsRUFBRSxLQUFLO1FBQUVDLFFBQVEsRUFBRXRFLHVEQUFLLENBQUMsS0FBSyxFQUFFO1VBQUVxRSxTQUFTLEVBQUUsV0FBVztVQUFFQyxRQUFRLEVBQUUsQ0FBQ3RFLHVEQUFLLENBQUMsS0FBSyxFQUFFO1lBQUVzRSxRQUFRLEVBQUUsQ0FBQ3RFLHVEQUFLLENBQUMsSUFBSSxFQUFFO2NBQUVxRSxTQUFTLEVBQUUsdURBQXVEO2NBQUVDLFFBQVEsRUFBRSxDQUFDeEUsc0RBQUksQ0FBQytILG9EQUFTLEVBQUU7Z0JBQUV4RCxTQUFTLEVBQUU7Y0FBZ0MsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCO1lBQUUsQ0FBQyxDQUFDLEVBQUV2RSxzREFBSSxDQUFDLEdBQUcsRUFBRTtjQUFFdUUsU0FBUyxFQUFFLDRCQUE0QjtjQUFFQyxRQUFRLEVBQUU7WUFBK0QsQ0FBQyxDQUFDO1VBQUUsQ0FBQyxDQUFDLEVBQUV4RSxzREFBSSxDQUFDLEtBQUssRUFBRTtZQUFFdUUsU0FBUyxFQUFFLCtCQUErQjtZQUFFQyxRQUFRLEVBQUV4RSxzREFBSSxDQUFDUyw4RUFBaUIsRUFBRSxDQUFDLENBQUM7VUFBRSxDQUFDLENBQUM7UUFBRSxDQUFDO01BQUUsQ0FBQyxDQUFFLEVBQUU4SCxTQUFTLEtBQUssZUFBZSxJQUFLdkksc0RBQUksQ0FBQ29JLHFEQUFJLEVBQUU7UUFBRTdELFNBQVMsRUFBRSxLQUFLO1FBQUVDLFFBQVEsRUFBRXRFLHVEQUFLLENBQUMsS0FBSyxFQUFFO1VBQUVxRSxTQUFTLEVBQUUsV0FBVztVQUFFQyxRQUFRLEVBQUUsQ0FBQ3RFLHVEQUFLLENBQUMsS0FBSyxFQUFFO1lBQUVzRSxRQUFRLEVBQUUsQ0FBQ3RFLHVEQUFLLENBQUMsSUFBSSxFQUFFO2NBQUVxRSxTQUFTLEVBQUUsdURBQXVEO2NBQUVDLFFBQVEsRUFBRSxDQUFDeEUsc0RBQUksQ0FBQ2dJLG9EQUFJLEVBQUU7Z0JBQUV6RCxTQUFTLEVBQUU7Y0FBZ0MsQ0FBQyxDQUFDLEVBQUUsMEJBQTBCO1lBQUUsQ0FBQyxDQUFDLEVBQUV2RSxzREFBSSxDQUFDLEdBQUcsRUFBRTtjQUFFdUUsU0FBUyxFQUFFLDRCQUE0QjtjQUFFQyxRQUFRLEVBQUU7WUFBbUQsQ0FBQyxDQUFDO1VBQUUsQ0FBQyxDQUFDLEVBQUV4RSxzREFBSSxDQUFDLEtBQUssRUFBRTtZQUFFdUUsU0FBUyxFQUFFLCtCQUErQjtZQUFFQyxRQUFRLEVBQUV4RSxzREFBSSxDQUFDa0YsaUZBQW1CLEVBQUUsQ0FBQyxDQUFDO1VBQUUsQ0FBQyxDQUFDO1FBQUUsQ0FBQztNQUFFLENBQUMsQ0FBRSxFQUFFcUQsU0FBUyxLQUFLLFNBQVMsSUFBS3ZJLHNEQUFJLENBQUNvSSxxREFBSSxFQUFFO1FBQUU3RCxTQUFTLEVBQUUsS0FBSztRQUFFQyxRQUFRLEVBQUV0RSx1REFBSyxDQUFDLEtBQUssRUFBRTtVQUFFcUUsU0FBUyxFQUFFLFdBQVc7VUFBRUMsUUFBUSxFQUFFLENBQUN0RSx1REFBSyxDQUFDLEtBQUssRUFBRTtZQUFFc0UsUUFBUSxFQUFFLENBQUN0RSx1REFBSyxDQUFDLElBQUksRUFBRTtjQUFFcUUsU0FBUyxFQUFFLHVEQUF1RDtjQUFFQyxRQUFRLEVBQUUsQ0FBQ3hFLHNEQUFJLENBQUNpSSxvREFBSSxFQUFFO2dCQUFFMUQsU0FBUyxFQUFFO2NBQWdDLENBQUMsQ0FBQyxFQUFFLGNBQWM7WUFBRSxDQUFDLENBQUMsRUFBRXZFLHNEQUFJLENBQUMsR0FBRyxFQUFFO2NBQUV1RSxTQUFTLEVBQUUsNEJBQTRCO2NBQUVDLFFBQVEsRUFBRTtZQUF5RCxDQUFDLENBQUM7VUFBRSxDQUFDLENBQUMsRUFBRXhFLHNEQUFJLENBQUMsS0FBSyxFQUFFO1lBQUV1RSxTQUFTLEVBQUUsK0JBQStCO1lBQUVDLFFBQVEsRUFBRXhFLHNEQUFJLENBQUMyRyx5RUFBVyxFQUFFLENBQUMsQ0FBQztVQUFFLENBQUMsQ0FBQztRQUFFLENBQUM7TUFBRSxDQUFDLENBQUU7SUFBRSxDQUFDLENBQUM7RUFBRSxDQUFDLENBQUM7QUFDbnVELENBQUM7QUFDRCxpRUFBZTBCLFFBQVEsRTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVzRDs7QUFFdEQ7QUFDQSxhQUFhLGtFQUFrRTtBQUMvRSxhQUFhLDhEQUE4RDtBQUMzRSxhQUFhLDhCQUE4QjtBQUMzQztBQUNBLGdCQUFnQixnRUFBZ0I7O0FBRVU7QUFDMUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFc0Q7O0FBRXREO0FBQ0EsYUFBYSxrREFBa0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZ0VBQWdCOztBQUVVO0FBQ3ZDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXNEOztBQUV0RDtBQUNBLGFBQWEsOEJBQThCO0FBQzNDLGFBQWEsNkJBQTZCO0FBQzFDLGFBQWEsK0NBQStDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw4REFBOEQ7QUFDM0U7QUFDQSxrQkFBa0IsZ0VBQWdCOztBQUVVO0FBQzVDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2V0dGluZ3MvQ2h1cmNoRGV0YWlsc0Zvcm0udHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NldHRpbmdzL05vdGlmaWNhdGlvblRvZ2dsZXMudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NldHRpbmdzL1Byb2ZpbGVGb3JtLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9pbnB1dC50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL3BhZ2VzL1NldHRpbmdzLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2FyY2hpdmUuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9iZWxsLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvYnVpbGRpbmctMi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL3VpL2J1dHRvbic7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4uL3VpL2lucHV0JztcbmltcG9ydCB7IHVzZVRvYXN0IH0gZnJvbSAnLi4vLi4vY29udGV4dHMvVG9hc3RDb250ZXh0JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vbGliL2FwaSc7XG4vKipcbiAqIENodXJjaERldGFpbHNGb3JtIENvbXBvbmVudFxuICpcbiAqIEZvcm0gZm9yIG1hbmFnaW5nIGNodXJjaCBpbmZvcm1hdGlvbiBpbmNsdWRpbmcgbmFtZSwgYWRkcmVzcywgY29udGFjdCBkZXRhaWxzLCBhbmQgc2VydmljZSB0aW1lcy5cbiAqXG4gKiBGZWF0dXJlczpcbiAqIC0gSW5wdXQgZmllbGRzIGZvciBhbGwgY2h1cmNoIGRldGFpbHNcbiAqIC0gRm9ybSB2YWxpZGF0aW9uIHdpdGggaW5saW5lIGVycm9yIG1lc3NhZ2VzXG4gKiAtIExvYWRzIGV4aXN0aW5nIGNodXJjaCBzZXR0aW5ncyBvbiBtb3VudFxuICogLSBEaXNwbGF5cyBzdWNjZXNzL2Vycm9yIG1lc3NhZ2VzIHZpYSB0b2FzdCBub3RpZmljYXRpb25zXG4gKlxuICogVmFsaWRhdGVzIFJlcXVpcmVtZW50czogNi4xLCA2LjRcbiAqL1xuY29uc3QgQ2h1cmNoRGV0YWlsc0Zvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzaG93VG9hc3QgfSA9IHVzZVRvYXN0KCk7XG4gICAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XG4gICAgICAgIGNodXJjaF9uYW1lOiAnJyxcbiAgICAgICAgYWRkcmVzczogJycsXG4gICAgICAgIGNpdHk6ICcnLFxuICAgICAgICBzdGF0ZTogJycsXG4gICAgICAgIHppcF9jb2RlOiAnJyxcbiAgICAgICAgcGhvbmU6ICcnLFxuICAgICAgICBlbWFpbDogJycsXG4gICAgICAgIHdlYnNpdGU6ICcnLFxuICAgICAgICBzZXJ2aWNlX3RpbWVzOiAnJyxcbiAgICB9KTtcbiAgICBjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGUoe30pO1xuICAgIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbaXNTdWJtaXR0aW5nLCBzZXRJc1N1Ym1pdHRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIC8qKlxuICAgICAqIExvYWQgY2h1cmNoIHNldHRpbmdzIG9uIGNvbXBvbmVudCBtb3VudFxuICAgICAqL1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGxvYWRDaHVyY2hTZXR0aW5ncygpO1xuICAgIH0sIFtdKTtcbiAgICAvKipcbiAgICAgKiBGZXRjaCBjaHVyY2ggc2V0dGluZ3MgZnJvbSBBUElcbiAgICAgKi9cbiAgICBjb25zdCBsb2FkQ2h1cmNoU2V0dGluZ3MgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9zZXR0aW5ncy9jaHVyY2gnKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MgJiYgcmVzcG9uc2UuZGF0YS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEoe1xuICAgICAgICAgICAgICAgICAgICBjaHVyY2hfbmFtZTogc2V0dGluZ3MuY2h1cmNoX25hbWUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHNldHRpbmdzLmFkZHJlc3MgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIGNpdHk6IHNldHRpbmdzLmNpdHkgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiBzZXR0aW5ncy5zdGF0ZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgemlwX2NvZGU6IHNldHRpbmdzLnppcF9jb2RlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogc2V0dGluZ3MucGhvbmUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBzZXR0aW5ncy5lbWFpbCB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgd2Vic2l0ZTogc2V0dGluZ3Mud2Vic2l0ZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZV90aW1lczogc2V0dGluZ3Muc2VydmljZV90aW1lcyB8fCAnJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNodXJjaCBzZXR0aW5nczonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBsb2FkIGNodXJjaCBzZXR0aW5ncycpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgZm9ybSBkYXRhXG4gICAgICovXG4gICAgY29uc3QgdmFsaWRhdGVGb3JtID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdFcnJvcnMgPSB7fTtcbiAgICAgICAgLy8gUmVxdWlyZWQgZmllbGRzXG4gICAgICAgIGlmICghZm9ybURhdGEuY2h1cmNoX25hbWUudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuY2h1cmNoX25hbWUgPSAnQ2h1cmNoIG5hbWUgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZvcm1EYXRhLmNodXJjaF9uYW1lLmxlbmd0aCA+IDIwMCkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmNodXJjaF9uYW1lID0gJ0NodXJjaCBuYW1lIG11c3QgYmUgMjAwIGNoYXJhY3RlcnMgb3IgbGVzcyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5hZGRyZXNzLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmFkZHJlc3MgPSAnQWRkcmVzcyBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZm9ybURhdGEuYWRkcmVzcy5sZW5ndGggPiAyMDApIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5hZGRyZXNzID0gJ0FkZHJlc3MgbXVzdCBiZSAyMDAgY2hhcmFjdGVycyBvciBsZXNzJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLmNpdHkudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuY2l0eSA9ICdDaXR5IGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLnN0YXRlLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLnN0YXRlID0gJ1N0YXRlIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLnppcF9jb2RlLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLnppcF9jb2RlID0gJ1ppcCBjb2RlIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLnBob25lLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLnBob25lID0gJ1Bob25lIG51bWJlciBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIS9eW1xcZFxcc1xcLVxcK1xcKFxcKV0rJC8udGVzdChmb3JtRGF0YS5waG9uZSkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5waG9uZSA9ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBwaG9uZSBudW1iZXInO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEuZW1haWwudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuZW1haWwgPSAnRW1haWwgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCEvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLy50ZXN0KGZvcm1EYXRhLmVtYWlsKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmVtYWlsID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xuICAgICAgICB9XG4gICAgICAgIC8vIE9wdGlvbmFsIHdlYnNpdGUgdmFsaWRhdGlvblxuICAgICAgICBpZiAoZm9ybURhdGEud2Vic2l0ZSAmJiAhL15odHRwcz86XFwvXFwvLisvLnRlc3QoZm9ybURhdGEud2Vic2l0ZSkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy53ZWJzaXRlID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIFVSTCAoZS5nLiwgaHR0cHM6Ly9leGFtcGxlLmNvbSknO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEuc2VydmljZV90aW1lcy50cmltKCkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5zZXJ2aWNlX3RpbWVzID0gJ1NlcnZpY2UgdGltZXMgYXJlIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtRGF0YS5zZXJ2aWNlX3RpbWVzLmxlbmd0aCA+IDUwMCkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLnNlcnZpY2VfdGltZXMgPSAnU2VydmljZSB0aW1lcyBtdXN0IGJlIDUwMCBjaGFyYWN0ZXJzIG9yIGxlc3MnO1xuICAgICAgICB9XG4gICAgICAgIHNldEVycm9ycyhuZXdFcnJvcnMpO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobmV3RXJyb3JzKS5sZW5ndGggPT09IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZS50YXJnZXQ7XG4gICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIFtuYW1lXTogdmFsdWUsXG4gICAgICAgIH0pKTtcbiAgICAgICAgLy8gQ2xlYXIgZXJyb3IgZm9yIHRoaXMgZmllbGQgd2hlbiB1c2VyIHN0YXJ0cyB0eXBpbmdcbiAgICAgICAgaWYgKGVycm9yc1tuYW1lXSkge1xuICAgICAgICAgICAgc2V0RXJyb3JzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgW25hbWVdOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBmb3JtIHN1Ym1pc3Npb25cbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICghdmFsaWRhdGVGb3JtKCkpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnUGxlYXNlIGNvcnJlY3QgdGhlIGVycm9ycyBpbiB0aGUgZm9ybScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldElzU3VibWl0dGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dCgnL3NldHRpbmdzL2NodXJjaCcsIGZvcm1EYXRhKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnQ2h1cmNoIHNldHRpbmdzIHNhdmVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNhdmUgY2h1cmNoIHNldHRpbmdzOicsIGVycm9yKTtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBzZXJ2ZXItc2lkZSB2YWxpZGF0aW9uIGVycm9yc1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlPy5kYXRhPy5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcnMoZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcnMpO1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnUGxlYXNlIGNvcnJlY3QgdGhlIGVycm9ycyBpbiB0aGUgZm9ybScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsIGVycm9yLnJlc3BvbnNlPy5kYXRhPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSBjaHVyY2ggc2V0dGluZ3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzU3VibWl0dGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB5LTEyXCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IFwiTG9hZGluZyBjaHVyY2ggc2V0dGluZ3MuLi5cIiB9KSB9KSk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeHMoXCJmb3JtXCIsIHsgb25TdWJtaXQ6IGhhbmRsZVN1Ym1pdCwgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJjaHVyY2hfbmFtZVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkNodXJjaCBOYW1lIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJjaHVyY2hfbmFtZVwiLCBuYW1lOiBcImNodXJjaF9uYW1lXCIsIHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogZm9ybURhdGEuY2h1cmNoX25hbWUsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmNodXJjaF9uYW1lID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCJNYWhheWFoYXkgRnJlZSBNZXRob2Rpc3QgQ2h1cmNoXCIgfSksIGVycm9ycy5jaHVyY2hfbmFtZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmNodXJjaF9uYW1lIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJhZGRyZXNzXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiQWRkcmVzcyBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwiYWRkcmVzc1wiLCBuYW1lOiBcImFkZHJlc3NcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5hZGRyZXNzLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5hZGRyZXNzID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCIxMjMgTWFpbiBTdHJlZXRcIiB9KSwgZXJyb3JzLmFkZHJlc3MgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5hZGRyZXNzIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwiY2l0eVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkNpdHkgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcImNpdHlcIiwgbmFtZTogXCJjaXR5XCIsIHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogZm9ybURhdGEuY2l0eSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMuY2l0eSA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgcGxhY2Vob2xkZXI6IFwiTWFoYXlhaGF5XCIgfSksIGVycm9ycy5jaXR5ICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuY2l0eSB9KSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwic3RhdGVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJTdGF0ZS9Qcm92aW5jZSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwic3RhdGVcIiwgbmFtZTogXCJzdGF0ZVwiLCB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGZvcm1EYXRhLnN0YXRlLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5zdGF0ZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgcGxhY2Vob2xkZXI6IFwiU3VyaWdhbyBkZWwgU3VyXCIgfSksIGVycm9ycy5zdGF0ZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLnN0YXRlIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJ6aXBfY29kZVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIlppcCBDb2RlIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJ6aXBfY29kZVwiLCBuYW1lOiBcInppcF9jb2RlXCIsIHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogZm9ybURhdGEuemlwX2NvZGUsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLnppcF9jb2RlID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCI4MzA1XCIgfSksIGVycm9ycy56aXBfY29kZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLnppcF9jb2RlIH0pKV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcInBob25lXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiUGhvbmUgTnVtYmVyIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJwaG9uZVwiLCBuYW1lOiBcInBob25lXCIsIHR5cGU6IFwidGVsXCIsIHZhbHVlOiBmb3JtRGF0YS5waG9uZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMucGhvbmUgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIHBsYWNlaG9sZGVyOiBcIis2MyAxMjMgNDU2IDc4OTBcIiB9KSwgZXJyb3JzLnBob25lICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMucGhvbmUgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImVtYWlsXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiRW1haWwgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcImVtYWlsXCIsIG5hbWU6IFwiZW1haWxcIiwgdHlwZTogXCJlbWFpbFwiLCB2YWx1ZTogZm9ybURhdGEuZW1haWwsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmVtYWlsID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCJpbmZvQG1haGF5YWhheWZyZWVtZXRob2Rpc3Qub3JnXCIgfSksIGVycm9ycy5lbWFpbCAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmVtYWlsIH0pKV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJ3ZWJzaXRlXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJXZWJzaXRlXCIgfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwid2Vic2l0ZVwiLCBuYW1lOiBcIndlYnNpdGVcIiwgdHlwZTogXCJ1cmxcIiwgdmFsdWU6IGZvcm1EYXRhLndlYnNpdGUsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLndlYnNpdGUgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIHBsYWNlaG9sZGVyOiBcImh0dHBzOi8vd3d3Lm1haGF5YWhheWZyZWVtZXRob2Rpc3Qub3JnXCIgfSksIGVycm9ycy53ZWJzaXRlICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMud2Vic2l0ZSB9KSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwic2VydmljZV90aW1lc1wiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIlNlcnZpY2UgVGltZXMgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KFwidGV4dGFyZWFcIiwgeyBpZDogXCJzZXJ2aWNlX3RpbWVzXCIsIG5hbWU6IFwic2VydmljZV90aW1lc1wiLCB2YWx1ZTogZm9ybURhdGEuc2VydmljZV90aW1lcywgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBgZmxleCBtaW4taC1bMTAwcHhdIHctZnVsbCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItaW5wdXQgYmctYmFja2dyb3VuZCBweC0zIHB5LTIgdGV4dC1zbSByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIHBsYWNlaG9sZGVyOnRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcmluZyBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTIgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkIGRpc2FibGVkOm9wYWNpdHktNTAgJHtlcnJvcnMuc2VydmljZV90aW1lcyA/ICdib3JkZXItcmVkLTUwMCcgOiAnJ31gLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCJTdW5kYXkgV29yc2hpcDogOTowMCBBTVxcblN1bmRheSBTY2hvb2w6IDEwOjMwIEFNXFxuV2VkbmVzZGF5IFByYXllcjogNzowMCBQTVwiLCByb3dzOiA0IH0pLCBlcnJvcnMuc2VydmljZV90aW1lcyAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLnNlcnZpY2VfdGltZXMgfSkpLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJFbnRlciBzZXJ2aWNlIHRpbWVzLCBvbmUgcGVyIGxpbmVcIiB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWVuZCBwdC00IGJvcmRlci10IGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogX2pzeChCdXR0b24sIHsgdHlwZTogXCJzdWJtaXRcIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2hpbGRyZW46IGlzU3VibWl0dGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgQ2hhbmdlcycgfSkgfSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBDaHVyY2hEZXRhaWxzRm9ybTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vdWkvYnV0dG9uJztcbmltcG9ydCB7IHVzZVRvYXN0IH0gZnJvbSAnLi4vLi4vY29udGV4dHMvVG9hc3RDb250ZXh0JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vbGliL2FwaSc7XG4vKipcbiAqIE5vdGlmaWNhdGlvblRvZ2dsZXMgQ29tcG9uZW50XG4gKlxuICogUHJvdmlkZXMgdG9nZ2xlIHN3aXRjaGVzIGZvciBtYW5hZ2luZyBub3RpZmljYXRpb24gcHJlZmVyZW5jZXMgaW5jbHVkaW5nXG4gKiBlbWFpbCBub3RpZmljYXRpb25zLCBTTVMgYWxlcnRzLCBhbmQgc3lzdGVtIGFubm91bmNlbWVudHMuXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIFRvZ2dsZSBzd2l0Y2hlcyBmb3IgZWFjaCBub3RpZmljYXRpb24gdHlwZVxuICogLSBMb2FkcyBleGlzdGluZyBwcmVmZXJlbmNlcyBvbiBtb3VudFxuICogLSBTYXZlcyBjaGFuZ2VzIHRvIEFQSVxuICogLSBEaXNwbGF5cyBzdWNjZXNzL2Vycm9yIG1lc3NhZ2VzIHZpYSB0b2FzdCBub3RpZmljYXRpb25zXG4gKlxuICogVmFsaWRhdGVzIFJlcXVpcmVtZW50czogNi4yXG4gKi9cbmNvbnN0IE5vdGlmaWNhdGlvblRvZ2dsZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzaG93VG9hc3QgfSA9IHVzZVRvYXN0KCk7XG4gICAgY29uc3QgW3ByZWZlcmVuY2VzLCBzZXRQcmVmZXJlbmNlc10gPSB1c2VTdGF0ZSh7XG4gICAgICAgIGVtYWlsX25vdGlmaWNhdGlvbnM6IHRydWUsXG4gICAgICAgIHNtc19ub3RpZmljYXRpb25zOiBmYWxzZSxcbiAgICAgICAgc3lzdGVtX25vdGlmaWNhdGlvbnM6IHRydWUsXG4gICAgfSk7XG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtpc1N1Ym1pdHRpbmcsIHNldElzU3VibWl0dGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgLyoqXG4gICAgICogTG9hZCBub3RpZmljYXRpb24gcHJlZmVyZW5jZXMgb24gY29tcG9uZW50IG1vdW50XG4gICAgICovXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgbG9hZE5vdGlmaWNhdGlvblByZWZlcmVuY2VzKCk7XG4gICAgfSwgW10pO1xuICAgIC8qKlxuICAgICAqIEZldGNoIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcyBmcm9tIEFQSVxuICAgICAqL1xuICAgIGNvbnN0IGxvYWROb3RpZmljYXRpb25QcmVmZXJlbmNlcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL3NldHRpbmdzL25vdGlmaWNhdGlvbnMnKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MgJiYgcmVzcG9uc2UuZGF0YS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgc2V0UHJlZmVyZW5jZXMocmVzcG9uc2UuZGF0YS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlczonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBsb2FkIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcycpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRvZ2dsZSBjaGFuZ2VcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVUb2dnbGUgPSAoa2V5KSA9PiB7XG4gICAgICAgIHNldFByZWZlcmVuY2VzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIFtrZXldOiAhcHJldltrZXldLFxuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZm9ybSBzdWJtaXNzaW9uXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZXRJc1N1Ym1pdHRpbmcodHJ1ZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoJy9zZXR0aW5ncy9ub3RpZmljYXRpb25zJywgcHJlZmVyZW5jZXMpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdOb3RpZmljYXRpb24gcHJlZmVyZW5jZXMgc2F2ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2F2ZSBub3RpZmljYXRpb24gcHJlZmVyZW5jZXM6JywgZXJyb3IpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsIGVycm9yLnJlc3BvbnNlPy5kYXRhPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSBub3RpZmljYXRpb24gcHJlZmVyZW5jZXMnKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzU3VibWl0dGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB5LTEyXCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IFwiTG9hZGluZyBub3RpZmljYXRpb24gcHJlZmVyZW5jZXMuLi5cIiB9KSB9KSk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeHMoXCJmb3JtXCIsIHsgb25TdWJtaXQ6IGhhbmRsZVN1Ym1pdCwgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweS00IGJvcmRlci1iIGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMVwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiRW1haWwgTm90aWZpY2F0aW9uc1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS01MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJSZWNlaXZlIGVtYWlsIG5vdGlmaWNhdGlvbnMgZm9yIGltcG9ydGFudCB1cGRhdGVzIGFuZCBhbm5vdW5jZW1lbnRzXCIgfSldIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogKCkgPT4gaGFuZGxlVG9nZ2xlKCdlbWFpbF9ub3RpZmljYXRpb25zJyksIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGNsYXNzTmFtZTogYFxyXG4gICAgICAgICAgICByZWxhdGl2ZSBpbmxpbmUtZmxleCBoLTYgdy0xMSBmbGV4LXNocmluay0wIGN1cnNvci1wb2ludGVyIHJvdW5kZWQtZnVsbCBib3JkZXItMiBib3JkZXItdHJhbnNwYXJlbnQgXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMCBlYXNlLWluLW91dCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS01MDAgZm9jdXM6cmluZy1vZmZzZXQtMlxyXG4gICAgICAgICAgICBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS01MFxyXG4gICAgICAgICAgICAke3ByZWZlcmVuY2VzLmVtYWlsX25vdGlmaWNhdGlvbnMgPyAnYmctcHJpbWFyeS02MDAnIDogJ2JnLWdyYXktMjAwJ31cclxuICAgICAgICAgIGAsIHJvbGU6IFwic3dpdGNoXCIsIFwiYXJpYS1jaGVja2VkXCI6IHByZWZlcmVuY2VzLmVtYWlsX25vdGlmaWNhdGlvbnMsIFwiYXJpYS1sYWJlbFwiOiBcIlRvZ2dsZSBlbWFpbCBub3RpZmljYXRpb25zXCIsIGNoaWxkcmVuOiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogYFxyXG4gICAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzLW5vbmUgaW5saW5lLWJsb2NrIGgtNSB3LTUgdHJhbnNmb3JtIHJvdW5kZWQtZnVsbCBiZy13aGl0ZSBzaGFkb3cgcmluZy0wIFxyXG4gICAgICAgICAgICAgIHRyYW5zaXRpb24gZHVyYXRpb24tMjAwIGVhc2UtaW4tb3V0XHJcbiAgICAgICAgICAgICAgJHtwcmVmZXJlbmNlcy5lbWFpbF9ub3RpZmljYXRpb25zID8gJ3RyYW5zbGF0ZS14LTUnIDogJ3RyYW5zbGF0ZS14LTAnfVxyXG4gICAgICAgICAgICBgIH0pIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB5LTQgYm9yZGVyLWIgYm9yZGVyLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xXCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogXCJTTVMgQWxlcnRzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTUwMCBtdC0xXCIsIGNoaWxkcmVuOiBcIlJlY2VpdmUgdGV4dCBtZXNzYWdlIGFsZXJ0cyBmb3IgdXJnZW50IG5vdGlmaWNhdGlvbnNcIiB9KV0gfSksIF9qc3goXCJidXR0b25cIiwgeyB0eXBlOiBcImJ1dHRvblwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVUb2dnbGUoJ3Ntc19ub3RpZmljYXRpb25zJyksIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGNsYXNzTmFtZTogYFxyXG4gICAgICAgICAgICByZWxhdGl2ZSBpbmxpbmUtZmxleCBoLTYgdy0xMSBmbGV4LXNocmluay0wIGN1cnNvci1wb2ludGVyIHJvdW5kZWQtZnVsbCBib3JkZXItMiBib3JkZXItdHJhbnNwYXJlbnQgXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMCBlYXNlLWluLW91dCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS01MDAgZm9jdXM6cmluZy1vZmZzZXQtMlxyXG4gICAgICAgICAgICBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS01MFxyXG4gICAgICAgICAgICAke3ByZWZlcmVuY2VzLnNtc19ub3RpZmljYXRpb25zID8gJ2JnLXByaW1hcnktNjAwJyA6ICdiZy1ncmF5LTIwMCd9XHJcbiAgICAgICAgICBgLCByb2xlOiBcInN3aXRjaFwiLCBcImFyaWEtY2hlY2tlZFwiOiBwcmVmZXJlbmNlcy5zbXNfbm90aWZpY2F0aW9ucywgXCJhcmlhLWxhYmVsXCI6IFwiVG9nZ2xlIFNNUyBub3RpZmljYXRpb25zXCIsIGNoaWxkcmVuOiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogYFxyXG4gICAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzLW5vbmUgaW5saW5lLWJsb2NrIGgtNSB3LTUgdHJhbnNmb3JtIHJvdW5kZWQtZnVsbCBiZy13aGl0ZSBzaGFkb3cgcmluZy0wIFxyXG4gICAgICAgICAgICAgIHRyYW5zaXRpb24gZHVyYXRpb24tMjAwIGVhc2UtaW4tb3V0XHJcbiAgICAgICAgICAgICAgJHtwcmVmZXJlbmNlcy5zbXNfbm90aWZpY2F0aW9ucyA/ICd0cmFuc2xhdGUteC01JyA6ICd0cmFuc2xhdGUteC0wJ31cclxuICAgICAgICAgICAgYCB9KSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweS00IGJvcmRlci1iIGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMVwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiU3lzdGVtIEFubm91bmNlbWVudHNcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNTAwIG10LTFcIiwgY2hpbGRyZW46IFwiUmVjZWl2ZSBpbi1hcHAgbm90aWZpY2F0aW9ucyBmb3Igc3lzdGVtIHVwZGF0ZXMgYW5kIGFubm91bmNlbWVudHNcIiB9KV0gfSksIF9qc3goXCJidXR0b25cIiwgeyB0eXBlOiBcImJ1dHRvblwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVUb2dnbGUoJ3N5c3RlbV9ub3RpZmljYXRpb25zJyksIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGNsYXNzTmFtZTogYFxyXG4gICAgICAgICAgICByZWxhdGl2ZSBpbmxpbmUtZmxleCBoLTYgdy0xMSBmbGV4LXNocmluay0wIGN1cnNvci1wb2ludGVyIHJvdW5kZWQtZnVsbCBib3JkZXItMiBib3JkZXItdHJhbnNwYXJlbnQgXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMCBlYXNlLWluLW91dCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS01MDAgZm9jdXM6cmluZy1vZmZzZXQtMlxyXG4gICAgICAgICAgICBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS01MFxyXG4gICAgICAgICAgICAke3ByZWZlcmVuY2VzLnN5c3RlbV9ub3RpZmljYXRpb25zID8gJ2JnLXByaW1hcnktNjAwJyA6ICdiZy1ncmF5LTIwMCd9XHJcbiAgICAgICAgICBgLCByb2xlOiBcInN3aXRjaFwiLCBcImFyaWEtY2hlY2tlZFwiOiBwcmVmZXJlbmNlcy5zeXN0ZW1fbm90aWZpY2F0aW9ucywgXCJhcmlhLWxhYmVsXCI6IFwiVG9nZ2xlIHN5c3RlbSBub3RpZmljYXRpb25zXCIsIGNoaWxkcmVuOiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogYFxyXG4gICAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzLW5vbmUgaW5saW5lLWJsb2NrIGgtNSB3LTUgdHJhbnNmb3JtIHJvdW5kZWQtZnVsbCBiZy13aGl0ZSBzaGFkb3cgcmluZy0wIFxyXG4gICAgICAgICAgICAgIHRyYW5zaXRpb24gZHVyYXRpb24tMjAwIGVhc2UtaW4tb3V0XHJcbiAgICAgICAgICAgICAgJHtwcmVmZXJlbmNlcy5zeXN0ZW1fbm90aWZpY2F0aW9ucyA/ICd0cmFuc2xhdGUteC01JyA6ICd0cmFuc2xhdGUteC0wJ31cclxuICAgICAgICAgICAgYCB9KSB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWVuZCBwdC00IGJvcmRlci10IGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogX2pzeChCdXR0b24sIHsgdHlwZTogXCJzdWJtaXRcIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2hpbGRyZW46IGlzU3VibWl0dGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgUHJlZmVyZW5jZXMnIH0pIH0pXSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uVG9nZ2xlcztcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vdWkvYnV0dG9uJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi4vdWkvaW5wdXQnO1xuaW1wb3J0IHsgdXNlVG9hc3QgfSBmcm9tICcuLi8uLi9jb250ZXh0cy9Ub2FzdENvbnRleHQnO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gJy4uLy4uL2NvbnRleHRzL0F1dGhDb250ZXh0JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vbGliL2FwaSc7XG4vKipcbiAqIFByb2ZpbGVGb3JtIENvbXBvbmVudFxuICpcbiAqIEZvcm0gZm9yIGVkaXRpbmcgdXNlciBwcm9maWxlIGluY2x1ZGluZyBuYW1lLCBlbWFpbCwgYW5kIHBhc3N3b3JkLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBJbnB1dCBmaWVsZHMgZm9yIG5hbWUsIGVtYWlsLCBhbmQgcGFzc3dvcmRcbiAqIC0gUGFzc3dvcmQgY29tcGxleGl0eSB2YWxpZGF0aW9uIChtaW4gOCBjaGFycywgdXBwZXJjYXNlLCBsb3dlcmNhc2UsIG51bWJlcilcbiAqIC0gTG9hZHMgZXhpc3RpbmcgdXNlciBwcm9maWxlIG9uIG1vdW50XG4gKiAtIERpc3BsYXlzIHN1Y2Nlc3MvZXJyb3IgbWVzc2FnZXMgdmlhIHRvYXN0IG5vdGlmaWNhdGlvbnNcbiAqIC0gUGFzc3dvcmQgZmllbGRzIGFyZSBvcHRpb25hbCAob25seSB1cGRhdGUgaWYgcHJvdmlkZWQpXG4gKlxuICogVmFsaWRhdGVzIFJlcXVpcmVtZW50czogNi4zLCAxMC41XG4gKi9cbmNvbnN0IFByb2ZpbGVGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc2hvd1RvYXN0IH0gPSB1c2VUb2FzdCgpO1xuICAgIGNvbnN0IHsgdXNlciB9ID0gdXNlQXV0aCgpO1xuICAgIGNvbnN0IFtmb3JtRGF0YSwgc2V0Rm9ybURhdGFdID0gdXNlU3RhdGUoe1xuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICBwYXNzd29yZDogJycsXG4gICAgICAgIHBhc3N3b3JkX2NvbmZpcm1hdGlvbjogJycsXG4gICAgfSk7XG4gICAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlKHt9KTtcbiAgICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2lzU3VibWl0dGluZywgc2V0SXNTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICAvKipcbiAgICAgKiBMb2FkIHVzZXIgcHJvZmlsZSBvbiBjb21wb25lbnQgbW91bnRcbiAgICAgKi9cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAodXNlcikge1xuICAgICAgICAgICAgc2V0Rm9ybURhdGEoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSB8fCAnJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCB8fCAnJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJycsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRfY29uZmlybWF0aW9uOiAnJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sIFt1c2VyXSk7XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgcGFzc3dvcmQgY29tcGxleGl0eVxuICAgICAqIFJlcXVpcmVtZW50czogbWluIDggY2hhcmFjdGVycywgdXBwZXJjYXNlLCBsb3dlcmNhc2UsIGFuZCBudW1iZXJcbiAgICAgKi9cbiAgICBjb25zdCB2YWxpZGF0ZVBhc3N3b3JkID0gKHBhc3N3b3JkKSA9PiB7XG4gICAgICAgIGlmIChwYXNzd29yZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsOyAvLyBQYXNzd29yZCBpcyBvcHRpb25hbFxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXNzd29yZC5sZW5ndGggPCA4KSB7XG4gICAgICAgICAgICByZXR1cm4gJ1Bhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghL1thLXpdLy50ZXN0KHBhc3N3b3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuICdQYXNzd29yZCBtdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIGxvd2VyY2FzZSBsZXR0ZXInO1xuICAgICAgICB9XG4gICAgICAgIGlmICghL1tBLVpdLy50ZXN0KHBhc3N3b3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuICdQYXNzd29yZCBtdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIHVwcGVyY2FzZSBsZXR0ZXInO1xuICAgICAgICB9XG4gICAgICAgIGlmICghL1xcZC8udGVzdChwYXNzd29yZCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnUGFzc3dvcmQgbXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSBudW1iZXInO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgZm9ybSBkYXRhXG4gICAgICovXG4gICAgY29uc3QgdmFsaWRhdGVGb3JtID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdFcnJvcnMgPSB7fTtcbiAgICAgICAgLy8gTmFtZSB2YWxpZGF0aW9uXG4gICAgICAgIGlmICghZm9ybURhdGEubmFtZS50cmltKCkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5uYW1lID0gJ05hbWUgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZvcm1EYXRhLm5hbWUubGVuZ3RoID4gMjU1KSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMubmFtZSA9ICdOYW1lIG11c3QgYmUgMjU1IGNoYXJhY3RlcnMgb3IgbGVzcyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW1haWwgdmFsaWRhdGlvblxuICAgICAgICBpZiAoIWZvcm1EYXRhLmVtYWlsLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmVtYWlsID0gJ0VtYWlsIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC8udGVzdChmb3JtRGF0YS5lbWFpbCkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5lbWFpbCA9ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJztcbiAgICAgICAgfVxuICAgICAgICAvLyBQYXNzd29yZCB2YWxpZGF0aW9uIChvbmx5IGlmIHByb3ZpZGVkKVxuICAgICAgICBpZiAoZm9ybURhdGEucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkRXJyb3IgPSB2YWxpZGF0ZVBhc3N3b3JkKGZvcm1EYXRhLnBhc3N3b3JkKTtcbiAgICAgICAgICAgIGlmIChwYXNzd29yZEVycm9yKSB7XG4gICAgICAgICAgICAgICAgbmV3RXJyb3JzLnBhc3N3b3JkID0gcGFzc3dvcmRFcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFBhc3N3b3JkIGNvbmZpcm1hdGlvbiB2YWxpZGF0aW9uXG4gICAgICAgICAgICBpZiAoZm9ybURhdGEucGFzc3dvcmQgIT09IGZvcm1EYXRhLnBhc3N3b3JkX2NvbmZpcm1hdGlvbikge1xuICAgICAgICAgICAgICAgIG5ld0Vycm9ycy5wYXNzd29yZF9jb25maXJtYXRpb24gPSAnUGFzc3dvcmRzIGRvIG5vdCBtYXRjaCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2V0RXJyb3JzKG5ld0Vycm9ycyk7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhuZXdFcnJvcnMpLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBpbnB1dCBjaGFuZ2VcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSBlLnRhcmdldDtcbiAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgW25hbWVdOiB2YWx1ZSxcbiAgICAgICAgfSkpO1xuICAgICAgICAvLyBDbGVhciBlcnJvciBmb3IgdGhpcyBmaWVsZCB3aGVuIHVzZXIgc3RhcnRzIHR5cGluZ1xuICAgICAgICBpZiAoZXJyb3JzW25hbWVdKSB7XG4gICAgICAgICAgICBzZXRFcnJvcnMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICBbbmFtZV06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGZvcm0gc3VibWlzc2lvblxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZUZvcm0oKSkge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdQbGVhc2UgY29ycmVjdCB0aGUgZXJyb3JzIGluIHRoZSBmb3JtJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gUHJlcGFyZSBkYXRhIHRvIHNlbmQgKG9ubHkgaW5jbHVkZSBwYXNzd29yZCBpZiBwcm92aWRlZClcbiAgICAgICAgICAgIGNvbnN0IGRhdGFUb1NlbmQgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogZm9ybURhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogZm9ybURhdGEuZW1haWwsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGZvcm1EYXRhLnBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgZGF0YVRvU2VuZC5wYXNzd29yZCA9IGZvcm1EYXRhLnBhc3N3b3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KCcvcHJvZmlsZScsIGRhdGFUb1NlbmQpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdQcm9maWxlIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIGxvY2FsIHN0b3JhZ2Ugd2l0aCBuZXcgdXNlciBkYXRhXG4gICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlZFVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXInLCBKU09OLnN0cmluZ2lmeSh1cGRhdGVkVXNlcikpO1xuICAgICAgICAgICAgICAgIC8vIENsZWFyIHBhc3N3b3JkIGZpZWxkcyBhZnRlciBzdWNjZXNzZnVsIHVwZGF0ZVxuICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkX2NvbmZpcm1hdGlvbjogJycsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlOicsIGVycm9yKTtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBzZXJ2ZXItc2lkZSB2YWxpZGF0aW9uIGVycm9yc1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlPy5kYXRhPy5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcnMoZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcnMpO1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnUGxlYXNlIGNvcnJlY3QgdGhlIGVycm9ycyBpbiB0aGUgZm9ybScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsIGVycm9yLnJlc3BvbnNlPy5kYXRhPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBkYXRlIHByb2ZpbGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzU3VibWl0dGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChpc0xvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB5LTEyXCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IFwiTG9hZGluZyBwcm9maWxlLi4uXCIgfSkgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gKF9qc3hzKFwiZm9ybVwiLCB7IG9uU3VibWl0OiBoYW5kbGVTdWJtaXQsIGNsYXNzTmFtZTogXCJzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibmFtZVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIk5hbWUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcIm5hbWVcIiwgbmFtZTogXCJuYW1lXCIsIHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogZm9ybURhdGEubmFtZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMubmFtZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgcGxhY2Vob2xkZXI6IFwiSm9obiBEb2VcIiB9KSwgZXJyb3JzLm5hbWUgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5uYW1lIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJlbWFpbFwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkVtYWlsIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJlbWFpbFwiLCBuYW1lOiBcImVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiwgdmFsdWU6IGZvcm1EYXRhLmVtYWlsLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5lbWFpbCA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgcGxhY2Vob2xkZXI6IFwiam9obi5kb2VAZXhhbXBsZS5jb21cIiB9KSwgZXJyb3JzLmVtYWlsICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuZW1haWwgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicHQtNCBib3JkZXItdCBib3JkZXItZ3JheS0yMDBcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwIG1iLTRcIiwgY2hpbGRyZW46IFwiQ2hhbmdlIFBhc3N3b3JkXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTUwMCBtYi00XCIsIGNoaWxkcmVuOiBcIkxlYXZlIGJsYW5rIHRvIGtlZXAgeW91ciBjdXJyZW50IHBhc3N3b3JkXCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcInBhc3N3b3JkXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJOZXcgUGFzc3dvcmRcIiB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJwYXNzd29yZFwiLCBuYW1lOiBcInBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiwgdmFsdWU6IGZvcm1EYXRhLnBhc3N3b3JkLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5wYXNzd29yZCA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgcGxhY2Vob2xkZXI6IFwiRW50ZXIgbmV3IHBhc3N3b3JkXCIgfSksIGVycm9ycy5wYXNzd29yZCAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLnBhc3N3b3JkIH0pKSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyB0ZXh0LWdyYXktNTAwIG10LTFcIiwgY2hpbGRyZW46IFwiTXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgd2l0aCB1cHBlcmNhc2UsIGxvd2VyY2FzZSwgYW5kIG51bWJlclwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwicGFzc3dvcmRfY29uZmlybWF0aW9uXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJDb25maXJtIE5ldyBQYXNzd29yZFwiIH0pLCBfanN4KElucHV0LCB7IGlkOiBcInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiLCBuYW1lOiBcInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiLCB0eXBlOiBcInBhc3N3b3JkXCIsIHZhbHVlOiBmb3JtRGF0YS5wYXNzd29yZF9jb25maXJtYXRpb24sIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBuZXcgcGFzc3dvcmRcIiB9KSwgZXJyb3JzLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiB9KSldIH0pXSB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWVuZCBwdC00IGJvcmRlci10IGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogX2pzeChCdXR0b24sIHsgdHlwZTogXCJzdWJtaXRcIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2hpbGRyZW46IGlzU3VibWl0dGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgQ2hhbmdlcycgfSkgfSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBQcm9maWxlRm9ybTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNuIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlsc1wiO1xuY29uc3QgSW5wdXQgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgdHlwZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgcmV0dXJuIChfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiB0eXBlLCBjbGFzc05hbWU6IGNuKFwiZmxleCBoLTEwIHctZnVsbCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItaW5wdXQgYmctYmFja2dyb3VuZCBweC0zIHB5LTIgdGV4dC1zbSByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIGZpbGU6Ym9yZGVyLTAgZmlsZTpiZy10cmFuc3BhcmVudCBmaWxlOnRleHQtc20gZmlsZTpmb250LW1lZGl1bSBwbGFjZWhvbGRlcjp0ZXh0LW11dGVkLWZvcmVncm91bmQgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXJpbmcgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC0yIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXCIsIGNsYXNzTmFtZSksIHJlZjogcmVmLCAuLi5wcm9wcyB9KSk7XG59KTtcbklucHV0LmRpc3BsYXlOYW1lID0gXCJJbnB1dFwiO1xuZXhwb3J0IHsgSW5wdXQgfTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJ1aWxkaW5nMiwgQmVsbCwgVXNlciwgQXJjaGl2ZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvY2FyZCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2J1dHRvbic7XG5pbXBvcnQgQ2h1cmNoRGV0YWlsc0Zvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9zZXR0aW5ncy9DaHVyY2hEZXRhaWxzRm9ybSc7XG5pbXBvcnQgTm90aWZpY2F0aW9uVG9nZ2xlcyBmcm9tICcuLi9jb21wb25lbnRzL3NldHRpbmdzL05vdGlmaWNhdGlvblRvZ2dsZXMnO1xuaW1wb3J0IFByb2ZpbGVGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvc2V0dGluZ3MvUHJvZmlsZUZvcm0nO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gJy4uL2NvbnRleHRzL0F1dGhDb250ZXh0Jztcbi8qKlxuICogU2V0dGluZ3MgUGFnZSBDb21wb25lbnRcbiAqXG4gKiBQcm92aWRlcyBjb25maWd1cmF0aW9uIGludGVyZmFjZSBmb3IgY2h1cmNoIHNldHRpbmdzLCBub3RpZmljYXRpb25zLCBhbmQgdXNlciBwcm9maWxlLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBUYWJiZWQgaW50ZXJmYWNlIGZvciBDaHVyY2ggRGV0YWlscywgTm90aWZpY2F0aW9ucywgYW5kIFByb2ZpbGUgc2VjdGlvbnNcbiAqIC0gQ2h1cmNoIERldGFpbHM6IENvbmZpZ3VyZSBjaHVyY2ggbmFtZSwgYWRkcmVzcywgY29udGFjdCBpbmZvLCBhbmQgc2VydmljZSB0aW1lc1xuICogLSBOb3RpZmljYXRpb25zOiBUb2dnbGUgZW1haWwgbm90aWZpY2F0aW9ucywgU01TIGFsZXJ0cywgYW5kIHN5c3RlbSBhbm5vdW5jZW1lbnRzXG4gKiAtIFByb2ZpbGU6IEVkaXQgdXNlciBwcm9maWxlIGluY2x1ZGluZyBuYW1lLCBlbWFpbCwgYW5kIHBhc3N3b3JkXG4gKiAtIEFyY2hpdmUgTWFuYWdlbWVudDogTGluayB0byBhcmNoaXZlIG1hbmFnZW1lbnQgcGFnZSAoYWRtaW4gb25seSlcbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiA2LjEsIDYuMiwgNi4zXG4gKi9cbmNvbnN0IFNldHRpbmdzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdXNlciB9ID0gdXNlQXV0aCgpO1xuICAgIGNvbnN0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcbiAgICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2NodXJjaCcpO1xuICAgIGNvbnN0IGlzQWRtaW4gPSB1c2VyPy5yb2xlID09PSAnYWRtaW4nO1xuICAgIGNvbnN0IHRhYnMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnY2h1cmNoJyxcbiAgICAgICAgICAgIG5hbWU6ICdDaHVyY2ggRGV0YWlscycsXG4gICAgICAgICAgICBpY29uOiBCdWlsZGluZzIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0NvbmZpZ3VyZSBjaHVyY2ggaW5mb3JtYXRpb24gYW5kIHNlcnZpY2UgdGltZXMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICBuYW1lOiAnTm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICBpY29uOiBCZWxsLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdNYW5hZ2Ugbm90aWZpY2F0aW9uIHByZWZlcmVuY2VzJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ3Byb2ZpbGUnLFxuICAgICAgICAgICAgbmFtZTogJ1Byb2ZpbGUnLFxuICAgICAgICAgICAgaWNvbjogVXNlcixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVXBkYXRlIHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24nXG4gICAgICAgIH0sXG4gICAgXTtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1iLThcIiwgY2hpbGRyZW46IFtfanN4KFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiU2V0dGluZ3NcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMiB0ZXh0LWdyYXktNjAwXCIsIGNoaWxkcmVuOiBcIk1hbmFnZSBjaHVyY2ggc2V0dGluZ3MsIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcywgYW5kIHlvdXIgcHJvZmlsZS5cIiB9KV0gfSksIGlzQWRtaW4gJiYgKF9qc3goQ2FyZCwgeyBjbGFzc05hbWU6IFwicC00IGJnLW9yYW5nZS01MCBib3JkZXItb3JhbmdlLTIwMFwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTAgdy0xMCBoLTEwIHJvdW5kZWQtZnVsbCBiZy1vcmFuZ2UtMTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIGNoaWxkcmVuOiBfanN4KEFyY2hpdmUsIHsgY2xhc3NOYW1lOiBcImgtNSB3LTUgdGV4dC1vcmFuZ2UtNjAwXCIgfSkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1sLTRcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiQXJjaGl2ZSBNYW5hZ2VtZW50XCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogXCJWaWV3IGFuZCBtYW5hZ2UgYXJjaGl2ZWQgaXRlbXNcIiB9KV0gfSldIH0pLCBfanN4cyhCdXR0b24sIHsgdmFyaWFudDogXCJvdXRsaW5lXCIsIHNpemU6IFwic21cIiwgb25DbGljazogKCkgPT4gbmF2aWdhdGUoJy9hcmNoaXZlLW1hbmFnZW1lbnQnKSwgY2xhc3NOYW1lOiBcImJvcmRlci1vcmFuZ2UtMzAwIGhvdmVyOmJnLW9yYW5nZS0xMDBcIiwgY2hpbGRyZW46IFtfanN4KEFyY2hpdmUsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMlwiIH0pLCBcIk9wZW4gQXJjaGl2ZVwiXSB9KV0gfSkgfSkpLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJvcmRlci1iIGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogX2pzeChcIm5hdlwiLCB7IGNsYXNzTmFtZTogXCItbWItcHggZmxleCBzcGFjZS14LThcIiwgY2hpbGRyZW46IHRhYnMubWFwKCh0YWIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IEljb24gPSB0YWIuaWNvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlVGFiID09PSB0YWIuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3hzKFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0QWN0aXZlVGFiKHRhYi5pZCksIGNsYXNzTmFtZTogYFxyXG4gICAgICAgICAgICAgICAgICBncm91cCBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgcHktNCBweC0xIGJvcmRlci1iLTIgZm9udC1tZWRpdW0gdGV4dC1zbVxyXG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0xNTAgZWFzZS1pbi1vdXRcclxuICAgICAgICAgICAgICAgICAgJHtpc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItcHJpbWFyeS01MDAgdGV4dC1wcmltYXJ5LTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtZ3JheS01MDAgaG92ZXI6dGV4dC1ncmF5LTcwMCBob3Zlcjpib3JkZXItZ3JheS0zMDAnfVxyXG4gICAgICAgICAgICAgICAgYCwgY2hpbGRyZW46IFtfanN4KEljb24sIHsgY2xhc3NOYW1lOiBgXHJcbiAgICAgICAgICAgICAgICAgICAgbXItMiBoLTUgdy01XHJcbiAgICAgICAgICAgICAgICAgICAgJHtpc0FjdGl2ZSA/ICd0ZXh0LXByaW1hcnktNjAwJyA6ICd0ZXh0LWdyYXktNDAwIGdyb3VwLWhvdmVyOnRleHQtZ3JheS01MDAnfVxyXG4gICAgICAgICAgICAgICAgICBgIH0pLCB0YWIubmFtZV0gfSwgdGFiLmlkKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtdC02XCIsIGNoaWxkcmVuOiBbYWN0aXZlVGFiID09PSAnY2h1cmNoJyAmJiAoX2pzeChDYXJkLCB7IGNsYXNzTmFtZTogXCJwLTZcIiwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIGZsZXggaXRlbXMtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChCdWlsZGluZzIsIHsgY2xhc3NOYW1lOiBcIm1yLTIgaC01IHctNSB0ZXh0LXByaW1hcnktNjAwXCIgfSksIFwiQ2h1cmNoIERldGFpbHNcIl0gfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTEgdGV4dC1zbSB0ZXh0LWdyYXktNjAwXCIsIGNoaWxkcmVuOiBcIkNvbmZpZ3VyZSB5b3VyIGNodXJjaCdzIGJhc2ljIGluZm9ybWF0aW9uIGFuZCBzZXJ2aWNlIHRpbWVzLlwiIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJib3JkZXItdCBib3JkZXItZ3JheS0yMDAgcHQtNlwiLCBjaGlsZHJlbjogX2pzeChDaHVyY2hEZXRhaWxzRm9ybSwge30pIH0pXSB9KSB9KSksIGFjdGl2ZVRhYiA9PT0gJ25vdGlmaWNhdGlvbnMnICYmIChfanN4KENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgZmxleCBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KEJlbGwsIHsgY2xhc3NOYW1lOiBcIm1yLTIgaC01IHctNSB0ZXh0LXByaW1hcnktNjAwXCIgfSksIFwiTm90aWZpY2F0aW9uIFByZWZlcmVuY2VzXCJdIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJtdC0xIHRleHQtc20gdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogXCJNYW5hZ2UgaG93IHlvdSByZWNlaXZlIG5vdGlmaWNhdGlvbnMgYW5kIGFsZXJ0cy5cIiB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwIHB0LTZcIiwgY2hpbGRyZW46IF9qc3goTm90aWZpY2F0aW9uVG9nZ2xlcywge30pIH0pXSB9KSB9KSksIGFjdGl2ZVRhYiA9PT0gJ3Byb2ZpbGUnICYmIChfanN4KENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgZmxleCBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFVzZXIsIHsgY2xhc3NOYW1lOiBcIm1yLTIgaC01IHctNSB0ZXh0LXByaW1hcnktNjAwXCIgfSksIFwiVXNlciBQcm9maWxlXCJdIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJtdC0xIHRleHQtc20gdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogXCJVcGRhdGUgeW91ciBwZXJzb25hbCBpbmZvcm1hdGlvbiBhbmQgYWNjb3VudCBzZXR0aW5ncy5cIiB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwIHB0LTZcIiwgY2hpbGRyZW46IF9qc3goUHJvZmlsZUZvcm0sIHt9KSB9KV0gfSkgfSkpXSB9KV0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdzO1xuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJyZWN0XCIsIHsgd2lkdGg6IFwiMjBcIiwgaGVpZ2h0OiBcIjVcIiwgeDogXCIyXCIsIHk6IFwiM1wiLCByeDogXCIxXCIsIGtleTogXCIxd3AxdTFcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTQgOHYxMWEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOFwiLCBrZXk6IFwiMXM4MGpwXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMCAxMmg0XCIsIGtleTogXCJhNTZiMHBcIiB9XVxuXTtcbmNvbnN0IEFyY2hpdmUgPSBjcmVhdGVMdWNpZGVJY29uKFwiYXJjaGl2ZVwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQXJjaGl2ZSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcmNoaXZlLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTAuMjY4IDIxYTIgMiAwIDAgMCAzLjQ2NCAwXCIsIGtleTogXCJ2d3ZidDlcIiB9XSxcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTMuMjYyIDE1LjMyNkExIDEgMCAwIDAgNCAxN2gxNmExIDEgMCAwIDAgLjc0LTEuNjczQzE5LjQxIDEzLjk1NiAxOCAxMi40OTkgMTggOEE2IDYgMCAwIDAgNiA4YzAgNC40OTktMS40MTEgNS45NTYtMi43MzggNy4zMjZcIixcbiAgICAgIGtleTogXCIxMWc5dmlcIlxuICAgIH1cbiAgXVxuXTtcbmNvbnN0IEJlbGwgPSBjcmVhdGVMdWNpZGVJY29uKFwiYmVsbFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQmVsbCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iZWxsLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTAgMTJoNFwiLCBrZXk6IFwiYTU2YjBwXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMCA4aDRcIiwga2V5OiBcIjFzcjJhZlwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTQgMjF2LTNhMiAyIDAgMCAwLTQgMHYzXCIsIGtleTogXCIxcmdpZWlcIiB9XSxcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTYgMTBINGEyIDIgMCAwIDAtMiAydjdhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0yVjlhMiAyIDAgMCAwLTItMmgtMlwiLFxuICAgICAga2V5OiBcInNlY21pMlwiXG4gICAgfVxuICBdLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNNiAyMVY1YTIgMiAwIDAgMSAyLTJoOGEyIDIgMCAwIDEgMiAydjE2XCIsIGtleTogXCIxNnJhMHRcIiB9XVxuXTtcbmNvbnN0IEJ1aWxkaW5nMiA9IGNyZWF0ZUx1Y2lkZUljb24oXCJidWlsZGluZy0yXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBCdWlsZGluZzIgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVpbGRpbmctMi5qcy5tYXBcbiJdLCJuYW1lcyI6WyJlIiwidCIsInIiLCJTeW1ib2wiLCJuIiwiaXRlcmF0b3IiLCJvIiwidG9TdHJpbmdUYWciLCJpIiwiYyIsInByb3RvdHlwZSIsIkdlbmVyYXRvciIsInUiLCJPYmplY3QiLCJjcmVhdGUiLCJfcmVnZW5lcmF0b3JEZWZpbmUyIiwiZiIsInAiLCJ5IiwiRyIsInYiLCJhIiwiZCIsImJpbmQiLCJsZW5ndGgiLCJsIiwiVHlwZUVycm9yIiwiY2FsbCIsImRvbmUiLCJ2YWx1ZSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGlzcGxheU5hbWUiLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9zbGljZWRUb0FycmF5IiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkFycmF5IiwiZnJvbSIsInRlc3QiLCJuZXh0IiwicHVzaCIsImlzQXJyYXkiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJCdXR0b24iLCJJbnB1dCIsInVzZVRvYXN0IiwiYXBpIiwiQ2h1cmNoRGV0YWlsc0Zvcm0iLCJfdXNlVG9hc3QiLCJzaG93VG9hc3QiLCJfdXNlU3RhdGUiLCJjaHVyY2hfbmFtZSIsImFkZHJlc3MiLCJjaXR5Iiwic3RhdGUiLCJ6aXBfY29kZSIsInBob25lIiwiZW1haWwiLCJ3ZWJzaXRlIiwic2VydmljZV90aW1lcyIsIl91c2VTdGF0ZTIiLCJmb3JtRGF0YSIsInNldEZvcm1EYXRhIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJlcnJvcnMiLCJzZXRFcnJvcnMiLCJfdXNlU3RhdGU1IiwiX3VzZVN0YXRlNiIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsIl91c2VTdGF0ZTciLCJfdXNlU3RhdGU4IiwiaXNTdWJtaXR0aW5nIiwic2V0SXNTdWJtaXR0aW5nIiwibG9hZENodXJjaFNldHRpbmdzIiwiX3JlZiIsIl9jYWxsZWUiLCJyZXNwb25zZSIsInNldHRpbmdzIiwiX3QiLCJfY29udGV4dCIsImdldCIsImRhdGEiLCJzdWNjZXNzIiwiY29uc29sZSIsImVycm9yIiwidmFsaWRhdGVGb3JtIiwibmV3RXJyb3JzIiwidHJpbSIsImtleXMiLCJoYW5kbGVDaGFuZ2UiLCJfZSR0YXJnZXQiLCJ0YXJnZXQiLCJwcmV2IiwiX29iamVjdFNwcmVhZCIsIl9kZWZpbmVQcm9wZXJ0eSIsInVuZGVmaW5lZCIsImhhbmRsZVN1Ym1pdCIsIl9yZWYyIiwiX2NhbGxlZTIiLCJfZXJyb3IkcmVzcG9uc2UiLCJfZXJyb3IkcmVzcG9uc2UyIiwiX3QyIiwiX2NvbnRleHQyIiwicHJldmVudERlZmF1bHQiLCJwdXQiLCJtZXNzYWdlIiwiX3giLCJjbGFzc05hbWUiLCJjaGlsZHJlbiIsIm9uU3VibWl0IiwiaHRtbEZvciIsImlkIiwidHlwZSIsIm9uQ2hhbmdlIiwiZGlzYWJsZWQiLCJwbGFjZWhvbGRlciIsImNvbmNhdCIsInJvd3MiLCJOb3RpZmljYXRpb25Ub2dnbGVzIiwiZW1haWxfbm90aWZpY2F0aW9ucyIsInNtc19ub3RpZmljYXRpb25zIiwic3lzdGVtX25vdGlmaWNhdGlvbnMiLCJwcmVmZXJlbmNlcyIsInNldFByZWZlcmVuY2VzIiwibG9hZE5vdGlmaWNhdGlvblByZWZlcmVuY2VzIiwiaGFuZGxlVG9nZ2xlIiwia2V5Iiwib25DbGljayIsInJvbGUiLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZmlsdGVyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZm9yRWFjaCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJ1c2VBdXRoIiwiUHJvZmlsZUZvcm0iLCJfdXNlQXV0aCIsInVzZXIiLCJwYXNzd29yZCIsInBhc3N3b3JkX2NvbmZpcm1hdGlvbiIsInZhbGlkYXRlUGFzc3dvcmQiLCJwYXNzd29yZEVycm9yIiwiZGF0YVRvU2VuZCIsInVwZGF0ZWRVc2VyIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJSZWFjdCIsImNuIiwiZm9yd2FyZFJlZiIsInJlZiIsInByb3BzIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiX2V4Y2x1ZGVkIiwiQnVpbGRpbmcyIiwiQmVsbCIsIlVzZXIiLCJBcmNoaXZlIiwidXNlTmF2aWdhdGUiLCJDYXJkIiwiU2V0dGluZ3MiLCJuYXZpZ2F0ZSIsImFjdGl2ZVRhYiIsInNldEFjdGl2ZVRhYiIsImlzQWRtaW4iLCJ0YWJzIiwiaWNvbiIsImRlc2NyaXB0aW9uIiwidmFyaWFudCIsInNpemUiLCJtYXAiLCJ0YWIiLCJJY29uIiwiaXNBY3RpdmUiXSwic291cmNlUm9vdCI6IiJ9