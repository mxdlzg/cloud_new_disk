import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress
} from "material-ui";
import {withCookies} from "react-cookie";
import {withStyles} from "material-ui/styles/index";
import $ from "jquery";

const styles = theme => ({
    downloadDialog: {
        width: 500,
        maxWidth: 1500,
    }
});

class Downloader extends React.Component{

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.list != null) {
            return true;
        }
        return false;
    }


    componentDidUpdate(){
        const {list} = this.props;
        if (list != null && this.props.open) {
            const formatData = this.formatData(list);

            $.ajax("http://localhost/CloudDiskServer/ServerOP/StartListener.php?XDEBUG_SESSION_START=17503",{
                type: "POST",
                data: {
                    clientType: "download",
                    data: {
                        data:formatData,
                    },
                },
                dataType:"json",
                xhrFields: {
                    withCredentials: true
                },
                success:function (data,status) {
                    if (status) {
                        let rst = data;
                        switch (rst.status){
                            case 4:
                                window.open(rst.data);
                                break;
                            case 3:
                                this.props.onToast(rst.msg);
                                break;
                        }
                    } else {
                        this.props.onToast("请求失败");
                    }
                }.bind(this),
                error:function (msg) {
                    alert(JSON.stringify(msg));
                }
            });
        }
    }

    formatData(list) {
        const data = {files:[],dirs:[]};
        list.map((item,i)=>{
            if (item.fileType == "dir"){
                data.dirs.push({
                    id:item.id,
                    nodeID:item.nodeID,
                    name:item.name,
                    fileType:"dir",
                    parentPath:item.parentPath
                })
            }else {
                data.files.push({
                    id:item.id,
                    nodeID:item.nodeID,
                    name:item.name,
                    fileType:item.fileType,
                    parentPath:item.parentPath
                })
            }
        });
        return data;
    }

    handlePositive = (e) => {

    };
    handleClose = (e) => {
        this.props.onClose();
    };

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    disableBackdropClick={false}
                    maxWidth={false}
                >
                    <DialogTitle id="form-dialog-title">下载(Download)</DialogTitle>
                    <DialogContent className={classes.downloadDialog}>
                        <LinearProgress color="secondary" />
                        <DialogContentText id="alert-dialog-description">
                            <br/>
                            正在获取下载链接....
                            <br/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlePositive} color="secondary">
                            确定
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default withCookies(withStyles(styles, {withTheme: true})(Downloader));