var uuid = require('uuid');
var models = require('./models.js');
var depots = models.getDepotModel();
var item = models.getItemModel();

module.exports = {

    editDepot: function (depot, callback) {
        depots.findOneAndUpdate({_id: depot._id}, depot).exec(function (err) {
            if (err) {
                return callback(err);
            }
            else {
                callback();
            }
        })
    },

    getDepots: function (callback) {
        depots.find({}).exec(function (err, depots) {
            if (err) {
                return callback(err);
            }
            else {
                return callback(depots);
            }
        })

    },
    updateItemInDepot: function (item, depotId, callback) {

        depots.findOneAndUpdate({
                id: depotId,
                "itemsAndQuantity._id": item._id
            },//set and push these values
            {
                "itemsAndQuantity.$.depotQuantity": item.depotQuantity,
                $push: {"itemsAndQuantity.$.history": {quantity: item.depotQuantity}}
            }
        ).exec(function (err, oldDepot) {
            if (err) {
                return callback(err);
            }
            else {
                callback();
            }
        });

    },

    deleteItemInDepot: function (item, depotId, callback) {
        depots.findOneAndUpdate({
                _id: depotId
            },
            {
                $pull: {"itemsAndQuantity": {_id: item._id}}
            }
        ).exec(function (err) {
            if (err) {
                return callback(err);
            }
            else {
                callback();
            }
        });
    },

    addItemToDepot: function (item, quantity, depotId, callback) {
        console.log(item);
        var itemsAndQuantity = {
            item: item,
            depotQuantity: quantity,
            history: [{quantity: quantity}]
        };

        depots.update({id: depotId}, {$push: {"itemsAndQuantity": itemsAndQuantity}},
            function (err, depot) {
                if (err) {
                    console.log("error");
                    callback(err);
                }
                else {
                    console.log("success", depot);
                    callback(depot);
                }
            });
    },
    getDepot: function (id, callback) {
        depots.find({id: id}).populate('itemsAndQuantity.item').exec(function (err, depot) {
            if (err) {
                return callback(err);
            }
            else {
                return callback(depot);
            }
        })
    },
    addDepot: function (depot, callback) {
        var newDepot = new depots(depot);
        newDepot.save(function (err, depot) {
            if (err) {
                callback(err)
            }
            else {
                callback(depot);
            }

        })
    },
    getAllDepotsWithItem: function (itemId, callback) {
        console.log(itemId)
        depots.find({"itemsAndQuantity.item": itemId}).exec(function (err, depots) {
            if (err) {
                callback(err);
            }
            else {
                callback(depots);
            }
        })
    },
    deleteDepot: function (id, callback) {
        depots.find({_id: id}).remove().exec(function (err) {
            if (err) {
                callback(err);
            }
            else {
                callback()
            }
        })
    }
};
