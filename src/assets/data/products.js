import axios from "axios";

const category = async () => {
  const response = await axios.get(
    "https://mtm-procure-api.herokuapp.com/api/category"
  );
  return response.data;
};

export { category };
