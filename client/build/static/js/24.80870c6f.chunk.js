(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[24],{346:function(e,a,t){"use strict";t.r(a);var n=t(22),r=t(23),s=t(25),l=t(24),o=t(2),c=t.n(o),i=t(26),u=t(12),m=t(375),d=t(70),b=t(73),g=t(71),f=t(65),p=t(66),v=t(67),h=t(64),j=t(68),y=t(74),E=t(83),O=t(84),N=t(85),M=function(e){Object(s.a)(t,e);var a=Object(l.a)(t);function t(e){var r;Object(n.a)(this,t),r=a.call(this,e);var s=!0;return null==localStorage.getItem("username")&&(s=!1),r.state={akun_id:localStorage.getItem("user_id"),kode:"",nama:"",jumlah:"",satuan:"",div_id:"",request_id:"",addRequest:!1,loggedIn:s},r}return Object(r.a)(t,[{key:"onDelete",value:function(e){this.props.hapusPermintaanBarangMutation({variables:{id:e},refetchQueries:[{query:b.D}]}),this.props.hapusManyListRequestMutation({variables:{id:e},refetchQueries:[{query:b.D}]})}},{key:"displayRequest",value:function(){var e=this.props.getPermintaanBarangsQuery,a=0;return e.loading?c.a.createElement("div",null,"Loading Permintaan Barang..."):e.permintaanBarangs.map((function(e){return a++,c.a.createElement("tr",{key:e.id},c.a.createElement("td",null,a),c.a.createElement("td",null,e.kode),c.a.createElement("td",null,e.akun.karyawan.divisi.nama),c.a.createElement("td",null,e.tanggal),c.a.createElement("td",null,e.status),c.a.createElement("td",null,c.a.createElement(i.Link,{to:"/permintaanBarang/detailPermintaanBarang/".concat(e.id)},c.a.createElement(g.a,{color:"primary",size:"sm"},c.a.createElement("i",{className:"fa fa-file"})))))}))}},{key:"getKodeBaru",value:function(){var e="",a=1;return this.props.getPermintaanBarangsQuery.permintaanBarangs.map((function(a){""!==a.kode&&(e=a.kode)})),""!==e&&(a=parseInt(e.substring(1,4))+1),e=a<10?"R00"+a:a>=10&&a<100?"R0"+a:"R"+a}},{key:"addRequestHandler",value:function(){this.props.addPermintaanBarangMutation({variables:{tanggal:(new Date).toLocaleDateString(),status:"Belum Disetujui",akun_id:this.state.akun_id,kode:this.getKodeBaru(),tanggal_setuju:"",disetujui_id:"5f7d7b275e9e27240c35abcf"},refetchQueries:[{query:b.D}]}),this.props.history.push("/permintaanBarang/buatPermintaanBarang")}},{key:"render",value:function(){return!1===this.state.loggedIn?c.a.createElement(u.c,{to:"/login"}):c.a.createElement("div",{className:"animated fadeIn"},c.a.createElement(f.a,null,c.a.createElement(p.a,null,c.a.createElement(v.a,null,c.a.createElement(h.a,null,c.a.createElement(f.a,null,c.a.createElement(p.a,null,c.a.createElement("h5",null,"Daftar Permintaan Barang")),c.a.createElement(p.a,null,c.a.createElement(g.a,{color:"primary",onClick:this.addRequestHandler.bind(this),className:"float-right mb-0"},c.a.createElement("i",{className:"fa fa-plus mr-2"}),"Buat Permintaan Barang")))),c.a.createElement(j.a,null,c.a.createElement(y.a,{hover:!0,bordered:!0,striped:!0,responsive:!0,size:"sm"},c.a.createElement("thead",{align:"center"},c.a.createElement("tr",null,c.a.createElement("th",null,"No"),c.a.createElement("th",null,"Kode"),c.a.createElement("th",null,"Divisi"),c.a.createElement("th",null,"Tanggal"),c.a.createElement("th",null,"Status"),c.a.createElement("th",null,"Aksi"))),c.a.createElement("tbody",{align:"center"},this.displayRequest())),c.a.createElement("nav",null,c.a.createElement(E.a,null,c.a.createElement(O.a,null,c.a.createElement(N.a,{previous:!0,tag:"button"},"Prev")),c.a.createElement(O.a,{active:!0},c.a.createElement(N.a,{tag:"button"},"1")),c.a.createElement(O.a,null,c.a.createElement(N.a,{tag:"button"},"2")),c.a.createElement(O.a,null,c.a.createElement(N.a,{tag:"button"},"3")),c.a.createElement(O.a,null,c.a.createElement(N.a,{tag:"button"},"4")),c.a.createElement(O.a,null,c.a.createElement(N.a,{next:!0,tag:"button"},"Next")))))))))}}]),t}(o.Component);a.default=d(Object(m.a)(b.D,{name:"getPermintaanBarangsQuery"}),Object(m.a)(b.w,{name:"getListRequestsQuery"}),Object(m.a)(b.j,{name:"addPermintaanBarangMutation"}),Object(m.a)(b.Q,{name:"hapusPermintaanBarangMutation"}),Object(m.a)(b.M,{name:"hapusManyListRequestMutation"}))(M)},64:function(e,a,t){"use strict";var n=t(4),r=t(13),s=t(2),l=t.n(s),o=t(14),c=t.n(o),i=t(59),u=t.n(i),m=t(60),d={tag:m.q,className:c.a.string,cssModule:c.a.object},b=function(e){var a=e.className,t=e.cssModule,s=e.tag,o=Object(r.a)(e,["className","cssModule","tag"]),c=Object(m.m)(u()(a,"card-header"),t);return l.a.createElement(s,Object(n.a)({},o,{className:c}))};b.propTypes=d,b.defaultProps={tag:"div"},a.a=b},65:function(e,a,t){"use strict";var n=t(4),r=t(13),s=t(2),l=t.n(s),o=t(14),c=t.n(o),i=t(59),u=t.n(i),m=t(60),d=c.a.oneOfType([c.a.number,c.a.string]),b={tag:m.q,noGutters:c.a.bool,className:c.a.string,cssModule:c.a.object,form:c.a.bool,xs:d,sm:d,md:d,lg:d,xl:d},g={tag:"div",widths:["xs","sm","md","lg","xl"]},f=function(e){var a=e.className,t=e.cssModule,s=e.noGutters,o=e.tag,c=e.form,i=e.widths,d=Object(r.a)(e,["className","cssModule","noGutters","tag","form","widths"]),b=[];i.forEach((function(a,t){var n=e[a];if(delete d[a],n){var r=!t;b.push(r?"row-cols-"+n:"row-cols-"+a+"-"+n)}}));var g=Object(m.m)(u()(a,s?"no-gutters":null,c?"form-row":"row",b),t);return l.a.createElement(o,Object(n.a)({},d,{className:g}))};f.propTypes=b,f.defaultProps=g,a.a=f},66:function(e,a,t){"use strict";var n=t(4),r=t(13),s=t(2),l=t.n(s),o=t(14),c=t.n(o),i=t(59),u=t.n(i),m=t(60),d=c.a.oneOfType([c.a.number,c.a.string]),b=c.a.oneOfType([c.a.bool,c.a.number,c.a.string,c.a.shape({size:c.a.oneOfType([c.a.bool,c.a.number,c.a.string]),order:d,offset:d})]),g={tag:m.q,xs:b,sm:b,md:b,lg:b,xl:b,className:c.a.string,cssModule:c.a.object,widths:c.a.array},f={tag:"div",widths:["xs","sm","md","lg","xl"]},p=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},v=function(e){var a=e.className,t=e.cssModule,s=e.widths,o=e.tag,c=Object(r.a)(e,["className","cssModule","widths","tag"]),i=[];s.forEach((function(a,n){var r=e[a];if(delete c[a],r||""===r){var s=!n;if(Object(m.k)(r)){var l,o=s?"-":"-"+a+"-",d=p(s,a,r.size);i.push(Object(m.m)(u()(((l={})[d]=r.size||""===r.size,l["order"+o+r.order]=r.order||0===r.order,l["offset"+o+r.offset]=r.offset||0===r.offset,l)),t))}else{var b=p(s,a,r);i.push(b)}}})),i.length||i.push("col");var d=Object(m.m)(u()(a,i),t);return l.a.createElement(o,Object(n.a)({},c,{className:d}))};v.propTypes=g,v.defaultProps=f,a.a=v},67:function(e,a,t){"use strict";var n=t(4),r=t(13),s=t(2),l=t.n(s),o=t(14),c=t.n(o),i=t(59),u=t.n(i),m=t(60),d={tag:m.q,inverse:c.a.bool,color:c.a.string,body:c.a.bool,outline:c.a.bool,className:c.a.string,cssModule:c.a.object,innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])},b=function(e){var a=e.className,t=e.cssModule,s=e.color,o=e.body,c=e.inverse,i=e.outline,d=e.tag,b=e.innerRef,g=Object(r.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),f=Object(m.m)(u()(a,"card",!!c&&"text-white",!!o&&"card-body",!!s&&(i?"border":"bg")+"-"+s),t);return l.a.createElement(d,Object(n.a)({},g,{className:f,ref:b}))};b.propTypes=d,b.defaultProps={tag:"div"},a.a=b},68:function(e,a,t){"use strict";var n=t(4),r=t(13),s=t(2),l=t.n(s),o=t(14),c=t.n(o),i=t(59),u=t.n(i),m=t(60),d={tag:m.q,className:c.a.string,cssModule:c.a.object,innerRef:c.a.oneOfType([c.a.object,c.a.string,c.a.func])},b=function(e){var a=e.className,t=e.cssModule,s=e.innerRef,o=e.tag,c=Object(r.a)(e,["className","cssModule","innerRef","tag"]),i=Object(m.m)(u()(a,"card-body"),t);return l.a.createElement(o,Object(n.a)({},c,{className:i,ref:s}))};b.propTypes=d,b.defaultProps={tag:"div"},a.a=b},70:function(e,a,t){(function(a){var t="object"==typeof a&&a&&a.Object===Object&&a,n="object"==typeof self&&self&&self.Object===Object&&self,r=t||n||Function("return this")();function s(e,a,t){switch(t.length){case 0:return e.call(a);case 1:return e.call(a,t[0]);case 2:return e.call(a,t[0],t[1]);case 3:return e.call(a,t[0],t[1],t[2])}return e.apply(a,t)}function l(e,a){for(var t=-1,n=a.length,r=e.length;++t<n;)e[r+t]=a[t];return e}var o=Object.prototype,c=o.hasOwnProperty,i=o.toString,u=r.Symbol,m=o.propertyIsEnumerable,d=u?u.isConcatSpreadable:void 0,b=Math.max;function g(e){return f(e)||function(e){return function(e){return function(e){return!!e&&"object"==typeof e}(e)&&function(e){return null!=e&&function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}(e.length)&&!function(e){var a=function(e){var a=typeof e;return!!e&&("object"==a||"function"==a)}(e)?i.call(e):"";return"[object Function]"==a||"[object GeneratorFunction]"==a}(e)}(e)}(e)&&c.call(e,"callee")&&(!m.call(e,"callee")||"[object Arguments]"==i.call(e))}(e)||!!(d&&e&&e[d])}var f=Array.isArray;var p=function(e){return a=function(a){var t=(a=function e(a,t,n,r,s){var o=-1,c=a.length;for(n||(n=g),s||(s=[]);++o<c;){var i=a[o];t>0&&n(i)?t>1?e(i,t-1,n,r,s):l(s,i):r||(s[s.length]=i)}return s}(a,1)).length,n=t;for(e&&a.reverse();n--;)if("function"!=typeof a[n])throw new TypeError("Expected a function");return function(){for(var e=0,n=t?a[e].apply(this,arguments):arguments[0];++e<t;)n=a[e].call(this,n);return n}},t=b(void 0===t?a.length-1:t,0),function(){for(var e=arguments,n=-1,r=b(e.length-t,0),l=Array(r);++n<r;)l[n]=e[t+n];n=-1;for(var o=Array(t+1);++n<t;)o[n]=e[n];return o[t]=l,s(a,this,o)};var a,t}(!0);e.exports=p}).call(this,t(29))},74:function(e,a,t){"use strict";var n=t(4),r=t(13),s=t(2),l=t.n(s),o=t(14),c=t.n(o),i=t(59),u=t.n(i),m=t(60),d={className:c.a.string,cssModule:c.a.object,size:c.a.string,bordered:c.a.bool,borderless:c.a.bool,striped:c.a.bool,dark:c.a.bool,hover:c.a.bool,responsive:c.a.oneOfType([c.a.bool,c.a.string]),tag:m.q,responsiveTag:m.q,innerRef:c.a.oneOfType([c.a.func,c.a.string,c.a.object])},b=function(e){var a=e.className,t=e.cssModule,s=e.size,o=e.bordered,c=e.borderless,i=e.striped,d=e.dark,b=e.hover,g=e.responsive,f=e.tag,p=e.responsiveTag,v=e.innerRef,h=Object(r.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),j=Object(m.m)(u()(a,"table",!!s&&"table-"+s,!!o&&"table-bordered",!!c&&"table-borderless",!!i&&"table-striped",!!d&&"table-dark",!!b&&"table-hover"),t),y=l.a.createElement(f,Object(n.a)({},h,{ref:v,className:j}));if(g){var E=Object(m.m)(!0===g?"table-responsive":"table-responsive-"+g,t);return l.a.createElement(p,{className:E},y)}return y};b.propTypes=d,b.defaultProps={tag:"table",responsiveTag:"div"},a.a=b},83:function(e,a,t){"use strict";var n=t(4),r=t(13),s=t(2),l=t.n(s),o=t(14),c=t.n(o),i=t(59),u=t.n(i),m=t(60),d={children:c.a.node,className:c.a.string,listClassName:c.a.string,cssModule:c.a.object,size:c.a.string,tag:m.q,listTag:m.q,"aria-label":c.a.string},b=function(e){var a,t=e.className,s=e.listClassName,o=e.cssModule,c=e.size,i=e.tag,d=e.listTag,b=e["aria-label"],g=Object(r.a)(e,["className","listClassName","cssModule","size","tag","listTag","aria-label"]),f=Object(m.m)(u()(t),o),p=Object(m.m)(u()(s,"pagination",((a={})["pagination-"+c]=!!c,a)),o);return l.a.createElement(i,{className:f,"aria-label":b},l.a.createElement(d,Object(n.a)({},g,{className:p})))};b.propTypes=d,b.defaultProps={tag:"nav",listTag:"ul","aria-label":"pagination"},a.a=b},84:function(e,a,t){"use strict";var n=t(4),r=t(13),s=t(2),l=t.n(s),o=t(14),c=t.n(o),i=t(59),u=t.n(i),m=t(60),d={active:c.a.bool,children:c.a.node,className:c.a.string,cssModule:c.a.object,disabled:c.a.bool,tag:m.q},b=function(e){var a=e.active,t=e.className,s=e.cssModule,o=e.disabled,c=e.tag,i=Object(r.a)(e,["active","className","cssModule","disabled","tag"]),d=Object(m.m)(u()(t,"page-item",{active:a,disabled:o}),s);return l.a.createElement(c,Object(n.a)({},i,{className:d}))};b.propTypes=d,b.defaultProps={tag:"li"},a.a=b},85:function(e,a,t){"use strict";var n=t(4),r=t(13),s=t(2),l=t.n(s),o=t(14),c=t.n(o),i=t(59),u=t.n(i),m=t(60),d={"aria-label":c.a.string,children:c.a.node,className:c.a.string,cssModule:c.a.object,next:c.a.bool,previous:c.a.bool,first:c.a.bool,last:c.a.bool,tag:m.q},b=function(e){var a,t=e.className,s=e.cssModule,o=e.next,c=e.previous,i=e.first,d=e.last,b=e.tag,g=Object(r.a)(e,["className","cssModule","next","previous","first","last","tag"]),f=Object(m.m)(u()(t,"page-link"),s);c?a="Previous":o?a="Next":i?a="First":d&&(a="Last");var p,v=e["aria-label"]||a;c?p="\u2039":o?p="\u203a":i?p="\xab":d&&(p="\xbb");var h=e.children;return h&&Array.isArray(h)&&0===h.length&&(h=null),g.href||"a"!==b||(b="button"),(c||o||i||d)&&(h=[l.a.createElement("span",{"aria-hidden":"true",key:"caret"},h||p),l.a.createElement("span",{className:"sr-only",key:"sr"},v)]),l.a.createElement(b,Object(n.a)({},g,{className:f,"aria-label":v}),h)};b.propTypes=d,b.defaultProps={tag:"a"},a.a=b}}]);
//# sourceMappingURL=24.80870c6f.chunk.js.map