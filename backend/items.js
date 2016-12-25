var models = require('./models.js');
var items = models.getItemModel();
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
    addItem : function(item,callback){
        console.log(item)
        var newItem = new items(item.item);
        newItem.save(function(err){
            if(err){
                return err;
            }
            else{
                callback();
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
