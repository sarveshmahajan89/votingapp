var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");

var app = express();

//  Returns middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({extended:false}));
// Returns middleware that only parses json
app.use(bodyParser.json());
app.use(express.static('public'));


var server = app.listen(8080, function() {
	console.log('server open', server.address().port);
})


app.get('/index.html', function(req, res) {
	console.log(req.url);
	//
	res.sendFile(__dirname+'/'+'index.html');
})

app.get('/invest', function(req, res) {
	console.log(req.url);
	//
	res.end('investment banking barclays');
})

app.get('/auth', function(req, res) {
	console.log(req.url);
	//
	var readId = require('./idList.json');
	for(var i=0;i<readId.length;i++) {
		console.log(readId[i].id);
	}
	var sendData = {
			"details":readId
		};
	res.end(JSON.stringify(sendData));
})

app.post('/authenticate', function(req, res) {
	console.log(req.url);
	//
	var id = (req.body.id); 
	var pass = (req.body.pass); 
	console.log(id);
	console.log(pass);
	//var readId = require('./idList.json');
	var sendData = {
			"status":false,
			"user":id
		};

	var readId = require('./idList.json');	
	for(var i=0;i<readId.length;i++) {
		//console.log(readId[i].id);
		//console.log(readId[i].password);
		if(id == readId[i].id && pass == readId[i].password) {
			console.log('matched');
			sendData.status = true;
			//sendData.id = id;
			i=readId.length;
		}
	}	
	res.end(JSON.stringify(sendData));

	//res.end(JSON.stringify(sendData));
})

app.get('/getcount', function(req, res) {
	console.log(req.url);
	//
	var readJson = require('./count.json');
	console.log('reading done');
	var sendData = {
			"options":readJson
		};
	res.end(JSON.stringify(sendData));
})

app.post('/submitvote', function(req, res) {
	console.log('inside post');
	var optionData = (req.body.option);
	var user = (req.body.user);

	console.log(optionData);

	var returnData = {
		"option":optionData,
		"status":false
	};

	var subData = {
			"option":optionData,
			"user":user
		};
	//res.end(optionData);

	var readJson = require('./count.json');
	var count = 0;
	//console.log('reading done');
	//console.log(user);
	for(var i=0;i<readJson.length;i++) {
		//console.log(readJson[i].user);
		if(user === readJson[i].user) {
			 //console.log('login id matched');
			// readJson.push(subData);
			// fs.writeFile('./count.json',JSON.stringify(readJson));
			i=readJson.length;
			//res.end(returnData);
		} else {
			//console.log('other id from login');
			count = count+1;
		}
	}	
	if (count == readJson.length) {
		//console.log('unique');
		readJson.push(subData);
		fs.writeFile('./count.json',JSON.stringify(readJson));
		returnData.status = true;
		//res.end(returnData);
	}
	res.end(JSON.stringify(returnData));
});
// app.post('/submitvote', function(req, res) {
// 	console.log('inside post');
// 	var optionData = (req.body.option);
// 	var user = (req.body.user);

// 	console.log(optionData);
// 	var subData = {
// 			"option":optionData,
// 			"user":user
// 		};
// 	res.end(optionData);

// 	var readJson = require('./count.json');
// 	console.log('reading done');
// 	readJson.push(subData);
// 	fs.writeFile('./count.json',JSON.stringify(readJson));
// });

// login validation

// app.post('/submitvote', function(req, res) {
// 	console.log('inside post');
// 	var details = (req.body.login); 
// 	console.log(details);
// 	for(var i=0;i<readId.length;i++) {

// 	}
// 	console.log('reading done');
// 	readJson.push(subData);
// 	fs.writeFile('./count.json',JSON.stringify(readJson));
	
// });
