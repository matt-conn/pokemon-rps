const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
	const page = url.parse(req.url).pathname;
	const params = querystring.parse(url.parse(req.url).query);
	
	console.log(page);
	
	if (page == '/') {
		fs.readFile('index.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
		});
	}
	else if (page == '/api') {
		// store user's throw
		const userThrow = params['pokemon'];
		
		// randomly select computer's throw
		const pokemon = ['pikachu','geodude','squirtle'];
		const cpuThrow = pokemon[Math.floor(Math.random() * 3)];
		
		// squirtle beats geodude, geodude beats pikachu, picaku beats squirtle
		let throws = `You choose ${userThrow[0].toUpperCase() + userThrow.slice(1)}. CPU chooses ${cpuThrow[0].toUpperCase() + cpuThrow.slice(1)}.`;

		// game logic
		const winOrLose = () => {
			if (userThrow === cpuThrow) {
				return `It's a draw! Select your next Pokemon.`
			} else if ((userThrow === `pikachu` && cpuThrow === `squirtle`) || (userThrow === `squirtle` && cpuThrow === `geodude`) || (userThrow === `geodude` && cpuThrow === `pikachu`)) {
				return `You won! Try your luck again. :)`
			} else {
				return `You lost. Try again!`
			}
		};

		// send response
		res.writeHead(200, {'Content-Type': 'application/json'});
			const objToJson = {
				throwMessage: throws,
				winOrLoseMessage: winOrLose()
			}
		res.end(JSON.stringify(objToJson));
	}
	else if (page == '/css/style.css'){
		fs.readFile('css/style.css', function(err, data) {
			res.write(data);
			res.end();
		});
	}
	else if (page == '/js/main.js'){
		fs.readFile('js/main.js', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			res.write(data);
			res.end();
		});
	}
	else{
		figlet('404!!', function(err, data) {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		res.write(data);
		res.end();
		});
	}
	});

server.listen(8000);
