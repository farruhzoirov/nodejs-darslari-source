const fs = require('fs');

const readUsersFromFile = (filePath, encoding = 'utf-8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding }, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const writeUserToFile = (filePath, data, encoding = 'utf-8') => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, { encoding }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

module.exports = { readUsersFromFile, writeUserToFile };
