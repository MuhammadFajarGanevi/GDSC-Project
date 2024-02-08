import axios from "axios";

async function login(event) {
  event.preventDefault();

  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  const response = await axios.post("http://localhost:3000/auth/login", data);

  console.log(response);

  window.location.href = "/";
}
