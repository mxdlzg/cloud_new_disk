import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import {MuiThemeProvider,createMuiTheme} from 'material-ui/styles'
import ToDoAppContainer from './containers/toDoAppContainer';
import { Provider } from 'react-redux';

import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

//Whole Theme
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#55ecff',
            main: '#00e0e8',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        status: {
            danger: 'orange',
        },
    },
});

// const store = configureStore();

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
               <Navigation/>
           </MuiThemeProvider>
        );
    }
}

export default App;

//
// <div className="App">
//     <Header/>
//     <p className="App-intro">
//         To get started, edit <code>src/App.js</code> and save to reload.
//     </p>
//     <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo"/>
//         <h1 className="App-title">Welcome to React</h1>
//     </header>
// </div>

