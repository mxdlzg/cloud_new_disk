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

class Login extends React.Component {
    state = {
        user: '',
        password: '',
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
        this.setState({[prop]: event.target.value});
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    //__________________Event_____________________//
    handleLogin = (event) => {
        if (this.state.user.length == 0 || this.state.password.length == 0){
            this.props.onToast("请填写登录信息");
            return;
        }

        $.ajax("http://localhost/CloudDiskServer/ServerOP/StartListener.php?XDEBUG_SESSION_START=17503",{
            type: "POST",
            data: {
                clientType: "login",
                user: this.state.user,
                pass: this.state.password
            },
            dataType:"json",
            xhrFields: {
                withCredentials: true
            },
            success:function (data,status) {
                if (status) {
                    let rst = data;
                    if (rst["type"] === 2) {
                        switch (rst["status"]) {
                            case 5:
                                this.props.history.push('/home');
                                break;
                            case 6:
                                this.props.onToast(rst["msg"]);
                                this.props.history.push('/home');
                                break;
                            case 7:
                                this.props.onToast(rst["msg"]);
                                break;
                            default:
                                break;
                        }
                    }
                } else {
                    this.props.onToast("登陆请求失败");
                }
            }.bind(this),
            error:function (msg) {
                alert(JSON.stringify(msg));
            }
        });

        // $.post("http://192.168.1.2/CloudDiskServer/ServerOP/StartListener.php", {
        //     "clientType": "login",
        //     "user": this.state.user,
        //     "pass": this.state.password
        // }, function (data, status) {
        //     if (status) {
        //         let rst = JSON.parse(data);
        //         if (rst["type"] === 2) {
        //             switch (rst["status"]) {
        //                 case 5:
        //                     this.props.history.push('/home');
        //                     break;
        //                 case 6:
        //                 case 7:
        //                     this.props.onToast(rst["msg"]);
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         }
        //     } else {
        //         this.props.onToast("登陆请求失败");
        //     }
        // }.bind(this));
    };

    render() {
        const {classes} = this.props;

        return (
            <div className="Login-bg">
                <Paper className="Login-panel" elevation={4}>
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
                    <Button className="Login-button" onClick={this.handleLogin}>登录</Button>
                </Paper>
            </div>
        );
    }
}

Login.propTypes = {
    //classes: PropTypes.object.isRequired,
    //theme: PropTypes.object.isRequired,
};

export default (Login);
