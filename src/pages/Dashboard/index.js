import {useState, useEffect} from 'react'
import Header from '../../components/Header'
import ModalChamado from '../../components/ModalChamado'
import {FiMessageSquare,FiPlus,FiSearch,FiEdit2} from 'react-icons/fi'
import Title from '../../components/Title'
import {Link} from 'react-router-dom'
import './dashboard.css'
import firebase from '../../services/firebaseConnection'

export default function Dashboard() {

  const [chamados,setChamados] = useState([])
  const [showPostModal,setShowPostModal] = useState(false)
  const [detail,setDetail] = useState()

  useEffect(()=>{
    
    async function loadChamados() {
     var dados = await firebase.database().ref('chamados')
     dados.on('value', (res) => {  //evento para ficar em tempo real

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
    });
     
    } 
    loadChamados()
  },[])


  function togglePostModal(chamado){
    setShowPostModal(!showPostModal) //trocando de true pra false ou vice versa
    setDetail(chamado)
  }

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
                        <span className="badge" style={{backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : '#999'}}>{chamado.status}</span>
                      </td>
                      <td data-label="Cadastrado">{chamado.created}</td>
                      <td data-label="#">
                          <button onClick={() =>{ togglePostModal(chamado)}} className="action" style={{backgroundColor :'#3583f6'}}>
                            <FiSearch color="#FFF" size={17}/>
                          </button>
                          <Link to={`/new/${chamado.id}`} className="action" style={{backgroundColor : '#F6a935'}}>
                            <FiEdit2 color="#FFF" size={17}/>
                          </Link>
                      </td>
                    </tr>

                     )
                   })}
                      
                  </tbody>
                </table>

            </>
          )}

         

          </div>

         {showPostModal && (
           <ModalChamado chamado={detail}
            close={togglePostModal}
           />
         )}

      </div>
    )
  }