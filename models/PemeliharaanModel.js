const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PemeliharaanSchema = new Schema({
	jumlah:Number,
	status:String,
    tanggal:String,
    akun_id:String,
	inventaris_id:String,
});

module.exports = mongoose.model('Pemeliharaan', PemeliharaanSchema);