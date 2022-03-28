const signin = async (email, password) => {
  const response = await fetch(`http://localhost:4000/api/v1/user/login`, {
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
  const response = await fetch(`http://localhost:4000/api/v1/user/logout`, {
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
