const MongoClient = require('mongodb').MongoClient
const MONGO_URL = "mongodb://localhost:27017/"
const DB_NAME = 'movie_project_db'


// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     // console.log(db)
//     db.close()
// })

exports = module.exports = {
    MONGO_URL,DB_NAME
}