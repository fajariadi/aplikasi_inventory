const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlatSchema = new Schema({
	nama: String,
	jumlah: Number,
});

module.exports = mongoose.model('Alat', AlatSchema);