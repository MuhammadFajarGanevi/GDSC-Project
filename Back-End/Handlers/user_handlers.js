const mysql = require('mysql2')
const { Router } = require('express')

const { HashFunction } = require('../Utility/hash.js')
const { JWTUtil } = require('../Utility/jwt.js')
const { verifyJWTMiddleware } = require('../Middleware/verifyJWTToken.js')

/**
 * @param {Router} router 
 * @param {mysql.Connection} dbConnection 
 */
function setupUserHandler(router, dbConnection) {

    const hashFunction = new HashFunction()
    const jwtUtil = new JWTUtil()

    // Registrasi User
    router.post('/signup', async (request, response) => {
        const data = [
            request.body.name,
            request.body.email,
            request.body.password,
            request.body.alamat,
            request.body.no_telp
        ]
    
        try {
            const sqlCekData = "SELECT email, password FROM users_table"
            const [rows] = await dbConnection.query(sqlCekData)
            
            // Mengecek apakah email sudah terdaftar
            const isEmailRegistered = rows.some(row => row.email === data[1])
    
            if (!isEmailRegistered) {
                // Iterasi melalui setiap baris untuk memeriksa password
                const isPasswordMatch = rows.some(row => hashFunction.compare(data[2], row.password))
    
                    const sql = "INSERT INTO users_table (name, email, password, address, phone_number, role) VALUES (?,?,?,?,?, 'user')"
                    const value = [data[0], data[1], hashFunction.hash(data[2]), data[3], data[4]]
                    const [result, fields] = await dbConnection.query(sql, value)
    
                    response.json({
                        "status": true,
                        "message": "Data added successfully",
                    })
              
            } else {
                response.status(400).json({
                    "status": false,
                    "message": "Email is already registered",
                    "result": null
                })
            }
        } catch (error) {
            console.log(error)
            response.status(500).json({
                "status": false,
                "message": "Internal server error",
                "result": null
            })
        }
    })
    
   
    // Mengambil data User Jika admin
    router.get('/admin', verifyJWTMiddleware(jwtUtil),  async (request, response) => {

        const getId = request.user.userID
        
        const sqlGetData = "SELECT * FROM users_table WHERE id = ?"
        const [rows] = await dbConnection.query(sqlGetData, getId)

        const dataRole = rows[0].role 
        

        if ( dataRole == "admin") {

            try {
                let data = []
                let sql
            
                const dataCek = [
                    request.body.email,
                    request.body.name
                ]
                if (dataCek[0]) {
                    sql = "SELECT email, name, phone_number, address, role FROM users_table WHERE email = ?"
                    data.push(dataCek[0])
                } else if (dataCek[1]){
                    sql = "SELECT email, name, phone_number, address, role FROM users_table WHERE name LIKE ?"
                    data.push(`%${dataCek[1]}%`)
                } else {
                    sql = "SELECT email, name, phone_number, address, role FROM users_table"
                }
        
                const [row] = await dbConnection.query(sql, data)
                if( row.length  > 0){
            
                response.json({
                    "status": true,
                    "message": "Data retrieved successfully",
                    "result": row,
                    "amount of data": row.length
                })
                }
                else {
                    response.status(400).json({
                        "status": false,
                        "message": "Data not founded",
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
          
        }else {
            response.status(403).json({
                "status": false,
                "message": "doesnt have access",
                "result": null
            })
            return
        }

       
        
    })

     // Mengambil data User Jika User sendiri
     router.get('/user', verifyJWTMiddleware(jwtUtil),  async (request, response) => {

        const getId = request.user.userID
        
        const sqlGetData = "SELECT * FROM users_table WHERE id = ?"
        const [rows] = await dbConnection.query(sqlGetData, getId)

        const dataRole = rows[0].role 
        const dataId = rows[0].id
        
        if ( dataRole == "user" && dataId == getId ) {
            try {
                const dataCek = [
                    request.body.email,
                    request.body.name
                ]            
                    
                const sql = "SELECT email, name, phone_number, address, role FROM users_table WHERE id = ?"
                const [row] = await dbConnection.query(sql, getId)
                if( row.length  > 0){
                response.json({
                    "status": true,
                    "message": "Data retrieved successfully",
                    "result": row,
                    "amount of data": row.length
                })
                }
                else {
                    response.status(400).json({
                        "status": false,
                        "message": "Data not founded",
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
          
        }else {
            response.status(403).json({
                "status": false,
                "message": "doesnt have access",
                "result": null
            })
            return
        }
  
    })
   
    // Mengupdate data User
    router.put('/',  verifyJWTMiddleware(jwtUtil), async(request, response) => {
        const data = [
            request.body.userId,
            request.body.name,
            request.body.alamat,
            request.body.no_telp,
            request.user.userID
          ] 
        
        const sqlGetData = "SELECT * FROM users_table WHERE id = ?"
        const [rows] = await dbConnection.query(sqlGetData,data[4])

        const dataRole = rows[0].role
        const dataId = rows[0].id 

        if ( dataId == data[0] || dataRole == "admin") {
     
            try {
                const sqlCekData = "SELECT * FROM users_table WHERE id = ?"
                const [rows] = await dbConnection.query(sqlCekData, data[0])
    
                if (rows.length > 0) {
                    const sql = "UPDATE users_table SET name = ?, address = ?, phone_number = ? WHERE id = ? "
                    const value = [data[1], data[2], data[3], data[0]]
    
                    const [result, fields] = await dbConnection.query(sql, value)
                    
                    response.json({
                        "status": true,
                        "message": "Data updated successfully",
                        "result": value
                    })
                } else {
                    response.status(400).json({
                        "status": false,
                        "message": "Data not found",
                        "result": null
                    })
                }
    
            }catch(error) {
                console.log(error)
                response.status(500).json({
                    "status": false,
                    "message": "internal server error",
                    "result": error
                })
            }
        } else {
                response.status(403).json({
                    "status": false,
                    "message": "doesnt have access",
                    "result": null
                })
                return
                
        }
          
       
    })

    // Menghapus data User
    router.delete('/', verifyJWTMiddleware(jwtUtil), async(request, response) => {

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
        
        const userId = request.body.userId

        try {
            const sqlCekData = "SELECT * FROM users_table WHERE id = ?"
            const [rows] = await dbConnection.query(sqlCekData, userId)


            if (rows.length > 0) {
                const sql = "DELETE FROM users_table WHERE id = ? "
                const [result, fields] = await dbConnection.query(sql, userId)
                
                response.json({
                    "status": true,
                    "message": "Data deleted successfully",
                })
            } else {
                response.status(400).json({
                    "status": false,
                    "message": "Data not founded",
                    "result": null
                })
            }

        }catch(error) {
            console.log(error)

            response.status(500).json({
                "status": false,
                "message": "internal server error",
                "result": error
            })
        }
    })

    return router
}

module.exports = { setupUserHandler }
