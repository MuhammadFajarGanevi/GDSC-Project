import AxiosAction from "./AxiosAction";

export async function roleValidated(role) {
  try {
    const jwtToken = localStorage.getItem("jwtToken");

    const response = await AxiosAction.get("/auth/refresh-token", {
      headers: { Authorization: jwtToken },
    });

    const user = response.data;

    console.log(user);

    // if (user.role != role) {
    //   localStorage.clear();
    //   window.location.href = "401.html";
    // }
  } catch (error) {
    console.log(error);
    // if (role != "guest") {
    //   localStorage.clear();
    //   window.location.href = "401.html";
    // }
  }
}
