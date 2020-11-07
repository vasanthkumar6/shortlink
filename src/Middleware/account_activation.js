// //imporing dbo
// const dbo=require("../../db")


//import
const exp=require("express");
//import mongodb
const mc = require("mongodb").MongoClient
//dburl
dburl = "mongodb://vasanth:vasanthdb@cluster0-shard-00-00-ihpqy.mongodb.net:27017,cluster0-shard-00-01-ihpqy.mongodb.net:27017,cluster0-shard-00-02-ihpqy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

var dbo;
//connect mongoclient with database
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,secuobj)=>{

    if (err) {
        console.log("err in connecting db", err)
    }
    else {
        dbo = secuobj.db("shortlink")
        console.log("connected to middleware db")
    }

})

   
    var activation=(req,res,next)=>{
        console.log("reqbody",req.body)
        dbo.collection("user").findOne({email:req.body.email},(err,userObject)=>{
            console.log("usrobj",userObject)
            if(err)
            {
                console.log("Err in finding mail for activation",err)
            }
            else if(!userObject)
            {
                res.send({message:"please enter valid credentials"})
            }
            else
            {
                console.log("userobj",userObject)
                if(userObject.status==true)
                {
                    next();
                }
                else{
                    res.send({message:"Your account is Inactive..check your mail activation link has been sent already!!"})
                }
            }
        })
      
    }

    module.exports=activation;