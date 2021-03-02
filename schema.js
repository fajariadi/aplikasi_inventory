const graphql = require ('graphql');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const Vendor = require('./models/VendorModel');
const Peralatan = require('./models/PeralatanModel');
const Divisi = require('./models/DivisiModel');
const PermintaanBarang = require('./models/PermintaanBarangModel');
const ListRequest = require('./models/ListRequestModel');
const PurchaseOrder = require('./models/PurchaseOrderModel');
const Barang = require('./models/BarangModel');
const Karyawan = require('./models/KaryawanModel');
const Akun = require('./models/AkunModel');
const ListItemPurchaseOrder = require('./models/ListItemPurchaseOrder');
const Perusahaan = require('./models/PerusahaanModel');
const PersediaanBarang = require('./models/PersediaanBarangModel');
const Inventaris = require('./models/InventarisModel');
const PenerimaanBarang = require('./models/PenerimaanBarangModel');
const PengeluaranBarang = require('./models/PengeluaranBarangModel');
const Pemeliharaan = require('./models/PemeliharaanModel');



const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
} = graphql;

const PerusahaanType = new GraphQLObjectType({
	name: 'Perusahaan',
	fields: () => ({
		id: {type: GraphQLID},
		nama: {type:GraphQLString},
		alamat: {type: GraphQLString},
		kodePos: {type: GraphQLInt},
		email: {type: GraphQLString},
		noTlp: {type: GraphQLString},
	})
});

const InventarisType = new GraphQLObjectType({
	name: 'Inventaris',
	fields: () => ({
		id: {type: GraphQLID},
		jumlah: {type: GraphQLInt},
		status:{type:GraphQLString},
		jumlah_diperbaiki: {type: GraphQLInt},
		jumlah_dipakai: {type: GraphQLInt},
		barang: {
			type: BarangType,
			resolve(parent, args){
				return Barang.findById(parent.barang_id);
			}
		}
	})
});

const PemeliharaanType = new GraphQLObjectType({
	name: 'Pemeliharaan',
	fields: () => ({
		id: {type: GraphQLID},
		jumlah: {type: GraphQLInt},
		status:{type:GraphQLString},
		tanggal:{type:GraphQLString},
		karyawan: {
			type: KaryawanType,
			resolve(parent, args){
				return Karyawan.findById(parent.karyawan_id);
			}
		},
		inventaris: {
			type: InventarisType,
			resolve(parent, args){
				return Inventaris.findById(parent.inventaris_id);
			}
		}
	})
});

const PenerimaanBarangType = new GraphQLObjectType({
	name: 'PenerimaanBarang',
	fields: () => ({
		id: {type: GraphQLID},
		kode: {type: GraphQLString},
		tanggal: {type: GraphQLString},
		akun: {
			type: AkunType,
			resolve(parent,args){
				return Akun.findById(parent.akun_id);
			}
		},
		purchaseOrder: {
			type: PurchaseOrderType,
			resolve(parent,args){
				return PurchaseOrder.findById(parent.purchase_id);
			}
		},
	})
});

const PengeluaranBarangType = new GraphQLObjectType({
	name: 'PengeluaranBarang',
	fields: () => ({
		id: {type: GraphQLID},
		kode: {type: GraphQLString},
		tanggal: {type: GraphQLString},
		akun: {
			type: AkunType,
			resolve(parent,args){
				return Akun.findById(parent.akun_id);
			}
		},
		permintaanBarang: {
			type: PermintaanBarangType,
			resolve(parent,args){
				return PermintaanBarang.findById(parent.permintaan_id);
			}
		},
	})
});

const VendorType = new GraphQLObjectType({
	name: 'Vendor',
	fields: () => ({
		id: {type: GraphQLID},
		nama: {type:GraphQLString},
		jenis_usaha: {type: GraphQLString},
		alamat: {type: GraphQLString},
		email: {type: GraphQLString},
		noTlp: {type: GraphQLString},
		purchaseOrders: {
			type: new GraphQLList(PurchaseOrderType),
			resolve(parent, args){
				return PurchaseOrder.find({vendor_id: parent.id});
			}
		}
	})
});

const PeralatanType = new GraphQLObjectType({
	name: 'Peralatan',
	fields: () => ({
		id: {type: GraphQLID},
		nama: {type:GraphQLString},
		jumlah: {type: GraphQLInt},
		harga: {type: GraphQLInt},
		sewa: {type: GraphQLInt},
	})
});

