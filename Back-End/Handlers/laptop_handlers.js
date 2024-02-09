const mysql = require('mysql2')
const { Router } = require('express')

const { JWTUtil } = require('../Utility/jwt.js')
const { verifyJWTMiddleware } = require('../Middleware/verifyJWTToken.js')

/**
 * @param {Router} router 
 * @param {mysql.Connection} dbConnection 
 */

function setupLaptopHandler (router, dbConnection) {
    const jwtUtil = new JWTUtil()

    // Mengambil data Laptop

    router.get('/', async(request, response) => {
        try {
            const data = [
                request.body.id,
                request.body.string
            ]
            let value = []
            let sql

            if (data[0]) { 
                sql = "SELECT * FROM laptop_table WHERE id = ?"
                value.push(data[0])
            } else if (data[1]) {
                sql = "SELECT * FROM laptop_table WHERE name LIKE ?"
                value.push(`%${data[1]}%`)
            } else {
                response.status(400).json({
                    "status": false,
                    "message": "No request",
                    "result": null
                })
                return 
            }

            const [row] = await dbConnection.query(sql, value)
            
            if (row.length > 0 ) {
                response.json({
                    "status": "true",
                    "message": "Data retrieved successfully",
                    "Result" : {
                        "Laptop": row,
                    },
                    "amount of data" : row.length
                })
            } else {
                response.status(400).json({
                    "status": false,
                    "message": "Data not founded",
                    "result": null
                })
            }

        } catch (error) {
            response.status(500).json({
                "status": false,
                "message": "Internal server error",
                "result": error
            })
        }
    })

    router.put('/', verifyJWTMiddleware(jwtUtil), async(request, response) => {
        const getId = request.user.userID
        
        const sqlGetData = "SELECT * FROM users_table WHERE id = ?"
        const [rows] = await dbConnection.query(sqlGetData, getId)

        const dataRole = rows[0].role 

        if ( dataRole != "admin") {
            response.status(403).json({
                "status": false,
                "message": "doesnt have access",
                "result": null
            })
            return
        }

        try {
            const data = [
                request.body.id,
                request.body.quantity
            ]
            const sqlCheck = "SELECT * FROM laptop_table WHERE id = ?"
            const [rows] = await dbConnection.query(sqlCheck, data[0])

            if (rows.length > 0) {
                const sql = "UPDATE laptop_table SET quantity = ? WHERE id = ?"
                const value = [data[1], data[0]]
                const [row] = await dbConnection.query(sql, value)
                
                response.json({
                    "status": true,
                    "message": "Laptop stock has been successfully updated"
                })

            } else {
                response.status(400).json({
                    "status": false,
                    "message": "Data not found"
                })
            }

            
        } catch (error) {
            // console.log(error)
            response.status(500).json({
                "status": false,
                "message": "Internal server error",
                "result": error
            })
        }
    })

    return router
 }

 module.exports = {setupLaptopHandler}