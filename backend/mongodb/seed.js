const {DB_NAME, MONGO_URL} = require('../mongodb/connection')
const MongoClient = require('mongodb').MongoClient

let write = async () => {
    const client = await MongoClient.connect(MONGO_URL)
    const db = client.db(DB_NAME)
    console.log(db)

    const users = db.collection('users')
    const res = await users.insertMany([
        {name: 'tarun', password: 'abc'},
        {name: 'doctor', password: 'tardis'}
    ])

    console.log(res)
}

let readUser = async () => {
    const client = await MongoClient.connect(MONGO_URL)
    const db = client.db(DB_NAME)
    console.log(db)

    const users = db.collection('users')
    const arr = await users.find({name: 'tarun'}).toArray()

    console.log(arr)
}

// write().then(readUser)
readUser()