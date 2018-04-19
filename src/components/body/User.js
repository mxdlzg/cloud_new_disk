import React from 'react'

class User extends React.Component {
    constructor(props){
        super();
        this.props = props;
    }

    render() {
        return (
            <div>
                <h2>This is a user page!</h2>
            </div>
        );
    }
}

export default User;