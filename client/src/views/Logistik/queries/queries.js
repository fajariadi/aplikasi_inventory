import {gql} from 'apollo-boost';

const getVendorsQuery = gql`
{
	vendors {
		nama
		jenis_usaha
		alamat
		email
		noTlp
		id
	}
}
`

const getPeralatansQuery = gql`
{
	peralatans {
		nama
		jumlah
		harga
		sewa
		id
	}
}
`
const getDivisisQuery = gql`
{
	divisis {
		nama
		id
	}
}
`
const getPermintaanBarangsQuery = gql`
{
	permintaanBarangs {
		tanggal
		status
		id
		kode
		akun{
			username
			id
			karyawan{
				nama
				divisi{
					nama
				}
			}
		}
	}
}
`
const getListRequestsQuery = gql`
{
	listrequests {
		nama_barang
		jumlah_barang
		jenis
		satuan
		status
		harga
		id
		permintaanBarang{
			status
			tanggal
		}
	}
}
`

const getOrdersQuery = gql`
{
	orders {
		kode
		tanggal
		jenis
		status
		id
		vendor{
			nama
			jenis_usaha
		}
	}
}
`

const getBarangsQuery = gql`
{
	barangs {
		nama_barang
		jenis_barang
		satuan
		harga
		id
	}
}
`

const getPurchaseOrdersQuery = gql`
{
	purchaseOrders {
		kode
		tanggal
		tanggal_setuju
		status
		id
		akun{
			username
			id
			karyawan{
				nama
			}
		}
		vendor{
			nama
			jenis_usaha
		}
	}
}
`

const getKaryawansQuery = gql`
{
	karyawans {
		nama
		jabatan
		alamat
		noHp
		avatar
		divisi{
			nama
		}
		id
	}
}
`
const getPersediaanBarangsQuery = gql`
{
	persediaanBarangs {
		jumlah
		status
		id
		barang{
			nama_barang
			jenis_barang
			satuan
			harga
		}
	}
}
`
const getAllInventarisQuery = gql`
{
	allInventaris {
		jumlah
		status
		jumlah_diperbaiki
		jumlah_dipakai
		id
		barang{
			nama_barang
			jenis_barang
			satuan
			harga
		}
	}
}
`

const getPenerimaanBarangsQuery = gql`
{
	penerimaanBarangs {
		kode
		tanggal
		id
		akun{
			username
			id
			karyawan{
				nama
				jabatan
			}
		}
		purchaseOrder{
			kode
			id
			tanggal
			listItemPurchaseOrder{
				nama_barang
				jumlah_barang
				satuan
				harga
				id
				jenis
			}
		}
	}
}
`

const addPeralatanMutation = gql`
	mutation($nama:String!, $jumlah:Int!, $harga:Int!, $sewa:Int!){
		addPeralatan(nama: $nama, jumlah: $jumlah, harga: $harga, sewa: $sewa){
			nama
			jumlah
			harga
			sewa
			id
		}
	}
`
const hapusPeralatanMutation = gql`
	mutation($id:ID!){
		hapusPeralatan(id: $id){
			nama
			id
		}
	}
`

const addVendorMutation = gql`
	mutation($nama:String!, $jenis_usaha:String!, $alamat:String!, $email:String!, $noTlp:String!){
		addVendor(nama: $nama, jenis_usaha: $jenis_usaha, alamat:$alamat, email:$email, noTlp:$noTlp){
			nama
			jenis_usaha
			alamat
			email
			noTlp
			id
		}
	}
`
const hapusVendorMutation = gql`
	mutation($id:ID!){
		hapusVendor(id: $id){
			nama
			id
		}
	}
`

const addDivisiMutation = gql`
	mutation($nama:String!){
		addDivisi(nama: $nama){
			nama
			id
		}
	}
`

const hapusDivisiMutation = gql`
	mutation($id:ID!){
		hapusDivisi(id: $id){
			nama
			id
		}
	}
`

const addPermintaanBarangMutation = gql`
	mutation($tanggal:String!, $status:String!, $kode: String!, $akun_id: String!, $tanggal_setuju: String!, $disetujui_id:String!){
		addPermintaanBarang(tanggal: $tanggal, status: $status, kode: $kode, akun_id: $akun_id, tanggal_setuju: $tanggal_setuju, disetujui_id: $disetujui_id){
			tanggal
			status
			kode
			id
		}
	}
`
const hapusPermintaanBarangMutation = gql`
	mutation($id:ID!){
		hapusPermintaanBarang(id: $id){
			status
			id
		}
	}
`

