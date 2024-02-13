const moment = require('moment');

// Membuat fungsi requestTime yang mengembalikan waktu saat ini dalam format yang diinginkan
const requestTime = function () {
  // Mendapatkan waktu saat ini dalam bentuk objek Date
  const currentTime = moment();
  // Mengubah format waktu sesuai keinginan (contoh: DD/MM/YYYY HH:mm:ss)
  const formattedTime = currentTime.format('DD/MM/YYYY HH:mm:ss');

  return formattedTime; // Mengembalikan waktu yang telah diformat
};

module.exports = { requestTime }; // Export fungsi requestTime agar dapat digunakan di file lain
