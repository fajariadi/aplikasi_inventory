const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PerusahaanSchema = new Schema({
	nama: String,
	alamat: String,
	kodePos:String,
	email: String,
	phone: String,
});

module.exports = mongoose.model('Perusahaan', PerusahaanSchema);