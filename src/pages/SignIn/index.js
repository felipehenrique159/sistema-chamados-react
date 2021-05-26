import {useState} from 'react'
import './sign.css'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'

export default function SignIn() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    
  }

  return (
      <div className="container-center">
        <div className="login">
            <div className="login-area">
              <img src={logo} alt="Sistema Logo" />
            </div>

            <form onSubmit={handleSubmit}>
              <h1>Entrar</h1>
              <input type="email" placeholder="email@email.com" value={email} onChange={e=> setEmail(e.target.value)}/>
              <input type="password" placeholder="******" value={password} onChange={e=> setPassword(e.target.value)}/>
              <button type="submit">Acessar</button>
            </form>

            <Link to="/register">Não tenho login</Link>
        </div>
      </div>
    )
  }