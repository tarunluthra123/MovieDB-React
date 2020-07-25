const url = require('./connection').url
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(url, function (err, db) {
    if (err)
        throw err
    console.log(db)
    db.createCollection('users', (err, res) => {
        if (err) throw err
        console.log('Collection users created')
    })
    db.close()
})


exports = module.exports = {
    url
}

