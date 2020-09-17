const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
	nama: String,
	jenis_usaha: String,
});

module.exports = mongoose.model('Vendor', VendorSchema);