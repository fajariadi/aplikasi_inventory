const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListRequestSchema = new Schema({
	nama_barang: String,
	jumlah_barang: Number,
	satuan: String,
	jenis: String,
	request_id: String,
	status: String,
	harga:Number,
	order_id:String,
});

module.exports = mongoose.model('ListRequest', ListRequestSchema);