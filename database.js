var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            email TEXT NOT NULL,
            dateOfBirth TEXT NOT NULL,
            gender TEXT NOT NULL,
            age INTEGER NOT NULL,
            cardHolderName TEXT NOT NULL,
            cardNumber INTEGER NOT NULL,
            expiryDate TEXT NOT NULL,
            cvv INTEGER NOT NULL,
            timeStamp TEXT NOT NULL
        )`, (err) => {
            if (err) {
                // Table already created
            }
        })
    }
})
module.exports = db