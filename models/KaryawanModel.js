const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KaryawanSchema = new Schema({
	nama: String,
	tanggal_lahir: String,
	jenis_kelamin: String,
	agama: String,
	tempat_lahir: String,
	alamat: String,
	no_kontak: String,
	email: String, 
	foto:String,
	jabatan: String,
	divisi_id: String
});

module.exports = mongoose.model('Karyawan', KaryawanSchema);