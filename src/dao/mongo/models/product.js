const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productCollection = 'product';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: {
    type: Array,
    default: []
  },
  code: String,
  stock: Number,
  category: String,
  status: {
    type: Boolean,
    default: true
  }
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

module.exports = { productModel };
