import { Dashboard, AddProduct } from "../ui/screens";

export enum Routes {
    DASHBOARD_PAGE = "/dashboard",
    ADD_PRODUCT_PAGE = "/add-product"
}

export interface IRoute {
    path: Routes,
    component: React.FC<any>,
    exact?: boolean
    routes?: IRoute[],
    isPrivate?: boolean
}

export const app_routes: IRoute[] = [
    {
        path: Routes.DASHBOARD_PAGE,
        component: Dashboard,
        exact: true,
    },
    {
        path: Routes.ADD_PRODUCT_PAGE,
        component: AddProduct,
        exact: true,
        isPrivate: true
    },
]