const {MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient
const {verifyToken} = require('../jwt')

const route = require('express').Router()


route.post('/', async (req, res) => {
    let query = {
        username: req.body.username
    }
    const tokenVerified = verifyToken(req.body.token)
    if (!tokenVerified) {
        res.send({error:"Invalid auth token"})
    }
    try {
        const db = await MongoClient.connect(MONGO_URL)
        const movies = db.collection('movies')
        const arr = await movies.find(query).toArray()
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