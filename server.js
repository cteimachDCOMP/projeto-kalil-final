// codigo fornecido pelo monitor BIKE_DO_ARRASCAETA (usuario no Discord)
const http = require('http');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const server = http.createServer((req, res) => {
  if (req.url === '/intro.html' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'intro.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });

  } else if (req.url === '/index.html' && req.method === 'GET') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else if (req.url === '/csvdata' && req.method === 'GET') {
    const csvFilePath = path.join(__dirname, 'athlete_events.csv');
    const dataArray = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        dataArray.push(row);
      })
      .on('end', () => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(dataArray));
      });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});