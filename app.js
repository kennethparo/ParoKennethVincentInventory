const http = require('http');
const mongojs = require('mongojs');
const crypto = require ('crypto');
const redis = require('redis');
const querystring = require('querystring');
const StaticServer = require('node-static').Server;
const file = new StaticServer('./public');
let client = redis.createClient();
let db = mongojs('userdb');
const handlers = {};

handlers["/login"] = function(req, res) {
	let qs = querystring.parse(req.url);
	let un = qs['/login?username'];
	let pw = qs['password'];
	res.writeHead(200, {"Content-Type" : "application/json"});
	db.users.findOne({ "username" : un, "password" : pw }, (err, docs) => {
		if(docs != null) {
			startSession(un, (id) => {
				res.write(id);
				res.end();
			});
		}
		else {
			res.write("Login failed");
			res.end();
		}
	});
};

function startSession(name, callback) {
	var id = crypto.randomBytes(16).toString("hex");
	client.set(id, name, function() {
		callback(id);
	});
};

function doesSessionExist(sessionid, callback) {
	client.exists(sessionid, function(err, reply) {
		callback(reply);
	});
}

function endSession(sessionid, callback) {
	client.del(sessionid, function(err, reply) {
			callback();
	});
}

const server = http.createServer( function(req, res) {
	let path = req.url.split("/");
	let search = path.slice(-1)[0];
	let x = req.url;
	if(path.length == 4) {
		x = req.url.replace("/"+search,"");
	}
	if(handlers[x]) {
	handlers[x](req, res, search);
	}
	else {
		if(x.includes("?")) {
			let url = x.split("?");
			handlers[url[0]](req, res);
		}
		else {
			file.serve(req, res, function(err, result) {
				if(err && (err.status === 404)) {
					res.writeHead(404);
					res.end("Error: Not Found");
				}
			});
		}
	}
});

server.listen(8001);
console.log("Server running...");
