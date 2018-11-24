import React, { Component, Fragment } from 'react';
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline
} from '@material-ui/core';
import MainPage from './MainPage';

const theme = createMuiTheme();

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MainPage />
      </MuiThemeProvider>
    );
  }
}
