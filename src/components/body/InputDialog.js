import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress, TextField
} from "material-ui";
import {withStyles} from "material-ui/styles/index";

const styles = theme => ({
    InputDialog: {
        width: 500,
        maxWidth: 1500,
    }
});

class InputDialog extends React.Component {
    state = {
        content:''
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handlePositive = (e) => {
        const data = this.props.data;
        data.content = this.state.content;
        this.props.onClose(data);
    };
    handleClose = (e) => {
        const data = this.props.data;
        data.content = undefined;
        this.props.onClose(data);
    };

    render() {
        const {classes,open,data} = this.props;

        return (
            (open && data!==undefined) &&(
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{data.title}</DialogTitle>
                    <DialogContent className={classes.InputDialog}>
                        <DialogContentText>
                            {data.msg}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="输入"
                            type="email"
                            fullWidth
                            onChange={this.handleChange('content')}
                        />
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

export default withStyles(styles, {withTheme: true})(InputDialog);