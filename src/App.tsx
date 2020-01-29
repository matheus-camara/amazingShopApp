import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DASHBOARD_PAGE, ADD_PRODUCT_PAGE } from './constants/routes';
import { Dashboard, AddProduct } from './ui/screens';
import { StringLocalizerProvider, SupportedLanguages } from './localization';
import { resources } from './static/Resources';
import { LoaderProvider } from './contexts/loader/loaderContext';
import { SnackbarProvider } from 'notistack';

const App: React.FC = () => {

    return (
        <div className="App">
            <StringLocalizerProvider resources={resources} defaultLanguage={SupportedLanguages.enUS}>
                <SnackbarProvider maxSnack={5} preventDuplicate={true} anchorOrigin={{ horizontal: "right", vertical: "top" }} autoHideDuration={3000}>
                    <LoaderProvider>
                        <Switch>
                            <Route path={DASHBOARD_PAGE} component={Dashboard} />
                            <Route path={ADD_PRODUCT_PAGE} component={AddProduct} />
                            <Redirect to={DASHBOARD_PAGE} />
                        </Switch>
                    </LoaderProvider>
                </SnackbarProvider>
            </StringLocalizerProvider>
        </div>
    );
}

export default App;
