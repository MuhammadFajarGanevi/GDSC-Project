const mysql = require('mysql2')
const { Router, response } = require('express')

const { JWTUtil } = require('../Utility/jwt.js')
const { requestTime } = require('../Utility/cekTime.js')
const { verifyJWTMiddleware } = require('../Middleware/verifyJWTToken.js')

/**
 * @param {Router} router 
 * @param {mysql.Connection} dbConnection 
 */

function setupOrderHandler (router, dbConnection) {
    const jwtUtil = new JWTUtil()

    // Menambah Order
    router.post('/', async(request, response) => {
        
        try {
            const data = [
                request.body.userId
            ]

            const sqlCheck = "SELECT id FROM cart_table WHERE user_id = ? AND cart_status = 'pending'"
            const [result] = await dbConnection.query(sqlCheck, data[0])
            let joinedResult
            let idArray = []

            if (result.length > 0) {

                result.forEach(row => {
                    idArray.push(row.id)
                });
                 joinedResult = idArray.join(',')

                 const sqlUpdate = "UPDATE cart_table SET cart_status ='ongoing' WHERE user_id = ? AND cart_status = 'pending'"
                 const resultUpdate = await dbConnection.query(sqlUpdate, data[0])

                 
                 const order_status = "ongoing"
                 const sqlInsert = "INSERT INTO orders_table (user_id, cart_id, order_status) VALUES (?,?,?)"
                 const values = [data[0],  joinedResult, order_status]
                 const resultInsert = await dbConnection.query(sqlInsert, values)

            }else{
                response.status(400).json({
                    "status": false,
                    "message": "Data not found",
                    "result": null
                })
            }

            response.json({
                "status": true,
                "message": "Data retrieved successfully",
                "message2": "Data update successfully",
                "message3": "Data insert successfully",
                "result" : {
                    joinedResult
                },
                "ammount of data": result.length
            })
            
        } catch (error) {
            console.log(error)
            response.status(500).json({
                "status": false,
                "message": "Internal server error",
                "result": error
            })
        }
    
    })

    // Melihat Order
    router.get('/', async(request, response) => {
        const data = [
            request.body.userId
        ]
    })

    return router
 }

 module.exports = {setupOrderHandler}