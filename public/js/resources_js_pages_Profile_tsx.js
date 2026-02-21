"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_Profile_tsx"],{

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

/***/ "./resources/js/pages/Profile.tsx"
/*!****************************************!*\
  !*** ./resources/js/pages/Profile.tsx ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ui/input */ "./resources/js/components/ui/input.tsx");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _components_ui_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ui/dialog */ "./resources/js/components/ui/dialog.tsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/square-pen.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye-off.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/log-out.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/save.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user.js");
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/api */ "./resources/js/lib/api.ts");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
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









var Profile = function Profile() {
  var _user$role;
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_13__.useAuth)(),
    user = _useAuth.user,
    logout = _useAuth.logout;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    profileData = _useState4[0],
    setProfileData = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showEditForm = _useState6[0],
    setShowEditForm = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showPassword = _useState8[0],
    setShowPassword = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: ''
    }),
    _useState0 = _slicedToArray(_useState9, 2),
    formData = _useState0[0],
    setFormData = _useState0[1];
  // Fetch user profile data
  var fetchProfile = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, _response$data$user, _response$data$user2, _response$data$data, _response$data$data2, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_12__["default"].get('/profile');
          case 1:
            response = _context.v;
            if (response.data.success) {
              setProfileData(response.data.data);
              setFormData({
                name: ((_response$data$user = response.data.user) === null || _response$data$user === void 0 ? void 0 : _response$data$user.name) || '',
                email: ((_response$data$user2 = response.data.user) === null || _response$data$user2 === void 0 ? void 0 : _response$data$user2.email) || '',
                password: '',
                phone: ((_response$data$data = response.data.data) === null || _response$data$data === void 0 ? void 0 : _response$data$data.phone) || '',
                address: ((_response$data$data2 = response.data.data) === null || _response$data$data2 === void 0 ? void 0 : _response$data$data2.address) || ''
              });
            }
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Error fetching profile:', _t);
          case 3:
            _context.p = 3;
            setLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function fetchProfile() {
      return _ref.apply(this, arguments);
    };
  }();
  // Update profile
  var handleUpdateProfile = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
      var response, _error$response, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            e.preventDefault();
            _context2.p = 1;
            setLoading(true);
            _context2.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_12__["default"].put('/profile', formData);
          case 2:
            response = _context2.v;
            if (response.data.success) {
              alert('Profile updated successfully!');
              setShowEditForm(false);
              fetchProfile();
            }
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            console.error('Error updating profile:', _t2);
            alert(((_error$response = _t2.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Failed to update profile');
          case 4:
            _context2.p = 4;
            setLoading(false);
            return _context2.f(4);
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3, 4, 5]]);
    }));
    return function handleUpdateProfile(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  // Handle logout
  var handleLogout = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (window.confirm('Are you sure you want to logout?')) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            _context3.p = 1;
            _context3.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_12__["default"].post('/logout');
          case 2:
            logout();
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t3 = _context3.v;
            console.error('Error during logout:', _t3);
            // Even if API call fails, logout locally
            logout();
          case 4:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 3]]);
    }));
    return function handleLogout() {
      return _ref3.apply(this, arguments);
    };
  }();
  // Handle input changes
  var handleInputChange = function handleInputChange(e) {
    setFormData(_objectSpread(_objectSpread({}, formData), {}, _defineProperty({}, e.target.name, e.target.value)));
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchProfile();
  }, []);
  if (loading && !profileData) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "flex justify-center items-center min-h-screen",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"
      })
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "mb-8",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
        className: "text-3xl font-bold text-gray-900",
        children: "My Profile"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "mt-2 text-gray-600",
        children: "View and update your profile information."
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.Card, {
        className: "lg:col-span-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardHeader, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardTitle, {
            className: "flex items-center",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
              className: "mr-2 h-5 w-5"
            }), "Profile Information"]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardDescription, {
            children: "Your account details and contact information."
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardContent, {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-6",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  className: "block text-sm font-medium text-gray-700 mb-1",
                  children: "Full Name"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                  className: "text-lg font-semibold text-gray-900",
                  children: (user === null || user === void 0 ? void 0 : user.name) || 'N/A'
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  className: "block text-sm font-medium text-gray-700 mb-1",
                  children: "Email Address"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                  className: "text-lg text-gray-900",
                  children: (user === null || user === void 0 ? void 0 : user.email) || 'N/A'
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  className: "block text-sm font-medium text-gray-700 mb-1",
                  children: "Role"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "inline-flex px-2 py-1 text-xs font-semibold rounded-full ".concat((user === null || user === void 0 ? void 0 : user.role) === 'admin' ? 'bg-purple-100 text-purple-800' : (user === null || user === void 0 ? void 0 : user.role) === 'staff' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'),
                  children: (user === null || user === void 0 || (_user$role = user.role) === null || _user$role === void 0 ? void 0 : _user$role.toUpperCase()) || 'N/A'
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                  className: "block text-sm font-medium text-gray-700 mb-1",
                  children: "Member Since"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                  className: "text-lg text-gray-900",
                  children: user !== null && user !== void 0 && user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "border-t pt-6",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                className: "text-lg font-medium text-gray-900 mb-4",
                children: "Contact Information"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    className: "block text-sm font-medium text-gray-700 mb-1",
                    children: "Phone Number"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-lg text-gray-900",
                    children: (profileData === null || profileData === void 0 ? void 0 : profileData.phone) || 'Not provided'
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                    className: "block text-sm font-medium text-gray-700 mb-1",
                    children: "Address"
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                    className: "text-lg text-gray-900",
                    children: (profileData === null || profileData === void 0 ? void 0 : profileData.address) || 'Not provided'
                  })]
                })]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "border-t pt-6 flex gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                onClick: function onClick() {
                  return setShowEditForm(true);
                },
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  className: "mr-2 h-4 w-4"
                }), "Edit Profile"]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                variant: "outline",
                onClick: handleLogout,
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
                  className: "mr-2 h-4 w-4"
                }), "Logout"]
              })]
            })]
          })
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.Card, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardHeader, {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardTitle, {
            children: "Account Status"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_4__.CardContent, {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-gray-600",
                children: "Account Status"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800",
                children: "Active"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-gray-600",
                children: "Email Verified"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800",
                children: "Verified"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-gray-600",
                children: "Last Login"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-gray-900",
                children: "Today"
              })]
            })]
          })
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_5__.Dialog, {
      open: showEditForm,
      onOpenChange: setShowEditForm,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_5__.DialogContent, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_5__.DialogHeader, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_5__.DialogTitle, {
            children: "Edit Profile"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_5__.DialogDescription, {
            children: "Update your profile information. Leave password blank to keep current password."
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
          onSubmit: handleUpdateProfile,
          className: "space-y-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
            name: "name",
            placeholder: "Full Name",
            value: formData.name,
            onChange: handleInputChange,
            required: true
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
            name: "email",
            type: "email",
            placeholder: "Email Address",
            value: formData.email,
            onChange: handleInputChange,
            required: true
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "relative",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
              name: "password",
              type: showPassword ? 'text' : 'password',
              placeholder: "New Password (leave blank to keep current)",
              value: formData.password,
              onChange: handleInputChange
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "button",
              onClick: function onClick() {
                return setShowPassword(!showPassword);
              },
              className: "absolute right-3 top-1/2 transform -translate-y-1/2",
              children: showPassword ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
                className: "h-4 w-4"
              }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
                className: "h-4 w-4"
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
            name: "phone",
            placeholder: "Phone Number",
            value: formData.phone,
            onChange: handleInputChange
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {
            name: "address",
            placeholder: "Address",
            value: formData.address,
            onChange: handleInputChange
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dialog__WEBPACK_IMPORTED_MODULE_5__.DialogFooter, {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
              type: "button",
              variant: "outline",
              onClick: function onClick() {
                return setShowEditForm(false);
              },
              children: "Cancel"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
              type: "submit",
              disabled: loading,
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
                className: "mr-2 h-4 w-4"
              }), loading ? 'Saving...' : 'Save Changes']
            })]
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Profile);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX1Byb2ZpbGVfdHN4LmpzP2lkPWUwZDRiM2I5MDVlYmUwMzQiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQztBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksTUFBTTtBQUNsQjtBQUNPO0FBQ1AsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtB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YXJpYS1oaWRkZW4vZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdWkvZGlhbG9nLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9pbnB1dC50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL3BhZ2VzL1Byb2ZpbGUudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9nZXQtbm9uY2UvZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9leWUtb2ZmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvZXllLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvc2F2ZS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3NxdWFyZS1wZW4uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvQ29tYmluYXRpb24uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvU2lkZUVmZmVjdC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9VSS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9hZ2dyZXNpdmVDYXB0dXJlLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L2hhbmRsZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9tZWRpdW0uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvc2lkZWNhci5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L2hvb2suanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L3NpbmdsZXRvbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzMjAxNS9hc3NpZ25SZWYuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlTWVyZ2VSZWYuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlUmVmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2Utc2lkZWNhci9kaXN0L2VzMjAxNS9leHBvcnRzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2Utc2lkZWNhci9kaXN0L2VzMjAxNS9tZWRpdW0uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9wcmltaXRpdmUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1jb250ZXh0L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZGlhbG9nL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZGlhbG9nL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3Qtc2xvdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWRpc21pc3NhYmxlLWxheWVyL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZm9jdXMtZ3VhcmRzL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZm9jdXMtc2NvcGUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1pZC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXBvcnRhbC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXByZXNlbmNlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3Qtc2xvdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWYvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtY29udHJvbGxhYmxlLXN0YXRlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWVmZmVjdC1ldmVudC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1lc2NhcGUta2V5ZG93bi9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBnZXREZWZhdWx0UGFyZW50ID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzYW1wbGVUYXJnZXQgPSBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0WzBdIDogb3JpZ2luYWxUYXJnZXQ7XG4gICAgcmV0dXJuIHNhbXBsZVRhcmdldC5vd25lckRvY3VtZW50LmJvZHk7XG59O1xudmFyIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xudmFyIHVuY29udHJvbGxlZE5vZGVzID0gbmV3IFdlYWtNYXAoKTtcbnZhciBtYXJrZXJNYXAgPSB7fTtcbnZhciBsb2NrQ291bnQgPSAwO1xudmFyIHVud3JhcEhvc3QgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBub2RlICYmIChub2RlLmhvc3QgfHwgdW53cmFwSG9zdChub2RlLnBhcmVudE5vZGUpKTtcbn07XG52YXIgY29ycmVjdFRhcmdldHMgPSBmdW5jdGlvbiAocGFyZW50LCB0YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRhcmdldHNcbiAgICAgICAgLm1hcChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChwYXJlbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29ycmVjdGVkVGFyZ2V0ID0gdW53cmFwSG9zdCh0YXJnZXQpO1xuICAgICAgICBpZiAoY29ycmVjdGVkVGFyZ2V0ICYmIHBhcmVudC5jb250YWlucyhjb3JyZWN0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29ycmVjdGVkVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FyaWEtaGlkZGVuJywgdGFyZ2V0LCAnaW4gbm90IGNvbnRhaW5lZCBpbnNpZGUnLCBwYXJlbnQsICcuIERvaW5nIG5vdGhpbmcnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4gQm9vbGVhbih4KTsgfSk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBhcmlhLWhpZGRlblxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NvbnRyb2xBdHRyaWJ1dGVdIC0gaHRtbCBBdHRyaWJ1dGUgdG8gY29udHJvbFxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbnZhciBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lLCBjb250cm9sQXR0cmlidXRlKSB7XG4gICAgdmFyIHRhcmdldHMgPSBjb3JyZWN0VGFyZ2V0cyhwYXJlbnROb2RlLCBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgaWYgKCFtYXJrZXJNYXBbbWFya2VyTmFtZV0pIHtcbiAgICAgICAgbWFya2VyTWFwW21hcmtlck5hbWVdID0gbmV3IFdlYWtNYXAoKTtcbiAgICB9XG4gICAgdmFyIG1hcmtlckNvdW50ZXIgPSBtYXJrZXJNYXBbbWFya2VyTmFtZV07XG4gICAgdmFyIGhpZGRlbk5vZGVzID0gW107XG4gICAgdmFyIGVsZW1lbnRzVG9LZWVwID0gbmV3IFNldCgpO1xuICAgIHZhciBlbGVtZW50c1RvU3RvcCA9IG5ldyBTZXQodGFyZ2V0cyk7XG4gICAgdmFyIGtlZXAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKCFlbCB8fCBlbGVtZW50c1RvS2VlcC5oYXMoZWwpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudHNUb0tlZXAuYWRkKGVsKTtcbiAgICAgICAga2VlcChlbC5wYXJlbnROb2RlKTtcbiAgICB9O1xuICAgIHRhcmdldHMuZm9yRWFjaChrZWVwKTtcbiAgICB2YXIgZGVlcCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKCFwYXJlbnQgfHwgZWxlbWVudHNUb1N0b3AuaGFzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHBhcmVudC5jaGlsZHJlbiwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50c1RvS2VlcC5oYXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBkZWVwKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBub2RlLmdldEF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFscmVhZHlIaWRkZW4gPSBhdHRyICE9PSBudWxsICYmIGF0dHIgIT09ICdmYWxzZSc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3VudGVyVmFsdWUgPSAoY291bnRlck1hcC5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya2VyVmFsdWUgPSAobWFya2VyQ291bnRlci5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyTWFwLnNldChub2RlLCBjb3VudGVyVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbk5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyVmFsdWUgPT09IDEgJiYgYWxyZWFkeUhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMuc2V0KG5vZGUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXJWYWx1ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobWFya2VyTmFtZSwgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignYXJpYS1oaWRkZW46IGNhbm5vdCBvcGVyYXRlIG9uICcsIG5vZGUsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBkZWVwKHBhcmVudE5vZGUpO1xuICAgIGVsZW1lbnRzVG9LZWVwLmNsZWFyKCk7XG4gICAgbG9ja0NvdW50Kys7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGlkZGVuTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIGNvdW50ZXJWYWx1ZSA9IGNvdW50ZXJNYXAuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIHZhciBtYXJrZXJWYWx1ZSA9IG1hcmtlckNvdW50ZXIuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAuc2V0KG5vZGUsIGNvdW50ZXJWYWx1ZSk7XG4gICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWNvdW50ZXJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdW5jb250cm9sbGVkTm9kZXMuaGFzKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1bmNvbnRyb2xsZWROb2Rlcy5kZWxldGUobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW1hcmtlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobWFya2VyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NrQ291bnQtLTtcbiAgICAgICAgaWYgKCFsb2NrQ291bnQpIHtcbiAgICAgICAgICAgIC8vIGNsZWFyXG4gICAgICAgICAgICBjb3VudGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgbWFya2VyTWFwID0ge307XG4gICAgICAgIH1cbiAgICB9O1xufTtcbi8qKlxuICogTWFya3MgZXZlcnl0aGluZyBleGNlcHQgZ2l2ZW4gbm9kZShvciBub2RlcykgYXMgYXJpYS1oaWRkZW5cbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgaGlkZU90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWFyaWEtaGlkZGVuJzsgfVxuICAgIHZhciB0YXJnZXRzID0gQXJyYXkuZnJvbShBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgdmFyIGFjdGl2ZVBhcmVudE5vZGUgPSBwYXJlbnROb2RlIHx8IGdldERlZmF1bHRQYXJlbnQob3JpZ2luYWxUYXJnZXQpO1xuICAgIGlmICghYWN0aXZlUGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfTtcbiAgICB9XG4gICAgLy8gd2Ugc2hvdWxkIG5vdCBoaWRlIGFyaWEtbGl2ZSBlbGVtZW50cyAtIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvYXJpYS1oaWRkZW4vaXNzdWVzLzEwXG4gICAgLy8gYW5kIHNjcmlwdCBlbGVtZW50cywgYXMgdGhleSBoYXZlIG5vIGltcGFjdCBvbiBhY2Nlc3NpYmlsaXR5LlxuICAgIHRhcmdldHMucHVzaC5hcHBseSh0YXJnZXRzLCBBcnJheS5mcm9tKGFjdGl2ZVBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtbGl2ZV0sIHNjcmlwdCcpKSk7XG4gICAgcmV0dXJuIGFwcGx5QXR0cmlidXRlVG9PdGhlcnModGFyZ2V0cywgYWN0aXZlUGFyZW50Tm9kZSwgbWFya2VyTmFtZSwgJ2FyaWEtaGlkZGVuJyk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBpbmVydFxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcmV0dXJuIHtVbmRvfSB1bmRvIGNvbW1hbmRcbiAqL1xuZXhwb3J0IHZhciBpbmVydE90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWluZXJ0LWVkJzsgfVxuICAgIHZhciBhY3RpdmVQYXJlbnROb2RlID0gcGFyZW50Tm9kZSB8fCBnZXREZWZhdWx0UGFyZW50KG9yaWdpbmFsVGFyZ2V0KTtcbiAgICBpZiAoIWFjdGl2ZVBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH07XG4gICAgfVxuICAgIHJldHVybiBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzKG9yaWdpbmFsVGFyZ2V0LCBhY3RpdmVQYXJlbnROb2RlLCBtYXJrZXJOYW1lLCAnaW5lcnQnKTtcbn07XG4vKipcbiAqIEByZXR1cm5zIGlmIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBpbmVydFxuICovXG5leHBvcnQgdmFyIHN1cHBvcnRzSW5lcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgSFRNTEVsZW1lbnQucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdpbmVydCcpO1xufTtcbi8qKlxuICogQXV0b21hdGljIGZ1bmN0aW9uIHRvIFwic3VwcHJlc3NcIiBET00gZWxlbWVudHMgLSBfaGlkZV8gb3IgX2luZXJ0XyBpbiB0aGUgYmVzdCBwb3NzaWJsZSB3YXlcbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgc3VwcHJlc3NPdGhlcnMgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpIHtcbiAgICBpZiAobWFya2VyTmFtZSA9PT0gdm9pZCAwKSB7IG1hcmtlck5hbWUgPSAnZGF0YS1zdXBwcmVzc2VkJzsgfVxuICAgIHJldHVybiAoc3VwcG9ydHNJbmVydCgpID8gaW5lcnRPdGhlcnMgOiBoaWRlT3RoZXJzKShvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSk7XG59O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgRGlhbG9nUHJpbWl0aXZlIGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtZGlhbG9nXCI7XG5pbXBvcnQgeyBYIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgY24gfSBmcm9tIFwiLi4vLi4vbGliL3V0aWxzXCI7XG5jb25zdCBEaWFsb2cgPSBEaWFsb2dQcmltaXRpdmUuUm9vdDtcbmNvbnN0IERpYWxvZ1RyaWdnZXIgPSBEaWFsb2dQcmltaXRpdmUuVHJpZ2dlcjtcbmNvbnN0IERpYWxvZ1BvcnRhbCA9IERpYWxvZ1ByaW1pdGl2ZS5Qb3J0YWw7XG5jb25zdCBEaWFsb2dDbG9zZSA9IERpYWxvZ1ByaW1pdGl2ZS5DbG9zZTtcbmNvbnN0IERpYWxvZ092ZXJsYXkgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeChEaWFsb2dQcmltaXRpdmUuT3ZlcmxheSwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcImZpeGVkIGluc2V0LTAgei01MCBiZy1iYWNrZ3JvdW5kLzgwIGJhY2tkcm9wLWJsdXItc20gZGF0YS1bc3RhdGU9b3Blbl06YW5pbWF0ZS1pbiBkYXRhLVtzdGF0ZT1jbG9zZWRdOmFuaW1hdGUtb3V0IGRhdGEtW3N0YXRlPWNsb3NlZF06ZmFkZS1vdXQtMCBkYXRhLVtzdGF0ZT1vcGVuXTpmYWRlLWluLTBcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpKTtcbkRpYWxvZ092ZXJsYXkuZGlzcGxheU5hbWUgPSBEaWFsb2dQcmltaXRpdmUuT3ZlcmxheS5kaXNwbGF5TmFtZTtcbmNvbnN0IERpYWxvZ0NvbnRlbnQgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgY2hpbGRyZW4sIC4uLnByb3BzIH0sIHJlZikgPT4gKF9qc3hzKERpYWxvZ1BvcnRhbCwgeyBjaGlsZHJlbjogW19qc3goRGlhbG9nT3ZlcmxheSwge30pLCBfanN4cyhEaWFsb2dQcmltaXRpdmUuQ29udGVudCwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcImZpeGVkIGxlZnQtWzUwJV0gdG9wLVs1MCVdIHotNTAgZ3JpZCB3LWZ1bGwgbWF4LXctbGcgdHJhbnNsYXRlLXgtWy01MCVdIHRyYW5zbGF0ZS15LVstNTAlXSBnYXAtNCBib3JkZXIgYmctYmFja2dyb3VuZCBwLTYgc2hhZG93LWxnIGR1cmF0aW9uLTIwMCBkYXRhLVtzdGF0ZT1vcGVuXTphbmltYXRlLWluIGRhdGEtW3N0YXRlPWNsb3NlZF06YW5pbWF0ZS1vdXQgZGF0YS1bc3RhdGU9Y2xvc2VkXTpmYWRlLW91dC0wIGRhdGEtW3N0YXRlPW9wZW5dOmZhZGUtaW4tMCBkYXRhLVtzdGF0ZT1jbG9zZWRdOnpvb20tb3V0LTk1IGRhdGEtW3N0YXRlPW9wZW5dOnpvb20taW4tOTUgZGF0YS1bc3RhdGU9Y2xvc2VkXTpzbGlkZS1vdXQtdG8tbGVmdC0xLzIgZGF0YS1bc3RhdGU9Y2xvc2VkXTpzbGlkZS1vdXQtdG8tdG9wLVs0OCVdIGRhdGEtW3N0YXRlPW9wZW5dOnNsaWRlLWluLWZyb20tbGVmdC0xLzIgZGF0YS1bc3RhdGU9b3Blbl06c2xpZGUtaW4tZnJvbS10b3AtWzQ4JV0gc206cm91bmRlZC1sZyBtYXgtaC1bOTB2aF0gb3ZlcmZsb3cteS1hdXRvXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzLCBjaGlsZHJlbjogW2NoaWxkcmVuLCBfanN4cyhEaWFsb2dQcmltaXRpdmUuQ2xvc2UsIHsgY2xhc3NOYW1lOiBcImFic29sdXRlIHJpZ2h0LTQgdG9wLTQgcm91bmRlZC1zbSBvcGFjaXR5LTcwIHJpbmctb2Zmc2V0LWJhY2tncm91bmQgdHJhbnNpdGlvbi1vcGFjaXR5IGhvdmVyOm9wYWNpdHktMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1yaW5nIGZvY3VzOnJpbmctb2Zmc2V0LTIgZGlzYWJsZWQ6cG9pbnRlci1ldmVudHMtbm9uZSBkYXRhLVtzdGF0ZT1vcGVuXTpiZy1hY2NlbnQgZGF0YS1bc3RhdGU9b3Blbl06dGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIsIGNoaWxkcmVuOiBbX2pzeChYLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInNyLW9ubHlcIiwgY2hpbGRyZW46IFwiQ2xvc2VcIiB9KV0gfSldIH0pXSB9KSkpO1xuRGlhbG9nQ29udGVudC5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5Db250ZW50LmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nSGVhZGVyID0gKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oXCJmbGV4IGZsZXgtY29sIHNwYWNlLXktMS41IHRleHQtY2VudGVyIHNtOnRleHQtbGVmdFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSk7XG5EaWFsb2dIZWFkZXIuZGlzcGxheU5hbWUgPSBcIkRpYWxvZ0hlYWRlclwiO1xuY29uc3QgRGlhbG9nRm9vdGVyID0gKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oXCJmbGV4IGZsZXgtY29sLXJldmVyc2Ugc206ZmxleC1yb3cgc206anVzdGlmeS1lbmQgc206c3BhY2UteC0yXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKTtcbkRpYWxvZ0Zvb3Rlci5kaXNwbGF5TmFtZSA9IFwiRGlhbG9nRm9vdGVyXCI7XG5jb25zdCBEaWFsb2dUaXRsZSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5UaXRsZSwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcInRleHQtbGcgZm9udC1zZW1pYm9sZCBsZWFkaW5nLW5vbmUgdHJhY2tpbmctdGlnaHRcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpKTtcbkRpYWxvZ1RpdGxlLmRpc3BsYXlOYW1lID0gRGlhbG9nUHJpbWl0aXZlLlRpdGxlLmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nRGVzY3JpcHRpb24gPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeChEaWFsb2dQcmltaXRpdmUuRGVzY3JpcHRpb24sIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJ0ZXh0LXNtIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nRGVzY3JpcHRpb24uZGlzcGxheU5hbWUgPSBEaWFsb2dQcmltaXRpdmUuRGVzY3JpcHRpb24uZGlzcGxheU5hbWU7XG5leHBvcnQgeyBEaWFsb2csIERpYWxvZ1BvcnRhbCwgRGlhbG9nT3ZlcmxheSwgRGlhbG9nQ2xvc2UsIERpYWxvZ1RyaWdnZXIsIERpYWxvZ0NvbnRlbnQsIERpYWxvZ0hlYWRlciwgRGlhbG9nRm9vdGVyLCBEaWFsb2dUaXRsZSwgRGlhbG9nRGVzY3JpcHRpb24sIH07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCIuLi8uLi9saWIvdXRpbHNcIjtcbmNvbnN0IElucHV0ID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIHR5cGUsIC4uLnByb3BzIH0sIHJlZikgPT4ge1xuICAgIHJldHVybiAoX2pzeChcImlucHV0XCIsIHsgdHlwZTogdHlwZSwgY2xhc3NOYW1lOiBjbihcImZsZXggaC0xMCB3LWZ1bGwgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWlucHV0IGJnLWJhY2tncm91bmQgcHgtMyBweS0yIHRleHQtc20gcmluZy1vZmZzZXQtYmFja2dyb3VuZCBmaWxlOmJvcmRlci0wIGZpbGU6YmctdHJhbnNwYXJlbnQgZmlsZTp0ZXh0LXNtIGZpbGU6Zm9udC1tZWRpdW0gcGxhY2Vob2xkZXI6dGV4dC1tdXRlZC1mb3JlZ3JvdW5kIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1yaW5nIGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtMiBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS01MFwiLCBjbGFzc05hbWUpLCByZWY6IHJlZiwgLi4ucHJvcHMgfSkpO1xufSk7XG5JbnB1dC5kaXNwbGF5TmFtZSA9IFwiSW5wdXRcIjtcbmV4cG9ydCB7IElucHV0IH07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvYnV0dG9uJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9pbnB1dCc7XG5pbXBvcnQgeyBDYXJkLCBDYXJkQ29udGVudCwgQ2FyZERlc2NyaXB0aW9uLCBDYXJkSGVhZGVyLCBDYXJkVGl0bGUgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2NhcmQnO1xuaW1wb3J0IHsgRGlhbG9nLCBEaWFsb2dDb250ZW50LCBEaWFsb2dEZXNjcmlwdGlvbiwgRGlhbG9nRm9vdGVyLCBEaWFsb2dIZWFkZXIsIERpYWxvZ1RpdGxlIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9kaWFsb2cnO1xuaW1wb3J0IHsgVXNlciwgRWRpdCwgTG9nT3V0LCBTYXZlLCBFeWUsIEV5ZU9mZiB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgYXBpIGZyb20gJy4uL2xpYi9hcGknO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gJy4uL2NvbnRleHRzL0F1dGhDb250ZXh0JztcbmNvbnN0IFByb2ZpbGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB1c2VyLCBsb2dvdXQgfSA9IHVzZUF1dGgoKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3Byb2ZpbGVEYXRhLCBzZXRQcm9maWxlRGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbc2hvd0VkaXRGb3JtLCBzZXRTaG93RWRpdEZvcm1dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtzaG93UGFzc3dvcmQsIHNldFNob3dQYXNzd29yZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBlbWFpbDogJycsXG4gICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgICAgcGhvbmU6ICcnLFxuICAgICAgICBhZGRyZXNzOiAnJ1xuICAgIH0pO1xuICAgIC8vIEZldGNoIHVzZXIgcHJvZmlsZSBkYXRhXG4gICAgY29uc3QgZmV0Y2hQcm9maWxlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL3Byb2ZpbGUnKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBzZXRQcm9maWxlRGF0YShyZXNwb25zZS5kYXRhLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVzcG9uc2UuZGF0YS51c2VyPy5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogcmVzcG9uc2UuZGF0YS51c2VyPy5lbWFpbCB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogcmVzcG9uc2UuZGF0YS5kYXRhPy5waG9uZSB8fCAnJyxcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuZGF0YS5kYXRhPy5hZGRyZXNzIHx8ICcnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBwcm9maWxlOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBVcGRhdGUgcHJvZmlsZVxuICAgIGNvbnN0IGhhbmRsZVVwZGF0ZVByb2ZpbGUgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KCcvcHJvZmlsZScsIGZvcm1EYXRhKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvZmlsZSB1cGRhdGVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAgICAgICAgICAgICBzZXRTaG93RWRpdEZvcm0oZmFsc2UpO1xuICAgICAgICAgICAgICAgIGZldGNoUHJvZmlsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBkYXRpbmcgcHJvZmlsZTonLCBlcnJvcik7XG4gICAgICAgICAgICBhbGVydChlcnJvci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gSGFuZGxlIGxvZ291dFxuICAgIGNvbnN0IGhhbmRsZUxvZ291dCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCF3aW5kb3cuY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxvZ291dD8nKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IGFwaS5wb3N0KCcvbG9nb3V0Jyk7XG4gICAgICAgICAgICBsb2dvdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGR1cmluZyBsb2dvdXQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgLy8gRXZlbiBpZiBBUEkgY2FsbCBmYWlscywgbG9nb3V0IGxvY2FsbHlcbiAgICAgICAgICAgIGxvZ291dCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBIYW5kbGUgaW5wdXQgY2hhbmdlc1xuICAgIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgc2V0Rm9ybURhdGEoe1xuICAgICAgICAgICAgLi4uZm9ybURhdGEsXG4gICAgICAgICAgICBbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hQcm9maWxlKCk7XG4gICAgfSwgW10pO1xuICAgIGlmIChsb2FkaW5nICYmICFwcm9maWxlRGF0YSkge1xuICAgICAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgbWluLWgtc2NyZWVuXCIsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImFuaW1hdGUtc3BpbiByb3VuZGVkLWZ1bGwgaC04IHctOCBib3JkZXItYi0yIGJvcmRlci1pbmRpZ28tNTAwXCIgfSkgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1iLThcIiwgY2hpbGRyZW46IFtfanN4KFwiaDFcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0zeGwgZm9udC1ib2xkIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiTXkgUHJvZmlsZVwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJtdC0yIHRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFwiVmlldyBhbmQgdXBkYXRlIHlvdXIgcHJvZmlsZSBpbmZvcm1hdGlvbi5cIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTMgZ2FwLTZcIiwgY2hpbGRyZW46IFtfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJsZzpjb2wtc3Bhbi0yXCIsIGNoaWxkcmVuOiBbX2pzeHMoQ2FyZEhlYWRlciwgeyBjaGlsZHJlbjogW19qc3hzKENhcmRUaXRsZSwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFVzZXIsIHsgY2xhc3NOYW1lOiBcIm1yLTIgaC01IHctNVwiIH0pLCBcIlByb2ZpbGUgSW5mb3JtYXRpb25cIl0gfSksIF9qc3goQ2FyZERlc2NyaXB0aW9uLCB7IGNoaWxkcmVuOiBcIllvdXIgYWNjb3VudCBkZXRhaWxzIGFuZCBjb250YWN0IGluZm9ybWF0aW9uLlwiIH0pXSB9KSwgX2pzeChDYXJkQ29udGVudCwgeyBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiRnVsbCBOYW1lXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiB1c2VyPy5uYW1lIHx8ICdOL0EnIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJFbWFpbCBBZGRyZXNzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogdXNlcj8uZW1haWwgfHwgJ04vQScgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIlJvbGVcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IGBpbmxpbmUtZmxleCBweC0yIHB5LTEgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQtZnVsbCAke3VzZXI/LnJvbGUgPT09ICdhZG1pbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtMTAwIHRleHQtcHVycGxlLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHVzZXI/LnJvbGUgPT09ICdzdGFmZidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYmx1ZS0xMDAgdGV4dC1ibHVlLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZ3JlZW4tMTAwIHRleHQtZ3JlZW4tODAwJ31gLCBjaGlsZHJlbjogdXNlcj8ucm9sZT8udG9VcHBlckNhc2UoKSB8fCAnTi9BJyB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiTWVtYmVyIFNpbmNlXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogdXNlcj8uY3JlYXRlZF9hdCA/IG5ldyBEYXRlKHVzZXIuY3JlYXRlZF9hdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCkgOiAnTi9BJyB9KV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJib3JkZXItdCBwdC02XCIsIGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMCBtYi00XCIsIGNoaWxkcmVuOiBcIkNvbnRhY3QgSW5mb3JtYXRpb25cIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiUGhvbmUgTnVtYmVyXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogcHJvZmlsZURhdGE/LnBob25lIHx8ICdOb3QgcHJvdmlkZWQnIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJBZGRyZXNzXCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogcHJvZmlsZURhdGE/LmFkZHJlc3MgfHwgJ05vdCBwcm92aWRlZCcgfSldIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJvcmRlci10IHB0LTYgZmxleCBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKEJ1dHRvbiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRTaG93RWRpdEZvcm0odHJ1ZSksIGNoaWxkcmVuOiBbX2pzeChFZGl0LCB7IGNsYXNzTmFtZTogXCJtci0yIGgtNCB3LTRcIiB9KSwgXCJFZGl0IFByb2ZpbGVcIl0gfSksIF9qc3hzKEJ1dHRvbiwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgb25DbGljazogaGFuZGxlTG9nb3V0LCBjaGlsZHJlbjogW19qc3goTG9nT3V0LCB7IGNsYXNzTmFtZTogXCJtci0yIGgtNCB3LTRcIiB9KSwgXCJMb2dvdXRcIl0gfSldIH0pXSB9KSB9KV0gfSksIF9qc3hzKENhcmQsIHsgY2hpbGRyZW46IFtfanN4KENhcmRIZWFkZXIsIHsgY2hpbGRyZW46IF9qc3goQ2FyZFRpdGxlLCB7IGNoaWxkcmVuOiBcIkFjY291bnQgU3RhdHVzXCIgfSkgfSksIF9qc3goQ2FyZENvbnRlbnQsIHsgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogXCJBY2NvdW50IFN0YXR1c1wiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtZmxleCBweC0yIHB5LTEgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQtZnVsbCBiZy1ncmVlbi0xMDAgdGV4dC1ncmVlbi04MDBcIiwgY2hpbGRyZW46IFwiQWN0aXZlXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFwiRW1haWwgVmVyaWZpZWRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiaW5saW5lLWZsZXggcHgtMiBweS0xIHRleHQteHMgZm9udC1zZW1pYm9sZCByb3VuZGVkLWZ1bGwgYmctZ3JlZW4tMTAwIHRleHQtZ3JlZW4tODAwXCIsIGNoaWxkcmVuOiBcIlZlcmlmaWVkXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFwiTGFzdCBMb2dpblwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IFwiVG9kYXlcIiB9KV0gfSldIH0pIH0pXSB9KV0gfSksIF9qc3goRGlhbG9nLCB7IG9wZW46IHNob3dFZGl0Rm9ybSwgb25PcGVuQ2hhbmdlOiBzZXRTaG93RWRpdEZvcm0sIGNoaWxkcmVuOiBfanN4cyhEaWFsb2dDb250ZW50LCB7IGNoaWxkcmVuOiBbX2pzeHMoRGlhbG9nSGVhZGVyLCB7IGNoaWxkcmVuOiBbX2pzeChEaWFsb2dUaXRsZSwgeyBjaGlsZHJlbjogXCJFZGl0IFByb2ZpbGVcIiB9KSwgX2pzeChEaWFsb2dEZXNjcmlwdGlvbiwgeyBjaGlsZHJlbjogXCJVcGRhdGUgeW91ciBwcm9maWxlIGluZm9ybWF0aW9uLiBMZWF2ZSBwYXNzd29yZCBibGFuayB0byBrZWVwIGN1cnJlbnQgcGFzc3dvcmQuXCIgfSldIH0pLCBfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlVXBkYXRlUHJvZmlsZSwgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3goSW5wdXQsIHsgbmFtZTogXCJuYW1lXCIsIHBsYWNlaG9sZGVyOiBcIkZ1bGwgTmFtZVwiLCB2YWx1ZTogZm9ybURhdGEubmFtZSwgb25DaGFuZ2U6IGhhbmRsZUlucHV0Q2hhbmdlLCByZXF1aXJlZDogdHJ1ZSB9KSwgX2pzeChJbnB1dCwgeyBuYW1lOiBcImVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiwgcGxhY2Vob2xkZXI6IFwiRW1haWwgQWRkcmVzc1wiLCB2YWx1ZTogZm9ybURhdGEuZW1haWwsIG9uQ2hhbmdlOiBoYW5kbGVJbnB1dENoYW5nZSwgcmVxdWlyZWQ6IHRydWUgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJlbGF0aXZlXCIsIGNoaWxkcmVuOiBbX2pzeChJbnB1dCwgeyBuYW1lOiBcInBhc3N3b3JkXCIsIHR5cGU6IHNob3dQYXNzd29yZCA/ICd0ZXh0JyA6ICdwYXNzd29yZCcsIHBsYWNlaG9sZGVyOiBcIk5ldyBQYXNzd29yZCAobGVhdmUgYmxhbmsgdG8ga2VlcCBjdXJyZW50KVwiLCB2YWx1ZTogZm9ybURhdGEucGFzc3dvcmQsIG9uQ2hhbmdlOiBoYW5kbGVJbnB1dENoYW5nZSB9KSwgX2pzeChcImJ1dHRvblwiLCB7IHR5cGU6IFwiYnV0dG9uXCIsIG9uQ2xpY2s6ICgpID0+IHNldFNob3dQYXNzd29yZCghc2hvd1Bhc3N3b3JkKSwgY2xhc3NOYW1lOiBcImFic29sdXRlIHJpZ2h0LTMgdG9wLTEvMiB0cmFuc2Zvcm0gLXRyYW5zbGF0ZS15LTEvMlwiLCBjaGlsZHJlbjogc2hvd1Bhc3N3b3JkID8gX2pzeChFeWVPZmYsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSA6IF9qc3goRXllLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSkgfSldIH0pLCBfanN4KElucHV0LCB7IG5hbWU6IFwicGhvbmVcIiwgcGxhY2Vob2xkZXI6IFwiUGhvbmUgTnVtYmVyXCIsIHZhbHVlOiBmb3JtRGF0YS5waG9uZSwgb25DaGFuZ2U6IGhhbmRsZUlucHV0Q2hhbmdlIH0pLCBfanN4KElucHV0LCB7IG5hbWU6IFwiYWRkcmVzc1wiLCBwbGFjZWhvbGRlcjogXCJBZGRyZXNzXCIsIHZhbHVlOiBmb3JtRGF0YS5hZGRyZXNzLCBvbkNoYW5nZTogaGFuZGxlSW5wdXRDaGFuZ2UgfSksIF9qc3hzKERpYWxvZ0Zvb3RlciwgeyBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiBzZXRTaG93RWRpdEZvcm0oZmFsc2UpLCBjaGlsZHJlbjogXCJDYW5jZWxcIiB9KSwgX2pzeHMoQnV0dG9uLCB7IHR5cGU6IFwic3VibWl0XCIsIGRpc2FibGVkOiBsb2FkaW5nLCBjaGlsZHJlbjogW19qc3goU2F2ZSwgeyBjbGFzc05hbWU6IFwibXItMiBoLTQgdy00XCIgfSksIGxvYWRpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlIENoYW5nZXMnXSB9KV0gfSldIH0pXSB9KSB9KV0gfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGU7XG4iLCJ2YXIgY3VycmVudE5vbmNlO1xuZXhwb3J0IHZhciBzZXROb25jZSA9IGZ1bmN0aW9uIChub25jZSkge1xuICAgIGN1cnJlbnROb25jZSA9IG5vbmNlO1xufTtcbmV4cG9ydCB2YXIgZ2V0Tm9uY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGN1cnJlbnROb25jZSkge1xuICAgICAgICByZXR1cm4gY3VycmVudE5vbmNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMTAuNzMzIDUuMDc2YTEwLjc0NCAxMC43NDQgMCAwIDEgMTEuMjA1IDYuNTc1IDEgMSAwIDAgMSAwIC42OTYgMTAuNzQ3IDEwLjc0NyAwIDAgMS0xLjQ0NCAyLjQ5XCIsXG4gICAgICBrZXk6IFwiY3Q4ZTFmXCJcbiAgICB9XG4gIF0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNC4wODQgMTQuMTU4YTMgMyAwIDAgMS00LjI0Mi00LjI0MlwiLCBrZXk6IFwiMTUxcnhoXCIgfV0sXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xNy40NzkgMTcuNDk5YTEwLjc1IDEwLjc1IDAgMCAxLTE1LjQxNy01LjE1MSAxIDEgMCAwIDEgMC0uNjk2IDEwLjc1IDEwLjc1IDAgMCAxIDQuNDQ2LTUuMTQzXCIsXG4gICAgICBrZXk6IFwiMTNiajlhXCJcbiAgICB9XG4gIF0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIm0yIDIgMjAgMjBcIiwga2V5OiBcIjFvb2V3eVwiIH1dXG5dO1xuY29uc3QgRXllT2ZmID0gY3JlYXRlTHVjaWRlSWNvbihcImV5ZS1vZmZcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIEV5ZU9mZiBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leWUtb2ZmLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMi4wNjIgMTIuMzQ4YTEgMSAwIDAgMSAwLS42OTYgMTAuNzUgMTAuNzUgMCAwIDEgMTkuODc2IDAgMSAxIDAgMCAxIDAgLjY5NiAxMC43NSAxMC43NSAwIDAgMS0xOS44NzYgMFwiLFxuICAgICAga2V5OiBcIjFuY2xjMFwiXG4gICAgfVxuICBdLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMlwiLCBjeTogXCIxMlwiLCByOiBcIjNcIiwga2V5OiBcIjF2N3pyZFwiIH1dXG5dO1xuY29uc3QgRXllID0gY3JlYXRlTHVjaWRlSWNvbihcImV5ZVwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgRXllIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV5ZS5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTE1LjIgM2EyIDIgMCAwIDEgMS40LjZsMy44IDMuOGEyIDIgMCAwIDEgLjYgMS40VjE5YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMnpcIixcbiAgICAgIGtleTogXCIxYzg0NzZcIlxuICAgIH1cbiAgXSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE3IDIxdi03YTEgMSAwIDAgMC0xLTFIOGExIDEgMCAwIDAtMSAxdjdcIiwga2V5OiBcIjF5ZHRvc1wiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNNyAzdjRhMSAxIDAgMCAwIDEgMWg3XCIsIGtleTogXCJ0NTF1NzNcIiB9XVxuXTtcbmNvbnN0IFNhdmUgPSBjcmVhdGVMdWNpZGVJY29uKFwic2F2ZVwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgU2F2ZSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zYXZlLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgM0g1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0ydi03XCIsIGtleTogXCIxbTB2NmdcIiB9XSxcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTE4LjM3NSAyLjYyNWExIDEgMCAwIDEgMyAzbC05LjAxMyA5LjAxNGEyIDIgMCAwIDEtLjg1My41MDVsLTIuODczLjg0YS41LjUgMCAwIDEtLjYyLS42MmwuODQtMi44NzNhMiAyIDAgMCAxIC41MDYtLjg1MnpcIixcbiAgICAgIGtleTogXCJvaHJiZzJcIlxuICAgIH1cbiAgXVxuXTtcbmNvbnN0IFNxdWFyZVBlbiA9IGNyZWF0ZUx1Y2lkZUljb24oXCJzcXVhcmUtcGVuXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBTcXVhcmVQZW4gYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3F1YXJlLXBlbi5qcy5tYXBcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN0eWxlU2luZ2xldG9uIH0gZnJvbSAncmVhY3Qtc3R5bGUtc2luZ2xldG9uJztcbmltcG9ydCB7IGZ1bGxXaWR0aENsYXNzTmFtZSwgemVyb1JpZ2h0Q2xhc3NOYW1lLCBub1Njcm9sbGJhcnNDbGFzc05hbWUsIHJlbW92ZWRCYXJTaXplVmFyaWFibGUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRHYXBXaWR0aCB9IGZyb20gJy4vdXRpbHMnO1xudmFyIFN0eWxlID0gc3R5bGVTaW5nbGV0b24oKTtcbmV4cG9ydCB2YXIgbG9ja0F0dHJpYnV0ZSA9ICdkYXRhLXNjcm9sbC1sb2NrZWQnO1xuLy8gaW1wb3J0YW50IHRpcCAtIG9uY2Ugd2UgbWVhc3VyZSBzY3JvbGxCYXIgd2lkdGggYW5kIHJlbW92ZSB0aGVtXG4vLyB3ZSBjb3VsZCBub3QgcmVwZWF0IHRoaXMgb3BlcmF0aW9uXG4vLyB0aHVzIHdlIGFyZSB1c2luZyBzdHlsZS1zaW5nbGV0b24gLSBvbmx5IHRoZSBmaXJzdCBcInlldCBjb3JyZWN0XCIgc3R5bGUgd2lsbCBiZSBhcHBsaWVkLlxudmFyIGdldFN0eWxlcyA9IGZ1bmN0aW9uIChfYSwgYWxsb3dSZWxhdGl2ZSwgZ2FwTW9kZSwgaW1wb3J0YW50KSB7XG4gICAgdmFyIGxlZnQgPSBfYS5sZWZ0LCB0b3AgPSBfYS50b3AsIHJpZ2h0ID0gX2EucmlnaHQsIGdhcCA9IF9hLmdhcDtcbiAgICBpZiAoZ2FwTW9kZSA9PT0gdm9pZCAwKSB7IGdhcE1vZGUgPSAnbWFyZ2luJzsgfVxuICAgIHJldHVybiBcIlxcbiAgLlwiLmNvbmNhdChub1Njcm9sbGJhcnNDbGFzc05hbWUsIFwiIHtcXG4gICBvdmVyZmxvdzogaGlkZGVuIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gICBwYWRkaW5nLXJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBib2R5W1wiKS5jb25jYXQobG9ja0F0dHJpYnV0ZSwgXCJdIHtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbiBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICAgIG92ZXJzY3JvbGwtYmVoYXZpb3I6IGNvbnRhaW47XFxuICAgIFwiKS5jb25jYXQoW1xuICAgICAgICBhbGxvd1JlbGF0aXZlICYmIFwicG9zaXRpb246IHJlbGF0aXZlIFwiLmNvbmNhdChpbXBvcnRhbnQsIFwiO1wiKSxcbiAgICAgICAgZ2FwTW9kZSA9PT0gJ21hcmdpbicgJiZcbiAgICAgICAgICAgIFwiXFxuICAgIHBhZGRpbmctbGVmdDogXCIuY29uY2F0KGxlZnQsIFwicHg7XFxuICAgIHBhZGRpbmctdG9wOiBcIikuY29uY2F0KHRvcCwgXCJweDtcXG4gICAgcGFkZGluZy1yaWdodDogXCIpLmNvbmNhdChyaWdodCwgXCJweDtcXG4gICAgbWFyZ2luLWxlZnQ6MDtcXG4gICAgbWFyZ2luLXRvcDowO1xcbiAgICBtYXJnaW4tcmlnaHQ6IFwiKS5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gICAgXCIpLFxuICAgICAgICBnYXBNb2RlID09PSAncGFkZGluZycgJiYgXCJwYWRkaW5nLXJpZ2h0OiBcIi5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcIiksXG4gICAgXVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgIC5qb2luKCcnKSwgXCJcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoemVyb1JpZ2h0Q2xhc3NOYW1lLCBcIiB7XFxuICAgIHJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KGZ1bGxXaWR0aENsYXNzTmFtZSwgXCIge1xcbiAgICBtYXJnaW4tcmlnaHQ6IFwiKS5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoemVyb1JpZ2h0Q2xhc3NOYW1lLCBcIiAuXCIpLmNvbmNhdCh6ZXJvUmlnaHRDbGFzc05hbWUsIFwiIHtcXG4gICAgcmlnaHQ6IDAgXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICAuXCIpLmNvbmNhdChmdWxsV2lkdGhDbGFzc05hbWUsIFwiIC5cIikuY29uY2F0KGZ1bGxXaWR0aENsYXNzTmFtZSwgXCIge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDAgXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICBib2R5W1wiKS5jb25jYXQobG9ja0F0dHJpYnV0ZSwgXCJdIHtcXG4gICAgXCIpLmNvbmNhdChyZW1vdmVkQmFyU2l6ZVZhcmlhYmxlLCBcIjogXCIpLmNvbmNhdChnYXAsIFwicHg7XFxuICB9XFxuXCIpO1xufTtcbnZhciBnZXRDdXJyZW50VXNlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY291bnRlciA9IHBhcnNlSW50KGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKGxvY2tBdHRyaWJ1dGUpIHx8ICcwJywgMTApO1xuICAgIHJldHVybiBpc0Zpbml0ZShjb3VudGVyKSA/IGNvdW50ZXIgOiAwO1xufTtcbmV4cG9ydCB2YXIgdXNlTG9ja0F0dHJpYnV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShsb2NrQXR0cmlidXRlLCAoZ2V0Q3VycmVudFVzZUNvdW50ZXIoKSArIDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5ld0NvdW50ZXIgPSBnZXRDdXJyZW50VXNlQ291bnRlcigpIC0gMTtcbiAgICAgICAgICAgIGlmIChuZXdDb3VudGVyIDw9IDApIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZShsb2NrQXR0cmlidXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKGxvY2tBdHRyaWJ1dGUsIG5ld0NvdW50ZXIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSwgW10pO1xufTtcbi8qKlxuICogUmVtb3ZlcyBwYWdlIHNjcm9sbGJhciBhbmQgYmxvY2tzIHBhZ2Ugc2Nyb2xsIHdoZW4gbW91bnRlZFxuICovXG5leHBvcnQgdmFyIFJlbW92ZVNjcm9sbEJhciA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBub1JlbGF0aXZlID0gX2Eubm9SZWxhdGl2ZSwgbm9JbXBvcnRhbnQgPSBfYS5ub0ltcG9ydGFudCwgX2IgPSBfYS5nYXBNb2RlLCBnYXBNb2RlID0gX2IgPT09IHZvaWQgMCA/ICdtYXJnaW4nIDogX2I7XG4gICAgdXNlTG9ja0F0dHJpYnV0ZSgpO1xuICAgIC8qXG4gICAgIGdhcCB3aWxsIGJlIG1lYXN1cmVkIG9uIGV2ZXJ5IGNvbXBvbmVudCBtb3VudFxuICAgICBob3dldmVyIGl0IHdpbGwgYmUgdXNlZCBvbmx5IGJ5IHRoZSBcImZpcnN0XCIgaW52b2NhdGlvblxuICAgICBkdWUgdG8gc2luZ2xldG9uIG5hdHVyZSBvZiA8U3R5bGVcbiAgICAgKi9cbiAgICB2YXIgZ2FwID0gUmVhY3QudXNlTWVtbyhmdW5jdGlvbiAoKSB7IHJldHVybiBnZXRHYXBXaWR0aChnYXBNb2RlKTsgfSwgW2dhcE1vZGVdKTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTdHlsZSwgeyBzdHlsZXM6IGdldFN0eWxlcyhnYXAsICFub1JlbGF0aXZlLCBnYXBNb2RlLCAhbm9JbXBvcnRhbnQgPyAnIWltcG9ydGFudCcgOiAnJykgfSk7XG59O1xuIiwiZXhwb3J0IHZhciB6ZXJvUmlnaHRDbGFzc05hbWUgPSAncmlnaHQtc2Nyb2xsLWJhci1wb3NpdGlvbic7XG5leHBvcnQgdmFyIGZ1bGxXaWR0aENsYXNzTmFtZSA9ICd3aWR0aC1iZWZvcmUtc2Nyb2xsLWJhcic7XG5leHBvcnQgdmFyIG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSA9ICd3aXRoLXNjcm9sbC1iYXJzLWhpZGRlbic7XG4vKipcbiAqIE5hbWUgb2YgYSBDU1MgdmFyaWFibGUgY29udGFpbmluZyB0aGUgYW1vdW50IG9mIFwiaGlkZGVuXCIgc2Nyb2xsYmFyXG4gKiAhIG1pZ2h0IGJlIHVuZGVmaW5lZCAhIHVzZSB3aWxsIGZhbGxiYWNrIVxuICovXG5leHBvcnQgdmFyIHJlbW92ZWRCYXJTaXplVmFyaWFibGUgPSAnLS1yZW1vdmVkLWJvZHktc2Nyb2xsLWJhci1zaXplJztcbiIsImltcG9ydCB7IFJlbW92ZVNjcm9sbEJhciB9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7IHplcm9SaWdodENsYXNzTmFtZSwgZnVsbFdpZHRoQ2xhc3NOYW1lLCBub1Njcm9sbGJhcnNDbGFzc05hbWUsIHJlbW92ZWRCYXJTaXplVmFyaWFibGUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRHYXBXaWR0aCB9IGZyb20gJy4vdXRpbHMnO1xuZXhwb3J0IHsgUmVtb3ZlU2Nyb2xsQmFyLCB6ZXJvUmlnaHRDbGFzc05hbWUsIGZ1bGxXaWR0aENsYXNzTmFtZSwgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlLCBnZXRHYXBXaWR0aCwgfTtcbiIsImV4cG9ydCB2YXIgemVyb0dhcCA9IHtcbiAgICBsZWZ0OiAwLFxuICAgIHRvcDogMCxcbiAgICByaWdodDogMCxcbiAgICBnYXA6IDAsXG59O1xudmFyIHBhcnNlID0gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHBhcnNlSW50KHggfHwgJycsIDEwKSB8fCAwOyB9O1xudmFyIGdldE9mZnNldCA9IGZ1bmN0aW9uIChnYXBNb2RlKSB7XG4gICAgdmFyIGNzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSk7XG4gICAgdmFyIGxlZnQgPSBjc1tnYXBNb2RlID09PSAncGFkZGluZycgPyAncGFkZGluZ0xlZnQnIDogJ21hcmdpbkxlZnQnXTtcbiAgICB2YXIgdG9wID0gY3NbZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnID8gJ3BhZGRpbmdUb3AnIDogJ21hcmdpblRvcCddO1xuICAgIHZhciByaWdodCA9IGNzW2dhcE1vZGUgPT09ICdwYWRkaW5nJyA/ICdwYWRkaW5nUmlnaHQnIDogJ21hcmdpblJpZ2h0J107XG4gICAgcmV0dXJuIFtwYXJzZShsZWZ0KSwgcGFyc2UodG9wKSwgcGFyc2UocmlnaHQpXTtcbn07XG5leHBvcnQgdmFyIGdldEdhcFdpZHRoID0gZnVuY3Rpb24gKGdhcE1vZGUpIHtcbiAgICBpZiAoZ2FwTW9kZSA9PT0gdm9pZCAwKSB7IGdhcE1vZGUgPSAnbWFyZ2luJzsgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gemVyb0dhcDtcbiAgICB9XG4gICAgdmFyIG9mZnNldHMgPSBnZXRPZmZzZXQoZ2FwTW9kZSk7XG4gICAgdmFyIGRvY3VtZW50V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgdmFyIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogb2Zmc2V0c1swXSxcbiAgICAgICAgdG9wOiBvZmZzZXRzWzFdLFxuICAgICAgICByaWdodDogb2Zmc2V0c1syXSxcbiAgICAgICAgZ2FwOiBNYXRoLm1heCgwLCB3aW5kb3dXaWR0aCAtIGRvY3VtZW50V2lkdGggKyBvZmZzZXRzWzJdIC0gb2Zmc2V0c1swXSksXG4gICAgfTtcbn07XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsIH0gZnJvbSAnLi9VSSc7XG5pbXBvcnQgU2lkZUNhciBmcm9tICcuL3NpZGVjYXInO1xudmFyIFJlYWN0UmVtb3ZlU2Nyb2xsID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHJlZikgeyByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVtb3ZlU2Nyb2xsLCBfX2Fzc2lnbih7fSwgcHJvcHMsIHsgcmVmOiByZWYsIHNpZGVDYXI6IFNpZGVDYXIgfSkpKTsgfSk7XG5SZWFjdFJlbW92ZVNjcm9sbC5jbGFzc05hbWVzID0gUmVtb3ZlU2Nyb2xsLmNsYXNzTmFtZXM7XG5leHBvcnQgZGVmYXVsdCBSZWFjdFJlbW92ZVNjcm9sbDtcbiIsImltcG9ydCB7IF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJlbW92ZVNjcm9sbEJhciB9IGZyb20gJ3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyJztcbmltcG9ydCB7IHN0eWxlU2luZ2xldG9uIH0gZnJvbSAncmVhY3Qtc3R5bGUtc2luZ2xldG9uJztcbmltcG9ydCB7IG5vblBhc3NpdmUgfSBmcm9tICcuL2FnZ3Jlc2l2ZUNhcHR1cmUnO1xuaW1wb3J0IHsgaGFuZGxlU2Nyb2xsLCBsb2NhdGlvbkNvdWxkQmVTY3JvbGxlZCB9IGZyb20gJy4vaGFuZGxlU2Nyb2xsJztcbmV4cG9ydCB2YXIgZ2V0VG91Y2hYWSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHJldHVybiAnY2hhbmdlZFRvdWNoZXMnIGluIGV2ZW50ID8gW2V2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFldIDogWzAsIDBdO1xufTtcbmV4cG9ydCB2YXIgZ2V0RGVsdGFYWSA9IGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gW2V2ZW50LmRlbHRhWCwgZXZlbnQuZGVsdGFZXTsgfTtcbnZhciBleHRyYWN0UmVmID0gZnVuY3Rpb24gKHJlZikge1xuICAgIHJldHVybiByZWYgJiYgJ2N1cnJlbnQnIGluIHJlZiA/IHJlZi5jdXJyZW50IDogcmVmO1xufTtcbnZhciBkZWx0YUNvbXBhcmUgPSBmdW5jdGlvbiAoeCwgeSkgeyByZXR1cm4geFswXSA9PT0geVswXSAmJiB4WzFdID09PSB5WzFdOyB9O1xudmFyIGdlbmVyYXRlU3R5bGUgPSBmdW5jdGlvbiAoaWQpIHsgcmV0dXJuIFwiXFxuICAuYmxvY2staW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQsIFwiIHtwb2ludGVyLWV2ZW50czogbm9uZTt9XFxuICAuYWxsb3ctaW50ZXJhY3Rpdml0eS1cIikuY29uY2F0KGlkLCBcIiB7cG9pbnRlci1ldmVudHM6IGFsbDt9XFxuXCIpOyB9O1xudmFyIGlkQ291bnRlciA9IDA7XG52YXIgbG9ja1N0YWNrID0gW107XG5leHBvcnQgZnVuY3Rpb24gUmVtb3ZlU2Nyb2xsU2lkZUNhcihwcm9wcykge1xuICAgIHZhciBzaG91bGRQcmV2ZW50UXVldWUgPSBSZWFjdC51c2VSZWYoW10pO1xuICAgIHZhciB0b3VjaFN0YXJ0UmVmID0gUmVhY3QudXNlUmVmKFswLCAwXSk7XG4gICAgdmFyIGFjdGl2ZUF4aXMgPSBSZWFjdC51c2VSZWYoKTtcbiAgICB2YXIgaWQgPSBSZWFjdC51c2VTdGF0ZShpZENvdW50ZXIrKylbMF07XG4gICAgdmFyIFN0eWxlID0gUmVhY3QudXNlU3RhdGUoc3R5bGVTaW5nbGV0b24pWzBdO1xuICAgIHZhciBsYXN0UHJvcHMgPSBSZWFjdC51c2VSZWYocHJvcHMpO1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxhc3RQcm9wcy5jdXJyZW50ID0gcHJvcHM7XG4gICAgfSwgW3Byb3BzXSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHByb3BzLmluZXJ0KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJibG9jay1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCkpO1xuICAgICAgICAgICAgdmFyIGFsbG93XzEgPSBfX3NwcmVhZEFycmF5KFtwcm9wcy5sb2NrUmVmLmN1cnJlbnRdLCAocHJvcHMuc2hhcmRzIHx8IFtdKS5tYXAoZXh0cmFjdFJlZiksIHRydWUpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgIGFsbG93XzEuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmNsYXNzTGlzdC5hZGQoXCJhbGxvdy1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCkpOyB9KTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiYmxvY2staW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTtcbiAgICAgICAgICAgICAgICBhbGxvd18xLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWxsb3ctaW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTsgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9LCBbcHJvcHMuaW5lcnQsIHByb3BzLmxvY2tSZWYuY3VycmVudCwgcHJvcHMuc2hhcmRzXSk7XG4gICAgdmFyIHNob3VsZENhbmNlbEV2ZW50ID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50LCBwYXJlbnQpIHtcbiAgICAgICAgaWYgKCgndG91Y2hlcycgaW4gZXZlbnQgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHx8IChldmVudC50eXBlID09PSAnd2hlZWwnICYmIGV2ZW50LmN0cmxLZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gIWxhc3RQcm9wcy5jdXJyZW50LmFsbG93UGluY2hab29tO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b3VjaCA9IGdldFRvdWNoWFkoZXZlbnQpO1xuICAgICAgICB2YXIgdG91Y2hTdGFydCA9IHRvdWNoU3RhcnRSZWYuY3VycmVudDtcbiAgICAgICAgdmFyIGRlbHRhWCA9ICdkZWx0YVgnIGluIGV2ZW50ID8gZXZlbnQuZGVsdGFYIDogdG91Y2hTdGFydFswXSAtIHRvdWNoWzBdO1xuICAgICAgICB2YXIgZGVsdGFZID0gJ2RlbHRhWScgaW4gZXZlbnQgPyBldmVudC5kZWx0YVkgOiB0b3VjaFN0YXJ0WzFdIC0gdG91Y2hbMV07XG4gICAgICAgIHZhciBjdXJyZW50QXhpcztcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdmFyIG1vdmVEaXJlY3Rpb24gPSBNYXRoLmFicyhkZWx0YVgpID4gTWF0aC5hYnMoZGVsdGFZKSA/ICdoJyA6ICd2JztcbiAgICAgICAgLy8gYWxsb3cgaG9yaXpvbnRhbCB0b3VjaCBtb3ZlIG9uIFJhbmdlIGlucHV0cy4gVGhleSB3aWxsIG5vdCBjYXVzZSBhbnkgc2Nyb2xsXG4gICAgICAgIGlmICgndG91Y2hlcycgaW4gZXZlbnQgJiYgbW92ZURpcmVjdGlvbiA9PT0gJ2gnICYmIHRhcmdldC50eXBlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWxsb3cgZHJhZyBzZWxlY3Rpb24gKGlPUyk7IGNoZWNrIGlmIHNlbGVjdGlvbidzIGFuY2hvck5vZGUgaXMgdGhlIHNhbWUgYXMgdGFyZ2V0IG9yIGNvbnRhaW5zIHRhcmdldFxuICAgICAgICB2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgYW5jaG9yTm9kZSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uYW5jaG9yTm9kZTtcbiAgICAgICAgdmFyIGlzVG91Y2hpbmdTZWxlY3Rpb24gPSBhbmNob3JOb2RlID8gYW5jaG9yTm9kZSA9PT0gdGFyZ2V0IHx8IGFuY2hvck5vZGUuY29udGFpbnModGFyZ2V0KSA6IGZhbHNlO1xuICAgICAgICBpZiAoaXNUb3VjaGluZ1NlbGVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uID0gbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQobW92ZURpcmVjdGlvbiwgdGFyZ2V0KTtcbiAgICAgICAgaWYgKCFjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbikge1xuICAgICAgICAgICAgY3VycmVudEF4aXMgPSBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudEF4aXMgPSBtb3ZlRGlyZWN0aW9uID09PSAndicgPyAnaCcgOiAndic7XG4gICAgICAgICAgICBjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uID0gbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQobW92ZURpcmVjdGlvbiwgdGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIG90aGVyIGF4aXMgbWlnaHQgYmUgbm90IHNjcm9sbGFibGVcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFjdGl2ZUF4aXMuY3VycmVudCAmJiAnY2hhbmdlZFRvdWNoZXMnIGluIGV2ZW50ICYmIChkZWx0YVggfHwgZGVsdGFZKSkge1xuICAgICAgICAgICAgYWN0aXZlQXhpcy5jdXJyZW50ID0gY3VycmVudEF4aXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50QXhpcykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbmNlbGluZ0F4aXMgPSBhY3RpdmVBeGlzLmN1cnJlbnQgfHwgY3VycmVudEF4aXM7XG4gICAgICAgIHJldHVybiBoYW5kbGVTY3JvbGwoY2FuY2VsaW5nQXhpcywgcGFyZW50LCBldmVudCwgY2FuY2VsaW5nQXhpcyA9PT0gJ2gnID8gZGVsdGFYIDogZGVsdGFZLCB0cnVlKTtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHNob3VsZFByZXZlbnQgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoX2V2ZW50KSB7XG4gICAgICAgIHZhciBldmVudCA9IF9ldmVudDtcbiAgICAgICAgaWYgKCFsb2NrU3RhY2subGVuZ3RoIHx8IGxvY2tTdGFja1tsb2NrU3RhY2subGVuZ3RoIC0gMV0gIT09IFN0eWxlKSB7XG4gICAgICAgICAgICAvLyBub3QgdGhlIGxhc3QgYWN0aXZlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbHRhID0gJ2RlbHRhWScgaW4gZXZlbnQgPyBnZXREZWx0YVhZKGV2ZW50KSA6IGdldFRvdWNoWFkoZXZlbnQpO1xuICAgICAgICB2YXIgc291cmNlRXZlbnQgPSBzaG91bGRQcmV2ZW50UXVldWUuY3VycmVudC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gZXZlbnQudHlwZSAmJiAoZS50YXJnZXQgPT09IGV2ZW50LnRhcmdldCB8fCBldmVudC50YXJnZXQgPT09IGUuc2hhZG93UGFyZW50KSAmJiBkZWx0YUNvbXBhcmUoZS5kZWx0YSwgZGVsdGEpOyB9KVswXTtcbiAgICAgICAgLy8gc2VsZiBldmVudCwgYW5kIHNob3VsZCBiZSBjYW5jZWxlZFxuICAgICAgICBpZiAoc291cmNlRXZlbnQgJiYgc291cmNlRXZlbnQuc2hvdWxkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gb3V0c2lkZSBvciBzaGFyZCBldmVudFxuICAgICAgICBpZiAoIXNvdXJjZUV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgc2hhcmROb2RlcyA9IChsYXN0UHJvcHMuY3VycmVudC5zaGFyZHMgfHwgW10pXG4gICAgICAgICAgICAgICAgLm1hcChleHRyYWN0UmVmKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBub2RlLmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7IH0pO1xuICAgICAgICAgICAgdmFyIHNob3VsZFN0b3AgPSBzaGFyZE5vZGVzLmxlbmd0aCA+IDAgPyBzaG91bGRDYW5jZWxFdmVudChldmVudCwgc2hhcmROb2Rlc1swXSkgOiAhbGFzdFByb3BzLmN1cnJlbnQubm9Jc29sYXRpb247XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RvcCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW10pO1xuICAgIHZhciBzaG91bGRDYW5jZWwgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAobmFtZSwgZGVsdGEsIHRhcmdldCwgc2hvdWxkKSB7XG4gICAgICAgIHZhciBldmVudCA9IHsgbmFtZTogbmFtZSwgZGVsdGE6IGRlbHRhLCB0YXJnZXQ6IHRhcmdldCwgc2hvdWxkOiBzaG91bGQsIHNoYWRvd1BhcmVudDogZ2V0T3V0ZXJtb3N0U2hhZG93UGFyZW50KHRhcmdldCkgfTtcbiAgICAgICAgc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQucHVzaChldmVudCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQgPSBzaG91bGRQcmV2ZW50UXVldWUuY3VycmVudC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgIT09IGV2ZW50OyB9KTtcbiAgICAgICAgfSwgMSk7XG4gICAgfSwgW10pO1xuICAgIHZhciBzY3JvbGxUb3VjaFN0YXJ0ID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRvdWNoU3RhcnRSZWYuY3VycmVudCA9IGdldFRvdWNoWFkoZXZlbnQpO1xuICAgICAgICBhY3RpdmVBeGlzLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgfSwgW10pO1xuICAgIHZhciBzY3JvbGxXaGVlbCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzaG91bGRDYW5jZWwoZXZlbnQudHlwZSwgZ2V0RGVsdGFYWShldmVudCksIGV2ZW50LnRhcmdldCwgc2hvdWxkQ2FuY2VsRXZlbnQoZXZlbnQsIHByb3BzLmxvY2tSZWYuY3VycmVudCkpO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2Nyb2xsVG91Y2hNb3ZlID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNob3VsZENhbmNlbChldmVudC50eXBlLCBnZXRUb3VjaFhZKGV2ZW50KSwgZXZlbnQudGFyZ2V0LCBzaG91bGRDYW5jZWxFdmVudChldmVudCwgcHJvcHMubG9ja1JlZi5jdXJyZW50KSk7XG4gICAgfSwgW10pO1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvY2tTdGFjay5wdXNoKFN0eWxlKTtcbiAgICAgICAgcHJvcHMuc2V0Q2FsbGJhY2tzKHtcbiAgICAgICAgICAgIG9uU2Nyb2xsQ2FwdHVyZTogc2Nyb2xsV2hlZWwsXG4gICAgICAgICAgICBvbldoZWVsQ2FwdHVyZTogc2Nyb2xsV2hlZWwsXG4gICAgICAgICAgICBvblRvdWNoTW92ZUNhcHR1cmU6IHNjcm9sbFRvdWNoTW92ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgc2hvdWxkUHJldmVudCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2Nyb2xsVG91Y2hTdGFydCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsb2NrU3RhY2sgPSBsb2NrU3RhY2suZmlsdGVyKGZ1bmN0aW9uIChpbnN0KSB7IHJldHVybiBpbnN0ICE9PSBTdHlsZTsgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2hvdWxkUHJldmVudCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2Nyb2xsVG91Y2hTdGFydCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIH07XG4gICAgfSwgW10pO1xuICAgIHZhciByZW1vdmVTY3JvbGxCYXIgPSBwcm9wcy5yZW1vdmVTY3JvbGxCYXIsIGluZXJ0ID0gcHJvcHMuaW5lcnQ7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICBpbmVydCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3R5bGUsIHsgc3R5bGVzOiBnZW5lcmF0ZVN0eWxlKGlkKSB9KSA6IG51bGwsXG4gICAgICAgIHJlbW92ZVNjcm9sbEJhciA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVtb3ZlU2Nyb2xsQmFyLCB7IG5vUmVsYXRpdmU6IHByb3BzLm5vUmVsYXRpdmUsIGdhcE1vZGU6IHByb3BzLmdhcE1vZGUgfSkgOiBudWxsKSk7XG59XG5mdW5jdGlvbiBnZXRPdXRlcm1vc3RTaGFkb3dQYXJlbnQobm9kZSkge1xuICAgIHZhciBzaGFkb3dQYXJlbnQgPSBudWxsO1xuICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgICAgICAgICAgc2hhZG93UGFyZW50ID0gbm9kZS5ob3N0O1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gc2hhZG93UGFyZW50O1xufVxuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fcmVzdCB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZnVsbFdpZHRoQ2xhc3NOYW1lLCB6ZXJvUmlnaHRDbGFzc05hbWUgfSBmcm9tICdyZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9jb25zdGFudHMnO1xuaW1wb3J0IHsgdXNlTWVyZ2VSZWZzIH0gZnJvbSAndXNlLWNhbGxiYWNrLXJlZic7XG5pbXBvcnQgeyBlZmZlY3RDYXIgfSBmcm9tICcuL21lZGl1bSc7XG52YXIgbm90aGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm47XG59O1xuLyoqXG4gKiBSZW1vdmVzIHNjcm9sbGJhciBmcm9tIHRoZSBwYWdlIGFuZCBjb250YWluIHRoZSBzY3JvbGwgd2l0aGluIHRoZSBMb2NrXG4gKi9cbnZhciBSZW1vdmVTY3JvbGwgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcGFyZW50UmVmKSB7XG4gICAgdmFyIHJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICB2YXIgX2EgPSBSZWFjdC51c2VTdGF0ZSh7XG4gICAgICAgIG9uU2Nyb2xsQ2FwdHVyZTogbm90aGluZyxcbiAgICAgICAgb25XaGVlbENhcHR1cmU6IG5vdGhpbmcsXG4gICAgICAgIG9uVG91Y2hNb3ZlQ2FwdHVyZTogbm90aGluZyxcbiAgICB9KSwgY2FsbGJhY2tzID0gX2FbMF0sIHNldENhbGxiYWNrcyA9IF9hWzFdO1xuICAgIHZhciBmb3J3YXJkUHJvcHMgPSBwcm9wcy5mb3J3YXJkUHJvcHMsIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSwgcmVtb3ZlU2Nyb2xsQmFyID0gcHJvcHMucmVtb3ZlU2Nyb2xsQmFyLCBlbmFibGVkID0gcHJvcHMuZW5hYmxlZCwgc2hhcmRzID0gcHJvcHMuc2hhcmRzLCBzaWRlQ2FyID0gcHJvcHMuc2lkZUNhciwgbm9SZWxhdGl2ZSA9IHByb3BzLm5vUmVsYXRpdmUsIG5vSXNvbGF0aW9uID0gcHJvcHMubm9Jc29sYXRpb24sIGluZXJ0ID0gcHJvcHMuaW5lcnQsIGFsbG93UGluY2hab29tID0gcHJvcHMuYWxsb3dQaW5jaFpvb20sIF9iID0gcHJvcHMuYXMsIENvbnRhaW5lciA9IF9iID09PSB2b2lkIDAgPyAnZGl2JyA6IF9iLCBnYXBNb2RlID0gcHJvcHMuZ2FwTW9kZSwgcmVzdCA9IF9fcmVzdChwcm9wcywgW1wiZm9yd2FyZFByb3BzXCIsIFwiY2hpbGRyZW5cIiwgXCJjbGFzc05hbWVcIiwgXCJyZW1vdmVTY3JvbGxCYXJcIiwgXCJlbmFibGVkXCIsIFwic2hhcmRzXCIsIFwic2lkZUNhclwiLCBcIm5vUmVsYXRpdmVcIiwgXCJub0lzb2xhdGlvblwiLCBcImluZXJ0XCIsIFwiYWxsb3dQaW5jaFpvb21cIiwgXCJhc1wiLCBcImdhcE1vZGVcIl0pO1xuICAgIHZhciBTaWRlQ2FyID0gc2lkZUNhcjtcbiAgICB2YXIgY29udGFpbmVyUmVmID0gdXNlTWVyZ2VSZWZzKFtyZWYsIHBhcmVudFJlZl0pO1xuICAgIHZhciBjb250YWluZXJQcm9wcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXN0KSwgY2FsbGJhY2tzKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIGVuYWJsZWQgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZUNhciwgeyBzaWRlQ2FyOiBlZmZlY3RDYXIsIHJlbW92ZVNjcm9sbEJhcjogcmVtb3ZlU2Nyb2xsQmFyLCBzaGFyZHM6IHNoYXJkcywgbm9SZWxhdGl2ZTogbm9SZWxhdGl2ZSwgbm9Jc29sYXRpb246IG5vSXNvbGF0aW9uLCBpbmVydDogaW5lcnQsIHNldENhbGxiYWNrczogc2V0Q2FsbGJhY2tzLCBhbGxvd1BpbmNoWm9vbTogISFhbGxvd1BpbmNoWm9vbSwgbG9ja1JlZjogcmVmLCBnYXBNb2RlOiBnYXBNb2RlIH0pKSxcbiAgICAgICAgZm9yd2FyZFByb3BzID8gKFJlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKSwgX19hc3NpZ24oX19hc3NpZ24oe30sIGNvbnRhaW5lclByb3BzKSwgeyByZWY6IGNvbnRhaW5lclJlZiB9KSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGFpbmVyLCBfX2Fzc2lnbih7fSwgY29udGFpbmVyUHJvcHMsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIHJlZjogY29udGFpbmVyUmVmIH0pLCBjaGlsZHJlbikpKSk7XG59KTtcblJlbW92ZVNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICByZW1vdmVTY3JvbGxCYXI6IHRydWUsXG4gICAgaW5lcnQ6IGZhbHNlLFxufTtcblJlbW92ZVNjcm9sbC5jbGFzc05hbWVzID0ge1xuICAgIGZ1bGxXaWR0aDogZnVsbFdpZHRoQ2xhc3NOYW1lLFxuICAgIHplcm9SaWdodDogemVyb1JpZ2h0Q2xhc3NOYW1lLFxufTtcbmV4cG9ydCB7IFJlbW92ZVNjcm9sbCB9O1xuIiwidmFyIHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBhc3NpdmVTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgdmFyIG5vblBhc3NpdmUgPSBwYXNzaXZlU3VwcG9ydGVkID8geyBwYXNzaXZlOiBmYWxzZSB9IDogZmFsc2U7XG4iLCJ2YXIgYWx3YXlzQ29udGFpbnNTY3JvbGwgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIC8vIHRleHRhcmVhIHdpbGwgYWx3YXlzIF9jb250YWluXyBzY3JvbGwgaW5zaWRlIHNlbGYuIEl0IG9ubHkgY2FuIGJlIGhpZGRlblxuICAgIHJldHVybiBub2RlLnRhZ05hbWUgPT09ICdURVhUQVJFQSc7XG59O1xudmFyIGVsZW1lbnRDYW5CZVNjcm9sbGVkID0gZnVuY3Rpb24gKG5vZGUsIG92ZXJmbG93KSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIHJldHVybiAoXG4gICAgLy8gbm90LW5vdC1zY3JvbGxhYmxlXG4gICAgc3R5bGVzW292ZXJmbG93XSAhPT0gJ2hpZGRlbicgJiZcbiAgICAgICAgLy8gY29udGFpbnMgc2Nyb2xsIGluc2lkZSBzZWxmXG4gICAgICAgICEoc3R5bGVzLm92ZXJmbG93WSA9PT0gc3R5bGVzLm92ZXJmbG93WCAmJiAhYWx3YXlzQ29udGFpbnNTY3JvbGwobm9kZSkgJiYgc3R5bGVzW292ZXJmbG93XSA9PT0gJ3Zpc2libGUnKSk7XG59O1xudmFyIGVsZW1lbnRDb3VsZEJlVlNjcm9sbGVkID0gZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIGVsZW1lbnRDYW5CZVNjcm9sbGVkKG5vZGUsICdvdmVyZmxvd1knKTsgfTtcbnZhciBlbGVtZW50Q291bGRCZUhTY3JvbGxlZCA9IGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBlbGVtZW50Q2FuQmVTY3JvbGxlZChub2RlLCAnb3ZlcmZsb3dYJyk7IH07XG5leHBvcnQgdmFyIGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkID0gZnVuY3Rpb24gKGF4aXMsIG5vZGUpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICB2YXIgY3VycmVudCA9IG5vZGU7XG4gICAgZG8ge1xuICAgICAgICAvLyBTa2lwIG92ZXIgc2hhZG93IHJvb3RcbiAgICAgICAgaWYgKHR5cGVvZiBTaGFkb3dSb290ICE9PSAndW5kZWZpbmVkJyAmJiBjdXJyZW50IGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNTY3JvbGxhYmxlID0gZWxlbWVudENvdWxkQmVTY3JvbGxlZChheGlzLCBjdXJyZW50KTtcbiAgICAgICAgaWYgKGlzU2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgdmFyIF9hID0gZ2V0U2Nyb2xsVmFyaWFibGVzKGF4aXMsIGN1cnJlbnQpLCBzY3JvbGxIZWlnaHQgPSBfYVsxXSwgY2xpZW50SGVpZ2h0ID0gX2FbMl07XG4gICAgICAgICAgICBpZiAoc2Nyb2xsSGVpZ2h0ID4gY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgICB9IHdoaWxlIChjdXJyZW50ICYmIGN1cnJlbnQgIT09IG93bmVyRG9jdW1lbnQuYm9keSk7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbnZhciBnZXRWU2Nyb2xsVmFyaWFibGVzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IF9hLnNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0ID0gX2Euc2Nyb2xsSGVpZ2h0LCBjbGllbnRIZWlnaHQgPSBfYS5jbGllbnRIZWlnaHQ7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgc2Nyb2xsVG9wLFxuICAgICAgICBzY3JvbGxIZWlnaHQsXG4gICAgICAgIGNsaWVudEhlaWdodCxcbiAgICBdO1xufTtcbnZhciBnZXRIU2Nyb2xsVmFyaWFibGVzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHNjcm9sbExlZnQgPSBfYS5zY3JvbGxMZWZ0LCBzY3JvbGxXaWR0aCA9IF9hLnNjcm9sbFdpZHRoLCBjbGllbnRXaWR0aCA9IF9hLmNsaWVudFdpZHRoO1xuICAgIHJldHVybiBbXG4gICAgICAgIHNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFdpZHRoLFxuICAgICAgICBjbGllbnRXaWR0aCxcbiAgICBdO1xufTtcbnZhciBlbGVtZW50Q291bGRCZVNjcm9sbGVkID0gZnVuY3Rpb24gKGF4aXMsIG5vZGUpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gJ3YnID8gZWxlbWVudENvdWxkQmVWU2Nyb2xsZWQobm9kZSkgOiBlbGVtZW50Q291bGRCZUhTY3JvbGxlZChub2RlKTtcbn07XG52YXIgZ2V0U2Nyb2xsVmFyaWFibGVzID0gZnVuY3Rpb24gKGF4aXMsIG5vZGUpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gJ3YnID8gZ2V0VlNjcm9sbFZhcmlhYmxlcyhub2RlKSA6IGdldEhTY3JvbGxWYXJpYWJsZXMobm9kZSk7XG59O1xudmFyIGdldERpcmVjdGlvbkZhY3RvciA9IGZ1bmN0aW9uIChheGlzLCBkaXJlY3Rpb24pIHtcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgZWxlbWVudCdzIGRpcmVjdGlvbiBpcyBydGwgKHJpZ2h0LXRvLWxlZnQpLCB0aGVuIHNjcm9sbExlZnQgaXMgMCB3aGVuIHRoZSBzY3JvbGxiYXIgaXMgYXQgaXRzIHJpZ2h0bW9zdCBwb3NpdGlvbixcbiAgICAgKiBhbmQgdGhlbiBpbmNyZWFzaW5nbHkgbmVnYXRpdmUgYXMgeW91IHNjcm9sbCB0b3dhcmRzIHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQuXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9zY3JvbGxMZWZ0XG4gICAgICovXG4gICAgcmV0dXJuIGF4aXMgPT09ICdoJyAmJiBkaXJlY3Rpb24gPT09ICdydGwnID8gLTEgOiAxO1xufTtcbmV4cG9ydCB2YXIgaGFuZGxlU2Nyb2xsID0gZnVuY3Rpb24gKGF4aXMsIGVuZFRhcmdldCwgZXZlbnQsIHNvdXJjZURlbHRhLCBub092ZXJzY3JvbGwpIHtcbiAgICB2YXIgZGlyZWN0aW9uRmFjdG9yID0gZ2V0RGlyZWN0aW9uRmFjdG9yKGF4aXMsIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVuZFRhcmdldCkuZGlyZWN0aW9uKTtcbiAgICB2YXIgZGVsdGEgPSBkaXJlY3Rpb25GYWN0b3IgKiBzb3VyY2VEZWx0YTtcbiAgICAvLyBmaW5kIHNjcm9sbGFibGUgdGFyZ2V0XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICB2YXIgdGFyZ2V0SW5Mb2NrID0gZW5kVGFyZ2V0LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgdmFyIHNob3VsZENhbmNlbFNjcm9sbCA9IGZhbHNlO1xuICAgIHZhciBpc0RlbHRhUG9zaXRpdmUgPSBkZWx0YSA+IDA7XG4gICAgdmFyIGF2YWlsYWJsZVNjcm9sbCA9IDA7XG4gICAgdmFyIGF2YWlsYWJsZVNjcm9sbFRvcCA9IDA7XG4gICAgZG8ge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gZ2V0U2Nyb2xsVmFyaWFibGVzKGF4aXMsIHRhcmdldCksIHBvc2l0aW9uID0gX2FbMF0sIHNjcm9sbF8xID0gX2FbMV0sIGNhcGFjaXR5ID0gX2FbMl07XG4gICAgICAgIHZhciBlbGVtZW50U2Nyb2xsID0gc2Nyb2xsXzEgLSBjYXBhY2l0eSAtIGRpcmVjdGlvbkZhY3RvciAqIHBvc2l0aW9uO1xuICAgICAgICBpZiAocG9zaXRpb24gfHwgZWxlbWVudFNjcm9sbCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRDb3VsZEJlU2Nyb2xsZWQoYXhpcywgdGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVNjcm9sbCArPSBlbGVtZW50U2Nyb2xsO1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVNjcm9sbFRvcCArPSBwb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFyZW50XzEgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgLy8gd2Ugd2lsbCBcImJ1YmJsZVwiIGZyb20gU2hhZG93RG9tIGluIGNhc2Ugd2UgYXJlLCBvciBqdXN0IHRvIHRoZSBwYXJlbnQgaW4gbm9ybWFsIGNhc2VcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBsb2dpYyB1c2VkIGluIGZvY3VzLWxvY2tcbiAgICAgICAgdGFyZ2V0ID0gKHBhcmVudF8xICYmIHBhcmVudF8xLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUgPyBwYXJlbnRfMS5ob3N0IDogcGFyZW50XzEpO1xuICAgIH0gd2hpbGUgKFxuICAgIC8vIHBvcnRhbGVkIGNvbnRlbnRcbiAgICAoIXRhcmdldEluTG9jayAmJiB0YXJnZXQgIT09IGRvY3VtZW50LmJvZHkpIHx8XG4gICAgICAgIC8vIHNlbGYgY29udGVudFxuICAgICAgICAodGFyZ2V0SW5Mb2NrICYmIChlbmRUYXJnZXQuY29udGFpbnModGFyZ2V0KSB8fCBlbmRUYXJnZXQgPT09IHRhcmdldCkpKTtcbiAgICAvLyBoYW5kbGUgZXBzaWxvbiBhcm91bmQgMCAobm9uIHN0YW5kYXJkIHpvb20gbGV2ZWxzKVxuICAgIGlmIChpc0RlbHRhUG9zaXRpdmUgJiZcbiAgICAgICAgKChub092ZXJzY3JvbGwgJiYgTWF0aC5hYnMoYXZhaWxhYmxlU2Nyb2xsKSA8IDEpIHx8ICghbm9PdmVyc2Nyb2xsICYmIGRlbHRhID4gYXZhaWxhYmxlU2Nyb2xsKSkpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsU2Nyb2xsID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWlzRGVsdGFQb3NpdGl2ZSAmJlxuICAgICAgICAoKG5vT3ZlcnNjcm9sbCAmJiBNYXRoLmFicyhhdmFpbGFibGVTY3JvbGxUb3ApIDwgMSkgfHwgKCFub092ZXJzY3JvbGwgJiYgLWRlbHRhID4gYXZhaWxhYmxlU2Nyb2xsVG9wKSkpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsU2Nyb2xsID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3VsZENhbmNlbFNjcm9sbDtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVTaWRlY2FyTWVkaXVtIH0gZnJvbSAndXNlLXNpZGVjYXInO1xuZXhwb3J0IHZhciBlZmZlY3RDYXIgPSBjcmVhdGVTaWRlY2FyTWVkaXVtKCk7XG4iLCJpbXBvcnQgeyBleHBvcnRTaWRlY2FyIH0gZnJvbSAndXNlLXNpZGVjYXInO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsU2lkZUNhciB9IGZyb20gJy4vU2lkZUVmZmVjdCc7XG5pbXBvcnQgeyBlZmZlY3RDYXIgfSBmcm9tICcuL21lZGl1bSc7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRTaWRlY2FyKGVmZmVjdENhciwgUmVtb3ZlU2Nyb2xsU2lkZUNhcik7XG4iLCJpbXBvcnQgeyBzdHlsZUhvb2tTaW5nbGV0b24gfSBmcm9tICcuL2hvb2snO1xuLyoqXG4gKiBjcmVhdGUgYSBDb21wb25lbnQgdG8gYWRkIHN0eWxlcyBvbiBkZW1hbmRcbiAqIC0gc3R5bGVzIGFyZSBhZGRlZCB3aGVuIGZpcnN0IGluc3RhbmNlIGlzIG1vdW50ZWRcbiAqIC0gc3R5bGVzIGFyZSByZW1vdmVkIHdoZW4gdGhlIGxhc3QgaW5zdGFuY2UgaXMgdW5tb3VudGVkXG4gKiAtIGNoYW5naW5nIHN0eWxlcyBpbiBydW50aW1lIGRvZXMgbm90aGluZyB1bmxlc3MgZHluYW1pYyBpcyBzZXQuIEJ1dCB3aXRoIG11bHRpcGxlIGNvbXBvbmVudHMgdGhhdCBjYW4gbGVhZCB0byB0aGUgdW5kZWZpbmVkIGJlaGF2aW9yXG4gKi9cbmV4cG9ydCB2YXIgc3R5bGVTaW5nbGV0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHVzZVN0eWxlID0gc3R5bGVIb29rU2luZ2xldG9uKCk7XG4gICAgdmFyIFNoZWV0ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBzdHlsZXMgPSBfYS5zdHlsZXMsIGR5bmFtaWMgPSBfYS5keW5hbWljO1xuICAgICAgICB1c2VTdHlsZShzdHlsZXMsIGR5bmFtaWMpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBTaGVldDtcbn07XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHlsZXNoZWV0U2luZ2xldG9uIH0gZnJvbSAnLi9zaW5nbGV0b24nO1xuLyoqXG4gKiBjcmVhdGVzIGEgaG9vayB0byBjb250cm9sIHN0eWxlIHNpbmdsZXRvblxuICogQHNlZSB7QGxpbmsgc3R5bGVTaW5nbGV0b259IGZvciBhIHNhZmVyIGNvbXBvbmVudCB2ZXJzaW9uXG4gKiBAZXhhbXBsZVxuICogYGBgdHN4XG4gKiBjb25zdCB1c2VTdHlsZSA9IHN0eWxlSG9va1NpbmdsZXRvbigpO1xuICogLy8vXG4gKiB1c2VTdHlsZSgnYm9keSB7IG92ZXJmbG93OiBoaWRkZW59Jyk7XG4gKi9cbmV4cG9ydCB2YXIgc3R5bGVIb29rU2luZ2xldG9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzaGVldCA9IHN0eWxlc2hlZXRTaW5nbGV0b24oKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHN0eWxlcywgaXNEeW5hbWljKSB7XG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzaGVldC5hZGQoc3R5bGVzKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2hlZXQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LCBbc3R5bGVzICYmIGlzRHluYW1pY10pO1xuICAgIH07XG59O1xuIiwiZXhwb3J0IHsgc3R5bGVTaW5nbGV0b24gfSBmcm9tICcuL2NvbXBvbmVudCc7XG5leHBvcnQgeyBzdHlsZXNoZWV0U2luZ2xldG9uIH0gZnJvbSAnLi9zaW5nbGV0b24nO1xuZXhwb3J0IHsgc3R5bGVIb29rU2luZ2xldG9uIH0gZnJvbSAnLi9ob29rJztcbiIsImltcG9ydCB7IGdldE5vbmNlIH0gZnJvbSAnZ2V0LW5vbmNlJztcbmZ1bmN0aW9uIG1ha2VTdHlsZVRhZygpIHtcbiAgICBpZiAoIWRvY3VtZW50KVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB2YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0YWcudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgdmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcbiAgICBpZiAobm9uY2UpIHtcbiAgICAgICAgdGFnLnNldEF0dHJpYnV0ZSgnbm9uY2UnLCBub25jZSk7XG4gICAgfVxuICAgIHJldHVybiB0YWc7XG59XG5mdW5jdGlvbiBpbmplY3RTdHlsZXModGFnLCBjc3MpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKHRhZy5zdHlsZVNoZWV0KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGFnLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbnNlcnRTdHlsZVRhZyh0YWcpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHRhZyk7XG59XG5leHBvcnQgdmFyIHN0eWxlc2hlZXRTaW5nbGV0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHZhciBzdHlsZXNoZWV0ID0gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICgoc3R5bGVzaGVldCA9IG1ha2VTdHlsZVRhZygpKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmplY3RTdHlsZXMoc3R5bGVzaGVldCwgc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRTdHlsZVRhZyhzdHlsZXNoZWV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY291bnRlci0tO1xuICAgICAgICAgICAgaWYgKCFjb3VudGVyICYmIHN0eWxlc2hlZXQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0LnBhcmVudE5vZGUgJiYgc3R5bGVzaGVldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlc2hlZXQpO1xuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59O1xuIiwiLyoqXG4gKiBBc3NpZ25zIGEgdmFsdWUgZm9yIGEgZ2l2ZW4gcmVmLCBubyBtYXR0ZXIgb2YgdGhlIHJlZiBmb3JtYXRcbiAqIEBwYXJhbSB7UmVmT2JqZWN0fSByZWYgLSBhIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIHJlZiBvYmplY3RcbiAqIEBwYXJhbSB2YWx1ZSAtIGEgbmV3IHZhbHVlXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjYXNzaWducmVmXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVmT2JqZWN0ID0gdXNlUmVmKCk7XG4gKiBjb25zdCByZWZGbiA9IChyZWYpID0+IHsuLi4ufVxuICpcbiAqIGFzc2lnblJlZihyZWZPYmplY3QsIFwicmVmVmFsdWVcIik7XG4gKiBhc3NpZ25SZWYocmVmRm4sIFwicmVmVmFsdWVcIik7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25SZWYocmVmLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlZih2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlZikge1xuICAgICAgICByZWYuY3VycmVudCA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVmO1xufVxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYXNzaWduUmVmIH0gZnJvbSAnLi9hc3NpZ25SZWYnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tICcuL3VzZVJlZic7XG52YXIgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gUmVhY3QudXNlTGF5b3V0RWZmZWN0IDogUmVhY3QudXNlRWZmZWN0O1xudmFyIGN1cnJlbnRWYWx1ZXMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBNZXJnZXMgdHdvIG9yIG1vcmUgcmVmcyB0b2dldGhlciBwcm92aWRpbmcgYSBzaW5nbGUgaW50ZXJmYWNlIHRvIHNldCB0aGVpciB2YWx1ZVxuICogQHBhcmFtIHtSZWZPYmplY3R8UmVmfSByZWZzXG4gKiBAcmV0dXJucyB7TXV0YWJsZVJlZk9iamVjdH0gLSBhIG5ldyByZWYsIHdoaWNoIHRyYW5zbGF0ZXMgYWxsIGNoYW5nZXMgdG8ge3JlZnN9XG4gKlxuICogQHNlZSB7QGxpbmsgbWVyZ2VSZWZzfSBhIHZlcnNpb24gd2l0aG91dCBidWl0LWluIG1lbW9pemF0aW9uXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvdXNlLWNhbGxiYWNrLXJlZiN1c2VtZXJnZXJlZnNcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBDb21wb25lbnQgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG4gKiAgIGNvbnN0IG93blJlZiA9IHVzZVJlZigpO1xuICogICBjb25zdCBkb21SZWYgPSB1c2VNZXJnZVJlZnMoW3JlZiwgb3duUmVmXSk7IC8vIPCfkYggbWVyZ2UgdG9nZXRoZXJcbiAqICAgcmV0dXJuIDxkaXYgcmVmPXtkb21SZWZ9Pi4uLjwvZGl2PlxuICogfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlTWVyZ2VSZWZzKHJlZnMsIGRlZmF1bHRWYWx1ZSkge1xuICAgIHZhciBjYWxsYmFja1JlZiA9IHVzZUNhbGxiYWNrUmVmKGRlZmF1bHRWYWx1ZSB8fCBudWxsLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHJlZnMuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7IHJldHVybiBhc3NpZ25SZWYocmVmLCBuZXdWYWx1ZSk7IH0pO1xuICAgIH0pO1xuICAgIC8vIGhhbmRsZSByZWZzIGNoYW5nZXMgLSBhZGRlZCBvciByZW1vdmVkXG4gICAgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IGN1cnJlbnRWYWx1ZXMuZ2V0KGNhbGxiYWNrUmVmKTtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcHJldlJlZnNfMSA9IG5ldyBTZXQob2xkVmFsdWUpO1xuICAgICAgICAgICAgdmFyIG5leHRSZWZzXzEgPSBuZXcgU2V0KHJlZnMpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRfMSA9IGNhbGxiYWNrUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICBwcmV2UmVmc18xLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgIGlmICghbmV4dFJlZnNfMS5oYXMocmVmKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25SZWYocmVmLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5leHRSZWZzXzEuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2UmVmc18xLmhhcyhyZWYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnblJlZihyZWYsIGN1cnJlbnRfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFZhbHVlcy5zZXQoY2FsbGJhY2tSZWYsIHJlZnMpO1xuICAgIH0sIFtyZWZzXSk7XG4gICAgcmV0dXJuIGNhbGxiYWNrUmVmO1xufVxuIiwiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG4vKipcbiAqIGNyZWF0ZXMgYSBNdXRhYmxlUmVmIHdpdGggcmVmIGNoYW5nZSBjYWxsYmFja1xuICogQHBhcmFtIGluaXRpYWxWYWx1ZSAtIGluaXRpYWwgcmVmIHZhbHVlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGEgY2FsbGJhY2sgdG8gcnVuIHdoZW4gdmFsdWUgY2hhbmdlc1xuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByZWYgPSB1c2VDYWxsYmFja1JlZigwLCAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiBjb25zb2xlLmxvZyhvbGRWYWx1ZSwgJy0+JywgbmV3VmFsdWUpO1xuICogcmVmLmN1cnJlbnQgPSAxO1xuICogLy8gcHJpbnRzIDAgLT4gMVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL2hvb2tzLXJlZmVyZW5jZS5odG1sI3VzZXJlZlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjdXNlY2FsbGJhY2tyZWYtLS10by1yZXBsYWNlLXJlYWN0dXNlcmVmXG4gKiBAcmV0dXJucyB7TXV0YWJsZVJlZk9iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhbGxiYWNrUmVmKGluaXRpYWxWYWx1ZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVmID0gdXNlU3RhdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gKHtcbiAgICAgICAgLy8gdmFsdWVcbiAgICAgICAgdmFsdWU6IGluaXRpYWxWYWx1ZSxcbiAgICAgICAgLy8gbGFzdCBjYWxsYmFja1xuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgIC8vIFwibWVtb2l6ZWRcIiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgICAgIGZhY2FkZToge1xuICAgICAgICAgICAgZ2V0IGN1cnJlbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZi52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgY3VycmVudCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0ID0gcmVmLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZWYudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVmLmNhbGxiYWNrKHZhbHVlLCBsYXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0pOyB9KVswXTtcbiAgICAvLyB1cGRhdGUgY2FsbGJhY2tcbiAgICByZWYuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICByZXR1cm4gcmVmLmZhY2FkZTtcbn1cbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX3Jlc3QgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbnZhciBTaWRlQ2FyID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHNpZGVDYXIgPSBfYS5zaWRlQ2FyLCByZXN0ID0gX19yZXN0KF9hLCBbXCJzaWRlQ2FyXCJdKTtcbiAgICBpZiAoIXNpZGVDYXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWRlY2FyOiBwbGVhc2UgcHJvdmlkZSBgc2lkZUNhcmAgcHJvcGVydHkgdG8gaW1wb3J0IHRoZSByaWdodCBjYXInKTtcbiAgICB9XG4gICAgdmFyIFRhcmdldCA9IHNpZGVDYXIucmVhZCgpO1xuICAgIGlmICghVGFyZ2V0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2lkZWNhciBtZWRpdW0gbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRhcmdldCwgX19hc3NpZ24oe30sIHJlc3QpKTtcbn07XG5TaWRlQ2FyLmlzU2lkZUNhckV4cG9ydCA9IHRydWU7XG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0U2lkZWNhcihtZWRpdW0sIGV4cG9ydGVkKSB7XG4gICAgbWVkaXVtLnVzZU1lZGl1bShleHBvcnRlZCk7XG4gICAgcmV0dXJuIFNpZGVDYXI7XG59XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuZnVuY3Rpb24gSXRvSShhKSB7XG4gICAgcmV0dXJuIGE7XG59XG5mdW5jdGlvbiBpbm5lckNyZWF0ZU1lZGl1bShkZWZhdWx0cywgbWlkZGxld2FyZSkge1xuICAgIGlmIChtaWRkbGV3YXJlID09PSB2b2lkIDApIHsgbWlkZGxld2FyZSA9IEl0b0k7IH1cbiAgICB2YXIgYnVmZmVyID0gW107XG4gICAgdmFyIGFzc2lnbmVkID0gZmFsc2U7XG4gICAgdmFyIG1lZGl1bSA9IHtcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGFzc2lnbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWRlY2FyOiBjb3VsZCBub3QgYHJlYWRgIGZyb20gYW4gYGFzc2lnbmVkYCBtZWRpdW0uIGByZWFkYCBjb3VsZCBiZSB1c2VkIG9ubHkgd2l0aCBgdXNlTWVkaXVtYC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcltidWZmZXIubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgICAgIH0sXG4gICAgICAgIHVzZU1lZGl1bTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gbWlkZGxld2FyZShkYXRhLCBhc3NpZ25lZCk7XG4gICAgICAgICAgICBidWZmZXIucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gYnVmZmVyLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geCAhPT0gaXRlbTsgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhc3NpZ25TeW5jTWVkaXVtOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIGFzc2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHdoaWxlIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNicyA9IGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBjYnMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWZmZXIgPSB7XG4gICAgICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIGNiKHgpOyB9LFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVmZmVyOyB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgYXNzaWduTWVkaXVtOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIGFzc2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBwZW5kaW5nUXVldWUgPSBbXTtcbiAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNicyA9IGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBjYnMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1F1ZXVlID0gYnVmZmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGV4ZWN1dGVRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2JzID0gcGVuZGluZ1F1ZXVlO1xuICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIGNicy5mb3JFYWNoKGNiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY3ljbGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGV4ZWN1dGVRdWV1ZSk7IH07XG4gICAgICAgICAgICBjeWNsZSgpO1xuICAgICAgICAgICAgYnVmZmVyID0ge1xuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZS5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICBjeWNsZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZSA9IHBlbmRpbmdRdWV1ZS5maWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBtZWRpdW07XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVkaXVtKGRlZmF1bHRzLCBtaWRkbGV3YXJlKSB7XG4gICAgaWYgKG1pZGRsZXdhcmUgPT09IHZvaWQgMCkgeyBtaWRkbGV3YXJlID0gSXRvSTsgfVxuICAgIHJldHVybiBpbm5lckNyZWF0ZU1lZGl1bShkZWZhdWx0cywgbWlkZGxld2FyZSk7XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNpZGVjYXJNZWRpdW0ob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIG1lZGl1bSA9IGlubmVyQ3JlYXRlTWVkaXVtKG51bGwpO1xuICAgIG1lZGl1bS5vcHRpb25zID0gX19hc3NpZ24oeyBhc3luYzogdHJ1ZSwgc3NyOiBmYWxzZSB9LCBvcHRpb25zKTtcbiAgICByZXR1cm4gbWVkaXVtO1xufVxuIiwiLy8gc3JjL3ByaW1pdGl2ZS50c3hcbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5mdW5jdGlvbiBjb21wb3NlRXZlbnRIYW5kbGVycyhvcmlnaW5hbEV2ZW50SGFuZGxlciwgb3VyRXZlbnRIYW5kbGVyLCB7IGNoZWNrRm9yRGVmYXVsdFByZXZlbnRlZCA9IHRydWUgfSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBoYW5kbGVFdmVudChldmVudCkge1xuICAgIG9yaWdpbmFsRXZlbnRIYW5kbGVyPy4oZXZlbnQpO1xuICAgIGlmIChjaGVja0ZvckRlZmF1bHRQcmV2ZW50ZWQgPT09IGZhbHNlIHx8ICFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm4gb3VyRXZlbnRIYW5kbGVyPy4oZXZlbnQpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIGdldE93bmVyV2luZG93KGVsZW1lbnQpIHtcbiAgaWYgKCFjYW5Vc2VET00pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWNjZXNzIHdpbmRvdyBvdXRzaWRlIG9mIHRoZSBET01cIik7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ/Lm93bmVyRG9jdW1lbnQ/LmRlZmF1bHRWaWV3ID8/IHdpbmRvdztcbn1cbmZ1bmN0aW9uIGdldE93bmVyRG9jdW1lbnQoZWxlbWVudCkge1xuICBpZiAoIWNhblVzZURPTSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhY2Nlc3MgZG9jdW1lbnQgb3V0c2lkZSBvZiB0aGUgRE9NXCIpO1xuICB9XG4gIHJldHVybiBlbGVtZW50Py5vd25lckRvY3VtZW50ID8/IGRvY3VtZW50O1xufVxuZnVuY3Rpb24gZ2V0QWN0aXZlRWxlbWVudChub2RlLCBhY3RpdmVEZXNjZW5kYW50ID0gZmFsc2UpIHtcbiAgY29uc3QgeyBhY3RpdmVFbGVtZW50IH0gPSBnZXRPd25lckRvY3VtZW50KG5vZGUpO1xuICBpZiAoIWFjdGl2ZUVsZW1lbnQ/Lm5vZGVOYW1lKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGlzRnJhbWUoYWN0aXZlRWxlbWVudCkgJiYgYWN0aXZlRWxlbWVudC5jb250ZW50RG9jdW1lbnQpIHtcbiAgICByZXR1cm4gZ2V0QWN0aXZlRWxlbWVudChhY3RpdmVFbGVtZW50LmNvbnRlbnREb2N1bWVudC5ib2R5LCBhY3RpdmVEZXNjZW5kYW50KTtcbiAgfVxuICBpZiAoYWN0aXZlRGVzY2VuZGFudCkge1xuICAgIGNvbnN0IGlkID0gYWN0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIik7XG4gICAgaWYgKGlkKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZ2V0T3duZXJEb2N1bWVudChhY3RpdmVFbGVtZW50KS5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFjdGl2ZUVsZW1lbnQ7XG59XG5mdW5jdGlvbiBpc0ZyYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZSA9PT0gXCJJRlJBTUVcIjtcbn1cbmV4cG9ydCB7XG4gIGNhblVzZURPTSxcbiAgY29tcG9zZUV2ZW50SGFuZGxlcnMsXG4gIGdldEFjdGl2ZUVsZW1lbnQsXG4gIGdldE93bmVyRG9jdW1lbnQsXG4gIGdldE93bmVyV2luZG93LFxuICBpc0ZyYW1lXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvY29udGV4dC9zcmMvY3JlYXRlLWNvbnRleHQudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gY3JlYXRlQ29udGV4dDIocm9vdENvbXBvbmVudE5hbWUsIGRlZmF1bHRDb250ZXh0KSB7XG4gIGNvbnN0IENvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KGRlZmF1bHRDb250ZXh0KTtcbiAgY29uc3QgUHJvdmlkZXIgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5jb250ZXh0IH0gPSBwcm9wcztcbiAgICBjb25zdCB2YWx1ZSA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gY29udGV4dCwgT2JqZWN0LnZhbHVlcyhjb250ZXh0KSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZSwgY2hpbGRyZW4gfSk7XG4gIH07XG4gIFByb3ZpZGVyLmRpc3BsYXlOYW1lID0gcm9vdENvbXBvbmVudE5hbWUgKyBcIlByb3ZpZGVyXCI7XG4gIGZ1bmN0aW9uIHVzZUNvbnRleHQyKGNvbnN1bWVyTmFtZSkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KENvbnRleHQpO1xuICAgIGlmIChjb250ZXh0KSByZXR1cm4gY29udGV4dDtcbiAgICBpZiAoZGVmYXVsdENvbnRleHQgIT09IHZvaWQgMCkgcmV0dXJuIGRlZmF1bHRDb250ZXh0O1xuICAgIHRocm93IG5ldyBFcnJvcihgXFxgJHtjb25zdW1lck5hbWV9XFxgIG11c3QgYmUgdXNlZCB3aXRoaW4gXFxgJHtyb290Q29tcG9uZW50TmFtZX1cXGBgKTtcbiAgfVxuICByZXR1cm4gW1Byb3ZpZGVyLCB1c2VDb250ZXh0Ml07XG59XG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0U2NvcGUoc2NvcGVOYW1lLCBjcmVhdGVDb250ZXh0U2NvcGVEZXBzID0gW10pIHtcbiAgbGV0IGRlZmF1bHRDb250ZXh0cyA9IFtdO1xuICBmdW5jdGlvbiBjcmVhdGVDb250ZXh0Myhyb290Q29tcG9uZW50TmFtZSwgZGVmYXVsdENvbnRleHQpIHtcbiAgICBjb25zdCBCYXNlQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoZGVmYXVsdENvbnRleHQpO1xuICAgIGNvbnN0IGluZGV4ID0gZGVmYXVsdENvbnRleHRzLmxlbmd0aDtcbiAgICBkZWZhdWx0Q29udGV4dHMgPSBbLi4uZGVmYXVsdENvbnRleHRzLCBkZWZhdWx0Q29udGV4dF07XG4gICAgY29uc3QgUHJvdmlkZXIgPSAocHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHsgc2NvcGUsIGNoaWxkcmVuLCAuLi5jb250ZXh0IH0gPSBwcm9wcztcbiAgICAgIGNvbnN0IENvbnRleHQgPSBzY29wZT8uW3Njb3BlTmFtZV0/LltpbmRleF0gfHwgQmFzZUNvbnRleHQ7XG4gICAgICBjb25zdCB2YWx1ZSA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gY29udGV4dCwgT2JqZWN0LnZhbHVlcyhjb250ZXh0KSk7XG4gICAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChDb250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlLCBjaGlsZHJlbiB9KTtcbiAgICB9O1xuICAgIFByb3ZpZGVyLmRpc3BsYXlOYW1lID0gcm9vdENvbXBvbmVudE5hbWUgKyBcIlByb3ZpZGVyXCI7XG4gICAgZnVuY3Rpb24gdXNlQ29udGV4dDIoY29uc3VtZXJOYW1lLCBzY29wZSkge1xuICAgICAgY29uc3QgQ29udGV4dCA9IHNjb3BlPy5bc2NvcGVOYW1lXT8uW2luZGV4XSB8fCBCYXNlQ29udGV4dDtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KENvbnRleHQpO1xuICAgICAgaWYgKGNvbnRleHQpIHJldHVybiBjb250ZXh0O1xuICAgICAgaWYgKGRlZmF1bHRDb250ZXh0ICE9PSB2b2lkIDApIHJldHVybiBkZWZhdWx0Q29udGV4dDtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXFxgJHtjb25zdW1lck5hbWV9XFxgIG11c3QgYmUgdXNlZCB3aXRoaW4gXFxgJHtyb290Q29tcG9uZW50TmFtZX1cXGBgKTtcbiAgICB9XG4gICAgcmV0dXJuIFtQcm92aWRlciwgdXNlQ29udGV4dDJdO1xuICB9XG4gIGNvbnN0IGNyZWF0ZVNjb3BlID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjb3BlQ29udGV4dHMgPSBkZWZhdWx0Q29udGV4dHMubWFwKChkZWZhdWx0Q29udGV4dCkgPT4ge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUNvbnRleHQoZGVmYXVsdENvbnRleHQpO1xuICAgIH0pO1xuICAgIHJldHVybiBmdW5jdGlvbiB1c2VTY29wZShzY29wZSkge1xuICAgICAgY29uc3QgY29udGV4dHMgPSBzY29wZT8uW3Njb3BlTmFtZV0gfHwgc2NvcGVDb250ZXh0cztcbiAgICAgIHJldHVybiBSZWFjdC51c2VNZW1vKFxuICAgICAgICAoKSA9PiAoeyBbYF9fc2NvcGUke3Njb3BlTmFtZX1gXTogeyAuLi5zY29wZSwgW3Njb3BlTmFtZV06IGNvbnRleHRzIH0gfSksXG4gICAgICAgIFtzY29wZSwgY29udGV4dHNdXG4gICAgICApO1xuICAgIH07XG4gIH07XG4gIGNyZWF0ZVNjb3BlLnNjb3BlTmFtZSA9IHNjb3BlTmFtZTtcbiAgcmV0dXJuIFtjcmVhdGVDb250ZXh0MywgY29tcG9zZUNvbnRleHRTY29wZXMoY3JlYXRlU2NvcGUsIC4uLmNyZWF0ZUNvbnRleHRTY29wZURlcHMpXTtcbn1cbmZ1bmN0aW9uIGNvbXBvc2VDb250ZXh0U2NvcGVzKC4uLnNjb3Blcykge1xuICBjb25zdCBiYXNlU2NvcGUgPSBzY29wZXNbMF07XG4gIGlmIChzY29wZXMubGVuZ3RoID09PSAxKSByZXR1cm4gYmFzZVNjb3BlO1xuICBjb25zdCBjcmVhdGVTY29wZSA9ICgpID0+IHtcbiAgICBjb25zdCBzY29wZUhvb2tzID0gc2NvcGVzLm1hcCgoY3JlYXRlU2NvcGUyKSA9PiAoe1xuICAgICAgdXNlU2NvcGU6IGNyZWF0ZVNjb3BlMigpLFxuICAgICAgc2NvcGVOYW1lOiBjcmVhdGVTY29wZTIuc2NvcGVOYW1lXG4gICAgfSkpO1xuICAgIHJldHVybiBmdW5jdGlvbiB1c2VDb21wb3NlZFNjb3BlcyhvdmVycmlkZVNjb3Blcykge1xuICAgICAgY29uc3QgbmV4dFNjb3BlcyA9IHNjb3BlSG9va3MucmVkdWNlKChuZXh0U2NvcGVzMiwgeyB1c2VTY29wZSwgc2NvcGVOYW1lIH0pID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcGVQcm9wcyA9IHVzZVNjb3BlKG92ZXJyaWRlU2NvcGVzKTtcbiAgICAgICAgY29uc3QgY3VycmVudFNjb3BlID0gc2NvcGVQcm9wc1tgX19zY29wZSR7c2NvcGVOYW1lfWBdO1xuICAgICAgICByZXR1cm4geyAuLi5uZXh0U2NvcGVzMiwgLi4uY3VycmVudFNjb3BlIH07XG4gICAgICB9LCB7fSk7XG4gICAgICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiAoeyBbYF9fc2NvcGUke2Jhc2VTY29wZS5zY29wZU5hbWV9YF06IG5leHRTY29wZXMgfSksIFtuZXh0U2NvcGVzXSk7XG4gICAgfTtcbiAgfTtcbiAgY3JlYXRlU2NvcGUuc2NvcGVOYW1lID0gYmFzZVNjb3BlLnNjb3BlTmFtZTtcbiAgcmV0dXJuIGNyZWF0ZVNjb3BlO1xufVxuZXhwb3J0IHtcbiAgY3JlYXRlQ29udGV4dDIgYXMgY3JlYXRlQ29udGV4dCxcbiAgY3JlYXRlQ29udGV4dFNjb3BlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9kaWFsb2cudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNvbXBvc2VFdmVudEhhbmRsZXJzIH0gZnJvbSBcIkByYWRpeC11aS9wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0LCBjcmVhdGVDb250ZXh0U2NvcGUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbnRleHRcIjtcbmltcG9ydCB7IHVzZUlkIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1pZFwiO1xuaW1wb3J0IHsgdXNlQ29udHJvbGxhYmxlU3RhdGUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jb250cm9sbGFibGUtc3RhdGVcIjtcbmltcG9ydCB7IERpc21pc3NhYmxlTGF5ZXIgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWRpc21pc3NhYmxlLWxheWVyXCI7XG5pbXBvcnQgeyBGb2N1c1Njb3BlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1mb2N1cy1zY29wZVwiO1xuaW1wb3J0IHsgUG9ydGFsIGFzIFBvcnRhbFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcG9ydGFsXCI7XG5pbXBvcnQgeyBQcmVzZW5jZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJlc2VuY2VcIjtcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VGb2N1c0d1YXJkcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtZm9jdXMtZ3VhcmRzXCI7XG5pbXBvcnQgeyBSZW1vdmVTY3JvbGwgfSBmcm9tIFwicmVhY3QtcmVtb3ZlLXNjcm9sbFwiO1xuaW1wb3J0IHsgaGlkZU90aGVycyB9IGZyb20gXCJhcmlhLWhpZGRlblwiO1xuaW1wb3J0IHsgY3JlYXRlU2xvdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3Qtc2xvdFwiO1xuaW1wb3J0IHsgRnJhZ21lbnQsIGpzeCwganN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIERJQUxPR19OQU1FID0gXCJEaWFsb2dcIjtcbnZhciBbY3JlYXRlRGlhbG9nQ29udGV4dCwgY3JlYXRlRGlhbG9nU2NvcGVdID0gY3JlYXRlQ29udGV4dFNjb3BlKERJQUxPR19OQU1FKTtcbnZhciBbRGlhbG9nUHJvdmlkZXIsIHVzZURpYWxvZ0NvbnRleHRdID0gY3JlYXRlRGlhbG9nQ29udGV4dChESUFMT0dfTkFNRSk7XG52YXIgRGlhbG9nID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBfX3Njb3BlRGlhbG9nLFxuICAgIGNoaWxkcmVuLFxuICAgIG9wZW46IG9wZW5Qcm9wLFxuICAgIGRlZmF1bHRPcGVuLFxuICAgIG9uT3BlbkNoYW5nZSxcbiAgICBtb2RhbCA9IHRydWVcbiAgfSA9IHByb3BzO1xuICBjb25zdCB0cmlnZ2VyUmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBjb250ZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VDb250cm9sbGFibGVTdGF0ZSh7XG4gICAgcHJvcDogb3BlblByb3AsXG4gICAgZGVmYXVsdFByb3A6IGRlZmF1bHRPcGVuID8/IGZhbHNlLFxuICAgIG9uQ2hhbmdlOiBvbk9wZW5DaGFuZ2UsXG4gICAgY2FsbGVyOiBESUFMT0dfTkFNRVxuICB9KTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgRGlhbG9nUHJvdmlkZXIsXG4gICAge1xuICAgICAgc2NvcGU6IF9fc2NvcGVEaWFsb2csXG4gICAgICB0cmlnZ2VyUmVmLFxuICAgICAgY29udGVudFJlZixcbiAgICAgIGNvbnRlbnRJZDogdXNlSWQoKSxcbiAgICAgIHRpdGxlSWQ6IHVzZUlkKCksXG4gICAgICBkZXNjcmlwdGlvbklkOiB1c2VJZCgpLFxuICAgICAgb3BlbixcbiAgICAgIG9uT3BlbkNoYW5nZTogc2V0T3BlbixcbiAgICAgIG9uT3BlblRvZ2dsZTogUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4gc2V0T3BlbigocHJldk9wZW4pID0+ICFwcmV2T3BlbiksIFtzZXRPcGVuXSksXG4gICAgICBtb2RhbCxcbiAgICAgIGNoaWxkcmVuXG4gICAgfVxuICApO1xufTtcbkRpYWxvZy5kaXNwbGF5TmFtZSA9IERJQUxPR19OQU1FO1xudmFyIFRSSUdHRVJfTkFNRSA9IFwiRGlhbG9nVHJpZ2dlclwiO1xudmFyIERpYWxvZ1RyaWdnZXIgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4udHJpZ2dlclByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChUUklHR0VSX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGNvbXBvc2VkVHJpZ2dlclJlZiA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIGNvbnRleHQudHJpZ2dlclJlZik7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBQcmltaXRpdmUuYnV0dG9uLFxuICAgICAge1xuICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICBcImFyaWEtaGFzcG9wdXBcIjogXCJkaWFsb2dcIixcbiAgICAgICAgXCJhcmlhLWV4cGFuZGVkXCI6IGNvbnRleHQub3BlbixcbiAgICAgICAgXCJhcmlhLWNvbnRyb2xzXCI6IGNvbnRleHQuY29udGVudElkLFxuICAgICAgICBcImRhdGEtc3RhdGVcIjogZ2V0U3RhdGUoY29udGV4dC5vcGVuKSxcbiAgICAgICAgLi4udHJpZ2dlclByb3BzLFxuICAgICAgICByZWY6IGNvbXBvc2VkVHJpZ2dlclJlZixcbiAgICAgICAgb25DbGljazogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25DbGljaywgY29udGV4dC5vbk9wZW5Ub2dnbGUpXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbkRpYWxvZ1RyaWdnZXIuZGlzcGxheU5hbWUgPSBUUklHR0VSX05BTUU7XG52YXIgUE9SVEFMX05BTUUgPSBcIkRpYWxvZ1BvcnRhbFwiO1xudmFyIFtQb3J0YWxQcm92aWRlciwgdXNlUG9ydGFsQ29udGV4dF0gPSBjcmVhdGVEaWFsb2dDb250ZXh0KFBPUlRBTF9OQU1FLCB7XG4gIGZvcmNlTW91bnQ6IHZvaWQgMFxufSk7XG52YXIgRGlhbG9nUG9ydGFsID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgX19zY29wZURpYWxvZywgZm9yY2VNb3VudCwgY2hpbGRyZW4sIGNvbnRhaW5lciB9ID0gcHJvcHM7XG4gIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KFBPUlRBTF9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUG9ydGFsUHJvdmlkZXIsIHsgc2NvcGU6IF9fc2NvcGVEaWFsb2csIGZvcmNlTW91bnQsIGNoaWxkcmVuOiBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChjaGlsZCkgPT4gLyogQF9fUFVSRV9fICovIGpzeChQcmVzZW5jZSwgeyBwcmVzZW50OiBmb3JjZU1vdW50IHx8IGNvbnRleHQub3BlbiwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goUG9ydGFsUHJpbWl0aXZlLCB7IGFzQ2hpbGQ6IHRydWUsIGNvbnRhaW5lciwgY2hpbGRyZW46IGNoaWxkIH0pIH0pKSB9KTtcbn07XG5EaWFsb2dQb3J0YWwuZGlzcGxheU5hbWUgPSBQT1JUQUxfTkFNRTtcbnZhciBPVkVSTEFZX05BTUUgPSBcIkRpYWxvZ092ZXJsYXlcIjtcbnZhciBEaWFsb2dPdmVybGF5ID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCBwb3J0YWxDb250ZXh0ID0gdXNlUG9ydGFsQ29udGV4dChPVkVSTEFZX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IHsgZm9yY2VNb3VudCA9IHBvcnRhbENvbnRleHQuZm9yY2VNb3VudCwgLi4ub3ZlcmxheVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChPVkVSTEFZX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiBjb250ZXh0Lm1vZGFsID8gLyogQF9fUFVSRV9fICovIGpzeChQcmVzZW5jZSwgeyBwcmVzZW50OiBmb3JjZU1vdW50IHx8IGNvbnRleHQub3BlbiwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goRGlhbG9nT3ZlcmxheUltcGwsIHsgLi4ub3ZlcmxheVByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSB9KSA6IG51bGw7XG4gIH1cbik7XG5EaWFsb2dPdmVybGF5LmRpc3BsYXlOYW1lID0gT1ZFUkxBWV9OQU1FO1xudmFyIFNsb3QgPSBjcmVhdGVTbG90KFwiRGlhbG9nT3ZlcmxheS5SZW1vdmVTY3JvbGxcIik7XG52YXIgRGlhbG9nT3ZlcmxheUltcGwgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4ub3ZlcmxheVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChPVkVSTEFZX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAoXG4gICAgICAvLyBNYWtlIHN1cmUgYENvbnRlbnRgIGlzIHNjcm9sbGFibGUgZXZlbiB3aGVuIGl0IGRvZXNuJ3QgbGl2ZSBpbnNpZGUgYFJlbW92ZVNjcm9sbGBcbiAgICAgIC8vIGllLiB3aGVuIGBPdmVybGF5YCBhbmQgYENvbnRlbnRgIGFyZSBzaWJsaW5nc1xuICAgICAgLyogQF9fUFVSRV9fICovIGpzeChSZW1vdmVTY3JvbGwsIHsgYXM6IFNsb3QsIGFsbG93UGluY2hab29tOiB0cnVlLCBzaGFyZHM6IFtjb250ZXh0LmNvbnRlbnRSZWZdLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgICAgUHJpbWl0aXZlLmRpdixcbiAgICAgICAge1xuICAgICAgICAgIFwiZGF0YS1zdGF0ZVwiOiBnZXRTdGF0ZShjb250ZXh0Lm9wZW4pLFxuICAgICAgICAgIC4uLm92ZXJsYXlQcm9wcyxcbiAgICAgICAgICByZWY6IGZvcndhcmRlZFJlZixcbiAgICAgICAgICBzdHlsZTogeyBwb2ludGVyRXZlbnRzOiBcImF1dG9cIiwgLi4ub3ZlcmxheVByb3BzLnN0eWxlIH1cbiAgICAgICAgfVxuICAgICAgKSB9KVxuICAgICk7XG4gIH1cbik7XG52YXIgQ09OVEVOVF9OQU1FID0gXCJEaWFsb2dDb250ZW50XCI7XG52YXIgRGlhbG9nQ29udGVudCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgcG9ydGFsQ29udGV4dCA9IHVzZVBvcnRhbENvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCB7IGZvcmNlTW91bnQgPSBwb3J0YWxDb250ZXh0LmZvcmNlTW91bnQsIC4uLmNvbnRlbnRQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmVzZW5jZSwgeyBwcmVzZW50OiBmb3JjZU1vdW50IHx8IGNvbnRleHQub3BlbiwgY2hpbGRyZW46IGNvbnRleHQubW9kYWwgPyAvKiBAX19QVVJFX18gKi8ganN4KERpYWxvZ0NvbnRlbnRNb2RhbCwgeyAuLi5jb250ZW50UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pIDogLyogQF9fUFVSRV9fICovIGpzeChEaWFsb2dDb250ZW50Tm9uTW9kYWwsIHsgLi4uY29udGVudFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSB9KTtcbiAgfVxuKTtcbkRpYWxvZ0NvbnRlbnQuZGlzcGxheU5hbWUgPSBDT05URU5UX05BTUU7XG52YXIgRGlhbG9nQ29udGVudE1vZGFsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDT05URU5UX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgY29udGV4dC5jb250ZW50UmVmLCBjb250ZW50UmVmKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IGNvbnRlbnRSZWYuY3VycmVudDtcbiAgICAgIGlmIChjb250ZW50KSByZXR1cm4gaGlkZU90aGVycyhjb250ZW50KTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBEaWFsb2dDb250ZW50SW1wbCxcbiAgICAgIHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIHJlZjogY29tcG9zZWRSZWZzLFxuICAgICAgICB0cmFwRm9jdXM6IGNvbnRleHQub3BlbixcbiAgICAgICAgZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzOiB0cnVlLFxuICAgICAgICBvbkNsb3NlQXV0b0ZvY3VzOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkNsb3NlQXV0b0ZvY3VzLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNvbnRleHQudHJpZ2dlclJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgICAgICB9KSxcbiAgICAgICAgb25Qb2ludGVyRG93bk91dHNpZGU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uUG9pbnRlckRvd25PdXRzaWRlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBvcmlnaW5hbEV2ZW50ID0gZXZlbnQuZGV0YWlsLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgY29uc3QgY3RybExlZnRDbGljayA9IG9yaWdpbmFsRXZlbnQuYnV0dG9uID09PSAwICYmIG9yaWdpbmFsRXZlbnQuY3RybEtleSA9PT0gdHJ1ZTtcbiAgICAgICAgICBjb25zdCBpc1JpZ2h0Q2xpY2sgPSBvcmlnaW5hbEV2ZW50LmJ1dHRvbiA9PT0gMiB8fCBjdHJsTGVmdENsaWNrO1xuICAgICAgICAgIGlmIChpc1JpZ2h0Q2xpY2spIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLFxuICAgICAgICBvbkZvY3VzT3V0c2lkZTogY29tcG9zZUV2ZW50SGFuZGxlcnMoXG4gICAgICAgICAgcHJvcHMub25Gb2N1c091dHNpZGUsXG4gICAgICAgICAgKGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xudmFyIERpYWxvZ0NvbnRlbnROb25Nb2RhbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gICAgY29uc3QgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIERpYWxvZ0NvbnRlbnRJbXBsLFxuICAgICAge1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgcmVmOiBmb3J3YXJkZWRSZWYsXG4gICAgICAgIHRyYXBGb2N1czogZmFsc2UsXG4gICAgICAgIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50czogZmFsc2UsXG4gICAgICAgIG9uQ2xvc2VBdXRvRm9jdXM6IChldmVudCkgPT4ge1xuICAgICAgICAgIHByb3BzLm9uQ2xvc2VBdXRvRm9jdXM/LihldmVudCk7XG4gICAgICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmLmN1cnJlbnQpIGNvbnRleHQudHJpZ2dlclJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaGFzSW50ZXJhY3RlZE91dHNpZGVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgIGhhc1BvaW50ZXJEb3duT3V0c2lkZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW50ZXJhY3RPdXRzaWRlOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICBwcm9wcy5vbkludGVyYWN0T3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIGhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50LnR5cGUgPT09IFwicG9pbnRlcmRvd25cIikge1xuICAgICAgICAgICAgICBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICBjb25zdCB0YXJnZXRJc1RyaWdnZXIgPSBjb250ZXh0LnRyaWdnZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgICBpZiAodGFyZ2V0SXNUcmlnZ2VyKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmIChldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudC50eXBlID09PSBcImZvY3VzaW5cIiAmJiBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xudmFyIERpYWxvZ0NvbnRlbnRJbXBsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIHRyYXBGb2N1cywgb25PcGVuQXV0b0ZvY3VzLCBvbkNsb3NlQXV0b0ZvY3VzLCAuLi5jb250ZW50UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgY29udGVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCBjb250ZW50UmVmKTtcbiAgICB1c2VGb2N1c0d1YXJkcygpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4cyhGcmFnbWVudCwgeyBjaGlsZHJlbjogW1xuICAgICAgLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgICAgRm9jdXNTY29wZSxcbiAgICAgICAge1xuICAgICAgICAgIGFzQ2hpbGQ6IHRydWUsXG4gICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICB0cmFwcGVkOiB0cmFwRm9jdXMsXG4gICAgICAgICAgb25Nb3VudEF1dG9Gb2N1czogb25PcGVuQXV0b0ZvY3VzLFxuICAgICAgICAgIG9uVW5tb3VudEF1dG9Gb2N1czogb25DbG9zZUF1dG9Gb2N1cyxcbiAgICAgICAgICBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgICAgICAgIERpc21pc3NhYmxlTGF5ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJvbGU6IFwiZGlhbG9nXCIsXG4gICAgICAgICAgICAgIGlkOiBjb250ZXh0LmNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgXCJhcmlhLWRlc2NyaWJlZGJ5XCI6IGNvbnRleHQuZGVzY3JpcHRpb25JZCxcbiAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogY29udGV4dC50aXRsZUlkLFxuICAgICAgICAgICAgICBcImRhdGEtc3RhdGVcIjogZ2V0U3RhdGUoY29udGV4dC5vcGVuKSxcbiAgICAgICAgICAgICAgLi4uY29udGVudFByb3BzLFxuICAgICAgICAgICAgICByZWY6IGNvbXBvc2VkUmVmcyxcbiAgICAgICAgICAgICAgb25EaXNtaXNzOiAoKSA9PiBjb250ZXh0Lm9uT3BlbkNoYW5nZShmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKiBAX19QVVJFX18gKi8ganN4cyhGcmFnbWVudCwgeyBjaGlsZHJlbjogW1xuICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4KFRpdGxlV2FybmluZywgeyB0aXRsZUlkOiBjb250ZXh0LnRpdGxlSWQgfSksXG4gICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goRGVzY3JpcHRpb25XYXJuaW5nLCB7IGNvbnRlbnRSZWYsIGRlc2NyaXB0aW9uSWQ6IGNvbnRleHQuZGVzY3JpcHRpb25JZCB9KVxuICAgICAgXSB9KVxuICAgIF0gfSk7XG4gIH1cbik7XG52YXIgVElUTEVfTkFNRSA9IFwiRGlhbG9nVGl0bGVcIjtcbnZhciBEaWFsb2dUaXRsZSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi50aXRsZVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChUSVRMRV9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuaDIsIHsgaWQ6IGNvbnRleHQudGl0bGVJZCwgLi4udGl0bGVQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSk7XG4gIH1cbik7XG5EaWFsb2dUaXRsZS5kaXNwbGF5TmFtZSA9IFRJVExFX05BTUU7XG52YXIgREVTQ1JJUFRJT05fTkFNRSA9IFwiRGlhbG9nRGVzY3JpcHRpb25cIjtcbnZhciBEaWFsb2dEZXNjcmlwdGlvbiA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi5kZXNjcmlwdGlvblByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChERVNDUklQVElPTl9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUucCwgeyBpZDogY29udGV4dC5kZXNjcmlwdGlvbklkLCAuLi5kZXNjcmlwdGlvblByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KTtcbiAgfVxuKTtcbkRpYWxvZ0Rlc2NyaXB0aW9uLmRpc3BsYXlOYW1lID0gREVTQ1JJUFRJT05fTkFNRTtcbnZhciBDTE9TRV9OQU1FID0gXCJEaWFsb2dDbG9zZVwiO1xudmFyIERpYWxvZ0Nsb3NlID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLmNsb3NlUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENMT1NFX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgUHJpbWl0aXZlLmJ1dHRvbixcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgLi4uY2xvc2VQcm9wcyxcbiAgICAgICAgcmVmOiBmb3J3YXJkZWRSZWYsXG4gICAgICAgIG9uQ2xpY2s6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQ2xpY2ssICgpID0+IGNvbnRleHQub25PcGVuQ2hhbmdlKGZhbHNlKSlcbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xuRGlhbG9nQ2xvc2UuZGlzcGxheU5hbWUgPSBDTE9TRV9OQU1FO1xuZnVuY3Rpb24gZ2V0U3RhdGUob3Blbikge1xuICByZXR1cm4gb3BlbiA/IFwib3BlblwiIDogXCJjbG9zZWRcIjtcbn1cbnZhciBUSVRMRV9XQVJOSU5HX05BTUUgPSBcIkRpYWxvZ1RpdGxlV2FybmluZ1wiO1xudmFyIFtXYXJuaW5nUHJvdmlkZXIsIHVzZVdhcm5pbmdDb250ZXh0XSA9IGNyZWF0ZUNvbnRleHQoVElUTEVfV0FSTklOR19OQU1FLCB7XG4gIGNvbnRlbnROYW1lOiBDT05URU5UX05BTUUsXG4gIHRpdGxlTmFtZTogVElUTEVfTkFNRSxcbiAgZG9jc1NsdWc6IFwiZGlhbG9nXCJcbn0pO1xudmFyIFRpdGxlV2FybmluZyA9ICh7IHRpdGxlSWQgfSkgPT4ge1xuICBjb25zdCB0aXRsZVdhcm5pbmdDb250ZXh0ID0gdXNlV2FybmluZ0NvbnRleHQoVElUTEVfV0FSTklOR19OQU1FKTtcbiAgY29uc3QgTUVTU0FHRSA9IGBcXGAke3RpdGxlV2FybmluZ0NvbnRleHQuY29udGVudE5hbWV9XFxgIHJlcXVpcmVzIGEgXFxgJHt0aXRsZVdhcm5pbmdDb250ZXh0LnRpdGxlTmFtZX1cXGAgZm9yIHRoZSBjb21wb25lbnQgdG8gYmUgYWNjZXNzaWJsZSBmb3Igc2NyZWVuIHJlYWRlciB1c2Vycy5cblxuSWYgeW91IHdhbnQgdG8gaGlkZSB0aGUgXFxgJHt0aXRsZVdhcm5pbmdDb250ZXh0LnRpdGxlTmFtZX1cXGAsIHlvdSBjYW4gd3JhcCBpdCB3aXRoIG91ciBWaXN1YWxseUhpZGRlbiBjb21wb25lbnQuXG5cbkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgaHR0cHM6Ly9yYWRpeC11aS5jb20vcHJpbWl0aXZlcy9kb2NzL2NvbXBvbmVudHMvJHt0aXRsZVdhcm5pbmdDb250ZXh0LmRvY3NTbHVnfWA7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRpdGxlSWQpIHtcbiAgICAgIGNvbnN0IGhhc1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGl0bGVJZCk7XG4gICAgICBpZiAoIWhhc1RpdGxlKSBjb25zb2xlLmVycm9yKE1FU1NBR0UpO1xuICAgIH1cbiAgfSwgW01FU1NBR0UsIHRpdGxlSWRdKTtcbiAgcmV0dXJuIG51bGw7XG59O1xudmFyIERFU0NSSVBUSU9OX1dBUk5JTkdfTkFNRSA9IFwiRGlhbG9nRGVzY3JpcHRpb25XYXJuaW5nXCI7XG52YXIgRGVzY3JpcHRpb25XYXJuaW5nID0gKHsgY29udGVudFJlZiwgZGVzY3JpcHRpb25JZCB9KSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0aW9uV2FybmluZ0NvbnRleHQgPSB1c2VXYXJuaW5nQ29udGV4dChERVNDUklQVElPTl9XQVJOSU5HX05BTUUpO1xuICBjb25zdCBNRVNTQUdFID0gYFdhcm5pbmc6IE1pc3NpbmcgXFxgRGVzY3JpcHRpb25cXGAgb3IgXFxgYXJpYS1kZXNjcmliZWRieT17dW5kZWZpbmVkfVxcYCBmb3IgeyR7ZGVzY3JpcHRpb25XYXJuaW5nQ29udGV4dC5jb250ZW50TmFtZX19LmA7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZGVzY3JpYmVkQnlJZCA9IGNvbnRlbnRSZWYuY3VycmVudD8uZ2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiKTtcbiAgICBpZiAoZGVzY3JpcHRpb25JZCAmJiBkZXNjcmliZWRCeUlkKSB7XG4gICAgICBjb25zdCBoYXNEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRlc2NyaXB0aW9uSWQpO1xuICAgICAgaWYgKCFoYXNEZXNjcmlwdGlvbikgY29uc29sZS53YXJuKE1FU1NBR0UpO1xuICAgIH1cbiAgfSwgW01FU1NBR0UsIGNvbnRlbnRSZWYsIGRlc2NyaXB0aW9uSWRdKTtcbiAgcmV0dXJuIG51bGw7XG59O1xudmFyIFJvb3QgPSBEaWFsb2c7XG52YXIgVHJpZ2dlciA9IERpYWxvZ1RyaWdnZXI7XG52YXIgUG9ydGFsID0gRGlhbG9nUG9ydGFsO1xudmFyIE92ZXJsYXkgPSBEaWFsb2dPdmVybGF5O1xudmFyIENvbnRlbnQgPSBEaWFsb2dDb250ZW50O1xudmFyIFRpdGxlID0gRGlhbG9nVGl0bGU7XG52YXIgRGVzY3JpcHRpb24gPSBEaWFsb2dEZXNjcmlwdGlvbjtcbnZhciBDbG9zZSA9IERpYWxvZ0Nsb3NlO1xuZXhwb3J0IHtcbiAgQ2xvc2UsXG4gIENvbnRlbnQsXG4gIERlc2NyaXB0aW9uLFxuICBEaWFsb2csXG4gIERpYWxvZ0Nsb3NlLFxuICBEaWFsb2dDb250ZW50LFxuICBEaWFsb2dEZXNjcmlwdGlvbixcbiAgRGlhbG9nT3ZlcmxheSxcbiAgRGlhbG9nUG9ydGFsLFxuICBEaWFsb2dUaXRsZSxcbiAgRGlhbG9nVHJpZ2dlcixcbiAgT3ZlcmxheSxcbiAgUG9ydGFsLFxuICBSb290LFxuICBUaXRsZSxcbiAgVHJpZ2dlcixcbiAgV2FybmluZ1Byb3ZpZGVyLFxuICBjcmVhdGVEaWFsb2dTY29wZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy9zbG90LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBGcmFnbWVudCBhcyBGcmFnbWVudDIsIGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3Qob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3RDbG9uZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90Q2xvbmUob3duZXJOYW1lKTtcbiAgY29uc3QgU2xvdDIgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjaGlsZHJlbkFycmF5ID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbik7XG4gICAgY29uc3Qgc2xvdHRhYmxlID0gY2hpbGRyZW5BcnJheS5maW5kKGlzU2xvdHRhYmxlKTtcbiAgICBpZiAoc2xvdHRhYmxlKSB7XG4gICAgICBjb25zdCBuZXdFbGVtZW50ID0gc2xvdHRhYmxlLnByb3BzLmNoaWxkcmVuO1xuICAgICAgY29uc3QgbmV3Q2hpbGRyZW4gPSBjaGlsZHJlbkFycmF5Lm1hcCgoY2hpbGQpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkID09PSBzbG90dGFibGUpIHtcbiAgICAgICAgICBpZiAoUmVhY3QuQ2hpbGRyZW4uY291bnQobmV3RWxlbWVudCkgPiAxKSByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKTtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBuZXdFbGVtZW50LnByb3BzLmNoaWxkcmVuIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goU2xvdENsb25lLCB7IC4uLnNsb3RQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYsIGNoaWxkcmVuOiBSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXdFbGVtZW50KSA/IFJlYWN0LmNsb25lRWxlbWVudChuZXdFbGVtZW50LCB2b2lkIDAsIG5ld0NoaWxkcmVuKSA6IG51bGwgfSk7XG4gICAgfVxuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbiB9KTtcbiAgfSk7XG4gIFNsb3QyLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90YDtcbiAgcmV0dXJuIFNsb3QyO1xufVxudmFyIFNsb3QgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdChcIlNsb3RcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgICBjb25zdCBjaGlsZHJlblJlZiA9IGdldEVsZW1lbnRSZWYoY2hpbGRyZW4pO1xuICAgICAgY29uc3QgcHJvcHMyID0gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkcmVuLnByb3BzKTtcbiAgICAgIGlmIChjaGlsZHJlbi50eXBlICE9PSBSZWFjdC5GcmFnbWVudCkge1xuICAgICAgICBwcm9wczIucmVmID0gZm9yd2FyZGVkUmVmID8gY29tcG9zZVJlZnMoZm9yd2FyZGVkUmVmLCBjaGlsZHJlblJlZikgOiBjaGlsZHJlblJlZjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGRyZW4sIHByb3BzMik7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbikgPiAxID8gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKSA6IG51bGw7XG4gIH0pO1xuICBTbG90Q2xvbmUuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3RDbG9uZWA7XG4gIHJldHVybiBTbG90Q2xvbmU7XG59XG52YXIgU0xPVFRBQkxFX0lERU5USUZJRVIgPSBTeW1ib2woXCJyYWRpeC5zbG90dGFibGVcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdHRhYmxlKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90dGFibGUyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KEZyYWdtZW50MiwgeyBjaGlsZHJlbiB9KTtcbiAgfTtcbiAgU2xvdHRhYmxlMi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdHRhYmxlYDtcbiAgU2xvdHRhYmxlMi5fX3JhZGl4SWQgPSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbiAgcmV0dXJuIFNsb3R0YWJsZTI7XG59XG52YXIgU2xvdHRhYmxlID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3R0YWJsZShcIlNsb3R0YWJsZVwiKTtcbmZ1bmN0aW9uIGlzU2xvdHRhYmxlKGNoaWxkKSB7XG4gIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkgJiYgdHlwZW9mIGNoaWxkLnR5cGUgPT09IFwiZnVuY3Rpb25cIiAmJiBcIl9fcmFkaXhJZFwiIGluIGNoaWxkLnR5cGUgJiYgY2hpbGQudHlwZS5fX3JhZGl4SWQgPT09IFNMT1RUQUJMRV9JREVOVElGSUVSO1xufVxuZnVuY3Rpb24gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkUHJvcHMpIHtcbiAgY29uc3Qgb3ZlcnJpZGVQcm9wcyA9IHsgLi4uY2hpbGRQcm9wcyB9O1xuICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIGNoaWxkUHJvcHMpIHtcbiAgICBjb25zdCBzbG90UHJvcFZhbHVlID0gc2xvdFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBjaGlsZFByb3BWYWx1ZSA9IGNoaWxkUHJvcHNbcHJvcE5hbWVdO1xuICAgIGNvbnN0IGlzSGFuZGxlciA9IC9eb25bQS1aXS8udGVzdChwcm9wTmFtZSk7XG4gICAgaWYgKGlzSGFuZGxlcikge1xuICAgICAgaWYgKHNsb3RQcm9wVmFsdWUgJiYgY2hpbGRQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNoaWxkUHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHNsb3RQcm9wVmFsdWUoLi4uYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2xvdFByb3BWYWx1ZSkge1xuICAgICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHNsb3RQcm9wVmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHsgLi4uc2xvdFByb3BWYWx1ZSwgLi4uY2hpbGRQcm9wVmFsdWUgfTtcbiAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSBcImNsYXNzTmFtZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IFtzbG90UHJvcFZhbHVlLCBjaGlsZFByb3BWYWx1ZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyAuLi5zbG90UHJvcHMsIC4uLm92ZXJyaWRlUHJvcHMgfTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRSZWYoZWxlbWVudCkge1xuICBsZXQgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LnByb3BzLCBcInJlZlwiKT8uZ2V0O1xuICBsZXQgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5yZWY7XG4gIH1cbiAgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LCBcInJlZlwiKT8uZ2V0O1xuICBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnByb3BzLnJlZjtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWYgfHwgZWxlbWVudC5yZWY7XG59XG5leHBvcnQge1xuICBTbG90IGFzIFJvb3QsXG4gIFNsb3QsXG4gIFNsb3R0YWJsZSxcbiAgY3JlYXRlU2xvdCxcbiAgY3JlYXRlU2xvdHRhYmxlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9kaXNtaXNzYWJsZS1sYXllci50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZUV2ZW50SGFuZGxlcnMgfSBmcm9tIFwiQHJhZGl4LXVpL3ByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgUHJpbWl0aXZlLCBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnQgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmXCI7XG5pbXBvcnQgeyB1c2VFc2NhcGVLZXlkb3duIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtZXNjYXBlLWtleWRvd25cIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIERJU01JU1NBQkxFX0xBWUVSX05BTUUgPSBcIkRpc21pc3NhYmxlTGF5ZXJcIjtcbnZhciBDT05URVhUX1VQREFURSA9IFwiZGlzbWlzc2FibGVMYXllci51cGRhdGVcIjtcbnZhciBQT0lOVEVSX0RPV05fT1VUU0lERSA9IFwiZGlzbWlzc2FibGVMYXllci5wb2ludGVyRG93bk91dHNpZGVcIjtcbnZhciBGT0NVU19PVVRTSURFID0gXCJkaXNtaXNzYWJsZUxheWVyLmZvY3VzT3V0c2lkZVwiO1xudmFyIG9yaWdpbmFsQm9keVBvaW50ZXJFdmVudHM7XG52YXIgRGlzbWlzc2FibGVMYXllckNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KHtcbiAgbGF5ZXJzOiAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpLFxuICBsYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZDogLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKSxcbiAgYnJhbmNoZXM6IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KClcbn0pO1xudmFyIERpc21pc3NhYmxlTGF5ZXIgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50cyA9IGZhbHNlLFxuICAgICAgb25Fc2NhcGVLZXlEb3duLFxuICAgICAgb25Qb2ludGVyRG93bk91dHNpZGUsXG4gICAgICBvbkZvY3VzT3V0c2lkZSxcbiAgICAgIG9uSW50ZXJhY3RPdXRzaWRlLFxuICAgICAgb25EaXNtaXNzLFxuICAgICAgLi4ubGF5ZXJQcm9wc1xuICAgIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChEaXNtaXNzYWJsZUxheWVyQ29udGV4dCk7XG4gICAgY29uc3QgW25vZGUsIHNldE5vZGVdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3Qgb3duZXJEb2N1bWVudCA9IG5vZGU/Lm93bmVyRG9jdW1lbnQgPz8gZ2xvYmFsVGhpcz8uZG9jdW1lbnQ7XG4gICAgY29uc3QgWywgZm9yY2VdID0gUmVhY3QudXNlU3RhdGUoe30pO1xuICAgIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIChub2RlMikgPT4gc2V0Tm9kZShub2RlMikpO1xuICAgIGNvbnN0IGxheWVycyA9IEFycmF5LmZyb20oY29udGV4dC5sYXllcnMpO1xuICAgIGNvbnN0IFtoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZF0gPSBbLi4uY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZF0uc2xpY2UoLTEpO1xuICAgIGNvbnN0IGhpZ2hlc3RMYXllcldpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkSW5kZXggPSBsYXllcnMuaW5kZXhPZihoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZCk7XG4gICAgY29uc3QgaW5kZXggPSBub2RlID8gbGF5ZXJzLmluZGV4T2Yobm9kZSkgOiAtMTtcbiAgICBjb25zdCBpc0JvZHlQb2ludGVyRXZlbnRzRGlzYWJsZWQgPSBjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLnNpemUgPiAwO1xuICAgIGNvbnN0IGlzUG9pbnRlckV2ZW50c0VuYWJsZWQgPSBpbmRleCA+PSBoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZEluZGV4O1xuICAgIGNvbnN0IHBvaW50ZXJEb3duT3V0c2lkZSA9IHVzZVBvaW50ZXJEb3duT3V0c2lkZSgoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGNvbnN0IGlzUG9pbnRlckRvd25PbkJyYW5jaCA9IFsuLi5jb250ZXh0LmJyYW5jaGVzXS5zb21lKChicmFuY2gpID0+IGJyYW5jaC5jb250YWlucyh0YXJnZXQpKTtcbiAgICAgIGlmICghaXNQb2ludGVyRXZlbnRzRW5hYmxlZCB8fCBpc1BvaW50ZXJEb3duT25CcmFuY2gpIHJldHVybjtcbiAgICAgIG9uUG9pbnRlckRvd25PdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgb25JbnRlcmFjdE91dHNpZGU/LihldmVudCk7XG4gICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIG9uRGlzbWlzcz8uKCk7XG4gICAgfSwgb3duZXJEb2N1bWVudCk7XG4gICAgY29uc3QgZm9jdXNPdXRzaWRlID0gdXNlRm9jdXNPdXRzaWRlKChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgY29uc3QgaXNGb2N1c0luQnJhbmNoID0gWy4uLmNvbnRleHQuYnJhbmNoZXNdLnNvbWUoKGJyYW5jaCkgPT4gYnJhbmNoLmNvbnRhaW5zKHRhcmdldCkpO1xuICAgICAgaWYgKGlzRm9jdXNJbkJyYW5jaCkgcmV0dXJuO1xuICAgICAgb25Gb2N1c091dHNpZGU/LihldmVudCk7XG4gICAgICBvbkludGVyYWN0T3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgb25EaXNtaXNzPy4oKTtcbiAgICB9LCBvd25lckRvY3VtZW50KTtcbiAgICB1c2VFc2NhcGVLZXlkb3duKChldmVudCkgPT4ge1xuICAgICAgY29uc3QgaXNIaWdoZXN0TGF5ZXIgPSBpbmRleCA9PT0gY29udGV4dC5sYXllcnMuc2l6ZSAtIDE7XG4gICAgICBpZiAoIWlzSGlnaGVzdExheWVyKSByZXR1cm47XG4gICAgICBvbkVzY2FwZUtleURvd24/LihldmVudCk7XG4gICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgJiYgb25EaXNtaXNzKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG9uRGlzbWlzcygpO1xuICAgICAgfVxuICAgIH0sIG93bmVyRG9jdW1lbnQpO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICAgIGlmIChkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgaWYgKGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgIG9yaWdpbmFsQm9keVBvaW50ZXJFdmVudHMgPSBvd25lckRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cztcbiAgICAgICAgICBvd25lckRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuYWRkKG5vZGUpO1xuICAgICAgfVxuICAgICAgY29udGV4dC5sYXllcnMuYWRkKG5vZGUpO1xuICAgICAgZGlzcGF0Y2hVcGRhdGUoKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMgJiYgY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5zaXplID09PSAxKSB7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sIFtub2RlLCBvd25lckRvY3VtZW50LCBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMsIGNvbnRleHRdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKCFub2RlKSByZXR1cm47XG4gICAgICAgIGNvbnRleHQubGF5ZXJzLmRlbGV0ZShub2RlKTtcbiAgICAgICAgY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5kZWxldGUobm9kZSk7XG4gICAgICAgIGRpc3BhdGNoVXBkYXRlKCk7XG4gICAgICB9O1xuICAgIH0sIFtub2RlLCBjb250ZXh0XSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGhhbmRsZVVwZGF0ZSA9ICgpID0+IGZvcmNlKHt9KTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoQ09OVEVYVF9VUERBVEUsIGhhbmRsZVVwZGF0ZSk7XG4gICAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihDT05URVhUX1VQREFURSwgaGFuZGxlVXBkYXRlKTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBQcmltaXRpdmUuZGl2LFxuICAgICAge1xuICAgICAgICAuLi5sYXllclByb3BzLFxuICAgICAgICByZWY6IGNvbXBvc2VkUmVmcyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiBpc0JvZHlQb2ludGVyRXZlbnRzRGlzYWJsZWQgPyBpc1BvaW50ZXJFdmVudHNFbmFibGVkID8gXCJhdXRvXCIgOiBcIm5vbmVcIiA6IHZvaWQgMCxcbiAgICAgICAgICAuLi5wcm9wcy5zdHlsZVxuICAgICAgICB9LFxuICAgICAgICBvbkZvY3VzQ2FwdHVyZTogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25Gb2N1c0NhcHR1cmUsIGZvY3VzT3V0c2lkZS5vbkZvY3VzQ2FwdHVyZSksXG4gICAgICAgIG9uQmx1ckNhcHR1cmU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQmx1ckNhcHR1cmUsIGZvY3VzT3V0c2lkZS5vbkJsdXJDYXB0dXJlKSxcbiAgICAgICAgb25Qb2ludGVyRG93bkNhcHR1cmU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKFxuICAgICAgICAgIHByb3BzLm9uUG9pbnRlckRvd25DYXB0dXJlLFxuICAgICAgICAgIHBvaW50ZXJEb3duT3V0c2lkZS5vblBvaW50ZXJEb3duQ2FwdHVyZVxuICAgICAgICApXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbkRpc21pc3NhYmxlTGF5ZXIuZGlzcGxheU5hbWUgPSBESVNNSVNTQUJMRV9MQVlFUl9OQU1FO1xudmFyIEJSQU5DSF9OQU1FID0gXCJEaXNtaXNzYWJsZUxheWVyQnJhbmNoXCI7XG52YXIgRGlzbWlzc2FibGVMYXllckJyYW5jaCA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoRGlzbWlzc2FibGVMYXllckNvbnRleHQpO1xuICBjb25zdCByZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIHJlZik7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHJlZi5jdXJyZW50O1xuICAgIGlmIChub2RlKSB7XG4gICAgICBjb250ZXh0LmJyYW5jaGVzLmFkZChub2RlKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNvbnRleHQuYnJhbmNoZXMuZGVsZXRlKG5vZGUpO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFtjb250ZXh0LmJyYW5jaGVzXSk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5kaXYsIHsgLi4ucHJvcHMsIHJlZjogY29tcG9zZWRSZWZzIH0pO1xufSk7XG5EaXNtaXNzYWJsZUxheWVyQnJhbmNoLmRpc3BsYXlOYW1lID0gQlJBTkNIX05BTUU7XG5mdW5jdGlvbiB1c2VQb2ludGVyRG93bk91dHNpZGUob25Qb2ludGVyRG93bk91dHNpZGUsIG93bmVyRG9jdW1lbnQgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCkge1xuICBjb25zdCBoYW5kbGVQb2ludGVyRG93bk91dHNpZGUgPSB1c2VDYWxsYmFja1JlZihvblBvaW50ZXJEb3duT3V0c2lkZSk7XG4gIGNvbnN0IGlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZUNsaWNrUmVmID0gUmVhY3QudXNlUmVmKCgpID0+IHtcbiAgfSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgIWlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50KSB7XG4gICAgICAgIGxldCBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGhhbmRsZUFuZERpc3BhdGNoQ3VzdG9tRXZlbnQoXG4gICAgICAgICAgICBQT0lOVEVSX0RPV05fT1VUU0lERSxcbiAgICAgICAgICAgIGhhbmRsZVBvaW50ZXJEb3duT3V0c2lkZSxcbiAgICAgICAgICAgIGV2ZW50RGV0YWlsLFxuICAgICAgICAgICAgeyBkaXNjcmV0ZTogdHJ1ZSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQgPSBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MjtcbiAgICAgICAgY29uc3QgZXZlbnREZXRhaWwgPSB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH07XG4gICAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJ0b3VjaFwiKSB7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCk7XG4gICAgICAgICAgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCA9IGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQyO1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja1JlZi5jdXJyZW50KTtcbiAgICAgIH1cbiAgICAgIGlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgfTtcbiAgICBjb25zdCB0aW1lcklkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIH0sIDApO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCk7XG4gICAgfTtcbiAgfSwgW293bmVyRG9jdW1lbnQsIGhhbmRsZVBvaW50ZXJEb3duT3V0c2lkZV0pO1xuICByZXR1cm4ge1xuICAgIC8vIGVuc3VyZXMgd2UgY2hlY2sgUmVhY3QgY29tcG9uZW50IHRyZWUgKG5vdCBqdXN0IERPTSB0cmVlKVxuICAgIG9uUG9pbnRlckRvd25DYXB0dXJlOiAoKSA9PiBpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IHRydWVcbiAgfTtcbn1cbmZ1bmN0aW9uIHVzZUZvY3VzT3V0c2lkZShvbkZvY3VzT3V0c2lkZSwgb3duZXJEb2N1bWVudCA9IGdsb2JhbFRoaXM/LmRvY3VtZW50KSB7XG4gIGNvbnN0IGhhbmRsZUZvY3VzT3V0c2lkZSA9IHVzZUNhbGxiYWNrUmVmKG9uRm9jdXNPdXRzaWRlKTtcbiAgY29uc3QgaXNGb2N1c0luc2lkZVJlYWN0VHJlZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgIWlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCkge1xuICAgICAgICBjb25zdCBldmVudERldGFpbCA9IHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfTtcbiAgICAgICAgaGFuZGxlQW5kRGlzcGF0Y2hDdXN0b21FdmVudChGT0NVU19PVVRTSURFLCBoYW5kbGVGb2N1c091dHNpZGUsIGV2ZW50RGV0YWlsLCB7XG4gICAgICAgICAgZGlzY3JldGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBoYW5kbGVGb2N1cyk7XG4gICAgcmV0dXJuICgpID0+IG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXMpO1xuICB9LCBbb3duZXJEb2N1bWVudCwgaGFuZGxlRm9jdXNPdXRzaWRlXSk7XG4gIHJldHVybiB7XG4gICAgb25Gb2N1c0NhcHR1cmU6ICgpID0+IGlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IHRydWUsXG4gICAgb25CbHVyQ2FwdHVyZTogKCkgPT4gaXNGb2N1c0luc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50ID0gZmFsc2VcbiAgfTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoVXBkYXRlKCkge1xuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChDT05URVhUX1VQREFURSk7XG4gIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuZnVuY3Rpb24gaGFuZGxlQW5kRGlzcGF0Y2hDdXN0b21FdmVudChuYW1lLCBoYW5kbGVyLCBkZXRhaWwsIHsgZGlzY3JldGUgfSkge1xuICBjb25zdCB0YXJnZXQgPSBkZXRhaWwub3JpZ2luYWxFdmVudC50YXJnZXQ7XG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IHRydWUsIGRldGFpbCB9KTtcbiAgaWYgKGhhbmRsZXIpIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgaWYgKGRpc2NyZXRlKSB7XG4gICAgZGlzcGF0Y2hEaXNjcmV0ZUN1c3RvbUV2ZW50KHRhcmdldCwgZXZlbnQpO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxufVxudmFyIFJvb3QgPSBEaXNtaXNzYWJsZUxheWVyO1xudmFyIEJyYW5jaCA9IERpc21pc3NhYmxlTGF5ZXJCcmFuY2g7XG5leHBvcnQge1xuICBCcmFuY2gsXG4gIERpc21pc3NhYmxlTGF5ZXIsXG4gIERpc21pc3NhYmxlTGF5ZXJCcmFuY2gsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL2ZvY3VzLWd1YXJkcy50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIGNvdW50ID0gMDtcbmZ1bmN0aW9uIEZvY3VzR3VhcmRzKHByb3BzKSB7XG4gIHVzZUZvY3VzR3VhcmRzKCk7XG4gIHJldHVybiBwcm9wcy5jaGlsZHJlbjtcbn1cbmZ1bmN0aW9uIHVzZUZvY3VzR3VhcmRzKCkge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVkZ2VHdWFyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtcmFkaXgtZm9jdXMtZ3VhcmRdXCIpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBlZGdlR3VhcmRzWzBdID8/IGNyZWF0ZUZvY3VzR3VhcmQoKSk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWRnZUd1YXJkc1sxXSA/PyBjcmVhdGVGb2N1c0d1YXJkKCkpO1xuICAgIGNvdW50Kys7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtcmFkaXgtZm9jdXMtZ3VhcmRdXCIpLmZvckVhY2goKG5vZGUpID0+IG5vZGUucmVtb3ZlKCkpO1xuICAgICAgfVxuICAgICAgY291bnQtLTtcbiAgICB9O1xuICB9LCBbXSk7XG59XG5mdW5jdGlvbiBjcmVhdGVGb2N1c0d1YXJkKCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1yYWRpeC1mb2N1cy1ndWFyZFwiLCBcIlwiKTtcbiAgZWxlbWVudC50YWJJbmRleCA9IDA7XG4gIGVsZW1lbnQuc3R5bGUub3V0bGluZSA9IFwibm9uZVwiO1xuICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0IHtcbiAgRm9jdXNHdWFyZHMsXG4gIEZvY3VzR3VhcmRzIGFzIFJvb3QsXG4gIHVzZUZvY3VzR3VhcmRzXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9mb2N1cy1zY29wZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWNhbGxiYWNrLXJlZlwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgQVVUT0ZPQ1VTX09OX01PVU5UID0gXCJmb2N1c1Njb3BlLmF1dG9Gb2N1c09uTW91bnRcIjtcbnZhciBBVVRPRk9DVVNfT05fVU5NT1VOVCA9IFwiZm9jdXNTY29wZS5hdXRvRm9jdXNPblVubW91bnRcIjtcbnZhciBFVkVOVF9PUFRJT05TID0geyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogdHJ1ZSB9O1xudmFyIEZPQ1VTX1NDT1BFX05BTUUgPSBcIkZvY3VzU2NvcGVcIjtcbnZhciBGb2N1c1Njb3BlID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICBjb25zdCB7XG4gICAgbG9vcCA9IGZhbHNlLFxuICAgIHRyYXBwZWQgPSBmYWxzZSxcbiAgICBvbk1vdW50QXV0b0ZvY3VzOiBvbk1vdW50QXV0b0ZvY3VzUHJvcCxcbiAgICBvblVubW91bnRBdXRvRm9jdXM6IG9uVW5tb3VudEF1dG9Gb2N1c1Byb3AsXG4gICAgLi4uc2NvcGVQcm9wc1xuICB9ID0gcHJvcHM7XG4gIGNvbnN0IFtjb250YWluZXIsIHNldENvbnRhaW5lcl0gPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgY29uc3Qgb25Nb3VudEF1dG9Gb2N1cyA9IHVzZUNhbGxiYWNrUmVmKG9uTW91bnRBdXRvRm9jdXNQcm9wKTtcbiAgY29uc3Qgb25Vbm1vdW50QXV0b0ZvY3VzID0gdXNlQ2FsbGJhY2tSZWYob25Vbm1vdW50QXV0b0ZvY3VzUHJvcCk7XG4gIGNvbnN0IGxhc3RGb2N1c2VkRWxlbWVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgKG5vZGUpID0+IHNldENvbnRhaW5lcihub2RlKSk7XG4gIGNvbnN0IGZvY3VzU2NvcGUgPSBSZWFjdC51c2VSZWYoe1xuICAgIHBhdXNlZDogZmFsc2UsXG4gICAgcGF1c2UoKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgfSxcbiAgICByZXN1bWUoKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfSkuY3VycmVudDtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHJhcHBlZCkge1xuICAgICAgbGV0IGhhbmRsZUZvY3VzSW4yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGZvY3VzU2NvcGUucGF1c2VkIHx8ICFjb250YWluZXIpIHJldHVybjtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoY29udGFpbmVyLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICBsYXN0Rm9jdXNlZEVsZW1lbnRSZWYuY3VycmVudCA9IHRhcmdldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb2N1cyhsYXN0Rm9jdXNlZEVsZW1lbnRSZWYuY3VycmVudCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGhhbmRsZUZvY3VzT3V0MiA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChmb2N1c1Njb3BlLnBhdXNlZCB8fCAhY29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSBldmVudC5yZWxhdGVkVGFyZ2V0O1xuICAgICAgICBpZiAocmVsYXRlZFRhcmdldCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICBpZiAoIWNvbnRhaW5lci5jb250YWlucyhyZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICAgIGZvY3VzKGxhc3RGb2N1c2VkRWxlbWVudFJlZi5jdXJyZW50LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSwgaGFuZGxlTXV0YXRpb25zMiA9IGZ1bmN0aW9uKG11dGF0aW9ucykge1xuICAgICAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keSkgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICAgIGlmIChtdXRhdGlvbi5yZW1vdmVkTm9kZXMubGVuZ3RoID4gMCkgZm9jdXMoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHZhciBoYW5kbGVGb2N1c0luID0gaGFuZGxlRm9jdXNJbjIsIGhhbmRsZUZvY3VzT3V0ID0gaGFuZGxlRm9jdXNPdXQyLCBoYW5kbGVNdXRhdGlvbnMgPSBoYW5kbGVNdXRhdGlvbnMyO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXNJbjIpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIGhhbmRsZUZvY3VzT3V0Mik7XG4gICAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoaGFuZGxlTXV0YXRpb25zMik7XG4gICAgICBpZiAoY29udGFpbmVyKSBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoY29udGFpbmVyLCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzSW4yKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIGhhbmRsZUZvY3VzT3V0Mik7XG4gICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFt0cmFwcGVkLCBjb250YWluZXIsIGZvY3VzU2NvcGUucGF1c2VkXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgZm9jdXNTY29wZXNTdGFjay5hZGQoZm9jdXNTY29wZSk7XG4gICAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgY29uc3QgaGFzRm9jdXNlZENhbmRpZGF0ZSA9IGNvbnRhaW5lci5jb250YWlucyhwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpO1xuICAgICAgaWYgKCFoYXNGb2N1c2VkQ2FuZGlkYXRlKSB7XG4gICAgICAgIGNvbnN0IG1vdW50RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoQVVUT0ZPQ1VTX09OX01PVU5ULCBFVkVOVF9PUFRJT05TKTtcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX01PVU5ULCBvbk1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobW91bnRFdmVudCk7XG4gICAgICAgIGlmICghbW91bnRFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgZm9jdXNGaXJzdChyZW1vdmVMaW5rcyhnZXRUYWJiYWJsZUNhbmRpZGF0ZXMoY29udGFpbmVyKSksIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGZvY3VzKGNvbnRhaW5lcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fTU9VTlQsIG9uTW91bnRBdXRvRm9jdXMpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCB1bm1vdW50RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoQVVUT0ZPQ1VTX09OX1VOTU9VTlQsIEVWRU5UX09QVElPTlMpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKEFVVE9GT0NVU19PTl9VTk1PVU5ULCBvblVubW91bnRBdXRvRm9jdXMpO1xuICAgICAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KHVubW91bnRFdmVudCk7XG4gICAgICAgICAgaWYgKCF1bm1vdW50RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgZm9jdXMocHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID8/IGRvY3VtZW50LmJvZHksIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fVU5NT1VOVCwgb25Vbm1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgICBmb2N1c1Njb3Blc1N0YWNrLnJlbW92ZShmb2N1c1Njb3BlKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW2NvbnRhaW5lciwgb25Nb3VudEF1dG9Gb2N1cywgb25Vbm1vdW50QXV0b0ZvY3VzLCBmb2N1c1Njb3BlXSk7XG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghbG9vcCAmJiAhdHJhcHBlZCkgcmV0dXJuO1xuICAgICAgaWYgKGZvY3VzU2NvcGUucGF1c2VkKSByZXR1cm47XG4gICAgICBjb25zdCBpc1RhYktleSA9IGV2ZW50LmtleSA9PT0gXCJUYWJcIiAmJiAhZXZlbnQuYWx0S2V5ICYmICFldmVudC5jdHJsS2V5ICYmICFldmVudC5tZXRhS2V5O1xuICAgICAgY29uc3QgZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgaWYgKGlzVGFiS2V5ICYmIGZvY3VzZWRFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcjIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBjb25zdCBbZmlyc3QsIGxhc3RdID0gZ2V0VGFiYmFibGVFZGdlcyhjb250YWluZXIyKTtcbiAgICAgICAgY29uc3QgaGFzVGFiYmFibGVFbGVtZW50c0luc2lkZSA9IGZpcnN0ICYmIGxhc3Q7XG4gICAgICAgIGlmICghaGFzVGFiYmFibGVFbGVtZW50c0luc2lkZSkge1xuICAgICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCA9PT0gY29udGFpbmVyMikgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWV2ZW50LnNoaWZ0S2V5ICYmIGZvY3VzZWRFbGVtZW50ID09PSBsYXN0KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGxvb3ApIGZvY3VzKGZpcnN0LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGZvY3VzZWRFbGVtZW50ID09PSBmaXJzdCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChsb29wKSBmb2N1cyhsYXN0LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtsb29wLCB0cmFwcGVkLCBmb2N1c1Njb3BlLnBhdXNlZF1cbiAgKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmRpdiwgeyB0YWJJbmRleDogLTEsIC4uLnNjb3BlUHJvcHMsIHJlZjogY29tcG9zZWRSZWZzLCBvbktleURvd246IGhhbmRsZUtleURvd24gfSk7XG59KTtcbkZvY3VzU2NvcGUuZGlzcGxheU5hbWUgPSBGT0NVU19TQ09QRV9OQU1FO1xuZnVuY3Rpb24gZm9jdXNGaXJzdChjYW5kaWRhdGVzLCB7IHNlbGVjdCA9IGZhbHNlIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiBjYW5kaWRhdGVzKSB7XG4gICAgZm9jdXMoY2FuZGlkYXRlLCB7IHNlbGVjdCB9KTtcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gcHJldmlvdXNseUZvY3VzZWRFbGVtZW50KSByZXR1cm47XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFRhYmJhYmxlRWRnZXMoY29udGFpbmVyKSB7XG4gIGNvbnN0IGNhbmRpZGF0ZXMgPSBnZXRUYWJiYWJsZUNhbmRpZGF0ZXMoY29udGFpbmVyKTtcbiAgY29uc3QgZmlyc3QgPSBmaW5kVmlzaWJsZShjYW5kaWRhdGVzLCBjb250YWluZXIpO1xuICBjb25zdCBsYXN0ID0gZmluZFZpc2libGUoY2FuZGlkYXRlcy5yZXZlcnNlKCksIGNvbnRhaW5lcik7XG4gIHJldHVybiBbZmlyc3QsIGxhc3RdO1xufVxuZnVuY3Rpb24gZ2V0VGFiYmFibGVDYW5kaWRhdGVzKGNvbnRhaW5lcikge1xuICBjb25zdCBub2RlcyA9IFtdO1xuICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGNvbnRhaW5lciwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIHtcbiAgICBhY2NlcHROb2RlOiAobm9kZSkgPT4ge1xuICAgICAgY29uc3QgaXNIaWRkZW5JbnB1dCA9IG5vZGUudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmIG5vZGUudHlwZSA9PT0gXCJoaWRkZW5cIjtcbiAgICAgIGlmIChub2RlLmRpc2FibGVkIHx8IG5vZGUuaGlkZGVuIHx8IGlzSGlkZGVuSW5wdXQpIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9TS0lQO1xuICAgICAgcmV0dXJuIG5vZGUudGFiSW5kZXggPj0gMCA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX1NLSVA7XG4gICAgfVxuICB9KTtcbiAgd2hpbGUgKHdhbGtlci5uZXh0Tm9kZSgpKSBub2Rlcy5wdXNoKHdhbGtlci5jdXJyZW50Tm9kZSk7XG4gIHJldHVybiBub2Rlcztcbn1cbmZ1bmN0aW9uIGZpbmRWaXNpYmxlKGVsZW1lbnRzLCBjb250YWluZXIpIHtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgaWYgKCFpc0hpZGRlbihlbGVtZW50LCB7IHVwVG86IGNvbnRhaW5lciB9KSkgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzSGlkZGVuKG5vZGUsIHsgdXBUbyB9KSB7XG4gIGlmIChnZXRDb21wdXRlZFN0eWxlKG5vZGUpLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCIpIHJldHVybiB0cnVlO1xuICB3aGlsZSAobm9kZSkge1xuICAgIGlmICh1cFRvICE9PSB2b2lkIDAgJiYgbm9kZSA9PT0gdXBUbykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKG5vZGUpLmRpc3BsYXkgPT09IFwibm9uZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICBub2RlID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzU2VsZWN0YWJsZUlucHV0KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIFwic2VsZWN0XCIgaW4gZWxlbWVudDtcbn1cbmZ1bmN0aW9uIGZvY3VzKGVsZW1lbnQsIHsgc2VsZWN0ID0gZmFsc2UgfSA9IHt9KSB7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuZm9jdXMpIHtcbiAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIGVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgIGlmIChlbGVtZW50ICE9PSBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgJiYgaXNTZWxlY3RhYmxlSW5wdXQoZWxlbWVudCkgJiYgc2VsZWN0KVxuICAgICAgZWxlbWVudC5zZWxlY3QoKTtcbiAgfVxufVxudmFyIGZvY3VzU2NvcGVzU3RhY2sgPSBjcmVhdGVGb2N1c1Njb3Blc1N0YWNrKCk7XG5mdW5jdGlvbiBjcmVhdGVGb2N1c1Njb3Blc1N0YWNrKCkge1xuICBsZXQgc3RhY2sgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBhZGQoZm9jdXNTY29wZSkge1xuICAgICAgY29uc3QgYWN0aXZlRm9jdXNTY29wZSA9IHN0YWNrWzBdO1xuICAgICAgaWYgKGZvY3VzU2NvcGUgIT09IGFjdGl2ZUZvY3VzU2NvcGUpIHtcbiAgICAgICAgYWN0aXZlRm9jdXNTY29wZT8ucGF1c2UoKTtcbiAgICAgIH1cbiAgICAgIHN0YWNrID0gYXJyYXlSZW1vdmUoc3RhY2ssIGZvY3VzU2NvcGUpO1xuICAgICAgc3RhY2sudW5zaGlmdChmb2N1c1Njb3BlKTtcbiAgICB9LFxuICAgIHJlbW92ZShmb2N1c1Njb3BlKSB7XG4gICAgICBzdGFjayA9IGFycmF5UmVtb3ZlKHN0YWNrLCBmb2N1c1Njb3BlKTtcbiAgICAgIHN0YWNrWzBdPy5yZXN1bWUoKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBhcnJheVJlbW92ZShhcnJheSwgaXRlbSkge1xuICBjb25zdCB1cGRhdGVkQXJyYXkgPSBbLi4uYXJyYXldO1xuICBjb25zdCBpbmRleCA9IHVwZGF0ZWRBcnJheS5pbmRleE9mKGl0ZW0pO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgdXBkYXRlZEFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHVwZGF0ZWRBcnJheTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUxpbmtzKGl0ZW1zKSB7XG4gIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSAhPT0gXCJBXCIpO1xufVxudmFyIFJvb3QgPSBGb2N1c1Njb3BlO1xuZXhwb3J0IHtcbiAgRm9jdXNTY29wZSxcbiAgUm9vdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L2lkL3NyYy9pZC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xudmFyIHVzZVJlYWN0SWQgPSBSZWFjdFtcIiB1c2VJZCBcIi50cmltKCkudG9TdHJpbmcoKV0gfHwgKCgpID0+IHZvaWQgMCk7XG52YXIgY291bnQgPSAwO1xuZnVuY3Rpb24gdXNlSWQoZGV0ZXJtaW5pc3RpY0lkKSB7XG4gIGNvbnN0IFtpZCwgc2V0SWRdID0gUmVhY3QudXNlU3RhdGUodXNlUmVhY3RJZCgpKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWRldGVybWluaXN0aWNJZCkgc2V0SWQoKHJlYWN0SWQpID0+IHJlYWN0SWQgPz8gU3RyaW5nKGNvdW50KyspKTtcbiAgfSwgW2RldGVybWluaXN0aWNJZF0pO1xuICByZXR1cm4gZGV0ZXJtaW5pc3RpY0lkIHx8IChpZCA/IGByYWRpeC0ke2lkfWAgOiBcIlwiKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUlkXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9wb3J0YWwudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgUE9SVEFMX05BTUUgPSBcIlBvcnRhbFwiO1xudmFyIFBvcnRhbCA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgY29uc3QgeyBjb250YWluZXI6IGNvbnRhaW5lclByb3AsIC4uLnBvcnRhbFByb3BzIH0gPSBwcm9wcztcbiAgY29uc3QgW21vdW50ZWQsIHNldE1vdW50ZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4gc2V0TW91bnRlZCh0cnVlKSwgW10pO1xuICBjb25zdCBjb250YWluZXIgPSBjb250YWluZXJQcm9wIHx8IG1vdW50ZWQgJiYgZ2xvYmFsVGhpcz8uZG9jdW1lbnQ/LmJvZHk7XG4gIHJldHVybiBjb250YWluZXIgPyBSZWFjdERPTS5jcmVhdGVQb3J0YWwoLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuZGl2LCB7IC4uLnBvcnRhbFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSwgY29udGFpbmVyKSA6IG51bGw7XG59KTtcblBvcnRhbC5kaXNwbGF5TmFtZSA9IFBPUlRBTF9OQU1FO1xudmFyIFJvb3QgPSBQb3J0YWw7XG5leHBvcnQge1xuICBQb3J0YWwsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL3ByZXNlbmNlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QyIGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcblxuLy8gc3JjL3VzZS1zdGF0ZS1tYWNoaW5lLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiB1c2VTdGF0ZU1hY2hpbmUoaW5pdGlhbFN0YXRlLCBtYWNoaW5lKSB7XG4gIHJldHVybiBSZWFjdC51c2VSZWR1Y2VyKChzdGF0ZSwgZXZlbnQpID0+IHtcbiAgICBjb25zdCBuZXh0U3RhdGUgPSBtYWNoaW5lW3N0YXRlXVtldmVudF07XG4gICAgcmV0dXJuIG5leHRTdGF0ZSA/PyBzdGF0ZTtcbiAgfSwgaW5pdGlhbFN0YXRlKTtcbn1cblxuLy8gc3JjL3ByZXNlbmNlLnRzeFxudmFyIFByZXNlbmNlID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJlc2VudCwgY2hpbGRyZW4gfSA9IHByb3BzO1xuICBjb25zdCBwcmVzZW5jZSA9IHVzZVByZXNlbmNlKHByZXNlbnQpO1xuICBjb25zdCBjaGlsZCA9IHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiID8gY2hpbGRyZW4oeyBwcmVzZW50OiBwcmVzZW5jZS5pc1ByZXNlbnQgfSkgOiBSZWFjdDIuQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG4gIGNvbnN0IHJlZiA9IHVzZUNvbXBvc2VkUmVmcyhwcmVzZW5jZS5yZWYsIGdldEVsZW1lbnRSZWYoY2hpbGQpKTtcbiAgY29uc3QgZm9yY2VNb3VudCA9IHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiO1xuICByZXR1cm4gZm9yY2VNb3VudCB8fCBwcmVzZW5jZS5pc1ByZXNlbnQgPyBSZWFjdDIuY2xvbmVFbGVtZW50KGNoaWxkLCB7IHJlZiB9KSA6IG51bGw7XG59O1xuUHJlc2VuY2UuZGlzcGxheU5hbWUgPSBcIlByZXNlbmNlXCI7XG5mdW5jdGlvbiB1c2VQcmVzZW5jZShwcmVzZW50KSB7XG4gIGNvbnN0IFtub2RlLCBzZXROb2RlXSA9IFJlYWN0Mi51c2VTdGF0ZSgpO1xuICBjb25zdCBzdHlsZXNSZWYgPSBSZWFjdDIudXNlUmVmKG51bGwpO1xuICBjb25zdCBwcmV2UHJlc2VudFJlZiA9IFJlYWN0Mi51c2VSZWYocHJlc2VudCk7XG4gIGNvbnN0IHByZXZBbmltYXRpb25OYW1lUmVmID0gUmVhY3QyLnVzZVJlZihcIm5vbmVcIik7XG4gIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHByZXNlbnQgPyBcIm1vdW50ZWRcIiA6IFwidW5tb3VudGVkXCI7XG4gIGNvbnN0IFtzdGF0ZSwgc2VuZF0gPSB1c2VTdGF0ZU1hY2hpbmUoaW5pdGlhbFN0YXRlLCB7XG4gICAgbW91bnRlZDoge1xuICAgICAgVU5NT1VOVDogXCJ1bm1vdW50ZWRcIixcbiAgICAgIEFOSU1BVElPTl9PVVQ6IFwidW5tb3VudFN1c3BlbmRlZFwiXG4gICAgfSxcbiAgICB1bm1vdW50U3VzcGVuZGVkOiB7XG4gICAgICBNT1VOVDogXCJtb3VudGVkXCIsXG4gICAgICBBTklNQVRJT05fRU5EOiBcInVubW91bnRlZFwiXG4gICAgfSxcbiAgICB1bm1vdW50ZWQ6IHtcbiAgICAgIE1PVU5UOiBcIm1vdW50ZWRcIlxuICAgIH1cbiAgfSk7XG4gIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRBbmltYXRpb25OYW1lID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXNSZWYuY3VycmVudCk7XG4gICAgcHJldkFuaW1hdGlvbk5hbWVSZWYuY3VycmVudCA9IHN0YXRlID09PSBcIm1vdW50ZWRcIiA/IGN1cnJlbnRBbmltYXRpb25OYW1lIDogXCJub25lXCI7XG4gIH0sIFtzdGF0ZV0pO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHN0eWxlcyA9IHN0eWxlc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IHdhc1ByZXNlbnQgPSBwcmV2UHJlc2VudFJlZi5jdXJyZW50O1xuICAgIGNvbnN0IGhhc1ByZXNlbnRDaGFuZ2VkID0gd2FzUHJlc2VudCAhPT0gcHJlc2VudDtcbiAgICBpZiAoaGFzUHJlc2VudENoYW5nZWQpIHtcbiAgICAgIGNvbnN0IHByZXZBbmltYXRpb25OYW1lID0gcHJldkFuaW1hdGlvbk5hbWVSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IGN1cnJlbnRBbmltYXRpb25OYW1lID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXMpO1xuICAgICAgaWYgKHByZXNlbnQpIHtcbiAgICAgICAgc2VuZChcIk1PVU5UXCIpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50QW5pbWF0aW9uTmFtZSA9PT0gXCJub25lXCIgfHwgc3R5bGVzPy5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgICBzZW5kKFwiVU5NT1VOVFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGlzQW5pbWF0aW5nID0gcHJldkFuaW1hdGlvbk5hbWUgIT09IGN1cnJlbnRBbmltYXRpb25OYW1lO1xuICAgICAgICBpZiAod2FzUHJlc2VudCAmJiBpc0FuaW1hdGluZykge1xuICAgICAgICAgIHNlbmQoXCJBTklNQVRJT05fT1VUXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbmQoXCJVTk1PVU5UXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwcmV2UHJlc2VudFJlZi5jdXJyZW50ID0gcHJlc2VudDtcbiAgICB9XG4gIH0sIFtwcmVzZW50LCBzZW5kXSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIGxldCB0aW1lb3V0SWQ7XG4gICAgICBjb25zdCBvd25lcldpbmRvdyA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyA/PyB3aW5kb3c7XG4gICAgICBjb25zdCBoYW5kbGVBbmltYXRpb25FbmQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEFuaW1hdGlvbk5hbWUgPSBnZXRBbmltYXRpb25OYW1lKHN0eWxlc1JlZi5jdXJyZW50KTtcbiAgICAgICAgY29uc3QgaXNDdXJyZW50QW5pbWF0aW9uID0gY3VycmVudEFuaW1hdGlvbk5hbWUuaW5jbHVkZXMoQ1NTLmVzY2FwZShldmVudC5hbmltYXRpb25OYW1lKSk7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IG5vZGUgJiYgaXNDdXJyZW50QW5pbWF0aW9uKSB7XG4gICAgICAgICAgc2VuZChcIkFOSU1BVElPTl9FTkRcIik7XG4gICAgICAgICAgaWYgKCFwcmV2UHJlc2VudFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RmlsbE1vZGUgPSBub2RlLnN0eWxlLmFuaW1hdGlvbkZpbGxNb2RlO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZSA9IFwiZm9yd2FyZHNcIjtcbiAgICAgICAgICAgIHRpbWVvdXRJZCA9IG93bmVyV2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAobm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZSA9PT0gXCJmb3J3YXJkc1wiKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZSA9IGN1cnJlbnRGaWxsTW9kZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgaGFuZGxlQW5pbWF0aW9uU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbm9kZSkge1xuICAgICAgICAgIHByZXZBbmltYXRpb25OYW1lUmVmLmN1cnJlbnQgPSBnZXRBbmltYXRpb25OYW1lKHN0eWxlc1JlZi5jdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbnN0YXJ0XCIsIGhhbmRsZUFuaW1hdGlvblN0YXJ0KTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmNhbmNlbFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBvd25lcldpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uc3RhcnRcIiwgaGFuZGxlQW5pbWF0aW9uU3RhcnQpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25jYW5jZWxcIiwgaGFuZGxlQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzZW5kKFwiQU5JTUFUSU9OX0VORFwiKTtcbiAgICB9XG4gIH0sIFtub2RlLCBzZW5kXSk7XG4gIHJldHVybiB7XG4gICAgaXNQcmVzZW50OiBbXCJtb3VudGVkXCIsIFwidW5tb3VudFN1c3BlbmRlZFwiXS5pbmNsdWRlcyhzdGF0ZSksXG4gICAgcmVmOiBSZWFjdDIudXNlQ2FsbGJhY2soKG5vZGUyKSA9PiB7XG4gICAgICBzdHlsZXNSZWYuY3VycmVudCA9IG5vZGUyID8gZ2V0Q29tcHV0ZWRTdHlsZShub2RlMikgOiBudWxsO1xuICAgICAgc2V0Tm9kZShub2RlMik7XG4gICAgfSwgW10pXG4gIH07XG59XG5mdW5jdGlvbiBnZXRBbmltYXRpb25OYW1lKHN0eWxlcykge1xuICByZXR1cm4gc3R5bGVzPy5hbmltYXRpb25OYW1lIHx8IFwibm9uZVwiO1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudFJlZihlbGVtZW50KSB7XG4gIGxldCBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQucHJvcHMsIFwicmVmXCIpPy5nZXQ7XG4gIGxldCBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnJlZjtcbiAgfVxuICBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQsIFwicmVmXCIpPy5nZXQ7XG4gIG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmO1xuICB9XG4gIHJldHVybiBlbGVtZW50LnByb3BzLnJlZiB8fCBlbGVtZW50LnJlZjtcbn1cbnZhciBSb290ID0gUHJlc2VuY2U7XG5leHBvcnQge1xuICBQcmVzZW5jZSxcbiAgUm9vdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy9wcmltaXRpdmUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IGNyZWF0ZVNsb3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXNsb3RcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIE5PREVTID0gW1xuICBcImFcIixcbiAgXCJidXR0b25cIixcbiAgXCJkaXZcIixcbiAgXCJmb3JtXCIsXG4gIFwiaDJcIixcbiAgXCJoM1wiLFxuICBcImltZ1wiLFxuICBcImlucHV0XCIsXG4gIFwibGFiZWxcIixcbiAgXCJsaVwiLFxuICBcIm5hdlwiLFxuICBcIm9sXCIsXG4gIFwicFwiLFxuICBcInNlbGVjdFwiLFxuICBcInNwYW5cIixcbiAgXCJzdmdcIixcbiAgXCJ1bFwiXG5dO1xudmFyIFByaW1pdGl2ZSA9IE5PREVTLnJlZHVjZSgocHJpbWl0aXZlLCBub2RlKSA9PiB7XG4gIGNvbnN0IFNsb3QgPSBjcmVhdGVTbG90KGBQcmltaXRpdmUuJHtub2RlfWApO1xuICBjb25zdCBOb2RlID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgYXNDaGlsZCwgLi4ucHJpbWl0aXZlUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IENvbXAgPSBhc0NoaWxkID8gU2xvdCA6IG5vZGU7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvd1tTeW1ib2wuZm9yKFwicmFkaXgtdWlcIildID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goQ29tcCwgeyAuLi5wcmltaXRpdmVQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSk7XG4gIH0pO1xuICBOb2RlLmRpc3BsYXlOYW1lID0gYFByaW1pdGl2ZS4ke25vZGV9YDtcbiAgcmV0dXJuIHsgLi4ucHJpbWl0aXZlLCBbbm9kZV06IE5vZGUgfTtcbn0sIHt9KTtcbmZ1bmN0aW9uIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudCh0YXJnZXQsIGV2ZW50KSB7XG4gIGlmICh0YXJnZXQpIFJlYWN0RE9NLmZsdXNoU3luYygoKSA9PiB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCkpO1xufVxudmFyIFJvb3QgPSBQcmltaXRpdmU7XG5leHBvcnQge1xuICBQcmltaXRpdmUsXG4gIFJvb3QsXG4gIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy9zbG90LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBGcmFnbWVudCBhcyBGcmFnbWVudDIsIGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3Qob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3RDbG9uZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90Q2xvbmUob3duZXJOYW1lKTtcbiAgY29uc3QgU2xvdDIgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjaGlsZHJlbkFycmF5ID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbik7XG4gICAgY29uc3Qgc2xvdHRhYmxlID0gY2hpbGRyZW5BcnJheS5maW5kKGlzU2xvdHRhYmxlKTtcbiAgICBpZiAoc2xvdHRhYmxlKSB7XG4gICAgICBjb25zdCBuZXdFbGVtZW50ID0gc2xvdHRhYmxlLnByb3BzLmNoaWxkcmVuO1xuICAgICAgY29uc3QgbmV3Q2hpbGRyZW4gPSBjaGlsZHJlbkFycmF5Lm1hcCgoY2hpbGQpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkID09PSBzbG90dGFibGUpIHtcbiAgICAgICAgICBpZiAoUmVhY3QuQ2hpbGRyZW4uY291bnQobmV3RWxlbWVudCkgPiAxKSByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKTtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBuZXdFbGVtZW50LnByb3BzLmNoaWxkcmVuIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goU2xvdENsb25lLCB7IC4uLnNsb3RQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYsIGNoaWxkcmVuOiBSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXdFbGVtZW50KSA/IFJlYWN0LmNsb25lRWxlbWVudChuZXdFbGVtZW50LCB2b2lkIDAsIG5ld0NoaWxkcmVuKSA6IG51bGwgfSk7XG4gICAgfVxuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbiB9KTtcbiAgfSk7XG4gIFNsb3QyLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90YDtcbiAgcmV0dXJuIFNsb3QyO1xufVxudmFyIFNsb3QgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdChcIlNsb3RcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgICBjb25zdCBjaGlsZHJlblJlZiA9IGdldEVsZW1lbnRSZWYoY2hpbGRyZW4pO1xuICAgICAgY29uc3QgcHJvcHMyID0gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkcmVuLnByb3BzKTtcbiAgICAgIGlmIChjaGlsZHJlbi50eXBlICE9PSBSZWFjdC5GcmFnbWVudCkge1xuICAgICAgICBwcm9wczIucmVmID0gZm9yd2FyZGVkUmVmID8gY29tcG9zZVJlZnMoZm9yd2FyZGVkUmVmLCBjaGlsZHJlblJlZikgOiBjaGlsZHJlblJlZjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGRyZW4sIHByb3BzMik7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbikgPiAxID8gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKSA6IG51bGw7XG4gIH0pO1xuICBTbG90Q2xvbmUuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3RDbG9uZWA7XG4gIHJldHVybiBTbG90Q2xvbmU7XG59XG52YXIgU0xPVFRBQkxFX0lERU5USUZJRVIgPSBTeW1ib2woXCJyYWRpeC5zbG90dGFibGVcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdHRhYmxlKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90dGFibGUyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KEZyYWdtZW50MiwgeyBjaGlsZHJlbiB9KTtcbiAgfTtcbiAgU2xvdHRhYmxlMi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdHRhYmxlYDtcbiAgU2xvdHRhYmxlMi5fX3JhZGl4SWQgPSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbiAgcmV0dXJuIFNsb3R0YWJsZTI7XG59XG52YXIgU2xvdHRhYmxlID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3R0YWJsZShcIlNsb3R0YWJsZVwiKTtcbmZ1bmN0aW9uIGlzU2xvdHRhYmxlKGNoaWxkKSB7XG4gIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkgJiYgdHlwZW9mIGNoaWxkLnR5cGUgPT09IFwiZnVuY3Rpb25cIiAmJiBcIl9fcmFkaXhJZFwiIGluIGNoaWxkLnR5cGUgJiYgY2hpbGQudHlwZS5fX3JhZGl4SWQgPT09IFNMT1RUQUJMRV9JREVOVElGSUVSO1xufVxuZnVuY3Rpb24gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkUHJvcHMpIHtcbiAgY29uc3Qgb3ZlcnJpZGVQcm9wcyA9IHsgLi4uY2hpbGRQcm9wcyB9O1xuICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIGNoaWxkUHJvcHMpIHtcbiAgICBjb25zdCBzbG90UHJvcFZhbHVlID0gc2xvdFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBjaGlsZFByb3BWYWx1ZSA9IGNoaWxkUHJvcHNbcHJvcE5hbWVdO1xuICAgIGNvbnN0IGlzSGFuZGxlciA9IC9eb25bQS1aXS8udGVzdChwcm9wTmFtZSk7XG4gICAgaWYgKGlzSGFuZGxlcikge1xuICAgICAgaWYgKHNsb3RQcm9wVmFsdWUgJiYgY2hpbGRQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNoaWxkUHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHNsb3RQcm9wVmFsdWUoLi4uYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2xvdFByb3BWYWx1ZSkge1xuICAgICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHNsb3RQcm9wVmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHsgLi4uc2xvdFByb3BWYWx1ZSwgLi4uY2hpbGRQcm9wVmFsdWUgfTtcbiAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSBcImNsYXNzTmFtZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IFtzbG90UHJvcFZhbHVlLCBjaGlsZFByb3BWYWx1ZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyAuLi5zbG90UHJvcHMsIC4uLm92ZXJyaWRlUHJvcHMgfTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRSZWYoZWxlbWVudCkge1xuICBsZXQgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LnByb3BzLCBcInJlZlwiKT8uZ2V0O1xuICBsZXQgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5yZWY7XG4gIH1cbiAgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LCBcInJlZlwiKT8uZ2V0O1xuICBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnByb3BzLnJlZjtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWYgfHwgZWxlbWVudC5yZWY7XG59XG5leHBvcnQge1xuICBTbG90IGFzIFJvb3QsXG4gIFNsb3QsXG4gIFNsb3R0YWJsZSxcbiAgY3JlYXRlU2xvdCxcbiAgY3JlYXRlU2xvdHRhYmxlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvdXNlLWNhbGxiYWNrLXJlZi9zcmMvdXNlLWNhbGxiYWNrLXJlZi50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gdXNlQ2FsbGJhY2tSZWYoY2FsbGJhY2spIHtcbiAgY29uc3QgY2FsbGJhY2tSZWYgPSBSZWFjdC51c2VSZWYoY2FsbGJhY2spO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNhbGxiYWNrUmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgfSk7XG4gIHJldHVybiBSZWFjdC51c2VNZW1vKCgpID0+ICguLi5hcmdzKSA9PiBjYWxsYmFja1JlZi5jdXJyZW50Py4oLi4uYXJncyksIFtdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUNhbGxiYWNrUmVmXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3VzZS1jb250cm9sbGFibGUtc3RhdGUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbnZhciB1c2VJbnNlcnRpb25FZmZlY3QgPSBSZWFjdFtcIiB1c2VJbnNlcnRpb25FZmZlY3QgXCIudHJpbSgpLnRvU3RyaW5nKCldIHx8IHVzZUxheW91dEVmZmVjdDtcbmZ1bmN0aW9uIHVzZUNvbnRyb2xsYWJsZVN0YXRlKHtcbiAgcHJvcCxcbiAgZGVmYXVsdFByb3AsXG4gIG9uQ2hhbmdlID0gKCkgPT4ge1xuICB9LFxuICBjYWxsZXJcbn0pIHtcbiAgY29uc3QgW3VuY29udHJvbGxlZFByb3AsIHNldFVuY29udHJvbGxlZFByb3AsIG9uQ2hhbmdlUmVmXSA9IHVzZVVuY29udHJvbGxlZFN0YXRlKHtcbiAgICBkZWZhdWx0UHJvcCxcbiAgICBvbkNoYW5nZVxuICB9KTtcbiAgY29uc3QgaXNDb250cm9sbGVkID0gcHJvcCAhPT0gdm9pZCAwO1xuICBjb25zdCB2YWx1ZSA9IGlzQ29udHJvbGxlZCA/IHByb3AgOiB1bmNvbnRyb2xsZWRQcm9wO1xuICBpZiAodHJ1ZSkge1xuICAgIGNvbnN0IGlzQ29udHJvbGxlZFJlZiA9IFJlYWN0LnVzZVJlZihwcm9wICE9PSB2b2lkIDApO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCB3YXNDb250cm9sbGVkID0gaXNDb250cm9sbGVkUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAod2FzQ29udHJvbGxlZCAhPT0gaXNDb250cm9sbGVkKSB7XG4gICAgICAgIGNvbnN0IGZyb20gPSB3YXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zdCB0byA9IGlzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGAke2NhbGxlcn0gaXMgY2hhbmdpbmcgZnJvbSAke2Zyb219IHRvICR7dG99LiBDb21wb25lbnRzIHNob3VsZCBub3Qgc3dpdGNoIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHZhbHVlIGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIGNvbXBvbmVudC5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpc0NvbnRyb2xsZWRSZWYuY3VycmVudCA9IGlzQ29udHJvbGxlZDtcbiAgICB9LCBbaXNDb250cm9sbGVkLCBjYWxsZXJdKTtcbiAgfVxuICBjb25zdCBzZXRWYWx1ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChuZXh0VmFsdWUpID0+IHtcbiAgICAgIGlmIChpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgY29uc3QgdmFsdWUyID0gaXNGdW5jdGlvbihuZXh0VmFsdWUpID8gbmV4dFZhbHVlKHByb3ApIDogbmV4dFZhbHVlO1xuICAgICAgICBpZiAodmFsdWUyICE9PSBwcm9wKSB7XG4gICAgICAgICAgb25DaGFuZ2VSZWYuY3VycmVudD8uKHZhbHVlMik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFVuY29udHJvbGxlZFByb3AobmV4dFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtpc0NvbnRyb2xsZWQsIHByb3AsIHNldFVuY29udHJvbGxlZFByb3AsIG9uQ2hhbmdlUmVmXVxuICApO1xuICByZXR1cm4gW3ZhbHVlLCBzZXRWYWx1ZV07XG59XG5mdW5jdGlvbiB1c2VVbmNvbnRyb2xsZWRTdGF0ZSh7XG4gIGRlZmF1bHRQcm9wLFxuICBvbkNoYW5nZVxufSkge1xuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlKGRlZmF1bHRQcm9wKTtcbiAgY29uc3QgcHJldlZhbHVlUmVmID0gUmVhY3QudXNlUmVmKHZhbHVlKTtcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSBSZWFjdC51c2VSZWYob25DaGFuZ2UpO1xuICB1c2VJbnNlcnRpb25FZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQgPSBvbkNoYW5nZTtcbiAgfSwgW29uQ2hhbmdlXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByZXZWYWx1ZVJlZi5jdXJyZW50ICE9PSB2YWx1ZSkge1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudD8uKHZhbHVlKTtcbiAgICAgIHByZXZWYWx1ZVJlZi5jdXJyZW50ID0gdmFsdWU7XG4gICAgfVxuICB9LCBbdmFsdWUsIHByZXZWYWx1ZVJlZl0pO1xuICByZXR1cm4gW3ZhbHVlLCBzZXRWYWx1ZSwgb25DaGFuZ2VSZWZdO1xufVxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbi8vIHNyYy91c2UtY29udHJvbGxhYmxlLXN0YXRlLXJlZHVjZXIudHN4XG5pbXBvcnQgKiBhcyBSZWFjdDIgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VFZmZlY3RFdmVudCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWVmZmVjdC1ldmVudFwiO1xudmFyIFNZTkNfU1RBVEUgPSBTeW1ib2woXCJSQURJWDpTWU5DX1NUQVRFXCIpO1xuZnVuY3Rpb24gdXNlQ29udHJvbGxhYmxlU3RhdGVSZWR1Y2VyKHJlZHVjZXIsIHVzZXJBcmdzLCBpbml0aWFsQXJnLCBpbml0KSB7XG4gIGNvbnN0IHsgcHJvcDogY29udHJvbGxlZFN0YXRlLCBkZWZhdWx0UHJvcCwgb25DaGFuZ2U6IG9uQ2hhbmdlUHJvcCwgY2FsbGVyIH0gPSB1c2VyQXJncztcbiAgY29uc3QgaXNDb250cm9sbGVkID0gY29udHJvbGxlZFN0YXRlICE9PSB2b2lkIDA7XG4gIGNvbnN0IG9uQ2hhbmdlID0gdXNlRWZmZWN0RXZlbnQob25DaGFuZ2VQcm9wKTtcbiAgaWYgKHRydWUpIHtcbiAgICBjb25zdCBpc0NvbnRyb2xsZWRSZWYgPSBSZWFjdDIudXNlUmVmKGNvbnRyb2xsZWRTdGF0ZSAhPT0gdm9pZCAwKTtcbiAgICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IHdhc0NvbnRyb2xsZWQgPSBpc0NvbnRyb2xsZWRSZWYuY3VycmVudDtcbiAgICAgIGlmICh3YXNDb250cm9sbGVkICE9PSBpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgY29uc3QgZnJvbSA9IHdhc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCI7XG4gICAgICAgIGNvbnN0IHRvID0gaXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYCR7Y2FsbGVyfSBpcyBjaGFuZ2luZyBmcm9tICR7ZnJvbX0gdG8gJHt0b30uIENvbXBvbmVudHMgc2hvdWxkIG5vdCBzd2l0Y2ggZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgdmFsdWUgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgY29tcG9uZW50LmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlzQ29udHJvbGxlZFJlZi5jdXJyZW50ID0gaXNDb250cm9sbGVkO1xuICAgIH0sIFtpc0NvbnRyb2xsZWQsIGNhbGxlcl0pO1xuICB9XG4gIGNvbnN0IGFyZ3MgPSBbeyAuLi5pbml0aWFsQXJnLCBzdGF0ZTogZGVmYXVsdFByb3AgfV07XG4gIGlmIChpbml0KSB7XG4gICAgYXJncy5wdXNoKGluaXQpO1xuICB9XG4gIGNvbnN0IFtpbnRlcm5hbFN0YXRlLCBkaXNwYXRjaF0gPSBSZWFjdDIudXNlUmVkdWNlcihcbiAgICAoc3RhdGUyLCBhY3Rpb24pID0+IHtcbiAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gU1lOQ19TVEFURSkge1xuICAgICAgICByZXR1cm4geyAuLi5zdGF0ZTIsIHN0YXRlOiBhY3Rpb24uc3RhdGUgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5leHQgPSByZWR1Y2VyKHN0YXRlMiwgYWN0aW9uKTtcbiAgICAgIGlmIChpc0NvbnRyb2xsZWQgJiYgIU9iamVjdC5pcyhuZXh0LnN0YXRlLCBzdGF0ZTIuc3RhdGUpKSB7XG4gICAgICAgIG9uQ2hhbmdlKG5leHQuc3RhdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSxcbiAgICAuLi5hcmdzXG4gICk7XG4gIGNvbnN0IHVuY29udHJvbGxlZFN0YXRlID0gaW50ZXJuYWxTdGF0ZS5zdGF0ZTtcbiAgY29uc3QgcHJldlZhbHVlUmVmID0gUmVhY3QyLnVzZVJlZih1bmNvbnRyb2xsZWRTdGF0ZSk7XG4gIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwcmV2VmFsdWVSZWYuY3VycmVudCAhPT0gdW5jb250cm9sbGVkU3RhdGUpIHtcbiAgICAgIHByZXZWYWx1ZVJlZi5jdXJyZW50ID0gdW5jb250cm9sbGVkU3RhdGU7XG4gICAgICBpZiAoIWlzQ29udHJvbGxlZCkge1xuICAgICAgICBvbkNoYW5nZSh1bmNvbnRyb2xsZWRTdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbb25DaGFuZ2UsIHVuY29udHJvbGxlZFN0YXRlLCBwcmV2VmFsdWVSZWYsIGlzQ29udHJvbGxlZF0pO1xuICBjb25zdCBzdGF0ZSA9IFJlYWN0Mi51c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBpc0NvbnRyb2xsZWQyID0gY29udHJvbGxlZFN0YXRlICE9PSB2b2lkIDA7XG4gICAgaWYgKGlzQ29udHJvbGxlZDIpIHtcbiAgICAgIHJldHVybiB7IC4uLmludGVybmFsU3RhdGUsIHN0YXRlOiBjb250cm9sbGVkU3RhdGUgfTtcbiAgICB9XG4gICAgcmV0dXJuIGludGVybmFsU3RhdGU7XG4gIH0sIFtpbnRlcm5hbFN0YXRlLCBjb250cm9sbGVkU3RhdGVdKTtcbiAgUmVhY3QyLnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzQ29udHJvbGxlZCAmJiAhT2JqZWN0LmlzKGNvbnRyb2xsZWRTdGF0ZSwgaW50ZXJuYWxTdGF0ZS5zdGF0ZSkpIHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogU1lOQ19TVEFURSwgc3RhdGU6IGNvbnRyb2xsZWRTdGF0ZSB9KTtcbiAgICB9XG4gIH0sIFtjb250cm9sbGVkU3RhdGUsIGludGVybmFsU3RhdGUuc3RhdGUsIGlzQ29udHJvbGxlZF0pO1xuICByZXR1cm4gW3N0YXRlLCBkaXNwYXRjaF07XG59XG5leHBvcnQge1xuICB1c2VDb250cm9sbGFibGVTdGF0ZSxcbiAgdXNlQ29udHJvbGxhYmxlU3RhdGVSZWR1Y2VyXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3VzZS1lZmZlY3QtZXZlbnQudHN4XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbnZhciB1c2VSZWFjdEVmZmVjdEV2ZW50ID0gUmVhY3RbXCIgdXNlRWZmZWN0RXZlbnQgXCIudHJpbSgpLnRvU3RyaW5nKCldO1xudmFyIHVzZVJlYWN0SW5zZXJ0aW9uRWZmZWN0ID0gUmVhY3RbXCIgdXNlSW5zZXJ0aW9uRWZmZWN0IFwiLnRyaW0oKS50b1N0cmluZygpXTtcbmZ1bmN0aW9uIHVzZUVmZmVjdEV2ZW50KGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgdXNlUmVhY3RFZmZlY3RFdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHVzZVJlYWN0RWZmZWN0RXZlbnQoY2FsbGJhY2spO1xuICB9XG4gIGNvbnN0IHJlZiA9IFJlYWN0LnVzZVJlZigoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNhbGwgYW4gZXZlbnQgaGFuZGxlciB3aGlsZSByZW5kZXJpbmcuXCIpO1xuICB9KTtcbiAgaWYgKHR5cGVvZiB1c2VSZWFjdEluc2VydGlvbkVmZmVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdXNlUmVhY3RJbnNlcnRpb25FZmZlY3QoKCkgPT4ge1xuICAgICAgcmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgICAgcmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiAoLi4uYXJncykgPT4gcmVmLmN1cnJlbnQ/LiguLi5hcmdzKSwgW10pO1xufVxuZXhwb3J0IHtcbiAgdXNlRWZmZWN0RXZlbnRcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC91c2UtZXNjYXBlLWtleWRvd24vc3JjL3VzZS1lc2NhcGUta2V5ZG93bi50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWZcIjtcbmZ1bmN0aW9uIHVzZUVzY2FwZUtleWRvd24ob25Fc2NhcGVLZXlEb3duUHJvcCwgb3duZXJEb2N1bWVudCA9IGdsb2JhbFRoaXM/LmRvY3VtZW50KSB7XG4gIGNvbnN0IG9uRXNjYXBlS2V5RG93biA9IHVzZUNhbGxiYWNrUmVmKG9uRXNjYXBlS2V5RG93blByb3ApO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgb25Fc2NhcGVLZXlEb3duKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RG93biwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgIHJldHVybiAoKSA9PiBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgfSwgW29uRXNjYXBlS2V5RG93biwgb3duZXJEb2N1bWVudF0pO1xufVxuZXhwb3J0IHtcbiAgdXNlRXNjYXBlS2V5ZG93blxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L3VzZS1sYXlvdXQtZWZmZWN0L3NyYy91c2UtbGF5b3V0LWVmZmVjdC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIHVzZUxheW91dEVmZmVjdDIgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCA/IFJlYWN0LnVzZUxheW91dEVmZmVjdCA6ICgpID0+IHtcbn07XG5leHBvcnQge1xuICB1c2VMYXlvdXRFZmZlY3QyIGFzIHVzZUxheW91dEVmZmVjdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cblxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XG4gIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XG4gIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG5cbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcbiAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0O1xuICB9XG4gIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcbiAgdmFyIHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICB0W3BdID0gc1twXTtcbiAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcbiAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XG4gIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XG4gIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xuICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcbiAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xuICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcbiAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xuICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XG4gICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xuICAgICAgfVxuICB9XG4gIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcbiAgZG9uZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xuICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcbiAgfVxuICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xuICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIG9bazJdID0gbVtrXTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcbiAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xuICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgfVxuICB9O1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xuICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gIGlmICghbSkgcmV0dXJuIG87XG4gIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICB0cnkge1xuICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gIGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgIH1cbiAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICB9XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XG4gIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xuICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgcltrXSA9IGFbal07XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgfVxuICB9XG4gIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XG4gIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcbiAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcbiAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIGFyID0gW107XG4gICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcbiAgICByZXR1cm4gYXI7XG4gIH07XG4gIHJldHVybiBvd25LZXlzKG8pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xuICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xuICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XG4gIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xuICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcbiAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XG4gICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICB2YXIgciwgcyA9IDA7XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xuICAgICAgICBpZiAoci5kaXNwb3NlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xuICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBzIHw9IDE7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcbiAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XG4gICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcbiAgICAgIH0pO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19lc0RlY29yYXRlLFxuICBfX3J1bkluaXRpYWxpemVycyxcbiAgX19wcm9wS2V5LFxuICBfX3NldEZ1bmN0aW9uTmFtZSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG4gIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxufTtcbiJdLCJuYW1lcyI6WyJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiUmVhY3QiLCJEaWFsb2dQcmltaXRpdmUiLCJYIiwiY24iLCJEaWFsb2ciLCJSb290IiwiRGlhbG9nVHJpZ2dlciIsIlRyaWdnZXIiLCJEaWFsb2dQb3J0YWwiLCJQb3J0YWwiLCJEaWFsb2dDbG9zZSIsIkNsb3NlIiwiRGlhbG9nT3ZlcmxheSIsImZvcndhcmRSZWYiLCJfcmVmIiwicmVmIiwiY2xhc3NOYW1lIiwicHJvcHMiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJfZXhjbHVkZWQiLCJPdmVybGF5IiwiX29iamVjdFNwcmVhZCIsImRpc3BsYXlOYW1lIiwiRGlhbG9nQ29udGVudCIsIl9yZWYyIiwiY2hpbGRyZW4iLCJfZXhjbHVkZWQyIiwiQ29udGVudCIsIkRpYWxvZ0hlYWRlciIsIl9yZWYzIiwiX2V4Y2x1ZGVkMyIsIkRpYWxvZ0Zvb3RlciIsIl9yZWY0IiwiX2V4Y2x1ZGVkNCIsIkRpYWxvZ1RpdGxlIiwiX3JlZjUiLCJfZXhjbHVkZWQ1IiwiVGl0bGUiLCJEaWFsb2dEZXNjcmlwdGlvbiIsIl9yZWY2IiwiX2V4Y2x1ZGVkNiIsIkRlc2NyaXB0aW9uIiwiSW5wdXQiLCJ0eXBlIiwiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsIm5leHQiLCJwdXNoIiwiaXNBcnJheSIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiQnV0dG9uIiwiQ2FyZCIsIkNhcmRDb250ZW50IiwiQ2FyZERlc2NyaXB0aW9uIiwiQ2FyZEhlYWRlciIsIkNhcmRUaXRsZSIsIlVzZXIiLCJFZGl0IiwiTG9nT3V0IiwiU2F2ZSIsIkV5ZSIsIkV5ZU9mZiIsImFwaSIsInVzZUF1dGgiLCJQcm9maWxlIiwiX3VzZXIkcm9sZSIsIl91c2VBdXRoIiwidXNlciIsImxvZ291dCIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwicHJvZmlsZURhdGEiLCJzZXRQcm9maWxlRGF0YSIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2Iiwic2hvd0VkaXRGb3JtIiwic2V0U2hvd0VkaXRGb3JtIiwiX3VzZVN0YXRlNyIsIl91c2VTdGF0ZTgiLCJzaG93UGFzc3dvcmQiLCJzZXRTaG93UGFzc3dvcmQiLCJfdXNlU3RhdGU5IiwiZW1haWwiLCJwYXNzd29yZCIsInBob25lIiwiYWRkcmVzcyIsIl91c2VTdGF0ZTAiLCJmb3JtRGF0YSIsInNldEZvcm1EYXRhIiwiZmV0Y2hQcm9maWxlIiwiX2NhbGxlZSIsInJlc3BvbnNlIiwiX3Jlc3BvbnNlJGRhdGEkdXNlciIsIl9yZXNwb25zZSRkYXRhJHVzZXIyIiwiX3Jlc3BvbnNlJGRhdGEkZGF0YSIsIl9yZXNwb25zZSRkYXRhJGRhdGEyIiwiX3QiLCJfY29udGV4dCIsImdldCIsImRhdGEiLCJzdWNjZXNzIiwiY29uc29sZSIsImVycm9yIiwiaGFuZGxlVXBkYXRlUHJvZmlsZSIsIl9jYWxsZWUyIiwiX2Vycm9yJHJlc3BvbnNlIiwiX3QyIiwiX2NvbnRleHQyIiwicHJldmVudERlZmF1bHQiLCJwdXQiLCJhbGVydCIsIm1lc3NhZ2UiLCJfeCIsImhhbmRsZUxvZ291dCIsIl9jYWxsZWUzIiwiX3QzIiwiX2NvbnRleHQzIiwid2luZG93IiwiY29uZmlybSIsInBvc3QiLCJoYW5kbGVJbnB1dENoYW5nZSIsIl9kZWZpbmVQcm9wZXJ0eSIsInRhcmdldCIsImNvbmNhdCIsInJvbGUiLCJ0b1VwcGVyQ2FzZSIsImNyZWF0ZWRfYXQiLCJEYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwib25DbGljayIsInZhcmlhbnQiLCJvcGVuIiwib25PcGVuQ2hhbmdlIiwib25TdWJtaXQiLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwicmVxdWlyZWQiLCJkaXNhYmxlZCJdLCJzb3VyY2VSb290IjoiIn0=