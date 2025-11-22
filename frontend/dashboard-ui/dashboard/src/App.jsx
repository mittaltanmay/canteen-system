import { useEffect, useState } from "react";
import { fetchProcessedSales } from "./api/salesapi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function App() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // auto refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const data = await fetchProcessedSales();
      setSales(data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading Dashboard...</div>;
  }

  // --- Analytics ---
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalOrders = sales.length;

  const topItem = (() => {
    const count = {};
    sales.forEach(s => count[s.item] = (count[s.item] || 0) + 1);
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
  })();

  const revenueByItem = {};
  sales.forEach(s => {
    revenueByItem[s.item] = (revenueByItem[s.item] || 0) + s.total;
  });

  const chartData = Object.entries(revenueByItem).map(([item, total]) => ({
    item, total
  }));

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Smart Canteen Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 shadow rounded text-center">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-3xl mt-2 font-bold">₹ {totalRevenue}</p>
        </div>

        <div className="bg-white p-6 shadow rounded text-center">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl mt-2 font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white p-6 shadow rounded text-center">
          <h2 className="text-lg font-semibold">Top Item</h2>
          <p className="text-3xl mt-2 font-bold">{topItem}</p>
        </div>
      </div>

      {/* Chart + Live Feed */}
      <div className="grid grid-cols-2 gap-10">
        {/* Revenue Chart */}
        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-xl font-bold mb-4">Revenue by Item</h2>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="item" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4F46E5" />
          </BarChart>
        </div>

        {/* Live Feed */}
        <div className="bg-white p-6 shadow rounded h-[350px] overflow-auto">
          <h2 className="text-xl font-bold mb-4">Live Sales Feed</h2>
          {sales.slice(-20).reverse().map((s, i) => (
            <div key={i} className="border-b py-2">
              <p><b>{s.item}</b> — Qty: {s.qty}, Total: ₹{s.total}</p>
              <p className="text-xs text-gray-500">{s.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