const PersediaanBarangType = new GraphQLObjectType({
	name: 'PersediaanBarang',
	fields: () => ({
		id: {type: GraphQLID},
		jumlah: {type: GraphQLInt},
		status: {type: GraphQLString},
		barang: {
			type: BarangType,
			resolve(parent, args){
				return Barang.findById(parent.barang_id);
			}
		}
	})
});

const DivisiType = new GraphQLObjectType({
	name: 'Divisi',
	fields: () => ({
		id: {type: GraphQLID},
		nama: {type:GraphQLString},
		karyawans:{
			type: new GraphQLList(KaryawanType),
			resolve(parent,args){
				return Karyawan.find({divisi_id: parent.id});
			}
		},
	})
});

const PermintaanBarangType = new GraphQLObjectType({
	name: 'PermintaanBarang',
	fields: () => ({
		id: {type: GraphQLID},
		tanggal: {type:GraphQLString},
		status: {type:GraphQLString},
		kode: {type:GraphQLString},
		tanggal_setuju: {type:GraphQLString},
		disetujui : {
			type: AkunType,
			resolve(parent,args){
				return Akun.findById(parent.disetujui_id);
			}
		},
		akun: {
			type: AkunType,
			resolve(parent,args){
				return Akun.findById(parent.akun_id);
			}
		},
		listRequest: {
			type: new GraphQLList(ListRequestType),
			resolve(parent,args){
				return ListRequest.find({request_id: parent.id});
			}
		}, 
		divisi: {
			type: DivisiType,
			resolve(parent,args){
				return Divisi.findById(parent.divisi_id)
			}
		}
	})
});

const ListRequestType = new GraphQLObjectType({
	name: "ListRequest",
	fields: () => ({
		id: {type: GraphQLID},
		nama_barang: {type: GraphQLString},
		jumlah_barang: { type: GraphQLInt},
		satuan: {type: GraphQLString},
		jenis: {type: GraphQLString},
		status: {type: GraphQLString},
		harga: { type: GraphQLInt},
		purchaseOrder: {
			type: PurchaseOrderType,
			resolve(parent,args){
				return PurchaseOrder.findById(parent.order_id);
			}	
		},
		permintaanBarang: {
			type: PermintaanBarangType,
			resolve(parent,args){
				return PermintaanBarang.findById(parent.request_id);
			}
		}
	})
});

const ListItemPurchaseOrderType = new GraphQLObjectType({
	name: "ListItemPurchaseOrder",
	fields: () => ({
		id: {type: GraphQLID},
		nama_barang: {type: GraphQLString},
		jumlah_barang: { type: GraphQLInt},
		satuan: {type: GraphQLString},
		jenis: {type: GraphQLString},
		status: {type: GraphQLString},
		harga: { type: GraphQLInt},
		purchaseOrder: {
			type: PurchaseOrderType,
			resolve(parent,args){
				return PurchaseOrder.findById(parent.purchaseOrder_id);
			}
		}
	})
});

const PurchaseOrderType = new GraphQLObjectType({
	name: 'PurchaseOrder',
	fields: () => ({
		id: {type: GraphQLID},
		kode: {type:GraphQLString},
		tanggal: {type:GraphQLString},
		tanggal_setuju: {type:GraphQLString},
		status: {type:GraphQLString},
		total_harga: {type:GraphQLInt},
		akun: {
			type: AkunType,
			resolve(parent,args){
				return Akun.findById(parent.akun_id);
			}
		},
		vendor: {
			type: VendorType,
			resolve(parent, args){
				return Vendor.findById(parent.vendor_id);
			}
		},
		listItemPurchaseOrder: {
			type: new GraphQLList(ListItemPurchaseOrderType),
			resolve(parent,args){ 
				return ListItemPurchaseOrder.find({purchaseOrder_id: parent.id});
			}
		},
		
	})
});

const BarangType = new GraphQLObjectType({
	name: 'Barang',
	fields: () => ({
		id: {type: GraphQLID},
		nama_barang: {type:GraphQLString},
		jenis_barang: {type:GraphQLString},
		satuan: {type:GraphQLString},
		harga: {type: GraphQLInt},
	})
});
const KaryawanType = new GraphQLObjectType({
	name: 'Karyawan',
	fields: () => ({
		id: {type: GraphQLID},
		nama: {type:GraphQLString},
		tanggal_lahir: {type:GraphQLString},
		jenis_kelamin: {type:GraphQLString},
		agama: {type:GraphQLString},
		tempat_lahir: {type:GraphQLString},
		alamat: {type:GraphQLString},
		no_kontak: {type:GraphQLString},
		email: {type:GraphQLString},
		jabatan: {type:GraphQLString},
		divisi: {
			type: DivisiType,
			resolve(parent,args){
				return Divisi.findById(parent.divisi_id);
			}
		},
	})
});

