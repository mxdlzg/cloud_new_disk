import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControlLabel,
    LinearProgress, ListItemIcon, ListItemText, MenuItem, MenuList, RadioGroup, TextField
} from "material-ui";
import FolderIcon from '@material-ui/icons//Folder';
import {withStyles} from "material-ui/styles/index";
import $ from "jquery";
import {withCookies} from "react-cookie";


const styles = theme => ({
    moveDialog: {
        width: 250,
        maxWidth: 1500,
    },
    menuList: {
        maxHeight: 300,
        fullWidth: true,
    },
    menuItem: {
        fullWidth: true,
        '&:focus': {
            backgroundColor: theme.palette.secondary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},
});


class MoveDialog extends React.Component {
    state = {
        content: '',
        refreshing: true,
        open:false,
        data:undefined,
        firstOpen:true,
        itemName:'',
        aimNode:undefined,
    };

    componentWillReceiveProps(nextProps,nextContext){
        if (this.state.data !== nextProps.data) {
            this.setState({
                data:nextProps.data,
                open:nextProps.open
            })
        }
    }

    handlePositive = (e) => {
        const {cookies} = this.props;
        if (this.state.aimNodeID == cookies.get("startID")||'') {
            this.props.onClose(false);
            return;
        }
        this.setState({
            refreshing:true,
        });
        $.ajax("http://localhost/CloudDiskServer/ServerOP/StartListener.php", {
            type: "POST",
            data: {
                clientType: "move",
                data:{
                    duplicate:this.state.data.duplicate,
                    parentDirID: this.state.aimNodeID,
                    data:this.state.data.item
                }
            },
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (data, status) {
                if (status && data['status'] == 11) {
                    //let newData = data["data"];
                    //Show new data
                    this.props.onClose(true);
                } else {
                    alert(JSON.stringify(data));
                }
            }.bind(this),
            error: function (msg,data) {
                alert(JSON.stringify(msg));
                this.props.onClose(false);
            }.bind(this)
        });

        // const data = this.props.data;
        // data.aimNodeID = '';
        // data.success = true;

    };
    handleClose = (e) => {
        this.setState({
            dirData:undefined,
            refreshing:false,
            open:false,
        });
        const data = this.props.data;
        data.aimNodeID = undefined;
        data.success = false;
        this.props.onClose(data);
    };
    handleItemClick(item){
        if (item.nodeID !== undefined){
            this.requestData(item)
        }
    }
    onEnter(){
        console.log("1");
        this.requestData(undefined);
    }

    /**
     * Fetch items of parent dir from server
     * @param item
     */
    requestData(item) {
        let parentDirID;
        let name;
        if (item === undefined) {
            const {cookies} = this.props;
            parentDirID = cookies.get("startID")||'';
            name = '  移动到当前目录'
        }else {
            parentDirID = item.nodeID;
            name = "移动到 "+item.name;
        }
        this.setState({
            refreshing: true,
            itemName:name,
            aimNodeID:parentDirID
        },()=>{
            $.ajax("http://localhost/CloudDiskServer/ServerOP/StartListener.php", {
                type: "POST",
                data: {
                    clientType: "getDir",
                    parentDirID: parentDirID,
                },
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function (data, status) {
                    if (status) {
                        let newData = data["data"];
                        //Show new data
                        this.resetData(newData);
                    } else {
                        alert(JSON.stringify(data));
                    }
                }.bind(this),
                error: function (msg) {
                    alert(JSON.stringify(msg));
                }
            });
        });
    }

    /**
     * Reset this.state.data
     * @param data
     */
    resetData(data) {
        if (data.length > 0) {
            this.setState({
                dirData: data,
                refreshing: false,
            });
        }else {
            this.setState({
                refreshing: false,
            });
        }
    }

    render() {
        const {classes} = this.props;
        const {dirData,data,open, refreshing,itemName} = this.state;

        return (
            (open && data !== undefined) && (
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    onEntered={this.onEnter.bind(this)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{data.title}</DialogTitle>
                    <DialogContent className={classes.moveDialog}>
                        <DialogContentText>
                            {itemName}
                        </DialogContentText>

                        {refreshing ?
                            <LinearProgress color="secondary"/>
                            : <MenuList className={classes.menuList}>
                                {dirData !==undefined && (dirData.map(item =>
                                    (
                                        <MenuItem id={item.nodeID} onClick={(e)=>{this.handleItemClick(item)}} className={classes.menuItem}>
                                            <ListItemIcon className={classes.icon}>
                                                <FolderIcon/>
                                            </ListItemIcon>
                                            <ListItemText classes={{primary: classes.primary}} inset
                                                          primary={item.name}/>
                                        </MenuItem>
                                    )))
                                }
                            </MenuList>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlePositive.bind(this)} color="secondary">
                            确定
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        )
    }

}

export default withCookies(withStyles(styles, {withTheme: true})(MoveDialog));