import { Routes } from "./routes";
import { HomeOutlined, AddBoxOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { SvgIconProps } from "@material-ui/core";

export interface IMenuItem {
    titleKey: string
    pushTo: Routes
    needAuth?: boolean
    icon: (props: SvgIconProps) => JSX.Element
}

export const app_menus: IMenuItem[] = [
    {
        titleKey: "dashboard",
        pushTo: Routes.DASHBOARD_PAGE,
        icon: HomeOutlined
    },
    {
        titleKey: "addProduct",
        pushTo: Routes.ADD_PRODUCT_PAGE,
        icon: AddBoxOutlined,
        needAuth: true
    },
    {
        titleKey: "cart",
        pushTo: Routes.CART_PAGE,
        icon: ShoppingCartOutlined
    },
]