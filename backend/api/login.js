const {MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient

const route = require('express').Router()

route.post('/', async (req, res) => {
    let query = req.body
    console.log(query)
    try {
        const db = await MongoClient.connect(MONGO_URL)
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
    } catch (e) {
        console.log(e)
        res.send({msg: "Some error"})
    }
})

exports = module.exports = route