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
    updateQuantity : function(item,quantityToAdd,callback){
        /**
         * Only handles added values!!!
         */
        items.findOne({_id:item._id}).exec(function(err,item){
            if(err){
                return callback(err);
            }
            else{

                var oldQuantity = item.quantity;
                var newQuantity = oldQuantity + quantityToAdd;

                items.findOneAndUpdate({_id:item._id},{quantity : newQuantity}).exec(function(err,item){
                    if(err){
                        return callback(err);
                    }
                    else{
                        console.log("updated item",item);
                        return callback(item);
                    }
                })
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
