import { Dashboard, AddProduct, ViewProduct, Login, Register } from "../ui/screens";
import { Cart } from "../ui/screens/cart/Cart";

export enum Routes {
    LOGIN_PAGE = "/login",
    REGISTER_PAGE = "/register",
    DASHBOARD_PAGE = "/dashboard",
    ADD_PRODUCT_PAGE = "/product/add",
    VIEW_PRODUCT_PAGE = "/product/:id",
    EDIT_PRODUCT_PAGE = "/product/edit/:id",
    CART_PAGE = "/cart",
}

export interface IRoute {
    path: Routes
    component: React.FC<any>
    exact?: boolean
    isPrivate?: boolean
    withDrawer?: boolean
}

export const app_routes: IRoute[] = [
    {
        path: Routes.DASHBOARD_PAGE,
        component: Dashboard,
        withDrawer: true,
    },
    {
        path: Routes.ADD_PRODUCT_PAGE,
        component: AddProduct,
        exact: true,
        isPrivate: true,
        withDrawer: true
    },
    {
        path: Routes.VIEW_PRODUCT_PAGE,
        component: ViewProduct,
        exact: true,
        isPrivate: false,
        withDrawer: true
    },
    {
        path: Routes.EDIT_PRODUCT_PAGE,
        component: AddProduct,
        exact: true,
        isPrivate: true,
        withDrawer: true
    },
    {
        path: Routes.LOGIN_PAGE,
        component: Login,
        exact: true,
    },
    {
        path: Routes.REGISTER_PAGE,
        component: Register,
        exact: true
    },
    {
        path: Routes.CART_PAGE,
        component: Cart,
        withDrawer: true,
    }
]