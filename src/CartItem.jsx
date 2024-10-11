import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { useState, useEffect } from 'react';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  
  // Local state to keep track of total quantity of items
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantity(quantity);
  }, [cart]);

  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.forEach((item) => {
      let cost = item.cost;
      if (typeof cost === 'string') {
        cost = parseFloat(cost.replace('$', ''));
      }
      if (!isNaN(cost)) {
        totalCost += item.quantity * cost;
      } else {
        console.error(`Invalid cost for item: ${item.name}`);
      }
    });
    return totalCost;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };
  
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };
  
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };
  

  const itemSubTotal = (item) => {
    let cost = item.cost;
    if (typeof cost === 'string') {
      cost = parseFloat(cost.replace('$', ''));
    }
    if (isNaN(cost)) {
      console.error(`Invalid cost for item: ${item.name}`);
      return 0; // Return 0 if cost is invalid
    }
    return item.quantity * cost;
  };




    


  return (
    <div className="cart-container">
      <div className="cart-icon">
      </div>
      
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
      {cart.map((item) => (
          <div className="cart-item" key={item.id}> {/* Ensure 'id' is unique */}
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${itemSubTotal(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


