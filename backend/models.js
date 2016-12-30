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
    dateCreated: {
        default: Date.now,
        type: Date
    },
    category: [productCategorySchema],
    history: [{
        quantity: Number,
        date: {type: Date, default: Date.now}
    }]
});

var depotSchema = new Schema({
    name: String,
    location: String,
    id: String,
    itemsAndQuantity: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: 'items'
            },
            depotQuantity: Number,
            history: [{
                quantity: Number,
                date: {type: Date, default: Date.now}
            }]
        }]
});

var companySchema = new Schema({
    name: String,
    id: String,
    items: [itemSchema]
});

var itemModel = mongoose.model('items', itemSchema);
var depotModel = mongoose.model('depots', depotSchema);
var productCategoryModel = mongoose.model('productCategories', productCategorySchema);
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
