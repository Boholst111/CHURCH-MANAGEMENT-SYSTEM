"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_Events_tsx"],{

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

/***/ "./resources/js/components/archive/ArchiveButton.tsx"
/*!***********************************************************!*\
  !*** ./resources/js/components/archive/ArchiveButton.tsx ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/archive.js");
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _ui_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/dialog */ "./resources/js/components/ui/dialog.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
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

// @ts-nocheck






/**
 * ArchiveButton Component
 *
 * A reusable button component for archiving items with confirmation dialog.
 * Replaces delete buttons throughout the application with archive terminology.
 *
 * Features:
 * - Archive icon instead of trash icon
 * - Confirmation dialog with "Archive" terminology
 * - Calls DELETE endpoint (which performs soft delete)
 * - Success/error toast notifications
 * - Loading state during archive operation
 *
 * Validates Requirements: 2.1, 2.2, 2.3, 2.5
 */
var ArchiveButton = function ArchiveButton(_ref) {
  var itemType = _ref.itemType,
    itemId = _ref.itemId,
    itemName = _ref.itemName,
    onArchiveSuccess = _ref.onArchiveSuccess,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'outline' : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'sm' : _ref$size,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$iconOnly = _ref.iconOnly,
    iconOnly = _ref$iconOnly === void 0 ? false : _ref$iconOnly;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDialogOpen = _useState2[0],
    setIsDialogOpen = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isArchiving = _useState4[0],
    setIsArchiving = _useState4[1];
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_5__.useToast)(),
    showToast = _useToast.showToast;
  /**
   * Handle archive button click - opens confirmation dialog
   */
  var handleArchiveClick = function handleArchiveClick() {
    setIsDialogOpen(true);
  };
  /**
   * Handle archive confirmation
   */
  var handleConfirmArchive = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _error$response, errorMessage, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setIsArchiving(true);
            _context.p = 1;
            _context.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_6__["default"]["delete"]("/".concat(itemType, "/").concat(itemId));
          case 2:
            showToast('success', "".concat(getItemTypeName(itemType), " archived successfully"));
            // Close dialog
            setIsDialogOpen(false);
            // Call success callback if provided
            if (onArchiveSuccess) {
              onArchiveSuccess();
            }
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            errorMessage = ((_error$response = _t.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || "Failed to archive ".concat(getItemTypeName(itemType).toLowerCase());
            showToast('error', errorMessage);
          case 4:
            _context.p = 4;
            setIsArchiving(false);
            return _context.f(4);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3, 4, 5]]);
    }));
    return function handleConfirmArchive() {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Handle dialog close
   */
  var handleCloseDialog = function handleCloseDialog() {
    if (!isArchiving) {
      setIsDialogOpen(false);
    }
  };
  /**
   * Get human-readable item type name
   */
  var getItemTypeName = function getItemTypeName(type) {
    var typeMap = {
      'members': 'Member',
      'events': 'Event',
      'leadership': 'Leadership',
      'small-groups': 'Small Group',
      'offerings': 'Offering',
      'expenses': 'Expense',
      'budgets': 'Budget',
      'pledges': 'Pledge',
      'funds': 'Fund',
      'vendors': 'Vendor',
      'expense-categories': 'Expense Category',
      'offering-types': 'Offering Type'
    };
    return typeMap[type] || 'Item';
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
      variant: variant,
      size: size,
      onClick: handleArchiveClick,
      className: className,
      title: "Archive",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: "h-4 w-4"
      }), !iconOnly && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "ml-2",
        children: "Archive"
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.Dialog, {
      open: isDialogOpen,
      onOpenChange: handleCloseDialog,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogContent, {
        className: "max-w-md",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogHeader, {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
                className: "h-5 w-5 text-orange-600"
              })
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogTitle, {
              children: ["Archive ", getItemTypeName(itemType)]
            })]
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "py-4",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
            className: "text-sm text-gray-700",
            children: ["Are you sure you want to archive", ' ', (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "font-semibold",
              children: itemName
            }), "? This item will be moved to the archive and can be restored later by an administrator."]
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_4__.DialogFooter, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
            type: "button",
            variant: "outline",
            onClick: handleCloseDialog,
            disabled: isArchiving,
            children: "Cancel"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
            type: "button",
            variant: "default",
            onClick: handleConfirmArchive,
            disabled: isArchiving,
            className: "bg-orange-600 hover:bg-orange-700",
            children: isArchiving ? 'Archiving...' : "Archive ".concat(getItemTypeName(itemType))
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ArchiveButton);

/***/ },

/***/ "./resources/js/components/events/CalendarView.tsx"
/*!*********************************************************!*\
  !*** ./resources/js/components/events/CalendarView.tsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalendarView: () => (/* binding */ CalendarView),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-left.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/chevron-right.js");
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _ui_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/utils */ "./resources/js/lib/utils.ts");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }






/**
 * Category colors for event dots
 */
var categoryColors = {
  worship: 'bg-primary-500',
  outreach: 'bg-success-500',
  fellowship: 'bg-warning-500',
  training: 'bg-info-500',
  "default": 'bg-neutral-500'
};
/**
 * Get category color class
 */
var getCategoryColor = function getCategoryColor(category) {
  if (!category) return categoryColors["default"];
  var normalizedCategory = category.toLowerCase();
  return categoryColors[normalizedCategory] || categoryColors["default"];
};
/**
 * CalendarView Component
 *
 * Displays events in a monthly calendar grid view with the following features:
 * - Monthly grid view with day cells
 * - Event indicators (dots or mini-cards) on days with events
 * - Color-coded events by category (Worship: blue, Outreach: green, Fellowship: yellow, Training: info)
 * - Navigation buttons to move between months (Previous Month, Today, Next Month)
 * - "+X more" indicator when a day has more than 3 events
 * - Clickable day cells to view all events for that day
 * - Responsive design for mobile devices
 *
 * Design Reference: Calendar View section
 * Validates Requirements: 12.3
 * Task: 12.3 Implement calendar view
 */
var CalendarView = function CalendarView(_ref) {
  var events = _ref.events,
    onDayClick = _ref.onDayClick,
    onEventClick = _ref.onEventClick;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Date()),
    _useState2 = _slicedToArray(_useState, 2),
    currentDate = _useState2[0],
    setCurrentDate = _useState2[1];
  /**
   * Get the first day of the month
   */
  var getFirstDayOfMonth = function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };
  /**
   * Get the last day of the month
   */
  var getLastDayOfMonth = function getLastDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };
  /**
   * Get the number of days in the month
   */
  var getDaysInMonth = function getDaysInMonth(date) {
    return getLastDayOfMonth(date).getDate();
  };
  /**
   * Get the day of week for the first day of the month (0 = Sunday)
   */
  var getFirstDayOfWeek = function getFirstDayOfWeek(date) {
    return getFirstDayOfMonth(date).getDay();
  };
  /**
   * Navigate to previous month
   */
  var goToPreviousMonth = function goToPreviousMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  /**
   * Navigate to next month
   */
  var goToNextMonth = function goToNextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  /**
   * Navigate to today
   */
  var goToToday = function goToToday() {
    setCurrentDate(new Date());
  };
  /**
   * Check if a date is today
   */
  var isToday = function isToday(date) {
    var today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };
  /**
   * Check if a date is in the current month
   */
  var isCurrentMonth = function isCurrentMonth(date) {
    return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
  };
  /**
   * Get events for a specific date
   */
  var getEventsForDate = function getEventsForDate(date) {
    return events.filter(function (event) {
      var eventDate = new Date(event.event_date);
      return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
    });
  };
  /**
   * Generate calendar days
   */
  var calendarDays = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var days = [];
    var firstDay = getFirstDayOfWeek(currentDate);
    var daysInMonth = getDaysInMonth(currentDate);
    // Add empty cells for days before the first day of the month
    for (var i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add all days of the month
    for (var day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
    return days;
  }, [currentDate]);
  /**
   * Format month and year for display
   */
  var formatMonthYear = function formatMonthYear(date) {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };
  /**
   * Day names
   */
  var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  /**
   * Handle day click
   */
  var handleDayClick = function handleDayClick(date) {
    var dayEvents = getEventsForDate(date);
    if (onDayClick) {
      onDayClick(date, dayEvents);
    }
  };
  /**
   * Handle event click
   */
  var handleEventClick = function handleEventClick(event, e) {
    e.stopPropagation();
    if (onEventClick) {
      onEventClick(event);
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_card__WEBPACK_IMPORTED_MODULE_5__.Card, {
    className: "p-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex items-center justify-between mb-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-2xl font-bold text-neutral-900",
        children: formatMonthYear(currentDate)
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
          variant: "outline",
          size: "sm",
          onClick: goToPreviousMonth,
          "aria-label": "Previous Month",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "h-4 w-4"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
          variant: "outline",
          size: "sm",
          onClick: goToToday,
          children: "Today"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
          variant: "outline",
          size: "sm",
          onClick: goToNextMonth,
          "aria-label": "Next Month",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
            className: "h-4 w-4"
          })
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "grid grid-cols-7 gap-px bg-neutral-200 border border-neutral-200 rounded-lg overflow-hidden",
      children: [dayNames.map(function (day) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "bg-neutral-50 px-2 py-3 text-center text-sm font-semibold text-neutral-700",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "hidden sm:inline",
            children: day
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "sm:hidden",
            children: day.charAt(0)
          })]
        }, day);
      }), calendarDays.map(function (date, index) {
        if (!date) {
          // Empty cell for days before the first day of the month
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-neutral-50 min-h-24 sm:min-h-32"
          }, "empty-".concat(index));
        }
        var dayEvents = getEventsForDate(date);
        var visibleEvents = dayEvents.slice(0, 3);
        var moreCount = dayEvents.length - visibleEvents.length;
        var today = isToday(date);
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          onClick: function onClick() {
            return handleDayClick(date);
          },
          className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('bg-white min-h-24 sm:min-h-32 p-2 cursor-pointer transition-colors hover:bg-primary-50', today && 'bg-primary-50'),
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex items-center justify-center mb-2",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full', today ? 'bg-primary-600 text-white' : 'text-neutral-900'),
              children: date.getDate()
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-1",
            children: [visibleEvents.map(function (event) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                onClick: function onClick(e) {
                  return handleEventClick(event, e);
                },
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)('flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium text-white truncate hover:opacity-80 transition-opacity', getCategoryColor(event.category)),
                title: event.title,
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "truncate hidden sm:inline",
                  children: event.title
                })]
              }, event.id);
            }), moreCount > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "px-2 py-1 text-xs font-medium text-neutral-600",
              children: ["+", moreCount, " more"]
            })]
          })]
        }, date.toISOString());
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "mt-6 flex flex-wrap items-center gap-4 text-sm",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "font-medium text-neutral-700",
        children: "Categories:"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "w-3 h-3 rounded-full bg-primary-500"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-neutral-600",
          children: "Worship"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "w-3 h-3 rounded-full bg-success-500"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-neutral-600",
          children: "Outreach"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "w-3 h-3 rounded-full bg-warning-500"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-neutral-600",
          children: "Fellowship"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "w-3 h-3 rounded-full bg-info-500"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "text-neutral-600",
          children: "Training"
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CalendarView);

/***/ },

/***/ "./resources/js/components/events/CompleteEventDialog.tsx"
/*!****************************************************************!*\
  !*** ./resources/js/components/events/CompleteEventDialog.tsx ***!
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
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check-big.js");
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
 * CompleteEventDialog Component
 *
 * Dialog for marking an event as completed and recording attendance.
 *
 * Features:
 * - Input field for attendance count
 * - Validation for attendance count (must be >= 0)
 * - Cancel and Complete buttons
 *
 * Validates Requirements: 9.4
 */
var CompleteEventDialog = function CompleteEventDialog(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onConfirm = _ref.onConfirm,
    eventTitle = _ref.eventTitle;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    attendanceCount = _useState2[0],
    setAttendanceCount = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isSubmitting = _useState6[0],
    setIsSubmitting = _useState6[1];
  /**
   * Reset form when dialog opens/closes
   */
  react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(function () {
    if (isOpen) {
      setAttendanceCount('');
      setError('');
    }
  }, [isOpen]);
  /**
   * Validate attendance count
   */
  var validateAttendance = function validateAttendance() {
    var count = parseInt(attendanceCount, 10);
    if (attendanceCount === '' || isNaN(count)) {
      setError('Attendance count is required');
      return false;
    }
    if (count < 0) {
      setError('Attendance count must be 0 or greater');
      return false;
    }
    return true;
  };
  /**
   * Handle form submission
   */
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            if (validateAttendance()) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            setIsSubmitting(true);
            _context.p = 2;
            _context.n = 3;
            return onConfirm(parseInt(attendanceCount, 10));
          case 3:
            onClose();
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
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
   * Handle input change
   */
  var handleChange = function handleChange(e) {
    setAttendanceCount(e.target.value);
    if (error) {
      setError('');
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogContent, {
      className: "max-w-md",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogHeader, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3 mb-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
              className: "h-5 w-5 text-green-600"
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogTitle, {
            children: "Mark Event as Completed"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogDescription, {
          children: ["Mark \"", eventTitle, "\" as completed and record the attendance count."]
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        onSubmit: handleSubmit,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "py-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            htmlFor: "attendance",
            className: "block text-sm font-medium text-gray-700 mb-2",
            children: ["Attendance Count ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
            id: "attendance",
            name: "attendance",
            type: "number",
            min: "0",
            placeholder: "e.g., 150",
            value: attendanceCount,
            onChange: handleChange,
            className: error ? 'border-red-500' : '',
            disabled: isSubmitting,
            autoFocus: true
          }), error && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: error
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogFooter, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
            type: "button",
            variant: "outline",
            onClick: onClose,
            disabled: isSubmitting,
            children: "Cancel"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
            type: "submit",
            disabled: isSubmitting,
            children: isSubmitting ? 'Completing...' : 'Mark as Completed'
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CompleteEventDialog);

/***/ },

/***/ "./resources/js/components/events/EventForm.tsx"
/*!******************************************************!*\
  !*** ./resources/js/components/events/EventForm.tsx ***!
  \******************************************************/
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
/* harmony import */ var _ui_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/select */ "./resources/js/components/ui/select.tsx");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/upload.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
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
 * EventForm Component
 *
 * Form for adding or editing church events.
 *
 * Features:
 * - Input fields for title, description, date, time, location, category, capacity, image
 * - Date and time pickers
 * - Category selector (Worship, Outreach, Fellowship, Training)
 * - Image upload functionality with preview
 * - Form validation with inline error messages
 * - Validates date is not in the past
 * - Support for both create and edit modes
 * - Loading states during submission
 *
 * Validates Requirements: 9.1, 9.4
 * Design Reference: Events Page Design section
 * Task: 12.4 Create Add/Edit Event modal
 */
var EventForm = function EventForm(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onSubmit = _ref.onSubmit,
    _ref$event = _ref.event,
    event = _ref$event === void 0 ? null : _ref$event,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      title: '',
      description: '',
      event_date: '',
      event_time: '',
      location: '',
      category: 'worship',
      capacity: null,
      image: null
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
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    imagePreview = _useState8[0],
    setImagePreview = _useState8[1];
  var fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  /**
   * Initialize form data when event prop changes
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || '',
        event_date: event.event_date.split('T')[0],
        event_time: event.event_time.substring(0, 5),
        // HH:mm format
        location: event.location,
        category: event.category || 'worship',
        capacity: event.capacity || null,
        image: event.image || null
      });
      // Set image preview if editing and image exists
      if (event.image && typeof event.image === 'string') {
        setImagePreview(event.image);
      }
    } else {
      // Reset form for new event
      setFormData({
        title: '',
        description: '',
        event_date: '',
        event_time: '',
        location: '',
        category: 'worship',
        capacity: null,
        image: null
      });
      setImagePreview(null);
    }
    setErrors({});
  }, [event, isOpen]);
  /**
   * Validate form data
   */
  var validateForm = function validateForm() {
    var newErrors = {};
    // Required fields
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }
    if (!formData.event_date) {
      newErrors.event_date = 'Date is required';
    } else if (!event) {
      // Only validate date is not in the past for new events
      var selectedDate = new Date(formData.event_date + 'T00:00:00');
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.event_date = 'Event date cannot be in the past';
      }
    }
    if (!formData.event_time) {
      newErrors.event_time = 'Time is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.length > 200) {
      newErrors.location = 'Location must be 200 characters or less';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    // Validate capacity if provided
    if (formData.capacity !== null && formData.capacity !== undefined) {
      var capacityNum = Number(formData.capacity);
      if (isNaN(capacityNum) || capacityNum < 1) {
        newErrors.capacity = 'Capacity must be a positive number';
      }
    }
    // Validate image if present
    if (formData.image && formData.image instanceof File) {
      var validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(formData.image.type)) {
        newErrors.image = 'Image must be a valid image file (JPEG, PNG, GIF, or WebP)';
      }
      var maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.image.size > maxSize) {
        newErrors.image = 'Image must be less than 5MB';
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
   * Handle image file selection
   */
  var handleImageChange = function handleImageChange(e) {
    var _e$target$files;
    var file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
    if (file) {
      setFormData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          image: file
        });
      });
      // Create preview URL
      var reader = new FileReader();
      reader.onloadend = function () {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      // Clear image error
      if (errors.image) {
        setErrors(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            image: undefined
          });
        });
      }
    }
  };
  /**
   * Handle image removal
   */
  var handleImageRemove = function handleImageRemove() {
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        image: null
      });
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  /**
   * Handle form submission
   */
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var submitData, _submitData, _error$response, _error$response2, _error$response3, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            if (validateForm()) {
              _context.n = 1;
              break;
            }
            console.log('Form validation failed');
            return _context.a(2);
          case 1:
            setIsSubmitting(true);
            _context.p = 2;
            if (!(formData.image instanceof File)) {
              _context.n = 4;
              break;
            }
            submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description || '');
            submitData.append('event_date', formData.event_date);
            submitData.append('event_time', formData.event_time);
            submitData.append('location', formData.location);
            submitData.append('category', formData.category);
            if (formData.capacity !== null && formData.capacity !== undefined) {
              submitData.append('capacity', String(formData.capacity));
            }
            submitData.append('status', (event === null || event === void 0 ? void 0 : event.status) || 'upcoming');
            submitData.append('image', formData.image);
            _context.n = 3;
            return onSubmit(submitData);
          case 3:
            _context.n = 5;
            break;
          case 4:
            // Submit as regular JSON
            _submitData = _objectSpread(_objectSpread({}, formData), {}, {
              status: (event === null || event === void 0 ? void 0 : event.status) || 'upcoming'
            });
            console.log('EventForm submitting data:', _submitData);
            _context.n = 5;
            return onSubmit(_submitData);
          case 5:
            console.log('EventForm submission successful, closing form');
            onClose();
            _context.n = 7;
            break;
          case 6:
            _context.p = 6;
            _t = _context.v;
            console.error('EventForm submission error:', _t);
            console.error('Error response data:', (_error$response = _t.response) === null || _error$response === void 0 ? void 0 : _error$response.data);
            // Handle server-side validation errors
            if ((_error$response2 = _t.response) !== null && _error$response2 !== void 0 && (_error$response2 = _error$response2.data) !== null && _error$response2 !== void 0 && _error$response2.errors) {
              setErrors(_t.response.data.errors);
            }
            // Show alert with error details
            alert('Error creating event: ' + (((_error$response3 = _t.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || _t.message));
            // Don't close the form if there's an error
          case 7:
            _context.p = 7;
            setIsSubmitting(false);
            return _context.f(7);
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[2, 6, 7, 8]]);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.Dialog, {
    open: isOpen,
    onOpenChange: function onOpenChange(open) {
      if (!open && !isSubmitting) {
        onClose();
      }
    },
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogContent, {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogHeader, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogTitle, {
          children: event ? 'Edit Event' : 'Add New Event'
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
        onSubmit: handleSubmit,
        className: "space-y-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            htmlFor: "title",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: ["Title ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
            id: "title",
            name: "title",
            type: "text",
            placeholder: "e.g., Sunday Service, Youth Night",
            value: formData.title,
            onChange: handleChange,
            className: errors.title ? 'border-red-500' : '',
            disabled: isSubmitting
          }), errors.title && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.title
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            htmlFor: "description",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "Description"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
            id: "description",
            name: "description",
            rows: 4,
            value: formData.description,
            onChange: handleChange,
            className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            placeholder: "Brief description of the event...",
            disabled: isSubmitting
          }), errors.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.description
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              htmlFor: "event_date",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Date ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "event_date",
              name: "event_date",
              type: "date",
              value: formData.event_date,
              onChange: handleChange,
              className: errors.event_date ? 'border-red-500' : '',
              disabled: isSubmitting
            }), errors.event_date && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.event_date
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              htmlFor: "event_time",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Time ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "event_time",
              name: "event_time",
              type: "time",
              value: formData.event_time,
              onChange: handleChange,
              className: errors.event_time ? 'border-red-500' : '',
              disabled: isSubmitting
            }), errors.event_time && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.event_time
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
            placeholder: "e.g., Main Sanctuary, Youth Hall",
            value: formData.location,
            onChange: handleChange,
            className: errors.location ? 'border-red-500' : '',
            disabled: isSubmitting
          }), errors.location && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.location
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_select__WEBPACK_IMPORTED_MODULE_5__.Select, {
              label: "Category",
              value: formData.category,
              onChange: function onChange(value) {
                setFormData(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    category: value
                  });
                });
                if (errors.category) {
                  setErrors(function (prev) {
                    return _objectSpread(_objectSpread({}, prev), {}, {
                      category: undefined
                    });
                  });
                }
              },
              options: [{
                value: 'worship',
                label: 'Worship'
              }, {
                value: 'outreach',
                label: 'Outreach'
              }, {
                value: 'fellowship',
                label: 'Fellowship'
              }, {
                value: 'training',
                label: 'Training'
              }],
              error: errors.category,
              disabled: isSubmitting,
              required: true
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              htmlFor: "capacity",
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Capacity (Optional)"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "capacity",
              name: "capacity",
              type: "number",
              min: "1",
              placeholder: "e.g., 100",
              value: formData.capacity || '',
              onChange: function onChange(e) {
                var value = e.target.value;
                setFormData(function (prev) {
                  return _objectSpread(_objectSpread({}, prev), {}, {
                    capacity: value ? parseInt(value) : null
                  });
                });
                if (errors.capacity) {
                  setErrors(function (prev) {
                    return _objectSpread(_objectSpread({}, prev), {}, {
                      capacity: undefined
                    });
                  });
                }
              },
              className: errors.capacity ? 'border-red-500' : '',
              disabled: isSubmitting
            }), errors.capacity && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-red-600 mt-1",
              children: errors.capacity
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "Event Image (Optional)"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-3",
            children: [imagePreview && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "relative inline-block",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                src: imagePreview,
                alt: "Event image preview",
                className: "w-full h-48 object-cover rounded-lg border-2 border-gray-200"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onClick: handleImageRemove,
                className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors",
                disabled: isSubmitting,
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
                  className: "h-4 w-4"
                })
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                onChange: handleImageChange,
                className: "hidden",
                disabled: isSubmitting
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                type: "button",
                variant: "outline",
                onClick: function onClick() {
                  var _fileInputRef$current;
                  return (_fileInputRef$current = fileInputRef.current) === null || _fileInputRef$current === void 0 ? void 0 : _fileInputRef$current.click();
                },
                disabled: isSubmitting,
                className: "w-full sm:w-auto",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  className: "h-4 w-4 mr-2"
                }), imagePreview ? 'Change Image' : 'Upload Image']
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs text-gray-500 mt-1",
                children: "Recommended: 16:9 aspect ratio, max 5MB (JPEG, PNG, GIF, or WebP)"
              })]
            })]
          }), errors.image && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.image
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_dialog__WEBPACK_IMPORTED_MODULE_2__.DialogFooter, {
          className: "mt-6",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
            type: "button",
            variant: "outline",
            onClick: function onClick() {
              console.log('Cancel button clicked');
              onClose();
            },
            disabled: isSubmitting,
            children: "Cancel"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
            type: "submit",
            disabled: isSubmitting || isLoading,
            onClick: function onClick() {
              return console.log('Submit button clicked');
            },
            children: isSubmitting ? 'Saving...' : event ? 'Update Event' : 'Add Event'
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventForm);

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

/***/ "./resources/js/pages/Events.tsx"
/*!***************************************!*\
  !*** ./resources/js/pages/Events.tsx ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-check-big.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/square-pen.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/calendar.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/clock.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/layout-grid.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/list.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/map-pin.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/users.js");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _components_ui_select__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/ui/select */ "./resources/js/components/ui/select.tsx");
/* harmony import */ var _components_ui_skeleton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../components/ui/skeleton */ "./resources/js/components/ui/skeleton.tsx");
/* harmony import */ var _lib_eventApi__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../lib/eventApi */ "./resources/js/lib/eventApi.ts");
/* harmony import */ var _components_events_EventForm__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../components/events/EventForm */ "./resources/js/components/events/EventForm.tsx");
/* harmony import */ var _components_events_CompleteEventDialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../components/events/CompleteEventDialog */ "./resources/js/components/events/CompleteEventDialog.tsx");
/* harmony import */ var _components_archive_ArchiveButton__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../components/archive/ArchiveButton */ "./resources/js/components/archive/ArchiveButton.tsx");
/* harmony import */ var _components_events_CalendarView__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../components/events/CalendarView */ "./resources/js/components/events/CalendarView.tsx");
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
 * Events Page Component
 *
 * Displays a list of upcoming and past church events with management capabilities.
 * Implements the Events Page Design from the Modern UI/UX Redesign spec.
 *
 * Layout Structure:
 * - Page header with "Create Event" and "Calendar View" buttons
 * - Filter bar with Time Range, Category, and Status filters
 * - View mode toggle (List / Calendar / Grid)
 * - Event cards in selected view mode
 *
 * Features:
 * - Display list of upcoming events (sorted chronologically)
 * - Display list of past events
 * - Filter events by time range, category, and status
 * - Toggle between List, Calendar, and Grid views
 * - Add Event button for creating new events (admin only)
 * - View event details
 * - Responsive layout
 *
 * Design Reference: Events Page Design section
 * Validates Requirements: 9.1, 9.2
 * Task: 12.1 Create Events page layout
 */
var Events = function Events() {
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_12__.useAuth)(),
    user = _useAuth.user;
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_13__.useToast)(),
    showToast = _useToast.showToast;
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useNavigate)();
  var isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'admin';
  // State management
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    events = _useState2[0],
    setEvents = _useState2[1];
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
    selectedEvent = _useState8[0],
    setSelectedEvent = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    isCompleteDialogOpen = _useState0[0],
    setIsCompleteDialogOpen = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState10 = _slicedToArray(_useState1, 2),
    eventToComplete = _useState10[0],
    setEventToComplete = _useState10[1];
  // Filter and view state
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('upcoming'),
    _useState12 = _slicedToArray(_useState11, 2),
    timeRangeFilter = _useState12[0],
    setTimeRangeFilter = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all'),
    _useState14 = _slicedToArray(_useState13, 2),
    categoryFilter = _useState14[0],
    setCategoryFilter = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all'),
    _useState16 = _slicedToArray(_useState15, 2),
    statusFilter = _useState16[0],
    setStatusFilter = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('grid'),
    _useState18 = _slicedToArray(_useState17, 2),
    viewMode = _useState18[0],
    setViewMode = _useState18[1];
  /**
   * Load events on mount
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    loadEvents();
  }, []);
  /**
   * Fetch events from API
   */
  var loadEvents = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setIsLoading(true);
            _context.n = 1;
            return _lib_eventApi__WEBPACK_IMPORTED_MODULE_19__.eventApi.getEvents();
          case 1:
            data = _context.v;
            setEvents(data);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            showToast('error', 'Failed to load events');
            console.error('Error loading events:', _t);
          case 3:
            _context.p = 3;
            setIsLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function loadEvents() {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Handle add event button click
   */
  var handleAddClick = function handleAddClick() {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };
  /**
   * Handle edit event button click
   */
  var handleEditClick = function handleEditClick(event) {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };
  /**
   * Handle view details button click
   */
  var handleViewDetails = function handleViewDetails(event) {
    navigate("/events/".concat(event.id));
  };
  /**
   * Handle form close
   */
  var handleFormClose = function handleFormClose() {
    setIsFormOpen(false);
    setSelectedEvent(null);
  };
  /**
   * Handle form submit
   */
  var handleFormSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(data) {
      var result, _result, _error$response, _error$response2, _error$response3, errorMessage, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            console.log('Events.tsx: Submitting event data:', data);
            if (!selectedEvent) {
              _context2.n = 2;
              break;
            }
            _context2.n = 1;
            return _lib_eventApi__WEBPACK_IMPORTED_MODULE_19__.eventApi.updateEvent(selectedEvent.id, data);
          case 1:
            result = _context2.v;
            console.log('Events.tsx: Event updated:', result);
            showToast('success', 'Event updated successfully');
            _context2.n = 4;
            break;
          case 2:
            _context2.n = 3;
            return _lib_eventApi__WEBPACK_IMPORTED_MODULE_19__.eventApi.createEvent(data);
          case 3:
            _result = _context2.v;
            console.log('Events.tsx: Event created successfully:', _result);
            showToast('success', 'Event created successfully');
          case 4:
            console.log('Events.tsx: Reloading events list...');
            _context2.n = 5;
            return loadEvents();
          case 5:
            console.log('Events.tsx: Events list reloaded');
            _context2.n = 7;
            break;
          case 6:
            _context2.p = 6;
            _t2 = _context2.v;
            console.error('Events.tsx: Error submitting event:', _t2);
            console.error('Events.tsx: Error response:', (_error$response = _t2.response) === null || _error$response === void 0 ? void 0 : _error$response.data);
            console.error('Events.tsx: Error status:', (_error$response2 = _t2.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status);
            errorMessage = ((_error$response3 = _t2.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || _t2.message || 'Unknown error';
            showToast('error', selectedEvent ? 'Failed to update event: ' + errorMessage : 'Failed to create event: ' + errorMessage);
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
   * Handle delete event button click
   */
  var handleDeleteClick = function handleDeleteClick(event) {
    // Handled by ArchiveButton component
  };
  /**
   * Handle archive success callback
   */
  var handleArchiveSuccess = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return loadEvents();
          case 1:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function handleArchiveSuccess() {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Handle mark as completed button click
   */
  var handleCompleteClick = function handleCompleteClick(event) {
    setEventToComplete(event);
    setIsCompleteDialogOpen(true);
  };
  /**
   * Handle complete confirmation
   */
  var handleCompleteConfirm = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(attendanceCount) {
      var _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (eventToComplete) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            _context4.p = 1;
            _context4.n = 2;
            return _lib_eventApi__WEBPACK_IMPORTED_MODULE_19__.eventApi.completeEvent(eventToComplete.id, attendanceCount);
          case 2:
            showToast('success', 'Event marked as completed');
            _context4.n = 3;
            return loadEvents();
          case 3:
            setIsCompleteDialogOpen(false);
            setEventToComplete(null);
            _context4.n = 5;
            break;
          case 4:
            _context4.p = 4;
            _t3 = _context4.v;
            showToast('error', 'Failed to mark event as completed');
            console.error('Error completing event:', _t3);
            throw _t3;
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 4]]);
    }));
    return function handleCompleteConfirm(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  /**
   * Separate events into upcoming and past, then apply filters
   */
  var now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
  // First, separate by time
  var filteredEvents = events;
  // Apply time range filter
  if (timeRangeFilter === 'upcoming') {
    filteredEvents = events.filter(function (event) {
      var eventDate = new Date(event.event_date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= now && event.status === 'upcoming';
    });
  } else if (timeRangeFilter === 'past') {
    filteredEvents = events.filter(function (event) {
      var eventDate = new Date(event.event_date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < now || event.status === 'completed';
    });
  }
  // Apply category filter (placeholder - categories not yet in data model)
  if (categoryFilter !== 'all') {
    // TODO: Filter by category when category field is added to Event model
    // filteredEvents = filteredEvents.filter(event => event.category === categoryFilter);
  }
  // Apply status filter
  if (statusFilter !== 'all') {
    filteredEvents = filteredEvents.filter(function (event) {
      return event.status === statusFilter;
    });
  }
  // Sort events
  var sortedEvents = _toConsumableArray(filteredEvents).sort(function (a, b) {
    var dateA = new Date(a.event_date).getTime();
    var dateB = new Date(b.event_date).getTime();
    return timeRangeFilter === 'past' ? dateB - dateA : dateA - dateB;
  });
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
   * Render event card
   */
  var renderEventCard = function renderEventCard(event) {
    var isPast = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
      className: "p-6 hover:shadow-lg transition-shadow ".concat(isPast ? 'opacity-75' : ''),
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-start justify-between mb-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex-1",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-lg font-semibold text-neutral-900 mb-1",
            children: event.title
          }), event.status === 'completed' && event.attendance_count !== null && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center gap-2 text-sm text-neutral-600",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
              className: "h-4 w-4"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
              children: [event.attendance_count, " attendees"]
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-2",
          children: [event.status === 'completed' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "bg-success-100 text-success-800 text-xs font-medium px-2.5 py-0.5 rounded",
            children: "Completed"
          }), event.status === 'cancelled' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "bg-error-100 text-error-800 text-xs font-medium px-2.5 py-0.5 rounded",
            children: "Cancelled"
          }), event.status === 'upcoming' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded",
            children: "Upcoming"
          })]
        })]
      }), event.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-sm text-neutral-600 mb-4 line-clamp-2",
        children: event.description
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-2 text-sm mb-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center text-neutral-600",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "h-4 w-4 mr-2 flex-shrink-0"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: formatDate(event.event_date)
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center text-neutral-600",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
            className: "h-4 w-4 mr-2 flex-shrink-0"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: formatTime(event.event_time)
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center text-neutral-600",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
            className: "h-4 w-4 mr-2 flex-shrink-0"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: event.location
          })]
        })]
      }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2 pt-4 border-t border-neutral-200",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return handleViewDetails(event);
          },
          className: "flex-1",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
            className: "h-4 w-4 mr-1"
          }), "View"]
        }), event.status === 'upcoming' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return handleCompleteClick(event);
          },
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "h-4 w-4 mr-1"
          }), "Complete"]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return handleEditClick(event);
          },
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
            className: "h-4 w-4 mr-1"
          }), "Edit"]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_archive_ArchiveButton__WEBPACK_IMPORTED_MODULE_22__["default"], {
          itemType: "events",
          itemId: event.id,
          itemName: event.title,
          onArchiveSuccess: handleArchiveSuccess,
          variant: "outline",
          size: "sm",
          iconOnly: false
        })]
      })]
    }, event.id);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_events_EventForm__WEBPACK_IMPORTED_MODULE_20__["default"], {
      isOpen: isFormOpen,
      onClose: handleFormClose,
      onSubmit: handleFormSubmit,
      event: selectedEvent,
      isLoading: isLoading
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_events_CompleteEventDialog__WEBPACK_IMPORTED_MODULE_21__["default"], {
      isOpen: isCompleteDialogOpen,
      onClose: function onClose() {
        setIsCompleteDialogOpen(false);
        setEventToComplete(null);
      },
      onConfirm: handleCompleteConfirm,
      eventTitle: (eventToComplete === null || eventToComplete === void 0 ? void 0 : eventToComplete.title) || ''
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
          className: "text-3xl font-bold text-neutral-900",
          children: "Events"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-base text-neutral-600 mt-2",
          children: "Manage church events and activities"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
          onClick: function onClick() {
            return setViewMode('calendar');
          },
          variant: "outline",
          className: "flex items-center gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "h-4 w-4"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "hidden sm:inline",
            children: "Calendar View"
          })]
        }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
          onClick: handleAddClick,
          className: "flex items-center gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
            className: "h-4 w-4"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "hidden sm:inline",
            children: "Create Event"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "sm:hidden",
            children: "Create"
          })]
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
      className: "p-6",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_17__.Select, {
            value: timeRangeFilter,
            onChange: function onChange(value) {
              return setTimeRangeFilter(value);
            },
            options: [{
              value: 'upcoming',
              label: 'Upcoming'
            }, {
              value: 'past',
              label: 'Past'
            }, {
              value: 'all',
              label: 'All'
            }]
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_17__.Select, {
            value: categoryFilter,
            onChange: function onChange(value) {
              var _value$;
              return setCategoryFilter(Array.isArray(value) ? (_value$ = value[0]) !== null && _value$ !== void 0 ? _value$ : '' : value);
            },
            options: [{
              value: 'all',
              label: 'All Categories'
            }, {
              value: 'worship',
              label: 'Worship'
            }, {
              value: 'outreach',
              label: 'Outreach'
            }, {
              value: 'fellowship',
              label: 'Fellowship'
            }, {
              value: 'training',
              label: 'Training'
            }]
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_select__WEBPACK_IMPORTED_MODULE_17__.Select, {
            value: statusFilter,
            onChange: function onChange(value) {
              var _value$2;
              return setStatusFilter(Array.isArray(value) ? (_value$2 = value[0]) !== null && _value$2 !== void 0 ? _value$2 : '' : value);
            },
            options: [{
              value: 'all',
              label: 'All Status'
            }, {
              value: 'upcoming',
              label: 'Upcoming'
            }, {
              value: 'completed',
              label: 'Completed'
            }, {
              value: 'cancelled',
              label: 'Cancelled'
            }]
          })
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex items-center justify-between",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2 bg-neutral-100 p-1 rounded-lg",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
          onClick: function onClick() {
            return setViewMode('list');
          },
          className: "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ".concat(viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm font-medium' : 'text-neutral-600 hover:text-neutral-900'),
          title: "List View",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
            className: "h-4 w-4"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-sm hidden sm:inline",
            children: "List"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
          onClick: function onClick() {
            return setViewMode('calendar');
          },
          className: "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ".concat(viewMode === 'calendar' ? 'bg-white text-primary-600 shadow-sm font-medium' : 'text-neutral-600 hover:text-neutral-900'),
          title: "Calendar View",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "h-4 w-4"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-sm hidden sm:inline",
            children: "Calendar"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
          onClick: function onClick() {
            return setViewMode('grid');
          },
          className: "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ".concat(viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm font-medium' : 'text-neutral-600 hover:text-neutral-900'),
          title: "Grid View",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
            className: "h-4 w-4"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-sm hidden sm:inline",
            children: "Grid"
          })]
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "text-sm text-neutral-600",
        children: [sortedEvents.length, " ", sortedEvents.length === 1 ? 'event' : 'events']
      })]
    }), isLoading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      children: Array.from({
        length: 6
      }).map(function (_, index) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_skeleton__WEBPACK_IMPORTED_MODULE_18__.SkeletonCard, {
          hasImage: false
        }, index);
      })
    }), !isLoading && sortedEvents.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_16__.Card, {
      className: "text-center py-16",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
        className: "h-16 w-16 text-neutral-400 mx-auto mb-4"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
        className: "text-lg font-semibold text-neutral-900 mb-2",
        children: "No Events Found"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-600 mb-6",
        children: isAdmin ? 'Get started by creating your first event.' : 'Check back later for upcoming events.'
      }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_15__.Button, {
        onClick: handleAddClick,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
          className: "h-4 w-4 mr-2"
        }), "Create Event"]
      })]
    }), !isLoading && sortedEvents.length > 0 && viewMode === 'grid' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      children: sortedEvents.map(function (event) {
        var eventDate = new Date(event.event_date);
        eventDate.setHours(0, 0, 0, 0);
        var isPast = eventDate < now || event.status === 'completed';
        return renderEventCard(event, isPast);
      })
    }), !isLoading && sortedEvents.length > 0 && viewMode === 'list' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "space-y-4",
      children: sortedEvents.map(function (event) {
        var eventDate = new Date(event.event_date);
        eventDate.setHours(0, 0, 0, 0);
        var isPast = eventDate < now || event.status === 'completed';
        return renderEventCard(event, isPast);
      })
    }), !isLoading && viewMode === 'calendar' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_events_CalendarView__WEBPACK_IMPORTED_MODULE_23__["default"], {
      events: events,
      onDayClick: function onDayClick(date, dayEvents) {
        // Show events for the selected day
        console.log('Day clicked:', date, 'Events:', dayEvents);
        // TODO: Could open a modal or filter to show only these events
      },
      onEventClick: function onEventClick(event) {
        // Handle event click - could open event details or edit
        if (isAdmin) {
          handleEditClick(event);
        }
      }
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Events);

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

/***/ "./node_modules/lucide-react/dist/esm/icons/chevron-left.js"
/*!******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevron-left.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChevronLeft)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chevron-left", __iconNode);


//# sourceMappingURL=chevron-left.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/chevron-right.js"
/*!*******************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/chevron-right.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ ChevronRight)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("chevron-right", __iconNode);


//# sourceMappingURL=chevron-right.js.map


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

/***/ "./node_modules/lucide-react/dist/esm/icons/layout-grid.js"
/*!*****************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/layout-grid.js ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ LayoutGrid)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("layout-grid", __iconNode);


//# sourceMappingURL=layout-grid.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/list.js"
/*!**********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/list.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ List)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["path", { d: "M3 5h.01", key: "18ugdj" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 19h.01", key: "noohij" }],
  ["path", { d: "M8 5h13", key: "1pao27" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 19h13", key: "m83p4d" }]
];
const List = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("list", __iconNode);


//# sourceMappingURL=list.js.map


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0V2ZW50c190c3guanM/aWQ9MTFlNjBjMTBhYTQ0YzU5NyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwrQkFBK0Isb0JBQW9CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEM7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxNQUFNO0FBQ2xCO0FBQ087QUFDUCxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FB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ZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9hcmlhLWhpZGRlbi9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9hcmNoaXZlL0FyY2hpdmVCdXR0b24udHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2V2ZW50cy9DYWxlbmRhclZpZXcudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2V2ZW50cy9Db21wbGV0ZUV2ZW50RGlhbG9nLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9ldmVudHMvRXZlbnRGb3JtLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9kaWFsb2cudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3VpL2lucHV0LnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9zZWxlY3QudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3VpL3NrZWxldG9uLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvbGliL2V2ZW50QXBpLnRzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9wYWdlcy9FdmVudHMudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9nZXQtbm9uY2UvZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9hcmNoaXZlLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvY2hlY2suanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9jaGV2cm9uLWxlZnQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9jaGV2cm9uLXJpZ2h0LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvY2xvY2suanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9leWUuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9sYXlvdXQtZ3JpZC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2xpc3QuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9tYXAtcGluLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvcGx1cy5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3NxdWFyZS1wZW4uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy91cGxvYWQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvQ29tYmluYXRpb24uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvU2lkZUVmZmVjdC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9VSS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9hZ2dyZXNpdmVDYXB0dXJlLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L2hhbmRsZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9tZWRpdW0uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvc2lkZWNhci5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L2hvb2suanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtc3R5bGUtc2luZ2xldG9uL2Rpc3QvZXMyMDE1L3NpbmdsZXRvbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzMjAxNS9hc3NpZ25SZWYuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlTWVyZ2VSZWYuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvdXNlUmVmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2Utc2lkZWNhci9kaXN0L2VzMjAxNS9leHBvcnRzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2Utc2lkZWNhci9kaXN0L2VzMjAxNS9tZWRpdW0uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9wcmltaXRpdmUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1jb250ZXh0L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZGlhbG9nL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZGlhbG9nL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3Qtc2xvdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWRpc21pc3NhYmxlLWxheWVyL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZm9jdXMtZ3VhcmRzL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtZm9jdXMtc2NvcGUvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1pZC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXBvcnRhbC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXByZXNlbmNlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3Qtc2xvdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWYvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtY29udHJvbGxhYmxlLXN0YXRlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWVmZmVjdC1ldmVudC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1lc2NhcGUta2V5ZG93bi9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0L2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBnZXREZWZhdWx0UGFyZW50ID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzYW1wbGVUYXJnZXQgPSBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0WzBdIDogb3JpZ2luYWxUYXJnZXQ7XG4gICAgcmV0dXJuIHNhbXBsZVRhcmdldC5vd25lckRvY3VtZW50LmJvZHk7XG59O1xudmFyIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xudmFyIHVuY29udHJvbGxlZE5vZGVzID0gbmV3IFdlYWtNYXAoKTtcbnZhciBtYXJrZXJNYXAgPSB7fTtcbnZhciBsb2NrQ291bnQgPSAwO1xudmFyIHVud3JhcEhvc3QgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBub2RlICYmIChub2RlLmhvc3QgfHwgdW53cmFwSG9zdChub2RlLnBhcmVudE5vZGUpKTtcbn07XG52YXIgY29ycmVjdFRhcmdldHMgPSBmdW5jdGlvbiAocGFyZW50LCB0YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRhcmdldHNcbiAgICAgICAgLm1hcChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChwYXJlbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29ycmVjdGVkVGFyZ2V0ID0gdW53cmFwSG9zdCh0YXJnZXQpO1xuICAgICAgICBpZiAoY29ycmVjdGVkVGFyZ2V0ICYmIHBhcmVudC5jb250YWlucyhjb3JyZWN0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29ycmVjdGVkVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FyaWEtaGlkZGVuJywgdGFyZ2V0LCAnaW4gbm90IGNvbnRhaW5lZCBpbnNpZGUnLCBwYXJlbnQsICcuIERvaW5nIG5vdGhpbmcnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4gQm9vbGVhbih4KTsgfSk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBhcmlhLWhpZGRlblxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NvbnRyb2xBdHRyaWJ1dGVdIC0gaHRtbCBBdHRyaWJ1dGUgdG8gY29udHJvbFxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbnZhciBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lLCBjb250cm9sQXR0cmlidXRlKSB7XG4gICAgdmFyIHRhcmdldHMgPSBjb3JyZWN0VGFyZ2V0cyhwYXJlbnROb2RlLCBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgaWYgKCFtYXJrZXJNYXBbbWFya2VyTmFtZV0pIHtcbiAgICAgICAgbWFya2VyTWFwW21hcmtlck5hbWVdID0gbmV3IFdlYWtNYXAoKTtcbiAgICB9XG4gICAgdmFyIG1hcmtlckNvdW50ZXIgPSBtYXJrZXJNYXBbbWFya2VyTmFtZV07XG4gICAgdmFyIGhpZGRlbk5vZGVzID0gW107XG4gICAgdmFyIGVsZW1lbnRzVG9LZWVwID0gbmV3IFNldCgpO1xuICAgIHZhciBlbGVtZW50c1RvU3RvcCA9IG5ldyBTZXQodGFyZ2V0cyk7XG4gICAgdmFyIGtlZXAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKCFlbCB8fCBlbGVtZW50c1RvS2VlcC5oYXMoZWwpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudHNUb0tlZXAuYWRkKGVsKTtcbiAgICAgICAga2VlcChlbC5wYXJlbnROb2RlKTtcbiAgICB9O1xuICAgIHRhcmdldHMuZm9yRWFjaChrZWVwKTtcbiAgICB2YXIgZGVlcCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKCFwYXJlbnQgfHwgZWxlbWVudHNUb1N0b3AuaGFzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHBhcmVudC5jaGlsZHJlbiwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50c1RvS2VlcC5oYXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBkZWVwKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBub2RlLmdldEF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFscmVhZHlIaWRkZW4gPSBhdHRyICE9PSBudWxsICYmIGF0dHIgIT09ICdmYWxzZSc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3VudGVyVmFsdWUgPSAoY291bnRlck1hcC5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya2VyVmFsdWUgPSAobWFya2VyQ291bnRlci5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyTWFwLnNldChub2RlLCBjb3VudGVyVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbk5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyVmFsdWUgPT09IDEgJiYgYWxyZWFkeUhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMuc2V0KG5vZGUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXJWYWx1ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobWFya2VyTmFtZSwgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignYXJpYS1oaWRkZW46IGNhbm5vdCBvcGVyYXRlIG9uICcsIG5vZGUsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBkZWVwKHBhcmVudE5vZGUpO1xuICAgIGVsZW1lbnRzVG9LZWVwLmNsZWFyKCk7XG4gICAgbG9ja0NvdW50Kys7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGlkZGVuTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIGNvdW50ZXJWYWx1ZSA9IGNvdW50ZXJNYXAuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIHZhciBtYXJrZXJWYWx1ZSA9IG1hcmtlckNvdW50ZXIuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAuc2V0KG5vZGUsIGNvdW50ZXJWYWx1ZSk7XG4gICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWNvdW50ZXJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdW5jb250cm9sbGVkTm9kZXMuaGFzKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1bmNvbnRyb2xsZWROb2Rlcy5kZWxldGUobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW1hcmtlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobWFya2VyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NrQ291bnQtLTtcbiAgICAgICAgaWYgKCFsb2NrQ291bnQpIHtcbiAgICAgICAgICAgIC8vIGNsZWFyXG4gICAgICAgICAgICBjb3VudGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgbWFya2VyTWFwID0ge307XG4gICAgICAgIH1cbiAgICB9O1xufTtcbi8qKlxuICogTWFya3MgZXZlcnl0aGluZyBleGNlcHQgZ2l2ZW4gbm9kZShvciBub2RlcykgYXMgYXJpYS1oaWRkZW5cbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgaGlkZU90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWFyaWEtaGlkZGVuJzsgfVxuICAgIHZhciB0YXJnZXRzID0gQXJyYXkuZnJvbShBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgdmFyIGFjdGl2ZVBhcmVudE5vZGUgPSBwYXJlbnROb2RlIHx8IGdldERlZmF1bHRQYXJlbnQob3JpZ2luYWxUYXJnZXQpO1xuICAgIGlmICghYWN0aXZlUGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfTtcbiAgICB9XG4gICAgLy8gd2Ugc2hvdWxkIG5vdCBoaWRlIGFyaWEtbGl2ZSBlbGVtZW50cyAtIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvYXJpYS1oaWRkZW4vaXNzdWVzLzEwXG4gICAgLy8gYW5kIHNjcmlwdCBlbGVtZW50cywgYXMgdGhleSBoYXZlIG5vIGltcGFjdCBvbiBhY2Nlc3NpYmlsaXR5LlxuICAgIHRhcmdldHMucHVzaC5hcHBseSh0YXJnZXRzLCBBcnJheS5mcm9tKGFjdGl2ZVBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtbGl2ZV0sIHNjcmlwdCcpKSk7XG4gICAgcmV0dXJuIGFwcGx5QXR0cmlidXRlVG9PdGhlcnModGFyZ2V0cywgYWN0aXZlUGFyZW50Tm9kZSwgbWFya2VyTmFtZSwgJ2FyaWEtaGlkZGVuJyk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBpbmVydFxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcmV0dXJuIHtVbmRvfSB1bmRvIGNvbW1hbmRcbiAqL1xuZXhwb3J0IHZhciBpbmVydE90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWluZXJ0LWVkJzsgfVxuICAgIHZhciBhY3RpdmVQYXJlbnROb2RlID0gcGFyZW50Tm9kZSB8fCBnZXREZWZhdWx0UGFyZW50KG9yaWdpbmFsVGFyZ2V0KTtcbiAgICBpZiAoIWFjdGl2ZVBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH07XG4gICAgfVxuICAgIHJldHVybiBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzKG9yaWdpbmFsVGFyZ2V0LCBhY3RpdmVQYXJlbnROb2RlLCBtYXJrZXJOYW1lLCAnaW5lcnQnKTtcbn07XG4vKipcbiAqIEByZXR1cm5zIGlmIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBpbmVydFxuICovXG5leHBvcnQgdmFyIHN1cHBvcnRzSW5lcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgSFRNTEVsZW1lbnQucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdpbmVydCcpO1xufTtcbi8qKlxuICogQXV0b21hdGljIGZ1bmN0aW9uIHRvIFwic3VwcHJlc3NcIiBET00gZWxlbWVudHMgLSBfaGlkZV8gb3IgX2luZXJ0XyBpbiB0aGUgYmVzdCBwb3NzaWJsZSB3YXlcbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgc3VwcHJlc3NPdGhlcnMgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpIHtcbiAgICBpZiAobWFya2VyTmFtZSA9PT0gdm9pZCAwKSB7IG1hcmtlck5hbWUgPSAnZGF0YS1zdXBwcmVzc2VkJzsgfVxuICAgIHJldHVybiAoc3VwcG9ydHNJbmVydCgpID8gaW5lcnRPdGhlcnMgOiBoaWRlT3RoZXJzKShvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSk7XG59O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMsIEZyYWdtZW50IGFzIF9GcmFnbWVudCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLy8gQHRzLW5vY2hlY2tcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXJjaGl2ZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi91aS9idXR0b24nO1xuaW1wb3J0IHsgRGlhbG9nLCBEaWFsb2dDb250ZW50LCBEaWFsb2dIZWFkZXIsIERpYWxvZ1RpdGxlLCBEaWFsb2dGb290ZXIsIH0gZnJvbSAnLi4vdWkvZGlhbG9nJztcbmltcG9ydCB7IHVzZVRvYXN0IH0gZnJvbSAnLi4vLi4vY29udGV4dHMvVG9hc3RDb250ZXh0JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vbGliL2FwaSc7XG4vKipcbiAqIEFyY2hpdmVCdXR0b24gQ29tcG9uZW50XG4gKlxuICogQSByZXVzYWJsZSBidXR0b24gY29tcG9uZW50IGZvciBhcmNoaXZpbmcgaXRlbXMgd2l0aCBjb25maXJtYXRpb24gZGlhbG9nLlxuICogUmVwbGFjZXMgZGVsZXRlIGJ1dHRvbnMgdGhyb3VnaG91dCB0aGUgYXBwbGljYXRpb24gd2l0aCBhcmNoaXZlIHRlcm1pbm9sb2d5LlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBBcmNoaXZlIGljb24gaW5zdGVhZCBvZiB0cmFzaCBpY29uXG4gKiAtIENvbmZpcm1hdGlvbiBkaWFsb2cgd2l0aCBcIkFyY2hpdmVcIiB0ZXJtaW5vbG9neVxuICogLSBDYWxscyBERUxFVEUgZW5kcG9pbnQgKHdoaWNoIHBlcmZvcm1zIHNvZnQgZGVsZXRlKVxuICogLSBTdWNjZXNzL2Vycm9yIHRvYXN0IG5vdGlmaWNhdGlvbnNcbiAqIC0gTG9hZGluZyBzdGF0ZSBkdXJpbmcgYXJjaGl2ZSBvcGVyYXRpb25cbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiAyLjEsIDIuMiwgMi4zLCAyLjVcbiAqL1xuY29uc3QgQXJjaGl2ZUJ1dHRvbiA9ICh7IGl0ZW1UeXBlLCBpdGVtSWQsIGl0ZW1OYW1lLCBvbkFyY2hpdmVTdWNjZXNzLCB2YXJpYW50ID0gJ291dGxpbmUnLCBzaXplID0gJ3NtJywgY2xhc3NOYW1lID0gJycsIGljb25Pbmx5ID0gZmFsc2UsIH0pID0+IHtcbiAgICBjb25zdCBbaXNEaWFsb2dPcGVuLCBzZXRJc0RpYWxvZ09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtpc0FyY2hpdmluZywgc2V0SXNBcmNoaXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHsgc2hvd1RvYXN0IH0gPSB1c2VUb2FzdCgpO1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhcmNoaXZlIGJ1dHRvbiBjbGljayAtIG9wZW5zIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVBcmNoaXZlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldElzRGlhbG9nT3Blbih0cnVlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhcmNoaXZlIGNvbmZpcm1hdGlvblxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUNvbmZpcm1BcmNoaXZlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRJc0FyY2hpdmluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIERFTEVURSBlbmRwb2ludCB3aGljaCBwZXJmb3JtcyBzb2Z0IGRlbGV0ZVxuICAgICAgICAgICAgYXdhaXQgYXBpLmRlbGV0ZShgLyR7aXRlbVR5cGV9LyR7aXRlbUlkfWApO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgYCR7Z2V0SXRlbVR5cGVOYW1lKGl0ZW1UeXBlKX0gYXJjaGl2ZWQgc3VjY2Vzc2Z1bGx5YCk7XG4gICAgICAgICAgICAvLyBDbG9zZSBkaWFsb2dcbiAgICAgICAgICAgIHNldElzRGlhbG9nT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAvLyBDYWxsIHN1Y2Nlc3MgY2FsbGJhY2sgaWYgcHJvdmlkZWRcbiAgICAgICAgICAgIGlmIChvbkFyY2hpdmVTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgb25BcmNoaXZlU3VjY2VzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgYEZhaWxlZCB0byBhcmNoaXZlICR7Z2V0SXRlbVR5cGVOYW1lKGl0ZW1UeXBlKS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzQXJjaGl2aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGRpYWxvZyBjbG9zZVxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUNsb3NlRGlhbG9nID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWlzQXJjaGl2aW5nKSB7XG4gICAgICAgICAgICBzZXRJc0RpYWxvZ09wZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgaHVtYW4tcmVhZGFibGUgaXRlbSB0eXBlIG5hbWVcbiAgICAgKi9cbiAgICBjb25zdCBnZXRJdGVtVHlwZU5hbWUgPSAodHlwZSkgPT4ge1xuICAgICAgICBjb25zdCB0eXBlTWFwID0ge1xuICAgICAgICAgICAgJ21lbWJlcnMnOiAnTWVtYmVyJyxcbiAgICAgICAgICAgICdldmVudHMnOiAnRXZlbnQnLFxuICAgICAgICAgICAgJ2xlYWRlcnNoaXAnOiAnTGVhZGVyc2hpcCcsXG4gICAgICAgICAgICAnc21hbGwtZ3JvdXBzJzogJ1NtYWxsIEdyb3VwJyxcbiAgICAgICAgICAgICdvZmZlcmluZ3MnOiAnT2ZmZXJpbmcnLFxuICAgICAgICAgICAgJ2V4cGVuc2VzJzogJ0V4cGVuc2UnLFxuICAgICAgICAgICAgJ2J1ZGdldHMnOiAnQnVkZ2V0JyxcbiAgICAgICAgICAgICdwbGVkZ2VzJzogJ1BsZWRnZScsXG4gICAgICAgICAgICAnZnVuZHMnOiAnRnVuZCcsXG4gICAgICAgICAgICAndmVuZG9ycyc6ICdWZW5kb3InLFxuICAgICAgICAgICAgJ2V4cGVuc2UtY2F0ZWdvcmllcyc6ICdFeHBlbnNlIENhdGVnb3J5JyxcbiAgICAgICAgICAgICdvZmZlcmluZy10eXBlcyc6ICdPZmZlcmluZyBUeXBlJyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHR5cGVNYXBbdHlwZV0gfHwgJ0l0ZW0nO1xuICAgIH07XG4gICAgcmV0dXJuIChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4cyhCdXR0b24sIHsgdmFyaWFudDogdmFyaWFudCwgc2l6ZTogc2l6ZSwgb25DbGljazogaGFuZGxlQXJjaGl2ZUNsaWNrLCBjbGFzc05hbWU6IGNsYXNzTmFtZSwgdGl0bGU6IFwiQXJjaGl2ZVwiLCBjaGlsZHJlbjogW19qc3goQXJjaGl2ZSwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCAhaWNvbk9ubHkgJiYgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwibWwtMlwiLCBjaGlsZHJlbjogXCJBcmNoaXZlXCIgfSldIH0pLCBfanN4KERpYWxvZywgeyBvcGVuOiBpc0RpYWxvZ09wZW4sIG9uT3BlbkNoYW5nZTogaGFuZGxlQ2xvc2VEaWFsb2csIGNoaWxkcmVuOiBfanN4cyhEaWFsb2dDb250ZW50LCB7IGNsYXNzTmFtZTogXCJtYXgtdy1tZFwiLCBjaGlsZHJlbjogW19qc3goRGlhbG9nSGVhZGVyLCB7IGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTEwIGgtMTAgcm91bmRlZC1mdWxsIGJnLW9yYW5nZS0xMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgY2hpbGRyZW46IF9qc3goQXJjaGl2ZSwgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LW9yYW5nZS02MDBcIiB9KSB9KSwgX2pzeHMoRGlhbG9nVGl0bGUsIHsgY2hpbGRyZW46IFtcIkFyY2hpdmUgXCIsIGdldEl0ZW1UeXBlTmFtZShpdGVtVHlwZSldIH0pXSB9KSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweS00XCIsIGNoaWxkcmVuOiBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNzAwXCIsIGNoaWxkcmVuOiBbXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gYXJjaGl2ZVwiLCAnICcsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtc2VtaWJvbGRcIiwgY2hpbGRyZW46IGl0ZW1OYW1lIH0pLCBcIj8gVGhpcyBpdGVtIHdpbGwgYmUgbW92ZWQgdG8gdGhlIGFyY2hpdmUgYW5kIGNhbiBiZSByZXN0b3JlZCBsYXRlciBieSBhbiBhZG1pbmlzdHJhdG9yLlwiXSB9KSB9KSwgX2pzeHMoRGlhbG9nRm9vdGVyLCB7IGNoaWxkcmVuOiBbX2pzeChCdXR0b24sIHsgdHlwZTogXCJidXR0b25cIiwgdmFyaWFudDogXCJvdXRsaW5lXCIsIG9uQ2xpY2s6IGhhbmRsZUNsb3NlRGlhbG9nLCBkaXNhYmxlZDogaXNBcmNoaXZpbmcsIGNoaWxkcmVuOiBcIkNhbmNlbFwiIH0pLCBfanN4KEJ1dHRvbiwgeyB0eXBlOiBcImJ1dHRvblwiLCB2YXJpYW50OiBcImRlZmF1bHRcIiwgb25DbGljazogaGFuZGxlQ29uZmlybUFyY2hpdmUsIGRpc2FibGVkOiBpc0FyY2hpdmluZywgY2xhc3NOYW1lOiBcImJnLW9yYW5nZS02MDAgaG92ZXI6Ymctb3JhbmdlLTcwMFwiLCBjaGlsZHJlbjogaXNBcmNoaXZpbmcgPyAnQXJjaGl2aW5nLi4uJyA6IGBBcmNoaXZlICR7Z2V0SXRlbVR5cGVOYW1lKGl0ZW1UeXBlKX1gIH0pXSB9KV0gfSkgfSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBBcmNoaXZlQnV0dG9uO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2hldnJvbkxlZnQsIENoZXZyb25SaWdodCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi91aS9idXR0b24nO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uL3VpL2NhcmQnO1xuaW1wb3J0IHsgY24gfSBmcm9tICcuLi8uLi9saWIvdXRpbHMnO1xuLyoqXG4gKiBDYXRlZ29yeSBjb2xvcnMgZm9yIGV2ZW50IGRvdHNcbiAqL1xuY29uc3QgY2F0ZWdvcnlDb2xvcnMgPSB7XG4gICAgd29yc2hpcDogJ2JnLXByaW1hcnktNTAwJyxcbiAgICBvdXRyZWFjaDogJ2JnLXN1Y2Nlc3MtNTAwJyxcbiAgICBmZWxsb3dzaGlwOiAnYmctd2FybmluZy01MDAnLFxuICAgIHRyYWluaW5nOiAnYmctaW5mby01MDAnLFxuICAgIGRlZmF1bHQ6ICdiZy1uZXV0cmFsLTUwMCcsXG59O1xuLyoqXG4gKiBHZXQgY2F0ZWdvcnkgY29sb3IgY2xhc3NcbiAqL1xuY29uc3QgZ2V0Q2F0ZWdvcnlDb2xvciA9IChjYXRlZ29yeSkgPT4ge1xuICAgIGlmICghY2F0ZWdvcnkpXG4gICAgICAgIHJldHVybiBjYXRlZ29yeUNvbG9ycy5kZWZhdWx0O1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRDYXRlZ29yeSA9IGNhdGVnb3J5LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIGNhdGVnb3J5Q29sb3JzW25vcm1hbGl6ZWRDYXRlZ29yeV0gfHwgY2F0ZWdvcnlDb2xvcnMuZGVmYXVsdDtcbn07XG4vKipcbiAqIENhbGVuZGFyVmlldyBDb21wb25lbnRcbiAqXG4gKiBEaXNwbGF5cyBldmVudHMgaW4gYSBtb250aGx5IGNhbGVuZGFyIGdyaWQgdmlldyB3aXRoIHRoZSBmb2xsb3dpbmcgZmVhdHVyZXM6XG4gKiAtIE1vbnRobHkgZ3JpZCB2aWV3IHdpdGggZGF5IGNlbGxzXG4gKiAtIEV2ZW50IGluZGljYXRvcnMgKGRvdHMgb3IgbWluaS1jYXJkcykgb24gZGF5cyB3aXRoIGV2ZW50c1xuICogLSBDb2xvci1jb2RlZCBldmVudHMgYnkgY2F0ZWdvcnkgKFdvcnNoaXA6IGJsdWUsIE91dHJlYWNoOiBncmVlbiwgRmVsbG93c2hpcDogeWVsbG93LCBUcmFpbmluZzogaW5mbylcbiAqIC0gTmF2aWdhdGlvbiBidXR0b25zIHRvIG1vdmUgYmV0d2VlbiBtb250aHMgKFByZXZpb3VzIE1vbnRoLCBUb2RheSwgTmV4dCBNb250aClcbiAqIC0gXCIrWCBtb3JlXCIgaW5kaWNhdG9yIHdoZW4gYSBkYXkgaGFzIG1vcmUgdGhhbiAzIGV2ZW50c1xuICogLSBDbGlja2FibGUgZGF5IGNlbGxzIHRvIHZpZXcgYWxsIGV2ZW50cyBmb3IgdGhhdCBkYXlcbiAqIC0gUmVzcG9uc2l2ZSBkZXNpZ24gZm9yIG1vYmlsZSBkZXZpY2VzXG4gKlxuICogRGVzaWduIFJlZmVyZW5jZTogQ2FsZW5kYXIgVmlldyBzZWN0aW9uXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiAxMi4zXG4gKiBUYXNrOiAxMi4zIEltcGxlbWVudCBjYWxlbmRhciB2aWV3XG4gKi9cbmV4cG9ydCBjb25zdCBDYWxlbmRhclZpZXcgPSAoeyBldmVudHMsIG9uRGF5Q2xpY2ssIG9uRXZlbnRDbGljaywgfSkgPT4ge1xuICAgIGNvbnN0IFtjdXJyZW50RGF0ZSwgc2V0Q3VycmVudERhdGVdID0gdXNlU3RhdGUobmV3IERhdGUoKSk7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoXG4gICAgICovXG4gICAgY29uc3QgZ2V0Rmlyc3REYXlPZk1vbnRoID0gKGRhdGUpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCAxKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbGFzdCBkYXkgb2YgdGhlIG1vbnRoXG4gICAgICovXG4gICAgY29uc3QgZ2V0TGFzdERheU9mTW9udGggPSAoZGF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAxLCAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIG1vbnRoXG4gICAgICovXG4gICAgY29uc3QgZ2V0RGF5c0luTW9udGggPSAoZGF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gZ2V0TGFzdERheU9mTW9udGgoZGF0ZSkuZ2V0RGF0ZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkYXkgb2Ygd2VlayBmb3IgdGhlIGZpcnN0IGRheSBvZiB0aGUgbW9udGggKDAgPSBTdW5kYXkpXG4gICAgICovXG4gICAgY29uc3QgZ2V0Rmlyc3REYXlPZldlZWsgPSAoZGF0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gZ2V0Rmlyc3REYXlPZk1vbnRoKGRhdGUpLmdldERheSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogTmF2aWdhdGUgdG8gcHJldmlvdXMgbW9udGhcbiAgICAgKi9cbiAgICBjb25zdCBnb1RvUHJldmlvdXNNb250aCA9ICgpID0+IHtcbiAgICAgICAgc2V0Q3VycmVudERhdGUobmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKSAtIDEsIDEpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE5hdmlnYXRlIHRvIG5leHQgbW9udGhcbiAgICAgKi9cbiAgICBjb25zdCBnb1RvTmV4dE1vbnRoID0gKCkgPT4ge1xuICAgICAgICBzZXRDdXJyZW50RGF0ZShuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMSwgMSkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogTmF2aWdhdGUgdG8gdG9kYXlcbiAgICAgKi9cbiAgICBjb25zdCBnb1RvVG9kYXkgPSAoKSA9PiB7XG4gICAgICAgIHNldEN1cnJlbnREYXRlKG5ldyBEYXRlKCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSBkYXRlIGlzIHRvZGF5XG4gICAgICovXG4gICAgY29uc3QgaXNUb2RheSA9IChkYXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgcmV0dXJuIChkYXRlLmdldERhdGUoKSA9PT0gdG9kYXkuZ2V0RGF0ZSgpICYmXG4gICAgICAgICAgICBkYXRlLmdldE1vbnRoKCkgPT09IHRvZGF5LmdldE1vbnRoKCkgJiZcbiAgICAgICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSA9PT0gdG9kYXkuZ2V0RnVsbFllYXIoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhIGRhdGUgaXMgaW4gdGhlIGN1cnJlbnQgbW9udGhcbiAgICAgKi9cbiAgICBjb25zdCBpc0N1cnJlbnRNb250aCA9IChkYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiAoZGF0ZS5nZXRNb250aCgpID09PSBjdXJyZW50RGF0ZS5nZXRNb250aCgpICYmXG4gICAgICAgICAgICBkYXRlLmdldEZ1bGxZZWFyKCkgPT09IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGV2ZW50cyBmb3IgYSBzcGVjaWZpYyBkYXRlXG4gICAgICovXG4gICAgY29uc3QgZ2V0RXZlbnRzRm9yRGF0ZSA9IChkYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiBldmVudHMuZmlsdGVyKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50RGF0ZSA9IG5ldyBEYXRlKGV2ZW50LmV2ZW50X2RhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIChldmVudERhdGUuZ2V0RGF0ZSgpID09PSBkYXRlLmdldERhdGUoKSAmJlxuICAgICAgICAgICAgICAgIGV2ZW50RGF0ZS5nZXRNb250aCgpID09PSBkYXRlLmdldE1vbnRoKCkgJiZcbiAgICAgICAgICAgICAgICBldmVudERhdGUuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSBjYWxlbmRhciBkYXlzXG4gICAgICovXG4gICAgY29uc3QgY2FsZW5kYXJEYXlzID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRheXMgPSBbXTtcbiAgICAgICAgY29uc3QgZmlyc3REYXkgPSBnZXRGaXJzdERheU9mV2VlayhjdXJyZW50RGF0ZSk7XG4gICAgICAgIGNvbnN0IGRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGgoY3VycmVudERhdGUpO1xuICAgICAgICAvLyBBZGQgZW1wdHkgY2VsbHMgZm9yIGRheXMgYmVmb3JlIHRoZSBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyc3REYXk7IGkrKykge1xuICAgICAgICAgICAgZGF5cy5wdXNoKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBhbGwgZGF5cyBvZiB0aGUgbW9udGhcbiAgICAgICAgZm9yIChsZXQgZGF5ID0gMTsgZGF5IDw9IGRheXNJbk1vbnRoOyBkYXkrKykge1xuICAgICAgICAgICAgZGF5cy5wdXNoKG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGRheSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXlzO1xuICAgIH0sIFtjdXJyZW50RGF0ZV0pO1xuICAgIC8qKlxuICAgICAqIEZvcm1hdCBtb250aCBhbmQgeWVhciBmb3IgZGlzcGxheVxuICAgICAqL1xuICAgIGNvbnN0IGZvcm1hdE1vbnRoWWVhciA9IChkYXRlKSA9PiB7XG4gICAgICAgIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7IG1vbnRoOiAnbG9uZycsIHllYXI6ICdudW1lcmljJyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERheSBuYW1lc1xuICAgICAqL1xuICAgIGNvbnN0IGRheU5hbWVzID0gWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZGF5IGNsaWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlRGF5Q2xpY2sgPSAoZGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBkYXlFdmVudHMgPSBnZXRFdmVudHNGb3JEYXRlKGRhdGUpO1xuICAgICAgICBpZiAob25EYXlDbGljaykge1xuICAgICAgICAgICAgb25EYXlDbGljayhkYXRlLCBkYXlFdmVudHMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZXZlbnQgY2xpY2tcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVFdmVudENsaWNrID0gKGV2ZW50LCBlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChvbkV2ZW50Q2xpY2spIHtcbiAgICAgICAgICAgIG9uRXZlbnRDbGljayhldmVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAoX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IFwicC02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTZcIiwgY2hpbGRyZW46IFtfanN4KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IGZvcm1hdE1vbnRoWWVhcihjdXJyZW50RGF0ZSkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChCdXR0b24sIHsgdmFyaWFudDogXCJvdXRsaW5lXCIsIHNpemU6IFwic21cIiwgb25DbGljazogZ29Ub1ByZXZpb3VzTW9udGgsIFwiYXJpYS1sYWJlbFwiOiBcIlByZXZpb3VzIE1vbnRoXCIsIGNoaWxkcmVuOiBfanN4KENoZXZyb25MZWZ0LCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSkgfSksIF9qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6IGdvVG9Ub2RheSwgY2hpbGRyZW46IFwiVG9kYXlcIiB9KSwgX2pzeChCdXR0b24sIHsgdmFyaWFudDogXCJvdXRsaW5lXCIsIHNpemU6IFwic21cIiwgb25DbGljazogZ29Ub05leHRNb250aCwgXCJhcmlhLWxhYmVsXCI6IFwiTmV4dCBNb250aFwiLCBjaGlsZHJlbjogX2pzeChDaGV2cm9uUmlnaHQsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSB9KV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy03IGdhcC1weCBiZy1uZXV0cmFsLTIwMCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuXCIsIGNoaWxkcmVuOiBbZGF5TmFtZXMubWFwKGRheSA9PiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctbmV1dHJhbC01MCBweC0yIHB5LTMgdGV4dC1jZW50ZXIgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJoaWRkZW4gc206aW5saW5lXCIsIGNoaWxkcmVuOiBkYXkgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInNtOmhpZGRlblwiLCBjaGlsZHJlbjogZGF5LmNoYXJBdCgwKSB9KV0gfSwgZGF5KSkpLCBjYWxlbmRhckRheXMubWFwKChkYXRlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW1wdHkgY2VsbCBmb3IgZGF5cyBiZWZvcmUgdGhlIGZpcnN0IGRheSBvZiB0aGUgbW9udGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctbmV1dHJhbC01MCBtaW4taC0yNCBzbTptaW4taC0zMlwiIH0sIGBlbXB0eS0ke2luZGV4fWApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRheUV2ZW50cyA9IGdldEV2ZW50c0ZvckRhdGUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmxlRXZlbnRzID0gZGF5RXZlbnRzLnNsaWNlKDAsIDMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9yZUNvdW50ID0gZGF5RXZlbnRzLmxlbmd0aCAtIHZpc2libGVFdmVudHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBpc1RvZGF5KGRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IG9uQ2xpY2s6ICgpID0+IGhhbmRsZURheUNsaWNrKGRhdGUpLCBjbGFzc05hbWU6IGNuKCdiZy13aGl0ZSBtaW4taC0yNCBzbTptaW4taC0zMiBwLTIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnMgaG92ZXI6YmctcHJpbWFyeS01MCcsIHRvZGF5ICYmICdiZy1wcmltYXJ5LTUwJyksIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi0yXCIsIGNoaWxkcmVuOiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogY24oJ2ZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHctNyBoLTcgdGV4dC1zbSBmb250LW1lZGl1bSByb3VuZGVkLWZ1bGwnLCB0b2RheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wcmltYXJ5LTYwMCB0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LW5ldXRyYWwtOTAwJyksIGNoaWxkcmVuOiBkYXRlLmdldERhdGUoKSB9KSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS0xXCIsIGNoaWxkcmVuOiBbdmlzaWJsZUV2ZW50cy5tYXAoZXZlbnQgPT4gKF9qc3hzKFwiZGl2XCIsIHsgb25DbGljazogKGUpID0+IGhhbmRsZUV2ZW50Q2xpY2soZXZlbnQsIGUpLCBjbGFzc05hbWU6IGNuKCdmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTIgcHktMSByb3VuZGVkIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC13aGl0ZSB0cnVuY2F0ZSBob3ZlcjpvcGFjaXR5LTgwIHRyYW5zaXRpb24tb3BhY2l0eScsIGdldENhdGVnb3J5Q29sb3IoZXZlbnQuY2F0ZWdvcnkpKSwgdGl0bGU6IGV2ZW50LnRpdGxlLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLXdoaXRlIGZsZXgtc2hyaW5rLTBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidHJ1bmNhdGUgaGlkZGVuIHNtOmlubGluZVwiLCBjaGlsZHJlbjogZXZlbnQudGl0bGUgfSldIH0sIGV2ZW50LmlkKSkpLCBtb3JlQ291bnQgPiAwICYmIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweC0yIHB5LTEgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBbXCIrXCIsIG1vcmVDb3VudCwgXCIgbW9yZVwiXSB9KSldIH0pXSB9LCBkYXRlLnRvSVNPU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtdC02IGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtNCB0ZXh0LXNtXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTcwMFwiLCBjaGlsZHJlbjogXCJDYXRlZ29yaWVzOlwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctcHJpbWFyeS01MDBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJXb3JzaGlwXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctc3VjY2Vzcy01MDBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJPdXRyZWFjaFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLXdhcm5pbmctNTAwXCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiRmVsbG93c2hpcFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLWluZm8tNTAwXCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiVHJhaW5pbmdcIiB9KV0gfSldIH0pXSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgQ2FsZW5kYXJWaWV3O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nQ29udGVudCwgRGlhbG9nSGVhZGVyLCBEaWFsb2dUaXRsZSwgRGlhbG9nRm9vdGVyLCBEaWFsb2dEZXNjcmlwdGlvbiwgfSBmcm9tICcuLi91aS9kaWFsb2cnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vdWkvYnV0dG9uJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi4vdWkvaW5wdXQnO1xuaW1wb3J0IHsgQ2hlY2tDaXJjbGUgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuLyoqXG4gKiBDb21wbGV0ZUV2ZW50RGlhbG9nIENvbXBvbmVudFxuICpcbiAqIERpYWxvZyBmb3IgbWFya2luZyBhbiBldmVudCBhcyBjb21wbGV0ZWQgYW5kIHJlY29yZGluZyBhdHRlbmRhbmNlLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBJbnB1dCBmaWVsZCBmb3IgYXR0ZW5kYW5jZSBjb3VudFxuICogLSBWYWxpZGF0aW9uIGZvciBhdHRlbmRhbmNlIGNvdW50IChtdXN0IGJlID49IDApXG4gKiAtIENhbmNlbCBhbmQgQ29tcGxldGUgYnV0dG9uc1xuICpcbiAqIFZhbGlkYXRlcyBSZXF1aXJlbWVudHM6IDkuNFxuICovXG5jb25zdCBDb21wbGV0ZUV2ZW50RGlhbG9nID0gKHsgaXNPcGVuLCBvbkNsb3NlLCBvbkNvbmZpcm0sIGV2ZW50VGl0bGUsIH0pID0+IHtcbiAgICBjb25zdCBbYXR0ZW5kYW5jZUNvdW50LCBzZXRBdHRlbmRhbmNlQ291bnRdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtpc1N1Ym1pdHRpbmcsIHNldElzU3VibWl0dGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgLyoqXG4gICAgICogUmVzZXQgZm9ybSB3aGVuIGRpYWxvZyBvcGVucy9jbG9zZXNcbiAgICAgKi9cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICBzZXRBdHRlbmRhbmNlQ291bnQoJycpO1xuICAgICAgICAgICAgc2V0RXJyb3IoJycpO1xuICAgICAgICB9XG4gICAgfSwgW2lzT3Blbl0pO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGF0dGVuZGFuY2UgY291bnRcbiAgICAgKi9cbiAgICBjb25zdCB2YWxpZGF0ZUF0dGVuZGFuY2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQoYXR0ZW5kYW5jZUNvdW50LCAxMCk7XG4gICAgICAgIGlmIChhdHRlbmRhbmNlQ291bnQgPT09ICcnIHx8IGlzTmFOKGNvdW50KSkge1xuICAgICAgICAgICAgc2V0RXJyb3IoJ0F0dGVuZGFuY2UgY291bnQgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQgPCAwKSB7XG4gICAgICAgICAgICBzZXRFcnJvcignQXR0ZW5kYW5jZSBjb3VudCBtdXN0IGJlIDAgb3IgZ3JlYXRlcicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGZvcm0gc3VibWlzc2lvblxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZUF0dGVuZGFuY2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldElzU3VibWl0dGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IG9uQ29uZmlybShwYXJzZUludChhdHRlbmRhbmNlQ291bnQsIDEwKSk7XG4gICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBFcnJvciBpcyBoYW5kbGVkIGJ5IHBhcmVudCBjb21wb25lbnRcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzU3VibWl0dGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBpbnB1dCBjaGFuZ2VcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICBzZXRBdHRlbmRhbmNlQ291bnQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNldEVycm9yKCcnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChfanN4KERpYWxvZywgeyBvcGVuOiBpc09wZW4sIG9uT3BlbkNoYW5nZTogb25DbG9zZSwgY2hpbGRyZW46IF9qc3hzKERpYWxvZ0NvbnRlbnQsIHsgY2xhc3NOYW1lOiBcIm1heC13LW1kXCIsIGNoaWxkcmVuOiBbX2pzeHMoRGlhbG9nSGVhZGVyLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgbWItMlwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTEwIGgtMTAgcm91bmRlZC1mdWxsIGJnLWdyZWVuLTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLCBjaGlsZHJlbjogX2pzeChDaGVja0NpcmNsZSwgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LWdyZWVuLTYwMFwiIH0pIH0pLCBfanN4KERpYWxvZ1RpdGxlLCB7IGNoaWxkcmVuOiBcIk1hcmsgRXZlbnQgYXMgQ29tcGxldGVkXCIgfSldIH0pLCBfanN4cyhEaWFsb2dEZXNjcmlwdGlvbiwgeyBjaGlsZHJlbjogW1wiTWFyayBcXFwiXCIsIGV2ZW50VGl0bGUsIFwiXFxcIiBhcyBjb21wbGV0ZWQgYW5kIHJlY29yZCB0aGUgYXR0ZW5kYW5jZSBjb3VudC5cIl0gfSldIH0pLCBfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInB5LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJhdHRlbmRhbmNlXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMlwiLCBjaGlsZHJlbjogW1wiQXR0ZW5kYW5jZSBDb3VudCBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwiYXR0ZW5kYW5jZVwiLCBuYW1lOiBcImF0dGVuZGFuY2VcIiwgdHlwZTogXCJudW1iZXJcIiwgbWluOiBcIjBcIiwgcGxhY2Vob2xkZXI6IFwiZS5nLiwgMTUwXCIsIHZhbHVlOiBhdHRlbmRhbmNlQ291bnQsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3IgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGF1dG9Gb2N1czogdHJ1ZSB9KSwgZXJyb3IgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9yIH0pKV0gfSksIF9qc3hzKERpYWxvZ0Zvb3RlciwgeyBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiBvbkNsb3NlLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBjaGlsZHJlbjogXCJDYW5jZWxcIiB9KSwgX2pzeChCdXR0b24sIHsgdHlwZTogXCJzdWJtaXRcIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2hpbGRyZW46IGlzU3VibWl0dGluZyA/ICdDb21wbGV0aW5nLi4uJyA6ICdNYXJrIGFzIENvbXBsZXRlZCcgfSldIH0pXSB9KV0gfSkgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IENvbXBsZXRlRXZlbnREaWFsb2c7XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRGlhbG9nLCBEaWFsb2dDb250ZW50LCBEaWFsb2dIZWFkZXIsIERpYWxvZ1RpdGxlLCBEaWFsb2dGb290ZXIsIH0gZnJvbSAnLi4vdWkvZGlhbG9nJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL3VpL2J1dHRvbic7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gJy4uL3VpL2lucHV0JztcbmltcG9ydCB7IFNlbGVjdCB9IGZyb20gJy4uL3VpL3NlbGVjdCc7XG5pbXBvcnQgeyBVcGxvYWQsIFggfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuLyoqXG4gKiBFdmVudEZvcm0gQ29tcG9uZW50XG4gKlxuICogRm9ybSBmb3IgYWRkaW5nIG9yIGVkaXRpbmcgY2h1cmNoIGV2ZW50cy5cbiAqXG4gKiBGZWF0dXJlczpcbiAqIC0gSW5wdXQgZmllbGRzIGZvciB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHRpbWUsIGxvY2F0aW9uLCBjYXRlZ29yeSwgY2FwYWNpdHksIGltYWdlXG4gKiAtIERhdGUgYW5kIHRpbWUgcGlja2Vyc1xuICogLSBDYXRlZ29yeSBzZWxlY3RvciAoV29yc2hpcCwgT3V0cmVhY2gsIEZlbGxvd3NoaXAsIFRyYWluaW5nKVxuICogLSBJbWFnZSB1cGxvYWQgZnVuY3Rpb25hbGl0eSB3aXRoIHByZXZpZXdcbiAqIC0gRm9ybSB2YWxpZGF0aW9uIHdpdGggaW5saW5lIGVycm9yIG1lc3NhZ2VzXG4gKiAtIFZhbGlkYXRlcyBkYXRlIGlzIG5vdCBpbiB0aGUgcGFzdFxuICogLSBTdXBwb3J0IGZvciBib3RoIGNyZWF0ZSBhbmQgZWRpdCBtb2Rlc1xuICogLSBMb2FkaW5nIHN0YXRlcyBkdXJpbmcgc3VibWlzc2lvblxuICpcbiAqIFZhbGlkYXRlcyBSZXF1aXJlbWVudHM6IDkuMSwgOS40XG4gKiBEZXNpZ24gUmVmZXJlbmNlOiBFdmVudHMgUGFnZSBEZXNpZ24gc2VjdGlvblxuICogVGFzazogMTIuNCBDcmVhdGUgQWRkL0VkaXQgRXZlbnQgbW9kYWxcbiAqL1xuY29uc3QgRXZlbnRGb3JtID0gKHsgaXNPcGVuLCBvbkNsb3NlLCBvblN1Ym1pdCwgZXZlbnQgPSBudWxsLCBpc0xvYWRpbmcgPSBmYWxzZSwgfSkgPT4ge1xuICAgIGNvbnN0IFtmb3JtRGF0YSwgc2V0Rm9ybURhdGFdID0gdXNlU3RhdGUoe1xuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgZXZlbnRfZGF0ZTogJycsXG4gICAgICAgIGV2ZW50X3RpbWU6ICcnLFxuICAgICAgICBsb2NhdGlvbjogJycsXG4gICAgICAgIGNhdGVnb3J5OiAnd29yc2hpcCcsXG4gICAgICAgIGNhcGFjaXR5OiBudWxsLFxuICAgICAgICBpbWFnZTogbnVsbCxcbiAgICB9KTtcbiAgICBjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGUoe30pO1xuICAgIGNvbnN0IFtpc1N1Ym1pdHRpbmcsIHNldElzU3VibWl0dGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2ltYWdlUHJldmlldywgc2V0SW1hZ2VQcmV2aWV3XSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IGZpbGVJbnB1dFJlZiA9IHVzZVJlZihudWxsKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGZvcm0gZGF0YSB3aGVuIGV2ZW50IHByb3AgY2hhbmdlc1xuICAgICAqL1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgc2V0Rm9ybURhdGEoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBldmVudC50aXRsZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZXZlbnQuZGVzY3JpcHRpb24gfHwgJycsXG4gICAgICAgICAgICAgICAgZXZlbnRfZGF0ZTogZXZlbnQuZXZlbnRfZGF0ZS5zcGxpdCgnVCcpWzBdLFxuICAgICAgICAgICAgICAgIGV2ZW50X3RpbWU6IGV2ZW50LmV2ZW50X3RpbWUuc3Vic3RyaW5nKDAsIDUpLCAvLyBISDptbSBmb3JtYXRcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogZXZlbnQubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IGV2ZW50LmNhdGVnb3J5IHx8ICd3b3JzaGlwJyxcbiAgICAgICAgICAgICAgICBjYXBhY2l0eTogZXZlbnQuY2FwYWNpdHkgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICBpbWFnZTogZXZlbnQuaW1hZ2UgfHwgbnVsbCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gU2V0IGltYWdlIHByZXZpZXcgaWYgZWRpdGluZyBhbmQgaW1hZ2UgZXhpc3RzXG4gICAgICAgICAgICBpZiAoZXZlbnQuaW1hZ2UgJiYgdHlwZW9mIGV2ZW50LmltYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHNldEltYWdlUHJldmlldyhldmVudC5pbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXNldCBmb3JtIGZvciBuZXcgZXZlbnRcbiAgICAgICAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICcnLFxuICAgICAgICAgICAgICAgIGV2ZW50X2RhdGU6ICcnLFxuICAgICAgICAgICAgICAgIGV2ZW50X3RpbWU6ICcnLFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3dvcnNoaXAnLFxuICAgICAgICAgICAgICAgIGNhcGFjaXR5OiBudWxsLFxuICAgICAgICAgICAgICAgIGltYWdlOiBudWxsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRJbWFnZVByZXZpZXcobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RXJyb3JzKHt9KTtcbiAgICB9LCBbZXZlbnQsIGlzT3Blbl0pO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGZvcm0gZGF0YVxuICAgICAqL1xuICAgIGNvbnN0IHZhbGlkYXRlRm9ybSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3RXJyb3JzID0ge307XG4gICAgICAgIC8vIFJlcXVpcmVkIGZpZWxkc1xuICAgICAgICBpZiAoIWZvcm1EYXRhLnRpdGxlLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLnRpdGxlID0gJ1RpdGxlIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtRGF0YS50aXRsZS5sZW5ndGggPiAyMDApIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy50aXRsZSA9ICdUaXRsZSBtdXN0IGJlIDIwMCBjaGFyYWN0ZXJzIG9yIGxlc3MnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEuZXZlbnRfZGF0ZSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmV2ZW50X2RhdGUgPSAnRGF0ZSBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICAvLyBPbmx5IHZhbGlkYXRlIGRhdGUgaXMgbm90IGluIHRoZSBwYXN0IGZvciBuZXcgZXZlbnRzXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZERhdGUgPSBuZXcgRGF0ZShmb3JtRGF0YS5ldmVudF9kYXRlICsgJ1QwMDowMDowMCcpO1xuICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRlIDwgdG9kYXkpIHtcbiAgICAgICAgICAgICAgICBuZXdFcnJvcnMuZXZlbnRfZGF0ZSA9ICdFdmVudCBkYXRlIGNhbm5vdCBiZSBpbiB0aGUgcGFzdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5ldmVudF90aW1lKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuZXZlbnRfdGltZSA9ICdUaW1lIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLmxvY2F0aW9uLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmxvY2F0aW9uID0gJ0xvY2F0aW9uIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtRGF0YS5sb2NhdGlvbi5sZW5ndGggPiAyMDApIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5sb2NhdGlvbiA9ICdMb2NhdGlvbiBtdXN0IGJlIDIwMCBjaGFyYWN0ZXJzIG9yIGxlc3MnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEuY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5jYXRlZ29yeSA9ICdDYXRlZ29yeSBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVmFsaWRhdGUgY2FwYWNpdHkgaWYgcHJvdmlkZWRcbiAgICAgICAgaWYgKGZvcm1EYXRhLmNhcGFjaXR5ICE9PSBudWxsICYmIGZvcm1EYXRhLmNhcGFjaXR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhcGFjaXR5TnVtID0gTnVtYmVyKGZvcm1EYXRhLmNhcGFjaXR5KTtcbiAgICAgICAgICAgIGlmIChpc05hTihjYXBhY2l0eU51bSkgfHwgY2FwYWNpdHlOdW0gPCAxKSB7XG4gICAgICAgICAgICAgICAgbmV3RXJyb3JzLmNhcGFjaXR5ID0gJ0NhcGFjaXR5IG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFZhbGlkYXRlIGltYWdlIGlmIHByZXNlbnRcbiAgICAgICAgaWYgKGZvcm1EYXRhLmltYWdlICYmIGZvcm1EYXRhLmltYWdlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsaWRUeXBlcyA9IFsnaW1hZ2UvanBlZycsICdpbWFnZS9qcGcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2dpZicsICdpbWFnZS93ZWJwJ107XG4gICAgICAgICAgICBpZiAoIXZhbGlkVHlwZXMuaW5jbHVkZXMoZm9ybURhdGEuaW1hZ2UudHlwZSkpIHtcbiAgICAgICAgICAgICAgICBuZXdFcnJvcnMuaW1hZ2UgPSAnSW1hZ2UgbXVzdCBiZSBhIHZhbGlkIGltYWdlIGZpbGUgKEpQRUcsIFBORywgR0lGLCBvciBXZWJQKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtYXhTaXplID0gNSAqIDEwMjQgKiAxMDI0OyAvLyA1TUJcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS5pbWFnZS5zaXplID4gbWF4U2l6ZSkge1xuICAgICAgICAgICAgICAgIG5ld0Vycm9ycy5pbWFnZSA9ICdJbWFnZSBtdXN0IGJlIGxlc3MgdGhhbiA1TUInO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldEVycm9ycyhuZXdFcnJvcnMpO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobmV3RXJyb3JzKS5sZW5ndGggPT09IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZS50YXJnZXQ7XG4gICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIFtuYW1lXTogdmFsdWUsXG4gICAgICAgIH0pKTtcbiAgICAgICAgLy8gQ2xlYXIgZXJyb3IgZm9yIHRoaXMgZmllbGQgd2hlbiB1c2VyIHN0YXJ0cyB0eXBpbmdcbiAgICAgICAgaWYgKGVycm9yc1tuYW1lXSkge1xuICAgICAgICAgICAgc2V0RXJyb3JzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgW25hbWVdOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBpbWFnZSBmaWxlIHNlbGVjdGlvblxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUltYWdlQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIGltYWdlOiBmaWxlLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHByZXZpZXcgVVJMXG4gICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRJbWFnZVByZXZpZXcocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgICAgICAvLyBDbGVhciBpbWFnZSBlcnJvclxuICAgICAgICAgICAgaWYgKGVycm9ycy5pbWFnZSkge1xuICAgICAgICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBpbWFnZSByZW1vdmFsXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlSW1hZ2VSZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIGltYWdlOiBudWxsLFxuICAgICAgICB9KSk7XG4gICAgICAgIHNldEltYWdlUHJldmlldyhudWxsKTtcbiAgICAgICAgaWYgKGZpbGVJbnB1dFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBmaWxlSW5wdXRSZWYuY3VycmVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZm9ybSBzdWJtaXNzaW9uXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoIXZhbGlkYXRlRm9ybSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRm9ybSB2YWxpZGF0aW9uIGZhaWxlZCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldElzU3VibWl0dGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIElmIGltYWdlIGlzIGEgRmlsZSwgd2UgbmVlZCB0byB1c2UgRm9ybURhdGFcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS5pbWFnZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJtaXREYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgc3VibWl0RGF0YS5hcHBlbmQoJ3RpdGxlJywgZm9ybURhdGEudGl0bGUpO1xuICAgICAgICAgICAgICAgIHN1Ym1pdERhdGEuYXBwZW5kKCdkZXNjcmlwdGlvbicsIGZvcm1EYXRhLmRlc2NyaXB0aW9uIHx8ICcnKTtcbiAgICAgICAgICAgICAgICBzdWJtaXREYXRhLmFwcGVuZCgnZXZlbnRfZGF0ZScsIGZvcm1EYXRhLmV2ZW50X2RhdGUpO1xuICAgICAgICAgICAgICAgIHN1Ym1pdERhdGEuYXBwZW5kKCdldmVudF90aW1lJywgZm9ybURhdGEuZXZlbnRfdGltZSk7XG4gICAgICAgICAgICAgICAgc3VibWl0RGF0YS5hcHBlbmQoJ2xvY2F0aW9uJywgZm9ybURhdGEubG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIHN1Ym1pdERhdGEuYXBwZW5kKCdjYXRlZ29yeScsIGZvcm1EYXRhLmNhdGVnb3J5KTtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybURhdGEuY2FwYWNpdHkgIT09IG51bGwgJiYgZm9ybURhdGEuY2FwYWNpdHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJtaXREYXRhLmFwcGVuZCgnY2FwYWNpdHknLCBTdHJpbmcoZm9ybURhdGEuY2FwYWNpdHkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3VibWl0RGF0YS5hcHBlbmQoJ3N0YXR1cycsIGV2ZW50Py5zdGF0dXMgfHwgJ3VwY29taW5nJyk7XG4gICAgICAgICAgICAgICAgc3VibWl0RGF0YS5hcHBlbmQoJ2ltYWdlJywgZm9ybURhdGEuaW1hZ2UpO1xuICAgICAgICAgICAgICAgIGF3YWl0IG9uU3VibWl0KHN1Ym1pdERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gU3VibWl0IGFzIHJlZ3VsYXIgSlNPTlxuICAgICAgICAgICAgICAgIGNvbnN0IHN1Ym1pdERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmZvcm1EYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGV2ZW50Py5zdGF0dXMgfHwgJ3VwY29taW5nJyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFdmVudEZvcm0gc3VibWl0dGluZyBkYXRhOicsIHN1Ym1pdERhdGEpO1xuICAgICAgICAgICAgICAgIGF3YWl0IG9uU3VibWl0KHN1Ym1pdERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0V2ZW50Rm9ybSBzdWJtaXNzaW9uIHN1Y2Nlc3NmdWwsIGNsb3NpbmcgZm9ybScpO1xuICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXZlbnRGb3JtIHN1Ym1pc3Npb24gZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcmVzcG9uc2UgZGF0YTonLCBlcnJvci5yZXNwb25zZT8uZGF0YSk7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VydmVyLXNpZGUgdmFsaWRhdGlvbiBlcnJvcnNcbiAgICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZT8uZGF0YT8uZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3JzKGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNob3cgYWxlcnQgd2l0aCBlcnJvciBkZXRhaWxzXG4gICAgICAgICAgICBhbGVydCgnRXJyb3IgY3JlYXRpbmcgZXZlbnQ6ICcgKyAoZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgICAgLy8gRG9uJ3QgY2xvc2UgdGhlIGZvcm0gaWYgdGhlcmUncyBhbiBlcnJvclxuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChfanN4KERpYWxvZywgeyBvcGVuOiBpc09wZW4sIG9uT3BlbkNoYW5nZTogKG9wZW4pID0+IHtcbiAgICAgICAgICAgIGlmICghb3BlbiAmJiAhaXNTdWJtaXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjaGlsZHJlbjogX2pzeHMoRGlhbG9nQ29udGVudCwgeyBjbGFzc05hbWU6IFwibWF4LXctMnhsIG1heC1oLVs5MHZoXSBvdmVyZmxvdy15LWF1dG9cIiwgY2hpbGRyZW46IFtfanN4KERpYWxvZ0hlYWRlciwgeyBjaGlsZHJlbjogX2pzeChEaWFsb2dUaXRsZSwgeyBjaGlsZHJlbjogZXZlbnQgPyAnRWRpdCBFdmVudCcgOiAnQWRkIE5ldyBFdmVudCcgfSkgfSksIF9qc3hzKFwiZm9ybVwiLCB7IG9uU3VibWl0OiBoYW5kbGVTdWJtaXQsIGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwidGl0bGVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJUaXRsZSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwidGl0bGVcIiwgbmFtZTogXCJ0aXRsZVwiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiZS5nLiwgU3VuZGF5IFNlcnZpY2UsIFlvdXRoIE5pZ2h0XCIsIHZhbHVlOiBmb3JtRGF0YS50aXRsZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMudGl0bGUgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfSksIGVycm9ycy50aXRsZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLnRpdGxlIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImRlc2NyaXB0aW9uXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJEZXNjcmlwdGlvblwiIH0pLCBfanN4KFwidGV4dGFyZWFcIiwgeyBpZDogXCJkZXNjcmlwdGlvblwiLCBuYW1lOiBcImRlc2NyaXB0aW9uXCIsIHJvd3M6IDQsIHZhbHVlOiBmb3JtRGF0YS5kZXNjcmlwdGlvbiwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBcInctZnVsbCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItaW5wdXQgYmctYmFja2dyb3VuZCBweC0zIHB5LTIgdGV4dC1zbSByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1yaW5nIGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtMlwiLCBwbGFjZWhvbGRlcjogXCJCcmllZiBkZXNjcmlwdGlvbiBvZiB0aGUgZXZlbnQuLi5cIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZyB9KSwgZXJyb3JzLmRlc2NyaXB0aW9uICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuZGVzY3JpcHRpb24gfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJldmVudF9kYXRlXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiRGF0ZSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwiZXZlbnRfZGF0ZVwiLCBuYW1lOiBcImV2ZW50X2RhdGVcIiwgdHlwZTogXCJkYXRlXCIsIHZhbHVlOiBmb3JtRGF0YS5ldmVudF9kYXRlLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5ldmVudF9kYXRlID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMuZXZlbnRfZGF0ZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmV2ZW50X2RhdGUgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImV2ZW50X3RpbWVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJUaW1lIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJldmVudF90aW1lXCIsIG5hbWU6IFwiZXZlbnRfdGltZVwiLCB0eXBlOiBcInRpbWVcIiwgdmFsdWU6IGZvcm1EYXRhLmV2ZW50X3RpbWUsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmV2ZW50X3RpbWUgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfSksIGVycm9ycy5ldmVudF90aW1lICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMuZXZlbnRfdGltZSB9KSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImxvY2F0aW9uXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiTG9jYXRpb24gXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcImxvY2F0aW9uXCIsIG5hbWU6IFwibG9jYXRpb25cIiwgdHlwZTogXCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOiBcImUuZy4sIE1haW4gU2FuY3R1YXJ5LCBZb3V0aCBIYWxsXCIsIHZhbHVlOiBmb3JtRGF0YS5sb2NhdGlvbiwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMubG9jYXRpb24gPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfSksIGVycm9ycy5sb2NhdGlvbiAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmxvY2F0aW9uIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2hpbGRyZW46IF9qc3goU2VsZWN0LCB7IGxhYmVsOiBcIkNhdGVnb3J5XCIsIHZhbHVlOiBmb3JtRGF0YS5jYXRlZ29yeSwgb25DaGFuZ2U6ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9ycy5jYXRlZ29yeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3JzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ3dvcnNoaXAnLCBsYWJlbDogJ1dvcnNoaXAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdvdXRyZWFjaCcsIGxhYmVsOiAnT3V0cmVhY2gnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdmZWxsb3dzaGlwJywgbGFiZWw6ICdGZWxsb3dzaGlwJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAndHJhaW5pbmcnLCBsYWJlbDogJ1RyYWluaW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sIGVycm9yOiBlcnJvcnMuY2F0ZWdvcnksIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIHJlcXVpcmVkOiB0cnVlIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJjYXBhY2l0eVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiQ2FwYWNpdHkgKE9wdGlvbmFsKVwiIH0pLCBfanN4KElucHV0LCB7IGlkOiBcImNhcGFjaXR5XCIsIG5hbWU6IFwiY2FwYWNpdHlcIiwgdHlwZTogXCJudW1iZXJcIiwgbWluOiBcIjFcIiwgcGxhY2Vob2xkZXI6IFwiZS5nLiwgMTAwXCIsIHZhbHVlOiBmb3JtRGF0YS5jYXBhY2l0eSB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9ybURhdGEoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXBhY2l0eTogdmFsdWUgPyBwYXJzZUludCh2YWx1ZSkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9ycy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGNsYXNzTmFtZTogZXJyb3JzLmNhcGFjaXR5ID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMuY2FwYWNpdHkgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5jYXBhY2l0eSB9KSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJFdmVudCBJbWFnZSAoT3B0aW9uYWwpXCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktM1wiLCBjaGlsZHJlbjogW2ltYWdlUHJldmlldyAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmUgaW5saW5lLWJsb2NrXCIsIGNoaWxkcmVuOiBbX2pzeChcImltZ1wiLCB7IHNyYzogaW1hZ2VQcmV2aWV3LCBhbHQ6IFwiRXZlbnQgaW1hZ2UgcHJldmlld1wiLCBjbGFzc05hbWU6IFwidy1mdWxsIGgtNDggb2JqZWN0LWNvdmVyIHJvdW5kZWQtbGcgYm9yZGVyLTIgYm9yZGVyLWdyYXktMjAwXCIgfSksIF9qc3goXCJidXR0b25cIiwgeyB0eXBlOiBcImJ1dHRvblwiLCBvbkNsaWNrOiBoYW5kbGVJbWFnZVJlbW92ZSwgY2xhc3NOYW1lOiBcImFic29sdXRlIC10b3AtMiAtcmlnaHQtMiBiZy1yZWQtNTAwIHRleHQtd2hpdGUgcm91bmRlZC1mdWxsIHAtMSBob3ZlcjpiZy1yZWQtNjAwIHRyYW5zaXRpb24tY29sb3JzXCIsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGNoaWxkcmVuOiBfanN4KFgsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSB9KV0gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImlucHV0XCIsIHsgcmVmOiBmaWxlSW5wdXRSZWYsIHR5cGU6IFwiZmlsZVwiLCBhY2NlcHQ6IFwiaW1hZ2UvKlwiLCBvbkNoYW5nZTogaGFuZGxlSW1hZ2VDaGFuZ2UsIGNsYXNzTmFtZTogXCJoaWRkZW5cIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZyB9KSwgX2pzeHMoQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKSwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2xhc3NOYW1lOiBcInctZnVsbCBzbTp3LWF1dG9cIiwgY2hpbGRyZW46IFtfanN4KFVwbG9hZCwgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yXCIgfSksIGltYWdlUHJldmlldyA/ICdDaGFuZ2UgSW1hZ2UnIDogJ1VwbG9hZCBJbWFnZSddIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJSZWNvbW1lbmRlZDogMTY6OSBhc3BlY3QgcmF0aW8sIG1heCA1TUIgKEpQRUcsIFBORywgR0lGLCBvciBXZWJQKVwiIH0pXSB9KV0gfSksIGVycm9ycy5pbWFnZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmltYWdlIH0pKV0gfSksIF9qc3hzKERpYWxvZ0Zvb3RlciwgeyBjbGFzc05hbWU6IFwibXQtNlwiLCBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhbmNlbCBidXR0b24gY2xpY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGNoaWxkcmVuOiBcIkNhbmNlbFwiIH0pLCBfanN4KEJ1dHRvbiwgeyB0eXBlOiBcInN1Ym1pdFwiLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIHx8IGlzTG9hZGluZywgb25DbGljazogKCkgPT4gY29uc29sZS5sb2coJ1N1Ym1pdCBidXR0b24gY2xpY2tlZCcpLCBjaGlsZHJlbjogaXNTdWJtaXR0aW5nID8gJ1NhdmluZy4uLicgOiBldmVudCA/ICdVcGRhdGUgRXZlbnQnIDogJ0FkZCBFdmVudCcgfSldIH0pXSB9KV0gfSkgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEV2ZW50Rm9ybTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIERpYWxvZ1ByaW1pdGl2ZSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWRpYWxvZ1wiO1xuaW1wb3J0IHsgWCB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IGNuIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlsc1wiO1xuY29uc3QgRGlhbG9nID0gRGlhbG9nUHJpbWl0aXZlLlJvb3Q7XG5jb25zdCBEaWFsb2dUcmlnZ2VyID0gRGlhbG9nUHJpbWl0aXZlLlRyaWdnZXI7XG5jb25zdCBEaWFsb2dQb3J0YWwgPSBEaWFsb2dQcmltaXRpdmUuUG9ydGFsO1xuY29uc3QgRGlhbG9nQ2xvc2UgPSBEaWFsb2dQcmltaXRpdmUuQ2xvc2U7XG5jb25zdCBEaWFsb2dPdmVybGF5ID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0sIHJlZikgPT4gKF9qc3goRGlhbG9nUHJpbWl0aXZlLk92ZXJsYXksIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJmaXhlZCBpbnNldC0wIHotNTAgYmctYmFja2dyb3VuZC84MCBiYWNrZHJvcC1ibHVyLXNtIGRhdGEtW3N0YXRlPW9wZW5dOmFuaW1hdGUtaW4gZGF0YS1bc3RhdGU9Y2xvc2VkXTphbmltYXRlLW91dCBkYXRhLVtzdGF0ZT1jbG9zZWRdOmZhZGUtb3V0LTAgZGF0YS1bc3RhdGU9b3Blbl06ZmFkZS1pbi0wXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKSk7XG5EaWFsb2dPdmVybGF5LmRpc3BsYXlOYW1lID0gRGlhbG9nUHJpbWl0aXZlLk92ZXJsYXkuZGlzcGxheU5hbWU7XG5jb25zdCBEaWFsb2dDb250ZW50ID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIGNoaWxkcmVuLCBzaG93Q2xvc2VCdXR0b24gPSB0cnVlLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4cyhEaWFsb2dQb3J0YWwsIHsgY2hpbGRyZW46IFtfanN4KERpYWxvZ092ZXJsYXksIHt9KSwgX2pzeHMoRGlhbG9nUHJpbWl0aXZlLkNvbnRlbnQsIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJmaXhlZCBsZWZ0LVs1MCVdIHRvcC1bNTAlXSB6LTUwIGdyaWQgdy1mdWxsIG1heC13LWxnIHRyYW5zbGF0ZS14LVstNTAlXSB0cmFuc2xhdGUteS1bLTUwJV0gZ2FwLTQgYm9yZGVyIGJnLWJhY2tncm91bmQgc2hhZG93LWxnIGR1cmF0aW9uLTIwMCBkYXRhLVtzdGF0ZT1vcGVuXTphbmltYXRlLWluIGRhdGEtW3N0YXRlPWNsb3NlZF06YW5pbWF0ZS1vdXQgZGF0YS1bc3RhdGU9Y2xvc2VkXTpmYWRlLW91dC0wIGRhdGEtW3N0YXRlPW9wZW5dOmZhZGUtaW4tMCBkYXRhLVtzdGF0ZT1jbG9zZWRdOnpvb20tb3V0LTk1IGRhdGEtW3N0YXRlPW9wZW5dOnpvb20taW4tOTUgZGF0YS1bc3RhdGU9Y2xvc2VkXTpzbGlkZS1vdXQtdG8tbGVmdC0xLzIgZGF0YS1bc3RhdGU9Y2xvc2VkXTpzbGlkZS1vdXQtdG8tdG9wLVs0OCVdIGRhdGEtW3N0YXRlPW9wZW5dOnNsaWRlLWluLWZyb20tbGVmdC0xLzIgZGF0YS1bc3RhdGU9b3Blbl06c2xpZGUtaW4tZnJvbS10b3AtWzQ4JV0gc206cm91bmRlZC1sZ1wiLCBcbiAgICAgICAgICAgIC8vIE1vYmlsZSBvcHRpbWl6YXRpb25zOiBmdWxsIHNjcmVlbiBvbiBtb2JpbGUgd2l0aCBwcm9wZXIgcGFkZGluZyBhbmQgc2Nyb2xsaW5nXG4gICAgICAgICAgICBcIm1heC1oLVsxMDBkdmhdIHNtOm1heC1oLVs5MHZoXSBvdmVyZmxvdy15LWF1dG9cIiwgXCJtLTAgc206bS00IHAtNCBzbTpwLTZcIiwgXCJyb3VuZGVkLW5vbmUgc206cm91bmRlZC1sZ1wiLCBcInctWzEwMHZ3XSBzbTp3LWZ1bGxcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMsIGNoaWxkcmVuOiBbY2hpbGRyZW4sIHNob3dDbG9zZUJ1dHRvbiAmJiAoX2pzeHMoRGlhbG9nUHJpbWl0aXZlLkNsb3NlLCB7IGNsYXNzTmFtZTogXCJhYnNvbHV0ZSByaWdodC00IHRvcC00IHJvdW5kZWQtc20gb3BhY2l0eS03MCByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIHRyYW5zaXRpb24tb3BhY2l0eSBob3ZlcjpvcGFjaXR5LTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcmluZyBmb2N1czpyaW5nLW9mZnNldC0yIGRpc2FibGVkOnBvaW50ZXItZXZlbnRzLW5vbmUgZGF0YS1bc3RhdGU9b3Blbl06YmctYWNjZW50IGRhdGEtW3N0YXRlPW9wZW5dOnRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiLCBjaGlsZHJlbjogW19qc3goWCwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJzci1vbmx5XCIsIGNoaWxkcmVuOiBcIkNsb3NlXCIgfSldIH0pKV0gfSldIH0pKSk7XG5EaWFsb2dDb250ZW50LmRpc3BsYXlOYW1lID0gRGlhbG9nUHJpbWl0aXZlLkNvbnRlbnQuZGlzcGxheU5hbWU7XG5jb25zdCBEaWFsb2dIZWFkZXIgPSAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pID0+IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbihcImZsZXggZmxleC1jb2wgc3BhY2UteS0xLjUgdGV4dC1jZW50ZXIgc206dGV4dC1sZWZ0XCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKTtcbkRpYWxvZ0hlYWRlci5kaXNwbGF5TmFtZSA9IFwiRGlhbG9nSGVhZGVyXCI7XG5jb25zdCBEaWFsb2dGb290ZXIgPSAoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0pID0+IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbihcImZsZXggZmxleC1jb2wtcmV2ZXJzZSBnYXAtMiBzbTpmbGV4LXJvdyBzbTpqdXN0aWZ5LWVuZCBzbTpzcGFjZS14LTIgc206Z2FwLTBcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpO1xuRGlhbG9nRm9vdGVyLmRpc3BsYXlOYW1lID0gXCJEaWFsb2dGb290ZXJcIjtcbmNvbnN0IERpYWxvZ1RpdGxlID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0sIHJlZikgPT4gKF9qc3goRGlhbG9nUHJpbWl0aXZlLlRpdGxlLCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwidGV4dC1sZyBmb250LXNlbWlib2xkIGxlYWRpbmctbm9uZSB0cmFja2luZy10aWdodFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nVGl0bGUuZGlzcGxheU5hbWUgPSBEaWFsb2dQcmltaXRpdmUuVGl0bGUuZGlzcGxheU5hbWU7XG5jb25zdCBEaWFsb2dEZXNjcmlwdGlvbiA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5EZXNjcmlwdGlvbiwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcInRleHQtc20gdGV4dC1tdXRlZC1mb3JlZ3JvdW5kXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKSk7XG5EaWFsb2dEZXNjcmlwdGlvbi5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5EZXNjcmlwdGlvbi5kaXNwbGF5TmFtZTtcbmV4cG9ydCB7IERpYWxvZywgRGlhbG9nUG9ydGFsLCBEaWFsb2dPdmVybGF5LCBEaWFsb2dDbG9zZSwgRGlhbG9nVHJpZ2dlciwgRGlhbG9nQ29udGVudCwgRGlhbG9nSGVhZGVyLCBEaWFsb2dGb290ZXIsIERpYWxvZ1RpdGxlLCBEaWFsb2dEZXNjcmlwdGlvbiwgfTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGN2YSB9IGZyb20gXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIjtcbmltcG9ydCB7IGNuIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlsc1wiO1xuY29uc3QgaW5wdXRWYXJpYW50cyA9IGN2YShcImJsb2NrIHctZnVsbCByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0yMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLW9mZnNldC0wXCIsIHtcbiAgICB2YXJpYW50czoge1xuICAgICAgICB2YXJpYW50OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBcImJvcmRlci1uZXV0cmFsLTMwMCBiZy13aGl0ZSB0ZXh0LW5ldXRyYWwtOTAwIHBsYWNlaG9sZGVyLW5ldXRyYWwtNDAwIGZvY3VzOmJvcmRlci1wcmltYXJ5LTUwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwXCIsXG4gICAgICAgICAgICBlcnJvcjogXCJib3JkZXItZXJyb3ItNTAwIGJnLWVycm9yLTUwIHRleHQtZXJyb3ItOTAwIHBsYWNlaG9sZGVyLWVycm9yLTQwMCBmb2N1czpib3JkZXItZXJyb3ItNTAwIGZvY3VzOnJpbmctZXJyb3ItNTAwXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIHNtOiBcInB4LTMgcHktMS41IHRleHQtc20gaC04XCIsXG4gICAgICAgICAgICBtZDogXCJweC00IHB5LTIgdGV4dC1iYXNlIGgtMTAgbWluLWgtWzQ0cHhdXCIsIC8vIE1pbmltdW0gNDRweCBmb3IgdG91Y2ggdGFyZ2V0cyBvbiBtb2JpbGVcbiAgICAgICAgICAgIGxnOiBcInB4LTQgcHktMyB0ZXh0LWxnIGgtMTJcIixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGRlZmF1bHRWYXJpYW50czoge1xuICAgICAgICB2YXJpYW50OiBcImRlZmF1bHRcIixcbiAgICAgICAgc2l6ZTogXCJtZFwiLFxuICAgIH0sXG59KTtcbi8qKlxuICogR2V0IGFwcHJvcHJpYXRlIGlucHV0TW9kZSBmb3IgbW9iaWxlIGtleWJvYXJkcyBiYXNlZCBvbiBpbnB1dCB0eXBlXG4gKi9cbmNvbnN0IGdldElucHV0TW9kZSA9ICh0eXBlKSA9PiB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgICAgIHJldHVybiAnZW1haWwnO1xuICAgICAgICBjYXNlICd0ZWwnOlxuICAgICAgICAgICAgcmV0dXJuICd0ZWwnO1xuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgcmV0dXJuICdudW1lcmljJztcbiAgICAgICAgY2FzZSAndXJsJzpcbiAgICAgICAgICAgIHJldHVybiAndXJsJztcbiAgICAgICAgY2FzZSAnc2VhcmNoJzpcbiAgICAgICAgICAgIHJldHVybiAnc2VhcmNoJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAndGV4dCc7XG4gICAgfVxufTtcbmNvbnN0IElucHV0ID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIHR5cGUgPSAndGV4dCcsIGxhYmVsLCBlcnJvciwgaGVscGVyVGV4dCwgaWNvbiwgaWNvblBvc2l0aW9uID0gJ2xlZnQnLCBmdWxsV2lkdGggPSB0cnVlLCBkaXNhYmxlZCwgcmVxdWlyZWQsIGlkLCB2YXJpYW50LCBzaXplLCBpbnB1dE1vZGUsIC4uLnByb3BzIH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IGlucHV0SWQgPSBpZCB8fCBgaW5wdXQtJHtSZWFjdC51c2VJZCgpfWA7XG4gICAgY29uc3QgZXJyb3JJZCA9IGVycm9yID8gYCR7aW5wdXRJZH0tZXJyb3JgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGhlbHBlclRleHRJZCA9IGhlbHBlclRleHQgPyBgJHtpbnB1dElkfS1oZWxwZXJgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGhhc0Vycm9yID0gISFlcnJvcjtcbiAgICBjb25zdCBjdXJyZW50VmFyaWFudCA9IGhhc0Vycm9yID8gJ2Vycm9yJyA6IHZhcmlhbnQ7XG4gICAgLy8gVXNlIHByb3ZpZGVkIGlucHV0TW9kZSBvciBkZXRlcm1pbmUgZnJvbSB0eXBlIGZvciBtb2JpbGUga2V5Ym9hcmQgb3B0aW1pemF0aW9uXG4gICAgY29uc3QgbW9iaWxlSW5wdXRNb2RlID0gaW5wdXRNb2RlIHx8IGdldElucHV0TW9kZSh0eXBlKTtcbiAgICByZXR1cm4gKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbihcInNwYWNlLXktMVwiLCBmdWxsV2lkdGggJiYgXCJ3LWZ1bGxcIiksIGNoaWxkcmVuOiBbbGFiZWwgJiYgKF9qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBpbnB1dElkLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwXCIsIGNoaWxkcmVuOiBbbGFiZWwsIHJlcXVpcmVkICYmIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtZXJyb3ItNTAwIG1sLTFcIiwgXCJhcmlhLWxhYmVsXCI6IFwicmVxdWlyZWRcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJlbGF0aXZlXCIsIGNoaWxkcmVuOiBbaWNvbiAmJiBpY29uUG9zaXRpb24gPT09ICdsZWZ0JyAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJhYnNvbHV0ZSBsZWZ0LTMgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHRleHQtbmV1dHJhbC00MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiLCBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLCBjaGlsZHJlbjogaWNvbiB9KSksIF9qc3goXCJpbnB1dFwiLCB7IHJlZjogcmVmLCB0eXBlOiB0eXBlLCBpZDogaW5wdXRJZCwgZGlzYWJsZWQ6IGRpc2FibGVkLCByZXF1aXJlZDogcmVxdWlyZWQsIGlucHV0TW9kZTogbW9iaWxlSW5wdXRNb2RlLCBcImFyaWEtaW52YWxpZFwiOiBoYXNFcnJvciwgXCJhcmlhLWRlc2NyaWJlZGJ5XCI6IGNuKGVycm9ySWQgJiYgZXJyb3JJZCwgaGVscGVyVGV4dElkICYmIGhlbHBlclRleHRJZCkgfHwgdW5kZWZpbmVkLCBjbGFzc05hbWU6IGNuKGlucHV0VmFyaWFudHMoeyB2YXJpYW50OiBjdXJyZW50VmFyaWFudCwgc2l6ZSB9KSwgaWNvbiAmJiBpY29uUG9zaXRpb24gPT09ICdsZWZ0JyAmJiBcInBsLTEwXCIsIGljb24gJiYgaWNvblBvc2l0aW9uID09PSAncmlnaHQnICYmIFwicHItMTBcIiwgZGlzYWJsZWQgJiYgXCJiZy1uZXV0cmFsLTEwMCB0ZXh0LW5ldXRyYWwtNTAwIGN1cnNvci1ub3QtYWxsb3dlZFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSwgaWNvbiAmJiBpY29uUG9zaXRpb24gPT09ICdyaWdodCcgJiYgKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgcmlnaHQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgdGV4dC1uZXV0cmFsLTQwMCBwb2ludGVyLWV2ZW50cy1ub25lXCIsIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIsIGNoaWxkcmVuOiBpY29uIH0pKV0gfSksIGVycm9yICYmIChfanN4KFwicFwiLCB7IGlkOiBlcnJvcklkLCBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWVycm9yLTYwMFwiLCByb2xlOiBcImFsZXJ0XCIsIGNoaWxkcmVuOiBlcnJvciB9KSksIGhlbHBlclRleHQgJiYgIWVycm9yICYmIChfanN4KFwicFwiLCB7IGlkOiBoZWxwZXJUZXh0SWQsIGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC01MDBcIiwgY2hpbGRyZW46IGhlbHBlclRleHQgfSkpXSB9KSk7XG59KTtcbklucHV0LmRpc3BsYXlOYW1lID0gXCJJbnB1dFwiO1xuZXhwb3J0IHsgSW5wdXQsIGlucHV0VmFyaWFudHMgfTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGN2YSB9IGZyb20gXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIjtcbmltcG9ydCB7IENoZWNrLCBDaGV2cm9uRG93biwgWCwgU2VhcmNoIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgY24gfSBmcm9tIFwiLi4vLi4vbGliL3V0aWxzXCI7XG5jb25zdCBzZWxlY3RUcmlnZ2VyVmFyaWFudHMgPSBjdmEoXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdy1mdWxsIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctb2Zmc2V0LTAgY3Vyc29yLXBvaW50ZXJcIiwge1xuICAgIHZhcmlhbnRzOiB7XG4gICAgICAgIHZhcmlhbnQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFwiYm9yZGVyLW5ldXRyYWwtMzAwIGJnLXdoaXRlIHRleHQtbmV1dHJhbC05MDAgZm9jdXM6Ym9yZGVyLXByaW1hcnktNTAwIGZvY3VzOnJpbmctcHJpbWFyeS01MDBcIixcbiAgICAgICAgICAgIGVycm9yOiBcImJvcmRlci1lcnJvci01MDAgYmctZXJyb3ItNTAgdGV4dC1lcnJvci05MDAgZm9jdXM6Ym9yZGVyLWVycm9yLTUwMCBmb2N1czpyaW5nLWVycm9yLTUwMFwiLFxuICAgICAgICB9LFxuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICBzbTogXCJweC0zIHB5LTEuNSB0ZXh0LXNtIGgtOFwiLFxuICAgICAgICAgICAgbWQ6IFwicHgtNCBweS0yIHRleHQtYmFzZSBoLTEwIG1pbi1oLVs0NHB4XVwiLCAvLyBNaW5pbXVtIDQ0cHggZm9yIHRvdWNoIHRhcmdldHMgb24gbW9iaWxlXG4gICAgICAgICAgICBsZzogXCJweC00IHB5LTMgdGV4dC1sZyBoLTEyXCIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBkZWZhdWx0VmFyaWFudHM6IHtcbiAgICAgICAgdmFyaWFudDogXCJkZWZhdWx0XCIsXG4gICAgICAgIHNpemU6IFwibWRcIixcbiAgICB9LFxufSk7XG5jb25zdCBTZWxlY3QgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgbGFiZWwsIGVycm9yLCBoZWxwZXJUZXh0LCBvcHRpb25zLCB2YWx1ZSwgb25DaGFuZ2UsIHBsYWNlaG9sZGVyID0gXCJTZWxlY3QgYW4gb3B0aW9uXCIsIGRpc2FibGVkID0gZmFsc2UsIHJlcXVpcmVkID0gZmFsc2UsIG11bHRpcGxlID0gZmFsc2UsIHNlYXJjaGFibGUgPSBmYWxzZSwgZnVsbFdpZHRoID0gdHJ1ZSwgdmFyaWFudCwgc2l6ZSwgaWQsIC4uLnByb3BzIH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSBSZWFjdC51c2VTdGF0ZShcIlwiKTtcbiAgICBjb25zdCBbZm9jdXNlZEluZGV4LCBzZXRGb2N1c2VkSW5kZXhdID0gUmVhY3QudXNlU3RhdGUoLTEpO1xuICAgIGNvbnN0IGNvbnRhaW5lclJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICBjb25zdCBzZWFyY2hJbnB1dFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICBjb25zdCBkcm9wZG93blJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICBjb25zdCBzZWxlY3RJZCA9IGlkIHx8IGBzZWxlY3QtJHtSZWFjdC51c2VJZCgpfWA7XG4gICAgY29uc3QgZXJyb3JJZCA9IGVycm9yID8gYCR7c2VsZWN0SWR9LWVycm9yYCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBoZWxwZXJUZXh0SWQgPSBoZWxwZXJUZXh0ID8gYCR7c2VsZWN0SWR9LWhlbHBlcmAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgaGFzRXJyb3IgPSAhIWVycm9yO1xuICAgIGNvbnN0IGN1cnJlbnRWYXJpYW50ID0gaGFzRXJyb3IgPyAnZXJyb3InIDogdmFyaWFudDtcbiAgICAvLyBOb3JtYWxpemUgdmFsdWUgdG8gYXJyYXkgZm9yIGVhc2llciBoYW5kbGluZ1xuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWVzID0gUmVhY3QudXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG4gICAgfSwgW3ZhbHVlXSk7XG4gICAgLy8gRmlsdGVyIG9wdGlvbnMgYmFzZWQgb24gc2VhcmNoIHF1ZXJ5XG4gICAgY29uc3QgZmlsdGVyZWRPcHRpb25zID0gUmVhY3QudXNlTWVtbygoKSA9PiB7XG4gICAgICAgIGlmICghc2VhcmNoUXVlcnkpXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24ubGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgfSwgW29wdGlvbnMsIHNlYXJjaFF1ZXJ5XSk7XG4gICAgLy8gR2V0IGRpc3BsYXkgdGV4dCBmb3Igc2VsZWN0ZWQgdmFsdWVzXG4gICAgY29uc3QgZGlzcGxheVRleHQgPSBSZWFjdC51c2VNZW1vKCgpID0+IHtcbiAgICAgICAgaWYgKHNlbGVjdGVkVmFsdWVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBwbGFjZWhvbGRlcjtcbiAgICAgICAgaWYgKG11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRWYWx1ZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gb3B0aW9ucy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHNlbGVjdGVkVmFsdWVzWzBdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uPy5sYWJlbCB8fCBwbGFjZWhvbGRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBgJHtzZWxlY3RlZFZhbHVlcy5sZW5ndGh9IHNlbGVjdGVkYDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gc2VsZWN0ZWRWYWx1ZXNbMF0pO1xuICAgICAgICByZXR1cm4gb3B0aW9uPy5sYWJlbCB8fCBwbGFjZWhvbGRlcjtcbiAgICB9LCBbc2VsZWN0ZWRWYWx1ZXMsIG9wdGlvbnMsIHBsYWNlaG9sZGVyLCBtdWx0aXBsZV0pO1xuICAgIC8vIEhhbmRsZSBvcHRpb24gc2VsZWN0aW9uXG4gICAgY29uc3QgaGFuZGxlU2VsZWN0ID0gKG9wdGlvblZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChkaXNhYmxlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IG5ld1ZhbHVlO1xuICAgICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFZhbHVlcy5pbmNsdWRlcyhvcHRpb25WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHNlbGVjdGVkVmFsdWVzLmZpbHRlcih2ID0+IHYgIT09IG9wdGlvblZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gWy4uLnNlbGVjdGVkVmFsdWVzLCBvcHRpb25WYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IG9wdGlvblZhbHVlO1xuICAgICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBvbkNoYW5nZT8uKG5ld1ZhbHVlKTtcbiAgICAgICAgc2V0U2VhcmNoUXVlcnkoXCJcIik7XG4gICAgfTtcbiAgICAvLyBIYW5kbGUgcmVtb3ZpbmcgYSBzZWxlY3RlZCB2YWx1ZSAoZm9yIG11bHRpcGxlIHNlbGVjdClcbiAgICBjb25zdCBoYW5kbGVSZW1vdmUgPSAob3B0aW9uVmFsdWUsIGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKGRpc2FibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHNlbGVjdGVkVmFsdWVzLmZpbHRlcih2ID0+IHYgIT09IG9wdGlvblZhbHVlKTtcbiAgICAgICAgb25DaGFuZ2U/LihuZXdWYWx1ZSk7XG4gICAgfTtcbiAgICAvLyBIYW5kbGUga2V5Ym9hcmQgbmF2aWdhdGlvblxuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZSkgPT4ge1xuICAgICAgICBpZiAoZGlzYWJsZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHN3aXRjaCAoZS5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZvY3VzZWRJbmRleCA+PSAwICYmIGZvY3VzZWRJbmRleCA8IGZpbHRlcmVkT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0KGZpbHRlcmVkT3B0aW9uc1tmb2N1c2VkSW5kZXhdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNldFNlYXJjaFF1ZXJ5KFwiXCIpO1xuICAgICAgICAgICAgICAgIHNldEZvY3VzZWRJbmRleCgtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzT3Blbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRGb2N1c2VkSW5kZXgocHJldiA9PiBwcmV2IDwgZmlsdGVyZWRPcHRpb25zLmxlbmd0aCAtIDEgPyBwcmV2ICsgMSA6IHByZXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEZvY3VzZWRJbmRleChwcmV2ID0+IHByZXYgPiAwID8gcHJldiAtIDEgOiAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoUXVlcnkoXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBDbG9zZSBkcm9wZG93biB3aGVuIGNsaWNraW5nIG91dHNpZGVcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVDbGlja091dHNpZGUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCAmJiAhY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgc2V0U2VhcmNoUXVlcnkoXCJcIik7XG4gICAgICAgICAgICAgICAgc2V0Rm9jdXNlZEluZGV4KC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGlzT3Blbikge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlQ2xpY2tPdXRzaWRlKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVDbGlja091dHNpZGUpO1xuICAgICAgICB9XG4gICAgfSwgW2lzT3Blbl0pO1xuICAgIC8vIEZvY3VzIHNlYXJjaCBpbnB1dCB3aGVuIGRyb3Bkb3duIG9wZW5zXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGlzT3BlbiAmJiBzZWFyY2hhYmxlICYmIHNlYXJjaElucHV0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0UmVmLmN1cnJlbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH0sIFtpc09wZW4sIHNlYXJjaGFibGVdKTtcbiAgICAvLyBTY3JvbGwgZm9jdXNlZCBvcHRpb24gaW50byB2aWV3XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA+PSAwICYmIGRyb3Bkb3duUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gZHJvcGRvd25SZWYuY3VycmVudC5jaGlsZHJlbltmb2N1c2VkSW5kZXhdO1xuICAgICAgICAgICAgaWYgKGZvY3VzZWRFbGVtZW50ICYmIGZvY3VzZWRFbGVtZW50LnNjcm9sbEludG9WaWV3KSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZEVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW2ZvY3VzZWRJbmRleF0pO1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyByZWY6IGNvbnRhaW5lclJlZiwgY2xhc3NOYW1lOiBjbihcInNwYWNlLXktMVwiLCBmdWxsV2lkdGggJiYgXCJ3LWZ1bGxcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMsIGNoaWxkcmVuOiBbbGFiZWwgJiYgKF9qc3hzKFwibGFiZWxcIiwgeyBodG1sRm9yOiBzZWxlY3RJZCwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTcwMFwiLCBjaGlsZHJlbjogW2xhYmVsLCByZXF1aXJlZCAmJiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWVycm9yLTUwMCBtbC0xXCIsIFwiYXJpYS1sYWJlbFwiOiBcInJlcXVpcmVkXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyZWxhdGl2ZVwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgcmVmOiByZWYsIGlkOiBzZWxlY3RJZCwgcm9sZTogXCJjb21ib2JveFwiLCBcImFyaWEtZXhwYW5kZWRcIjogaXNPcGVuLCBcImFyaWEtaGFzcG9wdXBcIjogXCJsaXN0Ym94XCIsIFwiYXJpYS1jb250cm9sc1wiOiBgJHtzZWxlY3RJZH0tbGlzdGJveGAsIFwiYXJpYS1pbnZhbGlkXCI6IGhhc0Vycm9yLCBcImFyaWEtZGVzY3JpYmVkYnlcIjogY24oZXJyb3JJZCAmJiBlcnJvcklkLCBoZWxwZXJUZXh0SWQgJiYgaGVscGVyVGV4dElkKSB8fCB1bmRlZmluZWQsIFwiYXJpYS1yZXF1aXJlZFwiOiByZXF1aXJlZCwgXCJhcmlhLWRpc2FibGVkXCI6IGRpc2FibGVkLCB0YWJJbmRleDogZGlzYWJsZWQgPyAtMSA6IDAsIGNsYXNzTmFtZTogY24oc2VsZWN0VHJpZ2dlclZhcmlhbnRzKHsgdmFyaWFudDogY3VycmVudFZhcmlhbnQsIHNpemUgfSksIGRpc2FibGVkICYmIFwiYmctbmV1dHJhbC0xMDAgdGV4dC1uZXV0cmFsLTUwMCBjdXJzb3Itbm90LWFsbG93ZWQgb3BhY2l0eS02MFwiLCBjbGFzc05hbWUpLCBvbkNsaWNrOiAoKSA9PiAhZGlzYWJsZWQgJiYgc2V0SXNPcGVuKCFpc09wZW4pLCBvbktleURvd246IGhhbmRsZUtleURvd24sIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTEgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgZmxleC13cmFwIG1pbi1oLTBcIiwgY2hpbGRyZW46IG11bHRpcGxlICYmIHNlbGVjdGVkVmFsdWVzLmxlbmd0aCA+IDAgPyAoc2VsZWN0ZWRWYWx1ZXMubWFwKHZhbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zLmZpbmQob3B0ID0+IG9wdC52YWx1ZSA9PT0gdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb24gPyAoX2pzeHMoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yIHB5LTAuNSBiZy1wcmltYXJ5LTEwMCB0ZXh0LXByaW1hcnktNzAwIHJvdW5kZWQgdGV4dC1zbVwiLCBjaGlsZHJlbjogW29wdGlvbi5sYWJlbCwgX2pzeChcImJ1dHRvblwiLCB7IHR5cGU6IFwiYnV0dG9uXCIsIG9uQ2xpY2s6IChlKSA9PiBoYW5kbGVSZW1vdmUodmFsLCBlKSwgY2xhc3NOYW1lOiBcImhvdmVyOmJnLXByaW1hcnktMjAwIHJvdW5kZWQtZnVsbCBwLTAuNSB0cmFuc2l0aW9uLWNvbG9yc1wiLCBcImFyaWEtbGFiZWxcIjogYFJlbW92ZSAke29wdGlvbi5sYWJlbH1gLCBjaGlsZHJlbjogX2pzeChYLCB7IGNsYXNzTmFtZTogXCJoLTMgdy0zXCIgfSkgfSldIH0sIHZhbCkpIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpIDogKF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBjbihcInRydW5jYXRlXCIsIHNlbGVjdGVkVmFsdWVzLmxlbmd0aCA9PT0gMCAmJiBcInRleHQtbmV1dHJhbC00MDBcIiksIGNoaWxkcmVuOiBkaXNwbGF5VGV4dCB9KSkgfSksIF9qc3goQ2hldnJvbkRvd24sIHsgY2xhc3NOYW1lOiBjbihcImgtNCB3LTQgdGV4dC1uZXV0cmFsLTUwMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0yMDAgZmxleC1zaHJpbmstMCBtbC0yXCIsIGlzT3BlbiAmJiBcInRyYW5zZm9ybSByb3RhdGUtMTgwXCIpLCBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiIH0pXSB9KSwgaXNPcGVuICYmIChfanN4cyhcImRpdlwiLCB7IGlkOiBgJHtzZWxlY3RJZH0tbGlzdGJveGAsIHJvbGU6IFwibGlzdGJveFwiLCBcImFyaWEtbXVsdGlzZWxlY3RhYmxlXCI6IG11bHRpcGxlLCBjbGFzc05hbWU6IFwiYWJzb2x1dGUgei01MCB3LWZ1bGwgbXQtMSBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMzAwIHJvdW5kZWQtbGcgc2hhZG93LWxnIG1heC1oLTYwIG92ZXJmbG93LWF1dG8gYW5pbWF0ZS1pbiBmYWRlLWluLTAgem9vbS1pbi05NVwiLCBjaGlsZHJlbjogW3NlYXJjaGFibGUgJiYgKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3RpY2t5IHRvcC0wIGJnLXdoaXRlIGJvcmRlci1iIGJvcmRlci1uZXV0cmFsLTIwMCBwLTJcIiwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJlbGF0aXZlXCIsIGNoaWxkcmVuOiBbX2pzeChTZWFyY2gsIHsgY2xhc3NOYW1lOiBcImFic29sdXRlIGxlZnQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzIgaC00IHctNCB0ZXh0LW5ldXRyYWwtNDAwXCIsIFwiYXJpYS1oaWRkZW5cIjogXCJ0cnVlXCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHJlZjogc2VhcmNoSW5wdXRSZWYsIHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogc2VhcmNoUXVlcnksIG9uQ2hhbmdlOiAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Rm9jdXNlZEluZGV4KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBwbGFjZWhvbGRlcjogXCJTZWFyY2guLi5cIiwgY2xhc3NOYW1lOiBcInctZnVsbCBwbC05IHByLTMgcHktMS41IHRleHQtc20gYm9yZGVyIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBmb2N1czpib3JkZXItcHJpbWFyeS01MDBcIiwgb25DbGljazogKGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCksIFwiYXJpYS1sYWJlbFwiOiBcIlNlYXJjaCBvcHRpb25zXCIgfSldIH0pIH0pKSwgX2pzeChcImRpdlwiLCB7IHJlZjogZHJvcGRvd25SZWYsIGNoaWxkcmVuOiBmaWx0ZXJlZE9wdGlvbnMubGVuZ3RoID09PSAwID8gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicHgtNCBweS0zIHRleHQtc20gdGV4dC1uZXV0cmFsLTUwMCB0ZXh0LWNlbnRlclwiLCBjaGlsZHJlbjogXCJObyBvcHRpb25zIGZvdW5kXCIgfSkpIDogKGZpbHRlcmVkT3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZFZhbHVlcy5pbmNsdWRlcyhvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNGb2N1c2VkID0gaW5kZXggPT09IGZvY3VzZWRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyByb2xlOiBcIm9wdGlvblwiLCBcImFyaWEtc2VsZWN0ZWRcIjogaXNTZWxlY3RlZCwgXCJhcmlhLWRpc2FibGVkXCI6IG9wdGlvbi5kaXNhYmxlZCwgY2xhc3NOYW1lOiBjbihcImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC00IHB5LTIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIiwgaXNTZWxlY3RlZCAmJiBcImJnLXByaW1hcnktNTAgdGV4dC1wcmltYXJ5LTcwMFwiLCAhaXNTZWxlY3RlZCAmJiAhb3B0aW9uLmRpc2FibGVkICYmIFwiaG92ZXI6YmctbmV1dHJhbC01MFwiLCBpc0ZvY3VzZWQgJiYgXCJiZy1uZXV0cmFsLTEwMFwiLCBvcHRpb24uZGlzYWJsZWQgJiYgXCJvcGFjaXR5LTUwIGN1cnNvci1ub3QtYWxsb3dlZFwiKSwgb25DbGljazogKCkgPT4gIW9wdGlvbi5kaXNhYmxlZCAmJiBoYW5kbGVTZWxlY3Qob3B0aW9uLnZhbHVlKSwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtXCIsIGNoaWxkcmVuOiBvcHRpb24ubGFiZWwgfSksIGlzU2VsZWN0ZWQgJiYgKF9qc3goQ2hlY2ssIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1wcmltYXJ5LTYwMFwiLCBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiIH0pKV0gfSwgb3B0aW9uLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSB9KV0gfSkpXSB9KSwgZXJyb3IgJiYgKF9qc3goXCJwXCIsIHsgaWQ6IGVycm9ySWQsIGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZXJyb3ItNjAwXCIsIHJvbGU6IFwiYWxlcnRcIiwgY2hpbGRyZW46IGVycm9yIH0pKSwgaGVscGVyVGV4dCAmJiAhZXJyb3IgJiYgKF9qc3goXCJwXCIsIHsgaWQ6IGhlbHBlclRleHRJZCwgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTUwMFwiLCBjaGlsZHJlbjogaGVscGVyVGV4dCB9KSldIH0pKTtcbn0pO1xuU2VsZWN0LmRpc3BsYXlOYW1lID0gXCJTZWxlY3RcIjtcbmV4cG9ydCB7IFNlbGVjdCwgc2VsZWN0VHJpZ2dlclZhcmlhbnRzIH07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgY24gfSBmcm9tICcuLi8uLi9saWIvdXRpbHMnO1xuLyoqXG4gKiBTa2VsZXRvbiBDb21wb25lbnRcbiAqXG4gKiBBIHBsYWNlaG9sZGVyIGNvbXBvbmVudCBmb3IgbG9hZGluZyBzdGF0ZXMgdGhhdCBtaW1pY3MgdGhlIHNoYXBlIG9mIGNvbnRlbnQuXG4gKiBQcm92aWRlcyBhIGJldHRlciB1c2VyIGV4cGVyaWVuY2UgdGhhbiBzcGlubmVycyBmb3IgcGFnZSBsb2Fkcy5cbiAqXG4gKiBAcGFyYW0gY2xhc3NOYW1lIC0gQWRkaXRpb25hbCBDU1MgY2xhc3Nlc1xuICogQHBhcmFtIHZhcmlhbnQgLSBTaGFwZSBvZiB0aGUgc2tlbGV0b24gKHRleHQsIGNpcmN1bGFyLCByZWN0YW5ndWxhcilcbiAqIEBwYXJhbSB3aWR0aCAtIFdpZHRoIG9mIHRoZSBza2VsZXRvblxuICogQHBhcmFtIGhlaWdodCAtIEhlaWdodCBvZiB0aGUgc2tlbGV0b25cbiAqIEBwYXJhbSBhbmltYXRpb24gLSBBbmltYXRpb24gdHlwZSAocHVsc2UsIHdhdmUsIG5vbmUpXG4gKi9cbmV4cG9ydCBjb25zdCBTa2VsZXRvbiA9ICh7IGNsYXNzTmFtZSA9ICcnLCB2YXJpYW50ID0gJ3JlY3Rhbmd1bGFyJywgd2lkdGgsIGhlaWdodCwgYW5pbWF0aW9uID0gJ3B1bHNlJywgfSkgPT4ge1xuICAgIGNvbnN0IHZhcmlhbnRDbGFzc2VzID0ge1xuICAgICAgICB0ZXh0OiAncm91bmRlZCcsXG4gICAgICAgIGNpcmN1bGFyOiAncm91bmRlZC1mdWxsJyxcbiAgICAgICAgcmVjdGFuZ3VsYXI6ICdyb3VuZGVkLWxnJyxcbiAgICB9O1xuICAgIGNvbnN0IGFuaW1hdGlvbkNsYXNzZXMgPSB7XG4gICAgICAgIHB1bHNlOiAnYW5pbWF0ZS1wdWxzZScsXG4gICAgICAgIHdhdmU6ICdhbmltYXRlLXNoaW1tZXInLFxuICAgICAgICBub25lOiAnJyxcbiAgICB9O1xuICAgIGNvbnN0IHN0eWxlID0ge307XG4gICAgaWYgKHdpZHRoKVxuICAgICAgICBzdHlsZS53aWR0aCA9IHR5cGVvZiB3aWR0aCA9PT0gJ251bWJlcicgPyBgJHt3aWR0aH1weGAgOiB3aWR0aDtcbiAgICBpZiAoaGVpZ2h0KVxuICAgICAgICBzdHlsZS5oZWlnaHQgPSB0eXBlb2YgaGVpZ2h0ID09PSAnbnVtYmVyJyA/IGAke2hlaWdodH1weGAgOiBoZWlnaHQ7XG4gICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbignYmctbmV1dHJhbC0yMDAnLCB2YXJpYW50Q2xhc3Nlc1t2YXJpYW50XSwgYW5pbWF0aW9uQ2xhc3Nlc1thbmltYXRpb25dLCBjbGFzc05hbWUpLCBzdHlsZTogc3R5bGUsIHJvbGU6IFwic3RhdHVzXCIsIFwiYXJpYS1sYWJlbFwiOiBcIkxvYWRpbmdcIiwgY2hpbGRyZW46IF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInNyLW9ubHlcIiwgY2hpbGRyZW46IFwiTG9hZGluZy4uLlwiIH0pIH0pKTtcbn07XG4vKipcbiAqIFNrZWxldG9uVGV4dCBDb21wb25lbnRcbiAqXG4gKiBTa2VsZXRvbiBmb3IgdGV4dCBjb250ZW50IHdpdGggbXVsdGlwbGUgbGluZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBTa2VsZXRvblRleHQgPSAoeyBsaW5lcyA9IDMsIGNsYXNzTmFtZSA9ICcnIH0pID0+IHtcbiAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNuKCdzcGFjZS15LTInLCBjbGFzc05hbWUpLCBjaGlsZHJlbjogQXJyYXkuZnJvbSh7IGxlbmd0aDogbGluZXMgfSkubWFwKChfLCBpbmRleCkgPT4gKF9qc3goU2tlbGV0b24sIHsgdmFyaWFudDogXCJ0ZXh0XCIsIGhlaWdodDogMTYsIHdpZHRoOiBpbmRleCA9PT0gbGluZXMgLSAxID8gJzgwJScgOiAnMTAwJScgfSwgaW5kZXgpKSkgfSkpO1xufTtcbi8qKlxuICogU2tlbGV0b25DYXJkIENvbXBvbmVudFxuICpcbiAqIFNrZWxldG9uIGZvciBjYXJkIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBjb25zdCBTa2VsZXRvbkNhcmQgPSAoeyBjbGFzc05hbWUgPSAnJywgaGFzSW1hZ2UgPSBmYWxzZSB9KSA9PiB7XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oJ2JnLXdoaXRlIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCBvdmVyZmxvdy1oaWRkZW4nLCBjbGFzc05hbWUpLCBjaGlsZHJlbjogW2hhc0ltYWdlICYmIF9qc3goU2tlbGV0b24sIHsgdmFyaWFudDogXCJyZWN0YW5ndWxhclwiLCBoZWlnaHQ6IDE5MiwgY2xhc3NOYW1lOiBcInJvdW5kZWQtbm9uZVwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwLTYgc3BhY2UteS00XCIsIGNoaWxkcmVuOiBbX2pzeChTa2VsZXRvbiwgeyB2YXJpYW50OiBcInRleHRcIiwgaGVpZ2h0OiAyNCwgd2lkdGg6IFwiNjAlXCIgfSksIF9qc3goU2tlbGV0b25UZXh0LCB7IGxpbmVzOiAyIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goU2tlbGV0b24sIHsgdmFyaWFudDogXCJjaXJjdWxhclwiLCB3aWR0aDogMzIsIGhlaWdodDogMzIgfSksIF9qc3goU2tlbGV0b24sIHsgdmFyaWFudDogXCJ0ZXh0XCIsIGhlaWdodDogMTYsIHdpZHRoOiBcIjQwJVwiIH0pXSB9KV0gfSldIH0pKTtcbn07XG4vKipcbiAqIFNrZWxldG9uVGFibGUgQ29tcG9uZW50XG4gKlxuICogU2tlbGV0b24gZm9yIHRhYmxlIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBjb25zdCBTa2VsZXRvblRhYmxlID0gKHsgcm93cyA9IDUsIGNvbHVtbnMgPSA1LCBjbGFzc05hbWUgPSAnJyB9KSA9PiB7XG4gICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbignb3ZlcmZsb3cteC1hdXRvIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCcsIGNsYXNzTmFtZSksIGNoaWxkcmVuOiBfanN4cyhcInRhYmxlXCIsIHsgY2xhc3NOYW1lOiBcIm1pbi13LWZ1bGwgZGl2aWRlLXkgZGl2aWRlLW5ldXRyYWwtMjAwXCIsIGNoaWxkcmVuOiBbX2pzeChcInRoZWFkXCIsIHsgY2xhc3NOYW1lOiBcImJnLW5ldXRyYWwtNTBcIiwgY2hpbGRyZW46IF9qc3goXCJ0clwiLCB7IGNoaWxkcmVuOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBjb2x1bW5zIH0pLm1hcCgoXywgaW5kZXgpID0+IChfanN4KFwidGhcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS0zXCIsIGNoaWxkcmVuOiBfanN4KFNrZWxldG9uLCB7IHZhcmlhbnQ6IFwidGV4dFwiLCBoZWlnaHQ6IDE2LCB3aWR0aDogXCI4MCVcIiB9KSB9LCBpbmRleCkpKSB9KSB9KSwgX2pzeChcInRib2R5XCIsIHsgY2xhc3NOYW1lOiBcImJnLXdoaXRlIGRpdmlkZS15IGRpdmlkZS1uZXV0cmFsLTIwMFwiLCBjaGlsZHJlbjogQXJyYXkuZnJvbSh7IGxlbmd0aDogcm93cyB9KS5tYXAoKF8sIHJvd0luZGV4KSA9PiAoX2pzeChcInRyXCIsIHsgY2hpbGRyZW46IEFycmF5LmZyb20oeyBsZW5ndGg6IGNvbHVtbnMgfSkubWFwKChfLCBjb2xJbmRleCkgPT4gKF9qc3goXCJ0ZFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTRcIiwgY2hpbGRyZW46IF9qc3goU2tlbGV0b24sIHsgdmFyaWFudDogXCJ0ZXh0XCIsIGhlaWdodDogMTYsIHdpZHRoOiBcIjkwJVwiIH0pIH0sIGNvbEluZGV4KSkpIH0sIHJvd0luZGV4KSkpIH0pXSB9KSB9KSk7XG59O1xuLyoqXG4gKiBTa2VsZXRvbkF2YXRhciBDb21wb25lbnRcbiAqXG4gKiBTa2VsZXRvbiBmb3IgYXZhdGFyL3Byb2ZpbGUgcGljdHVyZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBTa2VsZXRvbkF2YXRhciA9ICh7IHNpemUgPSAnbWQnLCBjbGFzc05hbWUgPSAnJyB9KSA9PiB7XG4gICAgY29uc3Qgc2l6ZUNsYXNzZXMgPSB7XG4gICAgICAgIHNtOiAndy04IGgtOCcsXG4gICAgICAgIG1kOiAndy0xMiBoLTEyJyxcbiAgICAgICAgbGc6ICd3LTE2IGgtMTYnLFxuICAgICAgICB4bDogJ3ctMjQgaC0yNCcsXG4gICAgfTtcbiAgICByZXR1cm4gKF9qc3goU2tlbGV0b24sIHsgdmFyaWFudDogXCJjaXJjdWxhclwiLCBjbGFzc05hbWU6IGNuKHNpemVDbGFzc2VzW3NpemVdLCBjbGFzc05hbWUpIH0pKTtcbn07XG4vKipcbiAqIFNrZWxldG9uTGlzdCBDb21wb25lbnRcbiAqXG4gKiBTa2VsZXRvbiBmb3IgbGlzdCBpdGVtcy5cbiAqL1xuZXhwb3J0IGNvbnN0IFNrZWxldG9uTGlzdCA9ICh7IGl0ZW1zID0gNSwgY2xhc3NOYW1lID0gJycgfSkgPT4ge1xuICAgIHJldHVybiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oJ3NwYWNlLXktNCcsIGNsYXNzTmFtZSksIGNoaWxkcmVuOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBpdGVtcyB9KS5tYXAoKF8sIGluZGV4KSA9PiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4KFNrZWxldG9uQXZhdGFyLCB7IHNpemU6IFwibWRcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xIHNwYWNlLXktMlwiLCBjaGlsZHJlbjogW19qc3goU2tlbGV0b24sIHsgdmFyaWFudDogXCJ0ZXh0XCIsIGhlaWdodDogMTYsIHdpZHRoOiBcIjQwJVwiIH0pLCBfanN4KFNrZWxldG9uLCB7IHZhcmlhbnQ6IFwidGV4dFwiLCBoZWlnaHQ6IDE0LCB3aWR0aDogXCI2MCVcIiB9KV0gfSldIH0sIGluZGV4KSkpIH0pKTtcbn07XG4iLCJpbXBvcnQgYXBpIGZyb20gJy4vYXBpJztcbi8qKlxuICogRXZlbnQgQVBJIGNsaWVudFxuICpcbiAqIFByb3ZpZGVzIG1ldGhvZHMgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIGV2ZW50cyBBUEkgZW5kcG9pbnRzLlxuICovXG5leHBvcnQgY29uc3QgZXZlbnRBcGkgPSB7XG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBldmVudHNcbiAgICAgKi9cbiAgICBhc3luYyBnZXRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL2V2ZW50cycpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhIHx8IFtdO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogR2V0IGEgc2luZ2xlIGV2ZW50IGJ5IElEXG4gICAgICovXG4gICAgYXN5bmMgZ2V0RXZlbnQoaWQpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvZXZlbnRzLyR7aWR9YCk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZXZlbnRcbiAgICAgKi9cbiAgICBhc3luYyBjcmVhdGVFdmVudChkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdldmVudEFwaS5jcmVhdGVFdmVudCBjYWxsZWQgd2l0aDonLCBkYXRhKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdCgnL2V2ZW50cycsIGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZygnZXZlbnRBcGkuY3JlYXRlRXZlbnQgcmVzcG9uc2U6JywgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgZXZlbnRcbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVFdmVudChpZCwgZGF0YSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoYC9ldmVudHMvJHtpZH1gLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhbiBldmVudFxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZUV2ZW50KGlkKSB7XG4gICAgICAgIGF3YWl0IGFwaS5kZWxldGUoYC9ldmVudHMvJHtpZH1gKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIE1hcmsgYW4gZXZlbnQgYXMgY29tcGxldGVkXG4gICAgICovXG4gICAgYXN5bmMgY29tcGxldGVFdmVudChpZCwgYXR0ZW5kYW5jZUNvdW50KSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnB1dChgL2V2ZW50cy8ke2lkfS9jb21wbGV0ZWAsIHtcbiAgICAgICAgICAgIGF0dGVuZGFuY2VfY291bnQ6IGF0dGVuZGFuY2VDb3VudCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgfSxcbn07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFBsdXMsIENhbGVuZGFyLCBNYXBQaW4sIENsb2NrLCBVc2VycywgRWRpdCwgQ2hlY2tDaXJjbGUsIExpc3QsIExheW91dEdyaWQsIEV5ZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyB1c2VBdXRoIH0gZnJvbSAnLi4vY29udGV4dHMvQXV0aENvbnRleHQnO1xuaW1wb3J0IHsgdXNlVG9hc3QgfSBmcm9tICcuLi9jb250ZXh0cy9Ub2FzdENvbnRleHQnO1xuaW1wb3J0IHsgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvYnV0dG9uJztcbmltcG9ydCB7IENhcmQgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2NhcmQnO1xuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9zZWxlY3QnO1xuaW1wb3J0IHsgU2tlbGV0b25DYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9za2VsZXRvbic7XG5pbXBvcnQgeyBldmVudEFwaSB9IGZyb20gJy4uL2xpYi9ldmVudEFwaSc7XG5pbXBvcnQgRXZlbnRGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvZXZlbnRzL0V2ZW50Rm9ybSc7XG5pbXBvcnQgQ29tcGxldGVFdmVudERpYWxvZyBmcm9tICcuLi9jb21wb25lbnRzL2V2ZW50cy9Db21wbGV0ZUV2ZW50RGlhbG9nJztcbmltcG9ydCBBcmNoaXZlQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvYXJjaGl2ZS9BcmNoaXZlQnV0dG9uJztcbmltcG9ydCBDYWxlbmRhclZpZXcgZnJvbSAnLi4vY29tcG9uZW50cy9ldmVudHMvQ2FsZW5kYXJWaWV3Jztcbi8qKlxuICogRXZlbnRzIFBhZ2UgQ29tcG9uZW50XG4gKlxuICogRGlzcGxheXMgYSBsaXN0IG9mIHVwY29taW5nIGFuZCBwYXN0IGNodXJjaCBldmVudHMgd2l0aCBtYW5hZ2VtZW50IGNhcGFiaWxpdGllcy5cbiAqIEltcGxlbWVudHMgdGhlIEV2ZW50cyBQYWdlIERlc2lnbiBmcm9tIHRoZSBNb2Rlcm4gVUkvVVggUmVkZXNpZ24gc3BlYy5cbiAqXG4gKiBMYXlvdXQgU3RydWN0dXJlOlxuICogLSBQYWdlIGhlYWRlciB3aXRoIFwiQ3JlYXRlIEV2ZW50XCIgYW5kIFwiQ2FsZW5kYXIgVmlld1wiIGJ1dHRvbnNcbiAqIC0gRmlsdGVyIGJhciB3aXRoIFRpbWUgUmFuZ2UsIENhdGVnb3J5LCBhbmQgU3RhdHVzIGZpbHRlcnNcbiAqIC0gVmlldyBtb2RlIHRvZ2dsZSAoTGlzdCAvIENhbGVuZGFyIC8gR3JpZClcbiAqIC0gRXZlbnQgY2FyZHMgaW4gc2VsZWN0ZWQgdmlldyBtb2RlXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIERpc3BsYXkgbGlzdCBvZiB1cGNvbWluZyBldmVudHMgKHNvcnRlZCBjaHJvbm9sb2dpY2FsbHkpXG4gKiAtIERpc3BsYXkgbGlzdCBvZiBwYXN0IGV2ZW50c1xuICogLSBGaWx0ZXIgZXZlbnRzIGJ5IHRpbWUgcmFuZ2UsIGNhdGVnb3J5LCBhbmQgc3RhdHVzXG4gKiAtIFRvZ2dsZSBiZXR3ZWVuIExpc3QsIENhbGVuZGFyLCBhbmQgR3JpZCB2aWV3c1xuICogLSBBZGQgRXZlbnQgYnV0dG9uIGZvciBjcmVhdGluZyBuZXcgZXZlbnRzIChhZG1pbiBvbmx5KVxuICogLSBWaWV3IGV2ZW50IGRldGFpbHNcbiAqIC0gUmVzcG9uc2l2ZSBsYXlvdXRcbiAqXG4gKiBEZXNpZ24gUmVmZXJlbmNlOiBFdmVudHMgUGFnZSBEZXNpZ24gc2VjdGlvblxuICogVmFsaWRhdGVzIFJlcXVpcmVtZW50czogOS4xLCA5LjJcbiAqIFRhc2s6IDEyLjEgQ3JlYXRlIEV2ZW50cyBwYWdlIGxheW91dFxuICovXG5jb25zdCBFdmVudHMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB1c2VyIH0gPSB1c2VBdXRoKCk7XG4gICAgY29uc3QgeyBzaG93VG9hc3QgfSA9IHVzZVRvYXN0KCk7XG4gICAgY29uc3QgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xuICAgIGNvbnN0IGlzQWRtaW4gPSB1c2VyPy5yb2xlID09PSAnYWRtaW4nO1xuICAgIC8vIFN0YXRlIG1hbmFnZW1lbnRcbiAgICBjb25zdCBbZXZlbnRzLCBzZXRFdmVudHNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbaXNGb3JtT3Blbiwgc2V0SXNGb3JtT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3NlbGVjdGVkRXZlbnQsIHNldFNlbGVjdGVkRXZlbnRdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW2lzQ29tcGxldGVEaWFsb2dPcGVuLCBzZXRJc0NvbXBsZXRlRGlhbG9nT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2V2ZW50VG9Db21wbGV0ZSwgc2V0RXZlbnRUb0NvbXBsZXRlXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIC8vIEZpbHRlciBhbmQgdmlldyBzdGF0ZVxuICAgIGNvbnN0IFt0aW1lUmFuZ2VGaWx0ZXIsIHNldFRpbWVSYW5nZUZpbHRlcl0gPSB1c2VTdGF0ZSgndXBjb21pbmcnKTtcbiAgICBjb25zdCBbY2F0ZWdvcnlGaWx0ZXIsIHNldENhdGVnb3J5RmlsdGVyXSA9IHVzZVN0YXRlKCdhbGwnKTtcbiAgICBjb25zdCBbc3RhdHVzRmlsdGVyLCBzZXRTdGF0dXNGaWx0ZXJdID0gdXNlU3RhdGUoJ2FsbCcpO1xuICAgIGNvbnN0IFt2aWV3TW9kZSwgc2V0Vmlld01vZGVdID0gdXNlU3RhdGUoJ2dyaWQnKTtcbiAgICAvKipcbiAgICAgKiBMb2FkIGV2ZW50cyBvbiBtb3VudFxuICAgICAqL1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGxvYWRFdmVudHMoKTtcbiAgICB9LCBbXSk7XG4gICAgLyoqXG4gICAgICogRmV0Y2ggZXZlbnRzIGZyb20gQVBJXG4gICAgICovXG4gICAgY29uc3QgbG9hZEV2ZW50cyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBldmVudEFwaS5nZXRFdmVudHMoKTtcbiAgICAgICAgICAgIHNldEV2ZW50cyhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIGxvYWQgZXZlbnRzJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGV2ZW50czonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYWRkIGV2ZW50IGJ1dHRvbiBjbGlja1xuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUFkZENsaWNrID0gKCkgPT4ge1xuICAgICAgICBzZXRTZWxlY3RlZEV2ZW50KG51bGwpO1xuICAgICAgICBzZXRJc0Zvcm1PcGVuKHRydWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGVkaXQgZXZlbnQgYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlRWRpdENsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHNldFNlbGVjdGVkRXZlbnQoZXZlbnQpO1xuICAgICAgICBzZXRJc0Zvcm1PcGVuKHRydWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHZpZXcgZGV0YWlscyBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVWaWV3RGV0YWlscyA9IChldmVudCkgPT4ge1xuICAgICAgICBuYXZpZ2F0ZShgL2V2ZW50cy8ke2V2ZW50LmlkfWApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGZvcm0gY2xvc2VcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVGb3JtQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIHNldElzRm9ybU9wZW4oZmFsc2UpO1xuICAgICAgICBzZXRTZWxlY3RlZEV2ZW50KG51bGwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGZvcm0gc3VibWl0XG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlRm9ybVN1Ym1pdCA9IGFzeW5jIChkYXRhKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXZlbnRzLnRzeDogU3VibWl0dGluZyBldmVudCBkYXRhOicsIGRhdGEpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgZXhpc3RpbmcgZXZlbnRcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBldmVudEFwaS51cGRhdGVFdmVudChzZWxlY3RlZEV2ZW50LmlkLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXZlbnRzLnRzeDogRXZlbnQgdXBkYXRlZDonLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdFdmVudCB1cGRhdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldyBldmVudFxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV2ZW50QXBpLmNyZWF0ZUV2ZW50KGRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFdmVudHMudHN4OiBFdmVudCBjcmVhdGVkIHN1Y2Nlc3NmdWxseTonLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdFdmVudCBjcmVhdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0V2ZW50cy50c3g6IFJlbG9hZGluZyBldmVudHMgbGlzdC4uLicpO1xuICAgICAgICAgICAgYXdhaXQgbG9hZEV2ZW50cygpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0V2ZW50cy50c3g6IEV2ZW50cyBsaXN0IHJlbG9hZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFdmVudHMudHN4OiBFcnJvciBzdWJtaXR0aW5nIGV2ZW50OicsIGVycm9yKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0V2ZW50cy50c3g6IEVycm9yIHJlc3BvbnNlOicsIGVycm9yLnJlc3BvbnNlPy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0V2ZW50cy50c3g6IEVycm9yIHN0YXR1czonLCBlcnJvci5yZXNwb25zZT8uc3RhdHVzKTtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yLnJlc3BvbnNlPy5kYXRhPy5tZXNzYWdlIHx8IGVycm9yLm1lc3NhZ2UgfHwgJ1Vua25vd24gZXJyb3InO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsIHNlbGVjdGVkRXZlbnQgPyAnRmFpbGVkIHRvIHVwZGF0ZSBldmVudDogJyArIGVycm9yTWVzc2FnZSA6ICdGYWlsZWQgdG8gY3JlYXRlIGV2ZW50OiAnICsgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yOyAvLyBSZS10aHJvdyB0byBwcmV2ZW50IGZvcm0gZnJvbSBjbG9zaW5nXG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBkZWxldGUgZXZlbnQgYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlRGVsZXRlQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgLy8gSGFuZGxlZCBieSBBcmNoaXZlQnV0dG9uIGNvbXBvbmVudFxuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFyY2hpdmUgc3VjY2VzcyBjYWxsYmFja1xuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUFyY2hpdmVTdWNjZXNzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBsb2FkRXZlbnRzKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgbWFyayBhcyBjb21wbGV0ZWQgYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQ29tcGxldGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBzZXRFdmVudFRvQ29tcGxldGUoZXZlbnQpO1xuICAgICAgICBzZXRJc0NvbXBsZXRlRGlhbG9nT3Blbih0cnVlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjb21wbGV0ZSBjb25maXJtYXRpb25cbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVDb21wbGV0ZUNvbmZpcm0gPSBhc3luYyAoYXR0ZW5kYW5jZUNvdW50KSA9PiB7XG4gICAgICAgIGlmICghZXZlbnRUb0NvbXBsZXRlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgZXZlbnRBcGkuY29tcGxldGVFdmVudChldmVudFRvQ29tcGxldGUuaWQsIGF0dGVuZGFuY2VDb3VudCk7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnRXZlbnQgbWFya2VkIGFzIGNvbXBsZXRlZCcpO1xuICAgICAgICAgICAgYXdhaXQgbG9hZEV2ZW50cygpO1xuICAgICAgICAgICAgc2V0SXNDb21wbGV0ZURpYWxvZ09wZW4oZmFsc2UpO1xuICAgICAgICAgICAgc2V0RXZlbnRUb0NvbXBsZXRlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gbWFyayBldmVudCBhcyBjb21wbGV0ZWQnKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNvbXBsZXRpbmcgZXZlbnQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7IC8vIFJlLXRocm93IHRvIHByZXZlbnQgZGlhbG9nIGZyb20gY2xvc2luZ1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXBhcmF0ZSBldmVudHMgaW50byB1cGNvbWluZyBhbmQgcGFzdCwgdGhlbiBhcHBseSBmaWx0ZXJzXG4gICAgICovXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBub3cuc2V0SG91cnMoMCwgMCwgMCwgMCk7IC8vIFJlc2V0IHRvIHN0YXJ0IG9mIGRheSBmb3IgYWNjdXJhdGUgY29tcGFyaXNvblxuICAgIC8vIEZpcnN0LCBzZXBhcmF0ZSBieSB0aW1lXG4gICAgbGV0IGZpbHRlcmVkRXZlbnRzID0gZXZlbnRzO1xuICAgIC8vIEFwcGx5IHRpbWUgcmFuZ2UgZmlsdGVyXG4gICAgaWYgKHRpbWVSYW5nZUZpbHRlciA9PT0gJ3VwY29taW5nJykge1xuICAgICAgICBmaWx0ZXJlZEV2ZW50cyA9IGV2ZW50cy5maWx0ZXIoZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXZlbnREYXRlID0gbmV3IERhdGUoZXZlbnQuZXZlbnRfZGF0ZSk7XG4gICAgICAgICAgICBldmVudERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnREYXRlID49IG5vdyAmJiBldmVudC5zdGF0dXMgPT09ICd1cGNvbWluZyc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aW1lUmFuZ2VGaWx0ZXIgPT09ICdwYXN0Jykge1xuICAgICAgICBmaWx0ZXJlZEV2ZW50cyA9IGV2ZW50cy5maWx0ZXIoZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXZlbnREYXRlID0gbmV3IERhdGUoZXZlbnQuZXZlbnRfZGF0ZSk7XG4gICAgICAgICAgICBldmVudERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnREYXRlIDwgbm93IHx8IGV2ZW50LnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBBcHBseSBjYXRlZ29yeSBmaWx0ZXIgKHBsYWNlaG9sZGVyIC0gY2F0ZWdvcmllcyBub3QgeWV0IGluIGRhdGEgbW9kZWwpXG4gICAgaWYgKGNhdGVnb3J5RmlsdGVyICE9PSAnYWxsJykge1xuICAgICAgICAvLyBUT0RPOiBGaWx0ZXIgYnkgY2F0ZWdvcnkgd2hlbiBjYXRlZ29yeSBmaWVsZCBpcyBhZGRlZCB0byBFdmVudCBtb2RlbFxuICAgICAgICAvLyBmaWx0ZXJlZEV2ZW50cyA9IGZpbHRlcmVkRXZlbnRzLmZpbHRlcihldmVudCA9PiBldmVudC5jYXRlZ29yeSA9PT0gY2F0ZWdvcnlGaWx0ZXIpO1xuICAgIH1cbiAgICAvLyBBcHBseSBzdGF0dXMgZmlsdGVyXG4gICAgaWYgKHN0YXR1c0ZpbHRlciAhPT0gJ2FsbCcpIHtcbiAgICAgICAgZmlsdGVyZWRFdmVudHMgPSBmaWx0ZXJlZEV2ZW50cy5maWx0ZXIoZXZlbnQgPT4gZXZlbnQuc3RhdHVzID09PSBzdGF0dXNGaWx0ZXIpO1xuICAgIH1cbiAgICAvLyBTb3J0IGV2ZW50c1xuICAgIGNvbnN0IHNvcnRlZEV2ZW50cyA9IFsuLi5maWx0ZXJlZEV2ZW50c10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBkYXRlQSA9IG5ldyBEYXRlKGEuZXZlbnRfZGF0ZSkuZ2V0VGltZSgpO1xuICAgICAgICBjb25zdCBkYXRlQiA9IG5ldyBEYXRlKGIuZXZlbnRfZGF0ZSkuZ2V0VGltZSgpO1xuICAgICAgICByZXR1cm4gdGltZVJhbmdlRmlsdGVyID09PSAncGFzdCcgPyBkYXRlQiAtIGRhdGVBIDogZGF0ZUEgLSBkYXRlQjtcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBGb3JtYXQgZGF0ZSBmb3IgZGlzcGxheVxuICAgICAqL1xuICAgIGNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZVN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XG4gICAgICAgIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnLCB7XG4gICAgICAgICAgICB3ZWVrZGF5OiAnbG9uZycsXG4gICAgICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICBtb250aDogJ2xvbmcnLFxuICAgICAgICAgICAgZGF5OiAnbnVtZXJpYydcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGb3JtYXQgdGltZSBmb3IgZGlzcGxheVxuICAgICAqL1xuICAgIGNvbnN0IGZvcm1hdFRpbWUgPSAodGltZVN0cmluZykgPT4ge1xuICAgICAgICAvLyBIYW5kbGUgYm90aCBISDptbTpzcyBhbmQgSEg6bW0gZm9ybWF0c1xuICAgICAgICBjb25zdCBbaG91cnMsIG1pbnV0ZXNdID0gdGltZVN0cmluZy5zcGxpdCgnOicpO1xuICAgICAgICBjb25zdCBob3VyID0gcGFyc2VJbnQoaG91cnMsIDEwKTtcbiAgICAgICAgY29uc3QgYW1wbSA9IGhvdXIgPj0gMTIgPyAnUE0nIDogJ0FNJztcbiAgICAgICAgY29uc3QgZGlzcGxheUhvdXIgPSBob3VyICUgMTIgfHwgMTI7XG4gICAgICAgIHJldHVybiBgJHtkaXNwbGF5SG91cn06JHttaW51dGVzfSAke2FtcG19YDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbmRlciBldmVudCBjYXJkXG4gICAgICovXG4gICAgY29uc3QgcmVuZGVyRXZlbnRDYXJkID0gKGV2ZW50LCBpc1Bhc3QgPSBmYWxzZSkgPT4gKF9qc3hzKENhcmQsIHsgY2xhc3NOYW1lOiBgcC02IGhvdmVyOnNoYWRvdy1sZyB0cmFuc2l0aW9uLXNoYWRvdyAke2lzUGFzdCA/ICdvcGFjaXR5LTc1JyA6ICcnfWAsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gbWItNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMVwiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMCBtYi0xXCIsIGNoaWxkcmVuOiBldmVudC50aXRsZSB9KSwgZXZlbnQuc3RhdHVzID09PSAnY29tcGxldGVkJyAmJiBldmVudC5hdHRlbmRhbmNlX2NvdW50ICE9PSBudWxsICYmIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFtfanN4KFVzZXJzLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIF9qc3hzKFwic3BhblwiLCB7IGNoaWxkcmVuOiBbZXZlbnQuYXR0ZW5kYW5jZV9jb3VudCwgXCIgYXR0ZW5kZWVzXCJdIH0pXSB9KSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW2V2ZW50LnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgJiYgKF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImJnLXN1Y2Nlc3MtMTAwIHRleHQtc3VjY2Vzcy04MDAgdGV4dC14cyBmb250LW1lZGl1bSBweC0yLjUgcHktMC41IHJvdW5kZWRcIiwgY2hpbGRyZW46IFwiQ29tcGxldGVkXCIgfSkpLCBldmVudC5zdGF0dXMgPT09ICdjYW5jZWxsZWQnICYmIChfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJiZy1lcnJvci0xMDAgdGV4dC1lcnJvci04MDAgdGV4dC14cyBmb250LW1lZGl1bSBweC0yLjUgcHktMC41IHJvdW5kZWRcIiwgY2hpbGRyZW46IFwiQ2FuY2VsbGVkXCIgfSkpLCBldmVudC5zdGF0dXMgPT09ICd1cGNvbWluZycgJiYgKF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImJnLXByaW1hcnktMTAwIHRleHQtcHJpbWFyeS04MDAgdGV4dC14cyBmb250LW1lZGl1bSBweC0yLjUgcHktMC41IHJvdW5kZWRcIiwgY2hpbGRyZW46IFwiVXBjb21pbmdcIiB9KSldIH0pXSB9KSwgZXZlbnQuZGVzY3JpcHRpb24gJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMCBtYi00IGxpbmUtY2xhbXAtMlwiLCBjaGlsZHJlbjogZXZlbnQuZGVzY3JpcHRpb24gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTIgdGV4dC1zbSBtYi00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogW19qc3goQ2FsZW5kYXIsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMiBmbGV4LXNocmluay0wXCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2hpbGRyZW46IGZvcm1hdERhdGUoZXZlbnQuZXZlbnRfZGF0ZSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBbX2pzeChDbG9jaywgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yIGZsZXgtc2hyaW5rLTBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogZm9ybWF0VGltZShldmVudC5ldmVudF90aW1lKSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFtfanN4KE1hcFBpbiwgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yIGZsZXgtc2hyaW5rLTBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogZXZlbnQubG9jYXRpb24gfSldIH0pXSB9KSwgaXNBZG1pbiAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHQtNCBib3JkZXItdCBib3JkZXItbmV1dHJhbC0yMDBcIiwgY2hpbGRyZW46IFtfanN4cyhCdXR0b24sIHsgdmFyaWFudDogXCJvdXRsaW5lXCIsIHNpemU6IFwic21cIiwgb25DbGljazogKCkgPT4gaGFuZGxlVmlld0RldGFpbHMoZXZlbnQpLCBjbGFzc05hbWU6IFwiZmxleC0xXCIsIGNoaWxkcmVuOiBbX2pzeChFeWUsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMVwiIH0pLCBcIlZpZXdcIl0gfSksIGV2ZW50LnN0YXR1cyA9PT0gJ3VwY29taW5nJyAmJiAoX2pzeHMoQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUNvbXBsZXRlQ2xpY2soZXZlbnQpLCBjaGlsZHJlbjogW19qc3goQ2hlY2tDaXJjbGUsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMVwiIH0pLCBcIkNvbXBsZXRlXCJdIH0pKSwgX2pzeHMoQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUVkaXRDbGljayhldmVudCksIGNoaWxkcmVuOiBbX2pzeChFZGl0LCB7IGNsYXNzTmFtZTogXCJoLTQgdy00IG1yLTFcIiB9KSwgXCJFZGl0XCJdIH0pLCBfanN4KEFyY2hpdmVCdXR0b24sIHsgaXRlbVR5cGU6IFwiZXZlbnRzXCIsIGl0ZW1JZDogZXZlbnQuaWQsIGl0ZW1OYW1lOiBldmVudC50aXRsZSwgb25BcmNoaXZlU3VjY2VzczogaGFuZGxlQXJjaGl2ZVN1Y2Nlc3MsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIGljb25Pbmx5OiBmYWxzZSB9KV0gfSkpXSB9LCBldmVudC5pZCkpO1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeChFdmVudEZvcm0sIHsgaXNPcGVuOiBpc0Zvcm1PcGVuLCBvbkNsb3NlOiBoYW5kbGVGb3JtQ2xvc2UsIG9uU3VibWl0OiBoYW5kbGVGb3JtU3VibWl0LCBldmVudDogc2VsZWN0ZWRFdmVudCwgaXNMb2FkaW5nOiBpc0xvYWRpbmcgfSksIF9qc3goQ29tcGxldGVFdmVudERpYWxvZywgeyBpc09wZW46IGlzQ29tcGxldGVEaWFsb2dPcGVuLCBvbkNsb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldElzQ29tcGxldGVEaWFsb2dPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXZlbnRUb0NvbXBsZXRlKG51bGwpO1xuICAgICAgICAgICAgICAgIH0sIG9uQ29uZmlybTogaGFuZGxlQ29tcGxldGVDb25maXJtLCBldmVudFRpdGxlOiBldmVudFRvQ29tcGxldGU/LnRpdGxlIHx8ICcnIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBzbTpqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkV2ZW50c1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWJhc2UgdGV4dC1uZXV0cmFsLTYwMCBtdC0yXCIsIGNoaWxkcmVuOiBcIk1hbmFnZSBjaHVyY2ggZXZlbnRzIGFuZCBhY3Rpdml0aWVzXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3hzKEJ1dHRvbiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRWaWV3TW9kZSgnY2FsZW5kYXInKSwgdmFyaWFudDogXCJvdXRsaW5lXCIsIGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goQ2FsZW5kYXIsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiaGlkZGVuIHNtOmlubGluZVwiLCBjaGlsZHJlbjogXCJDYWxlbmRhciBWaWV3XCIgfSldIH0pLCBpc0FkbWluICYmIChfanN4cyhCdXR0b24sIHsgb25DbGljazogaGFuZGxlQWRkQ2xpY2ssIGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goUGx1cywgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJoaWRkZW4gc206aW5saW5lXCIsIGNoaWxkcmVuOiBcIkNyZWF0ZSBFdmVudFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJzbTpoaWRkZW5cIiwgY2hpbGRyZW46IFwiQ3JlYXRlXCIgfSldIH0pKV0gfSldIH0pLCBfanN4KENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNlwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjaGlsZHJlbjogX2pzeChTZWxlY3QsIHsgdmFsdWU6IHRpbWVSYW5nZUZpbHRlciwgb25DaGFuZ2U6ICh2YWx1ZSkgPT4gc2V0VGltZVJhbmdlRmlsdGVyKHZhbHVlKSwgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ3VwY29taW5nJywgbGFiZWw6ICdVcGNvbWluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdwYXN0JywgbGFiZWw6ICdQYXN0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ2FsbCcsIGxhYmVsOiAnQWxsJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdIH0pIH0pLCBfanN4KFwiZGl2XCIsIHsgY2hpbGRyZW46IF9qc3goU2VsZWN0LCB7IHZhbHVlOiBjYXRlZ29yeUZpbHRlciwgb25DaGFuZ2U6ICh2YWx1ZSkgPT4gc2V0Q2F0ZWdvcnlGaWx0ZXIoQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZVswXSA/PyAnJyA6IHZhbHVlKSwgb3B0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ2FsbCcsIGxhYmVsOiAnQWxsIENhdGVnb3JpZXMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnd29yc2hpcCcsIGxhYmVsOiAnV29yc2hpcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdvdXRyZWFjaCcsIGxhYmVsOiAnT3V0cmVhY2gnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAnZmVsbG93c2hpcCcsIGxhYmVsOiAnRmVsbG93c2hpcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICd0cmFpbmluZycsIGxhYmVsOiAnVHJhaW5pbmcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gfSkgfSksIF9qc3goXCJkaXZcIiwgeyBjaGlsZHJlbjogX2pzeChTZWxlY3QsIHsgdmFsdWU6IHN0YXR1c0ZpbHRlciwgb25DaGFuZ2U6ICh2YWx1ZSkgPT4gc2V0U3RhdHVzRmlsdGVyKEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWVbMF0gPz8gJycgOiB2YWx1ZSksIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6ICdhbGwnLCBsYWJlbDogJ0FsbCBTdGF0dXMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAndXBjb21pbmcnLCBsYWJlbDogJ1VwY29taW5nJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ2NvbXBsZXRlZCcsIGxhYmVsOiAnQ29tcGxldGVkJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogJ2NhbmNlbGxlZCcsIGxhYmVsOiAnQ2FuY2VsbGVkJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdIH0pIH0pXSB9KSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYmctbmV1dHJhbC0xMDAgcC0xIHJvdW5kZWQtbGdcIiwgY2hpbGRyZW46IFtfanN4cyhcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHNldFZpZXdNb2RlKCdsaXN0JyksIGNsYXNzTmFtZTogYGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMiByb3VuZGVkLW1kIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCAke3ZpZXdNb2RlID09PSAnbGlzdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXdoaXRlIHRleHQtcHJpbWFyeS02MDAgc2hhZG93LXNtIGZvbnQtbWVkaXVtJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1uZXV0cmFsLTYwMCBob3Zlcjp0ZXh0LW5ldXRyYWwtOTAwJ31gLCB0aXRsZTogXCJMaXN0IFZpZXdcIiwgY2hpbGRyZW46IFtfanN4KExpc3QsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBoaWRkZW4gc206aW5saW5lXCIsIGNoaWxkcmVuOiBcIkxpc3RcIiB9KV0gfSksIF9qc3hzKFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0Vmlld01vZGUoJ2NhbGVuZGFyJyksIGNsYXNzTmFtZTogYGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMiByb3VuZGVkLW1kIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCAke3ZpZXdNb2RlID09PSAnY2FsZW5kYXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy13aGl0ZSB0ZXh0LXByaW1hcnktNjAwIHNoYWRvdy1zbSBmb250LW1lZGl1bSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtbmV1dHJhbC02MDAgaG92ZXI6dGV4dC1uZXV0cmFsLTkwMCd9YCwgdGl0bGU6IFwiQ2FsZW5kYXIgVmlld1wiLCBjaGlsZHJlbjogW19qc3goQ2FsZW5kYXIsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBoaWRkZW4gc206aW5saW5lXCIsIGNoaWxkcmVuOiBcIkNhbGVuZGFyXCIgfSldIH0pLCBfanN4cyhcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IHNldFZpZXdNb2RlKCdncmlkJyksIGNsYXNzTmFtZTogYGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMiByb3VuZGVkLW1kIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCAke3ZpZXdNb2RlID09PSAnZ3JpZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXdoaXRlIHRleHQtcHJpbWFyeS02MDAgc2hhZG93LXNtIGZvbnQtbWVkaXVtJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1uZXV0cmFsLTYwMCBob3Zlcjp0ZXh0LW5ldXRyYWwtOTAwJ31gLCB0aXRsZTogXCJHcmlkIFZpZXdcIiwgY2hpbGRyZW46IFtfanN4KExheW91dEdyaWQsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBoaWRkZW4gc206aW5saW5lXCIsIGNoaWxkcmVuOiBcIkdyaWRcIiB9KV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFtzb3J0ZWRFdmVudHMubGVuZ3RoLCBcIiBcIiwgc29ydGVkRXZlbnRzLmxlbmd0aCA9PT0gMSA/ICdldmVudCcgOiAnZXZlbnRzJ10gfSldIH0pLCBpc0xvYWRpbmcgJiYgKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNlwiLCBjaGlsZHJlbjogQXJyYXkuZnJvbSh7IGxlbmd0aDogNiB9KS5tYXAoKF8sIGluZGV4KSA9PiAoX2pzeChTa2VsZXRvbkNhcmQsIHsgaGFzSW1hZ2U6IGZhbHNlIH0sIGluZGV4KSkpIH0pKSwgIWlzTG9hZGluZyAmJiBzb3J0ZWRFdmVudHMubGVuZ3RoID09PSAwICYmIChfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xNlwiLCBjaGlsZHJlbjogW19qc3goQ2FsZW5kYXIsIHsgY2xhc3NOYW1lOiBcImgtMTYgdy0xNiB0ZXh0LW5ldXRyYWwtNDAwIG14LWF1dG8gbWItNFwiIH0pLCBfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDAgbWItMlwiLCBjaGlsZHJlbjogXCJObyBFdmVudHMgRm91bmRcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1uZXV0cmFsLTYwMCBtYi02XCIsIGNoaWxkcmVuOiBpc0FkbWluXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnR2V0IHN0YXJ0ZWQgYnkgY3JlYXRpbmcgeW91ciBmaXJzdCBldmVudC4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnQ2hlY2sgYmFjayBsYXRlciBmb3IgdXBjb21pbmcgZXZlbnRzLicgfSksIGlzQWRtaW4gJiYgKF9qc3hzKEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVBZGRDbGljaywgY2hpbGRyZW46IFtfanN4KFBsdXMsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMlwiIH0pLCBcIkNyZWF0ZSBFdmVudFwiXSB9KSldIH0pKSwgIWlzTG9hZGluZyAmJiBzb3J0ZWRFdmVudHMubGVuZ3RoID4gMCAmJiB2aWV3TW9kZSA9PT0gJ2dyaWQnICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgZ2FwLTZcIiwgY2hpbGRyZW46IHNvcnRlZEV2ZW50cy5tYXAoZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudERhdGUgPSBuZXcgRGF0ZShldmVudC5ldmVudF9kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3QgPSBldmVudERhdGUgPCBub3cgfHwgZXZlbnQuc3RhdHVzID09PSAnY29tcGxldGVkJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckV2ZW50Q2FyZChldmVudCwgaXNQYXN0KTtcbiAgICAgICAgICAgICAgICB9KSB9KSksICFpc0xvYWRpbmcgJiYgc29ydGVkRXZlbnRzLmxlbmd0aCA+IDAgJiYgdmlld01vZGUgPT09ICdsaXN0JyAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IHNvcnRlZEV2ZW50cy5tYXAoZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudERhdGUgPSBuZXcgRGF0ZShldmVudC5ldmVudF9kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1Bhc3QgPSBldmVudERhdGUgPCBub3cgfHwgZXZlbnQuc3RhdHVzID09PSAnY29tcGxldGVkJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlckV2ZW50Q2FyZChldmVudCwgaXNQYXN0KTtcbiAgICAgICAgICAgICAgICB9KSB9KSksICFpc0xvYWRpbmcgJiYgdmlld01vZGUgPT09ICdjYWxlbmRhcicgJiYgKF9qc3goQ2FsZW5kYXJWaWV3LCB7IGV2ZW50czogZXZlbnRzLCBvbkRheUNsaWNrOiAoZGF0ZSwgZGF5RXZlbnRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3cgZXZlbnRzIGZvciB0aGUgc2VsZWN0ZWQgZGF5XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEYXkgY2xpY2tlZDonLCBkYXRlLCAnRXZlbnRzOicsIGRheUV2ZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IENvdWxkIG9wZW4gYSBtb2RhbCBvciBmaWx0ZXIgdG8gc2hvdyBvbmx5IHRoZXNlIGV2ZW50c1xuICAgICAgICAgICAgICAgIH0sIG9uRXZlbnRDbGljazogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBldmVudCBjbGljayAtIGNvdWxkIG9wZW4gZXZlbnQgZGV0YWlscyBvciBlZGl0XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FkbWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVFZGl0Q2xpY2soZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB9KSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBFdmVudHM7XG4iLCJ2YXIgY3VycmVudE5vbmNlO1xuZXhwb3J0IHZhciBzZXROb25jZSA9IGZ1bmN0aW9uIChub25jZSkge1xuICAgIGN1cnJlbnROb25jZSA9IG5vbmNlO1xufTtcbmV4cG9ydCB2YXIgZ2V0Tm9uY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGN1cnJlbnROb25jZSkge1xuICAgICAgICByZXR1cm4gY3VycmVudE5vbmNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJyZWN0XCIsIHsgd2lkdGg6IFwiMjBcIiwgaGVpZ2h0OiBcIjVcIiwgeDogXCIyXCIsIHk6IFwiM1wiLCByeDogXCIxXCIsIGtleTogXCIxd3AxdTFcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTQgOHYxMWEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOFwiLCBrZXk6IFwiMXM4MGpwXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMCAxMmg0XCIsIGtleTogXCJhNTZiMHBcIiB9XVxuXTtcbmNvbnN0IEFyY2hpdmUgPSBjcmVhdGVMdWNpZGVJY29uKFwiYXJjaGl2ZVwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQXJjaGl2ZSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcmNoaXZlLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1tcInBhdGhcIiwgeyBkOiBcIk0yMCA2IDkgMTdsLTUtNVwiLCBrZXk6IFwiMWdtZjJjXCIgfV1dO1xuY29uc3QgQ2hlY2sgPSBjcmVhdGVMdWNpZGVJY29uKFwiY2hlY2tcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIENoZWNrIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNoZWNrLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1tcInBhdGhcIiwgeyBkOiBcIm0xNSAxOC02LTYgNi02XCIsIGtleTogXCIxd25mZzNcIiB9XV07XG5jb25zdCBDaGV2cm9uTGVmdCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJjaGV2cm9uLWxlZnRcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIENoZXZyb25MZWZ0IGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNoZXZyb24tbGVmdC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtbXCJwYXRoXCIsIHsgZDogXCJtOSAxOCA2LTYtNi02XCIsIGtleTogXCJtdGhod3FcIiB9XV07XG5jb25zdCBDaGV2cm9uUmlnaHQgPSBjcmVhdGVMdWNpZGVJY29uKFwiY2hldnJvbi1yaWdodFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQ2hldnJvblJpZ2h0IGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNoZXZyb24tcmlnaHQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMiA2djZsNCAyXCIsIGtleTogXCJtbWs3eWdcIiB9XSxcbiAgW1wiY2lyY2xlXCIsIHsgY3g6IFwiMTJcIiwgY3k6IFwiMTJcIiwgcjogXCIxMFwiLCBrZXk6IFwiMW1nbGF5XCIgfV1cbl07XG5jb25zdCBDbG9jayA9IGNyZWF0ZUx1Y2lkZUljb24oXCJjbG9ja1wiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQ2xvY2sgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2xvY2suanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0yLjA2MiAxMi4zNDhhMSAxIDAgMCAxIDAtLjY5NiAxMC43NSAxMC43NSAwIDAgMSAxOS44NzYgMCAxIDEgMCAwIDEgMCAuNjk2IDEwLjc1IDEwLjc1IDAgMCAxLTE5Ljg3NiAwXCIsXG4gICAgICBrZXk6IFwiMW5jbGMwXCJcbiAgICB9XG4gIF0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEyXCIsIHI6IFwiM1wiLCBrZXk6IFwiMXY3enJkXCIgfV1cbl07XG5jb25zdCBFeWUgPSBjcmVhdGVMdWNpZGVJY29uKFwiZXllXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBFeWUgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXllLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJyZWN0XCIsIHsgd2lkdGg6IFwiN1wiLCBoZWlnaHQ6IFwiN1wiLCB4OiBcIjNcIiwgeTogXCIzXCIsIHJ4OiBcIjFcIiwga2V5OiBcIjFnOTh5cFwiIH1dLFxuICBbXCJyZWN0XCIsIHsgd2lkdGg6IFwiN1wiLCBoZWlnaHQ6IFwiN1wiLCB4OiBcIjE0XCIsIHk6IFwiM1wiLCByeDogXCIxXCIsIGtleTogXCI2ZDR4aGlcIiB9XSxcbiAgW1wicmVjdFwiLCB7IHdpZHRoOiBcIjdcIiwgaGVpZ2h0OiBcIjdcIiwgeDogXCIxNFwiLCB5OiBcIjE0XCIsIHJ4OiBcIjFcIiwga2V5OiBcIm54djVvMFwiIH1dLFxuICBbXCJyZWN0XCIsIHsgd2lkdGg6IFwiN1wiLCBoZWlnaHQ6IFwiN1wiLCB4OiBcIjNcIiwgeTogXCIxNFwiLCByeDogXCIxXCIsIGtleTogXCIxYmI2eXJcIiB9XVxuXTtcbmNvbnN0IExheW91dEdyaWQgPSBjcmVhdGVMdWNpZGVJY29uKFwibGF5b3V0LWdyaWRcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIExheW91dEdyaWQgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF5b3V0LWdyaWQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0zIDVoLjAxXCIsIGtleTogXCIxOHVnZGpcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTMgMTJoLjAxXCIsIGtleTogXCJubHoyM2tcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTMgMTloLjAxXCIsIGtleTogXCJub29oaWpcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTggNWgxM1wiLCBrZXk6IFwiMXBhbzI3XCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk04IDEyaDEzXCIsIGtleTogXCIxemE3emFcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTggMTloMTNcIiwga2V5OiBcIm04M3A0ZFwiIH1dXG5dO1xuY29uc3QgTGlzdCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJsaXN0XCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBMaXN0IGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpc3QuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0yMCAxMGMwIDQuOTkzLTUuNTM5IDEwLjE5My03LjM5OSAxMS43OTlhMSAxIDAgMCAxLTEuMjAyIDBDOS41MzkgMjAuMTkzIDQgMTQuOTkzIDQgMTBhOCA4IDAgMCAxIDE2IDBcIixcbiAgICAgIGtleTogXCIxcjBmMHpcIlxuICAgIH1cbiAgXSxcbiAgW1wiY2lyY2xlXCIsIHsgY3g6IFwiMTJcIiwgY3k6IFwiMTBcIiwgcjogXCIzXCIsIGtleTogXCJpbHFocjdcIiB9XVxuXTtcbmNvbnN0IE1hcFBpbiA9IGNyZWF0ZUx1Y2lkZUljb24oXCJtYXAtcGluXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBNYXBQaW4gYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLXBpbi5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTUgMTJoMTRcIiwga2V5OiBcIjFheXMwaFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgNXYxNFwiLCBrZXk6IFwiczY5OWxlXCIgfV1cbl07XG5jb25zdCBQbHVzID0gY3JlYXRlTHVjaWRlSWNvbihcInBsdXNcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFBsdXMgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGx1cy5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTIxIDIxLTQuMzQtNC4zNFwiLCBrZXk6IFwiMTRqN3JqXCIgfV0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjExXCIsIGN5OiBcIjExXCIsIHI6IFwiOFwiLCBrZXk6IFwiNGVqOTd1XCIgfV1cbl07XG5jb25zdCBTZWFyY2ggPSBjcmVhdGVMdWNpZGVJY29uKFwic2VhcmNoXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBTZWFyY2ggYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VhcmNoLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgM0g1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0ydi03XCIsIGtleTogXCIxbTB2NmdcIiB9XSxcbiAgW1xuICAgIFwicGF0aFwiLFxuICAgIHtcbiAgICAgIGQ6IFwiTTE4LjM3NSAyLjYyNWExIDEgMCAwIDEgMyAzbC05LjAxMyA5LjAxNGEyIDIgMCAwIDEtLjg1My41MDVsLTIuODczLjg0YS41LjUgMCAwIDEtLjYyLS42MmwuODQtMi44NzNhMiAyIDAgMCAxIC41MDYtLjg1MnpcIixcbiAgICAgIGtleTogXCJvaHJiZzJcIlxuICAgIH1cbiAgXVxuXTtcbmNvbnN0IFNxdWFyZVBlbiA9IGNyZWF0ZUx1Y2lkZUljb24oXCJzcXVhcmUtcGVuXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBTcXVhcmVQZW4gYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3F1YXJlLXBlbi5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDN2MTJcIiwga2V5OiBcIjF4MGo1c1wiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJtMTcgOC01LTUtNSA1XCIsIGtleTogXCI3cTk3cjhcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTIxIDE1djRhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ2LTRcIiwga2V5OiBcImloN24zaFwiIH1dXG5dO1xuY29uc3QgVXBsb2FkID0gY3JlYXRlTHVjaWRlSWNvbihcInVwbG9hZFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVXBsb2FkIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVwbG9hZC5qcy5tYXBcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN0eWxlU2luZ2xldG9uIH0gZnJvbSAncmVhY3Qtc3R5bGUtc2luZ2xldG9uJztcbmltcG9ydCB7IGZ1bGxXaWR0aENsYXNzTmFtZSwgemVyb1JpZ2h0Q2xhc3NOYW1lLCBub1Njcm9sbGJhcnNDbGFzc05hbWUsIHJlbW92ZWRCYXJTaXplVmFyaWFibGUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRHYXBXaWR0aCB9IGZyb20gJy4vdXRpbHMnO1xudmFyIFN0eWxlID0gc3R5bGVTaW5nbGV0b24oKTtcbmV4cG9ydCB2YXIgbG9ja0F0dHJpYnV0ZSA9ICdkYXRhLXNjcm9sbC1sb2NrZWQnO1xuLy8gaW1wb3J0YW50IHRpcCAtIG9uY2Ugd2UgbWVhc3VyZSBzY3JvbGxCYXIgd2lkdGggYW5kIHJlbW92ZSB0aGVtXG4vLyB3ZSBjb3VsZCBub3QgcmVwZWF0IHRoaXMgb3BlcmF0aW9uXG4vLyB0aHVzIHdlIGFyZSB1c2luZyBzdHlsZS1zaW5nbGV0b24gLSBvbmx5IHRoZSBmaXJzdCBcInlldCBjb3JyZWN0XCIgc3R5bGUgd2lsbCBiZSBhcHBsaWVkLlxudmFyIGdldFN0eWxlcyA9IGZ1bmN0aW9uIChfYSwgYWxsb3dSZWxhdGl2ZSwgZ2FwTW9kZSwgaW1wb3J0YW50KSB7XG4gICAgdmFyIGxlZnQgPSBfYS5sZWZ0LCB0b3AgPSBfYS50b3AsIHJpZ2h0ID0gX2EucmlnaHQsIGdhcCA9IF9hLmdhcDtcbiAgICBpZiAoZ2FwTW9kZSA9PT0gdm9pZCAwKSB7IGdhcE1vZGUgPSAnbWFyZ2luJzsgfVxuICAgIHJldHVybiBcIlxcbiAgLlwiLmNvbmNhdChub1Njcm9sbGJhcnNDbGFzc05hbWUsIFwiIHtcXG4gICBvdmVyZmxvdzogaGlkZGVuIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gICBwYWRkaW5nLXJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBib2R5W1wiKS5jb25jYXQobG9ja0F0dHJpYnV0ZSwgXCJdIHtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbiBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICAgIG92ZXJzY3JvbGwtYmVoYXZpb3I6IGNvbnRhaW47XFxuICAgIFwiKS5jb25jYXQoW1xuICAgICAgICBhbGxvd1JlbGF0aXZlICYmIFwicG9zaXRpb246IHJlbGF0aXZlIFwiLmNvbmNhdChpbXBvcnRhbnQsIFwiO1wiKSxcbiAgICAgICAgZ2FwTW9kZSA9PT0gJ21hcmdpbicgJiZcbiAgICAgICAgICAgIFwiXFxuICAgIHBhZGRpbmctbGVmdDogXCIuY29uY2F0KGxlZnQsIFwicHg7XFxuICAgIHBhZGRpbmctdG9wOiBcIikuY29uY2F0KHRvcCwgXCJweDtcXG4gICAgcGFkZGluZy1yaWdodDogXCIpLmNvbmNhdChyaWdodCwgXCJweDtcXG4gICAgbWFyZ2luLWxlZnQ6MDtcXG4gICAgbWFyZ2luLXRvcDowO1xcbiAgICBtYXJnaW4tcmlnaHQ6IFwiKS5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gICAgXCIpLFxuICAgICAgICBnYXBNb2RlID09PSAncGFkZGluZycgJiYgXCJwYWRkaW5nLXJpZ2h0OiBcIi5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcIiksXG4gICAgXVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgIC5qb2luKCcnKSwgXCJcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoemVyb1JpZ2h0Q2xhc3NOYW1lLCBcIiB7XFxuICAgIHJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KGZ1bGxXaWR0aENsYXNzTmFtZSwgXCIge1xcbiAgICBtYXJnaW4tcmlnaHQ6IFwiKS5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoemVyb1JpZ2h0Q2xhc3NOYW1lLCBcIiAuXCIpLmNvbmNhdCh6ZXJvUmlnaHRDbGFzc05hbWUsIFwiIHtcXG4gICAgcmlnaHQ6IDAgXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICAuXCIpLmNvbmNhdChmdWxsV2lkdGhDbGFzc05hbWUsIFwiIC5cIikuY29uY2F0KGZ1bGxXaWR0aENsYXNzTmFtZSwgXCIge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDAgXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICBib2R5W1wiKS5jb25jYXQobG9ja0F0dHJpYnV0ZSwgXCJdIHtcXG4gICAgXCIpLmNvbmNhdChyZW1vdmVkQmFyU2l6ZVZhcmlhYmxlLCBcIjogXCIpLmNvbmNhdChnYXAsIFwicHg7XFxuICB9XFxuXCIpO1xufTtcbnZhciBnZXRDdXJyZW50VXNlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY291bnRlciA9IHBhcnNlSW50KGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKGxvY2tBdHRyaWJ1dGUpIHx8ICcwJywgMTApO1xuICAgIHJldHVybiBpc0Zpbml0ZShjb3VudGVyKSA/IGNvdW50ZXIgOiAwO1xufTtcbmV4cG9ydCB2YXIgdXNlTG9ja0F0dHJpYnV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShsb2NrQXR0cmlidXRlLCAoZ2V0Q3VycmVudFVzZUNvdW50ZXIoKSArIDEpLnRvU3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5ld0NvdW50ZXIgPSBnZXRDdXJyZW50VXNlQ291bnRlcigpIC0gMTtcbiAgICAgICAgICAgIGlmIChuZXdDb3VudGVyIDw9IDApIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZShsb2NrQXR0cmlidXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKGxvY2tBdHRyaWJ1dGUsIG5ld0NvdW50ZXIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSwgW10pO1xufTtcbi8qKlxuICogUmVtb3ZlcyBwYWdlIHNjcm9sbGJhciBhbmQgYmxvY2tzIHBhZ2Ugc2Nyb2xsIHdoZW4gbW91bnRlZFxuICovXG5leHBvcnQgdmFyIFJlbW92ZVNjcm9sbEJhciA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBub1JlbGF0aXZlID0gX2Eubm9SZWxhdGl2ZSwgbm9JbXBvcnRhbnQgPSBfYS5ub0ltcG9ydGFudCwgX2IgPSBfYS5nYXBNb2RlLCBnYXBNb2RlID0gX2IgPT09IHZvaWQgMCA/ICdtYXJnaW4nIDogX2I7XG4gICAgdXNlTG9ja0F0dHJpYnV0ZSgpO1xuICAgIC8qXG4gICAgIGdhcCB3aWxsIGJlIG1lYXN1cmVkIG9uIGV2ZXJ5IGNvbXBvbmVudCBtb3VudFxuICAgICBob3dldmVyIGl0IHdpbGwgYmUgdXNlZCBvbmx5IGJ5IHRoZSBcImZpcnN0XCIgaW52b2NhdGlvblxuICAgICBkdWUgdG8gc2luZ2xldG9uIG5hdHVyZSBvZiA8U3R5bGVcbiAgICAgKi9cbiAgICB2YXIgZ2FwID0gUmVhY3QudXNlTWVtbyhmdW5jdGlvbiAoKSB7IHJldHVybiBnZXRHYXBXaWR0aChnYXBNb2RlKTsgfSwgW2dhcE1vZGVdKTtcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTdHlsZSwgeyBzdHlsZXM6IGdldFN0eWxlcyhnYXAsICFub1JlbGF0aXZlLCBnYXBNb2RlLCAhbm9JbXBvcnRhbnQgPyAnIWltcG9ydGFudCcgOiAnJykgfSk7XG59O1xuIiwiZXhwb3J0IHZhciB6ZXJvUmlnaHRDbGFzc05hbWUgPSAncmlnaHQtc2Nyb2xsLWJhci1wb3NpdGlvbic7XG5leHBvcnQgdmFyIGZ1bGxXaWR0aENsYXNzTmFtZSA9ICd3aWR0aC1iZWZvcmUtc2Nyb2xsLWJhcic7XG5leHBvcnQgdmFyIG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSA9ICd3aXRoLXNjcm9sbC1iYXJzLWhpZGRlbic7XG4vKipcbiAqIE5hbWUgb2YgYSBDU1MgdmFyaWFibGUgY29udGFpbmluZyB0aGUgYW1vdW50IG9mIFwiaGlkZGVuXCIgc2Nyb2xsYmFyXG4gKiAhIG1pZ2h0IGJlIHVuZGVmaW5lZCAhIHVzZSB3aWxsIGZhbGxiYWNrIVxuICovXG5leHBvcnQgdmFyIHJlbW92ZWRCYXJTaXplVmFyaWFibGUgPSAnLS1yZW1vdmVkLWJvZHktc2Nyb2xsLWJhci1zaXplJztcbiIsImltcG9ydCB7IFJlbW92ZVNjcm9sbEJhciB9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7IHplcm9SaWdodENsYXNzTmFtZSwgZnVsbFdpZHRoQ2xhc3NOYW1lLCBub1Njcm9sbGJhcnNDbGFzc05hbWUsIHJlbW92ZWRCYXJTaXplVmFyaWFibGUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRHYXBXaWR0aCB9IGZyb20gJy4vdXRpbHMnO1xuZXhwb3J0IHsgUmVtb3ZlU2Nyb2xsQmFyLCB6ZXJvUmlnaHRDbGFzc05hbWUsIGZ1bGxXaWR0aENsYXNzTmFtZSwgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlLCBnZXRHYXBXaWR0aCwgfTtcbiIsImV4cG9ydCB2YXIgemVyb0dhcCA9IHtcbiAgICBsZWZ0OiAwLFxuICAgIHRvcDogMCxcbiAgICByaWdodDogMCxcbiAgICBnYXA6IDAsXG59O1xudmFyIHBhcnNlID0gZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHBhcnNlSW50KHggfHwgJycsIDEwKSB8fCAwOyB9O1xudmFyIGdldE9mZnNldCA9IGZ1bmN0aW9uIChnYXBNb2RlKSB7XG4gICAgdmFyIGNzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSk7XG4gICAgdmFyIGxlZnQgPSBjc1tnYXBNb2RlID09PSAncGFkZGluZycgPyAncGFkZGluZ0xlZnQnIDogJ21hcmdpbkxlZnQnXTtcbiAgICB2YXIgdG9wID0gY3NbZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnID8gJ3BhZGRpbmdUb3AnIDogJ21hcmdpblRvcCddO1xuICAgIHZhciByaWdodCA9IGNzW2dhcE1vZGUgPT09ICdwYWRkaW5nJyA/ICdwYWRkaW5nUmlnaHQnIDogJ21hcmdpblJpZ2h0J107XG4gICAgcmV0dXJuIFtwYXJzZShsZWZ0KSwgcGFyc2UodG9wKSwgcGFyc2UocmlnaHQpXTtcbn07XG5leHBvcnQgdmFyIGdldEdhcFdpZHRoID0gZnVuY3Rpb24gKGdhcE1vZGUpIHtcbiAgICBpZiAoZ2FwTW9kZSA9PT0gdm9pZCAwKSB7IGdhcE1vZGUgPSAnbWFyZ2luJzsgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gemVyb0dhcDtcbiAgICB9XG4gICAgdmFyIG9mZnNldHMgPSBnZXRPZmZzZXQoZ2FwTW9kZSk7XG4gICAgdmFyIGRvY3VtZW50V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgdmFyIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogb2Zmc2V0c1swXSxcbiAgICAgICAgdG9wOiBvZmZzZXRzWzFdLFxuICAgICAgICByaWdodDogb2Zmc2V0c1syXSxcbiAgICAgICAgZ2FwOiBNYXRoLm1heCgwLCB3aW5kb3dXaWR0aCAtIGRvY3VtZW50V2lkdGggKyBvZmZzZXRzWzJdIC0gb2Zmc2V0c1swXSksXG4gICAgfTtcbn07XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsIH0gZnJvbSAnLi9VSSc7XG5pbXBvcnQgU2lkZUNhciBmcm9tICcuL3NpZGVjYXInO1xudmFyIFJlYWN0UmVtb3ZlU2Nyb2xsID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHJlZikgeyByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVtb3ZlU2Nyb2xsLCBfX2Fzc2lnbih7fSwgcHJvcHMsIHsgcmVmOiByZWYsIHNpZGVDYXI6IFNpZGVDYXIgfSkpKTsgfSk7XG5SZWFjdFJlbW92ZVNjcm9sbC5jbGFzc05hbWVzID0gUmVtb3ZlU2Nyb2xsLmNsYXNzTmFtZXM7XG5leHBvcnQgZGVmYXVsdCBSZWFjdFJlbW92ZVNjcm9sbDtcbiIsImltcG9ydCB7IF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJlbW92ZVNjcm9sbEJhciB9IGZyb20gJ3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyJztcbmltcG9ydCB7IHN0eWxlU2luZ2xldG9uIH0gZnJvbSAncmVhY3Qtc3R5bGUtc2luZ2xldG9uJztcbmltcG9ydCB7IG5vblBhc3NpdmUgfSBmcm9tICcuL2FnZ3Jlc2l2ZUNhcHR1cmUnO1xuaW1wb3J0IHsgaGFuZGxlU2Nyb2xsLCBsb2NhdGlvbkNvdWxkQmVTY3JvbGxlZCB9IGZyb20gJy4vaGFuZGxlU2Nyb2xsJztcbmV4cG9ydCB2YXIgZ2V0VG91Y2hYWSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHJldHVybiAnY2hhbmdlZFRvdWNoZXMnIGluIGV2ZW50ID8gW2V2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFldIDogWzAsIDBdO1xufTtcbmV4cG9ydCB2YXIgZ2V0RGVsdGFYWSA9IGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gW2V2ZW50LmRlbHRhWCwgZXZlbnQuZGVsdGFZXTsgfTtcbnZhciBleHRyYWN0UmVmID0gZnVuY3Rpb24gKHJlZikge1xuICAgIHJldHVybiByZWYgJiYgJ2N1cnJlbnQnIGluIHJlZiA/IHJlZi5jdXJyZW50IDogcmVmO1xufTtcbnZhciBkZWx0YUNvbXBhcmUgPSBmdW5jdGlvbiAoeCwgeSkgeyByZXR1cm4geFswXSA9PT0geVswXSAmJiB4WzFdID09PSB5WzFdOyB9O1xudmFyIGdlbmVyYXRlU3R5bGUgPSBmdW5jdGlvbiAoaWQpIHsgcmV0dXJuIFwiXFxuICAuYmxvY2staW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQsIFwiIHtwb2ludGVyLWV2ZW50czogbm9uZTt9XFxuICAuYWxsb3ctaW50ZXJhY3Rpdml0eS1cIikuY29uY2F0KGlkLCBcIiB7cG9pbnRlci1ldmVudHM6IGFsbDt9XFxuXCIpOyB9O1xudmFyIGlkQ291bnRlciA9IDA7XG52YXIgbG9ja1N0YWNrID0gW107XG5leHBvcnQgZnVuY3Rpb24gUmVtb3ZlU2Nyb2xsU2lkZUNhcihwcm9wcykge1xuICAgIHZhciBzaG91bGRQcmV2ZW50UXVldWUgPSBSZWFjdC51c2VSZWYoW10pO1xuICAgIHZhciB0b3VjaFN0YXJ0UmVmID0gUmVhY3QudXNlUmVmKFswLCAwXSk7XG4gICAgdmFyIGFjdGl2ZUF4aXMgPSBSZWFjdC51c2VSZWYoKTtcbiAgICB2YXIgaWQgPSBSZWFjdC51c2VTdGF0ZShpZENvdW50ZXIrKylbMF07XG4gICAgdmFyIFN0eWxlID0gUmVhY3QudXNlU3RhdGUoc3R5bGVTaW5nbGV0b24pWzBdO1xuICAgIHZhciBsYXN0UHJvcHMgPSBSZWFjdC51c2VSZWYocHJvcHMpO1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxhc3RQcm9wcy5jdXJyZW50ID0gcHJvcHM7XG4gICAgfSwgW3Byb3BzXSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHByb3BzLmluZXJ0KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJibG9jay1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCkpO1xuICAgICAgICAgICAgdmFyIGFsbG93XzEgPSBfX3NwcmVhZEFycmF5KFtwcm9wcy5sb2NrUmVmLmN1cnJlbnRdLCAocHJvcHMuc2hhcmRzIHx8IFtdKS5tYXAoZXh0cmFjdFJlZiksIHRydWUpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgIGFsbG93XzEuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmNsYXNzTGlzdC5hZGQoXCJhbGxvdy1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCkpOyB9KTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiYmxvY2staW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTtcbiAgICAgICAgICAgICAgICBhbGxvd18xLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWxsb3ctaW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTsgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9LCBbcHJvcHMuaW5lcnQsIHByb3BzLmxvY2tSZWYuY3VycmVudCwgcHJvcHMuc2hhcmRzXSk7XG4gICAgdmFyIHNob3VsZENhbmNlbEV2ZW50ID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50LCBwYXJlbnQpIHtcbiAgICAgICAgaWYgKCgndG91Y2hlcycgaW4gZXZlbnQgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPT09IDIpIHx8IChldmVudC50eXBlID09PSAnd2hlZWwnICYmIGV2ZW50LmN0cmxLZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gIWxhc3RQcm9wcy5jdXJyZW50LmFsbG93UGluY2hab29tO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b3VjaCA9IGdldFRvdWNoWFkoZXZlbnQpO1xuICAgICAgICB2YXIgdG91Y2hTdGFydCA9IHRvdWNoU3RhcnRSZWYuY3VycmVudDtcbiAgICAgICAgdmFyIGRlbHRhWCA9ICdkZWx0YVgnIGluIGV2ZW50ID8gZXZlbnQuZGVsdGFYIDogdG91Y2hTdGFydFswXSAtIHRvdWNoWzBdO1xuICAgICAgICB2YXIgZGVsdGFZID0gJ2RlbHRhWScgaW4gZXZlbnQgPyBldmVudC5kZWx0YVkgOiB0b3VjaFN0YXJ0WzFdIC0gdG91Y2hbMV07XG4gICAgICAgIHZhciBjdXJyZW50QXhpcztcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdmFyIG1vdmVEaXJlY3Rpb24gPSBNYXRoLmFicyhkZWx0YVgpID4gTWF0aC5hYnMoZGVsdGFZKSA/ICdoJyA6ICd2JztcbiAgICAgICAgLy8gYWxsb3cgaG9yaXpvbnRhbCB0b3VjaCBtb3ZlIG9uIFJhbmdlIGlucHV0cy4gVGhleSB3aWxsIG5vdCBjYXVzZSBhbnkgc2Nyb2xsXG4gICAgICAgIGlmICgndG91Y2hlcycgaW4gZXZlbnQgJiYgbW92ZURpcmVjdGlvbiA9PT0gJ2gnICYmIHRhcmdldC50eXBlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWxsb3cgZHJhZyBzZWxlY3Rpb24gKGlPUyk7IGNoZWNrIGlmIHNlbGVjdGlvbidzIGFuY2hvck5vZGUgaXMgdGhlIHNhbWUgYXMgdGFyZ2V0IG9yIGNvbnRhaW5zIHRhcmdldFxuICAgICAgICB2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgYW5jaG9yTm9kZSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uYW5jaG9yTm9kZTtcbiAgICAgICAgdmFyIGlzVG91Y2hpbmdTZWxlY3Rpb24gPSBhbmNob3JOb2RlID8gYW5jaG9yTm9kZSA9PT0gdGFyZ2V0IHx8IGFuY2hvck5vZGUuY29udGFpbnModGFyZ2V0KSA6IGZhbHNlO1xuICAgICAgICBpZiAoaXNUb3VjaGluZ1NlbGVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uID0gbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQobW92ZURpcmVjdGlvbiwgdGFyZ2V0KTtcbiAgICAgICAgaWYgKCFjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbikge1xuICAgICAgICAgICAgY3VycmVudEF4aXMgPSBtb3ZlRGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudEF4aXMgPSBtb3ZlRGlyZWN0aW9uID09PSAndicgPyAnaCcgOiAndic7XG4gICAgICAgICAgICBjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uID0gbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQobW92ZURpcmVjdGlvbiwgdGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIG90aGVyIGF4aXMgbWlnaHQgYmUgbm90IHNjcm9sbGFibGVcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFjdGl2ZUF4aXMuY3VycmVudCAmJiAnY2hhbmdlZFRvdWNoZXMnIGluIGV2ZW50ICYmIChkZWx0YVggfHwgZGVsdGFZKSkge1xuICAgICAgICAgICAgYWN0aXZlQXhpcy5jdXJyZW50ID0gY3VycmVudEF4aXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50QXhpcykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbmNlbGluZ0F4aXMgPSBhY3RpdmVBeGlzLmN1cnJlbnQgfHwgY3VycmVudEF4aXM7XG4gICAgICAgIHJldHVybiBoYW5kbGVTY3JvbGwoY2FuY2VsaW5nQXhpcywgcGFyZW50LCBldmVudCwgY2FuY2VsaW5nQXhpcyA9PT0gJ2gnID8gZGVsdGFYIDogZGVsdGFZLCB0cnVlKTtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHNob3VsZFByZXZlbnQgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoX2V2ZW50KSB7XG4gICAgICAgIHZhciBldmVudCA9IF9ldmVudDtcbiAgICAgICAgaWYgKCFsb2NrU3RhY2subGVuZ3RoIHx8IGxvY2tTdGFja1tsb2NrU3RhY2subGVuZ3RoIC0gMV0gIT09IFN0eWxlKSB7XG4gICAgICAgICAgICAvLyBub3QgdGhlIGxhc3QgYWN0aXZlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlbHRhID0gJ2RlbHRhWScgaW4gZXZlbnQgPyBnZXREZWx0YVhZKGV2ZW50KSA6IGdldFRvdWNoWFkoZXZlbnQpO1xuICAgICAgICB2YXIgc291cmNlRXZlbnQgPSBzaG91bGRQcmV2ZW50UXVldWUuY3VycmVudC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubmFtZSA9PT0gZXZlbnQudHlwZSAmJiAoZS50YXJnZXQgPT09IGV2ZW50LnRhcmdldCB8fCBldmVudC50YXJnZXQgPT09IGUuc2hhZG93UGFyZW50KSAmJiBkZWx0YUNvbXBhcmUoZS5kZWx0YSwgZGVsdGEpOyB9KVswXTtcbiAgICAgICAgLy8gc2VsZiBldmVudCwgYW5kIHNob3VsZCBiZSBjYW5jZWxlZFxuICAgICAgICBpZiAoc291cmNlRXZlbnQgJiYgc291cmNlRXZlbnQuc2hvdWxkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gb3V0c2lkZSBvciBzaGFyZCBldmVudFxuICAgICAgICBpZiAoIXNvdXJjZUV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgc2hhcmROb2RlcyA9IChsYXN0UHJvcHMuY3VycmVudC5zaGFyZHMgfHwgW10pXG4gICAgICAgICAgICAgICAgLm1hcChleHRyYWN0UmVmKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBub2RlLmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7IH0pO1xuICAgICAgICAgICAgdmFyIHNob3VsZFN0b3AgPSBzaGFyZE5vZGVzLmxlbmd0aCA+IDAgPyBzaG91bGRDYW5jZWxFdmVudChldmVudCwgc2hhcmROb2Rlc1swXSkgOiAhbGFzdFByb3BzLmN1cnJlbnQubm9Jc29sYXRpb247XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RvcCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW10pO1xuICAgIHZhciBzaG91bGRDYW5jZWwgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAobmFtZSwgZGVsdGEsIHRhcmdldCwgc2hvdWxkKSB7XG4gICAgICAgIHZhciBldmVudCA9IHsgbmFtZTogbmFtZSwgZGVsdGE6IGRlbHRhLCB0YXJnZXQ6IHRhcmdldCwgc2hvdWxkOiBzaG91bGQsIHNoYWRvd1BhcmVudDogZ2V0T3V0ZXJtb3N0U2hhZG93UGFyZW50KHRhcmdldCkgfTtcbiAgICAgICAgc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQucHVzaChldmVudCk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQgPSBzaG91bGRQcmV2ZW50UXVldWUuY3VycmVudC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUgIT09IGV2ZW50OyB9KTtcbiAgICAgICAgfSwgMSk7XG4gICAgfSwgW10pO1xuICAgIHZhciBzY3JvbGxUb3VjaFN0YXJ0ID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRvdWNoU3RhcnRSZWYuY3VycmVudCA9IGdldFRvdWNoWFkoZXZlbnQpO1xuICAgICAgICBhY3RpdmVBeGlzLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgfSwgW10pO1xuICAgIHZhciBzY3JvbGxXaGVlbCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzaG91bGRDYW5jZWwoZXZlbnQudHlwZSwgZ2V0RGVsdGFYWShldmVudCksIGV2ZW50LnRhcmdldCwgc2hvdWxkQ2FuY2VsRXZlbnQoZXZlbnQsIHByb3BzLmxvY2tSZWYuY3VycmVudCkpO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2Nyb2xsVG91Y2hNb3ZlID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNob3VsZENhbmNlbChldmVudC50eXBlLCBnZXRUb3VjaFhZKGV2ZW50KSwgZXZlbnQudGFyZ2V0LCBzaG91bGRDYW5jZWxFdmVudChldmVudCwgcHJvcHMubG9ja1JlZi5jdXJyZW50KSk7XG4gICAgfSwgW10pO1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvY2tTdGFjay5wdXNoKFN0eWxlKTtcbiAgICAgICAgcHJvcHMuc2V0Q2FsbGJhY2tzKHtcbiAgICAgICAgICAgIG9uU2Nyb2xsQ2FwdHVyZTogc2Nyb2xsV2hlZWwsXG4gICAgICAgICAgICBvbldoZWVsQ2FwdHVyZTogc2Nyb2xsV2hlZWwsXG4gICAgICAgICAgICBvblRvdWNoTW92ZUNhcHR1cmU6IHNjcm9sbFRvdWNoTW92ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgc2hvdWxkUHJldmVudCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2Nyb2xsVG91Y2hTdGFydCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsb2NrU3RhY2sgPSBsb2NrU3RhY2suZmlsdGVyKGZ1bmN0aW9uIChpbnN0KSB7IHJldHVybiBpbnN0ICE9PSBTdHlsZTsgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2hvdWxkUHJldmVudCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc2Nyb2xsVG91Y2hTdGFydCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIH07XG4gICAgfSwgW10pO1xuICAgIHZhciByZW1vdmVTY3JvbGxCYXIgPSBwcm9wcy5yZW1vdmVTY3JvbGxCYXIsIGluZXJ0ID0gcHJvcHMuaW5lcnQ7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICBpbmVydCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3R5bGUsIHsgc3R5bGVzOiBnZW5lcmF0ZVN0eWxlKGlkKSB9KSA6IG51bGwsXG4gICAgICAgIHJlbW92ZVNjcm9sbEJhciA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVtb3ZlU2Nyb2xsQmFyLCB7IG5vUmVsYXRpdmU6IHByb3BzLm5vUmVsYXRpdmUsIGdhcE1vZGU6IHByb3BzLmdhcE1vZGUgfSkgOiBudWxsKSk7XG59XG5mdW5jdGlvbiBnZXRPdXRlcm1vc3RTaGFkb3dQYXJlbnQobm9kZSkge1xuICAgIHZhciBzaGFkb3dQYXJlbnQgPSBudWxsO1xuICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgICAgICAgICAgc2hhZG93UGFyZW50ID0gbm9kZS5ob3N0O1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gc2hhZG93UGFyZW50O1xufVxuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fcmVzdCB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZnVsbFdpZHRoQ2xhc3NOYW1lLCB6ZXJvUmlnaHRDbGFzc05hbWUgfSBmcm9tICdyZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9jb25zdGFudHMnO1xuaW1wb3J0IHsgdXNlTWVyZ2VSZWZzIH0gZnJvbSAndXNlLWNhbGxiYWNrLXJlZic7XG5pbXBvcnQgeyBlZmZlY3RDYXIgfSBmcm9tICcuL21lZGl1bSc7XG52YXIgbm90aGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm47XG59O1xuLyoqXG4gKiBSZW1vdmVzIHNjcm9sbGJhciBmcm9tIHRoZSBwYWdlIGFuZCBjb250YWluIHRoZSBzY3JvbGwgd2l0aGluIHRoZSBMb2NrXG4gKi9cbnZhciBSZW1vdmVTY3JvbGwgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcGFyZW50UmVmKSB7XG4gICAgdmFyIHJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICB2YXIgX2EgPSBSZWFjdC51c2VTdGF0ZSh7XG4gICAgICAgIG9uU2Nyb2xsQ2FwdHVyZTogbm90aGluZyxcbiAgICAgICAgb25XaGVlbENhcHR1cmU6IG5vdGhpbmcsXG4gICAgICAgIG9uVG91Y2hNb3ZlQ2FwdHVyZTogbm90aGluZyxcbiAgICB9KSwgY2FsbGJhY2tzID0gX2FbMF0sIHNldENhbGxiYWNrcyA9IF9hWzFdO1xuICAgIHZhciBmb3J3YXJkUHJvcHMgPSBwcm9wcy5mb3J3YXJkUHJvcHMsIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW4sIGNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSwgcmVtb3ZlU2Nyb2xsQmFyID0gcHJvcHMucmVtb3ZlU2Nyb2xsQmFyLCBlbmFibGVkID0gcHJvcHMuZW5hYmxlZCwgc2hhcmRzID0gcHJvcHMuc2hhcmRzLCBzaWRlQ2FyID0gcHJvcHMuc2lkZUNhciwgbm9SZWxhdGl2ZSA9IHByb3BzLm5vUmVsYXRpdmUsIG5vSXNvbGF0aW9uID0gcHJvcHMubm9Jc29sYXRpb24sIGluZXJ0ID0gcHJvcHMuaW5lcnQsIGFsbG93UGluY2hab29tID0gcHJvcHMuYWxsb3dQaW5jaFpvb20sIF9iID0gcHJvcHMuYXMsIENvbnRhaW5lciA9IF9iID09PSB2b2lkIDAgPyAnZGl2JyA6IF9iLCBnYXBNb2RlID0gcHJvcHMuZ2FwTW9kZSwgcmVzdCA9IF9fcmVzdChwcm9wcywgW1wiZm9yd2FyZFByb3BzXCIsIFwiY2hpbGRyZW5cIiwgXCJjbGFzc05hbWVcIiwgXCJyZW1vdmVTY3JvbGxCYXJcIiwgXCJlbmFibGVkXCIsIFwic2hhcmRzXCIsIFwic2lkZUNhclwiLCBcIm5vUmVsYXRpdmVcIiwgXCJub0lzb2xhdGlvblwiLCBcImluZXJ0XCIsIFwiYWxsb3dQaW5jaFpvb21cIiwgXCJhc1wiLCBcImdhcE1vZGVcIl0pO1xuICAgIHZhciBTaWRlQ2FyID0gc2lkZUNhcjtcbiAgICB2YXIgY29udGFpbmVyUmVmID0gdXNlTWVyZ2VSZWZzKFtyZWYsIHBhcmVudFJlZl0pO1xuICAgIHZhciBjb250YWluZXJQcm9wcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXN0KSwgY2FsbGJhY2tzKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIGVuYWJsZWQgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2lkZUNhciwgeyBzaWRlQ2FyOiBlZmZlY3RDYXIsIHJlbW92ZVNjcm9sbEJhcjogcmVtb3ZlU2Nyb2xsQmFyLCBzaGFyZHM6IHNoYXJkcywgbm9SZWxhdGl2ZTogbm9SZWxhdGl2ZSwgbm9Jc29sYXRpb246IG5vSXNvbGF0aW9uLCBpbmVydDogaW5lcnQsIHNldENhbGxiYWNrczogc2V0Q2FsbGJhY2tzLCBhbGxvd1BpbmNoWm9vbTogISFhbGxvd1BpbmNoWm9vbSwgbG9ja1JlZjogcmVmLCBnYXBNb2RlOiBnYXBNb2RlIH0pKSxcbiAgICAgICAgZm9yd2FyZFByb3BzID8gKFJlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKSwgX19hc3NpZ24oX19hc3NpZ24oe30sIGNvbnRhaW5lclByb3BzKSwgeyByZWY6IGNvbnRhaW5lclJlZiB9KSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29udGFpbmVyLCBfX2Fzc2lnbih7fSwgY29udGFpbmVyUHJvcHMsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIHJlZjogY29udGFpbmVyUmVmIH0pLCBjaGlsZHJlbikpKSk7XG59KTtcblJlbW92ZVNjcm9sbC5kZWZhdWx0UHJvcHMgPSB7XG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICByZW1vdmVTY3JvbGxCYXI6IHRydWUsXG4gICAgaW5lcnQ6IGZhbHNlLFxufTtcblJlbW92ZVNjcm9sbC5jbGFzc05hbWVzID0ge1xuICAgIGZ1bGxXaWR0aDogZnVsbFdpZHRoQ2xhc3NOYW1lLFxuICAgIHplcm9SaWdodDogemVyb1JpZ2h0Q2xhc3NOYW1lLFxufTtcbmV4cG9ydCB7IFJlbW92ZVNjcm9sbCB9O1xuIiwidmFyIHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBhc3NpdmVTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG59XG5leHBvcnQgdmFyIG5vblBhc3NpdmUgPSBwYXNzaXZlU3VwcG9ydGVkID8geyBwYXNzaXZlOiBmYWxzZSB9IDogZmFsc2U7XG4iLCJ2YXIgYWx3YXlzQ29udGFpbnNTY3JvbGwgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIC8vIHRleHRhcmVhIHdpbGwgYWx3YXlzIF9jb250YWluXyBzY3JvbGwgaW5zaWRlIHNlbGYuIEl0IG9ubHkgY2FuIGJlIGhpZGRlblxuICAgIHJldHVybiBub2RlLnRhZ05hbWUgPT09ICdURVhUQVJFQSc7XG59O1xudmFyIGVsZW1lbnRDYW5CZVNjcm9sbGVkID0gZnVuY3Rpb24gKG5vZGUsIG92ZXJmbG93KSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIHJldHVybiAoXG4gICAgLy8gbm90LW5vdC1zY3JvbGxhYmxlXG4gICAgc3R5bGVzW292ZXJmbG93XSAhPT0gJ2hpZGRlbicgJiZcbiAgICAgICAgLy8gY29udGFpbnMgc2Nyb2xsIGluc2lkZSBzZWxmXG4gICAgICAgICEoc3R5bGVzLm92ZXJmbG93WSA9PT0gc3R5bGVzLm92ZXJmbG93WCAmJiAhYWx3YXlzQ29udGFpbnNTY3JvbGwobm9kZSkgJiYgc3R5bGVzW292ZXJmbG93XSA9PT0gJ3Zpc2libGUnKSk7XG59O1xudmFyIGVsZW1lbnRDb3VsZEJlVlNjcm9sbGVkID0gZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIGVsZW1lbnRDYW5CZVNjcm9sbGVkKG5vZGUsICdvdmVyZmxvd1knKTsgfTtcbnZhciBlbGVtZW50Q291bGRCZUhTY3JvbGxlZCA9IGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBlbGVtZW50Q2FuQmVTY3JvbGxlZChub2RlLCAnb3ZlcmZsb3dYJyk7IH07XG5leHBvcnQgdmFyIGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkID0gZnVuY3Rpb24gKGF4aXMsIG5vZGUpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICB2YXIgY3VycmVudCA9IG5vZGU7XG4gICAgZG8ge1xuICAgICAgICAvLyBTa2lwIG92ZXIgc2hhZG93IHJvb3RcbiAgICAgICAgaWYgKHR5cGVvZiBTaGFkb3dSb290ICE9PSAndW5kZWZpbmVkJyAmJiBjdXJyZW50IGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNTY3JvbGxhYmxlID0gZWxlbWVudENvdWxkQmVTY3JvbGxlZChheGlzLCBjdXJyZW50KTtcbiAgICAgICAgaWYgKGlzU2Nyb2xsYWJsZSkge1xuICAgICAgICAgICAgdmFyIF9hID0gZ2V0U2Nyb2xsVmFyaWFibGVzKGF4aXMsIGN1cnJlbnQpLCBzY3JvbGxIZWlnaHQgPSBfYVsxXSwgY2xpZW50SGVpZ2h0ID0gX2FbMl07XG4gICAgICAgICAgICBpZiAoc2Nyb2xsSGVpZ2h0ID4gY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgICB9IHdoaWxlIChjdXJyZW50ICYmIGN1cnJlbnQgIT09IG93bmVyRG9jdW1lbnQuYm9keSk7XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbnZhciBnZXRWU2Nyb2xsVmFyaWFibGVzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IF9hLnNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0ID0gX2Euc2Nyb2xsSGVpZ2h0LCBjbGllbnRIZWlnaHQgPSBfYS5jbGllbnRIZWlnaHQ7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgc2Nyb2xsVG9wLFxuICAgICAgICBzY3JvbGxIZWlnaHQsXG4gICAgICAgIGNsaWVudEhlaWdodCxcbiAgICBdO1xufTtcbnZhciBnZXRIU2Nyb2xsVmFyaWFibGVzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHNjcm9sbExlZnQgPSBfYS5zY3JvbGxMZWZ0LCBzY3JvbGxXaWR0aCA9IF9hLnNjcm9sbFdpZHRoLCBjbGllbnRXaWR0aCA9IF9hLmNsaWVudFdpZHRoO1xuICAgIHJldHVybiBbXG4gICAgICAgIHNjcm9sbExlZnQsXG4gICAgICAgIHNjcm9sbFdpZHRoLFxuICAgICAgICBjbGllbnRXaWR0aCxcbiAgICBdO1xufTtcbnZhciBlbGVtZW50Q291bGRCZVNjcm9sbGVkID0gZnVuY3Rpb24gKGF4aXMsIG5vZGUpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gJ3YnID8gZWxlbWVudENvdWxkQmVWU2Nyb2xsZWQobm9kZSkgOiBlbGVtZW50Q291bGRCZUhTY3JvbGxlZChub2RlKTtcbn07XG52YXIgZ2V0U2Nyb2xsVmFyaWFibGVzID0gZnVuY3Rpb24gKGF4aXMsIG5vZGUpIHtcbiAgICByZXR1cm4gYXhpcyA9PT0gJ3YnID8gZ2V0VlNjcm9sbFZhcmlhYmxlcyhub2RlKSA6IGdldEhTY3JvbGxWYXJpYWJsZXMobm9kZSk7XG59O1xudmFyIGdldERpcmVjdGlvbkZhY3RvciA9IGZ1bmN0aW9uIChheGlzLCBkaXJlY3Rpb24pIHtcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgZWxlbWVudCdzIGRpcmVjdGlvbiBpcyBydGwgKHJpZ2h0LXRvLWxlZnQpLCB0aGVuIHNjcm9sbExlZnQgaXMgMCB3aGVuIHRoZSBzY3JvbGxiYXIgaXMgYXQgaXRzIHJpZ2h0bW9zdCBwb3NpdGlvbixcbiAgICAgKiBhbmQgdGhlbiBpbmNyZWFzaW5nbHkgbmVnYXRpdmUgYXMgeW91IHNjcm9sbCB0b3dhcmRzIHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQuXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9zY3JvbGxMZWZ0XG4gICAgICovXG4gICAgcmV0dXJuIGF4aXMgPT09ICdoJyAmJiBkaXJlY3Rpb24gPT09ICdydGwnID8gLTEgOiAxO1xufTtcbmV4cG9ydCB2YXIgaGFuZGxlU2Nyb2xsID0gZnVuY3Rpb24gKGF4aXMsIGVuZFRhcmdldCwgZXZlbnQsIHNvdXJjZURlbHRhLCBub092ZXJzY3JvbGwpIHtcbiAgICB2YXIgZGlyZWN0aW9uRmFjdG9yID0gZ2V0RGlyZWN0aW9uRmFjdG9yKGF4aXMsIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVuZFRhcmdldCkuZGlyZWN0aW9uKTtcbiAgICB2YXIgZGVsdGEgPSBkaXJlY3Rpb25GYWN0b3IgKiBzb3VyY2VEZWx0YTtcbiAgICAvLyBmaW5kIHNjcm9sbGFibGUgdGFyZ2V0XG4gICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICB2YXIgdGFyZ2V0SW5Mb2NrID0gZW5kVGFyZ2V0LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgdmFyIHNob3VsZENhbmNlbFNjcm9sbCA9IGZhbHNlO1xuICAgIHZhciBpc0RlbHRhUG9zaXRpdmUgPSBkZWx0YSA+IDA7XG4gICAgdmFyIGF2YWlsYWJsZVNjcm9sbCA9IDA7XG4gICAgdmFyIGF2YWlsYWJsZVNjcm9sbFRvcCA9IDA7XG4gICAgZG8ge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gZ2V0U2Nyb2xsVmFyaWFibGVzKGF4aXMsIHRhcmdldCksIHBvc2l0aW9uID0gX2FbMF0sIHNjcm9sbF8xID0gX2FbMV0sIGNhcGFjaXR5ID0gX2FbMl07XG4gICAgICAgIHZhciBlbGVtZW50U2Nyb2xsID0gc2Nyb2xsXzEgLSBjYXBhY2l0eSAtIGRpcmVjdGlvbkZhY3RvciAqIHBvc2l0aW9uO1xuICAgICAgICBpZiAocG9zaXRpb24gfHwgZWxlbWVudFNjcm9sbCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRDb3VsZEJlU2Nyb2xsZWQoYXhpcywgdGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVNjcm9sbCArPSBlbGVtZW50U2Nyb2xsO1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVNjcm9sbFRvcCArPSBwb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFyZW50XzEgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgLy8gd2Ugd2lsbCBcImJ1YmJsZVwiIGZyb20gU2hhZG93RG9tIGluIGNhc2Ugd2UgYXJlLCBvciBqdXN0IHRvIHRoZSBwYXJlbnQgaW4gbm9ybWFsIGNhc2VcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBsb2dpYyB1c2VkIGluIGZvY3VzLWxvY2tcbiAgICAgICAgdGFyZ2V0ID0gKHBhcmVudF8xICYmIHBhcmVudF8xLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUgPyBwYXJlbnRfMS5ob3N0IDogcGFyZW50XzEpO1xuICAgIH0gd2hpbGUgKFxuICAgIC8vIHBvcnRhbGVkIGNvbnRlbnRcbiAgICAoIXRhcmdldEluTG9jayAmJiB0YXJnZXQgIT09IGRvY3VtZW50LmJvZHkpIHx8XG4gICAgICAgIC8vIHNlbGYgY29udGVudFxuICAgICAgICAodGFyZ2V0SW5Mb2NrICYmIChlbmRUYXJnZXQuY29udGFpbnModGFyZ2V0KSB8fCBlbmRUYXJnZXQgPT09IHRhcmdldCkpKTtcbiAgICAvLyBoYW5kbGUgZXBzaWxvbiBhcm91bmQgMCAobm9uIHN0YW5kYXJkIHpvb20gbGV2ZWxzKVxuICAgIGlmIChpc0RlbHRhUG9zaXRpdmUgJiZcbiAgICAgICAgKChub092ZXJzY3JvbGwgJiYgTWF0aC5hYnMoYXZhaWxhYmxlU2Nyb2xsKSA8IDEpIHx8ICghbm9PdmVyc2Nyb2xsICYmIGRlbHRhID4gYXZhaWxhYmxlU2Nyb2xsKSkpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsU2Nyb2xsID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIWlzRGVsdGFQb3NpdGl2ZSAmJlxuICAgICAgICAoKG5vT3ZlcnNjcm9sbCAmJiBNYXRoLmFicyhhdmFpbGFibGVTY3JvbGxUb3ApIDwgMSkgfHwgKCFub092ZXJzY3JvbGwgJiYgLWRlbHRhID4gYXZhaWxhYmxlU2Nyb2xsVG9wKSkpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsU2Nyb2xsID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3VsZENhbmNlbFNjcm9sbDtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVTaWRlY2FyTWVkaXVtIH0gZnJvbSAndXNlLXNpZGVjYXInO1xuZXhwb3J0IHZhciBlZmZlY3RDYXIgPSBjcmVhdGVTaWRlY2FyTWVkaXVtKCk7XG4iLCJpbXBvcnQgeyBleHBvcnRTaWRlY2FyIH0gZnJvbSAndXNlLXNpZGVjYXInO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsU2lkZUNhciB9IGZyb20gJy4vU2lkZUVmZmVjdCc7XG5pbXBvcnQgeyBlZmZlY3RDYXIgfSBmcm9tICcuL21lZGl1bSc7XG5leHBvcnQgZGVmYXVsdCBleHBvcnRTaWRlY2FyKGVmZmVjdENhciwgUmVtb3ZlU2Nyb2xsU2lkZUNhcik7XG4iLCJpbXBvcnQgeyBzdHlsZUhvb2tTaW5nbGV0b24gfSBmcm9tICcuL2hvb2snO1xuLyoqXG4gKiBjcmVhdGUgYSBDb21wb25lbnQgdG8gYWRkIHN0eWxlcyBvbiBkZW1hbmRcbiAqIC0gc3R5bGVzIGFyZSBhZGRlZCB3aGVuIGZpcnN0IGluc3RhbmNlIGlzIG1vdW50ZWRcbiAqIC0gc3R5bGVzIGFyZSByZW1vdmVkIHdoZW4gdGhlIGxhc3QgaW5zdGFuY2UgaXMgdW5tb3VudGVkXG4gKiAtIGNoYW5naW5nIHN0eWxlcyBpbiBydW50aW1lIGRvZXMgbm90aGluZyB1bmxlc3MgZHluYW1pYyBpcyBzZXQuIEJ1dCB3aXRoIG11bHRpcGxlIGNvbXBvbmVudHMgdGhhdCBjYW4gbGVhZCB0byB0aGUgdW5kZWZpbmVkIGJlaGF2aW9yXG4gKi9cbmV4cG9ydCB2YXIgc3R5bGVTaW5nbGV0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHVzZVN0eWxlID0gc3R5bGVIb29rU2luZ2xldG9uKCk7XG4gICAgdmFyIFNoZWV0ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBzdHlsZXMgPSBfYS5zdHlsZXMsIGR5bmFtaWMgPSBfYS5keW5hbWljO1xuICAgICAgICB1c2VTdHlsZShzdHlsZXMsIGR5bmFtaWMpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBTaGVldDtcbn07XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHlsZXNoZWV0U2luZ2xldG9uIH0gZnJvbSAnLi9zaW5nbGV0b24nO1xuLyoqXG4gKiBjcmVhdGVzIGEgaG9vayB0byBjb250cm9sIHN0eWxlIHNpbmdsZXRvblxuICogQHNlZSB7QGxpbmsgc3R5bGVTaW5nbGV0b259IGZvciBhIHNhZmVyIGNvbXBvbmVudCB2ZXJzaW9uXG4gKiBAZXhhbXBsZVxuICogYGBgdHN4XG4gKiBjb25zdCB1c2VTdHlsZSA9IHN0eWxlSG9va1NpbmdsZXRvbigpO1xuICogLy8vXG4gKiB1c2VTdHlsZSgnYm9keSB7IG92ZXJmbG93OiBoaWRkZW59Jyk7XG4gKi9cbmV4cG9ydCB2YXIgc3R5bGVIb29rU2luZ2xldG9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzaGVldCA9IHN0eWxlc2hlZXRTaW5nbGV0b24oKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHN0eWxlcywgaXNEeW5hbWljKSB7XG4gICAgICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzaGVldC5hZGQoc3R5bGVzKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2hlZXQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LCBbc3R5bGVzICYmIGlzRHluYW1pY10pO1xuICAgIH07XG59O1xuIiwiZXhwb3J0IHsgc3R5bGVTaW5nbGV0b24gfSBmcm9tICcuL2NvbXBvbmVudCc7XG5leHBvcnQgeyBzdHlsZXNoZWV0U2luZ2xldG9uIH0gZnJvbSAnLi9zaW5nbGV0b24nO1xuZXhwb3J0IHsgc3R5bGVIb29rU2luZ2xldG9uIH0gZnJvbSAnLi9ob29rJztcbiIsImltcG9ydCB7IGdldE5vbmNlIH0gZnJvbSAnZ2V0LW5vbmNlJztcbmZ1bmN0aW9uIG1ha2VTdHlsZVRhZygpIHtcbiAgICBpZiAoIWRvY3VtZW50KVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB2YXIgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICB0YWcudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgdmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcbiAgICBpZiAobm9uY2UpIHtcbiAgICAgICAgdGFnLnNldEF0dHJpYnV0ZSgnbm9uY2UnLCBub25jZSk7XG4gICAgfVxuICAgIHJldHVybiB0YWc7XG59XG5mdW5jdGlvbiBpbmplY3RTdHlsZXModGFnLCBjc3MpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKHRhZy5zdHlsZVNoZWV0KSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGFnLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbnNlcnRTdHlsZVRhZyh0YWcpIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHRhZyk7XG59XG5leHBvcnQgdmFyIHN0eWxlc2hlZXRTaW5nbGV0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHZhciBzdHlsZXNoZWV0ID0gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmICgoc3R5bGVzaGVldCA9IG1ha2VTdHlsZVRhZygpKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmplY3RTdHlsZXMoc3R5bGVzaGVldCwgc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRTdHlsZVRhZyhzdHlsZXNoZWV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY291bnRlci0tO1xuICAgICAgICAgICAgaWYgKCFjb3VudGVyICYmIHN0eWxlc2hlZXQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0LnBhcmVudE5vZGUgJiYgc3R5bGVzaGVldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlc2hlZXQpO1xuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59O1xuIiwiLyoqXG4gKiBBc3NpZ25zIGEgdmFsdWUgZm9yIGEgZ2l2ZW4gcmVmLCBubyBtYXR0ZXIgb2YgdGhlIHJlZiBmb3JtYXRcbiAqIEBwYXJhbSB7UmVmT2JqZWN0fSByZWYgLSBhIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIHJlZiBvYmplY3RcbiAqIEBwYXJhbSB2YWx1ZSAtIGEgbmV3IHZhbHVlXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjYXNzaWducmVmXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVmT2JqZWN0ID0gdXNlUmVmKCk7XG4gKiBjb25zdCByZWZGbiA9IChyZWYpID0+IHsuLi4ufVxuICpcbiAqIGFzc2lnblJlZihyZWZPYmplY3QsIFwicmVmVmFsdWVcIik7XG4gKiBhc3NpZ25SZWYocmVmRm4sIFwicmVmVmFsdWVcIik7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ25SZWYocmVmLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlZih2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlZikge1xuICAgICAgICByZWYuY3VycmVudCA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVmO1xufVxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYXNzaWduUmVmIH0gZnJvbSAnLi9hc3NpZ25SZWYnO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tICcuL3VzZVJlZic7XG52YXIgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gUmVhY3QudXNlTGF5b3V0RWZmZWN0IDogUmVhY3QudXNlRWZmZWN0O1xudmFyIGN1cnJlbnRWYWx1ZXMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBNZXJnZXMgdHdvIG9yIG1vcmUgcmVmcyB0b2dldGhlciBwcm92aWRpbmcgYSBzaW5nbGUgaW50ZXJmYWNlIHRvIHNldCB0aGVpciB2YWx1ZVxuICogQHBhcmFtIHtSZWZPYmplY3R8UmVmfSByZWZzXG4gKiBAcmV0dXJucyB7TXV0YWJsZVJlZk9iamVjdH0gLSBhIG5ldyByZWYsIHdoaWNoIHRyYW5zbGF0ZXMgYWxsIGNoYW5nZXMgdG8ge3JlZnN9XG4gKlxuICogQHNlZSB7QGxpbmsgbWVyZ2VSZWZzfSBhIHZlcnNpb24gd2l0aG91dCBidWl0LWluIG1lbW9pemF0aW9uXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvdXNlLWNhbGxiYWNrLXJlZiN1c2VtZXJnZXJlZnNcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBDb21wb25lbnQgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG4gKiAgIGNvbnN0IG93blJlZiA9IHVzZVJlZigpO1xuICogICBjb25zdCBkb21SZWYgPSB1c2VNZXJnZVJlZnMoW3JlZiwgb3duUmVmXSk7IC8vIPCfkYggbWVyZ2UgdG9nZXRoZXJcbiAqICAgcmV0dXJuIDxkaXYgcmVmPXtkb21SZWZ9Pi4uLjwvZGl2PlxuICogfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlTWVyZ2VSZWZzKHJlZnMsIGRlZmF1bHRWYWx1ZSkge1xuICAgIHZhciBjYWxsYmFja1JlZiA9IHVzZUNhbGxiYWNrUmVmKGRlZmF1bHRWYWx1ZSB8fCBudWxsLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHJlZnMuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7IHJldHVybiBhc3NpZ25SZWYocmVmLCBuZXdWYWx1ZSk7IH0pO1xuICAgIH0pO1xuICAgIC8vIGhhbmRsZSByZWZzIGNoYW5nZXMgLSBhZGRlZCBvciByZW1vdmVkXG4gICAgdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IGN1cnJlbnRWYWx1ZXMuZ2V0KGNhbGxiYWNrUmVmKTtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcHJldlJlZnNfMSA9IG5ldyBTZXQob2xkVmFsdWUpO1xuICAgICAgICAgICAgdmFyIG5leHRSZWZzXzEgPSBuZXcgU2V0KHJlZnMpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRfMSA9IGNhbGxiYWNrUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICBwcmV2UmVmc18xLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgIGlmICghbmV4dFJlZnNfMS5oYXMocmVmKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25SZWYocmVmLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5leHRSZWZzXzEuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2UmVmc18xLmhhcyhyZWYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnblJlZihyZWYsIGN1cnJlbnRfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFZhbHVlcy5zZXQoY2FsbGJhY2tSZWYsIHJlZnMpO1xuICAgIH0sIFtyZWZzXSk7XG4gICAgcmV0dXJuIGNhbGxiYWNrUmVmO1xufVxuIiwiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG4vKipcbiAqIGNyZWF0ZXMgYSBNdXRhYmxlUmVmIHdpdGggcmVmIGNoYW5nZSBjYWxsYmFja1xuICogQHBhcmFtIGluaXRpYWxWYWx1ZSAtIGluaXRpYWwgcmVmIHZhbHVlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGEgY2FsbGJhY2sgdG8gcnVuIHdoZW4gdmFsdWUgY2hhbmdlc1xuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByZWYgPSB1c2VDYWxsYmFja1JlZigwLCAobmV3VmFsdWUsIG9sZFZhbHVlKSA9PiBjb25zb2xlLmxvZyhvbGRWYWx1ZSwgJy0+JywgbmV3VmFsdWUpO1xuICogcmVmLmN1cnJlbnQgPSAxO1xuICogLy8gcHJpbnRzIDAgLT4gMVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL2hvb2tzLXJlZmVyZW5jZS5odG1sI3VzZXJlZlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjdXNlY2FsbGJhY2tyZWYtLS10by1yZXBsYWNlLXJlYWN0dXNlcmVmXG4gKiBAcmV0dXJucyB7TXV0YWJsZVJlZk9iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhbGxiYWNrUmVmKGluaXRpYWxWYWx1ZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVmID0gdXNlU3RhdGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gKHtcbiAgICAgICAgLy8gdmFsdWVcbiAgICAgICAgdmFsdWU6IGluaXRpYWxWYWx1ZSxcbiAgICAgICAgLy8gbGFzdCBjYWxsYmFja1xuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgIC8vIFwibWVtb2l6ZWRcIiBwdWJsaWMgaW50ZXJmYWNlXG4gICAgICAgIGZhY2FkZToge1xuICAgICAgICAgICAgZ2V0IGN1cnJlbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZi52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgY3VycmVudCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0ID0gcmVmLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZWYudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVmLmNhbGxiYWNrKHZhbHVlLCBsYXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0pOyB9KVswXTtcbiAgICAvLyB1cGRhdGUgY2FsbGJhY2tcbiAgICByZWYuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICByZXR1cm4gcmVmLmZhY2FkZTtcbn1cbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX3Jlc3QgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbnZhciBTaWRlQ2FyID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIHNpZGVDYXIgPSBfYS5zaWRlQ2FyLCByZXN0ID0gX19yZXN0KF9hLCBbXCJzaWRlQ2FyXCJdKTtcbiAgICBpZiAoIXNpZGVDYXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWRlY2FyOiBwbGVhc2UgcHJvdmlkZSBgc2lkZUNhcmAgcHJvcGVydHkgdG8gaW1wb3J0IHRoZSByaWdodCBjYXInKTtcbiAgICB9XG4gICAgdmFyIFRhcmdldCA9IHNpZGVDYXIucmVhZCgpO1xuICAgIGlmICghVGFyZ2V0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2lkZWNhciBtZWRpdW0gbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRhcmdldCwgX19hc3NpZ24oe30sIHJlc3QpKTtcbn07XG5TaWRlQ2FyLmlzU2lkZUNhckV4cG9ydCA9IHRydWU7XG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0U2lkZWNhcihtZWRpdW0sIGV4cG9ydGVkKSB7XG4gICAgbWVkaXVtLnVzZU1lZGl1bShleHBvcnRlZCk7XG4gICAgcmV0dXJuIFNpZGVDYXI7XG59XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuZnVuY3Rpb24gSXRvSShhKSB7XG4gICAgcmV0dXJuIGE7XG59XG5mdW5jdGlvbiBpbm5lckNyZWF0ZU1lZGl1bShkZWZhdWx0cywgbWlkZGxld2FyZSkge1xuICAgIGlmIChtaWRkbGV3YXJlID09PSB2b2lkIDApIHsgbWlkZGxld2FyZSA9IEl0b0k7IH1cbiAgICB2YXIgYnVmZmVyID0gW107XG4gICAgdmFyIGFzc2lnbmVkID0gZmFsc2U7XG4gICAgdmFyIG1lZGl1bSA9IHtcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGFzc2lnbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWRlY2FyOiBjb3VsZCBub3QgYHJlYWRgIGZyb20gYW4gYGFzc2lnbmVkYCBtZWRpdW0uIGByZWFkYCBjb3VsZCBiZSB1c2VkIG9ubHkgd2l0aCBgdXNlTWVkaXVtYC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcltidWZmZXIubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgICAgIH0sXG4gICAgICAgIHVzZU1lZGl1bTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gbWlkZGxld2FyZShkYXRhLCBhc3NpZ25lZCk7XG4gICAgICAgICAgICBidWZmZXIucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gYnVmZmVyLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geCAhPT0gaXRlbTsgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhc3NpZ25TeW5jTWVkaXVtOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIGFzc2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHdoaWxlIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNicyA9IGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBjYnMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWZmZXIgPSB7XG4gICAgICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIGNiKHgpOyB9LFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVmZmVyOyB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgYXNzaWduTWVkaXVtOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgIGFzc2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBwZW5kaW5nUXVldWUgPSBbXTtcbiAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNicyA9IGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBjYnMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1F1ZXVlID0gYnVmZmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGV4ZWN1dGVRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2JzID0gcGVuZGluZ1F1ZXVlO1xuICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIGNicy5mb3JFYWNoKGNiKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY3ljbGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGV4ZWN1dGVRdWV1ZSk7IH07XG4gICAgICAgICAgICBjeWNsZSgpO1xuICAgICAgICAgICAgYnVmZmVyID0ge1xuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZS5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICBjeWNsZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZSA9IHBlbmRpbmdRdWV1ZS5maWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBtZWRpdW07XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVkaXVtKGRlZmF1bHRzLCBtaWRkbGV3YXJlKSB7XG4gICAgaWYgKG1pZGRsZXdhcmUgPT09IHZvaWQgMCkgeyBtaWRkbGV3YXJlID0gSXRvSTsgfVxuICAgIHJldHVybiBpbm5lckNyZWF0ZU1lZGl1bShkZWZhdWx0cywgbWlkZGxld2FyZSk7XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNpZGVjYXJNZWRpdW0ob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIG1lZGl1bSA9IGlubmVyQ3JlYXRlTWVkaXVtKG51bGwpO1xuICAgIG1lZGl1bS5vcHRpb25zID0gX19hc3NpZ24oeyBhc3luYzogdHJ1ZSwgc3NyOiBmYWxzZSB9LCBvcHRpb25zKTtcbiAgICByZXR1cm4gbWVkaXVtO1xufVxuIiwiLy8gc3JjL3ByaW1pdGl2ZS50c3hcbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5mdW5jdGlvbiBjb21wb3NlRXZlbnRIYW5kbGVycyhvcmlnaW5hbEV2ZW50SGFuZGxlciwgb3VyRXZlbnRIYW5kbGVyLCB7IGNoZWNrRm9yRGVmYXVsdFByZXZlbnRlZCA9IHRydWUgfSA9IHt9KSB7XG4gIHJldHVybiBmdW5jdGlvbiBoYW5kbGVFdmVudChldmVudCkge1xuICAgIG9yaWdpbmFsRXZlbnRIYW5kbGVyPy4oZXZlbnQpO1xuICAgIGlmIChjaGVja0ZvckRlZmF1bHRQcmV2ZW50ZWQgPT09IGZhbHNlIHx8ICFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm4gb3VyRXZlbnRIYW5kbGVyPy4oZXZlbnQpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIGdldE93bmVyV2luZG93KGVsZW1lbnQpIHtcbiAgaWYgKCFjYW5Vc2VET00pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWNjZXNzIHdpbmRvdyBvdXRzaWRlIG9mIHRoZSBET01cIik7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ/Lm93bmVyRG9jdW1lbnQ/LmRlZmF1bHRWaWV3ID8/IHdpbmRvdztcbn1cbmZ1bmN0aW9uIGdldE93bmVyRG9jdW1lbnQoZWxlbWVudCkge1xuICBpZiAoIWNhblVzZURPTSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhY2Nlc3MgZG9jdW1lbnQgb3V0c2lkZSBvZiB0aGUgRE9NXCIpO1xuICB9XG4gIHJldHVybiBlbGVtZW50Py5vd25lckRvY3VtZW50ID8/IGRvY3VtZW50O1xufVxuZnVuY3Rpb24gZ2V0QWN0aXZlRWxlbWVudChub2RlLCBhY3RpdmVEZXNjZW5kYW50ID0gZmFsc2UpIHtcbiAgY29uc3QgeyBhY3RpdmVFbGVtZW50IH0gPSBnZXRPd25lckRvY3VtZW50KG5vZGUpO1xuICBpZiAoIWFjdGl2ZUVsZW1lbnQ/Lm5vZGVOYW1lKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKGlzRnJhbWUoYWN0aXZlRWxlbWVudCkgJiYgYWN0aXZlRWxlbWVudC5jb250ZW50RG9jdW1lbnQpIHtcbiAgICByZXR1cm4gZ2V0QWN0aXZlRWxlbWVudChhY3RpdmVFbGVtZW50LmNvbnRlbnREb2N1bWVudC5ib2R5LCBhY3RpdmVEZXNjZW5kYW50KTtcbiAgfVxuICBpZiAoYWN0aXZlRGVzY2VuZGFudCkge1xuICAgIGNvbnN0IGlkID0gYWN0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIik7XG4gICAgaWYgKGlkKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZ2V0T3duZXJEb2N1bWVudChhY3RpdmVFbGVtZW50KS5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFjdGl2ZUVsZW1lbnQ7XG59XG5mdW5jdGlvbiBpc0ZyYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZSA9PT0gXCJJRlJBTUVcIjtcbn1cbmV4cG9ydCB7XG4gIGNhblVzZURPTSxcbiAgY29tcG9zZUV2ZW50SGFuZGxlcnMsXG4gIGdldEFjdGl2ZUVsZW1lbnQsXG4gIGdldE93bmVyRG9jdW1lbnQsXG4gIGdldE93bmVyV2luZG93LFxuICBpc0ZyYW1lXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvY29udGV4dC9zcmMvY3JlYXRlLWNvbnRleHQudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuZnVuY3Rpb24gY3JlYXRlQ29udGV4dDIocm9vdENvbXBvbmVudE5hbWUsIGRlZmF1bHRDb250ZXh0KSB7XG4gIGNvbnN0IENvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KGRlZmF1bHRDb250ZXh0KTtcbiAgY29uc3QgUHJvdmlkZXIgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5jb250ZXh0IH0gPSBwcm9wcztcbiAgICBjb25zdCB2YWx1ZSA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gY29udGV4dCwgT2JqZWN0LnZhbHVlcyhjb250ZXh0KSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZSwgY2hpbGRyZW4gfSk7XG4gIH07XG4gIFByb3ZpZGVyLmRpc3BsYXlOYW1lID0gcm9vdENvbXBvbmVudE5hbWUgKyBcIlByb3ZpZGVyXCI7XG4gIGZ1bmN0aW9uIHVzZUNvbnRleHQyKGNvbnN1bWVyTmFtZSkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KENvbnRleHQpO1xuICAgIGlmIChjb250ZXh0KSByZXR1cm4gY29udGV4dDtcbiAgICBpZiAoZGVmYXVsdENvbnRleHQgIT09IHZvaWQgMCkgcmV0dXJuIGRlZmF1bHRDb250ZXh0O1xuICAgIHRocm93IG5ldyBFcnJvcihgXFxgJHtjb25zdW1lck5hbWV9XFxgIG11c3QgYmUgdXNlZCB3aXRoaW4gXFxgJHtyb290Q29tcG9uZW50TmFtZX1cXGBgKTtcbiAgfVxuICByZXR1cm4gW1Byb3ZpZGVyLCB1c2VDb250ZXh0Ml07XG59XG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0U2NvcGUoc2NvcGVOYW1lLCBjcmVhdGVDb250ZXh0U2NvcGVEZXBzID0gW10pIHtcbiAgbGV0IGRlZmF1bHRDb250ZXh0cyA9IFtdO1xuICBmdW5jdGlvbiBjcmVhdGVDb250ZXh0Myhyb290Q29tcG9uZW50TmFtZSwgZGVmYXVsdENvbnRleHQpIHtcbiAgICBjb25zdCBCYXNlQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoZGVmYXVsdENvbnRleHQpO1xuICAgIGNvbnN0IGluZGV4ID0gZGVmYXVsdENvbnRleHRzLmxlbmd0aDtcbiAgICBkZWZhdWx0Q29udGV4dHMgPSBbLi4uZGVmYXVsdENvbnRleHRzLCBkZWZhdWx0Q29udGV4dF07XG4gICAgY29uc3QgUHJvdmlkZXIgPSAocHJvcHMpID0+IHtcbiAgICAgIGNvbnN0IHsgc2NvcGUsIGNoaWxkcmVuLCAuLi5jb250ZXh0IH0gPSBwcm9wcztcbiAgICAgIGNvbnN0IENvbnRleHQgPSBzY29wZT8uW3Njb3BlTmFtZV0/LltpbmRleF0gfHwgQmFzZUNvbnRleHQ7XG4gICAgICBjb25zdCB2YWx1ZSA9IFJlYWN0LnVzZU1lbW8oKCkgPT4gY29udGV4dCwgT2JqZWN0LnZhbHVlcyhjb250ZXh0KSk7XG4gICAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChDb250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlLCBjaGlsZHJlbiB9KTtcbiAgICB9O1xuICAgIFByb3ZpZGVyLmRpc3BsYXlOYW1lID0gcm9vdENvbXBvbmVudE5hbWUgKyBcIlByb3ZpZGVyXCI7XG4gICAgZnVuY3Rpb24gdXNlQ29udGV4dDIoY29uc3VtZXJOYW1lLCBzY29wZSkge1xuICAgICAgY29uc3QgQ29udGV4dCA9IHNjb3BlPy5bc2NvcGVOYW1lXT8uW2luZGV4XSB8fCBCYXNlQ29udGV4dDtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KENvbnRleHQpO1xuICAgICAgaWYgKGNvbnRleHQpIHJldHVybiBjb250ZXh0O1xuICAgICAgaWYgKGRlZmF1bHRDb250ZXh0ICE9PSB2b2lkIDApIHJldHVybiBkZWZhdWx0Q29udGV4dDtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXFxgJHtjb25zdW1lck5hbWV9XFxgIG11c3QgYmUgdXNlZCB3aXRoaW4gXFxgJHtyb290Q29tcG9uZW50TmFtZX1cXGBgKTtcbiAgICB9XG4gICAgcmV0dXJuIFtQcm92aWRlciwgdXNlQ29udGV4dDJdO1xuICB9XG4gIGNvbnN0IGNyZWF0ZVNjb3BlID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjb3BlQ29udGV4dHMgPSBkZWZhdWx0Q29udGV4dHMubWFwKChkZWZhdWx0Q29udGV4dCkgPT4ge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUNvbnRleHQoZGVmYXVsdENvbnRleHQpO1xuICAgIH0pO1xuICAgIHJldHVybiBmdW5jdGlvbiB1c2VTY29wZShzY29wZSkge1xuICAgICAgY29uc3QgY29udGV4dHMgPSBzY29wZT8uW3Njb3BlTmFtZV0gfHwgc2NvcGVDb250ZXh0cztcbiAgICAgIHJldHVybiBSZWFjdC51c2VNZW1vKFxuICAgICAgICAoKSA9PiAoeyBbYF9fc2NvcGUke3Njb3BlTmFtZX1gXTogeyAuLi5zY29wZSwgW3Njb3BlTmFtZV06IGNvbnRleHRzIH0gfSksXG4gICAgICAgIFtzY29wZSwgY29udGV4dHNdXG4gICAgICApO1xuICAgIH07XG4gIH07XG4gIGNyZWF0ZVNjb3BlLnNjb3BlTmFtZSA9IHNjb3BlTmFtZTtcbiAgcmV0dXJuIFtjcmVhdGVDb250ZXh0MywgY29tcG9zZUNvbnRleHRTY29wZXMoY3JlYXRlU2NvcGUsIC4uLmNyZWF0ZUNvbnRleHRTY29wZURlcHMpXTtcbn1cbmZ1bmN0aW9uIGNvbXBvc2VDb250ZXh0U2NvcGVzKC4uLnNjb3Blcykge1xuICBjb25zdCBiYXNlU2NvcGUgPSBzY29wZXNbMF07XG4gIGlmIChzY29wZXMubGVuZ3RoID09PSAxKSByZXR1cm4gYmFzZVNjb3BlO1xuICBjb25zdCBjcmVhdGVTY29wZSA9ICgpID0+IHtcbiAgICBjb25zdCBzY29wZUhvb2tzID0gc2NvcGVzLm1hcCgoY3JlYXRlU2NvcGUyKSA9PiAoe1xuICAgICAgdXNlU2NvcGU6IGNyZWF0ZVNjb3BlMigpLFxuICAgICAgc2NvcGVOYW1lOiBjcmVhdGVTY29wZTIuc2NvcGVOYW1lXG4gICAgfSkpO1xuICAgIHJldHVybiBmdW5jdGlvbiB1c2VDb21wb3NlZFNjb3BlcyhvdmVycmlkZVNjb3Blcykge1xuICAgICAgY29uc3QgbmV4dFNjb3BlcyA9IHNjb3BlSG9va3MucmVkdWNlKChuZXh0U2NvcGVzMiwgeyB1c2VTY29wZSwgc2NvcGVOYW1lIH0pID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcGVQcm9wcyA9IHVzZVNjb3BlKG92ZXJyaWRlU2NvcGVzKTtcbiAgICAgICAgY29uc3QgY3VycmVudFNjb3BlID0gc2NvcGVQcm9wc1tgX19zY29wZSR7c2NvcGVOYW1lfWBdO1xuICAgICAgICByZXR1cm4geyAuLi5uZXh0U2NvcGVzMiwgLi4uY3VycmVudFNjb3BlIH07XG4gICAgICB9LCB7fSk7XG4gICAgICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiAoeyBbYF9fc2NvcGUke2Jhc2VTY29wZS5zY29wZU5hbWV9YF06IG5leHRTY29wZXMgfSksIFtuZXh0U2NvcGVzXSk7XG4gICAgfTtcbiAgfTtcbiAgY3JlYXRlU2NvcGUuc2NvcGVOYW1lID0gYmFzZVNjb3BlLnNjb3BlTmFtZTtcbiAgcmV0dXJuIGNyZWF0ZVNjb3BlO1xufVxuZXhwb3J0IHtcbiAgY3JlYXRlQ29udGV4dDIgYXMgY3JlYXRlQ29udGV4dCxcbiAgY3JlYXRlQ29udGV4dFNjb3BlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9kaWFsb2cudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNvbXBvc2VFdmVudEhhbmRsZXJzIH0gZnJvbSBcIkByYWRpeC11aS9wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0LCBjcmVhdGVDb250ZXh0U2NvcGUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbnRleHRcIjtcbmltcG9ydCB7IHVzZUlkIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1pZFwiO1xuaW1wb3J0IHsgdXNlQ29udHJvbGxhYmxlU3RhdGUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jb250cm9sbGFibGUtc3RhdGVcIjtcbmltcG9ydCB7IERpc21pc3NhYmxlTGF5ZXIgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWRpc21pc3NhYmxlLWxheWVyXCI7XG5pbXBvcnQgeyBGb2N1c1Njb3BlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1mb2N1cy1zY29wZVwiO1xuaW1wb3J0IHsgUG9ydGFsIGFzIFBvcnRhbFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcG9ydGFsXCI7XG5pbXBvcnQgeyBQcmVzZW5jZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJlc2VuY2VcIjtcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VGb2N1c0d1YXJkcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtZm9jdXMtZ3VhcmRzXCI7XG5pbXBvcnQgeyBSZW1vdmVTY3JvbGwgfSBmcm9tIFwicmVhY3QtcmVtb3ZlLXNjcm9sbFwiO1xuaW1wb3J0IHsgaGlkZU90aGVycyB9IGZyb20gXCJhcmlhLWhpZGRlblwiO1xuaW1wb3J0IHsgY3JlYXRlU2xvdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3Qtc2xvdFwiO1xuaW1wb3J0IHsgRnJhZ21lbnQsIGpzeCwganN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIERJQUxPR19OQU1FID0gXCJEaWFsb2dcIjtcbnZhciBbY3JlYXRlRGlhbG9nQ29udGV4dCwgY3JlYXRlRGlhbG9nU2NvcGVdID0gY3JlYXRlQ29udGV4dFNjb3BlKERJQUxPR19OQU1FKTtcbnZhciBbRGlhbG9nUHJvdmlkZXIsIHVzZURpYWxvZ0NvbnRleHRdID0gY3JlYXRlRGlhbG9nQ29udGV4dChESUFMT0dfTkFNRSk7XG52YXIgRGlhbG9nID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBfX3Njb3BlRGlhbG9nLFxuICAgIGNoaWxkcmVuLFxuICAgIG9wZW46IG9wZW5Qcm9wLFxuICAgIGRlZmF1bHRPcGVuLFxuICAgIG9uT3BlbkNoYW5nZSxcbiAgICBtb2RhbCA9IHRydWVcbiAgfSA9IHByb3BzO1xuICBjb25zdCB0cmlnZ2VyUmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBjb250ZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VDb250cm9sbGFibGVTdGF0ZSh7XG4gICAgcHJvcDogb3BlblByb3AsXG4gICAgZGVmYXVsdFByb3A6IGRlZmF1bHRPcGVuID8/IGZhbHNlLFxuICAgIG9uQ2hhbmdlOiBvbk9wZW5DaGFuZ2UsXG4gICAgY2FsbGVyOiBESUFMT0dfTkFNRVxuICB9KTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgRGlhbG9nUHJvdmlkZXIsXG4gICAge1xuICAgICAgc2NvcGU6IF9fc2NvcGVEaWFsb2csXG4gICAgICB0cmlnZ2VyUmVmLFxuICAgICAgY29udGVudFJlZixcbiAgICAgIGNvbnRlbnRJZDogdXNlSWQoKSxcbiAgICAgIHRpdGxlSWQ6IHVzZUlkKCksXG4gICAgICBkZXNjcmlwdGlvbklkOiB1c2VJZCgpLFxuICAgICAgb3BlbixcbiAgICAgIG9uT3BlbkNoYW5nZTogc2V0T3BlbixcbiAgICAgIG9uT3BlblRvZ2dsZTogUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4gc2V0T3BlbigocHJldk9wZW4pID0+ICFwcmV2T3BlbiksIFtzZXRPcGVuXSksXG4gICAgICBtb2RhbCxcbiAgICAgIGNoaWxkcmVuXG4gICAgfVxuICApO1xufTtcbkRpYWxvZy5kaXNwbGF5TmFtZSA9IERJQUxPR19OQU1FO1xudmFyIFRSSUdHRVJfTkFNRSA9IFwiRGlhbG9nVHJpZ2dlclwiO1xudmFyIERpYWxvZ1RyaWdnZXIgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4udHJpZ2dlclByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChUUklHR0VSX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGNvbXBvc2VkVHJpZ2dlclJlZiA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIGNvbnRleHQudHJpZ2dlclJlZik7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBQcmltaXRpdmUuYnV0dG9uLFxuICAgICAge1xuICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICBcImFyaWEtaGFzcG9wdXBcIjogXCJkaWFsb2dcIixcbiAgICAgICAgXCJhcmlhLWV4cGFuZGVkXCI6IGNvbnRleHQub3BlbixcbiAgICAgICAgXCJhcmlhLWNvbnRyb2xzXCI6IGNvbnRleHQuY29udGVudElkLFxuICAgICAgICBcImRhdGEtc3RhdGVcIjogZ2V0U3RhdGUoY29udGV4dC5vcGVuKSxcbiAgICAgICAgLi4udHJpZ2dlclByb3BzLFxuICAgICAgICByZWY6IGNvbXBvc2VkVHJpZ2dlclJlZixcbiAgICAgICAgb25DbGljazogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25DbGljaywgY29udGV4dC5vbk9wZW5Ub2dnbGUpXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbkRpYWxvZ1RyaWdnZXIuZGlzcGxheU5hbWUgPSBUUklHR0VSX05BTUU7XG52YXIgUE9SVEFMX05BTUUgPSBcIkRpYWxvZ1BvcnRhbFwiO1xudmFyIFtQb3J0YWxQcm92aWRlciwgdXNlUG9ydGFsQ29udGV4dF0gPSBjcmVhdGVEaWFsb2dDb250ZXh0KFBPUlRBTF9OQU1FLCB7XG4gIGZvcmNlTW91bnQ6IHZvaWQgMFxufSk7XG52YXIgRGlhbG9nUG9ydGFsID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgX19zY29wZURpYWxvZywgZm9yY2VNb3VudCwgY2hpbGRyZW4sIGNvbnRhaW5lciB9ID0gcHJvcHM7XG4gIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KFBPUlRBTF9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUG9ydGFsUHJvdmlkZXIsIHsgc2NvcGU6IF9fc2NvcGVEaWFsb2csIGZvcmNlTW91bnQsIGNoaWxkcmVuOiBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChjaGlsZCkgPT4gLyogQF9fUFVSRV9fICovIGpzeChQcmVzZW5jZSwgeyBwcmVzZW50OiBmb3JjZU1vdW50IHx8IGNvbnRleHQub3BlbiwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goUG9ydGFsUHJpbWl0aXZlLCB7IGFzQ2hpbGQ6IHRydWUsIGNvbnRhaW5lciwgY2hpbGRyZW46IGNoaWxkIH0pIH0pKSB9KTtcbn07XG5EaWFsb2dQb3J0YWwuZGlzcGxheU5hbWUgPSBQT1JUQUxfTkFNRTtcbnZhciBPVkVSTEFZX05BTUUgPSBcIkRpYWxvZ092ZXJsYXlcIjtcbnZhciBEaWFsb2dPdmVybGF5ID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCBwb3J0YWxDb250ZXh0ID0gdXNlUG9ydGFsQ29udGV4dChPVkVSTEFZX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IHsgZm9yY2VNb3VudCA9IHBvcnRhbENvbnRleHQuZm9yY2VNb3VudCwgLi4ub3ZlcmxheVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChPVkVSTEFZX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiBjb250ZXh0Lm1vZGFsID8gLyogQF9fUFVSRV9fICovIGpzeChQcmVzZW5jZSwgeyBwcmVzZW50OiBmb3JjZU1vdW50IHx8IGNvbnRleHQub3BlbiwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goRGlhbG9nT3ZlcmxheUltcGwsIHsgLi4ub3ZlcmxheVByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSB9KSA6IG51bGw7XG4gIH1cbik7XG5EaWFsb2dPdmVybGF5LmRpc3BsYXlOYW1lID0gT1ZFUkxBWV9OQU1FO1xudmFyIFNsb3QgPSBjcmVhdGVTbG90KFwiRGlhbG9nT3ZlcmxheS5SZW1vdmVTY3JvbGxcIik7XG52YXIgRGlhbG9nT3ZlcmxheUltcGwgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4ub3ZlcmxheVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChPVkVSTEFZX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAoXG4gICAgICAvLyBNYWtlIHN1cmUgYENvbnRlbnRgIGlzIHNjcm9sbGFibGUgZXZlbiB3aGVuIGl0IGRvZXNuJ3QgbGl2ZSBpbnNpZGUgYFJlbW92ZVNjcm9sbGBcbiAgICAgIC8vIGllLiB3aGVuIGBPdmVybGF5YCBhbmQgYENvbnRlbnRgIGFyZSBzaWJsaW5nc1xuICAgICAgLyogQF9fUFVSRV9fICovIGpzeChSZW1vdmVTY3JvbGwsIHsgYXM6IFNsb3QsIGFsbG93UGluY2hab29tOiB0cnVlLCBzaGFyZHM6IFtjb250ZXh0LmNvbnRlbnRSZWZdLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgICAgUHJpbWl0aXZlLmRpdixcbiAgICAgICAge1xuICAgICAgICAgIFwiZGF0YS1zdGF0ZVwiOiBnZXRTdGF0ZShjb250ZXh0Lm9wZW4pLFxuICAgICAgICAgIC4uLm92ZXJsYXlQcm9wcyxcbiAgICAgICAgICByZWY6IGZvcndhcmRlZFJlZixcbiAgICAgICAgICBzdHlsZTogeyBwb2ludGVyRXZlbnRzOiBcImF1dG9cIiwgLi4ub3ZlcmxheVByb3BzLnN0eWxlIH1cbiAgICAgICAgfVxuICAgICAgKSB9KVxuICAgICk7XG4gIH1cbik7XG52YXIgQ09OVEVOVF9OQU1FID0gXCJEaWFsb2dDb250ZW50XCI7XG52YXIgRGlhbG9nQ29udGVudCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgcG9ydGFsQ29udGV4dCA9IHVzZVBvcnRhbENvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCB7IGZvcmNlTW91bnQgPSBwb3J0YWxDb250ZXh0LmZvcmNlTW91bnQsIC4uLmNvbnRlbnRQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmVzZW5jZSwgeyBwcmVzZW50OiBmb3JjZU1vdW50IHx8IGNvbnRleHQub3BlbiwgY2hpbGRyZW46IGNvbnRleHQubW9kYWwgPyAvKiBAX19QVVJFX18gKi8ganN4KERpYWxvZ0NvbnRlbnRNb2RhbCwgeyAuLi5jb250ZW50UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pIDogLyogQF9fUFVSRV9fICovIGpzeChEaWFsb2dDb250ZW50Tm9uTW9kYWwsIHsgLi4uY29udGVudFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSB9KTtcbiAgfVxuKTtcbkRpYWxvZ0NvbnRlbnQuZGlzcGxheU5hbWUgPSBDT05URU5UX05BTUU7XG52YXIgRGlhbG9nQ29udGVudE1vZGFsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDT05URU5UX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgY29udGV4dC5jb250ZW50UmVmLCBjb250ZW50UmVmKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IGNvbnRlbnRSZWYuY3VycmVudDtcbiAgICAgIGlmIChjb250ZW50KSByZXR1cm4gaGlkZU90aGVycyhjb250ZW50KTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBEaWFsb2dDb250ZW50SW1wbCxcbiAgICAgIHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIHJlZjogY29tcG9zZWRSZWZzLFxuICAgICAgICB0cmFwRm9jdXM6IGNvbnRleHQub3BlbixcbiAgICAgICAgZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzOiB0cnVlLFxuICAgICAgICBvbkNsb3NlQXV0b0ZvY3VzOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkNsb3NlQXV0b0ZvY3VzLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNvbnRleHQudHJpZ2dlclJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgICAgICB9KSxcbiAgICAgICAgb25Qb2ludGVyRG93bk91dHNpZGU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uUG9pbnRlckRvd25PdXRzaWRlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBvcmlnaW5hbEV2ZW50ID0gZXZlbnQuZGV0YWlsLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgY29uc3QgY3RybExlZnRDbGljayA9IG9yaWdpbmFsRXZlbnQuYnV0dG9uID09PSAwICYmIG9yaWdpbmFsRXZlbnQuY3RybEtleSA9PT0gdHJ1ZTtcbiAgICAgICAgICBjb25zdCBpc1JpZ2h0Q2xpY2sgPSBvcmlnaW5hbEV2ZW50LmJ1dHRvbiA9PT0gMiB8fCBjdHJsTGVmdENsaWNrO1xuICAgICAgICAgIGlmIChpc1JpZ2h0Q2xpY2spIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pLFxuICAgICAgICBvbkZvY3VzT3V0c2lkZTogY29tcG9zZUV2ZW50SGFuZGxlcnMoXG4gICAgICAgICAgcHJvcHMub25Gb2N1c091dHNpZGUsXG4gICAgICAgICAgKGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xudmFyIERpYWxvZ0NvbnRlbnROb25Nb2RhbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gICAgY29uc3QgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIERpYWxvZ0NvbnRlbnRJbXBsLFxuICAgICAge1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgcmVmOiBmb3J3YXJkZWRSZWYsXG4gICAgICAgIHRyYXBGb2N1czogZmFsc2UsXG4gICAgICAgIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50czogZmFsc2UsXG4gICAgICAgIG9uQ2xvc2VBdXRvRm9jdXM6IChldmVudCkgPT4ge1xuICAgICAgICAgIHByb3BzLm9uQ2xvc2VBdXRvRm9jdXM/LihldmVudCk7XG4gICAgICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmLmN1cnJlbnQpIGNvbnRleHQudHJpZ2dlclJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaGFzSW50ZXJhY3RlZE91dHNpZGVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgIGhhc1BvaW50ZXJEb3duT3V0c2lkZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW50ZXJhY3RPdXRzaWRlOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICBwcm9wcy5vbkludGVyYWN0T3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIGhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50LnR5cGUgPT09IFwicG9pbnRlcmRvd25cIikge1xuICAgICAgICAgICAgICBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICBjb25zdCB0YXJnZXRJc1RyaWdnZXIgPSBjb250ZXh0LnRyaWdnZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgICBpZiAodGFyZ2V0SXNUcmlnZ2VyKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmIChldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudC50eXBlID09PSBcImZvY3VzaW5cIiAmJiBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xudmFyIERpYWxvZ0NvbnRlbnRJbXBsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIHRyYXBGb2N1cywgb25PcGVuQXV0b0ZvY3VzLCBvbkNsb3NlQXV0b0ZvY3VzLCAuLi5jb250ZW50UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgY29udGVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCBjb250ZW50UmVmKTtcbiAgICB1c2VGb2N1c0d1YXJkcygpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4cyhGcmFnbWVudCwgeyBjaGlsZHJlbjogW1xuICAgICAgLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgICAgRm9jdXNTY29wZSxcbiAgICAgICAge1xuICAgICAgICAgIGFzQ2hpbGQ6IHRydWUsXG4gICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICB0cmFwcGVkOiB0cmFwRm9jdXMsXG4gICAgICAgICAgb25Nb3VudEF1dG9Gb2N1czogb25PcGVuQXV0b0ZvY3VzLFxuICAgICAgICAgIG9uVW5tb3VudEF1dG9Gb2N1czogb25DbG9zZUF1dG9Gb2N1cyxcbiAgICAgICAgICBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgICAgICAgIERpc21pc3NhYmxlTGF5ZXIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJvbGU6IFwiZGlhbG9nXCIsXG4gICAgICAgICAgICAgIGlkOiBjb250ZXh0LmNvbnRlbnRJZCxcbiAgICAgICAgICAgICAgXCJhcmlhLWRlc2NyaWJlZGJ5XCI6IGNvbnRleHQuZGVzY3JpcHRpb25JZCxcbiAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsbGVkYnlcIjogY29udGV4dC50aXRsZUlkLFxuICAgICAgICAgICAgICBcImRhdGEtc3RhdGVcIjogZ2V0U3RhdGUoY29udGV4dC5vcGVuKSxcbiAgICAgICAgICAgICAgLi4uY29udGVudFByb3BzLFxuICAgICAgICAgICAgICByZWY6IGNvbXBvc2VkUmVmcyxcbiAgICAgICAgICAgICAgb25EaXNtaXNzOiAoKSA9PiBjb250ZXh0Lm9uT3BlbkNoYW5nZShmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICAvKiBAX19QVVJFX18gKi8ganN4cyhGcmFnbWVudCwgeyBjaGlsZHJlbjogW1xuICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4KFRpdGxlV2FybmluZywgeyB0aXRsZUlkOiBjb250ZXh0LnRpdGxlSWQgfSksXG4gICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goRGVzY3JpcHRpb25XYXJuaW5nLCB7IGNvbnRlbnRSZWYsIGRlc2NyaXB0aW9uSWQ6IGNvbnRleHQuZGVzY3JpcHRpb25JZCB9KVxuICAgICAgXSB9KVxuICAgIF0gfSk7XG4gIH1cbik7XG52YXIgVElUTEVfTkFNRSA9IFwiRGlhbG9nVGl0bGVcIjtcbnZhciBEaWFsb2dUaXRsZSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi50aXRsZVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChUSVRMRV9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuaDIsIHsgaWQ6IGNvbnRleHQudGl0bGVJZCwgLi4udGl0bGVQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSk7XG4gIH1cbik7XG5EaWFsb2dUaXRsZS5kaXNwbGF5TmFtZSA9IFRJVExFX05BTUU7XG52YXIgREVTQ1JJUFRJT05fTkFNRSA9IFwiRGlhbG9nRGVzY3JpcHRpb25cIjtcbnZhciBEaWFsb2dEZXNjcmlwdGlvbiA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi5kZXNjcmlwdGlvblByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChERVNDUklQVElPTl9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUucCwgeyBpZDogY29udGV4dC5kZXNjcmlwdGlvbklkLCAuLi5kZXNjcmlwdGlvblByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KTtcbiAgfVxuKTtcbkRpYWxvZ0Rlc2NyaXB0aW9uLmRpc3BsYXlOYW1lID0gREVTQ1JJUFRJT05fTkFNRTtcbnZhciBDTE9TRV9OQU1FID0gXCJEaWFsb2dDbG9zZVwiO1xudmFyIERpYWxvZ0Nsb3NlID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLmNsb3NlUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENMT1NFX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgUHJpbWl0aXZlLmJ1dHRvbixcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgLi4uY2xvc2VQcm9wcyxcbiAgICAgICAgcmVmOiBmb3J3YXJkZWRSZWYsXG4gICAgICAgIG9uQ2xpY2s6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQ2xpY2ssICgpID0+IGNvbnRleHQub25PcGVuQ2hhbmdlKGZhbHNlKSlcbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xuRGlhbG9nQ2xvc2UuZGlzcGxheU5hbWUgPSBDTE9TRV9OQU1FO1xuZnVuY3Rpb24gZ2V0U3RhdGUob3Blbikge1xuICByZXR1cm4gb3BlbiA/IFwib3BlblwiIDogXCJjbG9zZWRcIjtcbn1cbnZhciBUSVRMRV9XQVJOSU5HX05BTUUgPSBcIkRpYWxvZ1RpdGxlV2FybmluZ1wiO1xudmFyIFtXYXJuaW5nUHJvdmlkZXIsIHVzZVdhcm5pbmdDb250ZXh0XSA9IGNyZWF0ZUNvbnRleHQoVElUTEVfV0FSTklOR19OQU1FLCB7XG4gIGNvbnRlbnROYW1lOiBDT05URU5UX05BTUUsXG4gIHRpdGxlTmFtZTogVElUTEVfTkFNRSxcbiAgZG9jc1NsdWc6IFwiZGlhbG9nXCJcbn0pO1xudmFyIFRpdGxlV2FybmluZyA9ICh7IHRpdGxlSWQgfSkgPT4ge1xuICBjb25zdCB0aXRsZVdhcm5pbmdDb250ZXh0ID0gdXNlV2FybmluZ0NvbnRleHQoVElUTEVfV0FSTklOR19OQU1FKTtcbiAgY29uc3QgTUVTU0FHRSA9IGBcXGAke3RpdGxlV2FybmluZ0NvbnRleHQuY29udGVudE5hbWV9XFxgIHJlcXVpcmVzIGEgXFxgJHt0aXRsZVdhcm5pbmdDb250ZXh0LnRpdGxlTmFtZX1cXGAgZm9yIHRoZSBjb21wb25lbnQgdG8gYmUgYWNjZXNzaWJsZSBmb3Igc2NyZWVuIHJlYWRlciB1c2Vycy5cblxuSWYgeW91IHdhbnQgdG8gaGlkZSB0aGUgXFxgJHt0aXRsZVdhcm5pbmdDb250ZXh0LnRpdGxlTmFtZX1cXGAsIHlvdSBjYW4gd3JhcCBpdCB3aXRoIG91ciBWaXN1YWxseUhpZGRlbiBjb21wb25lbnQuXG5cbkZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgaHR0cHM6Ly9yYWRpeC11aS5jb20vcHJpbWl0aXZlcy9kb2NzL2NvbXBvbmVudHMvJHt0aXRsZVdhcm5pbmdDb250ZXh0LmRvY3NTbHVnfWA7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRpdGxlSWQpIHtcbiAgICAgIGNvbnN0IGhhc1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGl0bGVJZCk7XG4gICAgICBpZiAoIWhhc1RpdGxlKSBjb25zb2xlLmVycm9yKE1FU1NBR0UpO1xuICAgIH1cbiAgfSwgW01FU1NBR0UsIHRpdGxlSWRdKTtcbiAgcmV0dXJuIG51bGw7XG59O1xudmFyIERFU0NSSVBUSU9OX1dBUk5JTkdfTkFNRSA9IFwiRGlhbG9nRGVzY3JpcHRpb25XYXJuaW5nXCI7XG52YXIgRGVzY3JpcHRpb25XYXJuaW5nID0gKHsgY29udGVudFJlZiwgZGVzY3JpcHRpb25JZCB9KSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0aW9uV2FybmluZ0NvbnRleHQgPSB1c2VXYXJuaW5nQ29udGV4dChERVNDUklQVElPTl9XQVJOSU5HX05BTUUpO1xuICBjb25zdCBNRVNTQUdFID0gYFdhcm5pbmc6IE1pc3NpbmcgXFxgRGVzY3JpcHRpb25cXGAgb3IgXFxgYXJpYS1kZXNjcmliZWRieT17dW5kZWZpbmVkfVxcYCBmb3IgeyR7ZGVzY3JpcHRpb25XYXJuaW5nQ29udGV4dC5jb250ZW50TmFtZX19LmA7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZGVzY3JpYmVkQnlJZCA9IGNvbnRlbnRSZWYuY3VycmVudD8uZ2V0QXR0cmlidXRlKFwiYXJpYS1kZXNjcmliZWRieVwiKTtcbiAgICBpZiAoZGVzY3JpcHRpb25JZCAmJiBkZXNjcmliZWRCeUlkKSB7XG4gICAgICBjb25zdCBoYXNEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRlc2NyaXB0aW9uSWQpO1xuICAgICAgaWYgKCFoYXNEZXNjcmlwdGlvbikgY29uc29sZS53YXJuKE1FU1NBR0UpO1xuICAgIH1cbiAgfSwgW01FU1NBR0UsIGNvbnRlbnRSZWYsIGRlc2NyaXB0aW9uSWRdKTtcbiAgcmV0dXJuIG51bGw7XG59O1xudmFyIFJvb3QgPSBEaWFsb2c7XG52YXIgVHJpZ2dlciA9IERpYWxvZ1RyaWdnZXI7XG52YXIgUG9ydGFsID0gRGlhbG9nUG9ydGFsO1xudmFyIE92ZXJsYXkgPSBEaWFsb2dPdmVybGF5O1xudmFyIENvbnRlbnQgPSBEaWFsb2dDb250ZW50O1xudmFyIFRpdGxlID0gRGlhbG9nVGl0bGU7XG52YXIgRGVzY3JpcHRpb24gPSBEaWFsb2dEZXNjcmlwdGlvbjtcbnZhciBDbG9zZSA9IERpYWxvZ0Nsb3NlO1xuZXhwb3J0IHtcbiAgQ2xvc2UsXG4gIENvbnRlbnQsXG4gIERlc2NyaXB0aW9uLFxuICBEaWFsb2csXG4gIERpYWxvZ0Nsb3NlLFxuICBEaWFsb2dDb250ZW50LFxuICBEaWFsb2dEZXNjcmlwdGlvbixcbiAgRGlhbG9nT3ZlcmxheSxcbiAgRGlhbG9nUG9ydGFsLFxuICBEaWFsb2dUaXRsZSxcbiAgRGlhbG9nVHJpZ2dlcixcbiAgT3ZlcmxheSxcbiAgUG9ydGFsLFxuICBSb290LFxuICBUaXRsZSxcbiAgVHJpZ2dlcixcbiAgV2FybmluZ1Byb3ZpZGVyLFxuICBjcmVhdGVEaWFsb2dTY29wZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy9zbG90LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBGcmFnbWVudCBhcyBGcmFnbWVudDIsIGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3Qob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3RDbG9uZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90Q2xvbmUob3duZXJOYW1lKTtcbiAgY29uc3QgU2xvdDIgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjaGlsZHJlbkFycmF5ID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbik7XG4gICAgY29uc3Qgc2xvdHRhYmxlID0gY2hpbGRyZW5BcnJheS5maW5kKGlzU2xvdHRhYmxlKTtcbiAgICBpZiAoc2xvdHRhYmxlKSB7XG4gICAgICBjb25zdCBuZXdFbGVtZW50ID0gc2xvdHRhYmxlLnByb3BzLmNoaWxkcmVuO1xuICAgICAgY29uc3QgbmV3Q2hpbGRyZW4gPSBjaGlsZHJlbkFycmF5Lm1hcCgoY2hpbGQpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkID09PSBzbG90dGFibGUpIHtcbiAgICAgICAgICBpZiAoUmVhY3QuQ2hpbGRyZW4uY291bnQobmV3RWxlbWVudCkgPiAxKSByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKTtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBuZXdFbGVtZW50LnByb3BzLmNoaWxkcmVuIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goU2xvdENsb25lLCB7IC4uLnNsb3RQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYsIGNoaWxkcmVuOiBSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXdFbGVtZW50KSA/IFJlYWN0LmNsb25lRWxlbWVudChuZXdFbGVtZW50LCB2b2lkIDAsIG5ld0NoaWxkcmVuKSA6IG51bGwgfSk7XG4gICAgfVxuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbiB9KTtcbiAgfSk7XG4gIFNsb3QyLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90YDtcbiAgcmV0dXJuIFNsb3QyO1xufVxudmFyIFNsb3QgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdChcIlNsb3RcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgICBjb25zdCBjaGlsZHJlblJlZiA9IGdldEVsZW1lbnRSZWYoY2hpbGRyZW4pO1xuICAgICAgY29uc3QgcHJvcHMyID0gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkcmVuLnByb3BzKTtcbiAgICAgIGlmIChjaGlsZHJlbi50eXBlICE9PSBSZWFjdC5GcmFnbWVudCkge1xuICAgICAgICBwcm9wczIucmVmID0gZm9yd2FyZGVkUmVmID8gY29tcG9zZVJlZnMoZm9yd2FyZGVkUmVmLCBjaGlsZHJlblJlZikgOiBjaGlsZHJlblJlZjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGRyZW4sIHByb3BzMik7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbikgPiAxID8gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKSA6IG51bGw7XG4gIH0pO1xuICBTbG90Q2xvbmUuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3RDbG9uZWA7XG4gIHJldHVybiBTbG90Q2xvbmU7XG59XG52YXIgU0xPVFRBQkxFX0lERU5USUZJRVIgPSBTeW1ib2woXCJyYWRpeC5zbG90dGFibGVcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdHRhYmxlKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90dGFibGUyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KEZyYWdtZW50MiwgeyBjaGlsZHJlbiB9KTtcbiAgfTtcbiAgU2xvdHRhYmxlMi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdHRhYmxlYDtcbiAgU2xvdHRhYmxlMi5fX3JhZGl4SWQgPSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbiAgcmV0dXJuIFNsb3R0YWJsZTI7XG59XG52YXIgU2xvdHRhYmxlID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3R0YWJsZShcIlNsb3R0YWJsZVwiKTtcbmZ1bmN0aW9uIGlzU2xvdHRhYmxlKGNoaWxkKSB7XG4gIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkgJiYgdHlwZW9mIGNoaWxkLnR5cGUgPT09IFwiZnVuY3Rpb25cIiAmJiBcIl9fcmFkaXhJZFwiIGluIGNoaWxkLnR5cGUgJiYgY2hpbGQudHlwZS5fX3JhZGl4SWQgPT09IFNMT1RUQUJMRV9JREVOVElGSUVSO1xufVxuZnVuY3Rpb24gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkUHJvcHMpIHtcbiAgY29uc3Qgb3ZlcnJpZGVQcm9wcyA9IHsgLi4uY2hpbGRQcm9wcyB9O1xuICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIGNoaWxkUHJvcHMpIHtcbiAgICBjb25zdCBzbG90UHJvcFZhbHVlID0gc2xvdFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBjaGlsZFByb3BWYWx1ZSA9IGNoaWxkUHJvcHNbcHJvcE5hbWVdO1xuICAgIGNvbnN0IGlzSGFuZGxlciA9IC9eb25bQS1aXS8udGVzdChwcm9wTmFtZSk7XG4gICAgaWYgKGlzSGFuZGxlcikge1xuICAgICAgaWYgKHNsb3RQcm9wVmFsdWUgJiYgY2hpbGRQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNoaWxkUHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHNsb3RQcm9wVmFsdWUoLi4uYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2xvdFByb3BWYWx1ZSkge1xuICAgICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHNsb3RQcm9wVmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHsgLi4uc2xvdFByb3BWYWx1ZSwgLi4uY2hpbGRQcm9wVmFsdWUgfTtcbiAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSBcImNsYXNzTmFtZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IFtzbG90UHJvcFZhbHVlLCBjaGlsZFByb3BWYWx1ZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyAuLi5zbG90UHJvcHMsIC4uLm92ZXJyaWRlUHJvcHMgfTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRSZWYoZWxlbWVudCkge1xuICBsZXQgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LnByb3BzLCBcInJlZlwiKT8uZ2V0O1xuICBsZXQgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5yZWY7XG4gIH1cbiAgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LCBcInJlZlwiKT8uZ2V0O1xuICBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnByb3BzLnJlZjtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWYgfHwgZWxlbWVudC5yZWY7XG59XG5leHBvcnQge1xuICBTbG90IGFzIFJvb3QsXG4gIFNsb3QsXG4gIFNsb3R0YWJsZSxcbiAgY3JlYXRlU2xvdCxcbiAgY3JlYXRlU2xvdHRhYmxlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9kaXNtaXNzYWJsZS1sYXllci50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZUV2ZW50SGFuZGxlcnMgfSBmcm9tIFwiQHJhZGl4LXVpL3ByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgUHJpbWl0aXZlLCBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnQgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmXCI7XG5pbXBvcnQgeyB1c2VFc2NhcGVLZXlkb3duIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtZXNjYXBlLWtleWRvd25cIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIERJU01JU1NBQkxFX0xBWUVSX05BTUUgPSBcIkRpc21pc3NhYmxlTGF5ZXJcIjtcbnZhciBDT05URVhUX1VQREFURSA9IFwiZGlzbWlzc2FibGVMYXllci51cGRhdGVcIjtcbnZhciBQT0lOVEVSX0RPV05fT1VUU0lERSA9IFwiZGlzbWlzc2FibGVMYXllci5wb2ludGVyRG93bk91dHNpZGVcIjtcbnZhciBGT0NVU19PVVRTSURFID0gXCJkaXNtaXNzYWJsZUxheWVyLmZvY3VzT3V0c2lkZVwiO1xudmFyIG9yaWdpbmFsQm9keVBvaW50ZXJFdmVudHM7XG52YXIgRGlzbWlzc2FibGVMYXllckNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KHtcbiAgbGF5ZXJzOiAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpLFxuICBsYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZDogLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKSxcbiAgYnJhbmNoZXM6IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KClcbn0pO1xudmFyIERpc21pc3NhYmxlTGF5ZXIgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50cyA9IGZhbHNlLFxuICAgICAgb25Fc2NhcGVLZXlEb3duLFxuICAgICAgb25Qb2ludGVyRG93bk91dHNpZGUsXG4gICAgICBvbkZvY3VzT3V0c2lkZSxcbiAgICAgIG9uSW50ZXJhY3RPdXRzaWRlLFxuICAgICAgb25EaXNtaXNzLFxuICAgICAgLi4ubGF5ZXJQcm9wc1xuICAgIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChEaXNtaXNzYWJsZUxheWVyQ29udGV4dCk7XG4gICAgY29uc3QgW25vZGUsIHNldE5vZGVdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3Qgb3duZXJEb2N1bWVudCA9IG5vZGU/Lm93bmVyRG9jdW1lbnQgPz8gZ2xvYmFsVGhpcz8uZG9jdW1lbnQ7XG4gICAgY29uc3QgWywgZm9yY2VdID0gUmVhY3QudXNlU3RhdGUoe30pO1xuICAgIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIChub2RlMikgPT4gc2V0Tm9kZShub2RlMikpO1xuICAgIGNvbnN0IGxheWVycyA9IEFycmF5LmZyb20oY29udGV4dC5sYXllcnMpO1xuICAgIGNvbnN0IFtoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZF0gPSBbLi4uY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZF0uc2xpY2UoLTEpO1xuICAgIGNvbnN0IGhpZ2hlc3RMYXllcldpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkSW5kZXggPSBsYXllcnMuaW5kZXhPZihoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZCk7XG4gICAgY29uc3QgaW5kZXggPSBub2RlID8gbGF5ZXJzLmluZGV4T2Yobm9kZSkgOiAtMTtcbiAgICBjb25zdCBpc0JvZHlQb2ludGVyRXZlbnRzRGlzYWJsZWQgPSBjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLnNpemUgPiAwO1xuICAgIGNvbnN0IGlzUG9pbnRlckV2ZW50c0VuYWJsZWQgPSBpbmRleCA+PSBoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZEluZGV4O1xuICAgIGNvbnN0IHBvaW50ZXJEb3duT3V0c2lkZSA9IHVzZVBvaW50ZXJEb3duT3V0c2lkZSgoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGNvbnN0IGlzUG9pbnRlckRvd25PbkJyYW5jaCA9IFsuLi5jb250ZXh0LmJyYW5jaGVzXS5zb21lKChicmFuY2gpID0+IGJyYW5jaC5jb250YWlucyh0YXJnZXQpKTtcbiAgICAgIGlmICghaXNQb2ludGVyRXZlbnRzRW5hYmxlZCB8fCBpc1BvaW50ZXJEb3duT25CcmFuY2gpIHJldHVybjtcbiAgICAgIG9uUG9pbnRlckRvd25PdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgb25JbnRlcmFjdE91dHNpZGU/LihldmVudCk7XG4gICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIG9uRGlzbWlzcz8uKCk7XG4gICAgfSwgb3duZXJEb2N1bWVudCk7XG4gICAgY29uc3QgZm9jdXNPdXRzaWRlID0gdXNlRm9jdXNPdXRzaWRlKChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgY29uc3QgaXNGb2N1c0luQnJhbmNoID0gWy4uLmNvbnRleHQuYnJhbmNoZXNdLnNvbWUoKGJyYW5jaCkgPT4gYnJhbmNoLmNvbnRhaW5zKHRhcmdldCkpO1xuICAgICAgaWYgKGlzRm9jdXNJbkJyYW5jaCkgcmV0dXJuO1xuICAgICAgb25Gb2N1c091dHNpZGU/LihldmVudCk7XG4gICAgICBvbkludGVyYWN0T3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgb25EaXNtaXNzPy4oKTtcbiAgICB9LCBvd25lckRvY3VtZW50KTtcbiAgICB1c2VFc2NhcGVLZXlkb3duKChldmVudCkgPT4ge1xuICAgICAgY29uc3QgaXNIaWdoZXN0TGF5ZXIgPSBpbmRleCA9PT0gY29udGV4dC5sYXllcnMuc2l6ZSAtIDE7XG4gICAgICBpZiAoIWlzSGlnaGVzdExheWVyKSByZXR1cm47XG4gICAgICBvbkVzY2FwZUtleURvd24/LihldmVudCk7XG4gICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgJiYgb25EaXNtaXNzKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG9uRGlzbWlzcygpO1xuICAgICAgfVxuICAgIH0sIG93bmVyRG9jdW1lbnQpO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICAgIGlmIChkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgaWYgKGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgIG9yaWdpbmFsQm9keVBvaW50ZXJFdmVudHMgPSBvd25lckRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cztcbiAgICAgICAgICBvd25lckRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuYWRkKG5vZGUpO1xuICAgICAgfVxuICAgICAgY29udGV4dC5sYXllcnMuYWRkKG5vZGUpO1xuICAgICAgZGlzcGF0Y2hVcGRhdGUoKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMgJiYgY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5zaXplID09PSAxKSB7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sIFtub2RlLCBvd25lckRvY3VtZW50LCBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMsIGNvbnRleHRdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKCFub2RlKSByZXR1cm47XG4gICAgICAgIGNvbnRleHQubGF5ZXJzLmRlbGV0ZShub2RlKTtcbiAgICAgICAgY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5kZWxldGUobm9kZSk7XG4gICAgICAgIGRpc3BhdGNoVXBkYXRlKCk7XG4gICAgICB9O1xuICAgIH0sIFtub2RlLCBjb250ZXh0XSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGhhbmRsZVVwZGF0ZSA9ICgpID0+IGZvcmNlKHt9KTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoQ09OVEVYVF9VUERBVEUsIGhhbmRsZVVwZGF0ZSk7XG4gICAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihDT05URVhUX1VQREFURSwgaGFuZGxlVXBkYXRlKTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBQcmltaXRpdmUuZGl2LFxuICAgICAge1xuICAgICAgICAuLi5sYXllclByb3BzLFxuICAgICAgICByZWY6IGNvbXBvc2VkUmVmcyxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBwb2ludGVyRXZlbnRzOiBpc0JvZHlQb2ludGVyRXZlbnRzRGlzYWJsZWQgPyBpc1BvaW50ZXJFdmVudHNFbmFibGVkID8gXCJhdXRvXCIgOiBcIm5vbmVcIiA6IHZvaWQgMCxcbiAgICAgICAgICAuLi5wcm9wcy5zdHlsZVxuICAgICAgICB9LFxuICAgICAgICBvbkZvY3VzQ2FwdHVyZTogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25Gb2N1c0NhcHR1cmUsIGZvY3VzT3V0c2lkZS5vbkZvY3VzQ2FwdHVyZSksXG4gICAgICAgIG9uQmx1ckNhcHR1cmU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQmx1ckNhcHR1cmUsIGZvY3VzT3V0c2lkZS5vbkJsdXJDYXB0dXJlKSxcbiAgICAgICAgb25Qb2ludGVyRG93bkNhcHR1cmU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKFxuICAgICAgICAgIHByb3BzLm9uUG9pbnRlckRvd25DYXB0dXJlLFxuICAgICAgICAgIHBvaW50ZXJEb3duT3V0c2lkZS5vblBvaW50ZXJEb3duQ2FwdHVyZVxuICAgICAgICApXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbkRpc21pc3NhYmxlTGF5ZXIuZGlzcGxheU5hbWUgPSBESVNNSVNTQUJMRV9MQVlFUl9OQU1FO1xudmFyIEJSQU5DSF9OQU1FID0gXCJEaXNtaXNzYWJsZUxheWVyQnJhbmNoXCI7XG52YXIgRGlzbWlzc2FibGVMYXllckJyYW5jaCA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoRGlzbWlzc2FibGVMYXllckNvbnRleHQpO1xuICBjb25zdCByZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIHJlZik7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHJlZi5jdXJyZW50O1xuICAgIGlmIChub2RlKSB7XG4gICAgICBjb250ZXh0LmJyYW5jaGVzLmFkZChub2RlKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNvbnRleHQuYnJhbmNoZXMuZGVsZXRlKG5vZGUpO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFtjb250ZXh0LmJyYW5jaGVzXSk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5kaXYsIHsgLi4ucHJvcHMsIHJlZjogY29tcG9zZWRSZWZzIH0pO1xufSk7XG5EaXNtaXNzYWJsZUxheWVyQnJhbmNoLmRpc3BsYXlOYW1lID0gQlJBTkNIX05BTUU7XG5mdW5jdGlvbiB1c2VQb2ludGVyRG93bk91dHNpZGUob25Qb2ludGVyRG93bk91dHNpZGUsIG93bmVyRG9jdW1lbnQgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCkge1xuICBjb25zdCBoYW5kbGVQb2ludGVyRG93bk91dHNpZGUgPSB1c2VDYWxsYmFja1JlZihvblBvaW50ZXJEb3duT3V0c2lkZSk7XG4gIGNvbnN0IGlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZUNsaWNrUmVmID0gUmVhY3QudXNlUmVmKCgpID0+IHtcbiAgfSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgIWlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50KSB7XG4gICAgICAgIGxldCBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGhhbmRsZUFuZERpc3BhdGNoQ3VzdG9tRXZlbnQoXG4gICAgICAgICAgICBQT0lOVEVSX0RPV05fT1VUU0lERSxcbiAgICAgICAgICAgIGhhbmRsZVBvaW50ZXJEb3duT3V0c2lkZSxcbiAgICAgICAgICAgIGV2ZW50RGV0YWlsLFxuICAgICAgICAgICAgeyBkaXNjcmV0ZTogdHJ1ZSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQgPSBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MjtcbiAgICAgICAgY29uc3QgZXZlbnREZXRhaWwgPSB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH07XG4gICAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJ0b3VjaFwiKSB7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCk7XG4gICAgICAgICAgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCA9IGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQyO1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja1JlZi5jdXJyZW50KTtcbiAgICAgIH1cbiAgICAgIGlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgfTtcbiAgICBjb25zdCB0aW1lcklkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgIH0sIDApO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCk7XG4gICAgfTtcbiAgfSwgW293bmVyRG9jdW1lbnQsIGhhbmRsZVBvaW50ZXJEb3duT3V0c2lkZV0pO1xuICByZXR1cm4ge1xuICAgIC8vIGVuc3VyZXMgd2UgY2hlY2sgUmVhY3QgY29tcG9uZW50IHRyZWUgKG5vdCBqdXN0IERPTSB0cmVlKVxuICAgIG9uUG9pbnRlckRvd25DYXB0dXJlOiAoKSA9PiBpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IHRydWVcbiAgfTtcbn1cbmZ1bmN0aW9uIHVzZUZvY3VzT3V0c2lkZShvbkZvY3VzT3V0c2lkZSwgb3duZXJEb2N1bWVudCA9IGdsb2JhbFRoaXM/LmRvY3VtZW50KSB7XG4gIGNvbnN0IGhhbmRsZUZvY3VzT3V0c2lkZSA9IHVzZUNhbGxiYWNrUmVmKG9uRm9jdXNPdXRzaWRlKTtcbiAgY29uc3QgaXNGb2N1c0luc2lkZVJlYWN0VHJlZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlRm9jdXMgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgJiYgIWlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCkge1xuICAgICAgICBjb25zdCBldmVudERldGFpbCA9IHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfTtcbiAgICAgICAgaGFuZGxlQW5kRGlzcGF0Y2hDdXN0b21FdmVudChGT0NVU19PVVRTSURFLCBoYW5kbGVGb2N1c091dHNpZGUsIGV2ZW50RGV0YWlsLCB7XG4gICAgICAgICAgZGlzY3JldGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBoYW5kbGVGb2N1cyk7XG4gICAgcmV0dXJuICgpID0+IG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXMpO1xuICB9LCBbb3duZXJEb2N1bWVudCwgaGFuZGxlRm9jdXNPdXRzaWRlXSk7XG4gIHJldHVybiB7XG4gICAgb25Gb2N1c0NhcHR1cmU6ICgpID0+IGlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IHRydWUsXG4gICAgb25CbHVyQ2FwdHVyZTogKCkgPT4gaXNGb2N1c0luc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50ID0gZmFsc2VcbiAgfTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoVXBkYXRlKCkge1xuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChDT05URVhUX1VQREFURSk7XG4gIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuZnVuY3Rpb24gaGFuZGxlQW5kRGlzcGF0Y2hDdXN0b21FdmVudChuYW1lLCBoYW5kbGVyLCBkZXRhaWwsIHsgZGlzY3JldGUgfSkge1xuICBjb25zdCB0YXJnZXQgPSBkZXRhaWwub3JpZ2luYWxFdmVudC50YXJnZXQ7XG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IHRydWUsIGRldGFpbCB9KTtcbiAgaWYgKGhhbmRsZXIpIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgaWYgKGRpc2NyZXRlKSB7XG4gICAgZGlzcGF0Y2hEaXNjcmV0ZUN1c3RvbUV2ZW50KHRhcmdldCwgZXZlbnQpO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxufVxudmFyIFJvb3QgPSBEaXNtaXNzYWJsZUxheWVyO1xudmFyIEJyYW5jaCA9IERpc21pc3NhYmxlTGF5ZXJCcmFuY2g7XG5leHBvcnQge1xuICBCcmFuY2gsXG4gIERpc21pc3NhYmxlTGF5ZXIsXG4gIERpc21pc3NhYmxlTGF5ZXJCcmFuY2gsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL2ZvY3VzLWd1YXJkcy50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIGNvdW50ID0gMDtcbmZ1bmN0aW9uIEZvY3VzR3VhcmRzKHByb3BzKSB7XG4gIHVzZUZvY3VzR3VhcmRzKCk7XG4gIHJldHVybiBwcm9wcy5jaGlsZHJlbjtcbn1cbmZ1bmN0aW9uIHVzZUZvY3VzR3VhcmRzKCkge1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGVkZ2VHdWFyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtcmFkaXgtZm9jdXMtZ3VhcmRdXCIpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBlZGdlR3VhcmRzWzBdID8/IGNyZWF0ZUZvY3VzR3VhcmQoKSk7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZWRnZUd1YXJkc1sxXSA/PyBjcmVhdGVGb2N1c0d1YXJkKCkpO1xuICAgIGNvdW50Kys7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtcmFkaXgtZm9jdXMtZ3VhcmRdXCIpLmZvckVhY2goKG5vZGUpID0+IG5vZGUucmVtb3ZlKCkpO1xuICAgICAgfVxuICAgICAgY291bnQtLTtcbiAgICB9O1xuICB9LCBbXSk7XG59XG5mdW5jdGlvbiBjcmVhdGVGb2N1c0d1YXJkKCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1yYWRpeC1mb2N1cy1ndWFyZFwiLCBcIlwiKTtcbiAgZWxlbWVudC50YWJJbmRleCA9IDA7XG4gIGVsZW1lbnQuc3R5bGUub3V0bGluZSA9IFwibm9uZVwiO1xuICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0IHtcbiAgRm9jdXNHdWFyZHMsXG4gIEZvY3VzR3VhcmRzIGFzIFJvb3QsXG4gIHVzZUZvY3VzR3VhcmRzXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9mb2N1cy1zY29wZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWNhbGxiYWNrLXJlZlwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgQVVUT0ZPQ1VTX09OX01PVU5UID0gXCJmb2N1c1Njb3BlLmF1dG9Gb2N1c09uTW91bnRcIjtcbnZhciBBVVRPRk9DVVNfT05fVU5NT1VOVCA9IFwiZm9jdXNTY29wZS5hdXRvRm9jdXNPblVubW91bnRcIjtcbnZhciBFVkVOVF9PUFRJT05TID0geyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogdHJ1ZSB9O1xudmFyIEZPQ1VTX1NDT1BFX05BTUUgPSBcIkZvY3VzU2NvcGVcIjtcbnZhciBGb2N1c1Njb3BlID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICBjb25zdCB7XG4gICAgbG9vcCA9IGZhbHNlLFxuICAgIHRyYXBwZWQgPSBmYWxzZSxcbiAgICBvbk1vdW50QXV0b0ZvY3VzOiBvbk1vdW50QXV0b0ZvY3VzUHJvcCxcbiAgICBvblVubW91bnRBdXRvRm9jdXM6IG9uVW5tb3VudEF1dG9Gb2N1c1Byb3AsXG4gICAgLi4uc2NvcGVQcm9wc1xuICB9ID0gcHJvcHM7XG4gIGNvbnN0IFtjb250YWluZXIsIHNldENvbnRhaW5lcl0gPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgY29uc3Qgb25Nb3VudEF1dG9Gb2N1cyA9IHVzZUNhbGxiYWNrUmVmKG9uTW91bnRBdXRvRm9jdXNQcm9wKTtcbiAgY29uc3Qgb25Vbm1vdW50QXV0b0ZvY3VzID0gdXNlQ2FsbGJhY2tSZWYob25Vbm1vdW50QXV0b0ZvY3VzUHJvcCk7XG4gIGNvbnN0IGxhc3RGb2N1c2VkRWxlbWVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgKG5vZGUpID0+IHNldENvbnRhaW5lcihub2RlKSk7XG4gIGNvbnN0IGZvY3VzU2NvcGUgPSBSZWFjdC51c2VSZWYoe1xuICAgIHBhdXNlZDogZmFsc2UsXG4gICAgcGF1c2UoKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgfSxcbiAgICByZXN1bWUoKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgfSkuY3VycmVudDtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHJhcHBlZCkge1xuICAgICAgbGV0IGhhbmRsZUZvY3VzSW4yID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGZvY3VzU2NvcGUucGF1c2VkIHx8ICFjb250YWluZXIpIHJldHVybjtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoY29udGFpbmVyLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICBsYXN0Rm9jdXNlZEVsZW1lbnRSZWYuY3VycmVudCA9IHRhcmdldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb2N1cyhsYXN0Rm9jdXNlZEVsZW1lbnRSZWYuY3VycmVudCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGhhbmRsZUZvY3VzT3V0MiA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChmb2N1c1Njb3BlLnBhdXNlZCB8fCAhY29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSBldmVudC5yZWxhdGVkVGFyZ2V0O1xuICAgICAgICBpZiAocmVsYXRlZFRhcmdldCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICBpZiAoIWNvbnRhaW5lci5jb250YWlucyhyZWxhdGVkVGFyZ2V0KSkge1xuICAgICAgICAgIGZvY3VzKGxhc3RGb2N1c2VkRWxlbWVudFJlZi5jdXJyZW50LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSwgaGFuZGxlTXV0YXRpb25zMiA9IGZ1bmN0aW9uKG11dGF0aW9ucykge1xuICAgICAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCAhPT0gZG9jdW1lbnQuYm9keSkgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9ucykge1xuICAgICAgICAgIGlmIChtdXRhdGlvbi5yZW1vdmVkTm9kZXMubGVuZ3RoID4gMCkgZm9jdXMoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHZhciBoYW5kbGVGb2N1c0luID0gaGFuZGxlRm9jdXNJbjIsIGhhbmRsZUZvY3VzT3V0ID0gaGFuZGxlRm9jdXNPdXQyLCBoYW5kbGVNdXRhdGlvbnMgPSBoYW5kbGVNdXRhdGlvbnMyO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXNJbjIpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIGhhbmRsZUZvY3VzT3V0Mik7XG4gICAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoaGFuZGxlTXV0YXRpb25zMik7XG4gICAgICBpZiAoY29udGFpbmVyKSBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoY29udGFpbmVyLCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzSW4yKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIGhhbmRsZUZvY3VzT3V0Mik7XG4gICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFt0cmFwcGVkLCBjb250YWluZXIsIGZvY3VzU2NvcGUucGF1c2VkXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgZm9jdXNTY29wZXNTdGFjay5hZGQoZm9jdXNTY29wZSk7XG4gICAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgY29uc3QgaGFzRm9jdXNlZENhbmRpZGF0ZSA9IGNvbnRhaW5lci5jb250YWlucyhwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpO1xuICAgICAgaWYgKCFoYXNGb2N1c2VkQ2FuZGlkYXRlKSB7XG4gICAgICAgIGNvbnN0IG1vdW50RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoQVVUT0ZPQ1VTX09OX01PVU5ULCBFVkVOVF9PUFRJT05TKTtcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX01PVU5ULCBvbk1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQobW91bnRFdmVudCk7XG4gICAgICAgIGlmICghbW91bnRFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgZm9jdXNGaXJzdChyZW1vdmVMaW5rcyhnZXRUYWJiYWJsZUNhbmRpZGF0ZXMoY29udGFpbmVyKSksIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGZvY3VzKGNvbnRhaW5lcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fTU9VTlQsIG9uTW91bnRBdXRvRm9jdXMpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zdCB1bm1vdW50RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoQVVUT0ZPQ1VTX09OX1VOTU9VTlQsIEVWRU5UX09QVElPTlMpO1xuICAgICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKEFVVE9GT0NVU19PTl9VTk1PVU5ULCBvblVubW91bnRBdXRvRm9jdXMpO1xuICAgICAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KHVubW91bnRFdmVudCk7XG4gICAgICAgICAgaWYgKCF1bm1vdW50RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgZm9jdXMocHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID8/IGRvY3VtZW50LmJvZHksIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fVU5NT1VOVCwgb25Vbm1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgICBmb2N1c1Njb3Blc1N0YWNrLnJlbW92ZShmb2N1c1Njb3BlKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW2NvbnRhaW5lciwgb25Nb3VudEF1dG9Gb2N1cywgb25Vbm1vdW50QXV0b0ZvY3VzLCBmb2N1c1Njb3BlXSk7XG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghbG9vcCAmJiAhdHJhcHBlZCkgcmV0dXJuO1xuICAgICAgaWYgKGZvY3VzU2NvcGUucGF1c2VkKSByZXR1cm47XG4gICAgICBjb25zdCBpc1RhYktleSA9IGV2ZW50LmtleSA9PT0gXCJUYWJcIiAmJiAhZXZlbnQuYWx0S2V5ICYmICFldmVudC5jdHJsS2V5ICYmICFldmVudC5tZXRhS2V5O1xuICAgICAgY29uc3QgZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgaWYgKGlzVGFiS2V5ICYmIGZvY3VzZWRFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcjIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBjb25zdCBbZmlyc3QsIGxhc3RdID0gZ2V0VGFiYmFibGVFZGdlcyhjb250YWluZXIyKTtcbiAgICAgICAgY29uc3QgaGFzVGFiYmFibGVFbGVtZW50c0luc2lkZSA9IGZpcnN0ICYmIGxhc3Q7XG4gICAgICAgIGlmICghaGFzVGFiYmFibGVFbGVtZW50c0luc2lkZSkge1xuICAgICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCA9PT0gY29udGFpbmVyMikgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWV2ZW50LnNoaWZ0S2V5ICYmIGZvY3VzZWRFbGVtZW50ID09PSBsYXN0KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGxvb3ApIGZvY3VzKGZpcnN0LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGZvY3VzZWRFbGVtZW50ID09PSBmaXJzdCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChsb29wKSBmb2N1cyhsYXN0LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtsb29wLCB0cmFwcGVkLCBmb2N1c1Njb3BlLnBhdXNlZF1cbiAgKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmRpdiwgeyB0YWJJbmRleDogLTEsIC4uLnNjb3BlUHJvcHMsIHJlZjogY29tcG9zZWRSZWZzLCBvbktleURvd246IGhhbmRsZUtleURvd24gfSk7XG59KTtcbkZvY3VzU2NvcGUuZGlzcGxheU5hbWUgPSBGT0NVU19TQ09QRV9OQU1FO1xuZnVuY3Rpb24gZm9jdXNGaXJzdChjYW5kaWRhdGVzLCB7IHNlbGVjdCA9IGZhbHNlIH0gPSB7fSkge1xuICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiBjYW5kaWRhdGVzKSB7XG4gICAgZm9jdXMoY2FuZGlkYXRlLCB7IHNlbGVjdCB9KTtcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gcHJldmlvdXNseUZvY3VzZWRFbGVtZW50KSByZXR1cm47XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFRhYmJhYmxlRWRnZXMoY29udGFpbmVyKSB7XG4gIGNvbnN0IGNhbmRpZGF0ZXMgPSBnZXRUYWJiYWJsZUNhbmRpZGF0ZXMoY29udGFpbmVyKTtcbiAgY29uc3QgZmlyc3QgPSBmaW5kVmlzaWJsZShjYW5kaWRhdGVzLCBjb250YWluZXIpO1xuICBjb25zdCBsYXN0ID0gZmluZFZpc2libGUoY2FuZGlkYXRlcy5yZXZlcnNlKCksIGNvbnRhaW5lcik7XG4gIHJldHVybiBbZmlyc3QsIGxhc3RdO1xufVxuZnVuY3Rpb24gZ2V0VGFiYmFibGVDYW5kaWRhdGVzKGNvbnRhaW5lcikge1xuICBjb25zdCBub2RlcyA9IFtdO1xuICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGNvbnRhaW5lciwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIHtcbiAgICBhY2NlcHROb2RlOiAobm9kZSkgPT4ge1xuICAgICAgY29uc3QgaXNIaWRkZW5JbnB1dCA9IG5vZGUudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmIG5vZGUudHlwZSA9PT0gXCJoaWRkZW5cIjtcbiAgICAgIGlmIChub2RlLmRpc2FibGVkIHx8IG5vZGUuaGlkZGVuIHx8IGlzSGlkZGVuSW5wdXQpIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9TS0lQO1xuICAgICAgcmV0dXJuIG5vZGUudGFiSW5kZXggPj0gMCA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX1NLSVA7XG4gICAgfVxuICB9KTtcbiAgd2hpbGUgKHdhbGtlci5uZXh0Tm9kZSgpKSBub2Rlcy5wdXNoKHdhbGtlci5jdXJyZW50Tm9kZSk7XG4gIHJldHVybiBub2Rlcztcbn1cbmZ1bmN0aW9uIGZpbmRWaXNpYmxlKGVsZW1lbnRzLCBjb250YWluZXIpIHtcbiAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgaWYgKCFpc0hpZGRlbihlbGVtZW50LCB7IHVwVG86IGNvbnRhaW5lciB9KSkgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzSGlkZGVuKG5vZGUsIHsgdXBUbyB9KSB7XG4gIGlmIChnZXRDb21wdXRlZFN0eWxlKG5vZGUpLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCIpIHJldHVybiB0cnVlO1xuICB3aGlsZSAobm9kZSkge1xuICAgIGlmICh1cFRvICE9PSB2b2lkIDAgJiYgbm9kZSA9PT0gdXBUbykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKG5vZGUpLmRpc3BsYXkgPT09IFwibm9uZVwiKSByZXR1cm4gdHJ1ZTtcbiAgICBub2RlID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzU2VsZWN0YWJsZUlucHV0KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIFwic2VsZWN0XCIgaW4gZWxlbWVudDtcbn1cbmZ1bmN0aW9uIGZvY3VzKGVsZW1lbnQsIHsgc2VsZWN0ID0gZmFsc2UgfSA9IHt9KSB7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuZm9jdXMpIHtcbiAgICBjb25zdCBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIGVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAgIGlmIChlbGVtZW50ICE9PSBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgJiYgaXNTZWxlY3RhYmxlSW5wdXQoZWxlbWVudCkgJiYgc2VsZWN0KVxuICAgICAgZWxlbWVudC5zZWxlY3QoKTtcbiAgfVxufVxudmFyIGZvY3VzU2NvcGVzU3RhY2sgPSBjcmVhdGVGb2N1c1Njb3Blc1N0YWNrKCk7XG5mdW5jdGlvbiBjcmVhdGVGb2N1c1Njb3Blc1N0YWNrKCkge1xuICBsZXQgc3RhY2sgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBhZGQoZm9jdXNTY29wZSkge1xuICAgICAgY29uc3QgYWN0aXZlRm9jdXNTY29wZSA9IHN0YWNrWzBdO1xuICAgICAgaWYgKGZvY3VzU2NvcGUgIT09IGFjdGl2ZUZvY3VzU2NvcGUpIHtcbiAgICAgICAgYWN0aXZlRm9jdXNTY29wZT8ucGF1c2UoKTtcbiAgICAgIH1cbiAgICAgIHN0YWNrID0gYXJyYXlSZW1vdmUoc3RhY2ssIGZvY3VzU2NvcGUpO1xuICAgICAgc3RhY2sudW5zaGlmdChmb2N1c1Njb3BlKTtcbiAgICB9LFxuICAgIHJlbW92ZShmb2N1c1Njb3BlKSB7XG4gICAgICBzdGFjayA9IGFycmF5UmVtb3ZlKHN0YWNrLCBmb2N1c1Njb3BlKTtcbiAgICAgIHN0YWNrWzBdPy5yZXN1bWUoKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBhcnJheVJlbW92ZShhcnJheSwgaXRlbSkge1xuICBjb25zdCB1cGRhdGVkQXJyYXkgPSBbLi4uYXJyYXldO1xuICBjb25zdCBpbmRleCA9IHVwZGF0ZWRBcnJheS5pbmRleE9mKGl0ZW0pO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgdXBkYXRlZEFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHVwZGF0ZWRBcnJheTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUxpbmtzKGl0ZW1zKSB7XG4gIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udGFnTmFtZSAhPT0gXCJBXCIpO1xufVxudmFyIFJvb3QgPSBGb2N1c1Njb3BlO1xuZXhwb3J0IHtcbiAgRm9jdXNTY29wZSxcbiAgUm9vdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L2lkL3NyYy9pZC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xudmFyIHVzZVJlYWN0SWQgPSBSZWFjdFtcIiB1c2VJZCBcIi50cmltKCkudG9TdHJpbmcoKV0gfHwgKCgpID0+IHZvaWQgMCk7XG52YXIgY291bnQgPSAwO1xuZnVuY3Rpb24gdXNlSWQoZGV0ZXJtaW5pc3RpY0lkKSB7XG4gIGNvbnN0IFtpZCwgc2V0SWRdID0gUmVhY3QudXNlU3RhdGUodXNlUmVhY3RJZCgpKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWRldGVybWluaXN0aWNJZCkgc2V0SWQoKHJlYWN0SWQpID0+IHJlYWN0SWQgPz8gU3RyaW5nKGNvdW50KyspKTtcbiAgfSwgW2RldGVybWluaXN0aWNJZF0pO1xuICByZXR1cm4gZGV0ZXJtaW5pc3RpY0lkIHx8IChpZCA/IGByYWRpeC0ke2lkfWAgOiBcIlwiKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUlkXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9wb3J0YWwudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgUE9SVEFMX05BTUUgPSBcIlBvcnRhbFwiO1xudmFyIFBvcnRhbCA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgY29uc3QgeyBjb250YWluZXI6IGNvbnRhaW5lclByb3AsIC4uLnBvcnRhbFByb3BzIH0gPSBwcm9wcztcbiAgY29uc3QgW21vdW50ZWQsIHNldE1vdW50ZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4gc2V0TW91bnRlZCh0cnVlKSwgW10pO1xuICBjb25zdCBjb250YWluZXIgPSBjb250YWluZXJQcm9wIHx8IG1vdW50ZWQgJiYgZ2xvYmFsVGhpcz8uZG9jdW1lbnQ/LmJvZHk7XG4gIHJldHVybiBjb250YWluZXIgPyBSZWFjdERPTS5jcmVhdGVQb3J0YWwoLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuZGl2LCB7IC4uLnBvcnRhbFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSwgY29udGFpbmVyKSA6IG51bGw7XG59KTtcblBvcnRhbC5kaXNwbGF5TmFtZSA9IFBPUlRBTF9OQU1FO1xudmFyIFJvb3QgPSBQb3J0YWw7XG5leHBvcnQge1xuICBQb3J0YWwsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL3ByZXNlbmNlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QyIGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcblxuLy8gc3JjL3VzZS1zdGF0ZS1tYWNoaW5lLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiB1c2VTdGF0ZU1hY2hpbmUoaW5pdGlhbFN0YXRlLCBtYWNoaW5lKSB7XG4gIHJldHVybiBSZWFjdC51c2VSZWR1Y2VyKChzdGF0ZSwgZXZlbnQpID0+IHtcbiAgICBjb25zdCBuZXh0U3RhdGUgPSBtYWNoaW5lW3N0YXRlXVtldmVudF07XG4gICAgcmV0dXJuIG5leHRTdGF0ZSA/PyBzdGF0ZTtcbiAgfSwgaW5pdGlhbFN0YXRlKTtcbn1cblxuLy8gc3JjL3ByZXNlbmNlLnRzeFxudmFyIFByZXNlbmNlID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcHJlc2VudCwgY2hpbGRyZW4gfSA9IHByb3BzO1xuICBjb25zdCBwcmVzZW5jZSA9IHVzZVByZXNlbmNlKHByZXNlbnQpO1xuICBjb25zdCBjaGlsZCA9IHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiID8gY2hpbGRyZW4oeyBwcmVzZW50OiBwcmVzZW5jZS5pc1ByZXNlbnQgfSkgOiBSZWFjdDIuQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG4gIGNvbnN0IHJlZiA9IHVzZUNvbXBvc2VkUmVmcyhwcmVzZW5jZS5yZWYsIGdldEVsZW1lbnRSZWYoY2hpbGQpKTtcbiAgY29uc3QgZm9yY2VNb3VudCA9IHR5cGVvZiBjaGlsZHJlbiA9PT0gXCJmdW5jdGlvblwiO1xuICByZXR1cm4gZm9yY2VNb3VudCB8fCBwcmVzZW5jZS5pc1ByZXNlbnQgPyBSZWFjdDIuY2xvbmVFbGVtZW50KGNoaWxkLCB7IHJlZiB9KSA6IG51bGw7XG59O1xuUHJlc2VuY2UuZGlzcGxheU5hbWUgPSBcIlByZXNlbmNlXCI7XG5mdW5jdGlvbiB1c2VQcmVzZW5jZShwcmVzZW50KSB7XG4gIGNvbnN0IFtub2RlLCBzZXROb2RlXSA9IFJlYWN0Mi51c2VTdGF0ZSgpO1xuICBjb25zdCBzdHlsZXNSZWYgPSBSZWFjdDIudXNlUmVmKG51bGwpO1xuICBjb25zdCBwcmV2UHJlc2VudFJlZiA9IFJlYWN0Mi51c2VSZWYocHJlc2VudCk7XG4gIGNvbnN0IHByZXZBbmltYXRpb25OYW1lUmVmID0gUmVhY3QyLnVzZVJlZihcIm5vbmVcIik7XG4gIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHByZXNlbnQgPyBcIm1vdW50ZWRcIiA6IFwidW5tb3VudGVkXCI7XG4gIGNvbnN0IFtzdGF0ZSwgc2VuZF0gPSB1c2VTdGF0ZU1hY2hpbmUoaW5pdGlhbFN0YXRlLCB7XG4gICAgbW91bnRlZDoge1xuICAgICAgVU5NT1VOVDogXCJ1bm1vdW50ZWRcIixcbiAgICAgIEFOSU1BVElPTl9PVVQ6IFwidW5tb3VudFN1c3BlbmRlZFwiXG4gICAgfSxcbiAgICB1bm1vdW50U3VzcGVuZGVkOiB7XG4gICAgICBNT1VOVDogXCJtb3VudGVkXCIsXG4gICAgICBBTklNQVRJT05fRU5EOiBcInVubW91bnRlZFwiXG4gICAgfSxcbiAgICB1bm1vdW50ZWQ6IHtcbiAgICAgIE1PVU5UOiBcIm1vdW50ZWRcIlxuICAgIH1cbiAgfSk7XG4gIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRBbmltYXRpb25OYW1lID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXNSZWYuY3VycmVudCk7XG4gICAgcHJldkFuaW1hdGlvbk5hbWVSZWYuY3VycmVudCA9IHN0YXRlID09PSBcIm1vdW50ZWRcIiA/IGN1cnJlbnRBbmltYXRpb25OYW1lIDogXCJub25lXCI7XG4gIH0sIFtzdGF0ZV0pO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHN0eWxlcyA9IHN0eWxlc1JlZi5jdXJyZW50O1xuICAgIGNvbnN0IHdhc1ByZXNlbnQgPSBwcmV2UHJlc2VudFJlZi5jdXJyZW50O1xuICAgIGNvbnN0IGhhc1ByZXNlbnRDaGFuZ2VkID0gd2FzUHJlc2VudCAhPT0gcHJlc2VudDtcbiAgICBpZiAoaGFzUHJlc2VudENoYW5nZWQpIHtcbiAgICAgIGNvbnN0IHByZXZBbmltYXRpb25OYW1lID0gcHJldkFuaW1hdGlvbk5hbWVSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IGN1cnJlbnRBbmltYXRpb25OYW1lID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXMpO1xuICAgICAgaWYgKHByZXNlbnQpIHtcbiAgICAgICAgc2VuZChcIk1PVU5UXCIpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50QW5pbWF0aW9uTmFtZSA9PT0gXCJub25lXCIgfHwgc3R5bGVzPy5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgICBzZW5kKFwiVU5NT1VOVFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGlzQW5pbWF0aW5nID0gcHJldkFuaW1hdGlvbk5hbWUgIT09IGN1cnJlbnRBbmltYXRpb25OYW1lO1xuICAgICAgICBpZiAod2FzUHJlc2VudCAmJiBpc0FuaW1hdGluZykge1xuICAgICAgICAgIHNlbmQoXCJBTklNQVRJT05fT1VUXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbmQoXCJVTk1PVU5UXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwcmV2UHJlc2VudFJlZi5jdXJyZW50ID0gcHJlc2VudDtcbiAgICB9XG4gIH0sIFtwcmVzZW50LCBzZW5kXSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIGxldCB0aW1lb3V0SWQ7XG4gICAgICBjb25zdCBvd25lcldpbmRvdyA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyA/PyB3aW5kb3c7XG4gICAgICBjb25zdCBoYW5kbGVBbmltYXRpb25FbmQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEFuaW1hdGlvbk5hbWUgPSBnZXRBbmltYXRpb25OYW1lKHN0eWxlc1JlZi5jdXJyZW50KTtcbiAgICAgICAgY29uc3QgaXNDdXJyZW50QW5pbWF0aW9uID0gY3VycmVudEFuaW1hdGlvbk5hbWUuaW5jbHVkZXMoQ1NTLmVzY2FwZShldmVudC5hbmltYXRpb25OYW1lKSk7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IG5vZGUgJiYgaXNDdXJyZW50QW5pbWF0aW9uKSB7XG4gICAgICAgICAgc2VuZChcIkFOSU1BVElPTl9FTkRcIik7XG4gICAgICAgICAgaWYgKCFwcmV2UHJlc2VudFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RmlsbE1vZGUgPSBub2RlLnN0eWxlLmFuaW1hdGlvbkZpbGxNb2RlO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZSA9IFwiZm9yd2FyZHNcIjtcbiAgICAgICAgICAgIHRpbWVvdXRJZCA9IG93bmVyV2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAobm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZSA9PT0gXCJmb3J3YXJkc1wiKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZSA9IGN1cnJlbnRGaWxsTW9kZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgaGFuZGxlQW5pbWF0aW9uU3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbm9kZSkge1xuICAgICAgICAgIHByZXZBbmltYXRpb25OYW1lUmVmLmN1cnJlbnQgPSBnZXRBbmltYXRpb25OYW1lKHN0eWxlc1JlZi5jdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbnN0YXJ0XCIsIGhhbmRsZUFuaW1hdGlvblN0YXJ0KTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmNhbmNlbFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBvd25lcldpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uc3RhcnRcIiwgaGFuZGxlQW5pbWF0aW9uU3RhcnQpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25jYW5jZWxcIiwgaGFuZGxlQW5pbWF0aW9uRW5kKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzZW5kKFwiQU5JTUFUSU9OX0VORFwiKTtcbiAgICB9XG4gIH0sIFtub2RlLCBzZW5kXSk7XG4gIHJldHVybiB7XG4gICAgaXNQcmVzZW50OiBbXCJtb3VudGVkXCIsIFwidW5tb3VudFN1c3BlbmRlZFwiXS5pbmNsdWRlcyhzdGF0ZSksXG4gICAgcmVmOiBSZWFjdDIudXNlQ2FsbGJhY2soKG5vZGUyKSA9PiB7XG4gICAgICBzdHlsZXNSZWYuY3VycmVudCA9IG5vZGUyID8gZ2V0Q29tcHV0ZWRTdHlsZShub2RlMikgOiBudWxsO1xuICAgICAgc2V0Tm9kZShub2RlMik7XG4gICAgfSwgW10pXG4gIH07XG59XG5mdW5jdGlvbiBnZXRBbmltYXRpb25OYW1lKHN0eWxlcykge1xuICByZXR1cm4gc3R5bGVzPy5hbmltYXRpb25OYW1lIHx8IFwibm9uZVwiO1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudFJlZihlbGVtZW50KSB7XG4gIGxldCBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQucHJvcHMsIFwicmVmXCIpPy5nZXQ7XG4gIGxldCBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnJlZjtcbiAgfVxuICBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQsIFwicmVmXCIpPy5nZXQ7XG4gIG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmO1xuICB9XG4gIHJldHVybiBlbGVtZW50LnByb3BzLnJlZiB8fCBlbGVtZW50LnJlZjtcbn1cbnZhciBSb290ID0gUHJlc2VuY2U7XG5leHBvcnQge1xuICBQcmVzZW5jZSxcbiAgUm9vdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy9wcmltaXRpdmUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IGNyZWF0ZVNsb3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXNsb3RcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIE5PREVTID0gW1xuICBcImFcIixcbiAgXCJidXR0b25cIixcbiAgXCJkaXZcIixcbiAgXCJmb3JtXCIsXG4gIFwiaDJcIixcbiAgXCJoM1wiLFxuICBcImltZ1wiLFxuICBcImlucHV0XCIsXG4gIFwibGFiZWxcIixcbiAgXCJsaVwiLFxuICBcIm5hdlwiLFxuICBcIm9sXCIsXG4gIFwicFwiLFxuICBcInNlbGVjdFwiLFxuICBcInNwYW5cIixcbiAgXCJzdmdcIixcbiAgXCJ1bFwiXG5dO1xudmFyIFByaW1pdGl2ZSA9IE5PREVTLnJlZHVjZSgocHJpbWl0aXZlLCBub2RlKSA9PiB7XG4gIGNvbnN0IFNsb3QgPSBjcmVhdGVTbG90KGBQcmltaXRpdmUuJHtub2RlfWApO1xuICBjb25zdCBOb2RlID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgYXNDaGlsZCwgLi4ucHJpbWl0aXZlUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IENvbXAgPSBhc0NoaWxkID8gU2xvdCA6IG5vZGU7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvd1tTeW1ib2wuZm9yKFwicmFkaXgtdWlcIildID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goQ29tcCwgeyAuLi5wcmltaXRpdmVQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSk7XG4gIH0pO1xuICBOb2RlLmRpc3BsYXlOYW1lID0gYFByaW1pdGl2ZS4ke25vZGV9YDtcbiAgcmV0dXJuIHsgLi4ucHJpbWl0aXZlLCBbbm9kZV06IE5vZGUgfTtcbn0sIHt9KTtcbmZ1bmN0aW9uIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudCh0YXJnZXQsIGV2ZW50KSB7XG4gIGlmICh0YXJnZXQpIFJlYWN0RE9NLmZsdXNoU3luYygoKSA9PiB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCkpO1xufVxudmFyIFJvb3QgPSBQcmltaXRpdmU7XG5leHBvcnQge1xuICBQcmltaXRpdmUsXG4gIFJvb3QsXG4gIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy9zbG90LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBGcmFnbWVudCBhcyBGcmFnbWVudDIsIGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3Qob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3RDbG9uZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90Q2xvbmUob3duZXJOYW1lKTtcbiAgY29uc3QgU2xvdDIgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjaGlsZHJlbkFycmF5ID0gUmVhY3QuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbik7XG4gICAgY29uc3Qgc2xvdHRhYmxlID0gY2hpbGRyZW5BcnJheS5maW5kKGlzU2xvdHRhYmxlKTtcbiAgICBpZiAoc2xvdHRhYmxlKSB7XG4gICAgICBjb25zdCBuZXdFbGVtZW50ID0gc2xvdHRhYmxlLnByb3BzLmNoaWxkcmVuO1xuICAgICAgY29uc3QgbmV3Q2hpbGRyZW4gPSBjaGlsZHJlbkFycmF5Lm1hcCgoY2hpbGQpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkID09PSBzbG90dGFibGUpIHtcbiAgICAgICAgICBpZiAoUmVhY3QuQ2hpbGRyZW4uY291bnQobmV3RWxlbWVudCkgPiAxKSByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKTtcbiAgICAgICAgICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBuZXdFbGVtZW50LnByb3BzLmNoaWxkcmVuIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goU2xvdENsb25lLCB7IC4uLnNsb3RQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYsIGNoaWxkcmVuOiBSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXdFbGVtZW50KSA/IFJlYWN0LmNsb25lRWxlbWVudChuZXdFbGVtZW50LCB2b2lkIDAsIG5ld0NoaWxkcmVuKSA6IG51bGwgfSk7XG4gICAgfVxuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbiB9KTtcbiAgfSk7XG4gIFNsb3QyLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90YDtcbiAgcmV0dXJuIFNsb3QyO1xufVxudmFyIFNsb3QgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdChcIlNsb3RcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uc2xvdFByb3BzIH0gPSBwcm9wcztcbiAgICBpZiAoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgICBjb25zdCBjaGlsZHJlblJlZiA9IGdldEVsZW1lbnRSZWYoY2hpbGRyZW4pO1xuICAgICAgY29uc3QgcHJvcHMyID0gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkcmVuLnByb3BzKTtcbiAgICAgIGlmIChjaGlsZHJlbi50eXBlICE9PSBSZWFjdC5GcmFnbWVudCkge1xuICAgICAgICBwcm9wczIucmVmID0gZm9yd2FyZGVkUmVmID8gY29tcG9zZVJlZnMoZm9yd2FyZGVkUmVmLCBjaGlsZHJlblJlZikgOiBjaGlsZHJlblJlZjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGRyZW4sIHByb3BzMik7XG4gICAgfVxuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudChjaGlsZHJlbikgPiAxID8gUmVhY3QuQ2hpbGRyZW4ub25seShudWxsKSA6IG51bGw7XG4gIH0pO1xuICBTbG90Q2xvbmUuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3RDbG9uZWA7XG4gIHJldHVybiBTbG90Q2xvbmU7XG59XG52YXIgU0xPVFRBQkxFX0lERU5USUZJRVIgPSBTeW1ib2woXCJyYWRpeC5zbG90dGFibGVcIik7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdHRhYmxlKG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90dGFibGUyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KEZyYWdtZW50MiwgeyBjaGlsZHJlbiB9KTtcbiAgfTtcbiAgU2xvdHRhYmxlMi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdHRhYmxlYDtcbiAgU2xvdHRhYmxlMi5fX3JhZGl4SWQgPSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbiAgcmV0dXJuIFNsb3R0YWJsZTI7XG59XG52YXIgU2xvdHRhYmxlID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3R0YWJsZShcIlNsb3R0YWJsZVwiKTtcbmZ1bmN0aW9uIGlzU2xvdHRhYmxlKGNoaWxkKSB7XG4gIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkgJiYgdHlwZW9mIGNoaWxkLnR5cGUgPT09IFwiZnVuY3Rpb25cIiAmJiBcIl9fcmFkaXhJZFwiIGluIGNoaWxkLnR5cGUgJiYgY2hpbGQudHlwZS5fX3JhZGl4SWQgPT09IFNMT1RUQUJMRV9JREVOVElGSUVSO1xufVxuZnVuY3Rpb24gbWVyZ2VQcm9wcyhzbG90UHJvcHMsIGNoaWxkUHJvcHMpIHtcbiAgY29uc3Qgb3ZlcnJpZGVQcm9wcyA9IHsgLi4uY2hpbGRQcm9wcyB9O1xuICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIGNoaWxkUHJvcHMpIHtcbiAgICBjb25zdCBzbG90UHJvcFZhbHVlID0gc2xvdFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBjaGlsZFByb3BWYWx1ZSA9IGNoaWxkUHJvcHNbcHJvcE5hbWVdO1xuICAgIGNvbnN0IGlzSGFuZGxlciA9IC9eb25bQS1aXS8udGVzdChwcm9wTmFtZSk7XG4gICAgaWYgKGlzSGFuZGxlcikge1xuICAgICAgaWYgKHNsb3RQcm9wVmFsdWUgJiYgY2hpbGRQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNoaWxkUHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHNsb3RQcm9wVmFsdWUoLi4uYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoc2xvdFByb3BWYWx1ZSkge1xuICAgICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHNsb3RQcm9wVmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IHsgLi4uc2xvdFByb3BWYWx1ZSwgLi4uY2hpbGRQcm9wVmFsdWUgfTtcbiAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSBcImNsYXNzTmFtZVwiKSB7XG4gICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9IFtzbG90UHJvcFZhbHVlLCBjaGlsZFByb3BWYWx1ZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyAuLi5zbG90UHJvcHMsIC4uLm92ZXJyaWRlUHJvcHMgfTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRSZWYoZWxlbWVudCkge1xuICBsZXQgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LnByb3BzLCBcInJlZlwiKT8uZ2V0O1xuICBsZXQgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5yZWY7XG4gIH1cbiAgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LCBcInJlZlwiKT8uZ2V0O1xuICBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnByb3BzLnJlZjtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWYgfHwgZWxlbWVudC5yZWY7XG59XG5leHBvcnQge1xuICBTbG90IGFzIFJvb3QsXG4gIFNsb3QsXG4gIFNsb3R0YWJsZSxcbiAgY3JlYXRlU2xvdCxcbiAgY3JlYXRlU2xvdHRhYmxlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvdXNlLWNhbGxiYWNrLXJlZi9zcmMvdXNlLWNhbGxiYWNrLXJlZi50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gdXNlQ2FsbGJhY2tSZWYoY2FsbGJhY2spIHtcbiAgY29uc3QgY2FsbGJhY2tSZWYgPSBSZWFjdC51c2VSZWYoY2FsbGJhY2spO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNhbGxiYWNrUmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgfSk7XG4gIHJldHVybiBSZWFjdC51c2VNZW1vKCgpID0+ICguLi5hcmdzKSA9PiBjYWxsYmFja1JlZi5jdXJyZW50Py4oLi4uYXJncyksIFtdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUNhbGxiYWNrUmVmXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3VzZS1jb250cm9sbGFibGUtc3RhdGUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbnZhciB1c2VJbnNlcnRpb25FZmZlY3QgPSBSZWFjdFtcIiB1c2VJbnNlcnRpb25FZmZlY3QgXCIudHJpbSgpLnRvU3RyaW5nKCldIHx8IHVzZUxheW91dEVmZmVjdDtcbmZ1bmN0aW9uIHVzZUNvbnRyb2xsYWJsZVN0YXRlKHtcbiAgcHJvcCxcbiAgZGVmYXVsdFByb3AsXG4gIG9uQ2hhbmdlID0gKCkgPT4ge1xuICB9LFxuICBjYWxsZXJcbn0pIHtcbiAgY29uc3QgW3VuY29udHJvbGxlZFByb3AsIHNldFVuY29udHJvbGxlZFByb3AsIG9uQ2hhbmdlUmVmXSA9IHVzZVVuY29udHJvbGxlZFN0YXRlKHtcbiAgICBkZWZhdWx0UHJvcCxcbiAgICBvbkNoYW5nZVxuICB9KTtcbiAgY29uc3QgaXNDb250cm9sbGVkID0gcHJvcCAhPT0gdm9pZCAwO1xuICBjb25zdCB2YWx1ZSA9IGlzQ29udHJvbGxlZCA/IHByb3AgOiB1bmNvbnRyb2xsZWRQcm9wO1xuICBpZiAodHJ1ZSkge1xuICAgIGNvbnN0IGlzQ29udHJvbGxlZFJlZiA9IFJlYWN0LnVzZVJlZihwcm9wICE9PSB2b2lkIDApO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCB3YXNDb250cm9sbGVkID0gaXNDb250cm9sbGVkUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAod2FzQ29udHJvbGxlZCAhPT0gaXNDb250cm9sbGVkKSB7XG4gICAgICAgIGNvbnN0IGZyb20gPSB3YXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zdCB0byA9IGlzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGAke2NhbGxlcn0gaXMgY2hhbmdpbmcgZnJvbSAke2Zyb219IHRvICR7dG99LiBDb21wb25lbnRzIHNob3VsZCBub3Qgc3dpdGNoIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHZhbHVlIGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIGNvbXBvbmVudC5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpc0NvbnRyb2xsZWRSZWYuY3VycmVudCA9IGlzQ29udHJvbGxlZDtcbiAgICB9LCBbaXNDb250cm9sbGVkLCBjYWxsZXJdKTtcbiAgfVxuICBjb25zdCBzZXRWYWx1ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChuZXh0VmFsdWUpID0+IHtcbiAgICAgIGlmIChpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgY29uc3QgdmFsdWUyID0gaXNGdW5jdGlvbihuZXh0VmFsdWUpID8gbmV4dFZhbHVlKHByb3ApIDogbmV4dFZhbHVlO1xuICAgICAgICBpZiAodmFsdWUyICE9PSBwcm9wKSB7XG4gICAgICAgICAgb25DaGFuZ2VSZWYuY3VycmVudD8uKHZhbHVlMik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFVuY29udHJvbGxlZFByb3AobmV4dFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtpc0NvbnRyb2xsZWQsIHByb3AsIHNldFVuY29udHJvbGxlZFByb3AsIG9uQ2hhbmdlUmVmXVxuICApO1xuICByZXR1cm4gW3ZhbHVlLCBzZXRWYWx1ZV07XG59XG5mdW5jdGlvbiB1c2VVbmNvbnRyb2xsZWRTdGF0ZSh7XG4gIGRlZmF1bHRQcm9wLFxuICBvbkNoYW5nZVxufSkge1xuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlKGRlZmF1bHRQcm9wKTtcbiAgY29uc3QgcHJldlZhbHVlUmVmID0gUmVhY3QudXNlUmVmKHZhbHVlKTtcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSBSZWFjdC51c2VSZWYob25DaGFuZ2UpO1xuICB1c2VJbnNlcnRpb25FZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQgPSBvbkNoYW5nZTtcbiAgfSwgW29uQ2hhbmdlXSk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByZXZWYWx1ZVJlZi5jdXJyZW50ICE9PSB2YWx1ZSkge1xuICAgICAgb25DaGFuZ2VSZWYuY3VycmVudD8uKHZhbHVlKTtcbiAgICAgIHByZXZWYWx1ZVJlZi5jdXJyZW50ID0gdmFsdWU7XG4gICAgfVxuICB9LCBbdmFsdWUsIHByZXZWYWx1ZVJlZl0pO1xuICByZXR1cm4gW3ZhbHVlLCBzZXRWYWx1ZSwgb25DaGFuZ2VSZWZdO1xufVxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbi8vIHNyYy91c2UtY29udHJvbGxhYmxlLXN0YXRlLXJlZHVjZXIudHN4XG5pbXBvcnQgKiBhcyBSZWFjdDIgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VFZmZlY3RFdmVudCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWVmZmVjdC1ldmVudFwiO1xudmFyIFNZTkNfU1RBVEUgPSBTeW1ib2woXCJSQURJWDpTWU5DX1NUQVRFXCIpO1xuZnVuY3Rpb24gdXNlQ29udHJvbGxhYmxlU3RhdGVSZWR1Y2VyKHJlZHVjZXIsIHVzZXJBcmdzLCBpbml0aWFsQXJnLCBpbml0KSB7XG4gIGNvbnN0IHsgcHJvcDogY29udHJvbGxlZFN0YXRlLCBkZWZhdWx0UHJvcCwgb25DaGFuZ2U6IG9uQ2hhbmdlUHJvcCwgY2FsbGVyIH0gPSB1c2VyQXJncztcbiAgY29uc3QgaXNDb250cm9sbGVkID0gY29udHJvbGxlZFN0YXRlICE9PSB2b2lkIDA7XG4gIGNvbnN0IG9uQ2hhbmdlID0gdXNlRWZmZWN0RXZlbnQob25DaGFuZ2VQcm9wKTtcbiAgaWYgKHRydWUpIHtcbiAgICBjb25zdCBpc0NvbnRyb2xsZWRSZWYgPSBSZWFjdDIudXNlUmVmKGNvbnRyb2xsZWRTdGF0ZSAhPT0gdm9pZCAwKTtcbiAgICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IHdhc0NvbnRyb2xsZWQgPSBpc0NvbnRyb2xsZWRSZWYuY3VycmVudDtcbiAgICAgIGlmICh3YXNDb250cm9sbGVkICE9PSBpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgY29uc3QgZnJvbSA9IHdhc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCI7XG4gICAgICAgIGNvbnN0IHRvID0gaXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYCR7Y2FsbGVyfSBpcyBjaGFuZ2luZyBmcm9tICR7ZnJvbX0gdG8gJHt0b30uIENvbXBvbmVudHMgc2hvdWxkIG5vdCBzd2l0Y2ggZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgdmFsdWUgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgY29tcG9uZW50LmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlzQ29udHJvbGxlZFJlZi5jdXJyZW50ID0gaXNDb250cm9sbGVkO1xuICAgIH0sIFtpc0NvbnRyb2xsZWQsIGNhbGxlcl0pO1xuICB9XG4gIGNvbnN0IGFyZ3MgPSBbeyAuLi5pbml0aWFsQXJnLCBzdGF0ZTogZGVmYXVsdFByb3AgfV07XG4gIGlmIChpbml0KSB7XG4gICAgYXJncy5wdXNoKGluaXQpO1xuICB9XG4gIGNvbnN0IFtpbnRlcm5hbFN0YXRlLCBkaXNwYXRjaF0gPSBSZWFjdDIudXNlUmVkdWNlcihcbiAgICAoc3RhdGUyLCBhY3Rpb24pID0+IHtcbiAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gU1lOQ19TVEFURSkge1xuICAgICAgICByZXR1cm4geyAuLi5zdGF0ZTIsIHN0YXRlOiBhY3Rpb24uc3RhdGUgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5leHQgPSByZWR1Y2VyKHN0YXRlMiwgYWN0aW9uKTtcbiAgICAgIGlmIChpc0NvbnRyb2xsZWQgJiYgIU9iamVjdC5pcyhuZXh0LnN0YXRlLCBzdGF0ZTIuc3RhdGUpKSB7XG4gICAgICAgIG9uQ2hhbmdlKG5leHQuc3RhdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSxcbiAgICAuLi5hcmdzXG4gICk7XG4gIGNvbnN0IHVuY29udHJvbGxlZFN0YXRlID0gaW50ZXJuYWxTdGF0ZS5zdGF0ZTtcbiAgY29uc3QgcHJldlZhbHVlUmVmID0gUmVhY3QyLnVzZVJlZih1bmNvbnRyb2xsZWRTdGF0ZSk7XG4gIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwcmV2VmFsdWVSZWYuY3VycmVudCAhPT0gdW5jb250cm9sbGVkU3RhdGUpIHtcbiAgICAgIHByZXZWYWx1ZVJlZi5jdXJyZW50ID0gdW5jb250cm9sbGVkU3RhdGU7XG4gICAgICBpZiAoIWlzQ29udHJvbGxlZCkge1xuICAgICAgICBvbkNoYW5nZSh1bmNvbnRyb2xsZWRTdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCBbb25DaGFuZ2UsIHVuY29udHJvbGxlZFN0YXRlLCBwcmV2VmFsdWVSZWYsIGlzQ29udHJvbGxlZF0pO1xuICBjb25zdCBzdGF0ZSA9IFJlYWN0Mi51c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBpc0NvbnRyb2xsZWQyID0gY29udHJvbGxlZFN0YXRlICE9PSB2b2lkIDA7XG4gICAgaWYgKGlzQ29udHJvbGxlZDIpIHtcbiAgICAgIHJldHVybiB7IC4uLmludGVybmFsU3RhdGUsIHN0YXRlOiBjb250cm9sbGVkU3RhdGUgfTtcbiAgICB9XG4gICAgcmV0dXJuIGludGVybmFsU3RhdGU7XG4gIH0sIFtpbnRlcm5hbFN0YXRlLCBjb250cm9sbGVkU3RhdGVdKTtcbiAgUmVhY3QyLnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzQ29udHJvbGxlZCAmJiAhT2JqZWN0LmlzKGNvbnRyb2xsZWRTdGF0ZSwgaW50ZXJuYWxTdGF0ZS5zdGF0ZSkpIHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogU1lOQ19TVEFURSwgc3RhdGU6IGNvbnRyb2xsZWRTdGF0ZSB9KTtcbiAgICB9XG4gIH0sIFtjb250cm9sbGVkU3RhdGUsIGludGVybmFsU3RhdGUuc3RhdGUsIGlzQ29udHJvbGxlZF0pO1xuICByZXR1cm4gW3N0YXRlLCBkaXNwYXRjaF07XG59XG5leHBvcnQge1xuICB1c2VDb250cm9sbGFibGVTdGF0ZSxcbiAgdXNlQ29udHJvbGxhYmxlU3RhdGVSZWR1Y2VyXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3VzZS1lZmZlY3QtZXZlbnQudHN4XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbnZhciB1c2VSZWFjdEVmZmVjdEV2ZW50ID0gUmVhY3RbXCIgdXNlRWZmZWN0RXZlbnQgXCIudHJpbSgpLnRvU3RyaW5nKCldO1xudmFyIHVzZVJlYWN0SW5zZXJ0aW9uRWZmZWN0ID0gUmVhY3RbXCIgdXNlSW5zZXJ0aW9uRWZmZWN0IFwiLnRyaW0oKS50b1N0cmluZygpXTtcbmZ1bmN0aW9uIHVzZUVmZmVjdEV2ZW50KGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgdXNlUmVhY3RFZmZlY3RFdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHVzZVJlYWN0RWZmZWN0RXZlbnQoY2FsbGJhY2spO1xuICB9XG4gIGNvbnN0IHJlZiA9IFJlYWN0LnVzZVJlZigoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNhbGwgYW4gZXZlbnQgaGFuZGxlciB3aGlsZSByZW5kZXJpbmcuXCIpO1xuICB9KTtcbiAgaWYgKHR5cGVvZiB1c2VSZWFjdEluc2VydGlvbkVmZmVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdXNlUmVhY3RJbnNlcnRpb25FZmZlY3QoKCkgPT4ge1xuICAgICAgcmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgICAgcmVmLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiAoLi4uYXJncykgPT4gcmVmLmN1cnJlbnQ/LiguLi5hcmdzKSwgW10pO1xufVxuZXhwb3J0IHtcbiAgdXNlRWZmZWN0RXZlbnRcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC91c2UtZXNjYXBlLWtleWRvd24vc3JjL3VzZS1lc2NhcGUta2V5ZG93bi50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWZcIjtcbmZ1bmN0aW9uIHVzZUVzY2FwZUtleWRvd24ob25Fc2NhcGVLZXlEb3duUHJvcCwgb3duZXJEb2N1bWVudCA9IGdsb2JhbFRoaXM/LmRvY3VtZW50KSB7XG4gIGNvbnN0IG9uRXNjYXBlS2V5RG93biA9IHVzZUNhbGxiYWNrUmVmKG9uRXNjYXBlS2V5RG93blByb3ApO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgb25Fc2NhcGVLZXlEb3duKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RG93biwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgIHJldHVybiAoKSA9PiBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgfSwgW29uRXNjYXBlS2V5RG93biwgb3duZXJEb2N1bWVudF0pO1xufVxuZXhwb3J0IHtcbiAgdXNlRXNjYXBlS2V5ZG93blxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L3VzZS1sYXlvdXQtZWZmZWN0L3NyYy91c2UtbGF5b3V0LWVmZmVjdC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIHVzZUxheW91dEVmZmVjdDIgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCA/IFJlYWN0LnVzZUxheW91dEVmZmVjdCA6ICgpID0+IHtcbn07XG5leHBvcnQge1xuICB1c2VMYXlvdXRFZmZlY3QyIGFzIHVzZUxheW91dEVmZmVjdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cblxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XG4gIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XG4gIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG5cbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcbiAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0O1xuICB9XG4gIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcbiAgdmFyIHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICB0W3BdID0gc1twXTtcbiAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcbiAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XG4gIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XG4gIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xuICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcbiAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xuICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcbiAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xuICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XG4gICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xuICAgICAgfVxuICB9XG4gIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcbiAgZG9uZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xuICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcbiAgfVxuICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xuICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIG9bazJdID0gbVtrXTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcbiAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xuICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgfVxuICB9O1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xuICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gIGlmICghbSkgcmV0dXJuIG87XG4gIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICB0cnkge1xuICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gIGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgIH1cbiAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICB9XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XG4gIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xuICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgcltrXSA9IGFbal07XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgfVxuICB9XG4gIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XG4gIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcbiAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcbiAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIGFyID0gW107XG4gICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcbiAgICByZXR1cm4gYXI7XG4gIH07XG4gIHJldHVybiBvd25LZXlzKG8pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xuICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xuICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XG4gIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xuICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcbiAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XG4gICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICB2YXIgciwgcyA9IDA7XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xuICAgICAgICBpZiAoci5kaXNwb3NlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xuICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBzIHw9IDE7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcbiAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XG4gICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcbiAgICAgIH0pO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19lc0RlY29yYXRlLFxuICBfX3J1bkluaXRpYWxpemVycyxcbiAgX19wcm9wS2V5LFxuICBfX3NldEZ1bmN0aW9uTmFtZSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG4gIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxufTtcbiJdLCJuYW1lcyI6WyJlIiwidCIsInIiLCJTeW1ib2wiLCJuIiwiaXRlcmF0b3IiLCJvIiwidG9TdHJpbmdUYWciLCJpIiwiYyIsInByb3RvdHlwZSIsIkdlbmVyYXRvciIsInUiLCJPYmplY3QiLCJjcmVhdGUiLCJfcmVnZW5lcmF0b3JEZWZpbmUyIiwiZiIsInAiLCJ5IiwiRyIsInYiLCJhIiwiZCIsImJpbmQiLCJsZW5ndGgiLCJsIiwiVHlwZUVycm9yIiwiY2FsbCIsImRvbmUiLCJ2YWx1ZSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZGlzcGxheU5hbWUiLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9zbGljZWRUb0FycmF5IiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkFycmF5IiwiZnJvbSIsInRlc3QiLCJuZXh0IiwicHVzaCIsImlzQXJyYXkiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwiRnJhZ21lbnQiLCJfRnJhZ21lbnQiLCJ1c2VTdGF0ZSIsIkFyY2hpdmUiLCJCdXR0b24iLCJEaWFsb2ciLCJEaWFsb2dDb250ZW50IiwiRGlhbG9nSGVhZGVyIiwiRGlhbG9nVGl0bGUiLCJEaWFsb2dGb290ZXIiLCJ1c2VUb2FzdCIsImFwaSIsIkFyY2hpdmVCdXR0b24iLCJfcmVmIiwiaXRlbVR5cGUiLCJpdGVtSWQiLCJpdGVtTmFtZSIsIm9uQXJjaGl2ZVN1Y2Nlc3MiLCJfcmVmJHZhcmlhbnQiLCJ2YXJpYW50IiwiX3JlZiRzaXplIiwic2l6ZSIsIl9yZWYkY2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwiX3JlZiRpY29uT25seSIsImljb25Pbmx5IiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsImlzRGlhbG9nT3BlbiIsInNldElzRGlhbG9nT3BlbiIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwiaXNBcmNoaXZpbmciLCJzZXRJc0FyY2hpdmluZyIsIl91c2VUb2FzdCIsInNob3dUb2FzdCIsImhhbmRsZUFyY2hpdmVDbGljayIsImhhbmRsZUNvbmZpcm1BcmNoaXZlIiwiX3JlZjIiLCJfY2FsbGVlIiwiX2Vycm9yJHJlc3BvbnNlIiwiZXJyb3JNZXNzYWdlIiwiX3QiLCJfY29udGV4dCIsImNvbmNhdCIsImdldEl0ZW1UeXBlTmFtZSIsInJlc3BvbnNlIiwiZGF0YSIsIm1lc3NhZ2UiLCJ0b0xvd2VyQ2FzZSIsImhhbmRsZUNsb3NlRGlhbG9nIiwidHlwZSIsInR5cGVNYXAiLCJjaGlsZHJlbiIsIm9uQ2xpY2siLCJ0aXRsZSIsIm9wZW4iLCJvbk9wZW5DaGFuZ2UiLCJkaXNhYmxlZCIsInVzZU1lbW8iLCJDaGV2cm9uTGVmdCIsIkNoZXZyb25SaWdodCIsIkNhcmQiLCJjbiIsImNhdGVnb3J5Q29sb3JzIiwid29yc2hpcCIsIm91dHJlYWNoIiwiZmVsbG93c2hpcCIsInRyYWluaW5nIiwiZ2V0Q2F0ZWdvcnlDb2xvciIsImNhdGVnb3J5Iiwibm9ybWFsaXplZENhdGVnb3J5IiwiQ2FsZW5kYXJWaWV3IiwiZXZlbnRzIiwib25EYXlDbGljayIsIm9uRXZlbnRDbGljayIsIkRhdGUiLCJjdXJyZW50RGF0ZSIsInNldEN1cnJlbnREYXRlIiwiZ2V0Rmlyc3REYXlPZk1vbnRoIiwiZGF0ZSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXRMYXN0RGF5T2ZNb250aCIsImdldERheXNJbk1vbnRoIiwiZ2V0RGF0ZSIsImdldEZpcnN0RGF5T2ZXZWVrIiwiZ2V0RGF5IiwiZ29Ub1ByZXZpb3VzTW9udGgiLCJnb1RvTmV4dE1vbnRoIiwiZ29Ub1RvZGF5IiwiaXNUb2RheSIsInRvZGF5IiwiaXNDdXJyZW50TW9udGgiLCJnZXRFdmVudHNGb3JEYXRlIiwiZmlsdGVyIiwiZXZlbnQiLCJldmVudERhdGUiLCJldmVudF9kYXRlIiwiY2FsZW5kYXJEYXlzIiwiZGF5cyIsImZpcnN0RGF5IiwiZGF5c0luTW9udGgiLCJkYXkiLCJmb3JtYXRNb250aFllYXIiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJtb250aCIsInllYXIiLCJkYXlOYW1lcyIsImhhbmRsZURheUNsaWNrIiwiZGF5RXZlbnRzIiwiaGFuZGxlRXZlbnRDbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm1hcCIsImNoYXJBdCIsImluZGV4IiwidmlzaWJsZUV2ZW50cyIsIm1vcmVDb3VudCIsImlkIiwidG9JU09TdHJpbmciLCJSZWFjdCIsIkRpYWxvZ0Rlc2NyaXB0aW9uIiwiSW5wdXQiLCJDaGVja0NpcmNsZSIsIkNvbXBsZXRlRXZlbnREaWFsb2ciLCJpc09wZW4iLCJvbkNsb3NlIiwib25Db25maXJtIiwiZXZlbnRUaXRsZSIsImF0dGVuZGFuY2VDb3VudCIsInNldEF0dGVuZGFuY2VDb3VudCIsImVycm9yIiwic2V0RXJyb3IiLCJfdXNlU3RhdGU1IiwiX3VzZVN0YXRlNiIsImlzU3VibWl0dGluZyIsInNldElzU3VibWl0dGluZyIsInVzZUVmZmVjdCIsInZhbGlkYXRlQXR0ZW5kYW5jZSIsImNvdW50IiwicGFyc2VJbnQiLCJpc05hTiIsImhhbmRsZVN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiX3giLCJoYW5kbGVDaGFuZ2UiLCJ0YXJnZXQiLCJvblN1Ym1pdCIsImh0bWxGb3IiLCJtaW4iLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwiYXV0b0ZvY3VzIiwib3duS2V5cyIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJfb2JqZWN0U3ByZWFkIiwiZm9yRWFjaCIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJ1c2VSZWYiLCJTZWxlY3QiLCJVcGxvYWQiLCJYIiwiRXZlbnRGb3JtIiwiX3JlZiRldmVudCIsIl9yZWYkaXNMb2FkaW5nIiwiaXNMb2FkaW5nIiwiZGVzY3JpcHRpb24iLCJldmVudF90aW1lIiwibG9jYXRpb24iLCJjYXBhY2l0eSIsImltYWdlIiwiZm9ybURhdGEiLCJzZXRGb3JtRGF0YSIsImVycm9ycyIsInNldEVycm9ycyIsIl91c2VTdGF0ZTciLCJfdXNlU3RhdGU4IiwiaW1hZ2VQcmV2aWV3Iiwic2V0SW1hZ2VQcmV2aWV3IiwiZmlsZUlucHV0UmVmIiwic3BsaXQiLCJzdWJzdHJpbmciLCJ2YWxpZGF0ZUZvcm0iLCJuZXdFcnJvcnMiLCJ0cmltIiwic2VsZWN0ZWREYXRlIiwic2V0SG91cnMiLCJ1bmRlZmluZWQiLCJjYXBhY2l0eU51bSIsIkZpbGUiLCJ2YWxpZFR5cGVzIiwiaW5jbHVkZXMiLCJtYXhTaXplIiwiX2UkdGFyZ2V0IiwicHJldiIsImhhbmRsZUltYWdlQ2hhbmdlIiwiX2UkdGFyZ2V0JGZpbGVzIiwiZmlsZSIsImZpbGVzIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJoYW5kbGVJbWFnZVJlbW92ZSIsImN1cnJlbnQiLCJzdWJtaXREYXRhIiwiX3N1Ym1pdERhdGEiLCJfZXJyb3IkcmVzcG9uc2UyIiwiX2Vycm9yJHJlc3BvbnNlMyIsImNvbnNvbGUiLCJsb2ciLCJGb3JtRGF0YSIsImFwcGVuZCIsInN0YXR1cyIsImFsZXJ0Iiwicm93cyIsImxhYmVsIiwib3B0aW9ucyIsInJlcXVpcmVkIiwic3JjIiwiYWx0IiwicmVmIiwiYWNjZXB0IiwiX2ZpbGVJbnB1dFJlZiRjdXJyZW50IiwiY2xpY2siLCJEaWFsb2dQcmltaXRpdmUiLCJSb290IiwiRGlhbG9nVHJpZ2dlciIsIlRyaWdnZXIiLCJEaWFsb2dQb3J0YWwiLCJQb3J0YWwiLCJEaWFsb2dDbG9zZSIsIkNsb3NlIiwiRGlhbG9nT3ZlcmxheSIsImZvcndhcmRSZWYiLCJwcm9wcyIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsIl9leGNsdWRlZCIsIk92ZXJsYXkiLCJfcmVmMiRzaG93Q2xvc2VCdXR0b24iLCJzaG93Q2xvc2VCdXR0b24iLCJfZXhjbHVkZWQyIiwiQ29udGVudCIsIl9yZWYzIiwiX2V4Y2x1ZGVkMyIsIl9yZWY0IiwiX2V4Y2x1ZGVkNCIsIl9yZWY1IiwiX2V4Y2x1ZGVkNSIsIlRpdGxlIiwiX3JlZjYiLCJfZXhjbHVkZWQ2IiwiRGVzY3JpcHRpb24iLCJjdmEiLCJpbnB1dFZhcmlhbnRzIiwidmFyaWFudHMiLCJzbSIsIm1kIiwibGciLCJkZWZhdWx0VmFyaWFudHMiLCJnZXRJbnB1dE1vZGUiLCJfcmVmJHR5cGUiLCJoZWxwZXJUZXh0IiwiaWNvbiIsIl9yZWYkaWNvblBvc2l0aW9uIiwiaWNvblBvc2l0aW9uIiwiX3JlZiRmdWxsV2lkdGgiLCJmdWxsV2lkdGgiLCJpbnB1dE1vZGUiLCJpbnB1dElkIiwidXNlSWQiLCJlcnJvcklkIiwiaGVscGVyVGV4dElkIiwiaGFzRXJyb3IiLCJjdXJyZW50VmFyaWFudCIsIm1vYmlsZUlucHV0TW9kZSIsInJvbGUiLCJDaGVjayIsIkNoZXZyb25Eb3duIiwiU2VhcmNoIiwic2VsZWN0VHJpZ2dlclZhcmlhbnRzIiwiX3JlZiRwbGFjZWhvbGRlciIsIl9yZWYkZGlzYWJsZWQiLCJfcmVmJHJlcXVpcmVkIiwiX3JlZiRtdWx0aXBsZSIsIm11bHRpcGxlIiwiX3JlZiRzZWFyY2hhYmxlIiwic2VhcmNoYWJsZSIsIl9SZWFjdCR1c2VTdGF0ZSIsIl9SZWFjdCR1c2VTdGF0ZTIiLCJzZXRJc09wZW4iLCJfUmVhY3QkdXNlU3RhdGUzIiwiX1JlYWN0JHVzZVN0YXRlNCIsInNlYXJjaFF1ZXJ5Iiwic2V0U2VhcmNoUXVlcnkiLCJfUmVhY3QkdXNlU3RhdGU1IiwiX1JlYWN0JHVzZVN0YXRlNiIsImZvY3VzZWRJbmRleCIsInNldEZvY3VzZWRJbmRleCIsImNvbnRhaW5lclJlZiIsInNlYXJjaElucHV0UmVmIiwiZHJvcGRvd25SZWYiLCJzZWxlY3RJZCIsInNlbGVjdGVkVmFsdWVzIiwiZmlsdGVyZWRPcHRpb25zIiwib3B0aW9uIiwiZGlzcGxheVRleHQiLCJmaW5kIiwib3B0IiwiaGFuZGxlU2VsZWN0Iiwib3B0aW9uVmFsdWUiLCJuZXdWYWx1ZSIsIl90b0NvbnN1bWFibGVBcnJheSIsImhhbmRsZVJlbW92ZSIsImhhbmRsZUtleURvd24iLCJrZXkiLCJoYW5kbGVDbGlja091dHNpZGUiLCJjb250YWlucyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJmb2N1cyIsImZvY3VzZWRFbGVtZW50Iiwic2Nyb2xsSW50b1ZpZXciLCJibG9jayIsInRhYkluZGV4Iiwib25LZXlEb3duIiwidmFsIiwiaXNTZWxlY3RlZCIsImlzRm9jdXNlZCIsIlNrZWxldG9uIiwid2lkdGgiLCJoZWlnaHQiLCJfcmVmJGFuaW1hdGlvbiIsImFuaW1hdGlvbiIsInZhcmlhbnRDbGFzc2VzIiwidGV4dCIsImNpcmN1bGFyIiwicmVjdGFuZ3VsYXIiLCJhbmltYXRpb25DbGFzc2VzIiwicHVsc2UiLCJ3YXZlIiwibm9uZSIsInN0eWxlIiwiU2tlbGV0b25UZXh0IiwiX3JlZjIkbGluZXMiLCJsaW5lcyIsIl9yZWYyJGNsYXNzTmFtZSIsIl8iLCJTa2VsZXRvbkNhcmQiLCJfcmVmMyRjbGFzc05hbWUiLCJfcmVmMyRoYXNJbWFnZSIsImhhc0ltYWdlIiwiU2tlbGV0b25UYWJsZSIsIl9yZWY0JHJvd3MiLCJfcmVmNCRjb2x1bW5zIiwiY29sdW1ucyIsIl9yZWY0JGNsYXNzTmFtZSIsInJvd0luZGV4IiwiY29sSW5kZXgiLCJTa2VsZXRvbkF2YXRhciIsIl9yZWY1JHNpemUiLCJfcmVmNSRjbGFzc05hbWUiLCJzaXplQ2xhc3NlcyIsInhsIiwiU2tlbGV0b25MaXN0IiwiX3JlZjYkaXRlbXMiLCJpdGVtcyIsIl9yZWY2JGNsYXNzTmFtZSIsImV2ZW50QXBpIiwiZ2V0RXZlbnRzIiwiZ2V0IiwiZ2V0RXZlbnQiLCJfY2FsbGVlMiIsIl9jb250ZXh0MiIsImNyZWF0ZUV2ZW50IiwiX2NhbGxlZTMiLCJfY29udGV4dDMiLCJwb3N0IiwidXBkYXRlRXZlbnQiLCJfY2FsbGVlNCIsIl9jb250ZXh0NCIsInB1dCIsImRlbGV0ZUV2ZW50IiwiX2NhbGxlZTUiLCJfY29udGV4dDUiLCJjb21wbGV0ZUV2ZW50IiwiX2NhbGxlZTYiLCJfY29udGV4dDYiLCJhdHRlbmRhbmNlX2NvdW50IiwiUGx1cyIsIkNhbGVuZGFyIiwiTWFwUGluIiwiQ2xvY2siLCJVc2VycyIsIkVkaXQiLCJMaXN0IiwiTGF5b3V0R3JpZCIsIkV5ZSIsInVzZUF1dGgiLCJ1c2VOYXZpZ2F0ZSIsIkV2ZW50cyIsIl91c2VBdXRoIiwidXNlciIsIm5hdmlnYXRlIiwiaXNBZG1pbiIsInNldEV2ZW50cyIsInNldElzTG9hZGluZyIsImlzRm9ybU9wZW4iLCJzZXRJc0Zvcm1PcGVuIiwic2VsZWN0ZWRFdmVudCIsInNldFNlbGVjdGVkRXZlbnQiLCJfdXNlU3RhdGU5IiwiX3VzZVN0YXRlMCIsImlzQ29tcGxldGVEaWFsb2dPcGVuIiwic2V0SXNDb21wbGV0ZURpYWxvZ09wZW4iLCJfdXNlU3RhdGUxIiwiX3VzZVN0YXRlMTAiLCJldmVudFRvQ29tcGxldGUiLCJzZXRFdmVudFRvQ29tcGxldGUiLCJfdXNlU3RhdGUxMSIsIl91c2VTdGF0ZTEyIiwidGltZVJhbmdlRmlsdGVyIiwic2V0VGltZVJhbmdlRmlsdGVyIiwiX3VzZVN0YXRlMTMiLCJfdXNlU3RhdGUxNCIsImNhdGVnb3J5RmlsdGVyIiwic2V0Q2F0ZWdvcnlGaWx0ZXIiLCJfdXNlU3RhdGUxNSIsIl91c2VTdGF0ZTE2Iiwic3RhdHVzRmlsdGVyIiwic2V0U3RhdHVzRmlsdGVyIiwiX3VzZVN0YXRlMTciLCJfdXNlU3RhdGUxOCIsInZpZXdNb2RlIiwic2V0Vmlld01vZGUiLCJsb2FkRXZlbnRzIiwiaGFuZGxlQWRkQ2xpY2siLCJoYW5kbGVFZGl0Q2xpY2siLCJoYW5kbGVWaWV3RGV0YWlscyIsImhhbmRsZUZvcm1DbG9zZSIsImhhbmRsZUZvcm1TdWJtaXQiLCJfcmVzdWx0IiwiX3QyIiwiaGFuZGxlRGVsZXRlQ2xpY2siLCJoYW5kbGVBcmNoaXZlU3VjY2VzcyIsImhhbmRsZUNvbXBsZXRlQ2xpY2siLCJoYW5kbGVDb21wbGV0ZUNvbmZpcm0iLCJfdDMiLCJfeDIiLCJub3ciLCJmaWx0ZXJlZEV2ZW50cyIsInNvcnRlZEV2ZW50cyIsInNvcnQiLCJiIiwiZGF0ZUEiLCJnZXRUaW1lIiwiZGF0ZUIiLCJmb3JtYXREYXRlIiwiZGF0ZVN0cmluZyIsIndlZWtkYXkiLCJmb3JtYXRUaW1lIiwidGltZVN0cmluZyIsIl90aW1lU3RyaW5nJHNwbGl0IiwiX3RpbWVTdHJpbmckc3BsaXQyIiwiaG91cnMiLCJtaW51dGVzIiwiaG91ciIsImFtcG0iLCJkaXNwbGF5SG91ciIsInJlbmRlckV2ZW50Q2FyZCIsImlzUGFzdCIsIl92YWx1ZSQiLCJfdmFsdWUkMiJdLCJzb3VyY2VSb290IjoiIn0=