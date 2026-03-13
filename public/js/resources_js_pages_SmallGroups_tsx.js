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

/***/ "./resources/js/components/smallgroups/GroupCard.tsx"
/*!***********************************************************!*\
  !*** ./resources/js/components/smallgroups/GroupCard.tsx ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupCard: () => (/* binding */ GroupCard),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/square-pen.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/calendar.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/eye.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/map-pin.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/user-plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/users.js");
/* harmony import */ var _ui_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _ui_badge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ui/badge */ "./resources/js/components/ui/badge.tsx");
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../lib/utils */ "./resources/js/lib/utils.ts");







/**
 * GroupCard Component
 *
 * Displays small group information in a card format with image, leader info,
 * member count, schedule, location, and action buttons.
 *
 * Features:
 * - Group image or placeholder
 * - Group name and description
 * - Leader photo and name
 * - Member avatars (first 3-4 members)
 * - Status badge (Active/Inactive)
 * - Meeting schedule and location
 * - Action buttons (View Details, Edit, Manage Members)
 * - Hover effects
 * - Supports both grid and list view modes
 *
 * Design Reference: Small Groups Page Design section
 * Validates Requirements: 8.4, 8.5
 */
var GroupCard = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(function (_ref) {
  var _group$members;
  var group = _ref.group,
    onViewDetails = _ref.onViewDetails,
    onEdit = _ref.onEdit,
    onManageMembers = _ref.onManageMembers,
    _ref$viewMode = _ref.viewMode,
    viewMode = _ref$viewMode === void 0 ? 'grid' : _ref$viewMode,
    _ref$showActions = _ref.showActions,
    showActions = _ref$showActions === void 0 ? true : _ref$showActions;
  var isActive = group.status !== 'inactive';
  var memberCount = group.member_count || 0;
  var displayMembers = ((_group$members = group.members) === null || _group$members === void 0 ? void 0 : _group$members.slice(0, 4)) || [];
  /**
   * Format meeting day and time for display
   */
  var formatMeetingTime = function formatMeetingTime(day, time) {
    return "".concat(day, "s at ").concat(time);
  };
  /**
   * Get initials from name for avatar placeholder
   */
  var getInitials = function getInitials(name) {
    if (!name) return '';
    return name.split(' ').map(function (word) {
      return word[0];
    }).join('').toUpperCase().slice(0, 2);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_card__WEBPACK_IMPORTED_MODULE_8__.Card, {
    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__.cn)('overflow-hidden hover:shadow-lg transition-all duration-300', viewMode === 'list' && 'flex flex-row'),
    hoverable: true,
    children: [viewMode === 'grid' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden",
      children: [group.image ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
        src: group.image,
        alt: group.name,
        className: "w-full h-full object-cover"
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "w-full h-full flex items-center justify-center",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
          className: "h-16 w-16 text-primary-400"
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "absolute top-4 right-4",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_badge__WEBPACK_IMPORTED_MODULE_9__.Badge, {
          variant: isActive ? 'success' : 'neutral',
          children: isActive ? 'Active' : 'Inactive'
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__.cn)('p-6', viewMode === 'list' && 'flex-1 flex items-center gap-6'),
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__.cn)('mb-4', viewMode === 'list' && 'flex-1 mb-0'),
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "flex items-start justify-between mb-2",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex-1",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
              className: "text-lg font-semibold text-neutral-900 mb-1",
              children: group.name
            }), viewMode === 'list' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_badge__WEBPACK_IMPORTED_MODULE_9__.Badge, {
              variant: isActive ? 'success' : 'neutral',
              className: "mb-2",
              children: isActive ? 'Active' : 'Inactive'
            })]
          })
        }), group.description && viewMode === 'grid' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "text-sm text-neutral-600 mb-4 line-clamp-2",
          children: group.description
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-3 mb-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "relative",
            children: group.leader_photo ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
              src: group.leader_photo,
              alt: group.leader_name,
              className: "w-10 h-10 rounded-full object-cover border-2 border-primary-200"
            }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "w-10 h-10 rounded-full bg-primary-100 border-2 border-primary-200 flex items-center justify-center",
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-sm font-medium text-primary-700",
                children: getInitials(group.leader_name)
              })
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-xs text-neutral-500",
              children: "Led by"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
              className: "text-sm font-medium text-neutral-900",
              children: group.leader_name
            })]
          })]
        }), displayMembers.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "flex items-center gap-2 mb-4",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "flex -space-x-2",
            children: displayMembers.map(function (member, index) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "relative",
                style: {
                  zIndex: displayMembers.length - index
                },
                children: member.photo ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                  src: member.photo,
                  alt: member.name,
                  className: "w-8 h-8 rounded-full object-cover border-2 border-white",
                  title: member.name
                }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center",
                  title: member.name,
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                    className: "text-xs font-medium text-neutral-600",
                    children: getInitials(member.name)
                  })
                })
              }, member.id);
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-sm text-neutral-600",
            children: memberCount > displayMembers.length ? "+".concat(memberCount - displayMembers.length, " more") : "".concat(memberCount, " ").concat(memberCount === 1 ? 'member' : 'members')
          })]
        }), displayMembers.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "mb-4",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_badge__WEBPACK_IMPORTED_MODULE_9__.Badge, {
            variant: "primary",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
              className: "h-3 w-3 mr-1"
            }), memberCount, " ", memberCount === 1 ? 'member' : 'members']
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__.cn)('space-y-2', viewMode === 'list' && 'flex gap-6 space-y-0'),
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center text-sm text-neutral-600",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
              className: "h-4 w-4 mr-2 text-neutral-400"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              children: formatMeetingTime(group.meeting_day, group.meeting_time)
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex items-center text-sm text-neutral-600",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
              className: "h-4 w-4 mr-2 text-neutral-400"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "line-clamp-1",
              children: group.location
            })]
          })]
        })]
      }), showActions && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_11__.cn)('mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-2', viewMode === 'list' && 'mt-0 pt-0 border-t-0 ml-auto flex-col'),
        children: [onViewDetails && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_button__WEBPACK_IMPORTED_MODULE_10__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return onViewDetails(group);
          },
          className: "flex-1 sm:flex-none",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "h-4 w-4 mr-2"
          }), "View Details"]
        }), onEdit && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_button__WEBPACK_IMPORTED_MODULE_10__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return onEdit(group);
          },
          className: "flex-1 sm:flex-none",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "h-4 w-4 mr-2"
          }), "Edit"]
        }), onManageMembers && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_ui_button__WEBPACK_IMPORTED_MODULE_10__.Button, {
          variant: "outline",
          size: "sm",
          onClick: function onClick() {
            return onManageMembers(group);
          },
          className: "flex-1 sm:flex-none",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
            className: "h-4 w-4 mr-2"
          }), "Manage Members"]
        })]
      })]
    })]
  });
});
GroupCard.displayName = 'GroupCard';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupCard);

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
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/search.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/upload.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/api */ "./resources/js/lib/api.ts");
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
 * SmallGroupForm Component
 *
 * Form for adding or editing small group records.
 *
 * Features:
 * - Input fields for name, description, leader, meeting details
 * - Leader selector with search functionality
 * - Photo upload with preview
 * - Form validation with inline error messages
 * - Support for both create and edit modes
 * - Meeting day dropdown with all days of the week
 * - Schedule picker (day and time)
 *
 * Validates Requirements: 8.4
 * Design Reference: Small Groups Page Design section
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
      leader_id: null,
      meeting_day: 'Sunday',
      meeting_time: '18:00',
      location: '',
      photo: null
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
  // Leader selector state
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    leaderSearch = _useState8[0],
    setLeaderSearch = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState0 = _slicedToArray(_useState9, 2),
    members = _useState0[0],
    setMembers = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState10 = _slicedToArray(_useState1, 2),
    filteredMembers = _useState10[0],
    setFilteredMembers = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showLeaderDropdown = _useState12[0],
    setShowLeaderDropdown = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isLoadingMembers = _useState14[0],
    setIsLoadingMembers = _useState14[1];
  // Photo upload state
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState16 = _slicedToArray(_useState15, 2),
    photoPreview = _useState16[0],
    setPhotoPreview = _useState16[1];
  var fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  // Days of the week for dropdown
  var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /**
   * Load members for leader selector
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (isOpen) {
      loadMembers();
    }
  }, [isOpen]);
  /**
   * Fetch members from API
   */
  var loadMembers = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setIsLoadingMembers(true);
            _context.n = 1;
            return _lib_api__WEBPACK_IMPORTED_MODULE_8__["default"].get('/members');
          case 1:
            response = _context.v;
            setMembers(response.data.data || []);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Error loading members:', _t);
            setMembers([]);
          case 3:
            _context.p = 3;
            setIsLoadingMembers(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function loadMembers() {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Filter members based on search query
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (leaderSearch.trim() === '') {
      setFilteredMembers(members.slice(0, 10)); // Show first 10 members
    } else {
      var searchLower = leaderSearch.toLowerCase();
      var filtered = members.filter(function (member) {
        return member.name.toLowerCase().includes(searchLower) || member.email.toLowerCase().includes(searchLower);
      });
      setFilteredMembers(filtered.slice(0, 10)); // Limit to 10 results
    }
  }, [leaderSearch, members]);
  /**
   * Initialize form data when smallGroup prop changes
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (smallGroup) {
      setFormData({
        name: smallGroup.name,
        description: smallGroup.description,
        leader_name: smallGroup.leader_name,
        leader_id: smallGroup.leader_id || null,
        meeting_day: smallGroup.meeting_day,
        meeting_time: smallGroup.meeting_time,
        location: smallGroup.location,
        photo: smallGroup.photo || null
      });
      setLeaderSearch(smallGroup.leader_name);
      // Set photo preview if editing and photo exists
      if (smallGroup.photo && typeof smallGroup.photo === 'string') {
        setPhotoPreview(smallGroup.photo);
      }
    } else {
      // Reset form for new small group
      setFormData({
        name: '',
        description: null,
        leader_name: '',
        leader_id: null,
        meeting_day: 'Sunday',
        meeting_time: '18:00',
        location: '',
        photo: null
      });
      setLeaderSearch('');
      setPhotoPreview(null);
    }
    setErrors({});
    setShowLeaderDropdown(false);
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
    // Validate photo if present
    if (formData.photo && formData.photo instanceof File) {
      var validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(formData.photo.type)) {
        newErrors.photo = 'Photo must be a valid image file (JPEG, PNG, GIF, or WebP)';
      }
      var maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.photo.size > maxSize) {
        newErrors.photo = 'Photo must be less than 5MB';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  /**
   * Handle leader selection from dropdown
   */
  var handleLeaderSelect = function handleLeaderSelect(member) {
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        leader_name: member.name,
        leader_id: member.id
      });
    });
    setLeaderSearch(member.name);
    setShowLeaderDropdown(false);
    // Clear error for leader field
    if (errors.leader_name) {
      setErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          leader_name: undefined
        });
      });
    }
  };
  /**
   * Handle leader search input change
   */
  var handleLeaderSearchChange = function handleLeaderSearchChange(e) {
    var value = e.target.value;
    setLeaderSearch(value);
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        leader_name: value,
        leader_id: null // Clear leader_id when manually typing
      });
    });
    setShowLeaderDropdown(true);
    // Clear error for leader field
    if (errors.leader_name) {
      setErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          leader_name: undefined
        });
      });
    }
  };
  /**
   * Handle photo file selection
   */
  var handlePhotoChange = function handlePhotoChange(e) {
    var _e$target$files;
    var file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
    if (file) {
      setFormData(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, {
          photo: file
        });
      });
      // Create preview URL
      var reader = new FileReader();
      reader.onloadend = function () {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      // Clear photo error
      if (errors.photo) {
        setErrors(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, {
            photo: undefined
          });
        });
      }
    }
  };
  /**
   * Handle photo removal
   */
  var handlePhotoRemove = function handlePhotoRemove() {
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        photo: null
      });
    });
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
      var submitData, _error$response, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            e.preventDefault();
            if (validateForm()) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            setIsSubmitting(true);
            _context2.p = 2;
            if (!(formData.photo instanceof File)) {
              _context2.n = 4;
              break;
            }
            submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('description', formData.description || '');
            submitData.append('leader_name', formData.leader_name);
            if (formData.leader_id) {
              submitData.append('leader_id', String(formData.leader_id));
            }
            submitData.append('meeting_day', formData.meeting_day);
            submitData.append('meeting_time', formData.meeting_time);
            submitData.append('location', formData.location);
            submitData.append('photo', formData.photo);
            _context2.n = 3;
            return onSubmit(submitData);
          case 3:
            _context2.n = 5;
            break;
          case 4:
            _context2.n = 5;
            return onSubmit(formData);
          case 5:
            onClose();
            _context2.n = 7;
            break;
          case 6:
            _context2.p = 6;
            _t2 = _context2.v;
            // Handle server-side validation errors
            if ((_error$response = _t2.response) !== null && _error$response !== void 0 && (_error$response = _error$response.data) !== null && _error$response !== void 0 && _error$response.errors) {
              setErrors(_t2.response.data.errors);
            }
            // Don't close the form if there's an error
          case 7:
            _context2.p = 7;
            setIsSubmitting(false);
            return _context2.f(7);
          case 8:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 6, 7, 8]]);
    }));
    return function handleSubmit(_x) {
      return _ref3.apply(this, arguments);
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
          className: "relative",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
            htmlFor: "leader_name",
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: ["Leader ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
              className: "text-red-500",
              children: "*"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "relative",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_input__WEBPACK_IMPORTED_MODULE_4__.Input, {
              id: "leader_name",
              name: "leader_name",
              type: "text",
              placeholder: "Search for a member...",
              value: leaderSearch,
              onChange: handleLeaderSearchChange,
              onFocus: function onFocus() {
                return setShowLeaderDropdown(true);
              },
              onBlur: function onBlur() {
                // Delay to allow click on dropdown item
                setTimeout(function () {
                  return setShowLeaderDropdown(false);
                }, 200);
              },
              className: "pl-10 ".concat(errors.leader_name ? 'border-red-500' : ''),
              disabled: isSubmitting
            })]
          }), errors.leader_name && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.leader_name
          }), showLeaderDropdown && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto",
            children: isLoadingMembers ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "px-4 py-3 text-sm text-gray-500",
              children: "Loading members..."
            }) : filteredMembers.length > 0 ? filteredMembers.map(function (member) {
              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onClick: function onClick() {
                  return handleLeaderSelect(member);
                },
                className: "w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [member.photo ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                    src: member.photo,
                    alt: member.name,
                    className: "w-8 h-8 rounded-full object-cover"
                  }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center",
                    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                      className: "text-primary-600 text-sm font-medium",
                      children: member.name.charAt(0).toUpperCase()
                    })
                  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex-1 min-w-0",
                    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                      className: "text-sm font-medium text-gray-900 truncate",
                      children: member.name
                    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                      className: "text-xs text-gray-500 truncate",
                      children: member.email
                    })]
                  })]
                })
              }, member.id);
            }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
              className: "px-4 py-3 text-sm text-gray-500",
              children: leaderSearch.trim() === '' ? 'Start typing to search...' : 'No members found'
            })
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
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
            className: "block text-sm font-medium text-gray-700 mb-1",
            children: "Group Photo"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "space-y-3",
            children: [photoPreview && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "relative inline-block",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                src: photoPreview,
                alt: "Group photo preview",
                className: "w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                type: "button",
                onClick: handlePhotoRemove,
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
                onChange: handlePhotoChange,
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
                }), photoPreview ? 'Change Photo' : 'Upload Photo']
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                className: "text-xs text-gray-500 mt-1",
                children: "Recommended: Square image, max 5MB (JPEG, PNG, GIF, or WebP)"
              })]
            })]
          }), errors.photo && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-sm text-red-600 mt-1",
            children: errors.photo
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
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/grid-3x3.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/list.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/users.js");
/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../contexts/AuthContext */ "./resources/js/contexts/AuthContext.tsx");
/* harmony import */ var _contexts_ToastContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../contexts/ToastContext */ "./resources/js/contexts/ToastContext.tsx");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ui/button */ "./resources/js/components/ui/button.tsx");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/ui/card */ "./resources/js/components/ui/card.tsx");
/* harmony import */ var _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/smallGroupApi */ "./resources/js/lib/smallGroupApi.ts");
/* harmony import */ var _components_smallgroups_SmallGroupForm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/smallgroups/SmallGroupForm */ "./resources/js/components/smallgroups/SmallGroupForm.tsx");
/* harmony import */ var _components_smallgroups_GroupCard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/smallgroups/GroupCard */ "./resources/js/components/smallgroups/GroupCard.tsx");
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
 * - Toggle between Grid View and List View
 * - Responsive grid layout
 *
 * Validates Requirements: 8.4, 8.5
 * Design Reference: Small Groups Page Design section
 */
var SmallGroups = function SmallGroups() {
  var _useAuth = (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_6__.useAuth)(),
    user = _useAuth.user;
  var _useToast = (0,_contexts_ToastContext__WEBPACK_IMPORTED_MODULE_7__.useToast)(),
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
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('grid'),
    _useState0 = _slicedToArray(_useState9, 2),
    viewMode = _useState0[0],
    setViewMode = _useState0[1];
  /**
   * Load small groups on mount
   */
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    loadSmallGroups();
  }, []);
  /**
   * Fetch small groups from API
   */
  var loadSmallGroups = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var data, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          setIsLoading(true);
          _context.n = 1;
          return _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_10__.smallGroupApi.getSmallGroups();
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
  })), [showToast]);
  /**
   * Handle add small group button click
   */
  var handleAddClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    setSelectedGroup(null);
    setIsFormOpen(true);
  }, []);
  /**
   * Handle edit small group button click
   */
  var handleEditClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (group) {
    setSelectedGroup(group);
    setIsFormOpen(true);
  }, []);
  /**
   * Handle form close
   */
  var handleFormClose = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    setIsFormOpen(false);
    setSelectedGroup(null);
  }, []);
  /**
   * Handle form submission
   */
  var handleFormSubmit = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(/*#__PURE__*/function () {
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
            return _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_10__.smallGroupApi.updateSmallGroup(selectedGroup.id, data);
          case 1:
            showToast('success', 'Small group updated successfully');
            _context2.n = 4;
            break;
          case 2:
            _context2.n = 3;
            return _lib_smallGroupApi__WEBPACK_IMPORTED_MODULE_10__.smallGroupApi.createSmallGroup(data);
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
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [selectedGroup, showToast, loadSmallGroups]);
  /**
   * Handle delete small group button click
   */
  var handleDeleteClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (group) {
    // Handled by ArchiveButton component
  }, []);
  /**
   * Handle archive success callback
   */
  var handleArchiveSuccess = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return loadSmallGroups();
        case 1:
          return _context3.a(2);
      }
    }, _callee3);
  })), [loadSmallGroups]);
  /**
   * Handle view details button click
   */
  var handleViewDetails = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (group) {
    // Navigate to group detail page
    window.location.href = "/small-groups/".concat(group.id);
  }, []);
  /**
   * Handle manage members button click
   */
  var handleManageMembers = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (group) {
    // TODO: Open manage members modal
    console.log('Manage members for group:', group);
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "mb-8",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
            className: "text-3xl font-bold text-neutral-900",
            children: "Small Groups"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
            className: "text-base text-neutral-600 mt-2",
            children: "Manage small groups and their members"
          })]
        }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
          onClick: handleAddClick,
          size: "lg",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
            className: "h-5 w-5 mr-2"
          }), "Create Group"]
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-2 bg-neutral-100 p-1 rounded-lg w-fit",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
          onClick: function onClick() {
            return setViewMode('grid');
          },
          className: "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ".concat(viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm font-medium' : 'text-neutral-600 hover:text-neutral-900'),
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "h-4 w-4"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-sm",
            children: "Grid View"
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
          onClick: function onClick() {
            return setViewMode('list');
          },
          className: "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ".concat(viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm font-medium' : 'text-neutral-600 hover:text-neutral-900'),
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
            className: "h-4 w-4"
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "text-sm",
            children: "List View"
          })]
        })]
      })]
    }), isLoading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "text-center py-16",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-600",
        children: "Loading small groups..."
      })]
    }), !isLoading && smallGroups.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_card__WEBPACK_IMPORTED_MODULE_9__.Card, {
      className: "text-center py-16",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "h-16 w-16 text-neutral-400 mx-auto mb-4"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
        className: "text-lg font-semibold text-neutral-900 mb-2",
        children: "No Small Groups Yet"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "text-neutral-600 mb-6",
        children: isAdmin ? 'Get started by creating your first small group.' : 'Check back later for small group opportunities.'
      }), isAdmin && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
        onClick: handleAddClick,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: "h-4 w-4 mr-2"
        }), "Create Group"]
      })]
    }), !isLoading && smallGroups.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4',
      children: smallGroups.map(function (group) {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_smallgroups_GroupCard__WEBPACK_IMPORTED_MODULE_12__["default"], {
          group: group,
          viewMode: viewMode,
          onViewDetails: handleViewDetails,
          onEdit: isAdmin ? handleEditClick : undefined,
          onManageMembers: isAdmin ? handleManageMembers : undefined,
          showActions: true
        }, group.id);
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_smallgroups_SmallGroupForm__WEBPACK_IMPORTED_MODULE_11__["default"], {
      isOpen: isFormOpen,
      onClose: handleFormClose,
      onSubmit: handleFormSubmit,
      smallGroup: selectedGroup
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

/***/ "./node_modules/lucide-react/dist/esm/icons/grid-3x3.js"
/*!**************************************************************!*\
  !*** ./node_modules/lucide-react/dist/esm/icons/grid-3x3.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __iconNode: () => (/* binding */ __iconNode),
/* harmony export */   "default": () => (/* binding */ Grid3x3)
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "./node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */



const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
];
const Grid3x3 = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("grid-3x3", __iconNode);


//# sourceMappingURL=grid-3x3.js.map


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX1NtYWxsR3JvdXBzX3RzeC5qcz9pZD05NDA3NTY5YjcxNDlmY2Q3IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLCtCQUErQixvQkFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEM7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQztBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLE1BQU07QUFDbEI7QUFDTztBQUNQLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FB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ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2FyaWEtaGlkZGVuL2Rpc3QvZXMyMDE1L2luZGV4LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3NtYWxsZ3JvdXBzL0dyb3VwQ2FyZC50c3giLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvc21hbGxncm91cHMvU21hbGxHcm91cEZvcm0udHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3VpL2JhZGdlLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvY29tcG9uZW50cy91aS9kaWFsb2cudHN4Iiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL3VpL2lucHV0LnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9yZXNvdXJjZXMvanMvbGliL3NtYWxsR3JvdXBBcGkudHMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vcmVzb3VyY2VzL2pzL3BhZ2VzL1NtYWxsR3JvdXBzLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvZ2V0LW5vbmNlL2Rpc3QvZXMyMDE1L2luZGV4LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvZXllLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvZ3JpZC0zeDMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9saXN0LmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvbWFwLXBpbi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3BsdXMuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy9zcXVhcmUtcGVuLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvdXBsb2FkLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9sdWNpZGUtcmVhY3QvZGlzdC9lc20vaWNvbnMvdXNlci1wbHVzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsLWJhci9kaXN0L2VzMjAxNS9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwtYmFyL2Rpc3QvZXMyMDE1L3V0aWxzLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L0NvbWJpbmF0aW9uLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L1NpZGVFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvVUkuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvYWdncmVzaXZlQ2FwdHVyZS5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVtb3ZlLXNjcm9sbC9kaXN0L2VzMjAxNS9oYW5kbGVTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlbW92ZS1zY3JvbGwvZGlzdC9lczIwMTUvbWVkaXVtLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZW1vdmUtc2Nyb2xsL2Rpc3QvZXMyMDE1L3NpZGVjYXIuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9ob29rLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9yZWFjdC1zdHlsZS1zaW5nbGV0b24vZGlzdC9lczIwMTUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXN0eWxlLXNpbmdsZXRvbi9kaXN0L2VzMjAxNS9zaW5nbGV0b24uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczIwMTUvYXNzaWduUmVmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2UtY2FsbGJhY2stcmVmL2Rpc3QvZXMyMDE1L3VzZU1lcmdlUmVmLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy91c2UtY2FsbGJhY2stcmVmL2Rpc3QvZXMyMDE1L3VzZVJlZi5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLXNpZGVjYXIvZGlzdC9lczIwMTUvZXhwb3J0cy5qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdXNlLXNpZGVjYXIvZGlzdC9lczIwMTUvbWVkaXVtLmpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcHJpbWl0aXZlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtY29udGV4dC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWRpYWxvZy9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWRpYWxvZy9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXNsb3QvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1kaXNtaXNzYWJsZS1sYXllci9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWZvY3VzLWd1YXJkcy9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LWZvY3VzLXNjb3BlL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtaWQvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1wb3J0YWwvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC1wcmVzZW5jZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZS9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXNsb3QvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmL2Rpc3QvaW5kZXgubWpzIiwid2VicGFjazovL2NodXJjaC1tYW5hZ2VtZW50LXN5c3RlbS8uL25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZS9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvQHJhZGl4LXVpL3JlYWN0LXVzZS1lZmZlY3QtZXZlbnQvZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtZXNjYXBlLWtleWRvd24vZGlzdC9pbmRleC5tanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL0ByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdC9kaXN0L2luZGV4Lm1qcyIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ2V0RGVmYXVsdFBhcmVudCA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgc2FtcGxlVGFyZ2V0ID0gQXJyYXkuaXNBcnJheShvcmlnaW5hbFRhcmdldCkgPyBvcmlnaW5hbFRhcmdldFswXSA6IG9yaWdpbmFsVGFyZ2V0O1xuICAgIHJldHVybiBzYW1wbGVUYXJnZXQub3duZXJEb2N1bWVudC5ib2R5O1xufTtcbnZhciBjb3VudGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbnZhciB1bmNvbnRyb2xsZWROb2RlcyA9IG5ldyBXZWFrTWFwKCk7XG52YXIgbWFya2VyTWFwID0ge307XG52YXIgbG9ja0NvdW50ID0gMDtcbnZhciB1bndyYXBIb3N0ID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZSAmJiAobm9kZS5ob3N0IHx8IHVud3JhcEhvc3Qobm9kZS5wYXJlbnROb2RlKSk7XG59O1xudmFyIGNvcnJlY3RUYXJnZXRzID0gZnVuY3Rpb24gKHBhcmVudCwgdGFyZ2V0cykge1xuICAgIHJldHVybiB0YXJnZXRzXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBpZiAocGFyZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvcnJlY3RlZFRhcmdldCA9IHVud3JhcEhvc3QodGFyZ2V0KTtcbiAgICAgICAgaWYgKGNvcnJlY3RlZFRhcmdldCAmJiBwYXJlbnQuY29udGFpbnMoY29ycmVjdGVkVGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvcnJlY3RlZFRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKCdhcmlhLWhpZGRlbicsIHRhcmdldCwgJ2luIG5vdCBjb250YWluZWQgaW5zaWRlJywgcGFyZW50LCAnLiBEb2luZyBub3RoaW5nJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIEJvb2xlYW4oeCk7IH0pO1xufTtcbi8qKlxuICogTWFya3MgZXZlcnl0aGluZyBleGNlcHQgZ2l2ZW4gbm9kZShvciBub2RlcykgYXMgYXJpYS1oaWRkZW5cbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHBhcmFtIHtTdHJpbmd9IFtjb250cm9sQXR0cmlidXRlXSAtIGh0bWwgQXR0cmlidXRlIHRvIGNvbnRyb2xcbiAqIEByZXR1cm4ge1VuZG99IHVuZG8gY29tbWFuZFxuICovXG52YXIgYXBwbHlBdHRyaWJ1dGVUb090aGVycyA9IGZ1bmN0aW9uIChvcmlnaW5hbFRhcmdldCwgcGFyZW50Tm9kZSwgbWFya2VyTmFtZSwgY29udHJvbEF0dHJpYnV0ZSkge1xuICAgIHZhciB0YXJnZXRzID0gY29ycmVjdFRhcmdldHMocGFyZW50Tm9kZSwgQXJyYXkuaXNBcnJheShvcmlnaW5hbFRhcmdldCkgPyBvcmlnaW5hbFRhcmdldCA6IFtvcmlnaW5hbFRhcmdldF0pO1xuICAgIGlmICghbWFya2VyTWFwW21hcmtlck5hbWVdKSB7XG4gICAgICAgIG1hcmtlck1hcFttYXJrZXJOYW1lXSA9IG5ldyBXZWFrTWFwKCk7XG4gICAgfVxuICAgIHZhciBtYXJrZXJDb3VudGVyID0gbWFya2VyTWFwW21hcmtlck5hbWVdO1xuICAgIHZhciBoaWRkZW5Ob2RlcyA9IFtdO1xuICAgIHZhciBlbGVtZW50c1RvS2VlcCA9IG5ldyBTZXQoKTtcbiAgICB2YXIgZWxlbWVudHNUb1N0b3AgPSBuZXcgU2V0KHRhcmdldHMpO1xuICAgIHZhciBrZWVwID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGlmICghZWwgfHwgZWxlbWVudHNUb0tlZXAuaGFzKGVsKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnRzVG9LZWVwLmFkZChlbCk7XG4gICAgICAgIGtlZXAoZWwucGFyZW50Tm9kZSk7XG4gICAgfTtcbiAgICB0YXJnZXRzLmZvckVhY2goa2VlcCk7XG4gICAgdmFyIGRlZXAgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIGlmICghcGFyZW50IHx8IGVsZW1lbnRzVG9TdG9wLmhhcyhwYXJlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChwYXJlbnQuY2hpbGRyZW4sIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudHNUb0tlZXAuaGFzKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgZGVlcChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhdHRyID0gbm9kZS5nZXRBdHRyaWJ1dGUoY29udHJvbEF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbHJlYWR5SGlkZGVuID0gYXR0ciAhPT0gbnVsbCAmJiBhdHRyICE9PSAnZmFsc2UnO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRlclZhbHVlID0gKGNvdW50ZXJNYXAuZ2V0KG5vZGUpIHx8IDApICsgMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hcmtlclZhbHVlID0gKG1hcmtlckNvdW50ZXIuZ2V0KG5vZGUpIHx8IDApICsgMTtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlck1hcC5zZXQobm9kZSwgY291bnRlclZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyQ291bnRlci5zZXQobm9kZSwgbWFya2VyVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW5Ob2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlclZhbHVlID09PSAxICYmIGFscmVhZHlIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuY29udHJvbGxlZE5vZGVzLnNldChub2RlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWFya2VyVmFsdWUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG1hcmtlck5hbWUsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbHJlYWR5SGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2FyaWEtaGlkZGVuOiBjYW5ub3Qgb3BlcmF0ZSBvbiAnLCBub2RlLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgZGVlcChwYXJlbnROb2RlKTtcbiAgICBlbGVtZW50c1RvS2VlcC5jbGVhcigpO1xuICAgIGxvY2tDb3VudCsrO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGhpZGRlbk5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBjb3VudGVyVmFsdWUgPSBjb3VudGVyTWFwLmdldChub2RlKSAtIDE7XG4gICAgICAgICAgICB2YXIgbWFya2VyVmFsdWUgPSBtYXJrZXJDb3VudGVyLmdldChub2RlKSAtIDE7XG4gICAgICAgICAgICBjb3VudGVyTWFwLnNldChub2RlLCBjb3VudGVyVmFsdWUpO1xuICAgICAgICAgICAgbWFya2VyQ291bnRlci5zZXQobm9kZSwgbWFya2VyVmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFjb3VudGVyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXVuY29udHJvbGxlZE5vZGVzLmhhcyhub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShjb250cm9sQXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdW5jb250cm9sbGVkTm9kZXMuZGVsZXRlKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtYXJrZXJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG1hcmtlck5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbG9ja0NvdW50LS07XG4gICAgICAgIGlmICghbG9ja0NvdW50KSB7XG4gICAgICAgICAgICAvLyBjbGVhclxuICAgICAgICAgICAgY291bnRlck1hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgICAgICBjb3VudGVyTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIHVuY29udHJvbGxlZE5vZGVzID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgIG1hcmtlck1hcCA9IHt9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG4vKipcbiAqIE1hcmtzIGV2ZXJ5dGhpbmcgZXhjZXB0IGdpdmVuIG5vZGUob3Igbm9kZXMpIGFzIGFyaWEtaGlkZGVuXG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBFbGVtZW50W119IG9yaWdpbmFsVGFyZ2V0IC0gZWxlbWVudHMgdG8ga2VlcCBvbiB0aGUgcGFnZVxuICogQHBhcmFtIFtwYXJlbnROb2RlXSAtIHRvcCBlbGVtZW50LCBkZWZhdWx0cyB0byBkb2N1bWVudC5ib2R5XG4gKiBAcGFyYW0ge1N0cmluZ30gW21hcmtlck5hbWVdIC0gYSBzcGVjaWFsIGF0dHJpYnV0ZSB0byBtYXJrIGV2ZXJ5IG5vZGVcbiAqIEByZXR1cm4ge1VuZG99IHVuZG8gY29tbWFuZFxuICovXG5leHBvcnQgdmFyIGhpZGVPdGhlcnMgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpIHtcbiAgICBpZiAobWFya2VyTmFtZSA9PT0gdm9pZCAwKSB7IG1hcmtlck5hbWUgPSAnZGF0YS1hcmlhLWhpZGRlbic7IH1cbiAgICB2YXIgdGFyZ2V0cyA9IEFycmF5LmZyb20oQXJyYXkuaXNBcnJheShvcmlnaW5hbFRhcmdldCkgPyBvcmlnaW5hbFRhcmdldCA6IFtvcmlnaW5hbFRhcmdldF0pO1xuICAgIHZhciBhY3RpdmVQYXJlbnROb2RlID0gcGFyZW50Tm9kZSB8fCBnZXREZWZhdWx0UGFyZW50KG9yaWdpbmFsVGFyZ2V0KTtcbiAgICBpZiAoIWFjdGl2ZVBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH07XG4gICAgfVxuICAgIC8vIHdlIHNob3VsZCBub3QgaGlkZSBhcmlhLWxpdmUgZWxlbWVudHMgLSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L2FyaWEtaGlkZGVuL2lzc3Vlcy8xMFxuICAgIC8vIGFuZCBzY3JpcHQgZWxlbWVudHMsIGFzIHRoZXkgaGF2ZSBubyBpbXBhY3Qgb24gYWNjZXNzaWJpbGl0eS5cbiAgICB0YXJnZXRzLnB1c2guYXBwbHkodGFyZ2V0cywgQXJyYXkuZnJvbShhY3RpdmVQYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWxpdmVdLCBzY3JpcHQnKSkpO1xuICAgIHJldHVybiBhcHBseUF0dHJpYnV0ZVRvT3RoZXJzKHRhcmdldHMsIGFjdGl2ZVBhcmVudE5vZGUsIG1hcmtlck5hbWUsICdhcmlhLWhpZGRlbicpO1xufTtcbi8qKlxuICogTWFya3MgZXZlcnl0aGluZyBleGNlcHQgZ2l2ZW4gbm9kZShvciBub2RlcykgYXMgaW5lcnRcbiAqIEBwYXJhbSB7RWxlbWVudCB8IEVsZW1lbnRbXX0gb3JpZ2luYWxUYXJnZXQgLSBlbGVtZW50cyB0byBrZWVwIG9uIHRoZSBwYWdlXG4gKiBAcGFyYW0gW3BhcmVudE5vZGVdIC0gdG9wIGVsZW1lbnQsIGRlZmF1bHRzIHRvIGRvY3VtZW50LmJvZHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWFya2VyTmFtZV0gLSBhIHNwZWNpYWwgYXR0cmlidXRlIHRvIG1hcmsgZXZlcnkgbm9kZVxuICogQHJldHVybiB7VW5kb30gdW5kbyBjb21tYW5kXG4gKi9cbmV4cG9ydCB2YXIgaW5lcnRPdGhlcnMgPSBmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpIHtcbiAgICBpZiAobWFya2VyTmFtZSA9PT0gdm9pZCAwKSB7IG1hcmtlck5hbWUgPSAnZGF0YS1pbmVydC1lZCc7IH1cbiAgICB2YXIgYWN0aXZlUGFyZW50Tm9kZSA9IHBhcmVudE5vZGUgfHwgZ2V0RGVmYXVsdFBhcmVudChvcmlnaW5hbFRhcmdldCk7XG4gICAgaWYgKCFhY3RpdmVQYXJlbnROb2RlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9O1xuICAgIH1cbiAgICByZXR1cm4gYXBwbHlBdHRyaWJ1dGVUb090aGVycyhvcmlnaW5hbFRhcmdldCwgYWN0aXZlUGFyZW50Tm9kZSwgbWFya2VyTmFtZSwgJ2luZXJ0Jyk7XG59O1xuLyoqXG4gKiBAcmV0dXJucyBpZiBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgaW5lcnRcbiAqL1xuZXhwb3J0IHZhciBzdXBwb3J0c0luZXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0eXBlb2YgSFRNTEVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIEhUTUxFbGVtZW50LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnaW5lcnQnKTtcbn07XG4vKipcbiAqIEF1dG9tYXRpYyBmdW5jdGlvbiB0byBcInN1cHByZXNzXCIgRE9NIGVsZW1lbnRzIC0gX2hpZGVfIG9yIF9pbmVydF8gaW4gdGhlIGJlc3QgcG9zc2libGUgd2F5XG4gKiBAcGFyYW0ge0VsZW1lbnQgfCBFbGVtZW50W119IG9yaWdpbmFsVGFyZ2V0IC0gZWxlbWVudHMgdG8ga2VlcCBvbiB0aGUgcGFnZVxuICogQHBhcmFtIFtwYXJlbnROb2RlXSAtIHRvcCBlbGVtZW50LCBkZWZhdWx0cyB0byBkb2N1bWVudC5ib2R5XG4gKiBAcGFyYW0ge1N0cmluZ30gW21hcmtlck5hbWVdIC0gYSBzcGVjaWFsIGF0dHJpYnV0ZSB0byBtYXJrIGV2ZXJ5IG5vZGVcbiAqIEByZXR1cm4ge1VuZG99IHVuZG8gY29tbWFuZFxuICovXG5leHBvcnQgdmFyIHN1cHByZXNzT3RoZXJzID0gZnVuY3Rpb24gKG9yaWdpbmFsVGFyZ2V0LCBwYXJlbnROb2RlLCBtYXJrZXJOYW1lKSB7XG4gICAgaWYgKG1hcmtlck5hbWUgPT09IHZvaWQgMCkgeyBtYXJrZXJOYW1lID0gJ2RhdGEtc3VwcHJlc3NlZCc7IH1cbiAgICByZXR1cm4gKHN1cHBvcnRzSW5lcnQoKSA/IGluZXJ0T3RoZXJzIDogaGlkZU90aGVycykob3JpZ2luYWxUYXJnZXQsIHBhcmVudE5vZGUsIG1hcmtlck5hbWUpO1xufTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzIH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVXNlcnMsIENhbGVuZGFyLCBNYXBQaW4sIEVkaXQsIEV5ZSwgVXNlclBsdXMgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uL3VpL2NhcmQnO1xuaW1wb3J0IHsgQmFkZ2UgfSBmcm9tICcuLi91aS9iYWRnZSc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi91aS9idXR0b24nO1xuaW1wb3J0IHsgY24gfSBmcm9tICcuLi8uLi9saWIvdXRpbHMnO1xuLyoqXG4gKiBHcm91cENhcmQgQ29tcG9uZW50XG4gKlxuICogRGlzcGxheXMgc21hbGwgZ3JvdXAgaW5mb3JtYXRpb24gaW4gYSBjYXJkIGZvcm1hdCB3aXRoIGltYWdlLCBsZWFkZXIgaW5mbyxcbiAqIG1lbWJlciBjb3VudCwgc2NoZWR1bGUsIGxvY2F0aW9uLCBhbmQgYWN0aW9uIGJ1dHRvbnMuXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIEdyb3VwIGltYWdlIG9yIHBsYWNlaG9sZGVyXG4gKiAtIEdyb3VwIG5hbWUgYW5kIGRlc2NyaXB0aW9uXG4gKiAtIExlYWRlciBwaG90byBhbmQgbmFtZVxuICogLSBNZW1iZXIgYXZhdGFycyAoZmlyc3QgMy00IG1lbWJlcnMpXG4gKiAtIFN0YXR1cyBiYWRnZSAoQWN0aXZlL0luYWN0aXZlKVxuICogLSBNZWV0aW5nIHNjaGVkdWxlIGFuZCBsb2NhdGlvblxuICogLSBBY3Rpb24gYnV0dG9ucyAoVmlldyBEZXRhaWxzLCBFZGl0LCBNYW5hZ2UgTWVtYmVycylcbiAqIC0gSG92ZXIgZWZmZWN0c1xuICogLSBTdXBwb3J0cyBib3RoIGdyaWQgYW5kIGxpc3QgdmlldyBtb2Rlc1xuICpcbiAqIERlc2lnbiBSZWZlcmVuY2U6IFNtYWxsIEdyb3VwcyBQYWdlIERlc2lnbiBzZWN0aW9uXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiA4LjQsIDguNVxuICovXG5leHBvcnQgY29uc3QgR3JvdXBDYXJkID0gUmVhY3QubWVtbygoeyBncm91cCwgb25WaWV3RGV0YWlscywgb25FZGl0LCBvbk1hbmFnZU1lbWJlcnMsIHZpZXdNb2RlID0gJ2dyaWQnLCBzaG93QWN0aW9ucyA9IHRydWUsIH0pID0+IHtcbiAgICBjb25zdCBpc0FjdGl2ZSA9IGdyb3VwLnN0YXR1cyAhPT0gJ2luYWN0aXZlJztcbiAgICBjb25zdCBtZW1iZXJDb3VudCA9IGdyb3VwLm1lbWJlcl9jb3VudCB8fCAwO1xuICAgIGNvbnN0IGRpc3BsYXlNZW1iZXJzID0gZ3JvdXAubWVtYmVycz8uc2xpY2UoMCwgNCkgfHwgW107XG4gICAgLyoqXG4gICAgICogRm9ybWF0IG1lZXRpbmcgZGF5IGFuZCB0aW1lIGZvciBkaXNwbGF5XG4gICAgICovXG4gICAgY29uc3QgZm9ybWF0TWVldGluZ1RpbWUgPSAoZGF5LCB0aW1lKSA9PiB7XG4gICAgICAgIHJldHVybiBgJHtkYXl9cyBhdCAke3RpbWV9YDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBpbml0aWFscyBmcm9tIG5hbWUgZm9yIGF2YXRhciBwbGFjZWhvbGRlclxuICAgICAqL1xuICAgIGNvbnN0IGdldEluaXRpYWxzID0gKG5hbWUpID0+IHtcbiAgICAgICAgaWYgKCFuYW1lKVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICByZXR1cm4gbmFtZVxuICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgIC5tYXAod29yZCA9PiB3b3JkWzBdKVxuICAgICAgICAgICAgLmpvaW4oJycpXG4gICAgICAgICAgICAudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgLnNsaWNlKDAsIDIpO1xuICAgIH07XG4gICAgcmV0dXJuIChfanN4cyhDYXJkLCB7IGNsYXNzTmFtZTogY24oJ292ZXJmbG93LWhpZGRlbiBob3ZlcjpzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwJywgdmlld01vZGUgPT09ICdsaXN0JyAmJiAnZmxleCBmbGV4LXJvdycpLCBob3ZlcmFibGU6IHRydWUsIGNoaWxkcmVuOiBbdmlld01vZGUgPT09ICdncmlkJyAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmUgaC00OCBiZy1ncmFkaWVudC10by1iciBmcm9tLXByaW1hcnktMTAwIHRvLXByaW1hcnktMjAwIG92ZXJmbG93LWhpZGRlblwiLCBjaGlsZHJlbjogW2dyb3VwLmltYWdlID8gKF9qc3goXCJpbWdcIiwgeyBzcmM6IGdyb3VwLmltYWdlLCBhbHQ6IGdyb3VwLm5hbWUsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlclwiIH0pKSA6IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctZnVsbCBoLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgY2hpbGRyZW46IF9qc3goVXNlcnMsIHsgY2xhc3NOYW1lOiBcImgtMTYgdy0xNiB0ZXh0LXByaW1hcnktNDAwXCIgfSkgfSkpLCBfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImFic29sdXRlIHRvcC00IHJpZ2h0LTRcIiwgY2hpbGRyZW46IF9qc3goQmFkZ2UsIHsgdmFyaWFudDogaXNBY3RpdmUgPyAnc3VjY2VzcycgOiAnbmV1dHJhbCcsIGNoaWxkcmVuOiBpc0FjdGl2ZSA/ICdBY3RpdmUnIDogJ0luYWN0aXZlJyB9KSB9KV0gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oJ3AtNicsIHZpZXdNb2RlID09PSAnbGlzdCcgJiYgJ2ZsZXgtMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNicpLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbignbWItNCcsIHZpZXdNb2RlID09PSAnbGlzdCcgJiYgJ2ZsZXgtMSBtYi0wJyksIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBtYi0yXCIsIGNoaWxkcmVuOiBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4LTFcIiwgY2hpbGRyZW46IFtfanN4KFwiaDNcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtbmV1dHJhbC05MDAgbWItMVwiLCBjaGlsZHJlbjogZ3JvdXAubmFtZSB9KSwgdmlld01vZGUgPT09ICdsaXN0JyAmJiAoX2pzeChCYWRnZSwgeyB2YXJpYW50OiBpc0FjdGl2ZSA/ICdzdWNjZXNzJyA6ICduZXV0cmFsJywgY2xhc3NOYW1lOiBcIm1iLTJcIiwgY2hpbGRyZW46IGlzQWN0aXZlID8gJ0FjdGl2ZScgOiAnSW5hY3RpdmUnIH0pKV0gfSkgfSksIGdyb3VwLmRlc2NyaXB0aW9uICYmIHZpZXdNb2RlID09PSAnZ3JpZCcgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1uZXV0cmFsLTYwMCBtYi00IGxpbmUtY2xhbXAtMlwiLCBjaGlsZHJlbjogZ3JvdXAuZGVzY3JpcHRpb24gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBtYi00XCIsIGNoaWxkcmVuOiBbX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyZWxhdGl2ZVwiLCBjaGlsZHJlbjogZ3JvdXAubGVhZGVyX3Bob3RvID8gKF9qc3goXCJpbWdcIiwgeyBzcmM6IGdyb3VwLmxlYWRlcl9waG90bywgYWx0OiBncm91cC5sZWFkZXJfbmFtZSwgY2xhc3NOYW1lOiBcInctMTAgaC0xMCByb3VuZGVkLWZ1bGwgb2JqZWN0LWNvdmVyIGJvcmRlci0yIGJvcmRlci1wcmltYXJ5LTIwMFwiIH0pKSA6IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctMTAgaC0xMCByb3VuZGVkLWZ1bGwgYmctcHJpbWFyeS0xMDAgYm9yZGVyLTIgYm9yZGVyLXByaW1hcnktMjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIGNoaWxkcmVuOiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtcHJpbWFyeS03MDBcIiwgY2hpbGRyZW46IGdldEluaXRpYWxzKGdyb3VwLmxlYWRlcl9uYW1lKSB9KSB9KSkgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtbmV1dHJhbC01MDBcIiwgY2hpbGRyZW46IFwiTGVkIGJ5XCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTkwMFwiLCBjaGlsZHJlbjogZ3JvdXAubGVhZGVyX25hbWUgfSldIH0pXSB9KSwgZGlzcGxheU1lbWJlcnMubGVuZ3RoID4gMCAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWItNFwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCAtc3BhY2UteC0yXCIsIGNoaWxkcmVuOiBkaXNwbGF5TWVtYmVycy5tYXAoKG1lbWJlciwgaW5kZXgpID0+IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJlbGF0aXZlXCIsIHN0eWxlOiB7IHpJbmRleDogZGlzcGxheU1lbWJlcnMubGVuZ3RoIC0gaW5kZXggfSwgY2hpbGRyZW46IG1lbWJlci5waG90byA/IChfanN4KFwiaW1nXCIsIHsgc3JjOiBtZW1iZXIucGhvdG8sIGFsdDogbWVtYmVyLm5hbWUsIGNsYXNzTmFtZTogXCJ3LTggaC04IHJvdW5kZWQtZnVsbCBvYmplY3QtY292ZXIgYm9yZGVyLTIgYm9yZGVyLXdoaXRlXCIsIHRpdGxlOiBtZW1iZXIubmFtZSB9KSkgOiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ3LTggaC04IHJvdW5kZWQtZnVsbCBiZy1uZXV0cmFsLTIwMCBib3JkZXItMiBib3JkZXItd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiwgdGl0bGU6IG1lbWJlci5uYW1lLCBjaGlsZHJlbjogX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBnZXRJbml0aWFscyhtZW1iZXIubmFtZSkgfSkgfSkpIH0sIG1lbWJlci5pZCkpKSB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBtZW1iZXJDb3VudCA+IGRpc3BsYXlNZW1iZXJzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGArJHttZW1iZXJDb3VudCAtIGRpc3BsYXlNZW1iZXJzLmxlbmd0aH0gbW9yZWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBgJHttZW1iZXJDb3VudH0gJHttZW1iZXJDb3VudCA9PT0gMSA/ICdtZW1iZXInIDogJ21lbWJlcnMnfWAgfSldIH0pKSwgZGlzcGxheU1lbWJlcnMubGVuZ3RoID09PSAwICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1iLTRcIiwgY2hpbGRyZW46IF9qc3hzKEJhZGdlLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBjaGlsZHJlbjogW19qc3goVXNlcnMsIHsgY2xhc3NOYW1lOiBcImgtMyB3LTMgbXItMVwiIH0pLCBtZW1iZXJDb3VudCwgXCIgXCIsIG1lbWJlckNvdW50ID09PSAxID8gJ21lbWJlcicgOiAnbWVtYmVycyddIH0pIH0pKSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNuKCdzcGFjZS15LTInLCB2aWV3TW9kZSA9PT0gJ2xpc3QnICYmICdmbGV4IGdhcC02IHNwYWNlLXktMCcpLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIHRleHQtc20gdGV4dC1uZXV0cmFsLTYwMFwiLCBjaGlsZHJlbjogW19qc3goQ2FsZW5kYXIsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMiB0ZXh0LW5ldXRyYWwtNDAwXCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2hpbGRyZW46IGZvcm1hdE1lZXRpbmdUaW1lKGdyb3VwLm1lZXRpbmdfZGF5LCBncm91cC5tZWV0aW5nX3RpbWUpIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXIgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCIsIGNoaWxkcmVuOiBbX2pzeChNYXBQaW4sIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMiB0ZXh0LW5ldXRyYWwtNDAwXCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImxpbmUtY2xhbXAtMVwiLCBjaGlsZHJlbjogZ3JvdXAubG9jYXRpb24gfSldIH0pXSB9KV0gfSksIHNob3dBY3Rpb25zICYmIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oJ210LTQgcHQtNCBib3JkZXItdCBib3JkZXItbmV1dHJhbC0yMDAgZmxleCBmbGV4LXdyYXAgZ2FwLTInLCB2aWV3TW9kZSA9PT0gJ2xpc3QnICYmICdtdC0wIHB0LTAgYm9yZGVyLXQtMCBtbC1hdXRvIGZsZXgtY29sJyksIGNoaWxkcmVuOiBbb25WaWV3RGV0YWlscyAmJiAoX2pzeHMoQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IG9uVmlld0RldGFpbHMoZ3JvdXApLCBjbGFzc05hbWU6IFwiZmxleC0xIHNtOmZsZXgtbm9uZVwiLCBjaGlsZHJlbjogW19qc3goRXllLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00IG1yLTJcIiB9KSwgXCJWaWV3IERldGFpbHNcIl0gfSkpLCBvbkVkaXQgJiYgKF9qc3hzKEJ1dHRvbiwgeyB2YXJpYW50OiBcIm91dGxpbmVcIiwgc2l6ZTogXCJzbVwiLCBvbkNsaWNrOiAoKSA9PiBvbkVkaXQoZ3JvdXApLCBjbGFzc05hbWU6IFwiZmxleC0xIHNtOmZsZXgtbm9uZVwiLCBjaGlsZHJlbjogW19qc3goRWRpdCwgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yXCIgfSksIFwiRWRpdFwiXSB9KSksIG9uTWFuYWdlTWVtYmVycyAmJiAoX2pzeHMoQnV0dG9uLCB7IHZhcmlhbnQ6IFwib3V0bGluZVwiLCBzaXplOiBcInNtXCIsIG9uQ2xpY2s6ICgpID0+IG9uTWFuYWdlTWVtYmVycyhncm91cCksIGNsYXNzTmFtZTogXCJmbGV4LTEgc206ZmxleC1ub25lXCIsIGNoaWxkcmVuOiBbX2pzeChVc2VyUGx1cywgeyBjbGFzc05hbWU6IFwiaC00IHctNCBtci0yXCIgfSksIFwiTWFuYWdlIE1lbWJlcnNcIl0gfSkpXSB9KSldIH0pXSB9KSk7XG59KTtcbkdyb3VwQ2FyZC5kaXNwbGF5TmFtZSA9ICdHcm91cENhcmQnO1xuZXhwb3J0IGRlZmF1bHQgR3JvdXBDYXJkO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IERpYWxvZywgRGlhbG9nQ29udGVudCwgRGlhbG9nSGVhZGVyLCBEaWFsb2dUaXRsZSwgRGlhbG9nRm9vdGVyLCB9IGZyb20gJy4uL3VpL2RpYWxvZyc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi91aS9idXR0b24nO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICcuLi91aS9pbnB1dCc7XG5pbXBvcnQgeyBTZWFyY2gsIFVwbG9hZCwgWCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2xpYi9hcGknO1xuLyoqXG4gKiBTbWFsbEdyb3VwRm9ybSBDb21wb25lbnRcbiAqXG4gKiBGb3JtIGZvciBhZGRpbmcgb3IgZWRpdGluZyBzbWFsbCBncm91cCByZWNvcmRzLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBJbnB1dCBmaWVsZHMgZm9yIG5hbWUsIGRlc2NyaXB0aW9uLCBsZWFkZXIsIG1lZXRpbmcgZGV0YWlsc1xuICogLSBMZWFkZXIgc2VsZWN0b3Igd2l0aCBzZWFyY2ggZnVuY3Rpb25hbGl0eVxuICogLSBQaG90byB1cGxvYWQgd2l0aCBwcmV2aWV3XG4gKiAtIEZvcm0gdmFsaWRhdGlvbiB3aXRoIGlubGluZSBlcnJvciBtZXNzYWdlc1xuICogLSBTdXBwb3J0IGZvciBib3RoIGNyZWF0ZSBhbmQgZWRpdCBtb2Rlc1xuICogLSBNZWV0aW5nIGRheSBkcm9wZG93biB3aXRoIGFsbCBkYXlzIG9mIHRoZSB3ZWVrXG4gKiAtIFNjaGVkdWxlIHBpY2tlciAoZGF5IGFuZCB0aW1lKVxuICpcbiAqIFZhbGlkYXRlcyBSZXF1aXJlbWVudHM6IDguNFxuICogRGVzaWduIFJlZmVyZW5jZTogU21hbGwgR3JvdXBzIFBhZ2UgRGVzaWduIHNlY3Rpb25cbiAqL1xuY29uc3QgU21hbGxHcm91cEZvcm0gPSAoeyBpc09wZW4sIG9uQ2xvc2UsIG9uU3VibWl0LCBzbWFsbEdyb3VwID0gbnVsbCwgaXNMb2FkaW5nID0gZmFsc2UsIH0pID0+IHtcbiAgICBjb25zdCBbZm9ybURhdGEsIHNldEZvcm1EYXRhXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICBsZWFkZXJfbmFtZTogJycsXG4gICAgICAgIGxlYWRlcl9pZDogbnVsbCxcbiAgICAgICAgbWVldGluZ19kYXk6ICdTdW5kYXknLFxuICAgICAgICBtZWV0aW5nX3RpbWU6ICcxODowMCcsXG4gICAgICAgIGxvY2F0aW9uOiAnJyxcbiAgICAgICAgcGhvdG86IG51bGwsXG4gICAgfSk7XG4gICAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlKHt9KTtcbiAgICBjb25zdCBbaXNTdWJtaXR0aW5nLCBzZXRJc1N1Ym1pdHRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIC8vIExlYWRlciBzZWxlY3RvciBzdGF0ZVxuICAgIGNvbnN0IFtsZWFkZXJTZWFyY2gsIHNldExlYWRlclNlYXJjaF0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW21lbWJlcnMsIHNldE1lbWJlcnNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtmaWx0ZXJlZE1lbWJlcnMsIHNldEZpbHRlcmVkTWVtYmVyc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW3Nob3dMZWFkZXJEcm9wZG93biwgc2V0U2hvd0xlYWRlckRyb3Bkb3duXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbaXNMb2FkaW5nTWVtYmVycywgc2V0SXNMb2FkaW5nTWVtYmVyc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgLy8gUGhvdG8gdXBsb2FkIHN0YXRlXG4gICAgY29uc3QgW3Bob3RvUHJldmlldywgc2V0UGhvdG9QcmV2aWV3XSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IGZpbGVJbnB1dFJlZiA9IHVzZVJlZihudWxsKTtcbiAgICAvLyBEYXlzIG9mIHRoZSB3ZWVrIGZvciBkcm9wZG93blxuICAgIGNvbnN0IGRheXNPZldlZWsgPSBbXG4gICAgICAgICdNb25kYXknLFxuICAgICAgICAnVHVlc2RheScsXG4gICAgICAgICdXZWRuZXNkYXknLFxuICAgICAgICAnVGh1cnNkYXknLFxuICAgICAgICAnRnJpZGF5JyxcbiAgICAgICAgJ1NhdHVyZGF5JyxcbiAgICAgICAgJ1N1bmRheScsXG4gICAgXTtcbiAgICAvKipcbiAgICAgKiBMb2FkIG1lbWJlcnMgZm9yIGxlYWRlciBzZWxlY3RvclxuICAgICAqL1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgICAgIGxvYWRNZW1iZXJzKCk7XG4gICAgICAgIH1cbiAgICB9LCBbaXNPcGVuXSk7XG4gICAgLyoqXG4gICAgICogRmV0Y2ggbWVtYmVycyBmcm9tIEFQSVxuICAgICAqL1xuICAgIGNvbnN0IGxvYWRNZW1iZXJzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0SXNMb2FkaW5nTWVtYmVycyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldCgnL21lbWJlcnMnKTtcbiAgICAgICAgICAgIHNldE1lbWJlcnMocmVzcG9uc2UuZGF0YS5kYXRhIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgbWVtYmVyczonLCBlcnJvcik7XG4gICAgICAgICAgICBzZXRNZW1iZXJzKFtdKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldElzTG9hZGluZ01lbWJlcnMoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGaWx0ZXIgbWVtYmVycyBiYXNlZCBvbiBzZWFyY2ggcXVlcnlcbiAgICAgKi9cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAobGVhZGVyU2VhcmNoLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIHNldEZpbHRlcmVkTWVtYmVycyhtZW1iZXJzLnNsaWNlKDAsIDEwKSk7IC8vIFNob3cgZmlyc3QgMTAgbWVtYmVyc1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2VhcmNoTG93ZXIgPSBsZWFkZXJTZWFyY2gudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gbWVtYmVycy5maWx0ZXIoKG1lbWJlcikgPT4gbWVtYmVyLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcikgfHxcbiAgICAgICAgICAgICAgICBtZW1iZXIuZW1haWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcikpO1xuICAgICAgICAgICAgc2V0RmlsdGVyZWRNZW1iZXJzKGZpbHRlcmVkLnNsaWNlKDAsIDEwKSk7IC8vIExpbWl0IHRvIDEwIHJlc3VsdHNcbiAgICAgICAgfVxuICAgIH0sIFtsZWFkZXJTZWFyY2gsIG1lbWJlcnNdKTtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGZvcm0gZGF0YSB3aGVuIHNtYWxsR3JvdXAgcHJvcCBjaGFuZ2VzXG4gICAgICovXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHNtYWxsR3JvdXApIHtcbiAgICAgICAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBzbWFsbEdyb3VwLm5hbWUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHNtYWxsR3JvdXAuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgbGVhZGVyX25hbWU6IHNtYWxsR3JvdXAubGVhZGVyX25hbWUsXG4gICAgICAgICAgICAgICAgbGVhZGVyX2lkOiBzbWFsbEdyb3VwLmxlYWRlcl9pZCB8fCBudWxsLFxuICAgICAgICAgICAgICAgIG1lZXRpbmdfZGF5OiBzbWFsbEdyb3VwLm1lZXRpbmdfZGF5LFxuICAgICAgICAgICAgICAgIG1lZXRpbmdfdGltZTogc21hbGxHcm91cC5tZWV0aW5nX3RpbWUsXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IHNtYWxsR3JvdXAubG9jYXRpb24sXG4gICAgICAgICAgICAgICAgcGhvdG86IHNtYWxsR3JvdXAucGhvdG8gfHwgbnVsbCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0TGVhZGVyU2VhcmNoKHNtYWxsR3JvdXAubGVhZGVyX25hbWUpO1xuICAgICAgICAgICAgLy8gU2V0IHBob3RvIHByZXZpZXcgaWYgZWRpdGluZyBhbmQgcGhvdG8gZXhpc3RzXG4gICAgICAgICAgICBpZiAoc21hbGxHcm91cC5waG90byAmJiB0eXBlb2Ygc21hbGxHcm91cC5waG90byA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBzZXRQaG90b1ByZXZpZXcoc21hbGxHcm91cC5waG90byk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXNldCBmb3JtIGZvciBuZXcgc21hbGwgZ3JvdXBcbiAgICAgICAgICAgIHNldEZvcm1EYXRhKHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogbnVsbCxcbiAgICAgICAgICAgICAgICBsZWFkZXJfbmFtZTogJycsXG4gICAgICAgICAgICAgICAgbGVhZGVyX2lkOiBudWxsLFxuICAgICAgICAgICAgICAgIG1lZXRpbmdfZGF5OiAnU3VuZGF5JyxcbiAgICAgICAgICAgICAgICBtZWV0aW5nX3RpbWU6ICcxODowMCcsXG4gICAgICAgICAgICAgICAgbG9jYXRpb246ICcnLFxuICAgICAgICAgICAgICAgIHBob3RvOiBudWxsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRMZWFkZXJTZWFyY2goJycpO1xuICAgICAgICAgICAgc2V0UGhvdG9QcmV2aWV3KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHNldEVycm9ycyh7fSk7XG4gICAgICAgIHNldFNob3dMZWFkZXJEcm9wZG93bihmYWxzZSk7XG4gICAgfSwgW3NtYWxsR3JvdXAsIGlzT3Blbl0pO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGZvcm0gZGF0YVxuICAgICAqL1xuICAgIGNvbnN0IHZhbGlkYXRlRm9ybSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3RXJyb3JzID0ge307XG4gICAgICAgIC8vIFJlcXVpcmVkIGZpZWxkc1xuICAgICAgICBpZiAoIWZvcm1EYXRhLm5hbWUudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMubmFtZSA9ICdHcm91cCBuYW1lIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtRGF0YS5uYW1lLmxlbmd0aCA+IDEwMCkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLm5hbWUgPSAnR3JvdXAgbmFtZSBtdXN0IGJlIDEwMCBjaGFyYWN0ZXJzIG9yIGxlc3MnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZm9ybURhdGEubGVhZGVyX25hbWUudHJpbSgpKSB7XG4gICAgICAgICAgICBuZXdFcnJvcnMubGVhZGVyX25hbWUgPSAnTGVhZGVyIG5hbWUgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZvcm1EYXRhLmxlYWRlcl9uYW1lLmxlbmd0aCA+IDEwMCkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmxlYWRlcl9uYW1lID0gJ0xlYWRlciBuYW1lIG11c3QgYmUgMTAwIGNoYXJhY3RlcnMgb3IgbGVzcyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtRGF0YS5tZWV0aW5nX2RheSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLm1lZXRpbmdfZGF5ID0gJ01lZXRpbmcgZGF5IGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghZGF5c09mV2Vlay5pbmNsdWRlcyhmb3JtRGF0YS5tZWV0aW5nX2RheSkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5tZWV0aW5nX2RheSA9ICdQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgZGF5IG9mIHRoZSB3ZWVrJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLm1lZXRpbmdfdGltZSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLm1lZXRpbmdfdGltZSA9ICdNZWV0aW5nIHRpbWUgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCEvXihbMC0xXT9bMC05XXwyWzAtM10pOlswLTVdWzAtOV0kLy50ZXN0KGZvcm1EYXRhLm1lZXRpbmdfdGltZSkpIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5tZWV0aW5nX3RpbWUgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgdGltZSAoSEg6TU0pJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvcm1EYXRhLmxvY2F0aW9uLnRyaW0oKSkge1xuICAgICAgICAgICAgbmV3RXJyb3JzLmxvY2F0aW9uID0gJ0xvY2F0aW9uIGlzIHJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JtRGF0YS5sb2NhdGlvbi5sZW5ndGggPiAyMDApIHtcbiAgICAgICAgICAgIG5ld0Vycm9ycy5sb2NhdGlvbiA9ICdMb2NhdGlvbiBtdXN0IGJlIDIwMCBjaGFyYWN0ZXJzIG9yIGxlc3MnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFZhbGlkYXRlIHBob3RvIGlmIHByZXNlbnRcbiAgICAgICAgaWYgKGZvcm1EYXRhLnBob3RvICYmIGZvcm1EYXRhLnBob3RvIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsaWRUeXBlcyA9IFsnaW1hZ2UvanBlZycsICdpbWFnZS9qcGcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2dpZicsICdpbWFnZS93ZWJwJ107XG4gICAgICAgICAgICBpZiAoIXZhbGlkVHlwZXMuaW5jbHVkZXMoZm9ybURhdGEucGhvdG8udHlwZSkpIHtcbiAgICAgICAgICAgICAgICBuZXdFcnJvcnMucGhvdG8gPSAnUGhvdG8gbXVzdCBiZSBhIHZhbGlkIGltYWdlIGZpbGUgKEpQRUcsIFBORywgR0lGLCBvciBXZWJQKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtYXhTaXplID0gNSAqIDEwMjQgKiAxMDI0OyAvLyA1TUJcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS5waG90by5zaXplID4gbWF4U2l6ZSkge1xuICAgICAgICAgICAgICAgIG5ld0Vycm9ycy5waG90byA9ICdQaG90byBtdXN0IGJlIGxlc3MgdGhhbiA1TUInO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldEVycm9ycyhuZXdFcnJvcnMpO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobmV3RXJyb3JzKS5sZW5ndGggPT09IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgbGVhZGVyIHNlbGVjdGlvbiBmcm9tIGRyb3Bkb3duXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlTGVhZGVyU2VsZWN0ID0gKG1lbWJlcikgPT4ge1xuICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBsZWFkZXJfbmFtZTogbWVtYmVyLm5hbWUsXG4gICAgICAgICAgICBsZWFkZXJfaWQ6IG1lbWJlci5pZCxcbiAgICAgICAgfSkpO1xuICAgICAgICBzZXRMZWFkZXJTZWFyY2gobWVtYmVyLm5hbWUpO1xuICAgICAgICBzZXRTaG93TGVhZGVyRHJvcGRvd24oZmFsc2UpO1xuICAgICAgICAvLyBDbGVhciBlcnJvciBmb3IgbGVhZGVyIGZpZWxkXG4gICAgICAgIGlmIChlcnJvcnMubGVhZGVyX25hbWUpIHtcbiAgICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIGxlYWRlcl9uYW1lOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBsZWFkZXIgc2VhcmNoIGlucHV0IGNoYW5nZVxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUxlYWRlclNlYXJjaENoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHNldExlYWRlclNlYXJjaCh2YWx1ZSk7XG4gICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIGxlYWRlcl9uYW1lOiB2YWx1ZSxcbiAgICAgICAgICAgIGxlYWRlcl9pZDogbnVsbCwgLy8gQ2xlYXIgbGVhZGVyX2lkIHdoZW4gbWFudWFsbHkgdHlwaW5nXG4gICAgICAgIH0pKTtcbiAgICAgICAgc2V0U2hvd0xlYWRlckRyb3Bkb3duKHRydWUpO1xuICAgICAgICAvLyBDbGVhciBlcnJvciBmb3IgbGVhZGVyIGZpZWxkXG4gICAgICAgIGlmIChlcnJvcnMubGVhZGVyX25hbWUpIHtcbiAgICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIGxlYWRlcl9uYW1lOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBwaG90byBmaWxlIHNlbGVjdGlvblxuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZVBob3RvQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICBzZXRGb3JtRGF0YSgocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIHBob3RvOiBmaWxlLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHByZXZpZXcgVVJMXG4gICAgICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRQaG90b1ByZXZpZXcocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgICAgICAvLyBDbGVhciBwaG90byBlcnJvclxuICAgICAgICAgICAgaWYgKGVycm9ycy5waG90bykge1xuICAgICAgICAgICAgICAgIHNldEVycm9ycygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgcGhvdG86IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBwaG90byByZW1vdmFsXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlUGhvdG9SZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIHBob3RvOiBudWxsLFxuICAgICAgICB9KSk7XG4gICAgICAgIHNldFBob3RvUHJldmlldyhudWxsKTtcbiAgICAgICAgaWYgKGZpbGVJbnB1dFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBmaWxlSW5wdXRSZWYuY3VycmVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZS50YXJnZXQ7XG4gICAgICAgIHNldEZvcm1EYXRhKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIFtuYW1lXTogdmFsdWUsXG4gICAgICAgIH0pKTtcbiAgICAgICAgLy8gQ2xlYXIgZXJyb3IgZm9yIHRoaXMgZmllbGQgd2hlbiB1c2VyIHN0YXJ0cyB0eXBpbmdcbiAgICAgICAgaWYgKGVycm9yc1tuYW1lXSkge1xuICAgICAgICAgICAgc2V0RXJyb3JzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgW25hbWVdOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBmb3JtIHN1Ym1pc3Npb25cbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICghdmFsaWRhdGVGb3JtKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRJc1N1Ym1pdHRpbmcodHJ1ZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBJZiBwaG90byBpcyBhIEZpbGUsIHdlIG5lZWQgdG8gdXNlIEZvcm1EYXRhXG4gICAgICAgICAgICBpZiAoZm9ybURhdGEucGhvdG8gaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VibWl0RGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgIHN1Ym1pdERhdGEuYXBwZW5kKCduYW1lJywgZm9ybURhdGEubmFtZSk7XG4gICAgICAgICAgICAgICAgc3VibWl0RGF0YS5hcHBlbmQoJ2Rlc2NyaXB0aW9uJywgZm9ybURhdGEuZGVzY3JpcHRpb24gfHwgJycpO1xuICAgICAgICAgICAgICAgIHN1Ym1pdERhdGEuYXBwZW5kKCdsZWFkZXJfbmFtZScsIGZvcm1EYXRhLmxlYWRlcl9uYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoZm9ybURhdGEubGVhZGVyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdERhdGEuYXBwZW5kKCdsZWFkZXJfaWQnLCBTdHJpbmcoZm9ybURhdGEubGVhZGVyX2lkKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1Ym1pdERhdGEuYXBwZW5kKCdtZWV0aW5nX2RheScsIGZvcm1EYXRhLm1lZXRpbmdfZGF5KTtcbiAgICAgICAgICAgICAgICBzdWJtaXREYXRhLmFwcGVuZCgnbWVldGluZ190aW1lJywgZm9ybURhdGEubWVldGluZ190aW1lKTtcbiAgICAgICAgICAgICAgICBzdWJtaXREYXRhLmFwcGVuZCgnbG9jYXRpb24nLCBmb3JtRGF0YS5sb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgc3VibWl0RGF0YS5hcHBlbmQoJ3Bob3RvJywgZm9ybURhdGEucGhvdG8pO1xuICAgICAgICAgICAgICAgIGF3YWl0IG9uU3VibWl0KHN1Ym1pdERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gU3VibWl0IGFzIHJlZ3VsYXIgSlNPTlxuICAgICAgICAgICAgICAgIGF3YWl0IG9uU3VibWl0KGZvcm1EYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBzZXJ2ZXItc2lkZSB2YWxpZGF0aW9uIGVycm9yc1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlPy5kYXRhPy5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcnMoZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRG9uJ3QgY2xvc2UgdGhlIGZvcm0gaWYgdGhlcmUncyBhbiBlcnJvclxuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0SXNTdWJtaXR0aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChfanN4KERpYWxvZywgeyBvcGVuOiBpc09wZW4sIG9uT3BlbkNoYW5nZTogKCkgPT4ge1xuICAgICAgICAgICAgLy8gRG9uJ3QgYXV0b21hdGljYWxseSBjbG9zZSB0aGUgZGlhbG9nXG4gICAgICAgICAgICAvLyBUaGUgZGlhbG9nIHdpbGwgb25seSBjbG9zZSB3aGVuIG9uQ2xvc2UgaXMgZXhwbGljaXRseSBjYWxsZWRcbiAgICAgICAgfSwgY2hpbGRyZW46IF9qc3hzKERpYWxvZ0NvbnRlbnQsIHsgY2xhc3NOYW1lOiBcIm1heC13LTJ4bCBtYXgtaC1bOTB2aF0gb3ZlcmZsb3cteS1hdXRvXCIsIGNoaWxkcmVuOiBbX2pzeChEaWFsb2dIZWFkZXIsIHsgY2hpbGRyZW46IF9qc3goRGlhbG9nVGl0bGUsIHsgY2hpbGRyZW46IHNtYWxsR3JvdXAgPyAnRWRpdCBTbWFsbCBHcm91cCcgOiAnQWRkIE5ldyBTbWFsbCBHcm91cCcgfSkgfSksIF9qc3hzKFwiZm9ybVwiLCB7IG9uU3VibWl0OiBoYW5kbGVTdWJtaXQsIGNsYXNzTmFtZTogXCJzcGFjZS15LTRcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibmFtZVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIkdyb3VwIE5hbWUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcIm5hbWVcIiwgbmFtZTogXCJuYW1lXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJlLmcuLCBZb3VuZyBBZHVsdHMgRmVsbG93c2hpcFwiLCB2YWx1ZTogZm9ybURhdGEubmFtZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMubmFtZSA/ICdib3JkZXItcmVkLTUwMCcgOiAnJywgZGlzYWJsZWQ6IGlzU3VibWl0dGluZyB9KSwgZXJyb3JzLm5hbWUgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5uYW1lIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBodG1sRm9yOiBcImRlc2NyaXB0aW9uXCIsIGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJEZXNjcmlwdGlvblwiIH0pLCBfanN4KFwidGV4dGFyZWFcIiwgeyBpZDogXCJkZXNjcmlwdGlvblwiLCBuYW1lOiBcImRlc2NyaXB0aW9uXCIsIHJvd3M6IDMsIHZhbHVlOiBmb3JtRGF0YS5kZXNjcmlwdGlvbiB8fCAnJywgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBcInctZnVsbCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItaW5wdXQgYmctYmFja2dyb3VuZCBweC0zIHB5LTIgdGV4dC1zbSByaW5nLW9mZnNldC1iYWNrZ3JvdW5kIGZvY3VzLXZpc2libGU6b3V0bGluZS1ub25lIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1yaW5nIGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtMlwiLCBwbGFjZWhvbGRlcjogXCJCcmllZiBkZXNjcmlwdGlvbiBvZiB0aGUgZ3JvdXAncyBwdXJwb3NlIGFuZCBhY3Rpdml0aWVzLi4uXCIsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfSksIGVycm9ycy5kZXNjcmlwdGlvbiAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLmRlc2NyaXB0aW9uIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJlbGF0aXZlXCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibGVhZGVyX25hbWVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJMZWFkZXIgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyZWxhdGl2ZVwiLCBjaGlsZHJlbjogW19qc3goU2VhcmNoLCB7IGNsYXNzTmFtZTogXCJhYnNvbHV0ZSBsZWZ0LTMgdG9wLTEvMiB0cmFuc2Zvcm0gLXRyYW5zbGF0ZS15LTEvMiBoLTQgdy00IHRleHQtZ3JheS00MDBcIiB9KSwgX2pzeChJbnB1dCwgeyBpZDogXCJsZWFkZXJfbmFtZVwiLCBuYW1lOiBcImxlYWRlcl9uYW1lXCIsIHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCJTZWFyY2ggZm9yIGEgbWVtYmVyLi4uXCIsIHZhbHVlOiBsZWFkZXJTZWFyY2gsIG9uQ2hhbmdlOiBoYW5kbGVMZWFkZXJTZWFyY2hDaGFuZ2UsIG9uRm9jdXM6ICgpID0+IHNldFNob3dMZWFkZXJEcm9wZG93bih0cnVlKSwgb25CbHVyOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWxheSB0byBhbGxvdyBjbGljayBvbiBkcm9wZG93biBpdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFNob3dMZWFkZXJEcm9wZG93bihmYWxzZSksIDIwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGNsYXNzTmFtZTogYHBsLTEwICR7ZXJyb3JzLmxlYWRlcl9uYW1lID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnfWAsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfSldIH0pLCBlcnJvcnMubGVhZGVyX25hbWUgJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5sZWFkZXJfbmFtZSB9KSksIHNob3dMZWFkZXJEcm9wZG93biAmJiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJhYnNvbHV0ZSB6LTEwIHctZnVsbCBtdC0xIGJnLXdoaXRlIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1tZCBzaGFkb3ctbGcgbWF4LWgtNjAgb3ZlcmZsb3cteS1hdXRvXCIsIGNoaWxkcmVuOiBpc0xvYWRpbmdNZW1iZXJzID8gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicHgtNCBweS0zIHRleHQtc20gdGV4dC1ncmF5LTUwMFwiLCBjaGlsZHJlbjogXCJMb2FkaW5nIG1lbWJlcnMuLi5cIiB9KSkgOiBmaWx0ZXJlZE1lbWJlcnMubGVuZ3RoID4gMCA/IChmaWx0ZXJlZE1lbWJlcnMubWFwKChtZW1iZXIpID0+IChfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogKCkgPT4gaGFuZGxlTGVhZGVyU2VsZWN0KG1lbWJlciksIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIHRleHQtbGVmdCBob3ZlcjpiZy1ncmF5LTEwMCBmb2N1czpiZy1ncmF5LTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgdHJhbnNpdGlvbi1jb2xvcnNcIiwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCIsIGNoaWxkcmVuOiBbbWVtYmVyLnBob3RvID8gKF9qc3goXCJpbWdcIiwgeyBzcmM6IG1lbWJlci5waG90bywgYWx0OiBtZW1iZXIubmFtZSwgY2xhc3NOYW1lOiBcInctOCBoLTggcm91bmRlZC1mdWxsIG9iamVjdC1jb3ZlclwiIH0pKSA6IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInctOCBoLTggcm91bmRlZC1mdWxsIGJnLXByaW1hcnktMTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIGNoaWxkcmVuOiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXByaW1hcnktNjAwIHRleHQtc20gZm9udC1tZWRpdW1cIiwgY2hpbGRyZW46IG1lbWJlci5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpIH0pIH0pKSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC0xIG1pbi13LTBcIiwgY2hpbGRyZW46IFtfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS05MDAgdHJ1bmNhdGVcIiwgY2hpbGRyZW46IG1lbWJlci5uYW1lIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhzIHRleHQtZ3JheS01MDAgdHJ1bmNhdGVcIiwgY2hpbGRyZW46IG1lbWJlci5lbWFpbCB9KV0gfSldIH0pIH0sIG1lbWJlci5pZCkpKSkgOiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJweC00IHB5LTMgdGV4dC1zbSB0ZXh0LWdyYXktNTAwXCIsIGNoaWxkcmVuOiBsZWFkZXJTZWFyY2gudHJpbSgpID09PSAnJyA/ICdTdGFydCB0eXBpbmcgdG8gc2VhcmNoLi4uJyA6ICdObyBtZW1iZXJzIGZvdW5kJyB9KSkgfSkpXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJtZWV0aW5nX2RheVwiLCBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIk1lZXRpbmcgRGF5IFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChcInNlbGVjdFwiLCB7IGlkOiBcIm1lZXRpbmdfZGF5XCIsIG5hbWU6IFwibWVldGluZ19kYXlcIiwgdmFsdWU6IGZvcm1EYXRhLm1lZXRpbmdfZGF5LCBvbkNoYW5nZTogaGFuZGxlQ2hhbmdlLCBjbGFzc05hbWU6IFwiaC0xMCB3LWZ1bGwgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWlucHV0IGJnLWJhY2tncm91bmQgcHgtMyBweS0yIHRleHQtc20gcmluZy1vZmZzZXQtYmFja2dyb3VuZCBmb2N1cy12aXNpYmxlOm91dGxpbmUtbm9uZSBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcmluZyBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTJcIiwgZGlzYWJsZWQ6IGlzU3VibWl0dGluZywgY2hpbGRyZW46IGRheXNPZldlZWsubWFwKChkYXkpID0+IChfanN4KFwib3B0aW9uXCIsIHsgdmFsdWU6IGRheSwgY2hpbGRyZW46IGRheSB9LCBkYXkpKSkgfSksIGVycm9ycy5tZWV0aW5nX2RheSAmJiAoX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMVwiLCBjaGlsZHJlbjogZXJyb3JzLm1lZXRpbmdfZGF5IH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogXCJtZWV0aW5nX3RpbWVcIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJNZWV0aW5nIFRpbWUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4KElucHV0LCB7IGlkOiBcIm1lZXRpbmdfdGltZVwiLCBuYW1lOiBcIm1lZXRpbmdfdGltZVwiLCB0eXBlOiBcInRpbWVcIiwgdmFsdWU6IGZvcm1EYXRhLm1lZXRpbmdfdGltZSwgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSwgY2xhc3NOYW1lOiBlcnJvcnMubWVldGluZ190aW1lID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMubWVldGluZ190aW1lICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMubWVldGluZ190aW1lIH0pKV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGh0bWxGb3I6IFwibG9jYXRpb25cIiwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJMb2NhdGlvbiBcIiwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1yZWQtNTAwXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSksIF9qc3goSW5wdXQsIHsgaWQ6IFwibG9jYXRpb25cIiwgbmFtZTogXCJsb2NhdGlvblwiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IFwiZS5nLiwgQ2h1cmNoIEZlbGxvd3NoaXAgSGFsbFwiLCB2YWx1ZTogZm9ybURhdGEubG9jYXRpb24sIG9uQ2hhbmdlOiBoYW5kbGVDaGFuZ2UsIGNsYXNzTmFtZTogZXJyb3JzLmxvY2F0aW9uID8gJ2JvcmRlci1yZWQtNTAwJyA6ICcnLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIH0pLCBlcnJvcnMubG9jYXRpb24gJiYgKF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1yZWQtNjAwIG10LTFcIiwgY2hpbGRyZW46IGVycm9ycy5sb2NhdGlvbiB9KSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIkdyb3VwIFBob3RvXCIgfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktM1wiLCBjaGlsZHJlbjogW3Bob3RvUHJldmlldyAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicmVsYXRpdmUgaW5saW5lLWJsb2NrXCIsIGNoaWxkcmVuOiBbX2pzeChcImltZ1wiLCB7IHNyYzogcGhvdG9QcmV2aWV3LCBhbHQ6IFwiR3JvdXAgcGhvdG8gcHJldmlld1wiLCBjbGFzc05hbWU6IFwidy0zMiBoLTMyIG9iamVjdC1jb3ZlciByb3VuZGVkLWxnIGJvcmRlci0yIGJvcmRlci1ncmF5LTIwMFwiIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogaGFuZGxlUGhvdG9SZW1vdmUsIGNsYXNzTmFtZTogXCJhYnNvbHV0ZSAtdG9wLTIgLXJpZ2h0LTIgYmctcmVkLTUwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtZnVsbCBwLTEgaG92ZXI6YmctcmVkLTYwMCB0cmFuc2l0aW9uLWNvbG9yc1wiLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nLCBjaGlsZHJlbjogX2pzeChYLCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSkgfSldIH0pKSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJpbnB1dFwiLCB7IHJlZjogZmlsZUlucHV0UmVmLCB0eXBlOiBcImZpbGVcIiwgYWNjZXB0OiBcImltYWdlLypcIiwgb25DaGFuZ2U6IGhhbmRsZVBob3RvQ2hhbmdlLCBjbGFzc05hbWU6IFwiaGlkZGVuXCIsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcgfSksIF9qc3hzKEJ1dHRvbiwgeyB0eXBlOiBcImJ1dHRvblwiLCB2YXJpYW50OiBcIm91dGxpbmVcIiwgb25DbGljazogKCkgPT4gZmlsZUlucHV0UmVmLmN1cnJlbnQ/LmNsaWNrKCksIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgc206dy1hdXRvXCIsIGNoaWxkcmVuOiBbX2pzeChVcGxvYWQsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMlwiIH0pLCBwaG90b1ByZXZpZXcgPyAnQ2hhbmdlIFBob3RvJyA6ICdVcGxvYWQgUGhvdG8nXSB9KSwgX2pzeChcInBcIiwgeyBjbGFzc05hbWU6IFwidGV4dC14cyB0ZXh0LWdyYXktNTAwIG10LTFcIiwgY2hpbGRyZW46IFwiUmVjb21tZW5kZWQ6IFNxdWFyZSBpbWFnZSwgbWF4IDVNQiAoSlBFRywgUE5HLCBHSUYsIG9yIFdlYlApXCIgfSldIH0pXSB9KSwgZXJyb3JzLnBob3RvICYmIChfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXNtIHRleHQtcmVkLTYwMCBtdC0xXCIsIGNoaWxkcmVuOiBlcnJvcnMucGhvdG8gfSkpXSB9KSwgX2pzeHMoRGlhbG9nRm9vdGVyLCB7IGNsYXNzTmFtZTogXCJtdC02XCIsIGNoaWxkcmVuOiBbX2pzeChCdXR0b24sIHsgdHlwZTogXCJidXR0b25cIiwgdmFyaWFudDogXCJvdXRsaW5lXCIsIG9uQ2xpY2s6IG9uQ2xvc2UsIGRpc2FibGVkOiBpc1N1Ym1pdHRpbmcsIGNoaWxkcmVuOiBcIkNhbmNlbFwiIH0pLCBfanN4KEJ1dHRvbiwgeyB0eXBlOiBcInN1Ym1pdFwiLCBkaXNhYmxlZDogaXNTdWJtaXR0aW5nIHx8IGlzTG9hZGluZywgY2hpbGRyZW46IGlzU3VibWl0dGluZyA/ICdTYXZpbmcuLi4nIDogc21hbGxHcm91cCA/ICdVcGRhdGUgR3JvdXAnIDogJ0FkZCBHcm91cCcgfSldIH0pXSB9KV0gfSkgfSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFNtYWxsR3JvdXBGb3JtO1xuIiwiaW1wb3J0IHsganN4IGFzIF9qc3gsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3ZhIH0gZnJvbSBcImNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eVwiO1xuaW1wb3J0IHsgY24gfSBmcm9tIFwiLi4vLi4vbGliL3V0aWxzXCI7XG5jb25zdCBiYWRnZVZhcmlhbnRzID0gY3ZhKFwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1vZmZzZXQtMlwiLCB7XG4gICAgdmFyaWFudHM6IHtcbiAgICAgICAgdmFyaWFudDoge1xuICAgICAgICAgICAgcHJpbWFyeTogXCJiZy1wcmltYXJ5LTEwMCB0ZXh0LXByaW1hcnktNzAwIGJvcmRlci1wcmltYXJ5LTIwMCBmb2N1czpyaW5nLXByaW1hcnktNTAwXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBcImJnLXN1Y2Nlc3MtbGlnaHQgdGV4dC1zdWNjZXNzLWRhcmsgYm9yZGVyLXN1Y2Nlc3MtREVGQVVMVCBmb2N1czpyaW5nLXN1Y2Nlc3MtREVGQVVMVFwiLFxuICAgICAgICAgICAgd2FybmluZzogXCJiZy13YXJuaW5nLWxpZ2h0IHRleHQtd2FybmluZy1kYXJrIGJvcmRlci13YXJuaW5nLURFRkFVTFQgZm9jdXM6cmluZy13YXJuaW5nLURFRkFVTFRcIixcbiAgICAgICAgICAgIGVycm9yOiBcImJnLWVycm9yLWxpZ2h0IHRleHQtZXJyb3ItZGFyayBib3JkZXItZXJyb3ItREVGQVVMVCBmb2N1czpyaW5nLWVycm9yLURFRkFVTFRcIixcbiAgICAgICAgICAgIGRhbmdlcjogXCJiZy1lcnJvci1saWdodCB0ZXh0LWVycm9yLWRhcmsgYm9yZGVyLWVycm9yLURFRkFVTFQgZm9jdXM6cmluZy1lcnJvci1ERUZBVUxUXCIsXG4gICAgICAgICAgICBuZXV0cmFsOiBcImJnLW5ldXRyYWwtMTAwIHRleHQtbmV1dHJhbC03MDAgYm9yZGVyLW5ldXRyYWwtMzAwIGZvY3VzOnJpbmctbmV1dHJhbC01MDBcIixcbiAgICAgICAgICAgIG91dGxpbmU6IFwiYmctdHJhbnNwYXJlbnQgdGV4dC1uZXV0cmFsLTcwMCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMzAwIGZvY3VzOnJpbmctbmV1dHJhbC01MDBcIixcbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgICAgc206IFwiaC01IHB4LTIgdGV4dC14cyBnYXAtMVwiLFxuICAgICAgICAgICAgbWQ6IFwiaC02IHB4LTIuNSB0ZXh0LXNtIGdhcC0xLjVcIixcbiAgICAgICAgICAgIGxnOiBcImgtNyBweC0zIHRleHQtYmFzZSBnYXAtMlwiLFxuICAgICAgICB9LFxuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgcm91bmRlZDogXCJyb3VuZGVkLW1kXCIsXG4gICAgICAgICAgICBwaWxsOiBcInJvdW5kZWQtZnVsbFwiLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgZGVmYXVsdFZhcmlhbnRzOiB7XG4gICAgICAgIHZhcmlhbnQ6IFwibmV1dHJhbFwiLFxuICAgICAgICBzaXplOiBcIm1kXCIsXG4gICAgICAgIHNoYXBlOiBcInJvdW5kZWRcIixcbiAgICB9LFxufSk7XG5jb25zdCBCYWRnZSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCB2YXJpYW50LCBzaXplLCBzaGFwZSwgaWNvbiwgY2hpbGRyZW4sIC4uLnByb3BzIH0sIHJlZikgPT4ge1xuICAgIHJldHVybiAoX2pzeHMoXCJzcGFuXCIsIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oYmFkZ2VWYXJpYW50cyh7IHZhcmlhbnQsIHNpemUsIHNoYXBlIH0pLCBjbGFzc05hbWUpLCAuLi5wcm9wcywgY2hpbGRyZW46IFtpY29uICYmIChfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXJcIiwgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIiwgY2hpbGRyZW46IGljb24gfSkpLCBjaGlsZHJlbl0gfSkpO1xufSk7XG5CYWRnZS5kaXNwbGF5TmFtZSA9IFwiQmFkZ2VcIjtcbmV4cG9ydCB7IEJhZGdlLCBiYWRnZVZhcmlhbnRzIH07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBEaWFsb2dQcmltaXRpdmUgZnJvbSBcIkByYWRpeC11aS9yZWFjdC1kaWFsb2dcIjtcbmltcG9ydCB7IFggfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCIuLi8uLi9saWIvdXRpbHNcIjtcbmNvbnN0IERpYWxvZyA9IERpYWxvZ1ByaW1pdGl2ZS5Sb290O1xuY29uc3QgRGlhbG9nVHJpZ2dlciA9IERpYWxvZ1ByaW1pdGl2ZS5UcmlnZ2VyO1xuY29uc3QgRGlhbG9nUG9ydGFsID0gRGlhbG9nUHJpbWl0aXZlLlBvcnRhbDtcbmNvbnN0IERpYWxvZ0Nsb3NlID0gRGlhbG9nUHJpbWl0aXZlLkNsb3NlO1xuY29uc3QgRGlhbG9nT3ZlcmxheSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5PdmVybGF5LCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLWJhY2tncm91bmQvODAgYmFja2Ryb3AtYmx1ci1zbSBkYXRhLVtzdGF0ZT1vcGVuXTphbmltYXRlLWluIGRhdGEtW3N0YXRlPWNsb3NlZF06YW5pbWF0ZS1vdXQgZGF0YS1bc3RhdGU9Y2xvc2VkXTpmYWRlLW91dC0wIGRhdGEtW3N0YXRlPW9wZW5dOmZhZGUtaW4tMFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nT3ZlcmxheS5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5PdmVybGF5LmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nQ29udGVudCA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCBjaGlsZHJlbiwgc2hvd0Nsb3NlQnV0dG9uID0gdHJ1ZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeHMoRGlhbG9nUG9ydGFsLCB7IGNoaWxkcmVuOiBbX2pzeChEaWFsb2dPdmVybGF5LCB7fSksIF9qc3hzKERpYWxvZ1ByaW1pdGl2ZS5Db250ZW50LCB7IHJlZjogcmVmLCBjbGFzc05hbWU6IGNuKFwiZml4ZWQgbGVmdC1bNTAlXSB0b3AtWzUwJV0gei01MCBncmlkIHctZnVsbCBtYXgtdy1sZyB0cmFuc2xhdGUteC1bLTUwJV0gdHJhbnNsYXRlLXktWy01MCVdIGdhcC00IGJvcmRlciBiZy1iYWNrZ3JvdW5kIHNoYWRvdy1sZyBkdXJhdGlvbi0yMDAgZGF0YS1bc3RhdGU9b3Blbl06YW5pbWF0ZS1pbiBkYXRhLVtzdGF0ZT1jbG9zZWRdOmFuaW1hdGUtb3V0IGRhdGEtW3N0YXRlPWNsb3NlZF06ZmFkZS1vdXQtMCBkYXRhLVtzdGF0ZT1vcGVuXTpmYWRlLWluLTAgZGF0YS1bc3RhdGU9Y2xvc2VkXTp6b29tLW91dC05NSBkYXRhLVtzdGF0ZT1vcGVuXTp6b29tLWluLTk1IGRhdGEtW3N0YXRlPWNsb3NlZF06c2xpZGUtb3V0LXRvLWxlZnQtMS8yIGRhdGEtW3N0YXRlPWNsb3NlZF06c2xpZGUtb3V0LXRvLXRvcC1bNDglXSBkYXRhLVtzdGF0ZT1vcGVuXTpzbGlkZS1pbi1mcm9tLWxlZnQtMS8yIGRhdGEtW3N0YXRlPW9wZW5dOnNsaWRlLWluLWZyb20tdG9wLVs0OCVdIHNtOnJvdW5kZWQtbGdcIiwgXG4gICAgICAgICAgICAvLyBNb2JpbGUgb3B0aW1pemF0aW9uczogZnVsbCBzY3JlZW4gb24gbW9iaWxlIHdpdGggcHJvcGVyIHBhZGRpbmcgYW5kIHNjcm9sbGluZ1xuICAgICAgICAgICAgXCJtYXgtaC1bMTAwZHZoXSBzbTptYXgtaC1bOTB2aF0gb3ZlcmZsb3cteS1hdXRvXCIsIFwibS0wIHNtOm0tNCBwLTQgc206cC02XCIsIFwicm91bmRlZC1ub25lIHNtOnJvdW5kZWQtbGdcIiwgXCJ3LVsxMDB2d10gc206dy1mdWxsXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzLCBjaGlsZHJlbjogW2NoaWxkcmVuLCBzaG93Q2xvc2VCdXR0b24gJiYgKF9qc3hzKERpYWxvZ1ByaW1pdGl2ZS5DbG9zZSwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgcmlnaHQtNCB0b3AtNCByb3VuZGVkLXNtIG9wYWNpdHktNzAgcmluZy1vZmZzZXQtYmFja2dyb3VuZCB0cmFuc2l0aW9uLW9wYWNpdHkgaG92ZXI6b3BhY2l0eS0xMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXJpbmcgZm9jdXM6cmluZy1vZmZzZXQtMiBkaXNhYmxlZDpwb2ludGVyLWV2ZW50cy1ub25lIGRhdGEtW3N0YXRlPW9wZW5dOmJnLWFjY2VudCBkYXRhLVtzdGF0ZT1vcGVuXTp0ZXh0LW11dGVkLWZvcmVncm91bmRcIiwgY2hpbGRyZW46IFtfanN4KFgsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwic3Itb25seVwiLCBjaGlsZHJlbjogXCJDbG9zZVwiIH0pXSB9KSldIH0pXSB9KSkpO1xuRGlhbG9nQ29udGVudC5kaXNwbGF5TmFtZSA9IERpYWxvZ1ByaW1pdGl2ZS5Db250ZW50LmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nSGVhZGVyID0gKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oXCJmbGV4IGZsZXgtY29sIHNwYWNlLXktMS41IHRleHQtY2VudGVyIHNtOnRleHQtbGVmdFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSk7XG5EaWFsb2dIZWFkZXIuZGlzcGxheU5hbWUgPSBcIkRpYWxvZ0hlYWRlclwiO1xuY29uc3QgRGlhbG9nRm9vdGVyID0gKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSA9PiAoX2pzeChcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oXCJmbGV4IGZsZXgtY29sLXJldmVyc2UgZ2FwLTIgc206ZmxleC1yb3cgc206anVzdGlmeS1lbmQgc206c3BhY2UteC0yIHNtOmdhcC0wXCIsIGNsYXNzTmFtZSksIC4uLnByb3BzIH0pKTtcbkRpYWxvZ0Zvb3Rlci5kaXNwbGF5TmFtZSA9IFwiRGlhbG9nRm9vdGVyXCI7XG5jb25zdCBEaWFsb2dUaXRsZSA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCAuLi5wcm9wcyB9LCByZWYpID0+IChfanN4KERpYWxvZ1ByaW1pdGl2ZS5UaXRsZSwgeyByZWY6IHJlZiwgY2xhc3NOYW1lOiBjbihcInRleHQtbGcgZm9udC1zZW1pYm9sZCBsZWFkaW5nLW5vbmUgdHJhY2tpbmctdGlnaHRcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSkpKTtcbkRpYWxvZ1RpdGxlLmRpc3BsYXlOYW1lID0gRGlhbG9nUHJpbWl0aXZlLlRpdGxlLmRpc3BsYXlOYW1lO1xuY29uc3QgRGlhbG9nRGVzY3JpcHRpb24gPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGNsYXNzTmFtZSwgLi4ucHJvcHMgfSwgcmVmKSA9PiAoX2pzeChEaWFsb2dQcmltaXRpdmUuRGVzY3JpcHRpb24sIHsgcmVmOiByZWYsIGNsYXNzTmFtZTogY24oXCJ0ZXh0LXNtIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiLCBjbGFzc05hbWUpLCAuLi5wcm9wcyB9KSkpO1xuRGlhbG9nRGVzY3JpcHRpb24uZGlzcGxheU5hbWUgPSBEaWFsb2dQcmltaXRpdmUuRGVzY3JpcHRpb24uZGlzcGxheU5hbWU7XG5leHBvcnQgeyBEaWFsb2csIERpYWxvZ1BvcnRhbCwgRGlhbG9nT3ZlcmxheSwgRGlhbG9nQ2xvc2UsIERpYWxvZ1RyaWdnZXIsIERpYWxvZ0NvbnRlbnQsIERpYWxvZ0hlYWRlciwgRGlhbG9nRm9vdGVyLCBEaWFsb2dUaXRsZSwgRGlhbG9nRGVzY3JpcHRpb24sIH07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjdmEgfSBmcm9tIFwiY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCIuLi8uLi9saWIvdXRpbHNcIjtcbmNvbnN0IGlucHV0VmFyaWFudHMgPSBjdmEoXCJibG9jayB3LWZ1bGwgcm91bmRlZC1sZyBib3JkZXIgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMjAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1vZmZzZXQtMFwiLCB7XG4gICAgdmFyaWFudHM6IHtcbiAgICAgICAgdmFyaWFudDoge1xuICAgICAgICAgICAgZGVmYXVsdDogXCJib3JkZXItbmV1dHJhbC0zMDAgYmctd2hpdGUgdGV4dC1uZXV0cmFsLTkwMCBwbGFjZWhvbGRlci1uZXV0cmFsLTQwMCBmb2N1czpib3JkZXItcHJpbWFyeS01MDAgZm9jdXM6cmluZy1wcmltYXJ5LTUwMFwiLFxuICAgICAgICAgICAgZXJyb3I6IFwiYm9yZGVyLWVycm9yLTUwMCBiZy1lcnJvci01MCB0ZXh0LWVycm9yLTkwMCBwbGFjZWhvbGRlci1lcnJvci00MDAgZm9jdXM6Ym9yZGVyLWVycm9yLTUwMCBmb2N1czpyaW5nLWVycm9yLTUwMFwiLFxuICAgICAgICB9LFxuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICBzbTogXCJweC0zIHB5LTEuNSB0ZXh0LXNtIGgtOFwiLFxuICAgICAgICAgICAgbWQ6IFwicHgtNCBweS0yIHRleHQtYmFzZSBoLTEwIG1pbi1oLVs0NHB4XVwiLCAvLyBNaW5pbXVtIDQ0cHggZm9yIHRvdWNoIHRhcmdldHMgb24gbW9iaWxlXG4gICAgICAgICAgICBsZzogXCJweC00IHB5LTMgdGV4dC1sZyBoLTEyXCIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBkZWZhdWx0VmFyaWFudHM6IHtcbiAgICAgICAgdmFyaWFudDogXCJkZWZhdWx0XCIsXG4gICAgICAgIHNpemU6IFwibWRcIixcbiAgICB9LFxufSk7XG4vKipcbiAqIEdldCBhcHByb3ByaWF0ZSBpbnB1dE1vZGUgZm9yIG1vYmlsZSBrZXlib2FyZHMgYmFzZWQgb24gaW5wdXQgdHlwZVxuICovXG5jb25zdCBnZXRJbnB1dE1vZGUgPSAodHlwZSkgPT4ge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgICAgICByZXR1cm4gJ2VtYWlsJztcbiAgICAgICAgY2FzZSAndGVsJzpcbiAgICAgICAgICAgIHJldHVybiAndGVsJztcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIHJldHVybiAnbnVtZXJpYyc7XG4gICAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgICAgICByZXR1cm4gJ3VybCc7XG4gICAgICAgIGNhc2UgJ3NlYXJjaCc6XG4gICAgICAgICAgICByZXR1cm4gJ3NlYXJjaCc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gJ3RleHQnO1xuICAgIH1cbn07XG5jb25zdCBJbnB1dCA9IFJlYWN0LmZvcndhcmRSZWYoKHsgY2xhc3NOYW1lLCB0eXBlID0gJ3RleHQnLCBsYWJlbCwgZXJyb3IsIGhlbHBlclRleHQsIGljb24sIGljb25Qb3NpdGlvbiA9ICdsZWZ0JywgZnVsbFdpZHRoID0gdHJ1ZSwgZGlzYWJsZWQsIHJlcXVpcmVkLCBpZCwgdmFyaWFudCwgc2l6ZSwgaW5wdXRNb2RlLCAuLi5wcm9wcyB9LCByZWYpID0+IHtcbiAgICBjb25zdCBpbnB1dElkID0gaWQgfHwgYGlucHV0LSR7UmVhY3QudXNlSWQoKX1gO1xuICAgIGNvbnN0IGVycm9ySWQgPSBlcnJvciA/IGAke2lucHV0SWR9LWVycm9yYCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBoZWxwZXJUZXh0SWQgPSBoZWxwZXJUZXh0ID8gYCR7aW5wdXRJZH0taGVscGVyYCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBoYXNFcnJvciA9ICEhZXJyb3I7XG4gICAgY29uc3QgY3VycmVudFZhcmlhbnQgPSBoYXNFcnJvciA/ICdlcnJvcicgOiB2YXJpYW50O1xuICAgIC8vIFVzZSBwcm92aWRlZCBpbnB1dE1vZGUgb3IgZGV0ZXJtaW5lIGZyb20gdHlwZSBmb3IgbW9iaWxlIGtleWJvYXJkIG9wdGltaXphdGlvblxuICAgIGNvbnN0IG1vYmlsZUlucHV0TW9kZSA9IGlucHV0TW9kZSB8fCBnZXRJbnB1dE1vZGUodHlwZSk7XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogY24oXCJzcGFjZS15LTFcIiwgZnVsbFdpZHRoICYmIFwidy1mdWxsXCIpLCBjaGlsZHJlbjogW2xhYmVsICYmIChfanN4cyhcImxhYmVsXCIsIHsgaHRtbEZvcjogaW5wdXRJZCwgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTcwMFwiLCBjaGlsZHJlbjogW2xhYmVsLCByZXF1aXJlZCAmJiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWVycm9yLTUwMCBtbC0xXCIsIFwiYXJpYS1sYWJlbFwiOiBcInJlcXVpcmVkXCIsIGNoaWxkcmVuOiBcIipcIiB9KV0gfSkpLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyZWxhdGl2ZVwiLCBjaGlsZHJlbjogW2ljb24gJiYgaWNvblBvc2l0aW9uID09PSAnbGVmdCcgJiYgKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYWJzb2x1dGUgbGVmdC0zIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB0ZXh0LW5ldXRyYWwtNDAwIHBvaW50ZXItZXZlbnRzLW5vbmVcIiwgXCJhcmlhLWhpZGRlblwiOiBcInRydWVcIiwgY2hpbGRyZW46IGljb24gfSkpLCBfanN4KFwiaW5wdXRcIiwgeyByZWY6IHJlZiwgdHlwZTogdHlwZSwgaWQ6IGlucHV0SWQsIGRpc2FibGVkOiBkaXNhYmxlZCwgcmVxdWlyZWQ6IHJlcXVpcmVkLCBpbnB1dE1vZGU6IG1vYmlsZUlucHV0TW9kZSwgXCJhcmlhLWludmFsaWRcIjogaGFzRXJyb3IsIFwiYXJpYS1kZXNjcmliZWRieVwiOiBjbihlcnJvcklkICYmIGVycm9ySWQsIGhlbHBlclRleHRJZCAmJiBoZWxwZXJUZXh0SWQpIHx8IHVuZGVmaW5lZCwgY2xhc3NOYW1lOiBjbihpbnB1dFZhcmlhbnRzKHsgdmFyaWFudDogY3VycmVudFZhcmlhbnQsIHNpemUgfSksIGljb24gJiYgaWNvblBvc2l0aW9uID09PSAnbGVmdCcgJiYgXCJwbC0xMFwiLCBpY29uICYmIGljb25Qb3NpdGlvbiA9PT0gJ3JpZ2h0JyAmJiBcInByLTEwXCIsIGRpc2FibGVkICYmIFwiYmctbmV1dHJhbC0xMDAgdGV4dC1uZXV0cmFsLTUwMCBjdXJzb3Itbm90LWFsbG93ZWRcIiwgY2xhc3NOYW1lKSwgLi4ucHJvcHMgfSksIGljb24gJiYgaWNvblBvc2l0aW9uID09PSAncmlnaHQnICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImFic29sdXRlIHJpZ2h0LTMgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHRleHQtbmV1dHJhbC00MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiLCBcImFyaWEtaGlkZGVuXCI6IFwidHJ1ZVwiLCBjaGlsZHJlbjogaWNvbiB9KSldIH0pLCBlcnJvciAmJiAoX2pzeChcInBcIiwgeyBpZDogZXJyb3JJZCwgY2xhc3NOYW1lOiBcInRleHQtc20gdGV4dC1lcnJvci02MDBcIiwgcm9sZTogXCJhbGVydFwiLCBjaGlsZHJlbjogZXJyb3IgfSkpLCBoZWxwZXJUZXh0ICYmICFlcnJvciAmJiAoX2pzeChcInBcIiwgeyBpZDogaGVscGVyVGV4dElkLCBjbGFzc05hbWU6IFwidGV4dC1zbSB0ZXh0LW5ldXRyYWwtNTAwXCIsIGNoaWxkcmVuOiBoZWxwZXJUZXh0IH0pKV0gfSkpO1xufSk7XG5JbnB1dC5kaXNwbGF5TmFtZSA9IFwiSW5wdXRcIjtcbmV4cG9ydCB7IElucHV0LCBpbnB1dFZhcmlhbnRzIH07XG4iLCJpbXBvcnQgYXBpIGZyb20gJy4vYXBpJztcbi8qKlxuICogU21hbGwgR3JvdXAgQVBJIGNsaWVudFxuICpcbiAqIFByb3ZpZGVzIG1ldGhvZHMgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIHNtYWxsIGdyb3VwcyBBUEkgZW5kcG9pbnRzLlxuICovXG5leHBvcnQgY29uc3Qgc21hbGxHcm91cEFwaSA9IHtcbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIHNtYWxsIGdyb3Vwc1xuICAgICAqL1xuICAgIGFzeW5jIGdldFNtYWxsR3JvdXBzKCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5nZXQoJy9zbWFsbC1ncm91cHMnKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YSB8fCBbXTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEdldCBhIHNpbmdsZSBzbWFsbCBncm91cCBieSBJRFxuICAgICAqL1xuICAgIGFzeW5jIGdldFNtYWxsR3JvdXAoaWQpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvc21hbGwtZ3JvdXBzLyR7aWR9YCk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLmRhdGE7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgc21hbGwgZ3JvdXBcbiAgICAgKi9cbiAgICBhc3luYyBjcmVhdGVTbWFsbEdyb3VwKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdCgnL3NtYWxsLWdyb3VwcycsIGRhdGEpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGFuIGV4aXN0aW5nIHNtYWxsIGdyb3VwXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlU21hbGxHcm91cChpZCwgZGF0YSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wdXQoYC9zbWFsbC1ncm91cHMvJHtpZH1gLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuZGF0YTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIHNtYWxsIGdyb3VwXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlU21hbGxHcm91cChpZCkge1xuICAgICAgICBhd2FpdCBhcGkuZGVsZXRlKGAvc21hbGwtZ3JvdXBzLyR7aWR9YCk7XG4gICAgfSxcbn07XG4iLCJpbXBvcnQgeyBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4cyB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBQbHVzLCBVc2VycywgR3JpZCwgTGlzdCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyB1c2VBdXRoIH0gZnJvbSAnLi4vY29udGV4dHMvQXV0aENvbnRleHQnO1xuaW1wb3J0IHsgdXNlVG9hc3QgfSBmcm9tICcuLi9jb250ZXh0cy9Ub2FzdENvbnRleHQnO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnLi4vY29tcG9uZW50cy91aS9idXR0b24nO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvdWkvY2FyZCc7XG5pbXBvcnQgeyBzbWFsbEdyb3VwQXBpIH0gZnJvbSAnLi4vbGliL3NtYWxsR3JvdXBBcGknO1xuaW1wb3J0IFNtYWxsR3JvdXBGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvc21hbGxncm91cHMvU21hbGxHcm91cEZvcm0nO1xuaW1wb3J0IEdyb3VwQ2FyZCBmcm9tICcuLi9jb21wb25lbnRzL3NtYWxsZ3JvdXBzL0dyb3VwQ2FyZCc7XG4vKipcbiAqIFNtYWxsR3JvdXBzIFBhZ2UgQ29tcG9uZW50XG4gKlxuICogRGlzcGxheXMgYSBsaXN0IG9mIHNtYWxsIGdyb3VwcyB3aXRoIG1lbWJlciBjb3VudHMgYW5kIG1hbmFnZW1lbnQgY2FwYWJpbGl0aWVzLlxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBEaXNwbGF5IGxpc3Qgb2Ygc21hbGwgZ3JvdXBzIHdpdGggbWVtYmVyIGNvdW50c1xuICogLSBBZGQgbmV3IHNtYWxsIGdyb3VwcyAoYWRtaW4gb25seSlcbiAqIC0gVmlldyBzbWFsbCBncm91cCBkZXRhaWxzXG4gKiAtIFRvZ2dsZSBiZXR3ZWVuIEdyaWQgVmlldyBhbmQgTGlzdCBWaWV3XG4gKiAtIFJlc3BvbnNpdmUgZ3JpZCBsYXlvdXRcbiAqXG4gKiBWYWxpZGF0ZXMgUmVxdWlyZW1lbnRzOiA4LjQsIDguNVxuICogRGVzaWduIFJlZmVyZW5jZTogU21hbGwgR3JvdXBzIFBhZ2UgRGVzaWduIHNlY3Rpb25cbiAqL1xuY29uc3QgU21hbGxHcm91cHMgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB1c2VyIH0gPSB1c2VBdXRoKCk7XG4gICAgY29uc3QgeyBzaG93VG9hc3QgfSA9IHVzZVRvYXN0KCk7XG4gICAgY29uc3QgaXNBZG1pbiA9IHVzZXI/LnJvbGUgPT09ICdhZG1pbic7XG4gICAgLy8gU3RhdGUgbWFuYWdlbWVudFxuICAgIGNvbnN0IFtzbWFsbEdyb3Vwcywgc2V0U21hbGxHcm91cHNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbaXNGb3JtT3Blbiwgc2V0SXNGb3JtT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3NlbGVjdGVkR3JvdXAsIHNldFNlbGVjdGVkR3JvdXBdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW3ZpZXdNb2RlLCBzZXRWaWV3TW9kZV0gPSB1c2VTdGF0ZSgnZ3JpZCcpO1xuICAgIC8qKlxuICAgICAqIExvYWQgc21hbGwgZ3JvdXBzIG9uIG1vdW50XG4gICAgICovXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgbG9hZFNtYWxsR3JvdXBzKCk7XG4gICAgfSwgW10pO1xuICAgIC8qKlxuICAgICAqIEZldGNoIHNtYWxsIGdyb3VwcyBmcm9tIEFQSVxuICAgICAqL1xuICAgIGNvbnN0IGxvYWRTbWFsbEdyb3VwcyA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBzbWFsbEdyb3VwQXBpLmdldFNtYWxsR3JvdXBzKCk7XG4gICAgICAgICAgICBzZXRTbWFsbEdyb3VwcyhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dUb2FzdCgnZXJyb3InLCAnRmFpbGVkIHRvIGxvYWQgc21hbGwgZ3JvdXBzJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIHNtYWxsIGdyb3VwczonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSwgW3Nob3dUb2FzdF0pO1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhZGQgc21hbGwgZ3JvdXAgYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlQWRkQ2xpY2sgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldFNlbGVjdGVkR3JvdXAobnVsbCk7XG4gICAgICAgIHNldElzRm9ybU9wZW4odHJ1ZSk7XG4gICAgfSwgW10pO1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBlZGl0IHNtYWxsIGdyb3VwIGJ1dHRvbiBjbGlja1xuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUVkaXRDbGljayA9IHVzZUNhbGxiYWNrKChncm91cCkgPT4ge1xuICAgICAgICBzZXRTZWxlY3RlZEdyb3VwKGdyb3VwKTtcbiAgICAgICAgc2V0SXNGb3JtT3Blbih0cnVlKTtcbiAgICB9LCBbXSk7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGZvcm0gY2xvc2VcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVGb3JtQ2xvc2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldElzRm9ybU9wZW4oZmFsc2UpO1xuICAgICAgICBzZXRTZWxlY3RlZEdyb3VwKG51bGwpO1xuICAgIH0sIFtdKTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZm9ybSBzdWJtaXNzaW9uXG4gICAgICovXG4gICAgY29uc3QgaGFuZGxlRm9ybVN1Ym1pdCA9IHVzZUNhbGxiYWNrKGFzeW5jIChkYXRhKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRHcm91cCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBncm91cFxuICAgICAgICAgICAgICAgIGF3YWl0IHNtYWxsR3JvdXBBcGkudXBkYXRlU21hbGxHcm91cChzZWxlY3RlZEdyb3VwLmlkLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoJ3N1Y2Nlc3MnLCAnU21hbGwgZ3JvdXAgdXBkYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgZ3JvdXBcbiAgICAgICAgICAgICAgICBhd2FpdCBzbWFsbEdyb3VwQXBpLmNyZWF0ZVNtYWxsR3JvdXAoZGF0YSk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KCdzdWNjZXNzJywgJ1NtYWxsIGdyb3VwIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBsb2FkU21hbGxHcm91cHMoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yLnJlc3BvbnNlPy5kYXRhPy5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gc2F2ZSBzbWFsbCBncm91cCc7XG4gICAgICAgICAgICBzaG93VG9hc3QoJ2Vycm9yJywgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yOyAvLyBSZS10aHJvdyB0byBwcmV2ZW50IGZvcm0gZnJvbSBjbG9zaW5nXG4gICAgICAgIH1cbiAgICB9LCBbc2VsZWN0ZWRHcm91cCwgc2hvd1RvYXN0LCBsb2FkU21hbGxHcm91cHNdKTtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZGVsZXRlIHNtYWxsIGdyb3VwIGJ1dHRvbiBjbGlja1xuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZURlbGV0ZUNsaWNrID0gdXNlQ2FsbGJhY2soKGdyb3VwKSA9PiB7XG4gICAgICAgIC8vIEhhbmRsZWQgYnkgQXJjaGl2ZUJ1dHRvbiBjb21wb25lbnRcbiAgICB9LCBbXSk7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFyY2hpdmUgc3VjY2VzcyBjYWxsYmFja1xuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZUFyY2hpdmVTdWNjZXNzID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBsb2FkU21hbGxHcm91cHMoKTtcbiAgICB9LCBbbG9hZFNtYWxsR3JvdXBzXSk7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHZpZXcgZGV0YWlscyBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICBjb25zdCBoYW5kbGVWaWV3RGV0YWlscyA9IHVzZUNhbGxiYWNrKChncm91cCkgPT4ge1xuICAgICAgICAvLyBOYXZpZ2F0ZSB0byBncm91cCBkZXRhaWwgcGFnZVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvc21hbGwtZ3JvdXBzLyR7Z3JvdXAuaWR9YDtcbiAgICB9LCBbXSk7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIG1hbmFnZSBtZW1iZXJzIGJ1dHRvbiBjbGlja1xuICAgICAqL1xuICAgIGNvbnN0IGhhbmRsZU1hbmFnZU1lbWJlcnMgPSB1c2VDYWxsYmFjaygoZ3JvdXApID0+IHtcbiAgICAgICAgLy8gVE9ETzogT3BlbiBtYW5hZ2UgbWVtYmVycyBtb2RhbFxuICAgICAgICBjb25zb2xlLmxvZygnTWFuYWdlIG1lbWJlcnMgZm9yIGdyb3VwOicsIGdyb3VwKTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIChfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibWItOFwiLCBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206anVzdGlmeS1iZXR3ZWVuIHNtOml0ZW1zLXN0YXJ0IGdhcC00IG1iLTZcIiwgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImgxXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LW5ldXRyYWwtOTAwXCIsIGNoaWxkcmVuOiBcIlNtYWxsIEdyb3Vwc1wiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LWJhc2UgdGV4dC1uZXV0cmFsLTYwMCBtdC0yXCIsIGNoaWxkcmVuOiBcIk1hbmFnZSBzbWFsbCBncm91cHMgYW5kIHRoZWlyIG1lbWJlcnNcIiB9KV0gfSksIGlzQWRtaW4gJiYgKF9qc3hzKEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVBZGRDbGljaywgc2l6ZTogXCJsZ1wiLCBjaGlsZHJlbjogW19qc3goUGx1cywgeyBjbGFzc05hbWU6IFwiaC01IHctNSBtci0yXCIgfSksIFwiQ3JlYXRlIEdyb3VwXCJdIH0pKV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJnLW5ldXRyYWwtMTAwIHAtMSByb3VuZGVkLWxnIHctZml0XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiBzZXRWaWV3TW9kZSgnZ3JpZCcpLCBjbGFzc05hbWU6IGBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgcm91bmRlZC1tZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgJHt2aWV3TW9kZSA9PT0gJ2dyaWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy13aGl0ZSB0ZXh0LXByaW1hcnktNjAwIHNoYWRvdy1zbSBmb250LW1lZGl1bSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtbmV1dHJhbC02MDAgaG92ZXI6dGV4dC1uZXV0cmFsLTkwMCd9YCwgY2hpbGRyZW46IFtfanN4KEdyaWQsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwidGV4dC1zbVwiLCBjaGlsZHJlbjogXCJHcmlkIFZpZXdcIiB9KV0gfSksIF9qc3hzKFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0Vmlld01vZGUoJ2xpc3QnKSwgY2xhc3NOYW1lOiBgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwICR7dmlld01vZGUgPT09ICdsaXN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctd2hpdGUgdGV4dC1wcmltYXJ5LTYwMCBzaGFkb3ctc20gZm9udC1tZWRpdW0nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LW5ldXRyYWwtNjAwIGhvdmVyOnRleHQtbmV1dHJhbC05MDAnfWAsIGNoaWxkcmVuOiBbX2pzeChMaXN0LCB7IGNsYXNzTmFtZTogXCJoLTQgdy00XCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtc21cIiwgY2hpbGRyZW46IFwiTGlzdCBWaWV3XCIgfSldIH0pXSB9KV0gfSksIGlzTG9hZGluZyAmJiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidGV4dC1jZW50ZXIgcHktMTZcIiwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImlubGluZS1ibG9jayBhbmltYXRlLXNwaW4gcm91bmRlZC1mdWxsIGgtMTIgdy0xMiBib3JkZXItYi0yIGJvcmRlci1wcmltYXJ5LTYwMCBtYi00XCIgfSksIF9qc3goXCJwXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbmV1dHJhbC02MDBcIiwgY2hpbGRyZW46IFwiTG9hZGluZyBzbWFsbCBncm91cHMuLi5cIiB9KV0gfSkpLCAhaXNMb2FkaW5nICYmIHNtYWxsR3JvdXBzLmxlbmd0aCA9PT0gMCAmJiAoX2pzeHMoQ2FyZCwgeyBjbGFzc05hbWU6IFwidGV4dC1jZW50ZXIgcHktMTZcIiwgY2hpbGRyZW46IFtfanN4KFVzZXJzLCB7IGNsYXNzTmFtZTogXCJoLTE2IHctMTYgdGV4dC1uZXV0cmFsLTQwMCBteC1hdXRvIG1iLTRcIiB9KSwgX2pzeChcImgzXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtbGcgZm9udC1zZW1pYm9sZCB0ZXh0LW5ldXRyYWwtOTAwIG1iLTJcIiwgY2hpbGRyZW46IFwiTm8gU21hbGwgR3JvdXBzIFlldFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LW5ldXRyYWwtNjAwIG1iLTZcIiwgY2hpbGRyZW46IGlzQWRtaW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdHZXQgc3RhcnRlZCBieSBjcmVhdGluZyB5b3VyIGZpcnN0IHNtYWxsIGdyb3VwLidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdDaGVjayBiYWNrIGxhdGVyIGZvciBzbWFsbCBncm91cCBvcHBvcnR1bml0aWVzLicgfSksIGlzQWRtaW4gJiYgKF9qc3hzKEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVBZGRDbGljaywgY2hpbGRyZW46IFtfanN4KFBsdXMsIHsgY2xhc3NOYW1lOiBcImgtNCB3LTQgbXItMlwiIH0pLCBcIkNyZWF0ZSBHcm91cFwiXSB9KSldIH0pKSwgIWlzTG9hZGluZyAmJiBzbWFsbEdyb3Vwcy5sZW5ndGggPiAwICYmIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiB2aWV3TW9kZSA9PT0gJ2dyaWQnXG4gICAgICAgICAgICAgICAgICAgID8gJ2dyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgeGw6Z3JpZC1jb2xzLTQgZ2FwLTYnXG4gICAgICAgICAgICAgICAgICAgIDogJ3NwYWNlLXktNCcsIGNoaWxkcmVuOiBzbWFsbEdyb3Vwcy5tYXAoKGdyb3VwKSA9PiAoX2pzeChHcm91cENhcmQsIHsgZ3JvdXA6IGdyb3VwLCB2aWV3TW9kZTogdmlld01vZGUsIG9uVmlld0RldGFpbHM6IGhhbmRsZVZpZXdEZXRhaWxzLCBvbkVkaXQ6IGlzQWRtaW4gPyBoYW5kbGVFZGl0Q2xpY2sgOiB1bmRlZmluZWQsIG9uTWFuYWdlTWVtYmVyczogaXNBZG1pbiA/IGhhbmRsZU1hbmFnZU1lbWJlcnMgOiB1bmRlZmluZWQsIHNob3dBY3Rpb25zOiB0cnVlIH0sIGdyb3VwLmlkKSkpIH0pKSwgX2pzeChTbWFsbEdyb3VwRm9ybSwgeyBpc09wZW46IGlzRm9ybU9wZW4sIG9uQ2xvc2U6IGhhbmRsZUZvcm1DbG9zZSwgb25TdWJtaXQ6IGhhbmRsZUZvcm1TdWJtaXQsIHNtYWxsR3JvdXA6IHNlbGVjdGVkR3JvdXAgfSldIH0pKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTbWFsbEdyb3VwcztcbiIsInZhciBjdXJyZW50Tm9uY2U7XG5leHBvcnQgdmFyIHNldE5vbmNlID0gZnVuY3Rpb24gKG5vbmNlKSB7XG4gICAgY3VycmVudE5vbmNlID0gbm9uY2U7XG59O1xuZXhwb3J0IHZhciBnZXROb25jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY3VycmVudE5vbmNlKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50Tm9uY2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0yLjA2MiAxMi4zNDhhMSAxIDAgMCAxIDAtLjY5NiAxMC43NSAxMC43NSAwIDAgMSAxOS44NzYgMCAxIDEgMCAwIDEgMCAuNjk2IDEwLjc1IDEwLjc1IDAgMCAxLTE5Ljg3NiAwXCIsXG4gICAgICBrZXk6IFwiMW5jbGMwXCJcbiAgICB9XG4gIF0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEyXCIsIHI6IFwiM1wiLCBrZXk6IFwiMXY3enJkXCIgfV1cbl07XG5jb25zdCBFeWUgPSBjcmVhdGVMdWNpZGVJY29uKFwiZXllXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBFeWUgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXllLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJyZWN0XCIsIHsgd2lkdGg6IFwiMThcIiwgaGVpZ2h0OiBcIjE4XCIsIHg6IFwiM1wiLCB5OiBcIjNcIiwgcng6IFwiMlwiLCBrZXk6IFwiYWZpdHY3XCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0zIDloMThcIiwga2V5OiBcIjFwdWRjdFwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMyAxNWgxOFwiLCBrZXk6IFwiNXhzaHVwXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk05IDN2MThcIiwga2V5OiBcImZoM2hxYVwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNMTUgM3YxOFwiLCBrZXk6IFwiMTRudnAwXCIgfV1cbl07XG5jb25zdCBHcmlkM3gzID0gY3JlYXRlTHVjaWRlSWNvbihcImdyaWQtM3gzXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBHcmlkM3gzIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdyaWQtM3gzLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMyA1aC4wMVwiLCBrZXk6IFwiMTh1Z2RqXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0zIDEyaC4wMVwiLCBrZXk6IFwibmx6MjNrXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0zIDE5aC4wMVwiLCBrZXk6IFwibm9vaGlqXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk04IDVoMTNcIiwga2V5OiBcIjFwYW8yN1wiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNOCAxMmgxM1wiLCBrZXk6IFwiMXphN3phXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk04IDE5aDEzXCIsIGtleTogXCJtODNwNGRcIiB9XVxuXTtcbmNvbnN0IExpc3QgPSBjcmVhdGVMdWNpZGVJY29uKFwibGlzdFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgTGlzdCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXN0LmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMjAgMTBjMCA0Ljk5My01LjUzOSAxMC4xOTMtNy4zOTkgMTEuNzk5YTEgMSAwIDAgMS0xLjIwMiAwQzkuNTM5IDIwLjE5MyA0IDE0Ljk5MyA0IDEwYTggOCAwIDAgMSAxNiAwXCIsXG4gICAgICBrZXk6IFwiMXIwZjB6XCJcbiAgICB9XG4gIF0sXG4gIFtcImNpcmNsZVwiLCB7IGN4OiBcIjEyXCIsIGN5OiBcIjEwXCIsIHI6IFwiM1wiLCBrZXk6IFwiaWxxaHI3XCIgfV1cbl07XG5jb25zdCBNYXBQaW4gPSBjcmVhdGVMdWNpZGVJY29uKFwibWFwLXBpblwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgTWFwUGluIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC1waW4uanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk01IDEyaDE0XCIsIGtleTogXCIxYXlzMGhcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDV2MTRcIiwga2V5OiBcInM2OTlsZVwiIH1dXG5dO1xuY29uc3QgUGx1cyA9IGNyZWF0ZUx1Y2lkZUljb24oXCJwbHVzXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBQbHVzIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBsdXMuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIm0yMSAyMS00LjM0LTQuMzRcIiwga2V5OiBcIjE0ajdyalwiIH1dLFxuICBbXCJjaXJjbGVcIiwgeyBjeDogXCIxMVwiLCBjeTogXCIxMVwiLCByOiBcIjhcIiwga2V5OiBcIjRlajk3dVwiIH1dXG5dO1xuY29uc3QgU2VhcmNoID0gY3JlYXRlTHVjaWRlSWNvbihcInNlYXJjaFwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgU2VhcmNoIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlYXJjaC5qcy5tYXBcbiIsIi8qKlxuICogQGxpY2Vuc2UgbHVjaWRlLXJlYWN0IHYwLjU1My4wIC0gSVNDXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgSVNDIGxpY2Vuc2UuXG4gKiBTZWUgdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgY3JlYXRlTHVjaWRlSWNvbiBmcm9tICcuLi9jcmVhdGVMdWNpZGVJY29uLmpzJztcblxuY29uc3QgX19pY29uTm9kZSA9IFtcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTEyIDNINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTRhMiAyIDAgMCAwIDItMnYtN1wiLCBrZXk6IFwiMW0wdjZnXCIgfV0sXG4gIFtcbiAgICBcInBhdGhcIixcbiAgICB7XG4gICAgICBkOiBcIk0xOC4zNzUgMi42MjVhMSAxIDAgMCAxIDMgM2wtOS4wMTMgOS4wMTRhMiAyIDAgMCAxLS44NTMuNTA1bC0yLjg3My44NGEuNS41IDAgMCAxLS42Mi0uNjJsLjg0LTIuODczYTIgMiAwIDAgMSAuNTA2LS44NTJ6XCIsXG4gICAgICBrZXk6IFwib2hyYmcyXCJcbiAgICB9XG4gIF1cbl07XG5jb25zdCBTcXVhcmVQZW4gPSBjcmVhdGVMdWNpZGVJY29uKFwic3F1YXJlLXBlblwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgU3F1YXJlUGVuIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNxdWFyZS1wZW4uanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMiAzdjEyXCIsIGtleTogXCIxeDBqNXNcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwibTE3IDgtNS01LTUgNVwiLCBrZXk6IFwiN3E5N3I4XCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00XCIsIGtleTogXCJpaDduM2hcIiB9XVxuXTtcbmNvbnN0IFVwbG9hZCA9IGNyZWF0ZUx1Y2lkZUljb24oXCJ1cGxvYWRcIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFVwbG9hZCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11cGxvYWQuanMubWFwXG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDZhNCA0IDAgMCAwLTQgNHYyXCIsIGtleTogXCIxeXlpdHFcIiB9XSxcbiAgW1wiY2lyY2xlXCIsIHsgY3g6IFwiOVwiLCBjeTogXCI3XCIsIHI6IFwiNFwiLCBrZXk6IFwibnVmazhcIiB9XSxcbiAgW1wibGluZVwiLCB7IHgxOiBcIjE5XCIsIHgyOiBcIjE5XCIsIHkxOiBcIjhcIiwgeTI6IFwiMTRcIiwga2V5OiBcIjFidnl4blwiIH1dLFxuICBbXCJsaW5lXCIsIHsgeDE6IFwiMjJcIiwgeDI6IFwiMTZcIiwgeTE6IFwiMTFcIiwgeTI6IFwiMTFcIiwga2V5OiBcIjFzaGpnbFwiIH1dXG5dO1xuY29uc3QgVXNlclBsdXMgPSBjcmVhdGVMdWNpZGVJY29uKFwidXNlci1wbHVzXCIsIF9faWNvbk5vZGUpO1xuXG5leHBvcnQgeyBfX2ljb25Ob2RlLCBVc2VyUGx1cyBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VyLXBsdXMuanMubWFwXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHlsZVNpbmdsZXRvbiB9IGZyb20gJ3JlYWN0LXN0eWxlLXNpbmdsZXRvbic7XG5pbXBvcnQgeyBmdWxsV2lkdGhDbGFzc05hbWUsIHplcm9SaWdodENsYXNzTmFtZSwgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0R2FwV2lkdGggfSBmcm9tICcuL3V0aWxzJztcbnZhciBTdHlsZSA9IHN0eWxlU2luZ2xldG9uKCk7XG5leHBvcnQgdmFyIGxvY2tBdHRyaWJ1dGUgPSAnZGF0YS1zY3JvbGwtbG9ja2VkJztcbi8vIGltcG9ydGFudCB0aXAgLSBvbmNlIHdlIG1lYXN1cmUgc2Nyb2xsQmFyIHdpZHRoIGFuZCByZW1vdmUgdGhlbVxuLy8gd2UgY291bGQgbm90IHJlcGVhdCB0aGlzIG9wZXJhdGlvblxuLy8gdGh1cyB3ZSBhcmUgdXNpbmcgc3R5bGUtc2luZ2xldG9uIC0gb25seSB0aGUgZmlyc3QgXCJ5ZXQgY29ycmVjdFwiIHN0eWxlIHdpbGwgYmUgYXBwbGllZC5cbnZhciBnZXRTdHlsZXMgPSBmdW5jdGlvbiAoX2EsIGFsbG93UmVsYXRpdmUsIGdhcE1vZGUsIGltcG9ydGFudCkge1xuICAgIHZhciBsZWZ0ID0gX2EubGVmdCwgdG9wID0gX2EudG9wLCByaWdodCA9IF9hLnJpZ2h0LCBnYXAgPSBfYS5nYXA7XG4gICAgaWYgKGdhcE1vZGUgPT09IHZvaWQgMCkgeyBnYXBNb2RlID0gJ21hcmdpbic7IH1cbiAgICByZXR1cm4gXCJcXG4gIC5cIi5jb25jYXQobm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCBcIiB7XFxuICAgb3ZlcmZsb3c6IGhpZGRlbiBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICAgcGFkZGluZy1yaWdodDogXCIpLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgYm9keVtcIikuY29uY2F0KGxvY2tBdHRyaWJ1dGUsIFwiXSB7XFxuICAgIG92ZXJmbG93OiBoaWRkZW4gXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgICBvdmVyc2Nyb2xsLWJlaGF2aW9yOiBjb250YWluO1xcbiAgICBcIikuY29uY2F0KFtcbiAgICAgICAgYWxsb3dSZWxhdGl2ZSAmJiBcInBvc2l0aW9uOiByZWxhdGl2ZSBcIi5jb25jYXQoaW1wb3J0YW50LCBcIjtcIiksXG4gICAgICAgIGdhcE1vZGUgPT09ICdtYXJnaW4nICYmXG4gICAgICAgICAgICBcIlxcbiAgICBwYWRkaW5nLWxlZnQ6IFwiLmNvbmNhdChsZWZ0LCBcInB4O1xcbiAgICBwYWRkaW5nLXRvcDogXCIpLmNvbmNhdCh0b3AsIFwicHg7XFxuICAgIHBhZGRpbmctcmlnaHQ6IFwiKS5jb25jYXQocmlnaHQsIFwicHg7XFxuICAgIG1hcmdpbi1sZWZ0OjA7XFxuICAgIG1hcmdpbi10b3A6MDtcXG4gICAgbWFyZ2luLXJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICAgIFwiKSxcbiAgICAgICAgZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnICYmIFwicGFkZGluZy1yaWdodDogXCIuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XCIpLFxuICAgIF1cbiAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAuam9pbignJyksIFwiXFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KHplcm9SaWdodENsYXNzTmFtZSwgXCIge1xcbiAgICByaWdodDogXCIpLmNvbmNhdChnYXAsIFwicHggXCIpLmNvbmNhdChpbXBvcnRhbnQsIFwiO1xcbiAgfVxcbiAgXFxuICAuXCIpLmNvbmNhdChmdWxsV2lkdGhDbGFzc05hbWUsIFwiIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiBcIikuY29uY2F0KGdhcCwgXCJweCBcIikuY29uY2F0KGltcG9ydGFudCwgXCI7XFxuICB9XFxuICBcXG4gIC5cIikuY29uY2F0KHplcm9SaWdodENsYXNzTmFtZSwgXCIgLlwiKS5jb25jYXQoemVyb1JpZ2h0Q2xhc3NOYW1lLCBcIiB7XFxuICAgIHJpZ2h0OiAwIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgLlwiKS5jb25jYXQoZnVsbFdpZHRoQ2xhc3NOYW1lLCBcIiAuXCIpLmNvbmNhdChmdWxsV2lkdGhDbGFzc05hbWUsIFwiIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwIFwiKS5jb25jYXQoaW1wb3J0YW50LCBcIjtcXG4gIH1cXG4gIFxcbiAgYm9keVtcIikuY29uY2F0KGxvY2tBdHRyaWJ1dGUsIFwiXSB7XFxuICAgIFwiKS5jb25jYXQocmVtb3ZlZEJhclNpemVWYXJpYWJsZSwgXCI6IFwiKS5jb25jYXQoZ2FwLCBcInB4O1xcbiAgfVxcblwiKTtcbn07XG52YXIgZ2V0Q3VycmVudFVzZUNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvdW50ZXIgPSBwYXJzZUludChkb2N1bWVudC5ib2R5LmdldEF0dHJpYnV0ZShsb2NrQXR0cmlidXRlKSB8fCAnMCcsIDEwKTtcbiAgICByZXR1cm4gaXNGaW5pdGUoY291bnRlcikgPyBjb3VudGVyIDogMDtcbn07XG5leHBvcnQgdmFyIHVzZUxvY2tBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUobG9ja0F0dHJpYnV0ZSwgKGdldEN1cnJlbnRVc2VDb3VudGVyKCkgKyAxKS50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBuZXdDb3VudGVyID0gZ2V0Q3VycmVudFVzZUNvdW50ZXIoKSAtIDE7XG4gICAgICAgICAgICBpZiAobmV3Q291bnRlciA8PSAwKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUobG9ja0F0dHJpYnV0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShsb2NrQXR0cmlidXRlLCBuZXdDb3VudGVyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sIFtdKTtcbn07XG4vKipcbiAqIFJlbW92ZXMgcGFnZSBzY3JvbGxiYXIgYW5kIGJsb2NrcyBwYWdlIHNjcm9sbCB3aGVuIG1vdW50ZWRcbiAqL1xuZXhwb3J0IHZhciBSZW1vdmVTY3JvbGxCYXIgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgbm9SZWxhdGl2ZSA9IF9hLm5vUmVsYXRpdmUsIG5vSW1wb3J0YW50ID0gX2Eubm9JbXBvcnRhbnQsIF9iID0gX2EuZ2FwTW9kZSwgZ2FwTW9kZSA9IF9iID09PSB2b2lkIDAgPyAnbWFyZ2luJyA6IF9iO1xuICAgIHVzZUxvY2tBdHRyaWJ1dGUoKTtcbiAgICAvKlxuICAgICBnYXAgd2lsbCBiZSBtZWFzdXJlZCBvbiBldmVyeSBjb21wb25lbnQgbW91bnRcbiAgICAgaG93ZXZlciBpdCB3aWxsIGJlIHVzZWQgb25seSBieSB0aGUgXCJmaXJzdFwiIGludm9jYXRpb25cbiAgICAgZHVlIHRvIHNpbmdsZXRvbiBuYXR1cmUgb2YgPFN0eWxlXG4gICAgICovXG4gICAgdmFyIGdhcCA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0R2FwV2lkdGgoZ2FwTW9kZSk7IH0sIFtnYXBNb2RlXSk7XG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3R5bGUsIHsgc3R5bGVzOiBnZXRTdHlsZXMoZ2FwLCAhbm9SZWxhdGl2ZSwgZ2FwTW9kZSwgIW5vSW1wb3J0YW50ID8gJyFpbXBvcnRhbnQnIDogJycpIH0pO1xufTtcbiIsImV4cG9ydCB2YXIgemVyb1JpZ2h0Q2xhc3NOYW1lID0gJ3JpZ2h0LXNjcm9sbC1iYXItcG9zaXRpb24nO1xuZXhwb3J0IHZhciBmdWxsV2lkdGhDbGFzc05hbWUgPSAnd2lkdGgtYmVmb3JlLXNjcm9sbC1iYXInO1xuZXhwb3J0IHZhciBub1Njcm9sbGJhcnNDbGFzc05hbWUgPSAnd2l0aC1zY3JvbGwtYmFycy1oaWRkZW4nO1xuLyoqXG4gKiBOYW1lIG9mIGEgQ1NTIHZhcmlhYmxlIGNvbnRhaW5pbmcgdGhlIGFtb3VudCBvZiBcImhpZGRlblwiIHNjcm9sbGJhclxuICogISBtaWdodCBiZSB1bmRlZmluZWQgISB1c2Ugd2lsbCBmYWxsYmFjayFcbiAqL1xuZXhwb3J0IHZhciByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlID0gJy0tcmVtb3ZlZC1ib2R5LXNjcm9sbC1iYXItc2l6ZSc7XG4iLCJpbXBvcnQgeyBSZW1vdmVTY3JvbGxCYXIgfSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgeyB6ZXJvUmlnaHRDbGFzc05hbWUsIGZ1bGxXaWR0aENsYXNzTmFtZSwgbm9TY3JvbGxiYXJzQ2xhc3NOYW1lLCByZW1vdmVkQmFyU2l6ZVZhcmlhYmxlIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0R2FwV2lkdGggfSBmcm9tICcuL3V0aWxzJztcbmV4cG9ydCB7IFJlbW92ZVNjcm9sbEJhciwgemVyb1JpZ2h0Q2xhc3NOYW1lLCBmdWxsV2lkdGhDbGFzc05hbWUsIG5vU2Nyb2xsYmFyc0NsYXNzTmFtZSwgcmVtb3ZlZEJhclNpemVWYXJpYWJsZSwgZ2V0R2FwV2lkdGgsIH07XG4iLCJleHBvcnQgdmFyIHplcm9HYXAgPSB7XG4gICAgbGVmdDogMCxcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgZ2FwOiAwLFxufTtcbnZhciBwYXJzZSA9IGZ1bmN0aW9uICh4KSB7IHJldHVybiBwYXJzZUludCh4IHx8ICcnLCAxMCkgfHwgMDsgfTtcbnZhciBnZXRPZmZzZXQgPSBmdW5jdGlvbiAoZ2FwTW9kZSkge1xuICAgIHZhciBjcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpO1xuICAgIHZhciBsZWZ0ID0gY3NbZ2FwTW9kZSA9PT0gJ3BhZGRpbmcnID8gJ3BhZGRpbmdMZWZ0JyA6ICdtYXJnaW5MZWZ0J107XG4gICAgdmFyIHRvcCA9IGNzW2dhcE1vZGUgPT09ICdwYWRkaW5nJyA/ICdwYWRkaW5nVG9wJyA6ICdtYXJnaW5Ub3AnXTtcbiAgICB2YXIgcmlnaHQgPSBjc1tnYXBNb2RlID09PSAncGFkZGluZycgPyAncGFkZGluZ1JpZ2h0JyA6ICdtYXJnaW5SaWdodCddO1xuICAgIHJldHVybiBbcGFyc2UobGVmdCksIHBhcnNlKHRvcCksIHBhcnNlKHJpZ2h0KV07XG59O1xuZXhwb3J0IHZhciBnZXRHYXBXaWR0aCA9IGZ1bmN0aW9uIChnYXBNb2RlKSB7XG4gICAgaWYgKGdhcE1vZGUgPT09IHZvaWQgMCkgeyBnYXBNb2RlID0gJ21hcmdpbic7IH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHplcm9HYXA7XG4gICAgfVxuICAgIHZhciBvZmZzZXRzID0gZ2V0T2Zmc2V0KGdhcE1vZGUpO1xuICAgIHZhciBkb2N1bWVudFdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIHZhciB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IG9mZnNldHNbMF0sXG4gICAgICAgIHRvcDogb2Zmc2V0c1sxXSxcbiAgICAgICAgcmlnaHQ6IG9mZnNldHNbMl0sXG4gICAgICAgIGdhcDogTWF0aC5tYXgoMCwgd2luZG93V2lkdGggLSBkb2N1bWVudFdpZHRoICsgb2Zmc2V0c1syXSAtIG9mZnNldHNbMF0pLFxuICAgIH07XG59O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJlbW92ZVNjcm9sbCB9IGZyb20gJy4vVUknO1xuaW1wb3J0IFNpZGVDYXIgZnJvbSAnLi9zaWRlY2FyJztcbnZhciBSZWFjdFJlbW92ZVNjcm9sbCA9IFJlYWN0LmZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzLCByZWYpIHsgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlbW92ZVNjcm9sbCwgX19hc3NpZ24oe30sIHByb3BzLCB7IHJlZjogcmVmLCBzaWRlQ2FyOiBTaWRlQ2FyIH0pKSk7IH0pO1xuUmVhY3RSZW1vdmVTY3JvbGwuY2xhc3NOYW1lcyA9IFJlbW92ZVNjcm9sbC5jbGFzc05hbWVzO1xuZXhwb3J0IGRlZmF1bHQgUmVhY3RSZW1vdmVTY3JvbGw7XG4iLCJpbXBvcnQgeyBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBSZW1vdmVTY3JvbGxCYXIgfSBmcm9tICdyZWFjdC1yZW1vdmUtc2Nyb2xsLWJhcic7XG5pbXBvcnQgeyBzdHlsZVNpbmdsZXRvbiB9IGZyb20gJ3JlYWN0LXN0eWxlLXNpbmdsZXRvbic7XG5pbXBvcnQgeyBub25QYXNzaXZlIH0gZnJvbSAnLi9hZ2dyZXNpdmVDYXB0dXJlJztcbmltcG9ydCB7IGhhbmRsZVNjcm9sbCwgbG9jYXRpb25Db3VsZEJlU2Nyb2xsZWQgfSBmcm9tICcuL2hhbmRsZVNjcm9sbCc7XG5leHBvcnQgdmFyIGdldFRvdWNoWFkgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICByZXR1cm4gJ2NoYW5nZWRUb3VjaGVzJyBpbiBldmVudCA/IFtldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZXSA6IFswLCAwXTtcbn07XG5leHBvcnQgdmFyIGdldERlbHRhWFkgPSBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIFtldmVudC5kZWx0YVgsIGV2ZW50LmRlbHRhWV07IH07XG52YXIgZXh0cmFjdFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICByZXR1cm4gcmVmICYmICdjdXJyZW50JyBpbiByZWYgPyByZWYuY3VycmVudCA6IHJlZjtcbn07XG52YXIgZGVsdGFDb21wYXJlID0gZnVuY3Rpb24gKHgsIHkpIHsgcmV0dXJuIHhbMF0gPT09IHlbMF0gJiYgeFsxXSA9PT0geVsxXTsgfTtcbnZhciBnZW5lcmF0ZVN0eWxlID0gZnVuY3Rpb24gKGlkKSB7IHJldHVybiBcIlxcbiAgLmJsb2NrLWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkLCBcIiB7cG9pbnRlci1ldmVudHM6IG5vbmU7fVxcbiAgLmFsbG93LWludGVyYWN0aXZpdHktXCIpLmNvbmNhdChpZCwgXCIge3BvaW50ZXItZXZlbnRzOiBhbGw7fVxcblwiKTsgfTtcbnZhciBpZENvdW50ZXIgPSAwO1xudmFyIGxvY2tTdGFjayA9IFtdO1xuZXhwb3J0IGZ1bmN0aW9uIFJlbW92ZVNjcm9sbFNpZGVDYXIocHJvcHMpIHtcbiAgICB2YXIgc2hvdWxkUHJldmVudFF1ZXVlID0gUmVhY3QudXNlUmVmKFtdKTtcbiAgICB2YXIgdG91Y2hTdGFydFJlZiA9IFJlYWN0LnVzZVJlZihbMCwgMF0pO1xuICAgIHZhciBhY3RpdmVBeGlzID0gUmVhY3QudXNlUmVmKCk7XG4gICAgdmFyIGlkID0gUmVhY3QudXNlU3RhdGUoaWRDb3VudGVyKyspWzBdO1xuICAgIHZhciBTdHlsZSA9IFJlYWN0LnVzZVN0YXRlKHN0eWxlU2luZ2xldG9uKVswXTtcbiAgICB2YXIgbGFzdFByb3BzID0gUmVhY3QudXNlUmVmKHByb3BzKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBsYXN0UHJvcHMuY3VycmVudCA9IHByb3BzO1xuICAgIH0sIFtwcm9wc10pO1xuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChwcm9wcy5pbmVydCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiYmxvY2staW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTtcbiAgICAgICAgICAgIHZhciBhbGxvd18xID0gX19zcHJlYWRBcnJheShbcHJvcHMubG9ja1JlZi5jdXJyZW50XSwgKHByb3BzLnNoYXJkcyB8fCBbXSkubWFwKGV4dHJhY3RSZWYpLCB0cnVlKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgICBhbGxvd18xLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5jbGFzc0xpc3QuYWRkKFwiYWxsb3ctaW50ZXJhY3Rpdml0eS1cIi5jb25jYXQoaWQpKTsgfSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImJsb2NrLWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkKSk7XG4gICAgICAgICAgICAgICAgYWxsb3dfMS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuY2xhc3NMaXN0LnJlbW92ZShcImFsbG93LWludGVyYWN0aXZpdHktXCIuY29uY2F0KGlkKSk7IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfSwgW3Byb3BzLmluZXJ0LCBwcm9wcy5sb2NrUmVmLmN1cnJlbnQsIHByb3BzLnNoYXJkc10pO1xuICAgIHZhciBzaG91bGRDYW5jZWxFdmVudCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCwgcGFyZW50KSB7XG4gICAgICAgIGlmICgoJ3RvdWNoZXMnIGluIGV2ZW50ICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAyKSB8fCAoZXZlbnQudHlwZSA9PT0gJ3doZWVsJyAmJiBldmVudC5jdHJsS2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuICFsYXN0UHJvcHMuY3VycmVudC5hbGxvd1BpbmNoWm9vbTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG91Y2ggPSBnZXRUb3VjaFhZKGV2ZW50KTtcbiAgICAgICAgdmFyIHRvdWNoU3RhcnQgPSB0b3VjaFN0YXJ0UmVmLmN1cnJlbnQ7XG4gICAgICAgIHZhciBkZWx0YVggPSAnZGVsdGFYJyBpbiBldmVudCA/IGV2ZW50LmRlbHRhWCA6IHRvdWNoU3RhcnRbMF0gLSB0b3VjaFswXTtcbiAgICAgICAgdmFyIGRlbHRhWSA9ICdkZWx0YVknIGluIGV2ZW50ID8gZXZlbnQuZGVsdGFZIDogdG91Y2hTdGFydFsxXSAtIHRvdWNoWzFdO1xuICAgICAgICB2YXIgY3VycmVudEF4aXM7XG4gICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHZhciBtb3ZlRGlyZWN0aW9uID0gTWF0aC5hYnMoZGVsdGFYKSA+IE1hdGguYWJzKGRlbHRhWSkgPyAnaCcgOiAndic7XG4gICAgICAgIC8vIGFsbG93IGhvcml6b250YWwgdG91Y2ggbW92ZSBvbiBSYW5nZSBpbnB1dHMuIFRoZXkgd2lsbCBub3QgY2F1c2UgYW55IHNjcm9sbFxuICAgICAgICBpZiAoJ3RvdWNoZXMnIGluIGV2ZW50ICYmIG1vdmVEaXJlY3Rpb24gPT09ICdoJyAmJiB0YXJnZXQudHlwZSA9PT0gJ3JhbmdlJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFsbG93IGRyYWcgc2VsZWN0aW9uIChpT1MpOyBjaGVjayBpZiBzZWxlY3Rpb24ncyBhbmNob3JOb2RlIGlzIHRoZSBzYW1lIGFzIHRhcmdldCBvciBjb250YWlucyB0YXJnZXRcbiAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIGFuY2hvck5vZGUgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmFuY2hvck5vZGU7XG4gICAgICAgIHZhciBpc1RvdWNoaW5nU2VsZWN0aW9uID0gYW5jaG9yTm9kZSA/IGFuY2hvck5vZGUgPT09IHRhcmdldCB8fCBhbmNob3JOb2RlLmNvbnRhaW5zKHRhcmdldCkgOiBmYWxzZTtcbiAgICAgICAgaWYgKGlzVG91Y2hpbmdTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbiA9IGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkKG1vdmVEaXJlY3Rpb24sIHRhcmdldCk7XG4gICAgICAgIGlmICghY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbkJlU2Nyb2xsZWRJbk1haW5EaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGN1cnJlbnRBeGlzID0gbW92ZURpcmVjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRBeGlzID0gbW92ZURpcmVjdGlvbiA9PT0gJ3YnID8gJ2gnIDogJ3YnO1xuICAgICAgICAgICAgY2FuQmVTY3JvbGxlZEluTWFpbkRpcmVjdGlvbiA9IGxvY2F0aW9uQ291bGRCZVNjcm9sbGVkKG1vdmVEaXJlY3Rpb24sIHRhcmdldCk7XG4gICAgICAgICAgICAvLyBvdGhlciBheGlzIG1pZ2h0IGJlIG5vdCBzY3JvbGxhYmxlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYW5CZVNjcm9sbGVkSW5NYWluRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhY3RpdmVBeGlzLmN1cnJlbnQgJiYgJ2NoYW5nZWRUb3VjaGVzJyBpbiBldmVudCAmJiAoZGVsdGFYIHx8IGRlbHRhWSkpIHtcbiAgICAgICAgICAgIGFjdGl2ZUF4aXMuY3VycmVudCA9IGN1cnJlbnRBeGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudEF4aXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjYW5jZWxpbmdBeGlzID0gYWN0aXZlQXhpcy5jdXJyZW50IHx8IGN1cnJlbnRBeGlzO1xuICAgICAgICByZXR1cm4gaGFuZGxlU2Nyb2xsKGNhbmNlbGluZ0F4aXMsIHBhcmVudCwgZXZlbnQsIGNhbmNlbGluZ0F4aXMgPT09ICdoJyA/IGRlbHRhWCA6IGRlbHRhWSwgdHJ1ZSk7XG4gICAgfSwgW10pO1xuICAgIHZhciBzaG91bGRQcmV2ZW50ID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKF9ldmVudCkge1xuICAgICAgICB2YXIgZXZlbnQgPSBfZXZlbnQ7XG4gICAgICAgIGlmICghbG9ja1N0YWNrLmxlbmd0aCB8fCBsb2NrU3RhY2tbbG9ja1N0YWNrLmxlbmd0aCAtIDFdICE9PSBTdHlsZSkge1xuICAgICAgICAgICAgLy8gbm90IHRoZSBsYXN0IGFjdGl2ZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWx0YSA9ICdkZWx0YVknIGluIGV2ZW50ID8gZ2V0RGVsdGFYWShldmVudCkgOiBnZXRUb3VjaFhZKGV2ZW50KTtcbiAgICAgICAgdmFyIHNvdXJjZUV2ZW50ID0gc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLm5hbWUgPT09IGV2ZW50LnR5cGUgJiYgKGUudGFyZ2V0ID09PSBldmVudC50YXJnZXQgfHwgZXZlbnQudGFyZ2V0ID09PSBlLnNoYWRvd1BhcmVudCkgJiYgZGVsdGFDb21wYXJlKGUuZGVsdGEsIGRlbHRhKTsgfSlbMF07XG4gICAgICAgIC8vIHNlbGYgZXZlbnQsIGFuZCBzaG91bGQgYmUgY2FuY2VsZWRcbiAgICAgICAgaWYgKHNvdXJjZUV2ZW50ICYmIHNvdXJjZUV2ZW50LnNob3VsZCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIG91dHNpZGUgb3Igc2hhcmQgZXZlbnRcbiAgICAgICAgaWYgKCFzb3VyY2VFdmVudCkge1xuICAgICAgICAgICAgdmFyIHNoYXJkTm9kZXMgPSAobGFzdFByb3BzLmN1cnJlbnQuc2hhcmRzIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5tYXAoZXh0cmFjdFJlZilcbiAgICAgICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gbm9kZS5jb250YWlucyhldmVudC50YXJnZXQpOyB9KTtcbiAgICAgICAgICAgIHZhciBzaG91bGRTdG9wID0gc2hhcmROb2Rlcy5sZW5ndGggPiAwID8gc2hvdWxkQ2FuY2VsRXZlbnQoZXZlbnQsIHNoYXJkTm9kZXNbMF0pIDogIWxhc3RQcm9wcy5jdXJyZW50Lm5vSXNvbGF0aW9uO1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0b3ApIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICB2YXIgc2hvdWxkQ2FuY2VsID0gUmVhY3QudXNlQ2FsbGJhY2soZnVuY3Rpb24gKG5hbWUsIGRlbHRhLCB0YXJnZXQsIHNob3VsZCkge1xuICAgICAgICB2YXIgZXZlbnQgPSB7IG5hbWU6IG5hbWUsIGRlbHRhOiBkZWx0YSwgdGFyZ2V0OiB0YXJnZXQsIHNob3VsZDogc2hvdWxkLCBzaGFkb3dQYXJlbnQ6IGdldE91dGVybW9zdFNoYWRvd1BhcmVudCh0YXJnZXQpIH07XG4gICAgICAgIHNob3VsZFByZXZlbnRRdWV1ZS5jdXJyZW50LnB1c2goZXZlbnQpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNob3VsZFByZXZlbnRRdWV1ZS5jdXJyZW50ID0gc2hvdWxkUHJldmVudFF1ZXVlLmN1cnJlbnQuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlICE9PSBldmVudDsgfSk7XG4gICAgICAgIH0sIDEpO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2Nyb2xsVG91Y2hTdGFydCA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0b3VjaFN0YXJ0UmVmLmN1cnJlbnQgPSBnZXRUb3VjaFhZKGV2ZW50KTtcbiAgICAgICAgYWN0aXZlQXhpcy5jdXJyZW50ID0gdW5kZWZpbmVkO1xuICAgIH0sIFtdKTtcbiAgICB2YXIgc2Nyb2xsV2hlZWwgPSBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc2hvdWxkQ2FuY2VsKGV2ZW50LnR5cGUsIGdldERlbHRhWFkoZXZlbnQpLCBldmVudC50YXJnZXQsIHNob3VsZENhbmNlbEV2ZW50KGV2ZW50LCBwcm9wcy5sb2NrUmVmLmN1cnJlbnQpKTtcbiAgICB9LCBbXSk7XG4gICAgdmFyIHNjcm9sbFRvdWNoTW92ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzaG91bGRDYW5jZWwoZXZlbnQudHlwZSwgZ2V0VG91Y2hYWShldmVudCksIGV2ZW50LnRhcmdldCwgc2hvdWxkQ2FuY2VsRXZlbnQoZXZlbnQsIHByb3BzLmxvY2tSZWYuY3VycmVudCkpO1xuICAgIH0sIFtdKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2NrU3RhY2sucHVzaChTdHlsZSk7XG4gICAgICAgIHByb3BzLnNldENhbGxiYWNrcyh7XG4gICAgICAgICAgICBvblNjcm9sbENhcHR1cmU6IHNjcm9sbFdoZWVsLFxuICAgICAgICAgICAgb25XaGVlbENhcHR1cmU6IHNjcm9sbFdoZWVsLFxuICAgICAgICAgICAgb25Ub3VjaE1vdmVDYXB0dXJlOiBzY3JvbGxUb3VjaE1vdmUsXG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBzaG91bGRQcmV2ZW50LCBub25QYXNzaXZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNjcm9sbFRvdWNoU3RhcnQsIG5vblBhc3NpdmUpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbG9ja1N0YWNrID0gbG9ja1N0YWNrLmZpbHRlcihmdW5jdGlvbiAoaW5zdCkgeyByZXR1cm4gaW5zdCAhPT0gU3R5bGU7IH0pO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzaG91bGRQcmV2ZW50LCBub25QYXNzaXZlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHNob3VsZFByZXZlbnQsIG5vblBhc3NpdmUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHNjcm9sbFRvdWNoU3RhcnQsIG5vblBhc3NpdmUpO1xuICAgICAgICB9O1xuICAgIH0sIFtdKTtcbiAgICB2YXIgcmVtb3ZlU2Nyb2xsQmFyID0gcHJvcHMucmVtb3ZlU2Nyb2xsQmFyLCBpbmVydCA9IHByb3BzLmluZXJ0O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgaW5lcnQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFN0eWxlLCB7IHN0eWxlczogZ2VuZXJhdGVTdHlsZShpZCkgfSkgOiBudWxsLFxuICAgICAgICByZW1vdmVTY3JvbGxCYXIgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFJlbW92ZVNjcm9sbEJhciwgeyBub1JlbGF0aXZlOiBwcm9wcy5ub1JlbGF0aXZlLCBnYXBNb2RlOiBwcm9wcy5nYXBNb2RlIH0pIDogbnVsbCkpO1xufVxuZnVuY3Rpb24gZ2V0T3V0ZXJtb3N0U2hhZG93UGFyZW50KG5vZGUpIHtcbiAgICB2YXIgc2hhZG93UGFyZW50ID0gbnVsbDtcbiAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIHNoYWRvd1BhcmVudCA9IG5vZGUuaG9zdDtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmhvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIHNoYWRvd1BhcmVudDtcbn1cbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX3Jlc3QgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZ1bGxXaWR0aENsYXNzTmFtZSwgemVyb1JpZ2h0Q2xhc3NOYW1lIH0gZnJvbSAncmVhY3QtcmVtb3ZlLXNjcm9sbC1iYXIvY29uc3RhbnRzJztcbmltcG9ydCB7IHVzZU1lcmdlUmVmcyB9IGZyb20gJ3VzZS1jYWxsYmFjay1yZWYnO1xuaW1wb3J0IHsgZWZmZWN0Q2FyIH0gZnJvbSAnLi9tZWRpdW0nO1xudmFyIG5vdGhpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuO1xufTtcbi8qKlxuICogUmVtb3ZlcyBzY3JvbGxiYXIgZnJvbSB0aGUgcGFnZSBhbmQgY29udGFpbiB0aGUgc2Nyb2xsIHdpdGhpbiB0aGUgTG9ja1xuICovXG52YXIgUmVtb3ZlU2Nyb2xsID0gUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHBhcmVudFJlZikge1xuICAgIHZhciByZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgdmFyIF9hID0gUmVhY3QudXNlU3RhdGUoe1xuICAgICAgICBvblNjcm9sbENhcHR1cmU6IG5vdGhpbmcsXG4gICAgICAgIG9uV2hlZWxDYXB0dXJlOiBub3RoaW5nLFxuICAgICAgICBvblRvdWNoTW92ZUNhcHR1cmU6IG5vdGhpbmcsXG4gICAgfSksIGNhbGxiYWNrcyA9IF9hWzBdLCBzZXRDYWxsYmFja3MgPSBfYVsxXTtcbiAgICB2YXIgZm9yd2FyZFByb3BzID0gcHJvcHMuZm9yd2FyZFByb3BzLCBjaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuLCBjbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUsIHJlbW92ZVNjcm9sbEJhciA9IHByb3BzLnJlbW92ZVNjcm9sbEJhciwgZW5hYmxlZCA9IHByb3BzLmVuYWJsZWQsIHNoYXJkcyA9IHByb3BzLnNoYXJkcywgc2lkZUNhciA9IHByb3BzLnNpZGVDYXIsIG5vUmVsYXRpdmUgPSBwcm9wcy5ub1JlbGF0aXZlLCBub0lzb2xhdGlvbiA9IHByb3BzLm5vSXNvbGF0aW9uLCBpbmVydCA9IHByb3BzLmluZXJ0LCBhbGxvd1BpbmNoWm9vbSA9IHByb3BzLmFsbG93UGluY2hab29tLCBfYiA9IHByb3BzLmFzLCBDb250YWluZXIgPSBfYiA9PT0gdm9pZCAwID8gJ2RpdicgOiBfYiwgZ2FwTW9kZSA9IHByb3BzLmdhcE1vZGUsIHJlc3QgPSBfX3Jlc3QocHJvcHMsIFtcImZvcndhcmRQcm9wc1wiLCBcImNoaWxkcmVuXCIsIFwiY2xhc3NOYW1lXCIsIFwicmVtb3ZlU2Nyb2xsQmFyXCIsIFwiZW5hYmxlZFwiLCBcInNoYXJkc1wiLCBcInNpZGVDYXJcIiwgXCJub1JlbGF0aXZlXCIsIFwibm9Jc29sYXRpb25cIiwgXCJpbmVydFwiLCBcImFsbG93UGluY2hab29tXCIsIFwiYXNcIiwgXCJnYXBNb2RlXCJdKTtcbiAgICB2YXIgU2lkZUNhciA9IHNpZGVDYXI7XG4gICAgdmFyIGNvbnRhaW5lclJlZiA9IHVzZU1lcmdlUmVmcyhbcmVmLCBwYXJlbnRSZWZdKTtcbiAgICB2YXIgY29udGFpbmVyUHJvcHMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzdCksIGNhbGxiYWNrcyk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICBlbmFibGVkICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFNpZGVDYXIsIHsgc2lkZUNhcjogZWZmZWN0Q2FyLCByZW1vdmVTY3JvbGxCYXI6IHJlbW92ZVNjcm9sbEJhciwgc2hhcmRzOiBzaGFyZHMsIG5vUmVsYXRpdmU6IG5vUmVsYXRpdmUsIG5vSXNvbGF0aW9uOiBub0lzb2xhdGlvbiwgaW5lcnQ6IGluZXJ0LCBzZXRDYWxsYmFja3M6IHNldENhbGxiYWNrcywgYWxsb3dQaW5jaFpvb206ICEhYWxsb3dQaW5jaFpvb20sIGxvY2tSZWY6IHJlZiwgZ2FwTW9kZTogZ2FwTW9kZSB9KSksXG4gICAgICAgIGZvcndhcmRQcm9wcyA/IChSZWFjdC5jbG9uZUVsZW1lbnQoUmVhY3QuQ2hpbGRyZW4ub25seShjaGlsZHJlbiksIF9fYXNzaWduKF9fYXNzaWduKHt9LCBjb250YWluZXJQcm9wcyksIHsgcmVmOiBjb250YWluZXJSZWYgfSkpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KENvbnRhaW5lciwgX19hc3NpZ24oe30sIGNvbnRhaW5lclByb3BzLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCByZWY6IGNvbnRhaW5lclJlZiB9KSwgY2hpbGRyZW4pKSkpO1xufSk7XG5SZW1vdmVTY3JvbGwuZGVmYXVsdFByb3BzID0ge1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgcmVtb3ZlU2Nyb2xsQmFyOiB0cnVlLFxuICAgIGluZXJ0OiBmYWxzZSxcbn07XG5SZW1vdmVTY3JvbGwuY2xhc3NOYW1lcyA9IHtcbiAgICBmdWxsV2lkdGg6IGZ1bGxXaWR0aENsYXNzTmFtZSxcbiAgICB6ZXJvUmlnaHQ6IHplcm9SaWdodENsYXNzTmFtZSxcbn07XG5leHBvcnQgeyBSZW1vdmVTY3JvbGwgfTtcbiIsInZhciBwYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBwYXNzaXZlU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0Jywgb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBwYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IHZhciBub25QYXNzaXZlID0gcGFzc2l2ZVN1cHBvcnRlZCA/IHsgcGFzc2l2ZTogZmFsc2UgfSA6IGZhbHNlO1xuIiwidmFyIGFsd2F5c0NvbnRhaW5zU2Nyb2xsID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAvLyB0ZXh0YXJlYSB3aWxsIGFsd2F5cyBfY29udGFpbl8gc2Nyb2xsIGluc2lkZSBzZWxmLiBJdCBvbmx5IGNhbiBiZSBoaWRkZW5cbiAgICByZXR1cm4gbm9kZS50YWdOYW1lID09PSAnVEVYVEFSRUEnO1xufTtcbnZhciBlbGVtZW50Q2FuQmVTY3JvbGxlZCA9IGZ1bmN0aW9uIChub2RlLCBvdmVyZmxvdykge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICByZXR1cm4gKFxuICAgIC8vIG5vdC1ub3Qtc2Nyb2xsYWJsZVxuICAgIHN0eWxlc1tvdmVyZmxvd10gIT09ICdoaWRkZW4nICYmXG4gICAgICAgIC8vIGNvbnRhaW5zIHNjcm9sbCBpbnNpZGUgc2VsZlxuICAgICAgICAhKHN0eWxlcy5vdmVyZmxvd1kgPT09IHN0eWxlcy5vdmVyZmxvd1ggJiYgIWFsd2F5c0NvbnRhaW5zU2Nyb2xsKG5vZGUpICYmIHN0eWxlc1tvdmVyZmxvd10gPT09ICd2aXNpYmxlJykpO1xufTtcbnZhciBlbGVtZW50Q291bGRCZVZTY3JvbGxlZCA9IGZ1bmN0aW9uIChub2RlKSB7IHJldHVybiBlbGVtZW50Q2FuQmVTY3JvbGxlZChub2RlLCAnb3ZlcmZsb3dZJyk7IH07XG52YXIgZWxlbWVudENvdWxkQmVIU2Nyb2xsZWQgPSBmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gZWxlbWVudENhbkJlU2Nyb2xsZWQobm9kZSwgJ292ZXJmbG93WCcpOyB9O1xuZXhwb3J0IHZhciBsb2NhdGlvbkNvdWxkQmVTY3JvbGxlZCA9IGZ1bmN0aW9uIChheGlzLCBub2RlKSB7XG4gICAgdmFyIG93bmVyRG9jdW1lbnQgPSBub2RlLm93bmVyRG9jdW1lbnQ7XG4gICAgdmFyIGN1cnJlbnQgPSBub2RlO1xuICAgIGRvIHtcbiAgICAgICAgLy8gU2tpcCBvdmVyIHNoYWRvdyByb290XG4gICAgICAgIGlmICh0eXBlb2YgU2hhZG93Um9vdCAhPT0gJ3VuZGVmaW5lZCcgJiYgY3VycmVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lmhvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlzU2Nyb2xsYWJsZSA9IGVsZW1lbnRDb3VsZEJlU2Nyb2xsZWQoYXhpcywgY3VycmVudCk7XG4gICAgICAgIGlmIChpc1Njcm9sbGFibGUpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGdldFNjcm9sbFZhcmlhYmxlcyhheGlzLCBjdXJyZW50KSwgc2Nyb2xsSGVpZ2h0ID0gX2FbMV0sIGNsaWVudEhlaWdodCA9IF9hWzJdO1xuICAgICAgICAgICAgaWYgKHNjcm9sbEhlaWdodCA+IGNsaWVudEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XG4gICAgfSB3aGlsZSAoY3VycmVudCAmJiBjdXJyZW50ICE9PSBvd25lckRvY3VtZW50LmJvZHkpO1xuICAgIHJldHVybiBmYWxzZTtcbn07XG52YXIgZ2V0VlNjcm9sbFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzY3JvbGxUb3AgPSBfYS5zY3JvbGxUb3AsIHNjcm9sbEhlaWdodCA9IF9hLnNjcm9sbEhlaWdodCwgY2xpZW50SGVpZ2h0ID0gX2EuY2xpZW50SGVpZ2h0O1xuICAgIHJldHVybiBbXG4gICAgICAgIHNjcm9sbFRvcCxcbiAgICAgICAgc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBjbGllbnRIZWlnaHQsXG4gICAgXTtcbn07XG52YXIgZ2V0SFNjcm9sbFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzY3JvbGxMZWZ0ID0gX2Euc2Nyb2xsTGVmdCwgc2Nyb2xsV2lkdGggPSBfYS5zY3JvbGxXaWR0aCwgY2xpZW50V2lkdGggPSBfYS5jbGllbnRXaWR0aDtcbiAgICByZXR1cm4gW1xuICAgICAgICBzY3JvbGxMZWZ0LFxuICAgICAgICBzY3JvbGxXaWR0aCxcbiAgICAgICAgY2xpZW50V2lkdGgsXG4gICAgXTtcbn07XG52YXIgZWxlbWVudENvdWxkQmVTY3JvbGxlZCA9IGZ1bmN0aW9uIChheGlzLCBub2RlKSB7XG4gICAgcmV0dXJuIGF4aXMgPT09ICd2JyA/IGVsZW1lbnRDb3VsZEJlVlNjcm9sbGVkKG5vZGUpIDogZWxlbWVudENvdWxkQmVIU2Nyb2xsZWQobm9kZSk7XG59O1xudmFyIGdldFNjcm9sbFZhcmlhYmxlcyA9IGZ1bmN0aW9uIChheGlzLCBub2RlKSB7XG4gICAgcmV0dXJuIGF4aXMgPT09ICd2JyA/IGdldFZTY3JvbGxWYXJpYWJsZXMobm9kZSkgOiBnZXRIU2Nyb2xsVmFyaWFibGVzKG5vZGUpO1xufTtcbnZhciBnZXREaXJlY3Rpb25GYWN0b3IgPSBmdW5jdGlvbiAoYXhpcywgZGlyZWN0aW9uKSB7XG4gICAgLyoqXG4gICAgICogSWYgdGhlIGVsZW1lbnQncyBkaXJlY3Rpb24gaXMgcnRsIChyaWdodC10by1sZWZ0KSwgdGhlbiBzY3JvbGxMZWZ0IGlzIDAgd2hlbiB0aGUgc2Nyb2xsYmFyIGlzIGF0IGl0cyByaWdodG1vc3QgcG9zaXRpb24sXG4gICAgICogYW5kIHRoZW4gaW5jcmVhc2luZ2x5IG5lZ2F0aXZlIGFzIHlvdSBzY3JvbGwgdG93YXJkcyB0aGUgZW5kIG9mIHRoZSBjb250ZW50LlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvc2Nyb2xsTGVmdFxuICAgICAqL1xuICAgIHJldHVybiBheGlzID09PSAnaCcgJiYgZGlyZWN0aW9uID09PSAncnRsJyA/IC0xIDogMTtcbn07XG5leHBvcnQgdmFyIGhhbmRsZVNjcm9sbCA9IGZ1bmN0aW9uIChheGlzLCBlbmRUYXJnZXQsIGV2ZW50LCBzb3VyY2VEZWx0YSwgbm9PdmVyc2Nyb2xsKSB7XG4gICAgdmFyIGRpcmVjdGlvbkZhY3RvciA9IGdldERpcmVjdGlvbkZhY3RvcihheGlzLCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbmRUYXJnZXQpLmRpcmVjdGlvbik7XG4gICAgdmFyIGRlbHRhID0gZGlyZWN0aW9uRmFjdG9yICogc291cmNlRGVsdGE7XG4gICAgLy8gZmluZCBzY3JvbGxhYmxlIHRhcmdldFxuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgdmFyIHRhcmdldEluTG9jayA9IGVuZFRhcmdldC5jb250YWlucyh0YXJnZXQpO1xuICAgIHZhciBzaG91bGRDYW5jZWxTY3JvbGwgPSBmYWxzZTtcbiAgICB2YXIgaXNEZWx0YVBvc2l0aXZlID0gZGVsdGEgPiAwO1xuICAgIHZhciBhdmFpbGFibGVTY3JvbGwgPSAwO1xuICAgIHZhciBhdmFpbGFibGVTY3JvbGxUb3AgPSAwO1xuICAgIGRvIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IGdldFNjcm9sbFZhcmlhYmxlcyhheGlzLCB0YXJnZXQpLCBwb3NpdGlvbiA9IF9hWzBdLCBzY3JvbGxfMSA9IF9hWzFdLCBjYXBhY2l0eSA9IF9hWzJdO1xuICAgICAgICB2YXIgZWxlbWVudFNjcm9sbCA9IHNjcm9sbF8xIC0gY2FwYWNpdHkgLSBkaXJlY3Rpb25GYWN0b3IgKiBwb3NpdGlvbjtcbiAgICAgICAgaWYgKHBvc2l0aW9uIHx8IGVsZW1lbnRTY3JvbGwpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50Q291bGRCZVNjcm9sbGVkKGF4aXMsIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVTY3JvbGwgKz0gZWxlbWVudFNjcm9sbDtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVTY3JvbGxUb3AgKz0gcG9zaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcmVudF8xID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIC8vIHdlIHdpbGwgXCJidWJibGVcIiBmcm9tIFNoYWRvd0RvbSBpbiBjYXNlIHdlIGFyZSwgb3IganVzdCB0byB0aGUgcGFyZW50IGluIG5vcm1hbCBjYXNlXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgbG9naWMgdXNlZCBpbiBmb2N1cy1sb2NrXG4gICAgICAgIHRhcmdldCA9IChwYXJlbnRfMSAmJiBwYXJlbnRfMS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFID8gcGFyZW50XzEuaG9zdCA6IHBhcmVudF8xKTtcbiAgICB9IHdoaWxlIChcbiAgICAvLyBwb3J0YWxlZCBjb250ZW50XG4gICAgKCF0YXJnZXRJbkxvY2sgJiYgdGFyZ2V0ICE9PSBkb2N1bWVudC5ib2R5KSB8fFxuICAgICAgICAvLyBzZWxmIGNvbnRlbnRcbiAgICAgICAgKHRhcmdldEluTG9jayAmJiAoZW5kVGFyZ2V0LmNvbnRhaW5zKHRhcmdldCkgfHwgZW5kVGFyZ2V0ID09PSB0YXJnZXQpKSk7XG4gICAgLy8gaGFuZGxlIGVwc2lsb24gYXJvdW5kIDAgKG5vbiBzdGFuZGFyZCB6b29tIGxldmVscylcbiAgICBpZiAoaXNEZWx0YVBvc2l0aXZlICYmXG4gICAgICAgICgobm9PdmVyc2Nyb2xsICYmIE1hdGguYWJzKGF2YWlsYWJsZVNjcm9sbCkgPCAxKSB8fCAoIW5vT3ZlcnNjcm9sbCAmJiBkZWx0YSA+IGF2YWlsYWJsZVNjcm9sbCkpKSB7XG4gICAgICAgIHNob3VsZENhbmNlbFNjcm9sbCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFpc0RlbHRhUG9zaXRpdmUgJiZcbiAgICAgICAgKChub092ZXJzY3JvbGwgJiYgTWF0aC5hYnMoYXZhaWxhYmxlU2Nyb2xsVG9wKSA8IDEpIHx8ICghbm9PdmVyc2Nyb2xsICYmIC1kZWx0YSA+IGF2YWlsYWJsZVNjcm9sbFRvcCkpKSB7XG4gICAgICAgIHNob3VsZENhbmNlbFNjcm9sbCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzaG91bGRDYW5jZWxTY3JvbGw7XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2lkZWNhck1lZGl1bSB9IGZyb20gJ3VzZS1zaWRlY2FyJztcbmV4cG9ydCB2YXIgZWZmZWN0Q2FyID0gY3JlYXRlU2lkZWNhck1lZGl1bSgpO1xuIiwiaW1wb3J0IHsgZXhwb3J0U2lkZWNhciB9IGZyb20gJ3VzZS1zaWRlY2FyJztcbmltcG9ydCB7IFJlbW92ZVNjcm9sbFNpZGVDYXIgfSBmcm9tICcuL1NpZGVFZmZlY3QnO1xuaW1wb3J0IHsgZWZmZWN0Q2FyIH0gZnJvbSAnLi9tZWRpdW0nO1xuZXhwb3J0IGRlZmF1bHQgZXhwb3J0U2lkZWNhcihlZmZlY3RDYXIsIFJlbW92ZVNjcm9sbFNpZGVDYXIpO1xuIiwiaW1wb3J0IHsgc3R5bGVIb29rU2luZ2xldG9uIH0gZnJvbSAnLi9ob29rJztcbi8qKlxuICogY3JlYXRlIGEgQ29tcG9uZW50IHRvIGFkZCBzdHlsZXMgb24gZGVtYW5kXG4gKiAtIHN0eWxlcyBhcmUgYWRkZWQgd2hlbiBmaXJzdCBpbnN0YW5jZSBpcyBtb3VudGVkXG4gKiAtIHN0eWxlcyBhcmUgcmVtb3ZlZCB3aGVuIHRoZSBsYXN0IGluc3RhbmNlIGlzIHVubW91bnRlZFxuICogLSBjaGFuZ2luZyBzdHlsZXMgaW4gcnVudGltZSBkb2VzIG5vdGhpbmcgdW5sZXNzIGR5bmFtaWMgaXMgc2V0LiBCdXQgd2l0aCBtdWx0aXBsZSBjb21wb25lbnRzIHRoYXQgY2FuIGxlYWQgdG8gdGhlIHVuZGVmaW5lZCBiZWhhdmlvclxuICovXG5leHBvcnQgdmFyIHN0eWxlU2luZ2xldG9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB1c2VTdHlsZSA9IHN0eWxlSG9va1NpbmdsZXRvbigpO1xuICAgIHZhciBTaGVldCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgc3R5bGVzID0gX2Euc3R5bGVzLCBkeW5hbWljID0gX2EuZHluYW1pYztcbiAgICAgICAgdXNlU3R5bGUoc3R5bGVzLCBkeW5hbWljKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICByZXR1cm4gU2hlZXQ7XG59O1xuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc3R5bGVzaGVldFNpbmdsZXRvbiB9IGZyb20gJy4vc2luZ2xldG9uJztcbi8qKlxuICogY3JlYXRlcyBhIGhvb2sgdG8gY29udHJvbCBzdHlsZSBzaW5nbGV0b25cbiAqIEBzZWUge0BsaW5rIHN0eWxlU2luZ2xldG9ufSBmb3IgYSBzYWZlciBjb21wb25lbnQgdmVyc2lvblxuICogQGV4YW1wbGVcbiAqIGBgYHRzeFxuICogY29uc3QgdXNlU3R5bGUgPSBzdHlsZUhvb2tTaW5nbGV0b24oKTtcbiAqIC8vL1xuICogdXNlU3R5bGUoJ2JvZHkgeyBvdmVyZmxvdzogaGlkZGVufScpO1xuICovXG5leHBvcnQgdmFyIHN0eWxlSG9va1NpbmdsZXRvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2hlZXQgPSBzdHlsZXNoZWV0U2luZ2xldG9uKCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdHlsZXMsIGlzRHluYW1pYykge1xuICAgICAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2hlZXQuYWRkKHN0eWxlcyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNoZWV0LnJlbW92ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwgW3N0eWxlcyAmJiBpc0R5bmFtaWNdKTtcbiAgICB9O1xufTtcbiIsImV4cG9ydCB7IHN0eWxlU2luZ2xldG9uIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuZXhwb3J0IHsgc3R5bGVzaGVldFNpbmdsZXRvbiB9IGZyb20gJy4vc2luZ2xldG9uJztcbmV4cG9ydCB7IHN0eWxlSG9va1NpbmdsZXRvbiB9IGZyb20gJy4vaG9vayc7XG4iLCJpbXBvcnQgeyBnZXROb25jZSB9IGZyb20gJ2dldC1ub25jZSc7XG5mdW5jdGlvbiBtYWtlU3R5bGVUYWcoKSB7XG4gICAgaWYgKCFkb2N1bWVudClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgdmFyIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGFnLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHZhciBub25jZSA9IGdldE5vbmNlKCk7XG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgIH1cbiAgICByZXR1cm4gdGFnO1xufVxuZnVuY3Rpb24gaW5qZWN0U3R5bGVzKHRhZywgY3NzKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICh0YWcuc3R5bGVTaGVldCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRhZy5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0YWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVUYWcodGFnKSB7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgaGVhZC5hcHBlbmRDaGlsZCh0YWcpO1xufVxuZXhwb3J0IHZhciBzdHlsZXNoZWV0U2luZ2xldG9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICB2YXIgc3R5bGVzaGVldCA9IG51bGw7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkOiBmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgICAgICAgIGlmIChjb3VudGVyID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoKHN0eWxlc2hlZXQgPSBtYWtlU3R5bGVUYWcoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0U3R5bGVzKHN0eWxlc2hlZXQsIHN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0U3R5bGVUYWcoc3R5bGVzaGVldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvdW50ZXItLTtcbiAgICAgICAgICAgIGlmICghY291bnRlciAmJiBzdHlsZXNoZWV0KSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldC5wYXJlbnROb2RlICYmIHN0eWxlc2hlZXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZXNoZWV0KTtcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufTtcbiIsIi8qKlxuICogQXNzaWducyBhIHZhbHVlIGZvciBhIGdpdmVuIHJlZiwgbm8gbWF0dGVyIG9mIHRoZSByZWYgZm9ybWF0XG4gKiBAcGFyYW0ge1JlZk9iamVjdH0gcmVmIC0gYSBjYWxsYmFjayBmdW5jdGlvbiBvciByZWYgb2JqZWN0XG4gKiBAcGFyYW0gdmFsdWUgLSBhIG5ldyB2YWx1ZVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI2Fzc2lnbnJlZlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHJlZk9iamVjdCA9IHVzZVJlZigpO1xuICogY29uc3QgcmVmRm4gPSAocmVmKSA9PiB7Li4uLn1cbiAqXG4gKiBhc3NpZ25SZWYocmVmT2JqZWN0LCBcInJlZlZhbHVlXCIpO1xuICogYXNzaWduUmVmKHJlZkZuLCBcInJlZlZhbHVlXCIpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduUmVmKHJlZiwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZWYodmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZWYpIHtcbiAgICAgICAgcmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZjtcbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFzc2lnblJlZiB9IGZyb20gJy4vYXNzaWduUmVmJztcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSAnLi91c2VSZWYnO1xudmFyIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IFJlYWN0LnVzZUxheW91dEVmZmVjdCA6IFJlYWN0LnVzZUVmZmVjdDtcbnZhciBjdXJyZW50VmFsdWVzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogTWVyZ2VzIHR3byBvciBtb3JlIHJlZnMgdG9nZXRoZXIgcHJvdmlkaW5nIGEgc2luZ2xlIGludGVyZmFjZSB0byBzZXQgdGhlaXIgdmFsdWVcbiAqIEBwYXJhbSB7UmVmT2JqZWN0fFJlZn0gcmVmc1xuICogQHJldHVybnMge011dGFibGVSZWZPYmplY3R9IC0gYSBuZXcgcmVmLCB3aGljaCB0cmFuc2xhdGVzIGFsbCBjaGFuZ2VzIHRvIHtyZWZzfVxuICpcbiAqIEBzZWUge0BsaW5rIG1lcmdlUmVmc30gYSB2ZXJzaW9uIHdpdGhvdXQgYnVpdC1pbiBtZW1vaXphdGlvblxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjdXNlbWVyZ2VyZWZzXG4gKiBAZXhhbXBsZVxuICogY29uc3QgQ29tcG9uZW50ID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuICogICBjb25zdCBvd25SZWYgPSB1c2VSZWYoKTtcbiAqICAgY29uc3QgZG9tUmVmID0gdXNlTWVyZ2VSZWZzKFtyZWYsIG93blJlZl0pOyAvLyDwn5GIIG1lcmdlIHRvZ2V0aGVyXG4gKiAgIHJldHVybiA8ZGl2IHJlZj17ZG9tUmVmfT4uLi48L2Rpdj5cbiAqIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZU1lcmdlUmVmcyhyZWZzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICB2YXIgY2FsbGJhY2tSZWYgPSB1c2VDYWxsYmFja1JlZihkZWZhdWx0VmFsdWUgfHwgbnVsbCwgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIHJldHVybiByZWZzLmZvckVhY2goZnVuY3Rpb24gKHJlZikgeyByZXR1cm4gYXNzaWduUmVmKHJlZiwgbmV3VmFsdWUpOyB9KTtcbiAgICB9KTtcbiAgICAvLyBoYW5kbGUgcmVmcyBjaGFuZ2VzIC0gYWRkZWQgb3IgcmVtb3ZlZFxuICAgIHVzZUlzb21vcnBoaWNMYXlvdXRFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSBjdXJyZW50VmFsdWVzLmdldChjYWxsYmFja1JlZik7XG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIHByZXZSZWZzXzEgPSBuZXcgU2V0KG9sZFZhbHVlKTtcbiAgICAgICAgICAgIHZhciBuZXh0UmVmc18xID0gbmV3IFNldChyZWZzKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50XzEgPSBjYWxsYmFja1JlZi5jdXJyZW50O1xuICAgICAgICAgICAgcHJldlJlZnNfMS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5leHRSZWZzXzEuaGFzKHJlZikpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzaWduUmVmKHJlZiwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBuZXh0UmVmc18xLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgICAgICAgICAgIGlmICghcHJldlJlZnNfMS5oYXMocmVmKSkge1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25SZWYocmVmLCBjdXJyZW50XzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRWYWx1ZXMuc2V0KGNhbGxiYWNrUmVmLCByZWZzKTtcbiAgICB9LCBbcmVmc10pO1xuICAgIHJldHVybiBjYWxsYmFja1JlZjtcbn1cbiIsImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBjcmVhdGVzIGEgTXV0YWJsZVJlZiB3aXRoIHJlZiBjaGFuZ2UgY2FsbGJhY2tcbiAqIEBwYXJhbSBpbml0aWFsVmFsdWUgLSBpbml0aWFsIHJlZiB2YWx1ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBhIGNhbGxiYWNrIHRvIHJ1biB3aGVuIHZhbHVlIGNoYW5nZXNcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVmID0gdXNlQ2FsbGJhY2tSZWYoMCwgKG5ld1ZhbHVlLCBvbGRWYWx1ZSkgPT4gY29uc29sZS5sb2cob2xkVmFsdWUsICctPicsIG5ld1ZhbHVlKTtcbiAqIHJlZi5jdXJyZW50ID0gMTtcbiAqIC8vIHByaW50cyAwIC0+IDFcbiAqXG4gKiBAc2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9ob29rcy1yZWZlcmVuY2UuaHRtbCN1c2VyZWZcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI3VzZWNhbGxiYWNrcmVmLS0tdG8tcmVwbGFjZS1yZWFjdHVzZXJlZlxuICogQHJldHVybnMge011dGFibGVSZWZPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWxsYmFja1JlZihpbml0aWFsVmFsdWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlZiA9IHVzZVN0YXRlKGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7XG4gICAgICAgIC8vIHZhbHVlXG4gICAgICAgIHZhbHVlOiBpbml0aWFsVmFsdWUsXG4gICAgICAgIC8vIGxhc3QgY2FsbGJhY2tcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAvLyBcIm1lbW9pemVkXCIgcHVibGljIGludGVyZmFjZVxuICAgICAgICBmYWNhZGU6IHtcbiAgICAgICAgICAgIGdldCBjdXJyZW50KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWYudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGN1cnJlbnQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdCA9IHJlZi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJlZi5jYWxsYmFjayh2YWx1ZSwgbGFzdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KTsgfSlbMF07XG4gICAgLy8gdXBkYXRlIGNhbGxiYWNrXG4gICAgcmVmLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgcmV0dXJuIHJlZi5mYWNhZGU7XG59XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19yZXN0IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG52YXIgU2lkZUNhciA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzaWRlQ2FyID0gX2Euc2lkZUNhciwgcmVzdCA9IF9fcmVzdChfYSwgW1wic2lkZUNhclwiXSk7XG4gICAgaWYgKCFzaWRlQ2FyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2lkZWNhcjogcGxlYXNlIHByb3ZpZGUgYHNpZGVDYXJgIHByb3BlcnR5IHRvIGltcG9ydCB0aGUgcmlnaHQgY2FyJyk7XG4gICAgfVxuICAgIHZhciBUYXJnZXQgPSBzaWRlQ2FyLnJlYWQoKTtcbiAgICBpZiAoIVRhcmdldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpZGVjYXIgbWVkaXVtIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChUYXJnZXQsIF9fYXNzaWduKHt9LCByZXN0KSk7XG59O1xuU2lkZUNhci5pc1NpZGVDYXJFeHBvcnQgPSB0cnVlO1xuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydFNpZGVjYXIobWVkaXVtLCBleHBvcnRlZCkge1xuICAgIG1lZGl1bS51c2VNZWRpdW0oZXhwb3J0ZWQpO1xuICAgIHJldHVybiBTaWRlQ2FyO1xufVxuIiwiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbmZ1bmN0aW9uIEl0b0koYSkge1xuICAgIHJldHVybiBhO1xufVxuZnVuY3Rpb24gaW5uZXJDcmVhdGVNZWRpdW0oZGVmYXVsdHMsIG1pZGRsZXdhcmUpIHtcbiAgICBpZiAobWlkZGxld2FyZSA9PT0gdm9pZCAwKSB7IG1pZGRsZXdhcmUgPSBJdG9JOyB9XG4gICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgIHZhciBhc3NpZ25lZCA9IGZhbHNlO1xuICAgIHZhciBtZWRpdW0gPSB7XG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhc3NpZ25lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2lkZWNhcjogY291bGQgbm90IGByZWFkYCBmcm9tIGFuIGBhc3NpZ25lZGAgbWVkaXVtLiBgcmVhZGAgY291bGQgYmUgdXNlZCBvbmx5IHdpdGggYHVzZU1lZGl1bWAuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXJbYnVmZmVyLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgICAgICB9LFxuICAgICAgICB1c2VNZWRpdW06IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG1pZGRsZXdhcmUoZGF0YSwgYXNzaWduZWQpO1xuICAgICAgICAgICAgYnVmZmVyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGJ1ZmZlci5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggIT09IGl0ZW07IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgYXNzaWduU3luY01lZGl1bTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICBhc3NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjYnMgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgY2JzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyID0ge1xuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uICh4KSB7IHJldHVybiBjYih4KTsgfSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJ1ZmZlcjsgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnbk1lZGl1bTogZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgICBhc3NpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcGVuZGluZ1F1ZXVlID0gW107XG4gICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjYnMgPSBidWZmZXI7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgICAgICAgY2JzLmZvckVhY2goY2IpO1xuICAgICAgICAgICAgICAgIHBlbmRpbmdRdWV1ZSA9IGJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBleGVjdXRlUXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNicyA9IHBlbmRpbmdRdWV1ZTtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICBjYnMuZm9yRWFjaChjYik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGN5Y2xlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihleGVjdXRlUXVldWUpOyB9O1xuICAgICAgICAgICAgY3ljbGUoKTtcbiAgICAgICAgICAgIGJ1ZmZlciA9IHtcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgY3ljbGUoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUXVldWUgPSBwZW5kaW5nUXVldWUuZmlsdGVyKGZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gbWVkaXVtO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lZGl1bShkZWZhdWx0cywgbWlkZGxld2FyZSkge1xuICAgIGlmIChtaWRkbGV3YXJlID09PSB2b2lkIDApIHsgbWlkZGxld2FyZSA9IEl0b0k7IH1cbiAgICByZXR1cm4gaW5uZXJDcmVhdGVNZWRpdW0oZGVmYXVsdHMsIG1pZGRsZXdhcmUpO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTaWRlY2FyTWVkaXVtKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciBtZWRpdW0gPSBpbm5lckNyZWF0ZU1lZGl1bShudWxsKTtcbiAgICBtZWRpdW0ub3B0aW9ucyA9IF9fYXNzaWduKHsgYXN5bmM6IHRydWUsIHNzcjogZmFsc2UgfSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG1lZGl1bTtcbn1cbiIsIi8vIHNyYy9wcmltaXRpdmUudHN4XG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuZnVuY3Rpb24gY29tcG9zZUV2ZW50SGFuZGxlcnMob3JpZ2luYWxFdmVudEhhbmRsZXIsIG91ckV2ZW50SGFuZGxlciwgeyBjaGVja0ZvckRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlIH0gPSB7fSkge1xuICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICBvcmlnaW5hbEV2ZW50SGFuZGxlcj8uKGV2ZW50KTtcbiAgICBpZiAoY2hlY2tGb3JEZWZhdWx0UHJldmVudGVkID09PSBmYWxzZSB8fCAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgcmV0dXJuIG91ckV2ZW50SGFuZGxlcj8uKGV2ZW50KTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBnZXRPd25lcldpbmRvdyhlbGVtZW50KSB7XG4gIGlmICghY2FuVXNlRE9NKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGFjY2VzcyB3aW5kb3cgb3V0c2lkZSBvZiB0aGUgRE9NXCIpO1xuICB9XG4gIHJldHVybiBlbGVtZW50Py5vd25lckRvY3VtZW50Py5kZWZhdWx0VmlldyA/PyB3aW5kb3c7XG59XG5mdW5jdGlvbiBnZXRPd25lckRvY3VtZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFjYW5Vc2VET00pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYWNjZXNzIGRvY3VtZW50IG91dHNpZGUgb2YgdGhlIERPTVwiKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudD8ub3duZXJEb2N1bWVudCA/PyBkb2N1bWVudDtcbn1cbmZ1bmN0aW9uIGdldEFjdGl2ZUVsZW1lbnQobm9kZSwgYWN0aXZlRGVzY2VuZGFudCA9IGZhbHNlKSB7XG4gIGNvbnN0IHsgYWN0aXZlRWxlbWVudCB9ID0gZ2V0T3duZXJEb2N1bWVudChub2RlKTtcbiAgaWYgKCFhY3RpdmVFbGVtZW50Py5ub2RlTmFtZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChpc0ZyYW1lKGFjdGl2ZUVsZW1lbnQpICYmIGFjdGl2ZUVsZW1lbnQuY29udGVudERvY3VtZW50KSB7XG4gICAgcmV0dXJuIGdldEFjdGl2ZUVsZW1lbnQoYWN0aXZlRWxlbWVudC5jb250ZW50RG9jdW1lbnQuYm9keSwgYWN0aXZlRGVzY2VuZGFudCk7XG4gIH1cbiAgaWYgKGFjdGl2ZURlc2NlbmRhbnQpIHtcbiAgICBjb25zdCBpZCA9IGFjdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIpO1xuICAgIGlmIChpZCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGdldE93bmVyRG9jdW1lbnQoYWN0aXZlRWxlbWVudCkuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBhY3RpdmVFbGVtZW50O1xufVxuZnVuY3Rpb24gaXNGcmFtZShlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50LnRhZ05hbWUgPT09IFwiSUZSQU1FXCI7XG59XG5leHBvcnQge1xuICBjYW5Vc2VET00sXG4gIGNvbXBvc2VFdmVudEhhbmRsZXJzLFxuICBnZXRBY3RpdmVFbGVtZW50LFxuICBnZXRPd25lckRvY3VtZW50LFxuICBnZXRPd25lcldpbmRvdyxcbiAgaXNGcmFtZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L2NvbnRleHQvc3JjL2NyZWF0ZS1jb250ZXh0LnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQyKHJvb3RDb21wb25lbnROYW1lLCBkZWZhdWx0Q29udGV4dCkge1xuICBjb25zdCBDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dChkZWZhdWx0Q29udGV4dCk7XG4gIGNvbnN0IFByb3ZpZGVyID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4uY29udGV4dCB9ID0gcHJvcHM7XG4gICAgY29uc3QgdmFsdWUgPSBSZWFjdC51c2VNZW1vKCgpID0+IGNvbnRleHQsIE9iamVjdC52YWx1ZXMoY29udGV4dCkpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KENvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWUsIGNoaWxkcmVuIH0pO1xuICB9O1xuICBQcm92aWRlci5kaXNwbGF5TmFtZSA9IHJvb3RDb21wb25lbnROYW1lICsgXCJQcm92aWRlclwiO1xuICBmdW5jdGlvbiB1c2VDb250ZXh0Mihjb25zdW1lck5hbWUpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChDb250ZXh0KTtcbiAgICBpZiAoY29udGV4dCkgcmV0dXJuIGNvbnRleHQ7XG4gICAgaWYgKGRlZmF1bHRDb250ZXh0ICE9PSB2b2lkIDApIHJldHVybiBkZWZhdWx0Q29udGV4dDtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFxcYCR7Y29uc3VtZXJOYW1lfVxcYCBtdXN0IGJlIHVzZWQgd2l0aGluIFxcYCR7cm9vdENvbXBvbmVudE5hbWV9XFxgYCk7XG4gIH1cbiAgcmV0dXJuIFtQcm92aWRlciwgdXNlQ29udGV4dDJdO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29udGV4dFNjb3BlKHNjb3BlTmFtZSwgY3JlYXRlQ29udGV4dFNjb3BlRGVwcyA9IFtdKSB7XG4gIGxldCBkZWZhdWx0Q29udGV4dHMgPSBbXTtcbiAgZnVuY3Rpb24gY3JlYXRlQ29udGV4dDMocm9vdENvbXBvbmVudE5hbWUsIGRlZmF1bHRDb250ZXh0KSB7XG4gICAgY29uc3QgQmFzZUNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KGRlZmF1bHRDb250ZXh0KTtcbiAgICBjb25zdCBpbmRleCA9IGRlZmF1bHRDb250ZXh0cy5sZW5ndGg7XG4gICAgZGVmYXVsdENvbnRleHRzID0gWy4uLmRlZmF1bHRDb250ZXh0cywgZGVmYXVsdENvbnRleHRdO1xuICAgIGNvbnN0IFByb3ZpZGVyID0gKHByb3BzKSA9PiB7XG4gICAgICBjb25zdCB7IHNjb3BlLCBjaGlsZHJlbiwgLi4uY29udGV4dCB9ID0gcHJvcHM7XG4gICAgICBjb25zdCBDb250ZXh0ID0gc2NvcGU/LltzY29wZU5hbWVdPy5baW5kZXhdIHx8IEJhc2VDb250ZXh0O1xuICAgICAgY29uc3QgdmFsdWUgPSBSZWFjdC51c2VNZW1vKCgpID0+IGNvbnRleHQsIE9iamVjdC52YWx1ZXMoY29udGV4dCkpO1xuICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZSwgY2hpbGRyZW4gfSk7XG4gICAgfTtcbiAgICBQcm92aWRlci5kaXNwbGF5TmFtZSA9IHJvb3RDb21wb25lbnROYW1lICsgXCJQcm92aWRlclwiO1xuICAgIGZ1bmN0aW9uIHVzZUNvbnRleHQyKGNvbnN1bWVyTmFtZSwgc2NvcGUpIHtcbiAgICAgIGNvbnN0IENvbnRleHQgPSBzY29wZT8uW3Njb3BlTmFtZV0/LltpbmRleF0gfHwgQmFzZUNvbnRleHQ7XG4gICAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChDb250ZXh0KTtcbiAgICAgIGlmIChjb250ZXh0KSByZXR1cm4gY29udGV4dDtcbiAgICAgIGlmIChkZWZhdWx0Q29udGV4dCAhPT0gdm9pZCAwKSByZXR1cm4gZGVmYXVsdENvbnRleHQ7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxcYCR7Y29uc3VtZXJOYW1lfVxcYCBtdXN0IGJlIHVzZWQgd2l0aGluIFxcYCR7cm9vdENvbXBvbmVudE5hbWV9XFxgYCk7XG4gICAgfVxuICAgIHJldHVybiBbUHJvdmlkZXIsIHVzZUNvbnRleHQyXTtcbiAgfVxuICBjb25zdCBjcmVhdGVTY29wZSA9ICgpID0+IHtcbiAgICBjb25zdCBzY29wZUNvbnRleHRzID0gZGVmYXVsdENvbnRleHRzLm1hcCgoZGVmYXVsdENvbnRleHQpID0+IHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVDb250ZXh0KGRlZmF1bHRDb250ZXh0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdXNlU2NvcGUoc2NvcGUpIHtcbiAgICAgIGNvbnN0IGNvbnRleHRzID0gc2NvcGU/LltzY29wZU5hbWVdIHx8IHNjb3BlQ29udGV4dHM7XG4gICAgICByZXR1cm4gUmVhY3QudXNlTWVtbyhcbiAgICAgICAgKCkgPT4gKHsgW2BfX3Njb3BlJHtzY29wZU5hbWV9YF06IHsgLi4uc2NvcGUsIFtzY29wZU5hbWVdOiBjb250ZXh0cyB9IH0pLFxuICAgICAgICBbc2NvcGUsIGNvbnRleHRzXVxuICAgICAgKTtcbiAgICB9O1xuICB9O1xuICBjcmVhdGVTY29wZS5zY29wZU5hbWUgPSBzY29wZU5hbWU7XG4gIHJldHVybiBbY3JlYXRlQ29udGV4dDMsIGNvbXBvc2VDb250ZXh0U2NvcGVzKGNyZWF0ZVNjb3BlLCAuLi5jcmVhdGVDb250ZXh0U2NvcGVEZXBzKV07XG59XG5mdW5jdGlvbiBjb21wb3NlQ29udGV4dFNjb3BlcyguLi5zY29wZXMpIHtcbiAgY29uc3QgYmFzZVNjb3BlID0gc2NvcGVzWzBdO1xuICBpZiAoc2NvcGVzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIGJhc2VTY29wZTtcbiAgY29uc3QgY3JlYXRlU2NvcGUgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2NvcGVIb29rcyA9IHNjb3Blcy5tYXAoKGNyZWF0ZVNjb3BlMikgPT4gKHtcbiAgICAgIHVzZVNjb3BlOiBjcmVhdGVTY29wZTIoKSxcbiAgICAgIHNjb3BlTmFtZTogY3JlYXRlU2NvcGUyLnNjb3BlTmFtZVxuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gdXNlQ29tcG9zZWRTY29wZXMob3ZlcnJpZGVTY29wZXMpIHtcbiAgICAgIGNvbnN0IG5leHRTY29wZXMgPSBzY29wZUhvb2tzLnJlZHVjZSgobmV4dFNjb3BlczIsIHsgdXNlU2NvcGUsIHNjb3BlTmFtZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjb3BlUHJvcHMgPSB1c2VTY29wZShvdmVycmlkZVNjb3Blcyk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTY29wZSA9IHNjb3BlUHJvcHNbYF9fc2NvcGUke3Njb3BlTmFtZX1gXTtcbiAgICAgICAgcmV0dXJuIHsgLi4ubmV4dFNjb3BlczIsIC4uLmN1cnJlbnRTY29wZSB9O1xuICAgICAgfSwge30pO1xuICAgICAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oKCkgPT4gKHsgW2BfX3Njb3BlJHtiYXNlU2NvcGUuc2NvcGVOYW1lfWBdOiBuZXh0U2NvcGVzIH0pLCBbbmV4dFNjb3Blc10pO1xuICAgIH07XG4gIH07XG4gIGNyZWF0ZVNjb3BlLnNjb3BlTmFtZSA9IGJhc2VTY29wZS5zY29wZU5hbWU7XG4gIHJldHVybiBjcmVhdGVTY29wZTtcbn1cbmV4cG9ydCB7XG4gIGNyZWF0ZUNvbnRleHQyIGFzIGNyZWF0ZUNvbnRleHQsXG4gIGNyZWF0ZUNvbnRleHRTY29wZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZGlhbG9nLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb21wb3NlRXZlbnRIYW5kbGVycyB9IGZyb20gXCJAcmFkaXgtdWkvcHJpbWl0aXZlXCI7XG5pbXBvcnQgeyB1c2VDb21wb3NlZFJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgY3JlYXRlQ29udGV4dFNjb3BlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1jb250ZXh0XCI7XG5pbXBvcnQgeyB1c2VJZCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtaWRcIjtcbmltcG9ydCB7IHVzZUNvbnRyb2xsYWJsZVN0YXRlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY29udHJvbGxhYmxlLXN0YXRlXCI7XG5pbXBvcnQgeyBEaXNtaXNzYWJsZUxheWVyIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1kaXNtaXNzYWJsZS1sYXllclwiO1xuaW1wb3J0IHsgRm9jdXNTY29wZSB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtZm9jdXMtc2NvcGVcIjtcbmltcG9ydCB7IFBvcnRhbCBhcyBQb3J0YWxQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXBvcnRhbFwiO1xuaW1wb3J0IHsgUHJlc2VuY2UgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByZXNlbmNlXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlRm9jdXNHdWFyZHMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWZvY3VzLWd1YXJkc1wiO1xuaW1wb3J0IHsgUmVtb3ZlU2Nyb2xsIH0gZnJvbSBcInJlYWN0LXJlbW92ZS1zY3JvbGxcIjtcbmltcG9ydCB7IGhpZGVPdGhlcnMgfSBmcm9tIFwiYXJpYS1oaWRkZW5cIjtcbmltcG9ydCB7IGNyZWF0ZVNsb3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXNsb3RcIjtcbmltcG9ydCB7IEZyYWdtZW50LCBqc3gsIGpzeHMgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBESUFMT0dfTkFNRSA9IFwiRGlhbG9nXCI7XG52YXIgW2NyZWF0ZURpYWxvZ0NvbnRleHQsIGNyZWF0ZURpYWxvZ1Njb3BlXSA9IGNyZWF0ZUNvbnRleHRTY29wZShESUFMT0dfTkFNRSk7XG52YXIgW0RpYWxvZ1Byb3ZpZGVyLCB1c2VEaWFsb2dDb250ZXh0XSA9IGNyZWF0ZURpYWxvZ0NvbnRleHQoRElBTE9HX05BTUUpO1xudmFyIERpYWxvZyA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7XG4gICAgX19zY29wZURpYWxvZyxcbiAgICBjaGlsZHJlbixcbiAgICBvcGVuOiBvcGVuUHJvcCxcbiAgICBkZWZhdWx0T3BlbixcbiAgICBvbk9wZW5DaGFuZ2UsXG4gICAgbW9kYWwgPSB0cnVlXG4gIH0gPSBwcm9wcztcbiAgY29uc3QgdHJpZ2dlclJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgY29udGVudFJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlQ29udHJvbGxhYmxlU3RhdGUoe1xuICAgIHByb3A6IG9wZW5Qcm9wLFxuICAgIGRlZmF1bHRQcm9wOiBkZWZhdWx0T3BlbiA/PyBmYWxzZSxcbiAgICBvbkNoYW5nZTogb25PcGVuQ2hhbmdlLFxuICAgIGNhbGxlcjogRElBTE9HX05BTUVcbiAgfSk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgIERpYWxvZ1Byb3ZpZGVyLFxuICAgIHtcbiAgICAgIHNjb3BlOiBfX3Njb3BlRGlhbG9nLFxuICAgICAgdHJpZ2dlclJlZixcbiAgICAgIGNvbnRlbnRSZWYsXG4gICAgICBjb250ZW50SWQ6IHVzZUlkKCksXG4gICAgICB0aXRsZUlkOiB1c2VJZCgpLFxuICAgICAgZGVzY3JpcHRpb25JZDogdXNlSWQoKSxcbiAgICAgIG9wZW4sXG4gICAgICBvbk9wZW5DaGFuZ2U6IHNldE9wZW4sXG4gICAgICBvbk9wZW5Ub2dnbGU6IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHNldE9wZW4oKHByZXZPcGVuKSA9PiAhcHJldk9wZW4pLCBbc2V0T3Blbl0pLFxuICAgICAgbW9kYWwsXG4gICAgICBjaGlsZHJlblxuICAgIH1cbiAgKTtcbn07XG5EaWFsb2cuZGlzcGxheU5hbWUgPSBESUFMT0dfTkFNRTtcbnZhciBUUklHR0VSX05BTUUgPSBcIkRpYWxvZ1RyaWdnZXJcIjtcbnZhciBEaWFsb2dUcmlnZ2VyID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLnRyaWdnZXJQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoVFJJR0dFUl9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBjb21wb3NlZFRyaWdnZXJSZWYgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCBjb250ZXh0LnRyaWdnZXJSZWYpO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgUHJpbWl0aXZlLmJ1dHRvbixcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgXCJhcmlhLWhhc3BvcHVwXCI6IFwiZGlhbG9nXCIsXG4gICAgICAgIFwiYXJpYS1leHBhbmRlZFwiOiBjb250ZXh0Lm9wZW4sXG4gICAgICAgIFwiYXJpYS1jb250cm9sc1wiOiBjb250ZXh0LmNvbnRlbnRJZCxcbiAgICAgICAgXCJkYXRhLXN0YXRlXCI6IGdldFN0YXRlKGNvbnRleHQub3BlbiksXG4gICAgICAgIC4uLnRyaWdnZXJQcm9wcyxcbiAgICAgICAgcmVmOiBjb21wb3NlZFRyaWdnZXJSZWYsXG4gICAgICAgIG9uQ2xpY2s6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uQ2xpY2ssIGNvbnRleHQub25PcGVuVG9nZ2xlKVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG5EaWFsb2dUcmlnZ2VyLmRpc3BsYXlOYW1lID0gVFJJR0dFUl9OQU1FO1xudmFyIFBPUlRBTF9OQU1FID0gXCJEaWFsb2dQb3J0YWxcIjtcbnZhciBbUG9ydGFsUHJvdmlkZXIsIHVzZVBvcnRhbENvbnRleHRdID0gY3JlYXRlRGlhbG9nQ29udGV4dChQT1JUQUxfTkFNRSwge1xuICBmb3JjZU1vdW50OiB2b2lkIDBcbn0pO1xudmFyIERpYWxvZ1BvcnRhbCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIGZvcmNlTW91bnQsIGNoaWxkcmVuLCBjb250YWluZXIgfSA9IHByb3BzO1xuICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChQT1JUQUxfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFBvcnRhbFByb3ZpZGVyLCB7IHNjb3BlOiBfX3Njb3BlRGlhbG9nLCBmb3JjZU1vdW50LCBjaGlsZHJlbjogUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQpID0+IC8qIEBfX1BVUkVfXyAqLyBqc3goUHJlc2VuY2UsIHsgcHJlc2VudDogZm9yY2VNb3VudCB8fCBjb250ZXh0Lm9wZW4sIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4KFBvcnRhbFByaW1pdGl2ZSwgeyBhc0NoaWxkOiB0cnVlLCBjb250YWluZXIsIGNoaWxkcmVuOiBjaGlsZCB9KSB9KSkgfSk7XG59O1xuRGlhbG9nUG9ydGFsLmRpc3BsYXlOYW1lID0gUE9SVEFMX05BTUU7XG52YXIgT1ZFUkxBWV9OQU1FID0gXCJEaWFsb2dPdmVybGF5XCI7XG52YXIgRGlhbG9nT3ZlcmxheSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgcG9ydGFsQ29udGV4dCA9IHVzZVBvcnRhbENvbnRleHQoT1ZFUkxBWV9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCB7IGZvcmNlTW91bnQgPSBwb3J0YWxDb250ZXh0LmZvcmNlTW91bnQsIC4uLm92ZXJsYXlQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoT1ZFUkxBWV9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gY29udGV4dC5tb2RhbCA/IC8qIEBfX1BVUkVfXyAqLyBqc3goUHJlc2VuY2UsIHsgcHJlc2VudDogZm9yY2VNb3VudCB8fCBjb250ZXh0Lm9wZW4sIGNoaWxkcmVuOiAvKiBAX19QVVJFX18gKi8ganN4KERpYWxvZ092ZXJsYXlJbXBsLCB7IC4uLm92ZXJsYXlQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSkgfSkgOiBudWxsO1xuICB9XG4pO1xuRGlhbG9nT3ZlcmxheS5kaXNwbGF5TmFtZSA9IE9WRVJMQVlfTkFNRTtcbnZhciBTbG90ID0gY3JlYXRlU2xvdChcIkRpYWxvZ092ZXJsYXkuUmVtb3ZlU2Nyb2xsXCIpO1xudmFyIERpYWxvZ092ZXJsYXlJbXBsID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IF9fc2NvcGVEaWFsb2csIC4uLm92ZXJsYXlQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoT1ZFUkxBWV9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gKFxuICAgICAgLy8gTWFrZSBzdXJlIGBDb250ZW50YCBpcyBzY3JvbGxhYmxlIGV2ZW4gd2hlbiBpdCBkb2Vzbid0IGxpdmUgaW5zaWRlIGBSZW1vdmVTY3JvbGxgXG4gICAgICAvLyBpZS4gd2hlbiBgT3ZlcmxheWAgYW5kIGBDb250ZW50YCBhcmUgc2libGluZ3NcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goUmVtb3ZlU2Nyb2xsLCB7IGFzOiBTbG90LCBhbGxvd1BpbmNoWm9vbTogdHJ1ZSwgc2hhcmRzOiBbY29udGV4dC5jb250ZW50UmVmXSwgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICAgIFByaW1pdGl2ZS5kaXYsXG4gICAgICAgIHtcbiAgICAgICAgICBcImRhdGEtc3RhdGVcIjogZ2V0U3RhdGUoY29udGV4dC5vcGVuKSxcbiAgICAgICAgICAuLi5vdmVybGF5UHJvcHMsXG4gICAgICAgICAgcmVmOiBmb3J3YXJkZWRSZWYsXG4gICAgICAgICAgc3R5bGU6IHsgcG9pbnRlckV2ZW50czogXCJhdXRvXCIsIC4uLm92ZXJsYXlQcm9wcy5zdHlsZSB9XG4gICAgICAgIH1cbiAgICAgICkgfSlcbiAgICApO1xuICB9XG4pO1xudmFyIENPTlRFTlRfTkFNRSA9IFwiRGlhbG9nQ29udGVudFwiO1xudmFyIERpYWxvZ0NvbnRlbnQgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHBvcnRhbENvbnRleHQgPSB1c2VQb3J0YWxDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgeyBmb3JjZU1vdW50ID0gcG9ydGFsQ29udGV4dC5mb3JjZU1vdW50LCAuLi5jb250ZW50UHJvcHMgfSA9IHByb3BzO1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJlc2VuY2UsIHsgcHJlc2VudDogZm9yY2VNb3VudCB8fCBjb250ZXh0Lm9wZW4sIGNoaWxkcmVuOiBjb250ZXh0Lm1vZGFsID8gLyogQF9fUFVSRV9fICovIGpzeChEaWFsb2dDb250ZW50TW9kYWwsIHsgLi4uY29udGVudFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiB9KSA6IC8qIEBfX1BVUkVfXyAqLyBqc3goRGlhbG9nQ29udGVudE5vbk1vZGFsLCB7IC4uLmNvbnRlbnRQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSkgfSk7XG4gIH1cbik7XG5EaWFsb2dDb250ZW50LmRpc3BsYXlOYW1lID0gQ09OVEVOVF9OQU1FO1xudmFyIERpYWxvZ0NvbnRlbnRNb2RhbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoQ09OVEVOVF9OQU1FLCBwcm9wcy5fX3Njb3BlRGlhbG9nKTtcbiAgICBjb25zdCBjb250ZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIGNvbnRleHQuY29udGVudFJlZiwgY29udGVudFJlZik7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb250ZW50UmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoY29udGVudCkgcmV0dXJuIGhpZGVPdGhlcnMoY29udGVudCk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgRGlhbG9nQ29udGVudEltcGwsXG4gICAgICB7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICByZWY6IGNvbXBvc2VkUmVmcyxcbiAgICAgICAgdHJhcEZvY3VzOiBjb250ZXh0Lm9wZW4sXG4gICAgICAgIGRpc2FibGVPdXRzaWRlUG9pbnRlckV2ZW50czogdHJ1ZSxcbiAgICAgICAgb25DbG9zZUF1dG9Gb2N1czogY29tcG9zZUV2ZW50SGFuZGxlcnMocHJvcHMub25DbG9zZUF1dG9Gb2N1cywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBjb250ZXh0LnRyaWdnZXJSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9uUG9pbnRlckRvd25PdXRzaWRlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vblBvaW50ZXJEb3duT3V0c2lkZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGV2ZW50LmRldGFpbC5vcmlnaW5hbEV2ZW50O1xuICAgICAgICAgIGNvbnN0IGN0cmxMZWZ0Q2xpY2sgPSBvcmlnaW5hbEV2ZW50LmJ1dHRvbiA9PT0gMCAmJiBvcmlnaW5hbEV2ZW50LmN0cmxLZXkgPT09IHRydWU7XG4gICAgICAgICAgY29uc3QgaXNSaWdodENsaWNrID0gb3JpZ2luYWxFdmVudC5idXR0b24gPT09IDIgfHwgY3RybExlZnRDbGljaztcbiAgICAgICAgICBpZiAoaXNSaWdodENsaWNrKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KSxcbiAgICAgICAgb25Gb2N1c091dHNpZGU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKFxuICAgICAgICAgIHByb3BzLm9uRm9jdXNPdXRzaWRlLFxuICAgICAgICAgIChldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICApXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbnZhciBEaWFsb2dDb250ZW50Tm9uTW9kYWwgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VEaWFsb2dDb250ZXh0KENPTlRFTlRfTkFNRSwgcHJvcHMuX19zY29wZURpYWxvZyk7XG4gICAgY29uc3QgaGFzSW50ZXJhY3RlZE91dHNpZGVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICAgIGNvbnN0IGhhc1BvaW50ZXJEb3duT3V0c2lkZVJlZiA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICBEaWFsb2dDb250ZW50SW1wbCxcbiAgICAgIHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIHJlZjogZm9yd2FyZGVkUmVmLFxuICAgICAgICB0cmFwRm9jdXM6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHM6IGZhbHNlLFxuICAgICAgICBvbkNsb3NlQXV0b0ZvY3VzOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICBwcm9wcy5vbkNsb3NlQXV0b0ZvY3VzPy4oZXZlbnQpO1xuICAgICAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgaWYgKCFoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZi5jdXJyZW50KSBjb250ZXh0LnRyaWdnZXJSZWYuY3VycmVudD8uZm9jdXMoKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhhc0ludGVyYWN0ZWRPdXRzaWRlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICBoYXNQb2ludGVyRG93bk91dHNpZGVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBvbkludGVyYWN0T3V0c2lkZTogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgcHJvcHMub25JbnRlcmFjdE91dHNpZGU/LihldmVudCk7XG4gICAgICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICBoYXNJbnRlcmFjdGVkT3V0c2lkZVJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChldmVudC5kZXRhaWwub3JpZ2luYWxFdmVudC50eXBlID09PSBcInBvaW50ZXJkb3duXCIpIHtcbiAgICAgICAgICAgICAgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0SXNUcmlnZ2VyID0gY29udGV4dC50cmlnZ2VyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgICAgICAgaWYgKHRhcmdldElzVHJpZ2dlcikgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAoZXZlbnQuZGV0YWlsLm9yaWdpbmFsRXZlbnQudHlwZSA9PT0gXCJmb2N1c2luXCIgJiYgaGFzUG9pbnRlckRvd25PdXRzaWRlUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbnZhciBEaWFsb2dDb250ZW50SW1wbCA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCB0cmFwRm9jdXMsIG9uT3BlbkF1dG9Gb2N1cywgb25DbG9zZUF1dG9Gb2N1cywgLi4uY29udGVudFByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDT05URU5UX05BTUUsIF9fc2NvcGVEaWFsb2cpO1xuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgY29udGVudFJlZik7XG4gICAgdXNlRm9jdXNHdWFyZHMoKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeHMoRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtcbiAgICAgIC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICAgIEZvY3VzU2NvcGUsXG4gICAgICAgIHtcbiAgICAgICAgICBhc0NoaWxkOiB0cnVlLFxuICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgdHJhcHBlZDogdHJhcEZvY3VzLFxuICAgICAgICAgIG9uTW91bnRBdXRvRm9jdXM6IG9uT3BlbkF1dG9Gb2N1cyxcbiAgICAgICAgICBvblVubW91bnRBdXRvRm9jdXM6IG9uQ2xvc2VBdXRvRm9jdXMsXG4gICAgICAgICAgY2hpbGRyZW46IC8qIEBfX1BVUkVfXyAqLyBqc3goXG4gICAgICAgICAgICBEaXNtaXNzYWJsZUxheWVyLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByb2xlOiBcImRpYWxvZ1wiLFxuICAgICAgICAgICAgICBpZDogY29udGV4dC5jb250ZW50SWQsXG4gICAgICAgICAgICAgIFwiYXJpYS1kZXNjcmliZWRieVwiOiBjb250ZXh0LmRlc2NyaXB0aW9uSWQsXG4gICAgICAgICAgICAgIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IGNvbnRleHQudGl0bGVJZCxcbiAgICAgICAgICAgICAgXCJkYXRhLXN0YXRlXCI6IGdldFN0YXRlKGNvbnRleHQub3BlbiksXG4gICAgICAgICAgICAgIC4uLmNvbnRlbnRQcm9wcyxcbiAgICAgICAgICAgICAgcmVmOiBjb21wb3NlZFJlZnMsXG4gICAgICAgICAgICAgIG9uRGlzbWlzczogKCkgPT4gY29udGV4dC5vbk9wZW5DaGFuZ2UoZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgLyogQF9fUFVSRV9fICovIGpzeHMoRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtcbiAgICAgICAgLyogQF9fUFVSRV9fICovIGpzeChUaXRsZVdhcm5pbmcsIHsgdGl0bGVJZDogY29udGV4dC50aXRsZUlkIH0pLFxuICAgICAgICAvKiBAX19QVVJFX18gKi8ganN4KERlc2NyaXB0aW9uV2FybmluZywgeyBjb250ZW50UmVmLCBkZXNjcmlwdGlvbklkOiBjb250ZXh0LmRlc2NyaXB0aW9uSWQgfSlcbiAgICAgIF0gfSlcbiAgICBdIH0pO1xuICB9XG4pO1xudmFyIFRJVExFX05BTUUgPSBcIkRpYWxvZ1RpdGxlXCI7XG52YXIgRGlhbG9nVGl0bGUgPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4udGl0bGVQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoVElUTEVfTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmgyLCB7IGlkOiBjb250ZXh0LnRpdGxlSWQsIC4uLnRpdGxlUHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pO1xuICB9XG4pO1xuRGlhbG9nVGl0bGUuZGlzcGxheU5hbWUgPSBUSVRMRV9OQU1FO1xudmFyIERFU0NSSVBUSU9OX05BTUUgPSBcIkRpYWxvZ0Rlc2NyaXB0aW9uXCI7XG52YXIgRGlhbG9nRGVzY3JpcHRpb24gPSBSZWFjdC5mb3J3YXJkUmVmKFxuICAocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgX19zY29wZURpYWxvZywgLi4uZGVzY3JpcHRpb25Qcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZURpYWxvZ0NvbnRleHQoREVTQ1JJUFRJT05fTkFNRSwgX19zY29wZURpYWxvZyk7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLnAsIHsgaWQ6IGNvbnRleHQuZGVzY3JpcHRpb25JZCwgLi4uZGVzY3JpcHRpb25Qcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSk7XG4gIH1cbik7XG5EaWFsb2dEZXNjcmlwdGlvbi5kaXNwbGF5TmFtZSA9IERFU0NSSVBUSU9OX05BTUU7XG52YXIgQ0xPU0VfTkFNRSA9IFwiRGlhbG9nQ2xvc2VcIjtcbnZhciBEaWFsb2dDbG9zZSA9IFJlYWN0LmZvcndhcmRSZWYoXG4gIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgY29uc3QgeyBfX3Njb3BlRGlhbG9nLCAuLi5jbG9zZVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlRGlhbG9nQ29udGV4dChDTE9TRV9OQU1FLCBfX3Njb3BlRGlhbG9nKTtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChcbiAgICAgIFByaW1pdGl2ZS5idXR0b24sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgIC4uLmNsb3NlUHJvcHMsXG4gICAgICAgIHJlZjogZm9yd2FyZGVkUmVmLFxuICAgICAgICBvbkNsaWNrOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkNsaWNrLCAoKSA9PiBjb250ZXh0Lm9uT3BlbkNoYW5nZShmYWxzZSkpXG4gICAgICB9XG4gICAgKTtcbiAgfVxuKTtcbkRpYWxvZ0Nsb3NlLmRpc3BsYXlOYW1lID0gQ0xPU0VfTkFNRTtcbmZ1bmN0aW9uIGdldFN0YXRlKG9wZW4pIHtcbiAgcmV0dXJuIG9wZW4gPyBcIm9wZW5cIiA6IFwiY2xvc2VkXCI7XG59XG52YXIgVElUTEVfV0FSTklOR19OQU1FID0gXCJEaWFsb2dUaXRsZVdhcm5pbmdcIjtcbnZhciBbV2FybmluZ1Byb3ZpZGVyLCB1c2VXYXJuaW5nQ29udGV4dF0gPSBjcmVhdGVDb250ZXh0KFRJVExFX1dBUk5JTkdfTkFNRSwge1xuICBjb250ZW50TmFtZTogQ09OVEVOVF9OQU1FLFxuICB0aXRsZU5hbWU6IFRJVExFX05BTUUsXG4gIGRvY3NTbHVnOiBcImRpYWxvZ1wiXG59KTtcbnZhciBUaXRsZVdhcm5pbmcgPSAoeyB0aXRsZUlkIH0pID0+IHtcbiAgY29uc3QgdGl0bGVXYXJuaW5nQ29udGV4dCA9IHVzZVdhcm5pbmdDb250ZXh0KFRJVExFX1dBUk5JTkdfTkFNRSk7XG4gIGNvbnN0IE1FU1NBR0UgPSBgXFxgJHt0aXRsZVdhcm5pbmdDb250ZXh0LmNvbnRlbnROYW1lfVxcYCByZXF1aXJlcyBhIFxcYCR7dGl0bGVXYXJuaW5nQ29udGV4dC50aXRsZU5hbWV9XFxgIGZvciB0aGUgY29tcG9uZW50IHRvIGJlIGFjY2Vzc2libGUgZm9yIHNjcmVlbiByZWFkZXIgdXNlcnMuXG5cbklmIHlvdSB3YW50IHRvIGhpZGUgdGhlIFxcYCR7dGl0bGVXYXJuaW5nQ29udGV4dC50aXRsZU5hbWV9XFxgLCB5b3UgY2FuIHdyYXAgaXQgd2l0aCBvdXIgVmlzdWFsbHlIaWRkZW4gY29tcG9uZW50LlxuXG5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIGh0dHBzOi8vcmFkaXgtdWkuY29tL3ByaW1pdGl2ZXMvZG9jcy9jb21wb25lbnRzLyR7dGl0bGVXYXJuaW5nQ29udGV4dC5kb2NzU2x1Z31gO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0aXRsZUlkKSB7XG4gICAgICBjb25zdCBoYXNUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRpdGxlSWQpO1xuICAgICAgaWYgKCFoYXNUaXRsZSkgY29uc29sZS5lcnJvcihNRVNTQUdFKTtcbiAgICB9XG4gIH0sIFtNRVNTQUdFLCB0aXRsZUlkXSk7XG4gIHJldHVybiBudWxsO1xufTtcbnZhciBERVNDUklQVElPTl9XQVJOSU5HX05BTUUgPSBcIkRpYWxvZ0Rlc2NyaXB0aW9uV2FybmluZ1wiO1xudmFyIERlc2NyaXB0aW9uV2FybmluZyA9ICh7IGNvbnRlbnRSZWYsIGRlc2NyaXB0aW9uSWQgfSkgPT4ge1xuICBjb25zdCBkZXNjcmlwdGlvbldhcm5pbmdDb250ZXh0ID0gdXNlV2FybmluZ0NvbnRleHQoREVTQ1JJUFRJT05fV0FSTklOR19OQU1FKTtcbiAgY29uc3QgTUVTU0FHRSA9IGBXYXJuaW5nOiBNaXNzaW5nIFxcYERlc2NyaXB0aW9uXFxgIG9yIFxcYGFyaWEtZGVzY3JpYmVkYnk9e3VuZGVmaW5lZH1cXGAgZm9yIHske2Rlc2NyaXB0aW9uV2FybmluZ0NvbnRleHQuY29udGVudE5hbWV9fS5gO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGRlc2NyaWJlZEJ5SWQgPSBjb250ZW50UmVmLmN1cnJlbnQ/LmdldEF0dHJpYnV0ZShcImFyaWEtZGVzY3JpYmVkYnlcIik7XG4gICAgaWYgKGRlc2NyaXB0aW9uSWQgJiYgZGVzY3JpYmVkQnlJZCkge1xuICAgICAgY29uc3QgaGFzRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZXNjcmlwdGlvbklkKTtcbiAgICAgIGlmICghaGFzRGVzY3JpcHRpb24pIGNvbnNvbGUud2FybihNRVNTQUdFKTtcbiAgICB9XG4gIH0sIFtNRVNTQUdFLCBjb250ZW50UmVmLCBkZXNjcmlwdGlvbklkXSk7XG4gIHJldHVybiBudWxsO1xufTtcbnZhciBSb290ID0gRGlhbG9nO1xudmFyIFRyaWdnZXIgPSBEaWFsb2dUcmlnZ2VyO1xudmFyIFBvcnRhbCA9IERpYWxvZ1BvcnRhbDtcbnZhciBPdmVybGF5ID0gRGlhbG9nT3ZlcmxheTtcbnZhciBDb250ZW50ID0gRGlhbG9nQ29udGVudDtcbnZhciBUaXRsZSA9IERpYWxvZ1RpdGxlO1xudmFyIERlc2NyaXB0aW9uID0gRGlhbG9nRGVzY3JpcHRpb247XG52YXIgQ2xvc2UgPSBEaWFsb2dDbG9zZTtcbmV4cG9ydCB7XG4gIENsb3NlLFxuICBDb250ZW50LFxuICBEZXNjcmlwdGlvbixcbiAgRGlhbG9nLFxuICBEaWFsb2dDbG9zZSxcbiAgRGlhbG9nQ29udGVudCxcbiAgRGlhbG9nRGVzY3JpcHRpb24sXG4gIERpYWxvZ092ZXJsYXksXG4gIERpYWxvZ1BvcnRhbCxcbiAgRGlhbG9nVGl0bGUsXG4gIERpYWxvZ1RyaWdnZXIsXG4gIE92ZXJsYXksXG4gIFBvcnRhbCxcbiAgUm9vdCxcbiAgVGl0bGUsXG4gIFRyaWdnZXIsXG4gIFdhcm5pbmdQcm92aWRlcixcbiAgY3JlYXRlRGlhbG9nU2NvcGVcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvc2xvdC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZVJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgRnJhZ21lbnQgYXMgRnJhZ21lbnQyLCBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90KG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSk7XG4gIGNvbnN0IFNsb3QyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2hpbGRyZW5BcnJheSA9IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pO1xuICAgIGNvbnN0IHNsb3R0YWJsZSA9IGNoaWxkcmVuQXJyYXkuZmluZChpc1Nsb3R0YWJsZSk7XG4gICAgaWYgKHNsb3R0YWJsZSkge1xuICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHNsb3R0YWJsZS5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gY2hpbGRyZW5BcnJheS5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZCA9PT0gc2xvdHRhYmxlKSB7XG4gICAgICAgICAgaWYgKFJlYWN0LkNoaWxkcmVuLmNvdW50KG5ld0VsZW1lbnQpID4gMSkgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KG5ld0VsZW1lbnQpID8gbmV3RWxlbWVudC5wcm9wcy5jaGlsZHJlbiA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbjogUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBSZWFjdC5jbG9uZUVsZW1lbnQobmV3RWxlbWVudCwgdm9pZCAwLCBuZXdDaGlsZHJlbikgOiBudWxsIH0pO1xuICAgIH1cbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChTbG90Q2xvbmUsIHsgLi4uc2xvdFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiwgY2hpbGRyZW4gfSk7XG4gIH0pO1xuICBTbG90Mi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdGA7XG4gIHJldHVybiBTbG90Mjtcbn1cbnZhciBTbG90ID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3QoXCJTbG90XCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3RDbG9uZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdENsb25lID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgICAgY29uc3QgY2hpbGRyZW5SZWYgPSBnZXRFbGVtZW50UmVmKGNoaWxkcmVuKTtcbiAgICAgIGNvbnN0IHByb3BzMiA9IG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZHJlbi5wcm9wcyk7XG4gICAgICBpZiAoY2hpbGRyZW4udHlwZSAhPT0gUmVhY3QuRnJhZ21lbnQpIHtcbiAgICAgICAgcHJvcHMyLnJlZiA9IGZvcndhcmRlZFJlZiA/IGNvbXBvc2VSZWZzKGZvcndhcmRlZFJlZiwgY2hpbGRyZW5SZWYpIDogY2hpbGRyZW5SZWY7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkcmVuLCBwcm9wczIpO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMSA/IFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCkgOiBudWxsO1xuICB9KTtcbiAgU2xvdENsb25lLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90Q2xvbmVgO1xuICByZXR1cm4gU2xvdENsb25lO1xufVxudmFyIFNMT1RUQUJMRV9JREVOVElGSUVSID0gU3ltYm9sKFwicmFkaXguc2xvdHRhYmxlXCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3R0YWJsZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdHRhYmxlMiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChGcmFnbWVudDIsIHsgY2hpbGRyZW4gfSk7XG4gIH07XG4gIFNsb3R0YWJsZTIuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3R0YWJsZWA7XG4gIFNsb3R0YWJsZTIuX19yYWRpeElkID0gU0xPVFRBQkxFX0lERU5USUZJRVI7XG4gIHJldHVybiBTbG90dGFibGUyO1xufVxudmFyIFNsb3R0YWJsZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90dGFibGUoXCJTbG90dGFibGVcIik7XG5mdW5jdGlvbiBpc1Nsb3R0YWJsZShjaGlsZCkge1xuICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpICYmIHR5cGVvZiBjaGlsZC50eXBlID09PSBcImZ1bmN0aW9uXCIgJiYgXCJfX3JhZGl4SWRcIiBpbiBjaGlsZC50eXBlICYmIGNoaWxkLnR5cGUuX19yYWRpeElkID09PSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbn1cbmZ1bmN0aW9uIG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZFByb3BzKSB7XG4gIGNvbnN0IG92ZXJyaWRlUHJvcHMgPSB7IC4uLmNoaWxkUHJvcHMgfTtcbiAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGlsZFByb3BzKSB7XG4gICAgY29uc3Qgc2xvdFByb3BWYWx1ZSA9IHNsb3RQcm9wc1twcm9wTmFtZV07XG4gICAgY29uc3QgY2hpbGRQcm9wVmFsdWUgPSBjaGlsZFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBpc0hhbmRsZXIgPSAvXm9uW0EtWl0vLnRlc3QocHJvcE5hbWUpO1xuICAgIGlmIChpc0hhbmRsZXIpIHtcbiAgICAgIGlmIChzbG90UHJvcFZhbHVlICYmIGNoaWxkUHJvcFZhbHVlKSB7XG4gICAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBjaGlsZFByb3BWYWx1ZSguLi5hcmdzKTtcbiAgICAgICAgICBzbG90UHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNsb3RQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBzbG90UHJvcFZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSB7IC4uLnNsb3RQcm9wVmFsdWUsIC4uLmNoaWxkUHJvcFZhbHVlIH07XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJjbGFzc05hbWVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBbc2xvdFByb3BWYWx1ZSwgY2hpbGRQcm9wVmFsdWVdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgLi4uc2xvdFByb3BzLCAuLi5vdmVycmlkZVByb3BzIH07XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50UmVmKGVsZW1lbnQpIHtcbiAgbGV0IGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudC5wcm9wcywgXCJyZWZcIik/LmdldDtcbiAgbGV0IG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucmVmO1xuICB9XG4gIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudCwgXCJyZWZcIik/LmdldDtcbiAgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWY7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmIHx8IGVsZW1lbnQucmVmO1xufVxuZXhwb3J0IHtcbiAgU2xvdCBhcyBSb290LFxuICBTbG90LFxuICBTbG90dGFibGUsXG4gIGNyZWF0ZVNsb3QsXG4gIGNyZWF0ZVNsb3R0YWJsZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZGlzbWlzc2FibGUtbGF5ZXIudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNvbXBvc2VFdmVudEhhbmRsZXJzIH0gZnJvbSBcIkByYWRpeC11aS9wcmltaXRpdmVcIjtcbmltcG9ydCB7IFByaW1pdGl2ZSwgZGlzcGF0Y2hEaXNjcmV0ZUN1c3RvbUV2ZW50IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyB1c2VDYWxsYmFja1JlZiB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWNhbGxiYWNrLXJlZlwiO1xuaW1wb3J0IHsgdXNlRXNjYXBlS2V5ZG93biB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWVzY2FwZS1rZXlkb3duXCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBESVNNSVNTQUJMRV9MQVlFUl9OQU1FID0gXCJEaXNtaXNzYWJsZUxheWVyXCI7XG52YXIgQ09OVEVYVF9VUERBVEUgPSBcImRpc21pc3NhYmxlTGF5ZXIudXBkYXRlXCI7XG52YXIgUE9JTlRFUl9ET1dOX09VVFNJREUgPSBcImRpc21pc3NhYmxlTGF5ZXIucG9pbnRlckRvd25PdXRzaWRlXCI7XG52YXIgRk9DVVNfT1VUU0lERSA9IFwiZGlzbWlzc2FibGVMYXllci5mb2N1c091dHNpZGVcIjtcbnZhciBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzO1xudmFyIERpc21pc3NhYmxlTGF5ZXJDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCh7XG4gIGxheWVyczogLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKSxcbiAgbGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQ6IC8qIEBfX1BVUkVfXyAqLyBuZXcgU2V0KCksXG4gIGJyYW5jaGVzOiAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpXG59KTtcbnZhciBEaXNtaXNzYWJsZUxheWVyID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBkaXNhYmxlT3V0c2lkZVBvaW50ZXJFdmVudHMgPSBmYWxzZSxcbiAgICAgIG9uRXNjYXBlS2V5RG93bixcbiAgICAgIG9uUG9pbnRlckRvd25PdXRzaWRlLFxuICAgICAgb25Gb2N1c091dHNpZGUsXG4gICAgICBvbkludGVyYWN0T3V0c2lkZSxcbiAgICAgIG9uRGlzbWlzcyxcbiAgICAgIC4uLmxheWVyUHJvcHNcbiAgICB9ID0gcHJvcHM7XG4gICAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoRGlzbWlzc2FibGVMYXllckNvbnRleHQpO1xuICAgIGNvbnN0IFtub2RlLCBzZXROb2RlXSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IG93bmVyRG9jdW1lbnQgPSBub2RlPy5vd25lckRvY3VtZW50ID8/IGdsb2JhbFRoaXM/LmRvY3VtZW50O1xuICAgIGNvbnN0IFssIGZvcmNlXSA9IFJlYWN0LnVzZVN0YXRlKHt9KTtcbiAgICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCAobm9kZTIpID0+IHNldE5vZGUobm9kZTIpKTtcbiAgICBjb25zdCBsYXllcnMgPSBBcnJheS5mcm9tKGNvbnRleHQubGF5ZXJzKTtcbiAgICBjb25zdCBbaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRdID0gWy4uLmNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRdLnNsaWNlKC0xKTtcbiAgICBjb25zdCBoaWdoZXN0TGF5ZXJXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZEluZGV4ID0gbGF5ZXJzLmluZGV4T2YoaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQpO1xuICAgIGNvbnN0IGluZGV4ID0gbm9kZSA/IGxheWVycy5pbmRleE9mKG5vZGUpIDogLTE7XG4gICAgY29uc3QgaXNCb2R5UG9pbnRlckV2ZW50c0Rpc2FibGVkID0gY29udGV4dC5sYXllcnNXaXRoT3V0c2lkZVBvaW50ZXJFdmVudHNEaXNhYmxlZC5zaXplID4gMDtcbiAgICBjb25zdCBpc1BvaW50ZXJFdmVudHNFbmFibGVkID0gaW5kZXggPj0gaGlnaGVzdExheWVyV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWRJbmRleDtcbiAgICBjb25zdCBwb2ludGVyRG93bk91dHNpZGUgPSB1c2VQb2ludGVyRG93bk91dHNpZGUoKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICBjb25zdCBpc1BvaW50ZXJEb3duT25CcmFuY2ggPSBbLi4uY29udGV4dC5icmFuY2hlc10uc29tZSgoYnJhbmNoKSA9PiBicmFuY2guY29udGFpbnModGFyZ2V0KSk7XG4gICAgICBpZiAoIWlzUG9pbnRlckV2ZW50c0VuYWJsZWQgfHwgaXNQb2ludGVyRG93bk9uQnJhbmNoKSByZXR1cm47XG4gICAgICBvblBvaW50ZXJEb3duT3V0c2lkZT8uKGV2ZW50KTtcbiAgICAgIG9uSW50ZXJhY3RPdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkKSBvbkRpc21pc3M/LigpO1xuICAgIH0sIG93bmVyRG9jdW1lbnQpO1xuICAgIGNvbnN0IGZvY3VzT3V0c2lkZSA9IHVzZUZvY3VzT3V0c2lkZSgoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgIGNvbnN0IGlzRm9jdXNJbkJyYW5jaCA9IFsuLi5jb250ZXh0LmJyYW5jaGVzXS5zb21lKChicmFuY2gpID0+IGJyYW5jaC5jb250YWlucyh0YXJnZXQpKTtcbiAgICAgIGlmIChpc0ZvY3VzSW5CcmFuY2gpIHJldHVybjtcbiAgICAgIG9uRm9jdXNPdXRzaWRlPy4oZXZlbnQpO1xuICAgICAgb25JbnRlcmFjdE91dHNpZGU/LihldmVudCk7XG4gICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIG9uRGlzbWlzcz8uKCk7XG4gICAgfSwgb3duZXJEb2N1bWVudCk7XG4gICAgdXNlRXNjYXBlS2V5ZG93bigoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGlzSGlnaGVzdExheWVyID0gaW5kZXggPT09IGNvbnRleHQubGF5ZXJzLnNpemUgLSAxO1xuICAgICAgaWYgKCFpc0hpZ2hlc3RMYXllcikgcmV0dXJuO1xuICAgICAgb25Fc2NhcGVLZXlEb3duPy4oZXZlbnQpO1xuICAgICAgaWYgKCFldmVudC5kZWZhdWx0UHJldmVudGVkICYmIG9uRGlzbWlzcykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvbkRpc21pc3MoKTtcbiAgICAgIH1cbiAgICB9LCBvd25lckRvY3VtZW50KTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgaWYgKCFub2RlKSByZXR1cm47XG4gICAgICBpZiAoZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzKSB7XG4gICAgICAgIGlmIChjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLnNpemUgPT09IDApIHtcbiAgICAgICAgICBvcmlnaW5hbEJvZHlQb2ludGVyRXZlbnRzID0gb3duZXJEb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHM7XG4gICAgICAgICAgb3duZXJEb2N1bWVudC5ib2R5LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmxheWVyc1dpdGhPdXRzaWRlUG9pbnRlckV2ZW50c0Rpc2FibGVkLmFkZChub2RlKTtcbiAgICAgIH1cbiAgICAgIGNvbnRleHQubGF5ZXJzLmFkZChub2RlKTtcbiAgICAgIGRpc3BhdGNoVXBkYXRlKCk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzICYmIGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuc2l6ZSA9PT0gMSkge1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQuYm9keS5zdHlsZS5wb2ludGVyRXZlbnRzID0gb3JpZ2luYWxCb2R5UG9pbnRlckV2ZW50cztcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LCBbbm9kZSwgb3duZXJEb2N1bWVudCwgZGlzYWJsZU91dHNpZGVQb2ludGVyRXZlbnRzLCBjb250ZXh0XSk7XG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgICAgICBjb250ZXh0LmxheWVycy5kZWxldGUobm9kZSk7XG4gICAgICAgIGNvbnRleHQubGF5ZXJzV2l0aE91dHNpZGVQb2ludGVyRXZlbnRzRGlzYWJsZWQuZGVsZXRlKG5vZGUpO1xuICAgICAgICBkaXNwYXRjaFVwZGF0ZSgpO1xuICAgICAgfTtcbiAgICB9LCBbbm9kZSwgY29udGV4dF0pO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCBoYW5kbGVVcGRhdGUgPSAoKSA9PiBmb3JjZSh7fSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKENPTlRFWFRfVVBEQVRFLCBoYW5kbGVVcGRhdGUpO1xuICAgICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoQ09OVEVYVF9VUERBVEUsIGhhbmRsZVVwZGF0ZSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFxuICAgICAgUHJpbWl0aXZlLmRpdixcbiAgICAgIHtcbiAgICAgICAgLi4ubGF5ZXJQcm9wcyxcbiAgICAgICAgcmVmOiBjb21wb3NlZFJlZnMsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgcG9pbnRlckV2ZW50czogaXNCb2R5UG9pbnRlckV2ZW50c0Rpc2FibGVkID8gaXNQb2ludGVyRXZlbnRzRW5hYmxlZCA/IFwiYXV0b1wiIDogXCJub25lXCIgOiB2b2lkIDAsXG4gICAgICAgICAgLi4ucHJvcHMuc3R5bGVcbiAgICAgICAgfSxcbiAgICAgICAgb25Gb2N1c0NhcHR1cmU6IGNvbXBvc2VFdmVudEhhbmRsZXJzKHByb3BzLm9uRm9jdXNDYXB0dXJlLCBmb2N1c091dHNpZGUub25Gb2N1c0NhcHR1cmUpLFxuICAgICAgICBvbkJsdXJDYXB0dXJlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhwcm9wcy5vbkJsdXJDYXB0dXJlLCBmb2N1c091dHNpZGUub25CbHVyQ2FwdHVyZSksXG4gICAgICAgIG9uUG9pbnRlckRvd25DYXB0dXJlOiBjb21wb3NlRXZlbnRIYW5kbGVycyhcbiAgICAgICAgICBwcm9wcy5vblBvaW50ZXJEb3duQ2FwdHVyZSxcbiAgICAgICAgICBwb2ludGVyRG93bk91dHNpZGUub25Qb2ludGVyRG93bkNhcHR1cmVcbiAgICAgICAgKVxuICAgICAgfVxuICAgICk7XG4gIH1cbik7XG5EaXNtaXNzYWJsZUxheWVyLmRpc3BsYXlOYW1lID0gRElTTUlTU0FCTEVfTEFZRVJfTkFNRTtcbnZhciBCUkFOQ0hfTkFNRSA9IFwiRGlzbWlzc2FibGVMYXllckJyYW5jaFwiO1xudmFyIERpc21pc3NhYmxlTGF5ZXJCcmFuY2ggPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KERpc21pc3NhYmxlTGF5ZXJDb250ZXh0KTtcbiAgY29uc3QgcmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICBjb25zdCBjb21wb3NlZFJlZnMgPSB1c2VDb21wb3NlZFJlZnMoZm9yd2FyZGVkUmVmLCByZWYpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSByZWYuY3VycmVudDtcbiAgICBpZiAobm9kZSkge1xuICAgICAgY29udGV4dC5icmFuY2hlcy5hZGQobm9kZSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb250ZXh0LmJyYW5jaGVzLmRlbGV0ZShub2RlKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbY29udGV4dC5icmFuY2hlc10pO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChQcmltaXRpdmUuZGl2LCB7IC4uLnByb3BzLCByZWY6IGNvbXBvc2VkUmVmcyB9KTtcbn0pO1xuRGlzbWlzc2FibGVMYXllckJyYW5jaC5kaXNwbGF5TmFtZSA9IEJSQU5DSF9OQU1FO1xuZnVuY3Rpb24gdXNlUG9pbnRlckRvd25PdXRzaWRlKG9uUG9pbnRlckRvd25PdXRzaWRlLCBvd25lckRvY3VtZW50ID0gZ2xvYmFsVGhpcz8uZG9jdW1lbnQpIHtcbiAgY29uc3QgaGFuZGxlUG9pbnRlckRvd25PdXRzaWRlID0gdXNlQ2FsbGJhY2tSZWYob25Qb2ludGVyRG93bk91dHNpZGUpO1xuICBjb25zdCBpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBjb25zdCBoYW5kbGVDbGlja1JlZiA9IFJlYWN0LnVzZVJlZigoKSA9PiB7XG4gIH0pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmICFpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCkge1xuICAgICAgICBsZXQgaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBoYW5kbGVBbmREaXNwYXRjaEN1c3RvbUV2ZW50KFxuICAgICAgICAgICAgUE9JTlRFUl9ET1dOX09VVFNJREUsXG4gICAgICAgICAgICBoYW5kbGVQb2ludGVyRG93bk91dHNpZGUsXG4gICAgICAgICAgICBldmVudERldGFpbCxcbiAgICAgICAgICAgIHsgZGlzY3JldGU6IHRydWUgfVxuICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50ID0gaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDI7XG4gICAgICAgIGNvbnN0IGV2ZW50RGV0YWlsID0geyBvcmlnaW5hbEV2ZW50OiBldmVudCB9O1xuICAgICAgICBpZiAoZXZlbnQucG9pbnRlclR5cGUgPT09IFwidG91Y2hcIikge1xuICAgICAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQpO1xuICAgICAgICAgIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQgPSBoYW5kbGVBbmREaXNwYXRjaFBvaW50ZXJEb3duT3V0c2lkZUV2ZW50MjtcbiAgICAgICAgICBvd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGlja1JlZi5jdXJyZW50LCB7IG9uY2U6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGFuZGxlQW5kRGlzcGF0Y2hQb2ludGVyRG93bk91dHNpZGVFdmVudDIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2tSZWYuY3VycmVudCk7XG4gICAgICB9XG4gICAgICBpc1BvaW50ZXJJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgIH07XG4gICAgY29uc3QgdGltZXJJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIGhhbmRsZVBvaW50ZXJEb3duKTtcbiAgICAgIG93bmVyRG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrUmVmLmN1cnJlbnQpO1xuICAgIH07XG4gIH0sIFtvd25lckRvY3VtZW50LCBoYW5kbGVQb2ludGVyRG93bk91dHNpZGVdKTtcbiAgcmV0dXJuIHtcbiAgICAvLyBlbnN1cmVzIHdlIGNoZWNrIFJlYWN0IGNvbXBvbmVudCB0cmVlIChub3QganVzdCBET00gdHJlZSlcbiAgICBvblBvaW50ZXJEb3duQ2FwdHVyZTogKCkgPT4gaXNQb2ludGVySW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQgPSB0cnVlXG4gIH07XG59XG5mdW5jdGlvbiB1c2VGb2N1c091dHNpZGUob25Gb2N1c091dHNpZGUsIG93bmVyRG9jdW1lbnQgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCkge1xuICBjb25zdCBoYW5kbGVGb2N1c091dHNpZGUgPSB1c2VDYWxsYmFja1JlZihvbkZvY3VzT3V0c2lkZSk7XG4gIGNvbnN0IGlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYgPSBSZWFjdC51c2VSZWYoZmFsc2UpO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUZvY3VzID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmICFpc0ZvY3VzSW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnREZXRhaWwgPSB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH07XG4gICAgICAgIGhhbmRsZUFuZERpc3BhdGNoQ3VzdG9tRXZlbnQoRk9DVVNfT1VUU0lERSwgaGFuZGxlRm9jdXNPdXRzaWRlLCBldmVudERldGFpbCwge1xuICAgICAgICAgIGRpc2NyZXRlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG93bmVyRG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzaW5cIiwgaGFuZGxlRm9jdXMpO1xuICAgIHJldHVybiAoKSA9PiBvd25lckRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzKTtcbiAgfSwgW293bmVyRG9jdW1lbnQsIGhhbmRsZUZvY3VzT3V0c2lkZV0pO1xuICByZXR1cm4ge1xuICAgIG9uRm9jdXNDYXB0dXJlOiAoKSA9PiBpc0ZvY3VzSW5zaWRlUmVhY3RUcmVlUmVmLmN1cnJlbnQgPSB0cnVlLFxuICAgIG9uQmx1ckNhcHR1cmU6ICgpID0+IGlzRm9jdXNJbnNpZGVSZWFjdFRyZWVSZWYuY3VycmVudCA9IGZhbHNlXG4gIH07XG59XG5mdW5jdGlvbiBkaXNwYXRjaFVwZGF0ZSgpIHtcbiAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoQ09OVEVYVF9VUERBVEUpO1xuICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cbmZ1bmN0aW9uIGhhbmRsZUFuZERpc3BhdGNoQ3VzdG9tRXZlbnQobmFtZSwgaGFuZGxlciwgZGV0YWlsLCB7IGRpc2NyZXRlIH0pIHtcbiAgY29uc3QgdGFyZ2V0ID0gZGV0YWlsLm9yaWdpbmFsRXZlbnQudGFyZ2V0O1xuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiB0cnVlLCBkZXRhaWwgfSk7XG4gIGlmIChoYW5kbGVyKSB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyLCB7IG9uY2U6IHRydWUgfSk7XG4gIGlmIChkaXNjcmV0ZSkge1xuICAgIGRpc3BhdGNoRGlzY3JldGVDdXN0b21FdmVudCh0YXJnZXQsIGV2ZW50KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cbn1cbnZhciBSb290ID0gRGlzbWlzc2FibGVMYXllcjtcbnZhciBCcmFuY2ggPSBEaXNtaXNzYWJsZUxheWVyQnJhbmNoO1xuZXhwb3J0IHtcbiAgQnJhbmNoLFxuICBEaXNtaXNzYWJsZUxheWVyLFxuICBEaXNtaXNzYWJsZUxheWVyQnJhbmNoLFxuICBSb290XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9mb2N1cy1ndWFyZHMudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbnZhciBjb3VudCA9IDA7XG5mdW5jdGlvbiBGb2N1c0d1YXJkcyhwcm9wcykge1xuICB1c2VGb2N1c0d1YXJkcygpO1xuICByZXR1cm4gcHJvcHMuY2hpbGRyZW47XG59XG5mdW5jdGlvbiB1c2VGb2N1c0d1YXJkcygpIHtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlZGdlR3VhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXJhZGl4LWZvY3VzLWd1YXJkXVwiKTtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgZWRnZUd1YXJkc1swXSA/PyBjcmVhdGVGb2N1c0d1YXJkKCkpO1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGVkZ2VHdWFyZHNbMV0gPz8gY3JlYXRlRm9jdXNHdWFyZCgpKTtcbiAgICBjb3VudCsrO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoY291bnQgPT09IDEpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXJhZGl4LWZvY3VzLWd1YXJkXVwiKS5mb3JFYWNoKChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcbiAgICAgIH1cbiAgICAgIGNvdW50LS07XG4gICAgfTtcbiAgfSwgW10pO1xufVxuZnVuY3Rpb24gY3JlYXRlRm9jdXNHdWFyZCgpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtcmFkaXgtZm9jdXMtZ3VhcmRcIiwgXCJcIik7XG4gIGVsZW1lbnQudGFiSW5kZXggPSAwO1xuICBlbGVtZW50LnN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIjtcbiAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydCB7XG4gIEZvY3VzR3VhcmRzLFxuICBGb2N1c0d1YXJkcyBhcyBSb290LFxuICB1c2VGb2N1c0d1YXJkc1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvZm9jdXMtc2NvcGUudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXByaW1pdGl2ZVwiO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2tSZWYgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1jYWxsYmFjay1yZWZcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIEFVVE9GT0NVU19PTl9NT1VOVCA9IFwiZm9jdXNTY29wZS5hdXRvRm9jdXNPbk1vdW50XCI7XG52YXIgQVVUT0ZPQ1VTX09OX1VOTU9VTlQgPSBcImZvY3VzU2NvcGUuYXV0b0ZvY3VzT25Vbm1vdW50XCI7XG52YXIgRVZFTlRfT1BUSU9OUyA9IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IHRydWUgfTtcbnZhciBGT0NVU19TQ09QRV9OQU1FID0gXCJGb2N1c1Njb3BlXCI7XG52YXIgRm9jdXNTY29wZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgY29uc3Qge1xuICAgIGxvb3AgPSBmYWxzZSxcbiAgICB0cmFwcGVkID0gZmFsc2UsXG4gICAgb25Nb3VudEF1dG9Gb2N1czogb25Nb3VudEF1dG9Gb2N1c1Byb3AsXG4gICAgb25Vbm1vdW50QXV0b0ZvY3VzOiBvblVubW91bnRBdXRvRm9jdXNQcm9wLFxuICAgIC4uLnNjb3BlUHJvcHNcbiAgfSA9IHByb3BzO1xuICBjb25zdCBbY29udGFpbmVyLCBzZXRDb250YWluZXJdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IG9uTW91bnRBdXRvRm9jdXMgPSB1c2VDYWxsYmFja1JlZihvbk1vdW50QXV0b0ZvY3VzUHJvcCk7XG4gIGNvbnN0IG9uVW5tb3VudEF1dG9Gb2N1cyA9IHVzZUNhbGxiYWNrUmVmKG9uVW5tb3VudEF1dG9Gb2N1c1Byb3ApO1xuICBjb25zdCBsYXN0Rm9jdXNlZEVsZW1lbnRSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIChub2RlKSA9PiBzZXRDb250YWluZXIobm9kZSkpO1xuICBjb25zdCBmb2N1c1Njb3BlID0gUmVhY3QudXNlUmVmKHtcbiAgICBwYXVzZWQ6IGZhbHNlLFxuICAgIHBhdXNlKCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgcmVzdW1lKCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB9XG4gIH0pLmN1cnJlbnQ7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRyYXBwZWQpIHtcbiAgICAgIGxldCBoYW5kbGVGb2N1c0luMiA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChmb2N1c1Njb3BlLnBhdXNlZCB8fCAhY29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgbGFzdEZvY3VzZWRFbGVtZW50UmVmLmN1cnJlbnQgPSB0YXJnZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9jdXMobGFzdEZvY3VzZWRFbGVtZW50UmVmLmN1cnJlbnQsIHsgc2VsZWN0OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9LCBoYW5kbGVGb2N1c091dDIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZm9jdXNTY29wZS5wYXVzZWQgfHwgIWNvbnRhaW5lcikgcmV0dXJuO1xuICAgICAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0gZXZlbnQucmVsYXRlZFRhcmdldDtcbiAgICAgICAgaWYgKHJlbGF0ZWRUYXJnZXQgPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgaWYgKCFjb250YWluZXIuY29udGFpbnMocmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICBmb2N1cyhsYXN0Rm9jdXNlZEVsZW1lbnRSZWYuY3VycmVudCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sIGhhbmRsZU11dGF0aW9uczIgPSBmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgIT09IGRvY3VtZW50LmJvZHkpIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgICBpZiAobXV0YXRpb24ucmVtb3ZlZE5vZGVzLmxlbmd0aCA+IDApIGZvY3VzKGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgaGFuZGxlRm9jdXNJbiA9IGhhbmRsZUZvY3VzSW4yLCBoYW5kbGVGb2N1c091dCA9IGhhbmRsZUZvY3VzT3V0MiwgaGFuZGxlTXV0YXRpb25zID0gaGFuZGxlTXV0YXRpb25zMjtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c2luXCIsIGhhbmRsZUZvY3VzSW4yKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBoYW5kbGVGb2N1c091dDIpO1xuICAgICAgY29uc3QgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGhhbmRsZU11dGF0aW9uczIpO1xuICAgICAgaWYgKGNvbnRhaW5lcikgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGNvbnRhaW5lciwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNpblwiLCBoYW5kbGVGb2N1c0luMik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBoYW5kbGVGb2N1c091dDIpO1xuICAgICAgICBtdXRhdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbdHJhcHBlZCwgY29udGFpbmVyLCBmb2N1c1Njb3BlLnBhdXNlZF0pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgIGZvY3VzU2NvcGVzU3RhY2suYWRkKGZvY3VzU2NvcGUpO1xuICAgICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IGhhc0ZvY3VzZWRDYW5kaWRhdGUgPSBjb250YWluZXIuY29udGFpbnMocHJldmlvdXNseUZvY3VzZWRFbGVtZW50KTtcbiAgICAgIGlmICghaGFzRm9jdXNlZENhbmRpZGF0ZSkge1xuICAgICAgICBjb25zdCBtb3VudEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KEFVVE9GT0NVU19PTl9NT1VOVCwgRVZFTlRfT1BUSU9OUyk7XG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKEFVVE9GT0NVU19PTl9NT1VOVCwgb25Nb3VudEF1dG9Gb2N1cyk7XG4gICAgICAgIGNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KG1vdW50RXZlbnQpO1xuICAgICAgICBpZiAoIW1vdW50RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgIGZvY3VzRmlyc3QocmVtb3ZlTGlua3MoZ2V0VGFiYmFibGVDYW5kaWRhdGVzKGNvbnRhaW5lcikpLCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gcHJldmlvdXNseUZvY3VzZWRFbGVtZW50KSB7XG4gICAgICAgICAgICBmb2N1cyhjb250YWluZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX01PVU5ULCBvbk1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdW5tb3VudEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KEFVVE9GT0NVU19PTl9VTk1PVU5ULCBFVkVOVF9PUFRJT05TKTtcbiAgICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihBVVRPRk9DVVNfT05fVU5NT1VOVCwgb25Vbm1vdW50QXV0b0ZvY3VzKTtcbiAgICAgICAgICBjb250YWluZXIuZGlzcGF0Y2hFdmVudCh1bm1vdW50RXZlbnQpO1xuICAgICAgICAgIGlmICghdW5tb3VudEV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgIGZvY3VzKHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA/PyBkb2N1bWVudC5ib2R5LCB7IHNlbGVjdDogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQVVUT0ZPQ1VTX09OX1VOTU9VTlQsIG9uVW5tb3VudEF1dG9Gb2N1cyk7XG4gICAgICAgICAgZm9jdXNTY29wZXNTdGFjay5yZW1vdmUoZm9jdXNTY29wZSk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfTtcbiAgICB9XG4gIH0sIFtjb250YWluZXIsIG9uTW91bnRBdXRvRm9jdXMsIG9uVW5tb3VudEF1dG9Gb2N1cywgZm9jdXNTY29wZV0pO1xuICBjb25zdCBoYW5kbGVLZXlEb3duID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWxvb3AgJiYgIXRyYXBwZWQpIHJldHVybjtcbiAgICAgIGlmIChmb2N1c1Njb3BlLnBhdXNlZCkgcmV0dXJuO1xuICAgICAgY29uc3QgaXNUYWJLZXkgPSBldmVudC5rZXkgPT09IFwiVGFiXCIgJiYgIWV2ZW50LmFsdEtleSAmJiAhZXZlbnQuY3RybEtleSAmJiAhZXZlbnQubWV0YUtleTtcbiAgICAgIGNvbnN0IGZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGlmIChpc1RhYktleSAmJiBmb2N1c2VkRWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIyID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgY29uc3QgW2ZpcnN0LCBsYXN0XSA9IGdldFRhYmJhYmxlRWRnZXMoY29udGFpbmVyMik7XG4gICAgICAgIGNvbnN0IGhhc1RhYmJhYmxlRWxlbWVudHNJbnNpZGUgPSBmaXJzdCAmJiBsYXN0O1xuICAgICAgICBpZiAoIWhhc1RhYmJhYmxlRWxlbWVudHNJbnNpZGUpIHtcbiAgICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGNvbnRhaW5lcjIpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkRWxlbWVudCA9PT0gbGFzdCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChsb29wKSBmb2N1cyhmaXJzdCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkRWxlbWVudCA9PT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAobG9vcCkgZm9jdXMobGFzdCwgeyBzZWxlY3Q6IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbbG9vcCwgdHJhcHBlZCwgZm9jdXNTY29wZS5wYXVzZWRdXG4gICk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFByaW1pdGl2ZS5kaXYsIHsgdGFiSW5kZXg6IC0xLCAuLi5zY29wZVByb3BzLCByZWY6IGNvbXBvc2VkUmVmcywgb25LZXlEb3duOiBoYW5kbGVLZXlEb3duIH0pO1xufSk7XG5Gb2N1c1Njb3BlLmRpc3BsYXlOYW1lID0gRk9DVVNfU0NPUEVfTkFNRTtcbmZ1bmN0aW9uIGZvY3VzRmlyc3QoY2FuZGlkYXRlcywgeyBzZWxlY3QgPSBmYWxzZSB9ID0ge30pIHtcbiAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgY2FuZGlkYXRlcykge1xuICAgIGZvY3VzKGNhbmRpZGF0ZSwgeyBzZWxlY3QgfSk7XG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCkgcmV0dXJuO1xuICB9XG59XG5mdW5jdGlvbiBnZXRUYWJiYWJsZUVkZ2VzKGNvbnRhaW5lcikge1xuICBjb25zdCBjYW5kaWRhdGVzID0gZ2V0VGFiYmFibGVDYW5kaWRhdGVzKGNvbnRhaW5lcik7XG4gIGNvbnN0IGZpcnN0ID0gZmluZFZpc2libGUoY2FuZGlkYXRlcywgY29udGFpbmVyKTtcbiAgY29uc3QgbGFzdCA9IGZpbmRWaXNpYmxlKGNhbmRpZGF0ZXMucmV2ZXJzZSgpLCBjb250YWluZXIpO1xuICByZXR1cm4gW2ZpcnN0LCBsYXN0XTtcbn1cbmZ1bmN0aW9uIGdldFRhYmJhYmxlQ2FuZGlkYXRlcyhjb250YWluZXIpIHtcbiAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihjb250YWluZXIsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCB7XG4gICAgYWNjZXB0Tm9kZTogKG5vZGUpID0+IHtcbiAgICAgIGNvbnN0IGlzSGlkZGVuSW5wdXQgPSBub2RlLnRhZ05hbWUgPT09IFwiSU5QVVRcIiAmJiBub2RlLnR5cGUgPT09IFwiaGlkZGVuXCI7XG4gICAgICBpZiAobm9kZS5kaXNhYmxlZCB8fCBub2RlLmhpZGRlbiB8fCBpc0hpZGRlbklucHV0KSByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfU0tJUDtcbiAgICAgIHJldHVybiBub2RlLnRhYkluZGV4ID49IDAgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9TS0lQO1xuICAgIH1cbiAgfSk7XG4gIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkgbm9kZXMucHVzaCh3YWxrZXIuY3VycmVudE5vZGUpO1xuICByZXR1cm4gbm9kZXM7XG59XG5mdW5jdGlvbiBmaW5kVmlzaWJsZShlbGVtZW50cywgY29udGFpbmVyKSB7XG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgIGlmICghaXNIaWRkZW4oZWxlbWVudCwgeyB1cFRvOiBjb250YWluZXIgfSkpIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5mdW5jdGlvbiBpc0hpZGRlbihub2RlLCB7IHVwVG8gfSkge1xuICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS52aXNpYmlsaXR5ID09PSBcImhpZGRlblwiKSByZXR1cm4gdHJ1ZTtcbiAgd2hpbGUgKG5vZGUpIHtcbiAgICBpZiAodXBUbyAhPT0gdm9pZCAwICYmIG5vZGUgPT09IHVwVG8pIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5kaXNwbGF5ID09PSBcIm5vbmVcIikgcmV0dXJuIHRydWU7XG4gICAgbm9kZSA9IG5vZGUucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc1NlbGVjdGFibGVJbnB1dChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBcInNlbGVjdFwiIGluIGVsZW1lbnQ7XG59XG5mdW5jdGlvbiBmb2N1cyhlbGVtZW50LCB7IHNlbGVjdCA9IGZhbHNlIH0gPSB7fSkge1xuICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LmZvY3VzKSB7XG4gICAgY29uc3QgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBlbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICBpZiAoZWxlbWVudCAhPT0gcHJldmlvdXNseUZvY3VzZWRFbGVtZW50ICYmIGlzU2VsZWN0YWJsZUlucHV0KGVsZW1lbnQpICYmIHNlbGVjdClcbiAgICAgIGVsZW1lbnQuc2VsZWN0KCk7XG4gIH1cbn1cbnZhciBmb2N1c1Njb3Blc1N0YWNrID0gY3JlYXRlRm9jdXNTY29wZXNTdGFjaygpO1xuZnVuY3Rpb24gY3JlYXRlRm9jdXNTY29wZXNTdGFjaygpIHtcbiAgbGV0IHN0YWNrID0gW107XG4gIHJldHVybiB7XG4gICAgYWRkKGZvY3VzU2NvcGUpIHtcbiAgICAgIGNvbnN0IGFjdGl2ZUZvY3VzU2NvcGUgPSBzdGFja1swXTtcbiAgICAgIGlmIChmb2N1c1Njb3BlICE9PSBhY3RpdmVGb2N1c1Njb3BlKSB7XG4gICAgICAgIGFjdGl2ZUZvY3VzU2NvcGU/LnBhdXNlKCk7XG4gICAgICB9XG4gICAgICBzdGFjayA9IGFycmF5UmVtb3ZlKHN0YWNrLCBmb2N1c1Njb3BlKTtcbiAgICAgIHN0YWNrLnVuc2hpZnQoZm9jdXNTY29wZSk7XG4gICAgfSxcbiAgICByZW1vdmUoZm9jdXNTY29wZSkge1xuICAgICAgc3RhY2sgPSBhcnJheVJlbW92ZShzdGFjaywgZm9jdXNTY29wZSk7XG4gICAgICBzdGFja1swXT8ucmVzdW1lKCk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gYXJyYXlSZW1vdmUoYXJyYXksIGl0ZW0pIHtcbiAgY29uc3QgdXBkYXRlZEFycmF5ID0gWy4uLmFycmF5XTtcbiAgY29uc3QgaW5kZXggPSB1cGRhdGVkQXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHVwZGF0ZWRBcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB1cGRhdGVkQXJyYXk7XG59XG5mdW5jdGlvbiByZW1vdmVMaW5rcyhpdGVtcykge1xuICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRhZ05hbWUgIT09IFwiQVwiKTtcbn1cbnZhciBSb290ID0gRm9jdXNTY29wZTtcbmV4cG9ydCB7XG4gIEZvY3VzU2NvcGUsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC9pZC9zcmMvaWQudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbnZhciB1c2VSZWFjdElkID0gUmVhY3RbXCIgdXNlSWQgXCIudHJpbSgpLnRvU3RyaW5nKCldIHx8ICgoKSA9PiB2b2lkIDApO1xudmFyIGNvdW50ID0gMDtcbmZ1bmN0aW9uIHVzZUlkKGRldGVybWluaXN0aWNJZCkge1xuICBjb25zdCBbaWQsIHNldElkXSA9IFJlYWN0LnVzZVN0YXRlKHVzZVJlYWN0SWQoKSk7XG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFkZXRlcm1pbmlzdGljSWQpIHNldElkKChyZWFjdElkKSA9PiByZWFjdElkID8/IFN0cmluZyhjb3VudCsrKSk7XG4gIH0sIFtkZXRlcm1pbmlzdGljSWRdKTtcbiAgcmV0dXJuIGRldGVybWluaXN0aWNJZCB8fCAoaWQgPyBgcmFkaXgtJHtpZH1gIDogXCJcIik7XG59XG5leHBvcnQge1xuICB1c2VJZFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIlwidXNlIGNsaWVudFwiO1xuXG4vLyBzcmMvcG9ydGFsLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1wcmltaXRpdmVcIjtcbmltcG9ydCB7IHVzZUxheW91dEVmZmVjdCB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtdXNlLWxheW91dC1lZmZlY3RcIjtcbmltcG9ydCB7IGpzeCB9IGZyb20gXCJyZWFjdC9qc3gtcnVudGltZVwiO1xudmFyIFBPUlRBTF9OQU1FID0gXCJQb3J0YWxcIjtcbnZhciBQb3J0YWwgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gIGNvbnN0IHsgY29udGFpbmVyOiBjb250YWluZXJQcm9wLCAuLi5wb3J0YWxQcm9wcyB9ID0gcHJvcHM7XG4gIGNvbnN0IFttb3VudGVkLCBzZXRNb3VudGVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHNldE1vdW50ZWQodHJ1ZSksIFtdKTtcbiAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyUHJvcCB8fCBtb3VudGVkICYmIGdsb2JhbFRoaXM/LmRvY3VtZW50Py5ib2R5O1xuICByZXR1cm4gY29udGFpbmVyID8gUmVhY3RET00uY3JlYXRlUG9ydGFsKC8qIEBfX1BVUkVfXyAqLyBqc3goUHJpbWl0aXZlLmRpdiwgeyAuLi5wb3J0YWxQcm9wcywgcmVmOiBmb3J3YXJkZWRSZWYgfSksIGNvbnRhaW5lcikgOiBudWxsO1xufSk7XG5Qb3J0YWwuZGlzcGxheU5hbWUgPSBQT1JUQUxfTkFNRTtcbnZhciBSb290ID0gUG9ydGFsO1xuZXhwb3J0IHtcbiAgUG9ydGFsLFxuICBSb290XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiXCJ1c2UgY2xpZW50XCI7XG5cbi8vIHNyYy9wcmVzZW5jZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0MiBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNvbXBvc2VkUmVmcyB9IGZyb20gXCJAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzXCI7XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG5cbi8vIHNyYy91c2Utc3RhdGUtbWFjaGluZS50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuZnVuY3Rpb24gdXNlU3RhdGVNYWNoaW5lKGluaXRpYWxTdGF0ZSwgbWFjaGluZSkge1xuICByZXR1cm4gUmVhY3QudXNlUmVkdWNlcigoc3RhdGUsIGV2ZW50KSA9PiB7XG4gICAgY29uc3QgbmV4dFN0YXRlID0gbWFjaGluZVtzdGF0ZV1bZXZlbnRdO1xuICAgIHJldHVybiBuZXh0U3RhdGUgPz8gc3RhdGU7XG4gIH0sIGluaXRpYWxTdGF0ZSk7XG59XG5cbi8vIHNyYy9wcmVzZW5jZS50c3hcbnZhciBQcmVzZW5jZSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHByZXNlbnQsIGNoaWxkcmVuIH0gPSBwcm9wcztcbiAgY29uc3QgcHJlc2VuY2UgPSB1c2VQcmVzZW5jZShwcmVzZW50KTtcbiAgY29uc3QgY2hpbGQgPSB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IGNoaWxkcmVuKHsgcHJlc2VudDogcHJlc2VuY2UuaXNQcmVzZW50IH0pIDogUmVhY3QyLkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuICBjb25zdCByZWYgPSB1c2VDb21wb3NlZFJlZnMocHJlc2VuY2UucmVmLCBnZXRFbGVtZW50UmVmKGNoaWxkKSk7XG4gIGNvbnN0IGZvcmNlTW91bnQgPSB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIjtcbiAgcmV0dXJuIGZvcmNlTW91bnQgfHwgcHJlc2VuY2UuaXNQcmVzZW50ID8gUmVhY3QyLmNsb25lRWxlbWVudChjaGlsZCwgeyByZWYgfSkgOiBudWxsO1xufTtcblByZXNlbmNlLmRpc3BsYXlOYW1lID0gXCJQcmVzZW5jZVwiO1xuZnVuY3Rpb24gdXNlUHJlc2VuY2UocHJlc2VudCkge1xuICBjb25zdCBbbm9kZSwgc2V0Tm9kZV0gPSBSZWFjdDIudXNlU3RhdGUoKTtcbiAgY29uc3Qgc3R5bGVzUmVmID0gUmVhY3QyLnVzZVJlZihudWxsKTtcbiAgY29uc3QgcHJldlByZXNlbnRSZWYgPSBSZWFjdDIudXNlUmVmKHByZXNlbnQpO1xuICBjb25zdCBwcmV2QW5pbWF0aW9uTmFtZVJlZiA9IFJlYWN0Mi51c2VSZWYoXCJub25lXCIpO1xuICBjb25zdCBpbml0aWFsU3RhdGUgPSBwcmVzZW50ID8gXCJtb3VudGVkXCIgOiBcInVubW91bnRlZFwiO1xuICBjb25zdCBbc3RhdGUsIHNlbmRdID0gdXNlU3RhdGVNYWNoaW5lKGluaXRpYWxTdGF0ZSwge1xuICAgIG1vdW50ZWQ6IHtcbiAgICAgIFVOTU9VTlQ6IFwidW5tb3VudGVkXCIsXG4gICAgICBBTklNQVRJT05fT1VUOiBcInVubW91bnRTdXNwZW5kZWRcIlxuICAgIH0sXG4gICAgdW5tb3VudFN1c3BlbmRlZDoge1xuICAgICAgTU9VTlQ6IFwibW91bnRlZFwiLFxuICAgICAgQU5JTUFUSU9OX0VORDogXCJ1bm1vdW50ZWRcIlxuICAgIH0sXG4gICAgdW5tb3VudGVkOiB7XG4gICAgICBNT1VOVDogXCJtb3VudGVkXCJcbiAgICB9XG4gIH0pO1xuICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uTmFtZSA9IGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzUmVmLmN1cnJlbnQpO1xuICAgIHByZXZBbmltYXRpb25OYW1lUmVmLmN1cnJlbnQgPSBzdGF0ZSA9PT0gXCJtb3VudGVkXCIgPyBjdXJyZW50QW5pbWF0aW9uTmFtZSA6IFwibm9uZVwiO1xuICB9LCBbc3RhdGVdKTtcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzdHlsZXMgPSBzdHlsZXNSZWYuY3VycmVudDtcbiAgICBjb25zdCB3YXNQcmVzZW50ID0gcHJldlByZXNlbnRSZWYuY3VycmVudDtcbiAgICBjb25zdCBoYXNQcmVzZW50Q2hhbmdlZCA9IHdhc1ByZXNlbnQgIT09IHByZXNlbnQ7XG4gICAgaWYgKGhhc1ByZXNlbnRDaGFuZ2VkKSB7XG4gICAgICBjb25zdCBwcmV2QW5pbWF0aW9uTmFtZSA9IHByZXZBbmltYXRpb25OYW1lUmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uTmFtZSA9IGdldEFuaW1hdGlvbk5hbWUoc3R5bGVzKTtcbiAgICAgIGlmIChwcmVzZW50KSB7XG4gICAgICAgIHNlbmQoXCJNT1VOVFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEFuaW1hdGlvbk5hbWUgPT09IFwibm9uZVwiIHx8IHN0eWxlcz8uZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgc2VuZChcIlVOTU9VTlRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpc0FuaW1hdGluZyA9IHByZXZBbmltYXRpb25OYW1lICE9PSBjdXJyZW50QW5pbWF0aW9uTmFtZTtcbiAgICAgICAgaWYgKHdhc1ByZXNlbnQgJiYgaXNBbmltYXRpbmcpIHtcbiAgICAgICAgICBzZW5kKFwiQU5JTUFUSU9OX09VVFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZW5kKFwiVU5NT1VOVFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcHJldlByZXNlbnRSZWYuY3VycmVudCA9IHByZXNlbnQ7XG4gICAgfVxuICB9LCBbcHJlc2VudCwgc2VuZF0pO1xuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChub2RlKSB7XG4gICAgICBsZXQgdGltZW91dElkO1xuICAgICAgY29uc3Qgb3duZXJXaW5kb3cgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgPz8gd2luZG93O1xuICAgICAgY29uc3QgaGFuZGxlQW5pbWF0aW9uRW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBbmltYXRpb25OYW1lID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXNSZWYuY3VycmVudCk7XG4gICAgICAgIGNvbnN0IGlzQ3VycmVudEFuaW1hdGlvbiA9IGN1cnJlbnRBbmltYXRpb25OYW1lLmluY2x1ZGVzKENTUy5lc2NhcGUoZXZlbnQuYW5pbWF0aW9uTmFtZSkpO1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBub2RlICYmIGlzQ3VycmVudEFuaW1hdGlvbikge1xuICAgICAgICAgIHNlbmQoXCJBTklNQVRJT05fRU5EXCIpO1xuICAgICAgICAgIGlmICghcHJldlByZXNlbnRSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEZpbGxNb2RlID0gbm9kZS5zdHlsZS5hbmltYXRpb25GaWxsTW9kZTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGUgPSBcImZvcndhcmRzXCI7XG4gICAgICAgICAgICB0aW1lb3V0SWQgPSBvd25lcldpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGUgPT09IFwiZm9yd2FyZHNcIikge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uRmlsbE1vZGUgPSBjdXJyZW50RmlsbE1vZGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IGhhbmRsZUFuaW1hdGlvblN0YXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IG5vZGUpIHtcbiAgICAgICAgICBwcmV2QW5pbWF0aW9uTmFtZVJlZi5jdXJyZW50ID0gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXNSZWYuY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25zdGFydFwiLCBoYW5kbGVBbmltYXRpb25TdGFydCk7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25jYW5jZWxcIiwgaGFuZGxlQW5pbWF0aW9uRW5kKTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgb3duZXJXaW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbnN0YXJ0XCIsIGhhbmRsZUFuaW1hdGlvblN0YXJ0KTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uY2FuY2VsXCIsIGhhbmRsZUFuaW1hdGlvbkVuZCk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBoYW5kbGVBbmltYXRpb25FbmQpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VuZChcIkFOSU1BVElPTl9FTkRcIik7XG4gICAgfVxuICB9LCBbbm9kZSwgc2VuZF0pO1xuICByZXR1cm4ge1xuICAgIGlzUHJlc2VudDogW1wibW91bnRlZFwiLCBcInVubW91bnRTdXNwZW5kZWRcIl0uaW5jbHVkZXMoc3RhdGUpLFxuICAgIHJlZjogUmVhY3QyLnVzZUNhbGxiYWNrKChub2RlMikgPT4ge1xuICAgICAgc3R5bGVzUmVmLmN1cnJlbnQgPSBub2RlMiA/IGdldENvbXB1dGVkU3R5bGUobm9kZTIpIDogbnVsbDtcbiAgICAgIHNldE5vZGUobm9kZTIpO1xuICAgIH0sIFtdKVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0QW5pbWF0aW9uTmFtZShzdHlsZXMpIHtcbiAgcmV0dXJuIHN0eWxlcz8uYW5pbWF0aW9uTmFtZSB8fCBcIm5vbmVcIjtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRSZWYoZWxlbWVudCkge1xuICBsZXQgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LnByb3BzLCBcInJlZlwiKT8uZ2V0O1xuICBsZXQgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5yZWY7XG4gIH1cbiAgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlbGVtZW50LCBcInJlZlwiKT8uZ2V0O1xuICBtYXlXYXJuID0gZ2V0dGVyICYmIFwiaXNSZWFjdFdhcm5pbmdcIiBpbiBnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nO1xuICBpZiAobWF5V2Fybikge1xuICAgIHJldHVybiBlbGVtZW50LnByb3BzLnJlZjtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWYgfHwgZWxlbWVudC5yZWY7XG59XG52YXIgUm9vdCA9IFByZXNlbmNlO1xuZXhwb3J0IHtcbiAgUHJlc2VuY2UsXG4gIFJvb3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvcHJpbWl0aXZlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyBjcmVhdGVTbG90IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI7XG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbnZhciBOT0RFUyA9IFtcbiAgXCJhXCIsXG4gIFwiYnV0dG9uXCIsXG4gIFwiZGl2XCIsXG4gIFwiZm9ybVwiLFxuICBcImgyXCIsXG4gIFwiaDNcIixcbiAgXCJpbWdcIixcbiAgXCJpbnB1dFwiLFxuICBcImxhYmVsXCIsXG4gIFwibGlcIixcbiAgXCJuYXZcIixcbiAgXCJvbFwiLFxuICBcInBcIixcbiAgXCJzZWxlY3RcIixcbiAgXCJzcGFuXCIsXG4gIFwic3ZnXCIsXG4gIFwidWxcIlxuXTtcbnZhciBQcmltaXRpdmUgPSBOT0RFUy5yZWR1Y2UoKHByaW1pdGl2ZSwgbm9kZSkgPT4ge1xuICBjb25zdCBTbG90ID0gY3JlYXRlU2xvdChgUHJpbWl0aXZlLiR7bm9kZX1gKTtcbiAgY29uc3QgTm9kZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICBjb25zdCB7IGFzQ2hpbGQsIC4uLnByaW1pdGl2ZVByb3BzIH0gPSBwcm9wcztcbiAgICBjb25zdCBDb21wID0gYXNDaGlsZCA/IFNsb3QgOiBub2RlO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB3aW5kb3dbU3ltYm9sLmZvcihcInJhZGl4LXVpXCIpXSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KENvbXAsIHsgLi4ucHJpbWl0aXZlUHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmIH0pO1xuICB9KTtcbiAgTm9kZS5kaXNwbGF5TmFtZSA9IGBQcmltaXRpdmUuJHtub2RlfWA7XG4gIHJldHVybiB7IC4uLnByaW1pdGl2ZSwgW25vZGVdOiBOb2RlIH07XG59LCB7fSk7XG5mdW5jdGlvbiBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnQodGFyZ2V0LCBldmVudCkge1xuICBpZiAodGFyZ2V0KSBSZWFjdERPTS5mbHVzaFN5bmMoKCkgPT4gdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpKTtcbn1cbnZhciBSb290ID0gUHJpbWl0aXZlO1xuZXhwb3J0IHtcbiAgUHJpbWl0aXZlLFxuICBSb290LFxuICBkaXNwYXRjaERpc2NyZXRlQ3VzdG9tRXZlbnRcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBzcmMvc2xvdC50c3hcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY29tcG9zZVJlZnMgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LWNvbXBvc2UtcmVmc1wiO1xuaW1wb3J0IHsgRnJhZ21lbnQgYXMgRnJhZ21lbnQyLCBqc3ggfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbi8vIEBfX05PX1NJREVfRUZGRUNUU19fXG5mdW5jdGlvbiBjcmVhdGVTbG90KG93bmVyTmFtZSkge1xuICBjb25zdCBTbG90Q2xvbmUgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2xvdENsb25lKG93bmVyTmFtZSk7XG4gIGNvbnN0IFNsb3QyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgY29uc3QgY2hpbGRyZW5BcnJheSA9IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pO1xuICAgIGNvbnN0IHNsb3R0YWJsZSA9IGNoaWxkcmVuQXJyYXkuZmluZChpc1Nsb3R0YWJsZSk7XG4gICAgaWYgKHNsb3R0YWJsZSkge1xuICAgICAgY29uc3QgbmV3RWxlbWVudCA9IHNsb3R0YWJsZS5wcm9wcy5jaGlsZHJlbjtcbiAgICAgIGNvbnN0IG5ld0NoaWxkcmVuID0gY2hpbGRyZW5BcnJheS5tYXAoKGNoaWxkKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZCA9PT0gc2xvdHRhYmxlKSB7XG4gICAgICAgICAgaWYgKFJlYWN0LkNoaWxkcmVuLmNvdW50KG5ld0VsZW1lbnQpID4gMSkgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIFJlYWN0LmlzVmFsaWRFbGVtZW50KG5ld0VsZW1lbnQpID8gbmV3RWxlbWVudC5wcm9wcy5jaGlsZHJlbiA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8ganN4KFNsb3RDbG9uZSwgeyAuLi5zbG90UHJvcHMsIHJlZjogZm9yd2FyZGVkUmVmLCBjaGlsZHJlbjogUmVhY3QuaXNWYWxpZEVsZW1lbnQobmV3RWxlbWVudCkgPyBSZWFjdC5jbG9uZUVsZW1lbnQobmV3RWxlbWVudCwgdm9pZCAwLCBuZXdDaGlsZHJlbikgOiBudWxsIH0pO1xuICAgIH1cbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChTbG90Q2xvbmUsIHsgLi4uc2xvdFByb3BzLCByZWY6IGZvcndhcmRlZFJlZiwgY2hpbGRyZW4gfSk7XG4gIH0pO1xuICBTbG90Mi5kaXNwbGF5TmFtZSA9IGAke293bmVyTmFtZX0uU2xvdGA7XG4gIHJldHVybiBTbG90Mjtcbn1cbnZhciBTbG90ID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZVNsb3QoXCJTbG90XCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3RDbG9uZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdENsb25lID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIGZvcndhcmRlZFJlZikgPT4ge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnNsb3RQcm9wcyB9ID0gcHJvcHM7XG4gICAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgICAgY29uc3QgY2hpbGRyZW5SZWYgPSBnZXRFbGVtZW50UmVmKGNoaWxkcmVuKTtcbiAgICAgIGNvbnN0IHByb3BzMiA9IG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZHJlbi5wcm9wcyk7XG4gICAgICBpZiAoY2hpbGRyZW4udHlwZSAhPT0gUmVhY3QuRnJhZ21lbnQpIHtcbiAgICAgICAgcHJvcHMyLnJlZiA9IGZvcndhcmRlZFJlZiA/IGNvbXBvc2VSZWZzKGZvcndhcmRlZFJlZiwgY2hpbGRyZW5SZWYpIDogY2hpbGRyZW5SZWY7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkcmVuLCBwcm9wczIpO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMSA/IFJlYWN0LkNoaWxkcmVuLm9ubHkobnVsbCkgOiBudWxsO1xuICB9KTtcbiAgU2xvdENsb25lLmRpc3BsYXlOYW1lID0gYCR7b3duZXJOYW1lfS5TbG90Q2xvbmVgO1xuICByZXR1cm4gU2xvdENsb25lO1xufVxudmFyIFNMT1RUQUJMRV9JREVOVElGSUVSID0gU3ltYm9sKFwicmFkaXguc2xvdHRhYmxlXCIpO1xuLy8gQF9fTk9fU0lERV9FRkZFQ1RTX19cbmZ1bmN0aW9uIGNyZWF0ZVNsb3R0YWJsZShvd25lck5hbWUpIHtcbiAgY29uc3QgU2xvdHRhYmxlMiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGpzeChGcmFnbWVudDIsIHsgY2hpbGRyZW4gfSk7XG4gIH07XG4gIFNsb3R0YWJsZTIuZGlzcGxheU5hbWUgPSBgJHtvd25lck5hbWV9LlNsb3R0YWJsZWA7XG4gIFNsb3R0YWJsZTIuX19yYWRpeElkID0gU0xPVFRBQkxFX0lERU5USUZJRVI7XG4gIHJldHVybiBTbG90dGFibGUyO1xufVxudmFyIFNsb3R0YWJsZSA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTbG90dGFibGUoXCJTbG90dGFibGVcIik7XG5mdW5jdGlvbiBpc1Nsb3R0YWJsZShjaGlsZCkge1xuICByZXR1cm4gUmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpICYmIHR5cGVvZiBjaGlsZC50eXBlID09PSBcImZ1bmN0aW9uXCIgJiYgXCJfX3JhZGl4SWRcIiBpbiBjaGlsZC50eXBlICYmIGNoaWxkLnR5cGUuX19yYWRpeElkID09PSBTTE9UVEFCTEVfSURFTlRJRklFUjtcbn1cbmZ1bmN0aW9uIG1lcmdlUHJvcHMoc2xvdFByb3BzLCBjaGlsZFByb3BzKSB7XG4gIGNvbnN0IG92ZXJyaWRlUHJvcHMgPSB7IC4uLmNoaWxkUHJvcHMgfTtcbiAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGlsZFByb3BzKSB7XG4gICAgY29uc3Qgc2xvdFByb3BWYWx1ZSA9IHNsb3RQcm9wc1twcm9wTmFtZV07XG4gICAgY29uc3QgY2hpbGRQcm9wVmFsdWUgPSBjaGlsZFByb3BzW3Byb3BOYW1lXTtcbiAgICBjb25zdCBpc0hhbmRsZXIgPSAvXm9uW0EtWl0vLnRlc3QocHJvcE5hbWUpO1xuICAgIGlmIChpc0hhbmRsZXIpIHtcbiAgICAgIGlmIChzbG90UHJvcFZhbHVlICYmIGNoaWxkUHJvcFZhbHVlKSB7XG4gICAgICAgIG92ZXJyaWRlUHJvcHNbcHJvcE5hbWVdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBjaGlsZFByb3BWYWx1ZSguLi5hcmdzKTtcbiAgICAgICAgICBzbG90UHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNsb3RQcm9wVmFsdWUpIHtcbiAgICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBzbG90UHJvcFZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSB7IC4uLnNsb3RQcm9wVmFsdWUsIC4uLmNoaWxkUHJvcFZhbHVlIH07XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gXCJjbGFzc05hbWVcIikge1xuICAgICAgb3ZlcnJpZGVQcm9wc1twcm9wTmFtZV0gPSBbc2xvdFByb3BWYWx1ZSwgY2hpbGRQcm9wVmFsdWVdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgLi4uc2xvdFByb3BzLCAuLi5vdmVycmlkZVByb3BzIH07XG59XG5mdW5jdGlvbiBnZXRFbGVtZW50UmVmKGVsZW1lbnQpIHtcbiAgbGV0IGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudC5wcm9wcywgXCJyZWZcIik/LmdldDtcbiAgbGV0IG1heVdhcm4gPSBnZXR0ZXIgJiYgXCJpc1JlYWN0V2FybmluZ1wiIGluIGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmc7XG4gIGlmIChtYXlXYXJuKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQucmVmO1xuICB9XG4gIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZWxlbWVudCwgXCJyZWZcIik/LmdldDtcbiAgbWF5V2FybiA9IGdldHRlciAmJiBcImlzUmVhY3RXYXJuaW5nXCIgaW4gZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZztcbiAgaWYgKG1heVdhcm4pIHtcbiAgICByZXR1cm4gZWxlbWVudC5wcm9wcy5yZWY7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucHJvcHMucmVmIHx8IGVsZW1lbnQucmVmO1xufVxuZXhwb3J0IHtcbiAgU2xvdCBhcyBSb290LFxuICBTbG90LFxuICBTbG90dGFibGUsXG4gIGNyZWF0ZVNsb3QsXG4gIGNyZWF0ZVNsb3R0YWJsZVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHBhY2thZ2VzL3JlYWN0L3VzZS1jYWxsYmFjay1yZWYvc3JjL3VzZS1jYWxsYmFjay1yZWYudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmZ1bmN0aW9uIHVzZUNhbGxiYWNrUmVmKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGNhbGxiYWNrUmVmID0gUmVhY3QudXNlUmVmKGNhbGxiYWNrKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjYWxsYmFja1JlZi5jdXJyZW50ID0gY2FsbGJhY2s7XG4gIH0pO1xuICByZXR1cm4gUmVhY3QudXNlTWVtbygoKSA9PiAoLi4uYXJncykgPT4gY2FsbGJhY2tSZWYuY3VycmVudD8uKC4uLmFyZ3MpLCBbXSk7XG59XG5leHBvcnQge1xuICB1c2VDYWxsYmFja1JlZlxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy91c2UtY29udHJvbGxhYmxlLXN0YXRlLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1sYXlvdXQtZWZmZWN0XCI7XG52YXIgdXNlSW5zZXJ0aW9uRWZmZWN0ID0gUmVhY3RbXCIgdXNlSW5zZXJ0aW9uRWZmZWN0IFwiLnRyaW0oKS50b1N0cmluZygpXSB8fCB1c2VMYXlvdXRFZmZlY3Q7XG5mdW5jdGlvbiB1c2VDb250cm9sbGFibGVTdGF0ZSh7XG4gIHByb3AsXG4gIGRlZmF1bHRQcm9wLFxuICBvbkNoYW5nZSA9ICgpID0+IHtcbiAgfSxcbiAgY2FsbGVyXG59KSB7XG4gIGNvbnN0IFt1bmNvbnRyb2xsZWRQcm9wLCBzZXRVbmNvbnRyb2xsZWRQcm9wLCBvbkNoYW5nZVJlZl0gPSB1c2VVbmNvbnRyb2xsZWRTdGF0ZSh7XG4gICAgZGVmYXVsdFByb3AsXG4gICAgb25DaGFuZ2VcbiAgfSk7XG4gIGNvbnN0IGlzQ29udHJvbGxlZCA9IHByb3AgIT09IHZvaWQgMDtcbiAgY29uc3QgdmFsdWUgPSBpc0NvbnRyb2xsZWQgPyBwcm9wIDogdW5jb250cm9sbGVkUHJvcDtcbiAgaWYgKHRydWUpIHtcbiAgICBjb25zdCBpc0NvbnRyb2xsZWRSZWYgPSBSZWFjdC51c2VSZWYocHJvcCAhPT0gdm9pZCAwKTtcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3Qgd2FzQ29udHJvbGxlZCA9IGlzQ29udHJvbGxlZFJlZi5jdXJyZW50O1xuICAgICAgaWYgKHdhc0NvbnRyb2xsZWQgIT09IGlzQ29udHJvbGxlZCkge1xuICAgICAgICBjb25zdCBmcm9tID0gd2FzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc3QgdG8gPSBpc0NvbnRyb2xsZWQgPyBcImNvbnRyb2xsZWRcIiA6IFwidW5jb250cm9sbGVkXCI7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgJHtjYWxsZXJ9IGlzIGNoYW5naW5nIGZyb20gJHtmcm9tfSB0byAke3RvfS4gQ29tcG9uZW50cyBzaG91bGQgbm90IHN3aXRjaCBmcm9tIGNvbnRyb2xsZWQgdG8gdW5jb250cm9sbGVkIChvciB2aWNlIHZlcnNhKS4gRGVjaWRlIGJldHdlZW4gdXNpbmcgYSBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCB2YWx1ZSBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSBjb21wb25lbnQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaXNDb250cm9sbGVkUmVmLmN1cnJlbnQgPSBpc0NvbnRyb2xsZWQ7XG4gICAgfSwgW2lzQ29udHJvbGxlZCwgY2FsbGVyXSk7XG4gIH1cbiAgY29uc3Qgc2V0VmFsdWUgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAobmV4dFZhbHVlKSA9PiB7XG4gICAgICBpZiAoaXNDb250cm9sbGVkKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlMiA9IGlzRnVuY3Rpb24obmV4dFZhbHVlKSA/IG5leHRWYWx1ZShwcm9wKSA6IG5leHRWYWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlMiAhPT0gcHJvcCkge1xuICAgICAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQ/Lih2YWx1ZTIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRVbmNvbnRyb2xsZWRQcm9wKG5leHRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaXNDb250cm9sbGVkLCBwcm9wLCBzZXRVbmNvbnRyb2xsZWRQcm9wLCBvbkNoYW5nZVJlZl1cbiAgKTtcbiAgcmV0dXJuIFt2YWx1ZSwgc2V0VmFsdWVdO1xufVxuZnVuY3Rpb24gdXNlVW5jb250cm9sbGVkU3RhdGUoe1xuICBkZWZhdWx0UHJvcCxcbiAgb25DaGFuZ2Vcbn0pIHtcbiAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSBSZWFjdC51c2VTdGF0ZShkZWZhdWx0UHJvcCk7XG4gIGNvbnN0IHByZXZWYWx1ZVJlZiA9IFJlYWN0LnVzZVJlZih2YWx1ZSk7XG4gIGNvbnN0IG9uQ2hhbmdlUmVmID0gUmVhY3QudXNlUmVmKG9uQ2hhbmdlKTtcbiAgdXNlSW5zZXJ0aW9uRWZmZWN0KCgpID0+IHtcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XG4gIH0sIFtvbkNoYW5nZV0pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwcmV2VmFsdWVSZWYuY3VycmVudCAhPT0gdmFsdWUpIHtcbiAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQ/Lih2YWx1ZSk7XG4gICAgICBwcmV2VmFsdWVSZWYuY3VycmVudCA9IHZhbHVlO1xuICAgIH1cbiAgfSwgW3ZhbHVlLCBwcmV2VmFsdWVSZWZdKTtcbiAgcmV0dXJuIFt2YWx1ZSwgc2V0VmFsdWUsIG9uQ2hhbmdlUmVmXTtcbn1cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG4vLyBzcmMvdXNlLWNvbnRyb2xsYWJsZS1zdGF0ZS1yZWR1Y2VyLnRzeFxuaW1wb3J0ICogYXMgUmVhY3QyIGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0RXZlbnQgfSBmcm9tIFwiQHJhZGl4LXVpL3JlYWN0LXVzZS1lZmZlY3QtZXZlbnRcIjtcbnZhciBTWU5DX1NUQVRFID0gU3ltYm9sKFwiUkFESVg6U1lOQ19TVEFURVwiKTtcbmZ1bmN0aW9uIHVzZUNvbnRyb2xsYWJsZVN0YXRlUmVkdWNlcihyZWR1Y2VyLCB1c2VyQXJncywgaW5pdGlhbEFyZywgaW5pdCkge1xuICBjb25zdCB7IHByb3A6IGNvbnRyb2xsZWRTdGF0ZSwgZGVmYXVsdFByb3AsIG9uQ2hhbmdlOiBvbkNoYW5nZVByb3AsIGNhbGxlciB9ID0gdXNlckFyZ3M7XG4gIGNvbnN0IGlzQ29udHJvbGxlZCA9IGNvbnRyb2xsZWRTdGF0ZSAhPT0gdm9pZCAwO1xuICBjb25zdCBvbkNoYW5nZSA9IHVzZUVmZmVjdEV2ZW50KG9uQ2hhbmdlUHJvcCk7XG4gIGlmICh0cnVlKSB7XG4gICAgY29uc3QgaXNDb250cm9sbGVkUmVmID0gUmVhY3QyLnVzZVJlZihjb250cm9sbGVkU3RhdGUgIT09IHZvaWQgMCk7XG4gICAgUmVhY3QyLnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCB3YXNDb250cm9sbGVkID0gaXNDb250cm9sbGVkUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAod2FzQ29udHJvbGxlZCAhPT0gaXNDb250cm9sbGVkKSB7XG4gICAgICAgIGNvbnN0IGZyb20gPSB3YXNDb250cm9sbGVkID8gXCJjb250cm9sbGVkXCIgOiBcInVuY29udHJvbGxlZFwiO1xuICAgICAgICBjb25zdCB0byA9IGlzQ29udHJvbGxlZCA/IFwiY29udHJvbGxlZFwiIDogXCJ1bmNvbnRyb2xsZWRcIjtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGAke2NhbGxlcn0gaXMgY2hhbmdpbmcgZnJvbSAke2Zyb219IHRvICR7dG99LiBDb21wb25lbnRzIHNob3VsZCBub3Qgc3dpdGNoIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgKG9yIHZpY2UgdmVyc2EpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIHZhbHVlIGZvciB0aGUgbGlmZXRpbWUgb2YgdGhlIGNvbXBvbmVudC5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpc0NvbnRyb2xsZWRSZWYuY3VycmVudCA9IGlzQ29udHJvbGxlZDtcbiAgICB9LCBbaXNDb250cm9sbGVkLCBjYWxsZXJdKTtcbiAgfVxuICBjb25zdCBhcmdzID0gW3sgLi4uaW5pdGlhbEFyZywgc3RhdGU6IGRlZmF1bHRQcm9wIH1dO1xuICBpZiAoaW5pdCkge1xuICAgIGFyZ3MucHVzaChpbml0KTtcbiAgfVxuICBjb25zdCBbaW50ZXJuYWxTdGF0ZSwgZGlzcGF0Y2hdID0gUmVhY3QyLnVzZVJlZHVjZXIoXG4gICAgKHN0YXRlMiwgYWN0aW9uKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFNZTkNfU1RBVEUpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUyLCBzdGF0ZTogYWN0aW9uLnN0YXRlIH07XG4gICAgICB9XG4gICAgICBjb25zdCBuZXh0ID0gcmVkdWNlcihzdGF0ZTIsIGFjdGlvbik7XG4gICAgICBpZiAoaXNDb250cm9sbGVkICYmICFPYmplY3QuaXMobmV4dC5zdGF0ZSwgc3RhdGUyLnN0YXRlKSkge1xuICAgICAgICBvbkNoYW5nZShuZXh0LnN0YXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0sXG4gICAgLi4uYXJnc1xuICApO1xuICBjb25zdCB1bmNvbnRyb2xsZWRTdGF0ZSA9IGludGVybmFsU3RhdGUuc3RhdGU7XG4gIGNvbnN0IHByZXZWYWx1ZVJlZiA9IFJlYWN0Mi51c2VSZWYodW5jb250cm9sbGVkU3RhdGUpO1xuICBSZWFjdDIudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocHJldlZhbHVlUmVmLmN1cnJlbnQgIT09IHVuY29udHJvbGxlZFN0YXRlKSB7XG4gICAgICBwcmV2VmFsdWVSZWYuY3VycmVudCA9IHVuY29udHJvbGxlZFN0YXRlO1xuICAgICAgaWYgKCFpc0NvbnRyb2xsZWQpIHtcbiAgICAgICAgb25DaGFuZ2UodW5jb250cm9sbGVkU3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW29uQ2hhbmdlLCB1bmNvbnRyb2xsZWRTdGF0ZSwgcHJldlZhbHVlUmVmLCBpc0NvbnRyb2xsZWRdKTtcbiAgY29uc3Qgc3RhdGUgPSBSZWFjdDIudXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgaXNDb250cm9sbGVkMiA9IGNvbnRyb2xsZWRTdGF0ZSAhPT0gdm9pZCAwO1xuICAgIGlmIChpc0NvbnRyb2xsZWQyKSB7XG4gICAgICByZXR1cm4geyAuLi5pbnRlcm5hbFN0YXRlLCBzdGF0ZTogY29udHJvbGxlZFN0YXRlIH07XG4gICAgfVxuICAgIHJldHVybiBpbnRlcm5hbFN0YXRlO1xuICB9LCBbaW50ZXJuYWxTdGF0ZSwgY29udHJvbGxlZFN0YXRlXSk7XG4gIFJlYWN0Mi51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0NvbnRyb2xsZWQgJiYgIU9iamVjdC5pcyhjb250cm9sbGVkU3RhdGUsIGludGVybmFsU3RhdGUuc3RhdGUpKSB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFNZTkNfU1RBVEUsIHN0YXRlOiBjb250cm9sbGVkU3RhdGUgfSk7XG4gICAgfVxuICB9LCBbY29udHJvbGxlZFN0YXRlLCBpbnRlcm5hbFN0YXRlLnN0YXRlLCBpc0NvbnRyb2xsZWRdKTtcbiAgcmV0dXJuIFtzdGF0ZSwgZGlzcGF0Y2hdO1xufVxuZXhwb3J0IHtcbiAgdXNlQ29udHJvbGxhYmxlU3RhdGUsXG4gIHVzZUNvbnRyb2xsYWJsZVN0YXRlUmVkdWNlclxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsIi8vIHNyYy91c2UtZWZmZWN0LWV2ZW50LnRzeFxuaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0IH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtbGF5b3V0LWVmZmVjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG52YXIgdXNlUmVhY3RFZmZlY3RFdmVudCA9IFJlYWN0W1wiIHVzZUVmZmVjdEV2ZW50IFwiLnRyaW0oKS50b1N0cmluZygpXTtcbnZhciB1c2VSZWFjdEluc2VydGlvbkVmZmVjdCA9IFJlYWN0W1wiIHVzZUluc2VydGlvbkVmZmVjdCBcIi50cmltKCkudG9TdHJpbmcoKV07XG5mdW5jdGlvbiB1c2VFZmZlY3RFdmVudChjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIHVzZVJlYWN0RWZmZWN0RXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB1c2VSZWFjdEVmZmVjdEV2ZW50KGNhbGxiYWNrKTtcbiAgfVxuICBjb25zdCByZWYgPSBSZWFjdC51c2VSZWYoKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjYWxsIGFuIGV2ZW50IGhhbmRsZXIgd2hpbGUgcmVuZGVyaW5nLlwiKTtcbiAgfSk7XG4gIGlmICh0eXBlb2YgdXNlUmVhY3RJbnNlcnRpb25FZmZlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHVzZVJlYWN0SW5zZXJ0aW9uRWZmZWN0KCgpID0+IHtcbiAgICAgIHJlZi5jdXJyZW50ID0gY2FsbGJhY2s7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICAgIHJlZi5jdXJyZW50ID0gY2FsbGJhY2s7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIFJlYWN0LnVzZU1lbW8oKCkgPT4gKC4uLmFyZ3MpID0+IHJlZi5jdXJyZW50Py4oLi4uYXJncyksIFtdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUVmZmVjdEV2ZW50XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiLy8gcGFja2FnZXMvcmVhY3QvdXNlLWVzY2FwZS1rZXlkb3duL3NyYy91c2UtZXNjYXBlLWtleWRvd24udHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNhbGxiYWNrUmVmIH0gZnJvbSBcIkByYWRpeC11aS9yZWFjdC11c2UtY2FsbGJhY2stcmVmXCI7XG5mdW5jdGlvbiB1c2VFc2NhcGVLZXlkb3duKG9uRXNjYXBlS2V5RG93blByb3AsIG93bmVyRG9jdW1lbnQgPSBnbG9iYWxUaGlzPy5kb2N1bWVudCkge1xuICBjb25zdCBvbkVzY2FwZUtleURvd24gPSB1c2VDYWxsYmFja1JlZihvbkVzY2FwZUtleURvd25Qcm9wKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIG9uRXNjYXBlS2V5RG93bihldmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBvd25lckRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4gb3duZXJEb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlEb3duLCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gIH0sIFtvbkVzY2FwZUtleURvd24sIG93bmVyRG9jdW1lbnRdKTtcbn1cbmV4cG9ydCB7XG4gIHVzZUVzY2FwZUtleWRvd25cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvLyBwYWNrYWdlcy9yZWFjdC91c2UtbGF5b3V0LWVmZmVjdC9zcmMvdXNlLWxheW91dC1lZmZlY3QudHN4XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbnZhciB1c2VMYXlvdXRFZmZlY3QyID0gZ2xvYmFsVGhpcz8uZG9jdW1lbnQgPyBSZWFjdC51c2VMYXlvdXRFZmZlY3QgOiAoKSA9PiB7XG59O1xuZXhwb3J0IHtcbiAgdXNlTGF5b3V0RWZmZWN0MiBhcyB1c2VMYXlvdXRFZmZlY3Rcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XG4gIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBhciA9IFtdO1xuICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XG4gICAgcmV0dXJuIGFyO1xuICB9O1xuICByZXR1cm4gb3duS2V5cyhvKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XG4gIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xuICAgIGlmIChhc3luYykge1xuICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xuICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcbiAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcbiAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xuICB9XG4gIGVsc2UgaWYgKGFzeW5jKSB7XG4gICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcbiAgZnVuY3Rpb24gZmFpbChlKSB7XG4gICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xuICAgIGVudi5oYXNFcnJvciA9IHRydWU7XG4gIH1cbiAgdmFyIHIsIHMgPSAwO1xuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcbiAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcbiAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgcyB8PSAxO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XG4gICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xuICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XG4gICAgICB9KTtcbiAgfVxuICByZXR1cm4gcGF0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBfX2V4dGVuZHMsXG4gIF9fYXNzaWduLFxuICBfX3Jlc3QsXG4gIF9fZGVjb3JhdGUsXG4gIF9fcGFyYW0sXG4gIF9fZXNEZWNvcmF0ZSxcbiAgX19ydW5Jbml0aWFsaXplcnMsXG4gIF9fcHJvcEtleSxcbiAgX19zZXRGdW5jdGlvbk5hbWUsXG4gIF9fbWV0YWRhdGEsXG4gIF9fYXdhaXRlcixcbiAgX19nZW5lcmF0b3IsXG4gIF9fY3JlYXRlQmluZGluZyxcbiAgX19leHBvcnRTdGFyLFxuICBfX3ZhbHVlcyxcbiAgX19yZWFkLFxuICBfX3NwcmVhZCxcbiAgX19zcHJlYWRBcnJheXMsXG4gIF9fc3ByZWFkQXJyYXksXG4gIF9fYXdhaXQsXG4gIF9fYXN5bmNHZW5lcmF0b3IsXG4gIF9fYXN5bmNEZWxlZ2F0b3IsXG4gIF9fYXN5bmNWYWx1ZXMsXG4gIF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxuICBfX2ltcG9ydFN0YXIsXG4gIF9faW1wb3J0RGVmYXVsdCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEluLFxuICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcbiAgX19kaXNwb3NlUmVzb3VyY2VzLFxuICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcbn07XG4iXSwibmFtZXMiOlsianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsIlJlYWN0IiwiVXNlcnMiLCJDYWxlbmRhciIsIk1hcFBpbiIsIkVkaXQiLCJFeWUiLCJVc2VyUGx1cyIsIkNhcmQiLCJCYWRnZSIsIkJ1dHRvbiIsImNuIiwiR3JvdXBDYXJkIiwibWVtbyIsIl9yZWYiLCJfZ3JvdXAkbWVtYmVycyIsImdyb3VwIiwib25WaWV3RGV0YWlscyIsIm9uRWRpdCIsIm9uTWFuYWdlTWVtYmVycyIsIl9yZWYkdmlld01vZGUiLCJ2aWV3TW9kZSIsIl9yZWYkc2hvd0FjdGlvbnMiLCJzaG93QWN0aW9ucyIsImlzQWN0aXZlIiwic3RhdHVzIiwibWVtYmVyQ291bnQiLCJtZW1iZXJfY291bnQiLCJkaXNwbGF5TWVtYmVycyIsIm1lbWJlcnMiLCJzbGljZSIsImZvcm1hdE1lZXRpbmdUaW1lIiwiZGF5IiwidGltZSIsImNvbmNhdCIsImdldEluaXRpYWxzIiwibmFtZSIsInNwbGl0IiwibWFwIiwid29yZCIsImpvaW4iLCJ0b1VwcGVyQ2FzZSIsImNsYXNzTmFtZSIsImhvdmVyYWJsZSIsImNoaWxkcmVuIiwiaW1hZ2UiLCJzcmMiLCJhbHQiLCJ2YXJpYW50IiwiZGVzY3JpcHRpb24iLCJsZWFkZXJfcGhvdG8iLCJsZWFkZXJfbmFtZSIsImxlbmd0aCIsIm1lbWJlciIsImluZGV4Iiwic3R5bGUiLCJ6SW5kZXgiLCJwaG90byIsInRpdGxlIiwiaWQiLCJtZWV0aW5nX2RheSIsIm1lZXRpbmdfdGltZSIsImxvY2F0aW9uIiwic2l6ZSIsIm9uQ2xpY2siLCJkaXNwbGF5TmFtZSIsImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJfcmVnZW5lcmF0b3IiLCJ3IiwibSIsImRlZmluZVByb3BlcnR5IiwiX3JlZ2VuZXJhdG9yRGVmaW5lIiwiX2ludm9rZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9zbGljZWRUb0FycmF5IiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiZnJvbSIsInRlc3QiLCJuZXh0IiwicHVzaCIsImlzQXJyYXkiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIkRpYWxvZyIsIkRpYWxvZ0NvbnRlbnQiLCJEaWFsb2dIZWFkZXIiLCJEaWFsb2dUaXRsZSIsIkRpYWxvZ0Zvb3RlciIsIklucHV0IiwiU2VhcmNoIiwiVXBsb2FkIiwiWCIsImFwaSIsIlNtYWxsR3JvdXBGb3JtIiwiaXNPcGVuIiwib25DbG9zZSIsIm9uU3VibWl0IiwiX3JlZiRzbWFsbEdyb3VwIiwic21hbGxHcm91cCIsIl9yZWYkaXNMb2FkaW5nIiwiaXNMb2FkaW5nIiwiX3VzZVN0YXRlIiwibGVhZGVyX2lkIiwiX3VzZVN0YXRlMiIsImZvcm1EYXRhIiwic2V0Rm9ybURhdGEiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsImVycm9ycyIsInNldEVycm9ycyIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2IiwiaXNTdWJtaXR0aW5nIiwic2V0SXNTdWJtaXR0aW5nIiwiX3VzZVN0YXRlNyIsIl91c2VTdGF0ZTgiLCJsZWFkZXJTZWFyY2giLCJzZXRMZWFkZXJTZWFyY2giLCJfdXNlU3RhdGU5IiwiX3VzZVN0YXRlMCIsInNldE1lbWJlcnMiLCJfdXNlU3RhdGUxIiwiX3VzZVN0YXRlMTAiLCJmaWx0ZXJlZE1lbWJlcnMiLCJzZXRGaWx0ZXJlZE1lbWJlcnMiLCJfdXNlU3RhdGUxMSIsIl91c2VTdGF0ZTEyIiwic2hvd0xlYWRlckRyb3Bkb3duIiwic2V0U2hvd0xlYWRlckRyb3Bkb3duIiwiX3VzZVN0YXRlMTMiLCJfdXNlU3RhdGUxNCIsImlzTG9hZGluZ01lbWJlcnMiLCJzZXRJc0xvYWRpbmdNZW1iZXJzIiwiX3VzZVN0YXRlMTUiLCJfdXNlU3RhdGUxNiIsInBob3RvUHJldmlldyIsInNldFBob3RvUHJldmlldyIsImZpbGVJbnB1dFJlZiIsImRheXNPZldlZWsiLCJsb2FkTWVtYmVycyIsIl9yZWYyIiwiX2NhbGxlZSIsInJlc3BvbnNlIiwiX3QiLCJfY29udGV4dCIsImdldCIsImRhdGEiLCJjb25zb2xlIiwiZXJyb3IiLCJ0cmltIiwic2VhcmNoTG93ZXIiLCJ0b0xvd2VyQ2FzZSIsImZpbHRlcmVkIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJlbWFpbCIsInZhbGlkYXRlRm9ybSIsIm5ld0Vycm9ycyIsIkZpbGUiLCJ2YWxpZFR5cGVzIiwidHlwZSIsIm1heFNpemUiLCJrZXlzIiwiaGFuZGxlTGVhZGVyU2VsZWN0IiwicHJldiIsIl9vYmplY3RTcHJlYWQiLCJ1bmRlZmluZWQiLCJoYW5kbGVMZWFkZXJTZWFyY2hDaGFuZ2UiLCJ0YXJnZXQiLCJoYW5kbGVQaG90b0NoYW5nZSIsIl9lJHRhcmdldCRmaWxlcyIsImZpbGUiLCJmaWxlcyIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwiaGFuZGxlUGhvdG9SZW1vdmUiLCJjdXJyZW50IiwiaGFuZGxlQ2hhbmdlIiwiX2UkdGFyZ2V0IiwiX2RlZmluZVByb3BlcnR5IiwiaGFuZGxlU3VibWl0IiwiX3JlZjMiLCJfY2FsbGVlMiIsInN1Ym1pdERhdGEiLCJfZXJyb3IkcmVzcG9uc2UiLCJfdDIiLCJfY29udGV4dDIiLCJwcmV2ZW50RGVmYXVsdCIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiU3RyaW5nIiwiX3giLCJvcGVuIiwib25PcGVuQ2hhbmdlIiwiaHRtbEZvciIsInBsYWNlaG9sZGVyIiwib25DaGFuZ2UiLCJkaXNhYmxlZCIsInJvd3MiLCJvbkZvY3VzIiwib25CbHVyIiwic2V0VGltZW91dCIsImNoYXJBdCIsInJlZiIsImFjY2VwdCIsIl9maWxlSW5wdXRSZWYkY3VycmVudCIsImNsaWNrIiwiY3ZhIiwiYmFkZ2VWYXJpYW50cyIsInZhcmlhbnRzIiwicHJpbWFyeSIsInN1Y2Nlc3MiLCJ3YXJuaW5nIiwiZGFuZ2VyIiwibmV1dHJhbCIsIm91dGxpbmUiLCJzbSIsIm1kIiwibGciLCJzaGFwZSIsInJvdW5kZWQiLCJwaWxsIiwiZGVmYXVsdFZhcmlhbnRzIiwiZm9yd2FyZFJlZiIsImljb24iLCJwcm9wcyIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsIl9leGNsdWRlZCIsIkRpYWxvZ1ByaW1pdGl2ZSIsIlJvb3QiLCJEaWFsb2dUcmlnZ2VyIiwiVHJpZ2dlciIsIkRpYWxvZ1BvcnRhbCIsIlBvcnRhbCIsIkRpYWxvZ0Nsb3NlIiwiQ2xvc2UiLCJEaWFsb2dPdmVybGF5IiwiT3ZlcmxheSIsIl9yZWYyJHNob3dDbG9zZUJ1dHRvbiIsInNob3dDbG9zZUJ1dHRvbiIsIl9leGNsdWRlZDIiLCJDb250ZW50IiwiX2V4Y2x1ZGVkMyIsIl9yZWY0IiwiX2V4Y2x1ZGVkNCIsIl9yZWY1IiwiX2V4Y2x1ZGVkNSIsIlRpdGxlIiwiRGlhbG9nRGVzY3JpcHRpb24iLCJfcmVmNiIsIl9leGNsdWRlZDYiLCJEZXNjcmlwdGlvbiIsImlucHV0VmFyaWFudHMiLCJnZXRJbnB1dE1vZGUiLCJfcmVmJHR5cGUiLCJsYWJlbCIsImhlbHBlclRleHQiLCJfcmVmJGljb25Qb3NpdGlvbiIsImljb25Qb3NpdGlvbiIsIl9yZWYkZnVsbFdpZHRoIiwiZnVsbFdpZHRoIiwicmVxdWlyZWQiLCJpbnB1dE1vZGUiLCJpbnB1dElkIiwidXNlSWQiLCJlcnJvcklkIiwiaGVscGVyVGV4dElkIiwiaGFzRXJyb3IiLCJjdXJyZW50VmFyaWFudCIsIm1vYmlsZUlucHV0TW9kZSIsInJvbGUiLCJzbWFsbEdyb3VwQXBpIiwiZ2V0U21hbGxHcm91cHMiLCJnZXRTbWFsbEdyb3VwIiwiY3JlYXRlU21hbGxHcm91cCIsIl9jYWxsZWUzIiwiX2NvbnRleHQzIiwicG9zdCIsInVwZGF0ZVNtYWxsR3JvdXAiLCJfY2FsbGVlNCIsIl9jb250ZXh0NCIsInB1dCIsImRlbGV0ZVNtYWxsR3JvdXAiLCJfY2FsbGVlNSIsIl9jb250ZXh0NSIsInVzZUNhbGxiYWNrIiwiUGx1cyIsIkdyaWQiLCJMaXN0IiwidXNlQXV0aCIsInVzZVRvYXN0IiwiU21hbGxHcm91cHMiLCJfdXNlQXV0aCIsInVzZXIiLCJfdXNlVG9hc3QiLCJzaG93VG9hc3QiLCJpc0FkbWluIiwic21hbGxHcm91cHMiLCJzZXRTbWFsbEdyb3VwcyIsInNldElzTG9hZGluZyIsImlzRm9ybU9wZW4iLCJzZXRJc0Zvcm1PcGVuIiwic2VsZWN0ZWRHcm91cCIsInNldFNlbGVjdGVkR3JvdXAiLCJzZXRWaWV3TW9kZSIsImxvYWRTbWFsbEdyb3VwcyIsImhhbmRsZUFkZENsaWNrIiwiaGFuZGxlRWRpdENsaWNrIiwiaGFuZGxlRm9ybUNsb3NlIiwiaGFuZGxlRm9ybVN1Ym1pdCIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJoYW5kbGVEZWxldGVDbGljayIsImhhbmRsZUFyY2hpdmVTdWNjZXNzIiwiaGFuZGxlVmlld0RldGFpbHMiLCJ3aW5kb3ciLCJocmVmIiwiaGFuZGxlTWFuYWdlTWVtYmVycyIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=