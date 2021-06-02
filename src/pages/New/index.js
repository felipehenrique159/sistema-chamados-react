import Header from '../../components/Header'
import Title from '../../components/Title'
import './new.css'
import {FiPlusCircle,FiEdit} from 'react-icons/fi'
import {useParams,useHistory} from 'react-router-dom'
import {useEffect,useState,useContext} from 'react'
import {AuthContext} from '../../contexts/auth'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'
import { uid } from 'uid'

export default function New(){

    const [loadCustomers,setLoadCustomers] = useState(false)
    const [customers,setCustomers] = useState([])
    const [customersSelected,setCustomersSelected] = useState(0)
    const [cliente,setCliente] = useState('')
    const [assunto,setAssunto] = useState('Suporte')
    const [status,setStatus] = useState('Aberto')
    const [complemento,setComplemento] = useState('')
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const history = useHistory()
    const [idCustomers,setIdCustomers] = useState(false)

    async function loadId(lista){
        await firebase.database().ref().child('chamados/' + id).get()
        .then((res)=>{
            // console.log(res.val().);
            setAssunto(res.val().assunto)
            setStatus(res.val().status)
            setComplemento(res.val().complemento)
            
            let index = lista.findIndex( 
                item => item.id === res.val().clienteId
                )
            setCustomersSelected(index)
            setIdCustomers(true)

        })
        .catch((e)=>{
            setIdCustomers(false)
            console.log(e);
        })
    }

    async function handleRegister(e){
        e.preventDefault()
        let now = new Date();
        let dataAtual = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`

        if(idCustomers){
            await firebase.database().ref().child('chamados/' + id)
            .update({ 
                updated : dataAtual,
                cliente : customers[customersSelected].nomeFantasia,
                clienteId:customers[customersSelected].id,
                assunto : assunto,
                status : status,
                complemento:complemento,
                userId: user.uid
            })
            .then(()=>{
                toast.success('Chamado atualizado')
                setCustomersSelected(0)
                history.replace('/')
            })
            .catch((e)=>{
                console.log(e);
                toast.error('Erro ao atualizar chamado')
            })
        }
        else{ 
            await firebase.database().ref().child('chamados/' + uid(16)).set({
                created: dataAtual,
                cliente : customers[customersSelected].nomeFantasia,
                clienteId:customers[customersSelected].id,
                assunto : assunto,
                status : status,
                complemento:complemento,
                userId: user.uid
            })
            .then(()=>{
                setComplemento('')
                setCustomersSelected(0)
                setAssunto('Suporte')
                setStatus('Aberto')
                toast.success('Chamado cadastrado com sucesso!')
            })
            .catch((e)=>{
                console.log(e);
                toast.error('Erro ao cadastrar chamado!')
            })
            console.log(customers[customersSelected]);
            }
        
        
    }
    
    function handleChangeSelect(e){
        setAssunto(e.target.value)
    }
    
    function handleOptionChange(e){
        setStatus(e.target.value)
    }
   
    function handleChangeCustomers(e){
        console.log('cliente selecionado' , customers[e.target.value].id);
        setCustomersSelected(e.target.value)
       
    }

    useEffect(()=>{
        async function loadCustomers() { 
            
            await firebase.database().ref('customers').get()
            .then((res)=>{
                let lista = []

                lista.push({
                    id: '',
                    nomeFantasia : 'Selecione...'
                })

                res.forEach((dados)=>{
                    lista.push({
                        id: dados.key,
                        nomeFantasia:dados.val().nomeFantasia,
                    })
                })
                
                if(lista.length === 0){
                    toast.info('Nenhuma empresa encontrada')
                    return;
                }
                setCustomers(lista)
                setLoadCustomers(true)

                if(id){
                    loadId(lista)
                }
            })
            .catch((e)=>{
                console.log(e);
                setCustomers([{id: '',nomeFantasia:'Selecione...'}])
            })
         }
         loadCustomers()
    },[])


    return(
        <div>
            <Header/>
            <div className="content">
               { idCustomers ?
                 <Title nome="Editar Chamado">
                 <FiEdit size={25}/>
                 </Title>
                : 
                <Title nome="Novo Chamados">
                    <FiPlusCircle size={25}/>
                </Title>
               
            }
            <div className="container">
                <form className="form-profile">
                    <label>Cliente</label>

                    {!loadCustomers ? 
                    (
                        <input type="text" disabled value="Carregando clientes..." />
                    ) :(
                    <select value={customersSelected}   onChange={handleChangeCustomers}>
                    {customers.map((item,index) =>{
                        return(
                            <option key={item.id} value={index}>
                                {item.nomeFantasia}
                            </option>
                        )
                    })}
                    </select>

                )}

                   
                    <label>Assunto</label>
                    <select value={assunto} onChange={handleChangeSelect}>
                        <option value="Suporte">Suporte</option>
                        <option value="Redes">Redes</option>
                  
                    </select>

                    <label>Status</label>
                    <div className="status">
                        <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} checked={status === 'Aberto'}/>
                        <span>Aberto</span>
                        
                        <input type="radio" name="radio" value="Progresso" onChange={handleOptionChange} checked={status === 'Progresso'}/>
                        <span>Progresso</span>
                        
                        <input type="radio" name="radio" value="Atendido" onChange={handleOptionChange} checked={status === 'Atendido'}/>
                        <span>Atendido</span>
                    </div>
                    
                    <label>Complemento</label>
                    <textarea type="text" placeholder="Descreva seu problema(Opcional)" value={complemento} onChange={e => setComplemento(e.target.value)}/>
                    <button type="submit" onClick={handleRegister}>
                        {idCustomers ? 
                            'Editar'
                            : 'Registrar'
                        }
                    </button>
                </form>

            </div>
            </div>



        </div>
    )
}