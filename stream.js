const path = require('path');
const fs = require('fs');
const filePath = path.resolve(__dirname, 'data.json');
function readQuotes() {
  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(filePath, { encoding: 'utf8' });
    let data = '';
    rs.on('data', (chunk) => {
      data += chunk;
    });
    rs.on('end', () => {
      try {
        const quotes = data.toString() ? JSON.parse(data) : [];
        resolve(quotes);
      } catch (err) {
        reject(err);
      }
    });
    rs.on('error', (err) => {
      reject(err);
    });
  });
}
function writeQuotes(data) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);
    ws.write(JSON.stringify(data));
    ws.end();
    ws.on('finish', () => {
      console.log('Data written to file.');
      resolve();
    });

    ws.on('error', (err) => {
      console.error(`An error occurred while writing to the file: ${err}`);
      reject();
    });
  });
}
module.exports = {
  readQuotes,
  writeQuotes,
};
