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
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/bell.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/building-2.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user.js");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _components_settings_ChurchDetailsForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/settings/ChurchDetailsForm */ "./resources/js/components/settings/ChurchDetailsForm.tsx");
/* harmony import */ var _components_settings_NotificationToggles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/settings/NotificationToggles */ "./resources/js/components/settings/NotificationToggles.tsx");
/* harmony import */ var _components_settings_ProfileForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/settings/ProfileForm */ "./resources/js/components/settings/ProfileForm.tsx");
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
 *
 * Validates Requirements: 6.1, 6.2, 6.3
 */
var Settings = function Settings() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('church'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var tabs = [{
    id: 'church',
    name: 'Church Details',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"],
    description: 'Configure church information and service times'
  }, {
    id: 'notifications',
    name: 'Notifications',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"],
    description: 'Manage notification preferences'
  }, {
    id: 'profile',
    name: 'Profile',
    icon: lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"],
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
      children: [activeTab === 'church' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_5__.Card, {
        className: "p-6",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
              className: "text-xl font-semibold text-gray-900 flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                className: "mr-2 h-5 w-5 text-primary-600"
              }), "Church Details"]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-gray-600",
              children: "Configure your church's basic information and service times."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "border-t border-gray-200 pt-6",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_settings_ChurchDetailsForm__WEBPACK_IMPORTED_MODULE_6__["default"], {})
          })]
        })
      }), activeTab === 'notifications' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_5__.Card, {
        className: "p-6",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
              className: "text-xl font-semibold text-gray-900 flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
                className: "mr-2 h-5 w-5 text-primary-600"
              }), "Notification Preferences"]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-gray-600",
              children: "Manage how you receive notifications and alerts."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "border-t border-gray-200 pt-6",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_settings_NotificationToggles__WEBPACK_IMPORTED_MODULE_7__["default"], {})
          })]
        })
      }), activeTab === 'profile' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_5__.Card, {
        className: "p-6",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
              className: "text-xl font-semibold text-gray-900 flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                className: "mr-2 h-5 w-5 text-primary-600"
              }), "User Profile"]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "mt-1 text-sm text-gray-600",
              children: "Update your personal information and account settings."
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "border-t border-gray-200 pt-6",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_settings_ProfileForm__WEBPACK_IMPORTED_MODULE_8__["default"], {})
          })]
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX1NldHRpbmdzX3RzeC5qcz9pZD1mMzMxZGVhNTJkZTdmZjQ3IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNBLHVLQUFBQSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBRSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBSSxDQUFBLE1BQUFDLENBQUEsR0FBQVgsQ0FBQSxRQUFBWSxDQUFBLE9BQUFDLENBQUEsS0FBQUYsQ0FBQSxLQUFBYixDQUFBLEtBQUFnQixDQUFBLEVBQUFwQixDQUFBLEVBQUFxQixDQUFBLEVBQUFDLENBQUEsRUFBQU4sQ0FBQSxFQUFBTSxDQUFBLENBQUFDLElBQUEsQ0FBQXZCLENBQUEsTUFBQXNCLENBQUEsV0FBQUEsRUFBQXJCLENBQUEsRUFBQUMsQ0FBQSxXQUFBTSxDQUFBLEdBQUFQLENBQUEsRUFBQVEsQ0FBQSxNQUFBRyxDQUFBLEdBQUFaLENBQUEsRUFBQW1CLENBQUEsQ0FBQWYsQ0FBQSxHQUFBRixDQUFBLEVBQUFtQixDQUFBLGdCQUFBQyxFQUFBcEIsQ0FBQSxFQUFBRSxDQUFBLFNBQUFLLENBQUEsR0FBQVAsQ0FBQSxFQUFBVSxDQUFBLEdBQUFS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OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXNEOztBQUV0RDtBQUNBLGFBQWEsOEJBQThCO0FBQzNDLGFBQWEsNkJBQTZCO0FBQzFDLGFBQWEsK0NBQStDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw4REFBOEQ7QUFDM0U7QUFDQSxrQkFBa0IsZ0VBQWdCOztBQUVVO0FBQzVDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc2V0dGluZ3MvQ2h1cmNoRGV0YWlsc0Zvcm0udHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NldHRpbmdzL05vdGlmaWNhdGlvblRvZ2dsZXMudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NldHRpbmdzL1Byb2ZpbGVGb3JtLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9pbnB1dC50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL3BhZ2VzL1NldHRpbmdzLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2JlbGwuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9idWlsZGluZy0yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vdWkvYnV0dG9uJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi4vdWkvaW5wdXQnO1xuaW1wb3J0IHsgdXNlVG9hc3QgfSBmcm9tICcuLi8uLi9jb250ZXh0cy9Ub2FzdENvbnRleHQnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9saWIvYXBpJztcbi8qKlxuICogQ2h1cmNoRGV0YWlsc0Zvcm0gQ29tcG9uZW50XG4gKlxuICogRm9ybSBmb3IgbWFuYWdpbmcgY2h1cmNoIGluZm9ybWF0aW9uIGluY2x1ZGluZyBuYW1lLCBhZGRyZXNzLCBjb250YWN0IGRldGFpbHMsIGFuZCBzZXJ2aWNlIHRpbWVzLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBJbnB1dCBmaWVsZHMgZm9yIGFsbCBjaHVyY2ggZGV0YWlsc1xuICogLSBGb3JtIHZhbGlkYXRpb24gd2l0aCBpbmxpbmUgZXJyb3IgbWVzc2FnZXNcbiAqIC0gTG9hZHMgZXhpc3RpbmcgY2h1cmNoIHNldHRpbmdzIG9uIG1vdW50XG4gKiAtIERpc3BsYXlzIHN1Y2Nlc3MvZXJyb3IgbWVzc2FnZXMgdmlhIHRvYXN0IG5vdGlmaWNhdGlvbnNcbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiA2LjEsIDYuNFxuICovXG5jb25zdCBDaHVyY2hEZXRhaWxzRm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNob3dUb2FzdCB9ID0gdXNlVG9hc3QoKTtcbiAgICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgY2h1cmNoX25hbWU6ICcnLFxuICAgICAgICBhZGRyZXNzOiAnJyxcbiAgICAgICAgY2l0eTogJycsXG4gICAgICAgIHN0YXRlOiAnJyxcbiAgICAgICAgemlwX2NvZGU6ICcnLFxuICAgICAgICBwaG9uZTogJycsXG4gICAgICAgIGVtYWlsOiAnJyxcbiAgICAgICAgd2Vic2l0ZTogJycsXG4gICAgICAgIHNlcnZpY2VfdGltZXM6ICcnLFxuICAgIH0pO1xuICAgIGNvbnN0IFtlcnJvcnMsIHNldEVycm9yc10gPSB1c2VTdGF0ZSh7fSk7XG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtpc1N1Ym1pdHRpbmcsIHNldElzU3VibWl0dGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgLyoqXG4gICAgICogTG9hZCBjaHVyY2ggc2V0dGluZ3Mgb24gY29tcG9uZW50IG1vdW50XG4gICAgICovXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgbG9hZENodXJjaFNldHRpbmdzKCk7XG4gICAgfSwgW10pO1xuICAgIC8qKlxuICAgICAqIEZldGNoIGNodXJjaCBzZXR0aW5ncyBmcm9tIEFQSVxuICAgICAqL1xuICAgIGNvbnN0IGxvYWRDaHVyY2hTZXR0aW5ncyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL3NldHRpbmdzL2NodXJjaCcpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2VzcyAmJiByZXNwb25zZS5kYXRhLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGNodXJjaF9uYW1lOiBzZXR0aW5ncy5jaHVyY2hfbmFtZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogc2V0dGluZ3MuYWRkcmVzcyB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgY2l0eTogc2V0dGluZ3MuY2l0eSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHNldHRpbmdzLnN0YXRlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICB6aXBfY29kZTogc2V0dGluZ3MuemlwX2NvZGUgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBzZXR0aW5ncy5waG9uZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHNldHRpbmdzLmVtYWlsIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICB3ZWJzaXRlOiBzZXR0aW5ncy53ZWJzaXRlIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlX3RpbWVzOiBzZXR0aW5ncy5zZXJ2aWNlX3RpbWVzIHx8ICcnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgY2h1cmNoIHNldHRpbmdzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIGxvYWQgY2h1cmNoIHNldHRpbmdzJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBmb3JtIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdCB2YWxpZGF0ZUZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0Vycm9ycyA9IHt9O1xuICAgICAgICAvLyBSZXF1aXJlZCBmaWVsZHNcbiAgICAgICAgaWYgKCFmb3JtRGF0YS5jaHVyY2hfbmFtZS50cmltKCkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5jaHVyY2hfbmFtZSA9ICdDaHVyY2ggbmFtZSBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZm9ybURhdGEuY2h1cmNoX25hbWUubGVuZ3RoID4gMjAwKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuY2h1cmNoX25hbWUgPSAnQ2h1cmNoIG5hbWUgbXVzdCBiZSAyMDAgY2hhcmFjdGVycyBvciBsZXNzJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLmFkZHJlc3MudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuYWRkcmVzcyA9ICdBZGRyZXNzIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtRGF0YS5hZGRyZXNzLmxlbmd0aCA+IDIwMCkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmFkZHJlc3MgPSAnQWRkcmVzcyBtdXN0IGJlIDIwMCBjaGFyYWN0ZXJzIG9yIGxlc3MnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEuY2l0eS50cmltKCkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5jaXR5ID0gJ0NpdHkgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEuc3RhdGUudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuc3RhdGUgPSAnU3RhdGUgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEuemlwX2NvZGUudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuemlwX2NvZGUgPSAnWmlwIGNvZGUgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEucGhvbmUudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMucGhvbmUgPSAnUGhvbmUgbnVtYmVyIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghL15bXFxkXFxzXFwtXFwrXFwoXFwpXSskLy50ZXN0KGZvcm1EYXRhLnBob25lKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLnBob25lID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIHBob25lIG51bWJlcic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5lbWFpbC50cmltKCkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5lbWFpbCA9ICdFbWFpbCBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIS9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvLnRlc3QoZm9ybURhdGEuZW1haWwpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuZW1haWwgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3B0aW9uYWwgd2Vic2l0ZSB2YWxpZGF0aW9uXG4gICAgICAgIGlmIChmb3JtRGF0YS53ZWJzaXRlICYmICEvXmh0dHBzPzpcXC9cXC8uKy8udGVzdChmb3JtRGF0YS53ZWJzaXRlKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLndlYnNpdGUgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgVVJMIChlLmcuLCBodHRwczovL2V4YW1wbGUuY29tKSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5zZXJ2aWNlX3RpbWVzLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLnNlcnZpY2VfdGltZXMgPSAnU2VydmljZSB0aW1lcyBhcmUgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZvcm1EYXRhLnNlcnZpY2VfdGltZXMubGVuZ3RoID4gNTAwKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuc2VydmljZV90aW1lcyA9ICdTZXJ2aWNlIHRpbWVzIG11c3QgYmUgNTAwIGNoYXJhY3RlcnMgb3IgbGVzcyc7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RXJyb3JzKG5ld0Vycm9ycyk7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhuZXdFcnJvcnMpLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBpbnB1dCBjaGFuZ2VcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSBlLnRhcmdldDtcbiAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgW25hbWVdOiB2YWx1ZSxcbiAgICAgICAgfSkpO1xuICAgICAgICAvLyBDbGVhciBlcnJvciBmb3IgdGhpcyBmaWVsZCB3aGVuIHVzZXIgc3RhcnRzIHR5cGluZ1xuICAgICAgICBpZiAoZXJyb3JzW25hbWVdKSB7XG4gICAgICAgICAgICBzZXRFcnJvcnMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICBbbmFtZV06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGZvcm0gc3VibWlzc2lvblxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZUZvcm0oKSkge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdQbGVhc2UgY29ycmVjdCB0aGUgZXJyb3JzIGluIHRoZSBmb3JtJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KCcvc2V0dGluZ3MvY2h1cmNoJywgZm9ybURhdGEpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdDaHVyY2ggc2V0dGluZ3Mgc2F2ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2F2ZSBjaHVyY2ggc2V0dGluZ3M6JywgZXJyb3IpO1xuICAgICAgICAgICAgLy8gSGFuZGxlIHNlcnZlci1zaWRlIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2U/LmRhdGE/LmVycm9ycykge1xuICAgICAgICAgICAgICAgIHNldEVycm9ycyhlcnJvci5yZXNwb25zZS5kYXRhLmVycm9ycyk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdQbGVhc2UgY29ycmVjdCB0aGUgZXJyb3JzIGluIHRoZSBmb3JtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBzYXZlIGNodXJjaCBzZXR0aW5ncycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHktMTJcIiwgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTUwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nIGNodXJjaCBzZXR0aW5ncy4uLlwiIH0pIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIChfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImNodXJjaF9uYW1lXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiQ2h1cmNoIE5hbWUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcImNodXJjaF9uYW1lXCIsIG5hbWU6IFwiY2h1cmNoX25hbWVcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5jaHVyY2hfbmFtZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMuY2h1cmNoX25hbWUgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIHBsYWNlaG9sZGVyOiBcIk1haGF5YWhheSBGcmVlIE1ldGhvZGlzdCBDaHVyY2hcIiB9KSwgZXJyb3JzLmNodXJjaF9uYW1lICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuY2h1cmNoX25hbWUgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImFkZHJlc3NcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJBZGRyZXNzIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJhZGRyZXNzXCIsIG5hbWU6IFwiYWRkcmVzc1wiLCB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGZvcm1EYXRhLmFkZHJlc3MsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmFkZHJlc3MgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIHBsYWNlaG9sZGVyOiBcIjEyMyBNYWluIFN0cmVldFwiIH0pLCBlcnJvcnMuYWRkcmVzcyAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmFkZHJlc3MgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJjaXR5XCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiQ2l0eSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwiY2l0eVwiLCBuYW1lOiBcImNpdHlcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5jaXR5LCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5jaXR5ID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCJNYWhheWFoYXlcIiB9KSwgZXJyb3JzLmNpdHkgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5jaXR5IH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJzdGF0ZVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIlN0YXRlL1Byb3ZpbmNlIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJzdGF0ZVwiLCBuYW1lOiBcInN0YXRlXCIsIHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogZm9ybURhdGEuc3RhdGUsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLnN0YXRlID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCJTdXJpZ2FvIGRlbCBTdXJcIiB9KSwgZXJyb3JzLnN0YXRlICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuc3RhdGUgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcInppcF9jb2RlXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiWmlwIENvZGUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcInppcF9jb2RlXCIsIG5hbWU6IFwiemlwX2NvZGVcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS56aXBfY29kZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMuemlwX2NvZGUgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIHBsYWNlaG9sZGVyOiBcIjgzMDVcIiB9KSwgZXJyb3JzLnppcF9jb2RlICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuemlwX2NvZGUgfSkpXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwicGhvbmVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJQaG9uZSBOdW1iZXIgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcInBob25lXCIsIG5hbWU6IFwicGhvbmVcIiwgdHlwZTogXCJ0ZWxcIiwgdmFsdWU6IGZvcm1EYXRhLnBob25lLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5waG9uZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgcGxhY2Vob2xkZXI6IFwiKzYzIDEyMyA0NTYgNzg5MFwiIH0pLCBlcnJvcnMucGhvbmUgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5waG9uZSB9KSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwiZW1haWxcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJFbWFpbCBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwiZW1haWxcIiwgbmFtZTogXCJlbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIsIHZhbHVlOiBmb3JtRGF0YS5lbWFpbCwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMuZW1haWwgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIHBsYWNlaG9sZGVyOiBcImluZm9AbWFoYXlhaGF5ZnJlZW1ldGhvZGlzdC5vcmdcIiB9KSwgZXJyb3JzLmVtYWlsICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuZW1haWwgfSkpXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcIndlYnNpdGVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIldlYnNpdGVcIiB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJ3ZWJzaXRlXCIsIG5hbWU6IFwid2Vic2l0ZVwiLCB0eXBlOiBcInVybFwiLCB2YWx1ZTogZm9ybURhdGEud2Vic2l0ZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMud2Vic2l0ZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgcGxhY2Vob2xkZXI6IFwiaHR0cHM6Ly93d3cubWFoYXlhaGF5ZnJlZW1ldGhvZGlzdC5vcmdcIiB9KSwgZXJyb3JzLndlYnNpdGUgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy53ZWJzaXRlIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJzZXJ2aWNlX3RpbWVzXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiU2VydmljZSBUaW1lcyBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goXCJ0ZXh0YXJlYVwiLCB7IGlkOiBcInNlcnZpY2VfdGltZXNcIiwgbmFtZTogXCJzZXJ2aWNlX3RpbWVzXCIsIHZhbHVlOiBmb3JtRGF0YS5zZXJ2aWNlX3RpbWVzLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGBmbGV4IG1pbi1oLVsxMDBweF0gdy1mdWxsIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1pbnB1dCBiZy1iYWNrZ3JvdW5kIHB4LTMgcHktMiB0ZXh0LXNtIHJpbmctb2Zmc2V0LWJhY2tncm91bmQgcGxhY2Vob2xkZXI6dGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1yaW5nIGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtMiBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS01MCAke2Vycm9ycy5zZXJ2aWNlX3RpbWVzID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnfWAsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIHBsYWNlaG9sZGVyOiBcIlN1bmRheSBXb3JzaGlwOiA5OjAwIEFNXFxuU3VuZGF5IFNjaG9vbDogMTA6MzAgQU1cXG5XZWRuZXNkYXkgUHJheWVyOiA3OjAwIFBNXCIsIHJvd3M6IDQgfSksIGVycm9ycy5zZXJ2aWNlX3RpbWVzICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuc2VydmljZV90aW1lcyB9KSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteHMgdGV4dC1ncmF5LTUwMCBtdC0xXCIsIGNoaWxkcmVuOiBcIkVudGVyIHNlcnZpY2UgdGltZXMsIG9uZSBwZXIgbGluZVwiIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktZW5kIHB0LTQgYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBfanN4KEJ1dHRvbiwgeyB0eXBlOiBcInN1Ym1pdFwiLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBjaGlsZHJlbjogaXNTdWJtaXR0aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSBDaGFuZ2VzJyB9KSB9KV0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IENodXJjaERldGFpbHNGb3JtO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi91aS9idXR0b24nO1xuaW1wb3J0IHsgdXNlVG9hc3QgfSBmcm9tICcuLi8uLi9jb250ZXh0cy9Ub2FzdENvbnRleHQnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9saWIvYXBpJztcbi8qKlxuICogTm90aWZpY2F0aW9uVG9nZ2xlcyBDb21wb25lbnRcbiAqXG4gKiBQcm92aWRlcyB0b2dnbGUgc3dpdGNoZXMgZm9yIG1hbmFnaW5nIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcyBpbmNsdWRpbmdcbiAqIGVtYWlsIG5vdGlmaWNhdGlvbnMsIFNNUyBhbGVydHMsIGFuZCBzeXN0ZW0gYW5ub3VuY2VtZW50cy5cbiAqXG4gKiBGZWF0dXJlczpcbiAqIC0gVG9nZ2xlIHN3aXRjaGVzIGZvciBlYWNoIG5vdGlmaWNhdGlvbiB0eXBlXG4gKiAtIExvYWRzIGV4aXN0aW5nIHByZWZlcmVuY2VzIG9uIG1vdW50XG4gKiAtIFNhdmVzIGNoYW5nZXMgdG8gQVBJXG4gKiAtIERpc3BsYXlzIHN1Y2Nlc3MvZXJyb3IgbWVzc2FnZXMgdmlhIHRvYXN0IG5vdGlmaWNhdGlvbnNcbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiA2LjJcbiAqL1xuY29uc3QgTm90aWZpY2F0aW9uVG9nZ2xlcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNob3dUb2FzdCB9ID0gdXNlVG9hc3QoKTtcbiAgICBjb25zdCBbcHJlZmVyZW5jZXMsIHNldFByZWZlcmVuY2VzXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgZW1haWxfbm90aWZpY2F0aW9uczogdHJ1ZSxcbiAgICAgICAgc21zX25vdGlmaWNhdGlvbnM6IGZhbHNlLFxuICAgICAgICBzeXN0ZW1fbm90aWZpY2F0aW9uczogdHJ1ZSxcbiAgICB9KTtcbiAgICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2lzU3VibWl0dGluZywgc2V0SXNTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICAvKipcbiAgICAgKiBMb2FkIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcyBvbiBjb21wb25lbnQgbW91bnRcbiAgICAgKi9cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBsb2FkTm90aWZpY2F0aW9uUHJlZmVyZW5jZXMoKTtcbiAgICB9LCBbXSk7XG4gICAgLyoqXG4gICAgICogRmV0Y2ggbm90aWZpY2F0aW9uIHByZWZlcmVuY2VzIGZyb20gQVBJXG4gICAgICovXG4gICAgY29uc3QgbG9hZE5vdGlmaWNhdGlvblByZWZlcmVuY2VzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvc2V0dGluZ3Mvbm90aWZpY2F0aW9ucycpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2VzcyAmJiByZXNwb25zZS5kYXRhLmRhdGEpIHtcbiAgICAgICAgICAgICAgICBzZXRQcmVmZXJlbmNlcyhyZXNwb25zZS5kYXRhLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgbm90aWZpY2F0aW9uIHByZWZlcmVuY2VzOicsIGVycm9yKTtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIGxvYWQgbm90aWZpY2F0aW9uIHByZWZlcmVuY2VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdG9nZ2xlIGNoYW5nZVxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZVRvZ2dsZSA9IChrZXkpID0+IHtcbiAgICAgICAgc2V0UHJlZmVyZW5jZXMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgW2tleV06ICFwcmV2W2tleV0sXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBmb3JtIHN1Ym1pc3Npb25cbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNldElzU3VibWl0dGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dCgnL3NldHRpbmdzL25vdGlmaWNhdGlvbnMnLCBwcmVmZXJlbmNlcyk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ05vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcyBzYXZlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzYXZlIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlczonLCBlcnJvcik7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBzYXZlIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcycpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHktMTJcIiwgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTUwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcy4uLlwiIH0pIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIChfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB5LTQgYm9yZGVyLWIgYm9yZGVyLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xXCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogXCJFbWFpbCBOb3RpZmljYXRpb25zXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTUwMCBtdC0xXCIsIGNoaWxkcmVuOiBcIlJlY2VpdmUgZW1haWwgbm90aWZpY2F0aW9ucyBmb3IgaW1wb3J0YW50IHVwZGF0ZXMgYW5kIGFubm91bmNlbWVudHNcIiB9KV0gfSksIF9qc3goXCJidXR0b25cIiwgeyB0eXBlOiBcImJ1dHRvblwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVUb2dnbGUoJ2VtYWlsX25vdGlmaWNhdGlvbnMnKSwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2xhc3NOYW1lOiBgXHJcbiAgICAgICAgICAgIHJlbGF0aXZlIGlubGluZS1mbGV4IGgtNiB3LTExIGZsZXgtc2hyaW5rLTAgY3Vyc29yLXBvaW50ZXIgcm91bmRlZC1mdWxsIGJvcmRlci0yIGJvcmRlci10cmFuc3BhcmVudCBcclxuICAgICAgICAgICAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIGVhc2UtaW4tb3V0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBmb2N1czpyaW5nLW9mZnNldC0yXHJcbiAgICAgICAgICAgIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXHJcbiAgICAgICAgICAgICR7cHJlZmVyZW5jZXMuZW1haWxfbm90aWZpY2F0aW9ucyA/ICdiZy1wcmltYXJ5LTYwMCcgOiAnYmctZ3JheS0yMDAnfVxyXG4gICAgICAgICAgYCwgcm9sZTogXCJzd2l0Y2hcIiwgXCJhcmlhLWNoZWNrZWRcIjogcHJlZmVyZW5jZXMuZW1haWxfbm90aWZpY2F0aW9ucywgXCJhcmlhLWxhYmVsXCI6IFwiVG9nZ2xlIGVtYWlsIG5vdGlmaWNhdGlvbnNcIiwgY2hpbGRyZW46IF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBgXHJcbiAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHMtbm9uZSBpbmxpbmUtYmxvY2sgaC01IHctNSB0cmFuc2Zvcm0gcm91bmRlZC1mdWxsIGJnLXdoaXRlIHNoYWRvdyByaW5nLTAgXHJcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbiBkdXJhdGlvbi0yMDAgZWFzZS1pbi1vdXRcclxuICAgICAgICAgICAgICAke3ByZWZlcmVuY2VzLmVtYWlsX25vdGlmaWNhdGlvbnMgPyAndHJhbnNsYXRlLXgtNScgOiAndHJhbnNsYXRlLXgtMCd9XHJcbiAgICAgICAgICAgIGAgfSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHktNCBib3JkZXItYiBib3JkZXItZ3JheS0yMDBcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTFcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBcIlNNUyBBbGVydHNcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNTAwIG10LTFcIiwgY2hpbGRyZW46IFwiUmVjZWl2ZSB0ZXh0IG1lc3NhZ2UgYWxlcnRzIGZvciB1cmdlbnQgbm90aWZpY2F0aW9uc1wiIH0pXSB9KSwgX2pzeChcImJ1dHRvblwiLCB7IHR5cGU6IFwiYnV0dG9uXCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZVRvZ2dsZSgnc21zX25vdGlmaWNhdGlvbnMnKSwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2xhc3NOYW1lOiBgXHJcbiAgICAgICAgICAgIHJlbGF0aXZlIGlubGluZS1mbGV4IGgtNiB3LTExIGZsZXgtc2hyaW5rLTAgY3Vyc29yLXBvaW50ZXIgcm91bmRlZC1mdWxsIGJvcmRlci0yIGJvcmRlci10cmFuc3BhcmVudCBcclxuICAgICAgICAgICAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIGVhc2UtaW4tb3V0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBmb2N1czpyaW5nLW9mZnNldC0yXHJcbiAgICAgICAgICAgIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXHJcbiAgICAgICAgICAgICR7cHJlZmVyZW5jZXMuc21zX25vdGlmaWNhdGlvbnMgPyAnYmctcHJpbWFyeS02MDAnIDogJ2JnLWdyYXktMjAwJ31cclxuICAgICAgICAgIGAsIHJvbGU6IFwic3dpdGNoXCIsIFwiYXJpYS1jaGVja2VkXCI6IHByZWZlcmVuY2VzLnNtc19ub3RpZmljYXRpb25zLCBcImFyaWEtbGFiZWxcIjogXCJUb2dnbGUgU01TIG5vdGlmaWNhdGlvbnNcIiwgY2hpbGRyZW46IF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBgXHJcbiAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHMtbm9uZSBpbmxpbmUtYmxvY2sgaC01IHctNSB0cmFuc2Zvcm0gcm91bmRlZC1mdWxsIGJnLXdoaXRlIHNoYWRvdyByaW5nLTAgXHJcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbiBkdXJhdGlvbi0yMDAgZWFzZS1pbi1vdXRcclxuICAgICAgICAgICAgICAke3ByZWZlcmVuY2VzLnNtc19ub3RpZmljYXRpb25zID8gJ3RyYW5zbGF0ZS14LTUnIDogJ3RyYW5zbGF0ZS14LTAnfVxyXG4gICAgICAgICAgICBgIH0pIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB5LTQgYm9yZGVyLWIgYm9yZGVyLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xXCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogXCJTeXN0ZW0gQW5ub3VuY2VtZW50c1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS01MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJSZWNlaXZlIGluLWFwcCBub3RpZmljYXRpb25zIGZvciBzeXN0ZW0gdXBkYXRlcyBhbmQgYW5ub3VuY2VtZW50c1wiIH0pXSB9KSwgX2pzeChcImJ1dHRvblwiLCB7IHR5cGU6IFwiYnV0dG9uXCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZVRvZ2dsZSgnc3lzdGVtX25vdGlmaWNhdGlvbnMnKSwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2xhc3NOYW1lOiBgXHJcbiAgICAgICAgICAgIHJlbGF0aXZlIGlubGluZS1mbGV4IGgtNiB3LTExIGZsZXgtc2hyaW5rLTAgY3Vyc29yLXBvaW50ZXIgcm91bmRlZC1mdWxsIGJvcmRlci0yIGJvcmRlci10cmFuc3BhcmVudCBcclxuICAgICAgICAgICAgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIGVhc2UtaW4tb3V0IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBmb2N1czpyaW5nLW9mZnNldC0yXHJcbiAgICAgICAgICAgIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXHJcbiAgICAgICAgICAgICR7cHJlZmVyZW5jZXMuc3lzdGVtX25vdGlmaWNhdGlvbnMgPyAnYmctcHJpbWFyeS02MDAnIDogJ2JnLWdyYXktMjAwJ31cclxuICAgICAgICAgIGAsIHJvbGU6IFwic3dpdGNoXCIsIFwiYXJpYS1jaGVja2VkXCI6IHByZWZlcmVuY2VzLnN5c3RlbV9ub3RpZmljYXRpb25zLCBcImFyaWEtbGFiZWxcIjogXCJUb2dnbGUgc3lzdGVtIG5vdGlmaWNhdGlvbnNcIiwgY2hpbGRyZW46IF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBgXHJcbiAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHMtbm9uZSBpbmxpbmUtYmxvY2sgaC01IHctNSB0cmFuc2Zvcm0gcm91bmRlZC1mdWxsIGJnLXdoaXRlIHNoYWRvdyByaW5nLTAgXHJcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbiBkdXJhdGlvbi0yMDAgZWFzZS1pbi1vdXRcclxuICAgICAgICAgICAgICAke3ByZWZlcmVuY2VzLnN5c3RlbV9ub3RpZmljYXRpb25zID8gJ3RyYW5zbGF0ZS14LTUnIDogJ3RyYW5zbGF0ZS14LTAnfVxyXG4gICAgICAgICAgICBgIH0pIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktZW5kIHB0LTQgYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBfanN4KEJ1dHRvbiwgeyB0eXBlOiBcInN1Ym1pdFwiLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBjaGlsZHJlbjogaXNTdWJtaXR0aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSBQcmVmZXJlbmNlcycgfSkgfSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb25Ub2dnbGVzO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi91aS9idXR0b24nO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuLi91aS9pbnB1dCc7XG5pbXBvcnQgeyB1c2VUb2FzdCB9IGZyb20gJy4uLy4uL2NvbnRleHRzL1RvYXN0Q29udGV4dCc7XG5pbXBvcnQgeyB1c2VBdXRoIH0gZnJvbSAnLi4vLi4vY29udGV4dHMvQXV0aENvbnRleHQnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9saWIvYXBpJztcbi8qKlxuICogUHJvZmlsZUZvcm0gQ29tcG9uZW50XG4gKlxuICogRm9ybSBmb3IgZWRpdGluZyB1c2VyIHByb2ZpbGUgaW5jbHVkaW5nIG5hbWUsIGVtYWlsLCBhbmQgcGFzc3dvcmQuXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIElucHV0IGZpZWxkcyBmb3IgbmFtZSwgZW1haWwsIGFuZCBwYXNzd29yZFxuICogLSBQYXNzd29yZCBjb21wbGV4aXR5IHZhbGlkYXRpb24gKG1pbiA4IGNoYXJzLCB1cHBlcmNhc2UsIGxvd2VyY2FzZSwgbnVtYmVyKVxuICogLSBMb2FkcyBleGlzdGluZyB1c2VyIHByb2ZpbGUgb24gbW91bnRcbiAqIC0gRGlzcGxheXMgc3VjY2Vzcy9lcnJvciBtZXNzYWdlcyB2aWEgdG9hc3Qgbm90aWZpY2F0aW9uc1xuICogLSBQYXNzd29yZCBmaWVsZHMgYXJlIG9wdGlvbmFsIChvbmx5IHVwZGF0ZSBpZiBwcm92aWRlZClcbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiA2LjMsIDEwLjVcbiAqL1xuY29uc3QgUHJvZmlsZUZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzaG93VG9hc3QgfSA9IHVzZVRvYXN0KCk7XG4gICAgY29uc3QgeyB1c2VyIH0gPSB1c2VBdXRoKCk7XG4gICAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBlbWFpbDogJycsXG4gICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgcGFzc3dvcmRfY29uZmlybWF0aW9uOiAnJyxcbiAgICB9KTtcbiAgICBjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGUoe30pO1xuICAgIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbaXNTdWJtaXR0aW5nLCBzZXRJc1N1Ym1pdHRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIC8qKlxuICAgICAqIExvYWQgdXNlciBwcm9maWxlIG9uIGNvbXBvbmVudCBtb3VudFxuICAgICAqL1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsIHx8ICcnLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICBwYXNzd29yZF9jb25maXJtYXRpb246ICcnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSwgW3VzZXJdKTtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBwYXNzd29yZCBjb21wbGV4aXR5XG4gICAgICogUmVxdWlyZW1lbnRzOiBtaW4gOCBjaGFyYWN0ZXJzLCB1cHBlcmNhc2UsIGxvd2VyY2FzZSwgYW5kIG51bWJlclxuICAgICAqL1xuICAgIGNvbnN0IHZhbGlkYXRlUGFzc3dvcmQgPSAocGFzc3dvcmQpID0+IHtcbiAgICAgICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7IC8vIFBhc3N3b3JkIGlzIG9wdGlvbmFsXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IDgpIHtcbiAgICAgICAgICAgIHJldHVybiAnUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvW2Etel0vLnRlc3QocGFzc3dvcmQpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1Bhc3N3b3JkIG11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgbG93ZXJjYXNlIGxldHRlcic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvW0EtWl0vLnRlc3QocGFzc3dvcmQpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1Bhc3N3b3JkIG11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgdXBwZXJjYXNlIGxldHRlcic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvXFxkLy50ZXN0KHBhc3N3b3JkKSkge1xuICAgICAgICAgICAgcmV0dXJuICdQYXNzd29yZCBtdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIG51bWJlcic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBmb3JtIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdCB2YWxpZGF0ZUZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0Vycm9ycyA9IHt9O1xuICAgICAgICAvLyBOYW1lIHZhbGlkYXRpb25cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5uYW1lLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLm5hbWUgPSAnTmFtZSBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZm9ybURhdGEubmFtZS5sZW5ndGggPiAyNTUpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5uYW1lID0gJ05hbWUgbXVzdCBiZSAyNTUgY2hhcmFjdGVycyBvciBsZXNzJztcbiAgICAgICAgfVxuICAgICAgICAvLyBFbWFpbCB2YWxpZGF0aW9uXG4gICAgICAgIGlmICghZm9ybURhdGEuZW1haWwudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuZW1haWwgPSAnRW1haWwgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCEvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLy50ZXN0KGZvcm1EYXRhLmVtYWlsKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmVtYWlsID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhc3N3b3JkIHZhbGlkYXRpb24gKG9ubHkgaWYgcHJvdmlkZWQpXG4gICAgICAgIGlmIChmb3JtRGF0YS5wYXNzd29yZCkge1xuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmRFcnJvciA9IHZhbGlkYXRlUGFzc3dvcmQoZm9ybURhdGEucGFzc3dvcmQpO1xuICAgICAgICAgICAgaWYgKHBhc3N3b3JkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBuZXdFcnJvcnMucGFzc3dvcmQgPSBwYXNzd29yZEVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUGFzc3dvcmQgY29uZmlybWF0aW9uIHZhbGlkYXRpb25cbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS5wYXNzd29yZCAhPT0gZm9ybURhdGEucGFzc3dvcmRfY29uZmlybWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgbmV3RXJyb3JzLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiA9ICdQYXNzd29yZHMgZG8gbm90IG1hdGNoJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXRFcnJvcnMobmV3RXJyb3JzKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG5ld0Vycm9ycykubGVuZ3RoID09PSAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGlucHV0IGNoYW5nZVxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGUudGFyZ2V0O1xuICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBbbmFtZV06IHZhbHVlLFxuICAgICAgICB9KSk7XG4gICAgICAgIC8vIENsZWFyIGVycm9yIGZvciB0aGlzIGZpZWxkIHdoZW4gdXNlciBzdGFydHMgdHlwaW5nXG4gICAgICAgIGlmIChlcnJvcnNbbmFtZV0pIHtcbiAgICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIFtuYW1lXTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZm9ybSBzdWJtaXNzaW9uXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoIXZhbGlkYXRlRm9ybSgpKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ1BsZWFzZSBjb3JyZWN0IHRoZSBlcnJvcnMgaW4gdGhlIGZvcm0nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRJc1N1Ym1pdHRpbmcodHJ1ZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBQcmVwYXJlIGRhdGEgdG8gc2VuZCAob25seSBpbmNsdWRlIHBhc3N3b3JkIGlmIHByb3ZpZGVkKVxuICAgICAgICAgICAgY29uc3QgZGF0YVRvU2VuZCA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBmb3JtRGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBmb3JtRGF0YS5lbWFpbCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoZm9ybURhdGEucGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICBkYXRhVG9TZW5kLnBhc3N3b3JkID0gZm9ybURhdGEucGFzc3dvcmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoJy9wcm9maWxlJywgZGF0YVRvU2VuZCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ1Byb2ZpbGUgdXBkYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgbG9jYWwgc3RvcmFnZSB3aXRoIG5ldyB1c2VyIGRhdGFcbiAgICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkVXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRVc2VyKSk7XG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgcGFzc3dvcmQgZmllbGRzIGFmdGVyIHN1Y2Nlc3NmdWwgdXBkYXRlXG4gICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmRfY29uZmlybWF0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gdXBkYXRlIHByb2ZpbGU6JywgZXJyb3IpO1xuICAgICAgICAgICAgLy8gSGFuZGxlIHNlcnZlci1zaWRlIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2U/LmRhdGE/LmVycm9ycykge1xuICAgICAgICAgICAgICAgIHNldEVycm9ycyhlcnJvci5yZXNwb25zZS5kYXRhLmVycm9ycyk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdQbGVhc2UgY29ycmVjdCB0aGUgZXJyb3JzIGluIHRoZSBmb3JtJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGRhdGUgcHJvZmlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHktMTJcIiwgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTUwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nIHByb2ZpbGUuLi5cIiB9KSB9KSk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeHMoXCJmb3JtXCIsIHsgb25TdWJtaXQ6IGhhbmRsZVN1Ym1pdCwgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJuYW1lXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiTmFtZSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwibmFtZVwiLCBuYW1lOiBcIm5hbWVcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5uYW1lLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5uYW1lID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCJKb2huIERvZVwiIH0pLCBlcnJvcnMubmFtZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLm5hbWUgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImVtYWlsXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiRW1haWwgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcImVtYWlsXCIsIG5hbWU6IFwiZW1haWxcIiwgdHlwZTogXCJlbWFpbFwiLCB2YWx1ZTogZm9ybURhdGEuZW1haWwsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmVtYWlsID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCJqb2huLmRvZUBleGFtcGxlLmNvbVwiIH0pLCBlcnJvcnMuZW1haWwgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5lbWFpbCB9KSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwdC00IGJvcmRlci10IGJvcmRlci1ncmF5LTIwMFwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgbWItNFwiLCBjaGlsZHJlbjogXCJDaGFuZ2UgUGFzc3dvcmRcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNTAwIG1iLTRcIiwgY2hpbGRyZW46IFwiTGVhdmUgYmxhbmsgdG8ga2VlcCB5b3VyIGN1cnJlbnQgcGFzc3dvcmRcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwicGFzc3dvcmRcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIk5ldyBQYXNzd29yZFwiIH0pLCBfanN4KElucHV0LCB7IGlkOiBcInBhc3N3b3JkXCIsIG5hbWU6IFwicGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiLCB2YWx1ZTogZm9ybURhdGEucGFzc3dvcmQsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLnBhc3N3b3JkID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCJFbnRlciBuZXcgcGFzc3dvcmRcIiB9KSwgZXJyb3JzLnBhc3N3b3JkICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMucGFzc3dvcmQgfSkpLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJNdXN0IGJlIGF0IGxlYXN0IDggY2hhcmFjdGVycyB3aXRoIHVwcGVyY2FzZSwgbG93ZXJjYXNlLCBhbmQgbnVtYmVyXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJwYXNzd29yZF9jb25maXJtYXRpb25cIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIkNvbmZpcm0gTmV3IFBhc3N3b3JkXCIgfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwicGFzc3dvcmRfY29uZmlybWF0aW9uXCIsIG5hbWU6IFwicGFzc3dvcmRfY29uZmlybWF0aW9uXCIsIHR5cGU6IFwicGFzc3dvcmRcIiwgdmFsdWU6IGZvcm1EYXRhLnBhc3N3b3JkX2NvbmZpcm1hdGlvbiwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMucGFzc3dvcmRfY29uZmlybWF0aW9uID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBwbGFjZWhvbGRlcjogXCJDb25maXJtIG5ldyBwYXNzd29yZFwiIH0pLCBlcnJvcnMucGFzc3dvcmRfY29uZmlybWF0aW9uICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMucGFzc3dvcmRfY29uZmlybWF0aW9uIH0pKV0gfSldIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktZW5kIHB0LTQgYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBfanN4KEJ1dHRvbiwgeyB0eXBlOiBcInN1Ym1pdFwiLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBjaGlsZHJlbjogaXNTdWJtaXR0aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSBDaGFuZ2VzJyB9KSB9KV0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGVGb3JtO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY24gfSBmcm9tIFwiLi4vLi4vbGliL3V0aWxzXCI7XG5jb25zdCBJbnB1dCA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCB0eXBlLCAuLi5wcm9wcyB9LCByZWYpID0+IHtcbiAgICByZXR1cm4gKF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IHR5cGUsIGNsYXNzTmFtZTogY24oXCJmbGV4IGgtMTAgdy1mdWxsIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1pbnB1dCBiZy1iYWNrZ3JvdW5kIHB4LTMgcHktMiB0ZXh0LXNtIHJpbmctb2Zmc2V0LWJhY2tncm91bmQgZmlsZTpib3JkZXItMCBmaWxlOmJnLXRyYW5zcGFyZW50IGZpbGU6dGV4dC1zbSBmaWxlOmZvbnQtbWVkaXVtIHBsYWNlaG9sZGVyOnRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcmluZyBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTIgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkIGRpc2FibGVkOm9wYWNpdHktNTBcIiwgY2xhc3NOYW1lKSwgcmVmOiByZWYsIC4uLnByb3BzIH0pKTtcbn0pO1xuSW5wdXQuZGlzcGxheU5hbWUgPSBcIklucHV0XCI7XG5leHBvcnQgeyBJbnB1dCB9O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQnVpbGRpbmcyLCBCZWxsLCBVc2VyIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IENhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2NhcmQnO1xuaW1wb3J0IENodXJjaERldGFpbHNGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvc2V0dGluZ3MvQ2h1cmNoRGV0YWlsc0Zvcm0nO1xuaW1wb3J0IE5vdGlmaWNhdGlvblRvZ2dsZXMgZnJvbSAnLi4vY29tcG9uZW50cy9zZXR0aW5ncy9Ob3RpZmljYXRpb25Ub2dnbGVzJztcbmltcG9ydCBQcm9maWxlRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3NldHRpbmdzL1Byb2ZpbGVGb3JtJztcbi8qKlxuICogU2V0dGluZ3MgUGFnZSBDb21wb25lbnRcbiAqXG4gKiBQcm92aWRlcyBjb25maWd1cmF0aW9uIGludGVyZmFjZSBmb3IgY2h1cmNoIHNldHRpbmdzLCBub3RpZmljYXRpb25zLCBhbmQgdXNlciBwcm9maWxlLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBUYWJiZWQgaW50ZXJmYWNlIGZvciBDaHVyY2ggRGV0YWlscywgTm90aWZpY2F0aW9ucywgYW5kIFByb2ZpbGUgc2VjdGlvbnNcbiAqIC0gQ2h1cmNoIERldGFpbHM6IENvbmZpZ3VyZSBjaHVyY2ggbmFtZSwgYWRkcmVzcywgY29udGFjdCBpbmZvLCBhbmQgc2VydmljZSB0aW1lc1xuICogLSBOb3RpZmljYXRpb25zOiBUb2dnbGUgZW1haWwgbm90aWZpY2F0aW9ucywgU01TIGFsZXJ0cywgYW5kIHN5c3RlbSBhbm5vdW5jZW1lbnRzXG4gKiAtIFByb2ZpbGU6IEVkaXQgdXNlciBwcm9maWxlIGluY2x1ZGluZyBuYW1lLCBlbWFpbCwgYW5kIHBhc3N3b3JkXG4gKlxuICogVmFsaWRhdGVzIFJlcXVpcmVtZW50czogNi4xLCA2LjIsIDYuM1xuICovXG5jb25zdCBTZXR0aW5ncyA9ICgpID0+IHtcbiAgICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGUoJ2NodXJjaCcpO1xuICAgIGNvbnN0IHRhYnMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnY2h1cmNoJyxcbiAgICAgICAgICAgIG5hbWU6ICdDaHVyY2ggRGV0YWlscycsXG4gICAgICAgICAgICBpY29uOiBCdWlsZGluZzIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0NvbmZpZ3VyZSBjaHVyY2ggaW5mb3JtYXRpb24gYW5kIHNlcnZpY2UgdGltZXMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnbm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICBuYW1lOiAnTm90aWZpY2F0aW9ucycsXG4gICAgICAgICAgICBpY29uOiBCZWxsLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdNYW5hZ2Ugbm90aWZpY2F0aW9uIHByZWZlcmVuY2VzJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ3Byb2ZpbGUnLFxuICAgICAgICAgICAgbmFtZTogJ1Byb2ZpbGUnLFxuICAgICAgICAgICAgaWNvbjogVXNlcixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVXBkYXRlIHlvdXIgcGVyc29uYWwgaW5mb3JtYXRpb24nXG4gICAgICAgIH0sXG4gICAgXTtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1iLThcIiwgY2hpbGRyZW46IFtfanN4KFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiU2V0dGluZ3NcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMiB0ZXh0LWdyYXktNjAwXCIsIGNoaWxkcmVuOiBcIk1hbmFnZSBjaHVyY2ggc2V0dGluZ3MsIG5vdGlmaWNhdGlvbiBwcmVmZXJlbmNlcywgYW5kIHlvdXIgcHJvZmlsZS5cIiB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYm9yZGVyLWIgYm9yZGVyLWdyYXktMjAwXCIsIGNoaWxkcmVuOiBfanN4KFwibmF2XCIsIHsgY2xhc3NOYW1lOiBcIi1tYi1weCBmbGV4IHNwYWNlLXgtOFwiLCBjaGlsZHJlbjogdGFicy5tYXAoKHRhYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IHRhYi5pY29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVUYWIgPT09IHRhYi5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRBY3RpdmVUYWIodGFiLmlkKSwgY2xhc3NOYW1lOiBgXHJcbiAgICAgICAgICAgICAgICAgIGdyb3VwIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweS00IHB4LTEgYm9yZGVyLWItMiBmb250LW1lZGl1bSB0ZXh0LXNtXHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTE1MCBlYXNlLWluLW91dFxyXG4gICAgICAgICAgICAgICAgICAke2lzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1wcmltYXJ5LTUwMCB0ZXh0LXByaW1hcnktNjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1ncmF5LTUwMCBob3Zlcjp0ZXh0LWdyYXktNzAwIGhvdmVyOmJvcmRlci1ncmF5LTMwMCd9XHJcbiAgICAgICAgICAgICAgICBgLCBjaGlsZHJlbjogW19qc3goSWNvbiwgeyBjbGFzc05hbWU6IGBcclxuICAgICAgICAgICAgICAgICAgICBtci0yIGgtNSB3LTVcclxuICAgICAgICAgICAgICAgICAgICAke2lzQWN0aXZlID8gJ3RleHQtcHJpbWFyeS02MDAnIDogJ3RleHQtZ3JheS00MDAgZ3JvdXAtaG92ZXI6dGV4dC1ncmF5LTUwMCd9XHJcbiAgICAgICAgICAgICAgICAgIGAgfSksIHRhYi5uYW1lXSB9LCB0YWIuaWQpKTtcbiAgICAgICAgICAgICAgICAgICAgfSkgfSkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm10LTZcIiwgY2hpbGRyZW46IFthY3RpdmVUYWIgPT09ICdjaHVyY2gnICYmIChfanN4KENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgZmxleCBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KEJ1aWxkaW5nMiwgeyBjbGFzc05hbWU6IFwibXItMiBoLTUgdy01IHRleHQtcHJpbWFyeS02MDBcIiB9KSwgXCJDaHVyY2ggRGV0YWlsc1wiXSB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwibXQtMSB0ZXh0LXNtIHRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFwiQ29uZmlndXJlIHlvdXIgY2h1cmNoJ3MgYmFzaWMgaW5mb3JtYXRpb24gYW5kIHNlcnZpY2UgdGltZXMuXCIgfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJvcmRlci10IGJvcmRlci1ncmF5LTIwMCBwdC02XCIsIGNoaWxkcmVuOiBfanN4KENodXJjaERldGFpbHNGb3JtLCB7fSkgfSldIH0pIH0pKSwgYWN0aXZlVGFiID09PSAnbm90aWZpY2F0aW9ucycgJiYgKF9qc3goQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBmbGV4IGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goQmVsbCwgeyBjbGFzc05hbWU6IFwibXItMiBoLTUgdy01IHRleHQtcHJpbWFyeS02MDBcIiB9KSwgXCJOb3RpZmljYXRpb24gUHJlZmVyZW5jZXNcIl0gfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTEgdGV4dC1zbSB0ZXh0LWdyYXktNjAwXCIsIGNoaWxkcmVuOiBcIk1hbmFnZSBob3cgeW91IHJlY2VpdmUgbm90aWZpY2F0aW9ucyBhbmQgYWxlcnRzLlwiIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJib3JkZXItdCBib3JkZXItZ3JheS0yMDAgcHQtNlwiLCBjaGlsZHJlbjogX2pzeChOb3RpZmljYXRpb25Ub2dnbGVzLCB7fSkgfSldIH0pIH0pKSwgYWN0aXZlVGFiID09PSAncHJvZmlsZScgJiYgKF9qc3goQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTkwMCBmbGV4IGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goVXNlciwgeyBjbGFzc05hbWU6IFwibXItMiBoLTUgdy01IHRleHQtcHJpbWFyeS02MDBcIiB9KSwgXCJVc2VyIFByb2ZpbGVcIl0gfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTEgdGV4dC1zbSB0ZXh0LWdyYXktNjAwXCIsIGNoaWxkcmVuOiBcIlVwZGF0ZSB5b3VyIHBlcnNvbmFsIGluZm9ybWF0aW9uIGFuZCBhY2NvdW50IHNldHRpbmdzLlwiIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJib3JkZXItdCBib3JkZXItZ3JheS0yMDAgcHQtNlwiLCBjaGlsZHJlbjogX2pzeChQcm9maWxlRm9ybSwge30pIH0pXSB9KSB9KSldIH0pXSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3M7XG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMC4yNjggMjFhMiAyIDAgMCAwIDMuNDY0IDBcIiwga2V5OiBcInZ3dmJ0OVwiIH1dLFxuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMy4yNjIgMTUuMzI2QTEgMSAwIDAgMCA0IDE3aDE2YTEgMSAwIDAgMCAuNzQtMS42NzNDMTkuNDEgMTMuOTU2IDE4IDEyLjQ5OSAxOCA4QTYgNiAwIDAgMCA2IDhjMCA0LjQ5OS0xLjQxMSA1Ljk1Ni0yLjczOCA3LjMyNlwiLFxuICAgICAga2V5OiBcIjExZzl2aVwiXG4gICAgfVxuICBdXG5dO1xuY29uc3QgQmVsbCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJiZWxsXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBCZWxsIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJlbGwuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMCAxMmg0XCIsIGtleTogXCJhNTZiMHBcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEwIDhoNFwiLCBrZXk6IFwiMXNyMmFmXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNCAyMXYtM2EyIDIgMCAwIDAtNCAwdjNcIiwga2V5OiBcIjFyZ2llaVwiIH1dLFxuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNNiAxMEg0YTIgMiAwIDAgMC0yIDJ2N2EyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJWOWEyIDIgMCAwIDAtMi0yaC0yXCIsXG4gICAgICBrZXk6IFwic2VjbWkyXCJcbiAgICB9XG4gIF0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk02IDIxVjVhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJ2MTZcIiwga2V5OiBcIjE2cmEwdFwiIH1dXG5dO1xuY29uc3QgQnVpbGRpbmcyID0gY3JlYXRlTHVjaWRlSWNvbihcImJ1aWxkaW5nLTJcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIEJ1aWxkaW5nMiBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWlsZGluZy0yLmpzLm1hcFxuIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsIm5leHQiLCJwdXNoIiwiaXNBcnJheSIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkJ1dHRvbiIsIklucHV0IiwidXNlVG9hc3QiLCJhcGkiLCJDaHVyY2hEZXRhaWxzRm9ybSIsIl91c2VUb2FzdCIsInNob3dUb2FzdCIsIl91c2VTdGF0ZSIsImNodXJjaF9uYW1lIiwiYWRkcmVzcyIsImNpdHkiLCJzdGF0ZSIsInppcF9jb2RlIiwicGhvbmUiLCJlbWFpbCIsIndlYnNpdGUiLCJzZXJ2aWNlX3RpbWVzIiwiX3VzZVN0YXRlMiIsImZvcm1EYXRhIiwic2V0Rm9ybURhdGEiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsImVycm9ycyIsInNldEVycm9ycyIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2IiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwiX3VzZVN0YXRlNyIsIl91c2VTdGF0ZTgiLCJpc1N1Ym1pdHRpbmciLCJzZXRJc1N1Ym1pdHRpbmciLCJsb2FkQ2h1cmNoU2V0dGluZ3MiLCJfcmVmIiwiX2NhbGxlZSIsInJlc3BvbnNlIiwic2V0dGluZ3MiLCJfdCIsIl9jb250ZXh0IiwiZ2V0IiwiZGF0YSIsInN1Y2Nlc3MiLCJjb25zb2xlIiwiZXJyb3IiLCJ2YWxpZGF0ZUZvcm0iLCJuZXdFcnJvcnMiLCJ0cmltIiwia2V5cyIsImhhbmRsZUNoYW5nZSIsIl9lJHRhcmdldCIsInRhcmdldCIsInByZXYiLCJfb2JqZWN0U3ByZWFkIiwiX2RlZmluZVByb3BlcnR5IiwidW5kZWZpbmVkIiwiaGFuZGxlU3VibWl0IiwiX3JlZjIiLCJfY2FsbGVlMiIsIl9lcnJvciRyZXNwb25zZSIsIl9lcnJvciRyZXNwb25zZTIiLCJfdDIiLCJfY29udGV4dDIiLCJwcmV2ZW50RGVmYXVsdCIsInB1dCIsIm1lc3NhZ2UiLCJfeCIsImNsYXNzTmFtZSIsImNoaWxkcmVuIiwib25TdWJtaXQiLCJodG1sRm9yIiwiaWQiLCJ0eXBlIiwib25DaGFuZ2UiLCJkaXNhYmxlZCIsInBsYWNlaG9sZGVyIiwiY29uY2F0Iiwicm93cyIsIk5vdGlmaWNhdGlvblRvZ2dsZXMiLCJlbWFpbF9ub3RpZmljYXRpb25zIiwic21zX25vdGlmaWNhdGlvbnMiLCJzeXN0ZW1fbm90aWZpY2F0aW9ucyIsInByZWZlcmVuY2VzIiwic2V0UHJlZmVyZW5jZXMiLCJsb2FkTm90aWZpY2F0aW9uUHJlZmVyZW5jZXMiLCJoYW5kbGVUb2dnbGUiLCJrZXkiLCJvbkNsaWNrIiwicm9sZSIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJmaWx0ZXIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJmb3JFYWNoIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJfdG9Qcm9wZXJ0eUtleSIsIl90b1ByaW1pdGl2ZSIsIl90eXBlb2YiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsInVzZUF1dGgiLCJQcm9maWxlRm9ybSIsIl91c2VBdXRoIiwidXNlciIsInBhc3N3b3JkIiwicGFzc3dvcmRfY29uZmlybWF0aW9uIiwidmFsaWRhdGVQYXNzd29yZCIsInBhc3N3b3JkRXJyb3IiLCJkYXRhVG9TZW5kIiwidXBkYXRlZFVzZXIiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsIlJlYWN0IiwiY24iLCJmb3J3YXJkUmVmIiwicmVmIiwicHJvcHMiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJfZXhjbHVkZWQiLCJCdWlsZGluZzIiLCJCZWxsIiwiVXNlciIsIkNhcmQiLCJTZXR0aW5ncyIsImFjdGl2ZVRhYiIsInNldEFjdGl2ZVRhYiIsInRhYnMiLCJpY29uIiwiZGVzY3JpcHRpb24iLCJtYXAiLCJ0YWIiLCJJY29uIiwiaXNBY3RpdmUiXSwic291cmNlUm9vdCI6IiJ9