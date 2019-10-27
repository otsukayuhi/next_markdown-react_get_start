webpackHotUpdate("static/development/pages/index.js",{

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/App */ "./src/components/App.js");
/* harmony import */ var _gateway_posts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gateway/posts */ "./src/gateway/posts.js");
/* harmony import */ var _components_pages_indexStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/pages/indexStyle */ "./src/components/pages/indexStyle.js");
var _jsxFileName = "/Users/y_otsuka/Desktop/191024_demo/src/pages/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






var Index = function Index() {
  var items = _gateway_posts__WEBPACK_IMPORTED_MODULE_3__["post"].map(function (item, index) {
    var title = item.title,
        id = item.id;
    return __jsx(_components_pages_indexStyle__WEBPACK_IMPORTED_MODULE_4__["ItemStyle"], {
      key: id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: this
    }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
      href: "/docs/[id]",
      as: "/docs/".concat(id),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, __jsx("a", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, "".concat(index + 1, ". ").concat(title))));
  });
  return __jsx(_components_App__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, __jsx(_components_pages_indexStyle__WEBPACK_IMPORTED_MODULE_4__["WrapperStyle"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, __jsx(_components_pages_indexStyle__WEBPACK_IMPORTED_MODULE_4__["HeadingWrapper"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, __jsx(_components_pages_indexStyle__WEBPACK_IMPORTED_MODULE_4__["HeadingStyle"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, "React\u52C9\u5F37\u4F1A #1", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }), "-\u3086\u308B\u3075\u308F\u8D85\u5165\u9580\u7DE8-")), __jsx(_components_pages_indexStyle__WEBPACK_IMPORTED_MODULE_4__["LeadStyle"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, "\u672C\u65E5\u306ELINE UP"), __jsx(_components_pages_indexStyle__WEBPACK_IMPORTED_MODULE_4__["ListStyle"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, items)));
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ })

})
//# sourceMappingURL=index.js.b029c4db3ec8422cfd89.hot-update.js.map