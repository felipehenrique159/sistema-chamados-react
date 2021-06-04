
import './customers.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiUser, FiSearch} from 'react-icons/fi'
import {useState} from 'react'
import firebase from '../../services/firebaseConnection'
import {toast} from 'react-toastify'
import { uid } from 'uid'
import axios from 'axios'
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import {useContext} from 'react'
import {AuthContext} from '../../contexts/auth'

export default function Customers(){

    const {loadingButtons,setLoadingButtons} = useContext(AuthContext)

    const [nomeFantasia,setNomeFantasia] = useState('')
    const [cnpj,setCnpj] = useState('')
    const [logradouro,setLogradouro] = useState('')
    const [numero,setNumero] = useState('')
    const [bairro,setBairro] = useState('')
    const [cidade,setCidade] = useState('')
    
    async function handleCadastar(e){
        e.preventDefault()
        setLoadingButtons(true)
        if(nomeFantasia !== '' && cnpj !== ''){

            await firebase.database().ref('customers').get()
            .then(async(res)=>{
                let cnpjExistente = false
                res.forEach((customer)=>{
                    if(customer.val().cnpj === cnpj.replace(/[^\d]+/g,'')){
                        cnpjExistente = true
                        toast.error('Cnpj já cadastrado')
                        setLoadingButtons(false)
                    }
                })

                if(!cnpjExistente){
                    await firebase.database().ref('customers/' + uid(16)).set({
                        nomeFantasia: nomeFantasia,
                        cnpj:cnpj.replace(/[^\d]+/g,''),
                        logradouro:logradouro,
                        numero:numero,
                        bairro:bairro,
                        cidade:cidade
                    })
                    .then(()=>{
                        setCnpj('')
                        setLogradouro('')
                        setNomeFantasia('')
                        setBairro('')
                        setNumero('')
                        setCidade('')
                        toast.success('Cliente cadastrado com sucesso!')
                        setLoadingButtons(false)
                    })
                    .catch((e)=>{
                        console.log(e);
                        toast.error('Erro ao cadastrar!')
                        setLoadingButtons(false)
                    })  
                }
                
            })
            
            
        }
        else{
            toast.error('Preencha todos os campos!')
            setLoadingButtons(false)
        }
        
    }

    async function buscarCnpjReceita(e) {
        e.preventDefault()
        if(cnpj !== ''){
            try {    
                const response = await axios.get(`https://60b50cb898de69e51d790ca6--optimistic-swartz-985c39.netlify.app/.netlify/functions/api/buscaDadosReceita/${cnpj.replace(/[^\d]+/g,'')}`)       
                console.log(response.data) 
                if(response.data.nome){
                    toast.info('Dados encontrados')
                    setNomeFantasia(response.data.nome)
                    setLogradouro(response.data.logradouro)
                    setNumero(response.data.numero)
                    setBairro(response.data.bairro)
                    setCidade(response.data.municipio)
                }
                else{
                    if(response.data.message == 'Request failed with status code 429'){
                        toast.error('Erro ao consultar dados, aguarde ums instantes')
                    }
                    else{
                        toast.error(response.data.message)
                    }
                }
            } catch (error) {
                toast.error('Erro ao consultar dados')
                console.log(error);
            }
        }
        else{
            toast.error('Preencher campo Cnpj')
        }
      
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title nome="Clientes">
                    <FiUser size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label>Cnpj</label>
                        <div className="cnpj">
                            <CpfCnpj
                            type="text" value={cnpj} onChange={e => {
                                setCnpj(e.target.value);
                            }}  />
                            <button onClick={buscarCnpjReceita}>
                            <FiSearch/> <span>Buscar</span>
                        </button>
                        </div>
                        <label>Razão Social</label>
                        <input type="text" value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} />
                        <label>Logradouro</label>
                        <input type="text" value={logradouro} onChange={e => setLogradouro(e.target.value)} />
                        <label>Número</label>
                        <input type="text" value={numero} onChange={e => setNumero(e.target.value)} />
                        <label>Bairro</label>
                        <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} />
                        <label>Cidade</label>
                        <input type="text" value={cidade} onChange={e => setCidade(e.target.value)} />
                        <button type="submit" onClick={handleCadastar}>{loadingButtons ? 'Salvando...' : 'Cadastrar'}</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}