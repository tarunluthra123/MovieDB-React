const {DB_NAME, MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient

const route = require('express').Router()

route.post('/', async (req, res) => {
    let query = {username: req.body.username}
    console.log(query)
    const client = await MongoClient.connect(MONGO_URL)
    const db = client.db(DB_NAME)
    const users = db.collection('users')
    const arr = await users.find(query).toArray()
    console.log(arr)
    if (arr.length > 0) {
        res.send({msg:"Username already taken"})
    } else {
        const result = await users.insertOne(req.body)
        console.log(result)
        res.send({msg:"Success"})
    }
})

exports = module.exports = route