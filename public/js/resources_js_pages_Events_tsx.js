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
 * - Input fields for title, date, time, location, description
 * - Form validation with inline error messages
 * - Support for both create and edit modes
 *
 * Validates Requirements: 9.1
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
        location: event.location
      });
    } else {
      // Reset form for new event
      setFormData({
        title: '',
        description: '',
        event_date: '',
        event_time: '',
        location: ''
      });
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
    }
    if (!formData.event_time) {
      newErrors.event_time = 'Time is required';
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
      var submitData, _error$response, _error$response2, _error$response3, _t;
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
            // Add status field for new events (default to 'upcoming')
            submitData = _objectSpread(_objectSpread({}, formData), {}, {
              status: (event === null || event === void 0 ? void 0 : event.status) || 'upcoming'
            });
            console.log('EventForm submitting data:', submitData);
            _context.n = 3;
            return onSubmit(submitData);
          case 3:
            console.log('EventForm submission successful, closing form');
            onClose();
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
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
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/map-pin.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/users.js");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _lib_eventApi__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../lib/eventApi */ "./resources/js/lib/eventApi.ts");
/* harmony import */ var _components_events_EventForm__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/events/EventForm */ "./resources/js/components/events/EventForm.tsx");
/* harmony import */ var _components_events_CompleteEventDialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/events/CompleteEventDialog */ "./resources/js/components/events/CompleteEventDialog.tsx");
/* harmony import */ var _components_archive_ArchiveButton__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/archive/ArchiveButton */ "./resources/js/components/archive/ArchiveButton.tsx");
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
 *
 * Features:
 * - Display list of upcoming events (sorted chronologically)
 * - Display list of past events
 * - Add Event button for creating new events (admin only)
 * - View event details
 * - Responsive layout
 *
 * Validates Requirements: 9.1, 9.2
 */
