import React, { useEffect, useState } from "react";
import axios from "axios";
import LatestOrders from "./LatestOrders";
import Charts from "./Charts";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${API_BASE}/api/sales/processed`);
        setOrders(res.data);
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    }
    // initial load
    fetchData();
    // refresh every 5 sec
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-grid">
      <section className="left">
        <div className="card">
          <h3>10 latest Orders</h3>
          <LatestOrders orders={orders} />
        </div>
      </section>

      <section className="right">
        <div className="card">
          <Charts orders={orders} />
        </div>
      </section>
    </div>
  );
}
