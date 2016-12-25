var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productCategorySchema = new Schema({
    name: String,
    description: String,
    productCategoryId: String,
    externalProductCategoryId: String
});

var itemSchema = new Schema({
    quantity: Number,
    name: String,
    description: String,
    id: String,
    externalId: String,
    date: {
        default: Date.now,
        type: Date
    },
    category: [productCategorySchema]
});

var depotSchema = new Schema({
    name: String,
    location: String,
    id: String,
    itemsAndQuantity: []
});

var companySchema = new Schema({
    name: String,
    id: String,
    items: [itemSchema]
});

var itemModel = mongoose.model('items', itemSchema);
var depotModel = mongoose.model('depots', productCategorySchema);
var productCategoryModel = mongoose.model('productCategories', depotSchema);
var companyModel = mongoose.model('companies', companySchema);

module.exports = {
    getItemModel: function () {
        return itemModel
    },
    getDepotModel: function () {
        return depotModel;
    },
    getProductCategoryModel: function () {
        return productCategoryModel;
    },
    getCompanyModel: function () {
        return companyModel;
    }
};
