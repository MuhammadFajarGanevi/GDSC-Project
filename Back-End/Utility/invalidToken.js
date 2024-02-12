function addInvalidToken(token) {
    // Tambahkan token ke dalam daftar token yang tidak valid
    global.invalidTokens = global.invalidTokens || []; // Inisialisasi variabel global jika belum ada
    global.invalidTokens.push({ token: token, expiry: Date.now() + (30 * 60 * 1000) }); // Menyimpan token beserta waktu kedaluwarsanya (30 menit)
   // Hapus token yang sama dari daftar token yang valid jika ada
   global.validTokens = global.validTokens.filter(validToken => validToken.token !== token);
}
function addValidToken(token){
    global.validTokens = global.validtokens || []
    global.validTokens.push({token : token, expiry:  Math.floor(Date.now() / 1000) + (60 * 60)})
}
// Fungsi untuk memeriksa dan menghapus token yang sudah kedaluwarsa dari daftar token yang tidak valid
function clearExpiredTokens() {
    const currentTime = Date.now();
    global.invalidTokens = global.invalidTokens.filter(tokenData => tokenData.expiry > currentTime);
}


// Panggil fungsi clearExpiredTokens setiap 30 menit untuk membersihkan token yang sudah kedaluwarsa
setInterval(clearExpiredTokens, 30 * 60 * 1000);

module.exports = { addInvalidToken, addValidToken  };
