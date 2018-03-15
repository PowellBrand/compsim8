import React from 'react';
import {
    Route,
    Switch
} from "react-router-dom";
import auth from './components/auth/auth'
import dashboard from './components/dashboard/dashboard'


export default function Router() {
    return (

            <Switch>
                <Route path="/" component={auth} exact/>
                <Route path="/dashboard" component={dashboard} />
               
              
            </Switch>

    )
}