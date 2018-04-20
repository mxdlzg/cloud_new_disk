import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom'
import 'typeface-roboto'
import './Login.css'
import logo from '../../logo.svg';
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
import {Drawer, FormControl, Grid, Input, InputAdornment, InputLabel, Paper, TextField} from "material-ui";
import Divider from "material-ui/es/Divider/Divider";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from 'material-ui/List';
import {Link} from 'react-router-dom'
import Main from "../body/Main";
import {Button} from 'material-ui'
import {Visibility, VisibilityOff} from "@material-ui/icons/es/index";


class Login extends React.Component {
    state = {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleLogin = event=>{
        this.props.history.push('/home');
    };

    render() {
        const { classes } = this.props;

        return (
            <div className="Login-bg">
                    <Paper className="Login-panel" elevation={4}>
                        <img src={logo} className="Login-logo" alt="logo" />
                        <div>
                            <TextField
                                className="Login-input"
                                id="name"
                                label="Name"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <FormControl  className="Login-input">
                                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                <Input
                                    id="adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                            >
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                        <Button className="Login-button" onClick={this.handleLogin}>登录</Button>
                    </Paper>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default (Login);
