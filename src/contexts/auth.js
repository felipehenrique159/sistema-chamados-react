import {useState, createContext, useEffect} from 'react'
import firebase from '../services/firebaseConnection'
import {toast} from 'react-toastify'
export const AuthContext = createContext({})

function AuthProvider({children}){

    const [user,setUser] = useState(null)
    const [loadingAuth,setLoadingAuth] = useState(false)
    const [loading,setLoading] = useState(true)
    const [loadingButtons,setLoadingButtons] = useState(false)

    useEffect(()=>{

        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser')
            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
    
            setLoading(false)
        }

        loadStorage()
       

    },[])

    async function signUp(nome,email,password){
        setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async(res)=>{

            let uid = res.user.uid
            await firebase.database().ref().child('users/' + uid).set({
                nome:nome,
                avatarUrl:''
             })
             .then(()=>{
                let data = {
                            uid : uid,
                            nome:nome,
                            email:  res.user.email,
                            avatarUrl: '',
                            fotoAntiga:''
                        }
                        setUser(data)
                        storageUser(data)
                        setLoadingAuth(false)
                        toast.success(`Bem vindo a plataforma ${nome}`)
             })
             .catch((e)=>{
                 console.log(e);
             })

        }).catch((e)=>{
            console.log(e);
            setLoadingAuth(false)
        })
    }

    function storageUser(data){
        localStorage.setItem('SistemaUser',JSON.stringify(data))
    }

    async function logout() { 
        await firebase.auth().signOut()
        .then(()=>{
          localStorage.removeItem('SistemaUser')
          setUser(null)
        })
       
       }

    async function signIn(email,password){
        setLoadingAuth(true)
        await firebase.auth().signInWithEmailAndPassword(email,password)
        .then( async(res)=>{
            let uid = res.user.uid
        
          await firebase.database().ref('users/' + uid).get()
         .then((res)=>{
            
            let data = {
                uid:uid,
                nome: res.val().nome,
                avatarUrl: res.val().avatarUrl ? res.val().avatarUrl : '',
                fotoAntiga: res.val().urlFotoAntiga ? res.val().urlFotoAntiga : '',
                email: email

            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success(`Bem vindo de volta ${res.val().nome}`)
        
        })
        })
        .catch((e)=>{
            if(e.code === 'auth/wrong-password'){
                toast.error('Usuario ou senha incorreta!')
            }
            else if(e.code === 'auth/too-many-requests'){
                toast.error('Muitas tentativa de erro, aguarte uns instantes!')
            }
            
            else if(e.code === 'auth/invalid-email' || e.code === 'auth/user-not-found'){
                toast.error('E-mail inválido!')
            }
            console.log(e);
            setLoadingAuth(false)
        })
    }

    async function resetPassword(email){
        setLoadingAuth(true)
        await firebase.auth().sendPasswordResetEmail(email)
        .then(()=>{
            setLoadingAuth(false)
            toast.info('O link para redefinição foi enviado no E-mail')
        })
        .catch((e)=>{
            console.log(e.code);
            setLoadingAuth(false)
            if(e.code == 'auth/too-many-requests'){
                toast.error('Muitas tentativas aguarde uns instantes')
            }
            if(e.code == 'auth/user-not-found'){
                toast.error('Endereço de e-mail não cadastrado')
            }
            if(e.code == 'auth/invalid-email'){
                toast.error('Endereço de e-mail inválido')
            }
        })
    }

    

    return(
        <AuthContext.Provider value={{ signed: !! user,
         user , loadingButtons,setLoadingButtons ,  signUp,logout,signIn,loadingAuth
         ,resetPassword,setUser,storageUser}}> 
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider