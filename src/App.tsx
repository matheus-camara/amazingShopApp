import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from './constants/routes';
import { Dashboard } from './ui/screens';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path={routes.DASHBOARD_PAGE} component={Dashboard} />

        <Redirect to={routes.DASHBOARD_PAGE} />
      </Switch>
    </div>
  );
}

export default App;
