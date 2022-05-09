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

const getAParent = async (token, id) => {
  const response = await fetch(`http://localhost:4000/api/v1/parent/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const updateParent = async (token, id, parentBody) => {
  const response = await fetch(`http://localhost:4000/api/v1/parent/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...parentBody }),
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

const deleteParent = async (token, id) => {
  const response = await fetch(`http://localhost:4000/api/v1/parent/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export { getParents, createParent, getAParent, updateParent, deleteParent };
