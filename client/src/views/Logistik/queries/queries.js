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
		id
		permintaanBarang{
			status
			tanggal
			divisi{
				nama
			}
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
	mutation($tanggal:String!, $status:String!, $kode: String!, $akun_id: String!){
		addPermintaanBarang(tanggal: $tanggal, status: $status, kode: $kode, akun_id: $akun_id){
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
	mutation($nama_barang:String!, $jumlah_barang:Int!, $satuan:String!, $jenis:String!, $request_id: ID!){
		addListRequest(nama_barang: $nama_barang, jumlah_barang: $jumlah_barang, satuan:$satuan, jenis:$jenis, request_id: $request_id){
			nama_barang
			jumlah_barang
			satuan
			jenis
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
			akun{
				username
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
				id
			}
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
	getKaryawansQuery,
	addAkunMutation,
	getAkunQuery,
	getVendorQuery,
	hapusManyListRequestMutation
};