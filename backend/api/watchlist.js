const {MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient
const { verifyToken } = require('../jwt')

const route = require('express').Router()

route.post('/', async (req, res) => {
    let query = {
        username: req.body.username
    }
    const tokenVerified = verifyToken(req.body.token)
    if (!tokenVerified) {
        res.send({error:"Invalid auth token"})
    }
    const db = await MongoClient.connect(MONGO_URL)
    const watchlist = db.collection('watchlist')
    const arr = await watchlist.find(query).toArray()
    if (arr.length >= 1) {
        res.send({data: arr[0]})
    } else {
        const temp = [{watch: []}]
        res.send({data: temp})
    }
})

exports = module.exports = route