const {DB_NAME, MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient

const route = require('express').Router()

async function addToMyMovies(username, movieId) {
    const db = await MongoClient.connect(MONGO_URL + DB_NAME)
    const movies = db.collection('movies')
    let res = await movies.updateOne(
        {username: username},
        {$addToSet: {movieNames: movieId}}
    )
    // console.log(res)
    return res
}

async function addToWatchlist(username, movieId) {

    const db = await MongoClient.connect(MONGO_URL + DB_NAME)
    const movies = db.collection('watchlist')
    let res = await movies.updateOne(
        {username: username},
        {$addToSet: {watch: movieId}}
    )
    // console.log(res)
    return res
}

async function removeFromMyMovies(username, movieId) {
    const db = await MongoClient.connect(MONGO_URL + DB_NAME)
    const movies = db.collection('movies')
    let res = await movies.updateOne(
        {username: username},
        {$pull: {movieNames: {$in: [movieId]}}}
    )
    // console.log(res)
    return res
}

async function removeFromWatchlist(username, movieId) {
    const db = await MongoClient.connect(MONGO_URL + DB_NAME)
    const movies = db.collection('watchlist')
    let res = await movies.updateOne(
        {username: username},
        {$pull: {watch: {$in: [movieId]}}}
    )
    // console.log(res)
    return res
}

route.post('/', async (req, res) => {
    const {username, movieId, removeFromList, addToList} = req.body
    let removeRes, addRes;
    try {
        if (removeFromList === 'mymovies') {
            removeRes = await removeFromMyMovies(username, movieId)
        } else if (removeFromList === 'watchlist') {
            removeRes = await removeFromWatchlist(username, movieId)
        }

        if (addToList === 'mymovies') {
            addRes = await addToMyMovies(username, movieId)
        } else if (addToList === 'watchlist') {
            addRes = await addToWatchlist(username, movieId)
        }
    } catch (err) {
        console.log(err)
    }

    res.send({
        removeRes: removeRes,
        addRes: addRes
    })
})

exports = module.exports = route