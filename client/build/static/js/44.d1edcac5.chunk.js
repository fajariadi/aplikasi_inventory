(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[44],{295:function(e,a,t){"use strict";t.r(a);var n=t(22),r=t(23),l=t(25),u=t(24),i=t(2),s=t.n(i),c=t(26),m=t(12),o=t(320),d=t(64),g=t(62),E=t(71),h=t(69),p=t(70),b=t(74),v=t(65),f=t(75),y=t(66),k=t(76),B=t(77),P=t(78),j=function(e){Object(l.a)(t,e);var a=Object(u.a)(t);function t(e){var r;Object(n.a)(this,t),r=a.call(this,e);var l=!0;return null==localStorage.getItem("username")&&(l=!1),r.state={akun_id:localStorage.getItem("user_id"),kode:"",nama:"",jumlah:"",satuan:"",div_id:"",request_id:"",addRequest:!1,loggedIn:l},r}return Object(r.a)(t,[{key:"onDelete",value:function(e){this.props.hapusPermintaanBarangMutation({variables:{id:e},refetchQueries:[{query:g.D}]}),this.props.hapusManyListRequestMutation({variables:{id:e},refetchQueries:[{query:g.D}]})}},{key:"displayRequest",value:function(){var e=this.props.getPermintaanBarangsQuery,a=0;return e.loading?s.a.createElement("div",null,"Loading Permintaan Barang..."):e.permintaanBarangs.map((function(e){return a++,s.a.createElement("tr",{key:e.id},s.a.createElement("td",null,a),s.a.createElement("td",null,e.kode),s.a.createElement("td",null,e.akun.karyawan.divisi.nama),s.a.createElement("td",null,e.tanggal),s.a.createElement("td",null,e.status),s.a.createElement("td",null,s.a.createElement(c.Link,{to:"/permintaanBarang/detailPermintaanBarang/".concat(e.id)},s.a.createElement(E.a,{color:"primary",size:"sm"},s.a.createElement("i",{className:"fa fa-file"})))))}))}},{key:"getKodeBaru",value:function(){var e="",a=1;return this.props.getPermintaanBarangsQuery.permintaanBarangs.map((function(a){""!==a.kode&&(e=a.kode)})),""!==e&&(a=parseInt(e.substring(1,4))+1),e=a<10?"R00"+a:a>=10&&a<100?"R0"+a:"R"+a}},{key:"addRequestHandler",value:function(){this.props.addPermintaanBarangMutation({variables:{tanggal:(new Date).toLocaleDateString(),status:"Belum Disetujui",akun_id:this.state.akun_id,kode:this.getKodeBaru(),tanggal_setuju:"",disetujui_id:"5f7d7b275e9e27240c35abcf"},refetchQueries:[{query:g.D}]}),this.props.history.push("/permintaanBarang/buatPermintaanBarang")}},{key:"render",value:function(){return!1===this.state.loggedIn?s.a.createElement(m.c,{to:"/login"}):s.a.createElement("div",{className:"animated fadeIn"},s.a.createElement(h.a,null,s.a.createElement(p.a,null,s.a.createElement(b.a,null,s.a.createElement(v.a,null,s.a.createElement(h.a,null,s.a.createElement(p.a,null,s.a.createElement("h5",null,"Daftar Permintaan Barang")),s.a.createElement(p.a,null,s.a.createElement(E.a,{color:"primary",onClick:this.addRequestHandler.bind(this),className:"float-right mb-0"},s.a.createElement("i",{className:"fa fa-plus mr-2"}),"Buat Permintaan Barang")))),s.a.createElement(f.a,null,s.a.createElement(y.a,{hover:!0,bordered:!0,striped:!0,responsive:!0,size:"sm"},s.a.createElement("thead",{align:"center"},s.a.createElement("tr",null,s.a.createElement("th",null,"No"),s.a.createElement("th",null,"Kode"),s.a.createElement("th",null,"Divisi"),s.a.createElement("th",null,"Tanggal"),s.a.createElement("th",null,"Status"),s.a.createElement("th",null,"Aksi"))),s.a.createElement("tbody",{align:"center"},this.displayRequest())),s.a.createElement("nav",null,s.a.createElement(k.a,null,s.a.createElement(B.a,null,s.a.createElement(P.a,{previous:!0,tag:"button"},"Prev")),s.a.createElement(B.a,{active:!0},s.a.createElement(P.a,{tag:"button"},"1")),s.a.createElement(B.a,null,s.a.createElement(P.a,{tag:"button"},"2")),s.a.createElement(B.a,null,s.a.createElement(P.a,{tag:"button"},"3")),s.a.createElement(B.a,null,s.a.createElement(P.a,{tag:"button"},"4")),s.a.createElement(B.a,null,s.a.createElement(P.a,{next:!0,tag:"button"},"Next")))))))))}}]),t}(i.Component);a.default=d(Object(o.a)(g.D,{name:"getPermintaanBarangsQuery"}),Object(o.a)(g.v,{name:"getListRequestsQuery"}),Object(o.a)(g.h,{name:"addPermintaanBarangMutation"}),Object(o.a)(g.P,{name:"hapusPermintaanBarangMutation"}),Object(o.a)(g.L,{name:"hapusManyListRequestMutation"}))(j)}}]);
//# sourceMappingURL=44.d1edcac5.chunk.js.map