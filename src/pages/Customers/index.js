
import './customers.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiUser} from 'react-icons/fi'
import {useState} from 'react'
import firebase from '../../services/firebaseConnection'
import {toast} from 'react-toastify'
import { uid } from 'uid'

export default function Customers(){

    const [nomeFantasia,setNomeFantasia] = useState('')
    const [cnpj,setCnpj] = useState('')
    const [endereco,setEndereco] = useState('')

    async function handleCadastar(e){
        e.preventDefault()
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
            let caminho = 'customers/' + uid(16);
            let id = caminho.split('/')
            await firebase.database().ref('customers/' + uid(16)).set({
                nomeFantasia: nomeFantasia,
                cnpj:cnpj,
                endereco:endereco
            })
            .then(()=>{
                setCnpj('')
                setEndereco('')
                setNomeFantasia('')
                toast.success('Cliente cadastrado com sucesso!')
            })
            .catch((e)=>{
                console.log(e);
                toast.error('Erro ao cadastrar!')
            })            
         
        }
        else{
            toast.error('Preencha todos os campos!')
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
                        <label>Nome Fantasia</label>
                        <input type="text" value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} />
                        <label>Cnpj</label>
                        <input type="text" value={cnpj} onChange={e => setCnpj(e.target.value)} />
                        <label>Endereço</label>
                        <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} />
                        <button type="submit" onClick={handleCadastar}>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}