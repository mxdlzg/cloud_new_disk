import React from 'react'
import PropTypes from 'prop-types';
import "./Home.css"
import {withStyles} from 'material-ui/styles';
import HomeTree from "./HomeTree";
import Detail from "./Detail";
import EnhancedTable from "./DetailListView";
import FileDetail from "./FileDetail";

const styles = theme => ({
    root:{
        display:'flex'
    },
    tree:{
        flex:'none'
    },
    main:{
        float:'left',
        flex:1
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.handler(true);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <HomeTree className={classes.tree}/>
                <div className={classes.main}>
                    <EnhancedTable />
                    <FileDetail/>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Home);