import { IRoute, Routes } from "../../../constants/routes"
import { Route, Switch, Redirect } from "react-router-dom"
import { IRootState } from "../../../stores"
import { useSelector } from "react-redux"
import React from "react"
import { AppDrawer } from "../drawer/Drawer"

const withDrawer = (props: any, AppComponent: any) => <AppDrawer {...props}> <AppComponent key={props.match.url}{...props} /> </AppDrawer>

export const AppRouter: React.FC<{ routes: IRoute[] }> = (props) => {

    const { routes } = props;

    return (
        <Switch>
            {
                routes.map(route =>
                    route.isPrivate
                        ? <PrivateRoute key={route.path} path={route.path} Component={route.component} exact={route.exact} withDrawer={route.withDrawer} />
                        : <Route key={route.path} path={route.path} exact={route.exact} render={
                            (props) => !!route.withDrawer ? withDrawer(props, route.component) : <route.component {...props}> </route.component>
                        } />)
            }
            <Redirect to={Routes.DASHBOARD_PAGE} />
        </Switch>
    )
}

const PrivateRoute: React.FC<{
    path: Routes,
    Component: React.FC<any>,
    exact?: boolean,
    withDrawer?: boolean
}> = (props) => {

    const { Component, ...rest } = props
    const auth = useSelector<IRootState>(store => store.authentication.authenticated) as boolean

    const renderComponent = (props: any) => {
        if (!auth) {
            return <Redirect to={Routes.DASHBOARD_PAGE} />
        }

        return !!rest.withDrawer ? withDrawer(props, Component) : <Component {...props} key={props.match.url} />
    }

    return (
        <Route
            render={renderComponent}
            {...rest}
        />
    )
}