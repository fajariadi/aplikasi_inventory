const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventarisSchema = new Schema({
	jumlah:Number,
	status:String,
	jumlah_diperbaiki:Number,
	jumlah_dipakai:Number,
	barang_id:String,
});

module.exports = mongoose.model('Inventaris', InventarisSchema);