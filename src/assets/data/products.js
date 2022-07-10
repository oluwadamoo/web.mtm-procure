import axios from "axios";

const category = async () => {
  const response = await axios.get("/api/category");
  return response.data;
};

export { category };
