class TokenValidation {
  static addInvalidToken(token) {
    // Tambahkan token ke dalam daftar token yang tidak valid
    global.invalidTokens = global.invalidTokens || [];
    global.invalidTokens.push({
      token: token,
      expiry: Date.now() + 30 * 60 * 1000,
    }); // Menyimpan token beserta waktu kedaluwarsanya (30 menit)

    // Hapus token yang sama dari daftar token yang valid jika ada
    global.validTokens = (global.validTokens || []).filter(
      (validToken) => validToken.token !== token
    );
  }

  static addValidToken(token) {
    global.validTokens = global.validTokens || [];
    global.validTokens.push({
      token: token,
      expiry: Math.floor(Date.now() / 1000) + 60 * 60,
    }); // Menyimpan token beserta waktu kedaluwarsanya (1 jam)
  }

  // Fungsi untuk memeriksa dan menghapus token yang sudah kedaluwarsa dari daftar token yang tidak valid
  static clearExpiredTokens() {
    const currentTime = Date.now();
    global.invalidTokens = (global.invalidTokens || []).filter(
      (tokenData) => tokenData.expiry > currentTime
    );
  }
}

// Panggil fungsi clearExpiredTokens setiap 30 menit untuk membersihkan token yang sudah kedaluwarsa
setInterval(TokenValidation.clearExpiredTokens, 30 * 60 * 1000); // 30 menit

module.exports = { TokenValidation };
