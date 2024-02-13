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
    router.post('/', verifyJWTMiddleware(jwtUtil),async(request, response) => {
        
        const getId = request.user.userID

        try {
            const data = [
                request.body.userId
            ]
            if (!(data[0] == getId)) {
                response.status(403).json({
                    "status": false,
                    "message": "doesnt have access",
                    "result": null
                })
                return
            }

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

     
                
                // Mulai transaksi
                await dbConnection.beginTransaction();
                const sqlUpdateLaptop ="UPDATE laptop_table l INNER JOIN cart_table c ON l.id = c.laptop_id SET l.quantity = CASE WHEN (l.quantity - c.quantity) < 0 THEN l.quantity ELSE (l.quantity - c.quantity) END WHERE c.laptop_id IN (?) AND l.quantity >= c.quantity";

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
                
                const sqlUpdateCart = "UPDATE cart_table SET status = 'finished' WHERE user_id = ? AND status = 'pending'"
                const resultUpdateCart = await dbConnection.query(sqlUpdateCart, data[0])
                
                joinedResultCartId = idArray.join(',')
                joinedResultLaptopId = laptop_idArray.join(',')
                joinedResultQuantity  = quantityArray.join(',')
                
                 const order_status = "ongoing"
                 const sqlInsert = "INSERT INTO orders_table (user_id, cart_id, status, laptop_id, quantity, total_price) VALUES (?,?,?,?,?, ?)"
                 const values = [data[0],  joinedResultCartId, order_status, joinedResultLaptopId, joinedResultQuantity, priceAccumulation ]
                 const resultInsert = await dbConnection.query(sqlInsert, values)

                 response.json({
                    "status": true,
                    "message": "Data retrieved successfully",
                    "message2": "Data update successfully",
                    "message3": "Data insert successfully",
                    "message": "All products successfully purchased",
                    "result" : {
                        "id" : resultInsert[0].id,
                        "resultCart": joinedResultCartId,
                        "resultLaptop": joinedResultLaptopId,
                        "quantityPerLaptop": joinedResultQuantity
                    },
                    "ammountOfData": result.length,
                    "totalPrice": priceAccumulation
                })

            }
            else{
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
    router.get('/', verifyJWTMiddleware(jwtUtil), async (request, response) => {
        const userId = request.body.userId; // Mendapatkan user_id dari permintaan
        const userGetId = request.user.userID; // Mendapatkan user_id dari permintaan

        if (!(userId == userGetId)) {
            response.status(403).json({
                "status":false,
                "message": "doesnt have access"
            })
            return
        }
    
        try {
            const sqlGetId = "SELECT id, cart_id, laptop_id, quantity, total_price, DATE_FORMAT(order_date, '%Y-%M-%D') AS order_date, status FROM orders_table WHERE user_id = ?";
            const [resultGetId] = await dbConnection.query(sqlGetId, userId);
            
            // Objek untuk menyimpan hasil yang telah dipisahkan berdasarkan ID
            const ordersData = {};
    
            // Loop melalui setiap baris hasil
            for (const row of resultGetId) {
                // Memeriksa apakah ID sudah ada di objek ordersData, jika tidak, tambahkan sebagai kunci baru dengan nilai array kosong
                if (!ordersData[row.id]) {
                    ordersData[row.id] = [];
                }
    
                // Memisahkan string menjadi array dan mengonversi elemen menjadi tipe numerik
                const dataCartId = row.cart_id.split(',').map(Number);
                const dataLaptopId = row.laptop_id.split(',').map(Number);
                const dataQuantity = row.quantity.split(',').map(Number);
                const dataOrder_date = row.order_date;
                const dataStatus = row.status;
    
                // Loop melalui setiap elemen dalam dataLaptopId dan dataQuantity
                for (let i = 0; i < dataLaptopId.length; i++) {
                    // Mengambil laptop_id dan quantity saat ini
                    const laptopId = dataLaptopId[i];
                    const quantity = dataQuantity[i];
                    const cartId = dataCartId[i];
    
                    // Mengambil data nama laptop dan harga dari tabel laptop_table berdasarkan laptop_id
                    const sqlGetData = "SELECT name, price, image AS picture FROM laptop_table WHERE id = ?";
                    const [laptopResult] = await dbConnection.query(sqlGetData, laptopId);
    
                    // Jika data laptop ditemukan, tambahkan ke array ordersData sesuai dengan ID-nya
                    if (laptopResult.length > 0) {
                        const laptopName = laptopResult[0].name;
                        const price = laptopResult[0].price;
                        const picture = laptopResult[0].picture;
                        const totalPricePerItem = quantity * price; // Hitung total harga per item
    
                        // Tambahkan data ke dalam objek ordersData
                        ordersData[row.id].push({
                            cartId, picture, laptopId, laptopName, quantity, price, totalPricePerItem, dataOrder_date, dataStatus
                        });
                    }
                }
            }
    
            response.json({
                "status": true,
                "message": "Data retrieved successfully",
                "orders": ordersData,
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
    
    
    
    

    // Mengubah status Orders
    router.put('/', verifyJWTMiddleware(jwtUtil) ,async (request, response) => {
        const data = [
            request.body.orderId,
            request.body.userId
        ];

        const getId = request.user.userID
        
        const sqlGetData = "SELECT * FROM users_table WHERE id = ?"
        const [rows] = await dbConnection.query(sqlGetData, getId)

        const dataRole = rows[0].role 
        
        // Memeriksa apakah pengguna yang sedang login memiliki akses
            if (!(dataRole == "admin")) {
                return response.status(403).json({
                    "status": false,
                    "message": "Doesnt have access",
                    "result": null
                });
            }
    
        try {
            await dbConnection.beginTransaction();
            
            const status = "ongoing"
            const sqlGetData = "SELECT * FROM orders_table WHERE id = ? AND user_id = ? AND status = ?";
            const value = [data[0], data[1], status]
            const [resultGetData] = await dbConnection.query(sqlGetData, value);

            
    
            if (resultGetData.length === 0) {
                response.status(400).json({
                    "status": false,
                    "message": "Data not found"
                })
                return
            }
    
            const dataCartId = resultGetData[0].cart_id.split(',').map(Number);
    
            const sqlChangeStatus = "UPDATE orders_table SET status = 'finished' WHERE id = ? AND status = 'ongoing' ";
            await dbConnection.query(sqlChangeStatus, data);
    

    
            await dbConnection.commit();
    
            response.json({
                "status": true,
                "message": "Pembayaran berhasil",
            });
    
        } catch (error) {
            console.log(error);
            await dbConnection.rollback(); // Rollback transaksi jika terjadi kesalahan
            response.status(500).json({
                "status": false,
                "message": "Internal server error",
                "result": error.message
            });
        }
    });
    
    return router
 }

 module.exports = {setupOrderHandler}