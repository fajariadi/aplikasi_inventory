const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DivisiSchema = new Schema({
	nama: String,
});

module.exports = mongoose.model('Divisi', DivisiSchema);