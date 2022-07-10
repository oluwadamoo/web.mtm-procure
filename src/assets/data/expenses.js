import axios from "axios";

const expense = async () => {
  const response = await axios.get("/api/expense");
  return response.data;
};

export { expense };
