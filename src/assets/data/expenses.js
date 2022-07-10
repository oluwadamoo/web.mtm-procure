import axios from "axios";

const expense = async () => {
  const response = await axios.get(
    "https://mtm-procure-api.herokuapp.com/api/expense"
  );
  return response.data;
};

export { expense };
