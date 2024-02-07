const express = require('express')
const mysql = require('mysql2')
const { setupUserHandler } = require('./user_handlers.js')
const { setupAuthHandler } = require('./auth_handlers.js')
const { verifyJWTMiddleware } = require('../Middleware/verifyJWTToken.js')

/**
 * @param {express.Express} app
 * @param {mysql.Connection} dbConnection
 */

function setupHandler (app, dbConnection, jwtUtil) {

    const userHandlerRouter = express.Router()
    const authHandlerRouter = express.Router()

    app.use('/user',  setupUserHandler(userHandlerRouter, dbConnection, jwtUtil))
    app.use('/auth', setupAuthHandler(authHandlerRouter, dbConnection, jwtUtil))

    return app
}
module.exports= {setupHandler}