import AxiosAction from "./AxiosAction";

export async function roleValidated(role) {
  try {
    const currentPath = window.location.pathname;
    const oldPath = localStorage.getItem("path");
    const jwtToken = localStorage.getItem("jwtToken");
    localStorage.setItem("path", currentPath);

    console.log(oldPath, currentPath);
    if (
      jwtToken !== null &&
      currentPath != oldPath &&
      (oldPath != "login" || currentPath != "user")
    ) {
      const response = await AxiosAction.get("/auth/refresh-token", {
        headers: {
          Authorization: jwtToken,
        },
      });

      const user = response.data;
      console.log(user);

      localStorage.setItem("jwtToken", `Bearer ${user.refreshToken}`);

      if (user.role != role) {
        if (user.role == "user") window.location.href = "/";
        else if (user.role == "admin") window.location.href = "/";
        else window.location.href = "/login";
      }
    } else if (jwtToken == null && role != "guest") {
      localStorage.clear();
      window.location.href = "/401.html";
    }
  } catch (error) {
    console.log(error);
    if (role != "guest") {
      // localStorage.clear();
      // window.location.href = "/401.html";
    }
  }
}
