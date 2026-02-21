"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_SmallGroups_tsx"],{

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

/***/ "./resources/js/components/smallgroups/DeleteSmallGroupDialog.tsx"
/*!************************************************************************!*\
  !*** ./resources/js/components/smallgroups/DeleteSmallGroupDialog.tsx ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _ui_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/dialog */ "./resources/js/components/ui/dialog.tsx");
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.js");




/**
 * DeleteSmallGroupDialog Component
 *
 * Confirmation dialog for deleting a small group.
 *
 * Features:
 * - Warning message about permanent deletion
 * - Display small group name for confirmation
 * - Disable actions while deletion is in progress
 *
 * Validates Requirements: 8.4
 */
var DeleteSmallGroupDialog = function DeleteSmallGroupDialog(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onConfirm = _ref.onConfirm,
    smallGroup = _ref.smallGroup,
    _ref$isDeleting = _ref.isDeleting,
    isDeleting = _ref$isDeleting === void 0 ? false : _ref$isDeleting;
  if (!smallGroup) return null;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_1__.Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogContent, {
      className: "max-w-md",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogHeader, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex h-10 w-10 items-center justify-center rounded-full bg-red-100",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
              className: "h-5 w-5 text-red-600"
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogTitle, {
            children: "Delete Small Group"
          })]
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "py-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
          className: "text-sm text-gray-600",
          children: ["Are you sure you want to delete ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
            children: smallGroup.name
          }), "?"]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-gray-600 mt-2",
          children: "This action cannot be undone. Members currently assigned to this group will no longer have a small group assignment."
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_1__.DialogFooter, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
          type: "button",
          variant: "outline",
          onClick: onClose,
          disabled: isDeleting,
          children: "Cancel"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
          type: "button",
          variant: "destructive",
          onClick: onConfirm,
          disabled: isDeleting,
          children: isDeleting ? 'Deleting...' : 'Delete Group'
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeleteSmallGroupDialog);

/***/ },

/***/ "./resources/js/components/smallgroups/SmallGroupForm.tsx"
/*!****************************************************************!*\
  !*** ./resources/js/components/smallgroups/SmallGroupForm.tsx ***!
  \****************************************************************/
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
 * SmallGroupForm Component
 *
 * Form for adding or editing small group records.
 *
 * Features:
 * - Input fields for name, description, leader, meeting details
 * - Form validation with inline error messages
 * - Support for both create and edit modes
 * - Meeting day dropdown with all days of the week
 *
 * Validates Requirements: 8.4
 */
var SmallGroupForm = function SmallGroupForm(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onSubmit = _ref.onSubmit,
    _ref$smallGroup = _ref.smallGroup,
    smallGroup = _ref$smallGroup === void 0 ? null : _ref$smallGroup,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      name: '',
      description: null,
      leader_name: '',
      meeting_day: 'Sunday',
      meeting_time: '18:00',
      location: ''
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
  // Days of the week for dropdown
  var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /**
   * Initialize form data when smallGroup prop changes
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (smallGroup) {
      setFormData({
        name: smallGroup.name,
        description: smallGroup.description,
        leader_name: smallGroup.leader_name,
        meeting_day: smallGroup.meeting_day,
        meeting_time: smallGroup.meeting_time,
        location: smallGroup.location
      });
    } else {
      // Reset form for new small group
      setFormData({
        name: '',
        description: null,
        leader_name: '',
        meeting_day: 'Sunday',
        meeting_time: '18:00',
        location: ''
      });
    }
    setErrors({});
  }, [smallGroup, isOpen]);
  /**
   * Validate form data
   */
  var validateForm = function validateForm() {
    var newErrors = {};
    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Group name must be 100 characters or less';
    }
    if (!formData.leader_name.trim()) {
      newErrors.leader_name = 'Leader name is required';
    } else if (formData.leader_name.length > 100) {
      newErrors.leader_name = 'Leader name must be 100 characters or less';
    }
    if (!formData.meeting_day) {
      newErrors.meeting_day = 'Meeting day is required';
    } else if (!daysOfWeek.includes(formData.meeting_day)) {
      newErrors.meeting_day = 'Please select a valid day of the week';
    }
    if (!formData.meeting_time) {
      newErrors.meeting_time = 'Meeting time is required';
    } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.meeting_time)) {
      newErrors.meeting_time = 'Please enter a valid time (HH:MM)';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.length > 200) {
      newErrors.location = 'Location must be 200 characters or less';
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
          children: smallGroup ? 'Edit Small Group' : 'Add New Small Group'
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        onSubmit: handleSubmit,
        className: "space-y-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            htmlFor: "name",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: ["Group Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
            id: "name",
            name: "name",
            type: "text",
            placeholder: "e.g., Young Adults Fellowship",
            value: formData.name,
            onChange: handleChange,
            className: errors.name ? 'border-red-500' : '',
            disabled: isSubmitting
          }), errors.name && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.name
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            htmlFor: "description",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "Description"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
            id: "description",
            name: "description",
            rows: 3,
            value: formData.description || '',
            onChange: handleChange,
            className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            placeholder: "Brief description of the group's purpose and activities...",
            disabled: isSubmitting
          }), errors.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.description
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            htmlFor: "leader_name",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: ["Leader Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
            id: "leader_name",
            name: "leader_name",
            type: "text",
            placeholder: "e.g., John Smith",
            value: formData.leader_name,
            onChange: handleChange,
            className: errors.leader_name ? 'border-red-500' : '',
            disabled: isSubmitting
          }), errors.leader_name && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.leader_name
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              htmlFor: "meeting_day",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Meeting Day ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("select", {
              id: "meeting_day",
              name: "meeting_day",
              value: formData.meeting_day,
              onChange: handleChange,
              className: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              disabled: isSubmitting,
              children: daysOfWeek.map(function (day) {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: day,
                  children: day
                }, day);
              })
            }), errors.meeting_day && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.meeting_day
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              htmlFor: "meeting_time",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Meeting Time ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "meeting_time",
              name: "meeting_time",
              type: "time",
              value: formData.meeting_time,
              onChange: handleChange,
              className: errors.meeting_time ? 'border-red-500' : '',
              disabled: isSubmitting
            }), errors.meeting_time && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.meeting_time
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            htmlFor: "location",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: ["Location ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
            id: "location",
            name: "location",
            type: "text",
            placeholder: "e.g., Church Fellowship Hall",
            value: formData.location,
            onChange: handleChange,
            className: errors.location ? 'border-red-500' : '',
            disabled: isSubmitting
          }), errors.location && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.location
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
            children: isSubmitting ? 'Saving...' : smallGroup ? 'Update Group' : 'Add Group'
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SmallGroupForm);

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

/***/ "./resources/js/pages/SmallGroups.tsx"
/*!********************************************!*\
  !*** ./resources/js/pages/SmallGroups.tsx ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/users.js");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/smallGroupApi */ "./resources/js/lib/smallGroupApi.ts");
/* harmony import */ var _components_smallgroups_SmallGroupForm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/smallgroups/SmallGroupForm */ "./resources/js/components/smallgroups/SmallGroupForm.tsx");
/* harmony import */ var _components_smallgroups_DeleteSmallGroupDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/smallgroups/DeleteSmallGroupDialog */ "./resources/js/components/smallgroups/DeleteSmallGroupDialog.tsx");
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
 * SmallGroups Page Component
 *
 * Displays a list of small groups with member counts and management capabilities.
 *
 * Features:
 * - Display list of small groups with member counts
 * - Add new small groups (admin only)
 * - View small group details
 * - Responsive grid layout
 *
 * Validates Requirements: 8.4, 8.5
 */
