/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","react","react-motion","./common/util/cxBuilder","./babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("react"),require("react-motion"),require("./common/util/cxBuilder"),require("./babelHelpers"));else{var r={exports:{}};t(r.exports,e.react,e.reactMotion,e.cxBuilder,e.babelHelpers),e.Zippy=r.exports}}(this,function(exports,e,t,r,i){"use strict";function o(e,t){var r;return r={},r[e?"overflowX":"overflowY"]="hidden",r[e?"width":"height"]=Math.round(t),r}Object.defineProperty(exports,"__esModule",{value:!0});var n=i.interopRequireDefault(e),a=r.create("Zippy"),l=function(e){function r(){return i.classCallCheck(this,r),i.possibleConstructorReturn(this,e.apply(this,arguments))}return i.inherits(r,e),r.prototype.render=function(){var e=this.props,r=e.expand,l=e.size,s=e.children,u=e.horizontal,p=(e.value,e.style),d=i.objectWithoutProperties(e,["expand","size","children","horizontal","value","style"]),c=a(e).addStates({expand:r}).build();return n["default"].createElement(t.Motion,{style:{value:t.spring(r?l:0,{stiffness:60,damping:15})}},function(e){var t=e.value;return n["default"].createElement("div",i["extends"]({},d,{className:c,style:i["extends"]({},p,o(u,t))}),s)})},r}(n["default"].Component);exports["default"]=l,l.displayName="Zippy",l.propTypes={size:e.PropTypes.number.isRequired,horizontal:e.PropTypes.bool,expand:e.PropTypes.bool},l.defaultProps={horizontal:!1,expand:!1}});