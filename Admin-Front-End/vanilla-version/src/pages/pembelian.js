import AxiosAction from "../actions/AxiosAction";
import FormatHargaAction from "../actions/FormatHargaAction";

// Buat fungsi untuk merender konten halaman
export async function renderPembelian() {
  const idUser = localStorage.getItem("id");
  const jwtToken = localStorage.getItem("jwtToken");
  const response = await AxiosAction.get("/order?userId=" + idUser, {
    headers: {
      Authorization: jwtToken,
    },
  });
  //
  console.log(response);
  const dataTable = response.data.orders;

  const content = /* HTML */ `
    <div class="container">
      <h3>Riwayat Order</h3>
      <p>Informasi terkait transaksi user</p>
      ${renderTables(dataTable)}
    </div>
  `;
  document.getElementById("content").innerHTML = content;
}

function renderTables(data) {
  let tabel = "";
  for (const key in data) {
    tabel += /* HTML */ ` <div class="card mt-4" style="padding:0">
      <table>
        <thead>
          <tr>
            <th>Barang dibeli</th>
            <th>Jml</th>
            <th>Harga</th>
            <th>Status Order</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${data[key]
            .map(
              (item) => /* HTML */ `
                <tr>
                  <td>${item.laptopName}</td>
                  <td>${item.quantity}</td>
                  <td>
                    Rp ${FormatHargaAction(item.totalPricePerItem) + ".-"}
                  </td>
                  <td>${item.dataStatus}</td>
                  <td>${item.laptopName}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
      <div
        style="display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem"
      >
        <div class="date" style="margin-right: auto;">
          ${data[key][0].dataOrder_date}
        </div>
        <div class="total-price" style="margin-left: auto;">
          <b>Harga Total</b>
          <font class="text-primary">
            Rp
            ${FormatHargaAction(
              data[key].reduce(
                (accumulator, item) => accumulator + item.totalPricePerItem,
                0
              )
            )}.-
          </font>
        </div>
      </div>
    </div>`;
  }
  return tabel;
}
