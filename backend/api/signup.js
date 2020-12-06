const {MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient
const { generateAccessToken } = require('../jwt')

const route = require('express').Router()

route.post('/', async (req, res) => {
    let query = {username: req.body.username}
    try {
        const db = await MongoClient.connect(MONGO_URL)
        const users = db.collection('users')
        const arr = await users.find(query).toArray()
        if (arr.length > 0) {
            res.send({msg: "Username already taken"})
        } else {
            const result = await users.insertOne(req.body)
            const token = generateAccessToken(req.body);
            res.send({msg: "Success",token,result})
        }
    } catch (e) {
        res.send({msg: "Some error"})
    }
})

exports = module.exports = route