// const MongoClient = require('mongodb').MongoClient
const MONGO_URL = process.env.MONGO_URL

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     // console.log(db)
//     db.close()
// })

exports = module.exports = {
    MONGO_URL
}