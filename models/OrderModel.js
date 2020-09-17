const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	kode: String,
	tanggal: String,
	vendor_id: String,
	jenis: String,
	status: String,
});

module.exports = mongoose.model('Order', OrderSchema);