import React from "react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export default function Charts({ orders }) {
  // revenue per item
  const totals = {};
  orders.slice(0,100).forEach(o => {
    totals[o.item] = (totals[o.item] || 0) + o.total;
  });
  const revenueData = Object.keys(totals).map(k => ({
    item: k,
    revenue: totals[k]
  }));

  // sales over time
  const timeData = orders.map(o => ({
    time: o.timestamp.split("T")[1]?.slice(0,5),
    total: o.total
  }));

  return (
    <div>
      <h4>Top Items (by revenue)</h4>
      <BarChart width={500} height={300} data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="item" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#4f46e5"/>
      </BarChart>

      <h4 style={{ marginTop: "30px" }}>Sales Over Time</h4>
      <LineChart width={650} height={300} data={timeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" />
      </LineChart>
    </div>
  );
}
