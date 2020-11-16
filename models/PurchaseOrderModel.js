const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseOrderSchema = new Schema({
	kode: String,
	tanggal: String,
	akun_id:String,
	vendor_id: String,
	status: String,
	tanggal_setuju: String,
	total_harga: Number,
});

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);