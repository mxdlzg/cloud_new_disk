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
import {Map as ImMap} from 'immutable'
import {List as ImList} from 'immutable'
import classNames from "classnames";
import {fromJS} from 'immutable'
import Immutable from 'immutable'

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

class HomeTreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AppValue: this.props.items       //ImMap
        };
        this.handleClick = this.handleClick.bind(this);
    }

    loadInner = () => {

    };

    handleClick = (path, event) => {
        // console.log(path);

        let pathArr = path.trim().split(' ');

        // console.log(pathArr);

        let aim = this.state.AppValue.getIn(pathArr).toJS();
        // console.log(aim);
        if (aim.hasChild) {
            //TODO::加载Loading界面
            const newData = this.state.AppValue.updateIn(pathArr, value => {
                // console.log(value);
                let tp = value.toJS();
                tp.open = !tp.open;
                return fromJS(tp);
            });
            //TODO::进行Ajax请求
            this.setState({AppValue: newData})
        } else {
            //TODO::进行Ajax请求,获取此文件夹内的详细文件列表，并显示在sibling的组件里面
        }
    };

    renderChildren(items,keyPath) {
        let self = this;

        const nodes = items.keySeq().map((key, index) => {
            let item = items.get(key).toJS();
            // if (key === '3') {
            //     console.log(item);
            //     console.log(item.children);
            // }
            return (
                <List key={index} component="div" disablePadding>
                    <ListItem button onClick={(event) => self.handleClick(keyPath+key, event)}>
                        {item.hasChild>0 ? item.open ? <ExpandLess/> : <ExpandMore/> :
                            <ExpandMore className="noneExpand"/>}
                        <ListItemIcon>
                            <FolderIcon/>
                        </ListItemIcon>
                        <ListItemText inset primary={item.name}/>
                    </ListItem>
                    <Collapse className="collapseIndent" in={item.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderChildren(fromJS(item.children),keyPath+key+' children ')}
                        </List>
                    </Collapse>
                </List>
            )
        });
        return nodes;
    }

    render() {
        return (
            <div>
                {this.renderChildren(this.state.AppValue,'')}
            </div>
        );
    }
}

export {HomeTreeNode};

class HomeTree extends React.Component {
    state = {};

    //获取首层数据
    static initData() {
        //TODO:: Ajax
        return fromJS({
            '1':{
                'name': '1',
                'hasChild':false,
                'children': {},
                'open': true
            },
            '2':{
                'name': '2',
                'hasChild':false,
                'children': {},
                'open': false
            },
            '3':{
                'name': '3',
                'hasChild':true,
                'children': {
                    '1': {
                        'name': '4',
                        'hasChild':false,
                        'children': {},
                        'open': false
                    }
                },
                'open': false
            }
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <HomeTreeNode items={HomeTree.initData()}/>
            </div>
        );
    }

}

HomeTree.defaultProps = {
    url: "www.baidu.com"
};

HomeTree.propTypes = {
    classes: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
};

export default withStyles(styles, {withTheme: true})(HomeTree);