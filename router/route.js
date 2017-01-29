var bodyparser=require('body-parser');
//var url='mongodb://localhost:27017/squiz';
var url="mongodb://squiz:letsdoquiz@ds056419.mlab.com:56419/squiz";

var m=require('mongodb');
var mc=m.MongoClient;

var _db;
mc.connect(url,function(err,db){
    _db=db;
});

var id=require('idgen');
var up=bodyparser.urlencoded({extended:false});
module.exports=function (app) {





    app.post("/mainpage",up,function(req,res){
        var code=req.body.code;
        var collection=_db.collection("quiz");
        console.log(code);
        collection.find({f_code:code}).toArray(function(err,data){
            if(err){
                console.log("mainpage error");
            }
            else
            {
                console.log(data);
             res.send(json.stringify(data));

            }

        });

    })

app.post("/sample",function(req,res){
    res.send(req.body.code);
    console.log(req.body.code);
})



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
        console.log(f_code);
        var collection=_db.collection("faculty");
        var curser=collection.find({_id:f_code,password:password});
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
    console.log("faculty code:"+f_code+" logged in");
}
else
{
    res.send("unsuccess");
}
            }

        })



    })


    app.post("/faculty_generate",function(req,res){

    var quiz_id=id(8);
        res.send(quiz_id);
    });

    app.post("/faculty_quiz_upload",function(req,res){

        var quiz=_db.collection('quiz');
        var faculty=_db.collection('faculty');
        var data={
            _id:req.body.id,
            f_code:req.body.code,
            q_name:req.body.name,
            s_name:req.body.s_name,
            slot:req.body.slot,
            duration:req.body.duration,
            date:req.body.date,
            no_questions:req.body.no_questions,
            time:req.body.time

        }
quiz.insertOne(data,function(err){
    if(err) {
        console.log(err);
    res.send("unsuccess");
    }
    else
    res.send("success");
})


    })





}
