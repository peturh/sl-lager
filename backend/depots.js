var uuid = require('uuid');
var models = require('./models.js');
var depots = models.getDepotModel();
var item = models.getItemModel();

module.exports = {
    getDepots: function (callback) {
        depots.find({}, {itemsAndQuantity: 0}).exec(function (err, depots) {
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
        depot.id = uuid.v4();
        var newDepot = new depots(depot);
        newDepot.save(function (err, depot) {
            if (err) {
                callback(err)
            }
            else {
                callback(depot);
            }

        })
    }
};
