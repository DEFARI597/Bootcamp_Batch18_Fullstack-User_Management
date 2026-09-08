const http = require('http');
const fs = require('fs');
const path = require('path');

const serveFile = (res, filePath, statusCode = 200) => {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 Internal Server Error");
            return;
        }
        res.writeHead(statusCode, { "Content-Type": "text/html" });
        res.end(data);
    });
};

const server = http.createServer((req, res) => {
    const url = new URL(
        req.url,
        `http://${req.headers.host}`
    );
    console.log("Requested Path:", url.pathname);

    if (url.pathname === '/') {
        serveFile(res, 'pages/homepage.html');
    } else if (url.pathname === '/homepage') {
        serveFile(res, 'pages/homepage.html');
    } else if (url.pathname === '/users') {
        serveFile(res, 'pages/users.html');
    } else if (url.pathname === '/about') {
        serveFile(res, 'pages/about.html');
    } else if (url.pathname === '/contact') {
        serveFile(res, 'pages/contact.html');
    } else {
        serveFile(res, 'pages/404.html', 404);
    }
});

server.listen(3000)
console.log("server sudah berjalan")