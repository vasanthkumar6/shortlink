const exp=require("express");
const app=exp()
app.listen(5000);
console.log("port is running on 5000")
app.use(exp.json())
const path=require("path")
app.use(exp.static(path.join(__dirname,"./dist/shorturl")))

const userApp=require("./src/APIS/userApi")
app.use("/user",userApp)


const moment=require("moment")
const shortid=require("shortid")

//==== url shortener handler ====//

userApp.post('/shortener', (req, res) => {
  const today = moment().format('lll');
  req.body.createdOn = today
  dbo.collection('urlcollection').findOne({ fullUrl: req.body.fullUrl }, (err, obj1) => {
      if (err) {
          console.log('err in find', err);
          // return res.status(400).json('error in insert', err);
      }
      else if (!obj1) {
          var defaultnumber = 0;
          const newId = shortid.generate();
          const shortUrl = "http://localhost:5000" + '/' + newId;
          req.body.shortUrl = shortUrl;
          req.body.shortcode = newId;
          req.body.clicks = defaultnumber;
          dbo.collection('urlcollection').insertOne(req.body, (err, result) => {
              if (err) {
                  console.log('error in insert', err);
                  // return res.status(400).json('error in insert', err);
              }
              else {
                  res.send({ message: 'link shortened', fetchedObj: result.ops })
              }
          })
      }
      else {
                res.send({ message: 'url already in existed' })
      }
  })
})


//==== redirecting route ====//

userApp.get('/:code', (req, res) => {
  dbo.collection('urlcollection').findOne({ shortcode: req.params.code }, (err, urlObj) => {
      if (err) {
          console.log('err in find', err);
      }
      else if (urlObj) {
          dbo.collection('urlcollection').updateOne({ shortcode: req.params.code }, { $inc: { clicks: 1 } }, (err, resp2) => {
              if (err) {
                  console.log('err in update', err);
              }
          })
           res.redirect(urlObj.fullUrl);
      }
  })
})
