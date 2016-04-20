/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","react","./boxgroup/Option","./common/util/cxBuilder","./InputComponent","./Validity","./babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("react"),require("./boxgroup/Option"),require("./common/util/cxBuilder"),require("./InputComponent"),require("./Validity"),require("./babelHelpers"));else{var r={exports:{}};t(r.exports,e.react,e.Option,e.cxBuilder,e.InputComponent,e.Validity,e.babelHelpers),e.BoxGroup=r.exports}}(this,function(exports,e,t,r,i,n,o){"use strict";function a(e){return e.map(function(e,t){var r=e.name,i=e.value,n=e.disabled;return s["default"].createElement("option",{key:i,disabled:!!n,label:r,value:i})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.createOptions=a;var s=o.interopRequireDefault(e),l=o.interopRequireDefault(t),u=o.interopRequireDefault(i),p=o.interopRequireDefault(n),c=r.create("BoxGroup"),d=function(t){function r(e,i){o.classCallCheck(this,r);var n=o.possibleConstructorReturn(this,t.call(this,e,i)),a=n.state.value;return n.state=o["extends"]({},n.state,{value:Array.isArray(a)?a:[a]}),n.onChange=n.onChange.bind(n),n.renderOption=n.renderOption.bind(n),n}return o.inherits(r,t),r.prototype.onChange=function(e){var r=e.target.value,i=this.getValue(),n=this.props.boxModel,o=void 0;if("radio"===n)o=[r];else{var a=i.indexOf(r);o=a>-1?[].concat(i.slice(0,a),i.slice(a+1)):[].concat(i,[r])}t.prototype.onChange.call(this,{type:"change",target:this,value:o})},r.prototype.getValue=function(){var t=this.state.value;return e.Children.toArray(this.props.children).reduce(function(e,r){if(r&&r.props){var i=r.props,n=i.disabled,o=i.value;if(!n&&t.indexOf(o)>-1)e.push(o)}return e},[])},r.prototype.renderOption=function(e){var t=e.type,r=e.props;if("option"!==t)return e;var i=this.props.boxModel,n=r.value,o=r.children,a=r.label;return s["default"].createElement(l["default"],{key:n,boxModel:i,label:a||o,value:n,checked:this.state.value.indexOf(n)>-1,disabled:this.props.disabled||r.disabled,onChange:this.onChange})},r.prototype.render=function(){return s["default"].createElement("div",{className:c(this.props).addStates(this.getStyleStates()).build()},e.Children.map(this.props.children,this.renderOption),s["default"].createElement(p["default"],{validity:this.state.validity}))},r}(u["default"]);exports["default"]=d,d.displayName="BoxGroup",d.propTypes=o["extends"]({},u["default"].propTypes,{boxModel:e.PropTypes.oneOf(["radio","checkbox"]).isRequired,value:e.PropTypes.arrayOf(e.PropTypes.string),children:e.PropTypes.node.isRequired}),d.defaultProps=o["extends"]({},u["default"].defaultProps,{boxModel:"checkbox",defaultValue:[]}),d.createOptions=a});