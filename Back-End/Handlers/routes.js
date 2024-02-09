const express = require('express')
const mysql = require('mysql2')
const { setupUserHandler } = require('./user_handlers.js')
const { setupAuthHandler } = require('./auth_handlers.js')
const { setupLaptopHandler } = require('./laptop_handlers.js')
const { setupCartHandler } = require('./cart_handlers.js')
const { verifyJWTMiddleware } = require('../Middleware/verifyJWTToken.js')
const { setupOrderHandler } = require('./order_handlers.js')

/**
 * @param {express.Express} app
 * @param {mysql.Connection} dbConnection
 */

function setupHandler (app, dbConnection, jwtUtil) {

    const userHandlerRouter = express.Router()
    const authHandlerRouter = express.Router()
    const laptopHandlerRouter = express.Router()
    const cartHandlerRouter = express.Router()
    const orderHandlerRouter = express.Router()

    app.use('/user',  setupUserHandler(userHandlerRouter, dbConnection, jwtUtil))
    app.use('/auth', setupAuthHandler(authHandlerRouter, dbConnection, jwtUtil))
    app.use('/laptop', setupLaptopHandler(laptopHandlerRouter, dbConnection, jwtUtil))
    app.use('/cart', setupCartHandler(cartHandlerRouter, dbConnection, jwtUtil))
    app.use('/order', setupOrderHandler(orderHandlerRouter, dbConnection, jwtUtil))

    return app
}
module.exports= {setupHandler}