const {DB_NAME, MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient

const route = require('express').Router()

route.post('/', async (req, res) => {
    // console.log("req = ", req)
    let query = {
        username: req.body.username
    }
    console.log(query)
    const client = await MongoClient.connect(MONGO_URL)
    const db = client.db(DB_NAME)
    const movies = db.collection('movies')
    const arr = await movies.find(query).toArray()
    console.log("arr = ", arr)
    // console.log(arr[0])
    // res.send({msg: 'ok'})
    res.send({data: arr[0]})
})

exports = module.exports = route