"use strict";
(self["webpackChunkchurch_management_system"] = self["webpackChunkchurch_management_system"] || []).push([["resources_js_pages_Finance_Settings_tsx"],{

/***/ "./resources/js/pages/Finance/Settings.tsx"
/*!*************************************************!*\
  !*** ./resources/js/pages/Finance/Settings.tsx ***!
  \*************************************************/
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
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/square-pen.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/plus.js");
/* harmony import */ var lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lucide-react */ "./node_modules/lucide-react/dist/esm/icons/trash-2.js");
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





var Settings = function Settings() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('offering_types'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    offeringTypes = _useState4[0],
    setOfferingTypes = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    expenseCategories = _useState6[0],
    setExpenseCategories = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    vendors = _useState8[0],
    setVendors = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState0 = _slicedToArray(_useState9, 2),
    funds = _useState0[0],
    setFunds = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState10 = _slicedToArray(_useState1, 2),
    loading = _useState10[0],
    setLoading = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showModal = _useState12[0],
    setShowModal = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    editingItem = _useState14[0],
    setEditingItem = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}),
    _useState16 = _slicedToArray(_useState15, 2),
    formData = _useState16[0],
    setFormData = _useState16[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchData();
  }, [activeTab]);
  var fetchData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var offeringTypesRes, categoriesRes, vendorsRes, fundsRes, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _t = activeTab;
            _context.n = _t === 'offering_types' ? 1 : _t === 'expense_categories' ? 3 : _t === 'vendors' ? 5 : _t === 'funds' ? 7 : 9;
            break;
          case 1:
            _context.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/offering-types');
          case 2:
            offeringTypesRes = _context.v;
            setOfferingTypes(offeringTypesRes.data.data || []);
            return _context.a(3, 9);
          case 3:
            _context.n = 4;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/expense-categories');
          case 4:
            categoriesRes = _context.v;
            setExpenseCategories(categoriesRes.data.data || []);
            return _context.a(3, 9);
          case 5:
            _context.n = 6;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/vendors');
          case 6:
            vendorsRes = _context.v;
            setVendors(vendorsRes.data.data || []);
            return _context.a(3, 9);
          case 7:
            _context.n = 8;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].get('/funds');
          case 8:
            fundsRes = _context.v;
            setFunds(fundsRes.data.data || []);
            return _context.a(3, 9);
          case 9:
            _context.n = 11;
            break;
          case 10:
            _context.p = 10;
            _t2 = _context.v;
            console.error('Error fetching data:', _t2);
          case 11:
            _context.p = 11;
            setLoading(false);
            return _context.f(11);
          case 12:
            return _context.a(2);
        }
      }, _callee, null, [[0, 10, 11, 12]]);
    }));
    return function fetchData() {
      return _ref.apply(this, arguments);
    };
  }();
  var handleAdd = function handleAdd() {
    setEditingItem(null);
    setFormData(getEmptyFormData());
    setShowModal(true);
  };
  var handleEdit = function handleEdit(item) {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };
  var handleDelete = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
      var endpoint, _t3;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (confirm('Are you sure you want to delete this item?')) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            _context2.p = 1;
            endpoint = getEndpoint();
            _context2.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"]["delete"]("".concat(endpoint, "/").concat(id));
          case 2:
            fetchData();
            alert('Item deleted successfully!');
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t3 = _context2.v;
            console.error('Error deleting item:', _t3);
            alert('Failed to delete item. It may be in use.');
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    }));
    return function handleDelete(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleSubmit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(e) {
      var endpoint, _t4;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            e.preventDefault();
            _context3.p = 1;
            endpoint = getEndpoint();
            if (!editingItem) {
              _context3.n = 3;
              break;
            }
            _context3.n = 2;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].put("".concat(endpoint, "/").concat(editingItem.id), formData);
          case 2:
            alert('Item updated successfully!');
            _context3.n = 5;
            break;
          case 3:
            _context3.n = 4;
            return _lib_api__WEBPACK_IMPORTED_MODULE_2__["default"].post(endpoint, formData);
          case 4:
            alert('Item created successfully!');
          case 5:
            setShowModal(false);
            fetchData();
            _context3.n = 7;
            break;
          case 6:
            _context3.p = 6;
            _t4 = _context3.v;
            console.error('Error saving item:', _t4);
            alert('Failed to save item. Please try again.');
          case 7:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 6]]);
    }));
    return function handleSubmit(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var getEndpoint = function getEndpoint() {
    switch (activeTab) {
      case 'offering_types':
        return '/offering-types';
      case 'expense_categories':
        return '/expense-categories';
      case 'vendors':
        return '/vendors';
      case 'funds':
        return '/funds';
    }
  };
  var getEmptyFormData = function getEmptyFormData() {
    switch (activeTab) {
      case 'offering_types':
      case 'expense_categories':
        return {
          name: '',
          description: '',
          is_active: true
        };
      case 'vendors':
        return {
          name: '',
          contact_name: '',
          email: '',
          phone: '',
          is_active: true
        };
      case 'funds':
        return {
          name: '',
          type: 'unrestricted',
          description: '',
          is_active: true
        };
    }
  };
  var renderTable = function renderTable() {
    if (loading) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-12 text-center",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          className: "mt-2 text-gray-600",
          children: "Loading..."
        })]
      });
    }
    var data = activeTab === 'offering_types' ? offeringTypes : activeTab === 'expense_categories' ? expenseCategories : activeTab === 'vendors' ? vendors : funds;
    if (data.length === 0) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "p-12 text-center text-gray-500",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: "No items found. Click \"Add New\" to create one."
        })
      });
    }
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "overflow-x-auto",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
        className: "w-full",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
          className: "bg-gray-50 border-b border-gray-200",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Name"
            }), activeTab === 'vendors' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Contact"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Email"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Phone"
              })]
            }), activeTab === 'funds' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Type"
            }), (activeTab === 'offering_types' || activeTab === 'expense_categories' || activeTab === 'funds') && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Description"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Status"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
              className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Actions"
            })]
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
          className: "bg-white divide-y divide-gray-200",
          children: data.map(function (item) {
            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
              className: "hover:bg-gray-50",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                children: item.name
              }), activeTab === 'vendors' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: item.contact_name || '-'
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: item.email || '-'
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                  className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                  children: item.phone || '-'
                })]
              }), activeTab === 'funds' && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize",
                children: item.type
              }), (activeTab === 'offering_types' || activeTab === 'expense_categories' || activeTab === 'funds') && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                className: "px-6 py-4 text-sm text-gray-900 max-w-xs truncate",
                children: item.description || '-'
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
                className: "px-6 py-4 whitespace-nowrap text-sm",
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                  className: "px-2 py-1 rounded-full text-xs font-medium ".concat(item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'),
                  children: item.is_active ? 'Active' : 'Inactive'
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium",
                children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                  onClick: function onClick() {
                    return handleEdit(item);
                  },
                  className: "text-blue-600 hover:text-blue-900 mr-3",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_4__["default"], {
                    size: 16,
                    className: "inline"
                  })
                }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                  onClick: function onClick() {
                    return handleDelete(item.id);
                  },
                  className: "text-red-600 hover:text-red-900",
                  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                    size: 16,
                    className: "inline"
                  })
                })]
              })]
            }, item.id);
          })
        })]
      })
    });
  };
  var renderForm = function renderForm() {
    switch (activeTab) {
      case 'offering_types':
      case 'expense_categories':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "text",
              value: formData.name || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  name: e.target.value
                }));
              },
              required: true,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Description"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
              value: formData.description || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  description: e.target.value
                }));
              },
              rows: 3,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "checkbox",
                checked: formData.is_active || false,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    is_active: e.target.checked
                  }));
                },
                className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "ml-2 text-sm text-gray-700",
                children: "Active"
              })]
            })
          })]
        });
      case 'vendors':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Vendor Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "text",
              value: formData.name || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  name: e.target.value
                }));
              },
              required: true,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Contact Name"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "text",
              value: formData.contact_name || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  contact_name: e.target.value
                }));
              },
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Email"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "email",
              value: formData.email || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  email: e.target.value
                }));
              },
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Phone"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "tel",
              value: formData.phone || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  phone: e.target.value
                }));
              },
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "checkbox",
                checked: formData.is_active || false,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    is_active: e.target.checked
                  }));
                },
                className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "ml-2 text-sm text-gray-700",
                children: "Active"
              })]
            })
          })]
        });
      case 'funds':
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Fund Name ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
              type: "text",
              value: formData.name || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  name: e.target.value
                }));
              },
              required: true,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: ["Type ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "text-red-500",
                children: "*"
              })]
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
              value: formData.type || 'unrestricted',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  type: e.target.value
                }));
              },
              required: true,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                value: "unrestricted",
                children: "Unrestricted"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                value: "restricted",
                children: "Restricted"
              })]
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
              className: "block text-sm font-medium text-gray-700 mb-1",
              children: "Description"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("textarea", {
              value: formData.description || '',
              onChange: function onChange(e) {
                return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                  description: e.target.value
                }));
              },
              rows: 3,
              className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
              className: "flex items-center",
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                type: "checkbox",
                checked: formData.is_active || false,
                onChange: function onChange(e) {
                  return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
                    is_active: e.target.checked
                  }));
                },
                className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                className: "ml-2 text-sm text-gray-700",
                children: "Active"
              })]
            })
          })]
        });
    }
  };
  var getTabTitle = function getTabTitle() {
    switch (activeTab) {
      case 'offering_types':
        return 'Offering Types';
      case 'expense_categories':
        return 'Expense Categories';
      case 'vendors':
        return 'Vendors';
      case 'funds':
        return 'Funds';
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "space-y-6",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "flex justify-between items-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
        className: "text-2xl font-bold text-gray-900",
        children: "Finance Settings"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        onClick: handleAdd,
        className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(lucide_react__WEBPACK_IMPORTED_MODULE_5__["default"], {
          size: 20
        }), "Add New"]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      className: "p-4",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex gap-2 overflow-x-auto",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
          onClick: function onClick() {
            return setActiveTab('offering_types');
          },
          className: "px-4 py-2 rounded-lg whitespace-nowrap ".concat(activeTab === 'offering_types' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'),
          children: "Offering Types"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
          onClick: function onClick() {
            return setActiveTab('expense_categories');
          },
          className: "px-4 py-2 rounded-lg whitespace-nowrap ".concat(activeTab === 'expense_categories' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'),
          children: "Expense Categories"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
          onClick: function onClick() {
            return setActiveTab('vendors');
          },
          className: "px-4 py-2 rounded-lg whitespace-nowrap ".concat(activeTab === 'vendors' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'),
          children: "Vendors"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
          onClick: function onClick() {
            return setActiveTab('funds');
          },
          className: "px-4 py-2 rounded-lg whitespace-nowrap ".concat(activeTab === 'funds' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'),
          children: "Funds"
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_card__WEBPACK_IMPORTED_MODULE_3__.Card, {
      children: renderTable()
    }), showModal && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
          className: "text-xl font-bold mb-4",
          children: editingItem ? "Edit ".concat(getTabTitle()) : "Add ".concat(getTabTitle())
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
          onSubmit: handleSubmit,
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "space-y-4",
            children: renderForm()
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex justify-end gap-3 mt-6",
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "button",
              onClick: function onClick() {
                return setShowModal(false);
              },
              className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50",
              children: "Cancel"
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
              type: "submit",
              className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
              children: editingItem ? 'Update' : 'Create'
            })]
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);

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


