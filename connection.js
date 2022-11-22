const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "johnsonayu",
    database: "crud_nodejsayu"
})

module.exports = client