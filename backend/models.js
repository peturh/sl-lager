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
    externalId: String,
    price : String,
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

var operatorSchema = new Schema({
    name: String,
    depots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'depots'
        }
    ]
});

var depotSchema = new Schema({
    name: String,
    location: String,
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


var userSchema = new Schema({
    id: String,
    username: String,
    password: String,
    salt: String,
    depot: {type: Schema.Types.ObjectId, ref: 'depots'},
    admin: Boolean //change to admin schema in future
});

var itemModel = mongoose.model('items', itemSchema);
var depotModel = mongoose.model('depots', depotSchema);
var operatorModel = mongoose.model('operators', operatorSchema);
var productCategoryModel = mongoose.model('productCategories', productCategorySchema);
var companyModel = mongoose.model('companies', companySchema);
var userModel = mongoose.model('users', userSchema);

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
    },
    getOperatorModel: function () {
        return operatorModel;
    },
    getUserModel: function () {
        return userModel;
    }
};
