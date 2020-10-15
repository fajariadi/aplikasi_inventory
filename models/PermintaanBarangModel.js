const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermintaanBarangSchema = new Schema({
	tanggal: String,
	status: String,
	kode: String,
	akun_id:String,
	tanggal_setuju: String,
	disetujui_id:String,
});

module.exports = mongoose.model('PermintaanBarang', PermintaanBarangSchema);