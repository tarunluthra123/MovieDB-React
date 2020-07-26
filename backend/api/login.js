const {DB_NAME, MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient

const route = require('express').Router()

route.post('/', async (req, res) => {
    let query = req.body
    console.log(query)
    const client = await MongoClient.connect(MONGO_URL)
    const db = client.db(DB_NAME)
    const users = db.collection('users')
    const arr = await users.find(query).toArray()
    console.log("arr = ", arr)
    if (arr.length > 0) {
        console.log("valid")
        res.send({msg: "Valid login"})
    } else {
        console.log("no")
        res.send({msg: "incorrect"})
    }
})

exports = module.exports = route