import React, {Component} from 'react';
import logo from '../../logo.svg';
import 'typeface-roboto'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from 'material-ui/Switch';
import {FormControlLabel, FormGroup} from 'material-ui/Form';
import Menu, {MenuItem} from 'material-ui/Menu';
import classNames from 'classnames';
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';
import {Drawer} from "material-ui";
import Divider from "material-ui/es/Divider/Divider";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from 'material-ui/List';
import {Link} from 'react-router-dom'
import Main from "../body/Main";

const styles = theme => ({
    bg: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        backgroundColor:'grey'
    },
});

const bg = {
    flexGrow: 1,
    height: 600,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    backgroundColor:'#f0f0f0'
};

class Login extends React.Component {
    render() {
        const {classes} = styles;
        return (
            <div style={bg}>
                <h1>This is Login Page!!!</h1>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Login);
