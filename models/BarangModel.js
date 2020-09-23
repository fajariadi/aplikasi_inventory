const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BarangSchema = new Schema({
	nama_barang: String,
	jenis_barang: String,
	satuan: String,
	harga:Number,
});

module.exports = mongoose.model('Barang', BarangSchema);