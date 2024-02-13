// Buat fungsi untuk merender konten halaman
export function renderPembelian() {
  const dataTable = [...Array(10).keys()];

  const content = /* HTML */ `
    <div class="container">
      <h3>Riwayat Order</h3>
      <p>Informasi terkait transaksi user</p>
      <div class="card mt-4" style="padding:0">
        <h4 class="my-3" style="text-indent:1.25rem">Data</h4>
        <table>
          <thead>
            <tr>
              <th>Barang dibeli</th>
              <th>Tanggal</th>
              <th>Harga</th>
              <th>Status Order</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${dataTable
              .map(
                (item) => /* HTML */ `
                  <tr>
                    <td>Tesdoang</td>
                    <td>Tesdoang</td>
                    <td>Tesdoang</td>
                    <td>Tesdoang</td>
                    <td>Tesdoang</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
        <p class="my-5 mr-5 text-right"><b>Harga Total</b> Rp 20.000.000.-</p>
      </div>
    </div>
  `;
  document.getElementById("content").innerHTML = content;
}
