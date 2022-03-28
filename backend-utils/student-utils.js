const getStudents = async (token) => {
  const response = await fetch(`http://localhost:4000/api/v1/student`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export { getStudents };
