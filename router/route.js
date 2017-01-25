var bodyparser=require('body-parser');
//var url='mongodb://localhost:';

module.exports=function (app) {
    app.get("/",function(req,res){
        res.send("Squiz vit is online");
    })
}
