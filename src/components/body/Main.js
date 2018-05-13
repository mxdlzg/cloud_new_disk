import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Detail from "./Detail";
import Login from "./Login";
import Home from "./Home";
import User from "./User"
import Uploader from "./Uploader";


class Main extends React.Component{

    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/home' render={()=><Home handler={this.props.handler}/>}/>
                    <Route path='/detail' component={Detail}/>
                    <Route path='/user' component={User}/>
                    <Route path='/uploader' component={Uploader}/>
                </Switch>
            </main>
        );
    }
}

export default Main;