const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML file
        res.setHeader('Content-Type', 'text/html');
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
    } else if (req.method === 'POST' && req.url === '/handleClick') {
        // Handle the button click
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200);
        res.end('Button was clicked!');
    } else {
        // Handle other requests with a 404 response
        res.writeHead(404);
        res.end('Not Found');
    }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
