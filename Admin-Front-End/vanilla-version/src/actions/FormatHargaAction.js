export default function (number) {
  // Mengubah angka menjadi string
  let strNumber = number.toString();
  let result = "";

  // Memisahkan angka menjadi grup yang berisi 3 digit
  while (strNumber.length > 3) {
    result = "." + strNumber.slice(-3) + result;
    strNumber = strNumber.slice(0, -3);
  }

  // Menambahkan sisanya setelah titik terakhir
  result = strNumber + result;

  return result;
}
