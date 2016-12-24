var models = require('./models.js');
var item = models.getItemModel();
module.exports = {
    getItems : function(){
        item.find({},null,function(err,depots){
            if(err){
                return err;
            }
            else {
                return depots;
            }
        })
    },
    getItemsFromDepot : function(){
        item.find({},null,function(err,depots){
            if(err){
                return err;
            }
            else {
                return depots;
            }
        })
    },
    addItem : function(item){

        var item = new depot(item)
        item.save(function(err){
            if(err){
                return err;
            }
            else{

            }
        });
    },
    getItem : function(id){
        item.find({id:id},function(err,item){
            if(err){
                return err;
            }
            else{
                return item;
            }
        })

    }
}