const addListRequestMutation = gql`
	mutation($nama_barang:String!, $jumlah_barang:Int!, $satuan:String!, $jenis:String!, $request_id: ID!, $status: String!, $harga: Int!){
		addListRequest(nama_barang: $nama_barang, jumlah_barang: $jumlah_barang, satuan:$satuan, jenis:$jenis, request_id: $request_id, status:$status, harga:$harga){
			nama_barang
			jumlah_barang
			satuan
			jenis
			status
			harga
			id
		}
	}
`
const hapusManyListRequestMutation = gql`
	mutation($id:ID!){
		hapusManyListRequest(id: $id){
			nama_barang
			jumlah_barang
			satuan
			jenis
			id
		}
	}
`

const hapusListRequestMutation = gql`
	mutation($id:ID!){
		hapusListRequest(id: $id){
			nama_barang
			jumlah_barang
			satuan
			jenis
			id
		}
	}
`

const addBarangMutation = gql`
	mutation($nama_barang:String!, $jenis_barang:String!, $satuan:String!, $harga:Int!){
		addBarang(nama_barang: $nama_barang, jenis_barang: $jenis_barang, satuan:$satuan, harga:$harga){
			nama_barang
			jenis_barang
			satuan
			harga
			id
		}
	}
`
const hapusBarangMutation = gql`
	mutation($id:ID!){
		hapusBarang(id: $id){
			id
		}
	}
`

const addAkunMutation = gql`
	mutation($username:String!, $password:String!, $karyawan_id:ID!){
		addAkun(username: $username, password: $password, karyawan_id:$karyawan_id){
			username
			password
			id
		}
	}
`

const addPurchaseOrderMutation = gql`
	mutation($kode:String!, $tanggal:String!, $status:String!, $tanggal_setuju:String!, $akun_id:String!){
		addPurchaseOrder(kode:$kode, tanggal:$tanggal, status:$status, tanggal_setuju:$tanggal_setuju, akun_id:$akun_id ){
			kode
			tanggal
			status
			tanggal_setuju
			id
		}
	}
`

const hapusPurchaseOrderMutation = gql`
	mutation($id:ID!){
		hapusPurchaseOrder(id: $id){
			id
		}
	}
`
const addListItemPurchaseOrder = gql`
	mutation($nama_barang:String!, $jumlah_barang:Int!, $satuan:String!, $jenis:String!, $purchaseOrder_id: ID!, $status: String!, $harga: Int!){
		addListItemPurchaseOrder(nama_barang: $nama_barang, jumlah_barang: $jumlah_barang, satuan:$satuan, jenis:$jenis, purchaseOrder_id: $purchaseOrder_id, status:$status, harga:$harga){
			nama_barang
			jumlah_barang
			satuan
			jenis
			status
			harga
			id
		}
	}
`
const addPersediaanBarang = gql`
	mutation($jumlah:Int!, $status:String!, $barang_id: ID!){
		addPersediaanBarang(jumlah: $jumlah, status:$status, barang_id: $barang_id){
			jumlah
			status
			id
		}
	}
`
const addInventaris = gql`
	mutation($jumlah:Int!, $status:String!, $barang_id: ID!, $jumlah_diperbaiki:Int!, $jumlah_dipakai:Int!){
		addInventaris(jumlah: $jumlah, status:$status, barang_id: $barang_id, jumlah_diperbaiki:$jumlah_diperbaiki, jumlah_dipakai:$jumlah_dipakai){
			jumlah
			status
			jumlah_diperbaiki
			jumlah_dipakai
			id
		}
	}
`

const addPenerimaanBarang = gql`
	mutation($kode:String!, $tanggal:String!, $akun_id: ID!, $purchase_id: ID!,){
		addPenerimaanBarang(kode:$kode, tanggal:$tanggal, akun_id: $akun_id, purchase_id: $purchase_id,){
			tanggal
			kode
			id
		}
	}
`
const hapusManyListItemPurchaseOrder = gql`
	mutation($id:ID!){
		hapusManyListItemPurchaseOrder(id: $id){
			nama_barang
			jumlah_barang
			satuan
			jenis
			harga
			id
		}
	}
`
const hapusPersediaanBarang = gql`
	mutation($id:ID!){
		hapusPersediaanBarang(id: $id){
			jumlah
			status
			id
		}
	}
`

