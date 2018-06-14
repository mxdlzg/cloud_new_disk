import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
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
import {Drawer, FormControl, Grid, Input, InputAdornment, InputLabel, Paper, Snackbar, TextField} from "material-ui";
import Divider from "material-ui/es/Divider/Divider";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from 'material-ui/List';
import {Link} from 'react-router-dom'
import Main from "../body/Main";
import {Button} from 'material-ui'
import {Visibility, VisibilityOff} from "@material-ui/icons/es/index";
import $ from 'jquery';
import {withCookies, Cookies} from 'react-cookie';

const styles = theme => ({
    registerPanel: {
        margin: 'auto',
        height: 450,
        width: 400,
        position: 'relative',
        textAlign: 'center'
    }
});

class Register extends React.Component {
    state = {
        user: '',
        password: '',
        passwordConfirm: '',
        error: false,
        invitation: '',
        amount: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
        msg: ''
    };

    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value,
        }, () => {
            if (prop == "passwordConfirm" || prop == "password") {
                this.setState({
                    error: this.state.password == this.state.passwordConfirm ? false : true
                })
            }
        });

    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    //__________________Event_____________________//
    handleRegister = (event) => {
        if (this.state.user.length == 0 || this.state.error || this.state.invitation.length == 0) {
            this.props.onToast("请填写注册信息");
            return;
        }

        $.ajax("http://localhost/CloudDiskServer/ServerOP/StartListener.php", {
            type: "POST",
            data: {
                clientType: "register",
                user: this.state.user,
                password: this.state.password,
                invitation: this.state.invitation
            },
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (data, status) {
                if (status) {
                    let rst = data;
                    switch (rst["status"]) {
                        case 11:
                            this.props.onToast(rst["msg"]);
                            this.props.history.push('/');
                            break;
                        case 12:
                            this.props.onToast(rst["msg"]);
                            break;
                        default:
                            break;
                    }
                } else {
                    this.props.onToast("请求失败");
                }
            }.bind(this),
            error: function (msg) {
                alert(JSON.stringify(msg));
            }
        });
    };

    render() {
        const {classes} = this.props;
        const {error} = this.state;

        return (
            <div className="Login-bg">
                <Paper className={classes.registerPanel} elevation={4}>
                    <img src={logo} className="Login-logo" alt="logo"/>
                    <div>
                        <TextField
                            className="Login-input"
                            id="name"
                            label="Name"
                            name="user"
                            value={this.state.user}
                            onChange={this.handleChange('user')}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <FormControl className="Login-input">
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <Input
                                id="adornment-password"
                                name="password"
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
                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    <div>
                        {error ? <FormControl className="Login-input" error>
                                <InputLabel htmlFor="adornment-password">Password Confirm</InputLabel>
                                <Input
                                    id="adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.passwordConfirm}
                                    onChange={this.handleChange('passwordConfirm')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                            >
                                                {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            :
                            <FormControl className="Login-input">
                                <InputLabel htmlFor="adornment-password">Password Confirm</InputLabel>
                                <Input
                                    id="adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.passwordConfirm}
                                    onChange={this.handleChange('passwordConfirm')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                            >
                                                {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        }
                    </div>
                    <div>
                        <TextField
                            className="Login-input"
                            id="invitation"
                            label="Invitation"
                            name="invitation"
                            value={this.state.invitation}
                            onChange={this.handleChange('invitation')}
                            margin="normal"
                        />
                    </div>
                    <Button className="Login-button" onClick={this.handleRegister.bind(this)}>注册</Button>
                    <Link to={'/'}>
                        登录
                    </Link>
                </Paper>
            </div>
        );
    }
}

export default withCookies(withStyles(styles, {withTheme: true})(Register));
