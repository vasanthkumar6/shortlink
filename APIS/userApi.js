const exp = require("express");
const { isJSDocUnknownType, isForOfStatement } = require("typescript");
const userApp = exp.Router()
module.exports = userApp;
const mc = require("mongodb").MongoClient
dburl = "mongodb://vasanth:vasanthdb@cluster0-shard-00-00.ihpqy.mongodb.net:27017,cluster0-shard-00-01.ihpqy.mongodb.net:27017,cluster0-shard-00-02.ihpqy.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
var dbo;
mc.connect(dburl, { useUnifiedTopology: true, useNewUrlParser: true }, (err, clientObj) => {
  if (err) {
    console.log("Err in connecting mongodb")
  }
  else {
    dbo = clientObj.db("shortlink")
    console.log("connected to db")
  }
})
//email
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const generateId = require("../Middleware/generatId&status")
const activation = require("../Middleware/account_activation")

userApp.post("/register", (req, res) => {

  dbo.collection("user").findOne({ email: req.body.email }, (err, userObj) => {
    if (err) {
      console.log("err in finding user", err)
    }
    else if (userObj !== null) {
      res.send({ message: "User with this mail already exist" })
    }

    else {
      console.log("register")
      req.body.username = req.body.firstname + req.body.lastname;
      req.body.status = false;
      delete req.body.firstname;
      delete req.body.lastname;
      jwt.sign({ username: req.body.username }, "ishh", (err, recovery_token) => {
        if (err) {
          console.log("Err in token generation", err)
        }
        else {
          var email = req.body.email
          req.body.token = recovery_token
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `sidekickk6@gmail.com`,
              pass: 'fakegmail'
            }
          });
          var mailOptions = {
            from: `sidekickk6@gmail.com`,
            to: email,
            subject: 'Email Verification',
            text: "hi",
            html: '<p>Click <a href="http://localhost:5000/#/activate/' + recovery_token + '">here</a> to activate your urlshortner account</p>'
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("Err in sending mail", error);
            } else {
              console.log('Email sent: ' + info.response);
              // res.send({message:"account Activation sucessful"})
            }
          });
        }
      })
      bcrypt.hash(req.body.password, 6, (err, Hashedpassword) => {
        if (err) {
          console.log("Err in hashing password", err)
        }
        else {
          req.body.password = Hashedpassword
          // req.body.token=token

          dbo.collection("user").insertOne(req.body, (err, result) => {
            if (err) {
              console.log("err in registering user", err)
            }
            else {
              console.log("final obj", req.body)
              res.send({ message: "verification link has sent to the Registerd Email" })
            }
          })
        }
      })
    }
  })
})


userApp.get("/activateaccount/:token", (req, res) => {
  dbo.collection("user").findOne({ token: req.params.token }, (err, userObject) => {
    if (err) {
      console.log("Err in checking token in midlware", err)
    }
    else {
      userObject.status = true;
      // delete userObject.token;
      // console.log(userObject)
      dbo.collection("user").updateOne({ email: userObject.email },
        { $set: { status: userObject.status } }, (err, result) => {
          if (err) {
            console.log("Err in update", err)
          }
          else {
            dbo.collection("user").updateOne({ email: userObject.email },
              { $unset: { token: userObject.token } }, (err, result) => { })
            res.send({ message: "account Activation sucessful" })
          }
        })

    }
  })

})

userApp.post("/login", activation, (req, res) => {
  dbo.collection("user").findOne({ email: req.body.email }, (err, userObject) => {
    if (err) {
      console.log("Err in checking token in midlware")
    }
    else if (userObject == null) {
      console.log("Account doesn't existed")
    }
    else {
      console.log("login",userObject)
      bcrypt.compare(req.body.password,userObject.password, (err, ismatched) => {
        if (err) {
          console.log("Err in comparing password")
        }
        else if (ismatched == false) {
          console.log("not matched")
          res.send("invalid password")
        } else {
          res.send({ message: "Login succesful..!" })
        }
      })
    }

  })
})


userApp.post("/forgotPwdEmail", (req, res) => {
  dbo.collection("user").findOne({ email: req.body.email }, (err, userObject) => {
    if (err) {
      console.log("Err in finding mail of forgotpassword", err)
    }
    else if (!userObject) {
      res.send({ message: "please check your email id" })
    }
    else {
      console.log("1", userObject)
      // res.send({message:"success"})
      jwt.sign({ username: req.body.username }, "ishh", (err, recovery_token) => {
        if (err) {
          console.log("Err in token generation", err)
        }
        else {
          var email = req.body.email
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `sidekickk6@gmail.com`,
              pass: 'fakegmail'
            }
          });
          var mailOptions = {
            from: `sidekickk6@gmail.com`,
            to: email,
            subject: 'Email Verification',
            text: "hi",
            html: '<p>Click <a href="http://localhost:5000/#/passwordchange/' + recovery_token + '">here</a> to reset your password</p>'
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("Err in sending mail", error);
            } else {
              // console.log("2",userObject)
              // console.log(t,recovery_token)
              dbo.collection("user").updateOne({ email: req.body.email },
                { $set: { token: recovery_token } }, (err, result) => {
                  if (err) {
                    console.log("Err in token url saving in db", err)
                  }
                  else {
                    // console.log("3",userObject)
                    // console.log("3",recovery_token)
                    res.send({ message: "Password Reset link has sent to your mail" })
                  }
                })
              console.log('Email sent: ' + info.response);
            }
          });
        }
      })

    }
  })
})



userApp.post("/forgotpassword", (req, res) => {
  console.log("body", req.body)
  dbo.collection("user").findOne({ token: req.body.token }, (err, userObject) => {
    if (err) {
      console.log("Err in checking token in midlware", err)
    }
    else {
      bcrypt.hash(req.body.password, 6, (err, Hashedpassword) => {
        if (err) {
          console.log("Err in hashing password", err)
        }
        else {
          console.log("hash", Hashedpassword)
          req.body.password = Hashedpassword

          dbo.collection("user").updateOne({ email: userObject.email },
            { $set: { password: req.body.password } }, (err, result) => {
              if (err) {
                console.log("Err in update", err)
              }
              else {

                dbo.collection("user").updateOne({ email: userObject.email },
                  { $unset: { token: userObject.token } }, (err, result) => { })
                res.send({ message: "password changed sucessfully" })
              }
            })

        }
      })
    }
  })
}) 



// userApp.get("/shortUrls",(req,res)=>{
//   dbo.collection('urlcollection').find().toArray((err, result) => {
//     if (err) {
//         console.log('error in get', err);
//         // return res.status(400).json('error in insert', err);
//     }
//     else {
//       console.log("success")
//         res.send({ message: 'link shortened', fetchedObj: result})
//     }
//   })
// })

userApp.get('/x',(req,res)=>{
  dbo.collection("urlcollection").find().toArray((err,objjj)=>{
    console.log("shorturl",objjj)

      if(err){
        console.log("Err in shorturl get",err)
      }
      else{
        console.log("shorturl",objjj)
          res.send({message:objjj})
      }
  })
})