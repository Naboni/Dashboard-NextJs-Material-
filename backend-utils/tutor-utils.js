const getTutors = async (token) => {
  const response = await fetch(`http://localhost:4000/api/v1/tutor`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return response;
};

const updateTutor = async (token, id, jobId, status) => {
  const response = await fetch(`http://localhost:4000/api/v1/tutor/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      hiredJobId: jobId,
      status,
    }),
  });
  return response;
};

export { getTutors, updateTutor };
