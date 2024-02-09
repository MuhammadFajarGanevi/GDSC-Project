const mysql = require('mysql2')
const jwt = require('jsonwebtoken')

const { Router } = require('express')

const { HashFunction } = require('../Utility/hash.js')
const { JWTUtil } = require('../Utility/jwt.js')
const { addInvalidToken } = require('../Utility/invalidToken.js')

const { verifyJWTMiddleware } = require('../Middleware/verifyJWTToken.js')
const { loginValidator } = require('../Middleware/loginValidator.js')

/**
 * @param {Router} router 
 * @param {mysql.Connection} dbConnection 
 */

function setupAuthHandler (router, dbConnection) {
    const hashFunction = new HashFunction()
    const jwtUtil = new JWTUtil()

     // Method Login Account
     router.post ('/login', loginValidator, async (request, response) => {
        try {
            const email = request.body.email
            const password = request.body.password

            const sqlCheckData = `SELECT * FROM users_table WHERE email = ?`
            const [rows] = await dbConnection.query(sqlCheckData, email)
            const dataRole = rows[0].role

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
                userID: rows[0].id
            })

            response.status(200).json({
                "status": true,
                "message": "Login successfully",
                "result":{ accessToken: token
                },
                "role": dataRole
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

    // Refresh Token
    router.get('/refresh-token', verifyJWTMiddleware(jwtUtil), async (request, response) => {
        try {
            // Periksa apakah token ada dalam header Authorization
            if (!request.headers.authorization) {
                return response.status(401).json({
                    status: false,
                    message: "Token tidak ditemukan dalam header Authorization"
                });
            }
            const getId = request.user.userID
            const sqlGetData = "SELECT * FROM users_table WHERE id = ?"
            const [rows] = await dbConnection.query(sqlGetData, getId)
            const dataRole = rows[0].role

            // Ambil token dari header Authorization
            const token = request.headers.authorization.split(" ")[1];
    
            addInvalidToken(token)
            // Buat token refresh baru
            const newRefreshToken = jwtUtil.encode(request.user);
    
            // Kirim token refresh baru sebagai respons
            response.json({
                status: true,
                message: "Token refresh berhasil diperbaharui",
                refreshToken: newRefreshToken,
                role: dataRole
            });
    
        } catch (error) {
            console.error(error);
            response.status(500).json({
                status: false,
                message: "internal server error",
                data: error
            });
        }
    });
    

    // Reset Password
    router.post('/reset-password', verifyJWTMiddleware(jwtUtil), async(request, response) => {
        const data = [
            request.body.oldPassword,
            request.body.newPassword,
            request.body.confirmPassword,
            request.user.userID
        ]
        
         const sqlCheck = "SELECT password FROM users_table WHERE id = ?"
         const [row] = await dbConnection.query(sqlCheck, data[3])
         
         const oldPassword = row[0].password

         if ( !(hashFunction.compare(data[0], oldPassword)) ) {
            response.status(400).json({
                "status": false,
                "message": "Your old password is incorrect"
            }) 

            return
         }

         if (!(data[1] == data[2] && data[1])) {
            response.status(400).json({
                "status": false,
                "message": "Your new password is empty or Your password Confirmation is incorrect"
            }) 

            return
         }

         const sqlUpdatePassword = "UPDATE users_table SET password = ? WHERE id = ?"
         const value = [hashFunction.hash(data[1]), data[3]]
         const [result] = await dbConnection.query(sqlUpdatePassword, value)
         
         response.json({
            "status": true,
            "message": "password reset successfully"
         })
    })

    // Logout
    router.post('/logout', verifyJWTMiddleware(jwtUtil), async(request, response) => {
        const data = [
            request.body.email,
            request.body.password,
            request.user.userID
        ]
        
        const sqlGetData = "SELECT * FROM users_table WHERE id = ?"
        const [rows] = await dbConnection.query(sqlGetData, data[2])

        const dataPassword = rows[0].password 
        const dataEmail = rows[0].email 


        if (dataEmail == data[0] && hashFunction.compare(data[1], dataPassword)) {
            const token = request.headers.authorization.split(" ")[1];
            addInvalidToken(token)
            response.json({
                "status": true,
                "message": "Logged out successfuly"
            })

        }else {
            response.status(400).json({
                "status": false,
                "message": "Invalid data"
            })
        }

    })

    return router
 }

 module.exports = {setupAuthHandler}