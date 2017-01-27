var depots = require('./depots');
var items = require('./items');
var categories = require('./categories');
var passport = require('passport');
var users = require('./users');

module.exports = function (app) {

    app.get('/status', function (req, res) {
        res.send(req.user);
    });

    app.post('/login',
        passport.authenticate('local'),
        function (req, res) {
            users.getUserByName(req.body.username, function (user) {
                res.send(user)
            })
        });

    app.get('/logout', isLoggedIn, function (req, res) {
        console.log(req);
        req.logout();
        //res.redirect('/');
        res.send("Logged out")
    });


    /**
     * Get all users
     */
    app.get('/users/', isLoggedIn, function (req, res) {
        users.getUsers(function (users) {
            res.send(users);
        })
    });

    app.post('/user/changePassword', isLoggedIn, function (req, res) {
        users.changePassword(req.body, function (user) {
            res.send(user);
        })
    });

    app.post('/user/changeEmail', isLoggedIn, function (req, res) {
        users.changeEmail(req.body, function (user) {
            res.send(user);
        })
    });

    app.post('/registerUser', isLoggedIn,function (req, res) {
        console.log("gets registerUser");
        users.registerUser(req.body, function (registered) {
            if(registered){
                res.send();
            }
            else{
                res.sendStatus(409)
            }
        })
    });
    app.post('/assignDepotToUser',isLoggedIn,function(req,res){
        var userId = req.body.userId;
        var depot = req.body.depot;
        console.log(userId)
        users.registerDepotOnUser(userId,depot,function(){
            res.end();
        })
    });

    /**
     * Gets the available depots
     */
    app.get('/depots', isLoggedIn,function (req, res) {
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
    app.get('/depot/:id',isLoggedIn, function (req, res) {
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
    app.get('/items', isLoggedIn,function (req, res) {
        items.getItems(function (items) {
            res.send(items);
            res.end();
        })

    });

    app.get('/categories', isLoggedIn,function (req, res) {
        categories.getProductCategories(function (categories) {
            res.send(categories);
            res.end();
        })
    });


    /**
     * Creates new item
     */
    app.post('/addNewItemToDepot',isLoggedIn, function (req, res) {
        var item = req.body.item;
        var depotId = req.body.depotId;
        var quantity = req.body.item.quantity;
        console.log(item)
        items.addItem(item, function (savedItem) {

            depots.addItemToDepot(savedItem, quantity, depotId, function (item) {
                console.log("The item added to depot: ", item);
            })
        });

        res.end();
    });


    app.post('/updateItemInDepot/:id',isLoggedIn, function (req, res) {
        var item = req.body.item;
        var depotId = req.params.id;
        console.log("item first", item);

        items.updateItem(item.item,function(){
            depots.updateItemInDepot(item, depotId, function () {
                res.end();
            });
        });
    });

    app.post('/updateItem',function(req,res){
        var item = req.body.item;
        items.updateItem(item,function(){
            res.end();
        })
    });

    app.post('/depot/', isLoggedIn,function (req, res) {
        var depot = req.body.depot;

        depots.addDepot(depot,function(){
           res.end();
        });
    });


    app.post('/addExistingItemToDepot',isLoggedIn, function (req, res) {
        var item = req.body.item;
        var depotQuantity = req.body.item.depotQuantity;
        var depotId = req.body.depotId;
        console.log(req.body.item);
        items.updateItem(item,function(){
            depots.addItemToDepot(item,depotQuantity,depotId,function(){
                res.end();
            })
        });
    });

    app.post('/updateDepot', isLoggedIn,function (req, res) {
        var depot = req.body.depot;

        depots.editDepot(depot,function(){
            res.end();
        });
    });

    app.post('/deleteItemInDepot/:id', function(req,res){
        var depotId = req.params.id;
        var item = req.body.item;
        depots.deleteItemInDepot(item,depotId,function(){
            console.log("SUCCESS")
            res.end();
        })
    });

    app.post('/deleteItem', isLoggedIn,function(req,res){
        var itemId = req.body.item._id;
        items.removeItem(itemId,function(){
            res.end();
        })
    });

    app.post('/user/changeImage', isLoggedIn,function(req,res){
        var user = req.body;
        console.log("USER",user);
        users.changeImage(user,function(){
            res.end();
        })
    });

    app.get('/getDepotsWithItem/:id',isLoggedIn,function(req,res){
        var itemId = req.params.id;
        console.log("HEY")

        depots.getAllDepotsWithItem(itemId,function(depots){
            res.send(depots);
            res.end();
        })
    });

    app.get('/deleteDepot/:id',isLoggedIn,function(req,res){
        console.log("HAY")
        var depotId = req.params.id;
        depots.deleteDepot(depotId,function(){
            res.end();
        })
    });

    app.get('/initiateDatabase', function(req,res) {
       var adminUser = {
           username : "admin",
           password: "admin",
           admin : true
       };
        users.registerUser(adminUser,function(user){
            if(user){
                res.send("Successfully created admin with password admin");
                res.end();
            }
            else{
                res.status(405).send("Error");
            }

        })
    });

    /**
     * The authentication checker
     * @param req - The request object
     * @param res - The response object
     * @param next - Callback to continue the route
     */
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            // Method is not allowed, user is not registered
            res.sendStatus(401);
        }
    }
};
