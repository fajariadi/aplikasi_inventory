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
		divisi{
			nama
			id
		}
		akun{
			username
			id
			karyawan{
				nama
				divisi{
					nama
					id
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
			id
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

const getListItemPurchaseOrdersQuery = gql`
{
	listItemPurchaseOrders{
		nama_barang
		jumlah_barang
		satuan
		harga
		id
		jenis
	}
}
`



const getAkunsQuery = gql`
{
	akuns {
		username
		password
		karyawan{
			nama
			tanggal_lahir
			jenis_kelamin
			agama
			tempat_lahir
			alamat
			no_kontak
			email
			jabatan
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

const getKaryawansQuery = gql`
{
	karyawans {
		nama
		tanggal_lahir
		jenis_kelamin
		agama
		tempat_lahir
		alamat
		no_kontak
		email
		jabatan
		divisi{
			nama
			id
		}
		id
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
		total_harga
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

const getPemeliharaansQuery = gql`
{
	pemeliharaans {
		jumlah
		status
		tanggal
		id
		karyawan{
			nama
			jabatan
			divisi{
				nama
			}
		}
		inventaris{
			jumlah
			id
			barang{
				nama_barang
				id
			}
		}
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
			id
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
			id
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
			vendor{
				nama
			}
		}
	}
}
`

const getPengeluaranBarangsQuery = gql`
{
	pengeluaranBarangs {
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
		permintaanBarang {
			tanggal
			status
			id
			kode
			divisi{
				nama
				id
			}
			akun{
				username
				id
				karyawan{
					nama
					divisi{
						nama
						id
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

const hapusAkunMutation = gql`
	mutation($id:ID!){
		hapusAkun(id: $id){
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
	mutation($tanggal:String!, $status:String!, $kode: String!, $divisi_id: String!, $akun_id: String!, $tanggal_setuju: String!, $disetujui_id:String!){
		addPermintaanBarang(tanggal: $tanggal, status: $status, kode: $kode, divisi_id: $divisi_id, akun_id: $akun_id, tanggal_setuju: $tanggal_setuju, disetujui_id: $disetujui_id){
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
	mutation($kode:String!, $tanggal:String!, $status:String!, $tanggal_setuju:String!, $akun_id:String!, $vendor_id:String!){
		addPurchaseOrder(kode:$kode, tanggal:$tanggal, status:$status, tanggal_setuju:$tanggal_setuju, akun_id:$akun_id, vendor_id:$vendor_id){
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
	mutation($kode:String!, $tanggal:String!, $akun_id: ID!, $purchase_id: ID!){
		addPenerimaanBarang(kode:$kode, tanggal:$tanggal, akun_id: $akun_id, purchase_id: $purchase_id,){
			tanggal
			kode
			id
		}
	}
`

const addKaryawanMutation = gql`
	mutation($nama:String!, $jabatan:String!, $alamat:String!, $noHp:String!, $avatar:String!, $divisi_id: ID!){
		addKaryawan(nama:$nama, jabatan:$jabatan, alamat:$alamat, noHp:$noHp , avatar:$avatar, divisi_id: $divisi_id,){
			nama
			jabatan
			id
		}
	}
`

const addPengeluaranBarang = gql`
	mutation($kode:String!, $tanggal:String!, $akun_id: ID!, $permintaan_id: ID!){
		addPengeluaranBarang(kode:$kode, tanggal:$tanggal, akun_id:$akun_id, permintaan_id:$permintaan_id){
			kode
			tanggal
			id
		}
	}
`
const addPemeliharaan = gql`
	mutation($status:String!, $jumlah: Int!, $tanggal:String!, $karyawan_id: ID!, $inventaris_id: ID!,){
		addPemeliharaan(status:$status, jumlah:$jumlah, tanggal:$tanggal, karyawan_id: $karyawan_id, inventaris_id: $inventaris_id,){
			tanggal
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
	mutation($barang_id:ID!){
		hapusPersediaanBarang(barang_id:$barang_id){
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

const hapusPengeluaranBarang = gql`
	mutation($id:ID!){
		hapusPengeluaranBarang(id: $id){
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

const hapusPemeliharaan = gql`
	mutation($id:ID!){
		hapusPemeliharaan(id: $id){
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
			id
			karyawan {
				nama
				tanggal_lahir
				jenis_kelamin
				agama
				tempat_lahir
				alamat
				no_kontak
				email
				jabatan
				divisi{
					nama
					id
				}
				id
			}
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
			divisi{
				nama
				id
			}
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
						id
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
			total_harga
			tanggal_setuju
			vendor{
				nama
				jenis_usaha
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

const getPemeliharaanQuery = gql`
	query($id:ID){
		pemeliharaan(id: $id) {
			jumlah
			status
			tanggal
			id
			karyawan{
				nama
				jabatan
				divisi{
					nama
				}
			}
			inventaris{
				jumlah
				id 
				barang{
					id
					nama_barang
				}
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
				vendor{
					nama
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
	}
`

const getPengeluaranBarangQuery = gql`
	query($id:ID){
		pengeluaranBarang(id: $id) {
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
			permintaanBarang {
				tanggal
				status
				id
				kode
				divisi{
					nama
					id
				}
				akun{
					username
					id
					karyawan{
						nama
						divisi{
							nama
							id
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

const updateStatusDonePermintaanBarang = gql`
	mutation($id : ID, $status : String!){
		updateStatusDonePermintaanBarang(id:$id, status:$status){
			id
			status
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

const updateStatusDonePurchaseOrder = gql`
	mutation($id : ID, $status : String!){
		updateStatusDonePurchaseOrder(id:$id, status:$status){
			id
			status
		}
	}
`

const updateStatusListRequestOnSetujui = gql`
	mutation($id : ID, $status : String! ){
		updateStatusListRequestOnSetujui(id:$id, status:$status){
			id
			status
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
const updateStatusDoneListRequest = gql`
	mutation( $request_id: ID, $status : String!){
		updateStatusDoneListRequest(request_id:$request_id, status:$status ){
			status
		}
	}
`

const updateOneStatusListRequest = gql`
	mutation( $id: ID, $status : String!){
		updateOneStatusListRequest(id:$id, status:$status ){
			id
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
const updateDivisiPermintaanBarangMutation = gql`
	mutation($kode : String, $divisi_id : String! ){
		updateDivisiPermintaanBarang(kode:$kode, divisi_id:$divisi_id){
			id
		}
	}
`
const updateJumlahPersediaanBarang = gql`
	mutation($barang_id : ID, $jumlah : Int! ){
		updateJumlahPersediaanBarang(barang_id:$barang_id, jumlah:$jumlah){
			id
			jumlah
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
const updateJumlahInventaris = gql`
	mutation($barang_id : ID, $jumlah : Int! ){
		updateJumlahInventaris(barang_id:$barang_id, jumlah:$jumlah,){
			id
			jumlah
			status
			jumlah_diperbaiki
			jumlah_dipakai
		}
	}
`

const updateRusakInventaris = gql`
	mutation($id : ID, $jumlah : Int!, $jumlah_diperbaiki: Int! ){
		updateRusakInventaris(id:$id, jumlah:$jumlah, jumlah_diperbaiki:$jumlah_diperbaiki){
			id
			jumlah
			status
			jumlah_diperbaiki
			jumlah_dipakai
		}
	}
`

const updateTotalHargaPurchaseOrder = gql`
	mutation($id : ID, $total_harga : Int! ){
		updateTotalHargaPurchaseOrder(id:$id, total_harga:$total_harga){
			id
			status
			total_harga
		}
	}
`




const updateStatusPemeliharaan = gql`
	mutation($id : ID, $status:String!){
		updateStatusPemeliharaan(id:$id, status:$status){
			id
			jumlah
			status
		}
	}
`

const updateJumlahDipakaiInventaris = gql`
	mutation($id : ID, $jumlah_dipakai : Int! ){
		updateJumlahDipakaiInventaris(id:$id, jumlah_dipakai:$jumlah_dipakai,){
			id
			jumlah
			status
			jumlah_diperbaiki
			jumlah_dipakai
		}
	}
`

const updateJumlahDiperbaikiInventaris = gql`
	mutation($id : ID, $jumlah_diperbaiki : Int! ){
		updateJumlahDiperbaikiInventaris(id:$id, jumlah_diperbaiki:$jumlah_diperbaiki){
			id
			jumlah
			status
			jumlah_diperbaiki
			jumlah_dipakai
		}
	}
`



const editAkunMutation = gql`
	mutation($id : ID, $username : String!, $password : String! ){
		editAkun(id:$id, username:$username, password:$password){
			id
			username
			password
		}
	}
`

const editBiodataKaryawanMutation = gql`
	mutation($id : ID, $nama : String!,  $tanggal_lahir : String!, $jenis_kelamin : String!, $agama : String!, $tempat_lahir : String!, $alamat : String!, $no_kontak : String!, $email : String! ){
		editBiodataKaryawan(id:$id, nama:$nama, tanggal_lahir:$tanggal_lahir, jenis_kelamin:$jenis_kelamin, agama:$agama, tempat_lahir:$tempat_lahir, alamat:$alamat, no_kontak:$no_kontak, email:$email){
			id
			tempat_lahir
			tanggal_lahir
			jenis_kelamin
			agama
			nama
			alamat 
			no_kontak
			email
		}
	}
`

const uploadFotoMutation = gql`
	mutation($foto: Upload!){
		uploadFoto(foto: $foto){
			url
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
	addKaryawanMutation,
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
	getAkunsQuery,
	getVendorQuery,
	hapusManyListRequestMutation,
	updateStatusPermintaanBarang,
	updateStatusDonePermintaanBarang,
	updateStatusListRequest,
	getPurchaseOrdersQuery,
	getListItemPurchaseOrdersQuery,
	getPurchaseOrderQuery,
	updateVendorPurchaseOrderMutation,
	updateBarangMutation,
	updatePeralatanMutation,
	updateVendorMutation, 
	updateAllStatusListRequest,
	addListItemPurchaseOrder,
	hapusManyListItemPurchaseOrder,
	updateStatusPurchaseOrder,
	updateStatusDonePurchaseOrder,
	updateStatusListItemPurchaseOrder,
	updateStatusListRequestOnOrder,
	getPersediaanBarangQuery,
	getPersediaanBarangsQuery,
	addPersediaanBarang,
	updateJumlahPersediaanBarang,
	hapusPersediaanBarang,
	getInventarisQuery,
	getAllInventarisQuery,
	addInventaris,
	updateInventaris,
	updateJumlahInventaris,
	updateJumlahDipakaiInventaris,
	updateJumlahDiperbaikiInventaris,
	hapusInventaris,
	getPenerimaanBarangQuery,
	getPenerimaanBarangsQuery,
	addPenerimaanBarang,
	hapusPenerimaanBarang,
	getPengeluaranBarangQuery,
	getPengeluaranBarangsQuery,
	addPengeluaranBarang,
	hapusPengeluaranBarang,
	getPemeliharaanQuery,
	getPemeliharaansQuery,
	addPemeliharaan,
	hapusPemeliharaan,
	hapusAkunMutation, 
	editAkunMutation,
	editBiodataKaryawanMutation,
	uploadFotoMutation,
	updateStatusPemeliharaan,
	updateRusakInventaris,
	updateTotalHargaPurchaseOrder,
	updateDivisiPermintaanBarangMutation,
	updateStatusDoneListRequest,
	updateStatusListRequestOnSetujui,
	updateOneStatusListRequest

};