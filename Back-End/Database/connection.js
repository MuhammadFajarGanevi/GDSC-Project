const mysql = require("mysql2/promise");

async function setupConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "your_password_here", // Masukkan password Anda di sini
      database: "laptop_store",
    });
    console.log("Connection Success");
    return connection;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { setupConnection };
