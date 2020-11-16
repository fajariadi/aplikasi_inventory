const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListItemPurchaseOrderSchema = new Schema({
	nama_barang: String,
	jumlah_barang: Number,
	satuan: String,
    jenis: String,
    harga: Number,
	purchaseOrder_id: String,
    status: String,
});

module.exports = mongoose.model('ListItemPurchaseOrder', ListItemPurchaseOrderSchema);