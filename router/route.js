var bodyparser=require('body-parser');
//var url='mongodb://localhost:27017/squiz';
var url="mongodb://squiz:letsdoquiz@ds056419.mlab.com:56419/squiz";

module.exports=function (app) {


    app.get("/",function(req,res){
        res.send("Squiz vit is online");
    })

    app.get("/",function(req,res){
        
    })

}
