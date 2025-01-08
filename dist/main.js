/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){e=function(){return n};var r,n={},a=Object.prototype,o=a.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",s=c.asyncIterator||"@@asyncIterator",l=c.toStringTag||"@@toStringTag";function h(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{h({},"")}catch(r){h=function(t,e,r){return t[e]=r}}function p(t,e,r,n){var a=e&&e.prototype instanceof b?e:b,o=Object.create(a.prototype),c=new j(n||[]);return i(o,"_invoke",{value:I(t,r,c)}),o}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}n.wrap=p;var d="suspendedStart",y="suspendedYield",v="executing",m="completed",g={};function b(){}function w(){}function x(){}var E={};h(E,u,(function(){return this}));var k=Object.getPrototypeOf,L=k&&k(k(O([])));L&&L!==a&&o.call(L,u)&&(E=L);var C=x.prototype=b.prototype=Object.create(E);function P(t){["next","throw","return"].forEach((function(e){h(t,e,(function(t){return this._invoke(e,t)}))}))}function A(e,r){function n(a,i,c,u){var s=f(e[a],e,i);if("throw"!==s.type){var l=s.arg,h=l.value;return h&&"object"==t(h)&&o.call(h,"__await")?r.resolve(h.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):r.resolve(h).then((function(t){l.value=t,c(l)}),(function(t){return n("throw",t,c,u)}))}u(s.arg)}var a;i(this,"_invoke",{value:function(t,e){function o(){return new r((function(r,a){n(t,e,r,a)}))}return a=a?a.then(o,o):o()}})}function I(t,e,n){var a=d;return function(o,i){if(a===v)throw Error("Generator is already running");if(a===m){if("throw"===o)throw i;return{value:r,done:!0}}for(n.method=o,n.arg=i;;){var c=n.delegate;if(c){var u=S(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(a===d)throw a=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a=v;var s=f(t,e,n);if("normal"===s.type){if(a=n.done?m:y,s.arg===g)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(a=m,n.method="throw",n.arg=s.arg)}}}function S(t,e){var n=e.method,a=t.iterator[n];if(a===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=r,S(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var o=f(a,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,g;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,g):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function O(e){if(e||""===e){var n=e[u];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function t(){for(;++a<e.length;)if(o.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=r,t.done=!0,t};return i.next=i}}throw new TypeError(t(e)+" is not iterable")}return w.prototype=x,i(C,"constructor",{value:x,configurable:!0}),i(x,"constructor",{value:w,configurable:!0}),w.displayName=h(x,l,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,h(t,l,"GeneratorFunction")),t.prototype=Object.create(C),t},n.awrap=function(t){return{__await:t}},P(A.prototype),h(A.prototype,s,(function(){return this})),n.AsyncIterator=A,n.async=function(t,e,r,a,o){void 0===o&&(o=Promise);var i=new A(p(t,e,r,a),o);return n.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},P(C),h(C,l,"Generator"),h(C,u,(function(){return this})),h(C,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},n.values=O,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(_),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,a){return c.type="throw",c.arg=t,e.next=n,a&&(e.method="next",e.arg=r),!!a}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),s=o.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;_(r)}return a}}throw Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:O(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),g}},n}function r(t,e,r,n,a,o,i){try{var c=t[o](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,a)}function n(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var i=t.apply(e,n);function c(t){r(i,a,o,c,u,"next",t)}function u(t){r(i,a,o,c,u,"throw",t)}c(void 0)}))}}var a={headers:{Accept:"application/json","Content-Type":"application/json"},mode:"cors",credentials:"omit"},o=function(t){return new Promise((function(e){return setTimeout(e,t)}))},i=function(){var t=n(e().mark((function t(r,n){var a,c,u,s,l,h,p=arguments;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=p.length>2&&void 0!==p[2]?p[2]:3,c=p.length>3&&void 0!==p[3]?p[3]:1,t.prev=2,t.next=5,fetch(r,n);case 5:if((u=t.sent).ok){t.next=20;break}if(429!==u.status){t.next=13;break}return s=u.headers.get("Retry-After")||5,console.log("Rate limited. Waiting ".concat(s," seconds before retry...")),t.next=12,o(1e3*s);case 12:return t.abrupt("return",i(r,n,a,c));case 13:if(!(a>0&&u.status>=500)){t.next=19;break}return l=1e3*Math.pow(2,c-1),console.log("Retrying request to ".concat(r,", ").concat(a," attempts remaining (waiting ").concat(l,"ms)")),t.next=18,o(l);case 18:case 30:return t.abrupt("return",i(r,n,a-1,c+1));case 19:throw new Error("Server returned ".concat(u.status,": ").concat(u.statusText));case 20:return t.abrupt("return",u);case 23:if(t.prev=23,t.t0=t.catch(2),!(a>0)||t.t0.message.includes("Server returned")){t.next=31;break}return h=1e3*Math.pow(2,c-1),console.log("Retrying request to ".concat(r,", ").concat(a," attempts remaining (waiting ").concat(h,"ms)")),t.next=30,o(h);case 31:throw t.t0;case 32:case"end":return t.stop()}}),t,null,[[2,23]])})));return function(e,r){return t.apply(this,arguments)}}(),c=new Map,u=function(){var t=n(e().mark((function t(r,n){var a,o;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!((a=c.get(r))&&Date.now()-a.timestamp<3e5)){t.next=3;break}return t.abrupt("return",a.data);case 3:return t.next=5,n();case 5:return o=t.sent,c.set(r,{data:o,timestamp:Date.now()}),t.abrupt("return",o);case 8:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),s=function(){var t=new Date,e=new Date(t.getFullYear(),0,0),r=t-e;return Math.floor(r/864e5)},l=function(t){return n(e().mark((function r(){var o,c;return e().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!(!t||t<1||t>365)){r.next=2;break}throw new Error("Invalid day parameter. Please provide a number between 1 and 365.");case 2:return console.log("Fetching plan for day: ".concat(t)),r.prev=3,o="plan_".concat(t),r.next=7,u(o,n(e().mark((function r(){var n;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i("https://readscripture-api.herokuapp.com/api/v1/days/".concat(t),a);case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),r)}))));case 7:return c=r.sent,r.abrupt("return",c);case 11:throw r.prev=11,r.t0=r.catch(3),console.error("Error fetching plan:",r.t0),new Error("Failed to load reading plan for day ".concat(t,". Please try again later."));case 15:case"end":return r.stop()}}),r,null,[[3,11]])})))()},h=function(t){return n(e().mark((function r(){var o;return e().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=2;break}throw new Error("Chapter ID is required.");case 2:return r.prev=2,o="chapter_".concat(t),r.next=6,u(o,n(e().mark((function r(){var n;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i("https://readscripture-api.herokuapp.com/api/v1/chapters/".concat(t),a);case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),r)}))));case 6:return r.abrupt("return",r.sent);case 9:throw r.prev=9,r.t0=r.catch(2),console.error("Error fetching chapter:",r.t0),new Error("Failed to load chapter ".concat(t,". Please try again later."));case 13:case"end":return r.stop()}}),r,null,[[2,9]])})))()},p=function(t){return n(e().mark((function r(){var o;return e().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=2;break}throw new Error("Passage parameter is required.");case 2:return r.prev=2,o="passage_".concat(t),r.next=6,u(o,n(e().mark((function r(){var n;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Fetching passage: ".concat(t)),e.next=3,i("https://readscripture-api.herokuapp.com/api/v1/passage?search=".concat(encodeURIComponent(t)),a);case 3:return n=e.sent,e.abrupt("return",n.json());case 5:case"end":return e.stop()}}),r)}))));case 6:return r.abrupt("return",r.sent);case 9:throw r.prev=9,r.t0=r.catch(2),console.error("Error fetching passage:",r.t0),new Error('Failed to load passage "'.concat(t,'". Please try again later.'));case 13:case"end":return r.stop()}}),r,null,[[2,9]])})))()},f={renderChapterHeading:function(t,e){var r=document.createElement("h2");r.setAttribute("class","chapterHeader");for(var n=0;n<t.length;n++)r.textContent+=t[n].text;e.appendChild(r)},renderParagraphBreak:function(t){var e=document.createElement("span");e.setAttribute("class","paragraphBreak"),t.appendChild(e)},renderParagraphIndent:function(t){var e=document.createElement("span");e.setAttribute("class","paragraphIndent"),e.textContent="\t",t.appendChild(e)},renderVerse:function(t,e){var r=this,n=t.verseNum,a=t.content,o=document.createElement("span");o.setAttribute("class","verseContainer");var i=document.createElement("sup");i.setAttribute("class","verseNum"),i.textContent="  "+n+"  ",o.appendChild(i);var c=document.createElement("span");c.setAttribute("class","verseTextContainer");var u=c;a.forEach((function(t){var e=document.createElement("span");if("divine-name"===t.class)e.setAttribute("class","divineName"),e.textContent=t.text;else if("indent"===t.class)e.setAttribute("class","indent"),e.textContent="\t";else switch(t.type){case"text":e.setAttribute("class","verseTextChunk"),e.textContent=t.text;break;case"beginDoubleQuote":e.setAttribute("class","beginDoubleQuote"),e.textContent="“";break;case"endDoubleQuote":e.setAttribute("class","endDoubleQuote"),e.textContent="”";break;case"beginSingleQuote":e.setAttribute("class","beginSingleQuote"),e.textContent="‘";break;case"endSingleQuote":e.setAttribute("class","endSingleQuote"),e.textContent="’";break;case"endLine":e.setAttribute("class","endLine");break;case"beginLine":e.setAttribute("class","beginLine");break;case"beginWOC":e.setAttribute("class","WOC"),u=e;break;case"endWOC":u.classList.contains("WOC")&&(c.appendChild(u),u=c),e.setAttribute("class","endWOC");break;case"beginParagraph":e.setAttribute("class","paragraphIndent");break;case"endParagraph":e.setAttribute("class","paragraphBreak");break;case"beginBlockIndent":(e=document.createElement("div")).setAttribute("class","block-indent"),u=e;break;case"endBlockIndent":u!==c&&(c.appendChild(u),u=c,r.renderParagraphBreak(u)),e.setAttribute("class","endBlockIndent")}u!==e?u.appendChild(e):c.appendChild(e)})),o.appendChild(c),e.appendChild(o)},renderWatchSection:function(t){var e=document.getElementById("watch"),r=document.getElementById("menu-header-Watch-Title");e&&r&&(t.forEach((function(t){var n=document.createElement("div");n.setAttribute("class","video");var a=document.createElement("h1");a.textContent=t.title,n.appendChild(a);var o=document.createElement("iframe"),i=t.youtubeUrl.replace("watch?v=","embed/");o.setAttribute("src","".concat(i,"?hl=en&amp;autoplay=0&amp;cc_load_policy=0&amp;loop=0&amp;iv_load_policy=0&amp;fs=1&amp;showinfo=0")),o.setAttribute("width","720"),o.setAttribute("height","480"),n.appendChild(o);var c=document.createElement("p");c.textContent=t.watchDesc,n.appendChild(c),e.appendChild(n),r.textContent=t.title})),["watch-header","menu-header-Watch-Title","menu-header-Watch"].forEach((function(e){var r=document.getElementById(e);r&&r.setAttribute("class",0===t.length?"hide":"")})))}};function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function y(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,v(n.key),n)}}function v(t){var e=function(t){if("object"!=d(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==d(e)?e:e+""}var m=new(function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.read=[],this.watch=[],this.pray=[],this.planDay=null,this.planDayLongForm="",this.chapterId=null,this.chapterName=""},(e=[{key:"setPlanData",value:function(t){var e=this;this.planDay=t.day,this.planDayLongForm="Reading for ".concat(t.date),this.chapterId=t.chapterId,this.read=[],this.watch=[],this.pray=[],t.dayContents.forEach((function(t){switch(t.type){case"read":e.read=t.passage,e.updateElementText("menu-header-Read-Title",t.passage);break;case"watch":e.watch.push(t),e.updateElementText("menu-header-Watch","Watch"),e.updateElementText("menu-header-Watch-Title",t.passage);break;case"pray":e.pray=t.passage,e.updateElementText("menu-header-Pray-Title",t.passage)}}))}},{key:"setChapterName",value:function(t){this.chapterName=t,this.updateElementText("chapterName",t)}},{key:"updateElementText",value:function(t,e){var r=document.getElementById(t);r&&(r.textContent=e)}},{key:"getReadArray",value:function(){return this.read}},{key:"getPrayArray",value:function(){return this.pray}},{key:"getWatchArray",value:function(){return this.watch}},{key:"getPlanDay",value:function(){return this.planDay}},{key:"getPlanDayLongForm",value:function(){return this.planDayLongForm}},{key:"getChapterName",value:function(){return this.chapterName}},{key:"getChapterId",value:function(){return this.chapterId}}])&&y(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}());function g(t){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(t)}function b(){b=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),c=new j(n||[]);return a(i,"_invoke",{value:I(t,r,c)}),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=l;var p="suspendedStart",f="suspendedYield",d="executing",y="completed",v={};function m(){}function w(){}function x(){}var E={};s(E,i,(function(){return this}));var k=Object.getPrototypeOf,L=k&&k(k(O([])));L&&L!==r&&n.call(L,i)&&(E=L);var C=x.prototype=m.prototype=Object.create(E);function P(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function A(t,e){function r(a,o,i,c){var u=h(t[a],t,o);if("throw"!==u.type){var s=u.arg,l=s.value;return l&&"object"==g(l)&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(l).then((function(t){s.value=t,i(s)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var o;a(this,"_invoke",{value:function(t,n){function a(){return new e((function(e,a){r(t,n,e,a)}))}return o=o?o.then(a,a):a()}})}function I(e,r,n){var a=p;return function(o,i){if(a===d)throw Error("Generator is already running");if(a===y){if("throw"===o)throw i;return{value:t,done:!0}}for(n.method=o,n.arg=i;;){var c=n.delegate;if(c){var u=S(c,n);if(u){if(u===v)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(a===p)throw a=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a=d;var s=h(e,r,n);if("normal"===s.type){if(a=n.done?y:f,s.arg===v)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(a=y,n.method="throw",n.arg=s.arg)}}}function S(e,r){var n=r.method,a=e.iterator[n];if(a===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,S(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),v;var o=h(a,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function O(e){if(e||""===e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,o=function r(){for(;++a<e.length;)if(n.call(e,a))return r.value=e[a],r.done=!1,r;return r.value=t,r.done=!0,r};return o.next=o}}throw new TypeError(g(e)+" is not iterable")}return w.prototype=x,a(C,"constructor",{value:x,configurable:!0}),a(x,"constructor",{value:w,configurable:!0}),w.displayName=s(x,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,s(t,u,"GeneratorFunction")),t.prototype=Object.create(C),t},e.awrap=function(t){return{__await:t}},P(A.prototype),s(A.prototype,c,(function(){return this})),e.AsyncIterator=A,e.async=function(t,r,n,a,o){void 0===o&&(o=Promise);var i=new A(l(t,r,n,a),o);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},P(C),s(C,u,"Generator"),s(C,i,(function(){return this})),s(C,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=O,j.prototype={constructor:j,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(_),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function a(n,a){return c.type="throw",c.arg=e,r.next=n,a&&(r.method="next",r.arg=t),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),_(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;_(r)}return a}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:O(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),v}},e}function w(t,e,r,n,a,o,i){try{var c=t[o](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,a)}function x(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var o=t.apply(e,r);function i(t){w(o,n,a,i,c,"next",t)}function c(t){w(o,n,a,i,c,"throw",t)}i(void 0)}))}}var E=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"read",r=document.getElementById(e);if(r){var n=document.createElement("div");n.className="error-message";var a=document.createElement("h3");a.textContent="Something went wrong";var o=document.createElement("p");o.textContent=t;var i=document.createElement("button");i.textContent="Retry",i.addEventListener("click",(function(){var t=m.getPlanDay()||s();L(t)})),n.appendChild(a),n.appendChild(o),n.appendChild(i),r.innerHTML="",r.appendChild(n)}},k=function(){var t=x(b().mark((function t(e,r){var n,a,o;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r){t.next=3;break}return console.log("No passage provided"),t.abrupt("return");case 3:return t.prev=3,t.next=6,p(r);case 6:if(n=t.sent,a=document.getElementById(e)){t.next=10;break}return t.abrupt("return");case 10:(o=document.createElement("h1")).setAttribute("class","chapterRange"),o.textContent=r,a.appendChild(o),n.forEach((function(t){var e=document.createElement("div");if(t.chapterNum){var r=document.createElement("h2");r.setAttribute("class","chapterNumberHeader"),r.textContent="Chapter ".concat(t.chapterNum),e.appendChild(r)}var n=document.createElement("div");t.content.forEach((function(t){switch(t.type){case"verse":f.renderVerse(t,n);break;case"paragraph":f.renderParagraphBreak(n)}})),e.appendChild(n),a.appendChild(e)})),t.next=21;break;case 17:t.prev=17,t.t0=t.catch(3),console.error("Error fetching book text:",t.t0),E(t.t0.message,e);case 21:case"end":return t.stop()}}),t,null,[[3,17]])})));return function(e,r){return t.apply(this,arguments)}}(),L=function(){var t=x(b().mark((function t(e){var r,n,a,o,i,c,u;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Math.min(Math.max(1,Math.floor(e)||1),365),t.prev=1,t.next=4,l(r);case 4:return n=t.sent,m.setPlanData(n),["read","watch","pray"].forEach((function(t){var e=document.getElementById(t);e&&(e.innerHTML="")})),(a=document.getElementById("footer-nav"))&&(a.className=""),f.renderWatchSection(m.getWatchArray()),t.next=12,k("read",m.getReadArray());case 12:return t.next=14,k("pray",m.getPrayArray());case 14:return(o=document.getElementById("bookmark"))&&(i=localStorage.getItem("daybookmark"),o.className=m.getPlanDay()==i?"active":""),t.next=18,h(m.getChapterId());case 18:c=t.sent,m.setChapterName(c.title),(u=document.getElementById("dayLongForm"))&&(u.innerHTML=m.getPlanDayLongForm()),t.next=28;break;case 24:t.prev=24,t.t0=t.catch(1),console.error("Error in jumpTo:",t.t0),E(t.t0.message);case 28:case"end":return t.stop()}}),t,null,[[1,24]])})));return function(e){return t.apply(this,arguments)}}();function C(){var t=s();L(t);var e={previous:document.getElementById("picker-previous"),next:document.getElementById("picker-next"),header:document.getElementById("header"),logo:document.getElementById("logo"),footerNav:document.getElementById("footer-nav"),bookmark:document.getElementById("bookmark"),menu:document.getElementById("menu"),date:document.getElementById("date")},r=function(t){var r=m.getPlanDay()||s();L(r+t),e.header&&(e.header.className=""),window.scroll({top:0,left:0,behavior:"smooth"})};e.previous&&e.previous.addEventListener("click",(function(){return r(-1)})),e.next&&e.next.addEventListener("click",(function(){return r(1)})),window.addEventListener("scroll",(function(){e.footerNav&&(e.footerNav.className=window.scrollY>=document.body.clientHeight-window.innerHeight?"show":""),e.date&&(e.date.style.opacity=window.scrollY>=16?"".concat(1-window.scrollY/40):"1")}))}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",C):C()})();
//# sourceMappingURL=main.js.map