/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","react","react-dom","../babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("react"),require("react-dom"),require("../babelHelpers"));else{var r={exports:{}};t(r.exports,e.react,e.reactDom,e.babelHelpers),e.commander=r.exports}}(this,function(exports,e,t,r){"use strict";function n(e){return function(t){if(!a)a=document.createElement("div"),a.className="melon-seperate-dialog-container",document.body.appendChild(a);var n=document.createElement("div");return a.appendChild(n),o["default"].render(i["default"].createElement(e,r["extends"]({},t,{open:!0})),n),function(){o["default"].unmountComponentAtNode(n),a.removeChild(n),n=null}}}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=n;var i=r.interopRequireDefault(e),o=r.interopRequireDefault(t),a=null});