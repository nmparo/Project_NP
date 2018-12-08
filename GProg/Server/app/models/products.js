var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Bcrypt = require('bcryptjs');

var productSchema = new Schema({
    productImage: { type: String, require: true },
    productName: { type: String, require: true },
    description: { type: String, require: true },
    url: { type: String, require: true }
});

module.exports = Mongoose.model('Product', productSchema);

