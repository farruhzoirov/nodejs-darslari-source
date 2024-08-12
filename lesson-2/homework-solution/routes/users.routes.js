const {join} = require("node:path");


const {readUsersFromFile} = require("../helpers/file-helpers");

const rootDir = require('../util/path');
const usersPath = join(rootDir, 'users.json');

const handleUsers = async (req, res) => {
    try {
      const data = await readUsersFromFile(usersPath);
      const users = JSON.parse(data) || [];
      const usersTable = users.map((user, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                </tr>
            `).join('');

      const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Users List</title>
                    <style>
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid black; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        a {
                          display:block; 
                          max-width: 200px; 
                          width:100%;
                          padding: 10px; 
                          margin: 20px auto; 
                          background-color: blue; 
                          text-align: center; 
                          text-decoration: none;
                          color: white;
                        }
                    </style>
                </head>
                <body>
                    <table>
                        <thead>
                            <tr>
                                <th>Tartib raqami:</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${usersTable}
                        </tbody>
                    </table>
                    <a href="/">Asosiy sahifaga qaytish</a>
                </body>
                </html>
            `;

      res.setHeader('Content-Type', 'text/html');
      res.write(html);
      res.end();
    } catch (err) {
      console.error('Users routes error:', err);
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
    }
};

module.exports = handleUsers