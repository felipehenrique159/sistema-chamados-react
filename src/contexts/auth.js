import {useState, createContext, useEffect} from 'react'
import firebase from '../services/firebaseConnection'
import {toast} from 'react-toastify'
export const AuthContext = createContext({

})

function AuthProvider({children}){

    const [user,setUser] = useState(null)
    const [loadingAuth,setLoadingAuth] = useState(false)
    const [loading,setLoading] = useState(true)

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
            
            await firebase.firestore().collection('users')
            .doc(uid)
            .set({
                nome:nome,
                avatarUrl:null
            })
            .then(()=>{
                let data = {
                    uid : uid,
                    nome:nome,
                    email:  res.user.email,
                    avatarUrl: null
                }
                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success('Bem vindo a plataforma')
            })
            .catch((e)=>{
                console.log(e);
                setLoadingAuth(false)
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
            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get()
            console.log(userProfile.data());
            let data = {
                uid:uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: email

            }
            console.log(data);

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success('Bem vindo de volta :)')
        })
        .catch((e)=>{
            console.log(e);
            setLoadingAuth(false)
        })
    }

    

    return(
        <AuthContext.Provider value={{ signed: !! user, user , loading, signUp,logout,signIn,loadingAuth}}> 
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider