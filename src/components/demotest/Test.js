import React from 'react'

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''}
    }

    componentDidMount() {
        this.setState({name: this.props.name});
    }

    handleUpdate(updatedName) {
        this.setState({name: updatedName});
    }

    render() {
        return (
            <div>
                {this.state.name}<br/>
                <Child name={this.state.name} onUpdate={this.handleUpdate.bind(this)}/>
            </div>
        )
    }
}

export default Parent;


class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({name: this.props.name});
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
        this.props.onUpdate(e.target.value);
    }

    handleUpdate() {
        // ajax call that updates database with updated name and then on success calls onUpdate(updatedName)
    }

    render() {
        console.log("props: " + this.props.name); // after update, this logs the updated name
        console.log("state: " + this.state.name); // after update, this logs the initial name until I refresh the brower
        return <div>
            {this.state.name}
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
            <input type="button" value="Update Name" onClick={this.handleUpdate.bind(this)}/>
        </div>
    }
}