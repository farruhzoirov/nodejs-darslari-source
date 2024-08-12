const http = require('http');
const port = 5000;

// Importing routes
const handleForm = require('./routes/form.routes');
const handleUsers = require('./routes/users.routes');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Form</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
                    form { max-width: 400px; margin: 50px auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                    label { display: block; margin-bottom: 5px; font-weight: bold; }
                    input[type="text"] { width: calc(100% - 22px); padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; }
                    button { width: 100%; padding: 10px; background-color: #007bff; color: #fff; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; }
                    button:hover { background-color: #0056b3; }
                </style>
            </head>
            <body>
                <form action="/add-user" method="POST">
                    <label for="firstname">Firstname:</label>
                    <input type="text" id="firstname" name="firstname" required>
                    <label for="lastname">Lastname:</label>
                    <input type="text" id="lastname" name="lastname" required>
                    <button type="submit">Add</button>
                </form>
            </body>
            </html>
        `);
    return res.end();
  }
  if (req.url === '/add-user') {
    return handleForm(req, res);
  }
  if (req.url === '/users') {
    return handleUsers(req, res);
  }
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Not Found');
});


// Server is running here ...
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
