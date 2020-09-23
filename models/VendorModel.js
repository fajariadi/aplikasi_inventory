const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
	nama: String,
	jenis_usaha: String,
	alamat: String,
	email:String,
	noTlp:String
});

module.exports = mongoose.model('Vendor', VendorSchema);