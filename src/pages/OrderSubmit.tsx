import { useState } from 'react';
import { AdminRoute, Authenticated } from '../secured_routes/AuthRoute';
import { useProducts } from '../context/ProductContext';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ShoppingCartList } from '../components/ShoppingCart';
import { useShoppingCart } from '../context/ShoppingCartContext';
function OrderSubmit() {
  const [address, setAddress] = useState('');
 
  const nav = useNavigate()
  const {cartProducts,createOrder} = useShoppingCart()
  const handleSubmitOrder = async () => {
    // Create an item object with the provided data
    const items = Object.entries(cartProducts).map(([id, {p, quantity}]) => ({itemId: id, quantity,...p}))
    if(items.length < 1) {
      message.info("Cannot submit empty order..")
      return;
    }
    const newOrder = {
      items,
      address
    };

    const orderCreated = await createOrder(newOrder)
    if(orderCreated) {
      nav("/store")
    } else {
      message.error("There was a problem submitting order, check the network tab")
    }
 
    // You can add logic here to send the item data to your server for processing or save it to your local storage.
  };

  return (
    <div className="container">
      <h2>Order items</h2>
      <ShoppingCartList />
      <h2>Submit order</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Shipping address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmitOrder}
        >
          Submit order
        </button>
      </form>
    </div>
  );
}


export default Authenticated(OrderSubmit)