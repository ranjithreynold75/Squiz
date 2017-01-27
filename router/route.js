var bodyparser=require('body-parser');
//var url='mongodb://localhost:27017/squiz';
var url="mongodb://squiz:letsdoquiz@ds056419.mlab.com:56419/squiz";

var m=require('mongodb');
var mc=m.MongoClient;

var _db;
mc.connect(url,function(err,db){
    _db=db;
});


module.exports=function (app) {


    app.get("/",function(req,res){
        res.send("Squiz vit is online");
    })

    app.post("/faculty_signup",function(req,res){
var collection=_db.collection("faculty");
        var data={
            _id:req.body.code,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
        var cursor=collection.find({_id:req.body.code});
        cursor.count(function(err,c){

            if(c==0) {

                collection.insertOne(data, function (err) {
                    if (err)
                    {   console.log(err);}
                    else {
                        res.send("success");
                        console.log("signed up:"+res.body.code);
                    }

                })
            }
            else
            {
                res.send("Faculty already registered:)");
            }
        })
    })

    app.post("/faculty_login",function(req,res){

        var f_code=req.body.code;
        var password=req.body.password;
        var collection=_db.collection("faculty");
        var curser=collection.find({_id:code,password:password});
        curser.count(function(err,c){
            if(err)
            {
                console.log(err);
            }
            else
            {
if(c==1)
{
    res.send("success");
    console.log("faculty code:"+code+" logged in");
}
else
{
    res.send("unsuccess");
}
            }

        })



    })


}
