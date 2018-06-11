import React from 'react'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "material-ui";
import {withStyles} from "material-ui/styles/index";
import update from 'immutability-helper';
import { withCookies, Cookies } from 'react-cookie';

const styles = theme => ({
    uploaderDialog: {
        width: 1000,
        maxWidth: 1500,
    }
});


const statusTextOverride = {
    upload_successful: '上传成功!',
    canceled: "取消",
    deleting: "删除中...",
    paused: "暂停",
    queued: "排队",
    retrying_upload: "重试中...",
    submitting: "提交中...",
    uploading: "上传中...",
    upload_failed: "上传失败",
};

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            needRefresh:false,
            uploader: new FineUploaderTraditional({
                options: {
                    template: "qq-simple-thumbnails-template",
                    folders: true,
                    autoUpload: false,
                    text: {
                        uploadButton: '上传'
                    },
                    validation: {
                        itemLimit: 50,
                        sizeLimit: 314572800 // 50 kB = 50 * 1024 bytes
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    messages: {
                        typeError: "文件类型错误",
                        sizeError: "文件过大",
                        emptyError: "文件不能为空",
                        noFilesError: "无文件可上传"
                    },
                    chunking: {
                        enabled: true,
                        success:{
                            endpoint:"http://localhost/CloudDiskServer/ServerOP/uploader/endpoint.php?done&XDEBUG_SESSION_START=17503"
                        }
                    },
                    deleteFile: {
                        enabled: true,
                        endpoint: 'http://localhost/CloudDiskServer/ServerOP/uploader/endpoint.php'
                    },
                    request: {
                        endpoint: 'http://localhost/CloudDiskServer/ServerOP/uploader/endpoint.php?XDEBUG_SESSION_START=17503',
                        method: 'POST',
                        // params: {
                        //     Policy: "fafasfasfsafg11421542155egwegyewtgewt"
                        // }
                    },
                    retry: {
                        enableAuto: false
                    }
                }
            })
        }
    }

    // componentWillReceiveProps(nextProps){
    //     if (nextProps.open == this.state.open) {
    //         console.log("not changed")
    //     }else {
    //         this.setState({open:nextProps.open});
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log(nextProps);
    //     return true;
    // }
    //
    // componentWillUpdate(nextProps, nextState){
    //     console.log(nextProps);
    // }
    componentWillMount(){
        const {cookies} = this.props;
        if (cookies != null) {
            this.setState({user:cookies.get('user') || ''});
            this.setState({userID:cookies.get('userID') || ''})
        }
    }

    componentDidMount(){
        this.state.uploader.on('complete', (id, name, response) => {
            // handle completed upload
            this.setState({needRefresh:true})
        });
    }


    handleUpload = (e) => {
        this.state.uploader.methods.setParams({
            parentNodeID: this.props.currentParentID,
            user:this.state.user,
            userID:this.state.userID
        });

        this.state.uploader.methods.uploadStoredFiles();
        // let data = Object.assign({},this.state.uploader.options.request.params,{parentNodeID:'nd1'});
        // this.setState({uploader:data},()=>{
        // console.log(this.state.uploader,data)
        // alert("aaaaaaa")
        // });h
    };

    handleClose = (e) => {
        //TODO::返回上传结果，告诉父级是否刷新列表
        this.props.onClose(this.state.needRefresh);
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    disableBackdropClick={false}
                    maxWidth={false}
                >
                    <DialogTitle id="form-dialog-title">上传(Uploader)</DialogTitle>
                    <DialogContent className={classes.uploaderDialog}>
                        <Gallery status-text={statusTextOverride} uploader={this.state.uploader}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleUpload} color="secondary">
                            上传
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withCookies(withStyles(styles, {withTheme: true})(Uploader));
