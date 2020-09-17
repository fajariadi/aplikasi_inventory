const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AkunSchema = new Schema({
	username: String,
	password: String,
	karyawan_id: String,
});

module.exports = mongoose.model('Akun', AkunSchema);