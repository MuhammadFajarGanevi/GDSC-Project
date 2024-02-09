import AxiosAction from "./AxiosAction";

export function roleChecking(role) {
  if (!roleValidated(role)) {
    localStorage.clear();

    window.location.href = "401.html";
  }
}

async function roleValidated(role) {
  if (role == "guest") return true;

  try {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) return false;

    const response = AxiosAction.post(
      "/auth/refresh",
      {},
      {
        headers: { Authorization: jwtToken },
      }
    );

    user = response.data;

    return user.role == role;
  } catch (error) {
    return false;
  }
}