/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVzb3VyY2VzX2pzX3BhZ2VzX0ZpbmFuY2VfU2V0dGluZ3NfdHN4LmpzP2lkPWE0OTkzZDc1MWMwNTY1NDMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUNBLHVLQUFBQSxDQUFBLEVBQUFDLENBQUEsRUFBQUMsQ0FBQSx3QkFBQUMsTUFBQSxHQUFBQSxNQUFBLE9BQUFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBRyxRQUFBLGtCQUFBQyxDQUFBLEdBQUFKLENBQUEsQ0FBQUssV0FBQSw4QkFBQUMsRUFBQU4sQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBQyxDQUFBLEdBQUFMLENBQUEsSUFBQUEsQ0FBQSxDQUFBTSxTQUFBLFlBQUFDLFNBQUEsR0FBQVAsQ0FBQSxHQUFBTyxTQUFBLEVBQUFDLENBQUEsR0FBQUMsTUFBQSxDQUFBQyxNQUFBLENBQUFMLENBQUEsQ0FBQUMsU0FBQSxVQUFBSyxtQkFBQSxDQUFBSCxDQUFBLHVCQUFBVixDQUFBLEVBQUFFLENBQUEsRUFBQUUsQ0FBQSxRQUFBRSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBSSxDQUFBLE1BQUFDLENBQUEsR0FBQVgsQ0FBQSxRQUFBWSxDQUFBLE9BQUFDLENBQUEsS0FBQUYsQ0FBQSxLQUFBYixDQUFBLEtBQUFnQixDQUFBLEVBQUFwQixDQUFBLEVBQUFxQixDQUFBLEVBQUFDLENBQUEsRUFBQU4sQ0FBQSxFQUFBTSxDQUFBLENBQUFDLElBQUEsQ0FBQXZCLENBQUEsTUFBQXNCLENBQUEsV0FBQUEsRUFBQXJCLENBQUEsRUFBQUMsQ0FBQSxXQUFBTSxDQUFBLEdBQUFQLENBQUEsRUFBQVEsQ0FBQSxNQUFBRyxDQUFBLEdBQUFaLENBQUEsRUFBQW1CLENBQUEsQ0FBQWYsQ0FBQSxHQUFBRixDQUFBLEVBQUFtQixDQUFBLGdCQUFBQyxFQUFBcEIsQ0FBQSxFQUFBRSxDQUFBLFNBQUFLLENBQUEsR0FBQVAsQ0FBQSxFQUFBVSxD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Z2VtZW50LXN5c3RlbS8uL3Jlc291cmNlcy9qcy9wYWdlcy9GaW5hbmNlL1NldHRpbmdzLnRzeCIsIndlYnBhY2s6Ly9jaHVyY2gtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0L2Rpc3QvZXNtL2ljb25zL3NxdWFyZS1wZW4uanMiLCJ3ZWJwYWNrOi8vY2h1cmNoLW1hbmFnZW1lbnQtc3lzdGVtLy4vbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdC9kaXN0L2VzbS9pY29ucy90cmFzaC0yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGpzeCBhcyBfanN4LCBqc3hzIGFzIF9qc3hzLCBGcmFnbWVudCBhcyBfRnJhZ21lbnQgfSBmcm9tIFwicmVhY3QvanN4LXJ1bnRpbWVcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2xpYi9hcGknO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWkvY2FyZCc7XG5pbXBvcnQgeyBQbHVzLCBFZGl0LCBUcmFzaDIgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuY29uc3QgU2V0dGluZ3MgPSAoKSA9PiB7XG4gICAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCdvZmZlcmluZ190eXBlcycpO1xuICAgIGNvbnN0IFtvZmZlcmluZ1R5cGVzLCBzZXRPZmZlcmluZ1R5cGVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbZXhwZW5zZUNhdGVnb3JpZXMsIHNldEV4cGVuc2VDYXRlZ29yaWVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbdmVuZG9ycywgc2V0VmVuZG9yc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2Z1bmRzLCBzZXRGdW5kc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW3Nob3dNb2RhbCwgc2V0U2hvd01vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbZWRpdGluZ0l0ZW0sIHNldEVkaXRpbmdJdGVtXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtmb3JtRGF0YSwgc2V0Rm9ybURhdGFdID0gdXNlU3RhdGUoe30pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZldGNoRGF0YSgpO1xuICAgIH0sIFthY3RpdmVUYWJdKTtcbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICAgICAgc3dpdGNoIChhY3RpdmVUYWIpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdvZmZlcmluZ190eXBlcyc6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9mZmVyaW5nVHlwZXNSZXMgPSBhd2FpdCBhcGkuZ2V0KCcvb2ZmZXJpbmctdHlwZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0T2ZmZXJpbmdUeXBlcyhvZmZlcmluZ1R5cGVzUmVzLmRhdGEuZGF0YSB8fCBbXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4cGVuc2VfY2F0ZWdvcmllcyc6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhdGVnb3JpZXNSZXMgPSBhd2FpdCBhcGkuZ2V0KCcvZXhwZW5zZS1jYXRlZ29yaWVzJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldEV4cGVuc2VDYXRlZ29yaWVzKGNhdGVnb3JpZXNSZXMuZGF0YS5kYXRhIHx8IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndmVuZG9ycyc6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlbmRvcnNSZXMgPSBhd2FpdCBhcGkuZ2V0KCcvdmVuZG9ycycpO1xuICAgICAgICAgICAgICAgICAgICBzZXRWZW5kb3JzKHZlbmRvcnNSZXMuZGF0YS5kYXRhIHx8IFtdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuZHMnOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmdW5kc1JlcyA9IGF3YWl0IGFwaS5nZXQoJy9mdW5kcycpO1xuICAgICAgICAgICAgICAgICAgICBzZXRGdW5kcyhmdW5kc1Jlcy5kYXRhLmRhdGEgfHwgW10pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGRhdGE6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUFkZCA9ICgpID0+IHtcbiAgICAgICAgc2V0RWRpdGluZ0l0ZW0obnVsbCk7XG4gICAgICAgIHNldEZvcm1EYXRhKGdldEVtcHR5Rm9ybURhdGEoKSk7XG4gICAgICAgIHNldFNob3dNb2RhbCh0cnVlKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUVkaXQgPSAoaXRlbSkgPT4ge1xuICAgICAgICBzZXRFZGl0aW5nSXRlbShpdGVtKTtcbiAgICAgICAgc2V0Rm9ybURhdGEoaXRlbSk7XG4gICAgICAgIHNldFNob3dNb2RhbCh0cnVlKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZURlbGV0ZSA9IGFzeW5jIChpZCkgPT4ge1xuICAgICAgICBpZiAoIWNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPycpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZW5kcG9pbnQgPSBnZXRFbmRwb2ludCgpO1xuICAgICAgICAgICAgYXdhaXQgYXBpLmRlbGV0ZShgJHtlbmRwb2ludH0vJHtpZH1gKTtcbiAgICAgICAgICAgIGZldGNoRGF0YSgpO1xuICAgICAgICAgICAgYWxlcnQoJ0l0ZW0gZGVsZXRlZCBzdWNjZXNzZnVsbHkhJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZWxldGluZyBpdGVtOicsIGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gZGVsZXRlIGl0ZW0uIEl0IG1heSBiZSBpbiB1c2UuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGVuZHBvaW50ID0gZ2V0RW5kcG9pbnQoKTtcbiAgICAgICAgICAgIGlmIChlZGl0aW5nSXRlbSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGFwaS5wdXQoYCR7ZW5kcG9pbnR9LyR7ZWRpdGluZ0l0ZW0uaWR9YCwgZm9ybURhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdJdGVtIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgYXBpLnBvc3QoZW5kcG9pbnQsIGZvcm1EYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnSXRlbSBjcmVhdGVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFNob3dNb2RhbChmYWxzZSk7XG4gICAgICAgICAgICBmZXRjaERhdGEoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNhdmluZyBpdGVtOicsIGVycm9yKTtcbiAgICAgICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gc2F2ZSBpdGVtLiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRFbmRwb2ludCA9ICgpID0+IHtcbiAgICAgICAgc3dpdGNoIChhY3RpdmVUYWIpIHtcbiAgICAgICAgICAgIGNhc2UgJ29mZmVyaW5nX3R5cGVzJzogcmV0dXJuICcvb2ZmZXJpbmctdHlwZXMnO1xuICAgICAgICAgICAgY2FzZSAnZXhwZW5zZV9jYXRlZ29yaWVzJzogcmV0dXJuICcvZXhwZW5zZS1jYXRlZ29yaWVzJztcbiAgICAgICAgICAgIGNhc2UgJ3ZlbmRvcnMnOiByZXR1cm4gJy92ZW5kb3JzJztcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmRzJzogcmV0dXJuICcvZnVuZHMnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRFbXB0eUZvcm1EYXRhID0gKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGFjdGl2ZVRhYikge1xuICAgICAgICAgICAgY2FzZSAnb2ZmZXJpbmdfdHlwZXMnOlxuICAgICAgICAgICAgY2FzZSAnZXhwZW5zZV9jYXRlZ29yaWVzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4geyBuYW1lOiAnJywgZGVzY3JpcHRpb246ICcnLCBpc19hY3RpdmU6IHRydWUgfTtcbiAgICAgICAgICAgIGNhc2UgJ3ZlbmRvcnMnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7IG5hbWU6ICcnLCBjb250YWN0X25hbWU6ICcnLCBlbWFpbDogJycsIHBob25lOiAnJywgaXNfYWN0aXZlOiB0cnVlIH07XG4gICAgICAgICAgICBjYXNlICdmdW5kcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogJycsIHR5cGU6ICd1bnJlc3RyaWN0ZWQnLCBkZXNjcmlwdGlvbjogJycsIGlzX2FjdGl2ZTogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCByZW5kZXJUYWJsZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicC0xMiB0ZXh0LWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW5saW5lLWJsb2NrIGFuaW1hdGUtc3BpbiByb3VuZGVkLWZ1bGwgaC04IHctOCBib3JkZXItYi0yIGJvcmRlci1ibHVlLTYwMFwiIH0pLCBfanN4KFwicFwiLCB7IGNsYXNzTmFtZTogXCJtdC0yIHRleHQtZ3JheS02MDBcIiwgY2hpbGRyZW46IFwiTG9hZGluZy4uLlwiIH0pXSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGFjdGl2ZVRhYiA9PT0gJ29mZmVyaW5nX3R5cGVzJyA/IG9mZmVyaW5nVHlwZXMgOlxuICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnZXhwZW5zZV9jYXRlZ29yaWVzJyA/IGV4cGVuc2VDYXRlZ29yaWVzIDpcbiAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICd2ZW5kb3JzJyA/IHZlbmRvcnMgOiBmdW5kcztcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicC0xMiB0ZXh0LWNlbnRlciB0ZXh0LWdyYXktNTAwXCIsIGNoaWxkcmVuOiBfanN4KFwicFwiLCB7IGNoaWxkcmVuOiBcIk5vIGl0ZW1zIGZvdW5kLiBDbGljayBcXFwiQWRkIE5ld1xcXCIgdG8gY3JlYXRlIG9uZS5cIiB9KSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm92ZXJmbG93LXgtYXV0b1wiLCBjaGlsZHJlbjogX2pzeHMoXCJ0YWJsZVwiLCB7IGNsYXNzTmFtZTogXCJ3LWZ1bGxcIiwgY2hpbGRyZW46IFtfanN4KFwidGhlYWRcIiwgeyBjbGFzc05hbWU6IFwiYmctZ3JheS01MCBib3JkZXItYiBib3JkZXItZ3JheS0yMDBcIiwgY2hpbGRyZW46IF9qc3hzKFwidHJcIiwgeyBjaGlsZHJlbjogW19qc3goXCJ0aFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTMgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiTmFtZVwiIH0pLCBhY3RpdmVUYWIgPT09ICd2ZW5kb3JzJyAmJiAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJDb250YWN0XCIgfSksIF9qc3goXCJ0aFwiLCB7IGNsYXNzTmFtZTogXCJweC02IHB5LTMgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiRW1haWxcIiB9KSwgX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJQaG9uZVwiIH0pXSB9KSksIGFjdGl2ZVRhYiA9PT0gJ2Z1bmRzJyAmJiAoX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJUeXBlXCIgfSkpLCAoYWN0aXZlVGFiID09PSAnb2ZmZXJpbmdfdHlwZXMnIHx8IGFjdGl2ZVRhYiA9PT0gJ2V4cGVuc2VfY2F0ZWdvcmllcycgfHwgYWN0aXZlVGFiID09PSAnZnVuZHMnKSAmJiAoX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJEZXNjcmlwdGlvblwiIH0pKSwgX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiLCBjaGlsZHJlbjogXCJTdGF0dXNcIiB9KSwgX2pzeChcInRoXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktMyB0ZXh0LXJpZ2h0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIiwgY2hpbGRyZW46IFwiQWN0aW9uc1wiIH0pXSB9KSB9KSwgX2pzeChcInRib2R5XCIsIHsgY2xhc3NOYW1lOiBcImJnLXdoaXRlIGRpdmlkZS15IGRpdmlkZS1ncmF5LTIwMFwiLCBjaGlsZHJlbjogZGF0YS5tYXAoKGl0ZW0pID0+IChfanN4cyhcInRyXCIsIHsgY2xhc3NOYW1lOiBcImhvdmVyOmJnLWdyYXktNTBcIiwgY2hpbGRyZW46IFtfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogaXRlbS5uYW1lIH0pLCBhY3RpdmVUYWIgPT09ICd2ZW5kb3JzJyAmJiAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbX2pzeChcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNCB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXNtIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IGl0ZW0uY29udGFjdF9uYW1lIHx8ICctJyB9KSwgX2pzeChcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNCB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXNtIHRleHQtZ3JheS05MDBcIiwgY2hpbGRyZW46IGl0ZW0uZW1haWwgfHwgJy0nIH0pLCBfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1ncmF5LTkwMFwiLCBjaGlsZHJlbjogaXRlbS5waG9uZSB8fCAnLScgfSldIH0pKSwgYWN0aXZlVGFiID09PSAnZnVuZHMnICYmIChfanN4KFwidGRcIiwgeyBjbGFzc05hbWU6IFwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1ncmF5LTkwMCBjYXBpdGFsaXplXCIsIGNoaWxkcmVuOiBpdGVtLnR5cGUgfSkpLCAoYWN0aXZlVGFiID09PSAnb2ZmZXJpbmdfdHlwZXMnIHx8IGFjdGl2ZVRhYiA9PT0gJ2V4cGVuc2VfY2F0ZWdvcmllcycgfHwgYWN0aXZlVGFiID09PSAnZnVuZHMnKSAmJiAoX2pzeChcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNCB0ZXh0LXNtIHRleHQtZ3JheS05MDAgbWF4LXcteHMgdHJ1bmNhdGVcIiwgY2hpbGRyZW46IGl0ZW0uZGVzY3JpcHRpb24gfHwgJy0nIH0pKSwgX2pzeChcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNCB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXNtXCIsIGNoaWxkcmVuOiBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogYHB4LTIgcHktMSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LW1lZGl1bSAke2l0ZW0uaXNfYWN0aXZlID8gJ2JnLWdyZWVuLTEwMCB0ZXh0LWdyZWVuLTgwMCcgOiAnYmctZ3JheS0xMDAgdGV4dC1ncmF5LTgwMCd9YCwgY2hpbGRyZW46IGl0ZW0uaXNfYWN0aXZlID8gJ0FjdGl2ZScgOiAnSW5hY3RpdmUnIH0pIH0pLCBfanN4cyhcInRkXCIsIHsgY2xhc3NOYW1lOiBcInB4LTYgcHktNCB3aGl0ZXNwYWNlLW5vd3JhcCB0ZXh0LXJpZ2h0IHRleHQtc20gZm9udC1tZWRpdW1cIiwgY2hpbGRyZW46IFtfanN4KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gaGFuZGxlRWRpdChpdGVtKSwgY2xhc3NOYW1lOiBcInRleHQtYmx1ZS02MDAgaG92ZXI6dGV4dC1ibHVlLTkwMCBtci0zXCIsIGNoaWxkcmVuOiBfanN4KEVkaXQsIHsgc2l6ZTogMTYsIGNsYXNzTmFtZTogXCJpbmxpbmVcIiB9KSB9KSwgX2pzeChcImJ1dHRvblwiLCB7IG9uQ2xpY2s6ICgpID0+IGhhbmRsZURlbGV0ZShpdGVtLmlkKSwgY2xhc3NOYW1lOiBcInRleHQtcmVkLTYwMCBob3Zlcjp0ZXh0LXJlZC05MDBcIiwgY2hpbGRyZW46IF9qc3goVHJhc2gyLCB7IHNpemU6IDE2LCBjbGFzc05hbWU6IFwiaW5saW5lXCIgfSkgfSldIH0pXSB9LCBpdGVtLmlkKSkpIH0pXSB9KSB9KSk7XG4gICAgfTtcbiAgICBjb25zdCByZW5kZXJGb3JtID0gKCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGFjdGl2ZVRhYikge1xuICAgICAgICAgICAgY2FzZSAnb2ZmZXJpbmdfdHlwZXMnOlxuICAgICAgICAgICAgY2FzZSAnZXhwZW5zZV9jYXRlZ29yaWVzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9qc3hzKF9GcmFnbWVudCwgeyBjaGlsZHJlbjogW19qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBbXCJOYW1lIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5uYW1lIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pLCByZXF1aXJlZDogdHJ1ZSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJEZXNjcmlwdGlvblwiIH0pLCBfanN4KFwidGV4dGFyZWFcIiwgeyB2YWx1ZTogZm9ybURhdGEuZGVzY3JpcHRpb24gfHwgJycsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgZGVzY3JpcHRpb246IGUudGFyZ2V0LnZhbHVlIH0pLCByb3dzOiAzLCBjbGFzc05hbWU6IFwidy1mdWxsIHB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctYmx1ZS01MDAgZm9jdXM6Ym9yZGVyLXRyYW5zcGFyZW50XCIgfSldIH0pLCBfanN4KFwiZGl2XCIsIHsgY2hpbGRyZW46IF9qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBpdGVtcy1jZW50ZXJcIiwgY2hpbGRyZW46IFtfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNoZWNrZWQ6IGZvcm1EYXRhLmlzX2FjdGl2ZSB8fCBmYWxzZSwgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBpc19hY3RpdmU6IGUudGFyZ2V0LmNoZWNrZWQgfSksIGNsYXNzTmFtZTogXCJoLTQgdy00IHRleHQtYmx1ZS02MDAgZm9jdXM6cmluZy1ibHVlLTUwMCBib3JkZXItZ3JheS0zMDAgcm91bmRlZFwiIH0pLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJtbC0yIHRleHQtc20gdGV4dC1ncmF5LTcwMFwiLCBjaGlsZHJlbjogXCJBY3RpdmVcIiB9KV0gfSkgfSldIH0pKTtcbiAgICAgICAgICAgIGNhc2UgJ3ZlbmRvcnMnOlxuICAgICAgICAgICAgICAgIHJldHVybiAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIlZlbmRvciBOYW1lIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5uYW1lIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pLCByZXF1aXJlZDogdHJ1ZSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJDb250YWN0IE5hbWVcIiB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5jb250YWN0X25hbWUgfHwgJycsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgY29udGFjdF9uYW1lOiBlLnRhcmdldC52YWx1ZSB9KSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3goXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogXCJFbWFpbFwiIH0pLCBfanN4KFwiaW5wdXRcIiwgeyB0eXBlOiBcImVtYWlsXCIsIHZhbHVlOiBmb3JtRGF0YS5lbWFpbCB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBlbWFpbDogZS50YXJnZXQudmFsdWUgfSksIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiB9KV0gfSksIF9qc3hzKFwiZGl2XCIsIHsgY2hpbGRyZW46IFtfanN4KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFwiUGhvbmVcIiB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZWxcIiwgdmFsdWU6IGZvcm1EYXRhLnBob25lIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIHBob25lOiBlLnRhcmdldC52YWx1ZSB9KSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KSwgX2pzeChcImRpdlwiLCB7IGNoaWxkcmVuOiBfanN4cyhcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImZsZXggaXRlbXMtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBjaGVja2VkOiBmb3JtRGF0YS5pc19hY3RpdmUgfHwgZmFsc2UsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Rm9ybURhdGEoeyAuLi5mb3JtRGF0YSwgaXNfYWN0aXZlOiBlLnRhcmdldC5jaGVja2VkIH0pLCBjbGFzc05hbWU6IFwiaC00IHctNCB0ZXh0LWJsdWUtNjAwIGZvY3VzOnJpbmctYmx1ZS01MDAgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWRcIiB9KSwgX2pzeChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwibWwtMiB0ZXh0LXNtIHRleHQtZ3JheS03MDBcIiwgY2hpbGRyZW46IFwiQWN0aXZlXCIgfSldIH0pIH0pXSB9KSk7XG4gICAgICAgICAgICBjYXNlICdmdW5kcyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4cyhfRnJhZ21lbnQsIHsgY2hpbGRyZW46IFtfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeHMoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgbWItMVwiLCBjaGlsZHJlbjogW1wiRnVuZCBOYW1lIFwiLCBfanN4KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXJlZC01MDBcIiwgY2hpbGRyZW46IFwiKlwiIH0pXSB9KSwgX2pzeChcImlucHV0XCIsIHsgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBmb3JtRGF0YS5uYW1lIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pLCByZXF1aXJlZDogdHJ1ZSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiIH0pXSB9KSwgX2pzeHMoXCJkaXZcIiwgeyBjaGlsZHJlbjogW19qc3hzKFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2sgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktNzAwIG1iLTFcIiwgY2hpbGRyZW46IFtcIlR5cGUgXCIsIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtcmVkLTUwMFwiLCBjaGlsZHJlbjogXCIqXCIgfSldIH0pLCBfanN4cyhcInNlbGVjdFwiLCB7IHZhbHVlOiBmb3JtRGF0YS50eXBlIHx8ICd1bnJlc3RyaWN0ZWQnLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIHR5cGU6IGUudGFyZ2V0LnZhbHVlIH0pLCByZXF1aXJlZDogdHJ1ZSwgY2xhc3NOYW1lOiBcInctZnVsbCBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkLWxnIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWJsdWUtNTAwIGZvY3VzOmJvcmRlci10cmFuc3BhcmVudFwiLCBjaGlsZHJlbjogW19qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJ1bnJlc3RyaWN0ZWRcIiwgY2hpbGRyZW46IFwiVW5yZXN0cmljdGVkXCIgfSksIF9qc3goXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJyZXN0cmljdGVkXCIsIGNoaWxkcmVuOiBcIlJlc3RyaWN0ZWRcIiB9KV0gfSldIH0pLCBfanN4cyhcImRpdlwiLCB7IGNoaWxkcmVuOiBbX2pzeChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMCBtYi0xXCIsIGNoaWxkcmVuOiBcIkRlc2NyaXB0aW9uXCIgfSksIF9qc3goXCJ0ZXh0YXJlYVwiLCB7IHZhbHVlOiBmb3JtRGF0YS5kZXNjcmlwdGlvbiB8fCAnJywgb25DaGFuZ2U6IChlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBkZXNjcmlwdGlvbjogZS50YXJnZXQudmFsdWUgfSksIHJvd3M6IDMsIGNsYXNzTmFtZTogXCJ3LWZ1bGwgcHgtNCBweS0yIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZC1sZyBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1ibHVlLTUwMCBmb2N1czpib3JkZXItdHJhbnNwYXJlbnRcIiB9KV0gfSksIF9qc3goXCJkaXZcIiwgeyBjaGlsZHJlbjogX2pzeHMoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlclwiLCBjaGlsZHJlbjogW19qc3goXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgY2hlY2tlZDogZm9ybURhdGEuaXNfYWN0aXZlIHx8IGZhbHNlLCBvbkNoYW5nZTogKGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIGlzX2FjdGl2ZTogZS50YXJnZXQuY2hlY2tlZCB9KSwgY2xhc3NOYW1lOiBcImgtNCB3LTQgdGV4dC1ibHVlLTYwMCBmb2N1czpyaW5nLWJsdWUtNTAwIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkXCIgfSksIF9qc3goXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcIm1sLTIgdGV4dC1zbSB0ZXh0LWdyYXktNzAwXCIsIGNoaWxkcmVuOiBcIkFjdGl2ZVwiIH0pXSB9KSB9KV0gfSkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRUYWJUaXRsZSA9ICgpID0+IHtcbiAgICAgICAgc3dpdGNoIChhY3RpdmVUYWIpIHtcbiAgICAgICAgICAgIGNhc2UgJ29mZmVyaW5nX3R5cGVzJzogcmV0dXJuICdPZmZlcmluZyBUeXBlcyc7XG4gICAgICAgICAgICBjYXNlICdleHBlbnNlX2NhdGVnb3JpZXMnOiByZXR1cm4gJ0V4cGVuc2UgQ2F0ZWdvcmllcyc7XG4gICAgICAgICAgICBjYXNlICd2ZW5kb3JzJzogcmV0dXJuICdWZW5kb3JzJztcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmRzJzogcmV0dXJuICdGdW5kcyc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiAoX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwic3BhY2UteS02XCIsIGNoaWxkcmVuOiBbX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCIsIGNoaWxkcmVuOiBbX2pzeChcImgyXCIsIHsgY2xhc3NOYW1lOiBcInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwXCIsIGNoaWxkcmVuOiBcIkZpbmFuY2UgU2V0dGluZ3NcIiB9KSwgX2pzeHMoXCJidXR0b25cIiwgeyBvbkNsaWNrOiBoYW5kbGVBZGQsIGNsYXNzTmFtZTogXCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgYmctYmx1ZS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGhvdmVyOmJnLWJsdWUtNzAwXCIsIGNoaWxkcmVuOiBbX2pzeChQbHVzLCB7IHNpemU6IDIwIH0pLCBcIkFkZCBOZXdcIl0gfSldIH0pLCBfanN4KENhcmQsIHsgY2xhc3NOYW1lOiBcInAtNFwiLCBjaGlsZHJlbjogX2pzeHMoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleCBnYXAtMiBvdmVyZmxvdy14LWF1dG9cIiwgY2hpbGRyZW46IFtfanN4KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0QWN0aXZlVGFiKCdvZmZlcmluZ190eXBlcycpLCBjbGFzc05hbWU6IGBweC00IHB5LTIgcm91bmRlZC1sZyB3aGl0ZXNwYWNlLW5vd3JhcCAke2FjdGl2ZVRhYiA9PT0gJ29mZmVyaW5nX3R5cGVzJyA/ICdiZy1ibHVlLTYwMCB0ZXh0LXdoaXRlJyA6ICdiZy1ncmF5LTEwMCB0ZXh0LWdyYXktNzAwIGhvdmVyOmJnLWdyYXktMjAwJ31gLCBjaGlsZHJlbjogXCJPZmZlcmluZyBUeXBlc1wiIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0QWN0aXZlVGFiKCdleHBlbnNlX2NhdGVnb3JpZXMnKSwgY2xhc3NOYW1lOiBgcHgtNCBweS0yIHJvdW5kZWQtbGcgd2hpdGVzcGFjZS1ub3dyYXAgJHthY3RpdmVUYWIgPT09ICdleHBlbnNlX2NhdGVnb3JpZXMnID8gJ2JnLWJsdWUtNjAwIHRleHQtd2hpdGUnIDogJ2JnLWdyYXktMTAwIHRleHQtZ3JheS03MDAgaG92ZXI6YmctZ3JheS0yMDAnfWAsIGNoaWxkcmVuOiBcIkV4cGVuc2UgQ2F0ZWdvcmllc1wiIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0QWN0aXZlVGFiKCd2ZW5kb3JzJyksIGNsYXNzTmFtZTogYHB4LTQgcHktMiByb3VuZGVkLWxnIHdoaXRlc3BhY2Utbm93cmFwICR7YWN0aXZlVGFiID09PSAndmVuZG9ycycgPyAnYmctYmx1ZS02MDAgdGV4dC13aGl0ZScgOiAnYmctZ3JheS0xMDAgdGV4dC1ncmF5LTcwMCBob3ZlcjpiZy1ncmF5LTIwMCd9YCwgY2hpbGRyZW46IFwiVmVuZG9yc1wiIH0pLCBfanN4KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gc2V0QWN0aXZlVGFiKCdmdW5kcycpLCBjbGFzc05hbWU6IGBweC00IHB5LTIgcm91bmRlZC1sZyB3aGl0ZXNwYWNlLW5vd3JhcCAke2FjdGl2ZVRhYiA9PT0gJ2Z1bmRzJyA/ICdiZy1ibHVlLTYwMCB0ZXh0LXdoaXRlJyA6ICdiZy1ncmF5LTEwMCB0ZXh0LWdyYXktNzAwIGhvdmVyOmJnLWdyYXktMjAwJ31gLCBjaGlsZHJlbjogXCJGdW5kc1wiIH0pXSB9KSB9KSwgX2pzeChDYXJkLCB7IGNoaWxkcmVuOiByZW5kZXJUYWJsZSgpIH0pLCBzaG93TW9kYWwgJiYgKF9qc3goXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZml4ZWQgaW5zZXQtMCBiZy1ibGFjayBiZy1vcGFjaXR5LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHotNTBcIiwgY2hpbGRyZW46IF9qc3hzKFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJnLXdoaXRlIHJvdW5kZWQtbGcgcC02IHctZnVsbCBtYXgtdy0yeGwgbWF4LWgtWzkwdmhdIG92ZXJmbG93LXktYXV0b1wiLCBjaGlsZHJlbjogW19qc3goXCJoM1wiLCB7IGNsYXNzTmFtZTogXCJ0ZXh0LXhsIGZvbnQtYm9sZCBtYi00XCIsIGNoaWxkcmVuOiBlZGl0aW5nSXRlbSA/IGBFZGl0ICR7Z2V0VGFiVGl0bGUoKX1gIDogYEFkZCAke2dldFRhYlRpdGxlKCl9YCB9KSwgX2pzeHMoXCJmb3JtXCIsIHsgb25TdWJtaXQ6IGhhbmRsZVN1Ym1pdCwgY2hpbGRyZW46IFtfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInNwYWNlLXktNFwiLCBjaGlsZHJlbjogcmVuZGVyRm9ybSgpIH0pLCBfanN4cyhcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmbGV4IGp1c3RpZnktZW5kIGdhcC0zIG10LTZcIiwgY2hpbGRyZW46IFtfanN4KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgb25DbGljazogKCkgPT4gc2V0U2hvd01vZGFsKGZhbHNlKSwgY2xhc3NOYW1lOiBcInB4LTQgcHktMiBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgaG92ZXI6YmctZ3JheS01MFwiLCBjaGlsZHJlbjogXCJDYW5jZWxcIiB9KSwgX2pzeChcImJ1dHRvblwiLCB7IHR5cGU6IFwic3VibWl0XCIsIGNsYXNzTmFtZTogXCJweC00IHB5LTIgYmctYmx1ZS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGhvdmVyOmJnLWJsdWUtNzAwXCIsIGNoaWxkcmVuOiBlZGl0aW5nSXRlbSA/ICdVcGRhdGUnIDogJ0NyZWF0ZScgfSldIH0pXSB9KV0gfSkgfSkpXSB9KSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3M7XG4iLCIvKipcbiAqIEBsaWNlbnNlIGx1Y2lkZS1yZWFjdCB2MC41NTMuMCAtIElTQ1xuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIElTQyBsaWNlbnNlLlxuICogU2VlIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IGNyZWF0ZUx1Y2lkZUljb24gZnJvbSAnLi4vY3JlYXRlTHVjaWRlSWNvbi5qcyc7XG5cbmNvbnN0IF9faWNvbk5vZGUgPSBbXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xMiAzSDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJ2LTdcIiwga2V5OiBcIjFtMHY2Z1wiIH1dLFxuICBbXG4gICAgXCJwYXRoXCIsXG4gICAge1xuICAgICAgZDogXCJNMTguMzc1IDIuNjI1YTEgMSAwIDAgMSAzIDNsLTkuMDEzIDkuMDE0YTIgMiAwIDAgMS0uODUzLjUwNWwtMi44NzMuODRhLjUuNSAwIDAgMS0uNjItLjYybC44NC0yLjg3M2EyIDIgMCAwIDEgLjUwNi0uODUyelwiLFxuICAgICAga2V5OiBcIm9ocmJnMlwiXG4gICAgfVxuICBdXG5dO1xuY29uc3QgU3F1YXJlUGVuID0gY3JlYXRlTHVjaWRlSWNvbihcInNxdWFyZS1wZW5cIiwgX19pY29uTm9kZSk7XG5cbmV4cG9ydCB7IF9faWNvbk5vZGUsIFNxdWFyZVBlbiBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zcXVhcmUtcGVuLmpzLm1hcFxuIiwiLyoqXG4gKiBAbGljZW5zZSBsdWNpZGUtcmVhY3QgdjAuNTUzLjAgLSBJU0NcbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBJU0MgbGljZW5zZS5cbiAqIFNlZSB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBjcmVhdGVMdWNpZGVJY29uIGZyb20gJy4uL2NyZWF0ZUx1Y2lkZUljb24uanMnO1xuXG5jb25zdCBfX2ljb25Ob2RlID0gW1xuICBbXCJwYXRoXCIsIHsgZDogXCJNMTAgMTF2NlwiLCBrZXk6IFwibmNvMG9tXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0xNCAxMXY2XCIsIGtleTogXCJvdXR2MXVcIiB9XSxcbiAgW1wicGF0aFwiLCB7IGQ6IFwiTTE5IDZ2MTRhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJWNlwiLCBrZXk6IFwibWl5dHJjXCIgfV0sXG4gIFtcInBhdGhcIiwgeyBkOiBcIk0zIDZoMThcIiwga2V5OiBcImQwd20walwiIH1dLFxuICBbXCJwYXRoXCIsIHsgZDogXCJNOCA2VjRhMiAyIDAgMCAxIDItMmg0YTIgMiAwIDAgMSAyIDJ2MlwiLCBrZXk6IFwiZTc5MWppXCIgfV1cbl07XG5jb25zdCBUcmFzaDIgPSBjcmVhdGVMdWNpZGVJY29uKFwidHJhc2gtMlwiLCBfX2ljb25Ob2RlKTtcblxuZXhwb3J0IHsgX19pY29uTm9kZSwgVHJhc2gyIGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyYXNoLTIuanMubWFwXG4iXSwibmFtZXMiOlsiZSIsInQiLCJyIiwiU3ltYm9sIiwibiIsIml0ZXJhdG9yIiwibyIsInRvU3RyaW5nVGFnIiwiaSIsImMiLCJwcm90b3R5cGUiLCJHZW5lcmF0b3IiLCJ1IiwiT2JqZWN0IiwiY3JlYXRlIiwiX3JlZ2VuZXJhdG9yRGVmaW5lMiIsImYiLCJwIiwieSIsIkciLCJ2IiwiYSIsImQiLCJiaW5kIiwibGVuZ3RoIiwibCIsIlR5cGVFcnJvciIsImNhbGwiLCJkb25lIiwidmFsdWUiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImRpc3BsYXlOYW1lIiwiX3JlZ2VuZXJhdG9yIiwidyIsIm0iLCJkZWZpbmVQcm9wZXJ0eSIsIl9yZWdlbmVyYXRvckRlZmluZSIsIl9pbnZva2UiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJQcm9taXNlIiwicmVzb2x2ZSIsInRoZW4iLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibmV4dCIsInB1c2giLCJpc0FycmF5IiwianN4IiwiX2pzeCIsImpzeHMiLCJfanN4cyIsIkZyYWdtZW50IiwiX0ZyYWdtZW50IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJhcGkiLCJDYXJkIiwiUGx1cyIsIkVkaXQiLCJUcmFzaDIiLCJTZXR0aW5ncyIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJhY3RpdmVUYWIiLCJzZXRBY3RpdmVUYWIiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsIm9mZmVyaW5nVHlwZXMiLCJzZXRPZmZlcmluZ1R5cGVzIiwiX3VzZVN0YXRlNSIsIl91c2VTdGF0ZTYiLCJleHBlbnNlQ2F0ZWdvcmllcyIsInNldEV4cGVuc2VDYXRlZ29yaWVzIiwiX3VzZVN0YXRlNyIsIl91c2VTdGF0ZTgiLCJ2ZW5kb3JzIiwic2V0VmVuZG9ycyIsIl91c2VTdGF0ZTkiLCJfdXNlU3RhdGUwIiwiZnVuZHMiLCJzZXRGdW5kcyIsIl91c2VTdGF0ZTEiLCJfdXNlU3RhdGUxMCIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiX3VzZVN0YXRlMTEiLCJfdXNlU3RhdGUxMiIsInNob3dNb2RhbCIsInNldFNob3dNb2RhbCIsIl91c2VTdGF0ZTEzIiwiX3VzZVN0YXRlMTQiLCJlZGl0aW5nSXRlbSIsInNldEVkaXRpbmdJdGVtIiwiX3VzZVN0YXRlMTUiLCJfdXNlU3RhdGUxNiIsImZvcm1EYXRhIiwic2V0Rm9ybURhdGEiLCJmZXRjaERhdGEiLCJfcmVmIiwiX2NhbGxlZSIsIm9mZmVyaW5nVHlwZXNSZXMiLCJjYXRlZ29yaWVzUmVzIiwidmVuZG9yc1JlcyIsImZ1bmRzUmVzIiwiX3QiLCJfdDIiLCJfY29udGV4dCIsImdldCIsImRhdGEiLCJjb25zb2xlIiwiZXJyb3IiLCJoYW5kbGVBZGQiLCJnZXRFbXB0eUZvcm1EYXRhIiwiaGFuZGxlRWRpdCIsIml0ZW0iLCJoYW5kbGVEZWxldGUiLCJfcmVmMiIsIl9jYWxsZWUyIiwiaWQiLCJlbmRwb2ludCIsIl90MyIsIl9jb250ZXh0MiIsImNvbmZpcm0iLCJnZXRFbmRwb2ludCIsImNvbmNhdCIsImFsZXJ0IiwiX3giLCJoYW5kbGVTdWJtaXQiLCJfcmVmMyIsIl9jYWxsZWUzIiwiX3Q0IiwiX2NvbnRleHQzIiwicHJldmVudERlZmF1bHQiLCJwdXQiLCJwb3N0IiwiX3gyIiwiZGVzY3JpcHRpb24iLCJpc19hY3RpdmUiLCJjb250YWN0X25hbWUiLCJlbWFpbCIsInBob25lIiwidHlwZSIsInJlbmRlclRhYmxlIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJtYXAiLCJvbkNsaWNrIiwic2l6ZSIsInJlbmRlckZvcm0iLCJvbkNoYW5nZSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJyZXF1aXJlZCIsInJvd3MiLCJjaGVja2VkIiwiZ2V0VGFiVGl0bGUiLCJvblN1Ym1pdCJdLCJzb3VyY2VSb290IjoiIn0=