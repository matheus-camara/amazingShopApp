import { Dashboard, AddProduct, ViewProduct } from "../ui/screens";

export enum Routes {
    DASHBOARD_PAGE = "/dashboard",
    ADD_PRODUCT_PAGE = "/product/add",
    VIEW_PRODUCT_PAGE = "/product/:id",
    EDIT_PRODUCT_PAGE = "/product/edit/:id",
}

export interface IRoute {
    path: Routes,
    component: React.FC<any>,
    exact?: boolean
    isPrivate?: boolean
}

export const app_routes: IRoute[] = [
    {
        path: Routes.DASHBOARD_PAGE,
        component: Dashboard,
        exact: false,
    },
    {
        path: Routes.ADD_PRODUCT_PAGE,
        component: AddProduct,
        exact: true,
        isPrivate: true
    },
    {
        path: Routes.VIEW_PRODUCT_PAGE,
        component: ViewProduct,
        exact: true,
        isPrivate: true
    },
    {
        path: Routes.EDIT_PRODUCT_PAGE,
        component: AddProduct,
        exact: true,
        isPrivate: true
    }
]