const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9999;
const DIST = path.join(__dirname, 'dist');

http.createServer((req, res) => {
  const decodedUrl = decodeURIComponent(req.url);
  const filePath = path.join(DIST, decodedUrl);
  try {
    if (fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const types = { '.js': 'application/javascript', '.css': 'text/css', '.html': 'text/html', '.png': 'image/png' };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*' });
      res.end(fs.readFileSync(filePath));
    } else {
      res.writeHead(404); res.end();
    }
  } catch {
    res.writeHead(404); res.end();
  }
}).listen(PORT, () => console.log('Dev file server running on http://localhost:' + PORT));
