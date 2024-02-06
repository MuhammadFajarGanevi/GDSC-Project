const mysql = require('mysql2/promise')


async function setupConnection(){
    try {
        const connection = await mysql.createConnection(
            'mysql://root@localhost:3306/laptop_store'
        )
        console.log("Connection Success")
        return connection
    } catch (error){
        console.log(error)
        return null
    }
}

module.exports = {setupConnection}