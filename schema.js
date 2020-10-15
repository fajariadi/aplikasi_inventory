const graphql = require ('graphql');
const _ = require('lodash');
const Vendor = require('./models/VendorModel');
const Peralatan = require('./models/PeralatanModel');
const Divisi = require('./models/DivisiModel');
const PermintaanBarang = require('./models/PermintaanBarangModel');
const ListRequest = require('./models/ListRequestModel');
const Order = require('./models/OrderModel');
const Barang = require('./models/BarangModel');
const Karyawan = require('./models/KaryawanModel');
const Akun = require('./models/AkunModel');



const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
} = graphql;


const VendorType = new GraphQLObjectType({
	name: 'Vendor',
	fields: () => ({
		id: {type: GraphQLID},
		nama: {type:GraphQLString},
		jenis_usaha: {type: GraphQLString},
		alamat: {type: GraphQLString},
		email: {type: GraphQLString},
		noTlp: {type: GraphQLString},
		order: {
			type: new GraphQLList(OrderType),
			resolve(parent, args){
				return Order.find({vendor_id: parent.id});
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
		permintaanBarang: {
			type: PermintaanBarangType,
			resolve(parent,args){
				return PermintaanBarang.findById(parent.request_id);
			}
		}
	})
});

const OrderType = new GraphQLObjectType({
	name: 'Order',
	fields: () => ({
		id: {type: GraphQLID},
		kode: {type:GraphQLString},
		tanggal: {type:GraphQLString},
		jenis: {type:GraphQLString},
		status: {type:GraphQLString},
		vendor: {
			type: VendorType,
			resolve(parent, args){
				return Vendor.findById(parent.vendor_id);
			}
		}
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
	name: "Karyawan",
	fields: () => ({
		id: {type: GraphQLID},
		nama: {type: GraphQLString},
		jabatan: { type: GraphQLString},
		alamat: {type: GraphQLString},
		noHp: {type: GraphQLString},
		avatar: {type: GraphQLString},
		divisi: {
			type: DivisiType,
			resolve(parent,args){
				return Divisi.findById(parent.divisi_id);
			}
		},
		akun:{
			type: AkunType,
			resolve(parent,args){
				return Akun.findOne({karyawan_id: parent.id});
			}
		}
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

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
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
		order:{
			type: OrderType,
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Order.findById(args.id);
			}
		},
		orders:{
			type: new GraphQLList(OrderType),
			args: {id:{type:GraphQLID}},
			resolve(parent,args){
				return Order.find({});
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
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
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
				akun_id: {type: new GraphQLNonNull(GraphQLString)},
				tanggal_setuju: {type: new GraphQLNonNull(GraphQLString)},
				disetujui_id: {type: new GraphQLNonNull(GraphQLString)},
			},
			resolve(parent, args){
				let permintaanBarang = new PermintaanBarang({
					tanggal: args.tanggal,
					status:args.status,
					kode: args.kode,
					akun_id: args.akun_id,
					tanggal_setuju: args.tanggal_setuju,
					disetujui_id: args.disetujui_id,
				});
				return permintaanBarang.save();
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
				request_id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				let listrequest = new ListRequest({
					nama_barang: args.nama_barang,
					jumlah_barang: args.jumlah_barang,
					satuan: args.satuan,
					jenis: args.jenis,
					request_id: args.request_id
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
		addOrder:{
			type: OrderType,
			args:{
				kode: {type: new GraphQLNonNull(GraphQLString)},
				tanggal: {type: new GraphQLNonNull(GraphQLString)},
				jenis: {type: new GraphQLNonNull(GraphQLString)},
				status: {type: new GraphQLNonNull(GraphQLString)},
				vendor_id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				let order = new Order({
					kode: args.kode,
					tanggal: args.tanggal,
					jenis: args.jenis,
					status: args.status,
					vendor_id: args.vendor_id
				});
				return order.save();
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
		addKaryawan:{
			type: KaryawanType,
			args:{
				nama: {type: new GraphQLNonNull(GraphQLString)},
				jabatan: {type: new GraphQLNonNull(GraphQLString)},
				alamat: {type: new GraphQLNonNull(GraphQLString)},
				noHp: {type: new GraphQLNonNull(GraphQLString)},
				avatar: {type: new GraphQLNonNull(GraphQLString)},
				divisi_id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				let karyawan = new Karyawan({
					nama: args.nama,
					jabatan: args.jabatan,
					alamat:  args.alamat,
					noHp:  args.noHp,
					avatar:  args.avatar,
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
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
