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

            const sqlCheck = "SELECT id, laptop_id, quantity  FROM cart_table WHERE user_id = ? AND status = 'pending'"
            const [result] = await dbConnection.query(sqlCheck, data[0])
            let joinedResult
            let idArray = []
            let laptop_idArray = []
            let quantityArray = []

            if (result.length > 0) {
                result.forEach(row => {
                    idArray.push(row.id),
                    laptop_idArray.push(row.laptop_id)
                    quantityArray.push(row.quantity)
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
                
                const sqlGetTotalPrice = "SELECT (l.price * c.quantity) AS price FROM cart_table c JOIN laptop_table l ON c.laptop_id = l.id WHERE c.user_id = ? AND c.status = 'pending'"
                const [resultGetTotalPrice] = await dbConnection.query(sqlGetTotalPrice,data[0] )
                let priceAccumulation = 0

                resultGetTotalPrice.forEach(row2 => {
                    priceAccumulation += row2.price
                })
                
                const sqlUpdateCart = "UPDATE cart_table SET status ='ongoing' WHERE user_id = ? AND status = 'pending'"
                const resultUpdateCart = await dbConnection.query(sqlUpdateCart, data[0])
                
                joinedResultCartId = idArray.join(',')
                joinedResultLaptopId = laptop_idArray.join(',')
                joinedResultQuantity  = quantityArray.join(',')
                
                 const order_status = "ongoing"
                 const sqlInsert = "INSERT INTO orders_table (user_id, cart_id, order_status, laptop_id, quantity, total_price) VALUES (?,?,?,?,?, ?)"
                 const values = [data[0],  joinedResultCartId, order_status, joinedResultLaptopId, joinedResultQuantity, priceAccumulation ]
                 const resultInsert = await dbConnection.query(sqlInsert, values)

                 response.json({
                    "status": true,
                    "message": "Data retrieved successfully",
                    "message2": "Data update successfully",
                    "message3": "Data insert successfully",
                    "message": "All products successfully purchased",
                    "result" : {
                        "resultCart": joinedResultCartId,
                        "resultLaptop": joinedResultLaptopId,
                        "quantityPerLaptop": joinedResultQuantity
                    },
                    "ammount of data": result.length,
                    "totalPrice": priceAccumulation
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
    router.get('/', async (request, response) => {
        const userId = request.body.userId; // Mendapatkan user_id dari permintaan
        const orderId = request.body.orderId
    
        try {
            const sqlGetId = "SELECT cart_id, laptop_id, quantity, total_price FROM orders_table WHERE user_id = ? AND id = ?";
            const value1 = [userId, orderId]
            const [resultGetId] = await dbConnection.query(sqlGetId, value1);
        
            // Memisahkan string menjadi array dan mengonversi elemen menjadi tipe numerik
            const dataCartId = resultGetId[0].cart_id.split(',').map(Number);
            const dataLaptopId = resultGetId[0].laptop_id.split(',').map(Number);
            const dataQuantity = resultGetId[0].quantity.split(',').map(Number);
        
            // Membuat array kosong untuk menampung data laptop
            const laptopData = [];
            const totalPrice = resultGetId[0].total_price 

        
            // Loop melalui setiap elemen dalam dataLaptopId dan dataQuantity
            for (let i = 0; i < dataLaptopId.length; i++) {
                // Mengambil laptop_id dan quantity saat ini
                const laptopId = dataLaptopId[i];
                const quantity = dataQuantity[i];
        
                // Mengambil data nama laptop dan harga dari tabel laptop_table berdasarkan laptop_id
                const sqlGetData = "SELECT name, price FROM laptop_table WHERE id = ?";
                const [laptopResult] = await dbConnection.query(sqlGetData, laptopId);
        
                // Jika data laptop ditemukan, tambahkan ke array laptopData
                if (laptopResult.length > 0) {
                    const laptopName = laptopResult[0].name;
                    const price = laptopResult[0].price;
                    const totalPricePerItem = quantity * price; // Hitung total harga per item
        
                    laptopData.push({ laptopId, laptopName, quantity, price, totalPricePerItem });
                }
            }
        
            response.json({
                "status": true,
                "message": "Data retrieved successfully",
                "resultCart": dataCartId,
                "resultLaptop": dataLaptopId,
                "resultQuantity": dataQuantity,
                "laptop": {
                    laptopData},                 // Menambahkan data laptop ke respons
                "priceAccumulation": totalPrice
            });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                "status": false,
                "message": "Internal server error",
                "result": error
            });
        }
        
        
    });
    

    return router
 }

 module.exports = {setupOrderHandler}