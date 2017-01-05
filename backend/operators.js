var models = require('./models.js');
var operators = models.getOperatorModel();
module.exports = {
    getProductCategories : function(callback){
        operators.find({},null,function(err,categories){
            if(err){
                return err;
            }
            else {
                return callback(categories);
            }
        })
    },
    addProductCategory : function(operator){

        var newOperators = new operators(operator)
        newOperators.save(function(err){
            if(err){
                return err;
            }
        });
    },
    getProductCategory : function(id){
        operators.find({id:id},function(err,company){
            if(err){
                return err;
            }
            else{
                return company;
            }
        })

    }
};
