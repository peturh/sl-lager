var depots = require('./depots');
var items = require('./items');
var categories = require('./categories');

module.exports = function (app) {

    /**
     * Gets the available depots
     */
    app.get('/depots', function (req, res) {
        depots.getDepots(function (depots) {
            if (!depots) {
                res.status(500).send("Something broke!");
            }
            else {
                res.send(depots);
                res.end();
            }
        });
    });

    /**
     * Gets a certain depot
     */
    app.get('/depot/:id', function (req, res) {
        depots.getDepot(req.params.id, function (depot) {
            if (!depot) {
                res.status(500).send("Something broke!");
            }
            else {
                res.send(depot);
                res.end();
            }
        })

    });

    /**
     * Gets all items
     */
    app.get('/items', function (req, res) {
        items.getItems(function(items){
            res.send(items);
            res.end();
        })

    });

    app.get('/productCategories', function (req, res) {
        categories.getProductCategories(function(categories){
            res.send(categories);
            res.end();
        })
    });


    /**
     * Creates new item
     */
    app.post('/addNewItemToDepot', function (req, res) {
        var item = req.body.item;
        var depotId = req.body.depotId;
        var quantity = req.body.item.quantity;

        items.addItem(req.body,function(){
            depots.addItemToDepot(item,quantity,depotId,function(item){
                console.log("The item added to depot: ",item);
            })
        });

        res.end();
    });

    app.post('/addExistingItemToDepot', function (req, res) {

        items.addItem(req.body,function(){

        });

        console.log(req.body);
        res.end();
    });
};
