import FormatHargaAction from "../actions/FormatHargaAction";
import AxiosAction from "../actions/AxiosAction";
import Swal from "sweetalert2";

var dataCart = {};
const jwtToken = localStorage.getItem("jwtToken");
const idUser = localStorage.getItem("id");

export async function renderKeranjang() {
  try {
    const response = await AxiosAction.get("/cart?id=" + idUser, {
      headers: {
        Authorization: jwtToken,
      },
    });

    dataCart = response.data;
    dataCart.ammountOfData = dataCart.Laptop.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    console.log(dataCart);

    const content = /* HTML */ `
    <link rel="stylesheet" href="style/dashboard-user.css" />

    <div class="container">
      <div class="grid-container">
        ${dataCart.Laptop.map(
          (item) => /* HTML */ `<div class="card">
            <button class="btn bg-error btn-close">x</button>
            <img
              alt="preview"
              src="${item.picture}"
              style="max-height: 250px;"
            />
            <h4>${item.name}</h4>
            <div class="cart-item my-3">
              <button
                class="btn btn-decrease ${item.quantity == 1
                  ? "btn-inactive"
                  : ""}"
              >
                -
              </button>
              <span class="quantity mx-2">${item.quantity}</span>
              <button
                class="btn btn-increase ${item.quantity == item.max_quantity
                  ? "btn-inactive"
                  : ""}"
              >
                +
              </button>
            </div>
            <p>
              Rp
              <font class="total-price">
                ${FormatHargaAction(item.total_price) + ".-"}
              </font>
            </p>
          </div>`
        ).join("")}
      </div>
      <div class="mt-5">
        <h3 class="mt-5">
          Rp
          <font class="price-accumulation">
            ${FormatHargaAction(dataCart.priceAccumulation) + ".-"}
          </font>
        </h3>
        <p class="mb-5">Jumlah barang <font class="count-data">${
          dataCart.ammountOfData
        }</p>
        <button class="btn mr-5 ${
          dataCart.priceAccumulation == 0 ? "btn-inactive" : ""
        }" id="check-out">Check Out</button>
        <button class="btn bg-secondary">
          Pergi Menjelajah
        </button>
      </div>
    </div>
  `;
    document.getElementById("content").innerHTML = content;

    setListener();
  } catch (error) {
    if (error.response.status == 401) {
      localStorage.clear();
      window.location.href = "/401.html";
    }
    if (error.response.status == 500) {
      localStorage.clear();
      window.location.href = "/500.html";
    }
  }
}

