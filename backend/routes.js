var depots =require('./depots');

module.exports = function(app){

    app.get('/depots', function (req, res) {
        depots.getDepots(function(depots){
            if(!depots){
                res.status(500).send("Something broke!");
            }
            else{
                res.send(depots);
                res.end();
            }
        });
    });
    app.get('/depot/:id', function (req, res) {
        depots.getDepot(req.params.id, function(depot){
            if(!depot){
                res.status(500).send("Something broke!");
            }
            else{
                res.send(depot);
                res.end();
            }
        })

    });

    app.get('/items', function (req, res) {


    });

    app.get('/productCategories', function (req, res) {


    });
};
