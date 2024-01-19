import React from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export default function OrderPage() {
  const { orders } = useShoppingCart();
    console.log(orders)
  return (
    <div>
      {orders.map((order) => (
        <div key={order.address + Math.random()}>
          <p>Address: {order.address}</p>
          {order.items.map((item) => (
            <div key={order.address + item.title + Math.random()}>
              <p>Title: {item.title}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price}</p>
              <p>Barcode: {item.barcode}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
