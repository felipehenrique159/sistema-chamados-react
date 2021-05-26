import {Switch} from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Route from './Route'

export default function Routes(){
    return(
        <Switch>
            <Route path="/" component={SignIn} exact/>
            <Route path="/register" component={SignUp} exact/>
            <Route path="/dashboard" component={Dashboard} isPrivate exact/>
        </Switch>
    )
}