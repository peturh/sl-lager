var models = require('./models.js');
var category = models.getProductCategoryModel();
module.exports = {
    getProductCategories : function(callback){
        category.find({},null,function(err,categories){
            if(err){
                return err;
            }
            else {
                return callback(categories);
            }
        })
    },
    addProductCategory : function(category){

        var category = new category(category)
        category.save(function(err){
            if(err){
                return err;
            }
        });
    },
    getProductCategory : function(id){
        comapny.find({id:id},function(err,company){
            if(err){
                return err;
            }
            else{
                return company;
            }
        })

    }
};
