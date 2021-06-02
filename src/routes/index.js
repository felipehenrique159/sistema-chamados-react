import {Switch} from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Customers from '../pages/Customers'
import New from '../pages/New'
import Route from './Route'

export default function Routes(){
    return(
        <Switch>
            <Route path="/" component={SignIn} exact/>
            <Route path="/register" component={SignUp} exact/>
            <Route path="/dashboard" component={Dashboard} isPrivate exact/>
            <Route path="/profile" component={Profile} isPrivate exact/>
            <Route path="/customers" component={Customers} isPrivate exact/>
            <Route path="/new" component={New} isPrivate exact/>
            <Route path="/new/:id" component={New} isPrivate exact/>
        </Switch>
    )
}