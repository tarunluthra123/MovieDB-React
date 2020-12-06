const {MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient
const {generateAccessToken, decodeToken} = require('../jwt')

const route = require('express').Router()

route.get("/", (req, res) => {
    const token = req.query.token
    const [status, result] = decodeToken(token)
    if (status == 'error') {
        res.status = 500
        res.send({error:result})
    }
    else {
        res.json(result)
    }
});

route.post('/', async (req, res) => {
    let query = req.body
    try {
        const db = await MongoClient.connect(MONGO_URL)
        const users = db.collection('users')
        const arr = await users.find(query).toArray()
        const token = generateAccessToken(query);
        if (arr.length > 0) {
            res.send({msg: "Valid login",token})
        } else {
            res.send({msg: "incorrect"})
        }
    } catch (e) {
        console.log(e)
        res.send({msg: "Some error"})
    }
})

exports = module.exports = route