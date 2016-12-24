var models = require('./models.js');
var depot = models.getDepotModel();
module.exports = {
    getDepots : function(callback){
        depot.find({},{itemsAndQuantity:0},function(err,depots){
            if(err){
                return err;
            }
            else {
                return callback(depots);
            }
        })
    },
    addDepot : function(depot,callback){

        var depot = new depot(depot);
        depot.save(function(err){
            if(err){
                return err;
            }
            else{
                callback();
            }
        });
    },
    getDepot : function(id,callback){
        depot.find({id:id},function(err,depot){
            if(err){
                return callback(err);
            }
            else{
                return callback(depot);
            }
        })

    }
}
