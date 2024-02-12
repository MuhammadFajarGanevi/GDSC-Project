import AxiosAction from "./AxiosAction";

export async function refreshToken() {
  try {
    const jwtToken = localStorage.getItem("jwtToken");

    console.log(oldPath, currentPath);
    if (jwtToken !== null && currentPath != oldPath && oldPath != "login") {
      const response = await AxiosAction.get("/auth/refresh-token", {
        headers: {
          Authorization: jwtToken,
        },
      });

      const user = response.data;
      console.log(user);

      localStorage.setItem("jwtToken", `Bearer ${user.refreshToken}`);

      if (user.role != rolePage) {
        if (user.role == "user") window.location.href = "/user";
        else if (user.role == "admin") window.location.href = "/";
        else window.location.href = "/login";
      }
    } else if (jwtToken == null && rolePage != "guest") {
      localStorage.clear();
      window.location.href = "/401.html";
    }
  } catch (error) {
    console.log(error);
    if (rolePage != "guest") {
      // localStorage.clear();
      // window.location.href = "/401.html";
    }
  }
}

export function roleValidated(role, rolePage) {
  if (role === null && rolePage !== "guest") {
    window.location.href = "/login";
  } else if (role === "user" && rolePage !== "user") {
    window.location.href = "/user";
  } else if (role === "admin" && rolePage !== "admin") {
    window.location.href = "/";
  }
}
