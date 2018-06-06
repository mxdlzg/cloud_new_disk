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
import {Drawer, Snackbar} from "material-ui";
import Divider from "material-ui/es/Divider/Divider";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {mailFolderListItems, otherMailFolderListItems} from './drawerData';
import List from 'material-ui/List';
import {Link, withRouter} from 'react-router-dom'
import Main from "../body/Main";
import $ from "jquery";

const primary1 = red[500]; // #F44336
const accent1 = purple['A200']; // #E040FB
const accent2 = purple.A200; // #E040FB (alternative method)

const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'absolute',
        top:0,
        right:0,
        bottom:0,
        left:0,
        display: 'flex',
    },
    flex: {
        flex: 1,
        color:'#878787'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
    menuIcon:{
        color:'#7a7a7a'
    }
});


class Navigation extends Component {
    state = {
        open: false,
        auth: true,
        anchorEl: null,
        canOpenDrawer: false,
        snackOpen: false,
        vertical: 'top',
        horizontal: 'center',
        msg:''
    };

    constructor(props){
        super(props);

        this.handler = this.handler.bind(this);
    }

    handler(ft) {
        this.setState({
            canOpenDrawer: ft
        })
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleChange = (event, checked) => {
        this.setState({canOpenDrawer: checked});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleQuit = () =>{
        $.ajax("http://localhost/CloudDiskServer/ServerOP/StartListener.php",{
            type: "POST",
            data: {
                clientType: "logout",
            },
            dataType:"json",
            xhrFields: {
                withCredentials: true
            },
            success:function (data,status) {
                if (status) {
                    let rst = data;
                    if (rst["type"] === 3) {
                        switch (rst["status"]) {
                            case 8:
                                this.props.history.push('/');
                                break;
                            case 9:
                                this.handleSnackOpen(rst["msg"]);
                                this.props.history.push('/');
                                break;
                            case 10:
                                this.handleSnackOpen(rst["msg"]);
                                this.props.history.push('/');
                                break;
                            default:
                                this.props.history.push('/');
                                break;
                        }
                    }
                } else {
                    this.handleSnackOpen("注销请求失败");
                }
            }.bind(this),
            error:function (msg) {
                alert(JSON.stringify(msg));
            }
        });
    };

    handleSnackOpen = (msg) => {
        this.setState({msg:msg});
        this.setState({ snackOpen: !this.state.snackOpen });
    };
    handleSnackClose = () => {
        this.setState({ snackOpen: !this.state.snackOpen });
    };

    render() {
        const {classes} = this.props;
        const {auth, anchorEl, canOpenDrawer,snackOpen,msg,vertical,horizontal} = this.state;
        const open = Boolean(anchorEl);
        const {theme} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="absolute" color="primary"
                        elevation={3}
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar>
                        {canOpenDrawer && (
                            <IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen}
                                        className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                                <MenuIcon className={classNames(classes.menuIcon)}/>
                            </IconButton>
                        )}
                        <Typography align="center" variant="title" color="inherit" className={classes.flex}>
                            CloudDisk
                        </Typography>
                        {canOpenDrawer && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="secondary"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>个人中心</MenuItem>
                                    <MenuItem onClick={this.handleQuit}>退出</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                {canOpenDrawer && (
                    <Drawer variant="permanent"
                            classes={{paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)}}
                            open={this.state.open}>
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>{mailFolderListItems}</List>
                        <Divider/>
                        <List>{otherMailFolderListItems}</List>
                    </Drawer>
                )}
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Main handler={this.handler} onToast={this.handleSnackOpen.bind(this)}/>
                        <Snackbar
                            anchorOrigin={{vertical, horizontal}}
                            open={snackOpen}
                            onClose={this.handleSnackClose}
                            contentprops={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{msg}</span>}
                        />
                    </main>
            </div>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, {withTheme: true})(Navigation));