var SmallGroups = function SmallGroups() {
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_4__.useAuth)(),
    user = _useAuth.user;
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_5__.useToast)(),
    showToast = _useToast.showToast;
  var isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'admin';
  // State management
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    smallGroups = _useState2[0],
    setSmallGroups = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isFormOpen = _useState6[0],
    setIsFormOpen = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedGroup = _useState8[0],
    setSelectedGroup = _useState8[1];
  // Delete dialog state
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    isDeleteDialogOpen = _useState0[0],
    setIsDeleteDialogOpen = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState10 = _slicedToArray(_useState1, 2),
    deletingGroup = _useState10[0],
    setDeletingGroup = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isDeleting = _useState12[0],
    setIsDeleting = _useState12[1];
  /**
   * Load small groups on mount
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    loadSmallGroups();
  }, []);
  /**
   * Fetch small groups from API
   */
  var loadSmallGroups = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setIsLoading(true);
            _context.n = 1;
            return _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_8__.smallGroupApi.getSmallGroups();
          case 1:
            data = _context.v;
            setSmallGroups(data);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            showToast('error', 'Failed to load small groups');
            console.error('Error loading small groups:', _t);
          case 3:
            _context.p = 3;
            setIsLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function loadSmallGroups() {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Handle add small group button click
   */
  var handleAddClick = function handleAddClick() {
    setSelectedGroup(null);
    setIsFormOpen(true);
  };
  /**
   * Handle edit small group button click
   */
  var handleEditClick = function handleEditClick(group) {
    setSelectedGroup(group);
    setIsFormOpen(true);
  };
  /**
   * Handle form close
   */
  var handleFormClose = function handleFormClose() {
    setIsFormOpen(false);
    setSelectedGroup(null);
  };
  /**
   * Handle form submission
   */
  var handleFormSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(data) {
      var _error$response, errorMessage, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            if (!selectedGroup) {
              _context2.n = 2;
              break;
            }
            _context2.n = 1;
            return _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_8__.smallGroupApi.updateSmallGroup(selectedGroup.id, data);
          case 1:
            showToast('success', 'Small group updated successfully');
            _context2.n = 4;
            break;
          case 2:
            _context2.n = 3;
            return _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_8__.smallGroupApi.createSmallGroup(data);
          case 3:
            showToast('success', 'Small group created successfully');
          case 4:
            _context2.n = 5;
            return loadSmallGroups();
          case 5:
            _context2.n = 7;
            break;
          case 6:
            _context2.p = 6;
            _t2 = _context2.v;
            errorMessage = ((_error$response = _t2.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Failed to save small group';
            showToast('error', errorMessage);
            throw _t2;
          case 7:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 6]]);
    }));
    return function handleFormSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Handle delete small group button click
   */
  var handleDeleteClick = function handleDeleteClick(group) {
    setDeletingGroup(group);
    setIsDeleteDialogOpen(true);
  };
  /**
   * Handle delete confirmation
   */
  var handleConfirmDelete = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _error$response2, errorMessage, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (deletingGroup) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            setIsDeleting(true);
            _context3.p = 2;
            _context3.n = 3;
            return _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_8__.smallGroupApi.deleteSmallGroup(deletingGroup.id);
          case 3:
            showToast('success', 'Small group deleted successfully');
            // Refresh small groups list
            _context3.n = 4;
            return loadSmallGroups();
          case 4:
            setIsDeleteDialogOpen(false);
            setDeletingGroup(null);
            _context3.n = 6;
            break;
          case 5:
            _context3.p = 5;
            _t3 = _context3.v;
            errorMessage = ((_error$response2 = _t3.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || 'Failed to delete small group';
            showToast('error', errorMessage);
          case 6:
            _context3.p = 6;
            setIsDeleting(false);
            return _context3.f(6);
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 5, 6, 7]]);
    }));
    return function handleConfirmDelete() {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Handle close delete dialog
   */
  var handleCloseDeleteDialog = function handleCloseDeleteDialog() {
    if (!isDeleting) {
      setIsDeleteDialogOpen(false);
      setDeletingGroup(null);
    }
  };
  /**
   * Format meeting day and time for display
   */
  var formatMeetingTime = function formatMeetingTime(day, time) {
    return "".concat(day, "s at ").concat(time);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
          className: "text-2xl font-bold text-gray-900",
          children: "Small Groups"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-gray-600 mt-1",
          children: "Manage fellowship groups and community connections"
        })]
      }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
        onClick: handleAddClick,
        className: "w-full sm:w-auto",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "h-4 w-4 mr-2"
        }), "Add Small Group"]
      })]
    }), isLoading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "text-center py-12",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-gray-600",
        children: "Loading small groups..."
      })
    }), !isLoading && smallGroups.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "text-center py-12",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
        className: "text-gray-600",
        children: ["No small groups yet. ", isAdmin && 'Click "Add Small Group" to create one.']
      })
    }), !isLoading && smallGroups.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      children: smallGroups.map(function (group) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_7__.Card, {
          className: "p-6 hover:shadow-lg transition-shadow",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-start justify-between mb-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex-1",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                className: "text-lg font-semibold text-gray-900 mb-1",
                children: group.name
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: "text-sm text-gray-600",
                children: ["Led by ", group.leader_name]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                className: "h-4 w-4"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-medium",
                children: group.member_count || 0
              })]
            })]
          }), group.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-gray-600 mb-4 line-clamp-2",
            children: group.description
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-2 text-sm",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center text-gray-600",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "font-medium mr-2",
                children: "Meets:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                children: formatMeetingTime(group.meeting_day, group.meeting_time)
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center text-gray-600",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "font-medium mr-2",
                children: "Location:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                children: group.location
              })]
            })]
          }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "mt-4 pt-4 border-t border-gray-200 flex gap-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
              variant: "outline",
              size: "sm",
              className: "flex-1",
              onClick: function onClick() {
                return handleEditClick(group);
              },
              children: "Edit"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
              variant: "outline",
              size: "sm",
              className: "flex-1 text-red-600 hover:text-red-700 hover:bg-red-50",
              onClick: function onClick() {
                return handleDeleteClick(group);
              },
              children: "Delete"
            })]
          })]
        }, group.id);
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_smallgroups_SmallGroupForm__WEBPACK_IMPORTED_MODULE_9__["default"], {
      isOpen: isFormOpen,
      onClose: handleFormClose,
      onSubmit: handleFormSubmit,
      smallGroup: selectedGroup
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_smallgroups_DeleteSmallGroupDialog__WEBPACK_IMPORTED_MODULE_10__["default"], {
      isOpen: isDeleteDialogOpen,
      onClose: handleCloseDeleteDialog,
      onConfirm: handleConfirmDelete,
      smallGroup: deletingGroup,
      isDeleting: isDeleting
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SmallGroups);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX1NtYWxsR3JvdXBzX3RzeC5qcz9pZD00NDBlZjU5OTY0ZjU4ZDEwIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLCtCQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEM7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQztBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLE1BQU07QUFDbEI7QUFDTztBQUNQLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FB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Q1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1RixTQUFTLGdCQUFnQjtBQUNoSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9hcmlhLWhpZGRlbi9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zbWFsbGdyb3Vwcy9EZWxldGVTbWFsbEdyb3VwRGlhbG9nLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9zbWFsbGdyb3Vwcy9TbWFsbEdyb3VwRm9ybS50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdWkvZGlhbG9nLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9pbnB1dC50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2xpYi9zbWFsbEdyb3VwQXBpLnRzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9wYWdlcy9TbWFsbEdyb3Vwcy50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2dldC1ub25jZS9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3BsdXMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvQ29tYmluYXRpb24uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvU2lkZUVmZmVjdC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9VSS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9hZ2dyZXNpdmVDYXB0dXJlLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L2hhbmRsZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9tZWRpdW0uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvc2lkZWNhci5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L2hvb2suanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L3NpbmdsZXRvbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzMjAxNS9hc3NpZ25SZWYuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlTWVyZ2VSZWYuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlUmVmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2Utc2lkZWNhci9kaXN0L2VzMjAxNS9leHBvcnRzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2Utc2lkZWNhci9kaXN0L2VzMjAxNS9tZWRpdW0uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9wcmltaXRpdmUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1jb250ZXh0L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZGlhbG9nL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZGlhbG9nL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3Qtc2xvdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWRpc21pc3NhYmxlLWxheWVyL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZm9jdXMtZ3VhcmRzL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZm9jdXMtc2NvcGUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1pZC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXBvcnRhbC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXByZXNlbmNlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3Qtc2xvdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWYvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtY29udHJvbGxhYmxlLXN0YXRlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWVmZmVjdC1ldmVudC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1lc2NhcGUta2V5ZG93bi9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBnZXREZWZhdWx0UGFyZW50ID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzYW1wbGVUYXJnZXQgPSBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0WzBdIDogb3JpZ2luYWxUYXJnZXQ7XG4gICAgcmV0dXJuIHNhbXBsZVRhcmdldC5vd25lckRvY3VtZW50LmJvZHk7XG59O1xudmFyIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xudmFyIHVuY29udHJvbGxlZE5vZGVzID0gbmV3IFdlYWtNYXAoKTtcbnZhciBtYXJrZXJNYXAgPSB7fTtcbnZhciBsb2NrQ291bnQgPSAwO1xudmFyIHVud3JhcEhvc3QgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBub2RlICYmIChub2RlLmhvc3QgfHwgdW53cmFwSG9zdChub2RlLnBhcmVudE5vZGUpKTtcbn07XG52YXIgY29ycmVjdFRhcmdldHMgPSBmdW5jdGlvbiAocGFyZW50LCB0YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRhcmdldHNcbiAgICAgICAgLm1hcChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChwYXJlbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29ycmVjdGVkVGFyZ2V0ID0gdW53cmFwSG9zdCh0YXJnZXQpO1xuICAgICAgICBpZiAoY29ycmVjdGVkVGFyZ2V0ICYmIHBhcmVudC5jb250YWlucyhjb3JyZWN0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29ycmVjdGVkVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FyaWEtaGlkZGVuJywgdGFyZ2V0LCAnaW4gbm90IGNvbnRhaW5lZCBpbnNpZGUnLCBwYXJlbnQsICcuIERvaW5nIG5vdGhpbmcnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4gQm9vbGVhbih4KTsgfSk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBhcmlhLWhpZGRlblxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NvbnRyb2xBdHRyaWJ1dGVdIC0gaHRtbCBBdHRyaWJ1dGUgdG8gY29udHJvbFxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbnZhciBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lLCBjb250cm9sQXR0cmlidXRlKSB7XG4gICAgdmFyIHRhcmdldHMgPSBjb3JyZWN0VGFyZ2V0cyhwYXJlbnROb2RlLCBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgaWYgKCFtYXJrZXJNYXBbbWFya2VyTmFtZV0pIHtcbiAgICAgICAgbWFya2VyTWFwW21hcmtlck5hbWVdID0gbmV3IFdlYWtNYXAoKTtcbiAgICB9XG4gICAgdmFyIG1hcmtlckNvdW50ZXIgPSBtYXJrZXJNYXBbbWFya2VyTmFtZV07XG4gICAgdmFyIGhpZGRlbk5vZGVzID0gW107XG4gICAgdmFyIGVsZW1lbnRzVG9LZWVwID0gbmV3IFNldCgpO1xuICAgIHZhciBlbGVtZW50c1RvU3RvcCA9IG5ldyBTZXQodGFyZ2V0cyk7XG4gICAgdmFyIGtlZXAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKCFlbCB8fCBlbGVtZW50c1RvS2VlcC5oYXMoZWwpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudHNUb0tlZXAuYWRkKGVsKTtcbiAgICAgICAga2VlcChlbC5wYXJlbnROb2RlKTtcbiAgICB9O1xuICAgIHRhcmdldHMuZm9yRWFjaChrZWVwKTtcbiAgICB2YXIgZGVlcCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKCFwYXJlbnQgfHwgZWxlbWVudHNUb1N0b3AuaGFzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHBhcmVudC5jaGlsZHJlbiwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50c1RvS2VlcC5oYXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBkZWVwKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBub2RlLmdldEF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFscmVhZHlIaWRkZW4gPSBhdHRyICE9PSBudWxsICYmIGF0dHIgIT09ICdmYWxzZSc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3VudGVyVmFsdWUgPSAoY291bnRlck1hcC5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya2VyVmFsdWUgPSAobWFya2VyQ291bnRlci5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyTWFwLnNldChub2RlLCBjb3VudGVyVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbk5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyVmFsdWUgPT09IDEgJiYgYWxyZWFkeUhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMuc2V0KG5vZGUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXJWYWx1ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobWFya2VyTmFtZSwgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignYXJpYS1oaWRkZW46IGNhbm5vdCBvcGVyYXRlIG9uICcsIG5vZGUsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBkZWVwKHBhcmVudE5vZGUpO1xuICAgIGVsZW1lbnRzVG9LZWVwLmNsZWFyKCk7XG4gICAgbG9ja0NvdW50Kys7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGlkZGVuTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIGNvdW50ZXJWYWx1ZSA9IGNvdW50ZXJNYXAuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIHZhciBtYXJrZXJWYWx1ZSA9IG1hcmtlckNvdW50ZXIuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAuc2V0KG5vZGUsIGNvdW50ZXJWYWx1ZSk7XG4gICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWNvdW50ZXJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdW5jb250cm9sbGVkTm9kZXMuaGFzKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1bmNvbnRyb2xsZWROb2Rlcy5kZWxldGUobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW1hcmtlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobWFya2VyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NrQ291bnQtLTtcbiAgICAgICAgaWYgKCFsb2NrQ291bnQpIHtcbiAgICAgICAgICAgIC8vIGNsZWFyXG4gICAgICAgICAgICBjb3VudGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgbWFya2VyTWFwID0ge307XG4gICAgICAgIH1cbiAgICB9O1xufTtcbi8qKlxuICogTWFya3MgZXZlcnl0aGluZyBleGNlcHQgZ2l2ZW4gbm9kZShvciBub2RlcykgYXMgYXJpYS1oaWRkZW5cbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgaGlkZU90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWFyaWEtaGlkZGVuJzsgfVxuICAgIHZhciB0YXJnZXRzID0gQXJyYXkuZnJvbShBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgdmFyIGFjdGl2ZVBhcmVudE5vZGUgPSBwYXJlbnROb2RlIHx8IGdldERlZmF1bHRQYXJlbnQob3JpZ2luYWxUYXJnZXQpO1xuICAgIGlmICghYWN0aXZlUGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfTtcbiAgICB9XG4gICAgLy8gd2Ugc2hvdWxkIG5vdCBoaWRlIGFyaWEtbGl2ZSBlbGVtZW50cyAtIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvYXJpYS1oaWRkZW4vaXNzdWVzLzEwXG4gICAgLy8gYW5kIHNjcmlwdCBlbGVtZW50cywgYXMgdGhleSBoYXZlIG5vIGltcGFjdCBvbiBhY2Nlc3NpYmlsaXR5LlxuICAgIHRhcmdldHMucHVzaC5hcHBseSh0YXJnZXRzLCBBcnJheS5mcm9tKGFjdGl2ZVBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtbGl2ZV0sIHNjcmlwdCcpKSk7XG4gICAgcmV0dXJuIGFwcGx5QXR0cmlidXRlVG9PdGhlcnModGFyZ2V0cywgYWN0aXZlUGFyZW50Tm9kZSwgbWFya2VyTmFtZSwgJ2FyaWEtaGlkZGVuJyk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBpbmVydFxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcmV0dXJuIHtVbmRvfSB1bmRvIGNvbW1hbmRcbiAqL1xuZXhwb3J0IHZhciBpbmVydE90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWluZXJ0LWVkJzsgfVxuICAgIHZhciBhY3RpdmVQYXJlbnROb2RlID0gcGFyZW50Tm9kZSB8fCBnZXREZWZhdWx0UGFyZW50KG9yaWdpbmFsVGFyZ2V0KTtcbiAgICBpZiAoIWFjdGl2ZVBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH07XG4gICAgfVxuICAgIHJldHVybiBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzKG9yaWdpbmFsVGFyZ2V0LCBhY3RpdmVQYXJlbnROb2RlLCBtYXJrZXJOYW1lLCAnaW5lcnQnKTtcbn07XG4vKipcbiAqIEByZXR1cm5zIGlmIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBpbmVydFxuICovXG5leHBvcnQgdmFyIHN1cHBvcnRzSW5lcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgSFRNTEVsZW1lbnQucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdpbmVydCcpO1xufTtcbi8qKlxuICogQXV0b21hdGljIGZ1bmN0aW9uIHRvIFwic3VwcHJlc3NcIiBET00gZWxlbWVudHMgLSBfaGlkZV8gb3IgX2luZXJ0XyBpbiB0aGUgYmVzdCBwb3NzaWJsZSB3YXlcbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgc3VwcHJlc3NPdGhlcnMgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpIHtcbiAgICBpZiAobWFya2VyTmFtZSA9PT0gdm9pZCAwKSB7IG1hcmtlck5hbWUgPSAnZGF0YS1zdXBwcmVzc2VkJzsgfVxuICAgIHJldHVybiAoc3VwcG9ydHNJbmVydCgpID8gaW5lcnRPdGhlcnMgOiBoaWRlT3RoZXJzKShvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSk7XG59O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nQ29udGVudCwgRGlhbG9nSGVhZGVyLCBEaWFsb2dUaXRsZSwgRGlhbG9nRm9vdGVyLCB9IGZyb20gJy4uL3VpL2RpYWxvZyc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi91aS9idXR0b24nO1xuaW1wb3J0IHsgQWxlcnRUcmlhbmdsZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG4vKipcbiAqIERlbGV0ZVNtYWxsR3JvdXBEaWFsb2cgQ29tcG9uZW50XG4gKlxuICogQ29uZmlybWF0aW9uIGRpYWxvZyBmb3IgZGVsZXRpbmcgYSBzbWFsbCBncm91cC5cbiAqXG4gKiBGZWF0dXJlczpcbiAqIC0gV2FybmluZyBtZXNzYWdlIGFib3V0IHBlcm1hbmVudCBkZWxldGlvblxuICogLSBEaXNwbGF5IHNtYWxsIGdyb3VwIG5hbWUgZm9yIGNvbmZpcm1hdGlvblxuICogLSBEaXNhYmxlIGFjdGlvbnMgd2hpbGUgZGVsZXRpb24gaXMgaW4gcHJvZ3Jlc3NcbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiA4LjRcbiAqL1xuY29uc3QgRGVsZXRlU21hbGxHcm91cERpYWxvZyA9ICh7IGlzT3Blbiwgb25DbG9zZSwgb25Db25maXJtLCBzbWFsbEdyb3VwLCBpc0RlbGV0aW5nID0gZmFsc2UsIH0pID0+IHtcbiAgICBpZiAoIXNtYWxsR3JvdXApXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIHJldHVybiAoX2pzeChEaWFsb2csIHsgb3BlbjogaXNPcGVuLCBvbk9wZW5DaGFuZ2U6IG9uQ2xvc2UsIGNoaWxkcmVuOiBfanN4cyhEaWFsb2dDb250ZW50LCB7IGNsYXNzTmFtZTogXCJtYXgtdy1tZFwiLCBjaGlsZHJlbjogW19qc3goRGlhbG9nSGVhZGVyLCB7IGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBoLTEwIHctMTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBiZy1yZWQtMTAwXCIsIGNoaWxkcmVuOiBfanN4KEFsZXJ0VHJpYW5nbGUsIHsgY2xhc3NOYW1lOiBcImgtNSB3LTUgdGV4dC1yZWQtNjAwXCIgfSkgfSksIF9qc3goRGlhbG9nVGl0bGUsIHsgY2hpbGRyZW46IFwiRGVsZXRlIFNtYWxsIEdyb3VwXCIgfSldIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweS00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogW1wiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBcIiwgX2pzeChcInN0cm9uZ1wiLCB7IGNoaWxkcmVuOiBzbWFsbEdyb3VwLm5hbWUgfSksIFwiP1wiXSB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNjAwIG10LTJcIiwgY2hpbGRyZW46IFwiVGhpcyBhY3Rpb24gY2Fubm90IGJlIHVuZG9uZS4gTWVtYmVycyBjdXJyZW50bHkgYXNzaWduZWQgdG8gdGhpcyBncm91cCB3aWxsIG5vIGxvbmdlciBoYXZlIGEgc21hbGwgZ3JvdXAgYXNzaWdubWVudC5cIiB9KV0gfSksIF9qc3hzKERpYWxvZ0Zvb3RlciwgeyBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiBvbkNsb3NlLCBkaXNhYmxlZDogaXNEZWxldGluZywgY2hpbGRyZW46IFwiQ2FuY2VsXCIgfSksIF9qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwiZGVzdHJ1Y3RpdmVcIiwgb25DbGljazogb25Db25maXJtLCBkaXNhYmxlZDogaXNEZWxldGluZywgY2hpbGRyZW46IGlzRGVsZXRpbmcgPyAnRGVsZXRpbmcuLi4nIDogJ0RlbGV0ZSBHcm91cCcgfSldIH0pXSB9KSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRGVsZXRlU21hbGxHcm91cERpYWxvZztcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRGlhbG9nLCBEaWFsb2dDb250ZW50LCBEaWFsb2dIZWFkZXIsIERpYWxvZ1RpdGxlLCBEaWFsb2dGb290ZXIsIH0gZnJvbSAnLi4vdWkvZGlhbG9nJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL3VpL2J1dHRvbic7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4uL3VpL2lucHV0Jztcbi8qKlxuICogU21hbGxHcm91cEZvcm0gQ29tcG9uZW50XG4gKlxuICogRm9ybSBmb3IgYWRkaW5nIG9yIGVkaXRpbmcgc21hbGwgZ3JvdXAgcmVjb3Jkcy5cbiAqXG4gKiBGZWF0dXJlczpcbiAqIC0gSW5wdXQgZmllbGRzIGZvciBuYW1lLCBkZXNjcmlwdGlvbiwgbGVhZGVyLCBtZWV0aW5nIGRldGFpbHNcbiAqIC0gRm9ybSB2YWxpZGF0aW9uIHdpdGggaW5saW5lIGVycm9yIG1lc3NhZ2VzXG4gKiAtIFN1cHBvcnQgZm9yIGJvdGggY3JlYXRlIGFuZCBlZGl0IG1vZGVzXG4gKiAtIE1lZXRpbmcgZGF5IGRyb3Bkb3duIHdpdGggYWxsIGRheXMgb2YgdGhlIHdlZWtcbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiA4LjRcbiAqL1xuY29uc3QgU21hbGxHcm91cEZvcm0gPSAoeyBpc09wZW4sIG9uQ2xvc2UsIG9uU3VibWl0LCBzbWFsbEdyb3VwID0gbnVsbCwgaXNMb2FkaW5nID0gZmFsc2UsIH0pID0+IHtcbiAgICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICBsZWFkZXJfbmFtZTogJycsXG4gICAgICAgIG1lZXRpbmdfZGF5OiAnU3VuZGF5JyxcbiAgICAgICAgbWVldGluZ190aW1lOiAnMTg6MDAnLFxuICAgICAgICBsb2NhdGlvbjogJycsXG4gICAgfSk7XG4gICAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlKHt9KTtcbiAgICBjb25zdCBbaXNTdWJtaXR0aW5nLCBzZXRJc1N1Ym1pdHRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIC8vIERheXMgb2YgdGhlIHdlZWsgZm9yIGRyb3Bkb3duXG4gICAgY29uc3QgZGF5c09mV2VlayA9IFtcbiAgICAgICAgJ01vbmRheScsXG4gICAgICAgICdUdWVzZGF5JyxcbiAgICAgICAgJ1dlZG5lc2RheScsXG4gICAgICAgICdUaHVyc2RheScsXG4gICAgICAgICdGcmlkYXknLFxuICAgICAgICAnU2F0dXJkYXknLFxuICAgICAgICAnU3VuZGF5JyxcbiAgICBdO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgZm9ybSBkYXRhIHdoZW4gc21hbGxHcm91cCBwcm9wIGNoYW5nZXNcbiAgICAgKi9cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoc21hbGxHcm91cCkge1xuICAgICAgICAgICAgc2V0Rm9ybURhdGEoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHNtYWxsR3JvdXAubmFtZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogc21hbGxHcm91cC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBsZWFkZXJfbmFtZTogc21hbGxHcm91cC5sZWFkZXJfbmFtZSxcbiAgICAgICAgICAgICAgICBtZWV0aW5nX2RheTogc21hbGxHcm91cC5tZWV0aW5nX2RheSxcbiAgICAgICAgICAgICAgICBtZWV0aW5nX3RpbWU6IHNtYWxsR3JvdXAubWVldGluZ190aW1lLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBzbWFsbEdyb3VwLmxvY2F0aW9uLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXNldCBmb3JtIGZvciBuZXcgc21hbGwgZ3JvdXBcbiAgICAgICAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogbnVsbCxcbiAgICAgICAgICAgICAgICBsZWFkZXJfbmFtZTogJycsXG4gICAgICAgICAgICAgICAgbWVldGluZ19kYXk6ICdTdW5kYXknLFxuICAgICAgICAgICAgICAgIG1lZXRpbmdfdGltZTogJzE4OjAwJyxcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJycsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXRFcnJvcnMoe30pO1xuICAgIH0sIFtzbWFsbEdyb3VwLCBpc09wZW5dKTtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBmb3JtIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdCB2YWxpZGF0ZUZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0Vycm9ycyA9IHt9O1xuICAgICAgICAvLyBSZXF1aXJlZCBmaWVsZHNcbiAgICAgICAgaWYgKCFmb3JtRGF0YS5uYW1lLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLm5hbWUgPSAnR3JvdXAgbmFtZSBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZm9ybURhdGEubmFtZS5sZW5ndGggPiAxMDApIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5uYW1lID0gJ0dyb3VwIG5hbWUgbXVzdCBiZSAxMDAgY2hhcmFjdGVycyBvciBsZXNzJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLmxlYWRlcl9uYW1lLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmxlYWRlcl9uYW1lID0gJ0xlYWRlciBuYW1lIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtRGF0YS5sZWFkZXJfbmFtZS5sZW5ndGggPiAxMDApIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5sZWFkZXJfbmFtZSA9ICdMZWFkZXIgbmFtZSBtdXN0IGJlIDEwMCBjaGFyYWN0ZXJzIG9yIGxlc3MnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEubWVldGluZ19kYXkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5tZWV0aW5nX2RheSA9ICdNZWV0aW5nIGRheSBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWRheXNPZldlZWsuaW5jbHVkZXMoZm9ybURhdGEubWVldGluZ19kYXkpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMubWVldGluZ19kYXkgPSAnUGxlYXNlIHNlbGVjdCBhIHZhbGlkIGRheSBvZiB0aGUgd2Vlayc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5tZWV0aW5nX3RpbWUpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5tZWV0aW5nX3RpbWUgPSAnTWVldGluZyB0aW1lIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghL14oWzAtMV0/WzAtOV18MlswLTNdKTpbMC01XVswLTldJC8udGVzdChmb3JtRGF0YS5tZWV0aW5nX3RpbWUpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMubWVldGluZ190aW1lID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIHRpbWUgKEhIOk1NKSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5sb2NhdGlvbi50cmltKCkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5sb2NhdGlvbiA9ICdMb2NhdGlvbiBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZm9ybURhdGEubG9jYXRpb24ubGVuZ3RoID4gMjAwKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMubG9jYXRpb24gPSAnTG9jYXRpb24gbXVzdCBiZSAyMDAgY2hhcmFjdGVycyBvciBsZXNzJztcbiAgICAgICAgfVxuICAgICAgICBzZXRFcnJvcnMobmV3RXJyb3JzKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG5ld0Vycm9ycykubGVuZ3RoID09PSAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGlucHV0IGNoYW5nZVxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGUudGFyZ2V0O1xuICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBbbmFtZV06IHZhbHVlLFxuICAgICAgICB9KSk7XG4gICAgICAgIC8vIENsZWFyIGVycm9yIGZvciB0aGlzIGZpZWxkIHdoZW4gdXNlciBzdGFydHMgdHlwaW5nXG4gICAgICAgIGlmIChlcnJvcnNbbmFtZV0pIHtcbiAgICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIFtuYW1lXTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZm9ybSBzdWJtaXNzaW9uXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoIXZhbGlkYXRlRm9ybSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgb25TdWJtaXQoZm9ybURhdGEpO1xuICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHNlcnZlci1zaWRlIHZhbGlkYXRpb24gZXJyb3JzXG4gICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2U/LmRhdGE/LmVycm9ycykge1xuICAgICAgICAgICAgICAgIHNldEVycm9ycyhlcnJvci5yZXNwb25zZS5kYXRhLmVycm9ycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEb24ndCBjbG9zZSB0aGUgZm9ybSBpZiB0aGVyZSdzIGFuIGVycm9yXG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc1N1Ym1pdHRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKF9qc3goRGlhbG9nLCB7IG9wZW46IGlzT3Blbiwgb25PcGVuQ2hhbmdlOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBEb24ndCBhdXRvbWF0aWNhbGx5IGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgICAgICAgIC8vIFRoZSBkaWFsb2cgd2lsbCBvbmx5IGNsb3NlIHdoZW4gb25DbG9zZSBpcyBleHBsaWNpdGx5IGNhbGxlZFxuICAgICAgICB9LCBjaGlsZHJlbjogX2pzeHMoRGlhbG9nQ29udGVudCwgeyBjbGFzc05hbWU6IFwibWF4LXctMnhsIG1heC1oLVs5MHZoXSBvdmVyZmxvdy15LWF1dG9cIiwgY2hpbGRyZW46IFtfanN4KERpYWxvZ0hlYWRlciwgeyBjaGlsZHJlbjogX2pzeChEaWFsb2dUaXRsZSwgeyBjaGlsZHJlbjogc21hbGxHcm91cCA/ICdFZGl0IFNtYWxsIEdyb3VwJyA6ICdBZGQgTmV3IFNtYWxsIEdyb3VwJyB9KSB9KSwgX2pzeHMoXCJmb3JtXCIsIHsgb25TdWJtaXQ6IGhhbmRsZVN1Ym1pdCwgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJuYW1lXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiR3JvdXAgTmFtZSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwibmFtZVwiLCBuYW1lOiBcIm5hbWVcIiwgdHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiBcImUuZy4sIFlvdW5nIEFkdWx0cyBGZWxsb3dzaGlwXCIsIHZhbHVlOiBmb3JtRGF0YS5uYW1lLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5uYW1lID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMubmFtZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLm5hbWUgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwiZGVzY3JpcHRpb25cIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIkRlc2NyaXB0aW9uXCIgfSksIF9qc3goXCJ0ZXh0YXJlYVwiLCB7IGlkOiBcImRlc2NyaXB0aW9uXCIsIG5hbWU6IFwiZGVzY3JpcHRpb25cIiwgcm93czogMywgdmFsdWU6IGZvcm1EYXRhLmRlc2NyaXB0aW9uIHx8ICcnLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IFwidy1mdWxsIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1pbnB1dCBiZy1iYWNrZ3JvdW5kIHB4LTMgcHktMiB0ZXh0LXNtIHJpbmctb2Zmc2V0LWJhY2tncm91bmQgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXJpbmcgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC0yXCIsIHBsYWNlaG9sZGVyOiBcIkJyaWVmIGRlc2NyaXB0aW9uIG9mIHRoZSBncm91cCdzIHB1cnBvc2UgYW5kIGFjdGl2aXRpZXMuLi5cIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZyB9KSwgZXJyb3JzLmRlc2NyaXB0aW9uICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuZGVzY3JpcHRpb24gfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImxlYWRlcl9uYW1lXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiTGVhZGVyIE5hbWUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcImxlYWRlcl9uYW1lXCIsIG5hbWU6IFwibGVhZGVyX25hbWVcIiwgdHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiBcImUuZy4sIEpvaG4gU21pdGhcIiwgdmFsdWU6IGZvcm1EYXRhLmxlYWRlcl9uYW1lLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5sZWFkZXJfbmFtZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZyB9KSwgZXJyb3JzLmxlYWRlcl9uYW1lICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMubGVhZGVyX25hbWUgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJtZWV0aW5nX2RheVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIk1lZXRpbmcgRGF5IFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChcInNlbGVjdFwiLCB7IGlkOiBcIm1lZXRpbmdfZGF5XCIsIG5hbWU6IFwibWVldGluZ19kYXlcIiwgdmFsdWU6IGZvcm1EYXRhLm1lZXRpbmdfZGF5LCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IFwiaC0xMCB3LWZ1bGwgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWlucHV0IGJnLWJhY2tncm91bmQgcHgtMyBweS0yIHRleHQtc20gcmluZy1vZmZzZXQtYmFja2dyb3VuZCBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcmluZyBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTJcIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2hpbGRyZW46IGRheXNPZldlZWsubWFwKChkYXkpID0+IChfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IGRheSwgY2hpbGRyZW46IGRheSB9LCBkYXkpKSkgfSksIGVycm9ycy5tZWV0aW5nX2RheSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLm1lZXRpbmdfZGF5IH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJtZWV0aW5nX3RpbWVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJNZWV0aW5nIFRpbWUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcIm1lZXRpbmdfdGltZVwiLCBuYW1lOiBcIm1lZXRpbmdfdGltZVwiLCB0eXBlOiBcInRpbWVcIiwgdmFsdWU6IGZvcm1EYXRhLm1lZXRpbmdfdGltZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMubWVldGluZ190aW1lID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMubWVldGluZ190aW1lICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMubWVldGluZ190aW1lIH0pKV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibG9jYXRpb25cIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJMb2NhdGlvbiBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwibG9jYXRpb25cIiwgbmFtZTogXCJsb2NhdGlvblwiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiZS5nLiwgQ2h1cmNoIEZlbGxvd3NoaXAgSGFsbFwiLCB2YWx1ZTogZm9ybURhdGEubG9jYXRpb24sIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmxvY2F0aW9uID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMubG9jYXRpb24gJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5sb2NhdGlvbiB9KSldIH0pLCBfanN4cyhEaWFsb2dGb290ZXIsIHsgY2xhc3NOYW1lOiBcIm10LTZcIiwgY2hpbGRyZW46IFtfanN4KEJ1dHRvbiwgeyB0eXBlOiBcImJ1dHRvblwiLCB2YXJpYW50OiBcIm91dGxpbmVcIiwgb25DbGljazogb25DbG9zZSwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2hpbGRyZW46IFwiQ2FuY2VsXCIgfSksIF9qc3goQnV0dG9uLCB7IHR5cGU6IFwic3VibWl0XCIsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfHwgaXNMb2FkaW5nLCBjaGlsZHJlbjogaXNTdWJtaXR0aW5nID8gJ1NhdmluZy4uLicgOiBzbWFsbEdyb3VwID8gJ1VwZGF0ZSBHcm91cCcgOiAnQWRkIEdyb3VwJyB9KV0gfSldIH0pXSB9KSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU21hbGxHcm91cEZvcm07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBEaWFsb2dQcmltaXRpdmUgZnJvbSBcIkByYWRpeC11aS9yZWFjdC1kaWFsb2dcIjtcbmltcG9ydCB7IFggfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCIuLi8uLi9saWIvdXRpbHNcIjtcbmNvbnN0IERpYWxvZyA9IERpYWxvZ1ByaW1pdGl2ZS5Sb290O1xuY29uc3QgRGlhbG9nVHJpZ2dlciA9IERpYWxvZ1ByaW1pdGl2ZS5UcmlnZ2VyO1xuY29uc3QgRGlhbG9nUG9ydGFsID0gRGlhbG9nUHJpbWl0aXZlLlBvcnRhbDtcbmNvbnN0IERpYWxvZ0Nsb3NlID0gRGlhbG9nUHJpbWl0aXZlLkNsb3NlO1xuY29uc3QgRGlhbG9nT3ZlcmxheSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5PdmVybGF5LCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLWJhY2tncm91bmQvODAgYmFja2Ryb3AtYmx1ci1zbSBkYXRhLVtzdGF0ZT1vcGVuXTphbmltYXRlLWluIGRhdGEtW3N0YXRlPWNsb3NlZF06YW5pbWF0ZS1vdXQgZGF0YS1bc3RhdGU9Y2xvc2VkXTpmYWRlLW91dC0wIGRhdGEtW3N0YXRlPW9wZW5dOmZhZGUtaW4tMFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nT3ZlcmxheS5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5PdmVybGF5LmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nQ29udGVudCA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeHMoRGlhbG9nUG9ydGFsLCB7IGNoaWxkcmVuOiBbX2pzeChEaWFsb2dPdmVybGF5LCB7fSksIF9qc3hzKERpYWxvZ1ByaW1pdGl2ZS5Db250ZW50LCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiZml4ZWQgbGVmdC1bNTAlXSB0b3AtWzUwJV0gei01MCBncmlkIHctZnVsbCBtYXgtdy1sZyB0cmFuc2xhdGUteC1bLTUwJV0gdHJhbnNsYXRlLXktWy01MCVdIGdhcC00IGJvcmRlciBiZy1iYWNrZ3JvdW5kIHAtNiBzaGFkb3ctbGcgZHVyYXRpb24tMjAwIGRhdGEtW3N0YXRlPW9wZW5dOmFuaW1hdGUtaW4gZGF0YS1bc3RhdGU9Y2xvc2VkXTphbmltYXRlLW91dCBkYXRhLVtzdGF0ZT1jbG9zZWRdOmZhZGUtb3V0LTAgZGF0YS1bc3RhdGU9b3Blbl06ZmFkZS1pbi0wIGRhdGEtW3N0YXRlPWNsb3NlZF06em9vbS1vdXQtOTUgZGF0YS1bc3RhdGU9b3Blbl06em9vbS1pbi05NSBkYXRhLVtzdGF0ZT1jbG9zZWRdOnNsaWRlLW91dC10by1sZWZ0LTEvMiBkYXRhLVtzdGF0ZT1jbG9zZWRdOnNsaWRlLW91dC10by10b3AtWzQ4JV0gZGF0YS1bc3RhdGU9b3Blbl06c2xpZGUtaW4tZnJvbS1sZWZ0LTEvMiBkYXRhLVtzdGF0ZT1vcGVuXTpzbGlkZS1pbi1mcm9tLXRvcC1bNDglXSBzbTpyb3VuZGVkLWxnIG1heC1oLVs5MHZoXSBvdmVyZmxvdy15LWF1dG9cIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMsIGNoaWxkcmVuOiBbY2hpbGRyZW4sIF9qc3hzKERpYWxvZ1ByaW1pdGl2ZS5DbG9zZSwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgcmlnaHQtNCB0b3AtNCByb3VuZGVkLXNtIG9wYWNpdHktNzAgcmluZy1vZmZzZXQtYmFja2dyb3VuZCB0cmFuc2l0aW9uLW9wYWNpdHkgaG92ZXI6b3BhY2l0eS0xMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXJpbmcgZm9jdXM6cmluZy1vZmZzZXQtMiBkaXNhYmxlZDpwb2ludGVyLWV2ZW50cy1ub25lIGRhdGEtW3N0YXRlPW9wZW5dOmJnLWFjY2VudCBkYXRhLVtzdGF0ZT1vcGVuXTp0ZXh0LW11dGVkLWZvcmVncm91bmRcIiwgY2hpbGRyZW46IFtfanN4KFgsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwic3Itb25seVwiLCBjaGlsZHJlbjogXCJDbG9zZVwiIH0pXSB9KV0gfSldIH0pKSk7XG5EaWFsb2dDb250ZW50LmRpc3BsYXlOYW1lID0gRGlhbG9nUHJpbWl0aXZlLkNvbnRlbnQuZGlzcGxheU5hbWU7XG5jb25zdCBEaWFsb2dIZWFkZXIgPSAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pID0+IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbihcImZsZXggZmxleC1jb2wgc3BhY2UteS0xLjUgdGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0XCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKTtcbkRpYWxvZ0hlYWRlci5kaXNwbGF5TmFtZSA9IFwiRGlhbG9nSGVhZGVyXCI7XG5jb25zdCBEaWFsb2dGb290ZXIgPSAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pID0+IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbihcImZsZXggZmxleC1jb2wtcmV2ZXJzZSBzbTpmbGV4LXJvdyBzbTpqdXN0aWZ5LWVuZCBzbTpzcGFjZS14LTJcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpO1xuRGlhbG9nRm9vdGVyLmRpc3BsYXlOYW1lID0gXCJEaWFsb2dGb290ZXJcIjtcbmNvbnN0IERpYWxvZ1RpdGxlID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0sIHJlZikgPT4gKF9qc3goRGlhbG9nUHJpbWl0aXZlLlRpdGxlLCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwidGV4dC1sZyBmb250LXNlbWlib2xkIGxlYWRpbmctbm9uZSB0cmFja2luZy10aWdodFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nVGl0bGUuZGlzcGxheU5hbWUgPSBEaWFsb2dQcmltaXRpdmUuVGl0bGUuZGlzcGxheU5hbWU7XG5jb25zdCBEaWFsb2dEZXNjcmlwdGlvbiA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5EZXNjcmlwdGlvbiwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcInRleHQtc20gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKSk7XG5EaWFsb2dEZXNjcmlwdGlvbi5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5EZXNjcmlwdGlvbi5kaXNwbGF5TmFtZTtcbmV4cG9ydCB7IERpYWxvZywgRGlhbG9nUG9ydGFsLCBEaWFsb2dPdmVybGF5LCBEaWFsb2dDbG9zZSwgRGlhbG9nVHJpZ2dlciwgRGlhbG9nQ29udGVudCwgRGlhbG9nSGVhZGVyLCBEaWFsb2dGb290ZXIsIERpYWxvZ1RpdGxlLCBEaWFsb2dEZXNjcmlwdGlvbiwgfTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNuIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlsc1wiO1xuY29uc3QgSW5wdXQgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgdHlwZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgcmV0dXJuIChfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiB0eXBlLCBjbGFzc05hbWU6IGNuKFwiZmxleCBoLTEwIHctZnVsbCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItaW5wdXQgYmctYmFja2dyb3VuZCBweC0zIHB5LTIgdGV4dC1zbSByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIGZpbGU6Ym9yZGVyLTAgZmlsZTpiZy10cmFuc3BhcmVudCBmaWxlOnRleHQtc20gZmlsZTpmb250LW1lZGl1bSBwbGFjZWhvbGRlcjp0ZXh0LW11dGVkLWZvcmVncm91bmQgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLW5vbmUgZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXJpbmcgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC0yIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXCIsIGNsYXNzTmFtZSksIHJlZjogcmVmLCAuLi5wcm9wcyB9KSk7XG59KTtcbklucHV0LmRpc3BsYXlOYW1lID0gXCJJbnB1dFwiO1xuZXhwb3J0IHsgSW5wdXQgfTtcbiIsImltcG9ydCBhcGkgZnJvbSAnLi9hcGknO1xuLyoqXG4gKiBTbWFsbCBHcm91cCBBUEkgY2xpZW50XG4gKlxuICogUHJvdmlkZXMgbWV0aG9kcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgc21hbGwgZ3JvdXBzIEFQSSBlbmRwb2ludHMuXG4gKi9cbmV4cG9ydCBjb25zdCBzbWFsbEdyb3VwQXBpID0ge1xuICAgIC8qKlxuICAgICAqIEdldCBhbGwgc21hbGwgZ3JvdXBzXG4gICAgICovXG4gICAgYXN5bmMgZ2V0U21hbGxHcm91cHMoKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL3NtYWxsLWdyb3VwcycpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhIHx8IFtdO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogR2V0IGEgc2luZ2xlIHNtYWxsIGdyb3VwIGJ5IElEXG4gICAgICovXG4gICAgYXN5bmMgZ2V0U21hbGxHcm91cChpZCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoYC9zbWFsbC1ncm91cHMvJHtpZH1gKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBzbWFsbCBncm91cFxuICAgICAqL1xuICAgIGFzeW5jIGNyZWF0ZVNtYWxsR3JvdXAoZGF0YSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KCcvc21hbGwtZ3JvdXBzJywgZGF0YSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW4gZXhpc3Rpbmcgc21hbGwgZ3JvdXBcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVTbWFsbEdyb3VwKGlkLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChgL3NtYWxsLWdyb3Vwcy8ke2lkfWAsIGRhdGEpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgc21hbGwgZ3JvdXBcbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVTbWFsbEdyb3VwKGlkKSB7XG4gICAgICAgIGF3YWl0IGFwaS5kZWxldGUoYC9zbWFsbC1ncm91cHMvJHtpZH1gKTtcbiAgICB9LFxufTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUGx1cywgVXNlcnMgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gJy4uL2NvbnRleHRzL0F1dGhDb250ZXh0JztcbmltcG9ydCB7IHVzZVRvYXN0IH0gZnJvbSAnLi4vY29udGV4dHMvVG9hc3RDb250ZXh0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvYnV0dG9uJztcbmltcG9ydCB7IENhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2NhcmQnO1xuaW1wb3J0IHsgc21hbGxHcm91cEFwaSB9IGZyb20gJy4uL2xpYi9zbWFsbEdyb3VwQXBpJztcbmltcG9ydCBTbWFsbEdyb3VwRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL3NtYWxsZ3JvdXBzL1NtYWxsR3JvdXBGb3JtJztcbmltcG9ydCBEZWxldGVTbWFsbEdyb3VwRGlhbG9nIGZyb20gJy4uL2NvbXBvbmVudHMvc21hbGxncm91cHMvRGVsZXRlU21hbGxHcm91cERpYWxvZyc7XG4vKipcbiAqIFNtYWxsR3JvdXBzIFBhZ2UgQ29tcG9uZW50XG4gKlxuICogRGlzcGxheXMgYSBsaXN0IG9mIHNtYWxsIGdyb3VwcyB3aXRoIG1lbWJlciBjb3VudHMgYW5kIG1hbmFnZW1lbnQgY2FwYWJpbGl0aWVzLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBEaXNwbGF5IGxpc3Qgb2Ygc21hbGwgZ3JvdXBzIHdpdGggbWVtYmVyIGNvdW50c1xuICogLSBBZGQgbmV3IHNtYWxsIGdyb3VwcyAoYWRtaW4gb25seSlcbiAqIC0gVmlldyBzbWFsbCBncm91cCBkZXRhaWxzXG4gKiAtIFJlc3BvbnNpdmUgZ3JpZCBsYXlvdXRcbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiA4LjQsIDguNVxuICovXG5jb25zdCBTbWFsbEdyb3VwcyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHVzZUF1dGgoKTtcbiAgICBjb25zdCB7IHNob3dUb2FzdCB9ID0gdXNlVG9hc3QoKTtcbiAgICBjb25zdCBpc0FkbWluID0gdXNlcj8ucm9sZSA9PT0gJ2FkbWluJztcbiAgICAvLyBTdGF0ZSBtYW5hZ2VtZW50XG4gICAgY29uc3QgW3NtYWxsR3JvdXBzLCBzZXRTbWFsbEdyb3Vwc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtpc0Zvcm1PcGVuLCBzZXRJc0Zvcm1PcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbc2VsZWN0ZWRHcm91cCwgc2V0U2VsZWN0ZWRHcm91cF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICAvLyBEZWxldGUgZGlhbG9nIHN0YXRlXG4gICAgY29uc3QgW2lzRGVsZXRlRGlhbG9nT3Blbiwgc2V0SXNEZWxldGVEaWFsb2dPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbZGVsZXRpbmdHcm91cCwgc2V0RGVsZXRpbmdHcm91cF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbaXNEZWxldGluZywgc2V0SXNEZWxldGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgLyoqXG4gICAgICogTG9hZCBzbWFsbCBncm91cHMgb24gbW91bnRcbiAgICAgKi9cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBsb2FkU21hbGxHcm91cHMoKTtcbiAgICB9LCBbXSk7XG4gICAgLyoqXG4gICAgICogRmV0Y2ggc21hbGwgZ3JvdXBzIGZyb20gQVBJXG4gICAgICovXG4gICAgY29uc3QgbG9hZFNtYWxsR3JvdXBzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHNtYWxsR3JvdXBBcGkuZ2V0U21hbGxHcm91cHMoKTtcbiAgICAgICAgICAgIHNldFNtYWxsR3JvdXBzKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gbG9hZCBzbWFsbCBncm91cHMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgc21hbGwgZ3JvdXBzOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhZGQgc21hbGwgZ3JvdXAgYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQWRkQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldFNlbGVjdGVkR3JvdXAobnVsbCk7XG4gICAgICAgIHNldElzRm9ybU9wZW4odHJ1ZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZWRpdCBzbWFsbCBncm91cCBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVFZGl0Q2xpY2sgPSAoZ3JvdXApID0+IHtcbiAgICAgICAgc2V0U2VsZWN0ZWRHcm91cChncm91cCk7XG4gICAgICAgIHNldElzRm9ybU9wZW4odHJ1ZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZm9ybSBjbG9zZVxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUZvcm1DbG9zZSA9ICgpID0+IHtcbiAgICAgICAgc2V0SXNGb3JtT3BlbihmYWxzZSk7XG4gICAgICAgIHNldFNlbGVjdGVkR3JvdXAobnVsbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZm9ybSBzdWJtaXNzaW9uXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlRm9ybVN1Ym1pdCA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRHcm91cCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBncm91cFxuICAgICAgICAgICAgICAgIGF3YWl0IHNtYWxsR3JvdXBBcGkudXBkYXRlU21hbGxHcm91cChzZWxlY3RlZEdyb3VwLmlkLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnU21hbGwgZ3JvdXAgdXBkYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgZ3JvdXBcbiAgICAgICAgICAgICAgICBhd2FpdCBzbWFsbEdyb3VwQXBpLmNyZWF0ZVNtYWxsR3JvdXAoZGF0YSk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ1NtYWxsIGdyb3VwIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBsb2FkU21hbGxHcm91cHMoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yLnJlc3BvbnNlPy5kYXRhPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSBzbWFsbCBncm91cCc7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yOyAvLyBSZS10aHJvdyB0byBwcmV2ZW50IGZvcm0gZnJvbSBjbG9zaW5nXG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBkZWxldGUgc21hbGwgZ3JvdXAgYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlRGVsZXRlQ2xpY2sgPSAoZ3JvdXApID0+IHtcbiAgICAgICAgc2V0RGVsZXRpbmdHcm91cChncm91cCk7XG4gICAgICAgIHNldElzRGVsZXRlRGlhbG9nT3Blbih0cnVlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBkZWxldGUgY29uZmlybWF0aW9uXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQ29uZmlybURlbGV0ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFkZWxldGluZ0dyb3VwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzZXRJc0RlbGV0aW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgc21hbGxHcm91cEFwaS5kZWxldGVTbWFsbEdyb3VwKGRlbGV0aW5nR3JvdXAuaWQpO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ1NtYWxsIGdyb3VwIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICAvLyBSZWZyZXNoIHNtYWxsIGdyb3VwcyBsaXN0XG4gICAgICAgICAgICBhd2FpdCBsb2FkU21hbGxHcm91cHMoKTtcbiAgICAgICAgICAgIHNldElzRGVsZXRlRGlhbG9nT3BlbihmYWxzZSk7XG4gICAgICAgICAgICBzZXREZWxldGluZ0dyb3VwKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBkZWxldGUgc21hbGwgZ3JvdXAnO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsIGVycm9yTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc0RlbGV0aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsb3NlIGRlbGV0ZSBkaWFsb2dcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVDbG9zZURlbGV0ZURpYWxvZyA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFpc0RlbGV0aW5nKSB7XG4gICAgICAgICAgICBzZXRJc0RlbGV0ZURpYWxvZ09wZW4oZmFsc2UpO1xuICAgICAgICAgICAgc2V0RGVsZXRpbmdHcm91cChudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogRm9ybWF0IG1lZXRpbmcgZGF5IGFuZCB0aW1lIGZvciBkaXNwbGF5XG4gICAgICovXG4gICAgY29uc3QgZm9ybWF0TWVldGluZ1RpbWUgPSAoZGF5LCB0aW1lKSA9PiB7XG4gICAgICAgIHJldHVybiBgJHtkYXl9cyBhdCAke3RpbWV9YDtcbiAgICB9O1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206anVzdGlmeS1iZXR3ZWVuIHNtOml0ZW1zLWNlbnRlciBnYXAtNCBtYi02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogXCJTbWFsbCBHcm91cHNcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNjAwIG10LTFcIiwgY2hpbGRyZW46IFwiTWFuYWdlIGZlbGxvd3NoaXAgZ3JvdXBzIGFuZCBjb21tdW5pdHkgY29ubmVjdGlvbnNcIiB9KV0gfSksIGlzQWRtaW4gJiYgKF9qc3hzKEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVBZGRDbGljaywgY2xhc3NOYW1lOiBcInctZnVsbCBzbTp3LWF1dG9cIiwgY2hpbGRyZW46IFtfanN4KFBsdXMsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMlwiIH0pLCBcIkFkZCBTbWFsbCBHcm91cFwiXSB9KSldIH0pLCBpc0xvYWRpbmcgJiYgKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1jZW50ZXIgcHktMTJcIiwgY2hpbGRyZW46IF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFwiTG9hZGluZyBzbWFsbCBncm91cHMuLi5cIiB9KSB9KSksICFpc0xvYWRpbmcgJiYgc21hbGxHcm91cHMubGVuZ3RoID09PSAwICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtY2VudGVyIHB5LTEyXCIsIGNoaWxkcmVuOiBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogW1wiTm8gc21hbGwgZ3JvdXBzIHlldC4gXCIsIGlzQWRtaW4gJiYgJ0NsaWNrIFwiQWRkIFNtYWxsIEdyb3VwXCIgdG8gY3JlYXRlIG9uZS4nXSB9KSB9KSksICFpc0xvYWRpbmcgJiYgc21hbGxHcm91cHMubGVuZ3RoID4gMCAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02XCIsIGNoaWxkcmVuOiBzbWFsbEdyb3Vwcy5tYXAoKGdyb3VwKSA9PiAoX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02IGhvdmVyOnNoYWRvdy1sZyB0cmFuc2l0aW9uLXNoYWRvd1wiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIG1iLTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTFcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgbWItMVwiLCBjaGlsZHJlbjogZ3JvdXAubmFtZSB9KSwgX2pzeHMoXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogW1wiTGVkIGJ5IFwiLCBncm91cC5sZWFkZXJfbmFtZV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBiZy1ibHVlLTUwIHRleHQtYmx1ZS03MDAgcHgtMyBweS0xIHJvdW5kZWQtZnVsbFwiLCBjaGlsZHJlbjogW19qc3goVXNlcnMsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bVwiLCBjaGlsZHJlbjogZ3JvdXAubWVtYmVyX2NvdW50IHx8IDAgfSldIH0pXSB9KSwgZ3JvdXAuZGVzY3JpcHRpb24gJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTYwMCBtYi00IGxpbmUtY2xhbXAtMlwiLCBjaGlsZHJlbjogZ3JvdXAuZGVzY3JpcHRpb24gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTIgdGV4dC1zbVwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJmb250LW1lZGl1bSBtci0yXCIsIGNoaWxkcmVuOiBcIk1lZXRzOlwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBmb3JtYXRNZWV0aW5nVGltZShncm91cC5tZWV0aW5nX2RheSwgZ3JvdXAubWVldGluZ190aW1lKSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJmb250LW1lZGl1bSBtci0yXCIsIGNoaWxkcmVuOiBcIkxvY2F0aW9uOlwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBncm91cC5sb2NhdGlvbiB9KV0gfSldIH0pLCBpc0FkbWluICYmIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtdC00IHB0LTQgYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwIGZsZXggZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgc2l6ZTogXCJzbVwiLCBjbGFzc05hbWU6IFwiZmxleC0xXCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUVkaXRDbGljayhncm91cCksIGNoaWxkcmVuOiBcIkVkaXRcIiB9KSwgX2pzeChCdXR0b24sIHsgdmFyaWFudDogXCJvdXRsaW5lXCIsIHNpemU6IFwic21cIiwgY2xhc3NOYW1lOiBcImZsZXgtMSB0ZXh0LXJlZC02MDAgaG92ZXI6dGV4dC1yZWQtNzAwIGhvdmVyOmJnLXJlZC01MFwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVEZWxldGVDbGljayhncm91cCksIGNoaWxkcmVuOiBcIkRlbGV0ZVwiIH0pXSB9KSldIH0sIGdyb3VwLmlkKSkpIH0pKSwgX2pzeChTbWFsbEdyb3VwRm9ybSwgeyBpc09wZW46IGlzRm9ybU9wZW4sIG9uQ2xvc2U6IGhhbmRsZUZvcm1DbG9zZSwgb25TdWJtaXQ6IGhhbmRsZUZvcm1TdWJtaXQsIHNtYWxsR3JvdXA6IHNlbGVjdGVkR3JvdXAgfSksIF9qc3goRGVsZXRlU21hbGxHcm91cERpYWxvZywgeyBpc09wZW46IGlzRGVsZXRlRGlhbG9nT3Blbiwgb25DbG9zZTogaGFuZGxlQ2xvc2VEZWxldGVEaWFsb2csIG9uQ29uZmlybTogaGFuZGxlQ29uZmlybURlbGV0ZSwgc21hbGxHcm91cDogZGVsZXRpbmdHcm91cCwgaXNEZWxldGluZzogaXNEZWxldGluZyB9KV0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFNtYWxsR3JvdXBzO1xuIiwidmFyIGN1cnJlbnROb25jZTtcbmV4cG9ydCB2YXIgc2V0Tm9uY2UgPSBmdW5jdGlvbiAobm9uY2UpIHtcbiAgICBjdXJyZW50Tm9uY2UgPSBub25jZTtcbn07XG5leHBvcnQgdmFyIGdldE5vbmNlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjdXJyZW50Tm9uY2UpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnROb25jZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIF9fd2VicGFja19ub25jZV9fO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTUgMTJoMTRcIiwga2V5OiBcIjFheXMwaFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgNXYxNFwiLCBrZXk6IFwiczY5OWxlXCIgfV1cbl07XG5jb25zdCBQbHVzID0gY3JlYXRlTHVjaWRlSWNvbihcInBsdXNcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFBsdXMgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGx1cy5qcy5tYXBcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN0eWxlU2luZ2xldG9uIH0gZnJvbSAncmVhY3Qtc3R5bGUtc2luZ2xldG9uJztcbmltcG9ydCB7IGZ1bGxXaWR0aENsYXNzTmFtZSwgemVyb1JpZ2h0Q2xhc3NOYW1lLCBub1Njcm9sbGJhcnNDbGFzc05hbWUsIHJlbW92ZWRCYXJTaXplVmFyaWFibGUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRHYXBXaWR0aCB9IGZyb20gJy4vdXRpbHMnO1xudmFyIFN0eWxlID0gc3R5bGVTaW5nbGV0b24oKTtcbmV4cG9ydCB2YXIgbG9ja0F0dHJpYnV0ZSA9ICdkYXRhLXNjcm9sbC1sb2NrZWQnO1xuLy8gaW1wb3J0YW50IHRpcCAtIG9uY2Ugd2UgbWVhc3VyZSBzY3JvbGxCYXIgd2lkdGggYW5kIHJlbW92ZSB0aGVtXG4vLyB3ZSBjb3VsZCBub3QgcmVwZWF0IHRoaXMgb3BlcmF0aW9uXG4vLyB0aHVzIHdlIGFyZSB1c2luZyBzdHlsZS1zaW5nbGV0b24gLSBvbmx5IHRoZSBmaXJzdCBcInlldCBjb3JyZWN0XCIgc3R5bGUgd2lsbCBiZSBhcHBsaWVkLlxudmFyIGdldFN0eWxlcyA9IGZ1bmN0aW9uIChfYSwgYWxsb3dSZWxhdGl2ZSwgZ2FwTW9kZSwgaW1wb3J0YW50KSB7XG4gICAgdmFyIGxlZnQgPSBfYS5sZWZ0LCB0b3AgPSBfYS50b3AsIHJpZ2h0ID0gX2EucmlnaHQsIGdhcCA9IF9hLmdhcDtcbiAgICBpZiAoZ2FwTW9kZSA9PT0gdm9pZCAwKSB7IGdhcE1vZGUgPSAnbWFyZ2luJzsgfVxuICAgIHJldHVybiBcIlxcbiAgLlwiLmNvbmNhdChub1Njcm9sbGJhcnNDbGFzc05hbWUsIFwiIHtcXG4gICBvdmVyZmxvdzogaGlkZGVuIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gICBwYWRkaW5nLXJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBib2R5W1wiKS5jb25jYXQobG9ja0F0dHJpYnV0ZSwgXCJdIHtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbiBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICAgIG92ZXJzY3JvbGwtYmVoYXZpb3I6IGNvbnRhaW47XFxuICAgIFwiKS5jb25jYXQoW1xuICAgICAgICBhbGxvd1JlbGF0aXZlICYmIFwicG9zaXRpb246IHJlbGF0aXZlIFwiLmNvbmNhdChpbXBvcnRhbnQsIFwiO1wiKSxcbiAgICAgICAgZ2FwTW9kZSA9PT0gJ21hcmdpbicgJiZcbiAgICAgICAgICAgIFwiXFxuICAgIHBhZGRpbmctbGVmdDogXCIuY29uY2F0KGxlZnQsIFwicHg7XFxuICAgIHBhZGRpbmctdG9wOiBcIikuY29uY2F0KHRvcCwgXCJweDtcXG4gICAgcGFkZGluZy1yaWdodDogXCIpLmNvbmNhdChyaWdodCwgXCJweDtcXG4gICAgbWFyZ2luLWxlZnQ6MDtcXG4gICAgbWFyZ2luLXRvcDowO1xcbiAgICBtYXJnaW4tcmlnaHQ6IFwiKS5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gICAgXCIpLFxuICAgICAgICBnYXBNb2RlID09PSAncGFkZGluZycgJiYgXCJwYWRkaW5nLXJpZ2h0OiBcIi5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcIiksXG4gICAgXVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgIC5qb2luKCcnKSwgXCJcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoemVyb1JpZ2h0Q2xhc3NOYW1lLCBcIiB7XFxuICAgIHJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KGZ1bGxXaWR0aENsYXNzTmFtZSwgXCIge1xcbiAgICBtYXJnaW4tcmlnaHQ6IFwiKS5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoemVyb1JpZ2h0Q2xhc3NOYW1lLCBcIiAuXCIpLmNvbmNhdCh6ZXJvUmlnaHRDbGFzc05hbWUsIFwiIHtcXG4gICAgcmlnaHQ6IDAgXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICAuXCIpLmNvbmNhdChmdWxsV2lkdGhDbGFzc05hbWUsIFwiIC5cIikuY29uY2F0KGZ1bGxXaWR0aENsYXNzTmFtZSwgXCIge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDAgXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICBib2R5W1wiKS5jb25jYXQobG9ja0F0dHJpYnV0ZSwgXCJdIHtcXG4gICAgXCIpLmNvbmNhdChyZW1vdmVkQmFyU2l6ZVZhcmlhYmxlLCBcIjogXCIpLmNvbmNhdChnYXAsIFwicHg7XFxuICB9XFxuXCIpO1xufTtcbnZhciBnZXRDdXJyZW50VXNlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY291bnRlciA9IHBhcnNlSW50KGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKGxvY2tBdHRyaWJ1dGUpIHx8ICcwJywgMTApO1xuICAgIHJldHVybiBpc0Zpbml0ZShjb3VudGVyKSA/IGNvdW50ZXIgOiAwO1xufTtcbmV4cG9ydCB2YXIgdXNlTG9ja0F0dHJpYnV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShsb2NrQXR0cmlidXRlLCAoZ2V0Q3VycmVudFVzZUNvdW50ZXIoKSArIDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5ld0NvdW50ZXIgPSBnZXRDdXJyZW50VXNlQ291bnRlcigpIC0gMTtcbiAgICAgICAgICAgIGlmIChuZXdDb3VudGVyIDw9IDApIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZShsb2NrQXR0cmlidXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKGxvY2tBdHRyaWJ1dGUsIG5ld0NvdW50ZXIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSwgW10pO1xufTtcbi8qKlxuICogUmVtb3ZlcyBwYWdlIHNjcm9sbGJhciBhbmQgYmxvY2tzIHBhZ2Ugc2Nyb2xsIHdoZW4gbW91bnRlZFxuICovXG5leHBvcnQgdmFyIFJlbW92ZVNjcm9sbEJhciA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBub1JlbGF0aXZlID0gX2Eubm9SZWxhdGl2ZSwgbm9JbXBvcnRhbnQgPSBfYS5ub0ltcG9ydGFudCwgX2IgPSBfYS5nYXBNb2RlLCBnYXBNb2RlID0gX2IgPT09IHZvaWQgMCA/ICdtYXJnaW4nIDogX2I7XG4gICAgdXNlTG9ja0F0dHJpYnV0ZSgpO1xuICAgIC8qXG4gICAgIGdhcCB3aWxsIGJlIG1lYXN1cmVkIG9uIGV2ZXJ5IGNvbXBvbmVudCBtb3VudFxuICAgICBob3dldmVyIGl0IHdpbGwgYmUgdXNlZCBvbmx5IGJ5IHRoZSBcImZpcnN0XCIgaW52b2NhdGlvblxuICAgICBkdWUgdG8gc2luZ2xldG9uIG5hdHVyZSBvZiA8U3R5bGVcbiAgICAgKi9cbiAgICB2YXIgZ2FwID0gUmVhY3QudXNlTWVtbyhmdW5jdGlvbiAoKSB7IHJldHVybiBnZXRHYXBXaWR0aChnYXBNb2RlKTsgfSwgW2dhcE1vZGVdKTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTdHlsZSwgeyBzdHlsZXM6IGdldFN0eWxlcyhnYXAsICFub1JlbGF0aXZlLCBnYXBNb2RlLCAhbm9JbXBvcnRhbnQgPyAnIWltcG9ydGFudCcgOiAnJykgfSk7XG59O1xuIiwiZXhwb3J0IHZhciB6ZXJvUmlnaHRDbGFzc05hbWUgPSAncmlnaHQtc2Nyb2xsLWJhci1wb3NpdGlvbic7XG5leHBvcnQgdmFyIGZ1bGxXaWR0aENsYXNzTmFtZSA9ICd3aWR0aC1iZWZvcmUtc2Nyb2xsLWJhcic7XG5leHBvcnQgdmFyIG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSA9ICd3aXRoLXNjcm9sbC1iYXJzLWhpZGRlbic7XG4vKipcbiAqIE5hbWUgb2YgYSBDU1MgdmFyaWFibGUgY29udGFpbmluZyB0aGUgYW1vdW50IG9mIFwiaGlkZGVuXCIgc2Nyb2xsYmFyXG4gKiAhIG1pZ2h0IGJlIHVuZGVmaW5lZCAhIHVzZSB3aWxsIGZhbGxiYWNrIVxuICovXG5leHBvcnQgdmFyIHJlbW92ZWRCYXJTaXplVmFyaWFibGUgPSAnLS1yZW1vdmVkLWJvZHktc2Nyb2xsLWJhci1zaXplJztcbiIsImltcG9ydCB7IFJlbW92ZVNjcm9sbEJhciB9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7IHplcm9SaWdodENsYXNzTmFtZSwgZnVsbFdpZHRoQ2xhc3NOYW1lLCBub1Njcm9sbGJhcnNDbGFzc05hbWUsIHJlbW92ZWRCYXJTaXplVmFyaWFibGUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRHYXBXaWR0aCB9IGZyb20gJy4vdXRpbHMnO1xuZXhwb3J0IHsgUmVtb3ZlU2Nyb2xsQmFyLCB6ZXJvUmlnaHRDbGFzc05hbWUsIGZ1bGxXaWR0aENsYXNzTmFtZSwgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlLCBnZXRHYXBXaWR0aCwgfTtcbiIsImV4cG9ydCB2YXIgemVyb0dhcCA9IHtcbiAgICBsZWZ0OiAwLFxuICAgIHRvcDogMCxcbiAgICByaWdodDogMCxcbiAgICBnYXA6IDAsXG59O1xudmFyIHBhcnNlID0gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHBhcnNlSW50KHggfHwgJycsIDEwKSB8fCAwOyB9O1xudmFyIGdldE9mZnNldCA9IGZ1bmN0aW9uIChnYXBNb2RlKSB7XG4gICAgdmFyIGNzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSk7XG4gICAgdmFyIGxlZnQgPSBjc1tnYXBNb2RlID09PSAncGFkZGluZycgPyAncGFkZGluZ0xlZnQnIDogJ21hcmdpbkxlZnQnXTtcbiAgICB2YXIgdG9wID0gY3NbZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnID8gJ3BhZGRpbmdUb3AnIDogJ21hcmdpblRvcCddO1xuICAgIHZhciByaWdodCA9IGNzW2dhcE1vZGUgPT09ICdwYWRkaW5nJyA/ICdwYWRkaW5nUmlnaHQnIDogJ21hcmdpblJpZ2h0J107XG4gICAgcmV0dXJuIFtwYXJzZShsZWZ0KSwgcGFyc2UodG9wKSwgcGFyc2UocmlnaHQpXTtcbn07XG5leHBvcnQgdmFyIGdldEdhcFdpZHRoID0gZnVuY3Rpb24gKGdhcE1vZGUpIHtcbiAgICBpZiAoZ2FwTW9kZSA9PT0gdm9pZCAwKSB7IGdhcE1vZGUgPSAnbWFyZ2luJzsgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gemVyb0dhcDtcbiAgICB9XG4gICAgdmFyIG9mZnNldHMgPSBnZXRPZmZzZXQoZ2FwTW9kZSk7XG4gICAgdmFyIGRvY3VtZW50V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgdmFyIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogb2Zmc2V0c1swXSxcbiAgICAgICAgdG9wOiBvZmZzZXRzWzFdLFxuICAgICAgICByaWdodDogb2Zmc2V0c1syXSxcbiAgICAgICAgZ2FwOiBNYXRoLm1heCgwLCB3aW5kb3dXaWR0aCAtIGRvY3VtZW50V2lkdGggKyBvZmZzZXRzWzJdIC0gb2Zmc2V0c1swXSksXG4gICAgfTtcbn07XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsIH0gZnJvbSAnLi9VSSc7XG5pbXBvcnQgU2lkZUNhciBmcm9tICcuL3NpZGVjYXInO1xudmFyIFJlYWN0UmVtb3ZlU2Nyb2xsID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHJlZikgeyByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVtb3ZlU2Nyb2xsLCBfX2Fzc2lnbih7fSwgcHJvcHMsIHsgcmVmOiByZWYsIHNpZGVDYXI6IFNpZGVDYXIgfSkpKTsgfSk7XG5SZWFjdFJlbW92ZVNjcm9sbC5jbGFzc05hbWVzID0gUmVtb3ZlU2Nyb2xsLmNsYXNzTmFtZXM7XG5leHBvcnQgZGVmYXVsdCBSZWFjdFJlbW92ZVNjcm9sbDtcbiIsImltcG9ydCB7IF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJlbW92ZVNjcm9sbEJhciB9IGZyb20gJ3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyJztcbmltcG9ydCB7IHN0eWxlU2luZ2xldG9uIH0gZnJvbSAncmVhY3Qtc3R5bGUtc2luZ2xldG9uJztcbmltcG9ydCB7IG5vblBhc3NpdmUgfSBmcm9tICcuL2FnZ3Jlc2l2ZUNhcHR1cmUnO1xuaW1wb3J0IHsgaGFuZGxlU2Nyb2xsLCBsb2NhdGlvbkNvdWxkQmVTY3JvbGxlZCB9IGZyb20gJy4vaGFuZGxlU2Nyb2xsJztcbmV4cG9ydCB2YXIgZ2V0VG91Y2hYWSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHJldHVybiAnY2hhbmdlZFRvdWNoZXMnIGluIGV2ZW50ID8gW2V2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFldIDogWzAsIDBdO1xufTtcbmV4cG9ydCB2YXIgZ2V0RGVsdGFYWSA9IGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gW2V2ZW50LmRlbHRhWCwgZXZlbnQuZGVsdGFZXTsgfTtcbnZhciBleHRyYWN0UmVmID0gZnVuY3Rpb24gKHJlZikge1xuICAgIHJldHVybiByZWYgJiYgJ2N1cnJlbnQnIGluIHJlZiA/IHJlZi5jdXJyZW50IDogcmVmO1xufTtcbnZhciBkZWx0YUNvbXBhcmUgPSBmdW5jdGlvbiAoeCwgeSkgeyByZXR1cm4geFswXSA9PT0geVswXSAmJiB4WzFdID09PSB5WzFdOyB9O1xudmFyIGdlbmVyYXRlU3R5bGUgPSBmdW5jdGlvbiAoaWQpIHsgcmV0dXJuIFwiXFxuICAuYmxvY2staW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQsIFwiIHtwb2ludGVyLWV2ZW50czogbm9uZTt9XFxuICAuYWxsb3ctaW50ZXJhY3Rpdml0eS1cIikuY29uY2F0KGlkLCBcIiB7cG9pbnRlci1ldmVudHM6IGFsbDt9XFxuXCIpOyB9O1xudmFyIGlkQ291bnRlciA9IDA7XG52YXIgbG9ja1N0YWNrID0gW107XG5leHBvcnQgZnVuY3Rpb24gUmVtb3ZlU2Nyb2xsU2lkZUNhcihwcm9wcykge1xuICAgIHZhciBzaG91bGRQcmV2ZW50UXVldWUgPSBSZWFjdC51c2VSZWYoW10pO1xuICAgIHZhciB0b3VjaFN0YXJ0UmVmID0gUmVhY3QudXNlUmVmKFswLCAwXSk7XG4gICAgdmFyIGFjdGl2ZUF4aXMgPSBSZWFjdC51c2VSZWYoKTtcbiAgICB2YXIgaWQgPSBSZWFjdC51c2VTdGF0ZShpZENvdW50ZXIrKylbMF07XG4gICAgdmFyIFN0eWxlID0gUmVhY3QudXNlU3RhdGUoc3R5bGVTaW5nbGV0b24pWzBdO1xuICAgIHZhciBsYXN0UHJvcHMgPSBSZWFjdC51c2VSZWYocHJvcHMpO1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxhc3RQcm9wcy5jdXJyZW50ID0gcHJvcHM7XG4gICAgfSwgW3Byb3BzXSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHByb3BzLmluZXJ0KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJibG9jay1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCkpO1xuICAgICAgICAgICAgdmFyIGFsbG93XzEgPSBfX3NwcmVhZEFycmF5KFtwcm9wcy5sb2NrUmVmLmN1cnJlbnRdLCAocHJvcHMuc2hhcmRzIHx8IFtdKS5tYXAoZXh0cmFjdFJlZiksIHRydWUpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgIGFsbG93XzEuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmNsYXNzTGlzdC5hZGQoXCJhbGxvdy1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCkpOyB9KTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiYmxvY2staW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTtcbiAgICAgICAgICAgICAgICBhbGxvd18xLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWxsb3ctaW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTsgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9LCBbcHJvcHMuaW5lcnQsIHByb3BzLmxvY2tSZWYuY3VycmVudCwgcHJvcHMuc2hhcmRzXSk7XG4gICAgdmFyIHNob3VsZENhbmNlbEV2ZW50ID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50LCBwYXJlbnQpIHtcbiAgICAgICAgaWYgKCgndG91Y2hlcycgaW4gZXZlbnQgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHx8IChldmVudC50eXBlID09PSAnd2hlZWwnICYmIGV2ZW50LmN0cmxLZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gIWxhc3RQcm9wcy5jdXJyZW50LmFsbG93UGluY2hab29tO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b3VjaCA9IGdldFRvdWNoWFkoZXZlbnQpO1xuICAgICAgICB2YXIgdG91Y2hTdGFydCA9IHRvdWNoU3RhcnRSZWYuY3VycmVudDtcbiAgICAgICAgdmFyIGRlbHRhWCA9ICdkZWx0YVgnIGluIGV2ZW50ID8gZXZlbnQuZGVsdGFYIDogdG91Y2hTdGFydFswXSAtIHRvdWNoWzBdO1xuICAgICAgICB2YXIgZGVsdGFZID0gJ2RlbHRhWScgaW4gZXZlbnQgPyBldmVudC5kZWx0YVkgOiB0b3VjaFN0YXJ0WzFdIC0gdG91Y2hbMV07XG4gICAgICAgIHZhciBjdXJyZW50QXhpcztcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdmFyIG1vdmVEaXJlY3Rpb24gPSBNYXRoLmFicyhkZWx0YVgpID4gTWF0aC5hYnMoZGVsdGFZKSA/ICdoJyA6ICd2JztcbiAgICAgICAgLy8gYWxsb3cgaG9yaXpvbnRhbCB0b3VjaCBtb3ZlIG9uIFJhbmdlIGlucHV0cy4gVGhleSB3aWxsIG5vdCBjYXVzZSBhbnkgc2Nyb2xsXG4gICAgICAgIGlmICgndG91Y2hlcycgaW4gZXZlbnQgJiYgbW92ZURpcmVjdGlvbiA9PT0gJ2gnICYmIHRhcmdldC50eXBlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWxsb3cgZHJhZyBzZWxlY3Rpb24gKGlPUyk7IGNoZWNrIGlmIHNlbGVjdGlvbidzIGFuY2hvck5vZGUgaXMgdGhlIHNhbWUgYXMgdGFyZ2V0IG9yIGNvbnRhaW5zIHRhcmdldFxuICAgICAgICB2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgYW5jaG9yTm9kZSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uYW5jaG9yTm9kZTtcbiAgICAgICAgdmFyIGlzVG91Y2hpbmdTZWxlY3Rpb24gPSBhbmNob3JOb2RlID8gYW5jaG9yTm9kZSA9PT0gdGFyZ2V0IHx8IGFuY2hvck5vZGUuY29udGFpbnModGFyZ2V0KSA6IGZhbHNlO1xuICAgICAgICBpZiAoaXNUb3VjaGluZ1NlbGVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uID0gbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQobW92ZURpcmVjdGlvbiwgdGFyZ2V0KTtcbiAgICAgICAgaWYgKCFjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbikge1xuICAgICAgICAgICAgY3VycmVudEF4aXMgPSBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudEF4aXMgPSBtb3ZlRGlyZWN0aW9uID09PSAndicgPyAnaCcgOiAndic7XG4gICAgICAgICAgICBjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uID0gbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQobW92ZURpcmVjdGlvbiwgdGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIG90aGVyIGF4aXMgbWlnaHQgYmUgbm90IHNjcm9sbGFibGVcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFjdGl2ZUF4aXMuY3VycmVudCAmJiAnY2hhbmdlZFRvdWNoZXMnIGluIGV2ZW50ICYmIChkZWx0YVggfHwgZGVsdGFZKSkge1xuICAgICAgICAgICAgYWN0aXZlQXhpcy5jdXJyZW50ID0gY3VycmVudEF4aXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50QXhpcykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbmNlbGluZ0F4aXMgPSBhY3RpdmVBeGlzLmN1cnJlbnQgfHwgY3VycmVudEF4aXM7XG4gICAgICAgIHJldHVybiBoYW5kbGVTY3JvbGwoY2FuY2VsaW5nQXhpcywgcGFyZW50LCBldmVudCwgY2FuY2VsaW5nQXhpcyA9PT0gJ2gnID8gZGVsdGFYIDogZGVsdGFZLCB0cnVlKTtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHNob3VsZFByZXZlbnQgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoX2V2ZW50KSB7XG4gICAgICAgIHZhciBldmVudCA9IF9ldmVudDtcbiAgICAgICAgaWYgKCFsb2NrU3RhY2subGVuZ3RoIHx8IGxvY2tTdGFja1tsb2NrU3RhY2subGVuZ3RoIC0gMV0gIT09IFN0eWxlKSB7XG4gICAgICAgICAgICAvLyBub3QgdGhlIGxhc3QgYWN0aXZlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbHRhID0gJ2RlbHRhWScgaW4gZXZlbnQgPyBnZXREZWx0YVhZKGV2ZW50KSA6IGdldFRvdWNoWFkoZXZlbnQpO1xuICAgICAgICB2YXIgc291cmNlRXZlbnQgPSBzaG91bGRQcmV2ZW50UXVldWUuY3VycmVudC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gZXZlbnQudHlwZSAmJiAoZS50YXJnZXQgPT09IGV2ZW50LnRhcmdldCB8fCBldmVudC50YXJnZXQgPT09IGUuc2hhZG93UGFyZW50KSAmJiBkZWx0YUNvbXBhcmUoZS5kZWx0YSwgZGVsdGEpOyB9KVswXTtcbiAgICAgICAgLy8gc2VsZiBldmVudCwgYW5kIHNob3VsZCBiZSBjYW5jZWxlZFxuICAgICAgICBpZiAoc291cmNlRXZlbnQgJiYgc291cmNlRXZlbnQuc2hvdWxkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gb3V0c2lkZSBvciBzaGFyZCBldmVudFxuICAgICAgICBpZiAoIXNvdXJjZUV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgc2hhcmROb2RlcyA9IChsYXN0UHJvcHMuY3VycmVudC5zaGFyZHMgfHwgW10pXG4gICAgICAgICAgICAgICAgLm1hcChleHRyYWN0UmVmKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBub2RlLmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7IH0pO1xuICAgICAgICAgICAgdmFyIHNob3VsZFN0b3AgPSBzaGFyZE5vZGVzLmxlbmd0aCA+IDAgPyBzaG91bGRDYW5jZWxFdmVudChldmVudCwgc2hhcmROb2Rlc1swXSkgOiAhbGFzdFByb3BzLmN1cnJlbnQubm9Jc29sYXRpb247XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RvcCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW10pO1xuICAgIHZhciBzaG91bGRDYW5jZWwgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAobmFtZSwgZGVsdGEsIHRhcmdldCwgc2hvdWxkKSB7XG4gICAgICAgIHZhciBldmVudCA9IHsgbmFtZTogbmFtZSwgZGVsdGE6IGRlbHRhLCB0YXJnZXQ6IHRhcmdldCwgc2hvdWxkOiBzaG91bGQsIHNoYWRvd1BhcmVudDogZ2V0T3V0ZXJtb3N0U2hhZG93UGFyZW50KHRhcmdldCkgfTtcbiAgICAgICAgc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQucHVzaChldmVudCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQgPSBzaG91bGRQcmV2ZW50UXVldWUuY3VycmVudC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgIT09IGV2ZW50OyB9KTtcbiAgICAgICAgfSwgMSk7XG4gICAgfSwgW10pO1xuICAgIHZhciBzY3JvbGxUb3VjaFN0YXJ0ID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRvdWNoU3RhcnRSZWYuY3VycmVudCA9IGdldFRvdWNoWFkoZXZlbnQpO1xuICAgICAgICBhY3RpdmVBeGlzLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgfSwgW10pO1xuICAgIHZhciBzY3JvbGxXaGVlbCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzaG91bGRDYW5jZWwoZXZlbnQudHlwZSwgZ2V0RGVsdGFYWShldmVudCksIGV2ZW50LnRhcmdldCwgc2hvdWxkQ2FuY2VsRXZlbnQoZXZlbnQsIHByb3BzLmxvY2tSZWYuY3VycmVudCkpO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2Nyb2xsVG91Y2hNb3ZlID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNob3VsZENhbmNlbChldmVudC50eXBlLCBnZXRUb3VjaFhZKGV2ZW50KSwgZXZlbnQudGFyZ2V0LCBzaG91bGRDYW5jZWxFdmVudChldmVudCwgcHJvcHMubG9ja1JlZi5jdXJyZW50KSk7XG4gICAgfSwgW10pO1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvY2tTdGFjay5wdXNoKFN0eWxlKTtcbiAgICAgICAgcHJvcHMuc2V0Q2FsbGJhY2tzKHtcbiAgICAgICAgICAgIG9uU2Nyb2xsQ2FwdHVyZTogc2Nyb2xsV2hlZWwsXG4gICAgICAgICAgICBvbldoZWVsQ2FwdHVyZTogc2Nyb2xsV2hlZWwsXG4gICAgICAgICAgICBvblRvdWNoTW92ZUNhcHR1cmU6IHNjcm9sbFRvdWNoTW92ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgc2hvdWxkUHJldmVudCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2Nyb2xsVG91Y2hTdGFydCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsb2NrU3RhY2sgPSBsb2NrU3RhY2suZmlsdGVyKGZ1bmN0aW9uIChpbnN0KSB7IHJldHVybiBpbnN0ICE9PSBTdHlsZTsgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2hvdWxkUHJldmVudCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2Nyb2xsVG91Y2hTdGFydCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIH07XG4gICAgfSwgW10pO1xuICAgIHZhciByZW1vdmVTY3JvbGxCYXIgPSBwcm9wcy5yZW1vdmVTY3JvbGxCYXIsIGluZXJ0ID0gcHJvcHMuaW5lcnQ7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICBpbmVydCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3R5bGUsIHsgc3R5bGVzOiBnZW5lcmF0ZVN0eWxlKGlkKSB9KSA6IG51bGwsXG4gICAgICAgIHJlbW92ZVNjcm9sbEJhciA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVtb3ZlU2Nyb2xsQmFyLCB7IG5vUmVsYXRpdmU6IHByb3BzLm5vUmVsYXRpdmUsIGdhcE1vZGU6IHByb3BzLmdhcE1vZGUgfSkgOiBudWxsKSk7XG59XG5mdW5jdGlvbiBnZXRPdXRlcm1vc3RTaGFkb3dQYXJlbnQobm9kZSkge1xuICAgIHZhciBzaGFkb3dQYXJlbnQgPSBudWxsO1xuICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgICAgICAgICAgc2hhZG93UGFyZW50ID0gbm9kZS5ob3N0O1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gc2hhZG93UGFyZW50O1xufVxuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fcmVzdCB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZnVsbFdpZHRoQ2xhc3NOYW1lLCB6ZXJvUmlnaHRDbGFzc05hbWUgfSBmcm9tICdyZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9jb25zdGFudHMnO1xuaW1wb3J0IHsgdXNlTWVyZ2VSZWZzIH0gZnJvbSAndXNlLWNhbGxiYWNrLXJlZic7XG5pbXBvcnQgeyBlZmZlY3RDYXIgfSBmcm9tICcuL21lZGl1bSc7XG52YXIgbm90aGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm47XG59O1xuLyoqXG4gKiBSZW1vdmVzIHNjcm9sbGJhciBmcm9tIHRoZSBwYWdlIGFuZCBjb250YWluIHRoZSBzY3JvbGwgd2l0aGluIHRoZSBMb2NrXG4gKi9cbnZhciBSZW1vdmVTY3JvbGwgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcGFyZW50UmVmKSB7XG4gICAgdmFyIHJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICB2YXIgX2EgPSBSZWFjdC51c2VTdGF0ZSh7XG4gICAgICAgIG9uU2Nyb2xsQ2FwdHVyZTogbm90aGluZyxcbiAgICAgICAgb25XaGVlbENhcHR1cmU6IG5vdGhpbmcsXG4gICAgICAgIG9uVG91Y2hNb3ZlQ2FwdHVyZTogbm90aGluZyxcbiAgICB9KSwgY2FsbGJhY2tzID0gX2FbMF0sIHNldENhbGxiYWNrcyA9IF9hWzFdO1xuICAgIHZhciBmb3J3YXJkUHJvcHMgPSBwcm9wcy5mb3J3YXJkUHJvcHMsIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSwgcmVtb3ZlU2Nyb2xsQmFyID0gcHJvcHMucmVtb3ZlU2Nyb2xsQmFyLCBlbmFibGVkID0gcHJvcHMuZW5hYmxlZCwgc2hhcmRzID0gcHJvcHMuc2hhcmRzLCBzaWRlQ2FyID0gcHJvcHMuc2lkZUNhciwgbm9SZWxhdGl2ZSA9IHByb3BzLm5vUmVsYXRpdmUsIG5vSXNvbGF0aW9uID0gcHJvcHMubm9Jc29sYXRpb24sIGluZXJ0ID0gcHJvcHMuaW5lcnQsIGFsbG93UGluY2hab29tID0gcHJvcHMuYWxsb3dQaW5jaFpvb20sIF9iID0gcHJvcHMuYXMsIENvbnRhaW5lciA9IF9iID09PSB2b2lkIDAgPyAnZGl2JyA6IF9iLCBnYXBNb2RlID0gcHJvcHMuZ2FwTW9kZSwgcmVzdCA9IF9fcmVzdChwcm9wcywgW1wiZm9yd2FyZFByb3BzXCIsIFwiY2hpbGRyZW5cIiwgXCJjbGFzc05hbWVcIiwgXCJyZW1vdmVTY3JvbGxCYXJcIiwgXCJlbmFibGVkXCIsIFwic2hhcmRzXCIsIFwic2lkZUNhclwiLCBcIm5vUmVsYXRpdmVcIiwgXCJub0lzb2xhdGlvblwiLCBcImluZXJ0XCIsIFwiYWxsb3dQaW5jaFpvb21cIiwgXCJhc1wiLCBcImdhcE1vZGVcIl0pO1xuICAgIHZhciBTaWRlQ2FyID0gc2lkZUNhcjtcbiAgICB2YXIgY29udGFpbmVyUmVmID0gdXNlTWVyZ2VSZWZzKFtyZWYsIHBhcmVudFJlZl0pO1xuICAgIHZhciBjb250YWluZXJQcm9wcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXN0KSwgY2FsbGJhY2tzKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIGVuYWJsZWQgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZUNhciwgeyBzaWRlQ2FyOiBlZmZlY3RDYXIsIHJlbW92ZVNjcm9sbEJhcjogcmVtb3ZlU2Nyb2xsQmFyLCBzaGFyZHM6IHNoYXJkcywgbm9SZWxhdGl2ZTogbm9SZWxhdGl2ZSwgbm9Jc29sYXRpb246IG5vSXNvbGF0aW9uLCBpbmVydDogaW5lcnQsIHNldENhbGxiYWNrczogc2V0Q2FsbGJhY2tzLCBhbGxvd1BpbmNoWm9vbTogISFhbGxvd1BpbmNoWm9vbSwgbG9ja1JlZjogcmVmLCBnYXBNb2RlOiBnYXBNb2RlIH0pKSxcbiAgICAgICAgZm9yd2FyZFByb3BzID8gKFJlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKSwgX19hc3NpZ24oX19hc3NpZ24oe30sIGNvbnRhaW5lclByb3BzKSwgeyByZWY6IGNvbnRhaW5lclJlZiB9KSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGFpbmVyLCBfX2Fzc2lnbih7fSwgY29udGFpbmVyUHJvcHMsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIHJlZjogY29udGFpbmVyUmVmIH0pLCBjaGlsZHJlbikpKSk7XG59KTtcblJlbW92ZVNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICByZW1vdmVTY3JvbGxCYXI6IHRydWUsXG4gICAgaW5lcnQ6IGZhbHNlLFxufTtcblJlbW92ZVNjcm9sbC5jbGFzc05hbWVzID0ge1xuICAgIGZ1bGxXaWR0aDogZnVsbFdpZHRoQ2xhc3NOYW1lLFxuICAgIHplcm9SaWdodDogemVyb1JpZ2h0Q2xhc3NOYW1lLFxufTtcbmV4cG9ydCB7IFJlbW92ZVNjcm9sbCB9O1xuIiwidmFyIHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBhc3NpdmVTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgdmFyIG5vblBhc3NpdmUgPSBwYXNzaXZlU3VwcG9ydGVkID8geyBwYXNzaXZlOiBmYWxzZSB9IDogZmFsc2U7XG4iLCJ2YXIgYWx3YXlzQ29udGFpbnNTY3JvbGwgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIC8vIHRleHRhcmVhIHdpbGwgYWx3YXlzIF9jb250YWluXyBzY3JvbGwgaW5zaWRlIHNlbGYuIEl0IG9ubHkgY2FuIGJlIGhpZGRlblxuICAgIHJldHVybiBub2RlLnRhZ05hbWUgPT09ICdURVhUQVJFQSc7XG59O1xudmFyIGVsZW1lbnRDYW5CZVNjcm9sbGVkID0gZnVuY3Rpb24gKG5vZGUsIG92ZXJmbG93KSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIHJldHVybiAoXG4gICAgLy8gbm90LW5vdC1zY3JvbGxhYmxlXG4gICAgc3R5bGVzW292ZXJmbG93XSAhPT0gJ2hpZGRlbicgJiZcbiAgICAgICAgLy8gY29udGFpbnMgc2Nyb2xsIGluc2lkZSBzZWxmXG4gICAgICAgICEoc3R5bGVzLm92ZXJmbG93WSA9PT0gc3R5bGVzLm92ZXJmbG93WCAmJiAhYWx3YXlzQ29udGFpbnNTY3JvbGwobm9kZSkgJiYgc3R5bGVzW292ZXJmbG93XSA9PT0gJ3Zpc2libGUnKSk7XG59O1xudmFyIGVsZW1lbnRDb3VsZEJlVlNjcm9sbGVkID0gZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIGVsZW1lbnRDYW5CZVNjcm9sbGVkKG5vZGUsICdvdmVyZmxvd1knKTsgfTtcbnZhciBlbGVtZW50Q291bGRCZUhTY3JvbGxlZCA9IGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBlbGVtZW50Q2FuQmVTY3JvbGxlZChub2RlLCAnb3ZlcmZsb3dYJyk7IH07XG5leHBvcnQgdmFyIGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkID0gZnVuY3Rpb24gKGF4aXMsIG5vZGUpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICB2YXIgY3VycmVudCA9IG5vZGU7XG4gICAgZG8ge1xuICAgICAgICAvLyBTa2lwIG92ZXIgc2hhZG93IHJvb3RcbiAgICAgICAgaWYgKHR5cGVvZiBTaGFkb3dSb290ICE9PSAndW5kZWZpbmVkJyAmJiBjdXJyZW50IGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNTY3JvbGxhYmxlID0gZWxlbWVudENvdWxkQmVTY3JvbGxlZChheGlzLCBjdXJyZW50KTtcbiAgICAgICAgaWYgKGlzU2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgdmFyIF9hID0gZ2V0U2Nyb2xsVmFyaWFibGVzKGF4aXMsIGN1cnJlbnQpLCBzY3JvbGxIZWlnaHQgPSBfYVsxXSwgY2xpZW50SGVpZ2h0ID0gX2FbMl07XG4gICAgICAgICAgICBpZiAoc2Nyb2xsSGVpZ2h0ID4gY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgICB9IHdoaWxlIChjdXJyZW50ICYmIGN1cnJlbnQgIT09IG93bmVyRG9jdW1lbnQuYm9keSk7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbnZhciBnZXRWU2Nyb2xsVmFyaWFibGVzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IF9hLnNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0ID0gX2Euc2Nyb2xsSGVpZ2h0LCBjbGllbnRIZWlnaHQgPSBfYS5jbGllbnRIZWlnaHQ7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgc2Nyb2xsVG9wLFxuICAgICAgICBzY3JvbGxIZWlnaHQsXG4gICAgICAgIGNsaWVudEhlaWdodCxcbiAgICBdO1xufTtcbnZhciBnZXRIU2Nyb2xsVmFyaWFibGVzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHNjcm9sbExlZnQgPSBfYS5zY3JvbGxMZWZ0LCBzY3JvbGxXaWR0aCA9IF9hLnNjcm9sbFdpZHRoLCBjbGllbnRXaWR0aCA9IF9hLmNsaWVudFdpZHRoO1xuICAgIHJldHVybiBbXG4gICAgICAgIHNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFdpZHRoLFxuICAgICAgICBjbGllbnRXaWR0aCxcbiAgICBdO1xufTtcbnZhciBlbGVtZW50Q291bGRCZVNjcm9sbGVkID0gZnVuY3Rpb24gKGF4aXMsIG5vZGUpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gJ3YnID8gZWxlbWVudENvdWxkQmVWU2Nyb2xsZWQobm9kZSkgOiBlbGVtZW50Q291bGRCZUhTY3JvbGxlZChub2RlKTtcbn07XG52YXIgZ2V0U2Nyb2xsVmFyaWFibGVzID0gZnVuY3Rpb24gKGF4aXMsIG5vZGUpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gJ3YnID8gZ2V0VlNjcm9sbFZhcmlhYmxlcyhub2RlKSA6IGdldEhTY3JvbGxWYXJpYWJsZXMobm9kZSk7XG59O1xudmFyIGdldERpcmVjdGlvbkZhY3RvciA9IGZ1bmN0aW9uIChheGlzLCBkaXJlY3Rpb24pIHtcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgZWxlbWVudCdzIGRpcmVjdGlvbiBpcyBydGwgKHJpZ2h0LXRvLWxlZnQpLCB0aGVuIHNjcm9sbExlZnQgaXMgMCB3aGVuIHRoZSBzY3JvbGxiYXIgaXMgYXQgaXRzIHJpZ2h0bW9zdCBwb3NpdGlvbixcbiAgICAgKiBhbmQgdGhlbiBpbmNyZWFzaW5nbHkgbmVnYXRpdmUgYXMgeW91IHNjcm9sbCB0b3dhcmRzIHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQuXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9zY3JvbGxMZWZ0XG4gICAgICovXG4gICAgcmV0dXJuIGF4aXMgPT09ICdoJyAmJiBkaXJlY3Rpb24gPT09ICdydGwnID8gLTEgOiAxO1xufTtcbmV4cG9ydCB2YXIgaGFuZGxlU2Nyb2xsID0gZnVuY3Rpb24gKGF4aXMsIGVuZFRhcmdldCwgZXZlbnQsIHNvdXJjZURlbHRhLCBub092ZXJzY3JvbGwpIHtcbiAgICB2YXIgZGlyZWN0aW9uRmFjdG9yID0gZ2V0RGlyZWN0aW9uRmFjdG9yKGF4aXMsIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVuZFRhcmdldCkuZGlyZWN0aW9uKTtcbiAgICB2YXIgZGVsdGEgPSBkaXJlY3Rpb25GYWN0b3IgKiBzb3VyY2VEZWx0YTtcbiAgICAvLyBmaW5kIHNjcm9sbGFibGUgdGFyZ2V0XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICB2YXIgdGFyZ2V0SW5Mb2NrID0gZW5kVGFyZ2V0LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgdmFyIHNob3VsZENhbmNlbFNjcm9sbCA9IGZhbHNlO1xuICAgIHZhciBpc0RlbHRhUG9zaXRpdmUgPSBkZWx0YSA+IDA7XG4gICAgdmFyIGF2YWlsYWJsZVNjcm9sbCA9IDA7XG4gICAgdmFyIGF2YWlsYWJsZVNjcm9sbFRvcCA9IDA7XG4gICAgZG8ge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gZ2V0U2Nyb2xsVmFyaWFibGVzKGF4aXMsIHRhcmdldCksIHBvc2l0aW9uID0gX2FbMF0sIHNjcm9sbF8xID0gX2FbMV0sIGNhcGFjaXR5ID0gX2FbMl07XG4gICAgICAgIHZhciBlbGVtZW50U2Nyb2xsID0gc2Nyb2xsXzEgLSBjYXBhY2l0eSAtIGRpcmVjdGlvbkZhY3RvciAqIHBvc2l0aW9uO1xuICAgICAgICBpZiAocG9zaXRpb24gfHwgZWxlbWVudFNjcm9sbCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRDb3VsZEJlU2Nyb2xsZWQoYXhpcywgdGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVNjcm9sbCArPSBlbGVtZW50U2Nyb2xsO1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVNjcm9sbFRvcCArPSBwb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFyZW50XzEgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgLy8gd2Ugd2lsbCBcImJ1YmJsZVwiIGZyb20gU2hhZG93RG9tIGluIGNhc2Ugd2UgYXJlLCBvciBqdXN0IHRvIHRoZSBwYXJlbnQgaW4gbm9ybWFsIGNhc2VcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBsb2dpYyB1c2VkIGluIGZvY3VzLWxvY2tcbiAgICAgICAgdGFyZ2V0ID0gKHBhcmVudF8xICYmIHBhcmVudF8xLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUgPyBwYXJlbnRfMS5ob3N0IDogcGFyZW50XzEpO1xuICAgIH0gd2hpbGUgKFxuICAgIC8vIHBvcnRhbGVkIGNvbnRlbnRcbiAgICAoIXRhcmdldEluTG9jayAmJiB0YXJnZXQgIT09IGRvY3VtZW50LmJvZHkpIHx8XG4gICAgICAgIC8vIHNlbGYgY29udGVudFxuICAgICAgICAodGFyZ2V0SW5Mb2NrICYmIChlbmRUYXJnZXQuY29udGFpbnModGFyZ2V0KSB8fCBlbmRUYXJnZXQgPT09IHRhcmdldCkpKTtcbiAgICAvLyBoYW5kbGUgZXBzaWxvbiBhcm91bmQgMCAobm9uIHN0YW5kYXJkIHpvb20gbGV2ZWxzKVxuICAgIGlmIChpc0RlbHRhUG9zaXRpdmUgJiZcbiAgICAgICAgKChub092ZXJzY3JvbGwgJiYgTWF0aC5hYnMoYXZhaWxhYmxlU2Nyb2xsKSA8IDEpIHx8ICghbm9PdmVyc2Nyb2xsICYmIGRlbHRhID4gYXZhaWxhYmxlU2Nyb2xsKSkpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsU2Nyb2xsID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWlzRGVsdGFQb3NpdGl2ZSAmJlxuICAgICAgICAoKG5vT3ZlcnNjcm9sbCAmJiBNYXRoLmFicyhhdmFpbGFibGVTY3JvbGxUb3ApIDwgMSkgfHwgKCFub092ZXJzY3JvbGwgJiYgLWRlbHRhID4gYXZhaWxhYmxlU2Nyb2xsVG9wKSkpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsU2Nyb2xsID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3VsZENhbmNlbFNjcm9sbDtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVTaWRlY2FyTWVkaXVtIH0gZnJvbSAndXNlLXNpZGVjYXInO1xuZXhwb3J0IHZhciBlZmZlY3RDYXIgPSBjcmVhdGVTaWRlY2FyTWVkaXVtKCk7XG4iLCJpbXBvcnQgeyBleHBvcnRTaWRlY2FyIH0gZnJvbSAndXNlLXNpZGVjYXInO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsU2lkZUNhciB9IGZyb20gJy4vU2lkZUVmZmVjdCc7XG5pbXBvcnQgeyBlZmZlY3RDYXIgfSBmcm9tICcuL21lZGl1bSc7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRTaWRlY2FyKGVmZmVjdENhciwgUmVtb3ZlU2Nyb2xsU2lkZUNhcik7XG4iLCJpbXBvcnQgeyBzdHlsZUhvb2tTaW5nbGV0b24gfSBmcm9tICcuL2hvb2snO1xuLyoqXG4gKiBjcmVhdGUgYSBDb21wb25lbnQgdG8gYWRkIHN0eWxlcyBvbiBkZW1hbmRcbiAqIC0gc3R5bGVzIGFyZSBhZGRlZCB3aGVuIGZpcnN0IGluc3RhbmNlIGlzIG1vdW50ZWRcbiAqIC0gc3R5bGVzIGFyZSByZW1vdmVkIHdoZW4gdGhlIGxhc3QgaW5zdGFuY2UgaXMgdW5tb3VudGVkXG4gKiAtIGNoYW5naW5nIHN0eWxlcyBpbiBydW50aW1lIGRvZXMgbm90aGluZyB1bmxlc3MgZHluYW1pYyBpcyBzZXQuIEJ1dCB3aXRoIG11bHRpcGxlIGNvbXBvbmVudHMgdGhhdCBjYW4gbGVhZCB0byB0aGUgdW5kZWZpbmVkIGJlaGF2aW9yXG4gKi9cbmV4cG9ydCB2YXIgc3R5bGVTaW5nbGV0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHVzZVN0eWxlID0gc3R5bGVIb29rU2luZ2xldG9uKCk7XG4gICAgdmFyIFNoZWV0ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBzdHlsZXMgPSBfYS5zdHlsZXMsIGR5bmFtaWMgPSBfYS5keW5hbWljO1xuICAgICAgICB1c2VTdHlsZShzdHlsZXMsIGR5bmFtaWMpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBTaGVldDtcbn07XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHlsZXNoZWV0U2luZ2xldG9uIH0gZnJvbSAnLi9zaW5nbGV0b24nO1xuLyoqXG4gKiBjcmVhdGVzIGEgaG9vayB0byBjb250cm9sIHN0eWxlIHNpbmdsZXRvblxuICogQHNlZSB7QGxpbmsgc3R5bGVTaW5nbGV0b259IGZvciBhIHNhZmVyIGNvbXBvbmVudCB2ZXJzaW9uXG4gKiBAZXhhbXBsZVxuICogYGBgdHN4XG4gKiBjb25zdCB1c2VTdHlsZSA9IHN0eWxlSG9va1NpbmdsZXRvbigpO1xuICogLy8vXG4gKiB1c2VTdHlsZSgnYm9keSB7IG92ZXJmbG93OiBoaWRkZW59Jyk7XG4gKi9cbmV4cG9ydCB2YXIgc3R5bGVIb29rU2luZ2xldG9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzaGVldCA9IHN0eWxlc2hlZXRTaW5nbGV0b24oKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHN0eWxlcywgaXNEeW5hbWljKSB7XG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzaGVldC5hZGQoc3R5bGVzKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2hlZXQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LCBbc3R5bGVzICYmIGlzRHluYW1pY10pO1xuICAgIH07XG59O1xuIiwiZXhwb3J0IHsgc3R5bGVTaW5nbGV0b24gfSBmcm9tICcuL2NvbXBvbmVudCc7XG5leHBvcnQgeyBzdHlsZXNoZWV0U2luZ2xldG9uIH0gZnJvbSAnLi9zaW5nbGV0b24nO1xuZXhwb3J0IHsgc3R5bGVIb29rU2luZ2xldG9uIH0gZnJvbSAnLi9ob29rJztcbiIsImltcG9ydCB7IGdldE5vbmNlIH0gZnJvbSAnZ2V0LW5vbmNlJztcbmZ1bmN0aW9uIG1ha2VTdHlsZVRhZygpIHtcbiAgICBpZiAoIWRvY3VtZW50KVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB2YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0YWcudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgdmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcbiAgICBpZiAobm9uY2UpIHtcbiAgICAgICAgdGFnLnNldEF0dHJpYnV0ZSgnbm9uY2UnLCBub25jZSk7XG4gICAgfVxuICAgIHJldHVybiB0YWc7XG59XG5mdW5jdGlvbiBpbmplY3RTdHlsZXModGFnLCBjc3MpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKHRhZy5zdHlsZVNoZWV0KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGFnLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbnNlcnRTdHlsZVRhZyh0YWcpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHRhZyk7XG59XG5leHBvcnQgdmFyIHN0eWxlc2hlZXRTaW5nbGV0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHZhciBzdHlsZXNoZWV0ID0gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICgoc3R5bGVzaGVldCA9IG1ha2VTdHlsZVRhZygpKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmplY3RTdHlsZXMoc3R5bGVzaGVldCwgc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRTdHlsZVRhZyhzdHlsZXNoZWV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY291bnRlci0tO1xuICAgICAgICAgICAgaWYgKCFjb3VudGVyICYmIHN0eWxlc2hlZXQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0LnBhcmVudE5vZGUgJiYgc3R5bGVzaGVldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlc2hlZXQpO1xuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59O1xuIiwiLyoqXG4gKiBBc3NpZ25zIGEgdmFsdWUgZm9yIGEgZ2l2ZW4gcmVmLCBubyBtYXR0ZXIgb2YgdGhlIHJlZiBmb3JtYXRcbiAqIEBwYXJhbSB7UmVmT2JqZWN0fSByZWYgLSBhIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIHJlZiBvYmplY3RcbiAqIEBwYXJhbSB2YWx1ZSAtIGEgbmV3IHZhbHVlXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjYXNzaWducmVmXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVmT2JqZWN0ID0gdXNlUmVmKCk7XG4gKiBjb25zdCByZWZGbiA9IChyZWYpID0+IHsuLi4ufVxuICpcbiAqIGFzc2lnblJlZihyZWZPYmplY3QsIFwicmVmVmFsdWVcIik7XG4gKiBhc3NpZ25SZWYocmVmRm4sIFwicmVmVmFsdWVcIik7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25SZWYocmVmLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlZih2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlZikge1xuICAgICAgICByZWYuY3VycmVudCA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVmO1xufVxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYXNzaWduUmVmIH0gZnJvbSAnLi9hc3NpZ25SZWYnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tICcuL3VzZVJlZic7XG52YXIgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gUmVhY3QudXNlTGF5b3V0RWZmZWN0IDogUmVhY3QudXNlRWZmZWN0O1xudmFyIGN1cnJlbnRWYWx1ZXMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBNZXJnZXMgdHdvIG9yIG1vcmUgcmVmcyB0b2dldGhlciBwcm92aWRpbmcgYSBzaW5nbGUgaW50ZXJmYWNlIHRvIHNldCB0aGVpciB2YWx1ZVxuICogQHBhcmFtIHtSZWZPYmplY3R8UmVmfSByZWZzXG4gKiBAcmV0dXJucyB7TXV0YWJsZVJlZk9iamVjdH0gLSBhIG5ldyByZWYsIHdoaWNoIHRyYW5zbGF0ZXMgYWxsIGNoYW5nZXMgdG8ge3JlZnN9XG4gKlxuICogQHNlZSB7QGxpbmsgbWVyZ2VSZWZzfSBhIHZlcnNpb24gd2l0aG91dCBidWl0LWluIG1lbW9pemF0aW9uXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvdXNlLWNhbGxiYWNrLXJlZiN1c2VtZXJnZXJlZnNcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBDb21wb25lbnQgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG4gKiAgIGNvbnN0IG93blJlZiA9IHVzZVJlZigpO1xuICogICBjb25zdCBkb21SZWYgPSB1c2VNZXJnZVJlZnMoW3JlZiwgb3duUmVmXSk7IC8vIPCfkYggbWVyZ2UgdG9nZXRoZXJcbiAqICAgcmV0dXJuIDxkaXYgcmVmPXtkb21SZWZ9Pi4uLjwvZGl2PlxuICogfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlTWVyZ2VSZWZzKHJlZnMsIGRlZmF1bHRWYWx1ZSkge1xuICAgIHZhciBjYWxsYmFja1JlZiA9IHVzZUNhbGxiYWNrUmVmKGRlZmF1bHRWYWx1ZSB8fCBudWxsLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHJlZnMuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7IHJldHVybiBhc3NpZ25SZWYocmVmLCBuZXdWYWx1ZSk7IH0pO1xuICAgIH0pO1xuICAgIC8vIGhhbmRsZSByZWZzIGNoYW5nZXMgLSBhZGRlZCBvciByZW1vdmVkXG4gICAgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IGN1cnJlbnRWYWx1ZXMuZ2V0KGNhbGxiYWNrUmVmKTtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcHJldlJlZnNfMSA9IG5ldyBTZXQob2xkVmFsdWUpO1xuICAgICAgICAgICAgdmFyIG5leHRSZWZzXzEgPSBuZXcgU2V0KHJlZnMpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRfMSA9IGNhbGxiYWNrUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICBwcmV2UmVmc18xLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgIGlmICghbmV4dFJlZnNfMS5oYXMocmVmKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25SZWYocmVmLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5leHRSZWZzXzEuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2UmVmc18xLmhhcyhyZWYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnblJlZihyZWYsIGN1cnJlbnRfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFZhbHVlcy5zZXQoY2FsbGJhY2tSZWYsIHJlZnMpO1xuICAgIH0sIFtyZWZzXSk7XG4gICAgcmV0dXJuIGNhbGxiYWNrUmVmO1xufVxuIiwiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG4vKipcbiAqIGNyZWF0ZXMgYSBNdXRhYmxlUmVmIHdpdGggcmVmIGNoYW5nZSBjYWxsYmFja1xuICogQHBhcmFtIGluaXRpYWxWYWx1ZSAtIGluaXRpYWwgcmVmIHZhbHVlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGEgY2FsbGJhY2sgdG8gcnVuIHdoZW4gdmFsdWUgY2hhbmdlc1xuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByZWYgPSB1c2VDYWxsYmFja1JlZigwLCAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiBjb25zb2xlLmxvZyhvbGRWYWx1ZSwgJy0+JywgbmV3VmFsdWUpO1xuICogcmVmLmN1cnJlbnQgPSAxO1xuICogLy8gcHJpbnRzIDAgLT4gMVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL2hvb2tzLXJlZmVyZW5jZS5odG1sI3VzZXJlZlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjdXNlY2FsbGJhY2tyZWYtLS10by1yZXBsYWNlLXJlYWN0dXNlcmVmXG4gKiBAcmV0dXJucyB7TXV0YWJsZVJlZk9iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhbGxiYWNrUmVmKGluaXRpYWxWYWx1ZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVmID0gdXNlU3RhdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gKHtcbiAgICAgICAgLy8gdmFsdWVcbiAgICAgICAgdmFsdWU6IGluaXRpYWxWYWx1ZSxcbiAgICAgICAgLy8gbGFzdCBjYWxsYmFja1xuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgIC8vIFwibWVtb2l6ZWRcIiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgICAgIGZhY2FkZToge1xuICAgICAgICAgICAgZ2V0IGN1cnJlbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZi52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgY3VycmVudCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0ID0gcmVmLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZWYudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVmLmNhbGxiYWNrKHZhbHVlLCBsYXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0pOyB9KVswXTtcbiAgICAvLyB1cGRhdGUgY2FsbGJhY2tcbiAgICByZWYuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICByZXR1cm4gcmVmLmZhY2FkZTtcbn1cbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX3Jlc3QgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbnZhciBTaWRlQ2FyID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHNpZGVDYXIgPSBfYS5zaWRlQ2FyLCByZXN0ID0gX19yZXN0KF9hLCBbXCJzaWRlQ2FyXCJdKTtcbiAgICBpZiAoIXNpZGVDYXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWRlY2FyOiBwbGVhc2UgcHJvdmlkZSBgc2lkZUNhcmAgcHJvcGVydHkgdG8gaW1wb3J0IHRoZSByaWdodCBjYXInKTtcbiAgICB9XG4gICAgdmFyIFRhcmdldCA9IHNpZGVDYXIucmVhZCgpO1xuICAgIGlmICghVGFyZ2V0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2lkZWNhciBtZWRpdW0gbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRhcmdldCwgX19hc3NpZ24oe30sIHJlc3QpKTtcbn07XG5TaWRlQ2FyLmlzU2lkZUNhckV4cG9ydCA9IHRydWU7XG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0U2lkZWNhcihtZWRpdW0sIGV4cG9ydGVkKSB7XG4gICAgbWVkaXVtLnVzZU1lZGl1bShleHBvcnRlZCk7XG4gICAgcmV0dXJuIFNpZGVDYXI7XG59XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuZnVuY3Rpb24gSXRvSShhKSB7XG4gICAgcmV0dXJuIGE7XG59XG5mdW5jdGlvbiBpbm5lckNyZWF0ZU1lZGl1bShkZWZhdWx0cywgbWlkZGxld2FyZSkge1xuICAgIGlmIChtaWRkbGV3YXJlID09PSB2b2lkIDApIHsgbWlkZGxld2FyZSA9IEl0b0k7IH1cbiAgICB2YXIgYnVmZmVyID0gW107XG4gICAgdmFyIGFzc2lnbmVkID0gZmFsc2U7XG4gICAgdmFyIG1lZGl1bSA9IHtcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGFzc2lnbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWRlY2FyOiBjb3VsZCBub3QgYHJlYWRgIGZyb20gYW4gYGFzc2lnbmVkYCBtZWRpdW0uIGByZWFkYCBjb3VsZCBiZSB1c2VkIG9ubHkgd2l0aCBgdXNlTWVkaXVtYC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcltidWZmZXIubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgICAgIH0sXG4gICAgICAgIHVzZU1lZGl1bTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gbWlkZGxld2FyZShkYXRhLCBhc3NpZ25lZCk7XG4gICAgICAgICAgICBidWZmZXIucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gYnVmZmVyLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geCAhPT0gaXRlbTsgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhc3NpZ25TeW5jTWVkaXVtOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIGFzc2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHdoaWxlIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNicyA9IGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBjYnMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWZmZXIgPSB7XG4gICAgICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIGNiKHgpOyB9LFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVmZmVyOyB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgYXNzaWduTWVkaXVtOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIGFzc2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBwZW5kaW5nUXVldWUgPSBbXTtcbiAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNicyA9IGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBjYnMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1F1ZXVlID0gYnVmZmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGV4ZWN1dGVRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2JzID0gcGVuZGluZ1F1ZXVlO1xuICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIGNicy5mb3JFYWNoKGNiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY3ljbGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGV4ZWN1dGVRdWV1ZSk7IH07XG4gICAgICAgICAgICBjeWNsZSgpO1xuICAgICAgICAgICAgYnVmZmVyID0ge1xuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZS5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICBjeWNsZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZSA9IHBlbmRpbmdRdWV1ZS5maWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBtZWRpdW07XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVkaXVtKGRlZmF1bHRzLCBtaWRkbGV3YXJlKSB7XG4gICAgaWYgKG1pZGRsZXdhcmUgPT09IHZvaWQgMCkgeyBtaWRkbGV3YXJlID0gSXRvSTsgfVxuICAgIHJldHVybiBpbm5lckNyZWF0ZU1lZGl1bShkZWZhdWx0cywgbWlkZGxld2FyZSk7XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNpZGVjYXJNZWRpdW0ob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIG1lZGl1bSA9IGlubmVyQ3JlYXRlTWVkaXVtKG51bGwpO1xuICAgIG1lZGl1bS5vcHRpb25zID0gX19hc3NpZ24oeyBhc3luYzogdHJ1ZSwgc3NyOiBmYWxzZSB9LCBvcHRpb25zKTtcbiAgICByZXR1cm4gbWVkaXVtO1xufVxuIiwiLy8gc3JjL3ByaW1pdGl2ZS50c3hcbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5mdW5jdGlvbiBjb21wb3NlRXZlbnRIYW5kbGVycyhvcmlnaW5hbEV2ZW50SGFuZGxlciwgb3VyRXZlbnRIYW5kbGVyLCB7IGNoZWNrRm9yRGVmYXVsdFByZXZlbnRlZCA9IHRydWUgfSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBoYW5kbGVFdmVudChldmVudCkge1xuICAgIG9yaWdpbmFsRXZlbnRIYW5kbGVyPy4oZXZlbnQpO1xuICAgIGlmIChjaGVja0ZvckRlZmF1bHRQcmV2ZW50ZWQgPT09IGZhbHNlIHx8ICFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm4gb3VyRXZlbnRIYW5kbGVyPy4oZXZlbnQpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIGdldE93bmVyV2luZG93KGVsZW1lbnQpIHtcbiAgaWYgKCFjYW5Vc2VET00pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWNjZXNzIHdpbmRvdyBvdXRzaWRlIG9mIHRoZSBET01cIik7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ/Lm93bmVyRG9jdW1lbnQ/LmRlZmF1bHRWaWV3ID8/IHdpbmRvdztcbn1cbmZ1bmN0aW9uIGdldE93bmVyRG9jdW1lbnQoZWxlbWVudCkge1xuICBpZiAoIWNhblVzZURPTSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhY2Nlc3MgZG9jdW1lbnQgb3V0c2lkZSBvZiB0aGUgRE9NXCIpO1xuICB9XG4gIHJldHVybiBlbGVtZW50Py5vd25lckRvY3VtZW50ID8/IGRvY3VtZW50O1xufVxuZnVuY3Rpb24gZ2V0QWN0aXZlRWxlbWVudChub2RlLCBhY3RpdmVEZXNjZW5kYW50ID0gZmFsc2UpIHtcbiAgY29uc3QgeyBhY3RpdmVFbGVtZW50IH0gPSBnZXRPd25lckRvY3VtZW50KG5vZGUpO1xuICBpZiAoIWFjdGl2ZUVsZW1lbnQ/Lm5vZGVOYW1lKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGlzRnJhbWUoYWN0aXZlRWxlbWVudCkgJiYgYWN0aXZlRWxlbWVudC5jb250ZW50RG9jdW1lbnQpIHtcbiAgICByZXR1cm4gZ2V0QWN0aXZlRWxlbWVudChhY3RpdmVFbGVtZW50LmNvbnRlbnREb2N1bWVudC5ib2R5LCBhY3RpdmVEZXNjZW5kYW50KTtcbiAgfVxuICBpZiAoYWN0aXZlRGVzY2VuZGFudCkge1xuICAgIGNvbnN0IGlkID0gYWN0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIik7XG4gICAgaWYgKGlkKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZ2V0T3duZXJEb2N1bWVudChhY3RpdmVFbGVtZW50KS5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFjdGl2ZUVsZW1lbnQ7XG59XG5mdW5jdGlvbiBpc0ZyYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZSA9PT0gXCJJRlJBTUVcIjtcbn1cbmV4cG9ydCB7XG4gIGNhblVzZURPTSxcbiAgY29tcG9zZUV2ZW50SGFuZGxlcnMsXG4gIGdldEFjdGl2ZUVsZW1lbnQsXG4gIGdldE93bmVyRG9jdW1lbnQsXG4gIGdldE93bmVyV2luZG93LFxuICBpc0ZyYW1lXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvY29udGV4dC9zcmMvY3JlYXRlLWNvbnRleHQudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gY3JlYXRlQ29udGV4dDIocm9vdENvbXBvbmVudE5hbWUsIGRlZmF1bHRDb250ZXh0KSB7XG4gIGNvbnN0IENvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KGRlZmF1bHRDb250ZXh0KTtcbiAgY29uc3QgUHJvdmlkZXIgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5jb250ZXh0IH0gPSBwcm9wcztcbiAgICBjb25zdCB2YWx1ZSA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gY29udGV4dCwgT2JqZWN0LnZhbHVlcyhjb250ZXh0KSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZSwgY2hpbGRyZW4gfSk7XG4gIH07XG4gIFByb3ZpZGVyLmRpc3BsYXlOYW1lID0gcm9vdENvbXBvbmVudE5hbWUgKyBcIlByb3ZpZGVyXCI7XG4gIGZ1bmN0aW9uIHVzZUNvbnRleHQyKGNvbnN1bWVyTmFtZSkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KENvbnRleHQpO1xuICAgIGlmIChjb250ZXh0KSByZXR1cm4gY29udGV4dDtcbiAgICBpZiAoZGVmYXVsdENvbnRleHQgIT09IHZvaWQgMCkgcmV0dXJuIGRlZmF1bHRDb250ZXh0O1xuICAgIHRocm93IG5ldyBFcnJvcihgXFxgJHtjb25zdW1lck5hbWV9XFxgIG11c3QgYmUgdXNlZCB3aXRoaW4gXFxgJHtyb290Q29tcG9uZW50TmFtZX1cXGBgKTtcbiAgfVxuICByZXR1cm4gW1Byb3ZpZGVyLCB1c2VDb250ZXh0Ml07XG59XG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0U2NvcGUoc2NvcGVOYW1lLCBjcmVhdGVDb250ZXh0U2NvcGVEZXBzID0gW10pIHtcbiAgbGV0IGRlZmF1bHRDb250ZXh0cyA9IFtdO1xuICBmdW5jdGlvbiBjcmVhdGVDb250ZXh0Myhyb290Q29tcG9uZW50TmFtZSwgZGVmYXVsdENvbnRleHQpIHtcbiAgICBjb25zdCBCYXNlQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoZGVmYXVsdENvbnRleHQpO1xuICAgIGNvbnN0IGluZGV4ID0gZGVmYXVsdENvbnRleHRzLmxlbmd0aDtcbiAgICBkZWZhdWx0Q29udGV4dHMgPSBbLi4uZGVmYXVsdENvbnRleHRzLCBkZWZhdWx0Q29udGV4dF07XG4gICAgY29uc3QgUHJvdmlkZXIgPSAocHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHsgc2NvcGUsIGNoaWxkcmVuLCAuLi5jb250ZXh0IH0gPSBwcm9wcztcbiAgICAgIGNvbnN0IENvbnRleHQgPSBzY29wZT8uW3Njb3BlTmFtZV0/LltpbmRleF0gfHwgQmFzZUNvbnRleHQ7XG4gICAgICBjb25zdCB2YWx1ZSA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gY29udGV4dCwgT2JqZWN0LnZhbHVlcyhjb250ZXh0KSk7XG4gICAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChDb250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlLCBjaGlsZHJlbiB9KTtcbiAgICB9O1xuICAgIFByb3ZpZGVyLmRpc3BsYXlOYW1lID0gcm9vdENvbXBvbmVudE5hbWUgKyBcIlByb3ZpZGVyXCI7XG4gICAgZnVuY3Rpb24gdXNlQ29udGV4dDIoY29uc3VtZXJOYW1lLCBzY29wZSkge1xuICAgICAgY29uc3QgQ29udGV4dCA9IHNjb3BlPy5bc2NvcGVOYW1lXT8uW2luZGV4XSB8fCBCYXNlQ29udGV4dDtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KENvbnRleHQpO1xuICAgICAgaWYgKGNvbnRleHQpIHJldHVybiBjb250ZXh0O1xuICAgICAgaWYgKGRlZmF1bHRDb250ZXh0ICE9PSB2b2lkIDApIHJldHVybiBkZWZhdWx0Q29udGV4dDtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXFxgJHtjb25zdW1lck5hbWV9XFxgIG11c3QgYmUgdXNlZCB3aXRoaW4gXFxgJHtyb290Q29tcG9uZW50TmFtZX1cXGBgKTtcbiAgICB9XG4gICAgcmV0dXJuIFtQcm92aWRlciwgdXNlQ29udGV4dDJdO1xuICB9XG4gIGNvbnN0IGNyZWF0ZVNjb3BlID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjb3BlQ29udGV4dHMgPSBkZWZhdWx0Q29udGV4dHMubWFwKChkZWZhdWx0Q29udGV4dCkgPT4ge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUNvbnRleHQoZGVmYXVsdENvbnRleHQpO1xuICAgIH0pO1xuICAgIHJldHVybiBmdW5jdGlvbiB1c2VTY29wZShzY29wZSkge1xuICAgICAgY29uc3QgY29udGV4dHMgPSBzY29wZT8uW3Njb3BlTmFtZV0gfHwgc2NvcGVDb250ZXh0cztcbiAgICAgIHJldHVybiBSZWFjdC51c2VNZW1vKFxuICAgICAgICAoKSA9PiAoeyBbYF9fc2NvcGUke3Njb3BlTmFtZX1gXTogeyAuLi5zY29wZSwgW3Njb3BlTmFtZV06IGNvbnRleHRzIH0gfSksXG4gICAgICAgIFtzY29wZSwgY29udGV4dHNdXG4gICAgICApO1xuICAgIH07XG4gIH07XG4gIGNyZWF0ZVNjb3BlLnNjb3BlTmFtZSA9IHNjb3BlTmFtZTtcbiAgcmV0dXJuIFtjcmVhdGVDb250ZXh0MywgY29tcG9zZUNvbnRleHRTY29wZXMoY3JlYXRlU2NvcGUsIC4uLmNyZWF0ZUNvbnRleHRTY29wZURlcHMpXTtcbn1cbmZ1bmN0aW9uIGNvbXBvc2VDb250ZXh0U2NvcGVzKC4uLnNjb3Blcykge1xuICBjb25zdCBiYXNlU2NvcGUgPSBzY29wZXNbMF07XG4gIGlmIChzY29wZXMubGVuZ3RoID09PSAxKSByZXR1cm4gYmFzZVNjb3BlO1xuICBjb25zdCBjcmVhdGVTY29wZSA9ICgpID0+IHtcbiAgICBjb25zdCBzY29wZUhvb2tzID0gc2NvcGVzLm1hcCgoY3JlYXRlU2NvcGUyKSA9PiAoe1xuICAgICAgdXNlU2NvcGU6IGNyZWF0ZVNjb3BlMigpLFxuICAgICAgc2NvcGVOYW1lOiBjcmVhdGVTY29wZTIuc2NvcGVOYW1lXG4gICAgfSkpO1xuICAgIHJldHVybiBmdW5jdGlvbiB1c2VDb21wb3NlZFNjb3BlcyhvdmVycmlkZVNjb3Blcykge1xuICAgICAgY29uc3QgbmV4dFNjb3BlcyA9IHNjb3BlSG9va3MucmVkdWNlKChuZXh0U2NvcGVzMiwgeyB1c2VTY29wZSwgc2NvcGVOYW1lIH0pID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcGVQcm9wcyA9IHVzZVNjb3BlKG92ZXJyaWRlU2NvcGVzKTtcbiAgICAgICAgY29uc3QgY3VycmVudFNjb3BlID0gc2NvcGVQcm9wc1tgX19zY29wZSR7c2NvcGVOYW1lfWBdO1xuICAgICAgICByZXR1cm4geyAuLi5uZXh0U2NvcGVzMiwgLi4uY3VycmVudFNjb3BlIH07XG4gICAgICB9LCB7fSk7XG4gICAgICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiAoeyBbYF9fc2NvcGUke2Jhc2VTY29wZS5zY29wZU5hbWV9YF06IG5leHRTY29wZXMgfSksIFtuZXh0U2NvcGVzXSk7XG4gICAgfTtcbiAgfTtcbiAgY3JlYXRlU2NvcGUuc2NvcGVOYW1lID0gYmFzZVNjb3BlLnNjb3BlTmFtZTtcbiAgcmV0dXJuIGNyZWF0ZVNjb3BlO1xufVxuZXhwb3J0IHtcbiAgY3JlYXRlQ29udGV4dDIgYXMgY3JlYXRlQ29udGV4dCxcbiAgY3JlYXRlQ29udGV4dFNjb3BlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9kaWFsb2cudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNvbXBvc2VFdmVudEhhbmRsZXJzIH0gZnJvbSBcIkByYWRpeC11aS9wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0LCBjcmVhdGVDb250ZXh0U2NvcGUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbnRleHRcIjtcbmltcG9ydCB7IHVzZUlkIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1pZFwiO1xuaW1wb3J0IHsgdXNlQ29udHJvbGxhYmxlU3RhdGUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jb250cm9sbGFibGUtc3RhdGVcIjtcbmltcG9ydCB7IERpc21pc3NhYmxlTGF5ZXIgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWRpc21pc3NhYmxlLWxheWVyXCI7XG5pbXBvcnQgeyBGb2N1c1Njb3BlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1mb2N1cy1zY29wZVwiO1xuaW1wb3J0IHsgUG9ydGFsIGFzIFBvcnRhbFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcG9ydGFsXCI7XG5pbXBvcnQgeyBQcmVzZW5jZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJlc2VuY2VcIjtcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VGb2N1c0d1YXJkcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtZm9jdXMtZ3VhcmRzXCI7XG5pbXBvcnQgeyBSZW1vdmVTY3JvbGwgfSBmcm9tIFwicmVhY3QtcmVtb3ZlLXNjcm9sbFwiO1xuaW1wb3J0IHsgaGlkZU90aGVycyB9IGZyb20gXCJhcmlhLWhpZGRlblwiO1xuaW1wb3J0IHsgY3JlYXRlU2xvdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3Qtc2xvdFwiO1xuaW1wb3J0IHsgRnJhZ21lbnQsIGpzeCwganN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIERJQUxPR19OQU1FID0gXCJEaWFsb2dcIjtcbnZhciBbY3JlYXRlRGlhbG9nQ29udGV4dCwgY3JlYXRlRGlhbG9nU2NvcGVdID0gY3JlYXRlQ29udGV4dFNjb3BlKERJQUxPR19OQU1FKTtcbnZhciBbRGlhbG9nUHJvdmlkZXIsIHVzZURpYWxvZ0NvbnRleHRdID0gY3JlYXRlRGlhbG9nQ29udGV4dChESUFMT0dfTkFNRSk7XG52YXIgRGlhbG9nID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBfX3Njb3BlRGlhbG9nLFxuICAgIGNoaWxkcmVuLFxuICAgIG9wZW46IG9wZW5Qcm9wLFxuICAgIGRlZmF1bHRPcGVuLFxuICAgIG9uT3BlbkNoYW5nZSxcbiAgICBtb2RhbCA9IHRydWVcbiAgfSA9IHByb3BzO1xuICBjb25zdCB0cmlnZ2VyUmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBjb250ZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VDb250cm9sbGFibGVTdGF0ZSh7XG4gICAgcHJvcDogb3BlblByb3AsXG4gICAgZGVmYXVsdFByb3A6IGRlZmF1bHRPcGVuID8/IGZhbHNlLFxuICAgIG9uQ2hhbmdlOiBvbk9wZW5DaGFuZ2UsXG4gICAgY2FsbGVyOiBESUFMT0dfTkFNRVxuICB9KTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgRGlhbG9nUHJvdmlkZXIsXG4gICAge1xuICAgICAgc2NvcGU6IF9fc2NvcGVEaWFsb2csXG4gICAgICB0cmlnZ2VyUmVmLFxuICAgICAgY29udGVudFJlZixcbiAgICAgIGNvbnRlbnRJZDogdXNlSWQoKSxcbiAgICAgIHRpdGxlSWQ6IHVzZUlkKCksXG4gICAgICBkZXNjcmlwdGlvbklkOiB1c2VJZCgpLFxuICAgICAgb3BlbixcbiAgICAgIG9uT3BlbkNoYW5nZTogc2V0T3BlbixcbiAgICAgIG9uT3BlblRvZ2dsZTogUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4gc2V0T3BlbigocHJldk9wZW4pID0+ICFwcmV2T3BlbiksIFtzZXRPcGVuXSksXG4gICAgICBtb2RhbCxcbiAgICAgIGNoaWxkcmVuXG4gICAgfVxuICApO1xufTtcbkRpYWxvZy5kaXNwbGF5TmFtZSA9IERJQUxPR19OQU1FO1xudmFyIFRSSUdHRVJfTkFNRSA9IFwiRGlhbG9nVHJpZ2dlclwiO1xudmFyIERpYWxvZ1RyaWdnZXIgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4udHJpZ2dlclByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChUUklHR0VSX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGNvbXBvc2VkVHJpZ2dlclJlZiA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIGNvbnRleHQudHJpZ2dlclJlZik7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBQcmltaXRpdmUuYnV0dG9uLFxuICAgICAge1xuICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICBcImFyaWEtaGFzcG9wdXBcIjogXCJkaWFsb2dcIixcbiAgICAgICAgXCJhcmlhLWV4cGFuZGVkXCI6IGNvbnRleHQub3BlbixcbiAgICAgICAgXCJhcmlhLWNvbnRyb2xzXCI6IGNvbnRleHQuY29udGVudElkLFxuICAgICAgICBcImRhdGEtc3RhdGVcIjogZ2V0U3RhdGUoY29udGV4dC5vcGVuKSxcbiAgICAgICAgLi4udHJpZ2dlclByb3BzLFxuICAgICAgICByZWY6IGNvbXBvc2VkVHJpZ2dlclJlZixcbiAgICAgICAgb25DbGljazogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25DbGljaywgY29udGV4dC5vbk9wZW5Ub2dnbGUpXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbkRpYWxvZ1RyaWdnZXIuZGlzcGxheU5hbWUgPSBUUklHR0VSX05BTUU7XG52YXIgUE9SVEFMX05BTUUgPSBcIkRpYWxvZ1BvcnRhbFwiO1xudmFyIFtQb3J0YWxQcm92aWRlciwgdXNlUG9ydGFsQ29udGV4dF0gPSBjcmVhdGVEaWFsb2dDb250ZXh0KFBPUlRBTF9OQU1FLCB7XG4gIGZvcmNlTW91bnQ6IHZvaWQgMFxufSk7XG52YXIgRGlhbG9nUG9ydGFsID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgX19zY29wZURpYWxvZywgZm9yY2VNb3VudCwgY2hpbGRyZW4sIGNvbnRhaW5lciB9ID0gcHJvcHM7XG4gIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KFBPUlRBTF9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUG9ydGFsUHJvdmlkZXIsIHsgc2NvcGU6IF9fc2NvcGVEaWFsb2csIGZvcmNlTW91bnQsIGNoaWxkcmVuOiBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChjaGlsZCkgPT4gLyogQF9fUFVSRV9fICovIGpzeChQcmVzZW5jZSwgeyBwcmVzZW50OiBmb3JjZU1vdW50IHx8IGNvbnRleHQub3BlbiwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goUG9ydGFsUHJpbWl0aXZlLCB7IGFzQ2hpbGQ6IHRydWUsIGNvbnRhaW5lciwgY2hpbGRyZW46IGNoaWxkIH0pIH0pKSB9KTtcbn07XG5EaWFsb2dQb3J0YWwuZGlzcGxheU5hbWUgPSBQT1JUQUxfTkFNRTtcbnZhciBPVkVSTEFZX05BTUUgPSBcIkRpYWxvZ092ZXJsYXlcIjtcbnZhciBEaWFsb2dPdmVybGF5ID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCBwb3J0YWxDb250ZXh0ID0gdXNlUG9ydGFsQ29udGV4dChPVkVSTEFZX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IHsgZm9yY2VNb3VudCA9IHBvcnRhbENvbnRleHQuZm9yY2VNb3VudCwgLi4ub3ZlcmxheVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChPVkVSTEFZX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiBjb250ZXh0Lm1vZGFsID8gLyogQF9fUFVSRV9fICovIGpzeChQcmVzZW5jZSwgeyBwcmVzZW50OiBmb3JjZU1vdW50IHx8IGNvbnRleHQub3BlbiwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goRGlhbG9nT3ZlcmxheUltcGwsIHsgLi4ub3ZlcmxheVByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSB9KSA6IG51bGw7XG4gIH1cbik7XG5EaWFsb2dPdmVybGF5LmRpc3BsYXlOYW1lID0gT1ZFUkxBWV9OQU1FO1xudmFyIFNsb3QgPSBjcmVhdGVTbG90KFwiRGlhbG9nT3ZlcmxheS5SZW1vdmVTY3JvbGxcIik7XG52YXIgRGlhbG9nT3ZlcmxheUltcGwgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4ub3ZlcmxheVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChPVkVSTEFZX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAoXG4gICAgICAvLyBNYWtlIHN1cmUgYENvbnRlbnRgIGlzIHNjcm9sbGFibGUgZXZlbiB3aGVuIGl0IGRvZXNuJ3QgbGl2ZSBpbnNpZGUgYFJlbW92ZVNjcm9sbGBcbiAgICAgIC8vIGllLiB3aGVuIGBPdmVybGF5YCBhbmQgYENvbnRlbnRgIGFyZSBzaWJsaW5nc1xuICAgICAgLyogQF9fUFVSRV9fICovIGpzeChSZW1vdmVTY3JvbGwsIHsgYXM6IFNsb3QsIGFsbG93UGluY2hab29tOiB0cnVlLCBzaGFyZHM6IFtjb250ZXh0LmNvbnRlbnRSZWZdLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgICAgUHJpbWl0aXZlLmRpdixcbiAgICAgICAge1xuICAgICAgICAgIFwiZGF0YS1zdGF0ZVwiOiBnZXRTdGF0ZShjb250ZXh0Lm9wZW4pLFxuICAgICAgICAgIC4uLm92ZXJsYXlQcm9wcyxcbiAgICAgICAgICByZWY6IGZvcndhcmRlZFJlZixcbiAgICAgICAgICBzdHlsZTogeyBwb2ludGVyRXZlbnRzOiBcImF1dG9cIiwgLi4ub3ZlcmxheVByb3BzLnN0eWxlIH1cbiAgICAgICAgfVxuICAgICAgKSB9KVxuICAgICk7XG4gIH1cbik7XG52YXIgQ09OVEVOVF9OQU1FID0gXCJEaWFsb2dDb250ZW50XCI7XG52YXIgRGlhbG9nQ29udGVudCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgcG9ydGFsQ29udGV4dCA9IHVzZVBvcnRhbENvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCB7IGZvcmNlTW91bnQgPSBwb3J0YWxDb250ZXh0LmZvcmNlTW91bnQsIC4uLmNvbnRlbnRQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmVzZW5jZSwgeyBwcmVzZW50OiBmb3JjZU1vdW50IHx8IGNvbnRleHQub3BlbiwgY2hpbGRyZW46IGNvbnRleHQubW9kYWwgPyAvKiBAX19QVVJFX18gKi8ganN4KERpYWxvZ0NvbnRlbnRNb2RhbCwgeyAuLi5jb250ZW50UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pIDogLyogQF9fUFVSRV9fICovIGpzeChEaWFsb2dDb250ZW50Tm9uTW9kYWwsIHsgLi4uY29udGVudFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSB9KTtcbiAgfVxuKTtcbkRpYWxvZ0NvbnRlbnQuZGlzcGxheU5hbWUgPSBDT05URU5UX05BTUU7XG52YXIgRGlhbG9nQ29udGVudE1vZGFsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDT05URU5UX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgY29udGV4dC5jb250ZW50UmVmLCBjb250ZW50UmVmKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IGNvbnRlbnRSZWYuY3VycmVudDtcbiAgICAgIGlmIChjb250ZW50KSByZXR1cm4gaGlkZU90aGVycyhjb250ZW50KTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBEaWFsb2dDb250ZW50SW1wbCxcbiAgICAgIHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIHJlZjogY29tcG9zZWRSZWZzLFxuICAgICAgICB0cmFwRm9jdXM6IGNvbnRleHQub3BlbixcbiAgICAgICAgZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzOiB0cnVlLFxuICAgICAgICBvbkNsb3NlQXV0b0ZvY3VzOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkNsb3NlQXV0b0ZvY3VzLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNvbnRleHQudHJpZ2dlclJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgICAgICB9KSxcbiAgICAgICAgb25Qb2ludGVyRG93bk91dHNpZGU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uUG9pbnRlckRvd25PdXRzaWRlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBvcmlnaW5hbEV2ZW50ID0gZXZlbnQuZGV0YWlsLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgY29uc3QgY3RybExlZnRDbGljayA9IG9yaWdpbmFsRXZlbnQuYnV0dG9uID09PSAwICYmIG9yaWdpbmFsRXZlbnQuY3RybEtleSA9PT0gdHJ1ZTtcbiAgICAgICAgICBjb25zdCBpc1JpZ2h0Q2xpY2sgPSBvcmlnaW5hbEV2ZW50LmJ1dHRvbiA9PT0gMiB8fCBjdHJsTGVmdENsaWNrO1xuICAgICAgICAgIGlmIChpc1JpZ2h0Q2xpY2spIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLFxuICAgICAgICBvbkZvY3VzT3V0c2lkZTogY29tcG9zZUV2ZW50SGFuZGxlcnMoXG4gICAgICAgICAgcHJvcHMub25Gb2N1c091dHNpZGUsXG4gICAgICAgICAgKGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xudmFyIERpYWxvZ0NvbnRlbnROb25Nb2RhbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gICAgY29uc3QgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIERpYWxvZ0NvbnRlbnRJbXBsLFxuICAgICAge1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgcmVmOiBmb3J3YXJkZWRSZWYsXG4gICAgICAgIHRyYXBGb2N1czogZmFsc2UsXG4gICAgICAgIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50czogZmFsc2UsXG4gICAgICAgIG9uQ2xvc2VBdXRvRm9jdXM6IChldmVudCkgPT4ge1xuICAgICAgICAgIHByb3BzLm9uQ2xvc2VBdXRvRm9jdXM/LihldmVudCk7XG4gICAgICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmLmN1cnJlbnQpIGNvbnRleHQudHJpZ2dlclJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaGFzSW50ZXJhY3RlZE91dHNpZGVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgIGhhc1BvaW50ZXJEb3duT3V0c2lkZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW50ZXJhY3RPdXRzaWRlOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICBwcm9wcy5vbkludGVyYWN0T3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIGhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50LnR5cGUgPT09IFwicG9pbnRlcmRvd25cIikge1xuICAgICAgICAgICAgICBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICBjb25zdCB0YXJnZXRJc1RyaWdnZXIgPSBjb250ZXh0LnRyaWdnZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgICBpZiAodGFyZ2V0SXNUcmlnZ2VyKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmIChldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudC50eXBlID09PSBcImZvY3VzaW5cIiAmJiBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xudmFyIERpYWxvZ0NvbnRlbnRJbXBsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIHRyYXBGb2N1cywgb25PcGVuQXV0b0ZvY3VzLCBvbkNsb3NlQXV0b0ZvY3VzLCAuLi5jb250ZW50UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgY29udGVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCBjb250ZW50UmVmKTtcbiAgICB1c2VGb2N1c0d1YXJkcygpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4cyhGcmFnbWVudCwgeyBjaGlsZHJlbjogW1xuICAgICAgLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgICAgRm9jdXNTY29wZSxcbiAgICAgICAge1xuICAgICAgICAgIGFzQ2hpbGQ6IHRydWUsXG4gICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICB0cmFwcGVkOiB0cmFwRm9jdXMsXG4gICAgICAgICAgb25Nb3VudEF1dG9Gb2N1czogb25PcGVuQXV0b0ZvY3VzLFxuICAgICAgICAgIG9uVW5tb3VudEF1dG9Gb2N1czogb25DbG9zZUF1dG9Gb2N1cyxcbiAgICAgICAgICBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgICAgICAgIERpc21pc3NhYmxlTGF5ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJvbGU6IFwiZGlhbG9nXCIsXG4gICAgICAgICAgICAgIGlkOiBjb250ZXh0LmNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgXCJhcmlhLWRlc2NyaWJlZGJ5XCI6IGNvbnRleHQuZGVzY3JpcHRpb25JZCxcbiAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogY29udGV4dC50aXRsZUlkLFxuICAgICAgICAgICAgICBcImRhdGEtc3RhdGVcIjogZ2V0U3RhdGUoY29udGV4dC5vcGVuKSxcbiAgICAgICAgICAgICAgLi4uY29udGVudFByb3BzLFxuICAgICAgICAgICAgICByZWY6IGNvbXBvc2VkUmVmcyxcbiAgICAgICAgICAgICAgb25EaXNtaXNzOiAoKSA9PiBjb250ZXh0Lm9uT3BlbkNoYW5nZShmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKiBAX19QVVJFX18gKi8ganN4cyhGcmFnbWVudCwgeyBjaGlsZHJlbjogW1xuICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4KFRpdGxlV2FybmluZywgeyB0aXRsZUlkOiBjb250ZXh0LnRpdGxlSWQgfSksXG4gICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goRGVzY3JpcHRpb25XYXJuaW5nLCB7IGNvbnRlbnRSZWYsIGRlc2NyaXB0aW9uSWQ6IGNvbnRleHQuZGVzY3JpcHRpb25JZCB9KVxuICAgICAgXSB9KVxuICAgIF0gfSk7XG4gIH1cbik7XG52YXIgVElUTEVfTkFNRSA9IFwiRGlhbG9nVGl0bGVcIjtcbnZhciBEaWFsb2dUaXRsZSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi50aXRsZVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChUSVRMRV9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuaDIsIHsgaWQ6IGNvbnRleHQudGl0bGVJZCwgLi4udGl0bGVQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSk7XG4gIH1cbik7XG5EaWFsb2dUaXRsZS5kaXNwbGF5TmFtZSA9IFRJVExFX05BTUU7XG52YXIgREVTQ1JJUFRJT05fTkFNRSA9IFwiRGlhbG9nRGVzY3JpcHRpb25cIjtcbnZhciBEaWFsb2dEZXNjcmlwdGlvbiA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi5kZXNjcmlwdGlvblByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChERVNDUklQVElPTl9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUucCwgeyBpZDogY29udGV4dC5kZXNjcmlwdGlvbklkLCAuLi5kZXNjcmlwdGlvblByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KTtcbiAgfVxuKTtcbkRpYWxvZ0Rlc2NyaXB0aW9uLmRpc3BsYXlOYW1lID0gREVTQ1JJUFRJT05fTkFNRTtcbnZhciBDTE9TRV9OQU1FID0gXCJEaWFsb2dDbG9zZVwiO1xudmFyIERpYWxvZ0Nsb3NlID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLmNsb3NlUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENMT1NFX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgUHJpbWl0aXZlLmJ1dHRvbixcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgLi4uY2xvc2VQcm9wcyxcbiAgICAgICAgcmVmOiBmb3J3YXJkZWRSZWYsXG4gICAgICAgIG9uQ2xpY2s6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQ2xpY2ssICgpID0+IGNvbnRleHQub25PcGVuQ2hhbmdlKGZhbHNlKSlcbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xuRGlhbG9nQ2xvc2UuZGlzcGxheU5hbWUgPSBDTE9TRV9OQU1FO1xuZnVuY3Rpb24gZ2V0U3RhdGUob3Blbikge1xuICByZXR1cm4gb3BlbiA/IFwib3BlblwiIDogXCJjbG9zZWRcIjtcbn1cbnZhciBUSVRMRV9XQVJOSU5HX05BTUUgPSBcIkRpYWxvZ1RpdGxlV2FybmluZ1wiO1xudmFyIFtXYXJuaW5nUHJvdmlkZXIsIHVzZVdhcm5pbmdDb250ZXh0XSA9IGNyZWF0ZUNvbnRleHQoVElUTEVfV0FSTklOR19OQU1FLCB7XG4gIGNvbnRlbnROYW1lOiBDT05URU5UX05BTUUsXG4gIHRpdGxlTmFtZTogVElUTEVfTkFNRSxcbiAgZG9jc1NsdWc6IFwiZGlhbG9nXCJcbn0pO1xudmFyIFRpdGxlV2FybmluZyA9ICh7IHRpdGxlSWQgfSkgPT4ge1xuICBjb25zdCB0aXRsZVdhcm5pbmdDb250ZXh0ID0gdXNlV2FybmluZ0NvbnRleHQoVElUTEVfV0FSTklOR19OQU1FKTtcbiAgY29uc3QgTUVTU0FHRSA9IGBcXGAke3RpdGxlV2FybmluZ0NvbnRleHQuY29udGVudE5hbWV9XFxgIHJlcXVpcmVzIGEgXFxgJHt0aXRsZVdhcm5pbmdDb250ZXh0LnRpdGxlTmFtZX1cXGAgZm9yIHRoZSBjb21wb25lbnQgdG8gYmUgYWNjZXNzaWJsZSBmb3Igc2NyZWVuIHJlYWRlciB1c2Vycy5cblxuSWYgeW91IHdhbnQgdG8gaGlkZSB0aGUgXFxgJHt0aXRsZVdhcm5pbmdDb250ZXh0LnRpdGxlTmFtZX1cXGAsIHlvdSBjYW4gd3JhcCBpdCB3aXRoIG91ciBWaXN1YWxseUhpZGRlbiBjb21wb25lbnQuXG5cbkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgaHR0cHM6Ly9yYWRpeC11aS5jb20vcHJpbWl0aXZlcy9kb2NzL2NvbXBvbmVudHMvJHt0aXRsZVdhcm5pbmdDb250ZXh0LmRvY3NTbHVnfWA7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRpdGxlSWQpIHtcbiAgICAgIGNvbnN0IGhhc1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGl0bGVJZCk7XG4gICAgICBpZiAoIWhhc1RpdGxlKSBjb25zb2xlLmVycm9yKE1FU1NBR0UpO1xuICAgIH1cbiAgfSwgW01FU1NBR0UsIHRpdGxlSWRdKTtcbiAgcmV0dXJuIG51bGw7XG59O1xudmFyIERFU0NSSVBUSU9OX1dBUk5JTkdfTkFNRSA9IFwiRGlhbG9nRGVzY3JpcHRpb25XYXJuaW5nXCI7XG52YXIgRGVzY3JpcHRpb25XYXJuaW5nID0gKHsgY29udGVudFJlZiwgZGVzY3JpcHRpb25JZCB9KSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0aW9uV2FybmluZ0NvbnRleHQgPSB1c2VXYXJuaW5nQ29udGV4dChERVNDUklQVElPTl9XQVJOSU5HX05BTUUpO1xuICBjb25zdCBNRVNTQUdFID0gYFdhcm5pbmc6IE1pc3NpbmcgXFxgRGVzY3JpcHRpb25cXGAgb3IgXFxgYXJpYS1kZXNjcmliZWRieT17dW5kZWZpbmVkfVxcYCBmb3IgeyR7ZGVzY3JpcHRpb25XYXJuaW5nQ29udGV4dC5jb250ZW50TmFtZX19LmA7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZGVzY3JpYmVkQnlJZCA9IGNvbnRlbnRSZWYuY3VycmVudD8uZ2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiKTtcbiAgICBpZiAoZGVzY3JpcHRpb25JZCAmJiBkZXNjcmliZWRCeUlkKSB7XG4gICAgICBjb25zdCBoYXNEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRlc2NyaXB0aW9uSWQpO1xuICAgICAgaWYgKCFoYXNEZXNjcmlwdGlvbikgY29uc29sZS53YXJuKE1FU1NBR0UpO1xuICAgIH1cbiAgfSwgW01FU1NBR0UsIGNvbnRlbnRSZWYsIGRlc2NyaXB0aW9uSWRdKTtcbiAgcmV0dXJuIG51bGw7XG59O1xudmFyIFJvb3QgPSBEaWFsb2c7XG52YXIgVHJpZ2dlciA9IERpYWxvZ1RyaWdnZXI7XG52YXIgUG9ydGFsID0gRGlhbG9nUG9ydGFsO1xudmFyIE92ZXJsYXkgPSBEaWFsb2dPdmVybGF5O1xudmFyIENvbnRlbnQgPSBEaWFsb2dDb250ZW50O1xudmFyIFRpdGxlID0gRGlhbG9nVGl0bGU7XG52YXIgRGVzY3JpcHRpb24gPSBEaWFsb2dEZXNjcmlwdGlvbjtcbnZhciBDbG9zZSA9IERpYWxvZ0Nsb3NlO1xuZXhwb3J0IHtcbiAgQ2xvc2UsXG4gIENvbnRlbnQsXG4gIERlc2NyaXB0aW9uLFxuICBEaWFsb2csXG4gIERpYWxvZ0Nsb3NlLFxuICBEaWFsb2dDb250ZW50LFxuICBEaWFsb2dEZXNjcmlwdGlvbixcbiAgRGlhbG9nT3ZlcmxheSxcbiAgRGlhbG9nUG9ydGFsLFxuICBEaWFsb2dUaXRsZSxcbiAgRGlhbG9nVHJpZ2dlcixcbiAgT3ZlcmxheSxcbiAgUG9ydGFsLFxuICBSb290LFxuICBUaXRsZSxcbiAgVHJpZ2dlcixcbiAgV2FybmluZ1Byb3ZpZGVyLFxuICBjcmVhdGVEaWFsb2dTY29wZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy9zbG90LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBGcmFnbWVudCBhcyBGcmFnbWVudDIsIGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3Qob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3RDbG9uZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90Q2xvbmUob3duZXJOYW1lKTtcbiAgY29uc3QgU2xvdDIgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjaGlsZHJlbkFycmF5ID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbik7XG4gICAgY29uc3Qgc2xvdHRhYmxlID0gY2hpbGRyZW5BcnJheS5maW5kKGlzU2xvdHRhYmxlKTtcbiAgICBpZiAoc2xvdHRhYmxlKSB7XG4gICAgICBjb25zdCBuZXdFbGVtZW50ID0gc2xvdHRhYmxlLnByb3BzLmNoaWxkcmVuO1xuICAgICAgY29uc3QgbmV3Q2hpbGRyZW4gPSBjaGlsZHJlbkFycmF5Lm1hcCgoY2hpbGQpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkID09PSBzbG90dGFibGUpIHtcbiAgICAgICAgICBpZiAoUmVhY3QuQ2hpbGRyZW4uY291bnQobmV3RWxlbWVudCkgPiAxKSByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKTtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBuZXdFbGVtZW50LnByb3BzLmNoaWxkcmVuIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goU2xvdENsb25lLCB7IC4uLnNsb3RQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYsIGNoaWxkcmVuOiBSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXdFbGVtZW50KSA/IFJlYWN0LmNsb25lRWxlbWVudChuZXdFbGVtZW50LCB2b2lkIDAsIG5ld0NoaWxkcmVuKSA6IG51bGwgfSk7XG4gICAgfVxuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbiB9KTtcbiAgfSk7XG4gIFNsb3QyLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90YDtcbiAgcmV0dXJuIFNsb3QyO1xufVxudmFyIFNsb3QgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdChcIlNsb3RcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgICBjb25zdCBjaGlsZHJlblJlZiA9IGdldEVsZW1lbnRSZWYoY2hpbGRyZW4pO1xuICAgICAgY29uc3QgcHJvcHMyID0gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkcmVuLnByb3BzKTtcbiAgICAgIGlmIChjaGlsZHJlbi50eXBlICE9PSBSZWFjdC5GcmFnbWVudCkge1xuICAgICAgICBwcm9wczIucmVmID0gZm9yd2FyZGVkUmVmID8gY29tcG9zZVJlZnMoZm9yd2FyZGVkUmVmLCBjaGlsZHJlblJlZikgOiBjaGlsZHJlblJlZjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGRyZW4sIHByb3BzMik7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbikgPiAxID8gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKSA6IG51bGw7XG4gIH0pO1xuICBTbG90Q2xvbmUuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3RDbG9uZWA7XG4gIHJldHVybiBTbG90Q2xvbmU7XG59XG52YXIgU0xPVFRBQkxFX0lERU5USUZJRVIgPSBTeW1ib2woXCJyYWRpeC5zbG90dGFibGVcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdHRhYmxlKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90dGFibGUyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KEZyYWdtZW50MiwgeyBjaGlsZHJlbiB9KTtcbiAgfTtcbiAgU2xvdHRhYmxlMi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdHRhYmxlYDtcbiAgU2xvdHRhYmxlMi5fX3JhZGl4SWQgPSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbiAgcmV0dXJuIFNsb3R0YWJsZTI7XG59XG52YXIgU2xvdHRhYmxlID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3R0YWJsZShcIlNsb3R0YWJsZVwiKTtcbmZ1bmN0aW9uIGlzU2xvdHRhYmxlKGNoaWxkKSB7XG4gIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkgJiYgdHlwZW9mIGNoaWxkLnR5cGUgPT09IFwiZnVuY3Rpb25cIiAmJiBcIl9fcmFkaXhJZFwiIGluIGNoaWxkLnR5cGUgJiYgY2hpbGQudHlwZS5fX3JhZGl4SWQgPT09IFNMT1RUQUJMRV9JREVOVElGSUVSO1xufVxuZnVuY3Rpb24gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkUHJvcHMpIHtcbiAgY29uc3Qgb3ZlcnJpZGVQcm9wcyA9IHsgLi4uY2hpbGRQcm9wcyB9O1xuICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIGNoaWxkUHJvcHMpIHtcbiAgICBjb25zdCBzbG90UHJvcFZhbHVlID0gc2xvdFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBjaGlsZFByb3BWYWx1ZSA9IGNoaWxkUHJvcHNbcHJvcE5hbWVdO1xuICAgIGNvbnN0IGlzSGFuZGxlciA9IC9eb25bQS1aXS8udGVzdChwcm9wTmFtZSk7XG4gICAgaWYgKGlzSGFuZGxlcikge1xuICAgICAgaWYgKHNsb3RQcm9wVmFsdWUgJiYgY2hpbGRQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNoaWxkUHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHNsb3RQcm9wVmFsdWUoLi4uYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2xvdFByb3BWYWx1ZSkge1xuICAgICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHNsb3RQcm9wVmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHsgLi4uc2xvdFByb3BWYWx1ZSwgLi4uY2hpbGRQcm9wVmFsdWUgfTtcbiAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSBcImNsYXNzTmFtZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IFtzbG90UHJvcFZhbHVlLCBjaGlsZFByb3BWYWx1ZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyAuLi5zbG90UHJvcHMsIC4uLm92ZXJyaWRlUHJvcHMgfTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRSZWYoZWxlbWVudCkge1xuICBsZXQgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LnByb3BzLCBcInJlZlwiKT8uZ2V0O1xuICBsZXQgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5yZWY7XG4gIH1cbiAgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LCBcInJlZlwiKT8uZ2V0O1xuICBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnByb3BzLnJlZjtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWYgfHwgZWxlbWVudC5yZWY7XG59XG5leHBvcnQge1xuICBTbG90IGFzIFJvb3QsXG4gIFNsb3QsXG4gIFNsb3R0YWJsZSxcbiAgY3JlYXRlU2xvdCxcbiAgY3JlYXRlU2xvdHRhYmxlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9kaXNtaXNzYWJsZS1sYXllci50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZUV2ZW50SGFuZGxlcnMgfSBmcm9tIFwiQHJhZGl4LXVpL3ByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgUHJpbWl0aXZlLCBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnQgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmXCI7XG5pbXBvcnQgeyB1c2VFc2NhcGVLZXlkb3duIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtZXNjYXBlLWtleWRvd25cIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIERJU01JU1NBQkxFX0xBWUVSX05BTUUgPSBcIkRpc21pc3NhYmxlTGF5ZXJcIjtcbnZhciBDT05URVhUX1VQREFURSA9IFwiZGlzbWlzc2FibGVMYXllci51cGRhdGVcIjtcbnZhciBQT0lOVEVSX0RPV05fT1VUU0lERSA9IFwiZGlzbWlzc2FibGVMYXllci5wb2ludGVyRG93bk91dHNpZGVcIjtcbnZhciBGT0NVU19PVVRTSURFID0gXCJkaXNtaXNzYWJsZUxheWVyLmZvY3VzT3V0c2lkZVwiO1xudmFyIG9yaWdpbmFsQm9keVBvaW50ZXJFdmVudHM7XG52YXIgRGlzbWlzc2FibGVMYXllckNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KHtcbiAgbGF5ZXJzOiAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpLFxuICBsYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZDogLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKSxcbiAgYnJhbmNoZXM6IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KClcbn0pO1xudmFyIERpc21pc3NhYmxlTGF5ZXIgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50cyA9IGZhbHNlLFxuICAgICAgb25Fc2NhcGVLZXlEb3duLFxuICAgICAgb25Qb2ludGVyRG93bk91dHNpZGUsXG4gICAgICBvbkZvY3VzT3V0c2lkZSxcbiAgICAgIG9uSW50ZXJhY3RPdXRzaWRlLFxuICAgICAgb25EaXNtaXNzLFxuICAgICAgLi4ubGF5ZXJQcm9wc1xuICAgIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChEaXNtaXNzYWJsZUxheWVyQ29udGV4dCk7XG4gICAgY29uc3QgW25vZGUsIHNldE5vZGVdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3Qgb3duZXJEb2N1bWVudCA9IG5vZGU/Lm93bmVyRG9jdW1lbnQgPz8gZ2xvYmFsVGhpcz8uZG9jdW1lbnQ7XG4gICAgY29uc3QgWywgZm9yY2VdID0gUmVhY3QudXNlU3RhdGUoe30pO1xuICAgIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIChub2RlMikgPT4gc2V0Tm9kZShub2RlMikpO1xuICAgIGNvbnN0IGxheWVycyA9IEFycmF5LmZyb20oY29udGV4dC5sYXllcnMpO1xuICAgIGNvbnN0IFtoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZF0gPSBbLi4uY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZF0uc2xpY2UoLTEpO1xuICAgIGNvbnN0IGhpZ2hlc3RMYXllcldpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkSW5kZXggPSBsYXllcnMuaW5kZXhPZihoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZCk7XG4gICAgY29uc3QgaW5kZXggPSBub2RlID8gbGF5ZXJzLmluZGV4T2Yobm9kZSkgOiAtMTtcbiAgICBjb25zdCBpc0JvZHlQb2ludGVyRXZlbnRzRGlzYWJsZWQgPSBjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLnNpemUgPiAwO1xuICAgIGNvbnN0IGlzUG9pbnRlckV2ZW50c0VuYWJsZWQgPSBpbmRleCA+PSBoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZEluZGV4O1xuICAgIGNvbnN0IHBvaW50ZXJEb3duT3V0c2lkZSA9IHVzZVBvaW50ZXJEb3duT3V0c2lkZSgoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGNvbnN0IGlzUG9pbnRlckRvd25PbkJyYW5jaCA9IFsuLi5jb250ZXh0LmJyYW5jaGVzXS5zb21lKChicmFuY2gpID0+IGJyYW5jaC5jb250YWlucyh0YXJnZXQpKTtcbiAgICAgIGlmICghaXNQb2ludGVyRXZlbnRzRW5hYmxlZCB8fCBpc1BvaW50ZXJEb3duT25CcmFuY2gpIHJldHVybjtcbiAgICAgIG9uUG9pbnRlckRvd25PdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgb25JbnRlcmFjdE91dHNpZGU/LihldmVudCk7XG4gICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIG9uRGlzbWlzcz8uKCk7XG4gICAgfSwgb3duZXJEb2N1bWVudCk7XG4gICAgY29uc3QgZm9jdXNPdXRzaWRlID0gdXNlRm9jdXNPdXRzaWRlKChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgY29uc3QgaXNGb2N1c0luQnJhbmNoID0gWy4uLmNvbnRleHQuYnJhbmNoZXNdLnNvbWUoKGJyYW5jaCkgPT4gYnJhbmNoLmNvbnRhaW5zKHRhcmdldCkpO1xuICAgICAgaWYgKGlzRm9jdXNJbkJyYW5jaCkgcmV0dXJuO1xuICAgICAgb25Gb2N1c091dHNpZGU/LihldmVudCk7XG4gICAgICBvbkludGVyYWN0T3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgb25EaXNtaXNzPy4oKTtcbiAgICB9LCBvd25lckRvY3VtZW50KTtcbiAgICB1c2VFc2NhcGVLZXlkb3duKChldmVudCkgPT4ge1xuICAgICAgY29uc3QgaXNIaWdoZXN0TGF5ZXIgPSBpbmRleCA9PT0gY29udGV4dC5sYXllcnMuc2l6ZSAtIDE7XG4gICAgICBpZiAoIWlzSGlnaGVzdExheWVyKSByZXR1cm47XG4gICAgICBvbkVzY2FwZUtleURvd24/LihldmVudCk7XG4gICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgJiYgb25EaXNtaXNzKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG9uRGlzbWlzcygpO1xuICAgICAgfVxuICAgIH0sIG93bmVyRG9jdW1lbnQpO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICAgIGlmIChkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgaWYgKGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgIG9yaWdpbmFsQm9keVBvaW50ZXJFdmVudHMgPSBvd25lckRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cztcbiAgICAgICAgICBvd25lckRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuYWRkKG5vZGUpO1xuICAgICAgfVxuICAgICAgY29udGV4dC5sYXllcnMuYWRkKG5vZGUpO1xuICAgICAgZGlzcGF0Y2hVcGRhdGUoKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMgJiYgY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5zaXplID09PSAxKSB7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sIFtub2RlLCBvd25lckRvY3VtZW50LCBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMsIGNvbnRleHRdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKCFub2RlKSByZXR1cm47XG4gICAgICAgIGNvbnRleHQubGF5ZXJzLmRlbGV0ZShub2RlKTtcbiAgICAgICAgY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5kZWxldGUobm9kZSk7XG4gICAgICAgIGRpc3BhdGNoVXBkYXRlKCk7XG4gICAgICB9O1xuICAgIH0sIFtub2RlLCBjb250ZXh0XSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGhhbmRsZVVwZGF0ZSA9ICgpID0+IGZvcmNlKHt9KTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoQ09OVEVYVF9VUERBVEUsIGhhbmRsZVVwZGF0ZSk7XG4gICAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihDT05URVhUX1VQREFURSwgaGFuZGxlVXBkYXRlKTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBQcmltaXRpdmUuZGl2LFxuICAgICAge1xuICAgICAgICAuLi5sYXllclByb3BzLFxuICAgICAgICByZWY6IGNvbXBvc2VkUmVmcyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiBpc0JvZHlQb2ludGVyRXZlbnRzRGlzYWJsZWQgPyBpc1BvaW50ZXJFdmVudHNFbmFibGVkID8gXCJhdXRvXCIgOiBcIm5vbmVcIiA6IHZvaWQgMCxcbiAgICAgICAgICAuLi5wcm9wcy5zdHlsZVxuICAgICAgICB9LFxuICAgICAgICBvbkZvY3VzQ2FwdHVyZTogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25Gb2N1c0NhcHR1cmUsIGZvY3VzT3V0c2lkZS5vbkZvY3VzQ2FwdHVyZSksXG4gICAgICAgIG9uQmx1ckNhcHR1cmU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQmx1ckNhcHR1cmUsIGZvY3VzT3V0c2lkZS5vbkJsdXJDYXB0dXJlKSxcbiAgICAgICAgb25Qb2ludGVyRG93bkNhcHR1cmU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKFxuICAgICAgICAgIHByb3BzLm9uUG9pbnRlckRvd25DYXB0dXJlLFxuICAgICAgICAgIHBvaW50ZXJEb3duT3V0c2lkZS5vblBvaW50ZXJEb3duQ2FwdHVyZVxuICAgICAgICApXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbkRpc21pc3NhYmxlTGF5ZXIuZGlzcGxheU5hbWUgPSBESVNNSVNTQUJMRV9MQVlFUl9OQU1FO1xudmFyIEJSQU5DSF9OQU1FID0gXCJEaXNtaXNzYWJsZUxheWVyQnJhbmNoXCI7XG52YXIgRGlzbWlzc2FibGVMYXllckJyYW5jaCA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoRGlzbWlzc2FibGVMYXllckNvbnRleHQpO1xuICBjb25zdCByZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIHJlZik7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHJlZi5jdXJyZW50O1xuICAgIGlmIChub2RlKSB7XG4gICAgICBjb250ZXh0LmJyYW5jaGVzLmFkZChub2RlKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNvbnRleHQuYnJhbmNoZXMuZGVsZXRlKG5vZGUpO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFtjb250ZXh0LmJyYW5jaGVzXSk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5kaXYsIHsgLi4ucHJvcHMsIHJlZjogY29tcG9zZWRSZWZzIH0pO1xufSk7XG5EaXNtaXNzYWJsZUxheWVyQnJhbmNoLmRpc3BsYXlOYW1lID0gQlJBTkNIX05BTUU7XG5mdW5jdGlvbiB1c2VQb2ludGVyRG93bk91dHNpZGUob25Qb2ludGVyRG93bk91dHNpZGUsIG93bmVyRG9jdW1lbnQgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCkge1xuICBjb25zdCBoYW5kbGVQb2ludGVyRG93bk91dHNpZGUgPSB1c2VDYWxsYmFja1JlZihvblBvaW50ZXJEb3duT3V0c2lkZSk7XG4gIGNvbnN0IGlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZUNsaWNrUmVmID0gUmVhY3QudXNlUmVmKCgpID0+IHtcbiAgfSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgIWlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50KSB7XG4gICAgICAgIGxldCBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGhhbmRsZUFuZERpc3BhdGNoQ3VzdG9tRXZlbnQoXG4gICAgICAgICAgICBQT0lOVEVSX0RPV05fT1VUU0lERSxcbiAgICAgICAgICAgIGhhbmRsZVBvaW50ZXJEb3duT3V0c2lkZSxcbiAgICAgICAgICAgIGV2ZW50RGV0YWlsLFxuICAgICAgICAgICAgeyBkaXNjcmV0ZTogdHJ1ZSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQgPSBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MjtcbiAgICAgICAgY29uc3QgZXZlbnREZXRhaWwgPSB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH07XG4gICAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJ0b3VjaFwiKSB7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCk7XG4gICAgICAgICAgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCA9IGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQyO1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja1JlZi5jdXJyZW50KTtcbiAgICAgIH1cbiAgICAgIGlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgfTtcbiAgICBjb25zdCB0aW1lcklkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIH0sIDApO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCk7XG4gICAgfTtcbiAgfSwgW293bmVyRG9jdW1lbnQsIGhhbmRsZVBvaW50ZXJEb3duT3V0c2lkZV0pO1xuICByZXR1cm4ge1xuICAgIC8vIGVuc3VyZXMgd2UgY2hlY2sgUmVhY3QgY29tcG9uZW50IHRyZWUgKG5vdCBqdXN0IERPTSB0cmVlKVxuICAgIG9uUG9pbnRlckRvd25DYXB0dXJlOiAoKSA9PiBpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IHRydWVcbiAgfTtcbn1cbmZ1bmN0aW9uIHVzZUZvY3VzT3V0c2lkZShvbkZvY3VzT3V0c2lkZSwgb3duZXJEb2N1bWVudCA9IGdsb2JhbFRoaXM/LmRvY3VtZW50KSB7XG4gIGNvbnN0IGhhbmRsZUZvY3VzT3V0c2lkZSA9IHVzZUNhbGxiYWNrUmVmKG9uRm9jdXNPdXRzaWRlKTtcbiAgY29uc3QgaXNGb2N1c0luc2lkZVJlYWN0VHJlZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgIWlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCkge1xuICAgICAgICBjb25zdCBldmVudERldGFpbCA9IHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfTtcbiAgICAgICAgaGFuZGxlQW5kRGlzcGF0Y2hDdXN0b21FdmVudChGT0NVU19PVVRTSURFLCBoYW5kbGVGb2N1c091dHNpZGUsIGV2ZW50RGV0YWlsLCB7XG4gICAgICAgICAgZGlzY3JldGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBoYW5kbGVGb2N1cyk7XG4gICAgcmV0dXJuICgpID0+IG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXMpO1xuICB9LCBbb3duZXJEb2N1bWVudCwgaGFuZGxlRm9jdXNPdXRzaWRlXSk7XG4gIHJldHVybiB7XG4gICAgb25Gb2N1c0NhcHR1cmU6ICgpID0+IGlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IHRydWUsXG4gICAgb25CbHVyQ2FwdHVyZTogKCkgPT4gaXNGb2N1c0luc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50ID0gZmFsc2VcbiAgfTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoVXBkYXRlKCkge1xuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChDT05URVhUX1VQREFURSk7XG4gIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuZnVuY3Rpb24gaGFuZGxlQW5kRGlzcGF0Y2hDdXN0b21FdmVudChuYW1lLCBoYW5kbGVyLCBkZXRhaWwsIHsgZGlzY3JldGUgfSkge1xuICBjb25zdCB0YXJnZXQgPSBkZXRhaWwub3JpZ2luYWxFdmVudC50YXJnZXQ7XG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IHRydWUsIGRldGFpbCB9KTtcbiAgaWYgKGhhbmRsZXIpIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgaWYgKGRpc2NyZXRlKSB7XG4gICAgZGlzcGF0Y2hEaXNjcmV0ZUN1c3RvbUV2ZW50KHRhcmdldCwgZXZlbnQpO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxufVxudmFyIFJvb3QgPSBEaXNtaXNzYWJsZUxheWVyO1xudmFyIEJyYW5jaCA9IERpc21pc3NhYmxlTGF5ZXJCcmFuY2g7XG5leHBvcnQge1xuICBCcmFuY2gsXG4gIERpc21pc3NhYmxlTGF5ZXIsXG4gIERpc21pc3NhYmxlTGF5ZXJCcmFuY2gsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL2ZvY3VzLWd1YXJkcy50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIGNvdW50ID0gMDtcbmZ1bmN0aW9uIEZvY3VzR3VhcmRzKHByb3BzKSB7XG4gIHVzZUZvY3VzR3VhcmRzKCk7XG4gIHJldHVybiBwcm9wcy5jaGlsZHJlbjtcbn1cbmZ1bmN0aW9uIHVzZUZvY3VzR3VhcmRzKCkge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVkZ2VHdWFyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtcmFkaXgtZm9jdXMtZ3VhcmRdXCIpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBlZGdlR3VhcmRzWzBdID8/IGNyZWF0ZUZvY3VzR3VhcmQoKSk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWRnZUd1YXJkc1sxXSA/PyBjcmVhdGVGb2N1c0d1YXJkKCkpO1xuICAgIGNvdW50Kys7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtcmFkaXgtZm9jdXMtZ3VhcmRdXCIpLmZvckVhY2goKG5vZGUpID0+IG5vZGUucmVtb3ZlKCkpO1xuICAgICAgfVxuICAgICAgY291bnQtLTtcbiAgICB9O1xuICB9LCBbXSk7XG59XG5mdW5jdGlvbiBjcmVhdGVGb2N1c0d1YXJkKCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1yYWRpeC1mb2N1cy1ndWFyZFwiLCBcIlwiKTtcbiAgZWxlbWVudC50YWJJbmRleCA9IDA7XG4gIGVsZW1lbnQuc3R5bGUub3V0bGluZSA9IFwibm9uZVwiO1xuICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0IHtcbiAgRm9jdXNHdWFyZHMsXG4gIEZvY3VzR3VhcmRzIGFzIFJvb3QsXG4gIHVzZUZvY3VzR3VhcmRzXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9mb2N1cy1zY29wZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWNhbGxiYWNrLXJlZlwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgQVVUT0ZPQ1VTX09OX01PVU5UID0gXCJmb2N1c1Njb3BlLmF1dG9Gb2N1c09uTW91bnRcIjtcbnZhciBBVVRPRk9DVVNfT05fVU5NT1VOVCA9IFwiZm9jdXNTY29wZS5hdXRvRm9jdXNPblVubW91bnRcIjtcbnZhciBFVkVOVF9PUFRJT05TID0geyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogdHJ1ZSB9O1xudmFyIEZPQ1VTX1NDT1BFX05BTUUgPSBcIkZvY3VzU2NvcGVcIjtcbnZhciBGb2N1c1Njb3BlID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICBjb25zdCB7XG4gICAgbG9vcCA9IGZhbHNlLFxuICAgIHRyYXBwZWQgPSBmYWxzZSxcbiAgICBvbk1vdW50QXV0b0ZvY3VzOiBvbk1vdW50QXV0b0ZvY3VzUHJvcCxcbiAgICBvblVubW91bnRBdXRvRm9jdXM6IG9uVW5tb3VudEF1dG9Gb2N1c1Byb3AsXG4gICAgLi4uc2NvcGVQcm9wc1xuICB9ID0gcHJvcHM7XG4gIGNvbnN0IFtjb250YWluZXIsIHNldENvbnRhaW5lcl0gPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgY29uc3Qgb25Nb3VudEF1dG9Gb2N1cyA9IHVzZUNhbGxiYWNrUmVmKG9uTW91bnRBdXRvRm9jdXNQcm9wKTtcbiAgY29uc3Qgb25Vbm1vdW50QXV0b0ZvY3VzID0gdXNlQ2FsbGJhY2tSZWYob25Vbm1vdW50QXV0b0ZvY3VzUHJvcCk7XG4gIGNvbnN0IGxhc3RGb2N1c2VkRWxlbWVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgKG5vZGUpID0+IHNldENvbnRhaW5lcihub2RlKSk7XG4gIGNvbnN0IGZvY3VzU2NvcGUgPSBSZWFjdC51c2VSZWYoe1xuICAgIHBhdXNlZDogZmFsc2UsXG4gICAgcGF1c2UoKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgfSxcbiAgICByZXN1bWUoKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfSkuY3VycmVudDtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHJhcHBlZCkge1xuICAgICAgbGV0IGhhbmRsZUZvY3VzSW4yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGZvY3VzU2NvcGUucGF1c2VkIHx8ICFjb250YWluZXIpIHJldHVybjtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoY29udGFpbmVyLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICBsYXN0Rm9jdXNlZEVsZW1lbnRSZWYuY3VycmVudCA9IHRhcmdldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb2N1cyhsYXN0Rm9jdXNlZEVsZW1lbnRSZWYuY3VycmVudCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGhhbmRsZUZvY3VzT3V0MiA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChmb2N1c1Njb3BlLnBhdXNlZCB8fCAhY29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSBldmVudC5yZWxhdGVkVGFyZ2V0O1xuICAgICAgICBpZiAocmVsYXRlZFRhcmdldCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICBpZiAoIWNvbnRhaW5lci5jb250YWlucyhyZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICAgIGZvY3VzKGxhc3RGb2N1c2VkRWxlbWVudFJlZi5jdXJyZW50LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSwgaGFuZGxlTXV0YXRpb25zMiA9IGZ1bmN0aW9uKG11dGF0aW9ucykge1xuICAgICAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keSkgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICAgIGlmIChtdXRhdGlvbi5yZW1vdmVkTm9kZXMubGVuZ3RoID4gMCkgZm9jdXMoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHZhciBoYW5kbGVGb2N1c0luID0gaGFuZGxlRm9jdXNJbjIsIGhhbmRsZUZvY3VzT3V0ID0gaGFuZGxlRm9jdXNPdXQyLCBoYW5kbGVNdXRhdGlvbnMgPSBoYW5kbGVNdXRhdGlvbnMyO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXNJbjIpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIGhhbmRsZUZvY3VzT3V0Mik7XG4gICAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoaGFuZGxlTXV0YXRpb25zMik7XG4gICAgICBpZiAoY29udGFpbmVyKSBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoY29udGFpbmVyLCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzSW4yKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIGhhbmRsZUZvY3VzT3V0Mik7XG4gICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFt0cmFwcGVkLCBjb250YWluZXIsIGZvY3VzU2NvcGUucGF1c2VkXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgZm9jdXNTY29wZXNTdGFjay5hZGQoZm9jdXNTY29wZSk7XG4gICAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgY29uc3QgaGFzRm9jdXNlZENhbmRpZGF0ZSA9IGNvbnRhaW5lci5jb250YWlucyhwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpO1xuICAgICAgaWYgKCFoYXNGb2N1c2VkQ2FuZGlkYXRlKSB7XG4gICAgICAgIGNvbnN0IG1vdW50RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoQVVUT0ZPQ1VTX09OX01PVU5ULCBFVkVOVF9PUFRJT05TKTtcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX01PVU5ULCBvbk1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobW91bnRFdmVudCk7XG4gICAgICAgIGlmICghbW91bnRFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgZm9jdXNGaXJzdChyZW1vdmVMaW5rcyhnZXRUYWJiYWJsZUNhbmRpZGF0ZXMoY29udGFpbmVyKSksIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGZvY3VzKGNvbnRhaW5lcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fTU9VTlQsIG9uTW91bnRBdXRvRm9jdXMpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCB1bm1vdW50RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoQVVUT0ZPQ1VTX09OX1VOTU9VTlQsIEVWRU5UX09QVElPTlMpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKEFVVE9GT0NVU19PTl9VTk1PVU5ULCBvblVubW91bnRBdXRvRm9jdXMpO1xuICAgICAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KHVubW91bnRFdmVudCk7XG4gICAgICAgICAgaWYgKCF1bm1vdW50RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgZm9jdXMocHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID8/IGRvY3VtZW50LmJvZHksIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fVU5NT1VOVCwgb25Vbm1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgICBmb2N1c1Njb3Blc1N0YWNrLnJlbW92ZShmb2N1c1Njb3BlKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW2NvbnRhaW5lciwgb25Nb3VudEF1dG9Gb2N1cywgb25Vbm1vdW50QXV0b0ZvY3VzLCBmb2N1c1Njb3BlXSk7XG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghbG9vcCAmJiAhdHJhcHBlZCkgcmV0dXJuO1xuICAgICAgaWYgKGZvY3VzU2NvcGUucGF1c2VkKSByZXR1cm47XG4gICAgICBjb25zdCBpc1RhYktleSA9IGV2ZW50LmtleSA9PT0gXCJUYWJcIiAmJiAhZXZlbnQuYWx0S2V5ICYmICFldmVudC5jdHJsS2V5ICYmICFldmVudC5tZXRhS2V5O1xuICAgICAgY29uc3QgZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgaWYgKGlzVGFiS2V5ICYmIGZvY3VzZWRFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcjIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBjb25zdCBbZmlyc3QsIGxhc3RdID0gZ2V0VGFiYmFibGVFZGdlcyhjb250YWluZXIyKTtcbiAgICAgICAgY29uc3QgaGFzVGFiYmFibGVFbGVtZW50c0luc2lkZSA9IGZpcnN0ICYmIGxhc3Q7XG4gICAgICAgIGlmICghaGFzVGFiYmFibGVFbGVtZW50c0luc2lkZSkge1xuICAgICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCA9PT0gY29udGFpbmVyMikgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWV2ZW50LnNoaWZ0S2V5ICYmIGZvY3VzZWRFbGVtZW50ID09PSBsYXN0KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGxvb3ApIGZvY3VzKGZpcnN0LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGZvY3VzZWRFbGVtZW50ID09PSBmaXJzdCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChsb29wKSBmb2N1cyhsYXN0LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtsb29wLCB0cmFwcGVkLCBmb2N1c1Njb3BlLnBhdXNlZF1cbiAgKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmRpdiwgeyB0YWJJbmRleDogLTEsIC4uLnNjb3BlUHJvcHMsIHJlZjogY29tcG9zZWRSZWZzLCBvbktleURvd246IGhhbmRsZUtleURvd24gfSk7XG59KTtcbkZvY3VzU2NvcGUuZGlzcGxheU5hbWUgPSBGT0NVU19TQ09QRV9OQU1FO1xuZnVuY3Rpb24gZm9jdXNGaXJzdChjYW5kaWRhdGVzLCB7IHNlbGVjdCA9IGZhbHNlIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiBjYW5kaWRhdGVzKSB7XG4gICAgZm9jdXMoY2FuZGlkYXRlLCB7IHNlbGVjdCB9KTtcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gcHJldmlvdXNseUZvY3VzZWRFbGVtZW50KSByZXR1cm47XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFRhYmJhYmxlRWRnZXMoY29udGFpbmVyKSB7XG4gIGNvbnN0IGNhbmRpZGF0ZXMgPSBnZXRUYWJiYWJsZUNhbmRpZGF0ZXMoY29udGFpbmVyKTtcbiAgY29uc3QgZmlyc3QgPSBmaW5kVmlzaWJsZShjYW5kaWRhdGVzLCBjb250YWluZXIpO1xuICBjb25zdCBsYXN0ID0gZmluZFZpc2libGUoY2FuZGlkYXRlcy5yZXZlcnNlKCksIGNvbnRhaW5lcik7XG4gIHJldHVybiBbZmlyc3QsIGxhc3RdO1xufVxuZnVuY3Rpb24gZ2V0VGFiYmFibGVDYW5kaWRhdGVzKGNvbnRhaW5lcikge1xuICBjb25zdCBub2RlcyA9IFtdO1xuICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGNvbnRhaW5lciwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIHtcbiAgICBhY2NlcHROb2RlOiAobm9kZSkgPT4ge1xuICAgICAgY29uc3QgaXNIaWRkZW5JbnB1dCA9IG5vZGUudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmIG5vZGUudHlwZSA9PT0gXCJoaWRkZW5cIjtcbiAgICAgIGlmIChub2RlLmRpc2FibGVkIHx8IG5vZGUuaGlkZGVuIHx8IGlzSGlkZGVuSW5wdXQpIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9TS0lQO1xuICAgICAgcmV0dXJuIG5vZGUudGFiSW5kZXggPj0gMCA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX1NLSVA7XG4gICAgfVxuICB9KTtcbiAgd2hpbGUgKHdhbGtlci5uZXh0Tm9kZSgpKSBub2Rlcy5wdXNoKHdhbGtlci5jdXJyZW50Tm9kZSk7XG4gIHJldHVybiBub2Rlcztcbn1cbmZ1bmN0aW9uIGZpbmRWaXNpYmxlKGVsZW1lbnRzLCBjb250YWluZXIpIHtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgaWYgKCFpc0hpZGRlbihlbGVtZW50LCB7IHVwVG86IGNvbnRhaW5lciB9KSkgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzSGlkZGVuKG5vZGUsIHsgdXBUbyB9KSB7XG4gIGlmIChnZXRDb21wdXRlZFN0eWxlKG5vZGUpLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCIpIHJldHVybiB0cnVlO1xuICB3aGlsZSAobm9kZSkge1xuICAgIGlmICh1cFRvICE9PSB2b2lkIDAgJiYgbm9kZSA9PT0gdXBUbykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKG5vZGUpLmRpc3BsYXkgPT09IFwibm9uZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICBub2RlID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzU2VsZWN0YWJsZUlucHV0KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIFwic2VsZWN0XCIgaW4gZWxlbWVudDtcbn1cbmZ1bmN0aW9uIGZvY3VzKGVsZW1lbnQsIHsgc2VsZWN0ID0gZmFsc2UgfSA9IHt9KSB7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuZm9jdXMpIHtcbiAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIGVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgIGlmIChlbGVtZW50ICE9PSBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgJiYgaXNTZWxlY3RhYmxlSW5wdXQoZWxlbWVudCkgJiYgc2VsZWN0KVxuICAgICAgZWxlbWVudC5zZWxlY3QoKTtcbiAgfVxufVxudmFyIGZvY3VzU2NvcGVzU3RhY2sgPSBjcmVhdGVGb2N1c1Njb3Blc1N0YWNrKCk7XG5mdW5jdGlvbiBjcmVhdGVGb2N1c1Njb3Blc1N0YWNrKCkge1xuICBsZXQgc3RhY2sgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBhZGQoZm9jdXNTY29wZSkge1xuICAgICAgY29uc3QgYWN0aXZlRm9jdXNTY29wZSA9IHN0YWNrWzBdO1xuICAgICAgaWYgKGZvY3VzU2NvcGUgIT09IGFjdGl2ZUZvY3VzU2NvcGUpIHtcbiAgICAgICAgYWN0aXZlRm9jdXNTY29wZT8ucGF1c2UoKTtcbiAgICAgIH1cbiAgICAgIHN0YWNrID0gYXJyYXlSZW1vdmUoc3RhY2ssIGZvY3VzU2NvcGUpO1xuICAgICAgc3RhY2sudW5zaGlmdChmb2N1c1Njb3BlKTtcbiAgICB9LFxuICAgIHJlbW92ZShmb2N1c1Njb3BlKSB7XG4gICAgICBzdGFjayA9IGFycmF5UmVtb3ZlKHN0YWNrLCBmb2N1c1Njb3BlKTtcbiAgICAgIHN0YWNrWzBdPy5yZXN1bWUoKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBhcnJheVJlbW92ZShhcnJheSwgaXRlbSkge1xuICBjb25zdCB1cGRhdGVkQXJyYXkgPSBbLi4uYXJyYXldO1xuICBjb25zdCBpbmRleCA9IHVwZGF0ZWRBcnJheS5pbmRleE9mKGl0ZW0pO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgdXBkYXRlZEFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHVwZGF0ZWRBcnJheTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUxpbmtzKGl0ZW1zKSB7XG4gIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSAhPT0gXCJBXCIpO1xufVxudmFyIFJvb3QgPSBGb2N1c1Njb3BlO1xuZXhwb3J0IHtcbiAgRm9jdXNTY29wZSxcbiAgUm9vdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L2lkL3NyYy9pZC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xudmFyIHVzZVJlYWN0SWQgPSBSZWFjdFtcIiB1c2VJZCBcIi50cmltKCkudG9TdHJpbmcoKV0gfHwgKCgpID0+IHZvaWQgMCk7XG52YXIgY291bnQgPSAwO1xuZnVuY3Rpb24gdXNlSWQoZGV0ZXJtaW5pc3RpY0lkKSB7XG4gIGNvbnN0IFtpZCwgc2V0SWRdID0gUmVhY3QudXNlU3RhdGUodXNlUmVhY3RJZCgpKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWRldGVybWluaXN0aWNJZCkgc2V0SWQoKHJlYWN0SWQpID0+IHJlYWN0SWQgPz8gU3RyaW5nKGNvdW50KyspKTtcbiAgfSwgW2RldGVybWluaXN0aWNJZF0pO1xuICByZXR1cm4gZGV0ZXJtaW5pc3RpY0lkIHx8IChpZCA/IGByYWRpeC0ke2lkfWAgOiBcIlwiKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUlkXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9wb3J0YWwudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgUE9SVEFMX05BTUUgPSBcIlBvcnRhbFwiO1xudmFyIFBvcnRhbCA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgY29uc3QgeyBjb250YWluZXI6IGNvbnRhaW5lclByb3AsIC4uLnBvcnRhbFByb3BzIH0gPSBwcm9wcztcbiAgY29uc3QgW21vdW50ZWQsIHNldE1vdW50ZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4gc2V0TW91bnRlZCh0cnVlKSwgW10pO1xuICBjb25zdCBjb250YWluZXIgPSBjb250YWluZXJQcm9wIHx8IG1vdW50ZWQgJiYgZ2xvYmFsVGhpcz8uZG9jdW1lbnQ/LmJvZHk7XG4gIHJldHVybiBjb250YWluZXIgPyBSZWFjdERPTS5jcmVhdGVQb3J0YWwoLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuZGl2LCB7IC4uLnBvcnRhbFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSwgY29udGFpbmVyKSA6IG51bGw7XG59KTtcblBvcnRhbC5kaXNwbGF5TmFtZSA9IFBPUlRBTF9OQU1FO1xudmFyIFJvb3QgPSBQb3J0YWw7XG5leHBvcnQge1xuICBQb3J0YWwsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL3ByZXNlbmNlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QyIGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcblxuLy8gc3JjL3VzZS1zdGF0ZS1tYWNoaW5lLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiB1c2VTdGF0ZU1hY2hpbmUoaW5pdGlhbFN0YXRlLCBtYWNoaW5lKSB7XG4gIHJldHVybiBSZWFjdC51c2VSZWR1Y2VyKChzdGF0ZSwgZXZlbnQpID0+IHtcbiAgICBjb25zdCBuZXh0U3RhdGUgPSBtYWNoaW5lW3N0YXRlXVtldmVudF07XG4gICAgcmV0dXJuIG5leHRTdGF0ZSA/PyBzdGF0ZTtcbiAgfSwgaW5pdGlhbFN0YXRlKTtcbn1cblxuLy8gc3JjL3ByZXNlbmNlLnRzeFxudmFyIFByZXNlbmNlID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJlc2VudCwgY2hpbGRyZW4gfSA9IHByb3BzO1xuICBjb25zdCBwcmVzZW5jZSA9IHVzZVByZXNlbmNlKHByZXNlbnQpO1xuICBjb25zdCBjaGlsZCA9IHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiID8gY2hpbGRyZW4oeyBwcmVzZW50OiBwcmVzZW5jZS5pc1ByZXNlbnQgfSkgOiBSZWFjdDIuQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG4gIGNvbnN0IHJlZiA9IHVzZUNvbXBvc2VkUmVmcyhwcmVzZW5jZS5yZWYsIGdldEVsZW1lbnRSZWYoY2hpbGQpKTtcbiAgY29uc3QgZm9yY2VNb3VudCA9IHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiO1xuICByZXR1cm4gZm9yY2VNb3VudCB8fCBwcmVzZW5jZS5pc1ByZXNlbnQgPyBSZWFjdDIuY2xvbmVFbGVtZW50KGNoaWxkLCB7IHJlZiB9KSA6IG51bGw7XG59O1xuUHJlc2VuY2UuZGlzcGxheU5hbWUgPSBcIlByZXNlbmNlXCI7XG5mdW5jdGlvbiB1c2VQcmVzZW5jZShwcmVzZW50KSB7XG4gIGNvbnN0IFtub2RlLCBzZXROb2RlXSA9IFJlYWN0Mi51c2VTdGF0ZSgpO1xuICBjb25zdCBzdHlsZXNSZWYgPSBSZWFjdDIudXNlUmVmKG51bGwpO1xuICBjb25zdCBwcmV2UHJlc2VudFJlZiA9IFJlYWN0Mi51c2VSZWYocHJlc2VudCk7XG4gIGNvbnN0IHByZXZBbmltYXRpb25OYW1lUmVmID0gUmVhY3QyLnVzZVJlZihcIm5vbmVcIik7XG4gIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHByZXNlbnQgPyBcIm1vdW50ZWRcIiA6IFwidW5tb3VudGVkXCI7XG4gIGNvbnN0IFtzdGF0ZSwgc2VuZF0gPSB1c2VTdGF0ZU1hY2hpbmUoaW5pdGlhbFN0YXRlLCB7XG4gICAgbW91bnRlZDoge1xuICAgICAgVU5NT1VOVDogXCJ1bm1vdW50ZWRcIixcbiAgICAgIEFOSU1BVElPTl9PVVQ6IFwidW5tb3VudFN1c3BlbmRlZFwiXG4gICAgfSxcbiAgICB1bm1vdW50U3VzcGVuZGVkOiB7XG4gICAgICBNT1VOVDogXCJtb3VudGVkXCIsXG4gICAgICBBTklNQVRJT05fRU5EOiBcInVubW91bnRlZFwiXG4gICAgfSxcbiAgICB1bm1vdW50ZWQ6IHtcbiAgICAgIE1PVU5UOiBcIm1vdW50ZWRcIlxuICAgIH1cbiAgfSk7XG4gIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRBbmltYXRpb25OYW1lID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXNSZWYuY3VycmVudCk7XG4gICAgcHJldkFuaW1hdGlvbk5hbWVSZWYuY3VycmVudCA9IHN0YXRlID09PSBcIm1vdW50ZWRcIiA/IGN1cnJlbnRBbmltYXRpb25OYW1lIDogXCJub25lXCI7XG4gIH0sIFtzdGF0ZV0pO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHN0eWxlcyA9IHN0eWxlc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IHdhc1ByZXNlbnQgPSBwcmV2UHJlc2VudFJlZi5jdXJyZW50O1xuICAgIGNvbnN0IGhhc1ByZXNlbnRDaGFuZ2VkID0gd2FzUHJlc2VudCAhPT0gcHJlc2VudDtcbiAgICBpZiAoaGFzUHJlc2VudENoYW5nZWQpIHtcbiAgICAgIGNvbnN0IHByZXZBbmltYXRpb25OYW1lID0gcHJldkFuaW1hdGlvbk5hbWVSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IGN1cnJlbnRBbmltYXRpb25OYW1lID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXMpO1xuICAgICAgaWYgKHByZXNlbnQpIHtcbiAgICAgICAgc2VuZChcIk1PVU5UXCIpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50QW5pbWF0aW9uTmFtZSA9PT0gXCJub25lXCIgfHwgc3R5bGVzPy5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgICBzZW5kKFwiVU5NT1VOVFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGlzQW5pbWF0aW5nID0gcHJldkFuaW1hdGlvbk5hbWUgIT09IGN1cnJlbnRBbmltYXRpb25OYW1lO1xuICAgICAgICBpZiAod2FzUHJlc2VudCAmJiBpc0FuaW1hdGluZykge1xuICAgICAgICAgIHNlbmQoXCJBTklNQVRJT05fT1VUXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbmQoXCJVTk1PVU5UXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwcmV2UHJlc2VudFJlZi5jdXJyZW50ID0gcHJlc2VudDtcbiAgICB9XG4gIH0sIFtwcmVzZW50LCBzZW5kXSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIGxldCB0aW1lb3V0SWQ7XG4gICAgICBjb25zdCBvd25lcldpbmRvdyA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyA/PyB3aW5kb3c7XG4gICAgICBjb25zdCBoYW5kbGVBbmltYXRpb25FbmQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEFuaW1hdGlvbk5hbWUgPSBnZXRBbmltYXRpb25OYW1lKHN0eWxlc1JlZi5jdXJyZW50KTtcbiAgICAgICAgY29uc3QgaXNDdXJyZW50QW5pbWF0aW9uID0gY3VycmVudEFuaW1hdGlvbk5hbWUuaW5jbHVkZXMoQ1NTLmVzY2FwZShldmVudC5hbmltYXRpb25OYW1lKSk7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IG5vZGUgJiYgaXNDdXJyZW50QW5pbWF0aW9uKSB7XG4gICAgICAgICAgc2VuZChcIkFOSU1BVElPTl9FTkRcIik7XG4gICAgICAgICAgaWYgKCFwcmV2UHJlc2VudFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RmlsbE1vZGUgPSBub2RlLnN0eWxlLmFuaW1hdGlvbkZpbGxNb2RlO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZSA9IFwiZm9yd2FyZHNcIjtcbiAgICAgICAgICAgIHRpbWVvdXRJZCA9IG93bmVyV2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAobm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZSA9PT0gXCJmb3J3YXJkc1wiKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZSA9IGN1cnJlbnRGaWxsTW9kZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgaGFuZGxlQW5pbWF0aW9uU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbm9kZSkge1xuICAgICAgICAgIHByZXZBbmltYXRpb25OYW1lUmVmLmN1cnJlbnQgPSBnZXRBbmltYXRpb25OYW1lKHN0eWxlc1JlZi5jdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbnN0YXJ0XCIsIGhhbmRsZUFuaW1hdGlvblN0YXJ0KTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmNhbmNlbFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBvd25lcldpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uc3RhcnRcIiwgaGFuZGxlQW5pbWF0aW9uU3RhcnQpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25jYW5jZWxcIiwgaGFuZGxlQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzZW5kKFwiQU5JTUFUSU9OX0VORFwiKTtcbiAgICB9XG4gIH0sIFtub2RlLCBzZW5kXSk7XG4gIHJldHVybiB7XG4gICAgaXNQcmVzZW50OiBbXCJtb3VudGVkXCIsIFwidW5tb3VudFN1c3BlbmRlZFwiXS5pbmNsdWRlcyhzdGF0ZSksXG4gICAgcmVmOiBSZWFjdDIudXNlQ2FsbGJhY2soKG5vZGUyKSA9PiB7XG4gICAgICBzdHlsZXNSZWYuY3VycmVudCA9IG5vZGUyID8gZ2V0Q29tcHV0ZWRTdHlsZShub2RlMikgOiBudWxsO1xuICAgICAgc2V0Tm9kZShub2RlMik7XG4gICAgfSwgW10pXG4gIH07XG59XG5mdW5jdGlvbiBnZXRBbmltYXRpb25OYW1lKHN0eWxlcykge1xuICByZXR1cm4gc3R5bGVzPy5hbmltYXRpb25OYW1lIHx8IFwibm9uZVwiO1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudFJlZihlbGVtZW50KSB7XG4gIGxldCBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQucHJvcHMsIFwicmVmXCIpPy5nZXQ7XG4gIGxldCBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnJlZjtcbiAgfVxuICBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQsIFwicmVmXCIpPy5nZXQ7XG4gIG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmO1xuICB9XG4gIHJldHVybiBlbGVtZW50LnByb3BzLnJlZiB8fCBlbGVtZW50LnJlZjtcbn1cbnZhciBSb290ID0gUHJlc2VuY2U7XG5leHBvcnQge1xuICBQcmVzZW5jZSxcbiAgUm9vdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy9wcmltaXRpdmUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IGNyZWF0ZVNsb3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXNsb3RcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIE5PREVTID0gW1xuICBcImFcIixcbiAgXCJidXR0b25cIixcbiAgXCJkaXZcIixcbiAgXCJmb3JtXCIsXG4gIFwiaDJcIixcbiAgXCJoM1wiLFxuICBcImltZ1wiLFxuICBcImlucHV0XCIsXG4gIFwibGFiZWxcIixcbiAgXCJsaVwiLFxuICBcIm5hdlwiLFxuICBcIm9sXCIsXG4gIFwicFwiLFxuICBcInNlbGVjdFwiLFxuICBcInNwYW5cIixcbiAgXCJzdmdcIixcbiAgXCJ1bFwiXG5dO1xudmFyIFByaW1pdGl2ZSA9IE5PREVTLnJlZHVjZSgocHJpbWl0aXZlLCBub2RlKSA9PiB7XG4gIGNvbnN0IFNsb3QgPSBjcmVhdGVTbG90KGBQcmltaXRpdmUuJHtub2RlfWApO1xuICBjb25zdCBOb2RlID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgYXNDaGlsZCwgLi4ucHJpbWl0aXZlUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IENvbXAgPSBhc0NoaWxkID8gU2xvdCA6IG5vZGU7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvd1tTeW1ib2wuZm9yKFwicmFkaXgtdWlcIildID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goQ29tcCwgeyAuLi5wcmltaXRpdmVQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSk7XG4gIH0pO1xuICBOb2RlLmRpc3BsYXlOYW1lID0gYFByaW1pdGl2ZS4ke25vZGV9YDtcbiAgcmV0dXJuIHsgLi4ucHJpbWl0aXZlLCBbbm9kZV06IE5vZGUgfTtcbn0sIHt9KTtcbmZ1bmN0aW9uIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudCh0YXJnZXQsIGV2ZW50KSB7XG4gIGlmICh0YXJnZXQpIFJlYWN0RE9NLmZsdXNoU3luYygoKSA9PiB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCkpO1xufVxudmFyIFJvb3QgPSBQcmltaXRpdmU7XG5leHBvcnQge1xuICBQcmltaXRpdmUsXG4gIFJvb3QsXG4gIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy9zbG90LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBGcmFnbWVudCBhcyBGcmFnbWVudDIsIGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3Qob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3RDbG9uZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90Q2xvbmUob3duZXJOYW1lKTtcbiAgY29uc3QgU2xvdDIgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjaGlsZHJlbkFycmF5ID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbik7XG4gICAgY29uc3Qgc2xvdHRhYmxlID0gY2hpbGRyZW5BcnJheS5maW5kKGlzU2xvdHRhYmxlKTtcbiAgICBpZiAoc2xvdHRhYmxlKSB7XG4gICAgICBjb25zdCBuZXdFbGVtZW50ID0gc2xvdHRhYmxlLnByb3BzLmNoaWxkcmVuO1xuICAgICAgY29uc3QgbmV3Q2hpbGRyZW4gPSBjaGlsZHJlbkFycmF5Lm1hcCgoY2hpbGQpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkID09PSBzbG90dGFibGUpIHtcbiAgICAgICAgICBpZiAoUmVhY3QuQ2hpbGRyZW4uY291bnQobmV3RWxlbWVudCkgPiAxKSByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKTtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBuZXdFbGVtZW50LnByb3BzLmNoaWxkcmVuIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goU2xvdENsb25lLCB7IC4uLnNsb3RQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYsIGNoaWxkcmVuOiBSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXdFbGVtZW50KSA/IFJlYWN0LmNsb25lRWxlbWVudChuZXdFbGVtZW50LCB2b2lkIDAsIG5ld0NoaWxkcmVuKSA6IG51bGwgfSk7XG4gICAgfVxuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbiB9KTtcbiAgfSk7XG4gIFNsb3QyLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90YDtcbiAgcmV0dXJuIFNsb3QyO1xufVxudmFyIFNsb3QgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdChcIlNsb3RcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgICBjb25zdCBjaGlsZHJlblJlZiA9IGdldEVsZW1lbnRSZWYoY2hpbGRyZW4pO1xuICAgICAgY29uc3QgcHJvcHMyID0gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkcmVuLnByb3BzKTtcbiAgICAgIGlmIChjaGlsZHJlbi50eXBlICE9PSBSZWFjdC5GcmFnbWVudCkge1xuICAgICAgICBwcm9wczIucmVmID0gZm9yd2FyZGVkUmVmID8gY29tcG9zZVJlZnMoZm9yd2FyZGVkUmVmLCBjaGlsZHJlblJlZikgOiBjaGlsZHJlblJlZjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGRyZW4sIHByb3BzMik7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbikgPiAxID8gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKSA6IG51bGw7XG4gIH0pO1xuICBTbG90Q2xvbmUuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3RDbG9uZWA7XG4gIHJldHVybiBTbG90Q2xvbmU7XG59XG52YXIgU0xPVFRBQkxFX0lERU5USUZJRVIgPSBTeW1ib2woXCJyYWRpeC5zbG90dGFibGVcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdHRhYmxlKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90dGFibGUyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KEZyYWdtZW50MiwgeyBjaGlsZHJlbiB9KTtcbiAgfTtcbiAgU2xvdHRhYmxlMi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdHRhYmxlYDtcbiAgU2xvdHRhYmxlMi5fX3JhZGl4SWQgPSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbiAgcmV0dXJuIFNsb3R0YWJsZTI7XG59XG52YXIgU2xvdHRhYmxlID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3R0YWJsZShcIlNsb3R0YWJsZVwiKTtcbmZ1bmN0aW9uIGlzU2xvdHRhYmxlKGNoaWxkKSB7XG4gIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkgJiYgdHlwZW9mIGNoaWxkLnR5cGUgPT09IFwiZnVuY3Rpb25cIiAmJiBcIl9fcmFkaXhJZFwiIGluIGNoaWxkLnR5cGUgJiYgY2hpbGQudHlwZS5fX3JhZGl4SWQgPT09IFNMT1RUQUJMRV9JREVOVElGSUVSO1xufVxuZnVuY3Rpb24gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkUHJvcHMpIHtcbiAgY29uc3Qgb3ZlcnJpZGVQcm9wcyA9IHsgLi4uY2hpbGRQcm9wcyB9O1xuICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIGNoaWxkUHJvcHMpIHtcbiAgICBjb25zdCBzbG90UHJvcFZhbHVlID0gc2xvdFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBjaGlsZFByb3BWYWx1ZSA9IGNoaWxkUHJvcHNbcHJvcE5hbWVdO1xuICAgIGNvbnN0IGlzSGFuZGxlciA9IC9eb25bQS1aXS8udGVzdChwcm9wTmFtZSk7XG4gICAgaWYgKGlzSGFuZGxlcikge1xuICAgICAgaWYgKHNsb3RQcm9wVmFsdWUgJiYgY2hpbGRQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNoaWxkUHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHNsb3RQcm9wVmFsdWUoLi4uYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2xvdFByb3BWYWx1ZSkge1xuICAgICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHNsb3RQcm9wVmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHsgLi4uc2xvdFByb3BWYWx1ZSwgLi4uY2hpbGRQcm9wVmFsdWUgfTtcbiAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSBcImNsYXNzTmFtZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IFtzbG90UHJvcFZhbHVlLCBjaGlsZFByb3BWYWx1ZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyAuLi5zbG90UHJvcHMsIC4uLm92ZXJyaWRlUHJvcHMgfTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRSZWYoZWxlbWVudCkge1xuICBsZXQgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LnByb3BzLCBcInJlZlwiKT8uZ2V0O1xuICBsZXQgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5yZWY7XG4gIH1cbiAgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LCBcInJlZlwiKT8uZ2V0O1xuICBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnByb3BzLnJlZjtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWYgfHwgZWxlbWVudC5yZWY7XG59XG5leHBvcnQge1xuICBTbG90IGFzIFJvb3QsXG4gIFNsb3QsXG4gIFNsb3R0YWJsZSxcbiAgY3JlYXRlU2xvdCxcbiAgY3JlYXRlU2xvdHRhYmxlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvdXNlLWNhbGxiYWNrLXJlZi9zcmMvdXNlLWNhbGxiYWNrLXJlZi50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gdXNlQ2FsbGJhY2tSZWYoY2FsbGJhY2spIHtcbiAgY29uc3QgY2FsbGJhY2tSZWYgPSBSZWFjdC51c2VSZWYoY2FsbGJhY2spO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNhbGxiYWNrUmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgfSk7XG4gIHJldHVybiBSZWFjdC51c2VNZW1vKCgpID0+ICguLi5hcmdzKSA9PiBjYWxsYmFja1JlZi5jdXJyZW50Py4oLi4uYXJncyksIFtdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUNhbGxiYWNrUmVmXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3VzZS1jb250cm9sbGFibGUtc3RhdGUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbnZhciB1c2VJbnNlcnRpb25FZmZlY3QgPSBSZWFjdFtcIiB1c2VJbnNlcnRpb25FZmZlY3QgXCIudHJpbSgpLnRvU3RyaW5nKCldIHx8IHVzZUxheW91dEVmZmVjdDtcbmZ1bmN0aW9uIHVzZUNvbnRyb2xsYWJsZVN0YXRlKHtcbiAgcHJvcCxcbiAgZGVmYXVsdFByb3AsXG4gIG9uQ2hhbmdlID0gKCkgPT4ge1xuICB9LFxuICBjYWxsZXJcbn0pIHtcbiAgY29uc3QgW3VuY29udHJvbGxlZFByb3AsIHNldFVuY29udHJvbGxlZFByb3AsIG9uQ2hhbmdlUmVmXSA9IHVzZVVuY29udHJvbGxlZFN0YXRlKHtcbiAgICBkZWZhdWx0UHJvcCxcbiAgICBvbkNoYW5nZVxuICB9KTtcbiAgY29uc3QgaXNDb250cm9sbGVkID0gcHJvcCAhPT0gdm9pZCAwO1xuICBjb25zdCB2YWx1ZSA9IGlzQ29udHJvbGxlZCA/IHByb3AgOiB1bmNvbnRyb2xsZWRQcm9wO1xuICBpZiAodHJ1ZSkge1xuICAgIGNvbnN0IGlzQ29udHJvbGxlZFJlZiA9IFJlYWN0LnVzZVJlZihwcm9wICE9PSB2b2lkIDApO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCB3YXNDb250cm9sbGVkID0gaXNDb250cm9sbGVkUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAod2FzQ29udHJvbGxlZCAhPT0gaXNDb250cm9sbGVkKSB7XG4gICAgICAgIGNvbnN0IGZyb20gPSB3YXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zdCB0byA9IGlzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGAke2NhbGxlcn0gaXMgY2hhbmdpbmcgZnJvbSAke2Zyb219IHRvICR7dG99LiBDb21wb25lbnRzIHNob3VsZCBub3Qgc3dpdGNoIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHZhbHVlIGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIGNvbXBvbmVudC5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpc0NvbnRyb2xsZWRSZWYuY3VycmVudCA9IGlzQ29udHJvbGxlZDtcbiAgICB9LCBbaXNDb250cm9sbGVkLCBjYWxsZXJdKTtcbiAgfVxuICBjb25zdCBzZXRWYWx1ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChuZXh0VmFsdWUpID0+IHtcbiAgICAgIGlmIChpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgY29uc3QgdmFsdWUyID0gaXNGdW5jdGlvbihuZXh0VmFsdWUpID8gbmV4dFZhbHVlKHByb3ApIDogbmV4dFZhbHVlO1xuICAgICAgICBpZiAodmFsdWUyICE9PSBwcm9wKSB7XG4gICAgICAgICAgb25DaGFuZ2VSZWYuY3VycmVudD8uKHZhbHVlMik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFVuY29udHJvbGxlZFByb3AobmV4dFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtpc0NvbnRyb2xsZWQsIHByb3AsIHNldFVuY29udHJvbGxlZFByb3AsIG9uQ2hhbmdlUmVmXVxuICApO1xuICByZXR1cm4gW3ZhbHVlLCBzZXRWYWx1ZV07XG59XG5mdW5jdGlvbiB1c2VVbmNvbnRyb2xsZWRTdGF0ZSh7XG4gIGRlZmF1bHRQcm9wLFxuICBvbkNoYW5nZVxufSkge1xuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlKGRlZmF1bHRQcm9wKTtcbiAgY29uc3QgcHJldlZhbHVlUmVmID0gUmVhY3QudXNlUmVmKHZhbHVlKTtcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSBSZWFjdC51c2VSZWYob25DaGFuZ2UpO1xuICB1c2VJbnNlcnRpb25FZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQgPSBvbkNoYW5nZTtcbiAgfSwgW29uQ2hhbmdlXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByZXZWYWx1ZVJlZi5jdXJyZW50ICE9PSB2YWx1ZSkge1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudD8uKHZhbHVlKTtcbiAgICAgIHByZXZWYWx1ZVJlZi5jdXJyZW50ID0gdmFsdWU7XG4gICAgfVxuICB9LCBbdmFsdWUsIHByZXZWYWx1ZVJlZl0pO1xuICByZXR1cm4gW3ZhbHVlLCBzZXRWYWx1ZSwgb25DaGFuZ2VSZWZdO1xufVxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbi8vIHNyYy91c2UtY29udHJvbGxhYmxlLXN0YXRlLXJlZHVjZXIudHN4XG5pbXBvcnQgKiBhcyBSZWFjdDIgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VFZmZlY3RFdmVudCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWVmZmVjdC1ldmVudFwiO1xudmFyIFNZTkNfU1RBVEUgPSBTeW1ib2woXCJSQURJWDpTWU5DX1NUQVRFXCIpO1xuZnVuY3Rpb24gdXNlQ29udHJvbGxhYmxlU3RhdGVSZWR1Y2VyKHJlZHVjZXIsIHVzZXJBcmdzLCBpbml0aWFsQXJnLCBpbml0KSB7XG4gIGNvbnN0IHsgcHJvcDogY29udHJvbGxlZFN0YXRlLCBkZWZhdWx0UHJvcCwgb25DaGFuZ2U6IG9uQ2hhbmdlUHJvcCwgY2FsbGVyIH0gPSB1c2VyQXJncztcbiAgY29uc3QgaXNDb250cm9sbGVkID0gY29udHJvbGxlZFN0YXRlICE9PSB2b2lkIDA7XG4gIGNvbnN0IG9uQ2hhbmdlID0gdXNlRWZmZWN0RXZlbnQob25DaGFuZ2VQcm9wKTtcbiAgaWYgKHRydWUpIHtcbiAgICBjb25zdCBpc0NvbnRyb2xsZWRSZWYgPSBSZWFjdDIudXNlUmVmKGNvbnRyb2xsZWRTdGF0ZSAhPT0gdm9pZCAwKTtcbiAgICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IHdhc0NvbnRyb2xsZWQgPSBpc0NvbnRyb2xsZWRSZWYuY3VycmVudDtcbiAgICAgIGlmICh3YXNDb250cm9sbGVkICE9PSBpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgY29uc3QgZnJvbSA9IHdhc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCI7XG4gICAgICAgIGNvbnN0IHRvID0gaXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYCR7Y2FsbGVyfSBpcyBjaGFuZ2luZyBmcm9tICR7ZnJvbX0gdG8gJHt0b30uIENvbXBvbmVudHMgc2hvdWxkIG5vdCBzd2l0Y2ggZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgdmFsdWUgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgY29tcG9uZW50LmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlzQ29udHJvbGxlZFJlZi5jdXJyZW50ID0gaXNDb250cm9sbGVkO1xuICAgIH0sIFtpc0NvbnRyb2xsZWQsIGNhbGxlcl0pO1xuICB9XG4gIGNvbnN0IGFyZ3MgPSBbeyAuLi5pbml0aWFsQXJnLCBzdGF0ZTogZGVmYXVsdFByb3AgfV07XG4gIGlmIChpbml0KSB7XG4gICAgYXJncy5wdXNoKGluaXQpO1xuICB9XG4gIGNvbnN0IFtpbnRlcm5hbFN0YXRlLCBkaXNwYXRjaF0gPSBSZWFjdDIudXNlUmVkdWNlcihcbiAgICAoc3RhdGUyLCBhY3Rpb24pID0+IHtcbiAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gU1lOQ19TVEFURSkge1xuICAgICAgICByZXR1cm4geyAuLi5zdGF0ZTIsIHN0YXRlOiBhY3Rpb24uc3RhdGUgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5leHQgPSByZWR1Y2VyKHN0YXRlMiwgYWN0aW9uKTtcbiAgICAgIGlmIChpc0NvbnRyb2xsZWQgJiYgIU9iamVjdC5pcyhuZXh0LnN0YXRlLCBzdGF0ZTIuc3RhdGUpKSB7XG4gICAgICAgIG9uQ2hhbmdlKG5leHQuc3RhdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSxcbiAgICAuLi5hcmdzXG4gICk7XG4gIGNvbnN0IHVuY29udHJvbGxlZFN0YXRlID0gaW50ZXJuYWxTdGF0ZS5zdGF0ZTtcbiAgY29uc3QgcHJldlZhbHVlUmVmID0gUmVhY3QyLnVzZVJlZih1bmNvbnRyb2xsZWRTdGF0ZSk7XG4gIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwcmV2VmFsdWVSZWYuY3VycmVudCAhPT0gdW5jb250cm9sbGVkU3RhdGUpIHtcbiAgICAgIHByZXZWYWx1ZVJlZi5jdXJyZW50ID0gdW5jb250cm9sbGVkU3RhdGU7XG4gICAgICBpZiAoIWlzQ29udHJvbGxlZCkge1xuICAgICAgICBvbkNoYW5nZSh1bmNvbnRyb2xsZWRTdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbb25DaGFuZ2UsIHVuY29udHJvbGxlZFN0YXRlLCBwcmV2VmFsdWVSZWYsIGlzQ29udHJvbGxlZF0pO1xuICBjb25zdCBzdGF0ZSA9IFJlYWN0Mi51c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBpc0NvbnRyb2xsZWQyID0gY29udHJvbGxlZFN0YXRlICE9PSB2b2lkIDA7XG4gICAgaWYgKGlzQ29udHJvbGxlZDIpIHtcbiAgICAgIHJldHVybiB7IC4uLmludGVybmFsU3RhdGUsIHN0YXRlOiBjb250cm9sbGVkU3RhdGUgfTtcbiAgICB9XG4gICAgcmV0dXJuIGludGVybmFsU3RhdGU7XG4gIH0sIFtpbnRlcm5hbFN0YXRlLCBjb250cm9sbGVkU3RhdGVdKTtcbiAgUmVhY3QyLnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzQ29udHJvbGxlZCAmJiAhT2JqZWN0LmlzKGNvbnRyb2xsZWRTdGF0ZSwgaW50ZXJuYWxTdGF0ZS5zdGF0ZSkpIHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogU1lOQ19TVEFURSwgc3RhdGU6IGNvbnRyb2xsZWRTdGF0ZSB9KTtcbiAgICB9XG4gIH0sIFtjb250cm9sbGVkU3RhdGUsIGludGVybmFsU3RhdGUuc3RhdGUsIGlzQ29udHJvbGxlZF0pO1xuICByZXR1cm4gW3N0YXRlLCBkaXNwYXRjaF07XG59XG5leHBvcnQge1xuICB1c2VDb250cm9sbGFibGVTdGF0ZSxcbiAgdXNlQ29udHJvbGxhYmxlU3RhdGVSZWR1Y2VyXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3VzZS1lZmZlY3QtZXZlbnQudHN4XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbnZhciB1c2VSZWFjdEVmZmVjdEV2ZW50ID0gUmVhY3RbXCIgdXNlRWZmZWN0RXZlbnQgXCIudHJpbSgpLnRvU3RyaW5nKCldO1xudmFyIHVzZVJlYWN0SW5zZXJ0aW9uRWZmZWN0ID0gUmVhY3RbXCIgdXNlSW5zZXJ0aW9uRWZmZWN0IFwiLnRyaW0oKS50b1N0cmluZygpXTtcbmZ1bmN0aW9uIHVzZUVmZmVjdEV2ZW50KGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgdXNlUmVhY3RFZmZlY3RFdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHVzZVJlYWN0RWZmZWN0RXZlbnQoY2FsbGJhY2spO1xuICB9XG4gIGNvbnN0IHJlZiA9IFJlYWN0LnVzZVJlZigoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNhbGwgYW4gZXZlbnQgaGFuZGxlciB3aGlsZSByZW5kZXJpbmcuXCIpO1xuICB9KTtcbiAgaWYgKHR5cGVvZiB1c2VSZWFjdEluc2VydGlvbkVmZmVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdXNlUmVhY3RJbnNlcnRpb25FZmZlY3QoKCkgPT4ge1xuICAgICAgcmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgICAgcmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiAoLi4uYXJncykgPT4gcmVmLmN1cnJlbnQ/LiguLi5hcmdzKSwgW10pO1xufVxuZXhwb3J0IHtcbiAgdXNlRWZmZWN0RXZlbnRcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC91c2UtZXNjYXBlLWtleWRvd24vc3JjL3VzZS1lc2NhcGUta2V5ZG93bi50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWZcIjtcbmZ1bmN0aW9uIHVzZUVzY2FwZUtleWRvd24ob25Fc2NhcGVLZXlEb3duUHJvcCwgb3duZXJEb2N1bWVudCA9IGdsb2JhbFRoaXM/LmRvY3VtZW50KSB7XG4gIGNvbnN0IG9uRXNjYXBlS2V5RG93biA9IHVzZUNhbGxiYWNrUmVmKG9uRXNjYXBlS2V5RG93blByb3ApO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgb25Fc2NhcGVLZXlEb3duKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RG93biwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgIHJldHVybiAoKSA9PiBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgfSwgW29uRXNjYXBlS2V5RG93biwgb3duZXJEb2N1bWVudF0pO1xufVxuZXhwb3J0IHtcbiAgdXNlRXNjYXBlS2V5ZG93blxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L3VzZS1sYXlvdXQtZWZmZWN0L3NyYy91c2UtbGF5b3V0LWVmZmVjdC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIHVzZUxheW91dEVmZmVjdDIgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCA/IFJlYWN0LnVzZUxheW91dEVmZmVjdCA6ICgpID0+IHtcbn07XG5leHBvcnQge1xuICB1c2VMYXlvdXRFZmZlY3QyIGFzIHVzZUxheW91dEVmZmVjdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cblxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XG4gIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XG4gIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG5cbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcbiAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0O1xuICB9XG4gIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcbiAgdmFyIHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICB0W3BdID0gc1twXTtcbiAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcbiAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XG4gIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XG4gIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xuICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcbiAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xuICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcbiAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xuICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XG4gICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xuICAgICAgfVxuICB9XG4gIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcbiAgZG9uZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xuICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcbiAgfVxuICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xuICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIG9bazJdID0gbVtrXTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcbiAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xuICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgfVxuICB9O1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xuICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gIGlmICghbSkgcmV0dXJuIG87XG4gIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICB0cnkge1xuICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gIGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgIH1cbiAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICB9XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XG4gIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xuICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgcltrXSA9IGFbal07XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgfVxuICB9XG4gIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XG4gIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcbiAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcbiAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIGFyID0gW107XG4gICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcbiAgICByZXR1cm4gYXI7XG4gIH07XG4gIHJldHVybiBvd25LZXlzKG8pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xuICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xuICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XG4gIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xuICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcbiAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XG4gICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICB2YXIgciwgcyA9IDA7XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xuICAgICAgICBpZiAoci5kaXNwb3NlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xuICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBzIHw9IDE7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcbiAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XG4gICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcbiAgICAgIH0pO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19lc0RlY29yYXRlLFxuICBfX3J1bkluaXRpYWxpemVycyxcbiAgX19wcm9wS2V5LFxuICBfX3NldEZ1bmN0aW9uTmFtZSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG4gIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxufTtcbiJdLCJuYW1lcyI6WyJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiRGlhbG9nIiwiRGlhbG9nQ29udGVudCIsIkRpYWxvZ0hlYWRlciIsIkRpYWxvZ1RpdGxlIiwiRGlhbG9nRm9vdGVyIiwiQnV0dG9uIiwiQWxlcnRUcmlhbmdsZSIsIkRlbGV0ZVNtYWxsR3JvdXBEaWFsb2ciLCJfcmVmIiwiaXNPcGVuIiwib25DbG9zZSIsIm9uQ29uZmlybSIsInNtYWxsR3JvdXAiLCJfcmVmJGlzRGVsZXRpbmciLCJpc0RlbGV0aW5nIiwib3BlbiIsIm9uT3BlbkNoYW5nZSIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwibmFtZSIsInR5cGUiLCJ2YXJpYW50Iiwib25DbGljayIsImRpc2FibGVkIiwiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJvd25LZXlzIiwia2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImZpbHRlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInB1c2giLCJfb2JqZWN0U3ByZWFkIiwiZm9yRWFjaCIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiZnJvbSIsInRlc3QiLCJuZXh0IiwiaXNBcnJheSIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiSW5wdXQiLCJTbWFsbEdyb3VwRm9ybSIsIm9uU3VibWl0IiwiX3JlZiRzbWFsbEdyb3VwIiwiX3JlZiRpc0xvYWRpbmciLCJpc0xvYWRpbmciLCJfdXNlU3RhdGUiLCJkZXNjcmlwdGlvbiIsImxlYWRlcl9uYW1lIiwibWVldGluZ19kYXkiLCJtZWV0aW5nX3RpbWUiLCJsb2NhdGlvbiIsIl91c2VTdGF0ZTIiLCJmb3JtRGF0YSIsInNldEZvcm1EYXRhIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJlcnJvcnMiLCJzZXRFcnJvcnMiLCJfdXNlU3RhdGU1IiwiX3VzZVN0YXRlNiIsImlzU3VibWl0dGluZyIsInNldElzU3VibWl0dGluZyIsImRheXNPZldlZWsiLCJ2YWxpZGF0ZUZvcm0iLCJuZXdFcnJvcnMiLCJ0cmltIiwiaW5jbHVkZXMiLCJoYW5kbGVDaGFuZ2UiLCJfZSR0YXJnZXQiLCJ0YXJnZXQiLCJwcmV2IiwidW5kZWZpbmVkIiwiaGFuZGxlU3VibWl0IiwiX3JlZjIiLCJfY2FsbGVlIiwiX2Vycm9yJHJlc3BvbnNlIiwiX3QiLCJfY29udGV4dCIsInByZXZlbnREZWZhdWx0IiwicmVzcG9uc2UiLCJkYXRhIiwiX3giLCJodG1sRm9yIiwiaWQiLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwicm93cyIsIm1hcCIsImRheSIsIlJlYWN0IiwiRGlhbG9nUHJpbWl0aXZlIiwiWCIsImNuIiwiUm9vdCIsIkRpYWxvZ1RyaWdnZXIiLCJUcmlnZ2VyIiwiRGlhbG9nUG9ydGFsIiwiUG9ydGFsIiwiRGlhbG9nQ2xvc2UiLCJDbG9zZSIsIkRpYWxvZ092ZXJsYXkiLCJmb3J3YXJkUmVmIiwicmVmIiwicHJvcHMiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJfZXhjbHVkZWQiLCJPdmVybGF5IiwiX2V4Y2x1ZGVkMiIsIkNvbnRlbnQiLCJfcmVmMyIsIl9leGNsdWRlZDMiLCJfcmVmNCIsIl9leGNsdWRlZDQiLCJfcmVmNSIsIl9leGNsdWRlZDUiLCJUaXRsZSIsIkRpYWxvZ0Rlc2NyaXB0aW9uIiwiX3JlZjYiLCJfZXhjbHVkZWQ2IiwiRGVzY3JpcHRpb24iLCJhcGkiLCJzbWFsbEdyb3VwQXBpIiwiZ2V0U21hbGxHcm91cHMiLCJnZXQiLCJnZXRTbWFsbEdyb3VwIiwiX2NhbGxlZTIiLCJfY29udGV4dDIiLCJjb25jYXQiLCJjcmVhdGVTbWFsbEdyb3VwIiwiX2NhbGxlZTMiLCJfY29udGV4dDMiLCJwb3N0IiwidXBkYXRlU21hbGxHcm91cCIsIl9jYWxsZWU0IiwiX2NvbnRleHQ0IiwicHV0IiwiZGVsZXRlU21hbGxHcm91cCIsIl9jYWxsZWU1IiwiX2NvbnRleHQ1IiwiUGx1cyIsIlVzZXJzIiwidXNlQXV0aCIsInVzZVRvYXN0IiwiQ2FyZCIsIlNtYWxsR3JvdXBzIiwiX3VzZUF1dGgiLCJ1c2VyIiwiX3VzZVRvYXN0Iiwic2hvd1RvYXN0IiwiaXNBZG1pbiIsInJvbGUiLCJzbWFsbEdyb3VwcyIsInNldFNtYWxsR3JvdXBzIiwic2V0SXNMb2FkaW5nIiwiaXNGb3JtT3BlbiIsInNldElzRm9ybU9wZW4iLCJfdXNlU3RhdGU3IiwiX3VzZVN0YXRlOCIsInNlbGVjdGVkR3JvdXAiLCJzZXRTZWxlY3RlZEdyb3VwIiwiX3VzZVN0YXRlOSIsIl91c2VTdGF0ZTAiLCJpc0RlbGV0ZURpYWxvZ09wZW4iLCJzZXRJc0RlbGV0ZURpYWxvZ09wZW4iLCJfdXNlU3RhdGUxIiwiX3VzZVN0YXRlMTAiLCJkZWxldGluZ0dyb3VwIiwic2V0RGVsZXRpbmdHcm91cCIsIl91c2VTdGF0ZTExIiwiX3VzZVN0YXRlMTIiLCJzZXRJc0RlbGV0aW5nIiwibG9hZFNtYWxsR3JvdXBzIiwiY29uc29sZSIsImVycm9yIiwiaGFuZGxlQWRkQ2xpY2siLCJoYW5kbGVFZGl0Q2xpY2siLCJncm91cCIsImhhbmRsZUZvcm1DbG9zZSIsImhhbmRsZUZvcm1TdWJtaXQiLCJlcnJvck1lc3NhZ2UiLCJfdDIiLCJtZXNzYWdlIiwiaGFuZGxlRGVsZXRlQ2xpY2siLCJoYW5kbGVDb25maXJtRGVsZXRlIiwiX2Vycm9yJHJlc3BvbnNlMiIsIl90MyIsImhhbmRsZUNsb3NlRGVsZXRlRGlhbG9nIiwiZm9ybWF0TWVldGluZ1RpbWUiLCJ0aW1lIiwibWVtYmVyX2NvdW50Iiwic2l6ZSJdLCJzb3VyY2VSb290IjoiIn0=