const {MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient

const route = require('express').Router()

route.post('/', async (req, res) => {
    // console.log("req = ", req)
    let query = {
        username: req.body.username
    }
    console.log({ query })
    const db = await MongoClient.connect(MONGO_URL)
    const watchlist = db.collection('watchlist')
    const arr = await watchlist.find(query).toArray()
    console.log("arr = ", arr)
    if (arr.length >= 1) {
        res.send({data: arr[0]})
    } else {
        const temp = [{watch: []}]
        res.send({data: temp})
    }
})

exports = module.exports = route