const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PengeluaranBarangSchema = new Schema({
    kode:String,
    tanggal:String,
    akun_id:String,
    permintaan_id:String
});

module.exports = mongoose.model('PengeluaranBarang', PengeluaranBarangSchema);