const hapusPenerimaanBarang = gql`
	mutation($id:ID!){
		hapusPenerimaanBarang(id: $id){
			id
		}
	}
`

const hapusInventaris = gql`
	mutation($id:ID!){
		hapusInventaris(id: $id){
			jumlah
			status
			id
		}
	}
`

const getAkunQuery = gql`
	query($username: String!, $password: String!){
		akun(username: $username, password: $password) {
			username
			password
			karyawan{
				nama
				jabatan
				alamat
				noHp
				avatar
				id
				divisi{
					nama
					id
				}
			}
			id
		}
	}
`

const getBarangQuery = gql`
	query($id: ID){
		barang(id: $id) {
			nama_barang
			jenis_barang
			satuan
			harga
			id
		}
	}
`

const getPeralatanQuery = gql`
	query($id: ID){
		peralatan(id: $id) {
			nama
			jumlah
			harga
			sewa
			id
		}
	}
`

const getVendorQuery = gql`
	query($id: ID){
		vendor(id: $id) {
			nama
			jenis_usaha
			alamat
			email
			noTlp
			id
		}
	}
`

const getPermintaanBarangQuery = gql`
	query($id:ID){
		permintaanBarang(id: $id) {
			tanggal
			status
			kode
			id
			tanggal_setuju
			disetujui{
				username
				karyawan{
				  nama
				}
			  }
			akun{
				username
				id
				karyawan{
					nama
					divisi{
						nama
					}
				}
			}
			listRequest{
				nama_barang
				jumlah_barang
				jenis
				satuan
				status
				harga
				id
			}
		}
	}
`

const getPurchaseOrderQuery = gql`
	query($id:ID){
		purchaseOrder(id: $id) {
			tanggal
			status
			kode
			id
			tanggal_setuju
			vendor{
				nama
			}
			akun{
				id
				karyawan{
					nama
				}
			}
			listItemPurchaseOrder{
				nama_barang
				jumlah_barang
				satuan
				harga
				id
				jenis
			}
		}
	}
`
const getPersediaanBarangQuery = gql`
	query($id:ID){
		persediaanBarang(id: $id) {
			jumlah
			status
			id
			barang{
				nama_barang
				jenis_barang
				satuan
				harga
				id
			}	
		}
	}
`

const getInventarisQuery = gql`
	query($id:ID){
		inventaris(id: $id) {
			jumlah
			status
			jumlah_diperbaiki
			jumlah_dipakai
			id
			barang{
				nama_barang
				jenis_barang
				satuan
				harga
				id
			}	
		}
	}
`
const getPenerimaanBarangQuery = gql`
	query($id:ID){
		penerimaanBarang(id: $id) {
			tanggal
			kode
			id
			akun{
				username
				id
				karyawan{
					nama
					jabatan
				}
			}
			purchaseOrder{
				kode
				id
				tanggal
				listItemPurchaseOrder{
					nama_barang
					jumlah_barang
					satuan
					harga
					id
					jenis
				}
			}
		}
	}
`

const updateBarangMutation = gql`
	mutation($id : ID, $nama_barang : String!, $jenis_barang : String!, $satuan : String !, $harga : Int! ){
		updateBarang(id:$id, nama_barang:$nama_barang, jenis_barang:$jenis_barang, satuan:$satuan, harga:$harga){
			id
			nama_barang
			jenis_barang
			satuan
			harga
		}
	}
`

const updatePeralatanMutation = gql`
	mutation($id : ID, $nama : String!, $jumlah : Int!, $harga : Int!, $sewa : Int!){
		updatePeralatan(id:$id, nama:$nama, jumlah:$jumlah, harga:$harga, sewa:$sewa){
			id
			nama
			jumlah
			harga
			sewa
		}
	}
`

const updateVendorMutation = gql`
	mutation($id : ID, $nama : String!, $jenis_usaha: String!, $alamat : String !, $email : String!, $noTlp: String! ){
		updateVendor(id:$id, nama:$nama, jenis_usaha:$jenis_usaha, alamat:$alamat, email:$email, noTlp:$noTlp){
			id
			nama
			jenis_usaha
			alamat
			email
			noTlp
		}
	}
`

