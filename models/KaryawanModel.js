const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KaryawanSchema = new Schema({
	nama: String,
	jabatan: String,
	alamat: String,
	noHp: String,
	divisi_id: String,
	avatar: String,
});

module.exports = mongoose.model('Karyawan', KaryawanSchema);