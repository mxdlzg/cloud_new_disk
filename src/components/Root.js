import React from 'react'
import Navigation from "./navigation/Navigation";
import Main from "./body/Main";

class Root extends React.Component {
    render() {
        return (
            <div>
                <Navigation/>
            </div>
        );
    }
}

export default Root;