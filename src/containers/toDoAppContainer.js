import { connect } from 'react-redux';
import ToDoApp from '../components/learnredux/ToDoApp.js'
import {inputChange,
    inputSubmit,
    deleteListItem,
    listItemClick} from '../redux/modules/toDoApp'; // we added this

function mapStateToProps(state) {
    return {
        toDoApp: state.toDoApp // gives our component access to state through props.toDoApp
    }
}

function mapDispatchToProps(dispatch) {
    return {
        inputChange: (value) => dispatch(inputChange(value)),
        inputSubmit: () => dispatch(inputSubmit()),
        deleteListItem: (i) => dispatch(deleteListItem(i)),
        listItemClick: (i) => dispatch(listItemClick(i))
    }; // here we'll soon be mapping actions to props
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDoApp);
