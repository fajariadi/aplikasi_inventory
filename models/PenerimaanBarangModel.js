const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PenerimaanBarangSchema = new Schema({
    kode: String,
    tanggal:String,
    akun_id:String,
    purchase_id:String,
});

module.exports = mongoose.model('PenerimaanBarang', PenerimaanBarangSchema);