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
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    // store users choice
    const userPick = params['pokemon'];
    
    // have cpu random pick
    const pokemon = ['picaku','geodude','squirtle'];
    const randomPick = pokemon[Math.floor(Math.random()*3)];

    let message = '';
    
    // r, p, s logic
    // squirtle beats geodude
    // geodude beats picaku
    // picaku beats squirtle
    if (userPick === 'picaku' && randomPick === 'squirtle') {
        message = `You choose ${userPick}, CPU choose ${randomPick}. You Win!`;
    } else if (userPick === 'squirtle' && randomPick === 'geodude') {
        message = `You choose ${userPick}, CPU choose ${randomPick}. You Win!`;
    } else if (userPick === 'geodude' && randomPick === 'picaku') {
        message = `You choose ${userPick}, CPU choose ${randomPick}. You Win!`;
    } else {
        message = `You choose ${userPick}, CPU choose ${randomPick}. You Lost!`;
    }

    // set resuklt to winner or loser
    res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          message: message,
        }
    res.end(JSON.stringify(objToJson));
    
    
    if('student' in params){
      if(params['student']== 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "leon",
          status: "Boss Man",
          currentOccupation: "Baller"
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else if(params['student'] != 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
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
