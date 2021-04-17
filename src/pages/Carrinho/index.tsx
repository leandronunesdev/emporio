import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../../components/Header"
import { clearCart, removeItem, updateAmount } from "../../store/ducks/carrinho/actions";

import './Carrinho.scss'

const Carrinho = () => {

  const token = localStorage.getItem("token")

  const dispatch = useDispatch()

  const cart = useSelector((state: any) => state.cart.CartItens.map((item: any) => ({
    ...item,
    subtotal: item.price * item.amount,
  }))
  );

  const total = useSelector((state: any) => state.cart.CartItens.reduce((totalSum: any, product: any) => {
    return totalSum + product.price * product.amount;
  }, 0)
  );

  function increment(item: any) {
    dispatch(updateAmount({
      id: item.id,
      amount: item.amount + 1
    }));
  }

  function decrement(item: any) {
    dispatch(updateAmount({
      id: item.id,
      amount: item.amount - 1,
    }));
  }

  const [checkout, setCheckout] = useState(false)

  const initCheckout = () => {
    dispatch(clearCart())
    setCheckout(true)
  }
  
  return (
    <div>
      <Header />
      { checkout ? 
        (<p className="checkout-message">Compra realizada com sucesso :)</p>) 
        : (
        <div className="cart-table">        
          <table>
            <thead>
              <tr>
                <th />
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Subtotal</th>
                <th />
              </tr>
            </thead>
            <tbody>
            {cart.map((item: any) => (
              <tr key={item.id} className="item-row">
                <td className="cart-img">
                  <img src={item.image} alt={item.title} />
                </td>
                <td>
                  <strong>{item.title}</strong>
                  <span>R$ {item.price}</span>
                </td>
                <td>
                  <div>
                    <button onClick={() => decrement(item)}>-</button>
                    <input type="number" readOnly value={item.amount}/>
                    <button onClick={() => increment(item)}>+</button>
                  </div>
                </td>
                <td>
                  <strong>R$ {item.subtotal.toFixed(3).slice(0,-1)}</strong>
                </td>
                <td>
                  <button onClick={() => dispatch(removeItem(item.id))}>X</button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <footer>
            <button onClick={initCheckout}>Checkout</button>
            <div className="total">
              <span>Total:</span>
              <strong> R$ {total.toFixed(3).slice(0,-1)}</strong>
            </div>
          </footer>        
        </div>    
      )}
      {
        token === null &&
        <Redirect to="/cadastro" />        
      }
    </div>    
  )
}

export default Carrinho