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

            const sqlCheck = "SELECT id, laptop_id  FROM cart_table WHERE user_id = ? AND cart_status = 'pending'"
            const [result] = await dbConnection.query(sqlCheck, data[0])
            let joinedResult
            let idArray = []
            let laptop_idArray = []

            if (result.length > 0) {
                result.forEach(row => {
                    idArray.push(row.id),
                    laptop_idArray.push(row.laptop_id)
                });
                
                const sqlUpdateLaptop ="UPDATE laptop_table l INNER JOIN cart_table c ON l.id = c.laptop_id SET l.quantity = CASE WHEN (l.quantity - c.quantity) < 0 THEN l.quantity ELSE (l.quantity - c.quantity) END WHERE c.laptop_id IN (?) AND l.quantity >= c.quantity";
                
               // Mulai transaksi
                await dbConnection.beginTransaction();

                const resultUpdateLaptop = await dbConnection.query(sqlUpdateLaptop, [laptop_idArray]);

                 const affectedRows = resultUpdateLaptop[0].affectedRows;

                 if (affectedRows === laptop_idArray.length) {
                    await dbConnection.commit();

                } else {
                     await dbConnection.rollback();
                     response.status(400).json({
                        "status": false,
                        "message": "Product out of stock"
                    });
                    return
                }
                
                const sqlUpdateCart = "UPDATE cart_table SET cart_status ='ongoing' WHERE user_id = ? AND cart_status = 'pending'"
                const resultUpdateCart = await dbConnection.query(sqlUpdateCart, data[0])
                
                joinedResultCartId = idArray.join(',')
                joinedResultLaptopId = laptop_idArray.join(',')

                 const order_status = "ongoing"
                 const sqlInsert = "INSERT INTO orders_table (user_id, cart_id, order_status, laptop_id) VALUES (?,?,?,?)"
                 const values = [data[0],  joinedResultCartId, order_status, joinedResultLaptopId ]
                 const resultInsert = await dbConnection.query(sqlInsert, values)

                 response.json({
                    "status": true,
                    "message": "Data retrieved successfully",
                    "message2": "Data update successfully",
                    "message3": "Data insert successfully",
                    "message": "All products successfully purchased",
                    "result" : {
                        "resultCart": joinedResultCartId,
                        "resultLaptop": joinedResultLaptopId
                    },
                    "ammount of data": result.length
                })

            }else{
                response.status(400).json({
                    "status": false,
                    "message": "Data not found",
                    "result": null
                })
            }

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
        try {
            const sqlGetId = "SELECT cart_id, laptop_id FROM orders_table WHERE user_id = ?"
            const [resultGetId] = await dbConnection.query(sqlGetId, data[0])
            
            let dataCartId = []
            dataCartId.push( resultGetId[0].cart_id.split(','))
            let dataLaptopId = []
            dataLaptopId.push( resultGetId[0].laptop_id.split(','))


            const sql = "SELECT c.id AS cart_id, c.laptop_id, l.name, c.quantity, (l.price * c.quantity) AS total_price, c.cart_status FROM cart_table c JOIN laptop_table l ON c.laptop_id = l.id WHERE c.user_id = ? AND c.id IN (?)"
            const [rows] = await dbConnection.query(sql, [data[0], dataCartId])

            response.json({
                "status": true,
                "message": "Data retrieved successfully",
                "resultCart": rows,
                // "resultLaptop": dataLaptopId
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

    return router
 }

 module.exports = {setupOrderHandler}