const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseOrderSchema = new Schema({
	kode: String,
	tanggal: String,
	vendor_id: String,
	status: String,
	tanggal_setuju: String
});

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);