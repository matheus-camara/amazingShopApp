import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DASHBOARD_PAGE, ADD_PRODUCT_PAGE } from './constants/routes';
import { Dashboard, AddProduct } from './ui/screens';
import { StringLocalizerProvider, SupportedLanguages } from './localization';
import { resources } from './static/Resources';

const App: React.FC = () => {

  return (
    <div className="App">
      <StringLocalizerProvider resources={resources} defaultLanguage={SupportedLanguages.enUS}>
        <Switch>
          <Route path={DASHBOARD_PAGE} component={Dashboard} />
          <Route path={ADD_PRODUCT_PAGE} component={AddProduct} />
          <Redirect to={DASHBOARD_PAGE} />
        </Switch>
      </StringLocalizerProvider>
    </div>
  );
}

export default App;
