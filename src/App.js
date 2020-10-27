import React from 'react';
import Nav from './comps/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from './comps/admin/Admin';
import Footer from './comps/Footer';
import Header from './comps/Header';
import Login from './comps/admin/Login';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Aladin',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    "fontSize": 18,
    "fontWeightLight": 400,
    "fontWeightRegular": 500,
    "fontWeightMedium": 600
  }
});


const App = () => {

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/Admin' component={Admin} />
          <Route path='/Login' component={Login} />
          <Route path='/' component={Nav} />
        </Switch>
        <Footer />
      </div>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
