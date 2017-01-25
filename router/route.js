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
            _id:res.body.f_code,
            name:res.body.name,
            email:res.body.email,
            password:res.body.password
        }
        var cursor=collection.find({_id:res.body.f_code});
        cursor.count(function(err,c){

            if(c==0) {

                collection.insertOne(data, function (err) {
                    if (err)
                    {   console.log(err);}
                    else {
                        res.send("welcome to squiz family:)");
                        console.log("signed up:"+res.body.f_code);
                    }

                })
            }
            else
            {
                res.send("Faculty already registered:)");
            }
        })
    })

}
