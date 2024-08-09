// http, https, path, fs - file system, os - operation system
//
// request  - murojaat
// response - javob

const http = require('http');
const {writeFileSync} = require('node:fs');
const server = http.createServer((req, res) => {

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head>')
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Yuborish</button></form></body>')
    res.write('</head>')
    res.write('</html>')
    return res.end()
  }
  // if (req.url === '/message' && req.method === 'POST') {
  //   // 302 - Redirect
  //   console.log('Requested...')
  //   res.statusCode = 302;
  //   res.setHeader('Location', '/');
  //   return res.end();
  // }

  if (req.url === '/message' && req.method === 'POST') {
    const body = []

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split('=')[1]
      writeFileSync('message.txt', message, 'utf-8');
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    })
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>')
  res.write('<head>')
  res.write('<body><h1>Node.jsdan salom</h1></body>')
  res.write('</head>')
  res.write('</html>')
  return res.end()
})


server.listen(5000);


