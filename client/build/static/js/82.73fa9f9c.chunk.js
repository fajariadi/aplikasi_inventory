(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[82],{362:function(e,a,t){"use strict";t.r(a);var n=t(22),r=t(23),l=t(25),m=t(24),c=t(2),d=t.n(c),i=t(375),E=t(26),o=t(70),u=t(73),s=t(68),h=t(101),p=t(65),k=t(66),b=t(104),g=t(105),v=t(81),y=t(74),f=t(67),O=t(64),w=t(71),B=function(e){Object(l.a)(t,e);var a=Object(m.a)(t);function t(){return Object(n.a)(this,t),a.apply(this,arguments)}return Object(r.a)(t,[{key:"displayPenerimaanBarangDetail",value:function(){var e=this.props.data.penerimaanBarang;if(e)return d.a.createElement(s.a,null,d.a.createElement(h.a,{className:"form-horizontal"},d.a.createElement(p.a,null,d.a.createElement(k.a,{md:"4"},d.a.createElement(b.a,{row:!0},d.a.createElement(k.a,{md:"6"},d.a.createElement(g.a,{htmlFor:"name"},"Kode Penerimaan Barang")),d.a.createElement(k.a,{md:"6"},d.a.createElement(v.a,{type:"text",name:"kode",id:"kode",value:e.kode,disabled:!0})))),d.a.createElement(k.a,{md:"4"},d.a.createElement(b.a,{row:!0},d.a.createElement(k.a,{md:"3"},d.a.createElement(g.a,{htmlFor:"name"},"Tanggal")),d.a.createElement(k.a,{md:"9"},d.a.createElement(v.a,{type:"text",name:"kode",id:"kode",value:e.tanggal,disabled:!0})))),d.a.createElement(k.a,{md:"4"},d.a.createElement(b.a,{row:!0},d.a.createElement(k.a,{md:"3"},d.a.createElement(g.a,{htmlFor:"name"},"Penerima")),d.a.createElement(k.a,{md:"9"},d.a.createElement(v.a,{type:"text",name:"kode",id:"kode",value:e.akun.karyawan.nama,disabled:!0}))))),d.a.createElement(p.a,null,d.a.createElement(k.a,{md:"4"},d.a.createElement(b.a,{row:!0},d.a.createElement(k.a,{md:"6"},d.a.createElement(g.a,{htmlFor:"name"},"Kode Purchase Order")),d.a.createElement(k.a,{md:"6"},d.a.createElement(v.a,{type:"text",name:"kode",id:"kode",value:e.purchaseOrder.kode,disabled:!0})))),d.a.createElement(k.a,{md:"4"},d.a.createElement(b.a,{row:!0},d.a.createElement(k.a,{md:"3"},d.a.createElement(g.a,{htmlFor:"name"},"Nama vendor")),d.a.createElement(k.a,{md:"9"},d.a.createElement(v.a,{type:"text",name:"kode",id:"kode",value:e.purchaseOrder.vendor.nama,disabled:!0})))))),d.a.createElement("hr",null),d.a.createElement(y.a,{hover:!0,bordered:!0,striped:!0,responsive:!0,size:"sm"},d.a.createElement("thead",{align:"center"},d.a.createElement("tr",null,d.a.createElement("th",null,"Nama Barang"),d.a.createElement("th",null,"Satuan"),d.a.createElement("th",null,"Jumlah"))),d.a.createElement("tbody",{align:"center"},e.purchaseOrder.listItemPurchaseOrder.map((function(e){return d.a.createElement("tr",{key:e.id},d.a.createElement("td",null,e.nama_barang),d.a.createElement("td",null,e.satuan),d.a.createElement("td",null,e.jumlah_barang))})))))}},{key:"render",value:function(){return d.a.createElement("div",{className:"animated fadeIn"},d.a.createElement(p.a,null,d.a.createElement(k.a,null,d.a.createElement(f.a,null,d.a.createElement(O.a,null,d.a.createElement("i",{className:"fa fa-align-justify"}),"Detail Penerimaan Barang",d.a.createElement(E.Link,{to:"/penerimaanBarang/penerimaanBarang",className:"float-right mb-0"},d.a.createElement(w.a,{color:"secondary",size:"sm"},"Kembali"))),this.displayPenerimaanBarangDetail()))))}}]),t}(c.Component);a.default=o(Object(i.a)(u.y,{options:function(e){return{variables:{id:e.match.params.id}}}}))(B)}}]);
//# sourceMappingURL=82.73fa9f9c.chunk.js.map