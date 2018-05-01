import React from 'react'
import {withStyles} from 'material-ui/styles';
import $ from "jquery";
import {Button, Divider, List, Paper, SwipeableDrawer, Typography} from "material-ui";
import {mailFolderListItems, otherMailFolderListItems} from "../navigation/drawerData";

const styles = theme => ({
    root: {
        float: 'right',
        width: '30%',
        position: 'relative',
        height: $(document).height() - 64,
        overflow: 'auto',
        backgroundColor: "#ffffff",//theme.palette.background.paper,
    },
    title_box: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        marginLeft: 20,
        color: theme.palette.secondary.lightGreyText,
        fontWeight: 'bold'
    },
    flex: {
        flex: '0 1 auto',
        marginLeft: 5,
        marginTop: 8,
        marginBottom: 5
    },
    detail_box: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop:10,
        marginBottom:10,
    },
    detailLabel: {
        marginLeft:50,
        flex:'0 1 auto'
    },
    detailLabelContent: {
        flex:'0 1 100%',
        marginLeft:20
    },
    fileDetailLabel: {
        textAlign: 'right',
        color: theme.palette.secondary.lightGreyText,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 8
    },
    fileDetail: {
        textAlign: 'left',
        color: theme.palette.secondary.blackText,
        marginTop: 8,
        marginBottom: 8
    },
    fileDetailHeader:{
        textAlign: 'left',
        color: theme.palette.secondary.lightGreyText,
        marginLeft:'10%',
        marginTop: 8,
        marginBottom: 8
    }
});

class FileDetail extends React.Component {
    state = {
        show: false
    };

    render() {
        const {classes} = this.props;
        const {show} = this.state;

        return (
            <Paper className={classes.root} elevation={8}>
                <div className={classes.title_box}>
                    <img width={50} height={50} src={"https://material-ui-next.com/static/images/uxceo-128.jpg"}
                         className={classes.flex}/>
                    <Typography className={classes.title}>文件名称.dot</Typography>
                </div>
                <Divider/>
                <div className={classes.detail_box}>
                    <div className={classes.detailLabel}>
                        <Typography className={classes.fileDetailLabel}>Type</Typography>
                        <Typography className={classes.fileDetailLabel}>Size</Typography>
                        <Typography className={classes.fileDetailLabel}>Modified</Typography>
                        <Typography className={classes.fileDetailLabel}>Created</Typography>
                        <Typography className={classes.fileDetailLabel}>Uploader</Typography>
                    </div>
                    <div className={classes.detailLabelContent}>
                        <Typography className={classes.fileDetail}>Type</Typography>
                        <Typography className={classes.fileDetail}>Size</Typography>
                        <Typography className={classes.fileDetail}>Modified</Typography>
                        <Typography className={classes.fileDetail}>Created</Typography>
                        <Typography className={classes.fileDetail}>Uploader</Typography>
                    </div>
                </div>
                <Divider/>
                    <Typography className={classes.fileDetailHeader}>File Information</Typography>
                <Divider/>
                <div className={classes.detail_box}>
                    <div className={classes.detailLabel}>
                        <Typography className={classes.fileDetailLabel}>Uploader</Typography>
                        <Typography className={classes.fileDetailLabel}>Description</Typography>
                    </div>
                    <div className={classes.detailLabelContent}>
                        <Typography className={classes.fileDetail}>Mxdlzg</Typography>
                        <Typography className={classes.fileDetail}>This is demo</Typography>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles, {withTheme: true})(FileDetail);