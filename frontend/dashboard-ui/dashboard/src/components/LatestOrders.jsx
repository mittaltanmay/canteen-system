import React from "react";

export default function LatestOrders({ orders }) {
  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o, idx) => (
          <tr key={idx}>
            <td>{o.timestamp}</td>
            <td>{o.item}</td>
            <td>{o.qty}</td>
            <td>{o.price}</td>
            <td>{o.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
