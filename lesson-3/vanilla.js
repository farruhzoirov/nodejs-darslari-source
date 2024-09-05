const http = require('http');
const port = 5000;

const server = http.createServer((req, res) => {

})
// Server is running here ...
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
