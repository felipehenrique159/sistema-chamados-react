import {BrowserRouter} from 'react-router-dom'
import Routes from './routes'
import AuthProvider from './contexts/auth'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes/>
        <ToastContainer autoClose={3000}/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
