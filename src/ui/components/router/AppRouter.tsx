import { IRoute, Routes } from "../../../constants/routes"
import { Route, Switch, Redirect } from "react-router-dom"
import { IRootState } from "../../../stores"
import { useSelector } from "react-redux"
import React from "react"

export const AppRouter: React.FC<{ routes: IRoute[] }> = (props) => {

    const { routes } = props;

    return (
        <Switch>
            {routes.map((route) =>
                route.isPrivate ?
                    <PrivateRoute key={route.path} route={route} /> :
                    <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />)}
            <Redirect to={Routes.DASHBOARD_PAGE} />
        </Switch>
    )
}

const PrivateRoute: React.FC<{ route: IRoute }> = (props) => {

    const auth = useSelector<IRootState>(store => store.authentication.authenticated)

    const { component, ...rest } = props.route

    return (
        <Route
            render={() => auth ? component : (<Redirect to={Routes.DASHBOARD_PAGE} />)}
            {...rest}
        />
    )
}