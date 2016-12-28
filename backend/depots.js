var uuid = require('uuid');
var models = require('./models.js');
var depot = models.getDepotModel();
var item = models.getItemModel();

module.exports = {
    getDepots: function (callback) {
        depot.find({}, {itemsAndQuantity: 0}).exec(function (err, depots) {
            if (err) {
                return callback(err);
            }
            else {
                return callback(depots);
            }
        })
    },
    addDepot: function (depot, callback) {
        var newDepot = new depot(depot);
        newDepot.save(function (err) {
            if (err) {
                return err;
            }
            else {
                callback();
            }
        });
    },
    updateItemInDepot: function (item, depotId, callback) {
        
        var oldDepotQuantity = 0;
        depot.findOne({
            id: depotId,
            "itemsAndQuantity._id": item._id
        }).exec(function (err, foundDepot) {
            if (err) {
                callback(err);
            }
            else {
                for (var i = 0; i < foundDepot.itemsAndQuantity.length; i++) {
                    if (foundDepot.itemsAndQuantity[i]._id == item._id) {
                        oldDepotQuantity = foundDepot.itemsAndQuantity[i].depotQuantity;

                        depot.findOneAndUpdate({
                                id: depotId,
                                "itemsAndQuantity._id": item._id
                            },//set and push these values
                            {
                                "itemsAndQuantity.$.depotQuantity": item.depotQuantity,
                                $push: {"itemsAndQuantity.$.history": {quantity: oldDepotQuantity}}
                            }
                        ).exec(function (err, oldDepot) {
                            if (err) {
                                return callback(err);
                            }
                            else {
                                console.log("old depot", oldDepot);
                                callback();
                            }
                        });
                    }
                }
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

        depot.update({id: depotId}, {$push: {"itemsAndQuantity": itemsAndQuantity}},
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
        depot.find({id: id}).populate('itemsAndQuantity.item').exec(function (err, depot) {
            if (err) {
                return callback(err);
            }
            else {
                return callback(depot);
            }
        })
    }
};
