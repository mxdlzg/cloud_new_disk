import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Detail from "./Detail";
import Login from "./Login";
import Home from "./Home";


class Main extends React.Component{

    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/detail' component={Detail}/>
                </Switch>
            </main>
        );
    }
}

export default Main;