function setListener() {
  const decreaseBtns = document.querySelectorAll(".btn-decrease");
  const increaseBtns = document.querySelectorAll(".btn-increase");
  const closeBtns = document.querySelectorAll(".btn-close");
  const totalPrices = document.querySelectorAll(".total-price");
  const priceAccumulation = document.querySelector(".price-accumulation");
  const countData = document.querySelector(".count-data");
  const checkOutBtn = document.getElementById("check-out");

  checkOutBtn.addEventListener("click", async () => {
    checkOutBtn.classList.add("btn-inactive");
    try {
      const ask = await Swal.fire({
        title: `Lakukan pembelian barang?`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Order Barang",
        cancelButtonText: "Batal",
        confirmButtonColor: "var(--primary)",
        cancelButtonColor:
          "rgba(var(--shadow-r),var(--shadow-g),var(--shadow-b), 0.65)",
      });
      if (ask.isConfirmed) {
        const response = await AxiosAction.post(
          "/order",
          { userId: idUser },
          {
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        if (response.data.status) {
          Swal.fire({
            toast: true,
            position: "top",
            iconColor: "white",
            color: "white",
            background: "var(--success)",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: "success",
            title: "Status Barang sudah masuk ke pembelian!",
          });
        }
      } else {
        checkOutBtn.classList.remove("btn-inactive");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        toast: true,
        position: "top",
        iconColor: "white",
        color: "white",
        background: "var(--error)",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        icon: "error",
        title: error.response.data.message,
      });
      checkOutBtn.classList.remove("btn-inactive");
    }
  });

  increaseBtns.forEach(function (btn, index) {
    btn.addEventListener("click", async () => {
      try {
        const quantityElem = btn.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantityElem.textContent);
        if (quantity < dataCart.Laptop[index].max_quantity) {
          quantity++;
          quantityElem.textContent = quantity;

          totalPrices[index].textContent =
            FormatHargaAction(dataCart.Laptop[index].price * quantity) + ".-";

          dataCart.priceAccumulation =
            dataCart.priceAccumulation + dataCart.Laptop[index].price;
          priceAccumulation.textContent =
            FormatHargaAction(dataCart.priceAccumulation) + ".-";
          dataCart.ammountOfData++;
          countData.textContent = dataCart.ammountOfData;

          await AxiosAction.put(
            "/cart",
            {
              cart_id: dataCart.Laptop[index].cart_id,
              quantity: quantity,
            },
            {
              headers: {
                Authorization: jwtToken,
              },
            }
          );
        }

        if (quantity > 1) {
          decreaseBtns[index].classList.remove("btn-inactive");
        } else if (quantity >= dataCart.Laptop[index].max_quantity) {
          increaseBtns[index].classList.add("btn-inactive");
        }
      } catch (error) {
        if (error.response.status == 401) {
          localStorage.clear();
          window.location.href = "/401.html";
        }
        if (error.response.status == 500) {
          localStorage.clear();
          window.location.href = "/500.html";
        }
      }
    });
  });

  decreaseBtns.forEach(function (btn, index) {
    btn.addEventListener("click", async () => {
      try {
        const quantityElem = btn.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantityElem.textContent);
        if (quantity > 1) {
          quantity--;
          quantityElem.textContent = quantity;

          totalPrices[index].textContent =
            FormatHargaAction(dataCart.Laptop[index].price * quantity) + ".-";

          dataCart.priceAccumulation =
            dataCart.priceAccumulation - dataCart.Laptop[index].price;
          priceAccumulation.textContent =
            FormatHargaAction(dataCart.priceAccumulation) + ".-";
          dataCart.ammountOfData--;
          countData.textContent = dataCart.ammountOfData;

          await AxiosAction.put(
            "/cart",
            {
              cart_id: dataCart.Laptop[index].cart_id,
              quantity: quantity,
            },
            {
              headers: {
                Authorization: jwtToken,
              },
            }
          );
        }
        if (quantity === 1) {
          btn.classList.add("btn-inactive");
        } else if (quantity <= dataCart.Laptop[index].max_quantity) {
          increaseBtns[index].classList.remove("btn-inactive");
        }
      } catch (error) {
        if (error.response.status == 401) {
          localStorage.clear();
          window.location.href = "/401.html";
        }
        if (error.response.status == 500) {
          localStorage.clear();
          window.location.href = "/500.html";
        }
      }
    });
  });

  closeBtns.forEach(function (btn, index) {
    btn.addEventListener("click", async () => {
      try {
        const ask = await Swal.fire({
          title: `Tidak jadi membeli ${dataCart.Laptop[index].name}?`,
          showConfirmButton: false,
          showDenyButton: true,
          showCancelButton: true,
          denyButtonText: "Hapus",
          cancelButtonText: "Batal",
          denyButtonColor: "var(--error)",
          cancelButtonColor:
            "rgba(var(--shadow-r),var(--shadow-g),var(--shadow-b), 0.65)",
        });
        if (ask.isDenied) {
          await AxiosAction({
            method: "delete",
            url: "/cart",
            data: {
              cart_id: dataCart.Laptop[index].cart_id,
            },
            headers: {
              Authorization: jwtToken,
            },
          });
          window.location.href = "/keranjang";
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
          localStorage.clear();
          window.location.href = "/401.html";
        }
        if (error.response.status == 500) {
          localStorage.clear();
          window.location.href = "/500.html";
        }
      }
    });
  });
}
