import React from 'react'


class Home extends React.Component{
    constructor(props){
        super(props);
        this.props.handler(true);
    }

    render(){
        return(
            <div>
                <h2>This is a Home page!</h2>
            </div>
        );
    }
}

export default Home;