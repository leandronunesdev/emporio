import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Icon, Logo } from "../Logo"
import { GrCart } from 'react-icons/gr';

import './Header.scss'

const Header = () => {  

  const cartSize = useSelector((state: any) => state.cart.CartItens.length)

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <Icon />
          <Logo />
        </Link>
      </div>  
      <div>
        <Link to="/carrinho" className="cart">
          <GrCart size={36} className="cart-icon"/>
          <p>{cartSize}</p>
        </Link>       
      </div>            
    </div>   
  )
}

export default Header