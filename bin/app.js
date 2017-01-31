var express=require('express');

var app=express();

var bodyparser=require('body-parser');

function notify(req,res,next){
    console.log("request been made"+req.url);
next();
}


app.use(notify);

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/public/image'));



app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb',extended:true}));
//app.use(bodyparser.urlencoded({extended:false}));

require('../router/route.js')(app);

var server=app.listen(process.env.PORT || 8000,function(){
    console.log("server running in port"+(process.env.PORT || 8000));
});
server.timeout=14000;

