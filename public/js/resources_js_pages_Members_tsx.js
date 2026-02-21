"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_Members_tsx"],{

/***/ "./node_modules/aria-hidden/dist/es2015/index.js"
/*!*******************************************************!*\
  !*** ./node_modules/aria-hidden/dist/es2015/index.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideOthers: () => (/* binding */ hideOthers),
/* harmony export */   inertOthers: () => (/* binding */ inertOthers),
/* harmony export */   supportsInert: () => (/* binding */ supportsInert),
/* harmony export */   suppressOthers: () => (/* binding */ suppressOthers)
/* harmony export */ });
var getDefaultParent = function (originalTarget) {
    if (typeof document === 'undefined') {
        return null;
    }
    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
    return sampleTarget.ownerDocument.body;
};
var counterMap = new WeakMap();
var uncontrolledNodes = new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function (node) {
    return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function (parent, targets) {
    return targets
        .map(function (target) {
        if (parent.contains(target)) {
            return target;
        }
        var correctedTarget = unwrapHost(target);
        if (correctedTarget && parent.contains(correctedTarget)) {
            return correctedTarget;
        }
        console.error('aria-hidden', target, 'in not contained inside', parent, '. Doing nothing');
        return null;
    })
        .filter(function (x) { return Boolean(x); });
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @param {String} [controlAttribute] - html Attribute to control
 * @return {Undo} undo command
 */
var applyAttributeToOthers = function (originalTarget, parentNode, markerName, controlAttribute) {
    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    if (!markerMap[markerName]) {
        markerMap[markerName] = new WeakMap();
    }
    var markerCounter = markerMap[markerName];
    var hiddenNodes = [];
    var elementsToKeep = new Set();
    var elementsToStop = new Set(targets);
    var keep = function (el) {
        if (!el || elementsToKeep.has(el)) {
            return;
        }
        elementsToKeep.add(el);
        keep(el.parentNode);
    };
    targets.forEach(keep);
    var deep = function (parent) {
        if (!parent || elementsToStop.has(parent)) {
            return;
        }
        Array.prototype.forEach.call(parent.children, function (node) {
            if (elementsToKeep.has(node)) {
                deep(node);
            }
            else {
                try {
                    var attr = node.getAttribute(controlAttribute);
                    var alreadyHidden = attr !== null && attr !== 'false';
                    var counterValue = (counterMap.get(node) || 0) + 1;
                    var markerValue = (markerCounter.get(node) || 0) + 1;
                    counterMap.set(node, counterValue);
                    markerCounter.set(node, markerValue);
                    hiddenNodes.push(node);
                    if (counterValue === 1 && alreadyHidden) {
                        uncontrolledNodes.set(node, true);
                    }
                    if (markerValue === 1) {
                        node.setAttribute(markerName, 'true');
                    }
                    if (!alreadyHidden) {
                        node.setAttribute(controlAttribute, 'true');
                    }
                }
                catch (e) {
                    console.error('aria-hidden: cannot operate on ', node, e);
                }
            }
        });
    };
    deep(parentNode);
    elementsToKeep.clear();
    lockCount++;
    return function () {
        hiddenNodes.forEach(function (node) {
            var counterValue = counterMap.get(node) - 1;
            var markerValue = markerCounter.get(node) - 1;
            counterMap.set(node, counterValue);
            markerCounter.set(node, markerValue);
            if (!counterValue) {
                if (!uncontrolledNodes.has(node)) {
                    node.removeAttribute(controlAttribute);
                }
                uncontrolledNodes.delete(node);
            }
            if (!markerValue) {
                node.removeAttribute(markerName);
            }
        });
        lockCount--;
        if (!lockCount) {
            // clear
            counterMap = new WeakMap();
            counterMap = new WeakMap();
            uncontrolledNodes = new WeakMap();
            markerMap = {};
        }
    };
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var hideOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-aria-hidden'; }
    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    var activeParentNode = parentNode || getDefaultParent(originalTarget);
    if (!activeParentNode) {
        return function () { return null; };
    }
    // we should not hide aria-live elements - https://github.com/theKashey/aria-hidden/issues/10
    // and script elements, as they have no impact on accessibility.
    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll('[aria-live], script')));
    return applyAttributeToOthers(targets, activeParentNode, markerName, 'aria-hidden');
};
/**
 * Marks everything except given node(or nodes) as inert
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var inertOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-inert-ed'; }
    var activeParentNode = parentNode || getDefaultParent(originalTarget);
    if (!activeParentNode) {
        return function () { return null; };
    }
    return applyAttributeToOthers(originalTarget, activeParentNode, markerName, 'inert');
};
/**
 * @returns if current browser supports inert
 */
var supportsInert = function () {
    return typeof HTMLElement !== 'undefined' && HTMLElement.prototype.hasOwnProperty('inert');
};
/**
 * Automatic function to "suppress" DOM elements - _hide_ or _inert_ in the best possible way
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var suppressOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-suppressed'; }
    return (supportsInert() ? inertOthers : hideOthers)(originalTarget, parentNode, markerName);
};


/***/ },

/***/ "./resources/js/components/members/DeleteMemberDialog.tsx"
/*!****************************************************************!*\
  !*** ./resources/js/components/members/DeleteMemberDialog.tsx ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-alert.js");
/* harmony import */ var _ui_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/dialog */ "./resources/js/components/ui/dialog.tsx");
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");




/**
 * DeleteMemberDialog Component
 *
 * Confirmation dialog for deleting a member record.
 *
 * Features:
 * - Displays member name for confirmation
 * - Warning message about permanent deletion
 * - Cancel and confirm actions
 * - Loading state during deletion
 */
var DeleteMemberDialog = function DeleteMemberDialog(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onConfirm = _ref.onConfirm,
    member = _ref.member,
    _ref$isDeleting = _ref.isDeleting,
    isDeleting = _ref$isDeleting === void 0 ? false : _ref$isDeleting;
  if (!member) return null;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogContent, {
      className: "max-w-md",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogHeader, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
              className: "h-5 w-5 text-red-600"
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogTitle, {
            children: "Delete Member"
          })]
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "py-4",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
          className: "text-sm text-gray-700",
          children: ["Are you sure you want to delete", ' ', (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "font-semibold",
            children: [member.first_name, " ", member.last_name]
          }), "? This action cannot be undone."]
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogFooter, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
          type: "button",
          variant: "outline",
          onClick: onClose,
          disabled: isDeleting,
          children: "Cancel"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
          type: "button",
          variant: "destructive",
          onClick: onConfirm,
          disabled: isDeleting,
          children: isDeleting ? 'Deleting...' : 'Delete Member'
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteMemberDialog);

/***/ },

/***/ "./resources/js/components/members/MemberForm.tsx"
/*!********************************************************!*\
  !*** ./resources/js/components/members/MemberForm.tsx ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/dialog */ "./resources/js/components/ui/dialog.tsx");
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _ui_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/input */ "./resources/js/components/ui/input.tsx");
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
 * MemberForm Component
 *
 * Form for adding or editing church member records.
 *
 * Features:
 * - Input fields for all member properties
 * - Form validation with inline error messages
 * - Support for both create and edit modes
 * - Small group selection dropdown
 *
 * Validates Requirements: 3.4, 3.5, 3.6
 */
var MemberForm = function MemberForm(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onSubmit = _ref.onSubmit,
    _ref$member = _ref.member,
    member = _ref$member === void 0 ? null : _ref$member,
    _ref$smallGroups = _ref.smallGroups,
    smallGroups = _ref$smallGroups === void 0 ? [] : _ref$smallGroups,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      status: 'active',
      small_group_id: null,
      date_joined: new Date().toISOString().split('T')[0],
      birth_date: '',
      gender: 'male'
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    errors = _useState4[0],
    setErrors = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isSubmitting = _useState6[0],
    setIsSubmitting = _useState6[1];
  /**
   * Initialize form data when member prop changes
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (member) {
      setFormData({
        first_name: member.first_name,
        last_name: member.last_name,
        email: member.email,
        phone: member.phone,
        address: member.address,
        city: member.city,
        status: member.status,
        small_group_id: member.small_group_id,
        date_joined: member.date_joined.split('T')[0],
        birth_date: member.birth_date ? member.birth_date.split('T')[0] : '',
        gender: member.gender
      });
    } else {
      // Reset form for new member
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        status: 'active',
        small_group_id: null,
        date_joined: new Date().toISOString().split('T')[0],
        birth_date: '',
        gender: 'male'
      });
    }
    setErrors({});
  }, [member, isOpen]);
  /**
   * Validate form data
   */
  var validateForm = function validateForm() {
    var newErrors = {};
    // Required fields
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    } else if (formData.first_name.length > 100) {
      newErrors.first_name = 'First name must be 100 characters or less';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    } else if (formData.last_name.length > 100) {
      newErrors.last_name = 'Last name must be 100 characters or less';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.date_joined) {
      newErrors.date_joined = 'Date joined is required';
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
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var _error$response, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            if (validateForm()) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            setIsSubmitting(true);
            _context.p = 2;
            _context.n = 3;
            return onSubmit(formData);
          case 3:
            onClose();
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            // Handle server-side validation errors
            if ((_error$response = _t.response) !== null && _error$response !== void 0 && (_error$response = _error$response.data) !== null && _error$response !== void 0 && _error$response.errors) {
              setErrors(_t.response.data.errors);
            }
            // Don't close the form if there's an error
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
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Handle dialog close
   */
  var handleClose = function handleClose(open) {
    if (!open && !isSubmitting) {
      onClose();
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.Dialog, {
    open: isOpen,
    onOpenChange: function onOpenChange() {
      // Don't automatically close the dialog
      // The dialog will only close when onClose is explicitly called
    },
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogContent, {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogHeader, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogTitle, {
          children: member ? 'Edit Member' : 'Add New Member'
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        onSubmit: handleSubmit,
        className: "space-y-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              htmlFor: "first_name",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["First Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "first_name",
              name: "first_name",
              type: "text",
              value: formData.first_name,
              onChange: handleChange,
              className: errors.first_name ? 'border-red-500' : '',
              disabled: isSubmitting
            }), errors.first_name && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.first_name
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              htmlFor: "last_name",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Last Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "last_name",
              name: "last_name",
              type: "text",
              value: formData.last_name,
              onChange: handleChange,
              className: errors.last_name ? 'border-red-500' : '',
              disabled: isSubmitting
            }), errors.last_name && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.last_name
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              htmlFor: "email",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Email ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "email",
              name: "email",
              type: "email",
              value: formData.email,
              onChange: handleChange,
              className: errors.email ? 'border-red-500' : '',
              disabled: isSubmitting
            }), errors.email && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.email
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              htmlFor: "phone",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Phone ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "phone",
              name: "phone",
              type: "tel",
              value: formData.phone,
              onChange: handleChange,
              className: errors.phone ? 'border-red-500' : '',
              disabled: isSubmitting
            }), errors.phone && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.phone
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            htmlFor: "address",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: ["Address ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
            id: "address",
            name: "address",
            type: "text",
            value: formData.address,
            onChange: handleChange,
            className: errors.address ? 'border-red-500' : '',
            disabled: isSubmitting
          }), errors.address && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.address
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            htmlFor: "city",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: ["City ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
            id: "city",
            name: "city",
            type: "text",
            value: formData.city,
            onChange: handleChange,
            className: errors.city ? 'border-red-500' : '',
            disabled: isSubmitting
          }), errors.city && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.city
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              htmlFor: "status",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Status ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
              id: "status",
              name: "status",
              value: formData.status,
              onChange: handleChange,
              className: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              disabled: isSubmitting,
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                value: "active",
                children: "Active"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                value: "visitor",
                children: "Visitor"
              })]
            }), errors.status && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.status
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              htmlFor: "small_group_id",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Small Group"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
              id: "small_group_id",
              name: "small_group_id",
              value: formData.small_group_id || '',
              onChange: function onChange(e) {
                var value = e.target.value;
                setFormData(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    small_group_id: value ? parseInt(value) : null
                  });
                });
              },
              className: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              disabled: isSubmitting,
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                value: "",
                children: "None"
              }), smallGroups.map(function (group) {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: group.id,
                  children: group.name
                }, group.id);
              })]
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              htmlFor: "date_joined",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Date Joined ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "date_joined",
              name: "date_joined",
              type: "date",
              value: formData.date_joined,
              onChange: handleChange,
              className: errors.date_joined ? 'border-red-500' : '',
              disabled: isSubmitting
            }), errors.date_joined && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.date_joined
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              htmlFor: "birth_date",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Birth Date"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "birth_date",
              name: "birth_date",
              type: "date",
              value: formData.birth_date,
              onChange: handleChange,
              className: errors.birth_date ? 'border-red-500' : '',
              disabled: isSubmitting
            }), errors.birth_date && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.birth_date
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            htmlFor: "gender",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: ["Gender ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
            id: "gender",
            name: "gender",
            value: formData.gender,
            onChange: handleChange,
            className: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            disabled: isSubmitting,
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "male",
              children: "Male"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "female",
              children: "Female"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "other",
              children: "Other"
            })]
          }), errors.gender && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.gender
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogFooter, {
          className: "mt-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
            type: "button",
            variant: "outline",
            onClick: onClose,
            disabled: isSubmitting,
            children: "Cancel"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
            type: "submit",
            disabled: isSubmitting || isLoading,
            children: isSubmitting ? 'Saving...' : member ? 'Update Member' : 'Add Member'
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MemberForm);

/***/ },

/***/ "./resources/js/components/members/MemberTable.tsx"
/*!*********************************************************!*\
  !*** ./resources/js/components/members/MemberTable.tsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/square-pen.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-down.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-up.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trash-2.js");
/* harmony import */ var _ui_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ui/table */ "./resources/js/components/ui/table.tsx");
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");
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





/**
 * MemberTable Component
 *
 * Displays church members in a sortable data table with pagination.
 *
 * Features:
 * - Sortable columns (name, status, small group, contact info)
 * - Row actions (edit, delete)
 * - Pagination controls
 * - Responsive design
 *
 * Validates Requirements: 3.1, 3.7
 */
var MemberTable = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(function (_ref) {
  var members = _ref.members,
    onEdit = _ref.onEdit,
    onDelete = _ref.onDelete,
    currentPage = _ref.currentPage,
    totalPages = _ref.totalPages,
    onPageChange = _ref.onPageChange,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      column: null,
      direction: null
    }),
    _useState2 = _slicedToArray(_useState, 2),
    sortConfig = _useState2[0],
    setSortConfig = _useState2[1];
  /**
   * Handle column sort
   */
  var handleSort = function handleSort(column) {
    var direction = 'asc';
    if (sortConfig.column === column) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    setSortConfig({
      column: direction ? column : null,
      direction: direction
    });
  };
  /**
   * Sort members based on current sort configuration
   */
  var sortedMembers = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(function () {
    if (!sortConfig.column || !sortConfig.direction) {
      return members;
    }
    return _toConsumableArray(members).sort(function (a, b) {
      var _a$small_group, _b$small_group;
      var aValue;
      var bValue;
      switch (sortConfig.column) {
        case 'name':
          aValue = "".concat(a.first_name, " ").concat(a.last_name).toLowerCase();
          bValue = "".concat(b.first_name, " ").concat(b.last_name).toLowerCase();
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        case 'small_group':
          aValue = ((_a$small_group = a.small_group) === null || _a$small_group === void 0 || (_a$small_group = _a$small_group.name) === null || _a$small_group === void 0 ? void 0 : _a$small_group.toLowerCase()) || '';
          bValue = ((_b$small_group = b.small_group) === null || _b$small_group === void 0 || (_b$small_group = _b$small_group.name) === null || _b$small_group === void 0 ? void 0 : _b$small_group.toLowerCase()) || '';
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'phone':
          aValue = a.phone;
          bValue = b.phone;
          break;
        default:
          return 0;
      }
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [members, sortConfig]);
  /**
   * Render sort icon for column header
   */
  var renderSortIcon = function renderSortIcon(column) {
    if (sortConfig.column !== column) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "ml-2 h-4 w-4 text-gray-400"
      });
    }
    if (sortConfig.direction === 'asc') {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
        className: "ml-2 h-4 w-4 text-primary-500"
      });
    }
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
      className: "ml-2 h-4 w-4 text-primary-500"
    });
  };
  /**
   * Format status badge
   */
  var getStatusBadge = function getStatusBadge(status) {
    var baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    if (status === 'active') {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "".concat(baseClasses, " bg-green-100 text-green-800"),
        children: "Active"
      });
    }
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "".concat(baseClasses, " bg-blue-100 text-blue-800"),
      children: "Visitor"
    });
  };
  if (isLoading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "text-center py-12",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-gray-500",
        children: "Loading members..."
      })
    });
  }
  if (members.length === 0) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "text-center py-12",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-gray-500",
        children: "No members found"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-sm text-gray-400 mt-2",
        children: "Try adjusting your search or filter criteria"
      })]
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-4",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "rounded-lg border border-gray-200 overflow-hidden",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "overflow-x-auto",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.Table, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableHeader, {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableRow, {
              className: "bg-gray-50",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableHead, {
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                  onClick: function onClick() {
                    return handleSort('name');
                  },
                  className: "flex items-center font-semibold text-gray-700 hover:text-gray-900",
                  children: ["Name", renderSortIcon('name')]
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableHead, {
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                  onClick: function onClick() {
                    return handleSort('status');
                  },
                  className: "flex items-center font-semibold text-gray-700 hover:text-gray-900",
                  children: ["Status", renderSortIcon('status')]
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableHead, {
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                  onClick: function onClick() {
                    return handleSort('small_group');
                  },
                  className: "flex items-center font-semibold text-gray-700 hover:text-gray-900",
                  children: ["Small Group", renderSortIcon('small_group')]
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableHead, {
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                  onClick: function onClick() {
                    return handleSort('email');
                  },
                  className: "flex items-center font-semibold text-gray-700 hover:text-gray-900",
                  children: ["Email", renderSortIcon('email')]
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableHead, {
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                  onClick: function onClick() {
                    return handleSort('phone');
                  },
                  className: "flex items-center font-semibold text-gray-700 hover:text-gray-900",
                  children: ["Phone", renderSortIcon('phone')]
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableHead, {
                className: "text-right",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "font-semibold text-gray-700",
                  children: "Actions"
                })
              })]
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableBody, {
            children: sortedMembers.map(function (member) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableRow, {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableCell, {
                  className: "font-medium",
                  children: [member.first_name, " ", member.last_name]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableCell, {
                  children: getStatusBadge(member.status)
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableCell, {
                  children: member.small_group ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-gray-700",
                    children: member.small_group.name
                  }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-gray-400 italic",
                    children: "None"
                  })
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableCell, {
                  className: "text-gray-600",
                  children: member.email
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableCell, {
                  className: "text-gray-600",
                  children: member.phone
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_table__WEBPACK_IMPORTED_MODULE_7__.TableCell, {
                  className: "text-right",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center justify-end gap-2",
                    children: [onEdit && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
                      variant: "ghost",
                      size: "sm",
                      onClick: function onClick() {
                        return onEdit(member);
                      },
                      className: "h-8 w-8 p-0",
                      title: "Edit member",
                      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
                        className: "h-4 w-4"
                      })
                    }), onDelete && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
                      variant: "ghost",
                      size: "sm",
                      onClick: function onClick() {
                        return onDelete(member);
                      },
                      className: "h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50",
                      title: "Delete member",
                      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                        className: "h-4 w-4"
                      })
                    })]
                  })
                })]
              }, member.id);
            })
          })]
        })
      })
    }), totalPages > 1 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex items-center justify-between px-2",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "text-sm text-gray-600",
        children: ["Page ", currentPage, " of ", totalPages]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return onPageChange(currentPage - 1);
          },
          disabled: currentPage === 1,
          children: "Previous"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "flex items-center gap-1",
          children: Array.from({
            length: Math.min(5, totalPages)
          }, function (_, i) {
            var pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
              variant: currentPage === pageNum ? 'default' : 'outline',
              size: "sm",
              onClick: function onClick() {
                return onPageChange(pageNum);
              },
              className: "h-8 w-8 p-0",
              children: pageNum
            }, pageNum);
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return onPageChange(currentPage + 1);
          },
          disabled: currentPage === totalPages,
          children: "Next"
        })]
      })]
    })]
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MemberTable);

/***/ },

/***/ "./resources/js/components/ui/dialog.tsx"
/*!***********************************************!*\
  !*** ./resources/js/components/ui/dialog.tsx ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dialog: () => (/* binding */ Dialog),
/* harmony export */   DialogClose: () => (/* binding */ DialogClose),
/* harmony export */   DialogContent: () => (/* binding */ DialogContent),
/* harmony export */   DialogDescription: () => (/* binding */ DialogDescription),
/* harmony export */   DialogFooter: () => (/* binding */ DialogFooter),
/* harmony export */   DialogHeader: () => (/* binding */ DialogHeader),
/* harmony export */   DialogOverlay: () => (/* binding */ DialogOverlay),
/* harmony export */   DialogPortal: () => (/* binding */ DialogPortal),
/* harmony export */   DialogTitle: () => (/* binding */ DialogTitle),
/* harmony export */   DialogTrigger: () => (/* binding */ DialogTrigger)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-dialog */ "./node_modules/@radix-ui/react-dialog/dist/index.mjs");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/utils */ "./resources/js/lib/utils.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className"],
  _excluded2 = ["className", "children"],
  _excluded3 = ["className"],
  _excluded4 = ["className"],
  _excluded5 = ["className"],
  _excluded6 = ["className"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }





var Dialog = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Root;
var DialogTrigger = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Trigger;
var DialogPortal = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Portal;
var DialogClose = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Close;
var DialogOverlay = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Overlay, _objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)
  }, props));
});
DialogOverlay.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Overlay.displayName;
var DialogContent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref2, ref) {
  var className = _ref2.className,
    children = _ref2.children,
    props = _objectWithoutProperties(_ref2, _excluded2);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DialogPortal, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DialogOverlay, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Content, _objectSpread(_objectSpread({
      ref: ref,
      className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-[90vh] overflow-y-auto", className)
    }, props), {}, {
      children: [children, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Close, {
        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: "h-4 w-4"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "sr-only",
          children: "Close"
        })]
      })]
    }))]
  });
});
DialogContent.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Content.displayName;
var DialogHeader = function DialogHeader(_ref3) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", _objectSpread({
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex flex-col space-y-1.5 text-center sm:text-left", className)
  }, props));
};
DialogHeader.displayName = "DialogHeader";
var DialogFooter = function DialogFooter(_ref4) {
  var className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded4);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", _objectSpread({
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)
  }, props));
};
DialogFooter.displayName = "DialogFooter";
var DialogTitle = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref5, ref) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded5);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Title, _objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("text-lg font-semibold leading-none tracking-tight", className)
  }, props));
});
DialogTitle.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Title.displayName;
var DialogDescription = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref6, ref) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded6);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Description, _objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("text-sm text-muted-foreground", className)
  }, props));
});
DialogDescription.displayName = _radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Description.displayName;


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

/***/ "./resources/js/components/ui/table.tsx"
/*!**********************************************!*\
  !*** ./resources/js/components/ui/table.tsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Table: () => (/* binding */ Table),
/* harmony export */   TableBody: () => (/* binding */ TableBody),
/* harmony export */   TableCaption: () => (/* binding */ TableCaption),
/* harmony export */   TableCell: () => (/* binding */ TableCell),
/* harmony export */   TableFooter: () => (/* binding */ TableFooter),
/* harmony export */   TableHead: () => (/* binding */ TableHead),
/* harmony export */   TableHeader: () => (/* binding */ TableHeader),
/* harmony export */   TableRow: () => (/* binding */ TableRow)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/utils */ "./resources/js/lib/utils.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className"],
  _excluded2 = ["className"],
  _excluded3 = ["className"],
  _excluded4 = ["className"],
  _excluded5 = ["className"],
  _excluded6 = ["className"],
  _excluded7 = ["className"],
  _excluded8 = ["className"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }



var Table = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "relative w-full overflow-auto",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("table", _objectSpread({
      ref: ref,
      className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("w-full caption-bottom text-sm", className)
    }, props))
  });
});
Table.displayName = "Table";
var TableHeader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref2, ref) {
  var className = _ref2.className,
    props = _objectWithoutProperties(_ref2, _excluded2);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", _objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("[&_tr]:border-b", className)
  }, props));
});
TableHeader.displayName = "TableHeader";
var TableBody = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref3, ref) {
  var className = _ref3.className,
    props = _objectWithoutProperties(_ref3, _excluded3);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", _objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("[&_tr:last-child]:border-0", className)
  }, props));
});
TableBody.displayName = "TableBody";
var TableFooter = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref4, ref) {
  var className = _ref4.className,
    props = _objectWithoutProperties(_ref4, _excluded4);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tfoot", _objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)
  }, props));
});
TableFooter.displayName = "TableFooter";
var TableRow = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref5, ref) {
  var className = _ref5.className,
    props = _objectWithoutProperties(_ref5, _excluded5);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", _objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)
  }, props));
});
TableRow.displayName = "TableRow";
var TableHead = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref6, ref) {
  var className = _ref6.className,
    props = _objectWithoutProperties(_ref6, _excluded6);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", _objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)
  }, props));
});
TableHead.displayName = "TableHead";
var TableCell = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref7, ref) {
  var className = _ref7.className,
    props = _objectWithoutProperties(_ref7, _excluded7);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", _objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)
  }, props));
});
TableCell.displayName = "TableCell";
var TableCaption = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref8, ref) {
  var className = _ref8.className,
    props = _objectWithoutProperties(_ref8, _excluded8);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("caption", _objectSpread({
    ref: ref,
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("mt-4 text-sm text-muted-foreground", className)
  }, props));
});
TableCaption.displayName = "TableCaption";


/***/ },

/***/ "./resources/js/lib/memberApi.ts"
/*!***************************************!*\
  !*** ./resources/js/lib/memberApi.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   memberApi: () => (/* binding */ memberApi)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/lib/api.ts");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

/**
 * Member API Client
 *
 * Provides methods for member CRUD operations
 */
var memberApi = {
  /**
   * Create a new member
   */
  createMember: function createMember(data) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].post('/members', data);
          case 1:
            response = _context.v;
            return _context.a(2, response.data.data);
        }
      }, _callee);
    }))();
  },
  /**
   * Update an existing member
   */
  updateMember: function updateMember(id, data) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].put("/members/".concat(id), data);
          case 1:
            response = _context2.v;
            return _context2.a(2, response.data.data);
        }
      }, _callee2);
    }))();
  },
  /**
   * Delete a member
   */
  deleteMember: function deleteMember(id) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"]["delete"]("/members/".concat(id));
          case 1:
            return _context3.a(2);
        }
      }, _callee3);
    }))();
  },
  /**
   * Get a single member by ID
   */
  getMember: function getMember(id) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var response;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get("/members/".concat(id));
          case 1:
            response = _context4.v;
            return _context4.a(2, response.data.data);
        }
      }, _callee4);
    }))();
  },
  /**
   * Export members to CSV with current filters
   */
  exportMembers: function exportMembers(params) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var response;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get("/members/export?".concat(params.toString()), {
              responseType: 'blob'
            });
          case 1:
            response = _context5.v;
            return _context5.a(2, response.data);
        }
      }, _callee5);
    }))();
  }
};

/***/ },

/***/ "./resources/js/pages/Members.tsx"
/*!****************************************!*\
  !*** ./resources/js/pages/Members.tsx ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/funnel.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/download.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/search.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user-plus.js");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ui/input */ "./resources/js/components/ui/input.tsx");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _components_members_MemberTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/members/MemberTable */ "./resources/js/components/members/MemberTable.tsx");
/* harmony import */ var _components_members_MemberForm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/members/MemberForm */ "./resources/js/components/members/MemberForm.tsx");
/* harmony import */ var _components_members_DeleteMemberDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/members/DeleteMemberDialog */ "./resources/js/components/members/DeleteMemberDialog.tsx");
/* harmony import */ var _lib_memberApi__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/memberApi */ "./resources/js/lib/memberApi.ts");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../lib/api */ "./resources/js/lib/api.ts");
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
 * MemberDirectory Page Component
 *
 * Displays a searchable and filterable directory of church members.
 *
 * Features:
 * - Search input for filtering members by name or contact info
 * - Filter controls for member status (Active/Visitor)
 * - Add Member button for creating new member records
 * - Data table with sorting and pagination
 *
 * Validates Requirements: 3.1, 3.2, 3.3, 3.4, 3.7
 */
var Members = function Members() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    searchQuery = _useState2[0],
    setSearchQuery = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    debouncedSearchQuery = _useState4[0],
    setDebouncedSearchQuery = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all'),
    _useState6 = _slicedToArray(_useState5, 2),
    statusFilter = _useState6[0],
    setStatusFilter = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all'),
    _useState8 = _slicedToArray(_useState7, 2),
    smallGroupFilter = _useState8[0],
    setSmallGroupFilter = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState0 = _slicedToArray(_useState9, 2),
    smallGroups = _useState0[0],
    setSmallGroups = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState10 = _slicedToArray(_useState1, 2),
    members = _useState10[0],
    setMembers = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState12 = _slicedToArray(_useState11, 2),
    isLoading = _useState12[0],
    setIsLoading = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1),
    _useState14 = _slicedToArray(_useState13, 2),
    currentPage = _useState14[0],
    setCurrentPage = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1),
    _useState16 = _slicedToArray(_useState15, 2),
    totalPages = _useState16[0],
    setTotalPages = _useState16[1];
  // Form state
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    isFormOpen = _useState18[0],
    setIsFormOpen = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    editingMember = _useState20[0],
    setEditingMember = _useState20[1];
  // Delete dialog state
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState22 = _slicedToArray(_useState21, 2),
    isDeleteDialogOpen = _useState22[0],
    setIsDeleteDialogOpen = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState24 = _slicedToArray(_useState23, 2),
    deletingMember = _useState24[0],
    setDeletingMember = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState26 = _slicedToArray(_useState25, 2),
    isDeleting = _useState26[0],
    setIsDeleting = _useState26[1];
  // Export state
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState28 = _slicedToArray(_useState27, 2),
    isExporting = _useState28[0],
    setIsExporting = _useState28[1];
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_13__.useToast)(),
    showToast = _useToast.showToast;
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_14__.useAuth)(),
    user = _useAuth.user;
  // Check if user can modify data (not readonly)
  var canModify = (user === null || user === void 0 ? void 0 : user.role) !== 'readonly';
  /**
   * Debounce search query (300ms delay)
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var timer = setTimeout(function () {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return function () {
      return clearTimeout(timer);
    };
  }, [searchQuery]);
  /**
   * Fetch small groups for filter dropdown
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var fetchSmallGroups = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var response, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _lib_api__WEBPACK_IMPORTED_MODULE_15__["default"].get('/small-groups');
            case 1:
              response = _context.v;
              if (response.data.success) {
                setSmallGroups(response.data.data || []);
              }
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error('Error fetching small groups:', _t);
              setSmallGroups([]);
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      return function fetchSmallGroups() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchSmallGroups();
  }, []);
  /**
   * Fetch members from API
   */
  var fetchMembers = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var params, response, _response$data$pagina, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            setIsLoading(true);
            params = new URLSearchParams({
              page: currentPage.toString(),
              per_page: '50'
            });
            if (debouncedSearchQuery) {
              params.append('search', debouncedSearchQuery);
            }
            if (statusFilter !== 'all') {
              params.append('status', statusFilter);
            }
            if (smallGroupFilter !== 'all') {
              params.append('small_group_id', smallGroupFilter);
            }
            _context2.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_15__["default"].get("/members?".concat(params.toString()));
          case 1:
            response = _context2.v;
            if (response.data.success) {
              setMembers(response.data.data || []);
              setTotalPages(((_response$data$pagina = response.data.pagination) === null || _response$data$pagina === void 0 ? void 0 : _response$data$pagina.last_page) || 1);
            }
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Error fetching members:', _t2);
            setMembers([]);
          case 3:
            _context2.p = 3;
            setIsLoading(false);
            return _context2.f(3);
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2, 3, 4]]);
    }));
    return function fetchMembers() {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Fetch members when filters or page changes
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchMembers();
  }, [currentPage, debouncedSearchQuery, statusFilter, smallGroupFilter]);
  /**
   * Reset to page 1 when filters change
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setCurrentPage(1);
  }, [debouncedSearchQuery, statusFilter, smallGroupFilter]);
  var handleAddMember = function handleAddMember() {
    setEditingMember(null);
    setIsFormOpen(true);
  };
  var handleEditMember = function handleEditMember(member) {
    setEditingMember(member);
    setIsFormOpen(true);
  };
  var handleDeleteMember = function handleDeleteMember(member) {
    setDeletingMember(member);
    setIsDeleteDialogOpen(true);
  };
  var handleFormSubmit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(data) {
      var _error$response, errorMessage, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            if (!editingMember) {
              _context3.n = 2;
              break;
            }
            _context3.n = 1;
            return _lib_memberApi__WEBPACK_IMPORTED_MODULE_12__.memberApi.updateMember(editingMember.id, data);
          case 1:
            showToast('success', 'Member updated successfully');
            _context3.n = 4;
            break;
          case 2:
            _context3.n = 3;
            return _lib_memberApi__WEBPACK_IMPORTED_MODULE_12__.memberApi.createMember(data);
          case 3:
            showToast('success', 'Member created successfully');
          case 4:
            _context3.n = 5;
            return fetchMembers();
          case 5:
            setIsFormOpen(false);
            setEditingMember(null);
            _context3.n = 7;
            break;
          case 6:
            _context3.p = 6;
            _t3 = _context3.v;
            errorMessage = ((_error$response = _t3.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Failed to save member';
            showToast('error', errorMessage);
            throw _t3;
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 6]]);
    }));
    return function handleFormSubmit(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleConfirmDelete = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _error$response2, errorMessage, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (deletingMember) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            setIsDeleting(true);
            _context4.p = 2;
            _context4.n = 3;
            return _lib_memberApi__WEBPACK_IMPORTED_MODULE_12__.memberApi.deleteMember(deletingMember.id);
          case 3:
            showToast('success', 'Member deleted successfully');
            // Refresh member list
            _context4.n = 4;
            return fetchMembers();
          case 4:
            setIsDeleteDialogOpen(false);
            setDeletingMember(null);
            _context4.n = 6;
            break;
          case 5:
            _context4.p = 5;
            _t4 = _context4.v;
            errorMessage = ((_error$response2 = _t4.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || 'Failed to delete member';
            showToast('error', errorMessage);
          case 6:
            _context4.p = 6;
            setIsDeleting(false);
            return _context4.f(6);
          case 7:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 5, 6, 7]]);
    }));
    return function handleConfirmDelete() {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleCloseDeleteDialog = function handleCloseDeleteDialog() {
    if (!isDeleting) {
      setIsDeleteDialogOpen(false);
      setDeletingMember(null);
    }
  };
  var handlePageChange = function handlePageChange(page) {
    setCurrentPage(page);
  };
  /**
   * Handle CSV export with current filters
   */
  var handleExport = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var params, blob, url, link, timestamp, _error$response3, errorMessage, _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            _context5.p = 0;
            setIsExporting(true);
            // Build params with current filters
            params = new URLSearchParams();
            if (debouncedSearchQuery) {
              params.append('search', debouncedSearchQuery);
            }
            if (statusFilter !== 'all') {
              params.append('status', statusFilter);
            }
            if (smallGroupFilter !== 'all') {
              params.append('small_group_id', smallGroupFilter);
            }
            // Call export API
            _context5.n = 1;
            return _lib_memberApi__WEBPACK_IMPORTED_MODULE_12__.memberApi.exportMembers(params);
          case 1:
            blob = _context5.v;
            // Create download link with timestamped filename
            url = window.URL.createObjectURL(blob);
            link = document.createElement('a');
            link.href = url;
            // Generate timestamped filename
            timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            link.download = "members_export_".concat(timestamp, ".csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            showToast('success', 'Members exported successfully');
            _context5.n = 3;
            break;
          case 2:
            _context5.p = 2;
            _t5 = _context5.v;
            errorMessage = ((_error$response3 = _t5.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || 'Failed to export members';
            showToast('error', errorMessage);
          case 3:
            _context5.p = 3;
            setIsExporting(false);
            return _context5.f(3);
          case 4:
            return _context5.a(2);
        }
      }, _callee5, null, [[0, 2, 3, 4]]);
    }));
    return function handleExport() {
      return _ref5.apply(this, arguments);
    };
  }();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
          className: "text-2xl font-bold text-gray-900",
          children: "Member Directory"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-gray-600 mt-1",
          children: "Manage and view all church members and visitors"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
          onClick: handleExport,
          disabled: isExporting,
          variant: "outline",
          className: "flex items-center gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
            className: "h-4 w-4"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "hidden sm:inline",
            children: isExporting ? 'Exporting...' : 'Export CSV'
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "sm:hidden",
            children: isExporting ? 'Exporting...' : 'Export'
          })]
        }), canModify && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
          onClick: handleAddMember,
          className: "flex items-center gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
            className: "h-4 w-4"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "hidden sm:inline",
            children: "Add Member"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "sm:hidden",
            children: "Add"
          })]
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__.Card, {
      className: "p-6",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col md:flex-row gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex-1 relative",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_7__.Input, {
            type: "text",
            placeholder: "Search by name, email, or phone...",
            value: searchQuery,
            onChange: function onChange(e) {
              return setSearchQuery(e.target.value);
            },
            className: "pl-10"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "h-4 w-4 text-gray-400"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
            value: statusFilter,
            onChange: function onChange(e) {
              return setStatusFilter(e.target.value);
            },
            className: "h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "all",
              children: "All Members"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "active",
              children: "Active Members"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "visitor",
              children: "Visitors"
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "flex items-center gap-2",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
            value: smallGroupFilter,
            onChange: function onChange(e) {
              return setSmallGroupFilter(e.target.value);
            },
            className: "h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "all",
              children: "All Small Groups"
            }), smallGroups.map(function (group) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                value: group.id.toString(),
                children: group.name
              }, group.id);
            })]
          })
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__.Card, {
      className: "p-6",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_members_MemberTable__WEBPACK_IMPORTED_MODULE_9__["default"], {
        members: members,
        onEdit: canModify ? handleEditMember : undefined,
        onDelete: canModify ? handleDeleteMember : undefined,
        currentPage: currentPage,
        totalPages: totalPages,
        onPageChange: handlePageChange,
        isLoading: isLoading
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_members_MemberForm__WEBPACK_IMPORTED_MODULE_10__["default"], {
      isOpen: isFormOpen,
      onClose: function onClose() {
        setIsFormOpen(false);
        setEditingMember(null);
      },
      onSubmit: handleFormSubmit,
      member: editingMember,
      smallGroups: smallGroups
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_members_DeleteMemberDialog__WEBPACK_IMPORTED_MODULE_11__["default"], {
      isOpen: isDeleteDialogOpen,
      onClose: handleCloseDeleteDialog,
      onConfirm: handleConfirmDelete,
      member: deletingMember,
      isDeleting: isDeleting
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Members);

/***/ },

/***/ "./node_modules/get-nonce/dist/es2015/index.js"
/*!*****************************************************!*\
  !*** ./node_modules/get-nonce/dist/es2015/index.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNonce: () => (/* binding */ getNonce),
/* harmony export */   setNonce: () => (/* binding */ setNonce)
/* harmony export */ });
var currentNonce;
var setNonce = function (nonce) {
    currentNonce = nonce;
};
var getNonce = function () {
    if (currentNonce) {
        return currentNonce;
    }
    if (true) {
        return __webpack_require__.nc;
    }
    // removed by dead control flow

};


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/chevron-up.js"
/*!****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevron-up.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChevronUp)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chevron-up", __iconNode);


//# sourceMappingURL=chevron-up.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js"
/*!**********************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChevronsUpDown)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chevrons-up-down", __iconNode);


//# sourceMappingURL=chevrons-up-down.js.map


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


/***/ },

/***/ "./node_modules/react-remove-scroll-bar/dist/es2015/component.js"
/*!***********************************************************************!*\
  !*** ./node_modules/react-remove-scroll-bar/dist/es2015/component.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoveScrollBar: () => (/* binding */ RemoveScrollBar),
/* harmony export */   lockAttribute: () => (/* binding */ lockAttribute),
/* harmony export */   useLockAttribute: () => (/* binding */ useLockAttribute)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_style_singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-style-singleton */ "./node_modules/react-style-singleton/dist/es2015/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/react-remove-scroll-bar/dist/es2015/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./node_modules/react-remove-scroll-bar/dist/es2015/utils.js");




var Style = (0,react_style_singleton__WEBPACK_IMPORTED_MODULE_1__.styleSingleton)();
var lockAttribute = 'data-scroll-locked';
// important tip - once we measure scrollBar width and remove them
// we could not repeat this operation
// thus we are using style-singleton - only the first "yet correct" style will be applied.
var getStyles = function (_a, allowRelative, gapMode, important) {
    var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
    if (gapMode === void 0) { gapMode = 'margin'; }
    return "\n  .".concat(_constants__WEBPACK_IMPORTED_MODULE_2__.noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
        allowRelative && "position: relative ".concat(important, ";"),
        gapMode === 'margin' &&
            "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
        gapMode === 'padding' && "padding-right: ".concat(gap, "px ").concat(important, ";"),
    ]
        .filter(Boolean)
        .join(''), "\n  }\n  \n  .").concat(_constants__WEBPACK_IMPORTED_MODULE_2__.zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(_constants__WEBPACK_IMPORTED_MODULE_2__.fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(_constants__WEBPACK_IMPORTED_MODULE_2__.zeroRightClassName, " .").concat(_constants__WEBPACK_IMPORTED_MODULE_2__.zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(_constants__WEBPACK_IMPORTED_MODULE_2__.fullWidthClassName, " .").concat(_constants__WEBPACK_IMPORTED_MODULE_2__.fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(_constants__WEBPACK_IMPORTED_MODULE_2__.removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function () {
    var counter = parseInt(document.body.getAttribute(lockAttribute) || '0', 10);
    return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function () {
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
        document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
        return function () {
            var newCounter = getCurrentUseCounter() - 1;
            if (newCounter <= 0) {
                document.body.removeAttribute(lockAttribute);
            }
            else {
                document.body.setAttribute(lockAttribute, newCounter.toString());
            }
        };
    }, []);
};
/**
 * Removes page scrollbar and blocks page scroll when mounted
 */
var RemoveScrollBar = function (_a) {
    var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? 'margin' : _b;
    useLockAttribute();
    /*
     gap will be measured on every component mount
     however it will be used only by the "first" invocation
     due to singleton nature of <Style
     */
    var gap = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () { return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getGapWidth)(gapMode); }, [gapMode]);
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? '!important' : '') });
};


/***/ },

/***/ "./node_modules/react-remove-scroll-bar/dist/es2015/constants.js"
/*!***********************************************************************!*\
  !*** ./node_modules/react-remove-scroll-bar/dist/es2015/constants.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fullWidthClassName: () => (/* binding */ fullWidthClassName),
/* harmony export */   noScrollbarsClassName: () => (/* binding */ noScrollbarsClassName),
/* harmony export */   removedBarSizeVariable: () => (/* binding */ removedBarSizeVariable),
/* harmony export */   zeroRightClassName: () => (/* binding */ zeroRightClassName)
/* harmony export */ });
var zeroRightClassName = 'right-scroll-bar-position';
var fullWidthClassName = 'width-before-scroll-bar';
var noScrollbarsClassName = 'with-scroll-bars-hidden';
/**
 * Name of a CSS variable containing the amount of "hidden" scrollbar
 * ! might be undefined ! use will fallback!
 */
var removedBarSizeVariable = '--removed-body-scroll-bar-size';


/***/ },

/***/ "./node_modules/react-remove-scroll-bar/dist/es2015/index.js"
/*!*******************************************************************!*\
  !*** ./node_modules/react-remove-scroll-bar/dist/es2015/index.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoveScrollBar: () => (/* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.RemoveScrollBar),
/* harmony export */   fullWidthClassName: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.fullWidthClassName),
/* harmony export */   getGapWidth: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.getGapWidth),
/* harmony export */   noScrollbarsClassName: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.noScrollbarsClassName),
/* harmony export */   removedBarSizeVariable: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.removedBarSizeVariable),
/* harmony export */   zeroRightClassName: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_1__.zeroRightClassName)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./node_modules/react-remove-scroll-bar/dist/es2015/component.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./node_modules/react-remove-scroll-bar/dist/es2015/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/react-remove-scroll-bar/dist/es2015/utils.js");






/***/ },

/***/ "./node_modules/react-remove-scroll-bar/dist/es2015/utils.js"
/*!*******************************************************************!*\
  !*** ./node_modules/react-remove-scroll-bar/dist/es2015/utils.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGapWidth: () => (/* binding */ getGapWidth),
/* harmony export */   zeroGap: () => (/* binding */ zeroGap)
/* harmony export */ });
var zeroGap = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0,
};
var parse = function (x) { return parseInt(x || '', 10) || 0; };
var getOffset = function (gapMode) {
    var cs = window.getComputedStyle(document.body);
    var left = cs[gapMode === 'padding' ? 'paddingLeft' : 'marginLeft'];
    var top = cs[gapMode === 'padding' ? 'paddingTop' : 'marginTop'];
    var right = cs[gapMode === 'padding' ? 'paddingRight' : 'marginRight'];
    return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function (gapMode) {
    if (gapMode === void 0) { gapMode = 'margin'; }
    if (typeof window === 'undefined') {
        return zeroGap;
    }
    var offsets = getOffset(gapMode);
    var documentWidth = document.documentElement.clientWidth;
    var windowWidth = window.innerWidth;
    return {
        left: offsets[0],
        top: offsets[1],
        right: offsets[2],
        gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0]),
    };
};


/***/ },

/***/ "./node_modules/react-remove-scroll/dist/es2015/Combination.js"
/*!*********************************************************************!*\
  !*** ./node_modules/react-remove-scroll/dist/es2015/Combination.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./node_modules/react-remove-scroll/dist/es2015/UI.js");
/* harmony import */ var _sidecar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidecar */ "./node_modules/react-remove-scroll/dist/es2015/sidecar.js");




var ReactRemoveScroll = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (props, ref) { return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_UI__WEBPACK_IMPORTED_MODULE_2__.RemoveScroll, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, props, { ref: ref, sideCar: _sidecar__WEBPACK_IMPORTED_MODULE_3__["default"] }))); });
ReactRemoveScroll.classNames = _UI__WEBPACK_IMPORTED_MODULE_2__.RemoveScroll.classNames;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReactRemoveScroll);


/***/ },

/***/ "./node_modules/react-remove-scroll/dist/es2015/SideEffect.js"
/*!********************************************************************!*\
  !*** ./node_modules/react-remove-scroll/dist/es2015/SideEffect.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoveScrollSideCar: () => (/* binding */ RemoveScrollSideCar),
/* harmony export */   getDeltaXY: () => (/* binding */ getDeltaXY),
/* harmony export */   getTouchXY: () => (/* binding */ getTouchXY)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_remove_scroll_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-remove-scroll-bar */ "./node_modules/react-remove-scroll-bar/dist/es2015/index.js");
/* harmony import */ var react_style_singleton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-style-singleton */ "./node_modules/react-style-singleton/dist/es2015/index.js");
/* harmony import */ var _aggresiveCapture__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./aggresiveCapture */ "./node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js");
/* harmony import */ var _handleScroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handleScroll */ "./node_modules/react-remove-scroll/dist/es2015/handleScroll.js");






var getTouchXY = function (event) {
    return 'changedTouches' in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function (event) { return [event.deltaX, event.deltaY]; };
var extractRef = function (ref) {
    return ref && 'current' in ref ? ref.current : ref;
};
var deltaCompare = function (x, y) { return x[0] === y[0] && x[1] === y[1]; };
var generateStyle = function (id) { return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n"); };
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
    var shouldPreventQueue = react__WEBPACK_IMPORTED_MODULE_1__.useRef([]);
    var touchStartRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef([0, 0]);
    var activeAxis = react__WEBPACK_IMPORTED_MODULE_1__.useRef();
    var id = react__WEBPACK_IMPORTED_MODULE_1__.useState(idCounter++)[0];
    var Style = react__WEBPACK_IMPORTED_MODULE_1__.useState(react_style_singleton__WEBPACK_IMPORTED_MODULE_3__.styleSingleton)[0];
    var lastProps = react__WEBPACK_IMPORTED_MODULE_1__.useRef(props);
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(function () {
        lastProps.current = props;
    }, [props]);
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(function () {
        if (props.inert) {
            document.body.classList.add("block-interactivity-".concat(id));
            var allow_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
            allow_1.forEach(function (el) { return el.classList.add("allow-interactivity-".concat(id)); });
            return function () {
                document.body.classList.remove("block-interactivity-".concat(id));
                allow_1.forEach(function (el) { return el.classList.remove("allow-interactivity-".concat(id)); });
            };
        }
        return;
    }, [props.inert, props.lockRef.current, props.shards]);
    var shouldCancelEvent = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(function (event, parent) {
        if (('touches' in event && event.touches.length === 2) || (event.type === 'wheel' && event.ctrlKey)) {
            return !lastProps.current.allowPinchZoom;
        }
        var touch = getTouchXY(event);
        var touchStart = touchStartRef.current;
        var deltaX = 'deltaX' in event ? event.deltaX : touchStart[0] - touch[0];
        var deltaY = 'deltaY' in event ? event.deltaY : touchStart[1] - touch[1];
        var currentAxis;
        var target = event.target;
        var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'h' : 'v';
        // allow horizontal touch move on Range inputs. They will not cause any scroll
        if ('touches' in event && moveDirection === 'h' && target.type === 'range') {
            return false;
        }
        // allow drag selection (iOS); check if selection's anchorNode is the same as target or contains target
        var selection = window.getSelection();
        var anchorNode = selection && selection.anchorNode;
        var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
        if (isTouchingSelection) {
            return false;
        }
        var canBeScrolledInMainDirection = (0,_handleScroll__WEBPACK_IMPORTED_MODULE_5__.locationCouldBeScrolled)(moveDirection, target);
        if (!canBeScrolledInMainDirection) {
            return true;
        }
        if (canBeScrolledInMainDirection) {
            currentAxis = moveDirection;
        }
        else {
            currentAxis = moveDirection === 'v' ? 'h' : 'v';
            canBeScrolledInMainDirection = (0,_handleScroll__WEBPACK_IMPORTED_MODULE_5__.locationCouldBeScrolled)(moveDirection, target);
            // other axis might be not scrollable
        }
        if (!canBeScrolledInMainDirection) {
            return false;
        }
        if (!activeAxis.current && 'changedTouches' in event && (deltaX || deltaY)) {
            activeAxis.current = currentAxis;
        }
        if (!currentAxis) {
            return true;
        }
        var cancelingAxis = activeAxis.current || currentAxis;
        return (0,_handleScroll__WEBPACK_IMPORTED_MODULE_5__.handleScroll)(cancelingAxis, parent, event, cancelingAxis === 'h' ? deltaX : deltaY, true);
    }, []);
    var shouldPrevent = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(function (_event) {
        var event = _event;
        if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
            // not the last active
            return;
        }
        var delta = 'deltaY' in event ? getDeltaXY(event) : getTouchXY(event);
        var sourceEvent = shouldPreventQueue.current.filter(function (e) { return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta); })[0];
        // self event, and should be canceled
        if (sourceEvent && sourceEvent.should) {
            if (event.cancelable) {
                event.preventDefault();
            }
            return;
        }
        // outside or shard event
        if (!sourceEvent) {
            var shardNodes = (lastProps.current.shards || [])
                .map(extractRef)
                .filter(Boolean)
                .filter(function (node) { return node.contains(event.target); });
            var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
            if (shouldStop) {
                if (event.cancelable) {
                    event.preventDefault();
                }
            }
        }
    }, []);
    var shouldCancel = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(function (name, delta, target, should) {
        var event = { name: name, delta: delta, target: target, should: should, shadowParent: getOutermostShadowParent(target) };
        shouldPreventQueue.current.push(event);
        setTimeout(function () {
            shouldPreventQueue.current = shouldPreventQueue.current.filter(function (e) { return e !== event; });
        }, 1);
    }, []);
    var scrollTouchStart = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(function (event) {
        touchStartRef.current = getTouchXY(event);
        activeAxis.current = undefined;
    }, []);
    var scrollWheel = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(function (event) {
        shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    var scrollTouchMove = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(function (event) {
        shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(function () {
        lockStack.push(Style);
        props.setCallbacks({
            onScrollCapture: scrollWheel,
            onWheelCapture: scrollWheel,
            onTouchMoveCapture: scrollTouchMove,
        });
        document.addEventListener('wheel', shouldPrevent, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_4__.nonPassive);
        document.addEventListener('touchmove', shouldPrevent, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_4__.nonPassive);
        document.addEventListener('touchstart', scrollTouchStart, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_4__.nonPassive);
        return function () {
            lockStack = lockStack.filter(function (inst) { return inst !== Style; });
            document.removeEventListener('wheel', shouldPrevent, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_4__.nonPassive);
            document.removeEventListener('touchmove', shouldPrevent, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_4__.nonPassive);
            document.removeEventListener('touchstart', scrollTouchStart, _aggresiveCapture__WEBPACK_IMPORTED_MODULE_4__.nonPassive);
        };
    }, []);
    var removeScrollBar = props.removeScrollBar, inert = props.inert;
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
        inert ? react__WEBPACK_IMPORTED_MODULE_1__.createElement(Style, { styles: generateStyle(id) }) : null,
        removeScrollBar ? react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_remove_scroll_bar__WEBPACK_IMPORTED_MODULE_2__.RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null));
}
function getOutermostShadowParent(node) {
    var shadowParent = null;
    while (node !== null) {
        if (node instanceof ShadowRoot) {
            shadowParent = node.host;
            node = node.host;
        }
        node = node.parentNode;
    }
    return shadowParent;
}


/***/ },

/***/ "./node_modules/react-remove-scroll/dist/es2015/UI.js"
/*!************************************************************!*\
  !*** ./node_modules/react-remove-scroll/dist/es2015/UI.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoveScroll: () => (/* binding */ RemoveScroll)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_remove_scroll_bar_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-remove-scroll-bar/constants */ "./node_modules/react-remove-scroll-bar/dist/es2015/constants.js");
/* harmony import */ var use_callback_ref__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! use-callback-ref */ "./node_modules/use-callback-ref/dist/es2015/useMergeRef.js");
/* harmony import */ var _medium__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./medium */ "./node_modules/react-remove-scroll/dist/es2015/medium.js");





var nothing = function () {
    return;
};
/**
 * Removes scrollbar from the page and contain the scroll within the Lock
 */
var RemoveScroll = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (props, parentRef) {
    var ref = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null);
    var _a = react__WEBPACK_IMPORTED_MODULE_1__.useState({
        onScrollCapture: nothing,
        onWheelCapture: nothing,
        onTouchMoveCapture: nothing,
    }), callbacks = _a[0], setCallbacks = _a[1];
    var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? 'div' : _b, gapMode = props.gapMode, rest = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__rest)(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
    var SideCar = sideCar;
    var containerRef = (0,use_callback_ref__WEBPACK_IMPORTED_MODULE_3__.useMergeRefs)([ref, parentRef]);
    var containerProps = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, rest), callbacks);
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
        enabled && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(SideCar, { sideCar: _medium__WEBPACK_IMPORTED_MODULE_4__.effectCar, removeScrollBar: removeScrollBar, shards: shards, noRelative: noRelative, noIsolation: noIsolation, inert: inert, setCallbacks: setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode: gapMode })),
        forwardProps ? (react__WEBPACK_IMPORTED_MODULE_1__.cloneElement(react__WEBPACK_IMPORTED_MODULE_1__.Children.only(children), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, containerProps), { ref: containerRef }))) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement(Container, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, containerProps, { className: className, ref: containerRef }), children))));
});
RemoveScroll.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false,
};
RemoveScroll.classNames = {
    fullWidth: react_remove_scroll_bar_constants__WEBPACK_IMPORTED_MODULE_2__.fullWidthClassName,
    zeroRight: react_remove_scroll_bar_constants__WEBPACK_IMPORTED_MODULE_2__.zeroRightClassName,
};



/***/ },

/***/ "./node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js"
/*!**************************************************************************!*\
  !*** ./node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nonPassive: () => (/* binding */ nonPassive)
/* harmony export */ });
var passiveSupported = false;
if (typeof window !== 'undefined') {
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                passiveSupported = true;
                return true;
            },
        });
        // @ts-ignore
        window.addEventListener('test', options, options);
        // @ts-ignore
        window.removeEventListener('test', options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
}
var nonPassive = passiveSupported ? { passive: false } : false;


/***/ },

/***/ "./node_modules/react-remove-scroll/dist/es2015/handleScroll.js"
/*!**********************************************************************!*\
  !*** ./node_modules/react-remove-scroll/dist/es2015/handleScroll.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleScroll: () => (/* binding */ handleScroll),
/* harmony export */   locationCouldBeScrolled: () => (/* binding */ locationCouldBeScrolled)
/* harmony export */ });
var alwaysContainsScroll = function (node) {
    // textarea will always _contain_ scroll inside self. It only can be hidden
    return node.tagName === 'TEXTAREA';
};
var elementCanBeScrolled = function (node, overflow) {
    if (!(node instanceof Element)) {
        return false;
    }
    var styles = window.getComputedStyle(node);
    return (
    // not-not-scrollable
    styles[overflow] !== 'hidden' &&
        // contains scroll inside self
        !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === 'visible'));
};
var elementCouldBeVScrolled = function (node) { return elementCanBeScrolled(node, 'overflowY'); };
var elementCouldBeHScrolled = function (node) { return elementCanBeScrolled(node, 'overflowX'); };
var locationCouldBeScrolled = function (axis, node) {
    var ownerDocument = node.ownerDocument;
    var current = node;
    do {
        // Skip over shadow root
        if (typeof ShadowRoot !== 'undefined' && current instanceof ShadowRoot) {
            current = current.host;
        }
        var isScrollable = elementCouldBeScrolled(axis, current);
        if (isScrollable) {
            var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
            if (scrollHeight > clientHeight) {
                return true;
            }
        }
        current = current.parentNode;
    } while (current && current !== ownerDocument.body);
    return false;
};
var getVScrollVariables = function (_a) {
    var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
    return [
        scrollTop,
        scrollHeight,
        clientHeight,
    ];
};
var getHScrollVariables = function (_a) {
    var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
    return [
        scrollLeft,
        scrollWidth,
        clientWidth,
    ];
};
var elementCouldBeScrolled = function (axis, node) {
    return axis === 'v' ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function (axis, node) {
    return axis === 'v' ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function (axis, direction) {
    /**
     * If the element's direction is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position,
     * and then increasingly negative as you scroll towards the end of the content.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
     */
    return axis === 'h' && direction === 'rtl' ? -1 : 1;
};
var handleScroll = function (axis, endTarget, event, sourceDelta, noOverscroll) {
    var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
    var delta = directionFactor * sourceDelta;
    // find scrollable target
    var target = event.target;
    var targetInLock = endTarget.contains(target);
    var shouldCancelScroll = false;
    var isDeltaPositive = delta > 0;
    var availableScroll = 0;
    var availableScrollTop = 0;
    do {
        if (!target) {
            break;
        }
        var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
        var elementScroll = scroll_1 - capacity - directionFactor * position;
        if (position || elementScroll) {
            if (elementCouldBeScrolled(axis, target)) {
                availableScroll += elementScroll;
                availableScrollTop += position;
            }
        }
        var parent_1 = target.parentNode;
        // we will "bubble" from ShadowDom in case we are, or just to the parent in normal case
        // this is the same logic used in focus-lock
        target = (parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1);
    } while (
    // portaled content
    (!targetInLock && target !== document.body) ||
        // self content
        (targetInLock && (endTarget.contains(target) || endTarget === target)));
    // handle epsilon around 0 (non standard zoom levels)
    if (isDeltaPositive &&
        ((noOverscroll && Math.abs(availableScroll) < 1) || (!noOverscroll && delta > availableScroll))) {
        shouldCancelScroll = true;
    }
    else if (!isDeltaPositive &&
        ((noOverscroll && Math.abs(availableScrollTop) < 1) || (!noOverscroll && -delta > availableScrollTop))) {
        shouldCancelScroll = true;
    }
    return shouldCancelScroll;
};


/***/ },

/***/ "./node_modules/react-remove-scroll/dist/es2015/medium.js"
/*!****************************************************************!*\
  !*** ./node_modules/react-remove-scroll/dist/es2015/medium.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   effectCar: () => (/* binding */ effectCar)
/* harmony export */ });
/* harmony import */ var use_sidecar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! use-sidecar */ "./node_modules/use-sidecar/dist/es2015/medium.js");

var effectCar = (0,use_sidecar__WEBPACK_IMPORTED_MODULE_0__.createSidecarMedium)();


/***/ },

/***/ "./node_modules/react-remove-scroll/dist/es2015/sidecar.js"
/*!*****************************************************************!*\
  !*** ./node_modules/react-remove-scroll/dist/es2015/sidecar.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var use_sidecar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! use-sidecar */ "./node_modules/use-sidecar/dist/es2015/exports.js");
/* harmony import */ var _SideEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SideEffect */ "./node_modules/react-remove-scroll/dist/es2015/SideEffect.js");
/* harmony import */ var _medium__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./medium */ "./node_modules/react-remove-scroll/dist/es2015/medium.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,use_sidecar__WEBPACK_IMPORTED_MODULE_0__.exportSidecar)(_medium__WEBPACK_IMPORTED_MODULE_2__.effectCar, _SideEffect__WEBPACK_IMPORTED_MODULE_1__.RemoveScrollSideCar));


/***/ },

/***/ "./node_modules/react-style-singleton/dist/es2015/component.js"
/*!*********************************************************************!*\
  !*** ./node_modules/react-style-singleton/dist/es2015/component.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   styleSingleton: () => (/* binding */ styleSingleton)
/* harmony export */ });
/* harmony import */ var _hook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hook */ "./node_modules/react-style-singleton/dist/es2015/hook.js");

/**
 * create a Component to add styles on demand
 * - styles are added when first instance is mounted
 * - styles are removed when the last instance is unmounted
 * - changing styles in runtime does nothing unless dynamic is set. But with multiple components that can lead to the undefined behavior
 */
var styleSingleton = function () {
    var useStyle = (0,_hook__WEBPACK_IMPORTED_MODULE_0__.styleHookSingleton)();
    var Sheet = function (_a) {
        var styles = _a.styles, dynamic = _a.dynamic;
        useStyle(styles, dynamic);
        return null;
    };
    return Sheet;
};


/***/ },

/***/ "./node_modules/react-style-singleton/dist/es2015/hook.js"
/*!****************************************************************!*\
  !*** ./node_modules/react-style-singleton/dist/es2015/hook.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   styleHookSingleton: () => (/* binding */ styleHookSingleton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./singleton */ "./node_modules/react-style-singleton/dist/es2015/singleton.js");


/**
 * creates a hook to control style singleton
 * @see {@link styleSingleton} for a safer component version
 * @example
 * ```tsx
 * const useStyle = styleHookSingleton();
 * ///
 * useStyle('body { overflow: hidden}');
 */
var styleHookSingleton = function () {
    var sheet = (0,_singleton__WEBPACK_IMPORTED_MODULE_1__.stylesheetSingleton)();
    return function (styles, isDynamic) {
        react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
            sheet.add(styles);
            return function () {
                sheet.remove();
            };
        }, [styles && isDynamic]);
    };
};


/***/ },

/***/ "./node_modules/react-style-singleton/dist/es2015/index.js"
/*!*****************************************************************!*\
  !*** ./node_modules/react-style-singleton/dist/es2015/index.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   styleHookSingleton: () => (/* reexport safe */ _hook__WEBPACK_IMPORTED_MODULE_2__.styleHookSingleton),
/* harmony export */   styleSingleton: () => (/* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_0__.styleSingleton),
/* harmony export */   stylesheetSingleton: () => (/* reexport safe */ _singleton__WEBPACK_IMPORTED_MODULE_1__.stylesheetSingleton)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./node_modules/react-style-singleton/dist/es2015/component.js");
/* harmony import */ var _singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./singleton */ "./node_modules/react-style-singleton/dist/es2015/singleton.js");
/* harmony import */ var _hook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hook */ "./node_modules/react-style-singleton/dist/es2015/hook.js");





/***/ },

/***/ "./node_modules/react-style-singleton/dist/es2015/singleton.js"
/*!*********************************************************************!*\
  !*** ./node_modules/react-style-singleton/dist/es2015/singleton.js ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stylesheetSingleton: () => (/* binding */ stylesheetSingleton)
/* harmony export */ });
/* harmony import */ var get_nonce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! get-nonce */ "./node_modules/get-nonce/dist/es2015/index.js");

function makeStyleTag() {
    if (!document)
        return null;
    var tag = document.createElement('style');
    tag.type = 'text/css';
    var nonce = (0,get_nonce__WEBPACK_IMPORTED_MODULE_0__.getNonce)();
    if (nonce) {
        tag.setAttribute('nonce', nonce);
    }
    return tag;
}
function injectStyles(tag, css) {
    // @ts-ignore
    if (tag.styleSheet) {
        // @ts-ignore
        tag.styleSheet.cssText = css;
    }
    else {
        tag.appendChild(document.createTextNode(css));
    }
}
function insertStyleTag(tag) {
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(tag);
}
var stylesheetSingleton = function () {
    var counter = 0;
    var stylesheet = null;
    return {
        add: function (style) {
            if (counter == 0) {
                if ((stylesheet = makeStyleTag())) {
                    injectStyles(stylesheet, style);
                    insertStyleTag(stylesheet);
                }
            }
            counter++;
        },
        remove: function () {
            counter--;
            if (!counter && stylesheet) {
                stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
                stylesheet = null;
            }
        },
    };
};


/***/ },

/***/ "./node_modules/use-callback-ref/dist/es2015/assignRef.js"
/*!****************************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es2015/assignRef.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assignRef: () => (/* binding */ assignRef)
/* harmony export */ });
/**
 * Assigns a value for a given ref, no matter of the ref format
 * @param {RefObject} ref - a callback function or ref object
 * @param value - a new value
 *
 * @see https://github.com/theKashey/use-callback-ref#assignref
 * @example
 * const refObject = useRef();
 * const refFn = (ref) => {....}
 *
 * assignRef(refObject, "refValue");
 * assignRef(refFn, "refValue");
 */
function assignRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (ref) {
        ref.current = value;
    }
    return ref;
}


/***/ },

/***/ "./node_modules/use-callback-ref/dist/es2015/useMergeRef.js"
/*!******************************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es2015/useMergeRef.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMergeRefs: () => (/* binding */ useMergeRefs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assignRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assignRef */ "./node_modules/use-callback-ref/dist/es2015/assignRef.js");
/* harmony import */ var _useRef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useRef */ "./node_modules/use-callback-ref/dist/es2015/useRef.js");



var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
var currentValues = new WeakMap();
/**
 * Merges two or more refs together providing a single interface to set their value
 * @param {RefObject|Ref} refs
 * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
 *
 * @see {@link mergeRefs} a version without buit-in memoization
 * @see https://github.com/theKashey/use-callback-ref#usemergerefs
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const ownRef = useRef();
 *   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
 *   return <div ref={domRef}>...</div>
 * }
 */
function useMergeRefs(refs, defaultValue) {
    var callbackRef = (0,_useRef__WEBPACK_IMPORTED_MODULE_2__.useCallbackRef)(defaultValue || null, function (newValue) {
        return refs.forEach(function (ref) { return (0,_assignRef__WEBPACK_IMPORTED_MODULE_1__.assignRef)(ref, newValue); });
    });
    // handle refs changes - added or removed
    useIsomorphicLayoutEffect(function () {
        var oldValue = currentValues.get(callbackRef);
        if (oldValue) {
            var prevRefs_1 = new Set(oldValue);
            var nextRefs_1 = new Set(refs);
            var current_1 = callbackRef.current;
            prevRefs_1.forEach(function (ref) {
                if (!nextRefs_1.has(ref)) {
                    (0,_assignRef__WEBPACK_IMPORTED_MODULE_1__.assignRef)(ref, null);
                }
            });
            nextRefs_1.forEach(function (ref) {
                if (!prevRefs_1.has(ref)) {
                    (0,_assignRef__WEBPACK_IMPORTED_MODULE_1__.assignRef)(ref, current_1);
                }
            });
        }
        currentValues.set(callbackRef, refs);
    }, [refs]);
    return callbackRef;
}


/***/ },

/***/ "./node_modules/use-callback-ref/dist/es2015/useRef.js"
/*!*************************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es2015/useRef.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCallbackRef: () => (/* binding */ useCallbackRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * creates a MutableRef with ref change callback
 * @param initialValue - initial ref value
 * @param {Function} callback - a callback to run when value changes
 *
 * @example
 * const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
 * ref.current = 1;
 * // prints 0 -> 1
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 * @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
 * @returns {MutableRefObject}
 */
function useCallbackRef(initialValue, callback) {
    var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () { return ({
        // value
        value: initialValue,
        // last callback
        callback: callback,
        // "memoized" public interface
        facade: {
            get current() {
                return ref.value;
            },
            set current(value) {
                var last = ref.value;
                if (last !== value) {
                    ref.value = value;
                    ref.callback(value, last);
                }
            },
        },
    }); })[0];
    // update callback
    ref.callback = callback;
    return ref.facade;
}


/***/ },

/***/ "./node_modules/use-sidecar/dist/es2015/exports.js"
/*!*********************************************************!*\
  !*** ./node_modules/use-sidecar/dist/es2015/exports.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportSidecar: () => (/* binding */ exportSidecar)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var SideCar = function (_a) {
    var sideCar = _a.sideCar, rest = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__rest)(_a, ["sideCar"]);
    if (!sideCar) {
        throw new Error('Sidecar: please provide `sideCar` property to import the right car');
    }
    var Target = sideCar.read();
    if (!Target) {
        throw new Error('Sidecar medium not found');
    }
    return react__WEBPACK_IMPORTED_MODULE_1__.createElement(Target, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
    medium.useMedium(exported);
    return SideCar;
}


/***/ },

/***/ "./node_modules/use-sidecar/dist/es2015/medium.js"
/*!********************************************************!*\
  !*** ./node_modules/use-sidecar/dist/es2015/medium.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMedium: () => (/* binding */ createMedium),
/* harmony export */   createSidecarMedium: () => (/* binding */ createSidecarMedium)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");

function ItoI(a) {
    return a;
}
function innerCreateMedium(defaults, middleware) {
    if (middleware === void 0) { middleware = ItoI; }
    var buffer = [];
    var assigned = false;
    var medium = {
        read: function () {
            if (assigned) {
                throw new Error('Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.');
            }
            if (buffer.length) {
                return buffer[buffer.length - 1];
            }
            return defaults;
        },
        useMedium: function (data) {
            var item = middleware(data, assigned);
            buffer.push(item);
            return function () {
                buffer = buffer.filter(function (x) { return x !== item; });
            };
        },
        assignSyncMedium: function (cb) {
            assigned = true;
            while (buffer.length) {
                var cbs = buffer;
                buffer = [];
                cbs.forEach(cb);
            }
            buffer = {
                push: function (x) { return cb(x); },
                filter: function () { return buffer; },
            };
        },
        assignMedium: function (cb) {
            assigned = true;
            var pendingQueue = [];
            if (buffer.length) {
                var cbs = buffer;
                buffer = [];
                cbs.forEach(cb);
                pendingQueue = buffer;
            }
            var executeQueue = function () {
                var cbs = pendingQueue;
                pendingQueue = [];
                cbs.forEach(cb);
            };
            var cycle = function () { return Promise.resolve().then(executeQueue); };
            cycle();
            buffer = {
                push: function (x) {
                    pendingQueue.push(x);
                    cycle();
                },
                filter: function (filter) {
                    pendingQueue = pendingQueue.filter(filter);
                    return buffer;
                },
            };
        },
    };
    return medium;
}
function createMedium(defaults, middleware) {
    if (middleware === void 0) { middleware = ItoI; }
    return innerCreateMedium(defaults, middleware);
}
// eslint-disable-next-line @typescript-eslint/ban-types
function createSidecarMedium(options) {
    if (options === void 0) { options = {}; }
    var medium = innerCreateMedium(null);
    medium.options = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({ async: true, ssr: false }, options);
    return medium;
}


/***/ },

/***/ "./node_modules/@radix-ui/primitive/dist/index.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@radix-ui/primitive/dist/index.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canUseDOM: () => (/* binding */ canUseDOM),
/* harmony export */   composeEventHandlers: () => (/* binding */ composeEventHandlers),
/* harmony export */   getActiveElement: () => (/* binding */ getActiveElement),
/* harmony export */   getOwnerDocument: () => (/* binding */ getOwnerDocument),
/* harmony export */   getOwnerWindow: () => (/* binding */ getOwnerWindow),
/* harmony export */   isFrame: () => (/* binding */ isFrame)
/* harmony export */ });
// src/primitive.tsx
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
function getOwnerWindow(element) {
  if (!canUseDOM) {
    throw new Error("Cannot access window outside of the DOM");
  }
  return element?.ownerDocument?.defaultView ?? window;
}
function getOwnerDocument(element) {
  if (!canUseDOM) {
    throw new Error("Cannot access document outside of the DOM");
  }
  return element?.ownerDocument ?? document;
}
function getActiveElement(node, activeDescendant = false) {
  const { activeElement } = getOwnerDocument(node);
  if (!activeElement?.nodeName) {
    return null;
  }
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(activeElement.contentDocument.body, activeDescendant);
  }
  if (activeDescendant) {
    const id = activeElement.getAttribute("aria-activedescendant");
    if (id) {
      const element = getOwnerDocument(activeElement).getElementById(id);
      if (element) {
        return element;
      }
    }
  }
  return activeElement;
}
function isFrame(element) {
  return element.tagName === "IFRAME";
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-context/dist/index.mjs"
/*!*************************************************************!*\
  !*** ./node_modules/@radix-ui/react-context/dist/index.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContext: () => (/* binding */ createContext2),
/* harmony export */   createContextScope: () => (/* binding */ createContextScope)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
// packages/react/context/src/create-context.tsx


function createContext2(rootComponentName, defaultContext) {
  const Context = react__WEBPACK_IMPORTED_MODULE_0__.createContext(defaultContext);
  const Provider = (props) => {
    const { children, ...context } = props;
    const value = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Context.Provider, { value, children });
  };
  Provider.displayName = rootComponentName + "Provider";
  function useContext2(consumerName) {
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(Context);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  return [Provider, useContext2];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return react__WEBPACK_IMPORTED_MODULE_0__.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-dialog/dist/index.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@radix-ui/react-dialog/dist/index.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Close: () => (/* binding */ Close),
/* harmony export */   Content: () => (/* binding */ Content),
/* harmony export */   Description: () => (/* binding */ Description),
/* harmony export */   Dialog: () => (/* binding */ Dialog),
/* harmony export */   DialogClose: () => (/* binding */ DialogClose),
/* harmony export */   DialogContent: () => (/* binding */ DialogContent),
/* harmony export */   DialogDescription: () => (/* binding */ DialogDescription),
/* harmony export */   DialogOverlay: () => (/* binding */ DialogOverlay),
/* harmony export */   DialogPortal: () => (/* binding */ DialogPortal),
/* harmony export */   DialogTitle: () => (/* binding */ DialogTitle),
/* harmony export */   DialogTrigger: () => (/* binding */ DialogTrigger),
/* harmony export */   Overlay: () => (/* binding */ Overlay),
/* harmony export */   Portal: () => (/* binding */ Portal),
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   Title: () => (/* binding */ Title),
/* harmony export */   Trigger: () => (/* binding */ Trigger),
/* harmony export */   WarningProvider: () => (/* binding */ WarningProvider),
/* harmony export */   createDialogScope: () => (/* binding */ createDialogScope)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/primitive */ "./node_modules/@radix-ui/primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "./node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-context */ "./node_modules/@radix-ui/react-context/dist/index.mjs");
/* harmony import */ var _radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-id */ "./node_modules/@radix-ui/react-id/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/react-use-controllable-state */ "./node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs");
/* harmony import */ var _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @radix-ui/react-dismissable-layer */ "./node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs");
/* harmony import */ var _radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @radix-ui/react-focus-scope */ "./node_modules/@radix-ui/react-focus-scope/dist/index.mjs");
/* harmony import */ var _radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @radix-ui/react-portal */ "./node_modules/@radix-ui/react-portal/dist/index.mjs");
/* harmony import */ var _radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @radix-ui/react-presence */ "./node_modules/@radix-ui/react-presence/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @radix-ui/react-primitive */ "./node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_focus_guards__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @radix-ui/react-focus-guards */ "./node_modules/@radix-ui/react-focus-guards/dist/index.mjs");
/* harmony import */ var react_remove_scroll__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-remove-scroll */ "./node_modules/react-remove-scroll/dist/es2015/Combination.js");
/* harmony import */ var aria_hidden__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! aria-hidden */ "./node_modules/aria-hidden/dist/es2015/index.js");
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @radix-ui/react-slot */ "./node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";

// src/dialog.tsx
















var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_3__.createContextScope)(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const [open, setOpen] = (0,_radix_ui_react_use_controllable_state__WEBPACK_IMPORTED_MODULE_5__.useControllableState)({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.useId)(),
      titleId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.useId)(),
      descriptionId: (0,_radix_ui_react_id__WEBPACK_IMPORTED_MODULE_4__.useId)(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.useComposedRefs)(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
      _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__.Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_1__.composeEventHandlers)(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(PortalProvider, { scope: __scopeDialog, forceMount, children: react__WEBPACK_IMPORTED_MODULE_0__.Children.map(children, (child) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__.Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_radix_ui_react_portal__WEBPACK_IMPORTED_MODULE_8__.Portal, { asChild: true, container, children: child }) })) });
};
DialogPortal.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__.Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay.displayName = OVERLAY_NAME;
var Slot = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_14__.createSlot)("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_remove_scroll__WEBPACK_IMPORTED_MODULE_12__["default"], { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
        _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__.Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_radix_ui_react_presence__WEBPACK_IMPORTED_MODULE_9__.Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent.displayName = CONTENT_NAME;
var DialogContentModal = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.useComposedRefs)(forwardedRef, context.contentRef, contentRef);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      const content = contentRef.current;
      if (content) return (0,aria_hidden__WEBPACK_IMPORTED_MODULE_13__.hideOthers)(content);
    }, []);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_1__.composeEventHandlers)(props.onCloseAutoFocus, (event) => {
          event.preventDefault();
          context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_1__.composeEventHandlers)(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_1__.composeEventHandlers)(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    const hasPointerDownOutsideRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          props.onCloseAutoFocus?.(event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          props.onInteractOutside?.(event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.useComposedRefs)(forwardedRef, contentRef);
    (0,_radix_ui_react_focus_guards__WEBPACK_IMPORTED_MODULE_11__.useFocusGuards)();
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.Fragment, { children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
        _radix_ui_react_focus_scope__WEBPACK_IMPORTED_MODULE_7__.FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
            _radix_ui_react_dismissable_layer__WEBPACK_IMPORTED_MODULE_6__.DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.Fragment, { children: [
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__.Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__.Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(
      _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_10__.Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_1__.composeEventHandlers)(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_3__.createContext)(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const describedById = contentRef.current?.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog;
var Trigger = DialogTrigger;
var Portal = DialogPortal;
var Overlay = DialogOverlay;
var Content = DialogContent;
var Title = DialogTitle;
var Description = DialogDescription;
var Close = DialogClose;

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-slot/dist/index.mjs"
/*!**********************************************************************************************!*\
  !*** ./node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-slot/dist/index.mjs ***!
  \**********************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Root: () => (/* binding */ Slot),
/* harmony export */   Slot: () => (/* binding */ Slot),
/* harmony export */   Slottable: () => (/* binding */ Slottable),
/* harmony export */   createSlot: () => (/* binding */ createSlot),
/* harmony export */   createSlottable: () => (/* binding */ createSlottable)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "./node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
// src/slot.tsx



// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (react__WEBPACK_IMPORTED_MODULE_0__.Children.count(newElement) > 1) return react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null);
          return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement) ? react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
        props2.ref = forwardedRef ? (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__.composeRefs)(forwardedRef, childrenRef) : childrenRef;
      }
      return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, props2);
    }
    return react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children) > 1 ? react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
  const Slottable2 = ({ children }) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, { children });
  };
  Slottable2.displayName = `${ownerName}.Slottable`;
  Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
  return Slottable2;
}
var Slottable = /* @__PURE__ */ createSlottable("Slottable");
function isSlottable(child) {
  return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Branch: () => (/* binding */ Branch),
/* harmony export */   DismissableLayer: () => (/* binding */ DismissableLayer),
/* harmony export */   DismissableLayerBranch: () => (/* binding */ DismissableLayerBranch),
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _radix_ui_primitive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/primitive */ "./node_modules/@radix-ui/primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-primitive */ "./node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "./node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_escape_keydown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @radix-ui/react-use-escape-keydown */ "./node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";

// src/dismissable-layer.tsx







var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var DismissableLayer = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
  (props, forwardedRef) => {
    const {
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;
    const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DismissableLayerContext);
    const [node, setNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = react__WEBPACK_IMPORTED_MODULE_0__.useState({});
    const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.useComposedRefs)(forwardedRef, (node2) => setNode(node2));
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target;
      const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
      if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
      onPointerDownOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    const focusOutside = useFocusOutside((event) => {
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
      if (isFocusInBranch) return;
      onFocusOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    (0,_radix_ui_react_use_escape_keydown__WEBPACK_IMPORTED_MODULE_5__.useEscapeKeydown)((event) => {
      const isHighestLayer = index === context.layers.size - 1;
      if (!isHighestLayer) return;
      onEscapeKeyDown?.(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    }, ownerDocument);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();
      return () => {
        if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
          ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      const handleUpdate = () => force({});
      document.addEventListener(CONTEXT_UPDATE, handleUpdate);
      return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(
      _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.Primitive.div,
      {
        ...layerProps,
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
          ...props.style
        },
        onFocusCapture: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_1__.composeEventHandlers)(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_1__.composeEventHandlers)(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: (0,_radix_ui_primitive__WEBPACK_IMPORTED_MODULE_1__.composeEventHandlers)(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture
        )
      }
    );
  }
);
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
  const context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DismissableLayerContext);
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_3__.useComposedRefs)(forwardedRef, ref);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }
  }, [context.branches]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.Primitive.div, { ...props, ref: composedRefs });
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
  const handlePointerDownOutside = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_4__.useCallbackRef)(onPointerDownOutside);
  const isPointerInsideReactTreeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  const handleClickRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(() => {
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          handleAndDispatchCustomEvent(
            POINTER_DOWN_OUTSIDE,
            handlePointerDownOutside,
            eventDetail,
            { discrete: true }
          );
        };
        var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
        const eventDetail = { originalEvent: event };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent2();
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_4__.useCallbackRef)(onFocusOutside);
  const isFocusInsideReactTreeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler) target.addEventListener(name, handler, { once: true });
  if (discrete) {
    (0,_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.dispatchDiscreteCustomEvent)(target, event);
  } else {
    target.dispatchEvent(event);
  }
}
var Root = DismissableLayer;
var Branch = DismissableLayerBranch;

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-focus-guards/dist/index.mjs"
/*!******************************************************************!*\
  !*** ./node_modules/@radix-ui/react-focus-guards/dist/index.mjs ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusGuards: () => (/* binding */ FocusGuards),
/* harmony export */   Root: () => (/* binding */ FocusGuards),
/* harmony export */   useFocusGuards: () => (/* binding */ useFocusGuards)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
"use client";

// src/focus-guards.tsx

var count = 0;
function FocusGuards(props) {
  useFocusGuards();
  return props.children;
}
function useFocusGuards() {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
    document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
    count++;
    return () => {
      if (count === 1) {
        document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
      }
      count--;
    };
  }, []);
}
function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-focus-scope/dist/index.mjs"
/*!*****************************************************************!*\
  !*** ./node_modules/@radix-ui/react-focus-scope/dist/index.mjs ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusScope: () => (/* binding */ FocusScope),
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "./node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-primitive */ "./node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";

// src/focus-scope.tsx





var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
  const {
    loop = false,
    trapped = false,
    onMountAutoFocus: onMountAutoFocusProp,
    onUnmountAutoFocus: onUnmountAutoFocusProp,
    ...scopeProps
  } = props;
  const [container, setContainer] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
  const onMountAutoFocus = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_3__.useCallbackRef)(onMountAutoFocusProp);
  const onUnmountAutoFocus = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_3__.useCallbackRef)(onUnmountAutoFocusProp);
  const lastFocusedElementRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__.useComposedRefs)(forwardedRef, (node) => setContainer(node));
  const focusScope = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  }).current;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (trapped) {
      let handleFocusIn2 = function(event) {
        if (focusScope.paused || !container) return;
        const target = event.target;
        if (container.contains(target)) {
          lastFocusedElementRef.current = target;
        } else {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleFocusOut2 = function(event) {
        if (focusScope.paused || !container) return;
        const relatedTarget = event.relatedTarget;
        if (relatedTarget === null) return;
        if (!container.contains(relatedTarget)) {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleMutations2 = function(mutations) {
        const focusedElement = document.activeElement;
        if (focusedElement !== document.body) return;
        for (const mutation of mutations) {
          if (mutation.removedNodes.length > 0) focus(container);
        }
      };
      var handleFocusIn = handleFocusIn2, handleFocusOut = handleFocusOut2, handleMutations = handleMutations2;
      document.addEventListener("focusin", handleFocusIn2);
      document.addEventListener("focusout", handleFocusOut2);
      const mutationObserver = new MutationObserver(handleMutations2);
      if (container) mutationObserver.observe(container, { childList: true, subtree: true });
      return () => {
        document.removeEventListener("focusin", handleFocusIn2);
        document.removeEventListener("focusout", handleFocusOut2);
        mutationObserver.disconnect();
      };
    }
  }, [trapped, container, focusScope.paused]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (container) {
      focusScopesStack.add(focusScope);
      const previouslyFocusedElement = document.activeElement;
      const hasFocusedCandidate = container.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
          if (document.activeElement === previouslyFocusedElement) {
            focus(container);
          }
        }
      }
      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        setTimeout(() => {
          const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented) {
            focus(previouslyFocusedElement ?? document.body, { select: true });
          }
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          focusScopesStack.remove(focusScope);
        }, 0);
      };
    }
  }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
  const handleKeyDown = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (event) => {
      if (!loop && !trapped) return;
      if (focusScope.paused) return;
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
      const focusedElement = document.activeElement;
      if (isTabKey && focusedElement) {
        const container2 = event.currentTarget;
        const [first, last] = getTabbableEdges(container2);
        const hasTabbableElementsInside = first && last;
        if (!hasTabbableElementsInside) {
          if (focusedElement === container2) event.preventDefault();
        } else {
          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            if (loop) focus(first, { select: true });
          } else if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            if (loop) focus(last, { select: true });
          }
        }
      }
    },
    [loop, trapped, focusScope.paused]
  );
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container })) return element;
  }
}
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    if (upTo !== void 0 && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement;
  }
  return false;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
      element.select();
  }
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      stack = arrayRemove(stack, focusScope);
      stack[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}
var Root = FocusScope;

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-id/dist/index.mjs"
/*!********************************************************!*\
  !*** ./node_modules/@radix-ui/react-id/dist/index.mjs ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useId: () => (/* binding */ useId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
// packages/react/id/src/id.tsx


var useReactId = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))[" useId ".trim().toString()] || (() => void 0);
var count = 0;
function useId(deterministicId) {
  const [id, setId] = react__WEBPACK_IMPORTED_MODULE_0__.useState(useReactId());
  (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (!deterministicId) setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-portal/dist/index.mjs"
/*!************************************************************!*\
  !*** ./node_modules/@radix-ui/react-portal/dist/index.mjs ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Portal: () => (/* binding */ Portal),
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-primitive */ "./node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";

// src/portal.tsx





var PORTAL_NAME = "Portal";
var Portal = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(/* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal.displayName = PORTAL_NAME;
var Root = Portal;

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-presence/dist/index.mjs"
/*!**************************************************************!*\
  !*** ./node_modules/@radix-ui/react-presence/dist/index.mjs ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Presence: () => (/* binding */ Presence),
/* harmony export */   Root: () => (/* binding */ Root)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "./node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
"use client";

// src/presence.tsx




// src/use-state-machine.tsx

function useStateMachine(initialState, machine) {
  return react__WEBPACK_IMPORTED_MODULE_0__.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}

// src/presence.tsx
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : react__WEBPACK_IMPORTED_MODULE_0__.Children.only(children);
  const ref = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__.useComposedRefs)(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  const stylesRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  const prevPresentRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(present);
  const prevAnimationNameRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_2__.useLayoutEffect)(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_2__.useLayoutEffect)(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: react__WEBPACK_IMPORTED_MODULE_0__.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return styles?.animationName || "none";
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var Root = Presence;

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-primitive/dist/index.mjs"
/*!***************************************************************!*\
  !*** ./node_modules/@radix-ui/react-primitive/dist/index.mjs ***!
  \***************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Primitive: () => (/* binding */ Primitive),
/* harmony export */   Root: () => (/* binding */ Root),
/* harmony export */   dispatchDiscreteCustomEvent: () => (/* binding */ dispatchDiscreteCustomEvent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-slot */ "./node_modules/@radix-ui/react-primitive/node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
// src/primitive.tsx




var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_2__.createSlot)(`Primitive.${node}`);
  const Node = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(() => target.dispatchEvent(event));
}
var Root = Primitive;

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-primitive/node_modules/@radix-ui/react-slot/dist/index.mjs"
/*!*************************************************************************************************!*\
  !*** ./node_modules/@radix-ui/react-primitive/node_modules/@radix-ui/react-slot/dist/index.mjs ***!
  \*************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Root: () => (/* binding */ Slot),
/* harmony export */   Slot: () => (/* binding */ Slot),
/* harmony export */   Slottable: () => (/* binding */ Slottable),
/* harmony export */   createSlot: () => (/* binding */ createSlot),
/* harmony export */   createSlottable: () => (/* binding */ createSlottable)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "./node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
// src/slot.tsx



// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (react__WEBPACK_IMPORTED_MODULE_0__.Children.count(newElement) > 1) return react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null);
          return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement) ? react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
        props2.ref = forwardedRef ? (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_1__.composeRefs)(forwardedRef, childrenRef) : childrenRef;
      }
      return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, props2);
    }
    return react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children) > 1 ? react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
  const Slottable2 = ({ children }) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, { children });
  };
  Slottable2.displayName = `${ownerName}.Slottable`;
  Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
  return Slottable2;
}
var Slottable = /* @__PURE__ */ createSlottable("Slottable");
function isSlottable(child) {
  return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCallbackRef: () => (/* binding */ useCallbackRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
// packages/react/use-callback-ref/src/use-callback-ref.tsx

function useCallbackRef(callback) {
  const callbackRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(callback);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    callbackRef.current = callback;
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useControllableState: () => (/* binding */ useControllableState),
/* harmony export */   useControllableStateReducer: () => (/* binding */ useControllableStateReducer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
/* harmony import */ var _radix_ui_react_use_effect_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-use-effect-event */ "./node_modules/@radix-ui/react-use-effect-event/dist/index.mjs");
// src/use-controllable-state.tsx


var useInsertionEffect = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2)))[" useInsertionEffect ".trim().toString()] || _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect;
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  },
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  if (true) {
    const isControlledRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(prop !== void 0);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (nextValue) => {
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = react__WEBPACK_IMPORTED_MODULE_0__.useState(defaultProp);
  const prevValueRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(value);
  const onChangeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction(value) {
  return typeof value === "function";
}

// src/use-controllable-state-reducer.tsx


var SYNC_STATE = Symbol("RADIX:SYNC_STATE");
function useControllableStateReducer(reducer, userArgs, initialArg, init) {
  const { prop: controlledState, defaultProp, onChange: onChangeProp, caller } = userArgs;
  const isControlled = controlledState !== void 0;
  const onChange = (0,_radix_ui_react_use_effect_event__WEBPACK_IMPORTED_MODULE_2__.useEffectEvent)(onChangeProp);
  if (true) {
    const isControlledRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(controlledState !== void 0);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const args = [{ ...initialArg, state: defaultProp }];
  if (init) {
    args.push(init);
  }
  const [internalState, dispatch] = react__WEBPACK_IMPORTED_MODULE_0__.useReducer(
    (state2, action) => {
      if (action.type === SYNC_STATE) {
        return { ...state2, state: action.state };
      }
      const next = reducer(state2, action);
      if (isControlled && !Object.is(next.state, state2.state)) {
        onChange(next.state);
      }
      return next;
    },
    ...args
  );
  const uncontrolledState = internalState.state;
  const prevValueRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(uncontrolledState);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (prevValueRef.current !== uncontrolledState) {
      prevValueRef.current = uncontrolledState;
      if (!isControlled) {
        onChange(uncontrolledState);
      }
    }
  }, [onChange, uncontrolledState, prevValueRef, isControlled]);
  const state = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const isControlled2 = controlledState !== void 0;
    if (isControlled2) {
      return { ...internalState, state: controlledState };
    }
    return internalState;
  }, [internalState, controlledState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (isControlled && !Object.is(controlledState, internalState.state)) {
      dispatch({ type: SYNC_STATE, state: controlledState });
    }
  }, [controlledState, internalState.state, isControlled]);
  return [state, dispatch];
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-use-effect-event/dist/index.mjs"
/*!**********************************************************************!*\
  !*** ./node_modules/@radix-ui/react-use-effect-event/dist/index.mjs ***!
  \**********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

var react__WEBPACK_IMPORTED_MODULE_1___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useEffectEvent: () => (/* binding */ useEffectEvent)
/* harmony export */ });
/* harmony import */ var _radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @radix-ui/react-use-layout-effect */ "./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
// src/use-effect-event.tsx


var useReactEffectEvent = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_1___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_1___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_1__, 2)))[" useEffectEvent ".trim().toString()];
var useReactInsertionEffect = /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_1___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_1___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_1__, 2)))[" useInsertionEffect ".trim().toString()];
function useEffectEvent(callback) {
  if (typeof useReactEffectEvent === "function") {
    return useReactEffectEvent(callback);
  }
  const ref = react__WEBPACK_IMPORTED_MODULE_1__.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  if (typeof useReactInsertionEffect === "function") {
    useReactInsertionEffect(() => {
      ref.current = callback;
    });
  } else {
    (0,_radix_ui_react_use_layout_effect__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
      ref.current = callback;
    });
  }
  return react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => (...args) => ref.current?.(...args), []);
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs"
/*!************************************************************************!*\
  !*** ./node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs ***!
  \************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useEscapeKeydown: () => (/* binding */ useEscapeKeydown)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-use-callback-ref */ "./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs");
// packages/react/use-escape-keydown/src/use-escape-keydown.tsx


function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = (0,_radix_ui_react_use_callback_ref__WEBPACK_IMPORTED_MODULE_1__.useCallbackRef)(onEscapeKeyDownProp);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs"
/*!***********************************************************************!*\
  !*** ./node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLayoutEffect: () => (/* binding */ useLayoutEffect2)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
// packages/react/use-layout-effect/src/use-layout-effect.tsx

var useLayoutEffect2 = globalThis?.document ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : () => {
};

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "./node_modules/tslib/tslib.es6.mjs"
/*!******************************************!*\
  !*** ./node_modules/tslib/tslib.es6.mjs ***!
  \******************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __rewriteRelativeImportExtension: () => (/* binding */ __rewriteRelativeImportExtension),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension,
});


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX01lbWJlcnNfdHN4LmpzP2lkPTA5MTJhOTFiOGQwMzg2Y2QiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQztBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksTUFBTTtBQUNsQjtBQUNPO0FBQ1AsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1RixTQUFTLGdCQUFnQjtBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9hcmlhLWhpZGRlbi9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9tZW1iZXJzL0RlbGV0ZU1lbWJlckRpYWxvZy50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvbWVtYmVycy9NZW1iZXJGb3JtLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9tZW1iZXJzL01lbWJlclRhYmxlLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9kaWFsb2cudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3VpL2lucHV0LnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS90YWJsZS50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2xpYi9tZW1iZXJBcGkudHMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL3BhZ2VzL01lbWJlcnMudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9nZXQtbm9uY2UvZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9jaGV2cm9uLXVwLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvY2hldnJvbnMtdXAtZG93bi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2Rvd25sb2FkLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvZnVubmVsLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvc2VhcmNoLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvc3F1YXJlLXBlbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3RyYXNoLTIuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy91c2VyLXBsdXMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvQ29tYmluYXRpb24uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvU2lkZUVmZmVjdC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9VSS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9hZ2dyZXNpdmVDYXB0dXJlLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L2hhbmRsZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9tZWRpdW0uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvc2lkZWNhci5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L2hvb2suanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L3NpbmdsZXRvbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzMjAxNS9hc3NpZ25SZWYuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlTWVyZ2VSZWYuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlUmVmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2Utc2lkZWNhci9kaXN0L2VzMjAxNS9leHBvcnRzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2Utc2lkZWNhci9kaXN0L2VzMjAxNS9tZWRpdW0uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9wcmltaXRpdmUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1jb250ZXh0L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZGlhbG9nL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZGlhbG9nL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3Qtc2xvdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWRpc21pc3NhYmxlLWxheWVyL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZm9jdXMtZ3VhcmRzL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZm9jdXMtc2NvcGUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1pZC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXBvcnRhbC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXByZXNlbmNlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3Qtc2xvdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWYvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtY29udHJvbGxhYmxlLXN0YXRlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWVmZmVjdC1ldmVudC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1lc2NhcGUta2V5ZG93bi9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBnZXREZWZhdWx0UGFyZW50ID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzYW1wbGVUYXJnZXQgPSBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0WzBdIDogb3JpZ2luYWxUYXJnZXQ7XG4gICAgcmV0dXJuIHNhbXBsZVRhcmdldC5vd25lckRvY3VtZW50LmJvZHk7XG59O1xudmFyIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xudmFyIHVuY29udHJvbGxlZE5vZGVzID0gbmV3IFdlYWtNYXAoKTtcbnZhciBtYXJrZXJNYXAgPSB7fTtcbnZhciBsb2NrQ291bnQgPSAwO1xudmFyIHVud3JhcEhvc3QgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBub2RlICYmIChub2RlLmhvc3QgfHwgdW53cmFwSG9zdChub2RlLnBhcmVudE5vZGUpKTtcbn07XG52YXIgY29ycmVjdFRhcmdldHMgPSBmdW5jdGlvbiAocGFyZW50LCB0YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRhcmdldHNcbiAgICAgICAgLm1hcChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChwYXJlbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29ycmVjdGVkVGFyZ2V0ID0gdW53cmFwSG9zdCh0YXJnZXQpO1xuICAgICAgICBpZiAoY29ycmVjdGVkVGFyZ2V0ICYmIHBhcmVudC5jb250YWlucyhjb3JyZWN0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29ycmVjdGVkVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FyaWEtaGlkZGVuJywgdGFyZ2V0LCAnaW4gbm90IGNvbnRhaW5lZCBpbnNpZGUnLCBwYXJlbnQsICcuIERvaW5nIG5vdGhpbmcnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4gQm9vbGVhbih4KTsgfSk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBhcmlhLWhpZGRlblxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NvbnRyb2xBdHRyaWJ1dGVdIC0gaHRtbCBBdHRyaWJ1dGUgdG8gY29udHJvbFxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbnZhciBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lLCBjb250cm9sQXR0cmlidXRlKSB7XG4gICAgdmFyIHRhcmdldHMgPSBjb3JyZWN0VGFyZ2V0cyhwYXJlbnROb2RlLCBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgaWYgKCFtYXJrZXJNYXBbbWFya2VyTmFtZV0pIHtcbiAgICAgICAgbWFya2VyTWFwW21hcmtlck5hbWVdID0gbmV3IFdlYWtNYXAoKTtcbiAgICB9XG4gICAgdmFyIG1hcmtlckNvdW50ZXIgPSBtYXJrZXJNYXBbbWFya2VyTmFtZV07XG4gICAgdmFyIGhpZGRlbk5vZGVzID0gW107XG4gICAgdmFyIGVsZW1lbnRzVG9LZWVwID0gbmV3IFNldCgpO1xuICAgIHZhciBlbGVtZW50c1RvU3RvcCA9IG5ldyBTZXQodGFyZ2V0cyk7XG4gICAgdmFyIGtlZXAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKCFlbCB8fCBlbGVtZW50c1RvS2VlcC5oYXMoZWwpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudHNUb0tlZXAuYWRkKGVsKTtcbiAgICAgICAga2VlcChlbC5wYXJlbnROb2RlKTtcbiAgICB9O1xuICAgIHRhcmdldHMuZm9yRWFjaChrZWVwKTtcbiAgICB2YXIgZGVlcCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKCFwYXJlbnQgfHwgZWxlbWVudHNUb1N0b3AuaGFzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHBhcmVudC5jaGlsZHJlbiwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50c1RvS2VlcC5oYXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBkZWVwKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBub2RlLmdldEF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFscmVhZHlIaWRkZW4gPSBhdHRyICE9PSBudWxsICYmIGF0dHIgIT09ICdmYWxzZSc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3VudGVyVmFsdWUgPSAoY291bnRlck1hcC5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya2VyVmFsdWUgPSAobWFya2VyQ291bnRlci5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyTWFwLnNldChub2RlLCBjb3VudGVyVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbk5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyVmFsdWUgPT09IDEgJiYgYWxyZWFkeUhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMuc2V0KG5vZGUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXJWYWx1ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobWFya2VyTmFtZSwgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignYXJpYS1oaWRkZW46IGNhbm5vdCBvcGVyYXRlIG9uICcsIG5vZGUsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBkZWVwKHBhcmVudE5vZGUpO1xuICAgIGVsZW1lbnRzVG9LZWVwLmNsZWFyKCk7XG4gICAgbG9ja0NvdW50Kys7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGlkZGVuTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIGNvdW50ZXJWYWx1ZSA9IGNvdW50ZXJNYXAuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIHZhciBtYXJrZXJWYWx1ZSA9IG1hcmtlckNvdW50ZXIuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAuc2V0KG5vZGUsIGNvdW50ZXJWYWx1ZSk7XG4gICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWNvdW50ZXJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdW5jb250cm9sbGVkTm9kZXMuaGFzKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1bmNvbnRyb2xsZWROb2Rlcy5kZWxldGUobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW1hcmtlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobWFya2VyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NrQ291bnQtLTtcbiAgICAgICAgaWYgKCFsb2NrQ291bnQpIHtcbiAgICAgICAgICAgIC8vIGNsZWFyXG4gICAgICAgICAgICBjb3VudGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgbWFya2VyTWFwID0ge307XG4gICAgICAgIH1cbiAgICB9O1xufTtcbi8qKlxuICogTWFya3MgZXZlcnl0aGluZyBleGNlcHQgZ2l2ZW4gbm9kZShvciBub2RlcykgYXMgYXJpYS1oaWRkZW5cbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgaGlkZU90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWFyaWEtaGlkZGVuJzsgfVxuICAgIHZhciB0YXJnZXRzID0gQXJyYXkuZnJvbShBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgdmFyIGFjdGl2ZVBhcmVudE5vZGUgPSBwYXJlbnROb2RlIHx8IGdldERlZmF1bHRQYXJlbnQob3JpZ2luYWxUYXJnZXQpO1xuICAgIGlmICghYWN0aXZlUGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfTtcbiAgICB9XG4gICAgLy8gd2Ugc2hvdWxkIG5vdCBoaWRlIGFyaWEtbGl2ZSBlbGVtZW50cyAtIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvYXJpYS1oaWRkZW4vaXNzdWVzLzEwXG4gICAgLy8gYW5kIHNjcmlwdCBlbGVtZW50cywgYXMgdGhleSBoYXZlIG5vIGltcGFjdCBvbiBhY2Nlc3NpYmlsaXR5LlxuICAgIHRhcmdldHMucHVzaC5hcHBseSh0YXJnZXRzLCBBcnJheS5mcm9tKGFjdGl2ZVBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtbGl2ZV0sIHNjcmlwdCcpKSk7XG4gICAgcmV0dXJuIGFwcGx5QXR0cmlidXRlVG9PdGhlcnModGFyZ2V0cywgYWN0aXZlUGFyZW50Tm9kZSwgbWFya2VyTmFtZSwgJ2FyaWEtaGlkZGVuJyk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBpbmVydFxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcmV0dXJuIHtVbmRvfSB1bmRvIGNvbW1hbmRcbiAqL1xuZXhwb3J0IHZhciBpbmVydE90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWluZXJ0LWVkJzsgfVxuICAgIHZhciBhY3RpdmVQYXJlbnROb2RlID0gcGFyZW50Tm9kZSB8fCBnZXREZWZhdWx0UGFyZW50KG9yaWdpbmFsVGFyZ2V0KTtcbiAgICBpZiAoIWFjdGl2ZVBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH07XG4gICAgfVxuICAgIHJldHVybiBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzKG9yaWdpbmFsVGFyZ2V0LCBhY3RpdmVQYXJlbnROb2RlLCBtYXJrZXJOYW1lLCAnaW5lcnQnKTtcbn07XG4vKipcbiAqIEByZXR1cm5zIGlmIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBpbmVydFxuICovXG5leHBvcnQgdmFyIHN1cHBvcnRzSW5lcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgSFRNTEVsZW1lbnQucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdpbmVydCcpO1xufTtcbi8qKlxuICogQXV0b21hdGljIGZ1bmN0aW9uIHRvIFwic3VwcHJlc3NcIiBET00gZWxlbWVudHMgLSBfaGlkZV8gb3IgX2luZXJ0XyBpbiB0aGUgYmVzdCBwb3NzaWJsZSB3YXlcbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgc3VwcHJlc3NPdGhlcnMgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpIHtcbiAgICBpZiAobWFya2VyTmFtZSA9PT0gdm9pZCAwKSB7IG1hcmtlck5hbWUgPSAnZGF0YS1zdXBwcmVzc2VkJzsgfVxuICAgIHJldHVybiAoc3VwcG9ydHNJbmVydCgpID8gaW5lcnRPdGhlcnMgOiBoaWRlT3RoZXJzKShvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSk7XG59O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IEFsZXJ0Q2lyY2xlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nQ29udGVudCwgRGlhbG9nSGVhZGVyLCBEaWFsb2dUaXRsZSwgRGlhbG9nRm9vdGVyLCB9IGZyb20gJy4uL3VpL2RpYWxvZyc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi91aS9idXR0b24nO1xuLyoqXG4gKiBEZWxldGVNZW1iZXJEaWFsb2cgQ29tcG9uZW50XG4gKlxuICogQ29uZmlybWF0aW9uIGRpYWxvZyBmb3IgZGVsZXRpbmcgYSBtZW1iZXIgcmVjb3JkLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBEaXNwbGF5cyBtZW1iZXIgbmFtZSBmb3IgY29uZmlybWF0aW9uXG4gKiAtIFdhcm5pbmcgbWVzc2FnZSBhYm91dCBwZXJtYW5lbnQgZGVsZXRpb25cbiAqIC0gQ2FuY2VsIGFuZCBjb25maXJtIGFjdGlvbnNcbiAqIC0gTG9hZGluZyBzdGF0ZSBkdXJpbmcgZGVsZXRpb25cbiAqL1xuY29uc3QgRGVsZXRlTWVtYmVyRGlhbG9nID0gKHsgaXNPcGVuLCBvbkNsb3NlLCBvbkNvbmZpcm0sIG1lbWJlciwgaXNEZWxldGluZyA9IGZhbHNlLCB9KSA9PiB7XG4gICAgaWYgKCFtZW1iZXIpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiAoX2pzeChEaWFsb2csIHsgb3BlbjogaXNPcGVuLCBvbk9wZW5DaGFuZ2U6IG9uQ2xvc2UsIGNoaWxkcmVuOiBfanN4cyhEaWFsb2dDb250ZW50LCB7IGNsYXNzTmFtZTogXCJtYXgtdy1tZFwiLCBjaGlsZHJlbjogW19qc3goRGlhbG9nSGVhZGVyLCB7IGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTEwIGgtMTAgcm91bmRlZC1mdWxsIGJnLXJlZC0xMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgY2hpbGRyZW46IF9qc3goQWxlcnRDaXJjbGUsIHsgY2xhc3NOYW1lOiBcImgtNSB3LTUgdGV4dC1yZWQtNjAwXCIgfSkgfSksIF9qc3goRGlhbG9nVGl0bGUsIHsgY2hpbGRyZW46IFwiRGVsZXRlIE1lbWJlclwiIH0pXSB9KSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweS00XCIsIGNoaWxkcmVuOiBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNzAwXCIsIGNoaWxkcmVuOiBbXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlXCIsICcgJywgX2pzeHMoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtc2VtaWJvbGRcIiwgY2hpbGRyZW46IFttZW1iZXIuZmlyc3RfbmFtZSwgXCIgXCIsIG1lbWJlci5sYXN0X25hbWVdIH0pLCBcIj8gVGhpcyBhY3Rpb24gY2Fubm90IGJlIHVuZG9uZS5cIl0gfSkgfSksIF9qc3hzKERpYWxvZ0Zvb3RlciwgeyBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiBvbkNsb3NlLCBkaXNhYmxlZDogaXNEZWxldGluZywgY2hpbGRyZW46IFwiQ2FuY2VsXCIgfSksIF9qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwiZGVzdHJ1Y3RpdmVcIiwgb25DbGljazogb25Db25maXJtLCBkaXNhYmxlZDogaXNEZWxldGluZywgY2hpbGRyZW46IGlzRGVsZXRpbmcgPyAnRGVsZXRpbmcuLi4nIDogJ0RlbGV0ZSBNZW1iZXInIH0pXSB9KV0gfSkgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IERlbGV0ZU1lbWJlckRpYWxvZztcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRGlhbG9nLCBEaWFsb2dDb250ZW50LCBEaWFsb2dIZWFkZXIsIERpYWxvZ1RpdGxlLCBEaWFsb2dGb290ZXIsIH0gZnJvbSAnLi4vdWkvZGlhbG9nJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL3VpL2J1dHRvbic7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4uL3VpL2lucHV0Jztcbi8qKlxuICogTWVtYmVyRm9ybSBDb21wb25lbnRcbiAqXG4gKiBGb3JtIGZvciBhZGRpbmcgb3IgZWRpdGluZyBjaHVyY2ggbWVtYmVyIHJlY29yZHMuXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIElucHV0IGZpZWxkcyBmb3IgYWxsIG1lbWJlciBwcm9wZXJ0aWVzXG4gKiAtIEZvcm0gdmFsaWRhdGlvbiB3aXRoIGlubGluZSBlcnJvciBtZXNzYWdlc1xuICogLSBTdXBwb3J0IGZvciBib3RoIGNyZWF0ZSBhbmQgZWRpdCBtb2Rlc1xuICogLSBTbWFsbCBncm91cCBzZWxlY3Rpb24gZHJvcGRvd25cbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiAzLjQsIDMuNSwgMy42XG4gKi9cbmNvbnN0IE1lbWJlckZvcm0gPSAoeyBpc09wZW4sIG9uQ2xvc2UsIG9uU3VibWl0LCBtZW1iZXIgPSBudWxsLCBzbWFsbEdyb3VwcyA9IFtdLCBpc0xvYWRpbmcgPSBmYWxzZSwgfSkgPT4ge1xuICAgIGNvbnN0IFtmb3JtRGF0YSwgc2V0Rm9ybURhdGFdID0gdXNlU3RhdGUoe1xuICAgICAgICBmaXJzdF9uYW1lOiAnJyxcbiAgICAgICAgbGFzdF9uYW1lOiAnJyxcbiAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICBwaG9uZTogJycsXG4gICAgICAgIGFkZHJlc3M6ICcnLFxuICAgICAgICBjaXR5OiAnJyxcbiAgICAgICAgc3RhdHVzOiAnYWN0aXZlJyxcbiAgICAgICAgc21hbGxfZ3JvdXBfaWQ6IG51bGwsXG4gICAgICAgIGRhdGVfam9pbmVkOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSxcbiAgICAgICAgYmlydGhfZGF0ZTogJycsXG4gICAgICAgIGdlbmRlcjogJ21hbGUnLFxuICAgIH0pO1xuICAgIGNvbnN0IFtlcnJvcnMsIHNldEVycm9yc10gPSB1c2VTdGF0ZSh7fSk7XG4gICAgY29uc3QgW2lzU3VibWl0dGluZywgc2V0SXNTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGZvcm0gZGF0YSB3aGVuIG1lbWJlciBwcm9wIGNoYW5nZXNcbiAgICAgKi9cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAobWVtYmVyKSB7XG4gICAgICAgICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogbWVtYmVyLmZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBtZW1iZXIubGFzdF9uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBtZW1iZXIuZW1haWwsXG4gICAgICAgICAgICAgICAgcGhvbmU6IG1lbWJlci5waG9uZSxcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBtZW1iZXIuYWRkcmVzcyxcbiAgICAgICAgICAgICAgICBjaXR5OiBtZW1iZXIuY2l0eSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IG1lbWJlci5zdGF0dXMsXG4gICAgICAgICAgICAgICAgc21hbGxfZ3JvdXBfaWQ6IG1lbWJlci5zbWFsbF9ncm91cF9pZCxcbiAgICAgICAgICAgICAgICBkYXRlX2pvaW5lZDogbWVtYmVyLmRhdGVfam9pbmVkLnNwbGl0KCdUJylbMF0sXG4gICAgICAgICAgICAgICAgYmlydGhfZGF0ZTogbWVtYmVyLmJpcnRoX2RhdGUgPyBtZW1iZXIuYmlydGhfZGF0ZS5zcGxpdCgnVCcpWzBdIDogJycsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiBtZW1iZXIuZ2VuZGVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXNldCBmb3JtIGZvciBuZXcgbWVtYmVyXG4gICAgICAgICAgICBzZXRGb3JtRGF0YSh7XG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJycsXG4gICAgICAgICAgICAgICAgbGFzdF9uYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBlbWFpbDogJycsXG4gICAgICAgICAgICAgICAgcGhvbmU6ICcnLFxuICAgICAgICAgICAgICAgIGFkZHJlc3M6ICcnLFxuICAgICAgICAgICAgICAgIGNpdHk6ICcnLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ2FjdGl2ZScsXG4gICAgICAgICAgICAgICAgc21hbGxfZ3JvdXBfaWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgZGF0ZV9qb2luZWQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdLFxuICAgICAgICAgICAgICAgIGJpcnRoX2RhdGU6ICcnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ21hbGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RXJyb3JzKHt9KTtcbiAgICB9LCBbbWVtYmVyLCBpc09wZW5dKTtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBmb3JtIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdCB2YWxpZGF0ZUZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0Vycm9ycyA9IHt9O1xuICAgICAgICAvLyBSZXF1aXJlZCBmaWVsZHNcbiAgICAgICAgaWYgKCFmb3JtRGF0YS5maXJzdF9uYW1lLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmZpcnN0X25hbWUgPSAnRmlyc3QgbmFtZSBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZm9ybURhdGEuZmlyc3RfbmFtZS5sZW5ndGggPiAxMDApIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5maXJzdF9uYW1lID0gJ0ZpcnN0IG5hbWUgbXVzdCBiZSAxMDAgY2hhcmFjdGVycyBvciBsZXNzJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLmxhc3RfbmFtZS50cmltKCkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5sYXN0X25hbWUgPSAnTGFzdCBuYW1lIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtRGF0YS5sYXN0X25hbWUubGVuZ3RoID4gMTAwKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMubGFzdF9uYW1lID0gJ0xhc3QgbmFtZSBtdXN0IGJlIDEwMCBjaGFyYWN0ZXJzIG9yIGxlc3MnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEuZW1haWwudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuZW1haWwgPSAnRW1haWwgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCEvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLy50ZXN0KGZvcm1EYXRhLmVtYWlsKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmVtYWlsID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEucGhvbmUudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMucGhvbmUgPSAnUGhvbmUgbnVtYmVyIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghL15bXFxkXFxzXFwtXFwrXFwoXFwpXSskLy50ZXN0KGZvcm1EYXRhLnBob25lKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLnBob25lID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIHBob25lIG51bWJlcic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5hZGRyZXNzLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmFkZHJlc3MgPSAnQWRkcmVzcyBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5jaXR5LnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmNpdHkgPSAnQ2l0eSBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5kYXRlX2pvaW5lZCkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmRhdGVfam9pbmVkID0gJ0RhdGUgam9pbmVkIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBzZXRFcnJvcnMobmV3RXJyb3JzKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG5ld0Vycm9ycykubGVuZ3RoID09PSAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGlucHV0IGNoYW5nZVxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGUudGFyZ2V0O1xuICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBbbmFtZV06IHZhbHVlLFxuICAgICAgICB9KSk7XG4gICAgICAgIC8vIENsZWFyIGVycm9yIGZvciB0aGlzIGZpZWxkIHdoZW4gdXNlciBzdGFydHMgdHlwaW5nXG4gICAgICAgIGlmIChlcnJvcnNbbmFtZV0pIHtcbiAgICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIFtuYW1lXTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZm9ybSBzdWJtaXNzaW9uXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoIXZhbGlkYXRlRm9ybSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgb25TdWJtaXQoZm9ybURhdGEpO1xuICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHNlcnZlci1zaWRlIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2U/LmRhdGE/LmVycm9ycykge1xuICAgICAgICAgICAgICAgIHNldEVycm9ycyhlcnJvci5yZXNwb25zZS5kYXRhLmVycm9ycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEb24ndCBjbG9zZSB0aGUgZm9ybSBpZiB0aGVyZSdzIGFuIGVycm9yXG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc1N1Ym1pdHRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZGlhbG9nIGNsb3NlXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQ2xvc2UgPSAob3BlbikgPT4ge1xuICAgICAgICBpZiAoIW9wZW4gJiYgIWlzU3VibWl0dGluZykge1xuICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKF9qc3goRGlhbG9nLCB7IG9wZW46IGlzT3Blbiwgb25PcGVuQ2hhbmdlOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBEb24ndCBhdXRvbWF0aWNhbGx5IGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgICAgICAgIC8vIFRoZSBkaWFsb2cgd2lsbCBvbmx5IGNsb3NlIHdoZW4gb25DbG9zZSBpcyBleHBsaWNpdGx5IGNhbGxlZFxuICAgICAgICB9LCBjaGlsZHJlbjogX2pzeHMoRGlhbG9nQ29udGVudCwgeyBjbGFzc05hbWU6IFwibWF4LXctMnhsIG1heC1oLVs5MHZoXSBvdmVyZmxvdy15LWF1dG9cIiwgY2hpbGRyZW46IFtfanN4KERpYWxvZ0hlYWRlciwgeyBjaGlsZHJlbjogX2pzeChEaWFsb2dUaXRsZSwgeyBjaGlsZHJlbjogbWVtYmVyID8gJ0VkaXQgTWVtYmVyJyA6ICdBZGQgTmV3IE1lbWJlcicgfSkgfSksIF9qc3hzKFwiZm9ybVwiLCB7IG9uU3VibWl0OiBoYW5kbGVTdWJtaXQsIGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImZpcnN0X25hbWVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJGaXJzdCBOYW1lIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJmaXJzdF9uYW1lXCIsIG5hbWU6IFwiZmlyc3RfbmFtZVwiLCB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGZvcm1EYXRhLmZpcnN0X25hbWUsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmZpcnN0X25hbWUgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfSksIGVycm9ycy5maXJzdF9uYW1lICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuZmlyc3RfbmFtZSB9KSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibGFzdF9uYW1lXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiTGFzdCBOYW1lIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJsYXN0X25hbWVcIiwgbmFtZTogXCJsYXN0X25hbWVcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5sYXN0X25hbWUsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmxhc3RfbmFtZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZyB9KSwgZXJyb3JzLmxhc3RfbmFtZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmxhc3RfbmFtZSB9KSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJlbWFpbFwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkVtYWlsIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJlbWFpbFwiLCBuYW1lOiBcImVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiwgdmFsdWU6IGZvcm1EYXRhLmVtYWlsLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5lbWFpbCA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZyB9KSwgZXJyb3JzLmVtYWlsICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuZW1haWwgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcInBob25lXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiUGhvbmUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcInBob25lXCIsIG5hbWU6IFwicGhvbmVcIiwgdHlwZTogXCJ0ZWxcIiwgdmFsdWU6IGZvcm1EYXRhLnBob25lLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5waG9uZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZyB9KSwgZXJyb3JzLnBob25lICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMucGhvbmUgfSkpXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJhZGRyZXNzXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiQWRkcmVzcyBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwiYWRkcmVzc1wiLCBuYW1lOiBcImFkZHJlc3NcIiwgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5hZGRyZXNzLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5hZGRyZXNzID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMuYWRkcmVzcyAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmFkZHJlc3MgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImNpdHlcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJDaXR5IFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJjaXR5XCIsIG5hbWU6IFwiY2l0eVwiLCB0eXBlOiBcInRleHRcIiwgdmFsdWU6IGZvcm1EYXRhLmNpdHksIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmNpdHkgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfSksIGVycm9ycy5jaXR5ICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuY2l0eSB9KSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcInN0YXR1c1wiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIlN0YXR1cyBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgaWQ6IFwic3RhdHVzXCIsIG5hbWU6IFwic3RhdHVzXCIsIHZhbHVlOiBmb3JtRGF0YS5zdGF0dXMsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogXCJoLTEwIHctZnVsbCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItaW5wdXQgYmctYmFja2dyb3VuZCBweC0zIHB5LTIgdGV4dC1zbSByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1yaW5nIGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtMlwiLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBjaGlsZHJlbjogW19qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJhY3RpdmVcIiwgY2hpbGRyZW46IFwiQWN0aXZlXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJ2aXNpdG9yXCIsIGNoaWxkcmVuOiBcIlZpc2l0b3JcIiB9KV0gfSksIGVycm9ycy5zdGF0dXMgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5zdGF0dXMgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwic21hbGxfZ3JvdXBfaWRcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIlNtYWxsIEdyb3VwXCIgfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgaWQ6IFwic21hbGxfZ3JvdXBfaWRcIiwgbmFtZTogXCJzbWFsbF9ncm91cF9pZFwiLCB2YWx1ZTogZm9ybURhdGEuc21hbGxfZ3JvdXBfaWQgfHwgJycsIG9uQ2hhbmdlOiAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc21hbGxfZ3JvdXBfaWQ6IHZhbHVlID8gcGFyc2VJbnQodmFsdWUpIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgY2xhc3NOYW1lOiBcImgtMTAgdy1mdWxsIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1pbnB1dCBiZy1iYWNrZ3JvdW5kIHB4LTMgcHktMiB0ZXh0LXNtIHJpbmctb2Zmc2V0LWJhY2tncm91bmQgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXJpbmcgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC0yXCIsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGNoaWxkcmVuOiBbX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiLCBjaGlsZHJlbjogXCJOb25lXCIgfSksIHNtYWxsR3JvdXBzLm1hcCgoZ3JvdXApID0+IChfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IGdyb3VwLmlkLCBjaGlsZHJlbjogZ3JvdXAubmFtZSB9LCBncm91cC5pZCkpKV0gfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJkYXRlX2pvaW5lZFwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkRhdGUgSm9pbmVkIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJkYXRlX2pvaW5lZFwiLCBuYW1lOiBcImRhdGVfam9pbmVkXCIsIHR5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogZm9ybURhdGEuZGF0ZV9qb2luZWQsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmRhdGVfam9pbmVkID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMuZGF0ZV9qb2luZWQgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5kYXRlX2pvaW5lZCB9KSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJiaXJ0aF9kYXRlXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJCaXJ0aCBEYXRlXCIgfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwiYmlydGhfZGF0ZVwiLCBuYW1lOiBcImJpcnRoX2RhdGVcIiwgdHlwZTogXCJkYXRlXCIsIHZhbHVlOiBmb3JtRGF0YS5iaXJ0aF9kYXRlLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5iaXJ0aF9kYXRlID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMuYmlydGhfZGF0ZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmJpcnRoX2RhdGUgfSkpXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJnZW5kZXJcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJHZW5kZXIgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4cyhcInNlbGVjdFwiLCB7IGlkOiBcImdlbmRlclwiLCBuYW1lOiBcImdlbmRlclwiLCB2YWx1ZTogZm9ybURhdGEuZ2VuZGVyLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IFwiaC0xMCB3LWZ1bGwgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWlucHV0IGJnLWJhY2tncm91bmQgcHgtMyBweS0yIHRleHQtc20gcmluZy1vZmZzZXQtYmFja2dyb3VuZCBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcmluZyBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTJcIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2hpbGRyZW46IFtfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwibWFsZVwiLCBjaGlsZHJlbjogXCJNYWxlXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJmZW1hbGVcIiwgY2hpbGRyZW46IFwiRmVtYWxlXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJvdGhlclwiLCBjaGlsZHJlbjogXCJPdGhlclwiIH0pXSB9KSwgZXJyb3JzLmdlbmRlciAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmdlbmRlciB9KSldIH0pLCBfanN4cyhEaWFsb2dGb290ZXIsIHsgY2xhc3NOYW1lOiBcIm10LTZcIiwgY2hpbGRyZW46IFtfanN4KEJ1dHRvbiwgeyB0eXBlOiBcImJ1dHRvblwiLCB2YXJpYW50OiBcIm91dGxpbmVcIiwgb25DbGljazogb25DbG9zZSwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2hpbGRyZW46IFwiQ2FuY2VsXCIgfSksIF9qc3goQnV0dG9uLCB7IHR5cGU6IFwic3VibWl0XCIsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfHwgaXNMb2FkaW5nLCBjaGlsZHJlbjogaXNTdWJtaXR0aW5nID8gJ1NhdmluZy4uLicgOiBtZW1iZXIgPyAnVXBkYXRlIE1lbWJlcicgOiAnQWRkIE1lbWJlcicgfSldIH0pXSB9KV0gfSkgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IE1lbWJlckZvcm07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRWRpdCwgVHJhc2gyLCBDaGV2cm9uVXAsIENoZXZyb25Eb3duLCBDaGV2cm9uc1VwRG93biB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBUYWJsZSwgVGFibGVCb2R5LCBUYWJsZUNlbGwsIFRhYmxlSGVhZCwgVGFibGVIZWFkZXIsIFRhYmxlUm93LCB9IGZyb20gJy4uL3VpL3RhYmxlJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL3VpL2J1dHRvbic7XG4vKipcbiAqIE1lbWJlclRhYmxlIENvbXBvbmVudFxuICpcbiAqIERpc3BsYXlzIGNodXJjaCBtZW1iZXJzIGluIGEgc29ydGFibGUgZGF0YSB0YWJsZSB3aXRoIHBhZ2luYXRpb24uXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIFNvcnRhYmxlIGNvbHVtbnMgKG5hbWUsIHN0YXR1cywgc21hbGwgZ3JvdXAsIGNvbnRhY3QgaW5mbylcbiAqIC0gUm93IGFjdGlvbnMgKGVkaXQsIGRlbGV0ZSlcbiAqIC0gUGFnaW5hdGlvbiBjb250cm9sc1xuICogLSBSZXNwb25zaXZlIGRlc2lnblxuICpcbiAqIFZhbGlkYXRlcyBSZXF1aXJlbWVudHM6IDMuMSwgMy43XG4gKi9cbmNvbnN0IE1lbWJlclRhYmxlID0gUmVhY3QubWVtbygoeyBtZW1iZXJzLCBvbkVkaXQsIG9uRGVsZXRlLCBjdXJyZW50UGFnZSwgdG90YWxQYWdlcywgb25QYWdlQ2hhbmdlLCBpc0xvYWRpbmcgPSBmYWxzZSwgfSkgPT4ge1xuICAgIGNvbnN0IFtzb3J0Q29uZmlnLCBzZXRTb3J0Q29uZmlnXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgY29sdW1uOiBudWxsLFxuICAgICAgICBkaXJlY3Rpb246IG51bGwsXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNvbHVtbiBzb3J0XG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlU29ydCA9IChjb2x1bW4pID0+IHtcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9ICdhc2MnO1xuICAgICAgICBpZiAoc29ydENvbmZpZy5jb2x1bW4gPT09IGNvbHVtbikge1xuICAgICAgICAgICAgaWYgKHNvcnRDb25maWcuZGlyZWN0aW9uID09PSAnYXNjJykge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdkZXNjJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNvcnRDb25maWcuZGlyZWN0aW9uID09PSAnZGVzYycpIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldFNvcnRDb25maWcoeyBjb2x1bW46IGRpcmVjdGlvbiA/IGNvbHVtbiA6IG51bGwsIGRpcmVjdGlvbiB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNvcnQgbWVtYmVycyBiYXNlZCBvbiBjdXJyZW50IHNvcnQgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIGNvbnN0IHNvcnRlZE1lbWJlcnMgPSBSZWFjdC51c2VNZW1vKCgpID0+IHtcbiAgICAgICAgaWYgKCFzb3J0Q29uZmlnLmNvbHVtbiB8fCAhc29ydENvbmZpZy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBtZW1iZXJzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbLi4ubWVtYmVyc10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgbGV0IGFWYWx1ZTtcbiAgICAgICAgICAgIGxldCBiVmFsdWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHNvcnRDb25maWcuY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgICAgICAgICAgIGFWYWx1ZSA9IGAke2EuZmlyc3RfbmFtZX0gJHthLmxhc3RfbmFtZX1gLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJWYWx1ZSA9IGAke2IuZmlyc3RfbmFtZX0gJHtiLmxhc3RfbmFtZX1gLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXR1cyc6XG4gICAgICAgICAgICAgICAgICAgIGFWYWx1ZSA9IGEuc3RhdHVzLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJWYWx1ZSA9IGIuc3RhdHVzLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3NtYWxsX2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgYVZhbHVlID0gYS5zbWFsbF9ncm91cD8ubmFtZT8udG9Mb3dlckNhc2UoKSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgYlZhbHVlID0gYi5zbWFsbF9ncm91cD8ubmFtZT8udG9Mb3dlckNhc2UoKSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICAgICAgICAgICAgICBhVmFsdWUgPSBhLmVtYWlsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJWYWx1ZSA9IGIuZW1haWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGhvbmUnOlxuICAgICAgICAgICAgICAgICAgICBhVmFsdWUgPSBhLnBob25lO1xuICAgICAgICAgICAgICAgICAgICBiVmFsdWUgPSBiLnBob25lO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhVmFsdWUgPCBiVmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc29ydENvbmZpZy5kaXJlY3Rpb24gPT09ICdhc2MnID8gLTEgOiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFWYWx1ZSA+IGJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzb3J0Q29uZmlnLmRpcmVjdGlvbiA9PT0gJ2FzYycgPyAxIDogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG4gICAgfSwgW21lbWJlcnMsIHNvcnRDb25maWddKTtcbiAgICAvKipcbiAgICAgKiBSZW5kZXIgc29ydCBpY29uIGZvciBjb2x1bW4gaGVhZGVyXG4gICAgICovXG4gICAgY29uc3QgcmVuZGVyU29ydEljb24gPSAoY29sdW1uKSA9PiB7XG4gICAgICAgIGlmIChzb3J0Q29uZmlnLmNvbHVtbiAhPT0gY29sdW1uKSB7XG4gICAgICAgICAgICByZXR1cm4gX2pzeChDaGV2cm9uc1VwRG93biwgeyBjbGFzc05hbWU6IFwibWwtMiBoLTQgdy00IHRleHQtZ3JheS00MDBcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc29ydENvbmZpZy5kaXJlY3Rpb24gPT09ICdhc2MnKSB7XG4gICAgICAgICAgICByZXR1cm4gX2pzeChDaGV2cm9uVXAsIHsgY2xhc3NOYW1lOiBcIm1sLTIgaC00IHctNCB0ZXh0LXByaW1hcnktNTAwXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9qc3goQ2hldnJvbkRvd24sIHsgY2xhc3NOYW1lOiBcIm1sLTIgaC00IHctNCB0ZXh0LXByaW1hcnktNTAwXCIgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGb3JtYXQgc3RhdHVzIGJhZGdlXG4gICAgICovXG4gICAgY29uc3QgZ2V0U3RhdHVzQmFkZ2UgPSAoc3RhdHVzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2VDbGFzc2VzID0gJ2lubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LXhzIGZvbnQtbWVkaXVtJztcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgICAgIHJldHVybiAoX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IGAke2Jhc2VDbGFzc2VzfSBiZy1ncmVlbi0xMDAgdGV4dC1ncmVlbi04MDBgLCBjaGlsZHJlbjogXCJBY3RpdmVcIiB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogYCR7YmFzZUNsYXNzZXN9IGJnLWJsdWUtMTAwIHRleHQtYmx1ZS04MDBgLCBjaGlsZHJlbjogXCJWaXNpdG9yXCIgfSkpO1xuICAgIH07XG4gICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1jZW50ZXIgcHktMTJcIiwgY2hpbGRyZW46IF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IFwiTG9hZGluZyBtZW1iZXJzLi4uXCIgfSkgfSkpO1xuICAgIH1cbiAgICBpZiAobWVtYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xMlwiLCBjaGlsZHJlbjogW19qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS01MDBcIiwgY2hpbGRyZW46IFwiTm8gbWVtYmVycyBmb3VuZFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS00MDAgbXQtMlwiLCBjaGlsZHJlbjogXCJUcnkgYWRqdXN0aW5nIHlvdXIgc2VhcmNoIG9yIGZpbHRlciBjcml0ZXJpYVwiIH0pXSB9KSk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0yMDAgb3ZlcmZsb3ctaGlkZGVuXCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm92ZXJmbG93LXgtYXV0b1wiLCBjaGlsZHJlbjogX2pzeHMoVGFibGUsIHsgY2hpbGRyZW46IFtfanN4KFRhYmxlSGVhZGVyLCB7IGNoaWxkcmVuOiBfanN4cyhUYWJsZVJvdywgeyBjbGFzc05hbWU6IFwiYmctZ3JheS01MFwiLCBjaGlsZHJlbjogW19qc3goVGFibGVIZWFkLCB7IGNoaWxkcmVuOiBfanN4cyhcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IGhhbmRsZVNvcnQoJ25hbWUnKSwgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMCBob3Zlcjp0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBbXCJOYW1lXCIsIHJlbmRlclNvcnRJY29uKCduYW1lJyldIH0pIH0pLCBfanN4KFRhYmxlSGVhZCwgeyBjaGlsZHJlbjogX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBoYW5kbGVTb3J0KCdzdGF0dXMnKSwgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMCBob3Zlcjp0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBbXCJTdGF0dXNcIiwgcmVuZGVyU29ydEljb24oJ3N0YXR1cycpXSB9KSB9KSwgX2pzeChUYWJsZUhlYWQsIHsgY2hpbGRyZW46IF9qc3hzKFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gaGFuZGxlU29ydCgnc21hbGxfZ3JvdXAnKSwgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMCBob3Zlcjp0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBbXCJTbWFsbCBHcm91cFwiLCByZW5kZXJTb3J0SWNvbignc21hbGxfZ3JvdXAnKV0gfSkgfSksIF9qc3goVGFibGVIZWFkLCB7IGNoaWxkcmVuOiBfanN4cyhcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IGhhbmRsZVNvcnQoJ2VtYWlsJyksIGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBmb250LXNlbWlib2xkIHRleHQtZ3JheS03MDAgaG92ZXI6dGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogW1wiRW1haWxcIiwgcmVuZGVyU29ydEljb24oJ2VtYWlsJyldIH0pIH0pLCBfanN4KFRhYmxlSGVhZCwgeyBjaGlsZHJlbjogX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBoYW5kbGVTb3J0KCdwaG9uZScpLCBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktNzAwIGhvdmVyOnRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFtcIlBob25lXCIsIHJlbmRlclNvcnRJY29uKCdwaG9uZScpXSB9KSB9KSwgX2pzeChUYWJsZUhlYWQsIHsgY2xhc3NOYW1lOiBcInRleHQtcmlnaHRcIiwgY2hpbGRyZW46IF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTcwMFwiLCBjaGlsZHJlbjogXCJBY3Rpb25zXCIgfSkgfSldIH0pIH0pLCBfanN4KFRhYmxlQm9keSwgeyBjaGlsZHJlbjogc29ydGVkTWVtYmVycy5tYXAoKG1lbWJlcikgPT4gKF9qc3hzKFRhYmxlUm93LCB7IGNoaWxkcmVuOiBbX2pzeHMoVGFibGVDZWxsLCB7IGNsYXNzTmFtZTogXCJmb250LW1lZGl1bVwiLCBjaGlsZHJlbjogW21lbWJlci5maXJzdF9uYW1lLCBcIiBcIiwgbWVtYmVyLmxhc3RfbmFtZV0gfSksIF9qc3goVGFibGVDZWxsLCB7IGNoaWxkcmVuOiBnZXRTdGF0dXNCYWRnZShtZW1iZXIuc3RhdHVzKSB9KSwgX2pzeChUYWJsZUNlbGwsIHsgY2hpbGRyZW46IG1lbWJlci5zbWFsbF9ncm91cCA/IChfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWdyYXktNzAwXCIsIGNoaWxkcmVuOiBtZW1iZXIuc21hbGxfZ3JvdXAubmFtZSB9KSkgOiAoX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTQwMCBpdGFsaWNcIiwgY2hpbGRyZW46IFwiTm9uZVwiIH0pKSB9KSwgX2pzeChUYWJsZUNlbGwsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IG1lbWJlci5lbWFpbCB9KSwgX2pzeChUYWJsZUNlbGwsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IG1lbWJlci5waG9uZSB9KSwgX2pzeChUYWJsZUNlbGwsIHsgY2xhc3NOYW1lOiBcInRleHQtcmlnaHRcIiwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kIGdhcC0yXCIsIGNoaWxkcmVuOiBbb25FZGl0ICYmIChfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBcImdob3N0XCIsIHNpemU6IFwic21cIiwgb25DbGljazogKCkgPT4gb25FZGl0KG1lbWJlciksIGNsYXNzTmFtZTogXCJoLTggdy04IHAtMFwiLCB0aXRsZTogXCJFZGl0IG1lbWJlclwiLCBjaGlsZHJlbjogX2pzeChFZGl0LCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSkgfSkpLCBvbkRlbGV0ZSAmJiAoX2pzeChCdXR0b24sIHsgdmFyaWFudDogXCJnaG9zdFwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IG9uRGVsZXRlKG1lbWJlciksIGNsYXNzTmFtZTogXCJoLTggdy04IHAtMCB0ZXh0LXJlZC02MDAgaG92ZXI6dGV4dC1yZWQtNzAwIGhvdmVyOmJnLXJlZC01MFwiLCB0aXRsZTogXCJEZWxldGUgbWVtYmVyXCIsIGNoaWxkcmVuOiBfanN4KFRyYXNoMiwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pIH0pKV0gfSkgfSldIH0sIG1lbWJlci5pZCkpKSB9KV0gfSkgfSkgfSksIHRvdGFsUGFnZXMgPiAxICYmIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtMlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogW1wiUGFnZSBcIiwgY3VycmVudFBhZ2UsIFwiIG9mIFwiLCB0b3RhbFBhZ2VzXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiAoKSA9PiBvblBhZ2VDaGFuZ2UoY3VycmVudFBhZ2UgLSAxKSwgZGlzYWJsZWQ6IGN1cnJlbnRQYWdlID09PSAxLCBjaGlsZHJlbjogXCJQcmV2aW91c1wiIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCIsIGNoaWxkcmVuOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBNYXRoLm1pbig1LCB0b3RhbFBhZ2VzKSB9LCAoXywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VOdW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG90YWxQYWdlcyA8PSA1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZU51bSA9IGkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudFBhZ2UgPD0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VOdW0gPSBpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnRQYWdlID49IHRvdGFsUGFnZXMgLSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZU51bSA9IHRvdGFsUGFnZXMgLSA0ICsgaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VOdW0gPSBjdXJyZW50UGFnZSAtIDIgKyBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBjdXJyZW50UGFnZSA9PT0gcGFnZU51bSA/ICdkZWZhdWx0JyA6ICdvdXRsaW5lJywgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiAoKSA9PiBvblBhZ2VDaGFuZ2UocGFnZU51bSksIGNsYXNzTmFtZTogXCJoLTggdy04IHAtMFwiLCBjaGlsZHJlbjogcGFnZU51bSB9LCBwYWdlTnVtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIH0pLCBfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiAoKSA9PiBvblBhZ2VDaGFuZ2UoY3VycmVudFBhZ2UgKyAxKSwgZGlzYWJsZWQ6IGN1cnJlbnRQYWdlID09PSB0b3RhbFBhZ2VzLCBjaGlsZHJlbjogXCJOZXh0XCIgfSldIH0pXSB9KSldIH0pKTtcbn0pO1xuZXhwb3J0IGRlZmF1bHQgTWVtYmVyVGFibGU7XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBEaWFsb2dQcmltaXRpdmUgZnJvbSBcIkByYWRpeC11aS9yZWFjdC1kaWFsb2dcIjtcbmltcG9ydCB7IFggfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCIuLi8uLi9saWIvdXRpbHNcIjtcbmNvbnN0IERpYWxvZyA9IERpYWxvZ1ByaW1pdGl2ZS5Sb290O1xuY29uc3QgRGlhbG9nVHJpZ2dlciA9IERpYWxvZ1ByaW1pdGl2ZS5UcmlnZ2VyO1xuY29uc3QgRGlhbG9nUG9ydGFsID0gRGlhbG9nUHJpbWl0aXZlLlBvcnRhbDtcbmNvbnN0IERpYWxvZ0Nsb3NlID0gRGlhbG9nUHJpbWl0aXZlLkNsb3NlO1xuY29uc3QgRGlhbG9nT3ZlcmxheSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5PdmVybGF5LCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLWJhY2tncm91bmQvODAgYmFja2Ryb3AtYmx1ci1zbSBkYXRhLVtzdGF0ZT1vcGVuXTphbmltYXRlLWluIGRhdGEtW3N0YXRlPWNsb3NlZF06YW5pbWF0ZS1vdXQgZGF0YS1bc3RhdGU9Y2xvc2VkXTpmYWRlLW91dC0wIGRhdGEtW3N0YXRlPW9wZW5dOmZhZGUtaW4tMFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nT3ZlcmxheS5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5PdmVybGF5LmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nQ29udGVudCA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeHMoRGlhbG9nUG9ydGFsLCB7IGNoaWxkcmVuOiBbX2pzeChEaWFsb2dPdmVybGF5LCB7fSksIF9qc3hzKERpYWxvZ1ByaW1pdGl2ZS5Db250ZW50LCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiZml4ZWQgbGVmdC1bNTAlXSB0b3AtWzUwJV0gei01MCBncmlkIHctZnVsbCBtYXgtdy1sZyB0cmFuc2xhdGUteC1bLTUwJV0gdHJhbnNsYXRlLXktWy01MCVdIGdhcC00IGJvcmRlciBiZy1iYWNrZ3JvdW5kIHAtNiBzaGFkb3ctbGcgZHVyYXRpb24tMjAwIGRhdGEtW3N0YXRlPW9wZW5dOmFuaW1hdGUtaW4gZGF0YS1bc3RhdGU9Y2xvc2VkXTphbmltYXRlLW91dCBkYXRhLVtzdGF0ZT1jbG9zZWRdOmZhZGUtb3V0LTAgZGF0YS1bc3RhdGU9b3Blbl06ZmFkZS1pbi0wIGRhdGEtW3N0YXRlPWNsb3NlZF06em9vbS1vdXQtOTUgZGF0YS1bc3RhdGU9b3Blbl06em9vbS1pbi05NSBkYXRhLVtzdGF0ZT1jbG9zZWRdOnNsaWRlLW91dC10by1sZWZ0LTEvMiBkYXRhLVtzdGF0ZT1jbG9zZWRdOnNsaWRlLW91dC10by10b3AtWzQ4JV0gZGF0YS1bc3RhdGU9b3Blbl06c2xpZGUtaW4tZnJvbS1sZWZ0LTEvMiBkYXRhLVtzdGF0ZT1vcGVuXTpzbGlkZS1pbi1mcm9tLXRvcC1bNDglXSBzbTpyb3VuZGVkLWxnIG1heC1oLVs5MHZoXSBvdmVyZmxvdy15LWF1dG9cIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMsIGNoaWxkcmVuOiBbY2hpbGRyZW4sIF9qc3hzKERpYWxvZ1ByaW1pdGl2ZS5DbG9zZSwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgcmlnaHQtNCB0b3AtNCByb3VuZGVkLXNtIG9wYWNpdHktNzAgcmluZy1vZmZzZXQtYmFja2dyb3VuZCB0cmFuc2l0aW9uLW9wYWNpdHkgaG92ZXI6b3BhY2l0eS0xMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXJpbmcgZm9jdXM6cmluZy1vZmZzZXQtMiBkaXNhYmxlZDpwb2ludGVyLWV2ZW50cy1ub25lIGRhdGEtW3N0YXRlPW9wZW5dOmJnLWFjY2VudCBkYXRhLVtzdGF0ZT1vcGVuXTp0ZXh0LW11dGVkLWZvcmVncm91bmRcIiwgY2hpbGRyZW46IFtfanN4KFgsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwic3Itb25seVwiLCBjaGlsZHJlbjogXCJDbG9zZVwiIH0pXSB9KV0gfSldIH0pKSk7XG5EaWFsb2dDb250ZW50LmRpc3BsYXlOYW1lID0gRGlhbG9nUHJpbWl0aXZlLkNvbnRlbnQuZGlzcGxheU5hbWU7XG5jb25zdCBEaWFsb2dIZWFkZXIgPSAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pID0+IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbihcImZsZXggZmxleC1jb2wgc3BhY2UteS0xLjUgdGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0XCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKTtcbkRpYWxvZ0hlYWRlci5kaXNwbGF5TmFtZSA9IFwiRGlhbG9nSGVhZGVyXCI7XG5jb25zdCBEaWFsb2dGb290ZXIgPSAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pID0+IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbihcImZsZXggZmxleC1jb2wtcmV2ZXJzZSBzbTpmbGV4LXJvdyBzbTpqdXN0aWZ5LWVuZCBzbTpzcGFjZS14LTJcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpO1xuRGlhbG9nRm9vdGVyLmRpc3BsYXlOYW1lID0gXCJEaWFsb2dGb290ZXJcIjtcbmNvbnN0IERpYWxvZ1RpdGxlID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0sIHJlZikgPT4gKF9qc3goRGlhbG9nUHJpbWl0aXZlLlRpdGxlLCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwidGV4dC1sZyBmb250LXNlbWlib2xkIGxlYWRpbmctbm9uZSB0cmFja2luZy10aWdodFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nVGl0bGUuZGlzcGxheU5hbWUgPSBEaWFsb2dQcmltaXRpdmUuVGl0bGUuZGlzcGxheU5hbWU7XG5jb25zdCBEaWFsb2dEZXNjcmlwdGlvbiA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5EZXNjcmlwdGlvbiwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcInRleHQtc20gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKSk7XG5EaWFsb2dEZXNjcmlwdGlvbi5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5EZXNjcmlwdGlvbi5kaXNwbGF5TmFtZTtcbmV4cG9ydCB7IERpYWxvZywgRGlhbG9nUG9ydGFsLCBEaWFsb2dPdmVybGF5LCBEaWFsb2dDbG9zZSwgRGlhbG9nVHJpZ2dlciwgRGlhbG9nQ29udGVudCwgRGlhbG9nSGVhZGVyLCBEaWFsb2dGb290ZXIsIERpYWxvZ1RpdGxlLCBEaWFsb2dEZXNjcmlwdGlvbiwgfTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNuIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlsc1wiO1xuY29uc3QgSW5wdXQgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgdHlwZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgcmV0dXJuIChfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiB0eXBlLCBjbGFzc05hbWU6IGNuKFwiZmxleCBoLTEwIHctZnVsbCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItaW5wdXQgYmctYmFja2dyb3VuZCBweC0zIHB5LTIgdGV4dC1zbSByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIGZpbGU6Ym9yZGVyLTAgZmlsZTpiZy10cmFuc3BhcmVudCBmaWxlOnRleHQtc20gZmlsZTpmb250LW1lZGl1bSBwbGFjZWhvbGRlcjp0ZXh0LW11dGVkLWZvcmVncm91bmQgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXJpbmcgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC0yIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXCIsIGNsYXNzTmFtZSksIHJlZjogcmVmLCAuLi5wcm9wcyB9KSk7XG59KTtcbklucHV0LmRpc3BsYXlOYW1lID0gXCJJbnB1dFwiO1xuZXhwb3J0IHsgSW5wdXQgfTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNuIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlsc1wiO1xuY29uc3QgVGFibGUgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyZWxhdGl2ZSB3LWZ1bGwgb3ZlcmZsb3ctYXV0b1wiLCBjaGlsZHJlbjogX2pzeChcInRhYmxlXCIsIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJ3LWZ1bGwgY2FwdGlvbi1ib3R0b20gdGV4dC1zbVwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSB9KSkpO1xuVGFibGUuZGlzcGxheU5hbWUgPSBcIlRhYmxlXCI7XG5jb25zdCBUYWJsZUhlYWRlciA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KFwidGhlYWRcIiwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcIlsmX3RyXTpib3JkZXItYlwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuVGFibGVIZWFkZXIuZGlzcGxheU5hbWUgPSBcIlRhYmxlSGVhZGVyXCI7XG5jb25zdCBUYWJsZUJvZHkgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeChcInRib2R5XCIsIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJbJl90cjpsYXN0LWNoaWxkXTpib3JkZXItMFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuVGFibGVCb2R5LmRpc3BsYXlOYW1lID0gXCJUYWJsZUJvZHlcIjtcbmNvbnN0IFRhYmxlRm9vdGVyID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0sIHJlZikgPT4gKF9qc3goXCJ0Zm9vdFwiLCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiYm9yZGVyLXQgYmctbXV0ZWQvNTAgZm9udC1tZWRpdW0gWyY+dHJdOmxhc3Q6Ym9yZGVyLWItMFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuVGFibGVGb290ZXIuZGlzcGxheU5hbWUgPSBcIlRhYmxlRm9vdGVyXCI7XG5jb25zdCBUYWJsZVJvdyA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KFwidHJcIiwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcImJvcmRlci1iIHRyYW5zaXRpb24tY29sb3JzIGhvdmVyOmJnLW11dGVkLzUwIGRhdGEtW3N0YXRlPXNlbGVjdGVkXTpiZy1tdXRlZFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuVGFibGVSb3cuZGlzcGxheU5hbWUgPSBcIlRhYmxlUm93XCI7XG5jb25zdCBUYWJsZUhlYWQgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeChcInRoXCIsIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJoLTEyIHB4LTQgdGV4dC1sZWZ0IGFsaWduLW1pZGRsZSBmb250LW1lZGl1bSB0ZXh0LW11dGVkLWZvcmVncm91bmQgWyY6aGFzKFtyb2xlPWNoZWNrYm94XSldOnByLTBcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpKTtcblRhYmxlSGVhZC5kaXNwbGF5TmFtZSA9IFwiVGFibGVIZWFkXCI7XG5jb25zdCBUYWJsZUNlbGwgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeChcInRkXCIsIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJwLTQgYWxpZ24tbWlkZGxlIFsmOmhhcyhbcm9sZT1jaGVja2JveF0pXTpwci0wXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKSk7XG5UYWJsZUNlbGwuZGlzcGxheU5hbWUgPSBcIlRhYmxlQ2VsbFwiO1xuY29uc3QgVGFibGVDYXB0aW9uID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0sIHJlZikgPT4gKF9qc3goXCJjYXB0aW9uXCIsIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJtdC00IHRleHQtc20gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKSk7XG5UYWJsZUNhcHRpb24uZGlzcGxheU5hbWUgPSBcIlRhYmxlQ2FwdGlvblwiO1xuZXhwb3J0IHsgVGFibGUsIFRhYmxlSGVhZGVyLCBUYWJsZUJvZHksIFRhYmxlRm9vdGVyLCBUYWJsZUhlYWQsIFRhYmxlUm93LCBUYWJsZUNlbGwsIFRhYmxlQ2FwdGlvbiwgfTtcbiIsImltcG9ydCBhcGkgZnJvbSAnLi9hcGknO1xuLyoqXG4gKiBNZW1iZXIgQVBJIENsaWVudFxuICpcbiAqIFByb3ZpZGVzIG1ldGhvZHMgZm9yIG1lbWJlciBDUlVEIG9wZXJhdGlvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IG1lbWJlckFwaSA9IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgbWVtYmVyXG4gICAgICovXG4gICAgYXN5bmMgY3JlYXRlTWVtYmVyKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdCgnL21lbWJlcnMnLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbiBleGlzdGluZyBtZW1iZXJcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVNZW1iZXIoaWQsIGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KGAvbWVtYmVycy8ke2lkfWAsIGRhdGEpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgbWVtYmVyXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlTWVtYmVyKGlkKSB7XG4gICAgICAgIGF3YWl0IGFwaS5kZWxldGUoYC9tZW1iZXJzLyR7aWR9YCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBHZXQgYSBzaW5nbGUgbWVtYmVyIGJ5IElEXG4gICAgICovXG4gICAgYXN5bmMgZ2V0TWVtYmVyKGlkKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL21lbWJlcnMvJHtpZH1gKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEV4cG9ydCBtZW1iZXJzIHRvIENTViB3aXRoIGN1cnJlbnQgZmlsdGVyc1xuICAgICAqL1xuICAgIGFzeW5jIGV4cG9ydE1lbWJlcnMocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL21lbWJlcnMvZXhwb3J0PyR7cGFyYW1zLnRvU3RyaW5nKCl9YCwge1xuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnYmxvYicsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICB9LFxufTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2VhcmNoLCBVc2VyUGx1cywgRmlsdGVyLCBEb3dubG9hZCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2J1dHRvbic7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvaW5wdXQnO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvY2FyZCc7XG5pbXBvcnQgTWVtYmVyVGFibGUgZnJvbSAnLi4vY29tcG9uZW50cy9tZW1iZXJzL01lbWJlclRhYmxlJztcbmltcG9ydCBNZW1iZXJGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvbWVtYmVycy9NZW1iZXJGb3JtJztcbmltcG9ydCBEZWxldGVNZW1iZXJEaWFsb2cgZnJvbSAnLi4vY29tcG9uZW50cy9tZW1iZXJzL0RlbGV0ZU1lbWJlckRpYWxvZyc7XG5pbXBvcnQgeyBtZW1iZXJBcGkgfSBmcm9tICcuLi9saWIvbWVtYmVyQXBpJztcbmltcG9ydCB7IHVzZVRvYXN0IH0gZnJvbSAnLi4vY29udGV4dHMvVG9hc3RDb250ZXh0JztcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tICcuLi9jb250ZXh0cy9BdXRoQ29udGV4dCc7XG5pbXBvcnQgYXBpIGZyb20gJy4uL2xpYi9hcGknO1xuLyoqXG4gKiBNZW1iZXJEaXJlY3RvcnkgUGFnZSBDb21wb25lbnRcbiAqXG4gKiBEaXNwbGF5cyBhIHNlYXJjaGFibGUgYW5kIGZpbHRlcmFibGUgZGlyZWN0b3J5IG9mIGNodXJjaCBtZW1iZXJzLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBTZWFyY2ggaW5wdXQgZm9yIGZpbHRlcmluZyBtZW1iZXJzIGJ5IG5hbWUgb3IgY29udGFjdCBpbmZvXG4gKiAtIEZpbHRlciBjb250cm9scyBmb3IgbWVtYmVyIHN0YXR1cyAoQWN0aXZlL1Zpc2l0b3IpXG4gKiAtIEFkZCBNZW1iZXIgYnV0dG9uIGZvciBjcmVhdGluZyBuZXcgbWVtYmVyIHJlY29yZHNcbiAqIC0gRGF0YSB0YWJsZSB3aXRoIHNvcnRpbmcgYW5kIHBhZ2luYXRpb25cbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiAzLjEsIDMuMiwgMy4zLCAzLjQsIDMuN1xuICovXG5jb25zdCBNZW1iZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtkZWJvdW5jZWRTZWFyY2hRdWVyeSwgc2V0RGVib3VuY2VkU2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtzdGF0dXNGaWx0ZXIsIHNldFN0YXR1c0ZpbHRlcl0gPSB1c2VTdGF0ZSgnYWxsJyk7XG4gICAgY29uc3QgW3NtYWxsR3JvdXBGaWx0ZXIsIHNldFNtYWxsR3JvdXBGaWx0ZXJdID0gdXNlU3RhdGUoJ2FsbCcpO1xuICAgIGNvbnN0IFtzbWFsbEdyb3Vwcywgc2V0U21hbGxHcm91cHNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFttZW1iZXJzLCBzZXRNZW1iZXJzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgICBjb25zdCBbdG90YWxQYWdlcywgc2V0VG90YWxQYWdlc10gPSB1c2VTdGF0ZSgxKTtcbiAgICAvLyBGb3JtIHN0YXRlXG4gICAgY29uc3QgW2lzRm9ybU9wZW4sIHNldElzRm9ybU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtlZGl0aW5nTWVtYmVyLCBzZXRFZGl0aW5nTWVtYmVyXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIC8vIERlbGV0ZSBkaWFsb2cgc3RhdGVcbiAgICBjb25zdCBbaXNEZWxldGVEaWFsb2dPcGVuLCBzZXRJc0RlbGV0ZURpYWxvZ09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtkZWxldGluZ01lbWJlciwgc2V0RGVsZXRpbmdNZW1iZXJdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW2lzRGVsZXRpbmcsIHNldElzRGVsZXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIC8vIEV4cG9ydCBzdGF0ZVxuICAgIGNvbnN0IFtpc0V4cG9ydGluZywgc2V0SXNFeHBvcnRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHsgc2hvd1RvYXN0IH0gPSB1c2VUb2FzdCgpO1xuICAgIGNvbnN0IHsgdXNlciB9ID0gdXNlQXV0aCgpO1xuICAgIC8vIENoZWNrIGlmIHVzZXIgY2FuIG1vZGlmeSBkYXRhIChub3QgcmVhZG9ubHkpXG4gICAgY29uc3QgY2FuTW9kaWZ5ID0gdXNlcj8ucm9sZSAhPT0gJ3JlYWRvbmx5JztcbiAgICAvKipcbiAgICAgKiBEZWJvdW5jZSBzZWFyY2ggcXVlcnkgKDMwMG1zIGRlbGF5KVxuICAgICAqL1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzZXREZWJvdW5jZWRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSk7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH0sIFtzZWFyY2hRdWVyeV0pO1xuICAgIC8qKlxuICAgICAqIEZldGNoIHNtYWxsIGdyb3VwcyBmb3IgZmlsdGVyIGRyb3Bkb3duXG4gICAgICovXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZmV0Y2hTbWFsbEdyb3VwcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvc21hbGwtZ3JvdXBzJyk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBzZXRTbWFsbEdyb3VwcyhyZXNwb25zZS5kYXRhLmRhdGEgfHwgW10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHNtYWxsIGdyb3VwczonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgc2V0U21hbGxHcm91cHMoW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmZXRjaFNtYWxsR3JvdXBzKCk7XG4gICAgfSwgW10pO1xuICAgIC8qKlxuICAgICAqIEZldGNoIG1lbWJlcnMgZnJvbSBBUElcbiAgICAgKi9cbiAgICBjb25zdCBmZXRjaE1lbWJlcnMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgICAgICAgICBwYWdlOiBjdXJyZW50UGFnZS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIHBlcl9wYWdlOiAnNTAnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZGVib3VuY2VkU2VhcmNoUXVlcnkpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuYXBwZW5kKCdzZWFyY2gnLCBkZWJvdW5jZWRTZWFyY2hRdWVyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdHVzRmlsdGVyICE9PSAnYWxsJykge1xuICAgICAgICAgICAgICAgIHBhcmFtcy5hcHBlbmQoJ3N0YXR1cycsIHN0YXR1c0ZpbHRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc21hbGxHcm91cEZpbHRlciAhPT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuYXBwZW5kKCdzbWFsbF9ncm91cF9pZCcsIHNtYWxsR3JvdXBGaWx0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvbWVtYmVycz8ke3BhcmFtcy50b1N0cmluZygpfWApO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHNldE1lbWJlcnMocmVzcG9uc2UuZGF0YS5kYXRhIHx8IFtdKTtcbiAgICAgICAgICAgICAgICBzZXRUb3RhbFBhZ2VzKHJlc3BvbnNlLmRhdGEucGFnaW5hdGlvbj8ubGFzdF9wYWdlIHx8IDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbWVtYmVyczonLCBlcnJvcik7XG4gICAgICAgICAgICBzZXRNZW1iZXJzKFtdKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZldGNoIG1lbWJlcnMgd2hlbiBmaWx0ZXJzIG9yIHBhZ2UgY2hhbmdlc1xuICAgICAqL1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZldGNoTWVtYmVycygpO1xuICAgIH0sIFtjdXJyZW50UGFnZSwgZGVib3VuY2VkU2VhcmNoUXVlcnksIHN0YXR1c0ZpbHRlciwgc21hbGxHcm91cEZpbHRlcl0pO1xuICAgIC8qKlxuICAgICAqIFJlc2V0IHRvIHBhZ2UgMSB3aGVuIGZpbHRlcnMgY2hhbmdlXG4gICAgICovXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgc2V0Q3VycmVudFBhZ2UoMSk7XG4gICAgfSwgW2RlYm91bmNlZFNlYXJjaFF1ZXJ5LCBzdGF0dXNGaWx0ZXIsIHNtYWxsR3JvdXBGaWx0ZXJdKTtcbiAgICBjb25zdCBoYW5kbGVBZGRNZW1iZXIgPSAoKSA9PiB7XG4gICAgICAgIHNldEVkaXRpbmdNZW1iZXIobnVsbCk7XG4gICAgICAgIHNldElzRm9ybU9wZW4odHJ1ZSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVFZGl0TWVtYmVyID0gKG1lbWJlcikgPT4ge1xuICAgICAgICBzZXRFZGl0aW5nTWVtYmVyKG1lbWJlcik7XG4gICAgICAgIHNldElzRm9ybU9wZW4odHJ1ZSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVEZWxldGVNZW1iZXIgPSAobWVtYmVyKSA9PiB7XG4gICAgICAgIHNldERlbGV0aW5nTWVtYmVyKG1lbWJlcik7XG4gICAgICAgIHNldElzRGVsZXRlRGlhbG9nT3Blbih0cnVlKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUZvcm1TdWJtaXQgPSBhc3luYyAoZGF0YSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGVkaXRpbmdNZW1iZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgZXhpc3RpbmcgbWVtYmVyXG4gICAgICAgICAgICAgICAgYXdhaXQgbWVtYmVyQXBpLnVwZGF0ZU1lbWJlcihlZGl0aW5nTWVtYmVyLmlkLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnTWVtYmVyIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IG1lbWJlclxuICAgICAgICAgICAgICAgIGF3YWl0IG1lbWJlckFwaS5jcmVhdGVNZW1iZXIoZGF0YSk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ01lbWJlciBjcmVhdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUmVmcmVzaCBtZW1iZXIgbGlzdFxuICAgICAgICAgICAgYXdhaXQgZmV0Y2hNZW1iZXJzKCk7XG4gICAgICAgICAgICBzZXRJc0Zvcm1PcGVuKGZhbHNlKTtcbiAgICAgICAgICAgIHNldEVkaXRpbmdNZW1iZXIobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBlcnJvci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHNhdmUgbWVtYmVyJztcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7IC8vIFJlLXRocm93IHRvIGtlZXAgZm9ybSBvcGVuXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUNvbmZpcm1EZWxldGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghZGVsZXRpbmdNZW1iZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHNldElzRGVsZXRpbmcodHJ1ZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBtZW1iZXJBcGkuZGVsZXRlTWVtYmVyKGRlbGV0aW5nTWVtYmVyLmlkKTtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdNZW1iZXIgZGVsZXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIC8vIFJlZnJlc2ggbWVtYmVyIGxpc3RcbiAgICAgICAgICAgIGF3YWl0IGZldGNoTWVtYmVycygpO1xuICAgICAgICAgICAgc2V0SXNEZWxldGVEaWFsb2dPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgIHNldERlbGV0aW5nTWVtYmVyKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBkZWxldGUgbWVtYmVyJztcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNEZWxldGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUNsb3NlRGVsZXRlRGlhbG9nID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWlzRGVsZXRpbmcpIHtcbiAgICAgICAgICAgIHNldElzRGVsZXRlRGlhbG9nT3BlbihmYWxzZSk7XG4gICAgICAgICAgICBzZXREZWxldGluZ01lbWJlcihudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUGFnZUNoYW5nZSA9IChwYWdlKSA9PiB7XG4gICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIENTViBleHBvcnQgd2l0aCBjdXJyZW50IGZpbHRlcnNcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVFeHBvcnQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRJc0V4cG9ydGluZyh0cnVlKTtcbiAgICAgICAgICAgIC8vIEJ1aWxkIHBhcmFtcyB3aXRoIGN1cnJlbnQgZmlsdGVyc1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICAgICAgaWYgKGRlYm91bmNlZFNlYXJjaFF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmFwcGVuZCgnc2VhcmNoJywgZGVib3VuY2VkU2VhcmNoUXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXR1c0ZpbHRlciAhPT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuYXBwZW5kKCdzdGF0dXMnLCBzdGF0dXNGaWx0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNtYWxsR3JvdXBGaWx0ZXIgIT09ICdhbGwnKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmFwcGVuZCgnc21hbGxfZ3JvdXBfaWQnLCBzbWFsbEdyb3VwRmlsdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENhbGwgZXhwb3J0IEFQSVxuICAgICAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IG1lbWJlckFwaS5leHBvcnRNZW1iZXJzKHBhcmFtcyk7XG4gICAgICAgICAgICAvLyBDcmVhdGUgZG93bmxvYWQgbGluayB3aXRoIHRpbWVzdGFtcGVkIGZpbGVuYW1lXG4gICAgICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSB0aW1lc3RhbXBlZCBmaWxlbmFtZVxuICAgICAgICAgICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnJlcGxhY2UoL1s6Ll0vZywgJy0nKS5zbGljZSgwLCAxOSk7XG4gICAgICAgICAgICBsaW5rLmRvd25sb2FkID0gYG1lbWJlcnNfZXhwb3J0XyR7dGltZXN0YW1wfS5jc3ZgO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ01lbWJlcnMgZXhwb3J0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBlcnJvci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGV4cG9ydCBtZW1iZXJzJztcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCBlcnJvck1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNFeHBvcnRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIHNtOmp1c3RpZnktYmV0d2VlbiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiTWVtYmVyIERpcmVjdG9yeVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS02MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJNYW5hZ2UgYW5kIHZpZXcgYWxsIGNodXJjaCBtZW1iZXJzIGFuZCB2aXNpdG9yc1wiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIiwgY2hpbGRyZW46IFtfanN4cyhCdXR0b24sIHsgb25DbGljazogaGFuZGxlRXhwb3J0LCBkaXNhYmxlZDogaXNFeHBvcnRpbmcsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KERvd25sb2FkLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImhpZGRlbiBzbTppbmxpbmVcIiwgY2hpbGRyZW46IGlzRXhwb3J0aW5nID8gJ0V4cG9ydGluZy4uLicgOiAnRXhwb3J0IENTVicgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInNtOmhpZGRlblwiLCBjaGlsZHJlbjogaXNFeHBvcnRpbmcgPyAnRXhwb3J0aW5nLi4uJyA6ICdFeHBvcnQnIH0pXSB9KSwgY2FuTW9kaWZ5ICYmIChfanN4cyhCdXR0b24sIHsgb25DbGljazogaGFuZGxlQWRkTWVtYmVyLCBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFVzZXJQbHVzLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImhpZGRlbiBzbTppbmxpbmVcIiwgY2hpbGRyZW46IFwiQWRkIE1lbWJlclwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJzbTpoaWRkZW5cIiwgY2hpbGRyZW46IFwiQWRkXCIgfSldIH0pKV0gfSldIH0pLCBfanN4KENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMSByZWxhdGl2ZVwiLCBjaGlsZHJlbjogW19qc3goU2VhcmNoLCB7IGNsYXNzTmFtZTogXCJhYnNvbHV0ZSBsZWZ0LTMgdG9wLTEvMiB0cmFuc2Zvcm0gLXRyYW5zbGF0ZS15LTEvMiBoLTQgdy00IHRleHQtZ3JheS00MDBcIiB9KSwgX2pzeChJbnB1dCwgeyB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiU2VhcmNoIGJ5IG5hbWUsIGVtYWlsLCBvciBwaG9uZS4uLlwiLCB2YWx1ZTogc2VhcmNoUXVlcnksIG9uQ2hhbmdlOiAoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpLCBjbGFzc05hbWU6IFwicGwtMTBcIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChGaWx0ZXIsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1ncmF5LTQwMFwiIH0pLCBfanN4cyhcInNlbGVjdFwiLCB7IHZhbHVlOiBzdGF0dXNGaWx0ZXIsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0U3RhdHVzRmlsdGVyKGUudGFyZ2V0LnZhbHVlKSwgY2xhc3NOYW1lOiBcImgtMTAgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWlucHV0IGJnLWJhY2tncm91bmQgcHgtMyBweS0yIHRleHQtc20gcmluZy1vZmZzZXQtYmFja2dyb3VuZCBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcmluZyBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTJcIiwgY2hpbGRyZW46IFtfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiYWxsXCIsIGNoaWxkcmVuOiBcIkFsbCBNZW1iZXJzXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJhY3RpdmVcIiwgY2hpbGRyZW46IFwiQWN0aXZlIE1lbWJlcnNcIiB9KSwgX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcInZpc2l0b3JcIiwgY2hpbGRyZW46IFwiVmlzaXRvcnNcIiB9KV0gfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBfanN4cyhcInNlbGVjdFwiLCB7IHZhbHVlOiBzbWFsbEdyb3VwRmlsdGVyLCBvbkNoYW5nZTogKGUpID0+IHNldFNtYWxsR3JvdXBGaWx0ZXIoZS50YXJnZXQudmFsdWUpLCBjbGFzc05hbWU6IFwiaC0xMCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItaW5wdXQgYmctYmFja2dyb3VuZCBweC0zIHB5LTIgdGV4dC1zbSByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1yaW5nIGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtMlwiLCBjaGlsZHJlbjogW19qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJhbGxcIiwgY2hpbGRyZW46IFwiQWxsIFNtYWxsIEdyb3Vwc1wiIH0pLCBzbWFsbEdyb3Vwcy5tYXAoKGdyb3VwKSA9PiAoX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBncm91cC5pZC50b1N0cmluZygpLCBjaGlsZHJlbjogZ3JvdXAubmFtZSB9LCBncm91cC5pZCkpKV0gfSkgfSldIH0pIH0pLCBfanN4KENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogX2pzeChNZW1iZXJUYWJsZSwgeyBtZW1iZXJzOiBtZW1iZXJzLCBvbkVkaXQ6IGNhbk1vZGlmeSA/IGhhbmRsZUVkaXRNZW1iZXIgOiB1bmRlZmluZWQsIG9uRGVsZXRlOiBjYW5Nb2RpZnkgPyBoYW5kbGVEZWxldGVNZW1iZXIgOiB1bmRlZmluZWQsIGN1cnJlbnRQYWdlOiBjdXJyZW50UGFnZSwgdG90YWxQYWdlczogdG90YWxQYWdlcywgb25QYWdlQ2hhbmdlOiBoYW5kbGVQYWdlQ2hhbmdlLCBpc0xvYWRpbmc6IGlzTG9hZGluZyB9KSB9KSwgX2pzeChNZW1iZXJGb3JtLCB7IGlzT3BlbjogaXNGb3JtT3Blbiwgb25DbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc0Zvcm1PcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RWRpdGluZ01lbWJlcihudWxsKTtcbiAgICAgICAgICAgICAgICB9LCBvblN1Ym1pdDogaGFuZGxlRm9ybVN1Ym1pdCwgbWVtYmVyOiBlZGl0aW5nTWVtYmVyLCBzbWFsbEdyb3Vwczogc21hbGxHcm91cHMgfSksIF9qc3goRGVsZXRlTWVtYmVyRGlhbG9nLCB7IGlzT3BlbjogaXNEZWxldGVEaWFsb2dPcGVuLCBvbkNsb3NlOiBoYW5kbGVDbG9zZURlbGV0ZURpYWxvZywgb25Db25maXJtOiBoYW5kbGVDb25maXJtRGVsZXRlLCBtZW1iZXI6IGRlbGV0aW5nTWVtYmVyLCBpc0RlbGV0aW5nOiBpc0RlbGV0aW5nIH0pXSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgTWVtYmVycztcbiIsInZhciBjdXJyZW50Tm9uY2U7XG5leHBvcnQgdmFyIHNldE5vbmNlID0gZnVuY3Rpb24gKG5vbmNlKSB7XG4gICAgY3VycmVudE5vbmNlID0gbm9uY2U7XG59O1xuZXhwb3J0IHZhciBnZXROb25jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY3VycmVudE5vbmNlKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50Tm9uY2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbW1wicGF0aFwiLCB7IGQ6IFwibTE4IDE1LTYtNi02IDZcIiwga2V5OiBcIjE1M3VkelwiIH1dXTtcbmNvbnN0IENoZXZyb25VcCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJjaGV2cm9uLXVwXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBDaGV2cm9uVXAgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2hldnJvbi11cC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTcgMTUgNSA1IDUtNVwiLCBrZXk6IFwiMWhmMXR3XCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIm03IDkgNS01IDUgNVwiLCBrZXk6IFwic2d0NnhnXCIgfV1cbl07XG5jb25zdCBDaGV2cm9uc1VwRG93biA9IGNyZWF0ZUx1Y2lkZUljb24oXCJjaGV2cm9ucy11cC1kb3duXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBDaGV2cm9uc1VwRG93biBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jaGV2cm9ucy11cC1kb3duLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgMTVWM1wiLCBrZXk6IFwibTlnMXgxXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00XCIsIGtleTogXCJpaDduM2hcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTcgMTAgNSA1IDUtNVwiLCBrZXk6IFwiYnJzbjcwXCIgfV1cbl07XG5jb25zdCBEb3dubG9hZCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJkb3dubG9hZFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgRG93bmxvYWQgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG93bmxvYWQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xMCAyMGExIDEgMCAwIDAgLjU1My44OTVsMiAxQTEgMSAwIDAgMCAxNCAyMXYtN2EyIDIgMCAwIDEgLjUxNy0xLjM0MUwyMS43NCA0LjY3QTEgMSAwIDAgMCAyMSAzSDNhMSAxIDAgMCAwLS43NDIgMS42N2w3LjIyNSA3Ljk4OUEyIDIgMCAwIDEgMTAgMTR6XCIsXG4gICAgICBrZXk6IFwic2M3cTdpXCJcbiAgICB9XG4gIF1cbl07XG5jb25zdCBGdW5uZWwgPSBjcmVhdGVMdWNpZGVJY29uKFwiZnVubmVsXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBGdW5uZWwgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnVubmVsLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJtMjEgMjEtNC4zNC00LjM0XCIsIGtleTogXCIxNGo3cmpcIiB9XSxcbiAgW1wiY2lyY2xlXCIsIHsgY3g6IFwiMTFcIiwgY3k6IFwiMTFcIiwgcjogXCI4XCIsIGtleTogXCI0ZWo5N3VcIiB9XVxuXTtcbmNvbnN0IFNlYXJjaCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJzZWFyY2hcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFNlYXJjaCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZWFyY2guanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMiAzSDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJ2LTdcIiwga2V5OiBcIjFtMHY2Z1wiIH1dLFxuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMTguMzc1IDIuNjI1YTEgMSAwIDAgMSAzIDNsLTkuMDEzIDkuMDE0YTIgMiAwIDAgMS0uODUzLjUwNWwtMi44NzMuODRhLjUuNSAwIDAgMS0uNjItLjYybC44NC0yLjg3M2EyIDIgMCAwIDEgLjUwNi0uODUyelwiLFxuICAgICAga2V5OiBcIm9ocmJnMlwiXG4gICAgfVxuICBdXG5dO1xuY29uc3QgU3F1YXJlUGVuID0gY3JlYXRlTHVjaWRlSWNvbihcInNxdWFyZS1wZW5cIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFNxdWFyZVBlbiBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zcXVhcmUtcGVuLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTAgMTF2NlwiLCBrZXk6IFwibmNvMG9tXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNCAxMXY2XCIsIGtleTogXCJvdXR2MXVcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE5IDZ2MTRhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJWNlwiLCBrZXk6IFwibWl5dHJjXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0zIDZoMThcIiwga2V5OiBcImQwd20walwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNOCA2VjRhMiAyIDAgMCAxIDItMmg0YTIgMiAwIDAgMSAyIDJ2MlwiLCBrZXk6IFwiZTc5MWppXCIgfV1cbl07XG5jb25zdCBUcmFzaDIgPSBjcmVhdGVMdWNpZGVJY29uKFwidHJhc2gtMlwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVHJhc2gyIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyYXNoLTIuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDZhNCA0IDAgMCAwLTQgNHYyXCIsIGtleTogXCIxeXlpdHFcIiB9XSxcbiAgW1wiY2lyY2xlXCIsIHsgY3g6IFwiOVwiLCBjeTogXCI3XCIsIHI6IFwiNFwiLCBrZXk6IFwibnVmazhcIiB9XSxcbiAgW1wibGluZVwiLCB7IHgxOiBcIjE5XCIsIHgyOiBcIjE5XCIsIHkxOiBcIjhcIiwgeTI6IFwiMTRcIiwga2V5OiBcIjFidnl4blwiIH1dLFxuICBbXCJsaW5lXCIsIHsgeDE6IFwiMjJcIiwgeDI6IFwiMTZcIiwgeTE6IFwiMTFcIiwgeTI6IFwiMTFcIiwga2V5OiBcIjFzaGpnbFwiIH1dXG5dO1xuY29uc3QgVXNlclBsdXMgPSBjcmVhdGVMdWNpZGVJY29uKFwidXNlci1wbHVzXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBVc2VyUGx1cyBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLXBsdXMuanMubWFwXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHlsZVNpbmdsZXRvbiB9IGZyb20gJ3JlYWN0LXN0eWxlLXNpbmdsZXRvbic7XG5pbXBvcnQgeyBmdWxsV2lkdGhDbGFzc05hbWUsIHplcm9SaWdodENsYXNzTmFtZSwgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0R2FwV2lkdGggfSBmcm9tICcuL3V0aWxzJztcbnZhciBTdHlsZSA9IHN0eWxlU2luZ2xldG9uKCk7XG5leHBvcnQgdmFyIGxvY2tBdHRyaWJ1dGUgPSAnZGF0YS1zY3JvbGwtbG9ja2VkJztcbi8vIGltcG9ydGFudCB0aXAgLSBvbmNlIHdlIG1lYXN1cmUgc2Nyb2xsQmFyIHdpZHRoIGFuZCByZW1vdmUgdGhlbVxuLy8gd2UgY291bGQgbm90IHJlcGVhdCB0aGlzIG9wZXJhdGlvblxuLy8gdGh1cyB3ZSBhcmUgdXNpbmcgc3R5bGUtc2luZ2xldG9uIC0gb25seSB0aGUgZmlyc3QgXCJ5ZXQgY29ycmVjdFwiIHN0eWxlIHdpbGwgYmUgYXBwbGllZC5cbnZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiAoX2EsIGFsbG93UmVsYXRpdmUsIGdhcE1vZGUsIGltcG9ydGFudCkge1xuICAgIHZhciBsZWZ0ID0gX2EubGVmdCwgdG9wID0gX2EudG9wLCByaWdodCA9IF9hLnJpZ2h0LCBnYXAgPSBfYS5nYXA7XG4gICAgaWYgKGdhcE1vZGUgPT09IHZvaWQgMCkgeyBnYXBNb2RlID0gJ21hcmdpbic7IH1cbiAgICByZXR1cm4gXCJcXG4gIC5cIi5jb25jYXQobm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCBcIiB7XFxuICAgb3ZlcmZsb3c6IGhpZGRlbiBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICAgcGFkZGluZy1yaWdodDogXCIpLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgYm9keVtcIikuY29uY2F0KGxvY2tBdHRyaWJ1dGUsIFwiXSB7XFxuICAgIG92ZXJmbG93OiBoaWRkZW4gXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgICBvdmVyc2Nyb2xsLWJlaGF2aW9yOiBjb250YWluO1xcbiAgICBcIikuY29uY2F0KFtcbiAgICAgICAgYWxsb3dSZWxhdGl2ZSAmJiBcInBvc2l0aW9uOiByZWxhdGl2ZSBcIi5jb25jYXQoaW1wb3J0YW50LCBcIjtcIiksXG4gICAgICAgIGdhcE1vZGUgPT09ICdtYXJnaW4nICYmXG4gICAgICAgICAgICBcIlxcbiAgICBwYWRkaW5nLWxlZnQ6IFwiLmNvbmNhdChsZWZ0LCBcInB4O1xcbiAgICBwYWRkaW5nLXRvcDogXCIpLmNvbmNhdCh0b3AsIFwicHg7XFxuICAgIHBhZGRpbmctcmlnaHQ6IFwiKS5jb25jYXQocmlnaHQsIFwicHg7XFxuICAgIG1hcmdpbi1sZWZ0OjA7XFxuICAgIG1hcmdpbi10b3A6MDtcXG4gICAgbWFyZ2luLXJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICAgIFwiKSxcbiAgICAgICAgZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnICYmIFwicGFkZGluZy1yaWdodDogXCIuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XCIpLFxuICAgIF1cbiAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAuam9pbignJyksIFwiXFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KHplcm9SaWdodENsYXNzTmFtZSwgXCIge1xcbiAgICByaWdodDogXCIpLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICAuXCIpLmNvbmNhdChmdWxsV2lkdGhDbGFzc05hbWUsIFwiIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KHplcm9SaWdodENsYXNzTmFtZSwgXCIgLlwiKS5jb25jYXQoemVyb1JpZ2h0Q2xhc3NOYW1lLCBcIiB7XFxuICAgIHJpZ2h0OiAwIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoZnVsbFdpZHRoQ2xhc3NOYW1lLCBcIiAuXCIpLmNvbmNhdChmdWxsV2lkdGhDbGFzc05hbWUsIFwiIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgYm9keVtcIikuY29uY2F0KGxvY2tBdHRyaWJ1dGUsIFwiXSB7XFxuICAgIFwiKS5jb25jYXQocmVtb3ZlZEJhclNpemVWYXJpYWJsZSwgXCI6IFwiKS5jb25jYXQoZ2FwLCBcInB4O1xcbiAgfVxcblwiKTtcbn07XG52YXIgZ2V0Q3VycmVudFVzZUNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBwYXJzZUludChkb2N1bWVudC5ib2R5LmdldEF0dHJpYnV0ZShsb2NrQXR0cmlidXRlKSB8fCAnMCcsIDEwKTtcbiAgICByZXR1cm4gaXNGaW5pdGUoY291bnRlcikgPyBjb3VudGVyIDogMDtcbn07XG5leHBvcnQgdmFyIHVzZUxvY2tBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUobG9ja0F0dHJpYnV0ZSwgKGdldEN1cnJlbnRVc2VDb3VudGVyKCkgKyAxKS50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBuZXdDb3VudGVyID0gZ2V0Q3VycmVudFVzZUNvdW50ZXIoKSAtIDE7XG4gICAgICAgICAgICBpZiAobmV3Q291bnRlciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUobG9ja0F0dHJpYnV0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShsb2NrQXR0cmlidXRlLCBuZXdDb3VudGVyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sIFtdKTtcbn07XG4vKipcbiAqIFJlbW92ZXMgcGFnZSBzY3JvbGxiYXIgYW5kIGJsb2NrcyBwYWdlIHNjcm9sbCB3aGVuIG1vdW50ZWRcbiAqL1xuZXhwb3J0IHZhciBSZW1vdmVTY3JvbGxCYXIgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgbm9SZWxhdGl2ZSA9IF9hLm5vUmVsYXRpdmUsIG5vSW1wb3J0YW50ID0gX2Eubm9JbXBvcnRhbnQsIF9iID0gX2EuZ2FwTW9kZSwgZ2FwTW9kZSA9IF9iID09PSB2b2lkIDAgPyAnbWFyZ2luJyA6IF9iO1xuICAgIHVzZUxvY2tBdHRyaWJ1dGUoKTtcbiAgICAvKlxuICAgICBnYXAgd2lsbCBiZSBtZWFzdXJlZCBvbiBldmVyeSBjb21wb25lbnQgbW91bnRcbiAgICAgaG93ZXZlciBpdCB3aWxsIGJlIHVzZWQgb25seSBieSB0aGUgXCJmaXJzdFwiIGludm9jYXRpb25cbiAgICAgZHVlIHRvIHNpbmdsZXRvbiBuYXR1cmUgb2YgPFN0eWxlXG4gICAgICovXG4gICAgdmFyIGdhcCA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0R2FwV2lkdGgoZ2FwTW9kZSk7IH0sIFtnYXBNb2RlXSk7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3R5bGUsIHsgc3R5bGVzOiBnZXRTdHlsZXMoZ2FwLCAhbm9SZWxhdGl2ZSwgZ2FwTW9kZSwgIW5vSW1wb3J0YW50ID8gJyFpbXBvcnRhbnQnIDogJycpIH0pO1xufTtcbiIsImV4cG9ydCB2YXIgemVyb1JpZ2h0Q2xhc3NOYW1lID0gJ3JpZ2h0LXNjcm9sbC1iYXItcG9zaXRpb24nO1xuZXhwb3J0IHZhciBmdWxsV2lkdGhDbGFzc05hbWUgPSAnd2lkdGgtYmVmb3JlLXNjcm9sbC1iYXInO1xuZXhwb3J0IHZhciBub1Njcm9sbGJhcnNDbGFzc05hbWUgPSAnd2l0aC1zY3JvbGwtYmFycy1oaWRkZW4nO1xuLyoqXG4gKiBOYW1lIG9mIGEgQ1NTIHZhcmlhYmxlIGNvbnRhaW5pbmcgdGhlIGFtb3VudCBvZiBcImhpZGRlblwiIHNjcm9sbGJhclxuICogISBtaWdodCBiZSB1bmRlZmluZWQgISB1c2Ugd2lsbCBmYWxsYmFjayFcbiAqL1xuZXhwb3J0IHZhciByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlID0gJy0tcmVtb3ZlZC1ib2R5LXNjcm9sbC1iYXItc2l6ZSc7XG4iLCJpbXBvcnQgeyBSZW1vdmVTY3JvbGxCYXIgfSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgeyB6ZXJvUmlnaHRDbGFzc05hbWUsIGZ1bGxXaWR0aENsYXNzTmFtZSwgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0R2FwV2lkdGggfSBmcm9tICcuL3V0aWxzJztcbmV4cG9ydCB7IFJlbW92ZVNjcm9sbEJhciwgemVyb1JpZ2h0Q2xhc3NOYW1lLCBmdWxsV2lkdGhDbGFzc05hbWUsIG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSwgcmVtb3ZlZEJhclNpemVWYXJpYWJsZSwgZ2V0R2FwV2lkdGgsIH07XG4iLCJleHBvcnQgdmFyIHplcm9HYXAgPSB7XG4gICAgbGVmdDogMCxcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgZ2FwOiAwLFxufTtcbnZhciBwYXJzZSA9IGZ1bmN0aW9uICh4KSB7IHJldHVybiBwYXJzZUludCh4IHx8ICcnLCAxMCkgfHwgMDsgfTtcbnZhciBnZXRPZmZzZXQgPSBmdW5jdGlvbiAoZ2FwTW9kZSkge1xuICAgIHZhciBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpO1xuICAgIHZhciBsZWZ0ID0gY3NbZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnID8gJ3BhZGRpbmdMZWZ0JyA6ICdtYXJnaW5MZWZ0J107XG4gICAgdmFyIHRvcCA9IGNzW2dhcE1vZGUgPT09ICdwYWRkaW5nJyA/ICdwYWRkaW5nVG9wJyA6ICdtYXJnaW5Ub3AnXTtcbiAgICB2YXIgcmlnaHQgPSBjc1tnYXBNb2RlID09PSAncGFkZGluZycgPyAncGFkZGluZ1JpZ2h0JyA6ICdtYXJnaW5SaWdodCddO1xuICAgIHJldHVybiBbcGFyc2UobGVmdCksIHBhcnNlKHRvcCksIHBhcnNlKHJpZ2h0KV07XG59O1xuZXhwb3J0IHZhciBnZXRHYXBXaWR0aCA9IGZ1bmN0aW9uIChnYXBNb2RlKSB7XG4gICAgaWYgKGdhcE1vZGUgPT09IHZvaWQgMCkgeyBnYXBNb2RlID0gJ21hcmdpbic7IH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHplcm9HYXA7XG4gICAgfVxuICAgIHZhciBvZmZzZXRzID0gZ2V0T2Zmc2V0KGdhcE1vZGUpO1xuICAgIHZhciBkb2N1bWVudFdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIHZhciB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IG9mZnNldHNbMF0sXG4gICAgICAgIHRvcDogb2Zmc2V0c1sxXSxcbiAgICAgICAgcmlnaHQ6IG9mZnNldHNbMl0sXG4gICAgICAgIGdhcDogTWF0aC5tYXgoMCwgd2luZG93V2lkdGggLSBkb2N1bWVudFdpZHRoICsgb2Zmc2V0c1syXSAtIG9mZnNldHNbMF0pLFxuICAgIH07XG59O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJlbW92ZVNjcm9sbCB9IGZyb20gJy4vVUknO1xuaW1wb3J0IFNpZGVDYXIgZnJvbSAnLi9zaWRlY2FyJztcbnZhciBSZWFjdFJlbW92ZVNjcm9sbCA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCByZWYpIHsgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlbW92ZVNjcm9sbCwgX19hc3NpZ24oe30sIHByb3BzLCB7IHJlZjogcmVmLCBzaWRlQ2FyOiBTaWRlQ2FyIH0pKSk7IH0pO1xuUmVhY3RSZW1vdmVTY3JvbGwuY2xhc3NOYW1lcyA9IFJlbW92ZVNjcm9sbC5jbGFzc05hbWVzO1xuZXhwb3J0IGRlZmF1bHQgUmVhY3RSZW1vdmVTY3JvbGw7XG4iLCJpbXBvcnQgeyBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSZW1vdmVTY3JvbGxCYXIgfSBmcm9tICdyZWFjdC1yZW1vdmUtc2Nyb2xsLWJhcic7XG5pbXBvcnQgeyBzdHlsZVNpbmdsZXRvbiB9IGZyb20gJ3JlYWN0LXN0eWxlLXNpbmdsZXRvbic7XG5pbXBvcnQgeyBub25QYXNzaXZlIH0gZnJvbSAnLi9hZ2dyZXNpdmVDYXB0dXJlJztcbmltcG9ydCB7IGhhbmRsZVNjcm9sbCwgbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQgfSBmcm9tICcuL2hhbmRsZVNjcm9sbCc7XG5leHBvcnQgdmFyIGdldFRvdWNoWFkgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICByZXR1cm4gJ2NoYW5nZWRUb3VjaGVzJyBpbiBldmVudCA/IFtldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZXSA6IFswLCAwXTtcbn07XG5leHBvcnQgdmFyIGdldERlbHRhWFkgPSBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIFtldmVudC5kZWx0YVgsIGV2ZW50LmRlbHRhWV07IH07XG52YXIgZXh0cmFjdFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICByZXR1cm4gcmVmICYmICdjdXJyZW50JyBpbiByZWYgPyByZWYuY3VycmVudCA6IHJlZjtcbn07XG52YXIgZGVsdGFDb21wYXJlID0gZnVuY3Rpb24gKHgsIHkpIHsgcmV0dXJuIHhbMF0gPT09IHlbMF0gJiYgeFsxXSA9PT0geVsxXTsgfTtcbnZhciBnZW5lcmF0ZVN0eWxlID0gZnVuY3Rpb24gKGlkKSB7IHJldHVybiBcIlxcbiAgLmJsb2NrLWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkLCBcIiB7cG9pbnRlci1ldmVudHM6IG5vbmU7fVxcbiAgLmFsbG93LWludGVyYWN0aXZpdHktXCIpLmNvbmNhdChpZCwgXCIge3BvaW50ZXItZXZlbnRzOiBhbGw7fVxcblwiKTsgfTtcbnZhciBpZENvdW50ZXIgPSAwO1xudmFyIGxvY2tTdGFjayA9IFtdO1xuZXhwb3J0IGZ1bmN0aW9uIFJlbW92ZVNjcm9sbFNpZGVDYXIocHJvcHMpIHtcbiAgICB2YXIgc2hvdWxkUHJldmVudFF1ZXVlID0gUmVhY3QudXNlUmVmKFtdKTtcbiAgICB2YXIgdG91Y2hTdGFydFJlZiA9IFJlYWN0LnVzZVJlZihbMCwgMF0pO1xuICAgIHZhciBhY3RpdmVBeGlzID0gUmVhY3QudXNlUmVmKCk7XG4gICAgdmFyIGlkID0gUmVhY3QudXNlU3RhdGUoaWRDb3VudGVyKyspWzBdO1xuICAgIHZhciBTdHlsZSA9IFJlYWN0LnVzZVN0YXRlKHN0eWxlU2luZ2xldG9uKVswXTtcbiAgICB2YXIgbGFzdFByb3BzID0gUmVhY3QudXNlUmVmKHByb3BzKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBsYXN0UHJvcHMuY3VycmVudCA9IHByb3BzO1xuICAgIH0sIFtwcm9wc10pO1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChwcm9wcy5pbmVydCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiYmxvY2staW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTtcbiAgICAgICAgICAgIHZhciBhbGxvd18xID0gX19zcHJlYWRBcnJheShbcHJvcHMubG9ja1JlZi5jdXJyZW50XSwgKHByb3BzLnNoYXJkcyB8fCBbXSkubWFwKGV4dHJhY3RSZWYpLCB0cnVlKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgICBhbGxvd18xLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5jbGFzc0xpc3QuYWRkKFwiYWxsb3ctaW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTsgfSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImJsb2NrLWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkKSk7XG4gICAgICAgICAgICAgICAgYWxsb3dfMS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuY2xhc3NMaXN0LnJlbW92ZShcImFsbG93LWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkKSk7IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfSwgW3Byb3BzLmluZXJ0LCBwcm9wcy5sb2NrUmVmLmN1cnJlbnQsIHByb3BzLnNoYXJkc10pO1xuICAgIHZhciBzaG91bGRDYW5jZWxFdmVudCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCwgcGFyZW50KSB7XG4gICAgICAgIGlmICgoJ3RvdWNoZXMnIGluIGV2ZW50ICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAyKSB8fCAoZXZlbnQudHlwZSA9PT0gJ3doZWVsJyAmJiBldmVudC5jdHJsS2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuICFsYXN0UHJvcHMuY3VycmVudC5hbGxvd1BpbmNoWm9vbTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG91Y2ggPSBnZXRUb3VjaFhZKGV2ZW50KTtcbiAgICAgICAgdmFyIHRvdWNoU3RhcnQgPSB0b3VjaFN0YXJ0UmVmLmN1cnJlbnQ7XG4gICAgICAgIHZhciBkZWx0YVggPSAnZGVsdGFYJyBpbiBldmVudCA/IGV2ZW50LmRlbHRhWCA6IHRvdWNoU3RhcnRbMF0gLSB0b3VjaFswXTtcbiAgICAgICAgdmFyIGRlbHRhWSA9ICdkZWx0YVknIGluIGV2ZW50ID8gZXZlbnQuZGVsdGFZIDogdG91Y2hTdGFydFsxXSAtIHRvdWNoWzFdO1xuICAgICAgICB2YXIgY3VycmVudEF4aXM7XG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHZhciBtb3ZlRGlyZWN0aW9uID0gTWF0aC5hYnMoZGVsdGFYKSA+IE1hdGguYWJzKGRlbHRhWSkgPyAnaCcgOiAndic7XG4gICAgICAgIC8vIGFsbG93IGhvcml6b250YWwgdG91Y2ggbW92ZSBvbiBSYW5nZSBpbnB1dHMuIFRoZXkgd2lsbCBub3QgY2F1c2UgYW55IHNjcm9sbFxuICAgICAgICBpZiAoJ3RvdWNoZXMnIGluIGV2ZW50ICYmIG1vdmVEaXJlY3Rpb24gPT09ICdoJyAmJiB0YXJnZXQudHlwZSA9PT0gJ3JhbmdlJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFsbG93IGRyYWcgc2VsZWN0aW9uIChpT1MpOyBjaGVjayBpZiBzZWxlY3Rpb24ncyBhbmNob3JOb2RlIGlzIHRoZSBzYW1lIGFzIHRhcmdldCBvciBjb250YWlucyB0YXJnZXRcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIGFuY2hvck5vZGUgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmFuY2hvck5vZGU7XG4gICAgICAgIHZhciBpc1RvdWNoaW5nU2VsZWN0aW9uID0gYW5jaG9yTm9kZSA/IGFuY2hvck5vZGUgPT09IHRhcmdldCB8fCBhbmNob3JOb2RlLmNvbnRhaW5zKHRhcmdldCkgOiBmYWxzZTtcbiAgICAgICAgaWYgKGlzVG91Y2hpbmdTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbiA9IGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkKG1vdmVEaXJlY3Rpb24sIHRhcmdldCk7XG4gICAgICAgIGlmICghY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGN1cnJlbnRBeGlzID0gbW92ZURpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRBeGlzID0gbW92ZURpcmVjdGlvbiA9PT0gJ3YnID8gJ2gnIDogJ3YnO1xuICAgICAgICAgICAgY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbiA9IGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkKG1vdmVEaXJlY3Rpb24sIHRhcmdldCk7XG4gICAgICAgICAgICAvLyBvdGhlciBheGlzIG1pZ2h0IGJlIG5vdCBzY3JvbGxhYmxlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhY3RpdmVBeGlzLmN1cnJlbnQgJiYgJ2NoYW5nZWRUb3VjaGVzJyBpbiBldmVudCAmJiAoZGVsdGFYIHx8IGRlbHRhWSkpIHtcbiAgICAgICAgICAgIGFjdGl2ZUF4aXMuY3VycmVudCA9IGN1cnJlbnRBeGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudEF4aXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYW5jZWxpbmdBeGlzID0gYWN0aXZlQXhpcy5jdXJyZW50IHx8IGN1cnJlbnRBeGlzO1xuICAgICAgICByZXR1cm4gaGFuZGxlU2Nyb2xsKGNhbmNlbGluZ0F4aXMsIHBhcmVudCwgZXZlbnQsIGNhbmNlbGluZ0F4aXMgPT09ICdoJyA/IGRlbHRhWCA6IGRlbHRhWSwgdHJ1ZSk7XG4gICAgfSwgW10pO1xuICAgIHZhciBzaG91bGRQcmV2ZW50ID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKF9ldmVudCkge1xuICAgICAgICB2YXIgZXZlbnQgPSBfZXZlbnQ7XG4gICAgICAgIGlmICghbG9ja1N0YWNrLmxlbmd0aCB8fCBsb2NrU3RhY2tbbG9ja1N0YWNrLmxlbmd0aCAtIDFdICE9PSBTdHlsZSkge1xuICAgICAgICAgICAgLy8gbm90IHRoZSBsYXN0IGFjdGl2ZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWx0YSA9ICdkZWx0YVknIGluIGV2ZW50ID8gZ2V0RGVsdGFYWShldmVudCkgOiBnZXRUb3VjaFhZKGV2ZW50KTtcbiAgICAgICAgdmFyIHNvdXJjZUV2ZW50ID0gc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09IGV2ZW50LnR5cGUgJiYgKGUudGFyZ2V0ID09PSBldmVudC50YXJnZXQgfHwgZXZlbnQudGFyZ2V0ID09PSBlLnNoYWRvd1BhcmVudCkgJiYgZGVsdGFDb21wYXJlKGUuZGVsdGEsIGRlbHRhKTsgfSlbMF07XG4gICAgICAgIC8vIHNlbGYgZXZlbnQsIGFuZCBzaG91bGQgYmUgY2FuY2VsZWRcbiAgICAgICAgaWYgKHNvdXJjZUV2ZW50ICYmIHNvdXJjZUV2ZW50LnNob3VsZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIG91dHNpZGUgb3Igc2hhcmQgZXZlbnRcbiAgICAgICAgaWYgKCFzb3VyY2VFdmVudCkge1xuICAgICAgICAgICAgdmFyIHNoYXJkTm9kZXMgPSAobGFzdFByb3BzLmN1cnJlbnQuc2hhcmRzIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5tYXAoZXh0cmFjdFJlZilcbiAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gbm9kZS5jb250YWlucyhldmVudC50YXJnZXQpOyB9KTtcbiAgICAgICAgICAgIHZhciBzaG91bGRTdG9wID0gc2hhcmROb2Rlcy5sZW5ndGggPiAwID8gc2hvdWxkQ2FuY2VsRXZlbnQoZXZlbnQsIHNoYXJkTm9kZXNbMF0pIDogIWxhc3RQcm9wcy5jdXJyZW50Lm5vSXNvbGF0aW9uO1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0b3ApIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICB2YXIgc2hvdWxkQ2FuY2VsID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKG5hbWUsIGRlbHRhLCB0YXJnZXQsIHNob3VsZCkge1xuICAgICAgICB2YXIgZXZlbnQgPSB7IG5hbWU6IG5hbWUsIGRlbHRhOiBkZWx0YSwgdGFyZ2V0OiB0YXJnZXQsIHNob3VsZDogc2hvdWxkLCBzaGFkb3dQYXJlbnQ6IGdldE91dGVybW9zdFNoYWRvd1BhcmVudCh0YXJnZXQpIH07XG4gICAgICAgIHNob3VsZFByZXZlbnRRdWV1ZS5jdXJyZW50LnB1c2goZXZlbnQpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNob3VsZFByZXZlbnRRdWV1ZS5jdXJyZW50ID0gc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlICE9PSBldmVudDsgfSk7XG4gICAgICAgIH0sIDEpO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2Nyb2xsVG91Y2hTdGFydCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0b3VjaFN0YXJ0UmVmLmN1cnJlbnQgPSBnZXRUb3VjaFhZKGV2ZW50KTtcbiAgICAgICAgYWN0aXZlQXhpcy5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2Nyb2xsV2hlZWwgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsKGV2ZW50LnR5cGUsIGdldERlbHRhWFkoZXZlbnQpLCBldmVudC50YXJnZXQsIHNob3VsZENhbmNlbEV2ZW50KGV2ZW50LCBwcm9wcy5sb2NrUmVmLmN1cnJlbnQpKTtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHNjcm9sbFRvdWNoTW92ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzaG91bGRDYW5jZWwoZXZlbnQudHlwZSwgZ2V0VG91Y2hYWShldmVudCksIGV2ZW50LnRhcmdldCwgc2hvdWxkQ2FuY2VsRXZlbnQoZXZlbnQsIHByb3BzLmxvY2tSZWYuY3VycmVudCkpO1xuICAgIH0sIFtdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2NrU3RhY2sucHVzaChTdHlsZSk7XG4gICAgICAgIHByb3BzLnNldENhbGxiYWNrcyh7XG4gICAgICAgICAgICBvblNjcm9sbENhcHR1cmU6IHNjcm9sbFdoZWVsLFxuICAgICAgICAgICAgb25XaGVlbENhcHR1cmU6IHNjcm9sbFdoZWVsLFxuICAgICAgICAgICAgb25Ub3VjaE1vdmVDYXB0dXJlOiBzY3JvbGxUb3VjaE1vdmUsXG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBzaG91bGRQcmV2ZW50LCBub25QYXNzaXZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNjcm9sbFRvdWNoU3RhcnQsIG5vblBhc3NpdmUpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbG9ja1N0YWNrID0gbG9ja1N0YWNrLmZpbHRlcihmdW5jdGlvbiAoaW5zdCkgeyByZXR1cm4gaW5zdCAhPT0gU3R5bGU7IH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzaG91bGRQcmV2ZW50LCBub25QYXNzaXZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNjcm9sbFRvdWNoU3RhcnQsIG5vblBhc3NpdmUpO1xuICAgICAgICB9O1xuICAgIH0sIFtdKTtcbiAgICB2YXIgcmVtb3ZlU2Nyb2xsQmFyID0gcHJvcHMucmVtb3ZlU2Nyb2xsQmFyLCBpbmVydCA9IHByb3BzLmluZXJ0O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgaW5lcnQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFN0eWxlLCB7IHN0eWxlczogZ2VuZXJhdGVTdHlsZShpZCkgfSkgOiBudWxsLFxuICAgICAgICByZW1vdmVTY3JvbGxCYXIgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFJlbW92ZVNjcm9sbEJhciwgeyBub1JlbGF0aXZlOiBwcm9wcy5ub1JlbGF0aXZlLCBnYXBNb2RlOiBwcm9wcy5nYXBNb2RlIH0pIDogbnVsbCkpO1xufVxuZnVuY3Rpb24gZ2V0T3V0ZXJtb3N0U2hhZG93UGFyZW50KG5vZGUpIHtcbiAgICB2YXIgc2hhZG93UGFyZW50ID0gbnVsbDtcbiAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIHNoYWRvd1BhcmVudCA9IG5vZGUuaG9zdDtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmhvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIHNoYWRvd1BhcmVudDtcbn1cbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX3Jlc3QgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZ1bGxXaWR0aENsYXNzTmFtZSwgemVyb1JpZ2h0Q2xhc3NOYW1lIH0gZnJvbSAncmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvY29uc3RhbnRzJztcbmltcG9ydCB7IHVzZU1lcmdlUmVmcyB9IGZyb20gJ3VzZS1jYWxsYmFjay1yZWYnO1xuaW1wb3J0IHsgZWZmZWN0Q2FyIH0gZnJvbSAnLi9tZWRpdW0nO1xudmFyIG5vdGhpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuO1xufTtcbi8qKlxuICogUmVtb3ZlcyBzY3JvbGxiYXIgZnJvbSB0aGUgcGFnZSBhbmQgY29udGFpbiB0aGUgc2Nyb2xsIHdpdGhpbiB0aGUgTG9ja1xuICovXG52YXIgUmVtb3ZlU2Nyb2xsID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHBhcmVudFJlZikge1xuICAgIHZhciByZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgdmFyIF9hID0gUmVhY3QudXNlU3RhdGUoe1xuICAgICAgICBvblNjcm9sbENhcHR1cmU6IG5vdGhpbmcsXG4gICAgICAgIG9uV2hlZWxDYXB0dXJlOiBub3RoaW5nLFxuICAgICAgICBvblRvdWNoTW92ZUNhcHR1cmU6IG5vdGhpbmcsXG4gICAgfSksIGNhbGxiYWNrcyA9IF9hWzBdLCBzZXRDYWxsYmFja3MgPSBfYVsxXTtcbiAgICB2YXIgZm9yd2FyZFByb3BzID0gcHJvcHMuZm9yd2FyZFByb3BzLCBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLCBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsIHJlbW92ZVNjcm9sbEJhciA9IHByb3BzLnJlbW92ZVNjcm9sbEJhciwgZW5hYmxlZCA9IHByb3BzLmVuYWJsZWQsIHNoYXJkcyA9IHByb3BzLnNoYXJkcywgc2lkZUNhciA9IHByb3BzLnNpZGVDYXIsIG5vUmVsYXRpdmUgPSBwcm9wcy5ub1JlbGF0aXZlLCBub0lzb2xhdGlvbiA9IHByb3BzLm5vSXNvbGF0aW9uLCBpbmVydCA9IHByb3BzLmluZXJ0LCBhbGxvd1BpbmNoWm9vbSA9IHByb3BzLmFsbG93UGluY2hab29tLCBfYiA9IHByb3BzLmFzLCBDb250YWluZXIgPSBfYiA9PT0gdm9pZCAwID8gJ2RpdicgOiBfYiwgZ2FwTW9kZSA9IHByb3BzLmdhcE1vZGUsIHJlc3QgPSBfX3Jlc3QocHJvcHMsIFtcImZvcndhcmRQcm9wc1wiLCBcImNoaWxkcmVuXCIsIFwiY2xhc3NOYW1lXCIsIFwicmVtb3ZlU2Nyb2xsQmFyXCIsIFwiZW5hYmxlZFwiLCBcInNoYXJkc1wiLCBcInNpZGVDYXJcIiwgXCJub1JlbGF0aXZlXCIsIFwibm9Jc29sYXRpb25cIiwgXCJpbmVydFwiLCBcImFsbG93UGluY2hab29tXCIsIFwiYXNcIiwgXCJnYXBNb2RlXCJdKTtcbiAgICB2YXIgU2lkZUNhciA9IHNpZGVDYXI7XG4gICAgdmFyIGNvbnRhaW5lclJlZiA9IHVzZU1lcmdlUmVmcyhbcmVmLCBwYXJlbnRSZWZdKTtcbiAgICB2YXIgY29udGFpbmVyUHJvcHMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzdCksIGNhbGxiYWNrcyk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICBlbmFibGVkICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVDYXIsIHsgc2lkZUNhcjogZWZmZWN0Q2FyLCByZW1vdmVTY3JvbGxCYXI6IHJlbW92ZVNjcm9sbEJhciwgc2hhcmRzOiBzaGFyZHMsIG5vUmVsYXRpdmU6IG5vUmVsYXRpdmUsIG5vSXNvbGF0aW9uOiBub0lzb2xhdGlvbiwgaW5lcnQ6IGluZXJ0LCBzZXRDYWxsYmFja3M6IHNldENhbGxiYWNrcywgYWxsb3dQaW5jaFpvb206ICEhYWxsb3dQaW5jaFpvb20sIGxvY2tSZWY6IHJlZiwgZ2FwTW9kZTogZ2FwTW9kZSB9KSksXG4gICAgICAgIGZvcndhcmRQcm9wcyA/IChSZWFjdC5jbG9uZUVsZW1lbnQoUmVhY3QuQ2hpbGRyZW4ub25seShjaGlsZHJlbiksIF9fYXNzaWduKF9fYXNzaWduKHt9LCBjb250YWluZXJQcm9wcyksIHsgcmVmOiBjb250YWluZXJSZWYgfSkpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KENvbnRhaW5lciwgX19hc3NpZ24oe30sIGNvbnRhaW5lclByb3BzLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCByZWY6IGNvbnRhaW5lclJlZiB9KSwgY2hpbGRyZW4pKSkpO1xufSk7XG5SZW1vdmVTY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgcmVtb3ZlU2Nyb2xsQmFyOiB0cnVlLFxuICAgIGluZXJ0OiBmYWxzZSxcbn07XG5SZW1vdmVTY3JvbGwuY2xhc3NOYW1lcyA9IHtcbiAgICBmdWxsV2lkdGg6IGZ1bGxXaWR0aENsYXNzTmFtZSxcbiAgICB6ZXJvUmlnaHQ6IHplcm9SaWdodENsYXNzTmFtZSxcbn07XG5leHBvcnQgeyBSZW1vdmVTY3JvbGwgfTtcbiIsInZhciBwYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0Jywgb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBwYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IHZhciBub25QYXNzaXZlID0gcGFzc2l2ZVN1cHBvcnRlZCA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IGZhbHNlO1xuIiwidmFyIGFsd2F5c0NvbnRhaW5zU2Nyb2xsID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAvLyB0ZXh0YXJlYSB3aWxsIGFsd2F5cyBfY29udGFpbl8gc2Nyb2xsIGluc2lkZSBzZWxmLiBJdCBvbmx5IGNhbiBiZSBoaWRkZW5cbiAgICByZXR1cm4gbm9kZS50YWdOYW1lID09PSAnVEVYVEFSRUEnO1xufTtcbnZhciBlbGVtZW50Q2FuQmVTY3JvbGxlZCA9IGZ1bmN0aW9uIChub2RlLCBvdmVyZmxvdykge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICByZXR1cm4gKFxuICAgIC8vIG5vdC1ub3Qtc2Nyb2xsYWJsZVxuICAgIHN0eWxlc1tvdmVyZmxvd10gIT09ICdoaWRkZW4nICYmXG4gICAgICAgIC8vIGNvbnRhaW5zIHNjcm9sbCBpbnNpZGUgc2VsZlxuICAgICAgICAhKHN0eWxlcy5vdmVyZmxvd1kgPT09IHN0eWxlcy5vdmVyZmxvd1ggJiYgIWFsd2F5c0NvbnRhaW5zU2Nyb2xsKG5vZGUpICYmIHN0eWxlc1tvdmVyZmxvd10gPT09ICd2aXNpYmxlJykpO1xufTtcbnZhciBlbGVtZW50Q291bGRCZVZTY3JvbGxlZCA9IGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBlbGVtZW50Q2FuQmVTY3JvbGxlZChub2RlLCAnb3ZlcmZsb3dZJyk7IH07XG52YXIgZWxlbWVudENvdWxkQmVIU2Nyb2xsZWQgPSBmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gZWxlbWVudENhbkJlU2Nyb2xsZWQobm9kZSwgJ292ZXJmbG93WCcpOyB9O1xuZXhwb3J0IHZhciBsb2NhdGlvbkNvdWxkQmVTY3JvbGxlZCA9IGZ1bmN0aW9uIChheGlzLCBub2RlKSB7XG4gICAgdmFyIG93bmVyRG9jdW1lbnQgPSBub2RlLm93bmVyRG9jdW1lbnQ7XG4gICAgdmFyIGN1cnJlbnQgPSBub2RlO1xuICAgIGRvIHtcbiAgICAgICAgLy8gU2tpcCBvdmVyIHNoYWRvdyByb290XG4gICAgICAgIGlmICh0eXBlb2YgU2hhZG93Um9vdCAhPT0gJ3VuZGVmaW5lZCcgJiYgY3VycmVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lmhvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlzU2Nyb2xsYWJsZSA9IGVsZW1lbnRDb3VsZEJlU2Nyb2xsZWQoYXhpcywgY3VycmVudCk7XG4gICAgICAgIGlmIChpc1Njcm9sbGFibGUpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGdldFNjcm9sbFZhcmlhYmxlcyhheGlzLCBjdXJyZW50KSwgc2Nyb2xsSGVpZ2h0ID0gX2FbMV0sIGNsaWVudEhlaWdodCA9IF9hWzJdO1xuICAgICAgICAgICAgaWYgKHNjcm9sbEhlaWdodCA+IGNsaWVudEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gICAgfSB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBvd25lckRvY3VtZW50LmJvZHkpO1xuICAgIHJldHVybiBmYWxzZTtcbn07XG52YXIgZ2V0VlNjcm9sbFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzY3JvbGxUb3AgPSBfYS5zY3JvbGxUb3AsIHNjcm9sbEhlaWdodCA9IF9hLnNjcm9sbEhlaWdodCwgY2xpZW50SGVpZ2h0ID0gX2EuY2xpZW50SGVpZ2h0O1xuICAgIHJldHVybiBbXG4gICAgICAgIHNjcm9sbFRvcCxcbiAgICAgICAgc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBjbGllbnRIZWlnaHQsXG4gICAgXTtcbn07XG52YXIgZ2V0SFNjcm9sbFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzY3JvbGxMZWZ0ID0gX2Euc2Nyb2xsTGVmdCwgc2Nyb2xsV2lkdGggPSBfYS5zY3JvbGxXaWR0aCwgY2xpZW50V2lkdGggPSBfYS5jbGllbnRXaWR0aDtcbiAgICByZXR1cm4gW1xuICAgICAgICBzY3JvbGxMZWZ0LFxuICAgICAgICBzY3JvbGxXaWR0aCxcbiAgICAgICAgY2xpZW50V2lkdGgsXG4gICAgXTtcbn07XG52YXIgZWxlbWVudENvdWxkQmVTY3JvbGxlZCA9IGZ1bmN0aW9uIChheGlzLCBub2RlKSB7XG4gICAgcmV0dXJuIGF4aXMgPT09ICd2JyA/IGVsZW1lbnRDb3VsZEJlVlNjcm9sbGVkKG5vZGUpIDogZWxlbWVudENvdWxkQmVIU2Nyb2xsZWQobm9kZSk7XG59O1xudmFyIGdldFNjcm9sbFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChheGlzLCBub2RlKSB7XG4gICAgcmV0dXJuIGF4aXMgPT09ICd2JyA/IGdldFZTY3JvbGxWYXJpYWJsZXMobm9kZSkgOiBnZXRIU2Nyb2xsVmFyaWFibGVzKG5vZGUpO1xufTtcbnZhciBnZXREaXJlY3Rpb25GYWN0b3IgPSBmdW5jdGlvbiAoYXhpcywgZGlyZWN0aW9uKSB7XG4gICAgLyoqXG4gICAgICogSWYgdGhlIGVsZW1lbnQncyBkaXJlY3Rpb24gaXMgcnRsIChyaWdodC10by1sZWZ0KSwgdGhlbiBzY3JvbGxMZWZ0IGlzIDAgd2hlbiB0aGUgc2Nyb2xsYmFyIGlzIGF0IGl0cyByaWdodG1vc3QgcG9zaXRpb24sXG4gICAgICogYW5kIHRoZW4gaW5jcmVhc2luZ2x5IG5lZ2F0aXZlIGFzIHlvdSBzY3JvbGwgdG93YXJkcyB0aGUgZW5kIG9mIHRoZSBjb250ZW50LlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvc2Nyb2xsTGVmdFxuICAgICAqL1xuICAgIHJldHVybiBheGlzID09PSAnaCcgJiYgZGlyZWN0aW9uID09PSAncnRsJyA/IC0xIDogMTtcbn07XG5leHBvcnQgdmFyIGhhbmRsZVNjcm9sbCA9IGZ1bmN0aW9uIChheGlzLCBlbmRUYXJnZXQsIGV2ZW50LCBzb3VyY2VEZWx0YSwgbm9PdmVyc2Nyb2xsKSB7XG4gICAgdmFyIGRpcmVjdGlvbkZhY3RvciA9IGdldERpcmVjdGlvbkZhY3RvcihheGlzLCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbmRUYXJnZXQpLmRpcmVjdGlvbik7XG4gICAgdmFyIGRlbHRhID0gZGlyZWN0aW9uRmFjdG9yICogc291cmNlRGVsdGE7XG4gICAgLy8gZmluZCBzY3JvbGxhYmxlIHRhcmdldFxuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgdmFyIHRhcmdldEluTG9jayA9IGVuZFRhcmdldC5jb250YWlucyh0YXJnZXQpO1xuICAgIHZhciBzaG91bGRDYW5jZWxTY3JvbGwgPSBmYWxzZTtcbiAgICB2YXIgaXNEZWx0YVBvc2l0aXZlID0gZGVsdGEgPiAwO1xuICAgIHZhciBhdmFpbGFibGVTY3JvbGwgPSAwO1xuICAgIHZhciBhdmFpbGFibGVTY3JvbGxUb3AgPSAwO1xuICAgIGRvIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IGdldFNjcm9sbFZhcmlhYmxlcyhheGlzLCB0YXJnZXQpLCBwb3NpdGlvbiA9IF9hWzBdLCBzY3JvbGxfMSA9IF9hWzFdLCBjYXBhY2l0eSA9IF9hWzJdO1xuICAgICAgICB2YXIgZWxlbWVudFNjcm9sbCA9IHNjcm9sbF8xIC0gY2FwYWNpdHkgLSBkaXJlY3Rpb25GYWN0b3IgKiBwb3NpdGlvbjtcbiAgICAgICAgaWYgKHBvc2l0aW9uIHx8IGVsZW1lbnRTY3JvbGwpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Q291bGRCZVNjcm9sbGVkKGF4aXMsIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVTY3JvbGwgKz0gZWxlbWVudFNjcm9sbDtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVTY3JvbGxUb3AgKz0gcG9zaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcmVudF8xID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIC8vIHdlIHdpbGwgXCJidWJibGVcIiBmcm9tIFNoYWRvd0RvbSBpbiBjYXNlIHdlIGFyZSwgb3IganVzdCB0byB0aGUgcGFyZW50IGluIG5vcm1hbCBjYXNlXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgbG9naWMgdXNlZCBpbiBmb2N1cy1sb2NrXG4gICAgICAgIHRhcmdldCA9IChwYXJlbnRfMSAmJiBwYXJlbnRfMS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFID8gcGFyZW50XzEuaG9zdCA6IHBhcmVudF8xKTtcbiAgICB9IHdoaWxlIChcbiAgICAvLyBwb3J0YWxlZCBjb250ZW50XG4gICAgKCF0YXJnZXRJbkxvY2sgJiYgdGFyZ2V0ICE9PSBkb2N1bWVudC5ib2R5KSB8fFxuICAgICAgICAvLyBzZWxmIGNvbnRlbnRcbiAgICAgICAgKHRhcmdldEluTG9jayAmJiAoZW5kVGFyZ2V0LmNvbnRhaW5zKHRhcmdldCkgfHwgZW5kVGFyZ2V0ID09PSB0YXJnZXQpKSk7XG4gICAgLy8gaGFuZGxlIGVwc2lsb24gYXJvdW5kIDAgKG5vbiBzdGFuZGFyZCB6b29tIGxldmVscylcbiAgICBpZiAoaXNEZWx0YVBvc2l0aXZlICYmXG4gICAgICAgICgobm9PdmVyc2Nyb2xsICYmIE1hdGguYWJzKGF2YWlsYWJsZVNjcm9sbCkgPCAxKSB8fCAoIW5vT3ZlcnNjcm9sbCAmJiBkZWx0YSA+IGF2YWlsYWJsZVNjcm9sbCkpKSB7XG4gICAgICAgIHNob3VsZENhbmNlbFNjcm9sbCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFpc0RlbHRhUG9zaXRpdmUgJiZcbiAgICAgICAgKChub092ZXJzY3JvbGwgJiYgTWF0aC5hYnMoYXZhaWxhYmxlU2Nyb2xsVG9wKSA8IDEpIHx8ICghbm9PdmVyc2Nyb2xsICYmIC1kZWx0YSA+IGF2YWlsYWJsZVNjcm9sbFRvcCkpKSB7XG4gICAgICAgIHNob3VsZENhbmNlbFNjcm9sbCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzaG91bGRDYW5jZWxTY3JvbGw7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2lkZWNhck1lZGl1bSB9IGZyb20gJ3VzZS1zaWRlY2FyJztcbmV4cG9ydCB2YXIgZWZmZWN0Q2FyID0gY3JlYXRlU2lkZWNhck1lZGl1bSgpO1xuIiwiaW1wb3J0IHsgZXhwb3J0U2lkZWNhciB9IGZyb20gJ3VzZS1zaWRlY2FyJztcbmltcG9ydCB7IFJlbW92ZVNjcm9sbFNpZGVDYXIgfSBmcm9tICcuL1NpZGVFZmZlY3QnO1xuaW1wb3J0IHsgZWZmZWN0Q2FyIH0gZnJvbSAnLi9tZWRpdW0nO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0U2lkZWNhcihlZmZlY3RDYXIsIFJlbW92ZVNjcm9sbFNpZGVDYXIpO1xuIiwiaW1wb3J0IHsgc3R5bGVIb29rU2luZ2xldG9uIH0gZnJvbSAnLi9ob29rJztcbi8qKlxuICogY3JlYXRlIGEgQ29tcG9uZW50IHRvIGFkZCBzdHlsZXMgb24gZGVtYW5kXG4gKiAtIHN0eWxlcyBhcmUgYWRkZWQgd2hlbiBmaXJzdCBpbnN0YW5jZSBpcyBtb3VudGVkXG4gKiAtIHN0eWxlcyBhcmUgcmVtb3ZlZCB3aGVuIHRoZSBsYXN0IGluc3RhbmNlIGlzIHVubW91bnRlZFxuICogLSBjaGFuZ2luZyBzdHlsZXMgaW4gcnVudGltZSBkb2VzIG5vdGhpbmcgdW5sZXNzIGR5bmFtaWMgaXMgc2V0LiBCdXQgd2l0aCBtdWx0aXBsZSBjb21wb25lbnRzIHRoYXQgY2FuIGxlYWQgdG8gdGhlIHVuZGVmaW5lZCBiZWhhdmlvclxuICovXG5leHBvcnQgdmFyIHN0eWxlU2luZ2xldG9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB1c2VTdHlsZSA9IHN0eWxlSG9va1NpbmdsZXRvbigpO1xuICAgIHZhciBTaGVldCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgc3R5bGVzID0gX2Euc3R5bGVzLCBkeW5hbWljID0gX2EuZHluYW1pYztcbiAgICAgICAgdXNlU3R5bGUoc3R5bGVzLCBkeW5hbWljKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICByZXR1cm4gU2hlZXQ7XG59O1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc3R5bGVzaGVldFNpbmdsZXRvbiB9IGZyb20gJy4vc2luZ2xldG9uJztcbi8qKlxuICogY3JlYXRlcyBhIGhvb2sgdG8gY29udHJvbCBzdHlsZSBzaW5nbGV0b25cbiAqIEBzZWUge0BsaW5rIHN0eWxlU2luZ2xldG9ufSBmb3IgYSBzYWZlciBjb21wb25lbnQgdmVyc2lvblxuICogQGV4YW1wbGVcbiAqIGBgYHRzeFxuICogY29uc3QgdXNlU3R5bGUgPSBzdHlsZUhvb2tTaW5nbGV0b24oKTtcbiAqIC8vL1xuICogdXNlU3R5bGUoJ2JvZHkgeyBvdmVyZmxvdzogaGlkZGVufScpO1xuICovXG5leHBvcnQgdmFyIHN0eWxlSG9va1NpbmdsZXRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2hlZXQgPSBzdHlsZXNoZWV0U2luZ2xldG9uKCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdHlsZXMsIGlzRHluYW1pYykge1xuICAgICAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2hlZXQuYWRkKHN0eWxlcyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNoZWV0LnJlbW92ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwgW3N0eWxlcyAmJiBpc0R5bmFtaWNdKTtcbiAgICB9O1xufTtcbiIsImV4cG9ydCB7IHN0eWxlU2luZ2xldG9uIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuZXhwb3J0IHsgc3R5bGVzaGVldFNpbmdsZXRvbiB9IGZyb20gJy4vc2luZ2xldG9uJztcbmV4cG9ydCB7IHN0eWxlSG9va1NpbmdsZXRvbiB9IGZyb20gJy4vaG9vayc7XG4iLCJpbXBvcnQgeyBnZXROb25jZSB9IGZyb20gJ2dldC1ub25jZSc7XG5mdW5jdGlvbiBtYWtlU3R5bGVUYWcoKSB7XG4gICAgaWYgKCFkb2N1bWVudClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgdmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGFnLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHZhciBub25jZSA9IGdldE5vbmNlKCk7XG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgIH1cbiAgICByZXR1cm4gdGFnO1xufVxuZnVuY3Rpb24gaW5qZWN0U3R5bGVzKHRhZywgY3NzKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICh0YWcuc3R5bGVTaGVldCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRhZy5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0YWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVUYWcodGFnKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgaGVhZC5hcHBlbmRDaGlsZCh0YWcpO1xufVxuZXhwb3J0IHZhciBzdHlsZXNoZWV0U2luZ2xldG9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICB2YXIgc3R5bGVzaGVldCA9IG51bGw7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkOiBmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgICAgICAgIGlmIChjb3VudGVyID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoKHN0eWxlc2hlZXQgPSBtYWtlU3R5bGVUYWcoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0U3R5bGVzKHN0eWxlc2hlZXQsIHN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0U3R5bGVUYWcoc3R5bGVzaGVldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvdW50ZXItLTtcbiAgICAgICAgICAgIGlmICghY291bnRlciAmJiBzdHlsZXNoZWV0KSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldC5wYXJlbnROb2RlICYmIHN0eWxlc2hlZXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZXNoZWV0KTtcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufTtcbiIsIi8qKlxuICogQXNzaWducyBhIHZhbHVlIGZvciBhIGdpdmVuIHJlZiwgbm8gbWF0dGVyIG9mIHRoZSByZWYgZm9ybWF0XG4gKiBAcGFyYW0ge1JlZk9iamVjdH0gcmVmIC0gYSBjYWxsYmFjayBmdW5jdGlvbiBvciByZWYgb2JqZWN0XG4gKiBAcGFyYW0gdmFsdWUgLSBhIG5ldyB2YWx1ZVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI2Fzc2lnbnJlZlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHJlZk9iamVjdCA9IHVzZVJlZigpO1xuICogY29uc3QgcmVmRm4gPSAocmVmKSA9PiB7Li4uLn1cbiAqXG4gKiBhc3NpZ25SZWYocmVmT2JqZWN0LCBcInJlZlZhbHVlXCIpO1xuICogYXNzaWduUmVmKHJlZkZuLCBcInJlZlZhbHVlXCIpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduUmVmKHJlZiwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZWYodmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZWYpIHtcbiAgICAgICAgcmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZjtcbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFzc2lnblJlZiB9IGZyb20gJy4vYXNzaWduUmVmJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSAnLi91c2VSZWYnO1xudmFyIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IFJlYWN0LnVzZUxheW91dEVmZmVjdCA6IFJlYWN0LnVzZUVmZmVjdDtcbnZhciBjdXJyZW50VmFsdWVzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogTWVyZ2VzIHR3byBvciBtb3JlIHJlZnMgdG9nZXRoZXIgcHJvdmlkaW5nIGEgc2luZ2xlIGludGVyZmFjZSB0byBzZXQgdGhlaXIgdmFsdWVcbiAqIEBwYXJhbSB7UmVmT2JqZWN0fFJlZn0gcmVmc1xuICogQHJldHVybnMge011dGFibGVSZWZPYmplY3R9IC0gYSBuZXcgcmVmLCB3aGljaCB0cmFuc2xhdGVzIGFsbCBjaGFuZ2VzIHRvIHtyZWZzfVxuICpcbiAqIEBzZWUge0BsaW5rIG1lcmdlUmVmc30gYSB2ZXJzaW9uIHdpdGhvdXQgYnVpdC1pbiBtZW1vaXphdGlvblxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjdXNlbWVyZ2VyZWZzXG4gKiBAZXhhbXBsZVxuICogY29uc3QgQ29tcG9uZW50ID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuICogICBjb25zdCBvd25SZWYgPSB1c2VSZWYoKTtcbiAqICAgY29uc3QgZG9tUmVmID0gdXNlTWVyZ2VSZWZzKFtyZWYsIG93blJlZl0pOyAvLyDwn5GIIG1lcmdlIHRvZ2V0aGVyXG4gKiAgIHJldHVybiA8ZGl2IHJlZj17ZG9tUmVmfT4uLi48L2Rpdj5cbiAqIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZU1lcmdlUmVmcyhyZWZzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICB2YXIgY2FsbGJhY2tSZWYgPSB1c2VDYWxsYmFja1JlZihkZWZhdWx0VmFsdWUgfHwgbnVsbCwgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIHJldHVybiByZWZzLmZvckVhY2goZnVuY3Rpb24gKHJlZikgeyByZXR1cm4gYXNzaWduUmVmKHJlZiwgbmV3VmFsdWUpOyB9KTtcbiAgICB9KTtcbiAgICAvLyBoYW5kbGUgcmVmcyBjaGFuZ2VzIC0gYWRkZWQgb3IgcmVtb3ZlZFxuICAgIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSBjdXJyZW50VmFsdWVzLmdldChjYWxsYmFja1JlZik7XG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIHByZXZSZWZzXzEgPSBuZXcgU2V0KG9sZFZhbHVlKTtcbiAgICAgICAgICAgIHZhciBuZXh0UmVmc18xID0gbmV3IFNldChyZWZzKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50XzEgPSBjYWxsYmFja1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgcHJldlJlZnNfMS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5leHRSZWZzXzEuaGFzKHJlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduUmVmKHJlZiwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuZXh0UmVmc18xLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgIGlmICghcHJldlJlZnNfMS5oYXMocmVmKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25SZWYocmVmLCBjdXJyZW50XzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRWYWx1ZXMuc2V0KGNhbGxiYWNrUmVmLCByZWZzKTtcbiAgICB9LCBbcmVmc10pO1xuICAgIHJldHVybiBjYWxsYmFja1JlZjtcbn1cbiIsImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBjcmVhdGVzIGEgTXV0YWJsZVJlZiB3aXRoIHJlZiBjaGFuZ2UgY2FsbGJhY2tcbiAqIEBwYXJhbSBpbml0aWFsVmFsdWUgLSBpbml0aWFsIHJlZiB2YWx1ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBhIGNhbGxiYWNrIHRvIHJ1biB3aGVuIHZhbHVlIGNoYW5nZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVmID0gdXNlQ2FsbGJhY2tSZWYoMCwgKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgPT4gY29uc29sZS5sb2cob2xkVmFsdWUsICctPicsIG5ld1ZhbHVlKTtcbiAqIHJlZi5jdXJyZW50ID0gMTtcbiAqIC8vIHByaW50cyAwIC0+IDFcbiAqXG4gKiBAc2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9ob29rcy1yZWZlcmVuY2UuaHRtbCN1c2VyZWZcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI3VzZWNhbGxiYWNrcmVmLS0tdG8tcmVwbGFjZS1yZWFjdHVzZXJlZlxuICogQHJldHVybnMge011dGFibGVSZWZPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWxsYmFja1JlZihpbml0aWFsVmFsdWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlZiA9IHVzZVN0YXRlKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7XG4gICAgICAgIC8vIHZhbHVlXG4gICAgICAgIHZhbHVlOiBpbml0aWFsVmFsdWUsXG4gICAgICAgIC8vIGxhc3QgY2FsbGJhY2tcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAvLyBcIm1lbW9pemVkXCIgcHVibGljIGludGVyZmFjZVxuICAgICAgICBmYWNhZGU6IHtcbiAgICAgICAgICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWYudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGN1cnJlbnQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdCA9IHJlZi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJlZi5jYWxsYmFjayh2YWx1ZSwgbGFzdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KTsgfSlbMF07XG4gICAgLy8gdXBkYXRlIGNhbGxiYWNrXG4gICAgcmVmLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgcmV0dXJuIHJlZi5mYWNhZGU7XG59XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19yZXN0IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG52YXIgU2lkZUNhciA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzaWRlQ2FyID0gX2Euc2lkZUNhciwgcmVzdCA9IF9fcmVzdChfYSwgW1wic2lkZUNhclwiXSk7XG4gICAgaWYgKCFzaWRlQ2FyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2lkZWNhcjogcGxlYXNlIHByb3ZpZGUgYHNpZGVDYXJgIHByb3BlcnR5IHRvIGltcG9ydCB0aGUgcmlnaHQgY2FyJyk7XG4gICAgfVxuICAgIHZhciBUYXJnZXQgPSBzaWRlQ2FyLnJlYWQoKTtcbiAgICBpZiAoIVRhcmdldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZGVjYXIgbWVkaXVtIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUYXJnZXQsIF9fYXNzaWduKHt9LCByZXN0KSk7XG59O1xuU2lkZUNhci5pc1NpZGVDYXJFeHBvcnQgPSB0cnVlO1xuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydFNpZGVjYXIobWVkaXVtLCBleHBvcnRlZCkge1xuICAgIG1lZGl1bS51c2VNZWRpdW0oZXhwb3J0ZWQpO1xuICAgIHJldHVybiBTaWRlQ2FyO1xufVxuIiwiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbmZ1bmN0aW9uIEl0b0koYSkge1xuICAgIHJldHVybiBhO1xufVxuZnVuY3Rpb24gaW5uZXJDcmVhdGVNZWRpdW0oZGVmYXVsdHMsIG1pZGRsZXdhcmUpIHtcbiAgICBpZiAobWlkZGxld2FyZSA9PT0gdm9pZCAwKSB7IG1pZGRsZXdhcmUgPSBJdG9JOyB9XG4gICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgIHZhciBhc3NpZ25lZCA9IGZhbHNlO1xuICAgIHZhciBtZWRpdW0gPSB7XG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhc3NpZ25lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2lkZWNhcjogY291bGQgbm90IGByZWFkYCBmcm9tIGFuIGBhc3NpZ25lZGAgbWVkaXVtLiBgcmVhZGAgY291bGQgYmUgdXNlZCBvbmx5IHdpdGggYHVzZU1lZGl1bWAuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXJbYnVmZmVyLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgICAgICB9LFxuICAgICAgICB1c2VNZWRpdW06IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG1pZGRsZXdhcmUoZGF0YSwgYXNzaWduZWQpO1xuICAgICAgICAgICAgYnVmZmVyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggIT09IGl0ZW07IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgYXNzaWduU3luY01lZGl1bTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICBhc3NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjYnMgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgY2JzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyID0ge1xuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uICh4KSB7IHJldHVybiBjYih4KTsgfSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJ1ZmZlcjsgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnbk1lZGl1bTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICBhc3NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcGVuZGluZ1F1ZXVlID0gW107XG4gICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjYnMgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgY2JzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZSA9IGJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBleGVjdXRlUXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNicyA9IHBlbmRpbmdRdWV1ZTtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICBjYnMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGN5Y2xlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihleGVjdXRlUXVldWUpOyB9O1xuICAgICAgICAgICAgY3ljbGUoKTtcbiAgICAgICAgICAgIGJ1ZmZlciA9IHtcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgY3ljbGUoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUgPSBwZW5kaW5nUXVldWUuZmlsdGVyKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gbWVkaXVtO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lZGl1bShkZWZhdWx0cywgbWlkZGxld2FyZSkge1xuICAgIGlmIChtaWRkbGV3YXJlID09PSB2b2lkIDApIHsgbWlkZGxld2FyZSA9IEl0b0k7IH1cbiAgICByZXR1cm4gaW5uZXJDcmVhdGVNZWRpdW0oZGVmYXVsdHMsIG1pZGRsZXdhcmUpO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaWRlY2FyTWVkaXVtKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBtZWRpdW0gPSBpbm5lckNyZWF0ZU1lZGl1bShudWxsKTtcbiAgICBtZWRpdW0ub3B0aW9ucyA9IF9fYXNzaWduKHsgYXN5bmM6IHRydWUsIHNzcjogZmFsc2UgfSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG1lZGl1bTtcbn1cbiIsIi8vIHNyYy9wcmltaXRpdmUudHN4XG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuZnVuY3Rpb24gY29tcG9zZUV2ZW50SGFuZGxlcnMob3JpZ2luYWxFdmVudEhhbmRsZXIsIG91ckV2ZW50SGFuZGxlciwgeyBjaGVja0ZvckRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlIH0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICBvcmlnaW5hbEV2ZW50SGFuZGxlcj8uKGV2ZW50KTtcbiAgICBpZiAoY2hlY2tGb3JEZWZhdWx0UHJldmVudGVkID09PSBmYWxzZSB8fCAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuIG91ckV2ZW50SGFuZGxlcj8uKGV2ZW50KTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBnZXRPd25lcldpbmRvdyhlbGVtZW50KSB7XG4gIGlmICghY2FuVXNlRE9NKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFjY2VzcyB3aW5kb3cgb3V0c2lkZSBvZiB0aGUgRE9NXCIpO1xuICB9XG4gIHJldHVybiBlbGVtZW50Py5vd25lckRvY3VtZW50Py5kZWZhdWx0VmlldyA/PyB3aW5kb3c7XG59XG5mdW5jdGlvbiBnZXRPd25lckRvY3VtZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFjYW5Vc2VET00pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWNjZXNzIGRvY3VtZW50IG91dHNpZGUgb2YgdGhlIERPTVwiKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudD8ub3duZXJEb2N1bWVudCA/PyBkb2N1bWVudDtcbn1cbmZ1bmN0aW9uIGdldEFjdGl2ZUVsZW1lbnQobm9kZSwgYWN0aXZlRGVzY2VuZGFudCA9IGZhbHNlKSB7XG4gIGNvbnN0IHsgYWN0aXZlRWxlbWVudCB9ID0gZ2V0T3duZXJEb2N1bWVudChub2RlKTtcbiAgaWYgKCFhY3RpdmVFbGVtZW50Py5ub2RlTmFtZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChpc0ZyYW1lKGFjdGl2ZUVsZW1lbnQpICYmIGFjdGl2ZUVsZW1lbnQuY29udGVudERvY3VtZW50KSB7XG4gICAgcmV0dXJuIGdldEFjdGl2ZUVsZW1lbnQoYWN0aXZlRWxlbWVudC5jb250ZW50RG9jdW1lbnQuYm9keSwgYWN0aXZlRGVzY2VuZGFudCk7XG4gIH1cbiAgaWYgKGFjdGl2ZURlc2NlbmRhbnQpIHtcbiAgICBjb25zdCBpZCA9IGFjdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIpO1xuICAgIGlmIChpZCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGdldE93bmVyRG9jdW1lbnQoYWN0aXZlRWxlbWVudCkuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBhY3RpdmVFbGVtZW50O1xufVxuZnVuY3Rpb24gaXNGcmFtZShlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50LnRhZ05hbWUgPT09IFwiSUZSQU1FXCI7XG59XG5leHBvcnQge1xuICBjYW5Vc2VET00sXG4gIGNvbXBvc2VFdmVudEhhbmRsZXJzLFxuICBnZXRBY3RpdmVFbGVtZW50LFxuICBnZXRPd25lckRvY3VtZW50LFxuICBnZXRPd25lcldpbmRvdyxcbiAgaXNGcmFtZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L2NvbnRleHQvc3JjL2NyZWF0ZS1jb250ZXh0LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQyKHJvb3RDb21wb25lbnROYW1lLCBkZWZhdWx0Q29udGV4dCkge1xuICBjb25zdCBDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dChkZWZhdWx0Q29udGV4dCk7XG4gIGNvbnN0IFByb3ZpZGVyID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uY29udGV4dCB9ID0gcHJvcHM7XG4gICAgY29uc3QgdmFsdWUgPSBSZWFjdC51c2VNZW1vKCgpID0+IGNvbnRleHQsIE9iamVjdC52YWx1ZXMoY29udGV4dCkpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KENvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWUsIGNoaWxkcmVuIH0pO1xuICB9O1xuICBQcm92aWRlci5kaXNwbGF5TmFtZSA9IHJvb3RDb21wb25lbnROYW1lICsgXCJQcm92aWRlclwiO1xuICBmdW5jdGlvbiB1c2VDb250ZXh0Mihjb25zdW1lck5hbWUpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChDb250ZXh0KTtcbiAgICBpZiAoY29udGV4dCkgcmV0dXJuIGNvbnRleHQ7XG4gICAgaWYgKGRlZmF1bHRDb250ZXh0ICE9PSB2b2lkIDApIHJldHVybiBkZWZhdWx0Q29udGV4dDtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFxcYCR7Y29uc3VtZXJOYW1lfVxcYCBtdXN0IGJlIHVzZWQgd2l0aGluIFxcYCR7cm9vdENvbXBvbmVudE5hbWV9XFxgYCk7XG4gIH1cbiAgcmV0dXJuIFtQcm92aWRlciwgdXNlQ29udGV4dDJdO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29udGV4dFNjb3BlKHNjb3BlTmFtZSwgY3JlYXRlQ29udGV4dFNjb3BlRGVwcyA9IFtdKSB7XG4gIGxldCBkZWZhdWx0Q29udGV4dHMgPSBbXTtcbiAgZnVuY3Rpb24gY3JlYXRlQ29udGV4dDMocm9vdENvbXBvbmVudE5hbWUsIGRlZmF1bHRDb250ZXh0KSB7XG4gICAgY29uc3QgQmFzZUNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KGRlZmF1bHRDb250ZXh0KTtcbiAgICBjb25zdCBpbmRleCA9IGRlZmF1bHRDb250ZXh0cy5sZW5ndGg7XG4gICAgZGVmYXVsdENvbnRleHRzID0gWy4uLmRlZmF1bHRDb250ZXh0cywgZGVmYXVsdENvbnRleHRdO1xuICAgIGNvbnN0IFByb3ZpZGVyID0gKHByb3BzKSA9PiB7XG4gICAgICBjb25zdCB7IHNjb3BlLCBjaGlsZHJlbiwgLi4uY29udGV4dCB9ID0gcHJvcHM7XG4gICAgICBjb25zdCBDb250ZXh0ID0gc2NvcGU/LltzY29wZU5hbWVdPy5baW5kZXhdIHx8IEJhc2VDb250ZXh0O1xuICAgICAgY29uc3QgdmFsdWUgPSBSZWFjdC51c2VNZW1vKCgpID0+IGNvbnRleHQsIE9iamVjdC52YWx1ZXMoY29udGV4dCkpO1xuICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZSwgY2hpbGRyZW4gfSk7XG4gICAgfTtcbiAgICBQcm92aWRlci5kaXNwbGF5TmFtZSA9IHJvb3RDb21wb25lbnROYW1lICsgXCJQcm92aWRlclwiO1xuICAgIGZ1bmN0aW9uIHVzZUNvbnRleHQyKGNvbnN1bWVyTmFtZSwgc2NvcGUpIHtcbiAgICAgIGNvbnN0IENvbnRleHQgPSBzY29wZT8uW3Njb3BlTmFtZV0/LltpbmRleF0gfHwgQmFzZUNvbnRleHQ7XG4gICAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChDb250ZXh0KTtcbiAgICAgIGlmIChjb250ZXh0KSByZXR1cm4gY29udGV4dDtcbiAgICAgIGlmIChkZWZhdWx0Q29udGV4dCAhPT0gdm9pZCAwKSByZXR1cm4gZGVmYXVsdENvbnRleHQ7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxcYCR7Y29uc3VtZXJOYW1lfVxcYCBtdXN0IGJlIHVzZWQgd2l0aGluIFxcYCR7cm9vdENvbXBvbmVudE5hbWV9XFxgYCk7XG4gICAgfVxuICAgIHJldHVybiBbUHJvdmlkZXIsIHVzZUNvbnRleHQyXTtcbiAgfVxuICBjb25zdCBjcmVhdGVTY29wZSA9ICgpID0+IHtcbiAgICBjb25zdCBzY29wZUNvbnRleHRzID0gZGVmYXVsdENvbnRleHRzLm1hcCgoZGVmYXVsdENvbnRleHQpID0+IHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVDb250ZXh0KGRlZmF1bHRDb250ZXh0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdXNlU2NvcGUoc2NvcGUpIHtcbiAgICAgIGNvbnN0IGNvbnRleHRzID0gc2NvcGU/LltzY29wZU5hbWVdIHx8IHNjb3BlQ29udGV4dHM7XG4gICAgICByZXR1cm4gUmVhY3QudXNlTWVtbyhcbiAgICAgICAgKCkgPT4gKHsgW2BfX3Njb3BlJHtzY29wZU5hbWV9YF06IHsgLi4uc2NvcGUsIFtzY29wZU5hbWVdOiBjb250ZXh0cyB9IH0pLFxuICAgICAgICBbc2NvcGUsIGNvbnRleHRzXVxuICAgICAgKTtcbiAgICB9O1xuICB9O1xuICBjcmVhdGVTY29wZS5zY29wZU5hbWUgPSBzY29wZU5hbWU7XG4gIHJldHVybiBbY3JlYXRlQ29udGV4dDMsIGNvbXBvc2VDb250ZXh0U2NvcGVzKGNyZWF0ZVNjb3BlLCAuLi5jcmVhdGVDb250ZXh0U2NvcGVEZXBzKV07XG59XG5mdW5jdGlvbiBjb21wb3NlQ29udGV4dFNjb3BlcyguLi5zY29wZXMpIHtcbiAgY29uc3QgYmFzZVNjb3BlID0gc2NvcGVzWzBdO1xuICBpZiAoc2NvcGVzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIGJhc2VTY29wZTtcbiAgY29uc3QgY3JlYXRlU2NvcGUgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2NvcGVIb29rcyA9IHNjb3Blcy5tYXAoKGNyZWF0ZVNjb3BlMikgPT4gKHtcbiAgICAgIHVzZVNjb3BlOiBjcmVhdGVTY29wZTIoKSxcbiAgICAgIHNjb3BlTmFtZTogY3JlYXRlU2NvcGUyLnNjb3BlTmFtZVxuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdXNlQ29tcG9zZWRTY29wZXMob3ZlcnJpZGVTY29wZXMpIHtcbiAgICAgIGNvbnN0IG5leHRTY29wZXMgPSBzY29wZUhvb2tzLnJlZHVjZSgobmV4dFNjb3BlczIsIHsgdXNlU2NvcGUsIHNjb3BlTmFtZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3BlUHJvcHMgPSB1c2VTY29wZShvdmVycmlkZVNjb3Blcyk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTY29wZSA9IHNjb3BlUHJvcHNbYF9fc2NvcGUke3Njb3BlTmFtZX1gXTtcbiAgICAgICAgcmV0dXJuIHsgLi4ubmV4dFNjb3BlczIsIC4uLmN1cnJlbnRTY29wZSB9O1xuICAgICAgfSwge30pO1xuICAgICAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oKCkgPT4gKHsgW2BfX3Njb3BlJHtiYXNlU2NvcGUuc2NvcGVOYW1lfWBdOiBuZXh0U2NvcGVzIH0pLCBbbmV4dFNjb3Blc10pO1xuICAgIH07XG4gIH07XG4gIGNyZWF0ZVNjb3BlLnNjb3BlTmFtZSA9IGJhc2VTY29wZS5zY29wZU5hbWU7XG4gIHJldHVybiBjcmVhdGVTY29wZTtcbn1cbmV4cG9ydCB7XG4gIGNyZWF0ZUNvbnRleHQyIGFzIGNyZWF0ZUNvbnRleHQsXG4gIGNyZWF0ZUNvbnRleHRTY29wZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZGlhbG9nLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlRXZlbnRIYW5kbGVycyB9IGZyb20gXCJAcmFkaXgtdWkvcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VDb21wb3NlZFJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgY3JlYXRlQ29udGV4dFNjb3BlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb250ZXh0XCI7XG5pbXBvcnQgeyB1c2VJZCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtaWRcIjtcbmltcG9ydCB7IHVzZUNvbnRyb2xsYWJsZVN0YXRlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY29udHJvbGxhYmxlLXN0YXRlXCI7XG5pbXBvcnQgeyBEaXNtaXNzYWJsZUxheWVyIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1kaXNtaXNzYWJsZS1sYXllclwiO1xuaW1wb3J0IHsgRm9jdXNTY29wZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtZm9jdXMtc2NvcGVcIjtcbmltcG9ydCB7IFBvcnRhbCBhcyBQb3J0YWxQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXBvcnRhbFwiO1xuaW1wb3J0IHsgUHJlc2VuY2UgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByZXNlbmNlXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlRm9jdXNHdWFyZHMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWZvY3VzLWd1YXJkc1wiO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsIH0gZnJvbSBcInJlYWN0LXJlbW92ZS1zY3JvbGxcIjtcbmltcG9ydCB7IGhpZGVPdGhlcnMgfSBmcm9tIFwiYXJpYS1oaWRkZW5cIjtcbmltcG9ydCB7IGNyZWF0ZVNsb3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXNsb3RcIjtcbmltcG9ydCB7IEZyYWdtZW50LCBqc3gsIGpzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBESUFMT0dfTkFNRSA9IFwiRGlhbG9nXCI7XG52YXIgW2NyZWF0ZURpYWxvZ0NvbnRleHQsIGNyZWF0ZURpYWxvZ1Njb3BlXSA9IGNyZWF0ZUNvbnRleHRTY29wZShESUFMT0dfTkFNRSk7XG52YXIgW0RpYWxvZ1Byb3ZpZGVyLCB1c2VEaWFsb2dDb250ZXh0XSA9IGNyZWF0ZURpYWxvZ0NvbnRleHQoRElBTE9HX05BTUUpO1xudmFyIERpYWxvZyA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7XG4gICAgX19zY29wZURpYWxvZyxcbiAgICBjaGlsZHJlbixcbiAgICBvcGVuOiBvcGVuUHJvcCxcbiAgICBkZWZhdWx0T3BlbixcbiAgICBvbk9wZW5DaGFuZ2UsXG4gICAgbW9kYWwgPSB0cnVlXG4gIH0gPSBwcm9wcztcbiAgY29uc3QgdHJpZ2dlclJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgY29udGVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlQ29udHJvbGxhYmxlU3RhdGUoe1xuICAgIHByb3A6IG9wZW5Qcm9wLFxuICAgIGRlZmF1bHRQcm9wOiBkZWZhdWx0T3BlbiA/PyBmYWxzZSxcbiAgICBvbkNoYW5nZTogb25PcGVuQ2hhbmdlLFxuICAgIGNhbGxlcjogRElBTE9HX05BTUVcbiAgfSk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgIERpYWxvZ1Byb3ZpZGVyLFxuICAgIHtcbiAgICAgIHNjb3BlOiBfX3Njb3BlRGlhbG9nLFxuICAgICAgdHJpZ2dlclJlZixcbiAgICAgIGNvbnRlbnRSZWYsXG4gICAgICBjb250ZW50SWQ6IHVzZUlkKCksXG4gICAgICB0aXRsZUlkOiB1c2VJZCgpLFxuICAgICAgZGVzY3JpcHRpb25JZDogdXNlSWQoKSxcbiAgICAgIG9wZW4sXG4gICAgICBvbk9wZW5DaGFuZ2U6IHNldE9wZW4sXG4gICAgICBvbk9wZW5Ub2dnbGU6IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHNldE9wZW4oKHByZXZPcGVuKSA9PiAhcHJldk9wZW4pLCBbc2V0T3Blbl0pLFxuICAgICAgbW9kYWwsXG4gICAgICBjaGlsZHJlblxuICAgIH1cbiAgKTtcbn07XG5EaWFsb2cuZGlzcGxheU5hbWUgPSBESUFMT0dfTkFNRTtcbnZhciBUUklHR0VSX05BTUUgPSBcIkRpYWxvZ1RyaWdnZXJcIjtcbnZhciBEaWFsb2dUcmlnZ2VyID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLnRyaWdnZXJQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoVFJJR0dFUl9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBjb21wb3NlZFRyaWdnZXJSZWYgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCBjb250ZXh0LnRyaWdnZXJSZWYpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgUHJpbWl0aXZlLmJ1dHRvbixcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgXCJhcmlhLWhhc3BvcHVwXCI6IFwiZGlhbG9nXCIsXG4gICAgICAgIFwiYXJpYS1leHBhbmRlZFwiOiBjb250ZXh0Lm9wZW4sXG4gICAgICAgIFwiYXJpYS1jb250cm9sc1wiOiBjb250ZXh0LmNvbnRlbnRJZCxcbiAgICAgICAgXCJkYXRhLXN0YXRlXCI6IGdldFN0YXRlKGNvbnRleHQub3BlbiksXG4gICAgICAgIC4uLnRyaWdnZXJQcm9wcyxcbiAgICAgICAgcmVmOiBjb21wb3NlZFRyaWdnZXJSZWYsXG4gICAgICAgIG9uQ2xpY2s6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQ2xpY2ssIGNvbnRleHQub25PcGVuVG9nZ2xlKVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG5EaWFsb2dUcmlnZ2VyLmRpc3BsYXlOYW1lID0gVFJJR0dFUl9OQU1FO1xudmFyIFBPUlRBTF9OQU1FID0gXCJEaWFsb2dQb3J0YWxcIjtcbnZhciBbUG9ydGFsUHJvdmlkZXIsIHVzZVBvcnRhbENvbnRleHRdID0gY3JlYXRlRGlhbG9nQ29udGV4dChQT1JUQUxfTkFNRSwge1xuICBmb3JjZU1vdW50OiB2b2lkIDBcbn0pO1xudmFyIERpYWxvZ1BvcnRhbCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIGZvcmNlTW91bnQsIGNoaWxkcmVuLCBjb250YWluZXIgfSA9IHByb3BzO1xuICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChQT1JUQUxfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFBvcnRhbFByb3ZpZGVyLCB7IHNjb3BlOiBfX3Njb3BlRGlhbG9nLCBmb3JjZU1vdW50LCBjaGlsZHJlbjogUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQpID0+IC8qIEBfX1BVUkVfXyAqLyBqc3goUHJlc2VuY2UsIHsgcHJlc2VudDogZm9yY2VNb3VudCB8fCBjb250ZXh0Lm9wZW4sIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4KFBvcnRhbFByaW1pdGl2ZSwgeyBhc0NoaWxkOiB0cnVlLCBjb250YWluZXIsIGNoaWxkcmVuOiBjaGlsZCB9KSB9KSkgfSk7XG59O1xuRGlhbG9nUG9ydGFsLmRpc3BsYXlOYW1lID0gUE9SVEFMX05BTUU7XG52YXIgT1ZFUkxBWV9OQU1FID0gXCJEaWFsb2dPdmVybGF5XCI7XG52YXIgRGlhbG9nT3ZlcmxheSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgcG9ydGFsQ29udGV4dCA9IHVzZVBvcnRhbENvbnRleHQoT1ZFUkxBWV9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCB7IGZvcmNlTW91bnQgPSBwb3J0YWxDb250ZXh0LmZvcmNlTW91bnQsIC4uLm92ZXJsYXlQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoT1ZFUkxBWV9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gY29udGV4dC5tb2RhbCA/IC8qIEBfX1BVUkVfXyAqLyBqc3goUHJlc2VuY2UsIHsgcHJlc2VudDogZm9yY2VNb3VudCB8fCBjb250ZXh0Lm9wZW4sIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4KERpYWxvZ092ZXJsYXlJbXBsLCB7IC4uLm92ZXJsYXlQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSkgfSkgOiBudWxsO1xuICB9XG4pO1xuRGlhbG9nT3ZlcmxheS5kaXNwbGF5TmFtZSA9IE9WRVJMQVlfTkFNRTtcbnZhciBTbG90ID0gY3JlYXRlU2xvdChcIkRpYWxvZ092ZXJsYXkuUmVtb3ZlU2Nyb2xsXCIpO1xudmFyIERpYWxvZ092ZXJsYXlJbXBsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLm92ZXJsYXlQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoT1ZFUkxBWV9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gTWFrZSBzdXJlIGBDb250ZW50YCBpcyBzY3JvbGxhYmxlIGV2ZW4gd2hlbiBpdCBkb2Vzbid0IGxpdmUgaW5zaWRlIGBSZW1vdmVTY3JvbGxgXG4gICAgICAvLyBpZS4gd2hlbiBgT3ZlcmxheWAgYW5kIGBDb250ZW50YCBhcmUgc2libGluZ3NcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goUmVtb3ZlU2Nyb2xsLCB7IGFzOiBTbG90LCBhbGxvd1BpbmNoWm9vbTogdHJ1ZSwgc2hhcmRzOiBbY29udGV4dC5jb250ZW50UmVmXSwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICAgIFByaW1pdGl2ZS5kaXYsXG4gICAgICAgIHtcbiAgICAgICAgICBcImRhdGEtc3RhdGVcIjogZ2V0U3RhdGUoY29udGV4dC5vcGVuKSxcbiAgICAgICAgICAuLi5vdmVybGF5UHJvcHMsXG4gICAgICAgICAgcmVmOiBmb3J3YXJkZWRSZWYsXG4gICAgICAgICAgc3R5bGU6IHsgcG9pbnRlckV2ZW50czogXCJhdXRvXCIsIC4uLm92ZXJsYXlQcm9wcy5zdHlsZSB9XG4gICAgICAgIH1cbiAgICAgICkgfSlcbiAgICApO1xuICB9XG4pO1xudmFyIENPTlRFTlRfTkFNRSA9IFwiRGlhbG9nQ29udGVudFwiO1xudmFyIERpYWxvZ0NvbnRlbnQgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHBvcnRhbENvbnRleHQgPSB1c2VQb3J0YWxDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgeyBmb3JjZU1vdW50ID0gcG9ydGFsQ29udGV4dC5mb3JjZU1vdW50LCAuLi5jb250ZW50UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJlc2VuY2UsIHsgcHJlc2VudDogZm9yY2VNb3VudCB8fCBjb250ZXh0Lm9wZW4sIGNoaWxkcmVuOiBjb250ZXh0Lm1vZGFsID8gLyogQF9fUFVSRV9fICovIGpzeChEaWFsb2dDb250ZW50TW9kYWwsIHsgLi4uY29udGVudFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSA6IC8qIEBfX1BVUkVfXyAqLyBqc3goRGlhbG9nQ29udGVudE5vbk1vZGFsLCB7IC4uLmNvbnRlbnRQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSkgfSk7XG4gIH1cbik7XG5EaWFsb2dDb250ZW50LmRpc3BsYXlOYW1lID0gQ09OVEVOVF9OQU1FO1xudmFyIERpYWxvZ0NvbnRlbnRNb2RhbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBjb250ZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIGNvbnRleHQuY29udGVudFJlZiwgY29udGVudFJlZik7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb250ZW50UmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoY29udGVudCkgcmV0dXJuIGhpZGVPdGhlcnMoY29udGVudCk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgRGlhbG9nQ29udGVudEltcGwsXG4gICAgICB7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICByZWY6IGNvbXBvc2VkUmVmcyxcbiAgICAgICAgdHJhcEZvY3VzOiBjb250ZXh0Lm9wZW4sXG4gICAgICAgIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50czogdHJ1ZSxcbiAgICAgICAgb25DbG9zZUF1dG9Gb2N1czogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25DbG9zZUF1dG9Gb2N1cywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjb250ZXh0LnRyaWdnZXJSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9uUG9pbnRlckRvd25PdXRzaWRlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vblBvaW50ZXJEb3duT3V0c2lkZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50O1xuICAgICAgICAgIGNvbnN0IGN0cmxMZWZ0Q2xpY2sgPSBvcmlnaW5hbEV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBvcmlnaW5hbEV2ZW50LmN0cmxLZXkgPT09IHRydWU7XG4gICAgICAgICAgY29uc3QgaXNSaWdodENsaWNrID0gb3JpZ2luYWxFdmVudC5idXR0b24gPT09IDIgfHwgY3RybExlZnRDbGljaztcbiAgICAgICAgICBpZiAoaXNSaWdodENsaWNrKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KSxcbiAgICAgICAgb25Gb2N1c091dHNpZGU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKFxuICAgICAgICAgIHByb3BzLm9uRm9jdXNPdXRzaWRlLFxuICAgICAgICAgIChldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICApXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbnZhciBEaWFsb2dDb250ZW50Tm9uTW9kYWwgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgaGFzSW50ZXJhY3RlZE91dHNpZGVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICAgIGNvbnN0IGhhc1BvaW50ZXJEb3duT3V0c2lkZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBEaWFsb2dDb250ZW50SW1wbCxcbiAgICAgIHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIHJlZjogZm9yd2FyZGVkUmVmLFxuICAgICAgICB0cmFwRm9jdXM6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHM6IGZhbHNlLFxuICAgICAgICBvbkNsb3NlQXV0b0ZvY3VzOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICBwcm9wcy5vbkNsb3NlQXV0b0ZvY3VzPy4oZXZlbnQpO1xuICAgICAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgaWYgKCFoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZi5jdXJyZW50KSBjb250ZXh0LnRyaWdnZXJSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBvbkludGVyYWN0T3V0c2lkZTogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgcHJvcHMub25JbnRlcmFjdE91dHNpZGU/LihldmVudCk7XG4gICAgICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICBoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudC50eXBlID09PSBcInBvaW50ZXJkb3duXCIpIHtcbiAgICAgICAgICAgICAgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0SXNUcmlnZ2VyID0gY29udGV4dC50cmlnZ2VyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgICAgICAgaWYgKHRhcmdldElzVHJpZ2dlcikgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAoZXZlbnQuZGV0YWlsLm9yaWdpbmFsRXZlbnQudHlwZSA9PT0gXCJmb2N1c2luXCIgJiYgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbnZhciBEaWFsb2dDb250ZW50SW1wbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCB0cmFwRm9jdXMsIG9uT3BlbkF1dG9Gb2N1cywgb25DbG9zZUF1dG9Gb2N1cywgLi4uY29udGVudFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDT05URU5UX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgY29udGVudFJlZik7XG4gICAgdXNlRm9jdXNHdWFyZHMoKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeHMoRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICAgIEZvY3VzU2NvcGUsXG4gICAgICAgIHtcbiAgICAgICAgICBhc0NoaWxkOiB0cnVlLFxuICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgdHJhcHBlZDogdHJhcEZvY3VzLFxuICAgICAgICAgIG9uTW91bnRBdXRvRm9jdXM6IG9uT3BlbkF1dG9Gb2N1cyxcbiAgICAgICAgICBvblVubW91bnRBdXRvRm9jdXM6IG9uQ2xvc2VBdXRvRm9jdXMsXG4gICAgICAgICAgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICAgICAgICBEaXNtaXNzYWJsZUxheWVyLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByb2xlOiBcImRpYWxvZ1wiLFxuICAgICAgICAgICAgICBpZDogY29udGV4dC5jb250ZW50SWQsXG4gICAgICAgICAgICAgIFwiYXJpYS1kZXNjcmliZWRieVwiOiBjb250ZXh0LmRlc2NyaXB0aW9uSWQsXG4gICAgICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IGNvbnRleHQudGl0bGVJZCxcbiAgICAgICAgICAgICAgXCJkYXRhLXN0YXRlXCI6IGdldFN0YXRlKGNvbnRleHQub3BlbiksXG4gICAgICAgICAgICAgIC4uLmNvbnRlbnRQcm9wcyxcbiAgICAgICAgICAgICAgcmVmOiBjb21wb3NlZFJlZnMsXG4gICAgICAgICAgICAgIG9uRGlzbWlzczogKCkgPT4gY29udGV4dC5vbk9wZW5DaGFuZ2UoZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyogQF9fUFVSRV9fICovIGpzeHMoRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtcbiAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeChUaXRsZVdhcm5pbmcsIHsgdGl0bGVJZDogY29udGV4dC50aXRsZUlkIH0pLFxuICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4KERlc2NyaXB0aW9uV2FybmluZywgeyBjb250ZW50UmVmLCBkZXNjcmlwdGlvbklkOiBjb250ZXh0LmRlc2NyaXB0aW9uSWQgfSlcbiAgICAgIF0gfSlcbiAgICBdIH0pO1xuICB9XG4pO1xudmFyIFRJVExFX05BTUUgPSBcIkRpYWxvZ1RpdGxlXCI7XG52YXIgRGlhbG9nVGl0bGUgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4udGl0bGVQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoVElUTEVfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmgyLCB7IGlkOiBjb250ZXh0LnRpdGxlSWQsIC4uLnRpdGxlUHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pO1xuICB9XG4pO1xuRGlhbG9nVGl0bGUuZGlzcGxheU5hbWUgPSBUSVRMRV9OQU1FO1xudmFyIERFU0NSSVBUSU9OX05BTUUgPSBcIkRpYWxvZ0Rlc2NyaXB0aW9uXCI7XG52YXIgRGlhbG9nRGVzY3JpcHRpb24gPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4uZGVzY3JpcHRpb25Qcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoREVTQ1JJUFRJT05fTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLnAsIHsgaWQ6IGNvbnRleHQuZGVzY3JpcHRpb25JZCwgLi4uZGVzY3JpcHRpb25Qcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSk7XG4gIH1cbik7XG5EaWFsb2dEZXNjcmlwdGlvbi5kaXNwbGF5TmFtZSA9IERFU0NSSVBUSU9OX05BTUU7XG52YXIgQ0xPU0VfTkFNRSA9IFwiRGlhbG9nQ2xvc2VcIjtcbnZhciBEaWFsb2dDbG9zZSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi5jbG9zZVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDTE9TRV9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIFByaW1pdGl2ZS5idXR0b24sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgIC4uLmNsb3NlUHJvcHMsXG4gICAgICAgIHJlZjogZm9yd2FyZGVkUmVmLFxuICAgICAgICBvbkNsaWNrOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkNsaWNrLCAoKSA9PiBjb250ZXh0Lm9uT3BlbkNoYW5nZShmYWxzZSkpXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbkRpYWxvZ0Nsb3NlLmRpc3BsYXlOYW1lID0gQ0xPU0VfTkFNRTtcbmZ1bmN0aW9uIGdldFN0YXRlKG9wZW4pIHtcbiAgcmV0dXJuIG9wZW4gPyBcIm9wZW5cIiA6IFwiY2xvc2VkXCI7XG59XG52YXIgVElUTEVfV0FSTklOR19OQU1FID0gXCJEaWFsb2dUaXRsZVdhcm5pbmdcIjtcbnZhciBbV2FybmluZ1Byb3ZpZGVyLCB1c2VXYXJuaW5nQ29udGV4dF0gPSBjcmVhdGVDb250ZXh0KFRJVExFX1dBUk5JTkdfTkFNRSwge1xuICBjb250ZW50TmFtZTogQ09OVEVOVF9OQU1FLFxuICB0aXRsZU5hbWU6IFRJVExFX05BTUUsXG4gIGRvY3NTbHVnOiBcImRpYWxvZ1wiXG59KTtcbnZhciBUaXRsZVdhcm5pbmcgPSAoeyB0aXRsZUlkIH0pID0+IHtcbiAgY29uc3QgdGl0bGVXYXJuaW5nQ29udGV4dCA9IHVzZVdhcm5pbmdDb250ZXh0KFRJVExFX1dBUk5JTkdfTkFNRSk7XG4gIGNvbnN0IE1FU1NBR0UgPSBgXFxgJHt0aXRsZVdhcm5pbmdDb250ZXh0LmNvbnRlbnROYW1lfVxcYCByZXF1aXJlcyBhIFxcYCR7dGl0bGVXYXJuaW5nQ29udGV4dC50aXRsZU5hbWV9XFxgIGZvciB0aGUgY29tcG9uZW50IHRvIGJlIGFjY2Vzc2libGUgZm9yIHNjcmVlbiByZWFkZXIgdXNlcnMuXG5cbklmIHlvdSB3YW50IHRvIGhpZGUgdGhlIFxcYCR7dGl0bGVXYXJuaW5nQ29udGV4dC50aXRsZU5hbWV9XFxgLCB5b3UgY2FuIHdyYXAgaXQgd2l0aCBvdXIgVmlzdWFsbHlIaWRkZW4gY29tcG9uZW50LlxuXG5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIGh0dHBzOi8vcmFkaXgtdWkuY29tL3ByaW1pdGl2ZXMvZG9jcy9jb21wb25lbnRzLyR7dGl0bGVXYXJuaW5nQ29udGV4dC5kb2NzU2x1Z31gO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0aXRsZUlkKSB7XG4gICAgICBjb25zdCBoYXNUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRpdGxlSWQpO1xuICAgICAgaWYgKCFoYXNUaXRsZSkgY29uc29sZS5lcnJvcihNRVNTQUdFKTtcbiAgICB9XG4gIH0sIFtNRVNTQUdFLCB0aXRsZUlkXSk7XG4gIHJldHVybiBudWxsO1xufTtcbnZhciBERVNDUklQVElPTl9XQVJOSU5HX05BTUUgPSBcIkRpYWxvZ0Rlc2NyaXB0aW9uV2FybmluZ1wiO1xudmFyIERlc2NyaXB0aW9uV2FybmluZyA9ICh7IGNvbnRlbnRSZWYsIGRlc2NyaXB0aW9uSWQgfSkgPT4ge1xuICBjb25zdCBkZXNjcmlwdGlvbldhcm5pbmdDb250ZXh0ID0gdXNlV2FybmluZ0NvbnRleHQoREVTQ1JJUFRJT05fV0FSTklOR19OQU1FKTtcbiAgY29uc3QgTUVTU0FHRSA9IGBXYXJuaW5nOiBNaXNzaW5nIFxcYERlc2NyaXB0aW9uXFxgIG9yIFxcYGFyaWEtZGVzY3JpYmVkYnk9e3VuZGVmaW5lZH1cXGAgZm9yIHske2Rlc2NyaXB0aW9uV2FybmluZ0NvbnRleHQuY29udGVudE5hbWV9fS5gO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGRlc2NyaWJlZEJ5SWQgPSBjb250ZW50UmVmLmN1cnJlbnQ/LmdldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIik7XG4gICAgaWYgKGRlc2NyaXB0aW9uSWQgJiYgZGVzY3JpYmVkQnlJZCkge1xuICAgICAgY29uc3QgaGFzRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZXNjcmlwdGlvbklkKTtcbiAgICAgIGlmICghaGFzRGVzY3JpcHRpb24pIGNvbnNvbGUud2FybihNRVNTQUdFKTtcbiAgICB9XG4gIH0sIFtNRVNTQUdFLCBjb250ZW50UmVmLCBkZXNjcmlwdGlvbklkXSk7XG4gIHJldHVybiBudWxsO1xufTtcbnZhciBSb290ID0gRGlhbG9nO1xudmFyIFRyaWdnZXIgPSBEaWFsb2dUcmlnZ2VyO1xudmFyIFBvcnRhbCA9IERpYWxvZ1BvcnRhbDtcbnZhciBPdmVybGF5ID0gRGlhbG9nT3ZlcmxheTtcbnZhciBDb250ZW50ID0gRGlhbG9nQ29udGVudDtcbnZhciBUaXRsZSA9IERpYWxvZ1RpdGxlO1xudmFyIERlc2NyaXB0aW9uID0gRGlhbG9nRGVzY3JpcHRpb247XG52YXIgQ2xvc2UgPSBEaWFsb2dDbG9zZTtcbmV4cG9ydCB7XG4gIENsb3NlLFxuICBDb250ZW50LFxuICBEZXNjcmlwdGlvbixcbiAgRGlhbG9nLFxuICBEaWFsb2dDbG9zZSxcbiAgRGlhbG9nQ29udGVudCxcbiAgRGlhbG9nRGVzY3JpcHRpb24sXG4gIERpYWxvZ092ZXJsYXksXG4gIERpYWxvZ1BvcnRhbCxcbiAgRGlhbG9nVGl0bGUsXG4gIERpYWxvZ1RyaWdnZXIsXG4gIE92ZXJsYXksXG4gIFBvcnRhbCxcbiAgUm9vdCxcbiAgVGl0bGUsXG4gIFRyaWdnZXIsXG4gIFdhcm5pbmdQcm92aWRlcixcbiAgY3JlYXRlRGlhbG9nU2NvcGVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvc2xvdC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZVJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgRnJhZ21lbnQgYXMgRnJhZ21lbnQyLCBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90KG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSk7XG4gIGNvbnN0IFNsb3QyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2hpbGRyZW5BcnJheSA9IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pO1xuICAgIGNvbnN0IHNsb3R0YWJsZSA9IGNoaWxkcmVuQXJyYXkuZmluZChpc1Nsb3R0YWJsZSk7XG4gICAgaWYgKHNsb3R0YWJsZSkge1xuICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHNsb3R0YWJsZS5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gY2hpbGRyZW5BcnJheS5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZCA9PT0gc2xvdHRhYmxlKSB7XG4gICAgICAgICAgaWYgKFJlYWN0LkNoaWxkcmVuLmNvdW50KG5ld0VsZW1lbnQpID4gMSkgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KG5ld0VsZW1lbnQpID8gbmV3RWxlbWVudC5wcm9wcy5jaGlsZHJlbiA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbjogUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBSZWFjdC5jbG9uZUVsZW1lbnQobmV3RWxlbWVudCwgdm9pZCAwLCBuZXdDaGlsZHJlbikgOiBudWxsIH0pO1xuICAgIH1cbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChTbG90Q2xvbmUsIHsgLi4uc2xvdFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiwgY2hpbGRyZW4gfSk7XG4gIH0pO1xuICBTbG90Mi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdGA7XG4gIHJldHVybiBTbG90Mjtcbn1cbnZhciBTbG90ID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3QoXCJTbG90XCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3RDbG9uZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdENsb25lID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgICAgY29uc3QgY2hpbGRyZW5SZWYgPSBnZXRFbGVtZW50UmVmKGNoaWxkcmVuKTtcbiAgICAgIGNvbnN0IHByb3BzMiA9IG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZHJlbi5wcm9wcyk7XG4gICAgICBpZiAoY2hpbGRyZW4udHlwZSAhPT0gUmVhY3QuRnJhZ21lbnQpIHtcbiAgICAgICAgcHJvcHMyLnJlZiA9IGZvcndhcmRlZFJlZiA/IGNvbXBvc2VSZWZzKGZvcndhcmRlZFJlZiwgY2hpbGRyZW5SZWYpIDogY2hpbGRyZW5SZWY7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkcmVuLCBwcm9wczIpO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMSA/IFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCkgOiBudWxsO1xuICB9KTtcbiAgU2xvdENsb25lLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90Q2xvbmVgO1xuICByZXR1cm4gU2xvdENsb25lO1xufVxudmFyIFNMT1RUQUJMRV9JREVOVElGSUVSID0gU3ltYm9sKFwicmFkaXguc2xvdHRhYmxlXCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3R0YWJsZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdHRhYmxlMiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChGcmFnbWVudDIsIHsgY2hpbGRyZW4gfSk7XG4gIH07XG4gIFNsb3R0YWJsZTIuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3R0YWJsZWA7XG4gIFNsb3R0YWJsZTIuX19yYWRpeElkID0gU0xPVFRBQkxFX0lERU5USUZJRVI7XG4gIHJldHVybiBTbG90dGFibGUyO1xufVxudmFyIFNsb3R0YWJsZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90dGFibGUoXCJTbG90dGFibGVcIik7XG5mdW5jdGlvbiBpc1Nsb3R0YWJsZShjaGlsZCkge1xuICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpICYmIHR5cGVvZiBjaGlsZC50eXBlID09PSBcImZ1bmN0aW9uXCIgJiYgXCJfX3JhZGl4SWRcIiBpbiBjaGlsZC50eXBlICYmIGNoaWxkLnR5cGUuX19yYWRpeElkID09PSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbn1cbmZ1bmN0aW9uIG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZFByb3BzKSB7XG4gIGNvbnN0IG92ZXJyaWRlUHJvcHMgPSB7IC4uLmNoaWxkUHJvcHMgfTtcbiAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGlsZFByb3BzKSB7XG4gICAgY29uc3Qgc2xvdFByb3BWYWx1ZSA9IHNsb3RQcm9wc1twcm9wTmFtZV07XG4gICAgY29uc3QgY2hpbGRQcm9wVmFsdWUgPSBjaGlsZFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBpc0hhbmRsZXIgPSAvXm9uW0EtWl0vLnRlc3QocHJvcE5hbWUpO1xuICAgIGlmIChpc0hhbmRsZXIpIHtcbiAgICAgIGlmIChzbG90UHJvcFZhbHVlICYmIGNoaWxkUHJvcFZhbHVlKSB7XG4gICAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBjaGlsZFByb3BWYWx1ZSguLi5hcmdzKTtcbiAgICAgICAgICBzbG90UHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNsb3RQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBzbG90UHJvcFZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSB7IC4uLnNsb3RQcm9wVmFsdWUsIC4uLmNoaWxkUHJvcFZhbHVlIH07XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJjbGFzc05hbWVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBbc2xvdFByb3BWYWx1ZSwgY2hpbGRQcm9wVmFsdWVdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgLi4uc2xvdFByb3BzLCAuLi5vdmVycmlkZVByb3BzIH07XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50UmVmKGVsZW1lbnQpIHtcbiAgbGV0IGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudC5wcm9wcywgXCJyZWZcIik/LmdldDtcbiAgbGV0IG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucmVmO1xuICB9XG4gIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudCwgXCJyZWZcIik/LmdldDtcbiAgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWY7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmIHx8IGVsZW1lbnQucmVmO1xufVxuZXhwb3J0IHtcbiAgU2xvdCBhcyBSb290LFxuICBTbG90LFxuICBTbG90dGFibGUsXG4gIGNyZWF0ZVNsb3QsXG4gIGNyZWF0ZVNsb3R0YWJsZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZGlzbWlzc2FibGUtbGF5ZXIudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNvbXBvc2VFdmVudEhhbmRsZXJzIH0gZnJvbSBcIkByYWRpeC11aS9wcmltaXRpdmVcIjtcbmltcG9ydCB7IFByaW1pdGl2ZSwgZGlzcGF0Y2hEaXNjcmV0ZUN1c3RvbUV2ZW50IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWNhbGxiYWNrLXJlZlwiO1xuaW1wb3J0IHsgdXNlRXNjYXBlS2V5ZG93biB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWVzY2FwZS1rZXlkb3duXCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBESVNNSVNTQUJMRV9MQVlFUl9OQU1FID0gXCJEaXNtaXNzYWJsZUxheWVyXCI7XG52YXIgQ09OVEVYVF9VUERBVEUgPSBcImRpc21pc3NhYmxlTGF5ZXIudXBkYXRlXCI7XG52YXIgUE9JTlRFUl9ET1dOX09VVFNJREUgPSBcImRpc21pc3NhYmxlTGF5ZXIucG9pbnRlckRvd25PdXRzaWRlXCI7XG52YXIgRk9DVVNfT1VUU0lERSA9IFwiZGlzbWlzc2FibGVMYXllci5mb2N1c091dHNpZGVcIjtcbnZhciBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzO1xudmFyIERpc21pc3NhYmxlTGF5ZXJDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCh7XG4gIGxheWVyczogLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKSxcbiAgbGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQ6IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCksXG4gIGJyYW5jaGVzOiAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpXG59KTtcbnZhciBEaXNtaXNzYWJsZUxheWVyID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMgPSBmYWxzZSxcbiAgICAgIG9uRXNjYXBlS2V5RG93bixcbiAgICAgIG9uUG9pbnRlckRvd25PdXRzaWRlLFxuICAgICAgb25Gb2N1c091dHNpZGUsXG4gICAgICBvbkludGVyYWN0T3V0c2lkZSxcbiAgICAgIG9uRGlzbWlzcyxcbiAgICAgIC4uLmxheWVyUHJvcHNcbiAgICB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoRGlzbWlzc2FibGVMYXllckNvbnRleHQpO1xuICAgIGNvbnN0IFtub2RlLCBzZXROb2RlXSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IG93bmVyRG9jdW1lbnQgPSBub2RlPy5vd25lckRvY3VtZW50ID8/IGdsb2JhbFRoaXM/LmRvY3VtZW50O1xuICAgIGNvbnN0IFssIGZvcmNlXSA9IFJlYWN0LnVzZVN0YXRlKHt9KTtcbiAgICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCAobm9kZTIpID0+IHNldE5vZGUobm9kZTIpKTtcbiAgICBjb25zdCBsYXllcnMgPSBBcnJheS5mcm9tKGNvbnRleHQubGF5ZXJzKTtcbiAgICBjb25zdCBbaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRdID0gWy4uLmNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRdLnNsaWNlKC0xKTtcbiAgICBjb25zdCBoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZEluZGV4ID0gbGF5ZXJzLmluZGV4T2YoaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQpO1xuICAgIGNvbnN0IGluZGV4ID0gbm9kZSA/IGxheWVycy5pbmRleE9mKG5vZGUpIDogLTE7XG4gICAgY29uc3QgaXNCb2R5UG9pbnRlckV2ZW50c0Rpc2FibGVkID0gY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5zaXplID4gMDtcbiAgICBjb25zdCBpc1BvaW50ZXJFdmVudHNFbmFibGVkID0gaW5kZXggPj0gaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRJbmRleDtcbiAgICBjb25zdCBwb2ludGVyRG93bk91dHNpZGUgPSB1c2VQb2ludGVyRG93bk91dHNpZGUoKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICBjb25zdCBpc1BvaW50ZXJEb3duT25CcmFuY2ggPSBbLi4uY29udGV4dC5icmFuY2hlc10uc29tZSgoYnJhbmNoKSA9PiBicmFuY2guY29udGFpbnModGFyZ2V0KSk7XG4gICAgICBpZiAoIWlzUG9pbnRlckV2ZW50c0VuYWJsZWQgfHwgaXNQb2ludGVyRG93bk9uQnJhbmNoKSByZXR1cm47XG4gICAgICBvblBvaW50ZXJEb3duT3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgIG9uSW50ZXJhY3RPdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSBvbkRpc21pc3M/LigpO1xuICAgIH0sIG93bmVyRG9jdW1lbnQpO1xuICAgIGNvbnN0IGZvY3VzT3V0c2lkZSA9IHVzZUZvY3VzT3V0c2lkZSgoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGNvbnN0IGlzRm9jdXNJbkJyYW5jaCA9IFsuLi5jb250ZXh0LmJyYW5jaGVzXS5zb21lKChicmFuY2gpID0+IGJyYW5jaC5jb250YWlucyh0YXJnZXQpKTtcbiAgICAgIGlmIChpc0ZvY3VzSW5CcmFuY2gpIHJldHVybjtcbiAgICAgIG9uRm9jdXNPdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgb25JbnRlcmFjdE91dHNpZGU/LihldmVudCk7XG4gICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIG9uRGlzbWlzcz8uKCk7XG4gICAgfSwgb3duZXJEb2N1bWVudCk7XG4gICAgdXNlRXNjYXBlS2V5ZG93bigoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGlzSGlnaGVzdExheWVyID0gaW5kZXggPT09IGNvbnRleHQubGF5ZXJzLnNpemUgLSAxO1xuICAgICAgaWYgKCFpc0hpZ2hlc3RMYXllcikgcmV0dXJuO1xuICAgICAgb25Fc2NhcGVLZXlEb3duPy4oZXZlbnQpO1xuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkICYmIG9uRGlzbWlzcykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvbkRpc21pc3MoKTtcbiAgICAgIH1cbiAgICB9LCBvd25lckRvY3VtZW50KTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgaWYgKCFub2RlKSByZXR1cm47XG4gICAgICBpZiAoZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzKSB7XG4gICAgICAgIGlmIChjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLnNpemUgPT09IDApIHtcbiAgICAgICAgICBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzID0gb3duZXJEb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHM7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLmFkZChub2RlKTtcbiAgICAgIH1cbiAgICAgIGNvbnRleHQubGF5ZXJzLmFkZChub2RlKTtcbiAgICAgIGRpc3BhdGNoVXBkYXRlKCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzICYmIGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuc2l6ZSA9PT0gMSkge1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzID0gb3JpZ2luYWxCb2R5UG9pbnRlckV2ZW50cztcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LCBbbm9kZSwgb3duZXJEb2N1bWVudCwgZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzLCBjb250ZXh0XSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgICAgICBjb250ZXh0LmxheWVycy5kZWxldGUobm9kZSk7XG4gICAgICAgIGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuZGVsZXRlKG5vZGUpO1xuICAgICAgICBkaXNwYXRjaFVwZGF0ZSgpO1xuICAgICAgfTtcbiAgICB9LCBbbm9kZSwgY29udGV4dF0pO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCBoYW5kbGVVcGRhdGUgPSAoKSA9PiBmb3JjZSh7fSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKENPTlRFWFRfVVBEQVRFLCBoYW5kbGVVcGRhdGUpO1xuICAgICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoQ09OVEVYVF9VUERBVEUsIGhhbmRsZVVwZGF0ZSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgUHJpbWl0aXZlLmRpdixcbiAgICAgIHtcbiAgICAgICAgLi4ubGF5ZXJQcm9wcyxcbiAgICAgICAgcmVmOiBjb21wb3NlZFJlZnMsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgcG9pbnRlckV2ZW50czogaXNCb2R5UG9pbnRlckV2ZW50c0Rpc2FibGVkID8gaXNQb2ludGVyRXZlbnRzRW5hYmxlZCA/IFwiYXV0b1wiIDogXCJub25lXCIgOiB2b2lkIDAsXG4gICAgICAgICAgLi4ucHJvcHMuc3R5bGVcbiAgICAgICAgfSxcbiAgICAgICAgb25Gb2N1c0NhcHR1cmU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uRm9jdXNDYXB0dXJlLCBmb2N1c091dHNpZGUub25Gb2N1c0NhcHR1cmUpLFxuICAgICAgICBvbkJsdXJDYXB0dXJlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkJsdXJDYXB0dXJlLCBmb2N1c091dHNpZGUub25CbHVyQ2FwdHVyZSksXG4gICAgICAgIG9uUG9pbnRlckRvd25DYXB0dXJlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhcbiAgICAgICAgICBwcm9wcy5vblBvaW50ZXJEb3duQ2FwdHVyZSxcbiAgICAgICAgICBwb2ludGVyRG93bk91dHNpZGUub25Qb2ludGVyRG93bkNhcHR1cmVcbiAgICAgICAgKVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG5EaXNtaXNzYWJsZUxheWVyLmRpc3BsYXlOYW1lID0gRElTTUlTU0FCTEVfTEFZRVJfTkFNRTtcbnZhciBCUkFOQ0hfTkFNRSA9IFwiRGlzbWlzc2FibGVMYXllckJyYW5jaFwiO1xudmFyIERpc21pc3NhYmxlTGF5ZXJCcmFuY2ggPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KERpc21pc3NhYmxlTGF5ZXJDb250ZXh0KTtcbiAgY29uc3QgcmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCByZWYpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSByZWYuY3VycmVudDtcbiAgICBpZiAobm9kZSkge1xuICAgICAgY29udGV4dC5icmFuY2hlcy5hZGQobm9kZSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb250ZXh0LmJyYW5jaGVzLmRlbGV0ZShub2RlKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbY29udGV4dC5icmFuY2hlc10pO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuZGl2LCB7IC4uLnByb3BzLCByZWY6IGNvbXBvc2VkUmVmcyB9KTtcbn0pO1xuRGlzbWlzc2FibGVMYXllckJyYW5jaC5kaXNwbGF5TmFtZSA9IEJSQU5DSF9OQU1FO1xuZnVuY3Rpb24gdXNlUG9pbnRlckRvd25PdXRzaWRlKG9uUG9pbnRlckRvd25PdXRzaWRlLCBvd25lckRvY3VtZW50ID0gZ2xvYmFsVGhpcz8uZG9jdW1lbnQpIHtcbiAgY29uc3QgaGFuZGxlUG9pbnRlckRvd25PdXRzaWRlID0gdXNlQ2FsbGJhY2tSZWYob25Qb2ludGVyRG93bk91dHNpZGUpO1xuICBjb25zdCBpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBjb25zdCBoYW5kbGVDbGlja1JlZiA9IFJlYWN0LnVzZVJlZigoKSA9PiB7XG4gIH0pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmICFpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCkge1xuICAgICAgICBsZXQgaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBoYW5kbGVBbmREaXNwYXRjaEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgUE9JTlRFUl9ET1dOX09VVFNJREUsXG4gICAgICAgICAgICBoYW5kbGVQb2ludGVyRG93bk91dHNpZGUsXG4gICAgICAgICAgICBldmVudERldGFpbCxcbiAgICAgICAgICAgIHsgZGlzY3JldGU6IHRydWUgfVxuICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50ID0gaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDI7XG4gICAgICAgIGNvbnN0IGV2ZW50RGV0YWlsID0geyBvcmlnaW5hbEV2ZW50OiBldmVudCB9O1xuICAgICAgICBpZiAoZXZlbnQucG9pbnRlclR5cGUgPT09IFwidG91Y2hcIikge1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQpO1xuICAgICAgICAgIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQgPSBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MjtcbiAgICAgICAgICBvd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja1JlZi5jdXJyZW50LCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCk7XG4gICAgICB9XG4gICAgICBpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgIH07XG4gICAgY29uc3QgdGltZXJJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQpO1xuICAgIH07XG4gIH0sIFtvd25lckRvY3VtZW50LCBoYW5kbGVQb2ludGVyRG93bk91dHNpZGVdKTtcbiAgcmV0dXJuIHtcbiAgICAvLyBlbnN1cmVzIHdlIGNoZWNrIFJlYWN0IGNvbXBvbmVudCB0cmVlIChub3QganVzdCBET00gdHJlZSlcbiAgICBvblBvaW50ZXJEb3duQ2FwdHVyZTogKCkgPT4gaXNQb2ludGVySW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQgPSB0cnVlXG4gIH07XG59XG5mdW5jdGlvbiB1c2VGb2N1c091dHNpZGUob25Gb2N1c091dHNpZGUsIG93bmVyRG9jdW1lbnQgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCkge1xuICBjb25zdCBoYW5kbGVGb2N1c091dHNpZGUgPSB1c2VDYWxsYmFja1JlZihvbkZvY3VzT3V0c2lkZSk7XG4gIGNvbnN0IGlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmICFpc0ZvY3VzSW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnREZXRhaWwgPSB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH07XG4gICAgICAgIGhhbmRsZUFuZERpc3BhdGNoQ3VzdG9tRXZlbnQoRk9DVVNfT1VUU0lERSwgaGFuZGxlRm9jdXNPdXRzaWRlLCBldmVudERldGFpbCwge1xuICAgICAgICAgIGRpc2NyZXRlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXMpO1xuICAgIHJldHVybiAoKSA9PiBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzKTtcbiAgfSwgW293bmVyRG9jdW1lbnQsIGhhbmRsZUZvY3VzT3V0c2lkZV0pO1xuICByZXR1cm4ge1xuICAgIG9uRm9jdXNDYXB0dXJlOiAoKSA9PiBpc0ZvY3VzSW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQgPSB0cnVlLFxuICAgIG9uQmx1ckNhcHR1cmU6ICgpID0+IGlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IGZhbHNlXG4gIH07XG59XG5mdW5jdGlvbiBkaXNwYXRjaFVwZGF0ZSgpIHtcbiAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoQ09OVEVYVF9VUERBVEUpO1xuICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cbmZ1bmN0aW9uIGhhbmRsZUFuZERpc3BhdGNoQ3VzdG9tRXZlbnQobmFtZSwgaGFuZGxlciwgZGV0YWlsLCB7IGRpc2NyZXRlIH0pIHtcbiAgY29uc3QgdGFyZ2V0ID0gZGV0YWlsLm9yaWdpbmFsRXZlbnQudGFyZ2V0O1xuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiB0cnVlLCBkZXRhaWwgfSk7XG4gIGlmIChoYW5kbGVyKSB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gIGlmIChkaXNjcmV0ZSkge1xuICAgIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudCh0YXJnZXQsIGV2ZW50KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cbn1cbnZhciBSb290ID0gRGlzbWlzc2FibGVMYXllcjtcbnZhciBCcmFuY2ggPSBEaXNtaXNzYWJsZUxheWVyQnJhbmNoO1xuZXhwb3J0IHtcbiAgQnJhbmNoLFxuICBEaXNtaXNzYWJsZUxheWVyLFxuICBEaXNtaXNzYWJsZUxheWVyQnJhbmNoLFxuICBSb290XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9mb2N1cy1ndWFyZHMudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbnZhciBjb3VudCA9IDA7XG5mdW5jdGlvbiBGb2N1c0d1YXJkcyhwcm9wcykge1xuICB1c2VGb2N1c0d1YXJkcygpO1xuICByZXR1cm4gcHJvcHMuY2hpbGRyZW47XG59XG5mdW5jdGlvbiB1c2VGb2N1c0d1YXJkcygpIHtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlZGdlR3VhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXJhZGl4LWZvY3VzLWd1YXJkXVwiKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgZWRnZUd1YXJkc1swXSA/PyBjcmVhdGVGb2N1c0d1YXJkKCkpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVkZ2VHdWFyZHNbMV0gPz8gY3JlYXRlRm9jdXNHdWFyZCgpKTtcbiAgICBjb3VudCsrO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoY291bnQgPT09IDEpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXJhZGl4LWZvY3VzLWd1YXJkXVwiKS5mb3JFYWNoKChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcbiAgICAgIH1cbiAgICAgIGNvdW50LS07XG4gICAgfTtcbiAgfSwgW10pO1xufVxuZnVuY3Rpb24gY3JlYXRlRm9jdXNHdWFyZCgpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtcmFkaXgtZm9jdXMtZ3VhcmRcIiwgXCJcIik7XG4gIGVsZW1lbnQudGFiSW5kZXggPSAwO1xuICBlbGVtZW50LnN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIjtcbiAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydCB7XG4gIEZvY3VzR3VhcmRzLFxuICBGb2N1c0d1YXJkcyBhcyBSb290LFxuICB1c2VGb2N1c0d1YXJkc1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZm9jdXMtc2NvcGUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWZcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIEFVVE9GT0NVU19PTl9NT1VOVCA9IFwiZm9jdXNTY29wZS5hdXRvRm9jdXNPbk1vdW50XCI7XG52YXIgQVVUT0ZPQ1VTX09OX1VOTU9VTlQgPSBcImZvY3VzU2NvcGUuYXV0b0ZvY3VzT25Vbm1vdW50XCI7XG52YXIgRVZFTlRfT1BUSU9OUyA9IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IHRydWUgfTtcbnZhciBGT0NVU19TQ09QRV9OQU1FID0gXCJGb2N1c1Njb3BlXCI7XG52YXIgRm9jdXNTY29wZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgY29uc3Qge1xuICAgIGxvb3AgPSBmYWxzZSxcbiAgICB0cmFwcGVkID0gZmFsc2UsXG4gICAgb25Nb3VudEF1dG9Gb2N1czogb25Nb3VudEF1dG9Gb2N1c1Byb3AsXG4gICAgb25Vbm1vdW50QXV0b0ZvY3VzOiBvblVubW91bnRBdXRvRm9jdXNQcm9wLFxuICAgIC4uLnNjb3BlUHJvcHNcbiAgfSA9IHByb3BzO1xuICBjb25zdCBbY29udGFpbmVyLCBzZXRDb250YWluZXJdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IG9uTW91bnRBdXRvRm9jdXMgPSB1c2VDYWxsYmFja1JlZihvbk1vdW50QXV0b0ZvY3VzUHJvcCk7XG4gIGNvbnN0IG9uVW5tb3VudEF1dG9Gb2N1cyA9IHVzZUNhbGxiYWNrUmVmKG9uVW5tb3VudEF1dG9Gb2N1c1Byb3ApO1xuICBjb25zdCBsYXN0Rm9jdXNlZEVsZW1lbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIChub2RlKSA9PiBzZXRDb250YWluZXIobm9kZSkpO1xuICBjb25zdCBmb2N1c1Njb3BlID0gUmVhY3QudXNlUmVmKHtcbiAgICBwYXVzZWQ6IGZhbHNlLFxuICAgIHBhdXNlKCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgcmVzdW1lKCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB9XG4gIH0pLmN1cnJlbnQ7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRyYXBwZWQpIHtcbiAgICAgIGxldCBoYW5kbGVGb2N1c0luMiA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChmb2N1c1Njb3BlLnBhdXNlZCB8fCAhY29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgbGFzdEZvY3VzZWRFbGVtZW50UmVmLmN1cnJlbnQgPSB0YXJnZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9jdXMobGFzdEZvY3VzZWRFbGVtZW50UmVmLmN1cnJlbnQsIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9LCBoYW5kbGVGb2N1c091dDIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZm9jdXNTY29wZS5wYXVzZWQgfHwgIWNvbnRhaW5lcikgcmV0dXJuO1xuICAgICAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0gZXZlbnQucmVsYXRlZFRhcmdldDtcbiAgICAgICAgaWYgKHJlbGF0ZWRUYXJnZXQgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKCFjb250YWluZXIuY29udGFpbnMocmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICBmb2N1cyhsYXN0Rm9jdXNlZEVsZW1lbnRSZWYuY3VycmVudCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGhhbmRsZU11dGF0aW9uczIgPSBmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgIT09IGRvY3VtZW50LmJvZHkpIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgICBpZiAobXV0YXRpb24ucmVtb3ZlZE5vZGVzLmxlbmd0aCA+IDApIGZvY3VzKGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgaGFuZGxlRm9jdXNJbiA9IGhhbmRsZUZvY3VzSW4yLCBoYW5kbGVGb2N1c091dCA9IGhhbmRsZUZvY3VzT3V0MiwgaGFuZGxlTXV0YXRpb25zID0gaGFuZGxlTXV0YXRpb25zMjtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzSW4yKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBoYW5kbGVGb2N1c091dDIpO1xuICAgICAgY29uc3QgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGhhbmRsZU11dGF0aW9uczIpO1xuICAgICAgaWYgKGNvbnRhaW5lcikgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGNvbnRhaW5lciwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBoYW5kbGVGb2N1c0luMik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBoYW5kbGVGb2N1c091dDIpO1xuICAgICAgICBtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbdHJhcHBlZCwgY29udGFpbmVyLCBmb2N1c1Njb3BlLnBhdXNlZF0pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgIGZvY3VzU2NvcGVzU3RhY2suYWRkKGZvY3VzU2NvcGUpO1xuICAgICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGhhc0ZvY3VzZWRDYW5kaWRhdGUgPSBjb250YWluZXIuY29udGFpbnMocHJldmlvdXNseUZvY3VzZWRFbGVtZW50KTtcbiAgICAgIGlmICghaGFzRm9jdXNlZENhbmRpZGF0ZSkge1xuICAgICAgICBjb25zdCBtb3VudEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KEFVVE9GT0NVU19PTl9NT1VOVCwgRVZFTlRfT1BUSU9OUyk7XG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKEFVVE9GT0NVU19PTl9NT1VOVCwgb25Nb3VudEF1dG9Gb2N1cyk7XG4gICAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG1vdW50RXZlbnQpO1xuICAgICAgICBpZiAoIW1vdW50RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgIGZvY3VzRmlyc3QocmVtb3ZlTGlua3MoZ2V0VGFiYmFibGVDYW5kaWRhdGVzKGNvbnRhaW5lcikpLCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gcHJldmlvdXNseUZvY3VzZWRFbGVtZW50KSB7XG4gICAgICAgICAgICBmb2N1cyhjb250YWluZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX01PVU5ULCBvbk1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdW5tb3VudEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KEFVVE9GT0NVU19PTl9VTk1PVU5ULCBFVkVOVF9PUFRJT05TKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fVU5NT1VOVCwgb25Vbm1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgICBjb250YWluZXIuZGlzcGF0Y2hFdmVudCh1bm1vdW50RXZlbnQpO1xuICAgICAgICAgIGlmICghdW5tb3VudEV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIGZvY3VzKHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA/PyBkb2N1bWVudC5ib2R5LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX1VOTU9VTlQsIG9uVW5tb3VudEF1dG9Gb2N1cyk7XG4gICAgICAgICAgZm9jdXNTY29wZXNTdGFjay5yZW1vdmUoZm9jdXNTY29wZSk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFtjb250YWluZXIsIG9uTW91bnRBdXRvRm9jdXMsIG9uVW5tb3VudEF1dG9Gb2N1cywgZm9jdXNTY29wZV0pO1xuICBjb25zdCBoYW5kbGVLZXlEb3duID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWxvb3AgJiYgIXRyYXBwZWQpIHJldHVybjtcbiAgICAgIGlmIChmb2N1c1Njb3BlLnBhdXNlZCkgcmV0dXJuO1xuICAgICAgY29uc3QgaXNUYWJLZXkgPSBldmVudC5rZXkgPT09IFwiVGFiXCIgJiYgIWV2ZW50LmFsdEtleSAmJiAhZXZlbnQuY3RybEtleSAmJiAhZXZlbnQubWV0YUtleTtcbiAgICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGlmIChpc1RhYktleSAmJiBmb2N1c2VkRWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIyID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgY29uc3QgW2ZpcnN0LCBsYXN0XSA9IGdldFRhYmJhYmxlRWRnZXMoY29udGFpbmVyMik7XG4gICAgICAgIGNvbnN0IGhhc1RhYmJhYmxlRWxlbWVudHNJbnNpZGUgPSBmaXJzdCAmJiBsYXN0O1xuICAgICAgICBpZiAoIWhhc1RhYmJhYmxlRWxlbWVudHNJbnNpZGUpIHtcbiAgICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGNvbnRhaW5lcjIpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkRWxlbWVudCA9PT0gbGFzdCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChsb29wKSBmb2N1cyhmaXJzdCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkRWxlbWVudCA9PT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAobG9vcCkgZm9jdXMobGFzdCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbbG9vcCwgdHJhcHBlZCwgZm9jdXNTY29wZS5wYXVzZWRdXG4gICk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5kaXYsIHsgdGFiSW5kZXg6IC0xLCAuLi5zY29wZVByb3BzLCByZWY6IGNvbXBvc2VkUmVmcywgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duIH0pO1xufSk7XG5Gb2N1c1Njb3BlLmRpc3BsYXlOYW1lID0gRk9DVVNfU0NPUEVfTkFNRTtcbmZ1bmN0aW9uIGZvY3VzRmlyc3QoY2FuZGlkYXRlcywgeyBzZWxlY3QgPSBmYWxzZSB9ID0ge30pIHtcbiAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgY2FuZGlkYXRlcykge1xuICAgIGZvY3VzKGNhbmRpZGF0ZSwgeyBzZWxlY3QgfSk7XG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCkgcmV0dXJuO1xuICB9XG59XG5mdW5jdGlvbiBnZXRUYWJiYWJsZUVkZ2VzKGNvbnRhaW5lcikge1xuICBjb25zdCBjYW5kaWRhdGVzID0gZ2V0VGFiYmFibGVDYW5kaWRhdGVzKGNvbnRhaW5lcik7XG4gIGNvbnN0IGZpcnN0ID0gZmluZFZpc2libGUoY2FuZGlkYXRlcywgY29udGFpbmVyKTtcbiAgY29uc3QgbGFzdCA9IGZpbmRWaXNpYmxlKGNhbmRpZGF0ZXMucmV2ZXJzZSgpLCBjb250YWluZXIpO1xuICByZXR1cm4gW2ZpcnN0LCBsYXN0XTtcbn1cbmZ1bmN0aW9uIGdldFRhYmJhYmxlQ2FuZGlkYXRlcyhjb250YWluZXIpIHtcbiAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihjb250YWluZXIsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCB7XG4gICAgYWNjZXB0Tm9kZTogKG5vZGUpID0+IHtcbiAgICAgIGNvbnN0IGlzSGlkZGVuSW5wdXQgPSBub2RlLnRhZ05hbWUgPT09IFwiSU5QVVRcIiAmJiBub2RlLnR5cGUgPT09IFwiaGlkZGVuXCI7XG4gICAgICBpZiAobm9kZS5kaXNhYmxlZCB8fCBub2RlLmhpZGRlbiB8fCBpc0hpZGRlbklucHV0KSByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfU0tJUDtcbiAgICAgIHJldHVybiBub2RlLnRhYkluZGV4ID49IDAgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9TS0lQO1xuICAgIH1cbiAgfSk7XG4gIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkgbm9kZXMucHVzaCh3YWxrZXIuY3VycmVudE5vZGUpO1xuICByZXR1cm4gbm9kZXM7XG59XG5mdW5jdGlvbiBmaW5kVmlzaWJsZShlbGVtZW50cywgY29udGFpbmVyKSB7XG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgIGlmICghaXNIaWRkZW4oZWxlbWVudCwgeyB1cFRvOiBjb250YWluZXIgfSkpIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5mdW5jdGlvbiBpc0hpZGRlbihub2RlLCB7IHVwVG8gfSkge1xuICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS52aXNpYmlsaXR5ID09PSBcImhpZGRlblwiKSByZXR1cm4gdHJ1ZTtcbiAgd2hpbGUgKG5vZGUpIHtcbiAgICBpZiAodXBUbyAhPT0gdm9pZCAwICYmIG5vZGUgPT09IHVwVG8pIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5kaXNwbGF5ID09PSBcIm5vbmVcIikgcmV0dXJuIHRydWU7XG4gICAgbm9kZSA9IG5vZGUucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc1NlbGVjdGFibGVJbnB1dChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBcInNlbGVjdFwiIGluIGVsZW1lbnQ7XG59XG5mdW5jdGlvbiBmb2N1cyhlbGVtZW50LCB7IHNlbGVjdCA9IGZhbHNlIH0gPSB7fSkge1xuICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmZvY3VzKSB7XG4gICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBlbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICBpZiAoZWxlbWVudCAhPT0gcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ICYmIGlzU2VsZWN0YWJsZUlucHV0KGVsZW1lbnQpICYmIHNlbGVjdClcbiAgICAgIGVsZW1lbnQuc2VsZWN0KCk7XG4gIH1cbn1cbnZhciBmb2N1c1Njb3Blc1N0YWNrID0gY3JlYXRlRm9jdXNTY29wZXNTdGFjaygpO1xuZnVuY3Rpb24gY3JlYXRlRm9jdXNTY29wZXNTdGFjaygpIHtcbiAgbGV0IHN0YWNrID0gW107XG4gIHJldHVybiB7XG4gICAgYWRkKGZvY3VzU2NvcGUpIHtcbiAgICAgIGNvbnN0IGFjdGl2ZUZvY3VzU2NvcGUgPSBzdGFja1swXTtcbiAgICAgIGlmIChmb2N1c1Njb3BlICE9PSBhY3RpdmVGb2N1c1Njb3BlKSB7XG4gICAgICAgIGFjdGl2ZUZvY3VzU2NvcGU/LnBhdXNlKCk7XG4gICAgICB9XG4gICAgICBzdGFjayA9IGFycmF5UmVtb3ZlKHN0YWNrLCBmb2N1c1Njb3BlKTtcbiAgICAgIHN0YWNrLnVuc2hpZnQoZm9jdXNTY29wZSk7XG4gICAgfSxcbiAgICByZW1vdmUoZm9jdXNTY29wZSkge1xuICAgICAgc3RhY2sgPSBhcnJheVJlbW92ZShzdGFjaywgZm9jdXNTY29wZSk7XG4gICAgICBzdGFja1swXT8ucmVzdW1lKCk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gYXJyYXlSZW1vdmUoYXJyYXksIGl0ZW0pIHtcbiAgY29uc3QgdXBkYXRlZEFycmF5ID0gWy4uLmFycmF5XTtcbiAgY29uc3QgaW5kZXggPSB1cGRhdGVkQXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHVwZGF0ZWRBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB1cGRhdGVkQXJyYXk7XG59XG5mdW5jdGlvbiByZW1vdmVMaW5rcyhpdGVtcykge1xuICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRhZ05hbWUgIT09IFwiQVwiKTtcbn1cbnZhciBSb290ID0gRm9jdXNTY29wZTtcbmV4cG9ydCB7XG4gIEZvY3VzU2NvcGUsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC9pZC9zcmMvaWQudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbnZhciB1c2VSZWFjdElkID0gUmVhY3RbXCIgdXNlSWQgXCIudHJpbSgpLnRvU3RyaW5nKCldIHx8ICgoKSA9PiB2b2lkIDApO1xudmFyIGNvdW50ID0gMDtcbmZ1bmN0aW9uIHVzZUlkKGRldGVybWluaXN0aWNJZCkge1xuICBjb25zdCBbaWQsIHNldElkXSA9IFJlYWN0LnVzZVN0YXRlKHVzZVJlYWN0SWQoKSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFkZXRlcm1pbmlzdGljSWQpIHNldElkKChyZWFjdElkKSA9PiByZWFjdElkID8/IFN0cmluZyhjb3VudCsrKSk7XG4gIH0sIFtkZXRlcm1pbmlzdGljSWRdKTtcbiAgcmV0dXJuIGRldGVybWluaXN0aWNJZCB8fCAoaWQgPyBgcmFkaXgtJHtpZH1gIDogXCJcIik7XG59XG5leHBvcnQge1xuICB1c2VJZFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvcG9ydGFsLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIFBPUlRBTF9OQU1FID0gXCJQb3J0YWxcIjtcbnZhciBQb3J0YWwgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gIGNvbnN0IHsgY29udGFpbmVyOiBjb250YWluZXJQcm9wLCAuLi5wb3J0YWxQcm9wcyB9ID0gcHJvcHM7XG4gIGNvbnN0IFttb3VudGVkLCBzZXRNb3VudGVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHNldE1vdW50ZWQodHJ1ZSksIFtdKTtcbiAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyUHJvcCB8fCBtb3VudGVkICYmIGdsb2JhbFRoaXM/LmRvY3VtZW50Py5ib2R5O1xuICByZXR1cm4gY29udGFpbmVyID8gUmVhY3RET00uY3JlYXRlUG9ydGFsKC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmRpdiwgeyAuLi5wb3J0YWxQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSksIGNvbnRhaW5lcikgOiBudWxsO1xufSk7XG5Qb3J0YWwuZGlzcGxheU5hbWUgPSBQT1JUQUxfTkFNRTtcbnZhciBSb290ID0gUG9ydGFsO1xuZXhwb3J0IHtcbiAgUG9ydGFsLFxuICBSb290XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9wcmVzZW5jZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0MiBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG5cbi8vIHNyYy91c2Utc3RhdGUtbWFjaGluZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gdXNlU3RhdGVNYWNoaW5lKGluaXRpYWxTdGF0ZSwgbWFjaGluZSkge1xuICByZXR1cm4gUmVhY3QudXNlUmVkdWNlcigoc3RhdGUsIGV2ZW50KSA9PiB7XG4gICAgY29uc3QgbmV4dFN0YXRlID0gbWFjaGluZVtzdGF0ZV1bZXZlbnRdO1xuICAgIHJldHVybiBuZXh0U3RhdGUgPz8gc3RhdGU7XG4gIH0sIGluaXRpYWxTdGF0ZSk7XG59XG5cbi8vIHNyYy9wcmVzZW5jZS50c3hcbnZhciBQcmVzZW5jZSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByZXNlbnQsIGNoaWxkcmVuIH0gPSBwcm9wcztcbiAgY29uc3QgcHJlc2VuY2UgPSB1c2VQcmVzZW5jZShwcmVzZW50KTtcbiAgY29uc3QgY2hpbGQgPSB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IGNoaWxkcmVuKHsgcHJlc2VudDogcHJlc2VuY2UuaXNQcmVzZW50IH0pIDogUmVhY3QyLkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuICBjb25zdCByZWYgPSB1c2VDb21wb3NlZFJlZnMocHJlc2VuY2UucmVmLCBnZXRFbGVtZW50UmVmKGNoaWxkKSk7XG4gIGNvbnN0IGZvcmNlTW91bnQgPSB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIjtcbiAgcmV0dXJuIGZvcmNlTW91bnQgfHwgcHJlc2VuY2UuaXNQcmVzZW50ID8gUmVhY3QyLmNsb25lRWxlbWVudChjaGlsZCwgeyByZWYgfSkgOiBudWxsO1xufTtcblByZXNlbmNlLmRpc3BsYXlOYW1lID0gXCJQcmVzZW5jZVwiO1xuZnVuY3Rpb24gdXNlUHJlc2VuY2UocHJlc2VudCkge1xuICBjb25zdCBbbm9kZSwgc2V0Tm9kZV0gPSBSZWFjdDIudXNlU3RhdGUoKTtcbiAgY29uc3Qgc3R5bGVzUmVmID0gUmVhY3QyLnVzZVJlZihudWxsKTtcbiAgY29uc3QgcHJldlByZXNlbnRSZWYgPSBSZWFjdDIudXNlUmVmKHByZXNlbnQpO1xuICBjb25zdCBwcmV2QW5pbWF0aW9uTmFtZVJlZiA9IFJlYWN0Mi51c2VSZWYoXCJub25lXCIpO1xuICBjb25zdCBpbml0aWFsU3RhdGUgPSBwcmVzZW50ID8gXCJtb3VudGVkXCIgOiBcInVubW91bnRlZFwiO1xuICBjb25zdCBbc3RhdGUsIHNlbmRdID0gdXNlU3RhdGVNYWNoaW5lKGluaXRpYWxTdGF0ZSwge1xuICAgIG1vdW50ZWQ6IHtcbiAgICAgIFVOTU9VTlQ6IFwidW5tb3VudGVkXCIsXG4gICAgICBBTklNQVRJT05fT1VUOiBcInVubW91bnRTdXNwZW5kZWRcIlxuICAgIH0sXG4gICAgdW5tb3VudFN1c3BlbmRlZDoge1xuICAgICAgTU9VTlQ6IFwibW91bnRlZFwiLFxuICAgICAgQU5JTUFUSU9OX0VORDogXCJ1bm1vdW50ZWRcIlxuICAgIH0sXG4gICAgdW5tb3VudGVkOiB7XG4gICAgICBNT1VOVDogXCJtb3VudGVkXCJcbiAgICB9XG4gIH0pO1xuICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uTmFtZSA9IGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzUmVmLmN1cnJlbnQpO1xuICAgIHByZXZBbmltYXRpb25OYW1lUmVmLmN1cnJlbnQgPSBzdGF0ZSA9PT0gXCJtb3VudGVkXCIgPyBjdXJyZW50QW5pbWF0aW9uTmFtZSA6IFwibm9uZVwiO1xuICB9LCBbc3RhdGVdKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzdHlsZXMgPSBzdHlsZXNSZWYuY3VycmVudDtcbiAgICBjb25zdCB3YXNQcmVzZW50ID0gcHJldlByZXNlbnRSZWYuY3VycmVudDtcbiAgICBjb25zdCBoYXNQcmVzZW50Q2hhbmdlZCA9IHdhc1ByZXNlbnQgIT09IHByZXNlbnQ7XG4gICAgaWYgKGhhc1ByZXNlbnRDaGFuZ2VkKSB7XG4gICAgICBjb25zdCBwcmV2QW5pbWF0aW9uTmFtZSA9IHByZXZBbmltYXRpb25OYW1lUmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uTmFtZSA9IGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzKTtcbiAgICAgIGlmIChwcmVzZW50KSB7XG4gICAgICAgIHNlbmQoXCJNT1VOVFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEFuaW1hdGlvbk5hbWUgPT09IFwibm9uZVwiIHx8IHN0eWxlcz8uZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgc2VuZChcIlVOTU9VTlRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpc0FuaW1hdGluZyA9IHByZXZBbmltYXRpb25OYW1lICE9PSBjdXJyZW50QW5pbWF0aW9uTmFtZTtcbiAgICAgICAgaWYgKHdhc1ByZXNlbnQgJiYgaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICBzZW5kKFwiQU5JTUFUSU9OX09VVFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZW5kKFwiVU5NT1VOVFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcHJldlByZXNlbnRSZWYuY3VycmVudCA9IHByZXNlbnQ7XG4gICAgfVxuICB9LCBbcHJlc2VudCwgc2VuZF0pO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChub2RlKSB7XG4gICAgICBsZXQgdGltZW91dElkO1xuICAgICAgY29uc3Qgb3duZXJXaW5kb3cgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgPz8gd2luZG93O1xuICAgICAgY29uc3QgaGFuZGxlQW5pbWF0aW9uRW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBbmltYXRpb25OYW1lID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXNSZWYuY3VycmVudCk7XG4gICAgICAgIGNvbnN0IGlzQ3VycmVudEFuaW1hdGlvbiA9IGN1cnJlbnRBbmltYXRpb25OYW1lLmluY2x1ZGVzKENTUy5lc2NhcGUoZXZlbnQuYW5pbWF0aW9uTmFtZSkpO1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBub2RlICYmIGlzQ3VycmVudEFuaW1hdGlvbikge1xuICAgICAgICAgIHNlbmQoXCJBTklNQVRJT05fRU5EXCIpO1xuICAgICAgICAgIGlmICghcHJldlByZXNlbnRSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEZpbGxNb2RlID0gbm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGUgPSBcImZvcndhcmRzXCI7XG4gICAgICAgICAgICB0aW1lb3V0SWQgPSBvd25lcldpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGUgPT09IFwiZm9yd2FyZHNcIikge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGUgPSBjdXJyZW50RmlsbE1vZGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IGhhbmRsZUFuaW1hdGlvblN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IG5vZGUpIHtcbiAgICAgICAgICBwcmV2QW5pbWF0aW9uTmFtZVJlZi5jdXJyZW50ID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXNSZWYuY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25zdGFydFwiLCBoYW5kbGVBbmltYXRpb25TdGFydCk7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25jYW5jZWxcIiwgaGFuZGxlQW5pbWF0aW9uRW5kKTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgb3duZXJXaW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbnN0YXJ0XCIsIGhhbmRsZUFuaW1hdGlvblN0YXJ0KTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uY2FuY2VsXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VuZChcIkFOSU1BVElPTl9FTkRcIik7XG4gICAgfVxuICB9LCBbbm9kZSwgc2VuZF0pO1xuICByZXR1cm4ge1xuICAgIGlzUHJlc2VudDogW1wibW91bnRlZFwiLCBcInVubW91bnRTdXNwZW5kZWRcIl0uaW5jbHVkZXMoc3RhdGUpLFxuICAgIHJlZjogUmVhY3QyLnVzZUNhbGxiYWNrKChub2RlMikgPT4ge1xuICAgICAgc3R5bGVzUmVmLmN1cnJlbnQgPSBub2RlMiA/IGdldENvbXB1dGVkU3R5bGUobm9kZTIpIDogbnVsbDtcbiAgICAgIHNldE5vZGUobm9kZTIpO1xuICAgIH0sIFtdKVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXMpIHtcbiAgcmV0dXJuIHN0eWxlcz8uYW5pbWF0aW9uTmFtZSB8fCBcIm5vbmVcIjtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRSZWYoZWxlbWVudCkge1xuICBsZXQgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LnByb3BzLCBcInJlZlwiKT8uZ2V0O1xuICBsZXQgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5yZWY7XG4gIH1cbiAgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LCBcInJlZlwiKT8uZ2V0O1xuICBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnByb3BzLnJlZjtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWYgfHwgZWxlbWVudC5yZWY7XG59XG52YXIgUm9vdCA9IFByZXNlbmNlO1xuZXhwb3J0IHtcbiAgUHJlc2VuY2UsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvcHJpbWl0aXZlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyBjcmVhdGVTbG90IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBOT0RFUyA9IFtcbiAgXCJhXCIsXG4gIFwiYnV0dG9uXCIsXG4gIFwiZGl2XCIsXG4gIFwiZm9ybVwiLFxuICBcImgyXCIsXG4gIFwiaDNcIixcbiAgXCJpbWdcIixcbiAgXCJpbnB1dFwiLFxuICBcImxhYmVsXCIsXG4gIFwibGlcIixcbiAgXCJuYXZcIixcbiAgXCJvbFwiLFxuICBcInBcIixcbiAgXCJzZWxlY3RcIixcbiAgXCJzcGFuXCIsXG4gIFwic3ZnXCIsXG4gIFwidWxcIlxuXTtcbnZhciBQcmltaXRpdmUgPSBOT0RFUy5yZWR1Y2UoKHByaW1pdGl2ZSwgbm9kZSkgPT4ge1xuICBjb25zdCBTbG90ID0gY3JlYXRlU2xvdChgUHJpbWl0aXZlLiR7bm9kZX1gKTtcbiAgY29uc3QgTm9kZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGFzQ2hpbGQsIC4uLnByaW1pdGl2ZVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBDb21wID0gYXNDaGlsZCA/IFNsb3QgOiBub2RlO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB3aW5kb3dbU3ltYm9sLmZvcihcInJhZGl4LXVpXCIpXSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KENvbXAsIHsgLi4ucHJpbWl0aXZlUHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pO1xuICB9KTtcbiAgTm9kZS5kaXNwbGF5TmFtZSA9IGBQcmltaXRpdmUuJHtub2RlfWA7XG4gIHJldHVybiB7IC4uLnByaW1pdGl2ZSwgW25vZGVdOiBOb2RlIH07XG59LCB7fSk7XG5mdW5jdGlvbiBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnQodGFyZ2V0LCBldmVudCkge1xuICBpZiAodGFyZ2V0KSBSZWFjdERPTS5mbHVzaFN5bmMoKCkgPT4gdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpKTtcbn1cbnZhciBSb290ID0gUHJpbWl0aXZlO1xuZXhwb3J0IHtcbiAgUHJpbWl0aXZlLFxuICBSb290LFxuICBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnRcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvc2xvdC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZVJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgRnJhZ21lbnQgYXMgRnJhZ21lbnQyLCBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90KG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSk7XG4gIGNvbnN0IFNsb3QyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2hpbGRyZW5BcnJheSA9IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pO1xuICAgIGNvbnN0IHNsb3R0YWJsZSA9IGNoaWxkcmVuQXJyYXkuZmluZChpc1Nsb3R0YWJsZSk7XG4gICAgaWYgKHNsb3R0YWJsZSkge1xuICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHNsb3R0YWJsZS5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gY2hpbGRyZW5BcnJheS5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZCA9PT0gc2xvdHRhYmxlKSB7XG4gICAgICAgICAgaWYgKFJlYWN0LkNoaWxkcmVuLmNvdW50KG5ld0VsZW1lbnQpID4gMSkgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KG5ld0VsZW1lbnQpID8gbmV3RWxlbWVudC5wcm9wcy5jaGlsZHJlbiA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbjogUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBSZWFjdC5jbG9uZUVsZW1lbnQobmV3RWxlbWVudCwgdm9pZCAwLCBuZXdDaGlsZHJlbikgOiBudWxsIH0pO1xuICAgIH1cbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChTbG90Q2xvbmUsIHsgLi4uc2xvdFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiwgY2hpbGRyZW4gfSk7XG4gIH0pO1xuICBTbG90Mi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdGA7XG4gIHJldHVybiBTbG90Mjtcbn1cbnZhciBTbG90ID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3QoXCJTbG90XCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3RDbG9uZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdENsb25lID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgICAgY29uc3QgY2hpbGRyZW5SZWYgPSBnZXRFbGVtZW50UmVmKGNoaWxkcmVuKTtcbiAgICAgIGNvbnN0IHByb3BzMiA9IG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZHJlbi5wcm9wcyk7XG4gICAgICBpZiAoY2hpbGRyZW4udHlwZSAhPT0gUmVhY3QuRnJhZ21lbnQpIHtcbiAgICAgICAgcHJvcHMyLnJlZiA9IGZvcndhcmRlZFJlZiA/IGNvbXBvc2VSZWZzKGZvcndhcmRlZFJlZiwgY2hpbGRyZW5SZWYpIDogY2hpbGRyZW5SZWY7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkcmVuLCBwcm9wczIpO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMSA/IFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCkgOiBudWxsO1xuICB9KTtcbiAgU2xvdENsb25lLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90Q2xvbmVgO1xuICByZXR1cm4gU2xvdENsb25lO1xufVxudmFyIFNMT1RUQUJMRV9JREVOVElGSUVSID0gU3ltYm9sKFwicmFkaXguc2xvdHRhYmxlXCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3R0YWJsZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdHRhYmxlMiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChGcmFnbWVudDIsIHsgY2hpbGRyZW4gfSk7XG4gIH07XG4gIFNsb3R0YWJsZTIuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3R0YWJsZWA7XG4gIFNsb3R0YWJsZTIuX19yYWRpeElkID0gU0xPVFRBQkxFX0lERU5USUZJRVI7XG4gIHJldHVybiBTbG90dGFibGUyO1xufVxudmFyIFNsb3R0YWJsZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90dGFibGUoXCJTbG90dGFibGVcIik7XG5mdW5jdGlvbiBpc1Nsb3R0YWJsZShjaGlsZCkge1xuICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpICYmIHR5cGVvZiBjaGlsZC50eXBlID09PSBcImZ1bmN0aW9uXCIgJiYgXCJfX3JhZGl4SWRcIiBpbiBjaGlsZC50eXBlICYmIGNoaWxkLnR5cGUuX19yYWRpeElkID09PSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbn1cbmZ1bmN0aW9uIG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZFByb3BzKSB7XG4gIGNvbnN0IG92ZXJyaWRlUHJvcHMgPSB7IC4uLmNoaWxkUHJvcHMgfTtcbiAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGlsZFByb3BzKSB7XG4gICAgY29uc3Qgc2xvdFByb3BWYWx1ZSA9IHNsb3RQcm9wc1twcm9wTmFtZV07XG4gICAgY29uc3QgY2hpbGRQcm9wVmFsdWUgPSBjaGlsZFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBpc0hhbmRsZXIgPSAvXm9uW0EtWl0vLnRlc3QocHJvcE5hbWUpO1xuICAgIGlmIChpc0hhbmRsZXIpIHtcbiAgICAgIGlmIChzbG90UHJvcFZhbHVlICYmIGNoaWxkUHJvcFZhbHVlKSB7XG4gICAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBjaGlsZFByb3BWYWx1ZSguLi5hcmdzKTtcbiAgICAgICAgICBzbG90UHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNsb3RQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBzbG90UHJvcFZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSB7IC4uLnNsb3RQcm9wVmFsdWUsIC4uLmNoaWxkUHJvcFZhbHVlIH07XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJjbGFzc05hbWVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBbc2xvdFByb3BWYWx1ZSwgY2hpbGRQcm9wVmFsdWVdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgLi4uc2xvdFByb3BzLCAuLi5vdmVycmlkZVByb3BzIH07XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50UmVmKGVsZW1lbnQpIHtcbiAgbGV0IGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudC5wcm9wcywgXCJyZWZcIik/LmdldDtcbiAgbGV0IG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucmVmO1xuICB9XG4gIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudCwgXCJyZWZcIik/LmdldDtcbiAgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWY7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmIHx8IGVsZW1lbnQucmVmO1xufVxuZXhwb3J0IHtcbiAgU2xvdCBhcyBSb290LFxuICBTbG90LFxuICBTbG90dGFibGUsXG4gIGNyZWF0ZVNsb3QsXG4gIGNyZWF0ZVNsb3R0YWJsZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L3VzZS1jYWxsYmFjay1yZWYvc3JjL3VzZS1jYWxsYmFjay1yZWYudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIHVzZUNhbGxiYWNrUmVmKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGNhbGxiYWNrUmVmID0gUmVhY3QudXNlUmVmKGNhbGxiYWNrKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjYWxsYmFja1JlZi5jdXJyZW50ID0gY2FsbGJhY2s7XG4gIH0pO1xuICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiAoLi4uYXJncykgPT4gY2FsbGJhY2tSZWYuY3VycmVudD8uKC4uLmFyZ3MpLCBbXSk7XG59XG5leHBvcnQge1xuICB1c2VDYWxsYmFja1JlZlxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy91c2UtY29udHJvbGxhYmxlLXN0YXRlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG52YXIgdXNlSW5zZXJ0aW9uRWZmZWN0ID0gUmVhY3RbXCIgdXNlSW5zZXJ0aW9uRWZmZWN0IFwiLnRyaW0oKS50b1N0cmluZygpXSB8fCB1c2VMYXlvdXRFZmZlY3Q7XG5mdW5jdGlvbiB1c2VDb250cm9sbGFibGVTdGF0ZSh7XG4gIHByb3AsXG4gIGRlZmF1bHRQcm9wLFxuICBvbkNoYW5nZSA9ICgpID0+IHtcbiAgfSxcbiAgY2FsbGVyXG59KSB7XG4gIGNvbnN0IFt1bmNvbnRyb2xsZWRQcm9wLCBzZXRVbmNvbnRyb2xsZWRQcm9wLCBvbkNoYW5nZVJlZl0gPSB1c2VVbmNvbnRyb2xsZWRTdGF0ZSh7XG4gICAgZGVmYXVsdFByb3AsXG4gICAgb25DaGFuZ2VcbiAgfSk7XG4gIGNvbnN0IGlzQ29udHJvbGxlZCA9IHByb3AgIT09IHZvaWQgMDtcbiAgY29uc3QgdmFsdWUgPSBpc0NvbnRyb2xsZWQgPyBwcm9wIDogdW5jb250cm9sbGVkUHJvcDtcbiAgaWYgKHRydWUpIHtcbiAgICBjb25zdCBpc0NvbnRyb2xsZWRSZWYgPSBSZWFjdC51c2VSZWYocHJvcCAhPT0gdm9pZCAwKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3Qgd2FzQ29udHJvbGxlZCA9IGlzQ29udHJvbGxlZFJlZi5jdXJyZW50O1xuICAgICAgaWYgKHdhc0NvbnRyb2xsZWQgIT09IGlzQ29udHJvbGxlZCkge1xuICAgICAgICBjb25zdCBmcm9tID0gd2FzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc3QgdG8gPSBpc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCI7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgJHtjYWxsZXJ9IGlzIGNoYW5naW5nIGZyb20gJHtmcm9tfSB0byAke3RvfS4gQ29tcG9uZW50cyBzaG91bGQgbm90IHN3aXRjaCBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gRGVjaWRlIGJldHdlZW4gdXNpbmcgYSBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCB2YWx1ZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBjb21wb25lbnQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaXNDb250cm9sbGVkUmVmLmN1cnJlbnQgPSBpc0NvbnRyb2xsZWQ7XG4gICAgfSwgW2lzQ29udHJvbGxlZCwgY2FsbGVyXSk7XG4gIH1cbiAgY29uc3Qgc2V0VmFsdWUgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAobmV4dFZhbHVlKSA9PiB7XG4gICAgICBpZiAoaXNDb250cm9sbGVkKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlMiA9IGlzRnVuY3Rpb24obmV4dFZhbHVlKSA/IG5leHRWYWx1ZShwcm9wKSA6IG5leHRWYWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlMiAhPT0gcHJvcCkge1xuICAgICAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQ/Lih2YWx1ZTIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRVbmNvbnRyb2xsZWRQcm9wKG5leHRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaXNDb250cm9sbGVkLCBwcm9wLCBzZXRVbmNvbnRyb2xsZWRQcm9wLCBvbkNoYW5nZVJlZl1cbiAgKTtcbiAgcmV0dXJuIFt2YWx1ZSwgc2V0VmFsdWVdO1xufVxuZnVuY3Rpb24gdXNlVW5jb250cm9sbGVkU3RhdGUoe1xuICBkZWZhdWx0UHJvcCxcbiAgb25DaGFuZ2Vcbn0pIHtcbiAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSBSZWFjdC51c2VTdGF0ZShkZWZhdWx0UHJvcCk7XG4gIGNvbnN0IHByZXZWYWx1ZVJlZiA9IFJlYWN0LnVzZVJlZih2YWx1ZSk7XG4gIGNvbnN0IG9uQ2hhbmdlUmVmID0gUmVhY3QudXNlUmVmKG9uQ2hhbmdlKTtcbiAgdXNlSW5zZXJ0aW9uRWZmZWN0KCgpID0+IHtcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XG4gIH0sIFtvbkNoYW5nZV0pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwcmV2VmFsdWVSZWYuY3VycmVudCAhPT0gdmFsdWUpIHtcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQ/Lih2YWx1ZSk7XG4gICAgICBwcmV2VmFsdWVSZWYuY3VycmVudCA9IHZhbHVlO1xuICAgIH1cbiAgfSwgW3ZhbHVlLCBwcmV2VmFsdWVSZWZdKTtcbiAgcmV0dXJuIFt2YWx1ZSwgc2V0VmFsdWUsIG9uQ2hhbmdlUmVmXTtcbn1cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG4vLyBzcmMvdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZS1yZWR1Y2VyLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QyIGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0RXZlbnQgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1lZmZlY3QtZXZlbnRcIjtcbnZhciBTWU5DX1NUQVRFID0gU3ltYm9sKFwiUkFESVg6U1lOQ19TVEFURVwiKTtcbmZ1bmN0aW9uIHVzZUNvbnRyb2xsYWJsZVN0YXRlUmVkdWNlcihyZWR1Y2VyLCB1c2VyQXJncywgaW5pdGlhbEFyZywgaW5pdCkge1xuICBjb25zdCB7IHByb3A6IGNvbnRyb2xsZWRTdGF0ZSwgZGVmYXVsdFByb3AsIG9uQ2hhbmdlOiBvbkNoYW5nZVByb3AsIGNhbGxlciB9ID0gdXNlckFyZ3M7XG4gIGNvbnN0IGlzQ29udHJvbGxlZCA9IGNvbnRyb2xsZWRTdGF0ZSAhPT0gdm9pZCAwO1xuICBjb25zdCBvbkNoYW5nZSA9IHVzZUVmZmVjdEV2ZW50KG9uQ2hhbmdlUHJvcCk7XG4gIGlmICh0cnVlKSB7XG4gICAgY29uc3QgaXNDb250cm9sbGVkUmVmID0gUmVhY3QyLnVzZVJlZihjb250cm9sbGVkU3RhdGUgIT09IHZvaWQgMCk7XG4gICAgUmVhY3QyLnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCB3YXNDb250cm9sbGVkID0gaXNDb250cm9sbGVkUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAod2FzQ29udHJvbGxlZCAhPT0gaXNDb250cm9sbGVkKSB7XG4gICAgICAgIGNvbnN0IGZyb20gPSB3YXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zdCB0byA9IGlzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGAke2NhbGxlcn0gaXMgY2hhbmdpbmcgZnJvbSAke2Zyb219IHRvICR7dG99LiBDb21wb25lbnRzIHNob3VsZCBub3Qgc3dpdGNoIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHZhbHVlIGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIGNvbXBvbmVudC5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpc0NvbnRyb2xsZWRSZWYuY3VycmVudCA9IGlzQ29udHJvbGxlZDtcbiAgICB9LCBbaXNDb250cm9sbGVkLCBjYWxsZXJdKTtcbiAgfVxuICBjb25zdCBhcmdzID0gW3sgLi4uaW5pdGlhbEFyZywgc3RhdGU6IGRlZmF1bHRQcm9wIH1dO1xuICBpZiAoaW5pdCkge1xuICAgIGFyZ3MucHVzaChpbml0KTtcbiAgfVxuICBjb25zdCBbaW50ZXJuYWxTdGF0ZSwgZGlzcGF0Y2hdID0gUmVhY3QyLnVzZVJlZHVjZXIoXG4gICAgKHN0YXRlMiwgYWN0aW9uKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFNZTkNfU1RBVEUpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUyLCBzdGF0ZTogYWN0aW9uLnN0YXRlIH07XG4gICAgICB9XG4gICAgICBjb25zdCBuZXh0ID0gcmVkdWNlcihzdGF0ZTIsIGFjdGlvbik7XG4gICAgICBpZiAoaXNDb250cm9sbGVkICYmICFPYmplY3QuaXMobmV4dC5zdGF0ZSwgc3RhdGUyLnN0YXRlKSkge1xuICAgICAgICBvbkNoYW5nZShuZXh0LnN0YXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0sXG4gICAgLi4uYXJnc1xuICApO1xuICBjb25zdCB1bmNvbnRyb2xsZWRTdGF0ZSA9IGludGVybmFsU3RhdGUuc3RhdGU7XG4gIGNvbnN0IHByZXZWYWx1ZVJlZiA9IFJlYWN0Mi51c2VSZWYodW5jb250cm9sbGVkU3RhdGUpO1xuICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocHJldlZhbHVlUmVmLmN1cnJlbnQgIT09IHVuY29udHJvbGxlZFN0YXRlKSB7XG4gICAgICBwcmV2VmFsdWVSZWYuY3VycmVudCA9IHVuY29udHJvbGxlZFN0YXRlO1xuICAgICAgaWYgKCFpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgb25DaGFuZ2UodW5jb250cm9sbGVkU3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW29uQ2hhbmdlLCB1bmNvbnRyb2xsZWRTdGF0ZSwgcHJldlZhbHVlUmVmLCBpc0NvbnRyb2xsZWRdKTtcbiAgY29uc3Qgc3RhdGUgPSBSZWFjdDIudXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgaXNDb250cm9sbGVkMiA9IGNvbnRyb2xsZWRTdGF0ZSAhPT0gdm9pZCAwO1xuICAgIGlmIChpc0NvbnRyb2xsZWQyKSB7XG4gICAgICByZXR1cm4geyAuLi5pbnRlcm5hbFN0YXRlLCBzdGF0ZTogY29udHJvbGxlZFN0YXRlIH07XG4gICAgfVxuICAgIHJldHVybiBpbnRlcm5hbFN0YXRlO1xuICB9LCBbaW50ZXJuYWxTdGF0ZSwgY29udHJvbGxlZFN0YXRlXSk7XG4gIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0NvbnRyb2xsZWQgJiYgIU9iamVjdC5pcyhjb250cm9sbGVkU3RhdGUsIGludGVybmFsU3RhdGUuc3RhdGUpKSB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFNZTkNfU1RBVEUsIHN0YXRlOiBjb250cm9sbGVkU3RhdGUgfSk7XG4gICAgfVxuICB9LCBbY29udHJvbGxlZFN0YXRlLCBpbnRlcm5hbFN0YXRlLnN0YXRlLCBpc0NvbnRyb2xsZWRdKTtcbiAgcmV0dXJuIFtzdGF0ZSwgZGlzcGF0Y2hdO1xufVxuZXhwb3J0IHtcbiAgdXNlQ29udHJvbGxhYmxlU3RhdGUsXG4gIHVzZUNvbnRyb2xsYWJsZVN0YXRlUmVkdWNlclxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy91c2UtZWZmZWN0LWV2ZW50LnRzeFxuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG52YXIgdXNlUmVhY3RFZmZlY3RFdmVudCA9IFJlYWN0W1wiIHVzZUVmZmVjdEV2ZW50IFwiLnRyaW0oKS50b1N0cmluZygpXTtcbnZhciB1c2VSZWFjdEluc2VydGlvbkVmZmVjdCA9IFJlYWN0W1wiIHVzZUluc2VydGlvbkVmZmVjdCBcIi50cmltKCkudG9TdHJpbmcoKV07XG5mdW5jdGlvbiB1c2VFZmZlY3RFdmVudChjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIHVzZVJlYWN0RWZmZWN0RXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB1c2VSZWFjdEVmZmVjdEV2ZW50KGNhbGxiYWNrKTtcbiAgfVxuICBjb25zdCByZWYgPSBSZWFjdC51c2VSZWYoKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjYWxsIGFuIGV2ZW50IGhhbmRsZXIgd2hpbGUgcmVuZGVyaW5nLlwiKTtcbiAgfSk7XG4gIGlmICh0eXBlb2YgdXNlUmVhY3RJbnNlcnRpb25FZmZlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHVzZVJlYWN0SW5zZXJ0aW9uRWZmZWN0KCgpID0+IHtcbiAgICAgIHJlZi5jdXJyZW50ID0gY2FsbGJhY2s7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICAgIHJlZi5jdXJyZW50ID0gY2FsbGJhY2s7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oKCkgPT4gKC4uLmFyZ3MpID0+IHJlZi5jdXJyZW50Py4oLi4uYXJncyksIFtdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUVmZmVjdEV2ZW50XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvdXNlLWVzY2FwZS1rZXlkb3duL3NyYy91c2UtZXNjYXBlLWtleWRvd24udHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmXCI7XG5mdW5jdGlvbiB1c2VFc2NhcGVLZXlkb3duKG9uRXNjYXBlS2V5RG93blByb3AsIG93bmVyRG9jdW1lbnQgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCkge1xuICBjb25zdCBvbkVzY2FwZUtleURvd24gPSB1c2VDYWxsYmFja1JlZihvbkVzY2FwZUtleURvd25Qcm9wKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIG9uRXNjYXBlS2V5RG93bihldmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBvd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4gb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlEb3duLCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gIH0sIFtvbkVzY2FwZUtleURvd24sIG93bmVyRG9jdW1lbnRdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUVzY2FwZUtleWRvd25cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC91c2UtbGF5b3V0LWVmZmVjdC9zcmMvdXNlLWxheW91dC1lZmZlY3QudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbnZhciB1c2VMYXlvdXRFZmZlY3QyID0gZ2xvYmFsVGhpcz8uZG9jdW1lbnQgPyBSZWFjdC51c2VMYXlvdXRFZmZlY3QgOiAoKSA9PiB7XG59O1xuZXhwb3J0IHtcbiAgdXNlTGF5b3V0RWZmZWN0MiBhcyB1c2VMYXlvdXRFZmZlY3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XG4gIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBhciA9IFtdO1xuICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XG4gICAgcmV0dXJuIGFyO1xuICB9O1xuICByZXR1cm4gb3duS2V5cyhvKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XG4gIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xuICAgIGlmIChhc3luYykge1xuICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xuICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcbiAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcbiAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xuICB9XG4gIGVsc2UgaWYgKGFzeW5jKSB7XG4gICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcbiAgZnVuY3Rpb24gZmFpbChlKSB7XG4gICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xuICAgIGVudi5oYXNFcnJvciA9IHRydWU7XG4gIH1cbiAgdmFyIHIsIHMgPSAwO1xuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcbiAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcbiAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgcyB8PSAxO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XG4gICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xuICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XG4gICAgICB9KTtcbiAgfVxuICByZXR1cm4gcGF0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBfX2V4dGVuZHMsXG4gIF9fYXNzaWduLFxuICBfX3Jlc3QsXG4gIF9fZGVjb3JhdGUsXG4gIF9fcGFyYW0sXG4gIF9fZXNEZWNvcmF0ZSxcbiAgX19ydW5Jbml0aWFsaXplcnMsXG4gIF9fcHJvcEtleSxcbiAgX19zZXRGdW5jdGlvbk5hbWUsXG4gIF9fbWV0YWRhdGEsXG4gIF9fYXdhaXRlcixcbiAgX19nZW5lcmF0b3IsXG4gIF9fY3JlYXRlQmluZGluZyxcbiAgX19leHBvcnRTdGFyLFxuICBfX3ZhbHVlcyxcbiAgX19yZWFkLFxuICBfX3NwcmVhZCxcbiAgX19zcHJlYWRBcnJheXMsXG4gIF9fc3ByZWFkQXJyYXksXG4gIF9fYXdhaXQsXG4gIF9fYXN5bmNHZW5lcmF0b3IsXG4gIF9fYXN5bmNEZWxlZ2F0b3IsXG4gIF9fYXN5bmNWYWx1ZXMsXG4gIF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxuICBfX2ltcG9ydFN0YXIsXG4gIF9faW1wb3J0RGVmYXVsdCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEluLFxuICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcbiAgX19kaXNwb3NlUmVzb3VyY2VzLFxuICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcbn07XG4iXSwibmFtZXMiOlsianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsIkFsZXJ0Q2lyY2xlIiwiRGlhbG9nIiwiRGlhbG9nQ29udGVudCIsIkRpYWxvZ0hlYWRlciIsIkRpYWxvZ1RpdGxlIiwiRGlhbG9nRm9vdGVyIiwiQnV0dG9uIiwiRGVsZXRlTWVtYmVyRGlhbG9nIiwiX3JlZiIsImlzT3BlbiIsIm9uQ2xvc2UiLCJvbkNvbmZpcm0iLCJtZW1iZXIiLCJfcmVmJGlzRGVsZXRpbmciLCJpc0RlbGV0aW5nIiwib3BlbiIsIm9uT3BlbkNoYW5nZSIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSIsInR5cGUiLCJ2YXJpYW50Iiwib25DbGljayIsImRpc2FibGVkIiwiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJvd25LZXlzIiwia2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImZpbHRlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInB1c2giLCJfb2JqZWN0U3ByZWFkIiwiZm9yRWFjaCIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibmV4dCIsImlzQXJyYXkiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIklucHV0IiwiTWVtYmVyRm9ybSIsIm9uU3VibWl0IiwiX3JlZiRtZW1iZXIiLCJfcmVmJHNtYWxsR3JvdXBzIiwic21hbGxHcm91cHMiLCJfcmVmJGlzTG9hZGluZyIsImlzTG9hZGluZyIsIl91c2VTdGF0ZSIsImVtYWlsIiwicGhvbmUiLCJhZGRyZXNzIiwiY2l0eSIsInN0YXR1cyIsInNtYWxsX2dyb3VwX2lkIiwiZGF0ZV9qb2luZWQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJzcGxpdCIsImJpcnRoX2RhdGUiLCJnZW5kZXIiLCJfdXNlU3RhdGUyIiwiZm9ybURhdGEiLCJzZXRGb3JtRGF0YSIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwiZXJyb3JzIiwic2V0RXJyb3JzIiwiX3VzZVN0YXRlNSIsIl91c2VTdGF0ZTYiLCJpc1N1Ym1pdHRpbmciLCJzZXRJc1N1Ym1pdHRpbmciLCJ2YWxpZGF0ZUZvcm0iLCJuZXdFcnJvcnMiLCJ0cmltIiwiaGFuZGxlQ2hhbmdlIiwiX2UkdGFyZ2V0IiwidGFyZ2V0IiwicHJldiIsInVuZGVmaW5lZCIsImhhbmRsZVN1Ym1pdCIsIl9yZWYyIiwiX2NhbGxlZSIsIl9lcnJvciRyZXNwb25zZSIsIl90IiwiX2NvbnRleHQiLCJwcmV2ZW50RGVmYXVsdCIsInJlc3BvbnNlIiwiZGF0YSIsIl94IiwiaGFuZGxlQ2xvc2UiLCJodG1sRm9yIiwiaWQiLCJvbkNoYW5nZSIsInBhcnNlSW50IiwibWFwIiwiZ3JvdXAiLCJSZWFjdCIsIkVkaXQiLCJUcmFzaDIiLCJDaGV2cm9uVXAiLCJDaGV2cm9uRG93biIsIkNoZXZyb25zVXBEb3duIiwiVGFibGUiLCJUYWJsZUJvZHkiLCJUYWJsZUNlbGwiLCJUYWJsZUhlYWQiLCJUYWJsZUhlYWRlciIsIlRhYmxlUm93IiwiTWVtYmVyVGFibGUiLCJtZW1vIiwibWVtYmVycyIsIm9uRWRpdCIsIm9uRGVsZXRlIiwiY3VycmVudFBhZ2UiLCJ0b3RhbFBhZ2VzIiwib25QYWdlQ2hhbmdlIiwiY29sdW1uIiwiZGlyZWN0aW9uIiwic29ydENvbmZpZyIsInNldFNvcnRDb25maWciLCJoYW5kbGVTb3J0Iiwic29ydGVkTWVtYmVycyIsInVzZU1lbW8iLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJzb3J0IiwiYiIsIl9hJHNtYWxsX2dyb3VwIiwiX2Ikc21hbGxfZ3JvdXAiLCJhVmFsdWUiLCJiVmFsdWUiLCJjb25jYXQiLCJ0b0xvd2VyQ2FzZSIsInNtYWxsX2dyb3VwIiwicmVuZGVyU29ydEljb24iLCJnZXRTdGF0dXNCYWRnZSIsImJhc2VDbGFzc2VzIiwic2l6ZSIsInRpdGxlIiwiTWF0aCIsIm1pbiIsIl8iLCJwYWdlTnVtIiwiRGlhbG9nUHJpbWl0aXZlIiwiWCIsImNuIiwiUm9vdCIsIkRpYWxvZ1RyaWdnZXIiLCJUcmlnZ2VyIiwiRGlhbG9nUG9ydGFsIiwiUG9ydGFsIiwiRGlhbG9nQ2xvc2UiLCJDbG9zZSIsIkRpYWxvZ092ZXJsYXkiLCJmb3J3YXJkUmVmIiwicmVmIiwicHJvcHMiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJfZXhjbHVkZWQiLCJPdmVybGF5IiwiX2V4Y2x1ZGVkMiIsIkNvbnRlbnQiLCJfcmVmMyIsIl9leGNsdWRlZDMiLCJfcmVmNCIsIl9leGNsdWRlZDQiLCJfcmVmNSIsIl9leGNsdWRlZDUiLCJUaXRsZSIsIkRpYWxvZ0Rlc2NyaXB0aW9uIiwiX3JlZjYiLCJfZXhjbHVkZWQ2IiwiRGVzY3JpcHRpb24iLCJUYWJsZUZvb3RlciIsIl9yZWY3IiwiX2V4Y2x1ZGVkNyIsIlRhYmxlQ2FwdGlvbiIsIl9yZWY4IiwiX2V4Y2x1ZGVkOCIsImFwaSIsIm1lbWJlckFwaSIsImNyZWF0ZU1lbWJlciIsInBvc3QiLCJ1cGRhdGVNZW1iZXIiLCJfY2FsbGVlMiIsIl9jb250ZXh0MiIsInB1dCIsImRlbGV0ZU1lbWJlciIsIl9jYWxsZWUzIiwiX2NvbnRleHQzIiwiZ2V0TWVtYmVyIiwiX2NhbGxlZTQiLCJfY29udGV4dDQiLCJnZXQiLCJleHBvcnRNZW1iZXJzIiwicGFyYW1zIiwiX2NhbGxlZTUiLCJfY29udGV4dDUiLCJyZXNwb25zZVR5cGUiLCJTZWFyY2giLCJVc2VyUGx1cyIsIkZpbHRlciIsIkRvd25sb2FkIiwiQ2FyZCIsInVzZVRvYXN0IiwidXNlQXV0aCIsIk1lbWJlcnMiLCJzZWFyY2hRdWVyeSIsInNldFNlYXJjaFF1ZXJ5IiwiZGVib3VuY2VkU2VhcmNoUXVlcnkiLCJzZXREZWJvdW5jZWRTZWFyY2hRdWVyeSIsInN0YXR1c0ZpbHRlciIsInNldFN0YXR1c0ZpbHRlciIsIl91c2VTdGF0ZTciLCJfdXNlU3RhdGU4Iiwic21hbGxHcm91cEZpbHRlciIsInNldFNtYWxsR3JvdXBGaWx0ZXIiLCJfdXNlU3RhdGU5IiwiX3VzZVN0YXRlMCIsInNldFNtYWxsR3JvdXBzIiwiX3VzZVN0YXRlMSIsIl91c2VTdGF0ZTEwIiwic2V0TWVtYmVycyIsIl91c2VTdGF0ZTExIiwiX3VzZVN0YXRlMTIiLCJzZXRJc0xvYWRpbmciLCJfdXNlU3RhdGUxMyIsIl91c2VTdGF0ZTE0Iiwic2V0Q3VycmVudFBhZ2UiLCJfdXNlU3RhdGUxNSIsIl91c2VTdGF0ZTE2Iiwic2V0VG90YWxQYWdlcyIsIl91c2VTdGF0ZTE3IiwiX3VzZVN0YXRlMTgiLCJpc0Zvcm1PcGVuIiwic2V0SXNGb3JtT3BlbiIsIl91c2VTdGF0ZTE5IiwiX3VzZVN0YXRlMjAiLCJlZGl0aW5nTWVtYmVyIiwic2V0RWRpdGluZ01lbWJlciIsIl91c2VTdGF0ZTIxIiwiX3VzZVN0YXRlMjIiLCJpc0RlbGV0ZURpYWxvZ09wZW4iLCJzZXRJc0RlbGV0ZURpYWxvZ09wZW4iLCJfdXNlU3RhdGUyMyIsIl91c2VTdGF0ZTI0IiwiZGVsZXRpbmdNZW1iZXIiLCJzZXREZWxldGluZ01lbWJlciIsIl91c2VTdGF0ZTI1IiwiX3VzZVN0YXRlMjYiLCJzZXRJc0RlbGV0aW5nIiwiX3VzZVN0YXRlMjciLCJfdXNlU3RhdGUyOCIsImlzRXhwb3J0aW5nIiwic2V0SXNFeHBvcnRpbmciLCJfdXNlVG9hc3QiLCJzaG93VG9hc3QiLCJfdXNlQXV0aCIsInVzZXIiLCJjYW5Nb2RpZnkiLCJyb2xlIiwidGltZXIiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiZmV0Y2hTbWFsbEdyb3VwcyIsInN1Y2Nlc3MiLCJjb25zb2xlIiwiZXJyb3IiLCJmZXRjaE1lbWJlcnMiLCJfcmVzcG9uc2UkZGF0YSRwYWdpbmEiLCJfdDIiLCJVUkxTZWFyY2hQYXJhbXMiLCJwYWdlIiwicGVyX3BhZ2UiLCJhcHBlbmQiLCJwYWdpbmF0aW9uIiwibGFzdF9wYWdlIiwiaGFuZGxlQWRkTWVtYmVyIiwiaGFuZGxlRWRpdE1lbWJlciIsImhhbmRsZURlbGV0ZU1lbWJlciIsImhhbmRsZUZvcm1TdWJtaXQiLCJlcnJvck1lc3NhZ2UiLCJfdDMiLCJtZXNzYWdlIiwiaGFuZGxlQ29uZmlybURlbGV0ZSIsIl9lcnJvciRyZXNwb25zZTIiLCJfdDQiLCJoYW5kbGVDbG9zZURlbGV0ZURpYWxvZyIsImhhbmRsZVBhZ2VDaGFuZ2UiLCJoYW5kbGVFeHBvcnQiLCJibG9iIiwidXJsIiwibGluayIsInRpbWVzdGFtcCIsIl9lcnJvciRyZXNwb25zZTMiLCJfdDUiLCJ3aW5kb3ciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwicmVwbGFjZSIsImRvd25sb2FkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsInJldm9rZU9iamVjdFVSTCIsInBsYWNlaG9sZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==