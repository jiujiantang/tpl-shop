(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my-login/my-login"],{"2c81":function(t,e,n){"use strict";n.r(e);var r=n("e92d"),o=n("7c4a");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("b7f7");var u,i=n("f0c5"),c=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);e["default"]=c.exports},"7c4a":function(t,e,n){"use strict";n.r(e);var r=n("df9a"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=o.a},b7f7:function(t,e,n){"use strict";var r=n("dfd7"),o=n.n(r);o.a},df9a:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("4795")),o=n("2f62");function a(t){return t&&t.__esModule?t:{default:t}}function u(t,e){return l(t)||s(t,e)||c(t,e)||i()}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,e){if(t){if("string"===typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,a=void 0;try{for(var u,i=t[Symbol.iterator]();!(r=(u=i.next()).done);r=!0)if(n.push(u.value),e&&n.length===e)break}catch(c){o=!0,a=c}finally{try{r||null==i["return"]||i["return"]()}finally{if(o)throw a}}return n}}function l(t){if(Array.isArray(t))return t}function d(t,e,n,r,o,a,u){try{var i=t[a](u),c=i.value}catch(f){return void n(f)}i.done?e(c):Promise.resolve(c).then(r,o)}function p(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function u(t){d(a,r,o,u,i,"next",t)}function i(t){d(a,r,o,u,i,"throw",t)}u(void 0)}))}}function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function v(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){h(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var y={data:function(){return{}},computed:v({},(0,o.mapState)("m_user",["redirectInfo"])),methods:v({},(0,o.mapMutations)("m_user",["updateUserInfo","updateToken","updateRedirectInfo"]),{getUserInfo:function(e){if(console.log(e),"getUserInfo:fail auth deny"===e.detail.errMsg)return t.$showMsg("您取消了登录授权！");console.log(e.detail.userInfo),this.updateUserInfo(e.detail.userInfo),this.getToken(e.detail)},getToken:function(e){var n=this;return p(r.default.mark((function o(){var a,i,c,f,s,l,d;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.login().catch((function(t){return t}));case 2:if(a=r.sent,i=u(a,2),c=i[0],f=i[1],!c&&"login:ok"===f.errMsg){r.next=8;break}return r.abrupt("return",t.$showMsg("登录失败！"));case 8:return s={code:f.code,encryptedData:e.encryptedData,iv:e.iv,rawData:e.rawData,signature:e.signature},r.next=11,t.$http.post("/api/public/v1/users/wxlogin",s);case 11:if(l=r.sent,d=l.data,200===d.meta.status){r.next=15;break}return r.abrupt("return",t.$showMsg("登录失败！"));case 15:n.updateToken(d.message.token),n.navigateBack();case 17:case"end":return r.stop()}}),o)})))()},navigateBack:function(){var e=this;this.redirectInfo&&"switchTab"===this.redirectInfo.openType&&t.switchTab({url:this.redirectInfo.from,complete:function(){e.updateRedirectInfo(null)}})}})};e.default=y}).call(this,n("543d")["default"])},dfd7:function(t,e,n){},e92d:function(t,e,n){"use strict";var r={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"b4e3"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my-login/my-login-create-component',
    {
        'components/my-login/my-login-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2c81"))
        })
    },
    [['components/my-login/my-login-create-component']]
]);
