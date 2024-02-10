import AxiosAction from "./AxiosAction";

export async function roleValidated(role) {
  try {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken !== null) {
      console.log("tesdoang");
      const response = await AxiosAction.get("/auth/refresh-token", {
        headers: {
          Authorization: jwtToken,
        },
      });

      const user = response.data;

      localStorage.setItem("jwtToken", `Bearer ${user.refreshToken}`);

      if (user.role != role) {
        if (user.role == "user") window.location.href = "/";
        else if (user.role == "admin") window.location.href = "/";
        else window.location.href = "/login";
      }
    }
  } catch (error) {
    console.log(error);
    if (role != "guest") {
      // localStorage.clear();
      // window.location.href = "/401.html";
    }
  }
}
