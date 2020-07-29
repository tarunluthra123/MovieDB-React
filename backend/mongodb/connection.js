const MongoClient = require('mongodb').MongoClient
const MONGO_URL = "mongodb://heroku_xcg2sjz3:tamir6i4l79qmb3og1fphg3h4q@ds227565.mlab.com:27565/"
const DB_NAME = 'heroku_xcg2sjz3'


// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     // console.log(db)
//     db.close()
// })

exports = module.exports = {
    MONGO_URL, DB_NAME
}