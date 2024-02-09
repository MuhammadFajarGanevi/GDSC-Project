const mysql = require('mysql2')
const { Router } = require('express')

const { JWTUtil } = require('../Utility/jwt.js')
const { verifyJWTMiddleware } = require('../Middleware/verifyJWTToken.js')

/**
 * @param {Router} router 
 * @param {mysql.Connection} dbConnection 
 */

function setupOrderHandler (router, dbConnection) {
    const jwtUtil = new JWTUtil()

    // Menambah Order
    router.post('/', async(request, response) => {
        const data = [
            request.body.userId
        ]
        let priceAccumulation = 0

        const sqlCheck = "SELECT c.id AS cart_id,l.name, c.quantity, (l.price * c.quantity) AS total_price FROM cart_table c JOIN laptop_table l ON c.laptop_id = l.id WHERE c.user_id = ?"
        const [rows] = await dbConnection.query(sqlCheck, data[0])

        rows.forEach(row => {
            priceAccumulation += row.total_price;
         })

        response.json({
            result: rows,
            "jumlah_order": rows.length,
            "total harga" : priceAccumulation
        })
    })


    return router
 }

 module.exports = {setupOrderHandler}