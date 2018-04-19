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
