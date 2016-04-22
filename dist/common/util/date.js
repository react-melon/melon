/*! 2016 Baidu Inc. All Rights Reserved */
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","./array","../../babelHelpers"],t);else if("undefined"!=typeof exports)t(exports,require("./array"),require("../../babelHelpers"));else{var r={exports:{}};t(r.exports,e.array,e.babelHelpers),e.date=r.exports}}(this,function(exports,e,t){"use strict";function r(e){return e instanceof Date}function i(e,t){var r=this.clone(e);return r.setDate(e.getDate()+t),r}function n(e,t){var r=this.clone(e);return r.setMonth(e.getMonth()+t),r}function o(e,t){var r=this.clone(e);return r.setFullYear(e.getFullYear()+t),r}function a(e){return new Date(e.getTime())}function s(e){var t=this.clone(e);return t.setHours(0,0,0,0),t}function l(e){var t=this.getFirstDayOfMonth(e);return t.setMonth(t.getMonth()+1),t.setDate(t.getDate()-1),t.getDate()}function u(e){return new Date(e.getFullYear(),e.getMonth(),1)}function p(e){var t=new Date(e.getFullYear(),e.getMonth()+1,1);return this.addDays(t,-1)}function d(e){var t=e.getMonth();return t+1+"月"}function c(e){var t=e.getDay(),r=["日","一","二","三","四","五","六"];return"星期"+r[t]}function f(t){for(var r=this.getWeekArray(t),i=r[0]=e.compact(r[0]),n=r[r.length-1],o=[],a=[],s=0,l=7-i.length;l>s;s++)o.push(this.addDays(i[0],s-l));for(l=7-n.length,s=1;l>=s;s++)a.push(this.addDays(n[n.length-1],s));return[].concat([o],r,[a])}function h(e){var t=[],r=this.getDaysInMonth(e),i=[],n=void 0,o=void 0,a=void 0,s=void 0,l=void 0;for(l=1;r>=l;l++)t.push(new Date(e.getFullYear(),e.getMonth(),l));for(;t.length;){for(o=t[0].getDay(),s=7-o,a=7-s,n=t.splice(0,s),l=0;a>l;l++)n.unshift(null);i.push(n)}return i}function m(e,t){t=t.split(/[^yMdW]+/i),e=e.split(/\D+/);for(var r={},i=0,n=t.length;n>i;i++)if(t[i]&&e[i]&&(t[i].length>1&&e[i].length===t[i].length||1===t[i].length))r[t[i]]=e[i];var o=r.yyyy||r.y||(r.yy<50?"20":"19")+r.yy,a=0|(r.m||r.mm),s=0|(r.d||r.dd);return new Date(0|o,a-1,s)}function y(e,t,r){var i=e.getFullYear(),n=e.getMonth()+1,o=e.getDate(),a=e.getDay();if(r&&r.days)a=r.days.split(",")[a];var s={yyyy:i,yy:i%100,y:i,mm:this.datePad(n),m:n,dd:this.datePad(o),d:o,w:a,ww:r?r.week+a:""};return t.replace(/y+|M+|d+|W+/gi,function(e){return s[e]||""})}function b(e){return e=10>e?"0"+e:e}function v(e,t){return e&&t&&e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}function g(e,t){return e&&t&&e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()}function x(e,t){var r=this.cloneAsDate(e),i=this.cloneAsDate(t);return r.getTime()<i.getTime()}function C(e,t){var r=this.cloneAsDate(e),i=this.cloneAsDate(t);return r.getTime()>i.getTime()}function q(e,t){var r=this.cloneAsDate(e),i=this.cloneAsDate(t);return r.getFullYear()<=i.getFullYear()&&r.getMonth()<i.getMonth()}function P(e,t){var r=this.cloneAsDate(e),i=this.cloneAsDate(t);return r.getFullYear()>=i.getFullYear()&&r.getMonth()>i.getMonth()}function T(e,t,r){return!this.isBeforeDate(e,t)&&!this.isAfterDate(e,r)}function D(e){return e instanceof Date}function k(e,t){var r=12*(e.getFullYear()-t.getFullYear());return r+=e.getMonth(),r-=t.getMonth()}function R(e,t){return~~(this.monthDiff(e,t)/12)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.isDate=r,exports.addDays=i,exports.addMonths=n,exports.addYears=o,exports.clone=a,exports.cloneAsDate=s,exports.getDaysInMonth=l,exports.getFirstDayOfMonth=u,exports.getLastDayOfMonth=p,exports.getShortMonth=d,exports.getDayOfWeek=c,exports.getFullWeekArray=f,exports.getWeekArray=h,exports.parse=m,exports.format=y,exports.datePad=b,exports.isEqualDate=v,exports.isEqualMonth=g,exports.isBeforeDate=x,exports.isAfterDate=C,exports.isBeforeMonth=q,exports.isAfterMonth=P,exports.isBetweenDates=T,exports.isDateObject=D,exports.monthDiff=k,exports.yearDiff=R});