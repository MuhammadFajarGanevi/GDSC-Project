// vanilla router
export const routes = {
  "/": {
    script: "home.js",
    layout: "vertical.js",
    role: "user",
  },
  "/akun": {
    script: "akun.js",
    layout: "vertical.js",
    role: "user",
  },
  "/penjualan": {
    script: "penjualan.js",
    layout: "vertical.js",
    role: "user",
  },
  "/login": {
    script: "login.js",
    layout: "blank.js",
    role: "guest",
  },
  "/register": {
    script: "register.js",
    layout: "blank.js",
    role: "guest",
  },
};
