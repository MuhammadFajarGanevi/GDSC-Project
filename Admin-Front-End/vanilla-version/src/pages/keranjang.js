// Buat fungsi untuk merender konten halaman
export function renderKeranjang() {
  const dataCart = {
    Laptop: [
      {
        picture: "/images/cards/glass-house.png",
        name: "Laptop 1",
        quantity: 1,
        total_price: "10.000.000",
      },
      {
        picture: "/images/cards/glass-house.png",
        name: "Laptop 2",
        quantity: 2,
        total_price: "20.000.000",
      },
      {
        picture: "/images/cards/glass-house.png",
        name: "Laptop 3",
        quantity: 1,
        total_price: "15.000.000",
      },
      {
        picture: "/images/cards/glass-house.png",
        name: "Laptop 1",
        quantity: 1,
        total_price: "10.000.000",
      },
    ],
    price_accumulation: "45.000.000",
  };

  const content = /* HTML */ `
    <link rel="stylesheet" href="style/dashboard-user.css" />

    <div class="container">
      <div class="grid-container">
        ${dataCart.Laptop.map(
          (item) => /* HTML */ `<div class="card">
            <img alt="preview" src="${item.picture}" />
            <h4>${item.name}</h4>
            ${item.quantity}, total_price
          </div>`
        ).join("")}
      </div>
      <div class="mt-5">
        <button class="btn mr-5" id="submit-password">Check Out</button>
        <button class="btn bg-info" id="submit-password">
          Pergi Menjelajah
        </button>
      </div>
    </div>
  `;
  document.getElementById("content").innerHTML = content;
}
