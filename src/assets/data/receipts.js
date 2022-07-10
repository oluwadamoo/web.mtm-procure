import axios from "axios";

const receipts = async () => {
  const response = await axios.get(
    "https://mtm-procure-api.herokuapp.com/api/receipt"
  );
  return response.data;
};

export { receipts };
