import API_URL from "./url";

const getReports = async (token) => {
  const response = await fetch(`${API_URL}api/v1/report`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export { getReports };
