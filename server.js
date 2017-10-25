const PORT = 8080

var express = require('express')
var bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient
var app = express();

app.use(bodyParser.urlencoded({extended : true}))

app.set('view engine', 'ejs')

var db

mongoClient.connect('mongodb://testusr:test@ds227325.mlab.com:27325/testapp', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(PORT, () => {
      console.log('Running, connected with db')
    })
  })

app.get('/', (req, res) =>{
    var cursor = db.collection('quotes').find().toArray((err, result) => {
        console.log(result)
        //res.render('index.ejs', {quotes : result})
        //res.json()
    })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) =>{
        if(err) return console.log(err)

        console.log('Saved to database')
        res.redirect('/')
    })
  })