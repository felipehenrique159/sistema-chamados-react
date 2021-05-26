import {useState, useContext} from 'react'
import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header'
export default function Dashboard() {

  const {user,logout} = useContext(AuthContext)


  function handleLogout(){
    logout()
  }

    return (
      <div>
        <Header/>
         <button onClick={handleLogout}>LOGOUT</button>
      </div>
    )
  }