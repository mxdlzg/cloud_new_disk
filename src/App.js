import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {BrowserRouter} from 'react-router-dom'
import Root from "./components/Root";

//Whole Theme
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#55ecff',
            main: '#fff',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#46b0f3',
            main: '#2196f3',
            dark: '#1976d2',
            light_grey:'#f5f5f5',
            contrastText: '#fff',
        },
        status: {
            danger: 'orange',
        },
    },
});

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <Root/>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;
