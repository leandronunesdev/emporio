import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import Header from "../../components/Header"
import { addItem } from "../../store/ducks/carrinho/actions"
import { FiShoppingBag } from 'react-icons/fi'

import './Home.scss'

const Home = () => {

  const [categorias, setCategorias] = useState([])
  const [bebidas, setBebidas] = useState([])

  const token = localStorage.getItem("token")

  const dispatch = useDispatch()

  const amount = useSelector((state: any) => state.cart.CartItens.reduce((sumAmount: any, item: any) => {
    sumAmount[item.id] = item.amount;

    return sumAmount;
  }, {})
  );

  function handleAddProduct(item: any) {
    dispatch(addItem(item))
  }


  useEffect(() => {
    if(token !== null) {
      const headers = {
        'Authorization' : `Bearer ${token}`
      }
      axios.get('http://localhost:4000/categories', { headers: headers })
      .then(resposta => setCategorias(resposta.data))
      axios.get('http://localhost:4000/beers', { headers: headers})
      .then(resposta => setBebidas(resposta.data))
    }
  }, [])

  return (
    <div>
      <Header />
      <ul className="categories">
        {
          categorias !== undefined &&
          categorias.map((item: any) => (
            <li key={item}>{item}</li>
          ))
        }
      </ul>
      <div className="bebidas">
      {
        bebidas !== undefined &&
        bebidas.map((item: any) => (
          <div key={item.id} className="cardBebida">
            <img src={item.image} alt={item.title}/>
            <p>{item.description}</p>
            <h1>{item.title}</h1>
            <p>R$ {item.price}</p>
            <div className="buy-button">              
              <button onClick={() => handleAddProduct(item)}>
                <div>
                  <FiShoppingBag size={16}  className="shop-bag"/>
                  {amount[item.id] || 0}
                </div>
                <span>Adicionar</span>                
              </button>
            </div>            
          </div>
        ))
      }
      </div>      
      {
        token === null &&
        <Redirect to="/cadastro" />        
      }
    </div>
  )
}

export default Home