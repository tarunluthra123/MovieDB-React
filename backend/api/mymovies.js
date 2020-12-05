const {MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient

const route = require('express').Router()

route.post('/', async (req, res) => {
    let query = {
        username: req.body.username
    }
    try {
        const db = await MongoClient.connect(MONGO_URL)
        const movies = db.collection('movies')
        const arr = await movies.find(query).toArray()
        console.log("arr = ", arr)
        // console.log(arr[0])
        // res.send({msg: 'ok'})
        if (arr.length >= 1) {
            res.send({data: arr[0]})
        } else {
            const temp = [{movies: []}]
            res.send({data: temp})
        }
    } catch (e) {
        console.log(e)
        res.send({msg: "Some error"})
    }
})

exports = module.exports = route