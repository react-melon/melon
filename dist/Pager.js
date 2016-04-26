/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","react","./Icon","./common/util/cxBuilder","./common/util/array","./babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("react"),require("./Icon"),require("./common/util/cxBuilder"),require("./common/util/array"),require("./babelHelpers"));else{var r={exports:{}};t(r.exports,e.react,e.Icon,e.cxBuilder,e.array,e.babelHelpers),e.Pager=r.exports}}(this,function(exports,e,t,r,i,o){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var n=o.interopRequireDefault(e),a=o.interopRequireDefault(t),s=r.create("Pager"),l=function(e){function t(r){o.classCallCheck(this,t);var i=o.possibleConstructorReturn(this,e.call(this,r)),n=r.page,a=void 0===n?0:n;return i.state={page:a},i.onMainClick=i.onMainClick.bind(i),i}return o.inherits(t,e),t.prototype.onMainClick=function(e){var t=this,r=e.currentTarget,i=e.target;if(e.preventDefault(),e.stopPropagation)e.stopPropagation();else e.cancelBubble=!0;for(var o=i.getAttribute("data-role");"pager-item"!==o&&i!==r;)i=i.parentNode,o=i.getAttribute("data-role");if(i!==r){var n=this.props,a=n.first,s=n.onChange,l=+i.getAttribute("data-page")+a;if(i=null,this.state.page!==l)this.setState({page:l},s?function(){return s({target:t,page:l})}:null)}},t.prototype.range=function(e,t,r,o){return t-o>e+r?[].concat(i.range(e,e+r),[-e-r],i.range(t-o,t)):i.range(e,t)},t.prototype.renderItem=function(e){var r=e.page,i=e.part,o=e.states,l=this.props,u=l.lang,p=l.useLang,d=s().part("item").addStates(o).build(),c=void 0;if(!p&&i)c=n["default"].createElement(a["default"],{icon:t.ICONS[i]});else c=u[i]||r+1;return n["default"].createElement("li",{className:d,key:i+r,"data-role":"pager-item","data-page":r},n["default"].createElement("a",{href:"#"},c))},t.prototype.render=function(){var e=this,t=this.props,r=this.state,i=t.total,a=t.first,l=t.padding,u=t.showCount,p=t.useLang,d=(t.lang,t.showAlways,o.objectWithoutProperties(t,["total","first","padding","showCount","useLang","lang","showAlways"])),c=r.page;u=u>i?i:u,c-=a;var f=Math.floor(u/2),h=l,m=l,y=c-f,b=f,v=f;if(0>y)b+=y,v-=y;var x=c+f+1-i;if(x>0)b+=x,v-=x;var g=this.range(0,c,h,b),C=this.range(c+1,i,v,m),P=[{page:Math.max(c-1,0),states:{prev:!0,disabled:0===c},part:"prev"}].concat(g).concat({page:c,states:{current:!0},part:""}).concat(C).concat({page:Math.min(c+1,i-1),states:{next:!0,disabled:c>=i-1},part:"next"}).map(function(t){if("number"==typeof t){var r=t>=0?"":"ellipsis";t={page:Math.abs(t),states:{ellipsis:!!r},part:r}}return e.renderItem(t)});return n["default"].createElement("ul",o["extends"]({},d,{className:s(t).addVariants(p?"lang":null).build(),onClick:this.onMainClick}),P)},t}(e.Component);exports["default"]=l,l.displayName="Pager",l.defaultProps={page:0,first:0,padding:1,showAlways:!1,showCount:5,total:0,disabled:!1,useLang:!1,lang:{prev:"上一页",next:"下一页",ellipsis:"..."}},l.propTypes={disabled:e.PropTypes.bool,type:e.PropTypes.string,page:e.PropTypes.number,first:e.PropTypes.number,padding:e.PropTypes.number,showAlways:e.PropTypes.bool,showCount:e.PropTypes.number,total:e.PropTypes.number,useLang:e.PropTypes.bool,lang:e.PropTypes.shape({prev:e.PropTypes.string,ellipsis:e.PropTypes.string,next:e.PropTypes.string})},l.ICONS={prev:"navigate-before",next:"navigate-next",ellipsis:"keyboard-control"}});