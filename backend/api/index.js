const route = require('express').Router()

route.use('/login', require('./login'))

exports = module.exports = {
    route
}