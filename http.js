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

const httpHandler = (req, res, next) => {
    if (req.path.startsWith('/add-users') || req.path.startsWith('/users')) {
        return next();
    }

    const pathname = req.path;
    console.log("Static Requested Path:", pathname);

    if (pathname === '/' || pathname === '/homepage') {
        serveFile(res, 'views/homepage.html');
    } else if (pathname === '/about') {
        serveFile(res, 'views/about.html');
    } else if (pathname === '/contact') {
        serveFile(res, 'views/contact.html');
    } else {
        next();
    }
};

module.exports = httpHandler;