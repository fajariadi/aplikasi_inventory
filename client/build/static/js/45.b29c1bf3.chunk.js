(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[45],{404:function(e,a,t){"use strict";t.r(a);var n=t(23),r=t(24),l=t(26),s=t(25),i=t(2),c=t.n(i),m=t(265),o=t(421),d=t(72),u=t(69),g=t(111),p=t(112),E=t(80),h=t(77),y=t(405),b=t(406),v=t(423),f=t(424),x=t(383),N=t(203),P=t(91),B=t(110),A=t(12),k=t(359),O=t(360),M=Object(O.getStyle)("--primary"),C=Object(O.getStyle)("--info"),j={labels:["January","February","March","April","May","June","July"],datasets:[{label:"My First dataset",backgroundColor:M,borderColor:"rgba(255,255,255,.55)",data:[65,59,84,84,51,55,40]}]},S={tooltips:{enabled:!1,custom:k.CustomTooltips},maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,j.datasets[0].data)-5,max:Math.max.apply(Math,j.datasets[0].data)+5}}]},elements:{line:{borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}},w={labels:["January","February","March","April","May","June","July"],datasets:[{label:"My First dataset",backgroundColor:C,borderColor:"rgba(255,255,255,.55)",data:[1,18,9,17,34,22,11]}]},I={tooltips:{enabled:!1,custom:k.CustomTooltips},maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,w.datasets[0].data)-5,max:Math.max.apply(Math,w.datasets[0].data)+5}}]},elements:{line:{tension:1e-5,borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}},Q={labels:["January","February","March","April","May","June","July"],datasets:[{label:"My First dataset",backgroundColor:"rgba(255,255,255,.2)",borderColor:"rgba(255,255,255,.55)",data:[78,81,80,45,34,12,40]}]},J={tooltips:{enabled:!1,custom:k.CustomTooltips},maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{line:{borderWidth:2},point:{radius:0,hitRadius:10,hoverRadius:4}}},R={labels:["","","","","","","","","","","","","","","",""],datasets:[{label:"My First dataset",backgroundColor:"rgba(255,255,255,.3)",borderColor:"transparent",data:[78,81,80,45,34,12,40,75,34,89,32,68,54,72,18,98]}]},L={tooltips:{enabled:!1,custom:k.CustomTooltips},maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{display:!1,barPercentage:.6}],yAxes:[{display:!1}]}},F=function(e){Object(l.a)(t,e);var a=Object(s.a)(t);function t(e){var r;Object(n.a)(this,t),r=a.call(this,e);var l=!0;return null==localStorage.getItem("username")&&(l=!1),r.state={nama:localStorage.getItem("nama"),loggedIn:l},r}return Object(r.a)(t,[{key:"getPermintaanBarang",value:function(){var e=this.props.getPermintaanBarangsQuery,a=0;return e.loading?c.a.createElement("div",null,"Loading Permintaan..."):(e.permintaanBarangs.map((function(e){a++})),a)}},{key:"getPurchaseOrder",value:function(){var e=this.props.getPurchaseOrdersQuery,a=0;return e.loading?c.a.createElement("div",null,"Loading Pembelian..."):(e.purchaseOrders.map((function(e){a++})),a)}},{key:"getPersediaanBarang",value:function(){var e=this.props.getPersediaanBarangsQuery,a=0;return e.loading?c.a.createElement("div",null,"Loading Persediaan..."):(e.persediaanBarangs.map((function(e){a++})),a)}},{key:"getInventaris",value:function(){var e=this.props.getAllInventarisQuery,a=0;return e.loading?c.a.createElement("div",null,"Loading Inventaris..."):(e.allInventaris.map((function(e){a++})),a)}},{key:"displayPenerimaanBarang",value:function(){var e=this.props.getPenerimaanBarangsQuery,a=0;return e.loading?void 0:e.penerimaanBarangs.map((function(e){return a++,c.a.createElement("tr",{key:e.id},c.a.createElement("td",null,a),c.a.createElement("td",null,e.kode),c.a.createElement("td",null,e.tanggal),c.a.createElement("td",null,e.purchaseOrder.vendor.nama))}))}},{key:"displayPengeluaranBarang",value:function(){var e=this.props.getPengeluaranBarangsQuery,a=0;return e.loading?void 0:e.pengeluaranBarangs.map((function(e){return a++,c.a.createElement("tr",{key:e.id},c.a.createElement("td",null,a),c.a.createElement("td",null,e.kode),c.a.createElement("td",null,e.tanggal),c.a.createElement("td",null,e.permintaanBarang.akun.karyawan.divisi.nama))}))}},{key:"render",value:function(){var e=this;return!1===this.state.loggedIn?c.a.createElement(A.c,{to:"/login"}):c.a.createElement("div",{className:"animated fadeIn"},c.a.createElement(g.a,null,c.a.createElement(p.a,{xs:"12",sm:"6",lg:"3"},c.a.createElement(E.a,{className:"text-white bg-info"},c.a.createElement(h.a,{className:"pb-0"},c.a.createElement(y.a,{className:"float-right"},c.a.createElement(b.a,{id:"card1",isOpen:this.state.card1,toggle:function(){e.setState({card1:!e.state.card1})}},c.a.createElement(v.a,{caret:!0,className:"p-0",color:"transparent"},c.a.createElement("i",{className:"icon-settings"})),c.a.createElement(f.a,{right:!0},c.a.createElement(x.a,null,"Action"),c.a.createElement(x.a,null,"Another action"),c.a.createElement(x.a,{disabled:!0},"Disabled action"),c.a.createElement(x.a,null,"Something else here")))),c.a.createElement("div",{className:"text-value"},this.getPermintaanBarang()),c.a.createElement("div",null,"Permintaan Barang")),c.a.createElement("div",{className:"chart-wrapper mx-3",style:{height:"70px"}},c.a.createElement(m.b,{data:w,options:I,height:70})))),c.a.createElement(p.a,{xs:"12",sm:"6",lg:"3"},c.a.createElement(E.a,{className:"text-white bg-warning"},c.a.createElement(h.a,{className:"pb-0"},c.a.createElement(y.a,{className:"float-right"},c.a.createElement(N.a,{id:"card3",isOpen:this.state.card3,toggle:function(){e.setState({card3:!e.state.card3})}},c.a.createElement(v.a,{caret:!0,className:"p-0",color:"transparent"},c.a.createElement("i",{className:"icon-settings"})),c.a.createElement(f.a,{right:!0},c.a.createElement(x.a,null,"Action"),c.a.createElement(x.a,null,"Another action"),c.a.createElement(x.a,null,"Something else here")))),c.a.createElement("div",{className:"text-value"},this.getPurchaseOrder()),c.a.createElement("div",null,"Purchase Order")),c.a.createElement("div",{className:"chart-wrapper",style:{height:"70px"}},c.a.createElement(m.b,{data:Q,options:J,height:70})))),c.a.createElement(p.a,{xs:"12",sm:"6",lg:"3"},c.a.createElement(E.a,{className:"text-white bg-primary"},c.a.createElement(h.a,{className:"pb-0"},c.a.createElement(y.a,{className:"float-right"},c.a.createElement(N.a,{id:"card2",isOpen:this.state.card2,toggle:function(){e.setState({card2:!e.state.card2})}},c.a.createElement(v.a,{className:"p-0",color:"transparent"},c.a.createElement("i",{className:"icon-location-pin"})),c.a.createElement(f.a,{right:!0},c.a.createElement(x.a,null,"Action"),c.a.createElement(x.a,null,"Another action"),c.a.createElement(x.a,null,"Something else here")))),c.a.createElement("div",{className:"text-value"},this.getPersediaanBarang()),c.a.createElement("div",null,"Persediaan Barang")),c.a.createElement("div",{className:"chart-wrapper mx-3",style:{height:"70px"}},c.a.createElement(m.b,{data:j,options:S,height:70})))),c.a.createElement(p.a,{xs:"12",sm:"6",lg:"3"},c.a.createElement(E.a,{className:"text-white bg-success"},c.a.createElement(h.a,{className:"pb-0"},c.a.createElement(y.a,{className:"float-right"},c.a.createElement(b.a,{id:"card4",isOpen:this.state.card4,toggle:function(){e.setState({card4:!e.state.card4})}},c.a.createElement(v.a,{caret:!0,className:"p-0",color:"transparent"},c.a.createElement("i",{className:"icon-settings"})),c.a.createElement(f.a,{right:!0},c.a.createElement(x.a,null,"Action"),c.a.createElement(x.a,null,"Another action"),c.a.createElement(x.a,null,"Something else here")))),c.a.createElement("div",{className:"text-value"},this.getInventaris()),c.a.createElement("div",null,"Inventaris")),c.a.createElement("div",{className:"chart-wrapper mx-3",style:{height:"70px"}},c.a.createElement(m.a,{data:R,options:L,height:70}))))),c.a.createElement(g.a,null,c.a.createElement(p.a,{xs:"12",lg:"6"},c.a.createElement(E.a,null,c.a.createElement(P.a,null,c.a.createElement("i",{className:"fa fa-align-justify"})," Daftar Penerimaan Barang"),c.a.createElement(h.a,null,c.a.createElement(B.a,{responsive:!0},c.a.createElement("thead",{align:"center"},c.a.createElement("tr",null,c.a.createElement("th",null,"No"),c.a.createElement("th",null,"Kode"),c.a.createElement("th",null,"Tanggal"),c.a.createElement("th",null,"Vendor"))),c.a.createElement("tbody",{align:"center"},this.displayPenerimaanBarang()))))),c.a.createElement(p.a,{xs:"12",lg:"6"},c.a.createElement(E.a,null,c.a.createElement(P.a,null,c.a.createElement("i",{className:"fa fa-align-justify"})," Daftar Pengeluaran Barang"),c.a.createElement(h.a,null,c.a.createElement(B.a,{responsive:!0},c.a.createElement("thead",{align:"center"},c.a.createElement("tr",null,c.a.createElement("th",null,"No"),c.a.createElement("th",null,"Kode"),c.a.createElement("th",null,"Tanggal"),c.a.createElement("th",null,"Divisi"))),c.a.createElement("tbody",{align:"center"},this.displayPengeluaranBarang())))))))}}]),t}(i.Component);a.default=d(Object(o.a)(u.D,{name:"getPermintaanBarangsQuery"}),Object(o.a)(u.G,{name:"getPurchaseOrdersQuery"}),Object(o.a)(u.E,{name:"getPersediaanBarangsQuery"}),Object(o.a)(u.p,{name:"getAllInventarisQuery"}),Object(o.a)(u.z,{name:"getPenerimaanBarangsQuery"}),Object(o.a)(u.B,{name:"getPengeluaranBarangsQuery"}))(F)}}]);
//# sourceMappingURL=45.b29c1bf3.chunk.js.map