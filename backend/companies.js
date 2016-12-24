var models = require('./models.js');
var company = models.getCompanyModel();
module.exports = {
    getCompanies : function(){
        company.find({},null,function(err,companies){
            if(err){
                return err;
            }
            else {
                return companies;
            }
        })
    },
    addCompany : function(company){

        var company = new company(company)
        company.save(function(err){
            if(err){
                return err;
            }
            else{

            }
        });
    },
    getCompany : function(id){
        comapny.find({id:id},function(err,company){
            if(err){
                return err;
            }
            else{
                return company;
            }
        })

    }
}
