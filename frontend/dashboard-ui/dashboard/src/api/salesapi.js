import axios from "axios";

export const fetchProcessedSales = async () => {
  const res = await axios.get("http://localhost:5000/api/sales/processed");
  return res.data;
};
