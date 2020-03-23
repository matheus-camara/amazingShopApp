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
                routes.map((route) =>
                    route.isPrivate
                        ? <PrivateRoute key={route.path} path={route.path} Component={route.component} exact={route.exact} />
                        : <Route key={route.path} path={route.path} render={(props) => withDrawer(props, route.component)} exact={route.exact} />)
            }
            <Redirect to={Routes.DASHBOARD_PAGE} />
        </Switch>
    )
}

const PrivateRoute: React.FC<{
    path: Routes,
    Component: React.FC<any>,
    exact?: boolean
}> = (props) => {

    const auth = useSelector<IRootState>(store => store.authentication.authenticated) as boolean
    const { Component, ...rest } = props

    return (
        <Route
            render={(props) => auth ? withDrawer(props, Component) : <Redirect to={Routes.DASHBOARD_PAGE} />}
            {...rest}
        />
    )
}