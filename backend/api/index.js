const route = require('express').Router()

route.use('/login', require('./login'))
route.use('/signup', require('./signup'))
route.use('/mymovies', require('./mymovies'))
route.use('/watchlist',require('./watchlist'))

exports = module.exports = {
    route
}