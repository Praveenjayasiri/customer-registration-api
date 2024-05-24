const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const db = require('./database');

const hostname = '127.0.0.1';
const port = 8080;

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateCreditCard = (cardNumber) => {
    const re = /^\d{12}$/;
    return re.test(cardNumber);
};

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/register') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);

            // Validation
            if (!validateEmail(data.email)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid email address' }));
                return;
            }

            if (!validateCreditCard(data.cardNumber)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid credit card number' }));
                return;
            }

            db.run(`INSERT INTO customer (
                name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                data.name, data.address, data.email, data.dateOfBirth, data.gender, data.age,
                data.cardHolderName, data.cardNumber, data.expiryDate, data.cvv, data.timeStamp
            ], function(err) {
                if (err) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                    return;
                }

                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: `Customer ${data.name} has registered`, customerId: this.lastID }));
            });
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server runs at http://${hostname}:${port}/`);
});
