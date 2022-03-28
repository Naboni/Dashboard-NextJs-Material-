const getParents = async (token) => {
  const response = await fetch(`http://localhost:4000/api/v1/parent`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const createParent = async (token, parentBody) => {
  const response = await fetch(`http://localhost:4000/api/v1/parent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...parentBody,
    }),
  });
  return response;
};

export { getParents, createParent };
