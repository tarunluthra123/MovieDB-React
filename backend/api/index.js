const route = require('express').Router()

route.use('/login', require('./login'))
route.use('/signup', require('./signup'))
route.use('/mymovies', require('./mymovies'))
route.use('/watchlist',require('./watchlist'))
route.use('/updateList',require('./updatelists'))

exports = module.exports = {
    route
}