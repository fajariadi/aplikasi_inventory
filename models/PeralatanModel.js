const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeralatanSchema = new Schema({
	nama: String,
	jumlah: Number,
	harga: Number,
	sewa: Number,
});

module.exports = mongoose.model('Peralatan', PeralatanSchema);