(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{327:function(n,t,o){"use strict";o.r(t);var c={props:{showWarning:Boolean,msg:{type:String}},methods:{processWarning:function(data){this.$emit("close",data)}}},e=o(51),component=Object(e.a)(c,(function(){var n=this,t=n._self._c;return t("div",{staticClass:"warning",class:{hide:!n.showWarning}},[t("div",{staticClass:"warning-content"},[t("h4",{staticClass:"warning-heading"},[n._v("Warning!!!")]),n._v(" "),t("div",{staticClass:"warning-text"},[n._v(n._s(n.msg))]),n._v(" "),t("div",{staticClass:"btn-holder"},[t("div",{staticClass:"custom-btn-holder"},[t("div",{staticClass:"response-btn"},[t("div",{on:{click:function(t){return n.processWarning("yes")}}},[n._v("Proceed")])]),n._v(" "),t("span",{staticClass:"custom-btn space remov w-button",on:{click:function(t){return n.processWarning("no")}}},[n._v("Close")])])])])])}),[],!1,null,null,null);t.default=component.exports}}]);