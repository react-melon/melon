/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","./classname","./hyphenate","./pascalize","../../config","../../babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("./classname"),require("./hyphenate"),require("./pascalize"),require("../../config"),require("../../babelHelpers"));else{var r={exports:{}};t(r.exports,e.classname,e.hyphenate,e.pascalize,e.config,e.babelHelpers),e.cxBuilder=r.exports}}(this,function(exports,e,t,r,i,n){"use strict";function o(t){return function(){return e.createClasses.apply(void 0,arguments).map(function(e){return t+"-"+e}).join(" ")}}function a(e){var t=e.variants,r=void 0===t?[]:t,n=e.size;return i.COMPONENT_SIZES.indexOf(n)>-1?r.concat("size-"+n):r}function s(e){var t=e.states,r=e.hidden,i=e.disabled,o=e.validity,a=o?o.isValid():null;return n["extends"]({},t,{hidden:r,disabled:i,invalid:a===!1,valid:a===!0})}function l(t){function r(e){var t=i.COMPONENT_CLASS_PREFIX+"-"+f;return e?t+"-"+e:t}function l(t){function i(e){return y=e,x}function o(e){return b=n["extends"]({},b,e),x}function l(e){return b[e]=!0,x}function u(){return b={},x}function p(){for(var e=arguments.length,t=Array(e),r=0;e>r;r++)t[r]=arguments[r];return v=[].concat(v,t),x}function c(e){return v=v.filter(function(t){return t!==e}),x}function d(){return v=[],x}function f(){return e.createClassName(t.className,r(y),h(v),m(b))}var y="",b=s(t),v=a(t),x={addStates:o,removeStates:l,clearStates:u,addVariants:p,removeVariants:c,clearVariants:d,build:f,part:i};return x}function c(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return l(e)}var d=p["default"](t),f=u["default"](d),h=o(i.COMPONENT_VARIANT_PREFIX),m=o(i.COMPONENT_STATE_PREFIX);return c.getPartClassName=r,c.getDisplayName=function(){return d},c}Object.defineProperty(exports,"__esModule",{value:!0}),exports.create=l;var u=n.interopRequireDefault(t),p=n.interopRequireDefault(r)});