import React from 'react'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import $ from "jquery";

const styles = theme => ({
    root: {
        marginLeft:260,
        height: $(document).height() - 64,
        overflow: 'auto',
        backgroundColor: "#fff",//theme.palette.background.paper,
    },
    divHeader:{
        height:50,
        backgroundColor: "#f4f4f4",//theme.palette.background.paper,
    }
});

class DetailGridView extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root} elevation={6}>
                <div className={classes.divHeader}>

                </div>
                <Typography variant="headline" component="h3">
                    This is a sheet of paper.
                </Typography>
                <Typography component="p">
                    Paper can be used to build surface or other elements for your application.
                </Typography>
            </Paper>
        )
    }
}

export default withStyles(styles, {withTheme: true})(DetailGridView);