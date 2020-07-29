const MongoClient = require('mongodb').MongoClient
const MONGO_URL = "mongodb://heroku_xcg2sjz3:tamir6i4l79qmb3og1fphg3h4q@ds227565.mlab.com:27565/heroku_xcg2sjz3"

MongoClient.connect(MONGO_URL, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', MONGO_URL);

        // do some work here with the database.

        //Close connection
        db.close();
    }
})


