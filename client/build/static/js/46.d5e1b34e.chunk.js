(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[46],{299:function(e,a,t){"use strict";t.r(a);var r=t(22),n=t(23),l=t(25),c=t(24),u=t(2),s=t.n(u),i=t(26),m=t(12),d=t(64),o=t(320),E=t(62),h=t(71),g=t(69),p=t(70),O=t(74),b=t(65),v=t(75),f=t(66),k=t(76),y=t(77),P=t(78),j=function(e){Object(l.a)(t,e);var a=Object(c.a)(t);function t(e){var n;Object(r.a)(this,t),n=a.call(this,e);var l=!0;return null==localStorage.getItem("username")&&(l=!1),n.state={loggedIn:l,akun_id:localStorage.getItem("user_id")},n}return Object(n.a)(t,[{key:"displayAllPurchaseOrder",value:function(){var e=this.props.getPurchaseOrdersQuery,a=0;return e.loading?void 0:e.purchaseOrders.map((function(e){return a++,s.a.createElement("tr",{key:e.id},s.a.createElement("td",null,a),s.a.createElement("td",null,e.kode),s.a.createElement("td",null,e.vendor.nama),s.a.createElement("td",null,e.tanggal),s.a.createElement("td",null,e.status),s.a.createElement("td",null,s.a.createElement(i.Link,{to:"/purchaseOrder/detailPurchaseOrder/".concat(e.id)},s.a.createElement(h.a,{color:"primary",size:"sm"},s.a.createElement("i",{className:"fa fa-file"})))))}))}},{key:"addPurchaseOrder",value:function(){this.props.addPurchaseOrderMutation({variables:{kode:this.getKodeBaru(),tanggal:(new Date).toLocaleDateString(),status:"Belum Disetujui",tanggal_setuju:"",akun_id:this.state.akun_id,vendor_id:"5e5deb9c2a448419e86f84a6"},refetchQueries:[{query:E.G}]}),this.props.history.push("/purchaseOrder/buatPurchaseOrder")}},{key:"getKodeBaru",value:function(){var e="R",a=1;return this.props.getPurchaseOrdersQuery.purchaseOrders.map((function(e){a++})),e=a<10?e+"00"+a:a>=10&&a<100?e+"0"+a:e+""+a}},{key:"render",value:function(){return!1===this.state.loggedIn?s.a.createElement(m.c,{to:"/login"}):s.a.createElement("div",{className:"animated fadeIn"},s.a.createElement(g.a,null,s.a.createElement(p.a,null,s.a.createElement(O.a,null,s.a.createElement(b.a,null,s.a.createElement(g.a,null,s.a.createElement(p.a,null,"Daftar Purchase Order"),s.a.createElement(p.a,null,s.a.createElement(h.a,{color:"primary",size:"sm",className:"float-right mb-0",onClick:this.addPurchaseOrder.bind(this)},s.a.createElement("i",{className:"fa fa-plus"})," Buat Purchase Order")))),s.a.createElement(v.a,null,s.a.createElement(f.a,{hover:!0,bordered:!0,striped:!0,responsive:!0,size:"sm"},s.a.createElement("thead",{align:"center"},s.a.createElement("tr",null,s.a.createElement("th",null,"No"),s.a.createElement("th",null,"Kode"),s.a.createElement("th",null,"Nama Vendor"),s.a.createElement("th",null,"Tanggal"),s.a.createElement("th",null,"Status"),s.a.createElement("th",null,"Aksi"))),s.a.createElement("tbody",{align:"center"},this.displayAllPurchaseOrder())),s.a.createElement("nav",null,s.a.createElement(k.a,null,s.a.createElement(y.a,null,s.a.createElement(P.a,{previous:!0,tag:"button"},"Prev")),s.a.createElement(y.a,{active:!0},s.a.createElement(P.a,{tag:"button"},"1")),s.a.createElement(y.a,null,s.a.createElement(P.a,{tag:"button"},"2")),s.a.createElement(y.a,null,s.a.createElement(P.a,{tag:"button"},"3")),s.a.createElement(y.a,null,s.a.createElement(P.a,{tag:"button"},"4")),s.a.createElement(y.a,null,s.a.createElement(P.a,{next:!0,tag:"button"},"Next")))))))))}}]),t}(u.Component);a.default=d(Object(o.a)(E.G,{name:"getPurchaseOrdersQuery"}),Object(o.a)(E.j,{name:"addPurchaseOrderMutation"}))(j)}}]);
//# sourceMappingURL=46.d5e1b34e.chunk.js.map