var Events = function Events() {
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_9__.useAuth)(),
    user = _useAuth.user;
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_10__.useToast)(),
    showToast = _useToast.showToast;
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
            return _lib_eventApi__WEBPACK_IMPORTED_MODULE_13__.eventApi.getEvents();
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
            return _lib_eventApi__WEBPACK_IMPORTED_MODULE_13__.eventApi.updateEvent(selectedEvent.id, data);
          case 1:
            result = _context2.v;
            console.log('Events.tsx: Event updated:', result);
            showToast('success', 'Event updated successfully');
            _context2.n = 4;
            break;
          case 2:
            _context2.n = 3;
            return _lib_eventApi__WEBPACK_IMPORTED_MODULE_13__.eventApi.createEvent(data);
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
            return _lib_eventApi__WEBPACK_IMPORTED_MODULE_13__.eventApi.completeEvent(eventToComplete.id, attendanceCount);
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
   * Separate events into upcoming and past
   */
  var now = new Date();
  now.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
  var upcomingEvents = events.filter(function (event) {
    var eventDate = new Date(event.event_date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= now && event.status === 'upcoming';
  }).sort(function (a, b) {
    return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
  });
  var pastEvents = events.filter(function (event) {
    var eventDate = new Date(event.event_date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < now || event.status === 'completed';
  }).sort(function (a, b) {
    return new Date(b.event_date).getTime() - new Date(a.event_date).getTime();
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
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_12__.Card, {
      className: "p-6 hover:shadow-lg transition-shadow ".concat(isPast ? 'opacity-75' : ''),
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-start justify-between mb-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex-1",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-lg font-semibold text-gray-900 mb-1",
            children: event.title
          }), event.status === 'completed' && event.attendance_count !== null && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center gap-2 text-sm text-gray-600",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
              className: "h-4 w-4"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
              children: [event.attendance_count, " attendees"]
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-2",
          children: [event.status === 'completed' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded",
            children: "Completed"
          }), event.status === 'cancelled' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded",
            children: "Cancelled"
          })]
        })]
      }), event.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-sm text-gray-600 mb-4 line-clamp-2",
        children: event.description
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-2 text-sm mb-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center text-gray-600",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "h-4 w-4 mr-2 flex-shrink-0"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: formatDate(event.event_date)
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center text-gray-600",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
            className: "h-4 w-4 mr-2 flex-shrink-0"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: formatTime(event.event_time)
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center text-gray-600",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
            className: "h-4 w-4 mr-2 flex-shrink-0"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            children: event.location
          })]
        })]
      }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2 pt-4 border-t border-gray-200",
        children: [event.status === 'upcoming' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_11__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return handleCompleteClick(event);
          },
          className: "flex-1",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "h-4 w-4 mr-1"
          }), "Complete"]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_11__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return handleEditClick(event);
          },
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
            className: "h-4 w-4 mr-1"
          }), "Edit"]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_archive_ArchiveButton__WEBPACK_IMPORTED_MODULE_16__["default"], {
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
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_events_EventForm__WEBPACK_IMPORTED_MODULE_14__["default"], {
      isOpen: isFormOpen,
      onClose: handleFormClose,
      onSubmit: handleFormSubmit,
      event: selectedEvent,
      isLoading: isLoading
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_events_CompleteEventDialog__WEBPACK_IMPORTED_MODULE_15__["default"], {
      isOpen: isCompleteDialogOpen,
      onClose: function onClose() {
        setIsCompleteDialogOpen(false);
        setEventToComplete(null);
      },
      onConfirm: handleCompleteConfirm,
      eventTitle: (eventToComplete === null || eventToComplete === void 0 ? void 0 : eventToComplete.title) || ''
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
          className: "text-2xl font-bold text-gray-900",
          children: "Events"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-gray-600 mt-1",
          children: "Manage church events and track attendance"
        })]
      }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_11__.Button, {
        onClick: handleAddClick,
        className: "w-full sm:w-auto",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
          className: "h-4 w-4 mr-2"
        }), "Add Event"]
      })]
    }), isLoading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "text-center py-12",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-gray-600",
        children: "Loading events..."
      })
    }), !isLoading && events.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "text-center py-12",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
        className: "text-gray-600",
        children: ["No events yet. ", isAdmin && 'Click "Add Event" to create one.']
      })
    }), !isLoading && events.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "space-y-8",
      children: [upcomingEvents.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
          className: "text-xl font-semibold text-gray-900 mb-4",
          children: "Upcoming Events"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          children: upcomingEvents.map(function (event) {
            return renderEventCard(event);
          })
        })]
      }), pastEvents.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
          className: "text-xl font-semibold text-gray-900 mb-4",
          children: "Past Events"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          children: pastEvents.map(function (event) {
            return renderEventCard(event, true);
          })
        })]
      })]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0V2ZW50c190c3guanM/aWQ9ZGU1YjgwZTAyOTY4NDE3ZiIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwrQkFBK0Isb0JBQW9CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEM7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxNQUFNO0FBQ2xCO0FBQ087QUFDUCxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FB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Q0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvYXJpYS1oaWRkZW4vZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvYXJjaGl2ZS9BcmNoaXZlQnV0dG9uLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy9ldmVudHMvQ29tcGxldGVFdmVudERpYWxvZy50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvZXZlbnRzL0V2ZW50Rm9ybS50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdWkvZGlhbG9nLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9pbnB1dC50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2xpYi9ldmVudEFwaS50cyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvcGFnZXMvRXZlbnRzLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvZ2V0LW5vbmNlL2Rpc3QvZXMyMDE1L2luZGV4LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvYXJjaGl2ZS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2Nsb2NrLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvbWFwLXBpbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3BsdXMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9zcXVhcmUtcGVuLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9kaXN0L2VzMjAxNS9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L3V0aWxzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L0NvbWJpbmF0aW9uLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L1NpZGVFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvVUkuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvYWdncmVzaXZlQ2FwdHVyZS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9oYW5kbGVTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvbWVkaXVtLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L3NpZGVjYXIuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9ob29rLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1zdHlsZS1zaW5nbGV0b24vZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9zaW5nbGV0b24uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvYXNzaWduUmVmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2UtY2FsbGJhY2stcmVmL2Rpc3QvZXMyMDE1L3VzZU1lcmdlUmVmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2UtY2FsbGJhY2stcmVmL2Rpc3QvZXMyMDE1L3VzZVJlZi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLXNpZGVjYXIvZGlzdC9lczIwMTUvZXhwb3J0cy5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLXNpZGVjYXIvZGlzdC9lczIwMTUvbWVkaXVtLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcHJpbWl0aXZlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtY29udGV4dC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWRpYWxvZy9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWRpYWxvZy9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXNsb3QvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1kaXNtaXNzYWJsZS1sYXllci9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWZvY3VzLWd1YXJkcy9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWZvY3VzLXNjb3BlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtaWQvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1wb3J0YWwvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1wcmVzZW5jZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZS9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXNsb3QvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1lZmZlY3QtZXZlbnQvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtZXNjYXBlLWtleWRvd24vZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ2V0RGVmYXVsdFBhcmVudCA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgc2FtcGxlVGFyZ2V0ID0gQXJyYXkuaXNBcnJheShvcmlnaW5hbFRhcmdldCkgPyBvcmlnaW5hbFRhcmdldFswXSA6IG9yaWdpbmFsVGFyZ2V0O1xuICAgIHJldHVybiBzYW1wbGVUYXJnZXQub3duZXJEb2N1bWVudC5ib2R5O1xufTtcbnZhciBjb3VudGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbnZhciB1bmNvbnRyb2xsZWROb2RlcyA9IG5ldyBXZWFrTWFwKCk7XG52YXIgbWFya2VyTWFwID0ge307XG52YXIgbG9ja0NvdW50ID0gMDtcbnZhciB1bndyYXBIb3N0ID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZSAmJiAobm9kZS5ob3N0IHx8IHVud3JhcEhvc3Qobm9kZS5wYXJlbnROb2RlKSk7XG59O1xudmFyIGNvcnJlY3RUYXJnZXRzID0gZnVuY3Rpb24gKHBhcmVudCwgdGFyZ2V0cykge1xuICAgIHJldHVybiB0YXJnZXRzXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBpZiAocGFyZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvcnJlY3RlZFRhcmdldCA9IHVud3JhcEhvc3QodGFyZ2V0KTtcbiAgICAgICAgaWYgKGNvcnJlY3RlZFRhcmdldCAmJiBwYXJlbnQuY29udGFpbnMoY29ycmVjdGVkVGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvcnJlY3RlZFRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKCdhcmlhLWhpZGRlbicsIHRhcmdldCwgJ2luIG5vdCBjb250YWluZWQgaW5zaWRlJywgcGFyZW50LCAnLiBEb2luZyBub3RoaW5nJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIEJvb2xlYW4oeCk7IH0pO1xufTtcbi8qKlxuICogTWFya3MgZXZlcnl0aGluZyBleGNlcHQgZ2l2ZW4gbm9kZShvciBub2RlcykgYXMgYXJpYS1oaWRkZW5cbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHBhcmFtIHtTdHJpbmd9IFtjb250cm9sQXR0cmlidXRlXSAtIGh0bWwgQXR0cmlidXRlIHRvIGNvbnRyb2xcbiAqIEByZXR1cm4ge1VuZG99IHVuZG8gY29tbWFuZFxuICovXG52YXIgYXBwbHlBdHRyaWJ1dGVUb090aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSwgY29udHJvbEF0dHJpYnV0ZSkge1xuICAgIHZhciB0YXJnZXRzID0gY29ycmVjdFRhcmdldHMocGFyZW50Tm9kZSwgQXJyYXkuaXNBcnJheShvcmlnaW5hbFRhcmdldCkgPyBvcmlnaW5hbFRhcmdldCA6IFtvcmlnaW5hbFRhcmdldF0pO1xuICAgIGlmICghbWFya2VyTWFwW21hcmtlck5hbWVdKSB7XG4gICAgICAgIG1hcmtlck1hcFttYXJrZXJOYW1lXSA9IG5ldyBXZWFrTWFwKCk7XG4gICAgfVxuICAgIHZhciBtYXJrZXJDb3VudGVyID0gbWFya2VyTWFwW21hcmtlck5hbWVdO1xuICAgIHZhciBoaWRkZW5Ob2RlcyA9IFtdO1xuICAgIHZhciBlbGVtZW50c1RvS2VlcCA9IG5ldyBTZXQoKTtcbiAgICB2YXIgZWxlbWVudHNUb1N0b3AgPSBuZXcgU2V0KHRhcmdldHMpO1xuICAgIHZhciBrZWVwID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGlmICghZWwgfHwgZWxlbWVudHNUb0tlZXAuaGFzKGVsKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnRzVG9LZWVwLmFkZChlbCk7XG4gICAgICAgIGtlZXAoZWwucGFyZW50Tm9kZSk7XG4gICAgfTtcbiAgICB0YXJnZXRzLmZvckVhY2goa2VlcCk7XG4gICAgdmFyIGRlZXAgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIGlmICghcGFyZW50IHx8IGVsZW1lbnRzVG9TdG9wLmhhcyhwYXJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChwYXJlbnQuY2hpbGRyZW4sIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudHNUb0tlZXAuaGFzKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgZGVlcChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRyID0gbm9kZS5nZXRBdHRyaWJ1dGUoY29udHJvbEF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbHJlYWR5SGlkZGVuID0gYXR0ciAhPT0gbnVsbCAmJiBhdHRyICE9PSAnZmFsc2UnO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRlclZhbHVlID0gKGNvdW50ZXJNYXAuZ2V0KG5vZGUpIHx8IDApICsgMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcmtlclZhbHVlID0gKG1hcmtlckNvdW50ZXIuZ2V0KG5vZGUpIHx8IDApICsgMTtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlck1hcC5zZXQobm9kZSwgY291bnRlclZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyQ291bnRlci5zZXQobm9kZSwgbWFya2VyVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5Ob2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlclZhbHVlID09PSAxICYmIGFscmVhZHlIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuY29udHJvbGxlZE5vZGVzLnNldChub2RlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWFya2VyVmFsdWUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG1hcmtlck5hbWUsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbHJlYWR5SGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FyaWEtaGlkZGVuOiBjYW5ub3Qgb3BlcmF0ZSBvbiAnLCBub2RlLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgZGVlcChwYXJlbnROb2RlKTtcbiAgICBlbGVtZW50c1RvS2VlcC5jbGVhcigpO1xuICAgIGxvY2tDb3VudCsrO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGhpZGRlbk5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBjb3VudGVyVmFsdWUgPSBjb3VudGVyTWFwLmdldChub2RlKSAtIDE7XG4gICAgICAgICAgICB2YXIgbWFya2VyVmFsdWUgPSBtYXJrZXJDb3VudGVyLmdldChub2RlKSAtIDE7XG4gICAgICAgICAgICBjb3VudGVyTWFwLnNldChub2RlLCBjb3VudGVyVmFsdWUpO1xuICAgICAgICAgICAgbWFya2VyQ291bnRlci5zZXQobm9kZSwgbWFya2VyVmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFjb3VudGVyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXVuY29udHJvbGxlZE5vZGVzLmhhcyhub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMuZGVsZXRlKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtYXJrZXJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG1hcmtlck5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbG9ja0NvdW50LS07XG4gICAgICAgIGlmICghbG9ja0NvdW50KSB7XG4gICAgICAgICAgICAvLyBjbGVhclxuICAgICAgICAgICAgY291bnRlck1hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgICAgICBjb3VudGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIHVuY29udHJvbGxlZE5vZGVzID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIG1hcmtlck1hcCA9IHt9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG4vKipcbiAqIE1hcmtzIGV2ZXJ5dGhpbmcgZXhjZXB0IGdpdmVuIG5vZGUob3Igbm9kZXMpIGFzIGFyaWEtaGlkZGVuXG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBFbGVtZW50W119IG9yaWdpbmFsVGFyZ2V0IC0gZWxlbWVudHMgdG8ga2VlcCBvbiB0aGUgcGFnZVxuICogQHBhcmFtIFtwYXJlbnROb2RlXSAtIHRvcCBlbGVtZW50LCBkZWZhdWx0cyB0byBkb2N1bWVudC5ib2R5XG4gKiBAcGFyYW0ge1N0cmluZ30gW21hcmtlck5hbWVdIC0gYSBzcGVjaWFsIGF0dHJpYnV0ZSB0byBtYXJrIGV2ZXJ5IG5vZGVcbiAqIEByZXR1cm4ge1VuZG99IHVuZG8gY29tbWFuZFxuICovXG5leHBvcnQgdmFyIGhpZGVPdGhlcnMgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpIHtcbiAgICBpZiAobWFya2VyTmFtZSA9PT0gdm9pZCAwKSB7IG1hcmtlck5hbWUgPSAnZGF0YS1hcmlhLWhpZGRlbic7IH1cbiAgICB2YXIgdGFyZ2V0cyA9IEFycmF5LmZyb20oQXJyYXkuaXNBcnJheShvcmlnaW5hbFRhcmdldCkgPyBvcmlnaW5hbFRhcmdldCA6IFtvcmlnaW5hbFRhcmdldF0pO1xuICAgIHZhciBhY3RpdmVQYXJlbnROb2RlID0gcGFyZW50Tm9kZSB8fCBnZXREZWZhdWx0UGFyZW50KG9yaWdpbmFsVGFyZ2V0KTtcbiAgICBpZiAoIWFjdGl2ZVBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH07XG4gICAgfVxuICAgIC8vIHdlIHNob3VsZCBub3QgaGlkZSBhcmlhLWxpdmUgZWxlbWVudHMgLSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L2FyaWEtaGlkZGVuL2lzc3Vlcy8xMFxuICAgIC8vIGFuZCBzY3JpcHQgZWxlbWVudHMsIGFzIHRoZXkgaGF2ZSBubyBpbXBhY3Qgb24gYWNjZXNzaWJpbGl0eS5cbiAgICB0YXJnZXRzLnB1c2guYXBwbHkodGFyZ2V0cywgQXJyYXkuZnJvbShhY3RpdmVQYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWxpdmVdLCBzY3JpcHQnKSkpO1xuICAgIHJldHVybiBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzKHRhcmdldHMsIGFjdGl2ZVBhcmVudE5vZGUsIG1hcmtlck5hbWUsICdhcmlhLWhpZGRlbicpO1xufTtcbi8qKlxuICogTWFya3MgZXZlcnl0aGluZyBleGNlcHQgZ2l2ZW4gbm9kZShvciBub2RlcykgYXMgaW5lcnRcbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgaW5lcnRPdGhlcnMgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpIHtcbiAgICBpZiAobWFya2VyTmFtZSA9PT0gdm9pZCAwKSB7IG1hcmtlck5hbWUgPSAnZGF0YS1pbmVydC1lZCc7IH1cbiAgICB2YXIgYWN0aXZlUGFyZW50Tm9kZSA9IHBhcmVudE5vZGUgfHwgZ2V0RGVmYXVsdFBhcmVudChvcmlnaW5hbFRhcmdldCk7XG4gICAgaWYgKCFhY3RpdmVQYXJlbnROb2RlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9O1xuICAgIH1cbiAgICByZXR1cm4gYXBwbHlBdHRyaWJ1dGVUb090aGVycyhvcmlnaW5hbFRhcmdldCwgYWN0aXZlUGFyZW50Tm9kZSwgbWFya2VyTmFtZSwgJ2luZXJ0Jyk7XG59O1xuLyoqXG4gKiBAcmV0dXJucyBpZiBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgaW5lcnRcbiAqL1xuZXhwb3J0IHZhciBzdXBwb3J0c0luZXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0eXBlb2YgSFRNTEVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIEhUTUxFbGVtZW50LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnaW5lcnQnKTtcbn07XG4vKipcbiAqIEF1dG9tYXRpYyBmdW5jdGlvbiB0byBcInN1cHByZXNzXCIgRE9NIGVsZW1lbnRzIC0gX2hpZGVfIG9yIF9pbmVydF8gaW4gdGhlIGJlc3QgcG9zc2libGUgd2F5XG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBFbGVtZW50W119IG9yaWdpbmFsVGFyZ2V0IC0gZWxlbWVudHMgdG8ga2VlcCBvbiB0aGUgcGFnZVxuICogQHBhcmFtIFtwYXJlbnROb2RlXSAtIHRvcCBlbGVtZW50LCBkZWZhdWx0cyB0byBkb2N1bWVudC5ib2R5XG4gKiBAcGFyYW0ge1N0cmluZ30gW21hcmtlck5hbWVdIC0gYSBzcGVjaWFsIGF0dHJpYnV0ZSB0byBtYXJrIGV2ZXJ5IG5vZGVcbiAqIEByZXR1cm4ge1VuZG99IHVuZG8gY29tbWFuZFxuICovXG5leHBvcnQgdmFyIHN1cHByZXNzT3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lKSB7XG4gICAgaWYgKG1hcmtlck5hbWUgPT09IHZvaWQgMCkgeyBtYXJrZXJOYW1lID0gJ2RhdGEtc3VwcHJlc3NlZCc7IH1cbiAgICByZXR1cm4gKHN1cHBvcnRzSW5lcnQoKSA/IGluZXJ0T3RoZXJzIDogaGlkZU90aGVycykob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpO1xufTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzLCBGcmFnbWVudCBhcyBfRnJhZ21lbnQgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXJjaGl2ZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi91aS9idXR0b24nO1xuaW1wb3J0IHsgRGlhbG9nLCBEaWFsb2dDb250ZW50LCBEaWFsb2dIZWFkZXIsIERpYWxvZ1RpdGxlLCBEaWFsb2dGb290ZXIsIH0gZnJvbSAnLi4vdWkvZGlhbG9nJztcbmltcG9ydCB7IHVzZVRvYXN0IH0gZnJvbSAnLi4vLi4vY29udGV4dHMvVG9hc3RDb250ZXh0JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vbGliL2FwaSc7XG4vKipcbiAqIEFyY2hpdmVCdXR0b24gQ29tcG9uZW50XG4gKlxuICogQSByZXVzYWJsZSBidXR0b24gY29tcG9uZW50IGZvciBhcmNoaXZpbmcgaXRlbXMgd2l0aCBjb25maXJtYXRpb24gZGlhbG9nLlxuICogUmVwbGFjZXMgZGVsZXRlIGJ1dHRvbnMgdGhyb3VnaG91dCB0aGUgYXBwbGljYXRpb24gd2l0aCBhcmNoaXZlIHRlcm1pbm9sb2d5LlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBBcmNoaXZlIGljb24gaW5zdGVhZCBvZiB0cmFzaCBpY29uXG4gKiAtIENvbmZpcm1hdGlvbiBkaWFsb2cgd2l0aCBcIkFyY2hpdmVcIiB0ZXJtaW5vbG9neVxuICogLSBDYWxscyBERUxFVEUgZW5kcG9pbnQgKHdoaWNoIHBlcmZvcm1zIHNvZnQgZGVsZXRlKVxuICogLSBTdWNjZXNzL2Vycm9yIHRvYXN0IG5vdGlmaWNhdGlvbnNcbiAqIC0gTG9hZGluZyBzdGF0ZSBkdXJpbmcgYXJjaGl2ZSBvcGVyYXRpb25cbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiAyLjEsIDIuMiwgMi4zLCAyLjVcbiAqL1xuY29uc3QgQXJjaGl2ZUJ1dHRvbiA9ICh7IGl0ZW1UeXBlLCBpdGVtSWQsIGl0ZW1OYW1lLCBvbkFyY2hpdmVTdWNjZXNzLCB2YXJpYW50ID0gJ291dGxpbmUnLCBzaXplID0gJ3NtJywgY2xhc3NOYW1lID0gJycsIGljb25Pbmx5ID0gZmFsc2UsIH0pID0+IHtcbiAgICBjb25zdCBbaXNEaWFsb2dPcGVuLCBzZXRJc0RpYWxvZ09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtpc0FyY2hpdmluZywgc2V0SXNBcmNoaXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHsgc2hvd1RvYXN0IH0gPSB1c2VUb2FzdCgpO1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhcmNoaXZlIGJ1dHRvbiBjbGljayAtIG9wZW5zIGNvbmZpcm1hdGlvbiBkaWFsb2dcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVBcmNoaXZlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldElzRGlhbG9nT3Blbih0cnVlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhcmNoaXZlIGNvbmZpcm1hdGlvblxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUNvbmZpcm1BcmNoaXZlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRJc0FyY2hpdmluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIERFTEVURSBlbmRwb2ludCB3aGljaCBwZXJmb3JtcyBzb2Z0IGRlbGV0ZVxuICAgICAgICAgICAgYXdhaXQgYXBpLmRlbGV0ZShgLyR7aXRlbVR5cGV9LyR7aXRlbUlkfWApO1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgYCR7Z2V0SXRlbVR5cGVOYW1lKGl0ZW1UeXBlKX0gYXJjaGl2ZWQgc3VjY2Vzc2Z1bGx5YCk7XG4gICAgICAgICAgICAvLyBDbG9zZSBkaWFsb2dcbiAgICAgICAgICAgIHNldElzRGlhbG9nT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAvLyBDYWxsIHN1Y2Nlc3MgY2FsbGJhY2sgaWYgcHJvdmlkZWRcbiAgICAgICAgICAgIGlmIChvbkFyY2hpdmVTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgb25BcmNoaXZlU3VjY2VzcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgYEZhaWxlZCB0byBhcmNoaXZlICR7Z2V0SXRlbVR5cGVOYW1lKGl0ZW1UeXBlKS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzQXJjaGl2aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGRpYWxvZyBjbG9zZVxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUNsb3NlRGlhbG9nID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWlzQXJjaGl2aW5nKSB7XG4gICAgICAgICAgICBzZXRJc0RpYWxvZ09wZW4oZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgaHVtYW4tcmVhZGFibGUgaXRlbSB0eXBlIG5hbWVcbiAgICAgKi9cbiAgICBjb25zdCBnZXRJdGVtVHlwZU5hbWUgPSAodHlwZSkgPT4ge1xuICAgICAgICBjb25zdCB0eXBlTWFwID0ge1xuICAgICAgICAgICAgJ21lbWJlcnMnOiAnTWVtYmVyJyxcbiAgICAgICAgICAgICdldmVudHMnOiAnRXZlbnQnLFxuICAgICAgICAgICAgJ2xlYWRlcnNoaXAnOiAnTGVhZGVyc2hpcCcsXG4gICAgICAgICAgICAnc21hbGwtZ3JvdXBzJzogJ1NtYWxsIEdyb3VwJyxcbiAgICAgICAgICAgICdvZmZlcmluZ3MnOiAnT2ZmZXJpbmcnLFxuICAgICAgICAgICAgJ2V4cGVuc2VzJzogJ0V4cGVuc2UnLFxuICAgICAgICAgICAgJ2J1ZGdldHMnOiAnQnVkZ2V0JyxcbiAgICAgICAgICAgICdwbGVkZ2VzJzogJ1BsZWRnZScsXG4gICAgICAgICAgICAnZnVuZHMnOiAnRnVuZCcsXG4gICAgICAgICAgICAndmVuZG9ycyc6ICdWZW5kb3InLFxuICAgICAgICAgICAgJ2V4cGVuc2UtY2F0ZWdvcmllcyc6ICdFeHBlbnNlIENhdGVnb3J5JyxcbiAgICAgICAgICAgICdvZmZlcmluZy10eXBlcyc6ICdPZmZlcmluZyBUeXBlJyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHR5cGVNYXBbdHlwZV0gfHwgJ0l0ZW0nO1xuICAgIH07XG4gICAgcmV0dXJuIChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4cyhCdXR0b24sIHsgdmFyaWFudDogdmFyaWFudCwgc2l6ZTogc2l6ZSwgb25DbGljazogaGFuZGxlQXJjaGl2ZUNsaWNrLCBjbGFzc05hbWU6IGNsYXNzTmFtZSwgdGl0bGU6IFwiQXJjaGl2ZVwiLCBjaGlsZHJlbjogW19qc3goQXJjaGl2ZSwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCAhaWNvbk9ubHkgJiYgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwibWwtMlwiLCBjaGlsZHJlbjogXCJBcmNoaXZlXCIgfSldIH0pLCBfanN4KERpYWxvZywgeyBvcGVuOiBpc0RpYWxvZ09wZW4sIG9uT3BlbkNoYW5nZTogaGFuZGxlQ2xvc2VEaWFsb2csIGNoaWxkcmVuOiBfanN4cyhEaWFsb2dDb250ZW50LCB7IGNsYXNzTmFtZTogXCJtYXgtdy1tZFwiLCBjaGlsZHJlbjogW19qc3goRGlhbG9nSGVhZGVyLCB7IGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTEwIGgtMTAgcm91bmRlZC1mdWxsIGJnLW9yYW5nZS0xMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgY2hpbGRyZW46IF9qc3goQXJjaGl2ZSwgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LW9yYW5nZS02MDBcIiB9KSB9KSwgX2pzeHMoRGlhbG9nVGl0bGUsIHsgY2hpbGRyZW46IFtcIkFyY2hpdmUgXCIsIGdldEl0ZW1UeXBlTmFtZShpdGVtVHlwZSldIH0pXSB9KSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweS00XCIsIGNoaWxkcmVuOiBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LWdyYXktNzAwXCIsIGNoaWxkcmVuOiBbXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gYXJjaGl2ZVwiLCAnICcsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtc2VtaWJvbGRcIiwgY2hpbGRyZW46IGl0ZW1OYW1lIH0pLCBcIj8gVGhpcyBpdGVtIHdpbGwgYmUgbW92ZWQgdG8gdGhlIGFyY2hpdmUgYW5kIGNhbiBiZSByZXN0b3JlZCBsYXRlciBieSBhbiBhZG1pbmlzdHJhdG9yLlwiXSB9KSB9KSwgX2pzeHMoRGlhbG9nRm9vdGVyLCB7IGNoaWxkcmVuOiBbX2pzeChCdXR0b24sIHsgdHlwZTogXCJidXR0b25cIiwgdmFyaWFudDogXCJvdXRsaW5lXCIsIG9uQ2xpY2s6IGhhbmRsZUNsb3NlRGlhbG9nLCBkaXNhYmxlZDogaXNBcmNoaXZpbmcsIGNoaWxkcmVuOiBcIkNhbmNlbFwiIH0pLCBfanN4KEJ1dHRvbiwgeyB0eXBlOiBcImJ1dHRvblwiLCB2YXJpYW50OiBcImRlZmF1bHRcIiwgb25DbGljazogaGFuZGxlQ29uZmlybUFyY2hpdmUsIGRpc2FibGVkOiBpc0FyY2hpdmluZywgY2xhc3NOYW1lOiBcImJnLW9yYW5nZS02MDAgaG92ZXI6Ymctb3JhbmdlLTcwMFwiLCBjaGlsZHJlbjogaXNBcmNoaXZpbmcgPyAnQXJjaGl2aW5nLi4uJyA6IGBBcmNoaXZlICR7Z2V0SXRlbVR5cGVOYW1lKGl0ZW1UeXBlKX1gIH0pXSB9KV0gfSkgfSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBBcmNoaXZlQnV0dG9uO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nQ29udGVudCwgRGlhbG9nSGVhZGVyLCBEaWFsb2dUaXRsZSwgRGlhbG9nRm9vdGVyLCBEaWFsb2dEZXNjcmlwdGlvbiwgfSBmcm9tICcuLi91aS9kaWFsb2cnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vdWkvYnV0dG9uJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi4vdWkvaW5wdXQnO1xuaW1wb3J0IHsgQ2hlY2tDaXJjbGUgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuLyoqXG4gKiBDb21wbGV0ZUV2ZW50RGlhbG9nIENvbXBvbmVudFxuICpcbiAqIERpYWxvZyBmb3IgbWFya2luZyBhbiBldmVudCBhcyBjb21wbGV0ZWQgYW5kIHJlY29yZGluZyBhdHRlbmRhbmNlLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBJbnB1dCBmaWVsZCBmb3IgYXR0ZW5kYW5jZSBjb3VudFxuICogLSBWYWxpZGF0aW9uIGZvciBhdHRlbmRhbmNlIGNvdW50IChtdXN0IGJlID49IDApXG4gKiAtIENhbmNlbCBhbmQgQ29tcGxldGUgYnV0dG9uc1xuICpcbiAqIFZhbGlkYXRlcyBSZXF1aXJlbWVudHM6IDkuNFxuICovXG5jb25zdCBDb21wbGV0ZUV2ZW50RGlhbG9nID0gKHsgaXNPcGVuLCBvbkNsb3NlLCBvbkNvbmZpcm0sIGV2ZW50VGl0bGUsIH0pID0+IHtcbiAgICBjb25zdCBbYXR0ZW5kYW5jZUNvdW50LCBzZXRBdHRlbmRhbmNlQ291bnRdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtpc1N1Ym1pdHRpbmcsIHNldElzU3VibWl0dGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgLyoqXG4gICAgICogUmVzZXQgZm9ybSB3aGVuIGRpYWxvZyBvcGVucy9jbG9zZXNcbiAgICAgKi9cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICBzZXRBdHRlbmRhbmNlQ291bnQoJycpO1xuICAgICAgICAgICAgc2V0RXJyb3IoJycpO1xuICAgICAgICB9XG4gICAgfSwgW2lzT3Blbl0pO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGF0dGVuZGFuY2UgY291bnRcbiAgICAgKi9cbiAgICBjb25zdCB2YWxpZGF0ZUF0dGVuZGFuY2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gcGFyc2VJbnQoYXR0ZW5kYW5jZUNvdW50LCAxMCk7XG4gICAgICAgIGlmIChhdHRlbmRhbmNlQ291bnQgPT09ICcnIHx8IGlzTmFOKGNvdW50KSkge1xuICAgICAgICAgICAgc2V0RXJyb3IoJ0F0dGVuZGFuY2UgY291bnQgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQgPCAwKSB7XG4gICAgICAgICAgICBzZXRFcnJvcignQXR0ZW5kYW5jZSBjb3VudCBtdXN0IGJlIDAgb3IgZ3JlYXRlcicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGZvcm0gc3VibWlzc2lvblxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0ZUF0dGVuZGFuY2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNldElzU3VibWl0dGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IG9uQ29uZmlybShwYXJzZUludChhdHRlbmRhbmNlQ291bnQsIDEwKSk7XG4gICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBFcnJvciBpcyBoYW5kbGVkIGJ5IHBhcmVudCBjb21wb25lbnRcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzU3VibWl0dGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBpbnB1dCBjaGFuZ2VcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICBzZXRBdHRlbmRhbmNlQ291bnQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNldEVycm9yKCcnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChfanN4KERpYWxvZywgeyBvcGVuOiBpc09wZW4sIG9uT3BlbkNoYW5nZTogb25DbG9zZSwgY2hpbGRyZW46IF9qc3hzKERpYWxvZ0NvbnRlbnQsIHsgY2xhc3NOYW1lOiBcIm1heC13LW1kXCIsIGNoaWxkcmVuOiBbX2pzeHMoRGlhbG9nSGVhZGVyLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgbWItMlwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMCB3LTEwIGgtMTAgcm91bmRlZC1mdWxsIGJnLWdyZWVuLTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLCBjaGlsZHJlbjogX2pzeChDaGVja0NpcmNsZSwgeyBjbGFzc05hbWU6IFwiaC01IHctNSB0ZXh0LWdyZWVuLTYwMFwiIH0pIH0pLCBfanN4KERpYWxvZ1RpdGxlLCB7IGNoaWxkcmVuOiBcIk1hcmsgRXZlbnQgYXMgQ29tcGxldGVkXCIgfSldIH0pLCBfanN4cyhEaWFsb2dEZXNjcmlwdGlvbiwgeyBjaGlsZHJlbjogW1wiTWFyayBcXFwiXCIsIGV2ZW50VGl0bGUsIFwiXFxcIiBhcyBjb21wbGV0ZWQgYW5kIHJlY29yZCB0aGUgYXR0ZW5kYW5jZSBjb3VudC5cIl0gfSldIH0pLCBfanN4cyhcImZvcm1cIiwgeyBvblN1Ym1pdDogaGFuZGxlU3VibWl0LCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInB5LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJhdHRlbmRhbmNlXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMlwiLCBjaGlsZHJlbjogW1wiQXR0ZW5kYW5jZSBDb3VudCBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwiYXR0ZW5kYW5jZVwiLCBuYW1lOiBcImF0dGVuZGFuY2VcIiwgdHlwZTogXCJudW1iZXJcIiwgbWluOiBcIjBcIiwgcGxhY2Vob2xkZXI6IFwiZS5nLiwgMTUwXCIsIHZhbHVlOiBhdHRlbmRhbmNlQ291bnQsIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3IgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGF1dG9Gb2N1czogdHJ1ZSB9KSwgZXJyb3IgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9yIH0pKV0gfSksIF9qc3hzKERpYWxvZ0Zvb3RlciwgeyBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiBvbkNsb3NlLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBjaGlsZHJlbjogXCJDYW5jZWxcIiB9KSwgX2pzeChCdXR0b24sIHsgdHlwZTogXCJzdWJtaXRcIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2hpbGRyZW46IGlzU3VibWl0dGluZyA/ICdDb21wbGV0aW5nLi4uJyA6ICdNYXJrIGFzIENvbXBsZXRlZCcgfSldIH0pXSB9KV0gfSkgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IENvbXBsZXRlRXZlbnREaWFsb2c7XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nQ29udGVudCwgRGlhbG9nSGVhZGVyLCBEaWFsb2dUaXRsZSwgRGlhbG9nRm9vdGVyLCB9IGZyb20gJy4uL3VpL2RpYWxvZyc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi91aS9idXR0b24nO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuLi91aS9pbnB1dCc7XG4vKipcbiAqIEV2ZW50Rm9ybSBDb21wb25lbnRcbiAqXG4gKiBGb3JtIGZvciBhZGRpbmcgb3IgZWRpdGluZyBjaHVyY2ggZXZlbnRzLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBJbnB1dCBmaWVsZHMgZm9yIHRpdGxlLCBkYXRlLCB0aW1lLCBsb2NhdGlvbiwgZGVzY3JpcHRpb25cbiAqIC0gRm9ybSB2YWxpZGF0aW9uIHdpdGggaW5saW5lIGVycm9yIG1lc3NhZ2VzXG4gKiAtIFN1cHBvcnQgZm9yIGJvdGggY3JlYXRlIGFuZCBlZGl0IG1vZGVzXG4gKlxuICogVmFsaWRhdGVzIFJlcXVpcmVtZW50czogOS4xXG4gKi9cbmNvbnN0IEV2ZW50Rm9ybSA9ICh7IGlzT3Blbiwgb25DbG9zZSwgb25TdWJtaXQsIGV2ZW50ID0gbnVsbCwgaXNMb2FkaW5nID0gZmFsc2UsIH0pID0+IHtcbiAgICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgIGV2ZW50X2RhdGU6ICcnLFxuICAgICAgICBldmVudF90aW1lOiAnJyxcbiAgICAgICAgbG9jYXRpb246ICcnLFxuICAgIH0pO1xuICAgIGNvbnN0IFtlcnJvcnMsIHNldEVycm9yc10gPSB1c2VTdGF0ZSh7fSk7XG4gICAgY29uc3QgW2lzU3VibWl0dGluZywgc2V0SXNTdWJtaXR0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGZvcm0gZGF0YSB3aGVuIGV2ZW50IHByb3AgY2hhbmdlc1xuICAgICAqL1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgc2V0Rm9ybURhdGEoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBldmVudC50aXRsZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZXZlbnQuZGVzY3JpcHRpb24gfHwgJycsXG4gICAgICAgICAgICAgICAgZXZlbnRfZGF0ZTogZXZlbnQuZXZlbnRfZGF0ZS5zcGxpdCgnVCcpWzBdLFxuICAgICAgICAgICAgICAgIGV2ZW50X3RpbWU6IGV2ZW50LmV2ZW50X3RpbWUuc3Vic3RyaW5nKDAsIDUpLCAvLyBISDptbSBmb3JtYXRcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogZXZlbnQubG9jYXRpb24sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlc2V0IGZvcm0gZm9yIG5ldyBldmVudFxuICAgICAgICAgICAgc2V0Rm9ybURhdGEoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgICAgICAgICAgZXZlbnRfZGF0ZTogJycsXG4gICAgICAgICAgICAgICAgZXZlbnRfdGltZTogJycsXG4gICAgICAgICAgICAgICAgbG9jYXRpb246ICcnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RXJyb3JzKHt9KTtcbiAgICB9LCBbZXZlbnQsIGlzT3Blbl0pO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGZvcm0gZGF0YVxuICAgICAqL1xuICAgIGNvbnN0IHZhbGlkYXRlRm9ybSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3RXJyb3JzID0ge307XG4gICAgICAgIC8vIFJlcXVpcmVkIGZpZWxkc1xuICAgICAgICBpZiAoIWZvcm1EYXRhLnRpdGxlLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLnRpdGxlID0gJ1RpdGxlIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtRGF0YS50aXRsZS5sZW5ndGggPiAyMDApIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy50aXRsZSA9ICdUaXRsZSBtdXN0IGJlIDIwMCBjaGFyYWN0ZXJzIG9yIGxlc3MnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEuZXZlbnRfZGF0ZSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmV2ZW50X2RhdGUgPSAnRGF0ZSBpcyByZXF1aXJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5ldmVudF90aW1lKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMuZXZlbnRfdGltZSA9ICdUaW1lIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLmxvY2F0aW9uLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmxvY2F0aW9uID0gJ0xvY2F0aW9uIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtRGF0YS5sb2NhdGlvbi5sZW5ndGggPiAyMDApIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5sb2NhdGlvbiA9ICdMb2NhdGlvbiBtdXN0IGJlIDIwMCBjaGFyYWN0ZXJzIG9yIGxlc3MnO1xuICAgICAgICB9XG4gICAgICAgIHNldEVycm9ycyhuZXdFcnJvcnMpO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobmV3RXJyb3JzKS5sZW5ndGggPT09IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZS50YXJnZXQ7XG4gICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIFtuYW1lXTogdmFsdWUsXG4gICAgICAgIH0pKTtcbiAgICAgICAgLy8gQ2xlYXIgZXJyb3IgZm9yIHRoaXMgZmllbGQgd2hlbiB1c2VyIHN0YXJ0cyB0eXBpbmdcbiAgICAgICAgaWYgKGVycm9yc1tuYW1lXSkge1xuICAgICAgICAgICAgc2V0RXJyb3JzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgW25hbWVdOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBmb3JtIHN1Ym1pc3Npb25cbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICghdmFsaWRhdGVGb3JtKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGb3JtIHZhbGlkYXRpb24gZmFpbGVkJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQWRkIHN0YXR1cyBmaWVsZCBmb3IgbmV3IGV2ZW50cyAoZGVmYXVsdCB0byAndXBjb21pbmcnKVxuICAgICAgICAgICAgY29uc3Qgc3VibWl0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAuLi5mb3JtRGF0YSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGV2ZW50Py5zdGF0dXMgfHwgJ3VwY29taW5nJyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXZlbnRGb3JtIHN1Ym1pdHRpbmcgZGF0YTonLCBzdWJtaXREYXRhKTtcbiAgICAgICAgICAgIGF3YWl0IG9uU3VibWl0KHN1Ym1pdERhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0V2ZW50Rm9ybSBzdWJtaXNzaW9uIHN1Y2Nlc3NmdWwsIGNsb3NpbmcgZm9ybScpO1xuICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXZlbnRGb3JtIHN1Ym1pc3Npb24gZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcmVzcG9uc2UgZGF0YTonLCBlcnJvci5yZXNwb25zZT8uZGF0YSk7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VydmVyLXNpZGUgdmFsaWRhdGlvbiBlcnJvcnNcbiAgICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZT8uZGF0YT8uZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3JzKGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNob3cgYWxlcnQgd2l0aCBlcnJvciBkZXRhaWxzXG4gICAgICAgICAgICBhbGVydCgnRXJyb3IgY3JlYXRpbmcgZXZlbnQ6ICcgKyAoZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgICAgLy8gRG9uJ3QgY2xvc2UgdGhlIGZvcm0gaWYgdGhlcmUncyBhbiBlcnJvclxuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChfanN4KERpYWxvZywgeyBvcGVuOiBpc09wZW4sIG9uT3BlbkNoYW5nZTogKG9wZW4pID0+IHtcbiAgICAgICAgICAgIGlmICghb3BlbiAmJiAhaXNTdWJtaXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjaGlsZHJlbjogX2pzeHMoRGlhbG9nQ29udGVudCwgeyBjbGFzc05hbWU6IFwibWF4LXctMnhsIG1heC1oLVs5MHZoXSBvdmVyZmxvdy15LWF1dG9cIiwgY2hpbGRyZW46IFtfanN4KERpYWxvZ0hlYWRlciwgeyBjaGlsZHJlbjogX2pzeChEaWFsb2dUaXRsZSwgeyBjaGlsZHJlbjogZXZlbnQgPyAnRWRpdCBFdmVudCcgOiAnQWRkIE5ldyBFdmVudCcgfSkgfSksIF9qc3hzKFwiZm9ybVwiLCB7IG9uU3VibWl0OiBoYW5kbGVTdWJtaXQsIGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwidGl0bGVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJUaXRsZSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwidGl0bGVcIiwgbmFtZTogXCJ0aXRsZVwiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiZS5nLiwgU3VuZGF5IFNlcnZpY2UsIFlvdXRoIE5pZ2h0XCIsIHZhbHVlOiBmb3JtRGF0YS50aXRsZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMudGl0bGUgPyAnYm9yZGVyLXJlZC01MDAnIDogJycsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfSksIGVycm9ycy50aXRsZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLnRpdGxlIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwiZXZlbnRfZGF0ZVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkRhdGUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcImV2ZW50X2RhdGVcIiwgbmFtZTogXCJldmVudF9kYXRlXCIsIHR5cGU6IFwiZGF0ZVwiLCB2YWx1ZTogZm9ybURhdGEuZXZlbnRfZGF0ZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMuZXZlbnRfZGF0ZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZyB9KSwgZXJyb3JzLmV2ZW50X2RhdGUgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5ldmVudF9kYXRlIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJldmVudF90aW1lXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiVGltZSBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwiZXZlbnRfdGltZVwiLCBuYW1lOiBcImV2ZW50X3RpbWVcIiwgdHlwZTogXCJ0aW1lXCIsIHZhbHVlOiBmb3JtRGF0YS5ldmVudF90aW1lLCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IGVycm9ycy5ldmVudF90aW1lID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMuZXZlbnRfdGltZSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmV2ZW50X3RpbWUgfSkpXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJsb2NhdGlvblwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkxvY2F0aW9uIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJsb2NhdGlvblwiLCBuYW1lOiBcImxvY2F0aW9uXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJlLmcuLCBNYWluIFNhbmN0dWFyeSwgWW91dGggSGFsbFwiLCB2YWx1ZTogZm9ybURhdGEubG9jYXRpb24sIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmxvY2F0aW9uID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMubG9jYXRpb24gJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5sb2NhdGlvbiB9KSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJkZXNjcmlwdGlvblwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiRGVzY3JpcHRpb25cIiB9KSwgX2pzeChcInRleHRhcmVhXCIsIHsgaWQ6IFwiZGVzY3JpcHRpb25cIiwgbmFtZTogXCJkZXNjcmlwdGlvblwiLCByb3dzOiA0LCB2YWx1ZTogZm9ybURhdGEuZGVzY3JpcHRpb24sIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWlucHV0IGJnLWJhY2tncm91bmQgcHgtMyBweS0yIHRleHQtc20gcmluZy1vZmZzZXQtYmFja2dyb3VuZCBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcmluZyBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTJcIiwgcGxhY2Vob2xkZXI6IFwiQnJpZWYgZGVzY3JpcHRpb24gb2YgdGhlIGV2ZW50Li4uXCIsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfSksIGVycm9ycy5kZXNjcmlwdGlvbiAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmRlc2NyaXB0aW9uIH0pKV0gfSksIF9qc3hzKERpYWxvZ0Zvb3RlciwgeyBjbGFzc05hbWU6IFwibXQtNlwiLCBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHR5cGU6IFwiYnV0dG9uXCIsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhbmNlbCBidXR0b24gY2xpY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGNoaWxkcmVuOiBcIkNhbmNlbFwiIH0pLCBfanN4KEJ1dHRvbiwgeyB0eXBlOiBcInN1Ym1pdFwiLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIHx8IGlzTG9hZGluZywgb25DbGljazogKCkgPT4gY29uc29sZS5sb2coJ1N1Ym1pdCBidXR0b24gY2xpY2tlZCcpLCBjaGlsZHJlbjogaXNTdWJtaXR0aW5nID8gJ1NhdmluZy4uLicgOiBldmVudCA/ICdVcGRhdGUgRXZlbnQnIDogJ0FkZCBFdmVudCcgfSldIH0pXSB9KV0gfSkgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEV2ZW50Rm9ybTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIERpYWxvZ1ByaW1pdGl2ZSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWRpYWxvZ1wiO1xuaW1wb3J0IHsgWCB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IGNuIH0gZnJvbSBcIi4uLy4uL2xpYi91dGlsc1wiO1xuY29uc3QgRGlhbG9nID0gRGlhbG9nUHJpbWl0aXZlLlJvb3Q7XG5jb25zdCBEaWFsb2dUcmlnZ2VyID0gRGlhbG9nUHJpbWl0aXZlLlRyaWdnZXI7XG5jb25zdCBEaWFsb2dQb3J0YWwgPSBEaWFsb2dQcmltaXRpdmUuUG9ydGFsO1xuY29uc3QgRGlhbG9nQ2xvc2UgPSBEaWFsb2dQcmltaXRpdmUuQ2xvc2U7XG5jb25zdCBEaWFsb2dPdmVybGF5ID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0sIHJlZikgPT4gKF9qc3goRGlhbG9nUHJpbWl0aXZlLk92ZXJsYXksIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJmaXhlZCBpbnNldC0wIHotNTAgYmctYmFja2dyb3VuZC84MCBiYWNrZHJvcC1ibHVyLXNtIGRhdGEtW3N0YXRlPW9wZW5dOmFuaW1hdGUtaW4gZGF0YS1bc3RhdGU9Y2xvc2VkXTphbmltYXRlLW91dCBkYXRhLVtzdGF0ZT1jbG9zZWRdOmZhZGUtb3V0LTAgZGF0YS1bc3RhdGU9b3Blbl06ZmFkZS1pbi0wXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKSk7XG5EaWFsb2dPdmVybGF5LmRpc3BsYXlOYW1lID0gRGlhbG9nUHJpbWl0aXZlLk92ZXJsYXkuZGlzcGxheU5hbWU7XG5jb25zdCBEaWFsb2dDb250ZW50ID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4cyhEaWFsb2dQb3J0YWwsIHsgY2hpbGRyZW46IFtfanN4KERpYWxvZ092ZXJsYXksIHt9KSwgX2pzeHMoRGlhbG9nUHJpbWl0aXZlLkNvbnRlbnQsIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJmaXhlZCBsZWZ0LVs1MCVdIHRvcC1bNTAlXSB6LTUwIGdyaWQgdy1mdWxsIG1heC13LWxnIHRyYW5zbGF0ZS14LVstNTAlXSB0cmFuc2xhdGUteS1bLTUwJV0gZ2FwLTQgYm9yZGVyIGJnLWJhY2tncm91bmQgcC02IHNoYWRvdy1sZyBkdXJhdGlvbi0yMDAgZGF0YS1bc3RhdGU9b3Blbl06YW5pbWF0ZS1pbiBkYXRhLVtzdGF0ZT1jbG9zZWRdOmFuaW1hdGUtb3V0IGRhdGEtW3N0YXRlPWNsb3NlZF06ZmFkZS1vdXQtMCBkYXRhLVtzdGF0ZT1vcGVuXTpmYWRlLWluLTAgZGF0YS1bc3RhdGU9Y2xvc2VkXTp6b29tLW91dC05NSBkYXRhLVtzdGF0ZT1vcGVuXTp6b29tLWluLTk1IGRhdGEtW3N0YXRlPWNsb3NlZF06c2xpZGUtb3V0LXRvLWxlZnQtMS8yIGRhdGEtW3N0YXRlPWNsb3NlZF06c2xpZGUtb3V0LXRvLXRvcC1bNDglXSBkYXRhLVtzdGF0ZT1vcGVuXTpzbGlkZS1pbi1mcm9tLWxlZnQtMS8yIGRhdGEtW3N0YXRlPW9wZW5dOnNsaWRlLWluLWZyb20tdG9wLVs0OCVdIHNtOnJvdW5kZWQtbGcgbWF4LWgtWzkwdmhdIG92ZXJmbG93LXktYXV0b1wiLCBjbGFzc05hbWUpLCAuLi5wcm9wcywgY2hpbGRyZW46IFtjaGlsZHJlbiwgX2pzeHMoRGlhbG9nUHJpbWl0aXZlLkNsb3NlLCB7IGNsYXNzTmFtZTogXCJhYnNvbHV0ZSByaWdodC00IHRvcC00IHJvdW5kZWQtc20gb3BhY2l0eS03MCByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIHRyYW5zaXRpb24tb3BhY2l0eSBob3ZlcjpvcGFjaXR5LTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcmluZyBmb2N1czpyaW5nLW9mZnNldC0yIGRpc2FibGVkOnBvaW50ZXItZXZlbnRzLW5vbmUgZGF0YS1bc3RhdGU9b3Blbl06YmctYWNjZW50IGRhdGEtW3N0YXRlPW9wZW5dOnRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiLCBjaGlsZHJlbjogW19qc3goWCwgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJzci1vbmx5XCIsIGNoaWxkcmVuOiBcIkNsb3NlXCIgfSldIH0pXSB9KV0gfSkpKTtcbkRpYWxvZ0NvbnRlbnQuZGlzcGxheU5hbWUgPSBEaWFsb2dQcmltaXRpdmUuQ29udGVudC5kaXNwbGF5TmFtZTtcbmNvbnN0IERpYWxvZ0hlYWRlciA9ICh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSkgPT4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNuKFwiZmxleCBmbGV4LWNvbCBzcGFjZS15LTEuNSB0ZXh0LWNlbnRlciBzbTp0ZXh0LWxlZnRcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpO1xuRGlhbG9nSGVhZGVyLmRpc3BsYXlOYW1lID0gXCJEaWFsb2dIZWFkZXJcIjtcbmNvbnN0IERpYWxvZ0Zvb3RlciA9ICh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSkgPT4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNuKFwiZmxleCBmbGV4LWNvbC1yZXZlcnNlIHNtOmZsZXgtcm93IHNtOmp1c3RpZnktZW5kIHNtOnNwYWNlLXgtMlwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSk7XG5EaWFsb2dGb290ZXIuZGlzcGxheU5hbWUgPSBcIkRpYWxvZ0Zvb3RlclwiO1xuY29uc3QgRGlhbG9nVGl0bGUgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeChEaWFsb2dQcmltaXRpdmUuVGl0bGUsIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgbGVhZGluZy1ub25lIHRyYWNraW5nLXRpZ2h0XCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKSk7XG5EaWFsb2dUaXRsZS5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5UaXRsZS5kaXNwbGF5TmFtZTtcbmNvbnN0IERpYWxvZ0Rlc2NyaXB0aW9uID0gUmVhY3QuZm9yd2FyZFJlZigoeyBjbGFzc05hbWUsIC4uLnByb3BzIH0sIHJlZikgPT4gKF9qc3goRGlhbG9nUHJpbWl0aXZlLkRlc2NyaXB0aW9uLCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwidGV4dC1zbSB0ZXh0LW11dGVkLWZvcmVncm91bmRcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpKTtcbkRpYWxvZ0Rlc2NyaXB0aW9uLmRpc3BsYXlOYW1lID0gRGlhbG9nUHJpbWl0aXZlLkRlc2NyaXB0aW9uLmRpc3BsYXlOYW1lO1xuZXhwb3J0IHsgRGlhbG9nLCBEaWFsb2dQb3J0YWwsIERpYWxvZ092ZXJsYXksIERpYWxvZ0Nsb3NlLCBEaWFsb2dUcmlnZ2VyLCBEaWFsb2dDb250ZW50LCBEaWFsb2dIZWFkZXIsIERpYWxvZ0Zvb3RlciwgRGlhbG9nVGl0bGUsIERpYWxvZ0Rlc2NyaXB0aW9uLCB9O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY24gfSBmcm9tIFwiLi4vLi4vbGliL3V0aWxzXCI7XG5jb25zdCBJbnB1dCA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCB0eXBlLCAuLi5wcm9wcyB9LCByZWYpID0+IHtcbiAgICByZXR1cm4gKF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IHR5cGUsIGNsYXNzTmFtZTogY24oXCJmbGV4IGgtMTAgdy1mdWxsIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1pbnB1dCBiZy1iYWNrZ3JvdW5kIHB4LTMgcHktMiB0ZXh0LXNtIHJpbmctb2Zmc2V0LWJhY2tncm91bmQgZmlsZTpib3JkZXItMCBmaWxlOmJnLXRyYW5zcGFyZW50IGZpbGU6dGV4dC1zbSBmaWxlOmZvbnQtbWVkaXVtIHBsYWNlaG9sZGVyOnRleHQtbXV0ZWQtZm9yZWdyb3VuZCBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcmluZyBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTIgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkIGRpc2FibGVkOm9wYWNpdHktNTBcIiwgY2xhc3NOYW1lKSwgcmVmOiByZWYsIC4uLnByb3BzIH0pKTtcbn0pO1xuSW5wdXQuZGlzcGxheU5hbWUgPSBcIklucHV0XCI7XG5leHBvcnQgeyBJbnB1dCB9O1xuIiwiaW1wb3J0IGFwaSBmcm9tICcuL2FwaSc7XG4vKipcbiAqIEV2ZW50IEFQSSBjbGllbnRcbiAqXG4gKiBQcm92aWRlcyBtZXRob2RzIGZvciBpbnRlcmFjdGluZyB3aXRoIHRoZSBldmVudHMgQVBJIGVuZHBvaW50cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGV2ZW50QXBpID0ge1xuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZXZlbnRzXG4gICAgICovXG4gICAgYXN5bmMgZ2V0RXZlbnRzKCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9ldmVudHMnKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YSB8fCBbXTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEdldCBhIHNpbmdsZSBldmVudCBieSBJRFxuICAgICAqL1xuICAgIGFzeW5jIGdldEV2ZW50KGlkKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldChgL2V2ZW50cy8ke2lkfWApO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGV2ZW50XG4gICAgICovXG4gICAgYXN5bmMgY3JlYXRlRXZlbnQoZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZXZlbnRBcGkuY3JlYXRlRXZlbnQgY2FsbGVkIHdpdGg6JywgZGF0YSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoJy9ldmVudHMnLCBkYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50QXBpLmNyZWF0ZUV2ZW50IHJlc3BvbnNlOicsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGFuIGV4aXN0aW5nIGV2ZW50XG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlRXZlbnQoaWQsIGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucHV0KGAvZXZlbnRzLyR7aWR9YCwgZGF0YSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBEZWxldGUgYW4gZXZlbnRcbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVFdmVudChpZCkge1xuICAgICAgICBhd2FpdCBhcGkuZGVsZXRlKGAvZXZlbnRzLyR7aWR9YCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBNYXJrIGFuIGV2ZW50IGFzIGNvbXBsZXRlZFxuICAgICAqL1xuICAgIGFzeW5jIGNvbXBsZXRlRXZlbnQoaWQsIGF0dGVuZGFuY2VDb3VudCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoYC9ldmVudHMvJHtpZH0vY29tcGxldGVgLCB7XG4gICAgICAgICAgICBhdHRlbmRhbmNlX2NvdW50OiBhdHRlbmRhbmNlQ291bnQsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgIH0sXG59O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQbHVzLCBDYWxlbmRhciwgTWFwUGluLCBDbG9jaywgVXNlcnMsIEVkaXQsIENoZWNrQ2lyY2xlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tICcuLi9jb250ZXh0cy9BdXRoQ29udGV4dCc7XG5pbXBvcnQgeyB1c2VUb2FzdCB9IGZyb20gJy4uL2NvbnRleHRzL1RvYXN0Q29udGV4dCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2J1dHRvbic7XG5pbXBvcnQgeyBDYXJkIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9jYXJkJztcbmltcG9ydCB7IGV2ZW50QXBpIH0gZnJvbSAnLi4vbGliL2V2ZW50QXBpJztcbmltcG9ydCBFdmVudEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9ldmVudHMvRXZlbnRGb3JtJztcbmltcG9ydCBDb21wbGV0ZUV2ZW50RGlhbG9nIGZyb20gJy4uL2NvbXBvbmVudHMvZXZlbnRzL0NvbXBsZXRlRXZlbnREaWFsb2cnO1xuaW1wb3J0IEFyY2hpdmVCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9hcmNoaXZlL0FyY2hpdmVCdXR0b24nO1xuLyoqXG4gKiBFdmVudHMgUGFnZSBDb21wb25lbnRcbiAqXG4gKiBEaXNwbGF5cyBhIGxpc3Qgb2YgdXBjb21pbmcgYW5kIHBhc3QgY2h1cmNoIGV2ZW50cyB3aXRoIG1hbmFnZW1lbnQgY2FwYWJpbGl0aWVzLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBEaXNwbGF5IGxpc3Qgb2YgdXBjb21pbmcgZXZlbnRzIChzb3J0ZWQgY2hyb25vbG9naWNhbGx5KVxuICogLSBEaXNwbGF5IGxpc3Qgb2YgcGFzdCBldmVudHNcbiAqIC0gQWRkIEV2ZW50IGJ1dHRvbiBmb3IgY3JlYXRpbmcgbmV3IGV2ZW50cyAoYWRtaW4gb25seSlcbiAqIC0gVmlldyBldmVudCBkZXRhaWxzXG4gKiAtIFJlc3BvbnNpdmUgbGF5b3V0XG4gKlxuICogVmFsaWRhdGVzIFJlcXVpcmVtZW50czogOS4xLCA5LjJcbiAqL1xuY29uc3QgRXZlbnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdXNlciB9ID0gdXNlQXV0aCgpO1xuICAgIGNvbnN0IHsgc2hvd1RvYXN0IH0gPSB1c2VUb2FzdCgpO1xuICAgIGNvbnN0IGlzQWRtaW4gPSB1c2VyPy5yb2xlID09PSAnYWRtaW4nO1xuICAgIC8vIFN0YXRlIG1hbmFnZW1lbnRcbiAgICBjb25zdCBbZXZlbnRzLCBzZXRFdmVudHNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbaXNGb3JtT3Blbiwgc2V0SXNGb3JtT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3NlbGVjdGVkRXZlbnQsIHNldFNlbGVjdGVkRXZlbnRdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW2lzQ29tcGxldGVEaWFsb2dPcGVuLCBzZXRJc0NvbXBsZXRlRGlhbG9nT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2V2ZW50VG9Db21wbGV0ZSwgc2V0RXZlbnRUb0NvbXBsZXRlXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIC8qKlxuICAgICAqIExvYWQgZXZlbnRzIG9uIG1vdW50XG4gICAgICovXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgbG9hZEV2ZW50cygpO1xuICAgIH0sIFtdKTtcbiAgICAvKipcbiAgICAgKiBGZXRjaCBldmVudHMgZnJvbSBBUElcbiAgICAgKi9cbiAgICBjb25zdCBsb2FkRXZlbnRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGV2ZW50QXBpLmdldEV2ZW50cygpO1xuICAgICAgICAgICAgc2V0RXZlbnRzKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gbG9hZCBldmVudHMnKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgZXZlbnRzOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhZGQgZXZlbnQgYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQWRkQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIHNldFNlbGVjdGVkRXZlbnQobnVsbCk7XG4gICAgICAgIHNldElzRm9ybU9wZW4odHJ1ZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZWRpdCBldmVudCBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVFZGl0Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgc2V0U2VsZWN0ZWRFdmVudChldmVudCk7XG4gICAgICAgIHNldElzRm9ybU9wZW4odHJ1ZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZm9ybSBjbG9zZVxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUZvcm1DbG9zZSA9ICgpID0+IHtcbiAgICAgICAgc2V0SXNGb3JtT3BlbihmYWxzZSk7XG4gICAgICAgIHNldFNlbGVjdGVkRXZlbnQobnVsbCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZm9ybSBzdWJtaXRcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVGb3JtU3VibWl0ID0gYXN5bmMgKGRhdGEpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFdmVudHMudHN4OiBTdWJtaXR0aW5nIGV2ZW50IGRhdGE6JywgZGF0YSk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRFdmVudCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBldmVudFxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV2ZW50QXBpLnVwZGF0ZUV2ZW50KHNlbGVjdGVkRXZlbnQuaWQsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFdmVudHMudHN4OiBFdmVudCB1cGRhdGVkOicsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ0V2ZW50IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IGV2ZW50XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXZlbnRBcGkuY3JlYXRlRXZlbnQoZGF0YSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0V2ZW50cy50c3g6IEV2ZW50IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5OicsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ0V2ZW50IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXZlbnRzLnRzeDogUmVsb2FkaW5nIGV2ZW50cyBsaXN0Li4uJyk7XG4gICAgICAgICAgICBhd2FpdCBsb2FkRXZlbnRzKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRXZlbnRzLnRzeDogRXZlbnRzIGxpc3QgcmVsb2FkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0V2ZW50cy50c3g6IEVycm9yIHN1Ym1pdHRpbmcgZXZlbnQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXZlbnRzLnRzeDogRXJyb3IgcmVzcG9uc2U6JywgZXJyb3IucmVzcG9uc2U/LmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXZlbnRzLnRzeDogRXJyb3Igc3RhdHVzOicsIGVycm9yLnJlc3BvbnNlPy5zdGF0dXMpO1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgZXJyb3IubWVzc2FnZSB8fCAnVW5rbm93biBlcnJvcic7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgc2VsZWN0ZWRFdmVudCA/ICdGYWlsZWQgdG8gdXBkYXRlIGV2ZW50OiAnICsgZXJyb3JNZXNzYWdlIDogJ0ZhaWxlZCB0byBjcmVhdGUgZXZlbnQ6ICcgKyBlcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7IC8vIFJlLXRocm93IHRvIHByZXZlbnQgZm9ybSBmcm9tIGNsb3NpbmdcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGRlbGV0ZSBldmVudCBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVEZWxldGVDbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICAvLyBIYW5kbGVkIGJ5IEFyY2hpdmVCdXR0b24gY29tcG9uZW50XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYXJjaGl2ZSBzdWNjZXNzIGNhbGxiYWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQXJjaGl2ZVN1Y2Nlc3MgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGxvYWRFdmVudHMoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBtYXJrIGFzIGNvbXBsZXRlZCBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVDb21wbGV0ZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHNldEV2ZW50VG9Db21wbGV0ZShldmVudCk7XG4gICAgICAgIHNldElzQ29tcGxldGVEaWFsb2dPcGVuKHRydWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNvbXBsZXRlIGNvbmZpcm1hdGlvblxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUNvbXBsZXRlQ29uZmlybSA9IGFzeW5jIChhdHRlbmRhbmNlQ291bnQpID0+IHtcbiAgICAgICAgaWYgKCFldmVudFRvQ29tcGxldGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBldmVudEFwaS5jb21wbGV0ZUV2ZW50KGV2ZW50VG9Db21wbGV0ZS5pZCwgYXR0ZW5kYW5jZUNvdW50KTtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnc3VjY2VzcycsICdFdmVudCBtYXJrZWQgYXMgY29tcGxldGVkJyk7XG4gICAgICAgICAgICBhd2FpdCBsb2FkRXZlbnRzKCk7XG4gICAgICAgICAgICBzZXRJc0NvbXBsZXRlRGlhbG9nT3BlbihmYWxzZSk7XG4gICAgICAgICAgICBzZXRFdmVudFRvQ29tcGxldGUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgJ0ZhaWxlZCB0byBtYXJrIGV2ZW50IGFzIGNvbXBsZXRlZCcpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY29tcGxldGluZyBldmVudDonLCBlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjsgLy8gUmUtdGhyb3cgdG8gcHJldmVudCBkaWFsb2cgZnJvbSBjbG9zaW5nXG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNlcGFyYXRlIGV2ZW50cyBpbnRvIHVwY29taW5nIGFuZCBwYXN0XG4gICAgICovXG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICBub3cuc2V0SG91cnMoMCwgMCwgMCwgMCk7IC8vIFJlc2V0IHRvIHN0YXJ0IG9mIGRheSBmb3IgYWNjdXJhdGUgY29tcGFyaXNvblxuICAgIGNvbnN0IHVwY29taW5nRXZlbnRzID0gZXZlbnRzXG4gICAgICAgIC5maWx0ZXIoZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBldmVudERhdGUgPSBuZXcgRGF0ZShldmVudC5ldmVudF9kYXRlKTtcbiAgICAgICAgZXZlbnREYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICByZXR1cm4gZXZlbnREYXRlID49IG5vdyAmJiBldmVudC5zdGF0dXMgPT09ICd1cGNvbWluZyc7XG4gICAgfSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKGEuZXZlbnRfZGF0ZSkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYi5ldmVudF9kYXRlKS5nZXRUaW1lKCkpO1xuICAgIGNvbnN0IHBhc3RFdmVudHMgPSBldmVudHNcbiAgICAgICAgLmZpbHRlcihldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50RGF0ZSA9IG5ldyBEYXRlKGV2ZW50LmV2ZW50X2RhdGUpO1xuICAgICAgICBldmVudERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIHJldHVybiBldmVudERhdGUgPCBub3cgfHwgZXZlbnQuc3RhdHVzID09PSAnY29tcGxldGVkJztcbiAgICB9KVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYi5ldmVudF9kYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLmV2ZW50X2RhdGUpLmdldFRpbWUoKSk7XG4gICAgLyoqXG4gICAgICogRm9ybWF0IGRhdGUgZm9yIGRpc3BsYXlcbiAgICAgKi9cbiAgICBjb25zdCBmb3JtYXREYXRlID0gKGRhdGVTdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHJpbmcpO1xuICAgICAgICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJywge1xuICAgICAgICAgICAgd2Vla2RheTogJ2xvbmcnLFxuICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgbW9udGg6ICdsb25nJyxcbiAgICAgICAgICAgIGRheTogJ251bWVyaWMnXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRm9ybWF0IHRpbWUgZm9yIGRpc3BsYXlcbiAgICAgKi9cbiAgICBjb25zdCBmb3JtYXRUaW1lID0gKHRpbWVTdHJpbmcpID0+IHtcbiAgICAgICAgLy8gSGFuZGxlIGJvdGggSEg6bW06c3MgYW5kIEhIOm1tIGZvcm1hdHNcbiAgICAgICAgY29uc3QgW2hvdXJzLCBtaW51dGVzXSA9IHRpbWVTdHJpbmcuc3BsaXQoJzonKTtcbiAgICAgICAgY29uc3QgaG91ciA9IHBhcnNlSW50KGhvdXJzLCAxMCk7XG4gICAgICAgIGNvbnN0IGFtcG0gPSBob3VyID49IDEyID8gJ1BNJyA6ICdBTSc7XG4gICAgICAgIGNvbnN0IGRpc3BsYXlIb3VyID0gaG91ciAlIDEyIHx8IDEyO1xuICAgICAgICByZXR1cm4gYCR7ZGlzcGxheUhvdXJ9OiR7bWludXRlc30gJHthbXBtfWA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW5kZXIgZXZlbnQgY2FyZFxuICAgICAqL1xuICAgIGNvbnN0IHJlbmRlckV2ZW50Q2FyZCA9IChldmVudCwgaXNQYXN0ID0gZmFsc2UpID0+IChfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogYHAtNiBob3ZlcjpzaGFkb3ctbGcgdHJhbnNpdGlvbi1zaGFkb3cgJHtpc1Bhc3QgPyAnb3BhY2l0eS03NScgOiAnJ31gLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIG1iLTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTFcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgbWItMVwiLCBjaGlsZHJlbjogZXZlbnQudGl0bGUgfSksIGV2ZW50LnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgJiYgZXZlbnQuYXR0ZW5kYW5jZV9jb3VudCAhPT0gbnVsbCAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LWdyYXktNjAwXCIsIGNoaWxkcmVuOiBbX2pzeChVc2VycywgeyBjbGFzc05hbWU6IFwiaC00IHctNFwiIH0pLCBfanN4cyhcInNwYW5cIiwgeyBjaGlsZHJlbjogW2V2ZW50LmF0dGVuZGFuY2VfY291bnQsIFwiIGF0dGVuZGVlc1wiXSB9KV0gfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtldmVudC5zdGF0dXMgPT09ICdjb21wbGV0ZWQnICYmIChfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJiZy1ncmVlbi0xMDAgdGV4dC1ncmVlbi04MDAgdGV4dC14cyBmb250LW1lZGl1bSBweC0yLjUgcHktMC41IHJvdW5kZWRcIiwgY2hpbGRyZW46IFwiQ29tcGxldGVkXCIgfSkpLCBldmVudC5zdGF0dXMgPT09ICdjYW5jZWxsZWQnICYmIChfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJiZy1yZWQtMTAwIHRleHQtcmVkLTgwMCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHB4LTIuNSBweS0wLjUgcm91bmRlZFwiLCBjaGlsZHJlbjogXCJDYW5jZWxsZWRcIiB9KSldIH0pXSB9KSwgZXZlbnQuZGVzY3JpcHRpb24gJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1ncmF5LTYwMCBtYi00IGxpbmUtY2xhbXAtMlwiLCBjaGlsZHJlbjogZXZlbnQuZGVzY3JpcHRpb24gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTIgdGV4dC1zbSBtYi00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgdGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogW19qc3goQ2FsZW5kYXIsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMiBmbGV4LXNocmluay0wXCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2hpbGRyZW46IGZvcm1hdERhdGUoZXZlbnQuZXZlbnRfZGF0ZSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciB0ZXh0LWdyYXktNjAwXCIsIGNoaWxkcmVuOiBbX2pzeChDbG9jaywgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yIGZsZXgtc2hyaW5rLTBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogZm9ybWF0VGltZShldmVudC5ldmVudF90aW1lKSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFtfanN4KE1hcFBpbiwgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yIGZsZXgtc2hyaW5rLTBcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogZXZlbnQubG9jYXRpb24gfSldIH0pXSB9KSwgaXNBZG1pbiAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHQtNCBib3JkZXItdCBib3JkZXItZ3JheS0yMDBcIiwgY2hpbGRyZW46IFtldmVudC5zdGF0dXMgPT09ICd1cGNvbWluZycgJiYgKF9qc3hzKEJ1dHRvbiwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiAoKSA9PiBoYW5kbGVDb21wbGV0ZUNsaWNrKGV2ZW50KSwgY2xhc3NOYW1lOiBcImZsZXgtMVwiLCBjaGlsZHJlbjogW19qc3goQ2hlY2tDaXJjbGUsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMVwiIH0pLCBcIkNvbXBsZXRlXCJdIH0pKSwgX2pzeHMoQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUVkaXRDbGljayhldmVudCksIGNoaWxkcmVuOiBbX2pzeChFZGl0LCB7IGNsYXNzTmFtZTogXCJoLTQgdy00IG1yLTFcIiB9KSwgXCJFZGl0XCJdIH0pLCBfanN4KEFyY2hpdmVCdXR0b24sIHsgaXRlbVR5cGU6IFwiZXZlbnRzXCIsIGl0ZW1JZDogZXZlbnQuaWQsIGl0ZW1OYW1lOiBldmVudC50aXRsZSwgb25BcmNoaXZlU3VjY2VzczogaGFuZGxlQXJjaGl2ZVN1Y2Nlc3MsIHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIGljb25Pbmx5OiBmYWxzZSB9KV0gfSkpXSB9LCBldmVudC5pZCkpO1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goRXZlbnRGb3JtLCB7IGlzT3BlbjogaXNGb3JtT3Blbiwgb25DbG9zZTogaGFuZGxlRm9ybUNsb3NlLCBvblN1Ym1pdDogaGFuZGxlRm9ybVN1Ym1pdCwgZXZlbnQ6IHNlbGVjdGVkRXZlbnQsIGlzTG9hZGluZzogaXNMb2FkaW5nIH0pLCBfanN4KENvbXBsZXRlRXZlbnREaWFsb2csIHsgaXNPcGVuOiBpc0NvbXBsZXRlRGlhbG9nT3Blbiwgb25DbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc0NvbXBsZXRlRGlhbG9nT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEV2ZW50VG9Db21wbGV0ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9LCBvbkNvbmZpcm06IGhhbmRsZUNvbXBsZXRlQ29uZmlybSwgZXZlbnRUaXRsZTogZXZlbnRUb0NvbXBsZXRlPy50aXRsZSB8fCAnJyB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTpqdXN0aWZ5LWJldHdlZW4gc206aXRlbXMtY2VudGVyIGdhcC00IG1iLTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBcIkV2ZW50c1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtZ3JheS02MDAgbXQtMVwiLCBjaGlsZHJlbjogXCJNYW5hZ2UgY2h1cmNoIGV2ZW50cyBhbmQgdHJhY2sgYXR0ZW5kYW5jZVwiIH0pXSB9KSwgaXNBZG1pbiAmJiAoX2pzeHMoQnV0dG9uLCB7IG9uQ2xpY2s6IGhhbmRsZUFkZENsaWNrLCBjbGFzc05hbWU6IFwidy1mdWxsIHNtOnctYXV0b1wiLCBjaGlsZHJlbjogW19qc3goUGx1cywgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yXCIgfSksIFwiQWRkIEV2ZW50XCJdIH0pKV0gfSksIGlzTG9hZGluZyAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWNlbnRlciBweS0xMlwiLCBjaGlsZHJlbjogX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nIGV2ZW50cy4uLlwiIH0pIH0pKSwgIWlzTG9hZGluZyAmJiBldmVudHMubGVuZ3RoID09PSAwICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInRleHQtY2VudGVyIHB5LTEyXCIsIGNoaWxkcmVuOiBfanN4cyhcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1ncmF5LTYwMFwiLCBjaGlsZHJlbjogW1wiTm8gZXZlbnRzIHlldC4gXCIsIGlzQWRtaW4gJiYgJ0NsaWNrIFwiQWRkIEV2ZW50XCIgdG8gY3JlYXRlIG9uZS4nXSB9KSB9KSksICFpc0xvYWRpbmcgJiYgZXZlbnRzLmxlbmd0aCA+IDAgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktOFwiLCBjaGlsZHJlbjogW3VwY29taW5nRXZlbnRzLmxlbmd0aCA+IDAgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwiaDJcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14bCBmb250LXNlbWlib2xkIHRleHQtZ3JheS05MDAgbWItNFwiLCBjaGlsZHJlbjogXCJVcGNvbWluZyBFdmVudHNcIiB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02XCIsIGNoaWxkcmVuOiB1cGNvbWluZ0V2ZW50cy5tYXAoZXZlbnQgPT4gcmVuZGVyRXZlbnRDYXJkKGV2ZW50KSkgfSldIH0pKSwgcGFzdEV2ZW50cy5sZW5ndGggPiAwICYmIChfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTRcIiwgY2hpbGRyZW46IFwiUGFzdCBFdmVudHNcIiB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02XCIsIGNoaWxkcmVuOiBwYXN0RXZlbnRzLm1hcChldmVudCA9PiByZW5kZXJFdmVudENhcmQoZXZlbnQsIHRydWUpKSB9KV0gfSkpXSB9KSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBFdmVudHM7XG4iLCJ2YXIgY3VycmVudE5vbmNlO1xuZXhwb3J0IHZhciBzZXROb25jZSA9IGZ1bmN0aW9uIChub25jZSkge1xuICAgIGN1cnJlbnROb25jZSA9IG5vbmNlO1xufTtcbmV4cG9ydCB2YXIgZ2V0Tm9uY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGN1cnJlbnROb25jZSkge1xuICAgICAgICByZXR1cm4gY3VycmVudE5vbmNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59O1xuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJyZWN0XCIsIHsgd2lkdGg6IFwiMjBcIiwgaGVpZ2h0OiBcIjVcIiwgeDogXCIyXCIsIHk6IFwiM1wiLCByeDogXCIxXCIsIGtleTogXCIxd3AxdTFcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTQgOHYxMWEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOFwiLCBrZXk6IFwiMXM4MGpwXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMCAxMmg0XCIsIGtleTogXCJhNTZiMHBcIiB9XVxuXTtcbmNvbnN0IEFyY2hpdmUgPSBjcmVhdGVMdWNpZGVJY29uKFwiYXJjaGl2ZVwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgQXJjaGl2ZSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcmNoaXZlLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgNnY2bDQgMlwiLCBrZXk6IFwibW1rN3lnXCIgfV0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEyXCIsIHI6IFwiMTBcIiwga2V5OiBcIjFtZ2xheVwiIH1dXG5dO1xuY29uc3QgQ2xvY2sgPSBjcmVhdGVMdWNpZGVJY29uKFwiY2xvY2tcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIENsb2NrIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsb2NrLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMjAgMTBjMCA0Ljk5My01LjUzOSAxMC4xOTMtNy4zOTkgMTEuNzk5YTEgMSAwIDAgMS0xLjIwMiAwQzkuNTM5IDIwLjE5MyA0IDE0Ljk5MyA0IDEwYTggOCAwIDAgMSAxNiAwXCIsXG4gICAgICBrZXk6IFwiMXIwZjB6XCJcbiAgICB9XG4gIF0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEwXCIsIHI6IFwiM1wiLCBrZXk6IFwiaWxxaHI3XCIgfV1cbl07XG5jb25zdCBNYXBQaW4gPSBjcmVhdGVMdWNpZGVJY29uKFwibWFwLXBpblwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgTWFwUGluIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC1waW4uanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk01IDEyaDE0XCIsIGtleTogXCIxYXlzMGhcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDV2MTRcIiwga2V5OiBcInM2OTlsZVwiIH1dXG5dO1xuY29uc3QgUGx1cyA9IGNyZWF0ZUx1Y2lkZUljb24oXCJwbHVzXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBQbHVzIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsdXMuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMiAzSDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJ2LTdcIiwga2V5OiBcIjFtMHY2Z1wiIH1dLFxuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMTguMzc1IDIuNjI1YTEgMSAwIDAgMSAzIDNsLTkuMDEzIDkuMDE0YTIgMiAwIDAgMS0uODUzLjUwNWwtMi44NzMuODRhLjUuNSAwIDAgMS0uNjItLjYybC44NC0yLjg3M2EyIDIgMCAwIDEgLjUwNi0uODUyelwiLFxuICAgICAga2V5OiBcIm9ocmJnMlwiXG4gICAgfVxuICBdXG5dO1xuY29uc3QgU3F1YXJlUGVuID0gY3JlYXRlTHVjaWRlSWNvbihcInNxdWFyZS1wZW5cIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFNxdWFyZVBlbiBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zcXVhcmUtcGVuLmpzLm1hcFxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc3R5bGVTaW5nbGV0b24gfSBmcm9tICdyZWFjdC1zdHlsZS1zaW5nbGV0b24nO1xuaW1wb3J0IHsgZnVsbFdpZHRoQ2xhc3NOYW1lLCB6ZXJvUmlnaHRDbGFzc05hbWUsIG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSwgcmVtb3ZlZEJhclNpemVWYXJpYWJsZSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldEdhcFdpZHRoIH0gZnJvbSAnLi91dGlscyc7XG52YXIgU3R5bGUgPSBzdHlsZVNpbmdsZXRvbigpO1xuZXhwb3J0IHZhciBsb2NrQXR0cmlidXRlID0gJ2RhdGEtc2Nyb2xsLWxvY2tlZCc7XG4vLyBpbXBvcnRhbnQgdGlwIC0gb25jZSB3ZSBtZWFzdXJlIHNjcm9sbEJhciB3aWR0aCBhbmQgcmVtb3ZlIHRoZW1cbi8vIHdlIGNvdWxkIG5vdCByZXBlYXQgdGhpcyBvcGVyYXRpb25cbi8vIHRodXMgd2UgYXJlIHVzaW5nIHN0eWxlLXNpbmdsZXRvbiAtIG9ubHkgdGhlIGZpcnN0IFwieWV0IGNvcnJlY3RcIiBzdHlsZSB3aWxsIGJlIGFwcGxpZWQuXG52YXIgZ2V0U3R5bGVzID0gZnVuY3Rpb24gKF9hLCBhbGxvd1JlbGF0aXZlLCBnYXBNb2RlLCBpbXBvcnRhbnQpIHtcbiAgICB2YXIgbGVmdCA9IF9hLmxlZnQsIHRvcCA9IF9hLnRvcCwgcmlnaHQgPSBfYS5yaWdodCwgZ2FwID0gX2EuZ2FwO1xuICAgIGlmIChnYXBNb2RlID09PSB2b2lkIDApIHsgZ2FwTW9kZSA9ICdtYXJnaW4nOyB9XG4gICAgcmV0dXJuIFwiXFxuICAuXCIuY29uY2F0KG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSwgXCIge1xcbiAgIG92ZXJmbG93OiBoaWRkZW4gXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgIHBhZGRpbmctcmlnaHQ6IFwiKS5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIGJvZHlbXCIpLmNvbmNhdChsb2NrQXR0cmlidXRlLCBcIl0ge1xcbiAgICBvdmVyZmxvdzogaGlkZGVuIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gICAgb3ZlcnNjcm9sbC1iZWhhdmlvcjogY29udGFpbjtcXG4gICAgXCIpLmNvbmNhdChbXG4gICAgICAgIGFsbG93UmVsYXRpdmUgJiYgXCJwb3NpdGlvbjogcmVsYXRpdmUgXCIuY29uY2F0KGltcG9ydGFudCwgXCI7XCIpLFxuICAgICAgICBnYXBNb2RlID09PSAnbWFyZ2luJyAmJlxuICAgICAgICAgICAgXCJcXG4gICAgcGFkZGluZy1sZWZ0OiBcIi5jb25jYXQobGVmdCwgXCJweDtcXG4gICAgcGFkZGluZy10b3A6IFwiKS5jb25jYXQodG9wLCBcInB4O1xcbiAgICBwYWRkaW5nLXJpZ2h0OiBcIikuY29uY2F0KHJpZ2h0LCBcInB4O1xcbiAgICBtYXJnaW4tbGVmdDowO1xcbiAgICBtYXJnaW4tdG9wOjA7XFxuICAgIG1hcmdpbi1yaWdodDogXCIpLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgICBcIiksXG4gICAgICAgIGdhcE1vZGUgPT09ICdwYWRkaW5nJyAmJiBcInBhZGRpbmctcmlnaHQ6IFwiLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1wiKSxcbiAgICBdXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgLmpvaW4oJycpLCBcIlxcbiAgfVxcbiAgXFxuICAuXCIpLmNvbmNhdCh6ZXJvUmlnaHRDbGFzc05hbWUsIFwiIHtcXG4gICAgcmlnaHQ6IFwiKS5jb25jYXQoZ2FwLCBcInB4IFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoZnVsbFdpZHRoQ2xhc3NOYW1lLCBcIiB7XFxuICAgIG1hcmdpbi1yaWdodDogXCIpLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICAuXCIpLmNvbmNhdCh6ZXJvUmlnaHRDbGFzc05hbWUsIFwiIC5cIikuY29uY2F0KHplcm9SaWdodENsYXNzTmFtZSwgXCIge1xcbiAgICByaWdodDogMCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KGZ1bGxXaWR0aENsYXNzTmFtZSwgXCIgLlwiKS5jb25jYXQoZnVsbFdpZHRoQ2xhc3NOYW1lLCBcIiB7XFxuICAgIG1hcmdpbi1yaWdodDogMCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBcXG4gIGJvZHlbXCIpLmNvbmNhdChsb2NrQXR0cmlidXRlLCBcIl0ge1xcbiAgICBcIikuY29uY2F0KHJlbW92ZWRCYXJTaXplVmFyaWFibGUsIFwiOiBcIikuY29uY2F0KGdhcCwgXCJweDtcXG4gIH1cXG5cIik7XG59O1xudmFyIGdldEN1cnJlbnRVc2VDb3VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb3VudGVyID0gcGFyc2VJbnQoZG9jdW1lbnQuYm9keS5nZXRBdHRyaWJ1dGUobG9ja0F0dHJpYnV0ZSkgfHwgJzAnLCAxMCk7XG4gICAgcmV0dXJuIGlzRmluaXRlKGNvdW50ZXIpID8gY291bnRlciA6IDA7XG59O1xuZXhwb3J0IHZhciB1c2VMb2NrQXR0cmlidXRlID0gZnVuY3Rpb24gKCkge1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKGxvY2tBdHRyaWJ1dGUsIChnZXRDdXJyZW50VXNlQ291bnRlcigpICsgMSkudG9TdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbmV3Q291bnRlciA9IGdldEN1cnJlbnRVc2VDb3VudGVyKCkgLSAxO1xuICAgICAgICAgICAgaWYgKG5ld0NvdW50ZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKGxvY2tBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUobG9ja0F0dHJpYnV0ZSwgbmV3Q291bnRlci50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LCBbXSk7XG59O1xuLyoqXG4gKiBSZW1vdmVzIHBhZ2Ugc2Nyb2xsYmFyIGFuZCBibG9ja3MgcGFnZSBzY3JvbGwgd2hlbiBtb3VudGVkXG4gKi9cbmV4cG9ydCB2YXIgUmVtb3ZlU2Nyb2xsQmFyID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIG5vUmVsYXRpdmUgPSBfYS5ub1JlbGF0aXZlLCBub0ltcG9ydGFudCA9IF9hLm5vSW1wb3J0YW50LCBfYiA9IF9hLmdhcE1vZGUsIGdhcE1vZGUgPSBfYiA9PT0gdm9pZCAwID8gJ21hcmdpbicgOiBfYjtcbiAgICB1c2VMb2NrQXR0cmlidXRlKCk7XG4gICAgLypcbiAgICAgZ2FwIHdpbGwgYmUgbWVhc3VyZWQgb24gZXZlcnkgY29tcG9uZW50IG1vdW50XG4gICAgIGhvd2V2ZXIgaXQgd2lsbCBiZSB1c2VkIG9ubHkgYnkgdGhlIFwiZmlyc3RcIiBpbnZvY2F0aW9uXG4gICAgIGR1ZSB0byBzaW5nbGV0b24gbmF0dXJlIG9mIDxTdHlsZVxuICAgICAqL1xuICAgIHZhciBnYXAgPSBSZWFjdC51c2VNZW1vKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGdldEdhcFdpZHRoKGdhcE1vZGUpOyB9LCBbZ2FwTW9kZV0pO1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFN0eWxlLCB7IHN0eWxlczogZ2V0U3R5bGVzKGdhcCwgIW5vUmVsYXRpdmUsIGdhcE1vZGUsICFub0ltcG9ydGFudCA/ICchaW1wb3J0YW50JyA6ICcnKSB9KTtcbn07XG4iLCJleHBvcnQgdmFyIHplcm9SaWdodENsYXNzTmFtZSA9ICdyaWdodC1zY3JvbGwtYmFyLXBvc2l0aW9uJztcbmV4cG9ydCB2YXIgZnVsbFdpZHRoQ2xhc3NOYW1lID0gJ3dpZHRoLWJlZm9yZS1zY3JvbGwtYmFyJztcbmV4cG9ydCB2YXIgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lID0gJ3dpdGgtc2Nyb2xsLWJhcnMtaGlkZGVuJztcbi8qKlxuICogTmFtZSBvZiBhIENTUyB2YXJpYWJsZSBjb250YWluaW5nIHRoZSBhbW91bnQgb2YgXCJoaWRkZW5cIiBzY3JvbGxiYXJcbiAqICEgbWlnaHQgYmUgdW5kZWZpbmVkICEgdXNlIHdpbGwgZmFsbGJhY2shXG4gKi9cbmV4cG9ydCB2YXIgcmVtb3ZlZEJhclNpemVWYXJpYWJsZSA9ICctLXJlbW92ZWQtYm9keS1zY3JvbGwtYmFyLXNpemUnO1xuIiwiaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsQmFyIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgemVyb1JpZ2h0Q2xhc3NOYW1lLCBmdWxsV2lkdGhDbGFzc05hbWUsIG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSwgcmVtb3ZlZEJhclNpemVWYXJpYWJsZSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldEdhcFdpZHRoIH0gZnJvbSAnLi91dGlscyc7XG5leHBvcnQgeyBSZW1vdmVTY3JvbGxCYXIsIHplcm9SaWdodENsYXNzTmFtZSwgZnVsbFdpZHRoQ2xhc3NOYW1lLCBub1Njcm9sbGJhcnNDbGFzc05hbWUsIHJlbW92ZWRCYXJTaXplVmFyaWFibGUsIGdldEdhcFdpZHRoLCB9O1xuIiwiZXhwb3J0IHZhciB6ZXJvR2FwID0ge1xuICAgIGxlZnQ6IDAsXG4gICAgdG9wOiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGdhcDogMCxcbn07XG52YXIgcGFyc2UgPSBmdW5jdGlvbiAoeCkgeyByZXR1cm4gcGFyc2VJbnQoeCB8fCAnJywgMTApIHx8IDA7IH07XG52YXIgZ2V0T2Zmc2V0ID0gZnVuY3Rpb24gKGdhcE1vZGUpIHtcbiAgICB2YXIgY3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KTtcbiAgICB2YXIgbGVmdCA9IGNzW2dhcE1vZGUgPT09ICdwYWRkaW5nJyA/ICdwYWRkaW5nTGVmdCcgOiAnbWFyZ2luTGVmdCddO1xuICAgIHZhciB0b3AgPSBjc1tnYXBNb2RlID09PSAncGFkZGluZycgPyAncGFkZGluZ1RvcCcgOiAnbWFyZ2luVG9wJ107XG4gICAgdmFyIHJpZ2h0ID0gY3NbZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnID8gJ3BhZGRpbmdSaWdodCcgOiAnbWFyZ2luUmlnaHQnXTtcbiAgICByZXR1cm4gW3BhcnNlKGxlZnQpLCBwYXJzZSh0b3ApLCBwYXJzZShyaWdodCldO1xufTtcbmV4cG9ydCB2YXIgZ2V0R2FwV2lkdGggPSBmdW5jdGlvbiAoZ2FwTW9kZSkge1xuICAgIGlmIChnYXBNb2RlID09PSB2b2lkIDApIHsgZ2FwTW9kZSA9ICdtYXJnaW4nOyB9XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB6ZXJvR2FwO1xuICAgIH1cbiAgICB2YXIgb2Zmc2V0cyA9IGdldE9mZnNldChnYXBNb2RlKTtcbiAgICB2YXIgZG9jdW1lbnRXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBvZmZzZXRzWzBdLFxuICAgICAgICB0b3A6IG9mZnNldHNbMV0sXG4gICAgICAgIHJpZ2h0OiBvZmZzZXRzWzJdLFxuICAgICAgICBnYXA6IE1hdGgubWF4KDAsIHdpbmRvd1dpZHRoIC0gZG9jdW1lbnRXaWR0aCArIG9mZnNldHNbMl0gLSBvZmZzZXRzWzBdKSxcbiAgICB9O1xufTtcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSZW1vdmVTY3JvbGwgfSBmcm9tICcuL1VJJztcbmltcG9ydCBTaWRlQ2FyIGZyb20gJy4vc2lkZWNhcic7XG52YXIgUmVhY3RSZW1vdmVTY3JvbGwgPSBSZWFjdC5mb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7IHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZW1vdmVTY3JvbGwsIF9fYXNzaWduKHt9LCBwcm9wcywgeyByZWY6IHJlZiwgc2lkZUNhcjogU2lkZUNhciB9KSkpOyB9KTtcblJlYWN0UmVtb3ZlU2Nyb2xsLmNsYXNzTmFtZXMgPSBSZW1vdmVTY3JvbGwuY2xhc3NOYW1lcztcbmV4cG9ydCBkZWZhdWx0IFJlYWN0UmVtb3ZlU2Nyb2xsO1xuIiwiaW1wb3J0IHsgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsQmFyIH0gZnJvbSAncmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXInO1xuaW1wb3J0IHsgc3R5bGVTaW5nbGV0b24gfSBmcm9tICdyZWFjdC1zdHlsZS1zaW5nbGV0b24nO1xuaW1wb3J0IHsgbm9uUGFzc2l2ZSB9IGZyb20gJy4vYWdncmVzaXZlQ2FwdHVyZSc7XG5pbXBvcnQgeyBoYW5kbGVTY3JvbGwsIGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkIH0gZnJvbSAnLi9oYW5kbGVTY3JvbGwnO1xuZXhwb3J0IHZhciBnZXRUb3VjaFhZID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgcmV0dXJuICdjaGFuZ2VkVG91Y2hlcycgaW4gZXZlbnQgPyBbZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WV0gOiBbMCwgMF07XG59O1xuZXhwb3J0IHZhciBnZXREZWx0YVhZID0gZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBbZXZlbnQuZGVsdGFYLCBldmVudC5kZWx0YVldOyB9O1xudmFyIGV4dHJhY3RSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgcmV0dXJuIHJlZiAmJiAnY3VycmVudCcgaW4gcmVmID8gcmVmLmN1cnJlbnQgOiByZWY7XG59O1xudmFyIGRlbHRhQ29tcGFyZSA9IGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiB4WzBdID09PSB5WzBdICYmIHhbMV0gPT09IHlbMV07IH07XG52YXIgZ2VuZXJhdGVTdHlsZSA9IGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gXCJcXG4gIC5ibG9jay1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCwgXCIge3BvaW50ZXItZXZlbnRzOiBub25lO31cXG4gIC5hbGxvdy1pbnRlcmFjdGl2aXR5LVwiKS5jb25jYXQoaWQsIFwiIHtwb2ludGVyLWV2ZW50czogYWxsO31cXG5cIik7IH07XG52YXIgaWRDb3VudGVyID0gMDtcbnZhciBsb2NrU3RhY2sgPSBbXTtcbmV4cG9ydCBmdW5jdGlvbiBSZW1vdmVTY3JvbGxTaWRlQ2FyKHByb3BzKSB7XG4gICAgdmFyIHNob3VsZFByZXZlbnRRdWV1ZSA9IFJlYWN0LnVzZVJlZihbXSk7XG4gICAgdmFyIHRvdWNoU3RhcnRSZWYgPSBSZWFjdC51c2VSZWYoWzAsIDBdKTtcbiAgICB2YXIgYWN0aXZlQXhpcyA9IFJlYWN0LnVzZVJlZigpO1xuICAgIHZhciBpZCA9IFJlYWN0LnVzZVN0YXRlKGlkQ291bnRlcisrKVswXTtcbiAgICB2YXIgU3R5bGUgPSBSZWFjdC51c2VTdGF0ZShzdHlsZVNpbmdsZXRvbilbMF07XG4gICAgdmFyIGxhc3RQcm9wcyA9IFJlYWN0LnVzZVJlZihwcm9wcyk7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGFzdFByb3BzLmN1cnJlbnQgPSBwcm9wcztcbiAgICB9LCBbcHJvcHNdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocHJvcHMuaW5lcnQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcImJsb2NrLWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkKSk7XG4gICAgICAgICAgICB2YXIgYWxsb3dfMSA9IF9fc3ByZWFkQXJyYXkoW3Byb3BzLmxvY2tSZWYuY3VycmVudF0sIChwcm9wcy5zaGFyZHMgfHwgW10pLm1hcChleHRyYWN0UmVmKSwgdHJ1ZSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgICAgYWxsb3dfMS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChcImFsbG93LWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkKSk7IH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJibG9jay1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCkpO1xuICAgICAgICAgICAgICAgIGFsbG93XzEuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhbGxvdy1pbnRlcmFjdGl2aXR5LVwiLmNvbmNhdChpZCkpOyB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH0sIFtwcm9wcy5pbmVydCwgcHJvcHMubG9ja1JlZi5jdXJyZW50LCBwcm9wcy5zaGFyZHNdKTtcbiAgICB2YXIgc2hvdWxkQ2FuY2VsRXZlbnQgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoZXZlbnQsIHBhcmVudCkge1xuICAgICAgICBpZiAoKCd0b3VjaGVzJyBpbiBldmVudCAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMikgfHwgKGV2ZW50LnR5cGUgPT09ICd3aGVlbCcgJiYgZXZlbnQuY3RybEtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiAhbGFzdFByb3BzLmN1cnJlbnQuYWxsb3dQaW5jaFpvb207XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdWNoID0gZ2V0VG91Y2hYWShldmVudCk7XG4gICAgICAgIHZhciB0b3VjaFN0YXJ0ID0gdG91Y2hTdGFydFJlZi5jdXJyZW50O1xuICAgICAgICB2YXIgZGVsdGFYID0gJ2RlbHRhWCcgaW4gZXZlbnQgPyBldmVudC5kZWx0YVggOiB0b3VjaFN0YXJ0WzBdIC0gdG91Y2hbMF07XG4gICAgICAgIHZhciBkZWx0YVkgPSAnZGVsdGFZJyBpbiBldmVudCA/IGV2ZW50LmRlbHRhWSA6IHRvdWNoU3RhcnRbMV0gLSB0b3VjaFsxXTtcbiAgICAgICAgdmFyIGN1cnJlbnRBeGlzO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB2YXIgbW92ZURpcmVjdGlvbiA9IE1hdGguYWJzKGRlbHRhWCkgPiBNYXRoLmFicyhkZWx0YVkpID8gJ2gnIDogJ3YnO1xuICAgICAgICAvLyBhbGxvdyBob3Jpem9udGFsIHRvdWNoIG1vdmUgb24gUmFuZ2UgaW5wdXRzLiBUaGV5IHdpbGwgbm90IGNhdXNlIGFueSBzY3JvbGxcbiAgICAgICAgaWYgKCd0b3VjaGVzJyBpbiBldmVudCAmJiBtb3ZlRGlyZWN0aW9uID09PSAnaCcgJiYgdGFyZ2V0LnR5cGUgPT09ICdyYW5nZScpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhbGxvdyBkcmFnIHNlbGVjdGlvbiAoaU9TKTsgY2hlY2sgaWYgc2VsZWN0aW9uJ3MgYW5jaG9yTm9kZSBpcyB0aGUgc2FtZSBhcyB0YXJnZXQgb3IgY29udGFpbnMgdGFyZ2V0XG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciBhbmNob3JOb2RlID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5hbmNob3JOb2RlO1xuICAgICAgICB2YXIgaXNUb3VjaGluZ1NlbGVjdGlvbiA9IGFuY2hvck5vZGUgPyBhbmNob3JOb2RlID09PSB0YXJnZXQgfHwgYW5jaG9yTm9kZS5jb250YWlucyh0YXJnZXQpIDogZmFsc2U7XG4gICAgICAgIGlmIChpc1RvdWNoaW5nU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24gPSBsb2NhdGlvbkNvdWxkQmVTY3JvbGxlZChtb3ZlRGlyZWN0aW9uLCB0YXJnZXQpO1xuICAgICAgICBpZiAoIWNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjdXJyZW50QXhpcyA9IG1vdmVEaXJlY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50QXhpcyA9IG1vdmVEaXJlY3Rpb24gPT09ICd2JyA/ICdoJyA6ICd2JztcbiAgICAgICAgICAgIGNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24gPSBsb2NhdGlvbkNvdWxkQmVTY3JvbGxlZChtb3ZlRGlyZWN0aW9uLCB0YXJnZXQpO1xuICAgICAgICAgICAgLy8gb3RoZXIgYXhpcyBtaWdodCBiZSBub3Qgc2Nyb2xsYWJsZVxuICAgICAgICB9XG4gICAgICAgIGlmICghY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYWN0aXZlQXhpcy5jdXJyZW50ICYmICdjaGFuZ2VkVG91Y2hlcycgaW4gZXZlbnQgJiYgKGRlbHRhWCB8fCBkZWx0YVkpKSB7XG4gICAgICAgICAgICBhY3RpdmVBeGlzLmN1cnJlbnQgPSBjdXJyZW50QXhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWN1cnJlbnRBeGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FuY2VsaW5nQXhpcyA9IGFjdGl2ZUF4aXMuY3VycmVudCB8fCBjdXJyZW50QXhpcztcbiAgICAgICAgcmV0dXJuIGhhbmRsZVNjcm9sbChjYW5jZWxpbmdBeGlzLCBwYXJlbnQsIGV2ZW50LCBjYW5jZWxpbmdBeGlzID09PSAnaCcgPyBkZWx0YVggOiBkZWx0YVksIHRydWUpO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2hvdWxkUHJldmVudCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChfZXZlbnQpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gX2V2ZW50O1xuICAgICAgICBpZiAoIWxvY2tTdGFjay5sZW5ndGggfHwgbG9ja1N0YWNrW2xvY2tTdGFjay5sZW5ndGggLSAxXSAhPT0gU3R5bGUpIHtcbiAgICAgICAgICAgIC8vIG5vdCB0aGUgbGFzdCBhY3RpdmVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVsdGEgPSAnZGVsdGFZJyBpbiBldmVudCA/IGdldERlbHRhWFkoZXZlbnQpIDogZ2V0VG91Y2hYWShldmVudCk7XG4gICAgICAgIHZhciBzb3VyY2VFdmVudCA9IHNob3VsZFByZXZlbnRRdWV1ZS5jdXJyZW50LmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5uYW1lID09PSBldmVudC50eXBlICYmIChlLnRhcmdldCA9PT0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnRhcmdldCA9PT0gZS5zaGFkb3dQYXJlbnQpICYmIGRlbHRhQ29tcGFyZShlLmRlbHRhLCBkZWx0YSk7IH0pWzBdO1xuICAgICAgICAvLyBzZWxmIGV2ZW50LCBhbmQgc2hvdWxkIGJlIGNhbmNlbGVkXG4gICAgICAgIGlmIChzb3VyY2VFdmVudCAmJiBzb3VyY2VFdmVudC5zaG91bGQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdXRzaWRlIG9yIHNoYXJkIGV2ZW50XG4gICAgICAgIGlmICghc291cmNlRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBzaGFyZE5vZGVzID0gKGxhc3RQcm9wcy5jdXJyZW50LnNoYXJkcyB8fCBbXSlcbiAgICAgICAgICAgICAgICAubWFwKGV4dHJhY3RSZWYpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIG5vZGUuY29udGFpbnMoZXZlbnQudGFyZ2V0KTsgfSk7XG4gICAgICAgICAgICB2YXIgc2hvdWxkU3RvcCA9IHNoYXJkTm9kZXMubGVuZ3RoID4gMCA/IHNob3VsZENhbmNlbEV2ZW50KGV2ZW50LCBzaGFyZE5vZGVzWzBdKSA6ICFsYXN0UHJvcHMuY3VycmVudC5ub0lzb2xhdGlvbjtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdG9wKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG4gICAgdmFyIHNob3VsZENhbmNlbCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChuYW1lLCBkZWx0YSwgdGFyZ2V0LCBzaG91bGQpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0geyBuYW1lOiBuYW1lLCBkZWx0YTogZGVsdGEsIHRhcmdldDogdGFyZ2V0LCBzaG91bGQ6IHNob3VsZCwgc2hhZG93UGFyZW50OiBnZXRPdXRlcm1vc3RTaGFkb3dQYXJlbnQodGFyZ2V0KSB9O1xuICAgICAgICBzaG91bGRQcmV2ZW50UXVldWUuY3VycmVudC5wdXNoKGV2ZW50KTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzaG91bGRQcmV2ZW50UXVldWUuY3VycmVudCA9IHNob3VsZFByZXZlbnRRdWV1ZS5jdXJyZW50LmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZSAhPT0gZXZlbnQ7IH0pO1xuICAgICAgICB9LCAxKTtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHNjcm9sbFRvdWNoU3RhcnQgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdG91Y2hTdGFydFJlZi5jdXJyZW50ID0gZ2V0VG91Y2hYWShldmVudCk7XG4gICAgICAgIGFjdGl2ZUF4aXMuY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHNjcm9sbFdoZWVsID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNob3VsZENhbmNlbChldmVudC50eXBlLCBnZXREZWx0YVhZKGV2ZW50KSwgZXZlbnQudGFyZ2V0LCBzaG91bGRDYW5jZWxFdmVudChldmVudCwgcHJvcHMubG9ja1JlZi5jdXJyZW50KSk7XG4gICAgfSwgW10pO1xuICAgIHZhciBzY3JvbGxUb3VjaE1vdmUgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsKGV2ZW50LnR5cGUsIGdldFRvdWNoWFkoZXZlbnQpLCBldmVudC50YXJnZXQsIHNob3VsZENhbmNlbEV2ZW50KGV2ZW50LCBwcm9wcy5sb2NrUmVmLmN1cnJlbnQpKTtcbiAgICB9LCBbXSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9ja1N0YWNrLnB1c2goU3R5bGUpO1xuICAgICAgICBwcm9wcy5zZXRDYWxsYmFja3Moe1xuICAgICAgICAgICAgb25TY3JvbGxDYXB0dXJlOiBzY3JvbGxXaGVlbCxcbiAgICAgICAgICAgIG9uV2hlZWxDYXB0dXJlOiBzY3JvbGxXaGVlbCxcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlQ2FwdHVyZTogc2Nyb2xsVG91Y2hNb3ZlLFxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzaG91bGRQcmV2ZW50LCBub25QYXNzaXZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc2hvdWxkUHJldmVudCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzY3JvbGxUb3VjaFN0YXJ0LCBub25QYXNzaXZlKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxvY2tTdGFjayA9IGxvY2tTdGFjay5maWx0ZXIoZnVuY3Rpb24gKGluc3QpIHsgcmV0dXJuIGluc3QgIT09IFN0eWxlOyB9KTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgc2hvdWxkUHJldmVudCwgbm9uUGFzc2l2ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBzaG91bGRQcmV2ZW50LCBub25QYXNzaXZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzY3JvbGxUb3VjaFN0YXJ0LCBub25QYXNzaXZlKTtcbiAgICAgICAgfTtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHJlbW92ZVNjcm9sbEJhciA9IHByb3BzLnJlbW92ZVNjcm9sbEJhciwgaW5lcnQgPSBwcm9wcy5pbmVydDtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIGluZXJ0ID8gUmVhY3QuY3JlYXRlRWxlbWVudChTdHlsZSwgeyBzdHlsZXM6IGdlbmVyYXRlU3R5bGUoaWQpIH0pIDogbnVsbCxcbiAgICAgICAgcmVtb3ZlU2Nyb2xsQmFyID8gUmVhY3QuY3JlYXRlRWxlbWVudChSZW1vdmVTY3JvbGxCYXIsIHsgbm9SZWxhdGl2ZTogcHJvcHMubm9SZWxhdGl2ZSwgZ2FwTW9kZTogcHJvcHMuZ2FwTW9kZSB9KSA6IG51bGwpKTtcbn1cbmZ1bmN0aW9uIGdldE91dGVybW9zdFNoYWRvd1BhcmVudChub2RlKSB7XG4gICAgdmFyIHNoYWRvd1BhcmVudCA9IG51bGw7XG4gICAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBTaGFkb3dSb290KSB7XG4gICAgICAgICAgICBzaGFkb3dQYXJlbnQgPSBub2RlLmhvc3Q7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5ob3N0O1xuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBzaGFkb3dQYXJlbnQ7XG59XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19yZXN0IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmdWxsV2lkdGhDbGFzc05hbWUsIHplcm9SaWdodENsYXNzTmFtZSB9IGZyb20gJ3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB1c2VNZXJnZVJlZnMgfSBmcm9tICd1c2UtY2FsbGJhY2stcmVmJztcbmltcG9ydCB7IGVmZmVjdENhciB9IGZyb20gJy4vbWVkaXVtJztcbnZhciBub3RoaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybjtcbn07XG4vKipcbiAqIFJlbW92ZXMgc2Nyb2xsYmFyIGZyb20gdGhlIHBhZ2UgYW5kIGNvbnRhaW4gdGhlIHNjcm9sbCB3aXRoaW4gdGhlIExvY2tcbiAqL1xudmFyIFJlbW92ZVNjcm9sbCA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCBwYXJlbnRSZWYpIHtcbiAgICB2YXIgcmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIHZhciBfYSA9IFJlYWN0LnVzZVN0YXRlKHtcbiAgICAgICAgb25TY3JvbGxDYXB0dXJlOiBub3RoaW5nLFxuICAgICAgICBvbldoZWVsQ2FwdHVyZTogbm90aGluZyxcbiAgICAgICAgb25Ub3VjaE1vdmVDYXB0dXJlOiBub3RoaW5nLFxuICAgIH0pLCBjYWxsYmFja3MgPSBfYVswXSwgc2V0Q2FsbGJhY2tzID0gX2FbMV07XG4gICAgdmFyIGZvcndhcmRQcm9wcyA9IHByb3BzLmZvcndhcmRQcm9wcywgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbiwgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLCByZW1vdmVTY3JvbGxCYXIgPSBwcm9wcy5yZW1vdmVTY3JvbGxCYXIsIGVuYWJsZWQgPSBwcm9wcy5lbmFibGVkLCBzaGFyZHMgPSBwcm9wcy5zaGFyZHMsIHNpZGVDYXIgPSBwcm9wcy5zaWRlQ2FyLCBub1JlbGF0aXZlID0gcHJvcHMubm9SZWxhdGl2ZSwgbm9Jc29sYXRpb24gPSBwcm9wcy5ub0lzb2xhdGlvbiwgaW5lcnQgPSBwcm9wcy5pbmVydCwgYWxsb3dQaW5jaFpvb20gPSBwcm9wcy5hbGxvd1BpbmNoWm9vbSwgX2IgPSBwcm9wcy5hcywgQ29udGFpbmVyID0gX2IgPT09IHZvaWQgMCA/ICdkaXYnIDogX2IsIGdhcE1vZGUgPSBwcm9wcy5nYXBNb2RlLCByZXN0ID0gX19yZXN0KHByb3BzLCBbXCJmb3J3YXJkUHJvcHNcIiwgXCJjaGlsZHJlblwiLCBcImNsYXNzTmFtZVwiLCBcInJlbW92ZVNjcm9sbEJhclwiLCBcImVuYWJsZWRcIiwgXCJzaGFyZHNcIiwgXCJzaWRlQ2FyXCIsIFwibm9SZWxhdGl2ZVwiLCBcIm5vSXNvbGF0aW9uXCIsIFwiaW5lcnRcIiwgXCJhbGxvd1BpbmNoWm9vbVwiLCBcImFzXCIsIFwiZ2FwTW9kZVwiXSk7XG4gICAgdmFyIFNpZGVDYXIgPSBzaWRlQ2FyO1xuICAgIHZhciBjb250YWluZXJSZWYgPSB1c2VNZXJnZVJlZnMoW3JlZiwgcGFyZW50UmVmXSk7XG4gICAgdmFyIGNvbnRhaW5lclByb3BzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3QpLCBjYWxsYmFja3MpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgZW5hYmxlZCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChTaWRlQ2FyLCB7IHNpZGVDYXI6IGVmZmVjdENhciwgcmVtb3ZlU2Nyb2xsQmFyOiByZW1vdmVTY3JvbGxCYXIsIHNoYXJkczogc2hhcmRzLCBub1JlbGF0aXZlOiBub1JlbGF0aXZlLCBub0lzb2xhdGlvbjogbm9Jc29sYXRpb24sIGluZXJ0OiBpbmVydCwgc2V0Q2FsbGJhY2tzOiBzZXRDYWxsYmFja3MsIGFsbG93UGluY2hab29tOiAhIWFsbG93UGluY2hab29tLCBsb2NrUmVmOiByZWYsIGdhcE1vZGU6IGdhcE1vZGUgfSkpLFxuICAgICAgICBmb3J3YXJkUHJvcHMgPyAoUmVhY3QuY2xvbmVFbGVtZW50KFJlYWN0LkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY29udGFpbmVyUHJvcHMpLCB7IHJlZjogY29udGFpbmVyUmVmIH0pKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChDb250YWluZXIsIF9fYXNzaWduKHt9LCBjb250YWluZXJQcm9wcywgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgcmVmOiBjb250YWluZXJSZWYgfSksIGNoaWxkcmVuKSkpKTtcbn0pO1xuUmVtb3ZlU2Nyb2xsLmRlZmF1bHRQcm9wcyA9IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIHJlbW92ZVNjcm9sbEJhcjogdHJ1ZSxcbiAgICBpbmVydDogZmFsc2UsXG59O1xuUmVtb3ZlU2Nyb2xsLmNsYXNzTmFtZXMgPSB7XG4gICAgZnVsbFdpZHRoOiBmdWxsV2lkdGhDbGFzc05hbWUsXG4gICAgemVyb1JpZ2h0OiB6ZXJvUmlnaHRDbGFzc05hbWUsXG59O1xuZXhwb3J0IHsgUmVtb3ZlU2Nyb2xsIH07XG4iLCJ2YXIgcGFzc2l2ZVN1cHBvcnRlZCA9IGZhbHNlO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcGFzc2l2ZVN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0Jywgb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgcGFzc2l2ZVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydCB2YXIgbm9uUGFzc2l2ZSA9IHBhc3NpdmVTdXBwb3J0ZWQgPyB7IHBhc3NpdmU6IGZhbHNlIH0gOiBmYWxzZTtcbiIsInZhciBhbHdheXNDb250YWluc1Njcm9sbCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgLy8gdGV4dGFyZWEgd2lsbCBhbHdheXMgX2NvbnRhaW5fIHNjcm9sbCBpbnNpZGUgc2VsZi4gSXQgb25seSBjYW4gYmUgaGlkZGVuXG4gICAgcmV0dXJuIG5vZGUudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJztcbn07XG52YXIgZWxlbWVudENhbkJlU2Nyb2xsZWQgPSBmdW5jdGlvbiAobm9kZSwgb3ZlcmZsb3cpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgcmV0dXJuIChcbiAgICAvLyBub3Qtbm90LXNjcm9sbGFibGVcbiAgICBzdHlsZXNbb3ZlcmZsb3ddICE9PSAnaGlkZGVuJyAmJlxuICAgICAgICAvLyBjb250YWlucyBzY3JvbGwgaW5zaWRlIHNlbGZcbiAgICAgICAgIShzdHlsZXMub3ZlcmZsb3dZID09PSBzdHlsZXMub3ZlcmZsb3dYICYmICFhbHdheXNDb250YWluc1Njcm9sbChub2RlKSAmJiBzdHlsZXNbb3ZlcmZsb3ddID09PSAndmlzaWJsZScpKTtcbn07XG52YXIgZWxlbWVudENvdWxkQmVWU2Nyb2xsZWQgPSBmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gZWxlbWVudENhbkJlU2Nyb2xsZWQobm9kZSwgJ292ZXJmbG93WScpOyB9O1xudmFyIGVsZW1lbnRDb3VsZEJlSFNjcm9sbGVkID0gZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIGVsZW1lbnRDYW5CZVNjcm9sbGVkKG5vZGUsICdvdmVyZmxvd1gnKTsgfTtcbmV4cG9ydCB2YXIgbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQgPSBmdW5jdGlvbiAoYXhpcywgbm9kZSkge1xuICAgIHZhciBvd25lckRvY3VtZW50ID0gbm9kZS5vd25lckRvY3VtZW50O1xuICAgIHZhciBjdXJyZW50ID0gbm9kZTtcbiAgICBkbyB7XG4gICAgICAgIC8vIFNraXAgb3ZlciBzaGFkb3cgcm9vdFxuICAgICAgICBpZiAodHlwZW9mIFNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnICYmIGN1cnJlbnQgaW5zdGFuY2VvZiBTaGFkb3dSb290KSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5ob3N0O1xuICAgICAgICB9XG4gICAgICAgIHZhciBpc1Njcm9sbGFibGUgPSBlbGVtZW50Q291bGRCZVNjcm9sbGVkKGF4aXMsIGN1cnJlbnQpO1xuICAgICAgICBpZiAoaXNTY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICB2YXIgX2EgPSBnZXRTY3JvbGxWYXJpYWJsZXMoYXhpcywgY3VycmVudCksIHNjcm9sbEhlaWdodCA9IF9hWzFdLCBjbGllbnRIZWlnaHQgPSBfYVsyXTtcbiAgICAgICAgICAgIGlmIChzY3JvbGxIZWlnaHQgPiBjbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xuICAgIH0gd2hpbGUgKGN1cnJlbnQgJiYgY3VycmVudCAhPT0gb3duZXJEb2N1bWVudC5ib2R5KTtcbiAgICByZXR1cm4gZmFsc2U7XG59O1xudmFyIGdldFZTY3JvbGxWYXJpYWJsZXMgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gX2Euc2Nyb2xsVG9wLCBzY3JvbGxIZWlnaHQgPSBfYS5zY3JvbGxIZWlnaHQsIGNsaWVudEhlaWdodCA9IF9hLmNsaWVudEhlaWdodDtcbiAgICByZXR1cm4gW1xuICAgICAgICBzY3JvbGxUb3AsXG4gICAgICAgIHNjcm9sbEhlaWdodCxcbiAgICAgICAgY2xpZW50SGVpZ2h0LFxuICAgIF07XG59O1xudmFyIGdldEhTY3JvbGxWYXJpYWJsZXMgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgc2Nyb2xsTGVmdCA9IF9hLnNjcm9sbExlZnQsIHNjcm9sbFdpZHRoID0gX2Euc2Nyb2xsV2lkdGgsIGNsaWVudFdpZHRoID0gX2EuY2xpZW50V2lkdGg7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgc2Nyb2xsTGVmdCxcbiAgICAgICAgc2Nyb2xsV2lkdGgsXG4gICAgICAgIGNsaWVudFdpZHRoLFxuICAgIF07XG59O1xudmFyIGVsZW1lbnRDb3VsZEJlU2Nyb2xsZWQgPSBmdW5jdGlvbiAoYXhpcywgbm9kZSkge1xuICAgIHJldHVybiBheGlzID09PSAndicgPyBlbGVtZW50Q291bGRCZVZTY3JvbGxlZChub2RlKSA6IGVsZW1lbnRDb3VsZEJlSFNjcm9sbGVkKG5vZGUpO1xufTtcbnZhciBnZXRTY3JvbGxWYXJpYWJsZXMgPSBmdW5jdGlvbiAoYXhpcywgbm9kZSkge1xuICAgIHJldHVybiBheGlzID09PSAndicgPyBnZXRWU2Nyb2xsVmFyaWFibGVzKG5vZGUpIDogZ2V0SFNjcm9sbFZhcmlhYmxlcyhub2RlKTtcbn07XG52YXIgZ2V0RGlyZWN0aW9uRmFjdG9yID0gZnVuY3Rpb24gKGF4aXMsIGRpcmVjdGlvbikge1xuICAgIC8qKlxuICAgICAqIElmIHRoZSBlbGVtZW50J3MgZGlyZWN0aW9uIGlzIHJ0bCAocmlnaHQtdG8tbGVmdCksIHRoZW4gc2Nyb2xsTGVmdCBpcyAwIHdoZW4gdGhlIHNjcm9sbGJhciBpcyBhdCBpdHMgcmlnaHRtb3N0IHBvc2l0aW9uLFxuICAgICAqIGFuZCB0aGVuIGluY3JlYXNpbmdseSBuZWdhdGl2ZSBhcyB5b3Ugc2Nyb2xsIHRvd2FyZHMgdGhlIGVuZCBvZiB0aGUgY29udGVudC5cbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L3Njcm9sbExlZnRcbiAgICAgKi9cbiAgICByZXR1cm4gYXhpcyA9PT0gJ2gnICYmIGRpcmVjdGlvbiA9PT0gJ3J0bCcgPyAtMSA6IDE7XG59O1xuZXhwb3J0IHZhciBoYW5kbGVTY3JvbGwgPSBmdW5jdGlvbiAoYXhpcywgZW5kVGFyZ2V0LCBldmVudCwgc291cmNlRGVsdGEsIG5vT3ZlcnNjcm9sbCkge1xuICAgIHZhciBkaXJlY3Rpb25GYWN0b3IgPSBnZXREaXJlY3Rpb25GYWN0b3IoYXhpcywgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZW5kVGFyZ2V0KS5kaXJlY3Rpb24pO1xuICAgIHZhciBkZWx0YSA9IGRpcmVjdGlvbkZhY3RvciAqIHNvdXJjZURlbHRhO1xuICAgIC8vIGZpbmQgc2Nyb2xsYWJsZSB0YXJnZXRcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciB0YXJnZXRJbkxvY2sgPSBlbmRUYXJnZXQuY29udGFpbnModGFyZ2V0KTtcbiAgICB2YXIgc2hvdWxkQ2FuY2VsU2Nyb2xsID0gZmFsc2U7XG4gICAgdmFyIGlzRGVsdGFQb3NpdGl2ZSA9IGRlbHRhID4gMDtcbiAgICB2YXIgYXZhaWxhYmxlU2Nyb2xsID0gMDtcbiAgICB2YXIgYXZhaWxhYmxlU2Nyb2xsVG9wID0gMDtcbiAgICBkbyB7XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSBnZXRTY3JvbGxWYXJpYWJsZXMoYXhpcywgdGFyZ2V0KSwgcG9zaXRpb24gPSBfYVswXSwgc2Nyb2xsXzEgPSBfYVsxXSwgY2FwYWNpdHkgPSBfYVsyXTtcbiAgICAgICAgdmFyIGVsZW1lbnRTY3JvbGwgPSBzY3JvbGxfMSAtIGNhcGFjaXR5IC0gZGlyZWN0aW9uRmFjdG9yICogcG9zaXRpb247XG4gICAgICAgIGlmIChwb3NpdGlvbiB8fCBlbGVtZW50U2Nyb2xsKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudENvdWxkQmVTY3JvbGxlZChheGlzLCB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlU2Nyb2xsICs9IGVsZW1lbnRTY3JvbGw7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlU2Nyb2xsVG9wICs9IHBvc2l0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJlbnRfMSA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAvLyB3ZSB3aWxsIFwiYnViYmxlXCIgZnJvbSBTaGFkb3dEb20gaW4gY2FzZSB3ZSBhcmUsIG9yIGp1c3QgdG8gdGhlIHBhcmVudCBpbiBub3JtYWwgY2FzZVxuICAgICAgICAvLyB0aGlzIGlzIHRoZSBzYW1lIGxvZ2ljIHVzZWQgaW4gZm9jdXMtbG9ja1xuICAgICAgICB0YXJnZXQgPSAocGFyZW50XzEgJiYgcGFyZW50XzEubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA/IHBhcmVudF8xLmhvc3QgOiBwYXJlbnRfMSk7XG4gICAgfSB3aGlsZSAoXG4gICAgLy8gcG9ydGFsZWQgY29udGVudFxuICAgICghdGFyZ2V0SW5Mb2NrICYmIHRhcmdldCAhPT0gZG9jdW1lbnQuYm9keSkgfHxcbiAgICAgICAgLy8gc2VsZiBjb250ZW50XG4gICAgICAgICh0YXJnZXRJbkxvY2sgJiYgKGVuZFRhcmdldC5jb250YWlucyh0YXJnZXQpIHx8IGVuZFRhcmdldCA9PT0gdGFyZ2V0KSkpO1xuICAgIC8vIGhhbmRsZSBlcHNpbG9uIGFyb3VuZCAwIChub24gc3RhbmRhcmQgem9vbSBsZXZlbHMpXG4gICAgaWYgKGlzRGVsdGFQb3NpdGl2ZSAmJlxuICAgICAgICAoKG5vT3ZlcnNjcm9sbCAmJiBNYXRoLmFicyhhdmFpbGFibGVTY3JvbGwpIDwgMSkgfHwgKCFub092ZXJzY3JvbGwgJiYgZGVsdGEgPiBhdmFpbGFibGVTY3JvbGwpKSkge1xuICAgICAgICBzaG91bGRDYW5jZWxTY3JvbGwgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmICghaXNEZWx0YVBvc2l0aXZlICYmXG4gICAgICAgICgobm9PdmVyc2Nyb2xsICYmIE1hdGguYWJzKGF2YWlsYWJsZVNjcm9sbFRvcCkgPCAxKSB8fCAoIW5vT3ZlcnNjcm9sbCAmJiAtZGVsdGEgPiBhdmFpbGFibGVTY3JvbGxUb3ApKSkge1xuICAgICAgICBzaG91bGRDYW5jZWxTY3JvbGwgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2hvdWxkQ2FuY2VsU2Nyb2xsO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZVNpZGVjYXJNZWRpdW0gfSBmcm9tICd1c2Utc2lkZWNhcic7XG5leHBvcnQgdmFyIGVmZmVjdENhciA9IGNyZWF0ZVNpZGVjYXJNZWRpdW0oKTtcbiIsImltcG9ydCB7IGV4cG9ydFNpZGVjYXIgfSBmcm9tICd1c2Utc2lkZWNhcic7XG5pbXBvcnQgeyBSZW1vdmVTY3JvbGxTaWRlQ2FyIH0gZnJvbSAnLi9TaWRlRWZmZWN0JztcbmltcG9ydCB7IGVmZmVjdENhciB9IGZyb20gJy4vbWVkaXVtJztcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydFNpZGVjYXIoZWZmZWN0Q2FyLCBSZW1vdmVTY3JvbGxTaWRlQ2FyKTtcbiIsImltcG9ydCB7IHN0eWxlSG9va1NpbmdsZXRvbiB9IGZyb20gJy4vaG9vayc7XG4vKipcbiAqIGNyZWF0ZSBhIENvbXBvbmVudCB0byBhZGQgc3R5bGVzIG9uIGRlbWFuZFxuICogLSBzdHlsZXMgYXJlIGFkZGVkIHdoZW4gZmlyc3QgaW5zdGFuY2UgaXMgbW91bnRlZFxuICogLSBzdHlsZXMgYXJlIHJlbW92ZWQgd2hlbiB0aGUgbGFzdCBpbnN0YW5jZSBpcyB1bm1vdW50ZWRcbiAqIC0gY2hhbmdpbmcgc3R5bGVzIGluIHJ1bnRpbWUgZG9lcyBub3RoaW5nIHVubGVzcyBkeW5hbWljIGlzIHNldC4gQnV0IHdpdGggbXVsdGlwbGUgY29tcG9uZW50cyB0aGF0IGNhbiBsZWFkIHRvIHRoZSB1bmRlZmluZWQgYmVoYXZpb3JcbiAqL1xuZXhwb3J0IHZhciBzdHlsZVNpbmdsZXRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdXNlU3R5bGUgPSBzdHlsZUhvb2tTaW5nbGV0b24oKTtcbiAgICB2YXIgU2hlZXQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHN0eWxlcyA9IF9hLnN0eWxlcywgZHluYW1pYyA9IF9hLmR5bmFtaWM7XG4gICAgICAgIHVzZVN0eWxlKHN0eWxlcywgZHluYW1pYyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIFNoZWV0O1xufTtcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN0eWxlc2hlZXRTaW5nbGV0b24gfSBmcm9tICcuL3NpbmdsZXRvbic7XG4vKipcbiAqIGNyZWF0ZXMgYSBob29rIHRvIGNvbnRyb2wgc3R5bGUgc2luZ2xldG9uXG4gKiBAc2VlIHtAbGluayBzdHlsZVNpbmdsZXRvbn0gZm9yIGEgc2FmZXIgY29tcG9uZW50IHZlcnNpb25cbiAqIEBleGFtcGxlXG4gKiBgYGB0c3hcbiAqIGNvbnN0IHVzZVN0eWxlID0gc3R5bGVIb29rU2luZ2xldG9uKCk7XG4gKiAvLy9cbiAqIHVzZVN0eWxlKCdib2R5IHsgb3ZlcmZsb3c6IGhpZGRlbn0nKTtcbiAqL1xuZXhwb3J0IHZhciBzdHlsZUhvb2tTaW5nbGV0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNoZWV0ID0gc3R5bGVzaGVldFNpbmdsZXRvbigpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3R5bGVzLCBpc0R5bmFtaWMpIHtcbiAgICAgICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNoZWV0LmFkZChzdHlsZXMpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzaGVldC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIFtzdHlsZXMgJiYgaXNEeW5hbWljXSk7XG4gICAgfTtcbn07XG4iLCJleHBvcnQgeyBzdHlsZVNpbmdsZXRvbiB9IGZyb20gJy4vY29tcG9uZW50JztcbmV4cG9ydCB7IHN0eWxlc2hlZXRTaW5nbGV0b24gfSBmcm9tICcuL3NpbmdsZXRvbic7XG5leHBvcnQgeyBzdHlsZUhvb2tTaW5nbGV0b24gfSBmcm9tICcuL2hvb2snO1xuIiwiaW1wb3J0IHsgZ2V0Tm9uY2UgfSBmcm9tICdnZXQtbm9uY2UnO1xuZnVuY3Rpb24gbWFrZVN0eWxlVGFnKCkge1xuICAgIGlmICghZG9jdW1lbnQpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIHZhciB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHRhZy50eXBlID0gJ3RleHQvY3NzJztcbiAgICB2YXIgbm9uY2UgPSBnZXROb25jZSgpO1xuICAgIGlmIChub25jZSkge1xuICAgICAgICB0YWcuc2V0QXR0cmlidXRlKCdub25jZScsIG5vbmNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhZztcbn1cbmZ1bmN0aW9uIGluamVjdFN0eWxlcyh0YWcsIGNzcykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodGFnLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0YWcuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGluc2VydFN0eWxlVGFnKHRhZykge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQodGFnKTtcbn1cbmV4cG9ydCB2YXIgc3R5bGVzaGVldFNpbmdsZXRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY291bnRlciA9IDA7XG4gICAgdmFyIHN0eWxlc2hlZXQgPSBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICAgICAgICBpZiAoY291bnRlciA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKChzdHlsZXNoZWV0ID0gbWFrZVN0eWxlVGFnKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGluamVjdFN0eWxlcyhzdHlsZXNoZWV0LCBzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydFN0eWxlVGFnKHN0eWxlc2hlZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb3VudGVyLS07XG4gICAgICAgICAgICBpZiAoIWNvdW50ZXIgJiYgc3R5bGVzaGVldCkge1xuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQucGFyZW50Tm9kZSAmJiBzdHlsZXNoZWV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVzaGVldCk7XG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn07XG4iLCIvKipcbiAqIEFzc2lnbnMgYSB2YWx1ZSBmb3IgYSBnaXZlbiByZWYsIG5vIG1hdHRlciBvZiB0aGUgcmVmIGZvcm1hdFxuICogQHBhcmFtIHtSZWZPYmplY3R9IHJlZiAtIGEgY2FsbGJhY2sgZnVuY3Rpb24gb3IgcmVmIG9iamVjdFxuICogQHBhcmFtIHZhbHVlIC0gYSBuZXcgdmFsdWVcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvdXNlLWNhbGxiYWNrLXJlZiNhc3NpZ25yZWZcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByZWZPYmplY3QgPSB1c2VSZWYoKTtcbiAqIGNvbnN0IHJlZkZuID0gKHJlZikgPT4gey4uLi59XG4gKlxuICogYXNzaWduUmVmKHJlZk9iamVjdCwgXCJyZWZWYWx1ZVwiKTtcbiAqIGFzc2lnblJlZihyZWZGbiwgXCJyZWZWYWx1ZVwiKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnblJlZihyZWYsIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiByZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVmKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVmKSB7XG4gICAgICAgIHJlZi5jdXJyZW50ID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZWY7XG59XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhc3NpZ25SZWYgfSBmcm9tICcuL2Fzc2lnblJlZic7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gJy4vdXNlUmVmJztcbnZhciB1c2VJc29tb3JwaGljTGF5b3V0RWZmZWN0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBSZWFjdC51c2VMYXlvdXRFZmZlY3QgOiBSZWFjdC51c2VFZmZlY3Q7XG52YXIgY3VycmVudFZhbHVlcyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIE1lcmdlcyB0d28gb3IgbW9yZSByZWZzIHRvZ2V0aGVyIHByb3ZpZGluZyBhIHNpbmdsZSBpbnRlcmZhY2UgdG8gc2V0IHRoZWlyIHZhbHVlXG4gKiBAcGFyYW0ge1JlZk9iamVjdHxSZWZ9IHJlZnNcbiAqIEByZXR1cm5zIHtNdXRhYmxlUmVmT2JqZWN0fSAtIGEgbmV3IHJlZiwgd2hpY2ggdHJhbnNsYXRlcyBhbGwgY2hhbmdlcyB0byB7cmVmc31cbiAqXG4gKiBAc2VlIHtAbGluayBtZXJnZVJlZnN9IGEgdmVyc2lvbiB3aXRob3V0IGJ1aXQtaW4gbWVtb2l6YXRpb25cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI3VzZW1lcmdlcmVmc1xuICogQGV4YW1wbGVcbiAqIGNvbnN0IENvbXBvbmVudCA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcbiAqICAgY29uc3Qgb3duUmVmID0gdXNlUmVmKCk7XG4gKiAgIGNvbnN0IGRvbVJlZiA9IHVzZU1lcmdlUmVmcyhbcmVmLCBvd25SZWZdKTsgLy8g8J+RiCBtZXJnZSB0b2dldGhlclxuICogICByZXR1cm4gPGRpdiByZWY9e2RvbVJlZn0+Li4uPC9kaXY+XG4gKiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VNZXJnZVJlZnMocmVmcywgZGVmYXVsdFZhbHVlKSB7XG4gICAgdmFyIGNhbGxiYWNrUmVmID0gdXNlQ2FsbGJhY2tSZWYoZGVmYXVsdFZhbHVlIHx8IG51bGwsIGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICByZXR1cm4gcmVmcy5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHsgcmV0dXJuIGFzc2lnblJlZihyZWYsIG5ld1ZhbHVlKTsgfSk7XG4gICAgfSk7XG4gICAgLy8gaGFuZGxlIHJlZnMgY2hhbmdlcyAtIGFkZGVkIG9yIHJlbW92ZWRcbiAgICB1c2VJc29tb3JwaGljTGF5b3V0RWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gY3VycmVudFZhbHVlcy5nZXQoY2FsbGJhY2tSZWYpO1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBwcmV2UmVmc18xID0gbmV3IFNldChvbGRWYWx1ZSk7XG4gICAgICAgICAgICB2YXIgbmV4dFJlZnNfMSA9IG5ldyBTZXQocmVmcyk7XG4gICAgICAgICAgICB2YXIgY3VycmVudF8xID0gY2FsbGJhY2tSZWYuY3VycmVudDtcbiAgICAgICAgICAgIHByZXZSZWZzXzEuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0UmVmc18xLmhhcyhyZWYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnblJlZihyZWYsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmV4dFJlZnNfMS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXByZXZSZWZzXzEuaGFzKHJlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduUmVmKHJlZiwgY3VycmVudF8xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50VmFsdWVzLnNldChjYWxsYmFja1JlZiwgcmVmcyk7XG4gICAgfSwgW3JlZnNdKTtcbiAgICByZXR1cm4gY2FsbGJhY2tSZWY7XG59XG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogY3JlYXRlcyBhIE11dGFibGVSZWYgd2l0aCByZWYgY2hhbmdlIGNhbGxiYWNrXG4gKiBAcGFyYW0gaW5pdGlhbFZhbHVlIC0gaW5pdGlhbCByZWYgdmFsdWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gYSBjYWxsYmFjayB0byBydW4gd2hlbiB2YWx1ZSBjaGFuZ2VzXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHJlZiA9IHVzZUNhbGxiYWNrUmVmKDAsIChuZXdWYWx1ZSwgb2xkVmFsdWUpID0+IGNvbnNvbGUubG9nKG9sZFZhbHVlLCAnLT4nLCBuZXdWYWx1ZSk7XG4gKiByZWYuY3VycmVudCA9IDE7XG4gKiAvLyBwcmludHMgMCAtPiAxXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvaG9va3MtcmVmZXJlbmNlLmh0bWwjdXNlcmVmXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvdXNlLWNhbGxiYWNrLXJlZiN1c2VjYWxsYmFja3JlZi0tLXRvLXJlcGxhY2UtcmVhY3R1c2VyZWZcbiAqIEByZXR1cm5zIHtNdXRhYmxlUmVmT2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FsbGJhY2tSZWYoaW5pdGlhbFZhbHVlLCBjYWxsYmFjaykge1xuICAgIHZhciByZWYgPSB1c2VTdGF0ZShmdW5jdGlvbiAoKSB7IHJldHVybiAoe1xuICAgICAgICAvLyB2YWx1ZVxuICAgICAgICB2YWx1ZTogaW5pdGlhbFZhbHVlLFxuICAgICAgICAvLyBsYXN0IGNhbGxiYWNrXG4gICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgLy8gXCJtZW1vaXplZFwiIHB1YmxpYyBpbnRlcmZhY2VcbiAgICAgICAgZmFjYWRlOiB7XG4gICAgICAgICAgICBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVmLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBjdXJyZW50KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSByZWYudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZi52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZWYuY2FsbGJhY2sodmFsdWUsIGxhc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSk7IH0pWzBdO1xuICAgIC8vIHVwZGF0ZSBjYWxsYmFja1xuICAgIHJlZi5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHJldHVybiByZWYuZmFjYWRlO1xufVxuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fcmVzdCB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xudmFyIFNpZGVDYXIgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgc2lkZUNhciA9IF9hLnNpZGVDYXIsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInNpZGVDYXJcIl0pO1xuICAgIGlmICghc2lkZUNhcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZGVjYXI6IHBsZWFzZSBwcm92aWRlIGBzaWRlQ2FyYCBwcm9wZXJ0eSB0byBpbXBvcnQgdGhlIHJpZ2h0IGNhcicpO1xuICAgIH1cbiAgICB2YXIgVGFyZ2V0ID0gc2lkZUNhci5yZWFkKCk7XG4gICAgaWYgKCFUYXJnZXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWRlY2FyIG1lZGl1bSBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFyZ2V0LCBfX2Fzc2lnbih7fSwgcmVzdCkpO1xufTtcblNpZGVDYXIuaXNTaWRlQ2FyRXhwb3J0ID0gdHJ1ZTtcbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRTaWRlY2FyKG1lZGl1bSwgZXhwb3J0ZWQpIHtcbiAgICBtZWRpdW0udXNlTWVkaXVtKGV4cG9ydGVkKTtcbiAgICByZXR1cm4gU2lkZUNhcjtcbn1cbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG5mdW5jdGlvbiBJdG9JKGEpIHtcbiAgICByZXR1cm4gYTtcbn1cbmZ1bmN0aW9uIGlubmVyQ3JlYXRlTWVkaXVtKGRlZmF1bHRzLCBtaWRkbGV3YXJlKSB7XG4gICAgaWYgKG1pZGRsZXdhcmUgPT09IHZvaWQgMCkgeyBtaWRkbGV3YXJlID0gSXRvSTsgfVxuICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICB2YXIgYXNzaWduZWQgPSBmYWxzZTtcbiAgICB2YXIgbWVkaXVtID0ge1xuICAgICAgICByZWFkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoYXNzaWduZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZGVjYXI6IGNvdWxkIG5vdCBgcmVhZGAgZnJvbSBhbiBgYXNzaWduZWRgIG1lZGl1bS4gYHJlYWRgIGNvdWxkIGJlIHVzZWQgb25seSB3aXRoIGB1c2VNZWRpdW1gLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyW2J1ZmZlci5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICAgICAgfSxcbiAgICAgICAgdXNlTWVkaXVtOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBtaWRkbGV3YXJlKGRhdGEsIGFzc2lnbmVkKTtcbiAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBidWZmZXIuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICE9PSBpdGVtOyB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnblN5bmNNZWRpdW06IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgYXNzaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2JzID0gYnVmZmVyO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgIGNicy5mb3JFYWNoKGNiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1ZmZlciA9IHtcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbiAoeCkgeyByZXR1cm4gY2IoeCk7IH0sXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBidWZmZXI7IH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBhc3NpZ25NZWRpdW06IGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgYXNzaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHBlbmRpbmdRdWV1ZSA9IFtdO1xuICAgICAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2JzID0gYnVmZmVyO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICAgIGNicy5mb3JFYWNoKGNiKTtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUgPSBidWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZXhlY3V0ZVF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBjYnMgPSBwZW5kaW5nUXVldWU7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1F1ZXVlID0gW107XG4gICAgICAgICAgICAgICAgY2JzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBjeWNsZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZXhlY3V0ZVF1ZXVlKTsgfTtcbiAgICAgICAgICAgIGN5Y2xlKCk7XG4gICAgICAgICAgICBidWZmZXIgPSB7XG4gICAgICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1F1ZXVlLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIGN5Y2xlKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1F1ZXVlID0gcGVuZGluZ1F1ZXVlLmZpbHRlcihmaWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIG1lZGl1bTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNZWRpdW0oZGVmYXVsdHMsIG1pZGRsZXdhcmUpIHtcbiAgICBpZiAobWlkZGxld2FyZSA9PT0gdm9pZCAwKSB7IG1pZGRsZXdhcmUgPSBJdG9JOyB9XG4gICAgcmV0dXJuIGlubmVyQ3JlYXRlTWVkaXVtKGRlZmF1bHRzLCBtaWRkbGV3YXJlKTtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2lkZWNhck1lZGl1bShvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgbWVkaXVtID0gaW5uZXJDcmVhdGVNZWRpdW0obnVsbCk7XG4gICAgbWVkaXVtLm9wdGlvbnMgPSBfX2Fzc2lnbih7IGFzeW5jOiB0cnVlLCBzc3I6IGZhbHNlIH0sIG9wdGlvbnMpO1xuICAgIHJldHVybiBtZWRpdW07XG59XG4iLCIvLyBzcmMvcHJpbWl0aXZlLnRzeFxudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbmZ1bmN0aW9uIGNvbXBvc2VFdmVudEhhbmRsZXJzKG9yaWdpbmFsRXZlbnRIYW5kbGVyLCBvdXJFdmVudEhhbmRsZXIsIHsgY2hlY2tGb3JEZWZhdWx0UHJldmVudGVkID0gdHJ1ZSB9ID0ge30pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgb3JpZ2luYWxFdmVudEhhbmRsZXI/LihldmVudCk7XG4gICAgaWYgKGNoZWNrRm9yRGVmYXVsdFByZXZlbnRlZCA9PT0gZmFsc2UgfHwgIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVybiBvdXJFdmVudEhhbmRsZXI/LihldmVudCk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0T3duZXJXaW5kb3coZWxlbWVudCkge1xuICBpZiAoIWNhblVzZURPTSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBhY2Nlc3Mgd2luZG93IG91dHNpZGUgb2YgdGhlIERPTVwiKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudD8ub3duZXJEb2N1bWVudD8uZGVmYXVsdFZpZXcgPz8gd2luZG93O1xufVxuZnVuY3Rpb24gZ2V0T3duZXJEb2N1bWVudChlbGVtZW50KSB7XG4gIGlmICghY2FuVXNlRE9NKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFjY2VzcyBkb2N1bWVudCBvdXRzaWRlIG9mIHRoZSBET01cIik7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ/Lm93bmVyRG9jdW1lbnQgPz8gZG9jdW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRBY3RpdmVFbGVtZW50KG5vZGUsIGFjdGl2ZURlc2NlbmRhbnQgPSBmYWxzZSkge1xuICBjb25zdCB7IGFjdGl2ZUVsZW1lbnQgfSA9IGdldE93bmVyRG9jdW1lbnQobm9kZSk7XG4gIGlmICghYWN0aXZlRWxlbWVudD8ubm9kZU5hbWUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoaXNGcmFtZShhY3RpdmVFbGVtZW50KSAmJiBhY3RpdmVFbGVtZW50LmNvbnRlbnREb2N1bWVudCkge1xuICAgIHJldHVybiBnZXRBY3RpdmVFbGVtZW50KGFjdGl2ZUVsZW1lbnQuY29udGVudERvY3VtZW50LmJvZHksIGFjdGl2ZURlc2NlbmRhbnQpO1xuICB9XG4gIGlmIChhY3RpdmVEZXNjZW5kYW50KSB7XG4gICAgY29uc3QgaWQgPSBhY3RpdmVFbGVtZW50LmdldEF0dHJpYnV0ZShcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRPd25lckRvY3VtZW50KGFjdGl2ZUVsZW1lbnQpLmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYWN0aXZlRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGlzRnJhbWUoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudC50YWdOYW1lID09PSBcIklGUkFNRVwiO1xufVxuZXhwb3J0IHtcbiAgY2FuVXNlRE9NLFxuICBjb21wb3NlRXZlbnRIYW5kbGVycyxcbiAgZ2V0QWN0aXZlRWxlbWVudCxcbiAgZ2V0T3duZXJEb2N1bWVudCxcbiAgZ2V0T3duZXJXaW5kb3csXG4gIGlzRnJhbWVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC9jb250ZXh0L3NyYy9jcmVhdGUtY29udGV4dC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0Mihyb290Q29tcG9uZW50TmFtZSwgZGVmYXVsdENvbnRleHQpIHtcbiAgY29uc3QgQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoZGVmYXVsdENvbnRleHQpO1xuICBjb25zdCBQcm92aWRlciA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLmNvbnRleHQgfSA9IHByb3BzO1xuICAgIGNvbnN0IHZhbHVlID0gUmVhY3QudXNlTWVtbygoKSA9PiBjb250ZXh0LCBPYmplY3QudmFsdWVzKGNvbnRleHQpKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChDb250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlLCBjaGlsZHJlbiB9KTtcbiAgfTtcbiAgUHJvdmlkZXIuZGlzcGxheU5hbWUgPSByb290Q29tcG9uZW50TmFtZSArIFwiUHJvdmlkZXJcIjtcbiAgZnVuY3Rpb24gdXNlQ29udGV4dDIoY29uc3VtZXJOYW1lKSB7XG4gICAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoQ29udGV4dCk7XG4gICAgaWYgKGNvbnRleHQpIHJldHVybiBjb250ZXh0O1xuICAgIGlmIChkZWZhdWx0Q29udGV4dCAhPT0gdm9pZCAwKSByZXR1cm4gZGVmYXVsdENvbnRleHQ7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcXGAke2NvbnN1bWVyTmFtZX1cXGAgbXVzdCBiZSB1c2VkIHdpdGhpbiBcXGAke3Jvb3RDb21wb25lbnROYW1lfVxcYGApO1xuICB9XG4gIHJldHVybiBbUHJvdmlkZXIsIHVzZUNvbnRleHQyXTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHRTY29wZShzY29wZU5hbWUsIGNyZWF0ZUNvbnRleHRTY29wZURlcHMgPSBbXSkge1xuICBsZXQgZGVmYXVsdENvbnRleHRzID0gW107XG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQzKHJvb3RDb21wb25lbnROYW1lLCBkZWZhdWx0Q29udGV4dCkge1xuICAgIGNvbnN0IEJhc2VDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dChkZWZhdWx0Q29udGV4dCk7XG4gICAgY29uc3QgaW5kZXggPSBkZWZhdWx0Q29udGV4dHMubGVuZ3RoO1xuICAgIGRlZmF1bHRDb250ZXh0cyA9IFsuLi5kZWZhdWx0Q29udGV4dHMsIGRlZmF1bHRDb250ZXh0XTtcbiAgICBjb25zdCBQcm92aWRlciA9IChwcm9wcykgPT4ge1xuICAgICAgY29uc3QgeyBzY29wZSwgY2hpbGRyZW4sIC4uLmNvbnRleHQgfSA9IHByb3BzO1xuICAgICAgY29uc3QgQ29udGV4dCA9IHNjb3BlPy5bc2NvcGVOYW1lXT8uW2luZGV4XSB8fCBCYXNlQ29udGV4dDtcbiAgICAgIGNvbnN0IHZhbHVlID0gUmVhY3QudXNlTWVtbygoKSA9PiBjb250ZXh0LCBPYmplY3QudmFsdWVzKGNvbnRleHQpKTtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KENvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWUsIGNoaWxkcmVuIH0pO1xuICAgIH07XG4gICAgUHJvdmlkZXIuZGlzcGxheU5hbWUgPSByb290Q29tcG9uZW50TmFtZSArIFwiUHJvdmlkZXJcIjtcbiAgICBmdW5jdGlvbiB1c2VDb250ZXh0Mihjb25zdW1lck5hbWUsIHNjb3BlKSB7XG4gICAgICBjb25zdCBDb250ZXh0ID0gc2NvcGU/LltzY29wZU5hbWVdPy5baW5kZXhdIHx8IEJhc2VDb250ZXh0O1xuICAgICAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoQ29udGV4dCk7XG4gICAgICBpZiAoY29udGV4dCkgcmV0dXJuIGNvbnRleHQ7XG4gICAgICBpZiAoZGVmYXVsdENvbnRleHQgIT09IHZvaWQgMCkgcmV0dXJuIGRlZmF1bHRDb250ZXh0O1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcXGAke2NvbnN1bWVyTmFtZX1cXGAgbXVzdCBiZSB1c2VkIHdpdGhpbiBcXGAke3Jvb3RDb21wb25lbnROYW1lfVxcYGApO1xuICAgIH1cbiAgICByZXR1cm4gW1Byb3ZpZGVyLCB1c2VDb250ZXh0Ml07XG4gIH1cbiAgY29uc3QgY3JlYXRlU2NvcGUgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2NvcGVDb250ZXh0cyA9IGRlZmF1bHRDb250ZXh0cy5tYXAoKGRlZmF1bHRDb250ZXh0KSA9PiB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlQ29udGV4dChkZWZhdWx0Q29udGV4dCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVzZVNjb3BlKHNjb3BlKSB7XG4gICAgICBjb25zdCBjb250ZXh0cyA9IHNjb3BlPy5bc2NvcGVOYW1lXSB8fCBzY29wZUNvbnRleHRzO1xuICAgICAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oXG4gICAgICAgICgpID0+ICh7IFtgX19zY29wZSR7c2NvcGVOYW1lfWBdOiB7IC4uLnNjb3BlLCBbc2NvcGVOYW1lXTogY29udGV4dHMgfSB9KSxcbiAgICAgICAgW3Njb3BlLCBjb250ZXh0c11cbiAgICAgICk7XG4gICAgfTtcbiAgfTtcbiAgY3JlYXRlU2NvcGUuc2NvcGVOYW1lID0gc2NvcGVOYW1lO1xuICByZXR1cm4gW2NyZWF0ZUNvbnRleHQzLCBjb21wb3NlQ29udGV4dFNjb3BlcyhjcmVhdGVTY29wZSwgLi4uY3JlYXRlQ29udGV4dFNjb3BlRGVwcyldO1xufVxuZnVuY3Rpb24gY29tcG9zZUNvbnRleHRTY29wZXMoLi4uc2NvcGVzKSB7XG4gIGNvbnN0IGJhc2VTY29wZSA9IHNjb3Blc1swXTtcbiAgaWYgKHNjb3Blcy5sZW5ndGggPT09IDEpIHJldHVybiBiYXNlU2NvcGU7XG4gIGNvbnN0IGNyZWF0ZVNjb3BlID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjb3BlSG9va3MgPSBzY29wZXMubWFwKChjcmVhdGVTY29wZTIpID0+ICh7XG4gICAgICB1c2VTY29wZTogY3JlYXRlU2NvcGUyKCksXG4gICAgICBzY29wZU5hbWU6IGNyZWF0ZVNjb3BlMi5zY29wZU5hbWVcbiAgICB9KSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVzZUNvbXBvc2VkU2NvcGVzKG92ZXJyaWRlU2NvcGVzKSB7XG4gICAgICBjb25zdCBuZXh0U2NvcGVzID0gc2NvcGVIb29rcy5yZWR1Y2UoKG5leHRTY29wZXMyLCB7IHVzZVNjb3BlLCBzY29wZU5hbWUgfSkgPT4ge1xuICAgICAgICBjb25zdCBzY29wZVByb3BzID0gdXNlU2NvcGUob3ZlcnJpZGVTY29wZXMpO1xuICAgICAgICBjb25zdCBjdXJyZW50U2NvcGUgPSBzY29wZVByb3BzW2BfX3Njb3BlJHtzY29wZU5hbWV9YF07XG4gICAgICAgIHJldHVybiB7IC4uLm5leHRTY29wZXMyLCAuLi5jdXJyZW50U2NvcGUgfTtcbiAgICAgIH0sIHt9KTtcbiAgICAgIHJldHVybiBSZWFjdC51c2VNZW1vKCgpID0+ICh7IFtgX19zY29wZSR7YmFzZVNjb3BlLnNjb3BlTmFtZX1gXTogbmV4dFNjb3BlcyB9KSwgW25leHRTY29wZXNdKTtcbiAgICB9O1xuICB9O1xuICBjcmVhdGVTY29wZS5zY29wZU5hbWUgPSBiYXNlU2NvcGUuc2NvcGVOYW1lO1xuICByZXR1cm4gY3JlYXRlU2NvcGU7XG59XG5leHBvcnQge1xuICBjcmVhdGVDb250ZXh0MiBhcyBjcmVhdGVDb250ZXh0LFxuICBjcmVhdGVDb250ZXh0U2NvcGVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL2RpYWxvZy50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZUV2ZW50SGFuZGxlcnMgfSBmcm9tIFwiQHJhZGl4LXVpL3ByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlQ29tcG9zZWRSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIGNyZWF0ZUNvbnRleHRTY29wZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29udGV4dFwiO1xuaW1wb3J0IHsgdXNlSWQgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWlkXCI7XG5pbXBvcnQgeyB1c2VDb250cm9sbGFibGVTdGF0ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZVwiO1xuaW1wb3J0IHsgRGlzbWlzc2FibGVMYXllciB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtZGlzbWlzc2FibGUtbGF5ZXJcIjtcbmltcG9ydCB7IEZvY3VzU2NvcGUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWZvY3VzLXNjb3BlXCI7XG5pbXBvcnQgeyBQb3J0YWwgYXMgUG9ydGFsUHJpbWl0aXZlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wb3J0YWxcIjtcbmltcG9ydCB7IFByZXNlbmNlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmVzZW5jZVwiO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUZvY3VzR3VhcmRzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1mb2N1cy1ndWFyZHNcIjtcbmltcG9ydCB7IFJlbW92ZVNjcm9sbCB9IGZyb20gXCJyZWFjdC1yZW1vdmUtc2Nyb2xsXCI7XG5pbXBvcnQgeyBoaWRlT3RoZXJzIH0gZnJvbSBcImFyaWEtaGlkZGVuXCI7XG5pbXBvcnQgeyBjcmVhdGVTbG90IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI7XG5pbXBvcnQgeyBGcmFnbWVudCwganN4LCBqc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgRElBTE9HX05BTUUgPSBcIkRpYWxvZ1wiO1xudmFyIFtjcmVhdGVEaWFsb2dDb250ZXh0LCBjcmVhdGVEaWFsb2dTY29wZV0gPSBjcmVhdGVDb250ZXh0U2NvcGUoRElBTE9HX05BTUUpO1xudmFyIFtEaWFsb2dQcm92aWRlciwgdXNlRGlhbG9nQ29udGV4dF0gPSBjcmVhdGVEaWFsb2dDb250ZXh0KERJQUxPR19OQU1FKTtcbnZhciBEaWFsb2cgPSAocHJvcHMpID0+IHtcbiAgY29uc3Qge1xuICAgIF9fc2NvcGVEaWFsb2csXG4gICAgY2hpbGRyZW4sXG4gICAgb3Blbjogb3BlblByb3AsXG4gICAgZGVmYXVsdE9wZW4sXG4gICAgb25PcGVuQ2hhbmdlLFxuICAgIG1vZGFsID0gdHJ1ZVxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IHRyaWdnZXJSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNvbnRlbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZUNvbnRyb2xsYWJsZVN0YXRlKHtcbiAgICBwcm9wOiBvcGVuUHJvcCxcbiAgICBkZWZhdWx0UHJvcDogZGVmYXVsdE9wZW4gPz8gZmFsc2UsXG4gICAgb25DaGFuZ2U6IG9uT3BlbkNoYW5nZSxcbiAgICBjYWxsZXI6IERJQUxPR19OQU1FXG4gIH0pO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICBEaWFsb2dQcm92aWRlcixcbiAgICB7XG4gICAgICBzY29wZTogX19zY29wZURpYWxvZyxcbiAgICAgIHRyaWdnZXJSZWYsXG4gICAgICBjb250ZW50UmVmLFxuICAgICAgY29udGVudElkOiB1c2VJZCgpLFxuICAgICAgdGl0bGVJZDogdXNlSWQoKSxcbiAgICAgIGRlc2NyaXB0aW9uSWQ6IHVzZUlkKCksXG4gICAgICBvcGVuLFxuICAgICAgb25PcGVuQ2hhbmdlOiBzZXRPcGVuLFxuICAgICAgb25PcGVuVG9nZ2xlOiBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiBzZXRPcGVuKChwcmV2T3BlbikgPT4gIXByZXZPcGVuKSwgW3NldE9wZW5dKSxcbiAgICAgIG1vZGFsLFxuICAgICAgY2hpbGRyZW5cbiAgICB9XG4gICk7XG59O1xuRGlhbG9nLmRpc3BsYXlOYW1lID0gRElBTE9HX05BTUU7XG52YXIgVFJJR0dFUl9OQU1FID0gXCJEaWFsb2dUcmlnZ2VyXCI7XG52YXIgRGlhbG9nVHJpZ2dlciA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi50cmlnZ2VyUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KFRSSUdHRVJfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgY29tcG9zZWRUcmlnZ2VyUmVmID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgY29udGV4dC50cmlnZ2VyUmVmKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIFByaW1pdGl2ZS5idXR0b24sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgIFwiYXJpYS1oYXNwb3B1cFwiOiBcImRpYWxvZ1wiLFxuICAgICAgICBcImFyaWEtZXhwYW5kZWRcIjogY29udGV4dC5vcGVuLFxuICAgICAgICBcImFyaWEtY29udHJvbHNcIjogY29udGV4dC5jb250ZW50SWQsXG4gICAgICAgIFwiZGF0YS1zdGF0ZVwiOiBnZXRTdGF0ZShjb250ZXh0Lm9wZW4pLFxuICAgICAgICAuLi50cmlnZ2VyUHJvcHMsXG4gICAgICAgIHJlZjogY29tcG9zZWRUcmlnZ2VyUmVmLFxuICAgICAgICBvbkNsaWNrOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkNsaWNrLCBjb250ZXh0Lm9uT3BlblRvZ2dsZSlcbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xuRGlhbG9nVHJpZ2dlci5kaXNwbGF5TmFtZSA9IFRSSUdHRVJfTkFNRTtcbnZhciBQT1JUQUxfTkFNRSA9IFwiRGlhbG9nUG9ydGFsXCI7XG52YXIgW1BvcnRhbFByb3ZpZGVyLCB1c2VQb3J0YWxDb250ZXh0XSA9IGNyZWF0ZURpYWxvZ0NvbnRleHQoUE9SVEFMX05BTUUsIHtcbiAgZm9yY2VNb3VudDogdm9pZCAwXG59KTtcbnZhciBEaWFsb2dQb3J0YWwgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCBmb3JjZU1vdW50LCBjaGlsZHJlbiwgY29udGFpbmVyIH0gPSBwcm9wcztcbiAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoUE9SVEFMX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQb3J0YWxQcm92aWRlciwgeyBzY29wZTogX19zY29wZURpYWxvZywgZm9yY2VNb3VudCwgY2hpbGRyZW46IFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNoaWxkKSA9PiAvKiBAX19QVVJFX18gKi8ganN4KFByZXNlbmNlLCB7IHByZXNlbnQ6IGZvcmNlTW91bnQgfHwgY29udGV4dC5vcGVuLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeChQb3J0YWxQcmltaXRpdmUsIHsgYXNDaGlsZDogdHJ1ZSwgY29udGFpbmVyLCBjaGlsZHJlbjogY2hpbGQgfSkgfSkpIH0pO1xufTtcbkRpYWxvZ1BvcnRhbC5kaXNwbGF5TmFtZSA9IFBPUlRBTF9OQU1FO1xudmFyIE9WRVJMQVlfTkFNRSA9IFwiRGlhbG9nT3ZlcmxheVwiO1xudmFyIERpYWxvZ092ZXJsYXkgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHBvcnRhbENvbnRleHQgPSB1c2VQb3J0YWxDb250ZXh0KE9WRVJMQVlfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgeyBmb3JjZU1vdW50ID0gcG9ydGFsQ29udGV4dC5mb3JjZU1vdW50LCAuLi5vdmVybGF5UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KE9WRVJMQVlfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIGNvbnRleHQubW9kYWwgPyAvKiBAX19QVVJFX18gKi8ganN4KFByZXNlbmNlLCB7IHByZXNlbnQ6IGZvcmNlTW91bnQgfHwgY29udGV4dC5vcGVuLCBjaGlsZHJlbjogLyogQF9fUFVSRV9fICovIGpzeChEaWFsb2dPdmVybGF5SW1wbCwgeyAuLi5vdmVybGF5UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pIH0pIDogbnVsbDtcbiAgfVxuKTtcbkRpYWxvZ092ZXJsYXkuZGlzcGxheU5hbWUgPSBPVkVSTEFZX05BTUU7XG52YXIgU2xvdCA9IGNyZWF0ZVNsb3QoXCJEaWFsb2dPdmVybGF5LlJlbW92ZVNjcm9sbFwiKTtcbnZhciBEaWFsb2dPdmVybGF5SW1wbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi5vdmVybGF5UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KE9WRVJMQVlfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIE1ha2Ugc3VyZSBgQ29udGVudGAgaXMgc2Nyb2xsYWJsZSBldmVuIHdoZW4gaXQgZG9lc24ndCBsaXZlIGluc2lkZSBgUmVtb3ZlU2Nyb2xsYFxuICAgICAgLy8gaWUuIHdoZW4gYE92ZXJsYXlgIGFuZCBgQ29udGVudGAgYXJlIHNpYmxpbmdzXG4gICAgICAvKiBAX19QVVJFX18gKi8ganN4KFJlbW92ZVNjcm9sbCwgeyBhczogU2xvdCwgYWxsb3dQaW5jaFpvb206IHRydWUsIHNoYXJkczogW2NvbnRleHQuY29udGVudFJlZl0sIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgICBQcmltaXRpdmUuZGl2LFxuICAgICAgICB7XG4gICAgICAgICAgXCJkYXRhLXN0YXRlXCI6IGdldFN0YXRlKGNvbnRleHQub3BlbiksXG4gICAgICAgICAgLi4ub3ZlcmxheVByb3BzLFxuICAgICAgICAgIHJlZjogZm9yd2FyZGVkUmVmLFxuICAgICAgICAgIHN0eWxlOiB7IHBvaW50ZXJFdmVudHM6IFwiYXV0b1wiLCAuLi5vdmVybGF5UHJvcHMuc3R5bGUgfVxuICAgICAgICB9XG4gICAgICApIH0pXG4gICAgKTtcbiAgfVxuKTtcbnZhciBDT05URU5UX05BTUUgPSBcIkRpYWxvZ0NvbnRlbnRcIjtcbnZhciBEaWFsb2dDb250ZW50ID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCBwb3J0YWxDb250ZXh0ID0gdXNlUG9ydGFsQ29udGV4dChDT05URU5UX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IHsgZm9yY2VNb3VudCA9IHBvcnRhbENvbnRleHQuZm9yY2VNb3VudCwgLi4uY29udGVudFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDT05URU5UX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByZXNlbmNlLCB7IHByZXNlbnQ6IGZvcmNlTW91bnQgfHwgY29udGV4dC5vcGVuLCBjaGlsZHJlbjogY29udGV4dC5tb2RhbCA/IC8qIEBfX1BVUkVfXyAqLyBqc3goRGlhbG9nQ29udGVudE1vZGFsLCB7IC4uLmNvbnRlbnRQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSkgOiAvKiBAX19QVVJFX18gKi8ganN4KERpYWxvZ0NvbnRlbnROb25Nb2RhbCwgeyAuLi5jb250ZW50UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pIH0pO1xuICB9XG4pO1xuRGlhbG9nQ29udGVudC5kaXNwbGF5TmFtZSA9IENPTlRFTlRfTkFNRTtcbnZhciBEaWFsb2dDb250ZW50TW9kYWwgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgY29udGVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCBjb250ZXh0LmNvbnRlbnRSZWYsIGNvbnRlbnRSZWYpO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gY29udGVudFJlZi5jdXJyZW50O1xuICAgICAgaWYgKGNvbnRlbnQpIHJldHVybiBoaWRlT3RoZXJzKGNvbnRlbnQpO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIERpYWxvZ0NvbnRlbnRJbXBsLFxuICAgICAge1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgcmVmOiBjb21wb3NlZFJlZnMsXG4gICAgICAgIHRyYXBGb2N1czogY29udGV4dC5vcGVuLFxuICAgICAgICBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHM6IHRydWUsXG4gICAgICAgIG9uQ2xvc2VBdXRvRm9jdXM6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQ2xvc2VBdXRvRm9jdXMsIChldmVudCkgPT4ge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29udGV4dC50cmlnZ2VyUmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gICAgICAgIH0pLFxuICAgICAgICBvblBvaW50ZXJEb3duT3V0c2lkZTogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25Qb2ludGVyRG93bk91dHNpZGUsIChldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSBldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICBjb25zdCBjdHJsTGVmdENsaWNrID0gb3JpZ2luYWxFdmVudC5idXR0b24gPT09IDAgJiYgb3JpZ2luYWxFdmVudC5jdHJsS2V5ID09PSB0cnVlO1xuICAgICAgICAgIGNvbnN0IGlzUmlnaHRDbGljayA9IG9yaWdpbmFsRXZlbnQuYnV0dG9uID09PSAyIHx8IGN0cmxMZWZ0Q2xpY2s7XG4gICAgICAgICAgaWYgKGlzUmlnaHRDbGljaykgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9uRm9jdXNPdXRzaWRlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhcbiAgICAgICAgICBwcm9wcy5vbkZvY3VzT3V0c2lkZSxcbiAgICAgICAgICAoZXZlbnQpID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgKVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG52YXIgRGlhbG9nQ29udGVudE5vbk1vZGFsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDT05URU5UX05BTUUsIHByb3BzLl9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgICBjb25zdCBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgRGlhbG9nQ29udGVudEltcGwsXG4gICAgICB7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICByZWY6IGZvcndhcmRlZFJlZixcbiAgICAgICAgdHJhcEZvY3VzOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzOiBmYWxzZSxcbiAgICAgICAgb25DbG9zZUF1dG9Gb2N1czogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgcHJvcHMub25DbG9zZUF1dG9Gb2N1cz8uKGV2ZW50KTtcbiAgICAgICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIGlmICghaGFzSW50ZXJhY3RlZE91dHNpZGVSZWYuY3VycmVudCkgY29udGV4dC50cmlnZ2VyUmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25JbnRlcmFjdE91dHNpZGU6IChldmVudCkgPT4ge1xuICAgICAgICAgIHByb3BzLm9uSW50ZXJhY3RPdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgaGFzSW50ZXJhY3RlZE91dHNpZGVSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZGV0YWlsLm9yaWdpbmFsRXZlbnQudHlwZSA9PT0gXCJwb2ludGVyZG93blwiKSB7XG4gICAgICAgICAgICAgIGhhc1BvaW50ZXJEb3duT3V0c2lkZVJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgIGNvbnN0IHRhcmdldElzVHJpZ2dlciA9IGNvbnRleHQudHJpZ2dlclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICAgIGlmICh0YXJnZXRJc1RyaWdnZXIpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaWYgKGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50LnR5cGUgPT09IFwiZm9jdXNpblwiICYmIGhhc1BvaW50ZXJEb3duT3V0c2lkZVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG52YXIgRGlhbG9nQ29udGVudEltcGwgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgdHJhcEZvY3VzLCBvbk9wZW5BdXRvRm9jdXMsIG9uQ2xvc2VBdXRvRm9jdXMsIC4uLmNvbnRlbnRQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBjb250ZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIGNvbnRlbnRSZWYpO1xuICAgIHVzZUZvY3VzR3VhcmRzKCk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3hzKEZyYWdtZW50LCB7IGNoaWxkcmVuOiBbXG4gICAgICAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgICBGb2N1c1Njb3BlLFxuICAgICAgICB7XG4gICAgICAgICAgYXNDaGlsZDogdHJ1ZSxcbiAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgIHRyYXBwZWQ6IHRyYXBGb2N1cyxcbiAgICAgICAgICBvbk1vdW50QXV0b0ZvY3VzOiBvbk9wZW5BdXRvRm9jdXMsXG4gICAgICAgICAgb25Vbm1vdW50QXV0b0ZvY3VzOiBvbkNsb3NlQXV0b0ZvY3VzLFxuICAgICAgICAgIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgICAgICAgRGlzbWlzc2FibGVMYXllcixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcm9sZTogXCJkaWFsb2dcIixcbiAgICAgICAgICAgICAgaWQ6IGNvbnRleHQuY29udGVudElkLFxuICAgICAgICAgICAgICBcImFyaWEtZGVzY3JpYmVkYnlcIjogY29udGV4dC5kZXNjcmlwdGlvbklkLFxuICAgICAgICAgICAgICBcImFyaWEtbGFiZWxsZWRieVwiOiBjb250ZXh0LnRpdGxlSWQsXG4gICAgICAgICAgICAgIFwiZGF0YS1zdGF0ZVwiOiBnZXRTdGF0ZShjb250ZXh0Lm9wZW4pLFxuICAgICAgICAgICAgICAuLi5jb250ZW50UHJvcHMsXG4gICAgICAgICAgICAgIHJlZjogY29tcG9zZWRSZWZzLFxuICAgICAgICAgICAgICBvbkRpc21pc3M6ICgpID0+IGNvbnRleHQub25PcGVuQ2hhbmdlKGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3hzKEZyYWdtZW50LCB7IGNoaWxkcmVuOiBbXG4gICAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goVGl0bGVXYXJuaW5nLCB7IHRpdGxlSWQ6IGNvbnRleHQudGl0bGVJZCB9KSxcbiAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeChEZXNjcmlwdGlvbldhcm5pbmcsIHsgY29udGVudFJlZiwgZGVzY3JpcHRpb25JZDogY29udGV4dC5kZXNjcmlwdGlvbklkIH0pXG4gICAgICBdIH0pXG4gICAgXSB9KTtcbiAgfVxuKTtcbnZhciBUSVRMRV9OQU1FID0gXCJEaWFsb2dUaXRsZVwiO1xudmFyIERpYWxvZ1RpdGxlID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLnRpdGxlUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KFRJVExFX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5oMiwgeyBpZDogY29udGV4dC50aXRsZUlkLCAuLi50aXRsZVByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KTtcbiAgfVxuKTtcbkRpYWxvZ1RpdGxlLmRpc3BsYXlOYW1lID0gVElUTEVfTkFNRTtcbnZhciBERVNDUklQVElPTl9OQU1FID0gXCJEaWFsb2dEZXNjcmlwdGlvblwiO1xudmFyIERpYWxvZ0Rlc2NyaXB0aW9uID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLmRlc2NyaXB0aW9uUHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KERFU0NSSVBUSU9OX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5wLCB7IGlkOiBjb250ZXh0LmRlc2NyaXB0aW9uSWQsIC4uLmRlc2NyaXB0aW9uUHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pO1xuICB9XG4pO1xuRGlhbG9nRGVzY3JpcHRpb24uZGlzcGxheU5hbWUgPSBERVNDUklQVElPTl9OQU1FO1xudmFyIENMT1NFX05BTUUgPSBcIkRpYWxvZ0Nsb3NlXCI7XG52YXIgRGlhbG9nQ2xvc2UgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4uY2xvc2VQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ0xPU0VfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBQcmltaXRpdmUuYnV0dG9uLFxuICAgICAge1xuICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAuLi5jbG9zZVByb3BzLFxuICAgICAgICByZWY6IGZvcndhcmRlZFJlZixcbiAgICAgICAgb25DbGljazogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25DbGljaywgKCkgPT4gY29udGV4dC5vbk9wZW5DaGFuZ2UoZmFsc2UpKVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG5EaWFsb2dDbG9zZS5kaXNwbGF5TmFtZSA9IENMT1NFX05BTUU7XG5mdW5jdGlvbiBnZXRTdGF0ZShvcGVuKSB7XG4gIHJldHVybiBvcGVuID8gXCJvcGVuXCIgOiBcImNsb3NlZFwiO1xufVxudmFyIFRJVExFX1dBUk5JTkdfTkFNRSA9IFwiRGlhbG9nVGl0bGVXYXJuaW5nXCI7XG52YXIgW1dhcm5pbmdQcm92aWRlciwgdXNlV2FybmluZ0NvbnRleHRdID0gY3JlYXRlQ29udGV4dChUSVRMRV9XQVJOSU5HX05BTUUsIHtcbiAgY29udGVudE5hbWU6IENPTlRFTlRfTkFNRSxcbiAgdGl0bGVOYW1lOiBUSVRMRV9OQU1FLFxuICBkb2NzU2x1ZzogXCJkaWFsb2dcIlxufSk7XG52YXIgVGl0bGVXYXJuaW5nID0gKHsgdGl0bGVJZCB9KSA9PiB7XG4gIGNvbnN0IHRpdGxlV2FybmluZ0NvbnRleHQgPSB1c2VXYXJuaW5nQ29udGV4dChUSVRMRV9XQVJOSU5HX05BTUUpO1xuICBjb25zdCBNRVNTQUdFID0gYFxcYCR7dGl0bGVXYXJuaW5nQ29udGV4dC5jb250ZW50TmFtZX1cXGAgcmVxdWlyZXMgYSBcXGAke3RpdGxlV2FybmluZ0NvbnRleHQudGl0bGVOYW1lfVxcYCBmb3IgdGhlIGNvbXBvbmVudCB0byBiZSBhY2Nlc3NpYmxlIGZvciBzY3JlZW4gcmVhZGVyIHVzZXJzLlxuXG5JZiB5b3Ugd2FudCB0byBoaWRlIHRoZSBcXGAke3RpdGxlV2FybmluZ0NvbnRleHQudGl0bGVOYW1lfVxcYCwgeW91IGNhbiB3cmFwIGl0IHdpdGggb3VyIFZpc3VhbGx5SGlkZGVuIGNvbXBvbmVudC5cblxuRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSBodHRwczovL3JhZGl4LXVpLmNvbS9wcmltaXRpdmVzL2RvY3MvY29tcG9uZW50cy8ke3RpdGxlV2FybmluZ0NvbnRleHQuZG9jc1NsdWd9YDtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodGl0bGVJZCkge1xuICAgICAgY29uc3QgaGFzVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aXRsZUlkKTtcbiAgICAgIGlmICghaGFzVGl0bGUpIGNvbnNvbGUuZXJyb3IoTUVTU0FHRSk7XG4gICAgfVxuICB9LCBbTUVTU0FHRSwgdGl0bGVJZF0pO1xuICByZXR1cm4gbnVsbDtcbn07XG52YXIgREVTQ1JJUFRJT05fV0FSTklOR19OQU1FID0gXCJEaWFsb2dEZXNjcmlwdGlvbldhcm5pbmdcIjtcbnZhciBEZXNjcmlwdGlvbldhcm5pbmcgPSAoeyBjb250ZW50UmVmLCBkZXNjcmlwdGlvbklkIH0pID0+IHtcbiAgY29uc3QgZGVzY3JpcHRpb25XYXJuaW5nQ29udGV4dCA9IHVzZVdhcm5pbmdDb250ZXh0KERFU0NSSVBUSU9OX1dBUk5JTkdfTkFNRSk7XG4gIGNvbnN0IE1FU1NBR0UgPSBgV2FybmluZzogTWlzc2luZyBcXGBEZXNjcmlwdGlvblxcYCBvciBcXGBhcmlhLWRlc2NyaWJlZGJ5PXt1bmRlZmluZWR9XFxgIGZvciB7JHtkZXNjcmlwdGlvbldhcm5pbmdDb250ZXh0LmNvbnRlbnROYW1lfX0uYDtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBkZXNjcmliZWRCeUlkID0gY29udGVudFJlZi5jdXJyZW50Py5nZXRBdHRyaWJ1dGUoXCJhcmlhLWRlc2NyaWJlZGJ5XCIpO1xuICAgIGlmIChkZXNjcmlwdGlvbklkICYmIGRlc2NyaWJlZEJ5SWQpIHtcbiAgICAgIGNvbnN0IGhhc0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVzY3JpcHRpb25JZCk7XG4gICAgICBpZiAoIWhhc0Rlc2NyaXB0aW9uKSBjb25zb2xlLndhcm4oTUVTU0FHRSk7XG4gICAgfVxuICB9LCBbTUVTU0FHRSwgY29udGVudFJlZiwgZGVzY3JpcHRpb25JZF0pO1xuICByZXR1cm4gbnVsbDtcbn07XG52YXIgUm9vdCA9IERpYWxvZztcbnZhciBUcmlnZ2VyID0gRGlhbG9nVHJpZ2dlcjtcbnZhciBQb3J0YWwgPSBEaWFsb2dQb3J0YWw7XG52YXIgT3ZlcmxheSA9IERpYWxvZ092ZXJsYXk7XG52YXIgQ29udGVudCA9IERpYWxvZ0NvbnRlbnQ7XG52YXIgVGl0bGUgPSBEaWFsb2dUaXRsZTtcbnZhciBEZXNjcmlwdGlvbiA9IERpYWxvZ0Rlc2NyaXB0aW9uO1xudmFyIENsb3NlID0gRGlhbG9nQ2xvc2U7XG5leHBvcnQge1xuICBDbG9zZSxcbiAgQ29udGVudCxcbiAgRGVzY3JpcHRpb24sXG4gIERpYWxvZyxcbiAgRGlhbG9nQ2xvc2UsXG4gIERpYWxvZ0NvbnRlbnQsXG4gIERpYWxvZ0Rlc2NyaXB0aW9uLFxuICBEaWFsb2dPdmVybGF5LFxuICBEaWFsb2dQb3J0YWwsXG4gIERpYWxvZ1RpdGxlLFxuICBEaWFsb2dUcmlnZ2VyLFxuICBPdmVybGF5LFxuICBQb3J0YWwsXG4gIFJvb3QsXG4gIFRpdGxlLFxuICBUcmlnZ2VyLFxuICBXYXJuaW5nUHJvdmlkZXIsXG4gIGNyZWF0ZURpYWxvZ1Njb3BlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3Nsb3QudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNvbXBvc2VSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IEZyYWdtZW50IGFzIEZyYWdtZW50MiwganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdChvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdENsb25lID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3RDbG9uZShvd25lck5hbWUpO1xuICBjb25zdCBTbG90MiA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5zbG90UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNoaWxkcmVuQXJyYXkgPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKTtcbiAgICBjb25zdCBzbG90dGFibGUgPSBjaGlsZHJlbkFycmF5LmZpbmQoaXNTbG90dGFibGUpO1xuICAgIGlmIChzbG90dGFibGUpIHtcbiAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBzbG90dGFibGUucHJvcHMuY2hpbGRyZW47XG4gICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGNoaWxkcmVuQXJyYXkubWFwKChjaGlsZCkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQgPT09IHNsb3R0YWJsZSkge1xuICAgICAgICAgIGlmIChSZWFjdC5DaGlsZHJlbi5jb3VudChuZXdFbGVtZW50KSA+IDEpIHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KG51bGwpO1xuICAgICAgICAgIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXdFbGVtZW50KSA/IG5ld0VsZW1lbnQucHJvcHMuY2hpbGRyZW4gOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChTbG90Q2xvbmUsIHsgLi4uc2xvdFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiwgY2hpbGRyZW46IFJlYWN0LmlzVmFsaWRFbGVtZW50KG5ld0VsZW1lbnQpID8gUmVhY3QuY2xvbmVFbGVtZW50KG5ld0VsZW1lbnQsIHZvaWQgMCwgbmV3Q2hpbGRyZW4pIDogbnVsbCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goU2xvdENsb25lLCB7IC4uLnNsb3RQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYsIGNoaWxkcmVuIH0pO1xuICB9KTtcbiAgU2xvdDIuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3RgO1xuICByZXR1cm4gU2xvdDI7XG59XG52YXIgU2xvdCA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90KFwiU2xvdFwiKTtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90Q2xvbmUob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3RDbG9uZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5zbG90UHJvcHMgfSA9IHByb3BzO1xuICAgIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuUmVmID0gZ2V0RWxlbWVudFJlZihjaGlsZHJlbik7XG4gICAgICBjb25zdCBwcm9wczIgPSBtZXJnZVByb3BzKHNsb3RQcm9wcywgY2hpbGRyZW4ucHJvcHMpO1xuICAgICAgaWYgKGNoaWxkcmVuLnR5cGUgIT09IFJlYWN0LkZyYWdtZW50KSB7XG4gICAgICAgIHByb3BzMi5yZWYgPSBmb3J3YXJkZWRSZWYgPyBjb21wb3NlUmVmcyhmb3J3YXJkZWRSZWYsIGNoaWxkcmVuUmVmKSA6IGNoaWxkcmVuUmVmO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZHJlbiwgcHJvcHMyKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA+IDEgPyBSZWFjdC5DaGlsZHJlbi5vbmx5KG51bGwpIDogbnVsbDtcbiAgfSk7XG4gIFNsb3RDbG9uZS5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdENsb25lYDtcbiAgcmV0dXJuIFNsb3RDbG9uZTtcbn1cbnZhciBTTE9UVEFCTEVfSURFTlRJRklFUiA9IFN5bWJvbChcInJhZGl4LnNsb3R0YWJsZVwiKTtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90dGFibGUob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3R0YWJsZTIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goRnJhZ21lbnQyLCB7IGNoaWxkcmVuIH0pO1xuICB9O1xuICBTbG90dGFibGUyLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90dGFibGVgO1xuICBTbG90dGFibGUyLl9fcmFkaXhJZCA9IFNMT1RUQUJMRV9JREVOVElGSUVSO1xuICByZXR1cm4gU2xvdHRhYmxlMjtcbn1cbnZhciBTbG90dGFibGUgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdHRhYmxlKFwiU2xvdHRhYmxlXCIpO1xuZnVuY3Rpb24gaXNTbG90dGFibGUoY2hpbGQpIHtcbiAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSAmJiB0eXBlb2YgY2hpbGQudHlwZSA9PT0gXCJmdW5jdGlvblwiICYmIFwiX19yYWRpeElkXCIgaW4gY2hpbGQudHlwZSAmJiBjaGlsZC50eXBlLl9fcmFkaXhJZCA9PT0gU0xPVFRBQkxFX0lERU5USUZJRVI7XG59XG5mdW5jdGlvbiBtZXJnZVByb3BzKHNsb3RQcm9wcywgY2hpbGRQcm9wcykge1xuICBjb25zdCBvdmVycmlkZVByb3BzID0geyAuLi5jaGlsZFByb3BzIH07XG4gIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hpbGRQcm9wcykge1xuICAgIGNvbnN0IHNsb3RQcm9wVmFsdWUgPSBzbG90UHJvcHNbcHJvcE5hbWVdO1xuICAgIGNvbnN0IGNoaWxkUHJvcFZhbHVlID0gY2hpbGRQcm9wc1twcm9wTmFtZV07XG4gICAgY29uc3QgaXNIYW5kbGVyID0gL15vbltBLVpdLy50ZXN0KHByb3BOYW1lKTtcbiAgICBpZiAoaXNIYW5kbGVyKSB7XG4gICAgICBpZiAoc2xvdFByb3BWYWx1ZSAmJiBjaGlsZFByb3BWYWx1ZSkge1xuICAgICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gY2hpbGRQcm9wVmFsdWUoLi4uYXJncyk7XG4gICAgICAgICAgc2xvdFByb3BWYWx1ZSguLi5hcmdzKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChzbG90UHJvcFZhbHVlKSB7XG4gICAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gc2xvdFByb3BWYWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSBcInN0eWxlXCIpIHtcbiAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0geyAuLi5zbG90UHJvcFZhbHVlLCAuLi5jaGlsZFByb3BWYWx1ZSB9O1xuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwiY2xhc3NOYW1lXCIpIHtcbiAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gW3Nsb3RQcm9wVmFsdWUsIGNoaWxkUHJvcFZhbHVlXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IC4uLnNsb3RQcm9wcywgLi4ub3ZlcnJpZGVQcm9wcyB9O1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudFJlZihlbGVtZW50KSB7XG4gIGxldCBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQucHJvcHMsIFwicmVmXCIpPy5nZXQ7XG4gIGxldCBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnJlZjtcbiAgfVxuICBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQsIFwicmVmXCIpPy5nZXQ7XG4gIG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmO1xuICB9XG4gIHJldHVybiBlbGVtZW50LnByb3BzLnJlZiB8fCBlbGVtZW50LnJlZjtcbn1cbmV4cG9ydCB7XG4gIFNsb3QgYXMgUm9vdCxcbiAgU2xvdCxcbiAgU2xvdHRhYmxlLFxuICBjcmVhdGVTbG90LFxuICBjcmVhdGVTbG90dGFibGVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL2Rpc21pc3NhYmxlLWxheWVyLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlRXZlbnRIYW5kbGVycyB9IGZyb20gXCJAcmFkaXgtdWkvcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUsIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VDb21wb3NlZFJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWZcIjtcbmltcG9ydCB7IHVzZUVzY2FwZUtleWRvd24gfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1lc2NhcGUta2V5ZG93blwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgRElTTUlTU0FCTEVfTEFZRVJfTkFNRSA9IFwiRGlzbWlzc2FibGVMYXllclwiO1xudmFyIENPTlRFWFRfVVBEQVRFID0gXCJkaXNtaXNzYWJsZUxheWVyLnVwZGF0ZVwiO1xudmFyIFBPSU5URVJfRE9XTl9PVVRTSURFID0gXCJkaXNtaXNzYWJsZUxheWVyLnBvaW50ZXJEb3duT3V0c2lkZVwiO1xudmFyIEZPQ1VTX09VVFNJREUgPSBcImRpc21pc3NhYmxlTGF5ZXIuZm9jdXNPdXRzaWRlXCI7XG52YXIgb3JpZ2luYWxCb2R5UG9pbnRlckV2ZW50cztcbnZhciBEaXNtaXNzYWJsZUxheWVyQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoe1xuICBsYXllcnM6IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCksXG4gIGxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkOiAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpLFxuICBicmFuY2hlczogLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKVxufSk7XG52YXIgRGlzbWlzc2FibGVMYXllciA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzID0gZmFsc2UsXG4gICAgICBvbkVzY2FwZUtleURvd24sXG4gICAgICBvblBvaW50ZXJEb3duT3V0c2lkZSxcbiAgICAgIG9uRm9jdXNPdXRzaWRlLFxuICAgICAgb25JbnRlcmFjdE91dHNpZGUsXG4gICAgICBvbkRpc21pc3MsXG4gICAgICAuLi5sYXllclByb3BzXG4gICAgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KERpc21pc3NhYmxlTGF5ZXJDb250ZXh0KTtcbiAgICBjb25zdCBbbm9kZSwgc2V0Tm9kZV0gPSBSZWFjdC51c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBvd25lckRvY3VtZW50ID0gbm9kZT8ub3duZXJEb2N1bWVudCA/PyBnbG9iYWxUaGlzPy5kb2N1bWVudDtcbiAgICBjb25zdCBbLCBmb3JjZV0gPSBSZWFjdC51c2VTdGF0ZSh7fSk7XG4gICAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgKG5vZGUyKSA9PiBzZXROb2RlKG5vZGUyKSk7XG4gICAgY29uc3QgbGF5ZXJzID0gQXJyYXkuZnJvbShjb250ZXh0LmxheWVycyk7XG4gICAgY29uc3QgW2hpZ2hlc3RMYXllcldpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkXSA9IFsuLi5jb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkXS5zbGljZSgtMSk7XG4gICAgY29uc3QgaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRJbmRleCA9IGxheWVycy5pbmRleE9mKGhpZ2hlc3RMYXllcldpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkKTtcbiAgICBjb25zdCBpbmRleCA9IG5vZGUgPyBsYXllcnMuaW5kZXhPZihub2RlKSA6IC0xO1xuICAgIGNvbnN0IGlzQm9keVBvaW50ZXJFdmVudHNEaXNhYmxlZCA9IGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuc2l6ZSA+IDA7XG4gICAgY29uc3QgaXNQb2ludGVyRXZlbnRzRW5hYmxlZCA9IGluZGV4ID49IGhpZ2hlc3RMYXllcldpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkSW5kZXg7XG4gICAgY29uc3QgcG9pbnRlckRvd25PdXRzaWRlID0gdXNlUG9pbnRlckRvd25PdXRzaWRlKChldmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgY29uc3QgaXNQb2ludGVyRG93bk9uQnJhbmNoID0gWy4uLmNvbnRleHQuYnJhbmNoZXNdLnNvbWUoKGJyYW5jaCkgPT4gYnJhbmNoLmNvbnRhaW5zKHRhcmdldCkpO1xuICAgICAgaWYgKCFpc1BvaW50ZXJFdmVudHNFbmFibGVkIHx8IGlzUG9pbnRlckRvd25PbkJyYW5jaCkgcmV0dXJuO1xuICAgICAgb25Qb2ludGVyRG93bk91dHNpZGU/LihldmVudCk7XG4gICAgICBvbkludGVyYWN0T3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkgb25EaXNtaXNzPy4oKTtcbiAgICB9LCBvd25lckRvY3VtZW50KTtcbiAgICBjb25zdCBmb2N1c091dHNpZGUgPSB1c2VGb2N1c091dHNpZGUoKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICBjb25zdCBpc0ZvY3VzSW5CcmFuY2ggPSBbLi4uY29udGV4dC5icmFuY2hlc10uc29tZSgoYnJhbmNoKSA9PiBicmFuY2guY29udGFpbnModGFyZ2V0KSk7XG4gICAgICBpZiAoaXNGb2N1c0luQnJhbmNoKSByZXR1cm47XG4gICAgICBvbkZvY3VzT3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgIG9uSW50ZXJhY3RPdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSBvbkRpc21pc3M/LigpO1xuICAgIH0sIG93bmVyRG9jdW1lbnQpO1xuICAgIHVzZUVzY2FwZUtleWRvd24oKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBpc0hpZ2hlc3RMYXllciA9IGluZGV4ID09PSBjb250ZXh0LmxheWVycy5zaXplIC0gMTtcbiAgICAgIGlmICghaXNIaWdoZXN0TGF5ZXIpIHJldHVybjtcbiAgICAgIG9uRXNjYXBlS2V5RG93bj8uKGV2ZW50KTtcbiAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCAmJiBvbkRpc21pc3MpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgb25EaXNtaXNzKCk7XG4gICAgICB9XG4gICAgfSwgb3duZXJEb2N1bWVudCk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgICAgaWYgKGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50cykge1xuICAgICAgICBpZiAoY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5zaXplID09PSAwKSB7XG4gICAgICAgICAgb3JpZ2luYWxCb2R5UG9pbnRlckV2ZW50cyA9IG93bmVyRG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzO1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5hZGQobm9kZSk7XG4gICAgICB9XG4gICAgICBjb250ZXh0LmxheWVycy5hZGQobm9kZSk7XG4gICAgICBkaXNwYXRjaFVwZGF0ZSgpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50cyAmJiBjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLnNpemUgPT09IDEpIHtcbiAgICAgICAgICBvd25lckRvY3VtZW50LmJvZHkuc3R5bGUucG9pbnRlckV2ZW50cyA9IG9yaWdpbmFsQm9keVBvaW50ZXJFdmVudHM7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSwgW25vZGUsIG93bmVyRG9jdW1lbnQsIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50cywgY29udGV4dF0pO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICAgICAgY29udGV4dC5sYXllcnMuZGVsZXRlKG5vZGUpO1xuICAgICAgICBjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLmRlbGV0ZShub2RlKTtcbiAgICAgICAgZGlzcGF0Y2hVcGRhdGUoKTtcbiAgICAgIH07XG4gICAgfSwgW25vZGUsIGNvbnRleHRdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3QgaGFuZGxlVXBkYXRlID0gKCkgPT4gZm9yY2Uoe30pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihDT05URVhUX1VQREFURSwgaGFuZGxlVXBkYXRlKTtcbiAgICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKENPTlRFWFRfVVBEQVRFLCBoYW5kbGVVcGRhdGUpO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIFByaW1pdGl2ZS5kaXYsXG4gICAgICB7XG4gICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgIHJlZjogY29tcG9zZWRSZWZzLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHBvaW50ZXJFdmVudHM6IGlzQm9keVBvaW50ZXJFdmVudHNEaXNhYmxlZCA/IGlzUG9pbnRlckV2ZW50c0VuYWJsZWQgPyBcImF1dG9cIiA6IFwibm9uZVwiIDogdm9pZCAwLFxuICAgICAgICAgIC4uLnByb3BzLnN0eWxlXG4gICAgICAgIH0sXG4gICAgICAgIG9uRm9jdXNDYXB0dXJlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkZvY3VzQ2FwdHVyZSwgZm9jdXNPdXRzaWRlLm9uRm9jdXNDYXB0dXJlKSxcbiAgICAgICAgb25CbHVyQ2FwdHVyZTogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25CbHVyQ2FwdHVyZSwgZm9jdXNPdXRzaWRlLm9uQmx1ckNhcHR1cmUpLFxuICAgICAgICBvblBvaW50ZXJEb3duQ2FwdHVyZTogY29tcG9zZUV2ZW50SGFuZGxlcnMoXG4gICAgICAgICAgcHJvcHMub25Qb2ludGVyRG93bkNhcHR1cmUsXG4gICAgICAgICAgcG9pbnRlckRvd25PdXRzaWRlLm9uUG9pbnRlckRvd25DYXB0dXJlXG4gICAgICAgIClcbiAgICAgIH1cbiAgICApO1xuICB9XG4pO1xuRGlzbWlzc2FibGVMYXllci5kaXNwbGF5TmFtZSA9IERJU01JU1NBQkxFX0xBWUVSX05BTUU7XG52YXIgQlJBTkNIX05BTUUgPSBcIkRpc21pc3NhYmxlTGF5ZXJCcmFuY2hcIjtcbnZhciBEaXNtaXNzYWJsZUxheWVyQnJhbmNoID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChEaXNtaXNzYWJsZUxheWVyQ29udGV4dCk7XG4gIGNvbnN0IHJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgcmVmKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBub2RlID0gcmVmLmN1cnJlbnQ7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIGNvbnRleHQuYnJhbmNoZXMuYWRkKG5vZGUpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY29udGV4dC5icmFuY2hlcy5kZWxldGUobm9kZSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW2NvbnRleHQuYnJhbmNoZXNdKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmRpdiwgeyAuLi5wcm9wcywgcmVmOiBjb21wb3NlZFJlZnMgfSk7XG59KTtcbkRpc21pc3NhYmxlTGF5ZXJCcmFuY2guZGlzcGxheU5hbWUgPSBCUkFOQ0hfTkFNRTtcbmZ1bmN0aW9uIHVzZVBvaW50ZXJEb3duT3V0c2lkZShvblBvaW50ZXJEb3duT3V0c2lkZSwgb3duZXJEb2N1bWVudCA9IGdsb2JhbFRoaXM/LmRvY3VtZW50KSB7XG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duT3V0c2lkZSA9IHVzZUNhbGxiYWNrUmVmKG9uUG9pbnRlckRvd25PdXRzaWRlKTtcbiAgY29uc3QgaXNQb2ludGVySW5zaWRlUmVhY3RUcmVlUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlQ2xpY2tSZWYgPSBSZWFjdC51c2VSZWYoKCkgPT4ge1xuICB9KTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiAhaXNQb2ludGVySW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgbGV0IGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGFuZGxlQW5kRGlzcGF0Y2hDdXN0b21FdmVudChcbiAgICAgICAgICAgIFBPSU5URVJfRE9XTl9PVVRTSURFLFxuICAgICAgICAgICAgaGFuZGxlUG9pbnRlckRvd25PdXRzaWRlLFxuICAgICAgICAgICAgZXZlbnREZXRhaWwsXG4gICAgICAgICAgICB7IGRpc2NyZXRlOiB0cnVlIH1cbiAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudCA9IGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQyO1xuICAgICAgICBjb25zdCBldmVudERldGFpbCA9IHsgb3JpZ2luYWxFdmVudDogZXZlbnQgfTtcbiAgICAgICAgaWYgKGV2ZW50LnBvaW50ZXJUeXBlID09PSBcInRvdWNoXCIpIHtcbiAgICAgICAgICBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja1JlZi5jdXJyZW50KTtcbiAgICAgICAgICBoYW5kbGVDbGlja1JlZi5jdXJyZW50ID0gaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDI7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhbmRsZUFuZERpc3BhdGNoUG9pbnRlckRvd25PdXRzaWRlRXZlbnQyKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgaXNQb2ludGVySW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICB9O1xuICAgIGNvbnN0IHRpbWVySWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBvd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgICBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgICBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja1JlZi5jdXJyZW50KTtcbiAgICB9O1xuICB9LCBbb3duZXJEb2N1bWVudCwgaGFuZGxlUG9pbnRlckRvd25PdXRzaWRlXSk7XG4gIHJldHVybiB7XG4gICAgLy8gZW5zdXJlcyB3ZSBjaGVjayBSZWFjdCBjb21wb25lbnQgdHJlZSAobm90IGp1c3QgRE9NIHRyZWUpXG4gICAgb25Qb2ludGVyRG93bkNhcHR1cmU6ICgpID0+IGlzUG9pbnRlckluc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50ID0gdHJ1ZVxuICB9O1xufVxuZnVuY3Rpb24gdXNlRm9jdXNPdXRzaWRlKG9uRm9jdXNPdXRzaWRlLCBvd25lckRvY3VtZW50ID0gZ2xvYmFsVGhpcz8uZG9jdW1lbnQpIHtcbiAgY29uc3QgaGFuZGxlRm9jdXNPdXRzaWRlID0gdXNlQ2FsbGJhY2tSZWYob25Gb2N1c091dHNpZGUpO1xuICBjb25zdCBpc0ZvY3VzSW5zaWRlUmVhY3RUcmVlUmVmID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVGb2N1cyA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiAhaXNGb2N1c0luc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50RGV0YWlsID0geyBvcmlnaW5hbEV2ZW50OiBldmVudCB9O1xuICAgICAgICBoYW5kbGVBbmREaXNwYXRjaEN1c3RvbUV2ZW50KEZPQ1VTX09VVFNJREUsIGhhbmRsZUZvY3VzT3V0c2lkZSwgZXZlbnREZXRhaWwsIHtcbiAgICAgICAgICBkaXNjcmV0ZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBvd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzKTtcbiAgICByZXR1cm4gKCkgPT4gb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBoYW5kbGVGb2N1cyk7XG4gIH0sIFtvd25lckRvY3VtZW50LCBoYW5kbGVGb2N1c091dHNpZGVdKTtcbiAgcmV0dXJuIHtcbiAgICBvbkZvY3VzQ2FwdHVyZTogKCkgPT4gaXNGb2N1c0luc2lkZVJlYWN0VHJlZVJlZi5jdXJyZW50ID0gdHJ1ZSxcbiAgICBvbkJsdXJDYXB0dXJlOiAoKSA9PiBpc0ZvY3VzSW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQgPSBmYWxzZVxuICB9O1xufVxuZnVuY3Rpb24gZGlzcGF0Y2hVcGRhdGUoKSB7XG4gIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KENPTlRFWFRfVVBEQVRFKTtcbiAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG59XG5mdW5jdGlvbiBoYW5kbGVBbmREaXNwYXRjaEN1c3RvbUV2ZW50KG5hbWUsIGhhbmRsZXIsIGRldGFpbCwgeyBkaXNjcmV0ZSB9KSB7XG4gIGNvbnN0IHRhcmdldCA9IGRldGFpbC5vcmlnaW5hbEV2ZW50LnRhcmdldDtcbiAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogdHJ1ZSwgZGV0YWlsIH0pO1xuICBpZiAoaGFuZGxlcikgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlciwgeyBvbmNlOiB0cnVlIH0pO1xuICBpZiAoZGlzY3JldGUpIHtcbiAgICBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnQodGFyZ2V0LCBldmVudCk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG59XG52YXIgUm9vdCA9IERpc21pc3NhYmxlTGF5ZXI7XG52YXIgQnJhbmNoID0gRGlzbWlzc2FibGVMYXllckJyYW5jaDtcbmV4cG9ydCB7XG4gIEJyYW5jaCxcbiAgRGlzbWlzc2FibGVMYXllcixcbiAgRGlzbWlzc2FibGVMYXllckJyYW5jaCxcbiAgUm9vdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZm9jdXMtZ3VhcmRzLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG52YXIgY291bnQgPSAwO1xuZnVuY3Rpb24gRm9jdXNHdWFyZHMocHJvcHMpIHtcbiAgdXNlRm9jdXNHdWFyZHMoKTtcbiAgcmV0dXJuIHByb3BzLmNoaWxkcmVuO1xufVxuZnVuY3Rpb24gdXNlRm9jdXNHdWFyZHMoKSB7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWRnZUd1YXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1yYWRpeC1mb2N1cy1ndWFyZF1cIik7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGVkZ2VHdWFyZHNbMF0gPz8gY3JlYXRlRm9jdXNHdWFyZCgpKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBlZGdlR3VhcmRzWzFdID8/IGNyZWF0ZUZvY3VzR3VhcmQoKSk7XG4gICAgY291bnQrKztcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1yYWRpeC1mb2N1cy1ndWFyZF1cIikuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5yZW1vdmUoKSk7XG4gICAgICB9XG4gICAgICBjb3VudC0tO1xuICAgIH07XG4gIH0sIFtdKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUZvY3VzR3VhcmQoKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXJhZGl4LWZvY3VzLWd1YXJkXCIsIFwiXCIpO1xuICBlbGVtZW50LnRhYkluZGV4ID0gMDtcbiAgZWxlbWVudC5zdHlsZS5vdXRsaW5lID0gXCJub25lXCI7XG4gIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICBlbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICBlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnQge1xuICBGb2N1c0d1YXJkcyxcbiAgRm9jdXNHdWFyZHMgYXMgUm9vdCxcbiAgdXNlRm9jdXNHdWFyZHNcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL2ZvY3VzLXNjb3BlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VDb21wb3NlZFJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmXCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBBVVRPRk9DVVNfT05fTU9VTlQgPSBcImZvY3VzU2NvcGUuYXV0b0ZvY3VzT25Nb3VudFwiO1xudmFyIEFVVE9GT0NVU19PTl9VTk1PVU5UID0gXCJmb2N1c1Njb3BlLmF1dG9Gb2N1c09uVW5tb3VudFwiO1xudmFyIEVWRU5UX09QVElPTlMgPSB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiB0cnVlIH07XG52YXIgRk9DVVNfU0NPUEVfTkFNRSA9IFwiRm9jdXNTY29wZVwiO1xudmFyIEZvY3VzU2NvcGUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBsb29wID0gZmFsc2UsXG4gICAgdHJhcHBlZCA9IGZhbHNlLFxuICAgIG9uTW91bnRBdXRvRm9jdXM6IG9uTW91bnRBdXRvRm9jdXNQcm9wLFxuICAgIG9uVW5tb3VudEF1dG9Gb2N1czogb25Vbm1vdW50QXV0b0ZvY3VzUHJvcCxcbiAgICAuLi5zY29wZVByb3BzXG4gIH0gPSBwcm9wcztcbiAgY29uc3QgW2NvbnRhaW5lciwgc2V0Q29udGFpbmVyXSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBvbk1vdW50QXV0b0ZvY3VzID0gdXNlQ2FsbGJhY2tSZWYob25Nb3VudEF1dG9Gb2N1c1Byb3ApO1xuICBjb25zdCBvblVubW91bnRBdXRvRm9jdXMgPSB1c2VDYWxsYmFja1JlZihvblVubW91bnRBdXRvRm9jdXNQcm9wKTtcbiAgY29uc3QgbGFzdEZvY3VzZWRFbGVtZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCAobm9kZSkgPT4gc2V0Q29udGFpbmVyKG5vZGUpKTtcbiAgY29uc3QgZm9jdXNTY29wZSA9IFJlYWN0LnVzZVJlZih7XG4gICAgcGF1c2VkOiBmYWxzZSxcbiAgICBwYXVzZSgpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB9LFxuICAgIHJlc3VtZSgpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9KS5jdXJyZW50O1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0cmFwcGVkKSB7XG4gICAgICBsZXQgaGFuZGxlRm9jdXNJbjIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZm9jdXNTY29wZS5wYXVzZWQgfHwgIWNvbnRhaW5lcikgcmV0dXJuO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmIChjb250YWluZXIuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgIGxhc3RGb2N1c2VkRWxlbWVudFJlZi5jdXJyZW50ID0gdGFyZ2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvY3VzKGxhc3RGb2N1c2VkRWxlbWVudFJlZi5jdXJyZW50LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfSwgaGFuZGxlRm9jdXNPdXQyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGZvY3VzU2NvcGUucGF1c2VkIHx8ICFjb250YWluZXIpIHJldHVybjtcbiAgICAgICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG4gICAgICAgIGlmIChyZWxhdGVkVGFyZ2V0ID09PSBudWxsKSByZXR1cm47XG4gICAgICAgIGlmICghY29udGFpbmVyLmNvbnRhaW5zKHJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgZm9jdXMobGFzdEZvY3VzZWRFbGVtZW50UmVmLmN1cnJlbnQsIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9LCBoYW5kbGVNdXRhdGlvbnMyID0gZnVuY3Rpb24obXV0YXRpb25zKSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKGZvY3VzZWRFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5KSByZXR1cm47XG4gICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25zKSB7XG4gICAgICAgICAgaWYgKG11dGF0aW9uLnJlbW92ZWROb2Rlcy5sZW5ndGggPiAwKSBmb2N1cyhjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIGhhbmRsZUZvY3VzSW4gPSBoYW5kbGVGb2N1c0luMiwgaGFuZGxlRm9jdXNPdXQgPSBoYW5kbGVGb2N1c091dDIsIGhhbmRsZU11dGF0aW9ucyA9IGhhbmRsZU11dGF0aW9uczI7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBoYW5kbGVGb2N1c0luMik7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgaGFuZGxlRm9jdXNPdXQyKTtcbiAgICAgIGNvbnN0IG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihoYW5kbGVNdXRhdGlvbnMyKTtcbiAgICAgIGlmIChjb250YWluZXIpIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShjb250YWluZXIsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXNJbjIpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgaGFuZGxlRm9jdXNPdXQyKTtcbiAgICAgICAgbXV0YXRpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICB9O1xuICAgIH1cbiAgfSwgW3RyYXBwZWQsIGNvbnRhaW5lciwgZm9jdXNTY29wZS5wYXVzZWRdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICBmb2N1c1Njb3Blc1N0YWNrLmFkZChmb2N1c1Njb3BlKTtcbiAgICAgIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBoYXNGb2N1c2VkQ2FuZGlkYXRlID0gY29udGFpbmVyLmNvbnRhaW5zKHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCk7XG4gICAgICBpZiAoIWhhc0ZvY3VzZWRDYW5kaWRhdGUpIHtcbiAgICAgICAgY29uc3QgbW91bnRFdmVudCA9IG5ldyBDdXN0b21FdmVudChBVVRPRk9DVVNfT05fTU9VTlQsIEVWRU5UX09QVElPTlMpO1xuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fTU9VTlQsIG9uTW91bnRBdXRvRm9jdXMpO1xuICAgICAgICBjb250YWluZXIuZGlzcGF0Y2hFdmVudChtb3VudEV2ZW50KTtcbiAgICAgICAgaWYgKCFtb3VudEV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICBmb2N1c0ZpcnN0KHJlbW92ZUxpbmtzKGdldFRhYmJhYmxlQ2FuZGlkYXRlcyhjb250YWluZXIpKSwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCkge1xuICAgICAgICAgICAgZm9jdXMoY29udGFpbmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKEFVVE9GT0NVU19PTl9NT1VOVCwgb25Nb3VudEF1dG9Gb2N1cyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHVubW91bnRFdmVudCA9IG5ldyBDdXN0b21FdmVudChBVVRPRk9DVVNfT05fVU5NT1VOVCwgRVZFTlRfT1BUSU9OUyk7XG4gICAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX1VOTU9VTlQsIG9uVW5tb3VudEF1dG9Gb2N1cyk7XG4gICAgICAgICAgY29udGFpbmVyLmRpc3BhdGNoRXZlbnQodW5tb3VudEV2ZW50KTtcbiAgICAgICAgICBpZiAoIXVubW91bnRFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICBmb2N1cyhwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPz8gZG9jdW1lbnQuYm9keSwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKEFVVE9GT0NVU19PTl9VTk1PVU5ULCBvblVubW91bnRBdXRvRm9jdXMpO1xuICAgICAgICAgIGZvY3VzU2NvcGVzU3RhY2sucmVtb3ZlKGZvY3VzU2NvcGUpO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbY29udGFpbmVyLCBvbk1vdW50QXV0b0ZvY3VzLCBvblVubW91bnRBdXRvRm9jdXMsIGZvY3VzU2NvcGVdKTtcbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgIChldmVudCkgPT4ge1xuICAgICAgaWYgKCFsb29wICYmICF0cmFwcGVkKSByZXR1cm47XG4gICAgICBpZiAoZm9jdXNTY29wZS5wYXVzZWQpIHJldHVybjtcbiAgICAgIGNvbnN0IGlzVGFiS2V5ID0gZXZlbnQua2V5ID09PSBcIlRhYlwiICYmICFldmVudC5hbHRLZXkgJiYgIWV2ZW50LmN0cmxLZXkgJiYgIWV2ZW50Lm1ldGFLZXk7XG4gICAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICBpZiAoaXNUYWJLZXkgJiYgZm9jdXNlZEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyMiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IFtmaXJzdCwgbGFzdF0gPSBnZXRUYWJiYWJsZUVkZ2VzKGNvbnRhaW5lcjIpO1xuICAgICAgICBjb25zdCBoYXNUYWJiYWJsZUVsZW1lbnRzSW5zaWRlID0gZmlyc3QgJiYgbGFzdDtcbiAgICAgICAgaWYgKCFoYXNUYWJiYWJsZUVsZW1lbnRzSW5zaWRlKSB7XG4gICAgICAgICAgaWYgKGZvY3VzZWRFbGVtZW50ID09PSBjb250YWluZXIyKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghZXZlbnQuc2hpZnRLZXkgJiYgZm9jdXNlZEVsZW1lbnQgPT09IGxhc3QpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAobG9vcCkgZm9jdXMoZmlyc3QsIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgZm9jdXNlZEVsZW1lbnQgPT09IGZpcnN0KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGxvb3ApIGZvY3VzKGxhc3QsIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgW2xvb3AsIHRyYXBwZWQsIGZvY3VzU2NvcGUucGF1c2VkXVxuICApO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuZGl2LCB7IHRhYkluZGV4OiAtMSwgLi4uc2NvcGVQcm9wcywgcmVmOiBjb21wb3NlZFJlZnMsIG9uS2V5RG93bjogaGFuZGxlS2V5RG93biB9KTtcbn0pO1xuRm9jdXNTY29wZS5kaXNwbGF5TmFtZSA9IEZPQ1VTX1NDT1BFX05BTUU7XG5mdW5jdGlvbiBmb2N1c0ZpcnN0KGNhbmRpZGF0ZXMsIHsgc2VsZWN0ID0gZmFsc2UgfSA9IHt9KSB7XG4gIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIGNhbmRpZGF0ZXMpIHtcbiAgICBmb2N1cyhjYW5kaWRhdGUsIHsgc2VsZWN0IH0pO1xuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpIHJldHVybjtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0VGFiYmFibGVFZGdlcyhjb250YWluZXIpIHtcbiAgY29uc3QgY2FuZGlkYXRlcyA9IGdldFRhYmJhYmxlQ2FuZGlkYXRlcyhjb250YWluZXIpO1xuICBjb25zdCBmaXJzdCA9IGZpbmRWaXNpYmxlKGNhbmRpZGF0ZXMsIGNvbnRhaW5lcik7XG4gIGNvbnN0IGxhc3QgPSBmaW5kVmlzaWJsZShjYW5kaWRhdGVzLnJldmVyc2UoKSwgY29udGFpbmVyKTtcbiAgcmV0dXJuIFtmaXJzdCwgbGFzdF07XG59XG5mdW5jdGlvbiBnZXRUYWJiYWJsZUNhbmRpZGF0ZXMoY29udGFpbmVyKSB7XG4gIGNvbnN0IG5vZGVzID0gW107XG4gIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoY29udGFpbmVyLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwge1xuICAgIGFjY2VwdE5vZGU6IChub2RlKSA9PiB7XG4gICAgICBjb25zdCBpc0hpZGRlbklucHV0ID0gbm9kZS50YWdOYW1lID09PSBcIklOUFVUXCIgJiYgbm9kZS50eXBlID09PSBcImhpZGRlblwiO1xuICAgICAgaWYgKG5vZGUuZGlzYWJsZWQgfHwgbm9kZS5oaWRkZW4gfHwgaXNIaWRkZW5JbnB1dCkgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX1NLSVA7XG4gICAgICByZXR1cm4gbm9kZS50YWJJbmRleCA+PSAwID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfU0tJUDtcbiAgICB9XG4gIH0pO1xuICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIG5vZGVzLnB1c2god2Fsa2VyLmN1cnJlbnROb2RlKTtcbiAgcmV0dXJuIG5vZGVzO1xufVxuZnVuY3Rpb24gZmluZFZpc2libGUoZWxlbWVudHMsIGNvbnRhaW5lcikge1xuICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICBpZiAoIWlzSGlkZGVuKGVsZW1lbnQsIHsgdXBUbzogY29udGFpbmVyIH0pKSByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuZnVuY3Rpb24gaXNIaWRkZW4obm9kZSwgeyB1cFRvIH0pIHtcbiAgaWYgKGdldENvbXB1dGVkU3R5bGUobm9kZSkudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikgcmV0dXJuIHRydWU7XG4gIHdoaWxlIChub2RlKSB7XG4gICAgaWYgKHVwVG8gIT09IHZvaWQgMCAmJiBub2RlID09PSB1cFRvKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGdldENvbXB1dGVkU3R5bGUobm9kZSkuZGlzcGxheSA9PT0gXCJub25lXCIpIHJldHVybiB0cnVlO1xuICAgIG5vZGUgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNTZWxlY3RhYmxlSW5wdXQoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgXCJzZWxlY3RcIiBpbiBlbGVtZW50O1xufVxuZnVuY3Rpb24gZm9jdXMoZWxlbWVudCwgeyBzZWxlY3QgPSBmYWxzZSB9ID0ge30pIHtcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5mb2N1cykge1xuICAgIGNvbnN0IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgZWxlbWVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgaWYgKGVsZW1lbnQgIT09IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCAmJiBpc1NlbGVjdGFibGVJbnB1dChlbGVtZW50KSAmJiBzZWxlY3QpXG4gICAgICBlbGVtZW50LnNlbGVjdCgpO1xuICB9XG59XG52YXIgZm9jdXNTY29wZXNTdGFjayA9IGNyZWF0ZUZvY3VzU2NvcGVzU3RhY2soKTtcbmZ1bmN0aW9uIGNyZWF0ZUZvY3VzU2NvcGVzU3RhY2soKSB7XG4gIGxldCBzdGFjayA9IFtdO1xuICByZXR1cm4ge1xuICAgIGFkZChmb2N1c1Njb3BlKSB7XG4gICAgICBjb25zdCBhY3RpdmVGb2N1c1Njb3BlID0gc3RhY2tbMF07XG4gICAgICBpZiAoZm9jdXNTY29wZSAhPT0gYWN0aXZlRm9jdXNTY29wZSkge1xuICAgICAgICBhY3RpdmVGb2N1c1Njb3BlPy5wYXVzZSgpO1xuICAgICAgfVxuICAgICAgc3RhY2sgPSBhcnJheVJlbW92ZShzdGFjaywgZm9jdXNTY29wZSk7XG4gICAgICBzdGFjay51bnNoaWZ0KGZvY3VzU2NvcGUpO1xuICAgIH0sXG4gICAgcmVtb3ZlKGZvY3VzU2NvcGUpIHtcbiAgICAgIHN0YWNrID0gYXJyYXlSZW1vdmUoc3RhY2ssIGZvY3VzU2NvcGUpO1xuICAgICAgc3RhY2tbMF0/LnJlc3VtZSgpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFycmF5LCBpdGVtKSB7XG4gIGNvbnN0IHVwZGF0ZWRBcnJheSA9IFsuLi5hcnJheV07XG4gIGNvbnN0IGluZGV4ID0gdXBkYXRlZEFycmF5LmluZGV4T2YoaXRlbSk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICB1cGRhdGVkQXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdXBkYXRlZEFycmF5O1xufVxuZnVuY3Rpb24gcmVtb3ZlTGlua3MoaXRlbXMpIHtcbiAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50YWdOYW1lICE9PSBcIkFcIik7XG59XG52YXIgUm9vdCA9IEZvY3VzU2NvcGU7XG5leHBvcnQge1xuICBGb2N1c1Njb3BlLFxuICBSb290XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvaWQvc3JjL2lkLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG52YXIgdXNlUmVhY3RJZCA9IFJlYWN0W1wiIHVzZUlkIFwiLnRyaW0oKS50b1N0cmluZygpXSB8fCAoKCkgPT4gdm9pZCAwKTtcbnZhciBjb3VudCA9IDA7XG5mdW5jdGlvbiB1c2VJZChkZXRlcm1pbmlzdGljSWQpIHtcbiAgY29uc3QgW2lkLCBzZXRJZF0gPSBSZWFjdC51c2VTdGF0ZSh1c2VSZWFjdElkKCkpO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZGV0ZXJtaW5pc3RpY0lkKSBzZXRJZCgocmVhY3RJZCkgPT4gcmVhY3RJZCA/PyBTdHJpbmcoY291bnQrKykpO1xuICB9LCBbZGV0ZXJtaW5pc3RpY0lkXSk7XG4gIHJldHVybiBkZXRlcm1pbmlzdGljSWQgfHwgKGlkID8gYHJhZGl4LSR7aWR9YCA6IFwiXCIpO1xufVxuZXhwb3J0IHtcbiAgdXNlSWRcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcblxuLy8gc3JjL3BvcnRhbC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBQT1JUQUxfTkFNRSA9IFwiUG9ydGFsXCI7XG52YXIgUG9ydGFsID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICBjb25zdCB7IGNvbnRhaW5lcjogY29udGFpbmVyUHJvcCwgLi4ucG9ydGFsUHJvcHMgfSA9IHByb3BzO1xuICBjb25zdCBbbW91bnRlZCwgc2V0TW91bnRlZF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiBzZXRNb3VudGVkKHRydWUpLCBbXSk7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lclByb3AgfHwgbW91bnRlZCAmJiBnbG9iYWxUaGlzPy5kb2N1bWVudD8uYm9keTtcbiAgcmV0dXJuIGNvbnRhaW5lciA/IFJlYWN0RE9NLmNyZWF0ZVBvcnRhbCgvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5kaXYsIHsgLi4ucG9ydGFsUHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pLCBjb250YWluZXIpIDogbnVsbDtcbn0pO1xuUG9ydGFsLmRpc3BsYXlOYW1lID0gUE9SVEFMX05BTUU7XG52YXIgUm9vdCA9IFBvcnRhbDtcbmV4cG9ydCB7XG4gIFBvcnRhbCxcbiAgUm9vdFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvcHJlc2VuY2UudHN4XG5pbXBvcnQgKiBhcyBSZWFjdDIgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VDb21wb3NlZFJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xuXG4vLyBzcmMvdXNlLXN0YXRlLW1hY2hpbmUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIHVzZVN0YXRlTWFjaGluZShpbml0aWFsU3RhdGUsIG1hY2hpbmUpIHtcbiAgcmV0dXJuIFJlYWN0LnVzZVJlZHVjZXIoKHN0YXRlLCBldmVudCkgPT4ge1xuICAgIGNvbnN0IG5leHRTdGF0ZSA9IG1hY2hpbmVbc3RhdGVdW2V2ZW50XTtcbiAgICByZXR1cm4gbmV4dFN0YXRlID8/IHN0YXRlO1xuICB9LCBpbml0aWFsU3RhdGUpO1xufVxuXG4vLyBzcmMvcHJlc2VuY2UudHN4XG52YXIgUHJlc2VuY2UgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBwcmVzZW50LCBjaGlsZHJlbiB9ID0gcHJvcHM7XG4gIGNvbnN0IHByZXNlbmNlID0gdXNlUHJlc2VuY2UocHJlc2VudCk7XG4gIGNvbnN0IGNoaWxkID0gdHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCIgPyBjaGlsZHJlbih7IHByZXNlbnQ6IHByZXNlbmNlLmlzUHJlc2VudCB9KSA6IFJlYWN0Mi5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTtcbiAgY29uc3QgcmVmID0gdXNlQ29tcG9zZWRSZWZzKHByZXNlbmNlLnJlZiwgZ2V0RWxlbWVudFJlZihjaGlsZCkpO1xuICBjb25zdCBmb3JjZU1vdW50ID0gdHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCI7XG4gIHJldHVybiBmb3JjZU1vdW50IHx8IHByZXNlbmNlLmlzUHJlc2VudCA/IFJlYWN0Mi5jbG9uZUVsZW1lbnQoY2hpbGQsIHsgcmVmIH0pIDogbnVsbDtcbn07XG5QcmVzZW5jZS5kaXNwbGF5TmFtZSA9IFwiUHJlc2VuY2VcIjtcbmZ1bmN0aW9uIHVzZVByZXNlbmNlKHByZXNlbnQpIHtcbiAgY29uc3QgW25vZGUsIHNldE5vZGVdID0gUmVhY3QyLnVzZVN0YXRlKCk7XG4gIGNvbnN0IHN0eWxlc1JlZiA9IFJlYWN0Mi51c2VSZWYobnVsbCk7XG4gIGNvbnN0IHByZXZQcmVzZW50UmVmID0gUmVhY3QyLnVzZVJlZihwcmVzZW50KTtcbiAgY29uc3QgcHJldkFuaW1hdGlvbk5hbWVSZWYgPSBSZWFjdDIudXNlUmVmKFwibm9uZVwiKTtcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0gcHJlc2VudCA/IFwibW91bnRlZFwiIDogXCJ1bm1vdW50ZWRcIjtcbiAgY29uc3QgW3N0YXRlLCBzZW5kXSA9IHVzZVN0YXRlTWFjaGluZShpbml0aWFsU3RhdGUsIHtcbiAgICBtb3VudGVkOiB7XG4gICAgICBVTk1PVU5UOiBcInVubW91bnRlZFwiLFxuICAgICAgQU5JTUFUSU9OX09VVDogXCJ1bm1vdW50U3VzcGVuZGVkXCJcbiAgICB9LFxuICAgIHVubW91bnRTdXNwZW5kZWQ6IHtcbiAgICAgIE1PVU5UOiBcIm1vdW50ZWRcIixcbiAgICAgIEFOSU1BVElPTl9FTkQ6IFwidW5tb3VudGVkXCJcbiAgICB9LFxuICAgIHVubW91bnRlZDoge1xuICAgICAgTU9VTlQ6IFwibW91bnRlZFwiXG4gICAgfVxuICB9KTtcbiAgUmVhY3QyLnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEFuaW1hdGlvbk5hbWUgPSBnZXRBbmltYXRpb25OYW1lKHN0eWxlc1JlZi5jdXJyZW50KTtcbiAgICBwcmV2QW5pbWF0aW9uTmFtZVJlZi5jdXJyZW50ID0gc3RhdGUgPT09IFwibW91bnRlZFwiID8gY3VycmVudEFuaW1hdGlvbk5hbWUgOiBcIm5vbmVcIjtcbiAgfSwgW3N0YXRlXSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc3R5bGVzID0gc3R5bGVzUmVmLmN1cnJlbnQ7XG4gICAgY29uc3Qgd2FzUHJlc2VudCA9IHByZXZQcmVzZW50UmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgaGFzUHJlc2VudENoYW5nZWQgPSB3YXNQcmVzZW50ICE9PSBwcmVzZW50O1xuICAgIGlmIChoYXNQcmVzZW50Q2hhbmdlZCkge1xuICAgICAgY29uc3QgcHJldkFuaW1hdGlvbk5hbWUgPSBwcmV2QW5pbWF0aW9uTmFtZVJlZi5jdXJyZW50O1xuICAgICAgY29uc3QgY3VycmVudEFuaW1hdGlvbk5hbWUgPSBnZXRBbmltYXRpb25OYW1lKHN0eWxlcyk7XG4gICAgICBpZiAocHJlc2VudCkge1xuICAgICAgICBzZW5kKFwiTU9VTlRcIik7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRBbmltYXRpb25OYW1lID09PSBcIm5vbmVcIiB8fCBzdHlsZXM/LmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIHNlbmQoXCJVTk1PVU5UXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaXNBbmltYXRpbmcgPSBwcmV2QW5pbWF0aW9uTmFtZSAhPT0gY3VycmVudEFuaW1hdGlvbk5hbWU7XG4gICAgICAgIGlmICh3YXNQcmVzZW50ICYmIGlzQW5pbWF0aW5nKSB7XG4gICAgICAgICAgc2VuZChcIkFOSU1BVElPTl9PVVRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VuZChcIlVOTU9VTlRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHByZXZQcmVzZW50UmVmLmN1cnJlbnQgPSBwcmVzZW50O1xuICAgIH1cbiAgfSwgW3ByZXNlbnQsIHNlbmRdKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAobm9kZSkge1xuICAgICAgbGV0IHRpbWVvdXRJZDtcbiAgICAgIGNvbnN0IG93bmVyV2luZG93ID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3ID8/IHdpbmRvdztcbiAgICAgIGNvbnN0IGhhbmRsZUFuaW1hdGlvbkVuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uTmFtZSA9IGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzUmVmLmN1cnJlbnQpO1xuICAgICAgICBjb25zdCBpc0N1cnJlbnRBbmltYXRpb24gPSBjdXJyZW50QW5pbWF0aW9uTmFtZS5pbmNsdWRlcyhDU1MuZXNjYXBlKGV2ZW50LmFuaW1hdGlvbk5hbWUpKTtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbm9kZSAmJiBpc0N1cnJlbnRBbmltYXRpb24pIHtcbiAgICAgICAgICBzZW5kKFwiQU5JTUFUSU9OX0VORFwiKTtcbiAgICAgICAgICBpZiAoIXByZXZQcmVzZW50UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGaWxsTW9kZSA9IG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGU7XG4gICAgICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbkZpbGxNb2RlID0gXCJmb3J3YXJkc1wiO1xuICAgICAgICAgICAgdGltZW91dElkID0gb3duZXJXaW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChub2RlLnN0eWxlLmFuaW1hdGlvbkZpbGxNb2RlID09PSBcImZvcndhcmRzXCIpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbkZpbGxNb2RlID0gY3VycmVudEZpbGxNb2RlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBoYW5kbGVBbmltYXRpb25TdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBub2RlKSB7XG4gICAgICAgICAgcHJldkFuaW1hdGlvbk5hbWVSZWYuY3VycmVudCA9IGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzUmVmLmN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uc3RhcnRcIiwgaGFuZGxlQW5pbWF0aW9uU3RhcnQpO1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uY2FuY2VsXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgaGFuZGxlQW5pbWF0aW9uRW5kKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIG93bmVyV2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25zdGFydFwiLCBoYW5kbGVBbmltYXRpb25TdGFydCk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmNhbmNlbFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgaGFuZGxlQW5pbWF0aW9uRW5kKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbmQoXCJBTklNQVRJT05fRU5EXCIpO1xuICAgIH1cbiAgfSwgW25vZGUsIHNlbmRdKTtcbiAgcmV0dXJuIHtcbiAgICBpc1ByZXNlbnQ6IFtcIm1vdW50ZWRcIiwgXCJ1bm1vdW50U3VzcGVuZGVkXCJdLmluY2x1ZGVzKHN0YXRlKSxcbiAgICByZWY6IFJlYWN0Mi51c2VDYWxsYmFjaygobm9kZTIpID0+IHtcbiAgICAgIHN0eWxlc1JlZi5jdXJyZW50ID0gbm9kZTIgPyBnZXRDb21wdXRlZFN0eWxlKG5vZGUyKSA6IG51bGw7XG4gICAgICBzZXROb2RlKG5vZGUyKTtcbiAgICB9LCBbXSlcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzKSB7XG4gIHJldHVybiBzdHlsZXM/LmFuaW1hdGlvbk5hbWUgfHwgXCJub25lXCI7XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50UmVmKGVsZW1lbnQpIHtcbiAgbGV0IGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudC5wcm9wcywgXCJyZWZcIik/LmdldDtcbiAgbGV0IG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucmVmO1xuICB9XG4gIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudCwgXCJyZWZcIik/LmdldDtcbiAgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWY7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmIHx8IGVsZW1lbnQucmVmO1xufVxudmFyIFJvb3QgPSBQcmVzZW5jZTtcbmV4cG9ydCB7XG4gIFByZXNlbmNlLFxuICBSb290XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3ByaW1pdGl2ZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgY3JlYXRlU2xvdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3Qtc2xvdFwiO1xuaW1wb3J0IHsganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG52YXIgTk9ERVMgPSBbXG4gIFwiYVwiLFxuICBcImJ1dHRvblwiLFxuICBcImRpdlwiLFxuICBcImZvcm1cIixcbiAgXCJoMlwiLFxuICBcImgzXCIsXG4gIFwiaW1nXCIsXG4gIFwiaW5wdXRcIixcbiAgXCJsYWJlbFwiLFxuICBcImxpXCIsXG4gIFwibmF2XCIsXG4gIFwib2xcIixcbiAgXCJwXCIsXG4gIFwic2VsZWN0XCIsXG4gIFwic3BhblwiLFxuICBcInN2Z1wiLFxuICBcInVsXCJcbl07XG52YXIgUHJpbWl0aXZlID0gTk9ERVMucmVkdWNlKChwcmltaXRpdmUsIG5vZGUpID0+IHtcbiAgY29uc3QgU2xvdCA9IGNyZWF0ZVNsb3QoYFByaW1pdGl2ZS4ke25vZGV9YCk7XG4gIGNvbnN0IE5vZGUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBhc0NoaWxkLCAuLi5wcmltaXRpdmVQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgQ29tcCA9IGFzQ2hpbGQgPyBTbG90IDogbm9kZTtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgd2luZG93W1N5bWJvbC5mb3IoXCJyYWRpeC11aVwiKV0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChDb21wLCB7IC4uLnByaW1pdGl2ZVByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KTtcbiAgfSk7XG4gIE5vZGUuZGlzcGxheU5hbWUgPSBgUHJpbWl0aXZlLiR7bm9kZX1gO1xuICByZXR1cm4geyAuLi5wcmltaXRpdmUsIFtub2RlXTogTm9kZSB9O1xufSwge30pO1xuZnVuY3Rpb24gZGlzcGF0Y2hEaXNjcmV0ZUN1c3RvbUV2ZW50KHRhcmdldCwgZXZlbnQpIHtcbiAgaWYgKHRhcmdldCkgUmVhY3RET00uZmx1c2hTeW5jKCgpID0+IHRhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KSk7XG59XG52YXIgUm9vdCA9IFByaW1pdGl2ZTtcbmV4cG9ydCB7XG4gIFByaW1pdGl2ZSxcbiAgUm9vdCxcbiAgZGlzcGF0Y2hEaXNjcmV0ZUN1c3RvbUV2ZW50XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gc3JjL3Nsb3QudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNvbXBvc2VSZWZzIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb21wb3NlLXJlZnNcIjtcbmltcG9ydCB7IEZyYWdtZW50IGFzIEZyYWdtZW50MiwganN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG4vLyBAX19OT19TSURFX0VGRkVDVFNfX1xuZnVuY3Rpb24gY3JlYXRlU2xvdChvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdENsb25lID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3RDbG9uZShvd25lck5hbWUpO1xuICBjb25zdCBTbG90MiA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5zbG90UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNoaWxkcmVuQXJyYXkgPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKTtcbiAgICBjb25zdCBzbG90dGFibGUgPSBjaGlsZHJlbkFycmF5LmZpbmQoaXNTbG90dGFibGUpO1xuICAgIGlmIChzbG90dGFibGUpIHtcbiAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBzbG90dGFibGUucHJvcHMuY2hpbGRyZW47XG4gICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IGNoaWxkcmVuQXJyYXkubWFwKChjaGlsZCkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQgPT09IHNsb3R0YWJsZSkge1xuICAgICAgICAgIGlmIChSZWFjdC5DaGlsZHJlbi5jb3VudChuZXdFbGVtZW50KSA+IDEpIHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KG51bGwpO1xuICAgICAgICAgIHJldHVybiBSZWFjdC5pc1ZhbGlkRWxlbWVudChuZXdFbGVtZW50KSA/IG5ld0VsZW1lbnQucHJvcHMuY2hpbGRyZW4gOiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChTbG90Q2xvbmUsIHsgLi4uc2xvdFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiwgY2hpbGRyZW46IFJlYWN0LmlzVmFsaWRFbGVtZW50KG5ld0VsZW1lbnQpID8gUmVhY3QuY2xvbmVFbGVtZW50KG5ld0VsZW1lbnQsIHZvaWQgMCwgbmV3Q2hpbGRyZW4pIDogbnVsbCB9KTtcbiAgICB9XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goU2xvdENsb25lLCB7IC4uLnNsb3RQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYsIGNoaWxkcmVuIH0pO1xuICB9KTtcbiAgU2xvdDIuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3RgO1xuICByZXR1cm4gU2xvdDI7XG59XG52YXIgU2xvdCA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90KFwiU2xvdFwiKTtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90Q2xvbmUob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3RDbG9uZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGNoaWxkcmVuLCAuLi5zbG90UHJvcHMgfSA9IHByb3BzO1xuICAgIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuUmVmID0gZ2V0RWxlbWVudFJlZihjaGlsZHJlbik7XG4gICAgICBjb25zdCBwcm9wczIgPSBtZXJnZVByb3BzKHNsb3RQcm9wcywgY2hpbGRyZW4ucHJvcHMpO1xuICAgICAgaWYgKGNoaWxkcmVuLnR5cGUgIT09IFJlYWN0LkZyYWdtZW50KSB7XG4gICAgICAgIHByb3BzMi5yZWYgPSBmb3J3YXJkZWRSZWYgPyBjb21wb3NlUmVmcyhmb3J3YXJkZWRSZWYsIGNoaWxkcmVuUmVmKSA6IGNoaWxkcmVuUmVmO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZHJlbiwgcHJvcHMyKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA+IDEgPyBSZWFjdC5DaGlsZHJlbi5vbmx5KG51bGwpIDogbnVsbDtcbiAgfSk7XG4gIFNsb3RDbG9uZS5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdENsb25lYDtcbiAgcmV0dXJuIFNsb3RDbG9uZTtcbn1cbnZhciBTTE9UVEFCTEVfSURFTlRJRklFUiA9IFN5bWJvbChcInJhZGl4LnNsb3R0YWJsZVwiKTtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90dGFibGUob3duZXJOYW1lKSB7XG4gIGNvbnN0IFNsb3R0YWJsZTIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goRnJhZ21lbnQyLCB7IGNoaWxkcmVuIH0pO1xuICB9O1xuICBTbG90dGFibGUyLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90dGFibGVgO1xuICBTbG90dGFibGUyLl9fcmFkaXhJZCA9IFNMT1RUQUJMRV9JREVOVElGSUVSO1xuICByZXR1cm4gU2xvdHRhYmxlMjtcbn1cbnZhciBTbG90dGFibGUgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdHRhYmxlKFwiU2xvdHRhYmxlXCIpO1xuZnVuY3Rpb24gaXNTbG90dGFibGUoY2hpbGQpIHtcbiAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSAmJiB0eXBlb2YgY2hpbGQudHlwZSA9PT0gXCJmdW5jdGlvblwiICYmIFwiX19yYWRpeElkXCIgaW4gY2hpbGQudHlwZSAmJiBjaGlsZC50eXBlLl9fcmFkaXhJZCA9PT0gU0xPVFRBQkxFX0lERU5USUZJRVI7XG59XG5mdW5jdGlvbiBtZXJnZVByb3BzKHNsb3RQcm9wcywgY2hpbGRQcm9wcykge1xuICBjb25zdCBvdmVycmlkZVByb3BzID0geyAuLi5jaGlsZFByb3BzIH07XG4gIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hpbGRQcm9wcykge1xuICAgIGNvbnN0IHNsb3RQcm9wVmFsdWUgPSBzbG90UHJvcHNbcHJvcE5hbWVdO1xuICAgIGNvbnN0IGNoaWxkUHJvcFZhbHVlID0gY2hpbGRQcm9wc1twcm9wTmFtZV07XG4gICAgY29uc3QgaXNIYW5kbGVyID0gL15vbltBLVpdLy50ZXN0KHByb3BOYW1lKTtcbiAgICBpZiAoaXNIYW5kbGVyKSB7XG4gICAgICBpZiAoc2xvdFByb3BWYWx1ZSAmJiBjaGlsZFByb3BWYWx1ZSkge1xuICAgICAgICBvdmVycmlkZVByb3BzW3Byb3BOYW1lXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gY2hpbGRQcm9wVmFsdWUoLi4uYXJncyk7XG4gICAgICAgICAgc2xvdFByb3BWYWx1ZSguLi5hcmdzKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChzbG90UHJvcFZhbHVlKSB7XG4gICAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gc2xvdFByb3BWYWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSBcInN0eWxlXCIpIHtcbiAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0geyAuLi5zbG90UHJvcFZhbHVlLCAuLi5jaGlsZFByb3BWYWx1ZSB9O1xuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwiY2xhc3NOYW1lXCIpIHtcbiAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gW3Nsb3RQcm9wVmFsdWUsIGNoaWxkUHJvcFZhbHVlXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IC4uLnNsb3RQcm9wcywgLi4ub3ZlcnJpZGVQcm9wcyB9O1xufVxuZnVuY3Rpb24gZ2V0RWxlbWVudFJlZihlbGVtZW50KSB7XG4gIGxldCBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQucHJvcHMsIFwicmVmXCIpPy5nZXQ7XG4gIGxldCBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnJlZjtcbiAgfVxuICBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVsZW1lbnQsIFwicmVmXCIpPy5nZXQ7XG4gIG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmO1xuICB9XG4gIHJldHVybiBlbGVtZW50LnByb3BzLnJlZiB8fCBlbGVtZW50LnJlZjtcbn1cbmV4cG9ydCB7XG4gIFNsb3QgYXMgUm9vdCxcbiAgU2xvdCxcbiAgU2xvdHRhYmxlLFxuICBjcmVhdGVTbG90LFxuICBjcmVhdGVTbG90dGFibGVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC91c2UtY2FsbGJhY2stcmVmL3NyYy91c2UtY2FsbGJhY2stcmVmLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiB1c2VDYWxsYmFja1JlZihjYWxsYmFjaykge1xuICBjb25zdCBjYWxsYmFja1JlZiA9IFJlYWN0LnVzZVJlZihjYWxsYmFjayk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY2FsbGJhY2tSZWYuY3VycmVudCA9IGNhbGxiYWNrO1xuICB9KTtcbiAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oKCkgPT4gKC4uLmFyZ3MpID0+IGNhbGxiYWNrUmVmLmN1cnJlbnQ/LiguLi5hcmdzKSwgW10pO1xufVxuZXhwb3J0IHtcbiAgdXNlQ2FsbGJhY2tSZWZcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xudmFyIHVzZUluc2VydGlvbkVmZmVjdCA9IFJlYWN0W1wiIHVzZUluc2VydGlvbkVmZmVjdCBcIi50cmltKCkudG9TdHJpbmcoKV0gfHwgdXNlTGF5b3V0RWZmZWN0O1xuZnVuY3Rpb24gdXNlQ29udHJvbGxhYmxlU3RhdGUoe1xuICBwcm9wLFxuICBkZWZhdWx0UHJvcCxcbiAgb25DaGFuZ2UgPSAoKSA9PiB7XG4gIH0sXG4gIGNhbGxlclxufSkge1xuICBjb25zdCBbdW5jb250cm9sbGVkUHJvcCwgc2V0VW5jb250cm9sbGVkUHJvcCwgb25DaGFuZ2VSZWZdID0gdXNlVW5jb250cm9sbGVkU3RhdGUoe1xuICAgIGRlZmF1bHRQcm9wLFxuICAgIG9uQ2hhbmdlXG4gIH0pO1xuICBjb25zdCBpc0NvbnRyb2xsZWQgPSBwcm9wICE9PSB2b2lkIDA7XG4gIGNvbnN0IHZhbHVlID0gaXNDb250cm9sbGVkID8gcHJvcCA6IHVuY29udHJvbGxlZFByb3A7XG4gIGlmICh0cnVlKSB7XG4gICAgY29uc3QgaXNDb250cm9sbGVkUmVmID0gUmVhY3QudXNlUmVmKHByb3AgIT09IHZvaWQgMCk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IHdhc0NvbnRyb2xsZWQgPSBpc0NvbnRyb2xsZWRSZWYuY3VycmVudDtcbiAgICAgIGlmICh3YXNDb250cm9sbGVkICE9PSBpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgY29uc3QgZnJvbSA9IHdhc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCI7XG4gICAgICAgIGNvbnN0IHRvID0gaXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYCR7Y2FsbGVyfSBpcyBjaGFuZ2luZyBmcm9tICR7ZnJvbX0gdG8gJHt0b30uIENvbXBvbmVudHMgc2hvdWxkIG5vdCBzd2l0Y2ggZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCAob3IgdmljZSB2ZXJzYSkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgdmFsdWUgZm9yIHRoZSBsaWZldGltZSBvZiB0aGUgY29tcG9uZW50LmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlzQ29udHJvbGxlZFJlZi5jdXJyZW50ID0gaXNDb250cm9sbGVkO1xuICAgIH0sIFtpc0NvbnRyb2xsZWQsIGNhbGxlcl0pO1xuICB9XG4gIGNvbnN0IHNldFZhbHVlID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKG5leHRWYWx1ZSkgPT4ge1xuICAgICAgaWYgKGlzQ29udHJvbGxlZCkge1xuICAgICAgICBjb25zdCB2YWx1ZTIgPSBpc0Z1bmN0aW9uKG5leHRWYWx1ZSkgPyBuZXh0VmFsdWUocHJvcCkgOiBuZXh0VmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZTIgIT09IHByb3ApIHtcbiAgICAgICAgICBvbkNoYW5nZVJlZi5jdXJyZW50Py4odmFsdWUyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VW5jb250cm9sbGVkUHJvcChuZXh0VmFsdWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2lzQ29udHJvbGxlZCwgcHJvcCwgc2V0VW5jb250cm9sbGVkUHJvcCwgb25DaGFuZ2VSZWZdXG4gICk7XG4gIHJldHVybiBbdmFsdWUsIHNldFZhbHVlXTtcbn1cbmZ1bmN0aW9uIHVzZVVuY29udHJvbGxlZFN0YXRlKHtcbiAgZGVmYXVsdFByb3AsXG4gIG9uQ2hhbmdlXG59KSB7XG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gUmVhY3QudXNlU3RhdGUoZGVmYXVsdFByb3ApO1xuICBjb25zdCBwcmV2VmFsdWVSZWYgPSBSZWFjdC51c2VSZWYodmFsdWUpO1xuICBjb25zdCBvbkNoYW5nZVJlZiA9IFJlYWN0LnVzZVJlZihvbkNoYW5nZSk7XG4gIHVzZUluc2VydGlvbkVmZmVjdCgoKSA9PiB7XG4gICAgb25DaGFuZ2VSZWYuY3VycmVudCA9IG9uQ2hhbmdlO1xuICB9LCBbb25DaGFuZ2VdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocHJldlZhbHVlUmVmLmN1cnJlbnQgIT09IHZhbHVlKSB7XG4gICAgICBvbkNoYW5nZVJlZi5jdXJyZW50Py4odmFsdWUpO1xuICAgICAgcHJldlZhbHVlUmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgICB9XG4gIH0sIFt2YWx1ZSwgcHJldlZhbHVlUmVmXSk7XG4gIHJldHVybiBbdmFsdWUsIHNldFZhbHVlLCBvbkNoYW5nZVJlZl07XG59XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuLy8gc3JjL3VzZS1jb250cm9sbGFibGUtc3RhdGUtcmVkdWNlci50c3hcbmltcG9ydCAqIGFzIFJlYWN0MiBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUVmZmVjdEV2ZW50IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtZWZmZWN0LWV2ZW50XCI7XG52YXIgU1lOQ19TVEFURSA9IFN5bWJvbChcIlJBRElYOlNZTkNfU1RBVEVcIik7XG5mdW5jdGlvbiB1c2VDb250cm9sbGFibGVTdGF0ZVJlZHVjZXIocmVkdWNlciwgdXNlckFyZ3MsIGluaXRpYWxBcmcsIGluaXQpIHtcbiAgY29uc3QgeyBwcm9wOiBjb250cm9sbGVkU3RhdGUsIGRlZmF1bHRQcm9wLCBvbkNoYW5nZTogb25DaGFuZ2VQcm9wLCBjYWxsZXIgfSA9IHVzZXJBcmdzO1xuICBjb25zdCBpc0NvbnRyb2xsZWQgPSBjb250cm9sbGVkU3RhdGUgIT09IHZvaWQgMDtcbiAgY29uc3Qgb25DaGFuZ2UgPSB1c2VFZmZlY3RFdmVudChvbkNoYW5nZVByb3ApO1xuICBpZiAodHJ1ZSkge1xuICAgIGNvbnN0IGlzQ29udHJvbGxlZFJlZiA9IFJlYWN0Mi51c2VSZWYoY29udHJvbGxlZFN0YXRlICE9PSB2b2lkIDApO1xuICAgIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3Qgd2FzQ29udHJvbGxlZCA9IGlzQ29udHJvbGxlZFJlZi5jdXJyZW50O1xuICAgICAgaWYgKHdhc0NvbnRyb2xsZWQgIT09IGlzQ29udHJvbGxlZCkge1xuICAgICAgICBjb25zdCBmcm9tID0gd2FzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc3QgdG8gPSBpc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCI7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgJHtjYWxsZXJ9IGlzIGNoYW5naW5nIGZyb20gJHtmcm9tfSB0byAke3RvfS4gQ29tcG9uZW50cyBzaG91bGQgbm90IHN3aXRjaCBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gRGVjaWRlIGJldHdlZW4gdXNpbmcgYSBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCB2YWx1ZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBjb21wb25lbnQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaXNDb250cm9sbGVkUmVmLmN1cnJlbnQgPSBpc0NvbnRyb2xsZWQ7XG4gICAgfSwgW2lzQ29udHJvbGxlZCwgY2FsbGVyXSk7XG4gIH1cbiAgY29uc3QgYXJncyA9IFt7IC4uLmluaXRpYWxBcmcsIHN0YXRlOiBkZWZhdWx0UHJvcCB9XTtcbiAgaWYgKGluaXQpIHtcbiAgICBhcmdzLnB1c2goaW5pdCk7XG4gIH1cbiAgY29uc3QgW2ludGVybmFsU3RhdGUsIGRpc3BhdGNoXSA9IFJlYWN0Mi51c2VSZWR1Y2VyKFxuICAgIChzdGF0ZTIsIGFjdGlvbikgPT4ge1xuICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBTWU5DX1NUQVRFKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlMiwgc3RhdGU6IGFjdGlvbi5zdGF0ZSB9O1xuICAgICAgfVxuICAgICAgY29uc3QgbmV4dCA9IHJlZHVjZXIoc3RhdGUyLCBhY3Rpb24pO1xuICAgICAgaWYgKGlzQ29udHJvbGxlZCAmJiAhT2JqZWN0LmlzKG5leHQuc3RhdGUsIHN0YXRlMi5zdGF0ZSkpIHtcbiAgICAgICAgb25DaGFuZ2UobmV4dC5zdGF0ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9LFxuICAgIC4uLmFyZ3NcbiAgKTtcbiAgY29uc3QgdW5jb250cm9sbGVkU3RhdGUgPSBpbnRlcm5hbFN0YXRlLnN0YXRlO1xuICBjb25zdCBwcmV2VmFsdWVSZWYgPSBSZWFjdDIudXNlUmVmKHVuY29udHJvbGxlZFN0YXRlKTtcbiAgUmVhY3QyLnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByZXZWYWx1ZVJlZi5jdXJyZW50ICE9PSB1bmNvbnRyb2xsZWRTdGF0ZSkge1xuICAgICAgcHJldlZhbHVlUmVmLmN1cnJlbnQgPSB1bmNvbnRyb2xsZWRTdGF0ZTtcbiAgICAgIGlmICghaXNDb250cm9sbGVkKSB7XG4gICAgICAgIG9uQ2hhbmdlKHVuY29udHJvbGxlZFN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtvbkNoYW5nZSwgdW5jb250cm9sbGVkU3RhdGUsIHByZXZWYWx1ZVJlZiwgaXNDb250cm9sbGVkXSk7XG4gIGNvbnN0IHN0YXRlID0gUmVhY3QyLnVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGlzQ29udHJvbGxlZDIgPSBjb250cm9sbGVkU3RhdGUgIT09IHZvaWQgMDtcbiAgICBpZiAoaXNDb250cm9sbGVkMikge1xuICAgICAgcmV0dXJuIHsgLi4uaW50ZXJuYWxTdGF0ZSwgc3RhdGU6IGNvbnRyb2xsZWRTdGF0ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gaW50ZXJuYWxTdGF0ZTtcbiAgfSwgW2ludGVybmFsU3RhdGUsIGNvbnRyb2xsZWRTdGF0ZV0pO1xuICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNDb250cm9sbGVkICYmICFPYmplY3QuaXMoY29udHJvbGxlZFN0YXRlLCBpbnRlcm5hbFN0YXRlLnN0YXRlKSkge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBTWU5DX1NUQVRFLCBzdGF0ZTogY29udHJvbGxlZFN0YXRlIH0pO1xuICAgIH1cbiAgfSwgW2NvbnRyb2xsZWRTdGF0ZSwgaW50ZXJuYWxTdGF0ZS5zdGF0ZSwgaXNDb250cm9sbGVkXSk7XG4gIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoXTtcbn1cbmV4cG9ydCB7XG4gIHVzZUNvbnRyb2xsYWJsZVN0YXRlLFxuICB1c2VDb250cm9sbGFibGVTdGF0ZVJlZHVjZXJcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvdXNlLWVmZmVjdC1ldmVudC50c3hcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIHVzZVJlYWN0RWZmZWN0RXZlbnQgPSBSZWFjdFtcIiB1c2VFZmZlY3RFdmVudCBcIi50cmltKCkudG9TdHJpbmcoKV07XG52YXIgdXNlUmVhY3RJbnNlcnRpb25FZmZlY3QgPSBSZWFjdFtcIiB1c2VJbnNlcnRpb25FZmZlY3QgXCIudHJpbSgpLnRvU3RyaW5nKCldO1xuZnVuY3Rpb24gdXNlRWZmZWN0RXZlbnQoY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiB1c2VSZWFjdEVmZmVjdEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gdXNlUmVhY3RFZmZlY3RFdmVudChjYWxsYmFjayk7XG4gIH1cbiAgY29uc3QgcmVmID0gUmVhY3QudXNlUmVmKCgpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY2FsbCBhbiBldmVudCBoYW5kbGVyIHdoaWxlIHJlbmRlcmluZy5cIik7XG4gIH0pO1xuICBpZiAodHlwZW9mIHVzZVJlYWN0SW5zZXJ0aW9uRWZmZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB1c2VSZWFjdEluc2VydGlvbkVmZmVjdCgoKSA9PiB7XG4gICAgICByZWYuY3VycmVudCA9IGNhbGxiYWNrO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgICByZWYuY3VycmVudCA9IGNhbGxiYWNrO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBSZWFjdC51c2VNZW1vKCgpID0+ICguLi5hcmdzKSA9PiByZWYuY3VycmVudD8uKC4uLmFyZ3MpLCBbXSk7XG59XG5leHBvcnQge1xuICB1c2VFZmZlY3RFdmVudFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L3VzZS1lc2NhcGUta2V5ZG93bi9zcmMvdXNlLWVzY2FwZS1rZXlkb3duLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWNhbGxiYWNrLXJlZlwiO1xuZnVuY3Rpb24gdXNlRXNjYXBlS2V5ZG93bihvbkVzY2FwZUtleURvd25Qcm9wLCBvd25lckRvY3VtZW50ID0gZ2xvYmFsVGhpcz8uZG9jdW1lbnQpIHtcbiAgY29uc3Qgb25Fc2NhcGVLZXlEb3duID0gdXNlQ2FsbGJhY2tSZWYob25Fc2NhcGVLZXlEb3duUHJvcCk7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICBvbkVzY2FwZUtleURvd24oZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG4gICAgb3duZXJEb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlEb3duLCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gICAgcmV0dXJuICgpID0+IG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlS2V5RG93biwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICB9LCBbb25Fc2NhcGVLZXlEb3duLCBvd25lckRvY3VtZW50XSk7XG59XG5leHBvcnQge1xuICB1c2VFc2NhcGVLZXlkb3duXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvdXNlLWxheW91dC1lZmZlY3Qvc3JjL3VzZS1sYXlvdXQtZWZmZWN0LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG52YXIgdXNlTGF5b3V0RWZmZWN0MiA9IGdsb2JhbFRoaXM/LmRvY3VtZW50ID8gUmVhY3QudXNlTGF5b3V0RWZmZWN0IDogKCkgPT4ge1xufTtcbmV4cG9ydCB7XG4gIHVzZUxheW91dEVmZmVjdDIgYXMgdXNlTGF5b3V0RWZmZWN0XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG5cblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1Jcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgb1trMl0gPSBtW2tdO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xuICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XG4gIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICB9XG4gIH07XG4gIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XG4gIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgaWYgKCFtKSByZXR1cm4gbztcbiAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gIHRyeSB7XG4gICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgfVxuICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gIH1cbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcbiAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XG4gIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICByW2tdID0gYVtqXTtcbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XG4gIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcbiAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cbiAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxuICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xuICB2YXIgaSwgcDtcbiAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xuICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcbiAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgcmV0dXJuIGNvb2tlZDtcbn07XG5cbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gIG9bXCJkZWZhdWx0XCJdID0gdjtcbn07XG5cbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xuICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgYXIgPSBbXTtcbiAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xuICAgIHJldHVybiBhcjtcbiAgfTtcbiAgcmV0dXJuIG93bktleXMobyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIHZhciByLCBzID0gMDtcbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XG4gICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XG4gICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHMgfD0gMTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcbiAgfVxuICByZXR1cm4gbmV4dCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xuICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcbiAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xuICAgICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX2VzRGVjb3JhdGUsXG4gIF9fcnVuSW5pdGlhbGl6ZXJzLFxuICBfX3Byb3BLZXksXG4gIF9fc2V0RnVuY3Rpb25OYW1lLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbiAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXG59O1xuIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX3NsaWNlZFRvQXJyYXkiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsIm5leHQiLCJwdXNoIiwiaXNBcnJheSIsImpzeCIsIl9qc3giLCJqc3hzIiwiX2pzeHMiLCJGcmFnbWVudCIsIl9GcmFnbWVudCIsInVzZVN0YXRlIiwiQXJjaGl2ZSIsIkJ1dHRvbiIsIkRpYWxvZyIsIkRpYWxvZ0NvbnRlbnQiLCJEaWFsb2dIZWFkZXIiLCJEaWFsb2dUaXRsZSIsIkRpYWxvZ0Zvb3RlciIsInVzZVRvYXN0IiwiYXBpIiwiQXJjaGl2ZUJ1dHRvbiIsIl9yZWYiLCJpdGVtVHlwZSIsIml0ZW1JZCIsIml0ZW1OYW1lIiwib25BcmNoaXZlU3VjY2VzcyIsIl9yZWYkdmFyaWFudCIsInZhcmlhbnQiLCJfcmVmJHNpemUiLCJzaXplIiwiX3JlZiRjbGFzc05hbWUiLCJjbGFzc05hbWUiLCJfcmVmJGljb25Pbmx5IiwiaWNvbk9ubHkiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiaXNEaWFsb2dPcGVuIiwic2V0SXNEaWFsb2dPcGVuIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJpc0FyY2hpdmluZyIsInNldElzQXJjaGl2aW5nIiwiX3VzZVRvYXN0Iiwic2hvd1RvYXN0IiwiaGFuZGxlQXJjaGl2ZUNsaWNrIiwiaGFuZGxlQ29uZmlybUFyY2hpdmUiLCJfcmVmMiIsIl9jYWxsZWUiLCJfZXJyb3IkcmVzcG9uc2UiLCJlcnJvck1lc3NhZ2UiLCJfdCIsIl9jb250ZXh0IiwiY29uY2F0IiwiZ2V0SXRlbVR5cGVOYW1lIiwicmVzcG9uc2UiLCJkYXRhIiwibWVzc2FnZSIsInRvTG93ZXJDYXNlIiwiaGFuZGxlQ2xvc2VEaWFsb2ciLCJ0eXBlIiwidHlwZU1hcCIsImNoaWxkcmVuIiwib25DbGljayIsInRpdGxlIiwib3BlbiIsIm9uT3BlbkNoYW5nZSIsImRpc2FibGVkIiwiUmVhY3QiLCJEaWFsb2dEZXNjcmlwdGlvbiIsIklucHV0IiwiQ2hlY2tDaXJjbGUiLCJDb21wbGV0ZUV2ZW50RGlhbG9nIiwiaXNPcGVuIiwib25DbG9zZSIsIm9uQ29uZmlybSIsImV2ZW50VGl0bGUiLCJhdHRlbmRhbmNlQ291bnQiLCJzZXRBdHRlbmRhbmNlQ291bnQiLCJlcnJvciIsInNldEVycm9yIiwiX3VzZVN0YXRlNSIsIl91c2VTdGF0ZTYiLCJpc1N1Ym1pdHRpbmciLCJzZXRJc1N1Ym1pdHRpbmciLCJ1c2VFZmZlY3QiLCJ2YWxpZGF0ZUF0dGVuZGFuY2UiLCJjb3VudCIsInBhcnNlSW50IiwiaXNOYU4iLCJoYW5kbGVTdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsIl94IiwiaGFuZGxlQ2hhbmdlIiwidGFyZ2V0Iiwib25TdWJtaXQiLCJodG1sRm9yIiwiaWQiLCJtaW4iLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwiYXV0b0ZvY3VzIiwib3duS2V5cyIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJmaWx0ZXIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJfb2JqZWN0U3ByZWFkIiwiZm9yRWFjaCIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiX3RvUHJvcGVydHlLZXkiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJFdmVudEZvcm0iLCJfcmVmJGV2ZW50IiwiZXZlbnQiLCJfcmVmJGlzTG9hZGluZyIsImlzTG9hZGluZyIsImRlc2NyaXB0aW9uIiwiZXZlbnRfZGF0ZSIsImV2ZW50X3RpbWUiLCJsb2NhdGlvbiIsImZvcm1EYXRhIiwic2V0Rm9ybURhdGEiLCJlcnJvcnMiLCJzZXRFcnJvcnMiLCJzcGxpdCIsInN1YnN0cmluZyIsInZhbGlkYXRlRm9ybSIsIm5ld0Vycm9ycyIsInRyaW0iLCJfZSR0YXJnZXQiLCJwcmV2IiwidW5kZWZpbmVkIiwic3VibWl0RGF0YSIsIl9lcnJvciRyZXNwb25zZTIiLCJfZXJyb3IkcmVzcG9uc2UzIiwiY29uc29sZSIsImxvZyIsInN0YXR1cyIsImFsZXJ0Iiwicm93cyIsIkRpYWxvZ1ByaW1pdGl2ZSIsIlgiLCJjbiIsIlJvb3QiLCJEaWFsb2dUcmlnZ2VyIiwiVHJpZ2dlciIsIkRpYWxvZ1BvcnRhbCIsIlBvcnRhbCIsIkRpYWxvZ0Nsb3NlIiwiQ2xvc2UiLCJEaWFsb2dPdmVybGF5IiwiZm9yd2FyZFJlZiIsInJlZiIsInByb3BzIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiX2V4Y2x1ZGVkIiwiT3ZlcmxheSIsIl9leGNsdWRlZDIiLCJDb250ZW50IiwiX3JlZjMiLCJfZXhjbHVkZWQzIiwiX3JlZjQiLCJfZXhjbHVkZWQ0IiwiX3JlZjUiLCJfZXhjbHVkZWQ1IiwiVGl0bGUiLCJfcmVmNiIsIl9leGNsdWRlZDYiLCJEZXNjcmlwdGlvbiIsImV2ZW50QXBpIiwiZ2V0RXZlbnRzIiwiZ2V0IiwiZ2V0RXZlbnQiLCJfY2FsbGVlMiIsIl9jb250ZXh0MiIsImNyZWF0ZUV2ZW50IiwiX2NhbGxlZTMiLCJfY29udGV4dDMiLCJwb3N0IiwidXBkYXRlRXZlbnQiLCJfY2FsbGVlNCIsIl9jb250ZXh0NCIsInB1dCIsImRlbGV0ZUV2ZW50IiwiX2NhbGxlZTUiLCJfY29udGV4dDUiLCJjb21wbGV0ZUV2ZW50IiwiX2NhbGxlZTYiLCJfY29udGV4dDYiLCJhdHRlbmRhbmNlX2NvdW50IiwiUGx1cyIsIkNhbGVuZGFyIiwiTWFwUGluIiwiQ2xvY2siLCJVc2VycyIsIkVkaXQiLCJ1c2VBdXRoIiwiQ2FyZCIsIkV2ZW50cyIsIl91c2VBdXRoIiwidXNlciIsImlzQWRtaW4iLCJyb2xlIiwiZXZlbnRzIiwic2V0RXZlbnRzIiwic2V0SXNMb2FkaW5nIiwiaXNGb3JtT3BlbiIsInNldElzRm9ybU9wZW4iLCJfdXNlU3RhdGU3IiwiX3VzZVN0YXRlOCIsInNlbGVjdGVkRXZlbnQiLCJzZXRTZWxlY3RlZEV2ZW50IiwiX3VzZVN0YXRlOSIsIl91c2VTdGF0ZTAiLCJpc0NvbXBsZXRlRGlhbG9nT3BlbiIsInNldElzQ29tcGxldGVEaWFsb2dPcGVuIiwiX3VzZVN0YXRlMSIsIl91c2VTdGF0ZTEwIiwiZXZlbnRUb0NvbXBsZXRlIiwic2V0RXZlbnRUb0NvbXBsZXRlIiwibG9hZEV2ZW50cyIsImhhbmRsZUFkZENsaWNrIiwiaGFuZGxlRWRpdENsaWNrIiwiaGFuZGxlRm9ybUNsb3NlIiwiaGFuZGxlRm9ybVN1Ym1pdCIsInJlc3VsdCIsIl9yZXN1bHQiLCJfdDIiLCJoYW5kbGVEZWxldGVDbGljayIsImhhbmRsZUFyY2hpdmVTdWNjZXNzIiwiaGFuZGxlQ29tcGxldGVDbGljayIsImhhbmRsZUNvbXBsZXRlQ29uZmlybSIsIl90MyIsIl94MiIsIm5vdyIsIkRhdGUiLCJzZXRIb3VycyIsInVwY29taW5nRXZlbnRzIiwiZXZlbnREYXRlIiwic29ydCIsImIiLCJnZXRUaW1lIiwicGFzdEV2ZW50cyIsImZvcm1hdERhdGUiLCJkYXRlU3RyaW5nIiwiZGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsIndlZWtkYXkiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJmb3JtYXRUaW1lIiwidGltZVN0cmluZyIsIl90aW1lU3RyaW5nJHNwbGl0IiwiX3RpbWVTdHJpbmckc3BsaXQyIiwiaG91cnMiLCJtaW51dGVzIiwiaG91ciIsImFtcG0iLCJkaXNwbGF5SG91ciIsInJlbmRlckV2ZW50Q2FyZCIsImlzUGFzdCIsIm1hcCJdLCJzb3VyY2VSb290IjoiIn0=