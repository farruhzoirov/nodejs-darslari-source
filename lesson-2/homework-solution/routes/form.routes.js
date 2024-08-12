const {readUsersFromFile, writeUserToFile} = require("../helpers/file-helpers");
const {join} = require("node:path");

const rootDir = require('../util/path');
const usersPath = join(rootDir,'users.json');

const handleForm = (req, res) => {
    const body = [];

    req.on('data', chunk => body.push(chunk));
    req.on('end', async () => {
      const parsedBody = Buffer.concat(body).toString();
      // const [firstName, lastName] = parsedBody.split('&').map(param => param.split('=')[1]);

      // Yoki
      const params = new URLSearchParams(parsedBody);
      const firstName = params.get('firstname');
      const lastName = params.get('lastname');

      try {
        const data = await readUsersFromFile(usersPath);
        const users = JSON.parse(data) || [];
        users.push({
              id: new Date().toString(),
              firstName,
              lastName
            }
        );
        await writeUserToFile(usersPath, JSON.stringify(users, null, 2));
        res.writeHead(302, {'Location': '/users'});
        res.end();
      } catch (err) {
        console.error('Form routes error:', err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
    });
};

module.exports = handleForm;