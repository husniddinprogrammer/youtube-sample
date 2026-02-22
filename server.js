const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

// Enable CORS headers
const enableCORS = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

// Read JSON data file
const getData = () => {
  const filePath = path.join(__dirname, 'db.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
};

// Create server
const server = http.createServer((req, res) => {
  // Enable CORS for all responses
  enableCORS(res);

  // Handle different routes
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/data' && req.method === 'GET') {
    try {
      const data = getData();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error('Error reading data file:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  } else {
    // Handle 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`JSON server running on http://localhost:${PORT}`);
  console.log('API endpoint: http://localhost:${PORT}/api/data');
});
