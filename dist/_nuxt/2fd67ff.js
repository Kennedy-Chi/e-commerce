(window.webpackJsonp=window.webpackJsonp||[]).push([[25,5,7,8],{316:function(t,l,e){"use strict";e.r(l);var c={methods:{loadScript:function(){var t=document.getElementById("adminScript");null!=t&&document.body.removeChild(t);var script=document.createElement("adminScript");script.type="text/javascript",script.src="/js/admin.js",script.async=!0,script.id="adminScript";var l=document.querySelector("#admin-footer");l?l.appendChild(script):console.error("Could not find app node to append script element")},setFileURL:function(){this.$store.commit("SET_URL",this.$config.FILE_URL)}},mounted:function(){this.loadScript(),this.setFileURL()}},r=e(51),component=Object(r.a)(c,(function(){this._self._c;return this._m(0)}),[function(){var t=this._self._c;return t("div",{staticClass:"admin-footer",attrs:{id:"admin-footer"}},[t("h4",{staticClass:"copyright"},[this._v("Copyrights Prince N.N All Rights Reserved")])])}],!1,null,null,null);l.default=component.exports},317:function(t,l,e){"use strict";e.r(l);e(91);var c={data:function(){return{time:(new Date).toLocaleTimeString()}},head:function(){return{link:[{href:"/css/admin.css",rel:"stylesheet",type:"text/css"}]}},methods:{formatDate:function(data){var t=new Date(data).getTime();return new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric",suffix:function(t){return 1===t||21===t||31===t?"st":2===t||22===t?"nd":3===t||23===t?"rd":"th"}}).format(t)},getClock:function(){var t=this;setInterval((function(){return t.getTime(new Date)}),1e3)},getTime:function(data){var t=new Date(data),l=t.getHours(),e=t.getMinutes(),c=l>=12?"PM":"AM";return(l=(l%=12)||12)+":"+(e=e<10?"0"+e:e)+" "+c}},mounted:function(){var t=this;setInterval((function(){t.time=(new Date).toLocaleTimeString()}),1e3)}},r=e(51),component=Object(r.a)(c,(function(){var t=this,l=t._self._c;return l("div",{staticClass:"header"},[l("div",{staticClass:"admin-top-header"},[l("nuxt-link",{staticClass:"brand-holder",attrs:{to:"/"}},[l("h1",{staticClass:"brand-name"},[t._v("Furniture")]),t._v(" "),l("img",{staticClass:"top-menu",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f315e3234210d4fc1a5a6_top-menu.svg",loading:"lazy",alt:""}})]),t._v(" "),l("div",{staticClass:"top-header-right"},[t._m(0),t._v(" "),l("div",{staticClass:"top-item-holder"},[l("div",{staticClass:"top-item-flex"},[l("img",{staticClass:"top-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f35effd81ee23d5dce634_calendar-line-icon%201.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",{staticClass:"top-icon-text"},[t._v(t._s(t.formatDate(new Date)))])]),t._v(" "),l("div",{staticClass:"top-item-flex"},[l("img",{staticClass:"top-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f35ef85ef8b1739d4f58f_clock-timing-icon%201.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",{staticClass:"top-icon-text"},[t._v(t._s(t.time))])])]),t._v(" "),t._m(1)])],1)])}),[function(){var t=this,l=t._self._c;return l("div",{staticClass:"greeting-holder"},[l("div",{staticClass:"user-face-holder"},[l("img",{staticClass:"responsive-img",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f33dd919794c9935088a2_face.jpg",loading:"lazy",alt:"",sizes:"100vw",srcset:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f33dd919794c9935088a2_face-p-500.jpg 500w, https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f33dd919794c9935088a2_face.jpg 612w"}})]),t._v(" "),l("div",[l("h3",{staticClass:"greeting"},[t._v("Welcome")]),t._v(" "),l("div",{staticClass:"greeting-name"},[t._v("John Doe")])])])},function(){var t=this._self._c;return t("div",{staticClass:"top-actions"},[t("img",{staticClass:"top-right-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f383aa6e4e170f1f4d27c_default-profile-picture-male-icon%201.svg",loading:"lazy",alt:""}}),t("img",{staticClass:"top-right-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f39aac87e61099c495498_settings.svg",loading:"lazy",alt:""}}),t("img",{staticClass:"top-right-icon small",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f394c0cbda2ac201447ad_power-off-line-icon%201.svg",loading:"lazy",alt:""}})])}],!1,null,null,null);l.default=component.exports},318:function(t,l,e){"use strict";e.r(l);e(46);var c={data:function(){return{route:""}},mounted:function(){this.route=this.$route.name}},r=e(51),component=Object(r.a)(c,(function(){var t=this,l=t._self._c;return l("div",{staticClass:"vertical-naavbar"},[l("div",{staticClass:"sticky-navbar"},[t._m(0),t._v(" "),t._m(1),t._v(" "),l("ul",{staticClass:"nav-list",attrs:{role:"list"}},[l("li",{staticClass:"each-nav-list",class:{active:"admin"==t.route}},[l("nuxt-link",{staticClass:"list-link w-inline-block",attrs:{to:"/admin"}},[l("img",{staticClass:"nav-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f3e419ac2ae0f8eb29999_gallery.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("Dashboard")])])],1),t._v(" "),l("li",{staticClass:"each-nav-list",class:{active:"admin-profile"==t.route}},[l("nuxt-link",{staticClass:"list-link w-inline-block",attrs:{to:"/admin/profile"}},[l("img",{staticClass:"nav-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f41e5ffa6010d9935039a_gray-profile.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("Profile")])])],1),t._v(" "),l("li",{staticClass:"each-nav-list",class:{active:"admin-users"==t.route}},[l("nuxt-link",{staticClass:"list-link w-inline-block",attrs:{to:"/admin/users"}},[l("img",{staticClass:"nav-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f43344ac63884f49b6aaa_man-and-woman-user-icon%201.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("Users")])])],1),t._v(" "),l("li",{staticClass:"each-nav-list",class:{active:"admin-transactions"==t.route}},[l("nuxt-link",{staticClass:"list-link w-inline-block",attrs:{to:"/admin/transactions"}},[l("img",{staticClass:"nav-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f4220019e05bf2c4a4b8d_finance-icon.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("Transactions")])])],1),t._v(" "),l("li",{staticClass:"each-nav-list",class:{active:"admin-sales"==t.route}},[l("nuxt-link",{staticClass:"list-link w-inline-block",attrs:{to:"/admin/sales"}},[l("img",{staticClass:"nav-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f4296e038eda4e2e2a539_investment-analysis-icon%201.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("Sales")])])],1),t._v(" "),l("li",{staticClass:"each-nav-list",class:{active:"admin-store"==t.route}},[l("nuxt-link",{staticClass:"list-link w-inline-block",attrs:{to:"/admin/store"}},[l("img",{staticClass:"nav-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641e4c5a712abe23c6ef58fd_store.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("Store")])])],1),t._v(" "),l("li",{staticClass:"each-nav-list",class:{active:"admin-settings"==t.route}},[l("nuxt-link",{staticClass:"list-link w-inline-block",attrs:{to:"/admin/settings"}},[l("img",{staticClass:"nav-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f4334a018fd0de812fc33_settings-line-icon%20(1)%201.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("Item Settings")])])],1),t._v(" "),l("li",{staticClass:"each-nav-list",class:{active:"admin-pages"==t.route}},[l("nuxt-link",{staticClass:"list-link w-inline-block",attrs:{to:"/admin/pages"}},[l("img",{staticClass:"nav-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f4296019e05a6604a4dc3_pages-icon%201.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("Pages")])])],1),t._v(" "),t._m(2)])])])}),[function(){var t=this,l=t._self._c;return l("div",{staticClass:"side-mobile-toggle hide"},[l("div",[t._v("Hide Navbar")]),t._v(" "),l("img",{staticClass:"top-right-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f3b7f23d1bb5fd495b073_sidebar.svg",loading:"lazy",alt:""}})])},function(){var t=this,l=t._self._c;return l("div",{staticClass:"curtesy"},[l("div",[t._v("Designed By")]),t._v(" "),l("h3",{staticClass:"curtesy-link"},[l("a",{staticClass:"curtesy-link-item",attrs:{href:"#"}},[t._v("Kenny Tech Studios")])])])},function(){var t=this,l=t._self._c;return l("li",{staticClass:"each-nav-list"},[l("a",{staticClass:"list-link w-inline-block",attrs:{href:"#"}},[l("img",{staticClass:"nav-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/640f42968ddb4f4c4f27d5e5_logout-line-icon%201.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("Logout")])])])}],!1,null,null,null);l.default=component.exports},365:function(t,l,e){"use strict";e.r(l);var c=e(316),r=e(317),o=e(318),n={components:{AdminFooter:c.default,AdminHeader:r.default,AdminNavigation:o.default}},d=e(51),component=Object(d.a)(n,(function(){var t=this,l=t._self._c;return l("div",{staticClass:"users"},[l("admin-header"),t._v(" "),l("div",{staticClass:"flex-body"},[l("admin-navigation"),t._v(" "),t._m(0)],1),t._v(" "),l("admin-footer")],1)}),[function(){var t=this,l=t._self._c;return l("div",{staticClass:"main-body"},[l("div",{staticClass:"latest-sales all-items close no-top"},[l("div",{staticClass:"top-purchase-header"},[l("h1",{staticClass:"top-purchase-title"},[t._v("Users")]),t._v(" "),l("img",{staticClass:"toggle-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641e380319872873ed23b3bf_toggle.svg",loading:"lazy",alt:""}})]),t._v(" "),l("div",{staticClass:"table-header"},[l("div",{staticClass:"filter-box"},[l("div",{staticClass:"filter-flex-head"},[l("h4",{staticClass:"filter-head"},[t._v("All Categories")]),t._v(" "),l("img",{staticClass:"filter-drop",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d5b25be2e3b4ecbc9727c_down.svg",loading:"lazy",alt:""}})]),t._v(" "),l("ul",{staticClass:"filter-list hide",attrs:{role:"list"}},[l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])])])]),t._v(" "),l("div",{staticClass:"filter-box"},[l("div",{staticClass:"filter-flex-head"},[l("h4",{staticClass:"filter-head"},[t._v("Price")]),t._v(" "),l("img",{staticClass:"filter-drop small",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d6d42903a7182129af91a_sort.svg",loading:"lazy",alt:""}})]),t._v(" "),l("ul",{staticClass:"filter-list hide",attrs:{role:"list"}},[l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])])])]),t._v(" "),l("div",{staticClass:"filter-box"},[l("div",{staticClass:"filter-flex-head"},[l("h4",{staticClass:"filter-head"},[t._v("Name")]),t._v(" "),l("img",{staticClass:"filter-drop small",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d6d42903a7182129af91a_sort.svg",loading:"lazy",alt:""}})]),t._v(" "),l("ul",{staticClass:"filter-list hide",attrs:{role:"list"}},[l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])])])]),t._v(" "),l("div",{staticClass:"filter-box"},[l("div",{staticClass:"filter-flex-head"},[l("h4",{staticClass:"filter-head"},[t._v("Date")]),t._v(" "),l("img",{staticClass:"filter-drop small",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d6d42903a7182129af91a_sort.svg",loading:"lazy",alt:""}})]),t._v(" "),l("ul",{staticClass:"filter-list hide",attrs:{role:"list"}},[l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])])])])]),t._v(" "),l("div",{staticClass:"table-footer"},[l("div",[l("div",{staticClass:"each-purchase-range"},[l("div",{staticClass:"range-input-holder"},[l("img",{staticClass:"range-img",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d1af3be2e3b95a3c5753b_calender.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("1/03/2023")])])])]),t._v(" "),l("ul",{staticClass:"pagination",attrs:{role:"list"}},[l("li",[l("img",{staticClass:"page-arrow",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d42fe401fabbf1a4470ad_arrow-next-right-icon%202.svg",loading:"lazy",alt:""}})]),t._v(" "),l("li",{staticClass:"paginate-item"},[l("div",[t._v("1")])]),t._v(" "),l("li",{staticClass:"paginate-item active"},[l("div",[t._v("2")])]),t._v(" "),l("li",{staticClass:"paginate-item"},[l("div",[t._v("3")])]),t._v(" "),l("li",[l("img",{staticClass:"page-arrow",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d42fe2b0f0512ff5c8896_arrow-next-right-icon%201.svg",loading:"lazy",alt:""}})])])])]),t._v(" "),l("div",{staticClass:"latest-sales all-items close"},[l("div",{staticClass:"top-purchase-header"},[l("h1",{staticClass:"top-purchase-title"},[t._v("Staffs")]),t._v(" "),l("img",{staticClass:"toggle-icon",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641e380319872873ed23b3bf_toggle.svg",loading:"lazy",alt:""}})]),t._v(" "),l("div",{staticClass:"table-header"},[l("div",{staticClass:"filter-box"},[l("div",{staticClass:"filter-flex-head"},[l("h4",{staticClass:"filter-head"},[t._v("All Categories")]),t._v(" "),l("img",{staticClass:"filter-drop",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d5b25be2e3b4ecbc9727c_down.svg",loading:"lazy",alt:""}})]),t._v(" "),l("ul",{staticClass:"filter-list hide",attrs:{role:"list"}},[l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])])])]),t._v(" "),l("div",{staticClass:"filter-box"},[l("div",{staticClass:"filter-flex-head"},[l("h4",{staticClass:"filter-head"},[t._v("Price")]),t._v(" "),l("img",{staticClass:"filter-drop small",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d6d42903a7182129af91a_sort.svg",loading:"lazy",alt:""}})]),t._v(" "),l("ul",{staticClass:"filter-list hide",attrs:{role:"list"}},[l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])])])]),t._v(" "),l("div",{staticClass:"filter-box"},[l("div",{staticClass:"filter-flex-head"},[l("h4",{staticClass:"filter-head"},[t._v("Name")]),t._v(" "),l("img",{staticClass:"filter-drop small",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d6d42903a7182129af91a_sort.svg",loading:"lazy",alt:""}})]),t._v(" "),l("ul",{staticClass:"filter-list hide",attrs:{role:"list"}},[l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])]),t._v(" "),l("li",{staticClass:"filter-items"},[l("div",[t._v("Refrigerator")])])])])]),t._v(" "),l("div",{staticClass:"table-footer"},[l("div",[l("div",{staticClass:"each-purchase-range"},[l("div",{staticClass:"range-input-holder"},[l("img",{staticClass:"range-img",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d1af3be2e3b95a3c5753b_calender.svg",loading:"lazy",alt:""}}),t._v(" "),l("div",[t._v("1/03/2023")])])])]),t._v(" "),l("ul",{staticClass:"pagination",attrs:{role:"list"}},[l("li",[l("img",{staticClass:"page-arrow",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d42fe401fabbf1a4470ad_arrow-next-right-icon%202.svg",loading:"lazy",alt:""}})]),t._v(" "),l("li",{staticClass:"paginate-item"},[l("div",[t._v("1")])]),t._v(" "),l("li",{staticClass:"paginate-item active"},[l("div",[t._v("2")])]),t._v(" "),l("li",{staticClass:"paginate-item"},[l("div",[t._v("3")])]),t._v(" "),l("li",[l("img",{staticClass:"page-arrow",attrs:{src:"https://uploads-ssl.webflow.com/640f296b6b210c16af0bca5d/641d42fe2b0f0512ff5c8896_arrow-next-right-icon%201.svg",loading:"lazy",alt:""}})])])])])])}],!1,null,null,null);l.default=component.exports;installComponents(component,{AdminHeader:e(317).default,AdminNavigation:e(318).default,AdminFooter:e(316).default})}}]);