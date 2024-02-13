const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

const { setupConnection } = require('./Database/connection.js');
const { setupHandler } = require('./Handlers/routes.js');
const { JWTUtil } = require('./Utility/jwt.js');
const { verifyJWTMiddleware } = require('./Middleware/verifyJWTToken.js');

async function main() {
  const dbconnection = await setupConnection();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  const jwtUtil = new JWTUtil();

  app.get('/', (request, response) => {
    response.json({
      message: 'This is Homepage',
    });
  });

  app.use('/', await setupHandler(router, dbconnection, jwtUtil));

  app.listen(port, () => {
    console.log('Application is running');
  });
}

main();
