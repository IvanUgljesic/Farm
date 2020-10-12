import React from 'react';
import Nav from './comps/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from './comps/admin/Admin';
import Footer from './comps/Footer';
import Header from './comps/Header';
import Login from './comps/admin/Login';


const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/Admin' component={Admin} />
          <Route path='/Login' component={Login} />
          <Route path='/' component={Nav} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
