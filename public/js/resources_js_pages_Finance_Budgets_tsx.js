"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_Finance_Budgets_tsx"],{

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
  _excluded2 = ["className", "children", "showCloseButton"],
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
    _ref2$showCloseButton = _ref2.showCloseButton,
    showCloseButton = _ref2$showCloseButton === void 0 ? true : _ref2$showCloseButton,
    props = _objectWithoutProperties(_ref2, _excluded2);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(DialogPortal, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DialogOverlay, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Content, _objectSpread(_objectSpread({
      ref: ref,
      className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
      // Mobile optimizations: full screen on mobile with proper padding and scrolling
      "max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto", "m-0 sm:m-4 p-4 sm:p-6", "rounded-none sm:rounded-lg", "w-[100vw] sm:w-full", className)
    }, props), {}, {
      children: [children, showCloseButton && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dialog__WEBPACK_IMPORTED_MODULE_2__.Close, {
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
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2 sm:gap-0", className)
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

/***/ "./resources/js/components/ui/modal.tsx"
/*!**********************************************!*\
  !*** ./resources/js/components/ui/modal.tsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/utils */ "./resources/js/lib/utils.ts");
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dialog */ "./resources/js/components/ui/dialog.tsx");

// @ts-nocheck



var sizeClasses = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-4xl',
  full: 'sm:max-w-7xl'
};
/**
 * Modal component - A wrapper around Dialog for easier usage
 * Provides consistent styling with rounded corners and spacing
 *
 * Features:
 * - Multiple sizes (sm, md, lg, xl, full)
 * - Optional overlay click to close
 * - Optional close button
 * - Focus trap (handled by Radix UI)
 * - Escape key to close (handled by Radix UI)
 * - Body scroll prevention (handled by Radix UI)
 * - Smooth animations
 */
var Modal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref, ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    title = _ref.title,
    description = _ref.description,
    children = _ref.children,
    footer = _ref.footer,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'md' : _ref$size,
    _ref$closeOnOverlayCl = _ref.closeOnOverlayClick,
    closeOnOverlayClick = _ref$closeOnOverlayCl === void 0 ? true : _ref$closeOnOverlayCl,
    _ref$showCloseButton = _ref.showCloseButton,
    showCloseButton = _ref$showCloseButton === void 0 ? true : _ref$showCloseButton,
    className = _ref.className;
  var handleOpenChange = function handleOpenChange(open) {
    if (!open) {
      onClose();
    }
  };
  var handleOverlayClick = function handleOverlayClick(e) {
    if (!closeOnOverlayClick) {
      e.preventDefault();
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_dialog__WEBPACK_IMPORTED_MODULE_3__.Dialog, {
    open: isOpen,
    onOpenChange: handleOpenChange,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_dialog__WEBPACK_IMPORTED_MODULE_3__.DialogContent, {
      className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)(sizeClasses[size], className),
      ref: ref,
      onPointerDownOutside: handleOverlayClick,
      onInteractOutside: handleOverlayClick,
      showCloseButton: showCloseButton,
      children: [(title || description) && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_dialog__WEBPACK_IMPORTED_MODULE_3__.DialogHeader, {
        children: [title && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_dialog__WEBPACK_IMPORTED_MODULE_3__.DialogTitle, {
          children: title
        }), description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_dialog__WEBPACK_IMPORTED_MODULE_3__.DialogDescription, {
          children: description
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "py-4",
        children: children
      }), footer && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_dialog__WEBPACK_IMPORTED_MODULE_3__.DialogFooter, {
        children: footer
      })]
    })
  });
});
Modal.displayName = "Modal";


/***/ },

/***/ "./resources/js/components/ui/skeleton.tsx"
/*!*************************************************!*\
  !*** ./resources/js/components/ui/skeleton.tsx ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Skeleton: () => (/* binding */ Skeleton),
/* harmony export */   SkeletonAvatar: () => (/* binding */ SkeletonAvatar),
/* harmony export */   SkeletonCard: () => (/* binding */ SkeletonCard),
/* harmony export */   SkeletonList: () => (/* binding */ SkeletonList),
/* harmony export */   SkeletonTable: () => (/* binding */ SkeletonTable),
/* harmony export */   SkeletonText: () => (/* binding */ SkeletonText)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/utils */ "./resources/js/lib/utils.ts");


/**
 * Skeleton Component
 *
 * A placeholder component for loading states that mimics the shape of content.
 * Provides a better user experience than spinners for page loads.
 *
 * @param className - Additional CSS classes
 * @param variant - Shape of the skeleton (text, circular, rectangular)
 * @param width - Width of the skeleton
 * @param height - Height of the skeleton
 * @param animation - Animation type (pulse, wave, none)
 */
var Skeleton = function Skeleton(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'rectangular' : _ref$variant,
    width = _ref.width,
    height = _ref.height,
    _ref$animation = _ref.animation,
    animation = _ref$animation === void 0 ? 'pulse' : _ref$animation;
  var variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };
  var animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  };
  var style = {};
  if (width) style.width = typeof width === 'number' ? "".concat(width, "px") : width;
  if (height) style.height = typeof height === 'number' ? "".concat(height, "px") : height;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.cn)('bg-neutral-200', variantClasses[variant], animationClasses[animation], className),
    style: style,
    role: "status",
    "aria-label": "Loading",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "sr-only",
      children: "Loading..."
    })
  });
};
/**
 * SkeletonText Component
 *
 * Skeleton for text content with multiple lines.
 */
var SkeletonText = function SkeletonText(_ref2) {
  var _ref2$lines = _ref2.lines,
    lines = _ref2$lines === void 0 ? 3 : _ref2$lines,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? '' : _ref2$className;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.cn)('space-y-2', className),
    children: Array.from({
      length: lines
    }).map(function (_, index) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Skeleton, {
        variant: "text",
        height: 16,
        width: index === lines - 1 ? '80%' : '100%'
      }, index);
    })
  });
};
/**
 * SkeletonCard Component
 *
 * Skeleton for card components.
 */
var SkeletonCard = function SkeletonCard(_ref3) {
  var _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? '' : _ref3$className,
    _ref3$hasImage = _ref3.hasImage,
    hasImage = _ref3$hasImage === void 0 ? false : _ref3$hasImage;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.cn)('bg-white rounded-xl border border-neutral-200 overflow-hidden', className),
    children: [hasImage && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Skeleton, {
      variant: "rectangular",
      height: 192,
      className: "rounded-none"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "p-6 space-y-4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Skeleton, {
        variant: "text",
        height: 24,
        width: "60%"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SkeletonText, {
        lines: 2
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Skeleton, {
          variant: "circular",
          width: 32,
          height: 32
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Skeleton, {
          variant: "text",
          height: 16,
          width: "40%"
        })]
      })]
    })]
  });
};
/**
 * SkeletonTable Component
 *
 * Skeleton for table components.
 */
var SkeletonTable = function SkeletonTable(_ref4) {
  var _ref4$rows = _ref4.rows,
    rows = _ref4$rows === void 0 ? 5 : _ref4$rows,
    _ref4$columns = _ref4.columns,
    columns = _ref4$columns === void 0 ? 5 : _ref4$columns,
    _ref4$className = _ref4.className,
    className = _ref4$className === void 0 ? '' : _ref4$className;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.cn)('overflow-x-auto rounded-lg border border-neutral-200', className),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
      className: "min-w-full divide-y divide-neutral-200",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
        className: "bg-neutral-50",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
          children: Array.from({
            length: columns
          }).map(function (_, index) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Skeleton, {
                variant: "text",
                height: 16,
                width: "80%"
              })
            }, index);
          })
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
        className: "bg-white divide-y divide-neutral-200",
        children: Array.from({
          length: rows
        }).map(function (_, rowIndex) {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
            children: Array.from({
              length: columns
            }).map(function (_, colIndex) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                className: "px-6 py-4",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Skeleton, {
                  variant: "text",
                  height: 16,
                  width: "90%"
                })
              }, colIndex);
            })
          }, rowIndex);
        })
      })]
    })
  });
};
/**
 * SkeletonAvatar Component
 *
 * Skeleton for avatar/profile pictures.
 */
var SkeletonAvatar = function SkeletonAvatar(_ref5) {
  var _ref5$size = _ref5.size,
    size = _ref5$size === void 0 ? 'md' : _ref5$size,
    _ref5$className = _ref5.className,
    className = _ref5$className === void 0 ? '' : _ref5$className;
  var sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Skeleton, {
    variant: "circular",
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.cn)(sizeClasses[size], className)
  });
};
/**
 * SkeletonList Component
 *
 * Skeleton for list items.
 */
var SkeletonList = function SkeletonList(_ref6) {
  var _ref6$items = _ref6.items,
    items = _ref6$items === void 0 ? 5 : _ref6$items,
    _ref6$className = _ref6.className,
    className = _ref6$className === void 0 ? '' : _ref6$className;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.cn)('space-y-4', className),
    children: Array.from({
      length: items
    }).map(function (_, index) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SkeletonAvatar, {
          size: "md"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex-1 space-y-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Skeleton, {
            variant: "text",
            height: 16,
            width: "40%"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Skeleton, {
            variant: "text",
            height: 14,
            width: "60%"
          })]
        })]
      }, index);
    })
  });
};

/***/ },

/***/ "./resources/js/pages/Finance/Budgets.tsx"
/*!************************************************!*\
  !*** ./resources/js/pages/Finance/Budgets.tsx ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/ui/modal */ "./resources/js/components/ui/modal.tsx");
/* harmony import */ var _components_ui_skeleton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/ui/skeleton */ "./resources/js/components/ui/skeleton.tsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trending-up.js");
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








