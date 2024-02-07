const mysql = require('mysql2')
const { Router } = require('express')

const { HashFunction } = require('../Utility/hash.js')
const { JWTUtil } = require('../Utility/jwt.js')
const { verifyJWTMiddleware } = require('../Middleware/verifyJWTToken.js')

/**
 * @param {Router} router 
 * @param {mysql.Connection} dbConnection 
 */

function setupAuthHandler (router, dbConnection) {
    const hashFunction = new HashFunction()
    const jwtUtil = new JWTUtil()

     // Method Login Account
     router.post ('/login', async (request, response) => {
        try {
            const email = request.body.email
            const password = request.body.password

            const sqlCheckData = `SELECT * FROM users_table WHERE email = ?`
            const [rows] = await dbConnection.query(sqlCheckData, email)

            if (rows.length == 0) {
                response.status(400).json({
                    "status": false,
                    "message": "account not found",
                    "result": null
                })
                return
            }
            if (!(hashFunction.compare(password, rows[0].password))) {
                response.status(400).json({
                    "status": false,
                    "message": "Wrong Password",
                    "result": null
                })
                return
            } 

            const token = jwtUtil.encode({
                email: rows[0].email,
                userID: rows[0].id,
                role: rows[0].role
            })

            response.status(200).json({
                "status": true,
                "message": "Login successfully",
                "result":{ accessToken: token
                }
            })

            
        } catch(error) {
            console.log(error)

            response.status(500).json({
                "status": false,
                "message": "internal server error",
                "result": null
            })
        }
    })

    return router
 }

 module.exports = {setupAuthHandler}