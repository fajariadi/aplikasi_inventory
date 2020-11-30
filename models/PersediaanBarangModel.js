const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersediaanBarangSchema = new Schema({
    jumlah:Number,
    status: String,
    barang_id:String,
});

module.exports = mongoose.model('PersediaanBarang', PersediaanBarangSchema);