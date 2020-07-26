const route = require('express').Router()

route.use('/login', require('./login'))
route.use('/signup', require('./signup'))
route.use('/mymovies', require('./mymovies'))

exports = module.exports = {
    route
}