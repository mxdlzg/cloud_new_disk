import React from 'react'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import $ from "jquery";
import {lighten} from 'material-ui/styles/colorManipulator';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import SelectAllIcon from '@material-ui/icons/SelectAll'
import FolderIcon from '@material-ui/icons//Folder';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import Uploader from './Uploader'

import {
    Avatar,
    Button,
    Checkbox,
    IconButton, Menu, MenuItem, Table, TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip
} from "material-ui";
import {FileUpload} from "@material-ui/icons/es/index";

const styles = theme => ({
    root: {
        float: 'left',
        width: '70%',
        // marginLeft: 260,
        height: $(document).height() - 64,
        overflow: 'auto',
        backgroundColor: "#fff",//theme.palette.background.paper,
    },
    divHeader: {
        height: 50,
        backgroundColor: "#f4f4f4",//theme.palette.background.paper,
    },
    table_root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {},
    tableWrapper: {
        overflowX: 'auto',
    },
});

let counter = 0;

function createData(iconUrl, name, calories, fat, carbs, protein) {
    counter += 1;
    return {id: counter, iconUrl, name, calories, fat, carbs, protein};
}

const columnData = [
    {id: 'iconUrl', numeric: false, disablePadding: false, label: '图标'},
    {id: 'name', numeric: false, disablePadding: true, label: '名称'},
    {id: 'calories', numeric: true, disablePadding: false, label: '类型'},
    {id: 'fat', numeric: true, disablePadding: false, label: '大小'},
    {id: 'carbs', numeric: true, disablePadding: false, label: '修改时间'},
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;
        const {classes} = this.props;
        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="排序"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        )
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light_grey
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 auto',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    iconSmall: {
        fontSize: 16,
    },
    button: {
        marginLeft: 5
    },
    fileIcon: {
        width: 30,
        height: 30,
    }
});

class EnhancedTableToolbar extends React.Component {
    state = {
        anchorEl: null,
        allSelected: false,
        open: false,
    };

    constructor(props) {
        super(props);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    //
    handleClickOpen = (e) => {
        this.setState({open: !this.state.open});
    };

    handleDialogClose = (uploadResult) => {
        this.setState({open: !this.state.open});
        console.log(uploadResult);
    };


    render() {
        const {onSelectAllClick, numSelected, rowCount, classes} = this.props;
        const {anchorEl, allSelected} = this.state;

        return (
            <Toolbar className={classNames(classes.root, {[classes.highlight]: numSelected > 0,})}>
                <Button onClick={this.handleClickOpen} className={classes.button} variant="raised" size="small"
                        color="secondary">
                    <FileUpload className={classNames(classes.iconSmall)}/>
                    上 传{this.state.open.toString()}
                </Button>
                <Uploader open={this.state.open} onClose={this.handleDialogClose.bind(this)}/>
                <Button className={classes.button} variant="raised" size="small" color="secondary">
                    <FolderIcon className={classNames(classes.iconSmall)}/>
                    新建文件夹
                </Button>
                <Button className={classes.button} variant="raised" size="small" color="secondary">
                    <CloudDownloadIcon className={classNames(classes.iconSmall)}/>
                    下载
                </Button>
                <div className={classes.spacer}/>
                <Tooltip title="全选">
                    <IconButton aria-label="全选" onClick={onSelectAllClick}>
                        <SelectAllIcon color={numSelected === rowCount ? "secondary" : "default"}/>
                    </IconButton>
                </Tooltip>
                <div className={classes.actions}>
                    {numSelected > 0 && (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list" onClick={this.handleClick}>
                                <FilterListIcon/>
                            </IconButton>
                        </Tooltip>
                    )}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>删除</MenuItem>
                        <MenuItem onClick={this.handleClose}>移动到</MenuItem>
                        <MenuItem onClick={this.handleClose}>复制到</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        )
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class EnhancedTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'calories',
            allSelected: true,
            selected: [],
            data: [
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Cupcake', 305, 3.7, 67, 4.3),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Donut', 452, 25.0, 51, 4.9),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Eclair', 262, 16.0, 24, 6.0),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Frozen yoghurt', 159, 6.0, 24, 4.0),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Gingerbread', 356, 16.0, 49, 3.9),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Honeycomb', 408, 3.2, 87, 6.5),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Ice cream sandwich', 237, 9.0, 37, 4.3),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Jelly Bean', 375, 0.0, 94, 0.0),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'KitKat', 518, 26.0, 65, 7.0),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Lollipop', 392, 0.2, 98, 0.0),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Marshmallow', 318, 0, 81, 2.0),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Nougat', 360, 19.0, 9, 37.0),
                createData('https://material-ui-next.com/static/images/uxceo-128.jpg', 'Oreo', 437, 18.0, 63, 4.0),
            ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
            page: 0,
            rowsPerPage: 20,
            rowHeight: 40,
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({data, order, orderBy});
    };

    handleSelectAllClick = (event, checked) => {
        this.setState({allSelected: checked});
        if (checked) {
            this.setState({selected: this.state.data.map(n => n.id)});
            return;
        }
        this.setState({selected: []});
    };

    handleSelectAll = () => {
        const {allSelected} = this.state;
        this.setState({allSelected: !allSelected});
        if (allSelected) {
            this.setState({selected: this.state.data.map(n => n.id)});
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, page, rowHeight} = this.state;
        let rowsPerPage = data.length;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root} elevation={6}>
                <EnhancedTableToolbar onSelectAllClick={this.handleSelectAll} rowCount={data.length}
                                      numSelected={selected.length}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                const isSelected = this.isSelected(n.id);
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => this.handleClick(event, n.id)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.id}
                                        selected={isSelected}
                                    >

                                        <TableCell>
                                            <img height={rowHeight} width={rowHeight} src={n.iconUrl}/>
                                        </TableCell>
                                        <TableCell padding="none">{n.name}</TableCell>
                                        <TableCell numeric>{n.calories}</TableCell>
                                        <TableCell numeric>{n.fat}</TableCell>
                                        <TableCell numeric>{n.carbs}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
