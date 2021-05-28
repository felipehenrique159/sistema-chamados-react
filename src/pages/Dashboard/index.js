import {useState, useContext, useEffect} from 'react'
import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header'
import {FiMessageSquare,FiPlus,FiSearch,FiEdit2} from 'react-icons/fi'
import Title from '../../components/Title'
import {Link} from 'react-router-dom'
import './dashboard.css'
import firebase from '../../services/firebaseConnection'

export default function Dashboard() {

  const {user,logout} = useContext(AuthContext)
  const [chamados,setChamados] = useState([])

  function handleLogout(){
    logout()
  }

  useEffect(()=>{
    
    async function loadChamados() {
      await firebase.database().ref('chamados').get()
      .then((res)=>{
        let lista = []
  
          res.forEach((chamado)=>{
            lista.push({
              id : chamado.key,
              assunto : chamado.val().assunto,
              cliente : chamado.val().cliente,
              clienteId : chamado.val().clienteId,
              complemento : chamado.val().complemento,
              created : chamado.val().created,
              status : chamado.val().status,
              userId : chamado.val().userId
            })
           
          })
          setChamados(lista)
      })
      .catch((e)=>{
        console.log(e);
      })
    } 

    loadChamados()

  },[])

    return (
      <div>
        <Header/>
          <div className="content">
              <Title nome="Atendimentos">
                    <FiMessageSquare size={25}/>
              </Title>
              

          {chamados.length === 0 ? (
             <div className="container dashboard">
                <span>Nenhum chamado registrado</span>
                <Link to="/new" className="new">
                  <FiPlus size={25} color="#FFF"/>
                    Novo chamado
                </Link>
              </div>
          ) : (
            <>
                <Link to="/new" className="new">
                <FiPlus size={25} color="#FFF"/>
                  Novo chamado
                </Link>

                <table>
                  <thead>
                    <tr>
                      <th scope="col">Cliente</th>
                      <th scope="col">Assunto</th>
                      <th scope="col">Status</th>
                      <th scope="col">Cadastrado em</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                   {chamados.map((chamado)=>{
                     return(

                      <tr key={chamado.id}>
                      <td data-label="Cliente">{chamado.cliente}</td>
                      <td data-label="Suporte">{chamado.assunto}</td>
                      <td data-label="Status">
                        <span className="badge" style={{backgroundColor: '#5cb85c'}}>{chamado.status}</span>
                      </td>
                      <td data-label="Cadastrado">{chamado.created}</td>
                      <td data-label="#">
                          <button className="action" style={{backgroundColor :'#3583f6'}}>
                            <FiSearch color="#FFF" size={17}/>
                          </button>
                          <button className="action" style={{backgroundColor : '#F6a935'}}>
                            <FiEdit2 color="#FFF" size={17}/>
                          </button>
                      </td>
                    </tr>

                     )
                   })}
                      
                  </tbody>
                </table>

            </>
          )}

         

          </div>

         

         {/* <button onClick={handleLogout}>LOGOUT</button> */}
      </div>
    )
  }