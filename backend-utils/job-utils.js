import { API_URL } from "./url";
const getJobs = async (token) => {
  const response = await fetch(`${API_URL}api/v1/job`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const getAJob = async (token, id) => {
  const response = await fetch(`${API_URL}api/v1/job/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const updateJob = async (token, id, tutorId, status) => {
  const response = await fetch(`${API_URL}api/v1/job/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      hiredTutorId: tutorId,
      status,
    }),
  });
  return response;
};

const createJob = async (token, jobBody) => {
  const response = await fetch(`${API_URL}api/v1/job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...jobBody,
    }),
  });
  return response;
};

const deleteJob = async (token, id) => {
  const response = await fetch(`${API_URL}api/v1/job/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};
export { getJobs, createJob, getAJob, updateJob, deleteJob };
