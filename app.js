var express = require('express');

var app = express();
var mongojs = require('mongojs');
var db = mongojs('mean-dev', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// app.get('/', function (req, res) {
//  res.send("hello world");
//});

app.listen(3000);

app.get('/contactlist', function(req, res) {
  console.log("I receive a get request");
  db.contactlist.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.get('/contactlist/:id', function(req, res) {
  var id = req.params.id;
  db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
    console.log(doc);
    res.json(doc);
  })
});


app.post('/contactlist', function (req, res) {
  console.log(req.body);

  db.contactlist.insert(req.body, function (err, doc) {
    res.json(doc);
  })
});

app.put('/contactlist/:id', function(req, res){
  var id = req.params.id;
  db.contactlist.findAndModify({
    query:{_id:mongojs.ObjectId(id)},
    update:{$set:{name:req.body.name, email:req.body.email, num:req.body.num}},
    new: true}, function (err, doc){
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;

  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

console.log("Server Started");