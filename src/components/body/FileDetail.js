import React from 'react'
import {withStyles} from 'material-ui/styles';
import $ from "jquery";
import {Button, Divider, List, Paper, SwipeableDrawer} from "material-ui";
import {mailFolderListItems, otherMailFolderListItems} from "../navigation/drawerData";

const styles = theme => ({
    root: {
        float:'right',
        width:'30%',
        position:'relative',
        height: $(document).height() - 64,
        overflow: 'auto',
        backgroundColor: "#ffffff",//theme.palette.background.paper,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

class FileDetail extends React.Component{
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render(){
        const {classes} = this.props;
        const sideList = (
            <div className={classes.list}>
                <List>{mailFolderListItems}</List>
                <Divider />
                <List>{otherMailFolderListItems}</List>
            </div>
        );

        const fullList = (
            <div className={classes.fullList}>
                <List>{mailFolderListItems}</List>
                <Divider />
                <List>{otherMailFolderListItems}</List>
            </div>
        );
        return(
            <Paper className={classes.root} elevation={8}>
                <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
                <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
                <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
                <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
                <SwipeableDrawer
                    anchor="top"
                    open={this.state.top}
                    onClose={this.toggleDrawer('top', false)}
                    onOpen={this.toggleDrawer('top', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('top', false)}
                        onKeyDown={this.toggleDrawer('top', false)}
                    >
                        {fullList}
                    </div>
                </SwipeableDrawer>
                <SwipeableDrawer
                    anchor="bottom"
                    open={this.state.bottom}
                    onClose={this.toggleDrawer('bottom', false)}
                    onOpen={this.toggleDrawer('bottom', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('bottom', false)}
                        onKeyDown={this.toggleDrawer('bottom', false)}
                    >
                        {fullList}
                    </div>
                </SwipeableDrawer>
                <SwipeableDrawer
                    anchor="right"
                    open={this.state.right}
                    onClose={this.toggleDrawer('right', false)}
                    onOpen={this.toggleDrawer('right', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('right', false)}
                        onKeyDown={this.toggleDrawer('right', false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </Paper>
        )
    }
}

export default withStyles(styles, {withTheme: true}) (FileDetail);