var Budgets = function Budgets() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    budgets = _useState2[0],
    setBudgets = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    categories = _useState4[0],
    setCategories = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showAddModal = _useState8[0],
    setShowAddModal = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    submitting = _useState0[0],
    setSubmitting = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Date().getFullYear().toString()),
    _useState10 = _slicedToArray(_useState1, 2),
    fiscalYear = _useState10[0],
    setFiscalYear = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([{
      expense_category_id: '',
      allocated_amount: ''
    }]),
    _useState12 = _slicedToArray(_useState11, 2),
    budgetItems = _useState12[0],
    setBudgetItems = _useState12[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchBudgets();
    fetchCategories();
  }, [fiscalYear]);
  var fetchBudgets = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/budgets', {
              params: {
                fiscal_year: fiscalYear
              }
            });
          case 1:
            response = _context.v;
            setBudgets(response.data.data || []);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Error fetching budgets:', _t);
          case 3:
            _context.p = 3;
            setLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function fetchBudgets() {
      return _ref.apply(this, arguments);
    };
  }();
  var fetchCategories = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/expense-categories');
          case 1:
            response = _context2.v;
            setCategories(response.data.data || []);
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Error fetching categories:', _t2);
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function fetchCategories() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(e) {
      var _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            e.preventDefault();
            _context3.p = 1;
            setSubmitting(true);
            _context3.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].post('/budgets', {
              fiscal_year: fiscalYear,
              items: budgetItems.map(function (item) {
                return {
                  expense_category_id: parseInt(item.expense_category_id),
                  allocated_amount: parseFloat(item.allocated_amount)
                };
              })
            });
          case 2:
            setShowAddModal(false);
            setBudgetItems([{
              expense_category_id: '',
              allocated_amount: ''
            }]);
            fetchBudgets();
            alert('Budget created successfully!');
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t3 = _context3.v;
            console.error('Error creating budget:', _t3);
            alert('Failed to create budget. Please try again.');
          case 4:
            _context3.p = 4;
            setSubmitting(false);
            return _context3.f(4);
          case 5:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 3, 4, 5]]);
    }));
    return function handleSubmit(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var addBudgetItem = function addBudgetItem() {
    setBudgetItems([].concat(_toConsumableArray(budgetItems), [{
      expense_category_id: '',
      allocated_amount: ''
    }]));
  };
  var removeBudgetItem = function removeBudgetItem(index) {
    setBudgetItems(budgetItems.filter(function (_, i) {
      return i !== index;
    }));
  };
  var updateBudgetItem = function updateBudgetItem(index, field, value) {
    var updated = _toConsumableArray(budgetItems);
    updated[index][field] = value;
    setBudgetItems(updated);
  };
  var getStatusColor = function getStatusColor(status) {
    switch (status) {
      case 'on-track':
        return 'bg-success-100 text-success-800 border-success-200';
      case 'at-limit':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'over-budget':
        return 'bg-error-100 text-error-800 border-error-200';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };
  var getProgressColor = function getProgressColor(percentage) {
    if (percentage >= 100) return 'bg-error-500';
    if (percentage >= 90) return 'bg-warning-500';
    return 'bg-success-500';
  };
  var formatCurrency = function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex justify-between items-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
          className: "text-2xl font-bold text-neutral-900",
          children: "Budget Management"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-neutral-600 mt-1",
          children: "Track and manage budget allocations"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex gap-3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("select", {
          value: fiscalYear,
          onChange: function onChange(e) {
            return setFiscalYear(e.target.value);
          },
          className: "px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent",
          children: _toConsumableArray(Array(5)).map(function (_, i) {
            var year = new Date().getFullYear() - 2 + i;
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: year,
              children: year
            }, year);
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
          variant: "primary",
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
            className: "w-4 h-4"
          }),
          onClick: function onClick() {
            return setShowAddModal(true);
          },
          children: "Create Budget"
        })]
      })]
    }), loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      children: Array.from({
        length: 6
      }).map(function (_, index) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_6__.SkeletonCard, {
          hasImage: false
        }, index);
      })
    }) : budgets.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-12 text-center text-neutral-500",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
        children: ["No budgets found for ", fiscalYear, ". Create one to get started."]
      })
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      children: budgets.map(function (budget) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
          className: "p-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-start justify-between mb-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                className: "text-lg font-semibold text-neutral-900",
                children: budget.category_name
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: "text-sm text-neutral-600 mt-1",
                children: ["FY ", budget.fiscal_year]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "px-3 py-1 rounded-full text-xs font-medium border ".concat(getStatusColor(budget.status)),
              children: budget.status.replace('-', ' ')
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-3",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "Allocated"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-semibold text-neutral-900",
                children: formatCurrency(budget.allocated_amount)
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "Spent"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-semibold text-error-600",
                children: formatCurrency(budget.spent_amount)
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "Remaining"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-semibold ".concat(budget.remaining_amount >= 0 ? 'text-success-600' : 'text-error-600'),
                children: formatCurrency(budget.remaining_amount)
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "mt-4",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between items-center mb-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-xs text-neutral-600",
                children: "Budget Utilization"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "text-xs font-semibold text-neutral-900",
                children: [budget.percentage_used.toFixed(1), "%"]
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "w-full bg-neutral-200 rounded-full h-2",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "h-2 rounded-full transition-all ".concat(getProgressColor(budget.percentage_used)),
                style: {
                  width: "".concat(Math.min(budget.percentage_used, 100), "%")
                }
              })
            })]
          }), budget.status === 'over-budget' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "mt-4 flex items-center gap-2 text-error-600 text-sm",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
              className: "w-4 h-4"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
              children: ["Over budget by ", formatCurrency(Math.abs(budget.remaining_amount))]
            })]
          }), budget.status === 'at-limit' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "mt-4 flex items-center gap-2 text-warning-600 text-sm",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
              className: "w-4 h-4"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: "Approaching budget limit"
            })]
          }), budget.status === 'on-track' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "mt-4 flex items-center gap-2 text-success-600 text-sm",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
              className: "w-4 h-4"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: "On track"
            })]
          })]
        }, budget.id);
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_modal__WEBPACK_IMPORTED_MODULE_5__.Modal, {
      isOpen: showAddModal,
      onClose: function onClose() {
        return setShowAddModal(false);
      },
      title: "Create Budget",
      size: "lg",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        onSubmit: handleSubmit,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "space-y-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "block text-sm font-medium text-neutral-700 mb-1",
              children: ["Fiscal Year ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-error-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("select", {
              value: fiscalYear,
              onChange: function onChange(e) {
                return setFiscalYear(e.target.value);
              },
              required: true,
              className: "w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent",
              children: _toConsumableArray(Array(5)).map(function (_, i) {
                var year = new Date().getFullYear() - 2 + i;
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                  value: year,
                  children: year
                }, year);
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between items-center mb-2",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                className: "block text-sm font-medium text-neutral-700",
                children: ["Budget Items ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-error-500",
                  children: "*"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
                type: "button",
                variant: "outline",
                size: "sm",
                icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
                  className: "w-4 h-4"
                }),
                onClick: addBudgetItem,
                children: "Add Item"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "space-y-3",
              children: budgetItems.map(function (item, index) {
                return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex gap-3",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                    value: item.expense_category_id,
                    onChange: function onChange(e) {
                      return updateBudgetItem(index, 'expense_category_id', e.target.value);
                    },
                    required: true,
                    className: "flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                      value: "",
                      children: "Select Category"
                    }), categories.map(function (cat) {
                      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                        value: cat.id,
                        children: cat.name
                      }, cat.id);
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                    type: "number",
                    step: "0.01",
                    min: "0.01",
                    value: item.allocated_amount,
                    onChange: function onChange(e) {
                      return updateBudgetItem(index, 'allocated_amount', e.target.value);
                    },
                    required: true,
                    placeholder: "Amount",
                    className: "w-40 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  }), budgetItems.length > 1 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: function onClick() {
                      return removeBudgetItem(index);
                    },
                    children: "Remove"
                  })]
                }, index);
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-neutral-50 p-4 rounded-lg",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-medium text-neutral-700",
                children: "Total Budget"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-lg font-bold text-neutral-900",
                children: formatCurrency(budgetItems.reduce(function (sum, item) {
                  return sum + (parseFloat(item.allocated_amount) || 0);
                }, 0))
              })]
            })
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex justify-end gap-3 mt-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
            type: "button",
            variant: "outline",
            onClick: function onClick() {
              return setShowAddModal(false);
            },
            disabled: submitting,
            children: "Cancel"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
            type: "submit",
            variant: "primary",
            disabled: submitting,
            loading: submitting,
            children: submitting ? 'Creating...' : 'Create Budget'
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Budgets);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0ZpbmFuY2VfQnVkZ2V0c190c3guanM/aWQ9ZTJiZDg5YTMzODQ1ZDU1YyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwrQkFBK0Isb0JBQW9CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEM7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxNQUFNO0FBQ2xCO0FBQ087QUFDUCxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFD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ZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvYXJpYS1oaWRkZW4vZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdWkvZGlhbG9nLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9tb2RhbC50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdWkvc2tlbGV0b24udHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9wYWdlcy9GaW5hbmNlL0J1ZGdldHMudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9nZXQtbm9uY2UvZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy90cmVuZGluZy11cC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvY29tcG9uZW50LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9kaXN0L2VzMjAxNS9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L2luZGV4LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9kaXN0L2VzMjAxNS91dGlscy5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9Db21iaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9TaWRlRWZmZWN0LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L1VJLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L2FnZ3Jlc2l2ZUNhcHR1cmUuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvaGFuZGxlU2Nyb2xsLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L21lZGl1bS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9zaWRlY2FyLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1zdHlsZS1zaW5nbGV0b24vZGlzdC9lczIwMTUvY29tcG9uZW50LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1zdHlsZS1zaW5nbGV0b24vZGlzdC9lczIwMTUvaG9vay5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L2luZGV4LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1zdHlsZS1zaW5nbGV0b24vZGlzdC9lczIwMTUvc2luZ2xldG9uLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2UtY2FsbGJhY2stcmVmL2Rpc3QvZXMyMDE1L2Fzc2lnblJlZi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzMjAxNS91c2VNZXJnZVJlZi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzMjAxNS91c2VSZWYuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1zaWRlY2FyL2Rpc3QvZXMyMDE1L2V4cG9ydHMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1zaWRlY2FyL2Rpc3QvZXMyMDE1L21lZGl1bS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3ByaW1pdGl2ZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWNvbnRleHQvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1kaWFsb2cvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1kaWFsb2cvbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1zbG90L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZGlzbWlzc2FibGUtbGF5ZXIvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1mb2N1cy1ndWFyZHMvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1mb2N1cy1zY29wZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWlkL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtcG9ydGFsL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtcHJlc2VuY2UvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1wcmltaXRpdmUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1wcmltaXRpdmUvbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1zbG90L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1jb250cm9sbGFibGUtc3RhdGUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtZWZmZWN0LWV2ZW50L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWVzY2FwZS1rZXlkb3duL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3QvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5tanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGdldERlZmF1bHRQYXJlbnQgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHNhbXBsZVRhcmdldCA9IEFycmF5LmlzQXJyYXkob3JpZ2luYWxUYXJnZXQpID8gb3JpZ2luYWxUYXJnZXRbMF0gOiBvcmlnaW5hbFRhcmdldDtcbiAgICByZXR1cm4gc2FtcGxlVGFyZ2V0Lm93bmVyRG9jdW1lbnQuYm9keTtcbn07XG52YXIgY291bnRlck1hcCA9IG5ldyBXZWFrTWFwKCk7XG52YXIgdW5jb250cm9sbGVkTm9kZXMgPSBuZXcgV2Vha01hcCgpO1xudmFyIG1hcmtlck1hcCA9IHt9O1xudmFyIGxvY2tDb3VudCA9IDA7XG52YXIgdW53cmFwSG9zdCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUgJiYgKG5vZGUuaG9zdCB8fCB1bndyYXBIb3N0KG5vZGUucGFyZW50Tm9kZSkpO1xufTtcbnZhciBjb3JyZWN0VGFyZ2V0cyA9IGZ1bmN0aW9uIChwYXJlbnQsIHRhcmdldHMpIHtcbiAgICByZXR1cm4gdGFyZ2V0c1xuICAgICAgICAubWFwKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHBhcmVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb3JyZWN0ZWRUYXJnZXQgPSB1bndyYXBIb3N0KHRhcmdldCk7XG4gICAgICAgIGlmIChjb3JyZWN0ZWRUYXJnZXQgJiYgcGFyZW50LmNvbnRhaW5zKGNvcnJlY3RlZFRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjb3JyZWN0ZWRUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5lcnJvcignYXJpYS1oaWRkZW4nLCB0YXJnZXQsICdpbiBub3QgY29udGFpbmVkIGluc2lkZScsIHBhcmVudCwgJy4gRG9pbmcgbm90aGluZycpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiBCb29sZWFuKHgpOyB9KTtcbn07XG4vKipcbiAqIE1hcmtzIGV2ZXJ5dGhpbmcgZXhjZXB0IGdpdmVuIG5vZGUob3Igbm9kZXMpIGFzIGFyaWEtaGlkZGVuXG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBFbGVtZW50W119IG9yaWdpbmFsVGFyZ2V0IC0gZWxlbWVudHMgdG8ga2VlcCBvbiB0aGUgcGFnZVxuICogQHBhcmFtIFtwYXJlbnROb2RlXSAtIHRvcCBlbGVtZW50LCBkZWZhdWx0cyB0byBkb2N1bWVudC5ib2R5XG4gKiBAcGFyYW0ge1N0cmluZ30gW21hcmtlck5hbWVdIC0gYSBzcGVjaWFsIGF0dHJpYnV0ZSB0byBtYXJrIGV2ZXJ5IG5vZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBbY29udHJvbEF0dHJpYnV0ZV0gLSBodG1sIEF0dHJpYnV0ZSB0byBjb250cm9sXG4gKiBAcmV0dXJuIHtVbmRvfSB1bmRvIGNvbW1hbmRcbiAqL1xudmFyIGFwcGx5QXR0cmlidXRlVG9PdGhlcnMgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUsIGNvbnRyb2xBdHRyaWJ1dGUpIHtcbiAgICB2YXIgdGFyZ2V0cyA9IGNvcnJlY3RUYXJnZXRzKHBhcmVudE5vZGUsIEFycmF5LmlzQXJyYXkob3JpZ2luYWxUYXJnZXQpID8gb3JpZ2luYWxUYXJnZXQgOiBbb3JpZ2luYWxUYXJnZXRdKTtcbiAgICBpZiAoIW1hcmtlck1hcFttYXJrZXJOYW1lXSkge1xuICAgICAgICBtYXJrZXJNYXBbbWFya2VyTmFtZV0gPSBuZXcgV2Vha01hcCgpO1xuICAgIH1cbiAgICB2YXIgbWFya2VyQ291bnRlciA9IG1hcmtlck1hcFttYXJrZXJOYW1lXTtcbiAgICB2YXIgaGlkZGVuTm9kZXMgPSBbXTtcbiAgICB2YXIgZWxlbWVudHNUb0tlZXAgPSBuZXcgU2V0KCk7XG4gICAgdmFyIGVsZW1lbnRzVG9TdG9wID0gbmV3IFNldCh0YXJnZXRzKTtcbiAgICB2YXIga2VlcCA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBpZiAoIWVsIHx8IGVsZW1lbnRzVG9LZWVwLmhhcyhlbCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50c1RvS2VlcC5hZGQoZWwpO1xuICAgICAgICBrZWVwKGVsLnBhcmVudE5vZGUpO1xuICAgIH07XG4gICAgdGFyZ2V0cy5mb3JFYWNoKGtlZXApO1xuICAgIHZhciBkZWVwID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICBpZiAoIXBhcmVudCB8fCBlbGVtZW50c1RvU3RvcC5oYXMocGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwocGFyZW50LmNoaWxkcmVuLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRzVG9LZWVwLmhhcyhub2RlKSkge1xuICAgICAgICAgICAgICAgIGRlZXAobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IG5vZGUuZ2V0QXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWxyZWFkeUhpZGRlbiA9IGF0dHIgIT09IG51bGwgJiYgYXR0ciAhPT0gJ2ZhbHNlJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50ZXJWYWx1ZSA9IChjb3VudGVyTWFwLmdldChub2RlKSB8fCAwKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXJrZXJWYWx1ZSA9IChtYXJrZXJDb3VudGVyLmdldChub2RlKSB8fCAwKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXJNYXAuc2V0KG5vZGUsIGNvdW50ZXJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlckNvdW50ZXIuc2V0KG5vZGUsIG1hcmtlclZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXJWYWx1ZSA9PT0gMSAmJiBhbHJlYWR5SGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmNvbnRyb2xsZWROb2Rlcy5zZXQobm9kZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlclZhbHVlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShtYXJrZXJOYW1lLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxyZWFkeUhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoY29udHJvbEF0dHJpYnV0ZSwgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdhcmlhLWhpZGRlbjogY2Fubm90IG9wZXJhdGUgb24gJywgbm9kZSwgZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGRlZXAocGFyZW50Tm9kZSk7XG4gICAgZWxlbWVudHNUb0tlZXAuY2xlYXIoKTtcbiAgICBsb2NrQ291bnQrKztcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBoaWRkZW5Ob2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICB2YXIgY291bnRlclZhbHVlID0gY291bnRlck1hcC5nZXQobm9kZSkgLSAxO1xuICAgICAgICAgICAgdmFyIG1hcmtlclZhbHVlID0gbWFya2VyQ291bnRlci5nZXQobm9kZSkgLSAxO1xuICAgICAgICAgICAgY291bnRlck1hcC5zZXQobm9kZSwgY291bnRlclZhbHVlKTtcbiAgICAgICAgICAgIG1hcmtlckNvdW50ZXIuc2V0KG5vZGUsIG1hcmtlclZhbHVlKTtcbiAgICAgICAgICAgIGlmICghY291bnRlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1bmNvbnRyb2xsZWROb2Rlcy5oYXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoY29udHJvbEF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVuY29udHJvbGxlZE5vZGVzLmRlbGV0ZShub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbWFya2VyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShtYXJrZXJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxvY2tDb3VudC0tO1xuICAgICAgICBpZiAoIWxvY2tDb3VudCkge1xuICAgICAgICAgICAgLy8gY2xlYXJcbiAgICAgICAgICAgIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgY291bnRlck1hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgICAgICB1bmNvbnRyb2xsZWROb2RlcyA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgICAgICBtYXJrZXJNYXAgPSB7fTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBhcmlhLWhpZGRlblxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcmV0dXJuIHtVbmRvfSB1bmRvIGNvbW1hbmRcbiAqL1xuZXhwb3J0IHZhciBoaWRlT3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lKSB7XG4gICAgaWYgKG1hcmtlck5hbWUgPT09IHZvaWQgMCkgeyBtYXJrZXJOYW1lID0gJ2RhdGEtYXJpYS1oaWRkZW4nOyB9XG4gICAgdmFyIHRhcmdldHMgPSBBcnJheS5mcm9tKEFycmF5LmlzQXJyYXkob3JpZ2luYWxUYXJnZXQpID8gb3JpZ2luYWxUYXJnZXQgOiBbb3JpZ2luYWxUYXJnZXRdKTtcbiAgICB2YXIgYWN0aXZlUGFyZW50Tm9kZSA9IHBhcmVudE5vZGUgfHwgZ2V0RGVmYXVsdFBhcmVudChvcmlnaW5hbFRhcmdldCk7XG4gICAgaWYgKCFhY3RpdmVQYXJlbnROb2RlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9O1xuICAgIH1cbiAgICAvLyB3ZSBzaG91bGQgbm90IGhpZGUgYXJpYS1saXZlIGVsZW1lbnRzIC0gaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS9hcmlhLWhpZGRlbi9pc3N1ZXMvMTBcbiAgICAvLyBhbmQgc2NyaXB0IGVsZW1lbnRzLCBhcyB0aGV5IGhhdmUgbm8gaW1wYWN0IG9uIGFjY2Vzc2liaWxpdHkuXG4gICAgdGFyZ2V0cy5wdXNoLmFwcGx5KHRhcmdldHMsIEFycmF5LmZyb20oYWN0aXZlUGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdbYXJpYS1saXZlXSwgc2NyaXB0JykpKTtcbiAgICByZXR1cm4gYXBwbHlBdHRyaWJ1dGVUb090aGVycyh0YXJnZXRzLCBhY3RpdmVQYXJlbnROb2RlLCBtYXJrZXJOYW1lLCAnYXJpYS1oaWRkZW4nKTtcbn07XG4vKipcbiAqIE1hcmtzIGV2ZXJ5dGhpbmcgZXhjZXB0IGdpdmVuIG5vZGUob3Igbm9kZXMpIGFzIGluZXJ0XG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBFbGVtZW50W119IG9yaWdpbmFsVGFyZ2V0IC0gZWxlbWVudHMgdG8ga2VlcCBvbiB0aGUgcGFnZVxuICogQHBhcmFtIFtwYXJlbnROb2RlXSAtIHRvcCBlbGVtZW50LCBkZWZhdWx0cyB0byBkb2N1bWVudC5ib2R5XG4gKiBAcGFyYW0ge1N0cmluZ30gW21hcmtlck5hbWVdIC0gYSBzcGVjaWFsIGF0dHJpYnV0ZSB0byBtYXJrIGV2ZXJ5IG5vZGVcbiAqIEByZXR1cm4ge1VuZG99IHVuZG8gY29tbWFuZFxuICovXG5leHBvcnQgdmFyIGluZXJ0T3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lKSB7XG4gICAgaWYgKG1hcmtlck5hbWUgPT09IHZvaWQgMCkgeyBtYXJrZXJOYW1lID0gJ2RhdGEtaW5lcnQtZWQnOyB9XG4gICAgdmFyIGFjdGl2ZVBhcmVudE5vZGUgPSBwYXJlbnROb2RlIHx8IGdldERlZmF1bHRQYXJlbnQob3JpZ2luYWxUYXJnZXQpO1xuICAgIGlmICghYWN0aXZlUGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfTtcbiAgICB9XG4gICAgcmV0dXJuIGFwcGx5QXR0cmlidXRlVG9PdGhlcnMob3JpZ2luYWxUYXJnZXQsIGFjdGl2ZVBhcmVudE5vZGUsIG1hcmtlck5hbWUsICdpbmVydCcpO1xufTtcbi8qKlxuICogQHJldHVybnMgaWYgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIGluZXJ0XG4gKi9cbmV4cG9ydCB2YXIgc3VwcG9ydHNJbmVydCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHlwZW9mIEhUTUxFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBIVE1MRWxlbWVudC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ2luZXJ0Jyk7XG59O1xuLyoqXG4gKiBBdXRvbWF0aWMgZnVuY3Rpb24gdG8gXCJzdXBwcmVzc1wiIERPTSBlbGVtZW50cyAtIF9oaWRlXyBvciBfaW5lcnRfIGluIHRoZSBiZXN0IHBvc3NpYmxlIHdheVxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcmV0dXJuIHtVbmRvfSB1bmRvIGNvbW1hbmRcbiAqL1xuZXhwb3J0IHZhciBzdXBwcmVzc090aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLXN1cHByZXNzZWQnOyB9XG4gICAgcmV0dXJuIChzdXBwb3J0c0luZXJ0KCkgPyBpbmVydE90aGVycyA6IGhpZGVPdGhlcnMpKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lKTtcbn07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBEaWFsb2dQcmltaXRpdmUgZnJvbSBcIkByYWRpeC11aS9yZWFjdC1kaWFsb2dcIjtcbmltcG9ydCB7IFggfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCIuLi8uLi9saWIvdXRpbHNcIjtcbmNvbnN0IERpYWxvZyA9IERpYWxvZ1ByaW1pdGl2ZS5Sb290O1xuY29uc3QgRGlhbG9nVHJpZ2dlciA9IERpYWxvZ1ByaW1pdGl2ZS5UcmlnZ2VyO1xuY29uc3QgRGlhbG9nUG9ydGFsID0gRGlhbG9nUHJpbWl0aXZlLlBvcnRhbDtcbmNvbnN0IERpYWxvZ0Nsb3NlID0gRGlhbG9nUHJpbWl0aXZlLkNsb3NlO1xuY29uc3QgRGlhbG9nT3ZlcmxheSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5PdmVybGF5LCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLWJhY2tncm91bmQvODAgYmFja2Ryb3AtYmx1ci1zbSBkYXRhLVtzdGF0ZT1vcGVuXTphbmltYXRlLWluIGRhdGEtW3N0YXRlPWNsb3NlZF06YW5pbWF0ZS1vdXQgZGF0YS1bc3RhdGU9Y2xvc2VkXTpmYWRlLW91dC0wIGRhdGEtW3N0YXRlPW9wZW5dOmZhZGUtaW4tMFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nT3ZlcmxheS5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5PdmVybGF5LmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nQ29udGVudCA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCBjaGlsZHJlbiwgc2hvd0Nsb3NlQnV0dG9uID0gdHJ1ZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeHMoRGlhbG9nUG9ydGFsLCB7IGNoaWxkcmVuOiBbX2pzeChEaWFsb2dPdmVybGF5LCB7fSksIF9qc3hzKERpYWxvZ1ByaW1pdGl2ZS5Db250ZW50LCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiZml4ZWQgbGVmdC1bNTAlXSB0b3AtWzUwJV0gei01MCBncmlkIHctZnVsbCBtYXgtdy1sZyB0cmFuc2xhdGUteC1bLTUwJV0gdHJhbnNsYXRlLXktWy01MCVdIGdhcC00IGJvcmRlciBiZy1iYWNrZ3JvdW5kIHNoYWRvdy1sZyBkdXJhdGlvbi0yMDAgZGF0YS1bc3RhdGU9b3Blbl06YW5pbWF0ZS1pbiBkYXRhLVtzdGF0ZT1jbG9zZWRdOmFuaW1hdGUtb3V0IGRhdGEtW3N0YXRlPWNsb3NlZF06ZmFkZS1vdXQtMCBkYXRhLVtzdGF0ZT1vcGVuXTpmYWRlLWluLTAgZGF0YS1bc3RhdGU9Y2xvc2VkXTp6b29tLW91dC05NSBkYXRhLVtzdGF0ZT1vcGVuXTp6b29tLWluLTk1IGRhdGEtW3N0YXRlPWNsb3NlZF06c2xpZGUtb3V0LXRvLWxlZnQtMS8yIGRhdGEtW3N0YXRlPWNsb3NlZF06c2xpZGUtb3V0LXRvLXRvcC1bNDglXSBkYXRhLVtzdGF0ZT1vcGVuXTpzbGlkZS1pbi1mcm9tLWxlZnQtMS8yIGRhdGEtW3N0YXRlPW9wZW5dOnNsaWRlLWluLWZyb20tdG9wLVs0OCVdIHNtOnJvdW5kZWQtbGdcIiwgXG4gICAgICAgICAgICAvLyBNb2JpbGUgb3B0aW1pemF0aW9uczogZnVsbCBzY3JlZW4gb24gbW9iaWxlIHdpdGggcHJvcGVyIHBhZGRpbmcgYW5kIHNjcm9sbGluZ1xuICAgICAgICAgICAgXCJtYXgtaC1bMTAwZHZoXSBzbTptYXgtaC1bOTB2aF0gb3ZlcmZsb3cteS1hdXRvXCIsIFwibS0wIHNtOm0tNCBwLTQgc206cC02XCIsIFwicm91bmRlZC1ub25lIHNtOnJvdW5kZWQtbGdcIiwgXCJ3LVsxMDB2d10gc206dy1mdWxsXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzLCBjaGlsZHJlbjogW2NoaWxkcmVuLCBzaG93Q2xvc2VCdXR0b24gJiYgKF9qc3hzKERpYWxvZ1ByaW1pdGl2ZS5DbG9zZSwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgcmlnaHQtNCB0b3AtNCByb3VuZGVkLXNtIG9wYWNpdHktNzAgcmluZy1vZmZzZXQtYmFja2dyb3VuZCB0cmFuc2l0aW9uLW9wYWNpdHkgaG92ZXI6b3BhY2l0eS0xMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXJpbmcgZm9jdXM6cmluZy1vZmZzZXQtMiBkaXNhYmxlZDpwb2ludGVyLWV2ZW50cy1ub25lIGRhdGEtW3N0YXRlPW9wZW5dOmJnLWFjY2VudCBkYXRhLVtzdGF0ZT1vcGVuXTp0ZXh0LW11dGVkLWZvcmVncm91bmRcIiwgY2hpbGRyZW46IFtfanN4KFgsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwic3Itb25seVwiLCBjaGlsZHJlbjogXCJDbG9zZVwiIH0pXSB9KSldIH0pXSB9KSkpO1xuRGlhbG9nQ29udGVudC5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5Db250ZW50LmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nSGVhZGVyID0gKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oXCJmbGV4IGZsZXgtY29sIHNwYWNlLXktMS41IHRleHQtY2VudGVyIHNtOnRleHQtbGVmdFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSk7XG5EaWFsb2dIZWFkZXIuZGlzcGxheU5hbWUgPSBcIkRpYWxvZ0hlYWRlclwiO1xuY29uc3QgRGlhbG9nRm9vdGVyID0gKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oXCJmbGV4IGZsZXgtY29sLXJldmVyc2UgZ2FwLTIgc206ZmxleC1yb3cgc206anVzdGlmeS1lbmQgc206c3BhY2UteC0yIHNtOmdhcC0wXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKTtcbkRpYWxvZ0Zvb3Rlci5kaXNwbGF5TmFtZSA9IFwiRGlhbG9nRm9vdGVyXCI7XG5jb25zdCBEaWFsb2dUaXRsZSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5UaXRsZSwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcInRleHQtbGcgZm9udC1zZW1pYm9sZCBsZWFkaW5nLW5vbmUgdHJhY2tpbmctdGlnaHRcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpKTtcbkRpYWxvZ1RpdGxlLmRpc3BsYXlOYW1lID0gRGlhbG9nUHJpbWl0aXZlLlRpdGxlLmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nRGVzY3JpcHRpb24gPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeChEaWFsb2dQcmltaXRpdmUuRGVzY3JpcHRpb24sIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJ0ZXh0LXNtIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nRGVzY3JpcHRpb24uZGlzcGxheU5hbWUgPSBEaWFsb2dQcmltaXRpdmUuRGVzY3JpcHRpb24uZGlzcGxheU5hbWU7XG5leHBvcnQgeyBEaWFsb2csIERpYWxvZ1BvcnRhbCwgRGlhbG9nT3ZlcmxheSwgRGlhbG9nQ2xvc2UsIERpYWxvZ1RyaWdnZXIsIERpYWxvZ0NvbnRlbnQsIERpYWxvZ0hlYWRlciwgRGlhbG9nRm9vdGVyLCBEaWFsb2dUaXRsZSwgRGlhbG9nRGVzY3JpcHRpb24sIH07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLy8gQHRzLW5vY2hlY2tcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY24gfSBmcm9tIFwiLi4vLi4vbGliL3V0aWxzXCI7XG5pbXBvcnQgeyBEaWFsb2csIERpYWxvZ0NvbnRlbnQsIERpYWxvZ0Rlc2NyaXB0aW9uLCBEaWFsb2dGb290ZXIsIERpYWxvZ0hlYWRlciwgRGlhbG9nVGl0bGUsIH0gZnJvbSBcIi4vZGlhbG9nXCI7XG5jb25zdCBzaXplQ2xhc3NlcyA9IHtcbiAgICBzbTogJ3NtOm1heC13LW1kJyxcbiAgICBtZDogJ3NtOm1heC13LWxnJyxcbiAgICBsZzogJ3NtOm1heC13LTJ4bCcsXG4gICAgeGw6ICdzbTptYXgtdy00eGwnLFxuICAgIGZ1bGw6ICdzbTptYXgtdy03eGwnLFxufTtcbi8qKlxuICogTW9kYWwgY29tcG9uZW50IC0gQSB3cmFwcGVyIGFyb3VuZCBEaWFsb2cgZm9yIGVhc2llciB1c2FnZVxuICogUHJvdmlkZXMgY29uc2lzdGVudCBzdHlsaW5nIHdpdGggcm91bmRlZCBjb3JuZXJzIGFuZCBzcGFjaW5nXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIE11bHRpcGxlIHNpemVzIChzbSwgbWQsIGxnLCB4bCwgZnVsbClcbiAqIC0gT3B0aW9uYWwgb3ZlcmxheSBjbGljayB0byBjbG9zZVxuICogLSBPcHRpb25hbCBjbG9zZSBidXR0b25cbiAqIC0gRm9jdXMgdHJhcCAoaGFuZGxlZCBieSBSYWRpeCBVSSlcbiAqIC0gRXNjYXBlIGtleSB0byBjbG9zZSAoaGFuZGxlZCBieSBSYWRpeCBVSSlcbiAqIC0gQm9keSBzY3JvbGwgcHJldmVudGlvbiAoaGFuZGxlZCBieSBSYWRpeCBVSSlcbiAqIC0gU21vb3RoIGFuaW1hdGlvbnNcbiAqL1xuY29uc3QgTW9kYWwgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGlzT3Blbiwgb25DbG9zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBjaGlsZHJlbiwgZm9vdGVyLCBzaXplID0gJ21kJywgY2xvc2VPbk92ZXJsYXlDbGljayA9IHRydWUsIHNob3dDbG9zZUJ1dHRvbiA9IHRydWUsIGNsYXNzTmFtZSB9LCByZWYpID0+IHtcbiAgICBjb25zdCBoYW5kbGVPcGVuQ2hhbmdlID0gKG9wZW4pID0+IHtcbiAgICAgICAgaWYgKCFvcGVuKSB7XG4gICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU92ZXJsYXlDbGljayA9IChlKSA9PiB7XG4gICAgICAgIGlmICghY2xvc2VPbk92ZXJsYXlDbGljaykge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKF9qc3goRGlhbG9nLCB7IG9wZW46IGlzT3Blbiwgb25PcGVuQ2hhbmdlOiBoYW5kbGVPcGVuQ2hhbmdlLCBjaGlsZHJlbjogX2pzeHMoRGlhbG9nQ29udGVudCwgeyBjbGFzc05hbWU6IGNuKHNpemVDbGFzc2VzW3NpemVdLCBjbGFzc05hbWUpLCByZWY6IHJlZiwgb25Qb2ludGVyRG93bk91dHNpZGU6IGhhbmRsZU92ZXJsYXlDbGljaywgb25JbnRlcmFjdE91dHNpZGU6IGhhbmRsZU92ZXJsYXlDbGljaywgc2hvd0Nsb3NlQnV0dG9uOiBzaG93Q2xvc2VCdXR0b24sIGNoaWxkcmVuOiBbKHRpdGxlIHx8IGRlc2NyaXB0aW9uKSAmJiAoX2pzeHMoRGlhbG9nSGVhZGVyLCB7IGNoaWxkcmVuOiBbdGl0bGUgJiYgX2pzeChEaWFsb2dUaXRsZSwgeyBjaGlsZHJlbjogdGl0bGUgfSksIGRlc2NyaXB0aW9uICYmIF9qc3goRGlhbG9nRGVzY3JpcHRpb24sIHsgY2hpbGRyZW46IGRlc2NyaXB0aW9uIH0pXSB9KSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicHktNFwiLCBjaGlsZHJlbjogY2hpbGRyZW4gfSksIGZvb3RlciAmJiBfanN4KERpYWxvZ0Zvb3RlciwgeyBjaGlsZHJlbjogZm9vdGVyIH0pXSB9KSB9KSk7XG59KTtcbk1vZGFsLmRpc3BsYXlOYW1lID0gXCJNb2RhbFwiO1xuZXhwb3J0IHsgTW9kYWwgfTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gJy4uLy4uL2xpYi91dGlscyc7XG4vKipcbiAqIFNrZWxldG9uIENvbXBvbmVudFxuICpcbiAqIEEgcGxhY2Vob2xkZXIgY29tcG9uZW50IGZvciBsb2FkaW5nIHN0YXRlcyB0aGF0IG1pbWljcyB0aGUgc2hhcGUgb2YgY29udGVudC5cbiAqIFByb3ZpZGVzIGEgYmV0dGVyIHVzZXIgZXhwZXJpZW5jZSB0aGFuIHNwaW5uZXJzIGZvciBwYWdlIGxvYWRzLlxuICpcbiAqIEBwYXJhbSBjbGFzc05hbWUgLSBBZGRpdGlvbmFsIENTUyBjbGFzc2VzXG4gKiBAcGFyYW0gdmFyaWFudCAtIFNoYXBlIG9mIHRoZSBza2VsZXRvbiAodGV4dCwgY2lyY3VsYXIsIHJlY3Rhbmd1bGFyKVxuICogQHBhcmFtIHdpZHRoIC0gV2lkdGggb2YgdGhlIHNrZWxldG9uXG4gKiBAcGFyYW0gaGVpZ2h0IC0gSGVpZ2h0IG9mIHRoZSBza2VsZXRvblxuICogQHBhcmFtIGFuaW1hdGlvbiAtIEFuaW1hdGlvbiB0eXBlIChwdWxzZSwgd2F2ZSwgbm9uZSlcbiAqL1xuZXhwb3J0IGNvbnN0IFNrZWxldG9uID0gKHsgY2xhc3NOYW1lID0gJycsIHZhcmlhbnQgPSAncmVjdGFuZ3VsYXInLCB3aWR0aCwgaGVpZ2h0LCBhbmltYXRpb24gPSAncHVsc2UnLCB9KSA9PiB7XG4gICAgY29uc3QgdmFyaWFudENsYXNzZXMgPSB7XG4gICAgICAgIHRleHQ6ICdyb3VuZGVkJyxcbiAgICAgICAgY2lyY3VsYXI6ICdyb3VuZGVkLWZ1bGwnLFxuICAgICAgICByZWN0YW5ndWxhcjogJ3JvdW5kZWQtbGcnLFxuICAgIH07XG4gICAgY29uc3QgYW5pbWF0aW9uQ2xhc3NlcyA9IHtcbiAgICAgICAgcHVsc2U6ICdhbmltYXRlLXB1bHNlJyxcbiAgICAgICAgd2F2ZTogJ2FuaW1hdGUtc2hpbW1lcicsXG4gICAgICAgIG5vbmU6ICcnLFxuICAgIH07XG4gICAgY29uc3Qgc3R5bGUgPSB7fTtcbiAgICBpZiAod2lkdGgpXG4gICAgICAgIHN0eWxlLndpZHRoID0gdHlwZW9mIHdpZHRoID09PSAnbnVtYmVyJyA/IGAke3dpZHRofXB4YCA6IHdpZHRoO1xuICAgIGlmIChoZWlnaHQpXG4gICAgICAgIHN0eWxlLmhlaWdodCA9IHR5cGVvZiBoZWlnaHQgPT09ICdudW1iZXInID8gYCR7aGVpZ2h0fXB4YCA6IGhlaWdodDtcbiAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNuKCdiZy1uZXV0cmFsLTIwMCcsIHZhcmlhbnRDbGFzc2VzW3ZhcmlhbnRdLCBhbmltYXRpb25DbGFzc2VzW2FuaW1hdGlvbl0sIGNsYXNzTmFtZSksIHN0eWxlOiBzdHlsZSwgcm9sZTogXCJzdGF0dXNcIiwgXCJhcmlhLWxhYmVsXCI6IFwiTG9hZGluZ1wiLCBjaGlsZHJlbjogX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwic3Itb25seVwiLCBjaGlsZHJlbjogXCJMb2FkaW5nLi4uXCIgfSkgfSkpO1xufTtcbi8qKlxuICogU2tlbGV0b25UZXh0IENvbXBvbmVudFxuICpcbiAqIFNrZWxldG9uIGZvciB0ZXh0IGNvbnRlbnQgd2l0aCBtdWx0aXBsZSBsaW5lcy5cbiAqL1xuZXhwb3J0IGNvbnN0IFNrZWxldG9uVGV4dCA9ICh7IGxpbmVzID0gMywgY2xhc3NOYW1lID0gJycgfSkgPT4ge1xuICAgIHJldHVybiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oJ3NwYWNlLXktMicsIGNsYXNzTmFtZSksIGNoaWxkcmVuOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsaW5lcyB9KS5tYXAoKF8sIGluZGV4KSA9PiAoX2pzeChTa2VsZXRvbiwgeyB2YXJpYW50OiBcInRleHRcIiwgaGVpZ2h0OiAxNiwgd2lkdGg6IGluZGV4ID09PSBsaW5lcyAtIDEgPyAnODAlJyA6ICcxMDAlJyB9LCBpbmRleCkpKSB9KSk7XG59O1xuLyoqXG4gKiBTa2VsZXRvbkNhcmQgQ29tcG9uZW50XG4gKlxuICogU2tlbGV0b24gZm9yIGNhcmQgY29tcG9uZW50cy5cbiAqL1xuZXhwb3J0IGNvbnN0IFNrZWxldG9uQ2FyZCA9ICh7IGNsYXNzTmFtZSA9ICcnLCBoYXNJbWFnZSA9IGZhbHNlIH0pID0+IHtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbignYmctd2hpdGUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIG92ZXJmbG93LWhpZGRlbicsIGNsYXNzTmFtZSksIGNoaWxkcmVuOiBbaGFzSW1hZ2UgJiYgX2pzeChTa2VsZXRvbiwgeyB2YXJpYW50OiBcInJlY3Rhbmd1bGFyXCIsIGhlaWdodDogMTkyLCBjbGFzc05hbWU6IFwicm91bmRlZC1ub25lXCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInAtNiBzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4KFNrZWxldG9uLCB7IHZhcmlhbnQ6IFwidGV4dFwiLCBoZWlnaHQ6IDI0LCB3aWR0aDogXCI2MCVcIiB9KSwgX2pzeChTa2VsZXRvblRleHQsIHsgbGluZXM6IDIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChTa2VsZXRvbiwgeyB2YXJpYW50OiBcImNpcmN1bGFyXCIsIHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiB9KSwgX2pzeChTa2VsZXRvbiwgeyB2YXJpYW50OiBcInRleHRcIiwgaGVpZ2h0OiAxNiwgd2lkdGg6IFwiNDAlXCIgfSldIH0pXSB9KV0gfSkpO1xufTtcbi8qKlxuICogU2tlbGV0b25UYWJsZSBDb21wb25lbnRcbiAqXG4gKiBTa2VsZXRvbiBmb3IgdGFibGUgY29tcG9uZW50cy5cbiAqL1xuZXhwb3J0IGNvbnN0IFNrZWxldG9uVGFibGUgPSAoeyByb3dzID0gNSwgY29sdW1ucyA9IDUsIGNsYXNzTmFtZSA9ICcnIH0pID0+IHtcbiAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNuKCdvdmVyZmxvdy14LWF1dG8gcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwJywgY2xhc3NOYW1lKSwgY2hpbGRyZW46IF9qc3hzKFwidGFibGVcIiwgeyBjbGFzc05hbWU6IFwibWluLXctZnVsbCBkaXZpZGUteSBkaXZpZGUtbmV1dHJhbC0yMDBcIiwgY2hpbGRyZW46IFtfanN4KFwidGhlYWRcIiwgeyBjbGFzc05hbWU6IFwiYmctbmV1dHJhbC01MFwiLCBjaGlsZHJlbjogX2pzeChcInRyXCIsIHsgY2hpbGRyZW46IEFycmF5LmZyb20oeyBsZW5ndGg6IGNvbHVtbnMgfSkubWFwKChfLCBpbmRleCkgPT4gKF9qc3goXCJ0aFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTNcIiwgY2hpbGRyZW46IF9qc3goU2tlbGV0b24sIHsgdmFyaWFudDogXCJ0ZXh0XCIsIGhlaWdodDogMTYsIHdpZHRoOiBcIjgwJVwiIH0pIH0sIGluZGV4KSkpIH0pIH0pLCBfanN4KFwidGJvZHlcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgZGl2aWRlLXkgZGl2aWRlLW5ldXRyYWwtMjAwXCIsIGNoaWxkcmVuOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiByb3dzIH0pLm1hcCgoXywgcm93SW5kZXgpID0+IChfanN4KFwidHJcIiwgeyBjaGlsZHJlbjogQXJyYXkuZnJvbSh7IGxlbmd0aDogY29sdW1ucyB9KS5tYXAoKF8sIGNvbEluZGV4KSA9PiAoX2pzeChcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNFwiLCBjaGlsZHJlbjogX2pzeChTa2VsZXRvbiwgeyB2YXJpYW50OiBcInRleHRcIiwgaGVpZ2h0OiAxNiwgd2lkdGg6IFwiOTAlXCIgfSkgfSwgY29sSW5kZXgpKSkgfSwgcm93SW5kZXgpKSkgfSldIH0pIH0pKTtcbn07XG4vKipcbiAqIFNrZWxldG9uQXZhdGFyIENvbXBvbmVudFxuICpcbiAqIFNrZWxldG9uIGZvciBhdmF0YXIvcHJvZmlsZSBwaWN0dXJlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IFNrZWxldG9uQXZhdGFyID0gKHsgc2l6ZSA9ICdtZCcsIGNsYXNzTmFtZSA9ICcnIH0pID0+IHtcbiAgICBjb25zdCBzaXplQ2xhc3NlcyA9IHtcbiAgICAgICAgc206ICd3LTggaC04JyxcbiAgICAgICAgbWQ6ICd3LTEyIGgtMTInLFxuICAgICAgICBsZzogJ3ctMTYgaC0xNicsXG4gICAgICAgIHhsOiAndy0yNCBoLTI0JyxcbiAgICB9O1xuICAgIHJldHVybiAoX2pzeChTa2VsZXRvbiwgeyB2YXJpYW50OiBcImNpcmN1bGFyXCIsIGNsYXNzTmFtZTogY24oc2l6ZUNsYXNzZXNbc2l6ZV0sIGNsYXNzTmFtZSkgfSkpO1xufTtcbi8qKlxuICogU2tlbGV0b25MaXN0IENvbXBvbmVudFxuICpcbiAqIFNrZWxldG9uIGZvciBsaXN0IGl0ZW1zLlxuICovXG5leHBvcnQgY29uc3QgU2tlbGV0b25MaXN0ID0gKHsgaXRlbXMgPSA1LCBjbGFzc05hbWUgPSAnJyB9KSA9PiB7XG4gICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbignc3BhY2UteS00JywgY2xhc3NOYW1lKSwgY2hpbGRyZW46IEFycmF5LmZyb20oeyBsZW5ndGg6IGl0ZW1zIH0pLm1hcCgoXywgaW5kZXgpID0+IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3goU2tlbGV0b25BdmF0YXIsIHsgc2l6ZTogXCJtZFwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTEgc3BhY2UteS0yXCIsIGNoaWxkcmVuOiBbX2pzeChTa2VsZXRvbiwgeyB2YXJpYW50OiBcInRleHRcIiwgaGVpZ2h0OiAxNiwgd2lkdGg6IFwiNDAlXCIgfSksIF9qc3goU2tlbGV0b24sIHsgdmFyaWFudDogXCJ0ZXh0XCIsIGhlaWdodDogMTQsIHdpZHRoOiBcIjYwJVwiIH0pXSB9KV0gfSwgaW5kZXgpKSkgfSkpO1xufTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9saWIvYXBpJztcbmltcG9ydCB7IENhcmQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3VpL2NhcmQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aS9idXR0b24nO1xuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3VpL21vZGFsJztcbmltcG9ydCB7IFNrZWxldG9uQ2FyZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWkvc2tlbGV0b24nO1xuaW1wb3J0IHsgUGx1cywgVHJlbmRpbmdVcCwgQWxlcnRUcmlhbmdsZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5jb25zdCBCdWRnZXRzID0gKCkgPT4ge1xuICAgIGNvbnN0IFtidWRnZXRzLCBzZXRCdWRnZXRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbY2F0ZWdvcmllcywgc2V0Q2F0ZWdvcmllc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW3Nob3dBZGRNb2RhbCwgc2V0U2hvd0FkZE1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbc3VibWl0dGluZywgc2V0U3VibWl0dGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Zpc2NhbFllYXIsIHNldEZpc2NhbFllYXJdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IFtidWRnZXRJdGVtcywgc2V0QnVkZ2V0SXRlbXNdID0gdXNlU3RhdGUoW1xuICAgICAgICB7IGV4cGVuc2VfY2F0ZWdvcnlfaWQ6ICcnLCBhbGxvY2F0ZWRfYW1vdW50OiAnJyB9XG4gICAgXSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hCdWRnZXRzKCk7XG4gICAgICAgIGZldGNoQ2F0ZWdvcmllcygpO1xuICAgIH0sIFtmaXNjYWxZZWFyXSk7XG4gICAgY29uc3QgZmV0Y2hCdWRnZXRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL2J1ZGdldHMnLCB7XG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7IGZpc2NhbF95ZWFyOiBmaXNjYWxZZWFyIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0QnVkZ2V0cyhyZXNwb25zZS5kYXRhLmRhdGEgfHwgW10pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgYnVkZ2V0czonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZmV0Y2hDYXRlZ29yaWVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvZXhwZW5zZS1jYXRlZ29yaWVzJyk7XG4gICAgICAgICAgICBzZXRDYXRlZ29yaWVzKHJlc3BvbnNlLmRhdGEuZGF0YSB8fCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBjYXRlZ29yaWVzOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0U3VibWl0dGluZyh0cnVlKTtcbiAgICAgICAgICAgIGF3YWl0IGFwaS5wb3N0KCcvYnVkZ2V0cycsIHtcbiAgICAgICAgICAgICAgICBmaXNjYWxfeWVhcjogZmlzY2FsWWVhcixcbiAgICAgICAgICAgICAgICBpdGVtczogYnVkZ2V0SXRlbXMubWFwKGl0ZW0gPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgZXhwZW5zZV9jYXRlZ29yeV9pZDogcGFyc2VJbnQoaXRlbS5leHBlbnNlX2NhdGVnb3J5X2lkKSxcbiAgICAgICAgICAgICAgICAgICAgYWxsb2NhdGVkX2Ftb3VudDogcGFyc2VGbG9hdChpdGVtLmFsbG9jYXRlZF9hbW91bnQpXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldFNob3dBZGRNb2RhbChmYWxzZSk7XG4gICAgICAgICAgICBzZXRCdWRnZXRJdGVtcyhbeyBleHBlbnNlX2NhdGVnb3J5X2lkOiAnJywgYWxsb2NhdGVkX2Ftb3VudDogJycgfV0pO1xuICAgICAgICAgICAgZmV0Y2hCdWRnZXRzKCk7XG4gICAgICAgICAgICBhbGVydCgnQnVkZ2V0IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgYnVkZ2V0OicsIGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gY3JlYXRlIGJ1ZGdldC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldFN1Ym1pdHRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBhZGRCdWRnZXRJdGVtID0gKCkgPT4ge1xuICAgICAgICBzZXRCdWRnZXRJdGVtcyhbLi4uYnVkZ2V0SXRlbXMsIHsgZXhwZW5zZV9jYXRlZ29yeV9pZDogJycsIGFsbG9jYXRlZF9hbW91bnQ6ICcnIH1dKTtcbiAgICB9O1xuICAgIGNvbnN0IHJlbW92ZUJ1ZGdldEl0ZW0gPSAoaW5kZXgpID0+IHtcbiAgICAgICAgc2V0QnVkZ2V0SXRlbXMoYnVkZ2V0SXRlbXMuZmlsdGVyKChfLCBpKSA9PiBpICE9PSBpbmRleCkpO1xuICAgIH07XG4gICAgY29uc3QgdXBkYXRlQnVkZ2V0SXRlbSA9IChpbmRleCwgZmllbGQsIHZhbHVlKSA9PiB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBbLi4uYnVkZ2V0SXRlbXNdO1xuICAgICAgICB1cGRhdGVkW2luZGV4XVtmaWVsZF0gPSB2YWx1ZTtcbiAgICAgICAgc2V0QnVkZ2V0SXRlbXModXBkYXRlZCk7XG4gICAgfTtcbiAgICBjb25zdCBnZXRTdGF0dXNDb2xvciA9IChzdGF0dXMpID0+IHtcbiAgICAgICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgJ29uLXRyYWNrJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2JnLXN1Y2Nlc3MtMTAwIHRleHQtc3VjY2Vzcy04MDAgYm9yZGVyLXN1Y2Nlc3MtMjAwJztcbiAgICAgICAgICAgIGNhc2UgJ2F0LWxpbWl0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2JnLXdhcm5pbmctMTAwIHRleHQtd2FybmluZy04MDAgYm9yZGVyLXdhcm5pbmctMjAwJztcbiAgICAgICAgICAgIGNhc2UgJ292ZXItYnVkZ2V0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2JnLWVycm9yLTEwMCB0ZXh0LWVycm9yLTgwMCBib3JkZXItZXJyb3ItMjAwJztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdiZy1uZXV0cmFsLTEwMCB0ZXh0LW5ldXRyYWwtODAwIGJvcmRlci1uZXV0cmFsLTIwMCc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGdldFByb2dyZXNzQ29sb3IgPSAocGVyY2VudGFnZSkgPT4ge1xuICAgICAgICBpZiAocGVyY2VudGFnZSA+PSAxMDApXG4gICAgICAgICAgICByZXR1cm4gJ2JnLWVycm9yLTUwMCc7XG4gICAgICAgIGlmIChwZXJjZW50YWdlID49IDkwKVxuICAgICAgICAgICAgcmV0dXJuICdiZy13YXJuaW5nLTUwMCc7XG4gICAgICAgIHJldHVybiAnYmctc3VjY2Vzcy01MDAnO1xuICAgIH07XG4gICAgY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAoYW1vdW50KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVBIJywge1xuICAgICAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgICAgICAgICBjdXJyZW5jeTogJ1BIUCdcbiAgICAgICAgfSkuZm9ybWF0KGFtb3VudCk7XG4gICAgfTtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFwiQnVkZ2V0IE1hbmFnZW1lbnRcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwIG10LTFcIiwgY2hpbGRyZW46IFwiVHJhY2sgYW5kIG1hbmFnZSBidWRnZXQgYWxsb2NhdGlvbnNcIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZ2FwLTNcIiwgY2hpbGRyZW46IFtfanN4KFwic2VsZWN0XCIsIHsgdmFsdWU6IGZpc2NhbFllYXIsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0RmlzY2FsWWVhcihlLnRhcmdldC52YWx1ZSksIGNsYXNzTmFtZTogXCJweC00IHB5LTIgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnktNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiLCBjaGlsZHJlbjogWy4uLkFycmF5KDUpXS5tYXAoKF8sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSAyICsgaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IHllYXIsIGNoaWxkcmVuOiB5ZWFyIH0sIHllYXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSB9KSwgX2pzeChCdXR0b24sIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIGljb246IF9qc3goUGx1cywgeyBjbGFzc05hbWU6IFwidy00IGgtNFwiIH0pLCBvbkNsaWNrOiAoKSA9PiBzZXRTaG93QWRkTW9kYWwodHJ1ZSksIGNoaWxkcmVuOiBcIkNyZWF0ZSBCdWRnZXRcIiB9KV0gfSldIH0pLCBsb2FkaW5nID8gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNlwiLCBjaGlsZHJlbjogQXJyYXkuZnJvbSh7IGxlbmd0aDogNiB9KS5tYXAoKF8sIGluZGV4KSA9PiAoX2pzeChTa2VsZXRvbkNhcmQsIHsgaGFzSW1hZ2U6IGZhbHNlIH0sIGluZGV4KSkpIH0pKSA6IGJ1ZGdldHMubGVuZ3RoID09PSAwID8gKF9qc3goQ2FyZCwgeyBjbGFzc05hbWU6IFwicC0xMiB0ZXh0LWNlbnRlciB0ZXh0LW5ldXRyYWwtNTAwXCIsIGNoaWxkcmVuOiBfanN4cyhcInBcIiwgeyBjaGlsZHJlbjogW1wiTm8gYnVkZ2V0cyBmb3VuZCBmb3IgXCIsIGZpc2NhbFllYXIsIFwiLiBDcmVhdGUgb25lIHRvIGdldCBzdGFydGVkLlwiXSB9KSB9KSkgOiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02XCIsIGNoaWxkcmVuOiBidWRnZXRzLm1hcCgoYnVkZ2V0KSA9PiAoX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gbWItNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IGJ1ZGdldC5jYXRlZ29yeV9uYW1lIH0pLCBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwIG10LTFcIiwgY2hpbGRyZW46IFtcIkZZIFwiLCBidWRnZXQuZmlzY2FsX3llYXJdIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogYHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LW1lZGl1bSBib3JkZXIgJHtnZXRTdGF0dXNDb2xvcihidWRnZXQuc3RhdHVzKX1gLCBjaGlsZHJlbjogYnVkZ2V0LnN0YXR1cy5yZXBsYWNlKCctJywgJyAnKSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktM1wiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJBbGxvY2F0ZWRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IGZvcm1hdEN1cnJlbmN5KGJ1ZGdldC5hbGxvY2F0ZWRfYW1vdW50KSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJTcGVudFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1lcnJvci02MDBcIiwgY2hpbGRyZW46IGZvcm1hdEN1cnJlbmN5KGJ1ZGdldC5zcGVudF9hbW91bnQpIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIlJlbWFpbmluZ1wiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogYHRleHQtc20gZm9udC1zZW1pYm9sZCAke2J1ZGdldC5yZW1haW5pbmdfYW1vdW50ID49IDAgPyAndGV4dC1zdWNjZXNzLTYwMCcgOiAndGV4dC1lcnJvci02MDAnfWAsIGNoaWxkcmVuOiBmb3JtYXRDdXJyZW5jeShidWRnZXQucmVtYWluaW5nX2Ftb3VudCkgfSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibXQtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYi0yXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIkJ1ZGdldCBVdGlsaXphdGlvblwiIH0pLCBfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFtidWRnZXQucGVyY2VudGFnZV91c2VkLnRvRml4ZWQoMSksIFwiJVwiXSB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidy1mdWxsIGJnLW5ldXRyYWwtMjAwIHJvdW5kZWQtZnVsbCBoLTJcIiwgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IGBoLTIgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsICR7Z2V0UHJvZ3Jlc3NDb2xvcihidWRnZXQucGVyY2VudGFnZV91c2VkKX1gLCBzdHlsZTogeyB3aWR0aDogYCR7TWF0aC5taW4oYnVkZ2V0LnBlcmNlbnRhZ2VfdXNlZCwgMTAwKX0lYCB9IH0pIH0pXSB9KSwgYnVkZ2V0LnN0YXR1cyA9PT0gJ292ZXItYnVkZ2V0JyAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibXQtNCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LWVycm9yLTYwMCB0ZXh0LXNtXCIsIGNoaWxkcmVuOiBbX2pzeChBbGVydFRyaWFuZ2xlLCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSksIF9qc3hzKFwic3BhblwiLCB7IGNoaWxkcmVuOiBbXCJPdmVyIGJ1ZGdldCBieSBcIiwgZm9ybWF0Q3VycmVuY3koTWF0aC5hYnMoYnVkZ2V0LnJlbWFpbmluZ19hbW91bnQpKV0gfSldIH0pKSwgYnVkZ2V0LnN0YXR1cyA9PT0gJ2F0LWxpbWl0JyAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibXQtNCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXdhcm5pbmctNjAwIHRleHQtc21cIiwgY2hpbGRyZW46IFtfanN4KEFsZXJ0VHJpYW5nbGUsIHsgY2xhc3NOYW1lOiBcInctNCBoLTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogXCJBcHByb2FjaGluZyBidWRnZXQgbGltaXRcIiB9KV0gfSkpLCBidWRnZXQuc3RhdHVzID09PSAnb24tdHJhY2snICYmIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtdC00IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc3VjY2Vzcy02MDAgdGV4dC1zbVwiLCBjaGlsZHJlbjogW19qc3goVHJlbmRpbmdVcCwgeyBjbGFzc05hbWU6IFwidy00IGgtNFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBcIk9uIHRyYWNrXCIgfSldIH0pKV0gfSwgYnVkZ2V0LmlkKSkpIH0pKSwgX2pzeChNb2RhbCwgeyBpc09wZW46IHNob3dBZGRNb2RhbCwgb25DbG9zZTogKCkgPT4gc2V0U2hvd0FkZE1vZGFsKGZhbHNlKSwgdGl0bGU6IFwiQ3JlYXRlIEJ1ZGdldFwiLCBzaXplOiBcImxnXCIsIGNoaWxkcmVuOiBfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJGaXNjYWwgWWVhciBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1lcnJvci01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChcInNlbGVjdFwiLCB7IHZhbHVlOiBmaXNjYWxZZWFyLCBvbkNoYW5nZTogKGUpID0+IHNldEZpc2NhbFllYXIoZS50YXJnZXQudmFsdWUpLCByZXF1aXJlZDogdHJ1ZSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnktNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiLCBjaGlsZHJlbjogWy4uLkFycmF5KDUpXS5tYXAoKF8sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSAyICsgaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IHllYXIsIGNoaWxkcmVuOiB5ZWFyIH0sIHllYXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgbWItMlwiLCBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwXCIsIGNoaWxkcmVuOiBbXCJCdWRnZXQgSXRlbXMgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZXJyb3ItNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIGljb246IF9qc3goUGx1cywgeyBjbGFzc05hbWU6IFwidy00IGgtNFwiIH0pLCBvbkNsaWNrOiBhZGRCdWRnZXRJdGVtLCBjaGlsZHJlbjogXCJBZGQgSXRlbVwiIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTNcIiwgY2hpbGRyZW46IGJ1ZGdldEl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGdhcC0zXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJzZWxlY3RcIiwgeyB2YWx1ZTogaXRlbS5leHBlbnNlX2NhdGVnb3J5X2lkLCBvbkNoYW5nZTogKGUpID0+IHVwZGF0ZUJ1ZGdldEl0ZW0oaW5kZXgsICdleHBlbnNlX2NhdGVnb3J5X2lkJywgZS50YXJnZXQudmFsdWUpLCByZXF1aXJlZDogdHJ1ZSwgY2xhc3NOYW1lOiBcImZsZXgtMSBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnktNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiLCBjaGlsZHJlbjogW19qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJcIiwgY2hpbGRyZW46IFwiU2VsZWN0IENhdGVnb3J5XCIgfSksIGNhdGVnb3JpZXMubWFwKGNhdCA9PiAoX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBjYXQuaWQsIGNoaWxkcmVuOiBjYXQubmFtZSB9LCBjYXQuaWQpKSldIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcIm51bWJlclwiLCBzdGVwOiBcIjAuMDFcIiwgbWluOiBcIjAuMDFcIiwgdmFsdWU6IGl0ZW0uYWxsb2NhdGVkX2Ftb3VudCwgb25DaGFuZ2U6IChlKSA9PiB1cGRhdGVCdWRnZXRJdGVtKGluZGV4LCAnYWxsb2NhdGVkX2Ftb3VudCcsIGUudGFyZ2V0LnZhbHVlKSwgcmVxdWlyZWQ6IHRydWUsIHBsYWNlaG9sZGVyOiBcIkFtb3VudFwiLCBjbGFzc05hbWU6IFwidy00MCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnktNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pLCBidWRnZXRJdGVtcy5sZW5ndGggPiAxICYmIChfanN4KEJ1dHRvbiwgeyB0eXBlOiBcImJ1dHRvblwiLCB2YXJpYW50OiBcIm91dGxpbmVcIiwgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiAoKSA9PiByZW1vdmVCdWRnZXRJdGVtKGluZGV4KSwgY2hpbGRyZW46IFwiUmVtb3ZlXCIgfSkpXSB9LCBpbmRleCkpKSB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctbmV1dHJhbC01MCBwLTQgcm91bmRlZC1sZ1wiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwXCIsIGNoaWxkcmVuOiBcIlRvdGFsIEJ1ZGdldFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBmb3JtYXRDdXJyZW5jeShidWRnZXRJdGVtcy5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgKHBhcnNlRmxvYXQoaXRlbS5hbGxvY2F0ZWRfYW1vdW50KSB8fCAwKSwgMCkpIH0pXSB9KSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1lbmQgZ2FwLTMgbXQtNlwiLCBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiBzZXRTaG93QWRkTW9kYWwoZmFsc2UpLCBkaXNhYmxlZDogc3VibWl0dGluZywgY2hpbGRyZW46IFwiQ2FuY2VsXCIgfSksIF9qc3goQnV0dG9uLCB7IHR5cGU6IFwic3VibWl0XCIsIHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBkaXNhYmxlZDogc3VibWl0dGluZywgbG9hZGluZzogc3VibWl0dGluZywgY2hpbGRyZW46IHN1Ym1pdHRpbmcgPyAnQ3JlYXRpbmcuLi4nIDogJ0NyZWF0ZSBCdWRnZXQnIH0pXSB9KV0gfSkgfSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBCdWRnZXRzO1xuIiwidmFyIGN1cnJlbnROb25jZTtcbmV4cG9ydCB2YXIgc2V0Tm9uY2UgPSBmdW5jdGlvbiAobm9uY2UpIHtcbiAgICBjdXJyZW50Tm9uY2UgPSBub25jZTtcbn07XG5leHBvcnQgdmFyIGdldE5vbmNlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjdXJyZW50Tm9uY2UpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnROb25jZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIF9fd2VicGFja19ub25jZV9fO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE2IDdoNnY2XCIsIGtleTogXCJib3g1NWxcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTIyIDctOC41IDguNS01LTVMMiAxN1wiLCBrZXk6IFwiMXQxbTc5XCIgfV1cbl07XG5jb25zdCBUcmVuZGluZ1VwID0gY3JlYXRlTHVjaWRlSWNvbihcInRyZW5kaW5nLXVwXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBUcmVuZGluZ1VwIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyZW5kaW5nLXVwLmpzLm1hcFxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc3R5bGVTaW5nbGV0b24gfSBmcm9tICdyZWFjdC1zdHlsZS1zaW5nbGV0b24nO1xuaW1wb3J0IHsgZnVsbFdpZHRoQ2xhc3NOYW1lLCB6ZXJvUmlnaHRDbGFzc05hbWUsIG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSwgcmVtb3ZlZEJhclNpemVWYXJpYWJsZSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldEdhcFdpZHRoIH0gZnJvbSAnLi91dGlscyc7XG52YXIgU3R5bGUgPSBzdHlsZVNpbmdsZXRvbigpO1xuZXhwb3J0IHZhciBsb2NrQXR0cmlidXRlID0gJ2RhdGEtc2Nyb2xsLWxvY2tlZCc7XG4vLyBpbXBvcnRhbnQgdGlwIC0gb25jZSB3ZSBtZWFzdXJlIHNjcm9sbEJhciB3aWR0aCBhbmQgcmVtb3ZlIHRoZW1cbi8vIHdlIGNvdWxkIG5vdCByZXBlYXQgdGhpcyBvcGVyYXRpb25cbi8vIHRodXMgd2UgYXJlIHVzaW5nIHN0eWxlLXNpbmdsZXRvbiAtIG9ubHkgdGhlIGZpcnN0IFwieWV0IGNvcnJlY3RcIiBzdHlsZSB3aWxsIGJlIGFwcGxpZWQuXG52YXIgZ2V0U3R5bGVzID0gZnVuY3Rpb24gKF9hLCBhbGxvd1JlbGF0aXZlLCBnYXBNb2RlLCBpbXBvcnRhbnQpIHtcbiAgICB2YXIgbGVmdCA9IF9hLmxlZnQsIHRvcCA9IF9hLnRvcCwgcmlnaHQgPSBfYS5yaWdodCwgZ2FwID0gX2EuZ2FwO1xuICAgIGlmIChnYXBNb2RlID09PSB2b2lkIDApIHsgZ2FwTW9kZSA9ICdtYXJnaW4nOyB9XG4gICAgcmV0dXJuIFwiXFxuICAuXCIuY29uY2F0KG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSwgXCIge1xcbiAgIG92ZXJmbG93OiBoaWRkZW4gXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgIHBhZGRpbmctcmlnaHQ6IFwiKS5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIGJvZHlbXCIpLmNvbmNhdChsb2NrQXR0cmlidXRlLCBcIl0ge1xcbiAgICBvdmVyZmxvdzogaGlkZGVuIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gICAgb3ZlcnNjcm9sbC1iZWhhdmlvcjogY29udGFpbjtcXG4gICAgXCIpLmNvbmNhdChbXG4gICAgICAgIGFsbG93UmVsYXRpdmUgJiYgXCJwb3NpdGlvbjogcmVsYXRpdmUgXCIuY29uY2F0KGltcG9ydGFudCwgXCI7XCIpLFxuICAgICAgICBnYXBNb2RlID09PSAnbWFyZ2luJyAmJlxuICAgICAgICAgICAgXCJcXG4gICAgcGFkZGluZy1sZWZ0OiBcIi5jb25jYXQobGVmdCwgXCJweDtcXG4gICAgcGFkZGluZy10b3A6IFwiKS5jb25jYXQodG9wLCBcInB4O1xcbiAgICBwYWRkaW5nLXJpZ2h0OiBcIikuY29uY2F0KHJpZ2h0LCBcInB4O1xcbiAgICBtYXJnaW4tbGVmdDowO1xcbiAgICBtYXJnaW4tdG9wOjA7XFxuICAgIG1hcmdpbi1yaWdodDogXCIpLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgICBcIiksXG4gICAgICAgIGdhcE1vZGUgPT09ICdwYWRkaW5nJyAmJiBcInBhZGRpbmctcmlnaHQ6IFwiLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1wiKSxcbiAgICBdXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgLmpvaW4oJycpLCBcIlxcbiAgfVxcbiAgXFxuICAuXCIpLmNvbmNhdCh6ZXJvUmlnaHRDbGFzc05hbWUsIFwiIHtcXG4gICAgcmlnaHQ6IFwiKS5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoZnVsbFdpZHRoQ2xhc3NOYW1lLCBcIiB7XFxuICAgIG1hcmdpbi1yaWdodDogXCIpLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICAuXCIpLmNvbmNhdCh6ZXJvUmlnaHRDbGFzc05hbWUsIFwiIC5cIikuY29uY2F0KHplcm9SaWdodENsYXNzTmFtZSwgXCIge1xcbiAgICByaWdodDogMCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KGZ1bGxXaWR0aENsYXNzTmFtZSwgXCIgLlwiKS5jb25jYXQoZnVsbFdpZHRoQ2xhc3NOYW1lLCBcIiB7XFxuICAgIG1hcmdpbi1yaWdodDogMCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBcXG4gIGJvZHlbXCIpLmNvbmNhdChsb2NrQXR0cmlidXRlLCBcIl0ge1xcbiAgICBcIikuY29uY2F0KHJlbW92ZWRCYXJTaXplVmFyaWFibGUsIFwiOiBcIikuY29uY2F0KGdhcCwgXCJweDtcXG4gIH1cXG5cIik7XG59O1xudmFyIGdldEN1cnJlbnRVc2VDb3VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb3VudGVyID0gcGFyc2VJbnQoZG9jdW1lbnQuYm9keS5nZXRBdHRyaWJ1dGUobG9ja0F0dHJpYnV0ZSkgfHwgJzAnLCAxMCk7XG4gICAgcmV0dXJuIGlzRmluaXRlKGNvdW50ZXIpID8gY291bnRlciA6IDA7XG59O1xuZXhwb3J0IHZhciB1c2VMb2NrQXR0cmlidXRlID0gZnVuY3Rpb24gKCkge1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKGxvY2tBdHRyaWJ1dGUsIChnZXRDdXJyZW50VXNlQ291bnRlcigpICsgMSkudG9TdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbmV3Q291bnRlciA9IGdldEN1cnJlbnRVc2VDb3VudGVyKCkgLSAxO1xuICAgICAgICAgICAgaWYgKG5ld0NvdW50ZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKGxvY2tBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUobG9ja0F0dHJpYnV0ZSwgbmV3Q291bnRlci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LCBbXSk7XG59O1xuLyoqXG4gKiBSZW1vdmVzIHBhZ2Ugc2Nyb2xsYmFyIGFuZCBibG9ja3MgcGFnZSBzY3JvbGwgd2hlbiBtb3VudGVkXG4gKi9cbmV4cG9ydCB2YXIgUmVtb3ZlU2Nyb2xsQmFyID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIG5vUmVsYXRpdmUgPSBfYS5ub1JlbGF0aXZlLCBub0ltcG9ydGFudCA9IF9hLm5vSW1wb3J0YW50LCBfYiA9IF9hLmdhcE1vZGUsIGdhcE1vZGUgPSBfYiA9PT0gdm9pZCAwID8gJ21hcmdpbicgOiBfYjtcbiAgICB1c2VMb2NrQXR0cmlidXRlKCk7XG4gICAgLypcbiAgICAgZ2FwIHdpbGwgYmUgbWVhc3VyZWQgb24gZXZlcnkgY29tcG9uZW50IG1vdW50XG4gICAgIGhvd2V2ZXIgaXQgd2lsbCBiZSB1c2VkIG9ubHkgYnkgdGhlIFwiZmlyc3RcIiBpbnZvY2F0aW9uXG4gICAgIGR1ZSB0byBzaW5nbGV0b24gbmF0dXJlIG9mIDxTdHlsZVxuICAgICAqL1xuICAgIHZhciBnYXAgPSBSZWFjdC51c2VNZW1vKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdldEdhcFdpZHRoKGdhcE1vZGUpOyB9LCBbZ2FwTW9kZV0pO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFN0eWxlLCB7IHN0eWxlczogZ2V0U3R5bGVzKGdhcCwgIW5vUmVsYXRpdmUsIGdhcE1vZGUsICFub0ltcG9ydGFudCA/ICchaW1wb3J0YW50JyA6ICcnKSB9KTtcbn07XG4iLCJleHBvcnQgdmFyIHplcm9SaWdodENsYXNzTmFtZSA9ICdyaWdodC1zY3JvbGwtYmFyLXBvc2l0aW9uJztcbmV4cG9ydCB2YXIgZnVsbFdpZHRoQ2xhc3NOYW1lID0gJ3dpZHRoLWJlZm9yZS1zY3JvbGwtYmFyJztcbmV4cG9ydCB2YXIgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lID0gJ3dpdGgtc2Nyb2xsLWJhcnMtaGlkZGVuJztcbi8qKlxuICogTmFtZSBvZiBhIENTUyB2YXJpYWJsZSBjb250YWluaW5nIHRoZSBhbW91bnQgb2YgXCJoaWRkZW5cIiBzY3JvbGxiYXJcbiAqICEgbWlnaHQgYmUgdW5kZWZpbmVkICEgdXNlIHdpbGwgZmFsbGJhY2shXG4gKi9cbmV4cG9ydCB2YXIgcmVtb3ZlZEJhclNpemVWYXJpYWJsZSA9ICctLXJlbW92ZWQtYm9keS1zY3JvbGwtYmFyLXNpemUnO1xuIiwiaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsQmFyIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgemVyb1JpZ2h0Q2xhc3NOYW1lLCBmdWxsV2lkdGhDbGFzc05hbWUsIG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSwgcmVtb3ZlZEJhclNpemVWYXJpYWJsZSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldEdhcFdpZHRoIH0gZnJvbSAnLi91dGlscyc7XG5leHBvcnQgeyBSZW1vdmVTY3JvbGxCYXIsIHplcm9SaWdodENsYXNzTmFtZSwgZnVsbFdpZHRoQ2xhc3NOYW1lLCBub1Njcm9sbGJhcnNDbGFzc05hbWUsIHJlbW92ZWRCYXJTaXplVmFyaWFibGUsIGdldEdhcFdpZHRoLCB9O1xuIiwiZXhwb3J0IHZhciB6ZXJvR2FwID0ge1xuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGdhcDogMCxcbn07XG52YXIgcGFyc2UgPSBmdW5jdGlvbiAoeCkgeyByZXR1cm4gcGFyc2VJbnQoeCB8fCAnJywgMTApIHx8IDA7IH07XG52YXIgZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gKGdhcE1vZGUpIHtcbiAgICB2YXIgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KTtcbiAgICB2YXIgbGVmdCA9IGNzW2dhcE1vZGUgPT09ICdwYWRkaW5nJyA/ICdwYWRkaW5nTGVmdCcgOiAnbWFyZ2luTGVmdCddO1xuICAgIHZhciB0b3AgPSBjc1tnYXBNb2RlID09PSAncGFkZGluZycgPyAncGFkZGluZ1RvcCcgOiAnbWFyZ2luVG9wJ107XG4gICAgdmFyIHJpZ2h0ID0gY3NbZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnID8gJ3BhZGRpbmdSaWdodCcgOiAnbWFyZ2luUmlnaHQnXTtcbiAgICByZXR1cm4gW3BhcnNlKGxlZnQpLCBwYXJzZSh0b3ApLCBwYXJzZShyaWdodCldO1xufTtcbmV4cG9ydCB2YXIgZ2V0R2FwV2lkdGggPSBmdW5jdGlvbiAoZ2FwTW9kZSkge1xuICAgIGlmIChnYXBNb2RlID09PSB2b2lkIDApIHsgZ2FwTW9kZSA9ICdtYXJnaW4nOyB9XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB6ZXJvR2FwO1xuICAgIH1cbiAgICB2YXIgb2Zmc2V0cyA9IGdldE9mZnNldChnYXBNb2RlKTtcbiAgICB2YXIgZG9jdW1lbnRXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBvZmZzZXRzWzBdLFxuICAgICAgICB0b3A6IG9mZnNldHNbMV0sXG4gICAgICAgIHJpZ2h0OiBvZmZzZXRzWzJdLFxuICAgICAgICBnYXA6IE1hdGgubWF4KDAsIHdpbmRvd1dpZHRoIC0gZG9jdW1lbnRXaWR0aCArIG9mZnNldHNbMl0gLSBvZmZzZXRzWzBdKSxcbiAgICB9O1xufTtcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSZW1vdmVTY3JvbGwgfSBmcm9tICcuL1VJJztcbmltcG9ydCBTaWRlQ2FyIGZyb20gJy4vc2lkZWNhcic7XG52YXIgUmVhY3RSZW1vdmVTY3JvbGwgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7IHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZW1vdmVTY3JvbGwsIF9fYXNzaWduKHt9LCBwcm9wcywgeyByZWY6IHJlZiwgc2lkZUNhcjogU2lkZUNhciB9KSkpOyB9KTtcblJlYWN0UmVtb3ZlU2Nyb2xsLmNsYXNzTmFtZXMgPSBSZW1vdmVTY3JvbGwuY2xhc3NOYW1lcztcbmV4cG9ydCBkZWZhdWx0IFJlYWN0UmVtb3ZlU2Nyb2xsO1xuIiwiaW1wb3J0IHsgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsQmFyIH0gZnJvbSAncmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXInO1xuaW1wb3J0IHsgc3R5bGVTaW5nbGV0b24gfSBmcm9tICdyZWFjdC1zdHlsZS1zaW5nbGV0b24nO1xuaW1wb3J0IHsgbm9uUGFzc2l2ZSB9IGZyb20gJy4vYWdncmVzaXZlQ2FwdHVyZSc7XG5pbXBvcnQgeyBoYW5kbGVTY3JvbGwsIGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkIH0gZnJvbSAnLi9oYW5kbGVTY3JvbGwnO1xuZXhwb3J0IHZhciBnZXRUb3VjaFhZID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgcmV0dXJuICdjaGFuZ2VkVG91Y2hlcycgaW4gZXZlbnQgPyBbZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WV0gOiBbMCwgMF07XG59O1xuZXhwb3J0IHZhciBnZXREZWx0YVhZID0gZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBbZXZlbnQuZGVsdGFYLCBldmVudC5kZWx0YVldOyB9O1xudmFyIGV4dHJhY3RSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgcmV0dXJuIHJlZiAmJiAnY3VycmVudCcgaW4gcmVmID8gcmVmLmN1cnJlbnQgOiByZWY7XG59O1xudmFyIGRlbHRhQ29tcGFyZSA9IGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiB4WzBdID09PSB5WzBdICYmIHhbMV0gPT09IHlbMV07IH07XG52YXIgZ2VuZXJhdGVTdHlsZSA9IGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gXCJcXG4gIC5ibG9jay1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCwgXCIge3BvaW50ZXItZXZlbnRzOiBub25lO31cXG4gIC5hbGxvdy1pbnRlcmFjdGl2aXR5LVwiKS5jb25jYXQoaWQsIFwiIHtwb2ludGVyLWV2ZW50czogYWxsO31cXG5cIik7IH07XG52YXIgaWRDb3VudGVyID0gMDtcbnZhciBsb2NrU3RhY2sgPSBbXTtcbmV4cG9ydCBmdW5jdGlvbiBSZW1vdmVTY3JvbGxTaWRlQ2FyKHByb3BzKSB7XG4gICAgdmFyIHNob3VsZFByZXZlbnRRdWV1ZSA9IFJlYWN0LnVzZVJlZihbXSk7XG4gICAgdmFyIHRvdWNoU3RhcnRSZWYgPSBSZWFjdC51c2VSZWYoWzAsIDBdKTtcbiAgICB2YXIgYWN0aXZlQXhpcyA9IFJlYWN0LnVzZVJlZigpO1xuICAgIHZhciBpZCA9IFJlYWN0LnVzZVN0YXRlKGlkQ291bnRlcisrKVswXTtcbiAgICB2YXIgU3R5bGUgPSBSZWFjdC51c2VTdGF0ZShzdHlsZVNpbmdsZXRvbilbMF07XG4gICAgdmFyIGxhc3RQcm9wcyA9IFJlYWN0LnVzZVJlZihwcm9wcyk7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGFzdFByb3BzLmN1cnJlbnQgPSBwcm9wcztcbiAgICB9LCBbcHJvcHNdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocHJvcHMuaW5lcnQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcImJsb2NrLWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkKSk7XG4gICAgICAgICAgICB2YXIgYWxsb3dfMSA9IF9fc3ByZWFkQXJyYXkoW3Byb3BzLmxvY2tSZWYuY3VycmVudF0sIChwcm9wcy5zaGFyZHMgfHwgW10pLm1hcChleHRyYWN0UmVmKSwgdHJ1ZSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgICAgYWxsb3dfMS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChcImFsbG93LWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkKSk7IH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJibG9jay1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCkpO1xuICAgICAgICAgICAgICAgIGFsbG93XzEuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhbGxvdy1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCkpOyB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH0sIFtwcm9wcy5pbmVydCwgcHJvcHMubG9ja1JlZi5jdXJyZW50LCBwcm9wcy5zaGFyZHNdKTtcbiAgICB2YXIgc2hvdWxkQ2FuY2VsRXZlbnQgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoZXZlbnQsIHBhcmVudCkge1xuICAgICAgICBpZiAoKCd0b3VjaGVzJyBpbiBldmVudCAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMikgfHwgKGV2ZW50LnR5cGUgPT09ICd3aGVlbCcgJiYgZXZlbnQuY3RybEtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiAhbGFzdFByb3BzLmN1cnJlbnQuYWxsb3dQaW5jaFpvb207XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdWNoID0gZ2V0VG91Y2hYWShldmVudCk7XG4gICAgICAgIHZhciB0b3VjaFN0YXJ0ID0gdG91Y2hTdGFydFJlZi5jdXJyZW50O1xuICAgICAgICB2YXIgZGVsdGFYID0gJ2RlbHRhWCcgaW4gZXZlbnQgPyBldmVudC5kZWx0YVggOiB0b3VjaFN0YXJ0WzBdIC0gdG91Y2hbMF07XG4gICAgICAgIHZhciBkZWx0YVkgPSAnZGVsdGFZJyBpbiBldmVudCA/IGV2ZW50LmRlbHRhWSA6IHRvdWNoU3RhcnRbMV0gLSB0b3VjaFsxXTtcbiAgICAgICAgdmFyIGN1cnJlbnRBeGlzO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB2YXIgbW92ZURpcmVjdGlvbiA9IE1hdGguYWJzKGRlbHRhWCkgPiBNYXRoLmFicyhkZWx0YVkpID8gJ2gnIDogJ3YnO1xuICAgICAgICAvLyBhbGxvdyBob3Jpem9udGFsIHRvdWNoIG1vdmUgb24gUmFuZ2UgaW5wdXRzLiBUaGV5IHdpbGwgbm90IGNhdXNlIGFueSBzY3JvbGxcbiAgICAgICAgaWYgKCd0b3VjaGVzJyBpbiBldmVudCAmJiBtb3ZlRGlyZWN0aW9uID09PSAnaCcgJiYgdGFyZ2V0LnR5cGUgPT09ICdyYW5nZScpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhbGxvdyBkcmFnIHNlbGVjdGlvbiAoaU9TKTsgY2hlY2sgaWYgc2VsZWN0aW9uJ3MgYW5jaG9yTm9kZSBpcyB0aGUgc2FtZSBhcyB0YXJnZXQgb3IgY29udGFpbnMgdGFyZ2V0XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciBhbmNob3JOb2RlID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5hbmNob3JOb2RlO1xuICAgICAgICB2YXIgaXNUb3VjaGluZ1NlbGVjdGlvbiA9IGFuY2hvck5vZGUgPyBhbmNob3JOb2RlID09PSB0YXJnZXQgfHwgYW5jaG9yTm9kZS5jb250YWlucyh0YXJnZXQpIDogZmFsc2U7XG4gICAgICAgIGlmIChpc1RvdWNoaW5nU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24gPSBsb2NhdGlvbkNvdWxkQmVTY3JvbGxlZChtb3ZlRGlyZWN0aW9uLCB0YXJnZXQpO1xuICAgICAgICBpZiAoIWNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjdXJyZW50QXhpcyA9IG1vdmVEaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50QXhpcyA9IG1vdmVEaXJlY3Rpb24gPT09ICd2JyA/ICdoJyA6ICd2JztcbiAgICAgICAgICAgIGNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24gPSBsb2NhdGlvbkNvdWxkQmVTY3JvbGxlZChtb3ZlRGlyZWN0aW9uLCB0YXJnZXQpO1xuICAgICAgICAgICAgLy8gb3RoZXIgYXhpcyBtaWdodCBiZSBub3Qgc2Nyb2xsYWJsZVxuICAgICAgICB9XG4gICAgICAgIGlmICghY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYWN0aXZlQXhpcy5jdXJyZW50ICYmICdjaGFuZ2VkVG91Y2hlcycgaW4gZXZlbnQgJiYgKGRlbHRhWCB8fCBkZWx0YVkpKSB7XG4gICAgICAgICAgICBhY3RpdmVBeGlzLmN1cnJlbnQgPSBjdXJyZW50QXhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWN1cnJlbnRBeGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FuY2VsaW5nQXhpcyA9IGFjdGl2ZUF4aXMuY3VycmVudCB8fCBjdXJyZW50QXhpcztcbiAgICAgICAgcmV0dXJuIGhhbmRsZVNjcm9sbChjYW5jZWxpbmdBeGlzLCBwYXJlbnQsIGV2ZW50LCBjYW5jZWxpbmdBeGlzID09PSAnaCcgPyBkZWx0YVggOiBkZWx0YVksIHRydWUpO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2hvdWxkUHJldmVudCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChfZXZlbnQpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gX2V2ZW50O1xuICAgICAgICBpZiAoIWxvY2tTdGFjay5sZW5ndGggfHwgbG9ja1N0YWNrW2xvY2tTdGFjay5sZW5ndGggLSAxXSAhPT0gU3R5bGUpIHtcbiAgICAgICAgICAgIC8vIG5vdCB0aGUgbGFzdCBhY3RpdmVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsdGEgPSAnZGVsdGFZJyBpbiBldmVudCA/IGdldERlbHRhWFkoZXZlbnQpIDogZ2V0VG91Y2hYWShldmVudCk7XG4gICAgICAgIHZhciBzb3VyY2VFdmVudCA9IHNob3VsZFByZXZlbnRRdWV1ZS5jdXJyZW50LmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSBldmVudC50eXBlICYmIChlLnRhcmdldCA9PT0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnRhcmdldCA9PT0gZS5zaGFkb3dQYXJlbnQpICYmIGRlbHRhQ29tcGFyZShlLmRlbHRhLCBkZWx0YSk7IH0pWzBdO1xuICAgICAgICAvLyBzZWxmIGV2ZW50LCBhbmQgc2hvdWxkIGJlIGNhbmNlbGVkXG4gICAgICAgIGlmIChzb3VyY2VFdmVudCAmJiBzb3VyY2VFdmVudC5zaG91bGQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdXRzaWRlIG9yIHNoYXJkIGV2ZW50XG4gICAgICAgIGlmICghc291cmNlRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBzaGFyZE5vZGVzID0gKGxhc3RQcm9wcy5jdXJyZW50LnNoYXJkcyB8fCBbXSlcbiAgICAgICAgICAgICAgICAubWFwKGV4dHJhY3RSZWYpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIG5vZGUuY29udGFpbnMoZXZlbnQudGFyZ2V0KTsgfSk7XG4gICAgICAgICAgICB2YXIgc2hvdWxkU3RvcCA9IHNoYXJkTm9kZXMubGVuZ3RoID4gMCA/IHNob3VsZENhbmNlbEV2ZW50KGV2ZW50LCBzaGFyZE5vZGVzWzBdKSA6ICFsYXN0UHJvcHMuY3VycmVudC5ub0lzb2xhdGlvbjtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdG9wKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG4gICAgdmFyIHNob3VsZENhbmNlbCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChuYW1lLCBkZWx0YSwgdGFyZ2V0LCBzaG91bGQpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0geyBuYW1lOiBuYW1lLCBkZWx0YTogZGVsdGEsIHRhcmdldDogdGFyZ2V0LCBzaG91bGQ6IHNob3VsZCwgc2hhZG93UGFyZW50OiBnZXRPdXRlcm1vc3RTaGFkb3dQYXJlbnQodGFyZ2V0KSB9O1xuICAgICAgICBzaG91bGRQcmV2ZW50UXVldWUuY3VycmVudC5wdXNoKGV2ZW50KTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzaG91bGRQcmV2ZW50UXVldWUuY3VycmVudCA9IHNob3VsZFByZXZlbnRRdWV1ZS5jdXJyZW50LmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZSAhPT0gZXZlbnQ7IH0pO1xuICAgICAgICB9LCAxKTtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHNjcm9sbFRvdWNoU3RhcnQgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdG91Y2hTdGFydFJlZi5jdXJyZW50ID0gZ2V0VG91Y2hYWShldmVudCk7XG4gICAgICAgIGFjdGl2ZUF4aXMuY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHNjcm9sbFdoZWVsID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNob3VsZENhbmNlbChldmVudC50eXBlLCBnZXREZWx0YVhZKGV2ZW50KSwgZXZlbnQudGFyZ2V0LCBzaG91bGRDYW5jZWxFdmVudChldmVudCwgcHJvcHMubG9ja1JlZi5jdXJyZW50KSk7XG4gICAgfSwgW10pO1xuICAgIHZhciBzY3JvbGxUb3VjaE1vdmUgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsKGV2ZW50LnR5cGUsIGdldFRvdWNoWFkoZXZlbnQpLCBldmVudC50YXJnZXQsIHNob3VsZENhbmNlbEV2ZW50KGV2ZW50LCBwcm9wcy5sb2NrUmVmLmN1cnJlbnQpKTtcbiAgICB9LCBbXSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9ja1N0YWNrLnB1c2goU3R5bGUpO1xuICAgICAgICBwcm9wcy5zZXRDYWxsYmFja3Moe1xuICAgICAgICAgICAgb25TY3JvbGxDYXB0dXJlOiBzY3JvbGxXaGVlbCxcbiAgICAgICAgICAgIG9uV2hlZWxDYXB0dXJlOiBzY3JvbGxXaGVlbCxcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlQ2FwdHVyZTogc2Nyb2xsVG91Y2hNb3ZlLFxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzaG91bGRQcmV2ZW50LCBub25QYXNzaXZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2hvdWxkUHJldmVudCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzY3JvbGxUb3VjaFN0YXJ0LCBub25QYXNzaXZlKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxvY2tTdGFjayA9IGxvY2tTdGFjay5maWx0ZXIoZnVuY3Rpb24gKGluc3QpIHsgcmV0dXJuIGluc3QgIT09IFN0eWxlOyB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgc2hvdWxkUHJldmVudCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBzaG91bGRQcmV2ZW50LCBub25QYXNzaXZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzY3JvbGxUb3VjaFN0YXJ0LCBub25QYXNzaXZlKTtcbiAgICAgICAgfTtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHJlbW92ZVNjcm9sbEJhciA9IHByb3BzLnJlbW92ZVNjcm9sbEJhciwgaW5lcnQgPSBwcm9wcy5pbmVydDtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIGluZXJ0ID8gUmVhY3QuY3JlYXRlRWxlbWVudChTdHlsZSwgeyBzdHlsZXM6IGdlbmVyYXRlU3R5bGUoaWQpIH0pIDogbnVsbCxcbiAgICAgICAgcmVtb3ZlU2Nyb2xsQmFyID8gUmVhY3QuY3JlYXRlRWxlbWVudChSZW1vdmVTY3JvbGxCYXIsIHsgbm9SZWxhdGl2ZTogcHJvcHMubm9SZWxhdGl2ZSwgZ2FwTW9kZTogcHJvcHMuZ2FwTW9kZSB9KSA6IG51bGwpKTtcbn1cbmZ1bmN0aW9uIGdldE91dGVybW9zdFNoYWRvd1BhcmVudChub2RlKSB7XG4gICAgdmFyIHNoYWRvd1BhcmVudCA9IG51bGw7XG4gICAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBTaGFkb3dSb290KSB7XG4gICAgICAgICAgICBzaGFkb3dQYXJlbnQgPSBub2RlLmhvc3Q7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5ob3N0O1xuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBzaGFkb3dQYXJlbnQ7XG59XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19yZXN0IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmdWxsV2lkdGhDbGFzc05hbWUsIHplcm9SaWdodENsYXNzTmFtZSB9IGZyb20gJ3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB1c2VNZXJnZVJlZnMgfSBmcm9tICd1c2UtY2FsbGJhY2stcmVmJztcbmltcG9ydCB7IGVmZmVjdENhciB9IGZyb20gJy4vbWVkaXVtJztcbnZhciBub3RoaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybjtcbn07XG4vKipcbiAqIFJlbW92ZXMgc2Nyb2xsYmFyIGZyb20gdGhlIHBhZ2UgYW5kIGNvbnRhaW4gdGhlIHNjcm9sbCB3aXRoaW4gdGhlIExvY2tcbiAqL1xudmFyIFJlbW92ZVNjcm9sbCA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCBwYXJlbnRSZWYpIHtcbiAgICB2YXIgcmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIHZhciBfYSA9IFJlYWN0LnVzZVN0YXRlKHtcbiAgICAgICAgb25TY3JvbGxDYXB0dXJlOiBub3RoaW5nLFxuICAgICAgICBvbldoZWVsQ2FwdHVyZTogbm90aGluZyxcbiAgICAgICAgb25Ub3VjaE1vdmVDYXB0dXJlOiBub3RoaW5nLFxuICAgIH0pLCBjYWxsYmFja3MgPSBfYVswXSwgc2V0Q2FsbGJhY2tzID0gX2FbMV07XG4gICAgdmFyIGZvcndhcmRQcm9wcyA9IHByb3BzLmZvcndhcmRQcm9wcywgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbiwgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLCByZW1vdmVTY3JvbGxCYXIgPSBwcm9wcy5yZW1vdmVTY3JvbGxCYXIsIGVuYWJsZWQgPSBwcm9wcy5lbmFibGVkLCBzaGFyZHMgPSBwcm9wcy5zaGFyZHMsIHNpZGVDYXIgPSBwcm9wcy5zaWRlQ2FyLCBub1JlbGF0aXZlID0gcHJvcHMubm9SZWxhdGl2ZSwgbm9Jc29sYXRpb24gPSBwcm9wcy5ub0lzb2xhdGlvbiwgaW5lcnQgPSBwcm9wcy5pbmVydCwgYWxsb3dQaW5jaFpvb20gPSBwcm9wcy5hbGxvd1BpbmNoWm9vbSwgX2IgPSBwcm9wcy5hcywgQ29udGFpbmVyID0gX2IgPT09IHZvaWQgMCA/ICdkaXYnIDogX2IsIGdhcE1vZGUgPSBwcm9wcy5nYXBNb2RlLCByZXN0ID0gX19yZXN0KHByb3BzLCBbXCJmb3J3YXJkUHJvcHNcIiwgXCJjaGlsZHJlblwiLCBcImNsYXNzTmFtZVwiLCBcInJlbW92ZVNjcm9sbEJhclwiLCBcImVuYWJsZWRcIiwgXCJzaGFyZHNcIiwgXCJzaWRlQ2FyXCIsIFwibm9SZWxhdGl2ZVwiLCBcIm5vSXNvbGF0aW9uXCIsIFwiaW5lcnRcIiwgXCJhbGxvd1BpbmNoWm9vbVwiLCBcImFzXCIsIFwiZ2FwTW9kZVwiXSk7XG4gICAgdmFyIFNpZGVDYXIgPSBzaWRlQ2FyO1xuICAgIHZhciBjb250YWluZXJSZWYgPSB1c2VNZXJnZVJlZnMoW3JlZiwgcGFyZW50UmVmXSk7XG4gICAgdmFyIGNvbnRhaW5lclByb3BzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3QpLCBjYWxsYmFja3MpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgZW5hYmxlZCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlQ2FyLCB7IHNpZGVDYXI6IGVmZmVjdENhciwgcmVtb3ZlU2Nyb2xsQmFyOiByZW1vdmVTY3JvbGxCYXIsIHNoYXJkczogc2hhcmRzLCBub1JlbGF0aXZlOiBub1JlbGF0aXZlLCBub0lzb2xhdGlvbjogbm9Jc29sYXRpb24sIGluZXJ0OiBpbmVydCwgc2V0Q2FsbGJhY2tzOiBzZXRDYWxsYmFja3MsIGFsbG93UGluY2hab29tOiAhIWFsbG93UGluY2hab29tLCBsb2NrUmVmOiByZWYsIGdhcE1vZGU6IGdhcE1vZGUgfSkpLFxuICAgICAgICBmb3J3YXJkUHJvcHMgPyAoUmVhY3QuY2xvbmVFbGVtZW50KFJlYWN0LkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY29udGFpbmVyUHJvcHMpLCB7IHJlZjogY29udGFpbmVyUmVmIH0pKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChDb250YWluZXIsIF9fYXNzaWduKHt9LCBjb250YWluZXJQcm9wcywgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgcmVmOiBjb250YWluZXJSZWYgfSksIGNoaWxkcmVuKSkpKTtcbn0pO1xuUmVtb3ZlU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIHJlbW92ZVNjcm9sbEJhcjogdHJ1ZSxcbiAgICBpbmVydDogZmFsc2UsXG59O1xuUmVtb3ZlU2Nyb2xsLmNsYXNzTmFtZXMgPSB7XG4gICAgZnVsbFdpZHRoOiBmdWxsV2lkdGhDbGFzc05hbWUsXG4gICAgemVyb1JpZ2h0OiB6ZXJvUmlnaHRDbGFzc05hbWUsXG59O1xuZXhwb3J0IHsgUmVtb3ZlU2Nyb2xsIH07XG4iLCJ2YXIgcGFzc2l2ZVN1cHBvcnRlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcGFzc2l2ZVN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0Jywgb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgcGFzc2l2ZVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCB2YXIgbm9uUGFzc2l2ZSA9IHBhc3NpdmVTdXBwb3J0ZWQgPyB7IHBhc3NpdmU6IGZhbHNlIH0gOiBmYWxzZTtcbiIsInZhciBhbHdheXNDb250YWluc1Njcm9sbCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgLy8gdGV4dGFyZWEgd2lsbCBhbHdheXMgX2NvbnRhaW5fIHNjcm9sbCBpbnNpZGUgc2VsZi4gSXQgb25seSBjYW4gYmUgaGlkZGVuXG4gICAgcmV0dXJuIG5vZGUudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJztcbn07XG52YXIgZWxlbWVudENhbkJlU2Nyb2xsZWQgPSBmdW5jdGlvbiAobm9kZSwgb3ZlcmZsb3cpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgcmV0dXJuIChcbiAgICAvLyBub3Qtbm90LXNjcm9sbGFibGVcbiAgICBzdHlsZXNbb3ZlcmZsb3ddICE9PSAnaGlkZGVuJyAmJlxuICAgICAgICAvLyBjb250YWlucyBzY3JvbGwgaW5zaWRlIHNlbGZcbiAgICAgICAgIShzdHlsZXMub3ZlcmZsb3dZID09PSBzdHlsZXMub3ZlcmZsb3dYICYmICFhbHdheXNDb250YWluc1Njcm9sbChub2RlKSAmJiBzdHlsZXNbb3ZlcmZsb3ddID09PSAndmlzaWJsZScpKTtcbn07XG52YXIgZWxlbWVudENvdWxkQmVWU2Nyb2xsZWQgPSBmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gZWxlbWVudENhbkJlU2Nyb2xsZWQobm9kZSwgJ292ZXJmbG93WScpOyB9O1xudmFyIGVsZW1lbnRDb3VsZEJlSFNjcm9sbGVkID0gZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIGVsZW1lbnRDYW5CZVNjcm9sbGVkKG5vZGUsICdvdmVyZmxvd1gnKTsgfTtcbmV4cG9ydCB2YXIgbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQgPSBmdW5jdGlvbiAoYXhpcywgbm9kZSkge1xuICAgIHZhciBvd25lckRvY3VtZW50ID0gbm9kZS5vd25lckRvY3VtZW50O1xuICAgIHZhciBjdXJyZW50ID0gbm9kZTtcbiAgICBkbyB7XG4gICAgICAgIC8vIFNraXAgb3ZlciBzaGFkb3cgcm9vdFxuICAgICAgICBpZiAodHlwZW9mIFNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnICYmIGN1cnJlbnQgaW5zdGFuY2VvZiBTaGFkb3dSb290KSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5ob3N0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBpc1Njcm9sbGFibGUgPSBlbGVtZW50Q291bGRCZVNjcm9sbGVkKGF4aXMsIGN1cnJlbnQpO1xuICAgICAgICBpZiAoaXNTY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBnZXRTY3JvbGxWYXJpYWJsZXMoYXhpcywgY3VycmVudCksIHNjcm9sbEhlaWdodCA9IF9hWzFdLCBjbGllbnRIZWlnaHQgPSBfYVsyXTtcbiAgICAgICAgICAgIGlmIChzY3JvbGxIZWlnaHQgPiBjbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xuICAgIH0gd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gb3duZXJEb2N1bWVudC5ib2R5KTtcbiAgICByZXR1cm4gZmFsc2U7XG59O1xudmFyIGdldFZTY3JvbGxWYXJpYWJsZXMgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gX2Euc2Nyb2xsVG9wLCBzY3JvbGxIZWlnaHQgPSBfYS5zY3JvbGxIZWlnaHQsIGNsaWVudEhlaWdodCA9IF9hLmNsaWVudEhlaWdodDtcbiAgICByZXR1cm4gW1xuICAgICAgICBzY3JvbGxUb3AsXG4gICAgICAgIHNjcm9sbEhlaWdodCxcbiAgICAgICAgY2xpZW50SGVpZ2h0LFxuICAgIF07XG59O1xudmFyIGdldEhTY3JvbGxWYXJpYWJsZXMgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgc2Nyb2xsTGVmdCA9IF9hLnNjcm9sbExlZnQsIHNjcm9sbFdpZHRoID0gX2Euc2Nyb2xsV2lkdGgsIGNsaWVudFdpZHRoID0gX2EuY2xpZW50V2lkdGg7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgc2Nyb2xsTGVmdCxcbiAgICAgICAgc2Nyb2xsV2lkdGgsXG4gICAgICAgIGNsaWVudFdpZHRoLFxuICAgIF07XG59O1xudmFyIGVsZW1lbnRDb3VsZEJlU2Nyb2xsZWQgPSBmdW5jdGlvbiAoYXhpcywgbm9kZSkge1xuICAgIHJldHVybiBheGlzID09PSAndicgPyBlbGVtZW50Q291bGRCZVZTY3JvbGxlZChub2RlKSA6IGVsZW1lbnRDb3VsZEJlSFNjcm9sbGVkKG5vZGUpO1xufTtcbnZhciBnZXRTY3JvbGxWYXJpYWJsZXMgPSBmdW5jdGlvbiAoYXhpcywgbm9kZSkge1xuICAgIHJldHVybiBheGlzID09PSAndicgPyBnZXRWU2Nyb2xsVmFyaWFibGVzKG5vZGUpIDogZ2V0SFNjcm9sbFZhcmlhYmxlcyhub2RlKTtcbn07XG52YXIgZ2V0RGlyZWN0aW9uRmFjdG9yID0gZnVuY3Rpb24gKGF4aXMsIGRpcmVjdGlvbikge1xuICAgIC8qKlxuICAgICAqIElmIHRoZSBlbGVtZW50J3MgZGlyZWN0aW9uIGlzIHJ0bCAocmlnaHQtdG8tbGVmdCksIHRoZW4gc2Nyb2xsTGVmdCBpcyAwIHdoZW4gdGhlIHNjcm9sbGJhciBpcyBhdCBpdHMgcmlnaHRtb3N0IHBvc2l0aW9uLFxuICAgICAqIGFuZCB0aGVuIGluY3JlYXNpbmdseSBuZWdhdGl2ZSBhcyB5b3Ugc2Nyb2xsIHRvd2FyZHMgdGhlIGVuZCBvZiB0aGUgY29udGVudC5cbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L3Njcm9sbExlZnRcbiAgICAgKi9cbiAgICByZXR1cm4gYXhpcyA9PT0gJ2gnICYmIGRpcmVjdGlvbiA9PT0gJ3J0bCcgPyAtMSA6IDE7XG59O1xuZXhwb3J0IHZhciBoYW5kbGVTY3JvbGwgPSBmdW5jdGlvbiAoYXhpcywgZW5kVGFyZ2V0LCBldmVudCwgc291cmNlRGVsdGEsIG5vT3ZlcnNjcm9sbCkge1xuICAgIHZhciBkaXJlY3Rpb25GYWN0b3IgPSBnZXREaXJlY3Rpb25GYWN0b3IoYXhpcywgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZW5kVGFyZ2V0KS5kaXJlY3Rpb24pO1xuICAgIHZhciBkZWx0YSA9IGRpcmVjdGlvbkZhY3RvciAqIHNvdXJjZURlbHRhO1xuICAgIC8vIGZpbmQgc2Nyb2xsYWJsZSB0YXJnZXRcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciB0YXJnZXRJbkxvY2sgPSBlbmRUYXJnZXQuY29udGFpbnModGFyZ2V0KTtcbiAgICB2YXIgc2hvdWxkQ2FuY2VsU2Nyb2xsID0gZmFsc2U7XG4gICAgdmFyIGlzRGVsdGFQb3NpdGl2ZSA9IGRlbHRhID4gMDtcbiAgICB2YXIgYXZhaWxhYmxlU2Nyb2xsID0gMDtcbiAgICB2YXIgYXZhaWxhYmxlU2Nyb2xsVG9wID0gMDtcbiAgICBkbyB7XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSBnZXRTY3JvbGxWYXJpYWJsZXMoYXhpcywgdGFyZ2V0KSwgcG9zaXRpb24gPSBfYVswXSwgc2Nyb2xsXzEgPSBfYVsxXSwgY2FwYWNpdHkgPSBfYVsyXTtcbiAgICAgICAgdmFyIGVsZW1lbnRTY3JvbGwgPSBzY3JvbGxfMSAtIGNhcGFjaXR5IC0gZGlyZWN0aW9uRmFjdG9yICogcG9zaXRpb247XG4gICAgICAgIGlmIChwb3NpdGlvbiB8fCBlbGVtZW50U2Nyb2xsKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudENvdWxkQmVTY3JvbGxlZChheGlzLCB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlU2Nyb2xsICs9IGVsZW1lbnRTY3JvbGw7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlU2Nyb2xsVG9wICs9IHBvc2l0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJlbnRfMSA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAvLyB3ZSB3aWxsIFwiYnViYmxlXCIgZnJvbSBTaGFkb3dEb20gaW4gY2FzZSB3ZSBhcmUsIG9yIGp1c3QgdG8gdGhlIHBhcmVudCBpbiBub3JtYWwgY2FzZVxuICAgICAgICAvLyB0aGlzIGlzIHRoZSBzYW1lIGxvZ2ljIHVzZWQgaW4gZm9jdXMtbG9ja1xuICAgICAgICB0YXJnZXQgPSAocGFyZW50XzEgJiYgcGFyZW50XzEubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA/IHBhcmVudF8xLmhvc3QgOiBwYXJlbnRfMSk7XG4gICAgfSB3aGlsZSAoXG4gICAgLy8gcG9ydGFsZWQgY29udGVudFxuICAgICghdGFyZ2V0SW5Mb2NrICYmIHRhcmdldCAhPT0gZG9jdW1lbnQuYm9keSkgfHxcbiAgICAgICAgLy8gc2VsZiBjb250ZW50XG4gICAgICAgICh0YXJnZXRJbkxvY2sgJiYgKGVuZFRhcmdldC5jb250YWlucyh0YXJnZXQpIHx8IGVuZFRhcmdldCA9PT0gdGFyZ2V0KSkpO1xuICAgIC8vIGhhbmRsZSBlcHNpbG9uIGFyb3VuZCAwIChub24gc3RhbmRhcmQgem9vbSBsZXZlbHMpXG4gICAgaWYgKGlzRGVsdGFQb3NpdGl2ZSAmJlxuICAgICAgICAoKG5vT3ZlcnNjcm9sbCAmJiBNYXRoLmFicyhhdmFpbGFibGVTY3JvbGwpIDwgMSkgfHwgKCFub092ZXJzY3JvbGwgJiYgZGVsdGEgPiBhdmFpbGFibGVTY3JvbGwpKSkge1xuICAgICAgICBzaG91bGRDYW5jZWxTY3JvbGwgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmICghaXNEZWx0YVBvc2l0aXZlICYmXG4gICAgICAgICgobm9PdmVyc2Nyb2xsICYmIE1hdGguYWJzKGF2YWlsYWJsZVNjcm9sbFRvcCkgPCAxKSB8fCAoIW5vT3ZlcnNjcm9sbCAmJiAtZGVsdGEgPiBhdmFpbGFibGVTY3JvbGxUb3ApKSkge1xuICAgICAgICBzaG91bGRDYW5jZWxTY3JvbGwgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2hvdWxkQ2FuY2VsU2Nyb2xsO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZVNpZGVjYXJNZWRpdW0gfSBmcm9tICd1c2Utc2lkZWNhcic7XG5leHBvcnQgdmFyIGVmZmVjdENhciA9IGNyZWF0ZVNpZGVjYXJNZWRpdW0oKTtcbiIsImltcG9ydCB7IGV4cG9ydFNpZGVjYXIgfSBmcm9tICd1c2Utc2lkZWNhcic7XG5pbXBvcnQgeyBSZW1vdmVTY3JvbGxTaWRlQ2FyIH0gZnJvbSAnLi9TaWRlRWZmZWN0JztcbmltcG9ydCB7IGVmZmVjdENhciB9IGZyb20gJy4vbWVkaXVtJztcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydFNpZGVjYXIoZWZmZWN0Q2FyLCBSZW1vdmVTY3JvbGxTaWRlQ2FyKTtcbiIsImltcG9ydCB7IHN0eWxlSG9va1NpbmdsZXRvbiB9IGZyb20gJy4vaG9vayc7XG4vKipcbiAqIGNyZWF0ZSBhIENvbXBvbmVudCB0byBhZGQgc3R5bGVzIG9uIGRlbWFuZFxuICogLSBzdHlsZXMgYXJlIGFkZGVkIHdoZW4gZmlyc3QgaW5zdGFuY2UgaXMgbW91bnRlZFxuICogLSBzdHlsZXMgYXJlIHJlbW92ZWQgd2hlbiB0aGUgbGFzdCBpbnN0YW5jZSBpcyB1bm1vdW50ZWRcbiAqIC0gY2hhbmdpbmcgc3R5bGVzIGluIHJ1bnRpbWUgZG9lcyBub3RoaW5nIHVubGVzcyBkeW5hbWljIGlzIHNldC4gQnV0IHdpdGggbXVsdGlwbGUgY29tcG9uZW50cyB0aGF0IGNhbiBsZWFkIHRvIHRoZSB1bmRlZmluZWQgYmVoYXZpb3JcbiAqL1xuZXhwb3J0IHZhciBzdHlsZVNpbmdsZXRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdXNlU3R5bGUgPSBzdHlsZUhvb2tTaW5nbGV0b24oKTtcbiAgICB2YXIgU2hlZXQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHN0eWxlcyA9IF9hLnN0eWxlcywgZHluYW1pYyA9IF9hLmR5bmFtaWM7XG4gICAgICAgIHVzZVN0eWxlKHN0eWxlcywgZHluYW1pYyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIFNoZWV0O1xufTtcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN0eWxlc2hlZXRTaW5nbGV0b24gfSBmcm9tICcuL3NpbmdsZXRvbic7XG4vKipcbiAqIGNyZWF0ZXMgYSBob29rIHRvIGNvbnRyb2wgc3R5bGUgc2luZ2xldG9uXG4gKiBAc2VlIHtAbGluayBzdHlsZVNpbmdsZXRvbn0gZm9yIGEgc2FmZXIgY29tcG9uZW50IHZlcnNpb25cbiAqIEBleGFtcGxlXG4gKiBgYGB0c3hcbiAqIGNvbnN0IHVzZVN0eWxlID0gc3R5bGVIb29rU2luZ2xldG9uKCk7XG4gKiAvLy9cbiAqIHVzZVN0eWxlKCdib2R5IHsgb3ZlcmZsb3c6IGhpZGRlbn0nKTtcbiAqL1xuZXhwb3J0IHZhciBzdHlsZUhvb2tTaW5nbGV0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNoZWV0ID0gc3R5bGVzaGVldFNpbmdsZXRvbigpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3R5bGVzLCBpc0R5bmFtaWMpIHtcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNoZWV0LmFkZChzdHlsZXMpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzaGVldC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIFtzdHlsZXMgJiYgaXNEeW5hbWljXSk7XG4gICAgfTtcbn07XG4iLCJleHBvcnQgeyBzdHlsZVNpbmdsZXRvbiB9IGZyb20gJy4vY29tcG9uZW50JztcbmV4cG9ydCB7IHN0eWxlc2hlZXRTaW5nbGV0b24gfSBmcm9tICcuL3NpbmdsZXRvbic7XG5leHBvcnQgeyBzdHlsZUhvb2tTaW5nbGV0b24gfSBmcm9tICcuL2hvb2snO1xuIiwiaW1wb3J0IHsgZ2V0Tm9uY2UgfSBmcm9tICdnZXQtbm9uY2UnO1xuZnVuY3Rpb24gbWFrZVN0eWxlVGFnKCkge1xuICAgIGlmICghZG9jdW1lbnQpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHRhZy50eXBlID0gJ3RleHQvY3NzJztcbiAgICB2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuICAgIGlmIChub25jZSkge1xuICAgICAgICB0YWcuc2V0QXR0cmlidXRlKCdub25jZScsIG5vbmNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhZztcbn1cbmZ1bmN0aW9uIGluamVjdFN0eWxlcyh0YWcsIGNzcykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodGFnLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0YWcuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluc2VydFN0eWxlVGFnKHRhZykge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQodGFnKTtcbn1cbmV4cG9ydCB2YXIgc3R5bGVzaGVldFNpbmdsZXRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY291bnRlciA9IDA7XG4gICAgdmFyIHN0eWxlc2hlZXQgPSBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICAgICAgICBpZiAoY291bnRlciA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKChzdHlsZXNoZWV0ID0gbWFrZVN0eWxlVGFnKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGluamVjdFN0eWxlcyhzdHlsZXNoZWV0LCBzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydFN0eWxlVGFnKHN0eWxlc2hlZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb3VudGVyLS07XG4gICAgICAgICAgICBpZiAoIWNvdW50ZXIgJiYgc3R5bGVzaGVldCkge1xuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQucGFyZW50Tm9kZSAmJiBzdHlsZXNoZWV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVzaGVldCk7XG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn07XG4iLCIvKipcbiAqIEFzc2lnbnMgYSB2YWx1ZSBmb3IgYSBnaXZlbiByZWYsIG5vIG1hdHRlciBvZiB0aGUgcmVmIGZvcm1hdFxuICogQHBhcmFtIHtSZWZPYmplY3R9IHJlZiAtIGEgY2FsbGJhY2sgZnVuY3Rpb24gb3IgcmVmIG9iamVjdFxuICogQHBhcmFtIHZhbHVlIC0gYSBuZXcgdmFsdWVcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvdXNlLWNhbGxiYWNrLXJlZiNhc3NpZ25yZWZcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByZWZPYmplY3QgPSB1c2VSZWYoKTtcbiAqIGNvbnN0IHJlZkZuID0gKHJlZikgPT4gey4uLi59XG4gKlxuICogYXNzaWduUmVmKHJlZk9iamVjdCwgXCJyZWZWYWx1ZVwiKTtcbiAqIGFzc2lnblJlZihyZWZGbiwgXCJyZWZWYWx1ZVwiKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnblJlZihyZWYsIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiByZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVmKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVmKSB7XG4gICAgICAgIHJlZi5jdXJyZW50ID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZWY7XG59XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhc3NpZ25SZWYgfSBmcm9tICcuL2Fzc2lnblJlZic7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gJy4vdXNlUmVmJztcbnZhciB1c2VJc29tb3JwaGljTGF5b3V0RWZmZWN0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBSZWFjdC51c2VMYXlvdXRFZmZlY3QgOiBSZWFjdC51c2VFZmZlY3Q7XG52YXIgY3VycmVudFZhbHVlcyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIE1lcmdlcyB0d28gb3IgbW9yZSByZWZzIHRvZ2V0aGVyIHByb3ZpZGluZyBhIHNpbmdsZSBpbnRlcmZhY2UgdG8gc2V0IHRoZWlyIHZhbHVlXG4gKiBAcGFyYW0ge1JlZk9iamVjdHxSZWZ9IHJlZnNcbiAqIEByZXR1cm5zIHtNdXRhYmxlUmVmT2JqZWN0fSAtIGEgbmV3IHJlZiwgd2hpY2ggdHJhbnNsYXRlcyBhbGwgY2hhbmdlcyB0byB7cmVmc31cbiAqXG4gKiBAc2VlIHtAbGluayBtZXJnZVJlZnN9IGEgdmVyc2lvbiB3aXRob3V0IGJ1aXQtaW4gbWVtb2l6YXRpb25cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI3VzZW1lcmdlcmVmc1xuICogQGV4YW1wbGVcbiAqIGNvbnN0IENvbXBvbmVudCA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcbiAqICAgY29uc3Qgb3duUmVmID0gdXNlUmVmKCk7XG4gKiAgIGNvbnN0IGRvbVJlZiA9IHVzZU1lcmdlUmVmcyhbcmVmLCBvd25SZWZdKTsgLy8g8J+RiCBtZXJnZSB0b2dldGhlclxuICogICByZXR1cm4gPGRpdiByZWY9e2RvbVJlZn0+Li4uPC9kaXY+XG4gKiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VNZXJnZVJlZnMocmVmcywgZGVmYXVsdFZhbHVlKSB7XG4gICAgdmFyIGNhbGxiYWNrUmVmID0gdXNlQ2FsbGJhY2tSZWYoZGVmYXVsdFZhbHVlIHx8IG51bGwsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICByZXR1cm4gcmVmcy5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHsgcmV0dXJuIGFzc2lnblJlZihyZWYsIG5ld1ZhbHVlKTsgfSk7XG4gICAgfSk7XG4gICAgLy8gaGFuZGxlIHJlZnMgY2hhbmdlcyAtIGFkZGVkIG9yIHJlbW92ZWRcbiAgICB1c2VJc29tb3JwaGljTGF5b3V0RWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gY3VycmVudFZhbHVlcy5nZXQoY2FsbGJhY2tSZWYpO1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBwcmV2UmVmc18xID0gbmV3IFNldChvbGRWYWx1ZSk7XG4gICAgICAgICAgICB2YXIgbmV4dFJlZnNfMSA9IG5ldyBTZXQocmVmcyk7XG4gICAgICAgICAgICB2YXIgY3VycmVudF8xID0gY2FsbGJhY2tSZWYuY3VycmVudDtcbiAgICAgICAgICAgIHByZXZSZWZzXzEuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0UmVmc18xLmhhcyhyZWYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnblJlZihyZWYsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmV4dFJlZnNfMS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXByZXZSZWZzXzEuaGFzKHJlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduUmVmKHJlZiwgY3VycmVudF8xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50VmFsdWVzLnNldChjYWxsYmFja1JlZiwgcmVmcyk7XG4gICAgfSwgW3JlZnNdKTtcbiAgICByZXR1cm4gY2FsbGJhY2tSZWY7XG59XG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogY3JlYXRlcyBhIE11dGFibGVSZWYgd2l0aCByZWYgY2hhbmdlIGNhbGxiYWNrXG4gKiBAcGFyYW0gaW5pdGlhbFZhbHVlIC0gaW5pdGlhbCByZWYgdmFsdWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gYSBjYWxsYmFjayB0byBydW4gd2hlbiB2YWx1ZSBjaGFuZ2VzXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHJlZiA9IHVzZUNhbGxiYWNrUmVmKDAsIChuZXdWYWx1ZSwgb2xkVmFsdWUpID0+IGNvbnNvbGUubG9nKG9sZFZhbHVlLCAnLT4nLCBuZXdWYWx1ZSk7XG4gKiByZWYuY3VycmVudCA9IDE7XG4gKiAvLyBwcmludHMgMCAtPiAxXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvaG9va3MtcmVmZXJlbmNlLmh0bWwjdXNlcmVmXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvdXNlLWNhbGxiYWNrLXJlZiN1c2VjYWxsYmFja3JlZi0tLXRvLXJlcGxhY2UtcmVhY3R1c2VyZWZcbiAqIEByZXR1cm5zIHtNdXRhYmxlUmVmT2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FsbGJhY2tSZWYoaW5pdGlhbFZhbHVlLCBjYWxsYmFjaykge1xuICAgIHZhciByZWYgPSB1c2VTdGF0ZShmdW5jdGlvbiAoKSB7IHJldHVybiAoe1xuICAgICAgICAvLyB2YWx1ZVxuICAgICAgICB2YWx1ZTogaW5pdGlhbFZhbHVlLFxuICAgICAgICAvLyBsYXN0IGNhbGxiYWNrXG4gICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgLy8gXCJtZW1vaXplZFwiIHB1YmxpYyBpbnRlcmZhY2VcbiAgICAgICAgZmFjYWRlOiB7XG4gICAgICAgICAgICBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVmLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBjdXJyZW50KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSByZWYudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZi52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZWYuY2FsbGJhY2sodmFsdWUsIGxhc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSk7IH0pWzBdO1xuICAgIC8vIHVwZGF0ZSBjYWxsYmFja1xuICAgIHJlZi5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHJldHVybiByZWYuZmFjYWRlO1xufVxuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fcmVzdCB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xudmFyIFNpZGVDYXIgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgc2lkZUNhciA9IF9hLnNpZGVDYXIsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInNpZGVDYXJcIl0pO1xuICAgIGlmICghc2lkZUNhcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZGVjYXI6IHBsZWFzZSBwcm92aWRlIGBzaWRlQ2FyYCBwcm9wZXJ0eSB0byBpbXBvcnQgdGhlIHJpZ2h0IGNhcicpO1xuICAgIH1cbiAgICB2YXIgVGFyZ2V0ID0gc2lkZUNhci5yZWFkKCk7XG4gICAgaWYgKCFUYXJnZXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWRlY2FyIG1lZGl1bSBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFyZ2V0LCBfX2Fzc2lnbih7fSwgcmVzdCkpO1xufTtcblNpZGVDYXIuaXNTaWRlQ2FyRXhwb3J0ID0gdHJ1ZTtcbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRTaWRlY2FyKG1lZGl1bSwgZXhwb3J0ZWQpIHtcbiAgICBtZWRpdW0udXNlTWVkaXVtKGV4cG9ydGVkKTtcbiAgICByZXR1cm4gU2lkZUNhcjtcbn1cbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG5mdW5jdGlvbiBJdG9JKGEpIHtcbiAgICByZXR1cm4gYTtcbn1cbmZ1bmN0aW9uIGlubmVyQ3JlYXRlTWVkaXVtKGRlZmF1bHRzLCBtaWRkbGV3YXJlKSB7XG4gICAgaWYgKG1pZGRsZXdhcmUgPT09IHZvaWQgMCkgeyBtaWRkbGV3YXJlID0gSXRvSTsgfVxuICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICB2YXIgYXNzaWduZWQgPSBmYWxzZTtcbiAgICB2YXIgbWVkaXVtID0ge1xuICAgICAgICByZWFkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoYXNzaWduZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZGVjYXI6IGNvdWxkIG5vdCBgcmVhZGAgZnJvbSBhbiBgYXNzaWduZWRgIG1lZGl1bS4gYHJlYWRgIGNvdWxkIGJlIHVzZWQgb25seSB3aXRoIGB1c2VNZWRpdW1gLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyW2J1ZmZlci5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICAgICAgfSxcbiAgICAgICAgdXNlTWVkaXVtOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBtaWRkbGV3YXJlKGRhdGEsIGFzc2lnbmVkKTtcbiAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBidWZmZXIuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICE9PSBpdGVtOyB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnblN5bmNNZWRpdW06IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgYXNzaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2JzID0gYnVmZmVyO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgIGNicy5mb3JFYWNoKGNiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1ZmZlciA9IHtcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbiAoeCkgeyByZXR1cm4gY2IoeCk7IH0sXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBidWZmZXI7IH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhc3NpZ25NZWRpdW06IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgYXNzaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHBlbmRpbmdRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2JzID0gYnVmZmVyO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgIGNicy5mb3JFYWNoKGNiKTtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUgPSBidWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZXhlY3V0ZVF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjYnMgPSBwZW5kaW5nUXVldWU7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1F1ZXVlID0gW107XG4gICAgICAgICAgICAgICAgY2JzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBjeWNsZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZXhlY3V0ZVF1ZXVlKTsgfTtcbiAgICAgICAgICAgIGN5Y2xlKCk7XG4gICAgICAgICAgICBidWZmZXIgPSB7XG4gICAgICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1F1ZXVlLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIGN5Y2xlKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1F1ZXVlID0gcGVuZGluZ1F1ZXVlLmZpbHRlcihmaWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIG1lZGl1bTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNZWRpdW0oZGVmYXVsdHMsIG1pZGRsZXdhcmUpIHtcbiAgICBpZiAobWlkZGxld2FyZSA9PT0gdm9pZCAwKSB7IG1pZGRsZXdhcmUgPSBJdG9JOyB9XG4gICAgcmV0dXJuIGlubmVyQ3JlYXRlTWVkaXVtKGRlZmF1bHRzLCBtaWRkbGV3YXJlKTtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2lkZWNhck1lZGl1bShvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgbWVkaXVtID0gaW5uZXJDcmVhdGVNZWRpdW0obnVsbCk7XG4gICAgbWVkaXVtLm9wdGlvbnMgPSBfX2Fzc2lnbih7IGFzeW5jOiB0cnVlLCBzc3I6IGZhbHNlIH0sIG9wdGlvbnMpO1xuICAgIHJldHVybiBtZWRpdW07XG59XG4iLCIvLyBzcmMvcHJpbWl0aXZlLnRzeFxudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbmZ1bmN0aW9uIGNvbXBvc2VFdmVudEhhbmRsZXJzKG9yaWdpbmFsRXZlbnRIYW5kbGVyLCBvdXJFdmVudEhhbmRsZXIsIHsgY2hlY2tGb3JEZWZhdWx0UHJldmVudGVkID0gdHJ1ZSB9ID0ge30pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgb3JpZ2luYWxFdmVudEhhbmRsZXI/LihldmVudCk7XG4gICAgaWYgKGNoZWNrRm9yRGVmYXVsdFByZXZlbnRlZCA9PT0gZmFsc2UgfHwgIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVybiBvdXJFdmVudEhhbmRsZXI/LihldmVudCk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0T3duZXJXaW5kb3coZWxlbWVudCkge1xuICBpZiAoIWNhblVzZURPTSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhY2Nlc3Mgd2luZG93IG91dHNpZGUgb2YgdGhlIERPTVwiKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudD8ub3duZXJEb2N1bWVudD8uZGVmYXVsdFZpZXcgPz8gd2luZG93O1xufVxuZnVuY3Rpb24gZ2V0T3duZXJEb2N1bWVudChlbGVtZW50KSB7XG4gIGlmICghY2FuVXNlRE9NKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFjY2VzcyBkb2N1bWVudCBvdXRzaWRlIG9mIHRoZSBET01cIik7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ/Lm93bmVyRG9jdW1lbnQgPz8gZG9jdW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRBY3RpdmVFbGVtZW50KG5vZGUsIGFjdGl2ZURlc2NlbmRhbnQgPSBmYWxzZSkge1xuICBjb25zdCB7IGFjdGl2ZUVsZW1lbnQgfSA9IGdldE93bmVyRG9jdW1lbnQobm9kZSk7XG4gIGlmICghYWN0aXZlRWxlbWVudD8ubm9kZU5hbWUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoaXNGcmFtZShhY3RpdmVFbGVtZW50KSAmJiBhY3RpdmVFbGVtZW50LmNvbnRlbnREb2N1bWVudCkge1xuICAgIHJldHVybiBnZXRBY3RpdmVFbGVtZW50KGFjdGl2ZUVsZW1lbnQuY29udGVudERvY3VtZW50LmJvZHksIGFjdGl2ZURlc2NlbmRhbnQpO1xuICB9XG4gIGlmIChhY3RpdmVEZXNjZW5kYW50KSB7XG4gICAgY29uc3QgaWQgPSBhY3RpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRPd25lckRvY3VtZW50KGFjdGl2ZUVsZW1lbnQpLmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYWN0aXZlRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGlzRnJhbWUoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudC50YWdOYW1lID09PSBcIklGUkFNRVwiO1xufVxuZXhwb3J0IHtcbiAgY2FuVXNlRE9NLFxuICBjb21wb3NlRXZlbnRIYW5kbGVycyxcbiAgZ2V0QWN0aXZlRWxlbWVudCxcbiAgZ2V0T3duZXJEb2N1bWVudCxcbiAgZ2V0T3duZXJXaW5kb3csXG4gIGlzRnJhbWVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC9jb250ZXh0L3NyYy9jcmVhdGUtY29udGV4dC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0Mihyb290Q29tcG9uZW50TmFtZSwgZGVmYXVsdENvbnRleHQpIHtcbiAgY29uc3QgQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoZGVmYXVsdENvbnRleHQpO1xuICBjb25zdCBQcm92aWRlciA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmNvbnRleHQgfSA9IHByb3BzO1xuICAgIGNvbnN0IHZhbHVlID0gUmVhY3QudXNlTWVtbygoKSA9PiBjb250ZXh0LCBPYmplY3QudmFsdWVzKGNvbnRleHQpKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChDb250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlLCBjaGlsZHJlbiB9KTtcbiAgfTtcbiAgUHJvdmlkZXIuZGlzcGxheU5hbWUgPSByb290Q29tcG9uZW50TmFtZSArIFwiUHJvdmlkZXJcIjtcbiAgZnVuY3Rpb24gdXNlQ29udGV4dDIoY29uc3VtZXJOYW1lKSB7XG4gICAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoQ29udGV4dCk7XG4gICAgaWYgKGNvbnRleHQpIHJldHVybiBjb250ZXh0O1xuICAgIGlmIChkZWZhdWx0Q29udGV4dCAhPT0gdm9pZCAwKSByZXR1cm4gZGVmYXVsdENvbnRleHQ7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcXGAke2NvbnN1bWVyTmFtZX1cXGAgbXVzdCBiZSB1c2VkIHdpdGhpbiBcXGAke3Jvb3RDb21wb25lbnROYW1lfVxcYGApO1xuICB9XG4gIHJldHVybiBbUHJvdmlkZXIsIHVzZUNvbnRleHQyXTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHRTY29wZShzY29wZU5hbWUsIGNyZWF0ZUNvbnRleHRTY29wZURlcHMgPSBbXSkge1xuICBsZXQgZGVmYXVsdENvbnRleHRzID0gW107XG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQzKHJvb3RDb21wb25lbnROYW1lLCBkZWZhdWx0Q29udGV4dCkge1xuICAgIGNvbnN0IEJhc2VDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dChkZWZhdWx0Q29udGV4dCk7XG4gICAgY29uc3QgaW5kZXggPSBkZWZhdWx0Q29udGV4dHMubGVuZ3RoO1xuICAgIGRlZmF1bHRDb250ZXh0cyA9IFsuLi5kZWZhdWx0Q29udGV4dHMsIGRlZmF1bHRDb250ZXh0XTtcbiAgICBjb25zdCBQcm92aWRlciA9IChwcm9wcykgPT4ge1xuICAgICAgY29uc3QgeyBzY29wZSwgY2hpbGRyZW4sIC4uLmNvbnRleHQgfSA9IHByb3BzO1xuICAgICAgY29uc3QgQ29udGV4dCA9IHNjb3BlPy5bc2NvcGVOYW1lXT8uW2luZGV4XSB8fCBCYXNlQ29udGV4dDtcbiAgICAgIGNvbnN0IHZhbHVlID0gUmVhY3QudXNlTWVtbygoKSA9PiBjb250ZXh0LCBPYmplY3QudmFsdWVzKGNvbnRleHQpKTtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KENvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWUsIGNoaWxkcmVuIH0pO1xuICAgIH07XG4gICAgUHJvdmlkZXIuZGlzcGxheU5hbWUgPSByb290Q29tcG9uZW50TmFtZSArIFwiUHJvdmlkZXJcIjtcbiAgICBmdW5jdGlvbiB1c2VDb250ZXh0Mihjb25zdW1lck5hbWUsIHNjb3BlKSB7XG4gICAgICBjb25zdCBDb250ZXh0ID0gc2NvcGU/LltzY29wZU5hbWVdPy5baW5kZXhdIHx8IEJhc2VDb250ZXh0O1xuICAgICAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoQ29udGV4dCk7XG4gICAgICBpZiAoY29udGV4dCkgcmV0dXJuIGNvbnRleHQ7XG4gICAgICBpZiAoZGVmYXVsdENvbnRleHQgIT09IHZvaWQgMCkgcmV0dXJuIGRlZmF1bHRDb250ZXh0O1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcXGAke2NvbnN1bWVyTmFtZX1cXGAgbXVzdCBiZSB1c2VkIHdpdGhpbiBcXGAke3Jvb3RDb21wb25lbnROYW1lfVxcYGApO1xuICAgIH1cbiAgICByZXR1cm4gW1Byb3ZpZGVyLCB1c2VDb250ZXh0Ml07XG4gIH1cbiAgY29uc3QgY3JlYXRlU2NvcGUgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2NvcGVDb250ZXh0cyA9IGRlZmF1bHRDb250ZXh0cy5tYXAoKGRlZmF1bHRDb250ZXh0KSA9PiB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlQ29udGV4dChkZWZhdWx0Q29udGV4dCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVzZVNjb3BlKHNjb3BlKSB7XG4gICAgICBjb25zdCBjb250ZXh0cyA9IHNjb3BlPy5bc2NvcGVOYW1lXSB8fCBzY29wZUNvbnRleHRzO1xuICAgICAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oXG4gICAgICAgICgpID0+ICh7IFtgX19zY29wZSR7c2NvcGVOYW1lfWBdOiB7IC4uLnNjb3BlLCBbc2NvcGVOYW1lXTogY29udGV4dHMgfSB9KSxcbiAgICAgICAgW3Njb3BlLCBjb250ZXh0c11cbiAgICAgICk7XG4gICAgfTtcbiAgfTtcbiAgY3JlYXRlU2NvcGUuc2NvcGVOYW1lID0gc2NvcGVOYW1lO1xuICByZXR1cm4gW2NyZWF0ZUNvbnRleHQzLCBjb21wb3NlQ29udGV4dFNjb3BlcyhjcmVhdGVTY29wZSwgLi4uY3JlYXRlQ29udGV4dFNjb3BlRGVwcyldO1xufVxuZnVuY3Rpb24gY29tcG9zZUNvbnRleHRTY29wZXMoLi4uc2NvcGVzKSB7XG4gIGNvbnN0IGJhc2VTY29wZSA9IHNjb3Blc1swXTtcbiAgaWYgKHNjb3Blcy5sZW5ndGggPT09IDEpIHJldHVybiBiYXNlU2NvcGU7XG4gIGNvbnN0IGNyZWF0ZVNjb3BlID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjb3BlSG9va3MgPSBzY29wZXMubWFwKChjcmVhdGVTY29wZTIpID0+ICh7XG4gICAgICB1c2VTY29wZTogY3JlYXRlU2NvcGUyKCksXG4gICAgICBzY29wZU5hbWU6IGNyZWF0ZVNjb3BlMi5zY29wZU5hbWVcbiAgICB9KSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVzZUNvbXBvc2VkU2NvcGVzKG92ZXJyaWRlU2NvcGVzKSB7XG4gICAgICBjb25zdCBuZXh0U2NvcGVzID0gc2NvcGVIb29rcy5yZWR1Y2UoKG5leHRTY29wZXMyLCB7IHVzZVNjb3BlLCBzY29wZU5hbWUgfSkgPT4ge1xuICAgICAgICBjb25zdCBzY29wZVByb3BzID0gdXNlU2NvcGUob3ZlcnJpZGVTY29wZXMpO1xuICAgICAgICBjb25zdCBjdXJyZW50U2NvcGUgPSBzY29wZVByb3BzW2BfX3Njb3BlJHtzY29wZU5hbWV9YF07XG4gICAgICAgIHJldHVybiB7IC4uLm5leHRTY29wZXMyLCAuLi5jdXJyZW50U2NvcGUgfTtcbiAgICAgIH0sIHt9KTtcbiAgICAgIHJldHVybiBSZWFjdC51c2VNZW1vKCgpID0+ICh7IFtgX19zY29wZSR7YmFzZVNjb3BlLnNjb3BlTmFtZX1gXTogbmV4dFNjb3BlcyB9KSwgW25leHRTY29wZXNdKTtcbiAgICB9O1xuICB9O1xuICBjcmVhdGVTY29wZS5zY29wZU5hbWUgPSBiYXNlU2NvcGUuc2NvcGVOYW1lO1xuICByZXR1cm4gY3JlYXRlU2NvcGU7XG59XG5leHBvcnQge1xuICBjcmVhdGVDb250ZXh0MiBhcyBjcmVhdGVDb250ZXh0LFxuICBjcmVhdGVDb250ZXh0U2NvcGVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL2RpYWxvZy50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZUV2ZW50SGFuZGxlcnMgfSBmcm9tIFwiQHJhZGl4LXVpL3ByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIGNyZWF0ZUNvbnRleHRTY29wZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29udGV4dFwiO1xuaW1wb3J0IHsgdXNlSWQgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWlkXCI7XG5pbXBvcnQgeyB1c2VDb250cm9sbGFibGVTdGF0ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZVwiO1xuaW1wb3J0IHsgRGlzbWlzc2FibGVMYXllciB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtZGlzbWlzc2FibGUtbGF5ZXJcIjtcbmltcG9ydCB7IEZvY3VzU2NvcGUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWZvY3VzLXNjb3BlXCI7XG5pbXBvcnQgeyBQb3J0YWwgYXMgUG9ydGFsUHJpbWl0aXZlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wb3J0YWxcIjtcbmltcG9ydCB7IFByZXNlbmNlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmVzZW5jZVwiO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUZvY3VzR3VhcmRzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1mb2N1cy1ndWFyZHNcIjtcbmltcG9ydCB7IFJlbW92ZVNjcm9sbCB9IGZyb20gXCJyZWFjdC1yZW1vdmUtc2Nyb2xsXCI7XG5pbXBvcnQgeyBoaWRlT3RoZXJzIH0gZnJvbSBcImFyaWEtaGlkZGVuXCI7XG5pbXBvcnQgeyBjcmVhdGVTbG90IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI7XG5pbXBvcnQgeyBGcmFnbWVudCwganN4LCBqc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgRElBTE9HX05BTUUgPSBcIkRpYWxvZ1wiO1xudmFyIFtjcmVhdGVEaWFsb2dDb250ZXh0LCBjcmVhdGVEaWFsb2dTY29wZV0gPSBjcmVhdGVDb250ZXh0U2NvcGUoRElBTE9HX05BTUUpO1xudmFyIFtEaWFsb2dQcm92aWRlciwgdXNlRGlhbG9nQ29udGV4dF0gPSBjcmVhdGVEaWFsb2dDb250ZXh0KERJQUxPR19OQU1FKTtcbnZhciBEaWFsb2cgPSAocHJvcHMpID0+IHtcbiAgY29uc3Qge1xuICAgIF9fc2NvcGVEaWFsb2csXG4gICAgY2hpbGRyZW4sXG4gICAgb3Blbjogb3BlblByb3AsXG4gICAgZGVmYXVsdE9wZW4sXG4gICAgb25PcGVuQ2hhbmdlLFxuICAgIG1vZGFsID0gdHJ1ZVxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IHRyaWdnZXJSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNvbnRlbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZUNvbnRyb2xsYWJsZVN0YXRlKHtcbiAgICBwcm9wOiBvcGVuUHJvcCxcbiAgICBkZWZhdWx0UHJvcDogZGVmYXVsdE9wZW4gPz8gZmFsc2UsXG4gICAgb25DaGFuZ2U6IG9uT3BlbkNoYW5nZSxcbiAgICBjYWxsZXI6IERJQUxPR19OQU1FXG4gIH0pO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICBEaWFsb2dQcm92aWRlcixcbiAgICB7XG4gICAgICBzY29wZTogX19zY29wZURpYWxvZyxcbiAgICAgIHRyaWdnZXJSZWYsXG4gICAgICBjb250ZW50UmVmLFxuICAgICAgY29udGVudElkOiB1c2VJZCgpLFxuICAgICAgdGl0bGVJZDogdXNlSWQoKSxcbiAgICAgIGRlc2NyaXB0aW9uSWQ6IHVzZUlkKCksXG4gICAgICBvcGVuLFxuICAgICAgb25PcGVuQ2hhbmdlOiBzZXRPcGVuLFxuICAgICAgb25PcGVuVG9nZ2xlOiBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiBzZXRPcGVuKChwcmV2T3BlbikgPT4gIXByZXZPcGVuKSwgW3NldE9wZW5dKSxcbiAgICAgIG1vZGFsLFxuICAgICAgY2hpbGRyZW5cbiAgICB9XG4gICk7XG59O1xuRGlhbG9nLmRpc3BsYXlOYW1lID0gRElBTE9HX05BTUU7XG52YXIgVFJJR0dFUl9OQU1FID0gXCJEaWFsb2dUcmlnZ2VyXCI7XG52YXIgRGlhbG9nVHJpZ2dlciA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi50cmlnZ2VyUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KFRSSUdHRVJfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgY29tcG9zZWRUcmlnZ2VyUmVmID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgY29udGV4dC50cmlnZ2VyUmVmKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIFByaW1pdGl2ZS5idXR0b24sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgIFwiYXJpYS1oYXNwb3B1cFwiOiBcImRpYWxvZ1wiLFxuICAgICAgICBcImFyaWEtZXhwYW5kZWRcIjogY29udGV4dC5vcGVuLFxuICAgICAgICBcImFyaWEtY29udHJvbHNcIjogY29udGV4dC5jb250ZW50SWQsXG4gICAgICAgIFwiZGF0YS1zdGF0ZVwiOiBnZXRTdGF0ZShjb250ZXh0Lm9wZW4pLFxuICAgICAgICAuLi50cmlnZ2VyUHJvcHMsXG4gICAgICAgIHJlZjogY29tcG9zZWRUcmlnZ2VyUmVmLFxuICAgICAgICBvbkNsaWNrOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkNsaWNrLCBjb250ZXh0Lm9uT3BlblRvZ2dsZSlcbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xuRGlhbG9nVHJpZ2dlci5kaXNwbGF5TmFtZSA9IFRSSUdHRVJfTkFNRTtcbnZhciBQT1JUQUxfTkFNRSA9IFwiRGlhbG9nUG9ydGFsXCI7XG52YXIgW1BvcnRhbFByb3ZpZGVyLCB1c2VQb3J0YWxDb250ZXh0XSA9IGNyZWF0ZURpYWxvZ0NvbnRleHQoUE9SVEFMX05BTUUsIHtcbiAgZm9yY2VNb3VudDogdm9pZCAwXG59KTtcbnZhciBEaWFsb2dQb3J0YWwgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCBmb3JjZU1vdW50LCBjaGlsZHJlbiwgY29udGFpbmVyIH0gPSBwcm9wcztcbiAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoUE9SVEFMX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQb3J0YWxQcm92aWRlciwgeyBzY29wZTogX19zY29wZURpYWxvZywgZm9yY2VNb3VudCwgY2hpbGRyZW46IFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNoaWxkKSA9PiAvKiBAX19QVVJFX18gKi8ganN4KFByZXNlbmNlLCB7IHByZXNlbnQ6IGZvcmNlTW91bnQgfHwgY29udGV4dC5vcGVuLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeChQb3J0YWxQcmltaXRpdmUsIHsgYXNDaGlsZDogdHJ1ZSwgY29udGFpbmVyLCBjaGlsZHJlbjogY2hpbGQgfSkgfSkpIH0pO1xufTtcbkRpYWxvZ1BvcnRhbC5kaXNwbGF5TmFtZSA9IFBPUlRBTF9OQU1FO1xudmFyIE9WRVJMQVlfTkFNRSA9IFwiRGlhbG9nT3ZlcmxheVwiO1xudmFyIERpYWxvZ092ZXJsYXkgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHBvcnRhbENvbnRleHQgPSB1c2VQb3J0YWxDb250ZXh0KE9WRVJMQVlfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgeyBmb3JjZU1vdW50ID0gcG9ydGFsQ29udGV4dC5mb3JjZU1vdW50LCAuLi5vdmVybGF5UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KE9WRVJMQVlfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIGNvbnRleHQubW9kYWwgPyAvKiBAX19QVVJFX18gKi8ganN4KFByZXNlbmNlLCB7IHByZXNlbnQ6IGZvcmNlTW91bnQgfHwgY29udGV4dC5vcGVuLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeChEaWFsb2dPdmVybGF5SW1wbCwgeyAuLi5vdmVybGF5UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pIH0pIDogbnVsbDtcbiAgfVxuKTtcbkRpYWxvZ092ZXJsYXkuZGlzcGxheU5hbWUgPSBPVkVSTEFZX05BTUU7XG52YXIgU2xvdCA9IGNyZWF0ZVNsb3QoXCJEaWFsb2dPdmVybGF5LlJlbW92ZVNjcm9sbFwiKTtcbnZhciBEaWFsb2dPdmVybGF5SW1wbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi5vdmVybGF5UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KE9WRVJMQVlfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIE1ha2Ugc3VyZSBgQ29udGVudGAgaXMgc2Nyb2xsYWJsZSBldmVuIHdoZW4gaXQgZG9lc24ndCBsaXZlIGluc2lkZSBgUmVtb3ZlU2Nyb2xsYFxuICAgICAgLy8gaWUuIHdoZW4gYE92ZXJsYXlgIGFuZCBgQ29udGVudGAgYXJlIHNpYmxpbmdzXG4gICAgICAvKiBAX19QVVJFX18gKi8ganN4KFJlbW92ZVNjcm9sbCwgeyBhczogU2xvdCwgYWxsb3dQaW5jaFpvb206IHRydWUsIHNoYXJkczogW2NvbnRleHQuY29udGVudFJlZl0sIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgICBQcmltaXRpdmUuZGl2LFxuICAgICAgICB7XG4gICAgICAgICAgXCJkYXRhLXN0YXRlXCI6IGdldFN0YXRlKGNvbnRleHQub3BlbiksXG4gICAgICAgICAgLi4ub3ZlcmxheVByb3BzLFxuICAgICAgICAgIHJlZjogZm9yd2FyZGVkUmVmLFxuICAgICAgICAgIHN0eWxlOiB7IHBvaW50ZXJFdmVudHM6IFwiYXV0b1wiLCAuLi5vdmVybGF5UHJvcHMuc3R5bGUgfVxuICAgICAgICB9XG4gICAgICApIH0pXG4gICAgKTtcbiAgfVxuKTtcbnZhciBDT05URU5UX05BTUUgPSBcIkRpYWxvZ0NvbnRlbnRcIjtcbnZhciBEaWFsb2dDb250ZW50ID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCBwb3J0YWxDb250ZXh0ID0gdXNlUG9ydGFsQ29udGV4dChDT05URU5UX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IHsgZm9yY2VNb3VudCA9IHBvcnRhbENvbnRleHQuZm9yY2VNb3VudCwgLi4uY29udGVudFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDT05URU5UX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByZXNlbmNlLCB7IHByZXNlbnQ6IGZvcmNlTW91bnQgfHwgY29udGV4dC5vcGVuLCBjaGlsZHJlbjogY29udGV4dC5tb2RhbCA/IC8qIEBfX1BVUkVfXyAqLyBqc3goRGlhbG9nQ29udGVudE1vZGFsLCB7IC4uLmNvbnRlbnRQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSkgOiAvKiBAX19QVVJFX18gKi8ganN4KERpYWxvZ0NvbnRlbnROb25Nb2RhbCwgeyAuLi5jb250ZW50UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pIH0pO1xuICB9XG4pO1xuRGlhbG9nQ29udGVudC5kaXNwbGF5TmFtZSA9IENPTlRFTlRfTkFNRTtcbnZhciBEaWFsb2dDb250ZW50TW9kYWwgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgY29udGVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCBjb250ZXh0LmNvbnRlbnRSZWYsIGNvbnRlbnRSZWYpO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gY29udGVudFJlZi5jdXJyZW50O1xuICAgICAgaWYgKGNvbnRlbnQpIHJldHVybiBoaWRlT3RoZXJzKGNvbnRlbnQpO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIERpYWxvZ0NvbnRlbnRJbXBsLFxuICAgICAge1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgcmVmOiBjb21wb3NlZFJlZnMsXG4gICAgICAgIHRyYXBGb2N1czogY29udGV4dC5vcGVuLFxuICAgICAgICBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHM6IHRydWUsXG4gICAgICAgIG9uQ2xvc2VBdXRvRm9jdXM6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQ2xvc2VBdXRvRm9jdXMsIChldmVudCkgPT4ge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29udGV4dC50cmlnZ2VyUmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gICAgICAgIH0pLFxuICAgICAgICBvblBvaW50ZXJEb3duT3V0c2lkZTogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25Qb2ludGVyRG93bk91dHNpZGUsIChldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSBldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICBjb25zdCBjdHJsTGVmdENsaWNrID0gb3JpZ2luYWxFdmVudC5idXR0b24gPT09IDAgJiYgb3JpZ2luYWxFdmVudC5jdHJsS2V5ID09PSB0cnVlO1xuICAgICAgICAgIGNvbnN0IGlzUmlnaHRDbGljayA9IG9yaWdpbmFsRXZlbnQuYnV0dG9uID09PSAyIHx8IGN0cmxMZWZ0Q2xpY2s7XG4gICAgICAgICAgaWYgKGlzUmlnaHRDbGljaykgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9uRm9jdXNPdXRzaWRlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhcbiAgICAgICAgICBwcm9wcy5vbkZvY3VzT3V0c2lkZSxcbiAgICAgICAgICAoZXZlbnQpID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgKVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG52YXIgRGlhbG9nQ29udGVudE5vbk1vZGFsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDT05URU5UX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgICBjb25zdCBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgRGlhbG9nQ29udGVudEltcGwsXG4gICAgICB7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICByZWY6IGZvcndhcmRlZFJlZixcbiAgICAgICAgdHJhcEZvY3VzOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzOiBmYWxzZSxcbiAgICAgICAgb25DbG9zZUF1dG9Gb2N1czogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgcHJvcHMub25DbG9zZUF1dG9Gb2N1cz8uKGV2ZW50KTtcbiAgICAgICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIGlmICghaGFzSW50ZXJhY3RlZE91dHNpZGVSZWYuY3VycmVudCkgY29udGV4dC50cmlnZ2VyUmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25JbnRlcmFjdE91dHNpZGU6IChldmVudCkgPT4ge1xuICAgICAgICAgIHByb3BzLm9uSW50ZXJhY3RPdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgaGFzSW50ZXJhY3RlZE91dHNpZGVSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZGV0YWlsLm9yaWdpbmFsRXZlbnQudHlwZSA9PT0gXCJwb2ludGVyZG93blwiKSB7XG4gICAgICAgICAgICAgIGhhc1BvaW50ZXJEb3duT3V0c2lkZVJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgIGNvbnN0IHRhcmdldElzVHJpZ2dlciA9IGNvbnRleHQudHJpZ2dlclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICAgIGlmICh0YXJnZXRJc1RyaWdnZXIpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaWYgKGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50LnR5cGUgPT09IFwiZm9jdXNpblwiICYmIGhhc1BvaW50ZXJEb3duT3V0c2lkZVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG52YXIgRGlhbG9nQ29udGVudEltcGwgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgdHJhcEZvY3VzLCBvbk9wZW5BdXRvRm9jdXMsIG9uQ2xvc2VBdXRvRm9jdXMsIC4uLmNvbnRlbnRQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBjb250ZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIGNvbnRlbnRSZWYpO1xuICAgIHVzZUZvY3VzR3VhcmRzKCk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3hzKEZyYWdtZW50LCB7IGNoaWxkcmVuOiBbXG4gICAgICAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgICBGb2N1c1Njb3BlLFxuICAgICAgICB7XG4gICAgICAgICAgYXNDaGlsZDogdHJ1ZSxcbiAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgIHRyYXBwZWQ6IHRyYXBGb2N1cyxcbiAgICAgICAgICBvbk1vdW50QXV0b0ZvY3VzOiBvbk9wZW5BdXRvRm9jdXMsXG4gICAgICAgICAgb25Vbm1vdW50QXV0b0ZvY3VzOiBvbkNsb3NlQXV0b0ZvY3VzLFxuICAgICAgICAgIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgICAgICAgRGlzbWlzc2FibGVMYXllcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcm9sZTogXCJkaWFsb2dcIixcbiAgICAgICAgICAgICAgaWQ6IGNvbnRleHQuY29udGVudElkLFxuICAgICAgICAgICAgICBcImFyaWEtZGVzY3JpYmVkYnlcIjogY29udGV4dC5kZXNjcmlwdGlvbklkLFxuICAgICAgICAgICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiBjb250ZXh0LnRpdGxlSWQsXG4gICAgICAgICAgICAgIFwiZGF0YS1zdGF0ZVwiOiBnZXRTdGF0ZShjb250ZXh0Lm9wZW4pLFxuICAgICAgICAgICAgICAuLi5jb250ZW50UHJvcHMsXG4gICAgICAgICAgICAgIHJlZjogY29tcG9zZWRSZWZzLFxuICAgICAgICAgICAgICBvbkRpc21pc3M6ICgpID0+IGNvbnRleHQub25PcGVuQ2hhbmdlKGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3hzKEZyYWdtZW50LCB7IGNoaWxkcmVuOiBbXG4gICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goVGl0bGVXYXJuaW5nLCB7IHRpdGxlSWQ6IGNvbnRleHQudGl0bGVJZCB9KSxcbiAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeChEZXNjcmlwdGlvbldhcm5pbmcsIHsgY29udGVudFJlZiwgZGVzY3JpcHRpb25JZDogY29udGV4dC5kZXNjcmlwdGlvbklkIH0pXG4gICAgICBdIH0pXG4gICAgXSB9KTtcbiAgfVxuKTtcbnZhciBUSVRMRV9OQU1FID0gXCJEaWFsb2dUaXRsZVwiO1xudmFyIERpYWxvZ1RpdGxlID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLnRpdGxlUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KFRJVExFX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5oMiwgeyBpZDogY29udGV4dC50aXRsZUlkLCAuLi50aXRsZVByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KTtcbiAgfVxuKTtcbkRpYWxvZ1RpdGxlLmRpc3BsYXlOYW1lID0gVElUTEVfTkFNRTtcbnZhciBERVNDUklQVElPTl9OQU1FID0gXCJEaWFsb2dEZXNjcmlwdGlvblwiO1xudmFyIERpYWxvZ0Rlc2NyaXB0aW9uID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLmRlc2NyaXB0aW9uUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KERFU0NSSVBUSU9OX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5wLCB7IGlkOiBjb250ZXh0LmRlc2NyaXB0aW9uSWQsIC4uLmRlc2NyaXB0aW9uUHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pO1xuICB9XG4pO1xuRGlhbG9nRGVzY3JpcHRpb24uZGlzcGxheU5hbWUgPSBERVNDUklQVElPTl9OQU1FO1xudmFyIENMT1NFX05BTUUgPSBcIkRpYWxvZ0Nsb3NlXCI7XG52YXIgRGlhbG9nQ2xvc2UgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4uY2xvc2VQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ0xPU0VfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBQcmltaXRpdmUuYnV0dG9uLFxuICAgICAge1xuICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAuLi5jbG9zZVByb3BzLFxuICAgICAgICByZWY6IGZvcndhcmRlZFJlZixcbiAgICAgICAgb25DbGljazogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25DbGljaywgKCkgPT4gY29udGV4dC5vbk9wZW5DaGFuZ2UoZmFsc2UpKVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG5EaWFsb2dDbG9zZS5kaXNwbGF5TmFtZSA9IENMT1NFX05BTUU7XG5mdW5jdGlvbiBnZXRTdGF0ZShvcGVuKSB7XG4gIHJldHVybiBvcGVuID8gXCJvcGVuXCIgOiBcImNsb3NlZFwiO1xufVxudmFyIFRJVExFX1dBUk5JTkdfTkFNRSA9IFwiRGlhbG9nVGl0bGVXYXJuaW5nXCI7XG52YXIgW1dhcm5pbmdQcm92aWRlciwgdXNlV2FybmluZ0NvbnRleHRdID0gY3JlYXRlQ29udGV4dChUSVRMRV9XQVJOSU5HX05BTUUsIHtcbiAgY29udGVudE5hbWU6IENPTlRFTlRfTkFNRSxcbiAgdGl0bGVOYW1lOiBUSVRMRV9OQU1FLFxuICBkb2NzU2x1ZzogXCJkaWFsb2dcIlxufSk7XG52YXIgVGl0bGVXYXJuaW5nID0gKHsgdGl0bGVJZCB9KSA9PiB7XG4gIGNvbnN0IHRpdGxlV2FybmluZ0NvbnRleHQgPSB1c2VXYXJuaW5nQ29udGV4dChUSVRMRV9XQVJOSU5HX05BTUUpO1xuICBjb25zdCBNRVNTQUdFID0gYFxcYCR7dGl0bGVXYXJuaW5nQ29udGV4dC5jb250ZW50TmFtZX1cXGAgcmVxdWlyZXMgYSBcXGAke3RpdGxlV2FybmluZ0NvbnRleHQudGl0bGVOYW1lfVxcYCBmb3IgdGhlIGNvbXBvbmVudCB0byBiZSBhY2Nlc3NpYmxlIGZvciBzY3JlZW4gcmVhZGVyIHVzZXJzLlxuXG5JZiB5b3Ugd2FudCB0byBoaWRlIHRoZSBcXGAke3RpdGxlV2FybmluZ0NvbnRleHQudGl0bGVOYW1lfVxcYCwgeW91IGNhbiB3cmFwIGl0IHdpdGggb3VyIFZpc3VhbGx5SGlkZGVuIGNvbXBvbmVudC5cblxuRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSBodHRwczovL3JhZGl4LXVpLmNvbS9wcmltaXRpdmVzL2RvY3MvY29tcG9uZW50cy8ke3RpdGxlV2FybmluZ0NvbnRleHQuZG9jc1NsdWd9YDtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodGl0bGVJZCkge1xuICAgICAgY29uc3QgaGFzVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aXRsZUlkKTtcbiAgICAgIGlmICghaGFzVGl0bGUpIGNvbnNvbGUuZXJyb3IoTUVTU0FHRSk7XG4gICAgfVxuICB9LCBbTUVTU0FHRSwgdGl0bGVJZF0pO1xuICByZXR1cm4gbnVsbDtcbn07XG52YXIgREVTQ1JJUFRJT05fV0FSTklOR19OQU1FID0gXCJEaWFsb2dEZXNjcmlwdGlvbldhcm5pbmdcIjtcbnZhciBEZXNjcmlwdGlvbldhcm5pbmcgPSAoeyBjb250ZW50UmVmLCBkZXNjcmlwdGlvbklkIH0pID0+IHtcbiAgY29uc3QgZGVzY3JpcHRpb25XYXJuaW5nQ29udGV4dCA9IHVzZVdhcm5pbmdDb250ZXh0KERFU0NSSVBUSU9OX1dBUk5JTkdfTkFNRSk7XG4gIGNvbnN0IE1FU1NBR0UgPSBgV2FybmluZzogTWlzc2luZyBcXGBEZXNjcmlwdGlvblxcYCBvciBcXGBhcmlhLWRlc2NyaWJlZGJ5PXt1bmRlZmluZWR9XFxgIGZvciB7JHtkZXNjcmlwdGlvbldhcm5pbmdDb250ZXh0LmNvbnRlbnROYW1lfX0uYDtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBkZXNjcmliZWRCeUlkID0gY29udGVudFJlZi5jdXJyZW50Py5nZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIpO1xuICAgIGlmIChkZXNjcmlwdGlvbklkICYmIGRlc2NyaWJlZEJ5SWQpIHtcbiAgICAgIGNvbnN0IGhhc0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVzY3JpcHRpb25JZCk7XG4gICAgICBpZiAoIWhhc0Rlc2NyaXB0aW9uKSBjb25zb2xlLndhcm4oTUVTU0FHRSk7XG4gICAgfVxuICB9LCBbTUVTU0FHRSwgY29udGVudFJlZiwgZGVzY3JpcHRpb25JZF0pO1xuICByZXR1cm4gbnVsbDtcbn07XG52YXIgUm9vdCA9IERpYWxvZztcbnZhciBUcmlnZ2VyID0gRGlhbG9nVHJpZ2dlcjtcbnZhciBQb3J0YWwgPSBEaWFsb2dQb3J0YWw7XG52YXIgT3ZlcmxheSA9IERpYWxvZ092ZXJsYXk7XG52YXIgQ29udGVudCA9IERpYWxvZ0NvbnRlbnQ7XG52YXIgVGl0bGUgPSBEaWFsb2dUaXRsZTtcbnZhciBEZXNjcmlwdGlvbiA9IERpYWxvZ0Rlc2NyaXB0aW9uO1xudmFyIENsb3NlID0gRGlhbG9nQ2xvc2U7XG5leHBvcnQge1xuICBDbG9zZSxcbiAgQ29udGVudCxcbiAgRGVzY3JpcHRpb24sXG4gIERpYWxvZyxcbiAgRGlhbG9nQ2xvc2UsXG4gIERpYWxvZ0NvbnRlbnQsXG4gIERpYWxvZ0Rlc2NyaXB0aW9uLFxuICBEaWFsb2dPdmVybGF5LFxuICBEaWFsb2dQb3J0YWwsXG4gIERpYWxvZ1RpdGxlLFxuICBEaWFsb2dUcmlnZ2VyLFxuICBPdmVybGF5LFxuICBQb3J0YWwsXG4gIFJvb3QsXG4gIFRpdGxlLFxuICBUcmlnZ2VyLFxuICBXYXJuaW5nUHJvdmlkZXIsXG4gIGNyZWF0ZURpYWxvZ1Njb3BlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3Nsb3QudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNvbXBvc2VSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IEZyYWdtZW50IGFzIEZyYWdtZW50MiwganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdChvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdENsb25lID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3RDbG9uZShvd25lck5hbWUpO1xuICBjb25zdCBTbG90MiA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5zbG90UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNoaWxkcmVuQXJyYXkgPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKTtcbiAgICBjb25zdCBzbG90dGFibGUgPSBjaGlsZHJlbkFycmF5LmZpbmQoaXNTbG90dGFibGUpO1xuICAgIGlmIChzbG90dGFibGUpIHtcbiAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBzbG90dGFibGUucHJvcHMuY2hpbGRyZW47XG4gICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGNoaWxkcmVuQXJyYXkubWFwKChjaGlsZCkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQgPT09IHNsb3R0YWJsZSkge1xuICAgICAgICAgIGlmIChSZWFjdC5DaGlsZHJlbi5jb3VudChuZXdFbGVtZW50KSA+IDEpIHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KG51bGwpO1xuICAgICAgICAgIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXdFbGVtZW50KSA/IG5ld0VsZW1lbnQucHJvcHMuY2hpbGRyZW4gOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChTbG90Q2xvbmUsIHsgLi4uc2xvdFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiwgY2hpbGRyZW46IFJlYWN0LmlzVmFsaWRFbGVtZW50KG5ld0VsZW1lbnQpID8gUmVhY3QuY2xvbmVFbGVtZW50KG5ld0VsZW1lbnQsIHZvaWQgMCwgbmV3Q2hpbGRyZW4pIDogbnVsbCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goU2xvdENsb25lLCB7IC4uLnNsb3RQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYsIGNoaWxkcmVuIH0pO1xuICB9KTtcbiAgU2xvdDIuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3RgO1xuICByZXR1cm4gU2xvdDI7XG59XG52YXIgU2xvdCA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90KFwiU2xvdFwiKTtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90Q2xvbmUob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3RDbG9uZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5zbG90UHJvcHMgfSA9IHByb3BzO1xuICAgIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuUmVmID0gZ2V0RWxlbWVudFJlZihjaGlsZHJlbik7XG4gICAgICBjb25zdCBwcm9wczIgPSBtZXJnZVByb3BzKHNsb3RQcm9wcywgY2hpbGRyZW4ucHJvcHMpO1xuICAgICAgaWYgKGNoaWxkcmVuLnR5cGUgIT09IFJlYWN0LkZyYWdtZW50KSB7XG4gICAgICAgIHByb3BzMi5yZWYgPSBmb3J3YXJkZWRSZWYgPyBjb21wb3NlUmVmcyhmb3J3YXJkZWRSZWYsIGNoaWxkcmVuUmVmKSA6IGNoaWxkcmVuUmVmO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZHJlbiwgcHJvcHMyKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA+IDEgPyBSZWFjdC5DaGlsZHJlbi5vbmx5KG51bGwpIDogbnVsbDtcbiAgfSk7XG4gIFNsb3RDbG9uZS5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdENsb25lYDtcbiAgcmV0dXJuIFNsb3RDbG9uZTtcbn1cbnZhciBTTE9UVEFCTEVfSURFTlRJRklFUiA9IFN5bWJvbChcInJhZGl4LnNsb3R0YWJsZVwiKTtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90dGFibGUob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3R0YWJsZTIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goRnJhZ21lbnQyLCB7IGNoaWxkcmVuIH0pO1xuICB9O1xuICBTbG90dGFibGUyLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90dGFibGVgO1xuICBTbG90dGFibGUyLl9fcmFkaXhJZCA9IFNMT1RUQUJMRV9JREVOVElGSUVSO1xuICByZXR1cm4gU2xvdHRhYmxlMjtcbn1cbnZhciBTbG90dGFibGUgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdHRhYmxlKFwiU2xvdHRhYmxlXCIpO1xuZnVuY3Rpb24gaXNTbG90dGFibGUoY2hpbGQpIHtcbiAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSAmJiB0eXBlb2YgY2hpbGQudHlwZSA9PT0gXCJmdW5jdGlvblwiICYmIFwiX19yYWRpeElkXCIgaW4gY2hpbGQudHlwZSAmJiBjaGlsZC50eXBlLl9fcmFkaXhJZCA9PT0gU0xPVFRBQkxFX0lERU5USUZJRVI7XG59XG5mdW5jdGlvbiBtZXJnZVByb3BzKHNsb3RQcm9wcywgY2hpbGRQcm9wcykge1xuICBjb25zdCBvdmVycmlkZVByb3BzID0geyAuLi5jaGlsZFByb3BzIH07XG4gIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hpbGRQcm9wcykge1xuICAgIGNvbnN0IHNsb3RQcm9wVmFsdWUgPSBzbG90UHJvcHNbcHJvcE5hbWVdO1xuICAgIGNvbnN0IGNoaWxkUHJvcFZhbHVlID0gY2hpbGRQcm9wc1twcm9wTmFtZV07XG4gICAgY29uc3QgaXNIYW5kbGVyID0gL15vbltBLVpdLy50ZXN0KHByb3BOYW1lKTtcbiAgICBpZiAoaXNIYW5kbGVyKSB7XG4gICAgICBpZiAoc2xvdFByb3BWYWx1ZSAmJiBjaGlsZFByb3BWYWx1ZSkge1xuICAgICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gY2hpbGRQcm9wVmFsdWUoLi4uYXJncyk7XG4gICAgICAgICAgc2xvdFByb3BWYWx1ZSguLi5hcmdzKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChzbG90UHJvcFZhbHVlKSB7XG4gICAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gc2xvdFByb3BWYWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSBcInN0eWxlXCIpIHtcbiAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0geyAuLi5zbG90UHJvcFZhbHVlLCAuLi5jaGlsZFByb3BWYWx1ZSB9O1xuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwiY2xhc3NOYW1lXCIpIHtcbiAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gW3Nsb3RQcm9wVmFsdWUsIGNoaWxkUHJvcFZhbHVlXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IC4uLnNsb3RQcm9wcywgLi4ub3ZlcnJpZGVQcm9wcyB9O1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudFJlZihlbGVtZW50KSB7XG4gIGxldCBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQucHJvcHMsIFwicmVmXCIpPy5nZXQ7XG4gIGxldCBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnJlZjtcbiAgfVxuICBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQsIFwicmVmXCIpPy5nZXQ7XG4gIG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmO1xuICB9XG4gIHJldHVybiBlbGVtZW50LnByb3BzLnJlZiB8fCBlbGVtZW50LnJlZjtcbn1cbmV4cG9ydCB7XG4gIFNsb3QgYXMgUm9vdCxcbiAgU2xvdCxcbiAgU2xvdHRhYmxlLFxuICBjcmVhdGVTbG90LFxuICBjcmVhdGVTbG90dGFibGVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL2Rpc21pc3NhYmxlLWxheWVyLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlRXZlbnRIYW5kbGVycyB9IGZyb20gXCJAcmFkaXgtdWkvcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUsIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VDb21wb3NlZFJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWZcIjtcbmltcG9ydCB7IHVzZUVzY2FwZUtleWRvd24gfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1lc2NhcGUta2V5ZG93blwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgRElTTUlTU0FCTEVfTEFZRVJfTkFNRSA9IFwiRGlzbWlzc2FibGVMYXllclwiO1xudmFyIENPTlRFWFRfVVBEQVRFID0gXCJkaXNtaXNzYWJsZUxheWVyLnVwZGF0ZVwiO1xudmFyIFBPSU5URVJfRE9XTl9PVVRTSURFID0gXCJkaXNtaXNzYWJsZUxheWVyLnBvaW50ZXJEb3duT3V0c2lkZVwiO1xudmFyIEZPQ1VTX09VVFNJREUgPSBcImRpc21pc3NhYmxlTGF5ZXIuZm9jdXNPdXRzaWRlXCI7XG52YXIgb3JpZ2luYWxCb2R5UG9pbnRlckV2ZW50cztcbnZhciBEaXNtaXNzYWJsZUxheWVyQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoe1xuICBsYXllcnM6IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCksXG4gIGxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkOiAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpLFxuICBicmFuY2hlczogLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKVxufSk7XG52YXIgRGlzbWlzc2FibGVMYXllciA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzID0gZmFsc2UsXG4gICAgICBvbkVzY2FwZUtleURvd24sXG4gICAgICBvblBvaW50ZXJEb3duT3V0c2lkZSxcbiAgICAgIG9uRm9jdXNPdXRzaWRlLFxuICAgICAgb25JbnRlcmFjdE91dHNpZGUsXG4gICAgICBvbkRpc21pc3MsXG4gICAgICAuLi5sYXllclByb3BzXG4gICAgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KERpc21pc3NhYmxlTGF5ZXJDb250ZXh0KTtcbiAgICBjb25zdCBbbm9kZSwgc2V0Tm9kZV0gPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBvd25lckRvY3VtZW50ID0gbm9kZT8ub3duZXJEb2N1bWVudCA/PyBnbG9iYWxUaGlzPy5kb2N1bWVudDtcbiAgICBjb25zdCBbLCBmb3JjZV0gPSBSZWFjdC51c2VTdGF0ZSh7fSk7XG4gICAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgKG5vZGUyKSA9PiBzZXROb2RlKG5vZGUyKSk7XG4gICAgY29uc3QgbGF5ZXJzID0gQXJyYXkuZnJvbShjb250ZXh0LmxheWVycyk7XG4gICAgY29uc3QgW2hpZ2hlc3RMYXllcldpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkXSA9IFsuLi5jb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkXS5zbGljZSgtMSk7XG4gICAgY29uc3QgaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRJbmRleCA9IGxheWVycy5pbmRleE9mKGhpZ2hlc3RMYXllcldpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkKTtcbiAgICBjb25zdCBpbmRleCA9IG5vZGUgPyBsYXllcnMuaW5kZXhPZihub2RlKSA6IC0xO1xuICAgIGNvbnN0IGlzQm9keVBvaW50ZXJFdmVudHNEaXNhYmxlZCA9IGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuc2l6ZSA+IDA7XG4gICAgY29uc3QgaXNQb2ludGVyRXZlbnRzRW5hYmxlZCA9IGluZGV4ID49IGhpZ2hlc3RMYXllcldpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkSW5kZXg7XG4gICAgY29uc3QgcG9pbnRlckRvd25PdXRzaWRlID0gdXNlUG9pbnRlckRvd25PdXRzaWRlKChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgY29uc3QgaXNQb2ludGVyRG93bk9uQnJhbmNoID0gWy4uLmNvbnRleHQuYnJhbmNoZXNdLnNvbWUoKGJyYW5jaCkgPT4gYnJhbmNoLmNvbnRhaW5zKHRhcmdldCkpO1xuICAgICAgaWYgKCFpc1BvaW50ZXJFdmVudHNFbmFibGVkIHx8IGlzUG9pbnRlckRvd25PbkJyYW5jaCkgcmV0dXJuO1xuICAgICAgb25Qb2ludGVyRG93bk91dHNpZGU/LihldmVudCk7XG4gICAgICBvbkludGVyYWN0T3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgb25EaXNtaXNzPy4oKTtcbiAgICB9LCBvd25lckRvY3VtZW50KTtcbiAgICBjb25zdCBmb2N1c091dHNpZGUgPSB1c2VGb2N1c091dHNpZGUoKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICBjb25zdCBpc0ZvY3VzSW5CcmFuY2ggPSBbLi4uY29udGV4dC5icmFuY2hlc10uc29tZSgoYnJhbmNoKSA9PiBicmFuY2guY29udGFpbnModGFyZ2V0KSk7XG4gICAgICBpZiAoaXNGb2N1c0luQnJhbmNoKSByZXR1cm47XG4gICAgICBvbkZvY3VzT3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgIG9uSW50ZXJhY3RPdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSBvbkRpc21pc3M/LigpO1xuICAgIH0sIG93bmVyRG9jdW1lbnQpO1xuICAgIHVzZUVzY2FwZUtleWRvd24oKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBpc0hpZ2hlc3RMYXllciA9IGluZGV4ID09PSBjb250ZXh0LmxheWVycy5zaXplIC0gMTtcbiAgICAgIGlmICghaXNIaWdoZXN0TGF5ZXIpIHJldHVybjtcbiAgICAgIG9uRXNjYXBlS2V5RG93bj8uKGV2ZW50KTtcbiAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCAmJiBvbkRpc21pc3MpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgb25EaXNtaXNzKCk7XG4gICAgICB9XG4gICAgfSwgb3duZXJEb2N1bWVudCk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgICAgaWYgKGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50cykge1xuICAgICAgICBpZiAoY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5zaXplID09PSAwKSB7XG4gICAgICAgICAgb3JpZ2luYWxCb2R5UG9pbnRlckV2ZW50cyA9IG93bmVyRG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzO1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5hZGQobm9kZSk7XG4gICAgICB9XG4gICAgICBjb250ZXh0LmxheWVycy5hZGQobm9kZSk7XG4gICAgICBkaXNwYXRjaFVwZGF0ZSgpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50cyAmJiBjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLnNpemUgPT09IDEpIHtcbiAgICAgICAgICBvd25lckRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cyA9IG9yaWdpbmFsQm9keVBvaW50ZXJFdmVudHM7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSwgW25vZGUsIG93bmVyRG9jdW1lbnQsIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50cywgY29udGV4dF0pO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICAgICAgY29udGV4dC5sYXllcnMuZGVsZXRlKG5vZGUpO1xuICAgICAgICBjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLmRlbGV0ZShub2RlKTtcbiAgICAgICAgZGlzcGF0Y2hVcGRhdGUoKTtcbiAgICAgIH07XG4gICAgfSwgW25vZGUsIGNvbnRleHRdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3QgaGFuZGxlVXBkYXRlID0gKCkgPT4gZm9yY2Uoe30pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihDT05URVhUX1VQREFURSwgaGFuZGxlVXBkYXRlKTtcbiAgICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKENPTlRFWFRfVVBEQVRFLCBoYW5kbGVVcGRhdGUpO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIFByaW1pdGl2ZS5kaXYsXG4gICAgICB7XG4gICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgIHJlZjogY29tcG9zZWRSZWZzLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHBvaW50ZXJFdmVudHM6IGlzQm9keVBvaW50ZXJFdmVudHNEaXNhYmxlZCA/IGlzUG9pbnRlckV2ZW50c0VuYWJsZWQgPyBcImF1dG9cIiA6IFwibm9uZVwiIDogdm9pZCAwLFxuICAgICAgICAgIC4uLnByb3BzLnN0eWxlXG4gICAgICAgIH0sXG4gICAgICAgIG9uRm9jdXNDYXB0dXJlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkZvY3VzQ2FwdHVyZSwgZm9jdXNPdXRzaWRlLm9uRm9jdXNDYXB0dXJlKSxcbiAgICAgICAgb25CbHVyQ2FwdHVyZTogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25CbHVyQ2FwdHVyZSwgZm9jdXNPdXRzaWRlLm9uQmx1ckNhcHR1cmUpLFxuICAgICAgICBvblBvaW50ZXJEb3duQ2FwdHVyZTogY29tcG9zZUV2ZW50SGFuZGxlcnMoXG4gICAgICAgICAgcHJvcHMub25Qb2ludGVyRG93bkNhcHR1cmUsXG4gICAgICAgICAgcG9pbnRlckRvd25PdXRzaWRlLm9uUG9pbnRlckRvd25DYXB0dXJlXG4gICAgICAgIClcbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xuRGlzbWlzc2FibGVMYXllci5kaXNwbGF5TmFtZSA9IERJU01JU1NBQkxFX0xBWUVSX05BTUU7XG52YXIgQlJBTkNIX05BTUUgPSBcIkRpc21pc3NhYmxlTGF5ZXJCcmFuY2hcIjtcbnZhciBEaXNtaXNzYWJsZUxheWVyQnJhbmNoID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChEaXNtaXNzYWJsZUxheWVyQ29udGV4dCk7XG4gIGNvbnN0IHJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgcmVmKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBub2RlID0gcmVmLmN1cnJlbnQ7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIGNvbnRleHQuYnJhbmNoZXMuYWRkKG5vZGUpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY29udGV4dC5icmFuY2hlcy5kZWxldGUobm9kZSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW2NvbnRleHQuYnJhbmNoZXNdKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmRpdiwgeyAuLi5wcm9wcywgcmVmOiBjb21wb3NlZFJlZnMgfSk7XG59KTtcbkRpc21pc3NhYmxlTGF5ZXJCcmFuY2guZGlzcGxheU5hbWUgPSBCUkFOQ0hfTkFNRTtcbmZ1bmN0aW9uIHVzZVBvaW50ZXJEb3duT3V0c2lkZShvblBvaW50ZXJEb3duT3V0c2lkZSwgb3duZXJEb2N1bWVudCA9IGdsb2JhbFRoaXM/LmRvY3VtZW50KSB7XG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duT3V0c2lkZSA9IHVzZUNhbGxiYWNrUmVmKG9uUG9pbnRlckRvd25PdXRzaWRlKTtcbiAgY29uc3QgaXNQb2ludGVySW5zaWRlUmVhY3RUcmVlUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlQ2xpY2tSZWYgPSBSZWFjdC51c2VSZWYoKCkgPT4ge1xuICB9KTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiAhaXNQb2ludGVySW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgbGV0IGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGFuZGxlQW5kRGlzcGF0Y2hDdXN0b21FdmVudChcbiAgICAgICAgICAgIFBPSU5URVJfRE9XTl9PVVRTSURFLFxuICAgICAgICAgICAgaGFuZGxlUG9pbnRlckRvd25PdXRzaWRlLFxuICAgICAgICAgICAgZXZlbnREZXRhaWwsXG4gICAgICAgICAgICB7IGRpc2NyZXRlOiB0cnVlIH1cbiAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudCA9IGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQyO1xuICAgICAgICBjb25zdCBldmVudERldGFpbCA9IHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfTtcbiAgICAgICAgaWYgKGV2ZW50LnBvaW50ZXJUeXBlID09PSBcInRvdWNoXCIpIHtcbiAgICAgICAgICBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja1JlZi5jdXJyZW50KTtcbiAgICAgICAgICBoYW5kbGVDbGlja1JlZi5jdXJyZW50ID0gaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDI7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQyKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgaXNQb2ludGVySW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICB9O1xuICAgIGNvbnN0IHRpbWVySWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBvd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgICBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgICBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja1JlZi5jdXJyZW50KTtcbiAgICB9O1xuICB9LCBbb3duZXJEb2N1bWVudCwgaGFuZGxlUG9pbnRlckRvd25PdXRzaWRlXSk7XG4gIHJldHVybiB7XG4gICAgLy8gZW5zdXJlcyB3ZSBjaGVjayBSZWFjdCBjb21wb25lbnQgdHJlZSAobm90IGp1c3QgRE9NIHRyZWUpXG4gICAgb25Qb2ludGVyRG93bkNhcHR1cmU6ICgpID0+IGlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50ID0gdHJ1ZVxuICB9O1xufVxuZnVuY3Rpb24gdXNlRm9jdXNPdXRzaWRlKG9uRm9jdXNPdXRzaWRlLCBvd25lckRvY3VtZW50ID0gZ2xvYmFsVGhpcz8uZG9jdW1lbnQpIHtcbiAgY29uc3QgaGFuZGxlRm9jdXNPdXRzaWRlID0gdXNlQ2FsbGJhY2tSZWYob25Gb2N1c091dHNpZGUpO1xuICBjb25zdCBpc0ZvY3VzSW5zaWRlUmVhY3RUcmVlUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiAhaXNGb2N1c0luc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50RGV0YWlsID0geyBvcmlnaW5hbEV2ZW50OiBldmVudCB9O1xuICAgICAgICBoYW5kbGVBbmREaXNwYXRjaEN1c3RvbUV2ZW50KEZPQ1VTX09VVFNJREUsIGhhbmRsZUZvY3VzT3V0c2lkZSwgZXZlbnREZXRhaWwsIHtcbiAgICAgICAgICBkaXNjcmV0ZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBvd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzKTtcbiAgICByZXR1cm4gKCkgPT4gb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBoYW5kbGVGb2N1cyk7XG4gIH0sIFtvd25lckRvY3VtZW50LCBoYW5kbGVGb2N1c091dHNpZGVdKTtcbiAgcmV0dXJuIHtcbiAgICBvbkZvY3VzQ2FwdHVyZTogKCkgPT4gaXNGb2N1c0luc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50ID0gdHJ1ZSxcbiAgICBvbkJsdXJDYXB0dXJlOiAoKSA9PiBpc0ZvY3VzSW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQgPSBmYWxzZVxuICB9O1xufVxuZnVuY3Rpb24gZGlzcGF0Y2hVcGRhdGUoKSB7XG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KENPTlRFWFRfVVBEQVRFKTtcbiAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG59XG5mdW5jdGlvbiBoYW5kbGVBbmREaXNwYXRjaEN1c3RvbUV2ZW50KG5hbWUsIGhhbmRsZXIsIGRldGFpbCwgeyBkaXNjcmV0ZSB9KSB7XG4gIGNvbnN0IHRhcmdldCA9IGRldGFpbC5vcmlnaW5hbEV2ZW50LnRhcmdldDtcbiAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogdHJ1ZSwgZGV0YWlsIH0pO1xuICBpZiAoaGFuZGxlcikgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xuICBpZiAoZGlzY3JldGUpIHtcbiAgICBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnQodGFyZ2V0LCBldmVudCk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG59XG52YXIgUm9vdCA9IERpc21pc3NhYmxlTGF5ZXI7XG52YXIgQnJhbmNoID0gRGlzbWlzc2FibGVMYXllckJyYW5jaDtcbmV4cG9ydCB7XG4gIEJyYW5jaCxcbiAgRGlzbWlzc2FibGVMYXllcixcbiAgRGlzbWlzc2FibGVMYXllckJyYW5jaCxcbiAgUm9vdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZm9jdXMtZ3VhcmRzLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG52YXIgY291bnQgPSAwO1xuZnVuY3Rpb24gRm9jdXNHdWFyZHMocHJvcHMpIHtcbiAgdXNlRm9jdXNHdWFyZHMoKTtcbiAgcmV0dXJuIHByb3BzLmNoaWxkcmVuO1xufVxuZnVuY3Rpb24gdXNlRm9jdXNHdWFyZHMoKSB7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWRnZUd1YXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1yYWRpeC1mb2N1cy1ndWFyZF1cIik7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGVkZ2VHdWFyZHNbMF0gPz8gY3JlYXRlRm9jdXNHdWFyZCgpKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlZGdlR3VhcmRzWzFdID8/IGNyZWF0ZUZvY3VzR3VhcmQoKSk7XG4gICAgY291bnQrKztcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1yYWRpeC1mb2N1cy1ndWFyZF1cIikuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5yZW1vdmUoKSk7XG4gICAgICB9XG4gICAgICBjb3VudC0tO1xuICAgIH07XG4gIH0sIFtdKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUZvY3VzR3VhcmQoKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXJhZGl4LWZvY3VzLWd1YXJkXCIsIFwiXCIpO1xuICBlbGVtZW50LnRhYkluZGV4ID0gMDtcbiAgZWxlbWVudC5zdHlsZS5vdXRsaW5lID0gXCJub25lXCI7XG4gIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICBlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnQge1xuICBGb2N1c0d1YXJkcyxcbiAgRm9jdXNHdWFyZHMgYXMgUm9vdCxcbiAgdXNlRm9jdXNHdWFyZHNcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL2ZvY3VzLXNjb3BlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VDb21wb3NlZFJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmXCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBBVVRPRk9DVVNfT05fTU9VTlQgPSBcImZvY3VzU2NvcGUuYXV0b0ZvY3VzT25Nb3VudFwiO1xudmFyIEFVVE9GT0NVU19PTl9VTk1PVU5UID0gXCJmb2N1c1Njb3BlLmF1dG9Gb2N1c09uVW5tb3VudFwiO1xudmFyIEVWRU5UX09QVElPTlMgPSB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiB0cnVlIH07XG52YXIgRk9DVVNfU0NPUEVfTkFNRSA9IFwiRm9jdXNTY29wZVwiO1xudmFyIEZvY3VzU2NvcGUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBsb29wID0gZmFsc2UsXG4gICAgdHJhcHBlZCA9IGZhbHNlLFxuICAgIG9uTW91bnRBdXRvRm9jdXM6IG9uTW91bnRBdXRvRm9jdXNQcm9wLFxuICAgIG9uVW5tb3VudEF1dG9Gb2N1czogb25Vbm1vdW50QXV0b0ZvY3VzUHJvcCxcbiAgICAuLi5zY29wZVByb3BzXG4gIH0gPSBwcm9wcztcbiAgY29uc3QgW2NvbnRhaW5lciwgc2V0Q29udGFpbmVyXSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBvbk1vdW50QXV0b0ZvY3VzID0gdXNlQ2FsbGJhY2tSZWYob25Nb3VudEF1dG9Gb2N1c1Byb3ApO1xuICBjb25zdCBvblVubW91bnRBdXRvRm9jdXMgPSB1c2VDYWxsYmFja1JlZihvblVubW91bnRBdXRvRm9jdXNQcm9wKTtcbiAgY29uc3QgbGFzdEZvY3VzZWRFbGVtZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCAobm9kZSkgPT4gc2V0Q29udGFpbmVyKG5vZGUpKTtcbiAgY29uc3QgZm9jdXNTY29wZSA9IFJlYWN0LnVzZVJlZih7XG4gICAgcGF1c2VkOiBmYWxzZSxcbiAgICBwYXVzZSgpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB9LFxuICAgIHJlc3VtZSgpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9KS5jdXJyZW50O1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0cmFwcGVkKSB7XG4gICAgICBsZXQgaGFuZGxlRm9jdXNJbjIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZm9jdXNTY29wZS5wYXVzZWQgfHwgIWNvbnRhaW5lcikgcmV0dXJuO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmIChjb250YWluZXIuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgIGxhc3RGb2N1c2VkRWxlbWVudFJlZi5jdXJyZW50ID0gdGFyZ2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvY3VzKGxhc3RGb2N1c2VkRWxlbWVudFJlZi5jdXJyZW50LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSwgaGFuZGxlRm9jdXNPdXQyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGZvY3VzU2NvcGUucGF1c2VkIHx8ICFjb250YWluZXIpIHJldHVybjtcbiAgICAgICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG4gICAgICAgIGlmIChyZWxhdGVkVGFyZ2V0ID09PSBudWxsKSByZXR1cm47XG4gICAgICAgIGlmICghY29udGFpbmVyLmNvbnRhaW5zKHJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgZm9jdXMobGFzdEZvY3VzZWRFbGVtZW50UmVmLmN1cnJlbnQsIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9LCBoYW5kbGVNdXRhdGlvbnMyID0gZnVuY3Rpb24obXV0YXRpb25zKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKGZvY3VzZWRFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5KSByZXR1cm47XG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgaWYgKG11dGF0aW9uLnJlbW92ZWROb2Rlcy5sZW5ndGggPiAwKSBmb2N1cyhjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIGhhbmRsZUZvY3VzSW4gPSBoYW5kbGVGb2N1c0luMiwgaGFuZGxlRm9jdXNPdXQgPSBoYW5kbGVGb2N1c091dDIsIGhhbmRsZU11dGF0aW9ucyA9IGhhbmRsZU11dGF0aW9uczI7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBoYW5kbGVGb2N1c0luMik7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgaGFuZGxlRm9jdXNPdXQyKTtcbiAgICAgIGNvbnN0IG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihoYW5kbGVNdXRhdGlvbnMyKTtcbiAgICAgIGlmIChjb250YWluZXIpIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShjb250YWluZXIsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXNJbjIpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgaGFuZGxlRm9jdXNPdXQyKTtcbiAgICAgICAgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW3RyYXBwZWQsIGNvbnRhaW5lciwgZm9jdXNTY29wZS5wYXVzZWRdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICBmb2N1c1Njb3Blc1N0YWNrLmFkZChmb2N1c1Njb3BlKTtcbiAgICAgIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBoYXNGb2N1c2VkQ2FuZGlkYXRlID0gY29udGFpbmVyLmNvbnRhaW5zKHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCk7XG4gICAgICBpZiAoIWhhc0ZvY3VzZWRDYW5kaWRhdGUpIHtcbiAgICAgICAgY29uc3QgbW91bnRFdmVudCA9IG5ldyBDdXN0b21FdmVudChBVVRPRk9DVVNfT05fTU9VTlQsIEVWRU5UX09QVElPTlMpO1xuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fTU9VTlQsIG9uTW91bnRBdXRvRm9jdXMpO1xuICAgICAgICBjb250YWluZXIuZGlzcGF0Y2hFdmVudChtb3VudEV2ZW50KTtcbiAgICAgICAgaWYgKCFtb3VudEV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICBmb2N1c0ZpcnN0KHJlbW92ZUxpbmtzKGdldFRhYmJhYmxlQ2FuZGlkYXRlcyhjb250YWluZXIpKSwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCkge1xuICAgICAgICAgICAgZm9jdXMoY29udGFpbmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKEFVVE9GT0NVU19PTl9NT1VOVCwgb25Nb3VudEF1dG9Gb2N1cyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHVubW91bnRFdmVudCA9IG5ldyBDdXN0b21FdmVudChBVVRPRk9DVVNfT05fVU5NT1VOVCwgRVZFTlRfT1BUSU9OUyk7XG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX1VOTU9VTlQsIG9uVW5tb3VudEF1dG9Gb2N1cyk7XG4gICAgICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQodW5tb3VudEV2ZW50KTtcbiAgICAgICAgICBpZiAoIXVubW91bnRFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICBmb2N1cyhwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPz8gZG9jdW1lbnQuYm9keSwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKEFVVE9GT0NVU19PTl9VTk1PVU5ULCBvblVubW91bnRBdXRvRm9jdXMpO1xuICAgICAgICAgIGZvY3VzU2NvcGVzU3RhY2sucmVtb3ZlKGZvY3VzU2NvcGUpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbY29udGFpbmVyLCBvbk1vdW50QXV0b0ZvY3VzLCBvblVubW91bnRBdXRvRm9jdXMsIGZvY3VzU2NvcGVdKTtcbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChldmVudCkgPT4ge1xuICAgICAgaWYgKCFsb29wICYmICF0cmFwcGVkKSByZXR1cm47XG4gICAgICBpZiAoZm9jdXNTY29wZS5wYXVzZWQpIHJldHVybjtcbiAgICAgIGNvbnN0IGlzVGFiS2V5ID0gZXZlbnQua2V5ID09PSBcIlRhYlwiICYmICFldmVudC5hbHRLZXkgJiYgIWV2ZW50LmN0cmxLZXkgJiYgIWV2ZW50Lm1ldGFLZXk7XG4gICAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICBpZiAoaXNUYWJLZXkgJiYgZm9jdXNlZEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyMiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IFtmaXJzdCwgbGFzdF0gPSBnZXRUYWJiYWJsZUVkZ2VzKGNvbnRhaW5lcjIpO1xuICAgICAgICBjb25zdCBoYXNUYWJiYWJsZUVsZW1lbnRzSW5zaWRlID0gZmlyc3QgJiYgbGFzdDtcbiAgICAgICAgaWYgKCFoYXNUYWJiYWJsZUVsZW1lbnRzSW5zaWRlKSB7XG4gICAgICAgICAgaWYgKGZvY3VzZWRFbGVtZW50ID09PSBjb250YWluZXIyKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghZXZlbnQuc2hpZnRLZXkgJiYgZm9jdXNlZEVsZW1lbnQgPT09IGxhc3QpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAobG9vcCkgZm9jdXMoZmlyc3QsIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgZm9jdXNlZEVsZW1lbnQgPT09IGZpcnN0KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGxvb3ApIGZvY3VzKGxhc3QsIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgW2xvb3AsIHRyYXBwZWQsIGZvY3VzU2NvcGUucGF1c2VkXVxuICApO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuZGl2LCB7IHRhYkluZGV4OiAtMSwgLi4uc2NvcGVQcm9wcywgcmVmOiBjb21wb3NlZFJlZnMsIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biB9KTtcbn0pO1xuRm9jdXNTY29wZS5kaXNwbGF5TmFtZSA9IEZPQ1VTX1NDT1BFX05BTUU7XG5mdW5jdGlvbiBmb2N1c0ZpcnN0KGNhbmRpZGF0ZXMsIHsgc2VsZWN0ID0gZmFsc2UgfSA9IHt9KSB7XG4gIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIGNhbmRpZGF0ZXMpIHtcbiAgICBmb2N1cyhjYW5kaWRhdGUsIHsgc2VsZWN0IH0pO1xuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpIHJldHVybjtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0VGFiYmFibGVFZGdlcyhjb250YWluZXIpIHtcbiAgY29uc3QgY2FuZGlkYXRlcyA9IGdldFRhYmJhYmxlQ2FuZGlkYXRlcyhjb250YWluZXIpO1xuICBjb25zdCBmaXJzdCA9IGZpbmRWaXNpYmxlKGNhbmRpZGF0ZXMsIGNvbnRhaW5lcik7XG4gIGNvbnN0IGxhc3QgPSBmaW5kVmlzaWJsZShjYW5kaWRhdGVzLnJldmVyc2UoKSwgY29udGFpbmVyKTtcbiAgcmV0dXJuIFtmaXJzdCwgbGFzdF07XG59XG5mdW5jdGlvbiBnZXRUYWJiYWJsZUNhbmRpZGF0ZXMoY29udGFpbmVyKSB7XG4gIGNvbnN0IG5vZGVzID0gW107XG4gIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoY29udGFpbmVyLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwge1xuICAgIGFjY2VwdE5vZGU6IChub2RlKSA9PiB7XG4gICAgICBjb25zdCBpc0hpZGRlbklucHV0ID0gbm9kZS50YWdOYW1lID09PSBcIklOUFVUXCIgJiYgbm9kZS50eXBlID09PSBcImhpZGRlblwiO1xuICAgICAgaWYgKG5vZGUuZGlzYWJsZWQgfHwgbm9kZS5oaWRkZW4gfHwgaXNIaWRkZW5JbnB1dCkgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX1NLSVA7XG4gICAgICByZXR1cm4gbm9kZS50YWJJbmRleCA+PSAwID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfU0tJUDtcbiAgICB9XG4gIH0pO1xuICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIG5vZGVzLnB1c2god2Fsa2VyLmN1cnJlbnROb2RlKTtcbiAgcmV0dXJuIG5vZGVzO1xufVxuZnVuY3Rpb24gZmluZFZpc2libGUoZWxlbWVudHMsIGNvbnRhaW5lcikge1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICBpZiAoIWlzSGlkZGVuKGVsZW1lbnQsIHsgdXBUbzogY29udGFpbmVyIH0pKSByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuZnVuY3Rpb24gaXNIaWRkZW4obm9kZSwgeyB1cFRvIH0pIHtcbiAgaWYgKGdldENvbXB1dGVkU3R5bGUobm9kZSkudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikgcmV0dXJuIHRydWU7XG4gIHdoaWxlIChub2RlKSB7XG4gICAgaWYgKHVwVG8gIT09IHZvaWQgMCAmJiBub2RlID09PSB1cFRvKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdldENvbXB1dGVkU3R5bGUobm9kZSkuZGlzcGxheSA9PT0gXCJub25lXCIpIHJldHVybiB0cnVlO1xuICAgIG5vZGUgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNTZWxlY3RhYmxlSW5wdXQoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgXCJzZWxlY3RcIiBpbiBlbGVtZW50O1xufVxuZnVuY3Rpb24gZm9jdXMoZWxlbWVudCwgeyBzZWxlY3QgPSBmYWxzZSB9ID0ge30pIHtcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5mb2N1cykge1xuICAgIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgZWxlbWVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgaWYgKGVsZW1lbnQgIT09IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCAmJiBpc1NlbGVjdGFibGVJbnB1dChlbGVtZW50KSAmJiBzZWxlY3QpXG4gICAgICBlbGVtZW50LnNlbGVjdCgpO1xuICB9XG59XG52YXIgZm9jdXNTY29wZXNTdGFjayA9IGNyZWF0ZUZvY3VzU2NvcGVzU3RhY2soKTtcbmZ1bmN0aW9uIGNyZWF0ZUZvY3VzU2NvcGVzU3RhY2soKSB7XG4gIGxldCBzdGFjayA9IFtdO1xuICByZXR1cm4ge1xuICAgIGFkZChmb2N1c1Njb3BlKSB7XG4gICAgICBjb25zdCBhY3RpdmVGb2N1c1Njb3BlID0gc3RhY2tbMF07XG4gICAgICBpZiAoZm9jdXNTY29wZSAhPT0gYWN0aXZlRm9jdXNTY29wZSkge1xuICAgICAgICBhY3RpdmVGb2N1c1Njb3BlPy5wYXVzZSgpO1xuICAgICAgfVxuICAgICAgc3RhY2sgPSBhcnJheVJlbW92ZShzdGFjaywgZm9jdXNTY29wZSk7XG4gICAgICBzdGFjay51bnNoaWZ0KGZvY3VzU2NvcGUpO1xuICAgIH0sXG4gICAgcmVtb3ZlKGZvY3VzU2NvcGUpIHtcbiAgICAgIHN0YWNrID0gYXJyYXlSZW1vdmUoc3RhY2ssIGZvY3VzU2NvcGUpO1xuICAgICAgc3RhY2tbMF0/LnJlc3VtZSgpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFycmF5LCBpdGVtKSB7XG4gIGNvbnN0IHVwZGF0ZWRBcnJheSA9IFsuLi5hcnJheV07XG4gIGNvbnN0IGluZGV4ID0gdXBkYXRlZEFycmF5LmluZGV4T2YoaXRlbSk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICB1cGRhdGVkQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdXBkYXRlZEFycmF5O1xufVxuZnVuY3Rpb24gcmVtb3ZlTGlua3MoaXRlbXMpIHtcbiAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50YWdOYW1lICE9PSBcIkFcIik7XG59XG52YXIgUm9vdCA9IEZvY3VzU2NvcGU7XG5leHBvcnQge1xuICBGb2N1c1Njb3BlLFxuICBSb290XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvaWQvc3JjL2lkLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG52YXIgdXNlUmVhY3RJZCA9IFJlYWN0W1wiIHVzZUlkIFwiLnRyaW0oKS50b1N0cmluZygpXSB8fCAoKCkgPT4gdm9pZCAwKTtcbnZhciBjb3VudCA9IDA7XG5mdW5jdGlvbiB1c2VJZChkZXRlcm1pbmlzdGljSWQpIHtcbiAgY29uc3QgW2lkLCBzZXRJZF0gPSBSZWFjdC51c2VTdGF0ZSh1c2VSZWFjdElkKCkpO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZGV0ZXJtaW5pc3RpY0lkKSBzZXRJZCgocmVhY3RJZCkgPT4gcmVhY3RJZCA/PyBTdHJpbmcoY291bnQrKykpO1xuICB9LCBbZGV0ZXJtaW5pc3RpY0lkXSk7XG4gIHJldHVybiBkZXRlcm1pbmlzdGljSWQgfHwgKGlkID8gYHJhZGl4LSR7aWR9YCA6IFwiXCIpO1xufVxuZXhwb3J0IHtcbiAgdXNlSWRcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL3BvcnRhbC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBQT1JUQUxfTkFNRSA9IFwiUG9ydGFsXCI7XG52YXIgUG9ydGFsID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICBjb25zdCB7IGNvbnRhaW5lcjogY29udGFpbmVyUHJvcCwgLi4ucG9ydGFsUHJvcHMgfSA9IHByb3BzO1xuICBjb25zdCBbbW91bnRlZCwgc2V0TW91bnRlZF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiBzZXRNb3VudGVkKHRydWUpLCBbXSk7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lclByb3AgfHwgbW91bnRlZCAmJiBnbG9iYWxUaGlzPy5kb2N1bWVudD8uYm9keTtcbiAgcmV0dXJuIGNvbnRhaW5lciA/IFJlYWN0RE9NLmNyZWF0ZVBvcnRhbCgvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5kaXYsIHsgLi4ucG9ydGFsUHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pLCBjb250YWluZXIpIDogbnVsbDtcbn0pO1xuUG9ydGFsLmRpc3BsYXlOYW1lID0gUE9SVEFMX05BTUU7XG52YXIgUm9vdCA9IFBvcnRhbDtcbmV4cG9ydCB7XG4gIFBvcnRhbCxcbiAgUm9vdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvcHJlc2VuY2UudHN4XG5pbXBvcnQgKiBhcyBSZWFjdDIgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VDb21wb3NlZFJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xuXG4vLyBzcmMvdXNlLXN0YXRlLW1hY2hpbmUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIHVzZVN0YXRlTWFjaGluZShpbml0aWFsU3RhdGUsIG1hY2hpbmUpIHtcbiAgcmV0dXJuIFJlYWN0LnVzZVJlZHVjZXIoKHN0YXRlLCBldmVudCkgPT4ge1xuICAgIGNvbnN0IG5leHRTdGF0ZSA9IG1hY2hpbmVbc3RhdGVdW2V2ZW50XTtcbiAgICByZXR1cm4gbmV4dFN0YXRlID8/IHN0YXRlO1xuICB9LCBpbml0aWFsU3RhdGUpO1xufVxuXG4vLyBzcmMvcHJlc2VuY2UudHN4XG52YXIgUHJlc2VuY2UgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBwcmVzZW50LCBjaGlsZHJlbiB9ID0gcHJvcHM7XG4gIGNvbnN0IHByZXNlbmNlID0gdXNlUHJlc2VuY2UocHJlc2VudCk7XG4gIGNvbnN0IGNoaWxkID0gdHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCIgPyBjaGlsZHJlbih7IHByZXNlbnQ6IHByZXNlbmNlLmlzUHJlc2VudCB9KSA6IFJlYWN0Mi5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTtcbiAgY29uc3QgcmVmID0gdXNlQ29tcG9zZWRSZWZzKHByZXNlbmNlLnJlZiwgZ2V0RWxlbWVudFJlZihjaGlsZCkpO1xuICBjb25zdCBmb3JjZU1vdW50ID0gdHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCI7XG4gIHJldHVybiBmb3JjZU1vdW50IHx8IHByZXNlbmNlLmlzUHJlc2VudCA/IFJlYWN0Mi5jbG9uZUVsZW1lbnQoY2hpbGQsIHsgcmVmIH0pIDogbnVsbDtcbn07XG5QcmVzZW5jZS5kaXNwbGF5TmFtZSA9IFwiUHJlc2VuY2VcIjtcbmZ1bmN0aW9uIHVzZVByZXNlbmNlKHByZXNlbnQpIHtcbiAgY29uc3QgW25vZGUsIHNldE5vZGVdID0gUmVhY3QyLnVzZVN0YXRlKCk7XG4gIGNvbnN0IHN0eWxlc1JlZiA9IFJlYWN0Mi51c2VSZWYobnVsbCk7XG4gIGNvbnN0IHByZXZQcmVzZW50UmVmID0gUmVhY3QyLnVzZVJlZihwcmVzZW50KTtcbiAgY29uc3QgcHJldkFuaW1hdGlvbk5hbWVSZWYgPSBSZWFjdDIudXNlUmVmKFwibm9uZVwiKTtcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0gcHJlc2VudCA/IFwibW91bnRlZFwiIDogXCJ1bm1vdW50ZWRcIjtcbiAgY29uc3QgW3N0YXRlLCBzZW5kXSA9IHVzZVN0YXRlTWFjaGluZShpbml0aWFsU3RhdGUsIHtcbiAgICBtb3VudGVkOiB7XG4gICAgICBVTk1PVU5UOiBcInVubW91bnRlZFwiLFxuICAgICAgQU5JTUFUSU9OX09VVDogXCJ1bm1vdW50U3VzcGVuZGVkXCJcbiAgICB9LFxuICAgIHVubW91bnRTdXNwZW5kZWQ6IHtcbiAgICAgIE1PVU5UOiBcIm1vdW50ZWRcIixcbiAgICAgIEFOSU1BVElPTl9FTkQ6IFwidW5tb3VudGVkXCJcbiAgICB9LFxuICAgIHVubW91bnRlZDoge1xuICAgICAgTU9VTlQ6IFwibW91bnRlZFwiXG4gICAgfVxuICB9KTtcbiAgUmVhY3QyLnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEFuaW1hdGlvbk5hbWUgPSBnZXRBbmltYXRpb25OYW1lKHN0eWxlc1JlZi5jdXJyZW50KTtcbiAgICBwcmV2QW5pbWF0aW9uTmFtZVJlZi5jdXJyZW50ID0gc3RhdGUgPT09IFwibW91bnRlZFwiID8gY3VycmVudEFuaW1hdGlvbk5hbWUgOiBcIm5vbmVcIjtcbiAgfSwgW3N0YXRlXSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc3R5bGVzID0gc3R5bGVzUmVmLmN1cnJlbnQ7XG4gICAgY29uc3Qgd2FzUHJlc2VudCA9IHByZXZQcmVzZW50UmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgaGFzUHJlc2VudENoYW5nZWQgPSB3YXNQcmVzZW50ICE9PSBwcmVzZW50O1xuICAgIGlmIChoYXNQcmVzZW50Q2hhbmdlZCkge1xuICAgICAgY29uc3QgcHJldkFuaW1hdGlvbk5hbWUgPSBwcmV2QW5pbWF0aW9uTmFtZVJlZi5jdXJyZW50O1xuICAgICAgY29uc3QgY3VycmVudEFuaW1hdGlvbk5hbWUgPSBnZXRBbmltYXRpb25OYW1lKHN0eWxlcyk7XG4gICAgICBpZiAocHJlc2VudCkge1xuICAgICAgICBzZW5kKFwiTU9VTlRcIik7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRBbmltYXRpb25OYW1lID09PSBcIm5vbmVcIiB8fCBzdHlsZXM/LmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIHNlbmQoXCJVTk1PVU5UXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaXNBbmltYXRpbmcgPSBwcmV2QW5pbWF0aW9uTmFtZSAhPT0gY3VycmVudEFuaW1hdGlvbk5hbWU7XG4gICAgICAgIGlmICh3YXNQcmVzZW50ICYmIGlzQW5pbWF0aW5nKSB7XG4gICAgICAgICAgc2VuZChcIkFOSU1BVElPTl9PVVRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VuZChcIlVOTU9VTlRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHByZXZQcmVzZW50UmVmLmN1cnJlbnQgPSBwcmVzZW50O1xuICAgIH1cbiAgfSwgW3ByZXNlbnQsIHNlbmRdKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAobm9kZSkge1xuICAgICAgbGV0IHRpbWVvdXRJZDtcbiAgICAgIGNvbnN0IG93bmVyV2luZG93ID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3ID8/IHdpbmRvdztcbiAgICAgIGNvbnN0IGhhbmRsZUFuaW1hdGlvbkVuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uTmFtZSA9IGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzUmVmLmN1cnJlbnQpO1xuICAgICAgICBjb25zdCBpc0N1cnJlbnRBbmltYXRpb24gPSBjdXJyZW50QW5pbWF0aW9uTmFtZS5pbmNsdWRlcyhDU1MuZXNjYXBlKGV2ZW50LmFuaW1hdGlvbk5hbWUpKTtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbm9kZSAmJiBpc0N1cnJlbnRBbmltYXRpb24pIHtcbiAgICAgICAgICBzZW5kKFwiQU5JTUFUSU9OX0VORFwiKTtcbiAgICAgICAgICBpZiAoIXByZXZQcmVzZW50UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGaWxsTW9kZSA9IG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGU7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbkZpbGxNb2RlID0gXCJmb3J3YXJkc1wiO1xuICAgICAgICAgICAgdGltZW91dElkID0gb3duZXJXaW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChub2RlLnN0eWxlLmFuaW1hdGlvbkZpbGxNb2RlID09PSBcImZvcndhcmRzXCIpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbkZpbGxNb2RlID0gY3VycmVudEZpbGxNb2RlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBoYW5kbGVBbmltYXRpb25TdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBub2RlKSB7XG4gICAgICAgICAgcHJldkFuaW1hdGlvbk5hbWVSZWYuY3VycmVudCA9IGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzUmVmLmN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uc3RhcnRcIiwgaGFuZGxlQW5pbWF0aW9uU3RhcnQpO1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uY2FuY2VsXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgaGFuZGxlQW5pbWF0aW9uRW5kKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIG93bmVyV2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25zdGFydFwiLCBoYW5kbGVBbmltYXRpb25TdGFydCk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmNhbmNlbFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgaGFuZGxlQW5pbWF0aW9uRW5kKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbmQoXCJBTklNQVRJT05fRU5EXCIpO1xuICAgIH1cbiAgfSwgW25vZGUsIHNlbmRdKTtcbiAgcmV0dXJuIHtcbiAgICBpc1ByZXNlbnQ6IFtcIm1vdW50ZWRcIiwgXCJ1bm1vdW50U3VzcGVuZGVkXCJdLmluY2x1ZGVzKHN0YXRlKSxcbiAgICByZWY6IFJlYWN0Mi51c2VDYWxsYmFjaygobm9kZTIpID0+IHtcbiAgICAgIHN0eWxlc1JlZi5jdXJyZW50ID0gbm9kZTIgPyBnZXRDb21wdXRlZFN0eWxlKG5vZGUyKSA6IG51bGw7XG4gICAgICBzZXROb2RlKG5vZGUyKTtcbiAgICB9LCBbXSlcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzKSB7XG4gIHJldHVybiBzdHlsZXM/LmFuaW1hdGlvbk5hbWUgfHwgXCJub25lXCI7XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50UmVmKGVsZW1lbnQpIHtcbiAgbGV0IGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudC5wcm9wcywgXCJyZWZcIik/LmdldDtcbiAgbGV0IG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucmVmO1xuICB9XG4gIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudCwgXCJyZWZcIik/LmdldDtcbiAgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWY7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmIHx8IGVsZW1lbnQucmVmO1xufVxudmFyIFJvb3QgPSBQcmVzZW5jZTtcbmV4cG9ydCB7XG4gIFByZXNlbmNlLFxuICBSb290XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3ByaW1pdGl2ZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgY3JlYXRlU2xvdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3Qtc2xvdFwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgTk9ERVMgPSBbXG4gIFwiYVwiLFxuICBcImJ1dHRvblwiLFxuICBcImRpdlwiLFxuICBcImZvcm1cIixcbiAgXCJoMlwiLFxuICBcImgzXCIsXG4gIFwiaW1nXCIsXG4gIFwiaW5wdXRcIixcbiAgXCJsYWJlbFwiLFxuICBcImxpXCIsXG4gIFwibmF2XCIsXG4gIFwib2xcIixcbiAgXCJwXCIsXG4gIFwic2VsZWN0XCIsXG4gIFwic3BhblwiLFxuICBcInN2Z1wiLFxuICBcInVsXCJcbl07XG52YXIgUHJpbWl0aXZlID0gTk9ERVMucmVkdWNlKChwcmltaXRpdmUsIG5vZGUpID0+IHtcbiAgY29uc3QgU2xvdCA9IGNyZWF0ZVNsb3QoYFByaW1pdGl2ZS4ke25vZGV9YCk7XG4gIGNvbnN0IE5vZGUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBhc0NoaWxkLCAuLi5wcmltaXRpdmVQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgQ29tcCA9IGFzQ2hpbGQgPyBTbG90IDogbm9kZTtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgd2luZG93W1N5bWJvbC5mb3IoXCJyYWRpeC11aVwiKV0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChDb21wLCB7IC4uLnByaW1pdGl2ZVByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KTtcbiAgfSk7XG4gIE5vZGUuZGlzcGxheU5hbWUgPSBgUHJpbWl0aXZlLiR7bm9kZX1gO1xuICByZXR1cm4geyAuLi5wcmltaXRpdmUsIFtub2RlXTogTm9kZSB9O1xufSwge30pO1xuZnVuY3Rpb24gZGlzcGF0Y2hEaXNjcmV0ZUN1c3RvbUV2ZW50KHRhcmdldCwgZXZlbnQpIHtcbiAgaWYgKHRhcmdldCkgUmVhY3RET00uZmx1c2hTeW5jKCgpID0+IHRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KSk7XG59XG52YXIgUm9vdCA9IFByaW1pdGl2ZTtcbmV4cG9ydCB7XG4gIFByaW1pdGl2ZSxcbiAgUm9vdCxcbiAgZGlzcGF0Y2hEaXNjcmV0ZUN1c3RvbUV2ZW50XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3Nsb3QudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNvbXBvc2VSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IEZyYWdtZW50IGFzIEZyYWdtZW50MiwganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdChvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdENsb25lID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3RDbG9uZShvd25lck5hbWUpO1xuICBjb25zdCBTbG90MiA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5zbG90UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNoaWxkcmVuQXJyYXkgPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKTtcbiAgICBjb25zdCBzbG90dGFibGUgPSBjaGlsZHJlbkFycmF5LmZpbmQoaXNTbG90dGFibGUpO1xuICAgIGlmIChzbG90dGFibGUpIHtcbiAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBzbG90dGFibGUucHJvcHMuY2hpbGRyZW47XG4gICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGNoaWxkcmVuQXJyYXkubWFwKChjaGlsZCkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQgPT09IHNsb3R0YWJsZSkge1xuICAgICAgICAgIGlmIChSZWFjdC5DaGlsZHJlbi5jb3VudChuZXdFbGVtZW50KSA+IDEpIHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KG51bGwpO1xuICAgICAgICAgIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXdFbGVtZW50KSA/IG5ld0VsZW1lbnQucHJvcHMuY2hpbGRyZW4gOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChTbG90Q2xvbmUsIHsgLi4uc2xvdFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiwgY2hpbGRyZW46IFJlYWN0LmlzVmFsaWRFbGVtZW50KG5ld0VsZW1lbnQpID8gUmVhY3QuY2xvbmVFbGVtZW50KG5ld0VsZW1lbnQsIHZvaWQgMCwgbmV3Q2hpbGRyZW4pIDogbnVsbCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goU2xvdENsb25lLCB7IC4uLnNsb3RQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYsIGNoaWxkcmVuIH0pO1xuICB9KTtcbiAgU2xvdDIuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3RgO1xuICByZXR1cm4gU2xvdDI7XG59XG52YXIgU2xvdCA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90KFwiU2xvdFwiKTtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90Q2xvbmUob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3RDbG9uZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5zbG90UHJvcHMgfSA9IHByb3BzO1xuICAgIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuUmVmID0gZ2V0RWxlbWVudFJlZihjaGlsZHJlbik7XG4gICAgICBjb25zdCBwcm9wczIgPSBtZXJnZVByb3BzKHNsb3RQcm9wcywgY2hpbGRyZW4ucHJvcHMpO1xuICAgICAgaWYgKGNoaWxkcmVuLnR5cGUgIT09IFJlYWN0LkZyYWdtZW50KSB7XG4gICAgICAgIHByb3BzMi5yZWYgPSBmb3J3YXJkZWRSZWYgPyBjb21wb3NlUmVmcyhmb3J3YXJkZWRSZWYsIGNoaWxkcmVuUmVmKSA6IGNoaWxkcmVuUmVmO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZHJlbiwgcHJvcHMyKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA+IDEgPyBSZWFjdC5DaGlsZHJlbi5vbmx5KG51bGwpIDogbnVsbDtcbiAgfSk7XG4gIFNsb3RDbG9uZS5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdENsb25lYDtcbiAgcmV0dXJuIFNsb3RDbG9uZTtcbn1cbnZhciBTTE9UVEFCTEVfSURFTlRJRklFUiA9IFN5bWJvbChcInJhZGl4LnNsb3R0YWJsZVwiKTtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90dGFibGUob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3R0YWJsZTIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goRnJhZ21lbnQyLCB7IGNoaWxkcmVuIH0pO1xuICB9O1xuICBTbG90dGFibGUyLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90dGFibGVgO1xuICBTbG90dGFibGUyLl9fcmFkaXhJZCA9IFNMT1RUQUJMRV9JREVOVElGSUVSO1xuICByZXR1cm4gU2xvdHRhYmxlMjtcbn1cbnZhciBTbG90dGFibGUgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdHRhYmxlKFwiU2xvdHRhYmxlXCIpO1xuZnVuY3Rpb24gaXNTbG90dGFibGUoY2hpbGQpIHtcbiAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSAmJiB0eXBlb2YgY2hpbGQudHlwZSA9PT0gXCJmdW5jdGlvblwiICYmIFwiX19yYWRpeElkXCIgaW4gY2hpbGQudHlwZSAmJiBjaGlsZC50eXBlLl9fcmFkaXhJZCA9PT0gU0xPVFRBQkxFX0lERU5USUZJRVI7XG59XG5mdW5jdGlvbiBtZXJnZVByb3BzKHNsb3RQcm9wcywgY2hpbGRQcm9wcykge1xuICBjb25zdCBvdmVycmlkZVByb3BzID0geyAuLi5jaGlsZFByb3BzIH07XG4gIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hpbGRQcm9wcykge1xuICAgIGNvbnN0IHNsb3RQcm9wVmFsdWUgPSBzbG90UHJvcHNbcHJvcE5hbWVdO1xuICAgIGNvbnN0IGNoaWxkUHJvcFZhbHVlID0gY2hpbGRQcm9wc1twcm9wTmFtZV07XG4gICAgY29uc3QgaXNIYW5kbGVyID0gL15vbltBLVpdLy50ZXN0KHByb3BOYW1lKTtcbiAgICBpZiAoaXNIYW5kbGVyKSB7XG4gICAgICBpZiAoc2xvdFByb3BWYWx1ZSAmJiBjaGlsZFByb3BWYWx1ZSkge1xuICAgICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gY2hpbGRQcm9wVmFsdWUoLi4uYXJncyk7XG4gICAgICAgICAgc2xvdFByb3BWYWx1ZSguLi5hcmdzKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChzbG90UHJvcFZhbHVlKSB7XG4gICAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gc2xvdFByb3BWYWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSBcInN0eWxlXCIpIHtcbiAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0geyAuLi5zbG90UHJvcFZhbHVlLCAuLi5jaGlsZFByb3BWYWx1ZSB9O1xuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwiY2xhc3NOYW1lXCIpIHtcbiAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gW3Nsb3RQcm9wVmFsdWUsIGNoaWxkUHJvcFZhbHVlXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IC4uLnNsb3RQcm9wcywgLi4ub3ZlcnJpZGVQcm9wcyB9O1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudFJlZihlbGVtZW50KSB7XG4gIGxldCBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQucHJvcHMsIFwicmVmXCIpPy5nZXQ7XG4gIGxldCBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnJlZjtcbiAgfVxuICBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQsIFwicmVmXCIpPy5nZXQ7XG4gIG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmO1xuICB9XG4gIHJldHVybiBlbGVtZW50LnByb3BzLnJlZiB8fCBlbGVtZW50LnJlZjtcbn1cbmV4cG9ydCB7XG4gIFNsb3QgYXMgUm9vdCxcbiAgU2xvdCxcbiAgU2xvdHRhYmxlLFxuICBjcmVhdGVTbG90LFxuICBjcmVhdGVTbG90dGFibGVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC91c2UtY2FsbGJhY2stcmVmL3NyYy91c2UtY2FsbGJhY2stcmVmLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiB1c2VDYWxsYmFja1JlZihjYWxsYmFjaykge1xuICBjb25zdCBjYWxsYmFja1JlZiA9IFJlYWN0LnVzZVJlZihjYWxsYmFjayk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY2FsbGJhY2tSZWYuY3VycmVudCA9IGNhbGxiYWNrO1xuICB9KTtcbiAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oKCkgPT4gKC4uLmFyZ3MpID0+IGNhbGxiYWNrUmVmLmN1cnJlbnQ/LiguLi5hcmdzKSwgW10pO1xufVxuZXhwb3J0IHtcbiAgdXNlQ2FsbGJhY2tSZWZcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xudmFyIHVzZUluc2VydGlvbkVmZmVjdCA9IFJlYWN0W1wiIHVzZUluc2VydGlvbkVmZmVjdCBcIi50cmltKCkudG9TdHJpbmcoKV0gfHwgdXNlTGF5b3V0RWZmZWN0O1xuZnVuY3Rpb24gdXNlQ29udHJvbGxhYmxlU3RhdGUoe1xuICBwcm9wLFxuICBkZWZhdWx0UHJvcCxcbiAgb25DaGFuZ2UgPSAoKSA9PiB7XG4gIH0sXG4gIGNhbGxlclxufSkge1xuICBjb25zdCBbdW5jb250cm9sbGVkUHJvcCwgc2V0VW5jb250cm9sbGVkUHJvcCwgb25DaGFuZ2VSZWZdID0gdXNlVW5jb250cm9sbGVkU3RhdGUoe1xuICAgIGRlZmF1bHRQcm9wLFxuICAgIG9uQ2hhbmdlXG4gIH0pO1xuICBjb25zdCBpc0NvbnRyb2xsZWQgPSBwcm9wICE9PSB2b2lkIDA7XG4gIGNvbnN0IHZhbHVlID0gaXNDb250cm9sbGVkID8gcHJvcCA6IHVuY29udHJvbGxlZFByb3A7XG4gIGlmICh0cnVlKSB7XG4gICAgY29uc3QgaXNDb250cm9sbGVkUmVmID0gUmVhY3QudXNlUmVmKHByb3AgIT09IHZvaWQgMCk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IHdhc0NvbnRyb2xsZWQgPSBpc0NvbnRyb2xsZWRSZWYuY3VycmVudDtcbiAgICAgIGlmICh3YXNDb250cm9sbGVkICE9PSBpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgY29uc3QgZnJvbSA9IHdhc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCI7XG4gICAgICAgIGNvbnN0IHRvID0gaXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYCR7Y2FsbGVyfSBpcyBjaGFuZ2luZyBmcm9tICR7ZnJvbX0gdG8gJHt0b30uIENvbXBvbmVudHMgc2hvdWxkIG5vdCBzd2l0Y2ggZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgdmFsdWUgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgY29tcG9uZW50LmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlzQ29udHJvbGxlZFJlZi5jdXJyZW50ID0gaXNDb250cm9sbGVkO1xuICAgIH0sIFtpc0NvbnRyb2xsZWQsIGNhbGxlcl0pO1xuICB9XG4gIGNvbnN0IHNldFZhbHVlID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKG5leHRWYWx1ZSkgPT4ge1xuICAgICAgaWYgKGlzQ29udHJvbGxlZCkge1xuICAgICAgICBjb25zdCB2YWx1ZTIgPSBpc0Z1bmN0aW9uKG5leHRWYWx1ZSkgPyBuZXh0VmFsdWUocHJvcCkgOiBuZXh0VmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZTIgIT09IHByb3ApIHtcbiAgICAgICAgICBvbkNoYW5nZVJlZi5jdXJyZW50Py4odmFsdWUyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VW5jb250cm9sbGVkUHJvcChuZXh0VmFsdWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2lzQ29udHJvbGxlZCwgcHJvcCwgc2V0VW5jb250cm9sbGVkUHJvcCwgb25DaGFuZ2VSZWZdXG4gICk7XG4gIHJldHVybiBbdmFsdWUsIHNldFZhbHVlXTtcbn1cbmZ1bmN0aW9uIHVzZVVuY29udHJvbGxlZFN0YXRlKHtcbiAgZGVmYXVsdFByb3AsXG4gIG9uQ2hhbmdlXG59KSB7XG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gUmVhY3QudXNlU3RhdGUoZGVmYXVsdFByb3ApO1xuICBjb25zdCBwcmV2VmFsdWVSZWYgPSBSZWFjdC51c2VSZWYodmFsdWUpO1xuICBjb25zdCBvbkNoYW5nZVJlZiA9IFJlYWN0LnVzZVJlZihvbkNoYW5nZSk7XG4gIHVzZUluc2VydGlvbkVmZmVjdCgoKSA9PiB7XG4gICAgb25DaGFuZ2VSZWYuY3VycmVudCA9IG9uQ2hhbmdlO1xuICB9LCBbb25DaGFuZ2VdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocHJldlZhbHVlUmVmLmN1cnJlbnQgIT09IHZhbHVlKSB7XG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50Py4odmFsdWUpO1xuICAgICAgcHJldlZhbHVlUmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgICB9XG4gIH0sIFt2YWx1ZSwgcHJldlZhbHVlUmVmXSk7XG4gIHJldHVybiBbdmFsdWUsIHNldFZhbHVlLCBvbkNoYW5nZVJlZl07XG59XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuLy8gc3JjL3VzZS1jb250cm9sbGFibGUtc3RhdGUtcmVkdWNlci50c3hcbmltcG9ydCAqIGFzIFJlYWN0MiBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUVmZmVjdEV2ZW50IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtZWZmZWN0LWV2ZW50XCI7XG52YXIgU1lOQ19TVEFURSA9IFN5bWJvbChcIlJBRElYOlNZTkNfU1RBVEVcIik7XG5mdW5jdGlvbiB1c2VDb250cm9sbGFibGVTdGF0ZVJlZHVjZXIocmVkdWNlciwgdXNlckFyZ3MsIGluaXRpYWxBcmcsIGluaXQpIHtcbiAgY29uc3QgeyBwcm9wOiBjb250cm9sbGVkU3RhdGUsIGRlZmF1bHRQcm9wLCBvbkNoYW5nZTogb25DaGFuZ2VQcm9wLCBjYWxsZXIgfSA9IHVzZXJBcmdzO1xuICBjb25zdCBpc0NvbnRyb2xsZWQgPSBjb250cm9sbGVkU3RhdGUgIT09IHZvaWQgMDtcbiAgY29uc3Qgb25DaGFuZ2UgPSB1c2VFZmZlY3RFdmVudChvbkNoYW5nZVByb3ApO1xuICBpZiAodHJ1ZSkge1xuICAgIGNvbnN0IGlzQ29udHJvbGxlZFJlZiA9IFJlYWN0Mi51c2VSZWYoY29udHJvbGxlZFN0YXRlICE9PSB2b2lkIDApO1xuICAgIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3Qgd2FzQ29udHJvbGxlZCA9IGlzQ29udHJvbGxlZFJlZi5jdXJyZW50O1xuICAgICAgaWYgKHdhc0NvbnRyb2xsZWQgIT09IGlzQ29udHJvbGxlZCkge1xuICAgICAgICBjb25zdCBmcm9tID0gd2FzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc3QgdG8gPSBpc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCI7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgJHtjYWxsZXJ9IGlzIGNoYW5naW5nIGZyb20gJHtmcm9tfSB0byAke3RvfS4gQ29tcG9uZW50cyBzaG91bGQgbm90IHN3aXRjaCBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gRGVjaWRlIGJldHdlZW4gdXNpbmcgYSBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCB2YWx1ZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBjb21wb25lbnQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaXNDb250cm9sbGVkUmVmLmN1cnJlbnQgPSBpc0NvbnRyb2xsZWQ7XG4gICAgfSwgW2lzQ29udHJvbGxlZCwgY2FsbGVyXSk7XG4gIH1cbiAgY29uc3QgYXJncyA9IFt7IC4uLmluaXRpYWxBcmcsIHN0YXRlOiBkZWZhdWx0UHJvcCB9XTtcbiAgaWYgKGluaXQpIHtcbiAgICBhcmdzLnB1c2goaW5pdCk7XG4gIH1cbiAgY29uc3QgW2ludGVybmFsU3RhdGUsIGRpc3BhdGNoXSA9IFJlYWN0Mi51c2VSZWR1Y2VyKFxuICAgIChzdGF0ZTIsIGFjdGlvbikgPT4ge1xuICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBTWU5DX1NUQVRFKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlMiwgc3RhdGU6IGFjdGlvbi5zdGF0ZSB9O1xuICAgICAgfVxuICAgICAgY29uc3QgbmV4dCA9IHJlZHVjZXIoc3RhdGUyLCBhY3Rpb24pO1xuICAgICAgaWYgKGlzQ29udHJvbGxlZCAmJiAhT2JqZWN0LmlzKG5leHQuc3RhdGUsIHN0YXRlMi5zdGF0ZSkpIHtcbiAgICAgICAgb25DaGFuZ2UobmV4dC5zdGF0ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9LFxuICAgIC4uLmFyZ3NcbiAgKTtcbiAgY29uc3QgdW5jb250cm9sbGVkU3RhdGUgPSBpbnRlcm5hbFN0YXRlLnN0YXRlO1xuICBjb25zdCBwcmV2VmFsdWVSZWYgPSBSZWFjdDIudXNlUmVmKHVuY29udHJvbGxlZFN0YXRlKTtcbiAgUmVhY3QyLnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByZXZWYWx1ZVJlZi5jdXJyZW50ICE9PSB1bmNvbnRyb2xsZWRTdGF0ZSkge1xuICAgICAgcHJldlZhbHVlUmVmLmN1cnJlbnQgPSB1bmNvbnRyb2xsZWRTdGF0ZTtcbiAgICAgIGlmICghaXNDb250cm9sbGVkKSB7XG4gICAgICAgIG9uQ2hhbmdlKHVuY29udHJvbGxlZFN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtvbkNoYW5nZSwgdW5jb250cm9sbGVkU3RhdGUsIHByZXZWYWx1ZVJlZiwgaXNDb250cm9sbGVkXSk7XG4gIGNvbnN0IHN0YXRlID0gUmVhY3QyLnVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGlzQ29udHJvbGxlZDIgPSBjb250cm9sbGVkU3RhdGUgIT09IHZvaWQgMDtcbiAgICBpZiAoaXNDb250cm9sbGVkMikge1xuICAgICAgcmV0dXJuIHsgLi4uaW50ZXJuYWxTdGF0ZSwgc3RhdGU6IGNvbnRyb2xsZWRTdGF0ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gaW50ZXJuYWxTdGF0ZTtcbiAgfSwgW2ludGVybmFsU3RhdGUsIGNvbnRyb2xsZWRTdGF0ZV0pO1xuICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNDb250cm9sbGVkICYmICFPYmplY3QuaXMoY29udHJvbGxlZFN0YXRlLCBpbnRlcm5hbFN0YXRlLnN0YXRlKSkge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBTWU5DX1NUQVRFLCBzdGF0ZTogY29udHJvbGxlZFN0YXRlIH0pO1xuICAgIH1cbiAgfSwgW2NvbnRyb2xsZWRTdGF0ZSwgaW50ZXJuYWxTdGF0ZS5zdGF0ZSwgaXNDb250cm9sbGVkXSk7XG4gIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoXTtcbn1cbmV4cG9ydCB7XG4gIHVzZUNvbnRyb2xsYWJsZVN0YXRlLFxuICB1c2VDb250cm9sbGFibGVTdGF0ZVJlZHVjZXJcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvdXNlLWVmZmVjdC1ldmVudC50c3hcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIHVzZVJlYWN0RWZmZWN0RXZlbnQgPSBSZWFjdFtcIiB1c2VFZmZlY3RFdmVudCBcIi50cmltKCkudG9TdHJpbmcoKV07XG52YXIgdXNlUmVhY3RJbnNlcnRpb25FZmZlY3QgPSBSZWFjdFtcIiB1c2VJbnNlcnRpb25FZmZlY3QgXCIudHJpbSgpLnRvU3RyaW5nKCldO1xuZnVuY3Rpb24gdXNlRWZmZWN0RXZlbnQoY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiB1c2VSZWFjdEVmZmVjdEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gdXNlUmVhY3RFZmZlY3RFdmVudChjYWxsYmFjayk7XG4gIH1cbiAgY29uc3QgcmVmID0gUmVhY3QudXNlUmVmKCgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY2FsbCBhbiBldmVudCBoYW5kbGVyIHdoaWxlIHJlbmRlcmluZy5cIik7XG4gIH0pO1xuICBpZiAodHlwZW9mIHVzZVJlYWN0SW5zZXJ0aW9uRWZmZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB1c2VSZWFjdEluc2VydGlvbkVmZmVjdCgoKSA9PiB7XG4gICAgICByZWYuY3VycmVudCA9IGNhbGxiYWNrO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgICByZWYuY3VycmVudCA9IGNhbGxiYWNrO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBSZWFjdC51c2VNZW1vKCgpID0+ICguLi5hcmdzKSA9PiByZWYuY3VycmVudD8uKC4uLmFyZ3MpLCBbXSk7XG59XG5leHBvcnQge1xuICB1c2VFZmZlY3RFdmVudFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L3VzZS1lc2NhcGUta2V5ZG93bi9zcmMvdXNlLWVzY2FwZS1rZXlkb3duLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWNhbGxiYWNrLXJlZlwiO1xuZnVuY3Rpb24gdXNlRXNjYXBlS2V5ZG93bihvbkVzY2FwZUtleURvd25Qcm9wLCBvd25lckRvY3VtZW50ID0gZ2xvYmFsVGhpcz8uZG9jdW1lbnQpIHtcbiAgY29uc3Qgb25Fc2NhcGVLZXlEb3duID0gdXNlQ2FsbGJhY2tSZWYob25Fc2NhcGVLZXlEb3duUHJvcCk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICBvbkVzY2FwZUtleURvd24oZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG4gICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlEb3duLCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gICAgcmV0dXJuICgpID0+IG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RG93biwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICB9LCBbb25Fc2NhcGVLZXlEb3duLCBvd25lckRvY3VtZW50XSk7XG59XG5leHBvcnQge1xuICB1c2VFc2NhcGVLZXlkb3duXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvdXNlLWxheW91dC1lZmZlY3Qvc3JjL3VzZS1sYXlvdXQtZWZmZWN0LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG52YXIgdXNlTGF5b3V0RWZmZWN0MiA9IGdsb2JhbFRoaXM/LmRvY3VtZW50ID8gUmVhY3QudXNlTGF5b3V0RWZmZWN0IDogKCkgPT4ge1xufTtcbmV4cG9ydCB7XG4gIHVzZUxheW91dEVmZmVjdDIgYXMgdXNlTGF5b3V0RWZmZWN0XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG5cblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1Jcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgb1trMl0gPSBtW2tdO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xuICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XG4gIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICB9XG4gIH07XG4gIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XG4gIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgaWYgKCFtKSByZXR1cm4gbztcbiAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gIHRyeSB7XG4gICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgfVxuICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gIH1cbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcbiAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XG4gIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICByW2tdID0gYVtqXTtcbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XG4gIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcbiAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cbiAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxuICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xuICB2YXIgaSwgcDtcbiAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xuICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcbiAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgcmV0dXJuIGNvb2tlZDtcbn07XG5cbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gIG9bXCJkZWZhdWx0XCJdID0gdjtcbn07XG5cbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xuICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgYXIgPSBbXTtcbiAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xuICAgIHJldHVybiBhcjtcbiAgfTtcbiAgcmV0dXJuIG93bktleXMobyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIHZhciByLCBzID0gMDtcbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XG4gICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XG4gICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHMgfD0gMTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcbiAgfVxuICByZXR1cm4gbmV4dCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xuICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcbiAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xuICAgICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX2VzRGVjb3JhdGUsXG4gIF9fcnVuSW5pdGlhbGl6ZXJzLFxuICBfX3Byb3BLZXksXG4gIF9fc2V0RnVuY3Rpb25OYW1lLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbiAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXG59O1xuIl0sIm5hbWVzIjpbImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJSZWFjdCIsIkRpYWxvZ1ByaW1pdGl2ZSIsIlgiLCJjbiIsIkRpYWxvZyIsIlJvb3QiLCJEaWFsb2dUcmlnZ2VyIiwiVHJpZ2dlciIsIkRpYWxvZ1BvcnRhbCIsIlBvcnRhbCIsIkRpYWxvZ0Nsb3NlIiwiQ2xvc2UiLCJEaWFsb2dPdmVybGF5IiwiZm9yd2FyZFJlZiIsIl9yZWYiLCJyZWYiLCJjbGFzc05hbWUiLCJwcm9wcyIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsIl9leGNsdWRlZCIsIk92ZXJsYXkiLCJfb2JqZWN0U3ByZWFkIiwiZGlzcGxheU5hbWUiLCJEaWFsb2dDb250ZW50IiwiX3JlZjIiLCJjaGlsZHJlbiIsIl9yZWYyJHNob3dDbG9zZUJ1dHRvbiIsInNob3dDbG9zZUJ1dHRvbiIsIl9leGNsdWRlZDIiLCJDb250ZW50IiwiRGlhbG9nSGVhZGVyIiwiX3JlZjMiLCJfZXhjbHVkZWQzIiwiRGlhbG9nRm9vdGVyIiwiX3JlZjQiLCJfZXhjbHVkZWQ0IiwiRGlhbG9nVGl0bGUiLCJfcmVmNSIsIl9leGNsdWRlZDUiLCJUaXRsZSIsIkRpYWxvZ0Rlc2NyaXB0aW9uIiwiX3JlZjYiLCJfZXhjbHVkZWQ2IiwiRGVzY3JpcHRpb24iLCJzaXplQ2xhc3NlcyIsInNtIiwibWQiLCJsZyIsInhsIiwiZnVsbCIsIk1vZGFsIiwiaXNPcGVuIiwib25DbG9zZSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJmb290ZXIiLCJfcmVmJHNpemUiLCJzaXplIiwiX3JlZiRjbG9zZU9uT3ZlcmxheUNsIiwiY2xvc2VPbk92ZXJsYXlDbGljayIsIl9yZWYkc2hvd0Nsb3NlQnV0dG9uIiwiaGFuZGxlT3BlbkNoYW5nZSIsIm9wZW4iLCJoYW5kbGVPdmVybGF5Q2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJvbk9wZW5DaGFuZ2UiLCJvblBvaW50ZXJEb3duT3V0c2lkZSIsIm9uSW50ZXJhY3RPdXRzaWRlIiwiU2tlbGV0b24iLCJfcmVmJGNsYXNzTmFtZSIsIl9yZWYkdmFyaWFudCIsInZhcmlhbnQiLCJ3aWR0aCIsImhlaWdodCIsIl9yZWYkYW5pbWF0aW9uIiwiYW5pbWF0aW9uIiwidmFyaWFudENsYXNzZXMiLCJ0ZXh0IiwiY2lyY3VsYXIiLCJyZWN0YW5ndWxhciIsImFuaW1hdGlvbkNsYXNzZXMiLCJwdWxzZSIsIndhdmUiLCJub25lIiwic3R5bGUiLCJjb25jYXQiLCJyb2xlIiwiU2tlbGV0b25UZXh0IiwiX3JlZjIkbGluZXMiLCJsaW5lcyIsIl9yZWYyJGNsYXNzTmFtZSIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsIm1hcCIsIl8iLCJpbmRleCIsIlNrZWxldG9uQ2FyZCIsIl9yZWYzJGNsYXNzTmFtZSIsIl9yZWYzJGhhc0ltYWdlIiwiaGFzSW1hZ2UiLCJTa2VsZXRvblRhYmxlIiwiX3JlZjQkcm93cyIsInJvd3MiLCJfcmVmNCRjb2x1bW5zIiwiY29sdW1ucyIsIl9yZWY0JGNsYXNzTmFtZSIsInJvd0luZGV4IiwiY29sSW5kZXgiLCJTa2VsZXRvbkF2YXRhciIsIl9yZWY1JHNpemUiLCJfcmVmNSRjbGFzc05hbWUiLCJTa2VsZXRvbkxpc3QiLCJfcmVmNiRpdGVtcyIsIml0ZW1zIiwiX3JlZjYkY2xhc3NOYW1lIiwidCIsInIiLCJTeW1ib2wiLCJuIiwiaXRlcmF0b3IiLCJvIiwidG9TdHJpbmdUYWciLCJpIiwiYyIsInByb3RvdHlwZSIsIkdlbmVyYXRvciIsInUiLCJPYmplY3QiLCJjcmVhdGUiLCJfcmVnZW5lcmF0b3JEZWZpbmUyIiwiZiIsInAiLCJ5IiwiRyIsInYiLCJhIiwiZCIsImJpbmQiLCJsIiwiVHlwZUVycm9yIiwiY2FsbCIsImRvbmUiLCJ2YWx1ZSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJ0ZXN0IiwibmV4dCIsInB1c2giLCJpc0FycmF5IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJhcGkiLCJDYXJkIiwiQnV0dG9uIiwiUGx1cyIsIlRyZW5kaW5nVXAiLCJBbGVydFRyaWFuZ2xlIiwiQnVkZ2V0cyIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJidWRnZXRzIiwic2V0QnVkZ2V0cyIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwiY2F0ZWdvcmllcyIsInNldENhdGVnb3JpZXMiLCJfdXNlU3RhdGU1IiwiX3VzZVN0YXRlNiIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiX3VzZVN0YXRlNyIsIl91c2VTdGF0ZTgiLCJzaG93QWRkTW9kYWwiLCJzZXRTaG93QWRkTW9kYWwiLCJfdXNlU3RhdGU5IiwiX3VzZVN0YXRlMCIsInN1Ym1pdHRpbmciLCJzZXRTdWJtaXR0aW5nIiwiX3VzZVN0YXRlMSIsIkRhdGUiLCJnZXRGdWxsWWVhciIsIl91c2VTdGF0ZTEwIiwiZmlzY2FsWWVhciIsInNldEZpc2NhbFllYXIiLCJfdXNlU3RhdGUxMSIsImV4cGVuc2VfY2F0ZWdvcnlfaWQiLCJhbGxvY2F0ZWRfYW1vdW50IiwiX3VzZVN0YXRlMTIiLCJidWRnZXRJdGVtcyIsInNldEJ1ZGdldEl0ZW1zIiwiZmV0Y2hCdWRnZXRzIiwiZmV0Y2hDYXRlZ29yaWVzIiwiX2NhbGxlZSIsInJlc3BvbnNlIiwiX3QiLCJfY29udGV4dCIsImdldCIsInBhcmFtcyIsImZpc2NhbF95ZWFyIiwiZGF0YSIsImNvbnNvbGUiLCJlcnJvciIsIl9jYWxsZWUyIiwiX3QyIiwiX2NvbnRleHQyIiwiaGFuZGxlU3VibWl0IiwiX2NhbGxlZTMiLCJfdDMiLCJfY29udGV4dDMiLCJwb3N0IiwiaXRlbSIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsImFsZXJ0IiwiX3giLCJhZGRCdWRnZXRJdGVtIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwicmVtb3ZlQnVkZ2V0SXRlbSIsImZpbHRlciIsInVwZGF0ZUJ1ZGdldEl0ZW0iLCJmaWVsZCIsInVwZGF0ZWQiLCJnZXRTdGF0dXNDb2xvciIsInN0YXR1cyIsImdldFByb2dyZXNzQ29sb3IiLCJwZXJjZW50YWdlIiwiZm9ybWF0Q3VycmVuY3kiLCJhbW91bnQiLCJJbnRsIiwiTnVtYmVyRm9ybWF0IiwiY3VycmVuY3kiLCJmb3JtYXQiLCJvbkNoYW5nZSIsInRhcmdldCIsInllYXIiLCJpY29uIiwib25DbGljayIsImJ1ZGdldCIsImNhdGVnb3J5X25hbWUiLCJyZXBsYWNlIiwic3BlbnRfYW1vdW50IiwicmVtYWluaW5nX2Ftb3VudCIsInBlcmNlbnRhZ2VfdXNlZCIsInRvRml4ZWQiLCJNYXRoIiwibWluIiwiYWJzIiwiaWQiLCJvblN1Ym1pdCIsInJlcXVpcmVkIiwidHlwZSIsImNhdCIsInN0ZXAiLCJwbGFjZWhvbGRlciIsInJlZHVjZSIsInN1bSIsImRpc2FibGVkIl0sInNvdXJjZVJvb3QiOiIifQ==