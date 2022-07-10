import axios from "axios";

const receipts = async () => {
  const response = await axios.get("/api/receipt");
  return response.data;
};

export { receipts };
