
import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {useState,useContext} from 'react'
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection'
import {FiSettings,FiUpload} from 'react-icons/fi'
import {AuthContext} from '../../contexts/auth'
import { toast } from 'react-toastify'

export default function Profile(){

    const {user,loadingButtons,setLoadingButtons, logout,setUser,storageUser,} = useContext(AuthContext)
    const [nome,setNome] = useState(user && user.nome)
    const [email,setEmail] = useState(user && user.email)
    const [avatarUrl,setAvatarUrl] = useState(user && user.avatarUrl)
    const [imagemAvatar,setImagemAvatar] = useState(null)

    async function handleSave(e){
        e.preventDefault()
        console.log('salvando');

        if(imagemAvatar === null && nome != null){
            setLoadingButtons(true)
             await firebase.database().ref().child('users/' + user.uid).set({
                nome: nome,
                avatarUrl: ''
             })
             .then(()=>{
                let data ={
                             ...user,
                             nome:nome
                         }
        
                setUser(data)
                storageUser(data)
                toast.info('Dados atualizados')
                setLoadingButtons(false)
             })
             .catch((e)=>{
                 console.log(e);
                 setLoadingButtons(false)
             })
        }
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title nome="Meu Perfil">
                    <FiSettings size={25}/>
                </Title>
            
            <div className="container">
                <form className="form-profile">
                    <label className="label-avatar">
                    <span>
                        <FiUpload size={25} color="#FFF"/>
                    </span>

                    <input type="file" accept="image/*"/> <br />
                    {avatarUrl === '' ? 
                        <img src={avatar} width="250" height="250" alt="foto avatar" />
                        :
                        <img src={avatarUrl} width="250" height="250" alt="foto avatar" />
                    }
                    </label>

                    <label>Nome</label>
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)}/>

                    <label>Email</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} disabled/>

                    <button type="submit" onClick={handleSave}>{loadingButtons ? 'Salvando...' : 'Salvar'}</button>
                </form>
            </div>

            <div className="container">
                <button className="logout-btn" onClick={logout}> Sair </button>
            </div>
            
            </div>


        </div>
    )
}