const updateStatusPermintaanBarang = gql`
	mutation($id : ID, $status : String!, $tanggal_setuju : String! ){
		updateStatusPermintaanBarang(id:$id, status:$status, tanggal_setuju:$tanggal_setuju){
			id
			status
			tanggal_setuju
		}
	}
`
const updateStatusPurchaseOrder = gql`
	mutation($id : ID, $status : String!, $tanggal_setuju : String!){
		updateStatusPurchaseOrder(id:$id, status:$status, tanggal_setuju:$tanggal_setuju){
			id
			status
			tanggal_setuju
		}
	}
`

const updateStatusListRequest = gql`
	mutation($id : ID, $status : String! ){
		updateStatusListRequest(id:$id, status:$status){
			id
			status
		}
	}
`
const updateAllStatusListRequest = gql`
	mutation($nama : String!, $status : String!, $order_id: ID){
		updateAllStatusListRequest(nama:$nama, status:$status, order_id:$order_id){
			id
			status
		}
	}
`
const updateStatusListRequestOnOrder = gql`
	mutation( $order_id: ID, $status : String!,){
		updateStatusListRequestOnOrder(order_id:$order_id, status:$status ){
			status
		}
	}
`
const updateStatusListItemPurchaseOrder = gql`
	mutation($purchaseOrder_id: ID, $status : String! ){
		updateStatusListItemPurchaseOrder(purchaseOrder_id:$purchaseOrder_id, status:$status){
			status
		}
	}
`

const updateVendorPurchaseOrderMutation = gql`
	mutation($id : ID, $vendor_id : String! ){
		updateVendorPurchaseOrder(id:$id, vendor_id:$vendor_id){
			id
		}
	}
`
const updatePersediaanBarang = gql`
	mutation($id : ID, $jumlah : Int!, $status : String! ){
		updatePersediaanBarang(id:$id, jumlah:$jumlah, status:$status){
			id
			jumlah
			status
		}
	}
`
const updateInventaris = gql`
	mutation($id : ID, $jumlah : Int!, $status : String!, $jumlah_diperbaiki:Int!, $jumlah_dipakai:Int! ){
		updateInventaris(id:$id, jumlah:$jumlah, status:$status, jumlah_diperbaiki:$jumlah_diperbaiki, jumlah_dipakai:$jumlah_dipakai){
			id
			jumlah
			status
			jumlah_diperbaiki
			jumlah_dipakai
		}
	}
`

export {
	getVendorsQuery, 
	getPeralatansQuery,
	getDivisisQuery,
	getPermintaanBarangsQuery,
	getPermintaanBarangQuery,
	getListRequestsQuery,
	getOrdersQuery,
	getBarangsQuery,
	getBarangQuery,
	getPeralatanQuery,
	addPurchaseOrderMutation,
	addDivisiMutation, 
	addPeralatanMutation, 
	addVendorMutation,
	addPermintaanBarangMutation,
	addListRequestMutation,
	addBarangMutation,
	hapusDivisiMutation,
	hapusPermintaanBarangMutation,
	hapusListRequestMutation,
	hapusBarangMutation,
	hapusPeralatanMutation,
	hapusVendorMutation,
	hapusPurchaseOrderMutation,
	getKaryawansQuery,
	addAkunMutation,
	getAkunQuery,
	getVendorQuery,
	hapusManyListRequestMutation,
	updateStatusPermintaanBarang,
	updateStatusListRequest,
	getPurchaseOrdersQuery,
	getPurchaseOrderQuery,
	updateVendorPurchaseOrderMutation,
	updateBarangMutation,
	updatePeralatanMutation,
	updateVendorMutation, 
	updateAllStatusListRequest,
	addListItemPurchaseOrder,
	hapusManyListItemPurchaseOrder,
	updateStatusPurchaseOrder,
	updateStatusListItemPurchaseOrder,
	updateStatusListRequestOnOrder,
	getPersediaanBarangQuery,
	getPersediaanBarangsQuery,
	addPersediaanBarang,
	updatePersediaanBarang,
	hapusPersediaanBarang,
	getInventarisQuery,
	getAllInventarisQuery,
	addInventaris,
	updateInventaris,
	hapusInventaris,
	getPenerimaanBarangQuery,
	getPenerimaanBarangsQuery,
	addPenerimaanBarang,
	hapusPenerimaanBarang

};