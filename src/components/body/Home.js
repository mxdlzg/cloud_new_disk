import React from 'react'
import PropTypes from 'prop-types';
import "./Home.css"
import {withStyles} from 'material-ui/styles';
import HomeTree from "./HomeTree";

const styles = theme => ({

});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.handler(true);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <HomeTree/>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Home);