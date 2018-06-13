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
import List from "../learnredux/List";
import {Link} from "react-router-dom";

const styles = theme => ({
    downloadDialog: {
        width: 500,
        maxWidth: 1500,
    }
});

class Downloader extends React.Component {
    state = {
        downloading: true,
        msg: "正在获取下载链接....",
        open:false,
        haveDownload:false,
        list:undefined
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.list !== this.state.list) {
    //         return true;
    //     }
    //     return false;
    // }
    componentWillReceiveProps(nextProps,nextContext){
        if (this.state.list !== nextProps.list) {
            this.setState({
                list:nextProps.list,
                open:nextProps.open
            })
        }
    }

    componentDidUpdate() {
        const {haveDownload,list,open} = this.state;
        console.log("update:"+haveDownload+" "+open+"\n"+list);
        if (!haveDownload && open) {
            this.doDownload(list);
        }
    }

    doDownload(list){
        if (list) {
            const formatData = this.formatData(list);
            $.ajax("http://localhost/CloudDiskServer/ServerOP/StartListener.php?XDEBUG_SESSION_START=17503", {
                type: "POST",
                data: {
                    clientType: "download",
                    data: {
                        data:formatData,
                    },
                },
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function (data, status) {
                    if (status) {
                        let rst = data;
                        switch (rst.status) {
                            case 4:
                                this.setState({
                                    responseData: rst,
                                    haveDownload: true,
                                    success: true,
                                    msg: "链接已获取，如浏览器无响应，请点击上方下载链接("+rst.msg+")"
                                });
                                window.open(rst.data, '_blank');
                                break;
                            case 3:
                                this.setState({
                                    haveDownload: true,
                                    success: false,
                                    msg: rst.msg
                                });
                                break;
                        }
                    } else {
                        this.setState({
                            haveDownload: true,
                            success: false,
                            msg: "请求失败"
                        });
                    }
                }.bind(this),
                error: function (msg) {
                    this.setState({
                        haveDownload: true,
                        success: false,
                        msg: "请求失败"
                    });
                    alert(JSON.stringify(msg));
                }
            });
        }
    }

    formatData(list) {
        const data = {files: [], dirs: []};
        list.map((item, i) => {
            if (item.fileType == "dir") {
                data.dirs.push({
                    id: item.id,
                    nodeID: item.nodeID,
                    name: item.name,
                    fileType: "dir",
                    parentPath: item.parentPath
                })
            } else {
                data.files.push({
                    id: item.id,
                    nodeID: item.nodeID,
                    name: item.name,
                    fileType: item.fileType,
                    parentPath: item.parentPath
                })
            }
        });
        return data;
    }

    handlePositive = (e) => {

    };
    handleClose = (e) => {
        this.setState({
            downloading: true,
            msg: "正在获取下载链接....",
            open:false,
            haveDownload:false
        });
        this.props.onClose();
    };

    render() {
        const {classes} = this.props;
        const {haveDownload, responseData, msg, success} = this.state;

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    disableBackdropClick={false}
                    maxWidth={false}
                >
                    <DialogTitle id="form-dialog-title">下载 (Download)</DialogTitle>
                    <DialogContent className={classes.downloadDialog}>
                        {!haveDownload ? (
                            <div>
                                <LinearProgress color="secondary"/>
                                <DialogContentText id="alert-dialog-description">
                                    <br/>
                                    {msg}
                                    <br/>
                                </DialogContentText>
                            </div>
                        ) : (
                            <div>
                                {success && (
                                    <Link to="route"
                                          onClick={(event) => {
                                              event.preventDefault();
                                              window.open(responseData.data, '_blank');
                                          }}>
                                        点击下载
                                    </Link>
                                )}
                                <DialogContentText id="alert-dialog-description">
                                    <br/>
                                    {msg}
                                    <br/>
                                </DialogContentText>
                            </div>
                        )}
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