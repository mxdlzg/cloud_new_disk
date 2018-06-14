import React from 'react'
import PropTypes from 'prop-types';
import "./Home.css"
import {withStyles} from 'material-ui/styles';
import HomeTree from "./HomeTree";
import Detail from "./Detail";
import EnhancedTable from "./DetailListView";
import FileDetail from "./FileDetail";
import classNames from "classnames";
import $ from "jquery";

const styles = theme => ({
    root: {
        display: 'flex'
    },
    tree: {
        flex: 'none'
    },
    main: {
        // float: 'left',
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailOpen: {
        float: 'right',
        width: '30%',
        position: 'relative',
        height: $(document).height() - 64,
        overflow: 'auto',
        backgroundColor: "#ffffff",//theme.palette.background.paper,
        whiteSpace: 'nowrap',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    detailClose: {
        float: 'right',
        position: 'relative',
        height: $(document).height() - 64,
        overflow: 'auto',
        backgroundColor: "#ffffff",//theme.palette.background.paper,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
    },
    tableSmall:{
        float: 'left',
        width: '70%',
        // marginLeft: 260,
        height: $(document).height() - 64,
        overflow: 'auto',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#fff",//theme.palette.background.paper,
    },
    tableLarge:{
        float: 'left',
        width: '100%',
        // marginLeft: 260,
        height: $(document).height() - 64,
        overflow: 'auto',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#fff",//theme.palette.background.paper,
    }
});

class Home extends React.Component {
    state = {
        fileDetail: undefined,
        open: false
    };

    constructor(props) {
        super(props);
        this.props.handler(true);
    }

    handleFileDetail(detail) {
        if (detail != null && detail !== undefined){
            this.setState({
                fileDetail: detail,
                open:true
            })
        }
    }

    handleFileDetailClose() {
        console.log("close");
        this.setState({
            open: false
        })
    }

    render() {
        const {classes} = this.props;
        const {fileDetail, open} = this.state;

        return (
            <div className={classes.root}>
                <HomeTree className={classes.tree}/>
                <div className={classes.main}>
                    <EnhancedTable
                        classes={{
                            root: classNames(open ? classes.tableSmall:classes.tableLarge)
                        }}
                        onToast={this.props.onToast}
                        onDetail={this.handleFileDetail.bind(this)}/>

                    <FileDetail
                        classes={{
                            root: classNames(open ? classes.detailOpen:classes.detailClose)
                        }}
                        onDetailClose={this.handleFileDetailClose.bind(this)}
                        fileDetail={fileDetail}/>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Home);