const AkunType = new GraphQLObjectType({
	name: "Akun",
	fields: () => ({
		id: {type: GraphQLID},
		username: {type: GraphQLString},
		password: { type: GraphQLString},
		karyawan: {
			type: KaryawanType,
			resolve(parent,args){
				return Karyawan.findById(parent.karyawan_id);
			}
		},
	})
});

const FotoType = new GraphQLObjectType({
	name: "Foto",
	fields: () => ({
		url: {type: GraphQLString},
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		perusahaan:{
			type: PerusahaanType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Perusahaan.findById(args.id);
			}
		},
		vendor:{
			type: VendorType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Vendor.findById(args.id);
			}
		},
		vendors:{
			type: new GraphQLList(VendorType),
			resolve(parent,args){
				return Vendor.find({});
			}
		},
		peralatan:{
			type: PeralatanType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Peralatan.findById(args.id);
			}
		},
		peralatans:{
			type: new GraphQLList(PeralatanType),
			resolve(parent,args){
				return Peralatan.find({});
			}
		},
		divisi:{
			type: DivisiType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Divisi.findById(args.id);
			}
		},
		divisis:{
			type: new GraphQLList(DivisiType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Divisi.find({});
			}
		},
		permintaanBarang:{
			type: PermintaanBarangType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PermintaanBarang.findById(args.id);
			}
		},
		permintaanBarangs:{
			type: new GraphQLList(PermintaanBarangType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PermintaanBarang.find({});
			}
		},
		listrequest:{
			type: ListRequestType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return ListRequest.findById(args.id);
			}
		},
		listrequests:{
			type: new GraphQLList(ListRequestType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return ListRequest.find({});
			}
		},
		purchaseOrder:{
			type: PurchaseOrderType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PurchaseOrder.findById(args.id);
			}
		},
		purchaseOrders:{
			type: new GraphQLList(PurchaseOrderType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PurchaseOrder.find({});
			}
		},
		listItemPurchaseOrder:{
			type: ListItemPurchaseOrderType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return ListItemPurchaseOrder.findById(args.id);
			}
		},
		listItemPurchaseOrders:{
			type: new GraphQLList(ListItemPurchaseOrderType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return ListItemPurchaseOrder.find({});
			}
		},
		barang:{
			type: BarangType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Barang.findById(args.id);
			}
		},
		barangs:{
			type: new GraphQLList(BarangType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Barang.find({});
			}
		},
		karyawan:{
			type: KaryawanType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Karyawan.findById(args.id);
			}
		},
		karyawans:{
			type: new GraphQLList(KaryawanType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Karyawan.find({});
			}
		},
		akun:{
			type: AkunType,
			args: {
					username:{type:GraphQLString},
				 	password:{type:GraphQLString},
				  },
			resolve(parent,args){
				return Akun.findOne({username: args.username, password: args.password});
			}
		},
		akuns:{
			type: new GraphQLList(AkunType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Akun.find({});
			}
		},
		persediaanBarang:{
			type: PersediaanBarangType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PersediaanBarang.findById(args.id);
			}
		},
		persediaanBarangs:{
			type: new GraphQLList(PersediaanBarangType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PersediaanBarang.find({});
			}
		},
		inventaris:{
			type: InventarisType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Inventaris.findById(args.id);
			}
		},
		allInventaris:{
			type: new GraphQLList(InventarisType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Inventaris.find({});
			}
		},
		penerimaanBarang:{
			type: PenerimaanBarangType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PenerimaanBarang.findById(args.id);
			}
		},
		penerimaanBarangs:{
			type: new GraphQLList(PenerimaanBarangType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PenerimaanBarang.find({});
			}
		},
		pengeluaranBarang:{
			type: PengeluaranBarangType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PengeluaranBarang.findById(args.id); 
			}
		},
		pengeluaranBarangs:{
			type: new GraphQLList(PengeluaranBarangType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PengeluaranBarang.find({});
			}
		},
		pemeliharaan:{
			type: PemeliharaanType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Pemeliharaan.findById(args.id);
			}
		},
		pemeliharaans:{
			type: new GraphQLList(PemeliharaanType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Pemeliharaan.find({});
			}
		},
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addPerusahaan:{
			type: PerusahaanType,
			args:{
				nama: {type: new GraphQLNonNull(GraphQLString)},
				alamat: {type: new GraphQLNonNull(GraphQLString)},
				kodePos: {type: new GraphQLNonNull(GraphQLInt)},
				email: {type: new GraphQLNonNull(GraphQLString)},
				noTlp: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parent,args){
				let vendor = new Vendor({
					nama: args.nama,
					alamat: args.alamat,
					kodePos: args.kodePos,
					email: args.email,
					noTlp: args.noTlp
				});
				return vendor.save();
			}
		},
		addVendor:{
			type: VendorType,
			args:{
				nama: {type: new GraphQLNonNull(GraphQLString)},
				jenis_usaha: {type: new GraphQLNonNull(GraphQLString)},
				alamat: {type: new GraphQLNonNull(GraphQLString)},
				email: {type: new GraphQLNonNull(GraphQLString)},
				noTlp: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parent,args){
				let vendor = new Vendor({
					nama: args.nama,
					jenis_usaha: args.jenis_usaha,
					alamat: args.alamat,
					email: args.email,
					noTlp: args.noTlp
				});
				return vendor.save();
			}
		},
		hapusVendor:{
			type: VendorType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Vendor.deleteOne({_id:args.id});
			}
		},
		updateVendor:{
			type: VendorType,
			args: {
				id:{type:GraphQLID},
				nama: {type: new GraphQLNonNull(GraphQLString)},
				jenis_usaha: {type: new GraphQLNonNull(GraphQLString)},
				alamat: {type: new GraphQLNonNull(GraphQLString)},
				email: {type: new GraphQLNonNull(GraphQLString)},
				noTlp: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parent, args){
				return Vendor.findOneAndUpdate({_id: args.id}, {nama: args.nama, jenis_usaha:args.jenis_usaha, alamat:args.alamat, email:args.email, noTlp:args.noTlp})
			}
		},
		addPeralatan:{
			type: PeralatanType,
			args:{
				nama: {type: new GraphQLNonNull(GraphQLString)},
				jumlah: {type: new GraphQLNonNull(GraphQLInt)},
				harga: {type: new GraphQLNonNull(GraphQLInt)},
				sewa: {type: new GraphQLNonNull(GraphQLInt)}
			},
			resolve(parent,args){
				let peralatan = new Peralatan({
					nama: args.nama,
					jumlah: args.jumlah,
					harga : args.harga,
					sewa: args.sewa
				});
				return peralatan.save();
			}
		},
		hapusPeralatan:{
			type: PeralatanType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Peralatan.deleteOne({_id:args.id});
			}
		},

		updatePeralatan:{
			type: PeralatanType,
			args: {
				id:{type:GraphQLID},
				nama: {type: new GraphQLNonNull(GraphQLString)},
				jumlah: {type: new GraphQLNonNull(GraphQLInt)},
				harga: {type: new GraphQLNonNull(GraphQLInt)},
				sewa: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				return Peralatan.findOneAndUpdate({_id: args.id}, {nama: args.nama, jumlah:args.jumlah, sewa:args.sewa, harga:args.harga})
			}
		},
		addDivisi:{
			type: DivisiType,
			args:{
				nama: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent,args){
				let divisi = new Divisi({
					nama: args.nama,
				});
				return divisi.save();
			}
		},
		hapusDivisi:{
			type: DivisiType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Divisi.deleteOne({_id:args.id});
			}
		},
		addPermintaanBarang:{
			type: PermintaanBarangType,
			args:{
				tanggal: {type: new GraphQLNonNull(GraphQLString)},
				status: {type: new GraphQLNonNull(GraphQLString)},
				kode: {type: new GraphQLNonNull(GraphQLString)},
				divisi_id: {type: new GraphQLNonNull(GraphQLString)},
				akun_id: {type: new GraphQLNonNull(GraphQLString)},
				tanggal_setuju: {type: new GraphQLNonNull(GraphQLString)},
				disetujui_id: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args){
				let permintaanBarang = new PermintaanBarang({       
					tanggal: args.tanggal,
					status:args.status,
					kode: args.kode,
					divisi_id: args.divisi_id,
					akun_id: args.akun_id,
					tanggal_setuju: args.tanggal_setuju,
					disetujui_id: args.disetujui_id,
				});
				return permintaanBarang.save();
			}
		},
		updateStatusPermintaanBarang:{
			type: PermintaanBarangType,
			args: {
				id:{type:GraphQLID},
				status: {type: new GraphQLNonNull(GraphQLString)},
				tanggal_setuju: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args){
				return PermintaanBarang.findOneAndUpdate({_id: args.id}, {status: args.status, tanggal_setuju:args.tanggal_setuju})
			}
		},
		updateStatusDonePermintaanBarang:{
			type: PermintaanBarangType,
			args: {
				id:{type:GraphQLID},
				status: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args){
				return PermintaanBarang.findOneAndUpdate({_id: args.id}, {status: args.status})
			}
		},
		updateDivisiPermintaanBarang:{
			type: PermintaanBarangType,
			args: {
				kode:{type:GraphQLString},
				divisi_id: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args){
				return PermintaanBarang.findOneAndUpdate({kode: args.kode}, {divisi_id: args.divisi_id})
			}
		},
		hapusPermintaanBarang:{
			type: PermintaanBarangType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PermintaanBarang.deleteOne({_id:args.id});
			}
		},
		addListRequest:{
			type: ListRequestType,
			args:{
				nama_barang: {type: new GraphQLNonNull(GraphQLString)},
				jumlah_barang: {type: new GraphQLNonNull(GraphQLInt)},
				satuan: {type: new GraphQLNonNull(GraphQLString)},
				jenis: {type: new GraphQLNonNull(GraphQLString)},
				request_id: {type: new GraphQLNonNull(GraphQLID)},
				status: {type: new GraphQLNonNull(GraphQLString)},
				harga: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				let listrequest = new ListRequest({
					nama_barang: args.nama_barang,
					jumlah_barang: args.jumlah_barang,
					satuan: args.satuan,
					jenis: args.jenis,
					request_id: args.request_id,
					status: args.status,
					harga: args.harga
				});
				return listrequest.save();
			}
		},
		hapusManyListRequest:{
			type: ListRequestType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return ListRequest.deleteMany({request_id :args.id});
			}
		},
		hapusListRequest:{
			type: ListRequestType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return ListRequest.deleteOne({_id:args.id});
			}
		},
		updateStatusListRequest:{
			type: ListRequestType,
			args: {
				id:{type:GraphQLID},
				status: {type: GraphQLString},
			},
			resolve(parent, args){
				return ListRequest.updateMany({request_id: args.id}, {status: args.status})
			}
		},
		updateStatusListRequestOnOrder:{
			type: ListRequestType,
			args: {
				order_id:{type:GraphQLID},
				status: {type: GraphQLString},
			},
			resolve(parent, args){
				return ListRequest.updateMany({order_id: args.order_id}, {status: args.status})
			}
		},
		updateAllStatusListRequest:{
			type: ListRequestType,
			args: {
				nama:{type:GraphQLString},
				status: {type: GraphQLString},
				order_id: {type: GraphQLID},
			},
			resolve(parent, args){
				return ListRequest.updateMany({nama_barang: args.nama}, {status: args.status, order_id: args.order_id})
			}
		},
		addPurchaseOrder:{
			type: PurchaseOrderType,
			args:{
				kode: {type: new GraphQLNonNull(GraphQLString)},
				tanggal: {type: new GraphQLNonNull(GraphQLString)},
				tanggal_setuju: {type: new GraphQLNonNull(GraphQLString)},
				status: {type: new GraphQLNonNull(GraphQLString)},
				akun_id: {type: new GraphQLNonNull(GraphQLString)},
				vendor_id: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args){
				let purcahseOrder = new PurchaseOrder({
					kode: args.kode,
					tanggal: args.tanggal,
					tanggal_setuju: args.tanggal_setuju,
					status: args.status,
					akun_id:args.akun_id, 
					vendor_id:args.vendor_id, 
				});
				return purcahseOrder.save();
			}
		},
		updateVendorPurchaseOrder:{
			type: PurchaseOrderType,
			args: {
				id:{type:GraphQLID},
				vendor_id: {type: GraphQLString},
			},
			resolve(parent, args){
				return PurchaseOrder.findOneAndUpdate({_id: args.id}, {vendor_id: args.vendor_id})
			}
		},
		updateStatusPurchaseOrder:{
			type: PurchaseOrderType,
			args: {
				id:{type:GraphQLID},
				status: {type: new GraphQLNonNull(GraphQLString)},
				tanggal_setuju: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args){
				return PurchaseOrder.findOneAndUpdate({_id: args.id}, {status: args.status, tanggal_setuju:args.tanggal_setuju})
			}
		},
		updateTotalHargaPurchaseOrder:{
			type: PurchaseOrderType,
			args: {
				id:{type:GraphQLID},
				total_harga: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				return PurchaseOrder.findOneAndUpdate({_id: args.id}, {total_harga: args.total_harga})
			}
		},
		updateStatusDonePurchaseOrder:{
			type: PurchaseOrderType,
			args: {
				id:{type:GraphQLID},
				status: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args){
				return PurchaseOrder.findOneAndUpdate({_id: args.id}, {status: args.status})
			}
		},
		hapusPurchaseOrder:{
			type: PurchaseOrderType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PurchaseOrder.deleteOne({_id:args.id});
			}
		},
		addListItemPurchaseOrder:{
			type: ListItemPurchaseOrderType,
			args:{
				nama_barang: {type: new GraphQLNonNull(GraphQLString)},
				jumlah_barang: {type: new GraphQLNonNull(GraphQLInt)},
				satuan: {type: new GraphQLNonNull(GraphQLString)},
				jenis: {type: new GraphQLNonNull(GraphQLString)},
				purchaseOrder_id: {type: new GraphQLNonNull(GraphQLID)},
				status: {type: new GraphQLNonNull(GraphQLString)},
				harga: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				let listItemPurchaseOrder = new ListItemPurchaseOrder({
					nama_barang: args.nama_barang,
					jumlah_barang: args.jumlah_barang,
					satuan: args.satuan,
					jenis: args.jenis,
					purchaseOrder_id: args.purchaseOrder_id,
					status: args.status,
					harga: args.harga
				});
				return listItemPurchaseOrder.save();
			}
		},
		updateStatusListItemPurchaseOrder:{
			type: ListItemPurchaseOrderType,
			args: {
				purchaseOrder_id:{type:GraphQLID},
				status: {type: GraphQLString},
			},
			resolve(parent, args){
				return ListItemPurchaseOrder.updateMany({purchaseOrder_id: args.purchaseOrder_id}, {status: args.status})
			}
		},
		hapusManyListItemPurchaseOrder:{
			type: ListItemPurchaseOrderType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return ListItemPurchaseOrder.deleteMany({purchaseOrder_id :args.id});
			}
		},
		addBarang:{
			type: BarangType,
			args:{
				nama_barang: {type: new GraphQLNonNull(GraphQLString)},
				jenis_barang: {type: new GraphQLNonNull(GraphQLString)},
				satuan: {type: new GraphQLNonNull(GraphQLString)},
				harga: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				let barang = new Barang({
					nama_barang: args.nama_barang,
					jenis_barang: args.jenis_barang,
					satuan:  args.satuan,
					harga:  args.harga,
				});
				return barang.save();
			}
		},
		hapusBarang:{
			type: BarangType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Barang.deleteOne({_id:args.id});
			}
		},
		updateBarang:{
			type: BarangType,
			args: {
				id:{type:GraphQLID},
				nama_barang: {type: new GraphQLNonNull(GraphQLString)},
				jenis_barang: {type: new GraphQLNonNull(GraphQLString)},
				satuan: {type: new GraphQLNonNull(GraphQLString)},
				harga: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				return Barang.findOneAndUpdate({_id: args.id}, {nama_barang: args.nama_barang, jenis_barang:args.jenis_barang, satuan:args.satuan, harga:args.harga})
			}
		},
		addKaryawan:{
			type: KaryawanType,
			args:{
				nama: {type: new GraphQLNonNull(GraphQLString)},
				tanggal_lahir: {type: new GraphQLNonNull(GraphQLString)},
				jenis_kelamin: {type: new GraphQLNonNull(GraphQLString)},
				agama: {type: new GraphQLNonNull(GraphQLString)},
				tempat_lahir: {type: new GraphQLNonNull(GraphQLString)},
				alamat: {type: new GraphQLNonNull(GraphQLString)},
				no_kontak: {type: new GraphQLNonNull(GraphQLString)},
				email: {type: new GraphQLNonNull(GraphQLString)},
				foto: {type: new GraphQLNonNull(GraphQLString)},
				jabatan: {type: new GraphQLNonNull(GraphQLString)},
				divisi_id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				let karyawan = new Karyawan({
					nama: args.nama,
					tanggal_lahir: args.tanggal_lahir,
					jenis_kelamin: args.jenis_kelamin,
					tempat_lahir: args.tempat_lahir,
					agama: args.agama,
					email: args.email,
					jabatan: args.jabatan,
					alamat:  args.alamat,
					no_kontak:  args.no_kontak,
					foto:  args.foto,
					divisi_id:  args.divisi_id,
				});
				return karyawan.save();
			}
		},
		addAkun:{
			type: AkunType,
			args:{
				username: {type: new GraphQLNonNull(GraphQLString)},
				password: {type: new GraphQLNonNull(GraphQLString)},
				karyawan_id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				let akun = new Akun({
					username: args.username,
					password: args.password,
					karyawan_id:  args.karyawan_id,
				});
				return akun.save();
			}
		},
		hapusAkun:{
			type: AkunType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Akun.deleteOne({_id:args.id});
			}
		},
		addPersediaanBarang:{
			type: PersediaanBarangType,
			args:{
				jumlah: {type: new GraphQLNonNull(GraphQLInt)},
				status: {type: new GraphQLNonNull(GraphQLString)},
				barang_id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args){
				let persbarang = new PersediaanBarang({
					jumlah: args.jumlah,
					status: args.status,
					barang_id:  args.barang_id,
				});
				return persbarang.save();
			}
		},
		hapusPersediaanBarang:{
			type: PersediaanBarangType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PersediaanBarang.deleteOne({_id:args.id});
			}
		},
		updateJumlahPersediaanBarang:{
			type: PersediaanBarangType,
			args: {
				barang_id:{type:GraphQLID},
				jumlah: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				return PersediaanBarang.findOneAndUpdate({barang_id: args.barang_id}, {jumlah: args.jumlah})
			}
		},
		addInventaris:{
			type: InventarisType,
			args:{
				jumlah: {type: new GraphQLNonNull(GraphQLInt)},
				status: {type: new GraphQLNonNull(GraphQLString)},
				barang_id: {type: new GraphQLNonNull(GraphQLID)},
				jumlah_diperbaiki: {type: new GraphQLNonNull(GraphQLInt)},
				jumlah_dipakai: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				let inven = new Inventaris({
					jumlah: args.jumlah,
					status: args.status,
					barang_id:  args.barang_id,
					jumlah_diperbaiki:args.jumlah_diperbaiki,
					jumlah_dipakai:args.jumlah_dipakai
				});
				return inven.save();
			}
		},
		hapusInventaris:{
			type: InventarisType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Inventaris.deleteOne({_id:args.id});
			}
		},
		updateInventaris:{
			type: InventarisType,
			args: {
				id:{type:GraphQLID},
				jumlah: {type: new GraphQLNonNull(GraphQLInt)},
				status: {type: new GraphQLNonNull(GraphQLString)},
				jumlah_diperbaiki: {type: new GraphQLNonNull(GraphQLInt)},
				jumlah_dipakai: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				return Inventaris.findOneAndUpdate({_id: args.id}, {jumlah: args.jumlah, status:args.status, jumlah_diperbaiki:args.jumlah_diperbaiki, jumlah_dipakai:args.jumlah_dipakai})
			}
		},
		updateJumlahInventaris:{
			type: InventarisType,
			args: {
				barang_id:{type:GraphQLID},
				jumlah: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				return Inventaris.findOneAndUpdate({barang_id: args.barang_id}, {jumlah: args.jumlah})
			}
		},
		updateRusakInventaris:{
			type: InventarisType,
			args: {
				id:{type:GraphQLID},
				jumlah: {type: new GraphQLNonNull(GraphQLInt)},
				jumlah_diperbaiki: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				return Inventaris.findOneAndUpdate({_id: args.id}, {jumlah: args.jumlah, jumlah_diperbaiki:args.jumlah_diperbaiki})
			}
		},
		updateJumlahDipakaiInventaris:{
			type: InventarisType,
			args: {
				barang_id:{type:GraphQLID},
				jumlah_dipakai: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				return Inventaris.findOneAndUpdate({barang_id: args.barang_id}, {jumlah_dipakai: args.jumlah_dipakai})
			}
		},
		updateJumlahDiperbaikiInventaris:{
			type: InventarisType,
			args: {
				id:{type:GraphQLID},
				jumlah_diperbaiki: {type: new GraphQLNonNull(GraphQLInt)},
			},
			resolve(parent, args){
				return Inventaris.findOneAndUpdate({_id: args.id}, {jumlah_diperbaiki: args.jumlah_diperbaiki})
			}
		},
		addPenerimaanBarang:{
			type: PenerimaanBarangType,
			args:{
				kode: {type: new GraphQLNonNull(GraphQLString)},
				tanggal: {type: new GraphQLNonNull(GraphQLString)},
				akun_id: {type: new GraphQLNonNull(GraphQLID)},
				purchase_id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args){
				let penerimaanBarang = new PenerimaanBarang({
					kode: args.kode,
					tanggal: args.tanggal,
					akun_id: args.akun_id,
					purchase_id:  args.purchase_id,
				});
				return penerimaanBarang.save();
			}
		},
		hapusPenerimaanBarang:{
			type: PenerimaanBarangType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PenerimaanBarang.deleteOne({_id:args.id});
			}
		},
		addPengeluaranBarang:{
			type: PengeluaranBarangType,
			args:{
				kode: {type: new GraphQLNonNull(GraphQLString)},
				tanggal: {type: new GraphQLNonNull(GraphQLString)},
				akun_id: {type: new GraphQLNonNull(GraphQLID)},
				permintaan_id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args){
				let pengeluaranBarang = new PengeluaranBarang({
					kode: args.kode,
					tanggal: args.tanggal,
					akun_id: args.akun_id,
					permintaan_id: args.permintaan_id,
				});
				return pengeluaranBarang.save();
			}
		},
		hapusPengeluaranBarang:{
			type: PengeluaranBarangType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return PengeluaranBarang.deleteOne({_id:args.id});
			}
		},
		addPemeliharaan:{
			type: PemeliharaanType,
			args:{
				status: {type: new GraphQLNonNull(GraphQLString)},
				jumlah: {type: new GraphQLNonNull(GraphQLInt)},
				tanggal: {type: new GraphQLNonNull(GraphQLString)},
				karyawan_id: {type: new GraphQLNonNull(GraphQLID)},
				inventaris_id: {type: new GraphQLNonNull(GraphQLID)},
			},
			resolve(parent, args){ 
				let pemeliharaan = new Pemeliharaan({ 
					status: args.status,
					jumlah: args.jumlah,
					tanggal: args.tanggal,
					karyawan_id: args.karyawan_id,
					inventaris_id:  args.inventaris_id,
				});
				return pemeliharaan.save();
			}
		},
		hapusPemeliharaan:{
			type: PemeliharaanType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Pemeliharaan.deleteOne({_id:args.id});
			}
		},
		updateStatusPemeliharaan:{
			type: PemeliharaanType,    
			args: { 
				id: {type:GraphQLID},
				status: {type: new GraphQLNonNull(GraphQLString)},			
			},
			resolve(parent, args){
				return Pemeliharaan.findOneAndUpdate({_id: args.id}, {status: args.status})
			}
		},
		editBiodataKaryawan:{
			type: KaryawanType,
			args: {
				id: {type:GraphQLID},
				nama: {type: new GraphQLNonNull(GraphQLString)},
				tanggal_lahir: {type: new GraphQLNonNull(GraphQLString)},
				jenis_kelamin: {type: new GraphQLNonNull(GraphQLString)},
				agama: {type: new GraphQLNonNull(GraphQLString)},
				tempat_lahir: {type: new GraphQLNonNull(GraphQLString)},
				alamat: {type: new GraphQLNonNull(GraphQLString)},
				no_kontak: {type: new GraphQLNonNull(GraphQLString)},
				email: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args){
				return Karyawan.findOneAndUpdate({_id: args.id}, {nama: args.nama, tanggal_lahir: args.tanggal_lahir, jenis_kelamin: args.jenis_kelamin, agama: args.agama, tempat_lahir: args.tempat_lahir, alamat: args.alamat, no_kontak: args.no_kontak, email: args.email})
			}
		},
		editAkun:{
			type: AkunType, 
			args: { 
				id: {type:GraphQLID},
				username: {type: new GraphQLNonNull(GraphQLString)},
				password: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args){
				return Akun.findOneAndUpdate({_id: args.id}, {username: args.username, password: args.password})
			}
		},
		uploadFoto: {
			type: FotoType,
			resolve(parent, {foto}){
				const {createredStream, filename} = foto;
		
				const stream = createredStream()
				const pathName = path.join(__dirname, `/client/src/images/${filename}`)
				stream.pipe(fs.createWriteStream(pathName))
			
				return {
					url: `http://localhost:3000/client/src/images/${filename}`,
				}
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
