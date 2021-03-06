import {useState, useContext} from 'react'
// import './sign.css'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/auth'
import { toast } from 'react-toastify'

export default function SignUp() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [nome,setNome] = useState('')

  const {signUp,loadingAuth} = useContext(AuthContext)

  function handleSubmit(e){
    e.preventDefault()
    if(nome !== '' && email !== '' && password !==''){
      signUp(nome,email,password)
    }
    else{
      toast.error('Preencha todos os campos!')
    }
  }

  return (
      <div className="container-center">
        <div className="login">
            <div className="login-area">
              <img src={logo} alt="Sistema Logo" />
            </div>

            <form onSubmit={handleSubmit}>
              <h1>Cadastrar uma conta</h1>
              <input type="text" placeholder="Nome sobrenome" value={nome} onChange={e=> setNome(e.target.value)}/>
              <input type="email" placeholder="email@email.com" value={email} onChange={e=> setEmail(e.target.value)}/>
              <input type="password" placeholder="******" value={password} onChange={e=> setPassword(e.target.value)}/>
              <button type="submit">{loadingAuth ? 'Carregando...' : 'Registrar'}</button>
            </form>

            <Link to="/">Possui tem uma conta? logue aqui</Link>
        </div>
      </div>
    )
  }