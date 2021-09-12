var express=require("express");
var bodyParser=require("body-parser");
var app=express()
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const ObjectID = require('mongodb').ObjectID;
var mongodb = require("mongodb");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.wonbr.mongodb.net/todo?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/add',(req, res) => {
res.render('add');

});



app.post('/add',(req, res) => {
    
    var item=req.body.n;
    console.log(item)
    
client.connect(err => {
  const collection = client.db("todo").collection("todos");
  var myobj = { todo: item};
  collection.insertOne(myobj);
});
});

app.get('/all',(req, res) => {
    allitems=""
    client.connect(err => {
      const collection = client.db("todo").collection("todos");
      allitems=collection.find({}).toArray(function(err, result) {
    if (err) throw err;
      //console.log(result[0].todo)
      res.render('all', {allitems:result});
      
      });

    });


});



app.post('/delete',(req, res) => {
    
    
    client.connect(err => {
    const collection = client.db("todo").collection("todos");
    collection.deleteOne({todo: req.body.checkbox.toString()});
    console.log(req.body.checkbox)
    res.redirect("/all");
});
    
    
});



app.listen(3000, () => console.log("Server Up and running"));