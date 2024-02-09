const mysql = require('mysql2')
const jwt = require('jsonwebtoken')

const { Router } = require('express')

const { HashFunction } = require('../Utility/hash.js')
const { JWTUtil } = require('../Utility/jwt.js')
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
    
            // Ambil token dari header Authorization
            const token = request.headers.authorization.split(" ")[1];
    

            // Buat token refresh baru
            const newRefreshToken = jwtUtil.encode(request.user);
    
            // Kirim token refresh baru sebagai respons
            response.json({
                status: true,
                message: "Token refresh berhasil diperbaharui",
                refreshToken: newRefreshToken
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
    router.post('/logout', verifyJWTMiddleware(jwtUtil), (request, response) => {

    })

    return router
 }

 module.exports = {setupAuthHandler}