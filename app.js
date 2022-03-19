var express=require("express");
var bodyParser=require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}
    db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
	});
		
	return res.redirect('/Archive/index.html');
})

app.post('/teacher_dashboard', (req, res) => {
    var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}
    return res.redirect('/Teacher/index.html');
})

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'src/Teacher')));

app.get('/',function(req,res){
    // res.set({
    //     'Access-control-Allow-Origin': '*'
    //     });
    // return res.redirect('./src/index.html');
    // res.render(__dirname, './src/index.html')
    res.sendFile(__dirname + '/src/index.html')
}).listen(3000);

app.get('/sign_up_stu', (req, res) => {
    res.sendFile(__dirname + '/src/login.html');
})

app.get('/sign_up_tea', (req, res) => {
    res.sendFile(__dirname + '/src/login2.html');
})

console.log("server listening at port 3000");
