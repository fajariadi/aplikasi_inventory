import {gql} from 'apollo-boost';

const getVendorsQuery = gql`
{
	vendors {
		nama
		jenis_usaha
		id
	}
}
`

const getAlatsQuery = gql`
{
	alats {
		nama
		jumlah
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
const getRequestsQuery = gql`
{
	requests {
		tanggal
		status
		id
		divisi{
			nama
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
		request{
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

const addAlatMutation = gql`
	mutation($nama:String!, $jumlah:Int!){
		addAlat(nama: $nama, jumlah: $jumlah){
			nama
			jumlah
			id
		}
	}
`

const addVendorMutation = gql`
	mutation($nama:String!, $jenis_usaha:String!){
		addVendor(nama: $nama, jenis_usaha: $jenis_usaha){
			nama
			jenis_usaha
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

const addRequestMutation = gql`
	mutation($tanggal:String!, $status:String!, $divisi_id: ID!){
		addRequest(tanggal: $tanggal, status: $status, divisi_id: $divisi_id){
			tanggal
			status
			id
		}
	}
`
const hapusRequestMutation = gql`
	mutation($id:ID!){
		hapusRequest(id: $id){
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

const getRequestQuery = gql`
	query($id:ID){
		request(id: $id) {
			tanggal
			status
			id
			divisi{
				nama
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
	getAlatsQuery,
	getDivisisQuery,
	getRequestsQuery,
	getRequestQuery,
	getListRequestsQuery,
	getOrdersQuery,
	getBarangsQuery,
	getBarangQuery,
	addDivisiMutation, 
	addAlatMutation, 
	addVendorMutation,
	addRequestMutation,
	addListRequestMutation,
	addBarangMutation,
	hapusDivisiMutation,
	hapusRequestMutation,
	hapusListRequestMutation,
	getKaryawansQuery,
	addAkunMutation,
	getAkunQuery,
	hapusManyListRequestMutation
};