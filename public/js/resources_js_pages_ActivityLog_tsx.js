"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_ActivityLog_tsx"],{

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

/***/ "./resources/js/components/activity/VirtualActivityTimeline.tsx"
/*!**********************************************************************!*\
  !*** ./resources/js/components/activity/VirtualActivityTimeline.tsx ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/clock.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/globe.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/info.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/tag.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user.js");
/* harmony import */ var _ui_badge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ui/badge */ "./resources/js/components/ui/badge.tsx");
/* harmony import */ var _ui_virtual_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ui/virtual-list */ "./resources/js/components/ui/virtual-list.tsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





/**
 * VirtualActivityTimeline Component
 *
 * Displays activity log in a virtual scrolling timeline for optimal
 * performance with large datasets (>100 items).
 *
 * Features:
 * - Virtual scrolling for large activity logs
 * - Color-coded severity indicators
 * - Relative time formatting
 * - Click to view details
 * - Maintains scroll position
 */
var VirtualActivityTimeline = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(function (_ref) {
  var activities = _ref.activities,
    onActivityClick = _ref.onActivityClick,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 600 : _ref$height;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    scrollOffset = _useState2[0],
    setScrollOffset = _useState2[1];
  /**
   * Get severity color class
   */
  var getSeverityColor = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (severity) {
    switch (severity) {
      case 'info':
        return 'bg-primary-500';
      case 'warning':
        return 'bg-warning-500';
      case 'error':
        return 'bg-error-500';
      case 'critical':
        return 'bg-error-700';
      default:
        return 'bg-neutral-500';
    }
  }, []);
  /**
   * Get severity icon
   */
  var getSeverityIcon = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (severity) {
    switch (severity) {
      case 'info':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
          className: "w-4 h-4"
        });
      case 'warning':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: "w-4 h-4"
        });
      case 'error':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "w-4 h-4"
        });
      case 'critical':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: "w-4 h-4"
        });
      default:
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
          className: "w-4 h-4"
        });
    }
  }, []);
  /**
   * Format relative time
   */
  var formatRelativeTime = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (dateString) {
    var date = new Date(dateString);
    var now = new Date();
    var diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return "".concat(Math.floor(diffInSeconds / 60), " minutes ago");
    if (diffInSeconds < 86400) return "".concat(Math.floor(diffInSeconds / 3600), " hours ago");
    if (diffInSeconds < 604800) return "".concat(Math.floor(diffInSeconds / 86400), " days ago");
    return date.toLocaleDateString();
  }, []);
  /**
   * Render a single activity item
   */
  var renderActivityItem = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (activity, index, style) {
    var isLast = index === activities.length - 1;
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      style: style,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer mx-4 my-2",
        onClick: function onClick() {
          return onActivityClick(activity);
        },
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-start gap-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-col items-center",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "w-3 h-3 rounded-full ".concat(getSeverityColor(activity.severity || 'info'), " mt-1")
            }), !isLast && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "w-0.5 h-full bg-neutral-200 mt-2"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex-shrink-0",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "w-10 h-10 rounded-full bg-primary-100 border-2 border-primary-200 flex items-center justify-center",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
                className: "w-5 h-5 text-primary-600"
              })
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex-1 min-w-0",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center justify-between mb-1",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "font-medium text-neutral-900",
                  children: activity.user_name
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_badge__WEBPACK_IMPORTED_MODULE_10__.Badge, {
                  variant: "outline",
                  size: "sm",
                  children: activity.action
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-500",
                children: formatRelativeTime(activity.created_at)
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-700 mb-3",
              children: activity.description
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-center gap-4 text-xs text-neutral-500",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
                  className: "w-3.5 h-3.5"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  children: activity.module || 'System'
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1",
                children: [getSeverityIcon(activity.severity || 'info'), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "capitalize",
                  children: activity.severity || 'info'
                })]
              }), activity.ip_address && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  className: "w-3.5 h-3.5"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  children: activity.ip_address
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-1",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
                  className: "w-3.5 h-3.5"
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  children: new Date(activity.created_at).toLocaleTimeString()
                })]
              })]
            })]
          })]
        })
      })
    });
  }, [activities.length, onActivityClick, getSeverityColor, getSeverityIcon, formatRelativeTime]);
  /**
   * Handle scroll to save position
   */
  var handleScroll = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (offset) {
    setScrollOffset(offset);
  }, []);
  if (activities.length === 0) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-600 text-lg",
        children: "No activities found"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-500 text-sm mt-2",
        children: "Try adjusting your filters or check back later"
      })]
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "rounded-lg border border-gray-200 overflow-hidden bg-white",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_virtual_list__WEBPACK_IMPORTED_MODULE_11__["default"], {
      items: activities,
      itemHeight: 140,
      height: height,
      renderItem: renderActivityItem,
      onScroll: handleScroll,
      initialScrollOffset: scrollOffset,
      overscanCount: 3
    })
  });
});
VirtualActivityTimeline.displayName = 'VirtualActivityTimeline';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VirtualActivityTimeline);

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

/***/ "./resources/js/components/ui/virtual-list.tsx"
/*!*****************************************************!*\
  !*** ./resources/js/components/ui/virtual-list.tsx ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VirtualList: () => (/* binding */ VirtualList),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-window */ "./node_modules/react-window/dist/react-window.js");

// @ts-nocheck


/**
 * VirtualList Component
 *
 * A reusable virtual scrolling list component that renders only visible items
 * for optimal performance with large datasets (>100 items).
 *
 * Features:
 * - Renders only visible items in viewport
 * - Reduces DOM nodes and memory usage
 * - Maintains scroll position
 * - Configurable item height and list dimensions
 * - Supports custom item rendering
 *
 * Based on react-window's FixedSizeList for performance optimization.
 *
 * @example
 * ```tsx
 * <VirtualList
 *   items={members}
 *   itemHeight={80}
 *   height={600}
 *   renderItem={(member, index, style) => (
 *     <div style={style}>
 *       <MemberRow member={member} />
 *     </div>
 *   )}
 * />
 * ```
 */
function VirtualList(_ref) {
  var items = _ref.items,
    itemHeight = _ref.itemHeight,
    height = _ref.height,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '100%' : _ref$width,
    renderItem = _ref.renderItem,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$overscanCount = _ref.overscanCount,
    overscanCount = _ref$overscanCount === void 0 ? 5 : _ref$overscanCount,
    onScroll = _ref.onScroll,
    _ref$initialScrollOff = _ref.initialScrollOffset,
    initialScrollOffset = _ref$initialScrollOff === void 0 ? 0 : _ref$initialScrollOff;
  var listRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  // Restore scroll position on mount if provided
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (listRef.current && initialScrollOffset > 0) {
      listRef.current.scrollTo(initialScrollOffset);
    }
  }, [initialScrollOffset]);
  // Row renderer wrapper
  var Row = function Row(_ref2) {
    var index = _ref2.index,
      style = _ref2.style;
    var item = items[index];
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: renderItem(item, index, style)
    });
  };
  // Handle scroll events
  var handleScroll = function handleScroll(_ref3) {
    var scrollOffset = _ref3.scrollOffset;
    if (onScroll) {
      onScroll(scrollOffset);
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: className,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_window__WEBPACK_IMPORTED_MODULE_2__.FixedSizeList, {
      ref: listRef,
      height: typeof height === 'number' ? height : parseFloat(height),
      itemCount: items.length,
      itemSize: itemHeight,
      width: width,
      overscanCount: overscanCount,
      onScroll: handleScroll,
      children: Row
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VirtualList);

/***/ },

/***/ "./resources/js/hooks/useVirtualScrolling.ts"
/*!***************************************************!*\
  !*** ./resources/js/hooks/useVirtualScrolling.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useVirtualScrolling: () => (/* binding */ useVirtualScrolling)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Threshold for enabling virtual scrolling
 * Lists with more than this number of items will use virtual scrolling
 */
var VIRTUAL_SCROLL_THRESHOLD = 100;
/**
 * useVirtualScrolling Hook
 *
 * Determines whether to use virtual scrolling based on the number of items.
 * Returns true if the item count exceeds the threshold (100 items).
 *
 * @param itemCount - Number of items in the list
 * @param forceVirtual - Optional flag to force virtual scrolling regardless of count
 * @returns boolean indicating whether to use virtual scrolling
 *
 * @example
 * ```tsx
 * const shouldUseVirtual = useVirtualScrolling(members.length);
 *
 * return shouldUseVirtual ? (
 *   <VirtualMemberTable members={members} />
 * ) : (
 *   <MemberTable members={members} />
 * );
 * ```
 */
function useVirtualScrolling(itemCount) {
  var forceVirtual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (forceVirtual) return true;
    return itemCount > VIRTUAL_SCROLL_THRESHOLD;
  }, [itemCount, forceVirtual]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useVirtualScrolling);

/***/ },

/***/ "./resources/js/lib/activityApi.ts"
/*!*****************************************!*\
  !*** ./resources/js/lib/activityApi.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activityApi: () => (/* binding */ activityApi)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./resources/js/lib/api.ts");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var activityApi = {
  /**
   * Get paginated activities with optional filters
   */
  getActivities: function () {
    var _getActivities = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(filters) {
      var params, queryString, url, response;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            params = new URLSearchParams();
            if (filters !== null && filters !== void 0 && filters.user_id) {
              params.append('user_id', filters.user_id.toString());
            }
            if (filters !== null && filters !== void 0 && filters.start_date) {
              params.append('start_date', filters.start_date);
            }
            if (filters !== null && filters !== void 0 && filters.end_date) {
              params.append('end_date', filters.end_date);
            }
            if (filters !== null && filters !== void 0 && filters.action) {
              params.append('action', filters.action);
            }
            if (filters !== null && filters !== void 0 && filters.entity_type) {
              params.append('entity_type', filters.entity_type);
            }
            if (filters !== null && filters !== void 0 && filters.per_page) {
              params.append('per_page', filters.per_page.toString());
            }
            if (filters !== null && filters !== void 0 && filters.page) {
              params.append('page', filters.page.toString());
            }
            queryString = params.toString();
            url = queryString ? "/activities?".concat(queryString) : '/activities';
            _context.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get(url);
          case 1:
            response = _context.v;
            return _context.a(2, response.data);
        }
      }, _callee);
    }));
    function getActivities(_x) {
      return _getActivities.apply(this, arguments);
    }
    return getActivities;
  }(),
  /**
   * Get list of users for filter dropdown
   */
  getUsers: function () {
    var _getUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return _api__WEBPACK_IMPORTED_MODULE_0__["default"].get('/activities/users');
          case 1:
            response = _context2.v;
            return _context2.a(2, response.data.data);
        }
      }, _callee2);
    }));
    function getUsers() {
      return _getUsers.apply(this, arguments);
    }
    return getUsers;
  }()
};

/***/ },

/***/ "./resources/js/pages/ActivityLog.tsx"
/*!********************************************!*\
  !*** ./resources/js/pages/ActivityLog.tsx ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/circle-x.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/funnel.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/triangle-alert.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/activity.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/clock.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/download.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/globe.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/info.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/tag.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _lib_activityApi__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../lib/activityApi */ "./resources/js/lib/activityApi.ts");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_modal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/ui/modal */ "./resources/js/components/ui/modal.tsx");
/* harmony import */ var _components_ui_badge__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../components/ui/badge */ "./resources/js/components/ui/badge.tsx");
/* harmony import */ var _hooks_useVirtualScrolling__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../hooks/useVirtualScrolling */ "./resources/js/hooks/useVirtualScrolling.ts");
/* harmony import */ var _components_activity_VirtualActivityTimeline__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../components/activity/VirtualActivityTimeline */ "./resources/js/components/activity/VirtualActivityTimeline.tsx");
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










var ActivityLog = function ActivityLog() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    activities = _useState2[0],
    setActivities = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    users = _useState4[0],
    setUsers = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedActivity = _useState8[0],
    setSelectedActivity = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    isDetailModalOpen = _useState0[0],
    setIsDetailModalOpen = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState10 = _slicedToArray(_useState1, 2),
    realTimeEnabled = _useState10[0],
    setRealTimeEnabled = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      page: 1,
      per_page: 20
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    filters = _useState12[0],
    setFilters = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
      current_page: 1,
      per_page: 20,
      total: 0,
      last_page: 1,
      from: null,
      to: null
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    pagination = _useState14[0],
    setPagination = _useState14[1];
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_15__.useToast)(),
    showToast = _useToast.showToast;
  // Determine if we should use virtual scrolling (>100 items)
  var shouldUseVirtualScrolling = (0,_hooks_useVirtualScrolling__WEBPACK_IMPORTED_MODULE_19__.useVirtualScrolling)(activities.length);
  // Fetch users for filter dropdown
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var fetchUsers = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var usersData, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _lib_activityApi__WEBPACK_IMPORTED_MODULE_14__.activityApi.getUsers();
            case 1:
              usersData = _context.v;
              setUsers(usersData);
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error('Failed to fetch users:', _t);
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      return function fetchUsers() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchUsers();
  }, []);
  // Fetch activities when filters change
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var fetchActivities = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var response, enhancedActivities, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              setLoading(true);
              _context2.p = 1;
              _context2.n = 2;
              return _lib_activityApi__WEBPACK_IMPORTED_MODULE_14__.activityApi.getActivities(filters);
            case 2:
              response = _context2.v;
              // Enhance activities with severity and module info
              enhancedActivities = response.data.map(function (activity) {
                return _objectSpread(_objectSpread({}, activity), {}, {
                  severity: determineSeverity(activity),
                  module: extractModule(activity.entity_type)
                });
              });
              setActivities(enhancedActivities);
              setPagination(response.pagination);
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              console.error('Failed to fetch activities:', _t2);
              showToast('error', 'Failed to load activity log');
            case 4:
              _context2.p = 4;
              setLoading(false);
              return _context2.f(4);
            case 5:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 3, 4, 5]]);
      }));
      return function fetchActivities() {
        return _ref2.apply(this, arguments);
      };
    }();
    fetchActivities();
  }, [filters, showToast]);
  // Real-time updates polling
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!realTimeEnabled) return;
    var interval = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var response, enhancedActivities, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return _lib_activityApi__WEBPACK_IMPORTED_MODULE_14__.activityApi.getActivities(_objectSpread(_objectSpread({}, filters), {}, {
              page: 1
            }));
          case 1:
            response = _context3.v;
            enhancedActivities = response.data.map(function (activity) {
              return _objectSpread(_objectSpread({}, activity), {}, {
                severity: determineSeverity(activity),
                module: extractModule(activity.entity_type)
              });
            });
            setActivities(enhancedActivities);
            setPagination(response.pagination);
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t3 = _context3.v;
            console.error('Failed to refresh activities:', _t3);
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    })), 30000); // Refresh every 30 seconds
    return function () {
      return clearInterval(interval);
    };
  }, [realTimeEnabled, filters]);
  // Helper function to determine severity based on action
  var determineSeverity = function determineSeverity(activity) {
    var action = activity.action.toLowerCase();
    if (action.includes('delete') || action.includes('remove')) return 'error';
    if (action.includes('fail') || action.includes('error')) return 'critical';
    if (action.includes('update') || action.includes('edit')) return 'warning';
    return 'info';
  };
  // Helper function to extract module from entity type
  var extractModule = function extractModule(entityType) {
    if (!entityType) return 'System';
    // Convert entity type like "App\\Models\\Member" to "Members"
    var parts = entityType.split('\\');
    var modelName = parts[parts.length - 1];
    return modelName.endsWith('s') ? modelName : "".concat(modelName, "s");
  };
  var handleFilterChange = function handleFilterChange(key, value) {
    setFilters(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty(_defineProperty({}, key, value || undefined), "page", 1));
    });
  };
  var handlePageChange = function handlePageChange(newPage) {
    setFilters(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        page: newPage
      });
    });
    // Scroll to top when page changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  var clearFilters = function clearFilters() {
    setFilters({
      page: 1,
      per_page: 20
    });
    showToast('success', 'Filters cleared');
  };
  var handleExportLog = function handleExportLog() {
    showToast('info', 'Export functionality coming soon');
    // TODO: Implement export to CSV/PDF
  };
  var handleActivityClick = function handleActivityClick(activity) {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };
  var getSeverityColor = function getSeverityColor(severity) {
    switch (severity) {
      case 'info':
        return 'bg-primary-500';
      case 'warning':
        return 'bg-warning-500';
      case 'error':
        return 'bg-error-500';
      case 'critical':
        return 'bg-error-700';
      default:
        return 'bg-neutral-500';
    }
  };
  var getSeverityIcon = function getSeverityIcon(severity) {
    switch (severity) {
      case 'info':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
          className: "w-4 h-4"
        });
      case 'warning':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
          className: "w-4 h-4"
        });
      case 'error':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
          className: "w-4 h-4"
        });
      case 'critical':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: "w-4 h-4"
        });
      default:
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
          className: "w-4 h-4"
        });
    }
  };
  var formatRelativeTime = function formatRelativeTime(dateString) {
    var date = new Date(dateString);
    var now = new Date();
    var diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return "".concat(Math.floor(diffInSeconds / 60), " minutes ago");
    if (diffInSeconds < 86400) return "".concat(Math.floor(diffInSeconds / 3600), " hours ago");
    if (diffInSeconds < 604800) return "".concat(Math.floor(diffInSeconds / 86400), " days ago");
    return date.toLocaleDateString();
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "p-6 max-w-7xl mx-auto",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "mb-6",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
            className: "text-3xl font-bold text-neutral-900 flex items-center gap-3",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
              className: "w-8 h-8 text-primary-600"
            }), "Activity Log"]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-neutral-600 mt-2",
            children: "System activity and audit trail"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_16__.Button, {
            variant: "outline",
            icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {}),
            onClick: handleExportLog,
            children: "Export Log"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_16__.Button, {
            variant: "ghost",
            icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"], {}),
            onClick: clearFilters,
            children: "Clear Filters"
          })]
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-between mb-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "w-5 h-5 text-neutral-600"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
            className: "text-lg font-semibold text-neutral-900",
            children: "Filters"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
          className: "flex items-center gap-2 cursor-pointer",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "checkbox",
            checked: realTimeEnabled,
            onChange: function onChange(e) {
              return setRealTimeEnabled(e.target.checked);
            },
            className: "w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-sm text-neutral-700",
            children: "Real-time updates"
          })]
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            className: "block text-sm font-medium text-neutral-700 mb-1",
            children: "Start Date"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "date",
            className: "w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm",
            value: filters.start_date || '',
            onChange: function onChange(e) {
              return handleFilterChange('start_date', e.target.value);
            }
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            className: "block text-sm font-medium text-neutral-700 mb-1",
            children: "End Date"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
            type: "date",
            className: "w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm",
            value: filters.end_date || '',
            onChange: function onChange(e) {
              return handleFilterChange('end_date', e.target.value);
            }
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            className: "block text-sm font-medium text-neutral-700 mb-1",
            children: "User"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
            className: "w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm",
            value: filters.user_id || '',
            onChange: function onChange(e) {
              return handleFilterChange('user_id', e.target.value ? parseInt(e.target.value) : '');
            },
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "",
              children: "All Users"
            }), users.map(function (user) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                value: user.id,
                children: user.name
              }, user.id);
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            className: "block text-sm font-medium text-neutral-700 mb-1",
            children: "Action"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
            className: "w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm",
            value: filters.action || '',
            onChange: function onChange(e) {
              return handleFilterChange('action', e.target.value);
            },
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "",
              children: "All Actions"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "create",
              children: "Create"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "update",
              children: "Update"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "delete",
              children: "Delete"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "login",
              children: "Login"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "logout",
              children: "Logout"
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            className: "block text-sm font-medium text-neutral-700 mb-1",
            children: "Module"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
            className: "w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm",
            value: filters.entity_type || '',
            onChange: function onChange(e) {
              return handleFilterChange('entity_type', e.target.value);
            },
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "",
              children: "All Modules"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "Member",
              children: "Members"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "Event",
              children: "Events"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "Offering",
              children: "Finance"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "Expense",
              children: "Finance"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "SmallGroup",
              children: "Small Groups"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
              value: "User",
              children: "Users"
            })]
          })]
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "space-y-4",
      children: loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary-600 border-t-transparent"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "mt-4 text-neutral-600",
          children: "Loading activities..."
        })]
      }) : activities.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
          className: "w-16 h-16 mx-auto mb-4 text-neutral-400"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-neutral-600 text-lg",
          children: "No activities found"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-neutral-500 text-sm mt-2",
          children: "Try adjusting your filters or check back later"
        })]
      }) : shouldUseVirtualScrolling ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_activity_VirtualActivityTimeline__WEBPACK_IMPORTED_MODULE_20__["default"], {
          activities: activities,
          onActivityClick: handleActivityClick,
          height: 600
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "bg-white rounded-xl shadow-sm border border-neutral-200 px-6 py-4 flex items-center justify-between",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "text-sm text-neutral-700",
            children: ["Showing ", pagination.from || 0, " to ", pagination.to || 0, " of ", pagination.total, ' ', "activities"]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_16__.Button, {
              variant: "outline",
              size: "sm",
              onClick: function onClick() {
                return handlePageChange(pagination.current_page - 1);
              },
              disabled: pagination.current_page === 1,
              children: "Previous"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
              className: "text-sm text-neutral-700 px-3",
              children: ["Page ", pagination.current_page, " of ", pagination.last_page]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_16__.Button, {
              variant: "outline",
              size: "sm",
              onClick: function onClick() {
                return handlePageChange(pagination.current_page + 1);
              },
              disabled: pagination.current_page === pagination.last_page,
              children: "Next"
            })]
          })]
        })]
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [activities.map(function (activity, index) {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer",
            onClick: function onClick() {
              return handleActivityClick(activity);
            },
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex items-start gap-4",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col items-center",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "w-3 h-3 rounded-full ".concat(getSeverityColor(activity.severity || 'info'), " mt-1")
                }), index < activities.length - 1 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "w-0.5 h-full bg-neutral-200 mt-2"
                })]
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "flex-shrink-0",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "w-10 h-10 rounded-full bg-primary-100 border-2 border-primary-200 flex items-center justify-center",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], {
                    className: "w-5 h-5 text-primary-600"
                  })
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex-1 min-w-0",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center justify-between mb-1",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      className: "font-medium text-neutral-900",
                      children: activity.user_name
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_18__.Badge, {
                      variant: "outline",
                      size: "sm",
                      children: activity.action
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-sm text-neutral-500",
                    children: formatRelativeTime(activity.created_at)
                  })]
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                  className: "text-sm text-neutral-700 mb-3",
                  children: activity.description
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center gap-4 text-xs text-neutral-500",
                  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
                      className: "w-3.5 h-3.5"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      children: activity.module || 'System'
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [getSeverityIcon(activity.severity || 'info'), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      className: "capitalize",
                      children: activity.severity || 'info'
                    })]
                  }), activity.ip_address && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"], {
                      className: "w-3.5 h-3.5"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      children: activity.ip_address
                    })]
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
                      className: "w-3.5 h-3.5"
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      children: new Date(activity.created_at).toLocaleTimeString()
                    })]
                  })]
                })]
              })]
            })
          }, activity.id);
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "bg-white rounded-xl shadow-sm border border-neutral-200 px-6 py-4 flex items-center justify-between",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "text-sm text-neutral-700",
            children: ["Showing ", pagination.from || 0, " to ", pagination.to || 0, " of ", pagination.total, ' ', "activities"]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_16__.Button, {
              variant: "outline",
              size: "sm",
              onClick: function onClick() {
                return handlePageChange(pagination.current_page - 1);
              },
              disabled: pagination.current_page === 1,
              children: "Previous"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
              className: "text-sm text-neutral-700 px-3",
              children: ["Page ", pagination.current_page, " of ", pagination.last_page]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_16__.Button, {
              variant: "outline",
              size: "sm",
              onClick: function onClick() {
                return handlePageChange(pagination.current_page + 1);
              },
              disabled: pagination.current_page === pagination.last_page,
              children: "Next"
            })]
          })]
        })]
      })
    }), selectedActivity && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_modal__WEBPACK_IMPORTED_MODULE_17__.Modal, {
      isOpen: isDetailModalOpen,
      onClose: function onClose() {
        return setIsDetailModalOpen(false);
      },
      title: "Activity Details",
      size: "lg",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "space-y-6",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-semibold text-neutral-900 mb-3",
            children: "User Information"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-neutral-50 rounded-lg p-4 space-y-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "Name:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-medium text-neutral-900",
                children: selectedActivity.user_name
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "User ID:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "text-sm font-medium text-neutral-900",
                children: ["#", selectedActivity.user_id]
              })]
            }), selectedActivity.ip_address && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "IP Address:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-medium text-neutral-900",
                children: selectedActivity.ip_address
              })]
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-semibold text-neutral-900 mb-3",
            children: "Action Details"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-neutral-50 rounded-lg p-4 space-y-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "Action Type:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_badge__WEBPACK_IMPORTED_MODULE_18__.Badge, {
                variant: "outline",
                children: selectedActivity.action
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "Module:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-medium text-neutral-900",
                children: selectedActivity.module || 'System'
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "Timestamp:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-medium text-neutral-900",
                children: new Date(selectedActivity.created_at).toLocaleString()
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "Severity:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [getSeverityIcon(selectedActivity.severity || 'info'), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "text-sm font-medium text-neutral-900 capitalize",
                  children: selectedActivity.severity || 'info'
                })]
              })]
            })]
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-semibold text-neutral-900 mb-3",
            children: "Description"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "bg-neutral-50 rounded-lg p-4",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm text-neutral-700",
              children: selectedActivity.description
            })
          })]
        }), selectedActivity.entity_id && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
            className: "text-sm font-semibold text-neutral-900 mb-3",
            children: "Entity Information"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bg-neutral-50 rounded-lg p-4 space-y-2",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "Entity Type:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-medium text-neutral-900",
                children: selectedActivity.entity_type
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "flex justify-between",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm text-neutral-600",
                children: "Entity ID:"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "text-sm font-medium text-neutral-900",
                children: ["#", selectedActivity.entity_id]
              })]
            })]
          })]
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "mt-6 flex justify-end",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_button__WEBPACK_IMPORTED_MODULE_16__.Button, {
          variant: "outline",
          onClick: function onClick() {
            return setIsDetailModalOpen(false);
          },
          children: "Close"
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActivityLog);

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

/***/ "./node_modules/lucide-react/dist/esm/icons/globe.js"
/*!***********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/globe.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Globe)
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
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("globe", __iconNode);


//# sourceMappingURL=globe.js.map


/***/ },

/***/ "./node_modules/lucide-react/dist/esm/icons/tag.js"
/*!*********************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/tag.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Tag)
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("tag", __iconNode);


//# sourceMappingURL=tag.js.map


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

/***/ "./node_modules/react-window/dist/react-window.js"
/*!********************************************************!*\
  !*** ./node_modules/react-window/dist/react-window.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grid: () => (/* binding */ Ee),
/* harmony export */   List: () => (/* binding */ Ae),
/* harmony export */   getScrollbarSize: () => (/* binding */ $e),
/* harmony export */   useDynamicRowHeight: () => (/* binding */ ke),
/* harmony export */   useGridCallbackRef: () => (/* binding */ Re),
/* harmony export */   useGridRef: () => (/* binding */ Ve),
/* harmony export */   useListCallbackRef: () => (/* binding */ Le),
/* harmony export */   useListRef: () => (/* binding */ Me)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
"use client";


function xe(e) {
  let t = e;
  for (; t; ) {
    if (t.dir)
      return t.dir === "rtl";
    t = t.parentElement;
  }
  return !1;
}
function ve(e, t) {
  const [s, r] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(t === "rtl");
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    e && (t || r(xe(e)));
  }, [t, e]), s;
}
const q = typeof window < "u" ? react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_1__.useEffect;
function ie(e) {
  if (e !== void 0)
    switch (typeof e) {
      case "number":
        return e;
      case "string": {
        if (e.endsWith("px"))
          return parseFloat(e);
        break;
      }
    }
}
function be({
  box: e,
  defaultHeight: t,
  defaultWidth: s,
  disabled: r,
  element: n,
  mode: o,
  style: i
}) {
  const { styleHeight: f, styleWidth: l } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
    () => ({
      styleHeight: ie(i?.height),
      styleWidth: ie(i?.width)
    }),
    [i?.height, i?.width]
  ), [c, d] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    height: t,
    width: s
  }), a = r || o === "only-height" && f !== void 0 || o === "only-width" && l !== void 0 || f !== void 0 && l !== void 0;
  return q(() => {
    if (n === null || a)
      return;
    const h = new ResizeObserver((p) => {
      for (const I of p) {
        const { contentRect: u, target: w } = I;
        n === w && d((m) => m.height === u.height && m.width === u.width ? m : {
          height: u.height,
          width: u.width
        });
      }
    });
    return h.observe(n, { box: e }), () => {
      h?.unobserve(n);
    };
  }, [e, a, n, f, l]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
    () => ({
      height: f ?? c.height,
      width: l ?? c.width
    }),
    [c, f, l]
  );
}
function ae(e) {
  const t = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(() => {
    throw new Error("Cannot call during render.");
  });
  return q(() => {
    t.current = e;
  }, [e]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((s) => t.current?.(s), [t]);
}
let U = null;
function Ie(e = !1) {
  if (U === null || e) {
    const t = document.createElement("div"), s = t.style;
    s.width = "50px", s.height = "50px", s.overflow = "scroll", s.direction = "rtl";
    const r = document.createElement("div"), n = r.style;
    return n.width = "100px", n.height = "100px", t.appendChild(r), document.body.appendChild(t), t.scrollLeft > 0 ? U = "positive-descending" : (t.scrollLeft = 1, t.scrollLeft === 0 ? U = "negative" : U = "positive-ascending"), document.body.removeChild(t), U;
  }
  return U;
}
function Z({
  containerElement: e,
  direction: t,
  isRtl: s,
  scrollOffset: r
}) {
  if (t === "horizontal" && s)
    switch (Ie()) {
      case "negative":
        return -r;
      case "positive-descending": {
        if (e) {
          const { clientWidth: n, scrollLeft: o, scrollWidth: i } = e;
          return i - n - o;
        }
        break;
      }
    }
  return r;
}
function L(e, t = "Assertion error") {
  if (!e)
    throw console.error(t), Error(t);
}
function Y(e, t) {
  if (e === t)
    return !0;
  if (!!e != !!t || (L(e !== void 0), L(t !== void 0), Object.keys(e).length !== Object.keys(t).length))
    return !1;
  for (const s in e)
    if (!Object.is(t[s], e[s]))
      return !1;
  return !0;
}
function fe({
  cachedBounds: e,
  itemCount: t,
  itemSize: s
}) {
  if (t === 0)
    return 0;
  if (typeof s == "number")
    return t * s;
  {
    const r = e.get(
      e.size === 0 ? 0 : e.size - 1
    );
    L(r !== void 0, "Unexpected bounds cache miss");
    const n = (r.scrollOffset + r.size) / e.size;
    return t * n;
  }
}
function we({
  align: e,
  cachedBounds: t,
  index: s,
  itemCount: r,
  itemSize: n,
  containerScrollOffset: o,
  containerSize: i
}) {
  if (s < 0 || s >= r)
    throw RangeError(`Invalid index specified: ${s}`, {
      cause: `Index ${s} is not within the range of 0 - ${r - 1}`
    });
  const f = fe({
    cachedBounds: t,
    itemCount: r,
    itemSize: n
  }), l = t.get(s), c = Math.max(
    0,
    Math.min(f - i, l.scrollOffset)
  ), d = Math.max(
    0,
    l.scrollOffset - i + l.size
  );
  switch (e === "smart" && (o >= d && o <= c ? e = "auto" : e = "center"), e) {
    case "start":
      return c;
    case "end":
      return d;
    case "center":
      return l.scrollOffset <= i / 2 ? 0 : l.scrollOffset + l.size / 2 >= f - i / 2 ? f - i : l.scrollOffset + l.size / 2 - i / 2;
    case "auto":
    default:
      return o >= d && o <= c ? o : o < d ? d : c;
  }
}
function P({
  cachedBounds: e,
  containerScrollOffset: t,
  containerSize: s,
  itemCount: r,
  overscanCount: n
}) {
  const o = r - 1;
  let i = 0, f = -1, l = 0, c = -1, d = 0;
  for (; d < o; ) {
    const a = e.get(d);
    if (a.scrollOffset + a.size > t)
      break;
    d++;
  }
  for (i = d, l = Math.max(0, i - n); d < o; ) {
    const a = e.get(d);
    if (a.scrollOffset + a.size >= t + s)
      break;
    d++;
  }
  return f = Math.min(o, d), c = Math.min(r - 1, f + n), i < 0 && (i = 0, f = -1, l = 0, c = -1), {
    startIndexVisible: i,
    stopIndexVisible: f,
    startIndexOverscan: l,
    stopIndexOverscan: c
  };
}
function me({
  itemCount: e,
  itemProps: t,
  itemSize: s
}) {
  const r = /* @__PURE__ */ new Map();
  return {
    get(n) {
      for (L(n < e, `Invalid index ${n}`); r.size - 1 < n; ) {
        const i = r.size;
        let f;
        switch (typeof s) {
          case "function": {
            f = s(i, t);
            break;
          }
          case "number": {
            f = s;
            break;
          }
        }
        if (i === 0)
          r.set(i, {
            size: f,
            scrollOffset: 0
          });
        else {
          const l = r.get(i - 1);
          L(
            l !== void 0,
            `Unexpected bounds cache miss for index ${n}`
          ), r.set(i, {
            scrollOffset: l.scrollOffset + l.size,
            size: f
          });
        }
      }
      const o = r.get(n);
      return L(
        o !== void 0,
        `Unexpected bounds cache miss for index ${n}`
      ), o;
    },
    set(n, o) {
      r.set(n, o);
    },
    get size() {
      return r.size;
    }
  };
}
function Oe({
  itemCount: e,
  itemProps: t,
  itemSize: s
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
    () => me({
      itemCount: e,
      itemProps: t,
      itemSize: s
    }),
    [e, t, s]
  );
}
function ye({
  containerSize: e,
  itemSize: t
}) {
  let s;
  switch (typeof t) {
    case "string": {
      L(
        t.endsWith("%"),
        `Invalid item size: "${t}"; string values must be percentages (e.g. "100%")`
      ), L(
        e !== void 0,
        "Container size must be defined if a percentage item size is specified"
      ), s = e * parseInt(t) / 100;
      break;
    }
    default: {
      s = t;
      break;
    }
  }
  return s;
}
function te({
  containerElement: e,
  containerStyle: t,
  defaultContainerSize: s = 0,
  direction: r,
  isRtl: n = !1,
  itemCount: o,
  itemProps: i,
  itemSize: f,
  onResize: l,
  overscanCount: c
}) {
  const { height: d = s, width: a = s } = be({
    defaultHeight: r === "vertical" ? s : void 0,
    defaultWidth: r === "horizontal" ? s : void 0,
    element: e,
    mode: r === "vertical" ? "only-height" : "only-width",
    style: t
  }), h = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    height: 0,
    width: 0
  }), p = r === "vertical" ? d : a, I = ye({ containerSize: p, itemSize: f });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useLayoutEffect)(() => {
    if (typeof l == "function") {
      const g = h.current;
      (g.height !== d || g.width !== a) && (l({ height: d, width: a }, { ...g }), g.height = d, g.width = a);
    }
  }, [d, l, a]);
  const u = Oe({
    itemCount: o,
    itemProps: i,
    itemSize: I
  }), w = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (g) => u.get(g),
    [u]
  ), [m, O] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(
    () => P({
      cachedBounds: u,
      // TODO Potentially support a defaultScrollOffset prop?
      containerScrollOffset: 0,
      containerSize: p,
      itemCount: o,
      overscanCount: c
    })
  ), {
    startIndexVisible: G,
    startIndexOverscan: x,
    stopIndexVisible: F,
    stopIndexOverscan: V
  } = {
    startIndexVisible: Math.min(o - 1, m.startIndexVisible),
    startIndexOverscan: Math.min(o - 1, m.startIndexOverscan),
    stopIndexVisible: Math.min(o - 1, m.stopIndexVisible),
    stopIndexOverscan: Math.min(o - 1, m.stopIndexOverscan)
  }, z = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    () => fe({
      cachedBounds: u,
      itemCount: o,
      itemSize: I
    }),
    [u, o, I]
  ), $ = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (g) => {
      const S = Z({
        containerElement: e,
        direction: r,
        isRtl: n,
        scrollOffset: g
      });
      return P({
        cachedBounds: u,
        containerScrollOffset: S,
        containerSize: p,
        itemCount: o,
        overscanCount: c
      });
    },
    [
      u,
      e,
      p,
      r,
      n,
      o,
      c
    ]
  );
  q(() => {
    const g = (r === "vertical" ? e?.scrollTop : e?.scrollLeft) ?? 0;
    O($(g));
  }, [e, r, $]), q(() => {
    if (!e)
      return;
    const g = () => {
      O((S) => {
        const { scrollLeft: E, scrollTop: b } = e, v = Z({
          containerElement: e,
          direction: r,
          isRtl: n,
          scrollOffset: r === "vertical" ? b : E
        }), R = P({
          cachedBounds: u,
          containerScrollOffset: v,
          containerSize: p,
          itemCount: o,
          overscanCount: c
        });
        return Y(R, S) ? S : R;
      });
    };
    return e.addEventListener("scroll", g), () => {
      e.removeEventListener("scroll", g);
    };
  }, [
    u,
    e,
    p,
    r,
    o,
    c
  ]);
  const y = ae(
    ({
      align: g = "auto",
      containerScrollOffset: S,
      index: E
    }) => {
      let b = we({
        align: g,
        cachedBounds: u,
        containerScrollOffset: S,
        containerSize: p,
        index: E,
        itemCount: o,
        itemSize: I
      });
      if (e) {
        if (b = Z({
          containerElement: e,
          direction: r,
          isRtl: n,
          scrollOffset: b
        }), typeof e.scrollTo != "function") {
          const v = $(b);
          Y(m, v) || O(v);
        }
        return b;
      }
    }
  );
  return {
    getCellBounds: w,
    getEstimatedSize: z,
    scrollToIndex: y,
    startIndexOverscan: x,
    startIndexVisible: G,
    stopIndexOverscan: V,
    stopIndexVisible: F
  };
}
function de(e) {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => e, Object.values(e));
}
function ue(e, t) {
  const {
    ariaAttributes: s,
    style: r,
    ...n
  } = e, {
    ariaAttributes: o,
    style: i,
    ...f
  } = t;
  return Y(s, o) && Y(r, i) && Y(n, f);
}
function Ee({
  cellComponent: e,
  cellProps: t,
  children: s,
  className: r,
  columnCount: n,
  columnWidth: o,
  defaultHeight: i = 0,
  defaultWidth: f = 0,
  dir: l,
  gridRef: c,
  onCellsRendered: d,
  onResize: a,
  overscanCount: h = 3,
  rowCount: p,
  rowHeight: I,
  style: u,
  tagName: w = "div",
  ...m
}) {
  const O = de(t), G = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
    () => (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(e, ue),
    [e]
  ), [x, F] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), V = ve(x, l), {
    getCellBounds: z,
    getEstimatedSize: $,
    startIndexOverscan: y,
    startIndexVisible: g,
    scrollToIndex: S,
    stopIndexOverscan: E,
    stopIndexVisible: b
  } = te({
    containerElement: x,
    containerStyle: u,
    defaultContainerSize: f,
    direction: "horizontal",
    isRtl: V,
    itemCount: n,
    itemProps: O,
    itemSize: o,
    onResize: a,
    overscanCount: h
  }), {
    getCellBounds: v,
    getEstimatedSize: R,
    startIndexOverscan: k,
    startIndexVisible: ne,
    scrollToIndex: Q,
    stopIndexOverscan: _,
    stopIndexVisible: oe
  } = te({
    containerElement: x,
    containerStyle: u,
    defaultContainerSize: i,
    direction: "vertical",
    itemCount: p,
    itemProps: O,
    itemSize: I,
    onResize: a,
    overscanCount: h
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(
    c,
    () => ({
      get element() {
        return x;
      },
      scrollToCell({
        behavior: H = "auto",
        columnAlign: T = "auto",
        columnIndex: W,
        rowAlign: B = "auto",
        rowIndex: j
      }) {
        const N = S({
          align: T,
          containerScrollOffset: x?.scrollLeft ?? 0,
          index: W
        }), ge = Q({
          align: B,
          containerScrollOffset: x?.scrollTop ?? 0,
          index: j
        });
        typeof x?.scrollTo == "function" && x.scrollTo({
          behavior: H,
          left: N,
          top: ge
        });
      },
      scrollToColumn({
        align: H = "auto",
        behavior: T = "auto",
        index: W
      }) {
        const B = S({
          align: H,
          containerScrollOffset: x?.scrollLeft ?? 0,
          index: W
        });
        typeof x?.scrollTo == "function" && x.scrollTo({
          behavior: T,
          left: B
        });
      },
      scrollToRow({
        align: H = "auto",
        behavior: T = "auto",
        index: W
      }) {
        const B = Q({
          align: H,
          containerScrollOffset: x?.scrollTop ?? 0,
          index: W
        });
        typeof x?.scrollTo == "function" && x.scrollTo({
          behavior: T,
          top: B
        });
      }
    }),
    [x, S, Q]
  ), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    y >= 0 && E >= 0 && k >= 0 && _ >= 0 && d && d(
      {
        columnStartIndex: g,
        columnStopIndex: b,
        rowStartIndex: ne,
        rowStopIndex: oe
      },
      {
        columnStartIndex: y,
        columnStopIndex: E,
        rowStartIndex: k,
        rowStopIndex: _
      }
    );
  }, [
    d,
    y,
    g,
    E,
    b,
    k,
    ne,
    _,
    oe
  ]);
  const he = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const H = [];
    if (n > 0 && p > 0)
      for (let T = k; T <= _; T++) {
        const W = v(T), B = [];
        for (let j = y; j <= E; j++) {
          const N = z(j);
          B.push(
            /* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
              G,
              {
                ...O,
                ariaAttributes: {
                  "aria-colindex": j + 1,
                  role: "gridcell"
                },
                columnIndex: j,
                key: j,
                rowIndex: T,
                style: {
                  position: "absolute",
                  left: V ? void 0 : 0,
                  right: V ? 0 : void 0,
                  transform: `translate(${V ? -N.scrollOffset : N.scrollOffset}px, ${W.scrollOffset}px)`,
                  height: W.size,
                  width: N.size
                }
              }
            )
          );
        }
        H.push(
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { role: "row", "aria-rowindex": T + 1, children: B }, T)
        );
      }
    return H;
  }, [
    G,
    O,
    n,
    y,
    E,
    z,
    v,
    V,
    p,
    k,
    _
  ]), pe = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "div",
    {
      "aria-hidden": !0,
      style: {
        height: R(),
        width: $(),
        zIndex: -1
      }
    }
  );
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
    w,
    {
      "aria-colcount": n,
      "aria-rowcount": p,
      role: "grid",
      ...m,
      className: r,
      dir: l,
      ref: F,
      style: {
        position: "relative",
        maxHeight: "100%",
        maxWidth: "100%",
        flexGrow: 1,
        overflow: "auto",
        ...u
      }
    },
    he,
    s,
    pe
  );
}
const Re = react__WEBPACK_IMPORTED_MODULE_1__.useState, Ve = react__WEBPACK_IMPORTED_MODULE_1__.useRef;
function ze(e) {
  return e != null && typeof e == "object" && "getAverageRowHeight" in e && typeof e.getAverageRowHeight == "function";
}
const se = "data-react-window-index";
function Ae({
  children: e,
  className: t,
  defaultHeight: s = 0,
  listRef: r,
  onResize: n,
  onRowsRendered: o,
  overscanCount: i = 3,
  rowComponent: f,
  rowCount: l,
  rowHeight: c,
  rowProps: d,
  tagName: a = "div",
  style: h,
  ...p
}) {
  const I = de(d), u = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
    () => (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(f, ue),
    [f]
  ), [w, m] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), O = ze(c), G = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => O ? (b) => c.getRowHeight(b) ?? c.getAverageRowHeight() : c, [O, c]), {
    getCellBounds: x,
    getEstimatedSize: F,
    scrollToIndex: V,
    startIndexOverscan: z,
    startIndexVisible: $,
    stopIndexOverscan: y,
    stopIndexVisible: g
  } = te({
    containerElement: w,
    containerStyle: h,
    defaultContainerSize: s,
    direction: "vertical",
    itemCount: l,
    itemProps: I,
    itemSize: G,
    onResize: n,
    overscanCount: i
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(
    r,
    () => ({
      get element() {
        return w;
      },
      scrollToRow({
        align: b = "auto",
        behavior: v = "auto",
        index: R
      }) {
        const k = V({
          align: b,
          containerScrollOffset: w?.scrollTop ?? 0,
          index: R
        });
        typeof w?.scrollTo == "function" && w.scrollTo({
          behavior: v,
          top: k
        });
      }
    }),
    [w, V]
  ), q(() => {
    if (!w)
      return;
    const b = Array.from(w.children).filter((v, R) => {
      if (v.hasAttribute("aria-hidden"))
        return !1;
      const k = `${z + R}`;
      return v.setAttribute(se, k), !0;
    });
    if (O)
      return c.observeRowElements(b);
  }, [
    w,
    O,
    c,
    z,
    y
  ]), (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    z >= 0 && y >= 0 && o && o(
      {
        startIndex: $,
        stopIndex: g
      },
      {
        startIndex: z,
        stopIndex: y
      }
    );
  }, [
    o,
    z,
    $,
    y,
    g
  ]);
  const S = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const b = [];
    if (l > 0)
      for (let v = z; v <= y; v++) {
        const R = x(v);
        b.push(
          /* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
            u,
            {
              ...I,
              ariaAttributes: {
                "aria-posinset": v + 1,
                "aria-setsize": l,
                role: "listitem"
              },
              key: v,
              index: v,
              style: {
                position: "absolute",
                left: 0,
                transform: `translateY(${R.scrollOffset}px)`,
                // In case of dynamic row heights, don't specify a height style
                // otherwise a default/estimated height would mask the actual height
                height: O ? void 0 : R.size,
                width: "100%"
              }
            }
          )
        );
      }
    return b;
  }, [
    u,
    x,
    O,
    l,
    I,
    z,
    y
  ]), E = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "div",
    {
      "aria-hidden": !0,
      style: {
        height: F(),
        width: "100%",
        zIndex: -1
      }
    }
  );
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(
    a,
    {
      role: "list",
      ...p,
      className: t,
      ref: m,
      style: {
        position: "relative",
        maxHeight: "100%",
        flexGrow: 1,
        overflowY: "auto",
        ...h
      }
    },
    S,
    e,
    E
  );
}
function ke({
  defaultRowHeight: e,
  key: t
}) {
  const [s, r] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    key: t,
    map: /* @__PURE__ */ new Map()
  });
  s.key !== t && r({
    key: t,
    map: /* @__PURE__ */ new Map()
  });
  const { map: n } = s, o = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    let a = 0;
    return n.forEach((h) => {
      a += h;
    }), a === 0 ? e : a / n.size;
  }, [e, n]), i = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (a) => {
      const h = n.get(a);
      return h !== void 0 ? h : (n.set(a, e), e);
    },
    [e, n]
  ), f = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((a, h) => {
    r((p) => {
      if (p.map.get(a) === h)
        return p;
      const I = new Map(p.map);
      return I.set(a, h), {
        ...p,
        map: I
      };
    });
  }, []), l = ae(
    (a) => {
      a.length !== 0 && a.forEach((h) => {
        const { borderBoxSize: p, target: I } = h, u = I.getAttribute(se);
        L(
          u !== null,
          `Invalid ${se} attribute value`
        );
        const w = parseInt(u), { blockSize: m } = p[0];
        m && f(w, m);
      });
    }
  ), [c] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
    if (typeof ResizeObserver < "u")
      return new ResizeObserver(l);
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (c)
      return () => {
        c.disconnect();
      };
  }, [c]);
  const d = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
    (a) => c ? (a.forEach((h) => c.observe(h)), () => {
      a.forEach((h) => c.unobserve(h));
    }) : () => {
    },
    [c]
  );
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
    () => ({
      getAverageRowHeight: o,
      getRowHeight: i,
      setRowHeight: f,
      observeRowElements: d
    }),
    [o, i, f, d]
  );
}
const Le = react__WEBPACK_IMPORTED_MODULE_1__.useState, Me = react__WEBPACK_IMPORTED_MODULE_1__.useRef;
let C = -1;
function $e(e = !1) {
  if (C === -1 || e) {
    const t = document.createElement("div"), s = t.style;
    s.width = "50px", s.height = "50px", s.overflow = "scroll", document.body.appendChild(t), C = t.offsetWidth - t.clientWidth, document.body.removeChild(t);
  }
  return C;
}

//# sourceMappingURL=react-window.js.map


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0FjdGl2aXR5TG9nX3RzeC5qcz9pZD0zOTZkYjdkNjEyMTllMWZjIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLCtCQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEM7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQztBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLE1BQU07QUFDbEI7QUFDTztBQUNQLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FB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c3lzdGVtLy4vbm9kZV9tb2R1bGVzL2FyaWEtaGlkZGVuL2Rpc3QvZXMyMDE1L2luZGV4LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2FjdGl2aXR5L1ZpcnR1YWxBY3Rpdml0eVRpbWVsaW5lLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9iYWRnZS50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdWkvZGlhbG9nLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9tb2RhbC50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdWkvdmlydHVhbC1saXN0LnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvaG9va3MvdXNlVmlydHVhbFNjcm9sbGluZy50cyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvbGliL2FjdGl2aXR5QXBpLnRzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9wYWdlcy9BY3Rpdml0eUxvZy50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2dldC1ub25jZS9kaXN0L2VzMjAxNS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2NpcmNsZS14LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvY2xvY2suanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9kb3dubG9hZC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2Z1bm5lbC5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL2dsb2JlLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvdGFnLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9kaXN0L2VzMjAxNS9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L3V0aWxzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L0NvbWJpbmF0aW9uLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L1NpZGVFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvVUkuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvYWdncmVzaXZlQ2FwdHVyZS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9oYW5kbGVTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvbWVkaXVtLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L3NpZGVjYXIuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9ob29rLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1zdHlsZS1zaW5nbGV0b24vZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9zaW5nbGV0b24uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvYXNzaWduUmVmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2UtY2FsbGJhY2stcmVmL2Rpc3QvZXMyMDE1L3VzZU1lcmdlUmVmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2UtY2FsbGJhY2stcmVmL2Rpc3QvZXMyMDE1L3VzZVJlZi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLXNpZGVjYXIvZGlzdC9lczIwMTUvZXhwb3J0cy5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLXNpZGVjYXIvZGlzdC9lczIwMTUvbWVkaXVtLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcHJpbWl0aXZlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtY29udGV4dC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWRpYWxvZy9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWRpYWxvZy9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXNsb3QvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1kaXNtaXNzYWJsZS1sYXllci9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWZvY3VzLWd1YXJkcy9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWZvY3VzLXNjb3BlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtaWQvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1wb3J0YWwvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1wcmVzZW5jZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZS9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXNsb3QvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1lZmZlY3QtZXZlbnQvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtZXNjYXBlLWtleWRvd24vZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3Qtd2luZG93L2Rpc3QvcmVhY3Qtd2luZG93LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBnZXREZWZhdWx0UGFyZW50ID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBzYW1wbGVUYXJnZXQgPSBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0WzBdIDogb3JpZ2luYWxUYXJnZXQ7XG4gICAgcmV0dXJuIHNhbXBsZVRhcmdldC5vd25lckRvY3VtZW50LmJvZHk7XG59O1xudmFyIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xudmFyIHVuY29udHJvbGxlZE5vZGVzID0gbmV3IFdlYWtNYXAoKTtcbnZhciBtYXJrZXJNYXAgPSB7fTtcbnZhciBsb2NrQ291bnQgPSAwO1xudmFyIHVud3JhcEhvc3QgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBub2RlICYmIChub2RlLmhvc3QgfHwgdW53cmFwSG9zdChub2RlLnBhcmVudE5vZGUpKTtcbn07XG52YXIgY29ycmVjdFRhcmdldHMgPSBmdW5jdGlvbiAocGFyZW50LCB0YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRhcmdldHNcbiAgICAgICAgLm1hcChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmIChwYXJlbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29ycmVjdGVkVGFyZ2V0ID0gdW53cmFwSG9zdCh0YXJnZXQpO1xuICAgICAgICBpZiAoY29ycmVjdGVkVGFyZ2V0ICYmIHBhcmVudC5jb250YWlucyhjb3JyZWN0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29ycmVjdGVkVGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FyaWEtaGlkZGVuJywgdGFyZ2V0LCAnaW4gbm90IGNvbnRhaW5lZCBpbnNpZGUnLCBwYXJlbnQsICcuIERvaW5nIG5vdGhpbmcnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4gQm9vbGVhbih4KTsgfSk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBhcmlhLWhpZGRlblxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NvbnRyb2xBdHRyaWJ1dGVdIC0gaHRtbCBBdHRyaWJ1dGUgdG8gY29udHJvbFxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbnZhciBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lLCBjb250cm9sQXR0cmlidXRlKSB7XG4gICAgdmFyIHRhcmdldHMgPSBjb3JyZWN0VGFyZ2V0cyhwYXJlbnROb2RlLCBBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgaWYgKCFtYXJrZXJNYXBbbWFya2VyTmFtZV0pIHtcbiAgICAgICAgbWFya2VyTWFwW21hcmtlck5hbWVdID0gbmV3IFdlYWtNYXAoKTtcbiAgICB9XG4gICAgdmFyIG1hcmtlckNvdW50ZXIgPSBtYXJrZXJNYXBbbWFya2VyTmFtZV07XG4gICAgdmFyIGhpZGRlbk5vZGVzID0gW107XG4gICAgdmFyIGVsZW1lbnRzVG9LZWVwID0gbmV3IFNldCgpO1xuICAgIHZhciBlbGVtZW50c1RvU3RvcCA9IG5ldyBTZXQodGFyZ2V0cyk7XG4gICAgdmFyIGtlZXAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKCFlbCB8fCBlbGVtZW50c1RvS2VlcC5oYXMoZWwpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudHNUb0tlZXAuYWRkKGVsKTtcbiAgICAgICAga2VlcChlbC5wYXJlbnROb2RlKTtcbiAgICB9O1xuICAgIHRhcmdldHMuZm9yRWFjaChrZWVwKTtcbiAgICB2YXIgZGVlcCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKCFwYXJlbnQgfHwgZWxlbWVudHNUb1N0b3AuaGFzKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHBhcmVudC5jaGlsZHJlbiwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50c1RvS2VlcC5oYXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBkZWVwKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBub2RlLmdldEF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFscmVhZHlIaWRkZW4gPSBhdHRyICE9PSBudWxsICYmIGF0dHIgIT09ICdmYWxzZSc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3VudGVyVmFsdWUgPSAoY291bnRlck1hcC5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFya2VyVmFsdWUgPSAobWFya2VyQ291bnRlci5nZXQobm9kZSkgfHwgMCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyTWFwLnNldChub2RlLCBjb3VudGVyVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbk5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyVmFsdWUgPT09IDEgJiYgYWxyZWFkeUhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMuc2V0KG5vZGUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXJWYWx1ZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobWFya2VyTmFtZSwgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignYXJpYS1oaWRkZW46IGNhbm5vdCBvcGVyYXRlIG9uICcsIG5vZGUsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBkZWVwKHBhcmVudE5vZGUpO1xuICAgIGVsZW1lbnRzVG9LZWVwLmNsZWFyKCk7XG4gICAgbG9ja0NvdW50Kys7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGlkZGVuTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIGNvdW50ZXJWYWx1ZSA9IGNvdW50ZXJNYXAuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIHZhciBtYXJrZXJWYWx1ZSA9IG1hcmtlckNvdW50ZXIuZ2V0KG5vZGUpIC0gMTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAuc2V0KG5vZGUsIGNvdW50ZXJWYWx1ZSk7XG4gICAgICAgICAgICBtYXJrZXJDb3VudGVyLnNldChub2RlLCBtYXJrZXJWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWNvdW50ZXJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdW5jb250cm9sbGVkTm9kZXMuaGFzKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGNvbnRyb2xBdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1bmNvbnRyb2xsZWROb2Rlcy5kZWxldGUobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW1hcmtlclZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobWFya2VyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NrQ291bnQtLTtcbiAgICAgICAgaWYgKCFsb2NrQ291bnQpIHtcbiAgICAgICAgICAgIC8vIGNsZWFyXG4gICAgICAgICAgICBjb3VudGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIGNvdW50ZXJNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgICAgbWFya2VyTWFwID0ge307XG4gICAgICAgIH1cbiAgICB9O1xufTtcbi8qKlxuICogTWFya3MgZXZlcnl0aGluZyBleGNlcHQgZ2l2ZW4gbm9kZShvciBub2RlcykgYXMgYXJpYS1oaWRkZW5cbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgaGlkZU90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWFyaWEtaGlkZGVuJzsgfVxuICAgIHZhciB0YXJnZXRzID0gQXJyYXkuZnJvbShBcnJheS5pc0FycmF5KG9yaWdpbmFsVGFyZ2V0KSA/IG9yaWdpbmFsVGFyZ2V0IDogW29yaWdpbmFsVGFyZ2V0XSk7XG4gICAgdmFyIGFjdGl2ZVBhcmVudE5vZGUgPSBwYXJlbnROb2RlIHx8IGdldERlZmF1bHRQYXJlbnQob3JpZ2luYWxUYXJnZXQpO1xuICAgIGlmICghYWN0aXZlUGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfTtcbiAgICB9XG4gICAgLy8gd2Ugc2hvdWxkIG5vdCBoaWRlIGFyaWEtbGl2ZSBlbGVtZW50cyAtIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvYXJpYS1oaWRkZW4vaXNzdWVzLzEwXG4gICAgLy8gYW5kIHNjcmlwdCBlbGVtZW50cywgYXMgdGhleSBoYXZlIG5vIGltcGFjdCBvbiBhY2Nlc3NpYmlsaXR5LlxuICAgIHRhcmdldHMucHVzaC5hcHBseSh0YXJnZXRzLCBBcnJheS5mcm9tKGFjdGl2ZVBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtbGl2ZV0sIHNjcmlwdCcpKSk7XG4gICAgcmV0dXJuIGFwcGx5QXR0cmlidXRlVG9PdGhlcnModGFyZ2V0cywgYWN0aXZlUGFyZW50Tm9kZSwgbWFya2VyTmFtZSwgJ2FyaWEtaGlkZGVuJyk7XG59O1xuLyoqXG4gKiBNYXJrcyBldmVyeXRoaW5nIGV4Y2VwdCBnaXZlbiBub2RlKG9yIG5vZGVzKSBhcyBpbmVydFxuICogQHBhcmFtIHtFbGVtZW50IHwgRWxlbWVudFtdfSBvcmlnaW5hbFRhcmdldCAtIGVsZW1lbnRzIHRvIGtlZXAgb24gdGhlIHBhZ2VcbiAqIEBwYXJhbSBbcGFyZW50Tm9kZV0gLSB0b3AgZWxlbWVudCwgZGVmYXVsdHMgdG8gZG9jdW1lbnQuYm9keVxuICogQHBhcmFtIHtTdHJpbmd9IFttYXJrZXJOYW1lXSAtIGEgc3BlY2lhbCBhdHRyaWJ1dGUgdG8gbWFyayBldmVyeSBub2RlXG4gKiBAcmV0dXJuIHtVbmRvfSB1bmRvIGNvbW1hbmRcbiAqL1xuZXhwb3J0IHZhciBpbmVydE90aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSkge1xuICAgIGlmIChtYXJrZXJOYW1lID09PSB2b2lkIDApIHsgbWFya2VyTmFtZSA9ICdkYXRhLWluZXJ0LWVkJzsgfVxuICAgIHZhciBhY3RpdmVQYXJlbnROb2RlID0gcGFyZW50Tm9kZSB8fCBnZXREZWZhdWx0UGFyZW50KG9yaWdpbmFsVGFyZ2V0KTtcbiAgICBpZiAoIWFjdGl2ZVBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH07XG4gICAgfVxuICAgIHJldHVybiBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzKG9yaWdpbmFsVGFyZ2V0LCBhY3RpdmVQYXJlbnROb2RlLCBtYXJrZXJOYW1lLCAnaW5lcnQnKTtcbn07XG4vKipcbiAqIEByZXR1cm5zIGlmIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBpbmVydFxuICovXG5leHBvcnQgdmFyIHN1cHBvcnRzSW5lcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgSFRNTEVsZW1lbnQucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdpbmVydCcpO1xufTtcbi8qKlxuICogQXV0b21hdGljIGZ1bmN0aW9uIHRvIFwic3VwcHJlc3NcIiBET00gZWxlbWVudHMgLSBfaGlkZV8gb3IgX2luZXJ0XyBpbiB0aGUgYmVzdCBwb3NzaWJsZSB3YXlcbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgc3VwcHJlc3NPdGhlcnMgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpIHtcbiAgICBpZiAobWFya2VyTmFtZSA9PT0gdm9pZCAwKSB7IG1hcmtlck5hbWUgPSAnZGF0YS1zdXBwcmVzc2VkJzsgfVxuICAgIHJldHVybiAoc3VwcG9ydHNJbmVydCgpID8gaW5lcnRPdGhlcnMgOiBoaWRlT3RoZXJzKShvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSk7XG59O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBVc2VyLCBUYWcsIEdsb2JlLCBDbG9jaywgQWxlcnRDaXJjbGUsIEFsZXJ0VHJpYW5nbGUsIEluZm8sIFhDaXJjbGUsIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IEJhZGdlIH0gZnJvbSAnLi4vdWkvYmFkZ2UnO1xuaW1wb3J0IFZpcnR1YWxMaXN0IGZyb20gJy4uL3VpL3ZpcnR1YWwtbGlzdCc7XG4vKipcbiAqIFZpcnR1YWxBY3Rpdml0eVRpbWVsaW5lIENvbXBvbmVudFxuICpcbiAqIERpc3BsYXlzIGFjdGl2aXR5IGxvZyBpbiBhIHZpcnR1YWwgc2Nyb2xsaW5nIHRpbWVsaW5lIGZvciBvcHRpbWFsXG4gKiBwZXJmb3JtYW5jZSB3aXRoIGxhcmdlIGRhdGFzZXRzICg+MTAwIGl0ZW1zKS5cbiAqXG4gKiBGZWF0dXJlczpcbiAqIC0gVmlydHVhbCBzY3JvbGxpbmcgZm9yIGxhcmdlIGFjdGl2aXR5IGxvZ3NcbiAqIC0gQ29sb3ItY29kZWQgc2V2ZXJpdHkgaW5kaWNhdG9yc1xuICogLSBSZWxhdGl2ZSB0aW1lIGZvcm1hdHRpbmdcbiAqIC0gQ2xpY2sgdG8gdmlldyBkZXRhaWxzXG4gKiAtIE1haW50YWlucyBzY3JvbGwgcG9zaXRpb25cbiAqL1xuY29uc3QgVmlydHVhbEFjdGl2aXR5VGltZWxpbmUgPSBSZWFjdC5tZW1vKCh7IGFjdGl2aXRpZXMsIG9uQWN0aXZpdHlDbGljaywgaGVpZ2h0ID0gNjAwLCB9KSA9PiB7XG4gICAgY29uc3QgW3Njcm9sbE9mZnNldCwgc2V0U2Nyb2xsT2Zmc2V0XSA9IHVzZVN0YXRlKDApO1xuICAgIC8qKlxuICAgICAqIEdldCBzZXZlcml0eSBjb2xvciBjbGFzc1xuICAgICAqL1xuICAgIGNvbnN0IGdldFNldmVyaXR5Q29sb3IgPSB1c2VDYWxsYmFjaygoc2V2ZXJpdHkpID0+IHtcbiAgICAgICAgc3dpdGNoIChzZXZlcml0eSkge1xuICAgICAgICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdiZy1wcmltYXJ5LTUwMCc7XG4gICAgICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2JnLXdhcm5pbmctNTAwJztcbiAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2JnLWVycm9yLTUwMCc7XG4gICAgICAgICAgICBjYXNlICdjcml0aWNhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdiZy1lcnJvci03MDAnO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2JnLW5ldXRyYWwtNTAwJztcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2V2ZXJpdHkgaWNvblxuICAgICAqL1xuICAgIGNvbnN0IGdldFNldmVyaXR5SWNvbiA9IHVzZUNhbGxiYWNrKChzZXZlcml0eSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHNldmVyaXR5KSB7XG4gICAgICAgICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2pzeChJbmZvLCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSk7XG4gICAgICAgICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2pzeChBbGVydFRyaWFuZ2xlLCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSk7XG4gICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9qc3goQWxlcnRDaXJjbGUsIHsgY2xhc3NOYW1lOiBcInctNCBoLTRcIiB9KTtcbiAgICAgICAgICAgIGNhc2UgJ2NyaXRpY2FsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2pzeChYQ2lyY2xlLCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBfanN4KEluZm8sIHsgY2xhc3NOYW1lOiBcInctNCBoLTRcIiB9KTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICAvKipcbiAgICAgKiBGb3JtYXQgcmVsYXRpdmUgdGltZVxuICAgICAqL1xuICAgIGNvbnN0IGZvcm1hdFJlbGF0aXZlVGltZSA9IHVzZUNhbGxiYWNrKChkYXRlU3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgZGlmZkluU2Vjb25kcyA9IE1hdGguZmxvb3IoKG5vdy5nZXRUaW1lKCkgLSBkYXRlLmdldFRpbWUoKSkgLyAxMDAwKTtcbiAgICAgICAgaWYgKGRpZmZJblNlY29uZHMgPCA2MClcbiAgICAgICAgICAgIHJldHVybiAnSnVzdCBub3cnO1xuICAgICAgICBpZiAoZGlmZkluU2Vjb25kcyA8IDM2MDApXG4gICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihkaWZmSW5TZWNvbmRzIC8gNjApfSBtaW51dGVzIGFnb2A7XG4gICAgICAgIGlmIChkaWZmSW5TZWNvbmRzIDwgODY0MDApXG4gICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihkaWZmSW5TZWNvbmRzIC8gMzYwMCl9IGhvdXJzIGFnb2A7XG4gICAgICAgIGlmIChkaWZmSW5TZWNvbmRzIDwgNjA0ODAwKVxuICAgICAgICAgICAgcmV0dXJuIGAke01hdGguZmxvb3IoZGlmZkluU2Vjb25kcyAvIDg2NDAwKX0gZGF5cyBhZ29gO1xuICAgICAgICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICB9LCBbXSk7XG4gICAgLyoqXG4gICAgICogUmVuZGVyIGEgc2luZ2xlIGFjdGl2aXR5IGl0ZW1cbiAgICAgKi9cbiAgICBjb25zdCByZW5kZXJBY3Rpdml0eUl0ZW0gPSB1c2VDYWxsYmFjaygoYWN0aXZpdHksIGluZGV4LCBzdHlsZSkgPT4ge1xuICAgICAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA9PT0gYWN0aXZpdGllcy5sZW5ndGggLSAxO1xuICAgICAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBzdHlsZTogc3R5bGUsIGNoaWxkcmVuOiBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLXdoaXRlIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCBwLTYgaG92ZXI6c2hhZG93LW1kIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBjdXJzb3ItcG9pbnRlciBteC00IG15LTJcIiwgb25DbGljazogKCkgPT4gb25BY3Rpdml0eUNsaWNrKGFjdGl2aXR5KSwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtc3RhcnQgZ2FwLTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IGB3LTMgaC0zIHJvdW5kZWQtZnVsbCAke2dldFNldmVyaXR5Q29sb3IoYWN0aXZpdHkuc2V2ZXJpdHkgfHwgJ2luZm8nKX0gbXQtMWAgfSksICFpc0xhc3QgJiYgKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidy0wLjUgaC1mdWxsIGJnLW5ldXRyYWwtMjAwIG10LTJcIiB9KSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtc2hyaW5rLTBcIiwgY2hpbGRyZW46IF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidy0xMCBoLTEwIHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5LTEwMCBib3JkZXItMiBib3JkZXItcHJpbWFyeS0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgY2hpbGRyZW46IF9qc3goVXNlciwgeyBjbGFzc05hbWU6IFwidy01IGgtNSB0ZXh0LXByaW1hcnktNjAwXCIgfSkgfSkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgtMSBtaW4tdy0wXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTFcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IGFjdGl2aXR5LnVzZXJfbmFtZSB9KSwgX2pzeChCYWRnZSwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgc2l6ZTogXCJzbVwiLCBjaGlsZHJlbjogYWN0aXZpdHkuYWN0aW9uIH0pXSB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNTAwXCIsIGNoaWxkcmVuOiBmb3JtYXRSZWxhdGl2ZVRpbWUoYWN0aXZpdHkuY3JlYXRlZF9hdCkgfSldIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDAgbWItM1wiLCBjaGlsZHJlbjogYWN0aXZpdHkuZGVzY3JpcHRpb24gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC00IHRleHQteHMgdGV4dC1uZXV0cmFsLTUwMFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCIsIGNoaWxkcmVuOiBbX2pzeChUYWcsIHsgY2xhc3NOYW1lOiBcInctMy41IGgtMy41XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2hpbGRyZW46IGFjdGl2aXR5Lm1vZHVsZSB8fCAnU3lzdGVtJyB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCIsIGNoaWxkcmVuOiBbZ2V0U2V2ZXJpdHlJY29uKGFjdGl2aXR5LnNldmVyaXR5IHx8ICdpbmZvJyksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImNhcGl0YWxpemVcIiwgY2hpbGRyZW46IGFjdGl2aXR5LnNldmVyaXR5IHx8ICdpbmZvJyB9KV0gfSksIGFjdGl2aXR5LmlwX2FkZHJlc3MgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCIsIGNoaWxkcmVuOiBbX2pzeChHbG9iZSwgeyBjbGFzc05hbWU6IFwidy0zLjUgaC0zLjVcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogYWN0aXZpdHkuaXBfYWRkcmVzcyB9KV0gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiLCBjaGlsZHJlbjogW19qc3goQ2xvY2ssIHsgY2xhc3NOYW1lOiBcInctMy41IGgtMy41XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2hpbGRyZW46IG5ldyBEYXRlKGFjdGl2aXR5LmNyZWF0ZWRfYXQpLnRvTG9jYWxlVGltZVN0cmluZygpIH0pXSB9KV0gfSldIH0pXSB9KSB9KSB9KSk7XG4gICAgfSwgW2FjdGl2aXRpZXMubGVuZ3RoLCBvbkFjdGl2aXR5Q2xpY2ssIGdldFNldmVyaXR5Q29sb3IsIGdldFNldmVyaXR5SWNvbiwgZm9ybWF0UmVsYXRpdmVUaW1lXSk7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHNjcm9sbCB0byBzYXZlIHBvc2l0aW9uXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlU2Nyb2xsID0gdXNlQ2FsbGJhY2soKG9mZnNldCkgPT4ge1xuICAgICAgICBzZXRTY3JvbGxPZmZzZXQob2Zmc2V0KTtcbiAgICB9LCBbXSk7XG4gICAgaWYgKGFjdGl2aXRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCBwLTEyIHRleHQtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1uZXV0cmFsLTYwMCB0ZXh0LWxnXCIsIGNoaWxkcmVuOiBcIk5vIGFjdGl2aXRpZXMgZm91bmRcIiB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1uZXV0cmFsLTUwMCB0ZXh0LXNtIG10LTJcIiwgY2hpbGRyZW46IFwiVHJ5IGFkanVzdGluZyB5b3VyIGZpbHRlcnMgb3IgY2hlY2sgYmFjayBsYXRlclwiIH0pXSB9KSk7XG4gICAgfVxuICAgIHJldHVybiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZ3JheS0yMDAgb3ZlcmZsb3ctaGlkZGVuIGJnLXdoaXRlXCIsIGNoaWxkcmVuOiBfanN4KFZpcnR1YWxMaXN0LCB7IGl0ZW1zOiBhY3Rpdml0aWVzLCBpdGVtSGVpZ2h0OiAxNDAsIGhlaWdodDogaGVpZ2h0LCByZW5kZXJJdGVtOiByZW5kZXJBY3Rpdml0eUl0ZW0sIG9uU2Nyb2xsOiBoYW5kbGVTY3JvbGwsIGluaXRpYWxTY3JvbGxPZmZzZXQ6IHNjcm9sbE9mZnNldCwgb3ZlcnNjYW5Db3VudDogMyB9KSB9KSk7XG59KTtcblZpcnR1YWxBY3Rpdml0eVRpbWVsaW5lLmRpc3BsYXlOYW1lID0gJ1ZpcnR1YWxBY3Rpdml0eVRpbWVsaW5lJztcbmV4cG9ydCBkZWZhdWx0IFZpcnR1YWxBY3Rpdml0eVRpbWVsaW5lO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3ZhIH0gZnJvbSBcImNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eVwiO1xuaW1wb3J0IHsgY24gfSBmcm9tIFwiLi4vLi4vbGliL3V0aWxzXCI7XG5jb25zdCBiYWRnZVZhcmlhbnRzID0gY3ZhKFwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1vZmZzZXQtMlwiLCB7XG4gICAgdmFyaWFudHM6IHtcbiAgICAgICAgdmFyaWFudDoge1xuICAgICAgICAgICAgcHJpbWFyeTogXCJiZy1wcmltYXJ5LTEwMCB0ZXh0LXByaW1hcnktNzAwIGJvcmRlci1wcmltYXJ5LTIwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBcImJnLXN1Y2Nlc3MtbGlnaHQgdGV4dC1zdWNjZXNzLWRhcmsgYm9yZGVyLXN1Y2Nlc3MtREVGQVVMVCBmb2N1czpyaW5nLXN1Y2Nlc3MtREVGQVVMVFwiLFxuICAgICAgICAgICAgd2FybmluZzogXCJiZy13YXJuaW5nLWxpZ2h0IHRleHQtd2FybmluZy1kYXJrIGJvcmRlci13YXJuaW5nLURFRkFVTFQgZm9jdXM6cmluZy13YXJuaW5nLURFRkFVTFRcIixcbiAgICAgICAgICAgIGVycm9yOiBcImJnLWVycm9yLWxpZ2h0IHRleHQtZXJyb3ItZGFyayBib3JkZXItZXJyb3ItREVGQVVMVCBmb2N1czpyaW5nLWVycm9yLURFRkFVTFRcIixcbiAgICAgICAgICAgIGRhbmdlcjogXCJiZy1lcnJvci1saWdodCB0ZXh0LWVycm9yLWRhcmsgYm9yZGVyLWVycm9yLURFRkFVTFQgZm9jdXM6cmluZy1lcnJvci1ERUZBVUxUXCIsXG4gICAgICAgICAgICBuZXV0cmFsOiBcImJnLW5ldXRyYWwtMTAwIHRleHQtbmV1dHJhbC03MDAgYm9yZGVyLW5ldXRyYWwtMzAwIGZvY3VzOnJpbmctbmV1dHJhbC01MDBcIixcbiAgICAgICAgICAgIG91dGxpbmU6IFwiYmctdHJhbnNwYXJlbnQgdGV4dC1uZXV0cmFsLTcwMCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMzAwIGZvY3VzOnJpbmctbmV1dHJhbC01MDBcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgICAgc206IFwiaC01IHB4LTIgdGV4dC14cyBnYXAtMVwiLFxuICAgICAgICAgICAgbWQ6IFwiaC02IHB4LTIuNSB0ZXh0LXNtIGdhcC0xLjVcIixcbiAgICAgICAgICAgIGxnOiBcImgtNyBweC0zIHRleHQtYmFzZSBnYXAtMlwiLFxuICAgICAgICB9LFxuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgcm91bmRlZDogXCJyb3VuZGVkLW1kXCIsXG4gICAgICAgICAgICBwaWxsOiBcInJvdW5kZWQtZnVsbFwiLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgZGVmYXVsdFZhcmlhbnRzOiB7XG4gICAgICAgIHZhcmlhbnQ6IFwibmV1dHJhbFwiLFxuICAgICAgICBzaXplOiBcIm1kXCIsXG4gICAgICAgIHNoYXBlOiBcInJvdW5kZWRcIixcbiAgICB9LFxufSk7XG5jb25zdCBCYWRnZSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCB2YXJpYW50LCBzaXplLCBzaGFwZSwgaWNvbiwgY2hpbGRyZW4sIC4uLnByb3BzIH0sIHJlZikgPT4ge1xuICAgIHJldHVybiAoX2pzeHMoXCJzcGFuXCIsIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oYmFkZ2VWYXJpYW50cyh7IHZhcmlhbnQsIHNpemUsIHNoYXBlIH0pLCBjbGFzc05hbWUpLCAuLi5wcm9wcywgY2hpbGRyZW46IFtpY29uICYmIChfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXJcIiwgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIiwgY2hpbGRyZW46IGljb24gfSkpLCBjaGlsZHJlbl0gfSkpO1xufSk7XG5CYWRnZS5kaXNwbGF5TmFtZSA9IFwiQmFkZ2VcIjtcbmV4cG9ydCB7IEJhZGdlLCBiYWRnZVZhcmlhbnRzIH07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBEaWFsb2dQcmltaXRpdmUgZnJvbSBcIkByYWRpeC11aS9yZWFjdC1kaWFsb2dcIjtcbmltcG9ydCB7IFggfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCIuLi8uLi9saWIvdXRpbHNcIjtcbmNvbnN0IERpYWxvZyA9IERpYWxvZ1ByaW1pdGl2ZS5Sb290O1xuY29uc3QgRGlhbG9nVHJpZ2dlciA9IERpYWxvZ1ByaW1pdGl2ZS5UcmlnZ2VyO1xuY29uc3QgRGlhbG9nUG9ydGFsID0gRGlhbG9nUHJpbWl0aXZlLlBvcnRhbDtcbmNvbnN0IERpYWxvZ0Nsb3NlID0gRGlhbG9nUHJpbWl0aXZlLkNsb3NlO1xuY29uc3QgRGlhbG9nT3ZlcmxheSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5PdmVybGF5LCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLWJhY2tncm91bmQvODAgYmFja2Ryb3AtYmx1ci1zbSBkYXRhLVtzdGF0ZT1vcGVuXTphbmltYXRlLWluIGRhdGEtW3N0YXRlPWNsb3NlZF06YW5pbWF0ZS1vdXQgZGF0YS1bc3RhdGU9Y2xvc2VkXTpmYWRlLW91dC0wIGRhdGEtW3N0YXRlPW9wZW5dOmZhZGUtaW4tMFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nT3ZlcmxheS5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5PdmVybGF5LmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nQ29udGVudCA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCBjaGlsZHJlbiwgc2hvd0Nsb3NlQnV0dG9uID0gdHJ1ZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeHMoRGlhbG9nUG9ydGFsLCB7IGNoaWxkcmVuOiBbX2pzeChEaWFsb2dPdmVybGF5LCB7fSksIF9qc3hzKERpYWxvZ1ByaW1pdGl2ZS5Db250ZW50LCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiZml4ZWQgbGVmdC1bNTAlXSB0b3AtWzUwJV0gei01MCBncmlkIHctZnVsbCBtYXgtdy1sZyB0cmFuc2xhdGUteC1bLTUwJV0gdHJhbnNsYXRlLXktWy01MCVdIGdhcC00IGJvcmRlciBiZy1iYWNrZ3JvdW5kIHNoYWRvdy1sZyBkdXJhdGlvbi0yMDAgZGF0YS1bc3RhdGU9b3Blbl06YW5pbWF0ZS1pbiBkYXRhLVtzdGF0ZT1jbG9zZWRdOmFuaW1hdGUtb3V0IGRhdGEtW3N0YXRlPWNsb3NlZF06ZmFkZS1vdXQtMCBkYXRhLVtzdGF0ZT1vcGVuXTpmYWRlLWluLTAgZGF0YS1bc3RhdGU9Y2xvc2VkXTp6b29tLW91dC05NSBkYXRhLVtzdGF0ZT1vcGVuXTp6b29tLWluLTk1IGRhdGEtW3N0YXRlPWNsb3NlZF06c2xpZGUtb3V0LXRvLWxlZnQtMS8yIGRhdGEtW3N0YXRlPWNsb3NlZF06c2xpZGUtb3V0LXRvLXRvcC1bNDglXSBkYXRhLVtzdGF0ZT1vcGVuXTpzbGlkZS1pbi1mcm9tLWxlZnQtMS8yIGRhdGEtW3N0YXRlPW9wZW5dOnNsaWRlLWluLWZyb20tdG9wLVs0OCVdIHNtOnJvdW5kZWQtbGdcIiwgXG4gICAgICAgICAgICAvLyBNb2JpbGUgb3B0aW1pemF0aW9uczogZnVsbCBzY3JlZW4gb24gbW9iaWxlIHdpdGggcHJvcGVyIHBhZGRpbmcgYW5kIHNjcm9sbGluZ1xuICAgICAgICAgICAgXCJtYXgtaC1bMTAwZHZoXSBzbTptYXgtaC1bOTB2aF0gb3ZlcmZsb3cteS1hdXRvXCIsIFwibS0wIHNtOm0tNCBwLTQgc206cC02XCIsIFwicm91bmRlZC1ub25lIHNtOnJvdW5kZWQtbGdcIiwgXCJ3LVsxMDB2d10gc206dy1mdWxsXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzLCBjaGlsZHJlbjogW2NoaWxkcmVuLCBzaG93Q2xvc2VCdXR0b24gJiYgKF9qc3hzKERpYWxvZ1ByaW1pdGl2ZS5DbG9zZSwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgcmlnaHQtNCB0b3AtNCByb3VuZGVkLXNtIG9wYWNpdHktNzAgcmluZy1vZmZzZXQtYmFja2dyb3VuZCB0cmFuc2l0aW9uLW9wYWNpdHkgaG92ZXI6b3BhY2l0eS0xMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXJpbmcgZm9jdXM6cmluZy1vZmZzZXQtMiBkaXNhYmxlZDpwb2ludGVyLWV2ZW50cy1ub25lIGRhdGEtW3N0YXRlPW9wZW5dOmJnLWFjY2VudCBkYXRhLVtzdGF0ZT1vcGVuXTp0ZXh0LW11dGVkLWZvcmVncm91bmRcIiwgY2hpbGRyZW46IFtfanN4KFgsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwic3Itb25seVwiLCBjaGlsZHJlbjogXCJDbG9zZVwiIH0pXSB9KSldIH0pXSB9KSkpO1xuRGlhbG9nQ29udGVudC5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5Db250ZW50LmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nSGVhZGVyID0gKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oXCJmbGV4IGZsZXgtY29sIHNwYWNlLXktMS41IHRleHQtY2VudGVyIHNtOnRleHQtbGVmdFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSk7XG5EaWFsb2dIZWFkZXIuZGlzcGxheU5hbWUgPSBcIkRpYWxvZ0hlYWRlclwiO1xuY29uc3QgRGlhbG9nRm9vdGVyID0gKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oXCJmbGV4IGZsZXgtY29sLXJldmVyc2UgZ2FwLTIgc206ZmxleC1yb3cgc206anVzdGlmeS1lbmQgc206c3BhY2UteC0yIHNtOmdhcC0wXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKTtcbkRpYWxvZ0Zvb3Rlci5kaXNwbGF5TmFtZSA9IFwiRGlhbG9nRm9vdGVyXCI7XG5jb25zdCBEaWFsb2dUaXRsZSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5UaXRsZSwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcInRleHQtbGcgZm9udC1zZW1pYm9sZCBsZWFkaW5nLW5vbmUgdHJhY2tpbmctdGlnaHRcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpKTtcbkRpYWxvZ1RpdGxlLmRpc3BsYXlOYW1lID0gRGlhbG9nUHJpbWl0aXZlLlRpdGxlLmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nRGVzY3JpcHRpb24gPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeChEaWFsb2dQcmltaXRpdmUuRGVzY3JpcHRpb24sIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJ0ZXh0LXNtIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nRGVzY3JpcHRpb24uZGlzcGxheU5hbWUgPSBEaWFsb2dQcmltaXRpdmUuRGVzY3JpcHRpb24uZGlzcGxheU5hbWU7XG5leHBvcnQgeyBEaWFsb2csIERpYWxvZ1BvcnRhbCwgRGlhbG9nT3ZlcmxheSwgRGlhbG9nQ2xvc2UsIERpYWxvZ1RyaWdnZXIsIERpYWxvZ0NvbnRlbnQsIERpYWxvZ0hlYWRlciwgRGlhbG9nRm9vdGVyLCBEaWFsb2dUaXRsZSwgRGlhbG9nRGVzY3JpcHRpb24sIH07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuLy8gQHRzLW5vY2hlY2tcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY24gfSBmcm9tIFwiLi4vLi4vbGliL3V0aWxzXCI7XG5pbXBvcnQgeyBEaWFsb2csIERpYWxvZ0NvbnRlbnQsIERpYWxvZ0Rlc2NyaXB0aW9uLCBEaWFsb2dGb290ZXIsIERpYWxvZ0hlYWRlciwgRGlhbG9nVGl0bGUsIH0gZnJvbSBcIi4vZGlhbG9nXCI7XG5jb25zdCBzaXplQ2xhc3NlcyA9IHtcbiAgICBzbTogJ3NtOm1heC13LW1kJyxcbiAgICBtZDogJ3NtOm1heC13LWxnJyxcbiAgICBsZzogJ3NtOm1heC13LTJ4bCcsXG4gICAgeGw6ICdzbTptYXgtdy00eGwnLFxuICAgIGZ1bGw6ICdzbTptYXgtdy03eGwnLFxufTtcbi8qKlxuICogTW9kYWwgY29tcG9uZW50IC0gQSB3cmFwcGVyIGFyb3VuZCBEaWFsb2cgZm9yIGVhc2llciB1c2FnZVxuICogUHJvdmlkZXMgY29uc2lzdGVudCBzdHlsaW5nIHdpdGggcm91bmRlZCBjb3JuZXJzIGFuZCBzcGFjaW5nXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIE11bHRpcGxlIHNpemVzIChzbSwgbWQsIGxnLCB4bCwgZnVsbClcbiAqIC0gT3B0aW9uYWwgb3ZlcmxheSBjbGljayB0byBjbG9zZVxuICogLSBPcHRpb25hbCBjbG9zZSBidXR0b25cbiAqIC0gRm9jdXMgdHJhcCAoaGFuZGxlZCBieSBSYWRpeCBVSSlcbiAqIC0gRXNjYXBlIGtleSB0byBjbG9zZSAoaGFuZGxlZCBieSBSYWRpeCBVSSlcbiAqIC0gQm9keSBzY3JvbGwgcHJldmVudGlvbiAoaGFuZGxlZCBieSBSYWRpeCBVSSlcbiAqIC0gU21vb3RoIGFuaW1hdGlvbnNcbiAqL1xuY29uc3QgTW9kYWwgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGlzT3Blbiwgb25DbG9zZSwgdGl0bGUsIGRlc2NyaXB0aW9uLCBjaGlsZHJlbiwgZm9vdGVyLCBzaXplID0gJ21kJywgY2xvc2VPbk92ZXJsYXlDbGljayA9IHRydWUsIHNob3dDbG9zZUJ1dHRvbiA9IHRydWUsIGNsYXNzTmFtZSB9LCByZWYpID0+IHtcbiAgICBjb25zdCBoYW5kbGVPcGVuQ2hhbmdlID0gKG9wZW4pID0+IHtcbiAgICAgICAgaWYgKCFvcGVuKSB7XG4gICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZU92ZXJsYXlDbGljayA9IChlKSA9PiB7XG4gICAgICAgIGlmICghY2xvc2VPbk92ZXJsYXlDbGljaykge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKF9qc3goRGlhbG9nLCB7IG9wZW46IGlzT3Blbiwgb25PcGVuQ2hhbmdlOiBoYW5kbGVPcGVuQ2hhbmdlLCBjaGlsZHJlbjogX2pzeHMoRGlhbG9nQ29udGVudCwgeyBjbGFzc05hbWU6IGNuKHNpemVDbGFzc2VzW3NpemVdLCBjbGFzc05hbWUpLCByZWY6IHJlZiwgb25Qb2ludGVyRG93bk91dHNpZGU6IGhhbmRsZU92ZXJsYXlDbGljaywgb25JbnRlcmFjdE91dHNpZGU6IGhhbmRsZU92ZXJsYXlDbGljaywgc2hvd0Nsb3NlQnV0dG9uOiBzaG93Q2xvc2VCdXR0b24sIGNoaWxkcmVuOiBbKHRpdGxlIHx8IGRlc2NyaXB0aW9uKSAmJiAoX2pzeHMoRGlhbG9nSGVhZGVyLCB7IGNoaWxkcmVuOiBbdGl0bGUgJiYgX2pzeChEaWFsb2dUaXRsZSwgeyBjaGlsZHJlbjogdGl0bGUgfSksIGRlc2NyaXB0aW9uICYmIF9qc3goRGlhbG9nRGVzY3JpcHRpb24sIHsgY2hpbGRyZW46IGRlc2NyaXB0aW9uIH0pXSB9KSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicHktNFwiLCBjaGlsZHJlbjogY2hpbGRyZW4gfSksIGZvb3RlciAmJiBfanN4KERpYWxvZ0Zvb3RlciwgeyBjaGlsZHJlbjogZm9vdGVyIH0pXSB9KSB9KSk7XG59KTtcbk1vZGFsLmRpc3BsYXlOYW1lID0gXCJNb2RhbFwiO1xuZXhwb3J0IHsgTW9kYWwgfTtcbiIsImltcG9ydCB7IEZyYWdtZW50IGFzIF9GcmFnbWVudCwganN4IGFzIF9qc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbi8vIEB0cy1ub2NoZWNrXG5pbXBvcnQgeyB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEZpeGVkU2l6ZUxpc3QgfSBmcm9tICdyZWFjdC13aW5kb3cnO1xuLyoqXG4gKiBWaXJ0dWFsTGlzdCBDb21wb25lbnRcbiAqXG4gKiBBIHJldXNhYmxlIHZpcnR1YWwgc2Nyb2xsaW5nIGxpc3QgY29tcG9uZW50IHRoYXQgcmVuZGVycyBvbmx5IHZpc2libGUgaXRlbXNcbiAqIGZvciBvcHRpbWFsIHBlcmZvcm1hbmNlIHdpdGggbGFyZ2UgZGF0YXNldHMgKD4xMDAgaXRlbXMpLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBSZW5kZXJzIG9ubHkgdmlzaWJsZSBpdGVtcyBpbiB2aWV3cG9ydFxuICogLSBSZWR1Y2VzIERPTSBub2RlcyBhbmQgbWVtb3J5IHVzYWdlXG4gKiAtIE1haW50YWlucyBzY3JvbGwgcG9zaXRpb25cbiAqIC0gQ29uZmlndXJhYmxlIGl0ZW0gaGVpZ2h0IGFuZCBsaXN0IGRpbWVuc2lvbnNcbiAqIC0gU3VwcG9ydHMgY3VzdG9tIGl0ZW0gcmVuZGVyaW5nXG4gKlxuICogQmFzZWQgb24gcmVhY3Qtd2luZG93J3MgRml4ZWRTaXplTGlzdCBmb3IgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c3hcbiAqIDxWaXJ0dWFsTGlzdFxuICogICBpdGVtcz17bWVtYmVyc31cbiAqICAgaXRlbUhlaWdodD17ODB9XG4gKiAgIGhlaWdodD17NjAwfVxuICogICByZW5kZXJJdGVtPXsobWVtYmVyLCBpbmRleCwgc3R5bGUpID0+IChcbiAqICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0+XG4gKiAgICAgICA8TWVtYmVyUm93IG1lbWJlcj17bWVtYmVyfSAvPlxuICogICAgIDwvZGl2PlxuICogICApfVxuICogLz5cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gVmlydHVhbExpc3QoeyBpdGVtcywgaXRlbUhlaWdodCwgaGVpZ2h0LCB3aWR0aCA9ICcxMDAlJywgcmVuZGVySXRlbSwgY2xhc3NOYW1lID0gJycsIG92ZXJzY2FuQ291bnQgPSA1LCBvblNjcm9sbCwgaW5pdGlhbFNjcm9sbE9mZnNldCA9IDAsIH0pIHtcbiAgICBjb25zdCBsaXN0UmVmID0gdXNlUmVmKG51bGwpO1xuICAgIC8vIFJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uIG9uIG1vdW50IGlmIHByb3ZpZGVkXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGxpc3RSZWYuY3VycmVudCAmJiBpbml0aWFsU2Nyb2xsT2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgbGlzdFJlZi5jdXJyZW50LnNjcm9sbFRvKGluaXRpYWxTY3JvbGxPZmZzZXQpO1xuICAgICAgICB9XG4gICAgfSwgW2luaXRpYWxTY3JvbGxPZmZzZXRdKTtcbiAgICAvLyBSb3cgcmVuZGVyZXIgd3JhcHBlclxuICAgIGNvbnN0IFJvdyA9ICh7IGluZGV4LCBzdHlsZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICAgIHJldHVybiBfanN4KF9GcmFnbWVudCwgeyBjaGlsZHJlbjogcmVuZGVySXRlbShpdGVtLCBpbmRleCwgc3R5bGUpIH0pO1xuICAgIH07XG4gICAgLy8gSGFuZGxlIHNjcm9sbCBldmVudHNcbiAgICBjb25zdCBoYW5kbGVTY3JvbGwgPSAoeyBzY3JvbGxPZmZzZXQgfSkgPT4ge1xuICAgICAgICBpZiAob25TY3JvbGwpIHtcbiAgICAgICAgICAgIG9uU2Nyb2xsKHNjcm9sbE9mZnNldCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCBjaGlsZHJlbjogX2pzeChGaXhlZFNpemVMaXN0LCB7IHJlZjogbGlzdFJlZiwgaGVpZ2h0OiB0eXBlb2YgaGVpZ2h0ID09PSAnbnVtYmVyJyA/IGhlaWdodCA6IHBhcnNlRmxvYXQoaGVpZ2h0KSwgaXRlbUNvdW50OiBpdGVtcy5sZW5ndGgsIGl0ZW1TaXplOiBpdGVtSGVpZ2h0LCB3aWR0aDogd2lkdGgsIG92ZXJzY2FuQ291bnQ6IG92ZXJzY2FuQ291bnQsIG9uU2Nyb2xsOiBoYW5kbGVTY3JvbGwsIGNoaWxkcmVuOiBSb3cgfSkgfSkpO1xufVxuZXhwb3J0IGRlZmF1bHQgVmlydHVhbExpc3Q7XG4iLCJpbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBUaHJlc2hvbGQgZm9yIGVuYWJsaW5nIHZpcnR1YWwgc2Nyb2xsaW5nXG4gKiBMaXN0cyB3aXRoIG1vcmUgdGhhbiB0aGlzIG51bWJlciBvZiBpdGVtcyB3aWxsIHVzZSB2aXJ0dWFsIHNjcm9sbGluZ1xuICovXG5jb25zdCBWSVJUVUFMX1NDUk9MTF9USFJFU0hPTEQgPSAxMDA7XG4vKipcbiAqIHVzZVZpcnR1YWxTY3JvbGxpbmcgSG9va1xuICpcbiAqIERldGVybWluZXMgd2hldGhlciB0byB1c2UgdmlydHVhbCBzY3JvbGxpbmcgYmFzZWQgb24gdGhlIG51bWJlciBvZiBpdGVtcy5cbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaXRlbSBjb3VudCBleGNlZWRzIHRoZSB0aHJlc2hvbGQgKDEwMCBpdGVtcykuXG4gKlxuICogQHBhcmFtIGl0ZW1Db3VudCAtIE51bWJlciBvZiBpdGVtcyBpbiB0aGUgbGlzdFxuICogQHBhcmFtIGZvcmNlVmlydHVhbCAtIE9wdGlvbmFsIGZsYWcgdG8gZm9yY2UgdmlydHVhbCBzY3JvbGxpbmcgcmVnYXJkbGVzcyBvZiBjb3VudFxuICogQHJldHVybnMgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gdXNlIHZpcnR1YWwgc2Nyb2xsaW5nXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzeFxuICogY29uc3Qgc2hvdWxkVXNlVmlydHVhbCA9IHVzZVZpcnR1YWxTY3JvbGxpbmcobWVtYmVycy5sZW5ndGgpO1xuICpcbiAqIHJldHVybiBzaG91bGRVc2VWaXJ0dWFsID8gKFxuICogICA8VmlydHVhbE1lbWJlclRhYmxlIG1lbWJlcnM9e21lbWJlcnN9IC8+XG4gKiApIDogKFxuICogICA8TWVtYmVyVGFibGUgbWVtYmVycz17bWVtYmVyc30gLz5cbiAqICk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVZpcnR1YWxTY3JvbGxpbmcoaXRlbUNvdW50LCBmb3JjZVZpcnR1YWwgPSBmYWxzZSkge1xuICAgIHJldHVybiB1c2VNZW1vKCgpID0+IHtcbiAgICAgICAgaWYgKGZvcmNlVmlydHVhbClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gaXRlbUNvdW50ID4gVklSVFVBTF9TQ1JPTExfVEhSRVNIT0xEO1xuICAgIH0sIFtpdGVtQ291bnQsIGZvcmNlVmlydHVhbF0pO1xufVxuZXhwb3J0IGRlZmF1bHQgdXNlVmlydHVhbFNjcm9sbGluZztcbiIsImltcG9ydCBhcGkgZnJvbSAnLi9hcGknO1xuZXhwb3J0IGNvbnN0IGFjdGl2aXR5QXBpID0ge1xuICAgIC8qKlxuICAgICAqIEdldCBwYWdpbmF0ZWQgYWN0aXZpdGllcyB3aXRoIG9wdGlvbmFsIGZpbHRlcnNcbiAgICAgKi9cbiAgICBnZXRBY3Rpdml0aWVzOiBhc3luYyAoZmlsdGVycykgPT4ge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICAgIGlmIChmaWx0ZXJzPy51c2VyX2lkKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXBwZW5kKCd1c2VyX2lkJywgZmlsdGVycy51c2VyX2lkLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWx0ZXJzPy5zdGFydF9kYXRlKSB7XG4gICAgICAgICAgICBwYXJhbXMuYXBwZW5kKCdzdGFydF9kYXRlJywgZmlsdGVycy5zdGFydF9kYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsdGVycz8uZW5kX2RhdGUpIHtcbiAgICAgICAgICAgIHBhcmFtcy5hcHBlbmQoJ2VuZF9kYXRlJywgZmlsdGVycy5lbmRfZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbHRlcnM/LmFjdGlvbikge1xuICAgICAgICAgICAgcGFyYW1zLmFwcGVuZCgnYWN0aW9uJywgZmlsdGVycy5hY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaWx0ZXJzPy5lbnRpdHlfdHlwZSkge1xuICAgICAgICAgICAgcGFyYW1zLmFwcGVuZCgnZW50aXR5X3R5cGUnLCBmaWx0ZXJzLmVudGl0eV90eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsdGVycz8ucGVyX3BhZ2UpIHtcbiAgICAgICAgICAgIHBhcmFtcy5hcHBlbmQoJ3Blcl9wYWdlJywgZmlsdGVycy5wZXJfcGFnZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlsdGVycz8ucGFnZSkge1xuICAgICAgICAgICAgcGFyYW1zLmFwcGVuZCgncGFnZScsIGZpbHRlcnMucGFnZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBxdWVyeVN0cmluZyA9IHBhcmFtcy50b1N0cmluZygpO1xuICAgICAgICBjb25zdCB1cmwgPSBxdWVyeVN0cmluZyA/IGAvYWN0aXZpdGllcz8ke3F1ZXJ5U3RyaW5nfWAgOiAnL2FjdGl2aXRpZXMnO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQodXJsKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBHZXQgbGlzdCBvZiB1c2VycyBmb3IgZmlsdGVyIGRyb3Bkb3duXG4gICAgICovXG4gICAgZ2V0VXNlcnM6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KCcvYWN0aXZpdGllcy91c2VycycpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgIH0sXG59O1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMsIEZyYWdtZW50IGFzIF9GcmFnbWVudCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFjdGl2aXR5IGFzIEFjdGl2aXR5SWNvbiwgRmlsdGVyLCBEb3dubG9hZCwgWCwgVXNlciwgVGFnLCBHbG9iZSwgQ2xvY2ssIEFsZXJ0Q2lyY2xlLCBBbGVydFRyaWFuZ2xlLCBJbmZvLCBYQ2lyY2xlLCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBhY3Rpdml0eUFwaSB9IGZyb20gJy4uL2xpYi9hY3Rpdml0eUFwaSc7XG5pbXBvcnQgeyB1c2VUb2FzdCB9IGZyb20gJy4uL2NvbnRleHRzL1RvYXN0Q29udGV4dCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2J1dHRvbic7XG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvbW9kYWwnO1xuaW1wb3J0IHsgQmFkZ2UgfSBmcm9tICcuLi9jb21wb25lbnRzL3VpL2JhZGdlJztcbmltcG9ydCB7IHVzZVZpcnR1YWxTY3JvbGxpbmcgfSBmcm9tICcuLi9ob29rcy91c2VWaXJ0dWFsU2Nyb2xsaW5nJztcbmltcG9ydCBWaXJ0dWFsQWN0aXZpdHlUaW1lbGluZSBmcm9tICcuLi9jb21wb25lbnRzL2FjdGl2aXR5L1ZpcnR1YWxBY3Rpdml0eVRpbWVsaW5lJztcbmNvbnN0IEFjdGl2aXR5TG9nID0gKCkgPT4ge1xuICAgIGNvbnN0IFthY3Rpdml0aWVzLCBzZXRBY3Rpdml0aWVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbdXNlcnMsIHNldFVzZXJzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbc2VsZWN0ZWRBY3Rpdml0eSwgc2V0U2VsZWN0ZWRBY3Rpdml0eV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbaXNEZXRhaWxNb2RhbE9wZW4sIHNldElzRGV0YWlsTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbcmVhbFRpbWVFbmFibGVkLCBzZXRSZWFsVGltZUVuYWJsZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtmaWx0ZXJzLCBzZXRGaWx0ZXJzXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgcGVyX3BhZ2U6IDIwLFxuICAgIH0pO1xuICAgIGNvbnN0IFtwYWdpbmF0aW9uLCBzZXRQYWdpbmF0aW9uXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgY3VycmVudF9wYWdlOiAxLFxuICAgICAgICBwZXJfcGFnZTogMjAsXG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgICBsYXN0X3BhZ2U6IDEsXG4gICAgICAgIGZyb206IG51bGwsXG4gICAgICAgIHRvOiBudWxsLFxuICAgIH0pO1xuICAgIGNvbnN0IHsgc2hvd1RvYXN0IH0gPSB1c2VUb2FzdCgpO1xuICAgIC8vIERldGVybWluZSBpZiB3ZSBzaG91bGQgdXNlIHZpcnR1YWwgc2Nyb2xsaW5nICg+MTAwIGl0ZW1zKVxuICAgIGNvbnN0IHNob3VsZFVzZVZpcnR1YWxTY3JvbGxpbmcgPSB1c2VWaXJ0dWFsU2Nyb2xsaW5nKGFjdGl2aXRpZXMubGVuZ3RoKTtcbiAgICAvLyBGZXRjaCB1c2VycyBmb3IgZmlsdGVyIGRyb3Bkb3duXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZmV0Y2hVc2VycyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXNlcnNEYXRhID0gYXdhaXQgYWN0aXZpdHlBcGkuZ2V0VXNlcnMoKTtcbiAgICAgICAgICAgICAgICBzZXRVc2Vycyh1c2Vyc0RhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXJzOicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmV0Y2hVc2VycygpO1xuICAgIH0sIFtdKTtcbiAgICAvLyBGZXRjaCBhY3Rpdml0aWVzIHdoZW4gZmlsdGVycyBjaGFuZ2VcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaEFjdGl2aXRpZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFjdGl2aXR5QXBpLmdldEFjdGl2aXRpZXMoZmlsdGVycyk7XG4gICAgICAgICAgICAgICAgLy8gRW5oYW5jZSBhY3Rpdml0aWVzIHdpdGggc2V2ZXJpdHkgYW5kIG1vZHVsZSBpbmZvXG4gICAgICAgICAgICAgICAgY29uc3QgZW5oYW5jZWRBY3Rpdml0aWVzID0gcmVzcG9uc2UuZGF0YS5tYXAoKGFjdGl2aXR5KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAuLi5hY3Rpdml0eSxcbiAgICAgICAgICAgICAgICAgICAgc2V2ZXJpdHk6IGRldGVybWluZVNldmVyaXR5KGFjdGl2aXR5KSxcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlOiBleHRyYWN0TW9kdWxlKGFjdGl2aXR5LmVudGl0eV90eXBlKSxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgc2V0QWN0aXZpdGllcyhlbmhhbmNlZEFjdGl2aXRpZXMpO1xuICAgICAgICAgICAgICAgIHNldFBhZ2luYXRpb24ocmVzcG9uc2UucGFnaW5hdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggYWN0aXZpdGllczonLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdlcnJvcicsICdGYWlsZWQgdG8gbG9hZCBhY3Rpdml0eSBsb2cnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmZXRjaEFjdGl2aXRpZXMoKTtcbiAgICB9LCBbZmlsdGVycywgc2hvd1RvYXN0XSk7XG4gICAgLy8gUmVhbC10aW1lIHVwZGF0ZXMgcG9sbGluZ1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmICghcmVhbFRpbWVFbmFibGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhY3Rpdml0eUFwaS5nZXRBY3Rpdml0aWVzKHsgLi4uZmlsdGVycywgcGFnZTogMSB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmhhbmNlZEFjdGl2aXRpZXMgPSByZXNwb25zZS5kYXRhLm1hcCgoYWN0aXZpdHkpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLmFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICBzZXZlcml0eTogZGV0ZXJtaW5lU2V2ZXJpdHkoYWN0aXZpdHkpLFxuICAgICAgICAgICAgICAgICAgICBtb2R1bGU6IGV4dHJhY3RNb2R1bGUoYWN0aXZpdHkuZW50aXR5X3R5cGUpLFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICBzZXRBY3Rpdml0aWVzKGVuaGFuY2VkQWN0aXZpdGllcyk7XG4gICAgICAgICAgICAgICAgc2V0UGFnaW5hdGlvbihyZXNwb25zZS5wYWdpbmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byByZWZyZXNoIGFjdGl2aXRpZXM6JywgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDAwMCk7IC8vIFJlZnJlc2ggZXZlcnkgMzAgc2Vjb25kc1xuICAgICAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfSwgW3JlYWxUaW1lRW5hYmxlZCwgZmlsdGVyc10pO1xuICAgIC8vIEhlbHBlciBmdW5jdGlvbiB0byBkZXRlcm1pbmUgc2V2ZXJpdHkgYmFzZWQgb24gYWN0aW9uXG4gICAgY29uc3QgZGV0ZXJtaW5lU2V2ZXJpdHkgPSAoYWN0aXZpdHkpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gYWN0aXZpdHkuYWN0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChhY3Rpb24uaW5jbHVkZXMoJ2RlbGV0ZScpIHx8IGFjdGlvbi5pbmNsdWRlcygncmVtb3ZlJykpXG4gICAgICAgICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICAgICAgaWYgKGFjdGlvbi5pbmNsdWRlcygnZmFpbCcpIHx8IGFjdGlvbi5pbmNsdWRlcygnZXJyb3InKSlcbiAgICAgICAgICAgIHJldHVybiAnY3JpdGljYWwnO1xuICAgICAgICBpZiAoYWN0aW9uLmluY2x1ZGVzKCd1cGRhdGUnKSB8fCBhY3Rpb24uaW5jbHVkZXMoJ2VkaXQnKSlcbiAgICAgICAgICAgIHJldHVybiAnd2FybmluZyc7XG4gICAgICAgIHJldHVybiAnaW5mbyc7XG4gICAgfTtcbiAgICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gZXh0cmFjdCBtb2R1bGUgZnJvbSBlbnRpdHkgdHlwZVxuICAgIGNvbnN0IGV4dHJhY3RNb2R1bGUgPSAoZW50aXR5VHlwZSkgPT4ge1xuICAgICAgICBpZiAoIWVudGl0eVR5cGUpXG4gICAgICAgICAgICByZXR1cm4gJ1N5c3RlbSc7XG4gICAgICAgIC8vIENvbnZlcnQgZW50aXR5IHR5cGUgbGlrZSBcIkFwcFxcXFxNb2RlbHNcXFxcTWVtYmVyXCIgdG8gXCJNZW1iZXJzXCJcbiAgICAgICAgY29uc3QgcGFydHMgPSBlbnRpdHlUeXBlLnNwbGl0KCdcXFxcJyk7XG4gICAgICAgIGNvbnN0IG1vZGVsTmFtZSA9IHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICByZXR1cm4gbW9kZWxOYW1lLmVuZHNXaXRoKCdzJykgPyBtb2RlbE5hbWUgOiBgJHttb2RlbE5hbWV9c2A7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVGaWx0ZXJDaGFuZ2UgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBzZXRGaWx0ZXJzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIFtrZXldOiB2YWx1ZSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICBwYWdlOiAxLCAvLyBSZXNldCB0byBmaXJzdCBwYWdlIHdoZW4gZmlsdGVycyBjaGFuZ2VcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgY29uc3QgaGFuZGxlUGFnZUNoYW5nZSA9IChuZXdQYWdlKSA9PiB7XG4gICAgICAgIHNldEZpbHRlcnMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgcGFnZTogbmV3UGFnZSxcbiAgICAgICAgfSkpO1xuICAgICAgICAvLyBTY3JvbGwgdG8gdG9wIHdoZW4gcGFnZSBjaGFuZ2VzXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pO1xuICAgIH07XG4gICAgY29uc3QgY2xlYXJGaWx0ZXJzID0gKCkgPT4ge1xuICAgICAgICBzZXRGaWx0ZXJzKHtcbiAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgICBwZXJfcGFnZTogMjAsXG4gICAgICAgIH0pO1xuICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnRmlsdGVycyBjbGVhcmVkJyk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVFeHBvcnRMb2cgPSAoKSA9PiB7XG4gICAgICAgIHNob3dUb2FzdCgnaW5mbycsICdFeHBvcnQgZnVuY3Rpb25hbGl0eSBjb21pbmcgc29vbicpO1xuICAgICAgICAvLyBUT0RPOiBJbXBsZW1lbnQgZXhwb3J0IHRvIENTVi9QREZcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUFjdGl2aXR5Q2xpY2sgPSAoYWN0aXZpdHkpID0+IHtcbiAgICAgICAgc2V0U2VsZWN0ZWRBY3Rpdml0eShhY3Rpdml0eSk7XG4gICAgICAgIHNldElzRGV0YWlsTW9kYWxPcGVuKHRydWUpO1xuICAgIH07XG4gICAgY29uc3QgZ2V0U2V2ZXJpdHlDb2xvciA9IChzZXZlcml0eSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHNldmVyaXR5KSB7XG4gICAgICAgICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2JnLXByaW1hcnktNTAwJztcbiAgICAgICAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnYmctd2FybmluZy01MDAnO1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgIHJldHVybiAnYmctZXJyb3ItNTAwJztcbiAgICAgICAgICAgIGNhc2UgJ2NyaXRpY2FsJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2JnLWVycm9yLTcwMCc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnYmctbmV1dHJhbC01MDAnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRTZXZlcml0eUljb24gPSAoc2V2ZXJpdHkpID0+IHtcbiAgICAgICAgc3dpdGNoIChzZXZlcml0eSkge1xuICAgICAgICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9qc3goSW5mbywgeyBjbGFzc05hbWU6IFwidy00IGgtNFwiIH0pO1xuICAgICAgICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9qc3goQWxlcnRUcmlhbmdsZSwgeyBjbGFzc05hbWU6IFwidy00IGgtNFwiIH0pO1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgIHJldHVybiBfanN4KEFsZXJ0Q2lyY2xlLCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSk7XG4gICAgICAgICAgICBjYXNlICdjcml0aWNhbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9qc3goWENpcmNsZSwgeyBjbGFzc05hbWU6IFwidy00IGgtNFwiIH0pO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gX2pzeChJbmZvLCB7IGNsYXNzTmFtZTogXCJ3LTQgaC00XCIgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGZvcm1hdFJlbGF0aXZlVGltZSA9IChkYXRlU3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgZGlmZkluU2Vjb25kcyA9IE1hdGguZmxvb3IoKG5vdy5nZXRUaW1lKCkgLSBkYXRlLmdldFRpbWUoKSkgLyAxMDAwKTtcbiAgICAgICAgaWYgKGRpZmZJblNlY29uZHMgPCA2MClcbiAgICAgICAgICAgIHJldHVybiAnSnVzdCBub3cnO1xuICAgICAgICBpZiAoZGlmZkluU2Vjb25kcyA8IDM2MDApXG4gICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihkaWZmSW5TZWNvbmRzIC8gNjApfSBtaW51dGVzIGFnb2A7XG4gICAgICAgIGlmIChkaWZmSW5TZWNvbmRzIDwgODY0MDApXG4gICAgICAgICAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihkaWZmSW5TZWNvbmRzIC8gMzYwMCl9IGhvdXJzIGFnb2A7XG4gICAgICAgIGlmIChkaWZmSW5TZWNvbmRzIDwgNjA0ODAwKVxuICAgICAgICAgICAgcmV0dXJuIGAke01hdGguZmxvb3IoZGlmZkluU2Vjb25kcyAvIDg2NDAwKX0gZGF5cyBhZ29gO1xuICAgICAgICByZXR1cm4gZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKTtcbiAgICB9O1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicC02IG1heC13LTd4bCBteC1hdXRvXCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtYi02XCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJoMVwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1uZXV0cmFsLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goQWN0aXZpdHlJY29uLCB7IGNsYXNzTmFtZTogXCJ3LTggaC04IHRleHQtcHJpbWFyeS02MDBcIiB9KSwgXCJBY3Rpdml0eSBMb2dcIl0gfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbmV1dHJhbC02MDAgbXQtMlwiLCBjaGlsZHJlbjogXCJTeXN0ZW0gYWN0aXZpdHkgYW5kIGF1ZGl0IHRyYWlsXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiLCBjaGlsZHJlbjogW19qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBpY29uOiBfanN4KERvd25sb2FkLCB7fSksIG9uQ2xpY2s6IGhhbmRsZUV4cG9ydExvZywgY2hpbGRyZW46IFwiRXhwb3J0IExvZ1wiIH0pLCBfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBcImdob3N0XCIsIGljb246IF9qc3goWCwge30pLCBvbkNsaWNrOiBjbGVhckZpbHRlcnMsIGNoaWxkcmVuOiBcIkNsZWFyIEZpbHRlcnNcIiB9KV0gfSldIH0pIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHAtNiBtYi02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiLCBjaGlsZHJlbjogW19qc3goRmlsdGVyLCB7IGNsYXNzTmFtZTogXCJ3LTUgaC01IHRleHQtbmV1dHJhbC02MDBcIiB9KSwgX2pzeChcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIkZpbHRlcnNcIiB9KV0gfSksIF9qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgY3Vyc29yLXBvaW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNoZWNrZWQ6IHJlYWxUaW1lRW5hYmxlZCwgb25DaGFuZ2U6IChlKSA9PiBzZXRSZWFsVGltZUVuYWJsZWQoZS50YXJnZXQuY2hlY2tlZCksIGNsYXNzTmFtZTogXCJ3LTQgaC00IHRleHQtcHJpbWFyeS02MDAgYm9yZGVyLW5ldXRyYWwtMzAwIHJvdW5kZWQgZm9jdXM6cmluZy1wcmltYXJ5LTUwMFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IFwiUmVhbC10aW1lIHVwZGF0ZXNcIiB9KV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy01IGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJTdGFydCBEYXRlXCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiZGF0ZVwiLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTMgcHktMiBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50IHRleHQtc21cIiwgdmFsdWU6IGZpbHRlcnMuc3RhcnRfZGF0ZSB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiBoYW5kbGVGaWx0ZXJDaGFuZ2UoJ3N0YXJ0X2RhdGUnLCBlLnRhcmdldC52YWx1ZSkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIkVuZCBEYXRlXCIgfSksIF9qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiZGF0ZVwiLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTMgcHktMiBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50IHRleHQtc21cIiwgdmFsdWU6IGZpbHRlcnMuZW5kX2RhdGUgfHwgJycsIG9uQ2hhbmdlOiAoZSkgPT4gaGFuZGxlRmlsdGVyQ2hhbmdlKCdlbmRfZGF0ZScsIGUudGFyZ2V0LnZhbHVlKSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiVXNlclwiIH0pLCBfanN4cyhcInNlbGVjdFwiLCB7IGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtMyBweS0yIGJvcmRlciBib3JkZXItbmV1dHJhbC0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1zbVwiLCB2YWx1ZTogZmlsdGVycy51c2VyX2lkIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZUZpbHRlckNoYW5nZSgndXNlcl9pZCcsIGUudGFyZ2V0LnZhbHVlID8gcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIDogJycpLCBjaGlsZHJlbjogW19qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJcIiwgY2hpbGRyZW46IFwiQWxsIFVzZXJzXCIgfSksIHVzZXJzLm1hcCgodXNlcikgPT4gKF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogdXNlci5pZCwgY2hpbGRyZW46IHVzZXIubmFtZSB9LCB1c2VyLmlkKSkpXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiQWN0aW9uXCIgfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgY2xhc3NOYW1lOiBcInctZnVsbCBweC0zIHB5LTIgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnktNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudCB0ZXh0LXNtXCIsIHZhbHVlOiBmaWx0ZXJzLmFjdGlvbiB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiBoYW5kbGVGaWx0ZXJDaGFuZ2UoJ2FjdGlvbicsIGUudGFyZ2V0LnZhbHVlKSwgY2hpbGRyZW46IFtfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiXCIsIGNoaWxkcmVuOiBcIkFsbCBBY3Rpb25zXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJjcmVhdGVcIiwgY2hpbGRyZW46IFwiQ3JlYXRlXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJ1cGRhdGVcIiwgY2hpbGRyZW46IFwiVXBkYXRlXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJkZWxldGVcIiwgY2hpbGRyZW46IFwiRGVsZXRlXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJsb2dpblwiLCBjaGlsZHJlbjogXCJMb2dpblwiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwibG9nb3V0XCIsIGNoaWxkcmVuOiBcIkxvZ291dFwiIH0pXSB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiTW9kdWxlXCIgfSksIF9qc3hzKFwic2VsZWN0XCIsIHsgY2xhc3NOYW1lOiBcInctZnVsbCBweC0zIHB5LTIgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnktNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudCB0ZXh0LXNtXCIsIHZhbHVlOiBmaWx0ZXJzLmVudGl0eV90eXBlIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZUZpbHRlckNoYW5nZSgnZW50aXR5X3R5cGUnLCBlLnRhcmdldC52YWx1ZSksIGNoaWxkcmVuOiBbX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiLCBjaGlsZHJlbjogXCJBbGwgTW9kdWxlc1wiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiTWVtYmVyXCIsIGNoaWxkcmVuOiBcIk1lbWJlcnNcIiB9KSwgX2pzeChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIkV2ZW50XCIsIGNoaWxkcmVuOiBcIkV2ZW50c1wiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiT2ZmZXJpbmdcIiwgY2hpbGRyZW46IFwiRmluYW5jZVwiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiRXhwZW5zZVwiLCBjaGlsZHJlbjogXCJGaW5hbmNlXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJTbWFsbEdyb3VwXCIsIGNoaWxkcmVuOiBcIlNtYWxsIEdyb3Vwc1wiIH0pLCBfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiVXNlclwiLCBjaGlsZHJlbjogXCJVc2Vyc1wiIH0pXSB9KV0gfSldIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IGxvYWRpbmcgPyAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCBwLTEyIHRleHQtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtYmxvY2sgYW5pbWF0ZS1zcGluIHJvdW5kZWQtZnVsbCBoLTEwIHctMTAgYm9yZGVyLTQgYm9yZGVyLXByaW1hcnktNjAwIGJvcmRlci10LXRyYW5zcGFyZW50XCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcIm10LTQgdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nIGFjdGl2aXRpZXMuLi5cIiB9KV0gfSkpIDogYWN0aXZpdGllcy5sZW5ndGggPT09IDAgPyAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmctd2hpdGUgcm91bmRlZC14bCBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1uZXV0cmFsLTIwMCBwLTEyIHRleHQtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChBY3Rpdml0eUljb24sIHsgY2xhc3NOYW1lOiBcInctMTYgaC0xNiBteC1hdXRvIG1iLTQgdGV4dC1uZXV0cmFsLTQwMFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LW5ldXRyYWwtNjAwIHRleHQtbGdcIiwgY2hpbGRyZW46IFwiTm8gYWN0aXZpdGllcyBmb3VuZFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LW5ldXRyYWwtNTAwIHRleHQtc20gbXQtMlwiLCBjaGlsZHJlbjogXCJUcnkgYWRqdXN0aW5nIHlvdXIgZmlsdGVycyBvciBjaGVjayBiYWNrIGxhdGVyXCIgfSldIH0pKSA6IHNob3VsZFVzZVZpcnR1YWxTY3JvbGxpbmcgPyAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbX2pzeChWaXJ0dWFsQWN0aXZpdHlUaW1lbGluZSwgeyBhY3Rpdml0aWVzOiBhY3Rpdml0aWVzLCBvbkFjdGl2aXR5Q2xpY2s6IGhhbmRsZUFjdGl2aXR5Q2xpY2ssIGhlaWdodDogNjAwIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHB4LTYgcHktNCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IFtcIlNob3dpbmcgXCIsIHBhZ2luYXRpb24uZnJvbSB8fCAwLCBcIiB0byBcIiwgcGFnaW5hdGlvbi50byB8fCAwLCBcIiBvZiBcIiwgcGFnaW5hdGlvbi50b3RhbCwgJyAnLCBcImFjdGl2aXRpZXNcIl0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChCdXR0b24sIHsgdmFyaWFudDogXCJvdXRsaW5lXCIsIHNpemU6IFwic21cIiwgb25DbGljazogKCkgPT4gaGFuZGxlUGFnZUNoYW5nZShwYWdpbmF0aW9uLmN1cnJlbnRfcGFnZSAtIDEpLCBkaXNhYmxlZDogcGFnaW5hdGlvbi5jdXJyZW50X3BhZ2UgPT09IDEsIGNoaWxkcmVuOiBcIlByZXZpb3VzXCIgfSksIF9qc3hzKFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDAgcHgtM1wiLCBjaGlsZHJlbjogW1wiUGFnZSBcIiwgcGFnaW5hdGlvbi5jdXJyZW50X3BhZ2UsIFwiIG9mIFwiLCBwYWdpbmF0aW9uLmxhc3RfcGFnZV0gfSksIF9qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZVBhZ2VDaGFuZ2UocGFnaW5hdGlvbi5jdXJyZW50X3BhZ2UgKyAxKSwgZGlzYWJsZWQ6IHBhZ2luYXRpb24uY3VycmVudF9wYWdlID09PSBwYWdpbmF0aW9uLmxhc3RfcGFnZSwgY2hpbGRyZW46IFwiTmV4dFwiIH0pXSB9KV0gfSldIH0pKSA6IChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFthY3Rpdml0aWVzLm1hcCgoYWN0aXZpdHksIGluZGV4KSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItbmV1dHJhbC0yMDAgcC02IGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgY3Vyc29yLXBvaW50ZXJcIiwgb25DbGljazogKCkgPT4gaGFuZGxlQWN0aXZpdHlDbGljayhhY3Rpdml0eSksIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC00XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBgdy0zIGgtMyByb3VuZGVkLWZ1bGwgJHtnZXRTZXZlcml0eUNvbG9yKGFjdGl2aXR5LnNldmVyaXR5IHx8ICdpbmZvJyl9IG10LTFgIH0pLCBpbmRleCA8IGFjdGl2aXRpZXMubGVuZ3RoIC0gMSAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ3LTAuNSBoLWZ1bGwgYmctbmV1dHJhbC0yMDAgbXQtMlwiIH0pKV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1zaHJpbmstMFwiLCBjaGlsZHJlbjogX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ3LTEwIGgtMTAgcm91bmRlZC1mdWxsIGJnLXByaW1hcnktMTAwIGJvcmRlci0yIGJvcmRlci1wcmltYXJ5LTIwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLCBjaGlsZHJlbjogX2pzeChVc2VyLCB7IGNsYXNzTmFtZTogXCJ3LTUgaC01IHRleHQtcHJpbWFyeS02MDBcIiB9KSB9KSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xIG1pbi13LTBcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMVwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogYWN0aXZpdHkudXNlcl9uYW1lIH0pLCBfanN4KEJhZGdlLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIGNoaWxkcmVuOiBhY3Rpdml0eS5hY3Rpb24gfSldIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC01MDBcIiwgY2hpbGRyZW46IGZvcm1hdFJlbGF0aXZlVGltZShhY3Rpdml0eS5jcmVhdGVkX2F0KSB9KV0gfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTcwMCBtYi0zXCIsIGNoaWxkcmVuOiBhY3Rpdml0eS5kZXNjcmlwdGlvbiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgdGV4dC14cyB0ZXh0LW5ldXRyYWwtNTAwXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIiwgY2hpbGRyZW46IFtfanN4KFRhZywgeyBjbGFzc05hbWU6IFwidy0zLjUgaC0zLjVcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogYWN0aXZpdHkubW9kdWxlIHx8ICdTeXN0ZW0nIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIiwgY2hpbGRyZW46IFtnZXRTZXZlcml0eUljb24oYWN0aXZpdHkuc2V2ZXJpdHkgfHwgJ2luZm8nKSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiY2FwaXRhbGl6ZVwiLCBjaGlsZHJlbjogYWN0aXZpdHkuc2V2ZXJpdHkgfHwgJ2luZm8nIH0pXSB9KSwgYWN0aXZpdHkuaXBfYWRkcmVzcyAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIiwgY2hpbGRyZW46IFtfanN4KEdsb2JlLCB7IGNsYXNzTmFtZTogXCJ3LTMuNSBoLTMuNVwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNoaWxkcmVuOiBhY3Rpdml0eS5pcF9hZGRyZXNzIH0pXSB9KSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCIsIGNoaWxkcmVuOiBbX2pzeChDbG9jaywgeyBjbGFzc05hbWU6IFwidy0zLjUgaC0zLjVcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjaGlsZHJlbjogbmV3IERhdGUoYWN0aXZpdHkuY3JlYXRlZF9hdCkudG9Mb2NhbGVUaW1lU3RyaW5nKCkgfSldIH0pXSB9KV0gfSldIH0pIH0sIGFjdGl2aXR5LmlkKSkpLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy13aGl0ZSByb3VuZGVkLXhsIHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHB4LTYgcHktNCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IFtcIlNob3dpbmcgXCIsIHBhZ2luYXRpb24uZnJvbSB8fCAwLCBcIiB0byBcIiwgcGFnaW5hdGlvbi50byB8fCAwLCBcIiBvZiBcIiwgcGFnaW5hdGlvbi50b3RhbCwgJyAnLCBcImFjdGl2aXRpZXNcIl0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCIsIGNoaWxkcmVuOiBbX2pzeChCdXR0b24sIHsgdmFyaWFudDogXCJvdXRsaW5lXCIsIHNpemU6IFwic21cIiwgb25DbGljazogKCkgPT4gaGFuZGxlUGFnZUNoYW5nZShwYWdpbmF0aW9uLmN1cnJlbnRfcGFnZSAtIDEpLCBkaXNhYmxlZDogcGFnaW5hdGlvbi5jdXJyZW50X3BhZ2UgPT09IDEsIGNoaWxkcmVuOiBcIlByZXZpb3VzXCIgfSksIF9qc3hzKFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDAgcHgtM1wiLCBjaGlsZHJlbjogW1wiUGFnZSBcIiwgcGFnaW5hdGlvbi5jdXJyZW50X3BhZ2UsIFwiIG9mIFwiLCBwYWdpbmF0aW9uLmxhc3RfcGFnZV0gfSksIF9qc3goQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZVBhZ2VDaGFuZ2UocGFnaW5hdGlvbi5jdXJyZW50X3BhZ2UgKyAxKSwgZGlzYWJsZWQ6IHBhZ2luYXRpb24uY3VycmVudF9wYWdlID09PSBwYWdpbmF0aW9uLmxhc3RfcGFnZSwgY2hpbGRyZW46IFwiTmV4dFwiIH0pXSB9KV0gfSldIH0pKSB9KSwgc2VsZWN0ZWRBY3Rpdml0eSAmJiAoX2pzeHMoTW9kYWwsIHsgaXNPcGVuOiBpc0RldGFpbE1vZGFsT3Blbiwgb25DbG9zZTogKCkgPT4gc2V0SXNEZXRhaWxNb2RhbE9wZW4oZmFsc2UpLCB0aXRsZTogXCJBY3Rpdml0eSBEZXRhaWxzXCIsIHNpemU6IFwibGdcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzcGFjZS15LTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwIG1iLTNcIiwgY2hpbGRyZW46IFwiVXNlciBJbmZvcm1hdGlvblwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy1uZXV0cmFsLTUwIHJvdW5kZWQtbGcgcC00IHNwYWNlLXktMlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIk5hbWU6XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogc2VsZWN0ZWRBY3Rpdml0eS51c2VyX25hbWUgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktYmV0d2VlblwiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJVc2VyIElEOlwiIH0pLCBfanN4cyhcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBbXCIjXCIsIHNlbGVjdGVkQWN0aXZpdHkudXNlcl9pZF0gfSldIH0pLCBzZWxlY3RlZEFjdGl2aXR5LmlwX2FkZHJlc3MgJiYgKF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIklQIEFkZHJlc3M6XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogc2VsZWN0ZWRBY3Rpdml0eS5pcF9hZGRyZXNzIH0pXSB9KSldIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMCBtYi0zXCIsIGNoaWxkcmVuOiBcIkFjdGlvbiBEZXRhaWxzXCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLW5ldXRyYWwtNTAgcm91bmRlZC1sZyBwLTQgc3BhY2UteS0yXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIiwgY2hpbGRyZW46IFtfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiQWN0aW9uIFR5cGU6XCIgfSksIF9qc3goQmFkZ2UsIHsgdmFyaWFudDogXCJvdXRsaW5lXCIsIGNoaWxkcmVuOiBzZWxlY3RlZEFjdGl2aXR5LmFjdGlvbiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIk1vZHVsZTpcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBzZWxlY3RlZEFjdGl2aXR5Lm1vZHVsZSB8fCAnU3lzdGVtJyB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIlRpbWVzdGFtcDpcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBuZXcgRGF0ZShzZWxlY3RlZEFjdGl2aXR5LmNyZWF0ZWRfYXQpLnRvTG9jYWxlU3RyaW5nKCkgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktYmV0d2VlblwiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJTZXZlcml0eTpcIiB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiwgY2hpbGRyZW46IFtnZXRTZXZlcml0eUljb24oc2VsZWN0ZWRBY3Rpdml0eS5zZXZlcml0eSB8fCAnaW5mbycpLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDAgY2FwaXRhbGl6ZVwiLCBjaGlsZHJlbjogc2VsZWN0ZWRBY3Rpdml0eS5zZXZlcml0eSB8fCAnaW5mbycgfSldIH0pXSB9KV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwIG1iLTNcIiwgY2hpbGRyZW46IFwiRGVzY3JpcHRpb25cIiB9KSwgX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy1uZXV0cmFsLTUwIHJvdW5kZWQtbGcgcC00XCIsIGNoaWxkcmVuOiBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtbmV1dHJhbC03MDBcIiwgY2hpbGRyZW46IHNlbGVjdGVkQWN0aXZpdHkuZGVzY3JpcHRpb24gfSkgfSldIH0pLCBzZWxlY3RlZEFjdGl2aXR5LmVudGl0eV9pZCAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1uZXV0cmFsLTkwMCBtYi0zXCIsIGNoaWxkcmVuOiBcIkVudGl0eSBJbmZvcm1hdGlvblwiIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJiZy1uZXV0cmFsLTUwIHJvdW5kZWQtbGcgcC00IHNwYWNlLXktMlwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXgganVzdGlmeS1iZXR3ZWVuXCIsIGNoaWxkcmVuOiBbX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBcIkVudGl0eSBUeXBlOlwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IHNlbGVjdGVkQWN0aXZpdHkuZW50aXR5X3R5cGUgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktYmV0d2VlblwiLCBjaGlsZHJlbjogW19qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogXCJFbnRpdHkgSUQ6XCIgfSksIF9qc3hzKFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtbmV1dHJhbC05MDBcIiwgY2hpbGRyZW46IFtcIiNcIiwgc2VsZWN0ZWRBY3Rpdml0eS5lbnRpdHlfaWRdIH0pXSB9KV0gfSldIH0pKV0gfSksIF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibXQtNiBmbGV4IGp1c3RpZnktZW5kXCIsIGNoaWxkcmVuOiBfanN4KEJ1dHRvbiwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgb25DbGljazogKCkgPT4gc2V0SXNEZXRhaWxNb2RhbE9wZW4oZmFsc2UpLCBjaGlsZHJlbjogXCJDbG9zZVwiIH0pIH0pXSB9KSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBBY3Rpdml0eUxvZztcbiIsInZhciBjdXJyZW50Tm9uY2U7XG5leHBvcnQgdmFyIHNldE5vbmNlID0gZnVuY3Rpb24gKG5vbmNlKSB7XG4gICAgY3VycmVudE5vbmNlID0gbm9uY2U7XG59O1xuZXhwb3J0IHZhciBnZXROb25jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY3VycmVudE5vbmNlKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50Tm9uY2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEyXCIsIHI6IFwiMTBcIiwga2V5OiBcIjFtZ2xheVwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJtMTUgOS02IDZcIiwga2V5OiBcIjF1emh2clwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJtOSA5IDYgNlwiLCBrZXk6IFwiejBiaXFmXCIgfV1cbl07XG5jb25zdCBDaXJjbGVYID0gY3JlYXRlTHVjaWRlSWNvbihcImNpcmNsZS14XCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBDaXJjbGVYIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNpcmNsZS14LmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgNnY2bDQgMlwiLCBrZXk6IFwibW1rN3lnXCIgfV0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEyXCIsIHI6IFwiMTBcIiwga2V5OiBcIjFtZ2xheVwiIH1dXG5dO1xuY29uc3QgQ2xvY2sgPSBjcmVhdGVMdWNpZGVJY29uKFwiY2xvY2tcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIENsb2NrIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsb2NrLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTIgMTVWM1wiLCBrZXk6IFwibTlnMXgxXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00XCIsIGtleTogXCJpaDduM2hcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTcgMTAgNSA1IDUtNVwiLCBrZXk6IFwiYnJzbjcwXCIgfV1cbl07XG5jb25zdCBEb3dubG9hZCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJkb3dubG9hZFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgRG93bmxvYWQgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG93bmxvYWQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xMCAyMGExIDEgMCAwIDAgLjU1My44OTVsMiAxQTEgMSAwIDAgMCAxNCAyMXYtN2EyIDIgMCAwIDEgLjUxNy0xLjM0MUwyMS43NCA0LjY3QTEgMSAwIDAgMCAyMSAzSDNhMSAxIDAgMCAwLS43NDIgMS42N2w3LjIyNSA3Ljk4OUEyIDIgMCAwIDEgMTAgMTR6XCIsXG4gICAgICBrZXk6IFwic2M3cTdpXCJcbiAgICB9XG4gIF1cbl07XG5jb25zdCBGdW5uZWwgPSBjcmVhdGVMdWNpZGVJY29uKFwiZnVubmVsXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBGdW5uZWwgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnVubmVsLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMlwiLCBjeTogXCIxMlwiLCByOiBcIjEwXCIsIGtleTogXCIxbWdsYXlcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDJhMTQuNSAxNC41IDAgMCAwIDAgMjAgMTQuNSAxNC41IDAgMCAwIDAtMjBcIiwga2V5OiBcIjEzbzF6bFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMiAxMmgyMFwiLCBrZXk6IFwiOWk0cHU0XCIgfV1cbl07XG5jb25zdCBHbG9iZSA9IGNyZWF0ZUx1Y2lkZUljb24oXCJnbG9iZVwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgR2xvYmUgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2xvYmUuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xMi41ODYgMi41ODZBMiAyIDAgMCAwIDExLjE3MiAySDRhMiAyIDAgMCAwLTIgMnY3LjE3MmEyIDIgMCAwIDAgLjU4NiAxLjQxNGw4LjcwNCA4LjcwNGEyLjQyNiAyLjQyNiAwIDAgMCAzLjQyIDBsNi41OC02LjU4YTIuNDI2IDIuNDI2IDAgMCAwIDAtMy40MnpcIixcbiAgICAgIGtleTogXCJ2a3RzZDBcIlxuICAgIH1cbiAgXSxcbiAgW1wiY2lyY2xlXCIsIHsgY3g6IFwiNy41XCIsIGN5OiBcIjcuNVwiLCByOiBcIi41XCIsIGZpbGw6IFwiY3VycmVudENvbG9yXCIsIGtleTogXCJrcXY5NDRcIiB9XVxuXTtcbmNvbnN0IFRhZyA9IGNyZWF0ZUx1Y2lkZUljb24oXCJ0YWdcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFRhZyBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YWcuanMubWFwXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHlsZVNpbmdsZXRvbiB9IGZyb20gJ3JlYWN0LXN0eWxlLXNpbmdsZXRvbic7XG5pbXBvcnQgeyBmdWxsV2lkdGhDbGFzc05hbWUsIHplcm9SaWdodENsYXNzTmFtZSwgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0R2FwV2lkdGggfSBmcm9tICcuL3V0aWxzJztcbnZhciBTdHlsZSA9IHN0eWxlU2luZ2xldG9uKCk7XG5leHBvcnQgdmFyIGxvY2tBdHRyaWJ1dGUgPSAnZGF0YS1zY3JvbGwtbG9ja2VkJztcbi8vIGltcG9ydGFudCB0aXAgLSBvbmNlIHdlIG1lYXN1cmUgc2Nyb2xsQmFyIHdpZHRoIGFuZCByZW1vdmUgdGhlbVxuLy8gd2UgY291bGQgbm90IHJlcGVhdCB0aGlzIG9wZXJhdGlvblxuLy8gdGh1cyB3ZSBhcmUgdXNpbmcgc3R5bGUtc2luZ2xldG9uIC0gb25seSB0aGUgZmlyc3QgXCJ5ZXQgY29ycmVjdFwiIHN0eWxlIHdpbGwgYmUgYXBwbGllZC5cbnZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiAoX2EsIGFsbG93UmVsYXRpdmUsIGdhcE1vZGUsIGltcG9ydGFudCkge1xuICAgIHZhciBsZWZ0ID0gX2EubGVmdCwgdG9wID0gX2EudG9wLCByaWdodCA9IF9hLnJpZ2h0LCBnYXAgPSBfYS5nYXA7XG4gICAgaWYgKGdhcE1vZGUgPT09IHZvaWQgMCkgeyBnYXBNb2RlID0gJ21hcmdpbic7IH1cbiAgICByZXR1cm4gXCJcXG4gIC5cIi5jb25jYXQobm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCBcIiB7XFxuICAgb3ZlcmZsb3c6IGhpZGRlbiBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICAgcGFkZGluZy1yaWdodDogXCIpLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgYm9keVtcIikuY29uY2F0KGxvY2tBdHRyaWJ1dGUsIFwiXSB7XFxuICAgIG92ZXJmbG93OiBoaWRkZW4gXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgICBvdmVyc2Nyb2xsLWJlaGF2aW9yOiBjb250YWluO1xcbiAgICBcIikuY29uY2F0KFtcbiAgICAgICAgYWxsb3dSZWxhdGl2ZSAmJiBcInBvc2l0aW9uOiByZWxhdGl2ZSBcIi5jb25jYXQoaW1wb3J0YW50LCBcIjtcIiksXG4gICAgICAgIGdhcE1vZGUgPT09ICdtYXJnaW4nICYmXG4gICAgICAgICAgICBcIlxcbiAgICBwYWRkaW5nLWxlZnQ6IFwiLmNvbmNhdChsZWZ0LCBcInB4O1xcbiAgICBwYWRkaW5nLXRvcDogXCIpLmNvbmNhdCh0b3AsIFwicHg7XFxuICAgIHBhZGRpbmctcmlnaHQ6IFwiKS5jb25jYXQocmlnaHQsIFwicHg7XFxuICAgIG1hcmdpbi1sZWZ0OjA7XFxuICAgIG1hcmdpbi10b3A6MDtcXG4gICAgbWFyZ2luLXJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICAgIFwiKSxcbiAgICAgICAgZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnICYmIFwicGFkZGluZy1yaWdodDogXCIuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XCIpLFxuICAgIF1cbiAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAuam9pbignJyksIFwiXFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KHplcm9SaWdodENsYXNzTmFtZSwgXCIge1xcbiAgICByaWdodDogXCIpLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICAuXCIpLmNvbmNhdChmdWxsV2lkdGhDbGFzc05hbWUsIFwiIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KHplcm9SaWdodENsYXNzTmFtZSwgXCIgLlwiKS5jb25jYXQoemVyb1JpZ2h0Q2xhc3NOYW1lLCBcIiB7XFxuICAgIHJpZ2h0OiAwIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoZnVsbFdpZHRoQ2xhc3NOYW1lLCBcIiAuXCIpLmNvbmNhdChmdWxsV2lkdGhDbGFzc05hbWUsIFwiIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgYm9keVtcIikuY29uY2F0KGxvY2tBdHRyaWJ1dGUsIFwiXSB7XFxuICAgIFwiKS5jb25jYXQocmVtb3ZlZEJhclNpemVWYXJpYWJsZSwgXCI6IFwiKS5jb25jYXQoZ2FwLCBcInB4O1xcbiAgfVxcblwiKTtcbn07XG52YXIgZ2V0Q3VycmVudFVzZUNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBwYXJzZUludChkb2N1bWVudC5ib2R5LmdldEF0dHJpYnV0ZShsb2NrQXR0cmlidXRlKSB8fCAnMCcsIDEwKTtcbiAgICByZXR1cm4gaXNGaW5pdGUoY291bnRlcikgPyBjb3VudGVyIDogMDtcbn07XG5leHBvcnQgdmFyIHVzZUxvY2tBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUobG9ja0F0dHJpYnV0ZSwgKGdldEN1cnJlbnRVc2VDb3VudGVyKCkgKyAxKS50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBuZXdDb3VudGVyID0gZ2V0Q3VycmVudFVzZUNvdW50ZXIoKSAtIDE7XG4gICAgICAgICAgICBpZiAobmV3Q291bnRlciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUobG9ja0F0dHJpYnV0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShsb2NrQXR0cmlidXRlLCBuZXdDb3VudGVyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sIFtdKTtcbn07XG4vKipcbiAqIFJlbW92ZXMgcGFnZSBzY3JvbGxiYXIgYW5kIGJsb2NrcyBwYWdlIHNjcm9sbCB3aGVuIG1vdW50ZWRcbiAqL1xuZXhwb3J0IHZhciBSZW1vdmVTY3JvbGxCYXIgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgbm9SZWxhdGl2ZSA9IF9hLm5vUmVsYXRpdmUsIG5vSW1wb3J0YW50ID0gX2Eubm9JbXBvcnRhbnQsIF9iID0gX2EuZ2FwTW9kZSwgZ2FwTW9kZSA9IF9iID09PSB2b2lkIDAgPyAnbWFyZ2luJyA6IF9iO1xuICAgIHVzZUxvY2tBdHRyaWJ1dGUoKTtcbiAgICAvKlxuICAgICBnYXAgd2lsbCBiZSBtZWFzdXJlZCBvbiBldmVyeSBjb21wb25lbnQgbW91bnRcbiAgICAgaG93ZXZlciBpdCB3aWxsIGJlIHVzZWQgb25seSBieSB0aGUgXCJmaXJzdFwiIGludm9jYXRpb25cbiAgICAgZHVlIHRvIHNpbmdsZXRvbiBuYXR1cmUgb2YgPFN0eWxlXG4gICAgICovXG4gICAgdmFyIGdhcCA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0R2FwV2lkdGgoZ2FwTW9kZSk7IH0sIFtnYXBNb2RlXSk7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3R5bGUsIHsgc3R5bGVzOiBnZXRTdHlsZXMoZ2FwLCAhbm9SZWxhdGl2ZSwgZ2FwTW9kZSwgIW5vSW1wb3J0YW50ID8gJyFpbXBvcnRhbnQnIDogJycpIH0pO1xufTtcbiIsImV4cG9ydCB2YXIgemVyb1JpZ2h0Q2xhc3NOYW1lID0gJ3JpZ2h0LXNjcm9sbC1iYXItcG9zaXRpb24nO1xuZXhwb3J0IHZhciBmdWxsV2lkdGhDbGFzc05hbWUgPSAnd2lkdGgtYmVmb3JlLXNjcm9sbC1iYXInO1xuZXhwb3J0IHZhciBub1Njcm9sbGJhcnNDbGFzc05hbWUgPSAnd2l0aC1zY3JvbGwtYmFycy1oaWRkZW4nO1xuLyoqXG4gKiBOYW1lIG9mIGEgQ1NTIHZhcmlhYmxlIGNvbnRhaW5pbmcgdGhlIGFtb3VudCBvZiBcImhpZGRlblwiIHNjcm9sbGJhclxuICogISBtaWdodCBiZSB1bmRlZmluZWQgISB1c2Ugd2lsbCBmYWxsYmFjayFcbiAqL1xuZXhwb3J0IHZhciByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlID0gJy0tcmVtb3ZlZC1ib2R5LXNjcm9sbC1iYXItc2l6ZSc7XG4iLCJpbXBvcnQgeyBSZW1vdmVTY3JvbGxCYXIgfSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgeyB6ZXJvUmlnaHRDbGFzc05hbWUsIGZ1bGxXaWR0aENsYXNzTmFtZSwgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0R2FwV2lkdGggfSBmcm9tICcuL3V0aWxzJztcbmV4cG9ydCB7IFJlbW92ZVNjcm9sbEJhciwgemVyb1JpZ2h0Q2xhc3NOYW1lLCBmdWxsV2lkdGhDbGFzc05hbWUsIG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSwgcmVtb3ZlZEJhclNpemVWYXJpYWJsZSwgZ2V0R2FwV2lkdGgsIH07XG4iLCJleHBvcnQgdmFyIHplcm9HYXAgPSB7XG4gICAgbGVmdDogMCxcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgZ2FwOiAwLFxufTtcbnZhciBwYXJzZSA9IGZ1bmN0aW9uICh4KSB7IHJldHVybiBwYXJzZUludCh4IHx8ICcnLCAxMCkgfHwgMDsgfTtcbnZhciBnZXRPZmZzZXQgPSBmdW5jdGlvbiAoZ2FwTW9kZSkge1xuICAgIHZhciBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpO1xuICAgIHZhciBsZWZ0ID0gY3NbZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnID8gJ3BhZGRpbmdMZWZ0JyA6ICdtYXJnaW5MZWZ0J107XG4gICAgdmFyIHRvcCA9IGNzW2dhcE1vZGUgPT09ICdwYWRkaW5nJyA/ICdwYWRkaW5nVG9wJyA6ICdtYXJnaW5Ub3AnXTtcbiAgICB2YXIgcmlnaHQgPSBjc1tnYXBNb2RlID09PSAncGFkZGluZycgPyAncGFkZGluZ1JpZ2h0JyA6ICdtYXJnaW5SaWdodCddO1xuICAgIHJldHVybiBbcGFyc2UobGVmdCksIHBhcnNlKHRvcCksIHBhcnNlKHJpZ2h0KV07XG59O1xuZXhwb3J0IHZhciBnZXRHYXBXaWR0aCA9IGZ1bmN0aW9uIChnYXBNb2RlKSB7XG4gICAgaWYgKGdhcE1vZGUgPT09IHZvaWQgMCkgeyBnYXBNb2RlID0gJ21hcmdpbic7IH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHplcm9HYXA7XG4gICAgfVxuICAgIHZhciBvZmZzZXRzID0gZ2V0T2Zmc2V0KGdhcE1vZGUpO1xuICAgIHZhciBkb2N1bWVudFdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIHZhciB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IG9mZnNldHNbMF0sXG4gICAgICAgIHRvcDogb2Zmc2V0c1sxXSxcbiAgICAgICAgcmlnaHQ6IG9mZnNldHNbMl0sXG4gICAgICAgIGdhcDogTWF0aC5tYXgoMCwgd2luZG93V2lkdGggLSBkb2N1bWVudFdpZHRoICsgb2Zmc2V0c1syXSAtIG9mZnNldHNbMF0pLFxuICAgIH07XG59O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJlbW92ZVNjcm9sbCB9IGZyb20gJy4vVUknO1xuaW1wb3J0IFNpZGVDYXIgZnJvbSAnLi9zaWRlY2FyJztcbnZhciBSZWFjdFJlbW92ZVNjcm9sbCA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCByZWYpIHsgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlbW92ZVNjcm9sbCwgX19hc3NpZ24oe30sIHByb3BzLCB7IHJlZjogcmVmLCBzaWRlQ2FyOiBTaWRlQ2FyIH0pKSk7IH0pO1xuUmVhY3RSZW1vdmVTY3JvbGwuY2xhc3NOYW1lcyA9IFJlbW92ZVNjcm9sbC5jbGFzc05hbWVzO1xuZXhwb3J0IGRlZmF1bHQgUmVhY3RSZW1vdmVTY3JvbGw7XG4iLCJpbXBvcnQgeyBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSZW1vdmVTY3JvbGxCYXIgfSBmcm9tICdyZWFjdC1yZW1vdmUtc2Nyb2xsLWJhcic7XG5pbXBvcnQgeyBzdHlsZVNpbmdsZXRvbiB9IGZyb20gJ3JlYWN0LXN0eWxlLXNpbmdsZXRvbic7XG5pbXBvcnQgeyBub25QYXNzaXZlIH0gZnJvbSAnLi9hZ2dyZXNpdmVDYXB0dXJlJztcbmltcG9ydCB7IGhhbmRsZVNjcm9sbCwgbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQgfSBmcm9tICcuL2hhbmRsZVNjcm9sbCc7XG5leHBvcnQgdmFyIGdldFRvdWNoWFkgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICByZXR1cm4gJ2NoYW5nZWRUb3VjaGVzJyBpbiBldmVudCA/IFtldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZXSA6IFswLCAwXTtcbn07XG5leHBvcnQgdmFyIGdldERlbHRhWFkgPSBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIFtldmVudC5kZWx0YVgsIGV2ZW50LmRlbHRhWV07IH07XG52YXIgZXh0cmFjdFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICByZXR1cm4gcmVmICYmICdjdXJyZW50JyBpbiByZWYgPyByZWYuY3VycmVudCA6IHJlZjtcbn07XG52YXIgZGVsdGFDb21wYXJlID0gZnVuY3Rpb24gKHgsIHkpIHsgcmV0dXJuIHhbMF0gPT09IHlbMF0gJiYgeFsxXSA9PT0geVsxXTsgfTtcbnZhciBnZW5lcmF0ZVN0eWxlID0gZnVuY3Rpb24gKGlkKSB7IHJldHVybiBcIlxcbiAgLmJsb2NrLWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkLCBcIiB7cG9pbnRlci1ldmVudHM6IG5vbmU7fVxcbiAgLmFsbG93LWludGVyYWN0aXZpdHktXCIpLmNvbmNhdChpZCwgXCIge3BvaW50ZXItZXZlbnRzOiBhbGw7fVxcblwiKTsgfTtcbnZhciBpZENvdW50ZXIgPSAwO1xudmFyIGxvY2tTdGFjayA9IFtdO1xuZXhwb3J0IGZ1bmN0aW9uIFJlbW92ZVNjcm9sbFNpZGVDYXIocHJvcHMpIHtcbiAgICB2YXIgc2hvdWxkUHJldmVudFF1ZXVlID0gUmVhY3QudXNlUmVmKFtdKTtcbiAgICB2YXIgdG91Y2hTdGFydFJlZiA9IFJlYWN0LnVzZVJlZihbMCwgMF0pO1xuICAgIHZhciBhY3RpdmVBeGlzID0gUmVhY3QudXNlUmVmKCk7XG4gICAgdmFyIGlkID0gUmVhY3QudXNlU3RhdGUoaWRDb3VudGVyKyspWzBdO1xuICAgIHZhciBTdHlsZSA9IFJlYWN0LnVzZVN0YXRlKHN0eWxlU2luZ2xldG9uKVswXTtcbiAgICB2YXIgbGFzdFByb3BzID0gUmVhY3QudXNlUmVmKHByb3BzKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBsYXN0UHJvcHMuY3VycmVudCA9IHByb3BzO1xuICAgIH0sIFtwcm9wc10pO1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChwcm9wcy5pbmVydCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiYmxvY2staW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTtcbiAgICAgICAgICAgIHZhciBhbGxvd18xID0gX19zcHJlYWRBcnJheShbcHJvcHMubG9ja1JlZi5jdXJyZW50XSwgKHByb3BzLnNoYXJkcyB8fCBbXSkubWFwKGV4dHJhY3RSZWYpLCB0cnVlKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgICBhbGxvd18xLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5jbGFzc0xpc3QuYWRkKFwiYWxsb3ctaW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTsgfSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImJsb2NrLWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkKSk7XG4gICAgICAgICAgICAgICAgYWxsb3dfMS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuY2xhc3NMaXN0LnJlbW92ZShcImFsbG93LWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkKSk7IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfSwgW3Byb3BzLmluZXJ0LCBwcm9wcy5sb2NrUmVmLmN1cnJlbnQsIHByb3BzLnNoYXJkc10pO1xuICAgIHZhciBzaG91bGRDYW5jZWxFdmVudCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCwgcGFyZW50KSB7XG4gICAgICAgIGlmICgoJ3RvdWNoZXMnIGluIGV2ZW50ICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAyKSB8fCAoZXZlbnQudHlwZSA9PT0gJ3doZWVsJyAmJiBldmVudC5jdHJsS2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuICFsYXN0UHJvcHMuY3VycmVudC5hbGxvd1BpbmNoWm9vbTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG91Y2ggPSBnZXRUb3VjaFhZKGV2ZW50KTtcbiAgICAgICAgdmFyIHRvdWNoU3RhcnQgPSB0b3VjaFN0YXJ0UmVmLmN1cnJlbnQ7XG4gICAgICAgIHZhciBkZWx0YVggPSAnZGVsdGFYJyBpbiBldmVudCA/IGV2ZW50LmRlbHRhWCA6IHRvdWNoU3RhcnRbMF0gLSB0b3VjaFswXTtcbiAgICAgICAgdmFyIGRlbHRhWSA9ICdkZWx0YVknIGluIGV2ZW50ID8gZXZlbnQuZGVsdGFZIDogdG91Y2hTdGFydFsxXSAtIHRvdWNoWzFdO1xuICAgICAgICB2YXIgY3VycmVudEF4aXM7XG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHZhciBtb3ZlRGlyZWN0aW9uID0gTWF0aC5hYnMoZGVsdGFYKSA+IE1hdGguYWJzKGRlbHRhWSkgPyAnaCcgOiAndic7XG4gICAgICAgIC8vIGFsbG93IGhvcml6b250YWwgdG91Y2ggbW92ZSBvbiBSYW5nZSBpbnB1dHMuIFRoZXkgd2lsbCBub3QgY2F1c2UgYW55IHNjcm9sbFxuICAgICAgICBpZiAoJ3RvdWNoZXMnIGluIGV2ZW50ICYmIG1vdmVEaXJlY3Rpb24gPT09ICdoJyAmJiB0YXJnZXQudHlwZSA9PT0gJ3JhbmdlJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFsbG93IGRyYWcgc2VsZWN0aW9uIChpT1MpOyBjaGVjayBpZiBzZWxlY3Rpb24ncyBhbmNob3JOb2RlIGlzIHRoZSBzYW1lIGFzIHRhcmdldCBvciBjb250YWlucyB0YXJnZXRcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIGFuY2hvck5vZGUgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmFuY2hvck5vZGU7XG4gICAgICAgIHZhciBpc1RvdWNoaW5nU2VsZWN0aW9uID0gYW5jaG9yTm9kZSA/IGFuY2hvck5vZGUgPT09IHRhcmdldCB8fCBhbmNob3JOb2RlLmNvbnRhaW5zKHRhcmdldCkgOiBmYWxzZTtcbiAgICAgICAgaWYgKGlzVG91Y2hpbmdTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbiA9IGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkKG1vdmVEaXJlY3Rpb24sIHRhcmdldCk7XG4gICAgICAgIGlmICghY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGN1cnJlbnRBeGlzID0gbW92ZURpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRBeGlzID0gbW92ZURpcmVjdGlvbiA9PT0gJ3YnID8gJ2gnIDogJ3YnO1xuICAgICAgICAgICAgY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbiA9IGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkKG1vdmVEaXJlY3Rpb24sIHRhcmdldCk7XG4gICAgICAgICAgICAvLyBvdGhlciBheGlzIG1pZ2h0IGJlIG5vdCBzY3JvbGxhYmxlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhY3RpdmVBeGlzLmN1cnJlbnQgJiYgJ2NoYW5nZWRUb3VjaGVzJyBpbiBldmVudCAmJiAoZGVsdGFYIHx8IGRlbHRhWSkpIHtcbiAgICAgICAgICAgIGFjdGl2ZUF4aXMuY3VycmVudCA9IGN1cnJlbnRBeGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudEF4aXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYW5jZWxpbmdBeGlzID0gYWN0aXZlQXhpcy5jdXJyZW50IHx8IGN1cnJlbnRBeGlzO1xuICAgICAgICByZXR1cm4gaGFuZGxlU2Nyb2xsKGNhbmNlbGluZ0F4aXMsIHBhcmVudCwgZXZlbnQsIGNhbmNlbGluZ0F4aXMgPT09ICdoJyA/IGRlbHRhWCA6IGRlbHRhWSwgdHJ1ZSk7XG4gICAgfSwgW10pO1xuICAgIHZhciBzaG91bGRQcmV2ZW50ID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKF9ldmVudCkge1xuICAgICAgICB2YXIgZXZlbnQgPSBfZXZlbnQ7XG4gICAgICAgIGlmICghbG9ja1N0YWNrLmxlbmd0aCB8fCBsb2NrU3RhY2tbbG9ja1N0YWNrLmxlbmd0aCAtIDFdICE9PSBTdHlsZSkge1xuICAgICAgICAgICAgLy8gbm90IHRoZSBsYXN0IGFjdGl2ZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWx0YSA9ICdkZWx0YVknIGluIGV2ZW50ID8gZ2V0RGVsdGFYWShldmVudCkgOiBnZXRUb3VjaFhZKGV2ZW50KTtcbiAgICAgICAgdmFyIHNvdXJjZUV2ZW50ID0gc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09IGV2ZW50LnR5cGUgJiYgKGUudGFyZ2V0ID09PSBldmVudC50YXJnZXQgfHwgZXZlbnQudGFyZ2V0ID09PSBlLnNoYWRvd1BhcmVudCkgJiYgZGVsdGFDb21wYXJlKGUuZGVsdGEsIGRlbHRhKTsgfSlbMF07XG4gICAgICAgIC8vIHNlbGYgZXZlbnQsIGFuZCBzaG91bGQgYmUgY2FuY2VsZWRcbiAgICAgICAgaWYgKHNvdXJjZUV2ZW50ICYmIHNvdXJjZUV2ZW50LnNob3VsZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIG91dHNpZGUgb3Igc2hhcmQgZXZlbnRcbiAgICAgICAgaWYgKCFzb3VyY2VFdmVudCkge1xuICAgICAgICAgICAgdmFyIHNoYXJkTm9kZXMgPSAobGFzdFByb3BzLmN1cnJlbnQuc2hhcmRzIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5tYXAoZXh0cmFjdFJlZilcbiAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gbm9kZS5jb250YWlucyhldmVudC50YXJnZXQpOyB9KTtcbiAgICAgICAgICAgIHZhciBzaG91bGRTdG9wID0gc2hhcmROb2Rlcy5sZW5ndGggPiAwID8gc2hvdWxkQ2FuY2VsRXZlbnQoZXZlbnQsIHNoYXJkTm9kZXNbMF0pIDogIWxhc3RQcm9wcy5jdXJyZW50Lm5vSXNvbGF0aW9uO1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0b3ApIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICB2YXIgc2hvdWxkQ2FuY2VsID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKG5hbWUsIGRlbHRhLCB0YXJnZXQsIHNob3VsZCkge1xuICAgICAgICB2YXIgZXZlbnQgPSB7IG5hbWU6IG5hbWUsIGRlbHRhOiBkZWx0YSwgdGFyZ2V0OiB0YXJnZXQsIHNob3VsZDogc2hvdWxkLCBzaGFkb3dQYXJlbnQ6IGdldE91dGVybW9zdFNoYWRvd1BhcmVudCh0YXJnZXQpIH07XG4gICAgICAgIHNob3VsZFByZXZlbnRRdWV1ZS5jdXJyZW50LnB1c2goZXZlbnQpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNob3VsZFByZXZlbnRRdWV1ZS5jdXJyZW50ID0gc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlICE9PSBldmVudDsgfSk7XG4gICAgICAgIH0sIDEpO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2Nyb2xsVG91Y2hTdGFydCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0b3VjaFN0YXJ0UmVmLmN1cnJlbnQgPSBnZXRUb3VjaFhZKGV2ZW50KTtcbiAgICAgICAgYWN0aXZlQXhpcy5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2Nyb2xsV2hlZWwgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsKGV2ZW50LnR5cGUsIGdldERlbHRhWFkoZXZlbnQpLCBldmVudC50YXJnZXQsIHNob3VsZENhbmNlbEV2ZW50KGV2ZW50LCBwcm9wcy5sb2NrUmVmLmN1cnJlbnQpKTtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHNjcm9sbFRvdWNoTW92ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzaG91bGRDYW5jZWwoZXZlbnQudHlwZSwgZ2V0VG91Y2hYWShldmVudCksIGV2ZW50LnRhcmdldCwgc2hvdWxkQ2FuY2VsRXZlbnQoZXZlbnQsIHByb3BzLmxvY2tSZWYuY3VycmVudCkpO1xuICAgIH0sIFtdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2NrU3RhY2sucHVzaChTdHlsZSk7XG4gICAgICAgIHByb3BzLnNldENhbGxiYWNrcyh7XG4gICAgICAgICAgICBvblNjcm9sbENhcHR1cmU6IHNjcm9sbFdoZWVsLFxuICAgICAgICAgICAgb25XaGVlbENhcHR1cmU6IHNjcm9sbFdoZWVsLFxuICAgICAgICAgICAgb25Ub3VjaE1vdmVDYXB0dXJlOiBzY3JvbGxUb3VjaE1vdmUsXG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBzaG91bGRQcmV2ZW50LCBub25QYXNzaXZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNjcm9sbFRvdWNoU3RhcnQsIG5vblBhc3NpdmUpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbG9ja1N0YWNrID0gbG9ja1N0YWNrLmZpbHRlcihmdW5jdGlvbiAoaW5zdCkgeyByZXR1cm4gaW5zdCAhPT0gU3R5bGU7IH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzaG91bGRQcmV2ZW50LCBub25QYXNzaXZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNjcm9sbFRvdWNoU3RhcnQsIG5vblBhc3NpdmUpO1xuICAgICAgICB9O1xuICAgIH0sIFtdKTtcbiAgICB2YXIgcmVtb3ZlU2Nyb2xsQmFyID0gcHJvcHMucmVtb3ZlU2Nyb2xsQmFyLCBpbmVydCA9IHByb3BzLmluZXJ0O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgaW5lcnQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFN0eWxlLCB7IHN0eWxlczogZ2VuZXJhdGVTdHlsZShpZCkgfSkgOiBudWxsLFxuICAgICAgICByZW1vdmVTY3JvbGxCYXIgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFJlbW92ZVNjcm9sbEJhciwgeyBub1JlbGF0aXZlOiBwcm9wcy5ub1JlbGF0aXZlLCBnYXBNb2RlOiBwcm9wcy5nYXBNb2RlIH0pIDogbnVsbCkpO1xufVxuZnVuY3Rpb24gZ2V0T3V0ZXJtb3N0U2hhZG93UGFyZW50KG5vZGUpIHtcbiAgICB2YXIgc2hhZG93UGFyZW50ID0gbnVsbDtcbiAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIHNoYWRvd1BhcmVudCA9IG5vZGUuaG9zdDtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmhvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIHNoYWRvd1BhcmVudDtcbn1cbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX3Jlc3QgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZ1bGxXaWR0aENsYXNzTmFtZSwgemVyb1JpZ2h0Q2xhc3NOYW1lIH0gZnJvbSAncmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvY29uc3RhbnRzJztcbmltcG9ydCB7IHVzZU1lcmdlUmVmcyB9IGZyb20gJ3VzZS1jYWxsYmFjay1yZWYnO1xuaW1wb3J0IHsgZWZmZWN0Q2FyIH0gZnJvbSAnLi9tZWRpdW0nO1xudmFyIG5vdGhpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuO1xufTtcbi8qKlxuICogUmVtb3ZlcyBzY3JvbGxiYXIgZnJvbSB0aGUgcGFnZSBhbmQgY29udGFpbiB0aGUgc2Nyb2xsIHdpdGhpbiB0aGUgTG9ja1xuICovXG52YXIgUmVtb3ZlU2Nyb2xsID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHBhcmVudFJlZikge1xuICAgIHZhciByZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgdmFyIF9hID0gUmVhY3QudXNlU3RhdGUoe1xuICAgICAgICBvblNjcm9sbENhcHR1cmU6IG5vdGhpbmcsXG4gICAgICAgIG9uV2hlZWxDYXB0dXJlOiBub3RoaW5nLFxuICAgICAgICBvblRvdWNoTW92ZUNhcHR1cmU6IG5vdGhpbmcsXG4gICAgfSksIGNhbGxiYWNrcyA9IF9hWzBdLCBzZXRDYWxsYmFja3MgPSBfYVsxXTtcbiAgICB2YXIgZm9yd2FyZFByb3BzID0gcHJvcHMuZm9yd2FyZFByb3BzLCBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLCBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsIHJlbW92ZVNjcm9sbEJhciA9IHByb3BzLnJlbW92ZVNjcm9sbEJhciwgZW5hYmxlZCA9IHByb3BzLmVuYWJsZWQsIHNoYXJkcyA9IHByb3BzLnNoYXJkcywgc2lkZUNhciA9IHByb3BzLnNpZGVDYXIsIG5vUmVsYXRpdmUgPSBwcm9wcy5ub1JlbGF0aXZlLCBub0lzb2xhdGlvbiA9IHByb3BzLm5vSXNvbGF0aW9uLCBpbmVydCA9IHByb3BzLmluZXJ0LCBhbGxvd1BpbmNoWm9vbSA9IHByb3BzLmFsbG93UGluY2hab29tLCBfYiA9IHByb3BzLmFzLCBDb250YWluZXIgPSBfYiA9PT0gdm9pZCAwID8gJ2RpdicgOiBfYiwgZ2FwTW9kZSA9IHByb3BzLmdhcE1vZGUsIHJlc3QgPSBfX3Jlc3QocHJvcHMsIFtcImZvcndhcmRQcm9wc1wiLCBcImNoaWxkcmVuXCIsIFwiY2xhc3NOYW1lXCIsIFwicmVtb3ZlU2Nyb2xsQmFyXCIsIFwiZW5hYmxlZFwiLCBcInNoYXJkc1wiLCBcInNpZGVDYXJcIiwgXCJub1JlbGF0aXZlXCIsIFwibm9Jc29sYXRpb25cIiwgXCJpbmVydFwiLCBcImFsbG93UGluY2hab29tXCIsIFwiYXNcIiwgXCJnYXBNb2RlXCJdKTtcbiAgICB2YXIgU2lkZUNhciA9IHNpZGVDYXI7XG4gICAgdmFyIGNvbnRhaW5lclJlZiA9IHVzZU1lcmdlUmVmcyhbcmVmLCBwYXJlbnRSZWZdKTtcbiAgICB2YXIgY29udGFpbmVyUHJvcHMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzdCksIGNhbGxiYWNrcyk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICBlbmFibGVkICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVDYXIsIHsgc2lkZUNhcjogZWZmZWN0Q2FyLCByZW1vdmVTY3JvbGxCYXI6IHJlbW92ZVNjcm9sbEJhciwgc2hhcmRzOiBzaGFyZHMsIG5vUmVsYXRpdmU6IG5vUmVsYXRpdmUsIG5vSXNvbGF0aW9uOiBub0lzb2xhdGlvbiwgaW5lcnQ6IGluZXJ0LCBzZXRDYWxsYmFja3M6IHNldENhbGxiYWNrcywgYWxsb3dQaW5jaFpvb206ICEhYWxsb3dQaW5jaFpvb20sIGxvY2tSZWY6IHJlZiwgZ2FwTW9kZTogZ2FwTW9kZSB9KSksXG4gICAgICAgIGZvcndhcmRQcm9wcyA/IChSZWFjdC5jbG9uZUVsZW1lbnQoUmVhY3QuQ2hpbGRyZW4ub25seShjaGlsZHJlbiksIF9fYXNzaWduKF9fYXNzaWduKHt9LCBjb250YWluZXJQcm9wcyksIHsgcmVmOiBjb250YWluZXJSZWYgfSkpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KENvbnRhaW5lciwgX19hc3NpZ24oe30sIGNvbnRhaW5lclByb3BzLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCByZWY6IGNvbnRhaW5lclJlZiB9KSwgY2hpbGRyZW4pKSkpO1xufSk7XG5SZW1vdmVTY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgcmVtb3ZlU2Nyb2xsQmFyOiB0cnVlLFxuICAgIGluZXJ0OiBmYWxzZSxcbn07XG5SZW1vdmVTY3JvbGwuY2xhc3NOYW1lcyA9IHtcbiAgICBmdWxsV2lkdGg6IGZ1bGxXaWR0aENsYXNzTmFtZSxcbiAgICB6ZXJvUmlnaHQ6IHplcm9SaWdodENsYXNzTmFtZSxcbn07XG5leHBvcnQgeyBSZW1vdmVTY3JvbGwgfTtcbiIsInZhciBwYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0Jywgb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBwYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IHZhciBub25QYXNzaXZlID0gcGFzc2l2ZVN1cHBvcnRlZCA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IGZhbHNlO1xuIiwidmFyIGFsd2F5c0NvbnRhaW5zU2Nyb2xsID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAvLyB0ZXh0YXJlYSB3aWxsIGFsd2F5cyBfY29udGFpbl8gc2Nyb2xsIGluc2lkZSBzZWxmLiBJdCBvbmx5IGNhbiBiZSBoaWRkZW5cbiAgICByZXR1cm4gbm9kZS50YWdOYW1lID09PSAnVEVYVEFSRUEnO1xufTtcbnZhciBlbGVtZW50Q2FuQmVTY3JvbGxlZCA9IGZ1bmN0aW9uIChub2RlLCBvdmVyZmxvdykge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICByZXR1cm4gKFxuICAgIC8vIG5vdC1ub3Qtc2Nyb2xsYWJsZVxuICAgIHN0eWxlc1tvdmVyZmxvd10gIT09ICdoaWRkZW4nICYmXG4gICAgICAgIC8vIGNvbnRhaW5zIHNjcm9sbCBpbnNpZGUgc2VsZlxuICAgICAgICAhKHN0eWxlcy5vdmVyZmxvd1kgPT09IHN0eWxlcy5vdmVyZmxvd1ggJiYgIWFsd2F5c0NvbnRhaW5zU2Nyb2xsKG5vZGUpICYmIHN0eWxlc1tvdmVyZmxvd10gPT09ICd2aXNpYmxlJykpO1xufTtcbnZhciBlbGVtZW50Q291bGRCZVZTY3JvbGxlZCA9IGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBlbGVtZW50Q2FuQmVTY3JvbGxlZChub2RlLCAnb3ZlcmZsb3dZJyk7IH07XG52YXIgZWxlbWVudENvdWxkQmVIU2Nyb2xsZWQgPSBmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gZWxlbWVudENhbkJlU2Nyb2xsZWQobm9kZSwgJ292ZXJmbG93WCcpOyB9O1xuZXhwb3J0IHZhciBsb2NhdGlvbkNvdWxkQmVTY3JvbGxlZCA9IGZ1bmN0aW9uIChheGlzLCBub2RlKSB7XG4gICAgdmFyIG93bmVyRG9jdW1lbnQgPSBub2RlLm93bmVyRG9jdW1lbnQ7XG4gICAgdmFyIGN1cnJlbnQgPSBub2RlO1xuICAgIGRvIHtcbiAgICAgICAgLy8gU2tpcCBvdmVyIHNoYWRvdyByb290XG4gICAgICAgIGlmICh0eXBlb2YgU2hhZG93Um9vdCAhPT0gJ3VuZGVmaW5lZCcgJiYgY3VycmVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lmhvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlzU2Nyb2xsYWJsZSA9IGVsZW1lbnRDb3VsZEJlU2Nyb2xsZWQoYXhpcywgY3VycmVudCk7XG4gICAgICAgIGlmIChpc1Njcm9sbGFibGUpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGdldFNjcm9sbFZhcmlhYmxlcyhheGlzLCBjdXJyZW50KSwgc2Nyb2xsSGVpZ2h0ID0gX2FbMV0sIGNsaWVudEhlaWdodCA9IF9hWzJdO1xuICAgICAgICAgICAgaWYgKHNjcm9sbEhlaWdodCA+IGNsaWVudEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gICAgfSB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBvd25lckRvY3VtZW50LmJvZHkpO1xuICAgIHJldHVybiBmYWxzZTtcbn07XG52YXIgZ2V0VlNjcm9sbFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzY3JvbGxUb3AgPSBfYS5zY3JvbGxUb3AsIHNjcm9sbEhlaWdodCA9IF9hLnNjcm9sbEhlaWdodCwgY2xpZW50SGVpZ2h0ID0gX2EuY2xpZW50SGVpZ2h0O1xuICAgIHJldHVybiBbXG4gICAgICAgIHNjcm9sbFRvcCxcbiAgICAgICAgc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBjbGllbnRIZWlnaHQsXG4gICAgXTtcbn07XG52YXIgZ2V0SFNjcm9sbFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzY3JvbGxMZWZ0ID0gX2Euc2Nyb2xsTGVmdCwgc2Nyb2xsV2lkdGggPSBfYS5zY3JvbGxXaWR0aCwgY2xpZW50V2lkdGggPSBfYS5jbGllbnRXaWR0aDtcbiAgICByZXR1cm4gW1xuICAgICAgICBzY3JvbGxMZWZ0LFxuICAgICAgICBzY3JvbGxXaWR0aCxcbiAgICAgICAgY2xpZW50V2lkdGgsXG4gICAgXTtcbn07XG52YXIgZWxlbWVudENvdWxkQmVTY3JvbGxlZCA9IGZ1bmN0aW9uIChheGlzLCBub2RlKSB7XG4gICAgcmV0dXJuIGF4aXMgPT09ICd2JyA/IGVsZW1lbnRDb3VsZEJlVlNjcm9sbGVkKG5vZGUpIDogZWxlbWVudENvdWxkQmVIU2Nyb2xsZWQobm9kZSk7XG59O1xudmFyIGdldFNjcm9sbFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChheGlzLCBub2RlKSB7XG4gICAgcmV0dXJuIGF4aXMgPT09ICd2JyA/IGdldFZTY3JvbGxWYXJpYWJsZXMobm9kZSkgOiBnZXRIU2Nyb2xsVmFyaWFibGVzKG5vZGUpO1xufTtcbnZhciBnZXREaXJlY3Rpb25GYWN0b3IgPSBmdW5jdGlvbiAoYXhpcywgZGlyZWN0aW9uKSB7XG4gICAgLyoqXG4gICAgICogSWYgdGhlIGVsZW1lbnQncyBkaXJlY3Rpb24gaXMgcnRsIChyaWdodC10by1sZWZ0KSwgdGhlbiBzY3JvbGxMZWZ0IGlzIDAgd2hlbiB0aGUgc2Nyb2xsYmFyIGlzIGF0IGl0cyByaWdodG1vc3QgcG9zaXRpb24sXG4gICAgICogYW5kIHRoZW4gaW5jcmVhc2luZ2x5IG5lZ2F0aXZlIGFzIHlvdSBzY3JvbGwgdG93YXJkcyB0aGUgZW5kIG9mIHRoZSBjb250ZW50LlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvc2Nyb2xsTGVmdFxuICAgICAqL1xuICAgIHJldHVybiBheGlzID09PSAnaCcgJiYgZGlyZWN0aW9uID09PSAncnRsJyA/IC0xIDogMTtcbn07XG5leHBvcnQgdmFyIGhhbmRsZVNjcm9sbCA9IGZ1bmN0aW9uIChheGlzLCBlbmRUYXJnZXQsIGV2ZW50LCBzb3VyY2VEZWx0YSwgbm9PdmVyc2Nyb2xsKSB7XG4gICAgdmFyIGRpcmVjdGlvbkZhY3RvciA9IGdldERpcmVjdGlvbkZhY3RvcihheGlzLCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbmRUYXJnZXQpLmRpcmVjdGlvbik7XG4gICAgdmFyIGRlbHRhID0gZGlyZWN0aW9uRmFjdG9yICogc291cmNlRGVsdGE7XG4gICAgLy8gZmluZCBzY3JvbGxhYmxlIHRhcmdldFxuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgdmFyIHRhcmdldEluTG9jayA9IGVuZFRhcmdldC5jb250YWlucyh0YXJnZXQpO1xuICAgIHZhciBzaG91bGRDYW5jZWxTY3JvbGwgPSBmYWxzZTtcbiAgICB2YXIgaXNEZWx0YVBvc2l0aXZlID0gZGVsdGEgPiAwO1xuICAgIHZhciBhdmFpbGFibGVTY3JvbGwgPSAwO1xuICAgIHZhciBhdmFpbGFibGVTY3JvbGxUb3AgPSAwO1xuICAgIGRvIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IGdldFNjcm9sbFZhcmlhYmxlcyhheGlzLCB0YXJnZXQpLCBwb3NpdGlvbiA9IF9hWzBdLCBzY3JvbGxfMSA9IF9hWzFdLCBjYXBhY2l0eSA9IF9hWzJdO1xuICAgICAgICB2YXIgZWxlbWVudFNjcm9sbCA9IHNjcm9sbF8xIC0gY2FwYWNpdHkgLSBkaXJlY3Rpb25GYWN0b3IgKiBwb3NpdGlvbjtcbiAgICAgICAgaWYgKHBvc2l0aW9uIHx8IGVsZW1lbnRTY3JvbGwpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Q291bGRCZVNjcm9sbGVkKGF4aXMsIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVTY3JvbGwgKz0gZWxlbWVudFNjcm9sbDtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVTY3JvbGxUb3AgKz0gcG9zaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcmVudF8xID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIC8vIHdlIHdpbGwgXCJidWJibGVcIiBmcm9tIFNoYWRvd0RvbSBpbiBjYXNlIHdlIGFyZSwgb3IganVzdCB0byB0aGUgcGFyZW50IGluIG5vcm1hbCBjYXNlXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgbG9naWMgdXNlZCBpbiBmb2N1cy1sb2NrXG4gICAgICAgIHRhcmdldCA9IChwYXJlbnRfMSAmJiBwYXJlbnRfMS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFID8gcGFyZW50XzEuaG9zdCA6IHBhcmVudF8xKTtcbiAgICB9IHdoaWxlIChcbiAgICAvLyBwb3J0YWxlZCBjb250ZW50XG4gICAgKCF0YXJnZXRJbkxvY2sgJiYgdGFyZ2V0ICE9PSBkb2N1bWVudC5ib2R5KSB8fFxuICAgICAgICAvLyBzZWxmIGNvbnRlbnRcbiAgICAgICAgKHRhcmdldEluTG9jayAmJiAoZW5kVGFyZ2V0LmNvbnRhaW5zKHRhcmdldCkgfHwgZW5kVGFyZ2V0ID09PSB0YXJnZXQpKSk7XG4gICAgLy8gaGFuZGxlIGVwc2lsb24gYXJvdW5kIDAgKG5vbiBzdGFuZGFyZCB6b29tIGxldmVscylcbiAgICBpZiAoaXNEZWx0YVBvc2l0aXZlICYmXG4gICAgICAgICgobm9PdmVyc2Nyb2xsICYmIE1hdGguYWJzKGF2YWlsYWJsZVNjcm9sbCkgPCAxKSB8fCAoIW5vT3ZlcnNjcm9sbCAmJiBkZWx0YSA+IGF2YWlsYWJsZVNjcm9sbCkpKSB7XG4gICAgICAgIHNob3VsZENhbmNlbFNjcm9sbCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFpc0RlbHRhUG9zaXRpdmUgJiZcbiAgICAgICAgKChub092ZXJzY3JvbGwgJiYgTWF0aC5hYnMoYXZhaWxhYmxlU2Nyb2xsVG9wKSA8IDEpIHx8ICghbm9PdmVyc2Nyb2xsICYmIC1kZWx0YSA+IGF2YWlsYWJsZVNjcm9sbFRvcCkpKSB7XG4gICAgICAgIHNob3VsZENhbmNlbFNjcm9sbCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzaG91bGRDYW5jZWxTY3JvbGw7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2lkZWNhck1lZGl1bSB9IGZyb20gJ3VzZS1zaWRlY2FyJztcbmV4cG9ydCB2YXIgZWZmZWN0Q2FyID0gY3JlYXRlU2lkZWNhck1lZGl1bSgpO1xuIiwiaW1wb3J0IHsgZXhwb3J0U2lkZWNhciB9IGZyb20gJ3VzZS1zaWRlY2FyJztcbmltcG9ydCB7IFJlbW92ZVNjcm9sbFNpZGVDYXIgfSBmcm9tICcuL1NpZGVFZmZlY3QnO1xuaW1wb3J0IHsgZWZmZWN0Q2FyIH0gZnJvbSAnLi9tZWRpdW0nO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0U2lkZWNhcihlZmZlY3RDYXIsIFJlbW92ZVNjcm9sbFNpZGVDYXIpO1xuIiwiaW1wb3J0IHsgc3R5bGVIb29rU2luZ2xldG9uIH0gZnJvbSAnLi9ob29rJztcbi8qKlxuICogY3JlYXRlIGEgQ29tcG9uZW50IHRvIGFkZCBzdHlsZXMgb24gZGVtYW5kXG4gKiAtIHN0eWxlcyBhcmUgYWRkZWQgd2hlbiBmaXJzdCBpbnN0YW5jZSBpcyBtb3VudGVkXG4gKiAtIHN0eWxlcyBhcmUgcmVtb3ZlZCB3aGVuIHRoZSBsYXN0IGluc3RhbmNlIGlzIHVubW91bnRlZFxuICogLSBjaGFuZ2luZyBzdHlsZXMgaW4gcnVudGltZSBkb2VzIG5vdGhpbmcgdW5sZXNzIGR5bmFtaWMgaXMgc2V0LiBCdXQgd2l0aCBtdWx0aXBsZSBjb21wb25lbnRzIHRoYXQgY2FuIGxlYWQgdG8gdGhlIHVuZGVmaW5lZCBiZWhhdmlvclxuICovXG5leHBvcnQgdmFyIHN0eWxlU2luZ2xldG9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB1c2VTdHlsZSA9IHN0eWxlSG9va1NpbmdsZXRvbigpO1xuICAgIHZhciBTaGVldCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgc3R5bGVzID0gX2Euc3R5bGVzLCBkeW5hbWljID0gX2EuZHluYW1pYztcbiAgICAgICAgdXNlU3R5bGUoc3R5bGVzLCBkeW5hbWljKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICByZXR1cm4gU2hlZXQ7XG59O1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc3R5bGVzaGVldFNpbmdsZXRvbiB9IGZyb20gJy4vc2luZ2xldG9uJztcbi8qKlxuICogY3JlYXRlcyBhIGhvb2sgdG8gY29udHJvbCBzdHlsZSBzaW5nbGV0b25cbiAqIEBzZWUge0BsaW5rIHN0eWxlU2luZ2xldG9ufSBmb3IgYSBzYWZlciBjb21wb25lbnQgdmVyc2lvblxuICogQGV4YW1wbGVcbiAqIGBgYHRzeFxuICogY29uc3QgdXNlU3R5bGUgPSBzdHlsZUhvb2tTaW5nbGV0b24oKTtcbiAqIC8vL1xuICogdXNlU3R5bGUoJ2JvZHkgeyBvdmVyZmxvdzogaGlkZGVufScpO1xuICovXG5leHBvcnQgdmFyIHN0eWxlSG9va1NpbmdsZXRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2hlZXQgPSBzdHlsZXNoZWV0U2luZ2xldG9uKCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdHlsZXMsIGlzRHluYW1pYykge1xuICAgICAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2hlZXQuYWRkKHN0eWxlcyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNoZWV0LnJlbW92ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwgW3N0eWxlcyAmJiBpc0R5bmFtaWNdKTtcbiAgICB9O1xufTtcbiIsImV4cG9ydCB7IHN0eWxlU2luZ2xldG9uIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuZXhwb3J0IHsgc3R5bGVzaGVldFNpbmdsZXRvbiB9IGZyb20gJy4vc2luZ2xldG9uJztcbmV4cG9ydCB7IHN0eWxlSG9va1NpbmdsZXRvbiB9IGZyb20gJy4vaG9vayc7XG4iLCJpbXBvcnQgeyBnZXROb25jZSB9IGZyb20gJ2dldC1ub25jZSc7XG5mdW5jdGlvbiBtYWtlU3R5bGVUYWcoKSB7XG4gICAgaWYgKCFkb2N1bWVudClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgdmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGFnLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHZhciBub25jZSA9IGdldE5vbmNlKCk7XG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgIH1cbiAgICByZXR1cm4gdGFnO1xufVxuZnVuY3Rpb24gaW5qZWN0U3R5bGVzKHRhZywgY3NzKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICh0YWcuc3R5bGVTaGVldCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRhZy5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0YWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVUYWcodGFnKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgaGVhZC5hcHBlbmRDaGlsZCh0YWcpO1xufVxuZXhwb3J0IHZhciBzdHlsZXNoZWV0U2luZ2xldG9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICB2YXIgc3R5bGVzaGVldCA9IG51bGw7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkOiBmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgICAgICAgIGlmIChjb3VudGVyID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoKHN0eWxlc2hlZXQgPSBtYWtlU3R5bGVUYWcoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0U3R5bGVzKHN0eWxlc2hlZXQsIHN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0U3R5bGVUYWcoc3R5bGVzaGVldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvdW50ZXItLTtcbiAgICAgICAgICAgIGlmICghY291bnRlciAmJiBzdHlsZXNoZWV0KSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldC5wYXJlbnROb2RlICYmIHN0eWxlc2hlZXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZXNoZWV0KTtcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufTtcbiIsIi8qKlxuICogQXNzaWducyBhIHZhbHVlIGZvciBhIGdpdmVuIHJlZiwgbm8gbWF0dGVyIG9mIHRoZSByZWYgZm9ybWF0XG4gKiBAcGFyYW0ge1JlZk9iamVjdH0gcmVmIC0gYSBjYWxsYmFjayBmdW5jdGlvbiBvciByZWYgb2JqZWN0XG4gKiBAcGFyYW0gdmFsdWUgLSBhIG5ldyB2YWx1ZVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI2Fzc2lnbnJlZlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHJlZk9iamVjdCA9IHVzZVJlZigpO1xuICogY29uc3QgcmVmRm4gPSAocmVmKSA9PiB7Li4uLn1cbiAqXG4gKiBhc3NpZ25SZWYocmVmT2JqZWN0LCBcInJlZlZhbHVlXCIpO1xuICogYXNzaWduUmVmKHJlZkZuLCBcInJlZlZhbHVlXCIpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduUmVmKHJlZiwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZWYodmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZWYpIHtcbiAgICAgICAgcmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZjtcbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFzc2lnblJlZiB9IGZyb20gJy4vYXNzaWduUmVmJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSAnLi91c2VSZWYnO1xudmFyIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IFJlYWN0LnVzZUxheW91dEVmZmVjdCA6IFJlYWN0LnVzZUVmZmVjdDtcbnZhciBjdXJyZW50VmFsdWVzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogTWVyZ2VzIHR3byBvciBtb3JlIHJlZnMgdG9nZXRoZXIgcHJvdmlkaW5nIGEgc2luZ2xlIGludGVyZmFjZSB0byBzZXQgdGhlaXIgdmFsdWVcbiAqIEBwYXJhbSB7UmVmT2JqZWN0fFJlZn0gcmVmc1xuICogQHJldHVybnMge011dGFibGVSZWZPYmplY3R9IC0gYSBuZXcgcmVmLCB3aGljaCB0cmFuc2xhdGVzIGFsbCBjaGFuZ2VzIHRvIHtyZWZzfVxuICpcbiAqIEBzZWUge0BsaW5rIG1lcmdlUmVmc30gYSB2ZXJzaW9uIHdpdGhvdXQgYnVpdC1pbiBtZW1vaXphdGlvblxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjdXNlbWVyZ2VyZWZzXG4gKiBAZXhhbXBsZVxuICogY29uc3QgQ29tcG9uZW50ID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuICogICBjb25zdCBvd25SZWYgPSB1c2VSZWYoKTtcbiAqICAgY29uc3QgZG9tUmVmID0gdXNlTWVyZ2VSZWZzKFtyZWYsIG93blJlZl0pOyAvLyDwn5GIIG1lcmdlIHRvZ2V0aGVyXG4gKiAgIHJldHVybiA8ZGl2IHJlZj17ZG9tUmVmfT4uLi48L2Rpdj5cbiAqIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZU1lcmdlUmVmcyhyZWZzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICB2YXIgY2FsbGJhY2tSZWYgPSB1c2VDYWxsYmFja1JlZihkZWZhdWx0VmFsdWUgfHwgbnVsbCwgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIHJldHVybiByZWZzLmZvckVhY2goZnVuY3Rpb24gKHJlZikgeyByZXR1cm4gYXNzaWduUmVmKHJlZiwgbmV3VmFsdWUpOyB9KTtcbiAgICB9KTtcbiAgICAvLyBoYW5kbGUgcmVmcyBjaGFuZ2VzIC0gYWRkZWQgb3IgcmVtb3ZlZFxuICAgIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSBjdXJyZW50VmFsdWVzLmdldChjYWxsYmFja1JlZik7XG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIHByZXZSZWZzXzEgPSBuZXcgU2V0KG9sZFZhbHVlKTtcbiAgICAgICAgICAgIHZhciBuZXh0UmVmc18xID0gbmV3IFNldChyZWZzKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50XzEgPSBjYWxsYmFja1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgcHJldlJlZnNfMS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5leHRSZWZzXzEuaGFzKHJlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduUmVmKHJlZiwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuZXh0UmVmc18xLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgIGlmICghcHJldlJlZnNfMS5oYXMocmVmKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25SZWYocmVmLCBjdXJyZW50XzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRWYWx1ZXMuc2V0KGNhbGxiYWNrUmVmLCByZWZzKTtcbiAgICB9LCBbcmVmc10pO1xuICAgIHJldHVybiBjYWxsYmFja1JlZjtcbn1cbiIsImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBjcmVhdGVzIGEgTXV0YWJsZVJlZiB3aXRoIHJlZiBjaGFuZ2UgY2FsbGJhY2tcbiAqIEBwYXJhbSBpbml0aWFsVmFsdWUgLSBpbml0aWFsIHJlZiB2YWx1ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBhIGNhbGxiYWNrIHRvIHJ1biB3aGVuIHZhbHVlIGNoYW5nZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVmID0gdXNlQ2FsbGJhY2tSZWYoMCwgKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgPT4gY29uc29sZS5sb2cob2xkVmFsdWUsICctPicsIG5ld1ZhbHVlKTtcbiAqIHJlZi5jdXJyZW50ID0gMTtcbiAqIC8vIHByaW50cyAwIC0+IDFcbiAqXG4gKiBAc2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9ob29rcy1yZWZlcmVuY2UuaHRtbCN1c2VyZWZcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI3VzZWNhbGxiYWNrcmVmLS0tdG8tcmVwbGFjZS1yZWFjdHVzZXJlZlxuICogQHJldHVybnMge011dGFibGVSZWZPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWxsYmFja1JlZihpbml0aWFsVmFsdWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlZiA9IHVzZVN0YXRlKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7XG4gICAgICAgIC8vIHZhbHVlXG4gICAgICAgIHZhbHVlOiBpbml0aWFsVmFsdWUsXG4gICAgICAgIC8vIGxhc3QgY2FsbGJhY2tcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAvLyBcIm1lbW9pemVkXCIgcHVibGljIGludGVyZmFjZVxuICAgICAgICBmYWNhZGU6IHtcbiAgICAgICAgICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWYudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGN1cnJlbnQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdCA9IHJlZi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJlZi5jYWxsYmFjayh2YWx1ZSwgbGFzdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KTsgfSlbMF07XG4gICAgLy8gdXBkYXRlIGNhbGxiYWNrXG4gICAgcmVmLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgcmV0dXJuIHJlZi5mYWNhZGU7XG59XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19yZXN0IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG52YXIgU2lkZUNhciA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzaWRlQ2FyID0gX2Euc2lkZUNhciwgcmVzdCA9IF9fcmVzdChfYSwgW1wic2lkZUNhclwiXSk7XG4gICAgaWYgKCFzaWRlQ2FyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2lkZWNhcjogcGxlYXNlIHByb3ZpZGUgYHNpZGVDYXJgIHByb3BlcnR5IHRvIGltcG9ydCB0aGUgcmlnaHQgY2FyJyk7XG4gICAgfVxuICAgIHZhciBUYXJnZXQgPSBzaWRlQ2FyLnJlYWQoKTtcbiAgICBpZiAoIVRhcmdldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZGVjYXIgbWVkaXVtIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUYXJnZXQsIF9fYXNzaWduKHt9LCByZXN0KSk7XG59O1xuU2lkZUNhci5pc1NpZGVDYXJFeHBvcnQgPSB0cnVlO1xuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydFNpZGVjYXIobWVkaXVtLCBleHBvcnRlZCkge1xuICAgIG1lZGl1bS51c2VNZWRpdW0oZXhwb3J0ZWQpO1xuICAgIHJldHVybiBTaWRlQ2FyO1xufVxuIiwiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbmZ1bmN0aW9uIEl0b0koYSkge1xuICAgIHJldHVybiBhO1xufVxuZnVuY3Rpb24gaW5uZXJDcmVhdGVNZWRpdW0oZGVmYXVsdHMsIG1pZGRsZXdhcmUpIHtcbiAgICBpZiAobWlkZGxld2FyZSA9PT0gdm9pZCAwKSB7IG1pZGRsZXdhcmUgPSBJdG9JOyB9XG4gICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgIHZhciBhc3NpZ25lZCA9IGZhbHNlO1xuICAgIHZhciBtZWRpdW0gPSB7XG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhc3NpZ25lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2lkZWNhcjogY291bGQgbm90IGByZWFkYCBmcm9tIGFuIGBhc3NpZ25lZGAgbWVkaXVtLiBgcmVhZGAgY291bGQgYmUgdXNlZCBvbmx5IHdpdGggYHVzZU1lZGl1bWAuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXJbYnVmZmVyLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgICAgICB9LFxuICAgICAgICB1c2VNZWRpdW06IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG1pZGRsZXdhcmUoZGF0YSwgYXNzaWduZWQpO1xuICAgICAgICAgICAgYnVmZmVyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggIT09IGl0ZW07IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgYXNzaWduU3luY01lZGl1bTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICBhc3NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjYnMgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgY2JzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyID0ge1xuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uICh4KSB7IHJldHVybiBjYih4KTsgfSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJ1ZmZlcjsgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnbk1lZGl1bTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICBhc3NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcGVuZGluZ1F1ZXVlID0gW107XG4gICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjYnMgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgY2JzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZSA9IGJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBleGVjdXRlUXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNicyA9IHBlbmRpbmdRdWV1ZTtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICBjYnMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGN5Y2xlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihleGVjdXRlUXVldWUpOyB9O1xuICAgICAgICAgICAgY3ljbGUoKTtcbiAgICAgICAgICAgIGJ1ZmZlciA9IHtcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgY3ljbGUoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUgPSBwZW5kaW5nUXVldWUuZmlsdGVyKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gbWVkaXVtO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lZGl1bShkZWZhdWx0cywgbWlkZGxld2FyZSkge1xuICAgIGlmIChtaWRkbGV3YXJlID09PSB2b2lkIDApIHsgbWlkZGxld2FyZSA9IEl0b0k7IH1cbiAgICByZXR1cm4gaW5uZXJDcmVhdGVNZWRpdW0oZGVmYXVsdHMsIG1pZGRsZXdhcmUpO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaWRlY2FyTWVkaXVtKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBtZWRpdW0gPSBpbm5lckNyZWF0ZU1lZGl1bShudWxsKTtcbiAgICBtZWRpdW0ub3B0aW9ucyA9IF9fYXNzaWduKHsgYXN5bmM6IHRydWUsIHNzcjogZmFsc2UgfSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG1lZGl1bTtcbn1cbiIsIi8vIHNyYy9wcmltaXRpdmUudHN4XG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuZnVuY3Rpb24gY29tcG9zZUV2ZW50SGFuZGxlcnMob3JpZ2luYWxFdmVudEhhbmRsZXIsIG91ckV2ZW50SGFuZGxlciwgeyBjaGVja0ZvckRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlIH0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICBvcmlnaW5hbEV2ZW50SGFuZGxlcj8uKGV2ZW50KTtcbiAgICBpZiAoY2hlY2tGb3JEZWZhdWx0UHJldmVudGVkID09PSBmYWxzZSB8fCAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuIG91ckV2ZW50SGFuZGxlcj8uKGV2ZW50KTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBnZXRPd25lcldpbmRvdyhlbGVtZW50KSB7XG4gIGlmICghY2FuVXNlRE9NKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFjY2VzcyB3aW5kb3cgb3V0c2lkZSBvZiB0aGUgRE9NXCIpO1xuICB9XG4gIHJldHVybiBlbGVtZW50Py5vd25lckRvY3VtZW50Py5kZWZhdWx0VmlldyA/PyB3aW5kb3c7XG59XG5mdW5jdGlvbiBnZXRPd25lckRvY3VtZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFjYW5Vc2VET00pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWNjZXNzIGRvY3VtZW50IG91dHNpZGUgb2YgdGhlIERPTVwiKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudD8ub3duZXJEb2N1bWVudCA/PyBkb2N1bWVudDtcbn1cbmZ1bmN0aW9uIGdldEFjdGl2ZUVsZW1lbnQobm9kZSwgYWN0aXZlRGVzY2VuZGFudCA9IGZhbHNlKSB7XG4gIGNvbnN0IHsgYWN0aXZlRWxlbWVudCB9ID0gZ2V0T3duZXJEb2N1bWVudChub2RlKTtcbiAgaWYgKCFhY3RpdmVFbGVtZW50Py5ub2RlTmFtZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChpc0ZyYW1lKGFjdGl2ZUVsZW1lbnQpICYmIGFjdGl2ZUVsZW1lbnQuY29udGVudERvY3VtZW50KSB7XG4gICAgcmV0dXJuIGdldEFjdGl2ZUVsZW1lbnQoYWN0aXZlRWxlbWVudC5jb250ZW50RG9jdW1lbnQuYm9keSwgYWN0aXZlRGVzY2VuZGFudCk7XG4gIH1cbiAgaWYgKGFjdGl2ZURlc2NlbmRhbnQpIHtcbiAgICBjb25zdCBpZCA9IGFjdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIpO1xuICAgIGlmIChpZCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGdldE93bmVyRG9jdW1lbnQoYWN0aXZlRWxlbWVudCkuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBhY3RpdmVFbGVtZW50O1xufVxuZnVuY3Rpb24gaXNGcmFtZShlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50LnRhZ05hbWUgPT09IFwiSUZSQU1FXCI7XG59XG5leHBvcnQge1xuICBjYW5Vc2VET00sXG4gIGNvbXBvc2VFdmVudEhhbmRsZXJzLFxuICBnZXRBY3RpdmVFbGVtZW50LFxuICBnZXRPd25lckRvY3VtZW50LFxuICBnZXRPd25lcldpbmRvdyxcbiAgaXNGcmFtZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L2NvbnRleHQvc3JjL2NyZWF0ZS1jb250ZXh0LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQyKHJvb3RDb21wb25lbnROYW1lLCBkZWZhdWx0Q29udGV4dCkge1xuICBjb25zdCBDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dChkZWZhdWx0Q29udGV4dCk7XG4gIGNvbnN0IFByb3ZpZGVyID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uY29udGV4dCB9ID0gcHJvcHM7XG4gICAgY29uc3QgdmFsdWUgPSBSZWFjdC51c2VNZW1vKCgpID0+IGNvbnRleHQsIE9iamVjdC52YWx1ZXMoY29udGV4dCkpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KENvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWUsIGNoaWxkcmVuIH0pO1xuICB9O1xuICBQcm92aWRlci5kaXNwbGF5TmFtZSA9IHJvb3RDb21wb25lbnROYW1lICsgXCJQcm92aWRlclwiO1xuICBmdW5jdGlvbiB1c2VDb250ZXh0Mihjb25zdW1lck5hbWUpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChDb250ZXh0KTtcbiAgICBpZiAoY29udGV4dCkgcmV0dXJuIGNvbnRleHQ7XG4gICAgaWYgKGRlZmF1bHRDb250ZXh0ICE9PSB2b2lkIDApIHJldHVybiBkZWZhdWx0Q29udGV4dDtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFxcYCR7Y29uc3VtZXJOYW1lfVxcYCBtdXN0IGJlIHVzZWQgd2l0aGluIFxcYCR7cm9vdENvbXBvbmVudE5hbWV9XFxgYCk7XG4gIH1cbiAgcmV0dXJuIFtQcm92aWRlciwgdXNlQ29udGV4dDJdO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29udGV4dFNjb3BlKHNjb3BlTmFtZSwgY3JlYXRlQ29udGV4dFNjb3BlRGVwcyA9IFtdKSB7XG4gIGxldCBkZWZhdWx0Q29udGV4dHMgPSBbXTtcbiAgZnVuY3Rpb24gY3JlYXRlQ29udGV4dDMocm9vdENvbXBvbmVudE5hbWUsIGRlZmF1bHRDb250ZXh0KSB7XG4gICAgY29uc3QgQmFzZUNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KGRlZmF1bHRDb250ZXh0KTtcbiAgICBjb25zdCBpbmRleCA9IGRlZmF1bHRDb250ZXh0cy5sZW5ndGg7XG4gICAgZGVmYXVsdENvbnRleHRzID0gWy4uLmRlZmF1bHRDb250ZXh0cywgZGVmYXVsdENvbnRleHRdO1xuICAgIGNvbnN0IFByb3ZpZGVyID0gKHByb3BzKSA9PiB7XG4gICAgICBjb25zdCB7IHNjb3BlLCBjaGlsZHJlbiwgLi4uY29udGV4dCB9ID0gcHJvcHM7XG4gICAgICBjb25zdCBDb250ZXh0ID0gc2NvcGU/LltzY29wZU5hbWVdPy5baW5kZXhdIHx8IEJhc2VDb250ZXh0O1xuICAgICAgY29uc3QgdmFsdWUgPSBSZWFjdC51c2VNZW1vKCgpID0+IGNvbnRleHQsIE9iamVjdC52YWx1ZXMoY29udGV4dCkpO1xuICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZSwgY2hpbGRyZW4gfSk7XG4gICAgfTtcbiAgICBQcm92aWRlci5kaXNwbGF5TmFtZSA9IHJvb3RDb21wb25lbnROYW1lICsgXCJQcm92aWRlclwiO1xuICAgIGZ1bmN0aW9uIHVzZUNvbnRleHQyKGNvbnN1bWVyTmFtZSwgc2NvcGUpIHtcbiAgICAgIGNvbnN0IENvbnRleHQgPSBzY29wZT8uW3Njb3BlTmFtZV0/LltpbmRleF0gfHwgQmFzZUNvbnRleHQ7XG4gICAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChDb250ZXh0KTtcbiAgICAgIGlmIChjb250ZXh0KSByZXR1cm4gY29udGV4dDtcbiAgICAgIGlmIChkZWZhdWx0Q29udGV4dCAhPT0gdm9pZCAwKSByZXR1cm4gZGVmYXVsdENvbnRleHQ7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxcYCR7Y29uc3VtZXJOYW1lfVxcYCBtdXN0IGJlIHVzZWQgd2l0aGluIFxcYCR7cm9vdENvbXBvbmVudE5hbWV9XFxgYCk7XG4gICAgfVxuICAgIHJldHVybiBbUHJvdmlkZXIsIHVzZUNvbnRleHQyXTtcbiAgfVxuICBjb25zdCBjcmVhdGVTY29wZSA9ICgpID0+IHtcbiAgICBjb25zdCBzY29wZUNvbnRleHRzID0gZGVmYXVsdENvbnRleHRzLm1hcCgoZGVmYXVsdENvbnRleHQpID0+IHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVDb250ZXh0KGRlZmF1bHRDb250ZXh0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdXNlU2NvcGUoc2NvcGUpIHtcbiAgICAgIGNvbnN0IGNvbnRleHRzID0gc2NvcGU/LltzY29wZU5hbWVdIHx8IHNjb3BlQ29udGV4dHM7XG4gICAgICByZXR1cm4gUmVhY3QudXNlTWVtbyhcbiAgICAgICAgKCkgPT4gKHsgW2BfX3Njb3BlJHtzY29wZU5hbWV9YF06IHsgLi4uc2NvcGUsIFtzY29wZU5hbWVdOiBjb250ZXh0cyB9IH0pLFxuICAgICAgICBbc2NvcGUsIGNvbnRleHRzXVxuICAgICAgKTtcbiAgICB9O1xuICB9O1xuICBjcmVhdGVTY29wZS5zY29wZU5hbWUgPSBzY29wZU5hbWU7XG4gIHJldHVybiBbY3JlYXRlQ29udGV4dDMsIGNvbXBvc2VDb250ZXh0U2NvcGVzKGNyZWF0ZVNjb3BlLCAuLi5jcmVhdGVDb250ZXh0U2NvcGVEZXBzKV07XG59XG5mdW5jdGlvbiBjb21wb3NlQ29udGV4dFNjb3BlcyguLi5zY29wZXMpIHtcbiAgY29uc3QgYmFzZVNjb3BlID0gc2NvcGVzWzBdO1xuICBpZiAoc2NvcGVzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIGJhc2VTY29wZTtcbiAgY29uc3QgY3JlYXRlU2NvcGUgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2NvcGVIb29rcyA9IHNjb3Blcy5tYXAoKGNyZWF0ZVNjb3BlMikgPT4gKHtcbiAgICAgIHVzZVNjb3BlOiBjcmVhdGVTY29wZTIoKSxcbiAgICAgIHNjb3BlTmFtZTogY3JlYXRlU2NvcGUyLnNjb3BlTmFtZVxuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdXNlQ29tcG9zZWRTY29wZXMob3ZlcnJpZGVTY29wZXMpIHtcbiAgICAgIGNvbnN0IG5leHRTY29wZXMgPSBzY29wZUhvb2tzLnJlZHVjZSgobmV4dFNjb3BlczIsIHsgdXNlU2NvcGUsIHNjb3BlTmFtZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3BlUHJvcHMgPSB1c2VTY29wZShvdmVycmlkZVNjb3Blcyk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTY29wZSA9IHNjb3BlUHJvcHNbYF9fc2NvcGUke3Njb3BlTmFtZX1gXTtcbiAgICAgICAgcmV0dXJuIHsgLi4ubmV4dFNjb3BlczIsIC4uLmN1cnJlbnRTY29wZSB9O1xuICAgICAgfSwge30pO1xuICAgICAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oKCkgPT4gKHsgW2BfX3Njb3BlJHtiYXNlU2NvcGUuc2NvcGVOYW1lfWBdOiBuZXh0U2NvcGVzIH0pLCBbbmV4dFNjb3Blc10pO1xuICAgIH07XG4gIH07XG4gIGNyZWF0ZVNjb3BlLnNjb3BlTmFtZSA9IGJhc2VTY29wZS5zY29wZU5hbWU7XG4gIHJldHVybiBjcmVhdGVTY29wZTtcbn1cbmV4cG9ydCB7XG4gIGNyZWF0ZUNvbnRleHQyIGFzIGNyZWF0ZUNvbnRleHQsXG4gIGNyZWF0ZUNvbnRleHRTY29wZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZGlhbG9nLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlRXZlbnRIYW5kbGVycyB9IGZyb20gXCJAcmFkaXgtdWkvcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VDb21wb3NlZFJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgY3JlYXRlQ29udGV4dFNjb3BlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb250ZXh0XCI7XG5pbXBvcnQgeyB1c2VJZCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtaWRcIjtcbmltcG9ydCB7IHVzZUNvbnRyb2xsYWJsZVN0YXRlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY29udHJvbGxhYmxlLXN0YXRlXCI7XG5pbXBvcnQgeyBEaXNtaXNzYWJsZUxheWVyIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1kaXNtaXNzYWJsZS1sYXllclwiO1xuaW1wb3J0IHsgRm9jdXNTY29wZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtZm9jdXMtc2NvcGVcIjtcbmltcG9ydCB7IFBvcnRhbCBhcyBQb3J0YWxQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXBvcnRhbFwiO1xuaW1wb3J0IHsgUHJlc2VuY2UgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByZXNlbmNlXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlRm9jdXNHdWFyZHMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWZvY3VzLWd1YXJkc1wiO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsIH0gZnJvbSBcInJlYWN0LXJlbW92ZS1zY3JvbGxcIjtcbmltcG9ydCB7IGhpZGVPdGhlcnMgfSBmcm9tIFwiYXJpYS1oaWRkZW5cIjtcbmltcG9ydCB7IGNyZWF0ZVNsb3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXNsb3RcIjtcbmltcG9ydCB7IEZyYWdtZW50LCBqc3gsIGpzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBESUFMT0dfTkFNRSA9IFwiRGlhbG9nXCI7XG52YXIgW2NyZWF0ZURpYWxvZ0NvbnRleHQsIGNyZWF0ZURpYWxvZ1Njb3BlXSA9IGNyZWF0ZUNvbnRleHRTY29wZShESUFMT0dfTkFNRSk7XG52YXIgW0RpYWxvZ1Byb3ZpZGVyLCB1c2VEaWFsb2dDb250ZXh0XSA9IGNyZWF0ZURpYWxvZ0NvbnRleHQoRElBTE9HX05BTUUpO1xudmFyIERpYWxvZyA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7XG4gICAgX19zY29wZURpYWxvZyxcbiAgICBjaGlsZHJlbixcbiAgICBvcGVuOiBvcGVuUHJvcCxcbiAgICBkZWZhdWx0T3BlbixcbiAgICBvbk9wZW5DaGFuZ2UsXG4gICAgbW9kYWwgPSB0cnVlXG4gIH0gPSBwcm9wcztcbiAgY29uc3QgdHJpZ2dlclJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgY29udGVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlQ29udHJvbGxhYmxlU3RhdGUoe1xuICAgIHByb3A6IG9wZW5Qcm9wLFxuICAgIGRlZmF1bHRQcm9wOiBkZWZhdWx0T3BlbiA/PyBmYWxzZSxcbiAgICBvbkNoYW5nZTogb25PcGVuQ2hhbmdlLFxuICAgIGNhbGxlcjogRElBTE9HX05BTUVcbiAgfSk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgIERpYWxvZ1Byb3ZpZGVyLFxuICAgIHtcbiAgICAgIHNjb3BlOiBfX3Njb3BlRGlhbG9nLFxuICAgICAgdHJpZ2dlclJlZixcbiAgICAgIGNvbnRlbnRSZWYsXG4gICAgICBjb250ZW50SWQ6IHVzZUlkKCksXG4gICAgICB0aXRsZUlkOiB1c2VJZCgpLFxuICAgICAgZGVzY3JpcHRpb25JZDogdXNlSWQoKSxcbiAgICAgIG9wZW4sXG4gICAgICBvbk9wZW5DaGFuZ2U6IHNldE9wZW4sXG4gICAgICBvbk9wZW5Ub2dnbGU6IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHNldE9wZW4oKHByZXZPcGVuKSA9PiAhcHJldk9wZW4pLCBbc2V0T3Blbl0pLFxuICAgICAgbW9kYWwsXG4gICAgICBjaGlsZHJlblxuICAgIH1cbiAgKTtcbn07XG5EaWFsb2cuZGlzcGxheU5hbWUgPSBESUFMT0dfTkFNRTtcbnZhciBUUklHR0VSX05BTUUgPSBcIkRpYWxvZ1RyaWdnZXJcIjtcbnZhciBEaWFsb2dUcmlnZ2VyID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLnRyaWdnZXJQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoVFJJR0dFUl9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBjb21wb3NlZFRyaWdnZXJSZWYgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCBjb250ZXh0LnRyaWdnZXJSZWYpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgUHJpbWl0aXZlLmJ1dHRvbixcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgXCJhcmlhLWhhc3BvcHVwXCI6IFwiZGlhbG9nXCIsXG4gICAgICAgIFwiYXJpYS1leHBhbmRlZFwiOiBjb250ZXh0Lm9wZW4sXG4gICAgICAgIFwiYXJpYS1jb250cm9sc1wiOiBjb250ZXh0LmNvbnRlbnRJZCxcbiAgICAgICAgXCJkYXRhLXN0YXRlXCI6IGdldFN0YXRlKGNvbnRleHQub3BlbiksXG4gICAgICAgIC4uLnRyaWdnZXJQcm9wcyxcbiAgICAgICAgcmVmOiBjb21wb3NlZFRyaWdnZXJSZWYsXG4gICAgICAgIG9uQ2xpY2s6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQ2xpY2ssIGNvbnRleHQub25PcGVuVG9nZ2xlKVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG5EaWFsb2dUcmlnZ2VyLmRpc3BsYXlOYW1lID0gVFJJR0dFUl9OQU1FO1xudmFyIFBPUlRBTF9OQU1FID0gXCJEaWFsb2dQb3J0YWxcIjtcbnZhciBbUG9ydGFsUHJvdmlkZXIsIHVzZVBvcnRhbENvbnRleHRdID0gY3JlYXRlRGlhbG9nQ29udGV4dChQT1JUQUxfTkFNRSwge1xuICBmb3JjZU1vdW50OiB2b2lkIDBcbn0pO1xudmFyIERpYWxvZ1BvcnRhbCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIGZvcmNlTW91bnQsIGNoaWxkcmVuLCBjb250YWluZXIgfSA9IHByb3BzO1xuICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChQT1JUQUxfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFBvcnRhbFByb3ZpZGVyLCB7IHNjb3BlOiBfX3Njb3BlRGlhbG9nLCBmb3JjZU1vdW50LCBjaGlsZHJlbjogUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQpID0+IC8qIEBfX1BVUkVfXyAqLyBqc3goUHJlc2VuY2UsIHsgcHJlc2VudDogZm9yY2VNb3VudCB8fCBjb250ZXh0Lm9wZW4sIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4KFBvcnRhbFByaW1pdGl2ZSwgeyBhc0NoaWxkOiB0cnVlLCBjb250YWluZXIsIGNoaWxkcmVuOiBjaGlsZCB9KSB9KSkgfSk7XG59O1xuRGlhbG9nUG9ydGFsLmRpc3BsYXlOYW1lID0gUE9SVEFMX05BTUU7XG52YXIgT1ZFUkxBWV9OQU1FID0gXCJEaWFsb2dPdmVybGF5XCI7XG52YXIgRGlhbG9nT3ZlcmxheSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgcG9ydGFsQ29udGV4dCA9IHVzZVBvcnRhbENvbnRleHQoT1ZFUkxBWV9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCB7IGZvcmNlTW91bnQgPSBwb3J0YWxDb250ZXh0LmZvcmNlTW91bnQsIC4uLm92ZXJsYXlQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoT1ZFUkxBWV9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gY29udGV4dC5tb2RhbCA/IC8qIEBfX1BVUkVfXyAqLyBqc3goUHJlc2VuY2UsIHsgcHJlc2VudDogZm9yY2VNb3VudCB8fCBjb250ZXh0Lm9wZW4sIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4KERpYWxvZ092ZXJsYXlJbXBsLCB7IC4uLm92ZXJsYXlQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSkgfSkgOiBudWxsO1xuICB9XG4pO1xuRGlhbG9nT3ZlcmxheS5kaXNwbGF5TmFtZSA9IE9WRVJMQVlfTkFNRTtcbnZhciBTbG90ID0gY3JlYXRlU2xvdChcIkRpYWxvZ092ZXJsYXkuUmVtb3ZlU2Nyb2xsXCIpO1xudmFyIERpYWxvZ092ZXJsYXlJbXBsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLm92ZXJsYXlQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoT1ZFUkxBWV9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gTWFrZSBzdXJlIGBDb250ZW50YCBpcyBzY3JvbGxhYmxlIGV2ZW4gd2hlbiBpdCBkb2Vzbid0IGxpdmUgaW5zaWRlIGBSZW1vdmVTY3JvbGxgXG4gICAgICAvLyBpZS4gd2hlbiBgT3ZlcmxheWAgYW5kIGBDb250ZW50YCBhcmUgc2libGluZ3NcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goUmVtb3ZlU2Nyb2xsLCB7IGFzOiBTbG90LCBhbGxvd1BpbmNoWm9vbTogdHJ1ZSwgc2hhcmRzOiBbY29udGV4dC5jb250ZW50UmVmXSwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICAgIFByaW1pdGl2ZS5kaXYsXG4gICAgICAgIHtcbiAgICAgICAgICBcImRhdGEtc3RhdGVcIjogZ2V0U3RhdGUoY29udGV4dC5vcGVuKSxcbiAgICAgICAgICAuLi5vdmVybGF5UHJvcHMsXG4gICAgICAgICAgcmVmOiBmb3J3YXJkZWRSZWYsXG4gICAgICAgICAgc3R5bGU6IHsgcG9pbnRlckV2ZW50czogXCJhdXRvXCIsIC4uLm92ZXJsYXlQcm9wcy5zdHlsZSB9XG4gICAgICAgIH1cbiAgICAgICkgfSlcbiAgICApO1xuICB9XG4pO1xudmFyIENPTlRFTlRfTkFNRSA9IFwiRGlhbG9nQ29udGVudFwiO1xudmFyIERpYWxvZ0NvbnRlbnQgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHBvcnRhbENvbnRleHQgPSB1c2VQb3J0YWxDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgeyBmb3JjZU1vdW50ID0gcG9ydGFsQ29udGV4dC5mb3JjZU1vdW50LCAuLi5jb250ZW50UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJlc2VuY2UsIHsgcHJlc2VudDogZm9yY2VNb3VudCB8fCBjb250ZXh0Lm9wZW4sIGNoaWxkcmVuOiBjb250ZXh0Lm1vZGFsID8gLyogQF9fUFVSRV9fICovIGpzeChEaWFsb2dDb250ZW50TW9kYWwsIHsgLi4uY29udGVudFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSA6IC8qIEBfX1BVUkVfXyAqLyBqc3goRGlhbG9nQ29udGVudE5vbk1vZGFsLCB7IC4uLmNvbnRlbnRQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSkgfSk7XG4gIH1cbik7XG5EaWFsb2dDb250ZW50LmRpc3BsYXlOYW1lID0gQ09OVEVOVF9OQU1FO1xudmFyIERpYWxvZ0NvbnRlbnRNb2RhbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBjb250ZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIGNvbnRleHQuY29udGVudFJlZiwgY29udGVudFJlZik7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb250ZW50UmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoY29udGVudCkgcmV0dXJuIGhpZGVPdGhlcnMoY29udGVudCk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgRGlhbG9nQ29udGVudEltcGwsXG4gICAgICB7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICByZWY6IGNvbXBvc2VkUmVmcyxcbiAgICAgICAgdHJhcEZvY3VzOiBjb250ZXh0Lm9wZW4sXG4gICAgICAgIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50czogdHJ1ZSxcbiAgICAgICAgb25DbG9zZUF1dG9Gb2N1czogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25DbG9zZUF1dG9Gb2N1cywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjb250ZXh0LnRyaWdnZXJSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9uUG9pbnRlckRvd25PdXRzaWRlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vblBvaW50ZXJEb3duT3V0c2lkZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50O1xuICAgICAgICAgIGNvbnN0IGN0cmxMZWZ0Q2xpY2sgPSBvcmlnaW5hbEV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBvcmlnaW5hbEV2ZW50LmN0cmxLZXkgPT09IHRydWU7XG4gICAgICAgICAgY29uc3QgaXNSaWdodENsaWNrID0gb3JpZ2luYWxFdmVudC5idXR0b24gPT09IDIgfHwgY3RybExlZnRDbGljaztcbiAgICAgICAgICBpZiAoaXNSaWdodENsaWNrKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KSxcbiAgICAgICAgb25Gb2N1c091dHNpZGU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKFxuICAgICAgICAgIHByb3BzLm9uRm9jdXNPdXRzaWRlLFxuICAgICAgICAgIChldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICApXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbnZhciBEaWFsb2dDb250ZW50Tm9uTW9kYWwgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgaGFzSW50ZXJhY3RlZE91dHNpZGVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICAgIGNvbnN0IGhhc1BvaW50ZXJEb3duT3V0c2lkZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBEaWFsb2dDb250ZW50SW1wbCxcbiAgICAgIHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIHJlZjogZm9yd2FyZGVkUmVmLFxuICAgICAgICB0cmFwRm9jdXM6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHM6IGZhbHNlLFxuICAgICAgICBvbkNsb3NlQXV0b0ZvY3VzOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICBwcm9wcy5vbkNsb3NlQXV0b0ZvY3VzPy4oZXZlbnQpO1xuICAgICAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgaWYgKCFoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZi5jdXJyZW50KSBjb250ZXh0LnRyaWdnZXJSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBvbkludGVyYWN0T3V0c2lkZTogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgcHJvcHMub25JbnRlcmFjdE91dHNpZGU/LihldmVudCk7XG4gICAgICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICBoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudC50eXBlID09PSBcInBvaW50ZXJkb3duXCIpIHtcbiAgICAgICAgICAgICAgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0SXNUcmlnZ2VyID0gY29udGV4dC50cmlnZ2VyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgICAgICAgaWYgKHRhcmdldElzVHJpZ2dlcikgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAoZXZlbnQuZGV0YWlsLm9yaWdpbmFsRXZlbnQudHlwZSA9PT0gXCJmb2N1c2luXCIgJiYgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbnZhciBEaWFsb2dDb250ZW50SW1wbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCB0cmFwRm9jdXMsIG9uT3BlbkF1dG9Gb2N1cywgb25DbG9zZUF1dG9Gb2N1cywgLi4uY29udGVudFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDT05URU5UX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgY29udGVudFJlZik7XG4gICAgdXNlRm9jdXNHdWFyZHMoKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeHMoRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICAgIEZvY3VzU2NvcGUsXG4gICAgICAgIHtcbiAgICAgICAgICBhc0NoaWxkOiB0cnVlLFxuICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgdHJhcHBlZDogdHJhcEZvY3VzLFxuICAgICAgICAgIG9uTW91bnRBdXRvRm9jdXM6IG9uT3BlbkF1dG9Gb2N1cyxcbiAgICAgICAgICBvblVubW91bnRBdXRvRm9jdXM6IG9uQ2xvc2VBdXRvRm9jdXMsXG4gICAgICAgICAgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICAgICAgICBEaXNtaXNzYWJsZUxheWVyLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByb2xlOiBcImRpYWxvZ1wiLFxuICAgICAgICAgICAgICBpZDogY29udGV4dC5jb250ZW50SWQsXG4gICAgICAgICAgICAgIFwiYXJpYS1kZXNjcmliZWRieVwiOiBjb250ZXh0LmRlc2NyaXB0aW9uSWQsXG4gICAgICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IGNvbnRleHQudGl0bGVJZCxcbiAgICAgICAgICAgICAgXCJkYXRhLXN0YXRlXCI6IGdldFN0YXRlKGNvbnRleHQub3BlbiksXG4gICAgICAgICAgICAgIC4uLmNvbnRlbnRQcm9wcyxcbiAgICAgICAgICAgICAgcmVmOiBjb21wb3NlZFJlZnMsXG4gICAgICAgICAgICAgIG9uRGlzbWlzczogKCkgPT4gY29udGV4dC5vbk9wZW5DaGFuZ2UoZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyogQF9fUFVSRV9fICovIGpzeHMoRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtcbiAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeChUaXRsZVdhcm5pbmcsIHsgdGl0bGVJZDogY29udGV4dC50aXRsZUlkIH0pLFxuICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4KERlc2NyaXB0aW9uV2FybmluZywgeyBjb250ZW50UmVmLCBkZXNjcmlwdGlvbklkOiBjb250ZXh0LmRlc2NyaXB0aW9uSWQgfSlcbiAgICAgIF0gfSlcbiAgICBdIH0pO1xuICB9XG4pO1xudmFyIFRJVExFX05BTUUgPSBcIkRpYWxvZ1RpdGxlXCI7XG52YXIgRGlhbG9nVGl0bGUgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4udGl0bGVQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoVElUTEVfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmgyLCB7IGlkOiBjb250ZXh0LnRpdGxlSWQsIC4uLnRpdGxlUHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pO1xuICB9XG4pO1xuRGlhbG9nVGl0bGUuZGlzcGxheU5hbWUgPSBUSVRMRV9OQU1FO1xudmFyIERFU0NSSVBUSU9OX05BTUUgPSBcIkRpYWxvZ0Rlc2NyaXB0aW9uXCI7XG52YXIgRGlhbG9nRGVzY3JpcHRpb24gPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4uZGVzY3JpcHRpb25Qcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoREVTQ1JJUFRJT05fTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLnAsIHsgaWQ6IGNvbnRleHQuZGVzY3JpcHRpb25JZCwgLi4uZGVzY3JpcHRpb25Qcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSk7XG4gIH1cbik7XG5EaWFsb2dEZXNjcmlwdGlvbi5kaXNwbGF5TmFtZSA9IERFU0NSSVBUSU9OX05BTUU7XG52YXIgQ0xPU0VfTkFNRSA9IFwiRGlhbG9nQ2xvc2VcIjtcbnZhciBEaWFsb2dDbG9zZSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi5jbG9zZVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDTE9TRV9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIFByaW1pdGl2ZS5idXR0b24sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgIC4uLmNsb3NlUHJvcHMsXG4gICAgICAgIHJlZjogZm9yd2FyZGVkUmVmLFxuICAgICAgICBvbkNsaWNrOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkNsaWNrLCAoKSA9PiBjb250ZXh0Lm9uT3BlbkNoYW5nZShmYWxzZSkpXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbkRpYWxvZ0Nsb3NlLmRpc3BsYXlOYW1lID0gQ0xPU0VfTkFNRTtcbmZ1bmN0aW9uIGdldFN0YXRlKG9wZW4pIHtcbiAgcmV0dXJuIG9wZW4gPyBcIm9wZW5cIiA6IFwiY2xvc2VkXCI7XG59XG52YXIgVElUTEVfV0FSTklOR19OQU1FID0gXCJEaWFsb2dUaXRsZVdhcm5pbmdcIjtcbnZhciBbV2FybmluZ1Byb3ZpZGVyLCB1c2VXYXJuaW5nQ29udGV4dF0gPSBjcmVhdGVDb250ZXh0KFRJVExFX1dBUk5JTkdfTkFNRSwge1xuICBjb250ZW50TmFtZTogQ09OVEVOVF9OQU1FLFxuICB0aXRsZU5hbWU6IFRJVExFX05BTUUsXG4gIGRvY3NTbHVnOiBcImRpYWxvZ1wiXG59KTtcbnZhciBUaXRsZVdhcm5pbmcgPSAoeyB0aXRsZUlkIH0pID0+IHtcbiAgY29uc3QgdGl0bGVXYXJuaW5nQ29udGV4dCA9IHVzZVdhcm5pbmdDb250ZXh0KFRJVExFX1dBUk5JTkdfTkFNRSk7XG4gIGNvbnN0IE1FU1NBR0UgPSBgXFxgJHt0aXRsZVdhcm5pbmdDb250ZXh0LmNvbnRlbnROYW1lfVxcYCByZXF1aXJlcyBhIFxcYCR7dGl0bGVXYXJuaW5nQ29udGV4dC50aXRsZU5hbWV9XFxgIGZvciB0aGUgY29tcG9uZW50IHRvIGJlIGFjY2Vzc2libGUgZm9yIHNjcmVlbiByZWFkZXIgdXNlcnMuXG5cbklmIHlvdSB3YW50IHRvIGhpZGUgdGhlIFxcYCR7dGl0bGVXYXJuaW5nQ29udGV4dC50aXRsZU5hbWV9XFxgLCB5b3UgY2FuIHdyYXAgaXQgd2l0aCBvdXIgVmlzdWFsbHlIaWRkZW4gY29tcG9uZW50LlxuXG5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIGh0dHBzOi8vcmFkaXgtdWkuY29tL3ByaW1pdGl2ZXMvZG9jcy9jb21wb25lbnRzLyR7dGl0bGVXYXJuaW5nQ29udGV4dC5kb2NzU2x1Z31gO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0aXRsZUlkKSB7XG4gICAgICBjb25zdCBoYXNUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRpdGxlSWQpO1xuICAgICAgaWYgKCFoYXNUaXRsZSkgY29uc29sZS5lcnJvcihNRVNTQUdFKTtcbiAgICB9XG4gIH0sIFtNRVNTQUdFLCB0aXRsZUlkXSk7XG4gIHJldHVybiBudWxsO1xufTtcbnZhciBERVNDUklQVElPTl9XQVJOSU5HX05BTUUgPSBcIkRpYWxvZ0Rlc2NyaXB0aW9uV2FybmluZ1wiO1xudmFyIERlc2NyaXB0aW9uV2FybmluZyA9ICh7IGNvbnRlbnRSZWYsIGRlc2NyaXB0aW9uSWQgfSkgPT4ge1xuICBjb25zdCBkZXNjcmlwdGlvbldhcm5pbmdDb250ZXh0ID0gdXNlV2FybmluZ0NvbnRleHQoREVTQ1JJUFRJT05fV0FSTklOR19OQU1FKTtcbiAgY29uc3QgTUVTU0FHRSA9IGBXYXJuaW5nOiBNaXNzaW5nIFxcYERlc2NyaXB0aW9uXFxgIG9yIFxcYGFyaWEtZGVzY3JpYmVkYnk9e3VuZGVmaW5lZH1cXGAgZm9yIHske2Rlc2NyaXB0aW9uV2FybmluZ0NvbnRleHQuY29udGVudE5hbWV9fS5gO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGRlc2NyaWJlZEJ5SWQgPSBjb250ZW50UmVmLmN1cnJlbnQ/LmdldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIik7XG4gICAgaWYgKGRlc2NyaXB0aW9uSWQgJiYgZGVzY3JpYmVkQnlJZCkge1xuICAgICAgY29uc3QgaGFzRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZXNjcmlwdGlvbklkKTtcbiAgICAgIGlmICghaGFzRGVzY3JpcHRpb24pIGNvbnNvbGUud2FybihNRVNTQUdFKTtcbiAgICB9XG4gIH0sIFtNRVNTQUdFLCBjb250ZW50UmVmLCBkZXNjcmlwdGlvbklkXSk7XG4gIHJldHVybiBudWxsO1xufTtcbnZhciBSb290ID0gRGlhbG9nO1xudmFyIFRyaWdnZXIgPSBEaWFsb2dUcmlnZ2VyO1xudmFyIFBvcnRhbCA9IERpYWxvZ1BvcnRhbDtcbnZhciBPdmVybGF5ID0gRGlhbG9nT3ZlcmxheTtcbnZhciBDb250ZW50ID0gRGlhbG9nQ29udGVudDtcbnZhciBUaXRsZSA9IERpYWxvZ1RpdGxlO1xudmFyIERlc2NyaXB0aW9uID0gRGlhbG9nRGVzY3JpcHRpb247XG52YXIgQ2xvc2UgPSBEaWFsb2dDbG9zZTtcbmV4cG9ydCB7XG4gIENsb3NlLFxuICBDb250ZW50LFxuICBEZXNjcmlwdGlvbixcbiAgRGlhbG9nLFxuICBEaWFsb2dDbG9zZSxcbiAgRGlhbG9nQ29udGVudCxcbiAgRGlhbG9nRGVzY3JpcHRpb24sXG4gIERpYWxvZ092ZXJsYXksXG4gIERpYWxvZ1BvcnRhbCxcbiAgRGlhbG9nVGl0bGUsXG4gIERpYWxvZ1RyaWdnZXIsXG4gIE92ZXJsYXksXG4gIFBvcnRhbCxcbiAgUm9vdCxcbiAgVGl0bGUsXG4gIFRyaWdnZXIsXG4gIFdhcm5pbmdQcm92aWRlcixcbiAgY3JlYXRlRGlhbG9nU2NvcGVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvc2xvdC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZVJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgRnJhZ21lbnQgYXMgRnJhZ21lbnQyLCBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90KG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSk7XG4gIGNvbnN0IFNsb3QyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2hpbGRyZW5BcnJheSA9IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pO1xuICAgIGNvbnN0IHNsb3R0YWJsZSA9IGNoaWxkcmVuQXJyYXkuZmluZChpc1Nsb3R0YWJsZSk7XG4gICAgaWYgKHNsb3R0YWJsZSkge1xuICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHNsb3R0YWJsZS5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gY2hpbGRyZW5BcnJheS5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZCA9PT0gc2xvdHRhYmxlKSB7XG4gICAgICAgICAgaWYgKFJlYWN0LkNoaWxkcmVuLmNvdW50KG5ld0VsZW1lbnQpID4gMSkgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KG5ld0VsZW1lbnQpID8gbmV3RWxlbWVudC5wcm9wcy5jaGlsZHJlbiA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbjogUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBSZWFjdC5jbG9uZUVsZW1lbnQobmV3RWxlbWVudCwgdm9pZCAwLCBuZXdDaGlsZHJlbikgOiBudWxsIH0pO1xuICAgIH1cbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChTbG90Q2xvbmUsIHsgLi4uc2xvdFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiwgY2hpbGRyZW4gfSk7XG4gIH0pO1xuICBTbG90Mi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdGA7XG4gIHJldHVybiBTbG90Mjtcbn1cbnZhciBTbG90ID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3QoXCJTbG90XCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3RDbG9uZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdENsb25lID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgICAgY29uc3QgY2hpbGRyZW5SZWYgPSBnZXRFbGVtZW50UmVmKGNoaWxkcmVuKTtcbiAgICAgIGNvbnN0IHByb3BzMiA9IG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZHJlbi5wcm9wcyk7XG4gICAgICBpZiAoY2hpbGRyZW4udHlwZSAhPT0gUmVhY3QuRnJhZ21lbnQpIHtcbiAgICAgICAgcHJvcHMyLnJlZiA9IGZvcndhcmRlZFJlZiA/IGNvbXBvc2VSZWZzKGZvcndhcmRlZFJlZiwgY2hpbGRyZW5SZWYpIDogY2hpbGRyZW5SZWY7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkcmVuLCBwcm9wczIpO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMSA/IFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCkgOiBudWxsO1xuICB9KTtcbiAgU2xvdENsb25lLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90Q2xvbmVgO1xuICByZXR1cm4gU2xvdENsb25lO1xufVxudmFyIFNMT1RUQUJMRV9JREVOVElGSUVSID0gU3ltYm9sKFwicmFkaXguc2xvdHRhYmxlXCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3R0YWJsZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdHRhYmxlMiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChGcmFnbWVudDIsIHsgY2hpbGRyZW4gfSk7XG4gIH07XG4gIFNsb3R0YWJsZTIuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3R0YWJsZWA7XG4gIFNsb3R0YWJsZTIuX19yYWRpeElkID0gU0xPVFRBQkxFX0lERU5USUZJRVI7XG4gIHJldHVybiBTbG90dGFibGUyO1xufVxudmFyIFNsb3R0YWJsZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90dGFibGUoXCJTbG90dGFibGVcIik7XG5mdW5jdGlvbiBpc1Nsb3R0YWJsZShjaGlsZCkge1xuICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpICYmIHR5cGVvZiBjaGlsZC50eXBlID09PSBcImZ1bmN0aW9uXCIgJiYgXCJfX3JhZGl4SWRcIiBpbiBjaGlsZC50eXBlICYmIGNoaWxkLnR5cGUuX19yYWRpeElkID09PSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbn1cbmZ1bmN0aW9uIG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZFByb3BzKSB7XG4gIGNvbnN0IG92ZXJyaWRlUHJvcHMgPSB7IC4uLmNoaWxkUHJvcHMgfTtcbiAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGlsZFByb3BzKSB7XG4gICAgY29uc3Qgc2xvdFByb3BWYWx1ZSA9IHNsb3RQcm9wc1twcm9wTmFtZV07XG4gICAgY29uc3QgY2hpbGRQcm9wVmFsdWUgPSBjaGlsZFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBpc0hhbmRsZXIgPSAvXm9uW0EtWl0vLnRlc3QocHJvcE5hbWUpO1xuICAgIGlmIChpc0hhbmRsZXIpIHtcbiAgICAgIGlmIChzbG90UHJvcFZhbHVlICYmIGNoaWxkUHJvcFZhbHVlKSB7XG4gICAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBjaGlsZFByb3BWYWx1ZSguLi5hcmdzKTtcbiAgICAgICAgICBzbG90UHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNsb3RQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBzbG90UHJvcFZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSB7IC4uLnNsb3RQcm9wVmFsdWUsIC4uLmNoaWxkUHJvcFZhbHVlIH07XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJjbGFzc05hbWVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBbc2xvdFByb3BWYWx1ZSwgY2hpbGRQcm9wVmFsdWVdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgLi4uc2xvdFByb3BzLCAuLi5vdmVycmlkZVByb3BzIH07XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50UmVmKGVsZW1lbnQpIHtcbiAgbGV0IGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudC5wcm9wcywgXCJyZWZcIik/LmdldDtcbiAgbGV0IG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucmVmO1xuICB9XG4gIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudCwgXCJyZWZcIik/LmdldDtcbiAgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWY7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmIHx8IGVsZW1lbnQucmVmO1xufVxuZXhwb3J0IHtcbiAgU2xvdCBhcyBSb290LFxuICBTbG90LFxuICBTbG90dGFibGUsXG4gIGNyZWF0ZVNsb3QsXG4gIGNyZWF0ZVNsb3R0YWJsZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZGlzbWlzc2FibGUtbGF5ZXIudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNvbXBvc2VFdmVudEhhbmRsZXJzIH0gZnJvbSBcIkByYWRpeC11aS9wcmltaXRpdmVcIjtcbmltcG9ydCB7IFByaW1pdGl2ZSwgZGlzcGF0Y2hEaXNjcmV0ZUN1c3RvbUV2ZW50IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWNhbGxiYWNrLXJlZlwiO1xuaW1wb3J0IHsgdXNlRXNjYXBlS2V5ZG93biB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWVzY2FwZS1rZXlkb3duXCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBESVNNSVNTQUJMRV9MQVlFUl9OQU1FID0gXCJEaXNtaXNzYWJsZUxheWVyXCI7XG52YXIgQ09OVEVYVF9VUERBVEUgPSBcImRpc21pc3NhYmxlTGF5ZXIudXBkYXRlXCI7XG52YXIgUE9JTlRFUl9ET1dOX09VVFNJREUgPSBcImRpc21pc3NhYmxlTGF5ZXIucG9pbnRlckRvd25PdXRzaWRlXCI7XG52YXIgRk9DVVNfT1VUU0lERSA9IFwiZGlzbWlzc2FibGVMYXllci5mb2N1c091dHNpZGVcIjtcbnZhciBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzO1xudmFyIERpc21pc3NhYmxlTGF5ZXJDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCh7XG4gIGxheWVyczogLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKSxcbiAgbGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQ6IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCksXG4gIGJyYW5jaGVzOiAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpXG59KTtcbnZhciBEaXNtaXNzYWJsZUxheWVyID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMgPSBmYWxzZSxcbiAgICAgIG9uRXNjYXBlS2V5RG93bixcbiAgICAgIG9uUG9pbnRlckRvd25PdXRzaWRlLFxuICAgICAgb25Gb2N1c091dHNpZGUsXG4gICAgICBvbkludGVyYWN0T3V0c2lkZSxcbiAgICAgIG9uRGlzbWlzcyxcbiAgICAgIC4uLmxheWVyUHJvcHNcbiAgICB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoRGlzbWlzc2FibGVMYXllckNvbnRleHQpO1xuICAgIGNvbnN0IFtub2RlLCBzZXROb2RlXSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IG93bmVyRG9jdW1lbnQgPSBub2RlPy5vd25lckRvY3VtZW50ID8/IGdsb2JhbFRoaXM/LmRvY3VtZW50O1xuICAgIGNvbnN0IFssIGZvcmNlXSA9IFJlYWN0LnVzZVN0YXRlKHt9KTtcbiAgICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCAobm9kZTIpID0+IHNldE5vZGUobm9kZTIpKTtcbiAgICBjb25zdCBsYXllcnMgPSBBcnJheS5mcm9tKGNvbnRleHQubGF5ZXJzKTtcbiAgICBjb25zdCBbaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRdID0gWy4uLmNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRdLnNsaWNlKC0xKTtcbiAgICBjb25zdCBoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZEluZGV4ID0gbGF5ZXJzLmluZGV4T2YoaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQpO1xuICAgIGNvbnN0IGluZGV4ID0gbm9kZSA/IGxheWVycy5pbmRleE9mKG5vZGUpIDogLTE7XG4gICAgY29uc3QgaXNCb2R5UG9pbnRlckV2ZW50c0Rpc2FibGVkID0gY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5zaXplID4gMDtcbiAgICBjb25zdCBpc1BvaW50ZXJFdmVudHNFbmFibGVkID0gaW5kZXggPj0gaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRJbmRleDtcbiAgICBjb25zdCBwb2ludGVyRG93bk91dHNpZGUgPSB1c2VQb2ludGVyRG93bk91dHNpZGUoKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICBjb25zdCBpc1BvaW50ZXJEb3duT25CcmFuY2ggPSBbLi4uY29udGV4dC5icmFuY2hlc10uc29tZSgoYnJhbmNoKSA9PiBicmFuY2guY29udGFpbnModGFyZ2V0KSk7XG4gICAgICBpZiAoIWlzUG9pbnRlckV2ZW50c0VuYWJsZWQgfHwgaXNQb2ludGVyRG93bk9uQnJhbmNoKSByZXR1cm47XG4gICAgICBvblBvaW50ZXJEb3duT3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgIG9uSW50ZXJhY3RPdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSBvbkRpc21pc3M/LigpO1xuICAgIH0sIG93bmVyRG9jdW1lbnQpO1xuICAgIGNvbnN0IGZvY3VzT3V0c2lkZSA9IHVzZUZvY3VzT3V0c2lkZSgoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGNvbnN0IGlzRm9jdXNJbkJyYW5jaCA9IFsuLi5jb250ZXh0LmJyYW5jaGVzXS5zb21lKChicmFuY2gpID0+IGJyYW5jaC5jb250YWlucyh0YXJnZXQpKTtcbiAgICAgIGlmIChpc0ZvY3VzSW5CcmFuY2gpIHJldHVybjtcbiAgICAgIG9uRm9jdXNPdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgb25JbnRlcmFjdE91dHNpZGU/LihldmVudCk7XG4gICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIG9uRGlzbWlzcz8uKCk7XG4gICAgfSwgb3duZXJEb2N1bWVudCk7XG4gICAgdXNlRXNjYXBlS2V5ZG93bigoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGlzSGlnaGVzdExheWVyID0gaW5kZXggPT09IGNvbnRleHQubGF5ZXJzLnNpemUgLSAxO1xuICAgICAgaWYgKCFpc0hpZ2hlc3RMYXllcikgcmV0dXJuO1xuICAgICAgb25Fc2NhcGVLZXlEb3duPy4oZXZlbnQpO1xuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkICYmIG9uRGlzbWlzcykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvbkRpc21pc3MoKTtcbiAgICAgIH1cbiAgICB9LCBvd25lckRvY3VtZW50KTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgaWYgKCFub2RlKSByZXR1cm47XG4gICAgICBpZiAoZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzKSB7XG4gICAgICAgIGlmIChjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLnNpemUgPT09IDApIHtcbiAgICAgICAgICBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzID0gb3duZXJEb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHM7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLmFkZChub2RlKTtcbiAgICAgIH1cbiAgICAgIGNvbnRleHQubGF5ZXJzLmFkZChub2RlKTtcbiAgICAgIGRpc3BhdGNoVXBkYXRlKCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzICYmIGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuc2l6ZSA9PT0gMSkge1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzID0gb3JpZ2luYWxCb2R5UG9pbnRlckV2ZW50cztcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LCBbbm9kZSwgb3duZXJEb2N1bWVudCwgZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzLCBjb250ZXh0XSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgICAgICBjb250ZXh0LmxheWVycy5kZWxldGUobm9kZSk7XG4gICAgICAgIGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuZGVsZXRlKG5vZGUpO1xuICAgICAgICBkaXNwYXRjaFVwZGF0ZSgpO1xuICAgICAgfTtcbiAgICB9LCBbbm9kZSwgY29udGV4dF0pO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCBoYW5kbGVVcGRhdGUgPSAoKSA9PiBmb3JjZSh7fSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKENPTlRFWFRfVVBEQVRFLCBoYW5kbGVVcGRhdGUpO1xuICAgICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoQ09OVEVYVF9VUERBVEUsIGhhbmRsZVVwZGF0ZSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgUHJpbWl0aXZlLmRpdixcbiAgICAgIHtcbiAgICAgICAgLi4ubGF5ZXJQcm9wcyxcbiAgICAgICAgcmVmOiBjb21wb3NlZFJlZnMsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgcG9pbnRlckV2ZW50czogaXNCb2R5UG9pbnRlckV2ZW50c0Rpc2FibGVkID8gaXNQb2ludGVyRXZlbnRzRW5hYmxlZCA/IFwiYXV0b1wiIDogXCJub25lXCIgOiB2b2lkIDAsXG4gICAgICAgICAgLi4ucHJvcHMuc3R5bGVcbiAgICAgICAgfSxcbiAgICAgICAgb25Gb2N1c0NhcHR1cmU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uRm9jdXNDYXB0dXJlLCBmb2N1c091dHNpZGUub25Gb2N1c0NhcHR1cmUpLFxuICAgICAgICBvbkJsdXJDYXB0dXJlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkJsdXJDYXB0dXJlLCBmb2N1c091dHNpZGUub25CbHVyQ2FwdHVyZSksXG4gICAgICAgIG9uUG9pbnRlckRvd25DYXB0dXJlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhcbiAgICAgICAgICBwcm9wcy5vblBvaW50ZXJEb3duQ2FwdHVyZSxcbiAgICAgICAgICBwb2ludGVyRG93bk91dHNpZGUub25Qb2ludGVyRG93bkNhcHR1cmVcbiAgICAgICAgKVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG5EaXNtaXNzYWJsZUxheWVyLmRpc3BsYXlOYW1lID0gRElTTUlTU0FCTEVfTEFZRVJfTkFNRTtcbnZhciBCUkFOQ0hfTkFNRSA9IFwiRGlzbWlzc2FibGVMYXllckJyYW5jaFwiO1xudmFyIERpc21pc3NhYmxlTGF5ZXJCcmFuY2ggPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KERpc21pc3NhYmxlTGF5ZXJDb250ZXh0KTtcbiAgY29uc3QgcmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCByZWYpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSByZWYuY3VycmVudDtcbiAgICBpZiAobm9kZSkge1xuICAgICAgY29udGV4dC5icmFuY2hlcy5hZGQobm9kZSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb250ZXh0LmJyYW5jaGVzLmRlbGV0ZShub2RlKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbY29udGV4dC5icmFuY2hlc10pO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuZGl2LCB7IC4uLnByb3BzLCByZWY6IGNvbXBvc2VkUmVmcyB9KTtcbn0pO1xuRGlzbWlzc2FibGVMYXllckJyYW5jaC5kaXNwbGF5TmFtZSA9IEJSQU5DSF9OQU1FO1xuZnVuY3Rpb24gdXNlUG9pbnRlckRvd25PdXRzaWRlKG9uUG9pbnRlckRvd25PdXRzaWRlLCBvd25lckRvY3VtZW50ID0gZ2xvYmFsVGhpcz8uZG9jdW1lbnQpIHtcbiAgY29uc3QgaGFuZGxlUG9pbnRlckRvd25PdXRzaWRlID0gdXNlQ2FsbGJhY2tSZWYob25Qb2ludGVyRG93bk91dHNpZGUpO1xuICBjb25zdCBpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBjb25zdCBoYW5kbGVDbGlja1JlZiA9IFJlYWN0LnVzZVJlZigoKSA9PiB7XG4gIH0pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmICFpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCkge1xuICAgICAgICBsZXQgaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBoYW5kbGVBbmREaXNwYXRjaEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgUE9JTlRFUl9ET1dOX09VVFNJREUsXG4gICAgICAgICAgICBoYW5kbGVQb2ludGVyRG93bk91dHNpZGUsXG4gICAgICAgICAgICBldmVudERldGFpbCxcbiAgICAgICAgICAgIHsgZGlzY3JldGU6IHRydWUgfVxuICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50ID0gaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDI7XG4gICAgICAgIGNvbnN0IGV2ZW50RGV0YWlsID0geyBvcmlnaW5hbEV2ZW50OiBldmVudCB9O1xuICAgICAgICBpZiAoZXZlbnQucG9pbnRlclR5cGUgPT09IFwidG91Y2hcIikge1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQpO1xuICAgICAgICAgIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQgPSBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MjtcbiAgICAgICAgICBvd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja1JlZi5jdXJyZW50LCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCk7XG4gICAgICB9XG4gICAgICBpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgIH07XG4gICAgY29uc3QgdGltZXJJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQpO1xuICAgIH07XG4gIH0sIFtvd25lckRvY3VtZW50LCBoYW5kbGVQb2ludGVyRG93bk91dHNpZGVdKTtcbiAgcmV0dXJuIHtcbiAgICAvLyBlbnN1cmVzIHdlIGNoZWNrIFJlYWN0IGNvbXBvbmVudCB0cmVlIChub3QganVzdCBET00gdHJlZSlcbiAgICBvblBvaW50ZXJEb3duQ2FwdHVyZTogKCkgPT4gaXNQb2ludGVySW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQgPSB0cnVlXG4gIH07XG59XG5mdW5jdGlvbiB1c2VGb2N1c091dHNpZGUob25Gb2N1c091dHNpZGUsIG93bmVyRG9jdW1lbnQgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCkge1xuICBjb25zdCBoYW5kbGVGb2N1c091dHNpZGUgPSB1c2VDYWxsYmFja1JlZihvbkZvY3VzT3V0c2lkZSk7XG4gIGNvbnN0IGlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmICFpc0ZvY3VzSW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnREZXRhaWwgPSB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH07XG4gICAgICAgIGhhbmRsZUFuZERpc3BhdGNoQ3VzdG9tRXZlbnQoRk9DVVNfT1VUU0lERSwgaGFuZGxlRm9jdXNPdXRzaWRlLCBldmVudERldGFpbCwge1xuICAgICAgICAgIGRpc2NyZXRlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXMpO1xuICAgIHJldHVybiAoKSA9PiBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzKTtcbiAgfSwgW293bmVyRG9jdW1lbnQsIGhhbmRsZUZvY3VzT3V0c2lkZV0pO1xuICByZXR1cm4ge1xuICAgIG9uRm9jdXNDYXB0dXJlOiAoKSA9PiBpc0ZvY3VzSW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQgPSB0cnVlLFxuICAgIG9uQmx1ckNhcHR1cmU6ICgpID0+IGlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IGZhbHNlXG4gIH07XG59XG5mdW5jdGlvbiBkaXNwYXRjaFVwZGF0ZSgpIHtcbiAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoQ09OVEVYVF9VUERBVEUpO1xuICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cbmZ1bmN0aW9uIGhhbmRsZUFuZERpc3BhdGNoQ3VzdG9tRXZlbnQobmFtZSwgaGFuZGxlciwgZGV0YWlsLCB7IGRpc2NyZXRlIH0pIHtcbiAgY29uc3QgdGFyZ2V0ID0gZGV0YWlsLm9yaWdpbmFsRXZlbnQudGFyZ2V0O1xuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiB0cnVlLCBkZXRhaWwgfSk7XG4gIGlmIChoYW5kbGVyKSB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gIGlmIChkaXNjcmV0ZSkge1xuICAgIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudCh0YXJnZXQsIGV2ZW50KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cbn1cbnZhciBSb290ID0gRGlzbWlzc2FibGVMYXllcjtcbnZhciBCcmFuY2ggPSBEaXNtaXNzYWJsZUxheWVyQnJhbmNoO1xuZXhwb3J0IHtcbiAgQnJhbmNoLFxuICBEaXNtaXNzYWJsZUxheWVyLFxuICBEaXNtaXNzYWJsZUxheWVyQnJhbmNoLFxuICBSb290XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9mb2N1cy1ndWFyZHMudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbnZhciBjb3VudCA9IDA7XG5mdW5jdGlvbiBGb2N1c0d1YXJkcyhwcm9wcykge1xuICB1c2VGb2N1c0d1YXJkcygpO1xuICByZXR1cm4gcHJvcHMuY2hpbGRyZW47XG59XG5mdW5jdGlvbiB1c2VGb2N1c0d1YXJkcygpIHtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlZGdlR3VhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXJhZGl4LWZvY3VzLWd1YXJkXVwiKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgZWRnZUd1YXJkc1swXSA/PyBjcmVhdGVGb2N1c0d1YXJkKCkpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVkZ2VHdWFyZHNbMV0gPz8gY3JlYXRlRm9jdXNHdWFyZCgpKTtcbiAgICBjb3VudCsrO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoY291bnQgPT09IDEpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXJhZGl4LWZvY3VzLWd1YXJkXVwiKS5mb3JFYWNoKChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcbiAgICAgIH1cbiAgICAgIGNvdW50LS07XG4gICAgfTtcbiAgfSwgW10pO1xufVxuZnVuY3Rpb24gY3JlYXRlRm9jdXNHdWFyZCgpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtcmFkaXgtZm9jdXMtZ3VhcmRcIiwgXCJcIik7XG4gIGVsZW1lbnQudGFiSW5kZXggPSAwO1xuICBlbGVtZW50LnN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIjtcbiAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydCB7XG4gIEZvY3VzR3VhcmRzLFxuICBGb2N1c0d1YXJkcyBhcyBSb290LFxuICB1c2VGb2N1c0d1YXJkc1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZm9jdXMtc2NvcGUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWZcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIEFVVE9GT0NVU19PTl9NT1VOVCA9IFwiZm9jdXNTY29wZS5hdXRvRm9jdXNPbk1vdW50XCI7XG52YXIgQVVUT0ZPQ1VTX09OX1VOTU9VTlQgPSBcImZvY3VzU2NvcGUuYXV0b0ZvY3VzT25Vbm1vdW50XCI7XG52YXIgRVZFTlRfT1BUSU9OUyA9IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IHRydWUgfTtcbnZhciBGT0NVU19TQ09QRV9OQU1FID0gXCJGb2N1c1Njb3BlXCI7XG52YXIgRm9jdXNTY29wZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgY29uc3Qge1xuICAgIGxvb3AgPSBmYWxzZSxcbiAgICB0cmFwcGVkID0gZmFsc2UsXG4gICAgb25Nb3VudEF1dG9Gb2N1czogb25Nb3VudEF1dG9Gb2N1c1Byb3AsXG4gICAgb25Vbm1vdW50QXV0b0ZvY3VzOiBvblVubW91bnRBdXRvRm9jdXNQcm9wLFxuICAgIC4uLnNjb3BlUHJvcHNcbiAgfSA9IHByb3BzO1xuICBjb25zdCBbY29udGFpbmVyLCBzZXRDb250YWluZXJdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IG9uTW91bnRBdXRvRm9jdXMgPSB1c2VDYWxsYmFja1JlZihvbk1vdW50QXV0b0ZvY3VzUHJvcCk7XG4gIGNvbnN0IG9uVW5tb3VudEF1dG9Gb2N1cyA9IHVzZUNhbGxiYWNrUmVmKG9uVW5tb3VudEF1dG9Gb2N1c1Byb3ApO1xuICBjb25zdCBsYXN0Rm9jdXNlZEVsZW1lbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIChub2RlKSA9PiBzZXRDb250YWluZXIobm9kZSkpO1xuICBjb25zdCBmb2N1c1Njb3BlID0gUmVhY3QudXNlUmVmKHtcbiAgICBwYXVzZWQ6IGZhbHNlLFxuICAgIHBhdXNlKCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgcmVzdW1lKCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB9XG4gIH0pLmN1cnJlbnQ7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRyYXBwZWQpIHtcbiAgICAgIGxldCBoYW5kbGVGb2N1c0luMiA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChmb2N1c1Njb3BlLnBhdXNlZCB8fCAhY29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgbGFzdEZvY3VzZWRFbGVtZW50UmVmLmN1cnJlbnQgPSB0YXJnZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9jdXMobGFzdEZvY3VzZWRFbGVtZW50UmVmLmN1cnJlbnQsIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9LCBoYW5kbGVGb2N1c091dDIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZm9jdXNTY29wZS5wYXVzZWQgfHwgIWNvbnRhaW5lcikgcmV0dXJuO1xuICAgICAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0gZXZlbnQucmVsYXRlZFRhcmdldDtcbiAgICAgICAgaWYgKHJlbGF0ZWRUYXJnZXQgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKCFjb250YWluZXIuY29udGFpbnMocmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICBmb2N1cyhsYXN0Rm9jdXNlZEVsZW1lbnRSZWYuY3VycmVudCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGhhbmRsZU11dGF0aW9uczIgPSBmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgIT09IGRvY3VtZW50LmJvZHkpIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgICBpZiAobXV0YXRpb24ucmVtb3ZlZE5vZGVzLmxlbmd0aCA+IDApIGZvY3VzKGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgaGFuZGxlRm9jdXNJbiA9IGhhbmRsZUZvY3VzSW4yLCBoYW5kbGVGb2N1c091dCA9IGhhbmRsZUZvY3VzT3V0MiwgaGFuZGxlTXV0YXRpb25zID0gaGFuZGxlTXV0YXRpb25zMjtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzSW4yKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBoYW5kbGVGb2N1c091dDIpO1xuICAgICAgY29uc3QgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGhhbmRsZU11dGF0aW9uczIpO1xuICAgICAgaWYgKGNvbnRhaW5lcikgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGNvbnRhaW5lciwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBoYW5kbGVGb2N1c0luMik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBoYW5kbGVGb2N1c091dDIpO1xuICAgICAgICBtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbdHJhcHBlZCwgY29udGFpbmVyLCBmb2N1c1Njb3BlLnBhdXNlZF0pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgIGZvY3VzU2NvcGVzU3RhY2suYWRkKGZvY3VzU2NvcGUpO1xuICAgICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGhhc0ZvY3VzZWRDYW5kaWRhdGUgPSBjb250YWluZXIuY29udGFpbnMocHJldmlvdXNseUZvY3VzZWRFbGVtZW50KTtcbiAgICAgIGlmICghaGFzRm9jdXNlZENhbmRpZGF0ZSkge1xuICAgICAgICBjb25zdCBtb3VudEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KEFVVE9GT0NVU19PTl9NT1VOVCwgRVZFTlRfT1BUSU9OUyk7XG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKEFVVE9GT0NVU19PTl9NT1VOVCwgb25Nb3VudEF1dG9Gb2N1cyk7XG4gICAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG1vdW50RXZlbnQpO1xuICAgICAgICBpZiAoIW1vdW50RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgIGZvY3VzRmlyc3QocmVtb3ZlTGlua3MoZ2V0VGFiYmFibGVDYW5kaWRhdGVzKGNvbnRhaW5lcikpLCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gcHJldmlvdXNseUZvY3VzZWRFbGVtZW50KSB7XG4gICAgICAgICAgICBmb2N1cyhjb250YWluZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX01PVU5ULCBvbk1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdW5tb3VudEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KEFVVE9GT0NVU19PTl9VTk1PVU5ULCBFVkVOVF9PUFRJT05TKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fVU5NT1VOVCwgb25Vbm1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgICBjb250YWluZXIuZGlzcGF0Y2hFdmVudCh1bm1vdW50RXZlbnQpO1xuICAgICAgICAgIGlmICghdW5tb3VudEV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIGZvY3VzKHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA/PyBkb2N1bWVudC5ib2R5LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX1VOTU9VTlQsIG9uVW5tb3VudEF1dG9Gb2N1cyk7XG4gICAgICAgICAgZm9jdXNTY29wZXNTdGFjay5yZW1vdmUoZm9jdXNTY29wZSk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFtjb250YWluZXIsIG9uTW91bnRBdXRvRm9jdXMsIG9uVW5tb3VudEF1dG9Gb2N1cywgZm9jdXNTY29wZV0pO1xuICBjb25zdCBoYW5kbGVLZXlEb3duID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWxvb3AgJiYgIXRyYXBwZWQpIHJldHVybjtcbiAgICAgIGlmIChmb2N1c1Njb3BlLnBhdXNlZCkgcmV0dXJuO1xuICAgICAgY29uc3QgaXNUYWJLZXkgPSBldmVudC5rZXkgPT09IFwiVGFiXCIgJiYgIWV2ZW50LmFsdEtleSAmJiAhZXZlbnQuY3RybEtleSAmJiAhZXZlbnQubWV0YUtleTtcbiAgICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGlmIChpc1RhYktleSAmJiBmb2N1c2VkRWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIyID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgY29uc3QgW2ZpcnN0LCBsYXN0XSA9IGdldFRhYmJhYmxlRWRnZXMoY29udGFpbmVyMik7XG4gICAgICAgIGNvbnN0IGhhc1RhYmJhYmxlRWxlbWVudHNJbnNpZGUgPSBmaXJzdCAmJiBsYXN0O1xuICAgICAgICBpZiAoIWhhc1RhYmJhYmxlRWxlbWVudHNJbnNpZGUpIHtcbiAgICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGNvbnRhaW5lcjIpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkRWxlbWVudCA9PT0gbGFzdCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChsb29wKSBmb2N1cyhmaXJzdCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkRWxlbWVudCA9PT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAobG9vcCkgZm9jdXMobGFzdCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbbG9vcCwgdHJhcHBlZCwgZm9jdXNTY29wZS5wYXVzZWRdXG4gICk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5kaXYsIHsgdGFiSW5kZXg6IC0xLCAuLi5zY29wZVByb3BzLCByZWY6IGNvbXBvc2VkUmVmcywgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duIH0pO1xufSk7XG5Gb2N1c1Njb3BlLmRpc3BsYXlOYW1lID0gRk9DVVNfU0NPUEVfTkFNRTtcbmZ1bmN0aW9uIGZvY3VzRmlyc3QoY2FuZGlkYXRlcywgeyBzZWxlY3QgPSBmYWxzZSB9ID0ge30pIHtcbiAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgY2FuZGlkYXRlcykge1xuICAgIGZvY3VzKGNhbmRpZGF0ZSwgeyBzZWxlY3QgfSk7XG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCkgcmV0dXJuO1xuICB9XG59XG5mdW5jdGlvbiBnZXRUYWJiYWJsZUVkZ2VzKGNvbnRhaW5lcikge1xuICBjb25zdCBjYW5kaWRhdGVzID0gZ2V0VGFiYmFibGVDYW5kaWRhdGVzKGNvbnRhaW5lcik7XG4gIGNvbnN0IGZpcnN0ID0gZmluZFZpc2libGUoY2FuZGlkYXRlcywgY29udGFpbmVyKTtcbiAgY29uc3QgbGFzdCA9IGZpbmRWaXNpYmxlKGNhbmRpZGF0ZXMucmV2ZXJzZSgpLCBjb250YWluZXIpO1xuICByZXR1cm4gW2ZpcnN0LCBsYXN0XTtcbn1cbmZ1bmN0aW9uIGdldFRhYmJhYmxlQ2FuZGlkYXRlcyhjb250YWluZXIpIHtcbiAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihjb250YWluZXIsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCB7XG4gICAgYWNjZXB0Tm9kZTogKG5vZGUpID0+IHtcbiAgICAgIGNvbnN0IGlzSGlkZGVuSW5wdXQgPSBub2RlLnRhZ05hbWUgPT09IFwiSU5QVVRcIiAmJiBub2RlLnR5cGUgPT09IFwiaGlkZGVuXCI7XG4gICAgICBpZiAobm9kZS5kaXNhYmxlZCB8fCBub2RlLmhpZGRlbiB8fCBpc0hpZGRlbklucHV0KSByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfU0tJUDtcbiAgICAgIHJldHVybiBub2RlLnRhYkluZGV4ID49IDAgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9TS0lQO1xuICAgIH1cbiAgfSk7XG4gIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkgbm9kZXMucHVzaCh3YWxrZXIuY3VycmVudE5vZGUpO1xuICByZXR1cm4gbm9kZXM7XG59XG5mdW5jdGlvbiBmaW5kVmlzaWJsZShlbGVtZW50cywgY29udGFpbmVyKSB7XG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgIGlmICghaXNIaWRkZW4oZWxlbWVudCwgeyB1cFRvOiBjb250YWluZXIgfSkpIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5mdW5jdGlvbiBpc0hpZGRlbihub2RlLCB7IHVwVG8gfSkge1xuICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS52aXNpYmlsaXR5ID09PSBcImhpZGRlblwiKSByZXR1cm4gdHJ1ZTtcbiAgd2hpbGUgKG5vZGUpIHtcbiAgICBpZiAodXBUbyAhPT0gdm9pZCAwICYmIG5vZGUgPT09IHVwVG8pIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5kaXNwbGF5ID09PSBcIm5vbmVcIikgcmV0dXJuIHRydWU7XG4gICAgbm9kZSA9IG5vZGUucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc1NlbGVjdGFibGVJbnB1dChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBcInNlbGVjdFwiIGluIGVsZW1lbnQ7XG59XG5mdW5jdGlvbiBmb2N1cyhlbGVtZW50LCB7IHNlbGVjdCA9IGZhbHNlIH0gPSB7fSkge1xuICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmZvY3VzKSB7XG4gICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBlbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICBpZiAoZWxlbWVudCAhPT0gcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ICYmIGlzU2VsZWN0YWJsZUlucHV0KGVsZW1lbnQpICYmIHNlbGVjdClcbiAgICAgIGVsZW1lbnQuc2VsZWN0KCk7XG4gIH1cbn1cbnZhciBmb2N1c1Njb3Blc1N0YWNrID0gY3JlYXRlRm9jdXNTY29wZXNTdGFjaygpO1xuZnVuY3Rpb24gY3JlYXRlRm9jdXNTY29wZXNTdGFjaygpIHtcbiAgbGV0IHN0YWNrID0gW107XG4gIHJldHVybiB7XG4gICAgYWRkKGZvY3VzU2NvcGUpIHtcbiAgICAgIGNvbnN0IGFjdGl2ZUZvY3VzU2NvcGUgPSBzdGFja1swXTtcbiAgICAgIGlmIChmb2N1c1Njb3BlICE9PSBhY3RpdmVGb2N1c1Njb3BlKSB7XG4gICAgICAgIGFjdGl2ZUZvY3VzU2NvcGU/LnBhdXNlKCk7XG4gICAgICB9XG4gICAgICBzdGFjayA9IGFycmF5UmVtb3ZlKHN0YWNrLCBmb2N1c1Njb3BlKTtcbiAgICAgIHN0YWNrLnVuc2hpZnQoZm9jdXNTY29wZSk7XG4gICAgfSxcbiAgICByZW1vdmUoZm9jdXNTY29wZSkge1xuICAgICAgc3RhY2sgPSBhcnJheVJlbW92ZShzdGFjaywgZm9jdXNTY29wZSk7XG4gICAgICBzdGFja1swXT8ucmVzdW1lKCk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gYXJyYXlSZW1vdmUoYXJyYXksIGl0ZW0pIHtcbiAgY29uc3QgdXBkYXRlZEFycmF5ID0gWy4uLmFycmF5XTtcbiAgY29uc3QgaW5kZXggPSB1cGRhdGVkQXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHVwZGF0ZWRBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB1cGRhdGVkQXJyYXk7XG59XG5mdW5jdGlvbiByZW1vdmVMaW5rcyhpdGVtcykge1xuICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRhZ05hbWUgIT09IFwiQVwiKTtcbn1cbnZhciBSb290ID0gRm9jdXNTY29wZTtcbmV4cG9ydCB7XG4gIEZvY3VzU2NvcGUsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC9pZC9zcmMvaWQudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbnZhciB1c2VSZWFjdElkID0gUmVhY3RbXCIgdXNlSWQgXCIudHJpbSgpLnRvU3RyaW5nKCldIHx8ICgoKSA9PiB2b2lkIDApO1xudmFyIGNvdW50ID0gMDtcbmZ1bmN0aW9uIHVzZUlkKGRldGVybWluaXN0aWNJZCkge1xuICBjb25zdCBbaWQsIHNldElkXSA9IFJlYWN0LnVzZVN0YXRlKHVzZVJlYWN0SWQoKSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFkZXRlcm1pbmlzdGljSWQpIHNldElkKChyZWFjdElkKSA9PiByZWFjdElkID8/IFN0cmluZyhjb3VudCsrKSk7XG4gIH0sIFtkZXRlcm1pbmlzdGljSWRdKTtcbiAgcmV0dXJuIGRldGVybWluaXN0aWNJZCB8fCAoaWQgPyBgcmFkaXgtJHtpZH1gIDogXCJcIik7XG59XG5leHBvcnQge1xuICB1c2VJZFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvcG9ydGFsLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIFBPUlRBTF9OQU1FID0gXCJQb3J0YWxcIjtcbnZhciBQb3J0YWwgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gIGNvbnN0IHsgY29udGFpbmVyOiBjb250YWluZXJQcm9wLCAuLi5wb3J0YWxQcm9wcyB9ID0gcHJvcHM7XG4gIGNvbnN0IFttb3VudGVkLCBzZXRNb3VudGVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHNldE1vdW50ZWQodHJ1ZSksIFtdKTtcbiAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyUHJvcCB8fCBtb3VudGVkICYmIGdsb2JhbFRoaXM/LmRvY3VtZW50Py5ib2R5O1xuICByZXR1cm4gY29udGFpbmVyID8gUmVhY3RET00uY3JlYXRlUG9ydGFsKC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmRpdiwgeyAuLi5wb3J0YWxQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSksIGNvbnRhaW5lcikgOiBudWxsO1xufSk7XG5Qb3J0YWwuZGlzcGxheU5hbWUgPSBQT1JUQUxfTkFNRTtcbnZhciBSb290ID0gUG9ydGFsO1xuZXhwb3J0IHtcbiAgUG9ydGFsLFxuICBSb290XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9wcmVzZW5jZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0MiBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG5cbi8vIHNyYy91c2Utc3RhdGUtbWFjaGluZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gdXNlU3RhdGVNYWNoaW5lKGluaXRpYWxTdGF0ZSwgbWFjaGluZSkge1xuICByZXR1cm4gUmVhY3QudXNlUmVkdWNlcigoc3RhdGUsIGV2ZW50KSA9PiB7XG4gICAgY29uc3QgbmV4dFN0YXRlID0gbWFjaGluZVtzdGF0ZV1bZXZlbnRdO1xuICAgIHJldHVybiBuZXh0U3RhdGUgPz8gc3RhdGU7XG4gIH0sIGluaXRpYWxTdGF0ZSk7XG59XG5cbi8vIHNyYy9wcmVzZW5jZS50c3hcbnZhciBQcmVzZW5jZSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByZXNlbnQsIGNoaWxkcmVuIH0gPSBwcm9wcztcbiAgY29uc3QgcHJlc2VuY2UgPSB1c2VQcmVzZW5jZShwcmVzZW50KTtcbiAgY29uc3QgY2hpbGQgPSB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IGNoaWxkcmVuKHsgcHJlc2VudDogcHJlc2VuY2UuaXNQcmVzZW50IH0pIDogUmVhY3QyLkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuICBjb25zdCByZWYgPSB1c2VDb21wb3NlZFJlZnMocHJlc2VuY2UucmVmLCBnZXRFbGVtZW50UmVmKGNoaWxkKSk7XG4gIGNvbnN0IGZvcmNlTW91bnQgPSB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIjtcbiAgcmV0dXJuIGZvcmNlTW91bnQgfHwgcHJlc2VuY2UuaXNQcmVzZW50ID8gUmVhY3QyLmNsb25lRWxlbWVudChjaGlsZCwgeyByZWYgfSkgOiBudWxsO1xufTtcblByZXNlbmNlLmRpc3BsYXlOYW1lID0gXCJQcmVzZW5jZVwiO1xuZnVuY3Rpb24gdXNlUHJlc2VuY2UocHJlc2VudCkge1xuICBjb25zdCBbbm9kZSwgc2V0Tm9kZV0gPSBSZWFjdDIudXNlU3RhdGUoKTtcbiAgY29uc3Qgc3R5bGVzUmVmID0gUmVhY3QyLnVzZVJlZihudWxsKTtcbiAgY29uc3QgcHJldlByZXNlbnRSZWYgPSBSZWFjdDIudXNlUmVmKHByZXNlbnQpO1xuICBjb25zdCBwcmV2QW5pbWF0aW9uTmFtZVJlZiA9IFJlYWN0Mi51c2VSZWYoXCJub25lXCIpO1xuICBjb25zdCBpbml0aWFsU3RhdGUgPSBwcmVzZW50ID8gXCJtb3VudGVkXCIgOiBcInVubW91bnRlZFwiO1xuICBjb25zdCBbc3RhdGUsIHNlbmRdID0gdXNlU3RhdGVNYWNoaW5lKGluaXRpYWxTdGF0ZSwge1xuICAgIG1vdW50ZWQ6IHtcbiAgICAgIFVOTU9VTlQ6IFwidW5tb3VudGVkXCIsXG4gICAgICBBTklNQVRJT05fT1VUOiBcInVubW91bnRTdXNwZW5kZWRcIlxuICAgIH0sXG4gICAgdW5tb3VudFN1c3BlbmRlZDoge1xuICAgICAgTU9VTlQ6IFwibW91bnRlZFwiLFxuICAgICAgQU5JTUFUSU9OX0VORDogXCJ1bm1vdW50ZWRcIlxuICAgIH0sXG4gICAgdW5tb3VudGVkOiB7XG4gICAgICBNT1VOVDogXCJtb3VudGVkXCJcbiAgICB9XG4gIH0pO1xuICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uTmFtZSA9IGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzUmVmLmN1cnJlbnQpO1xuICAgIHByZXZBbmltYXRpb25OYW1lUmVmLmN1cnJlbnQgPSBzdGF0ZSA9PT0gXCJtb3VudGVkXCIgPyBjdXJyZW50QW5pbWF0aW9uTmFtZSA6IFwibm9uZVwiO1xuICB9LCBbc3RhdGVdKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzdHlsZXMgPSBzdHlsZXNSZWYuY3VycmVudDtcbiAgICBjb25zdCB3YXNQcmVzZW50ID0gcHJldlByZXNlbnRSZWYuY3VycmVudDtcbiAgICBjb25zdCBoYXNQcmVzZW50Q2hhbmdlZCA9IHdhc1ByZXNlbnQgIT09IHByZXNlbnQ7XG4gICAgaWYgKGhhc1ByZXNlbnRDaGFuZ2VkKSB7XG4gICAgICBjb25zdCBwcmV2QW5pbWF0aW9uTmFtZSA9IHByZXZBbmltYXRpb25OYW1lUmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uTmFtZSA9IGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzKTtcbiAgICAgIGlmIChwcmVzZW50KSB7XG4gICAgICAgIHNlbmQoXCJNT1VOVFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEFuaW1hdGlvbk5hbWUgPT09IFwibm9uZVwiIHx8IHN0eWxlcz8uZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgc2VuZChcIlVOTU9VTlRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpc0FuaW1hdGluZyA9IHByZXZBbmltYXRpb25OYW1lICE9PSBjdXJyZW50QW5pbWF0aW9uTmFtZTtcbiAgICAgICAgaWYgKHdhc1ByZXNlbnQgJiYgaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICBzZW5kKFwiQU5JTUFUSU9OX09VVFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZW5kKFwiVU5NT1VOVFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcHJldlByZXNlbnRSZWYuY3VycmVudCA9IHByZXNlbnQ7XG4gICAgfVxuICB9LCBbcHJlc2VudCwgc2VuZF0pO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChub2RlKSB7XG4gICAgICBsZXQgdGltZW91dElkO1xuICAgICAgY29uc3Qgb3duZXJXaW5kb3cgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgPz8gd2luZG93O1xuICAgICAgY29uc3QgaGFuZGxlQW5pbWF0aW9uRW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBbmltYXRpb25OYW1lID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXNSZWYuY3VycmVudCk7XG4gICAgICAgIGNvbnN0IGlzQ3VycmVudEFuaW1hdGlvbiA9IGN1cnJlbnRBbmltYXRpb25OYW1lLmluY2x1ZGVzKENTUy5lc2NhcGUoZXZlbnQuYW5pbWF0aW9uTmFtZSkpO1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBub2RlICYmIGlzQ3VycmVudEFuaW1hdGlvbikge1xuICAgICAgICAgIHNlbmQoXCJBTklNQVRJT05fRU5EXCIpO1xuICAgICAgICAgIGlmICghcHJldlByZXNlbnRSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEZpbGxNb2RlID0gbm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGUgPSBcImZvcndhcmRzXCI7XG4gICAgICAgICAgICB0aW1lb3V0SWQgPSBvd25lcldpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGUgPT09IFwiZm9yd2FyZHNcIikge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGUgPSBjdXJyZW50RmlsbE1vZGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IGhhbmRsZUFuaW1hdGlvblN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IG5vZGUpIHtcbiAgICAgICAgICBwcmV2QW5pbWF0aW9uTmFtZVJlZi5jdXJyZW50ID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXNSZWYuY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25zdGFydFwiLCBoYW5kbGVBbmltYXRpb25TdGFydCk7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25jYW5jZWxcIiwgaGFuZGxlQW5pbWF0aW9uRW5kKTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgb3duZXJXaW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbnN0YXJ0XCIsIGhhbmRsZUFuaW1hdGlvblN0YXJ0KTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uY2FuY2VsXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VuZChcIkFOSU1BVElPTl9FTkRcIik7XG4gICAgfVxuICB9LCBbbm9kZSwgc2VuZF0pO1xuICByZXR1cm4ge1xuICAgIGlzUHJlc2VudDogW1wibW91bnRlZFwiLCBcInVubW91bnRTdXNwZW5kZWRcIl0uaW5jbHVkZXMoc3RhdGUpLFxuICAgIHJlZjogUmVhY3QyLnVzZUNhbGxiYWNrKChub2RlMikgPT4ge1xuICAgICAgc3R5bGVzUmVmLmN1cnJlbnQgPSBub2RlMiA/IGdldENvbXB1dGVkU3R5bGUobm9kZTIpIDogbnVsbDtcbiAgICAgIHNldE5vZGUobm9kZTIpO1xuICAgIH0sIFtdKVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXMpIHtcbiAgcmV0dXJuIHN0eWxlcz8uYW5pbWF0aW9uTmFtZSB8fCBcIm5vbmVcIjtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRSZWYoZWxlbWVudCkge1xuICBsZXQgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LnByb3BzLCBcInJlZlwiKT8uZ2V0O1xuICBsZXQgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5yZWY7XG4gIH1cbiAgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LCBcInJlZlwiKT8uZ2V0O1xuICBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnByb3BzLnJlZjtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWYgfHwgZWxlbWVudC5yZWY7XG59XG52YXIgUm9vdCA9IFByZXNlbmNlO1xuZXhwb3J0IHtcbiAgUHJlc2VuY2UsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvcHJpbWl0aXZlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyBjcmVhdGVTbG90IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBOT0RFUyA9IFtcbiAgXCJhXCIsXG4gIFwiYnV0dG9uXCIsXG4gIFwiZGl2XCIsXG4gIFwiZm9ybVwiLFxuICBcImgyXCIsXG4gIFwiaDNcIixcbiAgXCJpbWdcIixcbiAgXCJpbnB1dFwiLFxuICBcImxhYmVsXCIsXG4gIFwibGlcIixcbiAgXCJuYXZcIixcbiAgXCJvbFwiLFxuICBcInBcIixcbiAgXCJzZWxlY3RcIixcbiAgXCJzcGFuXCIsXG4gIFwic3ZnXCIsXG4gIFwidWxcIlxuXTtcbnZhciBQcmltaXRpdmUgPSBOT0RFUy5yZWR1Y2UoKHByaW1pdGl2ZSwgbm9kZSkgPT4ge1xuICBjb25zdCBTbG90ID0gY3JlYXRlU2xvdChgUHJpbWl0aXZlLiR7bm9kZX1gKTtcbiAgY29uc3QgTm9kZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGFzQ2hpbGQsIC4uLnByaW1pdGl2ZVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBDb21wID0gYXNDaGlsZCA/IFNsb3QgOiBub2RlO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB3aW5kb3dbU3ltYm9sLmZvcihcInJhZGl4LXVpXCIpXSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KENvbXAsIHsgLi4ucHJpbWl0aXZlUHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pO1xuICB9KTtcbiAgTm9kZS5kaXNwbGF5TmFtZSA9IGBQcmltaXRpdmUuJHtub2RlfWA7XG4gIHJldHVybiB7IC4uLnByaW1pdGl2ZSwgW25vZGVdOiBOb2RlIH07XG59LCB7fSk7XG5mdW5jdGlvbiBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnQodGFyZ2V0LCBldmVudCkge1xuICBpZiAodGFyZ2V0KSBSZWFjdERPTS5mbHVzaFN5bmMoKCkgPT4gdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpKTtcbn1cbnZhciBSb290ID0gUHJpbWl0aXZlO1xuZXhwb3J0IHtcbiAgUHJpbWl0aXZlLFxuICBSb290LFxuICBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnRcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvc2xvdC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZVJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgRnJhZ21lbnQgYXMgRnJhZ21lbnQyLCBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90KG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSk7XG4gIGNvbnN0IFNsb3QyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2hpbGRyZW5BcnJheSA9IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pO1xuICAgIGNvbnN0IHNsb3R0YWJsZSA9IGNoaWxkcmVuQXJyYXkuZmluZChpc1Nsb3R0YWJsZSk7XG4gICAgaWYgKHNsb3R0YWJsZSkge1xuICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHNsb3R0YWJsZS5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gY2hpbGRyZW5BcnJheS5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZCA9PT0gc2xvdHRhYmxlKSB7XG4gICAgICAgICAgaWYgKFJlYWN0LkNoaWxkcmVuLmNvdW50KG5ld0VsZW1lbnQpID4gMSkgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KG5ld0VsZW1lbnQpID8gbmV3RWxlbWVudC5wcm9wcy5jaGlsZHJlbiA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbjogUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBSZWFjdC5jbG9uZUVsZW1lbnQobmV3RWxlbWVudCwgdm9pZCAwLCBuZXdDaGlsZHJlbikgOiBudWxsIH0pO1xuICAgIH1cbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChTbG90Q2xvbmUsIHsgLi4uc2xvdFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiwgY2hpbGRyZW4gfSk7XG4gIH0pO1xuICBTbG90Mi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdGA7XG4gIHJldHVybiBTbG90Mjtcbn1cbnZhciBTbG90ID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3QoXCJTbG90XCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3RDbG9uZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdENsb25lID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgICAgY29uc3QgY2hpbGRyZW5SZWYgPSBnZXRFbGVtZW50UmVmKGNoaWxkcmVuKTtcbiAgICAgIGNvbnN0IHByb3BzMiA9IG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZHJlbi5wcm9wcyk7XG4gICAgICBpZiAoY2hpbGRyZW4udHlwZSAhPT0gUmVhY3QuRnJhZ21lbnQpIHtcbiAgICAgICAgcHJvcHMyLnJlZiA9IGZvcndhcmRlZFJlZiA/IGNvbXBvc2VSZWZzKGZvcndhcmRlZFJlZiwgY2hpbGRyZW5SZWYpIDogY2hpbGRyZW5SZWY7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkcmVuLCBwcm9wczIpO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMSA/IFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCkgOiBudWxsO1xuICB9KTtcbiAgU2xvdENsb25lLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90Q2xvbmVgO1xuICByZXR1cm4gU2xvdENsb25lO1xufVxudmFyIFNMT1RUQUJMRV9JREVOVElGSUVSID0gU3ltYm9sKFwicmFkaXguc2xvdHRhYmxlXCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3R0YWJsZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdHRhYmxlMiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChGcmFnbWVudDIsIHsgY2hpbGRyZW4gfSk7XG4gIH07XG4gIFNsb3R0YWJsZTIuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3R0YWJsZWA7XG4gIFNsb3R0YWJsZTIuX19yYWRpeElkID0gU0xPVFRBQkxFX0lERU5USUZJRVI7XG4gIHJldHVybiBTbG90dGFibGUyO1xufVxudmFyIFNsb3R0YWJsZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90dGFibGUoXCJTbG90dGFibGVcIik7XG5mdW5jdGlvbiBpc1Nsb3R0YWJsZShjaGlsZCkge1xuICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpICYmIHR5cGVvZiBjaGlsZC50eXBlID09PSBcImZ1bmN0aW9uXCIgJiYgXCJfX3JhZGl4SWRcIiBpbiBjaGlsZC50eXBlICYmIGNoaWxkLnR5cGUuX19yYWRpeElkID09PSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbn1cbmZ1bmN0aW9uIG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZFByb3BzKSB7XG4gIGNvbnN0IG92ZXJyaWRlUHJvcHMgPSB7IC4uLmNoaWxkUHJvcHMgfTtcbiAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGlsZFByb3BzKSB7XG4gICAgY29uc3Qgc2xvdFByb3BWYWx1ZSA9IHNsb3RQcm9wc1twcm9wTmFtZV07XG4gICAgY29uc3QgY2hpbGRQcm9wVmFsdWUgPSBjaGlsZFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBpc0hhbmRsZXIgPSAvXm9uW0EtWl0vLnRlc3QocHJvcE5hbWUpO1xuICAgIGlmIChpc0hhbmRsZXIpIHtcbiAgICAgIGlmIChzbG90UHJvcFZhbHVlICYmIGNoaWxkUHJvcFZhbHVlKSB7XG4gICAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBjaGlsZFByb3BWYWx1ZSguLi5hcmdzKTtcbiAgICAgICAgICBzbG90UHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNsb3RQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBzbG90UHJvcFZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSB7IC4uLnNsb3RQcm9wVmFsdWUsIC4uLmNoaWxkUHJvcFZhbHVlIH07XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJjbGFzc05hbWVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBbc2xvdFByb3BWYWx1ZSwgY2hpbGRQcm9wVmFsdWVdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgLi4uc2xvdFByb3BzLCAuLi5vdmVycmlkZVByb3BzIH07XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50UmVmKGVsZW1lbnQpIHtcbiAgbGV0IGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudC5wcm9wcywgXCJyZWZcIik/LmdldDtcbiAgbGV0IG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucmVmO1xuICB9XG4gIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudCwgXCJyZWZcIik/LmdldDtcbiAgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWY7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmIHx8IGVsZW1lbnQucmVmO1xufVxuZXhwb3J0IHtcbiAgU2xvdCBhcyBSb290LFxuICBTbG90LFxuICBTbG90dGFibGUsXG4gIGNyZWF0ZVNsb3QsXG4gIGNyZWF0ZVNsb3R0YWJsZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L3VzZS1jYWxsYmFjay1yZWYvc3JjL3VzZS1jYWxsYmFjay1yZWYudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIHVzZUNhbGxiYWNrUmVmKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGNhbGxiYWNrUmVmID0gUmVhY3QudXNlUmVmKGNhbGxiYWNrKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjYWxsYmFja1JlZi5jdXJyZW50ID0gY2FsbGJhY2s7XG4gIH0pO1xuICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiAoLi4uYXJncykgPT4gY2FsbGJhY2tSZWYuY3VycmVudD8uKC4uLmFyZ3MpLCBbXSk7XG59XG5leHBvcnQge1xuICB1c2VDYWxsYmFja1JlZlxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy91c2UtY29udHJvbGxhYmxlLXN0YXRlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG52YXIgdXNlSW5zZXJ0aW9uRWZmZWN0ID0gUmVhY3RbXCIgdXNlSW5zZXJ0aW9uRWZmZWN0IFwiLnRyaW0oKS50b1N0cmluZygpXSB8fCB1c2VMYXlvdXRFZmZlY3Q7XG5mdW5jdGlvbiB1c2VDb250cm9sbGFibGVTdGF0ZSh7XG4gIHByb3AsXG4gIGRlZmF1bHRQcm9wLFxuICBvbkNoYW5nZSA9ICgpID0+IHtcbiAgfSxcbiAgY2FsbGVyXG59KSB7XG4gIGNvbnN0IFt1bmNvbnRyb2xsZWRQcm9wLCBzZXRVbmNvbnRyb2xsZWRQcm9wLCBvbkNoYW5nZVJlZl0gPSB1c2VVbmNvbnRyb2xsZWRTdGF0ZSh7XG4gICAgZGVmYXVsdFByb3AsXG4gICAgb25DaGFuZ2VcbiAgfSk7XG4gIGNvbnN0IGlzQ29udHJvbGxlZCA9IHByb3AgIT09IHZvaWQgMDtcbiAgY29uc3QgdmFsdWUgPSBpc0NvbnRyb2xsZWQgPyBwcm9wIDogdW5jb250cm9sbGVkUHJvcDtcbiAgaWYgKHRydWUpIHtcbiAgICBjb25zdCBpc0NvbnRyb2xsZWRSZWYgPSBSZWFjdC51c2VSZWYocHJvcCAhPT0gdm9pZCAwKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3Qgd2FzQ29udHJvbGxlZCA9IGlzQ29udHJvbGxlZFJlZi5jdXJyZW50O1xuICAgICAgaWYgKHdhc0NvbnRyb2xsZWQgIT09IGlzQ29udHJvbGxlZCkge1xuICAgICAgICBjb25zdCBmcm9tID0gd2FzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc3QgdG8gPSBpc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCI7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgJHtjYWxsZXJ9IGlzIGNoYW5naW5nIGZyb20gJHtmcm9tfSB0byAke3RvfS4gQ29tcG9uZW50cyBzaG91bGQgbm90IHN3aXRjaCBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gRGVjaWRlIGJldHdlZW4gdXNpbmcgYSBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCB2YWx1ZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBjb21wb25lbnQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaXNDb250cm9sbGVkUmVmLmN1cnJlbnQgPSBpc0NvbnRyb2xsZWQ7XG4gICAgfSwgW2lzQ29udHJvbGxlZCwgY2FsbGVyXSk7XG4gIH1cbiAgY29uc3Qgc2V0VmFsdWUgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAobmV4dFZhbHVlKSA9PiB7XG4gICAgICBpZiAoaXNDb250cm9sbGVkKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlMiA9IGlzRnVuY3Rpb24obmV4dFZhbHVlKSA/IG5leHRWYWx1ZShwcm9wKSA6IG5leHRWYWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlMiAhPT0gcHJvcCkge1xuICAgICAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQ/Lih2YWx1ZTIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRVbmNvbnRyb2xsZWRQcm9wKG5leHRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaXNDb250cm9sbGVkLCBwcm9wLCBzZXRVbmNvbnRyb2xsZWRQcm9wLCBvbkNoYW5nZVJlZl1cbiAgKTtcbiAgcmV0dXJuIFt2YWx1ZSwgc2V0VmFsdWVdO1xufVxuZnVuY3Rpb24gdXNlVW5jb250cm9sbGVkU3RhdGUoe1xuICBkZWZhdWx0UHJvcCxcbiAgb25DaGFuZ2Vcbn0pIHtcbiAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSBSZWFjdC51c2VTdGF0ZShkZWZhdWx0UHJvcCk7XG4gIGNvbnN0IHByZXZWYWx1ZVJlZiA9IFJlYWN0LnVzZVJlZih2YWx1ZSk7XG4gIGNvbnN0IG9uQ2hhbmdlUmVmID0gUmVhY3QudXNlUmVmKG9uQ2hhbmdlKTtcbiAgdXNlSW5zZXJ0aW9uRWZmZWN0KCgpID0+IHtcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XG4gIH0sIFtvbkNoYW5nZV0pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwcmV2VmFsdWVSZWYuY3VycmVudCAhPT0gdmFsdWUpIHtcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQ/Lih2YWx1ZSk7XG4gICAgICBwcmV2VmFsdWVSZWYuY3VycmVudCA9IHZhbHVlO1xuICAgIH1cbiAgfSwgW3ZhbHVlLCBwcmV2VmFsdWVSZWZdKTtcbiAgcmV0dXJuIFt2YWx1ZSwgc2V0VmFsdWUsIG9uQ2hhbmdlUmVmXTtcbn1cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG4vLyBzcmMvdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZS1yZWR1Y2VyLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QyIGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0RXZlbnQgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1lZmZlY3QtZXZlbnRcIjtcbnZhciBTWU5DX1NUQVRFID0gU3ltYm9sKFwiUkFESVg6U1lOQ19TVEFURVwiKTtcbmZ1bmN0aW9uIHVzZUNvbnRyb2xsYWJsZVN0YXRlUmVkdWNlcihyZWR1Y2VyLCB1c2VyQXJncywgaW5pdGlhbEFyZywgaW5pdCkge1xuICBjb25zdCB7IHByb3A6IGNvbnRyb2xsZWRTdGF0ZSwgZGVmYXVsdFByb3AsIG9uQ2hhbmdlOiBvbkNoYW5nZVByb3AsIGNhbGxlciB9ID0gdXNlckFyZ3M7XG4gIGNvbnN0IGlzQ29udHJvbGxlZCA9IGNvbnRyb2xsZWRTdGF0ZSAhPT0gdm9pZCAwO1xuICBjb25zdCBvbkNoYW5nZSA9IHVzZUVmZmVjdEV2ZW50KG9uQ2hhbmdlUHJvcCk7XG4gIGlmICh0cnVlKSB7XG4gICAgY29uc3QgaXNDb250cm9sbGVkUmVmID0gUmVhY3QyLnVzZVJlZihjb250cm9sbGVkU3RhdGUgIT09IHZvaWQgMCk7XG4gICAgUmVhY3QyLnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCB3YXNDb250cm9sbGVkID0gaXNDb250cm9sbGVkUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAod2FzQ29udHJvbGxlZCAhPT0gaXNDb250cm9sbGVkKSB7XG4gICAgICAgIGNvbnN0IGZyb20gPSB3YXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zdCB0byA9IGlzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGAke2NhbGxlcn0gaXMgY2hhbmdpbmcgZnJvbSAke2Zyb219IHRvICR7dG99LiBDb21wb25lbnRzIHNob3VsZCBub3Qgc3dpdGNoIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHZhbHVlIGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIGNvbXBvbmVudC5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpc0NvbnRyb2xsZWRSZWYuY3VycmVudCA9IGlzQ29udHJvbGxlZDtcbiAgICB9LCBbaXNDb250cm9sbGVkLCBjYWxsZXJdKTtcbiAgfVxuICBjb25zdCBhcmdzID0gW3sgLi4uaW5pdGlhbEFyZywgc3RhdGU6IGRlZmF1bHRQcm9wIH1dO1xuICBpZiAoaW5pdCkge1xuICAgIGFyZ3MucHVzaChpbml0KTtcbiAgfVxuICBjb25zdCBbaW50ZXJuYWxTdGF0ZSwgZGlzcGF0Y2hdID0gUmVhY3QyLnVzZVJlZHVjZXIoXG4gICAgKHN0YXRlMiwgYWN0aW9uKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFNZTkNfU1RBVEUpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUyLCBzdGF0ZTogYWN0aW9uLnN0YXRlIH07XG4gICAgICB9XG4gICAgICBjb25zdCBuZXh0ID0gcmVkdWNlcihzdGF0ZTIsIGFjdGlvbik7XG4gICAgICBpZiAoaXNDb250cm9sbGVkICYmICFPYmplY3QuaXMobmV4dC5zdGF0ZSwgc3RhdGUyLnN0YXRlKSkge1xuICAgICAgICBvbkNoYW5nZShuZXh0LnN0YXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0sXG4gICAgLi4uYXJnc1xuICApO1xuICBjb25zdCB1bmNvbnRyb2xsZWRTdGF0ZSA9IGludGVybmFsU3RhdGUuc3RhdGU7XG4gIGNvbnN0IHByZXZWYWx1ZVJlZiA9IFJlYWN0Mi51c2VSZWYodW5jb250cm9sbGVkU3RhdGUpO1xuICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocHJldlZhbHVlUmVmLmN1cnJlbnQgIT09IHVuY29udHJvbGxlZFN0YXRlKSB7XG4gICAgICBwcmV2VmFsdWVSZWYuY3VycmVudCA9IHVuY29udHJvbGxlZFN0YXRlO1xuICAgICAgaWYgKCFpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgb25DaGFuZ2UodW5jb250cm9sbGVkU3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW29uQ2hhbmdlLCB1bmNvbnRyb2xsZWRTdGF0ZSwgcHJldlZhbHVlUmVmLCBpc0NvbnRyb2xsZWRdKTtcbiAgY29uc3Qgc3RhdGUgPSBSZWFjdDIudXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgaXNDb250cm9sbGVkMiA9IGNvbnRyb2xsZWRTdGF0ZSAhPT0gdm9pZCAwO1xuICAgIGlmIChpc0NvbnRyb2xsZWQyKSB7XG4gICAgICByZXR1cm4geyAuLi5pbnRlcm5hbFN0YXRlLCBzdGF0ZTogY29udHJvbGxlZFN0YXRlIH07XG4gICAgfVxuICAgIHJldHVybiBpbnRlcm5hbFN0YXRlO1xuICB9LCBbaW50ZXJuYWxTdGF0ZSwgY29udHJvbGxlZFN0YXRlXSk7XG4gIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0NvbnRyb2xsZWQgJiYgIU9iamVjdC5pcyhjb250cm9sbGVkU3RhdGUsIGludGVybmFsU3RhdGUuc3RhdGUpKSB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFNZTkNfU1RBVEUsIHN0YXRlOiBjb250cm9sbGVkU3RhdGUgfSk7XG4gICAgfVxuICB9LCBbY29udHJvbGxlZFN0YXRlLCBpbnRlcm5hbFN0YXRlLnN0YXRlLCBpc0NvbnRyb2xsZWRdKTtcbiAgcmV0dXJuIFtzdGF0ZSwgZGlzcGF0Y2hdO1xufVxuZXhwb3J0IHtcbiAgdXNlQ29udHJvbGxhYmxlU3RhdGUsXG4gIHVzZUNvbnRyb2xsYWJsZVN0YXRlUmVkdWNlclxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy91c2UtZWZmZWN0LWV2ZW50LnRzeFxuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG52YXIgdXNlUmVhY3RFZmZlY3RFdmVudCA9IFJlYWN0W1wiIHVzZUVmZmVjdEV2ZW50IFwiLnRyaW0oKS50b1N0cmluZygpXTtcbnZhciB1c2VSZWFjdEluc2VydGlvbkVmZmVjdCA9IFJlYWN0W1wiIHVzZUluc2VydGlvbkVmZmVjdCBcIi50cmltKCkudG9TdHJpbmcoKV07XG5mdW5jdGlvbiB1c2VFZmZlY3RFdmVudChjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIHVzZVJlYWN0RWZmZWN0RXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB1c2VSZWFjdEVmZmVjdEV2ZW50KGNhbGxiYWNrKTtcbiAgfVxuICBjb25zdCByZWYgPSBSZWFjdC51c2VSZWYoKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjYWxsIGFuIGV2ZW50IGhhbmRsZXIgd2hpbGUgcmVuZGVyaW5nLlwiKTtcbiAgfSk7XG4gIGlmICh0eXBlb2YgdXNlUmVhY3RJbnNlcnRpb25FZmZlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHVzZVJlYWN0SW5zZXJ0aW9uRWZmZWN0KCgpID0+IHtcbiAgICAgIHJlZi5jdXJyZW50ID0gY2FsbGJhY2s7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICAgIHJlZi5jdXJyZW50ID0gY2FsbGJhY2s7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oKCkgPT4gKC4uLmFyZ3MpID0+IHJlZi5jdXJyZW50Py4oLi4uYXJncyksIFtdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUVmZmVjdEV2ZW50XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvdXNlLWVzY2FwZS1rZXlkb3duL3NyYy91c2UtZXNjYXBlLWtleWRvd24udHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmXCI7XG5mdW5jdGlvbiB1c2VFc2NhcGVLZXlkb3duKG9uRXNjYXBlS2V5RG93blByb3AsIG93bmVyRG9jdW1lbnQgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCkge1xuICBjb25zdCBvbkVzY2FwZUtleURvd24gPSB1c2VDYWxsYmFja1JlZihvbkVzY2FwZUtleURvd25Qcm9wKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIG9uRXNjYXBlS2V5RG93bihldmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBvd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4gb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlEb3duLCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gIH0sIFtvbkVzY2FwZUtleURvd24sIG93bmVyRG9jdW1lbnRdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUVzY2FwZUtleWRvd25cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC91c2UtbGF5b3V0LWVmZmVjdC9zcmMvdXNlLWxheW91dC1lZmZlY3QudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbnZhciB1c2VMYXlvdXRFZmZlY3QyID0gZ2xvYmFsVGhpcz8uZG9jdW1lbnQgPyBSZWFjdC51c2VMYXlvdXRFZmZlY3QgOiAoKSA9PiB7XG59O1xuZXhwb3J0IHtcbiAgdXNlTGF5b3V0RWZmZWN0MiBhcyB1c2VMYXlvdXRFZmZlY3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCJcInVzZSBjbGllbnRcIjtcbmltcG9ydCB7IGpzeCBhcyBlZSB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgYXMgTSwgdXNlTGF5b3V0RWZmZWN0IGFzIHJlLCB1c2VFZmZlY3QgYXMgSiwgdXNlTWVtbyBhcyBBLCB1c2VSZWYgYXMgSywgdXNlQ2FsbGJhY2sgYXMgRCwgbWVtbyBhcyBsZSwgdXNlSW1wZXJhdGl2ZUhhbmRsZSBhcyBjZSwgY3JlYXRlRWxlbWVudCBhcyBYIH0gZnJvbSBcInJlYWN0XCI7XG5mdW5jdGlvbiB4ZShlKSB7XG4gIGxldCB0ID0gZTtcbiAgZm9yICg7IHQ7ICkge1xuICAgIGlmICh0LmRpcilcbiAgICAgIHJldHVybiB0LmRpciA9PT0gXCJydGxcIjtcbiAgICB0ID0gdC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiAhMTtcbn1cbmZ1bmN0aW9uIHZlKGUsIHQpIHtcbiAgY29uc3QgW3MsIHJdID0gTSh0ID09PSBcInJ0bFwiKTtcbiAgcmV0dXJuIHJlKCgpID0+IHtcbiAgICBlICYmICh0IHx8IHIoeGUoZSkpKTtcbiAgfSwgW3QsIGVdKSwgcztcbn1cbmNvbnN0IHEgPSB0eXBlb2Ygd2luZG93IDwgXCJ1XCIgPyByZSA6IEo7XG5mdW5jdGlvbiBpZShlKSB7XG4gIGlmIChlICE9PSB2b2lkIDApXG4gICAgc3dpdGNoICh0eXBlb2YgZSkge1xuICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICByZXR1cm4gZTtcbiAgICAgIGNhc2UgXCJzdHJpbmdcIjoge1xuICAgICAgICBpZiAoZS5lbmRzV2l0aChcInB4XCIpKVxuICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBiZSh7XG4gIGJveDogZSxcbiAgZGVmYXVsdEhlaWdodDogdCxcbiAgZGVmYXVsdFdpZHRoOiBzLFxuICBkaXNhYmxlZDogcixcbiAgZWxlbWVudDogbixcbiAgbW9kZTogbyxcbiAgc3R5bGU6IGlcbn0pIHtcbiAgY29uc3QgeyBzdHlsZUhlaWdodDogZiwgc3R5bGVXaWR0aDogbCB9ID0gQShcbiAgICAoKSA9PiAoe1xuICAgICAgc3R5bGVIZWlnaHQ6IGllKGk/LmhlaWdodCksXG4gICAgICBzdHlsZVdpZHRoOiBpZShpPy53aWR0aClcbiAgICB9KSxcbiAgICBbaT8uaGVpZ2h0LCBpPy53aWR0aF1cbiAgKSwgW2MsIGRdID0gTSh7XG4gICAgaGVpZ2h0OiB0LFxuICAgIHdpZHRoOiBzXG4gIH0pLCBhID0gciB8fCBvID09PSBcIm9ubHktaGVpZ2h0XCIgJiYgZiAhPT0gdm9pZCAwIHx8IG8gPT09IFwib25seS13aWR0aFwiICYmIGwgIT09IHZvaWQgMCB8fCBmICE9PSB2b2lkIDAgJiYgbCAhPT0gdm9pZCAwO1xuICByZXR1cm4gcSgoKSA9PiB7XG4gICAgaWYgKG4gPT09IG51bGwgfHwgYSlcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBoID0gbmV3IFJlc2l6ZU9ic2VydmVyKChwKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IEkgb2YgcCkge1xuICAgICAgICBjb25zdCB7IGNvbnRlbnRSZWN0OiB1LCB0YXJnZXQ6IHcgfSA9IEk7XG4gICAgICAgIG4gPT09IHcgJiYgZCgobSkgPT4gbS5oZWlnaHQgPT09IHUuaGVpZ2h0ICYmIG0ud2lkdGggPT09IHUud2lkdGggPyBtIDoge1xuICAgICAgICAgIGhlaWdodDogdS5oZWlnaHQsXG4gICAgICAgICAgd2lkdGg6IHUud2lkdGhcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGgub2JzZXJ2ZShuLCB7IGJveDogZSB9KSwgKCkgPT4ge1xuICAgICAgaD8udW5vYnNlcnZlKG4pO1xuICAgIH07XG4gIH0sIFtlLCBhLCBuLCBmLCBsXSksIEEoXG4gICAgKCkgPT4gKHtcbiAgICAgIGhlaWdodDogZiA/PyBjLmhlaWdodCxcbiAgICAgIHdpZHRoOiBsID8/IGMud2lkdGhcbiAgICB9KSxcbiAgICBbYywgZiwgbF1cbiAgKTtcbn1cbmZ1bmN0aW9uIGFlKGUpIHtcbiAgY29uc3QgdCA9IEsoKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjYWxsIGR1cmluZyByZW5kZXIuXCIpO1xuICB9KTtcbiAgcmV0dXJuIHEoKCkgPT4ge1xuICAgIHQuY3VycmVudCA9IGU7XG4gIH0sIFtlXSksIEQoKHMpID0+IHQuY3VycmVudD8uKHMpLCBbdF0pO1xufVxubGV0IFUgPSBudWxsO1xuZnVuY3Rpb24gSWUoZSA9ICExKSB7XG4gIGlmIChVID09PSBudWxsIHx8IGUpIHtcbiAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgcyA9IHQuc3R5bGU7XG4gICAgcy53aWR0aCA9IFwiNTBweFwiLCBzLmhlaWdodCA9IFwiNTBweFwiLCBzLm92ZXJmbG93ID0gXCJzY3JvbGxcIiwgcy5kaXJlY3Rpb24gPSBcInJ0bFwiO1xuICAgIGNvbnN0IHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLCBuID0gci5zdHlsZTtcbiAgICByZXR1cm4gbi53aWR0aCA9IFwiMTAwcHhcIiwgbi5oZWlnaHQgPSBcIjEwMHB4XCIsIHQuYXBwZW5kQ2hpbGQociksIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodCksIHQuc2Nyb2xsTGVmdCA+IDAgPyBVID0gXCJwb3NpdGl2ZS1kZXNjZW5kaW5nXCIgOiAodC5zY3JvbGxMZWZ0ID0gMSwgdC5zY3JvbGxMZWZ0ID09PSAwID8gVSA9IFwibmVnYXRpdmVcIiA6IFUgPSBcInBvc2l0aXZlLWFzY2VuZGluZ1wiKSwgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0KSwgVTtcbiAgfVxuICByZXR1cm4gVTtcbn1cbmZ1bmN0aW9uIFooe1xuICBjb250YWluZXJFbGVtZW50OiBlLFxuICBkaXJlY3Rpb246IHQsXG4gIGlzUnRsOiBzLFxuICBzY3JvbGxPZmZzZXQ6IHJcbn0pIHtcbiAgaWYgKHQgPT09IFwiaG9yaXpvbnRhbFwiICYmIHMpXG4gICAgc3dpdGNoIChJZSgpKSB7XG4gICAgICBjYXNlIFwibmVnYXRpdmVcIjpcbiAgICAgICAgcmV0dXJuIC1yO1xuICAgICAgY2FzZSBcInBvc2l0aXZlLWRlc2NlbmRpbmdcIjoge1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgIGNvbnN0IHsgY2xpZW50V2lkdGg6IG4sIHNjcm9sbExlZnQ6IG8sIHNjcm9sbFdpZHRoOiBpIH0gPSBlO1xuICAgICAgICAgIHJldHVybiBpIC0gbiAtIG87XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICByZXR1cm4gcjtcbn1cbmZ1bmN0aW9uIEwoZSwgdCA9IFwiQXNzZXJ0aW9uIGVycm9yXCIpIHtcbiAgaWYgKCFlKVxuICAgIHRocm93IGNvbnNvbGUuZXJyb3IodCksIEVycm9yKHQpO1xufVxuZnVuY3Rpb24gWShlLCB0KSB7XG4gIGlmIChlID09PSB0KVxuICAgIHJldHVybiAhMDtcbiAgaWYgKCEhZSAhPSAhIXQgfHwgKEwoZSAhPT0gdm9pZCAwKSwgTCh0ICE9PSB2b2lkIDApLCBPYmplY3Qua2V5cyhlKS5sZW5ndGggIT09IE9iamVjdC5rZXlzKHQpLmxlbmd0aCkpXG4gICAgcmV0dXJuICExO1xuICBmb3IgKGNvbnN0IHMgaW4gZSlcbiAgICBpZiAoIU9iamVjdC5pcyh0W3NdLCBlW3NdKSlcbiAgICAgIHJldHVybiAhMTtcbiAgcmV0dXJuICEwO1xufVxuZnVuY3Rpb24gZmUoe1xuICBjYWNoZWRCb3VuZHM6IGUsXG4gIGl0ZW1Db3VudDogdCxcbiAgaXRlbVNpemU6IHNcbn0pIHtcbiAgaWYgKHQgPT09IDApXG4gICAgcmV0dXJuIDA7XG4gIGlmICh0eXBlb2YgcyA9PSBcIm51bWJlclwiKVxuICAgIHJldHVybiB0ICogcztcbiAge1xuICAgIGNvbnN0IHIgPSBlLmdldChcbiAgICAgIGUuc2l6ZSA9PT0gMCA/IDAgOiBlLnNpemUgLSAxXG4gICAgKTtcbiAgICBMKHIgIT09IHZvaWQgMCwgXCJVbmV4cGVjdGVkIGJvdW5kcyBjYWNoZSBtaXNzXCIpO1xuICAgIGNvbnN0IG4gPSAoci5zY3JvbGxPZmZzZXQgKyByLnNpemUpIC8gZS5zaXplO1xuICAgIHJldHVybiB0ICogbjtcbiAgfVxufVxuZnVuY3Rpb24gd2Uoe1xuICBhbGlnbjogZSxcbiAgY2FjaGVkQm91bmRzOiB0LFxuICBpbmRleDogcyxcbiAgaXRlbUNvdW50OiByLFxuICBpdGVtU2l6ZTogbixcbiAgY29udGFpbmVyU2Nyb2xsT2Zmc2V0OiBvLFxuICBjb250YWluZXJTaXplOiBpXG59KSB7XG4gIGlmIChzIDwgMCB8fCBzID49IHIpXG4gICAgdGhyb3cgUmFuZ2VFcnJvcihgSW52YWxpZCBpbmRleCBzcGVjaWZpZWQ6ICR7c31gLCB7XG4gICAgICBjYXVzZTogYEluZGV4ICR7c30gaXMgbm90IHdpdGhpbiB0aGUgcmFuZ2Ugb2YgMCAtICR7ciAtIDF9YFxuICAgIH0pO1xuICBjb25zdCBmID0gZmUoe1xuICAgIGNhY2hlZEJvdW5kczogdCxcbiAgICBpdGVtQ291bnQ6IHIsXG4gICAgaXRlbVNpemU6IG5cbiAgfSksIGwgPSB0LmdldChzKSwgYyA9IE1hdGgubWF4KFxuICAgIDAsXG4gICAgTWF0aC5taW4oZiAtIGksIGwuc2Nyb2xsT2Zmc2V0KVxuICApLCBkID0gTWF0aC5tYXgoXG4gICAgMCxcbiAgICBsLnNjcm9sbE9mZnNldCAtIGkgKyBsLnNpemVcbiAgKTtcbiAgc3dpdGNoIChlID09PSBcInNtYXJ0XCIgJiYgKG8gPj0gZCAmJiBvIDw9IGMgPyBlID0gXCJhdXRvXCIgOiBlID0gXCJjZW50ZXJcIiksIGUpIHtcbiAgICBjYXNlIFwic3RhcnRcIjpcbiAgICAgIHJldHVybiBjO1xuICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgIHJldHVybiBkO1xuICAgIGNhc2UgXCJjZW50ZXJcIjpcbiAgICAgIHJldHVybiBsLnNjcm9sbE9mZnNldCA8PSBpIC8gMiA/IDAgOiBsLnNjcm9sbE9mZnNldCArIGwuc2l6ZSAvIDIgPj0gZiAtIGkgLyAyID8gZiAtIGkgOiBsLnNjcm9sbE9mZnNldCArIGwuc2l6ZSAvIDIgLSBpIC8gMjtcbiAgICBjYXNlIFwiYXV0b1wiOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbyA+PSBkICYmIG8gPD0gYyA/IG8gOiBvIDwgZCA/IGQgOiBjO1xuICB9XG59XG5mdW5jdGlvbiBQKHtcbiAgY2FjaGVkQm91bmRzOiBlLFxuICBjb250YWluZXJTY3JvbGxPZmZzZXQ6IHQsXG4gIGNvbnRhaW5lclNpemU6IHMsXG4gIGl0ZW1Db3VudDogcixcbiAgb3ZlcnNjYW5Db3VudDogblxufSkge1xuICBjb25zdCBvID0gciAtIDE7XG4gIGxldCBpID0gMCwgZiA9IC0xLCBsID0gMCwgYyA9IC0xLCBkID0gMDtcbiAgZm9yICg7IGQgPCBvOyApIHtcbiAgICBjb25zdCBhID0gZS5nZXQoZCk7XG4gICAgaWYgKGEuc2Nyb2xsT2Zmc2V0ICsgYS5zaXplID4gdClcbiAgICAgIGJyZWFrO1xuICAgIGQrKztcbiAgfVxuICBmb3IgKGkgPSBkLCBsID0gTWF0aC5tYXgoMCwgaSAtIG4pOyBkIDwgbzsgKSB7XG4gICAgY29uc3QgYSA9IGUuZ2V0KGQpO1xuICAgIGlmIChhLnNjcm9sbE9mZnNldCArIGEuc2l6ZSA+PSB0ICsgcylcbiAgICAgIGJyZWFrO1xuICAgIGQrKztcbiAgfVxuICByZXR1cm4gZiA9IE1hdGgubWluKG8sIGQpLCBjID0gTWF0aC5taW4ociAtIDEsIGYgKyBuKSwgaSA8IDAgJiYgKGkgPSAwLCBmID0gLTEsIGwgPSAwLCBjID0gLTEpLCB7XG4gICAgc3RhcnRJbmRleFZpc2libGU6IGksXG4gICAgc3RvcEluZGV4VmlzaWJsZTogZixcbiAgICBzdGFydEluZGV4T3ZlcnNjYW46IGwsXG4gICAgc3RvcEluZGV4T3ZlcnNjYW46IGNcbiAgfTtcbn1cbmZ1bmN0aW9uIG1lKHtcbiAgaXRlbUNvdW50OiBlLFxuICBpdGVtUHJvcHM6IHQsXG4gIGl0ZW1TaXplOiBzXG59KSB7XG4gIGNvbnN0IHIgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICByZXR1cm4ge1xuICAgIGdldChuKSB7XG4gICAgICBmb3IgKEwobiA8IGUsIGBJbnZhbGlkIGluZGV4ICR7bn1gKTsgci5zaXplIC0gMSA8IG47ICkge1xuICAgICAgICBjb25zdCBpID0gci5zaXplO1xuICAgICAgICBsZXQgZjtcbiAgICAgICAgc3dpdGNoICh0eXBlb2Ygcykge1xuICAgICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOiB7XG4gICAgICAgICAgICBmID0gcyhpLCB0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6IHtcbiAgICAgICAgICAgIGYgPSBzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAwKVxuICAgICAgICAgIHIuc2V0KGksIHtcbiAgICAgICAgICAgIHNpemU6IGYsXG4gICAgICAgICAgICBzY3JvbGxPZmZzZXQ6IDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgbCA9IHIuZ2V0KGkgLSAxKTtcbiAgICAgICAgICBMKFxuICAgICAgICAgICAgbCAhPT0gdm9pZCAwLFxuICAgICAgICAgICAgYFVuZXhwZWN0ZWQgYm91bmRzIGNhY2hlIG1pc3MgZm9yIGluZGV4ICR7bn1gXG4gICAgICAgICAgKSwgci5zZXQoaSwge1xuICAgICAgICAgICAgc2Nyb2xsT2Zmc2V0OiBsLnNjcm9sbE9mZnNldCArIGwuc2l6ZSxcbiAgICAgICAgICAgIHNpemU6IGZcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgbyA9IHIuZ2V0KG4pO1xuICAgICAgcmV0dXJuIEwoXG4gICAgICAgIG8gIT09IHZvaWQgMCxcbiAgICAgICAgYFVuZXhwZWN0ZWQgYm91bmRzIGNhY2hlIG1pc3MgZm9yIGluZGV4ICR7bn1gXG4gICAgICApLCBvO1xuICAgIH0sXG4gICAgc2V0KG4sIG8pIHtcbiAgICAgIHIuc2V0KG4sIG8pO1xuICAgIH0sXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICByZXR1cm4gci5zaXplO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIE9lKHtcbiAgaXRlbUNvdW50OiBlLFxuICBpdGVtUHJvcHM6IHQsXG4gIGl0ZW1TaXplOiBzXG59KSB7XG4gIHJldHVybiBBKFxuICAgICgpID0+IG1lKHtcbiAgICAgIGl0ZW1Db3VudDogZSxcbiAgICAgIGl0ZW1Qcm9wczogdCxcbiAgICAgIGl0ZW1TaXplOiBzXG4gICAgfSksXG4gICAgW2UsIHQsIHNdXG4gICk7XG59XG5mdW5jdGlvbiB5ZSh7XG4gIGNvbnRhaW5lclNpemU6IGUsXG4gIGl0ZW1TaXplOiB0XG59KSB7XG4gIGxldCBzO1xuICBzd2l0Y2ggKHR5cGVvZiB0KSB7XG4gICAgY2FzZSBcInN0cmluZ1wiOiB7XG4gICAgICBMKFxuICAgICAgICB0LmVuZHNXaXRoKFwiJVwiKSxcbiAgICAgICAgYEludmFsaWQgaXRlbSBzaXplOiBcIiR7dH1cIjsgc3RyaW5nIHZhbHVlcyBtdXN0IGJlIHBlcmNlbnRhZ2VzIChlLmcuIFwiMTAwJVwiKWBcbiAgICAgICksIEwoXG4gICAgICAgIGUgIT09IHZvaWQgMCxcbiAgICAgICAgXCJDb250YWluZXIgc2l6ZSBtdXN0IGJlIGRlZmluZWQgaWYgYSBwZXJjZW50YWdlIGl0ZW0gc2l6ZSBpcyBzcGVjaWZpZWRcIlxuICAgICAgKSwgcyA9IGUgKiBwYXJzZUludCh0KSAvIDEwMDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBzID0gdDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcztcbn1cbmZ1bmN0aW9uIHRlKHtcbiAgY29udGFpbmVyRWxlbWVudDogZSxcbiAgY29udGFpbmVyU3R5bGU6IHQsXG4gIGRlZmF1bHRDb250YWluZXJTaXplOiBzID0gMCxcbiAgZGlyZWN0aW9uOiByLFxuICBpc1J0bDogbiA9ICExLFxuICBpdGVtQ291bnQ6IG8sXG4gIGl0ZW1Qcm9wczogaSxcbiAgaXRlbVNpemU6IGYsXG4gIG9uUmVzaXplOiBsLFxuICBvdmVyc2NhbkNvdW50OiBjXG59KSB7XG4gIGNvbnN0IHsgaGVpZ2h0OiBkID0gcywgd2lkdGg6IGEgPSBzIH0gPSBiZSh7XG4gICAgZGVmYXVsdEhlaWdodDogciA9PT0gXCJ2ZXJ0aWNhbFwiID8gcyA6IHZvaWQgMCxcbiAgICBkZWZhdWx0V2lkdGg6IHIgPT09IFwiaG9yaXpvbnRhbFwiID8gcyA6IHZvaWQgMCxcbiAgICBlbGVtZW50OiBlLFxuICAgIG1vZGU6IHIgPT09IFwidmVydGljYWxcIiA/IFwib25seS1oZWlnaHRcIiA6IFwib25seS13aWR0aFwiLFxuICAgIHN0eWxlOiB0XG4gIH0pLCBoID0gSyh7XG4gICAgaGVpZ2h0OiAwLFxuICAgIHdpZHRoOiAwXG4gIH0pLCBwID0gciA9PT0gXCJ2ZXJ0aWNhbFwiID8gZCA6IGEsIEkgPSB5ZSh7IGNvbnRhaW5lclNpemU6IHAsIGl0ZW1TaXplOiBmIH0pO1xuICByZSgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBsID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc3QgZyA9IGguY3VycmVudDtcbiAgICAgIChnLmhlaWdodCAhPT0gZCB8fCBnLndpZHRoICE9PSBhKSAmJiAobCh7IGhlaWdodDogZCwgd2lkdGg6IGEgfSwgeyAuLi5nIH0pLCBnLmhlaWdodCA9IGQsIGcud2lkdGggPSBhKTtcbiAgICB9XG4gIH0sIFtkLCBsLCBhXSk7XG4gIGNvbnN0IHUgPSBPZSh7XG4gICAgaXRlbUNvdW50OiBvLFxuICAgIGl0ZW1Qcm9wczogaSxcbiAgICBpdGVtU2l6ZTogSVxuICB9KSwgdyA9IEQoXG4gICAgKGcpID0+IHUuZ2V0KGcpLFxuICAgIFt1XVxuICApLCBbbSwgT10gPSBNKFxuICAgICgpID0+IFAoe1xuICAgICAgY2FjaGVkQm91bmRzOiB1LFxuICAgICAgLy8gVE9ETyBQb3RlbnRpYWxseSBzdXBwb3J0IGEgZGVmYXVsdFNjcm9sbE9mZnNldCBwcm9wP1xuICAgICAgY29udGFpbmVyU2Nyb2xsT2Zmc2V0OiAwLFxuICAgICAgY29udGFpbmVyU2l6ZTogcCxcbiAgICAgIGl0ZW1Db3VudDogbyxcbiAgICAgIG92ZXJzY2FuQ291bnQ6IGNcbiAgICB9KVxuICApLCB7XG4gICAgc3RhcnRJbmRleFZpc2libGU6IEcsXG4gICAgc3RhcnRJbmRleE92ZXJzY2FuOiB4LFxuICAgIHN0b3BJbmRleFZpc2libGU6IEYsXG4gICAgc3RvcEluZGV4T3ZlcnNjYW46IFZcbiAgfSA9IHtcbiAgICBzdGFydEluZGV4VmlzaWJsZTogTWF0aC5taW4obyAtIDEsIG0uc3RhcnRJbmRleFZpc2libGUpLFxuICAgIHN0YXJ0SW5kZXhPdmVyc2NhbjogTWF0aC5taW4obyAtIDEsIG0uc3RhcnRJbmRleE92ZXJzY2FuKSxcbiAgICBzdG9wSW5kZXhWaXNpYmxlOiBNYXRoLm1pbihvIC0gMSwgbS5zdG9wSW5kZXhWaXNpYmxlKSxcbiAgICBzdG9wSW5kZXhPdmVyc2NhbjogTWF0aC5taW4obyAtIDEsIG0uc3RvcEluZGV4T3ZlcnNjYW4pXG4gIH0sIHogPSBEKFxuICAgICgpID0+IGZlKHtcbiAgICAgIGNhY2hlZEJvdW5kczogdSxcbiAgICAgIGl0ZW1Db3VudDogbyxcbiAgICAgIGl0ZW1TaXplOiBJXG4gICAgfSksXG4gICAgW3UsIG8sIEldXG4gICksICQgPSBEKFxuICAgIChnKSA9PiB7XG4gICAgICBjb25zdCBTID0gWih7XG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQ6IGUsXG4gICAgICAgIGRpcmVjdGlvbjogcixcbiAgICAgICAgaXNSdGw6IG4sXG4gICAgICAgIHNjcm9sbE9mZnNldDogZ1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gUCh7XG4gICAgICAgIGNhY2hlZEJvdW5kczogdSxcbiAgICAgICAgY29udGFpbmVyU2Nyb2xsT2Zmc2V0OiBTLFxuICAgICAgICBjb250YWluZXJTaXplOiBwLFxuICAgICAgICBpdGVtQ291bnQ6IG8sXG4gICAgICAgIG92ZXJzY2FuQ291bnQ6IGNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW1xuICAgICAgdSxcbiAgICAgIGUsXG4gICAgICBwLFxuICAgICAgcixcbiAgICAgIG4sXG4gICAgICBvLFxuICAgICAgY1xuICAgIF1cbiAgKTtcbiAgcSgoKSA9PiB7XG4gICAgY29uc3QgZyA9IChyID09PSBcInZlcnRpY2FsXCIgPyBlPy5zY3JvbGxUb3AgOiBlPy5zY3JvbGxMZWZ0KSA/PyAwO1xuICAgIE8oJChnKSk7XG4gIH0sIFtlLCByLCAkXSksIHEoKCkgPT4ge1xuICAgIGlmICghZSlcbiAgICAgIHJldHVybjtcbiAgICBjb25zdCBnID0gKCkgPT4ge1xuICAgICAgTygoUykgPT4ge1xuICAgICAgICBjb25zdCB7IHNjcm9sbExlZnQ6IEUsIHNjcm9sbFRvcDogYiB9ID0gZSwgdiA9IFooe1xuICAgICAgICAgIGNvbnRhaW5lckVsZW1lbnQ6IGUsXG4gICAgICAgICAgZGlyZWN0aW9uOiByLFxuICAgICAgICAgIGlzUnRsOiBuLFxuICAgICAgICAgIHNjcm9sbE9mZnNldDogciA9PT0gXCJ2ZXJ0aWNhbFwiID8gYiA6IEVcbiAgICAgICAgfSksIFIgPSBQKHtcbiAgICAgICAgICBjYWNoZWRCb3VuZHM6IHUsXG4gICAgICAgICAgY29udGFpbmVyU2Nyb2xsT2Zmc2V0OiB2LFxuICAgICAgICAgIGNvbnRhaW5lclNpemU6IHAsXG4gICAgICAgICAgaXRlbUNvdW50OiBvLFxuICAgICAgICAgIG92ZXJzY2FuQ291bnQ6IGNcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBZKFIsIFMpID8gUyA6IFI7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBlLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZyksICgpID0+IHtcbiAgICAgIGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBnKTtcbiAgICB9O1xuICB9LCBbXG4gICAgdSxcbiAgICBlLFxuICAgIHAsXG4gICAgcixcbiAgICBvLFxuICAgIGNcbiAgXSk7XG4gIGNvbnN0IHkgPSBhZShcbiAgICAoe1xuICAgICAgYWxpZ246IGcgPSBcImF1dG9cIixcbiAgICAgIGNvbnRhaW5lclNjcm9sbE9mZnNldDogUyxcbiAgICAgIGluZGV4OiBFXG4gICAgfSkgPT4ge1xuICAgICAgbGV0IGIgPSB3ZSh7XG4gICAgICAgIGFsaWduOiBnLFxuICAgICAgICBjYWNoZWRCb3VuZHM6IHUsXG4gICAgICAgIGNvbnRhaW5lclNjcm9sbE9mZnNldDogUyxcbiAgICAgICAgY29udGFpbmVyU2l6ZTogcCxcbiAgICAgICAgaW5kZXg6IEUsXG4gICAgICAgIGl0ZW1Db3VudDogbyxcbiAgICAgICAgaXRlbVNpemU6IElcbiAgICAgIH0pO1xuICAgICAgaWYgKGUpIHtcbiAgICAgICAgaWYgKGIgPSBaKHtcbiAgICAgICAgICBjb250YWluZXJFbGVtZW50OiBlLFxuICAgICAgICAgIGRpcmVjdGlvbjogcixcbiAgICAgICAgICBpc1J0bDogbixcbiAgICAgICAgICBzY3JvbGxPZmZzZXQ6IGJcbiAgICAgICAgfSksIHR5cGVvZiBlLnNjcm9sbFRvICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnN0IHYgPSAkKGIpO1xuICAgICAgICAgIFkobSwgdikgfHwgTyh2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYjtcbiAgICAgIH1cbiAgICB9XG4gICk7XG4gIHJldHVybiB7XG4gICAgZ2V0Q2VsbEJvdW5kczogdyxcbiAgICBnZXRFc3RpbWF0ZWRTaXplOiB6LFxuICAgIHNjcm9sbFRvSW5kZXg6IHksXG4gICAgc3RhcnRJbmRleE92ZXJzY2FuOiB4LFxuICAgIHN0YXJ0SW5kZXhWaXNpYmxlOiBHLFxuICAgIHN0b3BJbmRleE92ZXJzY2FuOiBWLFxuICAgIHN0b3BJbmRleFZpc2libGU6IEZcbiAgfTtcbn1cbmZ1bmN0aW9uIGRlKGUpIHtcbiAgcmV0dXJuIEEoKCkgPT4gZSwgT2JqZWN0LnZhbHVlcyhlKSk7XG59XG5mdW5jdGlvbiB1ZShlLCB0KSB7XG4gIGNvbnN0IHtcbiAgICBhcmlhQXR0cmlidXRlczogcyxcbiAgICBzdHlsZTogcixcbiAgICAuLi5uXG4gIH0gPSBlLCB7XG4gICAgYXJpYUF0dHJpYnV0ZXM6IG8sXG4gICAgc3R5bGU6IGksXG4gICAgLi4uZlxuICB9ID0gdDtcbiAgcmV0dXJuIFkocywgbykgJiYgWShyLCBpKSAmJiBZKG4sIGYpO1xufVxuZnVuY3Rpb24gRWUoe1xuICBjZWxsQ29tcG9uZW50OiBlLFxuICBjZWxsUHJvcHM6IHQsXG4gIGNoaWxkcmVuOiBzLFxuICBjbGFzc05hbWU6IHIsXG4gIGNvbHVtbkNvdW50OiBuLFxuICBjb2x1bW5XaWR0aDogbyxcbiAgZGVmYXVsdEhlaWdodDogaSA9IDAsXG4gIGRlZmF1bHRXaWR0aDogZiA9IDAsXG4gIGRpcjogbCxcbiAgZ3JpZFJlZjogYyxcbiAgb25DZWxsc1JlbmRlcmVkOiBkLFxuICBvblJlc2l6ZTogYSxcbiAgb3ZlcnNjYW5Db3VudDogaCA9IDMsXG4gIHJvd0NvdW50OiBwLFxuICByb3dIZWlnaHQ6IEksXG4gIHN0eWxlOiB1LFxuICB0YWdOYW1lOiB3ID0gXCJkaXZcIixcbiAgLi4ubVxufSkge1xuICBjb25zdCBPID0gZGUodCksIEcgPSBBKFxuICAgICgpID0+IGxlKGUsIHVlKSxcbiAgICBbZV1cbiAgKSwgW3gsIEZdID0gTShudWxsKSwgViA9IHZlKHgsIGwpLCB7XG4gICAgZ2V0Q2VsbEJvdW5kczogeixcbiAgICBnZXRFc3RpbWF0ZWRTaXplOiAkLFxuICAgIHN0YXJ0SW5kZXhPdmVyc2NhbjogeSxcbiAgICBzdGFydEluZGV4VmlzaWJsZTogZyxcbiAgICBzY3JvbGxUb0luZGV4OiBTLFxuICAgIHN0b3BJbmRleE92ZXJzY2FuOiBFLFxuICAgIHN0b3BJbmRleFZpc2libGU6IGJcbiAgfSA9IHRlKHtcbiAgICBjb250YWluZXJFbGVtZW50OiB4LFxuICAgIGNvbnRhaW5lclN0eWxlOiB1LFxuICAgIGRlZmF1bHRDb250YWluZXJTaXplOiBmLFxuICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgaXNSdGw6IFYsXG4gICAgaXRlbUNvdW50OiBuLFxuICAgIGl0ZW1Qcm9wczogTyxcbiAgICBpdGVtU2l6ZTogbyxcbiAgICBvblJlc2l6ZTogYSxcbiAgICBvdmVyc2NhbkNvdW50OiBoXG4gIH0pLCB7XG4gICAgZ2V0Q2VsbEJvdW5kczogdixcbiAgICBnZXRFc3RpbWF0ZWRTaXplOiBSLFxuICAgIHN0YXJ0SW5kZXhPdmVyc2NhbjogayxcbiAgICBzdGFydEluZGV4VmlzaWJsZTogbmUsXG4gICAgc2Nyb2xsVG9JbmRleDogUSxcbiAgICBzdG9wSW5kZXhPdmVyc2NhbjogXyxcbiAgICBzdG9wSW5kZXhWaXNpYmxlOiBvZVxuICB9ID0gdGUoe1xuICAgIGNvbnRhaW5lckVsZW1lbnQ6IHgsXG4gICAgY29udGFpbmVyU3R5bGU6IHUsXG4gICAgZGVmYXVsdENvbnRhaW5lclNpemU6IGksXG4gICAgZGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsXG4gICAgaXRlbUNvdW50OiBwLFxuICAgIGl0ZW1Qcm9wczogTyxcbiAgICBpdGVtU2l6ZTogSSxcbiAgICBvblJlc2l6ZTogYSxcbiAgICBvdmVyc2NhbkNvdW50OiBoXG4gIH0pO1xuICBjZShcbiAgICBjLFxuICAgICgpID0+ICh7XG4gICAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgICB9LFxuICAgICAgc2Nyb2xsVG9DZWxsKHtcbiAgICAgICAgYmVoYXZpb3I6IEggPSBcImF1dG9cIixcbiAgICAgICAgY29sdW1uQWxpZ246IFQgPSBcImF1dG9cIixcbiAgICAgICAgY29sdW1uSW5kZXg6IFcsXG4gICAgICAgIHJvd0FsaWduOiBCID0gXCJhdXRvXCIsXG4gICAgICAgIHJvd0luZGV4OiBqXG4gICAgICB9KSB7XG4gICAgICAgIGNvbnN0IE4gPSBTKHtcbiAgICAgICAgICBhbGlnbjogVCxcbiAgICAgICAgICBjb250YWluZXJTY3JvbGxPZmZzZXQ6IHg/LnNjcm9sbExlZnQgPz8gMCxcbiAgICAgICAgICBpbmRleDogV1xuICAgICAgICB9KSwgZ2UgPSBRKHtcbiAgICAgICAgICBhbGlnbjogQixcbiAgICAgICAgICBjb250YWluZXJTY3JvbGxPZmZzZXQ6IHg/LnNjcm9sbFRvcCA/PyAwLFxuICAgICAgICAgIGluZGV4OiBqXG4gICAgICAgIH0pO1xuICAgICAgICB0eXBlb2YgeD8uc2Nyb2xsVG8gPT0gXCJmdW5jdGlvblwiICYmIHguc2Nyb2xsVG8oe1xuICAgICAgICAgIGJlaGF2aW9yOiBILFxuICAgICAgICAgIGxlZnQ6IE4sXG4gICAgICAgICAgdG9wOiBnZVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzY3JvbGxUb0NvbHVtbih7XG4gICAgICAgIGFsaWduOiBIID0gXCJhdXRvXCIsXG4gICAgICAgIGJlaGF2aW9yOiBUID0gXCJhdXRvXCIsXG4gICAgICAgIGluZGV4OiBXXG4gICAgICB9KSB7XG4gICAgICAgIGNvbnN0IEIgPSBTKHtcbiAgICAgICAgICBhbGlnbjogSCxcbiAgICAgICAgICBjb250YWluZXJTY3JvbGxPZmZzZXQ6IHg/LnNjcm9sbExlZnQgPz8gMCxcbiAgICAgICAgICBpbmRleDogV1xuICAgICAgICB9KTtcbiAgICAgICAgdHlwZW9mIHg/LnNjcm9sbFRvID09IFwiZnVuY3Rpb25cIiAmJiB4LnNjcm9sbFRvKHtcbiAgICAgICAgICBiZWhhdmlvcjogVCxcbiAgICAgICAgICBsZWZ0OiBCXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHNjcm9sbFRvUm93KHtcbiAgICAgICAgYWxpZ246IEggPSBcImF1dG9cIixcbiAgICAgICAgYmVoYXZpb3I6IFQgPSBcImF1dG9cIixcbiAgICAgICAgaW5kZXg6IFdcbiAgICAgIH0pIHtcbiAgICAgICAgY29uc3QgQiA9IFEoe1xuICAgICAgICAgIGFsaWduOiBILFxuICAgICAgICAgIGNvbnRhaW5lclNjcm9sbE9mZnNldDogeD8uc2Nyb2xsVG9wID8/IDAsXG4gICAgICAgICAgaW5kZXg6IFdcbiAgICAgICAgfSk7XG4gICAgICAgIHR5cGVvZiB4Py5zY3JvbGxUbyA9PSBcImZ1bmN0aW9uXCIgJiYgeC5zY3JvbGxUbyh7XG4gICAgICAgICAgYmVoYXZpb3I6IFQsXG4gICAgICAgICAgdG9wOiBCXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pLFxuICAgIFt4LCBTLCBRXVxuICApLCBKKCgpID0+IHtcbiAgICB5ID49IDAgJiYgRSA+PSAwICYmIGsgPj0gMCAmJiBfID49IDAgJiYgZCAmJiBkKFxuICAgICAge1xuICAgICAgICBjb2x1bW5TdGFydEluZGV4OiBnLFxuICAgICAgICBjb2x1bW5TdG9wSW5kZXg6IGIsXG4gICAgICAgIHJvd1N0YXJ0SW5kZXg6IG5lLFxuICAgICAgICByb3dTdG9wSW5kZXg6IG9lXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb2x1bW5TdGFydEluZGV4OiB5LFxuICAgICAgICBjb2x1bW5TdG9wSW5kZXg6IEUsXG4gICAgICAgIHJvd1N0YXJ0SW5kZXg6IGssXG4gICAgICAgIHJvd1N0b3BJbmRleDogX1xuICAgICAgfVxuICAgICk7XG4gIH0sIFtcbiAgICBkLFxuICAgIHksXG4gICAgZyxcbiAgICBFLFxuICAgIGIsXG4gICAgayxcbiAgICBuZSxcbiAgICBfLFxuICAgIG9lXG4gIF0pO1xuICBjb25zdCBoZSA9IEEoKCkgPT4ge1xuICAgIGNvbnN0IEggPSBbXTtcbiAgICBpZiAobiA+IDAgJiYgcCA+IDApXG4gICAgICBmb3IgKGxldCBUID0gazsgVCA8PSBfOyBUKyspIHtcbiAgICAgICAgY29uc3QgVyA9IHYoVCksIEIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IHk7IGogPD0gRTsgaisrKSB7XG4gICAgICAgICAgY29uc3QgTiA9IHooaik7XG4gICAgICAgICAgQi5wdXNoKFxuICAgICAgICAgICAgLyogQF9fUFVSRV9fICovIFgoXG4gICAgICAgICAgICAgIEcsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAuLi5PLFxuICAgICAgICAgICAgICAgIGFyaWFBdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICBcImFyaWEtY29saW5kZXhcIjogaiArIDEsXG4gICAgICAgICAgICAgICAgICByb2xlOiBcImdyaWRjZWxsXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4OiBqLFxuICAgICAgICAgICAgICAgIGtleTogaixcbiAgICAgICAgICAgICAgICByb3dJbmRleDogVCxcbiAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IFYgPyB2b2lkIDAgOiAwLFxuICAgICAgICAgICAgICAgICAgcmlnaHQ6IFYgPyAwIDogdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7ViA/IC1OLnNjcm9sbE9mZnNldCA6IE4uc2Nyb2xsT2Zmc2V0fXB4LCAke1cuc2Nyb2xsT2Zmc2V0fXB4KWAsXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IFcuc2l6ZSxcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBOLnNpemVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIEgucHVzaChcbiAgICAgICAgICAvKiBAX19QVVJFX18gKi8gZWUoXCJkaXZcIiwgeyByb2xlOiBcInJvd1wiLCBcImFyaWEtcm93aW5kZXhcIjogVCArIDEsIGNoaWxkcmVuOiBCIH0sIFQpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgcmV0dXJuIEg7XG4gIH0sIFtcbiAgICBHLFxuICAgIE8sXG4gICAgbixcbiAgICB5LFxuICAgIEUsXG4gICAgeixcbiAgICB2LFxuICAgIFYsXG4gICAgcCxcbiAgICBrLFxuICAgIF9cbiAgXSksIHBlID0gLyogQF9fUFVSRV9fICovIGVlKFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgXCJhcmlhLWhpZGRlblwiOiAhMCxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGhlaWdodDogUigpLFxuICAgICAgICB3aWR0aDogJCgpLFxuICAgICAgICB6SW5kZXg6IC0xXG4gICAgICB9XG4gICAgfVxuICApO1xuICByZXR1cm4gWChcbiAgICB3LFxuICAgIHtcbiAgICAgIFwiYXJpYS1jb2xjb3VudFwiOiBuLFxuICAgICAgXCJhcmlhLXJvd2NvdW50XCI6IHAsXG4gICAgICByb2xlOiBcImdyaWRcIixcbiAgICAgIC4uLm0sXG4gICAgICBjbGFzc05hbWU6IHIsXG4gICAgICBkaXI6IGwsXG4gICAgICByZWY6IEYsXG4gICAgICBzdHlsZToge1xuICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICBtYXhIZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICBtYXhXaWR0aDogXCIxMDAlXCIsXG4gICAgICAgIGZsZXhHcm93OiAxLFxuICAgICAgICBvdmVyZmxvdzogXCJhdXRvXCIsXG4gICAgICAgIC4uLnVcbiAgICAgIH1cbiAgICB9LFxuICAgIGhlLFxuICAgIHMsXG4gICAgcGVcbiAgKTtcbn1cbmNvbnN0IFJlID0gTSwgVmUgPSBLO1xuZnVuY3Rpb24gemUoZSkge1xuICByZXR1cm4gZSAhPSBudWxsICYmIHR5cGVvZiBlID09IFwib2JqZWN0XCIgJiYgXCJnZXRBdmVyYWdlUm93SGVpZ2h0XCIgaW4gZSAmJiB0eXBlb2YgZS5nZXRBdmVyYWdlUm93SGVpZ2h0ID09IFwiZnVuY3Rpb25cIjtcbn1cbmNvbnN0IHNlID0gXCJkYXRhLXJlYWN0LXdpbmRvdy1pbmRleFwiO1xuZnVuY3Rpb24gQWUoe1xuICBjaGlsZHJlbjogZSxcbiAgY2xhc3NOYW1lOiB0LFxuICBkZWZhdWx0SGVpZ2h0OiBzID0gMCxcbiAgbGlzdFJlZjogcixcbiAgb25SZXNpemU6IG4sXG4gIG9uUm93c1JlbmRlcmVkOiBvLFxuICBvdmVyc2NhbkNvdW50OiBpID0gMyxcbiAgcm93Q29tcG9uZW50OiBmLFxuICByb3dDb3VudDogbCxcbiAgcm93SGVpZ2h0OiBjLFxuICByb3dQcm9wczogZCxcbiAgdGFnTmFtZTogYSA9IFwiZGl2XCIsXG4gIHN0eWxlOiBoLFxuICAuLi5wXG59KSB7XG4gIGNvbnN0IEkgPSBkZShkKSwgdSA9IEEoXG4gICAgKCkgPT4gbGUoZiwgdWUpLFxuICAgIFtmXVxuICApLCBbdywgbV0gPSBNKG51bGwpLCBPID0gemUoYyksIEcgPSBBKCgpID0+IE8gPyAoYikgPT4gYy5nZXRSb3dIZWlnaHQoYikgPz8gYy5nZXRBdmVyYWdlUm93SGVpZ2h0KCkgOiBjLCBbTywgY10pLCB7XG4gICAgZ2V0Q2VsbEJvdW5kczogeCxcbiAgICBnZXRFc3RpbWF0ZWRTaXplOiBGLFxuICAgIHNjcm9sbFRvSW5kZXg6IFYsXG4gICAgc3RhcnRJbmRleE92ZXJzY2FuOiB6LFxuICAgIHN0YXJ0SW5kZXhWaXNpYmxlOiAkLFxuICAgIHN0b3BJbmRleE92ZXJzY2FuOiB5LFxuICAgIHN0b3BJbmRleFZpc2libGU6IGdcbiAgfSA9IHRlKHtcbiAgICBjb250YWluZXJFbGVtZW50OiB3LFxuICAgIGNvbnRhaW5lclN0eWxlOiBoLFxuICAgIGRlZmF1bHRDb250YWluZXJTaXplOiBzLFxuICAgIGRpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxuICAgIGl0ZW1Db3VudDogbCxcbiAgICBpdGVtUHJvcHM6IEksXG4gICAgaXRlbVNpemU6IEcsXG4gICAgb25SZXNpemU6IG4sXG4gICAgb3ZlcnNjYW5Db3VudDogaVxuICB9KTtcbiAgY2UoXG4gICAgcixcbiAgICAoKSA9PiAoe1xuICAgICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB3O1xuICAgICAgfSxcbiAgICAgIHNjcm9sbFRvUm93KHtcbiAgICAgICAgYWxpZ246IGIgPSBcImF1dG9cIixcbiAgICAgICAgYmVoYXZpb3I6IHYgPSBcImF1dG9cIixcbiAgICAgICAgaW5kZXg6IFJcbiAgICAgIH0pIHtcbiAgICAgICAgY29uc3QgayA9IFYoe1xuICAgICAgICAgIGFsaWduOiBiLFxuICAgICAgICAgIGNvbnRhaW5lclNjcm9sbE9mZnNldDogdz8uc2Nyb2xsVG9wID8/IDAsXG4gICAgICAgICAgaW5kZXg6IFJcbiAgICAgICAgfSk7XG4gICAgICAgIHR5cGVvZiB3Py5zY3JvbGxUbyA9PSBcImZ1bmN0aW9uXCIgJiYgdy5zY3JvbGxUbyh7XG4gICAgICAgICAgYmVoYXZpb3I6IHYsXG4gICAgICAgICAgdG9wOiBrXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pLFxuICAgIFt3LCBWXVxuICApLCBxKCgpID0+IHtcbiAgICBpZiAoIXcpXG4gICAgICByZXR1cm47XG4gICAgY29uc3QgYiA9IEFycmF5LmZyb20ody5jaGlsZHJlbikuZmlsdGVyKCh2LCBSKSA9PiB7XG4gICAgICBpZiAodi5oYXNBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKSlcbiAgICAgICAgcmV0dXJuICExO1xuICAgICAgY29uc3QgayA9IGAke3ogKyBSfWA7XG4gICAgICByZXR1cm4gdi5zZXRBdHRyaWJ1dGUoc2UsIGspLCAhMDtcbiAgICB9KTtcbiAgICBpZiAoTylcbiAgICAgIHJldHVybiBjLm9ic2VydmVSb3dFbGVtZW50cyhiKTtcbiAgfSwgW1xuICAgIHcsXG4gICAgTyxcbiAgICBjLFxuICAgIHosXG4gICAgeVxuICBdKSwgSigoKSA9PiB7XG4gICAgeiA+PSAwICYmIHkgPj0gMCAmJiBvICYmIG8oXG4gICAgICB7XG4gICAgICAgIHN0YXJ0SW5kZXg6ICQsXG4gICAgICAgIHN0b3BJbmRleDogZ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3RhcnRJbmRleDogeixcbiAgICAgICAgc3RvcEluZGV4OiB5XG4gICAgICB9XG4gICAgKTtcbiAgfSwgW1xuICAgIG8sXG4gICAgeixcbiAgICAkLFxuICAgIHksXG4gICAgZ1xuICBdKTtcbiAgY29uc3QgUyA9IEEoKCkgPT4ge1xuICAgIGNvbnN0IGIgPSBbXTtcbiAgICBpZiAobCA+IDApXG4gICAgICBmb3IgKGxldCB2ID0gejsgdiA8PSB5OyB2KyspIHtcbiAgICAgICAgY29uc3QgUiA9IHgodik7XG4gICAgICAgIGIucHVzaChcbiAgICAgICAgICAvKiBAX19QVVJFX18gKi8gWChcbiAgICAgICAgICAgIHUsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC4uLkksXG4gICAgICAgICAgICAgIGFyaWFBdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgXCJhcmlhLXBvc2luc2V0XCI6IHYgKyAxLFxuICAgICAgICAgICAgICAgIFwiYXJpYS1zZXRzaXplXCI6IGwsXG4gICAgICAgICAgICAgICAgcm9sZTogXCJsaXN0aXRlbVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGtleTogdixcbiAgICAgICAgICAgICAgaW5kZXg6IHYsXG4gICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHtSLnNjcm9sbE9mZnNldH1weClgLFxuICAgICAgICAgICAgICAgIC8vIEluIGNhc2Ugb2YgZHluYW1pYyByb3cgaGVpZ2h0cywgZG9uJ3Qgc3BlY2lmeSBhIGhlaWdodCBzdHlsZVxuICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSBhIGRlZmF1bHQvZXN0aW1hdGVkIGhlaWdodCB3b3VsZCBtYXNrIHRoZSBhY3R1YWwgaGVpZ2h0XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBPID8gdm9pZCAwIDogUi5zaXplLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIHJldHVybiBiO1xuICB9LCBbXG4gICAgdSxcbiAgICB4LFxuICAgIE8sXG4gICAgbCxcbiAgICBJLFxuICAgIHosXG4gICAgeVxuICBdKSwgRSA9IC8qIEBfX1BVUkVfXyAqLyBlZShcbiAgICBcImRpdlwiLFxuICAgIHtcbiAgICAgIFwiYXJpYS1oaWRkZW5cIjogITAsXG4gICAgICBzdHlsZToge1xuICAgICAgICBoZWlnaHQ6IEYoKSxcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICB6SW5kZXg6IC0xXG4gICAgICB9XG4gICAgfVxuICApO1xuICByZXR1cm4gWChcbiAgICBhLFxuICAgIHtcbiAgICAgIHJvbGU6IFwibGlzdFwiLFxuICAgICAgLi4ucCxcbiAgICAgIGNsYXNzTmFtZTogdCxcbiAgICAgIHJlZjogbSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgIG1heEhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgIGZsZXhHcm93OiAxLFxuICAgICAgICBvdmVyZmxvd1k6IFwiYXV0b1wiLFxuICAgICAgICAuLi5oXG4gICAgICB9XG4gICAgfSxcbiAgICBTLFxuICAgIGUsXG4gICAgRVxuICApO1xufVxuZnVuY3Rpb24ga2Uoe1xuICBkZWZhdWx0Um93SGVpZ2h0OiBlLFxuICBrZXk6IHRcbn0pIHtcbiAgY29uc3QgW3MsIHJdID0gTSh7XG4gICAga2V5OiB0LFxuICAgIG1hcDogLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKVxuICB9KTtcbiAgcy5rZXkgIT09IHQgJiYgcih7XG4gICAga2V5OiB0LFxuICAgIG1hcDogLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKVxuICB9KTtcbiAgY29uc3QgeyBtYXA6IG4gfSA9IHMsIG8gPSBEKCgpID0+IHtcbiAgICBsZXQgYSA9IDA7XG4gICAgcmV0dXJuIG4uZm9yRWFjaCgoaCkgPT4ge1xuICAgICAgYSArPSBoO1xuICAgIH0pLCBhID09PSAwID8gZSA6IGEgLyBuLnNpemU7XG4gIH0sIFtlLCBuXSksIGkgPSBEKFxuICAgIChhKSA9PiB7XG4gICAgICBjb25zdCBoID0gbi5nZXQoYSk7XG4gICAgICByZXR1cm4gaCAhPT0gdm9pZCAwID8gaCA6IChuLnNldChhLCBlKSwgZSk7XG4gICAgfSxcbiAgICBbZSwgbl1cbiAgKSwgZiA9IEQoKGEsIGgpID0+IHtcbiAgICByKChwKSA9PiB7XG4gICAgICBpZiAocC5tYXAuZ2V0KGEpID09PSBoKVxuICAgICAgICByZXR1cm4gcDtcbiAgICAgIGNvbnN0IEkgPSBuZXcgTWFwKHAubWFwKTtcbiAgICAgIHJldHVybiBJLnNldChhLCBoKSwge1xuICAgICAgICAuLi5wLFxuICAgICAgICBtYXA6IElcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sIFtdKSwgbCA9IGFlKFxuICAgIChhKSA9PiB7XG4gICAgICBhLmxlbmd0aCAhPT0gMCAmJiBhLmZvckVhY2goKGgpID0+IHtcbiAgICAgICAgY29uc3QgeyBib3JkZXJCb3hTaXplOiBwLCB0YXJnZXQ6IEkgfSA9IGgsIHUgPSBJLmdldEF0dHJpYnV0ZShzZSk7XG4gICAgICAgIEwoXG4gICAgICAgICAgdSAhPT0gbnVsbCxcbiAgICAgICAgICBgSW52YWxpZCAke3NlfSBhdHRyaWJ1dGUgdmFsdWVgXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHcgPSBwYXJzZUludCh1KSwgeyBibG9ja1NpemU6IG0gfSA9IHBbMF07XG4gICAgICAgIG0gJiYgZih3LCBtKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgKSwgW2NdID0gTSgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciA8IFwidVwiKVxuICAgICAgcmV0dXJuIG5ldyBSZXNpemVPYnNlcnZlcihsKTtcbiAgfSk7XG4gIEooKCkgPT4ge1xuICAgIGlmIChjKVxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgYy5kaXNjb25uZWN0KCk7XG4gICAgICB9O1xuICB9LCBbY10pO1xuICBjb25zdCBkID0gRChcbiAgICAoYSkgPT4gYyA/IChhLmZvckVhY2goKGgpID0+IGMub2JzZXJ2ZShoKSksICgpID0+IHtcbiAgICAgIGEuZm9yRWFjaCgoaCkgPT4gYy51bm9ic2VydmUoaCkpO1xuICAgIH0pIDogKCkgPT4ge1xuICAgIH0sXG4gICAgW2NdXG4gICk7XG4gIHJldHVybiBBKFxuICAgICgpID0+ICh7XG4gICAgICBnZXRBdmVyYWdlUm93SGVpZ2h0OiBvLFxuICAgICAgZ2V0Um93SGVpZ2h0OiBpLFxuICAgICAgc2V0Um93SGVpZ2h0OiBmLFxuICAgICAgb2JzZXJ2ZVJvd0VsZW1lbnRzOiBkXG4gICAgfSksXG4gICAgW28sIGksIGYsIGRdXG4gICk7XG59XG5jb25zdCBMZSA9IE0sIE1lID0gSztcbmxldCBDID0gLTE7XG5mdW5jdGlvbiAkZShlID0gITEpIHtcbiAgaWYgKEMgPT09IC0xIHx8IGUpIHtcbiAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgcyA9IHQuc3R5bGU7XG4gICAgcy53aWR0aCA9IFwiNTBweFwiLCBzLmhlaWdodCA9IFwiNTBweFwiLCBzLm92ZXJmbG93ID0gXCJzY3JvbGxcIiwgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0KSwgQyA9IHQub2Zmc2V0V2lkdGggLSB0LmNsaWVudFdpZHRoLCBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHQpO1xuICB9XG4gIHJldHVybiBDO1xufVxuZXhwb3J0IHtcbiAgRWUgYXMgR3JpZCxcbiAgQWUgYXMgTGlzdCxcbiAgJGUgYXMgZ2V0U2Nyb2xsYmFyU2l6ZSxcbiAga2UgYXMgdXNlRHluYW1pY1Jvd0hlaWdodCxcbiAgUmUgYXMgdXNlR3JpZENhbGxiYWNrUmVmLFxuICBWZSBhcyB1c2VHcmlkUmVmLFxuICBMZSBhcyB1c2VMaXN0Q2FsbGJhY2tSZWYsXG4gIE1lIGFzIHVzZUxpc3RSZWZcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFjdC13aW5kb3cuanMubWFwXG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XG4gIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBhciA9IFtdO1xuICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XG4gICAgcmV0dXJuIGFyO1xuICB9O1xuICByZXR1cm4gb3duS2V5cyhvKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XG4gIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xuICAgIGlmIChhc3luYykge1xuICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xuICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcbiAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcbiAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xuICB9XG4gIGVsc2UgaWYgKGFzeW5jKSB7XG4gICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcbiAgZnVuY3Rpb24gZmFpbChlKSB7XG4gICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xuICAgIGVudi5oYXNFcnJvciA9IHRydWU7XG4gIH1cbiAgdmFyIHIsIHMgPSAwO1xuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcbiAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcbiAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgcyB8PSAxO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XG4gICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xuICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XG4gICAgICB9KTtcbiAgfVxuICByZXR1cm4gcGF0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBfX2V4dGVuZHMsXG4gIF9fYXNzaWduLFxuICBfX3Jlc3QsXG4gIF9fZGVjb3JhdGUsXG4gIF9fcGFyYW0sXG4gIF9fZXNEZWNvcmF0ZSxcbiAgX19ydW5Jbml0aWFsaXplcnMsXG4gIF9fcHJvcEtleSxcbiAgX19zZXRGdW5jdGlvbk5hbWUsXG4gIF9fbWV0YWRhdGEsXG4gIF9fYXdhaXRlcixcbiAgX19nZW5lcmF0b3IsXG4gIF9fY3JlYXRlQmluZGluZyxcbiAgX19leHBvcnRTdGFyLFxuICBfX3ZhbHVlcyxcbiAgX19yZWFkLFxuICBfX3NwcmVhZCxcbiAgX19zcHJlYWRBcnJheXMsXG4gIF9fc3ByZWFkQXJyYXksXG4gIF9fYXdhaXQsXG4gIF9fYXN5bmNHZW5lcmF0b3IsXG4gIF9fYXN5bmNEZWxlZ2F0b3IsXG4gIF9fYXN5bmNWYWx1ZXMsXG4gIF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxuICBfX2ltcG9ydFN0YXIsXG4gIF9faW1wb3J0RGVmYXVsdCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEluLFxuICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcbiAgX19kaXNwb3NlUmVzb3VyY2VzLFxuICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcbn07XG4iXSwibmFtZXMiOlsianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsIlJlYWN0IiwidXNlQ2FsbGJhY2siLCJ1c2VTdGF0ZSIsIlVzZXIiLCJUYWciLCJHbG9iZSIsIkNsb2NrIiwiQWxlcnRDaXJjbGUiLCJBbGVydFRyaWFuZ2xlIiwiSW5mbyIsIlhDaXJjbGUiLCJCYWRnZSIsIlZpcnR1YWxMaXN0IiwiVmlydHVhbEFjdGl2aXR5VGltZWxpbmUiLCJtZW1vIiwiX3JlZiIsImFjdGl2aXRpZXMiLCJvbkFjdGl2aXR5Q2xpY2siLCJfcmVmJGhlaWdodCIsImhlaWdodCIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInNjcm9sbE9mZnNldCIsInNldFNjcm9sbE9mZnNldCIsImdldFNldmVyaXR5Q29sb3IiLCJzZXZlcml0eSIsImdldFNldmVyaXR5SWNvbiIsImNsYXNzTmFtZSIsImZvcm1hdFJlbGF0aXZlVGltZSIsImRhdGVTdHJpbmciLCJkYXRlIiwiRGF0ZSIsIm5vdyIsImRpZmZJblNlY29uZHMiLCJNYXRoIiwiZmxvb3IiLCJnZXRUaW1lIiwiY29uY2F0IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwicmVuZGVyQWN0aXZpdHlJdGVtIiwiYWN0aXZpdHkiLCJpbmRleCIsInN0eWxlIiwiaXNMYXN0IiwibGVuZ3RoIiwiY2hpbGRyZW4iLCJvbkNsaWNrIiwidXNlcl9uYW1lIiwidmFyaWFudCIsInNpemUiLCJhY3Rpb24iLCJjcmVhdGVkX2F0IiwiZGVzY3JpcHRpb24iLCJtb2R1bGUiLCJpcF9hZGRyZXNzIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwiaGFuZGxlU2Nyb2xsIiwib2Zmc2V0IiwiaXRlbXMiLCJpdGVtSGVpZ2h0IiwicmVuZGVySXRlbSIsIm9uU2Nyb2xsIiwiaW5pdGlhbFNjcm9sbE9mZnNldCIsIm92ZXJzY2FuQ291bnQiLCJkaXNwbGF5TmFtZSIsImN2YSIsImNuIiwiYmFkZ2VWYXJpYW50cyIsInZhcmlhbnRzIiwicHJpbWFyeSIsInN1Y2Nlc3MiLCJ3YXJuaW5nIiwiZXJyb3IiLCJkYW5nZXIiLCJuZXV0cmFsIiwib3V0bGluZSIsInNtIiwibWQiLCJsZyIsInNoYXBlIiwicm91bmRlZCIsInBpbGwiLCJkZWZhdWx0VmFyaWFudHMiLCJmb3J3YXJkUmVmIiwicmVmIiwiaWNvbiIsInByb3BzIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiX2V4Y2x1ZGVkIiwiX29iamVjdFNwcmVhZCIsIkRpYWxvZ1ByaW1pdGl2ZSIsIlgiLCJEaWFsb2ciLCJSb290IiwiRGlhbG9nVHJpZ2dlciIsIlRyaWdnZXIiLCJEaWFsb2dQb3J0YWwiLCJQb3J0YWwiLCJEaWFsb2dDbG9zZSIsIkNsb3NlIiwiRGlhbG9nT3ZlcmxheSIsIk92ZXJsYXkiLCJEaWFsb2dDb250ZW50IiwiX3JlZjIiLCJfcmVmMiRzaG93Q2xvc2VCdXR0b24iLCJzaG93Q2xvc2VCdXR0b24iLCJfZXhjbHVkZWQyIiwiQ29udGVudCIsIkRpYWxvZ0hlYWRlciIsIl9yZWYzIiwiX2V4Y2x1ZGVkMyIsIkRpYWxvZ0Zvb3RlciIsIl9yZWY0IiwiX2V4Y2x1ZGVkNCIsIkRpYWxvZ1RpdGxlIiwiX3JlZjUiLCJfZXhjbHVkZWQ1IiwiVGl0bGUiLCJEaWFsb2dEZXNjcmlwdGlvbiIsIl9yZWY2IiwiX2V4Y2x1ZGVkNiIsIkRlc2NyaXB0aW9uIiwic2l6ZUNsYXNzZXMiLCJ4bCIsImZ1bGwiLCJNb2RhbCIsImlzT3BlbiIsIm9uQ2xvc2UiLCJ0aXRsZSIsImZvb3RlciIsIl9yZWYkc2l6ZSIsIl9yZWYkY2xvc2VPbk92ZXJsYXlDbCIsImNsb3NlT25PdmVybGF5Q2xpY2siLCJfcmVmJHNob3dDbG9zZUJ1dHRvbiIsImhhbmRsZU9wZW5DaGFuZ2UiLCJvcGVuIiwiaGFuZGxlT3ZlcmxheUNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0Iiwib25PcGVuQ2hhbmdlIiwib25Qb2ludGVyRG93bk91dHNpZGUiLCJvbkludGVyYWN0T3V0c2lkZSIsIkZyYWdtZW50IiwiX0ZyYWdtZW50IiwidXNlUmVmIiwidXNlRWZmZWN0IiwiRml4ZWRTaXplTGlzdCIsIl9yZWYkd2lkdGgiLCJ3aWR0aCIsIl9yZWYkY2xhc3NOYW1lIiwiX3JlZiRvdmVyc2NhbkNvdW50IiwiX3JlZiRpbml0aWFsU2Nyb2xsT2ZmIiwibGlzdFJlZiIsImN1cnJlbnQiLCJzY3JvbGxUbyIsIlJvdyIsIml0ZW0iLCJwYXJzZUZsb2F0IiwiaXRlbUNvdW50IiwiaXRlbVNpemUiLCJ1c2VNZW1vIiwiVklSVFVBTF9TQ1JPTExfVEhSRVNIT0xEIiwidXNlVmlydHVhbFNjcm9sbGluZyIsImZvcmNlVmlydHVhbCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiYXBpIiwiYWN0aXZpdHlBcGkiLCJnZXRBY3Rpdml0aWVzIiwiX2dldEFjdGl2aXRpZXMiLCJfY2FsbGVlIiwiZmlsdGVycyIsInBhcmFtcyIsInF1ZXJ5U3RyaW5nIiwidXJsIiwicmVzcG9uc2UiLCJfY29udGV4dCIsIlVSTFNlYXJjaFBhcmFtcyIsInVzZXJfaWQiLCJhcHBlbmQiLCJ0b1N0cmluZyIsInN0YXJ0X2RhdGUiLCJlbmRfZGF0ZSIsImVudGl0eV90eXBlIiwicGVyX3BhZ2UiLCJwYWdlIiwiZ2V0IiwiZGF0YSIsIl94IiwiZ2V0VXNlcnMiLCJfZ2V0VXNlcnMiLCJfY2FsbGVlMiIsIl9jb250ZXh0MiIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJfYXJyYXlMaWtlVG9BcnJheSIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsIm5leHQiLCJwdXNoIiwiaXNBcnJheSIsIkFjdGl2aXR5IiwiQWN0aXZpdHlJY29uIiwiRmlsdGVyIiwiRG93bmxvYWQiLCJ1c2VUb2FzdCIsIkJ1dHRvbiIsIkFjdGl2aXR5TG9nIiwic2V0QWN0aXZpdGllcyIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwidXNlcnMiLCJzZXRVc2VycyIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2IiwibG9hZGluZyIsInNldExvYWRpbmciLCJfdXNlU3RhdGU3IiwiX3VzZVN0YXRlOCIsInNlbGVjdGVkQWN0aXZpdHkiLCJzZXRTZWxlY3RlZEFjdGl2aXR5IiwiX3VzZVN0YXRlOSIsIl91c2VTdGF0ZTAiLCJpc0RldGFpbE1vZGFsT3BlbiIsInNldElzRGV0YWlsTW9kYWxPcGVuIiwiX3VzZVN0YXRlMSIsIl91c2VTdGF0ZTEwIiwicmVhbFRpbWVFbmFibGVkIiwic2V0UmVhbFRpbWVFbmFibGVkIiwiX3VzZVN0YXRlMTEiLCJfdXNlU3RhdGUxMiIsInNldEZpbHRlcnMiLCJfdXNlU3RhdGUxMyIsImN1cnJlbnRfcGFnZSIsInRvdGFsIiwibGFzdF9wYWdlIiwidG8iLCJfdXNlU3RhdGUxNCIsInBhZ2luYXRpb24iLCJzZXRQYWdpbmF0aW9uIiwiX3VzZVRvYXN0Iiwic2hvd1RvYXN0Iiwic2hvdWxkVXNlVmlydHVhbFNjcm9sbGluZyIsImZldGNoVXNlcnMiLCJ1c2Vyc0RhdGEiLCJfdCIsImNvbnNvbGUiLCJmZXRjaEFjdGl2aXRpZXMiLCJlbmhhbmNlZEFjdGl2aXRpZXMiLCJfdDIiLCJtYXAiLCJkZXRlcm1pbmVTZXZlcml0eSIsImV4dHJhY3RNb2R1bGUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiX2NhbGxlZTMiLCJfdDMiLCJfY29udGV4dDMiLCJjbGVhckludGVydmFsIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsImVudGl0eVR5cGUiLCJwYXJ0cyIsInNwbGl0IiwibW9kZWxOYW1lIiwiZW5kc1dpdGgiLCJoYW5kbGVGaWx0ZXJDaGFuZ2UiLCJrZXkiLCJwcmV2IiwiX2RlZmluZVByb3BlcnR5IiwiaGFuZGxlUGFnZUNoYW5nZSIsIm5ld1BhZ2UiLCJ3aW5kb3ciLCJ0b3AiLCJiZWhhdmlvciIsImNsZWFyRmlsdGVycyIsImhhbmRsZUV4cG9ydExvZyIsImhhbmRsZUFjdGl2aXR5Q2xpY2siLCJ0eXBlIiwiY2hlY2tlZCIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwicGFyc2VJbnQiLCJ1c2VyIiwiaWQiLCJkaXNhYmxlZCIsInRvTG9jYWxlU3RyaW5nIiwiZW50aXR5X2lkIl0sInNvdXJjZVJvb3QiOiIifQ==