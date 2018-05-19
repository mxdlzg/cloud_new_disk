import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Detail from "./Detail";
import Login from "./Login";
import Home from "./Home";
import User from "./User"
import Uploader from "./Uploader";
import {PropsRoute, PublicRoute, PrivateRoute} from 'react-router-with-props';

class Main extends React.Component {

    render() {
        return (
            <Switch>
                <PropsRoute exact path='/' component={Login} test={"aatest"} onToast={this.props.onToast}/>
                <Route path='/home' render={() => <Home handler={this.props.handler} onToast={this.props.onToast}/>}/>
                <Route path='/detail' component={Detail}/>
                <Route path='/user' component={User}/>
                <Route path='/uploader' component={Uploader}/>
            </Switch>
        );
    }
}

export default Main;