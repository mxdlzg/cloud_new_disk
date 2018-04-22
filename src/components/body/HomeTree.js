import React from 'react'
import {withStyles} from "material-ui/styles/index";
import PropTypes from "prop-types";
import "./HomeTree.css"
import {Collapse, List, ListItem, ListItemIcon, ListItemText, ListSubheader} from "material-ui";
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons/es/index";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import FolderIcon from '@material-ui/icons//Folder';
import FolderOpenIcon from '@material-ui/icons//FolderOpen';
import SettingsIcon from '@material-ui/icons//Settings';
import DescriptionIcon from '@material-ui/icons//Description';
import InsertDriveFileIcon from '@material-ui/icons//InsertDriveFile';
import AddIcon from '@material-ui/icons//Add';
import DeleteIcon from '@material-ui/icons//Delete';
import $ from 'jquery';

const styles = theme => ({
    root: {
        width: '100%',
        height: $(document).height() - 64,
        maxWidth: 260,
        overflow: 'auto',
        backgroundColor: "#fff",//theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
});

class HomeTree extends React.Component {
    state = {open: true};

    handleClick = () => {
        this.setState({open: !this.state.open});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Inbox" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <InsertDriveFileIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Starred" />
                        </ListItem>
                </Collapse>
            </div>
        );
    }

}

HomeTree.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(HomeTree);