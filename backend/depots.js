var models = require('./models.js');
var depot = models.getDepotModel();

module.exports = {
    getDepots: function (callback) {
        depot.find({}, {itemsAndQuantity: 0}, function (err, depots) {
            if (err) {
                return err;
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
    addItemToDepot: function (item, quantity, depotId, callback) {
        var itemsAndQuantity = {
            item: item,
            quantity: quantity,
            history: [{
                quantity: quantity
            }]
        };
        console.log(itemsAndQuantity);
        depot.update({id: depotId}, {$push: {"itemsAndQuantity": itemsAndQuantity}}, {safe: true, upsert: true},
            function (err, depot) {
                if (err) {
                    console.log("error");
                    callback(err);
                }
                else {
                    console.log("success", depot);
                    callback(depot);
                }
            },    {strict: false})
    },
    getDepot: function (id, callback) {
        depot.find({id: id}, function (err, depot) {
            if (err) {
                return callback(err);
            }
            else {
                return callback(depot);
            }
        })
    }
};
