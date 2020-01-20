import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DASHBOARD_PAGE, ADD_PRODUCT_PAGE } from './constants/routes';
import { Dashboard, AddProduct } from './ui/screens';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path={DASHBOARD_PAGE} component={Dashboard} />
        <Route path={ADD_PRODUCT_PAGE} component={AddProduct} />
        <Redirect to={DASHBOARD_PAGE} />
      </Switch>
    </div>
  );
}

export default App;
