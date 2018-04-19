import React from 'react'
import {Switch, Route} from "react-router-dom";
import User from "./User";

const DetailPage = () => (
    <div>
        <h2>This is a DetailPage page!</h2>
    </div>
);

class Detail extends React.Component {

    render() {
        return (
            <div>
                <h2>This is a roster page!</h2>
                <Switch>
                    <Route exact path='/detail' component={DetailPage}/>
                    <Route path='/detail/:user' component={User}/>
                </Switch>
            </div>
        );
    }
}

export default Detail;