const http = require('http');

// const routes = require('./routes');


const server = http.createServer((req, res) => {
  console.log(req.url);
  process.exit();
})


server.listen(5000);


