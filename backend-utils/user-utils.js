import { API_URL } from "./url";

const signin = async (email, password) => {
  const response = await fetch(`${API_URL}api/v1/user/adminLogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password,
      email,
    }),
  });
  return response;
};

const signout = async (accessToken, token) => {
  const response = await fetch(`${API_URL}api/v1/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      token,
    }),
  });
  return response;
};

export { signin, signout };
