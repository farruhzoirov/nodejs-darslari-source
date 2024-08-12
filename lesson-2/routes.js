const fs = require('fs');

const requestHandler = (req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Yuborish</button></form></body>')
    res.write('</head>')
    res.write('</html>')
    return res.end()
  }


  if (req.url === '/message' && req.method === 'POST') {
    const body = []

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split('=')[1]
      // writeFileSync('message.txt', message, 'utf-8');  /// Sync and Async
      fs.writeFile('message.txt', message, 'utf-8', (err) => {
        if (err) {
          res.statusCode = 500;
          return res.end()
        }
        // res.statusCode = 302;
        // res.setHeader('Location', '/');
        res.writeHead(302, 'Location', '/')
        return res.end();
      })
    })
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>')
  res.write('<head>')
  res.write('<body><h1>Node.jsdan salom</h1></body>')
  res.write('</head>')
  res.write('</html>')
  return res.end()
};

module.exports =  requestHandler
//
module.exports = {
  handler: requestHandler,
  someText: 'Nodejs is running here'
};

module.exports.handler = requestHandler;
module.exports.someText = 'Nodejs is running here'

exports.handler = requestHandler;
exports.someText = 'Nodejs is running here'