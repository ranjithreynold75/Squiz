var bodyparser=require('body-parser');
//var url='mongodb://localhost:27017/squiz';
var url="mongodb://squiz:letsdoquiz@ds056419.mlab.com:56419/squiz";

var path=require('path');


var m=require('mongodb');
var mc=m.MongoClient;
var _db;
mc.connect(url,function(err,db){
    _db=db;
});

var id=require('idgen');
var up=bodyparser.urlencoded({extended:false});
module.exports=function (app) {

app.post("/view_quiz",function(req,res){
    var qid=req.body.id;

    var collection=_db.collection("quiz");
    collection.find({_id:qid}).toArray(function(err,data){
        if(err) {
            console.log(err);
        }
        else
        {
            var data1={
                details:data
            }
        res.send(JSON.stringify(data1));
        }
    })


})





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
                var data1={
                    details:data

                }
                console.log(data1);
             res.send(JSON.stringify(data1));

            }

        });

    })





    app.get("/",function(req,res){
//res.sendFile(path.join(__dirname, '../public', 'index1.html'));
        //res.write("../public/index.html");
        res.sendFile(path.join(__dirname,'../public','index.html'));

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
          c_code:req.body.c_code,
            f_code:req.body.code,
            q_name:req.body.name,
            s_name:req.body.s_name,
            slot:req.body.slot,
            duration:req.body.duration,
            date:req.body.date,
            no_questions:req.body.no_questions,
            time:req.body.time,
            sets:req.body.sets
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


app.get("/download",function(req,res){
   // console.log(__dirname);
    var file=__dirname+"/app/app_icon.png";
    res.download(file);
})


app.post("/student_request",function(req,res){
    var q_id=req.body.id;
    var regno=req.body.no;
    var sets=req.body.sets;
    var data={
        regno:regno,
        mark:0,
        access:"no",
        sets:sets
    };



    var collection=_db.collection('quiz');

     collection.updateOne({_id:q_id},{$push:{students:data}});
res.send("success");

})



}
