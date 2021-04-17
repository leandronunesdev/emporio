import axios from "axios"
import { useRef, useState } from "react"
import { Redirect } from "react-router"
import { Icon, Logo } from '../../components/Logo'

import './Cadastro.scss'

const Cadastro = () => {

  const inputName = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)
  const inputAge = useRef<HTMLInputElement>(null)

  const [logado, setLogado] = useState(false)

  const Cadastrar = () => {    

    const requisicao = {
      name: inputName.current?.value,
      email: inputEmail.current?.value,
      password: inputPassword.current?.value,
      age: inputAge.current?.valueAsNumber
    }

    if(inputAge.current?.valueAsNumber !== undefined && inputAge.current?.valueAsNumber >= 18) {
      axios.post("http://localhost:4000/register", requisicao)
      .then(resposta => {
        localStorage.setItem("token", resposta.data.accessToken)
        setLogado(true)
      })
    } else {
      alert('Você precisa ter 18 anos para acessar esse site!')
    }
  }

  return (
    <div className="register-form">
      <div className="form-header">
        <Icon />
        <Logo />
        <p>Cadastre-se</p>
      </div>      
      <input type="text" placeholder="Nome" ref={inputName}/>
      <input type="email" placeholder="Email" ref={inputEmail}/>
      <input type="password" placeholder="Senha" ref={inputPassword}/>
      <input type="number" placeholder="Idade" ref={inputAge}/>
      <button onClick={Cadastrar}>Cadastrar</button>
      {
        logado && <Redirect to='/' />
      }
    </div>  
  )
}

export default Cadastro