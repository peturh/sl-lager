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

        var newDepot = new depot(depot);
        newDepot.save(function(err){
            if(err){
                return err;
            }
            else{
                callback();
            }
        });
    },
    addItemToDepot : function(item,depotId,callback){
        depot.findOneAndUpdate({id:depotId},{},function(){
            console.log("hej")
        })
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
