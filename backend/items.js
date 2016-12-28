var models = require('./models.js');
var items = models.getItemModel();
module.exports = {
    getItems : function(callback){
        items.find({},null,function(err,items){
            if(err){
                return callback(err);
            }
            else {
                return callback(items);
            }
        })
    },
    updateItem : function(item,callback){
        console.log("the item",item)

        items.findOneAndUpdate({_id:item._id},{name:item.name,description:item.description, quantity: item.quantity}).exec(function(err,item){
            if(err){
                return callback(err);
            }
            else {
                console.log("update item in item",item);
                callback();
            }
        })
    },
    addItem : function(item,callback){
        console.log("item in items",item);
        var newItem = new items(item);
        newItem.save(function(err){
            if(err){
                return err;
            }
            else{
                callback(newItem);
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
