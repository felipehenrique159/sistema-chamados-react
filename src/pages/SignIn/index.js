import {useState, useContext} from 'react'
import './sign.css'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/auth'

export default function SignIn() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [redefinirSenha,setRedefinirSenha] = useState(false)
  
  const {signIn,loadingAuth,resetPassword} = useContext(AuthContext)

  function handleSubmit(e){
    e.preventDefault()
    signIn(email,password)
  }

  function handleResetSenha(e){
    e.preventDefault()
    setRedefinirSenha(true)
  }

  function handleSubmitResetSenha(e){
    e.preventDefault()
    resetPassword(email)
  }

  function handleVoltaLogin(e){
    e.preventDefault()
    setRedefinirSenha(false)
  }
 
  return (
      <div className="container-center">
        <div className="login">
            <div className="login-area">
              <img src={logo} alt="Sistema Logo" />
            </div>

            <form onSubmit={handleSubmit}>
              <h1>{!redefinirSenha ? 'Entrar' : 'Redefinir senha'}</h1>
              <input type="email" placeholder="email@email.com" value={email} onChange={e=> setEmail(e.target.value)}/>
              {!redefinirSenha &&               
                    <input type="password" placeholder="******" value={password} onChange={e=> setPassword(e.target.value)}/>     
                  }
               {!redefinirSenha && <button type="submit" onClick={handleSubmit}>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>}   
                {redefinirSenha && <button type="submit" onClick={handleSubmitResetSenha}>{ loadingAuth ? 'Enviando...' :'Redefinir Senha'}</button>}
            </form>

           <div className="btnGroup">
            <Link to="/register">Não tenho login | </Link>
            {
              !redefinirSenha ? <button  className="btnResetPassword" onClick={handleResetSenha}>Redefinir senha</button>:
              <button className="btnResetPassword" onClick={handleVoltaLogin}>Logar</button>
            }
           </div>
        </div>
      </div>
    )
  }