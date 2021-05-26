import {useState, useContext} from 'react'
import {AuthContext} from '../../contexts/auth'

export default function Dashboard() {

  const {user,logout} = useContext(AuthContext)


  function handleLogout(){
    logout()
  }

    return (
      <div>
         <h1>Pagina de dashboard</h1>
          bem vindo {user.nome}
         <br />
         <button onClick={handleLogout}>LOGOUT</button>
      </div>
    )
  }